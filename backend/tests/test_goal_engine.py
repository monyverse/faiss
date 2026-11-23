"""The goal engine end to end, offline: plan, work, ask, wait, resume, approval, completion check."""

from __future__ import annotations

from sqlalchemy import select

from faiss_platform import audit
from faiss_platform.db import Approval, Deal, DealMember, Finding, Goal, GoalEvent, Notification, session_scope
from faiss_platform.documents import ingest_document
from faiss_platform.goals import engine
from faiss_platform.goals.runner import drain
from faiss_platform.security import DEV_DIRECTORY, resolve_access

DIRECTOR = DEV_DIRECTORY["naledi.director"]
OBJECTIVE = "Run due diligence on the target and prepare the investment committee briefing"


async def make_deal(countries=("KE",)) -> str:
    async with session_scope() as session:
        deal = Deal(
            code_name="Project Baobab",
            target_name="Savanna Commercial Bank",
            archetype_id="full-business-acquisition",
            stage_id="due-diligence",
            countries=list(countries),
            created_by=DIRECTOR.sub,
        )
        session.add(deal)
        await session.flush()
        session.add(DealMember(deal_id=deal.id, user_id=DIRECTOR.sub, role="deal_lead"))
        return deal.id


async def upload(deal_id: str, path) -> None:
    async with session_scope() as session:
        deal = await session.get(Deal, deal_id)
        await ingest_document(
            session,
            deal,
            filename=path.name,
            content_type="text/plain",
            data=path.read_bytes(),
            uploaded_by=DIRECTOR.sub,
        )
        await engine.on_documents_added(session, deal_id, DIRECTOR.sub, [path.name])


async def start_goal(deal_id: str, objective: str = OBJECTIVE) -> str:
    async with session_scope() as session:
        access = await resolve_access(session, DIRECTOR, deal_id, write=True)
        return (await engine.create_goal(session, DIRECTOR, access, objective)).id


async def load(goal_id: str) -> Goal:
    async with session_scope() as session:
        return await session.get(Goal, goal_id)


async def test_diligence_goal_runs_to_a_verified_finish(samples):
    deal_id = await make_deal()
    for path in sorted(samples.iterdir()):
        await upload(deal_id, path)
    goal_id = await start_goal(deal_id)

    # It works on its own until it needs something only the deal team can give.
    await drain()
    goal = await load(goal_id)
    assert goal.state == "awaiting_input", goal.state_reason
    ask = goal.pending["asks"][0]
    assert ask["kind"] == "valuation_assumptions"
    statuses = {t["id"]: t["status"] for t in goal.plan}
    assert statuses["intake"] == statuses["legal"] == statuses["technology"] == statuses["country-KE"] == "done"
    assert statuses["financial"] == "blocked" and statuses["risk"] == "pending"

    async with session_scope() as session:
        await engine.answer(session, goal_id, DIRECTOR, ask["id"], values={"cost_of_equity": 20, "long_term_growth": 6})
    await drain()
    goal = await load(goal_id)
    assert goal.state == "awaiting_approval", goal.state_reason

    async with session_scope() as session:
        approval = (await session.execute(select(Approval).where(Approval.goal_id == goal_id))).scalar_one()
        assert approval.action == "absa_governance_approvals.submit_deliverable" and approval.state == "pending"
        deal = await session.get(Deal, deal_id)
        assert deal.twin["briefing"]["status"] == "draft"
        await engine.decide_approval(session, approval.id, DIRECTOR, approve=True, note="Reviewed.")
    await drain()

    goal = await load(goal_id)
    assert goal.state == "done"
    assert goal.completion["status"] == "verified", goal.completion
    async with session_scope() as session:
        deal = await session.get(Deal, deal_id)
        assert deal.twin["briefing"]["status"] == "submitted"
        findings = (await session.execute(select(Finding).where(Finding.goal_id == goal_id))).scalars().all()
        assert findings and all(f.evidence for f in findings), "every recorded item must carry evidence"
        titles = {f.title for f in findings}
        assert "Valuation range (deterministic engine)" in titles
        valuation = next(f for f in findings if f.title.startswith("Valuation range"))
        assert "0.84x" in valuation.detail  # (17.74% - 6%) / (20% - 6%)
        assert any(f.kind == "risk" for f in findings) and any(f.kind == "request" for f in findings)
        assert any(f.title.startswith("Authorities to engage — Kenya") for f in findings)
        types = [
            e.type
            for e in (
                await session.execute(select(GoalEvent).where(GoalEvent.goal_id == goal_id).order_by(GoalEvent.seq))
            ).scalars()
        ]
        assert types[0] == "goal_created" and types[-1] == "goal_done"
        for expected in (
            "plan_created",
            "question_asked",
            "answer_received",
            "approval_requested",
            "approval_decided",
            "completion_checked",
        ):
            assert expected in types
        kinds = [n.kind for n in (await session.execute(select(Notification))).scalars()]
        assert kinds.count("goal.question") == 1 and kinds.count("goal.approval") == 1 and kinds.count("goal.done") == 1
        assert (await audit.verify_chain(session))["intact"]


