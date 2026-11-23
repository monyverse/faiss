/** Content for the Central Hub Programme Management learning module. Copy taken from the supplied brief. */

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

export type Lens = "td" | "pm" | "pmo";

export const LEARNING_OUTCOMES = [
  "explain what the Central Hub owns, and what stays with workstreams, functions and countries;",
  "distinguish Transaction Director authority, Programme Manager judgement and PMO Support control responsibilities;",
  "recognise which matters the Transaction Director can decide and which require the Executive Sponsor, formal governance or a specialist authority;",
  "mobilise the programme with clear ownership, governance, controls and interfaces;",
  "keep one view of milestones, dependencies, decisions, costs and readiness;",
  "challenge workstream information without taking over delivery;",
  "route decisions and escalations to the correct authority; and",
  "support readiness, cutover and programme closure with solid evidence.",
];

export const HUB_FUNCTIONS = [
  {
    name: "Programme management",
    text: "Own the integrated programme plan (the single plan that combines all workstreams and key dates), the critical path (the activities that directly determine the delivery date), programme controls, the budget view, governance and reporting to senior leaders.",
  },
  {
    name: "Mobilisation support",
    text: "Set up the programme. Appoint and brief the right leaders, agree ways of working, turn on controlled tools and connect the functional, regional and counterparty teams.",
  },
  {
    name: "Quality assurance",
    text: "Check and challenge plans, reports, evidence, risks and decision papers. This makes sure governance decisions are based on complete, credible and timely information.",
  },
  {
    name: "Education and standards",
    text: "Build good M&A delivery practice through common methods, templates, clear role definitions, lessons learned and standards suited to the deal.",
  },
];

export const LENSES: { id: Lens; name: string; short: string; text: string }[] = [
  {
    id: "td",
    name: "Transaction Director",
    short: "Transaction Director",
    text: "Owns successful execution of the transaction. Translates the deal into an executable programme, mobilises the leadership team, owns the integrated execution plan and readiness position, leads programme governance, manages the buyer or seller execution relationship and decides transaction-level matters within delegated authority.",
  },
  {
    id: "pm",
    name: "Programme Manager",
    short: "Programme Manager",
    text: "Drives day-to-day programme management. Runs and maintains the integrated plan, dependencies, governance, reporting and decision pipeline. Holds delivery teams to agreed standards and escalates wider programme decisions to the Transaction Director.",
  },
  {
    id: "pmo",
    name: "PMO Support",
    short: "PMO Support",
    text: "Maintains the plans, logs, reporting cycle, governance admin, documents and controls that make the programme reliable. Has limited decision authority and escalates decisions to the Programme Manager.",
  },
];

export const LENS_WARNING =
  "The Transaction Director sets execution direction and makes transaction-level decisions within mandate. The Programme Manager turns that direction into an integrated programme and recommendation. PMO Support creates a reliable control record. Functional and specialist authorities retain their own decisions, and the Executive Sponsor or formal governance retains reserved decisions.";

export const RELATIONSHIPS = [
  {
    name: "Executive Sponsor and executive governance",
    text: "The Executive Sponsor provides strategic direction, empowers the Transaction Director and decides or sponsors matters beyond the Director's mandate. Executive governance, such as SteerCo (the Steering Committee), formally decides reserved changes to scope, budget, completion timing or risk appetite, and makes the formal go or no-go decision (whether the transaction is ready and safe to proceed).",
  },
  {
    name: "Functional Spokes",
    text: "The Functional Spoke is the central specialist team for a function. It owns functional expertise, design choices, policy interpretation, specialist approvals and proof that its area is ready.",
  },
  {
    name: "Regional Spokes",
    text: "The Regional Spoke is the country or regional team responsible for local input and delivery. It owns as much local planning, execution, evidence and decision-making as its experience, capability, capacity and delegated authority (the decisions it is formally authorised to make) allow.",
  },
  {
    name: "Counterparty programme",
    text: "Owns its own internal delivery. It connects to our programme through agreed joint forums, milestones, dependencies, obligations and escalation routes.",
  },
];

export const MANDATE = {
  decide: {
    label: "Decide",
    lead: "Within the authority given to each role, the programme-management team can decide or control:",
    items: [
      "how often governance forums meet and how they run;",
      "reporting formats, submission deadlines and quality thresholds;",
      "programme-control methods, including logs, ageing rules and issue routing;",
      "the central mobilisation approach and the start-up evidence it needs;",
      "how dependencies and the integrated plan are managed;",
      "command-centre and programme-status rhythms; and",
      "the steps, ownership and quality checks used to produce programme information.",
    ],
    note: "",
  },
  coordinate: {
    label: "Coordinate",
    lead: "The Central Hub coordinates:",
    items: [
      "mobilising functional and regional spokes;",
      "the integrated programme plan, transaction milestones and critical path;",
      "dependencies between workstreams and between buyer and seller;",
      "workstream status, programme RAID (risks, assumptions, issues and dependencies), decisions, actions and changes;",
      "what SPA terms, conditions precedent and transaction commitments mean for delivery;",
      "testing, dress rehearsals (practice runs of the cutover plan), readiness and cutover governance;",
      "the integrated go or no-go pack and decision forum;",
      "triaging and escalating issues from the command centre;",
      "hypercare governance (the period of extra monitoring after cutover), stability reporting and programme closure; and",
      "links with Corporate Development, Finance and Tax, Legal, control functions and counterparties.",
    ],
    note: "",
  },
  challenge: {
    label: "Challenge",
    lead: "The Central Hub should challenge:",
    items: [
      "plans that lack enough detail, owners, dependencies or acceptance criteria (the conditions that must be met before an output is accepted as complete);",
      "status updates that report activity rather than forecast outcomes and evidence;",
      "green ratings that conflict with open critical-path dependencies;",
      "workstream capacity assumptions that have not been tested;",
      "risks or decisions raised too late for effective action;",
      "changes that leave out cost, value, timing, control or counterparty consequences;",
      "readiness claims that lack accepted evidence; and",
      "governance papers that do not state the decision, options, recommendation and deadline.",
    ],
    note: "Challenge should improve the owning team's work. It should not quietly move delivery ownership to the Hub.",
  },
  escalate: {
    label: "Escalate",
    lead: "Escalate through the correct route when:",
    items: [
      "scope, budget or completion timing may change beyond what has been agreed;",
      "a transaction-wide trade-off cannot be resolved by the affected owners;",
      "a functional, legal, regulatory, risk, credit, tax or architecture decision needs specialist authority;",
      "a country matter needs local approval, or affects customers, employees, regulators or legal duties;",
      "a major remaining risk (risk left after agreed controls or actions have been applied), or the level of risk the business will accept, needs senior sign-off;",
      "an unresolved dependency threatens the critical path;",
      "a decision is close to its last responsible date;",
      "programme capacity or leadership authority is not enough; or",
      "the overall readiness position may not support a go or no-go recommendation.",
    ],
    note: "",
  },
};
export type MandateKey = keyof typeof MANDATE;

