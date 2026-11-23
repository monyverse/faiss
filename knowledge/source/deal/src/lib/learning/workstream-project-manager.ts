/** Content for the Workstream Project Manager role pathway. Copy is the supplied baseline. */

export const SECTIONS = [
  { id: "role", label: "Your role" },
  { id: "mandate", label: "Mandate" },
  { id: "start", label: "Start well" },
  { id: "operate", label: "Operate" },
  { id: "apply", label: "Apply" },
  { id: "resources", label: "Resources" },
  { id: "check", label: "Check" },
  { id: "playbook", label: "Playbook" },
] as const;
export type SectionId = (typeof SECTIONS)[number]["id"];

export const LEARNING_OUTCOMES = [
  "distinguish your role from the Workstream Lead and central PMO;",
  "build and maintain an executable detailed workstream plan;",
  "keep risks, issues, actions, decisions and dependencies controlled;",
  "challenge progress using evidence and forecast dates;",
  "prepare effective workstream meetings and status reports;",
  "raise decisions and trade-offs to the correct owner;",
  "control changes to scope, dates, cost and required evidence; and",
  "support testing, readiness, cutover and hypercare planning.",
];

export const ROLES = [
  {
    id: "pm",
    name: "Workstream Project Manager",
    text: "Maintains the plan and delivery controls. Coordinates updates, challenges gaps and prepares reliable workstream reporting.",
  },
  {
    id: "lead",
    name: "Workstream Lead",
    text: "Owns the workstream outcome, scope, priorities and functional decisions. The Project Manager provides the facts needed for those decisions.",
  },
  {
    id: "members",
    name: "Workstream Team Members",
    text: "Complete assigned activities, provide specialist input and produce evidence. The Project Manager coordinates their plan updates and follows up actions.",
  },
  {
    id: "exec",
    name: "Workstream Executive",
    text: "Makes major workstream choices, removes senior blockers and approves matters that need executive authority.",
  },
  {
    id: "pmo",
    name: "Central PMO",
    text: "Maintains the single programme view across all workstreams. The Workstream Project Manager provides controlled workstream information and receives programme dates, standards and decisions.",
  },
];

export type MandateKey = "control" | "challenge" | "escalate";

export const MANDATE: Record<MandateKey, { label: string; lead: string; items: string[]; note?: string }> = {
  control: {
    label: "Control",
    lead: "You own the coordination and quality of:",
    items: [
      "the detailed workstream plan, also called the L2 plan;",
      "dates, owners, activities and completion conditions;",
      "workstream actions, risks, issues, assumptions and dependencies;",
      "the decision log and follow-up of agreed decisions;",
      "workstream meeting preparation, minutes and action tracking;",
      "status-report production and evidence links;",
      "alignment between the workstream plan and programme milestones;",
      "document versions, reporting deadlines and controlled records; and",
      "planning inputs for testing, dress rehearsals, cutover and hypercare.",
    ],
  },
  challenge: {
    label: "Challenge",
    lead: "You should challenge:",
    items: [
      "activities with no clear outcome or owner;",
      "dates that are not supported by capacity or dependencies;",
      "progress reported as a percentage without proof of what is complete;",
      "green status that conflicts with late actions or missing evidence;",
      "risks or issues without a clear response and deadline;",
      "dependencies that are not accepted by both sides;",
      "decisions with no named owner or required date;",
      "tasks reported complete before the acceptance criteria are met; and",
      "changes made outside the agreed change-control process.",
    ],
    note: "Challenge the quality of the information. Do not replace the judgement of the person who owns the decision.",
  },
  escalate: {
    label: "Escalate",
    lead: "Raise the matter to the Workstream Lead when:",
    items: [
      "a priority or functional decision is required;",
      "the agreed scope, outcome or acceptance criteria may change;",
      "the workstream needs more people, budget or specialist support;",
      "a dependency threatens a programme milestone;",
      "a risk or issue needs executive or specialist authority;",
      "two owners give conflicting instructions;",
      "reported status does not match the available evidence;",
      "the same action repeatedly misses its date; or",
      "the decision deadline is approaching and the owner has not acted.",
    ],
    note: "Raise transaction-wide planning and dependency matters through the Central PMO after aligning with the Workstream Lead.",
  },
};

