"""Goals, approvals, notifications and the assistant conversation."""

from __future__ import annotations

import json
from collections.abc import AsyncIterator
from typing import Any

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Query
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
from sqlalchemy import func, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from .. import audit
from ..agents import specialists
from ..agents.reasoner import Evidence, get_reasoner
from ..db import Approval, Conversation, Deal, Goal, GoalEvent, Message, Notification, get_session, session_scope
from ..documents import search_deal_documents
from ..gateway import CallContext
from ..goals import engine, runner
from ..knowledge import get_corpus
from ..retrieval import Filters, get_retriever
from ..security import Access, Principal, get_principal, resolve_access, visible_deal_ids

router = APIRouter(tags=["work"])


class GoalIn(BaseModel):
    objective: str = Field(min_length=8, max_length=2000)
    budget_usd: float | None = Field(default=None, ge=0, le=10000)
    max_cycles: int | None = Field(default=None, ge=1, le=500)


class GoalPatch(BaseModel):
    objective: str | None = Field(default=None, min_length=8, max_length=2000)
    budget_usd: float | None = Field(default=None, ge=0, le=10000)
    max_cycles: int | None = Field(default=None, ge=1, le=500)


class AnswerIn(BaseModel):
    ask_id: str
    text: str = Field(default="", max_length=4000)
    values: dict[str, float | str | None] = Field(default_factory=dict)
    skip: bool = False


class DecisionIn(BaseModel):
    approve: bool
    note: str = Field(default="", max_length=1000)


class ChatIn(BaseModel):
    question: str = Field(min_length=2, max_length=4000)
    deal_id: str | None = None
    conversation_id: str | None = None


def goal_out(goal: Goal, *, detail: bool = True) -> dict[str, Any]:
    out: dict[str, Any] = {
        "id": goal.id,
        "deal_id": goal.deal_id,
        "objective": goal.objective,
        "state": goal.state,
        "state_reason": goal.state_reason,
        "progress": engine.progress(goal),
        "cycle": goal.cycle,
        "max_cycles": goal.max_cycles,
        "steps": goal.steps,
        "budget_usd": goal.budget_usd,
        "spent_usd": goal.spent_usd,
        "created_by": goal.created_by,
        "completion": goal.completion or None,
        "created_at": goal.created_at.isoformat(),
        "updated_at": goal.updated_at.isoformat(),
        "asks": (goal.pending or {}).get("asks", []),
        "approval_ids": (goal.pending or {}).get("approvals", []),
    }
    if detail:
        out["requirements"] = goal.requirements or []
        out["tasks"] = [
            {
                "id": t["id"],
                "title": t["title"],
                "agent": t["agent"],
                "agent_name": specialists.get(t["agent"]).name,
                "status": t["status"],
                "summary": t["summary"],
                "after": t["after"],
                "requirement_ids": t["requirement_ids"],
                "blocked_on": t.get("blocked_on", ""),
            }
            for t in goal.plan or []
        ]
    return out


def _visible_tasks(goal: Goal, access: Access) -> set[str]:
    return {t["id"] for t in goal.plan or [] if access.sees(specialists.get(t["agent"]).workstream or "general")}


def scoped(out: dict[str, Any], goal: Goal, access: Access) -> dict[str, Any]:
    """A member limited to some workstreams sees a goal's headline, and only their workstreams' tasks,
    questions and activity. Summaries and titles from other workstreams never reach them."""
    if access.full:
        return out
    visible = _visible_tasks(goal, access)
    if "tasks" in out:
        out["tasks"] = [t for t in out["tasks"] if t["id"] in visible]
    out["asks"] = [a for a in out["asks"] if a["task_id"] in visible]
    out["approval_ids"] = []
    if out.get("completion"):
        out["completion"] = {**out["completion"], "checks": [{**c, "note": ""} for c in out["completion"]["checks"]]}
    if "requirements" in out:
        out["requirements"] = [{**r, "note": ""} for r in out["requirements"]]
    out["restricted_view"] = True
    return out


def _scoped_event(event: GoalEvent, visible: set[str] | None) -> dict[str, Any] | None:
    payload = event.payload or {}
    if visible is not None:
        if payload.get("task_id") and payload["task_id"] not in visible:
            return None
        if event.type == "plan_created":
            payload = {**payload, "tasks": [t for t in payload.get("tasks", []) if t["id"] in visible]}
        if event.type == "completion_checked":
            payload = {**payload, "checks": [{**c, "note": ""} for c in payload.get("checks", [])]}
    return {"seq": event.seq, "ts": event.ts.isoformat(), "type": event.type, "actor": event.actor, "payload": payload}


