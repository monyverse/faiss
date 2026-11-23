/**
 * Finance & Tax SA Functional Spoke.
 *
 * All strings in this file are approved source content reproduced verbatim
 * from the Absa M&A Transaction Operating Model document. Do not summarise,
 * paraphrase or correct the wording.
 */

import type { SpokeContent } from "./spoke-content";

export const CONTENT: SpokeContent = {
  "id": "finance-tax",
  "name": "Finance & Tax",
  "reference": "",
  "necessityRows": [
    {
      "archetype": "Balance Sheet Acquisition",
      "classification": "Core / Required",
      "rationale": "Core because all acquisitions have a financial impact, and finance must input to commercial modelling for all archetypes"
    },
    {
      "archetype": "Partial Business Acquisition",
      "classification": "Core / Required",
      "rationale": "Core because all acquisitions have a financial impact, and finance must input to commercial modelling for all archetypes"
    },
    {
      "archetype": "Full Business Acquisition A (Buyer integrates the business)",
      "classification": "Core / Required",
      "rationale": "Core because all acquisitions have a financial impact, and finance must input to commercial modelling for all archetypes"
    },
    {
      "archetype": "Full Business Acquisition B (Buyer runs the business standalone)",
      "classification": "Core / Required",
      "rationale": "Core because all acquisitions have a financial impact, and finance must input to commercial modelling for all archetypes"
    },
    {
      "archetype": "Balance Sheet Sale",
      "classification": "Core / Required",
      "rationale": "Core because all transactions have a financial impact, and Finance must input to commercial modelling for all archetypes"
    },
    {
      "archetype": "Partial Business Sale",
      "classification": "Core / Required",
      "rationale": "Core because all transactions have a financial impact, and Finance must input to commercial modelling for all archetypes"
    },
    {
      "archetype": "Full Business Sale A (Buyer integrates the business)",
      "classification": "Core / Required",
      "rationale": "Core because all transactions have a financial impact, and Finance must input to commercial modelling for all archetypes"
    },
    {
      "archetype": "Full Business Sale B (Buyer runs the business as standalone)",
      "classification": "Core / Required",
      "rationale": "Core because all transactions have a financial impact, and Finance must input to commercial modelling for all archetypes"
    }
  ],
  "keyRole": "Owns finance and tax execution from deal economics through completion and LD1. Owns Group Interchange, TSA operation and BAU transition, and ensuring commercials, ledgers, liquidity, tax, reporting and controls remain operating",
  "responsibilities": [
    "Provide Finance input to the deal memo, pricing, costing, revenue, premium-to-NAV, goodwill, amortisation, stranded-cost, synergy and group P&L assumptions.",
    "Define completion accounts, purchase price adjustments, funds flow, accounting treatment, tax exposures, funding, liquidity, settlement and FX requirements.",
    "Own the finance side of Group Interchange and TSA service management, including service charging, recharges, buy-backs, cost recovery, invoicing and dispute controls",
    "Define which finance-related services, reporting routines, payments, controls and processes must start, stop or continue across Absa, the acquired business, the seller or the buyer.",
    "Align acquired or disposed business finance policies, ledgers, reporting standards, close calendars, account structures and control requirements to the agreed transaction model.",
    "Coordinate Group Tax advice centrally while ensuring local tax, statutory reporting and regulatory finance requirements are captured through in-country teams.",
    "Validate historic financial data, local ledgers, trial balances, management information, reconciliation approach and local reporting constraints with Regional Spokes.",
    "Test finance data, ledgers, processes, payments, reports, P&L impacts, month-end close and reconciliation controls before LD1.",
    "Confirm finance readiness for signing, completion, cutover, first close, hypercare and BAU handover."
  ],
  "boundaryItems": [
    "Legal & CorpDev owns transaction-document drafting and commercial negotiation route; Finance & Tax supplies costing, revenue, scenario planning, tax, accounting, completion mechanics, Group Interchange and TSA charging inputs.",
    "Central Hub owns integrated programme governance and TSA dependency tracking; Finance & Tax owns financial design, recharge, buy-back, P&L and control evidence for Group Interchange and TSA services.",
    "Procurement owns supplier contracting and third-party continuity; Finance & Tax owns spend baselining, payment-route design, cost allocation, stranded-cost analysis and supplier-related financial controls.",
    "Technology and Data Migration own system build and data movement; Finance & Tax owns ledger mapping, finance data validation, accounting rules, reporting outputs and reconciliation requirements.",
    "Regional Spokes own local finance evidence, local statutory reporting, close-calendar constraints and local regulatory finance nuance, with Group Finance and Group Tax retaining group-level standards and technical positions."
  ],
  "centralHubRelationship": "Relationship with Central Hub: the SA Functional Spoke owns finance and tax execution decisions and evidence while the Central Hub sets programme standards, coordinates dependencies, tracks TSA and Group Interchange critical path items, and escalates transaction-wide issues.",
  "regionalRelationship": [
    "Regional Spokes should own local execution as a minimum, with ownership scaling based on maturity, including local ledger evidence, statutory reporting inputs, local tax data, close-calendar constraints, reconciliations and first-close support where they have capacity and delegated authority.",
    "Function Authority retains group accounting and tax positions, Group Interchange and TSA charging standards, completion accounts, group reporting, central review and execution ownership where regional maturity, capability or capacity is insufficient.",
    "As regional maturity increases, local ownership should expand from evidence provision into ledger mapping, local reporting readiness, local tax execution and first-close activity, with Function Authority retaining group standards, specialist challenge and reserved approvals."
  ],
  "externalDependencies": "External or counterparty dependencies are managed through the Central Hub governance route where timing, financial data, TSA charging, completion accounts, tax, approvals or joint readiness affect signing, completion or LD1.",
  "mandateRows": [
    {
      "id": "deal-economics-and-finance-input",
      "area": "Deal economics and finance input",
      "spokeAuthority": [
        "Defines finance inputs to costing, revenue, premium-to-NAV, goodwill, amortisation, stranded cost, synergy and group P&L assumptions."
      ],
      "hubRole": "Tracks assumptions through the integrated plan, governance pack and business-case control.",
      "regionalRole": "",
      "governance": "CorpDev, Finance & Tax, Group Tax, business sponsor and executive governance.",
      "escalation": "Deal economics, pricing, synergy, stranded cost or premium-to-NAV assumptions are incomplete or disputed."
    },
    {
      "id": "completion-mechanism-funds-flow-and-liquidity",
      "area": "Completion mechanism, funds flow and liquidity",
      "spokeAuthority": [
        "Defines finance requirements, funds flow, settlement route, completion accounts, purchase price adjustments, liquidity, FX and payment evidence."
      ],
      "hubRole": "Coordinates critical path, command-centre dependencies and readiness evidence.",
      "regionalRole": "",
      "governance": "Finance & Tax, Treasury, Group Tax, Legal & CorpDev and executive governance.",
      "escalation": "Funding shortfall, FX exposure, tax leakage, account constraint or payment cut-off threatens completion."
    },
    {
      "id": "group-interchange-and-tsa-finance-model",
      "area": "Group Interchange and TSA finance model",
      "spokeAuthority": [
        "Owns finance inputs to service start, stop and continue decisions, recharge or buy-back mechanics, TSA charging, cost recovery, invoicing and dispute controls."
      ],
      "hubRole": "Coordinates cross-workstream TSA readiness, dependency tracking and escalation.",
      "regionalRole": "",
      "governance": "Finance & Tax, Central Hub, Legal & CorpDev, Procurement and business service owners.",
      "escalation": "TSA pricing, service charge, recharge, buy-back, tax or cost recovery position is unclear."
    },
    {
      "id": "ledger-accounting-policy-and-reporting-readiness",
      "area": "Ledger, accounting policy and reporting readiness",
      "spokeAuthority": [
        "Recommends ledger mapping, chart-of-account alignment, accounting treatment, manual posting route, close timetable and reporting control approach."
      ],
      "hubRole": "Tracks implementation dependencies, testing evidence and LD1 readiness impact.",
      "regionalRole": "",
      "governance": "Group Finance, Group Tax, External Audit and local Finance leadership where required.",
      "escalation": "Unmapped ledgers, reporting-standard difference, close-calendar constraint or accounting judgement remains unresolved."
    },
    {
      "id": "ld1-finance-readiness-and-post-completion-control",
      "area": "LD1 finance readiness and post-completion control",
      "spokeAuthority": [
        "Recommends finance readiness status, accepted exceptions and post-LD1 control actions across reporting, reconciliations, tax, liquidity and TSA billing."
      ],
      "hubRole": "Integrates status into go/no-go, cutover command centre and hypercare governance.",
      "regionalRole": "",
      "governance": "Programme governance, Finance & Tax signatories, Group Tax and accountable business owners.",
      "escalation": "Reconciliation, first-close, tax, reporting, payment or TSA billing exception remains open at go/no-go."
    }
  ],
  "capabilityRows": [
    {
      "category": "Specific Project Manager required?",
      "content": "Maybe - dedicated Finance PM, TSA finance coordinator or Group Interchange lead is needed where completion mechanics, recharges, multi-country ledger mapping dependencies create risk"
    },
    {
      "category": "Baseline capabilities",
      "content": "Deal economics, costing and revenue scenario planning; completion accounts; funds flow; treasury funding; liquidity and FX management; tax assessment; accounting policy; financial-control design; reporting and reconciliation control."
    },
    {
      "category": "Incremental capabilities by deal archetype / complexity",
      "content": "Group Interchange and TSA charging; recharge and buy-back mechanics; stranded-cost and synergy tracking; purchase accounting; premium-to-NAV and amortisation modelling; multi-entity ledger mapping; local statutory and regulatory reporting alignment; close-calendar transition."
    },
    {
      "category": "Specialist capabilities triggered by deal characteristics",
      "content": "Group Tax and local tax advisory; transfer pricing, VAT, withholding tax and deferred tax; regulatory capital and liquidity; external audit engagement; complex-product accounting; cross-border finance reporting; service-pricing and dispute management."
    }
  ],
  "milestoneIntro": [
    "The key milestones below are organised as a baseline set, with additional milestones required for more complex deal archetypes split out below as required.",
    "As deal archetypes scale from balance sheet to partial business to full business, each baseline activity should be assessed against the complexity factors laid out in the deal archetypes documentation, and assessed for whether its size or scope increases as a result of deal specifics."
  ],
  "serviceCatalogue": [
    "Deal economics, pricing and scenario support",
    "Completion mechanics, funds flow and treasury readiness",
    "Group Interchange, TSA charging and recharge / buy-back management",
    "Finance policy, ledger mapping and reporting readiness",
    "Tax, liquidity, FX and regulatory finance coordination",
    "Close, reconciliation, cutover and hypercare control"
  ],
  "activitySets": [
    {
      "id": "balance-sheet-acquisition",
      "heading": "Balance Sheet Acquisition - baseline activities",
      "tab": "Balance Sheet Acquisition",
      "milestones": [
        {
          "name": "Finance input to deal economics provided (3 weeks)",
          "activities": [
            "Build costing, revenue, stranded-cost and synergy assumptions for in-scope transfer",
            "Document what premium or discount to NAV represents, including goodwill, technology, client, funding or other value drivers",
            "Model amortisation, impairment, capital, liquidity and group P&L impacts"
          ]
        },
        {
          "name": "Completion mechanism and funds flow designed (4 weeks)",
          "activities": [
            "Define purchase price adjustment approach, completion accounts, effective transfer date, settlement route, bank account requirements and payment cut-offs",
            "Confirm liquidity, FX, funding, capital, bad-debt and late-payment exposures",
            "Coordinate with Legal & CorpDev so finance mechanics, tax protections, completion evidence and post-completion obligations are in documents"
          ]
        },
        {
          "name": "Financial data and ledger baseline validated (4 weeks)",
          "activities": [
            "Request historic financials, trial balances, portfolio balances, P&L run-rate, account structures and supporting evidence",
            "Map in-country ledgers into Absa group account structures and hierarchies",
            "Identify remediation required through system migration, configuration, manual posting or workaround"
          ]
        },
        {
          "name": "Tax and regulatory finance position assessed (6 weeks)",
          "activities": [
            "Confirm Group Tax view, local tax obligations, transfer pricing etc implications.",
            "Capture local reporting, regulatory finance and capital-reporting requirements through Regional Spoke",
            "Validate whether local regulatory constraints affect shared-service, funding, liquidity or synergy assumptions"
          ]
        },
        {
          "name": "LD1 finance readiness tested (4 weeks)",
          "activities": [
            "Test ledger postings, reporting outputs, management information, reconciliation controls, funds flow and exception handling alongside regional spoke",
            "Rehearse completion entries, payment instructions, account confirmations, close timetable and escalation route",
            "Confirm manual workarounds for unresolved ledger, reporting or payments"
          ]
        },
        {
          "name": "Hypercare and BAU managed (4 weeks)",
          "activities": [
            "Monitor reconciliations, reporting cycle, tax, liquidity, FX, TSA charges and open completion items",
            "Hand over finance controls, reporting routines, issue logs and residual actions to BAU Finance",
            "Critical dependency: incomplete historic financials, unmapped ledgers or unresolved local reporting constraints can delay completion, first close or group reporting."
          ]
        }
      ]
    },
    {
      "id": "partial-business-acquisition",
      "heading": "Partial Business Acquisition - additional activities",
      "tab": "Partial Business Acquisition",
      "lead": "The above, with the addition of",
      "milestones": [
        {
          "name": "Financial impact of employee or tech transfer assessed (4 weeks)",
          "activities": [
            "Identify shared services required to transfer employees or technology, and understand finance implications on TSAs or deal valuation",
            "Document and remediate tax implications of employee transfer",
            "Work with HR to understand impact of employee packages on finances, including bonus payments",
            "Work with seller to understand total cost of ownership of transferring technology, and ensure it appears in forecasts"
          ]
        },
        {
          "name": "Group Interchange and TSA finance model established (5 weeks)",
          "activities": [
            "Confirm which finance-related services must start, stop or continue between Absa, the seller and the acquired business",
            "Design or re-use service charge, recharge, buy-back, VAT, tax, invoicing, MI, dispute and exit mechanics",
            "Provide finance inputs to TSA schedules, service descriptions, charging clauses, exit milestones and completion conditions"
          ]
        },
        {
          "name": "Local finance transition plan mobilised (4 weeks)",
          "activities": [
            "Map local month-end close timings, reporting standards, statutory obligations and finance ways of working",
            "Support in-country testing of finance data, local ledgers, reporting outputs and process hand-offs",
            "Track local tax, reporting and regulatory finance obligations centrally while keeping execution with the accountable local teams"
          ]
        }
      ]
    },
    {
      "id": "full-business-acquisition-a-integrated",
      "heading": "Full Business Acquisition A (integrated) - further additional activities",
      "tab": "Full Acquisition A (integrated)",
      "lead": "The above, with the addition of",
      "milestones": [
        {
          "name": "Finance integration blueprint agreed (5 weeks)",
          "activities": [
            "Map target finance policies, controls, reporting standards, close calendar and account structures to Absa Group Finance, Group Tax and Treasury requirements",
            "Align acquired ledgers to Absa group account structures, cost centres, product hierarchies and management reporting.",
            "Decide whether each finance gap is remediated through migration, configuration, manual posting, reporting adjustment or control"
          ]
        },
        {
          "name": "Acquisition accounting and value tracking completed (6 weeks)",
          "activities": [
            "Finalise purchase accounting, goodwill, premium-to-NAV allocation, amortisation, impairment and group P&L treatment.",
            "Set synergy, stranded-cost, one-off cost and integration-cost tracking against the business case",
            "Agree forecast, budget, capital, liquidity and management reporting changes for the integrated business"
          ]
        },
        {
          "name": "Integrated close and control model tested (4 weeks)",
          "activities": [
            "Test month-end close, reconciliations, reporting outputs, finance interfaces, account ownership and control attestations.",
            "Validate local teams can adopt Absa reporting timings and finance processes, Change Management support where ways of working change",
            "Confirm legacy finance processes are retired, migrated or controlled through approved temporary workarounds"
          ]
        },
        {
          "name": "Post-LD1 finance integration managed (4 weeks)",
          "activities": [
            "Monitor group reporting, first integrated close, tax filings, TSA exit, synergy delivery, cost removal and residual defects",
            "Transfer ongoing finance ownership to BAU Finance, Group Tax, Treasury and local finance teams"
          ]
        }
      ]
    },
    {
      "id": "full-business-acquisition-b-standalone",
      "heading": "Full Business Acquisition B (standalone) - new activity set",
      "tab": "Full Acquisition B (standalone)",
      "lead": "Standalone:",
      "milestones": [
        {
          "name": "Standalone finance control model defined (5 weeks)",
          "activities": [
            "Confirm the acquired business can operate under Absa ownership with its own ledgers, finance governance, reporting, tax, liquidity, controls",
            "Define Absa oversight forums, reporting packs, financial-control attestations, escalation routes and retained local decision rights",
            "Confirm local finance capability, capacity and cultural ways of working that may affect first close or ongoing reporting"
          ]
        },
        {
          "name": "Deal economics and standalone value case maintained (3 weeks)",
          "activities": [
            "Maintain pricing, costing, revenue, premium-to-NAV, goodwill, amortisation, stranded-cost and group P&L assumptions for the standalone state",
            "Agree forecast, budget, capital, liquidity and management reporting treatment for Absa ownership"
          ]
        },
        {
          "name": "Completion, funding and tax model agreed (4 weeks)",
          "activities": [
            "Design completion accounts, funds flow, account authority, settlement, liquidity, FX, capital, tax and payment evidence",
            "Confirm Group Tax, local tax, statutory reporting, regulatory finance and transfer-pricing requirements."
          ]
        },
        {
          "name": "Group Interchange and TSA services established (5 weeks)",
          "activities": [
            "Define which Absa or seller services start, stop or continue, including finance operations, reporting, payment, tax and controls",
            "Set service charges, recharges, buy-backs, invoice routes, evidence requirements, dispute controls and exit milestones"
          ]
        },
        {
          "name": "Ledger and reporting interface tested (6 weeks)",
          "activities": [
            "Map local ledgers to Absa group reporting",
            "Set feeds, manual journals, reporting templates and recon controls."
          ]
        },
        {
          "name": "LD1 and first-close readiness confirmed (4 weeks)",
          "activities": [
            "Rehearse payments, reporting submissions, finance data transfer, controls",
            "Monitor first close, reporting quality, liquidity, tax filings, Group Interchange charges, TSA billing and unresolved finance exceptions through hypercare."
          ]
        }
      ]
    },
    {
      "id": "balance-sheet-sale",
      "heading": "Balance Sheet Sale - baseline divestment activities",
      "tab": "Balance Sheet Sale",
      "milestones": [
        {
          "name": "Sale economics and PnL assessed (3 weeks)",
          "activities": [
            "Confirm sale perimeter, book value, NAV, premium or discount, exposure, residual revenue, direct costs, stranded costs",
            "Model group PnL, capital, liquidity, tax, amortisation, impairment and reporting impacts",
            "Track retained cost, synergy, TSA revenue, service charge and cost-removal assumptions against business case"
          ]
        },
        {
          "name": "Completion mechanism and funds flow designed (4 weeks)",
          "activities": [
            "Define purchase price adjustment approach, completion accounts, effective transfer date, cash and debt treatment, settlement route, bank account requirements and payment cut-offs",
            "Confirm liquidity, FX, tax leakage, bad-debt and late-payment exposures",
            "Coordinate with Legal & CorpDev so finance mechanics, obligations, tax protections and completion evidence are reflected in transaction docs"
          ]
        },
        {
          "name": "Financial data and records prepared (4 weeks)",
          "activities": [
            "Build balance list, supporting ledgers, historic financials, PnL run-rate, buyer data-room materials and recon evidence",
            "Separate transferred records from retained Absa records, tax records, reporting evidence and audit requirements",
            "Define data-sharing restrictions and clean-room arrangements with Compliance, Data Migration and Legal & CorpDev"
          ]
        },
        {
          "name": "Retained service and Group Interchange model assessed (5 weeks)",
          "activities": [
            "Identify Absa services that must continue, stop or be charged to the buyer or disposed business through TSA or Group Interchange arrangements",
            "Set recharge, buy-back, cost recovery, invoicing, tax, MI, dispute and exit mechanics"
          ]
        },
        {
          "name": "Tax and local reporting position assessed (6 weeks)",
          "activities": [
            "Confirm Group Tax view, local tax filings, transfer pricing and retained tax obligation",
            "Capture local reporting, regulatory finance and capital-reporting requirements through Regional Spoke"
          ]
        },
        {
          "name": "LD1 finance readiness tested (4 weeks)",
          "activities": [
            "Test balance transfer, reporting removal, retained-business reporting, reconciliations, funds flow, buyer hand-off and exception handling",
            "Rehearse completion entries, payment instructions, buyer finance hand-off, close timetable and escalation route"
          ]
        },
        {
          "name": "Hypercare and BAU close-out managed (4 weeks)",
          "activities": [
            "Monitor obligations, queries, reconciliations, tax filings, TSA billing, stranded costs and completion items"
          ]
        }
      ]
    },
    {
      "id": "partial-business-sale",
      "heading": "Partial Business Sale - additional divestment activities",
      "tab": "Partial Business Sale",
      "lead": "The above, with the addition of:",
      "milestones": [
        {
          "name": "Shared service and Group Interchange plan defined (5 weeks)",
          "activities": [
            "Identify finance services Absa continues to provide, buyer services that need TSA support, services that must stop at completion",
            "Set recharge, buy-back, service charge, tax, invoice, dispute and exit mechanics for partial perimeter",
            "Provide finance inputs to TSA schedules, buyer hand-off packs and retained-service governance"
          ]
        },
        {
          "name": "Retained-business finance readiness protected (4 weeks)",
          "activities": [
            "Test retained Absa reporting, cost-centre changes, ledger separation, payment routes, reconciliations and local close timetable",
            "Track buyer finance dependencies, retained control actions, local tax reporting and stranded-cost reduction through governance"
          ]
        }
      ]
    },
    {
      "id": "full-business-sale-a-buyer-integrates",
      "heading": "Full Business Sale A (buyer integrates) - further additional divestment activities",
      "tab": "Full Sale A (buyer integrates)",
      "lead": "The above, with the addition of,",
      "milestones": [
        {
          "name": "Buyer integration finance hand-off completed (4 weeks)",
          "activities": [
            "Provide agreed financial data, ledger mapping, historical financials, completion accounts, service charge assumptions and reconciliation evidence to support integration",
            "Coordinate buyer questions, completion evidence, TSA billing set-up and retained Absa reporting through Central Hub",
            "Confirm buyer integration does not disrupt retained Absa continued business"
          ]
        },
        {
          "name": "Absa finance separation and value tracking completed (5 weeks)",
          "activities": [
            "Remove disposed business from Absa reporting, forecasts, budgets, cost centres, management information",
            "Track TSA billing, recharge, stranded-cost unwind, tax filings, retained liabilities and true-ups"
          ]
        }
      ]
    },
    {
      "id": "full-business-sale-b-standalone",
      "heading": "Full Business Sale B (standalone) - complete divestment activity set",
      "tab": "Full Sale B (standalone)",
      "milestones": [
        {
          "name": "Standalone buyer finance operating model assessed (5 weeks)",
          "activities": [
            "Confirm whether the disposed business can operate under buyer ownership with standalone ledgers, reporting, close calendar, bank accounts, tax, liquidity, controls and finance governance",
            "Identify Absa support required for finance operations, reporting, payments, tax, reporting, controls and management information during transition",
            "Define buyer finance governance, reporting packs, escalation routes, control attestations and local decision rights"
          ]
        },
        {
          "name": "Separation mechanics and completion model agreed (4 weeks)",
          "activities": [
            "Create standalone opening balance sheet, completion accounts, funds flow, account authority, settlement, liquidity, FX, capital and tax evidence",
            "Separate Absa reporting structures, retained records, obligations, audit, tax files from disposed",
            "Confirm buyer readiness for first close, local reporting, tax filings and finance controls"
          ]
        },
        {
          "name": "Group Interchange and TSA finance services defined (5 weeks)",
          "activities": [
            "Set service delivery agreements, service scope, prices, recharge and buy-back mechanics, VAT, tax, invoicing, MI, dispute controls and exit milestones",
            "Confirm which Absa services continue, stop or transfer, and how Finance monitors service consumption and cost recovery"
          ]
        },
        {
          "name": "Buyer readiness and retained Absa controls tested (4 weeks)",
          "activities": [
            "Test reporting separation, payment routes, bank access, ledger hand-off, control evidence, service charge process and close timetable.",
            "Rehearse completion entries, buyer hand-off, TSA finance calls, reporting submissions, fallback and escalation route."
          ]
        },
        {
          "name": "Standalone completion and hypercare managed",
          "activities": [
            "Monitor first close, reporting quality, liquidity, tax filings, Group Interchange charges, TSA billing, retained Absa obligations and stranded-cost unwind"
          ]
        }
      ]
    }
  ],
  "sizingFactors": "",
  "sizingDrivers": ["Complex balance-sheet transfer", "Significant number of currencies that are new to the bank", "Complex or opaque true-up / completion process", "Significant level of interchange or TSA charges involved"],
  "partnerServices": [
    {
      "keyService": "Deal economics, pricing and scenario support",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Completion mechanics, funds flow and treasury readiness",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Group Interchange, TSA charging and recharge / buy-back management",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Finance policy, ledger mapping and reporting readiness",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Tax, liquidity, FX and regulatory finance coordination",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Close, reconciliation, cutover and hypercare control",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    }
  ]
};
