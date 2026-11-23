export interface MaturityDimension {
  dimension: string;
  low: string;
  medium: string;
  high: string;
}

export const MATURITY_DIMENSIONS: MaturityDimension[] = [
  { dimension: "Functional expertise", low: "Limited transaction or specialist capability; local team relies on SA SMEs.", medium: "Competent BAU specialists with targeted transaction support.", high: "Experienced functional leads able to lead local transaction delivery." },
  { dimension: "Previous M&A experience", low: "Limited or no comparable execution experience.", medium: "Some change or transaction experience.", high: "Repeated M&A, migration, integration or separation experience." },
  { dimension: "Local decision authority", low: "Low delegated authority and frequent SA approval needs.", medium: "Delegated authority for routine operational decisions.", high: "Authority for local functional decisions within group policy." },
  { dimension: "Capacity", low: "Thin capacity with BAU constraints.", medium: "Named leads with some ring-fenced capacity.", high: "Dedicated local leads and support capacity for transaction delivery." },
  { dimension: "Process and governance quality", low: "Processes poorly documented or inconsistently evidenced.", medium: "Processes documented with some evidence gaps.", high: "Stable controls, clear governance and transaction-ready evidence." },
  { dimension: "Regulatory capability", low: "Limited local regulatory engagement capability.", medium: "Understands local requirements and needs central support for complex positions.", high: "Can lead local regulatory inputs and defend local readiness evidence." },
  { dimension: "Data and MI quality", low: "Data quality issues and manual MI.", medium: "Usable MI with defined remediation needs.", high: "Reliable MI, clear ownership and strong reconciliation discipline." },
  { dimension: "Artefact production", low: "Requires templates and hands-on drafting support.", medium: "Can produce drafts for central challenge.", high: "Can independently produce local plans, evidence and decision papers." },
];

export interface RegionalResponsibility {
  maturity: string;
  centralHub: string;
  functionalSpoke: string;
  regionalSpoke: string;
}

export const REGIONAL_RESPONSIBILITIES: RegionalResponsibility[] = [
  { maturity: "Country baseline", centralHub: "Leads programme control, dependency management and local escalation. Provides more hands-on coordination.", functionalSpoke: "Leads functional design, planning, evidence standards and key execution tasks.", regionalSpoke: "Provides local data, stakeholder access, market insight and execution support." },
  { maturity: "More mature", centralHub: "Maintains central governance, plan control, readiness integration and escalation.", functionalSpoke: "Sets standards, reviews local outputs and co-delivers complex tasks.", regionalSpoke: "Leads defined local activities and produces evidence for central review." },
  { maturity: "Most mature", centralHub: "Maintains transaction-wide control, reserved authority and executive reporting.", functionalSpoke: "Provides standards, challenge, specialist input and escalation support.", regionalSpoke: "Leads local execution, local decision papers and readiness evidence within delegated authority." },
];

export interface RegionalMandate {
  category: string;
  low: string;
  medium: string;
  high: string;
  reserved: string;
}

export const REGIONAL_MANDATE: RegionalMandate[] = [
  { category: "Local operational decisions", low: "SA Functional Spoke directs; Regional Spoke recommends.", medium: "Joint decision with SA challenge.", high: "Regional Spoke decides within agreed standards.", reserved: "Material customer, risk or regulatory impacts escalate." },
  { category: "Functional decisions", low: "SA Functional Spoke decides with local consultation.", medium: "SA Functional Spoke remains accountable; Regional Spoke may recommend.", high: "Regional Spoke may decide locally delegated matters.", reserved: "Group policy, product, risk, legal and finance standards remain reserved." },
  { category: "Transaction-wide decisions", low: "Central Hub and governance decide.", medium: "Central Hub and governance decide.", high: "Central Hub and governance decide.", reserved: "Scope, budget, timing, LD1, TSA, go/no-go and executive reporting remain central." },
  { category: "Risk / control decisions", low: "Control function decides with local input.", medium: "Control function decides; local team evidences controls.", high: "Local control owners can approve delegated items.", reserved: "Material risk acceptance, legal advice, compliance interpretation and accounting policy remain reserved." },
];

