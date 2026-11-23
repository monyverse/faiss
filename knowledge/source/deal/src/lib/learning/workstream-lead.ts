/** Content for the Workstream Lead role pathway. Copy is the supplied baseline. */

export const SECTIONS = [
  { id: "role", label: "Your role" },
  { id: "mandate", label: "Mandate" },
  { id: "mobilise", label: "Start Well" },
  { id: "operate", label: "Operate" },
  { id: "apply", label: "Apply" },
  { id: "resources", label: "Resources" },
  { id: "check", label: "Check" },
  { id: "playbook", label: "Playbook" },
] as const;
export type SectionId = (typeof SECTIONS)[number]["id"];

export const LEARNING_OUTCOMES = [
  "explain what you own, what you coordinate and what you must escalate;",
  "mobilise a workstream with the right authority, people and controls;",
  "run an effective weekly delivery rhythm;",
  "report progress using evidence, not just a list of activity;",
  "manage dependencies and raise cost or schedule impacts early; and",
  "give a clear, evidence-based readiness recommendation.",
];

export const ROLES = [
  {
    id: "lead",
    name: "Workstream Lead",
    text: "You own delivery for your function: the detailed plan, functional decisions within your mandate, readiness evidence and the workstream's status.",
  },
  {
    id: "pm",
    name: "Workstream PM",
    text: "The Workstream PM keeps the detailed plan and governance on track, maintains delivery controls, and prepares you to report. The Workstream PM does not make your decisions and does not carry your accountability.",
  },
  {
    id: "exec",
    name: "Workstream Executive",
    text: "The Workstream Executive is accountable for the workstream outcome, removes blockers, approves major workstream trade-offs, and signs off decisions or deliverables that need executive authority.",
  },
  {
    id: "hub",
    name: "Central Hub and PMO",
    text: "The Central Hub is the central Inorganic Change team that coordinates the overall programme, including the single programme plan that combines all workstreams (the integrated programme plan), governance, standards, quality checks, cross-workstream coordination and reporting to senior leaders. It does not own your function's delivery.",
  },
];

export const MANDATE = {
  own: {
    label: "Own",
    lead: "You own:",
    items: [
      "the workstream scope, backlog, outcomes and deliverables;",
      "the detailed workstream plan that sits beneath the programme milestones;",
      "workstream activities, owners, milestones and acceptance criteria (the conditions that must be met before an output is accepted as complete);",
      "mobilising and prioritising functional specialists and delivery resources;",
      "workstream risks, issues, assumptions and dependencies (an input, decision or activity that another task relies on) — together known as RAID;",
      "functional decisions that fall within your delegated authority (the decisions you have been formally authorised to make);",
      "testing, operational readiness and cutover (the controlled move from the current state to the new operating state) activities assigned to the workstream;",
      "the quality of evidence used to support status and readiness; and",
      "timely, accurate reporting of progress, forecast, risks and exceptions.",
    ],
  },
  coordinate: {
    label: "Coordinate",
    lead: "You coordinate with:",
    items: [
      "the Workstream Executive on outcomes, trade-offs and matters needing executive authority;",
      "the Workstream PM on planning, controls, governance and reporting;",
      "the Central Hub and PMO on integrated milestones, standards and dependencies between workstreams;",
      "other Workstream Leads where an output from one workstream feeds into another;",
      "functional, regional and specialist teams that contribute to delivery;",
      "Finance on costs, benefits and changes to economic assumptions; and",
      "the relevant counterparty workstream where you are permitted and required to engage.",
    ],
  },
  escalate: {
    label: "Escalate",
    lead: "Escalate (raise the matter to someone with the authority or support needed to resolve it) promptly when:",
    items: [
      "a decision would change programme scope, budget, timing or agreed outcomes;",
      "a workstream trade-off needs executive judgement;",
      "a critical dependency is unresolved or threatens the critical path (the activities and dependencies that directly determine the delivery date);",
      "you do not have enough capacity, capability or specialist support;",
      "a regulatory, legal, customer or colleague risk may be significant;",
      "readiness evidence (proof that the required people, processes, technology, data and controls are ready) is missing, weak or does not match the reported status;",
      "a residual risk (risk that remains after the agreed controls or actions have been applied) cannot be reduced to an acceptable level within the workstream; or",
      "a decision is outside your mandate.",
    ],
  },
} as const;
export type MandateKey = keyof typeof MANDATE;

