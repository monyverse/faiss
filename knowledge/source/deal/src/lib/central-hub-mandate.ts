/**
 * Central Hub mandate content reproduced verbatim from Section 1 of the
 * Absa M&A Transaction Operating Model document (1.2, 1.3 and 1.4).
 * Do not summarise, paraphrase or correct the wording.
 */

export interface HubResponsibilityRow {
  category: string;
  responsibility: string;
  boundary: string;
}

/** 1.2 High-Level Responsibilities */
export const HUB_RESPONSIBILITY_ROWS: HubResponsibilityRow[] = [
  {
    category: "Owns",
    responsibility:
      "Mobilise the transaction, establish programme governance, maintain the integrated plan, own cross-workstream dependencies, manage central RAID and decision logs, and produce executive reporting.",
    boundary: "Functional decisions remain with the relevant Functional Spoke or control function.",
  },
  {
    category: "Owns",
    responsibility:
      "Decision making on key role appointments, such as Workstream leads alongside Accountable Executives",
    boundary: "Collaboration with workstream-specific execs required to drive ownership",
  },
  {
    category: "Owns",
    responsibility:
      "Define transaction methodology, standards, mobilisation templates, workstream charter requirements, readiness evidence standards and cutover governance.",
    boundary:
      "Methodology sets the control framework but does not prescribe every functional design choice.",
  },
  {
    category: "Owns",
    responsibility:
      "Coordination and tracking of execution and governance across all functional and regional spokes",
    boundary: "Coordination only, functional spokes responsible for delivery",
  },
  {
    category: "Owns",
    responsibility:
      "Coordinate Legal Day 1 readiness, dress rehearsals, go/no-go preparation, cutover command-centre operation, hypercare governance and lessons learned.",
    boundary: "Functional readiness evidence is owned by the relevant workstream.",
  },
  {
    category: "Coordinates",
    responsibility:
      "Mobilise Functional Spokes and Regional Spokes, align workstream plans, surface critical-path risks and escalate unresolved trade-offs.",
    boundary:
      "The Hub coordinates and challenges but does not become the accountable owner of specialist approvals.",
  },
  {
    category: "Coordinates",
    responsibility:
      "Interface with Corporate Development, Finance & Tax, Legal & CorpDev, deal teams and external counterparties to translate deal economics, Group Interchange requirements, SPA terms, conditions precedent and execution commitments into programme plans.",
    boundary:
      "Corporate Development, Finance & Tax and Legal & CorpDev retain their own commercial, financial and legal mandates.",
  },
  {
    category: "Functional Spoke owned",
    responsibility: "Workstream-level decisions sit with the accountable functional authority.",
    boundary: "The Hub records decisions and coordinates cross-workstream consequences.",
  },
  {
    category: "Locally owned",
    responsibility:
      "As much execution as feasible, local regulatory inputs, local customer impact and market operations are owned by Regional Spokes where maturity and delegated authority support local ownership.",
    boundary: "Group policy, reserved approvals and transaction-wide decisions remain central.",

  },
];

export interface HubMandateRow {
  decisionType: string;
  mandate: string;
  examples: string;
  approval: string;
}

/** 1.3 Decision Mandate */
export const HUB_MANDATE_ROWS: HubMandateRow[] = [
  {
    decisionType: "Independent decisions",
    mandate:
      "May decide programme cadence, reporting format, dependency-management approach, central mobilisation approach and issue-routing discipline. May decide how approved budget is spent. May decide on key role appointments such as workstream leads",
    examples:
      "Weekly workstream cadence, RAID format, mobilisation pack content, command-centre rhythm, budget decisions once approved.",
    approval: "Transaction Director within delegated programme authority.",
  },
  {
    decisionType: "Recommended decisions",
    mandate:
      "May recommend archetype application, workstream intensity, readiness thresholds, escalation priorities, and TSA exit sequencing.",
    examples:
      "Classifying full-business acquisition as integrated or standalone for execution planning",
    approval: "Programme Sponsor, Functional AEs or Executive Governance according to topic.",
  },
  {
    decisionType: "Functional approval required",
    mandate:
      "Must seek accountable functional approval for functional design, policy, control, risk, credit, tax, legal and technology architecture decisions.",
    examples:
      "Credit exposure acceptance, data retention approach, accounting treatment, product feature treatment, cyber exception.",
    approval: "Relevant SA Functional Spoke or control-function authority.",
  },
  {
    decisionType: "Country approval required",
    mandate:
      "Must seek local approval where execution affects local clients, regulators, operations, statutory obligations, employment requirements or market practice.",
    examples: "Local client notice timing, country regulator submission input, local servicing model.",
    approval: "Regional Spoke leadership and local accountable executive.",
  },
  {
    decisionType: "Executive governance required",
    mandate:
      "Must escalate transaction-wide trade-offs, material residual risk, LD1 go/no-go recommendations, changes to scope, budget, completion timing or risk appetite.",
    examples:
      "Delay to completion, go/no-go recommendation with open high risk, material TSA extension.",
    approval: "Programme Sponsor, Transaction Director and Executive Governance.",
  },
];