export const BOUNDARY =
  "change functional scope, reprioritise workstream outcomes, approve extra budget, accept material risk, make specialist decisions or provide the final readiness recommendation.";

export const AUTHORITY_TEST = [
  "Is this an update to an agreed fact or control?",
  "Does it leave scope, outcome, cost, timing and acceptance criteria unchanged?",
  "Has the accountable owner already made the underlying decision?",
  "Can another person trace why the record changed?",
];

export const START_STEPS = [
  {
    title: "Understand the workstream outcome",
    confirm: "Read the workstream charter and confirm the scope, required outcomes, main constraints and important transaction dates.",
    good: "You can explain what the workstream must deliver and which decisions remain open.",
  },
  {
    title: "Agree how you will work with the Workstream Lead",
    confirm: "Agree how often you will review the plan, who approves status, which decisions need the Lead and how urgent issues will be raised.",
    good: "Planning support and functional accountability are clearly separated.",
  },
  {
    title: "Build the detailed plan",
    confirm: "Create the detailed workstream plan, also called the L2 plan. Include activities, owners, dates, dependencies and acceptance criteria.",
    good: "Each owner understands the task, due date and proof required for completion.",
  },
  {
    title: "Connect to the programme plan",
    confirm: "Confirm the programme milestones, critical path and required hand-offs. The critical path is the work that directly determines the overall delivery date.",
    good: "The workstream plan supports the programme dates, and every important interface has an owner.",
  },
  {
    title: "Establish the control logs",
    confirm: "Set up the agreed records for actions, decisions, and RAID. RAID means risks, assumptions, issues and dependencies.",
    good: "Each item has a clear description, owner, date, response and route for raising it if needed.",
  },
  {
    title: "Set the reporting and meeting rhythm",
    confirm: "Confirm meeting dates, update deadlines, report format, status definitions, pack ownership, minutes and action follow-up.",
    good: "The team knows when information is due and the Workstream Lead has time to review it before programme reporting.",
  },
  {
    title: "Set up evidence and change control",
    confirm: "Agree where evidence is stored and how scope, date, cost or acceptance changes will be assessed and approved.",
    good: "The team can trace the approved plan, each change and the evidence behind reported completion.",
  },
];

/** level: 1 targeted … 4 highest */
export const INTENSITY = [
  { period: "Mobilisation and planning", intensity: "Highest", level: 4, text: "Build the detailed plan, controls, meeting rhythm and programme links." },
  { period: "Programme execution", intensity: "Highest", level: 4, text: "Maintain the forecast, follow up actions and control risks and dependencies." },
  { period: "Testing and dress rehearsals", intensity: "High", level: 3, text: "Coordinate plans, evidence, defects and recovery actions." },
  { period: "Readiness and cutover", intensity: "High", level: 3, text: "Maintain readiness actions and the timed runbook plan." },
  { period: "Hypercare and handover", intensity: "Medium to high", level: 2, text: "Track daily issues, remaining actions and transfer to normal teams." },
];

export const WEEKLY_CYCLE = [
  { title: "Gather updates", text: "Collect progress, evidence, new dates, actions, decisions and changes from each owner." },
  { title: "Test the forecast", text: "Check whether the remaining work, capacity and dependencies still support the planned dates." },
  { title: "Update the controls", text: "Update the detailed plan, actions, decisions, RAID and evidence links. Keep one controlled version." },
  { title: "Challenge gaps", text: "Ask for evidence, clearer owners, realistic recovery actions and decisions where information is weak." },
  { title: "Prepare the workstream meeting", text: "Show what changed, which outcomes are at risk and what the Workstream Lead or Executive must decide." },
  { title: "Publish and follow through", text: "Issue the agreed status and actions. Update the records after decisions and follow up before the next meeting." },
];

export const PLAN_QUALITY = [
  "What outcome does this activity support?",
  "Who owns it?",
  "When will it start and finish?",
  "What input or decision does it rely on?",
  "What output will it produce?",
  "What conditions prove it is complete?",
  "Who receives or accepts the output?",
  "What happens if it is late?",
];