export const BOUNDARY =
  "the integrated programme plan, the transaction business case, formal go or no-go authority (the formal decision on whether the transaction is ready and safe to proceed), reserved approvals (decisions that must remain with a named senior, central or specialist authority), or legal transaction decisions. You do own the quality and timeliness of the functional input that feeds those decisions.";

export const SUCCESS_MEASURES = [
  ["Delivery against plan", "you achieve outcomes and milestones, or you accurately reforecast them."],
  ["Plan quality", "activities, resources, dependencies and acceptance criteria are complete and credible."],
  ["Functional readiness", "people, process, technology, controls and operations are ready for the change."],
  ["Risk control", "significant risks and issues have owners, actions, dates and clear escalation routes."],
  ["Dependency management", "hand-offs between teams are explicit, agreed and tracked."],
  ["Decision effectiveness", "decisions are framed early, taken at the right level and recorded."],
  ["Reporting discipline", "status reports are short, evidence-based and focused on exceptions."],
  ["Cutover preparedness", "tasks, fallbacks, checkpoints and owners are ready to execute."],
] as const;

export const MOBILISE_STEPS = [
  {
    title: "Accept the role and confirm your authority",
    good: "You understand the expected outcomes, decision rights (who can make which decisions), escalation route and time commitment. You have accepted the role, and you have named a deputy where continuity is needed.",
    evidence: "Confirmed appointment, decision mandate, named deputy and agreed availability.",
  },
  {
    title: "Understand the transaction context",
    good: "You understand the transaction objectives, the transaction perimeter (what is and is not included in the deal), target dates, known diligence findings, legal or information restrictions, key commitments and what these mean for your function.",
    evidence: "Documented assumptions, constraints, known commitments and questions that need clarifying.",
  },
  {
    title: "Confirm capacity and capability",
    good: "You have identified the required specialists. You have checked existing business-as-usual deadlines, leave, regulatory commitments and other change work. Gaps have an agreed response, such as reprioritising, backfill or specialist support.",
    evidence: "Resource view, capacity constraints, required skills, named owners and agreed actions to close gaps.",
  },
  {
    title: "Set up interfaces",
    good: "The split between central, functional and regional execution is clear. You have named interfaces with other workstreams and any permitted counterparty contacts. The team knows where hand-offs and joint decisions will happen.",
    evidence: "Interface directory, dependency owners and an agreed way of working together.",
  },
  {
    title: "Set up delivery controls",
    good: "The team can access the controlled programme workspace and current governance, planning, reporting, RAID (risks, assumptions, issues and dependencies) and decision-log templates. Owners know how and when to maintain these controls.",
    evidence: "Access confirmed, meeting cadence set, controls assigned and reporting dates understood.",
  },
  {
    title: "Brief the team",
    good: "The team understands the objectives, restrictions, roles, decision rights, planning window and immediate actions. You record questions and open assumptions rather than leaving them unspoken.",
    evidence: "Briefing attendance, role acknowledgement, actions, open questions and escalation items.",
  },
  {
    title: "Prepare for the planning work after the gate",
    good: "You have the right people and source information ready to define the workstream charter, process brick, blueprint, detailed plan, resources, dependencies, costs and acceptance criteria once the mobilisation gate is passed.",
    evidence: "Workshop plan, participants, inputs, initial scope ideas and priority questions.",
  },
];

/** level: 1 targeted … 4 highest */
export const INTENSITY = [
  { period: "Early diligence and legal preparation", intensity: "Targeted", level: 1, text: "Identify what the transaction means for your function, and any constraints or commitments that must feed into planning." },
  { period: "Mobilisation and planning", intensity: "Highest", level: 4, text: "Define scope, outcomes, resources, dependencies, acceptance criteria and a credible detailed plan." },
  { period: "Programme execution", intensity: "Highest", level: 4, text: "Drive delivery, decisions, risk control, dependency management and evidence-based status." },
  { period: "Testing and readiness", intensity: "High", level: 3, text: "Confirm test scenarios, evidence, defects, readiness criteria, residual risk and sign-off." },
  { period: "Dress rehearsal, go or no-go and cutover", intensity: "High", level: 3, text: "Prove the runbook (the timed plan of cutover activities, owners, dependencies and fallback actions), own your workstream's tasks and fallbacks, and give an honest readiness recommendation." },
  { period: "Hypercare and handover", intensity: "Medium to high", level: 2, text: "Triage issues, close remaining actions, secure business-as-usual acceptance and capture lessons learned." },
];

