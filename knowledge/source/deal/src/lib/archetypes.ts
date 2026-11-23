/**
 * Single source of truth for the six working deal archetypes, their lifecycles,
 * operating-model shape and supporting artefacts.
 *
 * Terminology here is reused verbatim by the lifecycle, operating-model and
 * template views so the prototype reads consistently. Where methodology has not
 * been defined yet, `lifecycleStatus` is "in-development" and no content is
 * invented.
 */

export type Side = "acquisition" | "divestment";

export type Requirement = "necessary" | "conditional" | "optional" | "not-required";

export type Activity = {
  name: string;
  requirement: Requirement;
  /** Required for conditional activities: why the activity applies. */
  reason?: string;
  /** Title of a supporting artefact in ARTEFACTS. */
  artefact?: string;
};

export type LifecycleStage = {
  id: string;
  index: string;
  title: string;
  purpose: string;
  activities: Activity[];
};

export type WorkstreamRole = {
  workstream: string;
  requirement: Requirement;
  reason?: string;
};

export type Archetype = {
  id: string;
  name: string;
  side: Side;
  perimeter: string;
  description: string;
  /** Fuller definition taken from the archetype classification guide. */
  detailedDefinition: string;
  /** Inclusion criteria that define the archetype. */
  characteristics: string[];
  /** Illustrative transactions for this archetype. */
  examples: string[];
  lifecycleStatus: "available" | "in-development";
  startLabel: string;
  endLabel: string;
  stages: LifecycleStage[];
  workstreams: WorkstreamRole[];
};

/** Full workstream set. Blank templates accommodate all of these. */
export const ALL_WORKSTREAMS = [
  "Central Hub",
  "Communications / Marketing",
  "Finance & Tax",
  "Change Management",
  "Compliance & Regulatory Approvals",
  "Procurement",
  "Operations & Servicing",
  "Product (Business)",
  "Risk",
  "Data Migration",
  "Technology",
  "Independent Assurance / External Audit",
  "KYC / AML",
  "Human Capital",
  "E2E Testing",
  "Client Readiness",
  "Legal & CorpDev",
  "CRES",
  "Internal Audit",
] as const;

