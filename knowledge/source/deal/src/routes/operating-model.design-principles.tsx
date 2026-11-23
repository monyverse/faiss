import { createFileRoute } from "@tanstack/react-router";
import { BrandHeader } from "@/components/BrandHeader";
import { PageToolbar } from "@/components/PageToolbar";
import { LensPrinciples } from "@/components/LensPrinciples";
import { LENSES } from "@/lib/vision-content";

export const Route = createFileRoute("/operating-model/design-principles")({
  head: () => ({
    meta: [
      { title: "Operating Model design principles | Absa M&A Capability Hub" },
      { name: "description", content: "What the Operating Model is for, and the core principles on which the Hub and Spoke structure is built." },
      { property: "og:title", content: "Operating Model design principles | Absa M&A Capability Hub" },
      { property: "og:description", content: "The core principles behind Absa's Hub and Spoke M&A operating model." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: OmPrinciplesPage,
});

function OmPrinciplesPage() {
  const lens = LENSES.find((l) => l.id === "operating-model");
  return (
    <div className="min-h-screen bg-background">
      <BrandHeader />
      <PageToolbar crumbs={[{ label: "Vision", to: "/vision" }, { label: "Operating Model design principles" }]} />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <p className="label-eyebrow">How we built this</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-maroon">Operating Model design principles</h1>
        <div className="mt-8">{lens ? <LensPrinciples lens={lens} /> : null}</div>
      </main>
    </div>
  );
}
