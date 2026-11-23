/**
 * Bite-sized Workstream Lead pathway: module list, diagnostic, teaching
 * interactions and capstone. Adapted from the Workstream Lead baseline content
 * in ./workstream-lead.ts; wording follows the supplied restructuring brief.
 */

export type CapabilityId = "mandate" | "plan" | "dependencies" | "readiness";
export type Confidence = "Low" | "Medium" | "High";

export const MODULES = [
  { id: "starting-point", no: 1, title: "Your starting point", minutes: 4, purpose: "Diagnostic scenario before teaching" },
  { id: "mandate", no: 2, title: "Own your mandate", minutes: 3, purpose: "Accountability, authority and boundaries" },
  { id: "mobilise", no: 3, title: "Mobilise the workstream", minutes: 4, purpose: "Context, capacity, interfaces and controls" },
  { id: "plan", no: 4, title: "Build a credible plan", minutes: 5, purpose: "Outcomes, owners, dependencies, resources and acceptance" },
  { id: "operate", no: 5, title: "Run and report", minutes: 4, purpose: "Weekly rhythm, evidence and honest forecasting" },
  { id: "decide", no: 6, title: "Decide and escalate", minutes: 4, purpose: "Decisions, dependencies, economics and escalation" },
  { id: "readiness", no: 7, title: "Prove readiness", minutes: 4, purpose: "Evidence, fallbacks, resources and personal playbook" },
  { id: "capstone", no: 8, title: "Put it into practice", minutes: 5, purpose: "Final capstone scenario and comparison" },
] as const;
export type ModuleId = (typeof MODULES)[number]["id"];
export const TEACHING_IDS: ModuleId[] = ["mandate", "mobilise", "plan", "operate", "decide", "readiness"];
export const TOTAL_MINUTES = MODULES.reduce((n, m) => n + m.minutes, 0);

export const CAPABILITIES: { id: CapabilityId; label: string; module: ModuleId }[] = [
  { id: "mandate", label: "Mandate", module: "mandate" },
  { id: "plan", label: "Plan and status", module: "plan" },
  { id: "dependencies", label: "Dependencies", module: "decide" },
  { id: "readiness", label: "Readiness", module: "readiness" },
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
  title: "Four weeks to integrated testing",
  intro: "Your workstream is reporting green. Four weeks before integrated testing:",
  facts: [
    "a key control design is drafted but the control owner has not accepted it;",
    "the specialist named in the plan can provide two days a week rather than the four assumed;",
    "another workstream has verbally agreed a data hand-off date, but the hand-off content and acceptance standard are not recorded; and",
    "the team believes the lost time can be recovered during testing.",
  ],
  close: "The weekly status is due today. The Workstream Executive and Programme Manager both expect a clear recommendation.",
  message:
    "Several choices can look reasonable in isolation. The rest of the pathway shows how mandate, evidence and programme impact determine the best response.",
};

export const DIAGNOSTIC_DECISIONS: Decision[] = [
  {
    capability: "mandate",
    question: "The specialist can give only half the time assumed. What is your first move?",
    options: [
      { id: "a", text: "Work out the minimum specialist input needed, compare resequencing with backfill, and take a recommended response to the Workstream Executive." },
      { id: "b", text: "Ask the functional head to restore the full allocation, and have the Workstream PM model the plan impact if they decline." },
      { id: "c", text: "Ask the Workstream PM to resequence the review work and decide the new order, then record the capacity gap as a risk." },
      { id: "d", text: "Pass the capacity gap to the Central Hub, because specialist availability can affect the integrated programme plan." },
    ],
    answer: "a",
  },
  {
    capability: "plan",
    question: "How should today's status represent the workstream?",
    options: [
      { id: "a", text: "Keep green, because the team expects to recover the time during testing, and note the open items in the narrative." },
      { id: "b", text: "Report the forecast against the testing date, showing the unaccepted control design, reduced capacity and recovery assumption with owners." },
      { id: "c", text: "Move to red, because the control design and specialist capacity both fall short of the approved plan today." },
      { id: "d", text: "Report green for completed activity and amber for the remaining work, so both views are visible to the programme." },
    ],
    answer: "b",
  },
  {
    capability: "dependencies",
    question: "What should happen with the verbally agreed data hand-off?",
    options: [
      { id: "a", text: "Rely on the verbal date for now, and confirm the content once the supplying workstream has started the extract." },
      { id: "b", text: "Ask the PMO to record the date in the integrated plan, while your team plans against the verbal agreement." },
      { id: "c", text: "Agree the hand-off content, acceptance standard, date and owner with the other Workstream Lead, and record it in the dependency log." },
      { id: "d", text: "Add a buffer to your own plan to allow for the hand-off being late, without reopening the conversation." },
    ],
    answer: "c",
  },
  {
    capability: "readiness",
    question: "What must be true before you can make a credible readiness claim for testing?",
    options: [
      { id: "a", text: "The team is confident it can recover the lost time, and the Workstream Executive supports the plan." },
      { id: "b", text: "The control design is accepted, the hand-off is agreed and evidenced, and capacity supports the forecast, or gaps are escalated." },
      { id: "c", text: "The control design has been drafted and shared, with acceptance tracked as a follow-up action." },
      { id: "d", text: "All open items are logged in RAID with owners, even if acceptance is still outstanding when testing starts." },
    ],
    answer: "b",
  },
];

