"""Deterministic financial engine for bank targets.

Models never do arithmetic here. Figures come from the Deal Twin (entered by a person or
extracted from a document and then confirmed), ratios and valuation are computed in plain
code, and every output says which inputs were unverified. The engine has no default cost of
equity or growth rate: those are judgements for the deal team, so it asks for them.
"""

from __future__ import annotations

import io
from dataclasses import dataclass
from typing import Any

from openpyxl import Workbook
from openpyxl.styles import Alignment, Font, PatternFill
from openpyxl.utils import get_column_letter

LINE_ITEMS: dict[str, str] = {
    "total_assets": "Total assets",
    "total_equity": "Total equity",
    "gross_loans": "Gross loans and advances",
    "customer_deposits": "Customer deposits",
    "net_interest_income": "Net interest income",
    "non_interest_income": "Non-interest income",
    "operating_expenses": "Operating expenses",
    "impairment_charge": "Credit impairment charge",
    "profit_after_tax": "Profit after tax",
    "non_performing_loans": "Non-performing loans",
    "loan_loss_provisions": "Loan loss provisions",
    "interest_earning_assets": "Interest-earning assets",
}
ASSUMPTIONS: dict[str, str] = {
    "cost_of_equity": "Cost of equity (%)",
    "long_term_growth": "Long-term growth (%)",
    "offer_price": "Offer price for 100% of equity (same unit as the figures)",
}
REQUIRED_FOR_VALUATION = ("cost_of_equity", "long_term_growth")


@dataclass
class Ratio:
    key: str
    label: str
    value: float | None
    unit: str  # "%" or "x"
    formula: str
    missing: list[str]
    note: str = ""


def _get(financials: dict[str, Any], key: str) -> float | None:
    entry = financials.get(key)
    if isinstance(entry, dict):
        entry = entry.get("value")
    try:
        return None if entry is None else float(entry)
    except (TypeError, ValueError):
        return None


def _div(
    financials: dict[str, Any], num: str | tuple[str, ...], den: str | tuple[str, ...]
) -> tuple[float | None, list[str]]:
    nums = (num,) if isinstance(num, str) else num
    dens = (den,) if isinstance(den, str) else den
    missing = [k for k in (*nums, *dens) if _get(financials, k) is None]
    if missing:
        return None, missing
    denominator = sum(_get(financials, k) or 0 for k in dens)
    if denominator == 0:
        return None, []
    return sum(_get(financials, k) or 0 for k in nums) / denominator, []


def ratios(financials: dict[str, Any]) -> list[Ratio]:
    out: list[Ratio] = []

    def add(key: str, label: str, num: Any, den: Any, unit: str, formula: str, note: str = "") -> None:
        value, missing = _div(financials, num, den)
        if value is not None and unit == "%":
            value *= 100
        out.append(Ratio(key, label, None if value is None else round(value, 2), unit, formula, missing, note))

    add(
        "return_on_equity",
        "Return on equity",
        "profit_after_tax",
        "total_equity",
        "%",
        "Profit after tax ÷ Total equity",
        "Period-end equity, not an average.",
    )
    add(
        "return_on_assets",
        "Return on assets",
        "profit_after_tax",
        "total_assets",
        "%",
        "Profit after tax ÷ Total assets",
    )
    add(
        "cost_to_income",
        "Cost-to-income",
        "operating_expenses",
        ("net_interest_income", "non_interest_income"),
        "%",
        "Operating expenses ÷ (Net interest income + Non-interest income)",
    )
    if _get(financials, "interest_earning_assets") is not None:
        add(
            "net_interest_margin",
            "Net interest margin",
            "net_interest_income",
            "interest_earning_assets",
            "%",
            "Net interest income ÷ Interest-earning assets",
        )
    else:
        add(
            "net_interest_margin",
            "Net interest margin (approximate)",
            "net_interest_income",
            "total_assets",
            "%",
            "Net interest income ÷ Total assets",
            "Interest-earning assets not supplied, so total assets is used; the true margin is higher.",
        )
    add(
        "npl_ratio",
        "Non-performing loan ratio",
        "non_performing_loans",
        "gross_loans",
        "%",
        "Non-performing loans ÷ Gross loans",
    )
    add(
        "npl_coverage",
        "NPL coverage",
        "loan_loss_provisions",
        "non_performing_loans",
        "%",
        "Loan loss provisions ÷ Non-performing loans",
    )
    add(
        "credit_loss_ratio",
        "Credit loss ratio",
        "impairment_charge",
        "gross_loans",
        "%",
        "Credit impairment charge ÷ Gross loans",
    )
    add(
        "loan_to_deposit", "Loan-to-deposit", "gross_loans", "customer_deposits", "%", "Gross loans ÷ Customer deposits"
    )
    add(
        "equity_to_assets",
        "Equity-to-assets",
        "total_equity",
        "total_assets",
        "%",
        "Total equity ÷ Total assets",
        "Accounting leverage; not a regulatory capital ratio.",
    )
    return out


