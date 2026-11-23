"""Temporal scheduling for goals (used when FAISS_TEMPORAL_ADDRESS is set).

One workflow per goal. The workflow holds no business state: it calls the idempotent
`run_cycle` activity until the goal stops being runnable, then sleeps until it is signalled
(an answer, an approval, new documents, a resume). Timers, retries and history are Temporal's.
"""

from __future__ import annotations

from datetime import timedelta

from temporalio import activity, workflow
from temporalio.common import RetryPolicy

with workflow.unsafe.imports_passed_through():
    from ..config import get_settings

RUNNABLE = ("planning", "running")
TERMINAL = ("done", "failed", "cancelled", "missing")
CONTINUE_AS_NEW_AFTER = 200


@activity.defn(name="faiss.run_goal_cycle")
async def run_goal_cycle(goal_id: str) -> str:
    from . import engine

    return await engine.run_cycle(goal_id)


@activity.defn(name="faiss.goal_state")
async def goal_state(goal_id: str) -> str:
    from ..db import Goal, session_scope

    async with session_scope() as session:
        goal = await session.get(Goal, goal_id)
        return goal.state if goal else "missing"


@workflow.defn(name="FaissGoal")
class GoalWorkflow:
    def __init__(self) -> None:
        self._woken = False

    @workflow.signal
    def wake(self) -> None:
        self._woken = True

    @workflow.run
    async def run(self, goal_id: str) -> str:
        retry = RetryPolicy(
            initial_interval=timedelta(seconds=2), maximum_interval=timedelta(minutes=2), maximum_attempts=0
        )
        cycles = 0
        while True:
            state = await workflow.execute_activity(
                run_goal_cycle, goal_id, start_to_close_timeout=timedelta(minutes=15), retry_policy=retry
            )
            cycles += 1
            if state in TERMINAL:
                return state
            if state not in RUNNABLE:
                self._woken = False
                # Sleep until a person or an event wakes the goal; re-check daily in case a signal was missed.
                try:
                    await workflow.wait_condition(lambda: self._woken, timeout=timedelta(days=1))
                except TimeoutError:
                    pass
                state = await workflow.execute_activity(
                    goal_state, goal_id, start_to_close_timeout=timedelta(seconds=30), retry_policy=retry
                )
                if state in TERMINAL:
                    return state
            if cycles >= CONTINUE_AS_NEW_AFTER:
                workflow.continue_as_new(goal_id)


def workflow_id(goal_id: str) -> str:
    return f"faiss-goal-{goal_id}"


async def _client():
    from temporalio.client import Client

    settings = get_settings()
    return await Client.connect(settings.temporal_address, namespace=settings.temporal_namespace)


async def start_goal(goal_id: str) -> None:
    from temporalio.common import WorkflowIDReusePolicy

    client = await _client()
    await client.start_workflow(
        GoalWorkflow.run,
        goal_id,
        id=workflow_id(goal_id),
        task_queue=get_settings().temporal_task_queue,
        id_reuse_policy=WorkflowIDReusePolicy.ALLOW_DUPLICATE,
    )


async def signal_wake(goal_id: str) -> None:
    """Wake the goal's workflow, starting it if it is not running (first cycle, or after it ended)."""
    from temporalio.client import WorkflowExecutionStatus
    from temporalio.service import RPCError

    client = await _client()
    handle = client.get_workflow_handle(workflow_id(goal_id))
    try:
        description = await handle.describe()
        if description.status == WorkflowExecutionStatus.RUNNING:
            await handle.signal(GoalWorkflow.wake)
            return
    except RPCError:
        pass
    await start_goal(goal_id)


async def run_worker() -> None:
    from temporalio.worker import Worker

    settings = get_settings()
    client = await _client()
    worker = Worker(
        client,
        task_queue=settings.temporal_task_queue,
        workflows=[GoalWorkflow],
        activities=[run_goal_cycle, goal_state],
    )
    await worker.run()
