# Align the operating model to the v0.3 document

Update the Central Hub, the RACI and every functional workstream so the site content matches the uploaded operating model document exactly, add the Catalogue of Services and the populated Key Services table, and give each regional spoke its own page of minimum in-country capabilities.

## 1. Workstream names

Align all names across the diagram, breadcrumbs and pages to the document's 18 workstreams, with no section numbers shown:

Communications / Marketing, Finance & Tax, Change Management, Compliance & Regulatory Approvals, Procurement, Operations & Servicing, Product (Business), Risk, Data Migration, Technology, Independent Assurance / External Audit, KYC / AML, Human Capital, E2E Testing, Client Readiness, Legal & CorpDev, CRES, Internal Audit.

Existing page addresses stay as they are so no link breaks.

## 2. Central Hub

Refresh the Central Hub page from Section 1 of the document: key role, high-level responsibilities, decision mandate and the key activities per deal archetype (Balance Sheet Acquisition baseline through to Full Business Sale B). Structure of the page stays as it is.

## 3. RACI

Replace the RACI rows with the document's Section 1.4 tables, keeping the current five-column layout (Central Hub, SA Functional Spoke, in-country Regional Spoke, executive governance, seller/buyer counterparty) and the existing page design.

## 4. All 18 workstream pages

Every workstream gets a full content page, replacing the current placeholder pages. Content comes verbatim from the document for each section, with no section lettering shown:

- Necessity by deal archetype
- Key role
- Overall responsibilities
- Decision mandate
- Key capabilities required
- Key milestones and activities, per archetype — opening with the Catalogue of Services (the document's service list) inside this section
- Factors impacting workstream size
- Partner Acceleration — the Key Service column populated from the document's service catalogue, with "Absa owned?" and "Preferred vendor" showing the document's "Functional Lead to provide" state

## 5. Regional spoke pages

The Regional Spoke layer becomes clickable per workstream. Each regional spoke page shows that workstream's minimum in-country skills, capabilities and requirements from Section 3, and links back to its functional spoke. A shared regional spoke overview carries the cross-cutting minimum requirements and the maturity framework.

## 6. Not touched

No changes to the Executive Summary principles, vision, lifecycle content, archetypes, mobilisation toolkit, governance pages or navigation styling.

## Technical notes

- Document converted to markdown for extraction; per-workstream content written into `src/lib/*-spoke.ts` files following the existing `SpokeContent` shape in `src/lib/spoke-content.ts`, extended with `serviceCatalogue: string[]` and `partnerServices: { keyService, absaOwned, preferredVendor }[]`.
- New workstream content files created for Operations & Servicing, Product, Legal & CorpDev, Human Capital, E2E Testing, CRES, Internal Audit and Client Readiness; existing files updated in place. Named routes added for each so the `$spokeId` placeholder route is no longer used for these.
- `SpokeWorkstreamPage.tsx` gains a Catalogue of Services section and a data-driven partner table (replacing the static `PartnerSupportTable` placeholder rows); section nav updated.
- New `src/lib/regional-spokes.ts` holds Section 3 cross-cutting and per-workstream minimums, surfaced through new `operating-model.regional/*` routes with their own head metadata.
- Central Hub data in `src/lib/central-hub.ts` / `central-hub-mandate.ts` updated; `src/lib/operating-model.ts` spoke names and references aligned.
- Extraction and content writing split across parallel subagents by workstream, then typechecked with `tsgo` and each page loaded to confirm it renders.
