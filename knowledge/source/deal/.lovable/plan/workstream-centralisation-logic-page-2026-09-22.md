# Workstream Centralisation Logic page

A new page that explains how to decide whether a workstream is centralised or kept separate, linked from the bottom of the Operating Model page.

## Link placement

On the Operating Model page, next to the existing "Key success factors" and "activity-level RACI" links at the bottom, add a matching card: "Workstream Centralisation Logic" with a short line of supporting text, linking to the new page.

## The page

Absa-branded, same header, breadcrumb and back-to-operating-model toolbar as the other operating model pages.

### Decision tree (visual)

Three questions in sequence, each with a "No" branch that ends in "Kept separate":

```text
1. Is centralisation of this workstream likely to be legally allowed?
        | No  -> Kept separate
        v Yes
2. Is centralisation of this workstream within the spirit of the rules?
        | No  -> Kept separate
        v Yes
3. Is there material execution benefit to centralising this workstream?
        | No  -> Kept separate
        v Yes
   Centralised
```

Rendered as stacked question panels with maroon styling, a downward "Yes" path and a side "No" path into a muted "Kept separate" outcome chip; the final "Yes" leads to a filled maroon "Centralised" outcome.

### Assessment table

One row per workstream, one column per question, using a tick, cross or question mark (with accessible text labels):

| Workstream | Q1 legally allowed | Q2 spirit of the rules | Q3 material execution benefit |
| --- | --- | --- | --- |
| Comms & Marketing | tick | tick | tick |
| Finance & Tax | tick | ? | ? |
| Compliance | cross | cross | cross |
| Procurement | tick | tick | tick |
| Operations & Servicing | tick | tick | cross |
| Product | cross | cross | tick |
| Risk | cross | cross | cross |
| Data | merged across the three columns with the commentary below | | |
| Technology | tick | tick | tick |

Data row commentary (verbatim): "There may be benefit to centralising a ring-fenced data migration team, but consideration should be given to whether they would be able to have the requisite interaction with business to properly map and build a migration solution"

A small legend above the table explains tick / cross / question mark.

## Technical notes

- New route file `src/routes/operating-model.centralisation-logic.tsx` with its own `head()` metadata (title, description, og:title, og:description, og:type, twitter:card).
- Table data held in a local const array in the route file; the Data row is a merged-cell variant.
- Icons from `lucide-react` (Check, X, HelpCircle) with `sr-only` labels; colours from existing semantic tokens (maroon, blush, amber, muted).
- One added link block in `src/routes/operating-model.index.tsx`; no other content on that page changes.
