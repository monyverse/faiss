/**
 * Communications / Marketing SA Functional Spoke.
 *
 * All strings in this file are approved source content reproduced verbatim
 * from the Absa M&A Transaction Operating Model document. Do not summarise,
 * paraphrase or correct the wording.
 */

import type { SpokeContent } from "./spoke-content";

export const CONTENT: SpokeContent = {
  "id": "comms",
  "name": "Communications / Marketing",
  "reference": "",
  "necessityRows": [
    {
      "archetype": "Balance Sheet Acquisition",
      "classification": "Required but scaled",
      "rationale": "Required at lower intensity because confidential internal messaging, governance updates and external statements remains relevant"
    },
    {
      "archetype": "Partial Business Acquisition",
      "classification": "Core / Required",
      "rationale": "Core because clear stakeholder messaging, client notices, employee communications and brand control is critical"
    },
    {
      "archetype": "Full Business Acquisition A (Buyer integrates the business)",
      "classification": "Core / Required",
      "rationale": "Core because clear stakeholder messaging, client notices, employee communications and brand control is critical"
    },
    {
      "archetype": "Full Business Acquisition B (Buyer runs the business standalone)",
      "classification": "Required but scaled",
      "rationale": "Required at lower intensity because confidential internal messaging, governance updates and external statements remains relevant"
    },
    {
      "archetype": "Balance Sheet Sale",
      "classification": "Required but scaled",
      "rationale": "Required at lower intensity because confidential internal messaging, governance updates and controlled external statements remains relevant"
    },
    {
      "archetype": "Partial Business Sale",
      "classification": "Core / Required",
      "rationale": "Core because clear stakeholder messaging, client notices, employee communications and brand control is critical"
    },
    {
      "archetype": "Full Business Sale A (Buyer integrates the business)",
      "classification": "Core / Required",
      "rationale": "Core because clear stakeholder messaging, client notices, employee communications and brand control is critical"
    },
    {
      "archetype": "Full Business Sale B (Buyer runs the business as standalone)",
      "classification": "Required but scaled",
      "rationale": "Required at lower intensity because confidential internal messaging, governance updates and external statements remains relevant"
    }
  ],
  "keyRole": "Owns the communication strategy and controlled messaging required to keep stakeholders, clients and employees informed before, during and after LD1.",
  "responsibilities": [
    "Build an integrated communications plan covering internal stakeholders, clients, employees, regulators and external counterparties.",
    "Collate communication requirements, restrictions and timing dependencies from all workstreams.",
    "Support adjacent workstreams (Human Capital, People Change) with coordination, signoff, and sequencing of communications",
    "Input into and coordinate approval of internal announcements, client notices, employee engagement packs and external statements.",
    "Define messaging principles, tone, brand treatment and channel strategy for acquisition, divestment, integration and separation scenarios.",
    "Coordinate communications readiness evidence for go/no-go governance and LD1 command-centre activity.",
    "Manage issue communications during cutover and hypercare with Legal, Compliance, HR and Operations & Servicing."
  ],
  "boundaryItems": [
    "People Change owns the change plan and remediation actions, including key messaging; Comms / Marketing owns the execution of communications and sequencing within the overall comms plan",
    "HR owns employee communications content and strategy; Comms / Marketing owns the sequencing, tracking, and sending of these communications",
    "Product (Business) owns the SME content required for client communications; Comms / Marketing coordinates, drives, and executes on these communications",
    "Client readiness owns the sequencing and execution of onboarding comms; Comms / Marketing supports with oversight, governance, and messaging"
  ],
  "centralHubRelationship": "Relationship with Central Hub: the SA Functional Spoke owns communications and marketing decisions and evidence while the Central Hub sets programme standards, coordinates dependencies and escalates transaction-wide issues.",
  "regionalRelationship": [
    "Regional Spokes should own local execution as a minimum, with ownership scaling based on maturity, including local stakeholder mapping, channel coordination, language or market nuance, employee and client feedback, and execution of approved communications where they have capacity and delegated authority.",
    "SA Function Authority retains message principles, brand treatment, approval routes, restricted communications, group-level stakeholder narrative and hands-on support where regions do not yet have sufficient maturity, capability or capacity.",
    "As regional maturity increases, local ownership should expand from factual input into drafting, channel execution, sign-off evidence and issue communications, with Function Authority retaining central standards, specialist challenge and escalation support."
  ],
  "externalDependencies": "",
  "mandateRows": [
    {
      "id": "messaging-strategy",
      "area": "Messaging strategy",
      "spokeAuthority": [
        "Proposes and owns functional communications planning, with input from business"
      ],
      "hubRole": "Ensures alignment with transaction narrative",
      "regionalRole": "",
      "governance": "Legal, Compliance and Executive governance where needed",
      "escalation": "Conflicting public, client or colleague messages"
    },
    {
      "id": "client-communication-release",
      "area": "Client communication release",
      "spokeAuthority": [
        "Owns pack readiness and channel coordination across business areas"
      ],
      "hubRole": "Coordinates release timing against readiness",
      "regionalRole": "",
      "governance": "Legal, Compliance, Product and Operations approval",
      "escalation": "Client impact, regulatory restriction or incomplete onboarding evidence"
    },
    {
      "id": "employee-communication-release",
      "area": "Employee communication release",
      "spokeAuthority": [
        "Supports HR with change narrative and cascade"
      ],
      "hubRole": "Aligns messaging to programme milestones",
      "regionalRole": "",
      "governance": "HR and Legal approval",
      "escalation": "Consultation risk, works council issue or retention concern"
    },
    {
      "id": "brand-and-marketing-transition",
      "area": "Brand and marketing transition",
      "spokeAuthority": [
        "Defines marketing and collateral needs"
      ],
      "hubRole": "Tracks dependencies",
      "regionalRole": "",
      "governance": "Brand, Legal, Compliance and executive approval",
      "escalation": "Customer confusion, brand risk or regulatory challenge"
    }
  ],
  "capabilityRows": [
    {
      "category": "Specific Project Manager required?",
      "content": "No, non-technical workstream which ramps up during key phases (Regulatory approval, LD1 readiness, cutover, hypercare)"
    },
    {
      "category": "Baseline capabilities",
      "content": "Transaction communications planning; Stakeholder mapping; Issue messaging and approval-route management; Stakeholder management to ensure comms get signed off; Crisis planning for contingency scenarios"
    },
    {
      "category": "Incremental capabilities by deal archetype / complexity",
      "content": "Client and colleague communication drafting in regulated banking environments; Media experience to brief required outlets; Wide network into client-facing teams to drive SME review of communications"
    },
    {
      "category": "Specialist capabilities triggered by deal characteristics",
      "content": "Incremental capability for brand migration and campaign materials; Experience with large client cohorts and employee-transfer communications; Understanding of product nuances and complexities which must be communicated to new clients"
    }
  ],
  "milestoneIntro": [
    "The key milestones below are organised as a baseline set, with additional milestones required for more complex deal archetypes split out below as required.",
    "As deal archetypes scale from balance sheet to partial business to full business, each milestone should be assessed against stakeholder impact, confidentiality restrictions, regulatory approvals, brand change, client and colleague volumes, channel complexity and the degree of joint execution required with the counterparty."
  ],
  "serviceCatalogue": [
    "Stakeholder mapping and stage-gated message strategy",
    "Confidentiality, leak response and crisis communications",
    "Regulator, client, colleague, media and wider stakeholder communications",
    "Joint communications governance, drafting, validation and approval management",
    "Channel, campaign and content planning across human, digital and self-service channels",
    "Brand, customer proposition and marketing transition",
    "LD1, cutover, issue and hypercare communications",
    "Stakeholder insight, reputation monitoring and BAU handover"
  ],
  "activitySets": [
    {
      "id": "balance-sheet-acquisition",
      "heading": "Balance Sheet Acquisition - baseline activities",
      "tab": "Balance Sheet Acquisition",
      "milestones": [
        {
          "name": "Communications and marketing strategy approved (4 weeks)",
          "activities": [
            "Define communications objectives, guiding principles, critical outcomes and the role of communications and marketing across the transaction.",
            "Map regulator, client, colleague, media and other stakeholder groups by stage gate, then work backwards from the required stakeholder outcome. Gather inputs on required communications from all other workstreams",
            "Align the strategy with the transaction narrative, customer proposition, programme plan, change approach and applicable regulatory restrictions."
          ]
        },
        {
          "name": "Confidentiality, leak and crisis communications protocol established (3 weeks)",
          "activities": [
            "Confirm insider-list restrictions, what may be communicated at each stage and the approved response if information leaks before signing or approval.",
            "Prepare holding statements, escalation routes, spokesperson responsibilities and rapid approval arrangements for reputational or service issues.",
            "Test crisis scenarios with Legal, Compliance, Risk, the Central Hub and relevant regional leadership."
          ]
        },
        {
          "name": "Joint communications governance and approval route agreed (4 weeks)",
          "activities": [
            "Define who drafts, validates, approves and releases each communication type, including clear authority to speak to clients and employees.",
            "Agree counterparty review timelines, version control, evidence requirements and escalation for delayed or duplicative approvals.",
            "Maintain an integrated communications calendar linked to regulatory approvals, client readiness, cutover and LD1 milestones."
          ]
        },
        {
          "name": "Stakeholder messages, content and channel plan completed (6 weeks)",
          "activities": [
            "Develop a single core narrative with tailored messages for regulators, clients, colleagues, media and other relevant audiences.",
            "Sequence communications so audiences can absorb the information, prioritising critical messages rather than over-sharing, working with each impacted workstream to gather inputs and signoff",
            "Select the appropriate mix of relationship-led, contact-centre, email, web, social, event, digital hub and self-service channels for each audience."
          ]
        },
        {
          "name": "Client and colleague-facing teams briefed and equipped (4 weeks)",
          "activities": [
            "Prepare relationship-manager, leader, contact-centre and frontline briefing packs, FAQs, scripts and referral routes.",
            "Use client-facing colleagues as subject-matter contributors and reassurance channels while maintaining approved-message controls.",
            "Confirm query ownership, service escalation and rapid content-update processes with Operations, Product, Human Capital and Change Management."
          ]
        },
        {
          "name": "LD1 communications and post-launch monitoring completed (4 weeks)",
          "activities": [
            "Execute regulatory, client, colleague, media and market communications in the approved sequence around cutover and LD1.",
            "Monitor reach, engagement, questions, sentiment, service issues and reputational indicators across all channels during hypercare.",
            "Refresh messages and content where audiences have not seen, understood or acted on the initial communications, then hand ongoing activity to BAU owners."
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
          "name": "Transferred, retained and shared stakeholder populations segmented (5 weeks)",
          "activities": [
            "Separate transferring, retained, excluded and shared client and colleague populations, including key relationship, regulatory and media stakeholders.",
            "Define differentiated messages, timing and support routes for each cohort to prevent confusion or inconsistent treatment."
          ]
        },
        {
          "name": "Brand, collateral and campaign transition plan completed (6 weeks)",
          "activities": [
            "Identify affected brand assets, customer materials, websites, digital journeys, campaigns, sponsorships and physical collateral.",
            "Define co-branding, rebranding, withdrawal, replacement and approval requirements for transferred and retained propositions.",
            "Plan targeted acquisition, retention or reassurance activity for priority customer segments while protecting the retained business narrative."
          ]
        }
      ]
    },
    {
      "id": "full-business-acquisition-a-integrated",
      "heading": "Full Business Acquisition A (integrated) - further additional activities",
      "tab": "Full Acquisition A (integrated)",
      "lead": "The above, with the addition of:",
      "milestones": [
        {
          "name": "Integrated brand and marketing transition strategy approved (8 weeks)",
          "activities": [
            "Define the target brand architecture, customer proposition, migration story and phased transition from the acquired brand to Absa.",
            "Map the complete estate of brand, campaign, digital, physical, sponsorship and client-facing assets requiring change.",
            "Agree brand-use controls, legal and regulatory approvals, production lead times, budget and prioritisation for LD1 and post-LD1 activity."
          ]
        },
        {
          "name": "Enterprise launch campaign and digital information hub readied (6 weeks)",
          "activities": [
            "Build a central information hub with audience-specific content, FAQs, videos, updates and clear routes to human support.",
            "Prepare coordinated web, social, direct, event, relationship and internal campaign assets using one approved narrative.",
            "Test content accessibility, channel capacity, analytics, update ownership and the ability to respond quickly to emerging questions."
          ]
        },
        {
          "name": "Integrated client, colleague and market launch executed (5 weeks)",
          "activities": [
            "Coordinate leader communications, employee cascades, client engagement, media activity and marketing launch around the integration sequence.",
            "Maintain a unified narrative across Business, Human Capital, Change, Legal, Compliance, Digital and frontline teams.",
            "Monitor reputation, customer response, employee sentiment and campaign performance, then adjust the first-100-day plan."
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
          "name": "Standalone stakeholder, reputation and communications strategy approved (5 weeks)",
          "activities": [
            "Define the standalone business narrative, stakeholder outcomes and communications principles for regulators, clients, colleagues, media and partners.",
            "Map stage-gated stakeholder needs, local market sensitivities, reputation risks and leadership expectations.",
            "Agree how the standalone narrative relates to Absa group messaging while preserving local relevance and delegated authority."
          ]
        },
        {
          "name": "Standalone communications governance and operating model established (5 weeks)",
          "activities": [
            "Define communications and marketing roles, decision rights, approval routes, spokespersons, budget, agency support and regional execution responsibilities.",
            "Establish confidentiality, leak, crisis, issues-management and rapid-response protocols.",
            "Confirm the BAU content calendar, channel ownership, measurement approach and handover requirements."
          ]
        },
        {
          "name": "Standalone brand and customer proposition developed (8 weeks)",
          "activities": [
            "Define brand architecture, identity, positioning, customer proposition, tone of voice and market-entry or continuity narrative.",
            "Create or adapt the required brand assets, campaign materials, websites, social presence, templates and physical collateral.",
            "Secure Legal, Compliance, regulatory and executive approvals for the standalone brand and marketing proposition."
          ]
        },
        {
          "name": "Regulator, client, colleague and media programmes readied (4 weeks)",
          "activities": [
            "Develop audience-specific plans, messages, notices, briefing packs, FAQs, events and relationship-led engagement.",
            "Prepare client-facing teams, contact centres, leaders and employee representatives to explain the standalone model consistently.",
            "Agree joint communications and speaking rights with the counterparty for every restricted or interdependent audience."
          ]
        },
        {
          "name": "Standalone digital hub and service communication channels launched (6 weeks)",
          "activities": [
            "Launch a durable information hub and self-service content for clients and colleagues, supported by clear human escalation routes.",
            "Confirm web, social, email, contact-centre, event and frontline channels can publish and update approved content at scale.",
            "Test analytics, content ownership, accessibility and issue-response procedures before LD1."
          ]
        },
        {
          "name": "Standalone launch and first-100-day campaign executed (8 weeks)",
          "activities": [
            "Execute the approved launch sequence across regulator, client, colleague, media and marketing channels.",
            "Track awareness, engagement, sentiment, reputation, service demand and campaign effectiveness through hypercare.",
            "Refine messages and marketing activity, close launch issues and transfer ongoing communications to the standalone BAU team."
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
          "name": "Divestment communications and marketing strategy approved (4 weeks)",
          "activities": [
            "Define communications objectives, stakeholder outcomes and message principles for the sale perimeter and retained Absa business.",
            "Map regulators, affected clients, colleagues, media and other stakeholders by transaction stage and information need.",
            "Align the strategy with the sale narrative, legal agreements, regulatory process, separation plan and retained customer proposition."
          ]
        },
        {
          "name": "Confidentiality, leak and crisis communications protocol established (3 weeks)",
          "activities": [
            "Confirm insider-list restrictions, announcement triggers and permitted communications before signing, approval and completion.",
            "Prepare leak responses, holding statements, spokesperson arrangements and escalation routes for reputational or service issues.",
            "Test scenarios involving clients, colleagues, regulators, media and public-market disclosure where applicable."
          ]
        },
        {
          "name": "Buyer and seller communications governance agreed (4 weeks)",
          "activities": [
            "Define drafting, validation, approval and release responsibilities, including authority to contact clients and colleagues.",
            "Agree joint review timelines, version control, sign-off evidence and escalation for delayed or conflicting messages.",
            "Maintain a joint communications calendar aligned to regulatory approval, separation, cutover and completion milestones."
          ]
        },
        {
          "name": "Client, colleague and regulator communications pack approved (6 weeks)",
          "activities": [
            "Prepare tailored notices, FAQs, leader packs, frontline scripts and support routes for affected and retained audiences.",
            "Sequence communications to preserve confidence, explain continuity and avoid disclosing information before approvals permit it.",
            "Brief relationship managers, leaders, contact centres and employee representatives before each release."
          ]
        },
        {
          "name": "Completion communications and post-sale monitoring completed (4 weeks)",
          "activities": [
            "Execute regulatory, client, colleague, media and market communications in the approved completion sequence.",
            "Monitor questions, sentiment, reputation, client attrition signals and service issues across all channels.",
            "Refresh content, close communications issues and hand retained and residual obligations to BAU owners."
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
          "name": "Transferred, retained and shared audiences segmented (5 weeks)",
          "activities": [
            "Separate transferred, retained, excluded and shared client and colleague populations and their communication rights.",
            "Develop differentiated messages, channels and support routes for each population while keeping the overall narrative coherent.",
            "Reconcile audience lists with Human Capital, Product, Operations, Data Migration and Legal separation records."
          ]
        },
        {
          "name": "Marketing asset separation and brand controls completed (6 weeks)",
          "activities": [
            "Separate brand, campaign, website, social, data, sponsorship and collateral assets between transferred and retained businesses.",
            "Define temporary brand use, co-branding, licensing, removal and approval requirements through separation.",
            "Protect the retained Absa proposition through targeted reassurance, retention and market communications."
          ]
        }
      ]
    },
    {
      "id": "full-business-sale-a-buyer-integrates",
      "heading": "Full Business Sale A (buyer integrates) - further additional divestment activities",
      "tab": "Full Sale A (buyer integrates)",
      "lead": "The above, with the addition of:",
      "milestones": [
        {
          "name": "Buyer integration communications handover agreed (5 weeks)",
          "activities": [
            "Provide the buyer with approved stakeholder maps, message history, FAQs, communication commitments, open issues and channel information.",
            "Agree the transition from Absa-led to buyer-led client, colleague and media communications.",
            "Confirm Absa review rights and escalation routes where buyer integration messages affect retained obligations or reputation."
          ]
        },
        {
          "name": "Absa exit brand and reputation protections implemented (4 weeks)",
          "activities": [
            "Execute brand removal, asset transfer, public narrative and retained-business reassurance in line with the buyer integration plan.",
            "Track misuse of Absa brand, inconsistent customer messaging and unresolved public or employee queries.",
            "Transfer residual communications, claims and reputation issues to named Legal, BAU or post-completion owners."
          ]
        },
        {
          "name": "Completion and market transition campaign executed (4 weeks)",
          "activities": [
            "Coordinate completion announcements, client and colleague messages, website changes, social content and media activity.",
            "Provide frontline teams with final buyer-integration messages and clear support routes.",
            "Monitor market response and stakeholder understanding until the buyer assumes full communications ownership."
          ]
        }
      ]
    },
    {
      "id": "full-business-sale-b-standalone",
      "heading": "Full Business Sale B (standalone) - complete divestment activity set",
      "tab": "Full Sale B (standalone)",
      "lead": "Standalone:",
      "milestones": [
        {
          "name": "Standalone divestment stakeholder and communications strategy approved (5 weeks)",
          "activities": [
            "Define the stakeholder narrative and outcomes for the standalone buyer, affected clients, colleagues, regulators, media and Absa retained business.",
            "Map stage-gated communications needs, local market sensitivities and reputation risks across the full business perimeter.",
            "Agree how Absa and buyer narratives will remain aligned through completion and separation."
          ]
        },
        {
          "name": "Buyer communications governance and capability assessed (5 weeks)",
          "activities": [
            "Assess the buyer's communications and marketing team, approval routes, spokespersons, channels, agencies and crisis capability.",
            "Define joint drafting, validation, release authority and escalation arrangements until buyer capability is fully operational.",
            "Agree BAU handover criteria, evidence and timing for standalone communications ownership."
          ]
        },
        {
          "name": "Brand, marketing and channel separation completed (8 weeks)",
          "activities": [
            "Inventory and separate brand rights, websites, social accounts, campaign assets, content, sponsorships, templates and physical collateral.",
            "Define buyer identity, transition branding, market positioning and customer proposition for standalone operation.",
            "Complete required asset transfer, licensing, de-branding, production and approval activity before LD1."
          ]
        },
        {
          "name": "Client, colleague, regulator and media programmes approved (8 weeks)",
          "activities": [
            "Develop audience-specific notices, FAQs, briefing packs, events, relationship engagement and media materials.",
            "Prepare client-facing teams, leaders, contact centres and employee representatives to explain the standalone transition.",
            "Confirm communication timing against regulatory approval, employee consultation, client consent and operational readiness."
          ]
        },
        {
          "name": "Standalone launch campaign and digital information hub readied (6 weeks)",
          "activities": [
            "Create a durable information hub and coordinated web, social, direct, event and internal campaign plan for the buyer launch.",
            "Test content, analytics, accessibility, channel capacity, update ownership and escalation routes.",
            "Prepare Absa exit messages and retained-business marketing activity alongside the buyer launch."
          ]
        },
        {
          "name": "Completion, hypercare and final communications handover completed (8 weeks)",
          "activities": [
            "Execute the approved completion sequence across regulator, client, colleague, media and marketing channels.",
            "Monitor reach, sentiment, reputation, client response, service demand and campaign performance through hypercare.",
            "Close or transfer open communications and brand issues, archive approval evidence and complete handover to buyer and Absa BAU owners."
          ]
        }
      ]
    }
  ],
  "sizingFactors": "",
  "sizingDrivers": ["Large employee base moving across organisations", "Large project team", "Cultural misalignment across buyer and seller", "Significant reputational risk within the deal"],
  "partnerServices": [
    {
      "keyService": "Stakeholder mapping and stage-gated message strategy",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Confidentiality, leak response and crisis communications",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Regulator, client, colleague, media and wider stakeholder communications",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Joint communications governance, drafting, validation and approval management",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Channel, campaign and content planning across human, digital and self-service channels",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Brand, customer proposition and marketing transition",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "LD1, cutover, issue and hypercare communications",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Stakeholder insight, reputation monitoring and BAU handover",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    }
  ]
};
