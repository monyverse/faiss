"""Deals: the Deal Twin, its members, documents, findings, financials and briefing."""

from __future__ import annotations

import copy
from typing import Any, Literal

from fastapi import APIRouter, BackgroundTasks, Depends, File, HTTPException, Query, Response, UploadFile
from pydantic import BaseModel, Field
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from .. import africa, audit, finance
from ..db import CentralisationAssessment, Deal, DealMember, Document, Finding, Goal, get_session
from ..documents import EXPECTED_DOC_TYPES, MAX_UPLOAD_BYTES, ingest_document, missing_document_types
from ..goals import engine, runner
from ..knowledge import WORKSTREAM_SPOKE, get_corpus
from ..security import Access, Principal, get_principal, resolve_access, visible_deal_ids

router = APIRouter(tags=["deals"])
ISO = Field(pattern=r"^[A-Za-z]{2}$")
SEVERITY_ORDER = {"critical": 0, "high": 1, "medium": 2, "low": 3, "info": 4}


class DealIn(BaseModel):
    code_name: str = Field(min_length=2, max_length=120)
    target_name: str = Field(default="", max_length=200)
    archetype_id: str
    stage_id: str = ""
    countries: list[str] = Field(default_factory=list, max_length=20)
    sector: str = Field(default="Banking", max_length=80)
    description: str = Field(default="", max_length=4000)


class DealPatch(BaseModel):
    code_name: str | None = Field(default=None, min_length=2, max_length=120)
    target_name: str | None = Field(default=None, max_length=200)
    stage_id: str | None = None
    countries: list[str] | None = None
    description: str | None = Field(default=None, max_length=4000)
    status: Literal["active", "on_hold", "closed"] | None = None


class MemberIn(BaseModel):
    user_id: str = Field(min_length=1, max_length=120)
    role: Literal["deal_lead", "member", "viewer"] = "member"
    workstreams: list[str] = Field(default_factory=lambda: ["*"])


class ReviewIn(BaseModel):
    decision: Literal["validated", "rejected"]
    note: str = Field(default="", max_length=2000)


class FinancialsIn(BaseModel):
    figures: dict[str, float | None] = Field(default_factory=dict)
    assumptions: dict[str, float | None] = Field(default_factory=dict)
    currency: str | None = Field(default=None, max_length=12)
    unit: str | None = Field(default=None, max_length=40)
    period: str | None = Field(default=None, max_length=40)


class CentralisationIn(BaseModel):
    workstream: str
    answers: list[Literal["yes", "no"]] = Field(min_length=3, max_length=3)
    rationale: str = Field(min_length=10, max_length=4000)


def _validate_shape(archetype_id: str, stage_id: str, countries: list[str]) -> list[str]:
    ontology = get_corpus().ontology
    if ontology.archetype(archetype_id) is None:
        raise HTTPException(422, "Unknown deal archetype.")
    if stage_id and ontology.stage(archetype_id, stage_id) is None:
        raise HTTPException(422, "That stage is not part of this archetype's lifecycle.")
    cleaned = []
    for c in countries:
        c = c.strip().upper()
        if len(c) != 2 or not c.isalpha():
            raise HTTPException(422, "Countries must be two-letter ISO codes.")
        if c not in cleaned:
            cleaned.append(c)
    return cleaned


def deal_out(deal: Deal, access: Access | None = None, counts: dict[str, Any] | None = None) -> dict[str, Any]:
    ontology = get_corpus().ontology
    archetype = ontology.archetype(deal.archetype_id) or {}
    stages = ontology.stages(deal.archetype_id)
    position = next((i for i, s in enumerate(stages) if s["id"] == deal.stage_id), None)
    out: dict[str, Any] = {
        "id": deal.id,
        "code_name": deal.code_name,
        "target_name": deal.target_name,
        "sector": deal.sector,
        "description": deal.description,
        "status": deal.status,
        "archetype_id": deal.archetype_id,
        "archetype_name": archetype.get("name", deal.archetype_id),
        "side": archetype.get("side", ""),
        "stage_id": deal.stage_id,
        "stage_title": stages[position]["title"] if position is not None else "",
        "stage_position": position,
        "stage_count": len(stages),
        "stages": [{"id": s["id"], "index": s["index"], "title": s["title"]} for s in stages],
        "countries": [
            {"iso": c, "name": (africa.country(c) or {}).get("name", c), "has_pack": africa.country(c) is not None}
            for c in deal.countries or []
        ],
        "created_by": deal.created_by,
        "created_at": deal.created_at.isoformat(),
        "updated_at": deal.updated_at.isoformat(),
        "counts": counts or {},
    }
    if access is not None:
        out["access"] = {
            "can_write": access.can_write,
            "can_manage": access.can_manage,
            "workstreams": list(access.workstreams),
        }
    return out


