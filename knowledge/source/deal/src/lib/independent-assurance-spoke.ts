/**
 * Independent Assurance / External Audit SA Functional Spoke.
 *
 * All strings in this file are approved source content reproduced verbatim
 * from the Absa M&A Transaction Operating Model document. Do not summarise,
 * paraphrase or correct the wording.
 */

import type { SpokeContent } from "./spoke-content";

export const CONTENT: SpokeContent = {
  "id": "independent-assurance",
  "name": "Independent Assurance / External Audit",
  "reference": "",
  "necessityRows": [
    {
      "archetype": "Balance Sheet Acquisition",
      "classification": "Not typically a standalone workstream",
      "rationale": "Not typically required on smaller acquisitions with limited wider impact on the Absa business, unless specified by the regulator"
    },
    {
      "archetype": "Partial Business Acquisition",
      "classification": "Core / Required",
      "rationale": "Required because independent review of governance, controls, migration, and readiness is critical to a successful go-live across these archetypes"
    },
    {
      "archetype": "Full Business Acquisition A (Buyer integrates the business)",
      "classification": "Core / Required",
      "rationale": "Required because independent review of governance, controls, migration, and readiness is critical to a successful go-live across these archetypes"
    },
    {
      "archetype": "Full Business Acquisition B (Buyer runs the business standalone)",
      "classification": "Optional",
      "rationale": "Optional as limited integration work in this archetype does not necessitate standalone workstream, however significant work aligning governance models may benefit from independent oversight"
    },
    {
      "archetype": "Balance Sheet Sale",
      "classification": "Not typically a standalone workstream",
      "rationale": "Not typically required on smaller disposals with limited wider impact on Absa, unless specified by a regulator"
    },
    {
      "archetype": "Partial Business Sale",
      "classification": "Optional",
      "rationale": "Optional as the majority of integration work will sit with the buyer, so independent review is not as critical on the Absa side"
    },
    {
      "archetype": "Full Business Sale A (Buyer integrates the business)",
      "classification": "Core / Required",
      "rationale": "Required because independent review of governance, controls, migration, and readiness is critical to a successful go-live across these archetypes"
    },
    {
      "archetype": "Full Business Sale B (Buyer runs the business as standalone)",
      "classification": "Optional",
      "rationale": "Optional as limited integration work in this archetype does not necessitate standalone workstream, however significant work aligning governance models may benefit from independent oversight"
    }
  ],
  "keyRole": "External independent assurers provide objective assurance over whether programme governance, controls, migration, testing, cutover and readiness evidence are sufficient to support transaction decisions. They assess and report; they do not own delivery remediation or programme decision-making.",
  "responsibilities": [
    "Perform independent assessment of programme governance, decision quality, delivery controls, issue escalation and readiness evidence.",
    "Assess whether workstream plans, milestones, risks, dependencies, decisions and evidence are sufficient to support signing, completion, LD1 and post-LD1 decisions.",
    "Review control design and operating-readiness evidence across business, operations, technology, data, risk, compliance, finance, procurement and people activity.",
    "Assess migration design, source-to-target mapping, ETL controls, data completeness, data accuracy, reconciliations, exceptions and fallback arrangements.",
    "Assess test strategy, SIT, E2E testing, mock runs, dress rehearsals, defect triage, retesting, accepted workarounds and test-exit evidence.",
    "Assess cutover readiness, command-centre arrangements, contingency plans, hypercare entry criteria and BAU handover evidence.",
    "Assess specific high-risk readiness areas such as digital delivery, cards production and fulfilment, customer communications, regulatory evidence and TSA controls where applicable.",
    "Raise independent findings, recommendations, assurance opinions and residual concerns to the agreed programme governance forums.",
    "Validate remediation closure evidence for agreed findings without taking ownership of delivery remediation.",
    "Maintain an evidence trail that can support programme governance, Internal Audit, regulator-facing reviews and post-completion audit requirements."
  ],
  "boundaryItems": [
    "Delivery workstreams own execution, remediation and evidence production; external independent assurers assess the adequacy of that evidence and the credibility of readiness conclusions.",
    "The Central Hub owns programme governance, integrated planning, RAID tracking and evidence coordination; external independent assurers assess whether those controls are operating effectively.",
    "Risk owns the 2LOD risk judgement and risk appetite route; external independent assurers provide independent evidence-based assurance over risk-related programme controls and readiness evidence.",
    "Internal Audit provides 3LOD assurance where commissioned; external independent assurers provide the independent assurance procedures and opinions defined in their engagement scope."
  ],
  "centralHubRelationship": "Relationship with Central Hub: the Central Hub provides the integrated plan, governance materials, evidence owners, issue logs and access to workstreams; external independent assurers assess whether the programme evidence supports the required decisions and report findings through the agreed governance route.",
  "regionalRelationship": [
    "Regional Spokes should own local execution as a minimum, with ownership scaling based on maturity, including evidence collation, control-owner walkthroughs, local context, access facilitation and remediation evidence where they have capacity and delegated authority.",
    "Function Authority retains assurance scope, testing approach, independent assessment, findings, opinions and central escalation where regional maturity, evidence quality, capability or capacity is insufficient.",
    "As regional maturity increases, local teams should provide stronger self-evidencing and direct assurance responses, while Function Authority retains objective assessment, specialist challenge and independent reporting."
  ],
  "externalDependencies": "External or counterparty dependencies are managed through the Central Hub governance route where buyer, seller, country, regulator or third-party evidence is required for assurance procedures.",
  "mandateRows": [
    {
      "id": "programme-governance-and-decision-quality",
      "area": "Programme governance and decision quality",
      "spokeAuthority": [
        "Assess whether governance forums, packs, decisions, RAID management, dependency tracking and issue escalation are effective and evidence-based."
      ],
      "hubRole": "Provides governance materials, decision logs, RAID logs, plan data and access to programme forums.",
      "regionalRole": "",
      "governance": "Programme SteerCo, accountable executive, Central Hub, workstream leads and Internal Audit where relevant.",
      "escalation": "Decisions are made without evidence, SteerCos are cancelled or ineffective, or material issues are not escalated in time."
    },
    {
      "id": "controls-and-readiness-evidence",
      "area": "Controls and readiness evidence",
      "spokeAuthority": [
        "Assess whether control design, control ownership, operating-readiness evidence, risk acceptances and remediation closure support the readiness conclusion."
      ],
      "hubRole": "Coordinates evidence owners and tracks assurance findings through programme governance.",
      "regionalRole": "",
      "governance": "Risk, Compliance, Operations, Technology, Finance, Procurement, HR and relevant business owners.",
      "escalation": "Control evidence is incomplete, remediation is not evidenced, or ownership remains unclear at go/no-go."
    },
    {
      "id": "migration-and-data-assurance",
      "area": "Migration and data assurance",
      "spokeAuthority": [
        "Assess migration design, mapping, ETL controls, data completeness, accuracy, reconciliation, exceptions and fallback evidence."
      ],
      "hubRole": "Coordinates data evidence, defect ownership and dependency escalation.",
      "regionalRole": "",
      "governance": "Data Migration, Technology, Finance, Risk, Compliance and Data Governance.",
      "escalation": "No accountable owner can evidence comfort with data completeness or accuracy, or migration exceptions threaten LD1."
    },
    {
      "id": "testing-mock-runs-and-dress-rehearsals",
      "area": "Testing, mock runs and dress rehearsals",
      "spokeAuthority": [
        "Assess test strategy, scope coverage, SIT, E2E journeys, mock runs, dress rehearsals, defect triage, retesting and success criteria."
      ],
      "hubRole": "Coordinates test evidence and routes readiness implications into go/no-go governance.",
      "regionalRole": "",
      "governance": "E2E Testing, Technology, Operations, Data Migration, Risk and Client Readiness.",
      "escalation": "Success criteria are undefined, critical journeys are untested, defects lack accepted workarounds, or retest evidence is weak."
    },
    {
      "id": "cutover-ld1-readiness-and-hypercare",
      "area": "Cutover, LD1 readiness and hypercare",
      "spokeAuthority": [
        "Assess cutover runbooks, command-centre model, fallback, go/no-go pack, hypercare entry and BAU handover evidence."
      ],
      "hubRole": "Provides readiness pack, issue status, decisions and cross-workstream dependencies.",
      "regionalRole": "",
      "governance": "Client Readiness, accountable executive, workstream leads, Risk, Compliance and Internal Audit where relevant.",
      "escalation": "Readiness recommendation is unsupported, fallback is not viable, or residual findings are not assigned to owners."
    }
  ],
  "capabilityRows": [
    {
      "category": "Specific Project Manager required?",
      "content": "NA - to be defined and stood up by the external team"
    },
    {
      "category": "Baseline capabilities",
      "content": "Governance, decision-making, RAID controls, issue escalation, CP evidence and remediation closure assessment; large scale programme management; experience delivering M&A deals;"
    },
    {
      "category": "Incremental capabilities by deal archetype / complexity",
      "content": "Deep understanding of source-to-target mapping, ETL controls, data completeness, accuracy, reconciliations, exceptions and migration readiness; ability to build parallel migration solutions; executive migration readiness reporting"
    },
    {
      "category": "Specialist capabilities triggered by deal characteristics",
      "content": "Regulatory relations where engaged by regulator; technology, digital, cards, TSA, operational, financial, risk, compliance, people risk assessment ability"
    }
  ],
  "milestoneIntro": [
    "The key milestones below describe the assessment activity expected from external independent assurers, with additional assurance procedures required for more complex deal archetypes split out below as required.",
    "As deal archetypes scale from balance sheet to partial business to full business, assurance procedures should be assessed against the complexity factors laid out in the deal archetype documentation."
  ],
  "serviceCatalogue": [
    "Programme governance and decision-quality assessment",
    "Control design and readiness evidence assessment",
    "Migration design, ETL and reconciliation assurance",
    "Data completeness and accuracy assurance",
    "Testing, mock run and dress rehearsal assurance",
    "Cutover, contingency and LD1 readiness assessment",
    "Finding, recommendation and remediation closure validation",
    "Independent readiness opinion and evidence archive"
  ],
  "activitySets": [
    {
      "id": "balance-sheet-acquisition",
      "heading": "Balance Sheet Acquisition - baseline activities",
      "tab": "Balance Sheet Acquisition",
      "milestones": [
        {
          "name": "Assurance scope and evidence request confirmed (2 weeks)",
          "activities": [
            "Confirm the assurance procedures, workstreams, milestones, evidence standards, sample approach and reporting dates in the agreed engagement scope.",
            "Request programme governance packs, integrated plans, RAID logs, workstream plans, testing evidence, migration evidence and readiness criteria.",
            "Document any limitation on assurance coverage caused by missing evidence, confidentiality constraints or timing restrictions."
          ]
        },
        {
          "name": "Programme governance and control assessment completed (4 weeks)",
          "activities": [
            "Assess whether programme governance is operating with clear decisions, owners, due dates, issue escalation and dependency control.",
            "Review control design and readiness evidence for business, operations, technology, data, risk, compliance, finance and supplier impacts.",
            "Validate that findings and remediation actions are owned by delivery teams and tracked through governance."
          ]
        },
        {
          "name": "Testing and rehearsal assurance completed (4 weeks)",
          "activities": [
            "Assess test strategy, SIT, E2E scope, mock runs, dress rehearsals, defect severity, retesting and accepted workarounds.",
            "Validate whether success criteria were defined before test execution and whether outcomes were assessed against them.",
            "Review evidence for high-risk journeys such as digital channels, cards, customer servicing or operational hand-offs where in scope."
          ]
        },
        {
          "name": "Independent readiness opinion issued (2 weeks)",
          "activities": [
            "Provide assurance findings, residual concerns and independent readiness view for completion, LD1 go/no-go and hypercare entry.",
            "Validate remediation closure evidence for material findings without taking ownership of delivery remediation.",
            "Archive assurance evidence, findings, management responses and closure decisions for audit and regulator use."
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
          "name": "Partial perimeter and retained dependency assurance completed (4 weeks)",
          "activities": [
            "Assess whether transferring, retained, shared and excluded processes are clearly defined and evidenced.",
            "Review TSA controls, retained Absa dependencies, local control ownership and buyer or seller hand-offs.",
            "Raise findings where boundary ownership or evidence quality is unclear."
          ]
        },
        {
          "name": "Local and shared-service evidence assessed (4 weeks)",
          "activities": [
            "Sample country evidence, local walkthroughs, local control operation and retained-service evidence where relevant.",
            "Assess whether local evidence supports central readiness conclusions and regulatory commitments.",
            "Document gaps where country, central or counterparty evidence is inconsistent."
          ]
        },
        {
          "name": "Migration and data assurance completed (4 weeks)",
          "activities": [
            "Assess source-to-target mapping, ETL controls, migration runbooks, reconciliation thresholds, exception handling and audit trail.",
            "Review evidence for data completeness, data accuracy, control totals, rejected records and downstream usability.",
            "Raise findings where migration evidence cannot support go/no-go or regulator-facing conclusions."
          ]
        },
        {
          "name": "Partial acquisition readiness opinion issued (2 weeks)",
          "activities": [
            "Report assurance findings across migration, controls, testing, shared services and retained dependencies.",
            "Validate closure evidence for priority findings before LD1 or agreed governance gates.",
            "Confirm residual findings have accountable Absa, seller or buyer owners."
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
          "name": "Integrated governance and control assurance completed (4 weeks)",
          "activities": [
            "Assess whether integrated workstream governance, decision quality, issue escalation and control ownership support the go-live decision.",
            "Review integrated controls across operations, technology, data, risk, compliance, finance, procurement and HR.",
            "Validate that readiness evidence is consistent across workstream sign-offs and assurance findings."
          ]
        },
        {
          "name": "Integrated migration, testing and operational assurance completed (4 weeks)",
          "activities": [
            "Assess data migration, reconciliation, E2E journeys, mock runs, dress rehearsals and operational readiness evidence for the integrated business.",
            "Review digital, cards, customer, colleague and service-transition evidence where those journeys affect LD1.",
            "Raise findings where defects, workarounds or residual risks are not supported by evidence."
          ]
        },
        {
          "name": "Integrated LD1 assurance view issued (2 weeks)",
          "activities": [
            "Provide an independent view of whether the integrated business is ready for LD1 and hypercare entry.",
            "Identify conditions, residual findings and evidence gaps that should be visible in go/no-go governance.",
            "Validate closure or owner assignment for findings that remain open after LD1."
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
          "name": "Standalone assurance approach executed (4 weeks)",
          "activities": [
            "Assess standalone governance, committees, policies, controls, workstream ownership, local operations and evidence standards.",
            "Review whether the standalone business can operate required processes without programme or seller support from LD1.",
            "Document evidence gaps affecting board, exco, regulator or LD1 decisions."
          ]
        },
        {
          "name": "Standalone systems, data and operating controls assessed (4 weeks)",
          "activities": [
            "Assess standalone technology, data, reporting, access, supplier, HR, finance, risk and compliance controls.",
            "Review migration and testing evidence across all data domains and operating processes required for standalone launch.",
            "Validate contingency, command-centre and hypercare arrangements for standalone operation."
          ]
        },
        {
          "name": "Regulator-facing and LD1 assurance opinion issued (2 weeks)",
          "activities": [
            "Provide independent findings and readiness view for regulator-facing evidence, completion and LD1 go/no-go.",
            "Validate management responses and remediation closure for material findings.",
            "Archive assurance workpapers, conclusions and evidence for future audit or regulatory review."
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
          "name": "Sale perimeter and retained Absa evidence assessed (4 weeks)",
          "activities": [
            "Assess transferred data, retained data, retained controls, completion-condition evidence and buyer hand-off controls.",
            "Review whether Absa can evidence accurate and complete data provision to the buyer.",
            "Assess whether retained Absa obligations and risks have named owners and monitoring arrangements."
          ]
        },
        {
          "name": "Buyer hand-off and separation testing assessed (4 weeks)",
          "activities": [
            "Review buyer-facing data cuts, joint testing, transfer controls, defect handling and separation rehearsals.",
            "Assess Absa-side access removal, retained service continuity and control operation after transfer.",
            "Raise findings where buyer dependencies create unresolved Absa readiness or residual-risk issues."
          ]
        },
        {
          "name": "Sale readiness assurance opinion issued (2 weeks)",
          "activities": [
            "Provide independent findings for completion, LD1, TSA entry and post-LD1 support decisions.",
            "Validate closure evidence for material findings before governance decisions.",
            "Archive evidence for post-completion review, audit and dispute support."
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
          "name": "Carve-out and shared-service assurance completed (4 weeks)",
          "activities": [
            "Assess shared services, TSA controls, retained Absa controls, buyer dependencies and local execution evidence.",
            "Review access, data, supplier, employee, operations and reporting controls across the carved-out perimeter.",
            "Document findings where shared ownership or evidence boundaries are unclear."
          ]
        },
        {
          "name": "TSA control and exit evidence assessed (4 weeks)",
          "activities": [
            "Assess TSA service levels, reporting, issue escalation, control evidence, exit criteria and buyer readiness evidence.",
            "Review whether TSA defects could extend Absa obligations or residual risk.",
            "Validate closure evidence for findings linked to TSA entry or exit."
          ]
        },
        {
          "name": "Partial sale assurance view issued (2 weeks)",
          "activities": [
            "Provide assurance findings across retained business, transferred perimeter, TSA services and local country activity.",
            "Identify readiness conditions and evidence gaps for LD1 and TSA governance.",
            "Confirm residual findings have buyer, Absa BAU or TSA owners."
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
          "name": "Buyer integration dependency assurance completed (4 weeks)",
          "activities": [
            "Assess Absa evidence that supports buyer integration while protecting retained Absa controls, data and confidentiality.",
            "Review buyer integration dependencies that affect Absa TSA services, exit controls or residual obligations.",
            "Raise findings where buyer readiness evidence is insufficient for Absa to reduce support safely."
          ]
        },
        {
          "name": "Absa exit control assurance completed (4 weeks)",
          "activities": [
            "Assess access removal, interface changes, retained-system controls, data separation, supplier exits and post-LD1 support evidence.",
            "Review assurance evidence over retained customer, operational, regulatory and financial controls.",
            "Validate remediation closure for findings that affect Absa retained obligations."
          ]
        },
        {
          "name": "Post-LD1 assurance handover completed (2 weeks)",
          "activities": [
            "Provide findings and residual concerns into TSA, BAU or post-completion obligation governance.",
            "Confirm open findings have accountable buyer, Absa BAU or legal obligation owners.",
            "Archive assurance evidence for audit, regulator and dispute support."
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
          "name": "Buyer standalone readiness evidence assessed (4 weeks)",
          "activities": [
            "Assess buyer standalone evidence where Absa remains exposed until service exit or obligation closure.",
            "Review standalone controls, systems, data, suppliers, operations, people, governance and regulator evidence where in scope.",
            "Document limitations where buyer evidence cannot be independently validated by Absa's assurer."
          ]
        },
        {
          "name": "Full separation and Absa wind-down assurance completed (4 weeks)",
          "activities": [
            "Assess Absa exit controls, transferred data, residual records, access removal, contract closure and TSA exit evidence.",
            "Review findings that could delay regulatory approval, TSA exit or Absa obligation closure.",
            "Validate management responses and closure evidence for material separation findings."
          ]
        },
        {
          "name": "Final assurance close-out issued (2 weeks)",
          "activities": [
            "Issue final assurance findings, residual concerns, closure status and evidence archive for governance.",
            "Confirm all residual findings have buyer, Absa BAU or post-completion obligation owners.",
            "Close assurance activity once evidence, conclusions and management responses are complete."
          ]
        }
      ]
    }
  ],
  "sizingFactors": "",
  "sizingDrivers": ["Data migration scope spans a broad range of products", "Data in scope for transfer is complex", "Significant number of source or target systems exist", "Data in scope for transfer contains a large number of records", "Buyer or seller Data Migration Team lacks experience", "Governance structures within the deal span broad range of the business", "Impacted processes are business-critical"],
  "partnerServices": [
    {
      "keyService": "Programme governance and decision-quality assessment",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Control design and readiness evidence assessment",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Migration design, ETL and reconciliation assurance",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Data completeness and accuracy assurance",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Testing, mock run and dress rehearsal assurance",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Cutover, contingency and LD1 readiness assessment",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Finding, recommendation and remediation closure validation",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Independent readiness opinion and evidence archive",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    }
  ]
};
