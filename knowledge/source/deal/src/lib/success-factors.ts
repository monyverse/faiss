/** Key success factors that must be true for the M&A operating model to work in practice. */
export type SuccessFactor = {
  id: string;
  number: number;
  title: string;
  summary: string;
  decisionMaker: string;
  description: string[];
  impact: string[];
};

export const SUCCESS_FACTORS: SuccessFactor[] = [
  {
    id: "budget-ownership",
    number: 1,
    title: "Clear financial / budget ownership",
    summary:
      "The Transaction Director can spend the approved budget without line-item approvals.",
    decisionMaker: "Transaction Director",
    description: [
      "The Transaction Director should be empowered to spend the approved budget as they see fit to drive transaction success.",
      "Initial budget approval should be sought alongside CorpDev and the Accountable Executive, but once secured, approvals for individual line items should not be required.",
    ],
    impact: [
      "Federated or unclear financial decision-making powers mean the transaction does not have the capacity and skills required to drive execution.",
      "Heavy approval burdens slow decision-making and onboarding, placing the transaction at risk.",
    ],
  },
  {
    id: "executive-buy-in",
    number: 2,
    title: "Top-Down Executive buy-in",
    summary:
      "Executives own outcomes in their areas and stay close enough to decide at short notice.",
    decisionMaker: "Accountable Executive",
    description: [
      "Executives, including the Accountable Executive and Workstream Executives, must have direct ownership of outcomes within their areas.",
      "They should be sufficiently close to execution to make decisions at short notice where required.",
      "They should ultimately be held accountable for transaction outcomes within their area.",
    ],
    impact: [
      "Workstreams lack sufficient strategic direction.",
      "Delivery teams may become confused by multiple or competing priorities.",
      "Executives may not be sufficiently involved to make key decisions quickly, increasing delivery timelines and execution risk.",
    ],
  },
  {
    id: "capability-decision-making",
    number: 3,
    title: "Capability decision making",
    summary:
      "Workstream Leads can flag and close capability gaps early, with dedicated capacity where needed.",
    decisionMaker: "Workstream Leads",
    description: [
      "Workstream Leads should be empowered to identify, flag and remediate capability or skills gaps as early as possible.",
      "Workstream teams should have the capabilities required to execute successfully.",
      "Dedicated capacity should be provided where required rather than simply repositioning internal roles; external specialists should be engaged where necessary.",
    ],
    impact: [
      "Non-specialists may attempt specialist execution, increasing the likelihood that key issues are missed or identified late.",
      "Workstream Leads may be unable to access the specialist support required to close capability gaps, increasing execution risk.",
    ],
  },
  {
    id: "high-standards",
    number: 4,
    title: "High standards, robustly maintained",
    summary:
      "The Central Hub can challenge and reject sub-standard inputs, continuously and regardless of seniority.",
    decisionMaker: "Programme Manager",
    description: [
      "The Central Hub must be able to hold the broader programme team to best-in-class execution, governance and reporting standards regardless of seniority.",
      "The Programme Manager and PMO should be empowered to challenge and reject inputs that are not up to standard.",
      "Challenge should happen continuously and should not wait for SteerCo meetings.",
    ],
    impact: [
      "If the Central Hub cannot challenge directly, sub-standard reporting and execution may reach SteerCo and hamper effective decision-making.",
      "Workstream Executives may spend unnecessary time resolving execution issues rather than focusing on strategic decisions.",
    ],
  },
  {
    id: "business-leads-execution",
    number: 5,
    title: "Business must lead execution, supported by the Central Hub",
    summary:
      "Execution ownership sits in the Business Unit; the Hub coordinates, supports and challenges.",
    decisionMaker: "Workstream Executives",
    description: [
      "Responsibility for execution must sit within the relevant Business Unit, even where a Workstream Lead is supported by a Programme Manager.",
      "Workstream Leads should be business stakeholders rather than project managers and should understand the relevant SME knowledge and Business Unit ownership.",
      "Workstream Executives should appoint appropriate senior business stakeholders as Workstream Leads to create ownership and buy-in.",
      "The Central Hub / Programme Management team should provide coordination, support, check and challenge rather than taking ownership away from the business.",
    ],
    impact: [
      "Business Units may not feel accountable for deal outcomes, reducing long-term ownership once the transaction moves into BAU.",
      "Programme Managers may lack the detailed understanding of business processes required to properly plan and prioritise execution, increasing delivery risk.",
    ],
  },
  {
    id: "direct-interface",
    number: 6,
    title: "Direct interface into decision makers",
    summary:
      "The Transaction Director can escalate straight to executives at short notice.",
    decisionMaker: "Transaction Director",
    description: [
      "The Transaction Director must be empowered to escalate directly to the Accountable Executive and Workstream Executives at short notice when required.",
      "Executives must prioritise transaction-related escalations and convene relevant decision makers.",
      "Decisions should not be unnecessarily held until formal governance forums where they can be resolved earlier.",
    ],
    impact: [
      "Slow and non-prioritised decision-making leaves issues unresolved and reduces the time available for remediation.",
      "Lack of a clear, shared understanding of transaction importance and prioritisation can prevent the programme receiving sufficient executive attention.",
    ],
  },
  {
    id: "bau-processes",
    number: 7,
    title: "BAU processes should take on approved changes, in support of the deal",
    summary:
      "BAU processes can be challenged and adapted for the transaction, with risks managed and changes signed off.",
    decisionMaker: "Accountable Executive",
    description: [
      "Teams across the programme should be empowered to challenge BAU processes where those processes do not suit the transaction and are slowing execution.",
      "The default position should be that processes can be adapted where appropriate, provided material risks are understood and managed.",
      "Changes to BAU processes should be formally signed off by the appropriate Workstream / business ownership.",
    ],
    impact: [
      "Teams may default to “the way things have always been done”, constraining the programme unnecessarily.",
      "Existing processes may dictate the transaction approach rather than being challenged to achieve better outcomes.",
      "This can result in slower execution, greater complexity and poorer outcomes.",
    ],
  },
];
