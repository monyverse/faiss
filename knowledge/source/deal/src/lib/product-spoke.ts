/**
 * Product (Business) SA Functional Spoke.
 *
 * All strings in this file are approved source content reproduced verbatim
 * from the Absa M&A Transaction Operating Model document. Do not summarise,
 * paraphrase or correct the wording.
 */

import type { SpokeContent } from "./spoke-content";

export const CONTENT: SpokeContent = {
  "id": "product",
  "name": "Product (Business)",
  "reference": "",
  "necessityRows": [
    {
      "archetype": "Balance Sheet Acquisition",
      "classification": "Core / Required",
      "rationale": "Core because product proposition continuity, gap analysis, product build, client terms, pricing, front-office readiness is critical for all archetypes"
    },
    {
      "archetype": "Partial Business Acquisition",
      "classification": "Core / Required",
      "rationale": "Core because product proposition continuity, gap analysis, product build, client terms, pricing, front-office readiness is critical for all archetypes"
    },
    {
      "archetype": "Full Business Acquisition A (Buyer integrates the business)",
      "classification": "Core / Required",
      "rationale": "Core because product proposition continuity, gap analysis, product build, client terms, pricing, front-office readiness is critical for all archetypes"
    },
    {
      "archetype": "Full Business Acquisition B (Buyer runs the business standalone)",
      "classification": "Core / Required",
      "rationale": "Core because product proposition continuity, gap analysis, product build, client terms, pricing, front-office readiness is critical for all archetypes"
    },
    {
      "archetype": "Balance Sheet Sale",
      "classification": "Required but scaled",
      "rationale": "Required at lower intensity because product terms, portfolio rules and customer impacts on retained business must be validated"
    },
    {
      "archetype": "Partial Business Sale",
      "classification": "Required but scaled",
      "rationale": "Required at lower intensity because product terms, portfolio rules and customer impacts on retained business must be validated"
    },
    {
      "archetype": "Full Business Sale A (Buyer integrates the business)",
      "classification": "Required but scaled",
      "rationale": "Required at lower intensity because product terms, portfolio rules and customer impacts on retained business must be validated"
    },
    {
      "archetype": "Full Business Sale B (Buyer runs the business as standalone)",
      "classification": "Required but scaled",
      "rationale": "Required at lower intensity because product terms, portfolio rules and customer impacts on retained business must be validated"
    }
  ],
  "keyRole": "Owns product proposition decisions and functional requirements for the portfolio, business or retained customer base\n\n\nNote: For more complex deals, each business area or product may have its own workstream (Markets, Payments, Cards, Wealth, etc.). The roles, responsibilities, capabilities, and broad activities herein still apply.",
  "responsibilities": [
    "Analyse the transferring, retained or acquired product set, including terms, pricing, features, eligibility, mandates and controls",
    "Define product build, adaptation, withdrawal, migration, servicing and client-treatment requirements",
    "Own product functional requirements and front-office process design with Operations & Servicing and Technology.",
    "Act as business SMEs to input into testing, client communications inputs and readiness evidence",
    "Lead the business execution of cutover activities to enable client transaction on LD1",
    "Decide product exceptions, remediation or exclusions within delegated authority and escalate product risk",
    "Support Technology in turning product business requirements into actionable technology requirements which support delivery"
  ],
  "boundaryItems": [
    "Risk / Credit owns risk appetite and credit decisions.",
    "Operations & Servicing owns operational procedures and servicing model",
    "Technology owns system delivery based on business-approved requirements."
  ],
  "centralHubRelationship": "Relationship with Central Hub: the Functional Spoke owns product proposition and requirements decisions and evidence while the Central Hub sets programme standards, coordinates dependencies and escalates transaction-wide issues.",
  "regionalRelationship": [
    "Regional Spokes should own local execution as a minimum, with ownership scaling based on maturity, including product evidence, pricing and terms nuance, customer impact input, local remediation and proposition readiness where they have capacity and delegated authority.",
    "Function Authority retains proposition design, product standards, central product decisions, requirements, exception management and execution ownership where regional maturity, capability or capacity is insufficient.",
    "As regional maturity increases, local ownership should expand from evidence and market input into local product-readiness activity, exception remediation and customer-impact execution, with Function Authority retaining standards, specialist challenge and reserved approvals."
  ],
  "externalDependencies": "",
  "mandateRows": [
    {
      "id": "product-migration-approach",
      "area": "Product migration approach",
      "spokeAuthority": [
        "Owns product recommendation and requirements"
      ],
      "hubRole": "Coordinates cross-workstream plan and dependencies",
      "regionalRole": "",
      "governance": "Product governance, Risk, Legal and Compliance",
      "escalation": "Product cannot be supported or customer detriment risk emerges"
    },
    {
      "id": "feature-pricing-and-terms-treatment",
      "area": "Feature, pricing and terms treatment",
      "spokeAuthority": [
        "Owns treatment proposal within policy"
      ],
      "hubRole": "Tracks decision and cutover dependency",
      "regionalRole": "",
      "governance": "Product, Legal, Compliance and Finance approvals",
      "escalation": "Material economic, conduct or regulatory impact"
    },
    {
      "id": "product-build-priority",
      "area": "Product build priority",
      "spokeAuthority": [
        "Recommends scope and prioritisation"
      ],
      "hubRole": "Challenges critical path and readiness implications",
      "regionalRole": "",
      "governance": "Programme governance and Technology prioritisation forum",
      "escalation": "Build scope threatens LD1 or TSA exit"
    },
    {
      "id": "product-exclusions-or-remediation",
      "area": "Product exclusions or remediation",
      "spokeAuthority": [
        "Recommends client or product treatment"
      ],
      "hubRole": "Coordinates executive escalation",
      "regionalRole": "",
      "governance": "Risk, Compliance and Legal approval",
      "escalation": "Unacceptable risk, incomplete documentation or unsupported product feature"
    },
    {
      "id": "product-readiness-and-exceptions",
      "area": "Product readiness and exceptions",
      "spokeAuthority": [
        "Recommends product proposition and requirements readiness status, accepted exceptions and residual risk position"
      ],
      "hubRole": "Integrates into go/no-go and completion governance",
      "regionalRole": "",
      "governance": "Programme governance, relevant functional authority and control owners",
      "escalation": "Critical product readiness evidence, dependency or exception remains unresolved at go/no-go"
    }
  ],
  "capabilityRows": [
    {
      "category": "Specific Project Manager required?",
      "content": "Yes - product streams usually involve significant coordination across business, tech, and ops"
    },
    {
      "category": "Baseline capabilities",
      "content": "Product proposition analysis, pricing, product-control design, requirements definition and front-office SME testing."
    },
    {
      "category": "Incremental capabilities by deal archetype / complexity",
      "content": "Product build and strategy, client migration, product harmonisation, channel integration and product separation"
    },
    {
      "category": "Specialist capabilities triggered by deal characteristics",
      "content": "Payments, accounts, lending, global markets, investment banking, wealth, insurance or highly regulated products."
    }
  ],
  "milestoneIntro": [
    "The key milestones below are organised as a baseline set, with additional milestones required for more complex deal archetypes split out below as required.",
    "As deal archetypes scale from balance sheet to partial business to full business, each product milestone should be assessed against the transaction perimeter, product complexity, customer impact, regulatory obligations and technology / operational readiness required for LD1.",
    "Service catalogue:"
  ],
  "serviceCatalogue": [
    "Product inventory, mapping and gap analysis",
    "Product usage, pricing, profitability and terms analysis",
    "Product treatment, exception and client-impact decisioning",
    "Product requirements and acceptance criteria definition",
    "Pricing, billing, reporting and channel readiness inputs",
    "Product SME support for Technology, Operations, Data, Finance, Risk, Legal, Compliance, Communications and Client Readiness",
    "Business SME support for testing, UAT and product-readiness evidence",
    "Product cutover, go-live and hypercare ownership"
  ],
  "activitySets": [
    {
      "id": "balance-sheet-acquisition",
      "heading": "Balance Sheet Acquisition - baseline activities",
      "tab": "Balance Sheet Acquisition",
      "milestones": [
        {
          "name": "Product inventory and transaction perimeter confirmed (4 weeks)",
          "activities": [
            "Compile all in-scope products, features, accounts, services, channels and customer groups that transfer or require Absa support.",
            "Identify retained, excluded, dormant, unsupported or restricted product variants and the rationale for treatment.",
            "Capture product owners, volumes, usage, revenue, profitability, pricing, operational dependencies and control points."
          ]
        },
        {
          "name": "Product mapping and gap analysis completed (5 weeks)",
          "activities": [
            "Map source products to target Absa equivalents or target-state treatments.",
            "Compare product features, terms, pricing, fees, billing, servicing, reporting, channel access, controls and documentation.",
            "Identify gaps, unsupported features, control changes, customer-impact items and dependencies for Risk, Credit, Legal, Compliance, Finance, Operations and Technology."
          ]
        },
        {
          "name": "Product treatment strategy and client impact agreed (4 weeks)",
          "activities": [
            "Decide which products migrate unchanged, migrate with changes, require build, require workaround, are grandfathered, are withdrawn or are excluded.",
            "Define customer treatment, pricing / terms changes, client communications inputs, exception principles and approval requirements.",
            "Align treatment decisions with Risk, Legal, Compliance, Finance, Operations, Communications and Relationship teams."
          ]
        },
        {
          "name": "Product requirements and acceptance criteria defined (4 weeks)",
          "activities": [
            "Define high-level business requirements for Technology, Operations, Data Migration, Finance, Risk / Credit, KYC / AML and Client Readiness.",
            "Set product acceptance criteria for build, configuration, data, operational process, reporting, client communication and testing.",
            "Prioritise requirements by LD1 criticality, customer impact, regulatory exposure and operational feasibility."
          ]
        },
        {
          "name": "Product build, change and readiness plan mobilised (5 weeks)",
          "activities": [
            "Convert product requirements into a tracked delivery plan with owners, dependencies, decisions and evidence expectations, aligned to technology delivery schedules",
            "Track product pricing, billing, reporting, channel, documentation and operational readiness with technology",
            "Agree Product Owner sign-off cadence for design, build, UAT, cutover and residual exceptions."
          ]
        },
        {
          "name": "Product readiness evidenced for LD1 (3 weeks)",
          "activities": [
            "Support UAT, friendly client validation or operational readiness checks where product SME input is required.",
            "Confirm that priority product / client cohorts can transact, be serviced, be billed and be reported from LD1.",
            "Sign off residual exceptions, workarounds and hypercare actions with named owners."
          ]
        }
      ]
    },
    {
      "id": "partial-business-acquisition",
      "heading": "Partial Business Acquisition - additional activities",
      "tab": "Partial Business Acquisition",
      "lead": "The above, with the addition of:",
      "milestones": [
        {
          "name": "Product perimeter and shared dependencies separated (4 weeks)",
          "activities": [
            "Separate transferring, retained and shared products, client cohorts, product rules, operational processes and channel dependencies.",
            "Identify where products rely on seller services, Absa retained services, shared data, third parties or transition support.",
            "Confirm the boundary between Product, Operations, Technology, Data Migration, Finance and Legal ownership."
          ]
        },
        {
          "name": "Product migration and retained treatment agreed (5 weeks)",
          "activities": [
            "Define how each product population will transfer, convert, remain, run off, close, be novated or be serviced under a transitional route.",
            "Agree treatment for in-flight transactions, open commitments, customer instructions, billing, statements, reporting and product documentation.",
            "Document retained-business impacts, customer treatment, exceptions and approvals."
          ]
        },
        {
          "name": "Product and client readiness tracking expanded (4 weeks)",
          "activities": [
            "Create a product readiness view by product family, customer group, channel, geography and priority cohort.",
            "Track product decisions, requirements, testing, communications inputs, channel readiness and Operations readiness together.",
            "Escalate product blockers that threaten LD1 client transactability or operational continuity."
          ]
        }
      ]
    },
    {
      "id": "full-business-acquisition-a-integrated",
      "heading": "Full Business Acquisition A (integrated) - further additional activities",
      "tab": "Full Business Acquisition A (integrated)",
      "lead": "The above, with the addition of:",
      "milestones": [
        {
          "name": "Product harmonisation blueprint approved (6 weeks)",
          "activities": [
            "Define target Absa product set, product hierarchy, proposition changes, pricing approach, client treatment and transition principles.",
            "Agree where acquired products are harmonised, retained temporarily, retired, rebuilt or supported through workaround.",
            "Confirm approvals from Product, Risk, Legal, Compliance, Finance, Operations and Technology governance."
          ]
        },
        {
          "name": "Product rationalisation and post-LD1 roadmap agreed (5 weeks)",
          "activities": [
            "Agree which product exceptions, temporary workarounds or retained legacy features remain after LD1.",
            "Define roadmap for product simplification, migration, harmonisation, withdrawal or strategic build after completion.",
            "Hand over residual product actions to BAU product owners and transformation teams."
          ]
        }
      ]
    },
    {
      "id": "full-business-acquisition-b-standalone",
      "heading": "Full Business Acquisition B (standalone) - new activity set",
      "tab": "Full Business Acquisition B (standalone)",
      "lead": "Standalone:",
      "milestones": [
        {
          "name": "Standalone product governance and catalogue established (5 weeks)",
          "activities": [
            "Define product ownership, decision rights, governance forums, product hierarchy and approval routes for the standalone business.",
            "Create a complete product catalogue covering terms, pricing, features, customer groups, controls, reporting and support routes.",
            "Confirm which product standards are standalone, Absa-owned, locally owned or reserved for group approval."
          ]
        },
        {
          "name": "Standalone product operating requirements defined (6 weeks)",
          "activities": [
            "Define product requirements for servicing, channels, operations, data, technology, controls, documentation, complaints and client support.",
            "Identify product-specific policies, procedures, delegations, mandates, limits and approvals required for the standalone business.",
            "Set acceptance criteria for standalone product readiness and BAU handover."
          ]
        },
        {
          "name": "Product systems, channels and servicing dependencies readied (8 weeks)",
          "activities": [
            "Track delivery of product configuration, channel access, operating procedures, reporting, billing, documentation and servicing changes.",
            "Coordinate Product SME input into Technology, Data Migration, Operations, E2E Testing and Client Readiness.",
            "Resolve product blockers, unsupported features and temporary workarounds before LD1."
          ]
        },
        {
          "name": "Standalone LD1 product launch and hypercare executed (4 weeks)",
          "activities": [
            "Confirm the standalone product set can transact, be serviced, be controlled and be reported from LD1.",
            "Operate product issue triage and SME support during LD1 and early hypercare.",
            "Transfer residual product actions to standalone BAU product owners."
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
          "name": "Product divestment perimeter and retained business impact confirmed (4 weeks)",
          "activities": [
            "Confirm the product set, client cohorts, balances, transactions, rights, obligations and features included in the sale perimeter.",
            "Identify retained products, excluded products, customer-impact items and Absa residual obligations.",
            "Assess impacts on retained business pricing, reporting, servicing, controls and customer journeys."
          ]
        },
        {
          "name": "Product data, terms and client population prepared for buyer process (4 weeks)",
          "activities": [
            "Prepare product descriptions, terms, pricing, client population, usage, profitability, reporting and operational evidence for buyer diligence.",
            "Validate product data and business meaning with Data Migration, Finance, Risk, Operations and Legal.",
            "Identify product information that must be excluded, masked or controlled during disclosure."
          ]
        },
        {
          "name": "Product transfer, closure or run-off treatment agreed (5 weeks)",
          "activities": [
            "Define whether products transfer, close, run off, remain with Absa, are supported through TSA or require buyer setup.",
            "Agree customer treatment, communications input, notices, documentation, billing, reporting and support implications.",
            "Escalate product exceptions, unsupported features and customer detriment risks."
          ]
        },
        {
          "name": "Retained product servicing and customer treatment protected (4 weeks)",
          "activities": [
            "Confirm retained Absa products can continue to be serviced, billed, reported and controlled after divestment.",
            "Agree customer support routes and issue ownership for product queries before and after LD1.",
            "Track retained product dependencies with Operations, Technology, Finance, Risk, Legal and Compliance."
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
          "name": "Shared product and client perimeter separated (5 weeks)",
          "activities": [
            "Separate transferred, retained and shared product propositions, client cohorts, features, pricing, channels and support requirements.",
            "Identify stranded features, shared servicing, reporting, documentation, billing and customer-impact dependencies.",
            "Agree decision rights for product exceptions and customer treatment across buyer, seller and Absa teams."
          ]
        },
        {
          "name": "TSA and retained product support route defined (5 weeks)",
          "activities": [
            "Define product services that Absa continues, stops, transfers or supports through a TSA.",
            "Set product service standards, exit milestones, dependency owners, reporting and escalation routes.",
            "Confirm product terms and customer treatment remain consistent with legal documents and operational capability."
          ]
        },
        {
          "name": "Product carve-out exceptions and client treatment governed (4 weeks)",
          "activities": [
            "Maintain a log of product exceptions, unsupported features, customer-treatment decisions and residual obligations.",
            "Escalate exceptions that affect customer outcomes, legal commitments, regulatory obligations or buyer readiness.",
            "Hand over open product carve-out actions to TSA, BAU or post-completion owners."
          ]
        }
      ]
    },
    {
      "id": "full-business-sale-a-buyer-integrates",
      "heading": "Full Business Sale A (buyer integrates) - further additional divestment activities",
      "tab": "Full Business Sale A (buyer integrates)",
      "lead": "The above, with the addition of:",
      "milestones": [
        {
          "name": "Absa retained product obligations and exit controls managed (4 weeks)",
          "activities": [
            "Track Absa retained product obligations, TSA product services, claims support, data access, reporting and product-control evidence.",
            "Confirm buyer integration does not create unsupported Absa product obligations or customer-impact risk.",
            "Define approval route for product waivers, changes, exceptions and post-completion disputes."
          ]
        }
      ]
    },
    {
      "id": "full-business-sale-b-standalone",
      "heading": "Full Business Sale B (standalone) - complete divestment activity set",
      "tab": "Full Business Sale B (standalone)",
      "lead": "Standalone:",
      "milestones": [
        {
          "name": "Full product separation and buyer handover pack completed (6 weeks)",
          "activities": [
            "Prepare complete product handover pack covering catalogue, terms, features, pricing, client cohorts, data, reporting, controls and open issues.",
            "Define product obligations that transfer, remain with Absa, are supported through TSA or require post-completion governance.",
            "Confirm local and regulatory product requirements with Legal, Compliance, Risk and regional teams."
          ]
        },
        {
          "name": "Product TSA and retained Absa obligations controlled (5 weeks)",
          "activities": [
            "Define any product-related TSA services, information rights, reporting, support routes, service standards and exit milestones.",
            "Track retained Absa product obligations, customer support exposure, buyer dependencies and issue resolution through governance.",
            "Confirm product arrangements support customer continuity without creating unsupported Absa obligations."
          ]
        },
        {
          "name": "Product exit readiness and final handover completed (4 weeks)",
          "activities": [
            "Confirm buyer readiness, Absa exit actions, product evidence, completion deliverables and support handover before go / no-go.",
            "Advise on product questions during LD1, cutover and early hypercare within agreed obligations.",
            "Archive product decisions, exception logs, handover packs and residual actions for BAU or post-transaction owners."
          ]
        }
      ]
    }
  ],
  "sizingFactors": "",
  "sizingDrivers": ["Significant number of new products must be built", "Fewer new products are required, but they are complex to build", "Minimal product expertise exists for the new products required", "Product set spans PPB and CIB"],
  "partnerServices": [
    {
      "keyService": "Product inventory, mapping and gap analysis",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Product usage, pricing, profitability and terms analysis",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Product treatment, exception and client-impact decisioning",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Product requirements and acceptance criteria definition",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Pricing, billing, reporting and channel readiness inputs",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Product SME support for Technology, Operations, Data, Finance, Risk, Legal, Compliance, Communications and Client Readiness",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Business SME support for testing, UAT and product-readiness evidence",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Product cutover, go-live and hypercare ownership",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    }
  ]
};
