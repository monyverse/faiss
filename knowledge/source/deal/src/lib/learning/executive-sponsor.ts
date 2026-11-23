/** Content for the Accountable Executive (Executive Sponsor) role pathway. Copy is the supplied baseline. */

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
  "distinguish Sponsor accountability from Transaction Director execution responsibility;",
  "set clear transaction direction, success criteria and decision limits;",
  "appoint and empower programme leadership;",
  "secure executive commitment, resources and organisational priority;",
  "decide or sponsor material choices involving strategy, scope, budget, timing, risk or value;",
  "challenge the programme through evidence and outcomes rather than operational detail;",
  "oversee readiness and sponsor a clear go or no-go recommendation; and",
  "keep senior stakeholders aligned through cutover, stabilisation and handover.",
];

export const CONTRIBUTIONS = [
  { title: "Set direction", text: "Define the strategic intent, success criteria, intended end-state and boundaries within which execution decisions can be made." },
  { title: "Empower leadership", text: "Appoint the Transaction Director, agree key Workstream Executives and give leaders clear authority, access and escalation routes." },
  { title: "Secure commitment", text: "Ensure functions and countries prioritise the transaction and release the people, funding and decisions required to deliver it." },
  { title: "Make material decisions", text: "Decide within personal authority and sponsor decisions that require a formal senior forum, Board or other named authority." },
  { title: "Protect value and risk", text: "Keep execution aligned to the business case, intended operating model, customer and employee outcomes, risk appetite and material transaction obligations." },
  { title: "Lead at key moments", text: "Provide visible leadership during mobilisation, major decisions, readiness, go or no-go, cutover, stabilisation and closure." },
];

export const CHAIN = [
  { id: "board", name: "Board, Executive Committee or other appointing authority", text: "Approves or oversees the transaction at the level required by Absa governance and appoints the Executive Sponsor." },
  { id: "sponsor", name: "Executive Sponsor", text: "Owns the transaction outcome, strategic alignment, organisational commitment and material decisions." },
  { id: "td", name: "Transaction Director", text: "Translates the strategic and contractual intent into an executable programme and owns successful execution within delegated authority." },
  { id: "pmo", name: "Programme Manager and PMO", text: "Run integrated planning, governance, reporting, dependencies, decision support and programme controls." },
  { id: "ws", name: "Workstream Executives and Leads", text: "Own functional outcomes, design, delivery, specialist approvals and readiness evidence within their mandates." },
];

export type MandateKey = "direct" | "delegate" | "decide" | "escalate";

export const MANDATE: Record<MandateKey, { label: string; lead: string; items: string[]; note?: string }> = {
  direct: {
    label: "Direct",
    lead: "The Executive Sponsor sets:",
    items: [
      "the transaction's strategic direction and success criteria;",
      "the intended operating and organisational outcome;",
      "the principles used to balance value, risk, customer, employee and timing outcomes;",
      "the organisational priority of transaction work;",
      "the Transaction Director's mandate and decision limits;",
      "the expectation for timely escalation and transparent reporting; and",
      "the level of executive attention required at major transaction gates.",
    ],
  },
  delegate: {
    label: "Delegate",
    lead: "Delegate clearly to the Transaction Director:",
    items: [
      "mobilisation of the transaction organisation;",
      "integrated execution planning and programme leadership;",
      "use of approved budget within stated limits;",
      "transaction-level execution trade-offs within the approved direction;",
      "governance operation and programme cadence;",
      "cross-workstream coordination and issue resolution;",
      "preparation of readiness and go or no-go recommendations; and",
      "cutover, command-centre and stabilisation leadership.",
    ],
    note: "Delegation should state what may be decided, the financial or risk limits, what must be reported and which triggers require escalation.",
  },
  decide: {
    label: "Decide",
    lead: "The Executive Sponsor makes or leads decisions concerning:",
    items: [
      "the appointment, authority or replacement of the Transaction Director;",
      "approval or sponsorship of the transaction business case and budget baseline, and any material rebaseline;",
      "material changes to transaction direction or intended end-state;",
      "enterprise resource conflicts that accountable leaders cannot resolve;",
      "material changes to scope, budget, completion timing or organisational priority;",
      "transaction-wide trade-offs with strategic or commercial consequences;",
      "material residual risk or risk acceptance within the Sponsor's authority;",
      "business-case protection and recovery actions; and",
      "the Sponsor's recommendation into formal go or no-go governance.",
    ],
    note: "Where a decision exceeds personal authority, the Sponsor should still own the recommendation, route and urgency.",
  },
  escalate: {
    label: "Sponsor or escalate",
    lead: "Take a matter to the correct formal forum or authority when:",
    items: [
      "Board, regulatory or policy approval is required;",
      "the decision changes the approved transaction rationale or business case beyond tolerance;",
      "scope, budget, completion timing or risk appetite moves beyond the Sponsor's mandate;",
      "a material legal, regulatory, credit, tax, accounting, cyber or other specialist decision requires the named authority;",
      "formal risk acceptance is required at a higher level;",
      "buyer or seller disagreement may affect transaction terms or completion; or",
      "the formal go or no-go decision sits with a wider governance body.",
    ],
    note: "Do not send an unresolved problem upward. Present the facts, options, consequences, recommendation, authority required and final date for decision.",
  },
};

