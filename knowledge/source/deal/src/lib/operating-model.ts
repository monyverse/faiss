/**
 * Absa M&A operating model reference data.
 *
 * Single source of truth for the three operating-model components, governance
 * roles and accountabilities, resourcing rules, functional spoke content, the
 * partner accelerator network and the deal journey. Content is intentionally
 * held as plain data so it can be updated quickly after each working session.
 */

export type ComponentId = "hub" | "spokes" | "partners";

export interface OmComponent {
  id: ComponentId;
  name: string;
  strapline: string;
  summary: string;
  purpose: string;
  responsibilities: string[];
  services: string[];
  decisionRights: string[];
  governance: string[];
  capabilities: string[];
  inputs: string[];
  outputs: string[];
}

export const COMPONENTS: OmComponent[] = [
  {
    id: "hub",
    name: "Central M&A Hub",
    strapline: "Inorganic Change Team",
    summary:
      "Permanent core team that owns the M&A method, mobilises every deal and holds programme control from pre-signing through hypercare.",
    purpose:
      "Hold Absa's inorganic delivery capability in one place so each deal starts from a codified method rather than from scratch, and so execution discipline is consistent across archetypes and geographies.",
    responsibilities: [
      "Own and maintain the codified lifecycle, archetype classification and artefact set",
      "Mobilise the deal: archetype call, delivery shape, resourcing plan and governance stand-up",
      "Run integrated planning, milestone tracking, risk and dependency management",
      "Chair the transaction working group and prepare steering committee material",
      "Run readiness, dress rehearsals and go/no-go evidence packs",
      "Capture lessons learnt and feed them back into the method",
    ],
    services: [
      "Deal mobilisation in a defined number of working days",
      "Integrated plan and critical path on a single baseline",
      "Programme reporting, RAID and decision log",
      "Archetype and complexity assessment",
      "Template and artefact library with worked examples",
      "Partner accelerator sourcing and onboarding",
    ],
    decisionRights: [
      "Sets the delivery method, plan baseline and reporting cadence",
      "Confirms the deal archetype and mobilisation shape",
      "Owns the go/no-go recommendation to the steering committee",
      "Can escalate directly to the executive sponsor",
      "Cannot change deal scope, price or commercial terms",
    ],
    governance: [
      "Reports into the transaction director and the deal steering committee",
      "Directs functional and regional spoke leads on delivery matters",
      "Interfaces with Corporate Development pre-signing and with Internal Audit throughout",
    ],
    capabilities: [
      "M&A programme leadership and PMO discipline",
      "Integration and separation planning",
      "Regulatory and cutover readiness management",
      "Data and reporting capability",
    ],
    inputs: [
      "Deal thesis, structure and indicative timetable from Corporate Development",
      "Due diligence findings and conditions precedent",
      "Functional and regional capacity positions",
    ],
    outputs: [
      "Mobilisation pack and integrated plan",
      "Governance calendar and decision log",
      "Readiness and go/no-go packs",
      "Post-deal lessons learnt and method updates",
    ],
  },
  {
    id: "spokes",
    name: "Functional and regional spokes",
    strapline: "Where the work is delivered",
    summary:
      "South African functional workstreams paired with in-country regional workstreams, mobilised according to the deal archetype.",
    purpose:
      "Deliver the functional and country-level change required to complete the transaction, using people who already run the business rather than a parallel organisation.",
    responsibilities: [
      "Own functional delivery to the agreed milestone dates",
      "Provide effort estimates, resource names and dependencies at mobilisation",
      "Raise risks, issues and decisions into the transaction working group",
      "Confirm functional readiness ahead of dress rehearsals and cutover",
      "Own local regulatory and market obligations in each in-country spoke",
    ],
    services: [
      "Functional impact assessment and target design",
      "Delivery of functional change against the integrated plan",
      "Testing, readiness evidence and sign-off",
      "In-country execution and local regulator engagement",
    ],
    decisionRights: [
      "Approve functional design and functional readiness within policy",
      "Nominate and release delivery resources within their function",
      "Cannot move an agreed milestone without working-group approval",
      "Cannot accept a local regulatory obligation outside mandate",
    ],
    governance: [
      "Spoke leads sit on the transaction working group chaired by the Hub",
      "Regional spoke leads report functionally to their SA counterpart and locally to the country executive",
      "Escalation runs spoke lead, Hub, transaction director, steering committee",
    ],
    capabilities: [
      "Functional subject-matter depth with delivery experience",
      "Local regulatory and market knowledge in each geography",
      "Ability to plan, estimate and hold a milestone date",
    ],
    inputs: [
      "Archetype, perimeter and integrated plan from the Hub",
      "Diligence findings relevant to the function",
      "Data and system baselines",
    ],
    outputs: [
      "Functional plans, designs and readiness evidence",
      "Milestone and dependency status",
      "Signed functional approvals at go/no-go",
    ],
  },
  {
    id: "partners",
    name: "Partner accelerator network",
    strapline: "Pre-agreed external capacity and advice",
    summary:
      "Pre-qualified external providers that can be mobilised quickly where Absa lacks specialist advice or short-term delivery capacity.",
    purpose:
      "Remove the delay and cost of sourcing external help mid-deal by pre-agreeing categories, providers and mobilisation routes before a transaction starts.",
    responsibilities: [
      "Maintain pre-qualified provider categories and commercial arrangements",
      "Define trigger points where external support is expected",
      "Onboard, direct and exit partners against a defined scope and outcome",
      "Ensure knowledge transfers back into Absa before partners leave",
    ],
    services: [
      "Specialist advice on regulatory, tax, legal and technical questions",
      "Short-term delivery capacity for peak load",
      "Independent assurance on migration and readiness",
    ],
    decisionRights: [
      "The Hub recommends the need; the transaction director approves the spend",
      "Procurement approves the commercial route",
      "Partners hold no Absa decision rights and cannot sign off readiness",
    ],
    governance: [
      "Requested through the Hub, approved by the transaction director, contracted by Procurement",
      "Partners report to the accountable Absa spoke lead, never directly to steering",
    ],
    capabilities: [
      "Category management and rapid onboarding",
      "Clear scoping and outcome definition",
      "Knowledge-transfer discipline",
    ],
    inputs: [
      "Capacity gaps identified during mobilisation",
      "Complexity assessment and geography footprint",
      "Approved transaction budget",
    ],
    outputs: [
      "Mobilised partner teams against defined scope",
      "Specialist opinions and assurance reports",
      "Capability retained in Absa at exit",
    ],
  },
];

