/**
 * Compliance & Regulatory Approvals SA Functional Spoke.
 *
 * All strings in this file are approved source content reproduced verbatim
 * from the Absa M&A Transaction Operating Model document. Do not summarise,
 * paraphrase or correct the wording.
 */

import type { SpokeContent } from "./spoke-content";

export const CONTENT: SpokeContent = {
  "id": "compliance",
  "name": "Compliance & Regulatory Approvals",
  "reference": "",
  "necessityRows": [
    {
      "archetype": "Balance Sheet Acquisition",
      "classification": "Core / Required",
      "rationale": "Core because regulatory permissions, compliance obligations, conduct standards, financial-crime controls, data-sharing controls and completion attestations are critical across all archetypes"
    },
    {
      "archetype": "Partial Business Acquisition",
      "classification": "Core / Required",
      "rationale": "Core because regulatory permissions, compliance obligations, conduct standards, financial-crime controls, data-sharing controls and completion attestations are critical across all archetypes"
    },
    {
      "archetype": "Full Business Acquisition A (Buyer integrates the business)",
      "classification": "Core / Required",
      "rationale": "Core because regulatory permissions, compliance obligations, conduct standards, financial-crime controls, data-sharing controls and completion attestations are critical across all archetypes"
    },
    {
      "archetype": "Full Business Acquisition B (Buyer runs the business standalone)",
      "classification": "Core / Required",
      "rationale": "Core because regulatory permissions, compliance obligations, conduct standards, financial-crime controls, data-sharing controls and completion attestations are critical across all archetypes"
    },
    {
      "archetype": "Balance Sheet Sale",
      "classification": "Core / Required",
      "rationale": "Core because regulatory permissions, compliance obligations, conduct standards, financial-crime controls, data-sharing controls and completion attestations are critical across all archetypes"
    },
    {
      "archetype": "Partial Business Sale",
      "classification": "Core / Required",
      "rationale": "Core because regulatory permissions, compliance obligations, conduct standards, financial-crime controls, data-sharing controls and completion attestations are critical across all archetypes"
    },
    {
      "archetype": "Full Business Sale A (Buyer integrates the business)",
      "classification": "Core / Required",
      "rationale": "Core because regulatory permissions, compliance obligations, conduct standards, financial-crime controls, data-sharing controls and completion attestations are critical across all archetypes"
    },
    {
      "archetype": "Full Business Sale B (Buyer runs the business as standalone)",
      "classification": "Core / Required",
      "rationale": "Core because regulatory permissions, compliance obligations, conduct standards, financial-crime controls, data-sharing controls and completion attestations are critical across all archetypes"
    }
  ],
  "keyRole": "Owns the compliance execution framework that makes the transaction controlled, regulator-ready and aligned to Absa policy.",
  "responsibilities": [
    "Define applicable compliance obligations, approval paths, policy standards and completion evidence across the deal lifecycle.",
    "Identify where conditions can be pre-agreed with regulators, and where data sharing can be agreed before full approval is received.",
    "Identify compliance remediation, including regulatory approvals or notifications, policy exceptions, conduct risks, financial-crime controls, privacy constraints and outsourcing controls.",
    "Advise on confidentiality, clean-room access, data sharing, client engagement, customer communications and restricted actions as the programme moves into execution",
    "Validate local regulatory constraints that affect shared-service, Group Interchange, TSA and synergy assumptions with Finance & Tax, Legal & CorpDev and Regional Spokes.",
    "Track compliance conditions, regulatory commitments, completion attestations and LD1 readiness evidence with the Central Hub.",
    "Coordinate with Risk / Credit, KYC / AML, Data Migration, Product, Operations & Servicing, HR and Finance & Tax to embed compliance obligations in workstream plans."
  ],
  "boundaryItems": [
    "Legal & CorpDev owns formal legal advice, transaction-document drafting, legal opinions and legal sign-off where required.",
    "KYC / AML owns file-level due diligence, screening and remediation execution; Compliance sets policy interpretation, approval standards and control expectations.",
    "Risk / Credit owns risk appetite and credit decisions; Central Hub owns programme coordination; Compliance owns compliance interpretation, approvals and readiness evidence."
  ],
  "centralHubRelationship": "Relationship with Central Hub: the SA Functional Spoke owns compliance execution decisions and evidence while the Central Hub sets programme standards, coordinates dependencies and escalates transaction-wide issues.",
  "regionalRelationship": [
    "Regional Spokes should own local execution as a minimum, with ownership scaling based on maturity, including local regulatory engagement, submission drafting, local control evidence, monitoring of local conditions and country compliance actions where they have capacity and delegated authority.",
    "Function Authority retains group compliance interpretation, policy standards, financial-crime, conduct, privacy and outsourcing positions, central challenge and execution ownership where regional maturity, capability or capacity is insufficient.",
    "As regional maturity increases, local ownership should expand from evidence provision into local approval execution and regulator-facing activity, with Function Authority retaining group standards, specialist challenge and reserved approvals."
  ],
  "externalDependencies": "",
  "mandateRows": [
    {
      "id": "compliance-obligation-and-control-approach",
      "area": "Compliance obligation and control approach",
      "spokeAuthority": [
        "Defines compliance obligations, control standards, evidence requirements and approval route"
      ],
      "hubRole": "Ensures workstream requirements are captured and dependencies are visible",
      "regionalRole": "",
      "governance": "Compliance governance, relevant control committees and Group Legal where formal legal interpretation is required",
      "escalation": "Control requirement, ownership or approval route is unclear"
    },
    {
      "id": "define-business-approval-owners",
      "area": "Define business approval owners",
      "spokeAuthority": [
        "Define business leaders to own business-area licenses required, supported by compliance"
      ],
      "hubRole": "Track approvals and support business execution",
      "regionalRole": "",
      "governance": "Regulatory governance, Compliance and accountable executive approval",
      "escalation": "Approval timing, licence uncertainty, notification risk, regulator challenge or local restriction to shared-service or synergy assumptions"
    },
    {
      "id": "regulatory-permissions-and-notifications",
      "area": "Regulatory permissions and notifications",
      "spokeAuthority": [
        "Owns compliance input to approvals, notifications, regulator commitments and response preparation"
      ],
      "hubRole": "Tracks critical path, dependencies and governance timing",
      "regionalRole": "",
      "governance": "Regulatory governance, Compliance and accountable executive approval",
      "escalation": "Approval timing, licence uncertainty, notification risk, regulator challenge or local restriction to shared-service or synergy assumptions"
    },
    {
      "id": "conduct-financial-crime-privacy-and-data-sharing-controls",
      "area": "Conduct, financial-crime, privacy and data-sharing controls",
      "spokeAuthority": [
        "Defines control standards, restrictions, attestations and evidence requirements"
      ],
      "hubRole": "Coordinates cross-workstream dependencies and readiness evidence",
      "regionalRole": "",
      "governance": "Compliance, KYC / AML, Data Privacy and relevant control committees",
      "escalation": "Material conduct issue, sanctions exposure, data-sharing constraint or unresolved customer impact"
    },
    {
      "id": "ld1-compliance-readiness-and-exceptions",
      "area": "LD1 compliance readiness and exceptions",
      "spokeAuthority": [
        "Recommends compliance readiness status, accepted exceptions and residual risk position"
      ],
      "hubRole": "Integrates into go/no-go and completion governance",
      "regionalRole": "",
      "governance": "Programme governance and Compliance signatories",
      "escalation": "Condition, attestation, policy exception or remediation item is incomplete at go/no-go"
    }
  ],
  "capabilityRows": [
    {
      "category": "Specific project manager required?",
      "content": "No, non-technical workstream with middling workload"
    },
    {
      "category": "Baseline capabilities",
      "content": "Regulatory obligation mapping; Regulatory approvals or notifications; Compliance approval routing; Privacy and data-sharing controls; Policy exception management and completion evidence management"
    },
    {
      "category": "Incremental capabilities by deal archetype / complexity",
      "content": "Clean-room protocols,; TSA compliance controls; Customer communication restrictions,; Jurisdictional compliance alignment; Data transfer constraints"
    },
    {
      "category": "Specialist capabilities triggered by deal characteristics",
      "content": "Sanctions, conduct risk, data privacy, outsourcing, market conduct, product governance and regulatory correspondence."
    }
  ],
  "milestoneIntro": [
    "The key milestones below are organised by as a baseline set, with additional milestones required for more complex deal archetypes split out below as required.",
    "As deal archetypes scale up in size / complexity (Balance Sheet 🡪 Partial 🡪 Full), each baseline activity should be assessed against the Complexity Factors laid out in the Deal Archetypes documentation, and assessed for whether its size or scope increases as a result of deal specifics.",
    "Service catalogue:"
  ],
  "serviceCatalogue": [
    "SA regulatory submission drafting and tracking",
    "Local Regulatory submission oversight of regional spokes",
    "Approval timeline creation and assumptions",
    "Ongoing regulatory engagement to drive alignment and approval",
    "Programme advisory on compliance matters as the programme progresses",
    "Absa and target firm policy gap identification and remediation"
  ],
  "activitySets": [
    {
      "id": "balance-sheet-acquisition",
      "heading": "Balance Sheet Acquisition - baseline activities",
      "tab": "Balance Sheet Acquisition",
      "milestones": [
        {
          "name": "Required regulatory approvals submitted (6 weeks)",
          "activities": [
            "Identify all regulatory approvals, notifications, consents required for the transaction",
            "Confirm applicable regulators and authorities by jurisdiction",
            "Define submission strategy, sequencing and ownership",
            "Build the regulatory approval timeline, based on previous submissions, local knowledge, and strength of relationship",
            "Gather required transaction, financial, operational and governance readiness across streams"
          ]
        },
        {
          "name": "Policy comparison complete (led by Heads of Compliance) (4 weeks)",
          "activities": [
            "Define the regulatory and compliance policy perimeter relevant to the transaction (3 weeks)",
            "Assess Absa and target policies, standards and procedures (3 weeks)",
            "Map Absa and target policy frameworks (3 weeks)",
            "Compare policy requirements, controls and ownership (3 weeks)",
            "Identify differences in risk appetite or compliance standards (3 weeks)",
            "Identify policies that can remain unchanged (2 weeks)",
            "Identify gaps, conflicts or duplicated requirements (2 weeks)",
            "Document findings in a policy gap assessment (4 weeks)"
          ]
        },
        {
          "name": "Policy gaps remediated and tested (4 weeks)",
          "activities": [
            "Prioritise policy gaps by risk",
            "Define remediation actions and dates",
            "Update policies, standards and procedures",
            "Align control requirements",
            "Communicate new or revised requirements",
            "Update supporting process documentation",
            "Implement required compliance controls",
            "Validate ownership and accountability",
            "Test implementation of policy changes",
            "Escalate unresolved gaps and ask for interim risk acceptance",
            "Obtain Compliance sign-off on remediation actions"
          ]
        },
        {
          "name": "Continued regulatory reporting & engagement (8 weeks)",
          "activities": [
            "Confirm ongoing regulatory reporting obligations during the transaction",
            "Maintain regulatory engagement plan and contact map",
            "Prepare regular supervisory updates on transaction progress, as well as ad hoc updates",
            "Coordinate responses to regulator queries",
            "Track commitments made to regulators",
            "Monitor conditions attached to regulatory approvals",
            "Provide updates on delivery against regulatory commitments",
            "Escalate material transaction risks or delays where disclosure is required",
            "Maintain evidence of regulatory correspondence and submissions",
            "Coordinate regulatory meetings and briefing materials",
            "Confirm ownership of ongoing reporting obligations post-LD1",
            "Ensure no reporting obligations are missed during cutover or transition"
          ]
        },
        {
          "name": "Continued programme advisory activities (8 weeks)",
          "activities": [
            "Provide regulatory and compliance advice to the Transaction Director and programme",
            "Review programme decisions for regulatory implications",
            "Advise workstreams on applicable policies, standards and regulatory requirements",
            "Support design of target-state processes",
            "Review proposed deviations from existing policy",
            "Support interpretation of regulatory requirements",
            "Assess regulatory implications of programme risks and issues",
            "Advise on conduct, customer and financial crime implications",
            "Review readiness evidence from a Compliance perspective",
            "Support escalation and remediation of compliance issues"
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
          "name": "Registration of regulated employees (3 weeks)",
          "activities": [
            "Identify employees transferring into regulated or certified roles",
            "Confirm applicable regulatory registration, licensing or certification requirements",
            "Identify gaps in existing approvals or registrations",
            "Complete 'fit and proper' or equivalent assessments",
            "Coordinate background screening and regulatory checks",
            "Submit applications within required timelines",
            "Track regulator responses and outstanding information requests",
            "Confirm employees are approved",
            "Define interim role restrictions where approvals pending",
            "Maintain evidence of approvals and registrations"
          ]
        },
        {
          "name": "Compliance training for new employees complete (3 weeks)",
          "activities": [
            "Identify mandatory regulatory and compliance training requirements",
            "Segment training by role, jurisdiction and regulatory exposure",
            "Assess equivalence of seller training against Absa requirements",
            "Identify training gaps for transferring employees alongside Change Management",
            "Track completion against employee population",
            "Escalate incomplete mandatory training",
            "Retain evidence of training completion"
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
          "name": "Track seller closure of banking license (8 weeks)",
          "activities": [
            "Confirm seller and Absa responsibilities for licence closure or surrender",
            "Identify regulatory prerequisites for licence closure",
            "Establish closure plan and timetable",
            "Confirm transfer or closure of regulated activities",
            "Validate that customer and product obligations have migrated",
            "Confirm outstanding regulatory reporting obligations",
            "Confirm complaints, investigations and remediation cases have clear ownership",
            "Confirm financial crime obligations and records have transferred appropriately",
            "Track seller completion of regulator-required actions",
            "Maintain evidence of licence surrender",
            "Monitor regulator questions or conditions",
            "Escalate delays that may affect TSA exit or programme closure"
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
          "name": "Required regulatory approvals submitted (6 weeks)",
          "activities": [
            "Identify all regulatory approvals, notifications, consents required for the transaction",
            "Confirm applicable regulators and authorities by jurisdiction",
            "Define submission strategy, sequencing and ownership",
            "Establish timetable aligned to signing, completion and LD1",
            "Gather required transaction, financial, operational and governance information",
            "Coordinate inputs from Legal, Finance, Risk, HR and other workstreams",
            "Work with in-country teams to gather inputs on local regulators, and support in-country submissions",
            "Draft regulatory applications, notifications and supporting materials",
            "Complete internal governance and legal review of submissions",
            "Obtain required executive and Board approvals before submission",
            "Submit applications and notifications within required timelines",
            "Track regulator questions, information requests and conditions",
            "Coordinate responses to regulator follow-up requests",
            "Maintain central regulatory approvals tracker",
            "Escalate risks to approval timelines or conditions precedent"
          ]
        },
        {
          "name": "Policy comparison complete (4 weeks)",
          "activities": [
            "Define the regulatory and compliance policy perimeter relevant to the transaction",
            "Assess Absa and target policies, standards and procedures",
            "Map Absa and target policy frameworks",
            "Compare policy requirements, controls and ownership",
            "Identify differences in risk appetite or compliance standards",
            "Identify policies that can remain unchanged",
            "Identify gaps, conflicts or duplicated requirements",
            "Document findings in a policy gap assessment"
          ]
        },
        {
          "name": "Policy gaps assessed for remediation, and closed where needed (4 weeks)",
          "activities": [
            "Risk-assess identified policy gaps",
            "Determine which gaps must be closed before LD1",
            "Define interim processes for non-critical gaps",
            "Update policies and procedures",
            "Implement compliance controls",
            "Test remediation actions",
            "Document risk acceptance for deferred items",
            "Confirm ownership of post-LD1 remediation",
            "Track open gaps through the transition period",
            "Obtain Compliance sign-off on minimum viable standalone position"
          ]
        },
        {
          "name": "Continued regulatory reporting & engagement (8 weeks)",
          "activities": [
            "Confirm ongoing regulatory reporting obligations during the transaction",
            "Maintain regulatory engagement plan and contact map",
            "Prepare regular supervisory updates on transaction progress",
            "Coordinate responses to regulator queries",
            "Track commitments made to regulators",
            "Monitor conditions attached to regulatory approvals",
            "Provide updates on delivery against regulatory commitments",
            "Escalate material transaction risks or delays where disclosure is required",
            "Maintain evidence of regulatory correspondence and submissions",
            "Coordinate regulatory meetings and briefing materials",
            "Confirm ownership of ongoing reporting obligations post-LD1",
            "Ensure no reporting obligations are missed during cutover or transition"
          ]
        },
        {
          "name": "Continued programme advisory activities (8 weeks)",
          "activities": [
            "Provide regulatory and compliance advice to the Transaction Director and programme",
            "Review programme decisions for regulatory implications",
            "Advise workstreams on applicable policies, standards and regulatory requirements",
            "Support design of target-state processes",
            "Review proposed deviations from existing policy",
            "Support interpretation of regulatory requirements",
            "Assess regulatory implications of programme risks and issues",
            "Advise on conduct, customer and financial crime implications",
            "Review readiness evidence from a Compliance perspective",
            "Support escalation and remediation of compliance issues"
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
          "name": "Required regulatory approvals submitted (6 weeks)",
          "activities": [
            "Identify all regulatory approvals, notifications, consents required for the transaction",
            "Confirm applicable regulators and authorities by jurisdiction",
            "Define submission strategy, sequencing and ownership",
            "Establish timetable aligned to signing, completion and LD1",
            "Gather required transaction, financial, operational and governance information",
            "Coordinate inputs from Legal, Finance, Risk, HR and other workstreams",
            "Work with in-country teams to gather inputs on local regulators, and support in-country submissions",
            "Draft regulatory applications, notifications and supporting materials",
            "Complete internal governance and legal review of submissions",
            "Obtain required executive and Board approvals before submission",
            "Submit applications and notifications within required timelines",
            "Track regulator questions, information requests and conditions",
            "Coordinate responses to regulator follow-up requests",
            "Maintain central regulatory approvals tracker",
            "Escalate risks to approval timelines or conditions precedent",
            "Critical dependency: Late or incomplete submissions could impact approval timelines, which put the transaction as a whole at risk"
          ]
        },
        {
          "name": "Policy comparison complete (4 weeks)",
          "activities": [
            "Define the regulatory and compliance policy perimeter relevant to the disposal",
            "Assess Absa and seller policies, standards and procedures",
            "Assess which policies and controls remain with the seller versus transfer with the business or assets",
            "Identify policy dependencies between retained and divested activities",
            "Assess whether disposal changes the seller's regulatory perimeter",
            "Identify gaps arising from removal of products, customers, systems or controls",
            "Assess impact on retained compliance obligations",
            "Document required policy or control changes"
          ]
        },
        {
          "name": "Continued regulatory reporting & engagement (8 weeks)",
          "activities": [
            "Confirm ongoing regulatory reporting obligations during the transaction",
            "Maintain regulatory engagement plan and contact map",
            "Prepare regular supervisory updates on transaction progress",
            "Coordinate responses to regulator queries",
            "Track commitments made to regulators",
            "Monitor conditions attached to regulatory approvals",
            "Provide updates on delivery against regulatory commitments",
            "Escalate material transaction risks or delays where disclosure is required",
            "Maintain evidence of regulatory correspondence and submissions",
            "Coordinate regulatory meetings and briefing materials",
            "Confirm ownership of ongoing reporting obligations post-LD1",
            "Ensure no reporting obligations are missed during cutover or transition"
          ]
        },
        {
          "name": "Continued programme advisory activities (8 weeks)",
          "activities": [
            "Provide regulatory and compliance advice to the Transaction Director and programme",
            "Review programme decisions for regulatory implications",
            "Advise workstreams on applicable policies, standards and regulatory requirements",
            "Assess compliance implications of TSA arrangements",
            "Support design of target-state processes",
            "Review proposed deviations from existing policy",
            "Support interpretation of regulatory requirements",
            "Assess regulatory implications of programme risks and issues",
            "Advise on conduct, customer and financial crime implications",
            "Review readiness evidence from a Compliance perspective",
            "Support escalation and remediation of compliance issues"
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
          "name": "De-registration of regulated employees (3 weeks)",
          "activities": [
            "Identify employees transferring out of regulated or certified roles",
            "Confirm applicable regulatory de-registration, licensing or certification requirements",
            "Ensured buyer completes 'fit and proper' or equivalent assessments",
            "Submit applications for de-registration within required timelines",
            "Track regulator responses and outstanding information requests",
            "Confirm employees are de-registered",
            "Maintain evidence of approvals and de-registrations"
          ]
        },
        {
          "name": "Compliance records and obligations handover (4 weeks)",
          "activities": [
            "Identify compliance records required by the buyer",
            "Confirm legal and regulatory constraints on data transfer",
            "Transfer relevant regulatory correspondence and approvals",
            "Confirm ownership of outstanding breaches and compliance issues",
            "Document retained Absa liabilities and responsibilities",
            "Complete formal handover of agreed compliance information",
            "Maintain evidence of handover and acceptance"
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
          "name": "Support buyer integration into compliance framework (4 weeks)",
          "activities": [
            "Provide the buyer with relevant compliance policies, controls and monitoring documentation",
            "Support buyer understanding of regulatory obligations",
            "Provide details of current compliance risk assessments",
            "Support mapping of the divested business into the buyer's compliance framework",
            "Support transition of compliance monitoring activities",
            "Support transfer of regulatory registers and inventories where appropriate",
            "Clarify seller responsibilities during any transitional period"
          ]
        },
        {
          "name": "License closure (8 weeks)",
          "activities": [
            "Identify Absa licences, permissions or registrations affected by the disposal",
            "Confirm whether licenses require amendment, variation or surrender",
            "Establish regulatory timetable",
            "Confirm customer and product obligations have closed",
            "Confirm reg reporting obligations are complete",
            "Prepare and submit license surrender docs",
            "Track regulator questions and conditions",
            "Confirm formal regulatory acknowledgement of license changes"
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
          "name": "Required regulatory approvals and change of controls submitted (8 weeks)",
          "activities": [
            "Identify all regulatory approvals, notifications, consents required for the transaction",
            "Confirm applicable regulators and authorities by jurisdiction",
            "Define submission strategy, sequencing and ownership",
            "Establish timetable aligned to signing, completion and LD1",
            "Gather required transaction, financial, operational and governance information",
            "Coordinate inputs from Legal, Finance, Risk, HR and other workstreams",
            "Work with in-country teams to gather inputs on local regulators, and support in-country submissions",
            "Draft regulatory applications, notifications and supporting materials",
            "Complete internal governance and legal review of submissions",
            "Obtain required executive and Board approvals before submission",
            "Submit applications and notifications within required timelines",
            "Track regulator questions, information requests and conditions",
            "Coordinate responses to regulator follow-up requests",
            "Maintain central regulatory approvals tracker",
            "Escalate risks to approval timelines or conditions precedent",
            "Critical dependency: Late or incomplete submissions could impact approval timelines, which put the transaction as a whole at risk"
          ]
        },
        {
          "name": "Standalone reg perimeter assessed (3 weeks)",
          "activities": [
            "Define the regulatory perimeter of the business being separated",
            "Identify licenses, permissions and registrations required post-sale",
            "Assess whether existing permissions remain valid following change of control",
            "Identify regulatory dependencies on the seller",
            "Assess reliance on seller policies, systems, controls or personnel",
            "Identify obligations that must transfer to the standalone entity",
            "Identify obligations that remain with the seller",
            "Document regulatory gaps requiring action before separation"
          ]
        },
        {
          "name": "Continued regulatory reporting & engagement (8 weeks)",
          "activities": [
            "Confirm ongoing regulatory reporting obligations during the transaction",
            "Maintain regulatory engagement plan and contact map",
            "Prepare regular supervisory updates on transaction progress",
            "Coordinate responses to regulator queries",
            "Track commitments made to regulators",
            "Monitor conditions attached to regulatory approvals",
            "Provide updates on delivery against regulatory commitments",
            "Escalate material transaction risks or delays where disclosure is required",
            "Maintain evidence of regulatory correspondence and submissions",
            "Coordinate regulatory meetings and briefing materials",
            "Confirm ownership of ongoing reporting obligations post-LD1",
            "Ensure no reporting obligations are missed during cutover or transition"
          ]
        },
        {
          "name": "Continued programme advisory activities (8 weeks)",
          "activities": [
            "Provide regulatory and compliance advice to the Transaction Director and programme",
            "Review programme decisions for regulatory implications",
            "Advise workstreams on applicable policies, standards and regulatory requirements",
            "Assess compliance implications of TSA arrangements",
            "Support design of target-state processes",
            "Review proposed deviations from existing policy",
            "Support interpretation of regulatory requirements",
            "Assess regulatory implications of programme risks and issues",
            "Advise on conduct, customer and financial crime implications",
            "Review readiness evidence from a Compliance perspective",
            "Support escalation and remediation of compliance issues"
          ]
        }
      ]
    }
  ],
  "sizingFactors": "",
  "sizingDrivers": ["Complex or opaque sale and purchase agreement (SPA)", "Significant contract novations required", "Significant uplift to Absa documentation or terms and conditions required", "Parties are not yet fully aligned on legal matters"],
  "partnerServices": [
    {
      "keyService": "SA regulatory submission drafting and tracking",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Local Regulatory submission oversight of regional spokes",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Approval timeline creation and assumptions",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Ongoing regulatory engagement to drive alignment and approval",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Programme advisory on compliance matters as the programme progresses",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Absa and target firm policy gap identification and remediation",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    }
  ]
};
