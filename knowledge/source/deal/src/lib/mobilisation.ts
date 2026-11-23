/**
 * 05) Mobilisation Roadmap content model.
 *
 * The landing page is a navigation surface: each bucket below renders as a card
 * and clicks through to /mobilisation/$bucketId. Detail content is expressed as
 * generic blocks so richer detail (day-by-day views, minimum-standard role
 * cards, stage-gate criteria, agent logic) can be added later without
 * redesigning the pages.
 */

export const PENDING_DETAIL = "Detail to be added.";

export interface Field {
  label: string;
  value: string;
}

export interface Entry {
  title: string;
  summary?: string;
  fields: Field[];
}

export type Block =
  | { kind: "stages"; items: Entry[] }
  | { kind: "principles"; items: { title: string; body: string }[] }
  | { kind: "groups"; heading?: string; items: { title: string; entries: Entry[] }[] }
  | { kind: "entries"; heading?: string; items: Entry[] }
  | { kind: "list"; heading?: string; items: string[] }
  | { kind: "compare"; heading?: string; rows: string[] }
  | { kind: "gate"; heading?: string; items: string[] }
  | { kind: "agent"; inputs: string[]; logic: string[]; outputs: string[] }
  | { kind: "note"; title: string; body: string };

export type BucketGroup =
  | "Understand the roadmap"
  | "Mobilise the programme"
  | "Control & assure"
  | "Put it into action";

export interface Bucket {
  id: string;
  number: string;
  title: string;
  purpose: string;
  short: string;
  group: BucketGroup;
  /** Lucide icon key, mapped in the UI. */
  icon: string;
  emphasis?: "gate" | "agent";
  blocks: Block[];
}

const ROADMAP_FIELDS = ["Indicative timing", "Core activity", "Principal outputs", "Exit gates"];

export const ROADMAP_STAGES = [
  "Pre-signing / Prepare",
  "Initiate",
  "Frame",
  "Diagnose",
  "Plan",
  "Integrate",
  "Challenge and Approve",
];

const stageEntries: Entry[] = ROADMAP_STAGES.map((name) => ({
  title: name,
  fields: ROADMAP_FIELDS.map((label) => ({ label, value: PENDING_DETAIL })),
}));

const WORKSTREAMS = [
  "PMO and Governance",
  "Business and Product",
  "Operations and Service",
  "Technology",
  "Data Migration",
  "Client and Readiness",
  "Human Capital and Change",
  "Risk and Credit",
  "Legal, Compliance and Regulatory",
  "Finance and Tax",
  "Procurement and Third Parties",
  "Testing and Assurance",
  "Communications",
  "Cutover and Hypercare",
];

const WORKSTREAM_FIELDS = [
  "When the workstream should be activated",
  "Mobilisation focus",
  "Key activities",
  "Required outputs",
  "Dependencies",
];

const ROLES = [
  "Accountable executives",
  "Transaction / mobilisation leadership",
  "PMO",
  "Workstream leads",
  "Deputies",
  "Project managers / analysts",
  "Testing and assurance leadership",
  "Specialist roles where required",
];

const ROLE_FIELDS = [
  "Role purpose",
  "Core responsibilities",
  "Key decisions owned",
  "Inputs required",
  "Outputs produced",
  "Key interfaces",
  "Minimum expectations during mobilisation",
];

const FORUMS = [
  "Workstream working sessions",
  "PM and dependency review",
  "Workstream leads review",
  "Risk and assurance review",
  "Internal SteerCo",
  "Joint SteerCo",
  "Wider briefing and questions",
];

const FORUM_FIELDS = ["Indicative rhythm", "Purpose", "Owner", "Key decisions / outputs"];

const ARTEFACTS = [
  "Mobilisation mandate",
  "Onboarding pack and rules of engagement",
  "Workstream charters",
  "Integrated programme plan",
  "RAID and decision log",
  "Resource and budget view",
  "Testing and assurance strategy",
  "Readiness framework",
  "Governance calendar and reporting pack",
];

const ARTEFACT_FIELDS = ["What it is", "Minimum content", "Owner", "When it is required"];

/** First ten business days: high-level overview (timing, bucket of work, focus). */
const DAY_OVERVIEW: Entry[] = [
  {
    title: "Mobilise team",
    fields: [
      {
        label: "Mobilisation focus",
        value:
          "Establish mobilisation authority on Day 1, then activate the core team, confirm deputies and secure capacity on Day 2.",
      },
      { label: "Timing", value: "Days 1 to 2" },
    ],
  },
  {
    title: "Set up technology and collaboration mechanisms",
    fields: [
      {
        label: "Mobilisation focus",
        value:
          "Create and test the controlled workspace, role-based access, communication channels, document controls and support routes.",
      },
      { label: "Timing", value: "Day 3" },
    ],
  },
  {
    title: "Appoint programme members",
    fields: [
      {
        label: "Mobilisation focus",
        value:
          "Appoint programme leadership, workstream, country, regional and enabling-function representatives and own any vacancies.",
      },
      { label: "Timing", value: "Day 4" },
    ],
  },
  {
    title: "Stand up governance",
    fields: [
      {
        label: "Mobilisation focus",
        value:
          "Approve forum membership and Terms of Reference, schedule the cadence, activate PMO controls and test escalation routes.",
      },
      { label: "Timing", value: "Day 5" },
    ],
  },
  {
    title: "Onboard broader teams",
    fields: [
      {
        label: "Mobilisation focus",
        value:
          "Prepare onboarding, launch programme leadership, onboard priority and wider teams, and connect legally permitted interfaces.",
      },
      { label: "Timing", value: "Days 6 to 9" },
    ],
  },
  {
    title: "Close mobilisation and release the next phase",
    fields: [
      {
        label: "Mobilisation focus",
        value:
          "Verify mobilisation evidence, resolve or condition open exceptions, record the gate decision and authorise post-Day 10 planning and gap assessment.",
      },
      { label: "Timing", value: "Day 10" },
    ],
  },
];

