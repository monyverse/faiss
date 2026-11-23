/**
 * Internal Audit SA Functional Spoke.
 *
 * All strings in this file are approved source content reproduced verbatim
 * from the Absa M&A Transaction Operating Model document. Do not summarise,
 * paraphrase or correct the wording.
 */

import type { SpokeContent } from "./spoke-content";

export const CONTENT: SpokeContent = {
  "id": "internal-audit",
  "name": "Internal Audit",
  "reference": "",
  "necessityRows": [
    {
      "archetype": "Balance Sheet Acquisition",
      "classification": "Required but scaled",
      "rationale": "A risk-based Internal Audit assessment is required where material governance, control, data, regulatory, financial or LD1 risks warrant third-line assurance. Smaller deal perimeter may warrant scaled involvement."
    },
    {
      "archetype": "Partial Business Acquisition",
      "classification": "Core / Required",
      "rationale": "A risk-based Internal Audit assessment is required where material governance, control, data, regulatory, financial or LD1 risks warrant third-line assurance."
    },
    {
      "archetype": "Full Business Acquisition A (Buyer integrates the business)",
      "classification": "Core / Required",
      "rationale": "A risk-based Internal Audit assessment is required where material governance, control, data, regulatory, financial or LD1 risks warrant third-line assurance."
    },
    {
      "archetype": "Full Business Acquisition B (Buyer runs the business standalone)",
      "classification": "Core / Required",
      "rationale": "A risk-based Internal Audit assessment is required where material governance, control, data, regulatory, financial or LD1 risks warrant third-line assurance."
    },
    {
      "archetype": "Balance Sheet Sale",
      "classification": "Required but scaled",
      "rationale": "A risk-based Internal Audit assessment is required where material governance, control, data, regulatory, financial or LD1 risks warrant third-line assurance. Smaller deal perimeter may warrant scaled involvement."
    },
    {
      "archetype": "Partial Business Sale",
      "classification": "Core / Required",
      "rationale": "A risk-based Internal Audit assessment is required where material governance, control, data, regulatory, financial or LD1 risks warrant third-line assurance."
    },
    {
      "archetype": "Full Business Sale A (Buyer integrates the business)",
      "classification": "Core / Required",
      "rationale": "A risk-based Internal Audit assessment is required where material governance, control, data, regulatory, financial or LD1 risks warrant third-line assurance."
    },
    {
      "archetype": "Full Business Sale B (Buyer runs the business as standalone)",
      "classification": "Core / Required",
      "rationale": "A risk-based Internal Audit assessment is required where material governance, control, data, regulatory, financial or LD1 risks warrant third-line assurance."
    }
  ],
  "keyRole": "Provides independent, risk-based third-line assurance over whether programme governance, risk management, controls and readiness evidence are designed and operating effectively across the transaction. Internal Audit reports findings and residual risk through its independent governance route; it does not own programme delivery, remediation or the go-live decision.",
  "responsibilities": [
    "Engage early enough to assess the transaction risk profile, define a proportionate audit and assurance plan and allow management sufficient time to remediate findings before LD1.",
    "Maintain independence from programme delivery while obtaining access to governance forums, plans, status reporting, RAID logs, budgets, decisions, testing evidence and accountable executives.",
    "Assess whether programme governance, roles, decision rights, executive accountability, PMO disciplines, reporting and escalation routes are clear and operating effectively.",
    "Review whether material transaction risks and controls are identified, owned, monitored, accepted and escalated through an effective three-lines model.",
    "Perform risk-based deep dives across financial controls, regulatory delivery, technology, cyber, data migration, operations, customer outcomes, people, suppliers, TSA services and business readiness.",
    "Review cutover planning, rollback and contingency, go/no-go criteria, readiness attestations, evidence quality and residual risk presented to decision-makers.",
    "Issue findings in real time, agree accountable management actions and due dates, escalate overdue or material items and independently validate closure evidence.",
    "Provide a clear independent view of residual risk entering LD1 and complete post-go-live review, handover and lessons learned where within approved scope."
  ],
  "boundaryItems": [
    "The Central Hub and workstreams own governance and delivery controls; Internal Audit independently assesses them and does not design or operate remediation.",
    "Risk owns second-line risk oversight and acceptance processes; Internal Audit provides third-line assurance over the adequacy and effectiveness of risk management and controls.",
    "Independent Assurance / External Audit performs its commissioned external assurance scope; Internal Audit retains its own mandate, reporting line and professional judgement while coordinating coverage to reduce unnecessary duplication.",
    "E2E Testing and Data Migration own test and migration execution and evidence; Internal Audit assesses governance, coverage, control performance, exceptions and readiness conclusions.",
    "Accountable executives and programme governance make go/no-go and risk acceptance decisions; Internal Audit provides independent findings and a residual-risk view to inform those decisions."
  ],
  "centralHubRelationship": "Relationship with Central Hub: the Central Hub provides integrated programme information, evidence access and remediation coordination; Internal Audit independently sets and executes its approved scope, reports findings through audit governance and escalates material concerns without becoming part of programme management.",
  "regionalRelationship": [
    "Regional Spokes should own management responses, evidence production and remediation execution for in-country findings where they have the authority, capability and capacity.",
    "Function Authority and Group Internal Audit retain audit scoping, methodology, rating, reporting, closure validation and specialist review where regional audit maturity, independence, capability or capacity is insufficient.",
    "As regional maturity increases, local Internal Audit teams may perform delegated fieldwork and follow-up, while Group Internal Audit retains consolidated coverage, quality review and reporting for transaction-wide risks."
  ],
  "externalDependencies": "",
  "mandateRows": [
    {
      "id": "internal-audit-risk-assessment-and-scope",
      "area": "Internal Audit risk assessment and scope",
      "spokeAuthority": [
        "Sets the risk-based audit scope, timing, methodology, skills and reporting route while preserving independence."
      ],
      "hubRole": "Provides transaction context, integrated milestones, risk information and access to workstreams and evidence owners.",
      "regionalRole": "",
      "governance": "Chief Audit Executive or Internal Audit governance and relevant Audit Committee oversight.",
      "escalation": "Material risk, scope limitation, late engagement, missing skill or timetable compression undermines adequate coverage."
    },
    {
      "id": "finding-severity-and-reporting",
      "area": "Finding severity and reporting",
      "spokeAuthority": [
        "Determines finding, root-cause, rating, residual-risk and reporting conclusions using Internal Audit methodology."
      ],
      "hubRole": "Supports factual validation, identifies accountable management owners and integrates agreed actions into programme tracking.",
      "regionalRole": "",
      "governance": "Internal Audit leadership, accountable executives and Audit Committee or equivalent governance as applicable.",
      "escalation": "Management disputes a material finding, restricts reporting or does not accept an adequate action."
    },
    {
      "id": "remediation-and-closure-validation",
      "area": "Remediation and closure validation",
      "spokeAuthority": [
        "Independently evaluates whether management action and evidence adequately address the finding and decides audit closure status."
      ],
      "hubRole": "Tracks programme dependencies and due dates while management owners execute remediation.",
      "regionalRole": "",
      "governance": "Accountable executive, Internal Audit and programme governance for delivery impacts.",
      "escalation": "Critical action is late, ineffective, unsupported by evidence or remains open near a decision gate."
    },
    {
      "id": "ld1-residual-risk-view",
      "area": "LD1 residual-risk view",
      "spokeAuthority": [
        "Provides an independent view of material open findings, control effectiveness and residual risk entering LD1 without making the go-live decision."
      ],
      "hubRole": "Presents the view alongside integrated readiness evidence, exceptions and management risk acceptance.",
      "regionalRole": "",
      "governance": "Programme SteerCo, accountable executives, Risk governance and Audit Committee as applicable.",
      "escalation": "Readiness evidence is unreliable, critical findings remain open or residual risk is not transparently accepted."
    },
    {
      "id": "post-go-live-review-and-follow-up",
      "area": "Post-go-live review and follow-up",
      "spokeAuthority": [
        "Determines required post-go-live audit coverage, validates sustained remediation and reports unresolved or emerging control issues."
      ],
      "hubRole": "Provides hypercare information, incident trends and access to BAU owners and retained programme evidence.",
      "regionalRole": "",
      "governance": "Internal Audit plan governance, accountable BAU executives and Audit Committee as applicable.",
      "escalation": "Control breakdown, repeated incident, failed remediation or unclear BAU ownership creates ongoing exposure."
    }
  ],
  "capabilityRows": [
    {
      "category": "Specific Project Manager required?",
      "content": "NA - IA team will independently assess resourcing requirements. Central Hub may check and challenge where resourcing seems light compared to programme scale"
    },
    {
      "category": "Baseline capabilities",
      "content": "M&A programme assurance; Internal Audit methodology; governance, risk and control assessment; stakeholder challenge; root-cause analysis; issue rating; evidence evaluation; audit reporting; remediation follow-up; data analytics."
    },
    {
      "category": "Incremental capabilities by deal archetype / complexity",
      "content": "Technology and cyber audit; data migration assurance; E2E testing and cutover review; financial and regulatory controls; operational resilience; TSA and third-party controls; multi-country audit coordination."
    },
    {
      "category": "Specialist capabilities triggered by deal characteristics",
      "content": "Forensic review; model risk; prudential and conduct regulation; financial crime; tax; complex accounting; cloud and infrastructure; privacy; supplier resilience; customer remediation; local regulatory audit requirements."
    }
  ],
  "milestoneIntro": [
    "As deal archetypes scale from balance sheet to partial business to full business, each baseline activity should be assessed against the complexity factors laid out in the deal archetypes documentation, and assessed for whether its size or scope increases as a result of deal specifics.",
    "Service catalogue:"
  ],
  "serviceCatalogue": [
    "Transaction risk assessment and risk-based Internal Audit plan",
    "Programme governance, accountability, reporting, budget and RAID assurance",
    "Risk management, control design and control operating-effectiveness reviews",
    "Technology, cyber, data migration, testing and cutover deep dives",
    "Financial, regulatory, operational, customer, people and supplier control reviews",
    "Real-time findings, root-cause analysis and executive reporting",
    "Remediation tracking and independent closure validation",
    "LD1 residual-risk view, post-go-live review and lessons learned"
  ],
  "activitySets": [
    {
      "id": "balance-sheet-acquisition",
      "heading": "Balance Sheet Acquisition - baseline activities",
      "tab": "Balance Sheet Acquisition",
      "milestones": [
        {
          "name": "Internal Audit risk assessment and assurance plan approved (4 weeks)",
          "activities": [
            "Assess transaction materiality, complexity, regulatory exposure, control change, data movement and LD1 risk.",
            "Map first-, second- and third-line coverage, external assurance and known evidence sources to identify gaps and overlap.",
            "Agree scope, timing, skills, reporting route and independence safeguards through Internal Audit governance."
          ]
        },
        {
          "name": "Programme governance and risk management reviewed (4 weeks)",
          "activities": [
            "Assess roles, decision rights, executive accountability, PMO disciplines, budget control, status reporting and escalation.",
            "Review RAID quality, risk ownership, acceptance routes, dependencies and evidence supporting governance decisions.",
            "Issue findings early enough for management to correct fragmented accountability or weak programme controls."
          ]
        },
        {
          "name": "Critical control and readiness deep dives completed (8 weeks)",
          "activities": [
            "Select risk-based reviews across financial, regulatory, operational, technology, data, customer and supplier controls.",
            "Assess design, implementation, evidence quality and ownership of controls needed for completion and LD1.",
            "Report control gaps, root causes, impact and agreed remediation with accountable executives."
          ]
        },
        {
          "name": "LD1 residual-risk view and follow-up plan issued (4 weeks)",
          "activities": [
            "Review open findings, testing results, migration exceptions, cutover criteria and management risk acceptances.",
            "Provide an independent view of evidence quality, control effectiveness and residual risk entering LD1.",
            "Set post-go-live validation, closure and reporting requirements for unresolved or time-bound actions."
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
          "name": "Boundary and shared-control review completed (6 weeks)",
          "activities": [
            "Assess ownership and control boundaries across transferred, retained and shared services, systems, data and suppliers.",
            "Review TSA, interim process and manual control design for completeness, monitoring and exit accountability.",
            "Escalate gaps where shared dependencies create unclear ownership or unsupported risk acceptance."
          ]
        },
        {
          "name": "Data migration, testing and rehearsal assurance completed (8 weeks)",
          "activities": [
            "Review migration reconciliation, transformation controls, exceptions, test coverage, defect severity and evidence retention.",
            "Assess dress rehearsal scope, exclusions, recovery time and whether remediation is completed between rehearsals.",
            "Confirm material residual defects and migration exceptions are transparently reported and accepted."
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
          "name": "Integrated target operating model control review completed (8 weeks)",
          "activities": [
            "Assess whether end-state roles, control ownership, governance and process changes are defined and approved.",
            "Review the transition from temporary or duplicate controls into the integrated control environment.",
            "Challenge gaps between legal structure, operating model, systems, people and control accountability."
          ]
        },
        {
          "name": "Enterprise testing and cutover assurance completed (10 weeks)",
          "activities": [
            "Assess end-to-end test coverage, non-functional testing, defect management, environment readiness and evidence quality.",
            "Review cutover runbook, command structure, rollback, contingency, customer impact and cross-workstream dependencies.",
            "Report whether critical controls and readiness criteria are supported by reliable evidence before go/no-go."
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
          "name": "Standalone audit and coverage model approved (6 weeks)",
          "activities": [
            "Define material entities, processes, systems, data, suppliers, regulations and risks within the standalone perimeter.",
            "Map management controls, second-line oversight, external assurance and Internal Audit coverage required before and after LD1.",
            "Agree specialist resources, country audit participation and reporting through Group Internal Audit governance."
          ]
        },
        {
          "name": "Standalone governance and control framework reviewed (8 weeks)",
          "activities": [
            "Assess Board and executive governance, delegations, policies, risk appetite, accountability and management information.",
            "Review whether three-lines responsibilities and escalation routes are established and understood.",
            "Identify missing control owners, oversight forums or evidence needed for safe standalone operation."
          ]
        },
        {
          "name": "Technology, cyber and data controls reviewed (10 weeks)",
          "activities": [
            "Assess architecture, access, cyber, resilience, change, migration, reconciliation, records and privacy controls.",
            "Review test coverage, defects, dress rehearsals, cutover, rollback and service management readiness.",
            "Escalate weaknesses that could impair legal entity, customer or operational continuity at LD1."
          ]
        },
        {
          "name": "Financial, regulatory and operational controls reviewed (10 weeks)",
          "activities": [
            "Assess financial reporting, reconciliations, prudential, conduct, financial crime, customer and operational controls.",
            "Review supplier, facilities, people, business continuity and incident-management dependencies.",
            "Confirm material findings have owners, actions and governance visibility before go/no-go."
          ]
        },
        {
          "name": "Standalone LD1 assurance view issued (4 weeks)",
          "activities": [
            "Consolidate findings, evidence gaps, open actions, management responses and accepted residual risks.",
            "Challenge whether readiness attestations and completion criteria are supported by operating evidence.",
            "Report the independent view through Internal Audit and programme governance without taking the go-live decision."
          ]
        },
        {
          "name": "Post-go-live audit and remediation validation completed (10 weeks)",
          "activities": [
            "Review incidents, control performance, management information and temporary arrangements during stabilisation.",
            "Independently validate closure of high-risk findings and transfer of remaining actions to BAU.",
            "Issue final follow-up reporting and incorporate residual themes into the audit plan."
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
          "name": "Divestment risk assessment and audit plan approved (4 weeks)",
          "activities": [
            "Assess transfer, data, customer, regulatory, financial, buyer dependency and retained Absa risks.",
            "Map assurance coverage and identify areas where exit controls or residual obligations need third-line review.",
            "Agree scope, timing, skills and reporting so findings can be remediated before completion."
          ]
        },
        {
          "name": "Separation governance and retained-risk controls reviewed (5 weeks)",
          "activities": [
            "Assess perimeter governance, buyer dependency management, decision rights, reporting and escalation.",
            "Review controls over retained obligations, data disclosure, access, records, financial entries and completion evidence.",
            "Report unclear ownership, weak evidence or unmanaged residual exposure to accountable governance."
          ]
        },
        {
          "name": "Transfer accuracy and readiness evidence reviewed (8 weeks)",
          "activities": [
            "Test samples of transfer data, reconciliations, approvals, notices, controls and exception handling.",
            "Review cutover, buyer handover, contingency and customer or operational continuity evidence.",
            "Confirm material exceptions are remediated or transparently accepted before go/no-go."
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
          "name": "Carve-out boundary and TSA control review completed (6 weeks)",
          "activities": [
            "Assess transferred, retained and shared processes, systems, data, suppliers, people and control ownership.",
            "Review TSA governance, service levels, charging, access, incidents, monitoring, dispute and exit controls.",
            "Escalate unsupported manual controls, unclear accountability or unmonitored buyer dependencies."
          ]
        },
        {
          "name": "Data separation and buyer handover assurance completed (8 weeks)",
          "activities": [
            "Review data selection, extraction, reconciliation, privacy, records, access and exception controls.",
            "Assess buyer handover evidence, completeness, acceptance and restrictions protecting retained Absa information.",
            "Confirm material transfer defects and residual risks are reported and governed."
          ]
        },
        {
          "name": "Retained Absa control follow-up completed (6 weeks)",
          "activities": [
            "Validate controls protecting retained customers, systems, data, contracts, people and financial positions.",
            "Confirm management actions and TSA mitigations operate through hypercare and separation.",
            "Report closure status and residual Absa exposure through Internal Audit governance."
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
          "name": "Buyer integration dependency assurance completed (6 weeks)",
          "activities": [
            "Assess whether buyer milestones, evidence and dependencies are visible and linked to Absa exit obligations.",
            "Review governance for delays, scope changes, exceptions and joint decisions affecting service continuity.",
            "Escalate buyer dependency risk that is not adequately mitigated or contractually controlled."
          ]
        },
        {
          "name": "Absa exit, access and control closure reviewed (8 weeks)",
          "activities": [
            "Assess access removal, data and records transfer, financial reconciliation, contract exit and control decommissioning.",
            "Review TSA entry, retained services and temporary controls for ownership, monitoring and exit criteria.",
            "Confirm Absa does not retain unmanaged operational, regulatory or information risk after buyer integration."
          ]
        },
        {
          "name": "TSA exit and retained-obligation follow-up completed (8 weeks)",
          "activities": [
            "Validate closure of material findings, TSA exit actions and buyer or Absa remediation commitments.",
            "Review service incidents, disputes, control exceptions and residual obligations through transition.",
            "Report final exposure and outstanding BAU actions through Internal Audit governance."
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
          "name": "Standalone separation audit scope approved (6 weeks)",
          "activities": [
            "Define the full business perimeter, buyer dependencies, Absa retained obligations and critical control domains.",
            "Map assurance providers, country audit participation, specialist needs and evidence sources.",
            "Approve risk-based coverage and reporting through Group Internal Audit governance."
          ]
        },
        {
          "name": "Full separation of technology, data and access reviewed (10 weeks)",
          "activities": [
            "Assess data migration, reconciliation, cyber, access, records, infrastructure and resilience controls.",
            "Review testing, dress rehearsals, cutover, rollback and evidence supporting complete separation.",
            "Escalate defects or exclusions that create material buyer or residual Absa risk."
          ]
        },
        {
          "name": "Operational, financial and regulatory separation reviewed (10 weeks)",
          "activities": [
            "Assess customer, operations, finance, compliance, financial crime, supplier, people and facilities controls.",
            "Review completion conditions, TSA design, retained obligations and business continuity arrangements.",
            "Confirm material findings have adequate remediation, ownership and governance visibility."
          ]
        },
        {
          "name": "Standalone sale LD1 assurance view issued (4 weeks)",
          "activities": [
            "Consolidate open findings, evidence gaps, accepted risks and readiness dependencies across the sale.",
            "Challenge whether buyer and Absa attestations are supported by reliable evidence and operating controls.",
            "Report the independent residual-risk view without assuming the management go/no-go decision."
          ]
        }
      ]
    }
  ],
  "sizingFactors": "",
  "sizingDrivers": ["Large scale programme required to implement the deal which touches multiple parts of Absa", "Deal scope is wide enough that a failure could impact Absa’s broader ability to function", "Counterparty is reputationally difficult", "Previous Absa deals have had significant issues"],
  "partnerServices": [
    {
      "keyService": "Transaction risk assessment and risk-based Internal Audit plan",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Programme governance, accountability, reporting, budget and RAID assurance",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Risk management, control design and control operating-effectiveness reviews",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Technology, cyber, data migration, testing and cutover deep dives",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Financial, regulatory, operational, customer, people and supplier control reviews",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Real-time findings, root-cause analysis and executive reporting",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Remediation tracking and independent closure validation",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "LD1 residual-risk view, post-go-live review and lessons learned",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    }
  ]
};
