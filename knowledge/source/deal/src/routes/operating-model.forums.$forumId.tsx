import { createFileRoute, notFound } from "@tanstack/react-router";
import { RelatedGuidance } from "@/components/Wayfinding";
import { BrandHeader } from "@/components/BrandHeader";
import { PageToolbar } from "@/components/PageToolbar";
import { GovernanceTermsOfReference } from "@/components/GovernanceTermsOfReference";
import { TemplatePlaceholders } from "@/components/TemplatePlaceholders";
import { getForum } from "@/lib/governance-forums";

export const Route = createFileRoute("/operating-model/forums/$forumId")({
  loader: ({ params }) => {
    const forum = getForum(params.forumId);
    if (!forum) throw notFound();
    return { forum };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Forum unavailable | Absa M&A Operating Model" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${loaderData.forum.name} Terms of Reference | Absa M&A Operating Model`;
    const description = loaderData.forum.objective;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ForumPage,
  notFoundComponent: ForumNotFound,
});

function Shell({ label, children }: { label: string; children: React.ReactNode }) {
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
          { label },
        ]}
        back={{ label: "Back to governance", to: "/operating-model/governance" }}
      />
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">{children}  <RelatedGuidance links={[{ label: "Operating Model", to: "/operating-model", search: { archetype: "balance-sheet-acquisition" } }, { label: "Central Hub", to: "/operating-model/central-hub" }, { label: "Governance and transaction roles", to: "/operating-model/governance" }, { label: "Mobilisation Roadmap", to: "/mobilisation" }]} />
      </main>
    </div>
  );
}

function ForumNotFound() {
  return (
    <Shell label="Forum">
      <h1 className="font-display text-2xl font-semibold text-maroon">Forum not found</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        That governance forum does not exist in the governance structure.
      </p>
    </Shell>
  );
}

function ForumPage() {
  const { forum } = Route.useLoaderData();
  return (
    <Shell label={forum.short}>
      <p className="label-eyebrow mt-6">Forums and escalation</p>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-maroon">
        {forum.name}
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
        Terms of Reference
      </p>
      <div className="mt-8">
        <GovernanceTermsOfReference activeId={forum.id} hideSelector />
      </div>
      <section className="mt-8">
        <p className="label-eyebrow">Templates</p>
        <div className="mt-2">
          <TemplatePlaceholders forumId={forum.id} />
        </div>
      </section>
    </Shell>
  );
}
