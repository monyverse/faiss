/**
 * Bite-sized In-country PMO pathway: module list, diagnostic, teaching
 * interactions and capstone. Adapted from the baseline content in
 * ./in-country-pmo.ts following the supplied restructuring brief.
 */
import type { Context } from "./in-country-pmo";
export type { Context };

export type CapabilityId = "mandate" | "plan" | "handoff" | "status";
export type Confidence = "Low" | "Medium" | "High";

export const MODULES = [
  { id: "starting-point", no: 1, title: "Your starting point", minutes: 5, purpose: "Diagnose local delivery judgement before teaching" },
  { id: "mandate", no: 2, title: "Own the local mandate", minutes: 4, purpose: "Clarify local ownership, central support and reserved decisions" },
  { id: "local-plan", no: 3, title: "Turn the deal into a local plan", minutes: 5, purpose: "Translate obligations and impacts into executable local work" },
  { id: "hand-offs", no: 4, title: "Make hand-offs work", minutes: 4, purpose: "Align interfaces, dates, content and acceptance" },
  { id: "control", no: 5, title: "Run the local control rhythm", minutes: 4, purpose: "Maintain evidence, status and action between forums" },
  { id: "issues", no: 6, title: "Manage issues and rehearsals", minutes: 5, purpose: "Resolve local problems and escalate Group blockers" },
  { id: "readiness", no: 7, title: "Prove local readiness", minutes: 4, purpose: "Build a balanced, evidence-based country recommendation" },
  { id: "capstone", no: 8, title: "Put it into practice", minutes: 5, purpose: "Complete a capstone and compare it with the diagnostic" },
] as const;
export type ModuleId = (typeof MODULES)[number]["id"];
export const TEACHING_IDS: ModuleId[] = ["mandate", "local-plan", "hand-offs", "control", "issues", "readiness"];

export const CAPABILITIES: { id: CapabilityId; label: string; module: ModuleId }[] = [
  { id: "mandate", label: "Local mandate and reserved decisions", module: "mandate" },
  { id: "plan", label: "Complete local plan and evidence", module: "local-plan" },
  { id: "handoff", label: "Controlled hand-offs", module: "hand-offs" },
  { id: "status", label: "Balanced status and escalation", module: "control" },
];

