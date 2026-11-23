/**
 * Central Hub Operating Model reference data.
 *
 * The Central Hub is the Absa Inorganic Change team. This module holds the
 * content for the Central Hub operating model page as plain data so it can be
 * updated quickly after each working session.
 */

export interface HubResponsibility {
  id: string;
  title: string;
  summary: string;
  detail: string[];
}

export const HUB_LAYERS = [
  {
    id: "hub",
    name: "Central Hub",
    description:
      "The Hub steers the programme through programme management, education, support, and Quality Assurance, rather than owning every functional decision. It coordinates dependency management, readiness, governance and executive reporting.",
  },
  {
    id: "functional",
    name: "SA Functional Spokes",
    description:
      "Spokes own functional standards, plans, decisions and readiness evidence, while aligning to the Central Hub programme model. They support in-country teams where maturity demands",
  },
  {
    id: "regional",
    name: "In-country Regional Spokes",
    description:
      "In-country teams own local execution as a minimum, with ownership scaling based on maturity. Local accountability expands as functional maturity increases, while central control remains for transaction-critical and group-wide matters.",
  },
] as const;

/** 1.1 Key Role - the four areas the Central Hub owns. */
export const HUB_RESPONSIBILITIES: HubResponsibility[] = [
  {
    id: "education",
    title: "Education",
    summary:
      "Embedding best practice into programme execution and governance based on past experience",
    detail: [
      "Define transaction methodology, standards, mobilisation templates, workstream charter requirements, readiness evidence standards and cutover governance.",
      "Share methodology, templates and reusable playbooks so regional and functional teams can adopt and embed them.",
      "Capture lessons learned, playbook updates and reusable knowledge for the next transaction.",
    ],
  },
  {
    id: "programme-management",
    title: "Programme Management",
    summary:
      "Owns the programme plan, budget, and reporting to drive best in class governance and tracking",
    detail: [
      "Mobilise the transaction, establish programme governance, maintain the integrated plan, own cross-workstream dependencies, manage central RAID and decision logs, and produce executive reporting.",
      "Own the programme plan, budget, and governance artefacts to drive fast, efficient execution and decision making",
      "Coordination and tracking of execution and governance across all functional and regional spokes",
      "Coordinate Legal Day 1 readiness, dress rehearsals, go/no-go preparation, cutover command-centre operation, hypercare governance and lessons learned.",
    ],
  },
  {
    id: "support",
    title: "Support",
    summary:
      "Leads mobilisation efforts, supporting the wider Absa community to actually stand up and M&A programme",
    detail: [
      "Mobilise Functional Spokes and Regional Spokes, align workstream plans, surface critical-path risks and escalate unresolved trade-offs.",
      "Decision making on key role appointments, such as Workstream leads alongside Accountable Executives",
      "Interface with Corporate Development, Finance & Tax, Legal & CorpDev, deal teams and external counterparties to translate deal economics, Group Interchange requirements, SPA terms, conditions precedent and execution commitments into programme plans.",
    ],
  },
  {
    id: "quality-assurance",
    title: "Quality Assurance",
    summary:
      "Checks and challenges reporting, thinking, and outputs from workstreams to ensure high standards are maintained across the programme",
    detail: [
      "Set standards and QA completeness of workstream charters and L2 plans.",
      "QA governance discipline, evidence quality and readiness packs.",
      "Provide framework, challenge and integrated visibility over the regional maturity assessment and execution split.",
    ],
  },
];


export type MandateTone = "owns" | "coordinates" | "approval" | "executive";

export interface DecisionCategory {
  id: string;
  title: string;
  /** Short name of the accountable decision owner, shown on the ladder row. */
  owner: string;
  /** One-line explanation of the category, shown before expansion. */
  explanation: string;
  lead: string;
  tone: MandateTone;
  items: string[];
}

