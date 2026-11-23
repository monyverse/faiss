import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/learning/in-country-pmo")({
  component: InCountryPmoLayout,
});

function InCountryPmoLayout() {
  return <Outlet />;
}
