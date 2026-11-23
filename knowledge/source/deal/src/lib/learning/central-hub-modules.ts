/**
 * Bite-sized Central Hub pathway: module list, diagnostic, teaching
 * interactions and capstone. Adapted from the baseline content in
 * ./central-hub.ts following the supplied restructuring brief.
 */
import type { Lens } from "./central-hub";
export type { Lens };

export type CapabilityId = "mandate" | "view" | "decision" | "control";
export type Confidence = "Low" | "Medium" | "High";

export const MODULES = [
  { id: "starting-point", no: 1, title: "Your starting point", minutes: 5, purpose: "Diagnose programme judgement before teaching" },
  { id: "mandate", no: 2, title: "Know your Central Hub mandate", minutes: 4, purpose: "Clarify Hub ownership and the selected role lens" },
  { id: "mobilise", no: 3, title: "Mobilise the programme", minutes: 5, purpose: "Establish leadership, controls, forums and interfaces" },
  { id: "programme-view", no: 4, title: "Build one programme view", minutes: 5, purpose: "Integrate plans, dependencies, economics and milestones" },
  { id: "control", no: 5, title: "Run the control rhythm", minutes: 4, purpose: "Maintain reliable reporting, records and governance flow" },
  { id: "decisions", no: 6, title: "Challenge and prepare decisions", minutes: 5, purpose: "Improve information and route choices to the right authority" },
  { id: "readiness", no: 7, title: "Prove readiness and close", minutes: 4, purpose: "Support evidence-based readiness, cutover and handover" },
  { id: "capstone", no: 8, title: "Put it into practice", minutes: 5, purpose: "Complete a role-tailored capstone and comparison" },
] as const;
export type ModuleId = (typeof MODULES)[number]["id"];
export const TEACHING_IDS: ModuleId[] = ["mandate", "mobilise", "programme-view", "control", "decisions", "readiness"];

export const CAPABILITIES: { id: CapabilityId; label: string; module: ModuleId }[] = [
  { id: "mandate", label: "Integration, challenge and ownership", module: "mandate" },
  { id: "view", label: "One reliable programme view", module: "programme-view" },
  { id: "decision", label: "Decision preparation and routing", module: "decisions" },
  { id: "control", label: "Status, records and baseline control", module: "control" },
];

/** Role-lens lines. Same facts, different authority. */
export const LENS_NOTES: Record<Lens, { role: string; scenario: string; playbook: string }> = {
  pm: {
    role: "As Programme Manager, you turn direction into an integrated programme view, test trade-offs and prepare recommendations. Wider programme decisions go to the Transaction Director.",
    scenario: "As Programme Manager, you test the facts across workstreams, frame the options and recommend. You do not make the transaction-level decision.",
    playbook: "Is there a clear recommendation, decision owner and deadline?",
  },
  pmo: {
    role: "As PMO Support, you keep plans, logs, packs and records reliable. You flag gaps and inconsistencies, and take anything needing management judgement to the Programme Manager.",
    scenario: "As PMO Support, you make the facts complete and traceable, flag what is missing and alert the Programme Manager before the deadline. You do not settle the judgement.",
    playbook: "Has the matter reached the Programme Manager before the reporting or decision deadline?",
  },
  td: {
    role: "As Transaction Director, you set execution direction and decide transaction-level matters within delegated authority. Reserved matters go to the Executive Sponsor or formal governance.",
    scenario: "As Transaction Director, you decide within mandate or sponsor escalation. Functional and specialist approvals stay with their owners.",
    playbook: "Is this decision within my delegated authority, or reserved for the Executive Sponsor, formal governance or a specialist?",
  },
};

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
  title: "Five days to the programme working group",
  intro: "The working group is in five days. You know that:",
  facts: [
    "two workstreams use the same dependency date but describe different deliverables;",
    "a country plan is green, although its customer-readiness evidence is incomplete;",
    "a decision paper gives two options but does not quantify cost or schedule effects; and",
    "a material change was agreed on a call but has not entered the decision or change record.",
  ],
  close: "Answer from your selected role. All three roles see the same facts but act within different authority.",
  message:
    "Several choices can look reasonable from a Hub seat. The modules show how integration, challenge, decision routing and control discipline decide the best response for your role.",
};

