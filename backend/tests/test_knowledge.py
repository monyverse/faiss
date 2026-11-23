"""The approved methodology must arrive intact and be findable."""

from __future__ import annotations

import hashlib

from faiss_platform.config import get_settings
from faiss_platform.knowledge import get_corpus
from faiss_platform.knowledge.ingest import bulk_lines, document, index_body, ingest
from faiss_platform.retrieval import (
    Filters,
    LocalRetriever,
    OpenSearchRetriever,
    lexical_query,
    reciprocal_rank_fusion,
    vector_query,
)


def test_corpus_matches_its_manifest():
    """Regression guard: a change anywhere in the platform must not alter the approved content."""
    corpus, directory = get_corpus(), get_settings().corpus_dir
    for name, expected in corpus.manifest["hashes"].items():
        assert hashlib.sha256((directory / name).read_bytes()).hexdigest() == expected, (
            f"{name} differs from the manifest"
        )
    assert corpus.manifest["chunkCount"] == len(corpus.chunks) == len(corpus.by_id)
    assert all(c.text.strip() and c.source.get("path") for c in corpus.chunks)
    assert {c.status for c in corpus.chunks} == {"approved", "design-history", "retired"}


def test_domain_model_carries_the_methodology():
    ontology = get_corpus().ontology
    assert len(ontology.archetypes) == 6 and {a["side"] for a in ontology.archetypes} == {"acquisition", "divestment"}
    for archetype in ontology.archetypes:
        stages = ontology.stages(archetype["id"])
        assert len(stages) >= 9 and stages[0]["id"] == "due-diligence", archetype["id"]
        assert len(ontology.workstream_requirements(archetype["id"])) == 19
    assert len(ontology.raw["functionalSpokes"]) == 18 and len(ontology.forums) == 6 and len(ontology.roles) == 8
    test = ontology.centralisation_test
    assert len(test["questions"]) == 3 and test["status"] == "retired-from-site"


async def test_retrieval_finds_the_right_part_of_the_methodology():
    retriever = LocalRetriever(get_corpus())
    top = await retriever.search("go/no-go decision steering committee evidence", limit=5)
    assert any(p.chunk.tags.get("stage") == "go-no-go" for p in top)
    scoped = await retriever.search("regulatory approvals", limit=5, filters=Filters(tags={"workstream": "compliance"}))
    assert scoped and all(p.chunk.tags["workstream"] == "compliance" for p in scoped)
    forums = await retriever.search("steering committee chair cadence", limit=3, filters=Filters(area="governance"))
    assert forums and all(p.chunk.area.startswith("governance") for p in forums)
    # Retired and design-history material never surfaces unless asked for.
    default = await retriever.search("workstream centralisation logic decision tree legally allowed", limit=10)
    assert all(p.chunk.status == "approved" for p in default)
    history = await retriever.search(
        "workstream centralisation logic decision tree legally allowed", limit=10, filters=Filters(include_history=True)
    )
    assert any(p.chunk.status == "retired" for p in history)
    citation = top[0].citation()
    assert citation["kind"] == "knowledge" and citation["source"]["path"].startswith("src/") and citation["quote"]


class FakeOpenSearch:
    def __init__(self):
        self.indexes: dict[str, dict] = {}
        self.docs: dict[str, dict[str, dict]] = {}
        self.searches: list[dict] = []
        outer = self

        class Indices:
            def exists(self, index):
                return index in outer.indexes

            def create(self, index, body):
                outer.indexes[index] = body
                outer.docs[index] = {}

            def refresh(self, index):
                pass

        self.indices = Indices()

    def count(self, index):
        return {"count": len(self.docs[index])}

    def bulk(self, body):
        import json

        lines = [json.loads(line) for line in body.strip().split("\n")]
        for action, doc in zip(lines[::2], lines[1::2], strict=True):
            self.docs[action["index"]["_index"]][action["index"]["_id"]] = doc
        return {"errors": False, "items": []}

    def search(self, index, body):
        self.searches.append(body)
        ids = list(self.docs[index])[:5] if "knn" not in body["query"] else list(self.docs[index])[3:8]
        return {"hits": {"hits": [{"_source": {"chunk_id": i}} for i in ids]}}


