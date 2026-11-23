import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { BrandHeader } from "@/components/BrandHeader";
import { PageToolbar } from "@/components/PageToolbar";
import { AiAgentSignpost, RelatedGuidance } from "@/components/Wayfinding";
import { writeDealContext } from "@/lib/deal-context";
import { createContext, useContext, useEffect, useState } from "react";
import { GOVERNANCE_ROLES } from "@/lib/operating-model";

const FilterCtx = createContext("");
const ArchetypeCtx = createContext<Record<string, string>>({});

/** Loose link between archetype workstream names and spokes, used only to highlight. */
const SPOKE_KEYWORDS: Record<string, string[]> = {
  comms: ["Communications"],
  "change-management": ["Change"],
  "finance-tax": ["Finance"],
  compliance: ["Regulatory", "Compliance"],
  legal: ["Legal"],
  "data-migration": ["Data"],
  technology: ["Technology"],
  hr: ["Human Capital"],
  "ops-servicing": ["Operations"],
  product: ["Product"],
  "ld1-readiness": ["Client"],
};
import { EXAMPLE_DEAL, getArchetype } from "@/lib/archetypes";
import { SPOKES } from "@/lib/operating-model";
import { WORKSTREAM_MINIMUMS } from "@/lib/regional-spoke";

type Search = { archetype: string };