const ACTIVITY_GROUPS = [
  "Before signing and initiation",
  "Framing and diagnosis",
  "Planning and integration",
  "Challenge and approval",
];

const entriesFrom = (titles: string[], fields: string[]): Entry[] =>
  titles.map((title) => ({
    title,
    fields: fields.map((label) => ({ label, value: PENDING_DETAIL })),
  }));

export const BUCKETS: Bucket[] = [
  {
    id: "overview",
    number: "01",
    title: "Mobilisation Roadmap Overview",
    purpose:
      "Understand the end-to-end mobilisation journey and what needs to be achieved at each stage.",
    short: "The end-to-end journey, stage by stage.",
    group: "Understand the roadmap",
    icon: "route",
    blocks: [
      { kind: "stages", items: stageEntries },
      {
        kind: "note",
        title: "Tailored, not a timetable",
        body: "Indicative timing flexes with deal archetype, complexity and transaction context. Use the stages and exit gates as the control, not the calendar.",
      },
    ],
  },
  {
    id: "principles",
    number: "02",
    title: "Mobilisation Principles",
    purpose: "Understand the core principles that should govern mobilisation on every transaction.",
    short: "Six principles that govern every mobilisation.",
    group: "Understand the roadmap",
    icon: "compass",
    blocks: [
      {
        kind: "principles",
        items: [
          {
            title: "Prepare before signing",
            body: "Mobilisation readiness is built ahead of signature, so day one is a start rather than a scramble.",
          },
          {
            title: "Plan from outcomes and readiness",
            body: "Plans are built backwards from the outcomes and readiness required, not forwards from available activity.",
          },
          {
            title: "Time-box planning",
            body: "Planning is bounded, so mobilisation converges on a credible plan rather than expanding indefinitely.",
          },
          {
            title: "Make accountability explicit",
            body: "Every workstream, output and decision carries a named accountable owner.",
          },
          {
            title: "Facilitate the work",
            body: "Mobilisation is facilitated with the teams doing the work, rather than written on their behalf.",
          },
          {
            title: "Build challenge into mobilisation",
            body: "Structured challenge is part of the process, so weak plans are surfaced before execution begins.",
          },
        ],
      },
    ],
  },
  {
    id: "detailed-activities",
    number: "03",
    title: "Detailed Activities",
    purpose:
      "Provide the detailed actions required to move from transaction preparation through to an approved mobilisation plan.",
    short: "Actions from preparation to an approved plan.",
    group: "Understand the roadmap",
    icon: "list",
    blocks: [
      {
        kind: "groups",
        items: ACTIVITY_GROUPS.map((title) => ({
          title,
          entries: [
            {
              title: "Activity detail",
              fields: [
                { label: "Core activity", value: PENDING_DETAIL },
                { label: "Outputs", value: PENDING_DETAIL },
                { label: "Owner", value: PENDING_DETAIL },
              ],
            },
          ],
        })),
      },
      {
        kind: "note",
        title: "Expandable by design",
        body: "Each stage above will hold the detailed activity table. Additional activities can be added within these groups without changing the page structure.",
      },
    ],
  },
  {
    id: "workstreams",
    number: "04",
    title: "Workstream Mobilisation",
    purpose:
      "Determine which workstreams need to be mobilised and what each workstream should focus on.",
    short: "Which workstreams to stand up, and their focus.",
    group: "Mobilise the programme",
    icon: "network",
    blocks: [{ kind: "entries", items: entriesFrom(WORKSTREAMS, WORKSTREAM_FIELDS) }],
  },
  {
    id: "roles",
    number: "05",
    title: "Roles & Mobilisation Team",
    purpose:
      "Define the minimum roles and responsibilities required to mobilise a transaction effectively.",
    short: "The minimum team required to mobilise.",
    group: "Mobilise the programme",
    icon: "users",
    blocks: [
      { kind: "entries", items: entriesFrom(ROLES, ROLE_FIELDS) },
      {
        kind: "note",
        title: "Minimum-standard role cards",
        body: "Each role above will carry a minimum-standard card covering purpose, responsibilities, decisions owned, inputs, outputs, interfaces and minimum expectations during mobilisation.",
      },
    ],
  },
  {
    id: "governance",
    number: "06",
    title: "Governance & Working Cadence",
    purpose:
      "Establish the forums, decision-making structure and meeting rhythm required during mobilisation.",
    short: "Forums, decision rights and meeting rhythm.",
    group: "Mobilise the programme",
    icon: "gavel",
    blocks: [{ kind: "entries", items: entriesFrom(FORUMS, FORUM_FIELDS) }],
  },
  {
    id: "artefacts",
    number: "07",
    title: "Mobilisation Artefacts",
    purpose:
      "Show the minimum artefacts that should exist before mobilisation can be considered complete.",
    short: "The minimum artefact set for completion.",
    group: "Mobilise the programme",
    icon: "files",
    blocks: [{ kind: "entries", items: entriesFrom(ARTEFACTS, ARTEFACT_FIELDS) }],
  },
  {
    id: "stage-gates",
    number: "08",
    title: "Stage Gates & Approval",
    purpose:
      "Make the decision gates through mobilisation explicit and prevent incomplete plans progressing into execution.",
    short: "Formal approval areas before execution.",
    group: "Control & assure",
    icon: "shield",
    emphasis: "gate",
    blocks: [
      {
        kind: "gate",
        heading: "Mobilisation approval areas",
        items: [
          "Purpose and outcomes",
          "Ownership",
          "Scope",
          "Plan",
          "Capacity and budget",
          "Readiness",
          "Testing and assurance",
          "Risk and decisions",
          "Ways of working",
          "Execution handover",
        ],
      },
      {
        kind: "list",
        heading: "Gate control structure (to be completed)",
        items: [
          "Stage-gate logic",
          "Mandatory gate criteria",
          "Required evidence",
          "Approval conditions",
          "Escalation logic",
          "Conditions preventing progression to the next stage",
        ],
      },
    ],
  },
  {
    id: "scaling",
    number: "09",
    title: "Scaling the Mobilisation",
    purpose: "Explain how the mobilisation approach should change depending on transaction complexity.",
    short: "How the response scales with complexity.",
    group: "Control & assure",
    icon: "sliders",
    blocks: [
      {
        kind: "compare",
        heading: "Complexity considerations",
        rows: [
          "Transaction archetype and perimeter",
          "Customer and product impact",
          "Technology and data",
          "Regulation and legal structure",
          "People and operating model",
          "Counterparty and country maturity",
          "Assurance and public impact",
        ],
      },
    ],
  },
  {
    id: "risks-guardrails",
    number: "10",
    title: "Risks, Guardrails & Escalations",
    purpose: "Show what teams should actively challenge and when issues need to be escalated.",
    short: "Failure patterns and escalation triggers.",
    group: "Control & assure",
    icon: "alert",
    blocks: [
      {
        kind: "list",
        heading: "Common mobilisation failure patterns and escalation triggers",
        items: [
          "Common mobilisation failure patterns",
          "Early escalation triggers",
          "Missing accountable ownership",
          "Missing information",
          "Unrealistic fixed dates",
          "Unclear readiness ownership",
          "Workstreams planning independently",
          "Lack of integrated dependencies",
        ],
      },
      {
        kind: "gate",
        heading: "Agent guardrails",
        items: [
          "Mandatory requirements",
          "Prohibited assumptions",
          "Escalation requirements",
          "Human approval requirements",
          "Evidence requirements",
          "Conditions under which the agent must stop and request additional information",
        ],
      },
    ],
  },
  {
    id: "first-10-days",
    number: "11",
    title: "First 10 Business Days",
    purpose: "Give deal teams a practical mobilisation sequence immediately following transaction initiation.",
    short: "A practical sequence from day one.",
    group: "Put it into action",
    icon: "calendar",
    blocks: [
      { kind: "entries", items: DAY_OVERVIEW },
      {
        kind: "list",
        heading: "Key outcomes at the end of the 10 days",
        items: [
          "Roles and responsibilities within core programme resources understood and agreed",
          "Governance structures agreed upon and stood up",
          "Key programme resource appointed, onboarded, and briefed",
          "Workstream objectives clear and documented",
          "Planning ready to begin, with expectations understood, windows defined, and key dates documented",
        ],
      },
    ],
  },
  {
    id: "agent",
    number: "12",
    title: "Mobilisation Agent",
    purpose:
      "Enable the future AI agent to use the mobilisation roadmap to generate transaction-specific mobilisation guidance.",
    short: "AI-enabled, transaction-specific guidance.",
    group: "Put it into action",
    icon: "sparkles",
    emphasis: "agent",
    blocks: [
      {
        kind: "agent",
        inputs: [
          "Deal archetype",
          "Transaction scope / perimeter",
          "Geography",
          "Deal complexity",
          "Key dates",
          "Parties involved",
          "Products / customers affected",
          "Technology and data impact",
          "Employee impact",
          "Regulatory requirements",
          "Known dependencies",
          "Existing deal documentation",
        ],
        logic: [
          "Logic to be defined",
          "The agent must not create a mobilisation roadmap based on insufficient transaction information",
        ],
        outputs: [
          "Mobilisation roadmap",
          "Recommended workstreams",
          "Required roles",
          "Mobilisation activities",
          "First 10-day plan",
          "Day-by-day actions",
          "Governance structure",
          "Required artefacts",
          "Stage gates",
          "Decision points",
          "Key risks / escalations",
          "Dependencies",
          "Mobilisation readiness view",
        ],
      },
    ],
  },
];