async def _goal_access(
    session: AsyncSession, principal: Principal, goal_id: str, *, control: bool = False
) -> tuple[Goal, Access]:
    goal = await session.get(Goal, goal_id)
    if goal is None:
        raise HTTPException(404, "Goal not found.")
    access = await resolve_access(session, principal, goal.deal_id, write=control)
    if control and not (goal.created_by == principal.sub or access.can_manage):
        raise HTTPException(403, "Only the person who set this goal, or a deal lead, can change it.")
    return goal, access


def _raise(exc: engine.GoalError) -> None:
    raise HTTPException(exc.status, str(exc)) from exc


# ------------------------------------------------------------------ goals


@router.post("/deals/{deal_id}/goals", status_code=201)
async def create_goal(
    deal_id: str,
    body: GoalIn,
    background: BackgroundTasks,
    principal: Principal = Depends(get_principal),
    session: AsyncSession = Depends(get_session),
) -> dict[str, Any]:
    access = await resolve_access(session, principal, deal_id, write=True)
    try:
        goal = await engine.create_goal(
            session, principal, access, body.objective, budget_usd=body.budget_usd, max_cycles=body.max_cycles
        )
    except engine.GoalError as exc:
        _raise(exc)
    background.add_task(runner.wake, goal.id)
    return scoped(goal_out(goal), goal, access)


@router.get("/deals/{deal_id}/goals")
async def list_deal_goals(
    deal_id: str, principal: Principal = Depends(get_principal), session: AsyncSession = Depends(get_session)
) -> list[dict[str, Any]]:
    access = await resolve_access(session, principal, deal_id)
    rows = (
        (await session.execute(select(Goal).where(Goal.deal_id == deal_id).order_by(Goal.created_at.desc())))
        .scalars()
        .all()
    )
    return [scoped(goal_out(g, detail=False), g, access) for g in rows]


@router.get("/goals")
async def list_goals(
    state: str | None = None,
    principal: Principal = Depends(get_principal),
    session: AsyncSession = Depends(get_session),
) -> list[dict[str, Any]]:
    """Every goal on the deals the caller can see: the control room."""
    visible = await visible_deal_ids(session, principal)
    query = select(Goal, Deal.code_name).join(Deal, Deal.id == Goal.deal_id).order_by(Goal.updated_at.desc()).limit(200)
    if visible is not None:
        if not visible:
            return []
        query = query.where(Goal.deal_id.in_(visible))
    if state:
        query = query.where(Goal.state.in_(state.split(",")))
    out, by_deal = [], {}
    for goal, code_name in (await session.execute(query)).all():
        if goal.deal_id not in by_deal:
            by_deal[goal.deal_id] = await resolve_access(session, principal, goal.deal_id)
        out.append({**scoped(goal_out(goal, detail=False), goal, by_deal[goal.deal_id]), "deal_code_name": code_name})
    return out


@router.get("/goals/{goal_id}")
async def get_goal(
    goal_id: str, principal: Principal = Depends(get_principal), session: AsyncSession = Depends(get_session)
) -> dict[str, Any]:
    goal, access = await _goal_access(session, principal, goal_id)
    out = scoped(goal_out(goal), goal, access)
    out["can_control"] = access.can_write and (goal.created_by == principal.sub or access.can_manage)
    return out


@router.get("/goals/{goal_id}/events")
async def goal_events(
    goal_id: str,
    after: int = Query(default=0, ge=0),
    principal: Principal = Depends(get_principal),
    session: AsyncSession = Depends(get_session),
) -> dict[str, Any]:
    """The goal's append-only log. Pass `after` to fetch only what is new; from 0 it replays everything."""
    goal, access = await _goal_access(session, principal, goal_id)
    visible = None if access.full else _visible_tasks(goal, access)
    rows = (
        (
            await session.execute(
                select(GoalEvent).where(GoalEvent.goal_id == goal_id, GoalEvent.seq > after).order_by(GoalEvent.seq)
            )
        )
        .scalars()
        .all()
    )
    events = [e for e in (_scoped_event(row, visible) for row in rows) if e is not None]
    return {"state": goal.state, "events": events}