export const getComponent = (id: string) => COMPONENTS.find((c) => c.id === id);

/* ----------------------------- Governance ------------------------------- */

export interface GovernanceRole {
  id: string;
  title: string;
  tier: "Sponsorship" | "Transaction leadership" | "Delivery leadership" | "Delivery";
  /** "Role" column */
  oneLiner: string;
  /** "Responsibilities" column */
  responsibilities: string;
  /** "Mandate" column */
  mandate: string;
  /** "Pre-requisites" column */
  prerequisites: string[];
  /** "Boundaries" column */
  boundaries: string[];
}

export const GOVERNANCE_ROLES: GovernanceRole[] = [
  {
    id: "executive-sponsor",
    title: "Executive Sponsor (Accountable Exec, AE)",
    tier: "Sponsorship",
    oneLiner:
      "Provide overall strategic direction and drive decision making at the highest levels",
    responsibilities:
      "Ultimately responsible for the strategic and commercial success of the transaction",
    mandate:
      "Makes Absa-wide, transaction-level decisions which may materially impact the shape or success of the transaction",
    prerequisites: [
      "Must be empowered to convene top decision makers at short notice",
      "Must be empowered to make decisions which impact the strategic direction of the transaction as a whole",
    ],
    boundaries: [],
  },
  {
    id: "transaction-director",
    title: "Transaction Director (TD)",
    tier: "Transaction leadership",
    oneLiner:
      "Senior leader accountable for the successful execution of the transaction. Translates the strategic intent and contractual requirements into an executable programme, establishes the organisation and governance to deliver it, and drives towards successful Legal Day 1",
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
    id: "programme-manager",
    title: "Programme Manager / Director",
    tier: "Delivery leadership",
    oneLiner:
      "Drives the day-to-day management and control of the M&A programme. Acts as the central point of coordination across the transaction, ensuring that plans, dependencies, risks, decisions and readiness are managed consistently across the organisation.",
    responsibilities:
      "Establishes and operates the programme management framework, owns and maintains the integrated programme plan, drives cross-workstream coordination and dependency management, runs governance, reporting and decision support, leads the PMO and maintain delivery discipline",
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
    id: "pmo-support",
    title: "PMO Support",
    tier: "Delivery leadership",
    oneLiner:
      "Provides the programme management coordination, administration and control required to support delivery of an M&A deal",
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
    id: "workstream-exec",
    title: "Workstream Exec",
    tier: "Delivery",
    oneLiner:
      "Owns the success of the workstream outcomes and is ultimately accountable for their execution",
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
    id: "workstream-lead",
    title: "Workstream Lead (WSL)",
    tier: "Delivery",
    oneLiner:
      "Defines and manages the backlog of work within their workstream, ensuring alignment with deal objectives",
    responsibilities:
      "Own workstream scope, detailed plan, outcomes and deliverables. Develop and maintain the detailed workstream plan, mobilise and coordinate functional resources and SMEs, manage workstream risks, issues, assumptions and dependencies",
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
    id: "workstream-project-manager",
    title: "Workstream Project Manager",
    tier: "Delivery",
    oneLiner:
      "Supports the Workstream Lead by providing project management discipline, including tracking progress, managing timelines, reporting risks and issues, and coordinating across teams",
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
    id: "workstream-team-member",
    title: "Workstream Team Member",
    tier: "Delivery",
    oneLiner:
      "Completes execution tasks within a workstream, and flags RAID items for escalation",
    responsibilities:
      "Leverage function-specific SME knowledge to execute an plan and milestones, input into requirements and planning, escalate into workstream governance where needed",
    mandate: "Minimal decision making mandate",
    prerequisites: ["none"],
    boundaries: ["Responsible for actual execution, not decision making"],
  },
];