export const DECIDE_LENS_NOTE: Record<Lens, string> = {
  td: "Makes execution-related, transaction-level decisions within delegated authority, including intra-transaction trade-offs, approved-budget deployment and key programme appointments. Escalates strategic, reserved or out-of-tolerance matters to the Executive Sponsor or formal governance.",
  pm: "Makes programme-management decisions about the integrated plan, how governance runs, dependency control and reporting. Prepares recommendations and escalates transaction-wide trade-offs, approved-budget allocations and wider programme decisions to the Transaction Director.",
  pmo: "Applies the agreed controls, keeps records accurate and manages production work. Flags gaps or inconsistencies, but escalates anything needing management judgement to the Programme Manager.",
};

export const BOUNDARY =
  "functional design, specialist approvals, local regulatory judgement, workstream delivery, source readiness evidence, legal interpretation, or the formal go or no-go decision.";
export const BOUNDARY_OWNS =
  "The Transaction Director owns maintenance of the execution case and integrated execution direction within the approved transaction strategy. The Hub owns making delivery inputs visible, connected, challenged and routed into timely decisions. It does not rewrite the deal rationale or take decisions reserved for the Executive Sponsor, formal governance or a specialist authority.";

export const SUCCESS_MEASURES: [string, string][] = [
  ["Mobilisation readiness", "accountable leaders, capacity, tools, governance and interfaces are up and running."],
  ["Integrated plan quality", "milestones, dependencies, critical path, assumptions and owners fit together."],
  ["Decision speed", "issues reach the correct authority before options run out."],
  ["Control discipline", "logs, reports, actions and evidence are current, traceable and controlled."],
  ["Dependency resolution", "hand-offs and knock-on effects between workstreams are actively managed."],
  ["Reporting integrity", "reports to senior leaders show the forecast, the evidence and material exceptions."],
  ["Readiness integration", "workstream evidence adds up to a credible transaction-level recommendation."],
  ["Value protection", "budget, benefits, costs, obligations and financial risks stay visible through delivery."],
];

export const START_STEPS = [
  {
    title: "Confirm the mobilisation mandate",
    good: "The core team understands the deal direction, type, perimeter (what is and is not included in the deal), objectives, target dates, any known legal or information limits, completion assumptions and the first mobilisation priorities.",
    evidence: "Mobilisation mandate, controlling assumptions, initial information requests, limits, and named transaction leadership.",
  },
  {
    title: "Set up programme leadership",
    good: "The Executive Sponsor appoints and empowers the Transaction Director. The Transaction Director and Sponsor confirm the Programme Manager and accountable Workstream Executives, and the Director mobilises the Central Hub and in-country coordination. Workstream Leads are appointed with the right authority, capacity and deputies. Gaps have owners and dates to close them.",
    evidence: "Programme organisation chart, role acceptance, decision mandates, capacity assessment, deputies and any unresolved appointments.",
  },
  {
    title: "Define the delivery model",
    good: "The required workstreams match the actual deal perimeter. The split between Central Hub, functional spokes and regional spokes is clear, and fits each country's experience, capability, capacity and delegated authority.",
    evidence: "Workstream map, accountability matrix, initial delivery split, exceptions and reasons.",
  },
  {
    title: "Set up the controlled environment",
    good: "The core team has an approved workspace, controlled document locations and permitted communication channels. Confidentiality, insider, information-sharing and counterparty limits are understood.",
    evidence: "Access records, NDA or legal-clearance records, workspace structure, version rules and any unresolved access issues.",
  },
  {
    title: "Set up governance",
    good: "Internal and joint forums have a clear purpose, attendees, authority, inputs, outputs and frequency. Submission deadlines, pre-reads, pack ownership, minutes, actions and record-keeping are assigned.",
    evidence: "Governance terms of reference, calendar, reporting timetable, attendees and forum responsibilities.",
  },
  {
    title: "Set up programme controls",
    good: "RAID, decision, action, dependency and change controls use agreed fields, status definitions, RAG criteria (red, amber or green status), ageing rules, escalation thresholds and closure evidence. A sample issue and decision have been run through governance as a test.",
    evidence: "Controlled logs, definitions, routing rules, test results and named control owners.",
  },
  {
    title: "Connect the interfaces",
    good: "Functional, regional and permitted counterparty contacts know who they work with, how to request information, where decisions are recorded, and how to escalate unanswered dependencies.",
    evidence: "Interface directory, deputies, approved channels, permitted topics, joint milestones and escalation contacts.",
  },
  {
    title: "Close the mobilisation gate",
    good: "The Day 10 gate shows a clear view of appointments, capacity, tools, governance, controls, onboarding and open exceptions. Governance decides to proceed, proceed with conditions, or hold, with conditions and owners recorded.",
    evidence: "Mobilisation completion dashboard, gate pack, decision record, open conditions and agreed next steps.",
  },
];

