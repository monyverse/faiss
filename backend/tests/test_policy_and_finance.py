from __future__ import annotations

import io

import pytest
from openpyxl import load_workbook

from faiss_platform import finance, policy

FIGURES = {
    "total_assets": 184250,
    "total_equity": 24860,
    "gross_loans": 112400,
    "customer_deposits": 141900,
    "net_interest_income": 14320,
    "non_interest_income": 6180,
    "operating_expenses": 11070,
    "impairment_charge": 2950,
    "profit_after_tax": 4410,
    "non_performing_loans": 12930,
    "loan_loss_provisions": 7240,
    "interest_earning_assets": 158600,
}


def twin(**assumptions):
    return {
        "financials": {k: {"value": v, "status": "unverified"} for k, v in FIGURES.items()},
        "assumptions": {k: {"value": v} for k, v in assumptions.items()},
        "currency": "KES",
        "unit": "millions",
    }


def test_agents_can_never_take_reserved_decisions():
    rights = {"creator_can_write": True, "creator_can_manage": True}
    for tool in policy.TOOLS.values():
        if tool.risk == "reserved":
            for agent in policy.BELTS:
                assert policy.evaluate(agent, tool.name, **rights).effect == policy.DENY
            assert all(tool.name not in belt for belt in policy.BELTS.values())
    assert "reserved.decide_centralisation" in policy.TOOLS


def test_policy_effects():
    rights = {"creator_can_write": True, "creator_can_manage": True}
    assert policy.evaluate("legal", "absa_document_search.deal_documents", **rights).effect == policy.ALLOW
    assert (
        policy.evaluate("supervisor", "absa_governance_approvals.submit_deliverable", **rights).effect
        == policy.APPROVAL
    )
    assert policy.evaluate("supervisor", "absa_external.share_documents", **rights).effect == policy.APPROVAL
    # outside the belt, whatever the agent was asked to do
    assert policy.evaluate("legal", "absa_governance_approvals.submit_deliverable", **rights).effect == policy.DENY
    assert policy.evaluate("financial", "absa_external.send_correspondence", **rights).effect == policy.DENY
    assert policy.evaluate("legal", "no.such.tool", **rights).effect == policy.DENY
    # an agent never holds more than the person it works for
    assert (
        policy.evaluate("legal", "absa_risk_register.record", creator_can_write=False, creator_can_manage=False).effect
        == policy.DENY
    )
    assert (
        policy.evaluate(
            "supervisor", "absa_deal_management.change_stage", creator_can_write=True, creator_can_manage=False
        ).effect
        == policy.DENY
    )
    described = policy.describe()
    assert len(described["never_by_an_agent"]) == 6 and described["belts"]["challenger"]


def test_ratios_and_valuation_are_exact():
    analysis = finance.analyse(twin(cost_of_equity=20, long_term_growth=6, offer_price=26000))
    ratios = {r["key"]: r["value"] for r in analysis["ratios"]}
    assert ratios == {
        "return_on_equity": 17.74,
        "return_on_assets": 2.39,
        "cost_to_income": 54.0,
        "net_interest_margin": 9.03,
        "npl_ratio": 11.5,
        "npl_coverage": 55.99,
        "credit_loss_ratio": 2.62,
        "loan_to_deposit": 79.21,
        "equity_to_assets": 13.49,
    }
    valuation = analysis["valuation"]
    assert valuation["justified_price_to_book"] == 0.84 and valuation["implied_equity_value"] == pytest.approx(
        (4410 - 0.06 * 24860) / 0.14, abs=0.01
    )  # 20,845.71
    assert valuation["offer"]["price_to_book"] == 1.05 and valuation["offer"]["premium_to_implied_value_pct"] == 24.7
    assert len(valuation["sensitivity"]) == 5 and len(analysis["unverified_inputs"]) == 12


def test_engine_supplies_no_assumptions_and_rejects_nonsense():
    assert finance.analyse(twin())["valuation"] == {
        "available": False,
        "missing_inputs": [],
        "missing_assumptions": ["cost_of_equity", "long_term_growth"],
    }
    assert "greater than" in finance.analyse(twin(cost_of_equity=5, long_term_growth=6))["valuation"]["error"]
    partial = finance.analyse({"financials": {"total_assets": {"value": 100}}})
    assert all(r["value"] is None for r in partial["ratios"]) and "total_equity" in partial["missing_inputs"]
    assert finance.analyse({})["inputs"] == {}


def test_workbook_has_live_formulas():
    book = load_workbook(io.BytesIO(finance.workbook("Project Baobab", twin(cost_of_equity=20, long_term_growth=6))))
    assert book.sheetnames == ["Inputs", "Ratios", "Valuation", "Sensitivity", "Notes"]
    assert book["Ratios"]["B2"].value.startswith("=Inputs!$B$") and book["Valuation"]["B2"].value.startswith("=(")
    assert "No figure in this workbook was produced by a language model" in book["Notes"]["A1"].value
    assert (
        load_workbook(io.BytesIO(finance.workbook("Empty", {})))["Valuation"]["A2"].value == "Valuation not available"
    )
