/**
 * Change Management SA Functional Spoke.
 *
 * All strings in this file are approved source content reproduced verbatim
 * from the Absa M&A Transaction Operating Model document. Do not summarise,
 * paraphrase or correct the wording.
 */

import type { SpokeContent } from "./spoke-content";

export const CONTENT: SpokeContent = {
  "id": "change-management",
  "name": "Change Management",
  "reference": "",
  "necessityRows": [
    {
      "archetype": "Balance Sheet Acquisition",
      "classification": "Not typically a standalone workstream",
      "rationale": "Embedded because the underlying activity normally sits within Central Hub, HR, Communications / Marketing or impacted business teams"
    },
    {
      "archetype": "Partial Business Acquisition",
      "classification": "Core / Required",
      "rationale": "Core because of required adoption of new processes, controls, roles, servicing models and organisational ways of working"
    },
    {
      "archetype": "Full Business Acquisition A (Buyer integrates the business)",
      "classification": "Core / Required",
      "rationale": "Core because of required adoption of new processes, controls, roles, servicing models and organisational ways of working"
    },
    {
      "archetype": "Full Business Acquisition B (Buyer runs the business standalone)",
      "classification": "Required but scaled",
      "rationale": "Required at lower intensity because business readiness and colleague understanding need managed adoption, even when little business process change is present"
    },
    {
      "archetype": "Balance Sheet Sale",
      "classification": "Not typically a standalone workstream",
      "rationale": "Embedded because the underlying activity normally sits within Central Hub, HR, Communications / Marketing or impacted business teams"
    },
    {
      "archetype": "Partial Business Sale",
      "classification": "Core / Required",
      "rationale": "Core because of required adoption of new processes, controls, roles, servicing models and organisational ways of working"
    },
    {
      "archetype": "Full Business Sale A (Buyer integrates the business)",
      "classification": "Core / Required",
      "rationale": "Core because of required adoption of new processes, controls, roles, servicing models and organisational ways of working"
    },
    {
      "archetype": "Full Business Sale B (Buyer runs the business as standalone)",
      "classification": "Required but scaled",
      "rationale": "Required at lower intensity because business readiness and colleague understanding need managed adoption, even when little business process change is present"
    }
  ],
  "keyRole": "Owns the business change approach needed to embed new or separated ways of working across impacted teams.",
  "responsibilities": [
    "Conduct change impact assessments across roles, processes, controls, systems, clients and country teams.",
    "Define the change strategy, adoption plan, training needs, engagement approach and business-readiness evidence.",
    "Support HR with organisational impacts and Communications / Marketing with change narrative and stakeholder messaging.",
    "Coordinate readiness interventions for teams adopting new processes, systems, hand-offs or control routines.",
    "Measure adoption during testing, LD1 readiness and hypercare; drive corrective actions where take-up is weak.",
    "Drive broader programme morale and sentiment"
  ],
  "boundaryItems": [
    "HR owns employment terms, consultation, onboarding and people-transfer obligations.",
    "Communications / Marketing owns messaging channels and approved client content.",
    "Operations & Servicing and Product own process and proposition design; Change owns adoption and behavioural readiness.",
    "Change should hand over to business-unit change managers where available, and HR teams in other circumstances at the end of the programme"
  ],
  "centralHubRelationship": "Relationship with Central Hub: the SA Functional Spoke owns change adoption decisions and evidence while the Central Hub sets programme standards, coordinates dependencies and escalates transaction-wide issues.",
  "regionalRelationship": [
    "Regional Spokes should own local execution as a minimum, with ownership scaling based on maturity, including local change impacts, stakeholder engagement, training coordination, adoption activity, sentiment monitoring and issue resolution where they have capacity and delegated authority.",
    "Function Authority retains change strategy, methodology, adoption standards, leadership narrative, central challenge and execution support where regional maturity, capability or capacity is insufficient.",
    "As regional maturity increases, local ownership should expand from input and capacity support into delivery of change interventions, adoption evidence and handover activity, with Function Authority retaining central standards and specialist support."
  ],
  "externalDependencies": "",
  "mandateRows": [
    {
      "id": "change-impact-severity",
      "area": "Change impact severity",
      "spokeAuthority": [
        "Owns assessment and intervention design"
      ],
      "hubRole": "Challenges transaction-wide impact and priorities",
      "regionalRole": "",
      "governance": "Business sponsor approval for major interventions",
      "escalation": "Material adoption gap or local resistance"
    },
    {
      "id": "training-and-adoption-plan",
      "area": "Training and adoption plan",
      "spokeAuthority": [
        "Defines required interventions"
      ],
      "hubRole": "Tracks readiness dependencies",
      "regionalRole": "",
      "governance": "Functional AE and HR approval where role impact exists",
      "escalation": "Training not complete or critical population not reached"
    },
    {
      "id": "business-readiness-evidence",
      "area": "Business readiness evidence",
      "spokeAuthority": [
        "Recommends readiness status"
      ],
      "hubRole": "Integrates evidence into go/no-go pack",
      "regionalRole": "",
      "governance": "Programme governance for LD1 readiness",
      "escalation": "Unresolved readiness gaps in critical business teams"
    },
    {
      "id": "post-ld1-reinforcement",
      "area": "Post-LD1 reinforcement",
      "spokeAuthority": [
        "Defines sustainment actions"
      ],
      "hubRole": "Coordinates cross-workstream actions",
      "regionalRole": "",
      "governance": "BAU business owner approval",
      "escalation": "Recurring defects, low adoption or colleague confusion"
    }
  ],
  "capabilityRows": [
    {
      "category": "Specific project manager required",
      "content": "No, Change resources usually well-versed in Project Management"
    },
    {
      "category": "Baseline capabilities",
      "content": "Change impact assessment; Stakeholder engagement; Adoption measurement; Training needs analysis; Readiness intervention design"
    },
    {
      "category": "Incremental capabilities by deal archetype / complexity",
      "content": "Target operating model adoption; Organisational redesign; Large-scale country engagement and post-merger integration."
    },
    {
      "category": "Specialist capabilities triggered by deal characteristics",
      "content": "Employee-transfer adoption; Works council coordination support; Cultural integration; Complex behavioural-risk management."
    }
  ],
  "milestoneIntro": [
    "The key milestones below are organised by as a baseline set, with additional milestones required for more complex deal archetypes split out below as required.",
    "As deal archetypes scale up in size / complexity (Balance Sheet 🡪 Partial 🡪 Full), each baseline activity should be assessed against the Complexity Factors laid out in the Deal Archetypes documentation, and assessed for whether its size or scope increases as a result of deal specifics."
  ],
  "serviceCatalogue": [
    "Change Strategy & Governance",
    "Stakeholder & Leadership Management",
    "Change Impact & Readiness",
    "Communications & Engagement",
    "People Transition, Training & Onboarding",
    "Organisation, Culture & Ways of Working",
    "Adoption, Stabilisation & Handover"
  ],
  "activitySets": [
    {
      "id": "balance-sheet-acquisition",
      "heading": "Balance Sheet Acquisition - baseline activities",
      "tab": "Balance Sheet Acquisition",
      "milestones": [
        {
          "name": "Establish Change Management framework and approach (5 weeks)",
          "activities": [
            "Define change management objectives, scope and principles for the transaction",
            "Confirm Change Management roles, responsibilities and governance",
            "Identify interfaces with HR, Communications, Technology, Operations and other workstreams",
            "Agree change methodology, tools and templates",
            "Establish change reporting, RAID and escalation routes",
            "Define key change milestones and integrate them into the programme plan",
            "Establish approach to measuring change readiness and adoption."
          ]
        },
        {
          "name": "Assess programme team effectiveness and health (4 weeks)",
          "activities": [
            "Establish programme health assessment approach",
            "Assess programme team understanding of transaction objectives and priorities",
            "Identify collaboration or ways-of-working issues across workstreams",
            "Define onboarding materials to drive programme alignment",
            "Reassess programme health and track agreed interventions"
          ]
        },
        {
          "name": "Leadership alignment and stakeholder engagement for change impact assessment (6 weeks)",
          "activities": [
            "Identify and segment stakeholders",
            "Conduct stakeholder mapping assessment",
            "Identify accountable leaders and sponsors",
            "Align leadership on rationale, outcomes and messages",
            "Agree leadership roles in communicating and sponsoring the change",
            "Conduct stakeholder interviews and workshops to surface concerns",
            "Establish stakeholder engagement plan and cadence",
            "Track sentiment, issues and resistance"
          ]
        },
        {
          "name": "Detailed change impact assessment and change plan aligned to all workstreams (6 weeks)",
          "activities": [
            "Define change impact assessment methodology",
            "Gather impacts from each functional workstream",
            "Assess impacts across people, process, organisation, technology, and ways of working",
            "Identify impacted stakeholder populations",
            "Assess severity, timing and readiness",
            "Identify dependencies between impacts and milestones",
            "Consolidate into an enterprise change impact assessment",
            "Define mitigating interventions",
            "Develop integrated change plan aligned to milestones"
          ]
        },
        {
          "name": "Ongoing internal communications (8 weeks)",
          "activities": [
            "Develop transaction communications strategy and plan algonside Comms / Marketing",
            "Develop transaction narrative and key messages",
            "Establish communications approval and governance process",
            "Create communication calendar aligned to transaction milestones",
            "Prepare leadership communications, FAQs and employee updates",
            "Coordinate communications with HR, Legal and IR",
            "Deliver milestone-specific communications",
            "Monitor employee feedback"
          ]
        },
        {
          "name": "Change network and support model established (3 weeks)",
          "activities": [
            "Define required change network structure",
            "Identify change champions or representatives",
            "Define roles, responsibilities and expectations",
            "Onboard and brief change network members",
            "Establish regular change network forums and information flows",
            "Equip change champions with communication and engagement materials",
            "Establish channels for employee questions and feedback",
            "Define escalation and support routes"
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
          "name": "Team integration - buyer and seller - support for HR consultations (6 weeks)",
          "activities": [
            "Identify transferring and retained employee populations",
            "Map buyer and seller organisational structures alongside HR",
            "Assess differences in ways of working, policies, culture",
            "Support HR in developing employee consultation and engagement approach",
            "Align transaction messaging with formal HR consultation requirements",
            "Prepare leaders and line managers for employee conversations",
            "Facilitate team introductions sessions",
            "Define team integration activities for transferring employees",
            "Identify and manage employee concerns and retention risks",
            "Support establishment of new team structures and ways of working"
          ]
        },
        {
          "name": "Onboarding and training for LD1 (6 weeks)",
          "activities": [
            "Identify employee populations requiring onboarding or training",
            "Define Day 1 knowledge, capability and behavioural requirements",
            "Conduct training needs analysis",
            "Develop onboarding journey for transferring employees",
            "Develop training materials, user guides",
            "Coordinate training delivery with workstreams",
            "Track training completion",
            "Establish Day 1 support mechanisms",
            "Validate employee readiness before LD1",
            "Capture and address post-training gaps",
            "Critical dependency: cutover may be impacted if critical client facing or technology employees cannot function at Business Day 1"
          ]
        }
      ]
    },
    {
      "id": "full-business-acquisition-a-integrated",
      "heading": "Full Business Acquisition A (integrated) - further additional activities",
      "tab": "Full Acquisition A (integrated)",
      "lead": "The above, with the addition of",
      "milestones": [
        {
          "name": "Post cutover change management plan (8 weeks)",
          "activities": [
            "Confirm post-cutover change priorities and impacted populations",
            "Develop post-cutover engagement and communications plan",
            "Define post-cutover training and refresher requirements",
            "Establish enhanced employee support and escalation mechanisms",
            "Monitor adoption of new processes, systems and ways of working",
            "Track employee sentiment and change-related issues",
            "Coordinate remediation with functional workstreams"
          ]
        },
        {
          "name": "Continued change initiatives and cultural alignment check-ins (8 weeks)",
          "activities": [
            "Define desired cultural and behavioural outcomes for the integrated organisation",
            "Conduct alignment workshops and interventions",
            "Monitor engagement and sentiment across organisations",
            "Assess effectiveness of new team structures and ways of working",
            "Identify integration or collaboration issues between Absa and acquired teams",
            "Develop targeted interventions for areas of cultural friction",
            "Conduct periodic health checks",
            "Work with broader Absa Change Team to reinforce common organisational identity, purpose and priorities"
          ]
        },
        {
          "name": "Operating model and ways of working adoption (8 weeks)",
          "activities": [
            "Translate target operating model changes into employee impacts",
            "Clarify new roles, responsibilities and decision rights",
            "Embed new governance routines",
            "Support adoption of Absa policies, processes and controls",
            "Assess adherence to new ways of working",
            "Identify and address seller practices which continue after integration",
            "Transition adoption ownership to functional and business leaders"
          ]
        }
      ]
    },
    {
      "id": "full-business-acquisition-b-standalone",
      "heading": "Full Business Acquisition B (standalone) - new activity set",
      "tab": "Full Acquisition B (standalone)",
      "lead": "Standalone:",
      "milestones": [
        {
          "name": "Establish Change Management framework and approach (5 weeks)",
          "activities": [
            "Define change management objectives, scope and principles for the transaction",
            "Confirm Change Management roles, responsibilities and governance",
            "Identify interfaces with HR, Communications, Technology, Operations and other workstreams",
            "Agree change methodology, tools and templates",
            "Establish change reporting, RAID and escalation routes",
            "Define key change milestones and integrate them into the programme plan",
            "Establish approach to measuring change readiness and adoption."
          ]
        },
        {
          "name": "Assess programme team effectiveness and health (4 weeks)",
          "activities": [
            "Establish programme health assessment approach",
            "Assess programme team understanding of transaction objectives and priorities",
            "Identify collaboration or ways-of-working issues across workstreams",
            "Define onboarding materials to drive programme alignment",
            "Reassess programme health and track agreed interventions"
          ]
        },
        {
          "name": "Leadership alignment and stakeholder engagement for change impact assessment (6 weeks)",
          "activities": [
            "Identify and segment stakeholders",
            "Conduct stakeholder mapping assessment",
            "Identify accountable leaders and sponsors",
            "Align leadership on rationale, outcomes and messages",
            "Agree leadership roles in communicating and sponsoring the change",
            "Conduct stakeholder interviews and workshops to surface concerns",
            "Establish stakeholder engagement plan and cadence",
            "Track sentiment, issues and resistance"
          ]
        },
        {
          "name": "Ongoing internal communications (8 weeks)",
          "activities": [
            "Develop transaction communications strategy and plan algonside Comms / Marketing",
            "Develop transaction narrative and key messages",
            "Establish communications approval and governance process",
            "Create communication calendar aligned to transaction milestones",
            "Prepare leadership communications, FAQs and employee updates",
            "Coordinate communications with HR, Legal and IR",
            "Deliver milestone-specific communications"
          ]
        },
        {
          "name": "Standalone organisational readiness (4 weeks)",
          "activities": [
            "Identify employee impacts arising from the ownership transition to Absa",
            "Assess changes to leadership, governance and reporting",
            "Identify impacts arising from TSA arrangements or separation",
            "Identify populations requiring targeted onboarding",
            "Define LD1 readiness criteria for Change Management",
            "Assess employee and leadership readiness",
            "Establish Day 1 employee support and escalation routes"
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
          "name": "Establish Change Management framework and approach (5 weeks)",
          "activities": [
            "Define change management objectives, scope and principles for the transaction",
            "Confirm Change Management roles, responsibilities and governance",
            "Identify interfaces with HR, Communications, Technology, Operations and other workstreams",
            "Agree change methodology, tools and templates",
            "Establish change reporting, RAID and escalation routes",
            "Define key change milestones and integrate them into the programme plan",
            "Establish approach to measuring change readiness and adoption."
          ]
        },
        {
          "name": "Assess programme team effectiveness and health (4 weeks)",
          "activities": [
            "Establish programme health assessment approach",
            "Assess programme team understanding of transaction objectives and priorities",
            "Identify collaboration or ways-of-working issues across workstreams",
            "Define onboarding materials to drive programme alignment",
            "Reassess programme health and track agreed interventions"
          ]
        },
        {
          "name": "Leadership alignment and stakeholder engagement for change impact assessment (6 weeks)",
          "activities": [
            "Identify and segment stakeholders",
            "Conduct stakeholder mapping assessment",
            "Identify accountable leaders and sponsors",
            "Align leadership on rationale, outcomes and messages",
            "Agree leadership roles in communicating and sponsoring the change",
            "Conduct stakeholder interviews and workshops to surface concerns",
            "Establish stakeholder engagement plan and cadence",
            "Track sentiment, issues and resistance"
          ]
        },
        {
          "name": "Detailed change impact assessment and change plan aligned to all workstreams (6 weeks)",
          "activities": [
            "Define change impact assessment methodology",
            "Gather impacts from each functional workstream",
            "Assess impacts across people, process, organisation, technology, and ways of working",
            "Identify impacted stakeholder populations",
            "Assess severity, timing and readiness",
            "Identify dependencies between impacts and milestones",
            "Consolidate into an enterprise change impact assessment",
            "Define mitigating interventions",
            "Develop integrated change plan aligned to milestones"
          ]
        },
        {
          "name": "Ongoing internal communications (8 weeks)",
          "activities": [
            "Develop transaction communications strategy and plan algonside Comms / Marketing",
            "Develop transaction narrative and key messages",
            "Establish communications approval and governance process",
            "Create communication calendar aligned to transaction milestones",
            "Prepare leadership communications, FAQs and employee updates",
            "Coordinate communications with HR, Legal and IR",
            "Deliver milestone-specific communications",
            "Monitor employee feedback"
          ]
        },
        {
          "name": "Change network and support model established (3 weeks)",
          "activities": [
            "Define required change network structure",
            "Identify change champions or representatives",
            "Define roles, responsibilities and expectations",
            "Onboard and brief change network members",
            "Establish regular change network forums and information flows",
            "Equip change champions with communication and engagement materials",
            "Establish channels for employee questions and feedback",
            "Define escalation and support routes"
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
          "name": "Employee separation and transfer support (6 weeks)",
          "activities": [
            "Identify transferring, retained and impacted employees",
            "Confirm employee perimeter",
            "Map seller and buyer org structures",
            "Support HR consultation and employee transfer processes",
            "Align Change Management activities with consultation requirements",
            "Prepare leaders and line managers",
            "Develop targeted engagement plans for transferring and retained employees",
            "Identify and manage employee concerns",
            "Identify retention risks for critical employees",
            "Coordinate messaging between Absa, buyer and HR teams",
            "Support employee handover activities ahead of LD1"
          ]
        },
        {
          "name": "Absa and buyer team transition (6 weeks)",
          "activities": [
            "Define changes to relationships and responsibilities",
            "Establish transition arrangements between buyer and Absa teams",
            "Facilitate introductions and knowledge-transfer",
            "Identify dependencies requiring continued Absa support",
            "Define TSA-related people",
            "Support transition from Absa-led to buyer-led management"
          ]
        },
        {
          "name": "Separation readiness for LD1 assessment (4 weeks)",
          "activities": [
            "Define Day 1 knowledge requirements",
            "Identify changes to systems, processes, policies and access affecting employees",
            "Develop training and guidance",
            "Develop employee Day 1 packs, FAQs",
            "Coordinate training with HR, Technology and functional workstreams",
            "Track completion of required training and communications",
            "Assess employee understanding of Day 1 arrangements",
            "Confirm support and escalation channels",
            "Validate employee readiness before LD1",
            "Critical dependency: cutover may be impacted if critical client facing or technology employees cannot function at Business Day 1"
          ]
        }
      ]
    },
    {
      "id": "full-business-sale-a-buyer-integrates",
      "heading": "Full Business Sale A (buyer integrates) - further additional divestment activities",
      "tab": "Full Sale A (buyer integrates)",
      "lead": "The above, with the addition of,",
      "milestones": [
        {
          "name": "Post-cutover transition and change support (8 weeks)",
          "activities": [
            "Confirm post-LD1 Absa Change Management responsibilities",
            "Identify residual employee impacts",
            "Refresh change impact assessment following cutover",
            "Identify outstanding separation and adoption risks",
            "Develop post-cutover communications and engagement plan",
            "Maintain employee support and escalation mechanisms during transition",
            "Coordinate remaining change activities with the buyer",
            "Monitor Absa-side TSA and transition impacts",
            "Define criteria for ending Absa-led Change Management support",
            "Transition residual responsibilities to buyer"
          ]
        },
        {
          "name": "Organisational separation complete (4 weeks)",
          "activities": [
            "Identify cultural dependencies between divested and retained businesses",
            "Assess impact of separating long-standing teams or functions",
            "Reinforce organisational identity for retained employees",
            "Support leadership in reinforcing organisational identity",
            "Monitor engagement and sentiment during the integration",
            "Close Absa-led interventions once responsibility transfers to the buyer"
          ]
        }
      ]
    },
    {
      "id": "full-business-sale-b-standalone",
      "heading": "Full Business Sale B (standalone) - complete divestment activity set",
      "tab": "Full Sale B (standalone)",
      "milestones": [
        {
          "name": "Establish Change Management framework and approach (5 weeks)",
          "activities": [
            "Define change management objectives, scope and principles for the transaction",
            "Confirm Change Management roles, responsibilities and governance",
            "Identify interfaces with HR, Communications, Technology, Operations and other workstreams",
            "Agree change methodology, tools and templates",
            "Establish change reporting, RAID and escalation routes",
            "Define key change milestones and integrate them into the programme plan",
            "Establish approach to measuring change readiness and adoption."
          ]
        },
        {
          "name": "Leadership alignment and stakeholder engagement for change impact assessment (6 weeks)",
          "activities": [
            "Identify and segment stakeholders",
            "Conduct stakeholder mapping assessment",
            "Identify accountable leaders and sponsors",
            "Align leadership on rationale, outcomes and messages",
            "Agree leadership roles in communicating and sponsoring the change",
            "Conduct stakeholder interviews and workshops to surface concerns",
            "Establish stakeholder engagement plan and cadence",
            "Track sentiment, issues and resistance"
          ]
        },
        {
          "name": "Detailed change impact assessment and change plan aligned to all workstreams (6 weeks)",
          "activities": [
            "Define change impact assessment methodology",
            "Gather impacts from each functional workstream",
            "Assess impacts across people, process, organisation, technology, and ways of working",
            "Identify impacted stakeholder populations",
            "Assess severity, timing and readiness",
            "Identify dependencies between impacts and milestones",
            "Consolidate into an enterprise change impact assessment",
            "Define mitigating interventions",
            "Develop integrated change plan aligned to milestones"
          ]
        },
        {
          "name": "Ongoing internal communications (8 weeks)",
          "activities": [
            "Develop transaction communications strategy and plan algonside Comms / Marketing",
            "Develop transaction narrative and key messages",
            "Establish communications approval and governance process",
            "Create communication calendar aligned to transaction milestones",
            "Prepare leadership communications, FAQs and employee updates",
            "Coordinate communications with HR, Legal and IR",
            "Deliver milestone-specific communications",
            "Monitor employee feedback"
          ]
        },
        {
          "name": "Employee separation and transfer support (6 weeks)",
          "activities": [
            "Identify transferring, retained and impacted employees",
            "Confirm employee perimeter",
            "Map seller and buyer org structures",
            "Support HR consultation and employee transfer processes",
            "Align Change Management activities with consultation requirements",
            "Prepare leaders and line managers",
            "Develop targeted engagement plans for transferring and retained employees",
            "Identify and manage employee concerns",
            "Identify retention risks for critical employees",
            "Coordinate messaging between Absa, buyer and HR teams",
            "Support employee handover activities ahead of LD1"
          ]
        }
      ]
    }
  ],
  "sizingFactors": "",
  "sizingDrivers": ["Scale and complexity of change Absa must undergo to buy or sell the business", "Scale of employee transfer", "Whether redundancies are likely", "Level of cultural alignment between Absa and the acquisition target/buyer", "Broader impact on the bank of selling/buying this business related to shifting operating models or ways of working"],
  "partnerServices": [
    {
      "keyService": "Change Strategy & Governance",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Stakeholder & Leadership Management",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Change Impact & Readiness",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Communications & Engagement",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "People Transition, Training & Onboarding",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Organisation, Culture & Ways of Working",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Adoption, Stabilisation & Handover",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    }
  ]
};
