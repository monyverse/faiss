/**
 * Bite-sized Accountable Executive (Executive Sponsor) pathway: module list,
 * diagnostic, teaching interactions and capstone. Adapted from the baseline
 * content in ./executive-sponsor.ts following the supplied restructuring brief.
 */

export type CapabilityId = "mandate" | "delegation" | "resources" | "evidence";
export type Confidence = "Low" | "Medium" | "High";

export const MODULES = [
  { id: "starting-point", no: 1, title: "Your starting point", minutes: 5, purpose: "Diagnose Sponsor judgement before teaching" },
  { id: "mandate", no: 2, title: "Own the Sponsor mandate", minutes: 4, purpose: "Clarify direction, delegation, decisions and boundaries" },
  { id: "direction", no: 3, title: "Set direction and empower delivery", minutes: 4, purpose: "Define success and enable the Transaction Director" },
  { id: "alignment", no: 4, title: "Secure alignment and resources", minutes: 4, purpose: "Make the transaction an organisational priority" },
  { id: "decide", no: 5, title: "Challenge and decide", minutes: 5, purpose: "Use evidence to make timely material choices" },
  { id: "value-readiness", no: 6, title: "Protect value and readiness", minutes: 5, purpose: "Oversee the business case, risk, go or no-go and transition" },
  { id: "capstone", no: 7, title: "Put it into practice", minutes: 5, purpose: "Complete a capstone and compare it with the diagnostic" },
] as const;
export type ModuleId = (typeof MODULES)[number]["id"];
export const TEACHING_IDS: ModuleId[] = ["mandate", "direction", "alignment", "decide", "value-readiness"];

export const CAPABILITIES: { id: CapabilityId; label: string; module: ModuleId }[] = [
  { id: "mandate", label: "Direct, delegate or decide", module: "mandate" },
  { id: "delegation", label: "Protecting delegated authority", module: "direction" },
  { id: "resources", label: "Resource and cost trade-offs", module: "alignment" },
  { id: "evidence", label: "Evidence for material choices", module: "decide" },
];

export interface Opt { id: string; text: string; feedback?: string }
export interface Decision {
  capability: CapabilityId;
  question: string;
  options: Opt[];
  answer: string;
  reasoning?: string;
}

/* ---------------- Module 1: diagnostic ---------------- */

export const DIAGNOSTIC = {
  title: "A decision that cannot wait for the next committee",
  intro: "You are the Executive Sponsor. This week you learn that:",
  facts: [
    "a critical specialist is being withheld by their business area;",
    "the Transaction Director proposes temporary external support that increases cost but protects the current date;",
    "a functional executive argues that you should overrule a delegated design decision; and",
    "the programme remains within tolerance, but the value case will weaken if a customer milestone moves by more than two weeks.",
  ],
  close: "Answer as the Executive Sponsor. Several responses are defensible; choose the strongest.",
  message:
    "Several choices can look reasonable from the Sponsor's seat. The modules show how mandate, delegation, enterprise alignment and evidence decide the strongest response.",
};

