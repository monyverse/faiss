"""Runtime settings. Every value comes from a FAISS_* environment variable."""

from __future__ import annotations

import os
from functools import lru_cache
from pathlib import Path

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

REPO_ROOT = Path(__file__).resolve().parents[2]


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="FAISS_", env_file=".env", extra="ignore")

    env: str = "dev"
    public_url: str = "http://localhost:3000"
    cors_origins: str = "http://localhost:3000"

    database_url: str = f"sqlite+aiosqlite:///{REPO_ROOT / 'var' / 'faiss.db'}"
    corpus_dir: Path = REPO_ROOT / "knowledge" / "corpus"
    documents_dir: Path = REPO_ROOT / "var" / "documents"
    documents_bucket: str = ""

    # Absa LiteLLM gateway: the only route to any model. Empty base URL = offline mode,
    # where answers are assembled from retrieved passages without a model.
    litellm_base_url: str = ""
    litellm_api_key: str = ""
    model_reasoning: str = "faiss-reasoning"
    model_fast: str = "faiss-fast"
    model_embedding: str = "faiss-embedding"
    llm_timeout_seconds: float = 120.0

    # Retrieval: "local" reads the corpus shipped with the image; "opensearch" uses the bank's RAG engine.
    retriever: str = "local"
    opensearch_url: str = ""
    opensearch_index: str = "faiss-knowledge"
    opensearch_auth: str = "none"  # sigv4 | basic | none
    opensearch_service: str = "es"  # es | aoss
    opensearch_username: str = ""
    opensearch_password: str = ""
    aws_region: str = Field(default="af-south-1", validation_alias="AWS_REGION")

    # Identity. "dev" trusts the X-Faiss-User header against a built-in directory and must never run in prod.
    auth_mode: str = "dev"
    oidc_issuer: str = ""
    oidc_audience: str = ""
    oidc_jwks_url: str = ""
    oidc_roles_claim: str = "roles"
    oidc_countries_claim: str = "countries"

    # Goal execution.
    embedded_worker: bool = True
    worker_poll_seconds: float = 1.0
    goal_default_max_cycles: int = 40
    goal_default_budget_usd: float = 25.0
    goal_report_every_steps: int = 10
    goal_tasks_per_cycle: int = 2
    temporal_address: str = ""
    temporal_namespace: str = "default"
    temporal_task_queue: str = "faiss-goals"

    @property
    def offline(self) -> bool:
        return not self.litellm_base_url

    @property
    def is_production(self) -> bool:
        return self.env in {"prod", "production", "staging"}

    def validate_for_runtime(self) -> None:
        """Refuse to start in a shape that would be unsafe outside a developer machine."""
        # Fail closed: header-based identity is for a developer's machine. It is refused in any
        # named non-dev environment and in any Kubernetes pod, even if FAISS_ENV was never set.
        in_cluster = bool(os.environ.get("KUBERNETES_SERVICE_HOST"))
        if self.auth_mode != "oidc" and (self.is_production or in_cluster):
            raise RuntimeError(
                "FAISS_AUTH_MODE must be 'oidc' outside a developer machine: header-based identity is for local use only."
            )
        if self.auth_mode == "oidc" and not (self.oidc_issuer and self.oidc_audience and self.oidc_jwks_url):
            raise RuntimeError("OIDC mode needs FAISS_OIDC_ISSUER, FAISS_OIDC_AUDIENCE and FAISS_OIDC_JWKS_URL.")
        if self.litellm_base_url and not self.litellm_api_key:
            raise RuntimeError("FAISS_LITELLM_API_KEY is required when FAISS_LITELLM_BASE_URL is set.")


@lru_cache
def get_settings() -> Settings:
    return Settings()