export const BASELINE_STEPS = [
  { step: "Frame", focus: "Set integration principles and require clear workstream charters, outcomes and constraints.", outcome: "Teams understand their scope, interfaces and decisions." },
  { step: "Diagnose", focus: "Bring together gaps, inventories, assumptions and readiness implications across workstreams.", outcome: "Important unknowns are visible and owned." },
  { step: "Plan", focus: "Challenge milestones, resources, costs, dependencies, acceptance criteria and risks.", outcome: "Workstream plans hold together and can be delivered." },
  { step: "Integrate", focus: "Resolve interfaces, align joint milestones and expose critical-path consequences.", outcome: "The programme plan reflects the whole transaction." },
  { step: "Challenge and approve", focus: "Coordinate assurance, review remaining risk, and approve the budget and baseline.", outcome: "Governance authorises controlled delivery." },
];

export const INTENSITY = [
  { period: "Due diligence and legal preparation", intensity: "Targeted", level: 1, text: "Pull out delivery implications, obligations, constraints and information needed for mobilisation." },
  { period: "Mobilisation and planning", intensity: "Highest", level: 4, text: "Set up the organisation, governance, controls, integrated plan, budget and critical path." },
  { period: "Programme execution", intensity: "Highest", level: 4, text: "Keep one view of the whole programme, resolve dependencies, speed up decisions and govern performance." },
  { period: "Testing and readiness", intensity: "High", level: 3, text: "Coordinate evidence standards, defect escalation and overall readiness." },
  { period: "Dress rehearsals, go or no-go and cutover", intensity: "Highest", level: 4, text: "Govern rehearsals, build the overall recommendation and run control during execution." },
  { period: "Hypercare and handover", intensity: "High", level: 3, text: "Keep a view of stability, govern remaining actions, confirm business as usual (BAU, when ongoing ownership returns to normal teams) acceptance and capture lessons." },
];

export const CONTROL_LOOP = [
  { title: "Gather current evidence", text: "Receive workstream plans, status, RAID, decisions, dependencies, readiness evidence and cost inputs by the agreed cut-off." },
  { title: "Build the overall programme view", text: "Reconcile milestones, hand-offs, assumptions and knock-on effects between workstreams. Spot where a workstream's own rating does not match the overall forecast." },
  { title: "Challenge quality and completeness", text: "Check whether plans can be delivered, whether evidence supports completion, whether mitigations are credible, and whether decision papers show options and consequences." },
  { title: "Route decisions and escalation", text: "Resolve programme-management matters within your authority. Send functional, local, specialist and senior matters to the correct authority before the last responsible decision date." },
  { title: "Run governance", text: "Use forums to make decisions, resolve trade-offs and confirm accountability. Do not use them just to read out status, and do not delay urgent issues until the next meeting." },
  { title: "Record and follow through", text: "Update the plan, logs, budget view and reporting narrative. Check that decisions turn into actions and that closure evidence is kept." },
];

export const ROLE_TABLE: { activity: string; td: string; pm: string; pmo: string }[] = [
  { activity: "Integrated execution plan", td: "Owns the transaction-level plan and sets execution priorities and tolerances. Resolves transaction trade-offs within mandate.", pm: "Builds and runs the integrated plan, tests coherence and recommends responses to planning conflicts.", pmo: "Maintains the controlled plan, validates updates, records baseline changes and identifies inconsistencies." },
  { activity: "RAID and dependencies", td: "Owns programme-level risk and ensures material barriers are resolved, accepted or escalated.", pm: "Challenges treatment, prioritises programme attention and determines the escalation route.", pmo: "Maintains complete records, ageing, owners, dates, evidence and follow-up." },
  { activity: "Governance", td: "Leads programme governance, chairs key transaction forums and secures executive or specialist decisions.", pm: "Designs the decision flow, facilitates programme forums and ensures the right authority is engaged.", pmo: "Manages the calendar, inputs, packs, minutes, decisions, actions and record retention." },
  { activity: "Reporting", td: "Owns the execution message to the Executive Sponsor and formal governance.", pm: "Determines the integrated delivery narrative, programme status and decisions required.", pmo: "Reconciles submissions, applies reporting standards and identifies missing or conflicting information." },
  { activity: "Workstream challenge", td: "Holds Workstream Executives to account for outcomes and resolves barriers across organisational boundaries.", pm: "Holds delivery teams to credible plans, evidence, recovery and timely escalation.", pmo: "Tests compliance with agreed controls and follows up gaps without inventing management judgement." },
  { activity: "Buyer or seller relationship", td: "Leads the senior execution relationship and resolves or escalates joint trade-offs.", pm: "Coordinates joint plans, dependencies, forums and decision preparation.", pmo: "Maintains joint actions, records, packs and agreed information controls." },
  { activity: "Escalation", td: "Decides within mandate and escalates strategic, reserved or out-of-tolerance matters with a clear recommendation.", pm: "Frames options, consequences and a recommendation for the Transaction Director or relevant authority.", pmo: "Makes the issue traceable, prepares the supporting facts and alerts the Programme Manager before deadlines are lost." },
];