export interface RegionalRaci {
  activity: string;
  low: string;
  medium: string;
  high: string;
}

export const REGIONAL_RACI: RegionalRaci[] = [
  { activity: "Local impact assessment", low: "Function Authority A/R; Regional Spoke R for facts and access; Central Hub I.", medium: "Function Authority A; Regional Spoke R for assessment and evidence; Central Hub I.", high: "Regional Spoke A/R within delegated authority; Function Authority C/challenge; Central Hub I." },
  { activity: "Local workstream plan", low: "Function Authority A/R; Regional Spoke C/R for local inputs.", medium: "Function Authority A for standards; Regional Spoke R for local plan; Central Hub I.", high: "Regional Spoke A/R for local plan; Function Authority C; Central Hub I." },
  { activity: "Local execution and remediation", low: "Function Authority A/R where region lacks capability; Regional Spoke R for local tasks.", medium: "Regional Spoke R for agreed execution; Function Authority A/C for standards and challenge.", high: "Regional Spoke A/R within delegated authority; Function Authority C/I except reserved approvals." },
  { activity: "Local readiness evidence", low: "Function Authority A/R for evidence standard and pack quality; Regional Spoke R for source evidence.", medium: "Function Authority A for evidence standard; Regional Spoke R for evidence pack and remediation.", high: "Regional Spoke A/R for local evidence and sign-off; Function Authority C/challenge." },
  { activity: "Budget, resource and capacity inputs", low: "Function Authority A/R for estimates; Regional Spoke R for local facts; Central Hub A/R for integrated budget.", medium: "Regional Spoke R for local estimates; Function Authority A/C; Central Hub A/R for integrated budget.", high: "Regional Spoke A/R for local estimates and capacity plan; Function Authority C; Central Hub A/R for integrated budget." },
  { activity: "Status reporting and issue escalation", low: "Function Authority A/R for local status narrative; Regional Spoke R for facts; Central Hub A/R for integrated reporting.", medium: "Regional Spoke R for local status and issues; Function Authority A/C; Central Hub A/R for integrated reporting.", high: "Regional Spoke A/R for local status and issue escalation; Function Authority C/I; Central Hub A/R for integrated reporting." },
  { activity: "Control-function approval", low: "Relevant control function A; Function Authority R; Regional Spoke C/R for evidence.", medium: "Relevant control function A; Regional Spoke R for local evidence; Function Authority C/R.", high: "Relevant control function A for reserved matters; Regional Spoke R for delegated evidence and local controls." },
  { activity: "Go/no-go recommendation", low: "Central Hub A/R for integrated pack; Function Authority R; Regional Spoke C/R for source evidence.", medium: "Central Hub A/R; Function Authority R for functional recommendation; Regional Spoke R for local sign-off.", high: "Central Hub A/R; Regional Spoke R for local sign-off; Function Authority C/challenge." },
];

export interface RegionalRoleProfile {
  maturity: string;
  profile: string;
  supportModel: string;
}

export const REGIONAL_ROLE_PROFILES: RegionalRoleProfile[] = [
  { maturity: "Country baseline", profile: "Local coordinator, local SME and business contact who can provide facts, access and local logistics.", supportModel: "Central Centre of Excellence provides hands-on leadership, templates, drafting support and detailed review." },
  { maturity: "More mature", profile: "Local workstream lead with BAU functional expertise and enough authority to coordinate local delivery.", supportModel: "Joint execution. Central Centre of Excellence provides standards, specialist challenge and review of key outputs." },
  { maturity: "Most mature", profile: "Experienced local functional lead able to own local plans, evidence, decisions and stakeholder engagement.", supportModel: "Local lead executes within delegated authority. Central Centre of Excellence provides challenge, specialist escalation and group alignment." },
];

export interface RegionalKeyActivity {
  activityType: string;
  centrallyLed: string;
  jointlyDelivered: string;
  locallyLed: string;
}

