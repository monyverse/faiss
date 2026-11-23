"""The goal engine.

A goal is handed over once. The engine plans it, works through it in cycles without the
person present, and comes back only when something changed: it needs an answer, it needs an
approval, it hit a limit, or it finished — and before it closes a goal it checks every
requirement.

Each cycle has three phases:
  read     a short transaction snapshots the goal, the deal and the creator's access
  compute  agents work from the snapshot; nothing is written
  write    one transaction applies every effect, guarded by the cycle number

So a cycle either lands completely or not at all, and running the same cycle twice (a retry,
a second worker, a Temporal activity replay) cannot double-apply it.
"""

from __future__ import annotations

import copy
from dataclasses import dataclass, field
from datetime import timedelta
from typing import Any

from sqlalchemy import delete, func, select
from sqlalchemy.ext.asyncio import AsyncSession

from .. import audit, policy
from ..agents import graph, specialists
from ..agents.reasoner import check_requirements, plan_goal
from ..config import get_settings
from ..db import Approval, Deal, Finding, Goal, GoalEvent, Notification, new_id, now, session_scope
from ..knowledge import get_corpus
from ..security import Access, Principal, access_for_goal

RUNNABLE = {"planning", "running"}
WAITING = {"awaiting_input", "awaiting_approval", "paused"}
TERMINAL = {"done", "failed", "cancelled"}
SETTLED = {"done", "skipped"}


class GoalError(Exception):
    def __init__(self, message: str, status: int = 409) -> None:
        super().__init__(message)
        self.status = status


# --------------------------------------------------------------------------- helpers


def deal_snapshot(deal: Deal) -> dict[str, Any]:
    archetype = get_corpus().ontology.archetype(deal.archetype_id) or {}
    return {
        "id": deal.id,
        "code_name": deal.code_name,
        "target_name": deal.target_name,
        "archetype_id": deal.archetype_id,
        "archetype_name": archetype.get("name", deal.archetype_id),
        "stage_id": deal.stage_id,
        "countries": list(deal.countries or []),
        "twin": copy.deepcopy(deal.twin or {}),
    }


def goal_snapshot(goal: Goal) -> dict[str, Any]:
    return {
        "id": goal.id,
        "deal_id": goal.deal_id,
        "objective": goal.objective,
        "state": goal.state,
        "cycle": goal.cycle,
        "plan": copy.deepcopy(goal.plan or []),
        "requirements": copy.deepcopy(goal.requirements or []),
        "created_by": goal.created_by,
        "run_as": dict(goal.run_as or {}),
        "max_cycles": goal.max_cycles,
        "budget_usd": goal.budget_usd,
        "spent_usd": goal.spent_usd,
    }


class EventLog:
    """Appends to a goal's event log. The caller must hold the goal row lock."""

    def __init__(self, session: AsyncSession, goal_id: str) -> None:
        self.session, self.goal_id, self._seq = session, goal_id, None

    async def add(self, type_: str, actor: str = "system", **payload: Any) -> None:
        if self._seq is None:
            self._seq = (
                await self.session.execute(
                    select(func.coalesce(func.max(GoalEvent.seq), 0)).where(GoalEvent.goal_id == self.goal_id)
                )
            ).scalar_one()
        self._seq += 1
        self.session.add(GoalEvent(goal_id=self.goal_id, seq=self._seq, type=type_, actor=actor, payload=payload))


async def lock_goal(session: AsyncSession, goal_id: str) -> Goal | None:
    return await session.get(Goal, goal_id, with_for_update=True, populate_existing=True)


def notify(session: AsyncSession, goal: Goal, kind: str, title: str, body: str = "") -> None:
    session.add(
        Notification(user_id=goal.created_by, deal_id=goal.deal_id, goal_id=goal.id, kind=kind, title=title, body=body)
    )


def _runnable_tasks(tasks: list[dict[str, Any]]) -> list[dict[str, Any]]:
    status = {t["id"]: t["status"] for t in tasks}
    return [
        t for t in tasks if t["status"] == "pending" and all(status.get(dep, "done") in SETTLED for dep in t["after"])
    ]