export const DIAGNOSTIC_DECISIONS: Decision[] = [
  {
    capability: "mandate",
    question: "Where is the boundary between the Hub and the two workstreams on the dependency?",
    options: [
      { id: "a", text: "The Hub decides which deliverable is right and updates both workstream plans to match." },
      { id: "b", text: "The Hub makes the mismatch visible and has both owners agree the deliverable and acceptance." },
      { id: "c", text: "The Hub records the date as aligned, since both plans show it, and monitors it weekly." },
      { id: "d", text: "The Hub asks the functional spoke to take over both deliverables until they are aligned." },
    ],
    answer: "b",
  },
  {
    capability: "view",
    question: "What must change before the programme view is reliable?",
    options: [
      { id: "a", text: "Average the workstream ratings so no single green or red distorts the overall picture." },
      { id: "b", text: "Keep the country green and add the customer evidence gap to the commentary." },
      { id: "c", text: "Reconcile the dependency and test the country rating against its customer-readiness evidence." },
      { id: "d", text: "Move the whole programme to red until every workstream can evidence its status." },
    ],
    answer: "c",
  },
  {
    capability: "decision",
    question: "How should the decision be prepared and routed?",
    options: [
      { id: "a", text: "Send the paper as it is so the forum can ask for the missing effects if it needs them." },
      { id: "b", text: "Pick the cheaper option on the forum's behalf, since the costs are likely to be similar." },
      { id: "c", text: "Hold the decision until the next baseline cycle, when better cost data will exist." },
      { id: "d", text: "Have the owner add cost and schedule effects, a recommendation and a deadline, then route it." },
    ],
    answer: "d",
  },
  {
    capability: "control",
    question: "How should the change agreed on the call affect status, records and the baseline?",
    options: [
      { id: "a", text: "Record it in the decision and change logs, confirm who approved it, then update the plan and status." },
      { id: "b", text: "Update the plan straight away, as the change was agreed, and add the record later." },
      { id: "c", text: "Leave the plan unchanged until the change is raised again at a formal forum." },
      { id: "d", text: "Note the change in the status narrative and let the workstream update its own plan." },
    ],
    answer: "a",
  },
];

/* ---------------- Module 2: mandate ---------------- */

export type SortKey = "td" | "pm" | "pmo" | "owner";
export const SORT_COLUMNS: [SortKey, string][] = [
  ["td", "Transaction Director"],
  ["pm", "Programme Manager"],
  ["pmo", "PMO Support"],
  ["owner", "Stays with its owner"],
];
export const SORT_ITEMS: { text: string; answer: SortKey; why: string }[] = [
  { text: "Resolve a transaction-level trade-off within delegated authority", answer: "td", why: "Transaction-level decisions within mandate sit with the Transaction Director." },
  { text: "Test whether two workstream plans fit together and recommend a response", answer: "pm", why: "The Programme Manager builds and runs the integrated plan." },
  { text: "Keep the RAID log's owners, dates, ageing and evidence complete", answer: "pmo", why: "PMO Support maintains complete, traceable records." },
  { text: "Approve a functional design choice", answer: "owner", why: "Functional design stays with the Functional Spoke." },
  { text: "Make the formal go or no-go decision", answer: "owner", why: "Formal governance makes the go or no-go decision." },
  { text: "Reconcile status submissions and flag conflicting information", answer: "pmo", why: "PMO Support reconciles submissions without inventing management judgement." },
];

/* ---------------- Module 3: mobilise ---------------- */