export const DIAGNOSTIC_DECISIONS: Decision[] = [
  {
    capability: "mandate",
    question: "Which of these matters should you direct, delegate or decide yourself?",
    options: [
      { id: "a", text: "Decide all three matters yourself this week, since each could affect the value case." },
      { id: "b", text: "Leave all three with the Transaction Director, since the programme is within tolerance." },
      { id: "c", text: "Resolve the withheld specialist yourself, leave the design with its owner and support the Director on the support proposal." },
      { id: "d", text: "Refer all three to the next executive forum so the full committee can consider them together." },
    ],
    answer: "c",
  },
  {
    capability: "delegation",
    question: "How do you respond to the request to overrule the delegated design decision?",
    options: [
      { id: "a", text: "Check it is within the delegated mandate and aligned to objectives, then support it unless new evidence changes the position." },
      { id: "b", text: "Ask the executive and the Transaction Director to agree a compromise before execution continues." },
      { id: "c", text: "Reopen the decision at the next forum, since senior functional disagreement signals a need for wider sponsorship." },
      { id: "d", text: "Overrule it if the executive's option realises the approved benefits sooner and remains executable." },
    ],
    answer: "a",
  },
  {
    capability: "resources",
    question: "How should the specialist and external-support trade-off be resolved?",
    options: [
      { id: "a", text: "Approve the external support now, since it protects the date and sits inside tolerance." },
      { id: "b", text: "Require the business area to release the specialist, whatever the effect on its own obligations." },
      { id: "c", text: "Ask for a short option view of both obligations, cost and date effects, then use your authority to secure a commitment." },
      { id: "d", text: "Ask the Transaction Director to absorb the gap, since workstream capacity is an execution matter." },
    ],
    answer: "c",
  },
  {
    capability: "evidence",
    question: "What evidence do you need before sponsoring a material choice here?",
    options: [
      { id: "a", text: "The supported forecast, the value effect of a two-week slip, the options' costs and the final useful decision date." },
      { id: "b", text: "A detailed task-level plan from each workstream showing how the specialist's work is allocated." },
      { id: "c", text: "Confirmation from every affected executive that they agree with the recommended option." },
      { id: "d", text: "A fixed price for the external support and a revised plan approved by the Programme Manager." },
    ],
    answer: "a",
  },
];

/* ---------------- Module 2: mandate ---------------- */

export type SortKey = "direct" | "delegate" | "decide" | "escalate";
export const SORT_COLUMNS: [SortKey, string][] = [
  ["direct", "Direct"],
  ["delegate", "Delegate"],
  ["decide", "Decide"],
  ["escalate", "Sponsor or escalate"],
];
export const SORT_ITEMS: { text: string; answer: SortKey; why: string }[] = [
  { text: "Set the principles for balancing value, risk, customer, employee and timing outcomes", answer: "direct", why: "Strategic direction and decision principles are set by the Sponsor." },
  { text: "Choose between two executable migration sequences within agreed scope, budget and risk limits", answer: "delegate", why: "Transaction-level execution trade-offs within the approved direction sit with the Transaction Director." },
  { text: "Resolve an enterprise resource conflict that accountable leaders cannot resolve", answer: "decide", why: "Enterprise resource conflicts are a Sponsor decision." },
  { text: "Approve a change that moves the business case beyond tolerance", answer: "escalate", why: "Changes beyond the Sponsor's mandate go to the correct formal forum, with the Sponsor's recommendation." },
  { text: "Run the governance cadence and cross-workstream issue resolution", answer: "delegate", why: "Governance operation and coordination are delegated to the Transaction Director." },
  { text: "Determine a regulatory interpretation that threatens a milestone", answer: "escalate", why: "The named specialist authority decides; the Sponsor accelerates the route and manages the consequences." },
];

/* ---------------- Module 3: direction ---------------- */

export const BRIEF_SNAPSHOT = [
  "Deal rationale and intended end-state agreed.",
  "Transaction Director appointed; role accepted.",
  "Success criteria: 'deliver the deal on time and on budget'.",
  "Mobilisation budget approved.",
];
export const BRIEF_GAPS = [
  { id: "a", text: "The Director has no written decision limits or escalation triggers", correct: true, feedback: "Without stated limits, delegation is not real and decisions drift upward." },
  { id: "b", text: "Success criteria do not cover value, customer, employee or risk outcomes", correct: true, feedback: "Time and budget alone cannot guide execution trade-offs." },
  { id: "c", text: "The governance calendar has not yet been shared with every workstream", correct: false, feedback: "A PMO task; not one of the two gaps a Sponsor must close." },
  { id: "d", text: "The mobilisation budget is held centrally rather than by workstream", correct: false, feedback: "A reasonable design choice, not a gap in direction or delegation." },
];

/* ---------------- Module 4: alignment ---------------- */

export const RESOURCE_SITUATION =
  "Six weeks before a major readiness gate, the Technology Executive advises that two specialists committed to the transaction are needed for a regulatory remediation programme. Both initiatives have fixed external deadlines. The Transaction Director proposes moving one specialist and funding a contractor, but Technology believes the contractor will require too much supervision.";