export const AUTHORITY_TEST = [
  "Does this change the approved strategic intent, business case or intended end-state?",
  "Does it change scope, budget, completion timing or risk beyond an agreed tolerance?",
  "Is enterprise authority needed to resolve a resource or leadership conflict?",
  "Does a specialist, country, regulatory, counterparty or Board authority own the substantive decision?",
  "Can the Transaction Director decide it within delegated execution authority?",
];

export const AUTHORITY_GUIDANCE = {
  sponsor: "Sponsor intervention is likely required.",
  specialist: "Route the substantive decision to that authority while the Sponsor manages the transaction consequences.",
  delegate: "Support the delegation and require a clear decision record and follow-through.",
};

export const BOUNDARIES: [string, string][] = [
  ["Strategic direction and success criteria", "Detailed programme planning and control"],
  ["Overall transaction outcome and organisational commitment", "Day-to-day programme management"],
  ["Appointment and empowerment of the Transaction Director", "Functional design or specialist judgement"],
  ["Material transaction and enterprise trade-offs", "Workstream delivery or evidence production"],
  ["Executive alignment and reserved decisions", "Programme reporting administration"],
  ["Business-case and value oversight", "Decisions already delegated within clear limits"],
  ["Sponsorship of readiness and go or no-go decisions", "The formal authority of a Board, regulator or specialist function"],
];

export const SUCCESS_MEASURES = [
  { title: "Strategic alignment", text: "execution remains aligned to the deal rationale, business case and intended operating model." },
  { title: "Decision effectiveness", text: "material decisions are made at the correct level before options disappear." },
  { title: "Organisational commitment", text: "leaders provide the people, funding and priority required for delivery." },
  { title: "Transaction outcome", text: "the intended strategic, commercial and operational objectives remain achievable." },
  { title: "Risk oversight", text: "material risks are mitigated, accepted by the correct authority or reflected in the transaction decision." },
  { title: "Readiness", text: "major gates are supported by complete evidence and a clear integrated recommendation." },
  { title: "Value protection", text: "threats to benefits, costs, customers, employees, obligations and timing are visible and acted upon." },
  { title: "Leadership effectiveness", text: "the Transaction Director and programme team have clear authority, support and escalation routes." },
];

export const START_STEPS = [
  {
    title: "Confirm the sponsorship mandate",
    good: "The appointing authority has confirmed the Sponsor's accountability, reporting route, decision authority and any matters retained by the Board or another formal forum.",
    action: "Clarify what success means, what you may decide, what must be sponsored elsewhere and how urgent matters reach the correct authority.",
    evidence: "Sponsor appointment, authority statement, reserved-matter list and escalation route.",
  },
  {
    title: "Align the strategic direction",
    good: "The deal rationale, business case, intended end-state, customer and employee outcomes, key obligations and non-negotiable constraints are clear enough to guide execution choices.",
    action: "Translate transaction intent into a short set of success criteria and decision principles. Resolve contradictions before detailed planning begins.",
    evidence: "Approved direction, success criteria, controlling assumptions and open strategic questions.",
  },
  {
    title: "Appoint and empower the Transaction Director",
    good: "The Transaction Director has suitable experience, sufficient capacity and written authority to mobilise the programme, spend approved budget within limits, resolve execution trade-offs and escalate at short notice.",
    action: "Confirm the mandate, decision limits, reporting relationship, access to senior leaders and expectations for transparent escalation.",
    evidence: "Role acceptance, delegation statement, budget limits, escalation triggers and agreed success measures.",
  },
  {
    title: "Establish accountable leadership",
    good: "The Sponsor and Transaction Director have appointed capable Workstream Executives. Leaders understand their outcomes, authority, capacity commitments and responsibility to release suitably skilled team members.",
    action: "Resolve senior appointment or capacity gaps and make clear that transaction commitments are organisational commitments, not optional project requests.",
    evidence: "Leadership map, role confirmations, capacity commitments, deputies and unresolved gaps.",
  },
  {
    title: "Set decision and governance routes",
    good: "Each formal forum has a clear purpose, authority, membership and output. Urgent issues can be decided outside the meeting calendar without losing control or traceability.",
    action: "Approve the governance design, ensure the right authorities participate and test one sample decision and escalation before the programme depends on the route.",
    evidence: "Governance terms, decision map, calendar, dry-run result and named escalation contacts.",
  },
  {
    title: "Secure resources and funding",
    good: "The initial programme team, specialist support, supplier capacity and approved funding are sufficient for mobilisation and planning. Constraints are explicit rather than hidden in optimistic assumptions.",
    action: "Resolve enterprise resource conflicts, confirm the initial budget and require material capacity gaps to have owners and resolution dates.",
    evidence: "Approved mobilisation budget, resource commitments, supplier assumptions and open constraints.",
  },
  {
    title: "Align senior stakeholders",
    good: "Executive Committee, Board, function and country leaders understand the transaction's importance, confidentiality restrictions, immediate priorities and their expected decisions or support.",
    action: "Lead the senior narrative, align stakeholders before formal meetings where possible and prevent conflicting executive messages from reaching the programme.",
    evidence: "Stakeholder map, leadership brief, agreed messages, engagement plan and unresolved concerns.",
  },
  {
    title: "Sponsor the mobilisation gate",
    good: "The programme can show that leadership, capacity, tools, governance, controls, interfaces and immediate plans are operational. Open exceptions have named owners, dates and consequences.",
    action: "Challenge whether the programme is genuinely ready to deepen planning. Decide or sponsor a decision to proceed, proceed with conditions or hold.",
    evidence: "Mobilisation dashboard, gate pack, conditions, decision record and authorised next actions.",
  },
];

