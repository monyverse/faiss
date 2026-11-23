import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { RelatedGuidance } from "@/components/Wayfinding";
import { ArrowLeft } from "lucide-react";
import { BrandHeader } from "@/components/BrandHeader";
import { PageToolbar } from "@/components/PageToolbar";
import {
  CENTRALISATION_PRINCIPLES,
  CROSS_CUTTING_MINIMUM,
  MATURITY_DIMENSIONS,
  MINIMUM_CAPABILITY_INTRO,
  REGIONAL_MANDATE,
  REGIONAL_RESPONSIBILITIES,
  REGIONAL_ROLE_PROFILES,
  WORKSTREAM_MINIMUMS,
} from "@/lib/regional-spoke";

export const Route = createFileRoute("/operating-model/regional/$spokeId")({
  loader: ({ params }) => {
    const minimum = WORKSTREAM_MINIMUMS[params.spokeId];
    if (!minimum) throw notFound();
    return { spokeId: params.spokeId, name: minimum.name, items: minimum.items };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.name} Regional Spoke | Absa M&A Capability Hub`;
    const description = `Minimum in-country skills, capabilities and requirements for the ${loaderData.name} Regional Spoke, with the shared maturity framework, responsibilities, decision mandate and centralisation principles.`;
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
  component: RegionalSpokePage,
});

function Heading({ title, intro }: { title: string; intro?: string }) {
  return (
    <div className="max-w-3xl">
      <h2 className="font-display text-xl font-semibold text-maroon sm:text-2xl">{title}</h2>
      {intro ? <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{intro}</p> : null}
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm leading-relaxed text-foreground">
          <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function RegionalSpokePage() {
  const { spokeId, name, items } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background">
      <BrandHeader />
      <PageToolbar
        crumbs={[
          { label: "Operating Model", to: "/operating-model" },
          { label: `${name} Regional Spoke` },
        ]}
      />
      <main className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <Link
          to="/operating-model"
          search={{ archetype: "balance-sheet-acquisition" }}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-maroon"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to operating model
        </Link>

        <p className="label-eyebrow mt-6">In-country Regional Spoke</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-maroon">
          {name}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground">
          {MINIMUM_CAPABILITY_INTRO}
        </p>

        {/* Workstream-specific minimum */}
        <section className="mt-12">
          <Heading
            title={`Minimum in-country capability: ${name}`}
            intro="The minimum local skills, capabilities and requirements to support transaction delivery for this workstream."
          />
          <div className="mt-4 rounded-xl border border-amber/40 bg-amber/10 p-5">
            <Bullets items={items} />
          </div>
          <Link
            to="/operating-model/spokes/$spokeId"
            params={{ spokeId }}
            className="mt-4 inline-block text-xs font-medium text-maroon hover:underline"
          >
            View the {name} SA Functional Spoke
          </Link>
        </section>

        {/* Cross-cutting minimum */}
        <section className="mt-14">
          <Heading title="Cross-cutting minimum" intro="Every country should have:" />
          <div className="mt-4 rounded-xl border border-border bg-card p-5">
            <Bullets items={CROSS_CUTTING_MINIMUM} />
          </div>
        </section>

        {/* Maturity dimensions */}
        <section className="mt-14">
          <Heading
            title="Maturity dimensions"
            intro="Local accountability should increase with capability and delegated authority."
          />
          <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full min-w-[54rem] text-left text-sm">
              <thead className="bg-surface text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Dimension</th>
                  <th className="px-4 py-3">Country baseline</th>
                  <th className="px-4 py-3">More mature</th>
                  <th className="px-4 py-3">Most mature</th>
                </tr>
              </thead>
              <tbody>
                {MATURITY_DIMENSIONS.map((row) => (
                  <tr key={row.dimension} className="border-t border-border align-top">
                    <td className="px-4 py-3 font-semibold text-maroon">{row.dimension}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.low}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.medium}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.high}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Responsibilities */}
        <section className="mt-14">
          <Heading title="Overall responsibilities by maturity" />
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {REGIONAL_RESPONSIBILITIES.map((row) => (
              <div key={row.maturity} className="rounded-xl border border-border bg-card p-5">
                <p className="label-eyebrow">{row.maturity}</p>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-foreground">
                  <p>
                    <span className="font-semibold text-maroon">Central Hub: </span>
                    {row.centralHub}
                  </p>
                  <p>
                    <span className="font-semibold text-maroon">Functional Spoke: </span>
                    {row.functionalSpoke}
                  </p>
                  <p>
                    <span className="font-semibold text-maroon">Regional Spoke: </span>
                    {row.regionalSpoke}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Decision mandate */}
        <section className="mt-14">
          <Heading title="Decision mandate" />
          <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full min-w-[60rem] text-left text-sm">
              <thead className="bg-surface text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Decision category</th>
                  <th className="px-4 py-3">Country baseline</th>
                  <th className="px-4 py-3">More mature</th>
                  <th className="px-4 py-3">Most mature</th>
                  <th className="px-4 py-3">Reserved authority</th>
                </tr>
              </thead>
              <tbody>
                {REGIONAL_MANDATE.map((row) => (
                  <tr key={row.category} className="border-t border-border align-top">
                    <td className="px-4 py-3 font-semibold text-maroon">{row.category}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.low}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.medium}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.high}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.reserved}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Role profiles */}
        <section className="mt-14">
          <Heading title="Role types and profiles" />
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {REGIONAL_ROLE_PROFILES.map((row) => (
              <div key={row.maturity} className="rounded-xl border border-border bg-card p-5">
                <p className="label-eyebrow">{row.maturity}</p>
                <p className="mt-3 text-sm leading-relaxed text-foreground">{row.profile}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {row.supportModel}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Centralisation principles */}
        <section className="mt-14">
          <Heading title="Centralisation principles" />
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-maroon/20 bg-blush p-5">
              <p className="text-sm font-semibold text-maroon">
                {CENTRALISATION_PRINCIPLES.remainCentralIntro}
              </p>
              <Bullets items={CENTRALISATION_PRINCIPLES.remainCentral} />
            </div>
            <div className="rounded-xl border border-amber/40 bg-amber/10 p-5">
              <p className="text-sm font-semibold text-maroon">
                {CENTRALISATION_PRINCIPLES.delegatedLocallyIntro}
              </p>
              <Bullets items={CENTRALISATION_PRINCIPLES.delegatedLocally} />
            </div>
          </div>
        </section>
        <RelatedGuidance links={[{ label: "Operating Model", to: "/operating-model", search: { archetype: "balance-sheet-acquisition" } }, { label: "Central Hub", to: "/operating-model/central-hub" }, { label: "Governance and transaction roles", to: "/operating-model/governance" }, { label: "Mobilisation Roadmap", to: "/mobilisation" }]} />
      </main>
    </div>
  );
}