const BSA_STAGES: LifecycleStage[] = [
  {
    id: "deal-scouting",
    index: "01",
    title: "Deal Scouting",
    purpose:
      "Identify and qualify the opportunity, confirm strategic fit and define the perimeter of assets and liabilities in scope.",
    activities: [
      { name: "Opportunity screening and strategic fit assessment", requirement: "necessary" },
      { name: "Initial perimeter definition (assets and liabilities in scope)", requirement: "necessary", artefact: "Deal perimeter summary" },
      { name: "Indicative archetype and complexity view", requirement: "necessary", artefact: "Archetype classification sheet" },
      {
        name: "In-country capability assessment",
        requirement: "conditional",
        reason: "Applies where the portfolio sits in a jurisdiction with limited or non-aligned existing operations.",
      },
      { name: "Market benchmarking of comparable portfolios", requirement: "optional" },
    ],
  },
  {
    id: "due-diligence",
    index: "02",
    title: "Due Diligence",
    purpose:
      "Test the value, quality and risk profile of the portfolio and confirm what must be true to complete.",
    activities: [
      { name: "Financial and credit due diligence on the portfolio", requirement: "necessary", artefact: "Due diligence request list" },
      { name: "Legal and title review of assets and liabilities", requirement: "necessary" },
      { name: "Risk, compliance and Section 54 assessment", requirement: "necessary" },
      { name: "Data quality and completeness review", requirement: "necessary", artefact: "Data migration mapping template" },
      {
        name: "Regulatory approval mapping",
        requirement: "conditional",
        reason: "Applies where the portfolio spans more than one jurisdiction or a regulated licence transfers.",
      },
      { name: "Independent portfolio valuation review", requirement: "optional" },
    ],
  },
  {
    id: "legal-drafting-signature",
    index: "03",
    title: "Legal Drafting & Signature",
    purpose:
      "Agree and sign the transaction documents, including the conditions that must be satisfied before Legal Day 1.",
    activities: [
      { name: "SPA drafting and negotiation", requirement: "necessary" },
      { name: "Conditions precedent schedule agreed", requirement: "necessary", artefact: "Conditions precedent tracker" },
      { name: "Signature and internal approvals", requirement: "necessary" },
      {
        name: "TSA scoping",
        requirement: "conditional",
        reason: "Applies only where servicing of the portfolio continues after Legal Day 1.",
      },
    ],
  },
  {
    id: "mobilisation-planning",
    index: "04",
    title: "Mobilisation & Planning",
    purpose:
      "Stand up the programme, confirm the operating model and build the integrated plan to Legal Day 1.",
    activities: [
      { name: "Programme governance and workstream mobilisation", requirement: "necessary", artefact: "Operating model on a page" },
      { name: "Plan on a page and detailed integrated plan", requirement: "necessary", artefact: "Plan on a page" },
      { name: "Risk, assumption, issue and dependency log opened", requirement: "necessary", artefact: "RAID log" },
      {
        name: "In-country delivery team mobilisation",
        requirement: "conditional",
        reason: "Applies where a regional Spoke carries delivery accountability alongside the central Hub.",
      },
      { name: "Third-party delivery partner onboarding", requirement: "optional" },
    ],
  },
  {
    id: "programme-execution",
    index: "05",
    title: "Programme Execution",
    purpose:
      "Deliver the workstream activity required to make the portfolio ready to transfer and to be serviced on Absa systems.",
    activities: [
      { name: "Product, pricing and servicing set-up", requirement: "necessary" },
      { name: "Data preparation, cleansing and migration build", requirement: "necessary", artefact: "Data migration mapping template" },
      { name: "Finance, reporting and reconciliation readiness", requirement: "necessary" },
      { name: "Weekly workstream reporting and governance", requirement: "necessary", artefact: "Workstream status report" },
      {
        name: "Technology build or configuration",
        requirement: "conditional",
        reason: "Applies where servicing the portfolio requires new or changed system capability.",
      },
      {
        name: "New licence or entity establishment",
        requirement: "conditional",
        reason: "Applies where Absa has no existing operations in the jurisdiction.",
      },
    ],
  },
  {
    id: "business-testing",
    index: "06",
    title: "Business Testing",
    purpose:
      "Prove end-to-end that the portfolio can be booked, serviced and reported before go-live.",
    activities: [
      { name: "End-to-end business process testing", requirement: "necessary", artefact: "Test and defect log" },
      { name: "Migration trial runs and reconciliation", requirement: "necessary" },
      { name: "Defect triage and resolution", requirement: "necessary" },
      {
        name: "Interface testing with counterparties",
        requirement: "conditional",
        reason: "Applies where servicing depends on external interfaces or a vendor platform.",
      },
    ],
  },
  {
    id: "client-onboarding-ldi-readiness",
    index: "07",
    title: "Client Onboarding & LD1 Readiness",
    purpose:
      "Complete client onboarding, confirm regulatory and operational readiness and evidence the criteria for Legal Day 1.",
    activities: [
      { name: "Client onboarding and screening completion", requirement: "necessary" },
      { name: "Client communications issued", requirement: "necessary", artefact: "Client communication pack" },
      { name: "LD1 readiness criteria evidenced", requirement: "necessary", artefact: "LD1 readiness checklist" },
      {
        name: "Consent or re-papering exercise",
        requirement: "conditional",
        reason: "Applies where client consent is required to transfer the relationship or contract.",
      },
    ],
  },
  {
    id: "dress-rehearsals",
    index: "08",
    title: "Dress Rehearsals",
    purpose:
      "Rehearse the cutover sequence under realistic conditions and confirm the runbook, timings and roles.",
    activities: [
      { name: "Cutover runbook walkthrough", requirement: "necessary", artefact: "Cutover runbook" },
      { name: "Timed rehearsal with participating workstreams", requirement: "necessary" },
      { name: "Rehearsal findings and runbook update", requirement: "necessary" },
      { name: "Second full rehearsal", requirement: "optional" },
    ],
  },
  {
    id: "go-no-go",
    index: "09",
    title: "Go/No-Go",
    purpose:
      "Take the formal decision to proceed to cutover against agreed criteria and open risks.",
    activities: [
      { name: "Workstream readiness confirmations", requirement: "necessary", artefact: "Go/No-Go decision pack" },
      { name: "Open risk and defect review", requirement: "necessary" },
      { name: "Formal decision recorded", requirement: "necessary" },
      {
        name: "Regulator or counterparty notification",
        requirement: "conditional",
        reason: "Applies where a regulator or counterparty must be notified before completion.",
      },
    ],
  },
  {
    id: "cutover",
    index: "10",
    title: "Cutover",
    purpose:
      "Execute the transfer of the portfolio to Absa systems and books across Legal Day 1.",
    activities: [
      { name: "Runbook execution and command centre", requirement: "necessary", artefact: "Cutover runbook" },
      { name: "Migration execution and reconciliation sign-off", requirement: "necessary" },
      { name: "Legal Day 1 completion confirmed", requirement: "necessary" },
      {
        name: "Fallback or rollback invocation",
        requirement: "conditional",
        reason: "Applies only if cutover exit criteria are not met within the agreed window.",
      },
    ],
  },
  {
    id: "hypercare",
    index: "11",
    title: "Hypercare",
    purpose:
      "Stabilise servicing after Legal Day 1 and hand the portfolio into business as usual.",
    activities: [
      { name: "Elevated monitoring and issue resolution", requirement: "necessary", artefact: "Hypercare exit report" },
      { name: "Reconciliation and reporting stabilisation", requirement: "necessary" },
      { name: "Handover to business as usual and programme closure", requirement: "necessary" },
      {
        name: "TSA service management",
        requirement: "conditional",
        reason: "Applies where transitional services remain in place after Legal Day 1.",
      },
      { name: "Post-completion review", requirement: "optional" },
    ],
  },
];