async def _counts(session: AsyncSession, deal_ids: list[str]) -> dict[str, dict[str, Any]]:
    out: dict[str, dict[str, Any]] = {
        d: {
            "documents": 0,
            "findings": 0,
            "risks": 0,
            "gaps": 0,
            "open_goals": 0,
            "waiting_goals": 0,
            "top_severity": None,
        }
        for d in deal_ids
    }
    if not deal_ids:
        return out
    for deal_id, n in await session.execute(
        select(Document.deal_id, func.count()).where(Document.deal_id.in_(deal_ids)).group_by(Document.deal_id)
    ):
        out[deal_id]["documents"] = n
    for deal_id, kind, severity, n in await session.execute(
        select(Finding.deal_id, Finding.kind, Finding.severity, func.count())
        .where(Finding.deal_id.in_(deal_ids), Finding.status != "rejected")
        .group_by(Finding.deal_id, Finding.kind, Finding.severity)
    ):
        entry = out[deal_id]
        entry["findings"] += n
        if kind == "risk":
            entry["risks"] += n
            if entry["top_severity"] is None or SEVERITY_ORDER[severity] < SEVERITY_ORDER[entry["top_severity"]]:
                entry["top_severity"] = severity
        if kind == "gap":
            entry["gaps"] += n
    for deal_id, state, n in await session.execute(
        select(Goal.deal_id, Goal.state, func.count())
        .where(Goal.deal_id.in_(deal_ids))
        .group_by(Goal.deal_id, Goal.state)
    ):
        if state in {"planning", "running"}:
            out[deal_id]["open_goals"] += n
        if state in {"awaiting_input", "awaiting_approval"}:
            out[deal_id]["waiting_goals"] += n
    return out


@router.get("/deals")
async def list_deals(
    principal: Principal = Depends(get_principal), session: AsyncSession = Depends(get_session)
) -> list[dict[str, Any]]:
    visible = await visible_deal_ids(session, principal)
    query = select(Deal).order_by(Deal.updated_at.desc())
    if visible is not None:
        if not visible:
            return []
        query = query.where(Deal.id.in_(visible))
    deals = (await session.execute(query)).scalars().all()
    counts = await _counts(session, [d.id for d in deals])
    return [deal_out(d, counts=counts[d.id]) for d in deals]


@router.post("/deals", status_code=201)
async def create_deal(
    body: DealIn, principal: Principal = Depends(get_principal), session: AsyncSession = Depends(get_session)
) -> dict[str, Any]:
    if principal.is_audit and not principal.is_director:
        raise HTTPException(403, "Internal Audit has assurance access only and cannot create deals.")
    countries = _validate_shape(body.archetype_id, body.stage_id, body.countries)
    stages = get_corpus().ontology.stages(body.archetype_id)
    deal = Deal(
        code_name=body.code_name.strip(),
        target_name=body.target_name.strip(),
        archetype_id=body.archetype_id,
        stage_id=body.stage_id or (stages[0]["id"] if stages else ""),
        countries=countries,
        sector=body.sector,
        description=body.description,
        created_by=principal.sub,
    )
    session.add(deal)
    await session.flush()
    session.add(DealMember(deal_id=deal.id, user_id=principal.sub, role="deal_lead"))
    await audit.record(
        session,
        actor=principal.sub,
        actor_type="user",
        action="deal.create",
        deal_id=deal.id,
        detail={"archetype": deal.archetype_id},
    )
    await session.flush()
    access = await resolve_access(session, principal, deal.id)
    return deal_out(deal, access, (await _counts(session, [deal.id]))[deal.id])