/** level: 1 targeted … 4 highest */
export const INTENSITY = [
  { period: "Due diligence and transaction preparation", intensity: "Targeted", level: 1, text: "Clarify strategic intent, key constraints, business-case assumptions and leadership needs." },
  { period: "Mobilisation and planning", intensity: "Highest", level: 4, text: "Appoint leadership, set direction, secure resources, approve governance and resolve start-up barriers." },
  { period: "Programme execution", intensity: "High by exception", level: 2, text: "Protect delegation while deciding material trade-offs, resource conflicts and changes." },
  { period: "Testing and readiness", intensity: "High", level: 3, text: "Test evidence, material risk, business continuity and confidence in the integrated recommendation." },
  { period: "Go or no-go and cutover", intensity: "Highest", level: 4, text: "Sponsor the formal decision, maintain executive alignment and provide rapid authority during live execution." },
  { period: "Stabilisation and handover", intensity: "High, then reducing", level: 3, text: "Keep attention on customer, employee, control and value outcomes until stable ownership is accepted." },
];

export const LOOP = [
  { title: "Receive the integrated view", text: "Review the Transaction Director's concise view of strategic alignment, critical milestones, material risks, readiness, economics, resource barriers and decisions required." },
  { title: "Test the outcome, not the activity", text: "Ask what has changed, what outcome is threatened, what evidence supports the forecast and what happens if no action is taken." },
  { title: "Confirm the authority", text: "Determine whether the matter belongs with the Transaction Director, a Workstream Executive, a specialist authority, the Sponsor or a formal senior forum." },
  { title: "Decide, unblock or sponsor", text: "Use personal authority where appropriate. Resolve enterprise barriers. Take reserved decisions forward with a clear recommendation and deadline." },
  { title: "Align stakeholders", text: "Ensure affected executives understand the decision, rationale, conditions and required commitments. Manage sensitive senior or counterparty relationships directly where needed." },
  { title: "Confirm follow-through", text: "Require the plan, budget, business-case view, risks and decision record to reflect the outcome. Check that the intended effect occurs." },
];

export const EXEC_VIEW = [
  { tab: "Direction", q: "Is execution still aligned to the strategic rationale, contractual intent and intended end-state?" },
  { tab: "Milestones", q: "Which critical outcomes have moved or may move, why, and what recovery remains possible?" },
  { tab: "Decisions", q: "Which decisions are required, who owns them, what are the options and when is the final useful decision date?" },
  { tab: "Risk and readiness", q: "Which material risks remain, what evidence supports readiness and which risks require formal acceptance?" },
  { tab: "Resources", q: "Where are leadership, capacity, supplier or organisational constraints threatening delivery?" },
  { tab: "Economics", q: "How have cost, value, benefits, synergies, stranded costs, transition services and forecast duration changed?" },
  { tab: "Stakeholders", q: "Where is executive, country, counterparty, employee, customer or regulatory alignment needed?" },
];

export const BOUNDARY_COLS = ["Executive Sponsor", "Transaction Director", "Workstream Executive", "Programme Manager and PMO"];

