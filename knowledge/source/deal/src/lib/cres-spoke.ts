/**
 * CRES SA Functional Spoke.
 *
 * All strings in this file are approved source content reproduced verbatim
 * from the Absa M&A Transaction Operating Model document. Do not summarise,
 * paraphrase or correct the wording.
 */

import type { SpokeContent } from "./spoke-content";

export const CONTENT: SpokeContent = {
  "id": "cres",
  "name": "CRES",
  "reference": "",
  "necessityRows": [
    {
      "archetype": "Balance Sheet Acquisition",
      "classification": "Not typically a standalone workstream",
      "rationale": "Balance sheet archetypes usually do not include the transfer of real-estate assets, as these are often tied to employee transfer or larger business integration of branches, ATMs etc"
    },
    {
      "archetype": "Partial Business Acquisition",
      "classification": "Conditionally required",
      "rationale": "Required if the partial perimeter includes real estate asset transfer such as offices, branches, or ATMs"
    },
    {
      "archetype": "Full Business Acquisition A (Buyer integrates the business)",
      "classification": "Core / Required",
      "rationale": "Core because these archetypes usually involve early estate diligence, workplace design, property transfer, fit-out, employee moves, certifications and portfolio optimization, ATM/branch rationalization where required"
    },
    {
      "archetype": "Full Business Acquisition B (Buyer runs the business standalone)",
      "classification": "Core / Required",
      "rationale": "Core because these archetypes usually involve early estate diligence, workplace design, property transfer, fit-out, employee moves, certifications and portfolio optimization, ATM/branch rationalization where required"
    },
    {
      "archetype": "Balance Sheet Sale",
      "classification": "Not typically a standalone workstream",
      "rationale": "Balance sheet archetypes usually do not include the transfer of real-estate assets, as these are often tied to employee transfer or larger business integration of branches, ATMs etc"
    },
    {
      "archetype": "Partial Business Sale",
      "classification": "Conditionally required",
      "rationale": "Required if the partial perimeter includes real estate asset transfer such as offices, branches, or ATMs"
    },
    {
      "archetype": "Full Business Sale A (Buyer integrates the business)",
      "classification": "Core / Required",
      "rationale": "Core because these archetypes usually involve early estate diligence, workplace design, property transfer, fit-out, employee moves, certifications and portfolio optimization, ATM/branch rationalization where required"
    },
    {
      "archetype": "Full Business Sale B (Buyer runs the business as standalone)",
      "classification": "Core / Required",
      "rationale": "Core because these archetypes usually involve early estate diligence, workplace design, property transfer, fit-out, employee moves, certifications and portfolio optimization, ATM/branch rationalization where required"
    }
  ],
  "keyRole": "Protects business continuity across the property estate while delivering the property, facilities and workplace changes required for integration, separation and longer-term estate optimisation. CRES confirms that critical premises and workplace services are operationally ready for LD1 and that property obligations are controlled through transition.",
  "responsibilities": [
    "Engage from due diligence to define the property and facilities perimeter, identify critical premises and surface long-lead estate dependencies before transaction terms and plans are fixed.",
    "Assess owned and leased properties, occupancy, capacity, condition, utilisation, critical services, property contracts, costs, constraints and opportunities across the transaction perimeter.",
    "Define the estate strategy and treatment for each location, including retain, transfer, assign, consolidate, relocate, fit out, share, sublet, terminate or dispose.",
    "Develop property options, affordability assessments, business cases, capital and operating cost estimates, architecture input and governance submissions.",
    "Manage leases, property agreements, landlord interfaces and facilities contracts with Legal, Procurement, Finance & Tax and in-country CRES teams.",
    "Plan and deliver workplace design, construction, fit-out, moves, facilities mobilisation and long-lead procurement, allowing up to six months where new or materially changed premises are required.",
    "Coordinate certifications, health and safety, physical security, access control, parking, utilities, workplace technology, cleaning, maintenance, catering and employee-facing workplace services.",
    "Own the end-to-end workplace journey with Human Capital and Change Management, including employee impact,",
    "Define and execute plans for branch and ATM rationalization and harmonization where required, driven by in-country teams"
  ],
  "boundaryItems": [
    "CRES owns the property, workplace and facilities journey; Human Capital and Change Management own broader people impacts, communications and adoption with CRES input.",
    "Procurement owns commercial sourcing and supplier process; CRES defines property and facilities requirements, technical specifications, service standards and acceptance evidence."
  ],
  "centralHubRelationship": "Relationship with Central Hub: CRES owns property, facilities and workplace decisions and evidence while the Central Hub integrates the estate roadmap into the programme plan, tracks long-lead dependencies and budget impacts, applies quality assurance and escalates readiness risks.",
  "regionalRelationship": [
    "Regional Spokes should own local execution as a minimum, with ownership scaling based on maturity, including site surveys, landlord and supplier engagement, local approvals, facilities mobilisation, moves and readiness evidence where capability and capacity allow. Regional teams must own ATM and branch-related activities",
    "Function Authority retains estate strategy, standards, architecture, affordability challenge, complex property decisions and execution ownership where regional maturity, capability or capacity is insufficient.",
    "As regional maturity increases, ownership should expand from local evidence and coordination into end-to-end country estate delivery, with Function Authority retaining standards, specialist challenge and reserved approvals."
  ],
  "externalDependencies": "",
  "mandateRows": [
    {
      "id": "estate-perimeter-and-site-treatment",
      "area": "Estate perimeter and site treatment",
      "spokeAuthority": [
        "Defines affected premises and recommends retain, transfer, consolidate, relocate, share, exit or dispose treatment for each site."
      ],
      "hubRole": "Integrates site decisions, dependencies, assumptions and timing into the programme plan and decision calendar.",
      "regionalRole": "",
      "governance": "CRES leadership, deal sponsor, business owner, Finance & Tax, Legal & CorpDev and country leadership.",
      "escalation": "Critical site, occupancy, ownership, lease, customer or operational dependency is unclear or disputed."
    },
    {
      "id": "property-strategy-affordability-and-investment",
      "area": "Property strategy, affordability and investment",
      "spokeAuthority": [
        "Recommends estate option, design basis, affordability, capital and operating spend, and property business case."
      ],
      "hubRole": "Tests plan and budget impact, coordinates governance and tracks approved spend against the integrated plan.",
      "regionalRole": "",
      "governance": "CRES investment governance, Finance & Tax, Procurement and accountable executive approvals.",
      "escalation": "Funding gap, approval delay, long-lead item or affordability issue threatens readiness."
    },
    {
      "id": "lease-property-contract-and-landlord-route",
      "area": "Lease, property contract and landlord route",
      "spokeAuthority": [
        "Defines required assignment, novation, variation, termination, new lease, consent and landlord negotiation positions."
      ],
      "hubRole": "Tracks legal, counterparty and completion dependencies and escalates delays through programme governance.",
      "regionalRole": "",
      "governance": "CRES, Legal & CorpDev, Procurement, Finance & Tax and local governance as applicable.",
      "escalation": "Consent, title, lease, contract or landlord issue affects transaction terms, occupancy or LD1."
    },
    {
      "id": "workplace-design-and-delivery",
      "area": "Workplace design and delivery",
      "spokeAuthority": [
        "Approves functional requirements, workplace standards, architecture, fit-out scope, facilities model and acceptance criteria."
      ],
      "hubRole": "Coordinates cross-workstream dependencies, critical path, budget and readiness reporting.",
      "regionalRole": "",
      "governance": "CRES design and delivery governance, Physical Security, Technology, Human Capital, Change and country leadership.",
      "escalation": "Design freeze, contractor, certification, technology, security or move dependency threatens delivery."
    },
    {
      "id": "atm-and-branch-rationalisation-planning",
      "area": "ATM and Branch rationalisation planning",
      "spokeAuthority": [
        "Defines the plan and required activities to rationalise ATMs and Branches, working alongside product and technology teams to assess location and usage"
      ],
      "hubRole": "Coordinates cross-workstream dependencies, critical path, budget and readiness reporting.",
      "regionalRole": "",
      "governance": "CRES, Legal & CorpDev, Procurement, Business, Technology and local governance as applicable.",
      "escalation": "Dispute over rationalisation plans with buyer / regulator"
    },
    {
      "id": "ld1-estate-readiness-and-residual-risk",
      "area": "LD1 estate readiness and residual risk",
      "spokeAuthority": [
        "Recommends premises readiness, controlled exceptions, handover approach and post-LD1 estate actions."
      ],
      "hubRole": "Integrates CRES evidence and residual risk into go/no-go, cutover, hypercare and BAU transition governance.",
      "regionalRole": "",
      "governance": "Programme SteerCo, accountable business owner, CRES and country leadership.",
      "escalation": "Critical premises, access, safety, facilities service or certification is not ready or evidenced."
    }
  ],
  "capabilityRows": [
    {
      "category": "Specific Project Manager required?",
      "content": "Maybe - for any material property change, multi-site transaction, workplace move or fit-out. Smaller transactions may use a named CRES delivery lead within the integrated programme plan."
    },
    {
      "category": "Baseline capabilities",
      "content": "Estate strategy; portfolio and occupancy analysis; lease and property management; workplace and facilities management; project management; affordability assessment; landlord and supplier coordination; health, safety and readiness control."
    },
    {
      "category": "Incremental capabilities by deal archetype / complexity",
      "content": "Architecture and workplace design; construction and fit-out delivery; relocation planning; complex lease restructuring; multi-site and multi-country coordination; shared-site separation; property disposal; TSA service design; ATM rationalisation, Branch rationalisation"
    },
    {
      "category": "Specialist capabilities triggered by deal characteristics",
      "content": "Property valuation; engineering and building condition; environmental assessment; physical security; fire and life safety; accessibility; data centre or specialist facility expertise; local certification and property-law support."
    }
  ],
  "milestoneIntro": [
    "The key milestones below are organised as a baseline set, with additional milestones required for more complex deal archetypes split out below as required.",
    "As deal archetypes scale from balance sheet to partial business to full business, each baseline activity should be assessed against the complexity factors laid out in the deal archetypes documentation, and assessed for whether its size or scope increases as a result of deal specifics.",
    "Service catalogue:"
  ],
  "serviceCatalogue": [
    "Estate due diligence, perimeter definition and critical-site assessment",
    "Portfolio strategy, options analysis, affordability and investment governance",
    "Lease, landlord, title and property contract management",
    "Workplace design, architecture, construction, fit-out and moves",
    "Facilities, utilities, physical access, parking and workplace services mobilisation",
    "ATM / Branch rationalisation",
    "Health, safety, security, certification and statutory readiness",
    "Employee workplace journey, briefing packs and change coordination",
    "LD1 estate readiness, property cutover, handover and optimisation"
  ],
  "activitySets": [
    {
      "id": "balance-sheet-acquisition",
      "heading": "Balance Sheet Acquisition - baseline activities",
      "tab": "Balance Sheet Acquisition",
      "lead": "Not required",
      "milestones": []
    },
    {
      "id": "partial-business-acquisition",
      "heading": "Partial Business Acquisition - additional activities",
      "tab": "Partial Business Acquisition",
      "milestones": [
        {
          "name": "Transferred and retained estate boundary agreed (5 weeks)",
          "activities": [
            "Map transferred, retained and shared premises, space, services, contracts, people and records.",
            "Define which party owns each site action, cost, approval, service and residual obligation.",
            "Reflect the physical and service boundary in transaction documents, plans and readiness criteria."
          ]
        },
        {
          "name": "Property strategy and affordability approved (6 weeks)",
          "activities": [
            "Define treatment for each affected site and test retain, relocate, consolidate, share or exit options.",
            "Prepare capital and operating cost estimates, affordability analysis and property business-case inputs.",
            "Obtain CRES, Finance and accountable executive approval for the preferred estate route."
          ]
        },
        {
          "name": "Property rights and facilities route agreed (8 weeks)",
          "activities": [
            "Confirm lease, title, landlord, consent, assignment, novation, variation and facilities contract requirements.",
            "Coordinate legal drafting, commercial terms, supplier actions and completion dependencies with Legal and Procurement.",
            "Set evidence standards and owners for each property or facilities obligation through LD1."
          ]
        },
        {
          "name": "ATM / Branch handover plans complete (6 weeks)",
          "activities": [
            "Location and usage of branches and ATMs analysed alongside business and technology",
            "Joint asset survey carried out by in-country team",
            "Tech and security assessment of ATMs / Branches carried out",
            "Plan defined for the closure, retention, or replacement of branches and ATMs",
            "Plan socialised with seller and regulator for approval"
          ]
        },
        {
          "name": "Shared-site and interim workplace arrangements established (8 weeks)",
          "activities": [
            "Define co-location, access, security, facilities, utilities, parking and shared-service arrangements.",
            "Agree TSA or interim service levels, costs, governance, issue routes and exit dates.",
            "Test that employee, customer and operational journeys remain workable throughout transition."
          ]
        },
        {
          "name": "Phased moves, fit-out and workplace changes delivered (16 weeks)",
          "activities": [
            "Sequence moves, fit-out, workstation, storage, signage and workplace technology changes around business continuity.",
            "Coordinate contractors, suppliers, certifications and employee communications through the integrated plan.",
            "Complete move readiness, day-one support and post-move issue closure for each affected location."
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
          "name": "Integrated estate consolidation plan approved (4 weeks)",
          "activities": [
            "Compare the acquired and Absa portfolios for capacity, location, cost, condition and strategic fit.",
            "Define consolidation, relocation, refurbishment, lease exit and retained-site actions with dependencies and benefits.",
            "Approve the integrated estate roadmap, funding and decision sequence through CRES and programme governance."
          ]
        },
        {
          "name": "Large-scale workplace integration delivered (8 weeks)",
          "activities": [
            "Complete architecture, design freeze, statutory approvals, long-lead procurement, construction and fit-out.",
            "Plan employee moves and workplace change with Human Capital, Change, Technology and Physical Security.",
            "Commission facilities and workplace services, close defects and demonstrate readiness before occupancy."
          ]
        },
        {
          "name": "Post-integration estate optimisation launched (12 weeks)",
          "activities": [
            "Validate utilisation, service performance, cost, employee experience and residual lease exposure after LD1.",
            "Prioritise portfolio optimisation, surplus-space, sublease, disposal and service-improvement actions.",
            "Transfer the approved optimisation roadmap, benefits and obligations to CRES BAU governance."
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
          "name": "Standalone estate strategy and governance mobilised (6 weeks)",
          "activities": [
            "Define the standalone property operating model, decision rights, standards, delivery leadership and reporting cadence.",
            "Confirm the complete site portfolio, critical facilities and minimum LD1 operating requirements.",
            "Establish country-led execution with central CRES support based on maturity, capability and capacity."
          ]
        },
        {
          "name": "Full portfolio diligence and valuation completed (8 weeks)",
          "activities": [
            "Assess title, leases, occupancy, condition, capacity, compliance, costs and property risks across every site.",
            "Commission valuations, surveys, engineering or environmental reviews where transaction risk requires them.",
            "Convert findings into price, document, investment, remediation and readiness actions."
          ]
        },
        {
          "name": "Standalone property and supplier arrangements established (12 weeks)",
          "activities": [
            "Put in place required leases, licences, landlord consents, facilities contracts, utilities and workplace services.",
            "Complete sourcing, legal documentation, budget approval and supplier mobilisation for the standalone perimeter.",
            "Confirm contracts, service levels, escalation routes and payment mechanisms are operational before LD1."
          ]
        },
        {
          "name": "ATM / Branch handover plans complete (6 weeks)",
          "activities": [
            "Location and usage of branches and ATMs analysed alongside business and technology",
            "Joint asset survey carried out by in-country team",
            "Tech and security assessment of ATMs / Branches carried out",
            "Plan defined for the closure, retention, or replacement of branches and ATMs",
            "Plan socialised with seller and regulator for approval"
          ]
        },
        {
          "name": "Complete workplace infrastructure delivered (14 weeks)",
          "activities": [
            "Design and deliver space, fit-out, furniture, storage, signage, physical security and workplace technology dependencies.",
            "Coordinate construction, long-lead items, site access, certifications and phased occupancy without disrupting operations.",
            "Commission facilities and resolve defects against agreed acceptance criteria."
          ]
        },
        {
          "name": "Standalone LD1 estate readiness proven (6 weeks)",
          "activities": [
            "Validate premises, facilities, utilities, safety, security, access, parking and employee services at every critical site.",
            "Run site readiness reviews and rehearsals with country teams, business owners and dependent workstreams.",
            "Approve controlled exceptions and integrate residual risks into LD1 go/no-go governance."
          ]
        },
        {
          "name": "Estate stabilisation and optimisation completed (12 weeks)",
          "activities": [
            "Operate hypercare for incidents, service failures, defects, occupancy issues and employee experience concerns.",
            "Close temporary arrangements and transfer contracts, asset records, compliance evidence and obligations to BAU.",
            "Confirm the next-wave portfolio optimisation roadmap and benefits baseline."
          ]
        }
      ]
    },
    {
      "id": "balance-sheet-sale",
      "heading": "Balance Sheet Sale - baseline divestment activities",
      "tab": "Balance Sheet Sale",
      "lead": "Not required",
      "milestones": []
    },
    {
      "id": "partial-business-sale",
      "heading": "Partial Business Sale - additional divestment activities",
      "tab": "Partial Business Sale",
      "milestones": [
        {
          "name": "Property separation strategy approved (6 weeks)",
          "activities": [
            "Define transfer, assignment, shared use, relocation, closure and retained-property treatment by site.",
            "Quantify separation cost, retained exposure, investment needs and buyer or landlord dependencies.",
            "Approve the preferred route, budget and decision sequence with CRES, Finance, Legal and the deal sponsor."
          ]
        },
        {
          "name": "Property transfer and consent route completed (10 weeks)",
          "activities": [
            "Prepare lease, title, landlord, facilities contract and property evidence required by the buyer.",
            "Secure assignments, novations, variations, consents, notices or termination agreements as applicable.",
            "Track completion conditions and evidence through the legal obligations and programme readiness logs."
          ]
        },
        {
          "name": "Shared-site and TSA property services agreed (8 weeks)",
          "activities": [
            "Define access, reception, utilities, facilities, maintenance, parking, security and workplace services required after completion.",
            "Agree service levels, charging, governance, incident routes and exit milestones with the buyer.",
            "Confirm the arrangements are reflected in legal documents and executable by suppliers and country teams."
          ]
        },
        {
          "name": "Physical separation and moves completed (16 weeks)",
          "activities": [
            "Deliver partitions, access changes, signage, move activity, storage, equipment and workplace technology dependencies.",
            "Coordinate employee and customer communications, site disruption controls and move support.",
            "Validate separation effectiveness, service continuity and residual safety or security exceptions."
          ]
        },
        {
          "name": "LD1 premises transition and residual handover completed (8 weeks)",
          "activities": [
            "Implement access, security, facilities, signage, records, workplace and employee service changes.",
            "Confirm buyer and Absa retained premises are safe, operational and appropriately separated at LD1.",
            "Hand over retained obligations, TSA services, open defects and property actions to named post-close owners."
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
          "name": "Buyer integration estate handover agreed (6 weeks)",
          "activities": [
            "Define the property data, lease, asset, facilities, compliance and site-operating pack required by the buyer.",
            "Confirm buyer integration actions align with property rights, consents, customer needs and Absa retained obligations.",
            "Set handover acceptance criteria, owners and dates through joint readiness governance."
          ]
        },
        {
          "name": "Absa premises exits and consolidation delivered (10 weeks)",
          "activities": [
            "Plan and execute relocations, closures, lease exits, asset removals and reinstatement obligations.",
            "Coordinate contractors, suppliers, employee moves and service continuity across the affected portfolio.",
            "Evidence vacant possession, decommissioning, landlord acceptance and financial close-out where required."
          ]
        },
        {
          "name": "Retained exposure and TSA exit closed (10 weeks)",
          "activities": [
            "Track residual leases, guarantees, shared services, access rights, defects, claims and buyer dependencies after LD1.",
            "Complete TSA exit, access removal, supplier changes and property obligation transfer.",
            "Close or transfer remaining risks with approved evidence and accountable BAU owners."
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
          "name": "Standalone estate sale perimeter and strategy approved (8 weeks)",
          "activities": [
            "Define the complete estate, facilities, supplier, employee and compliance perimeter required by the buyer.",
            "Set the property transfer route, buyer standalone assumptions, retained Absa obligations and critical dates.",
            "Approve the separation roadmap, governance, cost and evidence standards."
          ]
        },
        {
          "name": "Buyer standalone facilities model mobilised (12 weeks)",
          "activities": [
            "Confirm buyer facilities leadership, country execution capability, supplier model, standards and escalation routes.",
            "Establish utilities, maintenance, cleaning, security, workplace and other essential service arrangements.",
            "Test supplier mobilisation, contract readiness and operating procedures before completion."
          ]
        },
        {
          "name": "Leases, titles and property contracts transferred (10 weeks)",
          "activities": [
            "Complete due diligence, landlord negotiation, title actions, consents, assignments, novations and notices.",
            "Track buyer and Absa conditions, documents, payments and evidence against the completion plan.",
            "Resolve rejected consents or delayed transfers through approved interim or TSA arrangements."
          ]
        },
        {
          "name": "Standalone workplace readiness demonstrated (10 weeks)",
          "activities": [
            "Deliver required fit-out, access, facilities, safety, security, signage, storage and workplace technology dependencies.",
            "Complete certifications, inspections, site readiness reviews and remediation across all critical premises.",
            "Confirm employee and customer journeys can operate without unsupported Absa intervention."
          ]
        },
        {
          "name": "Completion and property handover executed (6 weeks)",
          "activities": [
            "Execute site, key, access, asset, record, contract and compliance evidence handover to the buyer.",
            "Operate joint command and escalation arrangements for property and facilities issues through LD1.",
            "Confirm retained Absa locations, information and physical assets remain protected."
          ]
        },
        {
          "name": "Residual property obligations and TSA services closed (12 weeks)",
          "activities": [
            "Monitor service performance, lease or title actions, claims, defects, reinstatement and retained exposure after completion.",
            "Complete TSA exit, access removal, supplier separation and evidence archive.",
            "Transfer any remaining obligations to accountable buyer or Absa BAU owners and close programme governance."
          ]
        }
      ]
    }
  ],
  "sizingFactors": "",
  "sizingDrivers": ["Scale of property asset transfer", "Scale of employee transfer requires additional facilities", "Inclusion of ATM transfer", "Inclusion of branch transfer"],
  "partnerServices": [
    {
      "keyService": "Estate due diligence, perimeter definition and critical-site assessment",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Portfolio strategy, options analysis, affordability and investment governance",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Lease, landlord, title and property contract management",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Workplace design, architecture, construction, fit-out and moves",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Facilities, utilities, physical access, parking and workplace services mobilisation",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "ATM / Branch rationalisation",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Health, safety, security, certification and statutory readiness",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Employee workplace journey, briefing packs and change coordination",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "LD1 estate readiness, property cutover, handover and optimisation",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    }
  ]
};
