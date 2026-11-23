"""Country intelligence packs for African markets.

IMPORTANT: these packs are seed reference data — authority names and bloc memberships only,
no thresholds, timelines or fees. Every pack is marked unverified. Before any pack informs a
real transaction it must be confirmed against the regulators' own publications and the
`verified` flag set by the accountable Compliance or Legal lead. The agents repeat this caveat
whenever they cite a pack.
"""

from __future__ import annotations

from typing import Any

CAVEAT = "Seed reference data, not yet verified against primary regulator sources. Confirm with Compliance and Legal before relying on it."

_COMESA = "COMESA competition authority (supranational merger review may apply where the parties operate in two or more member states)"
_EAC = "East African Community Competition Authority"
_ECOWAS = "ECOWAS Regional Competition Authority"


def _pack(
    iso: str,
    name: str,
    currency: str,
    presence: str,
    banking: str,
    competition: str,
    markets: str,
    blocs: list[str],
    regional: list[str],
    other: list[str] | None = None,
) -> dict[str, Any]:
    return {
        "iso": iso,
        "name": name,
        "currency": currency,
        "absa_presence": presence,
        "authorities": {
            "banking_supervisor": banking,
            "competition": competition,
            "securities_and_markets": markets,
            "other": other or [],
        },
        "regional_blocs": blocs,
        "regional_competition_bodies": regional,
        "questions_to_resolve": [
            "Which change-of-control and fit-and-proper approvals does the banking supervisor require for this transaction, and in what sequence?",
            "Is a merger notification required nationally, regionally, or both?",
            "Do exchange-control, foreign-ownership or local-shareholding rules affect the structure?",
            "Which data-residency and cross-border transfer rules apply to customer data in scope?",
        ],
        "verified": False,
        "caveat": CAVEAT,
    }


PACKS: dict[str, dict[str, Any]] = {
    p["iso"]: p
    for p in [
        _pack(
            "ZA",
            "South Africa",
            "ZAR",
            "home market",
            "Prudential Authority (South African Reserve Bank)",
            "Competition Commission of South Africa",
            "Financial Sector Conduct Authority; JSE",
            ["SADC", "SACU"],
            [],
            ["South African Reserve Bank Financial Surveillance Department (exchange control)"],
        ),
        _pack(
            "BW",
            "Botswana",
            "BWP",
            "subsidiary",
            "Bank of Botswana",
            "Competition and Consumer Authority",
            "Non-Bank Financial Institutions Regulatory Authority; Botswana Stock Exchange",
            ["SADC", "SACU"],
            [],
        ),
        _pack(
            "GH",
            "Ghana",
            "GHS",
            "subsidiary",
            "Bank of Ghana",
            "No general merger-control authority identified in this seed data — confirm",
            "Securities and Exchange Commission (Ghana); Ghana Stock Exchange",
            ["ECOWAS"],
            [_ECOWAS],
        ),
        _pack(
            "KE",
            "Kenya",
            "KES",
            "subsidiary",
            "Central Bank of Kenya",
            "Competition Authority of Kenya",
            "Capital Markets Authority; Nairobi Securities Exchange",
            ["EAC", "COMESA"],
            [_COMESA, _EAC],
        ),
        _pack(
            "MU",
            "Mauritius",
            "MUR",
            "subsidiary",
            "Bank of Mauritius",
            "Competition Commission of Mauritius",
            "Financial Services Commission; Stock Exchange of Mauritius",
            ["SADC", "COMESA"],
            [_COMESA],
        ),
        _pack(
            "MZ",
            "Mozambique",
            "MZN",
            "subsidiary",
            "Banco de Moçambique",
            "Autoridade Reguladora da Concorrência",
            "Bolsa de Valores de Moçambique",
            ["SADC"],
            [],
        ),
        _pack(
            "SC",
            "Seychelles",
            "SCR",
            "subsidiary",
            "Central Bank of Seychelles",
            "Fair Trading Commission",
            "Financial Services Authority",
            ["SADC", "COMESA"],
            [_COMESA],
        ),
        _pack(
            "TZ",
            "Tanzania",
            "TZS",
            "subsidiaries",
            "Bank of Tanzania",
            "Fair Competition Commission",
            "Capital Markets and Securities Authority; Dar es Salaam Stock Exchange",
            ["EAC", "SADC"],
            [_EAC],
        ),
        _pack(
            "UG",
            "Uganda",
            "UGX",
            "subsidiary",
            "Bank of Uganda",
            "Competition regime recently legislated — confirm the enforcing body",
            "Capital Markets Authority; Uganda Securities Exchange",
            ["EAC", "COMESA"],
            [_COMESA, _EAC],
        ),
        _pack(
            "ZM",
            "Zambia",
            "ZMW",
            "subsidiary",
            "Bank of Zambia",
            "Competition and Consumer Protection Commission",
            "Securities and Exchange Commission (Zambia); Lusaka Securities Exchange",
            ["SADC", "COMESA"],
            [_COMESA],
        ),
        _pack(
            "NG",
            "Nigeria",
            "NGN",
            "representative office",
            "Central Bank of Nigeria",
            "Federal Competition and Consumer Protection Commission",
            "Securities and Exchange Commission (Nigeria); Nigerian Exchange",
            ["ECOWAS"],
            [_ECOWAS],
        ),
        _pack(
            "NA",
            "Namibia",
            "NAD",
            "representative office",
            "Bank of Namibia",
            "Namibian Competition Commission",
            "Namibia Financial Institutions Supervisory Authority; Namibian Stock Exchange",
            ["SADC", "SACU"],
            [],
        ),
    ]
}

CONTINENTAL_NOTES = [
    "The AfCFTA Protocol on Competition Policy foresees a continental competition regime; confirm its operational status before assuming it applies.",
    "Cross-border deals can need parallel national and regional filings; sequence them with the Compliance & Regulatory Approvals workstream.",
]


def country(iso: str) -> dict[str, Any] | None:
    return PACKS.get(iso.upper())


def countries() -> list[dict[str, Any]]:
    return sorted(PACKS.values(), key=lambda p: p["name"])