async def test_ingest_into_opensearch_is_complete_and_idempotent():
    corpus, fake = get_corpus(), FakeOpenSearch()

    async def embed(texts):
        return [[0.1, 0.2, 0.3] for _ in texts]

    first = await ingest(corpus, fake, "faiss-knowledge-test", embed, batch=200)
    assert first["indexed"] == len(corpus.chunks) and first["vectors"] is True
    stored = fake.docs["faiss-knowledge-test"]
    assert set(stored) == set(corpus.by_id)
    sample = next(iter(stored.values()))
    assert sample["corpus_version"] == corpus.version and len(sample["embedding"]) == 3 and sample["text"]
    mapping = fake.indexes["faiss-knowledge-test"]["mappings"]["properties"]
    assert mapping["embedding"]["dimension"] == 3 and mapping["status"]["type"] == "keyword"
    again = await ingest(corpus, fake, "faiss-knowledge-test", embed)
    assert again == {
        "index": "faiss-knowledge-test",
        "indexed": 0,
        "skipped": len(corpus.chunks),
        "status": "already-complete",
    }

    retriever = OpenSearchRetriever(fake, "faiss-knowledge-test", corpus, embed)
    results = await retriever.search(
        "due diligence", limit=4, filters=Filters(area="lifecycle", tags={"stage": "due-diligence"})
    )
    assert len(results) == 4 and len(fake.searches) == 2
    lexical, vector = fake.searches
    assert {"term": {"status": "approved"}} in lexical["query"]["bool"]["filter"]
    assert {"term": {"tags.stage": "due-diligence"}} in lexical["query"]["bool"]["filter"]
    assert vector["query"]["knn"]["embedding"]["vector"] == [0.1, 0.2, 0.3]


def test_query_builders_and_fusion():
    filters = Filters(area="governance", include_history=True)
    assert lexical_query("x", filters, 5)["query"]["bool"]["filter"] == [{"prefix": {"area": "governance"}}]
    assert vector_query([1.0], Filters(), 7)["query"]["knn"]["embedding"]["k"] == 7
    assert [d for d, _ in reciprocal_rank_fusion([["a", "b", "c"], ["b", "a", "d"]])][:2] in (["a", "b"], ["b", "a"])
    assert index_body(None)["mappings"]["properties"].get("embedding") is None
    chunk = get_corpus().chunks[0]
    lines = list(bulk_lines("idx", [document(chunk, "v1")]))
    assert len(lines) == 2 and chunk.id in lines[0]


async def test_ingest_on_opensearch_serverless_sends_no_ids_and_no_refresh():
    corpus, fake = get_corpus(), FakeOpenSearch()
    fake.indices.refresh = lambda index: (_ for _ in ()).throw(AssertionError("refresh is rejected on Serverless"))
    seen: list[dict] = []
    original = fake.bulk

    def bulk(body):
        import json

        actions = [json.loads(line) for line in body.strip().split("\n")][::2]
        seen.extend(actions)
        # the fake keys documents by id, so give it one the way the service would
        lines = body.strip().split("\n")
        rebuilt = []
        for n, (action, doc) in enumerate(zip(lines[::2], lines[1::2], strict=True)):
            rebuilt += [
                json.dumps(
                    {"index": {"_index": json.loads(action)["index"]["_index"], "_id": f"auto-{len(seen)}-{n}"}}
                ),
                doc,
            ]
        return original("\n".join(rebuilt) + "\n")

    fake.bulk = bulk
    result = await ingest(corpus, fake, "faiss-knowledge-aoss", None, batch=500, serverless=True)
    assert result["indexed"] == len(corpus.chunks) and result["vectors"] is False
    assert seen and all("_id" not in a["index"] for a in seen)
    assert {d["chunk_id"] for d in fake.docs["faiss-knowledge-aoss"].values()} == set(corpus.by_id)
