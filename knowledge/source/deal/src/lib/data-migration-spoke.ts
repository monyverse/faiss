/**
 * Data Migration SA Functional Spoke.
 *
 * All strings in this file are approved source content reproduced verbatim
 * from the Absa M&A Transaction Operating Model document. Do not summarise,
 * paraphrase or correct the wording.
 */

import type { SpokeContent } from "./spoke-content";

export const CONTENT: SpokeContent = {
  "id": "data-migration",
  "name": "Data Migration",
  "reference": "",
  "necessityRows": [
    {
      "archetype": "Balance Sheet Acquisition",
      "classification": "Required but scaled",
      "rationale": "Required at lower intensity because records, balances, reporting and control evidence often need data movement, but scope is likely to be smaller than other archetypes. May scale if data sets are complex"
    },
    {
      "archetype": "Partial Business Acquisition",
      "classification": "Core / Required",
      "rationale": "Core because complete, accurate, secure and reconciled movement of transaction data is the most critical transaction element across archetypes"
    },
    {
      "archetype": "Full Business Acquisition A (Buyer integrates the business)",
      "classification": "Core / Required",
      "rationale": "Core because complete, accurate, secure and reconciled movement of transaction data is the most critical transaction element across archetypes"
    },
    {
      "archetype": "Full Business Acquisition B (Buyer runs the business standalone)",
      "classification": "Required but scaled",
      "rationale": "Required at scaled intensity because records, balances, reporting and control evidence often need data movement is likely required, but at a lower scale if business will operate standalone"
    },
    {
      "archetype": "Balance Sheet Sale",
      "classification": "Required but scaled",
      "rationale": "Required at lower intensity because records, balances, reporting and control evidence often need data movement, but scope is likely to be smaller than other archetypes. May scale if data sets are complex"
    },
    {
      "archetype": "Partial Business Sale",
      "classification": "Core / Required",
      "rationale": "Core because complete, accurate, secure and reconciled movement of transaction data is the most critical transaction element across archetypes"
    },
    {
      "archetype": "Full Business Sale A (Buyer integrates the business)",
      "classification": "Core / Required",
      "rationale": "Core because complete, accurate, secure and reconciled movement of transaction data is the most critical transaction element across archetypes"
    },
    {
      "archetype": "Full Business Sale B (Buyer runs the business as standalone)",
      "classification": "Required but scaled",
      "rationale": "Required at scaled intensity because records, balances, reporting and control evidence often need data movement is likely required, but at a lower scale if business will operate standalone"
    }
  ],
  "keyRole": "Owns the data migration delivery path from source-to-target mapping through cutover and reconciliation",
  "responsibilities": [
    "Agree source and target data dictionaries, source-system access, target-system requirements and secure transfer protocols",
    "Define source-to-target mapping, transformation logic, data cleansing, exception handling and reconciliation approach",
    "Conduct data quality assessments, both on the structure and business usage of masked fields, and the detailed content of unmasked fields once received",
    "Build and test migration routines, controlled extracts, mock loads, reporting data feeds and rollback",
    "Coordinate data cuts, dress rehearsals, final data load, reconciliation and migration sign-off",
    "Manage data migration defects, quality issues, lineage evidence and handover to BAU data owners."
  ],
  "boundaryItems": [
    "Technology owns environments, interfaces and platform build",
    "Independent Assurance independently validates migration design and results",
    "Business workstreams own the business meaning and acceptance criteria for their data fields"
  ],
  "centralHubRelationship": "Relationship with Central Hub: the SA Functional Spoke owns data migration decisions and plan which should form the backbone of the programme plan owned by the Central Hub",
  "regionalRelationship": [
    "Regional Spokes should own local execution as a minimum, with ownership scaling based on maturity, including source-data evidence, local data-owner sign-off, cleansing, reconciliation support, cutover steps and exception resolution where they have capacity and delegated authority.",
    "Function Authority retains migration design, source-to-target standards, central tooling, reconciliation methodology, control evidence standards and execution ownership where regional maturity, capability or capacity is insufficient.",
    "As regional maturity increases, local ownership should expand from evidence provision into data cleansing, reconciliation, mock-load support and cutover activity, with Function Authority retaining standards, specialist challenge and reserved approvals."
  ],
  "externalDependencies": "External or counterparty dependencies are managed through the Central Hub governance route where timing, data, approvals or joint readiness affect LD1",
  "mandateRows": [
    {
      "id": "migration-design",
      "area": "Migration design",
      "spokeAuthority": [
        "Owns technical migration design with business input"
      ],
      "hubRole": "Coordinates critical path and cross-workstream dependencies",
      "regionalRole": "",
      "governance": "Technology, Data Governance, Risk and Compliance approval",
      "escalation": "Data not extractable, target not ready or privacy restriction"
    },
    {
      "id": "data-quality-treatment",
      "area": "Data quality treatment",
      "spokeAuthority": [
        "Recommends cleansing and exception approach, validated by business"
      ],
      "hubRole": "Escalates business impact and timing",
      "regionalRole": "",
      "governance": "Business data owner and Risk approval",
      "escalation": "Material unreconciled population or data-quality defect"
    },
    {
      "id": "migration-readiness",
      "area": "Migration readiness",
      "spokeAuthority": [
        "Recommends migration readiness status"
      ],
      "hubRole": "Integrates with dress rehearsal and go/no-go",
      "regionalRole": "",
      "governance": "Programme governance and data owner approval",
      "escalation": "Failed rehearsal or unresolved reconciliation issue"
    },
    {
      "id": "cutover-approach",
      "area": "Cutover approach",
      "spokeAuthority": [
        "Owns the overall cutover strategy, with input from other functions"
      ],
      "hubRole": "Coordinates cutover planning and execution",
      "regionalRole": "",
      "governance": "Programme governance",
      "escalation": "Failed rehearsal"
    },
    {
      "id": "fallback-and-rollback",
      "area": "Fallback and rollback",
      "spokeAuthority": [
        "Defines data rollback and exception route"
      ],
      "hubRole": "Owns command-centre integration",
      "regionalRole": "",
      "governance": "Technology, Risk and programme governance",
      "escalation": "Rollback not executable or would breach service continuity"
    },
    {
      "id": "data-migration-readiness-and-exceptions",
      "area": "Data Migration readiness and exceptions",
      "spokeAuthority": [
        "Recommends data migration readiness status, accepted exceptions and residual risk position"
      ],
      "hubRole": "Integrates into go/no-go and completion governance",
      "regionalRole": "",
      "governance": "Programme governance",
      "escalation": "Critical data migration readiness evidence, dependency or exception remains unresolved at go/no-go"
    }
  ],
  "capabilityRows": [
    {
      "category": "Specific Project Manager required?",
      "content": "Yes - technical migration delivery usually requires a dedicated migration PM or lead with plan, defect and cutover control"
    },
    {
      "category": "Baseline capabilities",
      "content": "Data architecture, data mapping, ETL, cleansing, reconciliation, secure transfer, cutover planning and defect management."
    },
    {
      "category": "Incremental capabilities by deal archetype / complexity",
      "content": "Client migration, multiple source systems, target-system build, data separation and reporting migration"
    },
    {
      "category": "Specialist capabilities triggered by deal characteristics",
      "content": "Privacy, HR data, financial-crime data, regulatory reporting, automated recons"
    }
  ],
  "milestoneIntro": [
    "The key milestones below are organised as a baseline set, with additional milestones required for more complex deal archetypes split out below as required.",
    "As deal archetypes scale from balance sheet to partial business to full business, each baseline activity should be assessed against the complexity factors laid out in the deal archetype documentation.",
    "Service catalogue:"
  ],
  "serviceCatalogue": [
    "Source to target mapping",
    "Migration solution design",
    "ETL solution build and test",
    "Cutover planning",
    "Dress rehearsal coordination and leadership"
  ],
  "activitySets": [
    {
      "id": "balance-sheet-acquisition",
      "heading": "Balance Sheet Acquisition - baseline activities",
      "tab": "Balance Sheet Acquisition",
      "milestones": [
        {
          "name": "Data migration solution and data dictionary requirements defined (4 weeks)",
          "activities": [
            "Confirm data domains, source systems, target systems, field ownership, mandatory attributes and record-level controls for the transaction perimeter.",
            "Agree data dictionaries, naming standards, reference data, data lineage expectations and evidence required for business acceptance.",
            "Define transfer protocols, controls, permissions and storage locations for files"
          ]
        },
        {
          "name": "Data structure and usage assessment (2 weeks)",
          "activities": [
            "Work with counterparty to assess the structure of data tables and structures provided in a masked format, to understand key differences, gaps, and quality issues",
            "Engage both Absa and Counterparty business stakeholders to understand what each field is actually used for, and whether there are any key differences between Absa and Counterparty practices"
          ]
        },
        {
          "name": "Source-to-target mapping conducted and business sign off secured (5 weeks)",
          "activities": [
            "Profile source data, identify quality gaps and map each source field to target fields, business rules and transformation logic",
            "Confirm Product, Operations, Finance, Risk and Compliance acceptance for the business meaning of mapped fields",
            "Track unresolved mapping decisions, assumptions and exclusions"
          ]
        },
        {
          "name": "Data migration ETL solution design complete (6 weeks)",
          "activities": [
            "Design extraction, transformation, load, validation, exception handling and reconciliations",
            "Define control totals, balancing checks, audit trail, rollback approach and defect severity rules",
            "Confirm Technology environment, connectivity, storage and scheduling dependencies needed to run the ETL solution"
          ]
        },
        {
          "name": "Data migration ETL solution build complete (8 weeks)",
          "activities": [
            "Build ETL routines, migration scripts, validation reports, exception reports and reconciliation outputs.",
            "Configure access, environments, run controls and source-file intake processes with Technology.",
            "Complete unit testing and evidence capture before handing into SIT or mock-run cycles."
          ]
        },
        {
          "name": "Data migration testing, including build, SIT, and mock runs (6 weeks)",
          "activities": [
            "Run build testing, SIT, data-quality testing and mock migration cycles against agreed success criteria.",
            "Validate completeness, accuracy, record counts, balances, rejected records, exceptions and usability",
            "Log defects, retest fixes and obtain acceptance for exceptions from data owners and business"
          ]
        },
        {
          "name": "Unmasked data quality assessment (1 week)",
          "activities": [
            "Conduct a full data quality assessment on unmasked data once received",
            "Flag any material quality issues, structural differences, or unexpected deviations from masked data previously provided",
            "Define remediation plan or operational workarounds for cutover"
          ]
        },
        {
          "name": "Cutover planning conducted (2 weeks)",

          "activities": [
            "Build the data cutover runbook covering extracts, freezes, transfer windows, load sequence, validations, rollback and communications",
            "Align cutover timing with Technology, Operations, E2E Testing, Finance, Risk, Compliance and Client Readiness.",
            "Confirm owners, timings, dependencies, evidence and fallback decision points for final load"
          ]
        },
        {
          "name": "Dress Rehearsals led and assessed (3 weeks)",
          "activities": [
            "Run dress rehearsals using production-like data, production-like timing and agreed success criteria",
            "Assess rehearsal outcomes for data quality, run duration, reconciliation, exception handling and downstream readiness.",
            "Update migration design, cutover runbook and readiness evidence based on rehearsal findings."
          ]
        },
        {
          "name": "Data Migration readiness assessed (2 weeks)",
          "activities": [
            "Issue a readiness view covering mapping, build, testing, reconciliation, exceptions, cutover plan and residual data risks.",
            "Confirm no unresolved data-quality issue prevents go/no-go, regulatory evidence, customer outcomes or financial reporting.",
            "Transfer open data actions to hypercare or BAU with clear ownership"
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
          "name": "Assessment of data perimeter undertaken (3 weeks)",
          "activities": [
            "Separate transferring, retained, shared and excluded records, including customer, product, operational, employee and reporting data",
            "Define data ownership and retention requirements across Absa and counterparty",
            "Identify data sets that require local country input, privacy review, regulator consideration or business sign-off"
          ]
        },
        {
          "name": "Employee data scoped and solution built (8 weeks)",
          "activities": [
            "Confirm employee data fields required for consultation, onboarding, payroll, benefits, pensions and HR systems.",
            "Apply privacy, access, masking or unmasked data controls with Human Capital, Legal, Compliance and Technology.",
            "Build and test secure employee data extracts, validations and transfer evidence."
          ]
        },
        {
          "name": "Technology platform transfer data requirements understood and solution built (8 weeks)",
          "activities": [
            "Identify platform, access, configuration, reference-data and reporting data needed to support technology transfer or integration.",
            "Agree hand-off boundaries with Technology - data migration owns data content and Technology owns platform build and environments",
            "Build and test feeds, files, conversion rules and reconciliation outputs required for platform transfer."
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
          "name": "External data migration assurance partners engaged and collaboration underway (3 weeks)",
          "activities": [
            "Confirm assurance scope, evidence requests, data access, sample approach and timing with Independent Assurance and external partners.",
            "Align assurance work with Risk, Internal Audit, Technology and Client readiness to avoid duplicate evidence requests.",
            "Track assurance findings and remediation actions through migration governance."
          ]
        },
        {
          "name": "Assessment of external parallel solution to Absa solution accuracy, and remediation (7 weeks)",
          "activities": [
            "Compare external parallel-build results to Absa migration outputs across record counts, balances, samples, rejects and exceptions.",
            "Investigate variances, agree root cause, update transformation logic or source data remediation and retest",
            "Document accepted residual differences with accountable business, Finance and Risk owners."
          ]
        },
        {
          "name": "Joint agreement on data migration readiness with external assurance (2 weeks)",
          "activities": [
            "Obtain readiness agreement covering mapping, ETL build, mock runs, dress rehearsals, reconciliations and residual defects.",
            "Confirm readiness evidence can support LD1 go/no-go",
            "Agree post-LD1 monitoring and exception ownership with data owners"
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
          "name": "Assessment of data perimeter undertaken (3 weeks)",
          "activities": [
            "Define the full data perimeter required for standalone operation, including customer, product, finance, risk, compliance, employee, supplier and reporting data.",
            "Identify retained seller data, Absa-owned data, third-party data and local country data required for Day 1 and BAU operation.",
            "Agree data governance, data owners, retention requirements and privacy controls for the standalone business."
          ]
        },
        {
          "name": "Source-to-target mapping conducted and business sign off secured (5 weeks)",
          "activities": [
            "Map all required source fields to standalone target systems, reporting structures, controls and operating processes.",
            "Confirm business, product owner, operations, finance, risk and compliance acceptance for mapped data and exclusions.",
            "Track unresolved mapping decisions through governance"
          ]
        },
        {
          "name": "Data migration ETL solution design complete (6 weeks)",
          "activities": [
            "Design full extraction, transformation, load, validation, reconciliation, audit and rollback routines for standalone",
            "Define migration run sequencing for core systems, channels, reporting platforms, HR systems and supplier or third-party data feeds",
            "Confirm environment, integration and infrastructure requirements with Technology."
          ]
        },
        {
          "name": "Data migration ETL solution build complete (8 weeks)",
          "activities": [
            "Build migration routines, validation reports, exception reporting, reconciliation dashboards and evidence outputs.",
            "Configure secure data stores, transfer processes, scheduling and access controls.",
            "Complete build testing and technical readiness checks before mock-runs"
          ]
        },
        {
          "name": "Data migration testing, including build, SIT, and mock runs (6 weeks)",
          "activities": [
            "Run iterative SIT and mock migration cycles using production-like volumes and business acceptance criteria",
            "Validate completeness, accuracy, timeliness, control totals, downstream usability and reporting outputs",
            "Remediate defects, retest fixes and confirm exceptions"
          ]
        },
        {
          "name": "Cutover planning conducted (2 weeks)",
          "activities": [
            "Build a data cutover runbook covering source freezes, final extracts, load windows, validations, rollback and readiness reporting.",
            "Align data cutover with Technology deployment, Operations readiness, Finance reporting, HR onboarding and Compliance obligations.",
            "Confirm resource coverage, run ownership and escalation for cutover and post-LD1 data issues."
          ]
        },
        {
          "name": "Dress Rehearsals led and assessed (3 weeks)",
          "activities": [
            "Run dress rehearsals across all data domains needed for the standalone operating model.",
            "Measure run duration, failure points, reconciliation performance, exception handling and downstream process readiness.",
            "Update migration routines, operating procedures and readiness evidence after each rehearsal."
          ]
        },
        {
          "name": "Data Migration readiness assessed (2 weeks)",
          "activities": [
            "Issue final readiness evidence covering full data migration scope, build, tests, defects, reconciliation, cutover and residual risks.",
            "Confirm data owners, Technology, Risk, Compliance, Finance and Independent Assurance accept readiness or residual issues.",
            "Transfer open defects and monitoring obligations into hypercare and BAU data governance."
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
          "name": "Data migration solution and data dictionary requirements defined alongside buyer (6 weeks)",
          "activities": [
            "Agree buyer and Absa data requirements, file formats, data dictionary, field definitions, controls and evidence standards",
            "Confirm secure transfer protocols, confidentiality constraints, privacy requirements and regulatory limits on data sharing",
            "Define buyer and seller ownership for mapping queries, rejected records, reconciliation and acceptance"
          ]
        },
        {
          "name": "Assessment of retained data assets and data perimeter undertaken (3 weeks)",
          "activities": [
            "Identify data that transfers, data that remains with Absa, shared records, historical records, reporting data and excluded records.",
            "Confirm Absa retention, archive, access removal, legal hold and regulator requirements",
            "Map data dependencies to Finance, Risk, Compliance, Operations, Technology and Legal obligations."
          ]
        },
        {
          "name": "Support of buyer with source-to-target mapping complete (5 weeks)",
          "activities": [
            "Provide source data definitions, lineage, sample files, field logic and guidance to support mapping",
            "Respond to buyer mapping queries through the Central Hub and formal issue process.",
            "Track buyer acceptance, open questions and mapping risks that affect transfer readiness."
          ]
        },
        {
          "name": "Data cuts pulled and provided to buyer (4 weeks)",
          "activities": [
            "Extract agreed data cuts in line with timing, approval, privacy and confidentiality controls",
            "Validate record counts, balances, control totals, completeness and file integrity before transfer."
          ]
        },
        {
          "name": "Joint testing of the migration solution complete (6 weeks)",
          "activities": [
            "Support buyer test cycles with source-file explanations, defect triage and reconciliation evidence.",
            "Validate Absa-side extract routines, retained data controls and transfer evidence."
          ]
        },
        {
          "name": "Dress rehearsals led from Absa perspective, supporting buyer activities (3 weeks)",
          "activities": [
            "Run Absa extract and transfer steps during buyer dress rehearsals using agreed success criteria.",
            "Confirm timing, file transfer, evidence capture, exception handling and escalation routes work as planned.",
            "Update Absa runbooks and buyer hand-off processes based on rehearsal outcomes."
          ]
        },
        {
          "name": "Absa readiness to provide accurate and complete data assessed (2 weeks)",
          "activities": [
            "Issue an Absa readiness view covering data completeness, accuracy, extract controls, transfer controls and open defects.",
            "Confirm readiness with Legal, Compliance, Risk, Finance and relevant data owners before LD1.",
            "Transfer residual issues to post-LD1 support or BAU owners."
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
          "name": "Employee data scoped and provided to buyer (6 weeks)",
          "activities": [
            "Agree employee data fields, privacy controls, approvals, timing and transfer route with Human Capital, Legal and Compliance.",
            "Validate completeness, accuracy and file integrity before buyer transfer."
          ]
        },
        {
          "name": "Technology platform data required for transfer scoped and provided (8 weeks)",
          "activities": [
            "Identify platform, access, configuration, reporting and reference data required by the buyer for transfer",
            "Confirm with Technology which data is required for platform readiness and which remains a technology build responsibility.",
            "Extract, validate and transfer agreed platform data through controlled channels."
          ]
        },
        {
          "name": "Retained and shared data controls confirmed (6 weeks)",
          "activities": [
            "Define controls for shared data, retained records, data access, reporting and TSA-backed processes",
            "Validate that Absa retained data remains complete, accurate and available after transfer.",
            "Confirm data owner handover and monitoring for post-LD1 exceptions."
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
          "name": "External data migration assurance partners engaged and collaboration underway (3 weeks)",
          "activities": [
            "Agree assurance scope, evidence needs, data access and timing with the buyer, Independent Assurance and external partners.",
            "Coordinate assurance activity with Risk, Technology, Legal and Client Readiness.",
            "Track findings, remediation and sign-off dependencies through joint governance."
          ]
        },
        {
          "name": "Assessment of external parallel solution to Absa solution accuracy, and remediation (7 weeks)",
          "activities": [
            "Compare Absa extract outputs to external or buyer parallel results across counts, balances, samples, rejects and exceptions.",
            "Investigate differences, correct source extracts or transformation logic and retest.",
            "Agree residual variances with buyer, Finance, Risk and data owners."
          ]
        },
        {
          "name": "Joint agreement on data migration readiness with external assurance (2 weeks)",
          "activities": [
            "Secure agreement on data readiness, open defects, accepted residual risks and post-LD1 monitoring.",
            "Confirm assurance evidence can support integration, Absa exit controls",
            "Transfer residual data issues to buyer, Absa BAU or post-completion obligation owners."
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
          "name": "Assessment of data migration solution requirements from Absa group to support standalone run state (7 weeks)",
          "activities": [
            "Define data Absa must provide for the buyer to run the divested business standalone, including historical, operational, regulatory and reporting data.",
            "Confirm data dependencies linked to TSA services, buyer platform build, local country requirements and retained Absa obligations.",
            "Agree evidence standards and data ownership for post-completion support."
          ]
        },
        {
          "name": "Data migration solution and data dictionary requirements defined alongside buyer (6 weeks)",
          "activities": [
            "Agree target file formats, field definitions, lineage, validation rules, privacy controls and acceptance criteria with the buyer.",
            "Define data dictionary ownership, mapping query process and version control.",
            "Confirm access, confidentiality and approval gates before data is shared."
          ]
        },
        {
          "name": "Support of buyer with source-to-target mapping complete (5 weeks)",
          "activities": [
            "Provide source-system definitions, data lineage, transformation assumptions and sample records to support buyer mapping.",
            "Resolve buyer queries and local country data questions through the formal issue route.",
            "Track buyer mapping acceptance and open risks through joint governance."
          ]
        },
        {
          "name": "Data cuts pulled and provided to buyer (4 weeks)",
          "activities": [
            "Execute agreed data extracts, quality checks, control totals and secure file transfers.",
            "Evidence file versions, approvals, transfer times, buyer receipt and reconciliation results.",
            "Manage rejected records, late data changes and restatement requirements."
          ]
        },
        {
          "name": "Joint testing of the migration solution complete (6 weeks)",
          "activities": [
            "Support buyer testing and Absa-side retained control testing across standalone run-state data.",
            "Validate transferred data against agreed completeness, accuracy and usability criteria.",
            "Close defects or agree residual issues with accountable owners."
          ]
        },
        {
          "name": "Absa readiness to provide accurate and complete data assessed (2 weeks)",
          "activities": [
            "Issue final Absa data readiness sign-off for standalone transfer, including retained records and post-LD1 support obligations.",
            "Confirm open exceptions, monitoring and ownership with buyer, Legal, Compliance, Risk and Finance.",
            "Archive migration evidence for audit, regulator and post-completion dispute support."
          ]
        }
      ]
    }
  ],
  "sizingFactors": "",
  "sizingDrivers": ["Significant number of accounts must be migrated", "High value of accounts to be migrated", "Complex source-to-target mapping", "New environments required"],
  "partnerServices": [
    {
      "keyService": "Source to target mapping",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Migration solution design",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "ETL solution build and test",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Cutover planning",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    },
    {
      "keyService": "Dress rehearsal coordination and leadership",
      "absaOwned": "Functional Lead to provide",
      "preferredVendor": "Functional Lead to provide"
    }
  ]
};
