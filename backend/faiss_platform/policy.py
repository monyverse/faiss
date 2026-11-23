"""The agent policy engine: which agent may use which tool, and under what approval.

Three outcomes, decided before any tool runs:
  allow     low-risk work — searching approved material, analysing data, drafting, recording findings
  approval  sensitive actions — a named person must approve first, and the decision is audited
  deny      decisions only people may take; the agent may prepare the paper and route it, nothing more

The table below is the machine-readable authority. It is served at /api/policy so reviewers can
read exactly what the agents are permitted to do.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any

ALLOW, APPROVAL, DENY = "allow", "approval", "deny"


@dataclass(frozen=True)
class Tool:
    name: str
    description: str
    risk: str  # read | analyse | write_internal | sensitive | reserved
    parameters: dict[str, Any]

    @property
    def effect(self) -> str:
        return {"read": ALLOW, "analyse": ALLOW, "write_internal": ALLOW, "sensitive": APPROVAL, "reserved": DENY}[
            self.risk
        ]


def _schema(**props: Any) -> dict[str, Any]:
    return {
        "type": "object",
        "properties": props,
        "required": [k for k, v in props.items() if not v.get("optional")],
        "additionalProperties": False,
    }


_S = {"type": "string"}
_OPT = {"type": "string", "optional": True}

TOOLS: dict[str, Tool] = {
    t.name: t
    for t in [
        Tool(
            "absa_document_search.methodology",
            "Search the approved M&A methodology (Capability Hub corpus).",
            "read",
            _schema(query=_S, area=_OPT),
        ),
        Tool(
            "absa_document_search.deal_documents",
            "Search documents uploaded to this deal's data room.",
            "read",
            _schema(query=_S),
        ),
        Tool(
            "absa_deal_management.get_twin",
            "Read the Deal Twin: archetype, stage, countries and recorded facts.",
            "read",
            _schema(),
        ),
        Tool(
            "absa_deal_management.record_fact",
            "Record an extracted fact on the Deal Twin, unverified until a person confirms it.",
            "write_internal",
            _schema(name=_S, value=_S, source=_OPT),
        ),
        Tool(
            "absa_deal_management.change_stage",
            "Move the deal to another lifecycle stage.",
            "sensitive",
            _schema(stage_id=_S, reason=_S),
        ),
        Tool(
            "absa_deal_management.change_status",
            "Put the deal on hold, reactivate or close it.",
            "sensitive",
            _schema(status=_S, reason=_S),
        ),
        Tool(
            "absa_financial_analysis.run",
            "Run the deterministic financial engine over recorded figures.",
            "analyse",
            _schema(),
        ),
        Tool(
            "absa_regulatory_intelligence.country_profile",
            "Read the country intelligence pack for an in-scope country.",
            "read",
            _schema(country=_S),
        ),
        Tool(
            "absa_risk_register.record",
            "Record a finding, risk or gap with its evidence.",
            "write_internal",
            _schema(kind=_S, title=_S, detail=_S, severity=_S),
        ),
        Tool(
            "absa_workstream_management.requirements",
            "Read which workstreams the deal archetype activates.",
            "read",
            _schema(),
        ),
        Tool(
            "absa_workstream_management.create_request",
            "Add an item to the diligence request list.",
            "write_internal",
            _schema(title=_S, detail=_S),
        ),
        Tool(
            "absa_workstream_management.draft_deliverable",
            "Draft a deliverable such as a committee briefing. Drafts stay inside the deal.",
            "write_internal",
            _schema(title=_S),
        ),
        Tool(
            "absa_governance_approvals.submit_deliverable",
            "Submit a formal deliverable to a governance forum.",
            "sensitive",
            _schema(forum=_S, title=_S),
        ),
        Tool(
            "absa_external.send_correspondence",
            "Send correspondence to a party outside the bank.",
            "sensitive",
            _schema(recipient=_S, subject=_S),
        ),
        Tool(
            "absa_external.share_documents",
            "Share deal documents with a party outside the deal team.",
            "sensitive",
            _schema(recipient=_S, documents=_S),
        ),
        Tool("reserved.approve_transaction", "Approve an acquisition or divestment.", "reserved", _schema()),
        Tool("reserved.commit_bank", "Commit the bank to a transaction.", "reserved", _schema()),
        Tool("reserved.sign_agreement", "Sign a legal agreement.", "reserved", _schema()),
        Tool("reserved.binding_investment_decision", "Make a binding investment decision.", "reserved", _schema()),
        Tool("reserved.override_control", "Override a regulatory or risk control.", "reserved", _schema()),
        Tool(
            "reserved.decide_centralisation",
            "Decide whether a workstream is centrally delivered.",
            "reserved",
            _schema(),
        ),
    ]
}

_READ = [
    "absa_document_search.methodology",
    "absa_document_search.deal_documents",
    "absa_deal_management.get_twin",
    "absa_workstream_management.requirements",
]
_RECORD = ["absa_risk_register.record", "absa_workstream_management.create_request"]

# Each agent's belt. An agent cannot call a tool outside its belt, whatever it is asked to do.
BELTS: dict[str, frozenset[str]] = {
    "intake": frozenset(_READ + _RECORD + ["absa_deal_management.record_fact"]),
    "financial": frozenset(_READ + _RECORD + ["absa_financial_analysis.run", "absa_deal_management.record_fact"]),
    "legal": frozenset(_READ + _RECORD),
    "regulatory": frozenset(_READ + _RECORD + ["absa_regulatory_intelligence.country_profile"]),
    "technology": frozenset(_READ + _RECORD),
    "country": frozenset(_READ + _RECORD + ["absa_regulatory_intelligence.country_profile"]),
    "risk": frozenset(_READ + _RECORD),
    "integration": frozenset(_READ + _RECORD),
    "challenger": frozenset(_READ + ["absa_risk_register.record"]),
    "supervisor": frozenset(
        _READ
        + _RECORD
        + [
            "absa_workstream_management.draft_deliverable",
            "absa_governance_approvals.submit_deliverable",
            "absa_deal_management.change_stage",
            "absa_deal_management.change_status",
            "absa_external.send_correspondence",
            "absa_external.share_documents",
        ]
    ),
}


@dataclass(frozen=True)
class Decision:
    effect: str
    reason: str


def evaluate(agent: str, tool_name: str, *, creator_can_write: bool, creator_can_manage: bool) -> Decision:
    tool = TOOLS.get(tool_name)
    if tool is None:
        return Decision(DENY, f"Unknown tool '{tool_name}'.")
    if tool.risk == "reserved":
        return Decision(
            DENY,
            "This decision is reserved for authorised people. The agent may prepare the paper and route it to the decision-maker.",
        )
    if tool_name not in BELTS.get(agent, frozenset()):
        return Decision(DENY, f"The {agent} agent is not permitted to use {tool_name}.")
    if tool.risk in {"write_internal", "sensitive"} and not creator_can_write:
        return Decision(DENY, "The person this goal runs for has read-only access to the deal.")
    if tool_name.startswith("absa_deal_management.change_") and not creator_can_manage:
        return Decision(DENY, "Only a deal lead or Group M&A Director can ask for a stage or status change.")
    if tool.risk == "sensitive":
        return Decision(APPROVAL, "Sensitive action: a person must approve it before it happens.")
    return Decision(ALLOW, "Low-risk action within the agent's belt.")


def describe() -> dict[str, Any]:
    return {
        "effects": {
            "allow": "runs immediately",
            "approval": "waits for a person's decision",
            "deny": "never performed by an agent",
        },
        "tools": [
            {
                "name": t.name,
                "description": t.description,
                "risk": t.risk,
                "effect": t.effect,
                "parameters": t.parameters,
            }
            for t in TOOLS.values()
        ],
        "belts": {agent: sorted(tools) for agent, tools in BELTS.items()},
        "never_by_an_agent": [t.description for t in TOOLS.values() if t.risk == "reserved"],
    }