const hub: WorkstreamRole = { workstream: "Central Hub", requirement: "necessary" };

const bs_acqWorkstreams: WorkstreamRole[] = [
  hub,
  {"workstream": "Communications / Marketing", "requirement": "necessary"},
  {"workstream": "Finance & Tax", "requirement": "necessary"},
  {"workstream": "Compliance & Regulatory Approvals", "requirement": "necessary"},
  {"workstream": "Procurement", "requirement": "necessary"},
  {"workstream": "Operations & Servicing", "requirement": "necessary"},
  {"workstream": "Product (Business)", "requirement": "necessary"},
  {"workstream": "Risk", "requirement": "necessary"},
  {"workstream": "Data Migration", "requirement": "necessary"},
  {"workstream": "Technology", "requirement": "necessary"},
  {"workstream": "E2E Testing", "requirement": "necessary"},
  {"workstream": "Legal & CorpDev", "requirement": "necessary"},
  {"workstream": "Internal Audit", "requirement": "necessary"},
  {"workstream": "Client Readiness", "requirement": "conditional", "reason": "Conditional based on scale of client transfer, and onboarding and training requirements"},
  {"workstream": "Change Management", "requirement": "not-required", "reason": "Embedded because the underlying activity normally sits within Central Hub, HR, Communications / Marketing or impacted business teams"},
  {"workstream": "Independent Assurance / External Audit", "requirement": "not-required", "reason": "Not typically required on smaller acquisitions with limited wider impact on the Absa business, unless specified by the regulator"},
  {"workstream": "KYC / AML", "requirement": "not-required", "reason": "No client transfer means dedicated workstream not required"},
  {"workstream": "Human Capital", "requirement": "not-required", "reason": "Balance sheet archetypes, by definition, do not include people transfer"},
  {"workstream": "CRES", "requirement": "not-required", "reason": "Balance sheet archetypes usually do not include the transfer of real-estate assets, as these are often tied to employee transfer or larger business integration of branches, ATMs etc"},
];

