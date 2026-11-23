/**
 * Operations & Servicing SA Functional Spoke.
 *
 * All strings in this file are approved source content reproduced verbatim
 * from the Absa M&A Transaction Operating Model document. Do not summarise,
 * paraphrase or correct the wording.
 */

import type { SpokeContent } from "./spoke-content";

export const CONTENT: SpokeContent = {
  "id": "ops-servicing",
  "name": "Operations & Servicing",
  "reference": "",
  "necessityRows": [
    {
      "archetype": "Balance Sheet Acquisition",
      "classification": "Core / Required",
      "rationale": "Core because servicing continuity, process control, client journey readiness and operational exception management is transaction-critical across all archetypes"
    },
    {
      "archetype": "Partial Business Acquisition",
      "classification": "Core / Required",
      "rationale": "Core because servicing continuity, process control, client journey readiness and operational exception management is transaction-critical across all archetypes"
    },
    {
      "archetype": "Full Business Acquisition A (Buyer integrates the business)",
      "classification": "Core / Required",
      "rationale": "Core because servicing continuity, process control, client journey readiness and operational exception management is transaction-critical across all archetypes"
    },
    {
      "archetype": "Full Business Acquisition B (Buyer runs the business standalone)",
      "classification": "Core / Required",
      "rationale": "Core because servicing continuity, process control, client journey readiness and operational exception management is transaction-critical across all archetypes"
    },
    {
      "archetype": "Balance Sheet Sale",
      "classification": "Core / Required",
      "rationale": "Core because servicing continuity, process control, client journey readiness and operational exception management is transaction-critical across all archetypes"
    },
    {
      "archetype": "Partial Business Sale",
      "classification": "Core / Required",
      "rationale": "Core because servicing continuity, process control, client journey readiness and operational exception management is transaction-critical across all archetypes"
    },
    {
      "archetype": "Full Business Sale A (Buyer integrates the business)",
      "classification": "Core / Required",
      "rationale": "Core because servicing continuity, process control, client journey readiness and operational exception management is transaction-critical across all archetypes"
    },
    {
      "archetype": "Full Business Sale B (Buyer runs the business as standalone)",
      "classification": "Core / Required",
      "rationale": "Core because servicing continuity, process control, client journey readiness and operational exception management is transaction-critical across all archetypes"
    }
  ],
  "keyRole": "Owns the operational service model, process hand-offs and client-servicing readiness for the transferring or retained book",
  "responsibilities": [
    "Map current and target client journeys, servicing processes, operational controls and exception paths.",
    "Define LD1 operating arrangements, including interim manual workarounds, non-BAU controls and temporary service procedures",
    "Coordinate with Product, Technology, Data Migration and KYC / AML to turn business requirements into operationally workable processes",
    "Confirm front-line, back-office and country teams can service clients and manage exceptions from LD1.",
    "Own operational readiness evidence, service-level assumptions and hypercare handover to BAU owners.",
    "Support Client readiness with executing onboarding activities"
  ],
  "boundaryItems": [
    "Product owns proposition and product design decisions",
    "Technology owns system delivery; Operations owns process use, controls and service procedures",
    "Client readiness coordinates overall LD1 evidence and onboarding tracking; Operations owns execution of onboarding and outreach"
  ],
  "centralHubRelationship": "Relationship with Central Hub: the SA Functional Spoke owns operations and servicing decisions and evidence while the Central Hub sets programme standards, coordinates dependencies and escalates transaction-wide issues.",
  "regionalRelationship": [
    "Regional Spokes should own local execution as a minimum, with ownership scaling based on maturity, including process walkthroughs, servicing readiness, exception handling, control evidence, LD1 support and local issue resolution where they have capacity and delegated authority.",
    "Function Authority retains operational standards, non-BAU control expectations, group service model decisions, central challenge and execution ownership where regional maturity, capability or capacity is insufficient.",
    "As regional maturity increases, local ownership should expand from process evidence into operational remediation, readiness sign-off, cutover execution and hypercare support, with Function Authority retaining standards, specialist challenge and reserved approvals."
  ],
  "externalDependencies": "External or counterparty dependencies are managed through the Central Hub governance route where timing, data, approvals or joint readiness affect LD1.",
  "mandateRows": [
    {
      "id": "ld1-servicing-model",
      "area": "LD1 servicing model",
      "spokeAuthority": [
        "Owns operational design for TOM"
      ],
      "hubRole": "Challenges dependency and readiness implications",
      "regionalRole": "",
      "governance": "Functional AE, Risk and Compliance approval for material controls",
      "escalation": "Service break, unsupported workaround or regulatory concern"
    },
    {
      "id": "temporary-manual-workaround",
      "area": "Temporary manual workaround",
      "spokeAuthority": [
        "Proposes and controls workaround use to speed up programme execution"
      ],
      "hubRole": "Tracks critical-path dependency",
      "regionalRole": "",
      "governance": "Risk, Compliance and Operations governance approval",
      "escalation": "Workaround exceeds risk appetite or cannot be evidenced"
    },
    {
      "id": "client-journey-changes",
      "area": "Client journey changes",
      "spokeAuthority": [
        "Owns operational journey design"
      ],
      "hubRole": "Coordinates with Product and Client Readiness",
      "regionalRole": "",
      "governance": "Product, Group Legal and Compliance approval",
      "escalation": "Customer detriment, complaints risk or unclear ownership"
    },
    {
      "id": "bau-handover",
      "area": "BAU handover",
      "spokeAuthority": [
        "Approves operational acceptance criteria"
      ],
      "hubRole": "Ensures closure criteria align to programme",
      "regionalRole": "",
      "governance": "BAU Operations leadership approval",
      "escalation": "Persistent defects or unresolved resource gap"
    },
    {
      "id": "operations-and-servicing-readiness-and-exceptions",
      "area": "Operations & Servicing readiness and exceptions",
      "spokeAuthority": [
        "Recommends operations and servicing readiness status, accepted exceptions and residual risk position"
      ],
      "hubRole": "Integrates into go/no-go and completion governance",
      "regionalRole": "",
      "governance": "Programme governance, relevant functional authority and control owners",
      "escalation": "Critical operations readiness evidence, dependency or exception remains unresolved at go/no-go"
    }
  ],
  "capabilityRows": [
    {
      "category": "Specific Project Manager required?",
      "content": "Maybe - high-volume servicing, TSA operations or multi-country process change usually needs dedicated workstream PM support, but dedicated Client readiness stream may provide Ops capacity"
    },
    {
      "category": "Baseline capabilities",
      "content": "Process design, service operations, client journey mapping, control procedure design and operational readiness management"
    },
    {
      "category": "Incremental capabilities by deal archetype / complexity",
      "content": "End-to-end business integration, service separation, channel readiness, operational resilience and TSA operations"
    },
    {
      "category": "Specialist capabilities triggered by deal characteristics",
      "content": "Specialist capability for high-volume servicing, complaints handling, regulated customer journeys, payments operations and cross-border servicing models."
    }
  ],
  "milestoneIntro": [
    "The key milestones below are organised as a baseline set, with additional milestones required for more complex deal archetypes split out below as required.",
    "As deal archetypes scale from balance sheet to partial business to full business, each milestone should be assessed against client and transaction volumes, process complexity, channel and platform dependencies, data and record requirements, control change, service continuity, operating capacity and the extent of counterparty or TSA support required.",
    "Service catalogue:"
  ],
  "serviceCatalogue": [
    "Operational inventory, process mapping and fit-gap analysis",
    "Target operating model, client journey and service model design",
    "Operational procedures, controls and exception management",
    "Client onboarding, account, mandate and channel setup execution",
    "Operational data, document and physical-record migration",
    "Operational testing, dress rehearsals, training and readiness evidence",
    "Cutover, blackout, manual workaround and service-continuity management",
    "LD1 support, hypercare, service stabilisation and BAU handover"
  ],
  "activitySets": [
    {
      "id": "balance-sheet-acquisition",
      "heading": "Balance Sheet Acquisition - baseline activities",
      "tab": "Balance Sheet Acquisition",
      "milestones": [
        {
          "name": "Current-state inventory and fit-gap assessment completed (5 weeks)",
          "activities": [
            "Inventory client journeys, processes, procedures, controls, channels, applications, reports, vendors, records and service teams in scope.",
            "Map client permissions, account and mandate requirements, process hand-offs, volumes, service levels and exception paths.",
            "Identify gaps, duplicate steps, unsupported activities, capacity constraints and dependencies that require remediation before LD1."
          ]
        },
        {
          "name": "Target service model and operating procedures approved (6 weeks)",
          "activities": [
            "Define the LD1 client journey, front-to-back process, operating roles, hand-offs, service standards and control points.",
            "Document procedures for onboarding, servicing, transaction processing, complaints, queries, reporting and operational exceptions.",
            "Agree target and interim arrangements with Product, Technology, Risk, Compliance and regional operations owners."
          ]
        },
        {
          "name": "Cutover, discrepancy and manual-workaround plans approved (4 weeks)",
          "activities": [
            "Define blackout periods, cut-off times, transaction handling, data freezes, work allocation and command-centre support.",
            "Create controlled procedures for discrepancies, failed onboarding, unsettled items, suspense balances and unsupported system activity.",
            "Approve temporary manual workarounds, compensating controls, volumes, owners, expiry dates and escalation thresholds."
          ]
        },
        {
          "name": "Operational testing, dress rehearsals and training completed (6 weeks)",
          "activities": [
            "Execute process walkthroughs, scenario tests and dress rehearsals covering normal, exception, cutover and rollback activity.",
            "Train front-line, servicing, back-office, control and support teams on approved procedures, channels and escalation routes.",
            "Record defects, close critical gaps and provide readiness evidence against the agreed operational acceptance criteria."
          ]
        },
        {
          "name": "LD1 support and BAU handover accepted (6 weeks)",
          "activities": [
            "Confirm client, account, channel, product-linking, data, record, staffing and support readiness before go / no-go.",
            "Operate LD1 and hypercare support with clear triage, service reporting, issue ownership and client-impact escalation.",
            "Transfer residual workarounds, defects, service risks and improvement actions to named BAU owners with closure dates."
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
          "name": "Transferred, retained and shared operations perimeter separated (5 weeks)",
          "activities": [
            "Separate transferring, retained and shared processes, client journeys, teams, records, applications, vendors and control responsibilities.",
            "Identify stranded activities, duplicated hand-offs and service dependencies that cross the transaction perimeter.",
            "Agree operational ownership and escalation routes for every shared or ambiguous activity."
          ]
        },
        {
          "name": "Transitional service and third-party operating model agreed (5 weeks)",
          "activities": [
            "Define services provided by the seller, Absa, third parties or shared teams during transition, including service levels and controls.",
            "Agree TSA or interim operating procedures, information flows, issue routes, reporting, access and exit milestones.",
            "Confirm vendor, facility, record and technology dependencies with Procurement, Legal, Technology and Finance."
          ]
        },
        {
          "name": "Onboarding, account, channel and data requirements agreed (5 weeks)",
          "activities": [
            "Define operational requirements for client onboarding, account and mandate creation, permissions, product linking and channel access.",
            "Specify the data, digital and physical records, reports and reconciliations required to service clients from LD1.",
            "Confirm operational acceptance criteria and ownership across Data Migration, Technology, KYC / AML, Product and Client Readiness."
          ]
        },
        {
          "name": "Onboarding and Client readiness activities executed (8 weeks)",
          "activities": [
            "Execute on client onboarding, outreach, and training previously defined",
            "Link in with the Client Readiness stream to drive proper tracking and evidence",
            "Test that client accounts and profiles are set up properly"
          ]
        },
        {
          "name": "Client-cohort onboarding and records transition completed (6 weeks)",
          "activities": [
            "Plan onboarding, account, mandate, permission and channel activity by client cohort, product, location and priority.",
            "Coordinate digital and physical record transfer, completeness checks, reconciliation and exception resolution.",
            "Track each cohort to operational readiness and escalate gaps that threaten service continuity or LD1 transactability."
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
          "name": "Integrated target operating model and process harmonisation approved (8 weeks)",
          "activities": [
            "Define the integrated organisation, process, location, channel, vendor and service model across acquired and Absa operations.",
            "Harmonise procedures, controls, service levels, client journeys and exception paths while preserving required local variation.",
            "Approve integration waves, interim states, process retirement and ownership of residual legacy activities."
          ]
        },
        {
          "name": "High-volume onboarding and operational data loading completed (8 weeks)",
          "activities": [
            "Execute client, account, mandate, permission, channel and product-linking activity at the required scale.",
            "Load and reconcile operational data, static data, open items, digital documents and physical records.",
            "Operate exception queues, quality controls and daily readiness reporting until priority populations are complete."
          ]
        },
        {
          "name": "Integrated operational capacity and control readiness accepted (6 weeks)",
          "activities": [
            "Validate staffing, shifts, skills, facilities, vendors, service desks, contact routes and support capacity for forecast volumes.",
            "Confirm integrated controls, reconciliations, access, maker-checker arrangements and management reporting operate as designed.",
            "Complete integrated rehearsals and obtain Operations acceptance for LD1, hypercare and BAU stabilisation."
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
          "name": "Standalone operations governance and service model established (6 weeks)",
          "activities": [
            "Define operational ownership, decision rights, governance forums, service catalogue, locations and regional responsibilities.",
            "Set service standards, operational risk limits, escalation routes, readiness criteria and management information requirements.",
            "Confirm which standards and approvals are standalone, regional, Absa group or externally reserved."
          ]
        },
        {
          "name": "Standalone process, control and client-journey catalogue approved (8 weeks)",
          "activities": [
            "Document complete front-to-back processes, client journeys, procedures, controls, reconciliations and exception paths.",
            "Define onboarding, servicing, payments, reporting, complaints, records and operational support procedures.",
            "Validate the catalogue with Product, Risk, Compliance, KYC / AML, Technology and local operations leadership."
          ]
        },
        {
          "name": "Standalone platforms, vendors and records model readied (8 weeks)",
          "activities": [
            "Confirm required applications, channels, service desks, facilities, vendors, access and operational reporting are available.",
            "Complete operational data, document and physical-record transfer, storage, retrieval and retention arrangements.",
            "Resolve unsupported services through approved build, vendor, TSA or controlled manual solutions."
          ]
        },
        {
          "name": "Standalone workforce, capacity and training plan completed (6 weeks)",
          "activities": [
            "Determine staffing, shift, location, skill, leadership and support requirements for forecast client and transaction volumes.",
            "Recruit, transfer, onboard and train operations staff on systems, processes, controls and client-support expectations.",
            "Test operational capacity under peak, incident and degraded-service scenarios."
          ]
        },
        {
          "name": "Standalone cutover and operational rehearsals completed (6 weeks)",
          "activities": [
            "Define cutover, blackout, final data, open-item, transaction, rollback and command-centre procedures.",
            "Run end-to-end rehearsals covering client onboarding, servicing, settlement, reporting, exceptions and incident response.",
            "Close critical defects and approve residual workarounds with named owners, controls and expiry dates."
          ]
        },
        {
          "name": "Standalone LD1 launch and service stabilisation completed (8 weeks)",
          "activities": [
            "Execute the operational cutover and confirm clients can transact, be serviced and receive support from LD1.",
            "Operate enhanced service monitoring, issue triage, operational reporting and client-impact escalation through hypercare.",
            "Transfer stable operations, residual defects and improvement actions to standalone BAU owners."
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
          "name": "Operational divestment perimeter and retained-service impact confirmed (5 weeks)",
          "activities": [
            "Identify processes, client journeys, teams, records, applications, vendors, assets and controls included in the sale perimeter.",
            "Assess impacts on retained Absa servicing, capacity, hand-offs, controls and operational resilience.",
            "Confirm operational dependencies, obligations and evidence required for separation and completion."
          ]
        },
        {
          "name": "Buyer operational diligence and handover pack completed (5 weeks)",
          "activities": [
            "Prepare process, service, volume, staffing, vendor, system, record, control, issue and performance information for buyer review.",
            "Validate operational data and descriptions with Product, Technology, Finance, Risk, Legal and regional teams.",
            "Control disclosure of restricted client, employee, security and operational information through approved clean-room arrangements."
          ]
        },
        {
          "name": "Transfer, run-off and closure service model approved (6 weeks)",
          "activities": [
            "Define how in-scope accounts, transactions, mandates, queries, complaints, records and open items transfer, run off or close.",
            "Agree client service routes, hand-offs, service levels, cut-offs and exception ownership before and after completion.",
            "Confirm retained Absa operations can continue without unsupported dependencies or control gaps."
          ]
        },
        {
          "name": "People, vendor and records transition plan approved (5 weeks)",
          "activities": [
            "Define transfer or retention of operations staff, knowledge, facilities, vendors, access, procedures and support arrangements.",
            "Plan digital and physical record transfer, retention, retrieval, custody and evidence requirements.",
            "Agree third-party consents, contract changes, service continuity and responsibility for transition costs."
          ]
        },
        {
          "name": "Divestment cutover and controlled-workaround plan approved (4 weeks)",
          "activities": [
            "Define blackout, final transaction, open-item, data-freeze, account, settlement, rollback and command-centre arrangements.",
            "Document discrepancy, suspense, rejected-item and client-impact procedures across buyer and Absa teams.",
            "Approve temporary services and manual workarounds with controls, volumes, owners and termination dates."
          ]
        },
        {
          "name": "Completion support and retained BAU handover accepted (6 weeks)",
          "activities": [
            "Confirm buyer and Absa operational readiness, outstanding exceptions and residual obligations before go / no-go.",
            "Operate completion and hypercare support with service monitoring, issue triage and client-impact escalation.",
            "Transfer retained services, claims support, records obligations and open actions to named BAU or post-completion owners."
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
          "name": "Transferred, retained and shared service model separated (6 weeks)",
          "activities": [
            "Separate transferred, retained and shared processes, client populations, teams, channels, records, vendors and control activities.",
            "Identify stranded operations, split hand-offs, duplicated activities and services that cannot be separated by completion.",
            "Agree ownership, service levels and escalation routes for every shared or transitional activity."
          ]
        },
        {
          "name": "Operational TSA model and exit plan approved (6 weeks)",
          "activities": [
            "Define each transitional operational service, service level, volume assumption, control, reporting requirement and charging basis.",
            "Document operating procedures, access, information flows, incident management, change control and dispute escalation.",
            "Set TSA exit criteria, migration steps, buyer dependencies, testing requirements and accountable owners."
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
          "name": "Buyer integration operations handover completed (6 weeks)",
          "activities": [
            "Provide approved process, procedure, control, staffing, vendor, record, service and open-issue handover materials.",
            "Agree the transition from Absa-led servicing to buyer-led processes, channels, support and issue management.",
            "Confirm Absa review and escalation rights where buyer integration affects retained obligations or clients."
          ]
        },
        {
          "name": "Absa operational exit and retained-service continuity completed (6 weeks)",
          "activities": [
            "Decommission or transfer operational access, facilities, reports, queues, vendor services and support arrangements.",
            "Confirm retained Absa processes, controls, records, staffing and client-support routes continue after buyer integration.",
            "Track TSA services, residual obligations, exceptions and exit actions to accountable owners."
          ]
        },
        {
          "name": "Completion support and operational issue handover completed (4 weeks)",
          "activities": [
            "Support completion-day processing, service triage, reconciliations and resolution of client-impacting issues.",
            "Transfer open items, records requests, disputes, claims support and operational exceptions to buyer, TSA or BAU owners.",
            "Archive operational approvals, evidence, handover packs and lessons for future separations."
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
          "name": "Standalone buyer operations capability assessed (6 weeks)",
          "activities": [
            "Assess buyer governance, leadership, processes, controls, workforce, locations, systems, vendors and service-management capability.",
            "Evaluate whether the buyer can operate the full business and support required volumes from LD1.",
            "Define remediation, TSA or conditional-completion actions for capability gaps."
          ]
        },
        {
          "name": "Full operational handover pack completed (8 weeks)",
          "activities": [
            "Prepare complete process, procedure, client-journey, control, service, volume, staffing, vendor, record and issue documentation.",
            "Transfer operating calendars, service standards, management information, escalation routes and operational knowledge.",
            "Confirm buyer acceptance of the handover pack and ownership of open operational actions."
          ]
        },
        {
          "name": "Standalone infrastructure, vendor and workforce model readied (8 weeks)",
          "activities": [
            "Confirm facilities, service desks, channels, applications, access, vendors, support and operational reporting are available to the buyer.",
            "Transfer or establish the required operations workforce, leadership, skills, shifts, training and capacity.",
            "Resolve service gaps through approved build, vendor, TSA or controlled manual arrangements."
          ]
        },
        {
          "name": "Client onboarding, operational data and records transfer completed (8 weeks)",
          "activities": [
            "Execute transfer of client, account, mandate, permission, channel, product-linking and open-item information.",
            "Transfer and reconcile operational data, digital documents and physical records with completeness and custody evidence.",
            "Resolve exceptions and confirm priority clients and services are operationally ready."
          ]
        },
        {
          "name": "Standalone cutover, blackout and rehearsals completed (6 weeks)",
          "activities": [
            "Agree final transaction, data-freeze, record, settlement, reconciliation, rollback and command-centre procedures.",
            "Run end-to-end rehearsals across buyer, Absa, vendor and TSA teams, including failure and degraded-service scenarios.",
            "Close critical defects and approve residual exceptions with controls, owners and deadlines."
          ]
        },
        {
          "name": "Completion, hypercare and final operational exit completed (8 weeks)",
          "activities": [
            "Execute operational completion and confirm the standalone business can transact, service clients and manage exceptions.",
            "Operate joint hypercare, service monitoring, reconciliation, incident response and client-impact escalation.",
            "Complete TSA or separation handover, close Absa access and support obligations, and transfer residual actions to buyer and Absa BAU owners."
          ]
        }
      ]
    }
  ],
  "sizingFactors": "",
  "sizingDrivers": ["Product set in scope is largely new to Absa", "Significant new business processes required to service clients", "Significant number of clients in-scope for transfer", "Several channels onto which clients must be onboarded"],
  "partnerServices": [
    {
      "keyService": "Operational inventory, process mapping and fit-gap analysis",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Target operating model, client journey and service model design",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Operational procedures, controls and exception management",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Client onboarding, account, mandate and channel setup execution",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Operational data, document and physical-record migration",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Operational testing, dress rehearsals, training and readiness evidence",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Cutover, blackout, manual workaround and service-continuity management",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "LD1 support, hypercare, service stabilisation and BAU handover",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    }
  ]
};
