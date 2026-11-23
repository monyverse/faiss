from __future__ import annotations

from pathlib import Path

import httpx

from faiss_platform.goals.runner import drain
from faiss_platform.main import app

SAMPLES = Path(__file__).resolve().parents[1] / "sample_data"
DIRECTOR, KENYA, TECH, LEGAL, AUDIT = "naledi.director", "wanjiru.kenya", "thabo.tech", "amara.legal", "lerato.audit"


def client(user: str = DIRECTOR) -> httpx.AsyncClient:
    return httpx.AsyncClient(
        transport=httpx.ASGITransport(app=app), base_url="http://faiss.test", headers={"X-Faiss-User": user}
    )


async def new_deal(
    c: httpx.AsyncClient, code_name: str = "Project Baobab", countries: tuple[str, ...] = ("KE",)
) -> str:
    response = await c.post(
        "/api/deals",
        json={
            "code_name": code_name,
            "target_name": "Savanna Commercial Bank",
            "archetype_id": "full-business-acquisition",
            "stage_id": "due-diligence",
            "countries": list(countries),
        },
    )
    assert response.status_code == 201, response.text
    return response.json()["id"]


async def upload_samples(c: httpx.AsyncClient, deal_id: str) -> None:
    for path in sorted(SAMPLES.iterdir()):
        response = await c.post(
            f"/api/deals/{deal_id}/documents", files={"file": (path.name, path.read_bytes(), "text/plain")}
        )
        assert response.status_code == 201, response.text


async def run_diligence(c: httpx.AsyncClient, deal_id: str) -> str:
    """Drive a diligence goal to the point where it waits for approval."""
    goal_id = (
        await c.post(
            f"/api/deals/{deal_id}/goals",
            json={"objective": "Run due diligence on the target and prepare the investment committee briefing"},
        )
    ).json()["id"]
    await drain()
    goal = (await c.get(f"/api/goals/{goal_id}")).json()
    assert goal["state"] == "awaiting_input", goal
    response = await c.post(
        f"/api/goals/{goal_id}/answers",
        json={"ask_id": goal["asks"][0]["id"], "values": {"cost_of_equity": 20, "long_term_growth": 6}},
    )
    assert response.status_code == 200, response.text
    await drain()
    return goal_id