const p_acqWorkstreams: WorkstreamRole[] = [
  hub,
  {"workstream": "Communications / Marketing", "requirement": "necessary"},
  {"workstream": "Finance & Tax", "requirement": "necessary"},
  {"workstream": "Change Management", "requirement": "necessary"},
  {"workstream": "Compliance & Regulatory Approvals", "requirement": "necessary"},
  {"workstream": "Procurement", "requirement": "necessary"},
  {"workstream": "Operations & Servicing", "requirement": "necessary"},
  {"workstream": "Product (Business)", "requirement": "necessary"},
  {"workstream": "Risk", "requirement": "necessary"},
  {"workstream": "Data Migration", "requirement": "necessary"},
  {"workstream": "Technology", "requirement": "necessary"},
  {"workstream": "Independent Assurance / External Audit", "requirement": "necessary"},
  {"workstream": "E2E Testing", "requirement": "necessary"},
  {"workstream": "Client Readiness", "requirement": "necessary"},
  {"workstream": "Legal & CorpDev", "requirement": "necessary"},
  {"workstream": "Internal Audit", "requirement": "necessary"},
  {"workstream": "KYC / AML", "requirement": "conditional", "reason": "Conditional depending on whether clients are transferring, and the level of trust placed in seller KYC"},
  {"workstream": "Human Capital", "requirement": "conditional", "reason": "Conditional where partial archetypes create transferring and retained employee populations, consultation obligations, payroll and benefits decisions, and onboarding needs"},
  {"workstream": "CRES", "requirement": "conditional", "reason": "Required if the partial perimeter includes real estate asset transfer such as offices, branches, or ATMs"},
];

const f_acqWorkstreams: WorkstreamRole[] = [
  hub,
  {"workstream": "Communications / Marketing", "requirement": "necessary"},
  {"workstream": "Finance & Tax", "requirement": "necessary"},
  {"workstream": "Change Management", "requirement": "necessary"},
  {"workstream": "Compliance & Regulatory Approvals", "requirement": "necessary"},
  {"workstream": "Procurement", "requirement": "necessary"},
  {"workstream": "Operations & Servicing", "requirement": "necessary"},
  {"workstream": "Product (Business)", "requirement": "necessary"},
  {"workstream": "Risk", "requirement": "necessary"},
  {"workstream": "Data Migration", "requirement": "necessary"},
  {"workstream": "Technology", "requirement": "necessary"},
  {"workstream": "Independent Assurance / External Audit", "requirement": "necessary"},
  {"workstream": "KYC / AML", "requirement": "necessary"},
  {"workstream": "Human Capital", "requirement": "necessary"},
  {"workstream": "E2E Testing", "requirement": "necessary"},
  {"workstream": "Client Readiness", "requirement": "necessary"},
  {"workstream": "Legal & CorpDev", "requirement": "necessary"},
  {"workstream": "CRES", "requirement": "necessary"},
  {"workstream": "Internal Audit", "requirement": "necessary"},
];

