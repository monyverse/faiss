"""Client for Absa's LiteLLM gateway — the single route to any model.

The gateway owns provider credentials, model routing, budgets and spend logging; this service
holds only a gateway key. Nothing here talks to a model provider directly.

Confidentiality: gateway logs sit outside the deal's access boundary, so request metadata
carries opaque identifiers only (deal id, goal id, a hash of the user) — never a code name,
a target's name or a person's name.
"""

from __future__ import annotations

import hashlib
import json
import re
from collections.abc import AsyncIterator
from dataclasses import dataclass, field
from typing import Any

import httpx

from .config import Settings, get_settings


class GatewayError(RuntimeError):
    pass


@dataclass
class Completion:
    text: str
    cost_usd: float = 0.0
    model: str = ""
    usage: dict[str, int] = field(default_factory=dict)


@dataclass
class CallContext:
    """Who and what a model call is for. Rendered as opaque gateway tags."""

    purpose: str
    deal_id: str | None = None
    goal_id: str | None = None
    agent: str | None = None
    user_sub: str | None = None

    def metadata(self) -> dict[str, Any]:
        tags = ["app:faiss", f"purpose:{self.purpose}"]
        if self.deal_id:
            tags.append(f"deal:{self.deal_id}")
        if self.goal_id:
            tags.append(f"goal:{self.goal_id}")
        if self.agent:
            tags.append(f"agent:{self.agent}")
        return {"tags": tags}

    def user(self) -> str:
        return hashlib.sha256((self.user_sub or "system").encode()).hexdigest()[:24]


def parse_json_reply(text: str) -> dict[str, Any]:
    """Models wrap JSON in prose or code fences often enough that parsing must be lenient."""
    fenced = re.search(r"```(?:json)?\s*(\{.*\})\s*```", text, re.S)
    candidate = fenced.group(1) if fenced else text
    start, end = candidate.find("{"), candidate.rfind("}")
    if start == -1 or end <= start:
        raise GatewayError("The model reply did not contain a JSON object.")
    try:
        parsed = json.loads(candidate[start : end + 1])
    except json.JSONDecodeError as exc:
        raise GatewayError(f"The model reply was not valid JSON: {exc}") from exc
    if not isinstance(parsed, dict):
        raise GatewayError("The model reply was JSON but not an object.")
    return parsed


class LiteLLMGateway:
    def __init__(self, settings: Settings, transport: httpx.AsyncBaseTransport | None = None) -> None:
        self.settings = settings
        self._client = httpx.AsyncClient(
            base_url=settings.litellm_base_url.rstrip("/") or "http://gateway.invalid",
            headers={"Authorization": f"Bearer {settings.litellm_api_key}"},
            timeout=settings.llm_timeout_seconds,
            transport=transport,
        )

    @property
    def configured(self) -> bool:
        return bool(self.settings.litellm_base_url)

    def _require(self) -> None:
        if not self.configured:
            raise GatewayError("No LiteLLM gateway is configured (FAISS_LITELLM_BASE_URL is empty).")

    async def chat(
        self,
        messages: list[dict[str, str]],
        *,
        model: str,
        context: CallContext,
        temperature: float = 0.2,
        max_tokens: int = 4000,
    ) -> Completion:
        self._require()
        body = {
            "model": model,
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens,
            "metadata": context.metadata(),
            "user": context.user(),
        }
        try:
            response = await self._client.post("/v1/chat/completions", json=body)
        except httpx.HTTPError as exc:
            raise GatewayError(f"LiteLLM gateway unreachable: {exc.__class__.__name__}") from exc
        if response.status_code >= 400:
            raise GatewayError(f"LiteLLM gateway returned {response.status_code}: {response.text[:300]}")
        data = response.json()
        try:
            text = data["choices"][0]["message"]["content"] or ""
        except (KeyError, IndexError, TypeError) as exc:
            raise GatewayError("LiteLLM gateway returned an unexpected response shape.") from exc
        try:
            cost = float(response.headers.get("x-litellm-response-cost", "0") or 0)
        except ValueError:
            cost = 0.0
        return Completion(text=text, cost_usd=cost, model=data.get("model", model), usage=data.get("usage") or {})

    async def chat_json(
        self, messages: list[dict[str, str]], *, model: str, context: CallContext, max_tokens: int = 4000
    ) -> tuple[dict[str, Any], float]:
        completion = await self.chat(messages, model=model, context=context, temperature=0.0, max_tokens=max_tokens)
        return parse_json_reply(completion.text), completion.cost_usd

    async def stream(self, messages: list[dict[str, str]], *, model: str, context: CallContext) -> AsyncIterator[str]:
        self._require()
        body = {
            "model": model,
            "messages": messages,
            "temperature": 0.2,
            "stream": True,
            "metadata": context.metadata(),
            "user": context.user(),
        }
        try:
            async with self._client.stream("POST", "/v1/chat/completions", json=body) as response:
                if response.status_code >= 400:
                    detail = (await response.aread()).decode(errors="replace")[:300]
                    raise GatewayError(f"LiteLLM gateway returned {response.status_code}: {detail}")
                async for line in response.aiter_lines():
                    if not line.startswith("data:"):
                        continue
                    payload = line[5:].strip()
                    if payload == "[DONE]":
                        break
                    try:
                        delta = json.loads(payload)["choices"][0]["delta"].get("content")
                    except (json.JSONDecodeError, KeyError, IndexError):
                        continue
                    if delta:
                        yield delta
        except httpx.HTTPError as exc:
            raise GatewayError(f"LiteLLM gateway unreachable: {exc.__class__.__name__}") from exc

    async def embed(self, texts: list[str]) -> list[list[float]]:
        self._require()
        body = {
            "model": self.settings.model_embedding,
            "input": texts,
            "metadata": {"tags": ["app:faiss", "purpose:embedding"]},
        }
        try:
            response = await self._client.post("/v1/embeddings", json=body)
        except httpx.HTTPError as exc:
            raise GatewayError(f"LiteLLM gateway unreachable: {exc.__class__.__name__}") from exc
        if response.status_code >= 400:
            raise GatewayError(f"LiteLLM gateway returned {response.status_code}: {response.text[:300]}")
        rows = sorted(response.json()["data"], key=lambda r: r["index"])
        return [r["embedding"] for r in rows]

    async def aclose(self) -> None:
        await self._client.aclose()


_gateway: LiteLLMGateway | None = None


def get_gateway() -> LiteLLMGateway:
    global _gateway
    if _gateway is None:
        _gateway = LiteLLMGateway(get_settings())
    return _gateway


def set_gateway(gateway: LiteLLMGateway | None) -> None:
    global _gateway
    _gateway = gateway
