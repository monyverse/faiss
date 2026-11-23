/**
 * Technology SA Functional Spoke.
 *
 * All strings in this file are approved source content reproduced verbatim
 * from the Absa M&A Transaction Operating Model document. Do not summarise,
 * paraphrase or correct the wording.
 */

import type { SpokeContent } from "./spoke-content";

export const CONTENT: SpokeContent = {
  "id": "technology",
  "name": "Technology",
  "reference": "",
  "necessityRows": [
    {
      "archetype": "Balance Sheet Acquisition",
      "classification": "Core / Required",
      "rationale": "Core because some technology build, test, environment set up, or architecture design is required across all archetypes"
    },
    {
      "archetype": "Partial Business Acquisition",
      "classification": "Core / Required",
      "rationale": "Core because some technology build, test, environment set up, or architecture design is required across all archetypes"
    },
    {
      "archetype": "Full Business Acquisition A (Buyer integrates the business)",
      "classification": "Core / Required",
      "rationale": "Core because some technology build, test, environment set up, or architecture design is required across all archetypes"
    },
    {
      "archetype": "Full Business Acquisition B (Buyer runs the business standalone)",
      "classification": "Required but scaled",
      "rationale": "Required at lower intensity because some tech change may be needed even without full platform change or integration"
    },
    {
      "archetype": "Balance Sheet Sale",
      "classification": "Core / Required",
      "rationale": "Core because some technology build, test, environment set up, or architecture design is required across all archetypes"
    },
    {
      "archetype": "Partial Business Sale",
      "classification": "Core / Required",
      "rationale": "Core because some technology build, test, environment set up, or architecture design is required across all archetypes"
    },
    {
      "archetype": "Full Business Sale A (Buyer integrates the business)",
      "classification": "Core / Required",
      "rationale": "Core because some technology build, test, environment set up, or architecture design is required across all archetypes"
    },
    {
      "archetype": "Full Business Sale B (Buyer runs the business as standalone)",
      "classification": "Required but scaled",
      "rationale": "Required at lower intensity because some tech change may be needed even without full platform change or integration"
    }
  ],
  "keyRole": "Owns technology delivery required to support the transaction perimeter and target operating model, including environment readiness, architecture, solution design, build, testing, contingency planning, war-room escalation and service transition. Technology also supports capability mapping during due diligence, while business and Product Owners should own the target capability decisions in the future state.",
  "responsibilities": [
    "Map current and required capabilities across digital channels, branch channels, core systems, integration points and operational platforms.",
    "Translate business, product, operational, data and control requirements into technology scope, architecture decisions and solution design.",
    "Deliver environments, build, configuration, interfaces, access, non-functional testing, release management and deployment plans.",
    "Coordinate with Data Migration on source and target systems, data feeds, ETL environment needs, extract routines and cutover technical runbooks.",
    "Define technology contingency, fallback, resilience, cyber, access and war-room escalation requirements for testing, cutover and hypercare",
    "Maintain central visibility of resourcing contracts and technology delivery assumptions, including country-owned contract items such as travel, local support and implementation dependencies",
    "Own technology service transition assessment, remediation, post-LD1 stabilisation and handover into BAU technology operations."
  ],
  "boundaryItems": [
    "Business and Product Owners own business capability requirements, target capability decisions and acceptance criteria; Technology performs capability mapping and feasibility assessment where Product Owner capability is not yet mature.",
    "Data Migration owns migration logic, data quality, reconciliation and data cutover; Technology owns platforms, environments, interfaces, access and technical cutover.",
    "Procurement owns supplier sourcing and third-party contract actions; Technology owns technical vendor requirements and must input to resourcing, travel and implementation contract terms before commitments are made.",
    "Regional technology teams execute local activity where agreed, but central Technology owns or approves decisions affecting SA-hosted core systems and central accountability.",
    "E2E Testing owns integrated journey coverage and evidence; Technology owns technical testing, environments, defect remediation and release readiness."
  ],
  "centralHubRelationship": "Relationship with Central Hub: the SA Functional Spoke owns technology delivery decisions, technical readiness evidence and technology budget or resourcing assumptions where it is accountable, while the Central Hub coordinates dependencies, governance cadence, scope control and escalation.",
  "regionalRelationship": [
    "Regional Spokes should own local execution as a minimum, with ownership scaling based on maturity, including local system and infrastructure evidence, access coordination, local suppliers, testing support, deployment prerequisites and country implementation activity where they have capacity and delegated authority.",
    "Function Authority retains architecture, SA-hosted core systems, cyber and access standards, central platforms, budget or resourcing accountability, and execution ownership where regional maturity, capability or capacity is insufficient.",
    "As regional maturity increases, local ownership should expand from evidence and support into local delivery, test execution and deployment activity, with Function Authority retaining standards, specialist challenge and reserved approvals."
  ],
  "externalDependencies": "External or counterparty dependencies are managed through the Central Hub governance route where technology data, environments, supplier contracts, access, approvals, buyer readiness or joint testing affect LD1.",
  "mandateRows": [
    {
      "id": "capability-mapping-and-target-technology-scope",
      "area": "Capability mapping and target technology scope",
      "spokeAuthority": [
        "Maps current and required channel, core-system and platform capabilities where business or Product Owners do not have requisite capabilities"
      ],
      "hubRole": "Ensures capability decisions are captured in scope, plan, budget and dependency governance.",
      "regionalRole": "",
      "governance": "Business owner, Product Owners, Architecture, Technology, Operations and programme governance.",
      "escalation": "Business capability ownership is weak, Product Owner capacity is unclear, or technology scope is being inferred without evidence."
    },
    {
      "id": "technology-solution-architecture-and-delivery-route",
      "area": "Technology solution architecture and delivery route",
      "spokeAuthority": [
        "Owns solution design, architecture decisions, lift-and-shift versus build recommendation, environment approach and non-functional requirements."
      ],
      "hubRole": "Challenges critical path, dependency impact, scope control and readiness evidence.",
      "regionalRole": "",
      "governance": "Architecture, Cyber, Risk, Compliance, Technology governance and programme SteerCo.",
      "escalation": "Architecture exception, cyber risk, target-state conflict, environment gap or local maturity issue threatens delivery."
    },
    {
      "id": "resourcing-budget-and-contracting-assumptions",
      "area": "Resourcing, budget and contracting assumptions",
      "spokeAuthority": [
        "Owns technology delivery resourcing assumptions and should control or approve the technology budget where held accountable for outcomes."
      ],
      "hubRole": "Tracks budget, procurement and dependency impacts across the integrated plan.",
      "regionalRole": "",
      "governance": "Technology leadership, Finance & Tax, Procurement, HR where people capacity is required, and programme governance.",
      "escalation": "Country-owned contracts omit delivery needs, central Technology is accountable without decision rights, or run-cost uplift is not funded."
    },
    {
      "id": "build-test-and-release-readiness",
      "area": "Build, test and release readiness",
      "spokeAuthority": [
        "Approves build scope, release sequencing, environment readiness, test support and defect remediation for technology deliverables."
      ],
      "hubRole": "Coordinates cross-workstream readiness, E2E dependency and issue escalation.",
      "regionalRole": "",
      "governance": "Technology governance, change advisory controls, E2E Testing, Data Migration and Risk.",
      "escalation": "Testing fails without agreed learning path, change freeze applies, capacity is short or release evidence is incomplete."
    },
    {
      "id": "cutover-contingency-and-war-room-escalation",
      "area": "Cutover, contingency and war-room escalation",
      "spokeAuthority": [
        "Defines technical cutover, contingency, fallback, resilience, war-room entry criteria and issue escalation route."
      ],
      "hubRole": "Integrates technology cutover into the LD1 command centre and programme go/no-go pack.",
      "regionalRole": "",
      "governance": "Client Readiness, Risk, Cyber, Operations, Data Migration and programme governance.",
      "escalation": "Fallback is not viable, technology incident affects wider Absa operations, or local teams make decisions outside agreed mandate."
    },
    {
      "id": "service-transition-and-post-ld1-readiness",
      "area": "Service transition and post-LD1 readiness",
      "spokeAuthority": [
        "Recommends technology readiness status, accepted exceptions, residual risk and BAU service transition approach."
      ],
      "hubRole": "Integrates readiness and exceptions into completion, LD1 and hypercare governance.",
      "regionalRole": "",
      "governance": "Technology operations, service management, Cyber, Risk, accountable business owner and BAU control owners.",
      "escalation": "Critical readiness evidence, service support, licensing, support staffing or residual exception remains unresolved at go/no-go."
    }
  ],
  "capabilityRows": [
    {
      "category": "Specific Project Manager required?",
      "content": "Yes - build, release, environment, access, testing, cutover and service-transition activity require dedicated technology PM support, with clear ownership of technology budget and resourcing assumptions where Technology is accountable."
    },
    {
      "category": "Baseline capabilities",
      "content": "Solution architecture, capability mapping, application delivery, environment management, integration, access, release control, cyber, resilience, technical testing and service transition."
    },
    {
      "category": "Incremental capabilities by deal archetype / complexity",
      "content": "Lift-and-shift versus build assessment, channel enhancement, core-system integration, platform transfer, data-migration enablement, supplier take-on, licensing uplift, country execution oversight and TSA exit."
    },
    {
      "category": "Specialist capabilities triggered by deal characteristics",
      "content": "Digital channels, branch channels, core banking, cards, payments, identity, cloud, cyber, regulatory technology, legacy wind-down, local infrastructure, vendor transition and run-cost modelling."
    }
  ],
  "milestoneIntro": [
    "The key milestones below are organised as a baseline set, with additional milestones required for more complex deal archetypes split out below as required.",
    "As deal archetypes scale from balance sheet to partial business to full business, each baseline activity should be assessed against the complexity factors laid out in the deal archetype documentation."
  ],
  "serviceCatalogue": [
    "Environment readiness",
    "Architecture decision making and solution design",
    "Technology contingency planning",
    "War room planning and escalation",
    "Technology build based on business or migration requirements",
    "Technology testing coordination and execution",
    "Technology service transition assessment and remediation"
  ],
  "activitySets": [
    {
      "id": "balance-sheet-acquisition",
      "heading": "Balance Sheet Acquisition - baseline activities",
      "tab": "Balance Sheet Acquisition",
      "milestones": [
        {
          "name": "Product mapping and capability assessment (7 weeks)",
          "activities": [
            "Assess current and required capabilities across digital, branch, core-system and operational channels during due diligence.",
            "Recommend lift-and-shift, build, enhance, procure or decommission options based on target operating model and delivery feasibility.",
            "Confirm that business or Product Owners make capability decisions, with Technology documenting feasibility and implications."
          ]
        },
        {
          "name": "Technology build based on business or migration requirements (8 weeks)",
          "activities": [
            "Deliver build, configuration, interfaces, access, reporting, infrastructure and integration changes needed for the deal perimeter, based on capability gaps identified",
            "Coordinate build with Data Migration requirements, supplier inputs, security controls and business acceptance criteria",
            "Track scope changes, budget impact, licensing uplift and support-staff implications from build decisions."
          ]
        },
        {
          "name": "Environment set up & maintenance (7 weeks)",
          "activities": [
            "Confirm environments, access, connectivity, test data, release windows and non-production controls required for the transaction.",
            "Identify environment gaps affecting Data Migration, E2E Testing, Operations, Risk, Compliance and Client Readiness",
            "Evidence environment stability, access readiness and support ownership before formal testing starts"
          ]
        },
        {
          "name": "Contingency planning & failover readiness (4 weeks)",
          "activities": [
            "Define resilience, fallback, rollback, manual workaround and incident paths for technology failure scenarios",
            "Align contingency plans with Data Migration, Operations, Risk, E2E Testing and Client Readiness.",
            "Confirm contingency owners, decision points and evidence before dress rehearsals and go-live."
          ]
        },
        {
          "name": "War room protocol definition and testing (6 weeks)",
          "activities": [
            "Define war-room entry criteria, issue severity, escalation route, decision authority and command-centre participation.",
            "Confirm central and country technology contacts, supplier contacts and out-of-hours support arrangements.",
            "Agree which issues enter the war room and which move into backlog or BAU remediation."
          ]
        },
        {
          "name": "Technology testing coordination and execution (6 weeks)",
          "activities": [
            "Run technical testing, SIT support, non-functional testing, defect remediation and release readiness checks.",
            "Support E2E Testing with environments, data feeds, technical defect resolution and evidence for go/no-go."
          ]
        },
        {
          "name": "Technology service transition assessment and remediation (3 weeks)",
          "activities": [
            "Assess BAU support model, service desk, monitoring, access support, incident management, capacity and run-cost requirements.",
            "Remediate service-transition gaps before LD1 or agree accepted exceptions with accountable owners.",
            "Transfer open technology issues to hypercare or BAU technology operations with clear ownership."
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
          "name": "Partial technology perimeter and capability mapping completed (4 weeks)",
          "activities": [
            "Map capabilities, systems, channels, interfaces and infrastructure split between transferring, retained and shared activity.",
            "Confirm Product Owner or business decisions for capabilities that Technology has mapped",
            "Identify platform enhancements, take-over needs, procurement needs and TSA technology dependencies"
          ]
        },
        {
          "name": "Country, contract and resourcing dependencies mobilised (7 weeks)",
          "activities": [
            "Review country-owned technology contracts, supplier support and local implementation dependencies",
            "Confirm central visibility of technology resourcing contracts where central teams are accountable for delivery.",
            "Escalate gaps in local maturity, culture or decision discipline to central or joint governance."
          ]
        },
        {
          "name": "Shared platform build, test and cutover route agreed (8 weeks)",
          "activities": [
            "Define build and release path for shared systems, retained systems, transferred platforms and integration points.",
            "Test partial cutover, retained service continuity, access controls and data feed readiness.",
            "Agree post-LD1 support and defect ownership across"
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
          "name": "Integrated technology capability model approved (8 weeks)",
          "activities": [
            "Confirm required enhancements to existing Absa channels, including digital, branch, core-system and operational capabilities.",
            "Resolve whether required capabilities will be built by Technology, owned by Product Owners or delivered through business-unit digital teams.",
            "Align integrated capability decisions to the target operating model and budget."
          ]
        },
        {
          "name": "Integrated build, licensing impacts delivered (8 weeks)",
          "activities": [
            "Deliver build and configuration across applications, interfaces, identity, channels, environments and reporting platforms.",
            "Coordinate procurement and vendor inputs for technology build or support expansion."
          ]
        },
        {
          "name": "Integrated testing, cutover and service transition completed (6 weeks)",
          "activities": [
            "Support E2E and dress rehearsal cycles with stable environments, defect remediation and release evidence.",
            "Confirm cutover, fallback, war-room and technology readiness evidence for LD1 go/no-go.",
            "Transition integrated services into BAU support, monitoring and incident management."
          ]
        }
      ]
    },
    {
      "id": "full-business-acquisition-b-standalone",
      "heading": "Full Business Acquisition B (standalone) - new activity set",
      "tab": "Full Business Acquisition B (standalone)",
      "milestones": [
        {
          "name": "Standalone technology operating model and architecture designed (6 weeks)",
          "activities": [
            "Define standalone systems, channels, infrastructure, integration, support model, security and governance required for the acquired business.",
            "Assess whether to take over existing technology, procure new platforms, build Absa-hosted capability or run interim TSA-backed services.",
            "Confirm decision rights and budget ownership for central and country technology teams."
          ]
        },
        {
          "name": "Core systems, channels and environments stood up (8 weeks)",
          "activities": [
            "Build or procure core systems, digital channels, branch channels, access, identity, infrastructure and operational platforms, as required, or assess suitability of existing",
            "Set up environments, monitoring, release processes, service management and cyber controls.",
            "Confirm local infrastructure, contracts, suppliers, resourcing are funded and executable."
          ]
        },
        {
          "name": "Standalone integration and data enablement delivered (8 weeks)",
          "activities": [
            "Build interfaces, reporting flows, data feeds and integration patterns required for standalone operation.",
            "Coordinate with Data Migration on ETL environment needs, target-system readiness and technical cutover runbooks.",
            "Validate resilience, access, capacity and performance for standalone volumes."
          ]
        },
        {
          "name": "Standalone test, contingency and cutover rehearsed (6 weeks)",
          "activities": [
            "Run technical, non-functional, E2E support, contingency and command-centre rehearsals.",
            "Confirm market-specific testing approach, defect response and readiness evidence.",
            "Update cutover and fallback plans based on rehearsal findings."
          ]
        },
        {
          "name": "Standalone service transition completed (3 weeks)",
          "activities": [
            "Stand up BAU technology operations, support staffing, incident management, monitoring and vendor support.",
            "Confirm licensing, support cost and run-cost uplift are reflected in Finance and operating budgets.",
            "Transfer open technology actions to hypercare or standalone BAU owners."
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
          "name": "Technology sale perimeter and exit requirements defined (4 weeks)",
          "activities": [
            "Identify systems, channels, access, interfaces, data feeds, infrastructure and services affected by sale",
            "Confirm Absa retained systems, buyer hand-off and technology exit obligations",
            "Assess whether buyer support requires lift-and-shift, extract-only support, TSA services or temporary access."
          ]
        },
        {
          "name": "Buyer-facing technology support and data enablement prepared (8 weeks)",
          "activities": [
            "Provide technical input needed for buyer source-to-target mapping, data extraction, access setup and interface understanding.",
            "Confirm confidentiality, security and access controls for buyer-facing technology support."
          ]
        },
        {
          "name": "Absa technology controls and cutover route agreed (6 weeks)",
          "activities": [
            "Plan access removal, interface shutdown, retained service continuity, release windows and technical fallback.",
            "Run technical testing and cutover rehearsal for seller-side technology steps.",
            "Confirm readiness evidence for completion, LD1 and post-LD1 support."
          ]
        },
        {
          "name": "Service transition and residual support handed over (3 weeks)",
          "activities": [
            "Define post-LD1 support model, defect ownership, service levels and escalation route.",
            "Transfer buyer, Absa BAU or TSA technology issues to the right owner.",
            "Close Absa technology exit actions once retained controls and support obligations are stable."
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
          "name": "Shared technology and TSA dependencies mapped (4 weeks)",
          "activities": [
            "Separate technology services, systems, access, interfaces and support between buyer, retained Absa and TSA-backed activity.",
            "Confirm local country systems, contracts and support dependencies needed for the carve-out.",
            "Map technology dependencies to Procurement, Data Migration, Operations, Risk and Legal obligations."
          ]
        },
        {
          "name": "Partial separation build, test and access controls completed (8 weeks)",
          "activities": [
            "Deliver access changes, interface changes, retained-system controls and buyer hand-off technology changes.",
            "Test shared-service and TSA-supported journeys with E2E Testing and Client Readiness.",
            "Validate that retained Absa systems remain stable and secure after separation."
          ]
        },
        {
          "name": "TSA exit technology path launched (4 weeks)",
          "activities": [
            "Define technology actions needed to exit TSAs, remove shared access and close temporary support.",
            "Track buyer readiness and Absa residual technology risks through governance.",
            "Confirm BAU or buyer ownership for post-LD1 defects and residual support."
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
          "name": "Buyer integration technology dependencies aligned (8 weeks)",
          "activities": [
            "Agree buyer and Absa responsibilities for integration, access, data, interfaces, environments and support.",
            "Confirm Absa technology support needed for buyer integration without compromising retained controls.",
            "Escalate buyer technology readiness gaps through joint governance."
          ]
        },
        {
          "name": "Absa exit controls and retained service readiness completed (4 weeks)",
          "activities": [
            "Execute access removal, interface changes, monitoring updates, retained platform controls and service continuity checks.",
            "Support buyer integration testing where Absa systems or data are in scope.",
            "Confirm technology readiness evidence for TSA entry, TSA exit and Absa retained obligations."
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
          "name": "Buyer standalone technology readiness requirements agreed (4 weeks)",
          "activities": [
            "Define the buyer standalone technology capabilities, systems, channels, support, access and data enablement Absa must support.",
            "Agree evidence Absa requires before service exit or obligation closure.",
            "Confirm local country, supplier, security and regulatory technology dependencies."
          ]
        },
        {
          "name": "Full Absa technology separation executed (8 weeks)",
          "activities": [
            "Remove access, close interfaces, separate environments, transfer agreed data enablement and shut down temporary services.",
            "Validate Absa retained systems, monitoring, reporting and controls after separation.",
            "Track buyer standalone defects that delay Absa support exit."
          ]
        },
        {
          "name": "Technology TSA exit and obligation closure completed (4 weeks)",
          "activities": [
            "Complete transition-service exit actions, service desk handover, vendor handover and residual issue transfer.",
            "Confirm Absa has no unsupported technology obligations, access exposure or run-cost leakage.",
            "Archive technology decisions, designs, test evidence, cutover evidence and service transition records."
          ]
        }
      ]
    }
  ],
  "sizingFactors": "",
  "sizingDrivers": ["Net-new technology build required", "Cross-collaborative build required across buyer and seller", "New environments or configurations required to support the build", "Significant in-house tech build required, rather than sitting with a vendor"],
  "partnerServices": [
    {
      "keyService": "Environment readiness",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Architecture decision making and solution design",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Technology contingency planning",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "War room planning and escalation",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Technology build based on business or migration requirements",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Technology testing coordination and execution",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Technology service transition assessment and remediation",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    }
  ]
};