export const ROLE_TABLE_NOTE =
  "PMO Support makes reliable judgement possible. The Programme Manager applies integrated programme judgement. The Transaction Director sets execution direction, decides transaction-level matters within mandate and takes reserved matters to the Executive Sponsor or formal governance.";

export const MOBILISATION_FOCUS: Record<Lens, string> = {
  td: "Confirm the execution mandate with the Executive Sponsor, appoint and empower programme leadership, define the delivery model, secure capacity and approved funding, establish internal and joint governance, and decide whether mobilisation is ready to move into controlled planning.",
  pm: "Turn the mandate into a workable mobilisation plan, establish programme controls and reporting, connect workstreams and countries, integrate planning outputs, expose gaps and prepare the mobilisation-gate recommendation.",
  pmo: "Activate the controlled workspace, records, calendars, logs, packs and evidence trail; confirm access and submissions; maintain the mobilisation dashboard; and make gaps visible before the gate.",
};

export const DECISION_FLOW = [
  { title: "PMO Support establishes the facts", text: "Current plan, evidence, cost, risk, owner, deadline and decision record." },
  { title: "Programme Manager integrates the consequences", text: "Cross-workstream effect, critical path, options, recommendation and correct authority." },
  { title: "Transaction Director decides or directs", text: "Makes the execution decision within mandate, confirms the recommendation or requests further analysis." },
  { title: "Executive or specialist authority decides where required", text: "Reserved strategic matters and specialist decisions remain with the named authority." },
  { title: "Programme Manager and PMO Support implement the outcome", text: "Update the plan, budget view, logs, actions, communications and follow-through." },
];

export const DECISION_FLOW_WARNING =
  "A senior role does not need to repeat the work of the role below it. It must test whether the information is sufficient, apply the judgement attached to its mandate and make or route the decision promptly.";

export const RESOURCE_EMPHASIS: Record<Lens, string> = {
  td: "Use the mobilisation mandate, organisation and authority records, integrated execution plan, governance terms, executive reporting, budget and business-case tracking, decision papers, joint-governance records, readiness recommendation and cutover control to direct the transaction and make timely decisions.",
  pm: "Use the integrated plan, programme logs, governance calendar, reporting pack, dependency view, economic forecast and readiness pack to maintain one coherent programme view and prepare recommendations.",
  pmo: "Use the controlled plans, submission calendar, logs, action records, pack templates, evidence locations, version rules and decision records to keep programme information complete, current and traceable.",
};

export const ROLE_PROMPTS: Record<Lens, { title: string; items: string[] }> = {
  td: {
    title: "Transaction Director: before deciding or escalating",
    items: [
      "Is the recommendation aligned with the deal rationale, contractual intent and approved execution direction?",
      "What is the effect on the whole transaction, business continuity, customer outcomes, value and critical path?",
      "Is this decision within my delegated authority, or is it reserved for the Executive Sponsor, formal governance or a specialist authority?",
      "Have credible options, downside, reversibility, cost and the last responsible decision date been tested?",
      "Does the decision protect the buyer or seller relationship without accepting uncontrolled execution risk?",
      "What conditions, triggers, communications and follow-through must accompany the decision?",
    ],
  },
  pm: {
    title: "Programme Manager: before making a recommendation",
    items: [
      "Are the facts current, reconciled and supported by evidence?",
      "Are cross-workstream, country, counterparty and critical-path consequences visible?",
      "Do the options show cost, timing, risk, value and delivery effects?",
      "Is there a clear recommendation, decision owner and deadline?",
      "Can the decision be implemented and controlled immediately after it is made?",
    ],
  },
  pmo: {
    title: "PMO Support: before releasing programme information",
    items: [
      "Is the source current, controlled and traceable?",
      "Are owners, dates, status, evidence and closure conditions complete?",
      "Do the plan, logs, budget view and pack tell the same story?",
      "Are missing facts and judgement points clearly identified?",
      "Has the matter reached the Programme Manager before the reporting or decision deadline?",
    ],
  },
};

export const GOVERNANCE_FLOW = [
  { name: "Workstream sessions", text: "Workstream Executives and Leads resolve functional matters and flag items for programme escalation. The Central Hub sets standards and receives controlled outputs, rather than running the workstream itself." },
  { name: "Transaction Working Group", text: "Gives a weekly view of workstream progress and raises important risks, issues and dependencies. The Transaction Director chairs it and the Programme Manager runs it." },
  { name: "Internal PMO", text: "Resolves programme-management matters and flags items that need Internal SteerCo or joint escalation." },
  { name: "Joint PMO", text: "Manages joint planning, delivery, dependencies and issue resolution with the counterparty programme." },
  { name: "Internal and Joint SteerCo", text: "The Steering Committee gives senior direction and decides reserved internal or joint matters. Packs should focus on material exceptions, options, recommendations and decisions needed." },
];

export const REPORTING_RULES = [
  "do not average workstream RAG ratings into one programme status;",
  "do not report green when an unresolved dependency threatens the critical path;",
  "keep current completion separate from forecast readiness;",
  "show the evidence behind milestone and readiness claims;",
  "separate facts, assumptions and management judgement;",
  "name the decision owner and the last responsible decision date;",
  "record accepted risk and any conditions explicitly; and",
  "update the plan and logs after decisions are made, not just the presentation pack.",
];

export const ECONOMICS = [
  "approved budget, spend, forecast and resource assumptions;",
  "integration or separation costs and supplier commitments;",
  "business-case assumptions, synergies and when benefits land;",
  "stranded costs and obligations that are kept on;",
  "TSA (Transitional Services Agreement, which covers temporary services provided after completion) and Group Interchange costs (costs shared between Group teams and the country or business), service dependencies and exit timing;",
  "scope changes, delays and extended programme duration;",
  "customer attrition, onboarding constraints and product gaps;",
  "completion mechanics and funds-flow dependencies; and",
  "the cost of remaining risk, workarounds and weak readiness.",
];

