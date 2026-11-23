/** Content for the In-country PMO learning module. Copy simplified per the plain-language brief. */

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

export type Context = "supported" | "joint" | "local";

export const LEARNING_OUTCOMES = [
  "explain how country maturity changes local ownership and support needs;",
  "tell apart what the country can decide locally and what must stay with central or specialist authority;",
  "get up to speed early on the deal, its obligations and what they mean locally;",
  "build and maintain a credible local plan, controls and readiness view;",
  "keep customer, employee, regulatory and operational needs visible alongside technology delivery;",
  "check that a shared plan date really means both sides agree what will be delivered;",
  "manage local issues, defects and dependencies between governance events; and",
  "raise Group-wide blockers and cost or revenue impacts with clear, decision-ready evidence.",
];

export const CONTEXTS: { id: Context; name: string; text: string }[] = [
  {
    id: "supported",
    name: "Supported delivery",
    text: "The country has limited transaction experience, specialist skills, formally authorised decision-making power or spare capacity. The local PMO (programme management office, the team that maintains plans, reporting and delivery controls) supplies facts, access and local logistics. The Central Hub and functional spokes give more hands-on planning, standards and leadership.",
  },
  {
    id: "joint",
    name: "Joint delivery",
    text: "The country has capable day-to-day specialists and some transaction experience. The local PMO leads defined local activities and produces evidence. Central and functional teams set standards, challenge outputs and help deliver complex matters.",
  },
  {
    id: "local",
    name: "Locally led delivery",
    text: "The country has experienced leads, reliable controls, strong evidence and formally authorised decision-making power. The local PMO drives local planning, execution, decision papers and readiness evidence. Central teams challenge the work, keep it aligned with the Group and escalate specialist matters.",
  },
];

export const CONTEXT_WARNING =
  "Country maturity changes how much delivery the country can own. It does not hand the country authority over scope, budget, Legal Day 1 (LD1, when legal ownership changes), the Transitional Services Agreement (TSA, temporary services provided after the deal completes), the go or no-go decision (whether it is safe to proceed), Group policy, or accepting a risk that remains after controls are applied.";

export const RELATIONSHIPS = [
  { name: "Country leadership and workstreams", text: "Own local outcomes, activities, stakeholder engagement, evidence and decisions within the authority they have been given. The In-country PMO coordinates and challenges their delivery." },
  { name: "Central Hub", text: "The Central Hub is the central team that coordinates the overall programme. It owns transaction-wide governance, the single combined plan, links between workstreams, reporting to senior leaders, programme standards and transaction-level escalation. It gives direction and clears Group-wide blockers." },
  { name: "Functional Spokes and control functions", text: "Functional Spokes are the central specialist teams for each function. They own Group standards, functional design, specialist interpretation and approvals that must stay with them. They give more hands-on delivery support where country skills or authority are limited." },
  { name: "Local external environment", text: "Includes regulators, customers, employees, suppliers and permitted counterparty contacts. The country supplies the local knowledge and access needed to turn programme assumptions into workable local action." },
];