export const RESOURCE_OPTIONS: Opt[] = [
  { id: "a", text: "Confirm the transaction's priority and require Technology to retain both specialists until the gate.", feedback: "Protects the transaction but assumes the other obligation can absorb the loss." },
  { id: "b", text: "Ask for a time-bound enterprise option showing both obligations, capability, cost and deadlines, then secure the chosen commitment.", feedback: "Recommended. It treats the conflict as an enterprise decision and creates the information to secure a workable commitment." },
  { id: "c", text: "Accept the reassignment, as regulatory work comes first, and ask the Director to replan the gate.", feedback: "Gives one valid priority automatic precedence without integrating the consequences." },
  { id: "d", text: "Split each specialist's time equally between the programmes and require weekly reporting.", feedback: "Looks balanced but may leave both programmes without enough focused capacity." },
];

/* ---------------- Module 5: decide ---------------- */

export const PAPER_SITUATION =
  "A supplier revises its estimate for a required separation activity from R18 million to between R23 million and R26 million. R8 million of central contingency remains. The paper asks you to approve the appointment but gives no value effect, no alternatives and no final useful decision date.";
export const PAPER_OPTIONS = [
  { id: "a", text: "The effect on the business case and benefit timing across the estimate range", correct: true, feedback: "Staying inside total budget is not enough; you must see the value effect." },
  { id: "b", text: "Genuine alternatives, such as a capped discovery phase before full commitment", correct: true, feedback: "Options let you buy information while limiting exposure." },
  { id: "c", text: "The final useful decision date and what becomes impossible after it", correct: true, feedback: "Timing tells you whether you can wait for more certainty." },
  { id: "d", text: "A task-level breakdown of the supplier's discovery activities", correct: false, feedback: "Operational detail; it does not change the executive choice." },
  { id: "e", text: "Agreement from every Workstream Executive that the supplier is the best option", correct: false, feedback: "Consensus is not evidence and would slow the decision." },
  { id: "f", text: "A fixed supplier price before any decision is taken", correct: false, feedback: "The supplier cannot fix a price until discovery; demanding one creates avoidable delay." },
];

/* ---------------- Module 6: value and readiness ---------------- */

export const READINESS_SITUATION =
  "All functional leaders recommend proceeding to Business Day 1. One high-severity operational risk remains: a tested manual process can maintain customer service for four hours if an automated hand-off fails, but recovery beyond four hours has not been demonstrated. The risk owner has accepted the exposure, and the Transaction Director recommends proceeding with a two-hour executive checkpoint. The formal forum is tomorrow.";
export const READINESS_OPTIONS: Opt[] = [
  { id: "a", text: "Sponsor a proceed recommendation, since the risk owner has accepted the exposure and a checkpoint adds control.", feedback: "May become the final view, but does not show the remaining exposure and checkpoint are executable." },
  { id: "b", text: "Sponsor a hold until recovery beyond four hours has been demonstrated.", feedback: "May become appropriate, but the facts do not yet show holding is the only proportionate response." },
  { id: "c", text: "Test the failure consequence, monitoring, trigger, authority and fallback, then present a recommendation with conditions to the forum.", feedback: "Recommended. It applies Sponsor judgement and preserves the formal forum's decision authority." },
  { id: "d", text: "Present the Director's recommendation and the risk acceptance without a Sponsor view.", feedback: "Passes information upward without the integrated Sponsor recommendation the forum expects." },
];

export const PLAYBOOK_PROMPTS = [
  "Intended outcome: what must remain true for this transaction to succeed?",
  "Supported forecast: what outcome is now forecast, and what accepted evidence supports it?",
  "Value effect: what does this choice do to cost, benefits, customers, employees and timing?",
  "Risk owner: which material risk remains, and who has the authority to accept it?",
  "Decision required: what must be decided, by whom, and is it within my authority?",
  "Final useful date: what becomes harder or impossible if the decision waits?",
];

/* ---------------- Module 7: capstone ---------------- */