export const BUCKET_GROUPS: BucketGroup[] = [
  "Understand the roadmap",
  "Mobilise the programme",
  "Control & assure",
  "Put it into action",
];

export function getBucket(id: string) {
  return BUCKETS.find((b) => b.id === id);
}

/* ------------------------------------------------------------------ *
 * Guided navigation model: five primary areas, each with simple tabs.
 * Every tab points at existing bucket content, so nothing is lost — only
 * the way it is reached changes.
 * ------------------------------------------------------------------ */

/** Short stage labels used by the top-level journey rail. */
export const JOURNEY_STAGES = [
  { short: "Prepare", full: ROADMAP_STAGES[0] },
  { short: "Initiate", full: ROADMAP_STAGES[1] },
  { short: "Frame", full: ROADMAP_STAGES[2] },
  { short: "Diagnose", full: ROADMAP_STAGES[3] },
  { short: "Plan", full: ROADMAP_STAGES[4] },
  { short: "Integrate", full: ROADMAP_STAGES[5] },
  { short: "Approve", full: ROADMAP_STAGES[6] },
];

/** Stage detail (purpose, activities, outputs, exit gate) keyed by full name. */
export const STAGE_ENTRIES: Entry[] = stageEntries;

export interface AreaTab {
  id: string;
  label: string;
  /** Buckets whose content renders inside this tab. */
  bucketIds: string[];
  /** Optional one-line orientation shown above the content. */
  lede?: string;
}