/* ---------------- Module 2: mandate ---------------- */

export const SORT_ITEMS: { text: string; answer: "own" | "coordinate" | "escalate"; why: string }[] = [
  { text: "Reprioritising two workstream activities within agreed scope", answer: "own", why: "Prioritising resources and activities beneath agreed milestones sits with you." },
  { text: "Setting acceptance criteria for a workstream deliverable", answer: "own", why: "Activities, owners, milestones and acceptance criteria are part of your mandate." },
  { text: "Agreeing a hand-off date with another workstream", answer: "coordinate", why: "Hand-offs between workstreams are agreed jointly and tracked." },
  { text: "Confirming cost effects of a design change with Finance", answer: "coordinate", why: "You coordinate with Finance on costs, benefits and economic assumptions." },
  { text: "A choice that moves an integrated programme milestone", answer: "escalate", why: "Decisions that change programme scope, budget, timing or outcomes go to the right authority." },
  { text: "A significant regulatory risk you cannot reduce in the workstream", answer: "escalate", why: "Residual risk you cannot reduce to an acceptable level must be escalated." },
];

/* ---------------- Module 3: mobilise ---------------- */

export const MOBILISE_ACTIONS = [
  { title: "Confirm authority and context", good: "You know the objectives, scope, constraints, confidentiality limits and which decisions you can make.", evidence: "Confirmed appointment, decision limits, deputy and documented assumptions." },
  { title: "Test capacity and capability", good: "Named people have the skills and real availability, allowing for business-as-usual work. Gaps have an agreed response.", evidence: "Resource view, named owners, deputies and actions to close gaps." },
  { title: "Connect interfaces", good: "You have named contacts at the Central Hub, other workstreams, functions, countries and permitted counterparty teams.", evidence: "Interface directory and dependency owners." },
  { title: "Start controlled delivery", good: "A workstream rhythm, planning workshop, records and escalation route are set, and the team is briefed.", evidence: "Meeting cadence, access to controls, briefing record and open questions." },
];

export const MOBILISE_GAPS = [
  { id: "a", text: "You have not confirmed which decisions you can make without the Workstream Executive.", threat: true, feedback: "Without confirmed authority, every decision stalls or is taken at the wrong level." },
  { id: "b", text: "Two named specialists are committed full-time to a regulatory deadline this month.", threat: true, feedback: "A named team with no real capacity is not a mobilised team." },
  { id: "c", text: "The team briefing is booked for next Tuesday rather than this week.", threat: false, feedback: "Worth tightening, but a short delay to the briefing is recoverable." },
  { id: "d", text: "The status report format has not yet been shared with the team.", threat: false, feedback: "Needed soon, but it does not stop a credible start." },
];

/* ---------------- Module 4: plan ---------------- */

