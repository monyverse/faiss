"""Pushes the knowledge corpus into the bank's OpenSearch RAG engine.

    python -m faiss_platform.knowledge.ingest            # index the corpus baked into the image
    python -m faiss_platform.knowledge.ingest --dry-run  # print what would be sent

Idempotent: the index name carries the corpus version, document ids are chunk ids, and a
finished index is detected by its document count. Embeddings come from the LiteLLM gateway;
without a gateway the index is lexical only.
"""

from __future__ import annotations

import argparse
import asyncio
import json
import sys
from collections.abc import Iterator
from typing import Any

from ..config import get_settings
from ..retrieval import index_name, opensearch_client
from . import Chunk, Corpus, get_corpus

EMBED_BATCH = 32


def index_body(dimension: int | None) -> dict[str, Any]:
    properties: dict[str, Any] = {
        "chunk_id": {"type": "keyword"},
        "corpus_version": {"type": "keyword"},
        "area": {"type": "keyword"},
        "origin": {"type": "keyword"},
        "status": {"type": "keyword"},
        "title": {"type": "text"},
        "breadcrumb_text": {"type": "text"},
        "text": {"type": "text"},
        "source_path": {"type": "keyword"},
        "site_routes": {"type": "keyword"},
        "tags": {"type": "object", "dynamic": True},
    }
    settings: dict[str, Any] = {"index": {"number_of_shards": 1, "number_of_replicas": 1}}
    if dimension:
        settings["index"]["knn"] = True
        properties["embedding"] = {
            "type": "knn_vector",
            "dimension": dimension,
            "method": {"name": "hnsw", "space_type": "cosinesimil", "engine": "lucene"},
        }
    return {"settings": settings, "mappings": {"dynamic": "strict", "properties": properties}}


def document(chunk: Chunk, version: str, embedding: list[float] | None = None) -> dict[str, Any]:
    doc: dict[str, Any] = {
        "chunk_id": chunk.id,
        "corpus_version": version,
        "area": chunk.area,
        "origin": chunk.origin,
        "status": chunk.status,
        "title": chunk.title,
        "breadcrumb_text": " › ".join(chunk.breadcrumb),
        "text": chunk.text,
        "source_path": chunk.source.get("path", ""),
        "site_routes": list(chunk.site_routes),
        "tags": chunk.tags,
    }
    if embedding is not None:
        doc["embedding"] = embedding
    return doc


def embedding_text(chunk: Chunk) -> str:
    return f"{' › '.join(chunk.breadcrumb)}\n{chunk.text}"


def bulk_lines(index: str, docs: list[dict[str, Any]]) -> Iterator[str]:
    for doc in docs:
        yield json.dumps({"index": {"_index": index, "_id": doc["chunk_id"]}})
        yield json.dumps(doc, ensure_ascii=False)


async def ingest(
    corpus: Corpus, client: Any, index: str, embed: Any | None, batch: int = EMBED_BATCH
) -> dict[str, Any]:
    dimension: int | None = None
    if embed is not None:
        dimension = len((await embed(["dimension probe"]))[0])

    if client.indices.exists(index=index):
        count = client.count(index=index)["count"]
        if count == len(corpus.chunks):
            return {"index": index, "indexed": 0, "skipped": count, "status": "already-complete"}
    else:
        client.indices.create(index=index, body=index_body(dimension))

    indexed = 0
    for start in range(0, len(corpus.chunks), batch):
        group = corpus.chunks[start : start + batch]
        vectors = await embed([embedding_text(c) for c in group]) if embed is not None else [None] * len(group)
        docs = [document(c, corpus.version, v) for c, v in zip(group, vectors, strict=True)]
        response = client.bulk(body="\n".join(bulk_lines(index, docs)) + "\n")
        if response.get("errors"):
            failed = [item["index"] for item in response["items"] if item["index"].get("error")]
            raise RuntimeError(f"Bulk indexing failed for {len(failed)} documents: {failed[0]}")
        indexed += len(docs)
    client.indices.refresh(index=index)
    return {"index": index, "indexed": indexed, "skipped": 0, "status": "indexed", "vectors": dimension is not None}


async def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--dry-run", action="store_true", help="report what would be indexed without contacting OpenSearch"
    )
    args = parser.parse_args(argv)

    settings, corpus = get_settings(), get_corpus()
    index = index_name(settings, corpus)
    if args.dry_run or settings.retriever != "opensearch":
        reason = "dry run" if args.dry_run else "FAISS_RETRIEVER is not 'opensearch'; the local corpus is used directly"
        print(
            json.dumps(
                {
                    "index": index,
                    "chunks": len(corpus.chunks),
                    "corpus_version": corpus.version,
                    "status": "nothing-sent",
                    "reason": reason,
                }
            )
        )
        return 0

    from ..gateway import get_gateway

    embed = None if settings.offline else get_gateway().embed
    result = await ingest(corpus, opensearch_client(settings), index, embed)
    print(json.dumps(result))
    return 0


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