const bs_saleWorkstreams: WorkstreamRole[] = [
  hub,
  {"workstream": "Communications / Marketing", "requirement": "necessary"},
  {"workstream": "Finance & Tax", "requirement": "necessary"},
  {"workstream": "Compliance & Regulatory Approvals", "requirement": "necessary"},
  {"workstream": "Procurement", "requirement": "necessary"},
  {"workstream": "Operations & Servicing", "requirement": "necessary"},
  {"workstream": "Product (Business)", "requirement": "necessary"},
  {"workstream": "Risk", "requirement": "necessary"},
  {"workstream": "Data Migration", "requirement": "necessary"},
  {"workstream": "Technology", "requirement": "necessary"},
  {"workstream": "Legal & CorpDev", "requirement": "necessary"},
  {"workstream": "Internal Audit", "requirement": "necessary"},
  {"workstream": "Change Management", "requirement": "not-required", "reason": "Embedded because the underlying activity normally sits within Central Hub, HR, Communications / Marketing or impacted business teams"},
  {"workstream": "Independent Assurance / External Audit", "requirement": "not-required", "reason": "Not typically required on smaller disposals with limited wider impact on Absa, unless specified by a regulator"},
  {"workstream": "KYC / AML", "requirement": "not-required", "reason": "No client transfer means dedicated workstream not required"},
  {"workstream": "Human Capital", "requirement": "not-required", "reason": "Balance sheet archetypes, by definition, do not include people transfer"},
  {"workstream": "E2E Testing", "requirement": "not-required", "reason": "Not required as large scale impact is usually limited, and testing can be absorbed into business / tech functions"},
  {"workstream": "Client Readiness", "requirement": "not-required", "reason": "Majority of onboarding, training, and client contact work sits with the Seller, so dedicated Absa workstream unlikely to be needed"},
  {"workstream": "CRES", "requirement": "not-required", "reason": "Balance sheet archetypes usually do not include the transfer of real-estate assets, as these are often tied to employee transfer or larger business integration of branches, ATMs etc"},
];

const p_saleWorkstreams: WorkstreamRole[] = [
  hub,
  {"workstream": "Communications / Marketing", "requirement": "necessary"},
  {"workstream": "Finance & Tax", "requirement": "necessary"},
  {"workstream": "Change Management", "requirement": "necessary"},
  {"workstream": "Compliance & Regulatory Approvals", "requirement": "necessary"},
  {"workstream": "Procurement", "requirement": "necessary"},
  {"workstream": "Operations & Servicing", "requirement": "necessary"},
  {"workstream": "Product (Business)", "requirement": "necessary"},
  {"workstream": "Risk", "requirement": "necessary"},
  {"workstream": "Data Migration", "requirement": "necessary"},
  {"workstream": "Technology", "requirement": "necessary"},
  {"workstream": "Legal & CorpDev", "requirement": "necessary"},
  {"workstream": "Internal Audit", "requirement": "necessary"},
  {"workstream": "Human Capital", "requirement": "conditional", "reason": "Conditional where partial archetypes create transferring and retained employee populations, consultation obligations, payroll and benefits decisions, and onboarding needs"},
  {"workstream": "E2E Testing", "requirement": "conditional", "reason": "Conditional based on the scale of change impacting the retained business"},
  {"workstream": "CRES", "requirement": "conditional", "reason": "Required if the partial perimeter includes real estate asset transfer such as offices, branches, or ATMs"},
  {"workstream": "Independent Assurance / External Audit", "requirement": "optional", "reason": "Optional as the majority of integration work will sit with the buyer, so independent review is not as critical on the Absa side"},
  {"workstream": "KYC / AML", "requirement": "not-required", "reason": "Core KYC activities sit with the buyer, Absa's focus is on sourcing and providing the correct files, which typically does not require a standalone workstream"},
  {"workstream": "Client Readiness", "requirement": "not-required", "reason": "Majority of onboarding, training, and client contact work sits with the Seller, so dedicated Absa workstream unlikely to be needed"},
];

const f_saleWorkstreams: WorkstreamRole[] = [
  hub,
  {"workstream": "Communications / Marketing", "requirement": "necessary"},
  {"workstream": "Finance & Tax", "requirement": "necessary"},
  {"workstream": "Change Management", "requirement": "necessary"},
  {"workstream": "Compliance & Regulatory Approvals", "requirement": "necessary"},
  {"workstream": "Procurement", "requirement": "necessary"},
  {"workstream": "Operations & Servicing", "requirement": "necessary"},
  {"workstream": "Product (Business)", "requirement": "necessary"},
  {"workstream": "Risk", "requirement": "necessary"},
  {"workstream": "Data Migration", "requirement": "necessary"},
  {"workstream": "Technology", "requirement": "necessary"},
  {"workstream": "Independent Assurance / External Audit", "requirement": "necessary"},
  {"workstream": "Human Capital", "requirement": "necessary"},
  {"workstream": "E2E Testing", "requirement": "necessary"},
  {"workstream": "Client Readiness", "requirement": "necessary"},
  {"workstream": "Legal & CorpDev", "requirement": "necessary"},
  {"workstream": "CRES", "requirement": "necessary"},
  {"workstream": "Internal Audit", "requirement": "necessary"},
  {"workstream": "KYC / AML", "requirement": "not-required", "reason": "Core KYC activities sit with the buyer, Absa's focus is on sourcing and providing the correct files, which typically does not require a standalone workstream"},
];