export const DECISION_CATEGORIES: DecisionCategory[] = [
  {
    id: "independent",
    title: "Central Hub decides",
    owner: "Central Hub",
    explanation:
      "Programme mechanics the Central Hub can set and change without further approval.",
    lead: "The Central Hub may decide:",
    tone: "owns",
    items: [
      "Programme and governance cadence",
      "Reporting formats",
      "Dependency-management methods",
      "Mobilisation approach and templates",
      "Issue-routing and escalation discipline",
      "Command-centre operating rhythm",
      "Use of an approved programme budget within delegated authority",
    ],
  },
  {
    id: "recommended",
    title: "Central Hub recommends",
    owner: "Central Hub, confirmed by the accountable authority",
    explanation:
      "Positions the Central Hub forms and puts forward, then has confirmed by the accountable authority.",
    lead: "The Central Hub may recommend:",
    tone: "coordinates",
    items: [
      "Transaction-archetype application",
      "Workstream structure and delivery intensity",
      "Readiness thresholds",
      "Escalation priorities",
      "TSA exit sequencing",
      "Recovery actions for critical-path slippage",
    ],
  },
  {
    id: "functional",
    title: "Functional approval required",
    owner: "Accountable Functional Spoke or control function",
    explanation:
      "Specialist design and policy positions that stay with the accountable function, not the Central Hub.",
    lead: "The accountable Functional Spoke or control function approves:",
    tone: "approval",
    items: [
      "Functional design",
      "Group policy interpretation",
      "Risk and credit decisions",
      "Legal and compliance positions",
      "Tax and accounting treatment",
      "Technology architecture",
      "Material control exceptions",
    ],
  },
  {
    id: "country",
    title: "Country approval required",
    owner: "Local accountable leadership",
    explanation:
      "Local market, regulatory and statutory matters that only in-country leadership can approve.",
    lead: "Local accountable leadership approves matters relating to:",
    tone: "approval",
    items: [
      "Local customers and market operations",
      "Local regulatory requirements",
      "Statutory and employment obligations",
      "Country-specific servicing arrangements",
      "Local communications and execution timing",
    ],
  },
  {
    id: "executive",
    title: "Executive governance required",
    owner: "Executive Sponsor and transaction governance forum",
    explanation:
      "Transaction-wide trade-offs on scope, budget, timing, risk appetite and Legal Day 1 go or no-go.",
    lead: "Executive governance decides:",
    tone: "executive",
    items: [
      "Material changes to scope, budget or timing",
      "Legal Day 1 go or no-go",
      "Material residual-risk acceptance",
      "Changes to risk appetite",
      "Completion delays",
      "Material TSA extensions",
      "Transaction-wide strategic trade-offs",
    ],
  },
];

export interface HubRole {
  id: string;
  name: string;
  summary: string;
  detail: string;
  /** Structured drill-down shown when the role is selected. */
  purpose: string;
  responsibilities: string[];
  mandate: string;
  reportsTo: string;
  boundaries: string;
}

export const HUB_ROLES: HubRole[] = [
  {
    id: "sponsor",
    name: "Executive Sponsor",
    summary: "Strategic direction and Absa-wide decisions.",
    detail:
      "Provides overall strategic direction and makes Absa-wide decisions that materially affect the transaction. Approves the business case and programme budget.",
    purpose:
      "Provides overall strategic direction and makes the Absa-wide decisions that materially affect the transaction.",
    responsibilities: [
      "Owns the business case and the strategic rationale for the transaction",
      "Approves the programme budget and material changes to it",
      "Chairs or attends executive governance and resolves escalated trade-offs",
      "Secures organisational commitment across business and control functions",
    ],
    mandate:
      "Decides scope, budget, timing, risk appetite and the Legal Day 1 go or no-go recommendation put forward by the Transaction Director.",
    reportsTo: "Absa executive committee and transaction governance forum.",
    boundaries:
      "Does not run programme delivery and does not substitute for functional or country approvals.",
  },
  {
    id: "transaction-director",
    name: "Transaction Director",
    summary: "Accountable for successful transaction execution.",
    detail:
      "Accountable for successful transaction execution. Translates strategic and contractual intent into an executable programme, mobilises the organisation, owns the integrated execution plan, leads governance and drives readiness, cutover and stabilisation.",
    purpose:
      "Accountable for successful transaction execution, from mobilisation through completion and stabilisation.",
    responsibilities: [
      "Translates strategic and contractual intent into an executable programme",
      "Mobilises the required Functional and Regional Spokes",
      "Owns the integrated execution plan and the critical path",
      "Leads governance and drives readiness, cutover and stabilisation",
      "Prepares the go or no-go recommendation for executive governance",
    ],
    mandate:
      "Requires delegated budget authority, direct access to decision-makers and the ability to direct delivery resources across functions and countries.",
    reportsTo: "Executive Sponsor.",
    boundaries:
      "Does not approve functional design, policy interpretation or local regulatory positions.",
  },
  {
    id: "programme-manager",
    name: "Programme Manager",
    summary: "Runs the programme day to day.",
    detail:
      "Runs the programme day to day. Owns the programme-management framework, integrated plan, dependencies, governance, reporting, RAID control, readiness coordination and PMO discipline.",
    purpose:
      "Runs the programme day to day so the Transaction Director can lead externally and at executive level.",
    responsibilities: [
      "Owns the programme-management framework and delivery standards",
      "Maintains the integrated plan, milestones and dependency map",
      "Runs the governance rhythm and reporting cycle",
      "Controls RAID, actions and the decision log",
      "Coordinates readiness evidence across functions and countries",
    ],
    mandate:
      "Sets delivery cadence, reporting formats and escalation routes, and calls issues into governance without waiting for permission.",
    reportsTo: "Transaction Director.",
    boundaries:
      "Does not own functional deliverables and does not accept residual risk on behalf of the transaction.",
  },
  {
    id: "pmo",
    name: "Central PMO Support",
    summary: "Programme information, control artefacts and audit trail.",
    detail:
      "Maintains plans, milestones, reports, RAID items, actions, decisions, governance materials and programme documentation. Provides the reliable information and audit trail required for effective programme control.",
    purpose:
      "Provides the reliable programme information and audit trail required for effective transaction control.",
    responsibilities: [
      "Maintains plans, milestones and the reporting pack",
      "Logs and tracks RAID items, actions and decisions",
      "Prepares governance materials and circulates outcomes",
      "Maintains controlled programme documentation and version history",
    ],
    mandate:
      "Sets and enforces the information standards that workstreams must meet when submitting plans, status and evidence.",
    reportsTo: "Programme Manager.",
    boundaries:
      "Does not make delivery decisions or negotiate positions with workstreams and counterparties.",
  },
];