/** Short, context-specific lines. They change support, never reserved authority. */
export const CONTEXT_NOTES: Record<Context, { support: string; playbook: string; capstone: string }> = {
  supported: {
    support: "In supported delivery, you supply local facts, access and logistics, while the Central Hub and functional spokes give more hands-on planning and leadership.",
    playbook: "Which activities has the centre agreed to lead, and is that split written down?",
    capstone: "In supported delivery, you may lean on central teams to do more of this work, but the facts and the local view still come from the country.",
  },
  joint: {
    support: "In joint delivery, you lead defined local activities and produce evidence, while central and functional teams set standards, challenge outputs and help on complex matters.",
    playbook: "Which local activities do we lead, and where are central teams challenging or co-delivering?",
    capstone: "In joint delivery, you lead the local response and evidence, with central teams challenging and helping on the complex parts.",
  },
  local: {
    support: "In locally led delivery, you drive local planning, execution, decision papers and readiness evidence, while central teams challenge and keep the work aligned with the Group.",
    playbook: "Where does our delegated authority stop, and which reserved decisions still go to central or specialist owners?",
    capstone: "In locally led delivery, you drive the response yourself, but reserved decisions still sit with central or specialist owners.",
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
  title: "Three weeks to the next SteerCo",
  intro: "The country plan is reported green, but:",
  facts: [
    "the legal handover arrived late, and two obligations have not been translated into local actions;",
    "Technology and the country use the same interface date but describe different outputs;",
    "customer communication and frontline training are not included in the readiness evidence; and",
    "a Group decision is blocking a local activity, although it appears only in meeting notes.",
  ],
  close: "The next country status submission is due this week.",
  message:
    "Several choices can look reasonable from a country seat. The modules show how local ownership, reserved decisions, hand-off control and balanced evidence decide the best response.",
};

export const DIAGNOSTIC_DECISIONS: Decision[] = [
  {
    capability: "mandate",
    question: "Under your operating context, what does the country own in this position?",
    options: [
      { id: "a", text: "The local plan, actions and evidence, and raising the Group decision and obligation questions to the right owners." },
      { id: "b", text: "Only local logistics and facts, because the Central Hub owns the programme plan and all readiness reporting." },
      { id: "c", text: "The whole position, including interpreting the two obligations, since the country knows local law best." },
      { id: "d", text: "The local plan and the Group decision, which the country can make itself if the blocker delays local work." },
    ],
    answer: "a",
  },
  {
    capability: "plan",
    question: "What would make the local plan complete?",
    options: [
      { id: "a", text: "Add the two obligations as milestones using the dates in the legal handover, and review them later with Legal." },
      { id: "b", text: "Ask Legal to explain the two obligations in delivery terms, then add owned local actions and add customer and training evidence to readiness." },
      { id: "c", text: "Hold the plan as it is until the next readiness review, when Legal and the Central Hub can confirm what is missing." },
      { id: "d", text: "Add customer communication and training milestones, and leave the obligations with Legal until they are ready to share." },
    ],
    answer: "b",
  },
  {
    capability: "handoff",
    question: "How should you confirm the Technology hand-off?",
    options: [
      { id: "a", text: "Keep the shared date, since both plans match, and note the different descriptions as a risk to monitor." },
      { id: "b", text: "Update the local plan to match Technology's description so that both plans say the same thing." },
      { id: "c", text: "Agree with Technology what will be delivered, in what format and standard, who accepts it and what happens if it is late." },
      { id: "d", text: "Ask the Central Hub to decide which description is right and follow its answer in the local plan." },
    ],
    answer: "c",
  },
  {
    capability: "status",
    question: "How should you report and escalate the combined position?",
    options: [
      { id: "a", text: "Keep green, because no milestone is late, and add the gaps to the commentary for the readiness review." },
      { id: "b", text: "Report red across the country, because four separate gaps together show the plan cannot be trusted." },
      { id: "c", text: "Report the technology position as green and the customer position separately, so each owner can act on their part." },
      { id: "d", text: "Report the forecast against the review with each gap and owner, and escalate the Group decision with its local effect and a date." },
    ],
    answer: "d",
  },
];

/* ---------------- Module 2: mandate ---------------- */

export type SortKey = "own" | "coordinate" | "escalate";
export const SORT_ITEMS: { text: string; answer: SortKey; why: string }[] = [
  { text: "Keeping the local RAID log, actions and decisions current", answer: "own", why: "Local controls are the country's to maintain." },
  { text: "Checking the local customer and employee impact of a design change", answer: "own", why: "The country assesses local impact, whatever its maturity." },
  { text: "Agreeing a data hand-off with a permitted counterparty contact", answer: "coordinate", why: "The country coordinates the hand-off; both sides must agree it." },
  { text: "Aligning local milestones with the combined programme plan", answer: "coordinate", why: "The Central Hub owns the combined plan. The country keeps its part aligned." },
  { text: "A local legal requirement conflicts with a central assumption", answer: "escalate", why: "Interpretation sits with Legal and central authority, not the PMO." },
  { text: "Accepting a remaining risk so that the country can proceed", answer: "escalate", why: "Material risk acceptance is reserved, even for a locally led country." },
];

/* ---------------- Module 3: local plan ---------------- */

export const PLAN_SNAPSHOT = [
  "Customer consent letters: owner Customer Lead, due 14 June.",
  "Branch process update: owner Operations Lead, due 21 June.",
  "System configuration: owner Technology, due 28 June, on track.",
];
export const PLAN_GAPS = [
  { id: "a", text: "Nobody has confirmed with Legal what the consent obligation requires or what evidence proves it is met", correct: true, feedback: "The date may be right but the required result is untested. The PMO must not interpret it alone." },
  { id: "b", text: "Frontline staff training is missing, so the updated branch process cannot actually be used", correct: true, feedback: "Without trained staff the process change is not executable for customers." },
  { id: "c", text: "The Technology line has no separate owner for testing", correct: false, feedback: "Worth checking, but the line is owned and on track." },
  { id: "d", text: "The consent letters have no named printer or mailing supplier yet", correct: false, feedback: "Useful detail, but it can be added once the obligation itself is clear." },
];

/* ---------------- Module 4: hand-offs ---------------- */

export const HANDOFF_LINES = {
  central: "Central Technology plan: Customer data interface live, 10 May.",
  local: "Country plan: Customer data interface live, 10 May. Onboarding team loads approved customer file.",
};
export const HANDOFF_OPTIONS: Opt[] = [
  { id: "a", text: "Nothing material. Both lines share the date and describe the same interface.", feedback: "Matching dates do not prove the same thing is being delivered." },
  { id: "b", text: "The country expects an approved, load-ready file; the central line only commits to the interface being live.", feedback: "Recommended. The content and acceptance standard differ, so the hand-off is not yet controlled." },
  { id: "c", text: "The central line does not say what time on 10 May the interface goes live.", feedback: "A fair point, but less material than disagreeing about what is delivered." },
  { id: "d", text: "The country line names an onboarding team but not an individual owner.", feedback: "Worth fixing, but not the gap that would break the hand-off." },
];

/* ---------------- Module 5: control ---------------- */

export const STATUS_OPTIONS: Opt[] = [
  { id: "a", text: "Green. All technology milestones are on plan, and customer activities are tracked as separate readiness actions.", feedback: "Accurate for technology, but it lets technology stand in for readiness." },
  { id: "b", text: "Amber. Technology is on plan, but customer letters are not approved and training dates are provisional. Without approval by 3 June, readiness moves. Decision needed from Compliance by 31 May.", feedback: "Recommended. It shows the real local forecast, the trigger and the decision needed." },
  { id: "c", text: "Red. Customer and training readiness are incomplete four weeks before the review, so the country cannot be ready.", feedback: "May prove right, but it sets severity before recovery has been tested." },
  { id: "d", text: "Green with a note that the customer team is working hard to approve letters and confirm training dates.", feedback: "Reports effort, not forecast or the decision required." },
];

/* ---------------- Module 6: issues ---------------- */

export const ESCALATION_PARTS = ["Facts", "Effect", "Local action taken", "Options", "Recommendation", "Decision owner", "Decision date"];

export const DEFECT_SITUATION =
  "The first dress rehearsal found a data defect jointly owned by Absa and the seller. The seller must approve and send a corrected extract; Absa then needs four days to process it. Five days before the second rehearsal, seller approval is still outstanding.";
export const DEFECT_OPTIONS: Opt[] = [
  { id: "a", text: "Keep the defect open for the second rehearsal, and let the cutover manager decide whether the step stays in scope.", feedback: "Recognises the cutover manager's role but delays the readiness decision." },
  { id: "b", text: "Ask the seller for an urgent response and prepare to log the same defect again if the data misses the window.", feedback: "May get the data but does not protect Absa's processing time." },
  { id: "c", text: "Set the last workable arrival time, escalate seller approval and Absa processing together, and agree the rehearsal treatment now.", feedback: "Recommended. It manages the whole chain before the window closes." },
  { id: "d", text: "Remove the affected step from the second rehearsal so the rest of the runbook can still show progress.", feedback: "Possibly right, but only once the evidence gap has been assessed through the proper route." },
];

/* ---------------- Module 7: readiness ---------------- */

export const READINESS_AREAS = [
  { title: "Customers and employees", text: "Communications approved, frontline trained, complaints process tested." },
  { title: "Regulatory obligations", text: "Local commitments and approvals evidenced through Legal and Compliance." },
  { title: "Operations", text: "Enough capacity and working processes for live service, not just rehearsal." },
  { title: "Technology and data", text: "Tested, with defects treated and data accepted by the receiving team." },
  { title: "Hand-offs and cutover", text: "Interfaces accepted, runbook tasks, fallbacks and escalation routes workable." },
  { title: "Remaining risks", text: "Visible, with owners, workarounds, expiry dates and the right person accepting them." },
];

export const READINESS_OPTIONS = [
  { id: "a", text: "Record of the tested complaints process with frontline participation", correct: true, feedback: "Shows customer readiness, not just technology." },
  { id: "b", text: "Compliance confirmation that local regulatory commitments are met", correct: true, feedback: "Evidence from the authority that owns the obligation." },
  { id: "c", text: "Acceptance record from the receiving team for the customer data hand-off", correct: true, feedback: "Proves the interface delivered what both sides agreed." },
  { id: "d", text: "Country leadership's confidence that staff will be ready by go-live", correct: false, feedback: "Confidence is not evidence." },
  { id: "e", text: "Technology status report showing all milestones green", correct: false, feedback: "Covers technology only and shows progress, not acceptance." },
  { id: "f", text: "A workaround for a recurring defect agreed within the country team", correct: false, feedback: "The control owner must accept the remaining risk." },
];

export const PLAYBOOK_PROMPTS = [
  "Local obligation: which obligation is not yet an owned local action, and who interprets it?",
  "Owner: does every critical local activity have one accountable owner and a deputy?",
  "Hand-off: which interface is least certain on content, standard or acceptance?",
  "Evidence: which readiness claim, including customer and employee readiness, lacks accepted proof?",
  "Blocker: which Group or counterparty blocker needs the Central Hub, and by when?",
  "Decision: what must be decided, by whom, and what is the last useful date?",
];

/* ---------------- Module 8: capstone ---------------- */

export const CAPSTONE = {
  title: "Five days to the final country rehearsal",
  intro: "The final rehearsal is next week. You know that:",
  facts: [
    "the central interface is forecast one day late, but remains within the overall schedule buffer;",
    "country operations have enough staff for the rehearsal, but not yet for live cutover;",
    "a customer notice meets the central date, but local legal review has found wording that may need to change; and",
    "a recurring defect has a workaround, although the control owner has not accepted the remaining risk.",
  ],
  close: "The Central Hub has asked for the country's readiness view.",
  improved: "You are now applying the In-country PMO role through clear local ownership, controlled hand-offs and balanced evidence.",
  review: "You have completed the pathway. Review the highlighted module before using the playbook on a live transaction.",
};

export const CAPSTONE_DECISIONS: Decision[] = [
  {
    capability: "handoff",
    question: "How should the late interface and schedule buffer be controlled?",
    options: [
      { id: "a", text: "Accept the one-day slip because it is within buffer, and review it again if the forecast moves further.", feedback: "The buffer covers it today, but without a trigger nobody knows when to act." },
      { id: "b", text: "Agree the delivered content, acceptance standard and a recovery trigger with the sending team, and record them.", feedback: "Recommended. It turns a forecast into a controlled hand-off with a clear point to act." },
      { id: "c", text: "Move local rehearsal activities back by one day now so the country keeps its own buffer intact.", feedback: "Changes the plan before recovery is tested and may affect other workstreams." },
      { id: "d", text: "Ask the Central Hub to own the interface date while the country focuses on its own readiness.", feedback: "The Central Hub coordinates, but the country must still control its side of the hand-off." },
    ],
    answer: "b",
    reasoning: "A shared date is not a controlled hand-off until both sides agree what will be delivered, accepted and when to act.",
  },
  {
    capability: "status",
    question: "How should the capacity position affect local status?",
    options: [
      { id: "a", text: "Keep green, because staff are sufficient for the rehearsal and live cutover capacity can be sorted next.", feedback: "Rehearsal capacity is not live readiness." },
      { id: "b", text: "Report the live-cutover capacity gap, its effect on customers and service, the plan to close it and the date it must close.", feedback: "Recommended. It shows the real operational forecast and the action needed." },
      { id: "c", text: "Report red, because live cutover cannot happen without enough operational staff.", feedback: "Sets severity before testing whether the gap can be closed in time." },
      { id: "d", text: "Leave capacity out of status and raise it with the Operations Lead directly, as it is a local resourcing matter.", feedback: "Handling it locally is fine, but hiding it from status misstates readiness." },
    ],
    answer: "b",
    reasoning: "Country reporting should show what is really ready, including operations, not only whether rehearsal and technology are on track.",
  },
  {
    capability: "mandate",
    question: "How should the customer notice proceed while the legal review is unresolved?",
    options: [
      { id: "a", text: "Issue it on the central date, as the change may not be needed, and send a correction later if required.", feedback: "Sending wording Legal has queried takes a reserved decision locally." },
      { id: "b", text: "Change the wording yourself to what local Legal suggests, so the notice can still go on the central date.", feedback: "The PMO does not interpret or finalise legal wording." },
      { id: "c", text: "Prepare the notice for release, ask Legal for a decision by the last workable date, and show the risk to the central date.", feedback: "Recommended. It keeps momentum while the right authority decides." },
      { id: "d", text: "Hold the notice indefinitely until Legal and the Central Hub both confirm the final wording.", feedback: "Protects accuracy, but without a deadline the central date is quietly lost." },
    ],
    answer: "c",
    reasoning: "Lead what the country can own and make the reserved decision, and its deadline, explicit.",
  },
  {
    capability: "plan",
    question: "What readiness recommendation and escalation should the country make?",
    options: [
      { id: "a", text: "Ready, because the defect has a workaround and the country team is confident it can manage it.", feedback: "The remaining risk has not been accepted by its owner." },
      { id: "b", text: "Not ready, and ask the Central Hub to postpone the rehearsal until every gap is closed.", feedback: "Pre-empts a decision that belongs to governance and ignores what is ready." },
      { id: "c", text: "Ready with conditions, set by the country, with the defect workaround accepted locally until hypercare.", feedback: "Accepting material risk is reserved, whatever the country's maturity." },
      { id: "d", text: "A recommendation showing what is evidenced, what is not, and escalating the defect risk to its control owner for a decision.", feedback: "Recommended. It gives a balanced, evidence-based view and routes the risk correctly." },
    ],
    answer: "d",
    reasoning: "The In-country PMO recommends local readiness from balanced evidence. It does not approve it or accept material risk.",
  },
];