export const RAID_ITEMS = [
  "a clear statement of the event or uncertainty;",
  "the outcome, customer, control, cost or date it may affect;",
  "an owner and target date;",
  "the action or response;",
  "current status and how long it has been open;",
  "the decision or support needed; and",
  "proof required before closure.",
];

export const MEETING_BEFORE = [
  "reconcile the plan and status;",
  "identify overdue or ageing items;",
  "confirm the decisions required;",
  "state the options and delivery effect;",
  "identify the decision owner and required date; and",
  "prepare proposed actions and owners.",
];

export const CHANGE_ITEMS = [
  "record what is changing and why;",
  "identify the effect on outcomes, dates, dependencies and evidence;",
  "include people, supplier and cost effects;",
  "identify the person who can approve it;",
  "keep the existing baseline until approval is given; and",
  "update all affected records after the decision.",
];

export const ECONOMICS = [
  "resource and capacity assumptions;",
  "supplier costs and commitments;",
  "costed actions and remediation;",
  "requests for extra budget;",
  "scope growth and repeated additions;",
  "rework, repeated testing or extended support;",
  "delays that extend programme activity; and",
  "changes that may delay benefits or increase customer loss.",
];

export interface Choice { key: string; text: string }
export interface Scenario { title: string; situation: string; options: Choice[]; answer: string; feedback: string }

export const SCENARIOS: Scenario[] = [
  {
    title: "A changed priority",
    situation:
      "The Workstream Lead asks the team to pause a lower-priority activity for one week. The change releases a specialist for a critical milestone. It does not change the workstream scope or any programme date. The request is made during a call and is not yet recorded.",
    options: [
      { key: "A", text: "Update the plan immediately because the Workstream Lead owns workstream priorities, then record the reason at the next meeting." },
      { key: "B", text: "Confirm the decision and affected owners with the Workstream Lead, record it and update the plan and actions." },
      { key: "C", text: "Ask the Workstream Executive to approve the change because it moves an activity from the current baseline." },
      { key: "D", text: "Keep the plan unchanged until the Central PMO confirms that the integrated programme is unaffected." },
    ],
    answer: "B",
    feedback:
      "Option B respects the Workstream Lead's authority and keeps the control record complete. Option A updates the plan before the decision is traceable. Option C raises a change that remains within the Lead's stated authority. Option D asks the Central PMO to approve a workstream priority it does not own.",
  },
  {
    title: "Ninety per cent complete",
    situation:
      "An activity owner reports that a deliverable is 90% complete. The remaining work is approval from a control owner. No meeting is booked, and the planned completion date is three days away. The control owner normally needs five days to review.",
    options: [
      { key: "A", text: "Keep the date because most of the production work is complete and request an urgent review from the control owner." },
      { key: "B", text: "Change the status to amber, move the completion date by two days and ask the Workstream Lead to accept the delay." },
      { key: "C", text: "Confirm the approval requirement and review time, secure a response plan and report the forecast based on whether approval can still be achieved." },
      { key: "D", text: "Record production as complete and track control approval as a separate action after the planned completion date." },
    ],
    answer: "C",
    feedback:
      "Option C tests the remaining work against the actual acceptance condition. Option A relies on percentage complete rather than forecast. Option B may prove correct but changes status and date before testing recovery. Option D separates required approval from the definition of completion.",
  },
  {
    title: "A cross-workstream dependency",
    situation:
      "Your workstream needs an approved data file from another workstream before testing. Its Project Manager provides a working date but cannot confirm the acceptance standard. The integrated programme plan still shows the earlier date used during mobilisation.",
    options: [
      { key: "A", text: "Use the working date in your detailed plan and ask the Central PMO to update the integrated programme plan." },
      { key: "B", text: "Retain the approved programme date until the supplying Workstream Lead confirms a formal change." },
      { key: "C", text: "Agree the required file, acceptance conditions and forecast with the supplying team, then show any remaining programme effect through both Workstream Leads and the Central PMO." },
      { key: "D", text: "Add schedule contingency to your testing activity so the workstream can absorb either delivery date." },
    ],
    answer: "C",
    feedback:
      "Option C resolves both the date and what must be delivered before updating the programme view. Option A may spread an unconfirmed assumption. Option B protects the baseline but ignores newer information. Option D may help recovery but does not resolve the dependency or its ownership.",
  },
  {
    title: "Pressure to keep green",
    situation:
      "The Workstream Lead believes a missing evidence pack will arrive before the reporting deadline and wants to retain green status. The evidence owner has not committed to a date. Current activities are otherwise on plan.",
    options: [
      { key: "A", text: "Retain green because the Workstream Lead owns status and expects recovery before the deadline." },
      { key: "B", text: "Set amber because the evidence date is not confirmed and allow the Workstream Lead to override the rating." },
      { key: "C", text: "Show the evidence gap, forecast effect and required decision date, then ask the Workstream Lead to confirm the status against the agreed definitions." },
      { key: "D", text: "Keep green in the workstream report but flag the uncertainty separately to the Central PMO." },
    ],
    answer: "C",
    feedback:
      "Option C gives the Workstream Lead a clear evidence-based decision. Option A records optimism without a committed recovery. Option B makes the Project Manager the status decision-maker. Option D creates two different versions of the workstream position.",
  },
  {
    title: "A supplier change",
    situation:
      "A supplier identifies an additional requirement during delivery. It may add R600,000 and one week. The Workstream Lead agrees the requirement is useful, but it is not in the approved scope. The supplier needs direction within two days.",
    options: [
      { key: "A", text: "Add the requirement to the plan because the Workstream Lead supports it, then raise a budget request for the extra cost." },
      { key: "B", text: "Keep it outside the plan until cost and timing are fixed, avoiding an uncertain change request." },
      { key: "C", text: "Record the proposed change, show its cost, timing, value and dependency effects, and prepare it for the agreed approval route." },
      { key: "D", text: "Ask the supplier to begin the work at risk so the programme does not lose the available week." },
    ],
    answer: "C",
    feedback:
      "Option C creates a decision-ready change request without treating support as approval. Option A changes the baseline too early. Option B protects control but may waste the two-day decision window. Option D creates cost and scope exposure before authority is confirmed.",
  },
];