def _dependents(tasks: list[dict[str, Any]], task_id: str) -> set[str]:
    found: set[str] = set()
    frontier = [task_id]
    while frontier:
        current = frontier.pop()
        for t in tasks:
            if current in t["after"] and t["id"] not in found:
                found.add(t["id"])
                frontier.append(t["id"])
    return found


def progress(goal: Goal) -> dict[str, Any]:
    tasks = goal.plan or []
    return {
        "tasks_total": len(tasks),
        "tasks_done": sum(1 for t in tasks if t["status"] == "done"),
        "tasks_waiting": sum(1 for t in tasks if t["status"] in {"blocked", "awaiting_approval"}),
        "open_questions": len((goal.pending or {}).get("asks", [])),
        "open_approvals": len((goal.pending or {}).get("approvals", [])),
    }


# --------------------------------------------------------------------------- cycle


@dataclass
class TaskResult:
    task_id: str
    agent: str
    summary: str
    effects: list[dict[str, Any]]
    tool_calls: list[dict[str, Any]]
    question: Any | None
    cost_usd: float
    notes: list[str] = field(default_factory=list)


async def run_cycle(goal_id: str) -> str:
    """Advance a goal by one cycle. Returns the goal's state afterwards. Safe to call repeatedly."""
    settings = get_settings()
    async with session_scope() as session:
        goal = await session.get(Goal, goal_id)
        if goal is None:
            return "missing"
        if goal.state not in RUNNABLE:
            return goal.state
        deal = await session.get(Deal, goal.deal_id)
        access = await access_for_goal(session, goal.created_by, goal.deal_id, goal.run_as or {}) if deal else None
        g = goal_snapshot(goal)
        d = deal_snapshot(deal) if deal else {}

    if access is None:
        return await _stop(g, "failed", "The person this goal runs for no longer has access to the deal.")
    if g["cycle"] >= g["max_cycles"]:
        return await _stop(g, "paused", f"Cycle limit of {g['max_cycles']} reached. Raise the limit to continue.")
    if g["budget_usd"] and g["spent_usd"] >= g["budget_usd"]:
        return await _stop(g, "paused", f"Budget of ${g['budget_usd']:.2f} is spent. Raise the budget to continue.")

    if g["state"] == "planning":
        plan = plan_goal(g["objective"], d, get_corpus().ontology)
        # Re-planning after an edit keeps finished work.
        previous = {t["id"]: t for t in g["plan"]}
        for task in plan["tasks"]:
            old = previous.get(task["id"])
            if old and old["status"] == "done":
                task.update(status="done", summary=old["summary"], runs=old.get("runs", 0))
        return await _apply_plan(g, plan)

    results: list[TaskResult] = []
    for task in _runnable_tasks(g["plan"])[: settings.goal_tasks_per_cycle]:
        state = await graph.run_task(g, d, task, access)
        output = state["output"]
        results.append(
            TaskResult(
                task["id"],
                task["agent"],
                output.summary,
                state.get("effects", []),
                state.get("tool_calls", []),
                output.question,
                output.cost_usd,
                output.notes,
            )
        )
    return await _apply_work(g, results)


async def _stop(g: dict[str, Any], state: str, reason: str) -> str:
    async with session_scope() as session:
        goal = await lock_goal(session, g["id"])
        if goal is None or goal.cycle != g["cycle"] or goal.state not in RUNNABLE:
            return goal.state if goal else "missing"
        goal.state, goal.state_reason = state, reason
        await EventLog(session, goal.id).add("goal_failed" if state == "failed" else "goal_paused", reason=reason)
        notify(session, goal, f"goal.{state}", "Goal stopped" if state == "failed" else "Goal paused", reason)
        return goal.state


async def _apply_plan(g: dict[str, Any], plan: dict[str, Any]) -> str:
    async with session_scope() as session:
        goal = await lock_goal(session, g["id"])
        if goal is None or goal.cycle != g["cycle"] or goal.state != "planning":
            return goal.state if goal else "missing"
        goal.requirements, goal.plan = plan["requirements"], plan["tasks"]
        goal.state, goal.state_reason = "running", ""
        goal.cycle += 1
        await EventLog(session, goal.id).add(
            "plan_created",
            "supervisor",
            template=plan["template"],
            requirements=[r["text"] for r in plan["requirements"]],
            tasks=[
                {"id": t["id"], "title": t["title"], "agent": specialists.get(t["agent"]).name} for t in plan["tasks"]
            ],
        )
        return goal.state


