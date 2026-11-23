"""Database engine, session factory and the persistent model (Deal Twin, goals, audit)."""

from __future__ import annotations

import uuid
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager
from datetime import UTC, datetime
from typing import Any

from sqlalchemy import JSON, Boolean, DateTime, Float, ForeignKey, Index, Integer, String, Text, UniqueConstraint
from sqlalchemy.ext.asyncio import AsyncEngine, AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

from .config import get_settings


def now() -> datetime:
    return datetime.now(UTC)


def new_id() -> str:
    return uuid.uuid4().hex


class Base(DeclarativeBase):
    type_annotation_map = {dict[str, Any]: JSON, list[Any]: JSON, list[str]: JSON}


class Deal(Base):
    """The Deal Twin: the persistent, server-side state of one transaction."""

    __tablename__ = "deals"
    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=new_id)
    code_name: Mapped[str] = mapped_column(String(120))
    target_name: Mapped[str] = mapped_column(String(200), default="")
    archetype_id: Mapped[str] = mapped_column(String(80))
    stage_id: Mapped[str] = mapped_column(String(80), default="")
    countries: Mapped[list[str]] = mapped_column(JSON, default=list)
    sector: Mapped[str] = mapped_column(String(80), default="Banking")
    description: Mapped[str] = mapped_column(Text, default="")
    status: Mapped[str] = mapped_column(String(20), default="active")
    # Structured facts about the target: financial inputs, valuation assumptions, key dates.
    twin: Mapped[dict[str, Any]] = mapped_column(JSON, default=dict)
    created_by: Mapped[str] = mapped_column(String(120))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now, onupdate=now)


class DealMember(Base):
    __tablename__ = "deal_members"
    __table_args__ = (UniqueConstraint("deal_id", "user_id"),)
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    deal_id: Mapped[str] = mapped_column(ForeignKey("deals.id", ondelete="CASCADE"), index=True)
    user_id: Mapped[str] = mapped_column(String(120), index=True)
    role: Mapped[str] = mapped_column(String(40), default="member")  # deal_lead | member | viewer
    # ["*"] means every workstream; otherwise the member sees only these workstreams' material.
    workstreams: Mapped[list[str]] = mapped_column(JSON, default=lambda: ["*"])


class Document(Base):
    __tablename__ = "documents"
    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=new_id)
    deal_id: Mapped[str] = mapped_column(ForeignKey("deals.id", ondelete="CASCADE"), index=True)
    filename: Mapped[str] = mapped_column(String(300))
    content_type: Mapped[str] = mapped_column(String(120), default="")
    size: Mapped[int] = mapped_column(Integer, default=0)
    sha256: Mapped[str] = mapped_column(String(64))
    storage_uri: Mapped[str] = mapped_column(String(500))
    doc_type: Mapped[str] = mapped_column(String(60), default="other")
    workstream: Mapped[str] = mapped_column(String(60), default="general")
    status: Mapped[str] = mapped_column(String(30), default="processed")
    extracted: Mapped[dict[str, Any]] = mapped_column(JSON, default=dict)
    uploaded_by: Mapped[str] = mapped_column(String(120))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now)


class DocumentChunk(Base):
    __tablename__ = "document_chunks"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    document_id: Mapped[str] = mapped_column(ForeignKey("documents.id", ondelete="CASCADE"), index=True)
    deal_id: Mapped[str] = mapped_column(String(32), index=True)
    ordinal: Mapped[int] = mapped_column(Integer)
    page: Mapped[int | None] = mapped_column(Integer, nullable=True)
    text: Mapped[str] = mapped_column(Text)


