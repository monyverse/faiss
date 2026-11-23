/**
 * Bite-sized Workstream Project Manager pathway: module list, diagnostic,
 * teaching interactions and capstone. Adapted from the baseline content in
 * ./workstream-project-manager.ts following the supplied restructuring brief.
 */

export type CapabilityId = "mandate" | "plan" | "control" | "status";
export type Confidence = "Low" | "Medium" | "High";

export const MODULES = [
  { id: "starting-point", no: 1, title: "Your starting point", minutes: 4, purpose: "Diagnose judgement before teaching" },
  { id: "mandate", no: 2, title: "Control your mandate", minutes: 3, purpose: "Clarify the Project Manager's authority and boundaries" },
  { id: "plan", no: 3, title: "Build an executable plan", minutes: 5, purpose: "Turn outcomes into owned, connected and testable work" },
  { id: "control", no: 4, title: "Keep delivery controlled", minutes: 4, purpose: "Maintain risks, issues, actions, dependencies, decisions and changes" },
  { id: "report", no: 5, title: "Run and report", minutes: 4, purpose: "Create a useful rhythm, forecast and meeting record" },
  { id: "decide", no: 6, title: "Prepare decisions and escalation", minutes: 4, purpose: "Turn delivery facts into timely choices" },
  { id: "readiness", no: 7, title: "Support readiness and cutover", minutes: 4, purpose: "Organise evidence, testing, readiness and transition controls" },
  { id: "capstone", no: 8, title: "Put it into practice", minutes: 5, purpose: "Complete a capstone and compare it with the diagnostic" },
] as const;
export type ModuleId = (typeof MODULES)[number]["id"];
export const TEACHING_IDS: ModuleId[] = ["mandate", "plan", "control", "report", "decide", "readiness"];

export const CAPABILITIES: { id: CapabilityId; label: string; module: ModuleId }[] = [
  { id: "mandate", label: "Mandate and boundary", module: "mandate" },
  { id: "plan", label: "Executable plan", module: "plan" },
  { id: "control", label: "Dependencies and change control", module: "control" },
  { id: "status", label: "Status and escalation", module: "decide" },
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
  title: "Five weeks to integrated testing",
  intro: "The detailed workstream plan shows most activities as on track, but:",
  facts: [
    "several outputs have dates but no recorded acceptance standard;",
    "a supplier has proposed a change that the team has started assessing, but it is not in the change record;",
    "a dependency on another workstream is supported by a verbal agreement only; and",
    "the Workstream Lead wants to retain green status while the team works through the gaps.",
  ],
  close: "The weekly status report is due tomorrow.",
  message:
    "Several choices can look reasonable in isolation. The modules show how the Project Manager's controls, evidence and boundaries decide the best response.",
};

export const DIAGNOSTIC_DECISIONS: Decision[] = [
  {
    capability: "mandate",
    question: "The Workstream Lead wants to keep green. Where does your role start and stop?",
    options: [
      { id: "a", text: "Set the status yourself using the reporting definitions, because you produce the status report." },
      { id: "b", text: "Accept the Lead's view, because the Workstream Lead owns status and is accountable for recovery." },
      { id: "c", text: "Show the Lead the gaps, evidence and forecast effect, and ask them to confirm status against the definitions." },
      { id: "d", text: "Report green to the Lead and flag the gaps separately to the Central PMO as a programme risk." },
    ],
    answer: "c",
  },
  {
    capability: "plan",
    question: "What would make the plan executable rather than just dated?",
    options: [
      { id: "a", text: "Add a percentage-complete column so owners can show progress each week against each date." },
      { id: "b", text: "Agree acceptance criteria, owners and evidence for each output, and link them to the dependent dates." },
      { id: "c", text: "Break every activity into smaller tasks so each one can be tracked daily by the team." },
      { id: "d", text: "Add contingency to each date so outputs can be accepted later without moving the plan." },
    ],
    answer: "b",
  },
  {
    capability: "control",
    question: "How should the verbal dependency and the supplier's proposed change be handled?",
    options: [
      { id: "a", text: "Record the dependency with both owners and acceptance terms, and log the proposed change for assessment and approval." },
      { id: "b", text: "Leave both as they are until the team finishes assessing the change, then update all records together." },
      { id: "c", text: "Add the supplier change to the plan now so its timing is visible, and confirm the dependency next week." },
      { id: "d", text: "Ask the Central PMO to own the dependency and the supplier change, as both affect other teams." },
    ],
    answer: "a",
  },
  {
    capability: "status",
    question: "What status and escalation should you prepare?",
    options: [
      { id: "a", text: "Green with a commentary noting the open gaps, as the Lead expects to close them this week." },
      { id: "b", text: "Red, because acceptance standards, the change record and the dependency are all incomplete." },
      { id: "c", text: "Amber, set by you, with the Lead able to override the rating if they disagree." },
      { id: "d", text: "A forecast against the testing date showing each gap, its owner and the decision needed, for the Lead to confirm." },
    ],
    answer: "d",
  },
];

