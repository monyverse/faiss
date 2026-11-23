import { SiteHeader } from "@/components/SiteHeader";

export type AppSection = "archetypes" | "lifecycles" | "operating-model" | "resources";

/** Kept for existing pages: renders the shared Hub header. */
export function AppHeader(_props: { active: AppSection }) {
  return <SiteHeader />;
}
