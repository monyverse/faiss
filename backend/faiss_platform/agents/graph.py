"""The per-task agent graph (LangGraph): gather → assess → guard.

gather   deterministic: retrieves the approved methodology, probes the data room, reads the
         Deal Twin. Every read is a policy-checked tool call made with the creator's access.
assess   the reasoner turns the gathered evidence into drafts (baseline, plus model analysis
         when the gateway is configured).
guard    nothing leaves a task without evidence: drafts citing nothing are dropped, vocabulary
         is normalised, and proposed actions are put through the policy engine.

The graph writes nothing. It returns effects, which the goal engine applies in one transaction.
"""

from __future__ import annotations

from typing import Any, TypedDict

from langgraph.graph import END, START, StateGraph
from sqlalchemy import select

from .. import africa, finance, policy
from ..db import Document, Finding, session_scope
from ..documents import find_anchored, missing_document_types
from ..knowledge import WORKSTREAM_SPOKE, get_corpus
from ..retrieval import Filters, get_retriever
from ..security import Access
from . import specialists
from .reasoner import KINDS, SEVERITIES, EvidenceBook, TaskInput, TaskOutput, get_reasoner

SPOKE_LABEL = {spoke: label for label, spoke in WORKSTREAM_SPOKE.items()} | {"general": "General"}


class TaskState(TypedDict, total=False):
    goal: dict[str, Any]
    deal: dict[str, Any]
    task: dict[str, Any]
    access: Access
    input: TaskInput
    output: TaskOutput
    tool_calls: list[dict[str, Any]]
    effects: list[dict[str, Any]]


def _methodology_queries(
    agent: specialists.Specialist,
    task: dict[str, Any],
    deal: dict[str, Any],
    stage: dict[str, Any] | None,
    objective: str,
) -> list[tuple[str, Filters, int]]:
    stage_title = (stage or {}).get("title", "")
    focus = task["params"].get("focus")
    base = f"{task['title']} {stage_title}"
    if agent.key == "integration":
        if focus == "workstreams":
            return [(f"workstreams required {deal['archetype_name']}", Filters(area="deal-archetypes"), 3)]
        if focus == "mobilisation":
            return [("mobilisation first 10 days activities outcomes", Filters(area="mobilisation"), 4)]
        if focus == "governance":
            return [("governance forum chair cadence decision steering committee", Filters(area="governance"), 4)]
        return [(objective, Filters(), 5)]
    if agent.key == "intake":
        return [
            (
                "due diligence data room documents information requests",
                Filters(area="lifecycle", tags={"archetype": deal["archetype_id"]}),
                2,
            )
        ]
    if agent.key == "supervisor":
        return [("steering committee decision papers approval go no-go", Filters(area="governance"), 2)]
    queries: list[tuple[str, Filters, int]] = []
    if agent.workstream:
        queries.append((base, Filters(tags={"workstream": agent.workstream}), 3))
    if deal.get("stage_id"):
        queries.append(
            (
                f"{agent.workstream_label} {stage_title}",
                Filters(area="lifecycle", tags={"archetype": deal["archetype_id"], "stage": deal["stage_id"]}),
                2,
            )
        )
    return queries or [(base, Filters(), 3)]


