import { createFileRoute, redirect } from "@tanstack/react-router";

/** Retired: Executive Summary content now lives on the Vision page. */
export const Route = createFileRoute("/executive-summary")({
  beforeLoad: () => {
    throw redirect({ to: "/vision", hash: "ambition", statusCode: 301 });
  },
});
