import { createFileRoute, Link } from "@tanstack/react-router";
import { RelatedGuidance } from "@/components/Wayfinding";
import { ArrowRight } from "lucide-react";
import { BrandHeader } from "@/components/BrandHeader";
import { PageToolbar } from "@/components/PageToolbar";
import { SPOKES } from "@/lib/operating-model";
import { getSpokeContent } from "@/lib/spoke-registry";

const DEDICATED_SPOKE_ROUTES: Record<string, string> = {
  procurement: "/operating-model/spokes/procurement",
  compliance: "/operating-model/spokes/compliance",
  "change-management": "/operating-model/spokes/change-management",
  "finance-tax": "/operating-model/spokes/finance-tax",
  risk: "/operating-model/spokes/risk",
  "data-migration": "/operating-model/spokes/data-migration",
  technology: "/operating-model/spokes/technology",
  "migration-assurance": "/operating-model/spokes/independent-assurance",
  "independent-assurance": "/operating-model/spokes/independent-assurance",
  "kyc-aml": "/operating-model/spokes/kyc-aml",
  "ld1-readiness": "/operating-model/spokes/ld1-readiness",
};

const TITLE = "Functional Blocks | Absa M&A Capability Hub";
const DESCRIPTION =
  "Every functional workstream in the operating model. Select a workstream for its role, decision mandate, capabilities and key milestones.";

export const Route = createFileRoute("/operating-model/spokes/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SpokesIndexPage,
});

function SpokeCard({ id }: { id: string }) {
  const spoke = SPOKES.find((s) => s.id === id)!;
  const dedicated = DEDICATED_SPOKE_ROUTES[spoke.id];

  const hasContent = Boolean(getSpokeContent(spoke.id));
  if (!dedicated && !hasContent) {
    return (
      <div
        aria-disabled="true"
        className="flex min-h-[9rem] flex-col rounded-xl border border-border/70 bg-muted/40 p-5"
      >
        <p className="text-sm font-semibold text-muted-foreground/80">{spoke.name}</p>
        <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground/70">
          {spoke.purpose}
        </p>
        <span className="mt-3 inline-block text-[0.5625rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground/60">
          Coming soon
        </span>
      </div>
    );
  }

  return (
    <Link
      to={(dedicated ?? "/operating-model/spokes/$spokeId") as never}
      params={(dedicated ? undefined : { spokeId: spoke.id }) as never}
      className="group flex min-h-[9rem] flex-col rounded-xl border border-maroon/20 bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-maroon/45 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold text-maroon">{spoke.name}</p>
        <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-maroon/60 transition-transform group-hover:translate-x-0.5" />
      </div>
      <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">{spoke.purpose}</p>
      <span className="mt-3 inline-block text-[0.5625rem] font-semibold uppercase tracking-[0.12em] text-maroon/70">
        {spoke.conditional ? "Conditionally required" : "Required workstream"}
      </span>
    </Link>
  );
}

function SpokesIndexPage() {
  const core = SPOKES.filter((s) => !s.conditional);
  const conditional = SPOKES.filter((s) => s.conditional);

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
          { label: "SA Functional Spokes" },
        ]}
        back={{
          label: "Back to operating model",
          to: "/operating-model",
          search: { archetype: "balance-sheet-acquisition" },
        }}
      />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="label-eyebrow mt-6">Functional Blocks</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-maroon">
          Functional workstreams
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
          {DESCRIPTION}
        </p>

        <section className="mt-10">
          <h2 className="font-display text-xl font-semibold text-maroon">Required workstreams</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {core.map((s) => (
              <SpokeCard key={s.id} id={s.id} />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-xl font-semibold text-maroon">
            Conditionally required workstreams
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Mobilised where the deal archetype and perimeter require them.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {conditional.map((s) => (
              <SpokeCard key={s.id} id={s.id} />
            ))}
          </div>
        </section>
        <RelatedGuidance links={[{ label: "Operating Model", to: "/operating-model", search: { archetype: "balance-sheet-acquisition" } }, { label: "Central Hub", to: "/operating-model/central-hub" }, { label: "Governance and transaction roles", to: "/operating-model/governance" }, { label: "Mobilisation Roadmap", to: "/mobilisation" }]} />
      </main>
    </div>
  );
}
