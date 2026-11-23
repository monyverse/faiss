import { createFileRoute, redirect } from "@tanstack/react-router";

/** Retired: opens the Deal Lifecycle page with this archetype selected. */
export const Route = createFileRoute("/archetypes/$archetypeId")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/deal-lifecycle", search: { archetype: params.archetypeId }, hash: "archetypes", statusCode: 301 });
  },
});
