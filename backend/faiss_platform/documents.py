"""Deal documents: storage, text extraction, classification, fact extraction and search.

Deal documents are confidential to the deal. They are stored under the deal's own prefix,
indexed in the deal's own rows, and searched only through a deal id that the caller has
already been authorised for.
"""

from __future__ import annotations

import asyncio
import hashlib
import io
import math
import re
import zipfile
from collections import Counter
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from defusedxml import ElementTree
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .config import Settings, get_settings
from .db import Document, DocumentChunk, new_id
from .finance import LINE_ITEMS
from .retrieval import tokenize
from .security import Access

MAX_UPLOAD_BYTES = 40 * 1024 * 1024
MAX_UNPACKED_BYTES = 200 * 1024 * 1024
CHUNK_CHARS = 1200

# What a diligence data room is expected to hold. Used to spot what is missing.
EXPECTED_DOC_TYPES: dict[str, str] = {
    "annual_report": "Annual report (latest three years)",
    "financial_statements": "Audited financial statements",
    "cim": "Confidential information memorandum",
    "legal": "Legal documents (constitutional documents, material contracts, litigation schedule)",
    "regulatory": "Regulatory correspondence and licence documents",
    "technology": "Technology and operations documentation",
}

_TYPE_RULES: list[tuple[str, str, re.Pattern[str]]] = [
    ("cim", "general", re.compile(r"confidential information memorandum|information memorandum|\bcim\b|teaser", re.I)),
    (
        "financial_statements",
        "finance-tax",
        re.compile(
            r"statement of financial position|statement of comprehensive income|audited financial statements|independent auditor|balance sheet",
            re.I,
        ),
    ),
    (
        "annual_report",
        "finance-tax",
        re.compile(r"annual report|integrated report|chairman'?s (statement|report)|directors'? report", re.I),
    ),
    (
        "regulatory",
        "compliance",
        re.compile(r"licen[cs]e|prudential|central bank|regulator|supervisory|capital adequacy return", re.I),
    ),
    (
        "legal",
        "legal",
        re.compile(
            r"share purchase agreement|\bspa\b|non-disclosure|articles of association|litigation|shareholders'? agreement|material contract",
            re.I,
        ),
    ),
    (
        "technology",
        "technology",
        re.compile(
            r"core banking|architecture|cyber|disaster recovery|data cent(re|er)|it audit|system inventory", re.I
        ),
    ),
]

_LABELS: dict[str, list[str]] = {
    "total_assets": ["total assets"],
    "total_equity": ["total equity", "total shareholders' equity", "total shareholders equity", "shareholders' funds"],
    "gross_loans": ["gross loans and advances", "loans and advances to customers", "gross loans"],
    "customer_deposits": ["customer deposits", "deposits from customers", "deposits due to customers"],
    "net_interest_income": ["net interest income"],
    "non_interest_income": ["non-interest income", "non interest income", "non-funded income"],
    "operating_expenses": ["operating expenses", "total operating expenses"],
    "impairment_charge": [
        "credit impairment charge",
        "impairment charge",
        "impairment losses on loans",
        "credit impairments",
    ],
    "profit_after_tax": ["profit after tax", "profit for the year", "profit for the period"],
    "non_performing_loans": ["non-performing loans", "non performing loans", "stage 3 loans"],
    "loan_loss_provisions": [
        "loan loss provisions",
        "allowance for impairment",
        "impairment allowance",
        "expected credit loss allowance",
    ],
    "interest_earning_assets": ["interest-earning assets", "interest earning assets"],
}
# Comma-grouped, space-grouped (never when a comma follows, so a note reference is not glued to
# the figure after it), or plain. Columns separated by wider gaps stay separate numbers.
_NUMBER = re.compile(r"\(?-?(?:\d{1,3}(?:,\d{3})+|\d{1,3}(?:[ \u00a0\u202f]\d{3})+(?![,\d])|\d+)(?:\.\d+)?\)?")
_UNIT = re.compile(
    r"\b((?:[A-Z]{3}|R|US\$)\s?(?:'000|millions?|mn|billions?|bn|m)\b|[Ii]n (?:thousands|millions|billions) of [A-Za-z]+(?: [A-Za-z]+)?)"
)
# Statements show these as negatives or in brackets; the engine wants magnitudes.
_MAGNITUDES = {"operating_expenses", "impairment_charge", "loan_loss_provisions"}