@router.patch("/goals/{goal_id}")
async def edit_goal(
    goal_id: str,
    body: GoalPatch,
    background: BackgroundTasks,
    principal: Principal = Depends(get_principal),
    session: AsyncSession = Depends(get_session),
) -> dict[str, Any]:
    _, access = await _goal_access(session, principal, goal_id, control=True)
    try:
        goal = await engine.edit(session, goal_id, principal.sub, **body.model_dump(exclude_unset=True))
    except engine.GoalError as exc:
        _raise(exc)
    background.add_task(runner.wake, goal.id)
    return scoped(goal_out(goal), goal, access)


@router.post("/goals/{goal_id}/answers")
async def answer_goal(
    goal_id: str,
    body: AnswerIn,
    background: BackgroundTasks,
    principal: Principal = Depends(get_principal),
    session: AsyncSession = Depends(get_session),
) -> dict[str, Any]:
    goal, access = await _goal_access(session, principal, goal_id, control=True)
    ask = next((a for a in (goal.pending or {}).get("asks", []) if a["id"] == body.ask_id), None)
    if ask and ask["kind"] in {"valuation_assumptions", "financial_inputs"} and not access.sees("finance-tax"):
        raise HTTPException(403, "Financial questions on this deal are for the Finance & Tax workstream.")
    try:
        goal = await engine.answer(
            session, goal_id, principal, body.ask_id, text=body.text, values=body.values, skip=body.skip
        )
    except engine.GoalError as exc:
        _raise(exc)
    background.add_task(runner.wake, goal.id)
    return scoped(goal_out(goal), goal, access)


@router.post("/goals/{goal_id}/{action}")
async def control_goal(
    goal_id: str,
    action: str,
    background: BackgroundTasks,
    principal: Principal = Depends(get_principal),
    session: AsyncSession = Depends(get_session),
) -> dict[str, Any]:
    operations = {"pause": engine.pause, "resume": engine.resume, "cancel": engine.cancel}
    if action not in operations:
        raise HTTPException(404, "Unknown action.")
    _, access = await _goal_access(session, principal, goal_id, control=True)
    try:
        goal = await operations[action](session, goal_id, principal.sub)
    except engine.GoalError as exc:
        _raise(exc)
    background.add_task(runner.wake, goal.id)
    return scoped(goal_out(goal), goal, access)


# ------------------------------------------------------------------ approvals


def approval_out(a: Approval, code_name: str = "", can_decide: bool = False) -> dict[str, Any]:
    return {
        "id": a.id,
        "deal_id": a.deal_id,
        "deal_code_name": code_name,
        "goal_id": a.goal_id,
        "action": a.action,
        "summary": a.summary,
        "payload": {k: v for k, v in (a.payload or {}).items() if k != "task_id"},
        "state": a.state,
        "requested_by": specialists.get(a.requested_by).name
        if a.requested_by in specialists.SPECIALISTS
        else a.requested_by,
        "decided_by": a.decided_by,
        "decision_note": a.decision_note,
        "created_at": a.created_at.isoformat(),
        "decided_at": a.decided_at.isoformat() if a.decided_at else None,
        "can_decide": can_decide,
    }


@router.get("/approvals")
async def list_approvals(
    state: str = "pending", principal: Principal = Depends(get_principal), session: AsyncSession = Depends(get_session)
) -> list[dict[str, Any]]:
    visible = await visible_deal_ids(session, principal)
    query = (
        select(Approval, Deal.code_name)
        .join(Deal, Deal.id == Approval.deal_id)
        .order_by(Approval.created_at.desc())
        .limit(200)
    )
    if state != "all":
        query = query.where(Approval.state == state)
    if visible is not None:
        if not visible:
            return []
        query = query.where(Approval.deal_id.in_(visible))
    out = []
    for approval, code_name in (await session.execute(query)).all():
        access = await resolve_access(session, principal, approval.deal_id)
        if not access.full:
            continue  # an approval describes work across the whole deal
        out.append(approval_out(approval, code_name, access.can_manage and approval.state == "pending"))
    return out


@router.post("/approvals/{approval_id}/decision")
async def decide(
    approval_id: str,
    body: DecisionIn,
    background: BackgroundTasks,
    principal: Principal = Depends(get_principal),
    session: AsyncSession = Depends(get_session),
) -> dict[str, Any]:
    approval = await session.get(Approval, approval_id)
    if approval is None:
        raise HTTPException(404, "Approval not found.")
    # Sensitive actions are decided by the deal lead or a Group M&A Director, never by an agent.
    await resolve_access(session, principal, approval.deal_id, write=True, manage=True)
    try:
        approval = await engine.decide_approval(session, approval_id, principal, approve=body.approve, note=body.note)
    except engine.GoalError as exc:
        _raise(exc)
    if approval.goal_id:
        background.add_task(runner.wake, approval.goal_id)
    return approval_out(approval)


