"""The approved methodology: the retrieval corpus and the typed domain model built from the
Absa M&A Capability Hub. Both are read-only at runtime; they change only when the corpus is rebuilt."""

from __future__ import annotations

import json
from dataclasses import dataclass, field
from functools import lru_cache
from pathlib import Path
from typing import Any

from ..config import get_settings


@dataclass(frozen=True)
class Chunk:
    id: str
    area: str
    origin: str
    title: str
    breadcrumb: tuple[str, ...]
    text: str
    source: dict[str, str]
    site_routes: tuple[str, ...]
    tags: dict[str, str]
    status: str

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "area": self.area,
            "origin": self.origin,
            "title": self.title,
            "breadcrumb": list(self.breadcrumb),
            "text": self.text,
            "source": self.source,
            "site_routes": list(self.site_routes),
            "tags": self.tags,
            "status": self.status,
        }


# Functional workstream names as used by archetypes → the spoke id that holds their detail.
WORKSTREAM_SPOKE = {
    "Communications / Marketing": "comms",
    "Finance & Tax": "finance-tax",
    "Change Management": "change-management",
    "Compliance & Regulatory Approvals": "compliance",
    "Procurement": "procurement",
    "Operations & Servicing": "ops-servicing",
    "Product (Business)": "product",
    "Risk": "risk",
    "Data Migration": "data-migration",
    "Technology": "technology",
    "Independent Assurance / External Audit": "independent-assurance",
    "KYC / AML": "kyc-aml",
    "Human Capital": "hr",
    "E2E Testing": "e2e-testing",
    "Client Readiness": "ld1-readiness",
    "Legal & CorpDev": "legal",
    "CRES": "cres",
    "Internal Audit": "internal-audit",
}


@dataclass
class Ontology:
    raw: dict[str, Any]

    @property
    def archetypes(self) -> list[dict[str, Any]]:
        return self.raw["archetypes"]

    def archetype(self, archetype_id: str) -> dict[str, Any] | None:
        return next((a for a in self.archetypes if a["id"] == archetype_id), None)

    def lifecycle_variants(self, archetype_id: str) -> list[dict[str, Any]]:
        return [v for v in self.raw["lifecycles"] if v["archetypeId"] == archetype_id]

    def stages(self, archetype_id: str, variant: str | None = None) -> list[dict[str, Any]]:
        """Lifecycle stages for an archetype. Where an archetype has several delivery variants the
        first is used unless one is named."""
        variants = self.lifecycle_variants(archetype_id)
        if not variants:
            return []
        chosen = next((v for v in variants if v["variantLabel"] == variant), variants[0])
        return chosen["stages"]

    def stage(self, archetype_id: str, stage_id: str) -> dict[str, Any] | None:
        return next((s for s in self.stages(archetype_id) if s["id"] == stage_id), None)

    def workstream_requirements(self, archetype_id: str) -> list[dict[str, Any]]:
        archetype = self.archetype(archetype_id)
        if not archetype:
            return []
        return [{**w, "spoke": WORKSTREAM_SPOKE.get(w["workstream"])} for w in archetype["workstreams"]]

    @property
    def workstreams(self) -> list[str]:
        return self.raw["workstreams"]

    @property
    def forums(self) -> list[dict[str, Any]]:
        return self.raw["governance"]["forums"]

    @property
    def roles(self) -> list[dict[str, Any]]:
        return self.raw["governance"]["roles"]

    @property
    def centralisation_test(self) -> dict[str, Any]:
        return self.raw["centralisationTest"]

    def spoke(self, spoke_id: str) -> dict[str, Any] | None:
        return self.raw["functionalSpokes"].get(spoke_id)


@dataclass
class Corpus:
    chunks: list[Chunk]
    manifest: dict[str, Any]
    ontology: Ontology
    by_id: dict[str, Chunk] = field(default_factory=dict)

    def __post_init__(self) -> None:
        self.by_id = {c.id: c for c in self.chunks}

    @property
    def version(self) -> str:
        return self.manifest["corpusVersion"]


def load_corpus(directory: Path) -> Corpus:
    chunks: list[Chunk] = []
    with (directory / "chunks.jsonl").open(encoding="utf-8") as fh:
        for line in fh:
            if not line.strip():
                continue
            raw = json.loads(line)
            chunks.append(
                Chunk(
                    id=raw["id"],
                    area=raw["area"],
                    origin=raw["origin"],
                    title=raw["title"],
                    breadcrumb=tuple(raw["breadcrumb"]),
                    text=raw["text"],
                    source=raw["source"],
                    site_routes=tuple(raw["siteRoutes"]),
                    tags=raw["tags"],
                    status=raw["status"],
                )
            )
    manifest = json.loads((directory / "manifest.json").read_text(encoding="utf-8"))
    ontology = Ontology(json.loads((directory / "ontology.json").read_text(encoding="utf-8")))
    if manifest["chunkCount"] != len(chunks):
        raise RuntimeError(
            f"Corpus is inconsistent: manifest says {manifest['chunkCount']} chunks, found {len(chunks)}."
        )
    return Corpus(chunks=chunks, manifest=manifest, ontology=ontology)


@lru_cache
def get_corpus() -> Corpus:
    return load_corpus(get_settings().corpus_dir)
