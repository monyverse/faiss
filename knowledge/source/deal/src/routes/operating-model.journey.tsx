import { createFileRoute, Link } from "@tanstack/react-router";
import { RelatedGuidance } from "@/components/Wayfinding";
import { FileText, Users } from "lucide-react";
import { BrandHeader } from "@/components/BrandHeader";
import { PageToolbar } from "@/components/PageToolbar";
import { DEAL_JOURNEY } from "@/lib/operating-model";

export const Route = createFileRoute("/operating-model/journey")({
  head: () => ({
    meta: [
      { title: "Deal Journey and Hub Involvement | Absa M&A Operating Model" },
      {
        name: "description",
        content:
          "The deal journey from one month before signing through mobilisation, execution, cutover and hypercare, showing what the Hub does, which artefacts are used and when each role and spoke is activated.",
      },
      {
        property: "og:title",
        content: "Deal Journey and Hub Involvement | Absa M&A Operating Model",
      },
      {
        property: "og:description",
        content:
          "Stage by stage view of Hub involvement, artefacts and activation of roles and spokes across the deal.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JourneyPage,
});

function JourneyPage() {
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
          { label: "Deal Journey" },
        ]}
        back={{
          label: "Back to operating model",
          to: "/operating-model",
          search: { archetype: "balance-sheet-acquisition" },
        }}
      />
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <p className="label-eyebrow mt-6">Deal journey</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-maroon">
          From one month before signing to run
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
          The Hub engages roughly a month before signature, so mobilisation begins the day the deal
          is announced rather than weeks later. Each stage sets out what the Hub does, the artefacts
          in use, and which roles and spokes are activated.
        </p>

        <ol className="relative mt-10 space-y-4 border-l border-maroon/25 pl-6">
          {DEAL_JOURNEY.map((stage, index) => (
            <li key={stage.name} className="relative">
              <span className="absolute -left-[1.9rem] top-4 flex h-5 w-5 items-center justify-center rounded-full bg-maroon text-[0.625rem] font-semibold text-maroon-foreground">
                {index + 1}
              </span>
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="rounded-md border border-maroon/25 bg-blush px-2 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-maroon">
                    {stage.window}
                  </span>
                  <p className="font-display text-base font-semibold text-maroon">{stage.name}</p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground">{stage.hubRole}</p>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="flex items-center gap-2 label-eyebrow">
                      <FileText className="h-3.5 w-3.5" /> Artefacts used
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {stage.artefacts.map((item) => (
                        <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                          <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-maroon/50" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="flex items-center gap-2 label-eyebrow">
                      <Users className="h-3.5 w-3.5" /> Activated at this stage
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {stage.activated.map((item) => (
                        <span
                          key={item}
                          className="rounded-md border border-input bg-surface px-2 py-1 text-xs text-foreground"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <section className="mt-12 flex flex-wrap gap-3 border-t border-border pt-8">
          <Link
            to="/operating-model/governance"
            className="rounded-md border border-input px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
          >
            Governance and resourcing
          </Link>
          <Link
            to="/operating-model/component/$componentId"
            params={{ componentId: "hub" }}
            className="rounded-md border border-input px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
          >
            Central M&amp;A Hub
          </Link>
        </section>
        <RelatedGuidance links={[{ label: "Operating Model", to: "/operating-model", search: { archetype: "balance-sheet-acquisition" } }, { label: "Central Hub", to: "/operating-model/central-hub" }, { label: "Governance and transaction roles", to: "/operating-model/governance" }, { label: "Mobilisation Roadmap", to: "/mobilisation" }]} />
      </main>
    </div>
  );
}
