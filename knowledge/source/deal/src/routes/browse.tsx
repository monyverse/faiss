import { createFileRoute } from "@tanstack/react-router";
import { BrandHeader } from "@/components/BrandHeader";
import { ContentDirectory } from "@/components/ContentDirectory";
import { useDealContext } from "@/lib/deal-context";

export const Route = createFileRoute("/browse")({
  head: () => ({
    meta: [
      { title: "Browse all Hub content | Absa M&A Capability Hub" },
      { name: "description", content: "An overview of everything in the Absa M&A Capability Hub, grouped by deal journey, roles, mobilisation and support." },
      { property: "og:title", content: "Browse all Hub content | Absa M&A Capability Hub" },
      { property: "og:description", content: "An overview of everything in the Absa M&A Capability Hub." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BrowsePage,
});

function BrowsePage() {
  const { archetypeId } = useDealContext();
  return (
    <div className="min-h-screen bg-background">
      <BrandHeader />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <p className="label-eyebrow">Content overview</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-maroon">Browse all Hub content</h1>
        <div className="mt-8">
          <ContentDirectory aId={archetypeId ?? "balance-sheet-acquisition"} />
        </div>
      </main>
    </div>
  );
}
