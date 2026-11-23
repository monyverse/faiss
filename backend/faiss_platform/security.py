"""Identity and deal-level isolation.

Access is decided here, on the server, for every request and every agent tool call. A deal a
person may not see answers exactly like a deal that does not exist.
"""

from __future__ import annotations

import asyncio
from dataclasses import dataclass, field
from functools import lru_cache
from typing import Any

import jwt
from fastapi import Depends, Header, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .config import Settings, get_settings
from .db import Deal, DealMember, get_session

# Group-wide roles. Everything else is granted per deal through membership.
ROLE_DIRECTOR = "ma_director"  # full access to every deal
ROLE_AUDIT = "internal_audit"  # read-only assurance access to every deal, plus the audit trail


@dataclass(frozen=True)
class Principal:
    sub: str
    name: str
    email: str = ""
    title: str = ""
    roles: frozenset[str] = field(default_factory=frozenset)
    countries: tuple[str, ...] = ()

    @property
    def is_director(self) -> bool:
        return ROLE_DIRECTOR in self.roles

    @property
    def is_audit(self) -> bool:
        return ROLE_AUDIT in self.roles

    def to_dict(self) -> dict[str, Any]:
        return {
            "sub": self.sub,
            "name": self.name,
            "email": self.email,
            "title": self.title,
            "roles": sorted(self.roles),
            "countries": list(self.countries),
        }


# Local-development directory. Mirrors the access examples in the platform plan so isolation
# can be exercised without an identity provider. Never used when FAISS_AUTH_MODE=oidc.
DEV_DIRECTORY: dict[str, Principal] = {
    p.sub: p
    for p in [
        Principal(
            "naledi.director",
            "Naledi Mokoena",
            "naledi.mokoena@example.test",
            "Group M&A Director",
            frozenset({ROLE_DIRECTOR}),
        ),
        Principal(
            "wanjiru.kenya", "Wanjiru Kamau", "wanjiru.kamau@example.test", "Kenya Regional Lead", countries=("KE",)
        ),
        Principal("thabo.tech", "Thabo Nkosi", "thabo.nkosi@example.test", "Technology Lead"),
        Principal("amara.legal", "Amara Okafor", "amara.okafor@example.test", "Legal Counsel"),
        Principal(
            "lerato.audit", "Lerato Dlamini", "lerato.dlamini@example.test", "Internal Audit", frozenset({ROLE_AUDIT})
        ),
    ]
}
DEV_DEFAULT_USER = "naledi.director"


@lru_cache
def _jwks_client(url: str) -> jwt.PyJWKClient:
    return jwt.PyJWKClient(url, cache_keys=True, lifespan=3600)


def _principal_from_claims(claims: dict[str, Any], settings: Settings) -> Principal:
    def as_list(value: Any) -> list[str]:
        if isinstance(value, str):
            return [value]
        return [str(v) for v in value] if isinstance(value, list) else []

    roles = frozenset(as_list(claims.get(settings.oidc_roles_claim)))
    countries = tuple(c.upper() for c in as_list(claims.get(settings.oidc_countries_claim)))
    sub = str(claims.get("sub") or "")
    if not sub:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Token has no subject.")
    return Principal(
        sub=sub,
        name=str(claims.get("name") or claims.get("preferred_username") or sub),
        email=str(claims.get("email") or claims.get("preferred_username") or ""),
        title=str(claims.get("jobTitle") or ""),
        roles=roles,
        countries=countries,
    )


def verify_token(token: str, settings: Settings) -> dict[str, Any]:
    key = _jwks_client(settings.oidc_jwks_url).get_signing_key_from_jwt(token).key
    return jwt.decode(
        token,
        key,
        algorithms=["RS256", "ES256"],
        audience=settings.oidc_audience,
        issuer=settings.oidc_issuer,
        options={"require": ["exp", "iat", "sub"]},
    )


async def get_principal(
    authorization: str | None = Header(default=None),
    x_faiss_user: str | None = Header(default=None),
) -> Principal:
    settings = get_settings()
    if settings.auth_mode == "oidc":
        if not authorization or not authorization.lower().startswith("bearer "):
            raise HTTPException(
                status.HTTP_401_UNAUTHORIZED, "Sign-in required.", headers={"WWW-Authenticate": "Bearer"}
            )
        try:
            claims = await asyncio.to_thread(verify_token, authorization[7:].strip(), settings)
        except jwt.PyJWTError as exc:
            raise HTTPException(
                status.HTTP_401_UNAUTHORIZED, "Invalid or expired token.", headers={"WWW-Authenticate": "Bearer"}
            ) from exc
        return _principal_from_claims(claims, settings)
    principal = DEV_DIRECTORY.get(x_faiss_user or DEV_DEFAULT_USER)
    if principal is None:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Unknown development user.")
    return principal