class Finding(Base):
    """An evidence-linked observation: a finding, a risk, a gap or a diligence request."""

    __tablename__ = "findings"
    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=new_id)
    deal_id: Mapped[str] = mapped_column(ForeignKey("deals.id", ondelete="CASCADE"), index=True)
    goal_id: Mapped[str | None] = mapped_column(String(32), nullable=True, index=True)
    task_id: Mapped[str | None] = mapped_column(String(60), nullable=True)
    kind: Mapped[str] = mapped_column(String(20), default="finding")  # finding | risk | gap | request
    workstream: Mapped[str] = mapped_column(String(60), default="general")
    title: Mapped[str] = mapped_column(String(300))
    detail: Mapped[str] = mapped_column(Text, default="")
    severity: Mapped[str] = mapped_column(String(12), default="info")  # info | low | medium | high | critical
    # draft = produced by an agent, not yet reviewed; validated / rejected = a person decided.
    status: Mapped[str] = mapped_column(String(12), default="draft")
    evidence: Mapped[list[Any]] = mapped_column(JSON, default=list)
    produced_by: Mapped[str] = mapped_column(String(60), default="")
    reviewed_by: Mapped[str | None] = mapped_column(String(120), nullable=True)
    review_note: Mapped[str] = mapped_column(Text, default="")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now)


class Goal(Base):
    """A goal handed to the agents. It keeps running without the user and returns only when
    something changed or a person is needed."""

    __tablename__ = "goals"
    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=new_id)
    deal_id: Mapped[str] = mapped_column(ForeignKey("deals.id", ondelete="CASCADE"), index=True)
    objective: Mapped[str] = mapped_column(Text)
    # planning | running | awaiting_input | awaiting_approval | paused | done | failed | cancelled
    state: Mapped[str] = mapped_column(String(24), default="planning", index=True)
    state_reason: Mapped[str] = mapped_column(String(200), default="")
    requirements: Mapped[list[Any]] = mapped_column(JSON, default=list)
    plan: Mapped[list[Any]] = mapped_column(JSON, default=list)
    pending: Mapped[dict[str, Any]] = mapped_column(JSON, default=dict)
    completion: Mapped[dict[str, Any]] = mapped_column(JSON, default=dict)
    cycle: Mapped[int] = mapped_column(Integer, default=0)
    steps: Mapped[int] = mapped_column(Integer, default=0)
    last_report_step: Mapped[int] = mapped_column(Integer, default=0)
    max_cycles: Mapped[int] = mapped_column(Integer, default=40)
    budget_usd: Mapped[float] = mapped_column(Float, default=25.0)
    spent_usd: Mapped[float] = mapped_column(Float, default=0.0)
    new_documents: Mapped[bool] = mapped_column(Boolean, default=False)
    created_by: Mapped[str] = mapped_column(String(120), index=True)
    # How the creator held access when the goal was created: {"via": "member" | "director"}.
    run_as: Mapped[dict[str, Any]] = mapped_column(JSON, default=dict)
    lease_owner: Mapped[str] = mapped_column(String(80), default="")
    lease_until: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now, onupdate=now)


class GoalEvent(Base):
    """Append-only log of everything a goal did. The goal's history can be replayed from it."""

    __tablename__ = "goal_events"
    __table_args__ = (UniqueConstraint("goal_id", "seq"),)
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    goal_id: Mapped[str] = mapped_column(ForeignKey("goals.id", ondelete="CASCADE"), index=True)
    seq: Mapped[int] = mapped_column(Integer)
    ts: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now)
    type: Mapped[str] = mapped_column(String(40))
    actor: Mapped[str] = mapped_column(String(80), default="system")
    payload: Mapped[dict[str, Any]] = mapped_column(JSON, default=dict)


class Approval(Base):
    __tablename__ = "approvals"
    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=new_id)
    deal_id: Mapped[str] = mapped_column(ForeignKey("deals.id", ondelete="CASCADE"), index=True)
    goal_id: Mapped[str | None] = mapped_column(String(32), nullable=True, index=True)
    action: Mapped[str] = mapped_column(String(80))
    summary: Mapped[str] = mapped_column(Text)
    payload: Mapped[dict[str, Any]] = mapped_column(JSON, default=dict)
    state: Mapped[str] = mapped_column(String(12), default="pending", index=True)  # pending | approved | rejected
    requested_by: Mapped[str] = mapped_column(String(80))
    decided_by: Mapped[str | None] = mapped_column(String(120), nullable=True)
    decision_note: Mapped[str] = mapped_column(Text, default="")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now)
    decided_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)