export const DELIVERY_INTERACTIONS = [
  {
    role: "Workstream Executives",
    note: "Remain accountable for their functional outcomes and major functional decisions.",
  },
  {
    role: "Workstream Leads",
    note: "Own their workstream scope, detailed plans, deliverables, resources, risks and readiness evidence.",
  },
  {
    role: "Workstream Project Managers",
    note: "Coordinate workstream plans, reporting and governance.",
  },
  {
    role: "Workstream Team Members",
    note: "Perform the specialist execution activities.",
  },
];

export interface RaciRow {
  activity: string;
  position: string;
  tone: MandateTone;
}

export const RACI_ROWS: RaciRow[] = [
  {
    activity: "Mobilise Functional and Regional Spokes",
    position: "Accountable and Responsible",
    tone: "owns",
  },
  {
    activity: "Set programme standards and support workstream charters",
    position: "Responsible for standards; Functional Spokes own functional plans",
    tone: "coordinates",
  },
  {
    activity: "Maintain the integrated programme plan and critical path",
    position: "Accountable and Responsible",
    tone: "owns",
  },
  {
    activity: "Maintain programme RAID and decision control",
    position: "Accountable and Responsible",
    tone: "owns",
  },
  {
    activity: "Translate transaction agreements into execution requirements",
    position: "Responsible, working with Corporate Development and Legal",
    tone: "coordinates",
  },
  {
    activity: "Coordinate the consolidated readiness and go or no-go pack",
    position: "Accountable and Responsible",
    tone: "owns",
  },
  {
    activity: "Operate the cutover command centre",
    position: "Accountable and Responsible",
    tone: "owns",
  },
  {
    activity: "Coordinate hypercare and business-as-usual handover",
    position: "Accountable and Responsible for overall coordination",
    tone: "owns",
  },
  {
    activity: "Capture lessons learned and reusable knowledge",
    position: "Accountable and Responsible",
    tone: "owns",
  },
];

export const HUB_JOURNEY = [
  {
    name: "Understand and classify",
    description:
      "Confirm the transaction perimeter, archetype, execution implications and critical assumptions.",
  },
  {
    name: "Mobilise",
    description:
      "Establish governance, workstreams, roles, plans, reporting and decision routes.",
  },
  {
    name: "Coordinate delivery",
    description:
      "Control the integrated plan, dependencies, risks, decisions, counterparties and critical path.",
  },
  {
    name: "Prove readiness",
    description:
      "Integrate functional and country evidence, testing, rehearsals and residual-risk positions.",
  },
  {
    name: "Execute Legal Day 1",
    description:
      "Prepare the go or no-go recommendation and operate the completion or cutover command centre.",
  },
  {
    name: "Stabilise and hand over",
    description:
      "Govern hypercare, resolve cross-workstream issues, monitor TSA performance and transition ownership to business as usual.",
  },
];

export type ArchetypeShape = "balance-sheet" | "partial" | "full-integrated" | "full-standalone";

export const ARCHETYPE_SHAPES: Record<
  ArchetypeShape,
  { label: string; implication: string }
> = {
  "balance-sheet": {
    label: "Balance-sheet transaction",
    implication:
      "Use a proportionate programme focused on transferred assets and liabilities, completion mechanics, data, funds flow, reconciliation, retained servicing and control evidence.",
  },
  partial: {
    label: "Partial-business transaction",
    implication:
      "Add capability-gap management, client and employee impacts, data migration or separation, transitional services, supplier dependencies and missing-capability replacement.",
  },
  "full-integrated": {
    label: "Full-business integrated transaction",
    implication:
      "Add full operating-model integration or separation, technology, data, customers, employees, controls, suppliers, synergy delivery, stranded costs and comprehensive readiness testing.",
  },
  "full-standalone": {
    label: "Full-business standalone transaction",
    implication:
      "Prioritise continuity under new ownership, governance appointments, reporting, funding, control handover, licences, TSA operation and selective interfaces rather than assuming full integration.",
  },
};

