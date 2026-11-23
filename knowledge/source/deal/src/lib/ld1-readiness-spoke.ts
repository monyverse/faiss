/**
 * Client Readiness SA Functional Spoke.
 *
 * All strings in this file are approved source content reproduced verbatim
 * from the Absa M&A Transaction Operating Model document. Do not summarise,
 * paraphrase or correct the wording.
 */

import type { SpokeContent } from "./spoke-content";

export const CONTENT: SpokeContent = {
  "id": "ld1-readiness",
  "name": "Client Readiness",
  "reference": "",
  "necessityRows": [
    {
      "archetype": "Balance Sheet Acquisition",
      "classification": "Conditionally required",
      "rationale": "Conditional based on scale of client transfer, and onboarding and training requirements"
    },
    {
      "archetype": "Partial Business Acquisition",
      "classification": "Core / Required",
      "rationale": "Required because dedicated onboarding, client contact, training, and channel set up capacity is critical across these archetypes"
    },
    {
      "archetype": "Full Business Acquisition A (Buyer integrates the business)",
      "classification": "Core / Required",
      "rationale": "Required because dedicated onboarding, client contact, training, and channel set up capacity is critical across these archetypes"
    },
    {
      "archetype": "Full Business Acquisition B (Buyer runs the business standalone)",
      "classification": "Conditionally required",
      "rationale": "Conditional based on scale of new client set up required for standalone business"
    },
    {
      "archetype": "Balance Sheet Sale",
      "classification": "Not typically a standalone workstream",
      "rationale": "Majority of onboarding, training, and client contact work sits with the Seller, so dedicated Absa workstream unlikely to be needed"
    },
    {
      "archetype": "Partial Business Sale",
      "classification": "Not typically a standalone workstream",
      "rationale": "Majority of onboarding, training, and client contact work sits with the Seller, so dedicated Absa workstream unlikely to be needed"
    },
    {
      "archetype": "Full Business Sale A (Buyer integrates the business)",
      "classification": "Core / Required",
      "rationale": "Required to manage large scale client contact tracking, documentation retrieval, and client queries pre go-live"
    },
    {
      "archetype": "Full Business Sale B (Buyer runs the business as standalone)",
      "classification": "Not typically a standalone workstream",
      "rationale": "Majority of onboarding, training, and client contact work sits with the Seller, so dedicated Absa workstream unlikely to be needed"
    }
  ],
  "keyRole": "Owns integrated Client readiness orchestration and tracking with a focus on customer / client readiness including onboarding tracking, client outreach tracking, client training, and ensuring channels are set up",
  "responsibilities": [
    "Track required client contact to receive requisite onboarding documentation",
    "Track onboarding processes carried out by Operations teams",
    "Support the preparation of client training materials, and track training delivery",
    "Track Operations set up of clients on channels and platforms",
    "Ensure that clients are ready to transact on LD1"
  ],
  "boundaryItems": [
    "Operations owns the execution of onboarding, training and set up activities, Client readiness acts as a centralized tracking layer",
    "Risk and Independent Assurance challenge readiness evidence and residual risk; Client readiness integrates client readiness views into decision forums.",
    "E2E Testing owns testing evidence and defects; Client readiness supports with organisation of friendly client testing where needed"
  ],
  "centralHubRelationship": "Relationship with Central Hub: Central Hub owns overall programme governance and go / no-go pack; Client readiness owns the tracking of client readiness",
  "regionalRelationship": [
    "Regional operations Spokes should own local execution as a minimum, with ownership scaling based on maturity, including client outreach, setup, training, and maintenance",
    "As regional maturity increases, local ownership should expand from readiness evidence into cutover execution, local sign-off and hypercare support, with Function Authority retaining standards, specialist challenge and reserved approvals.",
    "Regional Client readiness spoke in specific unlikely to be in place - leverages Operations teams"
  ],
  "externalDependencies": "",
  "mandateRows": [
    {
      "id": "client-readiness-criteria-and-tracker",
      "area": "Client readiness criteria and tracker",
      "spokeAuthority": [
        "Defines client readiness criteria, evidence standards, client cohort segmentation and the minimum data required to prove clients can transact on LD1."
      ],
      "hubRole": "Embeds client readiness reporting into the programme cadence and go/no-go pack.",
      "regionalRole": "",
      "governance": "Operations, Channels, Product, KYC / AML, Communications, Change, Regional Spokes, Central Hub and accountable executive.",
      "escalation": "Readiness criteria are unclear, client cohorts are not agreed or the tracker does not show client-level readiness evidence."
    },
    {
      "id": "client-contact-and-onboarding-documentation-tracking",
      "area": "Client contact and onboarding documentation tracking",
      "spokeAuthority": [
        "Owns the consolidated view of required client contact, document requests, document receipt, rework, ageing and readiness exceptions."
      ],
      "hubRole": "Escalates cross-workstream blockers and maintains visibility of critical client cohorts.",
      "regionalRole": "",
      "governance": "Operations, Relationship teams, KYC / AML, Legal, Compliance, Regional Spokes and client-facing business owners.",
      "escalation": "Priority clients do not respond, documentation is incomplete, onboarding packs are rejected or ageing items threaten LD1 transactability."
    },
    {
      "id": "operations-onboarding-channel-setup-and-training-readiness",
      "area": "Operations onboarding, channel setup and training readiness",
      "spokeAuthority": [
        "Tracks Operations onboarding, channel / platform setup, access enablement and client training delivery without taking execution ownership from Operations."
      ],
      "hubRole": "Ensures blockers are visible in programme governance and linked to go/no-go decision materials.",
      "regionalRole": "",
      "governance": "Operations, Technology, Channels, Product, Change, Communications, Regional Spokes and E2E Testing where friendly client validation is required.",
      "escalation": "Clients cannot access required channels, setup is incomplete, training is not delivered or client testing indicates transactability risk."
    },
    {
      "id": "client-readiness-exceptions-and-ld1-decision-input",
      "area": "Client readiness exceptions and LD1 decision input",
      "spokeAuthority": [
        "Maintains client readiness exception log, drives owners to resolution and prepares the client readiness input to LD1 go/no-go."
      ],
      "hubRole": "Coordinates escalation, decision capture and dependency reporting through Central Hub governance.",
      "regionalRole": "",
      "governance": "Accountable executive, Operations, Risk, Independent Assurance, Compliance, Legal, Central Hub and workstream leads.",
      "escalation": "Clients remain not ready, residual risk is not accepted, workarounds are undefined or LD1 decision forums lack evidence."
    },
    {
      "id": "ld1-client-support-and-hypercare-handover",
      "area": "LD1 client support and hypercare handover",
      "spokeAuthority": [
        "Tracks first-day client transactability, client-impacting issues, support routes and handover of residual readiness actions to Operations or BAU owners."
      ],
      "hubRole": "Coordinates programme-level issue flow and ensures open items remain visible until accepted by owners.",
      "regionalRole": "",
      "governance": "Operations, Relationship teams, Channels, Technology, Communications, Change, Regional Spokes and hypercare governance.",
      "escalation": "Client issues are not triaged, owners are unclear, transaction failures are repeated or residual items are not accepted by BAU."
    }
  ],
  "capabilityRows": [
    {
      "category": "Specific Project Manager required?",
      "content": "No - Client readiness is effectively a project management / onboarding oversight function focused on tracking client readiness. The workstream lead must have project management capabilities"
    },
    {
      "category": "Baseline capabilities",
      "content": "Project management, data analysis, stakeholder management, understanding of Absa onboarding processes"
    },
    {
      "category": "Incremental capabilities by deal archetype / complexity",
      "content": "Client communications experience, client training experience, hands-on onboarding experience, understanding of KYC/AML requirements to enable transactability"
    },
    {
      "category": "Specialist capabilities triggered by deal characteristics",
      "content": "Understanding of product specific onboarding / transactability requirements (e.g., licenses required to transact FX / Global Markets products)"
    }
  ],
  "milestoneIntro": [
    "The key milestones below are organised as a baseline set, with additional milestones required for more complex deal archetypes split out below as required.",
    "As deal archetypes scale from balance sheet to partial business to full business, each baseline activity should be assessed against the complexity factors laid out in the deal archetype documentation.",
    "Service catalogue:"
  ],
  "serviceCatalogue": [
    "Client readiness criteria and evidence standards",
    "Client population and priority cohort tracking",
    "Client contact and onboarding documentation tracking",
    "Operations onboarding status tracking",
    "Channel and platform setup readiness tracking",
    "Client training material and delivery tracking",
    "Client readiness exception management and escalation",
    "LD1 client transactability view and hypercare handover"
  ],
  "activitySets": [
    {
      "id": "balance-sheet-acquisition",
      "heading": "Balance Sheet Acquisition - baseline activities",
      "tab": "Balance Sheet Acquisition",
      "milestones": [
        {
          "name": "Client readiness criteria and population confirmed (2 weeks)",
          "activities": [
            "Define which clients, accounts, products and channels must be ready to transact on LD1.",
            "Agree evidence standards for onboarding documentation, Operations onboarding status, training and channel setup.",
            "Establish the client readiness tracker, owner model, update cadence and escalation route."
          ]
        },
        {
          "name": "Client documentation and contact tracker mobilised (3 weeks)",
          "activities": [
            "Identify required client documentation, mandates, forms, consents and contact points.",
            "Track client outreach, document receipt, missing information and ageing exceptions.",
            "Escalate missing documentation or client non-response to Operations, Relationship teams and governance forums."
          ]
        },
        {
          "name": "Operations onboarding progress tracked (3 weeks)",
          "activities": [
            "Track onboarding status across Operations queues without taking execution ownership from Operations.",
            "Monitor blockers, rejected submissions, rework, dependencies and expected completion dates by client cohort.",
            "Maintain a consolidated view of clients ready, not ready or conditionally ready for LD1."
          ]
        },
        {
          "name": "Channel setup and client training tracked (3 weeks)",
          "activities": [
            "Track channel and platform setup, entitlements, credentials, limits and access dependencies.",
            "Support preparation of client training materials and track delivery by client or cohort.",
            "Record training completion, outstanding attendance, client questions and support needs."
          ]
        },
        {
          "name": "Client transactability confirmed for LD1 (1 week)",
          "activities": [
            "Prepare the client readiness input to go/no-go, including ready/not-ready status and residual conditions.",
            "Confirm treatment for clients not ready to transact, including manual workarounds or post-LD1 follow-up.",
            "Hand over open client readiness items to Operations, Relationship teams and hypercare owners."
          ]
        }
      ]
    },
    {
      "id": "partial-business-acquisition",
      "heading": "Partial Business Acquisition - additional activities",
      "tab": "Partial Business Acquisition",
      "milestones": [
        {
          "name": "Expanded client readiness perimeter agreed (2 weeks)",
          "activities": [
            "Segment transferred, retained and shared clients by product, geography, channel and relationship owner.",
            "Map client readiness dependencies across seller, Absa, Operations, regional teams and any TSA-supported services.",
            "Prioritise high-value, high-risk or time-critical clients for early documentation, onboarding and training tracking."
          ]
        },
        {
          "name": "Client onboarding and training execution driven (4 weeks)",
          "activities": [
            "Track bulk client documentation packs, outreach responses, Operations onboarding status and rejected items.",
            "Monitor channel enablement and training delivery across each client cohort and regional execution team.",
            "Drive closure of ageing items through workstream leads while keeping execution with Operations and client-facing teams."
          ]
        },
        {
          "name": "LD1 client readiness exceptions governed (2 weeks)",
          "activities": [
            "Maintain an exception log by client, issue, owner, required decision and LD1 impact.",
            "Escalate documentation, training, onboarding or channel setup blockers that could stop client transacting on LD1.",
            "Agree customer treatment, fallback route and post-LD1 owner for clients not fully ready by LD1."
          ]
        }
      ],
      "lead": "The above, with the addition of:"
    },
    {
      "id": "full-business-acquisition-a-integrated",
      "heading": "Full Business Acquisition A (integrated) - further additional activities",
      "tab": "Full Business Acquisition A (integrated)",
      "milestones": [
        {
          "name": "Integrated client readiness plan aligned across workstreams (3 weeks)",
          "activities": [
            "Consolidate client readiness inputs from Operations, Channels, Product, KYC / AML, Communications, Change",
            "Define client criticality tiers and the readiness evidence required for each tier.",
            "Align client communications, training, channel activation and Operations onboarding to one integrated readiness plan."
          ]
        },
        {
          "name": "Full client training and channel migration tracked (5 weeks)",
          "activities": [
            "Track training material production, client session delivery, attendance, follow-up questions and support needs.",
            "Monitor channel setup, access credentials, tokens, limits, entitlements and client activation evidence.",
            "Confirm support arrangements for clients using migrated or newly enabled channels at LD1."
          ]
        },
        {
          "name": "Client transactability test evidence collected (3 weeks)",
          "activities": [
            "Coordinate friendly client validation where required with Operations, Channels and E2E Testing.",
            "Capture evidence that priority clients can access channels, submit transactions and receive expected support.",
            "Drive closure of blockers raised through client readiness checks, testing or rehearsal activity."
          ]
        },
        {
          "name": "LD1 client support and hypercare handover agreed (2 weeks)",
          "activities": [
            "Confirm command-centre routes for client questions, transaction failures and channel access issues.",
            "Hand over open client readiness issues to hypercare with owner, due date and customer treatment.",
            "Track first-day client transactability issues until Operations and BAU owners accept ongoing ownership."
          ]
        }
      ],
      "lead": "The above, with the addition of:"
    },
    {
      "id": "full-business-acquisition-b-standalone",
      "heading": "Full Business Acquisition B (standalone) - new activity set",
      "tab": "Full Business Acquisition B (standalone)",
      "milestones": [
        {
          "name": "Standalone client readiness model designed (4 weeks)",
          "activities": [
            "Define how the standalone business will prove clients can transact on LD1 across products, channels and regions.",
            "Confirm readiness owners, evidence standards, support routes and escalation forums for the standalone client base.",
            "Map dependencies on seller support, regional teams, Operations, technology, channels and client-facing teams."
          ]
        },
        {
          "name": "Standalone onboarding, training and channel setup tracked (6 weeks)",
          "activities": [
            "Track client documentation, onboarding status, channel setup, access credentials and training by client cohort.",
            "Monitor readiness progress for priority clients and clients requiring local, regulatory or product-specific support.",
            "Drive resolution of readiness gaps while keeping execution ownership with Operations and accountable business teams."
          ]
        },
        {
          "name": "Standalone client support and transactability confirmed (2 weeks)",
          "activities": [
            "Prepare go/no-go evidence showing which clients are ready, conditionally ready or not ready to transact on LD1.",
            "Confirm fallback handling, client communications and hypercare routes for unresolved readiness exceptions.",
            "Transfer residual client readiness actions to standalone BAU and hypercare owners after LD1."
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
      "lead": "Not required",
      "milestones": []
    },
    {
      "id": "full-business-sale-a-buyer-integrates",
      "heading": "Full Business Sale A (buyer integrates) - further additional divestment activities",
      "tab": "Full Business Sale A (buyer integrates)",
      "milestones": [
        {
          "name": "Buyer integration client readiness plan agreed (3 weeks)",
          "activities": [
            "Agree buyer integration milestones that affect client ability to transact on LD1.",
            "Confirm Absa-held documentation, customer data, channel or relationship inputs required for buyer readiness.",
            "Escalate buyer slippage through joint governance before it affects LD1 client outcomes."
          ]
        },
        {
          "name": "Client documentation, query and training tracker driven (5 weeks)",
          "activities": [
            "Track client documentation retrieval, buyer queries, client communications and readiness confirmations.",
            "Monitor training, channel transition and support arrangements for client cohorts affected by buyer integration.",
            "Drive closure of ageing client issues while keeping execution with the buyer, Operations or relationship owners."
          ]
        },
        {
          "name": "LD1 client handoff and support model live (3 weeks)",
          "activities": [
            "Run Absa command-centre tracking for retained obligations, client queries and transaction-impacting issues.",
            "Track buyer, TSA and Absa support routes until priority clients can transact or have agreed treatment.",
            "Hand over ongoing client issues to buyer, TSA, Operations, relationship teams or BAU owners."
          ]
        }
      ]
    },
    {
      "id": "full-business-sale-b-standalone",
      "heading": "Full Business Sale B (standalone) - complete divestment activity set",
      "tab": "Full Business Sale B (standalone)",
      "lead": "Not required",
      "milestones": []
    }
  ],
  "sizingFactors": "",
  "sizingDrivers": ["Significant number of clients must be communicated with and documentation received from them", "Many clients have multiple products that must be set up on Absa channels", "Minimal crossover between the acquired and existing customer bases", "Clients must be onboarded to new-to-bank channels"],
  "partnerServices": [
    {
      "keyService": "Client readiness criteria and evidence standards",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Client population and priority cohort tracking",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Client contact and onboarding documentation tracking",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Operations onboarding status tracking",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Channel and platform setup readiness tracking",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Client training material and delivery tracking",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Client readiness exception management and escalation",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "LD1 client transactability view and hypercare handover",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    }
  ]
};