export const BOUNDARY_ROWS: { activity: string; cells: string[] }[] = [
  { activity: "Direction", cells: ["Sets strategic direction and success criteria.", "Converts direction into execution priorities and an integrated programme.", "Applies the direction to the functional outcome.", "Maintains the plan, information and decision process."] },
  { activity: "Decisions", cells: ["Makes or sponsors material and reserved decisions.", "Makes transaction execution decisions within delegated authority.", "Makes functional and workstream decisions within authority.", "Prepares integrated facts, options, recommendations and records."] },
  { activity: "Resources", cells: ["Resolves enterprise conflicts and secures organisational commitment.", "Allocates approved programme resources and raises gaps.", "Secures and directs functional resources.", "Tracks demand, capacity, cost and forecast effects."] },
  { activity: "Risk", cells: ["Oversees material risk and secures acceptance by the correct authority.", "Owns the integrated programme risk and readiness position.", "Owns functional risk treatment and evidence.", "Maintains risk information, ageing, actions and escalation."] },
  { activity: "Governance", cells: ["Provides executive leadership and chairs or sponsors key forums.", "Leads programme governance and execution decisions.", "Leads workstream governance and recommendations.", "Operates forums, packs, actions and decision records."] },
  { activity: "Delivery", cells: ["Holds leaders accountable for outcomes.", "Drives successful transaction execution.", "Owns functional delivery outcomes.", "Drives coordination and control, not functional execution."] },
];

export const CHALLENGE_QUESTIONS = [
  "What outcome is now forecast, not merely planned?",
  "What accepted evidence supports that view?",
  "Which assumption would most change the recommendation?",
  "What are the consequences for customers, employees, controls, value and timing?",
  "Which option is recommended, and why is it better for the whole transaction?",
  "What becomes impossible if the decision waits?",
  "Who has authority, and is that person available?",
  "What conditions or triggers would change the decision?",
];

export const SUPPORT_DELEGATION = [
  "confirm the delegated mandate publicly;",
  "redirect lobbying back through the agreed decision route;",
  "challenge the recommendation without taking over its preparation;",
  "make decisions promptly when the matter reaches Sponsor level;",
  "resolve organisational resistance that the programme cannot overcome; and",
  "review delegation when repeated exceptions show the limits are unclear.",
];

export const AVOID_UNDERMINING = [
  "do not reverse delegated decisions because a senior stakeholder bypassed the programme;",
  "do not ask the Programme Manager for a separate version of the truth;",
  "do not defer a decision simply to seek complete certainty;",
  "do not make functional or specialist decisions outside the correct authority; and",
  "do not wait for the next forum when an urgent route is available.",
];

export const VALUE_VISIBILITY = [
  "approved budget, spend and forecast;",
  "integration or separation costs;",
  "benefit and synergy timing;",
  "stranded costs and retained obligations;",
  "transition-service costs and exit timing;",
  "customer or employee effects;",
  "delays and extended programme duration;",
  "scope change and supplier commitments; and",
  "risks that could materially alter the business case.",
];

export const GO_FLOW = [
  "Workstreams and countries provide recommendations and accepted evidence.",
  "The Programme Manager integrates dependencies, conditions and programme consequences.",
  "The Transaction Director applies execution judgement and forms the integrated recommendation.",
  "The Executive Sponsor tests strategic alignment, business continuity, value and material risk.",
  "The authorised formal forum makes and records the go or no-go decision.",
];

export interface Choice { key: string; text: string }
export interface Scenario { title: string; situation: string; options: Choice[]; answer: string; feedback: string }

