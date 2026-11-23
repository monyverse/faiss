import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/learning/central-hub")({
  component: CentralHubLayout,
});

function CentralHubLayout() {
  return <Outlet />;
}
