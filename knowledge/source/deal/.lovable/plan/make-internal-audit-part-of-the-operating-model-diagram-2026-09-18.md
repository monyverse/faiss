# Make Internal Audit part of the operating model diagram

## Current state

Internal Audit already appears as the full-width band at the bottom of the SA Functional Spokes diagram, but it is plain text only — unlike the Change Management band at the top, it cannot be clicked, so its content page is unreachable from the diagram.

The Internal Audit content page itself already exists and is populated from the operating model document (responsibilities, mandate, milestones, catalogue of services, partner acceleration).

## What changes

- Turn the Internal Audit band into a link to its workstream page, styled to match the Change Management band at the top of the diagram (same border, hover and focus treatment).
- Add the same small status tag used on the Change Management band so both spanning bands read consistently.
- Nothing else in the diagram moves: the band stays full width at the bottom, spanning core and conditional workstreams.

## Technical notes

Edit only the Internal Audit block in `src/routes/operating-model.index.tsx` (currently a `div` around line 245): replace it with a `Link` to `/operating-model/spokes/$spokeId` with `spokeId: "internal-audit"`, reusing the Change Management band's class names. No data or content files change.