export const getRole = (id: string) => GOVERNANCE_ROLES.find((r) => r.id === id);

export interface AccountabilityRow {
  accountability: string;
  owner: string;
  contributors: string;
}

export const ACCOUNTABILITY_MATRIX: AccountabilityRow[] = [
  {
    accountability: "Owns the business case",
    owner: "Executive sponsor",
    contributors: "Corporate Development, Finance",
  },
  {
    accountability: "Owns the transaction budget",
    owner: "Transaction director",
    contributors: "Finance, PMO",
  },
  {
    accountability: "Makes strategic decisions",
    owner: "Executive sponsor",
    contributors: "Steering committee",
  },
  {
    accountability: "Makes execution decisions",
    owner: "Transaction director",
    contributors: "Programme director, spoke leads",
  },
  {
    accountability: "Manages detailed delivery",
    owner: "Programme director / manager",
    contributors: "PMO, spoke leads",
  },
  {
    accountability: "Escalates issues",
    owner: "Programme director, then transaction director",
    contributors: "Spoke and regional leads raise",
  },
  {
    accountability: "Approves functional outcomes",
    owner: "Functional workstream leads",
    contributors: "Regional representatives, Risk, Compliance",
  },
];

/* ------------------------------ Resourcing ------------------------------ */

export interface ResourcingItem {
  role: string;
  note: string;
}

export const RESOURCING = {
  minimum: [
    { role: "Executive sponsor", note: "Part-time, every deal" },
    { role: "Transaction director", note: "Every deal, dedicated on larger transactions" },
    { role: "Programme director / manager", note: "Dedicated from mobilisation to hypercare exit" },
    { role: "Core PMO analyst", note: "Plan, RAID and reporting" },
    { role: "One workstream lead per active spoke", note: "Archetype determines which spokes activate" },
    { role: "Regional lead per in-scope country", note: "One per geography in the perimeter" },
  ] as ResourcingItem[],
  triggered: [
    {
      role: "Additional PM support",
      note: "Added across the more complex or technical workstreams, for example a multi-geography perimeter or more than eight active spokes",
    },
    { role: "Dedicated planning lead", note: "High complexity rating or fixed regulatory cutover date" },
    { role: "Dedicated reporting and data analyst", note: "Data migration in scope" },
    { role: "Cutover manager", note: "Client onboarding, migration or LD1 cutover in scope" },
    { role: "Change and comms manager", note: "People transfer in scope" },
    { role: "Migration assurance lead", note: "Independent assurance required by Risk or the regulator" },
  ] as ResourcingItem[],
  shared: [
    { role: "Executive sponsor", note: "Can sponsor several deals" },
    { role: "Corporate Development", note: "Pre-deal, across the pipeline" },
    { role: "Internal Audit", note: "Assurance across the portfolio" },
    { role: "Specialist functions such as Tax and Treasury", note: "Draw-down basis across deals" },
  ] as ResourcingItem[],
  dedicated: [
    { role: "Programme director / manager", note: "One deal at a time" },
    { role: "Cutover manager", note: "One deal, from readiness through hypercare" },
    { role: "Core PMO", note: "One deal while the deal is live" },
    { role: "Regional lead in an in-scope country", note: "One deal during execution peak" },
  ] as ResourcingItem[],
};

/* --------------------------- Functional spokes -------------------------- */

export interface SpokeMilestone {
  name: string;
  activities: string[];
}

export interface Spoke {
  id: string;
  name: string;
  conditional?: boolean;
  purpose: string;
  milestones: SpokeMilestone[];
  dependencies: string[];
  delayImpact: string[];
  localKnowledge: string;
  externalSupport: string;
}

