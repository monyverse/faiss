"""Reference data: identity, methodology metadata, knowledge search, country packs, policy, audit."""

from __future__ import annotations

from collections import Counter
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .. import africa, audit, finance, policy
from ..agents.specialists import SPECIALISTS
from ..config import get_settings
from ..db import AuditEvent, get_session
from ..documents import EXPECTED_DOC_TYPES
from ..knowledge import WORKSTREAM_SPOKE, get_corpus
from ..retrieval import Filters, get_retriever
from ..security import DEV_DIRECTORY, Principal, get_principal, require_audit_reader

router = APIRouter(tags=["reference"])


@router.get("/me")
async def me(principal: Principal = Depends(get_principal)) -> dict[str, Any]:
    return principal.to_dict()


@router.get("/directory")
async def directory(principal: Principal = Depends(get_principal)) -> list[dict[str, Any]]:
    """People who can be added to a deal. In development this is the built-in directory; with
    OIDC the bank's directory is the source and this returns nothing."""
    if get_settings().auth_mode != "dev":
        return []
    return [p.to_dict() for p in DEV_DIRECTORY.values()]


@router.get("/meta")
async def meta(principal: Principal = Depends(get_principal)) -> dict[str, Any]:
    settings, corpus = get_settings(), get_corpus()
    ontology = corpus.ontology
    return {
        "platform": "FAISS",
        "env": settings.env,
        "auth_mode": settings.auth_mode,
        "reasoning": "gateway" if not settings.offline else "offline",
        "retriever": get_retriever().name,
        "scheduler": "temporal" if settings.temporal_address else "built-in",
        "corpus": {
            k: corpus.manifest[k]
            for k in ("corpusVersion", "chunkCount", "characters", "byOrigin", "byArea", "snapshotHash")
        },
        "archetypes": [
            {
                "id": a["id"],
                "name": a["name"],
                "side": a["side"],
                "description": a["description"],
                "perimeter": a["perimeter"],
                "variants": [v["variantLabel"] for v in ontology.lifecycle_variants(a["id"]) if v["variantLabel"]],
                "stages": [
                    {"id": s["id"], "index": s["index"], "title": s["title"], "purpose": s["purpose"]}
                    for s in ontology.stages(a["id"])
                ],
            }
            for a in ontology.archetypes
        ],
        "workstreams": [{"id": spoke, "name": name} for name, spoke in WORKSTREAM_SPOKE.items()],
        "forums": [
            {"id": f["id"], "name": f["name"], "kind": f["kind"], "chair": f["chair"], "cadence": f["cadence"]}
            for f in ontology.forums
        ],
        "centralisation_test": ontology.centralisation_test,
        "agents": [
            {"key": s.key, "name": s.name, "mandate": s.mandate, "tools": sorted(policy.BELTS.get(s.key, []))}
            for s in SPECIALISTS.values()
        ],
        "countries": [{"iso": p["iso"], "name": p["name"]} for p in africa.countries()],
        "financial_line_items": finance.LINE_ITEMS,
        "valuation_assumptions": finance.ASSUMPTIONS,
        "expected_documents": EXPECTED_DOC_TYPES,
    }


@router.get("/knowledge/search")
async def knowledge_search(
    q: str = Query(min_length=2, max_length=400),
    area: str | None = None,
    archetype: str | None = None,
    stage: str | None = None,
    workstream: str | None = None,
    include_history: bool = False,
    limit: int = Query(default=10, ge=1, le=30),
    principal: Principal = Depends(get_principal),
) -> dict[str, Any]:
    tags = {k: v for k, v in {"archetype": archetype, "stage": stage, "workstream": workstream}.items() if v}
    passages = await get_retriever().search(
        q, limit=limit, filters=Filters(area=area, tags=tags or None, include_history=include_history)
    )
    return {"query": q, "results": [p.to_dict() for p in passages]}


@router.get("/knowledge/chunks/{chunk_id}")
async def knowledge_chunk(chunk_id: str, principal: Principal = Depends(get_principal)) -> dict[str, Any]:
    chunk = get_corpus().by_id.get(chunk_id)
    if chunk is None:
        raise HTTPException(404, "Passage not found.")
    return chunk.to_dict()


@router.get("/knowledge/areas")
async def knowledge_areas(principal: Principal = Depends(get_principal)) -> list[dict[str, Any]]:
    counts = Counter(c.area for c in get_corpus().chunks)
    return [{"area": area, "chunks": n} for area, n in sorted(counts.items())]


@router.get("/africa/countries")
async def africa_countries(principal: Principal = Depends(get_principal)) -> dict[str, Any]:
    return {"caveat": africa.CAVEAT, "continental_notes": africa.CONTINENTAL_NOTES, "countries": africa.countries()}


@router.get("/africa/countries/{iso}")
async def africa_country(iso: str, principal: Principal = Depends(get_principal)) -> dict[str, Any]:
    pack = africa.country(iso)
    if pack is None:
        raise HTTPException(404, "No country pack for that country.")
    return pack


@router.get("/policy")
async def agent_policy(principal: Principal = Depends(get_principal)) -> dict[str, Any]:
    return policy.describe()


@router.get("/audit")
async def audit_trail(
    deal_id: str | None = None,
    limit: int = Query(default=100, ge=1, le=500),
    principal: Principal = Depends(require_audit_reader),
    session: AsyncSession = Depends(get_session),
) -> list[dict[str, Any]]:
    query = select(AuditEvent).order_by(AuditEvent.id.desc()).limit(limit)
    if deal_id:
        query = query.where(AuditEvent.deal_id == deal_id)
    rows = (await session.execute(query)).scalars().all()
    return [
        {
            "id": r.id,
            "ts": r.stamp,
            "actor": r.actor,
            "actor_type": r.actor_type,
            "action": r.action,
            "deal_id": r.deal_id,
            "resource": r.resource,
            "outcome": r.outcome,
            "detail": r.detail,
            "hash": r.hash[:16],
        }
        for r in rows
    ]


@router.get("/audit/verify")
async def audit_verify(
    principal: Principal = Depends(require_audit_reader), session: AsyncSession = Depends(get_session)
) -> dict[str, Any]:
    return await audit.verify_chain(session)
