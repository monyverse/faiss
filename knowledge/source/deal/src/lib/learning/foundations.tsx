import type { ReactNode } from "react";
import { Term } from "@/components/learning/Term";

export const DEFS = {
  "due diligence": "A detailed review of a business before a deal is agreed. It checks finances, customers, contracts, risks and controls.",
  synergy: "An extra financial benefit created by combining or separating businesses, such as lower costs or more revenue.",
  "deal perimeter": "What is included in, and excluded from, the transaction.",
  LD1: "Legal Day 1. The point at which legal ownership or agreed legal obligations take effect.",
  cutover: "The planned, controlled switch from old arrangements to new ones, such as moving accounts to a new system.",
  hypercare: "A short period after cutover with extra support to spot and fix issues quickly before normal teams take over.",
  "operational resilience": "The ability to keep important services running, or restore them quickly, when something goes wrong.",
  "regulatory approval": "Formal permission from a regulator that a deal can go ahead. Some deals cannot complete without it.",
  "business-as-usual": "The normal, ongoing teams and processes that run the business after the programme ends.",
  "financial crime": "Money laundering, fraud, sanctions breaches and similar offences. Banks must have controls to prevent them.",
} as const;

export type TermKey = keyof typeof DEFS;
export const T = ({ k, children }: { k: TermKey; children?: ReactNode }) => (
  <Term def={DEFS[k]}>{children ?? k}</Term>
);

export type Screen = { title: string; body: ReactNode };

export type ChoiceQ = {
  prompt: ReactNode;
  options: string[];
  correct: number;
  /** Feedback per option, explaining the trade-off. */
  feedback: string[];
};

export type ModuleId = "opening" | "what-is-ma" | "why-banks" | "outcomes" | "good" | "pitfalls" | "closing";

export type FModule = {
  id: ModuleId;
  no: number;
  title: string;
  minutes: number;
  summary: string;
  screens: Screen[];
  takeaway: string;
};

/* ---------------- Fictional scenario ---------------- */

export const SCENARIO = {
  title: "Northbank acquires Meridian Finance",
  facts: [
    "Northbank, a fictional bank, plans to buy Meridian Finance, a regional lending and payments business.",
    "Expected benefits: entry to a new market, customer growth and lower duplicated costs.",
    "The deal includes customer data, regulated products, employees, technology, financial-crime controls and third-party suppliers.",
  ],
};

export const OPENING_QUESTIONS = [
  { id: "strategy", label: "Strategic fit: does Meridian really help Northbank enter the market it wants?" },
  { id: "customers", label: "Customer retention: how many Meridian customers are likely to stay?" },
  { id: "capital", label: "Capital and liquidity: what does the deal do to Northbank's capital and funding?" },
  { id: "regulatory", label: "Regulatory approval: what approvals are needed, and how long will they take?" },
  { id: "assets", label: "Asset quality: how good is Meridian's loan book?" },
  { id: "cost", label: "Integration cost: what will it really cost to combine the businesses?" },
  { id: "tech", label: "Technology: can Meridian's systems, data and controls be moved or run safely?" },
  { id: "people", label: "People: which key staff and skills must be kept?" },
  { id: "continuity", label: "Operational continuity: can payments and lending keep running without disruption?" },
] as const;
export const RANK_LIMIT = 5;

/* ---------------- Modules ---------------- */