export const HUB_ARCHETYPES: { id: string; name: string; shape: ArchetypeShape }[] = [
  { id: "balance-sheet-acquisition", name: "Balance Sheet Acquisition", shape: "balance-sheet" },
  { id: "partial-business-acquisition", name: "Partial Business Acquisition", shape: "partial" },
  {
    id: "full-business-acquisition-integrated",
    name: "Full Business Acquisition Integrated",
    shape: "full-integrated",
  },
  {
    id: "full-business-acquisition-standalone",
    name: "Full Business Acquisition Standalone",
    shape: "full-standalone",
  },
  { id: "balance-sheet-sale", name: "Balance Sheet Sale", shape: "balance-sheet" },
  { id: "partial-business-sale", name: "Partial Business Sale", shape: "partial" },
  {
    id: "full-business-sale-buyer-integrates",
    name: "Full Business Sale Buyer Integrates",
    shape: "full-integrated",
  },
  {
    id: "full-business-sale-standalone",
    name: "Full Business Sale Standalone",
    shape: "full-standalone",
  },
];

export type Maturity = "low" | "medium" | "high";

export interface MaturityView {
  label: string;
  points: string[];
  /** Structured split of the same content for the combined result panel. */
  hub: string;
  functional: string;
  regional: string;
}

export const MATURITY_VIEWS: Record<Maturity, MaturityView> = {
  low: {
    label: "Country baseline",
    hub: "Central Hub provides more hands-on programme coordination and escalation.",
    functional:
      "SA Functional Spokes lead functional design, planning and evidence production.",
    regional:
      "Regional Spokes primarily provide local facts, access, stakeholders and execution support.",
    points: [
      "Central Hub provides more hands-on programme coordination and escalation.",
      "SA Functional Spokes lead functional design, planning and evidence production.",
      "Regional Spokes primarily provide local facts, access, stakeholders and execution support.",
    ],
  },
  medium: {
    label: "More mature",
    hub: "Central Hub maintains governance, integrated plan control and readiness integration.",
    functional: "SA and Regional Spokes jointly deliver.",
    regional: "Local teams lead defined activities and provide evidence for central review.",
    points: [
      "Central Hub maintains governance, integrated plan control and readiness integration.",
      "SA and Regional Spokes jointly deliver.",
      "Local teams lead defined activities and provide evidence for central review.",
    ],
  },
  high: {
    label: "Most mature",
    hub: "Central Hub continues to own transaction-wide control, executive reporting, critical-path escalation and integrated go or no-go governance.",
    functional:
      "SA Functional Spokes provide standards, challenge and specialist escalation.",
    regional: "Regional Spokes lead more local execution within delegated authority.",
    points: [
      "Regional Spokes lead more local execution within delegated authority.",
      "SA Functional Spokes provide standards, challenge and specialist escalation.",
      "Central Hub continues to own transaction-wide control, executive reporting, critical-path escalation and integrated go or no-go governance.",
    ],
  },
};

export const CENTRAL_GUARDRAILS = [
  "Transaction scope",
  "Programme budget",
  "Completion timing",
  "Legal Day 1 governance",
  "Transaction-wide readiness",
  "Go or no-go recommendations",
  "Material TSA decisions",
  "Executive reporting",
  "Material risk escalation",
  "Group policy and reserved control-function approvals",
];

export const DASHBOARD_MEASURES = [
  "Critical milestones on track",
  "Critical-path slippage",
  "Open risks and issues by severity",
  "Overdue decisions and actions",
  "Cross-workstream dependencies",
  "Readiness by function and country",
  "Testing and rehearsal status",
  "TSA readiness and exit status",
  "Cutover readiness",
  "Hypercare incidents",
  "Business-as-usual handover status",
];

/** Grouped view of the always-central guardrails, used for the maturity section. */
export const GUARDRAIL_GROUPS: { id: string; title: string; items: string[] }[] = [
  {
    id: "control",
    title: "Transaction control",
    items: ["Transaction scope", "Programme budget", "Completion timing"],
  },
  {
    id: "readiness",
    title: "Readiness and completion",
    items: ["Legal Day 1 governance", "Transaction-wide readiness", "Material TSA decisions"],
  },
  {
    id: "risk",
    title: "Risk and governance",
    items: ["Material risk escalation", "Go or no-go recommendations"],
  },
  {
    id: "reporting",
    title: "Reporting and approvals",
    items: ["Executive reporting", "Group policy and reserved control-function approvals"],
  },
];

/** Side-panel detail for each operating-model layer. */
export const LAYER_DETAILS: Record<
  string,
  { owns: string[]; doesNotOwn: string; ownership: string }