export const PLAN_PARTS = [
  { title: "Outcome", text: "What the activity must achieve, not just produce." },
  { title: "Owner", text: "One named person accountable for the activity." },
  { title: "Dates and sequence", text: "When it starts, finishes and what must come first." },
  { title: "Resources and capacity", text: "Who does the work and whether they are actually available." },
  { title: "Dependencies", text: "Inputs, decisions or activities this relies on, with their owners." },
  { title: "Acceptance and evidence", text: "The conditions that must be met before an output counts as complete, and the proof retained." },
  { title: "Risks and decisions", text: "What could change the forecast and which decisions are still needed." },
];

export const PLAN_WEAK = "Complete operating procedure by 14 June.";
export const PLAN_STEPS = [
  { label: "Add owners and sequence", text: "Operations Lead drafts the procedure by 10 June. The Control Owner reviews it by 13 June." },
  {
    label: "Add acceptance and evidence",
    text: "Operations Lead drafts the procedure by 10 June. The Control Owner reviews it by 13 June against the agreed control requirements. Completion is recorded only when approval is retained in the controlled workspace.",
  },
];

export const PLAN_LINE =
  "Migrate customer mandate data. Owner: Data Lead. Due: 22 July. Resources: two analysts at 50%.";
export const PLAN_MISSING = [
  { id: "a", text: "Dependency on the source data extract from another workstream", correct: true, feedback: "Without the extract the work cannot start, so the dependency and its owner must be visible." },
  { id: "b", text: "Acceptance criteria and who signs off the migrated data", correct: true, feedback: "Without acceptance, nobody can say when the migration is complete." },
  { id: "c", text: "A more detailed breakdown of the analysts' daily tasks", correct: false, feedback: "Useful for the team, but it does not decide whether the line is executable." },
  { id: "d", text: "A risk that analyst availability could fall", correct: false, feedback: "Relevant, but capacity is already stated. The missing hand-off and acceptance matter more." },
];

/* ---------------- Module 5: operate ---------------- */

export const RHYTHM = [
  { title: "Refresh the facts", text: "Update the plan, forecast, risks, dependencies and decisions." },
  { title: "Challenge progress and evidence", text: "Test progress, evidence and capacity with the people doing the work." },
  { title: "Resolve what sits within the workstream", text: "Fix what your mandate allows. Do not wait for a meeting." },
  { title: "Prepare decisions and escalations", text: "Frame what needs another authority, with options and a deadline." },
  { title: "Update the plan, status and records", text: "Publish a short status and record outcomes in the logs." },
];

export const STATUS_COMPARE = {
  activity: "Design is 90% complete.",
  useful:
    "Design content is drafted, but required approval is not booked. The current review lead time moves testing by two days unless an earlier slot is secured by Thursday.",
};

export const STATUS_EVIDENCE = [
  "Build is complete for 8 of 10 interfaces.",
  "The two remaining interfaces wait on a supplier fix due Friday.",
  "Integrated testing starts in six working days and needs all ten.",
];
export const STATUS_OPTIONS: Opt[] = [
  { id: "a", text: "Build is 80% complete and on track. Two interfaces are waiting on a supplier fix, which is being tracked as a risk.", feedback: "Reports activity, not the forecast outcome. The testing impact is hidden." },
  { id: "b", text: "Eight of ten interfaces are built. Testing holds only if the supplier fix lands by Friday; if not, start moves, and we need a decision on a fallback by Monday.", feedback: "Recommended. It states the forecast, the trigger and the decision needed." },
  { id: "c", text: "Two interfaces are blocked by the supplier, so the workstream is red until the fix is confirmed and tested.", feedback: "Visible, but it reports a rating without the forecast or the decision needed." },
  { id: "d", text: "Most interfaces are complete and the supplier expects to deliver the fix on Friday, so no programme action is needed yet.", feedback: "Leans on the supplier's confidence and delays a decision that has a clear deadline." },
];

/* ---------------- Module 6: decide ---------------- */

export const DECISION_SEQUENCE = [
  "Confirm the facts and evidence.",
  "Identify the effect on scope, timing, cost, value, control and other workstreams.",
  "Determine who has authority.",
  "Develop credible options and a recommendation.",
  "State the final useful decision date.",
  "Record and implement the outcome.",
];