/* ---------------- Module 2: mandate ---------------- */

export type SortKey = "control" | "challenge" | "escalate";
export const SORT_ITEMS: { text: string; answer: SortKey; why: string }[] = [
  { text: "Updating the detailed plan after an agreed decision", answer: "control", why: "Keeping the plan current after a decision is part of your control role." },
  { text: "Preparing the pack and minutes for the workstream meeting", answer: "control", why: "Meeting preparation, records and action tracking sit with you." },
  { text: "An activity reported 90% complete with no proof of what is done", answer: "challenge", why: "Challenge progress that is not supported by evidence." },
  { text: "A dependency that only one side has accepted", answer: "challenge", why: "Dependencies must be accepted by both sides before they can be relied on." },
  { text: "The workstream needs an extra specialist to hold a milestone", answer: "escalate", why: "People, budget or specialist support needs the Workstream Lead." },
  { text: "Two owners give conflicting instructions on the same output", answer: "escalate", why: "Conflicting direction is a decision for the Workstream Lead, not a planning fix." },
];

/* ---------------- Module 3: plan ---------------- */

export const PLAN_PARTS = [
  { title: "Outcome", text: "What the activity must achieve, not just produce." },
  { title: "Owner", text: "One named person accountable for completing it." },
  { title: "Sequence and dates", text: "When it starts and finishes, and what must come first." },
  { title: "Capacity", text: "Whether the people doing the work are actually available." },
  { title: "Dependencies", text: "Inputs, decisions or activities it relies on, with their owners." },
  { title: "Acceptance and evidence", text: "The conditions that prove it is complete, who accepts it and the proof retained." },
  { title: "Decisions", text: "Choices still needed, who makes them and by when." },
];

export const PLAN_WEAK = "Reconciliation procedure: due 12 August.";
export const PLAN_STEPS = [
  { label: "Add owner, sequence and dependency", text: "Finance Analyst drafts the procedure by 6 August, using the approved account mapping from Data Migration due 1 August." },
  {
    label: "Add acceptance and evidence",
    text: "Finance Analyst drafts the procedure by 6 August, using the approved account mapping from Data Migration due 1 August. The Finance Control Owner accepts it by 12 August against the agreed control requirements. Completion is recorded only when the approval is filed in the controlled workspace.",
  },
];

export const PLAN_LINE =
  "Build customer notification letters. Owner: Comms Lead. Due: 30 September. Programme milestone: letters issued 7 October.";
export const PLAN_MISSING = [
  { id: "a", text: "The Legal and Compliance approval that must be given before the letters count as complete", correct: true, feedback: "Without the acceptance condition, 'done' cannot be tested and the milestone is exposed." },
  { id: "b", text: "The dependency on final customer data from Data Migration, with its owner and date", correct: true, feedback: "The letters cannot be produced without the data, so the hand-off must be visible and owned." },
  { id: "c", text: "Whether the Comms Lead has enough capacity alongside business-as-usual work", correct: false, feedback: "A fair question, but capacity can be tested once the inputs and acceptance are clear." },
  { id: "d", text: "A separate line for printing and posting after approval", correct: false, feedback: "Useful detail, but it does not stop the programme testing the line's effect on the milestone." },
];