export const MODULES: FModule[] = [
  {
    id: "opening",
    no: 1,
    title: "Would this deal create value?",
    minutes: 4,
    summary: "An opening scenario. Choose and rank what you would investigate first.",
    screens: [],
    takeaway: "Every question here is credible. Deciding what matters most is the real skill. You will return to this deal in Module 7.",
  },
  {
    id: "what-is-ma",
    no: 2,
    title: "What M&A is",
    minutes: 4,
    summary: "Mergers, acquisitions, divestments and what actually transfers.",
    screens: [
      {
        title: "Three kinds of deal",
        body: (
          <>
            <p>M&amp;A stands for mergers and acquisitions.</p>
            <ul>
              <li><strong>Acquisition:</strong> one firm buys all or part of another.</li>
              <li><strong>Merger:</strong> two firms combine into one.</li>
              <li><strong>Divestment:</strong> a firm sells or exits part of its business.</li>
            </ul>
            <p>Absa can be the buyer or the seller.</p>
          </>
        ),
      },
      {
        title: "What can transfer",
        body: (
          <>
            <p>A banking deal is rarely just a change of owner. It can transfer:</p>
            <p className="font-medium">shares · businesses · loan books · deposits · customers · employees · systems · licences · contracts · assets · liabilities</p>
            <p>Most deals transfer a mixture of these. Each one needs its own plan.</p>
          </>
        ),
      },
      {
        title: "How much is transferring",
        body: (
          <>
            <ul>
              <li><strong>Balance-sheet transaction:</strong> specific assets or liabilities move, such as a loan book.</li>
              <li><strong>Partial-business transaction:</strong> part of a business moves, such as one product line with its people and systems.</li>
              <li><strong>Full-business transaction:</strong> a whole business or entity moves.</li>
            </ul>
            <p>The <T k="deal perimeter" /> sets out exactly what is in and out.</p>
          </>
        ),
      },
      {
        title: "Signing is not the end",
        body: (
          <>
            <p>Signing the agreement starts the hardest part.</p>
            <p>Value is realised through execution, transition and sustained business performance. A well-priced deal can still lose value if it is poorly delivered.</p>
          </>
        ),
      },
    ],
    takeaway: "Know what is actually transferring. The perimeter drives the work, the risks and the cost.",
  },
  {
    id: "why-banks",
    no: 3,
    title: "Why banks undertake M&A",
    minutes: 4,
    summary: "The reasons behind deals, and why banking deals carry extra weight.",
    screens: [
      {
        title: "Common reasons",
        body: (
          <ul>
            <li>Enter a new market or geography.</li>
            <li>Gain customers, products, technology, licences or specialist skills.</li>
            <li>Increase scale and spread fixed costs.</li>
            <li>Create revenue through more products or wider reach.</li>
            <li>Reduce duplicated operating costs.</li>
            <li>Diversify revenue, funding or credit exposure.</li>
            <li>Exit a non-core business or release capital.</li>
            <li>Acquire a distressed business while protecting financial stability.</li>
          </ul>
        ),
      },
      {
        title: "Synergy",
        body: (
          <>
            <p>Many deals are justified by <T k="synergy" />.</p>
            <p>Cost synergy comes from removing duplication, such as two head offices. Revenue synergy comes from selling more, such as offering cards to new customers.</p>
            <p>Synergies are estimates. They only become real through delivery.</p>
          </>
        ),
      },
      {
        title: "Why banking deals matter more",
        body: (
          <>
            <p>Banking deals can affect:</p>
            <p className="font-medium">deposits · payments · lending · customer data · capital · liquidity · <T k="financial crime">financial-crime</T> controls · regulatory permissions · critical services · confidence in the bank</p>
            <p>A mistake can harm customers and the wider financial system, not just the deal.</p>
          </>
        ),
      },
    ],
    takeaway: "Each rationale carries a matching risk. Name both before you commit.",
  },
  {
    id: "outcomes",
    no: 4,
    title: "From deal rationale to outcomes",
    minutes: 4,
    summary: "Activities are not outcomes. Learn to say what success looks like.",
    screens: [
      {
        title: "Activities are not outcomes",
        body: (
          <>
            <p>An activity is something you do. An outcome is the result you need.</p>
            <p><strong>Activity:</strong> move accounts to the new platform.<br /><strong>Outcome:</strong> move accounts accurately without disrupting customer access or weakening controls.</p>
            <p><strong>Activity:</strong> close duplicated sites.<br /><strong>Outcome:</strong> deliver sustainable cost savings while keeping customer access and service.</p>
          </>
        ),
      },
      {
        title: "Six types of outcome",
        body: (
          <ol>
            <li><strong>Strategic:</strong> market position, capability gained.</li>
            <li><strong>Customer:</strong> retention, service continuity.</li>
            <li><strong>Financial:</strong> revenue, cost savings, integration costs, capital, funding.</li>
            <li><strong>Operational:</strong> <T k="operational resilience" />, stable services.</li>
            <li><strong>Risk and regulatory:</strong> control effectiveness, approvals met.</li>
            <li><strong>People and capability:</strong> employee retention, skills kept.</li>
          </ol>
        ),
      },
      {
        title: "Good outcomes are measurable",
        body: (
          <>
            <p>A good outcome has a measure, an owner, a date and evidence.</p>
            <p>"Improve retention" is vague. "Keep at least 95% of transferred deposit balances six months after <T k="LD1" />, owned by the Retail lead" can be tracked.</p>
          </>
        ),
      },
    ],
    takeaway: "Write outcomes you could prove. If you cannot name the evidence, it is not yet an outcome.",
  },
  {
    id: "good",
    no: 5,
    title: "What good looks like",
    minutes: 5,
    summary: "Connected principles of good execution, with two public examples.",
    screens: [
      {
        title: "Connected principles",
        body: (
          <ul>
            <li>A clear rationale with realistic assumptions.</li>
            <li>Measurable outcomes, owners, timing and evidence.</li>
            <li>Early engagement with regulators and control functions.</li>
            <li>A credible business and integration plan.</li>
            <li>Clear accountability and decision rights.</li>
            <li>An honest view of perimeter, dependencies and cost.</li>
            <li>Protection of customers, critical services, data and controls.</li>
            <li>Joint planning across business and technology.</li>
            <li>Evidence-based testing, readiness criteria and fallback plans.</li>
            <li>Active value tracking after completion.</li>
          </ul>
        ),
      },
      {
        title: "Example: DBS and Citi Taiwan",
        body: (
          <>
            <p>DBS completed the integration of Citi's Taiwan consumer-banking business over a planned weekend in August 2023.</p>
            <p>It illustrates coordinated <T k="cutover" />, careful sequencing and operational preparation.</p>
            <p className="text-xs text-muted-foreground">This example shows specific execution principles. It is not a claim that every aspect of the deal succeeded.</p>
          </>
        ),
      },
      {
        title: "Example: JPMorgan Chase and First Republic",
        body: (
          <>
            <p>When JPMorgan Chase assumed First Republic Bank's deposits in May 2023, its 84 offices reopened during normal business hours. Customers kept access to their deposits.</p>
            <p>It illustrates customer and service continuity in a time-critical transaction.</p>
            <p className="text-xs text-muted-foreground">This example shows specific execution principles. It is not a claim that every aspect of the deal succeeded.</p>
          </>
        ),
      },
    ],
    takeaway: "Good execution is a set of linked habits. Missing one often weakens the others.",
  },
  {
    id: "pitfalls",
    no: 6,
    title: "Common pitfalls across the lifecycle",
    minutes: 5,
    summary: "Where deals go wrong, the early signs, and what prevents it.",
    screens: [],
    takeaway: "Most failures show early warning signs. Act on them in the phase where they first appear.",
  },
  {
    id: "closing",
    no: 7,
    title: "Closing scenario",
    minutes: 5,
    summary: "Return to Northbank with new facts. Make three decisions.",
    screens: [],
    takeaway: "Protecting customers, controls and continuity is part of achieving value, not separate from it.",
  },
];