export const MOBILISE_SNAPSHOT = [
  "Transaction Director appointed and briefed.",
  "Workstream Leads named for 14 of 18 workstreams.",
  "Governance calendar drafted.",
  "Programme logs set up in the controlled workspace.",
];
export const MOBILISE_GAPS = [
  { id: "a", text: "Four workstreams have no named lead, and nobody owns closing the gap", correct: true, feedback: "Without accountable owners, those workstreams cannot plan or decide." },
  { id: "b", text: "Forums have dates but no agreed authority, inputs or outputs", correct: true, feedback: "The programme cannot make controlled decisions yet." },
  { id: "c", text: "The logs use the default colour scheme rather than Absa's branding", correct: false, feedback: "Cosmetic; it does not threaten a controlled start." },
  { id: "d", text: "The onboarding pack has not yet been translated for one country", correct: false, feedback: "Worth doing, but not one of the two biggest threats." },
];

/* ---------------- Module 4: programme view ---------------- */

export const VIEW_LINES = {
  a: "Technology plan: Customer data migration complete, 12 July.",
  b: "Client Readiness plan: Customer data migration complete, 12 July. Customer letters issue from reconciled records on 13 July.",
};
export const VIEW_OPTIONS: Opt[] = [
  { id: "a", text: "Nothing material. Both plans share the milestone name and date.", feedback: "Matching names and dates do not prove matching content." },
  { id: "b", text: "Client Readiness expects reconciled records; Technology only commits to migration being complete.", feedback: "Recommended. One team's assumption changes the other team's outcome." },
  { id: "c", text: "Technology does not say what time on 12 July the migration completes.", feedback: "A fair point, but less material than the content mismatch." },
  { id: "d", text: "Client Readiness leaves only one day between migration and letters.", feedback: "A tight gap, but the bigger issue is what 'complete' means." },
];

/* ---------------- Module 5: control ---------------- */

export const CUTOFF_SITUATION =
  "At reporting cut-off, the Finance workstream reports green. The Technology workstream reports that a Finance interface it depends on will be two weeks late. The interface sits on the critical path.";
export const CUTOFF_OPTIONS: Record<Lens, { options: Opt[]; answer: string }> = {
  pm: {
    answer: "c",
    options: [
      { id: "a", text: "Report both ratings as submitted and note the conflict in the commentary.", feedback: "Leaves a negotiated picture, not the supported forecast." },
      { id: "b", text: "Change Finance to amber yourself so the programme view is consistent.", feedback: "The rating belongs to Finance; you must test the evidence with them." },
      { id: "c", text: "Test both positions against evidence, show the critical-path effect and flag the decision needed.", feedback: "Recommended. It reports the supported forecast and the unresolved choice." },
      { id: "d", text: "Hold the programme report until the two workstreams agree a single date.", feedback: "Delays senior visibility of a critical-path risk." },
    ],
  },
  pmo: {
    answer: "b",
    options: [
      { id: "a", text: "Change Finance to amber so the pack matches the Technology submission.", feedback: "That is a management judgement, not a control action." },
      { id: "b", text: "Record both submissions, flag the conflict and its critical-path link, and alert the Programme Manager.", feedback: "Recommended. You make the conflict traceable and reach the right person in time." },
      { id: "c", text: "Accept Finance's green because it arrived first and is inside the cut-off.", feedback: "Timing of submission does not make information reliable." },
      { id: "d", text: "Ask Technology to withdraw its update until Finance has confirmed it.", feedback: "Suppresses a material risk." },
    ],
  },
  td: {
    answer: "d",
    options: [
      { id: "a", text: "Accept the Programme Manager's pack as drafted, since it follows reporting standards.", feedback: "You own the execution message; test it first." },
      { id: "b", text: "Instruct Finance to deliver on the original date whatever the cost.", feedback: "Directs a result without testing options or consequences." },
      { id: "c", text: "Report amber to the Executive Sponsor and wait for direction on the date.", feedback: "Escalates before using your own authority." },
      { id: "d", text: "Test the recovery options, decide within mandate or escalate with a recommendation, and set the message.", feedback: "Recommended. You decide within mandate and own the execution message." },
    ],
  },
};

/* ---------------- Module 6: decisions ---------------- */

export const PAPER_SITUATION =
  "A decision paper asks whether to delay a country cutover by three weeks. It lists two options but gives no cost, customer or control effects, no recommendation and no deadline.";