@router.get("/deals/{deal_id}")
async def get_deal(
    deal_id: str, principal: Principal = Depends(get_principal), session: AsyncSession = Depends(get_session)
) -> dict[str, Any]:
    access = await resolve_access(session, principal, deal_id)
    out = deal_out(access.deal, access, (await _counts(session, [deal_id]))[deal_id])
    ontology = get_corpus().ontology
    stage = ontology.stage(access.deal.archetype_id, access.deal.stage_id)
    if stage:
        items = lambda key: [{"text": i["text"], "subs": i.get("subs", [])} for i in stage.get(key, [])]  # noqa: E731
        out["stage"] = {
            "id": stage["id"],
            "title": stage["title"],
            "purpose": stage["purpose"],
            "timeline": stage.get("timeline", ""),
            "necessary": items("necessary"),
            "conditional": items("conditional"),
            "artefacts": items("artefacts"),
        }
    out["workstream_requirements"] = ontology.workstream_requirements(access.deal.archetype_id)
    out["missing_documents"] = [{"type": k, "label": v} for k, v in await missing_document_types(session, deal_id)]
    return out


@router.patch("/deals/{deal_id}")
async def update_deal(
    deal_id: str,
    body: DealPatch,
    principal: Principal = Depends(get_principal),
    session: AsyncSession = Depends(get_session),
) -> dict[str, Any]:
    changes = body.model_dump(exclude_unset=True)
    governed = {"stage_id", "status"} & set(changes)
    access = await resolve_access(session, principal, deal_id, write=True, manage=bool(governed))
    deal = access.deal
    if "countries" in changes or "stage_id" in changes:
        countries = _validate_shape(
            deal.archetype_id,
            changes.get("stage_id", deal.stage_id) or "",
            changes.get("countries", deal.countries) or [],
        )
        if "countries" in changes:
            changes["countries"] = countries
    before = {k: getattr(deal, k) for k in changes}
    for key, value in changes.items():
        setattr(deal, key, value)
    await audit.record(
        session,
        actor=principal.sub,
        actor_type="user",
        action="deal.update",
        deal_id=deal.id,
        detail={"changed": {k: [before[k], v] for k, v in changes.items() if k in governed}, "fields": sorted(changes)},
    )
    await session.flush()
    return deal_out(deal, access, (await _counts(session, [deal_id]))[deal_id])


@router.get("/deals/{deal_id}/members")
async def list_members(
    deal_id: str, principal: Principal = Depends(get_principal), session: AsyncSession = Depends(get_session)
) -> list[dict[str, Any]]:
    await resolve_access(session, principal, deal_id)
    rows = (
        (await session.execute(select(DealMember).where(DealMember.deal_id == deal_id).order_by(DealMember.id)))
        .scalars()
        .all()
    )
    return [{"user_id": m.user_id, "role": m.role, "workstreams": m.workstreams} for m in rows]


@router.put("/deals/{deal_id}/members")
async def set_member(
    deal_id: str,
    body: MemberIn,
    principal: Principal = Depends(get_principal),
    session: AsyncSession = Depends(get_session),
) -> list[dict[str, Any]]:
    await resolve_access(session, principal, deal_id, manage=True)
    valid = set(WORKSTREAM_SPOKE.values()) | {"*", "general"}
    if not body.workstreams or not set(body.workstreams) <= valid:
        raise HTTPException(422, "Unknown workstream.")
    member = (
        await session.execute(
            select(DealMember).where(DealMember.deal_id == deal_id, DealMember.user_id == body.user_id)
        )
    ).scalar_one_or_none()
    if member is None:
        session.add(DealMember(deal_id=deal_id, user_id=body.user_id, role=body.role, workstreams=body.workstreams))
    else:
        member.role, member.workstreams = body.role, body.workstreams
    await audit.record(
        session,
        actor=principal.sub,
        actor_type="user",
        action="deal.member.set",
        deal_id=deal_id,
        resource=f"user:{body.user_id}",
        detail={"role": body.role, "workstreams": body.workstreams},
    )
    await session.flush()
    return await list_members(deal_id, principal, session)