export const SCENARIOS: Scenario[] = [
  {
    title: "A contested resource commitment",
    situation:
      "Six weeks before a major readiness gate, the Technology Executive advises that two specialists committed to the transaction are needed for a regulatory remediation programme. Both initiatives have fixed external deadlines. The Transaction Director proposes moving one specialist and funding a contractor to retain transaction capacity, but Technology believes the contractor will require too much supervision. Neither deadline can yet be moved without senior engagement.",
    options: [
      { key: "A", text: "Confirm the transaction's existing priority and require Technology to retain both specialists until the readiness gate, leaving the remediation programme to find alternatives." },
      { key: "B", text: "Ask the Technology Executive and Transaction Director to produce a time-bound enterprise option that shows both obligations, capability constraints, cost and deadline consequences, then use Sponsor authority to secure the chosen commitment." },
      { key: "C", text: "Accept Technology's proposed reassignment because a regulatory programme should take priority, and ask the Transaction Director to replan the readiness gate around the reduced capacity." },
      { key: "D", text: "Split each specialist's time equally between the two programmes and require weekly reporting so emerging effects can be managed before either deadline is missed." },
    ],
    answer: "B",
    feedback:
      "Option B treats the conflict as an enterprise decision and creates the information needed to secure a workable commitment. Option A protects the transaction but assumes the other obligation can absorb the loss. Option C gives one valid priority automatic precedence without integrating the consequences. Option D appears balanced but may leave both programmes with insufficient focused capacity.",
  },
  {
    title: "Pressure to overrule a delegated decision",
    situation:
      "The Transaction Director approves a phased customer migration within the agreed scope, budget and risk limits. It lowers cutover concentration but delays some benefits by one month. A Workstream Executive who preferred a single migration contacts you directly and argues that the phased option signals weak ambition. The Programme Manager's analysis supports the Director's decision, although either approach remains executable.",
    options: [
      { key: "A", text: "Review whether the decision remains within the delegated mandate and aligned to the transaction objectives, then support it unless new evidence changes the strategic or risk position." },
      { key: "B", text: "Reopen the decision in the next executive forum because disagreement from a senior functional owner indicates that wider sponsorship is needed." },
      { key: "C", text: "Ask the Transaction Director and Workstream Executive to agree a compromise sequence so that both perspectives are reflected before execution begins." },
      { key: "D", text: "Select the single migration because the Executive Sponsor should favour the option that realises the approved benefits sooner when both are executable." },
    ],
    answer: "A",
    feedback:
      "Option A protects clear delegation while preserving Sponsor oversight of strategic alignment. Option B weakens the decision route when the matter remains within mandate. Option C may improve alignment but risks substituting consensus for accountable decision-making. Option D focuses on benefit timing without taking ownership of the execution and risk trade-off already delegated.",
  },
  {
    title: "A specialist decision with programme consequences",
    situation:
      "A proposed data-retention approach would protect the planned customer migration date and remain within budget. Legal and Privacy disagree on whether it meets the required standard. The delay in resolving their interpretation will remove the preferred migration window. The Transaction Director asks you to choose between the two approaches so planning can continue.",
    options: [
      { key: "A", text: "Choose the more conservative interpretation because it reduces the chance of later regulatory challenge, then ask the programme to recover the timing impact." },
      { key: "B", text: "Choose the approach that protects the migration date because the Sponsor owns the overall transaction outcome and both functions have presented defensible views." },
      { key: "C", text: "Convene the named specialist authorities to resolve or formally escalate the interpretation immediately, while directing the Transaction Director to prepare the execution choices for each possible outcome." },
      { key: "D", text: "Pause migration planning until Legal and Privacy reach agreement, because programme pressure should not influence a specialist interpretation." },
    ],
    answer: "C",
    feedback:
      "Option C keeps the specialist decision with the correct authority while actively managing the transaction deadline and alternatives. Options A and B turn Sponsor accountability into specialist authority. Option D respects the boundary but does not use available executive influence to accelerate a decision before options disappear.",
  },
  {
    title: "A business-case change near commitment",
    situation:
      "A supplier revises its estimate for a required separation activity from R18 million to between R23 million and R26 million. The approved business case contains R8 million of remaining central contingency. Delaying the appointment by two weeks is likely to add three weeks to the programme, but the supplier will not provide a fixed price until discovery is complete. The Transaction Director recommends a capped discovery phase costing R2 million, credited against the final fee, followed by a final commitment decision.",
    options: [
      { key: "A", text: "Approve the full R26 million estimate now because it remains inside the total business case when contingency is included and protects the programme date." },
      { key: "B", text: "Approve the capped discovery phase with explicit outputs, price and timing limits, preserve the later commitment decision, and update the business-case range and programme consequences." },
      { key: "C", text: "Require the supplier to provide a fixed price before any further spend because the current range is too wide for responsible executive approval." },
      { key: "D", text: "Refer the full supplier appointment to the next formal governance forum because the upper estimate would use all remaining contingency." },
    ],
    answer: "B",
    feedback:
      "Option B buys information while limiting exposure and preserving a decision point before the larger commitment. Option A treats contingency as automatic approval and commits against an uncertain estimate. Option C protects cost certainty but may create avoidable delay and offers no route to improve the estimate. Option D may eventually be required, but a limited discovery decision can preserve options if it sits within Sponsor authority.",
  },
  {
    title: "A conditional readiness recommendation",
    situation:
      "All functional leaders recommend proceeding to Business Day 1. One high-severity operational risk remains: a tested manual process can maintain customer service for four hours if an automated hand-off fails, but recovery beyond four hours has not been demonstrated. The likelihood is assessed as low, the formal risk owner has accepted the exposure within their authority, and the Transaction Director recommends proceeding with a two-hour executive checkpoint after launch. The formal go or no-go forum is tomorrow.",
    options: [
      { key: "A", text: "Sponsor a proceed recommendation because the risk owner has accepted the exposure and the proposed checkpoint provides additional executive control." },
      { key: "B", text: "Sponsor a hold recommendation until recovery beyond four hours has been demonstrated, because customer continuity should not depend on an unproven recovery path." },
      { key: "C", text: "Test the failure consequence, monitoring, trigger, decision authority and recovery options; then present an explicit recommendation and conditions to the formal forum rather than treating risk acceptance as the go or no-go decision." },
      { key: "D", text: "Present the Transaction Director's recommendation and the functional risk acceptance without a Sponsor view, allowing the formal forum to determine the appropriate balance." },
    ],
    answer: "C",
    feedback:
      "Option C applies Sponsor judgement and preserves the formal forum's decision authority. Option A may become the final recommendation but does not show that the remaining exposure and checkpoint are executable. Option B may also become appropriate, but the information given does not yet show that holding is the only proportionate response. Option D passes information upward without the integrated Sponsor recommendation expected by the forum.",
  },
];