async def _apply_work(g: dict[str, Any], results: list[TaskResult]) -> str:
    settings = get_settings()
    async with session_scope() as session:
        goal = await lock_goal(session, g["id"])
        # A pause, cancel or edit that landed while the agents were working wins: discard the cycle.
        if goal is None or goal.cycle != g["cycle"] or goal.state != "running":
            return goal.state if goal else "missing"
        deal = await session.get(Deal, goal.deal_id, with_for_update=True)
        log = EventLog(session, goal.id)
        tasks = copy.deepcopy(goal.plan or [])
        by_id = {t["id"]: t for t in tasks}
        pending = copy.deepcopy(goal.pending or {})
        asks: list[dict[str, Any]] = pending.setdefault("asks", [])
        approvals: list[str] = pending.setdefault("approvals", [])

        for result in results:
            task = by_id[result.task_id]
            agent_name = specialists.get(result.agent).name
            task["runs"] = task.get("runs", 0) + 1
            await log.add("task_started", agent_name, task_id=task["id"], title=task["title"])

            # The deal keeps one current assessment per task. Earlier drafts are replaced, including
            # those left by an earlier goal on the same deal, so re-running a goal never duplicates
            # the register; anything a person already reviewed is kept. Research tasks answer a
            # goal's own question, so only this goal's drafts are replaced for those.
            stale = [Finding.deal_id == goal.deal_id, Finding.task_id == task["id"], Finding.status == "draft"]
            kept = [Finding.deal_id == goal.deal_id, Finding.task_id == task["id"]]
            if task["id"] == "research":
                stale.append(Finding.goal_id == goal.id)
                kept.append(Finding.goal_id == goal.id)
            await session.execute(delete(Finding).where(*stale))
            reviewed = {row[0] for row in await session.execute(select(Finding.title).where(*kept))}
            recorded = []
            awaiting = False
            for effect in result.effects:
                if effect["type"] == "finding":
                    task["evidenced"] = True  # every recorded item passed the evidence guard
                    if effect["title"] in reviewed:
                        continue
                    session.add(
                        Finding(
                            deal_id=goal.deal_id,
                            goal_id=goal.id,
                            task_id=task["id"],
                            kind=effect["kind"],
                            workstream=effect["workstream"],
                            title=effect["title"],
                            detail=effect["detail"],
                            severity=effect["severity"],
                            evidence=effect["evidence"],
                            produced_by=f"{result.agent}:{effect['source']}",
                        )
                    )
                    recorded.append({"kind": effect["kind"], "severity": effect["severity"], "title": effect["title"]})
                elif effect["type"] == "action":
                    awaiting = (
                        await _apply_action(session, log, goal, deal, task, result.agent, effect, approvals) or awaiting
                    )

            denied = [c for c in result.tool_calls if c["effect"] == policy.DENY]
            await log.add(
                "task_worked",
                agent_name,
                task_id=task["id"],
                tools=sorted({c["tool"] for c in result.tool_calls if c["effect"] == policy.ALLOW}),
                recorded=recorded,
                notes=result.notes,
            )
            await audit.record(
                session,
                actor=result.agent,
                actor_type="agent",
                action="agent.task",
                deal_id=goal.deal_id,
                resource=f"goal:{goal.id}/task:{task['id']}",
                outcome="denied" if denied else "ok",
                detail={
                    "on_behalf_of": goal.created_by,
                    "tool_calls": [{"tool": c["tool"], "effect": c["effect"]} for c in result.tool_calls],
                    "recorded": len(recorded),
                },
            )

            task["summary"] = result.summary
            if result.question is not None:
                ask = {
                    "id": new_id()[:12],
                    "task_id": task["id"],
                    "kind": result.question.kind,
                    "text": result.question.text,
                    "fields": result.question.fields,
                }
                asks[:] = [a for a in asks if a["task_id"] != task["id"]] + [ask]
                task["status"], task["blocked_on"] = "blocked", result.question.blocked_on
                await log.add("question_asked", agent_name, task_id=task["id"], ask_id=ask["id"], question=ask["text"])
                notify(session, goal, "goal.question", f"{agent_name} needs an answer", ask["text"])
            elif awaiting:
                task["status"] = "awaiting_approval"
            else:
                task["status"], task["blocked_on"] = "done", ""
                await log.add("task_completed", agent_name, task_id=task["id"], summary=result.summary)
            goal.spent_usd = round(goal.spent_usd + result.cost_usd, 6)
            goal.steps += 1

        goal.plan, goal.pending = tasks, pending
        goal.new_documents = False
        goal.cycle += 1

        if goal.steps - goal.last_report_step >= settings.goal_report_every_steps:
            goal.last_report_step = goal.steps
            await log.add("progress_report", "supervisor", **progress(goal), spent_usd=goal.spent_usd)

        await _settle(session, log, goal)
        return goal.state


