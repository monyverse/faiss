import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { RelatedGuidance } from "@/components/Wayfinding";
import { ArrowRight } from "lucide-react";
import { BrandHeader } from "@/components/BrandHeader";
import { PageToolbar } from "@/components/PageToolbar";
import { COMPONENTS, SPOKES, PARTNER_CAPABILITIES, getComponent } from "@/lib/operating-model";

export const Route = createFileRoute("/operating-model/component/$componentId")({
  loader: ({ params }) => {
    const component = getComponent(params.componentId);
    if (!component) throw notFound();
    return { component };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.component.name} | Absa M&A Operating Model`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.component.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.component.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ComponentDetailPage,
});

function Panel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="label-eyebrow">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-relaxed text-foreground">
            <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-maroon/60" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ComponentDetailPage() {
  const { component } = Route.useLoaderData();
  const others = COMPONENTS.filter((c) => c.id !== component.id);

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
          { label: component.name },
        ]}
        back={{
          label: "Back to operating model",
          to: "/operating-model",
          search: { archetype: "balance-sheet-acquisition" },
        }}
      />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="label-eyebrow mt-6">{component.strapline}</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-maroon">
          {component.name}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
          {component.purpose}
        </p>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <Panel title="Responsibilities" items={component.responsibilities} />
          <Panel title="Services provided" items={component.services} />
          <Panel title="Decision rights" items={component.decisionRights} />
          <Panel title="Governance relationships" items={component.governance} />
          <Panel title="Required capabilities" items={component.capabilities} />
          <div className="grid gap-4">
            <Panel title="Key inputs" items={component.inputs} />
            <Panel title="Key outputs" items={component.outputs} />
          </div>
        </div>

        {component.id === "spokes" && (
          <section className="mt-12">
            <h2 className="font-display text-xl font-semibold text-maroon">
              Functional spokes in detail
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Select a spoke for its milestones, indicative activities, dependencies and support
              needs.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {SPOKES.map((spoke) => (
                <Link
                  key={spoke.id}
                  to="/operating-model/spokes/$spokeId"
                  params={{ spokeId: spoke.id }}
                  className="group rounded-lg border border-input bg-card p-4 transition-colors hover:border-maroon/45 hover:bg-surface"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-maroon">{spoke.name}</p>
                    <ArrowRight className="h-3.5 w-3.5 text-maroon/60 transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {spoke.conditional ? "Conditionally required" : "Core spoke"}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {component.id === "partners" && (
          <section className="mt-12">
            <h2 className="font-display text-xl font-semibold text-maroon">
              Partner accelerator capabilities
            </h2>
            <div className="mt-5 overflow-x-auto rounded-xl border border-border bg-card">
              <table className="w-full min-w-[52rem] text-left text-sm">
                <thead className="bg-surface text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Capability</th>
                    <th className="px-4 py-3 font-semibold">When external help is needed</th>
                    <th className="px-4 py-3 font-semibold">Advice or capacity</th>
                    <th className="px-4 py-3 font-semibold">Example providers</th>
                    <th className="px-4 py-3 font-semibold">How it is mobilised</th>
                  </tr>
                </thead>
                <tbody>
                  {PARTNER_CAPABILITIES.map((row) => (
                    <tr key={row.capability} className="border-t border-border align-top">
                      <td className="px-4 py-3 font-medium text-maroon">{row.capability}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.trigger}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-md border border-maroon/25 bg-blush px-2 py-1 text-[0.6875rem] font-semibold text-maroon">
                          {row.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{row.providers}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.mobilisation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <section className="mt-12 grid gap-3 border-t border-border pt-8 sm:grid-cols-2">
          {others.map((other) => (
            <Link
              key={other.id}
              to="/operating-model/component/$componentId"
              params={{ componentId: other.id }}
              className="rounded-lg border border-input px-5 py-4 text-sm font-medium text-foreground transition-colors hover:bg-surface"
            >
              {other.name}
            </Link>
          ))}
        </section>
        <RelatedGuidance links={[{ label: "Operating Model", to: "/operating-model", search: { archetype: "balance-sheet-acquisition" } }, { label: "Central Hub", to: "/operating-model/central-hub" }, { label: "Governance and transaction roles", to: "/operating-model/governance" }, { label: "Mobilisation Roadmap", to: "/mobilisation" }]} />
      </main>
    </div>
  );
}