export const MANDATE = {
  own: {
    label: "Own locally",
    lead: "Depending on the agreed country operating context and the authority the country has been given, the In-country PMO owns or drives:",
    items: [
      "collecting and checking local facts, constraints and stakeholder information;",
      "assessing local impact on customers, employees, products, processes, technology, data, controls, suppliers and legal entities;",
      "the local workstream plan, milestones, owners and dependencies (tasks or decisions that other work relies on);",
      "day-to-day coordination of local execution and fixes;",
      "the local RAID log (risks, assumptions, issues and dependencies), plus actions and decisions;",
      "local resource and capacity information, including clashes with normal day-to-day work (business as usual, or BAU);",
      "local status, forecasts and raising issues;",
      "producing and controlling local readiness evidence (proof that people, processes, technology, data and controls are ready);",
      "coordinating local testing, rehearsal, cutover (the controlled move to the new way of working) and hypercare (extra monitoring and support just after cutover); and",
      "handing local work back to business as usual and closing remaining actions.",
    ],
    note: "In a supported-delivery context, the country may contribute to some of these activities rather than own them. Write down the agreed split rather than assuming it.",
  },
  coordinate: {
    label: "Coordinate",
    lead: "The In-country PMO coordinates with:",
    items: [
      "country Accountable Executives, Workstream Executives, Workstream Leads and local specialists;",
      "the Central Hub on the combined plan, governance, reporting, dependencies and transaction-level escalation;",
      "functional spokes on standards, design, approvals and specialist support;",
      "local Legal, Compliance, Risk, Finance, Human Capital, Technology and other control or enabling functions;",
      "permitted counterparty contacts on local hand-offs, information requests and joint milestones;",
      "local suppliers and service providers, through the accountable function; and",
      "local regulators and customers, through the authorised functional and governance routes.",
    ],
    note: undefined,
  },
  escalate: {
    label: "Escalate",
    lead: "Raise a matter to someone with the authority to resolve it (escalate) when:",
    items: [
      "a decision affects transaction scope, budget, timing, LD1, the TSA, the go or no-go decision, or reporting to senior leaders;",
      "the matter needs Group policy, product, risk, legal, finance, tax, compliance or technology architecture authority;",
      "local legal or regulatory requirements are unclear or conflict with central assumptions;",
      "a serious customer, employee, regulatory or operational impact is emerging;",
      "a cross-border, Group or counterparty dependency cannot be resolved locally;",
      "country capacity, skills or decision authority is not enough for the work assigned;",
      "the country and central team do not agree on what a milestone or hand-off means;",
      "local readiness evidence is incomplete or does not match the reported status; or",
      "an issue is close to the last date on which it can still be fixed.",
    ],
    note: undefined,
  },
} as const;
export type MandateKey = keyof typeof MANDATE;

export const BOUNDARY =
  "interpreting the sale and purchase agreement (SPA), Group policy, specialist functional approval, the combined programme plan, the transaction business case, transaction-wide budget decisions, the formal go or no-go decision, or reporting to senior leaders.";
export const BOUNDARY_OWNS =
  "The country does own explaining how those decisions, commitments and assumptions affect local delivery.";

export const SUCCESS_MEASURES: [string, string][] = [
  ["Early local involvement", "local implications are visible before mobilisation plans are fixed."],
  ["Local plan quality", "country activities, owners, resources, dependencies and evidence can actually be delivered."],
  ["Ownership clarity", "central, functional and local responsibilities are clear and agreed."],
  ["Customer and operational readiness", "technology progress is connected to real customer journeys and local operations."],
  ["Issue resolution", "local matters are solved quickly, and Group blockers are escalated with the full facts."],
  ["Interface reliability", "central, country and counterparty hand-offs mean the same thing to everyone involved."],
  ["Evidence quality", "status and readiness are backed by controlled local evidence."],
  ["Local value protection", "customer, cost, timing, supplier and business-case impacts are raised early."],
];

