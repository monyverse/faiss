"""How the agents reason.

Every task has a deterministic baseline: what the methodology expects, what the data room
evidences, what is missing, and what the financial engine computed. The baseline never calls a
model, so the platform produces evidence-linked work with no gateway at all.

When Absa's LiteLLM gateway is configured, a model reads the same evidence and adds analysis on
top of the baseline. It can add findings that cite evidence; it cannot remove baseline gaps,
invent evidence or produce figures.
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Any

from .. import finance
from ..config import Settings
from ..gateway import CallContext, GatewayError, LiteLLMGateway
from ..knowledge import Ontology
from .specialists import Probe, Specialist

SEVERITIES = ["info", "low", "medium", "high", "critical"]
KINDS = {"finding", "risk", "gap", "request"}


@dataclass
class Evidence:
    ref: str
    citation: dict[str, Any]
    text: str


class EvidenceBook:
    """Numbers the evidence a task may cite. Nothing outside the book can be cited."""

    def __init__(self) -> None:
        self.items: dict[str, Evidence] = {}

    def add(self, citation: dict[str, Any], text: str) -> str:
        for item in self.items.values():
            if (
                item.citation.get("kind") == citation.get("kind")
                and item.citation.get("id") == citation.get("id")
                and item.text == text
            ):
                return item.ref
        ref = f"E{len(self.items) + 1}"
        self.items[ref] = Evidence(ref, citation, text)
        return ref

    def citations(self, refs: list[str]) -> list[dict[str, Any]]:
        return [{**self.items[r].citation, "ref": r} for r in refs if r in self.items]


@dataclass
class Draft:
    kind: str
    title: str
    detail: str
    severity: str = "info"
    workstream: str = "general"
    evidence: list[str] = field(default_factory=list)
    source: str = "baseline"  # baseline | model


@dataclass
class Action:
    tool: str
    args: dict[str, Any]
    summary: str


@dataclass
class Question:
    kind: str
    text: str
    fields: list[dict[str, Any]]
    blocked_on: str


@dataclass
class TaskInput:
    task: dict[str, Any]
    agent: Specialist
    deal: dict[str, Any]
    stage: dict[str, Any] | None
    book: EvidenceBook
    methodology: list[str]
    probes: list[tuple[Probe, list[str]]]
    extras: dict[str, Any]
    objective: str = ""
    goal_id: str = ""
    user_sub: str = ""


@dataclass
class TaskOutput:
    summary: str
    drafts: list[Draft] = field(default_factory=list)
    question: Question | None = None
    actions: list[Action] = field(default_factory=list)
    cost_usd: float = 0.0
    notes: list[str] = field(default_factory=list)


# --------------------------------------------------------------------------- planning


def _task(
    task_id: str, title: str, agent: str, requirement_ids: list[str], after: list[str] | None = None, **params: Any
) -> dict[str, Any]:
    return {
        "id": task_id,
        "title": title,
        "agent": agent,
        "requirement_ids": requirement_ids,
        "after": after or [],
        "params": params,
        "status": "pending",
        "summary": "",
        "blocked_on": "",
        "runs": 0,
    }


def _req(req_id: str, text: str) -> dict[str, Any]:
    return {"id": req_id, "text": text, "status": "open", "note": ""}


def classify_objective(objective: str) -> str:
    text = objective.lower()
    if re.search(
        r"dilig|\bdd\b|assess (the )?target|investment committee|valuation|evaluate (the )?(target|acquisition)|data room",
        text,
    ):
        return "diligence"
    if re.search(r"mobilis|mobiliz|first (10|ten) days|stand up|kick.?off|readiness", text):
        return "mobilisation"
    return "research"


def plan_goal(objective: str, deal: dict[str, Any], ontology: Ontology) -> dict[str, Any]:
    """Requirements the goal will be checked against, and the tasks that deliver them."""
    countries: list[str] = deal.get("countries") or []
    template = classify_objective(objective)
    if template == "diligence":
        requirements = [
            _req(
                "R1",
                "The data room has been checked against the expected document set and every gap is on the diligence request list.",
            ),
            _req(
                "R2",
                "The target's financial position is analysed with the deterministic engine and a valuation range is produced from the deal team's assumptions.",
            ),
            _req(
                "R3",
                "Each legal diligence topic is assessed against the approved methodology, with evidence or a recorded gap.",
            ),
            _req(
                "R4",
                "The regulatory position is set out, including the authorities to engage in every in-scope country.",
            ),
            _req(
                "R5",
                "Each technology diligence topic is assessed against the approved methodology, with evidence or a recorded gap.",
            ),
            _req("R6", "An evidence-linked risk register exists and has been independently challenged."),
            _req(
                "R7", "An investment committee briefing is drafted and submitted through the approved governance route."
            ),
        ]
        tasks = [
            _task("intake", "Check the data room and list what is missing", "intake", ["R1"]),
            _task("financial", "Analyse the financial position and value the target", "financial", ["R2"], ["intake"]),
            _task("legal", "Assess legal diligence topics", "legal", ["R3"], ["intake"]),
            _task("regulatory", "Assess the regulatory position", "regulatory", ["R4"], ["intake"]),
            *[
                _task(f"country-{c}", f"Set out the authorities to engage in {c}", "country", ["R4"], country=c)
                for c in countries
            ],
            _task("technology", "Assess technology diligence topics", "technology", ["R5"], ["intake"]),
        ]
        specialists = [t["id"] for t in tasks if t["id"] != "intake"]
        tasks += [
            _task("risk", "Build the risk register", "risk", ["R6"], specialists),
            _task("challenge", "Independently challenge the findings", "challenger", ["R6"], ["risk"]),
            _task(
                "briefing",
                "Draft the investment committee briefing and submit it for approval",
                "supervisor",
                ["R7"],
                ["challenge"],
                focus="briefing",
            ),
        ]
    elif template == "mobilisation":
        requirements = [
            _req("R1", "The workstreams this archetype activates are identified with their requirement level."),
            _req("R2", "The mobilisation activities are set out from the approved mobilisation roadmap."),
            _req("R3", "The governance forums to stand up are listed with chair and cadence."),
            _req("R4", "The authorities to engage are set out for every in-scope country."),
        ]
        tasks = [
            _task("workstreams", "Identify the workstreams to activate", "integration", ["R1"], focus="workstreams"),
            _task("mobilisation", "Set out the mobilisation activities", "integration", ["R2"], focus="mobilisation"),
            _task("governance", "List the governance forums to stand up", "integration", ["R3"], focus="governance"),
            *[
                _task(f"country-{c}", f"Set out the authorities to engage in {c}", "country", ["R4"], country=c)
                for c in countries
            ],
        ]
        if not countries:
            requirements = requirements[:3]
        tasks.append(
            _task("challenge", "Independently challenge the findings", "challenger", ["R1"], [t["id"] for t in tasks])
        )
    else:
        requirements = [_req("R1", "The objective is answered from the approved methodology, with citations.")]
        tasks = [_task("research", "Research the approved methodology", "integration", ["R1"], focus="research")]
        text = objective.lower()
        for key, pattern in (
            ("legal", r"legal|contract|spa\b|litigation"),
            ("regulatory", r"regulat|complian|approval|licen"),
            ("technology", r"technolog|system|cyber|data migration"),
        ):
            if re.search(pattern, text):
                tasks.append(_task(key, f"Check the data room: {key}", key, ["R1"]))
        if countries and re.search(
            r"countr|regulat|authorit|cross.?border|" + "|".join(c.lower() for c in countries), text
        ):
            requirements.append(_req("R2", "The authorities to engage are set out for every in-scope country."))
            tasks += [
                _task(f"country-{c}", f"Set out the authorities to engage in {c}", "country", ["R2"], country=c)
                for c in countries
            ]
    return {"template": template, "requirements": requirements, "tasks": tasks}


# --------------------------------------------------------------------------- baselines


def _severity_at_least(severity: str, floor: str) -> bool:
    return SEVERITIES.index(severity) >= SEVERITIES.index(floor)


def _fmt(value: float | None, unit: str) -> str:
    if value is None:
        return "not available"
    return f"{value:,.2f}{unit}" if unit == "%" else f"{value:,.2f}x"


def _baseline_intake(i: TaskInput) -> TaskOutput:
    docs: list[dict[str, Any]] = i.extras.get("documents", [])
    missing: list[tuple[str, str]] = i.extras.get("missing", [])
    anchor = i.methodology[:1]
    drafts: list[Draft] = []
    if docs:
        by_type: dict[str, list[str]] = {}
        for d in docs:
            by_type.setdefault(d["doc_type"], []).append(d["filename"])
        lines = [f"- {doc_type.replace('_', ' ')}: {', '.join(names)}" for doc_type, names in sorted(by_type.items())]
        drafts.append(
            Draft(
                "finding",
                f"Data room inventory: {len(docs)} document{'s' if len(docs) != 1 else ''}",
                "\n".join(lines),
                "info",
                "general",
                [d["ref"] for d in docs][:8] + anchor,
            )
        )
    for d in docs:
        if d["status"] != "processed":
            drafts.append(
                Draft(
                    "gap",
                    f"Cannot be searched: {d['filename']}",
                    d.get("note") or "The file is stored but its text could not be read.",
                    "low",
                    "general",
                    [d["ref"]],
                )
            )
    for key, label in missing:
        severity = "high" if key == "financial_statements" else "medium"
        drafts.append(
            Draft(
                "gap",
                f"Not in the data room: {label}",
                "No document of this type has been uploaded to the deal.",
                severity,
                "general",
                anchor,
            )
        )
        drafts.append(
            Draft(
                "request",
                f"Request from the counterparty: {label}",
                "Add to the diligence request list.",
                "info",
                "general",
                anchor,
            )
        )
    summary = f"{len(docs)} document(s) in the data room; {len(missing)} expected document type(s) missing."
    return TaskOutput(summary, drafts)


def _baseline_financial(i: TaskInput) -> TaskOutput:
    analysis: dict[str, Any] = i.extras["analysis"]
    fact_refs: list[str] = i.extras.get("fact_refs", [])
    anchor = i.methodology[:1]
    ws = i.agent.workstream or "general"
    inputs = analysis["inputs"]
    if not inputs:
        return TaskOutput(
            "No financial figures are recorded for the target yet.",
            [
                Draft(
                    "gap",
                    "No financial figures recorded for the target",
                    "Upload the audited financial statements or enter the headline figures so the engine can run.",
                    "high",
                    ws,
                    anchor,
                )
            ],
            Question(
                "financial_inputs",
                "I need the target's headline figures to analyse its financial position. Upload its financial statements to the deal, or enter the figures here.",
                [
                    {"key": k, "label": v, "type": "number"}
                    for k, v in finance.LINE_ITEMS.items()
                    if k != "interest_earning_assets"
                ],
                "financial_inputs",
            ),
        )
    drafts: list[Draft] = []
    evidence = fact_refs + anchor
    unit = " ".join(x for x in (analysis.get("currency"), analysis.get("unit")) if x)
    lines = [
        f"- {r['label']}: {_fmt(r['value'], '%')} ({r['formula']}){' — ' + r['note'] if r['note'] else ''}"
        for r in analysis["ratios"]
        if r["value"] is not None
    ]
    if lines:
        drafts.append(
            Draft(
                "finding",
                "Financial ratios (deterministic engine)",
                "\n".join(lines) + (f"\nFigures as reported, {unit}." if unit else ""),
                "info",
                ws,
                evidence,
            )
        )
    if analysis["missing_inputs"]:
        labels = ", ".join(finance.LINE_ITEMS[k] for k in analysis["missing_inputs"])
        drafts.append(
            Draft("gap", "Figures missing for the full ratio set", f"Not recorded: {labels}.", "low", ws, anchor)
        )
    if analysis["unverified_inputs"]:
        labels = ", ".join(finance.LINE_ITEMS.get(k, k) for k in analysis["unverified_inputs"])
        drafts.append(
            Draft(
                "finding",
                f"{len(analysis['unverified_inputs'])} figure(s) were extracted automatically and are unverified",
                f"Confirm against the source before relying on the analysis: {labels}.",
                "medium",
                ws,
                evidence,
            )
        )

    valuation = analysis["valuation"]
    question = None
    if valuation.get("available"):
        detail = [
            f"- Method: {valuation['method']}",
            f"- Return on equity {valuation['return_on_equity_pct']}%, cost of equity {valuation['cost_of_equity_pct']}%, long-term growth {valuation['long_term_growth_pct']}%",
            f"- Justified price-to-book: {valuation['justified_price_to_book']}x; implied equity value: {valuation['implied_equity_value']:,.2f}",
        ]
        grid = [
            v["price_to_book"]
            for row in valuation["sensitivity"]
            for v in row["values"]
            if v["price_to_book"] is not None
        ]
        if grid:
            detail.append(f"- Sensitivity (cost of equity ±2 points, growth ±1 point): {min(grid)}x to {max(grid)}x")
        if valuation.get("offer"):
            offer = valuation["offer"]
            detail.append(
                f"- Offer of {offer['price']:,.2f} = {offer['price_to_book']}x book, {offer['premium_to_implied_value_pct']:+}% against the implied value"
            )
        detail += [f"- Limit: {limit}" for limit in valuation["limits"]]
        drafts.append(
            Draft("finding", "Valuation range (deterministic engine)", "\n".join(detail), "info", ws, evidence)
        )
        summary = f"Ratios computed; justified price-to-book {valuation['justified_price_to_book']}x."
    elif valuation.get("missing_assumptions"):
        question = Question(
            "valuation_assumptions",
            "The ratios are done. To value the target I need the deal team's cost of equity and long-term growth rate. These are your judgements, so I do not assume them.",
            [
                {"key": "cost_of_equity", "label": "Cost of equity (%)", "type": "percent"},
                {"key": "long_term_growth", "label": "Long-term growth (%)", "type": "percent"},
                {
                    "key": "offer_price",
                    "label": "Offer price for 100% of equity (optional)",
                    "type": "number",
                    "optional": True,
                },
            ],
            "assumptions",
        )
        summary = "Ratios computed; valuation is waiting for the deal team's assumptions."
    else:
        reason = valuation.get("error") or "Total equity and profit after tax are both required."
        drafts.append(Draft("gap", "Valuation could not be produced", reason, "medium", ws, anchor))
        summary = "Ratios computed; valuation could not be produced."
    return TaskOutput(summary, drafts, question)


def _baseline_probes(i: TaskInput) -> TaskOutput:
    ws, label = i.agent.workstream or "general", i.agent.workstream_label
    drafts: list[Draft] = []
    stage = (i.stage or {}).get("title", "the current stage")
    if i.methodology:
        expects = "\n".join(f"- {i.book.items[r].citation['title']}" for r in i.methodology)
        drafts.append(
            Draft(
                "finding",
                f"Approved methodology used for {label} at {stage}",
                f"This assessment was made against these parts of the approved methodology:\n{expects}",
                "info",
                ws,
                list(i.methodology),
            )
        )
    evidenced = 0
    for probe, refs in i.probes:
        if refs:
            evidenced += 1
            sources = sorted({i.book.items[r].citation["title"] for r in refs})
            drafts.append(
                Draft(
                    "finding",
                    f"{probe.topic}: evidence in the data room",
                    f"Relevant material found in: {', '.join(sources)}. Review the cited passages; this confirms the topic is covered, not that it is clean.",
                    "info",
                    ws,
                    refs,
                )
            )
        else:
            drafts.append(
                Draft(
                    "gap",
                    f"{probe.topic}: no evidence in the data room",
                    "Nothing in the uploaded documents addresses this topic. Until it is evidenced, treat it as unassessed.",
                    probe.severity,
                    ws,
                    i.methodology[:1],
                )
            )
            drafts.append(
                Draft(
                    "request",
                    f"Request from the counterparty: {probe.topic.lower()}",
                    "Add to the diligence request list.",
                    "info",
                    ws,
                    i.methodology[:1],
                )
            )
    total = len(i.probes)
    return TaskOutput(
        f"{evidenced} of {total} {label} topics have evidence in the data room; {total - evidenced} recorded as gaps.",
        drafts,
    )


def _baseline_country(i: TaskInput) -> TaskOutput:
    iso = i.task["params"].get("country", "")
    pack = i.extras.get("pack")
    ws = i.agent.workstream or "general"
    if not pack:
        return TaskOutput(
            f"No country pack exists for {iso}.",
            [
                Draft(
                    "gap",
                    f"No country intelligence pack for {iso}",
                    "The authorities and regional bodies for this country have not been catalogued. Compliance and Legal must set them out.",
                    "medium",
                    ws,
                    i.methodology[:1],
                )
            ],
        )
    ref = i.extras["pack_ref"]
    authorities = pack["authorities"]
    lines = [
        f"- Banking supervisor: {authorities['banking_supervisor']}",
        f"- Competition: {authorities['competition']}",
        f"- Securities and markets: {authorities['securities_and_markets']}",
        *[f"- Other: {x}" for x in authorities["other"]],
        *[f"- Regional body: {x}" for x in pack["regional_competition_bodies"]],
        f"- Regional blocs: {', '.join(pack['regional_blocs'])}",
        f"- Absa presence: {pack['absa_presence']}",
        "",
        f"Caveat: {pack['caveat']}",
    ]
    questions = "\n".join(f"- {q}" for q in pack["questions_to_resolve"])
    return TaskOutput(
        f"Authorities to engage in {pack['name']} set out from the country pack (unverified).",
        [
            Draft(
                "finding",
                f"Authorities to engage — {pack['name']}",
                "\n".join(lines),
                "info",
                ws,
                [ref, *i.methodology[:1]],
            ),
            Draft("request", f"Compliance and Legal to resolve for {pack['name']}", questions, "info", ws, [ref]),
        ],
    )


def _baseline_risk(i: TaskInput) -> TaskOutput:
    items: list[dict[str, Any]] = i.extras.get("open_items", [])
    drafts: list[Draft] = []
    for item in items:
        if not _severity_at_least(item["severity"], "medium"):
            continue
        refs = item["refs"] or i.methodology[:1]
        if item["kind"] == "gap":
            title = f"Unassessed: {item['title'].split(':')[0]}"
            detail = f"{item['title']}. {item['detail']} Owner to be named by the {item['workstream_label']} workstream lead."
        else:
            title = item["title"]
            detail = f"{item['detail']} Raised by the {item['workstream_label']} assessment."
        drafts.append(Draft("risk", title, detail, item["severity"], item["workstream"], refs))
    if not drafts:
        drafts.append(
            Draft(
                "finding",
                "No medium or higher items to register",
                "The specialist assessments produced no item at medium severity or above.",
                "info",
                i.agent.workstream or "general",
                i.methodology[:1],
            )
        )
    high = sum(1 for d in drafts if d.kind == "risk" and _severity_at_least(d.severity, "high"))
    return TaskOutput(
        f"{sum(1 for d in drafts if d.kind == 'risk')} risk(s) registered, {high} high or critical.", drafts
    )


def _baseline_challenge(i: TaskInput) -> TaskOutput:
    findings: list[dict[str, Any]] = i.extras.get("findings", [])
    anchor = i.methodology[:1]
    ws = i.agent.workstream or "general"
    drafts: list[Draft] = []
    material = [
        f
        for f in findings
        if f["status"] == "draft" and f["kind"] in {"risk", "finding"} and _severity_at_least(f["severity"], "medium")
    ]
    if material:
        titles = "\n".join(f"- {f['title']}" for f in material[:12])
        drafts.append(
            Draft(
                "finding",
                f"Challenge: {len(material)} material item(s) have not been validated by a person",
                f"These were produced by agents and are still drafts. They should not go to a committee as fact until an accountable person validates them:\n{titles}",
                "medium",
                ws,
                anchor,
            )
        )
    gaps = [f for f in findings if f["kind"] == "gap" and _severity_at_least(f["severity"], "medium")]
    if gaps:
        drafts.append(
            Draft(
                "finding",
                f"Challenge: {len(gaps)} open gap(s) make the conclusions provisional",
                "Topics with no evidence are unassessed, not clear. The briefing must say so.",
                "medium",
                ws,
                anchor,
            )
        )
    unverified = i.extras.get("unverified_inputs", [])
    if unverified:
        drafts.append(
            Draft(
                "finding",
                "Challenge: the financial analysis rests on unverified figures",
                f"{len(unverified)} input(s) were extracted automatically and not confirmed against the source.",
                "medium",
                ws,
                anchor,
            )
        )
    if i.extras.get("unverified_countries"):
        drafts.append(
            Draft(
                "finding",
                "Challenge: country reference data is unverified",
                f"The country packs for {', '.join(i.extras['unverified_countries'])} are seed data and have not been confirmed against regulator sources.",
                "low",
                ws,
                anchor,
            )
        )
    if not drafts:
        drafts.append(
            Draft(
                "finding",
                "Independent challenge raised no points",
                "No unvalidated material items, open gaps or unverified inputs were found.",
                "info",
                ws,
                anchor,
            )
        )
    return TaskOutput(f"{len(drafts)} challenge point(s) raised.", drafts)


def _baseline_integration(i: TaskInput) -> TaskOutput:
    focus = i.task["params"].get("focus", "research")
    refs = list(i.methodology)
    if focus == "workstreams":
        groups: dict[str, list[str]] = {}
        for w in i.extras.get("workstream_requirements", []):
            label = w["workstream"] + (f" — {w['reason']}" if w.get("reason") else "")
            groups.setdefault(w["requirement"], []).append(label)
        lines = [
            f"{name.replace('-', ' ').title()}:\n" + "\n".join(f"- {x}" for x in groups[name])
            for name in ("necessary", "conditional", "optional", "not-required")
            if groups.get(name)
        ]
        detail = (
            "\n\n".join(lines)
            + "\n\nWhether any of these is delivered centrally or regionally is a decision for accountable people using the three-question centralisation test; it is not inferred here."
        )
        return TaskOutput(
            f"{len(groups.get('necessary', []))} necessary and {len(groups.get('conditional', []))} conditional workstreams for this archetype.",
            [Draft("finding", "Workstreams this archetype activates", detail, "info", "general", refs)],
        )
    if focus == "governance":
        forums = i.extras.get("forums", [])
        lines = [
            f"- {f['name']} ({f['kind']}): chair {f['chair']}; {f['cadence']}; {f['decisionType']}" for f in forums
        ]
        return TaskOutput(
            f"{len(forums)} governance forums listed.",
            [Draft("finding", "Governance forums to stand up", "\n".join(lines), "info", "general", refs)],
        )
    quotes = "\n\n".join(f"{i.book.items[r].citation['title']}\n{i.book.items[r].text}" for r in refs[:4])
    title = (
        "Mobilisation activities from the approved roadmap"
        if focus == "mobilisation"
        else "What the approved methodology says"
    )
    if not refs:
        return TaskOutput("The approved methodology does not cover this.", [])
    return TaskOutput(
        f"{len(refs)} relevant passage(s) found in the approved methodology.",
        [Draft("finding", title, quotes, "info", "general", refs)],
    )


def build_briefing(i: TaskInput) -> str:
    deal, findings, analysis = i.deal, i.extras.get("findings", []), i.extras.get("analysis") or {}
    by_kind: dict[str, list[dict[str, Any]]] = {}
    for f in findings:
        by_kind.setdefault(f["kind"], []).append(f)
    risks = sorted(by_kind.get("risk", []), key=lambda f: -SEVERITIES.index(f["severity"]))
    gaps = sorted(by_kind.get("gap", []), key=lambda f: -SEVERITIES.index(f["severity"]))
    out = [
        f"# Investment committee briefing — {deal['code_name']}",
        "",
        "> Draft prepared by FAISS agents from evidence in the deal workspace. It is not a recommendation to approve. Items marked draft have not been validated by a person.",
        "",
        "## Transaction",
        f"- Archetype: {deal['archetype_name']}",
        f"- Lifecycle stage: {(i.stage or {}).get('title', 'not set')}",
        f"- Countries in scope: {', '.join(deal['countries']) or 'not set'}",
        f"- Target: {deal['target_name'] or 'not recorded'}",
        "",
        "## Financial position",
    ]
    ratios = [r for r in analysis.get("ratios", []) if r["value"] is not None]
    out += [f"- {r['label']}: {_fmt(r['value'], '%')}" for r in ratios] or ["- No financial figures recorded."]
    valuation = analysis.get("valuation") or {}
    if valuation.get("available"):
        out.append(
            f"- Justified price-to-book {valuation['justified_price_to_book']}x; implied equity value {valuation['implied_equity_value']:,.2f} (cost of equity {valuation['cost_of_equity_pct']}%, growth {valuation['long_term_growth_pct']}%)"
        )
    else:
        out.append("- Valuation: not available.")
    if analysis.get("unverified_inputs"):
        out.append(f"- {len(analysis['unverified_inputs'])} input figure(s) are unverified.")
    out += ["", "## Key risks"]
    out += [f"- [{r['severity']}] {r['title']} ({r['workstream_label']}; {r['status']})" for r in risks[:15]] or [
        "- None registered."
    ]
    out += ["", "## Open diligence gaps"]
    out += [f"- [{g['severity']}] {g['title']}" for g in gaps[:20]] or ["- None recorded."]
    out += ["", "## Regulatory path"]
    authorities = [f for f in by_kind.get("finding", []) if f["title"].startswith("Authorities to engage")]
    out += [f"- {f['title']}" for f in authorities] or ["- Not yet set out."]
    out.append("- Country reference data is unverified seed data until Compliance confirms it.")
    challenges = [f for f in by_kind.get("finding", []) if f["title"].startswith("Challenge:")]
    out += ["", "## Independent challenge"]
    out += [f"- {c['title'].removeprefix('Challenge: ')}" for c in challenges] or ["- No points raised."]
    out += [
        "",
        "## Decision required",
        "This briefing asks the forum to consider the evidence above. The decision to proceed, and on what terms, rests with the authorised decision-makers.",
        "",
        f"Evidence base: {len(findings)} recorded item(s), each linked to its source in the deal workspace.",
    ]
    return "\n".join(out)


def _baseline_supervisor(i: TaskInput) -> TaskOutput:
    markdown = build_briefing(i)
    title = f"Investment committee briefing — {i.deal['code_name']}"
    return TaskOutput(
        "Briefing drafted; submission to the committee needs a person's approval.",
        [
            Draft(
                "finding",
                "Investment committee briefing drafted",
                "The briefing is stored on the deal as a draft. It draws only on recorded, evidence-linked items.",
                "info",
                "general",
                i.methodology[:2],
            )
        ],
        actions=[
            Action(
                "absa_workstream_management.draft_deliverable",
                {"title": title, "markdown": markdown},
                "Store the briefing draft on the deal",
            ),
            Action(
                "absa_governance_approvals.submit_deliverable",
                {"forum": "Internal SteerCo", "title": title},
                f"Submit '{title}' to the Internal SteerCo",
            ),
        ],
    )


_BASELINES = {
    "intake": _baseline_intake,
    "financial": _baseline_financial,
    "legal": _baseline_probes,
    "regulatory": _baseline_probes,
    "technology": _baseline_probes,
    "country": _baseline_country,
    "risk": _baseline_risk,
    "challenger": _baseline_challenge,
    "integration": _baseline_integration,
    "supervisor": _baseline_supervisor,
}


def baseline(i: TaskInput) -> TaskOutput:
    return _BASELINES[i.agent.key](i)


def check_requirements(
    requirements: list[dict[str, Any]], tasks: list[dict[str, Any]], evidenced_tasks: set[str]
) -> dict[str, Any]:
    """Requirement-by-requirement completion check. A requirement is met only when every task
    that serves it finished and left evidence-linked work behind."""
    checks = []
    for req in requirements:
        linked = [t for t in tasks if req["id"] in t["requirement_ids"]]
        unfinished = [t["title"] for t in linked if t["status"] != "done"]
        unevidenced = [t["title"] for t in linked if t["status"] == "done" and t["id"] not in evidenced_tasks]
        if not linked:
            met, note = False, "No task served this requirement."
        elif unfinished:
            met, note = False, "Not finished: " + "; ".join(unfinished)
        elif unevidenced:
            met, note = False, "Finished without evidence-linked output: " + "; ".join(unevidenced)
        else:
            met, note = True, f"{len(linked)} task(s) finished with evidence-linked output."
        checks.append({"id": req["id"], "text": req["text"], "met": met, "note": note})
    met_count = sum(1 for c in checks if c["met"])
    status = "verified" if met_count == len(checks) else ("partially_met" if met_count else "unmet")
    return {"status": status, "checks": checks}


# --------------------------------------------------------------------------- reasoners


def extractive_answer(question: str, evidence: list[Evidence]) -> str:
    if not evidence:
        return "I could not find anything in the approved methodology or this deal's documents that answers that. I will not guess; try rephrasing, or ask the Central Hub."
    parts = [
        "Here is what the approved material says. I am running without a language model, so these are the most relevant passages rather than a written answer.\n"
    ]
    for n, item in enumerate(evidence[:4], start=1):
        text = item.text if len(item.text) <= 700 else item.text[:700].rsplit(" ", 1)[0] + " …"
        parts.append(f"**{item.citation['title']}** [{n}]\n{text}\n")
    return "\n".join(parts)


class Reasoner:
    """Baseline-only reasoning. Used when no gateway is configured and as the fallback."""

    mode = "offline"

    async def assess(self, i: TaskInput) -> TaskOutput:
        return baseline(i)

    async def answer(
        self,
        question: str,
        evidence: list[Evidence],
        history: list[dict[str, str]],
        context: CallContext,
        deal_note: str = "",
    ) -> tuple[str, float]:
        return extractive_answer(question, evidence), 0.0

    async def stream_answer(
        self,
        question: str,
        evidence: list[Evidence],
        history: list[dict[str, str]],
        context: CallContext,
        deal_note: str = "",
    ):
        yield extractive_answer(question, evidence)

    async def refine_briefing(self, markdown: str, context: CallContext) -> tuple[str, float]:
        return markdown, 0.0


_ANALYSE = {"legal", "regulatory", "technology", "country", "risk", "challenger", "integration"}


def _evidence_block(book: EvidenceBook, refs: list[str] | None = None, limit: int = 900) -> str:
    items = [book.items[r] for r in refs if r in book.items] if refs is not None else list(book.items.values())
    return "\n\n".join(f"[{e.ref}] {e.citation.get('title', '')}\n{e.text[:limit]}" for e in items)


class GatewayReasoner(Reasoner):
    """Adds model analysis, through Absa's LiteLLM gateway, on top of the baseline."""

    mode = "gateway"

    def __init__(self, gateway: LiteLLMGateway, settings: Settings) -> None:
        self.gateway, self.settings = gateway, settings

    async def assess(self, i: TaskInput) -> TaskOutput:
        out = baseline(i)
        if i.agent.key not in _ANALYSE or not i.book.items:
            return out
        baseline_lines = "\n".join(f"- [{d.kind}/{d.severity}] {d.title}" for d in out.drafts)
        prompt = (
            f"Goal objective: {i.objective}\nYour task: {i.task['title']}\n"
            f"Deal: {i.deal['archetype_name']}, stage {(i.stage or {}).get('title', 'not set')}, countries {', '.join(i.deal['countries']) or 'not set'}.\n\n"
            f"Already recorded by the deterministic baseline (do not repeat):\n{baseline_lines or '- nothing'}\n\n"
            f"Evidence you may cite:\n{_evidence_block(i.book)}\n\n"
            "Add only what the evidence supports and the baseline missed: specific risks, inconsistencies between documents and the methodology, "
            "or points a deal team should act on. Reply with JSON only:\n"
            '{"summary": "two sentences on what you concluded", "findings": [{"kind": "finding|risk|gap", "title": "...", "detail": "...", '
            '"severity": "info|low|medium|high|critical", "evidence": ["E1"]}]}\nAt most six findings. An empty list is a good answer when the baseline is complete.'
        )
        context = CallContext(
            "agent-task", deal_id=i.deal["id"], goal_id=i.goal_id, agent=i.agent.key, user_sub=i.user_sub
        )
        try:
            reply, cost = await self.gateway.chat_json(
                [{"role": "system", "content": i.agent.system_prompt()}, {"role": "user", "content": prompt}],
                model=self.settings.model_reasoning,
                context=context,
            )
        except GatewayError as exc:
            out.notes.append(f"Model analysis unavailable ({exc}); baseline only.")
            return out
        out.cost_usd += cost
        for raw in (reply.get("findings") or [])[:6]:
            if not isinstance(raw, dict):
                continue
            out.drafts.append(
                Draft(
                    kind=str(raw.get("kind", "finding")),
                    title=str(raw.get("title", "")).strip()[:280],
                    detail=str(raw.get("detail", "")).strip(),
                    severity=str(raw.get("severity", "info")),
                    workstream=i.agent.workstream or "general",
                    evidence=[str(r) for r in raw.get("evidence") or [] if isinstance(r, str)],
                    source="model",
                )
            )
        if isinstance(reply.get("summary"), str) and reply["summary"].strip():
            out.summary = f"{out.summary} {reply['summary'].strip()}"
        return out

    def _answer_messages(
        self, question: str, evidence: list[Evidence], history: list[dict[str, str]], deal_note: str
    ) -> list[dict[str, str]]:
        sources = "\n\n".join(f"[{n}] {e.citation['title']}\n{e.text[:1400]}" for n, e in enumerate(evidence, start=1))
        system = (
            "You are FAISS, Absa's M&A intelligence assistant for African banking transactions.\n"
            "Answer only from the numbered sources. Cite them inline as [1], [2]. If the sources do not answer the question, say so plainly and say what is missing.\n"
            "The approved Absa methodology is authoritative: quote it accurately and do not extend it. Sources marked as deal documents are confidential to this deal.\n"
            "You never approve, commit or decide on the bank's behalf; say which person or forum decides. Country reference data is unverified seed data unless stated.\n"
            "Be direct and brief. Use plain paragraphs or short lists."
        )
        return [
            {"role": "system", "content": system},
            *history[-6:],
            {"role": "user", "content": f"{deal_note}\nSources:\n{sources}\n\nQuestion: {question}"},
        ]

    async def answer(
        self,
        question: str,
        evidence: list[Evidence],
        history: list[dict[str, str]],
        context: CallContext,
        deal_note: str = "",
    ) -> tuple[str, float]:
        if not evidence:
            return extractive_answer(question, evidence), 0.0
        try:
            completion = await self.gateway.chat(
                self._answer_messages(question, evidence, history, deal_note),
                model=self.settings.model_reasoning,
                context=context,
            )
        except GatewayError as exc:
            return (
                f"The model gateway is unavailable ({exc}). Showing the most relevant approved passages instead.\n\n"
                + extractive_answer(question, evidence),
                0.0,
            )
        return completion.text, completion.cost_usd

    async def stream_answer(
        self,
        question: str,
        evidence: list[Evidence],
        history: list[dict[str, str]],
        context: CallContext,
        deal_note: str = "",
    ):
        if not evidence:
            yield extractive_answer(question, evidence)
            return
        sent = False
        try:
            async for delta in self.gateway.stream(
                self._answer_messages(question, evidence, history, deal_note),
                model=self.settings.model_reasoning,
                context=context,
            ):
                sent = True
                yield delta
        except GatewayError as exc:
            if sent:
                yield "\n\n_The model gateway dropped the connection before the answer finished._"
            else:
                yield (
                    f"The model gateway is unavailable ({exc}). Showing the most relevant approved passages instead.\n\n"
                    + extractive_answer(question, evidence)
                )

    async def refine_briefing(self, markdown: str, context: CallContext) -> tuple[str, float]:
        prompt = (
            "Below is a draft investment committee briefing assembled from evidence-linked findings. Write an 'Executive summary' section of at most 150 words "
            "that tells the committee what matters most. Use only what the draft says. Do not recommend approval or rejection. Reply with the summary text only.\n\n"
            + markdown
        )
        try:
            completion = await self.gateway.chat(
                [{"role": "user", "content": prompt}],
                model=self.settings.model_reasoning,
                context=context,
                max_tokens=500,
            )
        except GatewayError:
            return markdown, 0.0
        head, sep, rest = markdown.partition("\n## Transaction")
        return f"{head}\n## Executive summary\n{completion.text.strip()}\n{sep}{rest}", completion.cost_usd


_reasoner: Reasoner | None = None


def get_reasoner() -> Reasoner:
    global _reasoner
    if _reasoner is None:
        from ..config import get_settings
        from ..gateway import get_gateway

        settings = get_settings()
        _reasoner = Reasoner() if settings.offline else GatewayReasoner(get_gateway(), settings)
    return _reasoner


def set_reasoner(reasoner: Reasoner | None) -> None:
    global _reasoner
    _reasoner = reasoner
