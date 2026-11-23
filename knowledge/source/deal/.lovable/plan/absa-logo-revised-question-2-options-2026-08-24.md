# Absa logo + revised Question 2 options

## 1. Add the Absa logo

Upload the supplied "Your story matters / (absa)" artwork as a CDN asset and use it in the brand header in place of the current typographic "Absa" wordmark. The maroon header keeps its colour; the logo sits on the left, with the "In partnership with Elixirr" lock-up unchanged on the right.

Note: the supplied image is a maroon banner containing both a tagline and the absa roundel. If you have a standalone white absa logo (SVG/PNG, transparent), send it and I'll swap it in for a cleaner result; otherwise the banner is used as-is, sized to header height.

## 2. Question 2 answer options

Replace the current four multi-select perimeter options with three single-select, cumulative options:

1. Assets and liabilities
2. Assets and liabilities, and people
3. Assets and liabilities, and people, and systems / technology

Question 2 becomes a single-choice question (the cumulative wording makes multi-select redundant).

## Technical details

- `src/components/BrandHeader.tsx`: import the asset pointer and render `<img>` with alt text "Absa"; remove the typographic wordmark.
- `src/lib/archetype.ts`:
  - `PERIMETER_OPTIONS` becomes the three cumulative options with weights 1 / 2 / 3.
  - Question `perimeter` changes `kind` from `"multi"` to `"single"`; `Answers.perimeter` becomes `string`.
  - `assess()` derivations rewritten against the new values: perimeter breadth drives complexity weight; "people" and "systems/technology" flags now come from the selected tier rather than checkbox membership. The whole-legal-entity signal is carried by the existing entity-impact question (Q4), so entity archetype rules key off that.
  - Summary line and driver text updated to the new option labels.
- `src/routes/index.tsx`: multi-select branch no longer needed for this question; selecting an option advances as with other single-choice steps.

Archetype rules otherwise keep their current thresholds; complexity banding is unchanged.
