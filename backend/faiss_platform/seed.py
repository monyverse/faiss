"""Loads a synthetic demonstration deal: `python -m faiss_platform.seed`.

Everything it creates is fictional (Savanna Commercial Bank does not exist). It refuses to
run outside a development environment.
"""

from __future__ import annotations

import asyncio
from pathlib import Path

from sqlalchemy import select

from . import db
from .config import get_settings
from .db import Deal, DealMember, session_scope
from .documents import ingest_document
from .security import DEV_DIRECTORY

SAMPLES = Path(__file__).resolve().parents[1] / "sample_data"
DEALS = [
    (
        "Project Baobab",
        "Savanna Commercial Bank",
        "full-business-acquisition",
        "due-diligence",
        ["KE"],
        "Acquisition of 100% of a mid-sized Kenyan commercial bank. Synthetic demonstration data.",
        True,
    ),
    (
        "Project Marula",
        "Retail loan book",
        "balance-sheet-acquisition",
        "mobilisation-planning",
        ["ZM", "BW"],
        "Acquisition of a retail loan portfolio across two markets. Synthetic demonstration data.",
        False,
    ),
    (
        "Project Acacia",
        "Custody business",
        "partial-business-divestment",
        "legal-drafting-signature",
        ["GH"],
        "Sale of a custody business line. Synthetic demonstration data.",
        False,
    ),
]


async def seed() -> None:
    settings = get_settings()
    if settings.is_production or settings.auth_mode != "dev":
        raise SystemExit("The demonstration seed only runs in a development environment.")
    await db.create_all()
    director = DEV_DIRECTORY["naledi.director"]
    async with session_scope() as session:
        existing = {row[0] for row in await session.execute(select(Deal.code_name))}
        for code_name, target, archetype, stage, countries, description, with_documents in DEALS:
            if code_name in existing:
                continue
            deal = Deal(
                code_name=code_name,
                target_name=target,
                archetype_id=archetype,
                stage_id=stage,
                countries=countries,
                description=description,
                created_by=director.sub,
            )
            session.add(deal)
            await session.flush()
            session.add(DealMember(deal_id=deal.id, user_id=director.sub, role="deal_lead"))
            if code_name == "Project Baobab":
                session.add(DealMember(deal_id=deal.id, user_id="wanjiru.kenya", role="member"))
                session.add(
                    DealMember(deal_id=deal.id, user_id="thabo.tech", role="member", workstreams=["technology"])
                )
                session.add(DealMember(deal_id=deal.id, user_id="amara.legal", role="member", workstreams=["legal"]))
            if with_documents:
                for path in sorted(SAMPLES.iterdir()):
                    await ingest_document(
                        session,
                        deal,
                        filename=path.name,
                        content_type="text/plain",
                        data=path.read_bytes(),
                        uploaded_by=director.sub,
                    )
            print(f"Created {code_name}")
    await db.dispose()


if __name__ == "__main__":
    asyncio.run(seed())