export interface Choice { key: string; text: string }
export interface Scenario { id: string; title: string; situation: string; options: Choice[]; answer: string; feedback: string; lens?: Lens }

const opts = (...t: string[]): Choice[] => t.map((text, i) => ({ key: String.fromCharCode(65 + i), text }));

export const SCENARIOS: Scenario[] = [
  {
    id: "s1",
    title: "Two plans, one dependency",
    situation: "The Technology workstream reports green against its build milestone. Operations reports amber, because its procedure design depends on a Technology interface specification due next week. Technology says its build milestone is unaffected. The integrated plan has five days of spare time (float) before end-to-end testing, but the hand-off acceptance criteria are not explicit.",
    options: opts(
      "Keep both workstream ratings, describe the interface as a programme dependency, and use the available float before changing the overall forecast.",
      "Change both workstreams to amber until the specification is accepted, giving one consistent signal for reporting to senior leaders.",
      "Confirm the hand-off criteria and forecast jointly, assign a dated recovery plan, use the float openly, and set programme status based on the resulting effect on testing.",
      "Ask the Programme Manager to set the specification date and direct both workstreams to align their plans to that decision.",
    ),
    answer: "C",
    feedback: "Option C establishes the missing interface facts before deciding the overall consequence. Option A keeps local reporting but may understate the programme risk. Option B creates visibility but changes both ratings without separating their different outcomes. Option D uses programme authority to replace a delivery commitment that the owning teams must set.",
  },
  {
    id: "s2",
    title: "A decision before the forum",
    situation: "A new regulatory reading may affect client communications due to start on Monday. The relevant Compliance authority can meet today. The next Internal PMO is tomorrow, and SteerCo is next week. The communications workstream needs a decision by close of business to avoid supplier cancellation charges.",
    options: opts(
      "Take a provisional Central Hub decision today, let the activity continue, and get Compliance and governance to ratify it at the scheduled forums.",
      "Hold the activity until Internal PMO can consider the programme implications and decide whether to escalate further.",
      "Bring together the relevant Compliance and workstream authorities today, set out the options and consequences, record their decision, and use governance to deal with the resulting programme impacts.",
      "Let reversible supplier preparation continue until SteerCo, because the cost of cancellation currently outweighs the assessed regulatory risk.",
    ),
    answer: "C",
    feedback: "Option C sends the substantive decision to the correct authority without waiting for the governance calendar. Option A keeps momentum but goes beyond the Hub's specialist authority. Option B respects governance but delays a decision route that is already available. Option D weighs programme cost against a regulatory judgement the Hub does not own.",
  },
  {
    id: "s3",
    title: "Quality assurance without takeover",
    situation: "A Workstream Lead submits a detailed (L2) plan with named owners and dates, but the dependencies, acceptance criteria and resource assumptions are incomplete. The integrated baseline workshop is in four days. The Workstream Lead has strong functional knowledge but limited project support.",
    options: opts(
      "Ask the Central Hub PMO to rebuild the workstream plan so the integrated baseline can go ahead on time.",
      "Reject the plan against the published standard and require the Workstream Lead to return a compliant version before the workshop.",
      "Set out the specific gaps, agree a short fix plan, offer planning support where needed, and keep the Workstream Lead accountable for the content.",
      "Bring the current plan into the baseline with clear assumptions, and require the missing detail during the first execution reporting cycle.",
    ),
    answer: "C",
    feedback: "Option C combines support, quality assurance and clear ownership. Option A may solve the immediate planning problem but shifts functional planning into the Hub. Option B keeps accountability but may not fix a known capability gap. Option D keeps the timetable but risks approving a baseline that cannot yet be tested.",
  },
  {
    id: "td4",
    lens: "td",
    title: "Using programme contingency",
    situation: "The approved programme budget contains R5 million of unallocated contingency within your delegated authority. The Programme Manager recommends using R3 million for an additional data rehearsal and R2 million for extended client-onboarding support. Finance has confirmed that the combined proposal remains within the approved budget and has shown the forecast effect. Both Workstream Executives argue that their original R3 million request should be funded in full. The Executive Sponsor is unavailable, and the preferred supplier slots expire today.",
    options: opts(
      "Approve the recommended allocation, record the execution and value rationale, set any conditions or review points, and require the integrated plan, forecast and decision record to be updated.",
      "Divide the contingency equally because both risks are credible, then ask each Workstream Executive to manage the remaining exposure within the revised amount.",
      "Hold the allocation until the Executive Sponsor can arbitrate, because disagreement between senior workstream owners makes the decision material even though it remains within delegated authority.",
      "Authorise both suppliers to reserve their full scope, creating a temporary R1 million exposure, and seek approval for the excess before either commitment becomes payable.",
    ),
    answer: "A",
    feedback: "Option A uses the Transaction Director's delegated authority and bases the decision on the integrated programme recommendation rather than seniority or equal treatment. Option B is balanced but may not protect the transaction's most important outcomes. Option C gives away authority intended to keep execution moving. Option D protects optionality but creates an exposure beyond the approved allocation before that authority is confirmed.",
  },
  {
    id: "td5",
    lens: "td",
    title: "A joint milestone under pressure",
    situation: "The counterparty asks to move a joint migration rehearsal five days later. The revised date remains within the contractual window and does not move completion, but it reduces Absa's remediation period from six days to one. The counterparty says keeping the original date would displace a regulatory release and damage the working relationship. The Programme Manager presents two workable options: retain the date and require counterparty weekend cover, or accept the move and fund an Absa recovery team at an estimated R800,000 within the approved budget. Neither option removes all execution risk.",
    options: opts(
      "Accept the later date because the counterparty has a regulatory conflict and the request remains within the contractual window.",
      "Retain the original date because preserving Absa's remediation period is the clearest way to protect readiness.",
      "Engage the counterparty Transaction Director, test the joint consequences and recovery commitments, agree the best transaction outcome within mandate, and record triggers for escalation if the protected conditions fail.",
      "Send both options to the next Joint SteerCo because any change to a joint milestone should be decided through formal joint governance.",
    ),
    answer: "C",
    feedback: "Option C treats the matter as a joint execution trade-off and uses the senior relationship to reach a controlled decision while options remain open. Option A gives relationship considerations too much weight without securing recovery. Option B protects Absa's buffer but does not test the transaction-wide cost of the original date. Option D may be required if the trade-off exceeds delegated authority, but the facts do not yet show that formal escalation is necessary.",
  },
  {
    id: "pm4",
    lens: "pm",
    title: "Competing uses of contingency",
    situation: "The approved programme budget includes R5 million of unallocated contingency under the Transaction Director's delegated authority. Data Migration wants R3 million to add a rehearsal. Client Readiness wants R3 million to extend onboarding support. Both requests reduce real risk and could be trimmed. Delaying the decision by a week loses the preferred supplier slots.",
    options: opts(
      "Recommend giving R2.5 million to each workstream, so both risks get some funding within the approved budget.",
      "Ask both Workstream Executives to fund the activities from their own budgets, keeping programme contingency for unforeseen events.",
      "Compare the effect on critical path, customers, controls and value, build affordable options, and take a recommendation to the Transaction Director to decide within their authority.",
      "Escalate both requests to SteerCo, because combined demand exceeds the contingency, even though the final allocation can stay within the approved baseline.",
    ),
    answer: "C",
    feedback: "Option C is the Programme Manager's role: bring together the consequences and prepare a decision-ready recommendation for the Transaction Director. Option A looks balanced but does not test whether equal funding gives the best outcome. Option B may disconnect spend from programme priorities. Option D is right if the decision is beyond delegated authority, but the facts show an affordable option can stay within the baseline.",
  },
  {
    id: "pm5",
    lens: "pm",
    title: "Green sign-offs, incomplete integration",
    situation: "All Workstream Executives have submitted green readiness recommendations. During final runbook review, the Programme Manager finds that ownership of one cross-workstream rollback checkpoint is unclear. The event is unlikely but would affect customer access if recovery were needed. The formal go or no-go forum is in 48 hours.",
    options: opts(
      "Keep the workstream recommendations, and add the checkpoint as an amber programme condition with an owner to be confirmed before cutover.",
      "Change the affected workstreams to amber and ask their executives to resubmit readiness recommendations before the forum.",
      "Resolve the checkpoint owner and decision route urgently, check whether the runbook can still be delivered, and reflect the remaining risk in the overall recommendation.",
      "Present the green sign-offs unchanged and ask the formal forum to decide whether the cross-workstream gap matters to readiness.",
    ),
    answer: "C",
    feedback: "Option C tests the overall control and gives decision-makers a current recommendation. Option A may end up being right, but ownership and deliverability must be confirmed first. Option B changes workstream positions before checking whose evidence is affected. Option D pushes an unresolved programme issue into the decision forum.",
  },
  {
    id: "pmo4",
    lens: "pmo",
    title: "Conflicting information at cut-off",
    situation: "A Workstream Lead submits a green status. The latest controlled plan shows the key milestone moving by two days, but an email from the lead says the delay will be recovered. No recovery activity has yet been added to the plan. The report to senior leaders is due in 90 minutes, and the Programme Manager will be free in 30 minutes.",
    options: opts(
      "Use the Workstream Lead's green rating, add a note that recovery planning is in progress, and ask for the plan to be updated after it is circulated.",
      "Keep the last approved status, because the revised plan and recovery position have not yet gone through the reporting-control process.",
      "Reconcile the actual movement, prepare the exception and its possible impact, and ask the Programme Manager to decide the overall rating before the pack is finalised.",
      "Apply amber, because the controlled plan currently shows a delay, issue the pack on time, and let the Programme Manager amend the rating at governance.",
    ),
    answer: "C",
    feedback: "Option C keeps the facts, the deadline and the management decision separate and correct. Option A relies on an unsupported forecast. Option B keeps the previous status but hides newer, important information. Option D may be a reasonable stand-in, but PMO Support should not finalise management judgement when the Programme Manager is available before the pack goes out.",
  },
  {
    id: "pmo5",
    lens: "pmo",
    title: "A verbal decision",
    situation: "During an urgent call, the Transaction Director indicates support for extending a supplier contract. The Programme Manager asks PMO Support to update the plan and tell Procurement. The call did not confirm the approved amount, any conditions, or whether the Transaction Director was acting within their delegated budget. Procurement needs confirmation today to keep the current commercial terms.",
    options: opts(
      "Record the extension as approved on the Programme Manager's instruction, update the baseline, and ask Procurement to confirm the final value later.",
      "Draft the decision record with the missing amount, conditions and authority, get confirmation through the Programme Manager today, and update the controls only once the decision is complete.",
      "Record the decision as provisional, let Procurement reserve the terms, and get formal confirmation at the next Internal PMO.",
      "Route the extension to the next SteerCo, because the call did not produce a complete, auditable decision record.",
    ),
    answer: "B",
    feedback: "Option B makes the decision complete and traceable without delaying it unnecessarily. Option A treats an incomplete verbal indication as approval. Option C keeps momentum but could create a commitment before authority and conditions are clear. Option D protects governance but escalates beyond the same-day decision route that is already available.",
  },
];

