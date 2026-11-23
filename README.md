# FAISS — M&A Intelligence Platform

FAISS turns Absa's approved M&A methodology into a working platform for African banking transactions: a persistent Deal Twin for each deal, specialist agents that carry goals to completion, an assistant that answers with citations, deterministic financial analysis, and controls built for material non-public information.

> The name is the product's, not the vector-search library's. The Python package is `faiss_platform` so the two never collide.

## What is in this repository

| Path | What it is |
|---|---|
| `knowledge/` | Extractor that turns the Absa M&A Capability Hub (`monyverse/deal`) into a versioned knowledge corpus, plus the corpus itself |
| `backend/` | Python 3.12 · FastAPI · SQLAlchemy · LangGraph · Temporal: API, Deal Twin, agents, goal engine, policy and audit |
| `frontend/` | Vite · React 19 · TanStack Start · TypeScript · Tailwind · Radix UI: the web app and an embeddable copilot element |
| `deploy/` | Terraform (AWS), Helm chart and Argo CD applications for EKS |
| `.github/workflows/` | CI and image release (GitOps: CI never applies to a cluster) |

## How it fits together

```
 Browser ──► faiss-web (TanStack Start, SSR) ──► faiss-api (FastAPI) ──► Aurora PostgreSQL   Deal Twin, goals, findings, audit
                                                   │        │
   <faiss-copilot> in other Absa portals ──────────┘        ├──► OpenSearch RAG engine       approved methodology (hybrid search)
                                                            ├──► Absa LiteLLM gateway        every model call: chat and embeddings
 faiss-worker (same image) ── goal cycles ──────────────────┤
   built-in scheduler, or Temporal when configured          └──► S3 (KMS)                    deal documents
```

Three rules shape the design:

- **The model is not the system of record, the workflow engine, or the decision-maker.** State lives in PostgreSQL, execution is durable and replay-safe, and anything sensitive waits for a person.
- **Nothing is recorded without evidence.** Every finding, risk and gap carries citations to the approved methodology, a deal document or a country pack. A draft that cites nothing is discarded.
- **Access is decided on the server, per deal and per workstream**, for people and for agents alike. An agent never holds more than the person whose goal it is running.

## The knowledge base

`knowledge/` reads a pinned snapshot of the Capability Hub and produces `knowledge/corpus/`:

- `chunks.jsonl` — 1,689 passages (1.5 M characters): all exported content from 45 content modules, inline copy from 74 routes and components, and 7 design-history documents. Wording is verbatim; each passage carries its source file, export and JSON pointer, plus the hub routes that display it.
- `ontology.json` — the typed domain model the agents and the Deal Twin use: six deal archetypes, lifecycle stages, 18 functional workstreams, regional spoke rules, governance forums and roles, mobilisation.
- `manifest.json` — hashes, counts, and every file deliberately left out, with the reason.

`bun run build` re-syncs, re-extracts and then runs a coverage gate: every string exported by a content module must appear verbatim in the corpus, and every source file must be either ingested or explicitly skipped. The backend test suite additionally fails if the corpus differs from its manifest.

One thing to know: the hub's three-question **centralisation test** now lives only in its design history (the page was retired from the live site). FAISS carries the questions as a decision aid that people answer; an agent can never decide it.

Rebuild after the hub changes:

```sh
cd knowledge && bun install && DEAL_REPO=/path/to/deal bun run build
```

## Goals: how the agents behave

You hand over a goal once. The supervisor plans it into requirements and tasks, specialists work through the tasks in cycles without you, and the goal comes back only when something changed:

