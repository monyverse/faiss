import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/learning/workstream-lead")({
  component: WorkstreamLeadLayout,
});

function WorkstreamLeadLayout() {
  return <Outlet />;
}