@dataclass
class ExtractedText:
    pages: list[tuple[int | None, str]]
    indexed: bool
    note: str = ""


def extract_text(filename: str, content_type: str, data: bytes) -> ExtractedText:
    suffix = Path(filename).suffix.lower()
    try:
        if suffix == ".pdf" or content_type == "application/pdf":
            from pypdf import PdfReader

            reader = PdfReader(io.BytesIO(data))
            pages = [(i + 1, page.extract_text() or "") for i, page in enumerate(reader.pages)]
            if not any(text.strip() for _, text in pages):
                return ExtractedText(
                    [], False, "No text layer found (scanned document). Needs OCR before it can be searched."
                )
            return ExtractedText(pages, True)
        if suffix == ".docx":
            with zipfile.ZipFile(io.BytesIO(data)) as archive:
                info = archive.getinfo("word/document.xml")
                if info.file_size > MAX_UNPACKED_BYTES:  # refuse decompression bombs
                    return ExtractedText([], False, "This document is too large to read safely.")
                xml = archive.read(info)
            ns = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
            paragraphs = [
                "".join(t.text or "" for t in p.iter(f"{ns}t")) for p in ElementTree.fromstring(xml).iter(f"{ns}p")
            ]
            return ExtractedText([(None, "\n".join(p for p in paragraphs if p.strip()))], True)
        if suffix == ".xlsx":
            from openpyxl import load_workbook

            book = load_workbook(io.BytesIO(data), read_only=True, data_only=True)
            pages = []
            for sheet in book.worksheets:
                rows = ["  ".join(str(c) for c in row if c is not None) for row in sheet.iter_rows(values_only=True)]
                pages.append((None, f"[Sheet: {sheet.title}]\n" + "\n".join(r for r in rows if r.strip())))
            return ExtractedText(pages, True)
        if suffix in {".txt", ".md", ".csv", ".json"} or content_type.startswith("text/"):
            return ExtractedText([(None, data.decode("utf-8", errors="replace"))], True)
    except Exception as exc:  # a malformed file must not fail the upload
        return ExtractedText([], False, f"Could not read this file: {exc.__class__.__name__}.")
    return ExtractedText([], False, f"Files of type '{suffix or content_type}' are stored but not searchable yet.")


def chunk_pages(pages: list[tuple[int | None, str]]) -> list[tuple[int | None, str]]:
    out: list[tuple[int | None, str]] = []
    for page, text in pages:
        buffer = ""
        for paragraph in re.split(r"\n\s*\n", text):
            paragraph = paragraph.strip()
            if not paragraph:
                continue
            while len(paragraph) > CHUNK_CHARS:
                cut = paragraph.rfind("\n", 0, CHUNK_CHARS)
                cut = cut if cut > CHUNK_CHARS // 3 else CHUNK_CHARS
                piece, paragraph = paragraph[:cut], paragraph[cut:].strip()
                if buffer:
                    out.append((page, buffer))
                    buffer = ""
                out.append((page, piece))
            if buffer and len(buffer) + len(paragraph) + 2 > CHUNK_CHARS:
                out.append((page, buffer))
                buffer = paragraph
            else:
                buffer = f"{buffer}\n\n{paragraph}" if buffer else paragraph
        if buffer:
            out.append((page, buffer))
    return out


def classify(filename: str, text: str) -> tuple[str, str]:
    """(doc_type, workstream). The filename is the strongest signal, then the opening pages."""
    for haystack in (filename.replace("_", " ").replace("-", " "), text[:6000]):
        for doc_type, workstream, pattern in _TYPE_RULES:
            if pattern.search(haystack):
                return doc_type, workstream
    return "other", "general"


def _to_number(raw: str) -> float | None:
    negative = raw.strip().startswith("(") or raw.strip().startswith("-")
    digits = re.sub(r"[^\d.]", "", raw)
    if not digits or digits == ".":
        return None
    try:
        value = float(digits)
    except ValueError:
        return None
    return -value if negative else value


