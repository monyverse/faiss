import { createFileRoute } from "@tanstack/react-router";
import { BrandHeader } from "@/components/BrandHeader";
import { PageToolbar } from "@/components/PageToolbar";
import { PointList } from "@/components/LensPrinciples";
import { OVERARCHING_PRINCIPLES } from "@/lib/vision-content";

export const Route = createFileRoute("/design-principles")({
  head: () => ({
    meta: [
      { title: "Overarching design principles | Absa M&A Capability Hub" },
      { name: "description", content: "The overarching principles guiding all of the work behind the Absa M&A Capability Hub." },
      { property: "og:title", content: "Overarching design principles | Absa M&A Capability Hub" },
      { property: "og:description", content: "The principles driving the M&A Capability Hub and how its parts fit together." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DesignPrinciplesPage,
});

function DesignPrinciplesPage() {
  return (
    <div className="min-h-screen bg-background">
      <BrandHeader />
      <PageToolbar crumbs={[{ label: "Vision", to: "/vision" }, { label: "Overarching design principles" }]} />
      <main className="mx-auto max-w-6xl space-y-6 px-6 py-10">
        <header>
          <p className="label-eyebrow">How we built this</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-maroon">The principles driving this work</h1>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-muted-foreground">
            How the different parts of the capability fit together, and the core principles on which they're built.
          </p>
        </header>
        <article className="rounded-xl border border-maroon/25 bg-blush p-5 lg:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-maroon">{OVERARCHING_PRINCIPLES.label}</p>
          <h2 className="mt-2 font-display text-xl font-semibold text-maroon">{OVERARCHING_PRINCIPLES.title}</h2>
          <PointList points={OVERARCHING_PRINCIPLES.points} />
        </article>
      </main>
    </div>
  );
}
