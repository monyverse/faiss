# Redesign the Hub user journey and navigation

We're changing how people find their way around the Hub, not what it says. All existing pages, wording and web addresses stay as they are.

## 1. Content inventory (before any edits)
- List every page, heading, archetype, lifecycle stage and activity, role, functional and regional spoke, artefact, template reference, mobilisation day and Partner Accelerator entry.
- The list is kept in the project and used again at the end to check nothing is missing.

## 2. New top menu
Start here · Deal journey · Roles & operating model · Mobilise · Support · Search
- Each item except Search opens a small drop-down of the existing pages, grouped as the brief sets out.
- On phones it becomes one expandable menu with the same groups.
- The Absa Capability Hub name and logo stay in the header. The old header on every page is replaced by this one.

## 3. Homepage
- First screen: the Hub name, one line on what it's for, "What do you need help with?", a search box and four task buttons (new to the Hub / working on a transaction / understand my role / find something quickly).
- Then the recommended journey for new users: five linked steps. It is optional and never blocks the page.
- Then "Need deal-specific guidance?", labelled "Supporting AI agent · separate from this microsite". The project has no link to the agent yet, so this shows "Access provided separately".
- Then "Browse all Hub content" with the existing tiles (plus Role Pathways), followed by the existing outcome statement.

## 4. Search
- A search panel you can open from the header, the homepage, or by pressing "/".
- It searches the content already in the site: pages, archetypes, stages, activities, roles, spokes, artefacts, templates, mobilisation days and partner support.
- Results are grouped by type, each with a trail like "Lifecycle · Balance-sheet acquisition · Dress Rehearsals", and open the right page and section. No new server is needed.

## 5. Deal journey and context bar
- The Archetypes page gets a short step guide: Acquisition or divestment, then deal type, then "Use this archetype", which opens that lifecycle.
- The six archetype cards and the Archetype Map stay.
- The chosen archetype and stage are stored in the web address and in the browser, so they carry into the Operating Model and Mobilisation pages.
- A compact bar on Lifecycle, Operating Model and Mobilisation pages shows the current choice, e.g. "Balance-sheet acquisition · Mobilisation & Planning". It has Change archetype, Change stage and Back to deal journey. On phones it collapses to one line.

## 6. Lifecycle page
- The stage rail stays fixed at the top while you scroll and can be swiped on phones.
- Each stage's existing content is regrouped under four headings: What happens at this stage? · What must we do? · Who owns or supports it? · What evidence, artefacts and templates are needed?
- The wording stays the same, and so do the Necessary, Conditional and Optional labels.
- Each stage gets Previous, Next, Back to lifecycle, related operating-model links and mobilisation links (where relevant), plus the existing note that templates are sourced separately.

## 7. Operating Model page
- Five choices appear above the diagram: Central Hub, Find a spoke, Find a role, Governance and Role pathways.
- A filter box highlights matching spokes and roles. Nothing is removed from the diagram.
- A chosen archetype highlights relevant parts but hides nothing.
- The full diagram, detail pages and the "separate to organisational structure" note all stay.

## 8. Role Pathways, Mobilisation and Partner Accelerator
- **Role Pathways:** Workstream Lead is labelled "Available pathway". Operating-model role descriptions are listed separately, so it doesn't look as if other pathways exist.
- **Mobilisation:** adds a contents list that stays in view, quick links to Days 1–10, "Start with Day 1", a link back to your lifecycle stage and links to the relevant roles. All content and the tailoring statement stay.
- **Partner Accelerator:** moves under Support in the menu. The content doesn't change. Adds a link to the Operating Model and a line noting that functional owners stay accountable.

## 9. Links between pages, everywhere
- The same breadcrumb trail on every page.
- Every page ends with "Related guidance" and a next step, so there are no dead ends.
- The small AI agent signpost appears on the Lifecycle, Operating Model and Mobilisation pages.

## 10. Checks
- Re-run the inventory to confirm every item is still there.
- Test the 11 journeys in the brief on desktop and phone sizes, including old bookmarked addresses.

## Technical details
- New components: `SiteHeader` (mega-menu plus mobile menu, replacing `BrandHeader`/`AppHeader`), `GlobalSearch` (dialog, index built at load from `src/lib/*` data), `DealContextBar`, `AiAgentSignpost`, `RelatedGuidance`, `useDealContext` (search params, synced to localStorage).
- Optional `stage` search param on `/lifecycle/$archetypeId`. The `archetype` param is passed to `/operating-model` and `/mobilisation`.
- `src/lib/ai-agent.ts` exports `AI_AGENT_URL = null`, so adding the link later is a one-line change.
- A content inventory script writes to `/tmp` and is re-run after the changes to compare counts.
- All existing routes are kept, with no route renames.

## Open item
- Supporting AI agent web address: not provided. "Access provided separately" is shown until you send it.
