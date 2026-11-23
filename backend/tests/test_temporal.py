"""Goals scheduled by Temporal: one workflow per goal, sleeping while it waits for a person.

Uses Temporal's time-skipping test server (downloaded on first run). Skipped when it cannot start.
"""

from __future__ import annotations

import uuid

import pytest
from sqlalchemy import select
from temporalio.worker import Worker

from faiss_platform.db import Approval, Deal, DealMember, Goal, session_scope
from faiss_platform.goals import engine
from faiss_platform.goals.temporal_workflow import GoalWorkflow, goal_state, run_goal_cycle
from faiss_platform.security import DEV_DIRECTORY, resolve_access

DIRECTOR = DEV_DIRECTORY["naledi.director"]


@pytest.fixture
async def temporal():
    from temporalio.testing import WorkflowEnvironment

    try:
        env = await WorkflowEnvironment.start_time_skipping()
    except Exception as exc:  # no network, or the test server binary is unavailable for this platform
        pytest.skip(f"Temporal test server unavailable: {exc}")
    async with env:
        yield env


async def test_workflow_runs_cycles_sleeps_while_waiting_and_finishes(temporal, samples):
    from faiss_platform.documents import ingest_document

    async with session_scope() as session:
        deal = Deal(
            code_name="Project Baobab",
            archetype_id="full-business-acquisition",
            stage_id="due-diligence",
            countries=["KE"],
            created_by=DIRECTOR.sub,
        )
        session.add(deal)
        await session.flush()
        session.add(DealMember(deal_id=deal.id, user_id=DIRECTOR.sub, role="deal_lead"))
        for path in sorted(samples.iterdir()):
            await ingest_document(
                session,
                deal,
                filename=path.name,
                content_type="text/plain",
                data=path.read_bytes(),
                uploaded_by=DIRECTOR.sub,
            )
        access = await resolve_access(session, DIRECTOR, deal.id, write=True)
        goal_id = (
            await engine.create_goal(
                session,
                DIRECTOR,
                access,
                "Run due diligence on the target and prepare the investment committee briefing",
            )
        ).id

    queue = f"faiss-test-{uuid.uuid4().hex[:8]}"
    async with Worker(
        temporal.client, task_queue=queue, workflows=[GoalWorkflow], activities=[run_goal_cycle, goal_state]
    ):
        handle = await temporal.client.start_workflow(
            GoalWorkflow.run, goal_id, id=f"faiss-goal-{goal_id}", task_queue=queue
        )

        async def wait_for(state: str) -> Goal:
            for _ in range(200):
                async with session_scope() as session:
                    goal = await session.get(Goal, goal_id)
                if goal.state == state:
                    return goal
                await temporal.sleep(1)
            raise AssertionError(f"goal never reached {state}; it is {goal.state}")

        goal = await wait_for("awaiting_input")
        async with session_scope() as session:
            await engine.answer(
                session,
                goal_id,
                DIRECTOR,
                goal.pending["asks"][0]["id"],
                values={"cost_of_equity": 20, "long_term_growth": 6},
            )
        await handle.signal(GoalWorkflow.wake)

        await wait_for("awaiting_approval")
        async with session_scope() as session:
            approval = (await session.execute(select(Approval).where(Approval.goal_id == goal_id))).scalar_one()
            await engine.decide_approval(session, approval.id, DIRECTOR, approve=True)
        await handle.signal(GoalWorkflow.wake)

        assert await handle.result() == "done"
    async with session_scope() as session:
        goal = await session.get(Goal, goal_id)
        assert goal.state == "done" and goal.completion["status"] == "verified"