/* ---------------- Interactions ---------------- */

export const CLASSIFY: ChoiceQ[] = [
  {
    prompt: "A bank sells a portfolio of home loans to another lender. No staff or systems move.",
    options: ["Balance-sheet transaction", "Partial-business transaction", "Full-business transaction"],
    correct: 0,
    feedback: [
      "Right. Only specific assets move. The work still includes customer notices and data transfer.",
      "Close, but no people, systems or operations move. That makes it balance-sheet only.",
      "No entity or whole business moves. Only a set of loans changes hands.",
    ],
  },
  {
    prompt: "A bank buys all the shares of a licensed payments company, with its staff, systems and licence.",
    options: ["Balance-sheet transaction", "Partial-business transaction", "Full-business transaction"],
    correct: 2,
    feedback: [
      "Much more than assets move here. The whole entity, including its licence, changes owner.",
      "It would be partial if only part of the company moved. Here the whole entity moves.",
      "Right. The whole entity moves. Licences, people and systems all come with it.",
    ],
  },
  {
    prompt: "A bank sells its card business: customer accounts, the card team and the card platform, but not the rest of the bank.",
    options: ["Balance-sheet transaction", "Partial-business transaction", "Full-business transaction"],
    correct: 1,
    feedback: [
      "People and a platform move too, so it goes beyond balance-sheet only.",
      "Right. One business line moves with its people and systems. Separating shared services is often the hard part.",
      "The rest of the bank stays. Only part of the business moves.",
    ],
  },
  {
    prompt: "A bank takes over the deposits and branches of a failing lender, but not its bad loans.",
    options: ["Balance-sheet transaction", "Partial-business transaction", "Full-business transaction"],
    correct: 1,
    feedback: [
      "Branches and the people who run them move too, so this is more than balance-sheet.",
      "Right. A chosen part of the business moves. The perimeter deliberately excludes the bad loans.",
      "Not everything moves. The bad loans are excluded, so the perimeter is partial.",
    ],
  },
];