export const START_STEPS = [
  { title: "Get an early deal handover", good: "The country understands the deal's direction, what is and is not included (the transaction perimeter), its objectives, target dates, affected entities and known findings from due diligence. Open questions and missing information are visible.", evidence: "Country transaction summary, due diligence handover, key assumptions, information requests and named source owners." },
  { title: "Turn obligations into local actions", good: "The authorised experts explain legal, regulatory and contractual obligations in plain delivery language. The country understands what must happen, by when, who owns the interpretation and what evidence is needed. The PMO does not interpret legal wording itself.", evidence: "Plain-language obligation map, source reference, accountable authority, local action, deadline and any open interpretation questions." },
  { title: "Assess country maturity, authority and capacity", good: "The programme has tested local transaction experience, specialist skills, formally authorised decision-making power, spare capacity, data quality, governance quality and regulatory capability. Gaps have owners and dates for support or backfill.", evidence: "Country maturity assessment, role appointments, capacity view, business-as-usual constraints, delegated authority and support plan." },
  { title: "Map the full local impact", good: "The impact assessment covers customers, employees, operations, products, processes, technology, data, controls, suppliers, property and local legal entities. It does not assume technology is the whole transaction.", evidence: "Local impact map, customer journeys, stakeholder map, service dependencies, regulatory implications and open design questions." },
  { title: "Agree the central, functional and local split", good: "Every important activity has one accountable owner and a clear support model. The country owns more where it has the maturity and authority to do so; central and functional teams support more where there is a documented gap.", evidence: "Country RACI (who is Responsible, Accountable, Consulted and Informed), execution split, exceptions, decision routes, named deputies and escalation paths." },
  { title: "Build the local delivery controls", good: "The local plan, RAID log, dependencies, actions, decisions, status and evidence locations follow programme standards while reflecting local activities and lead times. Reporting definitions and deadlines are understood.", evidence: "Local level-2 plan, controlled logs, governance calendar, status format, evidence index and reporting cut-offs." },
  { title: "Check that hand-offs mean the same thing to both sides", good: "For each central, functional or counterparty hand-off, both sides agree the content, format, acceptance criteria (the conditions that must be met before it is accepted), owner, due date and evidence of completion. A date in a joint plan is not treated as proof that both sides agree.", evidence: "Interface directory, hand-off definitions, acceptance criteria, joint assumptions, dependency owners and escalation dates." },
  { title: "Plan readiness and transition early", good: "Testing, dress rehearsals (practice runs of the cutover plan), cutover, customer and employee readiness, contingency, hypercare and business-as-usual handover are planned before execution pressure makes them hard to add.", evidence: "Readiness criteria, test and rehearsal implications, cutover ownership, fallback assumptions, hypercare model and BAU acceptance route." },
];

export const INTENSITY = [
  { period: "Due diligence and legal preparation", intensity: "Targeted but important", level: 2, text: "Supply local facts and flag customer, regulatory, operational and execution implications early." },
  { period: "Mobilisation and planning", intensity: "Highest", level: 4, text: "Close the knowledge gap, confirm ownership and capacity, map local impact and build the local plan." },
  { period: "Programme execution", intensity: "Highest", level: 4, text: "Drive local activity, solve problems, maintain controls and escalate Group or counterparty blockers." },
  { period: "Testing and dress rehearsals", intensity: "High", level: 3, text: "Coordinate local participation, evidence, defects, data and recovery between rehearsal events." },
  { period: "Readiness and cutover", intensity: "Highest", level: 4, text: "Confirm local execution and customer and operational readiness, and support command-centre escalation." },
  { period: "Hypercare and handover", intensity: "Medium to high", level: 3, text: "Coordinate local issue closure, service stability, remaining actions and BAU acceptance." },
];

export const CONTROL_RHYTHM = [
  { title: "Refresh the local position", text: "Update the local plan, milestones, RAID log, dependencies, actions, decisions, resources and evidence. Confirm actual progress with the people doing the work." },
  { title: "Test the customer and operational view", text: "Check whether technology progress is matched by customer journeys, communications, onboarding, training, operational processes, controls and local service readiness." },
  { title: "Resolve local matters", text: "Use the authority the country has been given, and country governance, to solve issues that belong locally. Do not send every operational matter to the centre." },
  { title: "Reconcile with the programme", text: "Align local milestones, dependencies and forecasts with the Central Hub and functional spokes. Find where the same plan item is being read differently." },
  { title: "Escalate complete problems", text: "For Group, functional or counterparty blockers, provide the facts, local impact, options, your recommendation, who needs to decide, and the last date a decision can still work." },
  { title: "Close the loop", text: "Bring decisions back into the local plan, confirm the affected teams understand them, and keep evidence of actions, acceptance and closure." },
];

export const HANDOFF_TEST = [
  "What exactly will be delivered?",
  "In what format and to which standard?",
  "Who produces it and who accepts it?",
  "What is the committed date and time?",
  "What evidence confirms completion and acceptance?",
  "What happens if the hand-off is late or incomplete?",
];

