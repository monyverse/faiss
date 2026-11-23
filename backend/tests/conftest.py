from __future__ import annotations

from pathlib import Path

import pytest

from faiss_platform import config, db, gateway
from faiss_platform.agents import reasoner

SAMPLES = Path(__file__).resolve().parents[1] / "sample_data"


@pytest.fixture(autouse=True)
async def isolated(tmp_path, monkeypatch):
    """Each test gets its own database and document store, offline, with dev identities."""
    monkeypatch.setenv("FAISS_DATABASE_URL", f"sqlite+aiosqlite:///{tmp_path / 'test.db'}")
    monkeypatch.setenv("FAISS_DOCUMENTS_DIR", str(tmp_path / "documents"))
    monkeypatch.setenv("FAISS_EMBEDDED_WORKER", "false")
    monkeypatch.setenv("FAISS_AUTH_MODE", "dev")
    monkeypatch.setenv("FAISS_ENV", "dev")
    for name in ("FAISS_LITELLM_BASE_URL", "FAISS_LITELLM_API_KEY", "FAISS_TEMPORAL_ADDRESS", "FAISS_DOCUMENTS_BUCKET"):
        monkeypatch.delenv(name, raising=False)
    monkeypatch.setenv("FAISS_RETRIEVER", "local")
    config.get_settings.cache_clear()
    await db.dispose()
    reasoner.set_reasoner(None)
    gateway.set_gateway(None)
    await db.create_all()
    yield
    await db.dispose()
    config.get_settings.cache_clear()
    reasoner.set_reasoner(None)
    gateway.set_gateway(None)


@pytest.fixture
def samples() -> Path:
    return SAMPLES