export const MATCHES: { rationale: string; value: ChoiceQ; risk: ChoiceQ }[] = [
  {
    rationale: "Buy a digital lender to gain its app and technology team.",
    value: {
      prompt: "Main value sought",
      options: ["Specialist capability", "Lower duplicated costs", "Released capital"],
      correct: 0,
      feedback: [
        "Right. The value is the capability, which sits largely in people and systems.",
        "Costs may fall later, but that is not why you buy a technology team.",
        "Buying uses capital rather than releasing it.",
      ],
    },
    risk: {
      prompt: "Principal risk",
      options: ["Key people leave after the deal", "Regulators reject the brand name", "Branch closures upset customers"],
      correct: 0,
      feedback: [
        "Right. If the team leaves, much of the capability leaves with it.",
        "Brand issues are possible but rarely the main threat to this value.",
        "A digital lender is unlikely to have branches to close.",
      ],
    },
  },
  {
    rationale: "Merge two regional banks with overlapping branches and head offices.",
    value: {
      prompt: "Main value sought",
      options: ["Market entry", "Lower duplicated costs", "Diversified funding"],
      correct: 1,
      feedback: [
        "Both banks are already in the region, so this is not market entry.",
        "Right. Overlap creates cost synergy from removing duplication.",
        "Funding may improve slightly, but overlap points to cost savings.",
      ],
    },
    risk: {
      prompt: "Principal risk",
      options: ["Savings harm service and customers leave", "The loan book is too small", "Too few products to cross-sell"],
      correct: 0,
      feedback: [
        "Right. Cutting too fast can lose customers and wipe out the savings.",
        "Size of the loan book is not the main threat to cost savings.",
        "Cross-sell matters for revenue, not the cost case.",
      ],
    },
  },
  {
    rationale: "Sell a non-core insurance business to focus on banking.",
    value: {
      prompt: "Main value sought",
      options: ["Revenue growth", "Released capital and focus", "New licences"],
      correct: 1,
      feedback: [
        "Selling usually reduces revenue. The aim is focus and capital.",
        "Right. The seller frees capital and management time.",
        "The seller gives up licences rather than gaining them.",
      ],
    },
    risk: {
      prompt: "Principal risk",
      options: ["Shared services are hard to separate, leaving stranded costs", "The buyer's app is poor", "Deposit customers switch banks"],
      correct: 0,
      feedback: [
        "Right. Costs left behind after separation can erode the benefit.",
        "The buyer's app is mainly the buyer's concern.",
        "Deposit customers are less directly affected by an insurance sale.",
      ],
    },
  },
];