@router.delete("/deals/{deal_id}/members/{user_id}")
async def remove_member(
    deal_id: str,
    user_id: str,
    principal: Principal = Depends(get_principal),
    session: AsyncSession = Depends(get_session),
) -> list[dict[str, Any]]:
    await resolve_access(session, principal, deal_id, manage=True)
    members = (await session.execute(select(DealMember).where(DealMember.deal_id == deal_id))).scalars().all()
    target = next((m for m in members if m.user_id == user_id), None)
    if target is None:
        raise HTTPException(404, "That person is not on the deal.")
    if target.role == "deal_lead" and sum(1 for m in members if m.role == "deal_lead") == 1:
        raise HTTPException(409, "A deal needs at least one deal lead.")
    await session.delete(target)
    await audit.record(
        session,
        actor=principal.sub,
        actor_type="user",
        action="deal.member.remove",
        deal_id=deal_id,
        resource=f"user:{user_id}",
    )
    await session.flush()
    return await list_members(deal_id, principal, session)


# ------------------------------------------------------------------ documents


def document_out(d: Document) -> dict[str, Any]:
    return {
        "id": d.id,
        "filename": d.filename,
        "content_type": d.content_type,
        "size": d.size,
        "sha256": d.sha256,
        "doc_type": d.doc_type,
        "doc_type_label": EXPECTED_DOC_TYPES.get(d.doc_type, "Other"),
        "workstream": d.workstream,
        "status": d.status,
        "note": (d.extracted or {}).get("note", ""),
        "facts_found": (d.extracted or {}).get("facts", []),
        "uploaded_by": d.uploaded_by,
        "created_at": d.created_at.isoformat(),
    }


@router.get("/deals/{deal_id}/documents")
async def list_documents(
    deal_id: str, principal: Principal = Depends(get_principal), session: AsyncSession = Depends(get_session)
) -> list[dict[str, Any]]:
    access = await resolve_access(session, principal, deal_id)
    rows = (
        (
            await session.execute(
                select(Document).where(Document.deal_id == deal_id).order_by(Document.created_at.desc())
            )
        )
        .scalars()
        .all()
    )
    return [document_out(d) for d in rows if access.sees(d.workstream)]


@router.post("/deals/{deal_id}/documents", status_code=201)
async def upload_document(
    deal_id: str,
    background: BackgroundTasks,
    file: UploadFile = File(...),
    principal: Principal = Depends(get_principal),
    session: AsyncSession = Depends(get_session),
) -> dict[str, Any]:
    access = await resolve_access(session, principal, deal_id, write=True)
    data = await file.read(MAX_UPLOAD_BYTES + 1)
    if len(data) > MAX_UPLOAD_BYTES:
        raise HTTPException(413, f"Files are limited to {MAX_UPLOAD_BYTES // (1024 * 1024)} MB.")
    if not data:
        raise HTTPException(422, "The file is empty.")
    document, facts = await ingest_document(
        session,
        access.deal,
        filename=file.filename or "document",
        content_type=file.content_type or "",
        data=data,
        uploaded_by=principal.sub,
    )
    await audit.record(
        session,
        actor=principal.sub,
        actor_type="user",
        action="document.upload",
        deal_id=deal_id,
        resource=f"document:{document.id}",
        detail={"sha256": document.sha256, "doc_type": document.doc_type, "size": document.size},
    )
    woken = await engine.on_documents_added(session, deal_id, principal.sub, [document.filename])
    for goal_id in woken:
        background.add_task(runner.wake, goal_id)
    return {**document_out(document), "facts_extracted": sorted(facts), "goals_resumed": len(woken)}


# ------------------------------------------------------------------ findings


def finding_out(f: Finding) -> dict[str, Any]:
    return {
        "id": f.id,
        "goal_id": f.goal_id,
        "task_id": f.task_id,
        "kind": f.kind,
        "workstream": f.workstream,
        "title": f.title,
        "detail": f.detail,
        "severity": f.severity,
        "status": f.status,
        "evidence": f.evidence,
        "produced_by": f.produced_by,
        "reviewed_by": f.reviewed_by,
        "review_note": f.review_note,
        "created_at": f.created_at.isoformat(),
    }


