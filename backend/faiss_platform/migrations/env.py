"""Alembic environment (async engine). Run through `python -m faiss_platform.migrate`."""

from __future__ import annotations

import asyncio

from alembic import context
from sqlalchemy.ext.asyncio import create_async_engine

from faiss_platform.db import Base

target_metadata = Base.metadata


def _configure(connection) -> None:
    context.configure(
        connection=connection,
        target_metadata=target_metadata,
        compare_type=True,
        render_as_batch=connection.dialect.name == "sqlite",
    )
    with context.begin_transaction():
        context.run_migrations()


async def _online() -> None:
    engine = create_async_engine(context.config.get_main_option("sqlalchemy.url"))
    async with engine.connect() as connection:
        await connection.run_sync(_configure)
        await connection.commit()
    await engine.dispose()


if context.is_offline_mode():
    context.configure(
        url=context.config.get_main_option("sqlalchemy.url"), target_metadata=target_metadata, literal_binds=True
    )
    with context.begin_transaction():
        context.run_migrations()
else:
    asyncio.run(_online())
