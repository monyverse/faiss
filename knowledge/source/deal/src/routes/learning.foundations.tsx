import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/learning/foundations")({
  component: FoundationsLayout,
});

function FoundationsLayout() {
  return <Outlet />;
}