export const scenariosFor = (lens: Lens) => SCENARIOS.filter((s) => !s.lens || s.lens === lens);

export const TEMPLATE_NOTICE =
  "The templates named in this module are not stored in the Capability Hub. Get the current approved versions from the programme team or the controlled programme workspace. Do not create an uncontrolled alternative where an approved template already exists.";

export const CORE_RESOURCES = [
  { name: "Hub and Spoke operating model", purpose: "Sets out programme roles, ownership, who decides what, interfaces, and the central, functional and regional delivery model.", when: "During mobilisation, when designing accountability, and in any ownership or escalation dispute." },
  { name: "Mobilisation roadmap and toolkit", purpose: "Gives the mobilisation sequence, gates, minimum controls, role standards and planning framework.", when: "Before signing where possible, and throughout mobilisation and baseline approval." },
  { name: "Lifecycle master and archetype guidance", purpose: "Identifies transaction activities, considerations and documents that may apply to the deal.", when: "To tailor mobilisation, workstream activation and planning depth to the transaction." },
  { name: "Onboarding pack and rules of engagement", purpose: "Explains deal context, confidentiality, governance, responsibilities and approved ways of working.", when: "At programme launch, and when new members join." },
  { name: "Programme organisation chart and interface directory", purpose: "Records roles, contacts, deputies, counterpart interfaces and escalation routes.", when: "During mobilisation, and whenever accountabilities or people change." },
  { name: "Governance terms of reference and calendar", purpose: "Sets out each forum's authority, purpose, attendees, inputs, outputs, frequency and production deadlines.", when: "When setting up or changing internal and joint governance." },
  { name: "Integrated programme plan", purpose: "Connects transaction milestones, critical path, workstream plans, dependencies and decision dates.", when: "Maintain throughout planning, execution, readiness, cutover and closure." },
  { name: "Programme RAID, dependency, action, decision and change logs", purpose: "Give traceable ownership, ageing, escalation and closure across the programme.", when: "Maintain continuously, and update after decisions or material changes." },
  { name: "Integrated status and executive reporting pack", purpose: "Gives senior leaders a clear view of the forecast, material exceptions, costs and decisions needed.", when: "At the agreed reporting frequency, and whenever material conditions change." },
  { name: "Budget and business-case tracking inputs", purpose: "Connect spend, forecast, costs, benefits, synergies and financial risks to delivery decisions.", when: "During baseline approval, change control and ongoing performance reporting." },
];