export interface Area {
  id: string;
  number: string;
  label: string;
  blurb: string;
  icon: string;
  contains: string[];
  tabs: AreaTab[];
}

export const AREAS: Area[] = [
  {
    id: "first-10-days",
    number: "01",
    label: "First 10 Days",
    blurb: "Understand exactly what to do immediately after mobilisation begins.",
    icon: "calendar",
    contains: [
      "First 10 business days",
      "Day-by-day view",
      "Key actions",
      "Required decisions",
      "Required outputs",
    ],
    tabs: [
      { id: "overview", label: "Overview", bucketIds: [] },
    ],
  },
];

/* ---------------- First 10 days: visual roadmap lanes ---------------- */

export interface DayLane {
  /** Bucket of work shown on the Y axis. */
  workstream: string;
  /** First business day the bucket is active (1-10). */
  start: number;
  /** Last business day the bucket is active (1-10). */
  end: number;
}

export const DAY_LANES: DayLane[] = [
  { workstream: "Mobilise team", start: 1, end: 2 },
  { workstream: "Set up technology and collaboration mechanisms", start: 3, end: 3 },
  { workstream: "Appoint programme members", start: 4, end: 4 },
  { workstream: "Stand up governance", start: 5, end: 5 },
  { workstream: "Onboard broader teams", start: 6, end: 9 },
  { workstream: "Close mobilisation and release the next phase", start: 10, end: 10 },
];

export function getArea(id: string) {
  return AREAS.find((a) => a.id === id);
}

/* ---------------- First 10 days: day-by-day detail ---------------- */

export interface DayDetail {
  day: number;
  title: string;
  /** Short outcome statement shown at the top of the day view. */
  outcomeLede?: string;
  outcomes: string[];
  activities: string[];
  touchpoint?: { title: string; participants: string[] };
  ownership?: { lead: string; support: string[] };
  informationRequired: string[];
  completionGate: string[];
  /** True where the structure is in place but the content is not yet supplied. */
  placeholder?: boolean;
}

const PRINT = "Print this page off as a plan and fill in the key activity owner names.";