export const BETWEEN_REHEARSALS = [
  "classify each defect and what it means for delivery;",
  "distinguish Absa, seller and joint ownership of each defect;",
  "secure the data, access and approvals needed to fix it;",
  "agree fix and evidence deadlines;",
  "track the age of actions and escalate them before the next rehearsal window;",
  "check whether the Absa defect process can move fast enough;",
  "confirm that closure evidence meets the acceptance criteria; and",
  "update the next rehearsal's goals and the maturity you expect to see.",
];

export const FIREFIGHTING = [
  { title: "Stabilise", text: "Protect customers, operations and critical deadlines. Confirm who owns the issue right now and what the facts are." },
  { title: "Route", text: "Resolve it within local authority, or escalate it with a complete decision request. Do not let urgency hide who owns the decision." },
  { title: "Prevent recurrence", text: "Update the plan, RAID log, evidence and the underlying control so the same issue does not come back through another workstream or rehearsal." },
];

export const ECONOMICS = [
  "customer attrition, delayed outreach and onboarding failure;",
  "product gaps, pricing issues and local revenue impacts;",
  "regulatory approval delays and local commitments;",
  "resource gaps, clashes with day-to-day work, travel and backfill needs;",
  "supplier costs, local contract issues and market constraints;",
  "rework caused by unclear hand-offs or repeated defects;",
  "local technology, data, property and operational readiness costs;",
  "TSA, recharge, buy-back or retained-service impacts that are visible locally; and",
  "delays that extend the programme or push back its benefits.",
];

export interface Choice { key: string; text: string }
export interface Scenario { id: string; title: string; situation: string; options: Choice[]; answer: string; feedback: string }

const opts = (...t: string[]): Choice[] => t.map((text, i) => ({ key: String.fromCharCode(65 + i), text }));

