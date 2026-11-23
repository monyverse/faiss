"""Schedules goal cycles.

Two schedulers run the same idempotent `engine.run_cycle`:
  - the built-in one (below): workers lease runnable goals from the database and run a cycle.
    Any number of workers can run; a crashed worker's lease expires and another takes over.
  - Temporal (temporal_workflow.py), used when FAISS_TEMPORAL_ADDRESS is set: one workflow per
    goal, with timers, retries and history kept by the Temporal service.
"""

from __future__ import annotations

import asyncio
import logging
import os
import socket

from sqlalchemy import update

from ..config import get_settings
from ..db import Goal, session_scope
from . import engine

log = logging.getLogger("faiss.goals")


class GoalRunner:
    def __init__(self, worker_id: str | None = None) -> None:
        self.worker_id = worker_id or f"{socket.gethostname()}-{os.getpid()}"
        self._stop = asyncio.Event()
        self._task: asyncio.Task[None] | None = None

    async def run_once(self) -> int:
        """Run one cycle for every goal that is ready. Returns how many cycles ran."""
        async with session_scope() as session:
            goal_ids = await engine.claim_runnable(session, self.worker_id)
        for goal_id in goal_ids:
            try:
                await engine.run_cycle(goal_id)
            except Exception:
                log.exception("Goal %s: cycle failed; it will be retried", goal_id)
            finally:
                async with session_scope() as session:
                    await session.execute(
                        update(Goal)
                        .where(Goal.id == goal_id, Goal.lease_owner == self.worker_id)
                        .values(lease_until=None)
                    )
        return len(goal_ids)

    async def run_forever(self) -> None:
        settings = get_settings()
        log.info("Goal runner %s started", self.worker_id)
        while not self._stop.is_set():
            try:
                ran = await self.run_once()
            except Exception:
                log.exception("Goal runner poll failed")
                ran = 0
            if ran == 0:
                try:
                    await asyncio.wait_for(self._stop.wait(), timeout=settings.worker_poll_seconds)
                except TimeoutError:
                    pass

    def start(self) -> None:
        self._task = asyncio.create_task(self.run_forever(), name="faiss-goal-runner")

    async def stop(self) -> None:
        self._stop.set()
        if self._task is not None:
            await self._task


async def drain(max_cycles: int = 200) -> int:
    """Run cycles until no goal is ready. For tests and one-shot commands."""
    runner = GoalRunner("drain")
    total = 0
    while total < max_cycles:
        ran = await runner.run_once()
        if ran == 0:
            break
        total += ran
    return total


async def wake(goal_id: str) -> None:
    """Tell the scheduler a goal may be ready. The built-in scheduler polls, so only Temporal needs telling."""
    if get_settings().temporal_address:
        from .temporal_workflow import signal_wake

        await signal_wake(goal_id)