export const DAY_DETAILS: DayDetail[] = [
  {
    day: 1,
    title: "Establish mobilisation authority",
    outcomeLede: "Required outcome:",
    outcomes: [
      "Mobilise core transaction leadership, and identify broader leadership requirements",
    ],
    activities: [
      PRINT,
      "Confirm the transaction archetype, perimeter, effort size and complexity.",
      "Confirm critical transaction dates to confirm the planning window (Days 11 – 20), including the date of regulatory approval submissions (and whether a migration plan must be attached to these), the LD1 date as envisioned in the SPA or agreed alongside Counterparty, and other critical dates impacting planning (change freezes, legal constraints, long-stop dates, etc).",
      "Name the Executive Sponsor, Transaction Director, and Programme Manager.",
      "Across each of these roles agree on core responsibilities in mobilisation, decision rights and escalation triggers, and the mobilisation phase reporting cadence.",
      "Accountable Executive responsible for contacting & mobilising broader programme leadership, communicating the strategic intent of the deal, as well as interfacing with Absa leadership committees (Board, StratCo, etc).",
      "Transaction Director responsible for onboarding and selecting programme leadership (Workstream Execs) alongside AE based on SME knowledge, defining required governance structures, and leading reporting.",
      "Programme Manager responsible for standing up chosen governance, defining planning requirements, organising logistics, and supporting WS Execs in onboarding broader team members.",
      "Work with the legal team to draft or amend an NDA which can be used to onboard people into the insider list.",
      "Based on deal archetype, perimeter, complexity, and those involved in DD, TD and AE draft a list of required Workstreams, and socialise with CorpDev and Business stakeholders involved in DD for validation.",
      "Structure onboarding materials for these stakeholders, as well as broader team members to be onboarded in future.",
      "Contact the counterparty to understand their programme leadership structure, and set up regular touchpoints.",
      "Create an information request and assumptions log to track key information and inform planning.",
    ],
    touchpoint: {
      title: "Mobilisation alignment",
      participants: [
        "Executive Sponsor",
        "Transaction Director",
        "PMO lead",
        "Legal, where information-sharing permissions require confirmation",
      ],
    },
    ownership: {
      lead: "Transaction Director",
      support: ["Executive Sponsor", "Programme Manager / PMO lead", "Legal"],
    },
    informationRequired: [
      "Transaction archetype and perimeter",
      "Effort size and complexity",
      "Principal transaction dates",
      "Proposed leadership and key stakeholders",
      "Transaction status and legal permissions",
      "Known confidentiality restrictions",
    ],
    completionGate: [
      "Named mobilisation leadership",
      "Draft list of Workstream Execs",
      "Defined responsibilities, decision and escalation route",
      "Documented information-sharing permissions, restrictions, and NDA",
      "Initial information-request and assumptions log",
    ],
  },
  {
    day: 2,
    title: "Stand up the mobilisation team and secure capacity",
    outcomeLede: "Required outcome:",
    outcomes: [
      "Convert the Day 1 appointments into a functioning core mobilisation team with accepted roles, protected capacity and owned coverage gaps.",
    ],
    activities: [
      PRINT,
      "Define the minimum core-team roles needed to run mobilisation, including PMO coordination, Legal or Compliance, technology access administration, people or resourcing support and communications support.",
      "Nominate a named individual for each core-team role, using interim cover where a permanent resource is not yet available.",
      "Issue a concise role card to each core-team member covering mobilisation responsibilities, authority, required availability, escalation route and immediate deliverables.",
      "Obtain explicit acceptance from each core-team member and record any conditions, start-date constraints or delegated responsibilities.",
      "Check availability across Days 2 to 10 against BAU deadlines, leave, regulatory commitments and other change activity.",
      "Agree release, backfill or reprioritisation actions with the relevant line managers where committed capacity is insufficient.",
      "Allocate ownership and response dates for the information requests and assumptions opened on Day 1 without assessing or resolving their substantive content.",
      "Place the agreed mobilisation reporting cadence into calendars and confirm who prepares, reviews and circulates each update.",
    ],
    touchpoint: {
      title:
        "Core-team mobilisation huddle led by the Transaction Director, followed by targeted capacity discussions with line managers for any role that is not fully released",
      participants: ["Transaction Director", "Core mobilisation team", "Line managers"],
    },
    ownership: {
      lead: "Transaction Director",
      support: ["Programme Manager / PMO lead", "Line managers"],
    },
    informationRequired: [
      "Day 1 mobilisation mandate and named transaction leadership",
      "Day 1 decision rights, escalation triggers and reporting cadence",
      "Current organisation charts and resource availability",
      "Known BAU deadlines, leave and competing change commitments",
      "Available backfill, contractor and specialist-support routes",
      "Day 1 information-request and assumptions log",
    ],
    completionGate: [
      "Accepted core-team roster with named deputies and contact details",
      "Issued role cards and recorded acceptance conditions",
      "Day 2 to Day 10 capacity view, including BAU release and backfill actions",
      "Owned vacancy and capacity-exception list with resolution dates",
      "Allocated information requests and assumptions",
      "Published mobilisation meeting and reporting calendar",
    ],
  },
  {
    day: 3,
    title: "Activate technology and collaboration mechanisms",
    outcomeLede: "Required outcome:",
    outcomes: [
      "Provide the core team with a secure, tested and controlled environment for communication, document management and mobilisation records.",
    ],
    activities: [
      PRINT,
      "Translate the Day 1 information-sharing permissions into role-based access groups for internal, joint and restricted material.",
      "Select the approved collaboration, document-management, meeting and task-tracking tools that will be used during mobilisation (Virtual Data Room, etc).",
      "Create the controlled workspace sharepoint structure, including folders or channels for governance, legal material, people records, mobilisation logs, meeting packs and onboarding evidence.",
      "Apply naming, version, status, ownership, retention and approval conventions to the workspace and publish them at the point of use.",
      "Create programme distribution lists, Teams channels, meeting links and shared calendars using the Day 2 roster, and assign an owner to update these as the programme expands.",
      "Set up an NDA tracker to ensure those who are engaging with the programme are on the insider list.",
      "Raise access, licence, device and guest-account requests for all core-team members and track each request to completion.",
      "Load the Day 1 information-request and assumptions log into the controlled location and confirm edit, review and approval rights.",
      "Test access, document upload, version recovery, meeting entry and notification flows.",
      "Issue a one-page working guide and require each core-team member to acknowledge that access works and the control rules are understood.",
    ],
    touchpoint: {
      title: "Technology and information-control setup session",
      participants: [
        "Programme Manager",
        "PMO",
        "Legal or Compliance",
        "Information security",
        "Records management",
        "Nominated workspace administrator",
      ],
    },
    ownership: {
      lead: "Programme Manager",
      support: ["PMO", "Legal or Compliance", "Nominated workspace administrator"],
    },
    informationRequired: [
      "Day 1 information-sharing permissions, restrictions and NDA position",
      "Day 2 core-team roster and contact details",
      "Absa-approved collaboration and records-management standards",
      "Data-classification and insider-list requirements",
      "Available licences, devices and service-desk support",
    ],
    completionGate: [
      "Live controlled workspace and approved collaboration channels",
      "Published naming, versioning, retention and approval conventions",
      "Live distribution lists, shared calendars and meeting channels",
      "Live NDA tracker",
    ],
  },
  {
    day: 4,
    title: "Confirm workstream leadership & mobilisation capacity",
    outcomeLede: "Required outcome:",
    outcomes: [
      "Appoint the broader programme leadership and confirm that each active workstream has sufficient authority and capacity to begin mobilisation.",
    ],
    activities: [
      PRINT,
      "TD and AE to jointly agree on Workstream Executive appointments per Workstream and socialise these with the relevant Group Exec.",
      "Confirm that each Workstream Exec appointee accepts accountability for the workstream outcomes.",
      "Support the Workstream Exec to appoint a Workstream Lead (WSL) using the Workstream Lead role card, the key capabilities required as laid out in the Operating Model, AE and Workstream Exec's knowledge of individuals' skill and capabilities, and TD's SME knowledge of previous transaction and lessons learnt.",
      "Provide final signoff on all Workstream Lead appointments and validate each appointee's availability through the mobilisation window, including known BAU deadlines, leave, regulatory commitments and competing change activity.",
      "Identify required BAU backfill, specialist support, external advisers or temporary capacity and record the route for securing each resource.",
      "Update the programme organisation chart, contact directory and accountability matrix, clearly marking vacancies and interim appointments.",
      "Support each WSL in engaging their broader team members, sharing key skills required by workstream.",
      "Support Workstream Execs and WSL in understanding in-country maturity to define initial split of spoke activities between in-country and SA central function teams, to inform stakeholder engagement and planning requirements.",
      "Contact the counterparty to receive their list of WSL, and ensure the two sets of stakeholders set time to meet and discuss joint objectives.",
    ],
    touchpoint: {
      title:
        "Briefing session with Workstream Execs to enable WSL appointment. Briefing session with WSL. Daily standups within Central Hub team.",
      participants: ["Transaction Director", "Executive Sponsor", "Workstream Execs", "Workstream Leads"],
    },
    ownership: {
      lead: "Transaction Director",
      support: ["Executive Sponsor", "Workstream Execs", "Programme Manager"],
    },
    informationRequired: [
      "Day 1 draft required workstream list",
      "Confirmed transaction perimeter, effort size and complexity assessment",
      "Functional and country organisation structures",
      "Known BAU commitments, leave and competing change demand",
      "Counterparty programme leadership structure and principal contacts",
    ],
    completionGate: [
      "Confirmed workstream map",
      "Named Workstream Executives, Workstream Leads",
      "Agreed Central Hub, functional-spoke and regional-spoke initial accountability split",
      "Documented capacity, backfill and specialist-support gaps with owners and dates",
      "Updated programme organisation chart, contact directory and accountability matrix",
    ],
  },
  {
    day: 5,
    title: "Activate governance and programme controls",
    outcomeLede: "Required outcome:",
    outcomes: [
      "Decide upon and stand up governance, information-control and reporting mechanisms to enable workstream activity to begin",
    ],
    activities: [
      PRINT,
      "Leveraging the transaction governance structure set out in the Operating Model, define whether any changes or tweaks are required based on the nature of the transaction.",
      "For each forum, leveraging the ToRs defined in the Operating Model materials, set out cadence and dates; members, contributors, chairs, and facilitators; inputs, outputs, standing agenda; decision mandates and escalation paths; and objectives.",
      "Define the members for the Internal SteerCo, and share the terms of reference with them.",
      "Check requirements for Joint SteerCo set out in the SPA, share a list of proposed Absa attendees with the counterparty, and request their list. Ensured the both Absa and counterparty have sufficient representation across key impacted areas.",
      "Agree and book first Joint PMO meeting with counterparty.",
      "Leveraging material set out in the Operating Model, design the broader governance and information flow between forums.",
      "Align internal governance dates with existing Absa committee cycles and the counterparty's proposed governance cadence.",
      "Assign pack production, quality review, circulation, minute taking, action chasing and record retention responsibilities.",
      "Publish the initial mobilisation governance calendar, including submission deadlines, pre-reads, decision dates and report-production cut-offs.",
      "Book the first Internal SteerCo to take place on Day 10.",
      "Expand the Day 1 information-request and assumptions log into a controlled suite comprising RAID, decisions, dependencies, actions and change requests.",
      "Define mandatory fields, status values, RAG criteria, ageing rules, escalation thresholds and closure evidence for each programme log.",
      "Run a governance dry-run using one sample decision and one sample escalation to test routing, authority, record capture.",
    ],
    touchpoint: {
      title:
        "PMO controls workshop with the Transaction Director and Programme Manager, followed by a governance Terms of Reference review with the Executive Sponsor and Legal or Compliance where required",
      participants: [
        "Transaction Director",
        "Programme Manager",
        "Executive Sponsor",
        "Legal or Compliance, where required",
      ],
    },
    ownership: {
      lead: "Programme Manager",
      support: ["Transaction Director", "PMO", "Executive Sponsor"],
    },
    informationRequired: [
      "Day 1 decision rights, escalation triggers and mobilisation reporting cadence",
      "Confirmed Day 2 leadership and workstream structure",
      "Information-sharing permissions and access restrictions",
      "Absa committee calendar and submission requirements",
      "Counterparty governance forums and proposed cadence",
      "Governance structures and ToRs as set out in the Operating Model",
    ],
    completionGate: [
      "Approved mobilisation governance map and forum Terms of Reference",
      "Published governance and reporting calendar",
      "Live controlled workspace with role-based access",
      "Live RAID, decision, dependency, action, change and information-request logs",
    ],
  },
  {
    day: 6,
    title: "Prepare broader-team onboarding",
    outcomeLede: "Required outcome:",
    outcomes: [
      "Make the onboarding pack, legal clearances, access requests, invitations and tracking mechanisms ready for sequenced rollout to the wider programme.",
    ],
    activities: [
      PRINT,
      "Segment the wider programme population into leadership, priority delivery, country or regional, enabling-function, specialist and third-party onboarding groups.",
      "Sequence the onboarding groups according to mobilisation need, legal permission, leadership availability and access lead time.",
      "Update the Day 1 onboarding material with the confirmed organisation, role model, governance, collaboration tools and contact routes from Days 2 to 5.",
      "Create role-specific appendices showing each audience's responsibilities, required time commitment, meeting obligations and immediate mobilisation actions.",
      "Have Legal or Compliance validate the transaction description, confidentiality wording, insider-list process, clean-team boundaries and permitted disclosures.",
      "Check each proposed attendee against NDA, insider-list, conflicts, employment status and third-party engagement requirements.",
      "Raise batched workspace, meeting, licence, guest-account and restricted-area access requests for cleared attendees.",
      "Nominate presenters, facilitators, access support, Q&A owners and attendance administrators for every session.",
      "Create attendance, clearance, access, acknowledgement, question and no-show trackers with owners and closure dates.",
      "Dry-run the onboarding session and correct unclear content, failed links, missing permissions and timing issues before launch.",
    ],
    touchpoint: {
      title: "Onboarding readiness review",
      participants: [
        "Programme Manager",
        "PMO",
        "Legal or Compliance",
        "People",
        "Communications",
        "Information security",
        "Workspace administrator",
      ],
    },
    ownership: {
      lead: "Programme Manager",
      support: ["PMO", "Legal or Compliance", "People", "Communications"],
    },
    informationRequired: [
      "Day 1 draft onboarding material and NDA or insider-list approach",
      "Day 4 confirmed programme organisation and contact directory",
      "Day 5 governance map, calendar and operating guide",
      "Day 3 workspace structure and access model",
      "Legal, confidentiality, clean-team and third-party requirements",
      "Audience availability and access-provision lead times",
    ],
    completionGate: [
      "Approved onboarding pack and role-specific appendices",
      "Sequenced onboarding population and session schedule",
      "Named onboarding presenters, facilitators and support owners",
      "Live attendance, access, acknowledgement, question and no-show trackers",
    ],
  },
  {
    day: 7,
    title: "Brief programme leadership",
    outcomeLede: "Required outcome:",
    outcomes: [
      "Align appointed leaders on the transaction context, mobilisation responsibilities, governance, controls and their accountability for onboarding their teams.",
    ],
    activities: [
      PRINT,
      "Verify that every attendee is cleared, listed where required and able to access the approved workspace before the session begins.",
      "Brief Workstream Execs using materials covering core transaction objectives; information sharing restrictions; Workstream Exec roles, responsibilities, and decision rights; WSL key requirements and role card; key considerations for their workstream; explicit acceptance of the role; and actions and next steps.",
      "Brief each WSL using materials covering core transaction objectives; information sharing restrictions; WSL roles, responsibilities, and decision rights; key considerations for their workstream; planning window requirements and proposed dates; explicit acceptance of the role; and actions and next steps.",
      "Explain the ten-day mobilisation objective and state explicitly that detailed planning and gap assessment begin after the mobilisation gate.",
      "Explain the governance forums, delegated decision rights, escalation triggers, submission cut-offs and urgent-decision route.",
      "Demonstrate the controlled workspace, communication channels, document rules and required use of mobilisation records.",
      "Reinforce NDA, insider-list, clean-team, competition, employee, customer and other information-sharing restrictions relevant to leaders.",
      "Review each leader's responsibility for completing team appointments, legal clearance, access and onboarding by the agreed date.",
      "Confirm the mobilisation meeting commitments and availability of each leader and deputy through Day 10.",
      "Capture questions, access failures, role ambiguities and unresolved appointments in the relevant controlled record with owners and dates.",
      "Obtain acknowledgement of the leadership brief and issue the approved material and immediate mobilisation actions.",
    ],
    touchpoint: {
      title: "Formal programme-leadership launch",
      participants: [
        "Executive Sponsor (chair)",
        "Transaction Director (chair)",
        "Programme Manager",
        "PMO",
        "Legal or Compliance",
        "Workspace administrator",
      ],
    },
    ownership: {
      lead: "Executive Sponsor",
      support: ["Transaction Director", "Programme Manager", "PMO", "Legal or Compliance"],
    },
    informationRequired: [
      "Approved onboarding pack and legal clearance list",
      "Confirmed programme organisation and accountability matrix",
      "Governance map, Terms of Reference and calendar",
      "Workspace guide and role-based access register",
      "Mobilisation roster, capacity exceptions and outstanding vacancies",
      "Counterparty leadership and interface information available at this point",
    ],
    completionGate: [
      "Completed programme-leadership launch and attendance record",
      "Leadership acknowledgement of roles, controls and information restrictions",
      "Confirmed Workstream Exec and WSL availability through Day 10",
      "Owned list of access, role, appointment and clearance exceptions",
      "Confirmed broader-team onboarding responsibilities and completion dates",
      "Issued leadership mobilisation actions",
    ],
  },
  {
    day: 8,
    title: "Onboard priority programme teams",
    outcomeLede: "Required outcome:",
    outcomes: [
      "Make the priority functional, country and enabling teams operational within the agreed mobilisation controls and working environment.",
    ],
    activities: [
      PRINT,
      "Deliver the approved transaction, perimeter and mobilisation briefing to priority functional, country and enabling teams.",
      "Introduce each team's Executive, Lead, deputy, coordinator, regional contacts, PMO contact and counterparty interface where confirmed.",
      "Explain mobilisation responsibilities, required availability, governance attendance, escalation route and immediate administrative actions.",
      "Demonstrate the approved collaboration channels, controlled folders, meeting calendar and record-keeping conventions.",
      "Test workspace, meeting and restricted-area access live.",
      "Confirm that every attendee understands the information-sharing restrictions and records the required NDA, insider-list or policy acknowledgement.",
      "Capture role gaps, availability constraints, conflicts, access failures and unanswered mobilisation questions with owners and closure dates.",
      "Update the programme organisation chart and contact directory for substitutions, new deputies and confirmed local representatives.",
      "Record attendance and follow up no-shows, late joiners and uncompleted acknowledgements within the same business day.",
      "Obtain the relevant Workstream Executive's confirmation that the priority team is mobilised or that named exceptions remain.",
    ],
    touchpoint: {
      title:
        "Onboarding sessions led by the relevant Workstream Executives and Programme Manager, with live PMO, Legal or Compliance and access-support coverage",
      participants: [
        "Workstream Executives",
        "Programme Manager",
        "PMO",
        "Legal or Compliance",
        "Access support",
      ],
    },
    ownership: {
      lead: "Workstream Executives",
      support: ["Programme Manager", "PMO", "Legal or Compliance"],
    },
    informationRequired: [
      "Audience list and access tracker",
      "Approved onboarding pack and role-specific appendices",
      "Programme organisation, contact directory and accountability matrix",
      "Governance calendar and required forum attendance",
      "Workspace guide and information-sharing restrictions",
    ],
    completionGate: [
      "Completed initial onboarding and attendance record",
      "Priority-team access and acknowledgement completion status",
      "Updated organisation chart, contact directory and deputy coverage",
      "Owned onboarding exceptions with resolution dates",
      "Recorded Workstream Executive confirmation for each priority team",
      "Updated mobilisation dashboard for Day 9 follow-up",
    ],
  },
  {
    day: 9,
    title: "Complete wider onboarding and connect sessions",
    outcomeLede: "Required outcome:",
    outcomes: [
      "Bring the remaining approved programme participants into the mobilisation and establish clear, legally permitted interfaces across teams and organisations.",
    ],
    activities: [
      PRINT,
      "Reconcile the remaining attendee list against appointments, legal clearance, third-party engagement and access status.",
      "Deliver the approved onboarding briefing to a second wave of functional, country, specialist, adviser and support participants.",
      "Test workspace, meeting and restricted-area access and close or escalate failures.",
      "Collect attendance, role, confidentiality and policy acknowledgements and follow up all incomplete records.",
      "Pair Absa PMO and Workstream Leads with named counterparty counterparts where communication is legally permitted.",
      "Publish a joint interface directory showing primary contacts, deputies, approved channels, permitted topics and escalation contacts.",
      "Confirm attendance for Absa SteeCo, joint SteerCo, Transaction Working Group, and Joint PMO forums.",
      "Agree the administrative protocol for requesting information, circulating materials, recording decisions and escalating unanswered requests.",
      "Resolve duplicate appointments, unowned support roles and outdated contact details in the programme organisation records.",
      "Consolidate all no-shows, access failures, clearance delays, capacity constraints and unconfirmed counterpart contacts into the mobilisation exception log.",
      "Prepare the Day 10 mobilisation gate pack using evidence from the appointment, access, governance and onboarding records. Gate pack should include confirmation that governance is stood up, including governance calendar; confirmation of key programme appointments; confirmation of briefing sessions and explicit acceptance; confirmation of shared workspaces and collaboration tools in place; confirmation of counterparty key stakeholders and parallel governance; and key next steps for planning phase.",
    ],
    touchpoint: {
      title:
        "Second wave of onboarding sessions followed by a joint-connect confirmation between the Absa and counterparty PMO and Workstream Leads",
      participants: [
        "Programme Manager",
        "PMO",
        "Workstream Leads",
        "Counterparty PMO and Workstream Leads",
      ],
    },
    ownership: {
      lead: "Programme Manager",
      support: ["PMO", "Workstream Leads", "Legal or Compliance"],
    },
    informationRequired: [
      "Wave 2 audience, clearance, engagement and access records",
      "Approved onboarding pack and programme operating guide",
      "Counterparty organisation and contact information received to date",
      "Joint-forum membership and information-sharing permissions",
      "Day 10 mobilisation gate criteria and evidence checklist",
    ],
    completionGate: [
      "Completed Wave 2 onboarding and acknowledgement",
      "Published joint directory and communication protocol",
      "Confirmed joint-forum attendance",
      "Consolidated mobilisation exception log with owners and dates",
      "Draft mobilisation Day 10 gate pack",
    ],
  },
  {
    day: 10,
    title: "Close mobilisation via stage gate, and release the next phase",
    outcomeLede: "Required outcome:",
    outcomes: [
      "Confirm that people, tools, governance, legal controls and interfaces are operational, then authorise planning and gap assessment to begin after Day 10.",
    ],
    activities: [
      PRINT,
      "Reconcile the final programme organisation against accepted appointments, coverage, and capacity commitments.",
      "Verify that required users can access the correct collaboration channels, meeting links, controlled folders and restricted areas.",
      "Confirm that governance forums are staffed and scheduled and that agenda, pack, minute, action, decision and escalation controls operate as designed.",
      "Confirm completion of required NDA, insider-list, clean-team, conflict, policy and third-party engagement steps.",
      "Confirm that leadership and broader-team onboarding attendance, acknowledgements, no-shows and follow-up actions are recorded.",
      "Validate the internal and counterparty contact directories, approved communication channels and escalation contacts.",
      "Review every open mobilisation exception and classify it as closed, accepted with conditions, or blocking the next phase.",
      "Assign a named owner, due date, escalation route and closure evidence to each condition that will remain open after Day 10.",
      "Agree the start date, participants, required inputs and invitations for post-mobilisation scoping, planning and gap-assessment sessions without commencing those activities, these include workstream charters, workstream bricks and workstream blueprints, to enable creation of workstream milestones.",
      "Hold the first Absa Internal SteerCo to present the gate pack with recommendation and record the decision to proceed, proceed conditionally or hold, and to confirm the Terms of Reference for this session, including objectives and mandate.",
      "Issue the mobilisation completion pack, decision record, open conditions and authorised next-phase launch arrangements to all programme leaders.",
    ],
    touchpoint: {
      title: "Mobilisation gate review with the Absa Internal SteerCo",
      participants: ["Absa Internal SteerCo", "Executive Sponsor", "Transaction Director", "Programme Manager"],
    },
    ownership: {
      lead: "Transaction Director",
      support: ["Executive Sponsor", "Programme Manager", "PMO"],
    },
    informationRequired: [
      "Final appointment, capacity, deputy and organisation records",
      "Workspace, licence, access and support-completion registers",
      "Governance calendar, Terms of Reference",
      "Legal-clearance, confidentiality and acknowledgement records",
      "Leadership and broader-team onboarding completion evidence",
      "Counterparty directory and mobilisation exception log",
    ],
    completionGate: [
      "Approved mobilisation completion dashboard and evidence pack",
      "Recorded gate decision to proceed, proceed conditionally or hold",
      "Closed or conditionally accepted mobilisation exception log",
      "Confirmed programme organisation, access model, governance and interface baseline",
      "Authorised date and attendee list for post-Day 10 planning and gap assessment",
      "Issued mobilisation closure note and next-phase launch invitations",
    ],
  },
];

export function getDayDetail(day: number) {
  return DAY_DETAILS.find((d) => d.day === day);
}