export const RESOURCE_NOTICE =
  "The templates named in this module are not stored in the Capability Hub. Get the current approved versions from the Central PMO, programme team or controlled programme workspace.";

export const CORE_RESOURCES = [
  { name: "Workstream charter, brick and blueprint", purpose: "Define the workstream outcome, scope, process changes and main delivery activities.", when: "Before building the detailed plan and when scope or purpose is unclear." },
  { name: "Integrated programme plan extract", purpose: "Shows the programme milestones, critical path and cross-workstream dates that the workstream must support.", when: "When creating or updating the detailed workstream plan." },
  { name: "Detailed workstream or L2 plan", purpose: "Records activities, owners, dates, dependencies and acceptance criteria.", when: "Maintain throughout planning, execution, readiness, cutover and handover." },
  { name: "RAID, action, decision and dependency logs", purpose: "Keep delivery risks, actions, decisions and interfaces traceable.", when: "Maintain continuously and update after decisions or material changes." },
  { name: "Workstream status report", purpose: "Shows current forecast, evidence, exceptions and decisions required.", when: "At the agreed reporting cadence and when a material condition changes." },
  { name: "Governance calendar and terms of reference", purpose: "Explain meeting dates, attendees, authority, inputs and outputs.", when: "When planning packs, decisions and escalation." },
  { name: "Meeting pack, minutes and action record", purpose: "Prepare focused discussion and retain decisions, actions, owners and dates.", when: "Before and after every formal workstream meeting." },
  { name: "Evidence index", purpose: "Links milestones and readiness conditions to the evidence and approvals that support them.", when: "During delivery, testing and readiness reporting." },
  { name: "Change request and impact assessment", purpose: "Records a proposed change and its effect on scope, timing, cost, dependencies and evidence.", when: "Before changing an approved baseline." },
];