export const RESOURCE_NOTICE =
  "The templates and records named here are not stored in the Capability Hub. Source the current approved versions from the transaction team or controlled programme workspace. Do not create an uncontrolled alternative where an approved version exists.";

export const CORE_RESOURCES = [
  { name: "Transaction mandate and deal-rationale summary", purpose: "States the transaction intent, perimeter, target outcome, key dates, obligations and constraints.", use: "Set direction and test whether execution remains aligned.", ask: "What must remain true? Which assumptions are still open? What has changed since approval?" },
  { name: "Approved business case and budget baseline", purpose: "Records expected value, cost, benefits, timing, risks and approved funding.", use: "Test value protection and decide or sponsor material changes.", ask: "What moved, why, by how much and who owns recovery?" },
  { name: "Target Operating Model or intended end-state", purpose: "Describes how the business, services, controls, systems or organisation should operate after the transaction.", use: "Prevent short-term execution choices from undermining the intended outcome.", ask: "Is the decision a temporary transition or a permanent change? Who accepts the consequence?" },
  { name: "Sponsor and Transaction Director authority statement", purpose: "Records decision rights, delegated limits, reserved matters and escalation triggers.", use: "Protect speed and prevent duplicated or unclear authority.", ask: "Who owns this decision? Is the limit clear? Has new information changed the route?" },
  { name: "Programme organisation, accountability matrix and capacity view", purpose: "Records accountable leaders, role boundaries, deputies and committed capacity.", use: "Resolve leadership and enterprise resource constraints.", ask: "Are the right people empowered and available? Where is commitment weaker than the plan assumes?" },
  { name: "Governance terms, calendar and decision map", purpose: "Defines forum authority, attendees, inputs, outputs and decision routes.", use: "Ensure material decisions reach the correct authority in time.", ask: "Is this forum deciding or merely discussing? Can an urgent route be used sooner?" },
  { name: "Integrated executive status and decision pack", purpose: "Provides the current transaction forecast, exceptions, economics, readiness and decisions required.", use: "Direct executive challenge and action.", ask: "What changed? What is the forecast? Which decision cannot wait?" },
  { name: "Material risk and readiness view", purpose: "Connects material risks, mitigations, evidence, conditions and formal acceptance.", use: "Test readiness and ensure risk reaches the correct authority.", ask: "What remains after mitigation? Who can accept it? What happens if the assumption fails?" },
  { name: "Change or decision paper", purpose: "Sets out facts, options, cost, timing, risk, value, recommendation, authority and decision deadline.", use: "Make or sponsor a traceable material decision.", ask: "Are the options genuinely different? What is reversible? What becomes impossible after the deadline?" },
  { name: "Go or no-go paper and decision record", purpose: "Integrates readiness, conditions, exceptions, residual risk and the recommendation for a major event.", use: "Sponsor an evidence-based formal decision.", ask: "Are conditions executable? Who holds stop authority? Is the decision recorded at the correct level?" },
  { name: "Executive stakeholder and communication plan", purpose: "Coordinates senior alignment, decision preparation and controlled messages.", use: "Maintain organisational commitment and prevent conflicting executive direction.", ask: "Who could block or materially influence the outcome? What do they need to understand or decide?" },
];

export const MATCHING = [
  { need: "Confirm whether a decision sits within delegated limits", resource: "Sponsor and Transaction Director authority statement" },
  { need: "Test whether a scope change still supports transaction value", resource: "Approved business case and budget baseline" },
  { need: "Resolve a conflict over committed leadership capacity", resource: "Programme organisation, accountability matrix and capacity view" },
  { need: "Present a material choice with a deadline", resource: "Change or decision paper" },
  { need: "Prepare the formal readiness decision", resource: "Go or no-go paper and decision record" },
  { need: "Align senior stakeholders before a difficult forum", resource: "Executive stakeholder and communication plan" },
];

