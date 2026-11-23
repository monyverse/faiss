/**
 * KYC / AML SA Functional Spoke.
 *
 * All strings in this file are approved source content reproduced verbatim
 * from the Absa M&A Transaction Operating Model document. Do not summarise,
 * paraphrase or correct the wording.
 */

import type { SpokeContent } from "./spoke-content";

export const CONTENT: SpokeContent = {
  "id": "kyc-aml",
  "name": "KYC / AML",
  "reference": "",
  "necessityRows": [
    {
      "archetype": "Balance Sheet Acquisition",
      "classification": "Not typically a standalone workstream",
      "rationale": "No client transfer means dedicated workstream not required"
    },
    {
      "archetype": "Partial Business Acquisition",
      "classification": "Conditionally required",
      "rationale": "Conditional depending on whether clients are transferring, and the level of trust placed in seller KYC"
    },
    {
      "archetype": "Full Business Acquisition A (Buyer integrates the business)",
      "classification": "Core / Required",
      "rationale": "Core because large scale integration must ensure dedicated capacity to KYC/AML, to properly assess files, flag issues, and begin offboarding well ahead of LD1"
    },
    {
      "archetype": "Full Business Acquisition B (Buyer runs the business standalone)",
      "classification": "Required but scaled",
      "rationale": "Required at lower intensity because client, account or exposure transfer may require KYC work, but may be able to rely on existing KYC documentation"
    },
    {
      "archetype": "Balance Sheet Sale",
      "classification": "Not typically a standalone workstream",
      "rationale": "No client transfer means dedicated workstream not required"
    },
    {
      "archetype": "Partial Business Sale",
      "classification": "Not typically a standalone workstream",
      "rationale": "Core KYC activities sit with the buyer, Absa's focus is on sourcing and providing the correct files, which typically does not require a standalone workstream"
    },
    {
      "archetype": "Full Business Sale A (Buyer integrates the business)",
      "classification": "Not typically a standalone workstream",
      "rationale": "Core KYC activities sit with the buyer, Absa's focus is on sourcing and providing the correct files, which typically does not require a standalone workstream"
    },
    {
      "archetype": "Full Business Sale B (Buyer runs the business as standalone)",
      "classification": "Not typically a standalone workstream",
      "rationale": "Core KYC activities sit with the buyer, Absa's focus is on sourcing and providing the correct files, which typically does not require a standalone workstream"
    }
  ],
  "keyRole": "Owns client financial-crime file assessment, remediation and acceptance input for onboarding or transfer.",
  "responsibilities": [
    "Identify transferring clients, counterparties, beneficial owners, mandates and file populations requiring KYC / AML review",
    "Assess counterparty documentation, risk ratings, sanctions, PEP, adverse media and enhanced due diligence needs",
    "Define reliance, refresh, remediation, exclusion and onboarding approaches with Compliance and Risk",
    "Track missing documentation, client outreach requirements, remediation progress and acceptance decisions.",
    "Provide KYC / AML readiness evidence for client onboarding, LD1 readiness and go/no-go governance"
  ],
  "boundaryItems": [
    "Compliance owns policy interpretation and financial-crime approval",
    "Operations & Servicing owns onboarding process operation and customer interaction",
    "Legal owns data-sharing, clean-room and client-consent constraints"
  ],
  "centralHubRelationship": "Relationship with Central Hub: the SA Functional Spoke owns KYC and AML readiness decisions and evidence while the Central Hub sets programme standards, coordinates dependencies and escalates transaction-wide issues.",
  "regionalRelationship": [
    "Regional Spokes should own local execution as a minimum, with ownership scaling based on maturity, including file evidence, documentation remediation, screening inputs, client outreach, onboarding execution and local exception resolution where they have capacity and delegated authority.",
    "Function Authority retains KYC / AML standards, reliance approach, remediation criteria, quality review, exception management and execution ownership where regional maturity, capability or capacity is insufficient.",
    "As regional maturity increases, local ownership should expand from file evidence into remediation execution, client outreach and onboarding readiness, with Function Authority retaining standards, specialist challenge and reserved approvals."
  ],
  "externalDependencies": "External or counterparty dependencies are managed through the Central Hub governance route where timing, data, approvals or joint readiness affect LD1.",
  "mandateRows": [
    {
      "id": "kyc-reliance-approach",
      "area": "KYC reliance approach",
      "spokeAuthority": [
        "Recommends operational route and evidence requirement"
      ],
      "hubRole": "Coordinates dependency into plan and readiness",
      "regionalRole": "",
      "governance": "Financial Crime Compliance and Legal approval",
      "escalation": "Reliance not permissible or evidence incomplete"
    },
    {
      "id": "high-risk-client-acceptance",
      "area": "High-risk client acceptance",
      "spokeAuthority": [
        "Prepares assessment and remediation route"
      ],
      "hubRole": "Escalates transaction impact and exclusions",
      "regionalRole": "",
      "governance": "Financial Crime, Risk and delegated client acceptance authority",
      "escalation": "High-risk population exceeds appetite"
    },
    {
      "id": "remediation-prioritisation",
      "area": "Remediation prioritisation",
      "spokeAuthority": [
        "Owns worklist and capacity model"
      ],
      "hubRole": "Tracks critical path to LD1",
      "regionalRole": "",
      "governance": "Compliance and Operations approval",
      "escalation": "Critical clients not remediated by readiness gate"
    },
    {
      "id": "client-exclusion-recommendation",
      "area": "Client exclusion recommendation",
      "spokeAuthority": [
        "Recommends exclusion or delayed onboarding"
      ],
      "hubRole": "Coordinates commercial and programme impact",
      "regionalRole": "",
      "governance": "Risk, Compliance, Product and executive governance",
      "escalation": "Material revenue, conduct or regulatory impact"
    },
    {
      "id": "kyc-aml-readiness-and-exceptions",
      "area": "KYC / AML readiness and exceptions",
      "spokeAuthority": [
        "Recommends KYC and AML readiness status, accepted exceptions and residual risk position"
      ],
      "hubRole": "Integrates into go/no-go and completion governance",
      "regionalRole": "",
      "governance": "Programme governance, relevant functional authority and control owners",
      "escalation": "Critical KYC and AML readiness evidence, dependency or exception remains unresolved at go/no-go"
    }
  ],
  "capabilityRows": [
    {
      "category": "Specific Project Manager required?",
      "content": "Maybe - high-volume or high-risk remediation requires dedicated onboarding/remediation PM support"
    },
    {
      "category": "Baseline capabilities",
      "content": "KYC file review, AML risk assessment, financial-crime policy application, clean-room operation and client remediation tracking."
    },
    {
      "category": "Incremental capabilities by deal archetype / complexity",
      "content": "High-volume remediation, client transfer, reliance decisions, beneficial ownership refresh and sanctions screening"
    },
    {
      "category": "Specialist capabilities triggered by deal characteristics",
      "content": "High-risk clients, correspondent banking, politically exposed people, complex ownership structures and cross-border constraints"
    }
  ],
  "milestoneIntro": [
    "The key milestones below are organised as a baseline set, with additional milestones required for more complex deal archetypes split out below as required."
  ],
  "serviceCatalogue": [
    "KYC file assessment",
    "Remediation prioritisation and KYC onboarding support",
    "Client risk assessment and onboarding decisioning"
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
          "name": "Due diligence and legal drafting support (4 weeks)",
          "activities": [
            "Contribute to DD and legal drafting to ensure any clauses within SPA / BSA regarding KYC are acceptable and realistic",
            "Ensure assessment approach (sample vs full population) aligns to Absa risk appetite"
          ]
        },
        {
          "name": "Policy gap analysis complete (3 weeks)",
          "activities": [
            "Compare Absa KYC policy taxonomy to seller alongside compliance",
            "Flag significant gaps and decide on whether this requires full remediation on Absa side, or reliance can be placed in seller KYC (also aligned to regulatory considerations)",
            "Gather signoff from CRO / accountable executives on plan for remediation or non-remediation of KYC policy gaps"
          ]
        },
        {
          "name": "Clean Room set up complete (2 weeks)",
          "activities": [
            "If Clean Room required for KYC analysis, liaise with seller on conditions and ways of working",
            "Assess resourcing requirements for clean room, and employ external KYC support as required",
            "Align with Central Hub on Clean Room protocols and logistical specifics",
            "Prepare Clean Room team to enter the Clean Room, including handing over BAU responsibilities"
          ]
        },
        {
          "name": "KYC file assessment complete (6 weeks)",
          "activities": [
            "Work with seller to identify high, medium, and low risk clients",
            "Prioritise high risk clients for file assessment, especially if sampling approach taken",
            "Assess client files, and document documentation gaps required for remediation",
            "Pass list of acceptable clients to Ops & Servicing, and Client readiness team for onboarding",
            "Flag high risk / edge-case clients for specific decisioning"
          ]
        },
        {
          "name": "Remediation prioritisation and client outreach (8 weeks)",
          "activities": [
            "Prioritise the highest risk / value clients for remediation",
            "Compile a list of documentation required from outstanding clients, and work with Client readiness to ensure outreach takes place within acceptable timelines",
            "Track and monitor receipt of documentation, and closure of cases"
          ]
        },
        {
          "name": "Client risk assessment and decisioning (4 weeks)",
          "activities": [
            "Identify high risk gaps, and any undesirable clients",
            "Assess against SPA clauses to understand any implications on client decisioning",
            "Work with Absa governance to drive decision making on edge-case clients",
            "Work with risk & compliance to assess whether any documentation gaps can be risk accepted for remediation post-LD1",
            "Communicate decisions both to clients and internal teams with sufficient time to enable onboarding / offboarding"
          ]
        }
      ]
    },
    {
      "id": "full-business-acquisition-a-integrated",
      "heading": "Full Business Acquisition A (integrated) - further additional activities",
      "tab": "Full Business Acquisition A (integrated)",
      "lead": "The above with the addition of:",
      "milestones": [
        {
          "name": "Full KYC perimeter assessment (6 weeks)",
          "activities": [
            "Assess the impact of taking the full perimeter of clients, and whether additional remediation or decision-making must take place",
            "Understand key policy differences, and support in aligning required business and clients to Absa policy where required"
          ]
        }
      ]
    },
    {
      "id": "full-business-acquisition-b-standalone",
      "heading": "Full Business Acquisition B (standalone) - new activity set",
      "tab": "Full Business Acquisition B (standalone)",
      "lead": "Standalone activity set:",
      "milestones": [
        {
          "name": "Due diligence and legal drafting support (4 weeks)",
          "activities": [
            "Contribute to DD and legal drafting to ensure any clauses within SPA / BSA regarding KYC are acceptable and realistic",
            "Ensure assessment approach (sample vs full population) aligns to Absa risk appetite"
          ]
        },
        {
          "name": "Policy gap analysis complete (3 weeks)",
          "activities": [
            "Compare Absa KYC policy taxonomy to seller alongside compliance",
            "Flag significant gaps and decide on whether this requires full remediation on Absa side, or reliance can be placed in seller KYC (also aligned to regulatory considerations)",
            "Gather signoff from CRO / accountable executives on plan for remediation or non-remediation of KYC policy gaps"
          ]
        },
        {
          "name": "Decision made on policy approach (3 weeks)",
          "activities": [
            "Support risk and compliance in driving a decision on whether to align the acquired business to Absa policy standards",
            "If alignment required, define a plan for remediation of client files to meet Absa policy",
            "Discuss risk acceptances for post-LD1 remediation"
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
      "lead": "Not required",
      "milestones": []
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
  "sizingDrivers": ["Significant number of clients KYC / AML must be remediated", "Significant differences between buyer and seller KYC policies", "Buyer or seller has existing or previous KYC / AML issues", "Jurisdiction(s) in scope are high-risk"],
  "partnerServices": [
    {
      "keyService": "KYC file assessment",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Remediation prioritisation and KYC onboarding support",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Client risk assessment and onboarding decisioning",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    }
  ]
};