export const ESCALATION_WEAK = "The data hand-off is late and may affect testing.";
export const ESCALATION_STRONG =
  "The hand-off is forecast three days late. One day can be absorbed; after that, integrated testing moves. Options are to add a weekend validation cycle at an estimated cost of R350,000 or move the test start by two days. The workstream recommends the weekend cycle. A programme decision is required by Wednesday.";
export const ECONOMICS_NOTE =
  "You do not own the overall business case, but you must make resource, supplier, benefit, delay and cost effects visible.";

export const ESCALATION_INFO = [
  "The supplier forecasts the extract five days late.",
  "Your team can absorb two days by resequencing.",
  "Options: extra supplier resource at R600,000, or move the test start by three days.",
  "The workstream recommends extra supplier resource.",
];
export const ESCALATION_MISSING: Opt[] = [
  { id: "a", text: "Who has authority to decide, and the last date the decision is still useful", feedback: "Recommended. Without the authority and a deadline, the options cannot become a decision in time." },
  { id: "b", text: "A fuller account of why the supplier is late", feedback: "Useful context, but it does not stop a decision being made." },
  { id: "c", text: "A third option so the choice looks balanced", feedback: "Only add options that are genuinely credible. Two real options are enough." },
  { id: "d", text: "Confirmation from the supplier that five days is their final forecast", feedback: "Worth seeking, but waiting for it could let the useful decision window close." },
];

/* ---------------- Module 7: readiness ---------------- */

export const READINESS_CHECK = [
  "Required outcomes are complete against agreed acceptance criteria.",
  "Testing is complete and material defects have an agreed treatment.",
  "Dependencies and hand-offs are confirmed.",
  "Cutover tasks, checkpoints, fallbacks and decision authority are executable.",
  "Remaining risk is understood and accepted by the correct authority.",
];

export const READINESS_RESOURCES = [
  "Workstream charter",
  "Detailed workstream plan",
  "Status report",
  "Risk, issue, action, dependency and decision records",
  "Test and readiness evidence",
  "Cutover runbook",
  "Go or no-go scorecard",
];

export const READINESS_TEMPLATE_WARNING =
  "These templates are not stored in the Capability Hub. Source the current approved versions from the programme team or controlled programme workspace.";

export const READINESS_STATEMENTS: Opt[] = [
  { id: "a", text: "Ready: all build tasks are closed and the team is confident the two open defects will be fixed in hypercare.", feedback: "Confidence is not evidence. The defects have no agreed treatment." },
  { id: "b", text: "Ready with conditions: testing met exit criteria, the one open defect has an accepted workaround signed by the control owner, and the fallback was rehearsed at live volume.", feedback: "Recommended. Each claim is backed by accepted evidence and the right authority." },
  { id: "c", text: "Conditionally ready: the fallback passed a desktop review, and we will rehearse it with operators after go-live if needed.", feedback: "The fallback is not yet proven with the people who would run it." },
  { id: "d", text: "Ready: the dependent workstream has said its interface will be delivered on time, so no hand-off risk remains.", feedback: "A verbal assurance is not a confirmed, accepted hand-off." },
];

export const PLAYBOOK_PROMPTS = [
  "What outcome am I accountable for?",
  "What evidence supports the current forecast?",
  "Which dependency or decision could change it?",
  "What sits within my authority?",
  "What must be escalated now?",
];

/* ---------------- Module 8: capstone ---------------- */

export const CAPSTONE = {
  title: "Four days to the readiness decision",
  intro: "Your workstream is approaching its readiness recommendation:",
  facts: [
    "required configuration is complete, but the evidence pack has not been accepted by the control owner;",
    "a dependent workstream expects to deliver an interface one day late, within the current schedule buffer, but no joint recovery trigger is agreed;",
    "a supplier proposes an additional requirement that may improve stability but adds cost and one week if adopted now; and",
    "the fallback procedure passed a desktop review but has not been rehearsed with the people who would operate it.",
  ],
  close:
    "The Workstream Executive believes the overall position can remain green if the open items are converted into conditions. The programme needs your recommendation today.",
  improved: "You are now applying the Workstream Lead role through mandate, evidence and programme impact, not activity alone.",
  review: "You have completed the pathway. Review the highlighted module before using the playbook in a live workstream decision.",
};