def extract_financial_facts(
    pages: list[tuple[int | None, str]], document: str
) -> tuple[dict[str, dict[str, Any]], str]:
    """Pattern-based extraction of headline bank line items. Deliberately conservative: the first
    figure after a recognised label on the same line. Everything it finds is 'unverified'."""
    facts: dict[str, dict[str, Any]] = {}
    unit = ""
    for page, text in pages:
        if not unit:
            found = _UNIT.search(text)
            unit = found.group(1) if found else ""
        for line in text.splitlines():
            lowered = line.lower()
            for key, labels in _LABELS.items():
                if key in facts:
                    continue
                label = next((lab for lab in labels if lab in lowered), None)
                if label is None:
                    continue
                tail = line[lowered.index(label) + len(label) :]
                # skip note references such as "Total assets 12 1,234,567"
                numbers = [m.group(0) for m in _NUMBER.finditer(tail)]
                values = [(n, _to_number(n)) for n in numbers]
                values = [(n, v) for n, v in values if v is not None]
                if len(values) > 1 and abs(values[0][1]) < 100 and "." not in values[0][0] and abs(values[1][1]) >= 100:
                    values = values[1:]
                if not values:
                    continue
                facts[key] = {
                    "value": abs(values[0][1]) if key in _MAGNITUDES else values[0][1],
                    "status": "unverified",
                    "source": {"document": document, "page": page, "quote": line.strip()[:240]},
                }
    return facts, unit


async def store_bytes(settings: Settings, deal_id: str, document_id: str, filename: str, data: bytes) -> str:
    safe = re.sub(r"[^A-Za-z0-9._-]+", "_", Path(filename).name)[:160] or "document"
    key = f"deals/{deal_id}/{document_id}/{safe}"
    if settings.documents_bucket:
        import boto3  # available in the AWS image (the 'aws' extra)

        client = boto3.client("s3", region_name=settings.aws_region)
        # No encryption header: the bucket's default applies its customer-managed KMS key. Naming
        # "aws:kms" without a key id would select the AWS-managed key, which the bucket policy refuses.
        await asyncio.to_thread(client.put_object, Bucket=settings.documents_bucket, Key=key, Body=data)
        return f"s3://{settings.documents_bucket}/{key}"
    path = settings.documents_dir / key
    path.parent.mkdir(parents=True, exist_ok=True)
    await asyncio.to_thread(path.write_bytes, data)
    return f"file://{path}"


async def ingest_document(
    session: AsyncSession, deal: Any, *, filename: str, content_type: str, data: bytes, uploaded_by: str
) -> tuple[Document, dict[str, Any]]:
    """Stores, reads, classifies and indexes one upload. Returns the document and the financial
    facts found in it (already merged into the Deal Twin as unverified, never overwriting a
    verified figure)."""
    settings = get_settings()
    document_id = new_id()
    uri = await store_bytes(settings, deal.id, document_id, filename, data)
    extracted = await asyncio.to_thread(extract_text, filename, content_type, data)
    full_text = "\n".join(text for _, text in extracted.pages)
    doc_type, workstream = classify(filename, full_text)
    facts, unit = (
        extract_financial_facts(extracted.pages, filename)
        if doc_type in {"financial_statements", "annual_report", "cim"}
        else ({}, "")
    )

    document = Document(
        id=document_id,
        deal_id=deal.id,
        filename=Path(filename).name[:300],
        content_type=content_type,
        size=len(data),
        sha256=hashlib.sha256(data).hexdigest(),
        storage_uri=uri,
        doc_type=doc_type,
        workstream=workstream,
        status="processed" if extracted.indexed else "stored_unindexed",
        extracted={"note": extracted.note, "facts": sorted(facts), "unit": unit, "pages": len(extracted.pages)},
        uploaded_by=uploaded_by,
    )
    session.add(document)
    for ordinal, (page, text) in enumerate(chunk_pages(extracted.pages)):
        session.add(DocumentChunk(document_id=document_id, deal_id=deal.id, ordinal=ordinal, page=page, text=text))

    if facts:
        twin = dict(deal.twin or {})
        financials = dict(twin.get("financials") or {})
        for key, fact in facts.items():
            if (financials.get(key) or {}).get("status") != "verified":
                financials[key] = fact
        twin["financials"] = financials
        if unit and not twin.get("unit"):
            twin["unit"] = unit
        deal.twin = twin
    await session.flush()
    return document, facts


