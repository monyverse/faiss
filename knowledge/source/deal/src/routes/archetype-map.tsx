import { createFileRoute, redirect } from "@tanstack/react-router";

/** Retired: the single lifecycle visual now lives on the Deal Lifecycle page. */
export const Route = createFileRoute("/archetype-map")({
  beforeLoad: () => {
    throw redirect({ to: "/deal-lifecycle", hash: "common-lifecycle", statusCode: 301 });
  },
});
