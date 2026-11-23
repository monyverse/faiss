/**
 * Human Capital SA Functional Spoke.
 *
 * All strings in this file are approved source content reproduced verbatim
 * from the Absa M&A Transaction Operating Model document. Do not summarise,
 * paraphrase or correct the wording.
 */

import type { SpokeContent } from "./spoke-content";

export const CONTENT: SpokeContent = {
  "id": "hr",
  "name": "Human Capital",
  "reference": "",
  "necessityRows": [
    {
      "archetype": "Balance Sheet Acquisition",
      "classification": "Not typically a standalone workstream",
      "rationale": "Balance sheet archetypes, by definition, do not include people transfer"
    },
    {
      "archetype": "Partial Business Acquisition",
      "classification": "Conditionally required",
      "rationale": "Conditional where partial archetypes create transferring and retained employee populations, consultation obligations, payroll and benefits decisions, and onboarding needs"
    },
    {
      "archetype": "Full Business Acquisition A (Buyer integrates the business)",
      "classification": "Core / Required",
      "rationale": "Required to integrate people, organisation design, reward, benefits, payroll, systems, training, culture and retention into Absa."
    },
    {
      "archetype": "Full Business Acquisition B (Buyer runs the business standalone)",
      "classification": "Core / Required",
      "rationale": "Required to stand up or retain a complete Human Capital operating model, payroll, benefits, policies, local people capability and employee governance."
    },
    {
      "archetype": "Balance Sheet Sale",
      "classification": "Not typically a standalone workstream",
      "rationale": "Balance sheet archetypes, by definition, do not include people transfer"
    },
    {
      "archetype": "Partial Business Sale",
      "classification": "Conditionally required",
      "rationale": "Conditional where partial archetypes create transferring and retained employee populations, consultation obligations, payroll and benefits decisions, and onboarding needs"
    },
    {
      "archetype": "Full Business Sale A (Buyer integrates the business)",
      "classification": "Core / Required",
      "rationale": "Required to support buyer-led people integration while managing Absa seller obligations, consultation, data transfer and residual employee risk."
    },
    {
      "archetype": "Full Business Sale B (Buyer runs the business as standalone)",
      "classification": "Core / Required",
      "rationale": "Required to execute full employee transfer or separation, buyer standalone people readiness, Absa exits and post-completion people obligations."
    }
  ],
  "keyRole": "Human Capital owns employee-transfer execution and people readiness, including terms, consultation, onboarding, payroll, benefits, reward, employee data, retention and people transition into BAU.",
  "responsibilities": [
    "Confirm employee perimeter, roles, grades, contracts, terms, benefits, reward, payroll, pensions, unions, mobility, wellness and consultation obligations.",
    "Bring employee legal into due diligence so Human Capital can plan transfer mechanics, consultation timing, S197 implications, CP dependencies and negotiation points early.",
    "Define people-transfer approach, organisational design, leadership appointments, retention interventions, reward / REM decisions and onboarding requirements.",
    "Plan and execute employee consultation, employee engagement, offer or transfer processes, union engagement and employee-data controls with Legal and Compliance.",
    "Stand up or transition payroll, pension, benefits, HR systems, manager readiness, training and day-one access for transferring employees.",
    "Coordinate strategic employee communications with Communications and Change",
    "Track employee acceptance, resignations, key-person risk, wellbeing, cultural adaptation and post-LD1 people issues."
  ],
  "boundaryItems": [
    "Legal owns legal interpretation of employment-transfer obligations, commercial provisions and CPs that affect people activity.",
    "Change Management owns adoption of new ways of working; Human Capital provides people expertise, employee readiness inputs and change impact detail.",
    "Communications / Marketing owns channels, tone and approval flow; Human Capital owns employee content and consultations",
    "Technology owns HR system access, employee data tooling and identity integration; Human Capital owns employee data requirements and people readiness"
  ],
  "centralHubRelationship": "Relationship with Central Hub: Human Capital owns people-transfer and HR readiness decisions and evidence while the Central Hub coordinates dependencies, decision timing, issue escalation and integration of people milestones into the wider programme plan.",
  "regionalRelationship": [
    "Regional Spokes should own local execution as a minimum, with ownership scaling based on maturity, including employee data, local consultation steps, unions, payroll and benefits inputs, employee engagement, wellbeing actions and local HR readiness where they have capacity and delegated authority.",
    "Function Authority retains people-transfer standards, consultation integrity, reward and REM decisions, central workforce planning, specialist HR support and execution ownership where regional maturity, capability or capacity is insufficient.",
    "As regional maturity increases, local ownership should expand from evidence and local nuance into consultation support, people-readiness execution and hypercare activity, with Function Authority retaining standards, specialist challenge and reserved approvals."
  ],
  "externalDependencies": "",
  "mandateRows": [
    {
      "id": "employee-perimeter-and-transfer-approach",
      "area": "Employee perimeter and transfer approach",
      "spokeAuthority": [
        "Defines Human Capital scope, people-transfer route, consultation plan, employee-data needs and people readiness evidence."
      ],
      "hubRole": "Tracks people milestones, dependencies and unresolved people risks in the integrated plan.",
      "regionalRole": "",
      "governance": "Human Capital, Legal, Compliance, business owner, Change, Communications and relevant country governance.",
      "escalation": "Employee population, transfer route, consultation trigger, union exposure or S197 impact is unclear."
    },
    {
      "id": "terms-reward-benefits-payroll-and-pensions",
      "area": "Terms, reward, benefits, payroll and pensions",
      "spokeAuthority": [
        "Approves reward / REM approach, benefits treatment, payroll stand-up, pension transition planning and employee offer inputs."
      ],
      "hubRole": "Coordinates cross-workstream timing and escalation where people items affect LD1 or completion.",
      "regionalRole": "",
      "governance": "Human Capital, Employment Legal, Finance & Tax, pension trustees/regulators where applicable.",
      "escalation": "Benefits are contractual or policy-based and need negotiation, pension approval delays activity, or payroll readiness is at risk."
    },
    {
      "id": "employee-communications-and-change",
      "area": "Employee communications and change",
      "spokeAuthority": [
        "Owns employee content, consultation integrity and people-readiness messaging inputs."
      ],
      "hubRole": "Coordinates message timing with programme milestones and approval gates.",
      "regionalRole": "",
      "governance": "Communications, Change Management, Legal, Human Capital and buyer/seller leadership.",
      "escalation": "Ownership between current employer, new employer, HR, Change and Communications is unclear."
    },
    {
      "id": "onboarding-systems-and-training",
      "area": "Onboarding, systems and training",
      "spokeAuthority": [
        "Confirms onboarding, HR systems, access, L&D, manager readiness and employee sign-off requirements."
      ],
      "hubRole": "Tracks readiness evidence and critical-path dependencies across Technology, Finance and Operations.",
      "regionalRole": "",
      "governance": "Technology, Finance & Tax, Learning, Operations, business owners and LD1 readiness governance.",
      "escalation": "Employee data transfer, system onboarding, payroll setup or training completion is not evidenced."
    },
    {
      "id": "retention-wellbeing-and-post-ld1-people-stability",
      "area": "Retention, wellbeing and post-LD1 people stability",
      "spokeAuthority": [
        "Defines retention, wellness, talent, organisational design and post-LD1 people monitoring actions."
      ],
      "hubRole": "Maintains issue escalation and links people risk to programme readiness and hypercare.",
      "regionalRole": "",
      "governance": "Human Capital, business leadership, Change, Risk and post-LD1 BAU governance.",
      "escalation": "Key people resign, employee sentiment deteriorates, handovers are weak or people work remains side-of-desk."
    }
  ],
  "capabilityRows": [
    {
      "category": "Specific Project Manager required?",
      "content": "Yes - Needed to run weekly agendas, specialist inputs, buyer check-ins, handover documentation, wellness and retention through a long transaction"
    },
    {
      "category": "Baseline capabilities",
      "content": "Transferring employee consultation management (e.g., S197), employee communications, reward and REM, benefits management, employment legal, payroll set up, wellness management, retention strategy, employee training design and delivery, change impact assessments"
    },
    {
      "category": "Incremental capabilities by deal archetype / complexity",
      "content": "Employee data transfer, HR system knowledge (e.g., Oracle, Workday, etc), pension fund transfer, retained obligations management, conflict resolutions, grievance processes"
    },
    {
      "category": "Specialist capabilities triggered by deal characteristics",
      "content": "Physical employee transfer capabilities (e.g., physical onboarding, CRES synergies), regional regulatory nuances, union negotiations"
    }
  ],
  "milestoneIntro": [
    "The key milestones below are organised as a baseline set, with additional milestones required for more complex deal archetypes split out below as required.",
    "As deal archetypes scale from balance sheet to partial business to full business, each baseline activity should be assessed against the complexity factors laid out in the deal archetype documentation.",
    "Service catalogue:"
  ],
  "serviceCatalogue": [
    "Employee perimeter and data assessment",
    "Employment legal DD support",
    "Consultation planning and execution",
    "Organisational design and Reward / REM, benefits, payroll and pension transition",
    "Resource management - project and BAU continuity planning",
    "Cultural alignment and harmonisation",
    "Employee communications inputs (alongside Comms & Change)",
    "Training and employee readiness coordination",
    "Onboarding, training, payroll, HR systems and access readiness",
    "Retention, wellness and post-LD1 people monitoring"
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
          "name": "Human Capital mobilisation and employee scope confirmed (3 weeks)",
          "activities": [
            "Identify employees, contractors, managers, specialist roles, key people and country populations affected by the deal.",
            "Confirm whether unions, S197, consultation, payroll, benefits, pension or employee-data activities are triggered.",
            "Assign dedicated Human Capital workstream lead and PM support where deal scale requires it."
          ]
        },
        {
          "name": "Employment legal due diligence completed (5 weeks)",
          "activities": [
            "Bring employee legal into DD to identify transfer obligations, CP dependencies, employee terms and negotiation points.",
            "Review contracts, policies, reward / REM, benefits, discounted banking products, pension arrangements and employee liabilities.",
            "Identify whether employees are union members and whether local consultation or regulator involvement is required."
          ]
        },
        {
          "name": "Consultation and employee communications plan agreed and executed (6 weeks)",
          "activities": [
            "Define consultation steps, employee engagement route, leadership briefings and approval timing.",
            "Agree with Change and Communications whether the current employer or new employer leads each communication.",
            "Prepare strategic employee communications for late-stage uncertainty, wellness, retention and cutover emotion.",
            "Execute and track consultations, assessing employee reactions and adapting where required",
            "Hold individual one-to-one meetings where required to explain contract, level, and benefits",
            "Work with seller to collate employee questions, and set up FAQs, as well as regular townhalls structured around a question theme"
          ]
        },
        {
          "name": "Cultural alignment analysis and remediation plan complete (4 weeks)",
          "activities": [
            "Assess key cultural differences between Absa and seller, and impact on operating model",
            "Define remediation activities such as training, townhalls, one-to-one meetings, and social sessions",
            "Sequence, plan, and execute remediation activities, and conduct pulse surveys to track impact"
          ]
        },
        {
          "name": "Payroll, benefits, pension and employee-data readiness planned (8 weeks)",
          "activities": [
            "Define payroll stand-up or transition requirements, banking policy benefits, contractual benefits and reward decisions.",
            "Confirm pension fund approval requirements and earliest permissible employee communication or process start date.",
            "Agree employee data transfer requirements with Technology, including completeness, accuracy, privacy and system onboarding needs."
          ]
        },
        {
          "name": "Organisational design complete (4 weeks)",
          "activities": [
            "Work with business and functional areas to discuss leveling and role cards for incoming employees",
            "Map these roles into existing Absa structures and define reporting lines",
            "Socialise these with both incoming employees and managers, and iterate where significant issues arise",
            "Define the approach to transferring portfolios of client facing employees: kept as-is, adapted, or merged into Absa portfolios"
          ]
        },
        {
          "name": "Onboarding, training and people readiness evidenced (6 weeks)",
          "activities": [
            "Plan system onboarding, manager readiness, L&D compliance, functional training and technical training.",
            "Track employee sign-offs, acceptance, resignations, key-person risks and readiness evidence.",
            "Confirm Human Capital inputs to LD1 readiness and post-LD1 people monitoring"
          ]
        },
        {
          "name": "Employee data, systems and finance dependencies managed (6 weeks)",
          "activities": [
            "Coordinate employee data extraction, masking or unmasked data submission with Legal, Compliance and Technology.",
            "Align payroll and employee-cost treatment with Finance & Tax, including any Completion Statement or booking impacts.",
            "Escalate system onboarding or employee data issues before they affect training or day-one access."
          ]
        },
        {
          "name": "Post-LD1 people stability monitored (4 weeks)",
          "activities": [
            "Monitor attrition, employee sentiment, capability gaps, payroll errors, benefits issues and onboarding defects.",
            "Resolve people risks through hypercare with HR, Change, Communications, Technology and Finance.",
            "Transfer residual people actions to BAU HR owners after stabilisation."
          ]
        }
      ]
    },
    {
      "id": "full-business-acquisition-a-integrated",
      "heading": "Full Business Acquisition A (integrated) - further additional activities",
      "tab": "Full Business Acquisition A (integrated)",
      "milestones": [
        {
          "name": "Integrated organisation and leadership model approved (5 weeks)",
          "activities": [
            "Design the integrated organisation, leadership appointments, role mapping, spans, grades and reporting lines.",
            "Agree retention and talent interventions for critical roles and key-person dependencies.",
            "Confirm cultural integration and team adaptation activities with Change Management."
          ]
        },
        {
          "name": "Terms, reward, benefits and payroll migration executed (8 weeks)",
          "activities": [
            "Map employees onto Absa terms, reward, payroll, benefits, pension and HR policy arrangements.",
            "Negotiate or remediate contractual and policy benefits, including banking benefits where relevant.",
            "Complete payroll, HR system, access and employee record migration before LD1."
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
          "name": "Standalone Human Capital operating model designed (5 weeks)",
          "activities": [
            "Define standalone HR organisation, policies, committees, vendor support, employee relations and payroll operating model.",
            "Confirm local HR capability, outsourced support, employment legal support and regulatory-relations expertise required before LD1.",
            "Agree how central standards will apply to standalone country or business HR execution."
          ]
        },
        {
          "name": "Payroll, pension and benefits infrastructure stood up (8 weeks)",
          "activities": [
            "Build or transition payroll, pension, benefits, HRIS, employee records, access, reporting and controls.",
            "Obtain pension fund or regulatory approvals needed before employee transition processes can begin.",
            "Complete data migration and reconciliation for employee records and payroll-ready information."
          ]
        },
        {
          "name": "Standalone people policies and capability embedded (6 weeks)",
          "activities": [
            "Stand up policies, handbooks, employee relations, wellness, talent, reward, learning and onboarding processes.",
            "Train local HR, managers and employees on the standalone ways of working.",
            "Confirm employee communications, consultation evidence and BAU HR governance are operational."
          ]
        },
        {
          "name": "People readiness and BAU handover completed (4 weeks)",
          "activities": [
            "Evidence employee onboarding, manager readiness, payroll readiness, benefits readiness and support model readiness.",
            "Monitor post-LD1 people issues through a dedicated hypercare cadence.",
            "Close Human Capital programme actions only when BAU HR owners have accepted residual obligations."
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
          "name": "Retained and transferring workforce split executed (8 weeks)",
          "activities": [
            "Map employees to buyer, retained Absa, TSA support, redeployment or exit categories.",
            "Confirm management structures, reporting lines and retained capability for Absa after separation.",
            "Manage union, consultation and employee relations implications of the partial sale."
          ]
        },
        {
          "name": "Seller and buyer responsibilities agreed (5 weeks)",
          "activities": [
            "Confirm whether buyer leads change for transferring employees and what seller-side change remains with Absa.",
            "Agree employee communications ownership between current employer, new employer, HR, Change and Communications.",
            "Track buyer onboarding and Absa retained team readiness through joint governance."
          ]
        },
        {
          "name": "Payroll, benefits and pension split managed (8 weeks)",
          "activities": [
            "Separate payroll, benefits, pension, reward and employee data between transferring and retained populations.",
            "Resolve contractual and policy benefits that need buyer negotiation or Absa residual treatment.",
            "Confirm regulatory or pension fund approvals before dependent activities begin."
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
          "name": "Buyer-led people integration supported (6 weeks)",
          "activities": [
            "Provide employee data, consultation evidence and transition inputs needed for buyer integration where permitted.",
            "Track buyer onboarding, payroll, systems, training and employee support readiness.",
            "Escalate buyer readiness gaps that could create Absa residual employee risk."
          ]
        },
        {
          "name": "Absa seller-side change and retained obligations managed (4 weeks)",
          "activities": [
            "Run seller-side change for retained Absa teams, TSA support teams and leaders affected by the divestment.",
            "Manage morale, wellness, retention and knowledge-transfer risk around cutover.",
            "Close retained Absa HR actions after buyer integration stabilises."
          ]
        },
        {
          "name": "Post-transfer people support transitioned (4 weeks)",
          "activities": [
            "Track employee queries, payroll issues, benefits issues, employee relations matters and residual commitments after LD1.",
            "Transfer open items to buyer, Absa BAU or post-completion obligation owners.",
            "Archive Human Capital evidence for legal, audit and regulatory purposes."
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
          "name": "Complete people separation route executed (8 weeks)",
          "activities": [
            "Transfer or exit the full employee population, including managers, HR support, payroll, benefits, pensions and employee records.",
            "Confirm buyer standalone HR model can operate without Absa programme support.",
            "Resolve union, consultation, regulatory and pension dependencies before completion or LD1."
          ]
        },
        {
          "name": "Buyer standalone Human Capital handover completed (4 weeks)",
          "activities": [
            "Transfer permitted employee documentation, onboarding evidence, policies, issue logs and open people commitments to the buyer.",
            "Support buyer set-up of payroll, benefits, HR systems, learning, wellness and employee relations where agreed.",
            "Confirm local country execution and outsourced specialist support are no longer dependent on Absa."
          ]
        },
        {
          "name": "Absa people exit and wind-down completed (8 weeks)",
          "activities": [
            "Close Absa employee communications, redeployment, retained-team change and TSA staffing obligations.",
            "Monitor claims, disputes, payroll corrections, benefit true-ups and post-completion commitments.",
            "Close the Human Capital workstream when all residual people obligations have named BAU or buyer owners."
          ]
        }
      ]
    }
  ],
  "sizingFactors": "",
  "sizingDrivers": ["Significant employee transfer from seller to buyer or buyer to seller", "Multi-jurisdictional employee transfer", "Complex reward packages", "Very different organisational cultures"],
  "partnerServices": [
    {
      "keyService": "Employee perimeter and data assessment",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Employment legal DD support",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Consultation planning and execution",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Organisational design and Reward / REM, benefits, payroll and pension transition",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Resource management - project and BAU continuity planning",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Cultural alignment and harmonisation",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Employee communications inputs (alongside Comms & Change)",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Training and employee readiness coordination",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Onboarding, training, payroll, HR systems and access readiness",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Retention, wellness and post-LD1 people monitoring",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    }
  ]
};
