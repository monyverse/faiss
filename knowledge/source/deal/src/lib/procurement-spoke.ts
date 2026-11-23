/**
 * Procurement SA Functional Spoke.
 *
 * All strings in this file are approved source content reproduced verbatim
 * from the Absa M&A Transaction Operating Model document. Do not summarise,
 * paraphrase or correct the wording.
 */

import type { SpokeContent } from "./spoke-content";

export const CONTENT: SpokeContent = {
  "id": "procurement",
  "name": "Procurement",
  "reference": "",
  "necessityRows": [
    {
      "archetype": "Balance Sheet Acquisition",
      "classification": "Core / Required",
      "rationale": "Conditional depending on whether material transfer of suppliers or technology relationships is in scope"
    },
    {
      "archetype": "Partial Business Acquisition",
      "classification": "Core / Required",
      "rationale": "Core because supplier continuity, contract transfer, third-party risk, purchase-to-pay readiness and critical service dependencies can affect signing, completion and LD1."
    },
    {
      "archetype": "Full Business Acquisition A (Buyer integrates the business)",
      "classification": "Core / Required",
      "rationale": "Core because supplier continuity, contract transfer, third-party risk, purchase-to-pay readiness and critical service dependencies can affect signing, completion and LD1."
    },
    {
      "archetype": "Full Business Acquisition B (Buyer runs the business standalone)",
      "classification": "Core / Required",
      "rationale": "Core because supplier continuity, contract transfer, third-party risk, purchase-to-pay readiness and critical service dependencies can affect signing, completion and LD1."
    },
    {
      "archetype": "Balance Sheet Sale",
      "classification": "Core / Required",
      "rationale": "Conditional depending on whether material transfer of suppliers or technology relationships is in scope"
    },
    {
      "archetype": "Partial Business Sale",
      "classification": "Core / Required",
      "rationale": "Core because supplier continuity, contract transfer, third-party risk, purchase-to-pay readiness and critical service dependencies can affect signing, completion and LD1."
    },
    {
      "archetype": "Full Business Sale A (Buyer integrates the business)",
      "classification": "Core / Required",
      "rationale": "Core because supplier continuity, contract transfer, third-party risk, purchase-to-pay readiness and critical service dependencies can affect signing, completion and LD1."
    },
    {
      "archetype": "Full Business Sale B (Buyer runs the business as standalone)",
      "classification": "Core / Required",
      "rationale": "Core because supplier continuity, contract transfer, third-party risk, purchase-to-pay readiness and critical service dependencies can affect signing, completion and LD1."
    }
  ],
  "keyRole": "Owns procurement execution, supplier continuity and third-party contracting readiness for transferred, retained, replaced or transitional services, with country teams owning local supplier nuance and local contract execution where required.",
  "responsibilities": [
    "Build supplier, contract, spend, purchase order, renewal, obligation, criticality and dependency inventories for the in-scope perimeter.",
    "Confirm which supplier contracts transfer, terminate, require replacement, need novation, rely on TSA arrangements or remain with Absa.",
    "Apply SA procurement policy and third-party risk standards, with in-country procurement customising execution for local supplier nuance, regulation and contracting practice.",
    "Coordinate supplier categorisation and decisioning with the programme team, including the split between global framework agreements, central sourcing and local vendor onboarding.",
    "Assess outsourcing, resilience, concentration, data, cyber, financial-crime, cost and regulatory third-party risks.",
    "Manage vendor onboarding, supplier engagement, contract replacement, vendor consolidation and supplier exit activity where required for LD1 or TSA exit.",
    "Confirm purchase-to-pay, approval, payment, supplier-management and supplier-risk processes operate from LD1 and through TSA exit.",
    "Maintain visibility of programme decisions that affect supplier timing, contract scope, regulatory approval, information sharing, resourcing or onboarding lead times.",
    "Escalate late procurement involvement, short-notice deadlines, missing supplier information or underestimated resource requirements before they create LD1 risk."
  ],
  "boundaryItems": [
    "Legal owns contract drafting, novation legal advice, formal consents and legal restrictions on sharing existing contract information.",
    "Technology owns technical supplier requirements, systems access, cyber integration and technology-service acceptance.",
    "Operations & Servicing owns operational supplier use, service acceptance and day-one continuity requirements.",
    "Finance & Tax owns spend baselining, payment-route design, cost allocation, stranded-cost analysis, Group Interchange charging, recharges and buy-back mechanics.",
    "The Central Hub owns integrated TSA tracking, decision visibility and dependency escalation; Procurement owns the supplier action plan and evidence."
  ],
  "centralHubRelationship": "Relationship with Central Hub: Procurement owns supplier and third-party readiness decisions and evidence while the Central Hub coordinates cross-workstream dependencies, tracks programme decisions, challenges late escalations and holds owners accountable.",
  "regionalRelationship": [
    "Regional Spokes should own local execution as a minimum, with ownership scaling based on maturity, including local supplier data, vendor onboarding, local contracting steps, supplier engagement and local regulatory or market nuance where they have capacity and delegated authority.",
    "Function Authority retains procurement policy, sourcing standards, global framework or group supplier decisions, third-party risk standards and execution ownership where regional maturity, capability or capacity is insufficient or a central supplier relationship must be protected.",
    "As regional maturity increases, local ownership should expand from supplier evidence and execution support into vendor onboarding, local contracting and supplier-management activity, with Function Authority retaining central standards, specialist challenge and reserved approvals."
  ],
  "externalDependencies": "External or counterparty dependencies are managed through the Central Hub governance route where supplier data, regulatory approval timing, contract sharing restrictions, buyer readiness or TSA terms affect LD1.",
  "mandateRows": [
    {
      "id": "procurement-scope-and-supplier-perimeter",
      "area": "Procurement scope and supplier perimeter",
      "spokeAuthority": [
        "Defines supplier inventory standards, procurement scope, third-party risk requirements and supplier readiness evidence."
      ],
      "hubRole": "Coordinates dependency mapping and tracks open supplier decisions in the integrated plan.",
      "regionalRole": "",
      "governance": "Procurement workstream lead, business owner, Legal, Risk, Technology, Operations and Finance & Tax.",
      "escalation": "Supplier inventory is incomplete, local contract sharing is restricted, or supplier criticality is disputed."
    },
    {
      "id": "supplier-decisioning-and-sourcing-route",
      "area": "Supplier decisioning and sourcing route",
      "spokeAuthority": [
        "Approves sourcing route, supplier categorisation, replacement procurement, vendor consolidation and use of global framework agreements."
      ],
      "hubRole": "Ensures programme decisions are visible and aligned to critical path milestones.",
      "regionalRole": "",
      "governance": "Procurement governance, programme SteerCo where timing affects LD1, Legal for contract route.",
      "escalation": "Business commits to supplier choices before Procurement is involved, or programme decisioning changes supplier timing."
    },
    {
      "id": "third-party-risk-and-regulatory-gating",
      "area": "Third-party risk and regulatory gating",
      "spokeAuthority": [
        "Determines procurement and third-party risk actions required before LD1 or TSA exit."
      ],
      "hubRole": "Tracks gating dependencies, evidence and late escalations.",
      "regionalRole": "",
      "governance": "Risk, Compliance, Legal, Procurement governance and any regulatory approval route.",
      "escalation": "Regulatory approval delays contracting, supplier information cannot be shared, or onboarding risk exceeds tolerance."
    },
    {
      "id": "tsa-and-supplier-continuity",
      "area": "TSA and supplier continuity",
      "spokeAuthority": [
        "Owns supplier continuity plan, TSA supplier assumptions and procurement readiness sign-off."
      ],
      "hubRole": "Coordinates TSA dependencies and escalation across Legal, Technology, Operations and Finance.",
      "regionalRole": "",
      "governance": "TSA governance, Legal, Operations readiness, Technology service acceptance and LD1 governance.",
      "escalation": "Supplier service cannot be assured for LD1, TSA exit is not credible, or resourcing is insufficient."
    }
  ],
  "capabilityRows": [
    {
      "category": "Specific Project Manager required?",
      "content": "Unlikely - contracting, onboarding, vendor assessment and decisioning does not require significant coordination, and is non-technical in nature. A significant number of TSAs to be set up and executed may require PM support"
    },
    {
      "category": "Baseline capabilities",
      "content": "Supplier inventory build; contract and spend analysis; supplier criticality assessment; transfer, novation and replacement planning; third-party risk coordination; purchase-to-pay readiness; supplier cutover evidence management."
    },
    {
      "category": "Incremental capabilities by deal archetype / complexity",
      "content": "TSA and Group Interchange supplier-service definition, shared-supplier separation, supplier onboarding, contract migration, vendor consolidation, retained-service boundary management, stranded-cost assessment, recharge input and supplier exit planning."
    },
    {
      "category": "Specialist capabilities triggered by deal characteristics",
      "content": "Outsourcing governance, operational resilience, technology vendor management, data and cyber risk, financial-crime supplier checks, cross-border contracting, public procurement constraints and complex sourcing support."
    }
  ],
  "milestoneIntro": [
    "The key milestones below are organised as a baseline set, with additional milestones required for more complex deal archetypes split out below as required.",
    "As deal archetypes scale up in size / complexity (Balance Sheet Partial Full), each baseline activity should be assessed against the Complexity Factors laid out in the Deal Archetypes documentation, and assessed for whether its size or scope increases as a result of deal specifics.",
    "Service catalogue:"
  ],
  "serviceCatalogue": [
    "Contract inventories",
    "TSA identification and management",
    "Third party risk assessment",
    "Supplier categorisation"
  ],
  "activitySets": [
    {
      "id": "balance-sheet-acquisition",
      "heading": "Balance Sheet Acquisition - baseline activities",
      "tab": "Balance Sheet Acquisition",
      "milestones": [
        {
          "name": "Supplier and contract inventory complete (3 weeks)",
          "activities": [
            "Identify all suppliers, contracts, POs, renewals and third-party dependencies in scope",
            "Confirm spend, contract owner, business owner, service criticality and jurisdiction",
            "Map contracts that transfer, terminate, require novation, require replacement or remain outside scope",
            "Build and maintain a central supplier inventory and issue tracker",
            "Escalate gaps in source data or unclear supplier criticality",
            "Critical dependency: incomplete supplier or contract data can hide consent, continuity and payment risks that affect LD1"
          ]
        },
        {
          "name": "Third-party risk and outsourcing assessment complete (4 weeks)",
          "activities": [
            "Classify suppliers by criticality, outsourcing status, data access, resilience, cyber and regulatory exposure",
            "Identify suppliers requiring enhanced review or approval",
            "Track open risks and obtain approvals",
            "Supplier transfer, novation or replacement route agreed",
            "Bucket suppliers into terminations, existing relationships, and new relationships",
            "Define supplier engagement strategy, communications and consent sequencing",
            "Agree replacement sourcing plan where contracts cannot transfer or service terms are unsuitable",
            "Coordinate supplier dependencies with Technology, Operations & Servicing, Finance & Tax on Group Interchange or recharge implications, and Compliance",
            "Document supplier actions in the integrated programme plan"
          ]
        },
        {
          "name": "Purchase-to-pay readiness confirmed (3 weeks)",
          "activities": [
            "Confirm setup, master data, purchase order routes, approvals and payments",
            "Validate cost centres, tax, details, payment and reporting",
            "Confirm manual workarounds for any purchase-to-pay gaps at LD1"
          ]
        },
        {
          "name": "Supplier cutover and readiness complete (4 weeks)",
          "activities": [
            "Prepare supplier cutover communications, access changes, service calls and escalation routes",
            "Rehearse critical supplier service continuity and purchase-to-pay steps",
            "Confirm procurement readiness evidence for go/no-go",
            "Monitor supplier issues, payment failures, residual consents and TSA supplier obligations through hypercare"
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
          "name": "Partial supplier perimeter separated (4 weeks)",
          "activities": [
            "Separate suppliers, contracts, services, data and purchase routes that transfer from those that stay outside scope",
            "Identify shared suppliers, shared contracts and retained services requiring TSA or replacement support",
            "Confirm interim buying channels, supplier access and approval routes for the transferred perimeter"
          ]
        },
        {
          "name": "Supplier replacement and TSA actions agreed (5 weeks)",
          "activities": [
            "Define supplier services that Absa must build, replace or support through a TSA before LD1",
            "Confirm supplier onboarding lead times, minimum viable service levels and TSA exit milestones",
            "Track partial-perimeter dependencies, blocker closure and regional supplier evidence"
          ]
        }
      ]
    },
    {
      "id": "full-business-acquisition-a-integrated",
      "heading": "Full Business Acquisition A (integrated) - further additional activities",
      "tab": "Full Business Acquisition A (integrated)",
      "lead": "The above, with the addition of",
      "milestones": [
        {
          "name": "Supplier integration into Absa procurement framework complete (5 weeks)",
          "activities": [
            "Map target suppliers into Absa procurement policies, onboarding rules, approval routes and supplier-management standards",
            "Align vendor master data, purchase-to-pay processes, supplier risk ownership and management information",
            "Confirm critical suppliers are embedded in Absa operational resilience and control routines"
          ]
        },
        {
          "name": "Vendor consolidation and supplier exit plan agreed (5 weeks)",
          "activities": [
            "Identify duplicate suppliers, non-compliant contracts, unsuitable commercial terms and consolidation opportunities",
            "Plan supplier exits, replacements, novations and contract migrations without disrupting service continuity",
            "Track supplier integration defects, TSA exit actions and BAU handover through hypercare"
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
          "name": "Standalone supplier operating model defined (5 weeks)",
          "activities": [
            "Confirm the acquired business can operate under Absa ownership with its own supplier governance, controls and reporting",
            "Identify critical suppliers, outsourced services, purchase-to-pay routes and management accountabilities",
            "Define oversight model, escalation path, management information and Absa control touchpoints"
          ]
        },
        {
          "name": "Supplier and contract inventory complete (3 weeks)",
          "activities": [
            "Build full supplier, contract, purchase order, renewal, obligation and dependency inventory",
            "Classify contracts by transfer, novation, termination, replacement, TSA or retained-service route",
            "Confirm supplier consents, change-of-control requirements, pricing impacts and continuity risks",
            "Third-party risk approvals complete",
            "Assess outsourcing, resilience, cyber, data, concentration and financial-crime exposure",
            "Obtain approvals for critical suppliers and document accepted exceptions"
          ]
        },
        {
          "name": "Purchase-to-pay and supplier management ready (3 weeks)",
          "activities": [
            "Set vendor master data, approval paths, purchase order flows, payment controls and reporting routines",
            "Test supplier access, payment route, service hand-off, incident route and reporting continuity",
            "LD1 supplier continuity confirmed",
            "Rehearse supplier handover, TSA service calls, access changes, payment steps and escalation routes",
            "Confirm readiness evidence, residual risks, open supplier actions and BAU ownership"
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
          "name": "Supplier and contract separation inventory complete (3 weeks)",
          "activities": [
            "Identify suppliers, contracts, purchase orders, renewals and critical third-party dependencies linked to the sale perimeter",
            "Confirm which suppliers, services, contracts and obligations transfer, remain with Absa or require TSA support",
            "Capture assignment rights, buyer access restrictions, consent requirements, termination rights and retained liabilities with Group Legal",
            "Maintain supplier separation inventory and issue tracker",
            "Critical dependency: missing supplier separation data can create retained liability, stranded cost or buyer-readiness risk"
          ]
        },
        {
          "name": "Buyer access and supplier consent plan agreed (4 weeks)",
          "activities": [
            "Define supplier information that can be shared with the buyer and any clean-room restrictions",
            "Agree supplier engagement, consent and communication sequencing",
            "Track buyer dependencies, supplier questions and consent status",
            "Retained-service and TSA supplier model defined",
            "Identify supplier services Absa must continue to provide, separate or charge through TSA arrangements",
            "Confirm service scope, service levels, cost recovery, recharge or buy-back mechanics, supplier permissions and exit milestones",
            "Define retained Absa controls, operational hand-offs and issue escalation routes"
          ]
        },
        {
          "name": "Purchase-to-pay and retained supplier readiness confirmed (3 weeks)",
          "activities": [
            "Confirm payment route changes, vendor master updates, invoice handling, cost allocation and tax dependencies",
            "Validate supplier access, reporting, approvals and retained-service controls before LD1",
            "Supplier cutover and close-out complete",
            "Rehearse supplier notices, buyer hand-off, TSA activation, payment changes and retained-service checks",
            "Monitor buyer queries, retained obligations, supplier issues, stranded costs and close-out actions through hypercare"
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
          "name": "Shared supplier and retained-service split agreed (4 weeks)",
          "activities": [
            "Separate supplier services that transfer from services retained by Absa or shared through TSA arrangements",
            "Identify supplier dependencies across retained and divested products, customers, systems and operations",
            "Confirm buyer dependencies, retained Absa controls and stranded-cost exposure"
          ]
        },
        {
          "name": "Carve-out procurement workplan mobilised (4 weeks)",
          "activities": [
            "Track contract separation, supplier communications, buyer hand-offs, TSA readiness and retained-business actions",
            "Confirm regional supplier evidence, fallback paths, issue escalation and BAU ownership"
          ]
        }
      ]
    },
    {
      "id": "full-business-sale-a-buyer-integrates",
      "heading": "Full Business Sale A (buyer integrates) - further additional divestment activities",
      "tab": "Full Business Sale A (buyer integrates)",
      "lead": "The above, with the addition of,",
      "milestones": [
        {
          "name": "Buyer integration supplier hand-off complete (4 weeks)",
          "activities": [
            "Provide supplier inventory, service dependencies, contract status and agreed hand-off evidence to support buyer integration",
            "Coordinate buyer supplier onboarding, consent closure, TSA activation and supplier communication controls",
            "Track buyer-readiness dependencies and retained Absa supplier obligations through governance"
          ]
        },
        {
          "name": "Absa supplier exit and retained-service controls complete (5 weeks)",
          "activities": [
            "Close or amend Absa supplier arrangements where services no longer support retained operations",
            "Confirm stranded-cost treatment, retained supplier controls, TSA exit milestones and BAU close-out"
          ]
        }
      ]
    },
    {
      "id": "full-business-sale-b-standalone",
      "heading": "Full Business Sale B (standalone) - complete divestment activity set",
      "tab": "Full Business Sale B (standalone)",
      "milestones": [
        {
          "name": "Standalone buyer supplier operating model assessed (5 weeks)",
          "activities": [
            "Confirm whether the disposed business can operate under buyer ownership with standalone supplier governance and controls",
            "Identify supplier services, contracts, purchase-to-pay routes, people, systems, data and TSA reliance needed for standalone continuity",
            "Define buyer supplier governance, reporting, escalation, approvals and management hand-offs"
          ]
        },
        {
          "name": "Supplier transfer and replacement route agreed (5 weeks)",
          "activities": [
            "Classify suppliers by transfer, novation, termination, replacement, TSA or retained-service route",
            "Confirm supplier consents, pricing impacts, change-of-control requirements and critical-service risks",
            "Track buyer-side replacement sourcing and supplier onboarding readiness"
          ]
        },
        {
          "name": "TSA and retained Absa supplier boundaries defined (4 weeks)",
          "activities": [
            "Set service scope, service levels, cost recovery, exit milestones, issue routes and retained Absa control obligations",
            "Confirm supplier permissions to provide services to the buyer or standalone entity during transition"
          ]
        },
        {
          "name": "Purchase-to-pay and service continuity tested (3 weeks)",
          "activities": [
            "Validate buyer access, payment routes, vendor master changes, supplier reporting and incident escalation",
            "Rehearse supplier handover, TSA service calls, payment changes, retained-service checks and fallback"
          ]
        },
        {
          "name": "Standalone completion and hypercare managed (5 weeks)",
          "activities": [
            "Operate first-day supplier checks, issue triage, retained-service monitoring and buyer query management",
            "Track supplier service continuity, TSA performance, retained Absa obligations, stranded costs and BAU close-out"
          ]
        }
      ]
    }
  ],
  "sizingFactors": "",
  "sizingDrivers": ["TSAs in scope", "Scale of third-party suppliers", "Number of contracts requiring novation or negotiation", "Complexity of third-party supplier landscape", "Third-party risk landscape"],
  "partnerServices": [
    {
      "keyService": "Contract inventories",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "TSA identification and management",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Third party risk assessment",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Supplier categorisation",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    }
  ]
};