export interface Question { q: string; options: Choice[]; answer: string; feedback: string }

export const QUESTIONS: Question[] = [
  {
    q: "The Transaction Director has made a decision within agreed scope, budget and risk limits. A senior functional executive asks the Sponsor to reverse it. What should the Sponsor establish first?",
    options: [
      { key: "A", text: "Whether the functional executive has more subject expertise than the Transaction Director." },
      { key: "B", text: "Whether the decision remains within delegated authority and aligned to the transaction objectives using the available evidence." },
      { key: "C", text: "Whether reopening the decision would improve executive alignment without moving the programme date." },
      { key: "D", text: "Whether formal governance can consider both positions before execution begins." },
    ],
    answer: "B",
    feedback: "The first test is the mandate and transaction outcome. A Sponsor should not weaken delegated authority merely because a senior stakeholder prefers another executable option.",
  },
  {
    q: "A critical workstream cannot secure a specialist because another enterprise programme has a fixed external deadline. What is the Sponsor's main contribution?",
    options: [
      { key: "A", text: "Select which programme receives the specialist using the relative size of each approved budget." },
      { key: "B", text: "Ask the Transaction Director to absorb the constraint because workstream capacity sits within execution accountability." },
      { key: "C", text: "Require an integrated view of both obligations and use enterprise authority to secure a workable priority, capacity or timing decision." },
      { key: "D", text: "Refer the matter to the next Executive Committee because both programmes have valid organisational priorities." },
    ],
    answer: "C",
    feedback: "The Sponsor resolves organisational barriers that programme leaders cannot solve alone. The decision should integrate both obligations rather than automatically favouring one programme or forum.",
  },
  {
    q: "A policy interpretation threatens a transaction milestone. The Programme Manager has shown the timing and cost effects. Who should determine the policy interpretation?",
    options: [
      { key: "A", text: "The Executive Sponsor, because the issue has become material to the transaction." },
      { key: "B", text: "The Transaction Director, because that role owns successful transaction execution." },
      { key: "C", text: "The relevant policy or control authority, with the Sponsor accelerating the route and managing the transaction consequences." },
      { key: "D", text: "Formal executive governance, because the functional authority has not resolved it within the programme timetable." },
    ],
    answer: "C",
    feedback: "Material programme consequences do not transfer specialist authority. The Sponsor should remove delay and secure the right decision while keeping execution options visible.",
  },
  {
    q: "A proposed change remains within the total approved budget but uses nearly all remaining contingency and delays benefit delivery. What information is most important before Sponsor approval?",
    options: [
      { key: "A", text: "Confirmation that Finance can fund the change without requesting additional budget." },
      { key: "B", text: "The effect on the business case, strategic outcome, alternatives, uncertainty, authority and future ability to absorb risk." },
      { key: "C", text: "Agreement from every affected Workstream Executive that the change is the best delivery option." },
      { key: "D", text: "A fixed supplier price and a revised integrated plan approved by the Transaction Director." },
    ],
    answer: "B",
    feedback: "Remaining within the total budget is not enough. The Sponsor must understand value, timing, uncertainty, alternatives and the loss of future flexibility.",
  },
  {
    q: "What is the correct division of responsibility before a formal go or no-go decision?",
    options: [
      { key: "A", text: "Workstreams provide evidence; the Programme Manager forms the recommendation; the Sponsor makes the final decision." },
      { key: "B", text: "Workstreams provide evidence; the Transaction Director accepts the risks; the Sponsor records the final decision for governance." },
      { key: "C", text: "Workstreams provide evidence; the programme integrates it; the Transaction Director forms the execution recommendation; the Sponsor tests and sponsors it; the authorised forum decides." },
      { key: "D", text: "Workstreams provide recommendations; the Sponsor integrates the business view; the Board validates the supporting evidence and decides." },
    ],
    answer: "C",
    feedback: "Each level adds the judgement attached to its mandate. Formal governance retains the final decision where the go or no-go matter is reserved.",
  },
];