export const SCENARIOS: Scenario[] = [
  {
    id: "s1",
    title: "A late legal handover",
    situation: "The country PMO joins the transaction after signing. The sale agreement seems to require action on local customer consent before a stated date, but the wording is unfamiliar and the local plan does not yet include this activity. Legal can clarify tomorrow. The customer team needs to reserve outreach capacity this week.",
    options: opts(
      "Add a customer-consent milestone using the date in the agreement and start detailed planning, subject to later legal confirmation.",
      "Ask Legal for a plain-language obligation, owner, evidence and deadline. Meanwhile, start reversible capacity and data-preparation actions and record the assumption clearly.",
      "Keep the matter out of the local plan until Legal confirms whether an obligation exists, to avoid an unsupported interpretation in programme controls.",
      "Escalate the possible obligation to the Central Hub and ask it to decide the local planning treatment before the country commits resources.",
    ),
    answer: "B",
    feedback: "Option B keeps the legal decision with Legal while using the available time for no-regret preparation. Option A risks turning an unverified reading of the agreement into a firm delivery commitment. Option C protects accuracy but loses useful preparation time. Option D makes the uncertainty visible, but it asks the Central Hub to settle a legal and local delivery matter that needs the relevant experts.",
  },
  {
    id: "s2",
    title: "Technology green, customer readiness uncertain",
    situation: "Four weeks before the readiness gate, the local technology lead reports green. End-to-end configuration is progressing to plan. Customer communications are not yet approved, frontline training dates are provisional and the complaints process has not been tested. No individual milestone is currently late.",
    options: opts(
      "Keep the local status green, since the committed technology milestones are on plan, and track the customer activities as separate readiness actions.",
      "Move the whole country status to red, because untested customer and complaints processes are a serious readiness gap.",
      "Build a combined customer-readiness path with owners and evidence, check the forecast against the gate, and report the country position based on the overall operational outcome.",
      "Ask the Central Hub to set up a Client Readiness workstream before changing the country status or adding new milestones.",
    ),
    answer: "C",
    feedback: "Option C tests the real local outcome instead of letting technology progress stand in for readiness. Option A keeps the technology status accurate but may misstate the country's overall position. Option B may turn out to be right, but it sets the severity before checking whether recovery is still possible. Option D may improve programme structure, but it does not remove the country's job of showing and planning for the local gap now.",
  },
  {
    id: "s3",
    title: "A Group blocker in a local plan",
    situation: "A local supplier must be onboarded before Legal Day 1 (LD1). The country team has finished its commercial assessment, but Group Procurement must approve an exception to policy. The supplier slot expires in ten working days. The Central Hub asks whether it should take over the supplier action.",
    options: opts(
      "Hand the activity to the Central Hub, because the remaining decision sits with a Group function and cannot be resolved locally.",
      "Keep the local supplier outcome with the country, send a complete exception request and impact assessment, and ask the Central Hub to coordinate the Group decision by a set date.",
      "Keep the activity local and ask the supplier to hold the slot while country leadership pursues the exception through normal business channels.",
      "Add a backup supplier to the local plan and delay Group escalation unless the preferred supplier slot is lost.",
    ),
    answer: "B",
    feedback: "Option B keeps the country's ownership of the delivery outcome while using the Central Hub to clear the Group-level blocker. Option A hands over more ownership than the blocker requires. Option C may use a valid relationship, but it does not protect the deadline through proper programme escalation. Option D gives useful contingency but delays action on the preferred, potentially critical, option.",
  },
  {
    id: "s4",
    title: "The same date, different meaning",
    situation: "The joint plan states that the seller will provide customer data on 10 May. The seller understands this as an initial extract for review. The country onboarding team assumes it will get a cleansed, approved file it can load straight away. The difference emerges two weeks before the date, with little schedule contingency left.",
    options: opts(
      "Treat the joint-plan wording as the binding commitment and escalate if the file is not ready to load on 10 May.",
      "Change the local plan to assume an initial extract, keeping contingency by moving preparation work ahead of receipt.",
      "Agree jointly what will be delivered, in what quality, who approves it, what evidence is needed and the recovery dates, then show the confirmed consequence in both the local and combined plans.",
      "Ask the Central Hub and counterparty PMO to resolve the disagreement while the country team keeps planning on the load-ready assumption.",
    ),
    answer: "C",
    feedback: "Option C turns an assumed agreement into a hand-off that actually works. Option A relies on wording that both sides read differently. Option B may be sensible for recovery, but it changes the assumption before the parties agree the hand-off. Option D uses the right escalation route but leaves the local plan exposed while others resolve the issue.",
  },
  {
    id: "s5",
    title: "A defect approaching the next rehearsal",
    situation: "The first dress rehearsal found a data defect jointly owned by Absa and the seller. The seller must approve and send a corrected extract. Absa must then process it through the defect route. Five days before the second rehearsal, approval is still outstanding and Absa's processing takes four days. The cutover manager owns the rehearsal runbook (the timed plan of cutover activities, owners, dependencies and fallback actions).",
    options: opts(
      "Keep the defect open for the second rehearsal, since the cutover manager can decide whether the affected step stays in scope.",
      "Ask the seller for an urgent response and prepare to log the same defect again if the corrected data misses the processing window.",
      "Work out the last time the data can arrive and still be processed, escalate seller approval and Absa processing together, agree how to handle the rehearsal, and record the readiness consequence before the window closes.",
      "Remove the affected step from the second rehearsal so the rest of the runbook can show progress while the fix continues.",
    ),
    answer: "C",
    feedback: "Option C manages the whole chain of dependencies rather than treating seller approval and Absa processing as separate problems. Option A recognises the cutover manager's role but delays the readiness decision. Option B may get the data but does not protect the internal processing deadline. Option D may be the right call, but only once the evidence gap and readiness consequence have been assessed through the proper route.",
  },
];

export const TEMPLATE_NOTICE =
  "The templates named in this module are not stored in the Capability Hub. Get the current approved versions from the Central Hub, the programme team or the controlled programme workspace. Do not create your own version where an approved template already exists.";