export const REGIONAL_KEY_ACTIVITIES: RegionalKeyActivity[] = [
  { activityType: "Transaction set-up", centrallyLed: "Archetype classification, programme standards, governance design and integrated plan baseline.", jointlyDelivered: "Workstream charters and readiness criteria.", locallyLed: "Local mobilisation, local stakeholder mapping and local plan detail." },
  { activityType: "Functional design", centrallyLed: "Group policy, architecture, control standards and transaction-wide decisions.", jointlyDelivered: "Process, product, technology, data and control design where local variants matter.", locallyLed: "Local process details, local customer journeys and country-specific execution methods." },
  { activityType: "Execution", centrallyLed: "Critical-path coordination, cross-workstream dependencies and executive escalation.", jointlyDelivered: "Support provided by central teams where in-country do not have the maturity to deliver", locallyLed: "As much execution as is feasible for the in-country teams" },
  { activityType: "Readiness and cutover", centrallyLed: "Go/no-go pack, cutover command centre and transaction-level readiness decision.", jointlyDelivered: "Support provided by central teams where in-country do not have the maturity to deliver", locallyLed: "As much execution as is feasible for the in-country teams" },
  { activityType: "Hypercare", centrallyLed: "Transaction-wide stability dashboard and BAU handover governance.", jointlyDelivered: "Support provided by central teams where in-country do not have the maturity to deliver", locallyLed: "As much execution as is feasible for the in-country teams" },
];

export interface CentralisationPrinciples {
  remainCentralIntro: string;
  remainCentral: string[];
  delegatedLocallyIntro: string;
  delegatedLocally: string[];
}

export const CENTRALISATION_PRINCIPLES: CentralisationPrinciples = {
  remainCentralIntro: "What should remain central regardless of country maturity:",
  remainCentral: [
    "Group-wide transaction governance, methodology, programme standards, issue escalation and executive reporting.",
    "Material risk acceptance, group policy interpretation, group technology architecture and enterprise-level regulatory decisions.",
    "Cross-border dependencies, transaction-wide readiness, cutover command centre, independent assurance and lessons learned.",
    "SPA execution implications, TSA governance, completion-critical dependencies and cross-workstream dependency management.",
  ],
  delegatedLocallyIntro: "What can increasingly be delegated locally as maturity increases:",
  delegatedLocally: [
    "Local process design, local stakeholder engagement, country-specific regulatory inputs and local execution planning.",
    "Local readiness evidence, local testing participation, client or employee engagement execution and country issue resolution.",
    "Routine operational decisions within delegated authority and within group standards.",
  ],
};

export const MINIMUM_CAPABILITY_INTRO: string =
  "The following defines the minimum country capability required to support transaction delivery. The level of local ownership should increase with maturity, capability, capacity and delegated authority, while reserved matters remain with the relevant Function Authority or central governance.";

export const CROSS_CUTTING_MINIMUM: string[] = [
  "A named accountable executive and named lead for each activated workstream.",
  "Sufficient protected capacity, with BAU backfill where transaction activity is material.",
  "Basic project-management capability: planning, dependencies, status reporting, issue escalation and evidence management.",
  "Clear delegated authority and an understood escalation route to the central Function Authority.",
  "Local legal, regulatory, cultural and market knowledge.",
  "Documented decisions, handovers, readiness evidence and residual-risk ownership",
];

export interface WorkstreamMinimum {
  name: string;
  items: string[];
}

