/**
 * Lifecycle content per deal archetype.
 *
 * Generated from the client-supplied "M&A Lifecycles Master" document. Content is
 * verbatim from that source: purpose, Inorganic Change Team role, indicative
 * timeline and drivers, necessary / conditional / optional sub-activity steps,
 * deal-type nuances, associated artefacts and templates.
 */

export type LifecycleItem = { text: string; subs?: string[] };

export type LifecycleStageDetail = {
  id: string;
  index: string;
  title: string;
  purpose: string;
  role: LifecycleItem[];
  timeline: string;
  timelineDrivers: LifecycleItem[];
  necessary: LifecycleItem[];
  conditional: LifecycleItem[];
  optional: LifecycleItem[];
  nuances: LifecycleItem[];
  artefacts: LifecycleItem[];
  templates: LifecycleItem[];
};

export type LifecycleVariant = {
  archetypeId: string;
  archetypeName: string;
  /** Set where an archetype has more than one delivery variant. */
  variantLabel: string | null;
  sourceTitle: string;
  stages: LifecycleStageDetail[];
};

export const LIFECYCLES: LifecycleVariant[] = [
  {
    "archetypeId": "balance-sheet-acquisition",
    "archetypeName": "Balance-sheet acquisition",
    "variantLabel": null,
    "sourceTitle": "Balance Sheet Acquisition",
    "stages": [
      {
        "id": "due-diligence",
        "index": "01",
        "title": "Due Diligence",
        "purpose": "Determine whether the acquisition creates value, what you are actually buying, and what needs to be protected contractually. Legal & CorpDev lead; other areas input where required. Activities below relate to key items for the integration team to consider during this process, they do not override current DD processes",
        "role": [
          {
            "text": "Extract information from the DD process necessary to properly plan and run the implementation"
          },
          {
            "text": "Act as M&A SMEs to provide oversight, bringing a practical, Absa oriented lens which goes beyond financials and ensures nuances are identified and caught based on previous experience"
          }
        ],
        "timeline": "1 – 3 months",
        "timelineDrivers": [
          {
            "text": "Deal perimeter (broader perimeter requires more detailed review)"
          },
          {
            "text": "Product complexity (more complex products are harder to model and project)"
          },
          {
            "text": "Maturity of DD teams (experienced teams can work through a DD checklist in a very short period)"
          },
          {
            "text": "Seller availability (heavily reliant on seller supporting in providing materials)"
          }
        ],
        "necessary": [
          {
            "text": "Ensure virtual data room set up to access confidential documentation and ensure it persists after deal signature"
          },
          {
            "text": "Ensure an NDA process to wall-cross those who need access to confidential information is set up"
          },
          {
            "text": "Understand the acquisition perimeter: which assets and liabilities transfer, how will we interact with what we are not buying, how does not having a full balance sheet impact the financials?"
          },
          {
            "text": "Understanding what the hurdle rates are: what EBITDA, NII, NIM, revenue, operating leverage, ROC, ROE, MOIC, will create a go-decision for deal signing?"
          },
          {
            "text": "Understanding the factors which influenced these hurdle rates, as well as what other non-financial factors may influence decision making (new capabilities, strong brand loyalty, etc)"
          },
          {
            "text": "Build an initial view of project implementation costs, leveraging comparable deals. All assumptions in planning costs must be defensible and informed by functional experts"
          },
          {
            "text": "Build or oversee build of a detailed business case comparing forecasted benefits to project costs and continued running costs"
          },
          {
            "text": "Ensure tax implications have been assessed and remediation planned"
          }
        ],
        "conditional": [
          {
            "text": "Understand the product set, the nuances of this product set, what other assets / liabilities are being sold to other buyers, and how this might impact execution (whether data sets are disentangled, whether coordination with other buyers will be required, etc)"
          },
          {
            "text": "Access to this early stage of the lifecycle may not always be possible given the broader business context, but it should be requested given its importance to execution"
          }
        ],
        "optional": [
          {
            "text": "Benchmark estimated performance against previous deals"
          },
          {
            "text": "Review lessons learnt from previous deals"
          },
          {
            "text": "Engage a subset of seller clients to assess current pain points and identify any potential deal red flags (e.g. compliance issues, pricing mismatches, in-scope technology issues)"
          },
          {
            "text": "Engage other buyers of seller business to understand key seller-specific pain points to avoid (e.g., data sharing issues, client communication issues)"
          }
        ],
        "nuances": [
          {
            "text": "DD must account for economies/diseconomies of scale inherent in taking part but not all of a business (e.g., cost base may not be halved by taking half the balance sheet)"
          },
          {
            "text": "DD must account for business line synergies inherent in taking part but not all of a business (e.g., potential to net off FX flows, fly-wheel inherent in having complementary businesses such as deposits and transaction banking)"
          }
        ],
        "artefacts": [
          {
            "text": "Previous transaction materials and lessons learnt (Absa transaction specific)"
          },
          {
            "text": "Business case (Absa transaction specific)"
          }
        ],
        "templates": []
      },
      {
        "id": "legal-drafting-signature",
        "index": "02",
        "title": "Legal Drafting & Signature",
        "purpose": "Ensure the Sale and Purchase Agreement (SPA) reflects reality of programme delivery, and enables execution. Legal & CorpDev lead, other areas input where required. Activities below relate to key integration considerations, they do not overwrite the current processes.",
        "role": [
          {
            "text": "Ensure legals reflect execution reality, and timelines are realistic"
          },
          {
            "text": "Ensure legals include provisions which will support execution, such as data sharing"
          },
          {
            "text": "Ensure any go-live dates are based on realistic assumptions around regulatory approval and client onboarding timelines"
          },
          {
            "text": "Leverage lessons learned from previous deals to ensure legals address any historic pain points"
          }
        ],
        "timeline": "1 – 2 months",
        "timelineDrivers": [
          {
            "text": "Deal complexity (complex deals require additional protections and conditions)"
          },
          {
            "text": "Pre-signing alignment (pre-agree valuations and completion mechanisms will speed up drafting)"
          },
          {
            "text": "DD quality (high quality DD will allow defensible assumptions to be made in the legals, otherwise these will have to be assessed during this phase)"
          },
          {
            "text": "Regulatory complexity (multiple regulators across multiple jurisdictions increases complexity in drafting legals)"
          }
        ],
        "necessary": [
          {
            "text": "Engage external lawyers to lead SPA drafting and negotiation, informed by internal legal opinion"
          },
          {
            "text": "Convert DD findings into agreed transaction terms including valuation, adjustment principles, completion mechanisms, and payment terms"
          },
          {
            "text": "Ensure price, adjustments and effective transfer date are agreed"
          },
          {
            "text": "Coordinate and confirm the signing sequence between Absa, the seller and other parties"
          },
          {
            "text": "Set out which items will transfer from seller to Absa automatically under agreed regulatory processes (e.g., Section 54), and which will have to be manually transferred"
          },
          {
            "text": "Detail novation processes for items not automatically transferring, whether independent legal opinions on contracts are required, and where liability sits during transfer"
          },
          {
            "text": "Set out the joint governance mechanisms across buyer and seller at a high level (e.g., the scheduling of joint Steering Committees, appointment of Transaction Directors from each party)"
          },
          {
            "text": "Set out joint escalation mechanisms for programme-level issues, as well as dispute resolution mechanisms"
          },
          {
            "text": "Set out conditions precedent for completion, including funds transfer, assets/liabilities transfer, regulatory approval, and board approval"
          },
          {
            "text": "Agree signatures required on each side"
          },
          {
            "text": "Set out completion date precedent on regulatory approval date(s), rather than a pre-agreed specific date"
          }
        ],
        "conditional": [
          {
            "text": "Set out stipulations and timings for the sharing of client data, including whether business cases are required, and what can and can't be shared ahead of regulatory approval"
          },
          {
            "text": "Set out a joint communications plan to clients from both buyer and seller, including timelines for when buyer can engage the clients"
          },
          {
            "text": "Detail FX payment mechanisms, including adjustments for FX risk and longer settlement times"
          },
          {
            "text": "Access to this early stage of the lifecycle may not always be possible given the broader business context, but it should be requested given its importance to execution"
          }
        ],
        "optional": [
          {
            "text": "Set SPA change control mechanisms"
          },
          {
            "text": "Set up SPA access mechanisms for project team members"
          },
          {
            "text": "Socialise with functional leads ahead of signature"
          }
        ],
        "nuances": [
          {
            "text": "Clients may not necessarily transfer with assets and liabilities. This must be assessed as a follow up question if not obvious from deal materials, and conditional activities related to clients made necessary"
          }
        ],
        "artefacts": [
          {
            "text": "DD summary and agreed deal decisions (Absa deal specific)"
          },
          {
            "text": "M&A lessons learnt (Absa transaction specific)"
          }
        ],
        "templates": [
          {
            "text": "NDA template"
          }
        ]
      },
      {
        "id": "mobilisation-planning",
        "index": "03",
        "title": "Mobilisation & Planning",
        "purpose": "Define the key activities which must take place to enable LD1 to take place on the agreed date, and surface dependencies",
        "role": [
          {
            "text": "Inorganic Change team should lead the mobilisation effort across Absa: briefing functional leads / AEs, onboarding teams, executing the NDA process, creating onboarding materials, briefing teams on detailed plan creation, leading joint planning workshops, translating workshop outputs into a programme plan"
          }
        ],
        "timeline": "4- 6 weeks",
        "timelineDrivers": [
          {
            "text": "Deal complexity (complex deals need more workstreams to execute)"
          },
          {
            "text": "Geographical scope (multiple geographies require more coordination)"
          },
          {
            "text": "Existing knowledge (teams familiar with these deals can draft a detailed plan much faster, and understand dependencies)"
          },
          {
            "text": "Available resource (resource constraints mean activities take longer)"
          }
        ],
        "necessary": [
          {
            "text": "Set up mobilisation hierarchy:",
            "subs": [
              "Board appoints executive sponsor for the deal",
              "Executive sponsor appoints Transaction Director",
              "Transaction Director and Executive Sponsor agree Accountable Executives for each function / workstream",
              "AE selection should be informed by their expected responsibilities, detailed in the Hub and Spoke Operating Model",
              "AEs appoint functional workstream leads, who appoint in-country leads",
              "Transaction Director mobilises central Inorganic Change team and in-country coordinators",
              "Buyer and Seller Inorganic Change teams share lists of functional leads to enable joint planning",
              "Joint and individual governance established based on Mobilisation Toolkit"
            ]
          },
          {
            "text": "Define key workstreams required based on the deal-archetype and SPA specifics, including rough size of each workstream"
          },
          {
            "text": "Define workstream charters per workstream, setting out objective, purpose, success metrics, key personnel, skills, and ownership"
          },
          {
            "text": "Jointly carry out workstream bricks across buyer and seller, laying out each business process related to the workstream, which the seller will stop, which the buyer will start, and which will carry on as is"
          },
          {
            "text": "Define key milestones required to enable these process and achieve a seamless cutover at Legal Day 1 (LD1)"
          },
          {
            "text": "Support each workstream to define a detailed, L2 plan below this to enable the meeting of these milestones"
          },
          {
            "text": "Hold joint workshops across buyer and seller to discuss and agree on these milestones"
          },
          {
            "text": "Identify milestones with key dependencies across workstreams, and document these dependencies in detail"
          },
          {
            "text": "Identify the critical path, and dates/factors will have a material impact on completion, and which of these can be controlled (e.g., regulatory approval or bank-wide change freezes cannot be controlled, data migration solution build and test is critical to LD1 success, etc)"
          },
          {
            "text": "Translate the milestones into an overarching project plan to be tracked weekly"
          },
          {
            "text": "Agree initial LD1 readiness criteria per workstream (key performance indicators which will enable cutover, e.g., for Data Migration, all source-to-target mapping complete)"
          },
          {
            "text": "Agree on internal governance cadence which will sync with joint governance laid out in the SPA, including:",
            "subs": [
              "Internal and joint Inorganic Change meetings weekly / bi-weekly to align on priorities and joint risks/issues",
              "Working group / workstream led sessions to discuss key risks, issues, and progress",
              "Internal Steering Committee sessions to escalate Absa-specific risks and issues, and receive guidance on key decisions",
              "Joint Steering Committee sessions to discuss joint risks and issues, and coordinate cross-party solutions"
            ]
          },
          {
            "text": "Translate DD findings and governance structures into onboarding materials which clearly articulate the purpose and objectives of the deal, how execution will run day to day, roles and responsibilities, and escalation pathways"
          }
        ],
        "conditional": [
          {
            "text": "Submit a version of the programme plan to the regulator alongside the request for approval"
          },
          {
            "text": "Set up TSA exit team and define timeline for complete TSA exit"
          }
        ],
        "optional": [
          {
            "text": "Translate the project plan into project management software (e.g., Jira, MSP)"
          },
          {
            "text": "Link governance into bank-level governance such as Board meetings, StratCos, etc"
          }
        ],
        "nuances": [
          {
            "text": "Acquired components cannot operate independently, so missing capabilities must be available by Day 1"
          },
          {
            "text": "Different components may require different transfer or implementation dates"
          },
          {
            "text": "Multiple regulators may have to be engaged if multiple elements of the business are transferring (e.g., FSCA for client experience considerations, PA for prudence/capital considerations)"
          }
        ],
        "artefacts": [
          {
            "text": "TSA agreements (Absa transaction specific)"
          },
          {
            "text": "Regulatory commitments and approval timelines (Absa transaction specific)"
          },
          {
            "text": "Previous transaction playbooks with lessons learned (Absa transaction specific)"
          },
          {
            "text": "Hub & Spoke operating model"
          },
          {
            "text": "Mobilisation toolkit"
          }
        ],
        "templates": [
          {
            "text": "Workstream bricks"
          },
          {
            "text": "High-level transaction plan template"
          },
          {
            "text": "Detail excel project plan"
          },
          {
            "text": "Governance forums Terms of Reference"
          }
        ]
      },
      {
        "id": "programme-execution",
        "index": "04",
        "title": "Programme Execution",
        "purpose": "Execute on agreed milestones, run governance cadence, and build required technical/data solutions",
        "role": [
          {
            "text": "Inorganic Change Team acts as the central hub in the execution phase, driving workstream level execution, tracking RAID items, defining SteerCo material, and holding those responsible for execution accountable"
          }
        ],
        "timeline": "12 – 18 months",
        "timelineDrivers": [
          {
            "text": "Regulatory approval timelines"
          },
          {
            "text": "Deal perimeter and scope"
          },
          {
            "text": "New product build (additional product build requires more delivery time)"
          },
          {
            "text": "Data complexity (Complex structures require a more nuanced data migration solution)"
          },
          {
            "text": "Seller cooperation (early sharing of data, and daily cooperation speeds up timelines)"
          }
        ],
        "necessary": [
          {
            "text": "Conduct programme management activities: run governance processes including workstream sessions, Exec SteerCos, and Joint Buyer/Seller SteerCos; set up and track risks and issues in a central RAID log, and escalate to SteerCo as appropriate"
          },
          {
            "text": "Ensure product gap analysis is conducted to identify which product decisions must be made"
          },
          {
            "text": "Ensure new product build decisions are made, leveraging detailed business cases on revenue, strategic, and client experience opportunities vs cost to build to New Product Authorities"
          },
          {
            "text": "Drive development of new products through regular touchpoints led by Technology Workstream leadership and fed into programme governance"
          },
          {
            "text": "Provide regular updates to the Board and Bank Leadership Forums on progress against plan, key risks and issues, and LD1 viability"
          },
          {
            "text": "Engage the regulator regularly to update progress and assess approval timelines"
          },
          {
            "text": "Conduct contingency and scenario planning for if approvals arrive later than anticipated, and define final possible date for receipt before LD1 must move"
          },
          {
            "text": "Request that the seller shares a data dictionary detailing data structures across source systems"
          },
          {
            "text": "Ensure source-to-target mapping across all systems is conducted to enable build of core data migration solution"
          },
          {
            "text": "Drive the build of the data migration solution to Extract, Transform, and Load (ETL) solution across all source systems into target systems"
          },
          {
            "text": "Ensure the data migration solution is tested using dummy data aligned to the data dictionary, or where possible, real client data"
          },
          {
            "text": "Agree with the buyer what data can be transferred ahead of LD1, and load it into Absa systems early to avoid cutover complications"
          },
          {
            "text": "Define success criteria across all workstreams, and continually measure progress against these"
          },
          {
            "text": "Work with the buyer to receive regularly updated financials, update the business case, and track that the deal remains aligned to strategic objectives"
          }
        ],
        "conditional": [
          {
            "text": "Set up a Clean Room to conduct KYC/AML checks, which should be entirely 'airgapped' - agree on Clean Room protocols with the seller"
          },
          {
            "text": "Onboard external KYC/AML experts to expedite the Clean Room process"
          },
          {
            "text": "Build out detailed client communication plan across buyer and seller, and keep clients updated on the progress of the programme, and when they can expect to be onboarded"
          },
          {
            "text": "If TSAs are in place, monitor service delivery and exit planning"
          }
        ],
        "optional": [
          {
            "text": "Engage friendly clients during the process to assess key value proposition and ensure project execution remains aligned"
          },
          {
            "text": "Conduct change management activities for project execution teams to drive continued buy-in and morale (e.g., team socials, rewards, etc)"
          }
        ],
        "nuances": [
          {
            "text": "Buyer execution must align with seller carve-out plans"
          },
          {
            "text": "Clients may not necessarily transfer with assets and liabilities. This must be assessed as a follow up question if not obvious from deal materials, and conditional activities related to clients made necessary"
          }
        ],
        "artefacts": [
          {
            "text": "Detail project plan built out from mobilisation and planning stage (Absa transaction specific)",
            "subs": [
              "With associated excel programme plan"
            ]
          },
          {
            "text": "Previous project playbooks with lessons learnt (Absa transaction specific)"
          },
          {
            "text": "Hub & Spoke operating model"
          },
          {
            "text": "Mobilisation toolkit"
          }
        ],
        "templates": [
          {
            "text": "Workstream status report template"
          },
          {
            "text": "Joint buyer and seller status report template"
          },
          {
            "text": "Programme RAID log template with added SteerCo escalation if necessary"
          }
        ]
      },
      {
        "id": "business-testing",
        "index": "05",
        "title": "Business Testing",
        "purpose": "Check that acquired products and functionality works correctly",
        "role": [],
        "timeline": "1 – 3 months (concurrent with execution, post-build)",
        "timelineDrivers": [
          {
            "text": "Scale of business process change"
          },
          {
            "text": "Testing expertise in-house (testing SMEs within each team means scripts require less review and testing can happen faster)"
          },
          {
            "text": "Capacity within teams to accommodate testing (needs to be balanced with BAU, build, other deal-related work)"
          },
          {
            "text": "Complexity of process change (complex new products require significant testing)"
          },
          {
            "text": "Downstream systems (impact of changes on multiple downstream systems requires more extensive end-to-end testing)"
          }
        ],
        "necessary": [
          {
            "text": "Work with BAU teams and functional / product SMEs to detail every business process impacted by changes the programme has made"
          },
          {
            "text": "Work with technology teams to understand the requirements for testing environments, including end-to-end environments"
          },
          {
            "text": "Book these environments well in advance, or flag if suitable environments do not yet exist and must be built"
          },
          {
            "text": "Drive execution of test scripts by the business"
          },
          {
            "text": "Conduct negative testing to ensure controls are functioning as expected"
          },
          {
            "text": "Once individual processes are validated, test every process end-to-end, including the feed into downstream systems like AML, finance, and reporting systems"
          },
          {
            "text": "Set up a testing-specific defect log to track issues to closure"
          },
          {
            "text": "Re-test issues post closure end-to-end, to ensure the fix has not created additional issues"
          },
          {
            "text": "Conduct Production Validation Testing to check that new functionality works in production as well as in test environments"
          },
          {
            "text": "Set up testing-specific governance, and feed into programme governance"
          },
          {
            "text": "Secure executive and business sign off on testing closure, with any open items clearly detailed"
          },
          {
            "text": "Test that only data in the scope of the deal is coming across, and data related to products outside of the perimeter is filtered out"
          }
        ],
        "conditional": [
          {
            "text": "Based on deal size and complexity set up an independent testing team to liaise with business and technology to drive test script creation and sign off"
          },
          {
            "text": "Based on deal size and complexity, designate a testing lead within each workstream responsible for coordinating and executing tests assigned to them"
          }
        ],
        "optional": [
          {
            "text": "Conduct friendly client testing to ensure that end-to-end flows work in a real world scenario"
          }
        ],
        "nuances": [
          {
            "text": "Testing must check that out of scope data is not being transferred"
          },
          {
            "text": "Testing must check that the remaining Absa business is not impacted by the additional elements being transferred"
          }
        ],
        "artefacts": [
          {
            "text": "Previous business testing programmes with lessons learnt, including a scenario-based risk mitigation plan (Absa transaction specific)"
          },
          {
            "text": "Business testing process flows and customer journeys (Absa transaction specific)"
          }
        ],
        "templates": [
          {
            "text": "Detailed business testing plan template"
          }
        ]
      },
      {
        "id": "ld1-readiness",
        "index": "06",
        "title": "LD1 Readiness",
        "purpose": "Communicate requirements and functionality with clients, and prepare for the cutover",
        "role": [
          {
            "text": "Oversee the standing up of an LD1 Readiness stream, and tracking its progress and risks as part of programme management to assess critical risks to LD1"
          }
        ],
        "timeline": "1 – 3 months (concurrent to execution)",
        "timelineDrivers": [
          {
            "text": "Client transfer (Clients transferring require communication and training)"
          },
          {
            "text": "Complexity of product mix (complex products and multi-product portfolios increase time to onboard)"
          },
          {
            "text": "Availability of client data (high-quality client contact data removes time spent on remediation)"
          },
          {
            "text": "Client responsiveness (heavily reliant on clients responding to outreach and providing documentation)"
          }
        ],
        "necessary": [
          {
            "text": "Build training materials on new products / functionalities, working closely with business SMEs"
          },
          {
            "text": "Build out materials outlining the value proposition of Absa to clients, including for products which they do not yet have to drive cross-sell opportunities"
          },
          {
            "text": "Set up client accounts, profiles, products, permissions, and mandates ahead of time to enable Dress Rehearsals and testing"
          },
          {
            "text": "Define and test the updated service model"
          },
          {
            "text": "Define the Hypercare model for post go-live, including detailed roles and responsibilities"
          }
        ],
        "conditional": [
          {
            "text": "Assess in detail the client onboarding process, understand timelines, and define a 'drop-dead date' for when onboarding must begin"
          },
          {
            "text": "Assess which onboarding processes must be done BAU, and which can be adapted to suit deal context and timelines"
          },
          {
            "text": "Detail all client documentation required to enable onboarding"
          },
          {
            "text": "Perform gap analysis to understand which information can be sourced from the seller, and which clients must provide directly"
          },
          {
            "text": "Ensure client contact details are shared by seller as early as possible, and track client outreach"
          },
          {
            "text": "Conduct risk assessment to understand which clients are high risk, and which some documentation can be obtained post-LD1"
          },
          {
            "text": "Confirm required KYC / AML documentation in place across transferring clients"
          },
          {
            "text": "Set up sessions to train clients on bank systems and channels"
          }
        ],
        "optional": [
          {
            "text": "Discuss with the seller the potential for onboarding clients ahead of LD1 to de-risk the cutover weekend"
          },
          {
            "text": "Conduct friendly-client testing with these new to bank clients"
          }
        ],
        "nuances": [
          {
            "text": "This phase may be significantly reduced if no clients are transferring (only assets / liabilities), as onboarding would not be required"
          }
        ],
        "artefacts": [
          {
            "text": "Client onboarding playbook (Absa transaction specific)"
          },
          {
            "text": "Client training materials (Absa transaction specific)"
          }
        ],
        "templates": []
      },
      {
        "id": "dress-rehearsals",
        "index": "07",
        "title": "Dress Rehearsals",
        "purpose": "Testing end-to-end approach to cutover in order to raise and resolve any issues which would prevent a successful transfer",
        "role": [
          {
            "text": "Coordinate the logistical preparation of the DRs, support the Data Migration team in defining the runbook, support the execution of the DRs either as logistical support or by acting as Data Migration Coordinators (DMCs)."
          }
        ],
        "timeline": "8 – 12 weeks",
        "timelineDrivers": [
          {
            "text": "Time remaining post build and test (if build and test finishes well ahead of LD1, more DRs can take place)"
          },
          {
            "text": "Number of Dress Rehearsals (DRs) (more DRs require a longer timeframe)"
          },
          {
            "text": "Down-time between DRs (minimum 2 weeks between DRs is recommended)"
          }
        ],
        "necessary": [
          {
            "text": "Work with the Data Migration and Technology teams to define cutover plan which details every activity down to the minute required to carve out assets/liabilities at the seller and stand up these within Absa"
          },
          {
            "text": "Hold runbook run-through sessions with all activity owners and back-ups to ensure everyone is clear on expectations"
          },
          {
            "text": "Define success metrics for DRs, with a clear understanding of what is acceptable in the first DR vs the final DR"
          },
          {
            "text": "Agree which data sets will be dummy / anonymised, and which will be real client data"
          },
          {
            "text": "Define roles and responsibilities across DRs and Cutover, including Data Migration Controllers running the runbook"
          },
          {
            "text": "Execute logistical support required to enable 24/7 DRs to take place such as building access, food requirements, accommodation, travel, Wi-Fi, security, facilities, and back-up plans"
          },
          {
            "text": "Define the governance processes to take place during DRs including the command centre, regular executive updates, escalation pathways, war room protocols, issue resolution processes, and continency decision making"
          },
          {
            "text": "Collate a DR playbook summarising success criteria, logistical information, key contacts, governance processes, and timelines"
          },
          {
            "text": "Run a minimum of 4 DRs across weekends, with at least 2 weeks in between each"
          },
          {
            "text": "Each DR should execute the runbook end-to-end, and track issues which arise for remediation"
          },
          {
            "text": "Hold DR retros to note lessons learnt and iterate into subsequent DRs"
          },
          {
            "text": "Track the remediation of issues ahead of subsequent DRs"
          }
        ],
        "conditional": [
          {
            "text": "If Absa has existing assets / liabilities on the balance sheet the same as are being transferred, ensure that DRs test that existing balances, rates, pricing, and funding rates are not impacted"
          },
          {
            "text": "If these assets / liabilities form new products to Absa, ensure DRs assess that these have no impact on the wider balance sheet (e.g., funding issues)"
          }
        ],
        "optional": [
          {
            "text": "Hold a 'Technical DR' before the true DRs take place, to test only the migration solution, and ensure this is not a blocker to future DRs"
          }
        ],
        "nuances": [
          {
            "text": "DRs may need to account for new-to-bank products, or validate no impact on existing products enhanced by the assets/liabilities transferring"
          }
        ],
        "artefacts": [
          {
            "text": "Approved DR strategy: this will cover DR scope, sequencing, success measures and rehearsal cadence (Absa transaction specific)"
          },
          {
            "text": "Previous DR completion records with timestamps, success measure results and lessons learnt (Absa transaction specific)"
          },
          {
            "text": "DR and cutover playbook"
          }
        ],
        "templates": [
          {
            "text": "Runbook template"
          },
          {
            "text": "DR defect template"
          },
          {
            "text": "DR checkpoint template"
          },
          {
            "text": "DR retro template"
          }
        ]
      },
      {
        "id": "go-no-go",
        "index": "08",
        "title": "Go/No-Go",
        "purpose": "Formally discuss and approve/disapprove whether all workstreams and parties are sufficiently ready to proceed with transfer",
        "role": [
          {
            "text": "Drive the collation of evidence across execution, testing, and DRs to present a case for a Go/No-Go decision to the Steering Committee. Liaise with functional leads and AEs to ensure they can clearly state the recommendation of their area."
          }
        ],
        "timeline": "1- 2 weeks",
        "timelineDrivers": [
          {
            "text": "Likelihood for a no-go (no-go decisions require additional justification and discussion)"
          },
          {
            "text": "Existing evidence (if evidence has to be specially sourced and collated, timelines may increase)"
          },
          {
            "text": "SPA stipulations (some SPAs stipulate when Go/No-Go decisions must take place, and how long discussions may last)"
          }
        ],
        "necessary": [
          {
            "text": "Assess the success of DRs, and confirm that all issues from the final DR have been remediated or have clear timelines for remediation"
          },
          {
            "text": "Ensure that at least one successful end to end DR has taken place"
          },
          {
            "text": "Discuss residual risks and mitigation plans across each workstream, with each AE laying out in turn testing results, DR success, and residual risks related to their area"
          },
          {
            "text": "For each residual risk, lay out the potential risk to go-live, likelihood, and mitigation plans"
          },
          {
            "text": "Gather evidence that key conditions have been met such as:",
            "subs": [
              "Regulatory approval",
              "Data extraction and reconciliation in DRs",
              "Financial settlement success in DRs",
              "Absa and seller obligations as stipulated in the SPA"
            ]
          },
          {
            "text": "Gather all AEs / SteerCo members to formally make and document the Go/No-Go decision internally, allowing any reservations to be noted and addressed"
          },
          {
            "text": "Gather buyer and seller AEs to formally make the joint Go/No-Go decision"
          },
          {
            "text": "Formally document go/no position with the Seller and communicate to clients, employees, and regulators"
          }
        ],
        "conditional": [
          {
            "text": "Gather evidence that additional conditions have been met such as:",
            "subs": [
              "Client onboarding",
              "Account set up",
              "Client and contract novations / consents"
            ]
          },
          {
            "text": "Include a Go/No-Go decision related to employee readiness, including the completion of key conditions such as consultations"
          },
          {
            "text": "Include additional regulatory requirements, such as the registration of certain employees with regulatory bodies (e.g., FAIS registration of trading employees)"
          }
        ],
        "optional": [
          {
            "text": "Announce the decision on the local stock exchange to ensure clients / market is aware (e.g., SENS announcement)"
          },
          {
            "text": "Brief the media on the decision, with a series of prepared remarks"
          }
        ],
        "nuances": [
          {
            "text": "Go/No-Go may need to account for client onboarding should clients be in scope for transfer"
          }
        ],
        "artefacts": [
          {
            "text": "Go/No-Go criteria (owned by Inorganic Change Team to use throughout this decision making process)"
          },
          {
            "text": "M&A Learning Academy materials on governance and decision rights"
          },
          {
            "text": "DR and cutover playbook"
          }
        ],
        "templates": [
          {
            "text": "Go/No-Go decision scorecard/paper"
          }
        ]
      },
      {
        "id": "cutover",
        "index": "09",
        "title": "Cutover",
        "purpose": "Execute a controlled and approved transfer of the agreed components to enable ownership to transfer seamlessly",
        "role": [
          {
            "text": "Coordinate the logistical preparation of the cutover, based upon successful DR. Support the execution of the cutover"
          },
          {
            "text": "Run the central control function, coordinating buyer, seller and overseeing workstream execution, against approved runbook."
          },
          {
            "text": "Coordinate cross-workstream dependencies and stakeholder communications through the cutover timeline."
          }
        ],
        "timeline": "24 to 72 hours",
        "timelineDrivers": [
          {
            "text": "Scale of activity required over cutover"
          },
          {
            "text": "Length of individual activities (some activities may last 24 hours + depending on their nature)"
          },
          {
            "text": "Length of time the bank can shut down without impacting service (some jurisdictions have payments flowing over the weekend, others do not)"
          }
        ],
        "necessary": [
          {
            "text": "Work with Data Migration and Technology to define the final cutover plan, iterated during DRs"
          },
          {
            "text": "Walk through the plan again with teams to confirm understanding, roles, and responsibilities"
          },
          {
            "text": "Sign off final cutover plan with all AEs"
          },
          {
            "text": "Coordinate contingency planning across all workstreams, gathering scenarios and planning for potential issues which may arise over the cutover"
          },
          {
            "text": "Define any additional governance to be in place during cutover vs DRs (e.g., additional executive updates, final decision gates, etc)"
          },
          {
            "text": "Execute on cutover plan, including agreed-upon governance gates"
          },
          {
            "text": "Execute on testing activities planned in the runbook to ensure all systems are working as planned"
          },
          {
            "text": "Hold final checkpoint to assess success of the cutover, and define required mitigation plans for issues"
          },
          {
            "text": "Open the bank after cutover activities completed and monitor core systems"
          },
          {
            "text": "Hold regular check-ins to ensure smooth transition to Hypercare"
          }
        ],
        "conditional": [
          {
            "text": "Communicate any residual issues to clients which remain post-cutover, and detail timelines for remediation"
          },
          {
            "text": "Communicate with clients on the success of the cutover, and remind them of new channels into Absa"
          }
        ],
        "optional": [
          {
            "text": "Brief the media on a successful cutover, with pre-prepared executive remarks"
          },
          {
            "text": "Issue an announcement on the stock exchange regarding the successful cutover"
          }
        ],
        "nuances": [
          {
            "text": "Cutover of client data may have to take place if in scope, as well as relevant communications on cutover success and contingency scenarios"
          }
        ],
        "artefacts": [
          {
            "text": "Approved cutover runbook, including a time-sequenced plan: activities, owners, dependencies, control gates, and completion criteria (Absa transaction specific)"
          },
          {
            "text": "Hub & Spoke Operating Model"
          },
          {
            "text": "DR and cutover playbook"
          }
        ],
        "templates": [
          {
            "text": "Cutover checkpoint template"
          }
        ]
      },
      {
        "id": "hypercare",
        "index": "10",
        "title": "Hypercare",
        "purpose": "Stabilise the transferred assets and liabilities and ensure everything in-scope has been transferred completely and accurately.",
        "role": [
          {
            "text": "Monitor a consolidated view of incidents post cutover, and monitor the Hypercare team's triage and remediation efforts"
          },
          {
            "text": "Support the Hypercare team in escalating issues through agreed governance in order to prevent any financial, regulatory or client harm"
          },
          {
            "text": "Assess readiness to exit Hypercare using an agreed checklist and criteria, coordinating a formal handover to BAU"
          },
          {
            "text": "Lead regular updates to executives on tracking of strategic and financial outcomes"
          }
        ],
        "timeline": "1 – 2 months",
        "timelineDrivers": [
          {
            "text": "Scale of assets / liabilities / clients transferring (additional clients means Additional time required to triage and resolve issues)"
          },
          {
            "text": "Capacity within Hypercare team (smaller team takes longer to resolve issues)"
          },
          {
            "text": "Complexity of transfer (a transfer of complex products likely requires more dedicated service time)"
          },
          {
            "text": "Success of cutover (issues on cutover mean an extended Hypercare period will likely be needed to stabilise clients and resolve issues)"
          }
        ],
        "necessary": [
          {
            "text": "Triage issues for remediation, add them to a backlog, and flag with technology / BAU teams as required"
          },
          {
            "text": "Escalate persistent or P1 issues immediately, through a dedicated escalation pathway"
          },
          {
            "text": "Stand up and coordinate war-rooms as necessary to remediate P1 issues quickly and avoid disruption"
          },
          {
            "text": "Gradually hand off servicing to BAU teams by transitioning issue resolution and triage into the BAU process, prioritising only the most serious issues for Hypercare as time passes"
          },
          {
            "text": "Track deal objectives such as revenue, asset/liability transfer, volumes, etc. as soon as LD1, and provide updates to executives on progress against objectives"
          },
          {
            "text": "Hold daily touchpoints with AEs to flag the most important issues and discuss remediation plans"
          }
        ],
        "conditional": [
          {
            "text": "Set up a dedicated team to monitor client queries, feedback, and complaints from only the transferred population"
          },
          {
            "text": "Set up dedicated client communications teams to ensure clients remain in the loop post LD1"
          },
          {
            "text": "Hold regular touchpoints with client-facing teams to discuss client sentiment and assess action plans"
          },
          {
            "text": "Set up dedicated documentation remediation teams to quickly source outstanding documentation which could not be received pre-LD1"
          }
        ],
        "optional": [
          {
            "text": "Reach out to clients directly to assess sentiment"
          }
        ],
        "nuances": [
          {
            "text": "Specific client facing Hypercare teams required should clients and client relationships be transferring to Absa"
          }
        ],
        "artefacts": [
          {
            "text": "Transferred portfolio (Absa transaction specific)"
          },
          {
            "text": "Hub & Spoke operating model"
          },
          {
            "text": "M&A Learning Pathways"
          }
        ],
        "templates": [
          {
            "text": "Hypercare RAID Log"
          },
          {
            "text": "Daily Hypercare status report template"
          }
        ]
      }
    ]
  },
  {
    "archetypeId": "partial-business-acquisition",
    "archetypeName": "Partial-business acquisition",
    "variantLabel": null,
    "sourceTitle": "Partial Business Acquisition",
    "stages": [
      {
        "id": "due-diligence",
        "index": "01",
        "title": "Due Diligence",
        "purpose": "Determine whether the acquisition creates value, what you are actually buying, and what needs to be protected contractually. Legal & CorpDev lead; other areas input where required. Activities below relate to key items for the integration team to consider during this process, they do not override current DD processes",
        "role": [
          {
            "text": "Extract information from the DD process necessary to properly plan and run the implementation"
          },
          {
            "text": "Act as M&A SMEs to provide oversight, bringing a practical, Absa oriented lens which goes beyond financials and ensures nuances are identified and caught based on previous experience"
          }
        ],
        "timeline": "1 – 3 months",
        "timelineDrivers": [
          {
            "text": "Deal perimeter (broader perimeter requires more detailed review)"
          },
          {
            "text": "Product complexity (more complex products are harder to model and project)"
          },
          {
            "text": "Maturity of DD teams (experienced teams can work through a DD checklist in a very short period)"
          },
          {
            "text": "Seller availability (heavily reliant on seller supporting in providing materials)"
          }
        ],
        "necessary": [
          {
            "text": "Ensure virtual data room set up to access confidential documentation and ensure it persists after deal signature"
          },
          {
            "text": "Ensure an NDA process to wall-cross those who need access to confidential information is set up"
          },
          {
            "text": "Understand the acquisition perimeter: which assets and liabilities transfer, how will we interact with what we are not buying, how does not having a full balance sheet impact the financials?"
          },
          {
            "text": "Understanding what the hurdle rates are: what EBITDA, NII, NIM, revenue, operating leverage, ROC, ROE, MOIC, will create a go-decision for deal signing?"
          },
          {
            "text": "Understanding the factors which influenced these hurdle rates, as well as what other non-financial factors may influence decision making (new capabilities, strong brand loyalty, etc)"
          },
          {
            "text": "Build an initial view of project implementation costs, leveraging comparable deals. All assumptions in planning costs must be defensible and informed by functional experts"
          },
          {
            "text": "Build or oversee build of a detailed business case comparing forecasted benefits to project costs and continued running costs"
          },
          {
            "text": "Ensure subject matter experts are engaged to conduct cyber, technology, security, compliance DD to ensure that a deep understanding of these elements is gained during DD, to inform accurate planning"
          },
          {
            "text": "Ensure tax implications have been assessed and remediation planned"
          },
          {
            "text": "Financial-crime review: assess KYC and AML requirements against regulatory requirements, and buyer standards"
          }
        ],
        "conditional": [
          {
            "text": "Coordinate a Day 1 readiness test, to see how the acquired capabilities will operate"
          },
          {
            "text": "Ensure that cost implication of the people movement has been assessed, and agree which will be protected from redundancy, leveraging capability mapping"
          },
          {
            "text": "Ensure total cost of ownership of transferring technology has been understood by leveraging seller provided information, and identify potential cost synergies"
          },
          {
            "text": "Access to this early stage of the lifecycle may not always be possible given the broader business context, but it should be requested given its importance to execution"
          }
        ],
        "optional": [
          {
            "text": "Benchmark estimated performance against previous deals"
          },
          {
            "text": "Review lessons learnt from previous deals"
          },
          {
            "text": "Engage a subset of seller clients to assess current pain points and identify any potential deal red flags (e.g. compliance issues, pricing mismatches, in-scope technology issues)"
          },
          {
            "text": "Engage other buyers of seller business to understand key seller-specific pain points to avoid (e.g., data sharing issues, client communication issues)"
          }
        ],
        "nuances": [
          {
            "text": "DD must account for economies/diseconomies of scale inherent in taking part but not all of a business (e.g., cost base may not be halved by taking half the balance sheet)"
          },
          {
            "text": "DD must account for business line synergies inherent in taking part but not all of a business (e.g., potential to net off FX flows, fly-wheel inherent in having complementary businesses such as deposits and transaction banking)"
          }
        ],
        "artefacts": [
          {
            "text": "Previous transaction materials and lessons learnt (Absa transaction specific)"
          },
          {
            "text": "Business case (Absa transaction specific)"
          }
        ],
        "templates": []
      },
      {
        "id": "legal-drafting-signature",
        "index": "02",
        "title": "Legal Drafting & Signature",
        "purpose": "Ensure the Sale and Purchase Agreement (SPA) reflects reality of programme delivery, and enables execution. Legal & CorpDev lead, other areas input where required. Activities below relate to key integration considerations, they do not overwrite the current processes.",
        "role": [
          {
            "text": "Ensure legals reflect execution reality, and timelines are realistic"
          },
          {
            "text": "Ensure legals include provisions which will support execution, such as data sharing"
          },
          {
            "text": "Ensure any go-live dates are based on realistic assumptions around regulatory approval and client onboarding timelines"
          },
          {
            "text": "Leverage lessons learned from previous deals to ensure legals address any historic pain points"
          }
        ],
        "timeline": "1 – 2 months",
        "timelineDrivers": [
          {
            "text": "Deal complexity (complex deals require additional protections and conditions)"
          },
          {
            "text": "Employee transfer (employee transfer requires an additional agreement drafted)"
          },
          {
            "text": "Technology ownership (addenda may be required to stipulate technology requirements)"
          },
          {
            "text": "Pre-signing alignment (pre-agree valuations and completion mechanisms will speed up drafting)"
          },
          {
            "text": "DD quality (high quality DD will allow defensible assumptions to be made in the legals, otherwise these will have to be assessed during this phase)"
          },
          {
            "text": "Regulatory complexity (multiple regulators across multiple jurisdictions increases complexity in drafting legals)"
          }
        ],
        "necessary": [
          {
            "text": "Engage external lawyers to lead SPA drafting and negotiation, informed by internal legal opinion"
          },
          {
            "text": "Convert DD findings into agreed transaction terms including valuation, adjustment principles, completion mechanisms, and payment terms"
          },
          {
            "text": "Ensure price, adjustments and effective transfer date are agreed"
          },
          {
            "text": "Coordinate and confirm the signing sequence between Absa, the seller and other parties"
          },
          {
            "text": "Document employee transfer, retention and knowledge-transfer obligations"
          },
          {
            "text": "Set out which items will transfer from seller to Absa automatically under agreed regulatory processes (e.g., Section 54), and which will have to be manually transferred"
          },
          {
            "text": "Detail novation processes for items not automatically transferring, whether independent legal opinions on contracts are required, and where liability sits during transfer"
          },
          {
            "text": "Set out the joint governance mechanisms across buyer and seller at a high level (e.g., the scheduling of joint Steering Committees, appointment of Transaction Directors from each party)"
          },
          {
            "text": "Set out joint escalation mechanisms for programme-level issues, as well as dispute resolution mechanisms"
          },
          {
            "text": "Set out stipulations and timings for the sharing of client data, including whether business cases are required, and what can and can't be shared ahead of regulatory approval"
          },
          {
            "text": "Set out conditions precedent for completion, including funds transfer, assets/liabilities transfer, regulatory approval, and board approval"
          },
          {
            "text": "Agree signatures required on each side"
          },
          {
            "text": "Set out completion date precedent on regulatory approval date(s), rather than a pre-agreed specific date"
          },
          {
            "text": "Set out a joint communications plan to clients from both buyer and seller, including timelines for when buyer can engage the clients"
          }
        ],
        "conditional": [
          {
            "text": "If SPA is agreed, complete signing through agreed signing sequence"
          },
          {
            "text": "Detail exact employees (anonymized) to be transferred"
          },
          {
            "text": "Detail seller hiring/redundancy stipulations whilst completion is in progress (e.g. maximum salary to be hired, redundancy processes)"
          },
          {
            "text": "Detail technology maintenance requirements of the seller, and stipulations on major changes"
          },
          {
            "text": "Detail FX payment mechanisms, including adjustments for FX risk and longer settlement times"
          },
          {
            "text": "Define ownership and licensing of shared Intellectual Property"
          },
          {
            "text": "Set out conditions for KYC/AML sanctions within a clean room protocol, detailing specifics around information available to KYC teams, Clean Room data access protections"
          },
          {
            "text": "Access to this early stage of the lifecycle may not always be possible given the broader business context, but it should be requested given its importance to execution"
          }
        ],
        "optional": [
          {
            "text": "Set SPA change control mechanisms"
          },
          {
            "text": "Set up SPA access mechanisms for project team members"
          },
          {
            "text": "Socialise with functional leads ahead of signature"
          }
        ],
        "nuances": [
          {
            "text": "S197 or equivalent should be attached to the SPA as an addendum"
          },
          {
            "text": "Any joint technology agreements should be attached as addenda"
          }
        ],
        "artefacts": [
          {
            "text": "DD summary and agreed deal decisions (Absa deal specific)"
          },
          {
            "text": "M&A lessons learnt (Absa transaction specific)"
          }
        ],
        "templates": [
          {
            "text": "NDA template"
          }
        ]
      },
      {
        "id": "mobilisation-planning",
        "index": "03",
        "title": "Mobilisation & Planning",
        "purpose": "Define the key activities which must take place to enable LD1 to take place on the agreed date, and surface dependencies",
        "role": [
          {
            "text": "Inorganic Change team should lead the mobilisation effort across Absa: briefing functional leads / AEs, onboarding teams, executing the NDA process, creating onboarding materials, briefing teams on detailed plan creation, leading joint planning workshops, translating workshop outputs into a programme plan"
          }
        ],
        "timeline": "6- 10 weeks",
        "timelineDrivers": [
          {
            "text": "Deal complexity (complex deals need more workstreams to execute)"
          },
          {
            "text": "Geographical scope (multiple geographies require more coordination)"
          },
          {
            "text": "Existing knowledge (teams familiar with these deals can draft a detailed plan much faster, and understand dependencies)"
          },
          {
            "text": "Available resource (resource constraints mean activities take longer)"
          }
        ],
        "necessary": [
          {
            "text": "Set up mobilisation hierarchy:",
            "subs": [
              "Board appoints executive sponsor for the deal",
              "Executive sponsor appoints Transaction Director",
              "Transaction Director and Executive Sponsor agree Accountable Executives for each function / workstream",
              "AE selection should be informed by their expected responsibilities, detailed in the Hub and Spoke Operating Model",
              "AEs appoint functional workstream leads, who appoint in-country leads",
              "Transaction Director mobilises central Inorganic Change team and in-country coordinators",
              "Buyer and Seller Inorganic Change teams share lists of functional leads to enable joint planning",
              "Joint and individual governance established based on Mobilisation Toolkit"
            ]
          },
          {
            "text": "Define key workstreams required based on the deal-archetype and SPA specifics, including rough size of each workstream"
          },
          {
            "text": "Define workstream charters per workstream, setting out objective, purpose, success metrics, key personnel, skills, and ownership"
          },
          {
            "text": "Jointly carry out workstream blueprints across buyer and seller, laying out each business process related to the workstream, which the seller will stop, which the buyer will start, and which will carry on as is"
          },
          {
            "text": "Define key milestones required to enable these process and achieve a seamless cutover at Legal Day 1 (LD1)"
          },
          {
            "text": "Support each workstream to define a detailed, L2 plan below this to enable the meeting of these milestones"
          },
          {
            "text": "Hold joint workshops across buyer and seller to discuss and agree on these milestones"
          },
          {
            "text": "Identify milestones with key dependencies across workstreams, and document these dependencies in detail"
          },
          {
            "text": "Identify the critical path, and dates/factors will have a material impact on completion, and which of these can be controlled (e.g., regulatory approval or bank-wide change freezes cannot be controlled, client onboarding must take place ahead of LD1 but non-BAU processes can speed up timelines, data migration solution build and test is critical to LD1 success, etc)"
          },
          {
            "text": "Translate the milestones into an overarching project plan to be tracked weekly"
          },
          {
            "text": "Agree initial LD1 readiness criteria per workstream (key performance indicators which will enable cutover, e.g., for HR, 100% of consultations complete)"
          },
          {
            "text": "Agree on internal governance cadence which will sync with joint governance laid out in the SPA, including:",
            "subs": [
              "Internal and joint Inorganic Change meetings weekly / bi-weekly to align on priorities and joint risks/issues",
              "Working group / workstream led sessions to discuss key risks, issues, and progress",
              "Internal Steering Committee sessions to escalate Absa-specific risks and issues, and receive guidance on key decisions",
              "Joint Steering Committee sessions to discuss joint risks and issues, and coordinate cross-party solutions"
            ]
          },
          {
            "text": "Translate DD findings and governance structures into onboarding materials which clearly articulate the purpose and objectives of the deal, how execution will run day to day, roles and responsibilities, and escalation pathways"
          }
        ],
        "conditional": [
          {
            "text": "Submit a version of the programme plan to the regulator alongside the request for approval"
          },
          {
            "text": "Create a detailed workstream plan for employee / tech transfer"
          },
          {
            "text": "Set up TSA exit team and define timeline for complete TSA exit"
          }
        ],
        "optional": [
          {
            "text": "Translate the project plan into project management software (e.g., Jira, MSP)"
          },
          {
            "text": "Link governance into bank-level governance such as Board meetings, StratCos, etc"
          }
        ],
        "nuances": [
          {
            "text": "Acquired components cannot operate independently, so missing capabilities must be available by Day 1"
          },
          {
            "text": "Different components may require different transfer or implementation dates"
          },
          {
            "text": "Multiple regulators may have to be engaged if multiple elements of the business are transferring (e.g., FSCA for client experience considerations, PA for prudence/capital considerations)"
          }
        ],
        "artefacts": [
          {
            "text": "TSA agreements (Absa transaction specific)"
          },
          {
            "text": "Regulatory commitments and approval timelines (Absa transaction specific)"
          },
          {
            "text": "Previous transaction playbooks with lessons learned (Absa transaction specific)"
          },
          {
            "text": "Hub & Spoke operating model"
          },
          {
            "text": "Mobilisation toolkit"
          }
        ],
        "templates": [
          {
            "text": "Workstream blueprints"
          },
          {
            "text": "High-level transaction plan template"
          },
          {
            "text": "Detail excel project plan"
          },
          {
            "text": "Governance forums Terms of Reference"
          }
        ]
      },
      {
        "id": "programme-execution",
        "index": "04",
        "title": "Programme Execution",
        "purpose": "Execute on agreed milestones, run governance cadence, and build required technical/data solutions",
        "role": [
          {
            "text": "Inorganic Change Team acts as the central hub in the execution phase, driving workstream level execution, tracking RAID items, defining SteerCo material, and holding those responsible for execution accountable"
          }
        ],
        "timeline": "12 – 18 months",
        "timelineDrivers": [
          {
            "text": "Regulatory approval timelines"
          },
          {
            "text": "Deal perimeter and scope"
          },
          {
            "text": "New product build (additional product build requires more delivery time)"
          },
          {
            "text": "Data complexity (Complex structures require a more nuanced data migration solution)"
          },
          {
            "text": "Seller cooperation (early sharing of data, and daily cooperation speeds up timelines)"
          }
        ],
        "necessary": [
          {
            "text": "Conduct programme management activities: run governance processes including workstream sessions, Exec SteerCos, and Joint Buyer/Seller SteerCos; set up and track risks and issues in a central RAID log, and escalate to SteerCo as appropriate"
          },
          {
            "text": "Ensure product gap analysis is conducted to identify which product decisions must be made"
          },
          {
            "text": "Ensure new product build decisions are made, leveraging detailed business cases on revenue, strategic, and client experience opportunities vs cost to build to New Product Authorities"
          },
          {
            "text": "Drive development of new products through regular touchpoints led by Technology Workstream leadership and fed into programme governance"
          },
          {
            "text": "Provide regular updates to the Board and Bank Leadership Forums on progress against plan, key risks and issues, and LD1 viability"
          },
          {
            "text": "Engage the regulator regularly to update progress and assess approval timelines"
          },
          {
            "text": "Conduct contingency and scenario planning for if approvals arrive later than anticipated, and define final possible date for receipt before LD1 must move"
          },
          {
            "text": "Build out detailed client communication plan across buyer and seller, and keep clients updated on the progress of the programme, and when they can expect to be onboarded"
          },
          {
            "text": "Request that the seller shares a data dictionary detailing data structures across source systems"
          },
          {
            "text": "Ensure source-to-target mapping across all systems is conducted to enable build of core data migration solution"
          },
          {
            "text": "Drive the build of the data migration solution to Extract, Transform, and Load (ETL) solution across all source systems into target systems"
          },
          {
            "text": "Ensure the data migration solution is tested using dummy data aligned to the data dictionary, or where possible, real client data"
          },
          {
            "text": "Agree with the seller what data can be transferred ahead of LD1, and load it into Absa systems early to avoid cutover complications"
          },
          {
            "text": "Define success criteria across all workstreams, and continually measure progress against these"
          },
          {
            "text": "Work with the seller to receive regularly updated financials, update the business case, and track that the deal remains aligned to strategic objectives"
          }
        ],
        "conditional": [
          {
            "text": "Oversee the plan and execution of new product build across lines of business"
          },
          {
            "text": "Set up a Clean Room to conduct KYC/AML checks, which should be entirely 'airgapped' - agree on Clean Room protocols with the seller"
          },
          {
            "text": "Onboard external KYC/AML experts to expedite the Clean Room process"
          },
          {
            "text": "Define a target operating model for once new employees land – define design principles, key roles and responsibilities, skills assessment, and target state structure"
          },
          {
            "text": "If TSAs are in place, monitor service delivery and exit planning"
          },
          {
            "text": "Ensure joint technology specifications with the seller defined (e.g., Joint Application Development (JAD) documentation, API documentation, technical requirements, business requirements)"
          },
          {
            "text": "Agree and execute a joint technology build governance structure to drive joint progress"
          },
          {
            "text": "Ensure transferring employee packages defined and socialised through consultations"
          }
        ],
        "optional": [
          {
            "text": "Engage friendly clients during the process to assess key value proposition and ensure project execution remains aligned"
          },
          {
            "text": "Conduct change management activities for project execution teams to drive continued buy-in and morale (e.g., team socials, rewards, etc)"
          }
        ],
        "nuances": [
          {
            "text": "Employee consultations and reward package design"
          },
          {
            "text": "Target Operating Model design includes new employees"
          },
          {
            "text": "Technology workstream includes activity on transferring seller technology into buyer systems"
          },
          {
            "text": "Buyer execution must align with seller carve-out plans"
          }
        ],
        "artefacts": [
          {
            "text": "Detail project plan built out from mobilisation and planning stage (Absa transaction specific)",
            "subs": [
              "With associated excel programme plan"
            ]
          },
          {
            "text": "Previous project playbooks with lessons learnt (Absa transaction specific)"
          },
          {
            "text": "Hub & Spoke operating model"
          },
          {
            "text": "Mobilisation toolkit"
          }
        ],
        "templates": [
          {
            "text": "Workstream status report template"
          },
          {
            "text": "Joint buyer and seller status report template"
          },
          {
            "text": "Programme RAID log template with added SteerCo escalation if necessary"
          }
        ]
      },
      {
        "id": "business-testing",
        "index": "05",
        "title": "Business Testing",
        "purpose": "Check that new business functionality works correctly",
        "role": [],
        "timeline": "2 – 3 months (concurrent with execution, post-build)",
        "timelineDrivers": [
          {
            "text": "Scale of business process change"
          },
          {
            "text": "Testing expertise in-house (testing SMEs within each team means scripts require less review and testing can happen faster)"
          },
          {
            "text": "Capacity within teams to accommodate testing (needs to be balanced with BAU, build, other deal-related work)"
          },
          {
            "text": "Complexity of process change (complex new systems or products require significant testing)"
          },
          {
            "text": "Downstream systems (impact of changes on multiple downstream systems requires more extensive end-to-end testing)"
          }
        ],
        "necessary": [
          {
            "text": "Work with BAU teams and functional / product SMEs to detail every business process impacted by changes the programme has made"
          },
          {
            "text": "Work with technology teams to understand the requirements for testing environments, including end-to-end environments"
          },
          {
            "text": "Book these environments well in advance, or flag if suitable environments do not yet exist and must be built"
          },
          {
            "text": "Set up an independent testing team to liaise with business and technology to drive test script creation and sign off"
          },
          {
            "text": "Designate a testing lead within each workstream responsible for coordinating and executing tests assigned to them"
          },
          {
            "text": "Drive execution of test scripts by the business, with oversight from the testing team"
          },
          {
            "text": "Conduct negative testing to ensure controls are functioning as expected"
          },
          {
            "text": "Once individual processes are validated, test every process end-to-end, including the feed into downstream systems like AML, finance, and HR systems"
          },
          {
            "text": "Set up a testing-specific defect log to track issues to closure"
          },
          {
            "text": "Re-test issues post closure end-to-end, to ensure the fix has not created additional issues"
          },
          {
            "text": "Conduct Production Validation Testing to check that new functionality works in production as well as in test environments"
          },
          {
            "text": "Set up testing-specific governance, and feed into programme governance"
          },
          {
            "text": "Secure executive and business sign off on testing closure, with any open items clearly detailed"
          }
        ],
        "conditional": [
          {
            "text": "Test the flow of data into HR systems such as Workday or Oracle"
          },
          {
            "text": "Test that only data in the scope of the deal is coming across, and data related to products outside of the perimeter is filtered out"
          },
          {
            "text": "Test that any new systems stood up can receive data as expected"
          },
          {
            "text": "Test that seller systems transferring to the buyer can migrate as expected, with no disruption in service"
          }
        ],
        "optional": [
          {
            "text": "Conduct friendly client testing to ensure that end-to-end flows work in a real world scenario"
          }
        ],
        "nuances": [
          {
            "text": "Testing may include data flow into HR systems"
          },
          {
            "text": "End-to-end testing may include flows back into seller systems which will transfer to the buyer"
          }
        ],
        "artefacts": [
          {
            "text": "Previous business testing programmes with lessons learnt, including a scenario-based risk mitigation plan (Absa transaction specific)"
          },
          {
            "text": "Business testing process flows and customer journeys (Absa transaction specific)"
          }
        ],
        "templates": [
          {
            "text": "Detailed business testing plan template"
          }
        ]
      },
      {
        "id": "client-onboarding-ld1-readiness",
        "index": "06",
        "title": "Client Onboarding & LD1 Readiness",
        "purpose": "Onboard new clients to buyer systems, communicate requirements and functionality with clients",
        "role": [
          {
            "text": "Oversee the standing up of an LD1 Readiness stream, and tracking its progress and risks as part of programme management to assess critical risks to LD1"
          }
        ],
        "timeline": "2 – 4 months (concurrent to execution)",
        "timelineDrivers": [
          {
            "text": "Scale of client transfer (more clients require communication and training)"
          },
          {
            "text": "Complexity of client product mix (complex products and multi-product portfolios increase time to onboard)"
          },
          {
            "text": "Availability of client data (high-quality client contact data removes time spent on remediation)"
          },
          {
            "text": "Client responsiveness (heavily reliant on clients responding to outreach and providing documentation)"
          }
        ],
        "necessary": [
          {
            "text": "Assess in detail the client onboarding process, understand timelines, and define a 'drop-dead date' for when onboarding must begin"
          },
          {
            "text": "Assess which onboarding processes must be done BAU, and which can be adapted to suit deal context and timelines"
          },
          {
            "text": "Detail all client documentation required to enable onboarding"
          },
          {
            "text": "Perform gap analysis to understand which information can be sourced from the seller, and which clients must provide directly"
          },
          {
            "text": "Ensure client contact details are shared by seller as early as possible, and track client outreach"
          },
          {
            "text": "Conduct risk assessment to understand which clients are high risk, and which some documentation can be obtained post-LD1"
          },
          {
            "text": "Confirm required KYC / AML documentation in place across transferring clients"
          },
          {
            "text": "Build training materials, working closely with business SMEs"
          },
          {
            "text": "Build out materials outlining the value proposition of Absa to new clients, including for products which they do not yet have to drive cross-sell opportunities"
          },
          {
            "text": "Set up sessions to train clients on bank systems and channels"
          },
          {
            "text": "Set up client accounts, profiles, products, permissions, and mandates ahead of time to enable Dress Rehearsals and testing"
          },
          {
            "text": "Define and test the updated service model"
          },
          {
            "text": "Begin the implementation of the Target Operating Model within Absa"
          },
          {
            "text": "Define the Hypercare model for post go-live, including detailed roles and responsibilities"
          },
          {
            "text": "Discuss with the seller the potential for onboarding clients ahead of LD1 to de-risk the cutover weekend"
          }
        ],
        "conditional": [
          {
            "text": "Conduct employee training as required"
          },
          {
            "text": "Train existing clients on new systems being built as part of the deal"
          }
        ],
        "optional": [
          {
            "text": "Onboard some clients early to conduct friendly-client testing with new to bank clients"
          }
        ],
        "nuances": [
          {
            "text": "Employee training materials and sessions may also be required, especially for client facing employees required to be operational on LD1"
          }
        ],
        "artefacts": [
          {
            "text": "Client onboarding playbook (Absa transaction specific)"
          },
          {
            "text": "Client training materials (Absa transaction specific)"
          }
        ],
        "templates": []
      },
      {
        "id": "dress-rehearsals",
        "index": "07",
        "title": "Dress Rehearsals",
        "purpose": "Testing end-to-end approach to cutover in order to raise and resolve any issues which would prevent a successful transfer",
        "role": [
          {
            "text": "Coordinate the logistical preparation of the DRs, support the Data Migration team in defining the runbook, support the execution of the DRs either as logistical support or by acting as Data Migration Coordinators (DMCs)."
          }
        ],
        "timeline": "8 – 12 weeks",
        "timelineDrivers": [
          {
            "text": "Time remaining post build and test (if build and test finishes well ahead of LD1, more DRs can take place)"
          },
          {
            "text": "Number of Dress Rehearsals (DRs) (more DRs require a longer timeframe)"
          },
          {
            "text": "Down-time between DRs (minimum 2 weeks between DRs is recommended)"
          }
        ],
        "necessary": [
          {
            "text": "Work with the Data Migration and Technology teams to define cutover plan which details every activity down to the minute required to wind down the seller and stand up the buyer"
          },
          {
            "text": "Hold runbook run-through sessions with all activity owners and back-ups to ensure everyone is clear on expectations"
          },
          {
            "text": "Define success metrics for DRs, with a clear understanding of what is acceptable in the first DR vs the final DR"
          },
          {
            "text": "Agree which data sets will be dummy / anonymised, and which will be real client data"
          },
          {
            "text": "Define roles and responsibilities across DRs and Cutover, including Data Migration Controllers running the runbook"
          },
          {
            "text": "Execute logistical support required to enable 24/7 DRs to take place such as building access, food requirements, accommodation, travel, Wi-Fi, security, facilities, and back-up plans"
          },
          {
            "text": "Define the governance processes to take place during DRs including the command centre, regular executive updates, escalation pathways, war room protocols, issue resolution processes, and continency decision making"
          },
          {
            "text": "Collate a DR playbook summarising success criteria, logistical information, key contacts, governance processes, and timelines"
          },
          {
            "text": "Run a minimum of 4 DRs across weekends, with at least 2 weeks in between each"
          },
          {
            "text": "Each DR should execute the runbook end-to-end, and track issues which arise for remediation"
          },
          {
            "text": "Hold DR retros to note lessons learnt and iterate into subsequent DRs"
          },
          {
            "text": "Track the remediation of issues ahead of subsequent DRs"
          }
        ],
        "conditional": [
          {
            "text": "Include DR activities which simulate the physical onboarding of employees, testing access passes, system access, laptop set up, etc"
          },
          {
            "text": "Include DR activities which relate to the set up of brand new systems or migration of seller technology into buyer environments"
          }
        ],
        "optional": [
          {
            "text": "Hold a 'Technical DR' before the true DRs take place, to test only the migration solution, and ensure this is not a blocker to future DRs"
          }
        ],
        "nuances": [
          {
            "text": "DRs may need to account for physical employee onboarding, which should be simulated as far as possible to avoid disruptions on cutover"
          }
        ],
        "artefacts": [
          {
            "text": "Approved DR strategy: this will cover DR scope, sequencing, success measures and rehearsal cadence (Absa transaction specific)"
          },
          {
            "text": "Previous DR completion records with timestamps, success measure results and lessons learnt (Absa transaction specific)"
          },
          {
            "text": "DR and cutover playbook"
          }
        ],
        "templates": [
          {
            "text": "Runbook template"
          },
          {
            "text": "DR defect template"
          },
          {
            "text": "DR checkpoint template"
          },
          {
            "text": "DR retro template"
          }
        ]
      },
      {
        "id": "go-no-go",
        "index": "08",
        "title": "Go/No-Go",
        "purpose": "Formally discuss and approve/disapprove whether all workstreams and parties are sufficiently ready to proceed with transfer",
        "role": [
          {
            "text": "Drive the collation of evidence across execution, testing, and DRs to present a case for a Go/No-Go decision to the Steering Committee. Liaise with functional leads and AEs to ensure they can clearly state the recommendation of their area."
          }
        ],
        "timeline": "1- 2 weeks",
        "timelineDrivers": [
          {
            "text": "Likelihood for a no-go (no-go decisions require additional justification and discussion)"
          },
          {
            "text": "Existing evidence (if evidence has to be specially sourced and collated, timelines may increase)"
          },
          {
            "text": "SPA stipulations (some SPAs stipulate when Go/No-Go decisions must take place, and how long discussions may last)"
          }
        ],
        "necessary": [
          {
            "text": "Assess the success of DRs, and confirm that all issues from the final DR have been remediated or have clear timelines for remediation"
          },
          {
            "text": "Ensure that at least one successful end to end DR has taken place"
          },
          {
            "text": "Discuss residual risks and mitigation plans across each workstream, with each AE laying out in turn testing results, DR success, and residual risks related to their area"
          },
          {
            "text": "For each residual risk, lay out the potential risk to go-live, likelihood, and mitigation plans"
          },
          {
            "text": "Gather evidence that key conditions have been met such as:",
            "subs": [
              "Client onboarding",
              "Account set up",
              "Regulatory approval",
              "Client and contract novations / consents",
              "Data extraction and reconciliation in DRs",
              "Financial settlement success in DRs",
              "Absa and seller obligations as stipulated in the SPA"
            ]
          },
          {
            "text": "Gather all AEs / SteerCo members to formally make and document the Go/No-Go decision internally, allowing any reservations to be noted and addressed"
          },
          {
            "text": "Gather buyer and seller AEs to formally make the joint Go/No-Go decision"
          },
          {
            "text": "Formally document go/no position with the Seller and communicate to clients, employees, and regulators"
          }
        ],
        "conditional": [
          {
            "text": "Include a Go/No-Go decision related to employee readiness, including the completion of key conditions such as consultations"
          },
          {
            "text": "Include additional regulatory requirements, such as the registration of certain employees with regulatory bodies (e.g., FAIS registration of trading employees)"
          }
        ],
        "optional": [
          {
            "text": "Announce the decision on the local stock exchange to ensure clients / market is aware (e.g., SENS announcement)"
          },
          {
            "text": "Brief the media on the decision, with a series of prepared remarks"
          }
        ],
        "nuances": [
          {
            "text": "Go/No-Go may need to account for employee readiness, which Should be assesseded relative to those employees which are critical to the functioning of the bank on LD1"
          }
        ],
        "artefacts": [
          {
            "text": "Go/No-Go criteria (owned by Inorganic Change Team to use throughout this decision making process)"
          },
          {
            "text": "M&A Learning Academy materials on governance and decision rights"
          },
          {
            "text": "DR and cutover playbook"
          }
        ],
        "templates": [
          {
            "text": "Go/No-Go decision scorecard/paper"
          }
        ]
      },
      {
        "id": "cutover",
        "index": "09",
        "title": "Cutover",
        "purpose": "Execute a controlled and approved transfer of the agreed components to enable ownership to transfer seamlessly",
        "role": [
          {
            "text": "Coordinate the logistical preparation of the cutover, based upon successful DR. Support the execution of the cutover"
          },
          {
            "text": "Run the central control function, coordinating buyer, seller and overseeing workstream execution, against approved runbook."
          },
          {
            "text": "Coordinate cross-workstream dependencies and stakeholder communications through the cutover timeline."
          }
        ],
        "timeline": "24 to 72 hours",
        "timelineDrivers": [
          {
            "text": "Scale of activity required over cutover"
          },
          {
            "text": "Length of individual activities (some activities may last 24 hours + depending on their nature)"
          },
          {
            "text": "Length of time the bank can shut down without impacting service (some jurisdictions have payments flowing over the weekend, others do not)"
          }
        ],
        "necessary": [
          {
            "text": "Work with Data Migration and Technology to define the final cutover plan, iterated during DRs"
          },
          {
            "text": "Walk through the plan again with teams to confirm understanding, roles, and responsibilities"
          },
          {
            "text": "Sign off final cutover plan with all AEs"
          },
          {
            "text": "Coordinate contingency planning across all workstreams, gathering scenarios and planning for potential issues which may arise over the cutover"
          },
          {
            "text": "Define any additional governance to be in place during cutover vs DRs (e.g., additional executive updates, final decision gates, etc)"
          },
          {
            "text": "Execute on cutover plan, including agreed-upon governance gates"
          },
          {
            "text": "Execute on testing activities planned in the runbook to ensure all systems are working as planned"
          },
          {
            "text": "Hold final checkpoint to assess success of the cutover, and define required mitigation plans for issues"
          },
          {
            "text": "Open the bank after cutover activities completed and monitor core systems"
          },
          {
            "text": "Communicate with clients on the success of the cutover, and remind them of new channels into the buyer"
          },
          {
            "text": "Hold regular check-ins to ensure smooth transition to Hypercare"
          }
        ],
        "conditional": [
          {
            "text": "Execute on the employee onboarding cutover plan, ensuring new employees have necessary system and building access on LD1"
          },
          {
            "text": "Communicate any residual issues to clients which remain post-cutover, and detail timelines for remediation"
          }
        ],
        "optional": [
          {
            "text": "Brief the media on a successful cutover, with pre-prepared executive remarks"
          },
          {
            "text": "Issue an announcement on the stock exchange regarding the successful cutover"
          }
        ],
        "nuances": [
          {
            "text": "Cutover of employees including data and official employment status may also have to take place, with onboarding onto Absa systems"
          }
        ],
        "artefacts": [
          {
            "text": "Approved cutover runbook, including a time-sequenced plan: activities, owners, dependencies, control gates, and completion criteria (Absa transaction specific)"
          },
          {
            "text": "Hub & Spoke Operating Model"
          },
          {
            "text": "DR and cutover playbook"
          }
        ],
        "templates": [
          {
            "text": "Cutover checkpoint template"
          }
        ]
      },
      {
        "id": "hypercare",
        "index": "10",
        "title": "Hypercare",
        "purpose": "Stabilise the transferred assets and liabilities and ensure everything in-scope has been transferred completely and accurately.",
        "role": [
          {
            "text": "Monitor a consolidated view of incidents post cutover, and monitor the Hypercare team's triage and remediation efforts"
          },
          {
            "text": "Support the Hypercare team in escalating issues through agreed governance in order to prevent any financial, regulatory or client harm"
          },
          {
            "text": "Assess readiness to exit Hypercare using an agreed checklist and criteria, coordinating a formal handover to BAU"
          },
          {
            "text": "Lead regular updates to executives on tracking of strategic and financial outcomes"
          }
        ],
        "timeline": "1 – 2 months",
        "timelineDrivers": [
          {
            "text": "Number of clients transferring (additional clients means Additional time required to triage and resolve issues)"
          },
          {
            "text": "Capacity within Hypercare team (smaller team takes longer to resolve issues)"
          },
          {
            "text": "Complexity of transfer (a transfer of complex clients with complex products likely requires more dedicated service time)"
          },
          {
            "text": "Success of cutover (issues on cutover mean an extended Hypercare period will likely be needed to stabilise clients and resolve issues)"
          }
        ],
        "necessary": [
          {
            "text": "Set up a dedicated team to monitor client queries, feedback, and complaints from only the transferred population"
          },
          {
            "text": "Triage issues for remediation, add them to a backlog, and flag with technology / BAU teams as required"
          },
          {
            "text": "Escalate persistent or P1 issues immediately, through a dedicated escalation pathway"
          },
          {
            "text": "Stand up and coordinate war-rooms as necessary to remediate P1 issues quickly and avoid disruption"
          },
          {
            "text": "Set up dedicated client communications teams to ensure clients remain in the loop post LD1"
          },
          {
            "text": "Set up dedicated documentation remediation teams to quickly source outstanding documentation which could not be received pre-LD1"
          },
          {
            "text": "Gradually hand off servicing to BAU teams by transitioning issue resolution and triage into the BAU process, prioritising only the most serious issues for Hypercare as time passes"
          },
          {
            "text": "Track deal objectives such as revenue, asset/liability transfer, volumes, etc. as soon as LD1, and provide updates to executives on progress against objectives"
          },
          {
            "text": "Hold daily touchpoints with AEs to flag the most important issues and discuss remediation plans"
          },
          {
            "text": "Hold regular touchpoints with client-facing teams to discuss client sentiment and assess action plans"
          }
        ],
        "conditional": [
          {
            "text": "Set up a Hypercare centre for transferred employees, as a dedicated channel for any procedural, technical, or facilities-based issues"
          },
          {
            "text": "Leverage seller capacity and knowledge to support Hypercare for systems which have transitioned from seller to buyer"
          }
        ],
        "optional": [
          {
            "text": "Reach out to clients directly to assess sentiment"
          }
        ],
        "nuances": [
          {
            "text": "Hypercare systems may also be set up to support employees"
          },
          {
            "text": "Seller knowledge may be required to support Hypercare for transferred systems/technologies"
          }
        ],
        "artefacts": [
          {
            "text": "Transferred portfolio of clients (Absa transaction specific)"
          },
          {
            "text": "Hub & Spoke operating model"
          },
          {
            "text": "M&A Learning Pathways"
          }
        ],
        "templates": [
          {
            "text": "Hypercare RAID Log"
          },
          {
            "text": "Daily Hypercare status report template"
          }
        ]
      }
    ]
  },
  {
    "archetypeId": "full-business-acquisition",
    "archetypeName": "Full-business acquisition",
    "variantLabel": "Variant A · Buyer integrates the business",
    "sourceTitle": "Full Business Acquisition A (Buyer integrates the business)",
    "stages": [
      {
        "id": "due-diligence",
        "index": "01",
        "title": "Due Diligence",
        "purpose": "Determine whether the acquisition creates value, what you are actually buying, and what needs to be protected contractually. Legal & CorpDev lead; other areas input where required. Activities below relate to key items for the integration team to consider during this process, they do not override current DD processes",
        "role": [
          {
            "text": "Extract information from the DD process necessary to properly plan and run the implementation"
          },
          {
            "text": "Act as M&A SMEs to provide oversight, bringing a practical, Absa oriented lens which goes beyond financials and ensures nuances are identified and caught based on previous experience"
          }
        ],
        "timeline": "2 – 3 months",
        "timelineDrivers": [
          {
            "text": "Acquired firm's product set (broader product set requires more detailed review, e.g., inclusion of intellectual property, branding, technology systems, etc)"
          },
          {
            "text": "Maturity of DD teams (experienced teams can work through a DD checklist in a very short period)"
          },
          {
            "text": "Seller availability (heavily reliant on seller supporting in providing materials)"
          }
        ],
        "necessary": [
          {
            "text": "Ensure virtual data room set up to access confidential documentation and ensure it persists after deal signature"
          },
          {
            "text": "Ensure an NDA process to wall-cross those who need access to confidential information is set up"
          },
          {
            "text": "Understanding what the hurdle rates are: what EBITDA, NII, NIM, revenue, operating leverage, ROC, ROE, MOIC, will create a go-decision for deal signing?"
          },
          {
            "text": "Understanding the factors which influenced these hurdle rates, as well as what other non-financial factors may influence decision making (new capabilities, strong brand loyalty, etc)"
          },
          {
            "text": "Build an initial view of project implementation costs, leveraging comparable deals. All assumptions in planning costs must be defensible and informed by functional experts"
          },
          {
            "text": "Build or oversee build of a detailed business case comparing forecasted benefits to project costs and continued running costs"
          },
          {
            "text": "Ensure DD has accounted for and documented all legal entities, subsidiaries, branches, and ownership structures to inform execution operating model"
          },
          {
            "text": "Ensure DD has documented the effectiveness of governance, risk management, and internal controls"
          },
          {
            "text": "Ensure DD includes assessment of management capability, organisational health and cultural compatibility to inform change management activities required"
          },
          {
            "text": "Ensure subject matter experts are engaged to conduct cyber, technology, security, compliance DD to ensure that a deep understanding of these elements is gained during DD, to inform accurate planning"
          },
          {
            "text": "Ensure subject matter experts are engaged to conduct DD on the overall operational health of the business in areas such as brand value, intellectual property value, goodwill, client sentiment, etc."
          },
          {
            "text": "Support the DD team to develop the integration thesis, synergy case and target operating model options"
          },
          {
            "text": "Ensure tax implications have been assessed and remediation planned"
          },
          {
            "text": "Financial-crime review: assess KYC and AML requirements against regulatory requirements, and Absa standards"
          },
          {
            "text": "Coordinate a Day 1 readiness test, to see how the acquired capabilities will operate"
          },
          {
            "text": "Ensure that cost implication of the people movement has been assessed, and agree which will be protected from redundancy, leveraging capability mapping"
          },
          {
            "text": "Ensure total cost of ownership of transferring technology has been understood by leveraging seller provided information, and identify potential cost synergies"
          },
          {
            "text": "Ensure existing obligations of the selling legal entity are assessed, to inform execution"
          },
          {
            "text": "Ensure that the value of intangible assets is also considered and assessed"
          },
          {
            "text": "Ensure the integration thesis and synergy case is developed and drivers understood"
          },
          {
            "text": "Ensure Target Operating Model options are initially defined"
          },
          {
            "text": "Ensure product overlap and rationalisation opportunities are assessed"
          },
          {
            "text": "Ensure cultural compatibility and change requirements are assessed"
          }
        ],
        "conditional": [
          {
            "text": "Assess the requirement for TSAs from the seller, and the cost of these"
          },
          {
            "text": "Access to this early stage of the lifecycle may not always be possible given the broader business context, but it should be requested given its importance to execution"
          }
        ],
        "optional": [
          {
            "text": "Benchmark estimated performance against previous deals"
          },
          {
            "text": "Review lessons learnt from previous deals"
          },
          {
            "text": "Engage a subset of seller clients to assess current pain points and identify any potential deal red flags (e.g. compliance issues, pricing mismatches, in-scope technology issues)"
          },
          {
            "text": "Engage previous buyers of seller business to understand key seller-specific pain points to avoid (e.g., data sharing issues, client communication issues)"
          }
        ],
        "nuances": [
          {
            "text": "DD must account for shift of new business into Absa cost environment, including accounting for different fixed cost base, funding rates, etc"
          },
          {
            "text": "DD must account for business line synergies inherent in taking all of the business, and assess pricing elasticity (e.g., can acquired clients be easily repriced if Absa prices are higher)"
          },
          {
            "text": "DD must account for the acquisition of a full legal entity and its subsidiaries, assessing any outstanding obligations the entity has"
          }
        ],
        "artefacts": [
          {
            "text": "Previous transaction materials and lessons learnt (Absa transaction specific)"
          },
          {
            "text": "Business case (Absa transaction specific)"
          }
        ],
        "templates": []
      },
      {
        "id": "legal-drafting-signature",
        "index": "02",
        "title": "Legal Drafting & Signature",
        "purpose": "Ensure the Sale and Purchase Agreement (SPA) reflects reality of programme delivery, and enables execution. Legal & CorpDev lead, other areas input where required. Activities below relate to key integration considerations, they do not overwrite the current processes.",
        "role": [
          {
            "text": "Ensure legals reflect execution reality, and timelines are realistic"
          },
          {
            "text": "Ensure legals include provisions which will support execution, such as data sharing"
          },
          {
            "text": "Ensure any go-live dates are based on realistic assumptions around regulatory approval and client onboarding timelines"
          },
          {
            "text": "Leverage lessons learned from previous deals to ensure legals address any historic pain points"
          }
        ],
        "timeline": "1 – 2 months",
        "timelineDrivers": [
          {
            "text": "Deal complexity (complex deals require additional protections and conditions)"
          },
          {
            "text": "Scale of employee transfer (significant employee transfer requires additional legals and schedule negotiation)"
          },
          {
            "text": "Technology ownership (addenda will be required to stipulate technology requirements)"
          },
          {
            "text": "Pre-signing alignment (pre-agree valuations and completion mechanisms will speed up drafting)"
          },
          {
            "text": "DD quality (high quality DD will allow defensible assumptions to be made in the legals, otherwise these will have to be assessed during this phase)"
          },
          {
            "text": "Regulatory complexity (multiple regulators across multiple jurisdictions increases complexity in drafting legals)"
          },
          {
            "text": "Branding and intangibles (transfer of ownership of branding and intangible assets requires addenda to be negotiated)"
          }
        ],
        "necessary": [
          {
            "text": "Engage external lawyers to lead SPA drafting and negotiation, informed by internal legal opinion"
          },
          {
            "text": "Convert DD findings into agreed transaction terms including valuation, adjustment principles, completion mechanisms, and payment terms"
          },
          {
            "text": "Ensure price, adjustments and effective transfer date are agreed"
          },
          {
            "text": "Coordinate and confirm the signing sequence between Absa, the seller and other parties"
          },
          {
            "text": "Document employee transfer, retention and knowledge-transfer obligations"
          },
          {
            "text": "Assess which items transfer from the seller to Absa automatically under agreed regulatory processes (e.g., Section 54), and which will have to be manually transferred"
          },
          {
            "text": "Detail novation processes for items not automatically transferring, whether independent legal opinions on contracts are required, and where liability sits during transfer"
          },
          {
            "text": "Set out the joint governance mechanisms across buyer and seller at a high level (e.g., the scheduling of joint Steering Committees, appointment of Transaction Directors from each party)"
          },
          {
            "text": "Set out joint escalation mechanisms for programme-level issues, as well as dispute resolution mechanisms"
          },
          {
            "text": "Set out stipulations and timings for the sharing of client data, including whether business cases are required, and what can and can't be shared ahead of regulatory approval"
          },
          {
            "text": "Set out conditions precedent for completion, including funds transfer, assets/liabilities transfer, regulatory approval, and board approval"
          },
          {
            "text": "Agree signatures required on each side"
          },
          {
            "text": "Set out completion date precedent on regulatory approval date(s), rather than a pre-agreed specific date"
          },
          {
            "text": "Set out a joint communications plan to clients from both buyer and seller, including timelines for when buyer can engage the clients"
          },
          {
            "text": "Define ownership and licensing of shared Intellectual Property"
          },
          {
            "text": "Detail technology maintenance requirements of the seller, and stipulations on major changes"
          },
          {
            "text": "Ensure that the SPA sets out the required regulatory change of controls approval"
          },
          {
            "text": "Ensure that SPA sets out provisions for employee transfer and consultations"
          },
          {
            "text": "Ensure that the SPA sets out brand transfer, consolidation or retirement stipulations"
          }
        ],
        "conditional": [
          {
            "text": "Detail seller hiring/redundancy stipulations whilst completion is in progress (e.g. maximum salary to be hired, redundancy processes)"
          },
          {
            "text": "Detail FX payment mechanisms, including adjustments for FX risk and longer settlement times"
          },
          {
            "text": "Ensure that the SPA details management retention requirements of the seller"
          },
          {
            "text": "Ensure that the SPA sets out any seller-group services which require TSAs after completion"
          },
          {
            "text": "Access to this early stage of the lifecycle may not always be possible given the broader business context, but it should be requested given its importance to execution"
          }
        ],
        "optional": [
          {
            "text": "Set SPA change control mechanisms"
          },
          {
            "text": "Set up SPA access mechanisms for project team members"
          },
          {
            "text": "Socialise with functional leads ahead of signature"
          }
        ],
        "nuances": [
          {
            "text": "SPA should account for any intellectual property or goodwill transfer"
          },
          {
            "text": "Any joint technology agreements should be attached as addenda"
          },
          {
            "text": "Data migration and client data provisions must be included, as the business will be integrated and migration will need to occur"
          }
        ],
        "artefacts": [
          {
            "text": "DD summary and agreed deal decisions (Absa deal specific)"
          },
          {
            "text": "M&A lessons learnt (Absa transaction specific)"
          }
        ],
        "templates": [
          {
            "text": "NDA template"
          }
        ]
      },
      {
        "id": "mobilisation-planning",
        "index": "03",
        "title": "Mobilisation & Planning",
        "purpose": "Define the key activities which must take place to enable LD1 to take place on the agreed date, and surface dependencies",
        "role": [
          {
            "text": "Inorganic Change team should lead the mobilisation effort across Absa: briefing functional leads / AEs, onboarding teams, executing the NDA process, creating onboarding materials, briefing teams on detailed plan creation, leading joint planning workshops, translating workshop outputs into a programme plan"
          }
        ],
        "timeline": "8- 12 weeks",
        "timelineDrivers": [
          {
            "text": "Deal complexity (complex deals need more workstreams to execute)"
          },
          {
            "text": "Geographical scope (multiple geographies require more coordination)"
          },
          {
            "text": "Existing knowledge (teams familiar with these deals can draft a detailed plan much faster, and understand dependencies)"
          },
          {
            "text": "Available resource (resource constraints mean activities take longer)"
          }
        ],
        "necessary": [
          {
            "text": "Set up mobilisation hierarchy:",
            "subs": [
              "Board appoints executive sponsor for the deal",
              "Executive sponsor appoints Transaction Director",
              "Transaction Director and Executive Sponsor agree Accountable Executives for each function / workstream",
              "AE selection should be informed by their expected responsibilities, detailed in the Hub and Spoke Operating Model",
              "AEs appoint functional workstream leads, who appoint in-country leads",
              "Transaction Director mobilises central Inorganic Change team and in-country coordinators",
              "Buyer and Seller Inorganic Change teams share lists of functional leads to enable joint planning",
              "Joint and individual governance established based on Mobilisation Toolkit"
            ]
          },
          {
            "text": "Define which items across the acquired party will be :",
            "subs": [
              "Unchanged",
              "Integrated into Absa",
              "Transformed",
              "Consolidated",
              "Decommissioned",
              "Operated temporarily under a TSA"
            ]
          },
          {
            "text": "Define key workstreams required based on the deal-archetype and SPA specifics, including rough size of each workstream"
          },
          {
            "text": "Define workstream charters per workstream, setting out objective, purpose, success metrics, key personnel, skills, and ownership"
          },
          {
            "text": "Jointly carry out workstream blueprints across buyer and seller, laying out each business process related to the workstream, which the seller will stop, which the buyer will start, and which will carry on as is"
          },
          {
            "text": "Define key milestones required to enable these process and achieve a seamless cutover at Legal Day 1 (LD1)"
          },
          {
            "text": "Support each workstream to define a detailed, L2 plan below this to enable the meeting of these milestones"
          },
          {
            "text": "Hold joint workshops across buyer and seller to discuss and agree on these milestones"
          },
          {
            "text": "Identify milestones with key dependencies across workstreams, and document these dependencies in detail"
          },
          {
            "text": "Identify the critical path, and dates/factors will have a material impact on completion, and which of these can be controlled (e.g., regulatory approval or bank-wide change freezes cannot be controlled, client onboarding must take place ahead of LD1 but non-BAU processes can speed up timelines, data migration solution build and test is critical to LD1 success, etc)"
          },
          {
            "text": "Translate the milestones into an overarching project plan to be tracked weekly"
          },
          {
            "text": "Agree initial LD1 readiness criteria per workstream (key performance indicators which will enable cutover, e.g., for HR, 100% of consultations complete)"
          },
          {
            "text": "Agree on internal governance cadence which will sync with joint governance laid out in the SPA, including:",
            "subs": [
              "Internal and joint Inorganic Change meetings weekly / bi-weekly to align on priorities and joint risks/issues",
              "Working group / workstream led sessions to discuss key risks, issues, and progress",
              "Internal Steering Committee sessions to escalate Absa-specific risks and issues, and receive guidance on key decisions",
              "Joint Steering Committee sessions to discuss joint risks and issues, and coordinate cross-party solutions"
            ]
          },
          {
            "text": "Translate DD findings and governance structures into onboarding materials which clearly articulate the purpose and objectives of the deal, how execution will run day to day, roles and responsibilities, and escalation pathways"
          },
          {
            "text": "Define Day 1 control and ownership plan"
          },
          {
            "text": "Define plan for executive and board transition, as well as a joint management retention plan"
          },
          {
            "text": "Create a detailed workstream plan for employee and technology transfers"
          }
        ],
        "conditional": [
          {
            "text": "Define target operating model activities to take place ahead of LD1, informed by the level of integration agreed"
          },
          {
            "text": "Define a cultural integration and change management plan to properly integrate new business as required"
          },
          {
            "text": "Define a plan for Absa policy and control adoption"
          },
          {
            "text": "Agree a financial and regulatory consolidation plan"
          },
          {
            "text": "Create a brand transition plan"
          },
          {
            "text": "Submit a version of the programme plan to the regulator alongside the request for approval"
          },
          {
            "text": "Set up TSA exit team and define timeline for complete TSA exit"
          }
        ],
        "optional": [
          {
            "text": "Translate the project plan into project management software (e.g., Jira, MSP)"
          },
          {
            "text": "Link governance into bank-level governance such as Board meetings, StratCos, etc"
          }
        ],
        "nuances": [
          {
            "text": "Planning for this archetype will be the most complex, given that full scale integration must take place across seller and Absa"
          }
        ],
        "artefacts": [
          {
            "text": "TSA agreements (Absa transaction specific)"
          },
          {
            "text": "Regulatory commitments and approval timelines (Absa transaction specific)"
          },
          {
            "text": "Previous transaction playbooks with lessons learned (Absa transaction specific)"
          },
          {
            "text": "Hub & Spoke operating model"
          },
          {
            "text": "Mobilisation toolkit"
          }
        ],
        "templates": [
          {
            "text": "Workstream blueprints"
          },
          {
            "text": "High-level transaction plan template"
          },
          {
            "text": "Detail excel project plan"
          },
          {
            "text": "Governance forums Terms of Reference"
          }
        ]
      },
      {
        "id": "programme-execution",
        "index": "04",
        "title": "Programme Execution",
        "purpose": "Execute on agreed milestones, run governance cadence, and build required technical/data solutions",
        "role": [
          {
            "text": "Inorganic Change Team acts as the central hub in the execution phase, driving workstream level execution, tracking RAID items, defining SteerCo material, and holding those responsible for execution accountable"
          }
        ],
        "timeline": "18 – 24 months",
        "timelineDrivers": [
          {
            "text": "Regulatory change of control approval timelines"
          },
          {
            "text": "Deal scope complexity (if the target has complex products, legal entity structures, technology assets, people transfer, intellectual property transfer, etc. timelines may be extended)"
          },
          {
            "text": "Seller cooperation (early sharing of data, and daily cooperation speeds up timelines)"
          }
        ],
        "necessary": [
          {
            "text": "Conduct programme management activities: run governance processes including workstream sessions, Exec SteerCos, and Joint Buyer/Seller SteerCos; set up and track risks and issues in a central RAID log, and escalate to SteerCo as appropriate"
          },
          {
            "text": "Align risk appetite, policies, controls, and assurance of the acquired firm"
          },
          {
            "text": "Integrate and rationalise product sets aligned to the programme plan"
          },
          {
            "text": "Provide regular updates to the Board and Bank Leadership Forums on progress against plan, key risks and issues, and LD1 viability"
          },
          {
            "text": "Engage the regulator regularly to update progress and assess approval timelines"
          },
          {
            "text": "Conduct contingency and scenario planning for if approvals arrive later than anticipated, and define final possible date for receipt before LD1 must move"
          },
          {
            "text": "Build out detailed client communication plan across buyer and seller, and keep clients updated on the progress of the programme, and when they can expect to be onboarded"
          },
          {
            "text": "Request that the seller shares a data dictionary detailing data structures across source systems"
          },
          {
            "text": "Define success criteria across all workstreams, and continually measure progress against these"
          },
          {
            "text": "Work with the seller to receive regularly updated financials, update the business case, and track that the deal remains aligned to strategic objectives"
          },
          {
            "text": "Define a target operating model for once new employees land – define design principles, key roles and responsibilities, skills assessment, and target state structure"
          },
          {
            "text": "Ensure joint technology specifications with the seller defined (e.g., Joint Application Development (JAD) documentation, API documentation, technical requirements, business requirements)"
          },
          {
            "text": "Agree and execute a joint technology build governance structure to drive joint progress"
          },
          {
            "text": "Ensure transferring employee packages defined and socialised through consultations"
          },
          {
            "text": "Consolidate financial and management reporting"
          },
          {
            "text": "Implement culture and change activity plan"
          },
          {
            "text": "Decommission duplicated systems and processes"
          },
          {
            "text": "Ensure source-to-target mapping across all systems is conducted to enable build of core data migration solution"
          },
          {
            "text": "Drive the build of the data migration solution to Extract, Transform, and Load (ETL) solution across all source systems into target systems"
          },
          {
            "text": "Ensure the data migration solution is tested using dummy data aligned to the data dictionary, or where possible, real client data"
          }
        ],
        "conditional": [
          {
            "text": "Agree with the seller what data can be transferred ahead of LD1, and load it into Absa systems early to avoid cutover complications"
          },
          {
            "text": "Ensure provisions are made for capital, liquidity, treasury, and funding requirements should these be integrated into Absa"
          },
          {
            "text": "If TSAs are in place, monitor service delivery and exit planning"
          },
          {
            "text": "Define a plan to rationalise supplier, premises, and shared services"
          },
          {
            "text": "Manage the brand transition should the brand be transferring into Absa, or branding be wound down"
          }
        ],
        "optional": [
          {
            "text": "Engage friendly clients during the process to assess key value proposition and ensure project execution remains aligned"
          },
          {
            "text": "Conduct change management activities for project execution teams to drive continued buy-in and morale (e.g., team socials, rewards, etc)"
          }
        ],
        "nuances": [
          {
            "text": "Execution focus in an integrated archetype such as this is on data migration, product build, target operating model design, etc. Execution of this deal type can be expected to be the most complex and largest scale across archetypes"
          },
          {
            "text": "Suppliers, services, premises must be rationalised"
          }
        ],
        "artefacts": [
          {
            "text": "Detail project plan built out from mobilisation and planning stage (Absa transaction specific)",
            "subs": [
              "With associated excel programme plan"
            ]
          },
          {
            "text": "Previous project playbooks with lessons learnt (Absa transaction specific)"
          },
          {
            "text": "Hub & Spoke operating model"
          },
          {
            "text": "Mobilisation toolkit"
          }
        ],
        "templates": [
          {
            "text": "Workstream status report template"
          },
          {
            "text": "Joint buyer and seller status report template"
          },
          {
            "text": "Programme RAID log template with added SteerCo escalation if necessary"
          }
        ]
      },
      {
        "id": "business-testing",
        "index": "05",
        "title": "Business Testing",
        "purpose": "Confirm that clients, products, data, technology and processes will operate correctly within Absa and that required controls remain effective",
        "role": [
          {
            "text": "Inorganic Change Team role is to coordinate and govern testing across business and technology teams, not to perform testing itself."
          }
        ],
        "timeline": "3 – 4 months (concurrent with execution, post-build)",
        "timelineDrivers": [
          {
            "text": "Scale of business process change"
          },
          {
            "text": "Level of integration"
          },
          {
            "text": "Testing expertise in-house (testing SMEs within each team means scripts require less review and testing can happen faster)"
          },
          {
            "text": "Capacity within teams to accommodate testing (needs to be balanced with BAU, build, other deal-related work)"
          },
          {
            "text": "Complexity of process change (complex new systems or products require significant testing)"
          },
          {
            "text": "Downstream systems (impact of changes on multiple downstream systems requires more extensive end-to-end testing)"
          }
        ],
        "necessary": [
          {
            "text": "Work with BAU teams and functional / product SMEs to detail every business process impacted by changes the programme has made"
          },
          {
            "text": "Work with technology teams to understand the requirements for testing environments, including end-to-end environments"
          },
          {
            "text": "Testing should focus on:",
            "subs": [
              "Financial consolidation and reporting",
              "Regulatory reporting",
              "Treasury, liquidity and funding flows",
              "New authorities and approval limits",
              "User access and privileged access",
              "Management information feeds",
              "Intra-group transactions",
              "New governance and control processes"
            ]
          },
          {
            "text": "Book these environments well in advance, or flag if suitable environments do not yet exist and must be built"
          },
          {
            "text": "Set up an independent testing team to liaise with business and technology to drive test script creation and sign off"
          },
          {
            "text": "Designate a testing lead within each workstream responsible for coordinating and executing tests assigned to them"
          },
          {
            "text": "Drive execution of test scripts by the business, with oversight from the testing team"
          },
          {
            "text": "Conduct negative testing to ensure controls are functioning as expected"
          },
          {
            "text": "Once individual processes are validated, test every process end-to-end, including the feed into downstream systems like AML, finance, and HR systems"
          },
          {
            "text": "Set up a testing-specific defect log to track issues to closure"
          },
          {
            "text": "Re-test issues post closure end-to-end, to ensure the fix has not created additional issues"
          },
          {
            "text": "Conduct Production Validation Testing to check that new functionality works in production as well as in test environments"
          },
          {
            "text": "Set up testing-specific governance, and feed into programme governance"
          },
          {
            "text": "Secure executive and business sign off on testing closure, with any open items clearly detailed"
          },
          {
            "text": "Test the flow of data into HR systems such as Workday"
          },
          {
            "text": "Conduct testing to ensure decommissioning efforts have been successful"
          }
        ],
        "conditional": [
          {
            "text": "Business process change related to additional products, assets, liabilities, and data being integrated will need to be tested"
          }
        ],
        "optional": [
          {
            "text": "Conduct friendly client testing to ensure that end-to-end flows work in a real world scenario"
          }
        ],
        "nuances": [
          {
            "text": "Full end-to-end migration testing is needed where systems, products or clients move at LD1. Later migrations should have their own testing and rehearsal cycles"
          },
          {
            "text": "Testing is especially critical when full-scale integration is taking place, as in this archetype, as the scale of business process change is likely to be significant"
          }
        ],
        "artefacts": [
          {
            "text": "Previous business testing programmes with lessons learnt, including a scenario-based risk mitigation plan (Absa transaction specific)"
          },
          {
            "text": "Business testing process flows and customer journeys (Absa transaction specific)"
          }
        ],
        "templates": [
          {
            "text": "Detailed business testing plan template"
          }
        ]
      },
      {
        "id": "client-onboarding-ld1-readiness",
        "index": "06",
        "title": "Client Onboarding & LD1 Readiness",
        "purpose": "Onboard and migrate clients to the agreed Absa products, platforms, channels and service model while maintaining continuity",
        "role": [
          {
            "text": "Oversee the standing up of an LD1 Readiness stream, and tracking its progress and risks as part of programme management to assess critical risks to LD1"
          }
        ],
        "timeline": "3 – 4 months (concurrent to execution)",
        "timelineDrivers": [
          {
            "text": "Scale of client transfer (more clients require communication and training)"
          },
          {
            "text": "Complexity of client product mix (complex products and multi-product portfolios increase time to onboard)"
          },
          {
            "text": "Availability of client data (high-quality client contact data removes time spent on remediation)"
          },
          {
            "text": "Client responsiveness (heavily reliant on clients responding to outreach and providing documentation)"
          }
        ],
        "necessary": [
          {
            "text": "Ensure client contact details are shared by seller as early as possible, and track client outreach, and monitor potential client attrition."
          },
          {
            "text": "Conduct risk assessment to understand which clients are high risk, and which some documentation can be obtained post-LD1"
          },
          {
            "text": "Confirm required KYC / AML documentation in place across transferring clients"
          },
          {
            "text": "Define and test the updated service model"
          },
          {
            "text": "Define the Hypercare model for post go-live, including detailed roles and responsibilities"
          },
          {
            "text": "Identify client contracts containing change-of-control provisions, and determine notification and consent requirements"
          },
          {
            "text": "Confirm that accounts, products, mandates and channels continue functioning"
          },
          {
            "text": "Assess whether branding or legal disclosures must change"
          },
          {
            "text": "Confirm continuity of complaints, conduct and servicing arrangements"
          },
          {
            "text": "Prepare future product migration and cross-sell plans"
          },
          {
            "text": "Assess in detail the client onboarding process, understand timelines, and define a 'drop-dead date' for when onboarding must begin"
          },
          {
            "text": "Assess which onboarding processes must be done BAU, and which can be adapted to suit deal context and timelines"
          },
          {
            "text": "Detail all client documentation required to enable onboarding"
          },
          {
            "text": "Perform gap analysis to understand which information can be sourced from the seller, and which clients must provide directly"
          },
          {
            "text": "Conduct employee training as required"
          },
          {
            "text": "Train existing clients on new systems being built as part of the deal"
          },
          {
            "text": "Build training materials, working closely with business SMEs"
          },
          {
            "text": "Build out materials outlining the value proposition of Absa to new clients, including for products which they do not yet have to drive cross-sell opportunities"
          },
          {
            "text": "Set up sessions to train clients on bank systems and channels"
          },
          {
            "text": "Set up client accounts, profiles, products, permissions, and mandates ahead of time to enable Dress Rehearsals and testing"
          },
          {
            "text": "Begin the implementation of the Target Operating Model within Absa"
          }
        ],
        "conditional": [],
        "optional": [
          {
            "text": "Onboard some clients early to conduct friendly-client testing with new to bank clients"
          }
        ],
        "nuances": [
          {
            "text": "The importance of this phase increases in this archetype, as all clients will need to be onboarded onto Absa systems which requires significant operational, organisational, logistical, and technological effort"
          }
        ],
        "artefacts": [
          {
            "text": "Client onboarding playbook (Absa transaction specific)"
          },
          {
            "text": "Client training materials (Absa transaction specific)"
          }
        ],
        "templates": []
      },
      {
        "id": "dress-rehearsals",
        "index": "07",
        "title": "Dress Rehearsals",
        "purpose": "Testing end-to-end approach to cutover in order to raise and resolve any issues which would prevent a successful transfer",
        "role": [
          {
            "text": "Coordinate the logistical preparation of the DRs, support the Data Migration team in defining the runbook, support the execution of the DRs either as logistical support or by acting as Data Migration Coordinators (DMCs)."
          }
        ],
        "timeline": "8 – 12 weeks",
        "timelineDrivers": [
          {
            "text": "Time remaining post build and test (if build and test finishes well ahead of LD1, more DRs can take place)"
          },
          {
            "text": "Number of Dress Rehearsals (DRs) (more DRs require a longer timeframe)"
          },
          {
            "text": "Down-time between DRs (minimum 2 weeks between DRs is recommended)"
          }
        ],
        "necessary": [
          {
            "text": "Work with the Data Migration and Technology teams to define cutover plan which details every activity down to the minute required to wind down the seller and stand up the business within Absa"
          },
          {
            "text": "Hold runbook run-through sessions with all activity owners and back-ups to ensure everyone is clear on expectations"
          },
          {
            "text": "Define success metrics for DRs, with a clear understanding of what is acceptable in the first DR vs the final DR"
          },
          {
            "text": "Agree which data sets will be dummy / anonymised, and which will be real client data"
          },
          {
            "text": "Define roles and responsibilities across DRs and Cutover, including Data Migration Controllers running the runbook"
          },
          {
            "text": "Execute logistical support required to enable 24/7 DRs to take place such as building access, food requirements, accommodation, travel, Wi-Fi, security, facilities, and back-up plans"
          },
          {
            "text": "Define the governance processes to take place during DRs including the command centre, regular executive updates, escalation pathways, war room protocols, issue resolution processes, and continency decision making"
          },
          {
            "text": "Collate a DR playbook summarising success criteria, logistical information, key contacts, governance processes, and timelines"
          },
          {
            "text": "Run a minimum of 4 DRs across weekends, with at least 2 weeks in between each"
          },
          {
            "text": "Each DR should execute the runbook end-to-end, and track issues which arise for remediation"
          },
          {
            "text": "Hold DR retros to note lessons learnt and iterate into subsequent DRs"
          },
          {
            "text": "Track the remediation of issues ahead of subsequent DRs"
          },
          {
            "text": "Ensure DRs test the data migration process end to end, as well as all downstream activities such as reconciliations, operations processes, financial reporting, AML, etc"
          }
        ],
        "conditional": [
          {
            "text": "Ensure DRs test the interactions and flows between multiple acquired products and services"
          }
        ],
        "optional": [
          {
            "text": "Hold a 'Technical DR' before the true DRs take place, to test only the migration solution, and ensure this is not a blocker to future DRs"
          }
        ],
        "nuances": [
          {
            "text": "Full DRs must take place, and should be prioritised due to the scale of data transferring in this archetype"
          },
          {
            "text": "Any migrations planned post-completion should hold separate DRs"
          }
        ],
        "artefacts": [
          {
            "text": "Approved DR strategy: this will cover DR scope, sequencing, success measures and rehearsal cadence (Absa transaction specific)"
          },
          {
            "text": "Previous DR completion records with timestamps, success measure results and lessons learnt (Absa transaction specific)"
          },
          {
            "text": "DR and cutover playbook"
          }
        ],
        "templates": [
          {
            "text": "Runbook template"
          },
          {
            "text": "DR defect template"
          },
          {
            "text": "DR checkpoint template"
          },
          {
            "text": "DR retro template"
          }
        ]
      },
      {
        "id": "go-no-go",
        "index": "08",
        "title": "Go/No-Go",
        "purpose": "Formally discuss and approve/disapprove whether all workstreams and parties are sufficiently ready to proceed with transfer and integration",
        "role": [
          {
            "text": "Drive the collation of evidence across execution, testing, and DRs to present a case for a Go/No-Go decision to the Steering Committee. Liaise with functional leads and AEs to ensure they can clearly state the recommendation of their area."
          }
        ],
        "timeline": "1- 2 weeks",
        "timelineDrivers": [
          {
            "text": "Likelihood for a no-go (no-go decisions require additional justification and discussion)"
          },
          {
            "text": "Existing evidence (if evidence has to be specially sourced and collated, timelines may increase)"
          },
          {
            "text": "SPA stipulations (some SPAs stipulate when Go/No-Go decisions must take place, and how long discussions may last)"
          }
        ],
        "necessary": [
          {
            "text": "Assess the success of DRs, and confirm that all issues from the final DR have been remediated or have clear timelines for remediation"
          },
          {
            "text": "Ensure that at least one successful end to end DR has taken place"
          },
          {
            "text": "Discuss residual risks and mitigation plans across each workstream, with each AE laying out in turn testing results, DR success, and residual risks related to their area"
          },
          {
            "text": "For each residual risk, lay out the potential risk to go-live, likelihood, and mitigation plans"
          },
          {
            "text": "Gather evidence that key conditions have been met such as:",
            "subs": [
              "Client onboarding",
              "Employee readiness",
              "Technology transfer readiness",
              "Account set up",
              "Regulatory approval",
              "Client and contract novations / consents",
              "Data extraction and reconciliation in DRs",
              "Financial settlement success in DRs",
              "Absa and seller obligations as stipulated in the SPA",
              "Client and employee communications"
            ]
          },
          {
            "text": "Gather all AEs / SteerCo members to formally make and document the Go/No-Go decision internally, allowing any reservations to be noted and addressed"
          },
          {
            "text": "Gather buyer and seller AEs to formally make the joint Go/No-Go decision"
          },
          {
            "text": "Formally document go/no position with the Seller and communicate to clients, employees, and regulators"
          }
        ],
        "conditional": [
          {
            "text": "TSA readiness may also be a decision factor should these be in place"
          }
        ],
        "optional": [
          {
            "text": "Announce the decision on the local stock exchange to ensure clients / market is aware (e.g., SENS announcement)"
          },
          {
            "text": "Brief the media on the decision, with a series of prepared remarks"
          }
        ],
        "nuances": [
          {
            "text": "As the business will be integrated, the Go/No-Go decision criteria will be especially numerous and thorough, given the scale of integration taking place"
          }
        ],
        "artefacts": [
          {
            "text": "Go/No-Go criteria (owned by Inorganic Change Team to use throughout this decision making process)"
          },
          {
            "text": "M&A Learning Academy materials on governance and decision rights"
          },
          {
            "text": "DR and cutover playbook"
          }
        ],
        "templates": [
          {
            "text": "Go/No-Go decision scorecard/paper"
          }
        ]
      },
      {
        "id": "cutover",
        "index": "09",
        "title": "Cutover",
        "purpose": "Execute a controlled and approved change of control event and integration of the entire acquired entity into Absa",
        "role": [
          {
            "text": "Coordinate the logistical preparation of the cutover, based upon successful DR. Support the execution of the cutover"
          },
          {
            "text": "Run the central control function, coordinating buyer, seller and overseeing workstream execution, against approved runbook."
          },
          {
            "text": "Coordinate cross-workstream dependencies and stakeholder communications through the cutover timeline."
          }
        ],
        "timeline": "24 to 72 hours",
        "timelineDrivers": [
          {
            "text": "Scale of activity required over cutover"
          },
          {
            "text": "Length of individual activities (some activities may last 24 hours + depending on their nature)"
          },
          {
            "text": "Length of time the bank can shut down without impacting service (some jurisdictions have payments flowing over the weekend, others do not)"
          }
        ],
        "necessary": [
          {
            "text": "Work with Data Migration and Technology to define the final cutover plan, iterated during DRs"
          },
          {
            "text": "Walk through the plan again with teams to confirm understanding, roles, and responsibilities"
          },
          {
            "text": "Sign off final cutover plan with all AEs"
          },
          {
            "text": "Coordinate contingency planning across all workstreams, gathering scenarios and planning for potential issues which may arise over the cutover"
          },
          {
            "text": "Define any additional governance to be in place during cutover vs DRs (e.g., additional executive updates, final decision gates, etc)"
          },
          {
            "text": "Execute on cutover plan, including agreed-upon governance gates"
          },
          {
            "text": "Execute on testing activities planned in the runbook to ensure all systems are working as planned"
          },
          {
            "text": "Hold final checkpoint to assess success of the cutover, and define required mitigation plans for issues"
          },
          {
            "text": "Open the bank after cutover activities completed and monitor core systems"
          },
          {
            "text": "Execute share transfer and financial settlement and transfer legal control"
          },
          {
            "text": "Consolidate the acquired firm into Absa financial reporting"
          },
          {
            "text": "Communicate with clients on the success of the cutover, and remind them of new channels into the buyer"
          },
          {
            "text": "Hold regular check-ins to ensure smooth transition to Hypercare"
          },
          {
            "text": "Execute on the employee onboarding cutover plan, ensuring new employees have necessary system and building access on LD1"
          },
          {
            "text": "Ensure data reconciles once loaded onto Absa systems, and flag any mismatches with the seller immediately"
          }
        ],
        "conditional": [
          {
            "text": "Communicate any residual issues to clients which remain post-cutover, and detail timelines for remediation"
          },
          {
            "text": "Activate TSAs where necessary"
          }
        ],
        "optional": [
          {
            "text": "Brief the media on a successful cutover, with pre-prepared executive remarks"
          },
          {
            "text": "Issue an announcement on the stock exchange regarding the successful cutover"
          }
        ],
        "nuances": [
          {
            "text": "As this archetype involves integration of the full business, cutover will be the most complex and highest risk, and should therefore have the most comprehensive runbook, governance, and contingency plans in place"
          }
        ],
        "artefacts": [
          {
            "text": "Approved cutover runbook, including a time-sequenced plan: activities, owners, dependencies, control gates, and completion criteria (Absa transaction specific)"
          },
          {
            "text": "Hub & Spoke Operating Model"
          },
          {
            "text": "DR and cutover playbook"
          }
        ],
        "templates": [
          {
            "text": "Cutover checkpoint template"
          }
        ]
      },
      {
        "id": "hypercare",
        "index": "10",
        "title": "Hypercare",
        "purpose": "Stabilise the migrated business, resolve integration issues and transition ongoing integration and synergy delivery into BAU ownership.",
        "role": [
          {
            "text": "Monitor a consolidated view of incidents post cutover, and monitor the Hypercare team's triage and remediation efforts"
          },
          {
            "text": "Support the Hypercare team in escalating issues through agreed governance in order to prevent any financial, regulatory or client harm"
          },
          {
            "text": "Assess readiness to exit Hypercare using an agreed checklist and criteria, coordinating a formal handover to BAU"
          },
          {
            "text": "Lead regular updates to executives on tracking of strategic and financial outcomes"
          }
        ],
        "timeline": "2 – 3 months",
        "timelineDrivers": [
          {
            "text": "Number of clients transferring (additional clients means Additional time required to triage and resolve issues)"
          },
          {
            "text": "Capacity within Hypercare team (smaller team takes longer to resolve issues)"
          },
          {
            "text": "Complexity of transfer (a transfer of complex clients with complex products likely requires more dedicated service time)"
          },
          {
            "text": "Success of cutover (issues on cutover mean an extended Hypercare period will likely be needed to stabilise clients and resolve issues)"
          }
        ],
        "necessary": [
          {
            "text": "Set up a dedicated team to monitor client queries, feedback, and complaints from only the transferred population"
          },
          {
            "text": "Triage issues for remediation, add them to a backlog, and flag with technology / BAU teams as required"
          },
          {
            "text": "Monitor migration issues, product and platform stability, and onboarding issues"
          },
          {
            "text": "Drive target operating model adoption amongst servicing teams in the first instance, and embed new employees into front-line teams"
          },
          {
            "text": "Escalate persistent or P1 issues immediately, through a dedicated escalation pathway"
          },
          {
            "text": "Stand up and coordinate war-rooms as necessary to remediate P1 issues quickly and avoid disruption"
          },
          {
            "text": "Set up dedicated client communications teams to ensure clients remain in the loop post LD1"
          },
          {
            "text": "Set up dedicated documentation remediation teams to quickly source outstanding documentation which could not be received pre-LD1"
          },
          {
            "text": "Gradually hand off servicing to BAU teams by transitioning issue resolution and triage into the BAU process, prioritising only the most serious issues for Hypercare as time passes"
          },
          {
            "text": "Track deal objectives such as revenue, asset/liability transfer, volumes, etc. as soon as LD1, and provide updates to executives on progress against objectives"
          },
          {
            "text": "Hold daily touchpoints with AEs to flag the most important issues and discuss remediation plans"
          },
          {
            "text": "Hold regular touchpoints with client-facing teams to discuss client sentiment and assess action plans"
          }
        ],
        "conditional": [
          {
            "text": "Monitor cultural issues of transferred employees and change adoption plan progress"
          }
        ],
        "optional": [
          {
            "text": "Reach out to clients directly to assess sentiment"
          }
        ],
        "nuances": [
          {
            "text": "As the acquired business will be integrated, Hypercare for this archetype is the most critical across archetypes, as a significant level of change across a large number of clients is likely to have occurred, and dedicated servicing capabilities will be required to maintain stability and client experience"
          }
        ],
        "artefacts": [
          {
            "text": "Transferred portfolio of clients (Absa transaction specific)"
          },
          {
            "text": "Hub & Spoke operating model"
          },
          {
            "text": "M&A Learning Pathways"
          }
        ],
        "templates": [
          {
            "text": "Hypercare RAID Log"
          },
          {
            "text": "Daily Hypercare status report template"
          }
        ]
      }
    ]
  },
  {
    "archetypeId": "full-business-acquisition",
    "archetypeName": "Full-business acquisition",
    "variantLabel": "Variant B · Buyer runs the business standalone",
    "sourceTitle": "Full Business Acquisition B (Buyer runs the business standalone)",
    "stages": [
      {
        "id": "due-diligence",
        "index": "01",
        "title": "Due Diligence",
        "purpose": "Determine whether the acquisition creates value, what you are actually buying, and what needs to be protected contractually. Legal & CorpDev lead; other areas input where required. Activities below relate to key items for the integration team to consider during this process, they do not override current DD processes",
        "role": [
          {
            "text": "Extract information from the DD process necessary to properly plan and run the implementation"
          },
          {
            "text": "Act as M&A SMEs to provide oversight, bringing a practical, Absa oriented lens which goes beyond financials and ensures nuances are identified and caught based on previous experience"
          }
        ],
        "timeline": "2 – 3 months",
        "timelineDrivers": [
          {
            "text": "Product complexity (more complex products are harder to model and project)"
          },
          {
            "text": "Maturity of DD teams (experienced teams can work through a DD checklist in a very short period)"
          },
          {
            "text": "Seller availability (heavily reliant on seller supporting in providing materials)"
          }
        ],
        "necessary": [
          {
            "text": "Ensure virtual data room set up to access confidential documentation and ensure it persists after deal signature"
          },
          {
            "text": "Ensure an NDA process to wall-cross those who need access to confidential information is set up"
          },
          {
            "text": "Understanding what the hurdle rates are: what EBITDA, NII, NIM, revenue, operating leverage, ROC, ROE, MOIC, will create a go-decision for deal signing?"
          },
          {
            "text": "Understanding the factors which influenced these hurdle rates, as well as what other non-financial factors may influence decision making (new capabilities, strong brand loyalty, etc)"
          },
          {
            "text": "Build an initial view of project implementation costs, leveraging comparable deals. All assumptions in planning costs must be defensible and informed by functional experts"
          },
          {
            "text": "Build or oversee build of a detailed business case comparing forecasted benefits to project costs and continued running costs"
          },
          {
            "text": "Ensure DD has accounted for and documented all legal entities, subsidiaries, branches, and ownership structures to inform execution operating model"
          },
          {
            "text": "Ensure DD has documented the effectiveness of governance, risk management, and internal controls"
          },
          {
            "text": "Ensure DD includes assessment of management capability, organisational health and cultural compatibility to inform change management activities required"
          },
          {
            "text": "Ensure subject matter experts are engaged to conduct cyber, technology, security, compliance DD to ensure that a deep understanding of these elements is gained during DD, to inform accurate planning"
          },
          {
            "text": "Ensure subject matter experts are engaged to conduct DD on the overall operational health of the business in areas such as brand value, intellectual property value, goodwill, client sentiment, etc."
          },
          {
            "text": "Ensure tax implications have been assessed and remediation planned"
          },
          {
            "text": "Ensure existing obligations of the selling legal entity are assessed, to inform execution"
          },
          {
            "text": "Confirm that the target can operate independently under Absa ownership"
          },
          {
            "text": "Ensure that the strength and completeness of the existing management team is assessed"
          },
          {
            "text": "Ensure capital, liquidity, treasury and funding arrangements are assessed"
          },
          {
            "text": "Assess whether the target's existing systems and processes can remain compliant under Absa ownership"
          }
        ],
        "conditional": [
          {
            "text": "Identify seller-group dependencies and required TSAs"
          }
        ],
        "optional": [
          {
            "text": "Benchmark estimated performance against previous deals"
          },
          {
            "text": "Review lessons learnt from previous deals"
          },
          {
            "text": "Engage a subset of seller clients to assess current pain points and identify any potential deal red flags (e.g. compliance issues, pricing mismatches, in-scope technology issues)"
          }
        ],
        "nuances": [
          {
            "text": "DD must account for shift of new business into Absa cost environment, including accounting for different fixed cost base, funding rates, etc"
          },
          {
            "text": "DD must account for the acquisition of a full legal entity and its subsidiaries, assessing any outstanding obligations the entity has"
          }
        ],
        "artefacts": [
          {
            "text": "Previous transaction materials and lessons learnt (Absa transaction specific)"
          },
          {
            "text": "Business case (Absa transaction specific)"
          }
        ],
        "templates": []
      },
      {
        "id": "legal-drafting-signature",
        "index": "02",
        "title": "Legal Drafting & Signature",
        "purpose": "Ensure the Sale and Purchase Agreement (SPA) reflects reality of programme delivery, and enables execution. Legal & CorpDev lead, other areas input where required. Activities below relate to key integration considerations, they do not overwrite the current processes.",
        "role": [
          {
            "text": "Ensure legals reflect execution reality, and timelines are realistic"
          },
          {
            "text": "Ensure legals include provisions which will support execution, such as data sharing"
          },
          {
            "text": "Ensure any go-live dates are based on realistic assumptions around regulatory approval and client onboarding timelines"
          },
          {
            "text": "Leverage lessons learned from previous deals to ensure legals address any historic pain points"
          }
        ],
        "timeline": "1 – 2 months",
        "timelineDrivers": [
          {
            "text": "Deal complexity (complex deals require additional protections and conditions)"
          },
          {
            "text": "Pre-signing alignment (pre-agree valuations and completion mechanisms will speed up drafting)"
          },
          {
            "text": "DD quality (high quality DD will allow defensible assumptions to be made in the legals, otherwise these will have to be assessed during this phase)"
          },
          {
            "text": "Regulatory complexity (multiple regulators across multiple jurisdictions increases complexity in drafting legals)"
          },
          {
            "text": "Branding and intangibles (transfer of ownership of branding and intangible assets requires addenda to be negotiated)"
          }
        ],
        "necessary": [
          {
            "text": "Engage external lawyers to lead SPA drafting and negotiation, informed by internal legal opinion"
          },
          {
            "text": "Convert DD findings into agreed transaction terms including valuation, adjustment principles, completion mechanisms, and payment terms"
          },
          {
            "text": "Ensure price, adjustments and effective transfer date are agreed"
          },
          {
            "text": "Coordinate and confirm the signing sequence between Absa, the seller and other parties"
          },
          {
            "text": "Document conditions on continuation of employment"
          },
          {
            "text": "Set out the joint governance mechanisms across buyer and seller at a high level (e.g., the scheduling of joint Steering Committees, appointment of Transaction Directors from each party)"
          },
          {
            "text": "Set out joint escalation mechanisms for programme-level issues, as well as dispute resolution mechanisms"
          },
          {
            "text": "Set out conditions precedent for completion, including funds transfer, assets/liabilities transfer, regulatory approval, and board approval"
          },
          {
            "text": "Agree signatures required on each side"
          },
          {
            "text": "Set out completion date precedent on regulatory approval date(s), rather than a pre-agreed specific date"
          },
          {
            "text": "Set out a joint communications plan to clients from both buyer and seller, including timelines for when buyer can engage the clients"
          },
          {
            "text": "Define ownership and licensing of shared Intellectual Property"
          },
          {
            "text": "Detail technology maintenance requirements of the seller, and stipulations on major changes"
          },
          {
            "text": "Ensure that the SPA sets out the required regulatory change of controls approval"
          },
          {
            "text": "Set out level of operational independence during the pre-completion period"
          }
        ],
        "conditional": [
          {
            "text": "Set out which items will transfer from seller to Absa automatically under agreed regulatory processes (e.g., Section 54), and which will have to be manually transferred"
          },
          {
            "text": "Detail novation processes for items not automatically transferring, whether independent legal opinions on contracts are required, and where liability sits during transfer"
          },
          {
            "text": "Detail FX payment mechanisms, including adjustments for FX risk and longer settlement times"
          },
          {
            "text": "Ensure that the SPA details management retention requirements of the seller"
          },
          {
            "text": "Ensure that the SPA sets out any seller-group services which require TSAs after completion"
          },
          {
            "text": "Access to this early stage of the lifecycle may not always be possible given the broader business context, but it should be requested given its importance to execution"
          }
        ],
        "optional": [
          {
            "text": "Set SPA change control mechanisms"
          },
          {
            "text": "Set up SPA access mechanisms for project team members"
          },
          {
            "text": "Socialise with functional leads ahead of signature"
          }
        ],
        "nuances": [
          {
            "text": "SPA will be more focused on transfer of ownership and legal control, rather than migration and data, given that the business will be run standalone"
          }
        ],
        "artefacts": [
          {
            "text": "DD summary and agreed deal decisions (Absa deal specific)"
          },
          {
            "text": "M&A lessons learnt (Absa transaction specific)"
          }
        ],
        "templates": [
          {
            "text": "NDA template"
          }
        ]
      },
      {
        "id": "mobilisation-planning",
        "index": "03",
        "title": "Mobilisation & Planning",
        "purpose": "Mobilise the governance, control, reporting and seller-dependency activities required for the business to operate independently under Absa ownership",
        "role": [
          {
            "text": "Inorganic Change team should lead the mobilisation effort across Absa: briefing functional leads / AEs, executing the NDA process, creating onboarding materials, briefing teams on detailed plan creation, leading joint planning workshops, translating workshop outputs into a programme plan"
          }
        ],
        "timeline": "2- 4 weeks",
        "timelineDrivers": [
          {
            "text": "Deal complexity (complex deals need more workstreams to execute)"
          },
          {
            "text": "Geographical scope (multiple geographies require more coordination)"
          },
          {
            "text": "Existing knowledge (teams familiar with these deals can draft a detailed plan much faster, and understand dependencies)"
          },
          {
            "text": "Available resource (resource constraints mean activities take longer)"
          }
        ],
        "necessary": [
          {
            "text": "Set up mobilisation hierarchy:",
            "subs": [
              "Board appoints executive sponsor for the deal",
              "Executive sponsor appoints Transaction Director",
              "Transaction Director and Executive Sponsor agree Accountable Executives for each function / workstream",
              "AE selection should be informed by their expected responsibilities, detailed in the Hub and Spoke Operating Model",
              "AEs appoint functional workstream leads, who appoint in-country leads",
              "Transaction Director mobilises central Inorganic Change team and in-country coordinators",
              "Buyer and Seller Inorganic Change teams share lists of functional leads to enable joint planning",
              "Joint and individual governance established based on Mobilisation Toolkit"
            ]
          },
          {
            "text": "Define which items across the acquired party will be:",
            "subs": [
              "Retained unchanged",
              "Integrated into Absa",
              "Transformed",
              "Consolidated",
              "Decommissioned",
              "Operated temporarily under a TSA"
            ]
          },
          {
            "text": "Define minimum required workstreams to properly assess the acquired business, document and execute Absa changes required, and integrate the necessary elements such as reporting and liquidity management"
          },
          {
            "text": "Define key milestones required to enable these process and achieve a seamless transfer of ownership at Legal Day 1 (LD1)"
          },
          {
            "text": "Support each workstream to define a detailed, L2 plan below this to enable the meeting of these milestones"
          },
          {
            "text": "Hold joint workshops across buyer and seller to discuss and agree on these milestones"
          },
          {
            "text": "Identify milestones with key dependencies across workstreams, and document these dependencies in detail"
          },
          {
            "text": "Identify the critical path, and dates/factors will have a material impact on completion, and which of these can be controlled (e.g., regulatory approval or bank-wide change freezes cannot be controlled, etc)"
          },
          {
            "text": "Translate the milestones into an overarching project plan to be tracked weekly"
          },
          {
            "text": "Agree on internal governance cadence which will sync with joint governance laid out in the SPA, including:",
            "subs": [
              "Internal and joint Inorganic Change meetings weekly / bi-weekly to align on priorities and joint risks/issues",
              "Working group / workstream led sessions to discuss key risks, issues, and progress",
              "Internal Steering Committee sessions to escalate Absa-specific risks and issues, and receive guidance on key decisions",
              "Joint Steering Committee sessions to discuss joint risks and issues, and coordinate cross-party solutions"
            ]
          },
          {
            "text": "Translate DD findings and governance structures into onboarding materials which clearly articulate the purpose and objectives of the deal, how execution will run day to day, roles and responsibilities, and escalation pathways"
          },
          {
            "text": "Define Day 1 control and ownership plan"
          },
          {
            "text": "Define plan for executive and board transition, as well as a joint management retention plan"
          }
        ],
        "conditional": [
          {
            "text": "Define a plan for Absa policy and control adoption"
          },
          {
            "text": "Agree a financial and regulatory consolidation plan"
          },
          {
            "text": "Submit a version of the programme plan to the regulator alongside the request for approval"
          },
          {
            "text": "Set up TSA exit team and define timeline for complete TSA exit"
          }
        ],
        "optional": [
          {
            "text": "Translate the project plan into project management software (e.g., Jira, MSP)"
          },
          {
            "text": "Link governance into bank-level governance such as Board meetings, StratCos, etc"
          }
        ],
        "nuances": [
          {
            "text": "Planning for this archetype is likely to be the most minimal, given that the acquired legal entity is expected to remain operationally viable, although dependencies on the seller and new Absa oversight requirements must be addressed"
          }
        ],
        "artefacts": [
          {
            "text": "TSA agreements (Absa transaction specific)"
          },
          {
            "text": "Regulatory commitments and approval timelines (Absa transaction specific)"
          },
          {
            "text": "Previous transaction playbooks with lessons learned (Absa transaction specific)"
          },
          {
            "text": "Hub & Spoke operating model"
          },
          {
            "text": "Mobilisation toolkit"
          }
        ],
        "templates": [
          {
            "text": "High-level transaction plan template"
          },
          {
            "text": "Detail excel project plan"
          },
          {
            "text": "Governance forums Terms of Reference"
          }
        ]
      },
      {
        "id": "programme-execution",
        "index": "04",
        "title": "Programme Execution",
        "purpose": "Establish effective Absa ownership, governance and oversight while maintaining the acquired business's operational independence and continuity",
        "role": [
          {
            "text": "Inorganic Change Team acts as the central hub in the execution phase, driving workstream level execution, tracking RAID items, defining SteerCo material, and holding those responsible for execution accountable"
          }
        ],
        "timeline": "6 – 12 months",
        "timelineDrivers": [
          {
            "text": "Regulatory change of control approval timelines"
          },
          {
            "text": "Required minimum change (scale of change required to integrate required items such as regulatory and financial reporting)"
          },
          {
            "text": "Seller cooperation (early sharing of data, and daily cooperation speeds up timelines)"
          }
        ],
        "necessary": [
          {
            "text": "Conduct programme management activities: run governance processes including workstream sessions, Exec SteerCos, and Joint Buyer/Seller SteerCos; set up and track risks and issues in a central RAID log, and escalate to SteerCo as appropriate"
          },
          {
            "text": "Provide regular updates to the Board and Bank Leadership Forums on progress against plan, key risks and issues, and LD1 viability"
          },
          {
            "text": "Engage the regulator regularly to update progress and assess approval timelines"
          },
          {
            "text": "Conduct contingency and scenario planning for if approvals arrive later than anticipated, and define final possible date for receipt before LD1 must move"
          },
          {
            "text": "Build out detailed client communication plan across buyer and seller, and keep clients updated on the progress of the programme"
          },
          {
            "text": "Define success criteria across all workstreams, and continually measure progress against these"
          },
          {
            "text": "Work with the seller to receive regularly updated financials, update the business case, and track that the deal remains aligned to strategic objectives"
          },
          {
            "text": "Consolidate financial and management reporting"
          },
          {
            "text": "Connect risk, compliance and incident escalation"
          },
          {
            "text": "Confirm target capital, liquidity and funding arrangements"
          },
          {
            "text": "Implement minimum mandatory Absa controls"
          }
        ],
        "conditional": [
          {
            "text": "If TSAs are in place, monitor service delivery and exit planning"
          },
          {
            "text": "Manage the brand transition should the brand be transferring into Absa, or branding be wound down"
          }
        ],
        "optional": [
          {
            "text": "Conduct change management activities for project execution teams to drive continued buy-in and morale (e.g., team socials, rewards, etc)"
          }
        ],
        "nuances": [
          {
            "text": "Execution focus for this archetype is much narrow given the lack of integration, focusing on reporting, governance, and controls alignment"
          }
        ],
        "artefacts": [
          {
            "text": "Detail project plan built out from mobilisation and planning stage (Absa transaction specific)",
            "subs": [
              "With associated excel programme plan"
            ]
          },
          {
            "text": "Previous project playbooks with lessons learnt (Absa transaction specific)"
          },
          {
            "text": "Hub & Spoke operating model"
          },
          {
            "text": "Mobilisation toolkit"
          }
        ],
        "templates": [
          {
            "text": "Workstream status report template"
          },
          {
            "text": "Joint buyer and seller status report template"
          },
          {
            "text": "Programme RAID log template with added SteerCo escalation if necessary"
          }
        ]
      },
      {
        "id": "business-testing",
        "index": "05",
        "title": "Business Testing",
        "purpose": "Standalone testing is narrower in operational scope but must provide sufficient assurance over governance, reporting, funding, access, controls and service continuity",
        "role": [
          {
            "text": "Inorganic Change Team role is to coordinate and govern testing across business and technology teams, not to perform testing itself."
          }
        ],
        "timeline": "1 – 2 months (concurrent with execution, post-build)",
        "timelineDrivers": [
          {
            "text": "Testing expertise in-house (testing SMEs within each team means scripts require less review and testing can happen faster)"
          },
          {
            "text": "Capacity within teams to accommodate testing (needs to be balanced with BAU, build, other deal-related work)"
          },
          {
            "text": "Scale of change (scale of change is likely to be low when in this archetype, but some change may occur when updating reporting, liquidity, or governance)"
          },
          {
            "text": "Downstream systems (impact of changes on multiple downstream systems requires more extensive end-to-end testing)"
          }
        ],
        "necessary": [
          {
            "text": "Work with BAU teams and functional / product SMEs to detail every business process impacted by changes the programme has made"
          },
          {
            "text": "Work with technology teams to understand the requirements for testing environments, including end-to-end environments"
          },
          {
            "text": "Testing should focus on:",
            "subs": [
              "Financial consolidation and reporting",
              "Regulatory reporting",
              "Treasury, liquidity and funding flows",
              "New authorities and approval limits",
              "New governance and control processes",
              "Interfaces established between Absa and the target"
            ]
          },
          {
            "text": "Book these environments well in advance, or flag if suitable environments do not yet exist and must be built"
          },
          {
            "text": "Set up a testing-specific defect log to track issues to closure"
          },
          {
            "text": "Re-test issues post closure end-to-end, to ensure the fix has not created additional issues"
          },
          {
            "text": "Secure executive and business sign off on testing closure, with any open items clearly detailed"
          }
        ],
        "conditional": [
          {
            "text": "Testing should confirm that no extraneous Absa data is entering the acquired firm's workspace"
          }
        ],
        "optional": [
          {
            "text": "Conduct friendly client testing to ensure that end-to-end flows work in a real world scenario"
          },
          {
            "text": "Set up an independent testing team to liaise with business and technology to drive test script creation and sign off"
          },
          {
            "text": "Designate a testing lead within each workstream responsible for coordinating and executing tests assigned to them"
          },
          {
            "text": "Drive execution of test scripts by the business, with oversight from the testing team"
          },
          {
            "text": "Conduct negative testing to ensure controls are functioning as expected"
          },
          {
            "text": "Once individual processes are validated, test every process end-to-end, including the feed into downstream systems like AML, finance, and HR systems"
          },
          {
            "text": "Conduct Production Validation Testing to check that new functionality works in production as well as in test environments"
          },
          {
            "text": "Set up testing-specific governance, and feed into programme governance"
          }
        ],
        "nuances": [
          {
            "text": "Less testing will be required as there will be minimal integrations with existing systems which require testing. Dedicated testing teams and governance is therefore optional here"
          }
        ],
        "artefacts": [
          {
            "text": "Previous business testing programmes with lessons learnt, including a scenario-based risk mitigation plan (Absa transaction specific)"
          },
          {
            "text": "Business testing process flows and customer journeys (Absa transaction specific)"
          }
        ],
        "templates": [
          {
            "text": "Detailed business testing plan template"
          }
        ]
      },
      {
        "id": "client-continuity-ld1-readiness",
        "index": "06",
        "title": "Client Continuity & LD1 Readiness",
        "purpose": "Prioritise client continuity post legal entity transfer, communicate requirements and functionality with clients",
        "role": [
          {
            "text": "Oversee the standing up of an LD1 Readiness stream, and tracking its progress and risks as part of programme management to assess critical risks to LD1"
          }
        ],
        "timeline": "4 – 6 weeks (concurrent to execution)",
        "timelineDrivers": [
          {
            "text": "Number of clients (despite no onboarding occurring, client communications and contract assessments are still required, with timings impacted by scale )"
          },
          {
            "text": "Client responsiveness (heavily reliant on clients responding to outreach)"
          }
        ],
        "necessary": [
          {
            "text": "Identify client contracts containing change-of-control provisions, and determine notification and consent requirements"
          },
          {
            "text": "Confirm that accounts, products, mandates and channels continue functioning"
          },
          {
            "text": "Assess whether branding or legal disclosures must change"
          },
          {
            "text": "Confirm continuity of complaints, conduct and servicing arrangements"
          },
          {
            "text": "Ensure the seller is monitoring client attrition and flagging issues early"
          }
        ],
        "conditional": [
          {
            "text": "Define the Hypercare model for post go-live, including detailed roles and responsibilities"
          }
        ],
        "optional": [
          {
            "text": "Ensure client-facing employees are briefed on the transfer and its operational impact, however minimal"
          }
        ],
        "nuances": [
          {
            "text": "Most customers remain clients of the same legal entity, so the focus should move from onboarding to continuity, and minimal readiness activities will be required, as no onboarding will take place"
          }
        ],
        "artefacts": [
          {
            "text": "Complaints servicing model (Absa specific)"
          }
        ],
        "templates": []
      },
      {
        "id": "dress-rehearsals",
        "index": "07",
        "title": "Dress Rehearsals",
        "purpose": "Rehearse legal completion, control handover and the minimum operational changes required for continuity under Absa ownership",
        "role": [
          {
            "text": "Coordinate the logistical preparation of the DRs, support the operations and legal teams in defining the runbook, support the execution of the DRs either as logistical support or by acting as Migration Coordinators (MCs)."
          }
        ],
        "timeline": "2 – 4 weeks",
        "timelineDrivers": [
          {
            "text": "Number of Dress Rehearsals (DRs) (more DRs require a longer timeframe)"
          },
          {
            "text": "Down-time between DRs (minimum 2 weeks between DRs is recommended)"
          },
          {
            "text": "Scale of change happening over cutover (minimal change may happen over the cutover weekend when the business will be operated standalone)"
          }
        ],
        "necessary": [
          {
            "text": "Work with the legal and operations teams to define cutover plan which details every activity down to the minute required to transfer ownership and reporting of the acquired bank to Absa"
          },
          {
            "text": "Hold runbook run-through sessions with all activity owners and back-ups to ensure everyone is clear on expectations"
          },
          {
            "text": "Define success metrics for DRs, with a clear understanding of what is acceptable in the first DR vs the final DR"
          },
          {
            "text": "Define roles and responsibilities across DRs and Cutover, including Controllers running the runbook"
          },
          {
            "text": "Execute logistical support required to enable 24/7 DRs to take place such as building access, food requirements, accommodation, travel, Wi-Fi, security, facilities, and back-up plans"
          },
          {
            "text": "Define the governance processes to take place during DRs including the command centre, regular executive updates, escalation pathways, war room protocols, issue resolution processes, and continency decision making"
          },
          {
            "text": "Collate a DR playbook summarising success criteria, logistical information, key contacts, governance processes, and timelines"
          },
          {
            "text": "Run a minimum of 2 DRs across weekends, with at least 2 weeks in between each"
          },
          {
            "text": "Each DR should execute the runbook end-to-end, and track issues which arise for remediation"
          },
          {
            "text": "Hold DR retros to note lessons learnt and iterate into subsequent DRs"
          },
          {
            "text": "Track the remediation of issues ahead of subsequent DRs"
          },
          {
            "text": "DRs for this archetype can be narrower in focus, prioritising:",
            "subs": [
              "Transfer of ownership and control",
              "Board and governance changes",
              "Delegated authorities and signatories",
              "Financial consolidation",
              "Treasury and funding arrangements",
              "Regulatory reporting",
              "Access and security changes",
              "Opening balance sheet and accounting treatment"
            ]
          }
        ],
        "conditional": [
          {
            "text": "TSA activation may also be tested during DRs if applicable"
          }
        ],
        "optional": [
          {
            "text": "Hold a 'Table-top DR' before the true DRs take place, to run through the runbook without having to set up full DR environments and logistics"
          }
        ],
        "nuances": [
          {
            "text": "DRs can be narrower in focus for this archetype and fewer in number, with 2 DRs including one table-top DR often sufficient due to the lack of change"
          }
        ],
        "artefacts": [
          {
            "text": "Approved DR strategy: this will cover DR scope, sequencing, success measures and rehearsal cadence (Absa transaction specific)"
          },
          {
            "text": "Previous DR completion records with timestamps, success measure results and lessons learnt (Absa transaction specific)"
          },
          {
            "text": "DR and cutover playbook"
          }
        ],
        "templates": [
          {
            "text": "Runbook template"
          },
          {
            "text": "DR defect template"
          },
          {
            "text": "DR checkpoint template"
          },
          {
            "text": "DR retro template"
          }
        ]
      },
      {
        "id": "go-no-go",
        "index": "08",
        "title": "Go/No-Go",
        "purpose": "Formally discuss and approve/disapprove whether all workstreams and parties are sufficiently ready to transfer ownership and establish effective control while maintaining operational continuity",
        "role": [
          {
            "text": "Drive the collation of evidence across execution, testing, and DRs to present a case for a Go/No-Go decision to the Steering Committee. Liaise with functional leads and AEs to ensure they can clearly state the recommendation of their area."
          }
        ],
        "timeline": "1- 2 weeks",
        "timelineDrivers": [
          {
            "text": "Likelihood for a no-go (no-go decisions require additional justification and discussion)"
          },
          {
            "text": "Existing evidence (if evidence has to be specially sourced and collated, timelines may increase)"
          },
          {
            "text": "SPA stipulations (some SPAs stipulate when Go/No-Go decisions must take place, and how long discussions may last)"
          }
        ],
        "necessary": [
          {
            "text": "Assess the success of DRs, and confirm that all issues from the final DR have been remediated or have clear timelines for remediation"
          },
          {
            "text": "Ensure that at least one successful end to end DR has taken place"
          },
          {
            "text": "Discuss residual risks and mitigation plans across each workstream, with each AE laying out in turn testing results, DR success, and residual risks related to their area"
          },
          {
            "text": "For each residual risk, lay out the potential risk to go-live, likelihood, and mitigation plans"
          },
          {
            "text": "Gather evidence that key conditions have been met such as:",
            "subs": [
              "Regulatory approval",
              "Financial settlement success in DRs",
              "Absa and seller obligations as stipulated in the SPA",
              "Financial and regulatory reporting readiness",
              "Liquidity and capital management factors",
              "Regulatory and competition approvals",
              "Operational continuity",
              "Board and governance appointments"
            ]
          },
          {
            "text": "Gather all AEs / SteerCo members to formally make and document the Go/No-Go decision internally, allowing any reservations to be noted and addressed"
          },
          {
            "text": "Gather buyer and seller AEs to formally make the joint Go/No-Go decision"
          },
          {
            "text": "Formally document go/no position with the buyer and communicate to clients, employees, and regulators"
          }
        ],
        "conditional": [
          {
            "text": "TSA readiness may also be included in decision making should these be required"
          }
        ],
        "optional": [
          {
            "text": "Announce the decision on the local stock exchange to ensure clients / market is aware (e.g., SENS announcement)"
          },
          {
            "text": "Brief the media on the decision, with a series of prepared remarks"
          }
        ],
        "nuances": [
          {
            "text": "As the business will be operated as standalone, Go/No-Go decisions should focus more on regulatory, reporting, financial, and governance conditions, rather than data migration and client readiness"
          }
        ],
        "artefacts": [
          {
            "text": "Go/No-Go criteria (owned by Inorganic Change Team to use throughout this decision making process)"
          },
          {
            "text": "M&A Learning Academy materials on governance and decision rights"
          },
          {
            "text": "DR and cutover playbook"
          }
        ],
        "templates": [
          {
            "text": "Go/No-Go decision scorecard/paper"
          }
        ]
      },
      {
        "id": "cutover",
        "index": "09",
        "title": "Cutover",
        "purpose": "Execute the controlled transfer of legal ownership, governance and oversight while maintaining the acquired business's existing operations",
        "role": [
          {
            "text": "Coordinate the logistical preparation of the cutover, based upon successful DR. Support the execution of the cutover"
          },
          {
            "text": "Run the central control function, coordinating buyer, seller and overseeing workstream execution, against approved runbook."
          },
          {
            "text": "Coordinate cross-workstream dependencies and stakeholder communications through the cutover timeline."
          }
        ],
        "timeline": "24 to 72 hours",
        "timelineDrivers": [
          {
            "text": "Scale of activity required over cutover (how much true change is required for the bank to continue running as standalone)"
          },
          {
            "text": "Length of individual activities (some activities may last 24 hours + depending on their nature)"
          },
          {
            "text": "Length of time the bank can shut down without impacting service (some jurisdictions have payments flowing over the weekend, others do not)"
          }
        ],
        "necessary": [
          {
            "text": "As the business will be operated as standalone, cutover should focus on:",
            "subs": [
              "Transfer of legal control",
              "Continuity of services of the acquired business",
              "Integration of reporting",
              "Implementation of access and security changes"
            ]
          },
          {
            "text": "Walk through the plan again with teams to confirm understanding, roles, and responsibilities"
          },
          {
            "text": "Sign off final cutover plan with all AEs"
          },
          {
            "text": "Coordinate contingency planning across all workstreams, gathering scenarios and planning for potential issues which may arise over the cutover"
          },
          {
            "text": "Define any additional governance to be in place during cutover vs DRs (e.g., additional executive updates, final decision gates, etc)"
          },
          {
            "text": "Execute on cutover plan, including agreed-upon governance gates"
          },
          {
            "text": "Execute on testing activities planned in the runbook to ensure all systems are working as planned"
          },
          {
            "text": "Hold final checkpoint to assess success of the cutover, and define required mitigation plans for issues"
          },
          {
            "text": "Execute share transfer and financial settlement and transfer legal control"
          },
          {
            "text": "Communicate with clients on the success of the cutover"
          },
          {
            "text": "Hold regular check-ins to ensure smooth transition to Hypercare"
          }
        ],
        "conditional": [
          {
            "text": "Communicate any residual issues to clients which remain post-cutover, and detail timelines for remediation"
          },
          {
            "text": "Activate TSAs where necessary"
          }
        ],
        "optional": [
          {
            "text": "Brief the media on a successful cutover, with pre-prepared executive remarks"
          },
          {
            "text": "Issue an announcement on the stock exchange regarding the successful cutover"
          }
        ],
        "nuances": [
          {
            "text": "As will remain standalone, cutover should be focused on ensuring the continuity of services, rather than migrating clients to Absa systems. This means cutover is likely to be less complex and inherently risky, but should not be underestimated as problems can permeate into the wider business environment"
          }
        ],
        "artefacts": [
          {
            "text": "Approved cutover runbook, including a time-sequenced plan: activities, owners, dependencies, control gates, and completion criteria (Absa transaction specific)"
          },
          {
            "text": "Hub & Spoke Operating Model"
          },
          {
            "text": "DR and cutover playbook"
          }
        ],
        "templates": [
          {
            "text": "Cutover checkpoint template"
          }
        ]
      },
      {
        "id": "hypercare",
        "index": "10",
        "title": "Hypercare",
        "purpose": "Stabilise the transferred business and ensure ownership has been transferred completely and accurately.",
        "role": [
          {
            "text": "Monitor a consolidated view of incidents post cutover, and monitor the Hypercare team's triage and remediation efforts"
          },
          {
            "text": "Support the Hypercare team in escalating issues through agreed governance in order to prevent any financial, regulatory or client harm"
          },
          {
            "text": "Assess readiness to exit Hypercare using an agreed checklist and criteria, coordinating a formal handover to BAU"
          },
          {
            "text": "Lead regular updates to executives on tracking of strategic and financial outcomes"
          }
        ],
        "timeline": "0 – 1 month",
        "timelineDrivers": [
          {
            "text": "Capacity within Hypercare team (smaller team takes longer to resolve issues)"
          },
          {
            "text": "Success of cutover (issues on cutover mean an extended Hypercare period will likely be needed to stabilise clients and resolve issues)"
          }
        ],
        "necessary": [
          {
            "text": "Set up a dedicated team to monitor client queries, feedback, and complaints post LD1, focused on operational continuity of the standalone business"
          },
          {
            "text": "Triage issues for remediation, add them to a backlog, and flag with technology / BAU teams as required"
          },
          {
            "text": "Escalate persistent or P1 issues immediately, through a dedicated escalation pathway"
          },
          {
            "text": "Stand up and coordinate war-rooms as necessary to remediate P1 issues quickly and avoid disruption"
          },
          {
            "text": "Identify and raise any governance, decision-making, authority, or management retention issues"
          },
          {
            "text": "Assess control effectiveness, capital and funding, and reporting continuity"
          },
          {
            "text": "Gradually hand off servicing to BAU teams by transitioning issue resolution and triage into the BAU process, prioritising only the most serious issues for Hypercare as time passes"
          },
          {
            "text": "Track deal objectives such as revenue, volumes, etc. as soon as LD1, and provide updates to executives on progress against objectives"
          },
          {
            "text": "Hold daily touchpoints with AEs to flag the most important issues and discuss remediation plans"
          }
        ],
        "conditional": [
          {
            "text": "Monitor TSA performance as required"
          }
        ],
        "optional": [],
        "nuances": [
          {
            "text": "As the acquired business will be run as standalone, Hypercare focus can narrow to monitoring business continuity, and resolving and governance/controls issues"
          }
        ],
        "artefacts": [
          {
            "text": "Hub & Spoke operating model"
          },
          {
            "text": "M&A Learning Pathways"
          }
        ],
        "templates": [
          {
            "text": "Hypercare RAID Log"
          },
          {
            "text": "Daily Hypercare status report template"
          }
        ]
      }
    ]
  },
  {
    "archetypeId": "balance-sheet-divestment",
    "archetypeName": "Balance-sheet divestment",
    "variantLabel": null,
    "sourceTitle": "Balance Sheet Sale",
    "stages": [
      {
        "id": "due-diligence",
        "index": "01",
        "title": "Due Diligence",
        "purpose": "Determine whether the acquisition creates value, what you are actually buying, and what needs to be protected contractually. Legal & CorpDev lead; other areas input where required. Activities below relate to key items for the integration team to consider during this process, they do not override current DD processes",
        "role": [
          {
            "text": "Extract information from the DD process necessary to properly plan and run the divestment"
          },
          {
            "text": "Act as M&A SMEs to provide oversight, bringing a practical, Absa oriented lens which goes beyond financials and ensures nuances are identified and caught based on previous experience"
          }
        ],
        "timeline": "1 – 3 months",
        "timelineDrivers": [
          {
            "text": "Deal perimeter (broader perimeter requires more detailed review by the seller)"
          },
          {
            "text": "Product complexity (more complex products are harder for a seller to model and project)"
          },
          {
            "text": "Maturity of DD teams (experienced teams can pre-empt buyer questions and data requests ahead of time)"
          },
          {
            "text": "Buyer availability (heavily reliant on buyer capacity to review and assess materials)"
          }
        ],
        "necessary": [
          {
            "text": "Ensure virtual data room set up to share confidential documentation and ensure it persists after deal signature"
          },
          {
            "text": "Ensure an NDA process to wall-cross those who need access to confidential information is set up"
          },
          {
            "text": "Ensure buyer has the requisite information access controls set up to protect Absa confidential information"
          },
          {
            "text": "Ensure potential leakage of confidential, client or retained-business information is assessed"
          },
          {
            "text": "Understand the sale perimeter: which assets and liabilities transfer, how will the buyer interact with what Absa is not selling?"
          },
          {
            "text": "Build an initial view of project divestment costs, leveraging comparable deals, including TSA costs and retained-business remediation costs. All assumptions in planning costs must be defensible and informed by functional experts"
          },
          {
            "text": "Build or oversee build of a detailed business case comparing forecasted benefits of divestment to project costs and continued running costs"
          },
          {
            "text": "Ensure services the divested business currently receives from Absa are identified"
          },
          {
            "text": "Ensure tax implications have been assessed and remediation planned"
          }
        ],
        "conditional": [
          {
            "text": "Ensure that the impact of selling part of a balance sheet on the remaining assets and liabilities is fully understood (e.g., impact of selling deposits portfolio on transaction banking book)"
          },
          {
            "text": "Access to this early stage of the lifecycle may not always be possible given the broader business context, but it should be requested given its importance to execution"
          }
        ],
        "optional": [
          {
            "text": "Review lessons learnt from previous deals"
          },
          {
            "text": "Engage a subset of buyer clients to assess current pain points and identify any potential deal red flags (e.g. compliance issues, pricing mismatches, in-scope technology issues)"
          }
        ],
        "nuances": [
          {
            "text": "Case for sale must account for economies/diseconomies of scale inherent in selling part but not all of a business (e.g., cost base may not be halved by removing half the balance sheet)"
          },
          {
            "text": "DD must account for business line synergies inherent in selling part but not all of a business (i.e., are existing business lines not being sold harmed by the sale of some others)"
          }
        ],
        "artefacts": [
          {
            "text": "Previous transaction materials and lessons learnt (Absa transaction specific)"
          },
          {
            "text": "Business case (Absa transaction specific)"
          }
        ],
        "templates": []
      },
      {
        "id": "legal-drafting-signature",
        "index": "02",
        "title": "Legal Drafting & Signature",
        "purpose": "Ensure the Sale and Purchase Agreement (SPA) reflects reality of programme delivery, and enables execution. Legal & CorpDev lead, other areas input where required. Activities below relate to key integration considerations, they do not overwrite the current processes.",
        "role": [
          {
            "text": "Ensure legals reflect execution reality, and timelines are realistic"
          },
          {
            "text": "Ensure legals include provisions which will support execution, such as data sharing"
          },
          {
            "text": "Ensure any go-live dates are based on realistic assumptions around regulatory approval and client onboarding timelines"
          },
          {
            "text": "Leverage lessons learned from previous deals to ensure legals address any historic pain points"
          }
        ],
        "timeline": "1 – 2 months",
        "timelineDrivers": [
          {
            "text": "Deal complexity (complex deals require additional protections and conditions)"
          },
          {
            "text": "Pre-signing alignment (pre-agreed valuations and completion mechanisms will speed up drafting)"
          },
          {
            "text": "DD quality (high quality DD will allow defensible assumptions to be made in the legals, otherwise these will have to be assessed during this phase)"
          },
          {
            "text": "Regulatory complexity (multiple regulators across multiple jurisdictions increases complexity in drafting legals)"
          }
        ],
        "necessary": [
          {
            "text": "Engage external lawyers to lead SPA drafting and negotiation, informed by internal legal opinion"
          },
          {
            "text": "Negotiate transaction terms including valuation, adjustment principles, completion mechanisms, and payment terms"
          },
          {
            "text": "Ensure price, adjustments and effective transfer date are agreed"
          },
          {
            "text": "Coordinate and confirm the signing sequence between Absa, the buyer and other parties"
          },
          {
            "text": "Set out which items will transfer from Absa to the buyer automatically under agreed regulatory processes (e.g., Section 54), and which will have to be manually transferred"
          },
          {
            "text": "Detail novation processes for items not automatically transferring, whether independent legal opinions on contracts are required, and where liability sits during transfer"
          },
          {
            "text": "Set out the joint governance mechanisms across buyer and seller at a high level (e.g., the scheduling of joint Steering Committees, appointment of Transaction Directors from each party)"
          },
          {
            "text": "Set out joint escalation mechanisms for programme-level issues, as well as dispute resolution mechanisms"
          },
          {
            "text": "Set out conditions precedent for completion, including funds transfer, assets/liabilities transfer, regulatory approval, and board approval"
          },
          {
            "text": "Agree signatures required on each side"
          },
          {
            "text": "Set out completion date precedent on regulatory approval date(s), rather than a pre-agreed specific date"
          },
          {
            "text": "Place clear obligations on the buyer for regulatory approvals, onboarding and operational readiness"
          }
        ],
        "conditional": [
          {
            "text": "Set out stipulations and timings for the sharing of client data, including whether business cases are required, and what can and can't be shared ahead of regulatory approval"
          },
          {
            "text": "Set out a joint communications plan to clients from both buyer and seller, including timelines for when buyer can engage the clients"
          },
          {
            "text": "Define how incomplete transfers or rejected clients will be treated"
          },
          {
            "text": "Detail FX payment mechanisms, including adjustments for FX risk and longer settlement times"
          },
          {
            "text": "Define ownership and licensing of shared Intellectual Property"
          },
          {
            "text": "Establish TSAs, service levels, pricing, liabilities, and exit dates"
          },
          {
            "text": "Access to this early stage of the lifecycle may not always be possible given the broader business context, but it should be requested given its importance to execution"
          }
        ],
        "optional": [
          {
            "text": "Set SPA change control mechanisms"
          },
          {
            "text": "Set up SPA access mechanisms for project team members"
          },
          {
            "text": "Socialise with functional leads ahead of signature"
          }
        ],
        "nuances": [
          {
            "text": "Balance sheet sale may not necessarily include the transfer of clients and client data, so this should be explicitly assessed"
          }
        ],
        "artefacts": [
          {
            "text": "DD summary and agreed deal decisions (Absa deal specific)"
          },
          {
            "text": "M&A lessons learnt (Absa transaction specific)"
          }
        ],
        "templates": [
          {
            "text": "NDA template"
          }
        ]
      },
      {
        "id": "mobilisation-planning",
        "index": "03",
        "title": "Mobilisation & Planning",
        "purpose": "Define the key activities which must take place to enable LD1 to take place on the agreed date, and surface dependencies",
        "role": [
          {
            "text": "Inorganic Change team should lead the mobilisation effort across Absa: briefing functional leads / AEs, onboarding teams, executing the NDA process, creating onboarding materials, briefing teams on detailed plan creation, and supporting the buyer to lead joint planning efforts"
          }
        ],
        "timeline": "4- 6 weeks",
        "timelineDrivers": [
          {
            "text": "Deal complexity (complex deals need more workstreams to execute)"
          },
          {
            "text": "Geographical scope (multiple geographies require more coordination)"
          },
          {
            "text": "Existing knowledge (teams familiar with these deals can draft a detailed plan much faster, and understand dependencies)"
          },
          {
            "text": "Available resource (resource constraints mean activities take longer)"
          },
          {
            "text": "Buyer capabilities (joint planning is reliant on the buyer's more detailed plan being ready for discussion)"
          }
        ],
        "necessary": [
          {
            "text": "Set up mobilisation hierarchy:",
            "subs": [
              "Board appoints executive sponsor for the deal",
              "Executive sponsor appoints Transaction Director",
              "Transaction Director and Executive Sponsor agree Accountable Executives for each function / workstream",
              "AE selection should be informed by their expected responsibilities, detailed in the Hub and Spoke Operating Model",
              "AEs appoint functional workstream leads, who appoint in-country leads",
              "Transaction Director mobilises central Inorganic Change team and in-country coordinators",
              "Buyer and Seller Inorganic Change teams share lists of functional leads to enable joint planning",
              "Joint and individual governance established based on Mobilisation Toolkit"
            ]
          },
          {
            "text": "Each asset, process, capability, should be classified as either:",
            "subs": [
              "Transfer",
              "Retain",
              "Duplicate",
              "Terminate",
              "Replace",
              "Provide temporarily through a TSA"
            ]
          },
          {
            "text": "Define key workstreams required based on the deal-archetype and SPA specifics, including rough size of each workstream"
          },
          {
            "text": "Define workstream charters per workstream, setting out objective, purpose, success metrics, key personnel, skills, and ownership"
          },
          {
            "text": "Jointly carry out workstream blueprints across buyer and seller, laying out each business process related to the workstream, which the seller will stop, which the buyer will start, and which will carry on as is"
          },
          {
            "text": "Define key milestones required to enable these process and achieve a seamless cutover at Legal Day 1 (LD1), with clear separation of buyer owned, seller owned, and jointly owned milestones"
          },
          {
            "text": "Support each workstream to define a detailed, L2 plan below this to enable the meeting of these milestones"
          },
          {
            "text": "Hold joint workshops across buyer and seller to discuss and agree on these milestones"
          },
          {
            "text": "Identify milestones with key dependencies across workstreams, and document these dependencies in detail"
          },
          {
            "text": "Set up a buyer-obligation and dependency tracker to ensure buyer is held accountable for conditions precedent"
          },
          {
            "text": "Identify the critical path, and dates/factors will have a material impact on completion, and which of these can be controlled (e.g., regulatory approval or bank-wide change freezes cannot be controlled, data migration solution build and test is critical to LD1 success, etc)"
          },
          {
            "text": "Translate the milestones into an overarching project plan to be tracked weekly"
          },
          {
            "text": "Agree initial LD1 readiness criteria per workstream with the buyer, and track these outcomes (key performance indicators which will enable cutover, e.g., for HR, 100% of consultations complete)"
          },
          {
            "text": "Agree on internal governance cadence which will sync with joint governance laid out in the SPA, including:",
            "subs": [
              "Internal and joint Inorganic Change meetings weekly / bi-weekly to align on priorities and joint risks/issues",
              "Working group / workstream led sessions to discuss key risks, issues, and progress",
              "Internal Steering Committee sessions to escalate Absa-specific risks and issues, and receive guidance on key decisions",
              "Joint Steering Committee sessions to discuss joint risks and issues, and coordinate cross-party solutions"
            ]
          },
          {
            "text": "Translate DD findings and governance structures into onboarding materials which clearly articulate the purpose and objectives of the deal, how execution will run day to day, roles and responsibilities, and escalation pathways"
          }
        ],
        "conditional": [
          {
            "text": "Submit a version of the programme plan to the regulator alongside the request for approval"
          },
          {
            "text": "Create a detailed workstream plan for employee / tech transfer"
          },
          {
            "text": "Define a TSA service catalogue and exit plan"
          },
          {
            "text": "Set up TSA exit team and define timeline for complete TSA exit"
          },
          {
            "text": "Define a stranded cost remediation plan"
          },
          {
            "text": "Set up a Separation Management Office run by the Inorganic Change Team to lead the separation from Absa's side"
          }
        ],
        "optional": [
          {
            "text": "Translate the project plan into project management software (e.g., Jira, MSP)"
          },
          {
            "text": "Link governance into bank-level governance such as Board meetings, StratCos, etc"
          }
        ],
        "nuances": [
          {
            "text": "Sold components cannot operate independently, so missing capabilities must be stood up by the buyer by Day 1"
          },
          {
            "text": "Particularly small divestments may not be required dedicated, full-time capacity on the Absa side. This is also dependent on the capabilities of the buyer's teams"
          }
        ],
        "artefacts": [
          {
            "text": "TSA agreements (Absa transaction specific)"
          },
          {
            "text": "Regulatory commitments and approval timelines (Absa transaction specific)"
          },
          {
            "text": "Previous transaction playbooks with lessons learned (Absa transaction specific)"
          },
          {
            "text": "Hub & Spoke operating model"
          },
          {
            "text": "Mobilisation toolkit"
          }
        ],
        "templates": [
          {
            "text": "Workstream blueprints"
          },
          {
            "text": "High-level transaction plan template"
          },
          {
            "text": "Detail excel project plan"
          },
          {
            "text": "Governance forums Terms of Reference"
          },
          {
            "text": "TSA service catalogue"
          },
          {
            "text": "Buyer obligations tracker"
          }
        ]
      },
      {
        "id": "programme-execution",
        "index": "04",
        "title": "Programme Execution",
        "purpose": "Execute on agreed milestones, run governance cadence, and extract required business for transfer.",
        "role": [
          {
            "text": "Inorganic Change Team acts as the central hub in the execution phase, driving workstream level execution, tracking RAID items, defining SteerCo material, and holding those responsible for separation accountable, whilst ensuring the buyer is making significant progress"
          }
        ],
        "timeline": "12 – 18 months",
        "timelineDrivers": [
          {
            "text": "Regulatory approval timelines"
          },
          {
            "text": "Deal perimeter and scope"
          },
          {
            "text": "New product build (additional product build by the buyer requires more delivery time)"
          },
          {
            "text": "Data complexity (Complex structures require a more nuanced data migration solution)"
          },
          {
            "text": "TSA service plan (High number of TSAs can lead to faster initial completion, with work backloaded into TSA execution and exit)"
          }
        ],
        "necessary": [
          {
            "text": "Conduct programme management activities: run governance processes including workstream sessions, Exec SteerCos, and Joint Buyer/Seller SteerCos; set up and track risks and issues in a central RAID log, and escalate to SteerCo as appropriate"
          },
          {
            "text": "Separate applications, infrastructure, access rights and interfaces which will remain in the retained business"
          },
          {
            "text": "Separate financial reporting, ledger, controls, and regulatory reporting from the retained business"
          },
          {
            "text": "Ensure buyer access to retained business information is removed or limited"
          },
          {
            "text": "Ensure the divested business' value is maintained ahead of LD1, to avoid complications in completion and valuation"
          },
          {
            "text": "Remediate stranded costs within the retained organisation"
          },
          {
            "text": "Track buyer obligations, flag issues, and escalate to Joint SteerCo as appropriate"
          },
          {
            "text": "Provide regular updates to the Board and Bank Leadership Forums on progress against plan, key risks and issues, and LD1 viability"
          },
          {
            "text": "Engage the regulator regularly to update progress and assess approval timelines"
          },
          {
            "text": "Conduct contingency and scenario planning for if approvals arrive later than anticipated, and define final possible date for receipt before LD1 must move"
          },
          {
            "text": "Build out detailed client communication plan across buyer and seller, and keep clients updated on the progress of the programme, and when they can expect to be onboarded"
          },
          {
            "text": "Share a data dictionary detailing data structures across source systems for the buyer to consume"
          },
          {
            "text": "Support the buyer with source-to-target mapping across all systems to enable the build of core data migration solution"
          },
          {
            "text": "Support the build of the data migration solution to Extract, Transform, and Load (ETL) solution across all source systems into target systems"
          },
          {
            "text": "Ensure the data migration solution is tested using dummy data aligned to the data dictionary, or where possible, real client data"
          },
          {
            "text": "Agree with the buyer what data can be transferred ahead of LD1, accounting for regulatory and data-privacy conditions"
          },
          {
            "text": "Define success criteria across all workstreams, and continually measure progress against these"
          },
          {
            "text": "Provide the buyer with regularly updated financials to track the progress of the divested business"
          },
          {
            "text": "Novate, assign or replicate contracts which will be transferring to the buyer"
          },
          {
            "text": "Extract and segregate the transferring client and business data from the rest of the Absa estate"
          },
          {
            "text": "Set up a Clean Room for the buyer to conduct KYC/AML checks, which should be entirely 'airgapped'"
          },
          {
            "text": "If TSAs are in place, monitor service delivery and exit planning"
          }
        ],
        "conditional": [],
        "optional": [
          {
            "text": "Conduct change management activities for project execution teams to drive continued buy-in and morale (e.g., team socials, rewards, etc)"
          }
        ],
        "nuances": [
          {
            "text": "Sale of part of the balance sheet may not include the transfer of client relationships. This Should be assessededed, if included, the transfer of client data will form a significant part of execution"
          }
        ],
        "artefacts": [
          {
            "text": "Detail project plan built out from mobilisation and planning stage (Absa transaction specific)",
            "subs": [
              "With associated excel programme plan"
            ]
          },
          {
            "text": "Previous project playbooks with lessons learnt (Absa transaction specific)"
          },
          {
            "text": "Hub & Spoke operating model"
          },
          {
            "text": "Mobilisation toolkit"
          }
        ],
        "templates": [
          {
            "text": "Workstream status report template"
          },
          {
            "text": "Joint buyer and seller status report template"
          },
          {
            "text": "Programme RAID log template with added SteerCo escalation if necessary"
          },
          {
            "text": "TSA service catalogue"
          }
        ]
      },
      {
        "id": "business-testing",
        "index": "05",
        "title": "Business Testing",
        "purpose": "Check that the buyer can operate the new business, and that Absa can continue to operate after the transfer",
        "role": [
          {
            "text": "Inorganic Change Team role is to coordinate and govern testing across business and technology teams, not to perform testing itself."
          }
        ],
        "timeline": "1 – 2 months (concurrent with execution, post-build)",
        "timelineDrivers": [
          {
            "text": "Scale of business process change"
          },
          {
            "text": "Testing expertise in-house (testing SMEs within each team means scripts require less review and testing can happen faster)"
          },
          {
            "text": "Capacity within teams to accommodate testing (needs to be balanced with BAU, build, other deal-related work)"
          },
          {
            "text": "Complexity of process change (complex new systems or products require significant testing)"
          },
          {
            "text": "Downstream systems (impact of changes on multiple downstream systems requires more extensive end-to-end testing)"
          }
        ],
        "necessary": [
          {
            "text": "Ensure the buyer has detailed all business process changes occurring as part of the deal to be included in testing"
          },
          {
            "text": "Detail any business or technology changes impacting the retained business on Absa's side"
          },
          {
            "text": "Work with technology teams to understand the requirements for testing environments, including end-to-end environments"
          },
          {
            "text": "Ensure retained business regression test scripts are created which ensure:",
            "subs": [
              "No unauthorised data is transferred",
              "Transferring balances, records, and populations reconcile",
              "Retained applications and interfaces continue functioning",
              "TSA processes and service levels work as designed",
              "Regulatory and fin-crime reporting remains working as expected"
            ]
          },
          {
            "text": "Book these environments well in advance, or flag if suitable environments do not yet exist and must be built"
          },
          {
            "text": "Designate a testing lead within each workstream responsible for coordinating and executing tests assigned to them"
          },
          {
            "text": "Drive execution of test scripts by the business, with oversight from the testing team"
          },
          {
            "text": "Once individual processes are validated, test every process end-to-end, including the feed into downstream systems like AML, finance, and HR systems"
          },
          {
            "text": "Set up a testing-specific defect log to track issues to closure"
          },
          {
            "text": "Re-test issues post closure end-to-end, to ensure the fix has not created additional issues"
          },
          {
            "text": "Secure executive and business sign off on testing closure, with any open items clearly detailed"
          }
        ],
        "conditional": [
          {
            "text": "Support the buyer to test the flow of data into and out of HR systems such as Workday"
          },
          {
            "text": "Test that only data in the scope of the deal is coming across, and data related to products outside of the perimeter is filtered out"
          },
          {
            "text": "Support the buyer to test that any new systems stood up can receive data as expected"
          },
          {
            "text": "Test that systems transferring to the buyer can migrate as expected, with no disruption in service to either buyer or Absa"
          },
          {
            "text": "Set up an independent testing team to liaise with business and technology to drive test script creation and sign off"
          }
        ],
        "optional": [
          {
            "text": "Conduct Production Validation Testing to check that new functionality works in production as well as in test environments"
          },
          {
            "text": "Set up testing-specific governance, and feed into programme governance"
          },
          {
            "text": "Conduct friendly client testing to ensure that end-to-end flows work in a real world scenario"
          }
        ],
        "nuances": [
          {
            "text": "Small divestments may not require a dedicated independent testing team, as the bulk of testing work will sit within the buyer's remit"
          }
        ],
        "artefacts": [
          {
            "text": "Previous business testing programmes with lessons learnt, including a scenario-based risk mitigation plan (Absa transaction specific)"
          },
          {
            "text": "Business testing process flows and customer journeys (Absa transaction specific)"
          }
        ],
        "templates": [
          {
            "text": "Detailed business testing plan template"
          }
        ]
      },
      {
        "id": "ld1-readiness",
        "index": "06",
        "title": "LD1 Readiness",
        "purpose": "Ensure new clients are onboarded to buyer systems, communicate requirements and functionality with clients, and set up an orderly transfer to the buyer",
        "role": [
          {
            "text": "Oversee the standing up of an LD1 Readiness stream, and tracking both Absa and buyer progress and risks as part of programme management to assess critical risks to LD1"
          }
        ],
        "timeline": "1 – 2 months (concurrent to execution, alongside buyer)",
        "timelineDrivers": [
          {
            "text": "Scale of client transfer (more clients require additional communications alongside the buyer and more information transfer)"
          },
          {
            "text": "Complexity of client product mix (complex products and multi-product portfolios increase time to onboard and offboard)"
          },
          {
            "text": "Availability of client data (high-quality client contact data removes time spent sourcing it internally)"
          },
          {
            "text": "Client responsiveness (heavily reliant on clients responding to outreach and providing documentation)"
          }
        ],
        "necessary": [
          {
            "text": "Ensure all offboarding activities are taking place for assets and liabilities moving off the balance sheet (e.g., closing nostros)"
          },
          {
            "text": "Ensure impact on wider balance sheet is understood and planned for (e.g. capital adequacy, funding implications)"
          },
          {
            "text": "Define Absa's role in the Hypercare model for post go-live, and how much support the buyer requires from Absa experts"
          }
        ],
        "conditional": [
          {
            "text": "Ensure the buyer has defined a 'drop-dead date' for when onboarding must begin to meet LD1"
          },
          {
            "text": "Ensure the buyer has detailed all client documentation required to enable onboarding, and perform a gap analysis to understand which Absa can supply, and which the buyer must source from clients directly"
          },
          {
            "text": "Determine which clients require notification, consent or contractual novation"
          },
          {
            "text": "Share client contact details are with the buyer as early as possible, and track client outreach"
          },
          {
            "text": "Allocate responsibility for each client interaction between seller and buyer"
          },
          {
            "text": "Share Absa risk profiles of clients, to enable the buyer to understand which clients are high risk, and which some documentation can be obtained post-LD1"
          },
          {
            "text": "Track client consents, objections, attrition and transfer exceptions, and offboard clients who cannot or will not transfer (due to buyer risk appetite, client attrition, etc)"
          },
          {
            "text": "Agree servicing arrangements for clients pending transfer, and monitor conduct and reputational risks from client communications"
          },
          {
            "text": "Share existing required KYC / AML documentation across transferring clients"
          },
          {
            "text": "Support the buyer in setting up client accounts, profiles, products, permissions, and mandates ahead of time to enable Dress Rehearsals and testing"
          }
        ],
        "optional": [
          {
            "text": "Assess with the buyer whether some clients can be onboarded early to conduct friendly-client testing with new to bank clients"
          }
        ],
        "nuances": [
          {
            "text": "Sale of part of the balance sheet may not include the transfer of client relationships. This Should be assessededed, if included, the transfer of client data will form a significant part of LD1 Readiness"
          }
        ],
        "artefacts": [
          {
            "text": "Client onboarding playbook (Absa transaction specific)"
          },
          {
            "text": "Client training materials (Absa transaction specific)"
          }
        ],
        "templates": []
      },
      {
        "id": "dress-rehearsals",
        "index": "07",
        "title": "Dress Rehearsals",
        "purpose": "Testing end-to-end approach to cutover in order to raise and resolve any issues which would prevent a successful separation",
        "role": [
          {
            "text": "Coordinate the logistical preparation of the DRs, support the Data Migration team in defining the runbook, support the execution of the DRs either as logistical support or by acting as Data Migration Coordinators (DMCs)."
          }
        ],
        "timeline": "8 – 12 weeks",
        "timelineDrivers": [
          {
            "text": "Time remaining post buyer build and test (if build and test finishes well ahead of LD1, more DRs can take place)"
          },
          {
            "text": "Number of Dress Rehearsals (DRs) (more DRs require a longer timeframe)"
          },
          {
            "text": "Down-time between DRs (minimum 2 weeks between DRs is recommended)"
          }
        ],
        "necessary": [
          {
            "text": "Work with the Data Migration and Technology teams to define cutover plan which details every activity down to the minute required to wind down the Absa business and ensure all relevant data and funds are transferred to the buyer, as well as making sure the retained business functions as expected"
          },
          {
            "text": "Ensure that runbook activities include provision for testing of continued regulatory and financial reporting, as well as financial reconciliation on the buyer's side"
          },
          {
            "text": "Hold runbook run-through sessions with all activity owners and back-ups to ensure everyone is clear on expectations"
          },
          {
            "text": "Define success metrics for DRs, with a clear understanding of what is acceptable in the first DR vs the final DR"
          },
          {
            "text": "Agree which data sets will be dummy / anonymised, and which will be real client data"
          },
          {
            "text": "Define roles and responsibilities across DRs and Cutover, including Data Migration Controllers running the runbook"
          },
          {
            "text": "Execute logistical support required to enable 24/7 DRs to take place such as building access, food requirements, accommodation, travel, Wi-Fi, security, facilities, and back-up plans"
          },
          {
            "text": "Define the governance processes to take place during DRs including the command centre, regular executive updates, escalation pathways, war room protocols, issue resolution processes, and continency decision making"
          },
          {
            "text": "Collate a DR playbook summarising success criteria, logistical information, key contacts, governance processes, and timelines"
          },
          {
            "text": "Define and test rollback, contingency, and partial transfer scenarios to ensure Minimal disruption to clients in these instances"
          },
          {
            "text": "Confirm after each DR that retained data has not been transferred"
          },
          {
            "text": "Run a minimum of 4 DRs across weekends, with at least 2 weeks in between each"
          },
          {
            "text": "Each DR should execute the runbook end-to-end, and track issues which arise for remediation"
          },
          {
            "text": "Hold DR retros to note lessons learnt and iterate into subsequent DRs"
          },
          {
            "text": "Track the remediation of issues ahead of subsequent DRs"
          }
        ],
        "conditional": [
          {
            "text": "Include DR activities which simulate the exit of liquidity and capital, and ensure the business has prepared processes to address this"
          }
        ],
        "optional": [
          {
            "text": "Hold a 'Technical DR' before the true DRs take place, to test only the migration solution, and ensure this is not a blocker to future DRs"
          }
        ],
        "nuances": [
          {
            "text": "For small divestments, DRs and runbooks can narrow their focus to extracting relevant data and ensuring it is passed correctly to the buyer, with minimal disruption to the retained business"
          }
        ],
        "artefacts": [
          {
            "text": "Approved DR strategy: this will cover DR scope, sequencing, success measures and rehearsal cadence (Absa transaction specific)"
          },
          {
            "text": "Previous DR completion records with timestamps, success measure results and lessons learnt (Absa transaction specific)"
          },
          {
            "text": "DR and cutover playbook"
          }
        ],
        "templates": [
          {
            "text": "Runbook template"
          },
          {
            "text": "DR defect template"
          },
          {
            "text": "DR checkpoint template"
          },
          {
            "text": "DR retro template"
          }
        ]
      },
      {
        "id": "go-no-go",
        "index": "08",
        "title": "Go/No-Go",
        "purpose": "Formally discuss and approve/disapprove whether all workstreams and parties are sufficiently ready to proceed with separation",
        "role": [
          {
            "text": "Drive the collation of evidence across execution, testing, and DRs to present a case for a Go/No-Go decision to the Steering Committee. Liaise with functional leads and AEs to ensure they can clearly state the recommendation of their area."
          }
        ],
        "timeline": "1- 2 weeks",
        "timelineDrivers": [
          {
            "text": "Likelihood for a no-go (no-go decisions require additional justification and discussion)"
          },
          {
            "text": "Existing evidence (if evidence has to be specially sourced and collated, timelines may increase)"
          },
          {
            "text": "SPA stipulations (some SPAs stipulate when Go/No-Go decisions must take place, and how long discussions may last)"
          }
        ],
        "necessary": [
          {
            "text": "Assess the success of DRs, and confirm that all issues from the final DR have been remediated or have clear timelines for remediation"
          },
          {
            "text": "Ensure that at least one successful end to end DR has taken place"
          },
          {
            "text": "Discuss residual risks and mitigation plans across each workstream, with each AE laying out in turn testing results, DR success, and residual risks related to their area"
          },
          {
            "text": "For each residual risk, lay out the potential risk to go-live, likelihood, and mitigation plans"
          },
          {
            "text": "Gather evidence that key conditions have been met such as:",
            "subs": [
              "Regulatory approval",
              "Data extraction and reconciliation in DRs",
              "Financial settlement success in DRs",
              "Buyer obligations as stipulated in the SPA"
            ]
          },
          {
            "text": "Gather all AEs / SteerCo members to formally make and document the Go/No-Go decision internally, allowing any reservations to be noted and addressed"
          },
          {
            "text": "Gather buyer and seller AEs to formally make the joint Go/No-Go decision"
          },
          {
            "text": "Formally document go/no position with the buyer and communicate to clients, employees, and regulators"
          }
        ],
        "conditional": [
          {
            "text": "Distinguish between:",
            "subs": [
              "Legal completion readiness",
              "Operational separation readiness",
              "TSA-supported Day 1 readiness"
            ]
          },
          {
            "text": "Include Go/No-Go decision points related to buyer client onboarding, novations, and account set ups if client relationships are in-scope for transfer"
          }
        ],
        "optional": [
          {
            "text": "Announce the decision on the local stock exchange to ensure clients / market is aware (e.g., SENS announcement)"
          },
          {
            "text": "Brief the media on the decision, with a series of prepared remarks"
          }
        ],
        "nuances": [
          {
            "text": "Go/No-Go may need to account for buyer client onboarding and set up should client transfer form part of the divestment"
          }
        ],
        "artefacts": [
          {
            "text": "Go/No-Go criteria (owned by Inorganic Change Team to use throughout this decision making process)"
          },
          {
            "text": "M&A Learning Academy materials on governance and decision rights"
          },
          {
            "text": "DR and cutover playbook"
          }
        ],
        "templates": [
          {
            "text": "Go/No-Go decision scorecard/paper"
          }
        ]
      },
      {
        "id": "cutover",
        "index": "09",
        "title": "Cutover",
        "purpose": "Execute the controlled separation and transfer of the agreed business perimeter while maintaining continuity across both the divested and retained businesses",
        "role": [
          {
            "text": "Coordinate the logistical preparation of the cutover, based upon successful DR. Support the execution of the cutover"
          },
          {
            "text": "Run the central control function, coordinating Absa activities and linking in with the buyer, and overseeing workstream execution against approved runbook."
          },
          {
            "text": "Coordinate cross-workstream dependencies and stakeholder communications through the cutover timeline."
          }
        ],
        "timeline": "24 to 72 hours",
        "timelineDrivers": [
          {
            "text": "Scale of activity required over cutover"
          },
          {
            "text": "Length of individual activities (some activities may last 24 hours + depending on their nature)"
          },
          {
            "text": "Length of time the bank can shut down without impacting service (some jurisdictions have payments flowing over the weekend, others do not)"
          }
        ],
        "necessary": [
          {
            "text": "Work with Data Migration and Technology to define the final cutover plan, iterated during DRs"
          },
          {
            "text": "Freeze and extract the final transferring population ahead of cutover"
          },
          {
            "text": "Reconcile assets and liabilities to assess funding requirements, and execute financial settlement and completion-account activities"
          },
          {
            "text": "Ensure required legal documents are signed over cutover to formally transfer legal and operational control to the buyer"
          },
          {
            "text": "Ensure Absa system access to divested business is revoked or modified"
          },
          {
            "text": "Walk through the plan again with teams to confirm understanding, roles, and responsibilities"
          },
          {
            "text": "Sign off final cutover plan with all AEs"
          },
          {
            "text": "Coordinate contingency planning across all workstreams, gathering scenarios and planning for potential issues which may arise over the cutover"
          },
          {
            "text": "Define any additional governance to be in place during cutover vs DRs (e.g., additional executive updates, final decision gates, etc)"
          },
          {
            "text": "Execute on cutover plan, including agreed-upon governance gates"
          },
          {
            "text": "Execute on testing activities planned in the runbook to ensure all retained business systems are working as planned"
          },
          {
            "text": "Hold final checkpoint to assess success of the cutover, ensure retained systems continue to function, and assess Absa support required in mitigation plans for issues"
          },
          {
            "text": "Continue to communicate with the buyer once they open post-cutover to assess issues and provide support where needed"
          }
        ],
        "conditional": [
          {
            "text": "Communicate with clients on the success of the cutover, and remind them of new channels into the buyer"
          },
          {
            "text": "Extract and freeze client data should this be in scope"
          },
          {
            "text": "Communicate any residual issues to clients which remain post-cutover, and detail timelines for remediation"
          },
          {
            "text": "Activate buyer access and TSA services"
          }
        ],
        "optional": [
          {
            "text": "Brief the media on a successful cutover, with pre-prepared executive remarks"
          },
          {
            "text": "Issue an announcement on the stock exchange regarding the successful cutover"
          }
        ],
        "nuances": [
          {
            "text": "Cutover of client data will also be included if this is in scope. If not, the cutover will focus on the moving of agreed assets and liabilities"
          }
        ],
        "artefacts": [
          {
            "text": "Approved cutover runbook, including a time-sequenced plan: activities, owners, dependencies, control gates, and completion criteria (Absa transaction specific)"
          },
          {
            "text": "Hub & Spoke Operating Model"
          },
          {
            "text": "DR and cutover playbook"
          }
        ],
        "templates": [
          {
            "text": "Cutover checkpoint template"
          }
        ]
      },
      {
        "id": "hypercare",
        "index": "10",
        "title": "Hypercare",
        "purpose": "Stabilise the retained business, ensure TSAs are active as required, resolve any residual issues from cutover, and support buyer Hypercare.",
        "role": [
          {
            "text": "Monitor a consolidated view of incidents post cutover, and monitor the Hypercare team's triage and remediation efforts"
          },
          {
            "text": "Support the Hypercare team in escalating issues through agreed governance in order to prevent any financial, regulatory or client harm"
          },
          {
            "text": "Assess readiness to exit Hypercare using an agreed checklist and criteria, coordinating a formal handover to BAU"
          },
          {
            "text": "Lead regular updates to executives on tracking of strategic and financial outcomes"
          }
        ],
        "timeline": "1 – 2 months",
        "timelineDrivers": [
          {
            "text": "Whether clients are transferring (transferring clients means additional time required to triage and resolve issues)"
          },
          {
            "text": "Capacity within Hypercare team (smaller team takes longer to resolve issues)"
          },
          {
            "text": "Complexity of transfer (a transfer of complex clients with complex products likely requires more dedicated service time)"
          },
          {
            "text": "Success of cutover (issues on cutover mean an extended Hypercare period will likely be needed to stabilise clients and resolve issues)"
          }
        ],
        "necessary": [
          {
            "text": "Set up a dedicated team to monitor residual cutover issues, retained business issues, and any post-cutover data corrections or additions required"
          },
          {
            "text": "Triage issues for remediation, add them to a backlog, and flag with technology / BAU teams as required"
          },
          {
            "text": "Escalate persistent or P1 issues immediately, through a dedicated escalation pathway"
          },
          {
            "text": "Stand up and coordinate war-rooms as necessary to remediate P1 issues quickly and avoid disruption"
          },
          {
            "text": "Gradually hand off servicing to BAU teams by transitioning issue resolution and triage into the BAU process, prioritising only the most serious issues for Hypercare as time passes"
          },
          {
            "text": "Track divestment objectives such as cost, asset/liability transfer, volumes, etc. as soon as LD1, and provide updates to executives on progress against objectives"
          },
          {
            "text": "Hold daily touchpoints with AEs to flag the most important issues and discuss remediation plans"
          }
        ],
        "conditional": [
          {
            "text": "Set up dedicated client communications teams to ensure retained clients remain in the loop post LD1"
          },
          {
            "text": "Hold regular touchpoints with client-facing teams to discuss client sentiment and assess action plans"
          },
          {
            "text": "Support the buyer's Hypercare for systems which have transitioned from Absa to buyer"
          },
          {
            "text": "Monitor TSA performance, track progress towards exit, and remove remaining entanglements"
          },
          {
            "text": "Complete financial true-ups and track stranded cost removal"
          },
          {
            "text": "Resolve any transfer exceptions or data inaccuracies"
          },
          {
            "text": "Monitor warranties, indemnities, and potential claims"
          },
          {
            "text": "Confirm buyer deletion or return of Absa data"
          }
        ],
        "optional": [
          {
            "text": "Reach out to clients directly to assess sentiment"
          }
        ],
        "nuances": [
          {
            "text": "Dedicated client-focused Hypercare will be required should client transfer be in scope for the deal"
          }
        ],
        "artefacts": [
          {
            "text": "Hub & Spoke operating model"
          },
          {
            "text": "M&A Learning Pathways"
          }
        ],
        "templates": [
          {
            "text": "Hypercare RAID Log"
          },
          {
            "text": "Daily Hypercare status report template"
          },
          {
            "text": "TSA service dashboard and exit plan"
          }
        ]
      }
    ]
  },
  {
    "archetypeId": "partial-business-divestment",
    "archetypeName": "Partial-business divestment",
    "variantLabel": null,
    "sourceTitle": "Partial Business Sale",
    "stages": [
      {
        "id": "due-diligence",
        "index": "01",
        "title": "Due Diligence",
        "purpose": "Determine whether the acquisition creates value, what you are actually buying, and what needs to be protected contractually. Legal & CorpDev lead; other areas input where required. Activities below relate to key items for the integration team to consider during this process, they do not override current DD processes",
        "role": [
          {
            "text": "Extract information from the DD process necessary to properly plan and run the divestment"
          },
          {
            "text": "Act as M&A SMEs to provide oversight, bringing a practical, Absa oriented lens which goes beyond financials and ensures nuances are identified and caught based on previous experience"
          }
        ],
        "timeline": "1 – 3 months",
        "timelineDrivers": [
          {
            "text": "Deal perimeter (broader perimeter requires more detailed review by the seller)"
          },
          {
            "text": "Product complexity (more complex products are harder for a seller to model and project)"
          },
          {
            "text": "Maturity of DD teams (experienced teams can pre-empt buyer questions and data requests ahead of time)"
          },
          {
            "text": "Buyer availability (heavily reliant on buyer capacity to review and assess materials)"
          }
        ],
        "necessary": [
          {
            "text": "Ensure virtual data room set up to share confidential documentation and ensure it persists after deal signature"
          },
          {
            "text": "Ensure an NDA process to wall-cross those who need access to confidential information is set up"
          },
          {
            "text": "Ensure buyer has the requisite information access controls set up to protect Absa confidential information"
          },
          {
            "text": "Ensure potential leakage of confidential, client or retained-business information is assessed"
          },
          {
            "text": "Understand the sale perimeter: which assets and liabilities transfer, how will the buyer interact with what Absa is not selling?"
          },
          {
            "text": "Build an initial view of project divestment costs, leveraging comparable deals, including TSA costs and retained-business remediation costs. All assumptions in planning costs must be defensible and informed by functional experts"
          },
          {
            "text": "Build or oversee build of a detailed business case comparing forecasted benefits of divestment to project costs and continued running costs"
          },
          {
            "text": "Ensure services the divested business currently receives from Absa are identified"
          },
          {
            "text": "Ensure subject matter experts are engaged to conduct cyber, technology, security, compliance DD to ensure that a deep understanding of these elements is gained during DD, to inform accurate planning"
          },
          {
            "text": "Ensure tax implications have been assessed and remediation planned"
          }
        ],
        "conditional": [
          {
            "text": "Ensure that cost implication of the people movement has been assessed, and agree whether severance costs will be incurred"
          },
          {
            "text": "Ensure total cost of ownership of transferring technology has been understood and identify potential cost savings"
          },
          {
            "text": "Access to this early stage of the lifecycle may not always be possible given the broader business context, but it should be requested given its importance to execution"
          }
        ],
        "optional": [
          {
            "text": "Review lessons learnt from previous deals"
          },
          {
            "text": "Engage a subset of buyer clients to assess current pain points and identify any potential deal red flags (e.g. compliance issues, pricing mismatches, in-scope technology issues)"
          }
        ],
        "nuances": [
          {
            "text": "Case for sale must account for economies/diseconomies of scale inherent in selling part but not all of a business (e.g., cost base may not be halved by removing half the balance sheet)"
          },
          {
            "text": "DD must account for business line synergies inherent in selling part but not all of a business (i.e., are existing business lines not being sold harmed by the sale of some others)"
          }
        ],
        "artefacts": [
          {
            "text": "Previous transaction materials and lessons learnt (Absa transaction specific)"
          },
          {
            "text": "Business case (Absa transaction specific)"
          }
        ],
        "templates": []
      },
      {
        "id": "legal-drafting-signature",
        "index": "02",
        "title": "Legal Drafting & Signature",
        "purpose": "Ensure the Sale and Purchase Agreement (SPA) reflects reality of programme delivery, and enables execution. Legal & CorpDev lead, other areas input where required. Activities below relate to key integration considerations, they do not overwrite the current processes.",
        "role": [
          {
            "text": "Ensure legals reflect execution reality, and timelines are realistic"
          },
          {
            "text": "Ensure legals include provisions which will support execution, such as data sharing"
          },
          {
            "text": "Ensure any go-live dates are based on realistic assumptions around regulatory approval and client onboarding timelines"
          },
          {
            "text": "Leverage lessons learned from previous deals to ensure legals address any historic pain points"
          }
        ],
        "timeline": "1 – 2 months",
        "timelineDrivers": [
          {
            "text": "Deal complexity (complex deals require additional protections and conditions)"
          },
          {
            "text": "Employee transfer (employee transfer requires an additional agreement drafted)"
          },
          {
            "text": "Technology ownership (addenda may be required to stipulate technology requirements)"
          },
          {
            "text": "Pre-signing alignment (pre-agreed valuations and completion mechanisms will speed up drafting)"
          },
          {
            "text": "DD quality (high quality DD will allow defensible assumptions to be made in the legals, otherwise these will have to be assessed during this phase)"
          },
          {
            "text": "Regulatory complexity (multiple regulators across multiple jurisdictions increases complexity in drafting legals)"
          }
        ],
        "necessary": [
          {
            "text": "Engage external lawyers to lead SPA drafting and negotiation, informed by internal legal opinion"
          },
          {
            "text": "Negotiate transaction terms including valuation, adjustment principles, completion mechanisms, and payment terms"
          },
          {
            "text": "Ensure price, adjustments and effective transfer date are agreed"
          },
          {
            "text": "Coordinate and confirm the signing sequence between Absa, the buyer and other parties"
          },
          {
            "text": "Document employee transfer, retention, severance, and knowledge-transfer obligations"
          },
          {
            "text": "Set out which items will transfer from Absa to the buyer automatically under agreed regulatory processes (e.g., Section 54), and which will have to be manually transferred"
          },
          {
            "text": "Detail novation processes for items not automatically transferring, whether independent legal opinions on contracts are required, and where liability sits during transfer"
          },
          {
            "text": "Set out the joint governance mechanisms across buyer and seller at a high level (e.g., the scheduling of joint Steering Committees, appointment of Transaction Directors from each party)"
          },
          {
            "text": "Set out joint escalation mechanisms for programme-level issues, as well as dispute resolution mechanisms"
          },
          {
            "text": "Set out stipulations and timings for the sharing of client data, including whether business cases are required, and what can and can't be shared ahead of regulatory approval"
          },
          {
            "text": "Set out conditions precedent for completion, including funds transfer, assets/liabilities transfer, regulatory approval, and board approval"
          },
          {
            "text": "Agree signatures required on each side"
          },
          {
            "text": "Set out completion date precedent on regulatory approval date(s), rather than a pre-agreed specific date"
          },
          {
            "text": "Set out a joint communications plan to clients from both buyer and seller, including timelines for when buyer can engage the clients"
          },
          {
            "text": "Place clear obligations on the buyer for regulatory approvals, onboarding and operational readiness"
          },
          {
            "text": "Define how incomplete transfers or rejected clients will be treated"
          }
        ],
        "conditional": [
          {
            "text": "Detail exact employees (anonymized) to be transferred"
          },
          {
            "text": "Detail seller hiring/redundancy stipulations whilst completion is in progress (e.g. maximum salary to be hired, redundancy processes)"
          },
          {
            "text": "Detail technology maintenance requirements of Absa, and stipulations on major changes"
          },
          {
            "text": "Detail FX payment mechanisms, including adjustments for FX risk and longer settlement times"
          },
          {
            "text": "Define ownership and licensing of shared Intellectual Property"
          },
          {
            "text": "Establish TSAs, service levels, pricing, liabilities, and exit dates"
          },
          {
            "text": "Access to this early stage of the lifecycle may not always be possible given the broader business context, but it should be requested given its importance to execution"
          }
        ],
        "optional": [
          {
            "text": "Set SPA change control mechanisms"
          },
          {
            "text": "Set up SPA access mechanisms for project team members"
          },
          {
            "text": "Socialise with functional leads ahead of signature"
          }
        ],
        "nuances": [
          {
            "text": "S197 or equivalent should be attached to the SPA as an addendum"
          },
          {
            "text": "Any joint technology agreements should be attached as addenda"
          }
        ],
        "artefacts": [
          {
            "text": "DD summary and agreed deal decisions (Absa deal specific)"
          },
          {
            "text": "M&A lessons learnt (Absa transaction specific)"
          }
        ],
        "templates": [
          {
            "text": "NDA template"
          }
        ]
      },
      {
        "id": "mobilisation-planning",
        "index": "03",
        "title": "Mobilisation & Planning",
        "purpose": "Define the key activities which must take place to enable LD1 to take place on the agreed date, and surface dependencies",
        "role": [
          {
            "text": "Inorganic Change team should lead the mobilisation effort across Absa: briefing functional leads / AEs, onboarding teams, executing the NDA process, creating onboarding materials, briefing teams on detailed plan creation, and supporting the buyer to lead joint planning efforts"
          }
        ],
        "timeline": "8 - 10 weeks",
        "timelineDrivers": [
          {
            "text": "Deal complexity (complex deals need more workstreams to execute)"
          },
          {
            "text": "Geographical scope (multiple geographies require more coordination)"
          },
          {
            "text": "Existing knowledge (teams familiar with these deals can draft a detailed plan much faster, and understand dependencies)"
          },
          {
            "text": "Available resource (resource constraints mean activities take longer)"
          },
          {
            "text": "Buyer capabilities (joint planning is reliant on the buyer's more detailed plan being ready for discussion)"
          }
        ],
        "necessary": [
          {
            "text": "Set up mobilisation hierarchy:",
            "subs": [
              "Board appoints executive sponsor for the deal",
              "Executive sponsor appoints Transaction Director",
              "Transaction Director and Executive Sponsor agree Accountable Executives for each function / workstream",
              "AE selection should be informed by their expected responsibilities, detailed in the Hub and Spoke Operating Model",
              "AEs appoint functional workstream leads, who appoint in-country leads",
              "Transaction Director mobilises central Inorganic Change team and in-country coordinators",
              "Buyer and Seller Inorganic Change teams share lists of functional leads to enable joint planning",
              "Joint and individual governance established based on Mobilisation Toolkit"
            ]
          },
          {
            "text": "Each asset, process, capability, should be classified as either:",
            "subs": [
              "Transfer",
              "Retain",
              "Duplicate",
              "Terminate",
              "Replace",
              "Provide temporarily through a TSA"
            ]
          },
          {
            "text": "Set up a Separation Management Office run by the Inorganic Change Team to lead the separation from Absa's side"
          },
          {
            "text": "Define key workstreams required based on the deal-archetype and SPA specifics, including rough size of each workstream"
          },
          {
            "text": "Define workstream charters per workstream, setting out objective, purpose, success metrics, key personnel, skills, and ownership"
          },
          {
            "text": "Jointly carry out workstream blueprints across buyer and seller, laying out each business process related to the workstream, which the seller will stop, which the buyer will start, and which will carry on as is"
          },
          {
            "text": "Define key milestones required to enable these process and achieve a seamless cutover at Legal Day 1 (LD1), with clear separation of buyer owned, seller owned, and jointly owned milestones"
          },
          {
            "text": "Support each workstream to define a detailed, L2 plan below this to enable the meeting of these milestones"
          },
          {
            "text": "Hold joint workshops across buyer and seller to discuss and agree on these milestones"
          },
          {
            "text": "Identify milestones with key dependencies across workstreams, and document these dependencies in detail"
          },
          {
            "text": "Define a stranded cost remediation plan"
          },
          {
            "text": "Set up a buyer-obligation and dependency tracker to ensure buyer is held accountable for conditions precedent"
          },
          {
            "text": "Identify the critical path, and dates/factors will have a material impact on completion, and which of these can be controlled (e.g., regulatory approval or bank-wide change freezes cannot be controlled, client onboarding must take place ahead of LD1 but non-BAU processes can speed up timelines, data migration solution build and test is critical to LD1 success, etc)"
          },
          {
            "text": "Translate the milestones into an overarching project plan to be tracked weekly"
          },
          {
            "text": "Agree initial LD1 readiness criteria per workstream with the buyer, and track these outcomes (key performance indicators which will enable cutover, e.g., for HR, 100% of consultations complete)"
          },
          {
            "text": "Agree on internal governance cadence which will sync with joint governance laid out in the SPA, including:",
            "subs": [
              "Internal and joint Inorganic Change meetings weekly / bi-weekly to align on priorities and joint risks/issues",
              "Working group / workstream led sessions to discuss key risks, issues, and progress",
              "Internal Steering Committee sessions to escalate Absa-specific risks and issues, and receive guidance on key decisions",
              "Joint Steering Committee sessions to discuss joint risks and issues, and coordinate cross-party solutions"
            ]
          },
          {
            "text": "Translate DD findings and governance structures into onboarding materials which clearly articulate the purpose and objectives of the deal, how execution will run day to day, roles and responsibilities, and escalation pathways"
          }
        ],
        "conditional": [
          {
            "text": "Submit a version of the programme plan to the regulator alongside the request for approval"
          },
          {
            "text": "Create a detailed workstream plan for employee / tech transfer"
          },
          {
            "text": "Define a TSA service catalogue and exit plan"
          },
          {
            "text": "Set up TSA exit team and define timeline for complete TSA exit"
          }
        ],
        "optional": [
          {
            "text": "Translate the project plan into project management software (e.g., Jira, MSP)"
          },
          {
            "text": "Link governance into bank-level governance such as Board meetings, StratCos, etc"
          }
        ],
        "nuances": [
          {
            "text": "Sold components cannot operate independently, so missing capabilities must be stood up by the buyer by Day 1"
          },
          {
            "text": "Different components may require different transfer or implementation dates"
          },
          {
            "text": "Multiple regulators may have to be engaged if multiple elements of the business are transferring (e.g., FSCA for client experience considerations, PA for prudence/capital considerations)"
          }
        ],
        "artefacts": [
          {
            "text": "TSA agreements (Absa transaction specific)"
          },
          {
            "text": "Regulatory commitments and approval timelines (Absa transaction specific)"
          },
          {
            "text": "Previous transaction playbooks with lessons learned (Absa transaction specific)"
          },
          {
            "text": "Hub & Spoke operating model"
          },
          {
            "text": "Mobilisation toolkit"
          }
        ],
        "templates": [
          {
            "text": "Workstream blueprints"
          },
          {
            "text": "High-level transaction plan template"
          },
          {
            "text": "Detail excel project plan"
          },
          {
            "text": "Governance forums Terms of Reference"
          },
          {
            "text": "TSA service catalogue"
          },
          {
            "text": "Buyer obligations tracker"
          }
        ]
      },
      {
        "id": "programme-execution",
        "index": "04",
        "title": "Programme Execution",
        "purpose": "Execute on agreed milestones, run governance cadence, and extract required business for transfer.",
        "role": [
          {
            "text": "Inorganic Change Team acts as the central hub in the execution phase, driving workstream level execution, tracking RAID items, defining SteerCo material, and holding those responsible for separation accountable, whilst ensuring the buyer is making significant progress"
          }
        ],
        "timeline": "12 – 18 months",
        "timelineDrivers": [
          {
            "text": "Regulatory approval timelines"
          },
          {
            "text": "Deal perimeter and scope"
          },
          {
            "text": "New product build (additional product build by the buyer requires more delivery time)"
          },
          {
            "text": "Data complexity (Complex structures require a more nuanced data migration solution)"
          },
          {
            "text": "TSA service plan (High number of TSAs can lead to faster initial completion, with work backloaded into TSA execution and exit)"
          }
        ],
        "necessary": [
          {
            "text": "Conduct programme management activities: run governance processes including workstream sessions, Exec SteerCos, and Joint Buyer/Seller SteerCos; set up and track risks and issues in a central RAID log, and escalate to SteerCo as appropriate"
          },
          {
            "text": "Extract and segregate the transferring client and business data from the rest of the Absa estate"
          },
          {
            "text": "Separate applications, infrastructure, access rights and interfaces which will remain in the retained business"
          },
          {
            "text": "Separate financial reporting, ledger, controls, and regulatory reporting from the retained business"
          },
          {
            "text": "Ensure buyer access to retained business information is removed or limited"
          },
          {
            "text": "Ensure the divested business' value is maintained ahead of LD1, to avoid complications in completion and valuation"
          },
          {
            "text": "Remediate stranded costs within the retained organisation"
          },
          {
            "text": "Track buyer obligations, flag issues, and escalate to Joint SteerCo as appropriate"
          },
          {
            "text": "Novate, assign or replicate contracts which will be transferring to the buyer"
          },
          {
            "text": "Provide regular updates to the Board and Bank Leadership Forums on progress against plan, key risks and issues, and LD1 viability"
          },
          {
            "text": "Engage the regulator regularly to update progress and assess approval timelines"
          },
          {
            "text": "Conduct contingency and scenario planning for if approvals arrive later than anticipated, and define final possible date for receipt before LD1 must move"
          },
          {
            "text": "Build out detailed client communication plan across buyer and seller, and keep clients updated on the progress of the programme, and when they can expect to be onboarded"
          },
          {
            "text": "Share a data dictionary detailing data structures across source systems for the buyer to consume"
          },
          {
            "text": "Support the buyer with source-to-target mapping across all systems to enable the build of core data migration solution"
          },
          {
            "text": "Support the build of the data migration solution to Extract, Transform, and Load (ETL) solution across all source systems into target systems"
          },
          {
            "text": "Ensure the data migration solution is tested using dummy data aligned to the data dictionary, or where possible, real client data"
          },
          {
            "text": "Agree with the buyer what data can be transferred ahead of LD1, accounting for regulatory and data-privacy conditions"
          },
          {
            "text": "Define success criteria across all workstreams, and continually measure progress against these"
          },
          {
            "text": "Provide the buyer with regularly updated financials to track the progress of the divested business"
          },
          {
            "text": "Set up a Clean Room for the buyer to conduct KYC/AML checks, which should be entirely 'airgapped'"
          },
          {
            "text": "If TSAs are in place, monitor service delivery and exit planning"
          },
          {
            "text": "Ensure joint technology specifications with the buyer defined (e.g., Joint Application Development (JAD) documentation, API documentation, technical requirements, business requirements)"
          },
          {
            "text": "Agree and execute a joint technology build governance structure to drive joint progress"
          },
          {
            "text": "Ensure transferring employee packages defined and socialised through consultations"
          }
        ],
        "conditional": [],
        "optional": [
          {
            "text": "Conduct change management activities for project execution teams to drive continued buy-in and morale (e.g., team socials, rewards, etc)"
          }
        ],
        "nuances": [
          {
            "text": "Employee consultations and reward package design"
          },
          {
            "text": "Technology workstream includes activity on transferring seller technology into buyer systems"
          },
          {
            "text": "Buyer execution must align with seller carve-out plans"
          }
        ],
        "artefacts": [
          {
            "text": "Detail project plan built out from mobilisation and planning stage (Absa transaction specific)",
            "subs": [
              "With associated excel programme plan"
            ]
          },
          {
            "text": "Previous project playbooks with lessons learnt (Absa transaction specific)"
          },
          {
            "text": "Hub & Spoke operating model"
          },
          {
            "text": "Mobilisation toolkit"
          }
        ],
        "templates": [
          {
            "text": "Workstream status report template"
          },
          {
            "text": "Joint buyer and seller status report template"
          },
          {
            "text": "Programme RAID log template with added SteerCo escalation if necessary"
          },
          {
            "text": "TSA service catalogue"
          }
        ]
      },
      {
        "id": "business-testing",
        "index": "05",
        "title": "Business Testing",
        "purpose": "Check that the buyer can operate the new business, and that Absa can continue to operate after the transfer",
        "role": [
          {
            "text": "Inorganic Change Team role is to coordinate and govern testing across business and technology teams, not to perform testing itself."
          }
        ],
        "timeline": "1 – 3 months (concurrent with execution, post-build)",
        "timelineDrivers": [
          {
            "text": "Scale of business process change"
          },
          {
            "text": "Testing expertise in-house (testing SMEs within each team means scripts require less review and testing can happen faster)"
          },
          {
            "text": "Capacity within teams to accommodate testing (needs to be balanced with BAU, build, other deal-related work)"
          },
          {
            "text": "Complexity of process change (complex new systems or products require significant testing)"
          },
          {
            "text": "Downstream systems (impact of changes on multiple downstream systems requires more extensive end-to-end testing)"
          }
        ],
        "necessary": [
          {
            "text": "Ensure the buyer has detailed all business process changes occurring as part of the deal to be included in testing"
          },
          {
            "text": "Detail any business or technology changes impacting the retained business on Absa's side"
          },
          {
            "text": "Work with technology teams to understand the requirements for testing environments, including end-to-end environments"
          },
          {
            "text": "Ensure retained business regression test scripts are created which ensure:",
            "subs": [
              "No unauthorised data is transferred",
              "Transferring balances, records, and populations reconcile",
              "Retained applications and interfaces continue functioning",
              "TSA processes and service levels work as designed",
              "Regulatory and fin-crime reporting remains working as expected"
            ]
          },
          {
            "text": "Book these environments well in advance, or flag if suitable environments do not yet exist and must be built"
          },
          {
            "text": "Set up an independent testing team to liaise with business and technology to drive test script creation and sign off"
          },
          {
            "text": "Designate a testing lead within each workstream responsible for coordinating and executing tests assigned to them"
          },
          {
            "text": "Drive execution of test scripts by the business, with oversight from the testing team"
          },
          {
            "text": "Once individual processes are validated, test every process end-to-end, including the feed into downstream systems like AML, finance, and HR systems"
          },
          {
            "text": "Set up a testing-specific defect log to track issues to closure"
          },
          {
            "text": "Re-test issues post closure end-to-end, to ensure the fix has not created additional issues"
          },
          {
            "text": "Secure executive and business sign off on testing closure, with any open items clearly detailed"
          }
        ],
        "conditional": [
          {
            "text": "Support the buyer to test the flow of data into and out of HR systems such as Workday"
          },
          {
            "text": "Test that only data in the scope of the deal is coming across, and data related to products outside of the perimeter is filtered out"
          },
          {
            "text": "Support the buyer to test that any new systems stood up can receive data as expected"
          },
          {
            "text": "Test that systems transferring to the buyer can migrate as expected, with no disruption in service to either buyer or Absa"
          }
        ],
        "optional": [
          {
            "text": "Conduct Production Validation Testing to check that new functionality works in production as well as in test environments"
          },
          {
            "text": "Set up testing-specific governance, and feed into programme governance"
          },
          {
            "text": "Conduct friendly client testing to ensure that end-to-end flows work in a real world scenario"
          }
        ],
        "nuances": [
          {
            "text": "Testing may include data flow into and out of HR systems"
          },
          {
            "text": "End-to-end testing may include flows back into Absa systems which will transfer to the buyer"
          }
        ],
        "artefacts": [
          {
            "text": "Previous business testing programmes with lessons learnt, including a scenario-based risk mitigation plan (Absa transaction specific)"
          },
          {
            "text": "Business testing process flows and customer journeys (Absa transaction specific)"
          }
        ],
        "templates": [
          {
            "text": "Detailed business testing plan template"
          }
        ]
      },
      {
        "id": "client-onboarding-ld1-readiness",
        "index": "06",
        "title": "Client Onboarding & LD1 Readiness",
        "purpose": "Ensure new clients are onboarded to buyer systems, communicate requirements and functionality with clients, and set up an orderly transfer to the buyer",
        "role": [
          {
            "text": "Oversee the standing up of an LD1 Readiness stream, and tracking both Absa and buyer progress and risks as part of programme management to assess critical risks to LD1"
          }
        ],
        "timeline": "1 – 2 months (concurrent to execution, alongside buyer)",
        "timelineDrivers": [
          {
            "text": "Scale of client transfer (more clients require additional communications alongside the buyer and more information transfer)"
          },
          {
            "text": "Complexity of client product mix (complex products and multi-product portfolios increase time to onboard and offboard)"
          },
          {
            "text": "Availability of client data (high-quality client contact data removes time spent sourcing it internally)"
          },
          {
            "text": "Client responsiveness (heavily reliant on clients responding to outreach and providing documentation)"
          }
        ],
        "necessary": [
          {
            "text": "Ensure the buyer has defined a 'drop-dead date' for when onboarding must begin to meet LD1"
          },
          {
            "text": "Ensure the buyer has detailed all client documentation required to enable onboarding, and perform a gap analysis to understand which Absa can supply, and which the buyer must source from clients directly"
          },
          {
            "text": "Determine which clients require notification, consent or contractual novation"
          },
          {
            "text": "Share client contact details are with the buyer as early as possible, and track client outreach"
          },
          {
            "text": "Allocate responsibility for each client interaction between seller and buyer"
          },
          {
            "text": "Share Absa risk profiles of clients, to enable the buyer to understand which clients are high risk, and which some documentation can be obtained post-LD1"
          },
          {
            "text": "Track client consents, objections, attrition and transfer exceptions, and offboard clients who cannot or will not transfer (due to buyer risk appetite, client attrition, etc)"
          },
          {
            "text": "Agree servicing arrangements for clients pending transfer, and monitor conduct and reputational risks from client communications"
          },
          {
            "text": "Share existing required KYC / AML documentation across transferring clients"
          },
          {
            "text": "Support the buyer in setting up client accounts, profiles, products, permissions, and mandates ahead of time to enable Dress Rehearsals and testing"
          },
          {
            "text": "Define Absa's role in the Hypercare model for post go-live, and how much support the buyer requires from Absa experts"
          },
          {
            "text": "Track client onboarding into buyer systems"
          }
        ],
        "conditional": [
          {
            "text": "Ensure transferring employees are being trained by the buyer as required"
          },
          {
            "text": "Prepare client-facing employees transferring by ensuring clients have their new contact details for once they have transferred to the buyer"
          }
        ],
        "optional": [
          {
            "text": "Assess with the buyer whether some clients can be onboarded early to conduct friendly-client testing with new to bank clients"
          }
        ],
        "nuances": [
          {
            "text": "Employee training materials and sessions may also be required, especially for client facing employees required to be operational on LD1"
          }
        ],
        "artefacts": [
          {
            "text": "Client onboarding playbook (Absa transaction specific)"
          },
          {
            "text": "Client training materials (Absa transaction specific)"
          }
        ],
        "templates": []
      },
      {
        "id": "dress-rehearsals",
        "index": "07",
        "title": "Dress Rehearsals",
        "purpose": "Testing end-to-end approach to cutover in order to raise and resolve any issues which would prevent a successful separation",
        "role": [
          {
            "text": "Coordinate the logistical preparation of the DRs, support the Data Migration team in defining the runbook, support the execution of the DRs either as logistical support or by acting as Data Migration Coordinators (DMCs)."
          }
        ],
        "timeline": "8 – 12 weeks",
        "timelineDrivers": [
          {
            "text": "Time remaining post buyer build and test (if build and test finishes well ahead of LD1, more DRs can take place)"
          },
          {
            "text": "Number of Dress Rehearsals (DRs) (more DRs require a longer timeframe)"
          },
          {
            "text": "Down-time between DRs (minimum 2 weeks between DRs is recommended)"
          }
        ],
        "necessary": [
          {
            "text": "Work with the Data Migration and Technology teams to define cutover plan which details every activity down to the minute required to wind down the Absa business and ensure all relevant data and funds are transferred to the buyer, as well as making sure the retained business functions as expected"
          },
          {
            "text": "Ensure that runbook activities include provision for testing of continued regulatory and financial reporting, as well as financial reconciliation on the buyer's side"
          },
          {
            "text": "Hold runbook run-through sessions with all activity owners and back-ups to ensure everyone is clear on expectations"
          },
          {
            "text": "Define success metrics for DRs, with a clear understanding of what is acceptable in the first DR vs the final DR"
          },
          {
            "text": "Agree which data sets will be dummy / anonymised, and which will be real client data"
          },
          {
            "text": "Define roles and responsibilities across DRs and Cutover, including Data Migration Controllers running the runbook"
          },
          {
            "text": "Execute logistical support required to enable 24/7 DRs to take place such as building access, food requirements, accommodation, travel, Wi-Fi, security, facilities, and back-up plans"
          },
          {
            "text": "Define the governance processes to take place during DRs including the command centre, regular executive updates, escalation pathways, war room protocols, issue resolution processes, and contingency decision making"
          },
          {
            "text": "Collate a DR playbook summarising success criteria, logistical information, key contacts, governance processes, and timelines"
          },
          {
            "text": "Define and test rollback, contingency, and partial transfer scenarios to ensure Minimal disruption to clients in these instances"
          },
          {
            "text": "Confirm after each DR that retained data has not been transferred"
          },
          {
            "text": "Run a minimum of 4 DRs across weekends, with at least 2 weeks in between each"
          },
          {
            "text": "Each DR should execute the runbook end-to-end, and track issues which arise for remediation"
          },
          {
            "text": "Hold DR retros to note lessons learnt and iterate into subsequent DRs"
          },
          {
            "text": "Track the remediation of issues ahead of subsequent DRs"
          }
        ],
        "conditional": [
          {
            "text": "Include DR activities which simulate the physical onboarding of employees, testing access passes, system access, laptop set up, etc"
          },
          {
            "text": "Include DR activities which relate to the set up of brand new systems or migration of Absa technology into buyer environments"
          },
          {
            "text": "Include DR activities which simulate TSA activation"
          }
        ],
        "optional": [
          {
            "text": "Hold a 'Technical DR' before the true DRs take place, to test only the migration solution, and ensure this is not a blocker to future DRs"
          }
        ],
        "nuances": [
          {
            "text": "DRs may need to account for physical employee onboarding, which should be simulated as far as possible to avoid disruptions on cutover"
          }
        ],
        "artefacts": [
          {
            "text": "Approved DR strategy: this will cover DR scope, sequencing, success measures and rehearsal cadence (Absa transaction specific)"
          },
          {
            "text": "Previous DR completion records with timestamps, success measure results and lessons learnt (Absa transaction specific)"
          },
          {
            "text": "DR and cutover playbook"
          }
        ],
        "templates": [
          {
            "text": "Runbook template"
          },
          {
            "text": "DR defect template"
          },
          {
            "text": "DR checkpoint template"
          },
          {
            "text": "DR retro template"
          }
        ]
      },
      {
        "id": "go-no-go",
        "index": "08",
        "title": "Go/No-Go",
        "purpose": "Formally discuss and approve/disapprove whether all workstreams and parties are sufficiently ready to proceed with separation",
        "role": [
          {
            "text": "Drive the collation of evidence across execution, testing, and DRs to present a case for a Go/No-Go decision to the Steering Committee. Liaise with functional leads and AEs to ensure they can clearly state the recommendation of their area."
          }
        ],
        "timeline": "1- 2 weeks",
        "timelineDrivers": [
          {
            "text": "Likelihood for a no-go (no-go decisions require additional justification and discussion)"
          },
          {
            "text": "Existing evidence (if evidence has to be specially sourced and collated, timelines may increase)"
          },
          {
            "text": "SPA stipulations (some SPAs stipulate when Go/No-Go decisions must take place, and how long discussions may last)"
          }
        ],
        "necessary": [
          {
            "text": "Assess the success of DRs, and confirm that all issues from the final DR have been remediated or have clear timelines for remediation"
          },
          {
            "text": "Ensure that at least one successful end to end DR has taken place"
          },
          {
            "text": "Discuss residual risks and mitigation plans across each workstream, with each AE laying out in turn testing results, DR success, and residual risks related to their area"
          },
          {
            "text": "For each residual risk, lay out the potential risk to go-live, likelihood, and mitigation plans"
          },
          {
            "text": "Gather evidence that key conditions have been met such as:",
            "subs": [
              "Client onboarding",
              "Account set up",
              "Regulatory approval",
              "Client and contract novations / consents",
              "Data extraction and reconciliation in DRs",
              "Financial settlement success in DRs",
              "Buyer obligations as stipulated in the SPA"
            ]
          },
          {
            "text": "Gather all AEs / SteerCo members to formally make and document the Go/No-Go decision internally, allowing any reservations to be noted and addressed"
          },
          {
            "text": "Gather buyer and seller AEs to formally make the joint Go/No-Go decision"
          },
          {
            "text": "Formally document go/no position with the Buyer and communicate to clients, employees, and regulators"
          }
        ],
        "conditional": [
          {
            "text": "Include a Go/No-Go decision related to employee readiness, including the completion of key conditions such as consultations"
          },
          {
            "text": "Include additional regulatory requirements, such as the registration of certain employees with regulatory bodies (e.g., FAIS registration of trading employees)"
          },
          {
            "text": "Include evidence for the decision related to TSA operational readiness"
          },
          {
            "text": "Distinguish between:",
            "subs": [
              "Legal completion readiness",
              "Operational separation readiness",
              "TSA-supported Day 1 readiness"
            ]
          }
        ],
        "optional": [
          {
            "text": "Announce the decision on the local stock exchange to ensure clients / market is aware (e.g., SENS announcement)"
          },
          {
            "text": "Brief the media on the decision, with a series of prepared remarks"
          }
        ],
        "nuances": [
          {
            "text": "Go/No-Go may need to account for employee readiness, which Should be assesseded relative to those employees which are critical to the functioning of the bank on LD1"
          }
        ],
        "artefacts": [
          {
            "text": "Go/No-Go criteria (owned by Inorganic Change Team to use throughout this decision making process)"
          },
          {
            "text": "M&A Learning Academy materials on governance and decision rights"
          },
          {
            "text": "DR and cutover playbook"
          }
        ],
        "templates": [
          {
            "text": "Go/No-Go decision scorecard/paper"
          }
        ]
      },
      {
        "id": "cutover",
        "index": "09",
        "title": "Cutover",
        "purpose": "Execute the controlled separation and transfer of the agreed business perimeter while maintaining continuity across both the divested and retained businesses",
        "role": [
          {
            "text": "Coordinate the logistical preparation of the cutover, based upon successful DR. Support the execution of the cutover"
          },
          {
            "text": "Run the central control function, coordinating Absa activities and linking in with the buyer, and overseeing workstream execution against approved runbook."
          },
          {
            "text": "Coordinate cross-workstream dependencies and stakeholder communications through the cutover timeline."
          }
        ],
        "timeline": "24 to 72 hours",
        "timelineDrivers": [
          {
            "text": "Scale of activity required over cutover"
          },
          {
            "text": "Length of individual activities (some activities may last 24 hours + depending on their nature)"
          },
          {
            "text": "Length of time the bank can shut down without impacting service (some jurisdictions have payments flowing over the weekend, others do not)"
          }
        ],
        "necessary": [
          {
            "text": "Work with Data Migration and Technology to define the final cutover plan, iterated during DRs"
          },
          {
            "text": "Freeze and extract the final transferring population ahead of cutover"
          },
          {
            "text": "Reconcile clients, balances, assets and liabilities to assess funding requirements, and execute financial settlement and completion-account activities"
          },
          {
            "text": "Ensure required legal documents are signed over cutover to formally transfer legal and operational control to the buyer"
          },
          {
            "text": "Ensure Absa system access to divested business is revoked or modified"
          },
          {
            "text": "Walk through the plan again with teams to confirm understanding, roles, and responsibilities"
          },
          {
            "text": "Sign off final cutover plan with all AEs"
          },
          {
            "text": "Coordinate contingency planning across all workstreams, gathering scenarios and planning for potential issues which may arise over the cutover"
          },
          {
            "text": "Define any additional governance to be in place during cutover vs DRs (e.g., additional executive updates, final decision gates, etc)"
          },
          {
            "text": "Execute on cutover plan, including agreed-upon governance gates"
          },
          {
            "text": "Execute on testing activities planned in the runbook to ensure all retained business systems are working as planned"
          },
          {
            "text": "Hold final checkpoint to assess success of the cutover, ensure retained systems continue to function, and assess Absa support required in mitigation plans for issues"
          },
          {
            "text": "Continue to communicate with the buyer once they open post-cutover to assess issues and provide support where needed"
          },
          {
            "text": "Communicate with clients on the success of the cutover, and remind them of new channels into the buyer"
          }
        ],
        "conditional": [
          {
            "text": "Execute on the employee onboarding cutover plan, ensuring new employees have necessary system and building access on LD1"
          },
          {
            "text": "Communicate any residual issues to clients which remain post-cutover, and detail timelines for remediation"
          },
          {
            "text": "Activate buyer access and TSA services"
          }
        ],
        "optional": [
          {
            "text": "Brief the media on a successful cutover, with pre-prepared executive remarks"
          },
          {
            "text": "Issue an announcement on the stock exchange regarding the successful cutover"
          }
        ],
        "nuances": [
          {
            "text": "Cutover of employees including data and official employment status may also have to take place, with onboarding onto buyer systems"
          }
        ],
        "artefacts": [
          {
            "text": "Approved cutover runbook, including a time-sequenced plan: activities, owners, dependencies, control gates, and completion criteria (Absa transaction specific)"
          },
          {
            "text": "Hub & Spoke Operating Model"
          },
          {
            "text": "DR and cutover playbook"
          }
        ],
        "templates": [
          {
            "text": "Cutover checkpoint template"
          }
        ]
      },
      {
        "id": "hypercare",
        "index": "10",
        "title": "Hypercare",
        "purpose": "Stabilise the retained business, ensure TSAs are active as required, resolve any residual issues from cutover, and support buyer Hypercare.",
        "role": [
          {
            "text": "Monitor a consolidated view of incidents post cutover, and monitor the Hypercare team's triage and remediation efforts"
          },
          {
            "text": "Support the Hypercare team in escalating issues through agreed governance in order to prevent any financial, regulatory or client harm"
          },
          {
            "text": "Assess readiness to exit Hypercare using an agreed checklist and criteria, coordinating a formal handover to BAU"
          },
          {
            "text": "Lead regular updates to executives on tracking of strategic and financial outcomes"
          }
        ],
        "timeline": "1 – 2 months",
        "timelineDrivers": [
          {
            "text": "Number of clients transferring (additional clients means Additional time required to triage and resolve issues)"
          },
          {
            "text": "Capacity within Hypercare team (smaller team takes longer to resolve issues)"
          },
          {
            "text": "Complexity of transfer (a transfer of complex clients with complex products likely requires more dedicated service time)"
          },
          {
            "text": "Success of cutover (issues on cutover mean an extended Hypercare period will likely be needed to stabilise clients and resolve issues)"
          }
        ],
        "necessary": [
          {
            "text": "Set up a dedicated team to monitor residual cutover issues, retained business issues, and any post-cutover data corrections or additions required"
          },
          {
            "text": "Triage issues for remediation, add them to a backlog, and flag with technology / BAU teams as required"
          },
          {
            "text": "Escalate persistent or P1 issues immediately, through a dedicated escalation pathway"
          },
          {
            "text": "Stand up and coordinate war-rooms as necessary to remediate P1 issues quickly and avoid disruption"
          },
          {
            "text": "Set up dedicated client communications teams to ensure retained clients remain in the loop post LD1"
          },
          {
            "text": "Gradually hand off servicing to BAU teams by transitioning issue resolution and triage into the BAU process, prioritising only the most serious issues for Hypercare as time passes"
          },
          {
            "text": "Track divestment objectives such as cost, asset/liability transfer, volumes, etc. as soon as LD1, and provide updates to executives on progress against objectives"
          },
          {
            "text": "Hold daily touchpoints with AEs to flag the most important issues and discuss remediation plans"
          },
          {
            "text": "Hold regular touchpoints with client-facing teams to discuss client sentiment and assess action plans"
          }
        ],
        "conditional": [
          {
            "text": "Support the buyer's Hypercare for systems which have transitioned from Absa to buyer"
          },
          {
            "text": "Monitor TSA performance, track progress towards exit, and remove remaining entanglements"
          },
          {
            "text": "Complete financial true-ups and track stranded cost removal"
          },
          {
            "text": "Resolve any transfer exceptions or data inaccuracies"
          },
          {
            "text": "Monitor warranties, indemnities, and potential claims"
          },
          {
            "text": "Confirm buyer deletion or return of Absa data"
          }
        ],
        "optional": [
          {
            "text": "Reach out to clients directly to assess sentiment"
          }
        ],
        "nuances": [
          {
            "text": "Absa knowledge may be required to support buyer Hypercare for transferred systems/technologies"
          }
        ],
        "artefacts": [
          {
            "text": "Transferred portfolio of clients (Absa transaction specific)"
          },
          {
            "text": "Hub & Spoke operating model"
          },
          {
            "text": "M&A Learning Pathways"
          }
        ],
        "templates": [
          {
            "text": "Hypercare RAID Log"
          },
          {
            "text": "Daily Hypercare status report template"
          },
          {
            "text": "TSA service dashboard and exit plan"
          }
        ]
      }
    ]
  },
  {
    "archetypeId": "full-business-divestment",
    "archetypeName": "Full-business divestment",
    "variantLabel": "Variant A · Buyer integrates the business",
    "sourceTitle": "Full Business Sale A (Buyer integrates the business)",
    "stages": [
      {
        "id": "due-diligence",
        "index": "01",
        "title": "Due Diligence",
        "purpose": "Determine whether the acquisition creates value, what you are actually buying, and what needs to be protected contractually. Legal & CorpDev lead; other areas input where required. Activities below relate to key items for the integration team to consider during this process, they do not override current DD processes",
        "role": [
          {
            "text": "Extract information from the DD process necessary to properly plan and run the divestment"
          },
          {
            "text": "Act as M&A SMEs to provide oversight, bringing a practical, Absa oriented lens which goes beyond financials and ensures nuances are identified and caught based on previous experience"
          }
        ],
        "timeline": "1 – 3 months",
        "timelineDrivers": [
          {
            "text": "Product complexity (more complex products are harder for a seller to model and project)"
          },
          {
            "text": "Maturity of DD teams (experienced teams can pre-empt buyer questions and data requests ahead of time)"
          },
          {
            "text": "Buyer availability (heavily reliant on buyer capacity to review and assess materials)"
          }
        ],
        "necessary": [
          {
            "text": "Ensure virtual data room set up to share confidential documentation and ensure it persists after deal signature"
          },
          {
            "text": "Ensure an NDA process to wall-cross those who need access to confidential information is set up"
          },
          {
            "text": "Ensure buyer has the requisite information access controls set up to protect Absa confidential information"
          },
          {
            "text": "Ensure potential leakage of confidential, client or retained-business information is assessed"
          },
          {
            "text": "Build an initial view of project divestment costs, leveraging comparable deals, including TSA costs and retained-business remediation costs. All assumptions in planning costs must be defensible and informed by functional experts"
          },
          {
            "text": "Build or oversee build of a detailed business case comparing forecasted benefits of divestment to project costs and continued running costs"
          },
          {
            "text": "Ensure services the divested business currently receives from Absa are identified"
          },
          {
            "text": "Ensure subject matter experts are engaged to conduct cyber, technology, security, compliance DD to ensure that a deep understanding of these elements is gained during DD, to inform accurate planning"
          },
          {
            "text": "Ensure tax implications have been assessed and remediation planned"
          },
          {
            "text": "Ensure that cost implication of the people movement has been assessed, and agree whether severance costs will be incurred"
          },
          {
            "text": "Ensure total cost of ownership of transferring technology has been understood and identify potential cost savings"
          },
          {
            "text": "Ensure the complete legal entity, subsidiary and branch structure is understood"
          },
          {
            "text": "Ensure ownership of assets, intellectual property and licences is reviewed"
          },
          {
            "text": "Ensure assessment of seller-group dependencies which must be terminated, replaced or covered by TSAs has taken place"
          }
        ],
        "conditional": [
          {
            "text": "Ensure that the value of intangible assets is also considered and assessed, and that this informs the sale price"
          },
          {
            "text": "Access to this early stage of the lifecycle may not always be possible given the broader business context, but it should be requested given its importance to execution"
          }
        ],
        "optional": [
          {
            "text": "Review lessons learnt from previous deals"
          },
          {
            "text": "Engage a subset of buyer clients to assess current pain points and identify any potential deal red flags (e.g. compliance issues, pricing mismatches, in-scope technology issues)"
          }
        ],
        "nuances": [
          {
            "text": "DD must account for business line impact inherent in selling all of the business (e.g., capital, funding, and liquidity impact on Absa group)"
          }
        ],
        "artefacts": [
          {
            "text": "Previous transaction materials and lessons learnt (Absa transaction specific)"
          },
          {
            "text": "Business case (Absa transaction specific)"
          }
        ],
        "templates": []
      },
      {
        "id": "legal-drafting-signature",
        "index": "02",
        "title": "Legal Drafting & Signature",
        "purpose": "Ensure the Sale and Purchase Agreement (SPA) reflects reality of programme delivery, and enables execution. Legal & CorpDev lead, other areas input where required. Activities below relate to key integration considerations, they do not overwrite the current processes.",
        "role": [
          {
            "text": "Ensure legals reflect execution reality, and timelines are realistic"
          },
          {
            "text": "Ensure legals include provisions which will support execution, such as data sharing"
          },
          {
            "text": "Ensure any go-live dates are based on realistic assumptions around regulatory approval and client onboarding timelines"
          },
          {
            "text": "Leverage lessons learned from previous deals to ensure legals address any historic pain points"
          }
        ],
        "timeline": "1 – 2 months",
        "timelineDrivers": [
          {
            "text": "Deal complexity (complex deals require additional protections and conditions)"
          },
          {
            "text": "Technology ownership (addenda may be required to stipulate technology requirements)"
          },
          {
            "text": "Pre-signing alignment (pre-agreed valuations and completion mechanisms will speed up drafting)"
          },
          {
            "text": "DD quality (high quality DD will allow defensible assumptions to be made in the legals, otherwise these will have to be assessed during this phase)"
          },
          {
            "text": "Regulatory complexity (multiple regulators across multiple jurisdictions increases complexity in drafting legals)"
          },
          {
            "text": "TSA requirements (complex and numerous TSA requirements will increase the complexity of resulting legals)"
          }
        ],
        "necessary": [
          {
            "text": "Engage external lawyers to lead SPA drafting and negotiation, informed by internal legal opinion"
          },
          {
            "text": "Negotiate transaction terms including valuation, adjustment principles, completion mechanisms, and payment terms"
          },
          {
            "text": "Ensure price, adjustments and effective transfer date are agreed"
          },
          {
            "text": "Coordinate and confirm the signing sequence between Absa, the buyer and other parties"
          },
          {
            "text": "Set out which items will transfer from Absa to the buyer automatically under agreed regulatory processes (e.g., Section 54), and which will have to be manually transferred"
          },
          {
            "text": "Detail novation processes for items not automatically transferring, whether independent legal opinions on contracts are required, and where liability sits during transfer"
          },
          {
            "text": "Set out the joint governance mechanisms across buyer and seller at a high level (e.g., the scheduling of joint Steering Committees, appointment of Transaction Directors from each party)"
          },
          {
            "text": "Set out joint escalation mechanisms for programme-level issues, as well as dispute resolution mechanisms"
          },
          {
            "text": "Set out stipulations and timings for the sharing of client data, including whether business cases are required, and what can and can't be shared ahead of regulatory approval"
          },
          {
            "text": "Set out conditions precedent for completion, including funds transfer, assets/liabilities transfer, regulatory approval, and board approval"
          },
          {
            "text": "Agree signatures required on each side"
          },
          {
            "text": "Set out completion date precedent on regulatory approval date(s), rather than a pre-agreed specific date"
          },
          {
            "text": "Set out a joint communications plan to clients from both buyer and seller, including timelines for when buyer can engage the clients"
          },
          {
            "text": "Place clear obligations on the buyer for regulatory approvals, onboarding and operational readiness"
          },
          {
            "text": "Set out transfer of shares and legal title, and regulatory change of control requirements"
          },
          {
            "text": "Detail technology maintenance requirements of Absa, and stipulations on major changes"
          }
        ],
        "conditional": [
          {
            "text": "Detail seller hiring/redundancy stipulations whilst completion is in progress (e.g. maximum salary to be hired, redundancy processes)"
          },
          {
            "text": "Detail FX payment mechanisms, including adjustments for FX risk and longer settlement times"
          },
          {
            "text": "Define ownership and licensing of shared Intellectual Property"
          },
          {
            "text": "Establish TSAs, service levels, pricing, liabilities, and exit dates"
          },
          {
            "text": "Access to this early stage of the lifecycle may not always be possible given the broader business context, but it should be requested given its importance to execution"
          }
        ],
        "optional": [
          {
            "text": "Set SPA change control mechanisms"
          },
          {
            "text": "Set up SPA access mechanisms for project team members"
          },
          {
            "text": "Socialise with functional leads ahead of signature"
          }
        ],
        "nuances": [
          {
            "text": "SPA is likely to be a Share Purchase Agreement, given the full divestment of a legal entity"
          },
          {
            "text": "Regulatory approval is focused on change of control of licences, as well as competition approval"
          }
        ],
        "artefacts": [
          {
            "text": "DD summary and agreed deal decisions (Absa deal specific)"
          },
          {
            "text": "M&A lessons learnt (Absa transaction specific)"
          }
        ],
        "templates": [
          {
            "text": "NDA template"
          }
        ]
      },
      {
        "id": "mobilisation-planning",
        "index": "03",
        "title": "Mobilisation & Planning",
        "purpose": "Define the key activities which must take place to enable LD1 to take place on the agreed date, and surface dependencies",
        "role": [
          {
            "text": "Inorganic Change team should lead the mobilisation effort across Absa: briefing functional leads / AEs, onboarding teams, executing the NDA process, creating onboarding materials, briefing teams on detailed plan creation, and supporting the buyer to lead joint planning efforts"
          }
        ],
        "timeline": "10 - 12 weeks",
        "timelineDrivers": [
          {
            "text": "Deal complexity (complex deals need more workstreams to execute)"
          },
          {
            "text": "Geographical scope (multiple geographies require more coordination)"
          },
          {
            "text": "Existing knowledge (teams familiar with these deals can draft a detailed plan much faster, and understand dependencies)"
          },
          {
            "text": "Available resource (resource constraints mean activities take longer)"
          },
          {
            "text": "Buyer capabilities (joint planning is reliant on the buyer's more detailed plan being ready for discussion)"
          }
        ],
        "necessary": [
          {
            "text": "Set up mobilisation hierarchy:",
            "subs": [
              "Board appoints executive sponsor for the deal",
              "Executive sponsor appoints Transaction Director",
              "Transaction Director and Executive Sponsor agree Accountable Executives for each function / workstream",
              "AE selection should be informed by their expected responsibilities, detailed in the Hub and Spoke Operating Model",
              "AEs appoint functional workstream leads, who appoint in-country leads",
              "Transaction Director mobilises central Inorganic Change team and in-country coordinators",
              "Buyer and Seller Inorganic Change teams share lists of functional leads to enable joint planning",
              "Joint and individual governance established based on Mobilisation Toolkit"
            ]
          },
          {
            "text": "Each asset, process, capability, should be classified as either:",
            "subs": [
              "Transfer",
              "Retain",
              "Duplicate",
              "Terminate",
              "Replace by the buyer",
              "Provide temporarily through a TSA"
            ]
          },
          {
            "text": "Set up a Separation Management Office run by the Inorganic Change Team to lead the separation from Absa's side"
          },
          {
            "text": "Define key workstreams required based on the deal-archetype and SPA specifics, including rough size of each workstream"
          },
          {
            "text": "Define workstream charters per workstream, setting out objective, purpose, success metrics, key personnel, skills, and ownership"
          },
          {
            "text": "Jointly carry out workstream blueprints across buyer and seller, laying out each business process related to the workstream, which the seller will stop, which the buyer will start, and which will carry on as is"
          },
          {
            "text": "Define key milestones required to enable these process and achieve a seamless cutover at Legal Day 1 (LD1), with clear separation of buyer owned, seller owned, and jointly owned milestones"
          },
          {
            "text": "Support each workstream to define a detailed, L2 plan below this to enable the meeting of these milestones"
          },
          {
            "text": "Hold joint workshops across buyer and seller to discuss and agree on these milestones"
          },
          {
            "text": "Identify milestones with key dependencies across workstreams, and document these dependencies in detail"
          },
          {
            "text": "Define a stranded cost remediation plan"
          },
          {
            "text": "Set up a buyer-obligation and dependency tracker to ensure buyer is held accountable for conditions precedent"
          },
          {
            "text": "Identify the critical path, and dates/factors will have a material impact on completion, and which of these can be controlled (e.g., regulatory approval or bank-wide change freezes cannot be controlled, client onboarding must take place ahead of LD1 but non-BAU processes can speed up timelines, data migration solution build and test is critical to LD1 success, etc)"
          },
          {
            "text": "Translate the milestones into an overarching project plan to be tracked weekly"
          },
          {
            "text": "Agree initial LD1 readiness criteria per workstream with the buyer, and track these outcomes (key performance indicators which will enable cutover, e.g., for HR, 100% of consultations complete)"
          },
          {
            "text": "Agree on internal governance cadence which will sync with joint governance laid out in the SPA, including:",
            "subs": [
              "Internal and joint Inorganic Change meetings weekly / bi-weekly to align on priorities and joint risks/issues",
              "Working group / workstream led sessions to discuss key risks, issues, and progress",
              "Internal Steering Committee sessions to escalate Absa-specific risks and issues, and receive guidance on key decisions",
              "Joint Steering Committee sessions to discuss joint risks and issues, and coordinate cross-party solutions"
            ]
          },
          {
            "text": "Translate DD findings and governance structures into onboarding materials which clearly articulate the purpose and objectives of the deal, how execution will run day to day, roles and responsibilities, and escalation pathways"
          },
          {
            "text": "Define a Day 1 control-handover plan, and Board and governance transition plan"
          },
          {
            "text": "Set up a Seller-group dependency map and an Intra-group balance and contract exit plan"
          }
        ],
        "conditional": [
          {
            "text": "Submit a version of the programme plan to the regulator alongside the request for approval"
          },
          {
            "text": "Create a detailed workstream plan for employee / tech transfer"
          },
          {
            "text": "Define a TSA service catalogue and exit plan"
          },
          {
            "text": "Set up TSA exit team and define timeline for complete TSA exit"
          }
        ],
        "optional": [
          {
            "text": "Translate the project plan into project management software (e.g., Jira, MSP)"
          },
          {
            "text": "Link governance into bank-level governance such as Board meetings, StratCos, etc"
          }
        ],
        "nuances": [
          {
            "text": "The business is being integrated, so a full, detailed programme plan is required, led by the buyer, to enable this integration"
          }
        ],
        "artefacts": [
          {
            "text": "TSA agreements (Absa transaction specific)"
          },
          {
            "text": "Regulatory commitments and approval timelines (Absa transaction specific)"
          },
          {
            "text": "Previous transaction playbooks with lessons learned (Absa transaction specific)"
          },
          {
            "text": "Hub & Spoke operating model"
          },
          {
            "text": "Mobilisation toolkit"
          }
        ],
        "templates": [
          {
            "text": "Workstream blueprints"
          },
          {
            "text": "High-level transaction plan template"
          },
          {
            "text": "Detail excel project plan"
          },
          {
            "text": "Governance forums Terms of Reference"
          },
          {
            "text": "TSA service catalogue"
          },
          {
            "text": "Buyer obligations tracker"
          }
        ]
      },
      {
        "id": "programme-execution",
        "index": "04",
        "title": "Programme Execution",
        "purpose": "Execute on agreed milestones, run governance cadence, and disentangle the entire business for transfer.",
        "role": [
          {
            "text": "Inorganic Change Team acts as the central hub in the execution phase, driving workstream level execution, tracking RAID items, defining SteerCo material, and holding those responsible for separation accountable, whilst ensuring the buyer is making significant progress"
          }
        ],
        "timeline": "18 – 24 months",
        "timelineDrivers": [
          {
            "text": "Regulatory approval timelines"
          },
          {
            "text": "Deal perimeter and scope"
          },
          {
            "text": "Data complexity (Complex structures require a more nuanced data migration solution)"
          },
          {
            "text": "TSA service plan (High number of TSAs can lead to faster initial completion, with work backloaded into TSA execution and exit)"
          }
        ],
        "necessary": [
          {
            "text": "Conduct programme management activities: run governance processes including workstream sessions, Exec SteerCos, and Joint Buyer/Seller SteerCos; set up and track risks and issues in a central RAID log, and escalate to SteerCo as appropriate"
          },
          {
            "text": "Separate financial reporting, ledger, controls, and regulatory reporting from the Absa group"
          },
          {
            "text": "Separate data, interfaces, and applications from Absa group"
          },
          {
            "text": "Ensure buyer access to retained business information is removed or limited"
          },
          {
            "text": "Ensure the divested business' value is maintained ahead of LD1, to avoid complications in completion and valuation"
          },
          {
            "text": "Remediate stranded costs within the retained organisation"
          },
          {
            "text": "Track buyer obligations, flag issues, and escalate to Joint SteerCo as appropriate"
          },
          {
            "text": "Novate, assign or replicate contracts which will be transferring to the buyer"
          },
          {
            "text": "Provide regular updates to the Board and Bank Leadership Forums on progress against plan, key risks and issues, and LD1 viability"
          },
          {
            "text": "Engage the regulator regularly to update progress and assess approval timelines"
          },
          {
            "text": "Conduct contingency and scenario planning for if approvals arrive later than anticipated, and define final possible date for receipt before LD1 must move"
          },
          {
            "text": "Build out detailed client communication plan across buyer and seller, and keep clients updated on the progress of the programme, and when they can expect to be onboarded"
          },
          {
            "text": "Share a data dictionary detailing data structures across source systems for the buyer to consume"
          },
          {
            "text": "Support the buyer with source-to-target mapping across all systems to enable the build of core data migration solution of Absa data into buyer systems to enable integration"
          },
          {
            "text": "Support the build of the data migration solution to Extract, Transform, and Load (ETL) solution across all source systems into buyer systems"
          },
          {
            "text": "Ensure the data migration solution is tested using dummy data aligned to the data dictionary, or where possible, real client data"
          },
          {
            "text": "Agree with the buyer what data can be transferred ahead of LD1, accounting for regulatory and data-privacy conditions"
          },
          {
            "text": "Define success criteria across all workstreams, and continually measure progress against these"
          },
          {
            "text": "Provide the buyer with regularly updated financials to track the progress of the divested business"
          },
          {
            "text": "Replace Absa funding, capital or liquidity support"
          },
          {
            "text": "Establish standalone financial and regulatory reporting where required"
          },
          {
            "text": "Set up a Clean Room for the buyer to conduct KYC/AML checks, which should be entirely 'airgapped'"
          },
          {
            "text": "If TSAs are in place, monitor service delivery and exit planning"
          },
          {
            "text": "Ensure joint technology specifications with the buyer defined (e.g., Joint Application Development (JAD) documentation, API documentation, technical requirements, business requirements)"
          },
          {
            "text": "Agree and execute a joint technology build governance structure to drive joint progress"
          },
          {
            "text": "Ensure transferring employee packages defined and socialised through consultations"
          }
        ],
        "conditional": [],
        "optional": [
          {
            "text": "Conduct change management activities for project execution teams to drive continued buy-in and morale (e.g., team socials, rewards, etc)"
          }
        ],
        "nuances": [
          {
            "text": "Full-scale execution activities, at a larger scale than Partial Business Sale, will need to take place to enable the buyer to fully integrate the new business"
          }
        ],
        "artefacts": [
          {
            "text": "Detail project plan built out from mobilisation and planning stage (Absa transaction specific)",
            "subs": [
              "With associated excel programme plan"
            ]
          },
          {
            "text": "Previous project playbooks with lessons learnt (Absa transaction specific)"
          },
          {
            "text": "Hub & Spoke operating model"
          },
          {
            "text": "Mobilisation toolkit"
          }
        ],
        "templates": [
          {
            "text": "Workstream status report template"
          },
          {
            "text": "Joint buyer and seller status report template"
          },
          {
            "text": "Programme RAID log template with added SteerCo escalation if necessary"
          },
          {
            "text": "TSA service catalogue"
          }
        ]
      },
      {
        "id": "business-testing",
        "index": "05",
        "title": "Business Testing",
        "purpose": "Check that the buyer can operate the integrated business, and that Absa group can continue to operate after the transfer",
        "role": [
          {
            "text": "Inorganic Change Team role is to coordinate and govern testing across business and technology teams, not to perform testing itself."
          }
        ],
        "timeline": "1 – 3 months (concurrent with execution, post-build)",
        "timelineDrivers": [
          {
            "text": "Scale of business process change"
          },
          {
            "text": "Testing expertise in-house (testing SMEs within each team means scripts require less review and testing can happen faster)"
          },
          {
            "text": "Capacity within teams to accommodate testing (needs to be balanced with BAU, build, other deal-related work)"
          },
          {
            "text": "Complexity of process change (complex new systems or products require significant testing)"
          },
          {
            "text": "Downstream systems (impact of changes on multiple downstream systems requires more extensive end-to-end testing)"
          }
        ],
        "necessary": [
          {
            "text": "Ensure the buyer has detailed all business process changes occurring as part of the deal to be included in testing"
          },
          {
            "text": "Detail any business or technology changes impacting the retained business on Absa's side"
          },
          {
            "text": "Work with technology teams to understand the requirements for testing environments, including end-to-end environments"
          },
          {
            "text": "Ensure retained business regression test scripts are created which ensure:",
            "subs": [
              "No unauthorised data is transferred",
              "Transferring balances, records, and populations reconcile",
              "Retained applications and interfaces continue functioning",
              "TSA processes and service levels work as designed",
              "Regulatory and fin-crime reporting remains working as expected"
            ]
          },
          {
            "text": "Book these environments well in advance, or flag if suitable environments do not yet exist and must be built"
          },
          {
            "text": "Set up an independent testing team to liaise with business and technology to drive test script creation and sign off"
          },
          {
            "text": "Designate a testing lead within each workstream responsible for coordinating and executing tests assigned to them"
          },
          {
            "text": "Drive execution of test scripts by the business, with oversight from the testing team"
          },
          {
            "text": "Once individual processes are validated, test every process end-to-end, including the feed into downstream systems like AML, finance, and HR systems"
          },
          {
            "text": "Set up a testing-specific defect log to track issues to closure"
          },
          {
            "text": "Re-test issues post closure end-to-end, to ensure the fix has not created additional issues"
          },
          {
            "text": "Secure executive and business sign off on testing closure, with any open items clearly detailed"
          },
          {
            "text": "Support the buyer to test the flow of data into and out of HR systems such as Workday"
          },
          {
            "text": "Support the buyer to test that any new systems stood up can receive data as expected"
          },
          {
            "text": "Test financial deconsolidation, and buyer consolidation processes"
          }
        ],
        "conditional": [
          {
            "text": "Test that systems transferring to the buyer can migrate as expected, with no disruption in service to either buyer or Absa"
          },
          {
            "text": "Test that TSAs and service levels are functioning as expected"
          }
        ],
        "optional": [
          {
            "text": "Conduct Production Validation Testing to check that new functionality works in production as well as in test environments"
          },
          {
            "text": "Set up testing-specific governance, and feed into programme governance"
          },
          {
            "text": "Conduct friendly client testing to ensure that end-to-end flows work in a real world scenario"
          }
        ],
        "nuances": [
          {
            "text": "End-to-end testing may include flows back into Absa systems which will transfer to the buyer"
          },
          {
            "text": "Testing should be buyer-led, but especially thorough given this deal type relates to the full integration of the divested bank into buyer systems"
          }
        ],
        "artefacts": [
          {
            "text": "Previous business testing programmes with lessons learnt, including a scenario-based risk mitigation plan (Absa transaction specific)"
          },
          {
            "text": "Business testing process flows and customer journeys (Absa transaction specific)"
          }
        ],
        "templates": [
          {
            "text": "Detailed business testing plan template"
          }
        ]
      },
      {
        "id": "client-continuity-ld1-readiness",
        "index": "06",
        "title": "Client Continuity & LD1 Readiness",
        "purpose": "Ensure new clients are onboarded to buyer systems, communicate requirements and functionality with clients, and set up an orderly transfer to the buyer",
        "role": [
          {
            "text": "Oversee the standing up of an LD1 Readiness stream, and tracking both Absa and buyer progress and risks as part of programme management to assess critical risks to LD1"
          }
        ],
        "timeline": "1 – 2 months (concurrent to execution, alongside buyer)",
        "timelineDrivers": [
          {
            "text": "Scale of client transfer (more clients require additional communications alongside the buyer and more information transfer)"
          },
          {
            "text": "Complexity of client product mix (complex products and multi-product portfolios increase time to onboard and offboard)"
          },
          {
            "text": "Availability of client data (high-quality client contact data removes time spent sourcing it internally)"
          },
          {
            "text": "Client responsiveness (heavily reliant on clients responding to outreach and providing documentation)"
          }
        ],
        "necessary": [
          {
            "text": "Ensure the buyer has defined a 'drop-dead date' for when onboarding must begin to meet LD1"
          },
          {
            "text": "Ensure the buyer has detailed all client documentation required to enable onboarding, and perform a gap analysis to understand which Absa can supply, and which the buyer must source from clients directly"
          },
          {
            "text": "Determine which clients require notification, consent or contractual novation"
          },
          {
            "text": "Share client contact details are with the buyer as early as possible, and track client outreach"
          },
          {
            "text": "Allocate responsibility for each client interaction between seller and buyer"
          },
          {
            "text": "Share Absa risk profiles of clients, to enable the buyer to understand which clients are high risk, and which some documentation can be obtained post-LD1"
          },
          {
            "text": "Track client consents, objections, attrition and transfer exceptions, and offboard clients who cannot or will not transfer (due to buyer risk appetite, client attrition, etc)"
          },
          {
            "text": "Agree servicing arrangements for clients pending transfer, and monitor conduct and reputational risks from client communications"
          },
          {
            "text": "Share existing required KYC / AML documentation across transferring clients"
          },
          {
            "text": "Support the buyer in setting up client accounts, profiles, products, permissions, and mandates ahead of time to enable Dress Rehearsals and testing"
          },
          {
            "text": "Define Absa's role in the Hypercare model for post go-live, and how much support the buyer requires from Absa experts"
          },
          {
            "text": "Track client onboarding into buyer systems"
          },
          {
            "text": "Identify client contracts with change-of-control provisions"
          },
          {
            "text": "Confirm how complaints and conduct issues will be handled"
          },
          {
            "text": "Monitor client attrition and reputational risk"
          },
          {
            "text": "Communicate any brand, ownership or contact changes"
          },
          {
            "text": "Ensure transferring employees are being trained by the buyer as required"
          }
        ],
        "conditional": [
          {
            "text": "Prepare client-facing employees transferring by ensuring clients have their new contact details for once they have transferred to the buyer"
          }
        ],
        "optional": [
          {
            "text": "Assess with the buyer whether some clients can be onboarded early to conduct friendly-client testing with new to bank clients"
          }
        ],
        "nuances": [
          {
            "text": "Dedicated LD1 Readiness capacity on the buyer and seller side is essential with deals of this scale and level of integration, and significant client outreach will be required from both parties"
          }
        ],
        "artefacts": [
          {
            "text": "Client onboarding playbook (Absa transaction specific)"
          },
          {
            "text": "Client training materials (Absa transaction specific)"
          }
        ],
        "templates": []
      },
      {
        "id": "dress-rehearsals",
        "index": "07",
        "title": "Dress Rehearsals",
        "purpose": "Testing end-to-end approach to cutover in order to raise and resolve any issues which would prevent a successful separation",
        "role": [
          {
            "text": "Coordinate the logistical preparation of the DRs, support the Data Migration team in defining the runbook, support the execution of the DRs either as logistical support or by acting as Data Migration Coordinators (DMCs)."
          }
        ],
        "timeline": "8 – 12 weeks",
        "timelineDrivers": [
          {
            "text": "Time remaining post buyer build and test (if build and test finishes well ahead of LD1, more DRs can take place)"
          },
          {
            "text": "Number of Dress Rehearsals (DRs) (more DRs require a longer timeframe)"
          },
          {
            "text": "Down-time between DRs (minimum 2 weeks between DRs is recommended)"
          }
        ],
        "necessary": [
          {
            "text": "Work with the Data Migration and Technology teams to define cutover plan which details every activity down to the minute required to separate the Absa business and ensure all relevant data and funds are transferred to the buyer, as well as making sure the Absa Group business functions as expected"
          },
          {
            "text": "Ensure that runbook activities include provision for testing of continued regulatory and financial reporting, as well as financial reconciliation on the buyer's side"
          },
          {
            "text": "Hold runbook run-through sessions with all activity owners and back-ups to ensure everyone is clear on expectations"
          },
          {
            "text": "Define success metrics for DRs, with a clear understanding of what is acceptable in the first DR vs the final DR"
          },
          {
            "text": "Agree which data sets will be dummy / anonymised, and which will be real client data"
          },
          {
            "text": "Define roles and responsibilities across DRs and Cutover, including Data Migration Controllers running the runbook"
          },
          {
            "text": "Execute logistical support required to enable 24/7 DRs to take place such as building access, food requirements, accommodation, travel, Wi-Fi, security, facilities, and back-up plans"
          },
          {
            "text": "Define the governance processes to take place during DRs including the command centre, regular executive updates, escalation pathways, war room protocols, issue resolution processes, and continency decision making"
          },
          {
            "text": "Collate a DR playbook summarising success criteria, logistical information, key contacts, governance processes, and timelines"
          },
          {
            "text": "Define and test rollback, contingency, and partial transfer scenarios to ensure Minimal disruption to clients in these instances"
          },
          {
            "text": "Confirm after each DR that retained data has not been transferred"
          },
          {
            "text": "Run a minimum of 4 DRs across weekends, with at least 2 weeks in between each"
          },
          {
            "text": "Each DR should execute the runbook end-to-end, and track issues which arise for remediation"
          },
          {
            "text": "Hold DR retros to note lessons learnt and iterate into subsequent DRs"
          },
          {
            "text": "Track the remediation of issues ahead of subsequent DRs"
          },
          {
            "text": "Include DR activities which simulate the physical onboarding of employees, testing access passes, system access, laptop set up, etc"
          },
          {
            "text": "Include DR activities which test legal completion, transfer of ownership, and purchase price settlement"
          },
          {
            "text": "Assess financial deconsolidation and treasury and funding transition during DRs"
          },
          {
            "text": "Assess continuity of regulatory reporting within Absa group during DRs"
          }
        ],
        "conditional": [
          {
            "text": "Include DR activities which relate to the set up of brand new systems or migration of Absa technology into buyer environments"
          },
          {
            "text": "Include DR activities which simulate TSA activation"
          }
        ],
        "optional": [
          {
            "text": "Hold a 'Technical DR' before the true DRs take place, to test only the migration solution, and ensure this is not a blocker to future DRs"
          }
        ],
        "nuances": [
          {
            "text": "DRs for this archetype should be especially thorough given the scale and complexity of full integration into the buyer"
          }
        ],
        "artefacts": [
          {
            "text": "Approved DR strategy: this will cover DR scope, sequencing, success measures and rehearsal cadence (Absa transaction specific)"
          },
          {
            "text": "Previous DR completion records with timestamps, success measure results and lessons learnt (Absa transaction specific)"
          },
          {
            "text": "DR and cutover playbook"
          }
        ],
        "templates": [
          {
            "text": "Runbook template"
          },
          {
            "text": "DR defect template"
          },
          {
            "text": "DR checkpoint template"
          },
          {
            "text": "DR retro template"
          }
        ]
      },
      {
        "id": "go-no-go",
        "index": "08",
        "title": "Go/No-Go",
        "purpose": "Formally discuss and approve/disapprove whether all workstreams and parties are sufficiently ready to proceed with separation",
        "role": [
          {
            "text": "Drive the collation of evidence across execution, testing, and DRs to present a case for a Go/No-Go decision to the Steering Committee. Liaise with functional leads and AEs to ensure they can clearly state the recommendation of their area."
          }
        ],
        "timeline": "1- 2 weeks",
        "timelineDrivers": [
          {
            "text": "Likelihood for a no-go (no-go decisions require additional justification and discussion)"
          },
          {
            "text": "Existing evidence (if evidence has to be specially sourced and collated, timelines may increase)"
          },
          {
            "text": "SPA stipulations (some SPAs stipulate when Go/No-Go decisions must take place, and how long discussions may last)"
          }
        ],
        "necessary": [
          {
            "text": "Assess the success of DRs, and confirm that all issues from the final DR have been remediated or have clear timelines for remediation"
          },
          {
            "text": "Ensure that at least one successful end to end DR has taken place"
          },
          {
            "text": "Discuss residual risks and mitigation plans across each workstream, with each AE laying out in turn testing results, DR success, and residual risks related to their area"
          },
          {
            "text": "For each residual risk, lay out the potential risk to go-live, likelihood, and mitigation plans"
          },
          {
            "text": "Gather evidence that key conditions have been met such as:",
            "subs": [
              "Client onboarding",
              "Account set up",
              "Regulatory change-of-control approval",
              "Client and contract novations / consents",
              "Data extraction and reconciliation in DRs",
              "Financial settlement success in DRs",
              "Buyer obligations as stipulated in the SPA",
              "Board and governance transition readiness",
              "TSA readiness",
              "Funding and liquidity readiness",
              "Agreeance and acceptance of residual separation risks"
            ]
          },
          {
            "text": "Gather all AEs / SteerCo members to formally make and document the Go/No-Go decision internally, allowing any reservations to be noted and addressed"
          },
          {
            "text": "Gather buyer and seller AEs to formally make the joint Go/No-Go decision"
          },
          {
            "text": "Formally document go/no position with the Buyer and communicate to clients, employees, and regulators"
          },
          {
            "text": "Include a Go/No-Go decision related to employee readiness, including the completion of key conditions such as consultations"
          }
        ],
        "conditional": [
          {
            "text": "Include additional regulatory requirements, such as the registration of certain employees with regulatory bodies (e.g., FAIS registration of trading employees)"
          },
          {
            "text": "Distinguish between:",
            "subs": [
              "Legal completion readiness",
              "Operational separation readiness",
              "TSA-supported Day 1 readiness"
            ]
          }
        ],
        "optional": [
          {
            "text": "Announce the decision on the local stock exchange to ensure clients / market is aware (e.g., SENS announcement)"
          },
          {
            "text": "Brief the media on the decision, with a series of prepared remarks"
          }
        ],
        "nuances": [
          {
            "text": "Go/No-Go should account for the full spectrum of integration of Absa's business into the buyer, as well as Absa's readiness to continue to run without this business as part of the group"
          }
        ],
        "artefacts": [
          {
            "text": "Go/No-Go criteria (owned by Inorganic Change Team to use throughout this decision making process)"
          },
          {
            "text": "M&A Learning Academy materials on governance and decision rights"
          },
          {
            "text": "DR and cutover playbook"
          }
        ],
        "templates": [
          {
            "text": "Go/No-Go decision scorecard/paper"
          }
        ]
      },
      {
        "id": "cutover",
        "index": "09",
        "title": "Cutover",
        "purpose": "Execute the controlled separation and transfer of the full business while maintaining continuity across both the divested business and the broader Absa group",
        "role": [
          {
            "text": "Coordinate the logistical preparation of the cutover, based upon successful DR. Support the execution of the cutover"
          },
          {
            "text": "Run the central control function, coordinating Absa activities and linking in with the buyer, and overseeing workstream execution against approved runbook."
          },
          {
            "text": "Coordinate cross-workstream dependencies and stakeholder communications through the cutover timeline."
          }
        ],
        "timeline": "24 to 72 hours",
        "timelineDrivers": [
          {
            "text": "Scale of activity required over cutover"
          },
          {
            "text": "Length of individual activities (some activities may last 24 hours + depending on their nature)"
          },
          {
            "text": "Length of time the bank can shut down without impacting service (some jurisdictions have payments flowing over the weekend, others do not)"
          }
        ],
        "necessary": [
          {
            "text": "Work with Data Migration and Technology to define the final cutover plan, iterated during DRs"
          },
          {
            "text": "Freeze and extract the final transferring population ahead of cutover"
          },
          {
            "text": "Reconcile clients, balances, assets and liabilities to assess funding requirements, and execute financial settlement and completion-account activities"
          },
          {
            "text": "Ensure required legal documents are signed over cutover to formally transfer legal and operational control to the buyer"
          },
          {
            "text": "Ensure Absa system access to divested business is revoked or modified"
          },
          {
            "text": "Walk through the plan again with teams to confirm understanding, roles, and responsibilities"
          },
          {
            "text": "Sign off final cutover plan with all AEs"
          },
          {
            "text": "Coordinate contingency planning across all workstreams, gathering scenarios and planning for potential issues which may arise over the cutover"
          },
          {
            "text": "Define any additional governance to be in place during cutover vs DRs (e.g., additional executive updates, final decision gates, etc)"
          },
          {
            "text": "Execute on cutover plan, including agreed-upon governance gates"
          },
          {
            "text": "Execute on testing activities planned in the runbook to ensure all retained business systems are working as planned"
          },
          {
            "text": "Hold final checkpoint to assess success of the cutover, ensure retained systems continue to function, and assess Absa support required in mitigation plans for issues"
          },
          {
            "text": "Continue to communicate with the buyer once they open post-cutover to assess issues and provide support where needed"
          },
          {
            "text": "Communicate with clients on the success of the cutover, and remind them of new channels into the buyer"
          },
          {
            "text": "Execute purchase-price settlement and transfer shares and legal title."
          },
          {
            "text": "Complete Board resignations and appointments and transfer governance and delegated authorities"
          },
          {
            "text": "Replace Absa funding and guarantees"
          },
          {
            "text": "Confirm that the target and remaining Absa group are operational"
          },
          {
            "text": "Execute on the employee onboarding cutover plan, ensuring new employees have necessary system and building access on LD1"
          }
        ],
        "conditional": [
          {
            "text": "Communicate any residual issues to clients which remain post-cutover, and detail timelines for remediation"
          },
          {
            "text": "Activate TSAs and begin to track towards exit"
          }
        ],
        "optional": [
          {
            "text": "Brief the media on a successful cutover, with pre-prepared executive remarks"
          },
          {
            "text": "Issue an announcement on the stock exchange regarding the successful cutover"
          }
        ],
        "nuances": [
          {
            "text": "Cutover for a deal of this type will be the most complex and high-risk, given the full integration of a bank. It could be staged, therefore, rather than 'big bang'"
          }
        ],
        "artefacts": [
          {
            "text": "Approved cutover runbook, including a time-sequenced plan: activities, owners, dependencies, control gates, and completion criteria (Absa transaction specific)"
          },
          {
            "text": "Hub & Spoke Operating Model"
          },
          {
            "text": "DR and cutover playbook"
          }
        ],
        "templates": [
          {
            "text": "Cutover checkpoint template"
          }
        ]
      },
      {
        "id": "hypercare",
        "index": "10",
        "title": "Hypercare",
        "purpose": "Stabilise the Absa group business as required, ensure TSAs are active as required, resolve any residual issues from cutover, and support buyer Hypercare.",
        "role": [
          {
            "text": "Monitor a consolidated view of incidents post cutover, and monitor the Hypercare team's triage and remediation efforts"
          },
          {
            "text": "Support the Hypercare team in escalating issues through agreed governance in order to prevent any financial, regulatory or client harm"
          },
          {
            "text": "Assess readiness to exit Hypercare using an agreed checklist and criteria, coordinating a formal handover to BAU"
          },
          {
            "text": "Lead regular updates to executives on tracking of strategic and financial outcomes"
          }
        ],
        "timeline": "1 – 2 months",
        "timelineDrivers": [
          {
            "text": "Number of clients transferring (additional clients means Additional time required to triage and resolve issues)"
          },
          {
            "text": "Capacity within Hypercare team (smaller team takes longer to resolve issues)"
          },
          {
            "text": "Complexity of transfer (a transfer of complex clients with complex products likely requires more dedicated service time)"
          },
          {
            "text": "Success of cutover (issues on cutover mean an extended Hypercare period will likely be needed to stabilise clients and resolve issues)"
          }
        ],
        "necessary": [
          {
            "text": "Set up a dedicated team to monitor residual cutover issues, retained business issues, and any post-cutover data corrections or additions required"
          },
          {
            "text": "Triage issues for remediation, add them to a backlog, and flag with technology / BAU teams as required"
          },
          {
            "text": "Escalate persistent or P1 issues immediately, through a dedicated escalation pathway"
          },
          {
            "text": "Stand up and coordinate war-rooms as necessary to remediate P1 issues quickly and avoid disruption"
          },
          {
            "text": "Set up dedicated client communications teams to ensure retained clients remain in the loop post LD1"
          },
          {
            "text": "Gradually hand off servicing to BAU teams by transitioning issue resolution and triage into the BAU process, prioritising only the most serious issues for Hypercare as time passes"
          },
          {
            "text": "Track divestment objectives such as cost, asset/liability transfer, volumes, etc. as soon as LD1, and provide updates to executives on progress against objectives"
          },
          {
            "text": "Hold daily touchpoints with AEs to flag the most important issues and discuss remediation plans"
          },
          {
            "text": "Hold regular touchpoints with client-facing teams to discuss client sentiment and assess action plans"
          },
          {
            "text": "Conduct completion-account and purchase-price true-ups"
          },
          {
            "text": "Ensure closure of intra-group accounts and interfaces"
          },
          {
            "text": "Confirmation of buyer data-return or deletion obligations"
          },
          {
            "text": "Ensure post-completion support is within the bounds of SPA and TSAs"
          }
        ],
        "conditional": [
          {
            "text": "Support the buyer's Hypercare for systems which have transitioned from Absa to buyer"
          },
          {
            "text": "Monitor TSA performance, track progress towards exit, and remove remaining entanglements"
          },
          {
            "text": "Resolve any transfer exceptions or data inaccuracies"
          },
          {
            "text": "Monitor warranties, indemnities, and potential claims"
          }
        ],
        "optional": [
          {
            "text": "Reach out to clients directly to assess sentiment"
          }
        ],
        "nuances": [
          {
            "text": "Absa knowledge may be required to support buyer Hypercare for transferred systems/technologies"
          }
        ],
        "artefacts": [
          {
            "text": "Transferred portfolio of clients (Absa transaction specific)"
          },
          {
            "text": "Hub & Spoke operating model"
          },
          {
            "text": "M&A Learning Pathways"
          }
        ],
        "templates": [
          {
            "text": "Hypercare RAID Log"
          },
          {
            "text": "Daily Hypercare status report template"
          },
          {
            "text": "TSA service dashboard and exit plan"
          }
        ]
      }
    ]
  },
  {
    "archetypeId": "full-business-divestment",
    "archetypeName": "Full-business divestment",
    "variantLabel": "Variant B · Buyer runs the business standalone",
    "sourceTitle": "Full Business Sale B (Buyer runs the business as standalone)",
    "stages": [
      {
        "id": "due-diligence",
        "index": "01",
        "title": "Due Diligence",
        "purpose": "Determine whether the acquisition creates value, what you are actually buying, and what needs to be protected contractually. Legal & CorpDev lead; other areas input where required. Activities below relate to key items for the integration team to consider during this process, they do not override current DD processes",
        "role": [
          {
            "text": "Extract information from the DD process necessary to properly plan and run the divestment"
          },
          {
            "text": "Act as M&A SMEs to provide oversight, bringing a practical, Absa oriented lens which goes beyond financials and ensures nuances are identified and caught based on previous experience"
          }
        ],
        "timeline": "1 – 3 months",
        "timelineDrivers": [
          {
            "text": "Product complexity (more complex products are harder for a seller to model and project)"
          },
          {
            "text": "Maturity of DD teams (experienced teams can pre-empt buyer questions and data requests ahead of time)"
          },
          {
            "text": "Buyer availability (heavily reliant on buyer capacity to review and assess materials)"
          }
        ],
        "necessary": [
          {
            "text": "Ensure virtual data room set up to share confidential documentation and ensure it persists after deal signature"
          },
          {
            "text": "Ensure an NDA process to wall-cross those who need access to confidential information is set up"
          },
          {
            "text": "Ensure buyer has the requisite information access controls set up to protect Absa confidential information"
          },
          {
            "text": "Build an initial view of project divestment costs, leveraging comparable deals, including TSA costs. All assumptions in planning costs must be defensible and informed by functional experts"
          },
          {
            "text": "Build or oversee build of a detailed business case comparing forecasted benefits of divestment to project costs and continued running costs"
          },
          {
            "text": "Ensure services the divested business currently receives from Absa are identified"
          },
          {
            "text": "Ensure tax implications have been assessed and remediation planned"
          },
          {
            "text": "Ensure the complete legal entity, subsidiary and branch structure is understood"
          },
          {
            "text": "Ensure ownership of assets, intellectual property and licences is reviewed"
          },
          {
            "text": "Ensure assessment of seller-group dependencies which must be terminated, replaced or covered by TSAs has taken place"
          }
        ],
        "conditional": [
          {
            "text": "Ensure that the value of intangible assets is also considered and assessed, and that this informs the sale price"
          },
          {
            "text": "Access to this early stage of the lifecycle may not always be possible given the broader business context, but it should be requested given its importance to execution"
          }
        ],
        "optional": [
          {
            "text": "Review lessons learnt from previous deals"
          },
          {
            "text": "Engage a subset of buyer clients to assess current pain points and identify any potential deal red flags (e.g. compliance issues, pricing mismatches, in-scope technology issues)"
          }
        ],
        "nuances": [
          {
            "text": "DD must account for business line impact inherent in selling all of the business (e.g., capital, funding, and liquidity impact on Absa group)"
          }
        ],
        "artefacts": [
          {
            "text": "Previous transaction materials and lessons learnt (Absa transaction specific)"
          },
          {
            "text": "Business case (Absa transaction specific)"
          }
        ],
        "templates": []
      },
      {
        "id": "legal-drafting-signature",
        "index": "02",
        "title": "Legal Drafting & Signature",
        "purpose": "Ensure the Sale and Purchase Agreement (SPA) reflects reality of programme delivery, and enables execution. Legal & CorpDev lead, other areas input where required. Activities below relate to key integration considerations, they do not overwrite the current processes.",
        "role": [
          {
            "text": "Ensure legals reflect execution reality, and timelines are realistic"
          },
          {
            "text": "Ensure legals include provisions which will support execution, such as data sharing"
          },
          {
            "text": "Ensure any go-live dates are based on realistic assumptions around regulatory approval and client onboarding timelines"
          },
          {
            "text": "Leverage lessons learned from previous deals to ensure legals address any historic pain points"
          }
        ],
        "timeline": "1 – 2 months",
        "timelineDrivers": [
          {
            "text": "Deal complexity (complex deals require additional protections and conditions)"
          },
          {
            "text": "Pre-signing alignment (pre-agreed valuations and completion mechanisms will speed up drafting)"
          },
          {
            "text": "DD quality (high quality DD will allow defensible assumptions to be made in the legals, otherwise these will have to be assessed during this phase)"
          },
          {
            "text": "Regulatory complexity (multiple regulators across multiple jurisdictions increases complexity in drafting legals)"
          },
          {
            "text": "TSA requirements (complex and numerous TSA requirements will increase the complexity of resulting legals)"
          }
        ],
        "necessary": [
          {
            "text": "Engage external lawyers to lead SPA drafting and negotiation, informed by internal legal opinion"
          },
          {
            "text": "Negotiate transaction terms including valuation, adjustment principles, completion mechanisms, and payment terms"
          },
          {
            "text": "Ensure price, adjustments and effective transfer date are agreed"
          },
          {
            "text": "Coordinate and confirm the signing sequence between Absa, the buyer and other parties"
          },
          {
            "text": "Set out which items will transfer from Absa to the buyer automatically under agreed regulatory processes (e.g., Section 54), and which will have to be manually transferred"
          },
          {
            "text": "Detail novation processes for items not automatically transferring, whether independent legal opinions on contracts are required, and where liability sits during transfer"
          },
          {
            "text": "Set out the joint governance mechanisms across buyer and seller at a high level (e.g., the scheduling of joint Steering Committees, appointment of Transaction Directors from each party)"
          },
          {
            "text": "Set out joint escalation mechanisms for programme-level issues, as well as dispute resolution mechanisms"
          },
          {
            "text": "Set out conditions precedent for completion, including funds transfer, regulatory approval, and board approval"
          },
          {
            "text": "Agree signatures required on each side"
          },
          {
            "text": "Set out completion date precedent on regulatory approval date(s), rather than a pre-agreed specific date"
          },
          {
            "text": "Set out a joint communications plan to clients from both buyer and seller, including timelines for when buyer can engage the clients"
          },
          {
            "text": "Place clear obligations on the buyer for regulatory approvals, onboarding and operational readiness"
          },
          {
            "text": "Set out transfer of shares and legal title, and regulatory change of control requirements"
          },
          {
            "text": "Detail technology maintenance requirements of Absa, and stipulations on major changes"
          }
        ],
        "conditional": [
          {
            "text": "Detail FX payment mechanisms, including adjustments for FX risk and longer settlement times"
          },
          {
            "text": "Define ownership and licensing of shared Intellectual Property"
          },
          {
            "text": "Establish TSAs, service levels, pricing, liabilities, and exit dates"
          },
          {
            "text": "Access to this early stage of the lifecycle may not always be possible given the broader business context, but it should be requested given its importance to execution"
          }
        ],
        "optional": [
          {
            "text": "Set SPA change control mechanisms"
          },
          {
            "text": "Set up SPA access mechanisms for project team members"
          },
          {
            "text": "Socialise with functional leads ahead of signature"
          }
        ],
        "nuances": [
          {
            "text": "SPA is likely to be a Share Purchase Agreement, given the full divestment of a legal entity"
          },
          {
            "text": "Regulatory approval is focused on change of control of licences, as well as competition approval"
          }
        ],
        "artefacts": [
          {
            "text": "DD summary and agreed deal decisions (Absa deal specific)"
          },
          {
            "text": "M&A lessons learnt (Absa transaction specific)"
          }
        ],
        "templates": [
          {
            "text": "NDA template"
          }
        ]
      },
      {
        "id": "mobilisation-planning",
        "index": "03",
        "title": "Mobilisation & Planning",
        "purpose": "Define the key activities which must take place to enable LD1 to take place on the agreed date, and surface dependencies",
        "role": [
          {
            "text": "Inorganic Change team should lead the mobilisation effort across Absa: briefing functional leads / AEs, onboarding teams, executing the NDA process, creating onboarding materials, briefing teams on detailed plan creation, and supporting the buyer to lead joint planning efforts"
          }
        ],
        "timeline": "2- 4 weeks",
        "timelineDrivers": [
          {
            "text": "Deal complexity (complex deals need more workstreams to execute)"
          },
          {
            "text": "Geographical scope (multiple geographies require more coordination)"
          },
          {
            "text": "Existing knowledge (teams familiar with these deals can draft a detailed plan much faster, and understand dependencies)"
          },
          {
            "text": "Available resource (resource constraints mean activities take longer)"
          }
        ],
        "necessary": [
          {
            "text": "Set up mobilisation hierarchy:",
            "subs": [
              "Board appoints executive sponsor for the deal",
              "Executive sponsor appoints Transaction Director",
              "Transaction Director and Executive Sponsor agree Accountable Executives for each function / workstream",
              "AE selection should be informed by their expected responsibilities, detailed in the Hub and Spoke Operating Model",
              "AEs appoint functional workstream leads, who appoint in-country leads",
              "Transaction Director mobilises central Inorganic Change team and in-country coordinators",
              "Buyer and Seller Inorganic Change teams share lists of functional leads to enable joint planning",
              "Joint and individual governance established based on Mobilisation Toolkit"
            ]
          },
          {
            "text": "Each asset, process, capability, should be classified as either:",
            "subs": [
              "Transfer",
              "Retain",
              "Duplicate",
              "Terminate",
              "Replace by the buyer",
              "Provide temporarily through a TSA"
            ]
          },
          {
            "text": "Set up a Transaction and Exit Management Office run by the Inorganic Change Team to lead the separation from Absa's side"
          },
          {
            "text": "Define minimum required workstreams to provide buyer with sufficient information to run the business at separation, and define key roles and responsibilities"
          },
          {
            "text": "Define key milestones ahead of Legal Day 1 (LD1), focused on information and set up required by the buyer to run the business in isolation"
          },
          {
            "text": "Support each workstream to define a detailed, L2 plan below this to enable the meeting of these milestones"
          },
          {
            "text": "Hold joint workshops across buyer and seller to discuss and agree on these milestones"
          },
          {
            "text": "Identify milestones with key dependencies across workstreams, and document these dependencies in detail"
          },
          {
            "text": "Define a stranded cost remediation plan"
          },
          {
            "text": "Set up a buyer-obligation and dependency tracker to ensure buyer is held accountable for conditions precedent"
          },
          {
            "text": "Identify the critical path, and dates/factors will have a material impact on completion, and which of these can be controlled (e.g., regulatory approval or bank-wide change freezes cannot be controlled, etc)"
          },
          {
            "text": "Translate the milestones into an overarching project plan to be tracked weekly"
          },
          {
            "text": "Agree on internal governance cadence which will sync with joint governance laid out in the SPA, including:",
            "subs": [
              "Internal and joint Inorganic Change meetings weekly / bi-weekly to align on priorities and joint risks/issues",
              "Working group / workstream led sessions to discuss key risks, issues, and progress",
              "Internal Steering Committee sessions to escalate Absa-specific risks and issues, and receive guidance on key decisions",
              "Joint Steering Committee sessions to discuss joint risks and issues, and coordinate cross-party solutions"
            ]
          },
          {
            "text": "Translate DD findings and governance structures into onboarding materials which clearly articulate the purpose and objectives of the deal, how execution will run day to day, roles and responsibilities, and escalation pathways"
          },
          {
            "text": "Define a Day 1 control-handover plan, and Board and governance transition plan"
          },
          {
            "text": "Set up a Seller-group dependency map and an Intra-group balance and contract exit plan"
          }
        ],
        "conditional": [
          {
            "text": "Submit a version of the programme plan to the regulator alongside the request for approval"
          },
          {
            "text": "Create a detailed workstream plan for employee / tech transfer"
          },
          {
            "text": "Define a TSA service catalogue and exit plan"
          },
          {
            "text": "Set up TSA exit team and define timeline for complete TSA exit"
          }
        ],
        "optional": [
          {
            "text": "Translate the project plan into project management software (e.g., Jira, MSP)"
          },
          {
            "text": "Link governance into bank-level governance such as Board meetings, StratCos, etc"
          }
        ],
        "nuances": [
          {
            "text": "The business is being run standalone, so reduced scope of planning can take place, focused on providing the buyer the required information ahead of LD1, supporting with any additional set up, and disentangling the business from within Absa"
          }
        ],
        "artefacts": [
          {
            "text": "TSA agreements (Absa transaction specific)"
          },
          {
            "text": "Regulatory commitments and approval timelines (Absa transaction specific)"
          },
          {
            "text": "Previous transaction playbooks with lessons learned (Absa transaction specific)"
          },
          {
            "text": "Hub & Spoke operating model"
          },
          {
            "text": "Mobilisation toolkit"
          }
        ],
        "templates": [
          {
            "text": "High-level transaction plan template"
          },
          {
            "text": "Detail excel project plan"
          },
          {
            "text": "Governance forums Terms of Reference"
          },
          {
            "text": "TSA service catalogue"
          },
          {
            "text": "Buyer obligations tracker"
          }
        ]
      },
      {
        "id": "programme-execution",
        "index": "04",
        "title": "Programme Execution",
        "purpose": "Maintain the value and stability of the business, disentangle it from the wider Absa group, and execute the activities required to transfer ownership and control.",
        "role": [
          {
            "text": "Inorganic Change Team acts as the central hub in the execution phase, driving workstream level execution, tracking RAID items, defining SteerCo material, and holding those responsible for separation accountable, whilst ensuring the buyer is making significant progress"
          }
        ],
        "timeline": "6 – 12 months",
        "timelineDrivers": [
          {
            "text": "Regulatory approval timelines"
          },
          {
            "text": "Data complexity (Complex structures require a more nuanced data migration solution)"
          },
          {
            "text": "TSA service plan (High number of TSAs can lead to faster initial completion, with work backloaded into TSA execution and exit)"
          }
        ],
        "necessary": [
          {
            "text": "Conduct programme management activities: run governance processes including workstream sessions, Exec SteerCos, and Joint Buyer/Seller SteerCos; set up and track risks and issues in a central RAID log, and escalate to SteerCo as appropriate"
          },
          {
            "text": "Separate financial reporting, ledger, controls, and regulatory reporting from the Absa group"
          },
          {
            "text": "Separate data, interfaces, and applications from Absa group"
          },
          {
            "text": "Ensure the divested business' value is maintained ahead of LD1, to avoid complications in completion and valuation"
          },
          {
            "text": "Remediate stranded costs within the retained organisation"
          },
          {
            "text": "Plan for and execute any required funding, capital, and liquidity changes needed on Absa's side"
          },
          {
            "text": "Execute disentanglement of Absa's financial and regulatory reporting from the business being sold"
          },
          {
            "text": "Track buyer obligations, flag issues, and escalate to Joint SteerCo as appropriate"
          },
          {
            "text": "Novate, assign or replicate contracts which will be transferring to the buyer"
          },
          {
            "text": "Provide regular updates to the Board and Bank Leadership Forums on progress against plan, key risks and issues, and LD1 viability"
          },
          {
            "text": "Engage the regulator regularly to update progress and assess approval timelines"
          },
          {
            "text": "Conduct contingency and scenario planning for if approvals arrive later than anticipated, and define final possible date for receipt before LD1 must move"
          },
          {
            "text": "Build out detailed client communication plan across buyer and seller, and keep clients updated on the progress of the programme"
          },
          {
            "text": "Define success criteria across all workstreams, and continually measure progress against these"
          },
          {
            "text": "Provide the buyer with regularly updated financials to track the progress of the divested business"
          },
          {
            "text": "Replace Absa funding, capital or liquidity support"
          },
          {
            "text": "Establish standalone financial and regulatory reporting where required"
          },
          {
            "text": "If TSAs are in place, monitor service delivery and exit planning"
          }
        ],
        "conditional": [],
        "optional": [
          {
            "text": "Conduct change management activities for project execution teams to drive continued buy-in and morale (e.g., team socials, rewards, etc)"
          }
        ],
        "nuances": [
          {
            "text": "As the business is being run as standalone by the buyer, execution from Absa's side will focus on disentanglement and ensuring minimal impact on the wider Absa group"
          }
        ],
        "artefacts": [
          {
            "text": "Detail project plan built out from mobilisation and planning stage (Absa transaction specific)",
            "subs": [
              "With associated excel programme plan"
            ]
          },
          {
            "text": "Previous project playbooks with lessons learnt (Absa transaction specific)"
          },
          {
            "text": "Hub & Spoke operating model"
          },
          {
            "text": "Mobilisation toolkit"
          }
        ],
        "templates": [
          {
            "text": "Workstream status report template"
          },
          {
            "text": "Joint buyer and seller status report template"
          },
          {
            "text": "Programme RAID log template with added SteerCo escalation if necessary"
          },
          {
            "text": "TSA service catalogue"
          }
        ]
      },
      {
        "id": "business-testing",
        "index": "05",
        "title": "Business Testing",
        "purpose": "Confirm that the business will continue operating under its new owner and that Absa can operate safely after the target is removed from the group.",
        "role": [
          {
            "text": "Inorganic Change Team role is to coordinate and govern testing across business and technology teams, not to perform testing itself."
          }
        ],
        "timeline": "0 – 2 months (concurrent with execution, post-build)",
        "timelineDrivers": [
          {
            "text": "Scale of business process change"
          },
          {
            "text": "Testing expertise in-house (testing SMEs within each team means scripts require less review and testing can happen faster)"
          },
          {
            "text": "Capacity within teams to accommodate testing (needs to be balanced with BAU, build, other deal-related work)"
          },
          {
            "text": "Complexity of process change (complex new systems or products require significant testing)"
          },
          {
            "text": "Downstream systems (impact of changes on multiple downstream systems requires more extensive end-to-end testing)"
          }
        ],
        "necessary": [
          {
            "text": "Ensure the buyer has detailed all business process changes occurring as part of the deal to be included in testing"
          },
          {
            "text": "Detail any business or technology changes impacting the retained business on Absa's side"
          },
          {
            "text": "Work with technology teams to understand the requirements for testing environments, including end-to-end environments"
          },
          {
            "text": "Ensure retained business regression test scripts are created which ensure:",
            "subs": [
              "Retained applications and interfaces continue functioning",
              "Regulatory and fin-crime reporting remains working as expected"
            ]
          },
          {
            "text": "Book these environments well in advance, or flag if suitable environments do not yet exist and must be built"
          },
          {
            "text": "Set up a testing-specific defect log to track issues to closure"
          },
          {
            "text": "Re-test issues post closure end-to-end, to ensure the fix has not created additional issues"
          },
          {
            "text": "Secure executive and business sign off on testing closure, with any open items clearly detailed"
          },
          {
            "text": "Test financial deconsolidation, and buyer consolidation processes"
          }
        ],
        "conditional": [
          {
            "text": "Test that TSAs and service levels are functioning as expected"
          }
        ],
        "optional": [
          {
            "text": "Set up an independent testing team to liaise with business and technology to drive test script creation and sign off"
          },
          {
            "text": "Set up testing-specific governance, and feed into programme governance"
          },
          {
            "text": "Designate a testing lead within each workstream responsible for coordinating and executing tests assigned to them"
          }
        ],
        "nuances": [
          {
            "text": "As the buyer will run the business as standalone, testing can be narrower in scope, and focus on regression testing Absa's group reporting and applications remain functioning as expected once the separation occurs"
          }
        ],
        "artefacts": [
          {
            "text": "Previous business testing programmes with lessons learnt, including a scenario-based risk mitigation plan (Absa transaction specific)"
          },
          {
            "text": "Business testing process flows and customer journeys (Absa transaction specific)"
          }
        ],
        "templates": [
          {
            "text": "Detailed business testing plan template"
          }
        ]
      },
      {
        "id": "client-continuity-ld1-readiness",
        "index": "06",
        "title": "Client Continuity & LD1 Readiness",
        "purpose": "Communicate plans and functionality with clients, and set up an orderly transfer to the buyer",
        "role": [
          {
            "text": "Oversee the standing up of an LD1 Readiness stream, and tracking both Absa and buyer progress and risks as part of programme management to assess critical risks to LD1"
          }
        ],
        "timeline": "2 – 4 weeks (concurrent to execution, alongside buyer)",
        "timelineDrivers": [
          {
            "text": "Scale of client transfer (more clients require additional communications alongside the buyer)"
          }
        ],
        "necessary": [
          {
            "text": "Allocate responsibility for each client interaction between seller and buyer"
          },
          {
            "text": "Share Absa risk profiles of clients, to enable the buyer to understand which clients are high risk, and which some documentation can be obtained post-LD1"
          },
          {
            "text": "Share existing required KYC / AML documentation across transferring clients"
          },
          {
            "text": "Define Absa's role in the Hypercare model for post go-live, and how much support the buyer requires from Absa experts"
          },
          {
            "text": "Identify client contracts with change-of-control provisions"
          },
          {
            "text": "Confirm how complaints and conduct issues will be handled"
          },
          {
            "text": "Monitor client attrition and reputational risk"
          },
          {
            "text": "Communicate any brand, ownership or contact changes"
          }
        ],
        "conditional": [
          {
            "text": "Prepare client-facing employees transferring by ensuring clients have their new contact details for once they have transferred to the buyer"
          }
        ],
        "optional": [],
        "nuances": [
          {
            "text": "Dedicated LD1 Readiness capacity on the buyer and seller side is less critical if the business is being run as standalone, as clients generally remain with the same legal entity and do not require full buyer onboarding. Focus is instead on clear communication of timelines, and monitoring attrition risk"
          }
        ],
        "artefacts": [],
        "templates": []
      },
      {
        "id": "dress-rehearsals",
        "index": "07",
        "title": "Dress Rehearsals",
        "purpose": "Testing end-to-end approach to separation in order to raise and resolve any issues which would prevent a successful separation",
        "role": [
          {
            "text": "Coordinate the logistical preparation of the DRs, support the operations and legal teams in defining the runbook, support the execution of the DRs either as logistical support or by acting as Migration Coordinators (MCs)."
          }
        ],
        "timeline": "4 – 8 weeks",
        "timelineDrivers": [
          {
            "text": "Number of Dress Rehearsals (DRs) (more DRs require a longer timeframe)"
          },
          {
            "text": "Down-time between DRs (minimum 2 weeks between DRs is recommended)"
          }
        ],
        "necessary": [
          {
            "text": "Ensure that runbook activities include provision for testing of continued regulatory and financial reporting, as well as financial reconciliation on the buyer's side"
          },
          {
            "text": "Hold runbook run-through sessions with all activity owners and back-ups to ensure everyone is clear on expectations"
          },
          {
            "text": "Define success metrics for DRs, with a clear understanding of what is acceptable in the first DR vs the final DR"
          },
          {
            "text": "Define roles and responsibilities across DRs and Cutover, including Data Migration Controllers running the runbook"
          },
          {
            "text": "Execute logistical support required to enable 24/7 DRs to take place such as building access, food requirements, accommodation, travel, Wi-Fi, security, facilities, and back-up plans"
          },
          {
            "text": "Define the governance processes to take place during DRs including the command centre, regular executive updates, escalation pathways, war room protocols, issue resolution processes, and continency decision making"
          },
          {
            "text": "Collate a DR playbook summarising success criteria, logistical information, key contacts, governance processes, and timelines"
          },
          {
            "text": "Confirm after each DR that retained data has not been transferred"
          },
          {
            "text": "Run a minimum of 2 DRs across weekends, with at least 2 weeks in between each"
          },
          {
            "text": "Each DR should execute the runbook end-to-end, and track issues which arise for remediation"
          },
          {
            "text": "Hold DR retros to note lessons learnt and iterate into subsequent DRs"
          },
          {
            "text": "Track the remediation of issues ahead of subsequent DRs"
          },
          {
            "text": "Include DR activities which test legal completion, transfer of ownership, and purchase price settlement"
          },
          {
            "text": "Assess financial deconsolidation and treasury and funding transition during DRs"
          },
          {
            "text": "Assess continuity of regulatory reporting within Absa group during DRs"
          }
        ],
        "conditional": [
          {
            "text": "Include DR activities which relate to the set up of brand new systems or migration of Absa technology into buyer environments"
          },
          {
            "text": "Include DR activities which simulate TSA activation"
          }
        ],
        "optional": [
          {
            "text": "Hold a 'Table-top DR' before the true DRs take place, to run through the full runbook with all owners, without having to execute each step in the proper environments"
          }
        ],
        "nuances": [
          {
            "text": "As the buyer will run the business as standalone, scale of DRs can be significantly reduced, and driven by the level of operational change occurring."
          },
          {
            "text": "A tabletop rehearsal plus one full completion rehearsal may be sufficient where the entity continues on its existing systems"
          }
        ],
        "artefacts": [
          {
            "text": "Approved DR strategy: this will cover DR scope, sequencing, success measures and rehearsal cadence (Absa transaction specific)"
          },
          {
            "text": "Previous DR completion records with timestamps, success measure results and lessons learnt (Absa transaction specific)"
          },
          {
            "text": "DR and cutover playbook"
          }
        ],
        "templates": [
          {
            "text": "Runbook template"
          },
          {
            "text": "DR defect template"
          },
          {
            "text": "DR checkpoint template"
          },
          {
            "text": "DR retro template"
          }
        ]
      },
      {
        "id": "go-no-go",
        "index": "08",
        "title": "Go/No-Go",
        "purpose": "Formally discuss and approve/disapprove whether all workstreams and parties are sufficiently ready to proceed with separation",
        "role": [
          {
            "text": "Drive the collation of evidence across execution, testing, and DRs to present a case for a Go/No-Go decision to the Steering Committee. Liaise with functional leads and AEs to ensure they can clearly state the recommendation of their area."
          }
        ],
        "timeline": "1- 2 weeks",
        "timelineDrivers": [
          {
            "text": "Likelihood for a no-go (no-go decisions require additional justification and discussion)"
          },
          {
            "text": "Existing evidence (if evidence has to be specially sourced and collated, timelines may increase)"
          },
          {
            "text": "SPA stipulations (some SPAs stipulate when Go/No-Go decisions must take place, and how long discussions may last)"
          }
        ],
        "necessary": [
          {
            "text": "Assess the success of DRs, and confirm that all issues from the final DR have been remediated or have clear timelines for remediation"
          },
          {
            "text": "Ensure that at least one successful end to end DR has taken place"
          },
          {
            "text": "Discuss residual risks and mitigation plans across each workstream, with each AE laying out in turn testing results, DR success, and residual risks related to their area"
          },
          {
            "text": "For each residual risk, lay out the potential risk to go-live, likelihood, and mitigation plans"
          },
          {
            "text": "Gather evidence that key conditions have been met such as:",
            "subs": [
              "Regulatory change-of-control approval",
              "Financial settlement success in DRs",
              "Buyer obligations as stipulated in the SPA",
              "Board and governance transition readiness",
              "TSA readiness",
              "Funding and liquidity readiness",
              "Agreement and acceptance of residual separation risks"
            ]
          },
          {
            "text": "Gather all AEs / SteerCo members to formally make and document the Go/No-Go decision internally, allowing any reservations to be noted and addressed"
          },
          {
            "text": "Gather buyer and seller AEs to formally make the joint Go/No-Go decision"
          },
          {
            "text": "Formally document go/no position with the Buyer and communicate to clients, employees, and regulators"
          },
          {
            "text": "Include a Go/No-Go decision related to employee readiness, including the completion of key conditions such as consultations"
          }
        ],
        "conditional": [
          {
            "text": "Distinguish between:",
            "subs": [
              "Legal completion readiness",
              "Operational separation readiness",
              "TSA-supported Day 1 readiness"
            ]
          }
        ],
        "optional": [
          {
            "text": "Announce the decision on the local stock exchange to ensure clients / market is aware (e.g., SENS announcement)"
          },
          {
            "text": "Brief the media on the decision, with a series of prepared remarks"
          }
        ],
        "nuances": [
          {
            "text": "Go/No-Go should focus on the buyer's readiness to run the business independently, and Absa's assurance that no continuing operations will be impacted, distinguishing legal completion readiness from any longer-term buyer integration activity"
          }
        ],
        "artefacts": [
          {
            "text": "Go/No-Go criteria (owned by Inorganic Change Team to use throughout this decision making process)"
          },
          {
            "text": "M&A Learning Academy materials on governance and decision rights"
          },
          {
            "text": "DR and cutover playbook"
          }
        ],
        "templates": [
          {
            "text": "Go/No-Go decision scorecard/paper"
          }
        ]
      },
      {
        "id": "legal-completion-control-handover",
        "index": "09",
        "title": "Legal Completion & Control Handover",
        "purpose": "Execute the controlled separation of the full business while maintaining continuity, and legally pass ownership to the buyer",
        "role": [
          {
            "text": "Coordinate the logistical preparation of the cutover, based upon successful DR. Support the execution of the cutover"
          },
          {
            "text": "Run the central control function, coordinating Absa activities and linking in with the buyer, and overseeing workstream execution against approved runbook."
          },
          {
            "text": "Coordinate cross-workstream dependencies and stakeholder communications through the cutover timeline."
          }
        ],
        "timeline": "24 to 72 hours",
        "timelineDrivers": [
          {
            "text": "Scale of activity required over cutover"
          },
          {
            "text": "Length of individual activities (some activities may last 24 hours + depending on their nature)"
          },
          {
            "text": "Length of time the bank can shut down without impacting service (some jurisdictions have payments flowing over the weekend, others do not)"
          }
        ],
        "necessary": [
          {
            "text": "Define the final cutover plan, iterated during DRs"
          },
          {
            "text": "Ensure required legal documents are signed over cutover to formally transfer legal and operational control to the buyer"
          },
          {
            "text": "Ensure Absa system access to divested business is revoked or modified"
          },
          {
            "text": "Walk through the plan again with teams to confirm understanding, roles, and responsibilities"
          },
          {
            "text": "Sign off final cutover plan with all AEs"
          },
          {
            "text": "Coordinate contingency planning across all workstreams, gathering scenarios and planning for potential issues which may arise over the cutover"
          },
          {
            "text": "Define any additional governance to be in place during cutover vs DRs (e.g., additional executive updates, final decision gates, etc)"
          },
          {
            "text": "Execute on cutover plan, including agreed-upon governance gates"
          },
          {
            "text": "Execute on testing activities planned in the runbook to ensure all remaining Abse-group systems are working as planned"
          },
          {
            "text": "Hold final checkpoint to assess success of the cutover, ensure retained systems continue to function, and assess Absa support required in mitigation plans for issues"
          },
          {
            "text": "Continue to communicate with the buyer to assess issues and provide support where needed"
          },
          {
            "text": "Execute purchase-price settlement and transfer shares and legal title."
          },
          {
            "text": "Complete Board resignations and appointments and transfer governance and delegated authorities"
          },
          {
            "text": "Replace Absa funding and guarantees"
          },
          {
            "text": "Confirm that the target and remaining Absa group are operational"
          }
        ],
        "conditional": [
          {
            "text": "Communicate any residual issues to clients which remain post-cutover, and detail timelines for remediation"
          },
          {
            "text": "Activate TSAs and begin to track towards exit"
          }
        ],
        "optional": [
          {
            "text": "Brief the media on a successful cutover, with pre-prepared executive remarks"
          },
          {
            "text": "Issue an announcement on the stock exchange regarding the successful cutover"
          }
        ],
        "nuances": [
          {
            "text": "Cutover for a deal of this type will be the least complex, focused largely on transfer of legal ownership, as the business should largely continue running as previously, with only the ownership structures, reporting, and liquidity management changing"
          }
        ],
        "artefacts": [
          {
            "text": "Approved cutover runbook, including a time-sequenced plan: activities, owners, dependencies, control gates, and completion criteria (Absa transaction specific)"
          },
          {
            "text": "Hub & Spoke Operating Model"
          },
          {
            "text": "DR and cutover playbook"
          }
        ],
        "templates": [
          {
            "text": "Cutover checkpoint template"
          }
        ]
      },
      {
        "id": "hypercare",
        "index": "10",
        "title": "Hypercare",
        "purpose": "Support a stable transition of ownership, resolve residual seller obligations and complete Absa's exit from the business.",
        "role": [
          {
            "text": "Support the Hypercare team in escalating issues through agreed governance in order to prevent any financial, regulatory or client harm"
          },
          {
            "text": "Assess readiness to exit Hypercare using an agreed checklist and criteria, coordinating a formal handover to BAU"
          },
          {
            "text": "Lead regular updates to executives on tracking of strategic and financial outcomes"
          }
        ],
        "timeline": "0 – 2 months",
        "timelineDrivers": [
          {
            "text": "Capacity within Hypercare team (smaller team takes longer to resolve issues)"
          },
          {
            "text": "Success of cutover (issues on cutover mean an extended Hypercare period will likely be needed to stabilise clients and resolve issues)"
          }
        ],
        "necessary": [
          {
            "text": "Set up a dedicated team to monitor residual cutover issues and retained business issues"
          },
          {
            "text": "Triage issues for remediation, add them to a backlog, and flag with technology / BAU teams as required"
          },
          {
            "text": "Escalate persistent or P1 issues immediately, through a dedicated escalation pathway"
          },
          {
            "text": "Stand up and coordinate war-rooms as necessary to remediate P1 issues quickly and avoid disruption"
          },
          {
            "text": "Gradually hand off servicing to BAU teams by transitioning issue resolution and triage into the BAU process, prioritising only the most serious issues for Hypercare as time passes"
          },
          {
            "text": "Track divestment objectives such as cost, asset/liability transfer, volumes, etc. as soon as LD1, and provide updates to executives on progress against objectives"
          },
          {
            "text": "Hold daily touchpoints with AEs to flag the most important issues and discuss remediation plans"
          },
          {
            "text": "Conduct completion-account and purchase-price true-ups"
          },
          {
            "text": "Ensure closure of intra-group accounts and interfaces"
          },
          {
            "text": "Confirmation of buyer data-return or deletion obligations"
          },
          {
            "text": "Ensure post-completion support is within the bounds of SPA and TSAs"
          }
        ],
        "conditional": [
          {
            "text": "Monitor TSA performance, track progress towards exit, and remove remaining entanglements"
          },
          {
            "text": "Monitor warranties, indemnities, and potential claims"
          }
        ],
        "optional": [],
        "nuances": [
          {
            "text": "Detailed, specific Hypercare capacity may not be required from the Absa side if the buyer is running the business as standalone with minimal operational and technical change"
          }
        ],
        "artefacts": [
          {
            "text": "Hub & Spoke operating model"
          },
          {
            "text": "M&A Learning Pathways"
          }
        ],
        "templates": [
          {
            "text": "Hypercare RAID Log"
          },
          {
            "text": "Daily Hypercare status report template"
          },
          {
            "text": "TSA service dashboard and exit plan"
          }
        ]
      }
    ]
  }
];

export function getLifecycleVariants(archetypeId: string): LifecycleVariant[] {
  return LIFECYCLES.filter((l) => l.archetypeId === archetypeId);
}

export const REQUIREMENT_GROUPS = [
  { key: "necessary", label: "Necessary" },
  { key: "conditional", label: "Conditional" },
  { key: "optional", label: "Optional" },
] as const;