/* ---------------- Module 4: control ---------------- */

export const CONTROL_TYPES = [
  { title: "Risk", text: "Something that may happen and would affect delivery." },
  { title: "Assumption", text: "Something treated as true for planning that has not been confirmed." },
  { title: "Issue", text: "Something that has happened and is affecting delivery now." },
  { title: "Dependency", text: "An input, decision or activity that another task relies on." },
  { title: "Action", text: "A task with an owner and date to resolve something." },
  { title: "Decision", text: "A choice made by the right owner, recorded with its reason and date." },
];

export const CONTROL_UPDATE = [
  "In yesterday's call, the Workstream Lead paused a lower-priority activity for one week to free a specialist for a critical milestone.",
  "Scope and programme dates are unchanged.",
  "Nothing has been recorded yet, and the specialist has already switched tasks.",
];
export const CONTROL_OPTIONS: Opt[] = [
  { id: "a", text: "Update the plan now, because the Lead owns workstream priorities, and add the reason at the next meeting.", feedback: "The change is within the Lead's authority, but the plan moves before the decision is traceable." },
  { id: "b", text: "Confirm the decision and affected owners with the Lead, record it in the decision log, then update the plan and actions.", feedback: "Recommended. It respects the Lead's authority and keeps a traceable record before the plan changes." },
  { id: "c", text: "Raise a change request to the Workstream Executive, because an activity has moved from the baseline.", feedback: "Scope and programme dates are unchanged, so this is within the Lead's authority, not a baseline change." },
  { id: "d", text: "Hold the plan until the Central PMO confirms the integrated programme is unaffected.", feedback: "The Central PMO does not own workstream priorities. Waiting leaves the record wrong." },
];

/* ---------------- Module 5: report ---------------- */

export const CYCLE = [
  { title: "Refresh facts", text: "Collect progress, evidence, dates, actions and decisions from each owner." },
  { title: "Challenge evidence", text: "Ask for proof, clearer owners and realistic recovery where information is weak." },
  { title: "Update the forecast", text: "Test whether remaining work, capacity and dependencies still support the dates." },
  { title: "Prepare the meeting", text: "Show what changed, what is at risk and what must be decided." },
  { title: "Record decisions", text: "Capture decisions, actions, owners and dates in the minutes and logs." },
  { title: "Update the plan", text: "Keep one controlled version and follow up before the next meeting." },
];

export const STATUS_COMPARE = {
  activity: "Supplier onboarding: 12 of 15 suppliers contacted this week. Team working hard to close the rest.",
  useful:
    "Three supplier contracts need novation before cutover. Two have not responded. If they have not signed by 14 October, cutover moves unless Procurement approves a temporary arrangement.",
};

export const STATUS_EVIDENCE = [
  "An owner reports a deliverable as 90% complete.",
  "The remaining work is approval from a control owner, who normally needs five days.",
  "The planned completion date is three days away and no review is booked.",
];
export const STATUS_OPTIONS: Opt[] = [
  { id: "a", text: "Deliverable 90% complete and on track. Urgent review requested from the control owner to hold the date.", feedback: "Relies on percentage complete. The approval lead time already exceeds the time left." },
  { id: "b", text: "Draft is ready but approval is not booked. At the usual five-day review, completion moves two days unless an earlier slot is secured by Thursday.", feedback: "Recommended. It states the forecast against the acceptance condition and the action needed." },
  { id: "c", text: "Amber: completion moved by two days to allow for review. The Workstream Lead is asked to accept the delay.", feedback: "May prove right, but it moves the date before recovery has been tested." },
  { id: "d", text: "Production complete. Control approval is tracked as a follow-up action after the completion date.", feedback: "Separates required approval from the definition of completion." },
];

/* ---------------- Module 6: decide ---------------- */

export const DECISION_PARTS = [
  "Facts and evidence",
  "Effects on scope, timing, cost, value and control",
  "Credible options",
  "Recommended option",
  "Decision owner",
  "Final useful decision date",
];

