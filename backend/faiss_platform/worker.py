"""Goal worker process: `python -m faiss_platform.worker`.

Runs the Temporal worker when FAISS_TEMPORAL_ADDRESS is set, otherwise the built-in
database-backed scheduler. Exposes Prometheus metrics on :9000/metrics.
"""

from __future__ import annotations

import asyncio
import logging
import signal

from prometheus_client import start_http_server

from .config import get_settings
from .goals.runner import GoalRunner
from .knowledge import get_corpus


async def main() -> None:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s %(message)s")
    settings = get_settings()
    settings.validate_for_runtime()
    get_corpus()  # fail fast if the corpus is missing from the image
    start_http_server(9000)
    if settings.temporal_address:
        from .goals.temporal_workflow import run_worker

        logging.getLogger("faiss.worker").info("Scheduling goals with Temporal at %s", settings.temporal_address)
        await run_worker()
        return
    runner = GoalRunner()
    loop = asyncio.get_running_loop()
    for sig in (signal.SIGINT, signal.SIGTERM):
        loop.add_signal_handler(sig, lambda: asyncio.create_task(runner.stop()))
    await runner.run_forever()


if __name__ == "__main__":
    asyncio.run(main())