async def _apply_action(
    session: AsyncSession,
    log: EventLog,
    goal: Goal,
    deal: Deal | None,
    task: dict[str, Any],
    agent: str,
    effect: dict[str, Any],
    approvals: list[str],
) -> bool:
    """Returns True when the task must now wait for a person's approval."""
    agent_name = specialists.get(agent).name
    tool, args = effect["tool"], effect["args"]
    if effect["effect"] == policy.DENY:
        await log.add("action_denied", agent_name, task_id=task["id"], tool=tool, reason=effect["reason"])
        await audit.record(
            session,
            actor=agent,
            actor_type="agent",
            action=f"tool:{tool}",
            deal_id=goal.deal_id,
            resource=f"goal:{goal.id}",
            outcome="denied",
            detail={"reason": effect["reason"]},
        )
        return False
    if effect["effect"] == policy.APPROVAL:
        approval = Approval(
            deal_id=goal.deal_id,
            goal_id=goal.id,
            action=tool,
            summary=effect["summary"],
            payload={**{k: v for k, v in args.items() if k != "markdown"}, "task_id": task["id"]},
            requested_by=agent,
        )
        session.add(approval)
        await session.flush()
        approvals.append(approval.id)
        await log.add(
            "approval_requested",
            agent_name,
            task_id=task["id"],
            approval_id=approval.id,
            action=tool,
            summary=effect["summary"],
        )
        await audit.record(
            session,
            actor=agent,
            actor_type="agent",
            action="approval.requested",
            deal_id=goal.deal_id,
            resource=f"approval:{approval.id}",
            detail={"tool": tool, "on_behalf_of": goal.created_by},
        )
        notify(session, goal, "goal.approval", "Approval needed", effect["summary"])
        return True
    if tool == "absa_workstream_management.draft_deliverable" and deal is not None:
        twin = dict(deal.twin or {})
        twin["briefing"] = {
            "title": args["title"],
            "markdown": args["markdown"],
            "status": "draft",
            "goal_id": goal.id,
            "updated_at": now().isoformat(),
        }
        deal.twin = twin
        await log.add("deliverable_drafted", agent_name, task_id=task["id"], title=args["title"])
    return False