export const WORKSTREAM_MINIMUMS: Record<string, WorkstreamMinimum> = {
  comms: {
    name: "Communications / Marketing",
    items: [
      "Local communications lead with reputation, leak and crisis-management capability.",
      "Stakeholder mapping across regulators, clients, employees, media and other local stakeholders.",
      "Local drafting and adaptation across language, culture, product and communication channels.",
      "Defined approval route and authority for client, employee and public communications.",
      "Client-facing employee briefing and coordination with contact centres and digital channels.",
      "Local brand, campaign and channel-activation capability, including post-LD1 content management.",
    ],
  },
  "finance-tax": {
    name: "Finance & Tax",
    items: [
      "Country finance lead with transaction and project-management capability.",
      "Local statutory, regulatory-reporting and tax expertise.",
      "Finance data, ledger, reconciliation and process SMEs.",
      "Ability to map local ledgers and policies into Group structures and test migrated finance data.",
      "Integration-cost estimation, budget management and materiality assessment.",
      "Local liquidity, FX, funds-flow, close and cutover capability.",
      "Ability to operate and evidence local recharge, buy-back and TSA charging arrangements.",
    ],
  },
  "change-management": {
    name: "Change Management",
    items: [
      "Named local change lead with protected delivery capacity.",
      "Local stakeholder, cultural, leadership and workforce-impact assessment capability.",
      "Ability to develop and execute local change, engagement, training and adoption plans.",
      "Coordination across Human Capital, Communications, CRES and business leadership.",
      "Understanding of local unions, employee sentiment and consultation constraints.",
    ],
  },
  compliance: {
    name: "Compliance & Regulatory Approvals",
    items: [
      "Established relationship with the local regulator.",
      "Ability to interpret local frameworks and draft and submit notifications or applications.",
      "Knowledge of likely regulatory conditions, evidence requirements and approval timescales.",
      "Capability to track conditions and execute regulatory commitments after approval.",
      "Capacity to respond quickly to regulator questions and escalate central dependencies.",
    ],
  },
  procurement: {
    name: "Procurement",
    items: [
      "Named local procurement lead with sufficient capacity.",
      "Complete local supplier and contract inventory capability.",
      "Vendor categorisation, onboarding, screening, third-party risk and dispensation capability.",
      "Local contract-execution and supplier-relationship management.",
      "Knowledge of local tax, recharge and legal-entity contracting implications.",
      "Ability to execute central sourcing decisions and adapt Group policies to local requirements.",
    ],
  },
  "ops-servicing": {
    name: "Operations & Servicing",
    items: [
      "Accountable local operations lead and relevant process SMEs.",
      "Ability to map local processes, controls, customer journeys and service dependencies.",
      "Workforce, capacity and BAU-continuity planning.",
      "Branch, ATM and other local service-point readiness capability.",
    ],
  },
  product: {
    name: "Product / Business",
    items: [
      "Capability to support mapping across products, channels, features and customer propositions.",
      "Understanding of local customer needs, market practices and regulatory constraints.",
      "Ability to translate business requirements into technology and operational requirements with support from central function.",
      "Product acceptance, pricing, profitability and customer-impact assessment capability with support from central function.",
      "Ownership of local product readiness, training and post-LD1 performance.",
    ],
  },
  risk: {
    name: "Risk",
    items: [
      "Independent country second-line Risk lead.",
      "Access to the relevant principal-risk specialists, including credit, operational, conduct, resilience and people risk.",
      "Ability to interpret local risk appetite and present material risks to country governance.",
      "Local policy mapping, waiver, exception and risk-acceptance capability.",
      "Readiness challenge and sign-off capability supported by reliable evidence.",
    ],
  },
  "data-migration": {
    name: "Data Migration",
    items: [
      "Named local data owner and accountable source-system SMEs.",
      "Data inventory, ownership, lineage and source-to-target mapping capability with support from central function",
      "Data-quality profiling, cleansing and remediation.",
      "Extraction, reconciliation and completeness and accuracy validation.",
      "Input into defined success criteria for mock migrations and dress rehearsals.",
      "Cutover support, post-migration reconciliation and data hypercare.",
    ],
  },
  technology: {
    name: "Technology",
    items: [
      "Named country technology lead with clear authority and escalation routes.",
      "Local application, infrastructure, channel, interface and technology-contract knowledge.",
      "Local budget, resource, travel and supplier-contract planning.",
      "Environment, connectivity, access and workplace-technology delivery capability.",
      "Test, defect, cutover, contingency, war-room and service-transition capability.",
    ],
  },
  "independent-assurance": {
    name: "Independent Assurance / External Audit",
    items: [
      "Input into external assurance scope based on deal parameters and local nuance.",
      "Tracking of assurance provider scope to ensure minimal overlap",
    ],
  },
  "kyc-aml": {
    name: "KYC / AML",
    items: [
      "Country MLRO or empowered financial-crime lead.",
      "Knowledge of local KYC, AML, sanctions and regulatory requirements.",
      "Customer-risk, KYC-file and remediation SMEs.",
      "Screening, PEP, sanctions and transaction-monitoring readiness capability.",
      "Local approval and exception-management authority.",
      "Evidence-based LD1 financial-crime readiness sign-off.",
    ],
  },
  hr: {
    name: "Human Capital",
    items: [
      "Named country HC lead and dedicated people-workstream project manager for material deals.",
      "Local employment law, union and consultation expertise.",
      "Organisational design, role levelling, talent, retention and workforce-planning capability.",
      "Reward, benefits, pension and terms-and-conditions harmonisation expertise.",
      "Payroll, HR systems, employee-data and onboarding capability.",
      "Cultural integration and senior employee-engagement capability.",
      "Close coordination with Communications, Change, Legal and regulatory stakeholders.",
    ],
  },
  "e2e-testing": {
    name: "E2E Testing",
    items: [
      "Named country test lead with authority across local workstreams.",
      "Local business and operational SMEs capable of defining realistic scenarios.",
      "Coverage of local customer journeys, cards, digital channels, branches and regulatory processes.",
      "Test-data and environment readiness.",
      "Agreed success criteria for testing, mock runs and dress rehearsals.",
      "Defect triage, remediation, retesting and evidence management.",
      "Capacity to support repeated rehearsals without undermining BAU.",
    ],
  },
  "ld1-readiness": {
    name: "Client Readiness",
    items: [
      "Named country client-readiness lead with cross-functional authority.",
      "Client segmentation and end-to-end local customer-journey mapping.",
      "Engaged and trained relationship managers and other client-facing employees.",
      "Local onboarding, servicing, contact-centre and digital-channel readiness.",
      "Readiness metrics, client-impact escalation and complaint-management capability.",
      "LD1 client support and hypercare.",
    ],
  },
  legal: {
    name: "Legal & CorpDev",
    items: [
      "Country Legal lead with strong local-law and transaction support capability.",
      "Local due-diligence, drafting-review and legal-risk assessment.",
      "Conditions-precedent and local-obligation tracking.",
      "Traceability from due-diligence findings into transaction documents and execution plans.",
      "Regular collaboration with Group Legal, Compliance, Finance and programme governance.",
      "Local business or commercial SMEs capable of supporting business-owned diligence and business-case assumptions",
      "CorpDev transaction leadership can remain central; the minimum country requirement is informed commercial input and strong local Legal execution.",
    ],
  },
  cres: {
    name: "CRES",
    items: [
      "Named country CRES lead responsible for day-to-day estate delivery.",
      "Property, lease, occupancy, facilities and critical-site assessment capability.",
      "Local project management for construction, fit-out, moves and vendor delivery.",
      "Local landlord, supplier, certification and statutory-approval management.",
      "Budget, procurement and investment-governance capability.",
      "Workplace readiness covering access, parking, security, branding and employee experience.",
      "Joint inspection and asset-verification capability for branches, ATMs and transferred premises.",
      "Early mobilisation, ideally allowing approximately six months for material premises changes.",
    ],
  },
  "internal-audit": {
    name: "Internal Audit",
    items: [
      "Independent country Internal Audit lead or delegated audit resource.",
      "Programme-governance, control and transaction-risk assurance capability.",
      "Ability to review conditions precedent, readiness governance and management evidence.",
      "Sufficient understanding of data migration, testing and cutover to challenge programme conclusions.",
      "Independent reporting and escalation to appropriate audit and country governance.",
      "Findings tracking and independent closure validation.",
      "Early coordination with Risk and external assurers while preserving third-line independence.",
    ],
  },
};
