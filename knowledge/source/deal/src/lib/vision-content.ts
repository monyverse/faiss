import { Gauge, GraduationCap, Handshake, Network, Rocket, ShieldCheck } from "lucide-react";

/** Content for the combined Vision page. Wording moved from the former Vision and Executive Summary pages. */

export const FRAGMENTED = [
  "Individual-led execution, reliant on a small contractor-heavy team",
  "Previous-deal knowledge reapplied with ad hoc add-ons",
  "Reactive mobilisation once a deal appears",
  "Functional support given side of the desk, with no clear owners",
  "Capacity ceiling of one or two simple deals at a time",
];

export const CONNECTED = [
  "An institutional, repeatable execution capability",
  "Mechanisms and tools to run more concurrent and complex deals",
  "Proactive readiness ahead of the next transaction",
  "Clear functional owners, accountable for building capability",
  "Partner capacity scaled to transaction demand",
];

export const BUILD_STEPS = [
  { step: "01", title: "Define the deal archetype", body: "Establish the six core acquisition and divestment archetypes and what makes each one different." },
  { step: "02", title: "Apply the relevant lifecycle", body: "Attach the end-to-end lifecycle, activities and decision points that apply to that archetype." },
  { step: "03", title: "Mobilise the Hub & Spoke model", body: "Show how the central Hub, functional teams and country teams work together and who owns which decisions." },
  { step: "04", title: "Use the right artefacts", body: "Consolidate and improve templates using lessons from previous Absa transactions, stakeholder input and external experience." },
  { step: "05", title: "Apply through portal and AI agent", body: "The portal gives the executive view; the AI agent gives delivery teams guided support from the same execution model." },
  { step: "06", title: "Capture lessons for the next deal", body: "Feed what worked, and what did not, back into the blueprint so the next transaction starts stronger." },
];

export const OUTCOMES = [
  {
    ring: "Core execution hub",
    items: [
      { title: "Primary execution authority", body: "Owns the standards, governance and deal architecture that make execution repeatable rather than personality-led." },
      { title: "Better decisions on cost and time", body: "Deal architecture supports credible cost, duration and resourcing estimates from the outset." },
    ],
  },
  {
    ring: "Functional execution spokes",
    items: [
      { title: "Clear, named owners", body: "Functional ownership is formalised in Technology, Data, HR, Finance, Product and Procurement, not carried side of the desk." },
      { title: "Early, archetype-led mobilisation", body: "Each function knows when it activates, what it delivers and how its capacity scales with the deal." },
    ],
  },
  {
    ring: "Partner accelerator",
    items: [
      { title: "Capacity scaled to demand", body: "Pre-agreed engagement models per functional area can be activated as deal volume and complexity rise." },
      { title: "Capability gaps covered", body: "Targeted specialist support is brought in deliberately, instead of ad hoc contractor engagements." },
    ],
  },
];

export const VISION = {
  title: "The M&A Capability Hub provides a single source of practical guidance for M&A execution.",
  body: "The Hub enables Absa teams to deliver transactions by bringing together execution best practice, proven frameworks and expertise knowledge. It translates this knowledge into practical guidance, templates and tools that teams can use throughout the transaction lifecycle.",
  items: [
    { icon: Network, title: "A repeatable execution model", body: "Moves Absa from individual-led, experience-based delivery to an institutional capability that can run more concurrent and more complex transactions" },
    { icon: Rocket, title: "Earlier, faster mobilisation", body: "Mobilisation is guided by the deal archetype, so internal teams, regional Spokes and partners stand up quickly instead of starting from a blank page" },
    { icon: ShieldCheck, title: "Clear ownership and governance", body: "Named owners for each functional area, with the decision rights, structure and practical guidance needed to execute rather than side-of-the-desk effort" },
    { icon: Handshake, title: "Scalable partner capacity", body: "Pre-agreed engagement models per functional area that can be activated to add capacity and close capability gaps as deal volume and complexity rise" },
    { icon: GraduationCap, title: "Proactive readiness", body: "Mechanisms, tools and lessons that make each transaction a stronger starting point for the next, rather than a reactive rebuild" },
    { icon: Gauge, title: "Better predictability and risk management", body: "Brings these capabilities together to give Absa greater predictability and control over risk, particularly when managing multiple transactions alongside BAU priorities" },
  ],
};

