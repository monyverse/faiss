import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronDown, Layers, Network, Timer, Users } from "lucide-react";
import { BrandHeader } from "@/components/BrandHeader";
import { PageToolbar } from "@/components/PageToolbar";
import { RelatedGuidance } from "@/components/Wayfinding";
import {
  ACTIVATION_ACTIONS,
  PARTNER_NODES,
  RELATIONSHIP_STATUSES,
  SERVICE_CATALOGUE,
  TBC,
} from "@/lib/partner-acceleration";

const TITLE = "Partner Accelerator | Absa M&A Capability Hub";
const DESCRIPTION =
  "Partner Acceleration helps functional owners identify where external capability or capacity may be required, understand which strategic partners can support delivery, and quickly activate the right partner when a deal requires it.";

export const Route = createFileRoute("/partner-acceleration")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PartnerAcceleratorPage,
});

const EXAMPLES = [
  {
    icon: Users,
    title: "Specialist capability required quickly",
    detail:
      "A workstream identifies a capability that is not available internally, but the transaction timetable does not allow time to source a provider from scratch.",
  },
  {
    icon: Timer,
    title: "Capacity constraint during a complex transaction",
    detail:
      "The relevant Absa team has the capability, but insufficient capacity to support both BAU activity and the transaction timetable.",
  },
  {
    icon: Layers,
    title: "New market or geography",
    detail:
      "A transaction requires local regulatory, legal, technology or operational expertise in a market where the team has limited existing capability.",
  },
];

