import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { RelatedGuidance } from "@/components/Wayfinding";
import { ArrowRight } from "lucide-react";
import { BrandHeader } from "@/components/BrandHeader";
import { PageToolbar } from "@/components/PageToolbar";
import { BucketIcon, MobilisationBlock } from "@/components/MobilisationBlocks";
import { BUCKETS, getBucket } from "@/lib/mobilisation";

export const Route = createFileRoute("/mobilisation/$bucketId")({
  loader: ({ params }) => {
    const bucket = getBucket(params.bucketId);
    if (!bucket) throw notFound();
    return { bucket };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Not found | Absa M&A Capability Hub" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.bucket.title} | Mobilisation Roadmap`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.bucket.purpose },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.bucket.purpose },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: BucketNotFound,
  component: BucketPage,
});

function BucketNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <BrandHeader />
      <main className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="font-display text-2xl font-semibold text-maroon">Section not found</h1>
        <Link
          to="/mobilisation"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-maroon hover:text-red"
        >
          Back to the Mobilisation Roadmap
          <ArrowRight className="h-4 w-4" />
        </Link>
      </main>
    </div>
  );
}

function BucketPage() {
  const { bucket } = Route.useLoaderData();
  const next = BUCKETS[BUCKETS.findIndex((b) => b.id === bucket.id) + 1];

  return (
    <div className="min-h-screen bg-background">
      <BrandHeader />
      <PageToolbar
        crumbs={[
          { label: "05) Mobilisation Roadmap", to: "/mobilisation" },
          { label: bucket.title },
        ]}
        back={{ label: "Back to the Mobilisation Roadmap", to: "/mobilisation" }}
      />

      <main className="mx-auto max-w-[1300px] px-4 pb-20 sm:px-6">
        <header className="pt-10">
          <div className="flex items-center gap-3">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-md ${
                bucket.emphasis === "gate"
                  ? "border border-red/50 bg-card text-red"
                  : "bg-blush text-maroon"
              }`}
            >
              <BucketIcon name={bucket.icon} className="h-4.5 w-4.5" />
            </span>
            <p className="label-eyebrow">
              {bucket.number} · {bucket.group}
            </p>
          </div>
          <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-maroon">
            {bucket.title}
          </h1>
          <div className="mt-4 h-0.5 w-16 bg-red" />
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-foreground">
            {bucket.purpose}
          </p>
        </header>

        <div className="mt-10 space-y-8">
          {bucket.blocks.map((block, i) => (
            <section key={i}>
              <MobilisationBlock block={block} />
            </section>
          ))}
        </div>

        {next ? (
          <div className="mt-12 border-t border-border pt-6">
            <Link
              to="/mobilisation/$bucketId"
              params={{ bucketId: next.id }}
              className="group inline-flex items-center gap-2 text-sm font-medium text-maroon transition-colors hover:text-red"
            >
              Next: {next.title}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        ) : null}
        <RelatedGuidance links={[{ label: "Mobilisation Roadmap", to: "/mobilisation" }, { label: "Operating Model", to: "/operating-model", search: { archetype: "balance-sheet-acquisition" } }]} />
      </main>
    </div>
  );
}
