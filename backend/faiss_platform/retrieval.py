"""Retrieval over the approved methodology.

The platform talks to retrieval through one small interface (`Retriever`). Two implementations:
  - LocalRetriever: BM25 over the corpus shipped with the image. Used in dev, tests and as a
    safe fallback; needs no network.
  - OpenSearchRetriever: the bank's OpenSearch-based RAG engine. Lexical and vector results are
    fused client-side (reciprocal rank fusion), so no search pipeline has to exist on the cluster.
"""

from __future__ import annotations

import asyncio
import math
import re
from collections import Counter, defaultdict
from dataclasses import dataclass
from typing import Any, Protocol

from .config import Settings, get_settings
from .knowledge import Chunk, Corpus, get_corpus

STOPWORDS = frozenset(
    "a an and are as at be by for from has have how i in is it its of on or that the this to was what when where "
    "which who will with do does should can could would we our you your me my about into than then there their".split()
)
_TOKEN = re.compile(r"[a-z0-9]+")


def tokenize(text: str) -> list[str]:
    out = []
    for tok in _TOKEN.findall(text.lower()):
        if tok in STOPWORDS or len(tok) < 2:
            continue
        # light stemming: plurals and common suffixes, enough to match "approvals" with "approval"
        if len(tok) > 4 and tok.endswith("ies"):
            tok = tok[:-3] + "y"
        elif len(tok) > 3 and tok.endswith("s") and not tok.endswith("ss"):
            tok = tok[:-1]
        out.append(tok)
    return out


# The hub writes in its own shorthand; people ask in plain words. Each side is expanded to the other.
QUERY_EXPANSIONS: list[tuple[str, str]] = [
    (r"\bsteering committees?\b", "steerco"),
    (r"\bsteerco\b", "steering committee"),
    (r"\bld1\b", "legal day 1"),
    (r"\blegal day (1|one)\b", "ld1"),
    (r"\bdd\b", "due diligence"),
    (r"\btsa\b", "transitional service agreement"),
    (r"\bspa\b", "sale and purchase agreement"),
    (r"\b(sale|share) (and )?purchase agreement\b", "spa"),
    (r"\baccountable exec(utive)?s?\b", "ae executive sponsor"),
    (r"\bexecutive sponsors?\b", "accountable executive ae"),
    (r"\bpmo\b", "programme management office"),
    (r"\bic\b|\binvestment committee\b", "steerco steering committee"),
    (r"\bhub\b", "central hub inorganic change team"),
    (r"\bkyc\b|\baml\b", "kyc aml financial crime"),
]


def expand_query(query: str) -> str:
    extra = [addition for pattern, addition in QUERY_EXPANSIONS if re.search(pattern, query, re.I)]
    return f"{query} {' '.join(extra)}" if extra else query


@dataclass
class Passage:
    chunk: Chunk
    score: float

    def to_dict(self) -> dict[str, Any]:
        return {**self.chunk.to_dict(), "score": round(self.score, 4)}

    def citation(self, quote_chars: int = 320) -> dict[str, Any]:
        text = self.chunk.text
        return {
            "kind": "knowledge",
            "id": self.chunk.id,
            "title": " › ".join(self.chunk.breadcrumb) or self.chunk.title,
            "quote": text if len(text) <= quote_chars else text[:quote_chars].rsplit(" ", 1)[0] + " …",
            "source": self.chunk.source,
            "site_routes": list(self.chunk.site_routes),
            "status": self.chunk.status,
        }


@dataclass
class Filters:
    area: str | None = None  # prefix match, e.g. "operating-model"
    tags: dict[str, str] | None = None
    include_history: bool = False  # design-history / retired material is excluded unless asked for

    def accepts(self, chunk: Chunk) -> bool:
        if not self.include_history and chunk.status != "approved":
            return False
        if self.area and not chunk.area.startswith(self.area):
            return False
        if self.tags:
            return all(chunk.tags.get(k) == v for k, v in self.tags.items())
        return True


class Retriever(Protocol):
    name: str

    async def search(self, query: str, *, limit: int = 8, filters: Filters | None = None) -> list[Passage]: ...


class LocalRetriever:
    name = "local-bm25"

    def __init__(self, corpus: Corpus, k1: float = 1.4, b: float = 0.7) -> None:
        self.corpus = corpus
        self.k1, self.b = k1, b
        self.postings: dict[str, list[tuple[int, int]]] = defaultdict(list)
        self.lengths: list[int] = []
        for i, chunk in enumerate(corpus.chunks):
            # The breadcrumb says what a passage is about; counting it twice lets a query for a
            # named stage or workstream find the right passage even when the body never repeats the name.
            heading = " ".join(chunk.breadcrumb)
            counts = Counter(tokenize(f"{heading} {heading} {chunk.text}"))
            self.lengths.append(sum(counts.values()))
            for term, tf in counts.items():
                self.postings[term].append((i, tf))
        self.avg_len = sum(self.lengths) / max(1, len(self.lengths))
        n = len(corpus.chunks)
        self.idf = {t: math.log(1 + (n - len(p) + 0.5) / (len(p) + 0.5)) for t, p in self.postings.items()}

    async def search(self, query: str, *, limit: int = 8, filters: Filters | None = None) -> list[Passage]:
        filters = filters or Filters()
        scores: dict[int, float] = defaultdict(float)
        for term in set(tokenize(expand_query(query))):
            idf = self.idf.get(term)
            if idf is None:
                continue
            for i, tf in self.postings[term]:
                norm = tf + self.k1 * (1 - self.b + self.b * self.lengths[i] / self.avg_len)
                scores[i] += idf * tf * (self.k1 + 1) / norm
        ranked = sorted(scores.items(), key=lambda kv: kv[1], reverse=True)
        out: list[Passage] = []
        for i, score in ranked:
            chunk = self.corpus.chunks[i]
            if filters.accepts(chunk):
                out.append(Passage(chunk, score))
                if len(out) >= limit:
                    break
        return out