export interface HubRaciFullRow {
  activity: string;
  centralHub: string;
  functionAuthority: string;
  regionalSpoke: string;
  executiveGovernance: string;
  counterparty: string;
}

/** 1.4 RACI */
export const HUB_RACI_COLUMNS = [
  "Activity",
  "Central Hub",
  "SA Functional Spoke",
  "In-country Regional Spoke",
  "Executive governance",
  "Seller / buyer counterparty",
] as const;

export const HUB_RACI_FULL_ROWS: HubRaciFullRow[] = [
  {
    activity: "Transaction mobilisation and programme launch",
    centralHub: "A/R - mobilise programme, roles, cadence and start-up actions",
    functionAuthority: "R - nominate leads and mobilise functional team",
    regionalSpoke: "C - mobilise local leads and country inputs",
    executiveGovernance: "I - informed of launch and governance route",
    counterparty: "C - align joint mobilisation where required",
  },
  {
    activity: "Programme governance design and forum cadence",
    centralHub: "A/R - design governance, reporting cycle and forum rhythm",
    functionAuthority: "C - confirm functional governance needs",
    regionalSpoke: "C - confirm local governance constraints",
    executiveGovernance: "I - receive agreed governance route",
    counterparty: "C - align joint governance touchpoints",
  },
  {
    activity: "Budget definition and funding baseline",
    centralHub: "R - build programme budget baseline and assumptions alongside CorpDev",
    functionAuthority: "R - provide functional cost, resource and supplier inputs",
    regionalSpoke: "R - provide local cost, travel and capacity inputs",
    executiveGovernance: "A - approve the budget baseline and material funding requests",
    counterparty: "C - provide joint-cost, TSA or counterparty inputs",
  },
  {
    activity: "Budget management within the approved baseline",
    centralHub: "A/R - manage spend decisions, forecast and control within the approved budget",
    functionAuthority: "R - manage functional spend and forecast updates",
    regionalSpoke: "R - manage local spend inputs and country variances",
    executiveGovernance: "I - receive budget reporting",
    counterparty: "C - resolve shared-cost or TSA billing items",
  },
  {
    activity: "Budget overrun or material funding change",
    centralHub: "R - prepare impact assessment and funding recommendation",
    functionAuthority: "C - validate functional impact and options",
    regionalSpoke: "C - validate local impact and options",
    executiveGovernance: "A - approve overruns or material funding changes",
    counterparty: "C - agree shared-cost or counterparty implications",
  },
  {
    activity: "Integrated programme plan and critical path",
    centralHub: "A/R - own the integrated plan, critical path and transaction milestones",
    functionAuthority: "R - provide and maintain functional milestones and dependencies",
    regionalSpoke: "R - maintain local milestones and dependencies",
    executiveGovernance: "I - informed of material plan movement",
    counterparty: "C - align joint milestones and dependencies",
  },
  {
    activity: "Workstream charter and L2 plan standards and QA",
    centralHub: "A/R - set standards and quality-assure completeness",
    functionAuthority: "C - confirm functional requirements",
    regionalSpoke: "C - confirm local planning requirements",
    executiveGovernance: "I - informed of material gaps",
    counterparty: "C - input where joint activity is required",
  },
  {
    activity: "Functional and local workstream scope and L2 plans",
    centralHub: "C - integrate plans, quality-assure completeness and challenge gaps",
    functionAuthority: "C/R - provide standards, specialist input and hands-on support; directly own delivery only where a documented exception confirms that regional maturity, capability, capacity or delegated authority is insufficient",
    regionalSpoke: "A/R - own the workstream scope and L2 plan wherever local maturity, capability, capacity and delegated authority permit",
    executiveGovernance: "I - informed of material gaps",
    counterparty: "C - input where joint activity is required",
  },
  {
    activity: "Execution of workstream activities",
    centralHub: "I/C - maintain integrated visibility and escalate transaction-wide blockers",
    functionAuthority: "C/R - provide standards, specialist input and hands-on support; directly own delivery only where a documented exception confirms that regional maturity, capability, capacity or delegated authority is insufficient",
    regionalSpoke: "A/R - own and execute workstream activities wherever local maturity, capability, capacity and delegated authority permit",
    executiveGovernance: "I - informed of material issues",
    counterparty: "C/R - execute agreed counterparty activities",
  },
  {
    activity: "Workstream status reporting and issue escalation",
    centralHub: "C - set reporting standards and route transaction-wide escalations",
    functionAuthority: "C/R - provide standards, specialist input and hands-on support; directly own delivery only where a documented exception confirms that regional maturity, capability, capacity or delegated authority is insufficient",
    regionalSpoke: "A/R - produce workstream reporting, own issue escalation and drive action closure wherever feasible",
    executiveGovernance: "I - informed of material issues and escalations",
    counterparty: "C - provide joint status and escalation input where needed",
  },
  {
    activity: "Integrated status reporting and executive packs",
    centralHub: "A/R - consolidate workstream status, prepare executive packs and maintain the transaction narrative",
    functionAuthority: "C - challenge functional completeness and provide reserved-matter input",
    regionalSpoke: "R - provide workstream status, blockers, decisions, escalations and readiness evidence",
    executiveGovernance: "I - receive concise reporting and escalations",
    counterparty: "C - provide joint status where needed",
  },
  {
    activity: "Governance forum operation and action management",
    centralHub: "A/R - run forums, record actions and chase closure",
    functionAuthority: "R - attend, resolve actions and bring decisions where needed",
    regionalSpoke: "R - attend where relevant and resolve local actions",
    executiveGovernance: "I - informed through agreed packs",
    counterparty: "C - attend joint forums where required",
  },
  {
    activity: "Workstream RAID ownership and escalation",
    centralHub: "C - maintain integrated visibility and route cross-workstream or transaction-level escalations",
    functionAuthority: "C/R - provide standards, specialist input and hands-on support; directly own delivery only where a documented exception confirms that regional maturity, capability, capacity or delegated authority is insufficient",
    regionalSpoke: "A/R - own the workstream RAID, mitigations, evidence, ageing and escalation wherever feasible",
    executiveGovernance: "I - informed of material risks and issues",
    counterparty: "C/R - own counterparty risks, issues and actions where applicable",
  },
  {
    activity: "Integrated RAID log and transaction-level escalation",
    centralHub: "A/R - own the integrated RAID log, ageing discipline and transaction-level escalation route",
    functionAuthority: "C - challenge functional risk treatment and support unresolved escalations",
    regionalSpoke: "R - provide workstream risks, issues, mitigations and escalation status",
    executiveGovernance: "C/I - decide matters escalated through the relevant reserved-decision route",
    counterparty: "C/R - own counterparty actions where applicable",
  },
  {
    activity: "Cross-workstream dependency management",
    centralHub: "A/R - track cross-workstream dependencies, owners and critical-path impacts",
    functionAuthority: "C/R - provide specialist support and resolve centrally owned dependencies",
    regionalSpoke: "R - identify, manage and escalate local and functional dependencies",
    executiveGovernance: "I - informed of material dependency risks",
    counterparty: "C/R - manage joint dependencies",
  },
  {
    activity: "Decision log and follow-through",
    centralHub: "A/R - maintain the decision log and closure discipline",
    functionAuthority: "R - make functional decisions within delegated authority",
    regionalSpoke: "R - make local decisions within delegated authority",
    executiveGovernance: "R - decide reserved executive matters",
    counterparty: "C/R - confirm joint decisions where applicable",
  },
  {
    activity: "Delegated functional decisions and escalation",
    centralHub: "C - record material decisions and coordinate cross-workstream consequences",
    functionAuthority: "C/R - provide specialist advice, decide reserved matters and take ownership only where regional authority or capability is insufficient",
    regionalSpoke: "A/R - make and escalate functional decisions within delegated authority wherever feasible",
    executiveGovernance: "I - informed of material decisions; A only where executive reservation applies",
    counterparty: "C/R - confirm joint decisions where applicable",
  },
  {
    activity: "Change-control process and impact assessment",
    centralHub: "A/R - run change control and consolidate impact assessment",
    functionAuthority: "R - assess functional impact and options",
    regionalSpoke: "R - assess local impact and feasibility",
    executiveGovernance: "I - informed of proposed changes",
    counterparty: "C/R - assess counterparty impacts",
  },
  {
    activity: "Material scope, budget or timing change",
    centralHub: "R - prepare the integrated recommendation and decision paper",
    functionAuthority: "C - confirm functional impacts and options",
    regionalSpoke: "C - confirm local impacts and options",
    executiveGovernance: "A - approve the material change",
    counterparty: "C - agree counterparty implications where required",
  },
  {
    activity: "Functional standards, policies and reserved approvals",
    centralHub: "C - ensure decisions are visible and governed",
    functionAuthority: "A/R - own functional standards, interpretations and approvals",
    regionalSpoke: "R - execute locally within delegated authority",
    executiveGovernance: "I/C - approve only where executive reservation applies",
    counterparty: "C - input where standards affect joint execution",
  },
  {
    activity: "Regional maturity assessment framework",
    centralHub: "A/R - provide the framework, evidence requirements and integrated visibility",
    functionAuthority: "C - provide functional maturity criteria and challenge",
    regionalSpoke: "R - provide evidence of local maturity, capability and capacity",
    executiveGovernance: "I - informed of material delivery-risk shifts",
    counterparty: "I - informed where joint delivery may change",
  },
  {
    activity: "Functional and regional execution split",
    centralHub: "C - facilitate and record the agreed split and any exceptions",
    functionAuthority: "C/R - confirm reserved matters and provide the fallback delivery model where regional ownership is not feasible",
    regionalSpoke: "A/R - propose and own the local execution model within delegated authority, supported by evidence of capacity and capability",
    executiveGovernance: "I - informed of material delivery-risk shifts",
    counterparty: "I - informed where joint delivery changes",
  },
  {
    activity: "Education, templates and best-practice embedding",
    centralHub: "A/R - share methodology, templates and reusable playbooks",
    functionAuthority: "C/R - provide SME content and functional examples",
    regionalSpoke: "R - adopt standards and embed them locally",
    executiveGovernance: "I - informed of material capability gaps",
    counterparty: "I - receive agreed ways of working where needed",
  },
  {
    activity: "Quality assurance of workstream governance and evidence",
    centralHub: "A/R - quality-assure governance discipline, evidence quality and readiness packs",
    functionAuthority: "R - produce functional evidence and remediate gaps",
    regionalSpoke: "R - produce local evidence and remediate gaps",
    executiveGovernance: "I/C - informed of assurance gaps",
    counterparty: "C - provide evidence for joint dependencies",
  },
  {
    activity: "SPA, BSA, TSA and CP execution implications",
    centralHub: "R - coordinate execution implications and dependency visibility",
    functionAuthority: "A/R - own functional interpretation and delivery actions",
    regionalSpoke: "R - own local evidence, approvals and execution actions",
    executiveGovernance: "C/I - receive material legal or completion risks",
    counterparty: "C/R - own counterparty obligations and inputs",
  },
  {
    activity: "Workstream readiness evidence and escalation",
    centralHub: "C - set integrated evidence standards and route transaction-wide gaps",
    functionAuthority: "C/R - provide standards, specialist input and hands-on support; directly own delivery only where a documented exception confirms that regional maturity, capability, capacity or delegated authority is insufficient",
    regionalSpoke: "A/R - produce, validate and escalate workstream readiness evidence wherever feasible",
    executiveGovernance: "I - informed of material readiness gaps",
    counterparty: "C - provide evidence for joint obligations and dependencies",
  },
  {
    activity: "LD1 readiness framework and go/no-go pack",
    centralHub: "A/R - own the integrated readiness framework and go/no-go pack",
    functionAuthority: "R - provide functional readiness sign-off and evidence",
    regionalSpoke: "R - provide country sign-off and local readiness evidence",
    executiveGovernance: "I - receive the pack and decision recommendation",
    counterparty: "C - confirm joint readiness and open items",
  },
  {
    activity: "Formal go/no-go decision",
    centralHub: "R - coordinate the decision forum and present the integrated recommendation",
    functionAuthority: "R - provide the functional recommendation and accepted exceptions",
    regionalSpoke: "R - provide local sign-off and residual issues",
    executiveGovernance: "A - make the formal go/no-go decision through the applicable governance",
    counterparty: "C - confirm joint readiness and open counterparty items",
  },
  {
    activity: "Testing, mock runs and dress-rehearsal governance",
    centralHub: "A/R - coordinate governance, issue escalation and readiness reporting",
    functionAuthority: "R - execute or evidence functional testing obligations",
    regionalSpoke: "R - execute local testing and provide local evidence",
    executiveGovernance: "I/C - informed of material residual risk",
    counterparty: "C/R - participate in joint testing where required",
  },
  {
    activity: "Functional and local testing execution and defect escalation",
    centralHub: "I/C - maintain integrated visibility and route critical defects",
    functionAuthority: "C/R - provide standards, specialist input and hands-on support; directly own delivery only where a documented exception confirms that regional maturity, capability, capacity or delegated authority is insufficient",
    regionalSpoke: "A/R - execute local and functional testing, manage defects and escalate unresolved issues wherever feasible",
    executiveGovernance: "I - informed of material residual risk",
    counterparty: "C/R - participate in joint testing and defect resolution",
  },
  {
    activity: "Cutover command centre and execution control",
    centralHub: "A/R - run the command centre, issue triage and escalation",
    functionAuthority: "R - execute functional cutover tasks",
    regionalSpoke: "R - execute local cutover tasks and first-day support",
    executiveGovernance: "I - informed of cutover status and escalations",
    counterparty: "C/R - execute joint cutover tasks",
  },
  {
    activity: "Local cutover task execution and escalation",
    centralHub: "C - coordinate dependencies through the command centre",
    functionAuthority: "C/R - provide standards, specialist input and hands-on support; directly own delivery only where a documented exception confirms that regional maturity, capability, capacity or delegated authority is insufficient",
    regionalSpoke: "A/R - own local cutover tasks, first-day support and escalation wherever feasible",
    executiveGovernance: "I - informed of material cutover risk",
    counterparty: "C/R - execute joint cutover tasks",
  },
  {
    activity: "Integrated hypercare governance and stability reporting",
    centralHub: "A/R - govern hypercare, the stability dashboard and integrated closure",
    functionAuthority: "R - provide functional stability status and actions",
    regionalSpoke: "R - provide local stability status and actions",
    executiveGovernance: "I - informed of material stability risk",
    counterparty: "C/R - provide counterparty service and issue status",
  },
  {
    activity: "Workstream handover and residual-action closure",
    centralHub: "C - track transaction-wide dependencies and integrated closure",
    functionAuthority: "C/R - provide standards, specialist input and hands-on support; directly own delivery only where a documented exception confirms that regional maturity, capability, capacity or delegated authority is insufficient",
    regionalSpoke: "A/R - own workstream handover, local evidence, BAU acceptance and residual-action closure wherever feasible",
    executiveGovernance: "I - informed of material handover risk",
    counterparty: "C/R - support joint handover or TSA exit",
  },
  {
    activity: "Local stabilisation and BAU acceptance",
    centralHub: "C - track transaction-wide dependencies and escalation",
    functionAuthority: "C - provide functional standards and specialist support",
    regionalSpoke: "A/R - own local stabilisation, BAU acceptance and local residual actions",
    executiveGovernance: "I - informed of material stability risk",
    counterparty: "C/R - support local joint handover or TSA exit",
  },
  {
    activity: "Lessons learned and knowledge capture",
    centralHub: "A/R - own lessons learned, playbook updates and reusable knowledge",
    functionAuthority: "R - provide functional lessons and artefacts",
    regionalSpoke: "R - provide local lessons and country-specific artefacts",
    executiveGovernance: "I - informed of material lessons",
    counterparty: "C - provide counterparty lessons where appropriate",
  },
];

export const RACI_APPLICATION_NOTE =
  "Regional Spokes are the default accountable and responsible owners for workstream execution, delegated functional decisions, workstream reporting and escalation, RAID management, readiness evidence, testing, cutover and BAU handover. SA Functional Spoke provide standards, specialist challenge and hands-on support, and assume delivery accountability only where a documented assessment confirms that regional maturity, capability, capacity or delegated authority is insufficient. Function Authorities remain accountable for group standards, policy interpretation, specialist decisions and reserved approvals. The Central Hub remains accountable for integrated programme governance, consolidated reporting, cross-workstream dependencies and transaction-level escalation. The agreed ownership split and any exceptions must be recorded during mobilisation in the workstream charter, RACI and decision log.";