export const WEEKLY_RHYTHM = [
  { title: "Refresh the delivery picture", text: "Update the detailed plan, milestone forecast, RAID, dependencies, decisions and actions. Check that the plan reflects the work still needed, not just the activity already recorded." },
  { title: "Check with owners", text: "Test progress, evidence, resource capacity and hand-offs with the people doing the work. Resolve issues within the workstream wherever your mandate allows." },
  { title: "Run the workstream session", text: "The Workstream Executive chairs the weekly workstream session and the Workstream Lead runs it. Use the detailed plan and workstream RAID as the main inputs. Agree status, key risks, dependencies, decisions and matters to escalate." },
  { title: "Publish the status", text: "Issue a short workstream status report based on forecast and evidence. State what has changed, what is at risk, what decision is needed, who owns the response and by when." },
  { title: "Connect into the programme", text: "Represent the workstream at the Transaction Working Group and other relevant forums. Confirm dependencies with other workstreams, raise exceptions, and bring programme decisions back to your team." },
  { title: "Act between meetings", text: "Do not save serious issues for a meeting. Escalate urgent blockers straight away, record the outcome, and update the plan and controls." },
];

export const STATUS_CONTENT = [
  "outcome or milestone and current forecast;",
  "evidence completed and evidence still needed;",
  "top risks, issues, assumptions and dependencies;",
  "decision or action needed, who owns it and the deadline;",
  "impact on customers, colleagues, controls, operations or regulatory obligations;",
  "cost, benefit or value impact where relevant; and",
  "readiness recommendation, conditions and residual risk.",
];

export const ECONOMICS = [
  "implementation effort and specialist-resource needs;",
  "supplier spend and contract consequences;",
  "ongoing run costs and stranded costs;",
  "scope changes, delays and extended transition arrangements;",
  "synergy assumptions and confidence in delivering them;",
  "customer attrition, onboarding failure, product gaps or pricing impacts; and",
  "costs created by workarounds, control gaps or weak readiness.",
];

export interface Choice { key: string; text: string }
export interface Scenario { title: string; situation: string; options: Choice[]; answer: string; feedback: string }