export const RELEVANT_RESOURCES = [
  { name: "Testing governance and defect reporting", text: "Brings together testing scope, evidence, defects, exit criteria and escalation, without moving test execution to the Hub." },
  { name: "Dress-rehearsal and cutover runbook", text: "The runbook is the timed plan of cutover activities, owners, dependencies and fallback actions. It sequences transaction-critical actions, checkpoints, fallbacks, communications and authority." },
  { name: "Go or no-go scorecard and decision paper", text: "Brings together functional and local recommendations, evidence, conditions, exceptions and remaining risk for formal governance." },
  { name: "Cutover checkpoint and command-centre status", text: "Records progress, issues, decisions, ownership and escalation during live execution." },
  { name: "Hypercare RAID, stability dashboard and daily status", text: "Gives one view of incidents, trends, remaining actions, service stability and BAU handover." },
  { name: "Lessons-learned record", text: "Captures useful programme lessons and updates reusable standards and playbooks." },
];

export const MATCHING = [
  { need: "Define who decides and what each forum produces", resource: "Governance terms of reference" },
  { need: "Understand whether a late workstream output affects transaction timing", resource: "Integrated programme plan" },
  { need: "Record a reserved decision and make sure it is followed through", resource: "Decision log" },
  { need: "Present the transaction-level readiness position", resource: "Go or no-go scorecard and decision paper" },
  { need: "Confirm whether the programme can leave mobilisation", resource: "Mobilisation completion dashboard and gate pack" },
];

export interface Question { q: string; options: Choice[]; answer: string; feedback: string }