export const CORE_RESOURCES = [
  { name: "Regional Spoke operating-model section", purpose: "Explains country maturity, what the country owns, what must stay central, and the support model you should expect.", when: "During mobilisation and whenever local versus central ownership is unclear." },
  { name: "Country transaction summary and obligation map", purpose: "Turns the deal perimeter, obligations, restrictions and dates into local delivery implications, without replacing legal or specialist interpretation.", when: "At handover, during mobilisation and when new commitments emerge." },
  { name: "Country maturity and capacity assessment", purpose: "Tests transaction experience, functional skills, decision authority, spare capacity, governance and evidence capability.", when: "Before agreeing the country delivery model and when capacity or ownership changes." },
  { name: "Local impact assessment", purpose: "Identifies effects on customers, employees, products, processes, technology, data, controls, suppliers and local entities.", when: "During mobilisation, design and readiness planning." },
  { name: "Country RACI and interface directory", purpose: "Records who is central, functional, local or counterparty owner, their contacts, deputies and escalation routes.", when: "During mobilisation and whenever a hand-off or authority is disputed." },
  { name: "Local level-2 plan", purpose: "Makes local activities, owners, dates, resources, dependencies and acceptance criteria deliverable in practice.", when: "Maintain throughout planning, execution, readiness, cutover and handover." },
  { name: "Local RAID, action, decision and dependency logs", purpose: "Give traceable local ownership, escalation, ageing and closure.", when: "Maintain continuously and reconcile with programme controls." },
  { name: "Country status report", purpose: "Gives an evidence-based view of local forecast, customer and operational readiness, exceptions and decisions needed.", when: "At the agreed programme cadence and when material conditions change." },
  { name: "Customer journey and stakeholder map", purpose: "Stops technology delivery from hiding the real customer, employee and service experience.", when: "During impact assessment, readiness planning and local communications or training design." },
  { name: "Local readiness evidence index", purpose: "Links local criteria, evidence owners, approvals, gaps and sign-off status.", when: "From planning through go-or-no-go preparation and BAU handover." },
  { name: "Previous transaction lessons and country playbooks", purpose: "Reuses proven controls, common pitfalls and practical delivery lessons, without assuming two transactions have identical requirements.", when: "During mobilisation, rehearsal planning and issue prevention. Check every reused assumption against the current deal." },
];

export const RELEVANT_RESOURCES = [
  { name: "Local regulatory and commitments tracker", text: "Tracks local submissions, conditions, evidence, lead times and dependencies through the authorised Compliance and Legal routes." },
  { name: "Testing plan, scripts and evidence", text: "Records local scenarios, participants, results, defects and acceptance evidence." },
  { name: "Dress-rehearsal defect and checkpoint records", text: "Track ownership, fixes, seller or Absa dependencies, closure evidence and the maturity expected before the next rehearsal." },
  { name: "Cutover runbook and checkpoint status", text: "Defines local execution tasks, dependencies, evidence, fallbacks and escalation within the transaction command structure." },
  { name: "Hypercare RAID and local stability status", text: "Supports fast issue triage, trend visibility, remaining actions and a controlled move to business as usual." },
];

export const MATCHING = [
  { need: "Determine how much delivery the country should own", resource: "Country maturity and capacity assessment" },
  { need: "Convert a signed obligation into a local action without interpreting it independently", resource: "Country obligation map" },
  { need: "Confirm what the seller must provide and what acceptance means", resource: "Interface and dependency record" },
  { need: "Prevent a technology-only view of readiness", resource: "Customer journey and stakeholder map" },
  { need: "Show whether a rehearsal defect is genuinely closed", resource: "Dress-rehearsal defect record and evidence" },
];

export interface Question { q: string; options: Choice[]; answer: string; feedback: string }