export const SCENARIOS: Scenario[] = [
  {
    title: "Capacity against a fixed date",
    situation: "The approved plan assumes a control specialist supports the workstream for two days a week over the next month. Their line manager can currently release them for only half a day a week. The plan has three days of float (spare time before this affects the delivery date). The Workstream PM thinks some review work could be resequenced. The next status report is due tomorrow.",
    options: [
      { key: "A", text: "Use the available float to resequence the review, record the capacity gap as a risk, and reconsider escalating after the first week of delivery." },
      { key: "B", text: "Ask the functional head to restore the assumed allocation, while the Workstream PM models the likely change to plan and budget if the request is declined." },
      { key: "C", text: "Check the minimum specialist input actually needed, compare resequencing against backfill, and take a recommended response to the Workstream Executive and PMO before the float runs out." },
      { key: "D", text: "Move the status to amber, request extra resource, and keep the current sequence while you clarify the specialist requirement at the next workstream session." },
    ],
    answer: "C",
    feedback: "Option C combines delivery ownership with proportionate escalation. It best fits your authority: first work out what input you genuinely need, then show the forecast impact and realistic recovery choices to the right people. The trade-off in the other options: A uses float but delays visibility of a planning assumption that no longer holds; B seeks the preferred resource outcome without testing alternatives or showing the wider impact; D makes the risk visible but does not yet give a decision-ready response.",
  },
  {
    title: "Completion and acceptance",
    situation: "A target process design is complete and the process owner has signed it off. The agreed milestone criteria also require the control owner to accept it. The control owner has reviewed it verbally with no objection, but written evidence will only be available next week. A downstream technology team wants to start configuration now, though no irreversible build work is due for four days.",
    options: [
      { key: "A", text: "Report the milestone as green with a condition, allow configuration to begin, and track written acceptance as a time-bound action before any irreversible build work." },
      { key: "B", text: "Separate accepted design from outstanding control acceptance, allow agreed reversible preparation, and report status against the forecast for meeting the existing exit criteria." },
      { key: "C", text: "Report the milestone as amber and pause downstream activity until written acceptance is recorded, keeping the agreed control and hand-off sequence." },
      { key: "D", text: "Move control acceptance into a later milestone, subject to normal baseline approval, so design completion and downstream preparation can be reported separately." },
    ],
    answer: "B",
    feedback: "Option B protects the agreed acceptance criteria without stopping work that can safely continue. The trade-off in the other options: A risks overstating the milestone, because the condition is part of completion, not just a follow-up item; C is transparent but may be a bigger response than needed; D may only be valid if governance genuinely approves a new way of measuring the milestone, rather than being used to quietly close the original one.",
  },
  {
    title: "A contested dependency date",
    situation: "Testing in your workstream depends on a data extract from another workstream. Its latest working date is four days later than the date in your plan, though its lead believes recovery is possible. Your team can absorb two days by resequencing; any further delay would compress testing. Neither date is yet confirmed in the integrated programme plan.",
    options: [
      { key: "A", text: "Check the date, hand-off criteria and recovery actions jointly with the other workstream, use the two-day mitigation, and show the remaining testing impact through the integrated dependency process." },
      { key: "B", text: "Keep the date already in your plan until the supplying workstream formally changes its forecast, while recording the later date and testing compression as risks." },
      { key: "C", text: "Adopt the later date and submit a rebaseline (formally approve a change to the plan, budget or scope) so your workstream plan reflects the more cautious information while recovery continues." },
      { key: "D", text: "Ask the PMO to reconcile the dates in the integrated plan while your team protects its own milestones and plans against the original assumption." },
    ],
    answer: "A",
    feedback: "Option A actively manages both the hand-off and the effect on your own plan. The trade-off in the other options: B keeps a planning assumption that is no longer supported; C is cautious but rebaselines before recovery and hand-off options have been tested; D recognises the PMO's coordination role but hands too much ownership of the dependency away from the Workstream Lead.",
  },
  {
    title: "An emerging requirement",
    situation: "A late regulatory interpretation may require extra validation before go-live. Legal has not yet confirmed whether it is mandatory. A supplier estimates the change could cost between R2 million and R4 million and add one to two weeks, depending on the final interpretation. Some analysis can start without committing to the build.",
    options: [
      { key: "A", text: "Ask the supplier to reserve delivery capacity and start preliminary design under the existing arrangement, because the requirement may become mandatory and delay could cost more than early mobilisation." },
      { key: "B", text: "Time-box the no-regret analysis, quantify the credible cost and timing outcomes, and seek a decision through the agreed authority before making any irreversible commitment." },
      { key: "C", text: "Pause related activity until Legal confirms the requirement, while protecting the approved baseline (the approved plan, budget or scope used to measure progress) and supplier commitment date through the risk process." },
      { key: "D", text: "Use available workstream contingency for initial delivery, record the uncertainty in RAID, and submit formal change control if the final requirement exceeds delegated tolerance." },
    ],
    answer: "B",
    feedback: "Option B keeps momentum while protecting decision authority and being open about the cost picture. The trade-off in the other options: A may create commercial momentum before the decision basis is understood; C protects the baseline but may waste time that could be used for reversible analysis; D treats delegated budget tolerance as permission to change scope and does not fully address the wider programme impact.",
  },
  {
    title: "Readiness with a qualified fallback",
    situation: "The dress rehearsal (a practice run of the cutover plan before live execution) has passed its core sequence. A fallback procedure worked in an earlier rehearsal using a lower transaction volume. One open issue has low likelihood but high impact if it occurs. A backup manual procedure has been tested in a tabletop exercise, but not at full volume. The readiness criteria allow temporary controls where the residual risk is made explicit.",
    options: [
      { key: "A", text: "Recommend ready because the core sequence passed and the fallback has prior evidence, with the open issue managed through closer monitoring during hypercare (the period of increased monitoring and support immediately after cutover)." },
      { key: "B", text: "Compare the available evidence against the agreed criteria, state the residual risk and evidence limits, set conditions and monitoring, and give a clear recommendation." },
      { key: "C", text: "Recommend not ready until the fallback and manual procedure have both been repeated at full volume, given the possible impact." },
      { key: "D", text: "Recommend conditionally ready if the accountable owners accept the manual procedure and closer monitoring, using the current risk assessment as the basis for approval." },
    ],
    answer: "B",
    feedback: "Option B gives decision-makers an evidence-based recommendation without taking their decision for them. The trade-off in the other options: A may understate the effect of the higher live volume; C may ultimately be right, but it reaches that view without first testing proportionality against the agreed criteria; D recognises the need for conditions but relies on acceptance alone rather than checking whether the evidence is sufficient.",
  },
];