export const CONVERT: { activity: string; outcome: ChoiceQ; evidence: ChoiceQ }[] = [
  {
    activity: "Migrate customer data to the new platform.",
    outcome: {
      prompt: "Which is the best outcome statement?",
      options: [
        "All customer records are loaded onto the new platform by the migration date",
        "Customers can transact from LD1 with accurate balances and controls working",
        "The migration team completes all planned data loads on schedule",
      ],
      correct: 1,
      feedback: [
        "Loaded records can still be wrong, or controls can fail. This is closer to an activity.",
        "Right. It describes what the customer and the bank need, not just the task.",
        "Completing loads is progress on activity. It says nothing about accuracy or customers.",
      ],
    },
    evidence: {
      prompt: "Which evidence best supports it?",
      options: [
        "Reconciled balances, successful dress rehearsal and control test results",
        "A signed-off migration plan",
        "Status report showing all tasks green",
      ],
      correct: 0,
      feedback: [
        "Right. This shows the result actually happened.",
        "A plan shows intent, not results.",
        "Green status can hide gaps. It reports activity, not outcomes.",
      ],
    },
  },
  {
    activity: "Run a staff retention scheme.",
    outcome: {
      prompt: "Which is the best outcome statement?",
      options: [
        "Retention letters are issued to all staff before signing",
        "Morale remains positive throughout the programme",
        "At least 90% of named critical staff remain 12 months after completion",
      ],
      correct: 2,
      feedback: [
        "Issuing letters is an activity. People may still leave.",
        "Morale matters but is hard to measure and not tied to critical roles.",
        "Right. It is measurable, targeted and timed.",
      ],
    },
    evidence: {
      prompt: "Which evidence best supports it?",
      options: [
        "Monthly count of critical staff still in role, tracked against the named list",
        "Number of retention letters signed",
        "Engagement survey response rate",
      ],
      correct: 0,
      feedback: [
        "Right. It measures the outcome directly.",
        "Signed letters show take-up, not whether people stay.",
        "Response rate says little about retention.",
      ],
    },
  },
];

export const CASE_PRINCIPLES = [
  "Coordinated cutover and sequencing",
  "Protection of customers and critical services",
  "Evidence-based testing and fallback plans",
  "Active value tracking after completion",
  "Early engagement with regulators",
];
export const CASES = [
  { name: "DBS and Citi Taiwan", visible: [0, 2], note: "A planned weekend integration depends on sequencing and rehearsed preparation. Value tracking is not visible from this public information." },
  { name: "JPMorgan Chase and First Republic", visible: [1, 4], note: "Offices reopened as normal and deposits stayed accessible. Acting within days required close working with regulators. Value tracking is not visible from this public information." },
];

export const PHASES = [
  { phase: "Due Diligence", pitfall: "Unclear perimeter, weak data, hidden control or asset-quality issues, benefits based on optimistic assumptions.", warning: "Data requests stay open; benefit figures are not traced to evidence.", action: "Agree the perimeter early and test key assumptions against data." },
  { phase: "Legal Drafting and Signature", pitfall: "Commitments that do not reflect operational reality; unclear data-sharing, regulatory, service or transitional arrangements.", warning: "Operations teams have not reviewed the draft terms.", action: "Have delivery owners check every operational commitment before signing." },
  { phase: "Mobilisation and Planning", pitfall: "Late appointments, unclear authority, insufficient capacity, plans listing activities without outcomes, evidence or dependencies.", warning: "Key roles are unfilled; plans have no owners or evidence.", action: "Appoint accountable owners and build outcome-based plans." },
  { phase: "Programme Execution", pitfall: "Unresolved dependencies, scope drift, slow decisions, delivery disconnected from the business case.", warning: "Decisions wait weeks; scope grows without a change process.", action: "Track dependencies and decisions; tie changes back to the business case." },
  { phase: "Business Testing", pitfall: "Incomplete coverage, weak evidence, testing activity mistaken for readiness.", warning: "High pass rates but untested critical journeys.", action: "Test against critical services and set clear exit criteria." },
  { phase: "Client Onboarding and LD1 Readiness", pitfall: "Poor product mapping, late customer or employee communications, data, contractual or control gaps, financial-crime requirements not ready.", warning: "Customer letters not drafted; screening not configured.", action: "Map products early and plan communications against LD1." },
  { phase: "Dress Rehearsals", pitfall: "Unrealistic runbooks, unclear command structures, untested fallback arrangements.", warning: "Rehearsals overrun; nobody has practised rollback.", action: "Rehearse the full runbook, including the fallback." },
  { phase: "Go/No-Go", pitfall: "Optimism overriding evidence, unclear acceptance criteria, unresolved material defects.", warning: "Criteria are changed to fit the date.", action: "Fix criteria in advance and decide on evidence." },
  { phase: "Cutover", pitfall: "Unclear authority, uncontrolled change, poor communications, customer or service disruption.", warning: "Last-minute changes; unclear who can stop the cutover.", action: "Freeze change and name one command structure." },
  { phase: "Hypercare", pitfall: "Prolonged dependence on the programme team, weak transfer to business-as-usual owners, poor issue prioritisation, value tracking stopping too early.", warning: "Programme staff still fix daily issues months later.", action: "Set exit criteria and hand over to business-as-usual owners with value tracking." },
];