# ------------------------------------------------------------------ notifications


@router.get("/notifications")
async def notifications(
    principal: Principal = Depends(get_principal), session: AsyncSession = Depends(get_session)
) -> dict[str, Any]:
    rows = (
        (
            await session.execute(
                select(Notification)
                .where(Notification.user_id == principal.sub)
                .order_by(Notification.id.desc())
                .limit(50)
            )
        )
        .scalars()
        .all()
    )
    unread = (
        await session.execute(
            select(func.count())
            .select_from(Notification)
            .where(Notification.user_id == principal.sub, Notification.read.is_(False))
        )
    ).scalar_one()
    return {
        "unread": unread,
        "items": [
            {
                "id": n.id,
                "kind": n.kind,
                "title": n.title,
                "body": n.body,
                "deal_id": n.deal_id,
                "goal_id": n.goal_id,
                "read": n.read,
                "created_at": n.created_at.isoformat(),
            }
            for n in rows
        ],
    }


@router.post("/notifications/read")
async def mark_read(
    principal: Principal = Depends(get_principal), session: AsyncSession = Depends(get_session)
) -> dict[str, Any]:
    await session.execute(
        update(Notification)
        .where(Notification.user_id == principal.sub, Notification.read.is_(False))
        .values(read=True)
    )
    return {"unread": 0}


# ------------------------------------------------------------------ assistant


async def _evidence(session: AsyncSession, question: str, access: Access | None) -> tuple[list[Evidence], str]:
    retriever = get_retriever()
    passages = await retriever.search(question, limit=6)
    deal_note = ""
    evidence: list[Evidence] = []
    if access is not None:
        deal = access.deal
        ontology = get_corpus().ontology
        archetype = ontology.archetype(deal.archetype_id) or {}
        stage = ontology.stage(deal.archetype_id, deal.stage_id) or {}
        deal_note = f"Deal context: archetype {archetype.get('name', deal.archetype_id)}, lifecycle stage {stage.get('title', 'not set')}, countries {', '.join(deal.countries or []) or 'not set'}."
        # Passages about this deal's own archetype and stage are the ones most likely to matter.
        scoped = (
            await retriever.search(
                question, limit=2, filters=Filters(tags={"archetype": deal.archetype_id, "stage": deal.stage_id})
            )
            if deal.stage_id
            else []
        )
        seen = {p.chunk.id for p in passages}
        passages = [p for p in scoped if p.chunk.id not in seen] + passages
        for hit in await search_deal_documents(session, access, question, limit=3):
            evidence.append(Evidence("", {**hit.citation(), "title": f"{hit.filename} (deal document)"}, hit.text))
    evidence += [Evidence("", p.citation(), p.chunk.text) for p in passages[:6]]
    for n, item in enumerate(evidence, start=1):
        item.ref = str(n)
        item.citation["n"] = n
    return evidence, deal_note


async def _conversation(
    session: AsyncSession, principal: Principal, body: ChatIn
) -> tuple[Conversation, list[dict[str, str]]]:
    if body.conversation_id:
        conversation = await session.get(Conversation, body.conversation_id)
        if conversation is None or conversation.user_id != principal.sub:
            raise HTTPException(404, "Conversation not found.")
        if conversation.deal_id != body.deal_id:
            raise HTTPException(409, "A conversation stays with the deal it started on.")
        rows = (
            (
                await session.execute(
                    select(Message).where(Message.conversation_id == conversation.id).order_by(Message.id)
                )
            )
            .scalars()
            .all()
        )
        return conversation, [{"role": m.role, "content": m.content} for m in rows]
    conversation = Conversation(user_id=principal.sub, deal_id=body.deal_id, title=body.question.strip()[:80])
    session.add(conversation)
    await session.flush()
    return conversation, []