export const CORE_RESOURCES = [
  { name: "Workstream Lead role card", purpose: "Confirms accountability, mandate, interfaces and success measures.", when: "At appointment, during role briefing and whenever ownership is unclear." },
  { name: "Relevant functional operating-model section", purpose: "Explains how your function connects into the transaction operating model and governance.", when: "During mobilisation and when clarifying interfaces or escalation routes." },
  { name: "Workstream charter", purpose: "Defines scope, outcomes, governance, decision rights, assumptions, constraints and key stakeholders.", when: "Immediately after mobilisation, to set the workstream's delivery contract." },
  { name: "Workstream brick", purpose: "Clarifies which processes or capabilities start, stop or continue.", when: "During scoping and design, to expose operational change." },
  { name: "Workstream blueprint", purpose: "Sets out the major activities, milestones and shape of delivery for the workstream.", when: "Before and during detailed planning." },
  { name: "Detailed L2 plan", purpose: "Makes activities, owners, dates, dependencies, resources and acceptance criteria executable.", when: "Throughout planning, execution, testing, cutover and handover." },
  { name: "Governance terms of reference", purpose: "Defines a forum's purpose, decision rights, attendees, inputs, outputs and cadence.", when: "When setting up or taking part in workstream and programme governance." },
  { name: "Workstream status report", purpose: "Gives an evidence-based view of progress, forecast, exceptions and decisions needed.", when: "At the agreed reporting cadence and whenever something material changes." },
  { name: "RAID, dependency, action and decision logs", purpose: "Give traceable ownership and closure of delivery controls.", when: "Maintain continuously, not only before governance meetings." },
];

export const RELEVANT_RESOURCES = [
  { name: "Business testing plan and evidence", text: "Defines scenarios, owners, expected results, evidence and exit criteria." },
  { name: "Cutover runbook", text: "Sequences tasks, ownership, timing, dependencies, checkpoints, fallbacks and communications." },
  { name: "Dress-rehearsal defect, checkpoint and retrospective records", text: "Capture defects, decisions, lessons and actions needed before live execution." },
  { name: "Go or no-go scorecard", text: "Pulls together readiness evidence, conditions, exceptions and residual risk for the formal decision-makers." },
  { name: "Cutover checkpoint record", text: "Records actual progress, exceptions, decisions and authority at defined checkpoints." },
  { name: "Hypercare RAID and daily status", text: "Supports fast triage, ownership, trend visibility and a controlled move back to business as usual." },
];

export const MATCHING = [
  { need: "Define the workstream's scope and mandate", resource: "Workstream charter" },
  { need: "Coordinate tasks, owners, dates and dependencies", resource: "Detailed L2 plan" },
  { need: "Support a readiness decision", resource: "Go or no-go scorecard" },
  { need: "Track a cross-workstream hand-off", resource: "Dependency log" },
];

export interface Question { q: string; options: Choice[]; answer: string; feedback: string }

