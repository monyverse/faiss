import { createFileRoute } from "@tanstack/react-router";
import { RelatedGuidance } from "@/components/Wayfinding";
import { AlertTriangle } from "lucide-react";
import { BrandHeader } from "@/components/BrandHeader";
import { PageToolbar } from "@/components/PageToolbar";
import { GOVERNANCE_FORUMS } from "@/lib/governance-forums";

export const Route = createFileRoute("/operating-model/remedial-actions")({
  head: () => ({
    meta: [
      { title: "Remedial Actions by Forum | Absa M&A Operating Model" },
      {
        name: "description",
        content:
          "Remedial actions for each governance forum, from workstream sessions through to the Joint SteerCo, where the forum is not working as intended.",
      },
      { property: "og:title", content: "Remedial Actions by Forum | Absa M&A Operating Model" },
      {
        property: "og:description",
        content:
          "What to do when a governance forum is not delivering: remedial actions for each group.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RemedialActionsPage,
});

function RemedialActionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <BrandHeader />
      <PageToolbar
        crumbs={[
          {
            label: "Operating Model",
            to: "/operating-model",
            search: { archetype: "balance-sheet-acquisition" },
          },
          { label: "Governance", to: "/operating-model/governance" },
          { label: "Remedial actions" },
        ]}
      />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="label-eyebrow mt-6">Governance</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-maroon">
          Remedial actions for each group
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
          Where a forum is not showing its signs of success, these are the remedial actions to take.
        </p>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {GOVERNANCE_FORUMS.map((forum) => (
            <section
              key={forum.id}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blush text-sm font-semibold text-maroon">
                  {forum.index}
                </span>
                <div>
                  <h2 className="font-display text-lg font-semibold text-maroon">{forum.name}</h2>
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                    {forum.kind === "joint" ? "Joint forum" : "Absa internal forum"} ·{" "}
                    {forum.cadence}
                  </p>
                </div>
              </div>
              <ul className="mt-4 space-y-2.5">
                {forum.remedial.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-foreground">
                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-maroon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <RelatedGuidance links={[{ label: "Operating Model", to: "/operating-model", search: { archetype: "balance-sheet-acquisition" } }, { label: "Central Hub", to: "/operating-model/central-hub" }, { label: "Governance and transaction roles", to: "/operating-model/governance" }, { label: "Mobilisation Roadmap", to: "/mobilisation" }]} />
      </main>
    </div>
  );
}