def opensearch_filter_clauses(filters: Filters) -> list[dict[str, Any]]:
    clauses: list[dict[str, Any]] = []
    if not filters.include_history:
        clauses.append({"term": {"status": "approved"}})
    if filters.area:
        clauses.append({"prefix": {"area": filters.area}})
    for key, value in (filters.tags or {}).items():
        clauses.append({"term": {f"tags.{key}": value}})
    return clauses


def lexical_query(query: str, filters: Filters, size: int) -> dict[str, Any]:
    return {
        "size": size,
        "_source": ["chunk_id"],
        "query": {
            "bool": {
                "must": [
                    {
                        "multi_match": {
                            "query": expand_query(query),
                            "fields": ["breadcrumb_text^2", "title^2", "text"],
                            "type": "best_fields",
                        }
                    }
                ],
                "filter": opensearch_filter_clauses(filters),
            }
        },
    }


def vector_query(vector: list[float], filters: Filters, size: int) -> dict[str, Any]:
    return {
        "size": size,
        "_source": ["chunk_id"],
        "query": {
            "knn": {
                "embedding": {
                    "vector": vector,
                    "k": size,
                    "filter": {"bool": {"filter": opensearch_filter_clauses(filters)}},
                }
            }
        },
    }


def reciprocal_rank_fusion(rankings: list[list[str]], k: int = 60) -> list[tuple[str, float]]:
    scores: dict[str, float] = defaultdict(float)
    for ranking in rankings:
        for rank, doc_id in enumerate(ranking):
            scores[doc_id] += 1.0 / (k + rank + 1)
    return sorted(scores.items(), key=lambda kv: kv[1], reverse=True)


class OpenSearchRetriever:
    """Queries the corpus index on the bank's OpenSearch RAG engine.

    `client` needs a `search(index=..., body=...)` method (opensearch-py). `embed` turns a query
    into a vector through the LiteLLM gateway; when it is None only lexical search runs.
    """

    name = "opensearch-hybrid"

    def __init__(self, client: Any, index: str, corpus: Corpus, embed: Any | None = None) -> None:
        self.client, self.index, self.corpus, self.embed = client, index, corpus, embed

    async def search(self, query: str, *, limit: int = 8, filters: Filters | None = None) -> list[Passage]:
        filters = filters or Filters()
        size = max(limit * 3, 20)

        def run(body: dict[str, Any]) -> list[str]:
            hits = self.client.search(index=self.index, body=body)["hits"]["hits"]
            return [h["_source"]["chunk_id"] for h in hits]

        rankings = [await asyncio.to_thread(run, lexical_query(query, filters, size))]
        if self.embed is not None:
            vector = (await self.embed([query]))[0]
            rankings.append(await asyncio.to_thread(run, vector_query(vector, filters, size)))
        out: list[Passage] = []
        for chunk_id, score in reciprocal_rank_fusion(rankings):
            chunk = self.corpus.by_id.get(chunk_id)
            if chunk is not None:  # ids from an older index version are ignored
                out.append(Passage(chunk, score))
                if len(out) >= limit:
                    break
        return out


def index_name(settings: Settings, corpus: Corpus) -> str:
    """Each corpus version gets its own index, so ingest is idempotent and rollback is a config change."""
    return f"{settings.opensearch_index}-{corpus.version}"


def opensearch_client(settings: Settings) -> Any:
    try:
        from opensearchpy import OpenSearch, RequestsHttpConnection
    except ImportError as exc:  # pragma: no cover - exercised only in AWS images
        raise RuntimeError("OpenSearch retrieval needs the 'aws' extra: uv sync --extra aws") from exc
    kwargs: dict[str, Any] = {
        "hosts": [settings.opensearch_url],
        "use_ssl": settings.opensearch_url.startswith("https"),
        "verify_certs": True,
    }
    if settings.opensearch_auth == "sigv4":
        import boto3
        from opensearchpy import AWSV4SignerAuth

        credentials = boto3.Session().get_credentials()
        kwargs["http_auth"] = AWSV4SignerAuth(credentials, settings.aws_region, settings.opensearch_service)
        kwargs["connection_class"] = RequestsHttpConnection
    elif settings.opensearch_auth == "basic":
        kwargs["http_auth"] = (settings.opensearch_username, settings.opensearch_password)
    return OpenSearch(**kwargs)


_retriever: Retriever | None = None


def get_retriever() -> Retriever:
    global _retriever
    if _retriever is None:
        settings, corpus = get_settings(), get_corpus()
        if settings.retriever == "opensearch":
            from .gateway import get_gateway

            gateway = get_gateway()
            embed = None if settings.offline else gateway.embed
            _retriever = OpenSearchRetriever(opensearch_client(settings), index_name(settings, corpus), corpus, embed)
        else:
            _retriever = LocalRetriever(corpus)
    return _retriever


def set_retriever(retriever: Retriever | None) -> None:
    global _retriever
    _retriever = retriever