@dataclass
class DocumentPassage:
    document_id: str
    filename: str
    doc_type: str
    workstream: str
    page: int | None
    text: str
    score: float
    focus: str = ""  # the part of the passage that matched, when a specific phrase was looked for

    def citation(self, quote_chars: int = 320) -> dict[str, Any]:
        quote = self.focus or (
            self.text if len(self.text) <= quote_chars else self.text[:quote_chars].rsplit(" ", 1)[0] + " …"
        )
        return {
            "kind": "document",
            "id": self.document_id,
            "title": self.filename,
            "page": self.page,
            "quote": quote,
            "doc_type": self.doc_type,
        }


async def search_deal_documents(
    session: AsyncSession, access: Access, query: str, limit: int = 5
) -> list[DocumentPassage]:
    """BM25 over this deal's document text, restricted to the workstreams the caller may see."""
    rows = (
        await session.execute(
            select(DocumentChunk, Document)
            .join(Document, Document.id == DocumentChunk.document_id)
            .where(DocumentChunk.deal_id == access.deal.id)
        )
    ).all()
    rows = [(chunk, doc) for chunk, doc in rows if access.sees(doc.workstream)]
    terms = set(tokenize(query))
    if not rows or not terms:
        return []
    tokenised = [Counter(tokenize(chunk.text)) for chunk, _ in rows]
    avg_len = sum(sum(c.values()) for c in tokenised) / len(tokenised)
    n = len(rows)
    scored: list[tuple[float, int]] = []
    for i, counts in enumerate(tokenised):
        score = 0.0
        length = sum(counts.values()) or 1
        for term in terms:
            tf = counts.get(term)
            if not tf:
                continue
            df = sum(1 for c in tokenised if term in c)
            idf = math.log(1 + (n - df + 0.5) / (df + 0.5))
            score += idf * tf * 2.4 / (tf + 1.4 * (0.3 + 0.7 * length / avg_len))
        if score > 0:
            scored.append((score, i))
    scored.sort(reverse=True)
    out = []
    for score, i in scored[:limit]:
        chunk, doc = rows[i]
        out.append(DocumentPassage(doc.id, doc.filename, doc.doc_type, doc.workstream, chunk.page, chunk.text, score))
    return out


async def find_anchored(
    session: AsyncSession, access: Access, pattern: re.Pattern[str], limit: int = 2
) -> list[DocumentPassage]:
    """Passages in this deal's documents that contain a specific phrase, best first. The quote
    is the text around the phrase, so a reviewer sees exactly what was matched."""
    rows = (
        await session.execute(
            select(DocumentChunk, Document)
            .join(Document, Document.id == DocumentChunk.document_id)
            .where(DocumentChunk.deal_id == access.deal.id)
            .order_by(Document.created_at, DocumentChunk.ordinal)
        )
    ).all()
    found: list[DocumentPassage] = []
    for chunk, doc in rows:
        if not access.sees(doc.workstream):
            continue
        matches = list(pattern.finditer(chunk.text))
        if not matches:
            continue
        first = matches[0]
        start, end = max(0, first.start() - 140), min(len(chunk.text), first.end() + 180)
        focus = (
            ("… " if start else "") + " ".join(chunk.text[start:end].split()) + (" …" if end < len(chunk.text) else "")
        )
        found.append(
            DocumentPassage(
                doc.id, doc.filename, doc.doc_type, doc.workstream, chunk.page, chunk.text, float(len(matches)), focus
            )
        )
    found.sort(key=lambda p: -p.score)
    # one passage per document, so two citations mean two documents
    unique: dict[str, DocumentPassage] = {}
    for passage in found:
        unique.setdefault(passage.document_id, passage)
    return list(unique.values())[:limit]


async def missing_document_types(session: AsyncSession, deal_id: str) -> list[tuple[str, str]]:
    present = {row[0] for row in await session.execute(select(Document.doc_type).where(Document.deal_id == deal_id))}
    return [(key, label) for key, label in EXPECTED_DOC_TYPES.items() if key not in present]


__all__ = [
    "EXPECTED_DOC_TYPES",
    "LINE_ITEMS",
    "MAX_UPLOAD_BYTES",
    "DocumentPassage",
    "classify",
    "extract_financial_facts",
    "extract_text",
    "find_anchored",
    "ingest_document",
    "missing_document_types",
    "search_deal_documents",
]