export const PAPER_OPTIONS: Record<Lens, { options: Opt[]; answer: string }> = {
  pm: {
    answer: "a",
    options: [
      { id: "a", text: "Work with the owner to add effects, test the trade-off and add a recommendation and deadline.", feedback: "Recommended. You make the decision clearer and leave the paper with its owner." },
      { id: "b", text: "Check the paper against the standard and return it with a list of missing sections.", feedback: "Useful, and a PMO Support action, but you also need to test the trade-off." },
      { id: "c", text: "Decide the delay yourself, as it is a programme-management matter.", feedback: "A three-week cutover delay is a transaction-level decision." },
      { id: "d", text: "Rewrite the paper yourself so it is ready for the forum on time.", feedback: "Speeds things up but moves ownership to the Hub." },
    ],
  },
  pmo: {
    answer: "b",
    options: [
      { id: "a", text: "Work with the owner to test the trade-off and write a recommendation.", feedback: "Useful, but that judgement sits with the Programme Manager." },
      { id: "b", text: "Check the paper for completeness, log the gaps, keep it in the pipeline and alert the Programme Manager.", feedback: "Recommended. You maintain the pipeline and make gaps visible." },
      { id: "c", text: "Add estimated costs from last month's forecast so the paper is complete.", feedback: "Invents facts rather than flagging them." },
      { id: "d", text: "Remove the paper from the forum agenda until the owner resubmits it.", feedback: "May lose the last useful decision date." },
    ],
  },
  td: {
    answer: "c",
    options: [
      { id: "a", text: "Ask the Programme Manager to test the trade-off and return a recommendation.", feedback: "Useful, but you still need to decide or sponsor the escalation." },
      { id: "b", text: "Approve the delay now, since cutover safety comes first.", feedback: "Decides without the effects on cost, value and customers." },
      { id: "c", text: "Require the effects and a recommendation by a set date, then decide within mandate or sponsor escalation.", feedback: "Recommended. You apply your authority once the information is sufficient." },
      { id: "d", text: "Send the paper straight to the Executive Sponsor to decide.", feedback: "Escalates before testing whether the matter is within your mandate." },
    ],
  },
};

export const PAPER_PARTS = ["Decision needed", "Options", "Consequences", "Recommendation", "Decision owner", "Last useful date", "Recorded outcome"];

/* ---------------- Module 7: readiness ---------------- */

export const READINESS_OPTIONS = [
  { id: "a", text: "Receiving workstream's acceptance of each critical hand-off", correct: true, feedback: "Acceptance by the receiver proves the hand-off worked." },
  { id: "b", text: "Specialist owners' sign-off of functional and control readiness", correct: true, feedback: "Specialist approvals stay with their owners." },
  { id: "c", text: "Recorded acceptance of each remaining risk by the right authority", correct: true, feedback: "Residual risk must be explicitly accepted." },
  { id: "d", text: "All workstream ratings averaged to green", correct: false, feedback: "Averaging hides exceptions." },
  { id: "e", text: "Workstream Leads' verbal confirmation at the last forum", correct: false, feedback: "Unrecorded confirmations are not evidence." },
  { id: "f", text: "A completed cutover runbook that has not been rehearsed", correct: false, feedback: "A plan is not proof it can be executed." },
];

export const PLAYBOOK_PROMPTS = [
  "Forecast: does the status show the supported forecast, not a negotiated colour?",
  "Dependency: which hand-off is least certain on content, acceptance or date?",
  "Evidence: which readiness claim lacks accepted evidence from its owner?",
  "Decision: what must be decided, by which authority, and by when?",
  "Value effect: what does this choice do to cost, contingency, benefits or value?",
  "Owner: who owns the outcome, and who records and follows it through?",
];

/* ---------------- Module 8: capstone ---------------- */