async def gather(state: TaskState) -> dict[str, Any]:
    goal, deal, task, access = state["goal"], state["deal"], state["task"], state["access"]
    agent = specialists.get(task["agent"])
    ontology = get_corpus().ontology
    stage = ontology.stage(deal["archetype_id"], deal["stage_id"]) if deal.get("stage_id") else None
    book = EvidenceBook()
    calls: list[dict[str, Any]] = []

    def permitted(tool: str, args: dict[str, Any]) -> bool:
        decision = policy.evaluate(
            agent.key, tool, creator_can_write=access.can_write, creator_can_manage=access.can_manage
        )
        calls.append({"tool": tool, "args": args, "effect": decision.effect, "reason": decision.reason})
        return decision.effect == policy.ALLOW

    methodology: list[str] = []
    retriever = get_retriever()
    for query, filters, limit in _methodology_queries(agent, task, deal, stage, goal["objective"]):
        if not permitted("absa_document_search.methodology", {"query": query, "area": filters.area or ""}):
            continue
        for passage in await retriever.search(query, limit=limit, filters=filters):
            ref = book.add(passage.citation(), passage.chunk.text)
            if ref not in methodology:
                methodology.append(ref)
    if not methodology and permitted("absa_document_search.methodology", {"query": task["title"]}):
        for passage in await retriever.search(f"{task['title']} {agent.workstream_label}", limit=2):
            methodology.append(book.add(passage.citation(), passage.chunk.text))

    probes = []
    extras: dict[str, Any] = {}
    twin = deal.get("twin") or {}
    async with session_scope() as session:
        for probe in agent.probes:
            refs: list[str] = []
            if permitted("absa_document_search.deal_documents", {"topic": probe.topic}):
                for hit in await find_anchored(session, access, probe.pattern, limit=2):
                    refs.append(book.add(hit.citation(), hit.text))
            probes.append((probe, refs))

        if agent.key == "intake":
            docs = (
                (
                    await session.execute(
                        select(Document).where(Document.deal_id == deal["id"]).order_by(Document.created_at)
                    )
                )
                .scalars()
                .all()
            )
            extras["documents"] = [
                {
                    "filename": d.filename,
                    "doc_type": d.doc_type,
                    "status": d.status,
                    "note": (d.extracted or {}).get("note", ""),
                    "ref": book.add(
                        {
                            "kind": "document",
                            "id": d.id,
                            "title": d.filename,
                            "quote": f"Classified as {d.doc_type.replace('_', ' ')}",
                            "doc_type": d.doc_type,
                        },
                        f"{d.filename} ({d.doc_type})",
                    ),
                }
                for d in docs
                if access.sees(d.workstream)
            ]
            extras["missing"] = await missing_document_types(session, deal["id"])

        if agent.key in {"financial", "challenger", "supervisor"} and permitted(
            "absa_financial_analysis.run" if agent.key == "financial" else "absa_deal_management.get_twin", {}
        ):
            analysis = finance.analyse(twin)
            extras["analysis"] = analysis
            extras["unverified_inputs"] = analysis["unverified_inputs"]
            if agent.key == "financial":
                refs = []
                for key, entry in (twin.get("financials") or {}).items():
                    source = entry.get("source") if isinstance(entry, dict) else None
                    if isinstance(source, dict) and source.get("document"):
                        refs.append(
                            book.add(
                                {
                                    "kind": "document",
                                    "id": source["document"],
                                    "title": source["document"],
                                    "page": source.get("page"),
                                    "quote": source.get("quote", ""),
                                },
                                f"{finance.LINE_ITEMS.get(key, key)}: {source.get('quote', '')}",
                            )
                        )
                if analysis["inputs"] and not refs:
                    refs.append(
                        book.add(
                            {
                                "kind": "deal-twin",
                                "id": deal["id"],
                                "title": "Figures recorded on the Deal Twin",
                                "quote": "Entered by the deal team",
                            },
                            "Figures entered on the Deal Twin by the deal team.",
                        )
                    )
                extras["fact_refs"] = list(dict.fromkeys(refs))[:6]

        if agent.key == "country":
            iso = task["params"].get("country", "")
            if permitted("absa_regulatory_intelligence.country_profile", {"country": iso}):
                pack = africa.country(iso)
                extras["pack"] = pack
                if pack:
                    summary = f"Banking supervisor: {pack['authorities']['banking_supervisor']}. Competition: {pack['authorities']['competition']}. Regional: {', '.join(pack['regional_competition_bodies']) or 'none listed'}."
                    extras["pack_ref"] = book.add(
                        {
                            "kind": "country-pack",
                            "id": pack["iso"],
                            "title": f"Country pack — {pack['name']} (unverified seed data)",
                            "quote": pack["caveat"],
                        },
                        summary,
                    )

        if agent.key in {"risk", "challenger", "supervisor"}:
            rows = (
                (
                    await session.execute(
                        select(Finding).where(Finding.goal_id == goal["id"]).order_by(Finding.created_at)
                    )
                )
                .scalars()
                .all()
            )
            visible = [f for f in rows if access.sees(f.workstream)]
            listing = [
                {
                    "id": f.id,
                    "kind": f.kind,
                    "title": f.title,
                    "detail": f.detail,
                    "severity": f.severity,
                    "status": f.status,
                    "workstream": f.workstream,
                    "workstream_label": SPOKE_LABEL.get(f.workstream, f.workstream),
                    "task_id": f.task_id,
                    "evidence": f.evidence,
                }
                for f in visible
            ]
            extras["findings"] = listing
            if agent.key == "risk":
                items = []
                for f in listing:
                    if f["kind"] not in {"gap", "finding"} or f["task_id"] in {"risk", "challenge"}:
                        continue
                    refs = [
                        book.add({k: v for k, v in c.items() if k != "ref"}, c.get("quote", ""))
                        for c in (f["evidence"] or [])[:2]
                    ]
                    items.append({**f, "refs": refs})
                extras["open_items"] = items
            if agent.key == "challenger":
                extras["unverified_countries"] = [
                    c for c in deal["countries"] if (africa.country(c) or {}).get("verified") is False
                ]

        if agent.key == "integration":
            if permitted("absa_workstream_management.requirements", {}):
                extras["workstream_requirements"] = ontology.workstream_requirements(deal["archetype_id"])
            extras["forums"] = ontology.forums

    task_input = TaskInput(
        task=task,
        agent=agent,
        deal=deal,
        stage=stage,
        book=book,
        methodology=methodology,
        probes=probes,
        extras=extras,
        objective=goal["objective"],
        goal_id=goal["id"],
        user_sub=goal["created_by"],
    )
    return {"input": task_input, "tool_calls": calls}


