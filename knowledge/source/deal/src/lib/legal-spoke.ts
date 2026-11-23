/**
 * Legal & CorpDev SA Functional Spoke.
 *
 * All strings in this file are approved source content reproduced verbatim
 * from the Absa M&A Transaction Operating Model document. Do not summarise,
 * paraphrase or correct the wording.
 */

import type { SpokeContent } from "./spoke-content";

export const CONTENT: SpokeContent = {
  "id": "legal",
  "name": "Legal & CorpDev",
  "reference": "",
  "necessityRows": [
    {
      "archetype": "Balance Sheet Acquisition",
      "classification": "Core / Required",
      "rationale": "Core because all archetypes are led by Corporate Development until signing, and all archetypes require proper legal drafting and negotiation based on the deal perimeter"
    },
    {
      "archetype": "Partial Business Acquisition",
      "classification": "Core / Required",
      "rationale": "Core because all archetypes are led by Corporate Development until signing, and all archetypes require proper legal drafting and negotiation based on the deal perimeter"
    },
    {
      "archetype": "Full Business Acquisition A (Buyer integrates the business)",
      "classification": "Core / Required",
      "rationale": "Core because all archetypes are led by Corporate Development until signing, and all archetypes require proper legal drafting and negotiation based on the deal perimeter"
    },
    {
      "archetype": "Full Business Acquisition B (Buyer runs the business standalone)",
      "classification": "Core / Required",
      "rationale": "Core because all archetypes are led by Corporate Development until signing, and all archetypes require proper legal drafting and negotiation based on the deal perimeter"
    },
    {
      "archetype": "Balance Sheet Sale",
      "classification": "Core / Required",
      "rationale": "Core because all archetypes are led by Corporate Development until signing, and all archetypes require proper legal drafting and negotiation based on the deal perimeter"
    },
    {
      "archetype": "Partial Business Sale",
      "classification": "Core / Required",
      "rationale": "Core because all archetypes are led by Corporate Development until signing, and all archetypes require proper legal drafting and negotiation based on the deal perimeter"
    },
    {
      "archetype": "Full Business Sale A (Buyer integrates the business)",
      "classification": "Core / Required",
      "rationale": "Core because all archetypes are led by Corporate Development until signing, and all archetypes require proper legal drafting and negotiation based on the deal perimeter"
    },
    {
      "archetype": "Full Business Sale B (Buyer runs the business as standalone)",
      "classification": "Core / Required",
      "rationale": "Core because all archetypes are led by Corporate Development until signing, and all archetypes require proper legal drafting and negotiation based on the deal perimeter"
    }
  ],
  "keyRole": "Legal & CorpDev own the pre-signature process, including DD and legal drafting, as set out in current Absa processes. During execution, CorpDev tracks the business case, Legal tracks CPs and obligations, and both advise the programme on how signed deal terms affect completion, LD1 and post-close delivery.",
  "responsibilities": [
    "Run the pre-signing transaction process with the deal sponsor, including origination support, non-binding offer, governance route, advisor mobilisation and deal-team cadence - as per existing processes",
    "Develop and maintain the business case with Finance & Tax, including commercial rationale, strategic benefits, counterparty performance updates, valuation assumptions and value-tracking implications - as per existing processes",
    "Provide ultimate signoff on DD, owned by business areas - as per existing processes",
    "Own the transaction-document route across NBO, SPA, BSA, TSA, disclosure letter, CP schedule, warranties, covenants, indemnities, completion deliverables, standard-template deviations and related legal instruments - as per existing processes",
    "Translate DD mitigations and functional execution requirements into transaction documents. Bring in the Inorganic Change team pre-signature to ensure the migration plan reflects execution reality.",
    "Track CPs, approvals, litigation stays, legal consents, disclosure items, template reviews, product-specific documentation and post-signing obligations through an integrated obligations log.",
    "Track the progress against the business case post-signing through to completion, and escalate risks",
    "Provide legal advice and assurance to Central Hub, programme leadership and functional workstreams on what is permissible under signed documents and applicable country law.",
    "Coordinate external counsel, local counsel and accounting-firm support where specialist depth, jurisdictional nuance or capacity is required, with clear turnaround expectations and escalation paths.",
    "Hand over signed obligations, legal constraints, residual risks, open issues, document deviations and lessons learned to Central Hub, the business owner and BAU Legal / CorpDev owners after completion or LD1."
  ],
  "boundaryItems": [
    "Business workstreams own integration or separation execution; Legal & CorpDev supports by converting DD issues and execution requirements into legal terms and advising on signed-document constraints.",
    "Compliance owns compliance interpretation, regulatory approval standards and regulatory-condition execution; Legal owns legal drafting, CP interpretation and legal obligation tracking, with Compliance as a critical dependency on regulatory CPs.",
    "Finance & Tax owns valuation inputs, accounting, tax, completion accounts, funds flow, Group Interchange, TSA charging and financial-control evidence; CorpDev owns the business case and transaction-governance route with Finance input.",
    "Central Hub owns integrated programme discipline, dependency management, weekly stakeholder reporting and Client readiness; Legal & CorpDev owns transaction-document content, CP interpretation and legal readiness evidence",
    "Central Hub owns programme planning, mobilisation, and execution governance post-signature; Legal & CorpDev own pre-signature planning, governance, and mobilisation",
    "Country Legal provides local legal nuance, local counsel coordination, local evidence, local drafting review and local-law advice; SA Legal leads as transaction SME where central drafting, governance and negotiation control are required.",
    "Central Hub should be engaged during DD on acquisitions and early in complex or big-bang disposals so people, customer and operating-model implications are visible before legal terms are finalised."
  ],
  "centralHubRelationship": "Relationship with Central Hub: the Functional Spoke owns Legal and CorpDev transaction decisions, legal interpretation, CP tracking and business-case control while the Central Hub sets programme standards, maintains integrated dependency visibility, coordinates weekly stakeholder reporting and escalates transaction-wide issues.",
  "regionalRelationship": [
    "Regional Spokes should own local execution as a minimum, with ownership scaling based on maturity, including local DD evidence, local-law advice, local counsel coordination, local drafting review, approvals evidence and local execution constraints where they have capacity and delegated authority.",
    "Function Authority retains transaction drafting, negotiation control, CorpDev deal governance, legal interpretation, CP tracking, business-case control and execution ownership where regional maturity, capability or capacity is insufficient.",
    "As regional maturity increases, local ownership should expand from evidence and local-law input into delegated local counsel decisions, local approval execution and legal readiness activity, with Function Authority retaining transaction consistency, specialist challenge and reserved approvals."
  ],
  "externalDependencies": "",
  "mandateRows": [
    {
      "id": "deal-origination-business-case-and-route",
      "area": "Deal origination, business case and route",
      "spokeAuthority": [
        "Defines the legal and CorpDev transaction route, NBO position, perimeter, strategic rationale, business-case assumptions and governance path with the deal sponsor."
      ],
      "hubRole": "Tests deliverability against the integrated plan, dependency map, decision calendar and programme governance requirements.",
      "regionalRole": "",
      "governance": "Deal sponsor, CorpDev, Group Legal, Finance & Tax, Risk, Compliance and executive governance.",
      "escalation": "Perimeter, value case, legal route, approval path or country implication is unclear, disputed or materially changes economics."
    },
    {
      "id": "risk-report-and-proceed-decision",
      "area": "Risk report and proceed decision",
      "spokeAuthority": [
        "Signs off on the DD process, owned by Business.",
        "Owns legal DD scope, advisor coordination, issue escalation and the legal / CorpDev risk report supporting proceed or no-go decisions."
      ],
      "hubRole": "Converts DD findings into programme risks, delivery dependencies, integration or separation actions and mobilisation requirements.",
      "regionalRole": "",
      "governance": "CorpDev, Group Legal, accountable business owner, external counsel, local counsel and relevant functional spokes.",
      "escalation": "Material DD issue, incomplete evidence, country-law constraint, disclosure risk or unpriced execution dependency emerges."
    },
    {
      "id": "transaction-documents-and-negotiation",
      "area": "Transaction documents and negotiation",
      "spokeAuthority": [
        "Owns drafting and negotiation route for the NBO, SPA, BSA, TSA, disclosure letter, warranties, indemnities, covenants, CPs, schedules and completion deliverables."
      ],
      "hubRole": "Ensures workstream execution requirements and milestone dependencies are surfaced before signing and tracked after signing.",
      "regionalRole": "",
      "governance": "Group Legal, CorpDev, external counsel, deal sponsor, accountable executives and relevant functional signatories.",
      "escalation": "Execution requirement is missing from documents, legal terms constrain delivery, template deviations arise or negotiation changes the programme critical path."
    },
    {
      "id": "conditions-precedent-approvals-and-obligations",
      "area": "Conditions precedent, approvals and obligations",
      "spokeAuthority": [
        "Owns the legal view of CPs, disclosure items, litigation stays, consents, regulatory and internal approval conditions, obligation logs and completion evidence."
      ],
      "hubRole": "Maintains programme visibility of owners, timing, dependencies and unresolved CP or obligation issues through governance and weekly reporting.",
      "regionalRole": "",
      "governance": "Group Legal, Compliance, CorpDev, programme governance, regulators, Board or executive committees as applicable.",
      "escalation": "CP ownership is unclear, regulator or buyer evidence is late, local counsel turnaround threatens milestones or obligation closure is not evidenced."
    },
    {
      "id": "legal-execution-approach",
      "area": "Legal execution approach",
      "spokeAuthority": [
        "Owns the approach to any legal / CorpDev items which require execution as part of the integration (e.g., guarantee novations)"
      ],
      "hubRole": "Provides programme management oversight to execution activities",
      "regionalRole": "",
      "governance": "Group Legal, Compliance, CorpDev, programme governance,",
      "escalation": "Significant delays or material blockers to legal execution"
    },
    {
      "id": "completion-ld1-and-execution-handover",
      "area": "Completion, LD1 and execution handover",
      "spokeAuthority": [
        "Confirms that the programme plan remains consistent with signed legal terms and hands over legal constraints, open obligations, variations and post-completion actions.",
        "Leads existing risk-led readiness meeting."
      ],
      "hubRole": "Integrates legal readiness into completion, LD1 go/no-go, cutover, hypercare and BAU transition governance.",
      "regionalRole": "",
      "governance": "Programme SteerCo, deal sponsor, Group Legal, CorpDev, accountable functional owners and regional leadership where relevant.",
      "escalation": "Signed terms, CP status, customer journey, country law or unresolved legal risk creates completion, LD1 or post-LD1 delivery risk."
    }
  ],
  "capabilityRows": [
    {
      "category": "Specific Project Manager required?",
      "content": "Maybe - CorpDev & Legal teams decide what the deal team looks like pre signing. Post-signing, a PM may be required where significant legal remediation is required"
    },
    {
      "category": "Baseline capabilities",
      "content": "M&A process management; CorpDev business-case development; legal due diligence coordination; legal risk reporting; transaction-document drafting; negotiation management; CP and obligations tracking; approval-paper coordination; execution handover discipline."
    },
    {
      "category": "Incremental capabilities by deal archetype / complexity",
      "content": "TSA and separation schedule design; integration-issue translation into legal terms; local counsel coordination; multi-country drafting review; buyer or seller dependency management; staggered versus big-bang completion planning; standard-template deviation control."
    },
    {
      "category": "Specialist capabilities triggered by deal characteristics",
      "content": "Banking M&A legal expertise; competition and regulatory approvals; company secretarial and Board governance; employment, tax, data privacy, IP, technology and supplier-contract advice; litigation management; external counsel and accounting-firm coordination."
    }
  ],
  "milestoneIntro": [
    "The key milestones below are organised as a baseline set, with additional milestones required for more complex deal archetypes split out below as required.",
    "Activities before contract signing reproduce the existing Absa M&A process. They do not change ownership, controls, approvals, DD scope, testing, reporting or governance. The operating-model requirement is limited to involving the relevant Business Area, country, integration and functional specialists at the appropriate point, subject to confidentiality, and handing DD risks and obligations into execution.",
    "Pre-signature timing remains determined by the existing transaction process and deal timetable.",
    "Service catalogue:"
  ],
  "serviceCatalogue": [
    "Existing Absa transaction process and GIC governance support",
    "Deal team, insider-list, confidentiality and adviser coordination",
    "Business Area-led due diligence oversight, risk register and policy-gap tracking",
    "Transaction-document drafting, negotiation, signing and records management",
    "Suspensive conditions, approvals, consents and obligations tracking",
    "Mandatory Day 1 readiness and completion support",
    "Legal implementation, integration and separation advice",
    "Business-case tracking and post-implementation reporting support"
  ],
  "activitySets": [
    {
      "id": "balance-sheet-acquisition",
      "heading": "Balance Sheet Acquisition - baseline activities",
      "tab": "Balance Sheet Acquisition",
      "milestones": [
        {
          "name": "Existing Absa deal origination and governance process completed (as per existing processes)",
          "activities": [
            "The Project Sponsor obtains Corporate Development advice on strategy, approval criteria, initial valuation, deal structure and project management, in line with the existing Absa process.",
            "Corporate Development and Group Corporate Legal help establish the Deal Team, governance, insider list, conflict-clearance route, confidentiality controls and adviser model already required by the existing process.",
            "The Project Sponsor includes the relevant Business Area, country, integration and functional representatives early enough to assess execution implications, subject to confidentiality and need-to-know restrictions."
          ]
        },
        {
          "name": "Existing GIC in-principle, offer and business-case process completed (as per existing processes)",
          "activities": [
            "The Business Area prepares the in-principle GIC application and Business Case, with Corporate Development guidance and Project Sponsor sign-off, using the existing approval route.",
            "Corporate Development and Group Corporate Legal prepare the offer and engage advisers in accordance with existing mandates and legal policies.",
            "Relevant functional and country specialists provide strategic, financial, tax, regulatory, operational and integration inputs without changing Business Area ownership or existing governance."
          ]
        },
        {
          "name": "Existing Business Area-led DD or risk-assessment process completed (as per existing processes)",
          "activities": [
            "The Project Sponsor appoints the DD Leader and Accountable Executives, and Accountable Executives appoint suitably skilled Workstream Leaders and fieldwork teams with adequate capacity.",
            "The DD Leader and Corporate Development deliver the existing briefing, coordinate information requests, maintain the policy-gap analysis and Risk Register, and manage the established reporting and sign-off process.",
            "The Business Area Integration Team and relevant functional and country SMEs participate at the appropriate point so DD risks, policy gaps, remediation costs, waivers and integration matters transfer into execution; they do not alter DD ownership, scope or procedures."
          ]
        },
        {
          "name": "Existing final GIC, negotiation and signing process completed (as per existing processes)",
          "activities": [
            "The Project Sponsor submits the final GIC application once the Deal Team confirms that DD is complete, commercial terms are defined and required sign-offs are in place.",
            "Group Corporate Legal, Corporate Development and the Business Area jointly lead contract negotiation under their existing mandates, with relevant legal and functional specialists providing inputs.",
            "Before signing, the Deal Team signs off the current Risk Register and confirms that contractual mitigants, integration actions and required announcements are addressed through the existing process."
          ]
        },
        {
          "name": "Integration specialists included in the existing DD process (timing determined by transaction)",
          "activities": [
            "Include the Central Hub Integration / Inorganic Growth Team and relevant Technology, Data, Operations, Product, Human Capital, Finance, Risk, Compliance, Procurement and CRES specialists where the transaction scope requires them.",
            "Use existing DD scopes and reports to identify policy-conformance gaps, implementation constraints, synergy dependencies and remediation costs.",
            "Ensure the DD Leader hands the complete set of integration matters, Risk Register items and contractual mitigants to the Integration Leader before execution mobilisation."
          ]
        },
        {
          "name": "Suspensive conditions and legal obligations mobilised (as per existing processes)",
          "activities": [
            "Translate each suspensive condition, approval, consent, undertaking and completion deliverable into an obligations log with an accountable owner, due date and evidence requirement.",
            "Coordinate with Compliance, Risk, Finance, country Legal and relevant workstreams on the operational actions required to satisfy legal conditions.",
            "Escalate any condition, consent or obligation that threatens the completion timetable or requires a Deal Team decision, waiver or document amendment."
          ]
        },
        {
          "name": "Programme legal assurance conducted (ongoing)",
          "activities": [
            "Ongoing legal assurance provided to the programme, advising on where CPs and SPA conditions impact execution decisions"
          ]
        },
        {
          "name": "Mandatory Day 1 readiness and completion supported (as per existing processes)",
          "activities": [
            "Confirm that signed transaction terms, suspensive conditions, mandatory pre-Day 1 requirements, policy gaps, waivers and high-risk mitigations are reflected in the readiness evidence.",
            "Support the mandatory Risk-led Day 1 readiness process; Corporate Development and the Integration Leader document minutes and evidence, with Business Area, Corporate Development, Group Corporate Legal and Risk represented in the decision.",
            "Support delivery of closing documents, legal ownership transfer and completion mechanics, then hand signed terms and open obligations to the Central Hub and accountable execution owners."
          ]
        },
        {
          "name": "Integration obligations and post-implementation reporting handed over (as per existing processes)",
          "activities": [
            "The Business Area Integration Team owns implementation; Legal and Corporate Development advise on signed terms, approved commercial principles, policy obligations and permitted variations.",
            "Route any change to GIC-approved commercial principles back through GIC and any change to transaction agreements through the Deal Team before agreement or implementation.",
            "Support the Project Sponsor's post-implementation reporting, including performance against the Business Case, material risks, issues and recommendations, with Corporate Development review before GIC submission."
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
          "name": "Carve-in obligations and TSA requirements translated into execution (as per existing processes)",
          "activities": [
            "Translate signed perimeter, transition-service, information-right, consent and customer-transfer provisions into executable workstream obligations.",
            "Confirm that service levels, charging, governance, dependencies, dispute routes and exit dates are understood by operational owners.",
            "Maintain traceability from DD findings and contractual mitigants to the integrated plan, readiness criteria and evidence owners."
          ]
        },
        {
          "name": "Policy gaps, waivers and transition obligations controlled (timing determined by transaction)",
          "activities": [
            "Track policy remediation, dispensations and waivers required before Day 1, including accountable Key Risk Owners and expiry dates.",
            "Confirm that interim controls and transition obligations operate from completion and remain consistent with signed agreements.",
            "Hand open remediation, waiver and TSA-exit actions to accountable BAU owners with programme visibility until closure."
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
          "name": "Integrated legal and policy implementation plan approved (timing determined by transaction)",
          "activities": [
            "Map the signed agreement, CPs, waivers, policy commitments and legal-entity requirements to the integrated operating-model and cutover plan.",
            "Confirm that mandatory sanctions, payments-screening, anti-bribery and other pre-Day 1 requirements have owners and evidence standards.",
            "Escalate any planned implementation step that conflicts with the signed agreement, approved commercial principles or Absa policy requirements."
          ]
        },
        {
          "name": "Commercial commitments and integration obligations monitored (timing determined by transaction)",
          "activities": [
            "Track delivery of legally documented commitments, synergy assumptions and material Business Case dependencies through programme governance.",
            "Support Deal Team and GIC review where execution requires a change to transaction terms or approved commercial principles.",
            "Provide Legal and Corporate Development inputs to post-implementation reporting and transfer ongoing obligations to BAU governance."
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
          "name": "Existing Absa deal, DD and approval process completed for the standalone perimeter (as per existing processes)",
          "activities": [
            "Follow the existing origination, deal-governance, confidentiality, GIC, offer, adviser, Business Case, DD and signing process without changing roles, controls or approvals.",
            "Appoint the DD Leader, Accountable Executives, Workstream Leaders and fieldwork teams required to assess the complete standalone business and its policy-conformance gaps.",
            "Include country and standalone operating-model specialists early enough to identify legal-entity, governance, licence, people, supplier, technology, data and operational implications."
          ]
        },
        {
          "name": "Standalone legal, governance and policy perimeter handed into execution (as per existing processes)",
          "activities": [
            "Translate signed ownership, legal-entity, governance, licence, contract and policy commitments into an integrated obligations and evidence plan.",
            "Confirm required waivers, dispensations, delegated authorities, Board or committee actions and local-law requirements.",
            "Hand DD reports, the Risk Register, policy-gap analysis, legal constraints and remediation plans to the Integration Leader and accountable owners."
          ]
        },
        {
          "name": "Standalone conditions and completion obligations controlled (timing determined by transaction)",
          "activities": [
            "Track all suspensive conditions, regulatory approvals, consents, legal documents, funding actions and counterparty deliverables.",
            "Coordinate local and Group Legal, Compliance, Finance, Risk and company-secretarial evidence for completion.",
            "Escalate any unmet condition, material legal uncertainty or required change to the Deal Team through the established governance route."
          ]
        },
        {
          "name": "Standalone Day 1 legal readiness confirmed (timing determined by transaction)",
          "activities": [
            "Confirm mandatory pre-Day 1 procedures, policy implementation or approved waivers, high-risk mitigations and legal-entity readiness.",
            "Support the mandatory Day 1 readiness meeting and preserve the existing voting, evidence and escalation requirements.",
            "Advise execution teams on signed-document constraints through completion, cutover and early hypercare."
          ]
        },
        {
          "name": "Standalone implementation obligations stabilised (timing determined by transaction)",
          "activities": [
            "Monitor legal, policy, governance and commercial commitments that continue after completion.",
            "Confirm temporary controls and waivers are remediated before expiry and that any agreement change receives Deal Team approval.",
            "Transfer open obligations, claims, disputes, counsel outputs and legal records to accountable BAU owners."
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
          "name": "Existing Absa disposal origination and governance process completed (as per existing processes)",
          "activities": [
            "The Project Sponsor obtains Corporate Development advice on disposal strategy, approval criteria, valuation, deal structure and project management through the existing process.",
            "Corporate Development and Group Corporate Legal establish the Deal Team, governance, confidentiality, insider-list, conflict-clearance and adviser arrangements already required.",
            "Include relevant retained-business, country, integration and functional representatives early enough to identify execution and residual-risk implications, subject to confidentiality controls."
          ]
        },
        {
          "name": "Existing GIC, Business Case, DD and signing process completed (as per existing processes)",
          "activities": [
            "Follow the existing Business Area-owned Business Case and DD or risk-assessment process, including DD Leader, Accountable Executive, Workstream Leader and Key Risk Owner responsibilities.",
            "Use the existing Risk Register, reporting and sign-off process to identify value, contract, separation and retained-risk mitigants.",
            "Complete final GIC approval, contract negotiation and signing through the existing Project Sponsor, Corporate Development, Group Corporate Legal and Business Area mandates."
          ]
        },
        {
          "name": "Suspensive conditions and disposal obligations mobilised (as per existing processes)",
          "activities": [
            "Translate conditions, buyer and Absa obligations, approvals, consents, notices and closing documents into a controlled obligations log.",
            "Confirm owners and evidence for transferred, retained and transitional obligations across Legal, Compliance, Finance and execution workstreams.",
            "Escalate buyer dependency, consent or legal-document issues that could prevent completion or create unsupported Absa exposure."
          ]
        },
        {
          "name": "Separation specialists included in the existing DD process (timing determined by transaction)",
          "activities": [
            "Include the Central Hub Separation / Inorganic Growth Team and relevant Technology, Data, Operations, Product, Human Capital, Finance, Risk, Compliance, Procurement and CRES specialists where the transaction scope requires them.",
            "Use existing DD scopes and reports to identify policy-conformance gaps, implementation constraints, synergy dependencies and remediation costs.",
            "Ensure the DD Leader hands the complete set of integration matters, Risk Register items and contractual mitigants to the Separation Leader before execution mobilisation."
          ]
        },
        {
          "name": "Programme legal assurance conducted (ongoing)",
          "activities": [
            "Ongoing legal assurance provided to the programme, advising on where CPs and SPA conditions impact execution decisions"
          ]
        },
        {
          "name": "Mandatory Day 1 readiness and disposal completion supported (as per existing processes)",
          "activities": [
            "Confirm that DD reports, the Risk Register, contractual mitigants, policy requirements and high-risk separation actions support the readiness decision.",
            "Support the mandatory Day 1 readiness process using the existing attendance, voting, evidence and escalation route.",
            "Support purchase-price or consideration transfer, legal ownership change and closing-document delivery, then hand retained obligations into execution governance."
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
          "name": "TSA and separation obligations translated into execution (timing determined by transaction)",
          "activities": [
            "Translate signed TSA, access, information, records, customer-transfer, supplier and service-continuity provisions into executable plans.",
            "Confirm service levels, charging, governance, buyer dependencies, dispute routes and exit dates with accountable owners.",
            "Maintain traceability from contractual terms and DD risks to readiness evidence, residual-risk acceptance and TSA exit."
          ]
        },
        {
          "name": "Retained Absa protections and policy obligations controlled (timing determined by transaction)",
          "activities": [
            "Track warranties, indemnities, claims support, retained records, data restrictions, legal privilege and policy obligations.",
            "Confirm interim controls, waivers and retained-service arrangements remain effective through completion and transition.",
            "Hand unresolved buyer dependencies and retained obligations to named BAU owners with clear escalation and closure evidence."
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
          "name": "Buyer handover and Absa exit obligations controlled (timing determined by transaction)",
          "activities": [
            "Define the signed-document requirements for data, records, contracts, licences, customer obligations, assets and operational handover.",
            "Confirm buyer readiness dependencies and Absa retained responsibilities are visible in completion and cutover governance.",
            "Escalate any planned buyer-integration action that conflicts with the transaction agreement, confidentiality restrictions or Absa retained protections."
          ]
        },
        {
          "name": "TSA exit and retained Absa obligations closed (timing determined by transaction)",
          "activities": [
            "Track TSA services, claims, disputes, retained commitments and legal variations through the agreed transition period.",
            "Obtain Deal Team approval for agreement amendments and GIC approval for changes to approved commercial principles.",
            "Transfer residual actions to BAU owners and support post-implementation reporting on Absa's remaining exposure."
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
          "name": "Existing Absa deal, DD and approval process completed for the standalone sale perimeter (as per existing processes)",
          "activities": [
            "Follow the existing origination, governance, confidentiality, GIC, Business Case, DD, negotiation and signing process without adding new pre-signature controls.",
            "Appoint the DD Leader, Accountable Executives, Workstream Leaders and fieldwork teams needed to assess the full business and retained Absa exposure.",
            "Include buyer-standalone, country and functional specialists early enough to identify separation, legal-entity, licence, policy, TSA and readiness implications."
          ]
        },
        {
          "name": "Standalone separation perimeter handed into execution (6 weeks)",
          "activities": [
            "Translate signed legal-entity, contract, licence, customer, employee, supplier, data, records and governance provisions into the separation plan.",
            "Hand DD reports, the Risk Register, policy-gap analysis, retained obligations and buyer dependencies to the Separation Leader.",
            "Confirm which obligations transfer, remain with Absa or require TSA or post-completion support."
          ]
        },
        {
          "name": "Standalone conditions and buyer-readiness obligations controlled (timing determined by transaction)",
          "activities": [
            "Track suspensive conditions, approvals, consents, buyer evidence, completion documents and Absa retained protections.",
            "Coordinate Group and country Legal, Compliance, Finance, Risk and company-secretarial evidence for completion.",
            "Escalate unmet conditions, buyer-readiness gaps or proposed term changes through the established Deal Team and GIC routes."
          ]
        },
        {
          "name": "Standalone sale Day 1 readiness supported (timing determined by transaction)",
          "activities": [
            "Confirm mandatory pre-Day 1 requirements, high-risk mitigations, policy actions, waivers and buyer handover evidence.",
            "Support the mandatory Day 1 readiness meeting while preserving the existing voting, evidence and Chief Risk Officer escalation requirements.",
            "Advise Absa and buyer teams on transaction-document constraints through completion, cutover and early hypercare."
          ]
        },
        {
          "name": "Standalone TSA and retained obligations stabilised (timing determined by transaction)",
          "activities": [
            "Monitor TSA performance, retained services, claims, legal variations, information rights and buyer dependencies after completion.",
            "Confirm agreement amendments and changes to GIC-approved principles follow the required Deal Team and GIC approvals.",
            "Transfer unresolved obligations, disputes and legal records to accountable Absa or buyer BAU owners."
          ]
        },
        {
          "name": "Standalone disposal post-implementation reporting supported (timing determined by transaction)",
          "activities": [
            "Provide Legal and Corporate Development input on disposal performance, retained cost, risk and delivery against approved commercial principles.",
            "Support the Project Sponsor in preparing Post Implementation Reports and obtain Corporate Development review before GIC submission.",
            "Escalate non-performing commitments or residual exposure through GIC and the applicable risk governance route."
          ]
        }
      ]
    }
  ],
  "sizingFactors": "",
  "sizingDrivers": ["Complexity of assets/liabilities being transferred", "Overall deal complexity", "Geographical scope of deal", "Regulators required for approval", "Number of counterparties"],
  "partnerServices": [
    {
      "keyService": "Existing Absa transaction process and GIC governance support",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Deal team, insider-list, confidentiality and adviser coordination",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Business Area-led due diligence oversight, risk register and policy-gap tracking",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Transaction-document drafting, negotiation, signing and records management",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Suspensive conditions, approvals, consents and obligations tracking",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Mandatory Day 1 readiness and completion support",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Legal implementation, integration and separation advice",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Business-case tracking and post-implementation reporting support",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    }
  ]
};