export const QUESTIONS: Question[] = [
  {
    q: "The Workstream PM finds that two activities need the same scarce specialist. Both stay within agreed scope, and either order can still meet the programme milestone. The Workstream PM prepares a preferred sequence. What should happen next?",
    options: [
      { key: "A", text: "The Workstream PM confirms the sequence, because maintaining the detailed plan sits within the project-management role, then tells the Workstream Lead." },
      { key: "B", text: "The Workstream Lead makes the prioritisation decision using the impact analysis, and the Workstream PM records the decision and updates the plan and controls." },
      { key: "C", text: "The Workstream Executive decides, because any competition for specialist capacity is a workstream trade-off." },
      { key: "D", text: "The PMO decides, because using a scarce resource could affect confidence in the integrated programme plan." },
    ],
    answer: "B",
    feedback: "Option B is the recommended response. Why: the Workstream PM should provide analysis and planning discipline, but prioritising within agreed workstream scope stays with the Workstream Lead. Trade-off: Executive or PMO involvement is only needed where the choice goes beyond that mandate or affects wider programme outcomes.",
  },
  {
    q: "A lower-priority workstream activity can move by one week to free up internal capacity for a critical milestone. This does not change programme scope, budget, acceptance criteria or any cross-workstream date. What should the Workstream Lead do?",
    options: [
      { key: "A", text: "Make the reprioritisation within the workstream, record the reason and update the plan, while checking that the stated programme impacts stay unchanged." },
      { key: "B", text: "Seek Workstream Executive approval, because any change to the approved workstream baseline is a trade-off decision." },
      { key: "C", text: "Ask the Workstream PM to approve the change, because it concerns sequencing rather than functional scope." },
      { key: "D", text: "Submit the change to the PMO for approval before updating the detailed plan, even though no integrated milestone changes." },
    ],
    answer: "A",
    feedback: "Option A is the recommended response. Why: the Workstream Lead can prioritise resources and activities beneath agreed programme milestones. Trade-off: the change should stay controlled and visible, but it does not need to move to another decision-maker when the stated conditions genuinely hold.",
  },
  {
    q: "Your team has completed and internally approved an output. The receiving workstream has not confirmed that the hand-off meets its agreed acceptance criteria by the reporting cut-off. The supplier expects no schedule impact if acceptance arrives within two days. The milestone definition includes accepted hand-off. How should this be reported?",
    options: [
      { key: "A", text: "Red, because part of the milestone criteria was not met at the reporting cut-off, regardless of the current forecast." },
      { key: "B", text: "Green with a narrative note, because the producing workstream has completed its activity and no delay is currently forecast." },
      { key: "C", text: "Complete in the workstream plan, with the receiving workstream's acceptance tracked separately as a dependency." },
      { key: "D", text: "Qualify the status to show the milestone is not yet accepted, state the owner and two-day decision point, and show the forecast impact if acceptance is not secured." },
    ],
    answer: "D",
    feedback: "Option D is the recommended response. Why: the agreed milestone includes acceptance, so completing the internal work alone is not enough. Trade-off: the response should separate current completion from forecast impact, without treating every evidence gap as an automatic critical failure.",
  },
  {
    q: "A supplier says an emerging requirement may cost between R800,000 and R1.4 million. The requirement is still being checked, but a decision is needed within five business days to protect the delivery date. What is the best response?",
    options: [
      { key: "A", text: "Wait for a firm requirement and fixed estimate, so governance gets one reliable number rather than a provisional range." },
      { key: "B", text: "Use the upper end of the range in the forecast, as this is the most cautious basis until the requirement is confirmed." },
      { key: "C", text: "Present the range, assumptions, delivery and value implications, available options and decision deadline through the agreed Finance and change-control route." },
      { key: "D", text: "Keep the item in workstream RAID until the requirement is confirmed, then raise a change request if the agreed budget is exceeded." },
    ],
    answer: "C",
    feedback: "Option C is the recommended response. Why: a decision can be supported by a reasoned range when the uncertainty is stated clearly. Trade-off: waiting for precision may remove the programme's ability to act in time, and using only the upper estimate hides the assumptions and choices behind it.",
  },
  {
    q: "All mandatory tests have passed, but the final test used an agreed temporary workaround. The workaround has a named owner, a 30-day expiry date and monitoring controls. The readiness criteria allow temporary controls that are accepted in this way. How should the Workstream Lead frame the recommendation?",
    options: [
      { key: "A", text: "Recommend not ready, because a workaround means the target operating state has not been fully reached." },
      { key: "B", text: "Give a conditional readiness recommendation that states the supporting evidence, residual risk, monitoring, accountable owner and exit date." },
      { key: "C", text: "Recommend ready without qualification, because the criteria explicitly allow temporary controls and all tests passed." },
      { key: "D", text: "Give the facts to the PMO without a recommendation, because formal readiness decisions sit outside the Workstream Lead's authority." },
    ],
    answer: "B",
    feedback: "Option B is the recommended response. Why: the Workstream Lead should give a clear recommendation even though the formal decision sits elsewhere. Trade-off: the temporary control may well support readiness, but its conditions and residual risk must stay visible to the decision-maker.",
  },
];