export const OVERARCHING_PRINCIPLES = {
  label: "Overarching principles",
  title: "These are the principles guiding all of the work",
  points: [
    "Retain standard non-M&A, execution methodologies\nExisting Absa methodologies with established governance, controls and SME-led execution, such as Due Diligence, legal drafting, technology delivery and other functional processes, are not challenged or reworked. Instead, they are integrated into the M&A lifecycle, with a focus on how each function contributes to successful transaction delivery.",
    "Maintain consistency where viable\nWherever possible, the lifecycles should have consistent stages, purposes, and areas of focus, to enable a consistent and repeatable M&A capability within Absa",
    "Ground in experience, not theory - Lifecycles are based on best practice, but also on first hand experience on real deals. They are grounded in lived experience, rather than being academically built from first principles",
    "Use tooling to accelerate, not replace, human judgement\nFrameworks, templates and knowledge should help teams make faster, better-informed decisions, while experienced judgement remains critical to applying them in the context of each deal.",
  ],
};

export interface Lens {
  id: string;
  label: string;
  question: string;
  heading: string;
  subHeading: { title?: string; text: string };
  points: string[];
  included: string[];
  visual?: { label: string; items: string[]; numbered?: boolean };
  principle?: { label: string; title: string; points: string[] };
  link: { to: string; label: string };
}