export const ESCALATION_WEAK = "The data file from the other workstream may be late and could affect testing.";
export const ESCALATION_STRONG =
  "The approved data file is forecast four days late and its acceptance standard is not yet agreed. Testing can absorb one day. Options: a weekend validation cycle, or moving the test start by three days. The workstream recommends the weekend cycle. The Workstream Lead needs to decide by Wednesday, with the Central PMO informed of any programme effect.";

export const PAPER = [
  { label: "Facts", text: "The supplying team gives a working date four days late. The acceptance standard is still unconfirmed." },
  { label: "Effect", text: "Testing can absorb one day. Beyond that, integrated testing and a programme milestone move." },
  { label: "Options", text: "A weekend validation cycle at extra cost, or moving the test start by three days." },
  { label: "Recommendation", text: "The weekend cycle, subject to the file meeting the agreed standard." },
];
export const PAPER_MISSING: Opt[] = [
  { id: "a", text: "Who owns the decision and the last date it is still useful", feedback: "Recommended. Without an owner and deadline the paper describes a choice nobody is required to make in time." },
  { id: "b", text: "A fuller explanation of why the supplying team is late", feedback: "Useful context, but it does not stop the decision being made." },
  { id: "c", text: "A third option so the choice looks balanced", feedback: "Only credible options belong in the paper. Two real options are enough." },
  { id: "d", text: "Written confirmation that four days is the final forecast", feedback: "Worth seeking, but waiting for it could close the decision window." },
];

/* ---------------- Module 7: readiness ---------------- */

export const READINESS_AREAS = [
  { title: "Accepted outputs", text: "Each required output is accepted against its criteria, with proof linked in the evidence index." },
  { title: "Test evidence and defects", text: "Tests met exit criteria. Open defects have an agreed treatment and owner." },
  { title: "Dependencies", text: "Hand-offs are delivered and accepted by the receiving team." },
  { title: "Cutover and rehearsals", text: "Runbook tasks, owners, checkpoints and decision points are current and rehearsed." },
  { title: "Fallbacks", text: "Fallback actions are agreed and proven with the people who would run them." },
  { title: "Handover", text: "Open actions transfer to hypercare or business-as-usual teams with named owners." },
];

export const READINESS_OPTIONS = [
  { id: "a", text: "Test exit report signed by the test manager", correct: true, feedback: "Proof that testing met the agreed exit criteria." },
  { id: "b", text: "Record of the dress rehearsal, including fallback timings", correct: true, feedback: "Shows the cutover and fallback were executed, not just planned." },
  { id: "c", text: "Defect log showing each open defect's agreed treatment and owner", correct: true, feedback: "Makes remaining defects visible and controlled." },
  { id: "d", text: "Team confirmation that remaining defects will be fixed in hypercare", correct: false, feedback: "Confidence is not evidence. Defects need an agreed treatment." },
  { id: "e", text: "A verbal update that the dependent interface is on time", correct: false, feedback: "A verbal assurance is not an accepted hand-off." },
  { id: "f", text: "Percentage complete for each cutover task", correct: false, feedback: "Shows activity, not whether the task is executable." },
];

export const PLAYBOOK_PROMPTS = [
  "Plan quality: does every critical activity have an owner, dependency and acceptance condition?",
  "Current forecast: what outcome is now forecast, and what evidence supports it?",
  "Open dependency: which hand-off is least certain, and who owns it on both sides?",
  "Required decision: what must be decided, by whom and by when?",
  "Evidence gap: which completion or readiness claim lacks accepted proof?",
  "Next change-control action: which proposed change needs assessing or recording now?",
];

/* ---------------- Module 8: capstone ---------------- */

export const CAPSTONE = {
  title: "Three days to the workstream readiness review",
  intro: "Your workstream is preparing for its readiness review:",
  facts: [
    "the output is built, but the approver has not accepted the evidence;",
    "a dependent interface is forecast one day late, within schedule buffer, but no recovery trigger is recorded;",
    "a supplier request could improve stability, but adds cost and requires a scope decision; and",
    "the cutover owner says the fallback is understood, although the operating team has not rehearsed it.",
  ],
  close: "The Workstream Lead needs your view to prepare the readiness recommendation.",
  improved: "You are now applying the Project Manager role through reliable controls, evidence and clear boundaries.",
  review: "You have completed the pathway. Review the highlighted module before using the playbook on a live workstream.",
};