async def _settle(session: AsyncSession, log: EventLog, goal: Goal) -> None:
    """Decide what the goal does next once a cycle's results are in."""
    tasks = goal.plan or []
    if _runnable_tasks(tasks):
        goal.state, goal.state_reason = "running", ""
        return
    statuses = {t["status"] for t in tasks}
    if "awaiting_approval" in statuses:
        goal.state, goal.state_reason = "awaiting_approval", "Waiting for a person to approve a sensitive action."
        return
    if "blocked" in statuses:
        goal.state, goal.state_reason = "awaiting_input", "Waiting for an answer from the deal team."
        return
    if statuses <= SETTLED:
        await session.flush()
        # A task has delivered when it left evidence-linked work, or ended in an approved action.
        evidenced = {t["id"] for t in tasks if t.get("evidenced") or t.get("approved")}
        completion = check_requirements(goal.requirements or [], tasks, evidenced)
        goal.completion = completion
        goal.requirements = [
            {**r, "status": "met" if c["met"] else "unmet", "note": c["note"]}
            for r, c in zip(goal.requirements or [], completion["checks"], strict=True)
        ]
        goal.state, goal.state_reason = "done", ""
        met = sum(1 for c in completion["checks"] if c["met"])
        await log.add("completion_checked", "challenger", status=completion["status"], checks=completion["checks"])
        await log.add("goal_done", status=completion["status"])
        notify(
            session,
            goal,
            "goal.done",
            "Goal finished",
            f"{met} of {len(completion['checks'])} requirements met ({completion['status'].replace('_', ' ')}).",
        )
        return
    goal.state, goal.state_reason = (
        "failed",
        "The plan cannot make progress: a task is waiting on work that will never run.",
    )
    await log.add("goal_failed", reason=goal.state_reason)
    notify(session, goal, "goal.failed", "Goal stopped", goal.state_reason)


# --------------------------------------------------------------------------- operations


async def create_goal(
    session: AsyncSession,
    principal: Principal,
    access: Access,
    objective: str,
    *,
    budget_usd: float | None = None,
    max_cycles: int | None = None,
) -> Goal:
    settings = get_settings()
    objective = objective.strip()
    if len(objective) < 8:
        raise GoalError("Describe the goal in a sentence or more.", 422)
    goal = Goal(
        deal_id=access.deal.id,
        objective=objective,
        created_by=principal.sub,
        run_as={"via": "director" if principal.is_director else "member"},
        budget_usd=settings.goal_default_budget_usd if budget_usd is None else budget_usd,
        max_cycles=max_cycles or settings.goal_default_max_cycles,
    )
    session.add(goal)
    await session.flush()
    await EventLog(session, goal.id).add("goal_created", principal.sub, objective=objective)
    await audit.record(
        session,
        actor=principal.sub,
        actor_type="user",
        action="goal.create",
        deal_id=goal.deal_id,
        resource=f"goal:{goal.id}",
    )
    return goal


async def _owned(session: AsyncSession, goal_id: str) -> Goal:
    goal = await lock_goal(session, goal_id)
    if goal is None:
        raise GoalError("Goal not found.", 404)
    return goal


async def pause(session: AsyncSession, goal_id: str, actor: str) -> Goal:
    goal = await _owned(session, goal_id)
    if goal.state in TERMINAL or goal.state == "paused":
        raise GoalError(f"A goal that is {goal.state} cannot be paused.")
    goal.pending = {**(goal.pending or {}), "resume_to": goal.state}
    goal.state, goal.state_reason = "paused", "Paused by a person."
    await EventLog(session, goal.id).add("goal_paused", actor, reason=goal.state_reason)
    await audit.record(
        session, actor=actor, actor_type="user", action="goal.pause", deal_id=goal.deal_id, resource=f"goal:{goal.id}"
    )
    return goal


async def resume(session: AsyncSession, goal_id: str, actor: str) -> Goal:
    goal = await _owned(session, goal_id)
    if goal.state != "paused":
        raise GoalError("Only a paused goal can be resumed.")
    if goal.cycle >= goal.max_cycles:
        raise GoalError("The cycle limit is reached. Raise it before resuming.")
    if goal.budget_usd and goal.spent_usd >= goal.budget_usd:
        raise GoalError("The budget is spent. Raise it before resuming.")
    pending = dict(goal.pending or {})
    pending.pop("resume_to", None)
    goal.pending = pending
    goal.state = "running" if goal.plan else "planning"
    goal.state_reason = ""
    log = EventLog(session, goal.id)
    await log.add("goal_resumed", actor)
    if goal.plan:
        await _settle(session, log, goal)
    await audit.record(
        session, actor=actor, actor_type="user", action="goal.resume", deal_id=goal.deal_id, resource=f"goal:{goal.id}"
    )
    return goal