export const QUESTIONS: Question[] = [
  {
    q: "A high-maturity country has the skills and authority to lead local testing. The test reveals a possible breach of a Group control standard. Who should own the next steps?",
    options: opts(
      "The country owns both the interpretation of the control and the fix, because local testing was delegated to it.",
      "The Central Hub takes over testing because a Group standard has become relevant to readiness.",
      "The country owns the local facts, evidence and fix, while the relevant functional or control authority decides the Group-standard position.",
      "The issue goes straight to the senior decision-making forum, because country delegation no longer applies once a control concern appears.",
    ),
    answer: "C",
    feedback: "Local maturity supports owning execution and evidence. It does not automatically give the country authority to interpret a Group standard or accept a risk that must stay with a central or specialist authority.",
  },
  {
    q: "A legal commitment seems relevant to local customer notices, but the country cannot confidently interpret its wording. The notice-planning window has already started. What is the best first response?",
    options: opts(
      "Use the most cautious reading in the local plan until Legal advises otherwise.",
      "Ask for an authoritative delivery translation and start reversible preparation against a clearly recorded assumption.",
      "Remove the item from planning until the legal position is confirmed, to protect the plan from unsupported content.",
      "Ask the Central Hub to choose the planning interpretation so local teams can carry on.",
    ),
    answer: "B",
    feedback: "The country should not make the legal judgement itself, but it can save delivery time through open, reversible preparation while the authorised interpretation is obtained.",
  },
  {
    q: "A country activity is blocked only by a Group approval. Which statement best describes the ownership split?",
    options: opts(
      "The Central Hub becomes accountable for the whole activity because it coordinates Group functions.",
      "The country keeps the delivery outcome, the functional owner decides the reserved matter, and the Central Hub coordinates the dependency and escalation.",
      "The functional owner becomes accountable for local execution until the approval is complete.",
      "The country should use normal business approval routes before bringing the matter into programme governance.",
    ),
    answer: "B",
    feedback: "A central blocker does not automatically transfer the local outcome. The programme should keep delivery ownership, decision authority and escalation coordination separate.",
  },
  {
    q: "Technology is on plan, but customer onboarding evidence is incomplete and the recovery window is narrowing. How should country status be decided?",
    options: opts(
      "From the combined forecast for the required local outcome, showing the evidence gap and the decision date clearly.",
      "From the technology milestone, because it is the main dependency for onboarding.",
      "From the most cautious workstream rating until all local evidence is complete.",
      "By the Central Hub, because it owns combined readiness and reporting to senior leaders.",
    ),
    answer: "A",
    feedback: "The country should give an honest local readiness forecast. The Central Hub combines that view with others, but it cannot create the underlying customer evidence or the local judgement.",
  },
  {
    q: "A seller deliverable and an Absa processing step must both finish before the next rehearsal. The seller's date is uncertain, while Absa's internal lead time is fixed. What is the most useful escalation?",
    options: opts(
      "Escalate the seller date alone, because the external party caused the first delay.",
      "Ask the cutover manager whether the rehearsal can go ahead, and treat the processing time as an internal planning matter.",
      "Present the full chain of dependencies, the last time the data can arrive, the internal processing limit, the rehearsal consequence, and the decision or recovery options.",
      "Move the local rehearsal activity to the next available window so the programme forecast reflects the current uncertainty.",
    ),
    answer: "C",
    feedback: "The useful escalation shows the combined dependency and its last workable decision point, not just one party's delay on its own.",
  },
];