export const CAPSTONE_DECISIONS: Decision[] = [
  {
    capability: "plan",
    question: "How should completion and status be recorded?",
    options: [
      { id: "a", text: "Record the output as complete and track evidence acceptance as a follow-up action with a date.", feedback: "Acceptance is part of completion. This overstates the milestone." },
      { id: "b", text: "Show the output as built but not complete against its acceptance criteria, with the approver and forecast date.", feedback: "Recommended. It keeps completion tied to the agreed condition and gives a usable forecast." },
      { id: "c", text: "Move acceptance into a later milestone so the build milestone can close on time.", feedback: "Only valid through approved change control, not to close a milestone quietly." },
      { id: "d", text: "Report the output as red and pause related readiness work until the approver responds.", feedback: "Visible, but a bigger response than needed while safe work can continue." },
    ],
    answer: "b",
    reasoning: "The plan defines completion by acceptance and evidence, not by production alone.",
  },
  {
    capability: "control",
    question: "How should the late interface be controlled?",
    options: [
      { id: "a", text: "Accept the slip because it is within buffer, and review it again if the date moves further.", feedback: "The buffer absorbs it today, but without a trigger nobody knows when to act." },
      { id: "b", text: "Rebaseline the plan to the later date now so the buffer is kept for other risks.", feedback: "Changes the baseline before recovery options are tested or approved." },
      { id: "c", text: "Agree a recovery trigger, decision point and hand-off criteria with the supplying team, and record them in the dependency log.", feedback: "Recommended. It turns a forecast into a controlled, jointly owned hand-off." },
      { id: "d", text: "Ask the Central PMO to manage the interface date while you protect your own milestones.", feedback: "Recognises the programme view but hands away control of the dependency." },
    ],
    answer: "c",
    reasoning: "A dependency is controlled when both sides agree what is delivered, when, and at what point the buffer is no longer enough.",
  },
  {
    capability: "mandate",
    question: "How should the supplier request enter the decision process?",
    options: [
      { id: "a", text: "Add it to the plan as a provisional activity so its delivery effect stays visible while it is discussed.", feedback: "Changes the plan before anyone with authority has decided." },
      { id: "b", text: "Record it as a proposed change, assess its cost, timing, scope and stability effects, and route it to the approving authority.", feedback: "Recommended. You control the assessment and record; the authorised owner decides." },
      { id: "c", text: "Decline it for now to protect the review date, and ask the supplier to raise it in hypercare.", feedback: "Makes a scope trade-off that is not the Project Manager's to make." },
      { id: "d", text: "Ask the supplier to start preliminary work at risk so the time is not lost.", feedback: "Creates cost and scope exposure before authority is confirmed." },
    ],
    answer: "b",
    reasoning: "Useful changes are not automatically approved. The baseline holds until the right owner decides.",
  },
  {
    capability: "status",
    question: "What readiness information should you give the Workstream Lead?",
    options: [
      { id: "a", text: "A recommendation of ready with conditions, since the cutover owner is confident in the fallback.", feedback: "Makes the recommendation for the Lead and relies on confidence rather than proof." },
      { id: "b", text: "A list of open actions, so the Lead can decide which to convert into conditions.", feedback: "Useful, but without evidence status and decisions it does not support a recommendation." },
      { id: "c", text: "A request to delay the review until every item is closed, to avoid a conditional result.", feedback: "Pre-empts a decision that belongs to the Lead and governance." },
      { id: "d", text: "An evidence view showing what is accepted, what is unproven, including the unrehearsed fallback, and the decisions needed.", feedback: "Recommended. It gives the Lead a reliable basis for their recommendation." },
    ],
    answer: "d",
    reasoning: "The Project Manager maintains the evidence and control view. The Workstream Lead owns the readiness recommendation.",
  },
];