export const ARCHETYPES: Archetype[] = [
  {
    id: "balance-sheet-acquisition",
    name: "Balance-sheet acquisition",
    side: "acquisition",
    perimeter: "No operating component transfers",
    description:
      "The acquisition of a defined portfolio of assets and specified liabilities, without acquiring a material workforce or the operating technology needed to run a standalone business.",
    detailedDefinition:
      "Absa acquires one or more specified assets and liabilities but does not acquire a genuine core operating component or an independently operable business. Assets are not mandatory: a liabilities-only acquisition can fall within this archetype. A transfer of records, client data or technical interfaces may be necessary to manage the acquisition.",
    characteristics: [
      "The transaction direction is acquisition by Absa.",
      "At least one specified asset, liability, right or obligation enters the Absa perimeter.",
      "No genuine operating component transfers or remains within a controlled acquired perimeter.",
      "Any records, customer contract rights, data, interfaces or servicing arrangements are required only to administer the acquired positions and do not themselves constitute a transferred operating capability.",
    ],
    examples: [
      "Acquisition of a loan or receivables portfolio.",
      "Acquisition of a defined investment portfolio and associated contractual rights.",
    ],
    lifecycleStatus: "available",
    startLabel: "Start",
    endLabel: "Run",
    stages: BSA_STAGES,
    workstreams: bs_acqWorkstreams,
  },
  {
    id: "partial-business-acquisition",
    name: "Partial-business acquisition",
    side: "acquisition",
    perimeter: "Operating component transfers, not independently operable",
    description:
      "The acquisition of part of a business, including selected operating components, but not a complete standalone business.",
    detailedDefinition:
      "Absa acquires at least one genuine operating component, but the acquired perimeter is not independently operable. One or more core capabilities remain with the seller, must be supplied on an ongoing basis, must be built by Absa or require integration into Absa.",
    characteristics: [
      "The transaction direction is acquisition.",
      "At least one genuine operating component transfers: people, technology, processes, licences, supplier relationships, IP or operational data.",
      "One or more core capabilities needed for the principal offering are excluded.",
      "Continuation requires Absa integration, an Absa build or continuing provision of an excluded capability.",
    ],
    examples: [
      "Acquisition of a client portfolio and its relationship managers, with clients migrated onto Absa systems.",
      "Acquisition of a lending platform, intellectual property and customer contracts, while the seller retains the employees who operate it.",
    ],
    lifecycleStatus: "in-development",
    startLabel: "Start",
    endLabel: "Run",
    stages: [],
    workstreams: p_acqWorkstreams,
  },
  {
    id: "full-business-acquisition",
    name: "Full-business acquisition",
    side: "acquisition",
    perimeter: "Complete operating business, independently operable",
    description:
      "The acquisition of a complete operating business, including the people, technology and other capabilities needed for it to continue operating.",
    detailedDefinition:
      "Absa acquires an operating business that can continue delivering and servicing its principal offering without integration into Absa. Every core capability needed for continuity transfers, remains within the acquired entity or is available through an enforceable standalone arrangement at completion. Later integration is optional.",
    characteristics: [
      "The transaction direction is acquisition.",
      "The principal offering and customer perimeter are identifiable.",
      "All core capabilities required for continuity are available at completion.",
      "Required licences, permissions, contracts, data and IP remain effective.",
      "The business can continue without integration into Absa.",
      "Any TSA is transitional and has a credible standalone exit.",
    ],
    examples: [
      "Acquisition of a banking subsidiary, including its employees, customers, systems, licences and operations.",
      "Acquisition of a complete payments, insurance or wealth-management business.",
      "Acquisition of a complete business receiving temporary payroll or infrastructure support under a time-limited TSA.",
    ],
    lifecycleStatus: "in-development",
    startLabel: "Start",
    endLabel: "Run",
    stages: [],
    workstreams: f_acqWorkstreams,
  },
  {
    id: "balance-sheet-divestment",
    name: "Balance-sheet divestment",
    side: "divestment",
    perimeter: "No operating component transfers",
    description:
      "The sale of a defined portfolio of assets and specified liabilities, without transferring employees or the operating technology and capabilities needed to run a business.",
    detailedDefinition:
      "Absa transfers one or more specified assets and liabilities but does not transfer a genuine core operating component or an independently operable business. Assets are not mandatory: a liabilities-only divestment can fall within this archetype.",
    characteristics: [
      "The transaction direction is divestment by Absa.",
      "At least one specified asset, liability, right or obligation leaves the Absa perimeter.",
      "No genuine operating component transfers.",
      "Any records, customer contract rights, data, interfaces or servicing arrangements are required only to administer the transferred positions and do not themselves constitute a transferred operating capability.",
    ],
    examples: [
      "Sale of a loan, receivables or non-performing-loan portfolio without a servicing function.",
      "Sale of selected receivables or investments.",
    ],
    lifecycleStatus: "in-development",
    startLabel: "Start",
    endLabel: "Separation complete",
    stages: [],
    workstreams: bs_saleWorkstreams,
  },
  {
    id: "partial-business-divestment",
    name: "Partial-business divestment",
    side: "divestment",
    perimeter: "Operating component transfers, not independently operable",
    description:
      "The sale of part of an Absa business, including one or more operating components, but not the complete set of capabilities needed to run the business independently.",
    detailedDefinition:
      "Absa transfers at least one genuine operating component, but the transferred perimeter is not independently operable outside Absa. One or more core capabilities remain with Absa, must be supplied on an ongoing basis, must be built by the buyer or require integration into the buyer.",
    characteristics: [
      "The transaction direction is divestment.",
      "At least one genuine operating component transfers.",
      "One or more core capabilities required for the principal offering are excluded from the transferred perimeter.",
      "Continuation requires buyer integration, a buyer build or continuing provision of an excluded capability by Absa.",
    ],
    examples: [
      "Sale of a product business and its employees, with the buyer temporarily using Absa systems.",
      "Sale of a digital platform, intellectual property and customer contracts while supporting employees and processes remain with Absa.",
    ],
    lifecycleStatus: "in-development",
    startLabel: "Start",
    endLabel: "Separation complete",
    stages: [],
    workstreams: p_saleWorkstreams,
  },
  {
    id: "full-business-divestment",
    name: "Full-business divestment",
    side: "divestment",
    perimeter: "Complete operating business, independently operable",
    description:
      "The sale of a complete operating business, including the people, technology and other capabilities needed for it to continue operating under the buyer; the business being sold is standalone, and that is the test.",
    detailedDefinition:
      "Absa transfers an operating business that can continue delivering and servicing its principal offering outside Absa without integration into the buyer. Every core capability needed for continuity transfers, remains within the disposed entity or is available through an enforceable standalone arrangement at completion. Later buyer integration is optional.",
    characteristics: [
      "The transaction direction is divestment.",
      "The principal offering and customer perimeter are identifiable.",
      "All core capabilities required for continuity are available at completion.",
      "Required licences, permissions, contracts, data and IP remain effective.",
      "The business can continue outside Absa without integration into the buyer.",
      "Any TSA is transitional and has a credible standalone exit.",
    ],
    examples: [
      "Sale of an Absa subsidiary or country business, including its employees, customers, systems, licences and operations.",
      "Sale of a complete payments, insurance or wealth-management business.",
    ],
    lifecycleStatus: "in-development",
    startLabel: "Start",
    endLabel: "Separation complete",
    stages: [],
    workstreams: f_saleWorkstreams,
  },
];