export const HEATMAP: { sign: string; correct: number; why: string }[] = [
  { sign: "The cost-saving figure in the business case has never been checked against the branches actually in scope.", correct: 0, why: "This is a perimeter and assumption issue. Due Diligence is the first place to address it." },
  { sign: "The draft agreement promises a six-week system transfer that the technology team has not seen.", correct: 1, why: "It should be caught before signature, while terms can still change." },
  { sign: "The plan lists 400 tasks but no outcomes or owners.", correct: 2, why: "This is a planning weakness. Mobilisation and Planning is where outcomes and owners get set." },
  { sign: "95% of test cases passed, but payment journeys were not tested.", correct: 4, why: "Coverage gaps belong in Business Testing, before readiness is assessed." },
  { sign: "Six months after LD1, the programme team still handles most live issues.", correct: 9, why: "This is a hand-over problem. Hypercare needs clear exit criteria." },
];

export const CAUTIONARY = [
  { name: "TSB technology migration (2018)", body: "TSB's 2018 technology migration caused widespread disruption to customer services. Successful data movement is not enough when the platform, governance and operational resilience are not ready." },
  { name: "TD and First Horizon (2023)", body: "TD and First Horizon ended their proposed transaction in 2023 because of uncertainty over the timing and receipt of regulatory approvals. Regulatory approval is a critical-path dependency, not an administrative formality." },
];

/* ---------------- Closing scenario ---------------- */

export const NEW_FACTS = [
  "Proposed savings have not yet been validated against the systems and branch perimeter.",
  "Regulatory approval depends on financial-crime remediation.",
  "Customer communications are behind plan.",
  "Most tests have passed, but unresolved defects affect payments and fraud monitoring.",
];

export const CLOSING: ChoiceQ[] = [
  {
    prompt: "Which outcomes need stronger evidence first?",
    options: [
      "Cost savings, because the whole business case rests on them",
      "Customer and service continuity, because payments and fraud defects are still open",
      "Regulatory outcomes, because approval depends on financial-crime remediation",
    ],
    correct: 1,
    feedback: [
      "Savings do need validating, and it matters. But they can be tested after LD1. Payment and fraud failures would harm customers on day one.",
      "Strongest choice. Open defects in payments and fraud monitoring put customers and controls at risk immediately. Savings and approval still need evidence, but continuity comes first.",
      "A strong case. Without approval there is no deal. But approval is partly outside the team's control, while the defects are within it and affect customers directly.",
    ],
  },
  {
    prompt: "What should be escalated, changed or made a condition of readiness?",
    options: [
      "Escalate the late communications and ask for more resource to catch up",
      "Make fixing the payment and fraud defects, and completing remediation, conditions of readiness",
      "Re-baseline the savings figure so the business case reflects the real perimeter",
    ],
    correct: 1,
    feedback: [
      "Useful, and it should happen. But it treats a symptom. The defects and remediation are the harder blockers.",
      "Strongest choice. It links readiness to evidence on the issues that could harm customers and block approval. Communications and savings still need action.",
      "Honest and needed. But re-baselining does not make LD1 any safer for customers.",
    ],
  },
  {
    prompt: "What would you recommend?",
    options: ["Proceed on the planned date", "Proceed with conditions", "Delay"],
    correct: 1,
    feedback: [
      "Keeping the date protects momentum and cost. But it accepts open defects in payments and fraud monitoring, which risks customers and controls.",
      "Strongest choice, if the conditions are firm and evidenced: defects fixed, remediation accepted by the regulator, communications sent in time. If any condition slips, the answer becomes delay.",
      "Safe, and sometimes right. But delay has real costs: staff uncertainty, customer confusion and a longer spend. Delay should follow a failed condition, not replace a decision.",
    ],
  },
];

