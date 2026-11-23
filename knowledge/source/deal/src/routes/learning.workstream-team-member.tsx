import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/learning/workstream-team-member")({
  component: WorkstreamTeamMemberLayout,
});

function WorkstreamTeamMemberLayout() {
  return <Outlet />;
}