function NodeCard({ node, index }: { node: (typeof PARTNER_NODES)[number]; index: number }) {
  return (
    <details
      open={index === 0}
      className="group overflow-hidden rounded-xl border border-border bg-card"
    >
      <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-4 transition-colors hover:bg-surface">
        <span className="flex-1 font-display text-sm font-semibold text-maroon">{node.name}</span>
        <span className="hidden text-[0.6875rem] uppercase tracking-[0.1em] text-muted-foreground sm:inline">
          Strategic partner: {node.strategicPartner}
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
      </summary>

      <div className="border-t border-border px-5 py-5">
        <p className="label-eyebrow">Catalogue of Services</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-3">
          {node.supportAreas.map((area, i) => (
            <li
              key={`${area}-${i}`}
              className="rounded-lg border border-border bg-surface px-3 py-2.5 text-xs leading-relaxed text-foreground"
            >
              {area}
            </li>
          ))}
        </ul>

        <div className="mt-5 overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[52rem] text-left text-xs">
            <thead className="bg-surface text-[0.625rem] uppercase tracking-[0.1em] text-muted-foreground">
              <tr>
                {[
                  "Service",
                  "Market / geography",
                  "Potential partner(s)",
                  "Relationship status",
                  "Activation action",
                ].map((col) => (
                  <th key={col} className="px-3 py-2.5 font-semibold">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {node.supportAreas.map((area, i) => (
                <tr key={`${area}-row-${i}`} className="border-t border-border align-top">
                  <td className="px-3 py-3 font-medium text-foreground">{area}</td>
                  <td className="px-3 py-3 text-muted-foreground">{TBC}</td>
                  <td className="px-3 py-3 text-muted-foreground">{TBC}</td>
                  <td className="px-3 py-3">
                    <span className="inline-block rounded-md border border-border bg-surface px-2 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                      {TBC}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-muted-foreground">
                    Confirm availability, agree scope, confirm commercials
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </details>
  );
}

function PartnerAcceleratorPage() {
  return (
    <div className="min-h-screen bg-background">
      <BrandHeader />
      <PageToolbar crumbs={[{ label: "Support" }, { label: "Partner Accelerator" }]} />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <p className="label-eyebrow">SUPPORT</p>
        <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight text-maroon sm:text-3xl">
          Partner Acceleration
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {DESCRIPTION}
        </p>

        {/* Decision prompt */}
        <section className="mt-8 rounded-xl border border-maroon/25 bg-card p-5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-blush text-maroon">
              <Network className="h-4 w-4" aria-hidden />
            </span>
            <h2 className="font-display text-base font-semibold text-maroon">
              Can Absa deliver this capability internally at the pace required by the deal?
            </h2>
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
            <div className="rounded-xl border border-border bg-surface p-4">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Yes &mdash; Absa owned
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground">
                The relevant Absa functional team retains delivery ownership.
              </p>
            </div>
            <ArrowRight
              className="mx-auto hidden h-4 w-4 self-center text-red lg:block"
              aria-hidden
            />
            <div className="rounded-xl border border-maroon/45 bg-blush p-4">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-maroon">
                No / additional support required &mdash; activate partner support
              </p>
              <p className="mt-2 text-sm leading-relaxed text-maroon">
                Identify the appropriate partner, confirm relationship status and complete the
                required activation actions.
              </p>
            </div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Partner support is used where it improves capacity, specialist capability, market access
            or speed of delivery.
          </p>
        </section>

        {/* Functional nodes */}
        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-maroon">
            Partner support by functional workstream
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Expand a workstream to review the areas where external support is most likely to be
            required, and to record partners, markets, relationship status and activation actions.
          </p>
          <div className="mt-5 space-y-3">
            {PARTNER_NODES.map((node, i) => (
              <NodeCard key={node.id} node={node} index={i} />
            ))}
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="label-eyebrow">Relationship status options</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {RELATIONSHIP_STATUSES.map((status) => (
                  <li
                    key={status}
                    className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-foreground"
                  >
                    {status}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="label-eyebrow">Activation actions</p>
              <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                {ACTIVATION_ACTIONS.map((action) => (
                  <li key={action} className="flex gap-2 text-xs leading-relaxed text-foreground">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red" aria-hidden />
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Why it matters */}
        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-maroon">
            Why partner acceleration matters
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Identifying likely support needs and usable partners early prevents mobilisation delays
            before they become critical-path issues.
          </p>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {EXAMPLES.map(({ icon: Icon, title, detail }) => (
              <div key={title} className="rounded-xl border border-border bg-card p-5">
                <p className="flex items-center gap-2 font-display text-sm font-semibold text-maroon">
                  <Icon className="h-4 w-4 shrink-0 text-red" aria-hidden />
                  {title}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Partner services catalogue */}
        <section className="mt-10">
          <h2 className="font-display text-lg font-semibold text-maroon">
            Partner services catalogue
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Use the catalogue to understand the external capabilities available to support each
            workstream and identify suitable strategic or specialist partners.
          </p>
          <div className="mt-5 overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <thead className="bg-surface text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">Service category</th>
                  <th className="px-4 py-3 font-semibold">What it covers</th>
                  <th className="px-4 py-3 font-semibold">Preferred partners</th>
                </tr>
              </thead>
              <tbody>
                {SERVICE_CATALOGUE.map((service) => (
                  <tr key={service.category} className="border-t border-border align-top">
                    <td className="px-4 py-4 font-medium text-maroon">{service.category}</td>
                    <td className="px-4 py-4 text-muted-foreground">{service.detail}</td>
                    <td className="px-4 py-4 text-muted-foreground">{TBC}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-6 border-l-2 border-maroon/50 bg-blush/40 px-4 py-3">
          <p className="text-sm leading-relaxed text-foreground">
            <span className="mr-2 inline-flex items-center rounded-full bg-maroon px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-maroon-foreground">
              N.B.
            </span>
            <span className="font-semibold text-maroon">Hub-led, country-owned</span> &mdash; the
            Partner Accelerator supplements the internal operating model. The Hub leads execution and
            programme governance, while ownership of execution sits within the country.
          </p>
        </section>
        <p className="mt-10 text-sm text-muted-foreground">
          Functional owners retain accountability for their workstream when partner support is used.
        </p>
        <RelatedGuidance
          links={[
            { label: "Operating Model", to: "/operating-model", search: { archetype: "balance-sheet-acquisition" } },
            { label: "Functional Spokes", to: "/operating-model/spokes" },
            { label: "Mobilisation Roadmap", to: "/mobilisation" },
          ]}
        />
      </main>
    </div>
  );
}
