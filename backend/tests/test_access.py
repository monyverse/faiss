"""Deal-level isolation, enforced by the API and data layer."""

from __future__ import annotations

from helpers import AUDIT, DIRECTOR, KENYA, LEGAL, TECH, client, new_deal, run_diligence, upload_samples


async def test_people_see_only_their_deals_and_denials_are_audited():
    async with client(DIRECTOR) as director, client(KENYA) as kenya, client(AUDIT) as auditor:
        deal_a = await new_deal(director, "Project Baobab")
        deal_b = await new_deal(director, "Project Acacia", countries=("GH",))
        await director.put(f"/api/deals/{deal_a}/members", json={"user_id": KENYA, "role": "member"})

        assert {d["code_name"] for d in (await kenya.get("/api/deals")).json()} == {"Project Baobab"}
        assert (await kenya.get(f"/api/deals/{deal_a}")).status_code == 200
        # A deal you may not see answers exactly like one that does not exist.
        hidden, missing = await kenya.get(f"/api/deals/{deal_b}"), await kenya.get("/api/deals/does-not-exist")
        assert hidden.status_code == missing.status_code == 404 and hidden.json() == missing.json()
        for path in ("documents", "findings", "goals", "financials", "briefing", "members"):
            assert (await kenya.get(f"/api/deals/{deal_b}/{path}")).status_code == 404
        assert (
            await kenya.post("/api/chat", json={"question": "What is in this deal?", "deal_id": deal_b})
        ).status_code == 404

        assert (await kenya.get("/api/audit")).status_code == 403
        trail = (await auditor.get("/api/audit", params={"deal_id": deal_b})).json()
        denied = [e for e in trail if e["action"] == "access.denied"]
        assert denied and all(e["actor"] == KENYA for e in denied)
        assert (await auditor.get("/api/audit/verify")).json()["intact"] is True


async def test_workstream_scoping_and_read_only_assurance():
    async with client(DIRECTOR) as director, client(TECH) as tech, client(LEGAL) as legal, client(AUDIT) as auditor:
        deal_id = await new_deal(director)
        await upload_samples(director, deal_id)
        await director.put(
            f"/api/deals/{deal_id}/members", json={"user_id": TECH, "role": "member", "workstreams": ["technology"]}
        )
        await director.put(
            f"/api/deals/{deal_id}/members", json={"user_id": LEGAL, "role": "viewer", "workstreams": ["legal"]}
        )
        await run_diligence(director, deal_id)

        everything = (await director.get(f"/api/deals/{deal_id}/findings")).json()["items"]
        seen = (await tech.get(f"/api/deals/{deal_id}/findings")).json()["items"]
        assert {f["workstream"] for f in seen} <= {"technology", "general"}
        assert {f["workstream"] for f in everything} > {f["workstream"] for f in seen}
        assert {d["workstream"] for d in (await tech.get(f"/api/deals/{deal_id}/documents")).json()} <= {
            "technology",
            "general",
        }
        assert (await tech.get(f"/api/deals/{deal_id}/financials")).status_code == 403
        assert (await tech.get(f"/api/deals/{deal_id}/valuation.xlsx")).status_code == 403
        assert (await tech.get(f"/api/deals/{deal_id}/briefing")).status_code == 403

        # A viewer and Internal Audit can read but not change anything.
        for reader in (legal, auditor):
            assert (
                await reader.post(
                    f"/api/deals/{deal_id}/goals", json={"objective": "Assess the legal position of the target"}
                )
            ).status_code == 403
            assert (
                await reader.post(f"/api/deals/{deal_id}/documents", files={"file": ("x.txt", b"hello", "text/plain")})
            ).status_code == 403
        assert (
            await auditor.post("/api/deals", json={"code_name": "Nope", "archetype_id": "full-business-acquisition"})
        ).status_code == 403
        assert len((await auditor.get(f"/api/deals/{deal_id}/findings")).json()["items"]) == len(everything)

        # Only a deal lead or director decides a sensitive action; a member cannot, nor can they manage the deal.
        approval = (await director.get("/api/approvals")).json()[0]
        assert approval["can_decide"] is True
        assert (await tech.post(f"/api/approvals/{approval['id']}/decision", json={"approve": True})).status_code == 403
        assert (await tech.patch(f"/api/deals/{deal_id}", json={"stage_id": "cutover"})).status_code == 403
        assert (
            await tech.put(f"/api/deals/{deal_id}/members", json={"user_id": TECH, "role": "deal_lead"})
        ).status_code == 403


async def test_removing_a_member_stops_their_goal():
    from faiss_platform.goals.runner import drain

    async with client(DIRECTOR) as director, client(KENYA) as kenya:
        deal_id = await new_deal(director)
        await director.put(f"/api/deals/{deal_id}/members", json={"user_id": KENYA, "role": "member"})
        goal_id = (
            await kenya.post(
                f"/api/deals/{deal_id}/goals",
                json={"objective": "Set out how we mobilise this deal in the first ten days"},
            )
        ).json()["id"]
        assert (await director.delete(f"/api/deals/{deal_id}/members/{KENYA}")).status_code == 200
        await drain()
        goal = (await director.get(f"/api/goals/{goal_id}")).json()
        assert goal["state"] == "failed" and "no longer has access" in goal["state_reason"]
        assert (
            await director.delete(f"/api/deals/{deal_id}/members/{DIRECTOR}")
        ).status_code == 409  # last deal lead stays