export const SPOKES: Spoke[] = [
  {
    id: "change-management",
    name: "Change Management",
    conditional: true,
    purpose: "Land the change with colleagues and leaders on both sides of the deal.",
    milestones: [
      {
        name: "Change impact baseline agreed",
        activities: [
          "Map impacted populations by function and country",
          "Assess change load against business-as-usual calendars",
          "Agree leader roles and cascade approach",
          "Define adoption measures and readiness criteria",
          "Confirm union and works-council touchpoints where relevant",
        ],
      },
      {
        name: "Business ready to operate the new model",
        activities: [
          "Deliver leader and colleague readiness sessions",
          "Run role and process walkthroughs",
          "Confirm day-one support and floorwalker cover",
          "Capture readiness evidence for go/no-go",
          "Track adoption through hypercare and close gaps",
        ],
      },
    ],
    dependencies: ["HR for people perimeter", "Ops for process design", "Comms for cascade timing"],
    delayImpact: [
      "Colleagues unprepared at cutover, driving avoidable operational incidents",
      "Adoption slips and benefit realisation moves out",
    ],
    localKnowledge: "Country labour culture, language needs and local leadership structures.",
    externalSupport: "Capacity for large multi-country cascades; occasional specialist advice.",
  },
  {
    id: "comms",
    name: "Communications / Marketing",
    purpose: "Control internal and external messaging across the deal timeline.",
    milestones: [
      {
        name: "Announcement approach approved",
        activities: [
          "Agree stakeholder map and sequencing across markets",
          "Draft announcement and holding statements",
          "Align regulator and market disclosure timing with Legal",
          "Prepare colleague and client Q&A",
          "Agree brand treatment for the perimeter",
        ],
      },
      {
        name: "Client and market communications delivered",
        activities: [
          "Produce client notification packs per country",
          "Confirm regulatory notice periods are met",
          "Brief frontline and contact-centre teams",
          "Publish brand and signage changes at cutover",
          "Monitor sentiment and respond during hypercare",
        ],
      },
    ],
    dependencies: ["Legal for disclosure", "Ops for client contact data", "Change for cascade"],
    delayImpact: [
      "Uncontrolled leaks and speculation",
      "Missed statutory client notice periods, delaying cutover",
    ],
    localKnowledge: "Local media, language, and country notification conventions.",
    externalSupport: "Specialist advice on market announcements; capacity for translation and print.",
  },
  {
    id: "finance-tax",
    name: "Finance & Tax",
    purpose: "Deliver purchase accounting, funding, tax structuring and reporting readiness.",
    milestones: [
      {
        name: "Financial and tax structure confirmed",
        activities: [
          "Confirm acquiring or divesting entity and funding route",
          "Agree completion accounts and adjustment mechanics",
          "Assess tax consequences per jurisdiction",
          "Define chart-of-accounts and reporting mapping",
          "Baseline transaction and integration cost",
        ],
      },
      {
        name: "Day-one financial reporting ready",
        activities: [
          "Complete opening balance sheet and valuation inputs",
          "Set up ledgers, cost centres and consolidation",
          "Agree intercompany and TSA charging mechanics",
          "Test month-end close on the new perimeter",
          "Confirm regulatory and statutory reporting readiness",
        ],
      },
    ],
    dependencies: ["Legal on structure", "Data migration for balances", "Product for pricing"],
    delayImpact: [
      "Cannot close the first month-end cleanly",
      "Tax exposure or restatement risk crystallises",
    ],
    localKnowledge: "Country tax regimes, exchange control and statutory reporting rules.",
    externalSupport: "Specialist tax and valuation advice; capacity for multi-jurisdiction filings.",
  },
  {
    id: "ops-servicing",
    name: "Operations & Servicing",
    purpose: "Ensure clients continue to be serviced through and after transfer.",
    milestones: [
      {
        name: "Target operating process agreed",
        activities: [
          "Map current servicing journeys in the perimeter",
          "Design day-one process with known workarounds",
          "Size volumes, queues and staffing needs",
          "Agree TSA-supported activities and exit path",
          "Define incident and escalation routes for day one",
        ],
      },
      {
        name: "Operational readiness confirmed",
        activities: [
          "Train servicing and back-office teams",
          "Complete operational rehearsal of peak scenarios",
          "Confirm reconciliation and control checkpoints",
          "Stand up hypercare command centre",
          "Close workarounds on an agreed timetable",
        ],
      },
    ],
    dependencies: ["Technology for tooling", "Data migration for records", "Change for training"],
    delayImpact: [
      "Client service failures at cutover and complaint escalation",
      "Manual workarounds become permanent cost",
    ],
    localKnowledge: "Country servicing models, branch footprint and local operating hours.",
    externalSupport: "Delivery capacity for process mapping and temporary servicing uplift.",
  },
  {
    id: "product",
    name: "Product & Business",
    purpose: "Confirm which products transfer, how they are mapped and how clients are treated.",
    milestones: [
      {
        name: "Product perimeter and mapping agreed",
        activities: [
          "Confirm in-scope products and portfolios",
          "Map source products to Absa equivalents",
          "Identify products with no equivalent and agree treatment",
          "Assess pricing, fees and rate implications",
          "Confirm terms-and-conditions changes needed",
        ],
      },
      {
        name: "Products live on the target estate",
        activities: [
          "Complete product configuration and test cases",
          "Confirm client outcome and fair-value reviews",
          "Approve client communication of product changes",
          "Support migration validation of product data",
          "Monitor product behaviour during hypercare",
        ],
      },
    ],
    dependencies: ["Data migration for product records", "Legal for terms", "Risk for approvals"],
    delayImpact: [
      "Migration cannot be validated, pushing cutover",
      "Client detriment and remediation cost",
    ],
    localKnowledge: "Local product regulation, pricing norms and consumer-protection rules.",
    externalSupport: "Specialist advice on product regulation in unfamiliar markets.",
  },
  {
    id: "legal",
    name: "Legal & CorpDev",
    purpose: "Content placeholder — approved source content has not been supplied yet.",
    milestones: [
      {
        name: "Content placeholder",
        activities: ["Content placeholder"],
      },
    ],
    dependencies: ["Content placeholder"],
    delayImpact: ["Content placeholder"],
    localKnowledge: "Content placeholder",
    externalSupport: "Content placeholder",
  },
  {
    id: "compliance",
    name: "Compliance & Regulatory Approvals",
    purpose: "Deliver transaction documentation, conditions precedent and compliance readiness.",
    milestones: [
      {
        name: "Signing pack complete",
        activities: [
          "Negotiate the SPA and related agreements",
          "Draft TSA and transitional arrangements",
          "Log conditions precedent with owners and dates",
          "Confirm regulatory filings needed per jurisdiction",
          "Complete Section 54 and equivalent approvals path",
        ],
      },
      {
        name: "Conditions satisfied and completion effected",
        activities: [
          "Track conditions precedent to closure",
          "Complete regulatory approvals and notifications",
          "Prepare completion mechanics and signing logistics",
          "Confirm compliance obligations transfer correctly",
          "Hand over post-completion obligations register",
        ],
      },
    ],
    dependencies: ["Finance on structure", "Regulatory bodies", "All spokes for CP evidence"],
    delayImpact: [
      "Completion date slips with contractual and cost consequences",
      "Regulatory breach exposure",
    ],
    localKnowledge: "Local company, banking and employment law; regulator relationships.",
    externalSupport: "Specialist local counsel in every in-scope jurisdiction.",
  },
  {
    id: "risk",
    name: "Risk",
    purpose: "Assess and control risk taken on or released through the transaction.",
    milestones: [
      {
        name: "Risk position understood and approved",
        activities: [
          "Assess credit quality of the transferring book",
          "Confirm risk appetite and limit implications",
          "Agree rating, scoring and provisioning approach",
          "Identify control gaps in the perimeter",
          "Secure risk committee approvals",
        ],
      },
      {
        name: "Controls operating on the new perimeter",
        activities: [
          "Embed limits, mandates and delegated authorities",
          "Confirm risk reporting from day one",
          "Test control operation in dress rehearsal",
          "Approve residual risk and mitigations at go/no-go",
          "Review risk performance during hypercare",
        ],
      },
    ],
    dependencies: ["Finance for provisioning", "Data migration for exposures", "LD1 readiness"],
    delayImpact: [
      "Cannot obtain approval to complete",
      "Unmeasured exposure taken onto the balance sheet",
    ],
    localKnowledge: "Local credit conditions, collateral law and regulatory capital treatment.",
    externalSupport: "Specialist portfolio review and independent credit assessment.",
  },
  {
    id: "ld1-readiness",
    name: "Client Readiness",
    conditional: true,
    purpose: "Prove the business is ready to operate from legal day one.",
    milestones: [
      {
        name: "Readiness criteria agreed",
        activities: [
          "Define day-one readiness criteria per spoke",
          "Build the readiness tracker and evidence standard",
          "Agree dress-rehearsal scope and scenarios",
          "Define go/no-go decision framework and thresholds",
          "Confirm contingency and rollback positions",
        ],
      },
      {
        name: "Go decision evidenced",
        activities: [
          "Run dress rehearsals and log defects",
          "Close critical defects and re-test",
          "Collect functional and regional sign-offs",
          "Present go/no-go pack to steering",
          "Transition into cutover and hypercare governance",
        ],
      },
    ],
    dependencies: ["Every active spoke", "Technology and data migration", "Legal for completion"],
    delayImpact: [
      "Go/no-go taken on opinion rather than evidence",
      "Cutover deferred at short notice with cost and reputational impact",
    ],
    localKnowledge: "Country-specific day-one obligations and local operating constraints.",
    externalSupport: "Independent readiness assurance on complex or regulated cutovers.",
  },
  {
    id: "data-migration",
    name: "Data Migration",
    purpose: "Move client, product and financial data completely and accurately.",
    milestones: [
      {
        name: "Migration approach agreed",
        activities: [
          "Profile source data and assess quality",
          "Agree mapping and transformation rules",
          "Define reconciliation and completeness controls",
          "Plan migration rehearsals and fallback",
          "Agree data privacy and cross-border transfer basis",
        ],
      },
      {
        name: "Data migrated and reconciled",
        activities: [
          "Execute mock migrations and measure defects",
          "Remediate data quality at source",
          "Run reconciliation sign-off with Finance and Product",
          "Execute cutover migration to plan",
          "Support post-migration validation in hypercare",
        ],
      },
    ],
    dependencies: ["Technology environments", "Product mapping", "Finance reconciliation"],
    delayImpact: [
      "Cutover cannot proceed without reconciled data",
      "Client records inaccurate, creating regulatory exposure",
    ],
    localKnowledge: "Local data-residency and privacy law in each geography.",
    externalSupport: "Delivery capacity for migration engineering and independent assurance.",
  },
  {
    id: "migration-assurance",
    name: "Independent Assurance / External Audit",
    conditional: true,
    purpose: "Provide independent confidence that migration is complete and accurate.",
    milestones: [
      {
        name: "Assurance approach agreed",
        activities: [
          "Define assurance scope and independence model",
          "Agree evidence and sampling standards",
          "Review migration controls design",
          "Align with Internal Audit and regulator expectations",
          "Set reporting route to steering",
        ],
      },
      {
        name: "Independent opinion issued",
        activities: [
          "Test controls across rehearsals",
          "Sample reconciliations and exception handling",
          "Report findings and required remediation",
          "Confirm closure of critical findings",
          "Issue opinion into the go/no-go pack",
        ],
      },
    ],
    dependencies: ["Data migration", "LD1 readiness", "Internal Audit"],
    delayImpact: ["Go decision lacks independent support", "Regulator challenges the migration"],
    localKnowledge: "Local regulator expectations on migration evidence.",
    externalSupport: "Usually external by design to preserve independence.",
  },
  {
    id: "kyc-aml",
    name: "KYC / AML",
    conditional: true,
    purpose: "Ensure transferring clients meet Absa financial-crime standards.",
    milestones: [
      {
        name: "Remediation scope agreed",
        activities: [
          "Compare source and Absa KYC standards",
          "Size the remediation population by risk band",
          "Agree treatment for high-risk and PEP clients",
          "Confirm screening and monitoring approach",
          "Agree regulator position on transferred clients",
        ],
      },
      {
        name: "Population remediated to standard",
        activities: [
          "Run remediation waves and track completion",
          "Onboard clients to screening and monitoring",
          "Handle exits where standards cannot be met",
          "Evidence financial-crime readiness for go/no-go",
          "Complete residual remediation in hypercare",
        ],
      },
    ],
    dependencies: ["Data migration", "Ops for client contact", "Legal and Compliance"],
    delayImpact: ["Financial-crime exposure at day one", "Regulatory censure and remediation cost"],
    localKnowledge: "Country financial-crime rules and acceptable documentation.",
    externalSupport: "Delivery capacity for large remediation waves.",
  },
  {
    id: "technology",
    name: "Technology",
    conditional: true,
    purpose: "Provide the platforms, integration and environments the deal needs.",
    milestones: [
      {
        name: "Technology approach agreed",
        activities: [
          "Assess source estate and target platform fit",
          "Decide integrate, migrate or build new",
          "Plan environments, access and connectivity",
          "Confirm security, resilience and architecture approvals",
          "Baseline technology cost and lead times",
        ],
      },
      {
        name: "Platforms live and supported",
        activities: [
          "Deliver build and integration changes",
          "Support end-to-end and migration testing",
          "Complete non-functional and security testing",
          "Execute technical cutover steps",
          "Provide elevated support through hypercare",
        ],
      },
    ],
    dependencies: ["Data migration", "Product configuration", "E2E testing", "Procurement"],
    delayImpact: [
      "Long lead times push cutover by months",
      "Manual workarounds and higher run cost",
    ],
    localKnowledge: "Local connectivity, hosting and data-residency constraints.",
    externalSupport: "Delivery capacity for build and integration; vendor specialist advice.",
  },
  {
    id: "hr",
    name: "Human Capital",
    conditional: true,
    purpose: "Transfer people lawfully and retain critical capability.",
    milestones: [
      {
        name: "People perimeter and terms agreed",
        activities: [
          "Identify transferring population and critical roles",
          "Confirm the legal transfer mechanism per country",
          "Compare terms, benefits and pension arrangements",
          "Agree consultation and union approach",
          "Design retention and selection where needed",
        ],
      },
      {
        name: "People transferred and onboarded",
        activities: [
          "Complete consultation and issue documentation",
          "Load employees onto payroll and systems",
          "Confirm first payroll run correctness",
          "Deliver onboarding and access provisioning",
          "Track attrition and retention in hypercare",
        ],
      },
    ],
    dependencies: ["Legal for transfer mechanism", "Technology for access", "Change for cascade"],
    delayImpact: [
      "Statutory consultation timelines breached, delaying completion",
      "Loss of critical people and knowledge",
    ],
    localKnowledge: "Country employment law, union landscape and payroll practice.",
    externalSupport: "Specialist employment law and pensions advice per jurisdiction.",
  },
  {
    id: "e2e-testing",
    name: "E2E Testing",
    conditional: true,
    purpose: "Prove the end-to-end journeys work before clients rely on them.",
    milestones: [
      {
        name: "Test strategy approved",
        activities: [
          "Define in-scope journeys and test scope",
          "Agree entry and exit criteria and defect severity",
          "Confirm environments and test data approach",
          "Plan business testing resource from the spokes",
          "Align testing with rehearsal and cutover dates",
        ],
      },
      {
        name: "Testing complete with defects closed",
        activities: [
          "Execute functional and end-to-end cycles",
          "Run business and user acceptance testing",
          "Triage and close defects by severity",
          "Report test completion evidence",
          "Support regression during hypercare fixes",
        ],
      },
    ],
    dependencies: ["Technology environments", "Data migration", "Product configuration"],
    delayImpact: ["Untested journeys fail at day one", "Late defects force cutover deferral"],
    localKnowledge: "Local journey variations and country-specific processes.",
    externalSupport: "Delivery capacity for test execution at peak.",
  },
  {
    id: "procurement",
    name: "Procurement",
    conditional: false,
    purpose: "Contract the third parties and licences the deal depends on.",
    milestones: [
      {
        name: "Third-party requirements confirmed",
        activities: [
          "Identify contracts that transfer, novate or terminate",
          "Assess licence and vendor consent needs",
          "Plan sourcing for partner accelerator support",
          "Confirm third-party risk assessments",
          "Baseline third-party cost and lead times",
        ],
      },
      {
        name: "Contracts in place for day one",
        activities: [
          "Complete novations and consents",
          "Contract new suppliers and partners",
          "Confirm vendor onboarding and access",
          "Evidence third-party readiness for go/no-go",
          "Close transitional supply arrangements on exit",
        ],
      },
    ],
    dependencies: ["Legal for contract terms", "Technology for licences", "Risk for vendor risk"],
    delayImpact: [
      "Missing consents block completion",
      "Partners cannot mobilise when needed, so delivery stalls",
    ],
    localKnowledge: "Local supplier market and country contracting requirements.",
    externalSupport: "Occasional specialist advice on complex vendor negotiation.",
  },
  {
    id: "cres",
    name: "CRES",
    conditional: true,
    purpose: "Content placeholder — approved source content has not been supplied yet.",
    milestones: [
      {
        name: "Content placeholder",
        activities: ["Content placeholder"],
      },
    ],
    dependencies: ["Content placeholder"],
    delayImpact: ["Content placeholder"],
    localKnowledge: "Content placeholder",
    externalSupport: "Content placeholder",
  },
  {
    id: "internal-audit",
    name: "Internal Audit",
    purpose: "Content placeholder — approved source content has not been supplied yet.",
    milestones: [
      {
        name: "Content placeholder",
        activities: ["Content placeholder"],
      },
    ],
    dependencies: ["Content placeholder"],
    delayImpact: ["Content placeholder"],
    localKnowledge: "Content placeholder",
    externalSupport: "Content placeholder",
  },
];