export const PLAYBOOK = [
  {
    title: "Before accepting a plan",
    items: [
      "Is the scope clear and linked to a defined outcome?",
      "Are activities, owners and dates detailed enough to execute?",
      "Have you tested resource capacity and specialist skills?",
      "Are all significant dependencies and hand-offs explicit?",
      "Are acceptance criteria and evidence requirements defined?",
      "Do costs, benefits and key assumptions match the value case?",
    ],
  },
  {
    title: "Before each workstream session",
    items: [
      "Is the detailed plan up to date?",
      "Is evidence backing up the milestone forecasts?",
      "Have risks, issues, assumptions or dependencies changed?",
      "Which decisions are needed, from whom and by when?",
      "What must you escalate to the Transaction Working Group?",
      "Is there any cost or readiness impact that is not yet visible?",
    ],
  },
  {
    title: "Before reporting green",
    items: [
      "Have you achieved the outcome, not just completed the activity?",
      "Has the required evidence been produced and accepted?",
      "Are downstream owners ready to receive the output?",
      "Are residual risks understood and owned?",
      "Is the forecast credible given current capacity and dependencies?",
    ],
  },
  {
    title: "Before a readiness recommendation",
    items: [
      "Are people, process, technology, data, controls and operations ready?",
      "Have you completed the required tests and rehearsals?",
      "Are defects and remaining actions understood?",
      "Are runbook tasks, checkpoints, fallbacks and communications ready to execute?",
      "Are conditions, exceptions and residual risks explicit?",
      "Can formal decision-makers see the evidence behind your recommendation?",
    ],
  },
];

export const PRINCIPLES = [
  "Own the outcome, not just the activity.",
  "Make the detailed plan executable.",
  "Treat capacity as a delivery fact, not an assumption.",
  "Make dependencies visible before they fail.",
  "Bring choices and consequences to decision-makers.",
  "Report forecast and evidence honestly.",
  "Escalate before the date is missed.",
  "Define readiness in terms of accepted evidence.",
];

export const WORKSTREAM_LEAD_TEMPLATE_NOTICE =
  "The templates named in this module are not stored in the Capability Hub. Get the current approved versions from the Central Hub, programme team or controlled programme workspace. Do not create an uncontrolled alternative where an approved template already exists.";

export const GLOSSARY = [
  { term: "RAID", def: "Risks, assumptions, issues and dependencies — the log used to track and manage them." },
  { term: "Acceptance criteria", def: "The conditions that must be met before an output is accepted as complete." },
  { term: "Readiness evidence", def: "Proof that the required people, processes, technology, data and controls are ready." },
  { term: "Residual risk", def: "Risk that remains after the agreed controls or actions have been applied." },
  { term: "Dependency", def: "An input, decision or activity that another task relies on." },
  { term: "Critical path", def: "The activities and dependencies that directly determine the delivery date." },
  { term: "Delegated authority", def: "The decisions a role has been formally authorised to make." },
  { term: "Reserved decision", def: "A decision that must remain with a named senior, central or specialist authority." },
  { term: "Baseline", def: "The approved plan, budget or scope against which progress is measured." },
  { term: "Rebaseline", def: "To formally approve a change to that plan, budget or scope." },
  { term: "Cutover", def: "The controlled move from the current state to the new operating state." },
  { term: "Runbook", def: "The timed plan of cutover activities, owners, dependencies and fallback actions." },
  { term: "Dress rehearsal", def: "A practice run of the cutover plan before live execution." },
  { term: "Go or no-go", def: "The formal decision on whether the transaction is ready and safe to proceed." },
  { term: "Hypercare", def: "The period of increased monitoring and support immediately after cutover." },
  { term: "Business as usual (BAU)", def: "When ongoing ownership returns to normal teams." },
  { term: "Transaction perimeter", def: "What is and is not included in the deal." },
  { term: "Integrated programme plan", def: "The single programme plan that combines all workstreams and key dates." },
  { term: "Escalation", def: "Raising a matter to someone with the authority or support needed to resolve it." },
  { term: "Decision rights", def: "Who can make which decisions." },
];
