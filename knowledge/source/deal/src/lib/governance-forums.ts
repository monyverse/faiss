/** Terms of Reference for the six core M&A governance forums. */
export type ForumKind = "internal" | "joint";

export interface GovernanceForum {
  id: string;
  index: number;
  name: string;
  short: string;
  kind: ForumKind;
  objective: string;
  chair: string;
  facilitator: string;
  cadence: string;
  decisionType: string;
  attendees: string;
  inputs: string;
  agenda: string[];
  outputs: string[];
  success: string[];
  remedial: string[];
}

export const GOVERNANCE_FORUMS: [GovernanceForum, ...GovernanceForum[]] = [
  {
    id: "workstream-sessions",
    index: 1,
    name: "Workstream Sessions",
    short: "Workstream Sessions",
    kind: "internal",
    objective:
      "Align on key RAIDs within the workstream, and items for escalation to the Transaction Working Group",
    chair: "Workstream Accountable Exec",
    facilitator: "Workstream Lead",
    cadence: "Weekly, 60 minutes",
    decisionType: "Decision making (WS Level items)",
    attendees: "Workstream AE, Workstream Lead, Workstream PM (as applicable)",
    inputs: "Workstream L2 Plan, Workstream level RAID log",
    agenda: [
      "Overview of L2 plan, and progress against activities",
      "Review of workstream RAID log, assessment of each item",
      "Agreement on items for escalation and key dependencies",
      "Agreement on where workstream needs support, and items for AE to take away",
    ],
    outputs: ["Workstream Status Report"],
    success: [
      "Continuously updated workstream-level RAID Log",
      "Detailed L2 plan tracked consistently",
      "alignment of which RIAD items must be escalated",
      "clear mitigation plans for critical items and escalation paths",
    ],
    remedial: [
      "Rebuild or rebaseline the L2 plan where activities, dependencies, milestones or ownership are incomplete or no longer credible",
      "Review overdue and off-track activities individually, agreeing recovery actions and revised delivery dates",
      "Define clear thresholds for which RAID items should be managed within the workstream and which require escalation",
      "Assign a named owner, target date and escalation route to every critical RAID item",
      "Hold targeted working sessions for critical issues that cannot be resolved within the regular workstream meeting",
      "Increase the frequency of progress reviews temporarily where the workstream is materially behind plan or carrying significant unresolved risk",
    ],
  },
  {
    id: "transaction-working-group",
    index: 2,
    name: "Absa Transaction Working Group",
    short: "Transaction Working Group",
    kind: "internal",
    objective:
      "To provide visibility of workstream progress, elevating any risks, issues and dependencies to the PMO",
    chair: "Transaction Director",
    facilitator: "Programme Manager",
    cadence: "Weekly, 90 mins",
    decisionType: "Information",
    attendees: "Workstream leads / PMs, Central Hub",
    inputs: "Weekly WorkstreamStatus Updates",
    agenda: [
      "Overview of progress to date and feedback from SteerCo",
      "Workstream level progress update",
      "Risk, issue and dependency management",
    ],
    outputs: ["Key RAIDs for further discussion"],
    success: [
      "Workstreams arrive at the meeting prepared, with filled out status updates",
      "Cross-workstream discussion happens in the session where dependencies exist",
      "Workstreams ask questions of each other, with minimal central hub input",
    ],
    remedial: [
      "Ask for workstream lead / PM contact details to be included on the status reports, and call them directly if not up to standard",
      "Escalate to AEs where traction is not being seen",
      "Request status reports are signed off by AEs before submission to drive accountability",
    ],
  },
  {
    id: "internal-pmo",
    index: 3,
    name: "Absa Internal PMO",
    short: "Internal PMO",
    kind: "internal",
    objective: "Identify programme-level risks or issues or decisions which must be escalated",
    chair: "Absa Transaction Director",
    facilitator: "Programme Manager",
    cadence: "Weekly, 60 minutes",
    decisionType: "Decision making (items for escalation)",
    attendees: "Absa Central Hub PMO",
    inputs: "Key RAIDs from Transaction Working Group",
    agenda: [
      "Overview of progress against plan",
      "Workstream-by-workstream discussion of key RAIDs",
      "Agreement on RAIDs for escalation",
    ],
    outputs: ["Key RAIDs for escalation to Internal SteerCo or Joint PMO"],
    success: [
      "Clear view of key RAIDs established ahead of the meeting",
      "Alignment within the PMO on what the critical issues are",
      "Clear view of next steps for remediation of issues",
      "Minimal ambiguity around RAID impact",
    ],
    remedial: [
      "Require every material RAID to state its impact, owner, proposed remediation, target date and decision or support required",
      "Use a pre-meeting PMO alignment session to resolve differences in the assessment or prioritisation of critical issues",
      "Escalate overdue or repeatedly unresolved RAIDs to the Programme Manager and relevant workstream lead",
      "Assign a named owner and deadline to every remedial action before the meeting closes",
    ],
  },
  {
    id: "joint-pmo",
    index: 4,
    name: "Joint PMO",
    short: "Joint PMO",
    kind: "joint",
    objective:
      "To provide day to day management of programme planning, execution, and issue resolution between Counterparty and Absa",
    chair: "Absa Transaction Director, Counterparty Transaction Director",
    facilitator: "Absa & Counterparty Programme Managers",
    cadence: "Weekly, 60 mins",
    decisionType: "Decision making (items for escalation)",
    attendees: "Counterparty PMO / Absa Central Hub PMO",
    inputs: "Key RAIDs identified in Absa Internal PMO meeting",
    agenda: [
      "Upcoming and missed milestones",
      "Risks, Issues, blockers and Dependencies",
      "Ad hoc topics",
      "Data requests",
    ],
    outputs: ["Key joint RAIDs for escalation to Joint SteerCo"],
    success: [
      "Close collaboration across parties",
      "Willingness across both parties to be flexible to suit the transaction",
      "Problems solved in the session, rather than \u2018taken away\u2019",
    ],
    remedial: [
      "Reinforce shared transaction outcomes, roles and expected behaviours where collaboration becomes fragmented or entity-led",
      "Require issues raised at the meeting to include a recommended resolution, accountable owner and deadline",
      "Review whether meeting membership, delegated authority or ways of working are preventing decisions from being made in the session",
      "Arrange targeted working sessions for recurring issues requiring deeper cross-party resolution",
    ],
  },
  {
    id: "internal-steerco",
    index: 5,
    name: "Absa Internal SteerCo",
    short: "Internal SteerCo",
    kind: "internal",
    objective:
      "To provide the executive leadership with a programme update, ExCo leads to speak to risks and issues where required",
    chair: "Absa Executive Sponsor",
    facilitator: "Absa Transaction Director",
    cadence: "Fortnightly, 90 mins",
    decisionType: "Make decisions on transaction critical items, even if not usually in their remit under BAU (e.g., budget, resourcing)",
    attendees: "Absa Workstream Executives, TD, Prog. Manager, AE",
    inputs: "Joint SteerCo Pack + Ad Hoc Materials",
    agenda: [
      "Programme update",
      "Progress against the plan and budget",
      "Risks, Issues and Dependencies",
      "Absa internal decisions",
    ],
    outputs: ["Items to focus on at Joint SteerCo", "Internal Absa decisions"],
    success: [
      "Decisions made in the room, based on materials provided",
      "Deep engagement, questioning, and challenge from members",
      "Cross-functional collaboration of executives to support decision making",
      "Prioritised in busy diaries",
    ],
    remedial: [
      "Contact members who are not engaging or attending to reconfirm expectations and understand any barriers to participation",
      "Escalate persistent non-attendance or delegation to the Executive Sponsor",
      "Request explicit views from relevant executives during the meeting where sufficient challenge or cross-functional input is absent",
      "Assign named executive sponsors to decisions requiring coordination across multiple functions",
      "Introduce delegated decision-makers where diary constraints repeatedly prevent the correct representation",
      "Escalate decisions that remain unresolved beyond the agreed deadline, with the resulting impact on the transaction clearly stated",
    ],
  },
  {
    id: "joint-steerco",
    index: 6,
    name: "Joint SteerCo",
    short: "Joint SteerCo",
    kind: "joint",
    objective:
      "To provide oversight of joint migration plan, assess readiness to progress to the next stage during programme tollgates, and resolve issues that have been escalated by the Joint Programme Management Office.",
    chair: "Absa and Counterparty Executive Sponsors",
    facilitator: "Absa and Counterparty Transaction Directors",
    cadence: "Fortnightly, 60 mins",
    decisionType: "Decision making (Joint, programme level items)",
    attendees: "Absa / Counterparty Executive Teams, TDs, Prog. Managers",
    inputs: "Joint SteerCo Pack",
    agenda: [
      "Action points",
      "Programme progress and unresolved joint programme issues",
      "Issues or risks requiring attention",
      "Items for decision making",
      "Change in overall implementation programme strategy if any",
      "Changes in scope",
      "Any other business",
    ],
    outputs: ["Joint programme decisions"],
    success: [
      "Decisions jointly debated and made in the room",
      "Robust but respectful debate - not anger or silence",
      "Overall focus on the success of the transaction, rather than personal or entity-specific issues",
    ],
    remedial: [
      "Hold pre-alignment discussions between the two executive sponsors where contentious decisions are likely to prevent productive debate",
      "Restate the shared transaction objectives and agreed decision principles where discussion becomes entity-specific or positional",
      "Escalate unresolved decisions through the agreed transaction governance route, with clear options, risks and consequences of delay",
      "Record the rationale for each joint decision to prevent previously resolved issues from being reopened without new evidence",
      "Address persistent unconstructive behaviour directly with the relevant executive outside the forum and agree expectations for future meetings",
    ],
  },
];

export function getForum(id: string) {
  return GOVERNANCE_FORUMS.find((f) => f.id === id);
}