async def test_production_refuses_header_identity(monkeypatch):
    import pytest

    from faiss_platform import config

    monkeypatch.setenv("FAISS_ENV", "prod")
    config.get_settings.cache_clear()
    with pytest.raises(RuntimeError, match="oidc"):
        config.get_settings().validate_for_runtime()


async def test_oidc_tokens_are_verified(monkeypatch):
    import time

    import jwt
    from cryptography.hazmat.primitives.asymmetric import rsa

    from faiss_platform import config, security

    key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
    for name, value in {
        "FAISS_AUTH_MODE": "oidc",
        "FAISS_OIDC_ISSUER": "https://login.example.test/tenant",
        "FAISS_OIDC_AUDIENCE": "api://faiss",
        "FAISS_OIDC_JWKS_URL": "https://login.example.test/keys",
    }.items():
        monkeypatch.setenv(name, value)
    config.get_settings.cache_clear()

    class FakeJwks:
        def get_signing_key_from_jwt(self, token):
            return type("K", (), {"key": key.public_key()})()

    monkeypatch.setattr(security, "_jwks_client", lambda url: FakeJwks())

    def token(**overrides):
        claims = {
            "sub": "u-123",
            "name": "Zanele Khumalo",
            "roles": ["ma_director"],
            "countries": ["za"],
            "iss": "https://login.example.test/tenant",
            "aud": "api://faiss",
            "iat": int(time.time()),
            "exp": int(time.time()) + 300,
            **overrides,
        }
        return jwt.encode(claims, key, algorithm="RS256")

    async with client() as c:
        c.headers.pop("X-Faiss-User")
        assert (await c.get("/api/me")).status_code == 401
        assert (
            await c.get("/api/me", headers={"X-Faiss-User": DIRECTOR})
        ).status_code == 401  # the dev header means nothing here
        ok = await c.get("/api/me", headers={"Authorization": f"Bearer {token()}"})
        assert ok.status_code == 200 and ok.json()["roles"] == ["ma_director"] and ok.json()["countries"] == ["ZA"]
        assert (
            await c.get("/api/me", headers={"Authorization": f"Bearer {token(aud='api://other')}"})
        ).status_code == 401
        assert (
            await c.get("/api/me", headers={"Authorization": f"Bearer {token(exp=int(time.time()) - 10)}"})
        ).status_code == 401
        other = rsa.generate_private_key(public_exponent=65537, key_size=2048)
        forged = jwt.encode(
            {
                "sub": "x",
                "iss": "https://login.example.test/tenant",
                "aud": "api://faiss",
                "iat": int(time.time()),
                "exp": int(time.time()) + 300,
            },
            other,
            algorithm="RS256",
        )
        assert (await c.get("/api/me", headers={"Authorization": f"Bearer {forged}"})).status_code == 401


async def test_goal_activity_is_scoped_to_the_viewers_workstreams():
    async with client(DIRECTOR) as director, client(TECH) as tech:
        deal_id = await new_deal(director)
        await upload_samples(director, deal_id)
        await director.put(
            f"/api/deals/{deal_id}/members", json={"user_id": TECH, "role": "member", "workstreams": ["technology"]}
        )
        goal_id = await run_diligence(director, deal_id)

        full = (await director.get(f"/api/goals/{goal_id}")).json()
        seen = (await tech.get(f"/api/goals/{goal_id}")).json()
        assert seen["restricted_view"] is True and [t["id"] for t in seen["tasks"]] == ["technology"]
        assert len(full["tasks"]) == 9 and seen["approval_ids"] == [] and seen["asks"] == []
        blob = (
            (await tech.get(f"/api/goals/{goal_id}/events")).text
            + (await tech.get(f"/api/deals/{deal_id}/goals")).text
            + (await tech.get("/api/goals")).text
        )
        for leaked in ("price-to-book", "0.84", "Litigation", "Authorities to engage", "KES", "Ratios computed"):
            assert leaked not in blob, leaked
        assert "Core banking platform" in blob  # their own workstream is all there
        assert (await tech.get("/api/approvals")).json() == []
        assert len((await director.get("/api/approvals")).json()) == 1


def test_header_identity_is_refused_inside_a_cluster(monkeypatch):
    import pytest

    from faiss_platform import config

    monkeypatch.setenv("KUBERNETES_SERVICE_HOST", "10.0.0.1")  # FAISS_ENV left at its dev default
    config.get_settings.cache_clear()
    with pytest.raises(RuntimeError, match="oidc"):
        config.get_settings().validate_for_runtime()


async def test_oversized_upload_is_refused_early():
    async with client(DIRECTOR) as director:
        deal_id = await new_deal(director)
        response = await director.post(
            f"/api/deals/{deal_id}/documents",
            content=b"x",
            headers={"content-length": str(60 * 1024 * 1024), "content-type": "multipart/form-data; boundary=x"},
        )
        assert response.status_code == 413