@dataclass(frozen=True)
class Access:
    """What one person may do on one deal."""

    deal: Deal
    can_write: bool
    can_manage: bool  # membership, stage and status
    workstreams: tuple[str, ...]  # ("*",) = every workstream

    @property
    def full(self) -> bool:
        return "*" in self.workstreams

    def sees(self, workstream: str) -> bool:
        """Least privilege: a member limited to named workstreams sees those and nothing else.
        Deal-wide material ("general") must be granted explicitly, like any other workstream."""
        return self.full or workstream in self.workstreams


def _not_found() -> HTTPException:
    return HTTPException(status.HTTP_404_NOT_FOUND, "Deal not found.")


async def _record_denial(principal: Principal, deal_id: str, reason: str) -> None:
    """Refused attempts are audited in their own transaction, so the record survives the failed request."""
    from . import audit
    from .db import session_scope

    try:
        async with session_scope() as session:
            await audit.record(
                session,
                actor=principal.sub,
                actor_type="user",
                action="access.denied",
                deal_id=deal_id,
                outcome="denied",
                detail={"reason": reason},
            )
    except Exception:  # noqa: S110 - auditing a denial must never turn it into a server error
        pass


async def resolve_access(
    session: AsyncSession, principal: Principal, deal_id: str, *, write: bool = False, manage: bool = False
) -> Access:
    deal = await session.get(Deal, deal_id)
    if deal is None:
        raise _not_found()
    if principal.is_director:
        access = Access(deal, True, True, ("*",))
    elif principal.is_audit:
        access = Access(deal, False, False, ("*",))
    else:
        member = (
            await session.execute(
                select(DealMember).where(DealMember.deal_id == deal_id, DealMember.user_id == principal.sub)
            )
        ).scalar_one_or_none()
        if member is None:
            await _record_denial(principal, deal_id, "not a member of the deal")
            raise _not_found()
        access = Access(
            deal, member.role in {"deal_lead", "member"}, member.role == "deal_lead", tuple(member.workstreams or ["*"])
        )
    if manage and not access.can_manage:
        await _record_denial(principal, deal_id, "deal management right required")
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Only the deal lead or a Group M&A Director can do this.")
    if write and not access.can_write:
        await _record_denial(principal, deal_id, "write access required")
        raise HTTPException(status.HTTP_403_FORBIDDEN, "You have read-only access to this deal.")
    return access


async def visible_deal_ids(session: AsyncSession, principal: Principal) -> list[str] | None:
    """None means every deal."""
    if principal.is_director or principal.is_audit:
        return None
    rows = await session.execute(select(DealMember.deal_id).where(DealMember.user_id == principal.sub))
    return [r[0] for r in rows]


async def access_for_goal(session: AsyncSession, user_sub: str, deal_id: str, run_as: dict[str, Any]) -> Access | None:
    """Access of the person a goal runs for. Agents never hold more than their creator does.

    Membership is re-read on every cycle, so removing someone from a deal stops their goals.
    A director's group-wide role lives in the identity provider, not here, so for goals created
    under that role the fact recorded at creation is used.
    """
    deal = await session.get(Deal, deal_id)
    if deal is None:
        return None
    member = (
        await session.execute(select(DealMember).where(DealMember.deal_id == deal_id, DealMember.user_id == user_sub))
    ).scalar_one_or_none()
    if member is not None:
        if member.role == "viewer":
            return None
        return Access(deal, True, member.role == "deal_lead", tuple(member.workstreams or ["*"]))
    if run_as.get("via") == "director":
        return Access(deal, True, True, ("*",))
    return None


def require_audit_reader(principal: Principal = Depends(get_principal)) -> Principal:
    if not (principal.is_director or principal.is_audit):
        raise HTTPException(
            status.HTTP_403_FORBIDDEN, "The audit trail is restricted to Group M&A Directors and Internal Audit."
        )
    return principal


SessionDep = Depends(get_session)
PrincipalDep = Depends(get_principal)
