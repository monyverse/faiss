import { createFileRoute, redirect } from "@tanstack/react-router";

/** Retired: archetype content now lives on the Deal Lifecycle page. */
export const Route = createFileRoute("/archetypes/")({
  beforeLoad: () => {
    throw redirect({ to: "/deal-lifecycle", hash: "archetypes", statusCode: 301 });
  },
});