export const RELEVANT_RESOURCES = [
  { name: "Test plan and defect log", text: "Coordinate test dates, owners, results, failed outcomes, retesting and closure evidence." },
  { name: "Dress-rehearsal and cutover runbook", text: "Coordinate the timed sequence, owners, checkpoints, dependencies and fallback actions." },
  { name: "Cutover checklist and checkpoint report", text: "Record completion, exceptions and decisions during live execution." },
  { name: "Hypercare status and issue log", text: "Track early operational issues, actions, trends and transfer to normal teams." },
];

export const MATCHING = [
  { need: "Connect workstream dates to programme milestones", resource: "Integrated programme plan extract" },
  { need: "Show detailed activities and owners", resource: "Detailed workstream or L2 plan" },
  { need: "Record a proposed scope or budget change", resource: "Change request and impact assessment" },
  { need: "Show whether a milestone has acceptable proof", resource: "Evidence index" },
  { need: "Track an unresolved interface with another team", resource: "Dependency log" },
];

export interface Question { q: string; options: Choice[]; answer: string; feedback: string }

export const QUESTIONS: Question[] = [
  {
    q: "A workstream priority must change, but scope and programme dates are unaffected. Who should make the priority decision?",
    options: [
      { key: "A", text: "The Workstream Project Manager, because the change affects the detailed plan." },
      { key: "B", text: "The Workstream Lead, using the planning impact prepared by the Project Manager." },
      { key: "C", text: "The Central PMO, because it owns the integrated programme plan." },
      { key: "D", text: "The Workstream Executive, because every baseline movement needs executive approval." },
    ],
    answer: "B",
    feedback: "The Workstream Lead owns workstream priorities. The Project Manager shows the delivery effect and records the decision.",
  },
  {
    q: "An owner reports an activity as complete, but required approval is missing. What should the plan show?",
    options: [
      { key: "A", text: "Complete, with approval recorded as a separate follow-up action." },
      { key: "B", text: "Complete for production and incomplete for readiness." },
      { key: "C", text: "Not complete against the agreed acceptance criteria, with the approval owner and forecast date shown." },
      { key: "D", text: "The percentage complete selected by the activity owner." },
    ],
    answer: "C",
    feedback: "Completion depends on the agreed conditions and evidence, not only on production activity.",
  },
  {
    q: "When should a dependency be raised to the Central PMO?",
    options: [
      { key: "A", text: "When it affects or may affect another workstream or a programme milestone and cannot be resolved within the workstream." },
      { key: "B", text: "As soon as another workstream owns any input to the detailed plan." },
      { key: "C", text: "Only after both Workstream Leads confirm that the programme date will move." },
      { key: "D", text: "When the supplying workstream misses the agreed delivery date." },
    ],
    answer: "A",
    feedback: "Raise the dependency while the programme can still coordinate recovery. Keep routine interfaces within the workstream route where they remain controlled.",
  },
  {
    q: "The Workstream Lead expects an evidence gap to close before reporting. What is the Project Manager's role?",
    options: [
      { key: "A", text: "Accept the Lead's judgement and keep the gap out of reporting unless the deadline is missed." },
      { key: "B", text: "Set the status independently using the agreed reporting definition." },
      { key: "C", text: "Show the evidence, forecast and decision point so the Workstream Lead can confirm an informed status." },
      { key: "D", text: "Ask the Central PMO to determine the workstream rating." },
    ],
    answer: "C",
    feedback: "The Project Manager provides a controlled, evidence-based view. The Workstream Lead remains accountable for the workstream status.",
  },
  {
    q: "A proposed requirement adds value but also adds cost and time. What should happen before it enters the plan?",
    options: [
      { key: "A", text: "The Workstream Lead should confirm that the value justifies the change." },
      { key: "B", text: "The Project Manager should add a provisional activity so the delivery effect remains visible." },
      { key: "C", text: "The team should complete enough design to replace the estimate with a fixed cost." },
      { key: "D", text: "The change should be assessed and approved through the agreed authority using its cost, timing and delivery effects." },
    ],
    answer: "D",
    feedback: "A useful requirement is not automatically approved. The Project Manager controls the assessment and record while the authorised owner decides.",
  },
];