export const CAPSTONE = {
  title: "Seventy-two hours to the programme readiness forum",
  intro: "The readiness forum is in three days. You know that:",
  facts: [
    "all workstreams report green, but a critical hand-off has been accepted by the sender and not the receiver;",
    "a country control pack is complete but has not been reviewed by the specialist owner;",
    "a supplier change would protect stability but uses programme contingency and delays one benefit; and",
    "a conditional decision was given verbally and has not been recorded.",
  ],
  close: "Answer from your selected role.",
  improved: "You are now applying the Central Hub role through clear boundaries, one reliable programme view and well-routed decisions.",
  review: "You have completed the pathway. Review the highlighted module before using the playbook on a live transaction.",
};

export const CAPSTONE_DECISIONS: Decision[] = [
  {
    capability: "view",
    question: "How should the integrated programme position be represented?",
    options: [
      { id: "a", text: "Green, because every workstream reports green and no milestone is late.", feedback: "An unaccepted critical hand-off means green is not supported." },
      { id: "b", text: "Red, because several pieces of evidence are incomplete three days out.", feedback: "Sets severity before testing whether the gaps can close in time." },
      { id: "c", text: "The supported forecast, showing the unaccepted hand-off, the unreviewed pack and what closes each.", feedback: "Recommended. It shows the real delivery path, not the sum of ratings." },
      { id: "d", text: "Green overall, with the open items listed in an appendix for reference.", feedback: "Hides exceptions that affect the recommendation." },
    ],
    answer: "c",
    reasoning: "The programme view is useful when it reveals where one team's assumption changes another team's outcome.",
  },
  {
    capability: "mandate",
    question: "What should the Central Hub do about the hand-off and the control pack?",
    options: [
      { id: "a", text: "Accept the hand-off and the pack on the owners' behalf to keep the forum on track.", feedback: "Acceptance and specialist review stay with their owners." },
      { id: "b", text: "Get the receiver's acceptance and the specialist review, each with an owner and a date before the forum.", feedback: "Recommended. The Hub coordinates and challenges; owners accept and approve." },
      { id: "c", text: "Remove both items from the forum pack until they are complete.", feedback: "Hides open conditions from the decision-makers." },
      { id: "d", text: "Ask the country to confirm its own pack so the specialist review is not needed.", feedback: "Bypasses a reserved specialist approval." },
    ],
    answer: "b",
    reasoning: "Create one reliable programme view while leaving functional and specialist decisions with their owners.",
  },
  {
    capability: "decision",
    question: "How should the supplier choice be prepared and routed?",
    options: [
      { id: "a", text: "Approve the change now, as stability matters more than one delayed benefit.", feedback: "Uses contingency and moves value without the right authority." },
      { id: "b", text: "Reject the change to protect contingency and the benefit date.", feedback: "Decides the trade-off without testing it." },
      { id: "c", text: "Leave the choice with the supplier's workstream, as it is their contract.", feedback: "Contingency and benefits are programme-level effects." },
      { id: "d", text: "Frame the options with stability, contingency and benefit effects and a recommendation, and route to the right authority.", feedback: "Recommended. It makes the trade-off clear and keeps accountability with the right owner." },
    ],
    answer: "d",
    reasoning: "Challenge should make the decision clearer while keeping accountability with the right owner.",
  },
  {
    capability: "control",
    question: "What readiness recommendation and conditions should go to the forum?",
    options: [
      { id: "a", text: "Ready with conditions: name each open item, its owner and deadline, and record the verbal decision first.", feedback: "Recommended. Accepted evidence, clear conditions and a recorded decision." },
      { id: "b", text: "Ready, relying on the verbal decision to cover the open items.", feedback: "An unrecorded decision cannot support a forum recommendation." },
      { id: "c", text: "Not ready, and ask the forum to reschedule until every item is closed.", feedback: "Pre-empts a decision that belongs to the forum." },
      { id: "d", text: "No recommendation, and let the forum judge the evidence itself.", feedback: "The Hub should bring the evidence together into a recommendation." },
    ],
    answer: "a",
    reasoning: "Reliable reporting shows the supported forecast and unresolved choice, with decisions recorded before they are relied on.",
  },
];
