"""The LiteLLM gateway client, model analysis on top of the baseline, and the assistant."""

from __future__ import annotations

import json

import httpx
from helpers import DIRECTOR, client, new_deal, run_diligence, upload_samples

from faiss_platform import config, gateway
from faiss_platform.agents import reasoner
from faiss_platform.gateway import CallContext, GatewayError, LiteLLMGateway, parse_json_reply


def use_gateway(monkeypatch, handler) -> list[httpx.Request]:
    seen: list[httpx.Request] = []

    def wrapped(request: httpx.Request) -> httpx.Response:
        seen.append(request)
        return handler(request)

    monkeypatch.setenv("FAISS_LITELLM_BASE_URL", "https://litellm.absa.example.test")
    monkeypatch.setenv("FAISS_LITELLM_API_KEY", "sk-test-key")
    config.get_settings.cache_clear()
    gw = LiteLLMGateway(config.get_settings(), transport=httpx.MockTransport(wrapped))
    gateway.set_gateway(gw)
    reasoner.set_reasoner(reasoner.GatewayReasoner(gw, config.get_settings()))
    return seen


def completion(text: str, cost: str = "0.0125") -> httpx.Response:
    return httpx.Response(
        200,
        json={"model": "faiss-reasoning", "choices": [{"message": {"content": text}}], "usage": {"total_tokens": 10}},
        headers={"x-litellm-response-cost": cost},
    )


def test_lenient_json_parsing():
    assert parse_json_reply('Here you go:\n```json\n{"a": 1}\n```') == {"a": 1}
    assert parse_json_reply('prefix {"a": {"b": 2}} suffix') == {"a": {"b": 2}}
    for bad in ("no json", "[1, 2]", "{broken"):
        try:
            parse_json_reply(bad)
        except GatewayError:
            continue
        raise AssertionError(f"accepted {bad!r}")


async def test_gateway_requests_carry_only_opaque_identifiers(monkeypatch):
    seen = use_gateway(monkeypatch, lambda r: completion("ok"))
    gw = gateway.get_gateway()
    result = await gw.chat(
        [{"role": "user", "content": "hello"}],
        model="faiss-reasoning",
        context=CallContext("agent-task", deal_id="d1", goal_id="g1", agent="legal", user_sub="naledi.director"),
    )
    assert result.text == "ok" and result.cost_usd == 0.0125
    request = seen[0]
    body = json.loads(request.content)
    assert request.url.path == "/v1/chat/completions" and request.headers["authorization"] == "Bearer sk-test-key"
    assert body["metadata"]["tags"] == ["app:faiss", "purpose:agent-task", "deal:d1", "goal:g1", "agent:legal"]
    assert "naledi" not in body["user"] and len(body["user"]) == 24  # the user is a hash, never a name


async def test_model_analysis_adds_evidence_linked_findings_and_spend(monkeypatch):
    def handler(request: httpx.Request) -> httpx.Response:
        body = json.loads(request.content)
        prompt = body["messages"][-1]["content"]
        if "Executive summary" in prompt:
            return completion("The data room is incomplete and the valuation rests on unverified figures.")
        return completion(
            json.dumps(
                {
                    "summary": "Change-of-control consent is the main legal exposure.",
                    "findings": [
                        {
                            "kind": "risk",
                            "title": "Core banking licence needs counterparty consent on change of control",
                            "detail": "Consent is required before completion.",
                            "severity": "high",
                            "evidence": ["E1"],
                        },
                        {
                            "kind": "risk",
                            "title": "Invented exposure with no source",
                            "detail": "Not in the evidence.",
                            "severity": "critical",
                            "evidence": [],
                        },
                        {
                            "kind": "risk",
                            "title": "Cites evidence that does not exist",
                            "detail": "x",
                            "severity": "high",
                            "evidence": ["E99"],
                        },
                    ],
                }
            )
        )

    seen = use_gateway(monkeypatch, handler)
    async with client(DIRECTOR) as c:
        deal_id = await new_deal(c)
        await upload_samples(c, deal_id)
        goal_id = await run_diligence(c, deal_id)
        goal = (await c.get(f"/api/goals/{goal_id}")).json()
        assert goal["state"] == "awaiting_approval" and goal["spent_usd"] > 0
        titles = {f["title"]: f for f in (await c.get(f"/api/deals/{deal_id}/findings")).json()["items"]}
        added = titles["Core banking licence needs counterparty consent on change of control"]
        assert added["evidence"] and added["produced_by"].endswith(":model")
        assert "Invented exposure with no source" not in titles and "Cites evidence that does not exist" not in titles
        assert any(t.endswith("no evidence in the data room") for t in titles), "baseline gaps survive model analysis"
        briefing = (await c.get(f"/api/deals/{deal_id}/briefing")).json()
        assert "## Executive summary\nThe data room is incomplete" in briefing["markdown"]
    # No deal or target name ever appears in gateway metadata.
    for request in seen:
        body = json.loads(request.content)
        assert "Baobab" not in json.dumps(body["metadata"]) and "Savanna" not in json.dumps(body["metadata"])