> = {
  hub: {
    ownership: "STEERS THE PROGRAMME",
    owns: [
      "Education - embedding best practice into programme execution and governance based on past experience",
      "Programme Management - owns the programme plan, budget, and reporting to drive best in class governance and tracking",
      "Support - leads mobilisation efforts, supporting the wider Absa community to actually stand up and M&A programme",
      "Quality Assurance - checks and challenges reporting, thinking, and outputs from workstreams to ensure high standards are maintained across the programme",
    ],
    doesNotOwn:
      "The Hub steers the programme rather than owning every functional decision. Functional decisions remain with the relevant Functional Spoke or control function.",
  },
  functional: {
    ownership: "OWNS FUNCTIONAL LEADERSHIP",
    owns: [
      "Specialist functional leadership across the transaction",
      "Functional standards, plans, decisions and readiness evidence",
      "Support to in-country teams where maturity demands",
      "Execution of workstream items where in-country teams are unable to",
    ],
    doesNotOwn: "Does not own transaction-wide sequencing or executive reporting.",
  },
  regional: {
    ownership: "OWNS LOCAL EXECUTION AT A MINIMUM",
    owns: [
      "As much execution as is feasible based on local maturity, capability and capacity",
      "Local regulatory inputs and local customer impact",
      "Market operations and local business ownership",
      "Country-level readiness evidence and local sign-off",
    ],
    doesNotOwn:
      "Group policy, reserved approvals and transaction-wide decisions remain central. Local accountability expands as functional maturity increases.",
  },

};

export type DashboardStatus = "on-track" | "watch" | "risk";

/** Illustrative headline indicators for the Central Hub dashboard preview. */
export const DASHBOARD_HEADLINES: {
  label: string;
  value: string;
  note: string;
  status: DashboardStatus;
}[] = [
  {
    label: "Critical milestones on track",
    value: "38 / 42",
    note: "4 milestones re-baselined this cycle",
    status: "on-track",
  },
  {
    label: "Critical-path slippage",
    value: "6 days",
    note: "Driven by data migration dress rehearsal",
    status: "watch",
  },
  {
    label: "Open risks and issues",
    value: "23",
    note: "3 severe, 8 high, 12 moderate",
    status: "risk",
  },
  {
    label: "Overdue decisions and actions",
    value: "9",
    note: "5 awaiting functional approval",
    status: "watch",
  },
];

/** Illustrative readiness percentages by function. */
export const DASHBOARD_READINESS: { name: string; value: number }[] = [
  { name: "Finance", value: 86 },
  { name: "Technology", value: 64 },
  { name: "Risk and Compliance", value: 78 },
  { name: "Legal", value: 91 },
  { name: "People and Change", value: 72 },
  { name: "Operations", value: 58 },
];

/** Illustrative readiness percentages by country. */
export const DASHBOARD_COUNTRIES: { name: string; value: number }[] = [
  { name: "South Africa", value: 88 },
  { name: "Botswana", value: 74 },
  { name: "Kenya", value: 61 },
  { name: "Ghana", value: 55 },
];

/* ------------------------------------------------------------------ */
/* 1.6 Key Activities (source: Absa M&A Transaction Operating Model)   */
/* ------------------------------------------------------------------ */

export interface HubActivitySet {
  heading: string;
  basis?: string;
  activities: string[];
}