export const getSpoke = (id: string) => SPOKES.find((s) => s.id === id);

/* -------------------------- Partner accelerators ------------------------ */

export interface PartnerCapability {
  capability: string;
  trigger: string;
  type: "Specialist advice" | "Delivery capacity" | "Advice and capacity";
  providers: string;
  mobilisation: string;
}

export const PARTNER_CAPABILITIES: PartnerCapability[] = [
  {
    capability: "Legal and regulatory",
    trigger: "Any jurisdiction where Absa has no in-country legal presence",
    type: "Specialist advice",
    providers: "Local law firms, regulatory advisers",
    mobilisation: "Legal requests, transaction director approves, panel arrangement used",
  },
  {
    capability: "Tax and structuring",
    trigger: "Cross-border perimeter or unusual deal structure",
    type: "Specialist advice",
    providers: "Big four tax practices, local tax counsel",
    mobilisation: "Finance and Tax requests through the Hub at mobilisation",
  },
  {
    capability: "Programme and PMO uplift",
    trigger: "High complexity rating or more than eight active spokes",
    type: "Delivery capacity",
    providers: "M&A advisory and transformation firms",
    mobilisation: "Hub requests against pre-agreed rate card; approved by transaction director",
  },
  {
    capability: "Data migration engineering",
    trigger: "Large or poor-quality data estate in the perimeter",
    type: "Advice and capacity",
    providers: "Systems integrators, data specialists",
    mobilisation: "Technology and Data spokes scope; Procurement contracts",
  },
  {
    capability: "Migration assurance",
    trigger: "Risk or regulator requires an independent opinion",
    type: "Specialist advice",
    providers: "Audit and assurance firms independent of the delivery partner",
    mobilisation: "Requested at mobilisation to protect independence",
  },
  {
    capability: "KYC remediation capacity",
    trigger: "Transferring client base needs remediation to Absa standard",
    type: "Delivery capacity",
    providers: "Financial-crime operations providers, managed-service firms",
    mobilisation: "Compliance sizes the wave; Procurement mobilises against volume-based terms",
  },
  {
    capability: "Technology build and integration",
    trigger: "Net new build or heavy integration in scope",
    type: "Delivery capacity",
    providers: "Systems integrators, platform vendors",
    mobilisation: "Technology scopes outcomes; contracted with milestone-based delivery",
  },
  {
    capability: "Change, comms and training",
    trigger: "Multi-country people transfer or large colleague population",
    type: "Delivery capacity",
    providers: "Change specialists, translation and training providers",
    mobilisation: "Change spoke requests; mobilised for a defined delivery window",
  },
  {
    capability: "Valuation and financial diligence",
    trigger: "Pre-signing diligence or completion accounts complexity",
    type: "Specialist advice",
    providers: "Transaction services practices",
    mobilisation: "Corporate Development leads pre-signing; Hub inherits at mobilisation",
  },
];

