from __future__ import annotations

from alembic.autogenerate import compare_metadata
from alembic.migration import MigrationContext
from sqlalchemy import create_engine

from faiss_platform.db import Base
from faiss_platform.migrate import alembic_config, main


def test_migrations_build_exactly_the_model_schema(tmp_path, monkeypatch):
    """The cluster runs migrations, development uses the models directly; they must agree."""
    path = tmp_path / "migrated.db"
    monkeypatch.setenv("FAISS_DATABASE_URL", f"sqlite+aiosqlite:///{path}")
    from faiss_platform import config

    config.get_settings.cache_clear()
    main([])
    engine = create_engine(f"sqlite:///{path}")
    with engine.connect() as connection:
        diff = compare_metadata(MigrationContext.configure(connection), Base.metadata)
    assert diff == [], diff
    assert (
        alembic_config("postgresql+asyncpg://u:p%40ss@h/db").get_main_option("sqlalchemy.url")
        == "postgresql+asyncpg://u:p%40ss@h/db"
    )