export const Route = createFileRoute("/operating-model/")({
  validateSearch: (search: Record<string, unknown>): Search => {
    const raw = search["archetype"];
    const id = typeof raw === "string" ? raw : "";
    return { archetype: getArchetype(id) ? id : EXAMPLE_DEAL.archetypeId };
  },
  head: () => ({
    meta: [
      { title: "M&A Operating Model at a Glance | Absa M&A Capability Hub" },
      {
        name: "description",
        content:
          "Three components of the Absa M&A operating model: the Central M&A Hub, functional and regional spokes, and the partner accelerator network, with governance, resourcing and the deal journey.",
      },
      {
        property: "og:title",
        content: "M&A Operating Model at a Glance | Absa M&A Capability Hub",
      },
      {
        property: "og:description",
        content:
          "Central Hub, functional and regional spokes and a partner accelerator network, mobilised by deal archetype and lifecycle stage.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OperatingModelPage,
});

const CORE_SPOKE_IDS = [
  "comms",
  "finance-tax",
  "compliance",
  "procurement",
  "ops-servicing",
  "product",
  "data-migration",
  "technology",
  "legal",
].filter((id) => SPOKES.some((s) => s.id === id));
const CONDITIONAL_SPOKE_IDS = [
  "kyc-aml",
  "hr",
  "e2e-testing",
  "ld1-readiness",
  "cres",
].filter((id) => SPOKES.some((s) => s.id === id));

const LEGEND = [
  { label: "Central Hub", className: "border-maroon bg-maroon text-maroon-foreground" },
  { label: "Functional spoke", className: "border-maroon/25 bg-blush text-maroon" },
  {
    label: "Conditionally required",
    className: "border-dashed border-maroon/45 bg-surface text-muted-foreground",
  },
  { label: "Regional spoke", className: "border-amber/40 bg-amber/15 text-foreground" },
];

/** Regional Spoke minimum-capability pages are keyed by the document's workstream ids. */
const REGIONAL_SPOKE_IDS: Record<string, string> = {
  "migration-assurance": "independent-assurance",
};

function SpokeColumn({ id }: { id: string; conditional?: boolean }) {
  const spoke = SPOKES.find((s) => s.id === id)!;
  const regionalId = REGIONAL_SPOKE_IDS[spoke.id] ?? spoke.id;
  const q = useContext(FilterCtx).trim().toLowerCase();
  const matchState = !q ? "" : spoke.name.toLowerCase().includes(q) || "regional in-country".includes(q) ? "ring-2 ring-red ring-offset-2" : "opacity-40";
  const hasRegional = Boolean(WORKSTREAM_MINIMUMS[regionalId]);
  const boxClass =
    "flex min-h-[5rem] w-full flex-1 flex-col items-center justify-center gap-1 rounded-lg border px-2 py-3 text-center text-[0.625rem] font-semibold leading-[1.3] tracking-[-0.01em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  return (
    <div className={`flex w-[6.25rem] shrink-0 flex-col items-stretch rounded-lg transition-opacity ${matchState}`}>
      <Link
        to="/operating-model/spokes/$spokeId"
        params={{ spokeId: spoke.id }}
        className={`${boxClass} border-maroon/20 bg-blush text-maroon hover:border-maroon/45`}
      >
        <span
          lang="en"
          className="block w-full text-pretty [word-break:normal] [overflow-wrap:normal]"
        >
          {spoke.name}
        </span>

      </Link>
      <div className="h-4" />
      {hasRegional ? (
        <Link
          to="/operating-model/regional/$spokeId"
          params={{ spokeId: regionalId }}
          className="flex min-h-[3.25rem] flex-col items-center justify-center gap-0.5 rounded-lg border border-amber/40 bg-amber/10 px-2 py-2.5 text-center transition-colors hover:border-amber hover:bg-amber/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="text-[0.625rem] font-medium leading-[1.2] text-foreground/85">
            Regional Spoke
          </span>
          <span className="text-[0.5625rem] leading-[1.2] text-muted-foreground/75">
            (In-Country)
          </span>
        </Link>
      ) : (
        <div className="flex min-h-[3.25rem] flex-col items-center justify-center gap-0.5 rounded-lg border border-amber/30 bg-amber/10 px-2 py-2.5 text-center">
          <span className="text-[0.625rem] font-medium leading-[1.2] text-foreground/85">
            Regional Spoke
          </span>
          <span className="text-[0.5625rem] leading-[1.2] text-muted-foreground/75">
            (In-Country)
          </span>
        </div>
      )}
    </div>
  );
}

function OperatingModelPage() {
  const { archetype: archetypeId } = Route.useSearch();
  const archetype = getArchetype(archetypeId)!;
  const [filter, setFilter] = useState("");
  useEffect(() => {
    writeDealContext({ archetypeId: archetype.id });
  }, [archetype.id]);
  const q = filter.trim().toLowerCase();
  const archetypeReq: Record<string, string> = {};
  for (const [spokeId, words] of Object.entries(SPOKE_KEYWORDS)) {
    const hit = archetype.workstreams.find((w) => words.some((k) => w.workstream.includes(k)));
    if (hit) archetypeReq[spokeId] = hit.requirement === "necessary" ? "Necessary" : hit.requirement === "conditional" ? "Conditional" : "Optional";
  }
  const roleMatches = q ? GOVERNANCE_ROLES.filter((r) => r.title.toLowerCase().includes(q)) : [];

  return (
    <div className="min-h-screen bg-background">
      <BrandHeader />
      <PageToolbar crumbs={[{ label: "Roles & operating model" }, { label: "Operating Model" }]} />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <p className="label-eyebrow">Operating model</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-maroon">
          The M&amp;A operating model at a glance
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          A permanent Central Hub is supported by functional and in-country spokes that do the work, so the same
          structure can be repeated on every deal while the archetype sets which spokes mobilise. Each part of the
          visual opens its purpose, roles, responsibilities and critical capabilities.
        </p>

        {/* Structure diagram */}
        <section id="diagram" className="mt-12 scroll-mt-4">
          <h2 className="font-display text-xl font-semibold text-maroon">
            Hub and Spoke Operating Model
            <span className="block">(Separate to organisational structure)</span>
          </h2>
          <p className="mt-2 rounded-md border-l-2 border-red bg-surface px-4 py-2 text-sm font-medium text-foreground">
            Select an area of the operating model to see its purpose, roles, responsibilities and critical capabilities.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {LEGEND.map((item) => (
              <span
                key={item.label}
                className={`rounded-md border px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] ${item.className}`}
              >
                {item.label}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <label htmlFor="om-filter" className="text-xs font-medium text-foreground">
              Find a function, region or role
            </label>
            <input
              id="om-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="e.g. Legal, Regional, Workstream Lead"
              className="h-9 w-full max-w-xs rounded-md border border-input bg-card px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            {q ? (
              <span className="text-xs text-muted-foreground">
                Matches are highlighted; nothing is removed.
                {roleMatches.map((r) => (
                  <Link key={r.id} to="/operating-model/roles/$roleId" params={{ roleId: r.id }} className="ml-2 text-maroon underline">
                    {r.title}
                  </Link>
                ))}
              </span>
            ) : null}
          </div>
          <ArchetypeCtx.Provider value={archetypeReq}>
          <FilterCtx.Provider value={filter}>
          <div className="mt-5 rounded-xl border border-border bg-card p-6 shadow-panel lg:p-8">
            <div className="space-y-0">
              <Link
                to="/operating-model/central-hub"
                className="block rounded-lg border border-maroon bg-maroon px-6 py-5 text-center text-maroon-foreground transition-colors hover:bg-maroon/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <p className="font-display text-lg font-semibold">Central Hub</p>
                <p className="text-sm italic text-maroon-foreground/75">Inorganic Change Team</p>
                <span className="mt-1 inline-flex items-center gap-1 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-maroon-foreground/70">
                  Central Hub operating model
                  <ArrowRight className="h-3 w-3" />
                </span>
              </Link>

              <div className="h-8" />

              <div className="overflow-x-auto rounded-xl border border-maroon/15 bg-background p-6 lg:p-8">
                <div className="mx-auto w-max min-w-full">
                <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-maroon">
                  FUNCTIONAL SPOKES
                </p>
                  <Link
                    to="/operating-model/spokes/change-management"
                    className="mt-6 flex min-h-[3rem] flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-xl border border-maroon/25 bg-blush px-4 py-2 text-center transition-colors hover:border-maroon/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-maroon">
                      Change Management
                    </span>
                    <span className="rounded-md border border-maroon/25 bg-card px-2 py-0.5 text-[0.5625rem] font-semibold uppercase tracking-[0.12em] text-maroon">
                      Hub aligned
                    </span>
                  </Link>

                  <div className="mt-8 flex items-stretch justify-center gap-1.5">
                    {CORE_SPOKE_IDS.map((id) => (
                      <SpokeColumn key={id} id={id} />
                    ))}

                    <div className="flex shrink-0 flex-col rounded-xl border border-maroon/15 bg-surface/70 p-3">
                      <p className="pb-3 text-center text-[0.5625rem] font-semibold uppercase leading-[1.3] tracking-[0.1em] text-muted-foreground">
                        Conditionally required based on deal archetype
                      </p>
                      <div className="flex flex-1 items-stretch gap-1.5">
                        {CONDITIONAL_SPOKE_IDS.map((id) => (
                          <SpokeColumn key={id} id={id} conditional />
                        ))}
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/operating-model/assurance"
                    search={{ tab: "risk" }}
                    className="mt-8 flex min-h-[3rem] w-full flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-xl border border-maroon/25 bg-blush px-4 py-2 text-center transition-colors hover:border-maroon/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-maroon">
                      Assurance (Risk, Internal Audit, Independent Assurance)
                    </span>
                    <span className="rounded-md border border-maroon/25 bg-card px-2 py-0.5 text-[0.5625rem] font-semibold uppercase tracking-[0.12em] text-maroon">
                      Assurance across all spokes
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <p className="mt-5 text-xs text-muted-foreground">
              Select any functional spoke to see its milestones, dependencies and support needs.
            </p>
          </div>
          </FilterCtx.Provider>
          </ArchetypeCtx.Provider>
        </section>

        {/* Key success factors */}
        <section className="mt-12">
          <Link
            to="/operating-model/success-factors"
            className="group flex flex-wrap items-center justify-between gap-4 rounded-xl border border-maroon/25 bg-blush p-6 transition-all hover:-translate-y-0.5 hover:border-maroon/45 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="max-w-2xl">
              <p className="label-eyebrow">Key success factors</p>
              <p className="mt-2 font-display text-lg font-semibold text-maroon">
                Click here to see the Key Success Factors for the Operating Model
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                The seven conditions that must be in place for this operating model to work
                effectively in practice.
              </p>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-maroon transition-transform group-hover:translate-x-0.5" />
          </Link>
        </section>

        {/* Transaction RACI */}
        <section className="mt-6">
          <Link
            to="/operating-model/raci"
            className="group flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-maroon/45 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="max-w-2xl">
              <p className="label-eyebrow">Accountability</p>
              <p className="mt-2 font-display text-lg font-semibold text-maroon">
                Click here to see the activity-level RACI
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Who is accountable, responsible, consulted and informed across the Central Hub,
                functions, in-country teams, executive governance and the counterparty.
              </p>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-maroon transition-transform group-hover:translate-x-0.5" />
          </Link>
        </section>

        <RelatedGuidance
          links={[
            { label: "Mobilisation Roadmap", to: "/mobilisation" },
            { label: "Partner Accelerator", to: "/partner-acceleration" },
            { label: "Training & learning pathways", to: "/learning" },
          ]}
        />
        <AiAgentSignpost />
        <section className="mt-12 flex flex-wrap gap-3 border-t border-border pt-8">
          <Link
            to="/deal-lifecycle"
            search={{ archetype: archetype.id }}
            className="rounded-md border border-input px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
          >
            Back to Deal Lifecycle
          </Link>
          <Link
            to="/vision"
            hash="explore"
            className="rounded-md border border-maroon px-5 py-3 text-sm font-medium text-maroon transition-colors hover:bg-maroon hover:text-maroon-foreground"
          >
            Back to Vision
          </Link>
        </section>
      </main>
    </div>
  );
}