def justified_price_to_book(roe: float, cost_of_equity: float, growth: float) -> float | None:
    """Gordon-growth justified P/B = (ROE − g) ÷ (CoE − g). Undefined unless CoE > g."""
    if cost_of_equity <= growth:
        return None
    return (roe - growth) / (cost_of_equity - growth)


def valuation(financials: dict[str, Any], assumptions: dict[str, Any]) -> dict[str, Any]:
    missing_assumptions = [k for k in REQUIRED_FOR_VALUATION if _get(assumptions, k) is None]
    equity, pat = _get(financials, "total_equity"), _get(financials, "profit_after_tax")
    missing_inputs = [k for k, v in (("total_equity", equity), ("profit_after_tax", pat)) if v is None]
    if missing_assumptions or missing_inputs or not equity:
        return {"available": False, "missing_inputs": missing_inputs, "missing_assumptions": missing_assumptions}

    coe = (_get(assumptions, "cost_of_equity") or 0) / 100
    growth = (_get(assumptions, "long_term_growth") or 0) / 100
    roe = (pat or 0) / equity
    ptb = justified_price_to_book(roe, coe, growth)
    if ptb is None:
        return {
            "available": False,
            "missing_inputs": [],
            "missing_assumptions": [],
            "error": "Cost of equity must be greater than long-term growth.",
        }

    grid = []
    for d_coe in (-0.02, -0.01, 0.0, 0.01, 0.02):
        row = {"cost_of_equity": round((coe + d_coe) * 100, 2), "values": []}
        for d_g in (-0.01, 0.0, 0.01):
            cell = justified_price_to_book(roe, coe + d_coe, growth + d_g)
            row["values"].append(
                {
                    "long_term_growth": round((growth + d_g) * 100, 2),
                    "price_to_book": None if cell is None else round(cell, 2),
                    "equity_value": None if cell is None else round(cell * equity, 2),
                }
            )
        grid.append(row)

    result: dict[str, Any] = {
        "available": True,
        "method": "Justified price-to-book (Gordon growth): (ROE − g) ÷ (CoE − g), applied to reported book equity.",
        "return_on_equity_pct": round(roe * 100, 2),
        "cost_of_equity_pct": round(coe * 100, 2),
        "long_term_growth_pct": round(growth * 100, 2),
        "justified_price_to_book": round(ptb, 2),
        "implied_equity_value": round(ptb * equity, 2),
        "implied_price_to_earnings": round(ptb / roe, 2) if roe > 0 else None,
        "sensitivity": grid,
        "limits": [
            "Single-stage model on one period's return on equity; it assumes that return is sustainable.",
            "No adjustment for excess or deficient capital, minorities, synergies or integration cost.",
            "A cross-check against comparable transactions is still needed.",
        ],
    }
    offer = _get(assumptions, "offer_price")
    if offer:
        result["offer"] = {
            "price": offer,
            "price_to_book": round(offer / equity, 2),
            "price_to_earnings": round(offer / pat, 2) if pat and pat > 0 else None,
            "premium_to_implied_value_pct": round((offer / (ptb * equity) - 1) * 100, 1),
        }
    return result