async def assess(state: TaskState) -> dict[str, Any]:
    task_input = state["input"]
    reasoner = get_reasoner()
    output = await reasoner.assess(task_input)
    if task_input.agent.key == "supervisor":
        from ..gateway import CallContext

        for action in output.actions:
            if action.tool == "absa_workstream_management.draft_deliverable":
                context = CallContext(
                    "briefing",
                    deal_id=task_input.deal["id"],
                    goal_id=task_input.goal_id,
                    agent="supervisor",
                    user_sub=task_input.user_sub,
                )
                action.args["markdown"], cost = await reasoner.refine_briefing(action.args["markdown"], context)
                output.cost_usd += cost
    return {"output": output}


async def guard(state: TaskState) -> dict[str, Any]:
    task_input, output, access = state["input"], state["output"], state["access"]
    agent, book = task_input.agent, task_input.book
    effects: list[dict[str, Any]] = []
    calls = list(state.get("tool_calls", []))
    dropped = 0
    seen_titles: set[str] = set()
    for draft in output.drafts:
        refs = [r for r in dict.fromkeys(draft.evidence) if r in book.items]
        title = draft.title.strip()
        if not refs or not title or title in seen_titles:
            dropped += 1
            continue
        seen_titles.add(title)
        kind = draft.kind if draft.kind in KINDS else "finding"
        tool = "absa_workstream_management.create_request" if kind == "request" else "absa_risk_register.record"
        decision = policy.evaluate(
            agent.key, tool, creator_can_write=access.can_write, creator_can_manage=access.can_manage
        )
        if decision.effect != policy.ALLOW:
            calls.append({"tool": tool, "args": {"title": title}, "effect": decision.effect, "reason": decision.reason})
            dropped += 1
            continue
        effects.append(
            {
                "type": "finding",
                "kind": kind,
                "title": title[:300],
                "detail": draft.detail,
                "severity": draft.severity if draft.severity in SEVERITIES else "info",
                "workstream": draft.workstream or "general",
                "evidence": book.citations(refs),
                "source": draft.source,
            }
        )
    if dropped:
        output.notes.append(f"{dropped} draft(s) discarded: no valid evidence, a duplicate, or not permitted.")

    for action in output.actions:
        decision = policy.evaluate(
            agent.key, action.tool, creator_can_write=access.can_write, creator_can_manage=access.can_manage
        )
        calls.append(
            {
                "tool": action.tool,
                "args": {k: v for k, v in action.args.items() if k != "markdown"},
                "effect": decision.effect,
                "reason": decision.reason,
            }
        )
        effects.append(
            {
                "type": "action",
                "tool": action.tool,
                "args": action.args,
                "summary": action.summary,
                "effect": decision.effect,
                "reason": decision.reason,
            }
        )
    return {"effects": effects, "tool_calls": calls}


def build_graph() -> Any:
    graph = StateGraph(TaskState)
    graph.add_node("gather", gather)
    graph.add_node("assess", assess)
    graph.add_node("guard", guard)
    graph.add_edge(START, "gather")
    graph.add_edge("gather", "assess")
    graph.add_edge("assess", "guard")
    graph.add_edge("guard", END)
    return graph.compile()


_graph: Any = None


async def run_task(goal: dict[str, Any], deal: dict[str, Any], task: dict[str, Any], access: Access) -> TaskState:
    global _graph
    if _graph is None:
        _graph = build_graph()
    return await _graph.ainvoke({"goal": goal, "deal": deal, "task": task, "access": access})
