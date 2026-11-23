"""Smoke test against a running FAISS API (development identities).

    python scripts/smoke.py [http://localhost:8000]

Seeds nothing: run `python -m faiss_platform.seed` first. Exits non-zero on the first failure.
"""

from __future__ import annotations

import sys
import time

import httpx

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8000"


def main() -> None:
    director = httpx.Client(base_url=BASE, headers={"X-Faiss-User": "naledi.director"}, timeout=30)
    kenya = httpx.Client(base_url=BASE, headers={"X-Faiss-User": "wanjiru.kenya"}, timeout=30)
    assert director.get("/healthz").json() == {"status": "ok"}
    assert director.get("/readyz").json() == {"status": "ready"}
    meta = director.get("/api/meta").json()
    print(f"meta: reasoning={meta['reasoning']} retriever={meta['retriever']} scheduler={meta['scheduler']} corpus={meta['corpus']['corpusVersion']} ({meta['corpus']['chunkCount']} passages)")

    deals = director.get("/api/deals").json()
    print("director sees:", [(d["code_name"], d["stage_title"], d["counts"]["documents"]) for d in deals])
    print("kenya lead sees:", [d["code_name"] for d in kenya.get("/api/deals").json()])
    baobab = next(d for d in deals if d["code_name"] == "Project Baobab")
    hidden = next(d for d in deals if d["code_name"] == "Project Acacia")
    assert kenya.get(f"/api/deals/{hidden['id']}").status_code == 404

    answer = director.post("/api/chat", json={"question": "Who chairs the internal steering committee?"}).json()
    print(f"chat: {len(answer['citations'])} sources; first: {answer['citations'][0]['title']}")

    goal = director.post(f"/api/deals/{baobab['id']}/goals", json={"objective": "Run due diligence on the target and prepare the investment committee briefing"}).json()
    print("goal created:", goal["id"], goal["state"])

    def wait(states: set[str]) -> dict:
        for _ in range(60):
            current = director.get(f"/api/goals/{goal['id']}").json()
            if current["state"] in states:
                return current
            time.sleep(0.5)
        raise SystemExit(f"goal stuck in {current['state']}: {current['state_reason']}")

    current = wait({"awaiting_input"})
    print("goal is waiting for:", [a["kind"] for a in current["asks"]], current["progress"])
    director.post(f"/api/goals/{goal['id']}/answers", json={"ask_id": current["asks"][0]["id"], "values": {"cost_of_equity": 20, "long_term_growth": 6}}).raise_for_status()
    current = wait({"awaiting_approval"})
    approval = next(a for a in director.get("/api/approvals").json() if a["goal_id"] == goal["id"])
    print("approval requested:", approval["summary"])
    assert kenya.post(f"/api/approvals/{approval['id']}/decision", json={"approve": True}).status_code == 403
    director.post(f"/api/approvals/{approval['id']}/decision", json={"approve": True, "note": "smoke"}).raise_for_status()
    current = wait({"done"})
    print("goal done:", current["completion"]["status"], [(c["id"], c["met"]) for c in current["completion"]["checks"]])

    findings = director.get(f"/api/deals/{baobab['id']}/findings").json()
    print("findings:", findings["summary"])
    book = director.get(f"/api/deals/{baobab['id']}/valuation.xlsx")
    assert book.status_code == 200 and book.content[:2] == b"PK"
    print("notifications:", [n["kind"] for n in director.get("/api/notifications").json()["items"]][:6])
    print("audit chain:", httpx.get(f"{BASE}/api/audit/verify", headers={"X-Faiss-User": "lerato.audit"}).json())
    metrics = director.get("/metrics").text
    print("metric sample:", next(line for line in metrics.splitlines() if line.startswith("faiss_http_requests_total{") and "/goals" in line))
    print("SMOKE OK")


if __name__ == "__main__":
    main()
