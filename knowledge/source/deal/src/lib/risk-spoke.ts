/**
 * Risk SA Functional Spoke.
 *
 * All strings in this file are approved source content reproduced verbatim
 * from the Absa M&A Transaction Operating Model document. Do not summarise,
 * paraphrase or correct the wording.
 */

import type { SpokeContent } from "./spoke-content";

export const CONTENT: SpokeContent = {
  "id": "risk",
  "name": "Risk",
  "reference": "",
  "necessityRows": [
    {
      "archetype": "Balance Sheet Acquisition",
      "classification": "Core / Required",
      "rationale": "Required to confirm risk appetite, controls, residual risk and readiness evidence for the acquired portfolio for all archetypes"
    },
    {
      "archetype": "Partial Business Acquisition",
      "classification": "Core / Required",
      "rationale": "Required to confirm risk appetite, controls, residual risk and readiness evidence for the acquired portfolio for all archetypes"
    },
    {
      "archetype": "Full Business Acquisition A (Buyer integrates the business)",
      "classification": "Core / Required",
      "rationale": "Required to confirm risk appetite, controls, residual risk and readiness evidence for the acquired portfolio for all archetypes"
    },
    {
      "archetype": "Full Business Acquisition B (Buyer runs the business standalone)",
      "classification": "Core / Required",
      "rationale": "Required to confirm risk appetite, controls, residual risk and readiness evidence for the acquired portfolio for all archetypes"
    },
    {
      "archetype": "Balance Sheet Sale",
      "classification": "Core / Required",
      "rationale": "Required to assess retained Absa exposure, transfer controls, buyer dependencies and residual risk for all sale archetypes"
    },
    {
      "archetype": "Partial Business Sale",
      "classification": "Core / Required",
      "rationale": "Required to assess retained Absa exposure, transfer controls, buyer dependencies and residual risk for all sale archetypes"
    },
    {
      "archetype": "Full Business Sale A (Buyer integrates the business)",
      "classification": "Core / Required",
      "rationale": "Required to assess retained Absa exposure, transfer controls, buyer dependencies and residual risk for all sale archetypes"
    },
    {
      "archetype": "Full Business Sale B (Buyer runs the business as standalone)",
      "classification": "Core / Required",
      "rationale": "Required to assess retained Absa exposure, transfer controls, buyer dependencies and residual risk for all sale archetypes"
    }
  ],
  "keyRole": "Owns independent 2LOD risk oversight, risk appetite challenge and programme risk assurance, while business and functional owners remain accountable for 1LOD execution and control operation.",
  "responsibilities": [
    "Confirm the 1LOD / 2LOD accountability model at mobilisation: business owns execution and controls; Risk owns independent oversight, challenge and escalation.",
    "Define the role of in-country risk for country-based activity, including 2LOD oversight, local evidence, local governance input and support to central Risk.",
    "Assess risk appetite for the deal, portfolio, product, client, country, sector and transaction route, and present material risk appetite items to board or exco where required.",
    "Establish risk governance, principal risk type coverage, committee routes, evidence standards, risk acceptance process and escalation thresholds.",
    "Challenge due diligence, control mapping, credit exposure analysis, data completeness, data accuracy, remediation actions and readiness evidence from 1LOD teams.",
    "Coordinate risk input to assurance planning, including early scoping of Internal Audit, PwC, Deloitte, KPMG or other external assurers",
    "Maintain independent risk views for signing, CP fulfilment, regulatory submissions, completion, LD1 go/no-go, hypercare and BAU transition."
  ],
  "boundaryItems": [
    "1LOD business, functional and in-country owners own control design, remediation and local execution; Risk reviews, challenges, approves or escalates the residual risk position.",
    "Compliance owns compliance interpretation and regulatory-condition tracking; Legal & CorpDev owns legal drafting and CP tracking; Risk owns the independent risk judgement and risk appetite route.",
    "Independent Assurance and 3LOD Internal Audit provide assurance opinions; Risk should coordinate the overall assurance plan",
    "Data Migration owns migration execution and reconciliation; Risk challenges whether the programme can evidence data completeness, accuracy and control operation.",
    "E2E Testing and Client readiness own test execution and go-live orchestration; Risk challenges success criteria, evidence sufficiency and residual risk acceptability."
  ],
  "centralHubRelationship": "Relationship with Central Hub: Risk owns independent risk decisions, risk acceptances, appetite positions and readiness evidence while the Central Hub coordinates governance, issue tracking, integrated reporting and counterparty PMO escalation.",
  "regionalRelationship": [
    "Regional Spokes should own local execution as a minimum, with ownership scaling based on maturity, including local 2LOD evidence, local governance input, control-owner challenge, MI and risk issue escalation where they have capacity and delegated authority.",
    "Function Authority retains risk appetite, group risk standards, material risk acceptances, independent challenge, assurance coordination and execution ownership where regional maturity, capability or capacity is insufficient.",
    "As regional maturity increases, local ownership should expand from evidence provision into local oversight, local committee input, readiness challenge and remediation tracking, with Function Authority retaining group standards, specialist challenge and reserved approvals."
  ],
  "externalDependencies": "External or counterparty dependencies are managed through the Central Hub governance route where data, buyer readiness, regulator communication, external assurance, audit timing or risk evidence affects signing, completion or LD1.",
  "mandateRows": [
    {
      "id": "1lod-2lod-accountability-and-risk-governance",
      "area": "1LOD / 2LOD accountability and risk governance",
      "spokeAuthority": [
        "Defines risk governance, risk acceptance route, principal risk type coverage and the 2LOD challenge model."
      ],
      "hubRole": "Embeds risk cadence into programme governance and tracks actions to closure.",
      "regionalRole": "",
      "governance": "Risk governance, accountable executive, programme SteerCo, board or exco where appetite requires.",
      "escalation": "Ownership between business, country Risk and central Risk is unclear or risk items are bypassing governance."
    },
    {
      "id": "risk-appetite",
      "area": "Risk appetite",
      "spokeAuthority": [
        "Approves or escalates risk appetite, policy exceptions, waivers and residual risk positions."
      ],
      "hubRole": "Maintains plan visibility and tests timing against signing, CP and LD1 milestones.",
      "regionalRole": "",
      "governance": "Enterprise Risk, principal risk type owners, board or exco where required.",
      "escalation": "Risk appetite is outside tolerance, data is incomplete, board/exco evidence is not ready or business case risk changes."
    },
    {
      "id": "external-assurance-scope-and-sequencing",
      "area": "External assurance scope and sequencing",
      "spokeAuthority": [
        "Owns the risk view of assurance requirements and coordinates the appointment and sequencing conversation with IA, Compliance and external assurers."
      ],
      "hubRole": "Maintains the integrated assurance calendar, evidence dependencies and escalation route. Inputs into assurance requirements based on SME knowledge",
      "regionalRole": "",
      "governance": "Risk, Independent Assurance, Internal Audit, Compliance, Legal, Procurement where third-party assurance is relevant.",
      "escalation": "regulator-appointed assurance scope overlaps, arrives late"
    },
    {
      "id": "readiness-evidence-and-go-no-go-view",
      "area": "Readiness evidence and go/no-go view",
      "spokeAuthority": [
        "Provides the independent risk opinion on mock runs, dress rehearsals, data completeness, digital readiness, cards readiness, controls and residual risk."
      ],
      "hubRole": "Coordinates readiness pack, decision forum and open issue escalation.",
      "regionalRole": "",
      "governance": "Client Readiness, E2E Testing, Data Migration, Operations, Technology, Compliance and programme SteerCo.",
      "escalation": "Success criteria are undefined, data comfort is not evidenced, or digital/cards readiness creates unmanaged LD1 risk."
    },
    {
      "id": "risk-issue-escalation-and-post-ld1-monitoring",
      "area": "Risk issue escalation and post-LD1 monitoring",
      "spokeAuthority": [
        "Escalates material risks, monitors accepted risks and validates closure through cutover, hypercare and BAU transition."
      ],
      "hubRole": "Tracks action owners, reporting cadence and accountable executive intervention.",
      "regionalRole": "",
      "governance": "Risk committees, accountable executive, programme SteerCo, board/exco as needed.",
      "escalation": "SteerCos are cancelled, PMO issues are not front-run, residual risk rises, or risk acceptance pressure increases without evidence."
    }
  ],
  "capabilityRows": [
    {
      "category": "Specific Project Manager required?",
      "content": "Unlikely - simple balance sheet transactions can be coordinated through the Risk lead, and 2LOD risk oversight does not require significant technical coordination. Dedicated programme Risk coordinator or PM could be added as deal complexity increases, governance timelines tighten"
    },
    {
      "category": "Baseline capabilities",
      "content": "2LOD independent challenge; enterprise risk governance; risk appetite assessment; credit risk assessment; risk acceptance drafting; controls mapping; policy and process gap analysis; data-control review; readiness and go/no-go assurance."
    },
    {
      "category": "Incremental capabilities by deal archetype / complexity",
      "content": "Principal risk type triage; acquired or sold policy mapping; local 1LOD execution assurance; integration, separation and standalone risk assessment; culture and maturity review; key-person dependency challenge; TSA and retained-service risk assessment."
    },
    {
      "category": "Specialist capabilities triggered by deal characteristics",
      "content": "Banking credit risk, insurance risk, operational resilience, conduct risk, regulatory risk, financial crime risk, cyber and technology risk, model risk, market and liquidity risk, reputational risk and country risk input where relevant."
    }
  ],
  "milestoneIntro": [
    "The key milestones below are organised as a baseline set, with additional milestones required for more complex deal archetypes split out below as required.",
    "As deal archetypes scale from balance sheet to partial business to full business, each baseline activity should be assessed against the complexity factors laid out in the deal archetypes documentation, and assessed for whether its size or scope increases as a result of deal specifics.",
    "Service catalogue:"
  ],
  "serviceCatalogue": [
    "Risk appetite assessment and monitoring",
    "Controls mapping and remediation",
    "Programme risk assurance",
    "Risk governance set-up and execution",
    "Credit risk assessment and decisioning",
    "Principal risk type SME coordination",
    "Policy, process and data-control waiver management",
    "Risk readiness and go/no-go opinion"
  ],
  "activitySets": [
    {
      "id": "balance-sheet-acquisition",
      "heading": "Balance Sheet Acquisition - baseline activities",
      "tab": "Balance Sheet Acquisition",
      "milestones": [
        {
          "name": "Risk appetite and due diligence assessment completed (4 weeks)",
          "activities": [
            "Confirm initial risk appetite fit for the portfolio, product, client, country, sector and transaction structure",
            "Request due diligence inputs covering risk policies, control issues and incidents",
            "Assess integration risk into the Absa environment, including risk policies, credit standards, data controls, processes, delegations and required waivers."
          ]
        },
        {
          "name": "Risk governance and rules of engagement established (3 weeks)",
          "activities": [
            "Mobilise the Risk workstream with a named 2LOD lead, Enterprise Risk contact and principal risk type specialists as required",
            "Define the risk accountability map, governance cadence, committee route and rules of engagement based on counterparty size, deal complexity and transaction perimeter.",
            "Set evidence standards, committee lead times and escalation thresholds early so governance timelines are not underestimated"
          ]
        },
        {
          "name": "Principal risk type and control assessment completed (5 weeks)",
          "activities": [
            "Identify the principal risk types triggered by the transaction and engage relevant specialists early enough for formal review",
            "Assess operational resilience, conduct, regulatory, financial crime, cyber, model, reputation, market and liquidity risks where the perimeter or product set requires it",
            "Complete a culture and maturity risk assessment, including key-person dependency and operational capability risks that could affect readiness",
            "Challenge business 1LOD workstream plans for governance requirements, data controls, control evidence, remediation actions and policy or process exceptions"
          ]
        },
        {
          "name": "Risk approvals and programme assurance kicked off (3 weeks)",
          "activities": [
            "Draft risk acceptances and waivers with clear owners, mitigations, expiry dates, monitoring requirements and escalation thresholds",
            "Secure delegated Enterprise Risk approvals in time for signing, completion and LD1",
            "Validate Central Hub SteerCo risk reporting and challenge understated severity, governance timing or readiness implications",
            "Provide the Risk readiness view for testing exit, completion, LD1 go/no-go and BAU transition evidence packs.",
            "Monitor residual risk through cutover and hypercare, with explicit control over late-stage pressure to accept risk without evidence"
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
          "name": "Partial risk perimeter and dependencies confirmed (3 weeks)",
          "activities": [
            "Define the split between transferring and retained risk perimeter across clients, products, controls, policies, systems, services and people.",
            "Assess TSA, shared-service, Group Interchange and retained-service risks created by dependencies between Absa, the seller and the acquired business",
            "Confirm residual risk owners for retained dependencies, Absa interim controls and post-LD1 actions."
          ]
        },
        {
          "name": "Policy, process and control gaps mapped (4 weeks)",
          "activities": [
            "Map acquired policies, procedures, delegations and control standards against Absa requirements.",
            "Ensure business has Reviewed 1LOD data-control, access, record-keeping and reporting arrangements for the partial perimeter and any retained seller dependency",
            "Set approval routes for policy gaps, process waivers, control weaknesses and interim operating model exceptions."
          ]
        },
        {
          "name": "Regional and business 1LOD execution model agreed (3 weeks)",
          "activities": [
            "Confirm which activities must be executed by in-country teams because local regulation, data access or control ownership requires local execution.",
            "Establish a risk issue cadence with the Central Hub, and businesss 1LOD owners for unresolved partial-integration risks",
            "Confirm KYC / AML, Compliance and credit-control hand-offs for clients, products, records and unresolved cases."
          ]
        },
        {
          "name": "People, conduct and change risks challenged (3 weeks)",
          "activities": [
            "Assess culture, maturity, ways of working and key-person dependency risks with HR and Change Management for the transferring population",
            "Challenge customer, conduct, reputational and communications risks where rumours, regulator activity or stakeholder disclosure could affect the market"
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
          "name": "Integrated risk and control framework approved (5 weeks)",
          "activities": [
            "Expand principal risk type coverage for the integrated business, including insurance risk where the perimeter includes insurance activity or products",
            "Approve the integrated risk and control framework that will apply after migration into Absa policies, processes, committees and reporting.",
            "Review readiness of each business 1LOD workstream against agreed risk controls, policy requirements and remediation commitments."
          ]
        },
        {
          "name": "External assurance requirements mapped (3 weeks)",
          "activities": [
            "Based on programme requirements and regulator stipulations, map required external assurance partners",
            "Engage external assurance partners early to provide consistent advice to programme",
            "Define key focus areas for external assurance, as well as measures of success and links into risk and programme governance"
          ]
        },
        {
          "name": "Portfolio risk migration controls agreed (5 weeks)",
          "activities": [
            "Map credit policies, rating approaches, delegated authorities, limits, collateral processes, arrears handling and impairment routines into the Absa model",
            "Define migrated portfolio monitoring, risk MI, committee reporting and escalation thresholds for the integrated business.",
            "Approve or escalate the plan for deferred remediation, temporary controls and post-LD1 waiver closure."
          ]
        },
        {
          "name": "Cutover and integration risk tested (4 weeks)",
          "activities": [
            "Challenge technology, data migration and operational workstream plans for control design, data quality, resilience, fallback and evidence sufficiency",
            "Assess culture, maturity, management capability and key-person retention risks that could affect the integrated control environment",
            "Conduct cutover and rehearsal risk reviews that test controls, accountabilities, fallback routes and issue escalation."
          ]
        },
        {
          "name": "BAU risk governance and hypercare established (3 weeks)",
          "activities": [
            "Align enterprise risk MI, committee cadence, issue escalation and risk ownership with BAU Absa governance.",
            "Recommend the Risk go/no-go position for integration completion based on evidence, residual risk and committee approvals.",
            "Monitor post-LD1 risk remediation, control stability, culture adoption and first risk reporting cycles until BAU ownership is stable."
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
          "name": "Standalone risk operating model established (5 weeks)",
          "activities": [
            "Establish the standalone Risk oversight model under Absa ownership, including accountabilities, committees, delegated authorities and escalation routes",
            "Appoint the standalone Risk lead, Enterprise Risk lead and principal risk type specialists required for the business profile.",
            "Confirm whether local regulation or greenfield operations require a full in-country risk and control team to be hired, retained or stood up before LD1."
          ]
        },
        {
          "name": "Enterprise risk and culture assessment completed (5 weeks)",
          "activities": [
            "Assess target governance maturity, risk culture, risk appetite framework, policy framework, committee effectiveness and evidence standards.",
            "Complete an enterprise risk assessment covering strategy, conduct, operations, resilience, cyber, financial crime, model, insurance, market, liquidity, reputational and country risks as relevant",
            "Coordinate compliance, legal, customer, regulator, reputation and market-disclosure risks where rumours or regulator communication could create transaction risk"
          ]
        },
        {
          "name": "Policy control model ready (4 weeks)",
          "activities": [
            "Determine which risk policies and processes can remain local and which require Absa group overlay, waiver, remediation or approval",
            "Define all risk acceptances, waivers with owners, due dates, monitoring evidence and committee approval route."
          ]
        },
        {
          "name": "Standalone reporting and resilience controls tested (4 weeks)",
          "activities": [
            "Define control, reporting, access arrangements between the standalone business, Absa group oversight and retained services",
            "Set risk MI, risk appetite monitoring, escalation, issue and reporting for LD1",
            "Assess OpRes, business continuity, cyber, outsourcing and third-party controls supporting standalone state"
          ]
        },
        {
          "name": "Standalone LD1 readiness and hypercare governed (4 weeks)",
          "activities": [
            "Secure Enterprise Risk and relevant principal risk type committee approvals before completion and LD1",
            "Provide a standalone LD1 risk readiness opinion covering governance, people, controls, reporting and residual risk",
            "Monitor reporting cycle, hypercare issues, risk acceptances and BAU handover"
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
          "name": "Divestment risk governance and appetite view established (3 weeks)",
          "activities": [
            "Mobilise Risk workstream with a named 2LOD lead, Enterprise Risk contact and required risk specialists",
            "Define the divestment risk accountability map, governance cadence, committee route and rules of engagement based on buyer profile, counterparty size, sale perimeter",
            "Confirm risk appetite implications for the transferred portfolio and the retained Absa business"
          ]
        },
        {
          "name": "Buyer readiness and Absa residual risk assessed (4 weeks)",
          "activities": [
            "Assess buyer or counterparty readiness from a risk, control, credit, operational resilience and conduct perspective using evidence agreed through the Central Hub.",
            "Identify Absa residual risk across customer outcomes, complaints, regulatory exposure, reputation, data access, records, controls and retained services.",
            "Validate the Central Hub go/no-go risk pack and challenge understated timing, evidence or residual risk implications."
          ]
        },
        {
          "name": "Data, control handover and retained services risk defined (5 weeks)",
          "activities": [
            "Review clean-room, data-sharing, record transfer and control-handover arrangements with Compliance, KYC / AML, Data Migration and Legal & CorpDev",
            "Challenge 1LOD separation plans for continuity, controls, remediation actions and policy exceptions",
            "Define TSA, retained-service and Group Interchange risk controls, including monitoring, issue escalation, exit criteria and residual ownership",
            "Confirm which divestment activities must be executed in country because regulation, data access or local control ownership requires local delivery."
          ]
        },
        {
          "name": "Residual risk approvals and hypercare monitoring maintained (3 weeks)",
          "activities": [
            "Draft residual risk acceptances and waivers with clear Absa owners, mitigations, expiry dates and monitoring requirements.",
            "Monitor transferred portfolio issues, buyer questions, retained obligations and Absa residual risk through cutover, hypercare and BAU close-out",
            "Escalate any late-stage acceptance pressure where evidence, owner or mitigation is incomplete."
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
          "name": "Retained and transferred risk ownership separated (3 weeks)",
          "activities": [
            "Separate retained and transferred risk ownership across clients, products, policies, controls, systems, records, services and people",
            "Assess dependencies between retained Absa operations and the divested perimeter, including shared controls, shared services and unresolved incident ownership",
            "Define risk ownership for shared clients, shared products, historical records, complaints, incidents, litigation support and regulatory commitments."
          ]
        },
        {
          "name": "In-country and buyer standalone capability assessed (4 weeks)",
          "activities": [
            "Confirm that the in-country team, buyer team or transitional model can facilitate the standalone business where local execution is needed",
            "Validate buyer or separated 1LOD control evidence before Absa accepts residual risk",
            "Confirm retained-business risk MI, monitoring, reporting and issue escalation after LD1"
          ]
        },
        {
          "name": "TSA and retained-service risk boundaries agreed (4 weeks)",
          "activities": [
            "Map TSA, Group Interchange and retained-service risk boundaries, including monitoring, escalation routes and exit criteria",
            "Track policy waivers, process exceptions and deferred remediation through enterprise risk committees where residual risk remains with Absa",
            "Route material separation risks to enterprise risk governance before they impact completion or TSA exit"
          ]
        },
        {
          "name": "People, reputation and BAU handover risks controlled (3 weeks)",
          "activities": [
            "Review reputational, communications and rumour-management risks with Communications, Compliance and the Central Hub",
            "Assess key-person loss, capability gaps and operational people risk",
            "Prepare BAU handover of retained risks, risk acceptances, evidence packs, lessons learned"
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
          "name": "Buyer integration risk hand-off controlled (4 weeks)",
          "activities": [
            "Provide agreed risk information, policy extracts, control evidence and credit portfolio data within approved limits / controls as per SPA/BSA",
            "Challenge the buyer integration hand-off plan for continuity, conduct, controls, complaints, regulatory commitments and customer outcomes",
            "Validate that buyer integration activity does not create unresolved Absa operational, reputational, regulatory or customer risk."
          ]
        },
        {
          "name": "Transferred credit evidence and residual obligations confirmed (5 weeks)",
          "activities": [
            "Confirm transferred credit files, collateral records, open risk issues, waivers, impairments and exclusion decisions are complete or clearly retained.",
            "Review Absa residual obligations for TSA services, data access, complaints, historical records, incidents, regulatory queries and litigation support.",
            "Secure Absa risk committee approval for residual risks, retained obligations and any deferred actions before completion."
          ]
        },
        {
          "name": "Late-stage acceptance pressure controlled (5 weeks)",
          "activities": [
            "Control late-stage risk acceptance pressure by requiring evidence-based decisions, named owners and agreed expiry dates.",
            "Monitor transition risks, risk acceptances, buyer dependencies and TSA exit conditions through integration hypercare.",
            "Capture risk lessons learned, policy mapping outputs, approval routes and evidence templates for reuse on future divestments."
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
          "name": "Standalone divestment risk governance established (3 weeks)",
          "activities": [
            "Establish the standalone risk governance model, including buyer, Absa and in-country 1LOD and 2LOD accountabilities",
            "Identify the target standalone risk function, committees, delegated authorities, policies, risk appetite, MI and reporting capability required for LD1.",
            "Define Absa, buyer responsibilities for policy waivers, controls, incidents and risk reporting"
          ]
        },
        {
          "name": "Buyer and in-country capability assessed (4 weeks)",
          "activities": [
            "Assess buyer ability to operate standalone business from a risk, control, credit, conduct and resilience perspective",
            "Assess culture, maturity, management capability, key-person dependency and people-risk in standalone business",
            "Confirm OpRes, cyber, outsourcing, business continuity and third-party risk controls supporting the standalone business"
          ]
        },
        {
          "name": "Portfolio, policy, data and records transfer controlled (4 weeks)",
          "activities": [
            "Map Absa policies, procedures, controls, registers and evidence standards to the standalone risk operating model",
            "Identify regulatory, compliance, conduct, customer, reputation, market-disclosure and country risks that could remain with Absa"
          ]
        },
        {
          "name": "TSA, waiver controls agreed (4 weeks)",
          "activities": [
            "Define TSA, retained-service and Group Interchange controls, including monitoring, escalation, failures, exit criteria and evidence",
            "Set all risk acceptances, waivers, temporary controls with accountable owners, due dates and approval routes",
            "Secure Enterprise Risk, relevant principal risk approvals for signing, completion, LD1 and any retained Absa obligations"
          ]
        },
        {
          "name": "Standalone LD1, hypercare and BAU handover completed (4 weeks)",
          "activities": [
            "Verify LD1 evidence for risk governance, local execution capability, reporting, committee operation, controls, people and unresolved residual risk.",
            "Monitor the first risk reporting cycle, hypercare issues, buyer dependencies, retained Absa obligations and TSA exit",
            "Hand over residual risks, records, open actions, risk acceptances, templates and policy mapping outputs to BAU or post-transaction owners."
          ]
        }
      ]
    }
  ],
  "sizingFactors": "Risk sizing should also reflect the number of principal risk types triggered, credit exposure complexity, in-country 2LOD requirements, board or exco appetite route, data completeness and accuracy concerns, external assurance scope, regulator-appointed audit requirements, mock / dress rehearsal complexity, digital readiness and high-volume operational testing such as cards.",
  "sizingDrivers": ["Complex deal scope requiring extensive risk oversight (multiple entities, geographies, etc.)", "High-value or high-visibility deal which must be managed carefully", "Deal scope impacts Absa’s fundamental regulatory processes (e.g., funding, capital adequacy, sanctions, AML reporting, etc.)", "Multiple regulators involved with significant levels of scrutiny"],
  "partnerServices": [
    {
      "keyService": "Risk appetite assessment and monitoring",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Controls mapping and remediation",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Programme risk assurance",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Risk governance set-up and execution",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Credit risk assessment and decisioning",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Principal risk type SME coordination",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Policy, process and data-control waiver management",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Risk readiness and go/no-go opinion",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    }
  ]
};