export const HUB_KEY_ACTIVITIES: Record<string, HubActivitySet> = {
  "balance-sheet-acquisition": {
    heading: "Balance Sheet Acquisition - baseline activities",
    activities: [
      "Support CorpDev and Finance & Tax to identify the in-scope assets, liabilities, seller servicing assumptions, client-data availability, premium-to-NAV drivers, tax constraints and finance reporting constraints that affect execution.",
      "Translate price adjustments, effective transfer date, funds flow, data sharing, records access and completion mechanics into the programme plan.",
      "Set the workstreams, governance rhythm, readiness criteria, decision routes and dependency controls needed for a proportionate balance sheet transfer.",
      "Build and maintain the integrated plan. Track portfolio-transfer milestones, seller information flow, data preparation, tax actions, risk acceptances and cross-workstream dependencies.",
      "Manage RAID and decision control. Keep risks, issues, assumptions, dependencies and decisions visible, owned and escalated through the right governance route.",
      "Support LD1 Readiness to scale onboarding only where clients, mandates or servicing obligations move",
      "Coordinate rehearsal of completion-critical activity. Test funds flow, data cut, reconciliation, file transfer, seller servicing hand-off and fallback where material.",
      "Prepare the go/no-go recommendation. Assemble readiness evidence, residual risks, unresolved client or data issues and completion evidence for decision.",
      "Run completion command centre. Coordinate funds transfer, balance recognition, data load or record transfer and first-day control checks.",
      "Support hypercare team to monitor reconciliations, servicing issues, retained obligations, seller performance, risk exceptions and lessons learned.",
    ],
  },
  "partial-business-acquisition": {
    heading: "Partial Business Acquisition - additional activities",
    basis: "The above Balance Sheet Acquisition Activities, plus additional:",
    activities: [
      "Confirm the partial acquisition perimeter. Separate the transferring operating components from the capabilities, services, people, data and controls that remain outside scope.",
      "Coordinate workstreams to build the capability-gap log. Identify missing Absa capabilities, required build, seller support, client impacts, employee impacts and TSA dependencies.",
      "Ensure transitional services, Group Interchange dependencies, recharge and buy-back assumptions, exit assumptions, service levels, data access, operational support and buyer-seller obligations are captured.",
      "Bring in the Functional Spokes and Regional Spokes needed for missing-capability replacement, integration, onboarding, testing and cutover.",
      "Track build activity, remediation, data migration, onboarding, TSA exit planning and cross-workstream dependencies.",
      "Confirm testing shows missing capabilities have been replaced, integrated or supported through controlled transitional arrangements.",
      "Bring together client onboarding, KYC / AML, operational readiness, employee readiness to drive quicker more efficient client onboarding ahead of LD1",
      "Control go/no-go around partial acquisition risk. Present readiness against missing-capability closure, TSA dependency, client onboarding, residual risk and control acceptance.",
    ],
  },
  "full-business-acquisition-integrated": {
    heading: "Full Business Acquisition A (integrated) - further additional activities",
    basis: "The above Balance Sheet Acquisition Activities and Partial Business Acquisition, plus additional:",
    activities: [
      "Ensure CorpDev team confirms the complete business perimeter, integration objectives, synergy assumptions, licences, clients, employees, technology, suppliers, data and control compatibility.",
      "Capture ownership transfer, integration access, data sharing, TSA services, employee transfer, regulatory approvals, completion mechanics and integration milestones.",
      "Mobilise the full integration programme. Establish workstreams across operating model, technology, data, clients, employees, controls, suppliers, communications and synergy delivery.",
      "Manage delivery: track build progress, remediation, TSA exit planning, policy alignment, dependency resolution and executive reporting.",
      "Control synergy and value delivery assumptions with Finance & Tax. Keep premium-to-NAV, amortisation, group P&L, one-off cost, stranded-cost and integration-risk assumptions visible through governance.",
      "Ensure testing covers customer journeys, systems, data migration, controls, employee processes, supplier services and reporting.",
      "Coordinate completion, system activation, migration, client and employee readiness, finance entries, supplier readiness and issue escalation.",
      "Support hypercare team to monitor service stability, synergy delivery, TSA exit, data and technology defects, client issues, employee adoption, controls and BAU transition.",
    ],
  },
  "full-business-acquisition-standalone": {
    heading: "Full Business Acquisition B (standalone) \u2013 new activity set",
    basis: "Standalone activity set:",
    activities: [
      "Support CorpDev team to confirm whether the acquired business can operate under Absa ownership across governance, licences, reporting, funding, controls, employees, suppliers and technology.",
      "Translate control handover, standalone governance, reporting rights, funding, access, transitional services, data access and regulatory conditions into deal terms.",
      "Protect standalone operations while connecting the acquired business to Absa governance, finance, risk and reporting.",
      "Confirm decision rights, management forums, escalation routes, reporting packs, control attestations and Absa oversight requirements.",
      "Set the TSA, Group Interchange and retained-service model. Define the services needed to keep the business running, the recharge or buy-back mechanics, the evidence required, the exit conditions and the owner for each dependency.",
      "Track governance set-up, reporting integration, funding arrangements, control uplift, TSA management and selective system or data interfaces.",
      "Test governance, reporting, funding, access, controls, key services and selective interfaces without assuming full operational integration.",
      "Prepare client continuity, service communications, governance handover, control attestations, local management readiness and transitional service coverage.",
      "Present continuity readiness, control evidence, governance appointments, TSA risks, funding readiness and regulator commitments.",
      "Activate governance, reporting access, funding confirmation, TSA commencement and critical-service checks.",
      "Support standalone hypercare. Monitor service continuity, management information, control issues, funding, TSA performance, reporting quality and future integration options.",
    ],
  },
  "balance-sheet-sale": {
    heading: "Balance Sheet Sale - baseline divestment activities",
    activities: [
      "Support CorpDev to confirm transferring assets, liabilities, retained obligations, buyer information needs, servicing obligations and Absa residual exposure.",
      "Translate asset and liability transfer, retained servicing, data sharing, completion mechanics, buyer obligations and liability allocation into the plan.",
      "Set up the separation workstreams, governance rhythm, readiness criteria, buyer dependency controls and LD1 evidence requirements.",
      "Track buyer information requests, data extracts, retained servicing design, risk acceptances, finance controls and liability tracking.",
      "Keep retained liabilities, servicing commitments, regulatory reporting and residual Absa exposure visible through governance.",
      "Ensure testing covers data extracts, reconciliation, settlement, buyer hand-off, retained servicing and post-sale control processes.",
      "Scale readiness around client notices, consent, data transfer and retained Absa servicing obligations where clients transfer.",
      "Coordinate testing of data extract, funds flow, buyer file hand-off, retained servicing procedures, reconciliation and fallback.",
      "Present transfer readiness, retained liability position, buyer dependencies, unresolved data issues and control acceptances.",
      "Coordinate completion, balance transfer, funds flow, data or records hand-off, retained servicing activation and first-day control checks.",
      "Monitor retained obligations, buyer queries, reconciliations, customer issues, regulatory reporting and BAU close-out.",
    ],
  },
  "partial-business-sale": {
    heading: "Partial Business Sale - additional divestment activities",
    basis: "The above Balance Sheet Sale Activities, plus additional:",
    activities: [
      "Capture buyer build needs, Absa TSA support, Group Interchange dependencies, shared services, employee impacts, data disentanglement, stranded costs and recharge or buy-back requirements.",
      "Mobilise the Separation Management Office. Cover buyer integration dependencies, Absa retained obligations, TSA exit, employee transfer, supplier actions, data separation and readiness.",
      "Track remediation, buyer dependencies, TSA readiness, contract and supplier actions, workforce separation, technology separation, data extraction and retained-cost actions.",
      "Ensure testing shows transferred components operate with buyer integration or Absa TSA support while retained Absa operations remain stable.",
      "Bring together client continuity, notices, consent, KYC / AML hand-off, service model, employee readiness, supplier continuity and retained obligations.",
      "Rehearse separation runbooks. Test buyer hand-offs, TSA service commencement, data cuts, technology access, supplier notifications, employee transfer and fallback.",
      "Present separation readiness, buyer dependency status, TSA readiness, retained Absa risk, residual defects and control acceptances.",
      "Monitor buyer support, TSA service levels, retained Absa operations, client issues, employee issues, supplier issues, stranded costs and separation defects.",
    ],
  },
  "full-business-sale-buyer-integrates": {
    heading: "Full Business Sale A (buyer integrates) - further additional divestment activities",
    basis: "The above Balance Sheet Acquisition Sale and Partial Business Sale, plus additional:",
    activities: [
      "Confirm buyer integration requirements, Absa separation obligations, shared services, licences, clients, employees, technology, suppliers, data and stranded-cost exposure.",
      "Mobilise the full separation programme. Align workstreams to buyer integration milestones, Absa retained-service obligations, TSA exit and LD1 readiness.",
      "Manage full business separation. Track buyer integration dependencies, TSA readiness, data and technology separation, contract remediation, employee transfer, supplier actions and executive reporting.",
      "Ensure testing covers buyer integration hand-offs, Absa separation controls, data transfer, service continuity, retained operations and TSA operation.",
    ],
  },
  "full-business-sale-standalone": {
    heading: "Full Business Sale B (standalone) - new divestment activity set",
    basis: "Standalone activity set:",
    activities: [
      "Support CorpDev to confirm legal-entity continuity, licences, governance, reporting, controls, employees, suppliers, technology, data, TSA support and retained Absa obligations.",
      "Translate legal completion, control handover, standalone governance, reporting, TSA support, service levels, data access, regulatory conditions and retained liabilities into deal terms.",
      "Mobilise a continuity-focused separation programme. Prepare the business to operate under buyer ownership while preserving Absa retained controls and TSA commitments.",
      "Confirm governance appointments, reporting separation, escalation routes, management information, control evidence and retained Absa oversight.",
      "Support functional spokes to define what Absa continues to provide, how TSA service levels and Group Interchange charges work, how issues escalate and how obligations close.",
      "Track reporting separation, funding arrangements, TSA service readiness, supplier continuity, control evidence and retained-obligation actions.",
      "Ensure testing covers reporting, control handover, access, funding, supplier services, TSA operation and retained Absa service boundaries.",
      "Present continuity readiness, buyer governance readiness, TSA evidence, retained risk, regulatory commitments and residual exceptions.",
      "Support standalone divestment hypercare. Monitor service continuity, TSA performance, retained Absa obligations, reporting quality, supplier performance, control issues and BAU close-out.",
    ],
  },
};

