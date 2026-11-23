/**
 * E2E Testing SA Functional Spoke.
 *
 * All strings in this file are approved source content reproduced verbatim
 * from the Absa M&A Transaction Operating Model document. Do not summarise,
 * paraphrase or correct the wording.
 */

import type { SpokeContent } from "./spoke-content";

export const CONTENT: SpokeContent = {
  "id": "e2e-testing",
  "name": "E2E Testing",
  "reference": "",
  "necessityRows": [
    {
      "archetype": "Balance Sheet Acquisition",
      "classification": "Required but scaled",
      "rationale": "Required to prove data, account, system, reporting, servicing and controls are working correctly, but can be scaled up as build completion approaches"
    },
    {
      "archetype": "Partial Business Acquisition",
      "classification": "Core / Required",
      "rationale": "Required because these archetypes introduce material process and platform changes which must be trained end to end"
    },
    {
      "archetype": "Full Business Acquisition A (Buyer integrates the business)",
      "classification": "Core / Required",
      "rationale": "Required because these archetypes introduce material process and platform changes which must be trained end to end"
    },
    {
      "archetype": "Full Business Acquisition B (Buyer runs the business standalone)",
      "classification": "Core / Required",
      "rationale": "Required because these archetypes introduce material process and platform changes which must be trained end to end"
    },
    {
      "archetype": "Balance Sheet Sale",
      "classification": "Not typically a standalone workstream",
      "rationale": "Not required as large scale impact is usually limited, and testing can be absorbed into business / tech functions"
    },
    {
      "archetype": "Partial Business Sale",
      "classification": "Conditionally required",
      "rationale": "Conditional based on the scale of change impacting the retained business"
    },
    {
      "archetype": "Full Business Sale A (Buyer integrates the business)",
      "classification": "Core / Required",
      "rationale": "Required to test buyer integration dependencies, Absa exit controls, retained services and post-LD1 support flows."
    },
    {
      "archetype": "Full Business Sale B (Buyer runs the business as standalone)",
      "classification": "Conditionally required",
      "rationale": "Conditional based on the scale of change impacting the retained business"
    }
  ],
  "keyRole": "Owns end-to-end testing strategy, execution evidence, testing coordination, and defect governance across customer, colleague, data, technology, operations, supplier and readiness journeys.",
  "responsibilities": [
    "Define end-to-end test strategy, test scope, entry criteria, exit criteria, evidence standards and defect governance.",
    "Define success criteria for mock runs and dress rehearsals before execution, including data completeness, accuracy, reconciliation and operational acceptance.",
    "Coordinate test journeys across Data Migration, Technology, Operations, Finance, Risk, Compliance, Procurement, HR, Change and Legal dependencies.",
    "Coordinate testing of customer, colleague, system, reporting, control, digital, cards, supplier, payment and servicing journeys that affect LD1 readiness.",
    "Maintain defect triage, retest, acceptance, workaround and residual-risk evidence through readiness governance.",
    "Provide test evidence into LD1 go/no-go, assurance, regulator, Internal Audit and post-LD1 hypercare decisions."
  ],
  "boundaryItems": [
    "Technology owns technical build, environments and technical test execution; E2E Testing owns integrated journey coverage and evidence completeness.",
    "Data Migration owns migration execution and reconciliations; E2E Testing validates that migrated data supports end-to-end business outcomes",
    "Operations & Servicing owns operational process design and acceptance; E2E Testing validates that processes work across hand-offs.",
    "Business, operations, and technology teams own the execution of testing, E2E Testing facilitates and coordinates",
    "Risk and Independent Assurance challenge testing evidence, success criteria and residual risk acceptance."
  ],
  "centralHubRelationship": "Relationship with Central Hub: E2E Testing owns test design, execution evidence and defect governance while the Central Hub coordinates cross-workstream dependencies, decision cadence, issue escalation and readiness reporting.",
  "regionalRelationship": [
    "Regional Spokes should own local execution as a minimum, with ownership scaling based on maturity, including process walkthroughs, user acceptance support, local data and testers, mock runs, dress rehearsals, defect retesting and local evidence production where they have capacity and delegated authority.",
    "Function Authority retains test strategy, entry and exit criteria, evidence standards, integrated journey coverage, defect governance and execution ownership where regional maturity, capability or capacity is insufficient.",
    "As regional maturity increases, local ownership should expand from test support into local execution, defect remediation and readiness sign-off, with Function Authority retaining standards, specialist challenge and reserved approvals."
  ],
  "externalDependencies": "",
  "mandateRows": [
    {
      "id": "test-strategy-scope-and-success-criteria",
      "area": "Test strategy, scope and success criteria",
      "spokeAuthority": [
        "Defines E2E test strategy, journeys, entry and exit criteria, mock run and dress rehearsal success criteria."
      ],
      "hubRole": "Coordinates cross-workstream agreement and tracks readiness implications.",
      "regionalRole": "",
      "governance": "E2E Testing, Client Readiness, Technology, Operations, Data Migration, Risk and Independent Assurance.",
      "escalation": "Success criteria are undefined, scope omits digital/cards/local journeys, or test entry criteria are not met."
    },
    {
      "id": "data-and-migration-test-evidence",
      "area": "Data and migration test evidence",
      "spokeAuthority": [
        "Validates that migrated data supports business outcomes, reporting, controls and reconciliations."
      ],
      "hubRole": "Tracks defects, evidence and cross-workstream dependencies.",
      "regionalRole": "",
      "governance": "Data Migration, Finance, Risk, Compliance, Operations and IA where required.",
      "escalation": "Data completeness or accuracy cannot be evidenced, or no owner can confirm comfort with the data."
    },
    {
      "id": "digital-cards-and-operational-journey-coverage",
      "area": "Digital, cards and operational journey coverage",
      "spokeAuthority": [
        "Owns integrated test coverage for digital journeys, cards, operations, servicing, customer and colleague outcomes."
      ],
      "hubRole": "Coordinates dependency resolution where test outcomes affect LD1.",
      "regionalRole": "",
      "governance": "Technology, Operations, Product, Cards, Digital, Risk and LD1 governance.",
      "escalation": "Digital readiness is uncertain, 70k cards production is untested, or operational hand-offs fail."
    },
    {
      "id": "defect-acceptance-and-retest",
      "area": "Defect acceptance and retest",
      "spokeAuthority": [
        "Controls defect triage, retest, workaround evidence, acceptance criteria and residual test risk view."
      ],
      "hubRole": "Escalates defects affecting LD1 or assurance evidence.",
      "regionalRole": "",
      "governance": "E2E Testing, Risk, Independent Assurance, workstream owners and programme SteerCo.",
      "escalation": "Defects remain open without accepted workaround, or residual test risk is not approved."
    },
    {
      "id": "go-no-go-test-recommendation",
      "area": "Go/no-go test recommendation",
      "spokeAuthority": [
        "Provides E2E testing recommendation for LD1 readiness, completion or cutover decision forums."
      ],
      "hubRole": "Integrates recommendation into go/no-go pack and governance minutes.",
      "regionalRole": "",
      "governance": "Client Readiness, accountable executive, programme SteerCo and relevant control functions.",
      "escalation": "Go/no-go decision proceeds without evidence, local sign-off or accepted test exceptions."
    }
  ],
  "capabilityRows": [
    {
      "category": "Specific Project Manager required?",
      "content": "No - E2E Testing is effectively a project management / onboarding oversight function focused on tracking testing coverage and execution. The workstream lead must have project management capabilities"
    },
    {
      "category": "Baseline capabilities",
      "content": "Test strategy definition, testing best practice, test case definition, acceptance criteria, project management, data analysis, stakeholder management"
    },
    {
      "category": "Incremental capabilities by deal archetype / complexity",
      "content": "Testing of complex business process change, employee/HR systems testing, production testing"
    },
    {
      "category": "Specialist capabilities triggered by deal characteristics",
      "content": "Understanding of product specific testing requirements (e.g., testing of back to back trades), physical process testing (e.g., facilities)"
    }
  ],
  "milestoneIntro": [
    "The key milestones below are organised as a baseline set, with additional milestones required for more complex deal archetypes split out below as required.",
    "As deal archetypes scale from balance sheet to partial business to full business, each baseline activity should be assessed against the complexity factors laid out in the deal archetype documentation.",
    "Service catalogue:"
  ],
  "serviceCatalogue": [
    "E2E test strategy and integrated journey design",
    "Data completeness and accuracy test evidence",
    "Digital, cards and operational readiness testing",
    "Defect triage, retest and acceptance",
    "Local and counterparty test coordination",
    "Readiness evidence for assurance and go/no-go",
    "Hypercare test defect transition"
  ],
  "activitySets": [
    {
      "id": "balance-sheet-acquisition",
      "heading": "Balance Sheet Acquisition - baseline activities",
      "tab": "Balance Sheet Acquisition",
      "milestones": [
        {
          "name": "E2E test strategy and scope agreed (3 weeks)",
          "activities": [
            "Define integrated test journeys, scenarios, entry criteria, exit criteria, evidence standards and ownership.",
            "Include customer, colleague, data, operations, technology, finance, risk, compliance, supplier and reporting hand-offs.",
            "Confirm local and counterparty participation required for each test journey."
          ]
        },
        {
          "name": "Data completeness and accuracy test criteria defined (3 weeks)",
          "activities": [
            "Agree how the programme will evidence comfort with data completeness and accuracy.",
            "Define reconciliation thresholds, exception handling, data owner sign-off and defect severity rules.",
            "Align data testing with Risk, Independent Assurance, Finance, Compliance and Data Migration."
          ]
        },
        {
          "name": "Defect governance and retest cadence live (2 weeks)",
          "activities": [
            "Operate defect triage, owner allocation, retest scheduling, workaround assessment and acceptance decisions.",
            "Escalate defects that affect regulatory approval, CPs, risk appetite, customer outcomes or LD1 timing.",
            "Maintain test evidence and residual-risk decisions in the readiness pack."
          ]
        },
        {
          "name": "LD1 test recommendation issued (1 week)",
          "activities": [
            "Provide E2E test status, unresolved defects, accepted workarounds and residual test risk for go/no-go.",
            "Confirm hypercare monitoring for post-LD1 test defects and operational issues.",
            "Transfer open defects to BAU or hypercare owners."
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
          "name": "Partial perimeter journey coverage completed (4 weeks)",
          "activities": [
            "Test transferring, retained and shared service journeys across Absa, counterparty and country hand-offs.",
            "Validate TSA-supported processes, retained-service controls and exception routing.",
            "Confirm customer, account, reporting and operational outcomes for in-scope and out-of-scope items."
          ]
        },
        {
          "name": "Local and counterparty test execution mobilised (4 weeks)",
          "activities": [
            "Assign local testers, evidence owners and counterparty participants for each shared journey.",
            "Confirm environment access, test data and availability for country teams.",
            "Escalate participation or evidence gaps through Central Hub governance."
          ]
        },
        {
          "name": "Boundary defects and workarounds accepted (2 weeks)",
          "activities": [
            "Track defects where ownership crosses buyer, seller, country, central or TSA boundaries.",
            "Validate workarounds and residual risk with Risk and Independent Assurance.",
            "Confirm partial acquisition test readiness for LD1 and post-LD1 monitoring."
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
          "name": "Integrated business journey testing completed (6 weeks)",
          "activities": [
            "Test full integrated customer, colleague, operations, finance, compliance, risk and reporting journeys.",
            "Validate migrated data through downstream systems, controls and customer outcomes.",
            "Confirm user acceptance and local execution evidence where country activity remains in scope."
          ]
        },
        {
          "name": "Digital and cards readiness tested (4 weeks)",
          "activities": [
            "Include digital onboarding, servicing, channel access, customer notifications and issue flows in E2E scope.",
            "Plan and execute high-volume cards testing, including 70k card production, fulfilment, activation and servicing where relevant.",
            "Escalate readiness gaps where digital or cards testing affects customer go-live."
          ]
        },
        {
          "name": "Dress rehearsal exit recommendation agreed (1 week)",
          "activities": [
            "Assess dress rehearsal outcomes against pre-agreed success criteria.",
            "Confirm data, systems, people, supplier and operational evidence supports go-live.",
            "Provide defect, workaround and residual risk view to Client Readiness and Risk."
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
          "name": "Standalone test estate and governance established (5 weeks)",
          "activities": [
            "Define standalone test environments, data, access, users, tools, defect workflow and evidence repository.",
            "Confirm test coverage for every standalone operating process required at LD1.",
            "Set governance cadence for testing, assurance, readiness and local sign-off."
          ]
        },
        {
          "name": "Full standalone lifecycle testing completed (6 weeks)",
          "activities": [
            "Test customer, product, finance, people, supplier, operations, risk, compliance and reporting lifecycles.",
            "Validate control operation, system access, data flows, reconciliations and issue escalation without seller support.",
            "Confirm local and central teams can operate test-passed processes from LD1."
          ]
        },
        {
          "name": "Cutover and command-centre rehearsals completed (4 weeks)",
          "activities": [
            "Run cutover, fallback, command-centre, incident and communications rehearsals before LD1.",
            "Confirm success criteria and go/no-go inputs for standalone launch.",
            "Transition open defects into hypercare with named owners."
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
          "name": "Carve-out and TSA test journeys designed (3 weeks)",
          "activities": [
            "Test shared-service, TSA, retained Absa and buyer journeys across all hand-offs.",
            "Confirm test scenarios for access, data, reports, customer outcomes, supplier dependencies and operational exceptions.",
            "Define success criteria for TSA entry and TSA exit readiness."
          ]
        },
        {
          "name": "Boundary and local execution testing completed (6 weeks)",
          "activities": [
            "Validate in-country journeys, buyer interactions and retained Absa processes where local execution remains material.",
            "Track defects by buyer, seller, country and TSA owner.",
            "Confirm workarounds and residual risks are accepted before LD1."
          ]
        },
        {
          "name": "TSA exit test plan launched (3 weeks)",
          "activities": [
            "Plan regression and exit testing for shared-service wind-down.",
            "Track defects that could extend TSA reliance or Absa obligations.",
            "Provide test evidence to TSA exit governance."
          ]
        }
      ]
    },
    {
      "id": "full-business-sale-a-buyer-integrates",
      "heading": "Full Business Sale A (buyer integrates) - further additional divestment activities",
      "tab": "Full Business Sale A (buyer integrates)",
      "milestones": [
        {
          "name": "Buyer integration test dependencies aligned (5 weeks)",
          "activities": [
            "Agree buyer and Absa test responsibilities, environments, data, cutover windows and evidence-sharing constraints.",
            "Validate buyer integration dependencies that affect Absa retained services or TSA obligations.",
            "Escalate buyer readiness gaps through joint governance."
          ]
        },
        {
          "name": "Absa exit and retained control tests completed (5 weeks)",
          "activities": [
            "Test Absa access removal, retained reporting, data separation, supplier exits and TSA-supported hand-offs.",
            "Confirm Absa controls remain effective while the buyer integrates the business.",
            "Provide readiness evidence for integration dependency closure."
          ]
        },
        {
          "name": "Post-LD1 defect ownership transferred (3 weeks)",
          "activities": [
            "Transfer defects to buyer, Absa BAU, TSA or post-completion obligation owners.",
            "Monitor post-LD1 issues until buyer integration risks no longer affect Absa.",
            "Archive test evidence for audit and dispute support."
          ]
        }
      ],
      "lead": "The above, with the addition of:"
    },
    {
      "id": "full-business-sale-b-standalone",
      "heading": "Full Business Sale B (standalone) - complete divestment activity set",
      "tab": "Full Business Sale B (standalone)",
      "milestones": [
        {
          "name": "Buyer standalone test scope confirmed (3 weeks)",
          "activities": [
            "Define buyer standalone test evidence Absa requires before service exit or obligation closure.",
            "Confirm tests for data, controls, reporting, access, customers, employees, suppliers and operations.",
            "Agree evidence-sharing, confidentiality and sign-off route with Legal and the buyer."
          ]
        },
        {
          "name": "Full separation and exit testing completed (6 weeks)",
          "activities": [
            "Test Absa exit from systems, services, supplier support, customer support and data access.",
            "Validate buyer standalone readiness where Absa retains risk until exit evidence is accepted.",
            "Escalate defects that could delay TSA exit, regulatory approval or post-completion closure."
          ]
        },
        {
          "name": "Final test evidence archive completed (1 week)",
          "activities": [
            "Archive go/no-go packs, test results, defects, approvals, workarounds and closure evidence.",
            "Confirm all defects have buyer, Absa BAU or legal obligation owners.",
            "Close E2E Testing when residual issues are no longer programme-owned."
          ]
        }
      ]
    }
  ],
  "sizingFactors": "Refer to workstream sizing factors as part of Deal Archetype documentation.",
  "partnerServices": [
    {
      "keyService": "E2E test strategy and integrated journey design",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Data completeness and accuracy test evidence",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Digital, cards and operational readiness testing",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Defect triage, retest and acceptance",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Local and counterparty test coordination",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Readiness evidence for assurance and go/no-go",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Hypercare test defect transition",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    }
  ]
};