async def cancel(session: AsyncSession, goal_id: str, actor: str) -> Goal:
    goal = await _owned(session, goal_id)
    if goal.state in TERMINAL:
        raise GoalError(f"The goal is already {goal.state}.")
    for approval_id in (goal.pending or {}).get("approvals", []):
        approval = await session.get(Approval, approval_id)
        if approval and approval.state == "pending":
            approval.state, approval.decision_note, approval.decided_by, approval.decided_at = (
                "rejected",
                "Goal cancelled.",
                actor,
                now(),
            )
    goal.state, goal.state_reason, goal.pending = "cancelled", "Cancelled by a person.", {}
    await EventLog(session, goal.id).add("goal_cancelled", actor)
    await audit.record(
        session, actor=actor, actor_type="user", action="goal.cancel", deal_id=goal.deal_id, resource=f"goal:{goal.id}"
    )
    return goal


async def edit(
    session: AsyncSession,
    goal_id: str,
    actor: str,
    *,
    objective: str | None = None,
    budget_usd: float | None = None,
    max_cycles: int | None = None,
) -> Goal:
    goal = await _owned(session, goal_id)
    if goal.state in TERMINAL:
        raise GoalError(f"A goal that is {goal.state} cannot be edited.")
    changes: dict[str, Any] = {}
    if budget_usd is not None:
        if budget_usd < goal.spent_usd:
            raise GoalError("The budget cannot be set below what is already spent.", 422)
        goal.budget_usd, changes["budget_usd"] = budget_usd, budget_usd
    if max_cycles is not None:
        if max_cycles < goal.cycle:
            raise GoalError("The cycle limit cannot be set below the cycles already used.", 422)
        goal.max_cycles, changes["max_cycles"] = max_cycles, max_cycles
    if objective is not None and objective.strip() != goal.objective:
        if len(objective.strip()) < 8:
            raise GoalError("Describe the goal in a sentence or more.", 422)
        goal.objective, changes["objective"] = objective.strip(), objective.strip()
        if goal.state != "paused":
            goal.state, goal.state_reason = "planning", "Re-planning after the objective changed."
        goal.pending = {k: v for k, v in (goal.pending or {}).items() if k == "resume_to"}
    if changes:
        await EventLog(session, goal.id).add("goal_edited", actor, **changes)
        await audit.record(
            session,
            actor=actor,
            actor_type="user",
            action="goal.edit",
            deal_id=goal.deal_id,
            resource=f"goal:{goal.id}",
            detail={"fields": sorted(changes)},
        )
    return goal


def _reopen(tasks: list[dict[str, Any]], task_id: str) -> None:
    """Re-open a task and everything downstream of it, so later work reflects the new input."""
    for task in tasks:
        if task["id"] == task_id or task["id"] in _dependents(tasks, task_id):
            if task["status"] != "awaiting_approval":
                task["status"], task["blocked_on"] = "pending", ""
                task.pop("approved", None)
                task.pop("evidenced", None)