async def test_gateway_outage_falls_back_to_the_baseline(monkeypatch):
    use_gateway(monkeypatch, lambda r: httpx.Response(503, text="upstream unavailable"))
    async with client(DIRECTOR) as c:
        deal_id = await new_deal(c)
        await upload_samples(c, deal_id)
        goal_id = await run_diligence(c, deal_id)
        assert (await c.get(f"/api/goals/{goal_id}")).json()["state"] == "awaiting_approval"
        events = (await c.get(f"/api/goals/{goal_id}/events")).json()["events"]
        assert any(
            "baseline only" in " ".join(e["payload"].get("notes", [])) for e in events if e["type"] == "task_worked"
        )
        answer = (await c.post("/api/chat", json={"question": "What happens at the go/no-go stage?"})).json()
        assert "gateway is unavailable" in answer["answer"] and answer["citations"]


async def test_assistant_answers_with_citations_offline():
    async with client(DIRECTOR) as c:
        deal_id = await new_deal(c)
        await upload_samples(c, deal_id)
        general = (
            await c.post(
                "/api/chat", json={"question": "Who chairs the internal steering committee and how often does it meet?"}
            )
        ).json()
        assert (
            general["mode"] == "offline"
            and general["citations"]
            and all(x["kind"] == "knowledge" for x in general["citations"])
        )
        assert any("SteerCo" in x["title"] for x in general["citations"][:3]), (
            "plain words must reach the hub's own shorthand"
        )

        scoped = (
            await c.post(
                "/api/chat",
                json={
                    "question": "What litigation and contingent liabilities does the target have?",
                    "deal_id": deal_id,
                },
            )
        ).json()
        kinds = [x["kind"] for x in scoped["citations"]]
        assert kinds[0] == "document" and "knowledge" in kinds
        assert "KES 310 million" in scoped["answer"]
        follow_up = await c.post(
            "/api/chat",
            json={
                "question": "And the material contracts?",
                "deal_id": deal_id,
                "conversation_id": scoped["conversation_id"],
            },
        )
        assert follow_up.status_code == 200
        stored = (await c.get(f"/api/conversations/{scoped['conversation_id']}")).json()
        assert [m["role"] for m in stored["messages"]] == ["user", "assistant", "user", "assistant"]

        async with c.stream(
            "POST", "/api/chat/stream", json={"question": "What is the purpose of due diligence?"}
        ) as stream:
            text = "".join([chunk async for chunk in stream.aiter_text()])
        assert text.startswith("event: meta") and "event: delta" in text and text.rstrip().endswith("data: {}")

        nothing = (await c.post("/api/chat", json={"question": "zzzz qqqq xxxx"})).json()
        assert nothing["citations"] == [] and "will not guess" in nothing["answer"]


async def test_streaming_through_the_gateway(monkeypatch):
    def handler(request: httpx.Request) -> httpx.Response:
        assert json.loads(request.content)["stream"] is True
        chunks = [{"choices": [{"delta": {"content": part}}]} for part in ("The SteerCo ", "decides [1].")]
        return httpx.Response(
            200,
            text="".join(f"data: {json.dumps(c)}\n\n" for c in chunks) + "data: [DONE]\n\n",
            headers={"content-type": "text/event-stream"},
        )

    use_gateway(monkeypatch, handler)
    async with client(DIRECTOR) as c:
        async with c.stream(
            "POST", "/api/chat/stream", json={"question": "Who decides at the go/no-go stage?"}
        ) as stream:
            text = "".join([chunk async for chunk in stream.aiter_text()])
        deltas = [json.loads(line[6:])["text"] for line in text.splitlines() if line.startswith('data: {"text"')]
        assert "".join(deltas) == "The SteerCo decides [1]."
