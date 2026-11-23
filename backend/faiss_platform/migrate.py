"""Database migrations: `python -m faiss_platform.migrate` upgrades to the latest schema.

python -m faiss_platform.migrate              # upgrade to head (what the cluster's pre-sync job runs)
python -m faiss_platform.migrate --sql        # print the SQL instead of running it, for DBA review
python -m faiss_platform.migrate --revision "add x"   # developers: generate a new revision from the models
"""

from __future__ import annotations

import argparse
from pathlib import Path

from alembic import command
from alembic.config import Config

from .config import get_settings


def alembic_config(url: str | None = None) -> Config:
    config = Config()
    config.set_main_option("script_location", str(Path(__file__).parent / "migrations"))
    # '%' is the config-file interpolation character, and it appears in URL-encoded passwords.
    config.set_main_option("sqlalchemy.url", (url or get_settings().database_url).replace("%", "%%"))
    return config


def main(argv: list[str] | None = None) -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--sql", action="store_true", help="print the upgrade SQL without running it")
    parser.add_argument("--revision", metavar="MESSAGE", help="generate a new revision from the models")
    args = parser.parse_args(argv)
    config = alembic_config()
    if args.revision:
        command.revision(config, message=args.revision, autogenerate=True)
    else:
        command.upgrade(config, "head", sql=args.sql)


if __name__ == "__main__":
    main()