export const CAPSTONE_DECISIONS: Decision[] = [
  {
    capability: "plan",
    question: "How should completion and status be represented?",
    options: [
      { id: "a", text: "Report configuration as complete and green, and track control-owner acceptance as a time-bound follow-up action.", feedback: "Acceptance is part of completion, not a follow-up. This overstates the milestone." },
      { id: "b", text: "Separate built configuration from unaccepted evidence, and report the forecast against the agreed criteria with the owner and date for acceptance.", feedback: "Recommended. It protects the acceptance criteria and gives a usable forecast." },
      { id: "c", text: "Report red until the control owner accepts the evidence pack, and pause all related preparation work.", feedback: "Transparent, but a bigger response than needed while safe work can continue." },
      { id: "d", text: "Move acceptance into a later milestone so configuration can be closed, subject to baseline approval.", feedback: "Only valid if governance genuinely approves the change, not to quietly close the milestone." },
    ],
    answer: "b",
    reasoning: "The agreed milestone includes acceptance. Report what is done, what is not yet accepted, and what the forecast depends on.",
  },
  {
    capability: "dependencies",
    question: "How should the dependency and schedule buffer be controlled?",
    options: [
      { id: "a", text: "Accept the one-day slip because it sits within the buffer, and review again if the date moves further.", feedback: "The buffer absorbs it, but without a trigger nobody knows when to act." },
      { id: "b", text: "Ask the PMO to manage the interface date in the integrated plan while your team protects its own milestones.", feedback: "Recognises the PMO role but hands away ownership of the dependency." },
      { id: "c", text: "Agree with the other Workstream Lead a recovery trigger, a decision point and hand-off criteria, and record them in the dependency log.", feedback: "Recommended. It turns a verbal forecast into a controlled, jointly owned hand-off." },
      { id: "d", text: "Rebaseline your plan to the later date now, so the buffer is preserved for other risks.", feedback: "Cautious, but it rebaselines before recovery options have been tested." },
    ],
    answer: "c",
    reasoning: "Hand-offs between teams must be explicit, agreed and tracked, with a clear point at which the buffer is no longer enough.",
  },
  {
    capability: "mandate",
    question: "What should happen to the supplier's additional requirement?",
    options: [
      { id: "a", text: "Adopt it now using workstream contingency, because stability matters more than one week, and record it in RAID.", feedback: "Treats delegated tolerance as permission to change scope and timing." },
      { id: "b", text: "Quantify the cost, timing and stability effects, and take a recommendation to the authority that owns the scope and date.", feedback: "Recommended. The choice changes timing and cost, so it needs the right authority." },
      { id: "c", text: "Reject it for now to protect the date, and ask the supplier to raise it again during hypercare.", feedback: "Protects the date but makes a trade-off that is not yours to make alone." },
      { id: "d", text: "Ask the supplier to start preliminary design under the existing contract while the decision is considered.", feedback: "Creates commercial momentum before the decision basis is understood." },
    ],
    answer: "b",
    reasoning: "A change to cost and timing is outside the Workstream Lead's mandate. Frame it as a decision with options and a recommendation.",
  },
  {
    capability: "readiness",
    question: "What readiness recommendation should be made, and what must be escalated?",
    options: [
      { id: "a", text: "Recommend green with conditions, as the Workstream Executive suggests, and track the open items through hypercare.", feedback: "Converts unproven items into conditions without checking whether the evidence is enough." },
      { id: "b", text: "Recommend not ready until every item is fully closed, regardless of the agreed readiness criteria.", feedback: "May be right in the end, but skips the test of proportionality against the criteria." },
      { id: "c", text: "Give a conditional recommendation based on the controls the operators have agreed to run, leaving the fallback as it is.", feedback: "Relies on acceptance alone. The fallback has not been proven with the operators." },
      { id: "d", text: "Compare evidence with the criteria, state what is unproven, including the fallback rehearsal, and escalate remaining risk for acceptance by the right authority.", feedback: "Recommended. It gives an honest, evidence-based recommendation without taking the decision for others." },
    ],
    answer: "d",
    reasoning: "Readiness is an evidence-based recommendation. Unproven fallbacks and remaining risk must be made explicit and accepted by the correct authority.",
  },
];