export const PLAYBOOK = [
  {
    title: "Before accepting the detailed plan",
    items: [
      "Does each activity support a clear outcome?",
      "Are owners, dates and dependencies agreed?",
      "Are acceptance criteria clear?",
      "Has resource capacity been tested?",
      "Do workstream dates support programme milestones?",
      "Are testing, readiness, cutover and handover activities included?",
    ],
  },
  {
    title: "Before the weekly workstream meeting",
    items: [
      "Is the detailed plan current?",
      "Which dates or forecasts changed?",
      "Are actions, risks, issues and dependencies up to date?",
      "Which items are overdue or ageing?",
      "What decisions are needed, from whom and by when?",
      "Does the Workstream Lead agree the proposed status?",
    ],
  },
  {
    title: "Before reporting progress",
    items: [
      "Does status reflect forecast and evidence rather than activity?",
      "Are completion claims supported by acceptance criteria?",
      "Are cross-workstream dependencies visible?",
      "Are recovery actions realistic and owned?",
      "Are cost, resource or customer effects included?",
      "Is the programme ask clear?",
    ],
  },
  {
    title: "Before raising an issue or decision",
    items: [
      "What happened or may happen?",
      "Which outcome, control, cost or date is affected?",
      "What evidence supports the view?",
      "What options and recovery actions exist?",
      "Who owns the decision?",
      "What is the last useful decision date?",
    ],
  },
  {
    title: "Before changing the plan",
    items: [
      "Is this a factual update or a change to the approved baseline?",
      "Has the accountable owner made the decision?",
      "Have scope, cost, timing and dependency effects been assessed?",
      "Is the decision recorded?",
      "Have all affected plans and logs been updated?",
      "Have affected owners been told?",
    ],
  },
  {
    title: "Before readiness or cutover",
    items: [
      "Are readiness conditions linked to evidence and approvals?",
      "Are defects, workarounds and remaining risks visible?",
      "Are runbook tasks, owners and dependencies current?",
      "Have fallback actions and checkpoints been agreed?",
      "Is the status consistent with the evidence?",
      "Are open actions controlled through hypercare or normal teams?",
    ],
  },
];

export const PRINCIPLES = [
  "Keep one controlled and current workstream plan.",
  "Report forecast and evidence, not activity alone.",
  "Make every owner, dependency and completion condition clear.",
  "Challenge weak information without taking the decision.",
  "Keep the Workstream Lead accountable for priorities and outcomes.",
  "Raise issues before recovery time disappears.",
  "Control changes before updating the baseline.",
  "Turn every decision into recorded action.",
];

export const GLOSSARY = [
  { term: "Scope", def: "The work and outcomes included in the workstream." },
  { term: "Detailed workstream plan (L2 plan)", def: "The plan showing activities, owners, dates, dependencies and completion conditions." },
  { term: "Acceptance criteria", def: "The conditions that must be met before an output is accepted as complete." },
  { term: "Dependency", def: "An input, decision or activity that another task relies on." },
  { term: "RAID", def: "Risks, assumptions, issues and dependencies." },
  { term: "RAG status", def: "Red, amber or green status." },
  { term: "Baseline", def: "The approved scope, plan or budget used to measure progress." },
  { term: "Change control", def: "The agreed process for assessing and approving a change to that baseline." },
  { term: "Critical path", def: "The activities and dependencies that directly determine the overall delivery date." },
  { term: "Readiness evidence", def: "Proof that the required people, processes, technology, data and controls are ready." },
  { term: "Residual risk", def: "Risk that remains after the agreed actions or controls have been applied." },
  { term: "Escalation", def: "Raising a matter to someone with the authority or support needed to resolve it." },
  { term: "Dress rehearsal", def: "A practice run before live execution." },
  { term: "Cutover", def: "The controlled move from the current state to the new operating state." },
  { term: "Runbook", def: "The timed plan of cutover tasks, owners, dependencies and fallback actions." },
  { term: "Hypercare", def: "The period of extra monitoring and support immediately after cutover." },
  { term: "Programme management office (PMO)", def: "The central team that maintains programme planning, reporting and delivery controls." },
  { term: "Business case", def: "The expected costs, benefits and value of the deal." },
];
