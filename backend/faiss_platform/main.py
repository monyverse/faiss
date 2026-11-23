"""FAISS API. Serves under /api; probes at /healthz and /readyz; metrics at /metrics."""

from __future__ import annotations

import logging
import time
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from prometheus_client import CONTENT_TYPE_LATEST, Counter, Histogram, generate_latest
from sqlalchemy import text

from . import db
from .api import deals, reference, work
from .config import get_settings
from .documents import MAX_UPLOAD_BYTES
from .goals.runner import GoalRunner
from .knowledge import get_corpus
from .retrieval import get_retriever

log = logging.getLogger("faiss.api")
REQUESTS = Counter("faiss_http_requests_total", "HTTP requests", ["method", "route", "status"])
LATENCY = Histogram("faiss_http_request_seconds", "HTTP request latency", ["method", "route"])


@asynccontextmanager
async def lifespan(app: FastAPI):
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s %(message)s")
    settings = get_settings()
    settings.validate_for_runtime()
    corpus = get_corpus()  # fail fast if the image has no corpus
    get_retriever()
    if settings.database_url.startswith("sqlite"):
        await db.create_all()  # local development only; clusters run `python -m faiss_platform.migrate`
    runner = None
    if settings.embedded_worker and not settings.temporal_address:
        runner = GoalRunner()
        runner.start()
    log.info(
        "FAISS ready: corpus %s (%d passages), reasoning=%s, auth=%s",
        corpus.version,
        len(corpus.chunks),
        "offline" if settings.offline else "gateway",
        settings.auth_mode,
    )
    yield
    if runner is not None:
        await runner.stop()
    await db.dispose()


def create_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(
        title="FAISS — M&A Intelligence Platform",
        version="0.1.0",
        lifespan=lifespan,
        docs_url="/api/docs",
        openapi_url="/api/openapi.json",
        redoc_url=None,
    )
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[o.strip() for o in settings.cors_origins.split(",") if o.strip()],
        allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE"],
        allow_headers=["Authorization", "Content-Type", "X-Faiss-User"],
        allow_credentials=False,
    )

    @app.middleware("http")
    async def observe(request: Request, call_next):
        started = time.perf_counter()
        # Refuse an oversized upload before its body is read and spooled to disk.
        declared = request.headers.get("content-length", "")
        if request.method == "POST" and declared.isdigit() and int(declared) > MAX_UPLOAD_BYTES + 1024 * 1024:
            return JSONResponse({"detail": "Request body too large."}, status_code=413)
        response: Response = await call_next(request)
        route = request.scope.get("route")
        template = getattr(route, "path", "unmatched")
        if request.url.path.startswith("/api/") and not template.startswith("/api"):
            template = f"/api{template}"  # included routers report their path without the mount prefix
        REQUESTS.labels(request.method, template, str(response.status_code)).inc()
        LATENCY.labels(request.method, template).observe(time.perf_counter() - started)
        # Deal data must never sit in a shared or browser cache.
        response.headers.setdefault("Cache-Control", "no-store")
        response.headers.setdefault("X-Content-Type-Options", "nosniff")
        response.headers.setdefault("Referrer-Policy", "no-referrer")
        return response

    @app.get("/healthz", include_in_schema=False)
    async def healthz() -> dict[str, str]:
        return {"status": "ok"}

    @app.get("/readyz", include_in_schema=False)
    async def readyz(response: Response) -> dict[str, str]:
        try:
            async with db.session_factory()() as session:
                await session.execute(text("SELECT 1"))
            get_corpus()
        except Exception:
            log.exception("Readiness check failed")
            response.status_code = 503
            return {"status": "unavailable"}
        return {"status": "ready"}

    @app.get("/metrics", include_in_schema=False)
    async def metrics() -> Response:
        return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)

    for module in (reference, deals, work):
        app.include_router(module.router, prefix="/api")
    return app


app = create_app()