async def answer(
    session: AsyncSession,
    goal_id: str,
    principal: Principal,
    ask_id: str,
    *,
    text: str = "",
    values: dict[str, Any] | None = None,
    skip: bool = False,
) -> Goal:
    goal = await _owned(session, goal_id)
    pending = copy.deepcopy(goal.pending or {})
    ask = next((a for a in pending.get("asks", []) if a["id"] == ask_id), None)
    if ask is None:
        raise GoalError("That question is no longer open.", 404)
    tasks = copy.deepcopy(goal.plan or [])
    task = next(t for t in tasks if t["id"] == ask["task_id"])
    deal = await session.get(Deal, goal.deal_id, with_for_update=True)
    values = {k: v for k, v in (values or {}).items() if v not in (None, "")}
    recorded: list[str] = []

    if skip:
        task["status"], task["blocked_on"], task["summary"] = "skipped", "", "Skipped by the deal team."
    else:
        allowed = {f["key"] for f in ask["fields"]}
        unknown = set(values) - allowed
        if unknown:
            raise GoalError(f"Unexpected field(s): {', '.join(sorted(unknown))}.", 422)
        required = [f["key"] for f in ask["fields"] if f.get("optional") is not True]
        if ask["kind"] == "valuation_assumptions" and any(k not in values for k in required):
            raise GoalError("Cost of equity and long-term growth are both needed.", 422)
        if ask["kind"] in {"valuation_assumptions", "financial_inputs"} and not values:
            raise GoalError("Enter the figures, upload the statements to the deal, or skip this question.", 422)
        twin = copy.deepcopy(deal.twin or {})
        try:
            numbers = {k: float(v) for k, v in values.items()}
        except (TypeError, ValueError) as exc:
            raise GoalError("Figures must be numbers.", 422) from exc
        if ask["kind"] == "valuation_assumptions":
            twin["assumptions"] = {
                **(twin.get("assumptions") or {}),
                **{k: {"value": v, "set_by": principal.sub} for k, v in numbers.items()},
            }
        elif ask["kind"] == "financial_inputs":
            entered = {
                k: {"value": v, "status": "verified", "source": {"entered_by": principal.sub}}
                for k, v in numbers.items()
            }
            twin["financials"] = {**(twin.get("financials") or {}), **entered}
        deal.twin = twin
        recorded = sorted(values)
        _reopen(tasks, task["id"])

    pending["asks"] = [a for a in pending.get("asks", []) if a["id"] != ask_id]
    goal.plan, goal.pending = tasks, pending
    log = EventLog(session, goal.id)
    await log.add(
        "answer_received",
        principal.sub,
        ask_id=ask_id,
        task_id=task["id"],
        skipped=skip,
        fields=recorded,
        note=text[:500],
    )
    await audit.record(
        session,
        actor=principal.sub,
        actor_type="user",
        action="goal.answer",
        deal_id=goal.deal_id,
        resource=f"goal:{goal.id}",
        detail={"ask": ask["kind"], "skipped": skip, "fields": recorded},
    )
    if goal.state in {"awaiting_input", "running"}:
        goal.state = "running"
        await _settle(session, log, goal)
    return goal


async def decide_approval(
    session: AsyncSession, approval_id: str, principal: Principal, *, approve: bool, note: str = ""
) -> Approval:
    approval = await session.get(Approval, approval_id, with_for_update=True)
    if approval is None:
        raise GoalError("Approval not found.", 404)
    if approval.state != "pending":
        raise GoalError(f"This request was already {approval.state}.")
    approval.state = "approved" if approve else "rejected"
    approval.decided_by, approval.decided_at, approval.decision_note = principal.sub, now(), note[:1000]
    deal = await session.get(Deal, approval.deal_id, with_for_update=True)
    outcome = ""
    if approve and deal is not None:
        outcome = _carry_out(deal, approval, principal)
    await audit.record(
        session,
        actor=principal.sub,
        actor_type="user",
        action="approval.decided",
        deal_id=approval.deal_id,
        resource=f"approval:{approval.id}",
        outcome=approval.state,
        detail={"tool": approval.action, "requested_by": approval.requested_by, "note": note[:300]},
    )
    if approval.goal_id:
        goal = await lock_goal(session, approval.goal_id)
        if goal is not None and goal.state not in TERMINAL:
            tasks = copy.deepcopy(goal.plan or [])
            task = next((t for t in tasks if t["id"] == approval.payload.get("task_id")), None)
            if task is not None and task["status"] == "awaiting_approval":
                if approve:
                    task["status"], task["approved"] = "done", True
                    task["summary"] = f"{task['summary']} Approved by {principal.name}. {outcome}".strip()
                else:
                    task["status"], task["summary"] = (
                        "skipped",
                        f"Not approved by {principal.name}." + (f" {note}" if note else ""),
                    )
            pending = copy.deepcopy(goal.pending or {})
            pending["approvals"] = [a for a in pending.get("approvals", []) if a != approval.id]
            goal.plan, goal.pending = tasks, pending
            log = EventLog(session, goal.id)
            await log.add(
                "approval_decided",
                principal.sub,
                approval_id=approval.id,
                decision=approval.state,
                note=note[:500],
                outcome=outcome,
            )
            if goal.state in {"awaiting_approval", "running"}:
                goal.state = "running"
                await _settle(session, log, goal)
    return approval