/* ------------------------------------------------------------------ */
/* 1.5 Role summaries (transaction-wide role table)                    */
/* ------------------------------------------------------------------ */

export interface RoleSummary {
  title: string;
  role: string;
  responsibilities: string;
  mandate: string;
  prerequisites: string[];
  boundaries: string[];
}

export const ROLE_SUMMARIES: RoleSummary[] = [
  {
    title: "Executive Sponsor (Accountable Exec, AE)",
    role: "Provide overall strategic direction and drive decision making at the highest levels",
    responsibilities: "Ultimately responsible for the strategic and commercial success of the transaction",
    mandate:
      "Makes Absa-wide, transaction-level decisions which may materially impact the shape or success of the transaction",
    prerequisites: [
      "Must be empowered to convene top decision makers at short notice",
      "Must be empowered to make decisions which impact the strategic direction of the transaction as a whole",
      "Must ultimately sign off on budget and business case",
    ],
    boundaries: [],
  },
  {
    title: "Transaction Director (TD)",
    role: "Senior leader accountable for the successful execution of the transaction. Translates the strategic intent and contractual requirements into an executable programme, establishes the organisation and governance to deliver it, and drives towards successful Legal Day 1",
    responsibilities:
      "Translating the deal into an executable transaction programme, mobilising the transaction, owning the integrated execution plan, and leading programme governance and decision-making",
    mandate:
      "Makes transaction-level decisions which are vital for execution, assesses intra-transaction trade-offs, and provides execution-level strategic direction",
    prerequisites: [
      "Must be empowered to make transaction-level decisions related to execution",
      "Must own the budget, to ensure the programme is staffed correctly",
      "Must own the maintenance of the business case, to ensure the programme is tracking effectively",
      "Must be empowered to escalate to executives at short notice on urgent matters",
    ],
    boundaries: [
      "Accountable but not responsible for driving execution (Prog. Manager)",
      "Escalates to AE where decisions have a broader strategic impact",
      "Functional decisions on execution-specifics (design decisions, etc.) are made by Workstream Execs",
    ],
  },
  {
    title: "Programme Manager / Director",
    role: "Drives the day-to-day management and control of the M&A programme. Acts as the central point of coordination across the transaction, ensuring that plans, dependencies, risks, decisions and readiness are managed consistently across the organisation.",
    responsibilities:
      "Establishes and operates the programme management framework, owns and maintains the integrated programme plan, drives cross-workstream coordination and dependency management, runs governance, and decision support, leads the PMO and maintain delivery discipline",
    mandate:
      "Makes programme-management related decisions, regarding the governance and execution of the plan (e.g. governance cadence, reporting structures, etc)",
    prerequisites: [
      "Must be empowered to define the programme structure and governance",
      "Must be empowered to hold execution teams accountable, regardless of seniority",
      "Must drive plan creation, to ensure plan tracking is achievable and realistic",
      "Must be empowered to escalate to the Transaction Director at short notice on urgent matters",
    ],
    boundaries: [
      "Responsible for driving execution, but not the execution itself",
      "Escalates to TD where decisions have a broader programme impact",
    ],
  },
  {
    title: "PMO Support",
    role: "Provides the programme management coordination, administration and control required to support delivery of an M&A deal",
    responsibilities:
      "Maintains programme plans and milestone tracking, coordinates workstream reporting, maintains RAID logs, coordinates governance and programme forums, supports dependency and cross-workstream coordination, maintains programme documentation and controls",
    mandate: "Limited decision mandate, may make decisions on escalations if execution is lacking",
    prerequisites: [
      "Must be empowered to build relationships with Workstream Leads and hold them accountable, regardless of seniority",
    ],
    boundaries: [
      "Responsible for coordinating execution, but not the execution itself",
      "Escalates to Programme Manager where decisions must be made",
    ],
  },
  {
    title: "Workstream Exec",
    role: "Owns the success of the workstream outcomes and is ultimately accountable for their execution",
    responsibilities:
      "Unblock workstream execution by providing SME input and decision making, support WSL with escalations and senior-level coordination, assure workstream trade-offs and major prioritisation decisions",
    mandate:
      "Makes workstream-level prioritisation and trade-off decisions, signs off on key design decisions and workstream execution plan",
    prerequisites: [
      "Must be empowered to define the strategic direction of the workstream, aligned to deal objectives",
    ],
    boundaries: [
      "Accountable for workstream execution, not responsible",
      "Escalates to AE / TD where trade-off decisions are programme-wide",
    ],
  },
  {
    title: "Workstream Lead (WSL)",
    role: "Defines and manages the backlog of work within their workstream, ensuring alignment with deal objectives",
    responsibilities:
      "Own workstream scope, detailed plan, outcomes and deliverables. Develop and maintain the detailed workstream plan, mobilise and coordinate functional resources and SMEs, manage workstream risks, issues, assumptions and dependencies, drive functional decisions and escalate blockers promptly, report workstream progress, maintain and coordinate to the central PMO",
    mandate:
      "Can determine workstream-level requirements, and make prioritisation decisions which do not impact overall delivery scope",
    prerequisites: [
      "Must be empowered to define the detailed activities which sit underneath high-level milestones",
      "Must be able to define resource requirements, and prioritise resource capacity",
    ],
    boundaries: [
      "Responsible for driving workstream execution, and some of the execution itself",
      "Escalate to Workstream Exec where trade-off decisions must be made",
    ],
  },
  {
    title: "Workstream Project Manager",
    role: "Supports the Workstream Lead by providing project management discipline, including tracking progress, managing timelines, reporting risks and issues, and coordinating across teams",
    responsibilities:
      "Act as facilitator between the Workstream Lead and technical or operational teams to ensure smooth execution, own the coordination of the L2 plan, own workstream-level governance activities, and preparing WSL to report into Central Hub",
    mandate: "Minimal decision making mandate",
    prerequisites: ["none"],
    boundaries: [
      "Responsible for coordinating workstream execution, and some of the execution itself",
      "Escalates to Workstream Lead where any decisions must be made",
    ],
  },
  {
    title: "Workstream Team Member",
    role: "Completes execution tasks within a workstream, and flags RAID items for escalation",
    responsibilities:
      "Leverage function-specific SME knowledge to execute an plan and milestones, input into requirements and planning, escalate into workstream governance where needed",
    mandate: "Minimal decision making mandate",
    prerequisites: ["none"],
    boundaries: ["Responsible for actual execution, not decision making"],
  },
];