async def test_goal_waits_for_documents_then_resumes(samples):
    deal_id = await make_deal()
    goal_id = await start_goal(deal_id)
    await drain()
    goal = await load(goal_id)
    assert goal.state == "awaiting_input"
    assert goal.pending["asks"][0]["kind"] == "financial_inputs"
    async with session_scope() as session:
        gaps = (
            (await session.execute(select(Finding).where(Finding.goal_id == goal_id, Finding.kind == "gap")))
            .scalars()
            .all()
        )
        assert any("Audited financial statements" in g.title for g in gaps)

    await upload(deal_id, samples / "Savanna_Commercial_Bank_Audited_Financial_Statements_FY2025.txt")
    await drain()
    goal = await load(goal_id)
    assert goal.state == "awaiting_input"
    assert goal.pending["asks"][0]["kind"] == "valuation_assumptions"  # figures arrived; now it needs assumptions
    async with session_scope() as session:
        gaps = (
            (await session.execute(select(Finding).where(Finding.goal_id == goal_id, Finding.kind == "gap")))
            .scalars()
            .all()
        )
        assert not any("Audited financial statements" in g.title for g in gaps), (
            "the gap closes once the document arrives"
        )


async def test_cycle_is_idempotent_and_pause_wins(samples):
    deal_id = await make_deal(countries=())
    goal_id = await start_goal(deal_id, "Set out how we mobilise this deal in the first ten days")
    assert await engine.run_cycle(goal_id) == "running"  # planned
    goal = await load(goal_id)
    snapshot = engine.goal_snapshot(goal)
    assert await engine._apply_plan(snapshot, {"template": "x", "requirements": [], "tasks": []}) == "running"
    assert len((await load(goal_id)).plan) > 0, "a stale cycle must not overwrite the plan"

    async with session_scope() as session:
        await engine.pause(session, goal_id, DIRECTOR.sub)
    assert await engine.run_cycle(goal_id) == "paused"
    async with session_scope() as session:
        await engine.resume(session, goal_id, DIRECTOR.sub)
    await drain()
    goal = await load(goal_id)
    assert goal.state == "done" and goal.completion["status"] == "verified", (goal.state, goal.completion)


async def test_rejected_approval_leaves_requirement_unmet(samples):
    deal_id = await make_deal()
    for path in sorted(samples.iterdir()):
        await upload(deal_id, path)
    goal_id = await start_goal(deal_id)
    await drain()
    goal = await load(goal_id)
    async with session_scope() as session:
        await engine.answer(
            session,
            goal_id,
            DIRECTOR,
            goal.pending["asks"][0]["id"],
            values={"cost_of_equity": 20, "long_term_growth": 6},
        )
    await drain()
    async with session_scope() as session:
        approval = (await session.execute(select(Approval).where(Approval.goal_id == goal_id))).scalar_one()
        await engine.decide_approval(session, approval.id, DIRECTOR, approve=False, note="Not ready for committee.")
    await drain()
    goal = await load(goal_id)
    assert goal.state == "done" and goal.completion["status"] == "partially_met"
    unmet = [c for c in goal.completion["checks"] if not c["met"]]
    assert [c["id"] for c in unmet] == ["R7"]
    async with session_scope() as session:
        assert (await session.get(Deal, deal_id)).twin["briefing"]["status"] == "draft"


async def test_rerunning_a_goal_replaces_the_register_instead_of_duplicating_it(samples):
    deal_id = await make_deal()
    for path in sorted(samples.iterdir()):
        await upload(deal_id, path)

    async def run_to_approval() -> str:
        goal_id = await start_goal(deal_id)
        await drain()
        goal = await load(goal_id)
        if goal.state == "awaiting_input":
            async with session_scope() as session:
                await engine.answer(
                    session,
                    goal_id,
                    DIRECTOR,
                    goal.pending["asks"][0]["id"],
                    values={"cost_of_equity": 20, "long_term_growth": 6},
                )
            await drain()
        return goal_id

    first = await run_to_approval()
    async with session_scope() as session:
        before = (await session.execute(select(Finding).where(Finding.deal_id == deal_id))).scalars().all()
        keep = next(f for f in before if f.kind == "risk")
        keep.status, keep.reviewed_by = "validated", DIRECTOR.sub
        kept_id, count = keep.id, len(before)
    second = await run_to_approval()
    async with session_scope() as session:
        after = (await session.execute(select(Finding).where(Finding.deal_id == deal_id))).scalars().all()
        assert len(after) == count, "a second run must not grow the register"
        assert len({(f.kind, f.title) for f in after}) == len(after)
        assert any(f.id == kept_id and f.status == "validated" for f in after), "a person's review survives"
        assert {f.goal_id for f in after} == {first, second}  # the reviewed item stays with the goal that produced it
    assert (await load(second)).state == "awaiting_approval"
    assert first != second