/* ----------------------------- Deal journey ----------------------------- */

export interface JourneyStage {
  window: string;
  name: string;
  hubRole: string;
  artefacts: string[];
  activated: string[];
}

export const DEAL_JOURNEY: JourneyStage[] = [
  {
    window: "T-1 month",
    name: "Pre-signing readiness",
    hubRole:
      "Hub joins alongside Corporate Development, confirms the archetype, sizes delivery and pre-books scarce resource.",
    artefacts: ["Archetype classification", "Indicative delivery shape", "Draft resourcing plan"],
    activated: ["Executive sponsor", "Transaction director", "Hub core team", "Corp Dev", "Legal"],
  },
  {
    window: "Signing",
    name: "Signature and announcement",
    hubRole:
      "Hub locks the mobilisation date, supports announcement sequencing and stands up governance.",
    artefacts: ["SPA and TSA heads of terms", "Conditions precedent log", "Announcement pack"],
    activated: ["Comms", "Finance & Tax", "Risk", "Regional leads for in-scope countries"],
  },
  {
    window: "Weeks 1 to 4",
    name: "Mobilisation",
    hubRole:
      "Hub mobilises spokes, builds the integrated plan, confirms named resources and opens the RAID and decision logs.",
    artefacts: ["Mobilisation pack", "Integrated plan baseline", "Governance calendar", "RAID log"],
    activated: ["Programme director", "PMO", "All archetype-relevant functional spokes"],
  },
  {
    window: "Months 2 to 6",
    name: "Programme execution",
    hubRole:
      "Hub runs delivery control: milestone tracking, dependency management, escalation and steering reporting.",
    artefacts: ["Milestone tracker", "Dependency map", "Steering pack", "Change control log"],
    activated: ["All active spokes", "Partner accelerators where triggered", "Internal Audit"],
  },
  {
    window: "Pre-cutover",
    name: "Testing, readiness and rehearsals",
    hubRole:
      "Hub owns the readiness framework, runs dress rehearsals and assembles the go/no-go evidence pack.",
    artefacts: ["Readiness tracker", "Dress rehearsal reports", "Defect log", "Go/no-go pack"],
    activated: ["LD1 readiness", "E2E testing", "Data migration", "Migration assurance"],
  },
  {
    window: "Cutover",
    name: "Legal day one and cutover",
    hubRole:
      "Hub runs the cutover command centre, tracks the runbook minute by minute and owns rollback triggers.",
    artefacts: ["Cutover runbook", "Command centre log", "Rollback criteria"],
    activated: ["Cutover manager", "All spokes on standby", "Country representatives"],
  },
  {
    window: "Weeks 1 to 8 after cutover",
    name: "Hypercare and transition to run",
    hubRole:
      "Hub runs hypercare governance, closes workarounds, exits partners and captures lessons learnt.",
    artefacts: ["Hypercare dashboard", "Workaround closure plan", "Lessons learnt", "Handover to run"],
    activated: ["Ops & Servicing", "Technology", "PMO", "Business owners taking handover"],
  },
];