def analyse(twin: dict[str, Any]) -> dict[str, Any]:
    financials = twin.get("financials") or {}
    assumptions = twin.get("assumptions") or {}
    computed = ratios(financials)
    unverified = sorted(k for k, v in financials.items() if isinstance(v, dict) and v.get("status") != "verified")
    return {
        "currency": twin.get("currency", ""),
        "unit": twin.get("unit", ""),
        "period": twin.get("period", ""),
        "inputs": {k: financials.get(k) for k in LINE_ITEMS if k in financials},
        "missing_inputs": [k for k in LINE_ITEMS if k != "interest_earning_assets" and _get(financials, k) is None],
        "unverified_inputs": unverified,
        "ratios": [r.__dict__ for r in computed],
        "valuation": valuation(financials, assumptions),
        "assumptions": assumptions,
    }


def workbook(deal_label: str, twin: dict[str, Any]) -> bytes:
    """Valuation workbook. Ratios and the justified P/B are live formulas over the Inputs sheet,
    so an analyst can change a figure and see the effect."""
    analysis = analyse(twin)
    financials = twin.get("financials") or {}
    assumptions = twin.get("assumptions") or {}
    wb = Workbook()
    head = Font(bold=True, color="FFFFFF")
    fill = PatternFill("solid", fgColor="7A0F26")

    def header(ws: Any, titles: list[str], widths: list[int]) -> None:
        ws.append(titles)
        for i, width in enumerate(widths, start=1):
            cell = ws.cell(row=ws.max_row, column=i)
            cell.font, cell.fill, cell.alignment = head, fill, Alignment(vertical="center")
            ws.column_dimensions[get_column_letter(i)].width = width

    inputs = wb.active
    inputs.title = "Inputs"
    inputs.append([f"{deal_label} — financial inputs"])
    inputs["A1"].font = Font(bold=True, size=13)
    inputs.append(
        [
            f"Currency: {analysis['currency'] or 'not stated'}",
            f"Unit: {analysis['unit'] or 'not stated'}",
            f"Period: {analysis['period'] or 'not stated'}",
        ]
    )
    inputs.append([])
    header(inputs, ["Line item", "Value", "Status", "Source"], [38, 18, 14, 60])
    cell_of: dict[str, str] = {}
    for key, label in {**LINE_ITEMS, **ASSUMPTIONS}.items():
        entry = (financials if key in LINE_ITEMS else assumptions).get(key)
        value = entry.get("value") if isinstance(entry, dict) else entry
        status = (entry.get("status", "") if isinstance(entry, dict) else "") or (
            "assumption" if key in ASSUMPTIONS else ""
        )
        source = ""
        if isinstance(entry, dict) and isinstance(entry.get("source"), dict):
            src = entry["source"]
            source = (
                f"{src.get('document', '')} p.{src.get('page')}" if src.get("page") else str(src.get("document", ""))
            )
        inputs.append([label, value, status, source])
        cell_of[key] = f"Inputs!$B${inputs.max_row}"

    c = cell_of
    sheet = wb.create_sheet("Ratios")
    header(sheet, ["Ratio", "Value", "Formula", "Note"], [36, 14, 62, 70])
    nim_den = (
        c["interest_earning_assets"] if financials.get("interest_earning_assets") is not None else c["total_assets"]
    )
    formulas = {
        "return_on_equity": f"={c['profit_after_tax']}/{c['total_equity']}",
        "return_on_assets": f"={c['profit_after_tax']}/{c['total_assets']}",
        "cost_to_income": f"={c['operating_expenses']}/({c['net_interest_income']}+{c['non_interest_income']})",
        "net_interest_margin": f"={c['net_interest_income']}/{nim_den}",
        "npl_ratio": f"={c['non_performing_loans']}/{c['gross_loans']}",
        "npl_coverage": f"={c['loan_loss_provisions']}/{c['non_performing_loans']}",
        "credit_loss_ratio": f"={c['impairment_charge']}/{c['gross_loans']}",
        "loan_to_deposit": f"={c['gross_loans']}/{c['customer_deposits']}",
        "equity_to_assets": f"={c['total_equity']}/{c['total_assets']}",
    }
    for ratio in analysis["ratios"]:
        available = not ratio["missing"] and ratio["value"] is not None
        sheet.append(
            [
                ratio["label"],
                formulas[ratio["key"]] if available else "n/a",
                ratio["formula"],
                ratio["note"]
                or ("Missing: " + ", ".join(LINE_ITEMS[m] for m in ratio["missing"]) if ratio["missing"] else ""),
            ]
        )
        if available:
            sheet.cell(row=sheet.max_row, column=2).number_format = "0.00%"

    val = wb.create_sheet("Valuation")
    header(val, ["Measure", "Value", "Basis"], [40, 20, 80])
    result = analysis["valuation"]
    if result.get("available"):
        roe = f"({c['profit_after_tax']}/{c['total_equity']})"
        coe, growth = f"({c['cost_of_equity']}/100)", f"({c['long_term_growth']}/100)"
        val.append(["Justified price-to-book", f"=({roe}-{growth})/({coe}-{growth})", result["method"]])
        val.cell(row=val.max_row, column=2).number_format = "0.00"
        val.append(
            [
                "Implied equity value",
                f"=B{val.max_row}*{c['total_equity']}",
                "Justified price-to-book × reported book equity",
            ]
        )
        val.cell(row=val.max_row, column=2).number_format = "#,##0.00"
        if result.get("offer"):
            val.append(["Offer price-to-book", f"={c['offer_price']}/{c['total_equity']}", "Offer price ÷ book equity"])
            val.cell(row=val.max_row, column=2).number_format = "0.00"
        val.append([])
        val.append(["Limits of this method"])
        for limit in result["limits"]:
            val.append(["", "", limit])
        sens = wb.create_sheet("Sensitivity")
        growths = [v["long_term_growth"] for v in result["sensitivity"][0]["values"]]
        header(sens, ["Cost of equity % ↓ / Growth % →", *[f"{g:g}%" for g in growths]], [34, 16, 16, 16])
        for row in result["sensitivity"]:
            sens.append([f"{row['cost_of_equity']:g}%", *[v["price_to_book"] for v in row["values"]]])
        sens.append([])
        sens.append(["Justified price-to-book at each combination. Blank where cost of equity does not exceed growth."])
    else:
        missing = [
            *(LINE_ITEMS[m] for m in result.get("missing_inputs", [])),
            *(ASSUMPTIONS[m] for m in result.get("missing_assumptions", [])),
        ]
        val.append(["Valuation not available", "", result.get("error") or ("Missing: " + ", ".join(missing))])

    notes = wb.create_sheet("Notes")
    notes.column_dimensions["A"].width = 120
    notes.append(
        [
            "Generated by the FAISS deterministic financial engine. No figure in this workbook was produced by a language model."
        ]
    )
    notes.append(
        [
            "Inputs marked 'unverified' were extracted automatically or entered without confirmation; confirm them against the source before relying on any output."
        ]
    )
    if analysis["unverified_inputs"]:
        notes.append(["Unverified inputs: " + ", ".join(LINE_ITEMS.get(k, k) for k in analysis["unverified_inputs"])])
    notes.append(["Cost of equity and long-term growth are deal-team assumptions. The engine supplies no defaults."])

    buffer = io.BytesIO()
    wb.save(buffer)
    return buffer.getvalue()