export const LENSES: Lens[] = [
  {
    id: "archetypes",
    label: "Deal Archetypes",
    question: "What is the broad structure of the transaction and what level of complexity does it bring?",
    heading: "Archetypes",
    subHeading: {
      title: "What are the archetypes for?",
      text: "The archetype is the first level of order applied to potentially infinite deal variables - classifying what the deal is trying to achieve into broad buckets of work correlated with what needs to be done",
    },
    points: [
      "Archetypes are the first degree of order applied to a disparate system: classifying deals by their intended outcomes and objectives",
      "Each archetype fundamentally changes where execution must focus,  driven by the deal perimeter, with complexity factors such as jurisdiction, product set, maturity, and regulatory landscape layered on top ",
      "The role of any specific team within each archetype may or may not differ - this difference is what is surfaced within the lifecycles and operating model",
    ],
    included: [
      "Classification principles",
      "Deal complexity factors & scoring logic",
      "Inclusion & exclusion criteria for each archetype",
      "Examples, nuances, timelines, and follow up questions for each archetype",
      "Workstream sizing logic",
      "Cost estimate logic",
    ],
    visual: {
      label: "The six deal archetypes",
      items: [
        "Balance-sheet acquisition",
        "Partial-business acquisition",
        "Full-business acquisition",
        "Balance-sheet divestment",
        "Partial-business divestment",
        "Full-business divestment",
      ],
    },
    link: { to: "/deal-lifecycle", label: "Explore the deal archetypes" },
  },
  {
    id: "lifecycles",
    label: "Deal Lifecycles",
    question: "What do we need to do to achieve this?",
    heading: "Lifecycles",
    subHeading: {
      title: "What are lifecycles for?",
      text: "Lifecycles turns outcome set out by the archetype into an executionable set of steps",
    },
    points: [
      "Deal lifecycles spell out this execution nuance, and help to set out what it is that actually changes, and where focus should be as the deal progresses",
      "Pre-signature,  the focus is on where the Inorganic Change Team should focus, and what questions they should be asking to enable execution",
      "The real nuance is surfaced post-signature through to Hypercare, which outlines what needs to be done at each phase based on the archetypes, the time-based assumptions for these phases, and they key nuances for each archetype",
    ],
    included: [
      "Individualised lifecycles for each deal archetype",
      "Purpose of each phase of the lifecycle",
      "Inorganic Change Team's role per phase",
      "Key focus areas, activities, and stumbling blocks per phase",
      "Nuances of each phase for each deal archetype",
      "Key artefacts and templates relevant to each phase",
    ],
    visual: {
      label: "The lifecycle phases",
      numbered: true,
      items: [
        "Due Diligence",
        "Legal Drafting & Signature",
        "Mobilisation & Planning",
        "Programme Execution",
        "Business Testing",
        "Client Onboarding & LD1 Readiness",
        "Dress Rehearsals",
        "Go/No-Go",
        "Cutover",
        "Hypercare",
      ],
    },
    link: { to: "/deal-lifecycle", label: "Open the Deal Lifecycle" },
  },
  {
    id: "operating-model",
    label: "Operating Model",
    question: "How do we deliver on our goals?",
    heading: "Operating Model is where this comes together",
    subHeading: {
      title: "What is the Operating Model for?",
      text: "The Operating Model takes what needs to be done, and returns how these things should be done by setting out  standardised structures for executing deals",
    },
    points: [
      "The structure must remain largely the same across archetypes, to drive consistency and repeatability",
      "What changes is what the workstreams must be focused on, the scale of their teams, and the key capabilities required",
    ],
    principle: {
      label: "Core principles",
      title: "How the operating model is built",
      points: [
        "The Operating Model is based on Hub & Spoke structure - A Central Hub is supported by regional and functional spokes, with ownership over differing parts of the transaction",
        "The Hub is a Centre of Excellence - The Hub ensures consistency of delivery quality and expertise across multiple deals",
        "In-Country Accountable Executives are accountable for successful go-live - Country stakeholders must be ultimately accountable for successful execution of integration to drive ownership",
        "Spokes are where delivery happens - The Spokes drive execution of the delivery activities critical to making go-live happen",
        "Within the Spokes in-country teams are responsible for local execution at a minimum\nAs much execution as possible should happen in-country, with the minimum standard being execution of items requiring local nuance. Execution responsibility increases based on country maturity, determined by centre teams",
        "Central functional Spokes will support execution where needed - Where in-country teams do not have the requisite skills or capabilities to deliver, central functions will support",
        "Clear accountability must sit with the teams that own the outcome - In-country and central teams should have explicit ownership for the decisions and delivery activities they control, with shared accountability where delivery is dependent on both",
        "Decisions should have a bias for speed\nWhere BAU decision-making processes are not fit for purpose, an alternative may need to be found without weakening the control fabric of the organisation.",
        "Experienced colleagues must support new transactions\nAbsa colleagues who have gained experience of M&A transactions via previous deals have an obligation to support new deals by acting as an Experienced Coach",
      ],
    },
    included: [
      "Overall transaction set up structure, roles, and responsibilities",
      "Transaction governance structure, and ToRs",
      "Central Hub mandates, roles, and responsibilities",
      "Detailed role cards and mandates for key transaction roles",
      "Decision rights, overall responsibilities, key capabilities, and milestones & activities for each workstream",
      "Principles for scaling in-country involvement based on maturity",
      "Minimum in-country skills required per workstream",
    ],
    link: { to: "/operating-model", label: "Open the operating model" },
  },
  {
    id: "mobilisation-toolkit",
    label: "Mobilisation Toolkit",
    question: "How do we stand up this delivery quickly & efficiently? ",
    heading: "Mobilisation Toolkit",
    subHeading: {
      title: "What is the Mobilisation Toolkit for?",
      text: "The mobilisation toolkit sets out how a deal should go from theory to reality, where the focus should be initially, and how to get people up to speed quickly",
    },
    points: [
      "The mobilisation phase should follow a standard structure to ensure consistency and repeatability, leveraging operatinig model considerations to find the right people and make the right decisions quickly and easily",
    ],
    included: [
      "Mobilisation roadmap",
      "Templates for AI-enabled population",
      "Key governance ToRs",
      "Onboarding material creation guidelines",
      "Learning pathways for deal teams and workstream members",
    ],
    link: { to: "/mobilisation", label: "Open the mobilisation roadmap" },
  },
];

/** Splits "Title\nBody" or "Title - Body" source strings. */
export function splitPoint(point: string) {
  const nlIdx = point.indexOf("\n");
  const dashIdx = point.indexOf(" - ");
  const idx = nlIdx > -1 ? nlIdx : dashIdx;
  const sepLen = nlIdx > -1 ? 1 : 3;
  return { title: idx > -1 ? point.slice(0, idx) : null, body: idx > -1 ? point.slice(idx + sepLen) : point };
}