/** Opening question ids most relevant to the closing facts. */
export const CLOSING_LINKS: Record<string, string> = {
  cost: "Savings are not yet validated against the perimeter.",
  regulatory: "Approval now depends on financial-crime remediation.",
  customers: "Customer communications are behind plan.",
  continuity: "Defects affect payments and fraud monitoring.",
  tech: "Defects affect payments and fraud monitoring.",
};

/* ---------------- Optional diagnostic ---------------- */

export const DIAGNOSTIC: ChoiceQ[] = [
  {
    prompt: "A bank buys a loan portfolio. No staff or systems move. What kind of transaction is it?",
    options: ["Full-business", "Balance-sheet", "Partial-business"],
    correct: 1,
    feedback: ["Only assets move.", "Right.", "No people or operations move."],
  },
  {
    prompt: "Which is an outcome rather than an activity?",
    options: ["Close five duplicated branches", "Run a retention scheme", "Keep 95% of deposit balances six months after LD1"],
    correct: 2,
    feedback: ["That is an activity.", "That is an activity.", "Right. It is measurable and timed."],
  },
  {
    prompt: "What does 'deal perimeter' mean?",
    options: ["What is included in and excluded from the deal", "The countries the buyer operates in", "The deadline for completing the deal"],
    correct: 0,
    feedback: ["Right.", "Not quite.", "Not quite."],
  },
  {
    prompt: "90% of tests passed, but payment journeys were not tested. What is the main concern?",
    options: ["The pass rate is too low", "Testing activity is being mistaken for readiness", "The test team needs more time"],
    correct: 1,
    feedback: ["90% can be fine if coverage is right.", "Right. Coverage of critical services matters most.", "Time alone does not fix a coverage gap."],
  },
  {
    prompt: "Why is regulatory approval treated as a critical-path dependency?",
    options: ["Regulators set the purchase price", "It is a formality done after signing", "The deal may not complete, or may be delayed, without it"],
    correct: 2,
    feedback: ["Regulators do not set the price.", "Treating it as a formality is a common pitfall.", "Right."],
  },
];
export const DIAGNOSTIC_PASS = 4;
export const SKIPPABLE: ModuleId[] = ["what-is-ma", "why-banks", "outcomes", "good", "pitfalls"];

export const SOURCES = [
  ["European Central Bank, Guide on the supervisory approach to consolidation in the banking sector", "https://www.bankingsupervision.europa.eu/ecb/pub/pdf/ssm.guideconsolidation2101~fb6f871dc2.en.pdf"],
  ["Bank for International Settlements, Report on Consolidation in the Financial Sector", "https://www.bis.org/publ/gten05ch5.pdf"],
  ["DBS, DBS completes acquisition of Citi's consumer banking business in Taiwan", "https://www.dbs.com/newsroom/DBS_completes_acquisition_of_Citis_consumer_banking_business_in_Taiwan"],
  ["Federal Deposit Insurance Corporation, JPMorgan Chase assumes First Republic Bank deposits", "https://www.fdic.gov/news/press-releases/2023/pr23034.html"],
  ["Financial Conduct Authority, TSB fined for operational resilience failings", "https://www.fca.org.uk/news/press-releases/tsb-fined-48m-operational-resilience-failings"],
  ["TD Bank, TD and First Horizon mutually agree to terminate merger agreement", "https://stories.td.com/ca/en/news/2023-05-04-td-bank-and-first-horizon-mutually-agree-to-terminate-merger"],
] as const;

export const TOTAL_MINUTES = MODULES.reduce((s, m) => s + m.minutes, 0);