export const PLAYBOOK = [
  {
    title: "Before accepting the role",
    items: [
      "What outcome am I accountable for?",
      "Who appointed me and where do I report?",
      "What may I decide personally?",
      "Which matters are retained by formal governance, the Board or another authority?",
      "Do I have enough capacity and organisational authority to sponsor this transaction actively?",
    ],
  },
  {
    title: "Before empowering the Transaction Director",
    items: [
      "Is the strategic direction and intended end-state clear?",
      "Are delegated decisions, budget limits and escalation triggers explicit?",
      "Can the Director reach the required senior leaders quickly?",
      "Will I support delegated decisions when stakeholders bypass the agreed route?",
      "How will we maintain an honest view of risk, value and readiness?",
    ],
  },
  {
    title: "Before an executive review",
    items: [
      "What has changed since the last review?",
      "Which outcome, milestone or assumption is now at risk?",
      "What evidence supports the forecast?",
      "Which decisions or commitments are required from the room?",
      "Are the correct authorities present?",
      "What becomes harder or impossible if the decision waits?",
    ],
  },
  {
    title: "Before making or sponsoring a decision",
    items: [
      "Is the matter within my authority?",
      "Is the substantive decision owned by a specialist, country or formal forum?",
      "Are strategy, cost, timing, risk, customer, employee and value consequences visible?",
      "Are the options genuinely different and executable?",
      "What is recommended, and which assumption matters most?",
      "Is the decision reversible, conditional or final?",
      "How will it be recorded and translated into action?",
    ],
  },
  {
    title: "Before a readiness or go or no-go forum",
    items: [
      "Are functional and country recommendations complete?",
      "Does accepted evidence support the integrated position?",
      "Have cross-workstream and counterparty dependencies been tested?",
      "Are material conditions executable and owned?",
      "Is residual risk distinguished from unresolved work?",
      "Does the Transaction Director provide a clear execution recommendation?",
      "Am I ready to sponsor a clear view rather than pass the choice upward?",
      "Does the named formal forum retain the final authority?",
    ],
  },
  {
    title: "During cutover and stabilisation",
    items: [
      "Is decision authority available at the speed live execution requires?",
      "Are customers, employees, controls and critical operations protected?",
      "Are conditions and stop triggers visible?",
      "Are senior stakeholders receiving one controlled message?",
      "Is the programme holding delegated authority, or are routine matters drifting upward?",
      "What must be true before executive attention can safely reduce?",
    ],
  },
  {
    title: "Before programme closure",
    items: [
      "Have the intended strategic and operational outcomes been achieved or explicitly rebaselined?",
      "Are benefits, costs, obligations and remaining risks owned?",
      "Has normal business ownership accepted the handover?",
      "Are unresolved transition services and exit dates visible?",
      "Have material lessons changed future standards, governance or mobilisation practice?",
      "Is closure based on stable outcomes rather than the end of programme reporting?",
    ],
  },
];

export const PRINCIPLES = [
  "Own the outcome, not every task.",
  "Set clear direction before demanding detailed plans.",
  "Delegate authority as well as responsibility.",
  "Protect delegated decisions when they remain within mandate.",
  "Intervene early when enterprise commitment or authority is required.",
  "Keep specialist decisions with the specialist authority.",
  "Test evidence, consequences and assumptions rather than asking for more volume.",
  "Connect execution choices to strategy, value and risk.",
  "Make or sponsor decisions before useful options disappear.",
  "Stay visibly engaged until outcomes are stable and ownership is accepted.",
];

export const GLOSSARY = [
  { term: "Business case", def: "The approved explanation of why the transaction should proceed, including expected value, cost, benefits and risks." },
  { term: "Critical path", def: "The sequence of activities that determines the earliest possible completion date." },
  { term: "Delegated authority", def: "A decision the Sponsor has formally allowed another role to make within stated limits." },
  { term: "Reserved decision", def: "A decision that must remain with a named senior person or formal forum because of its material impact." },
  { term: "Executive governance", def: "The formal senior forum that decides reserved matters. This may be an Executive Committee, Steering Committee or Board-level forum, depending on the transaction." },
  { term: "Risk appetite", def: "The amount and type of risk the organisation is prepared to accept." },
  { term: "Residual risk", def: "The risk that remains after planned controls or mitigations are applied." },
  { term: "Readiness evidence", def: "Accepted proof that a required outcome, control or activity is complete and can operate as intended." },
  { term: "Go or no-go", def: "The formal decision to proceed with, conditionally proceed with, or stop a major transaction event." },
  { term: "Legal Day 1", def: "The date legal ownership or control changes." },
  { term: "Business Day 1", def: "The first day the agreed operating arrangements must work after the transaction event." },
  { term: "Stabilisation", def: "The controlled period after launch or cutover when issues are resolved and operations are proven stable." },
  { term: "Condition", def: "An action or restriction attached to a decision that must be met or monitored." },
  { term: "Tolerance", def: "The agreed limit within which a role may act without seeking further approval." },
  { term: "Transition service", def: "A temporary service supplied by one party to the other after the transaction event." },
  { term: "Handover", def: "Formal transfer of continuing ownership from the programme into normal business teams." },
];

export const DEF = Object.fromEntries(GLOSSARY.map((g) => [g.term, g.def])) as Record<string, string>;
