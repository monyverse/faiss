# Add two geography questions to the Deal Intake Assessment

Two new questions are added at the end of every question path (both Acquisition and Divestment), after the existing final question.

## New questions

1. **What is the geographical scope of the deal?**
   - Single geography — the deal is confined to one geography
   - Multi-geography — the deal spans more than one geography

2. **How complex is the regulatory landscape of the geographies involved?**
   - Simple — existing regulator relationships, single regulator, clear expectations and requirements
   - Complex — multi-regulator, opaque regulatory landscape, minimal existing regulator relationships

Both are asked on every branch (no conditional logic), and both are required before results can be viewed.

## Complexity logic

- Single geography: no change. Multi-geography: complexity +1.
- Simple regulatory landscape: no change. Complex: complexity +1.

Each uplift adds a named driver to the "What raised the complexity rating" list on the results page:
- "Deal spans multiple geographies"
- "Complex regulatory landscape across the geographies involved"

Complexity still caps at Very high. Deal archetype and deal factors are unaffected.

## Results page

Both answers appear in the existing transaction summary table automatically, labelled "Geographical scope" and "Regulatory landscape".

## Technical notes

- `src/lib/archetype.ts`: add `geoScope` and `regComplexity` to `Answers`, append two `Question` entries (no `when` guard) after `newProducts`, and add the two `uplift()` calls in `assess()`. The summary table and completeness check derive from `visibleQuestions`, so no further wiring is needed.
- `src/routes/deal-intake.tsx`: no logic change expected; the wizard renders questions from the config. Verify the step counter and progress bar pick up the two extra steps.
