import { createFileRoute, redirect } from "@tanstack/react-router";

/** Retired: deal-specific centralisation guidance removed from the reusable Hub. */
export const Route = createFileRoute("/operating-model/centralisation-logic")({
  beforeLoad: () => {
    throw redirect({ to: "/operating-model", search: { archetype: "balance-sheet-acquisition" }, statusCode: 301 });
  },
});