export const QUESTIONS: Question[] = [
  {
    q: "A Workstream Lead asks to move from weekly to fortnightly reporting because delivery is stable. The workstream supplies an input to another team every week, but no current milestone is late. What is the best Central Hub response?",
    options: opts(
      "Keep weekly reporting for every workstream, because one common frequency is needed for consistent programme control.",
      "Check the dependency and the information need, then set a reporting frequency that fits: keep weekly visibility of the hand-off without requiring full reporting every time.",
      "Let the Workstream Lead choose the frequency, because workstream governance sits with the functional owner.",
      "Ask Internal PMO to approve the change, because reporting frequency is a programme-level governance decision.",
    ),
    answer: "B",
    feedback: "The Hub owns reporting discipline and can tailor it to fit. Consistency does not mean identical effort everywhere, when the needed programme information can be kept through a narrower check.",
  },
  {
    q: "Two technically valid control designs have the same programme timing. One is cheaper. The control function prefers the other because it is easier to run. The workstream asks the Programme Manager to choose. What should happen?",
    options: opts(
      "Pick the cheaper design, because the programme impact is otherwise the same and the Hub protects deal costs.",
      "Pick the simpler design to run, because the control function has clearly said it prefers it.",
      "Ask the Transaction Director to decide, because the options involve a cost and operating-model trade-off.",
      "Make sure the cost and programme implications are visible, then route the design decision to the accountable functional or control authority.",
    ),
    answer: "D",
    feedback: "The Hub brings the consequences together but does not gain functional design authority just because the options affect programme reporting or cost.",
  },
  {
    q: "PMO Support receives three workstream updates using different RAG definitions shortly before the reporting cut-off. The underlying facts are available, but two ratings cannot be reconciled without management judgement. What is the best response?",
    options: opts(
      "Apply the agreed definitions to the factual information, flag the judgement gaps and escalate them to the Programme Manager before pulling the report together.",
      "Keep each workstream's submitted rating and explain the inconsistency in the report to senior leaders.",
      "Use the most cautious rating for the two uncertain workstreams, so the programme does not understate risk.",
      "Return all three updates and delay programme reporting until the Workstream Leads provide compliant submissions.",
    ),
    answer: "A",
    feedback: "PMO Support should apply agreed controls to the facts, but should not invent management judgement. Escalating the unresolved ratings keeps both the timeline and the decision authority intact.",
  },
  {
    q: "Every workstream reports green, but a joint buyer dependency has no confirmed owner and sits on the critical path. The counterparty believes ownership can be agreed next week, within the remaining spare time (float). How should the programme position be presented?",
    options: opts(
      "Green, because the workstream evidence is complete and the dependency stays within available float.",
      "Amber, because any unowned critical-path dependency automatically sets the programme's RAG status.",
      "Based on the forecast effect, the available recovery window, and confidence in securing ownership, with the exception, owner deadline and consequence stated clearly.",
      "Keep it green internally but present it as amber in the joint pack until the counterparty confirms ownership.",
    ),
    answer: "C",
    feedback: "Programme status should reflect evidence and forecast, not a fixed rule. The unresolved critical-path ownership must stay visible, even if the current float may protect the date.",
  },
  {
    q: "The integrated readiness pack contains complete functional recommendations and one accepted, high remaining risk. Which division of responsibility fits best before the formal go or no-go forum?",
    options: opts(
      "PMO Support decides the programme recommendation from the submitted evidence, and the Programme Manager presents it to formal governance.",
      "PMO Support confirms that evidence, conditions and approvals are complete; the Programme Manager forms the integrated assessment and options; the Transaction Director tests and sponsors the execution recommendation; authorised governance makes and records the decision.",
      "The Transaction Director makes the go or no-go decision because that role is accountable for successful execution, and the Executive Sponsor ratifies it after cutover.",
      "The Programme Manager presents the individual workstream positions and accepted risk without an integrated recommendation, because source evidence remains owned by the functions.",
    ),
    answer: "B",
    feedback: "PMO Support controls completeness and traceability. The Programme Manager integrates the evidence and consequences. The Transaction Director applies execution-level judgement and sponsors the recommendation. Formal governance keeps the go or no-go decision.",
  },
];

export const PLAYBOOK = [
  {
    title: "Before launching the programme",
    items: [
      "Is the deal perimeter and mobilisation mandate clear enough?",
      "Are leadership roles accepted, empowered and properly resourced?",
      "Is the central, functional and regional delivery split clear?",
      "Are the controlled workspace, limits and communication routes active?",
      "Do forums have clear decision authority, inputs, outputs and deadlines?",
      "Have the programme controls and escalation routes been tested?",
    ],
  },
  {
    title: "Before integrating a workstream update",
    items: [
      "Is the detailed plan current and linked to an agreed outcome?",
      "Are milestone forecasts backed by evidence and acceptance criteria?",
      "Are resource assumptions credible?",
      "Are dependencies named, dated and accepted by both sides?",
      "Does the status reflect forecast impact, not just completed activity?",
      "Are the cost or readiness consequences visible?",
    ],
  },
  {
    title: "Before a governance forum",
    items: [
      "Which decisions are needed, and who owns them?",
      "What are the options, consequences and recommendation?",
      "What is the last responsible decision date?",
      "Are the right authorities attending or available?",
      "Have urgent issues already been routed, rather than saved for the meeting?",
      "Will actions and decisions be recorded and added to the plan?",
    ],
  },
  {
    title: "Before reporting the programme position",
    items: [
      "Does the status reflect the integrated critical path?",
      "Have conflicting workstream assumptions been reconciled?",
      "Are material dependencies and exceptions clear?",
      "Is accepted risk clearly separated from unresolved risk?",
      "Are budget, benefits, costs and obligations linked to delivery changes?",
      "Can a senior leader understand what changed and what is needed from them?",
    ],
  },
  {
    title: "Before a readiness recommendation",
    items: [
      "Are all required functional and local recommendations present?",
      "Is the underlying evidence complete, accepted and traceable?",
      "Have cross-workstream and counterparty dependencies been tested?",
      "Are runbook tasks, checkpoints, fallbacks and authority workable?",
      "Are conditions, exceptions and remaining risks clear?",
      "Does the recommendation separate Hub judgement from formal governance authority?",
    ],
  },
  {
    title: "Before programme closure",
    items: [
      "Are remaining actions owned and governed in business as usual?",
      "Is BAU acceptance evidenced across affected functions and countries?",
      "Are TSA, Group Interchange and retained obligations still visible?",
      "Is programme information kept in the controlled location?",
      "Have lessons changed a template, standard or future mobilisation approach?",
      "Is closure based on stable outcomes, rather than just the end of the reporting cycle?",
    ],
  },
];

export const PRINCIPLES = [
  "Look at the whole transaction, not just the reports.",
  "Protect ownership while giving support and challenge.",
  "Make the critical path and dependencies clear.",
  "Route decisions to the authority that owns them.",
  "Escalate before options run out.",
  "Connect delivery choices to deal costs and value.",
  "Build readiness recommendations from accepted evidence.",
  "Turn decisions into controlled actions and lessons kept for next time.",
];
