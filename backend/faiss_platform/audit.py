"""Tamper-evident audit trail.

Every row stores the hash of the previous row, so a deleted or edited entry breaks the chain
and `verify_chain` reports where. In AWS the same events are also meant to be shipped to the
write-once audit archive bucket; this table is the queryable copy.
"""

from __future__ import annotations

import hashlib
import json
from typing import Any

from sqlalchemy import select, text
from sqlalchemy.ext.asyncio import AsyncSession

from .db import AuditEvent, now

_LOCK_KEY = 7741001


def _digest(
    prev_hash: str,
    stamp: str,
    actor: str,
    actor_type: str,
    action: str,
    deal_id: str | None,
    resource: str,
    outcome: str,
    detail: dict[str, Any],
) -> str:
    body = json.dumps(
        [prev_hash, stamp, actor, actor_type, action, deal_id or "", resource, outcome, detail],
        sort_keys=True,
        separators=(",", ":"),
        default=str,
    )
    return hashlib.sha256(body.encode()).hexdigest()


async def record(
    session: AsyncSession,
    *,
    actor: str,
    actor_type: str,
    action: str,
    deal_id: str | None = None,
    resource: str = "",
    outcome: str = "ok",
    detail: dict[str, Any] | None = None,
) -> AuditEvent:
    detail = detail or {}
    if session.bind is not None and session.bind.dialect.name == "postgresql":
        # One writer at a time appends to the chain, across all replicas.
        await session.execute(text("SELECT pg_advisory_xact_lock(:k)"), {"k": _LOCK_KEY})
    await session.flush()
    last = (
        await session.execute(select(AuditEvent.hash).order_by(AuditEvent.id.desc()).limit(1))
    ).scalar_one_or_none() or ""
    ts = now()
    stamp = ts.isoformat()
    event = AuditEvent(
        ts=ts,
        stamp=stamp,
        actor=actor,
        actor_type=actor_type,
        action=action,
        deal_id=deal_id,
        resource=resource,
        outcome=outcome,
        detail=detail,
        prev_hash=last,
        hash=_digest(last, stamp, actor, actor_type, action, deal_id, resource, outcome, detail),
    )
    session.add(event)
    await session.flush()
    return event


async def verify_chain(session: AsyncSession) -> dict[str, Any]:
    prev = ""
    count = 0
    rows = await session.stream_scalars(select(AuditEvent).order_by(AuditEvent.id))
    async for row in rows:
        count += 1
        expected = _digest(
            prev, row.stamp, row.actor, row.actor_type, row.action, row.deal_id, row.resource, row.outcome, row.detail
        )
        if row.prev_hash != prev or row.hash != expected:
            return {"intact": False, "events": count, "broken_at_id": row.id}
        prev = row.hash
    return {"intact": True, "events": count, "broken_at_id": None}