class Notification(Base):
    __tablename__ = "notifications"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[str] = mapped_column(String(120), index=True)
    deal_id: Mapped[str | None] = mapped_column(String(32), nullable=True)
    goal_id: Mapped[str | None] = mapped_column(String(32), nullable=True)
    kind: Mapped[str] = mapped_column(String(40))
    title: Mapped[str] = mapped_column(String(300))
    body: Mapped[str] = mapped_column(Text, default="")
    read: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now)


class AuditEvent(Base):
    """Tamper-evident audit trail: each row carries the hash of the row before it."""

    __tablename__ = "audit_events"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    ts: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now)
    # The timestamp exactly as it was hashed (databases differ in how they round-trip datetimes).
    stamp: Mapped[str] = mapped_column(String(40), default="")
    actor: Mapped[str] = mapped_column(String(120))
    actor_type: Mapped[str] = mapped_column(String(12))  # user | agent | system
    action: Mapped[str] = mapped_column(String(80))
    deal_id: Mapped[str | None] = mapped_column(String(32), nullable=True, index=True)
    resource: Mapped[str] = mapped_column(String(200), default="")
    outcome: Mapped[str] = mapped_column(String(20), default="ok")
    detail: Mapped[dict[str, Any]] = mapped_column(JSON, default=dict)
    prev_hash: Mapped[str] = mapped_column(String(64), default="")
    hash: Mapped[str] = mapped_column(String(64), default="")


class Conversation(Base):
    __tablename__ = "conversations"
    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=new_id)
    user_id: Mapped[str] = mapped_column(String(120), index=True)
    deal_id: Mapped[str | None] = mapped_column(String(32), nullable=True, index=True)
    title: Mapped[str] = mapped_column(String(200), default="New conversation")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now, onupdate=now)


class Message(Base):
    __tablename__ = "messages"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    conversation_id: Mapped[str] = mapped_column(ForeignKey("conversations.id", ondelete="CASCADE"), index=True)
    role: Mapped[str] = mapped_column(String(12))
    content: Mapped[str] = mapped_column(Text)
    citations: Mapped[list[Any]] = mapped_column(JSON, default=list)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now)


class CentralisationAssessment(Base):
    """A person's answers to the three centralisation questions for one workstream on one deal."""

    __tablename__ = "centralisation_assessments"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    deal_id: Mapped[str] = mapped_column(ForeignKey("deals.id", ondelete="CASCADE"), index=True)
    workstream: Mapped[str] = mapped_column(String(80))
    answers: Mapped[list[Any]] = mapped_column(JSON, default=list)
    outcome: Mapped[str] = mapped_column(String(30))
    rationale: Mapped[str] = mapped_column(Text, default="")
    decided_by: Mapped[str] = mapped_column(String(120))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now)


Index("ix_goal_events_goal_seq", GoalEvent.goal_id, GoalEvent.seq)

_engine: AsyncEngine | None = None
_sessions: async_sessionmaker[AsyncSession] | None = None


def get_engine() -> AsyncEngine:
    global _engine, _sessions
    if _engine is None:
        url = get_settings().database_url
        if url.startswith("sqlite"):
            path = url.split("///", 1)[-1]
            if path and path != ":memory:":
                from pathlib import Path

                Path(path).parent.mkdir(parents=True, exist_ok=True)
        _engine = create_async_engine(url, pool_pre_ping=True)
        _sessions = async_sessionmaker(_engine, expire_on_commit=False)
    return _engine


def session_factory() -> async_sessionmaker[AsyncSession]:
    get_engine()
    assert _sessions is not None
    return _sessions


@asynccontextmanager
async def session_scope() -> AsyncIterator[AsyncSession]:
    async with session_factory()() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise


async def get_session() -> AsyncIterator[AsyncSession]:
    async with session_scope() as session:
        yield session


async def create_all() -> None:
    async with get_engine().begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def dispose() -> None:
    global _engine, _sessions
    if _engine is not None:
        await _engine.dispose()
    _engine = None
    _sessions = None