export function getArchetype(id: string | undefined): Archetype | undefined {
  return ARCHETYPES.find((a) => a.id === id);
}

export const REQUIREMENT_LABEL: Record<Requirement, string> = {
  necessary: "Necessary",
  conditional: "Conditional",
  optional: "Optional",
  "not-required": "Not Required",
};

/** Anonymised worked example used across every populated artefact. */
export const EXAMPLE_DEAL = {
  name: "Project Meridian",
  archetypeId: "balance-sheet-acquisition",
  summary:
    "One anonymised example transaction: the acquisition of a corporate lending portfolio in a market with established Absa operations.",
  currentStageId: "programme-execution",
};

export type Artefact = {
  title: string;
  kind: "template" | "example";
  description: string;
  stageId?: string;
};

export const ARTEFACTS: Artefact[] = [
  { title: "Deal perimeter summary", kind: "template", description: "Captures what is in and out of the deal perimeter.", stageId: "deal-scouting" },
  { title: "Archetype classification sheet", kind: "template", description: "Records the archetype and the reasoning behind it.", stageId: "deal-scouting" },
  { title: "Due diligence request list", kind: "template", description: "Structured information request across all workstreams.", stageId: "due-diligence" },
  { title: "Conditions precedent tracker", kind: "template", description: "Tracks each condition to be satisfied before Legal Day 1.", stageId: "legal-drafting-signature" },
  { title: "Plan on a page", kind: "template", description: "Single-page view of stages, milestones and Legal Day 1.", stageId: "mobilisation-planning" },
  { title: "Operating model on a page", kind: "template", description: "Hub, Spokes and workstream leads for the transaction.", stageId: "mobilisation-planning" },
  { title: "RAID log", kind: "template", description: "Risks, assumptions, issues and dependencies.", stageId: "mobilisation-planning" },
  { title: "Workstream status report", kind: "template", description: "Weekly reporting format for each workstream.", stageId: "programme-execution" },
  { title: "Data migration mapping template", kind: "template", description: "Source-to-target field mapping and reconciliation basis.", stageId: "programme-execution" },
  { title: "Test and defect log", kind: "template", description: "Business testing coverage and defect status.", stageId: "business-testing" },
  { title: "Client communication pack", kind: "template", description: "Client-facing notification and consent materials.", stageId: "client-onboarding-ldi-readiness" },
  { title: "LD1 readiness checklist", kind: "template", description: "Evidence-based readiness criteria per workstream.", stageId: "client-onboarding-ldi-readiness" },
  { title: "Cutover runbook", kind: "template", description: "Sequenced cutover tasks, owners and timings.", stageId: "dress-rehearsals" },
  { title: "Go/No-Go decision pack", kind: "template", description: "Readiness confirmations and the recorded decision.", stageId: "go-no-go" },
  { title: "Hypercare exit report", kind: "template", description: "Stabilisation measures and handover to business as usual.", stageId: "hypercare" },
];

/** Populated examples: same deal, only the workstreams relevant to it. */
export const EXAMPLE_ARTEFACTS: Artefact[] = [
  { title: "Plan on a page", kind: "example", description: "Project Meridian stages and milestones to Legal Day 1.", stageId: "mobilisation-planning" },
  { title: "Detailed integrated plan", kind: "example", description: "Project Meridian workstream-level plan beneath the plan on a page.", stageId: "mobilisation-planning" },
  { title: "Operating model on a page", kind: "example", description: "Project Meridian Hub, Spoke and workstream leads.", stageId: "mobilisation-planning" },
  { title: "Workstream status report", kind: "example", description: "Project Meridian reporting for the eight active workstreams.", stageId: "programme-execution" },
  { title: "RAID log", kind: "example", description: "Project Meridian open risks and dependencies.", stageId: "mobilisation-planning" },
  { title: "LD1 readiness checklist", kind: "example", description: "Project Meridian readiness criteria by workstream.", stageId: "client-onboarding-ldi-readiness" },
];