@router.post("/chat")
async def chat(
    body: ChatIn, principal: Principal = Depends(get_principal), session: AsyncSession = Depends(get_session)
) -> dict[str, Any]:
    access = await resolve_access(session, principal, body.deal_id) if body.deal_id else None
    conversation, history = await _conversation(session, principal, body)
    evidence, deal_note = await _evidence(session, body.question, access)
    context = CallContext("chat", deal_id=body.deal_id, user_sub=principal.sub)
    text, _cost = await get_reasoner().answer(body.question, evidence, history, context, deal_note)
    citations = [e.citation for e in evidence]
    session.add(Message(conversation_id=conversation.id, role="user", content=body.question))
    session.add(Message(conversation_id=conversation.id, role="assistant", content=text, citations=citations))
    await audit.record(
        session,
        actor=principal.sub,
        actor_type="user",
        action="chat.ask",
        deal_id=body.deal_id,
        resource=f"conversation:{conversation.id}",
        detail={"sources": len(citations)},
    )
    return {"conversation_id": conversation.id, "answer": text, "citations": citations, "mode": get_reasoner().mode}


def _sse(event: str, data: dict[str, Any]) -> str:
    return f"event: {event}\ndata: {json.dumps(data, ensure_ascii=False)}\n\n"


@router.post("/chat/stream")
async def chat_stream(body: ChatIn, principal: Principal = Depends(get_principal)) -> StreamingResponse:
    """Server-sent events: `meta` (conversation id and sources), `delta` (answer text), `done`."""
    async with session_scope() as session:
        access = await resolve_access(session, principal, body.deal_id) if body.deal_id else None
        conversation, history = await _conversation(session, principal, body)
        evidence, deal_note = await _evidence(session, body.question, access)
        conversation_id = conversation.id
        session.add(Message(conversation_id=conversation_id, role="user", content=body.question))
        await audit.record(
            session,
            actor=principal.sub,
            actor_type="user",
            action="chat.ask",
            deal_id=body.deal_id,
            resource=f"conversation:{conversation_id}",
            detail={"sources": len(evidence)},
        )
    citations = [e.citation for e in evidence]
    reasoner = get_reasoner()

    async def events() -> AsyncIterator[str]:
        yield _sse("meta", {"conversation_id": conversation_id, "citations": citations, "mode": reasoner.mode})
        parts: list[str] = []
        try:
            async for delta in reasoner.stream_answer(
                body.question,
                evidence,
                history,
                CallContext("chat", deal_id=body.deal_id, user_sub=principal.sub),
                deal_note,
            ):
                parts.append(delta)
                yield _sse("delta", {"text": delta})
        finally:
            # Keep whatever was produced, even if the reader went away mid-answer.
            if parts:
                async with session_scope() as session:
                    session.add(
                        Message(
                            conversation_id=conversation_id,
                            role="assistant",
                            content="".join(parts),
                            citations=citations,
                        )
                    )
        yield _sse("done", {})

    return StreamingResponse(
        events(), media_type="text/event-stream", headers={"Cache-Control": "no-store", "X-Accel-Buffering": "no"}
    )


@router.get("/conversations")
async def conversations(
    deal_id: str | None = None,
    principal: Principal = Depends(get_principal),
    session: AsyncSession = Depends(get_session),
) -> list[dict[str, Any]]:
    query = (
        select(Conversation)
        .where(Conversation.user_id == principal.sub)
        .order_by(Conversation.updated_at.desc())
        .limit(50)
    )
    query = query.where(Conversation.deal_id == deal_id) if deal_id else query.where(Conversation.deal_id.is_(None))
    if deal_id:
        await resolve_access(session, principal, deal_id)
    rows = (await session.execute(query)).scalars().all()
    return [{"id": c.id, "title": c.title, "deal_id": c.deal_id, "updated_at": c.updated_at.isoformat()} for c in rows]


@router.get("/conversations/{conversation_id}")
async def conversation(
    conversation_id: str, principal: Principal = Depends(get_principal), session: AsyncSession = Depends(get_session)
) -> dict[str, Any]:
    row = await session.get(Conversation, conversation_id)
    if row is None or row.user_id != principal.sub:
        raise HTTPException(404, "Conversation not found.")
    if row.deal_id:
        # Leaving a deal also closes the door on conversations held about it.
        await resolve_access(session, principal, row.deal_id)
    messages = (
        (await session.execute(select(Message).where(Message.conversation_id == conversation_id).order_by(Message.id)))
        .scalars()
        .all()
    )
    return {
        "id": row.id,
        "title": row.title,
        "deal_id": row.deal_id,
        "messages": [{"role": m.role, "content": m.content, "citations": m.citations} for m in messages],
    }