def _carry_out(deal: Deal, approval: Approval, principal: Principal) -> str:
    """Apply an approved action. Anything that leaves the bank is carried out by a person:
    the platform has no outbound channel, by design."""
    payload, twin = approval.payload or {}, copy.deepcopy(deal.twin or {})
    if approval.action == "absa_governance_approvals.submit_deliverable":
        briefing = twin.get("briefing") or {}
        briefing.update(
            status="submitted",
            submitted_to=payload.get("forum", ""),
            approved_by=principal.sub,
            submitted_at=now().isoformat(),
        )
        twin["briefing"] = briefing
        deal.twin = twin
        return f"Marked as submitted to the {payload.get('forum', 'forum')}."
    if approval.action == "absa_deal_management.change_stage":
        deal.stage_id = payload.get("stage_id", deal.stage_id)
        return f"Stage changed to {deal.stage_id}."
    if approval.action == "absa_deal_management.change_status":
        deal.status = payload.get("status", deal.status)
        return f"Status changed to {deal.status}."
    return "Approved for a person to carry out; the platform does not send anything outside the bank."


async def on_documents_added(session: AsyncSession, deal_id: str, actor: str, filenames: list[str]) -> list[str]:
    """New documents wake the deal's open goals: evidence-dependent tasks run again."""
    goals = (
        (
            await session.execute(
                select(Goal).where(
                    Goal.deal_id == deal_id, Goal.state.in_(["running", "awaiting_input", "awaiting_approval"])
                )
            )
        )
        .scalars()
        .all()
    )
    woken = []
    for row in goals:
        goal = await lock_goal(session, row.id)
        if goal is None or not goal.plan:
            continue
        tasks = copy.deepcopy(goal.plan)
        pending = copy.deepcopy(goal.pending or {})
        for task in tasks:
            evidence_driven = task["agent"] in {"intake", "legal", "regulatory", "technology", "financial"}
            waiting_on_documents = task["status"] == "blocked" and task["blocked_on"] == "financial_inputs"
            if (evidence_driven and task["status"] in {"done", "pending"}) or waiting_on_documents:
                _reopen(tasks, task["id"])
        reopened = {t["id"] for t in tasks if t["status"] == "pending"}
        # An approval requested on the strength of the old evidence is withdrawn; the task will ask again.
        stale = {
            t["id"] for t in tasks if t["status"] == "awaiting_approval" and any(dep in reopened for dep in t["after"])
        }
        for approval_id in list(pending.get("approvals", [])):
            approval = await session.get(Approval, approval_id)
            if approval is not None and approval.state == "pending" and approval.payload.get("task_id") in stale:
                approval.state, approval.decision_note, approval.decided_by, approval.decided_at = (
                    "rejected",
                    "Withdrawn: new documents arrived.",
                    "system",
                    now(),
                )
                pending["approvals"].remove(approval_id)
        for task in tasks:
            if task["id"] in stale:
                task["status"] = "pending"
        reopened |= stale
        pending["asks"] = [a for a in pending.get("asks", []) if a["task_id"] not in reopened]
        goal.plan, goal.pending, goal.new_documents = tasks, pending, True
        log = EventLog(session, goal.id)
        await log.add("documents_added", actor, files=filenames[:20])
        goal.state = "running"
        await _settle(session, log, goal)
        woken.append(goal.id)
    return woken


async def claim_runnable(session: AsyncSession, worker: str, limit: int = 4, lease_seconds: int = 300) -> list[str]:
    """Lease goals that are ready for a cycle. Leases expire, so a crashed worker's goals are picked up again."""
    current = now()
    rows = (
        (
            await session.execute(
                select(Goal)
                .where(Goal.state.in_(sorted(RUNNABLE)))
                .order_by(Goal.updated_at)
                .limit(limit * 3)
                .with_for_update(skip_locked=True)
            )
        )
        .scalars()
        .all()
    )
    claimed = []
    for goal in rows:
        lease = goal.lease_until
        if lease is not None and lease.tzinfo is None:
            lease = lease.replace(tzinfo=current.tzinfo)
        if lease is not None and lease > current and goal.lease_owner != worker:
            continue
        goal.lease_owner, goal.lease_until = worker, current + timedelta(seconds=lease_seconds)
        claimed.append(goal.id)
        if len(claimed) >= limit:
            break
    return claimed