export const CAPSTONE = {
  title: "The final executive review before cutover",
  intro: "Cutover is days away. At the final executive review you learn that:",
  facts: [
    "the integrated plan remains on date, and customer migration evidence meets the agreed threshold;",
    "one customer segment has a higher complaint forecast than assumed in the value case;",
    "a control owner will accept the remaining risk only if enhanced monitoring is funded for eight weeks; and",
    "the Transaction Director recommends proceeding with conditions, while one executive asks you to delay until every open item is closed.",
  ],
  close: "Answer as the Executive Sponsor.",
  improved: "You are now applying the Sponsor role through a clear mandate, protected delegation, enterprise alignment and evidence-based decisions.",
  review: "You have completed the pathway. Review the highlighted module before sponsoring a live transaction.",
};

export const CAPSTONE_DECISIONS: Decision[] = [
  {
    capability: "evidence",
    question: "What evidence should drive your challenge in the review?",
    options: [
      { id: "a", text: "Each workstream's detailed cutover task list, to confirm nothing has been missed.", feedback: "Pulls you into task-level detail rather than the outcome and trade-off." },
      { id: "b", text: "The supported forecast for the affected segment, the value effect, the conditions and the fallback if they fail.", feedback: "Recommended. It tests the outcome and trade-off, then enables a clear decision." },
      { id: "c", text: "Confirmation that every workstream rating is green before the forum.", feedback: "Ratings do not show the changed customer outlook or the value effect." },
      { id: "d", text: "A full list of every open item, so the delay request can be weighed properly.", feedback: "Volume of open items is not the same as material risk." },
    ],
    answer: "b",
    reasoning: "Good executive challenge tests the outcome and trade-off, then enables a clear decision.",
  },
  {
    capability: "resources",
    question: "Do the monitoring cost and the changed customer outlook need a business-case decision?",
    options: [
      { id: "a", text: "No. The monitoring is small and can be absorbed within the programme budget.", feedback: "Treats a value-case change as a budget question only." },
      { id: "b", text: "No. The Transaction Director can fund it within delegated limits and report it later.", feedback: "Funding may sit with the Director, but the value-case change needs your view." },
      { id: "c", text: "Yes, but only once cutover is complete and the complaint forecast is proven.", feedback: "Defers the decision until the useful options have gone." },
      { id: "d", text: "Yes. Confirm who can approve the funding, and record the value-case change and its owner now.", feedback: "Recommended. It makes the cost and value effect visible and owned before commitment." },
    ],
    answer: "d",
    reasoning: "Staying within total budget is not enough. The Sponsor must understand value, timing and the loss of future flexibility.",
  },
  {
    capability: "delegation",
    question: "How should the control owner's risk acceptance and your decision interact?",
    options: [
      { id: "a", text: "The control owner accepts the risk within their authority; you test it and sponsor a recommendation, and the forum decides.", feedback: "Recommended. Each level adds the judgement attached to its mandate." },
      { id: "b", text: "Your acceptance replaces the control owner's, since you own the transaction outcome.", feedback: "Material consequences do not transfer specialist authority." },
      { id: "c", text: "The control owner's acceptance settles readiness, so no Sponsor view is needed.", feedback: "Risk acceptance is not the go or no-go decision." },
      { id: "d", text: "Ask the Transaction Director to accept the risk, since it is an execution matter.", feedback: "Formal risk acceptance sits with the named authority." },
    ],
    answer: "a",
    reasoning: "Keep specialist decisions with the specialist authority while the Sponsor manages the transaction consequences.",
  },
  {
    capability: "mandate",
    question: "What readiness recommendation should you sponsor to the formal forum?",
    options: [
      { id: "a", text: "Delay until every open item is closed, as the executive asked.", feedback: "Seeks complete certainty rather than proportionate readiness." },
      { id: "b", text: "Proceed, as the plan is on date and migration evidence meets the threshold.", feedback: "Ignores the changed customer outlook and the unfunded condition." },
      { id: "c", text: "Proceed with conditions: funded monitoring, a complaint trigger, owners and a stop authority, recorded before cutover.", feedback: "Recommended. A clear view with executable, owned conditions." },
      { id: "d", text: "Present both views to the forum without a recommendation.", feedback: "Passes the choice upward instead of sponsoring a clear view." },
    ],
    answer: "c",
    reasoning: "Stay accountable for direction and material choices, and sponsor a clear view rather than pass the choice upward.",
  },
];