@router.get("/deals/{deal_id}/findings")
async def list_findings(
    deal_id: str,
    kind: str | None = None,
    goal_id: str | None = None,
    principal: Principal = Depends(get_principal),
    session: AsyncSession = Depends(get_session),
) -> dict[str, Any]:
    access = await resolve_access(session, principal, deal_id)
    query = select(Finding).where(Finding.deal_id == deal_id)
    if kind:
        query = query.where(Finding.kind == kind)
    if goal_id:
        query = query.where(Finding.goal_id == goal_id)
    rows = [f for f in (await session.execute(query)).scalars().all() if access.sees(f.workstream)]
    rows.sort(key=lambda f: (SEVERITY_ORDER.get(f.severity, 9), f.created_at))
    material = [f for f in rows if f.kind in {"finding", "risk"} and f.status != "rejected"]
    with_evidence = sum(1 for f in material if f.evidence)
    return {
        "items": [finding_out(f) for f in rows],
        "summary": {
            "total": len(rows),
            "by_kind": {k: sum(1 for f in rows if f.kind == k) for k in ("finding", "risk", "gap", "request")},
            "awaiting_review": sum(
                1
                for f in rows
                if f.status == "draft" and f.kind in {"finding", "risk"} and SEVERITY_ORDER.get(f.severity, 9) <= 2
            ),
            # KPI from the platform plan: share of material items linked to evidence.
            "evidence_traceability_pct": round(100 * with_evidence / len(material), 1) if material else None,
        },
    }


@router.post("/findings/{finding_id}/review")
async def review_finding(
    finding_id: str,
    body: ReviewIn,
    principal: Principal = Depends(get_principal),
    session: AsyncSession = Depends(get_session),
) -> dict[str, Any]:
    finding = await session.get(Finding, finding_id)
    if finding is None:
        raise HTTPException(404, "Finding not found.")
    access = await resolve_access(session, principal, finding.deal_id, write=True)
    if not access.sees(finding.workstream):
        raise HTTPException(404, "Finding not found.")
    finding.status, finding.reviewed_by, finding.review_note = body.decision, principal.sub, body.note
    await audit.record(
        session,
        actor=principal.sub,
        actor_type="user",
        action="finding.review",
        deal_id=finding.deal_id,
        resource=f"finding:{finding.id}",
        outcome=body.decision,
    )
    return finding_out(finding)


# ------------------------------------------------------------------ financials


def _require_finance(access: Access) -> None:
    if not access.sees("finance-tax"):
        raise HTTPException(403, "Financial data on this deal is limited to the Finance & Tax workstream.")


@router.get("/deals/{deal_id}/financials")
async def get_financials(
    deal_id: str, principal: Principal = Depends(get_principal), session: AsyncSession = Depends(get_session)
) -> dict[str, Any]:
    access = await resolve_access(session, principal, deal_id)
    _require_finance(access)
    return finance.analyse(access.deal.twin or {})


@router.put("/deals/{deal_id}/financials")
async def set_financials(
    deal_id: str,
    body: FinancialsIn,
    principal: Principal = Depends(get_principal),
    session: AsyncSession = Depends(get_session),
) -> dict[str, Any]:
    access = await resolve_access(session, principal, deal_id, write=True)
    _require_finance(access)
    unknown = (set(body.figures) - set(finance.LINE_ITEMS)) | (set(body.assumptions) - set(finance.ASSUMPTIONS))
    if unknown:
        raise HTTPException(422, f"Unknown field(s): {', '.join(sorted(unknown))}.")
    twin = copy.deepcopy(access.deal.twin or {})
    financials, assumptions = dict(twin.get("financials") or {}), dict(twin.get("assumptions") or {})
    for key, value in body.figures.items():
        if value is None:
            financials.pop(key, None)
        else:
            # A figure a person enters or confirms is verified; its document source, if any, is kept.
            previous = financials.get(key) if isinstance(financials.get(key), dict) else {}
            source = previous.get("source") if previous.get("value") == value else None
            financials[key] = {
                "value": value,
                "status": "verified",
                "source": {**(source or {}), "confirmed_by": principal.sub},
            }
    for key, value in body.assumptions.items():
        if value is None:
            assumptions.pop(key, None)
        else:
            assumptions[key] = {"value": value, "set_by": principal.sub}
    twin["financials"], twin["assumptions"] = financials, assumptions
    for key in ("currency", "unit", "period"):
        if getattr(body, key) is not None:
            twin[key] = getattr(body, key)
    access.deal.twin = twin
    await audit.record(
        session,
        actor=principal.sub,
        actor_type="user",
        action="financials.update",
        deal_id=deal_id,
        detail={"figures": sorted(body.figures), "assumptions": sorted(body.assumptions)},
    )
    return finance.analyse(twin)


