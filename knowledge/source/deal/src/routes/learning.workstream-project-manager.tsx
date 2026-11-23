import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/learning/workstream-project-manager")({
  component: WorkstreamProjectManagerLayout,
});

function WorkstreamProjectManagerLayout() {
  return <Outlet />;
}