- it **needs an answer** (for example the deal team's cost of equity — the engine never assumes one),
- it **needs an approval** for a sensitive action (for example submitting a committee briefing),
- it **hit a limit** (cycle count or budget), or
- it **finished** — after checking every requirement against the evidence it produced.

New documents wake a deal's open goals and re-run the tasks that depend on evidence. Goals can be paused, resumed, edited and cancelled, and each keeps an append-only event log.

Each cycle is read → compute → write: agents work from a snapshot and write nothing; one transaction then applies all effects, guarded by the cycle number. A cycle lands completely or not at all, so retries, a second worker or a Temporal replay cannot double-apply it. Scheduling is either the built-in database-leased scheduler or, when `FAISS_TEMPORAL_ADDRESS` is set, one Temporal workflow per goal.

Specialists: document intake, financial analysis, legal & corpdev, compliance & regulatory approvals, technology, Africa country intelligence, risk, mobilisation & readiness, independent challenge, and the supervisor. Each task runs a LangGraph graph: **gather** (methodology retrieval, strict data-room probes, Deal Twin) → **assess** → **guard** (evidence check and policy).

With no gateway configured the platform runs **offline**: agents produce their deterministic baseline (methodology expectations, evidence found, gaps, computed figures) and the assistant returns the most relevant approved passages. With the gateway, a model adds analysis on top of the baseline. It can add evidence-linked findings; it cannot remove baseline gaps, call tools, or produce figures.

## Controls

- **Deal-level isolation.** Group roles: `ma_director` (all deals) and `internal_audit` (read-only, plus the audit trail). Everyone else needs membership, optionally limited to named workstreams. A deal you may not see is indistinguishable from one that does not exist, and refused attempts are audited.
- **Policy engine** (`backend/faiss_platform/policy.py`, served at `/api/policy`). Low-risk work runs; sensitive actions (submit a deliverable, change stage or status, external correspondence, sharing documents) wait for a deal lead or director; reserved decisions (approve, commit, sign, bind, override a control, decide centralisation) are never available to an agent.
- **Audit trail.** Hash-chained rows; `/api/audit/verify` reports the first break.
- **Model gateway hygiene.** All model traffic goes through Absa's LiteLLM gateway. Request metadata carries only opaque ids — never a code name, target or person.
- **Financial engine.** Ratios and valuation are plain code over figures on the Deal Twin. Extracted figures stay "unverified" until a person confirms them, and every output lists the unverified inputs.
- **Country packs** (`africa.py`) are seed reference data — authority names and bloc memberships for twelve markets — and every one is marked unverified until Compliance confirms it.

## Run it locally

Needs Python 3.12 with [uv](https://docs.astral.sh/uv/) and [bun](https://bun.sh).

```sh
# API on :8000 — offline mode, built-in personas, SQLite, embedded goal worker
cd backend
uv sync
uv run python -m faiss_platform.seed        # three synthetic deals (fictional bank)
uv run uvicorn faiss_platform.main:app --port 8000

# web app on :3000
cd frontend
bun install
bun run dev
```

Pick a persona in the top bar: the Group M&A Director sees everything, the Kenya Regional Lead sees one deal, the Technology Lead sees only the technology workstream, Internal Audit is read-only. Then open **Project Baobab** and hand over: *Run due diligence on the target and prepare the investment committee briefing*.

To use a model, point the API at a LiteLLM gateway (`backend/.env.example` lists every setting):

```sh
FAISS_LITELLM_BASE_URL=https://<gateway> FAISS_LITELLM_API_KEY=<virtual key>
```

Checks:

```sh
cd backend && uv run pytest && uv run ruff check faiss_platform tests
cd frontend && bun run typecheck && bun run build
cd backend && uv run python scripts/smoke.py        # against a running API
cd knowledge && bun run check                       # rebuild the corpus from the pinned snapshot + coverage gate
```

## Deploying

`deploy/README.md` is the operator runbook: Terraform for the AWS foundation, then Argo CD syncs the Helm chart (migrate → workloads → corpus ingest). Clusters always run with `FAISS_AUTH_MODE=oidc`; the API refuses to start otherwise.

## What has and has not been verified

Verified on a developer machine:

- **Knowledge:** the coverage gate passes — all 17,520 strings exported by the hub's content modules are in the corpus verbatim.
- **Backend:** 32 automated tests pass, covering a diligence goal from plan to verified completion, waiting for and resuming on answers, approvals and new documents, deal and workstream isolation, OIDC token checks, the policy engine, the financial engine, retrieval and ingest. The Temporal workflow runs against Temporal's time-skipping test server. A smoke script passes against the running API.
- **Frontend:** typecheck and both builds pass; the production server's health, runtime config, API proxy and unbuffered streaming were checked; the main flow (hand over a goal, answer its question, approve, finish verified; open evidence; ask the assistant; switch persona) was driven in a headless browser at desktop width and at 390 px. Screens are in `frontend/docs/screens/`.
- **Deployment:** `terraform validate` passes for both stacks; `helm lint` and Kubernetes schema validation pass for dev, staging and prod.

Not verified — treat as untested until someone runs it:

- Nothing has been planned, applied or deployed to AWS or any cluster. Neither Docker image has been built.
- Absa's LiteLLM gateway, identity provider and OpenSearch RAG engine: the gateway and OpenSearch paths are tested against stand-ins only, and browser sign-in (OIDC with PKCE) has never met a real identity provider.
- Several screens compile but were never driven in a browser: new deal, document upload, workbook download, finding review, pause/resume/cancel, team, centralisation, briefing, knowledge search, Africa, audit, approvals page, goals control room, notifications.
- No accessibility audit, load test or penetration test.

## Known gaps

- **RAG engine contract.** The backend indexes into and queries OpenSearch directly. If the bank's engine exposes its own API, it needs a small adapter behind the `Retriever` interface in `backend/faiss_platform/retrieval.py`.
- **Audit archive.** Terraform provisions a write-once audit bucket, but nothing writes to it yet; the database table is the only copy.
- **Approvals are not four-eyes.** A deal lead can approve a request raised by their own goal.
- **Scanned documents** are stored but not searchable (no OCR). Figure extraction is pattern-based and marks everything it finds unverified.
- **Plan sections 1–11** were not available when this was built; the design follows sections 12–20.
- **Later phases** of the plan (target discovery, comparable-company analysis, portfolio intelligence, an MCP server over the tool contracts) are not built.