@router.get("/deals/{deal_id}/valuation.xlsx")
async def valuation_workbook(
    deal_id: str, principal: Principal = Depends(get_principal), session: AsyncSession = Depends(get_session)
) -> Response:
    access = await resolve_access(session, principal, deal_id)
    _require_finance(access)
    data = finance.workbook(access.deal.code_name, access.deal.twin or {})
    await audit.record(session, actor=principal.sub, actor_type="user", action="valuation.export", deal_id=deal_id)
    return Response(
        data,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={
            "Content-Disposition": f'attachment; filename="valuation-{deal_id[:8]}.xlsx"',
            "Cache-Control": "no-store",
        },
    )


@router.get("/deals/{deal_id}/briefing")
async def get_briefing(
    deal_id: str, principal: Principal = Depends(get_principal), session: AsyncSession = Depends(get_session)
) -> dict[str, Any]:
    access = await resolve_access(session, principal, deal_id)
    if "*" not in access.workstreams:
        raise HTTPException(
            403, "The committee briefing spans every workstream and is limited to people with full access to the deal."
        )
    return (access.deal.twin or {}).get("briefing") or {"status": "none"}


# ------------------------------------------------------------------ centralisation


@router.get("/deals/{deal_id}/centralisation")
async def list_centralisation(
    deal_id: str, principal: Principal = Depends(get_principal), session: AsyncSession = Depends(get_session)
) -> dict[str, Any]:
    await resolve_access(session, principal, deal_id)
    rows = (
        (
            await session.execute(
                select(CentralisationAssessment)
                .where(CentralisationAssessment.deal_id == deal_id)
                .order_by(CentralisationAssessment.id.desc())
            )
        )
        .scalars()
        .all()
    )
    return {
        "test": get_corpus().ontology.centralisation_test,
        "assessments": [
            {
                "id": r.id,
                "workstream": r.workstream,
                "answers": r.answers,
                "outcome": r.outcome,
                "rationale": r.rationale,
                "decided_by": r.decided_by,
                "created_at": r.created_at.isoformat(),
            }
            for r in rows
        ],
    }


@router.post("/deals/{deal_id}/centralisation", status_code=201)
async def record_centralisation(
    deal_id: str,
    body: CentralisationIn,
    principal: Principal = Depends(get_principal),
    session: AsyncSession = Depends(get_session),
) -> dict[str, Any]:
    """A person records their answers to the three questions. The outcome follows from the answers;
    no agent can call this."""
    await resolve_access(session, principal, deal_id, manage=True)
    if body.workstream not in WORKSTREAM_SPOKE.values():
        raise HTTPException(422, "Unknown workstream.")
    test = get_corpus().ontology.centralisation_test
    outcome = test["outcomeIfAllYes"] if all(a == "yes" for a in body.answers) else test["outcomeIfAnyNo"]
    row = CentralisationAssessment(
        deal_id=deal_id,
        workstream=body.workstream,
        answers=body.answers,
        outcome=outcome,
        rationale=body.rationale,
        decided_by=principal.sub,
    )
    session.add(row)
    await audit.record(
        session,
        actor=principal.sub,
        actor_type="user",
        action="centralisation.decide",
        deal_id=deal_id,
        resource=f"workstream:{body.workstream}",
        outcome=outcome,
        detail={"answers": body.answers},
    )
    await session.flush()
    return {
        "id": row.id,
        "workstream": row.workstream,
        "answers": row.answers,
        "outcome": outcome,
        "rationale": row.rationale,
        "decided_by": row.decided_by,
    }


@router.get("/deals/{deal_id}/audit")
async def deal_audit(
    deal_id: str,
    limit: int = Query(default=50, ge=1, le=200),
    principal: Principal = Depends(get_principal),
    session: AsyncSession = Depends(get_session),
) -> list[dict[str, Any]]:
    """The deal's own trail, for the people who run it."""
    from ..db import AuditEvent

    await resolve_access(session, principal, deal_id, manage=not principal.is_audit)
    rows = (
        (
            await session.execute(
                select(AuditEvent).where(AuditEvent.deal_id == deal_id).order_by(AuditEvent.id.desc()).limit(limit)
            )
        )
        .scalars()
        .all()
    )
    return [
        {
            "id": r.id,
            "ts": r.stamp,
            "actor": r.actor,
            "actor_type": r.actor_type,
            "action": r.action,
            "resource": r.resource,
            "outcome": r.outcome,
        }
        for r in rows
    ]