export const PLAYBOOK = [
  {
    title: "When joining the transaction",
    items: [
      "Do we understand the deal perimeter, dates and affected local entities?",
      "Have due diligence findings and signed obligations been translated into delivery language by the right authority?",
      "Are local information gaps and assumptions recorded?",
      "Is the country's maturity, capacity and delegated authority understood?",
      "Are country leadership, workstream owners and deputies confirmed?",
      "Is the central, functional and local ownership split documented?",
    ],
  },
  {
    title: "Before accepting the local plan",
    items: [
      "Does it cover customers, employees, operations and controls as well as technology?",
      "Are activities, owners, resources and dates deliverable locally?",
      "Are central, functional and counterparty hand-offs fully defined?",
      "Are local regulatory and supplier lead times reflected?",
      "Are acceptance criteria and evidence needs explicit?",
      "Are testing, rehearsal, cutover, hypercare and BAU handover included early enough?",
    ],
  },
  {
    title: "Before a working group or status submission",
    items: [
      "Have local facts been confirmed with the people doing the work?",
      "Does status reflect the forecast outcome and evidence, not just activity?",
      "Which matters can country governance resolve?",
      "Which Group or counterparty blockers need Central Hub coordination?",
      "What decision is needed, from whom, and by when?",
      "Are customer, operational and cost impacts visible?",
    ],
  },
  {
    title: "Before confirming a joint hand-off",
    items: [
      "Do both parties agree what will be delivered?",
      "Are format, quality and acceptance criteria explicit?",
      "Are the producer, receiver and decision owners named?",
      "Is the date precise and supported by the actions that must happen first?",
      "Is completion evidence defined?",
      "Is the recovery and escalation route agreed?",
    ],
  },
  {
    title: "Between rehearsals",
    items: [
      "Has every defect been classified and assigned?",
      "Are seller, Absa and joint dependencies distinguished?",
      "Are data, access and approval lead times protected?",
      "Is the last workable fix date visible?",
      "Has closure evidence been reviewed, not just assumed?",
      "Will the next rehearsal test progress rather than rediscover the same issue?",
    ],
  },
  {
    title: "Before local readiness sign-off",
    items: [
      "Are customer journeys and operational processes usable end to end?",
      "Are people, training, communications, technology, data and controls ready?",
      "Are local regulatory commitments and approvals evidenced?",
      "Are remaining risks, workarounds and expiry dates explicit?",
      "Are local cutover tasks, fallbacks and escalation routes workable?",
      "Can the Central Hub trace the evidence behind the country's recommendation?",
    ],
  },
];

export const PRINCIPLES = [
  "Get involved early enough to shape commitments that can actually be delivered.",
  "Have the right authority translate legal and programme language.",
  "Keep the customer and local operation next to the technology plan.",
  "Own as much local delivery as your capability and authority allow.",
  "Use the centre to unblock the country, not to replace it.",
  "Define every hand-off beyond just its milestone date.",
  "Fix defects between rehearsals, not during the next one.",
  "Escalate complete facts before recovery options run out.",
];

export const GLOSSARY: { term: string; def: string }[] = [
  { term: "PMO (programme management office)", def: "The team that maintains planning, reporting and delivery controls." },
  { term: "Central Hub", def: "The central Inorganic Change team that coordinates the overall programme." },
  { term: "Functional Spoke", def: "The central specialist team for a function." },
  { term: "Regional Spoke", def: "The country or regional team responsible for local input and delivery." },
  { term: "Delegated authority", def: "The decisions a role has been formally authorised to make." },
  { term: "Reserved decision", def: "A decision that must remain with a named senior, central or specialist authority." },
  { term: "RAID", def: "Risks, assumptions, issues and dependencies." },
  { term: "Dependency", def: "An input, decision or activity that another task relies on." },
  { term: "Residual risk", def: "Risk that remains after the agreed controls or actions have been applied." },
  { term: "Readiness evidence", def: "Proof that the required people, processes, technology, data and controls are ready." },
  { term: "Acceptance criteria", def: "The conditions that must be met before an output is accepted as complete." },
  { term: "Escalation", def: "Raising a matter to someone with the authority or support needed to resolve it." },
  { term: "Cutover", def: "The controlled move from the current state to the new operating state." },
  { term: "Runbook", def: "The timed plan of cutover activities, owners, dependencies and fallback actions." },
  { term: "Dress rehearsal", def: "A practice run of the cutover plan before live execution." },
  { term: "Go or no-go", def: "The formal decision on whether the transaction is ready and safe to proceed." },
  { term: "Hypercare", def: "The period of increased monitoring and support immediately after cutover." },
  { term: "Business as usual (BAU)", def: "When ongoing ownership returns to normal teams." },
  { term: "Legal Day 1 (LD1)", def: "When legal ownership or control changes." },
  { term: "TSA (Transitional Services Agreement)", def: "Temporary services provided after completion." },
  { term: "Baseline", def: "The approved plan, budget or scope against which progress is measured." },
];
