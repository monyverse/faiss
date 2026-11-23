import { createFileRoute, redirect } from "@tanstack/react-router";

/** Retired: opens the Deal Lifecycle page on this archetype and stage. */
export const Route = createFileRoute("/lifecycle/$archetypeId")({
  validateSearch: (search: Record<string, unknown>): { stage?: string } =>
    typeof search["stage"] === "string" ? { stage: search["stage"] as string } : {},
  beforeLoad: ({ params, search }) => {
    throw redirect({ to: "/deal-lifecycle", search: { archetype: params.archetypeId, stage: search.stage }, hash: "apply", statusCode: 301 });
  },
});
