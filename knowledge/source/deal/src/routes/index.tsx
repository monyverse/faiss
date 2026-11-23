import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  Briefcase,
  GitBranch,
  GraduationCap,
  Handshake,
  Layers,
  Network,
  Quote,
  Rocket,
  Search,
  Sparkles,
  UserRound,
} from "lucide-react";
import { BrandHeader } from "@/components/BrandHeader";
import { VideoPlaceholders } from "@/components/VideoPlaceholders";
import { ContentDirectory } from "@/components/ContentDirectory";
import { FunctionQuickNav } from "@/components/FunctionQuickNav";
import { openHubSearch } from "@/lib/search-index";
import { AI_AGENT_LABEL, AI_AGENT_URL } from "@/lib/ai-agent";
import { useDealContext } from "@/lib/deal-context";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "M&A Capability Hub | Absa" },
      {
        name: "description",
        content:
          "Building a sustainable, scalable and repeatable way of delivering deals: the execution hub, functional spokes and partner capacity behind every Absa transaction.",
      },
      { property: "og:title", content: "M&A Capability Hub | Absa" },
      {
        property: "og:description",
        content:
          "A repeatable execution model with clear functional ownership and scalable partner capacity for Absa M&A.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HubHome,
});


const ENTRY =
  "group flex flex-col rounded-md border border-border bg-card p-5 text-left transition-colors hover:border-maroon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function HubHome() {
  const { archetypeId } = useDealContext();
  const aId = archetypeId ?? "balance-sheet-acquisition";

  const journey = [
    { label: "Understand the Hub", to: "/vision" },
    { label: "Confirm the archetype", to: "/deal-lifecycle", hash: "archetypes" },
    { label: "Follow the lifecycle", to: "/deal-lifecycle", search: { archetype: aId }, hash: "apply" },
    { label: "Complete your role training", to: "/learning" },
    { label: "Mobilise the operating model", to: "/mobilisation" },
    { label: "Deliver and capture lessons", to: "/operating-model/success-factors" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <BrandHeader />

      <main>
        {/* What is the Hub? */}
        <section className="border-b border-border bg-background">
          <div className="mx-auto max-w-6xl px-6 py-10">
            <div className="relative overflow-hidden rounded-lg bg-maroon px-8 py-10 text-maroon-foreground shadow-panel lg:px-12">
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-red/40 blur-3xl" aria-hidden />
              <div className="pointer-events-none absolute -bottom-32 right-1/3 h-64 w-64 rounded-full bg-red/20 blur-3xl" aria-hidden />
              <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1fr]">
                <div className="flex flex-col justify-between gap-8">
                  <div>
                    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] opacity-70">
                      Absa · M&amp;A Capability Hub
                    </p>
                    <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight lg:text-6xl">What is the M&amp;A Capability Hub?</h1>
                    <p className="mt-6 font-display text-2xl font-semibold leading-snug lg:text-3xl">
                      A single source of truth for information on how to execute M&A transactions, to enable scalability and repeatability
                    </p>
                    <p className="mt-5 max-w-xl text-base leading-relaxed opacity-85">
                      The Hub provides the common framework for delivering Absa acquisitions and
                      divestments: a central execution hub, clear functional ownership and partner
                      capacity that scales with transaction demand.
                    </p>
                  </div>
                  <Link
                    to="/vision"
                    className="inline-flex w-fit items-center gap-2 rounded-md bg-maroon-foreground px-4 py-2.5 text-sm font-semibold text-maroon transition-opacity hover:opacity-90"
                  >
                    Read the full Vision <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <dl className="space-y-6 border-l border-maroon-foreground/20 pl-8">
                  {[
                    {
                      n: "01",
                      t: "What's inside",
                      h: "Everything needed to run an Absa transaction, in one place",
                      b: "The six deal archetypes and their end-to-end lifecycles, the Hub & Spoke operating model with named functional owners, a Partner Accelerator for extra capacity, a mobilisation roadmap and role-based training pathways.",
                    },
                    {
                      n: "02",
                      t: "Why Absa needs it",
                      h: "Inorganic growth is central to Absa's strategy",
                      b: "Absa's strategy is increasingly focused on growth across Africa, with inorganic activity expected to form an important part of that ambition. As the volume and complexity of transactions increase, successful delivery will depend on the broader Absa organisation being able to mobilise around deals — not just the central M&A team.",
                    },
                    {
                      n: "03",
                      t: "How it helps",
                      h: "More deals, at greater pace and complexity",
                      b: "Every deal starts from the same proven structure: proactive mobilisation, clear owners accountable for their workstream, and partner capacity scaled to transaction demand. Lessons from each deal feed the next.",
                    },
                  ].map((s) => (
                    <div key={s.n} className="flex gap-4">
                      <span className="font-display text-sm font-semibold opacity-60">{s.n}</span>
                      <div>
                        <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] opacity-70">{s.t}</dt>
                        <dd className="mt-1 font-display text-base font-semibold leading-snug">{s.h}</dd>
                        <dd className="mt-2 text-sm leading-relaxed opacity-85">{s.b}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="relative mt-10 border-t border-maroon-foreground/20 pt-8">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] opacity-70">
                  Two ways to use the Hub
                </p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div className="rounded-md border border-maroon-foreground/20 bg-maroon-foreground/5 p-5">
                    <div className="flex items-center gap-2">
                      <Layers className="h-5 w-5" />
                      <p className="font-display text-base font-semibold">The interactive microsite</p>
                      <span className="rounded bg-maroon-foreground/15 px-1.5 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.1em]">You are here</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed opacity-85">
                      The approved structure, lifecycles, operating model and reference guidance for
                      every Absa transaction.
                    </p>
                  </div>
                  <div className="rounded-md border border-maroon-foreground/20 bg-maroon-foreground/5 p-5">
                    <div className="flex items-center gap-2">
                      <Bot className="h-5 w-5" />
                      <p className="font-display text-base font-semibold">{AI_AGENT_LABEL}</p>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed opacity-85">
                      A separate AI agent that helps apply that knowledge to questions about a
                      specific deal, role or context.
                    </p>
                    {AI_AGENT_URL ? (
                      <a href={AI_AGENT_URL} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline">
                        Open the supporting AI agent <ArrowRight className="h-4 w-4" />
                      </a>
                    ) : (
                      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] opacity-70">Access provided separately</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Videos */}
        <section className="border-b border-border bg-background">
          <div className="mx-auto max-w-6xl px-6 py-10">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-maroon">Watch the introductions</h2>
            <p className="mt-2 text-sm text-muted-foreground">Five short videos introducing the Hub. Intro to M&amp;A stays in Training &amp; learning pathways.</p>
            <div className="mt-6">
              <VideoPlaceholders />
            </div>
          </div>
        </section>

        {/* Task entry points */}
        <section className="border-b border-border bg-surface">
          <div className="mx-auto max-w-6xl px-6 py-10">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-maroon">
              What do you need help with?
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className={ENTRY}>
                <Sparkles className="h-5 w-5 text-red" />
                <p className="mt-3 font-display text-base font-semibold text-maroon">I’m new to the Hub</p>
                <p className="mt-1 flex-1 text-sm text-muted-foreground">
                  Understand why the Hub exists and how its components fit together.
                </p>
                <div className="mt-3 flex flex-wrap gap-3 text-sm font-medium">
                  <Link to="/vision" className="text-maroon hover:underline">Vision for the Capability Hub</Link>
                </div>
              </div>
              <div className={ENTRY}>
                <Briefcase className="h-5 w-5 text-red" />
                <p className="mt-3 font-display text-base font-semibold text-maroon">I’m about to start working on a transaction</p>
                <p className="mt-1 flex-1 text-sm text-muted-foreground">
                  Confirm the deal archetype and follow the relevant lifecycle.
                </p>
                <div className="mt-3 flex flex-wrap gap-3 text-sm font-medium">
                  <Link to="/deal-lifecycle" className="text-maroon hover:underline">Deal Lifecycle</Link>
                </div>
              </div>
              <div className={ENTRY}>
                <UserRound className="h-5 w-5 text-red" />
                <p className="mt-3 font-display text-base font-semibold text-maroon">I need to understand my role</p>
                <p className="mt-1 flex-1 text-sm text-muted-foreground">
                  Find accountabilities, responsibilities and role-specific guidance.
                </p>
                <div className="mt-3 flex flex-wrap gap-3 text-sm font-medium">
                  <Link to="/operating-model" search={{ archetype: aId }} className="text-maroon hover:underline">Operating Model</Link>
                  <Link to="/learning" className="text-maroon hover:underline">Training &amp; learning pathways</Link>
                </div>
              </div>
              <Link to="/browse" className={ENTRY}>
                <Layers className="h-5 w-5 text-red" />
                <p className="mt-3 font-display text-base font-semibold text-maroon">I want to browse the content</p>
                <p className="mt-1 flex-1 text-sm text-muted-foreground">
                  See an overview of everything in the Hub, grouped by topic.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-maroon">
                  Browse all content <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>

            <div className={`${ENTRY} mt-3`}>
              <Search className="h-5 w-5 text-red" />
              <p className="mt-3 font-display text-base font-semibold text-maroon">I need to find something quickly</p>
              <button
                type="button"
                onClick={openHubSearch}
                className="mt-3 flex w-full items-center gap-3 rounded-md border border-input bg-card px-4 py-3 text-left text-sm text-muted-foreground transition-colors hover:border-maroon/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Search className="h-4 w-4 text-maroon" />
                Search for a stage, activity, role, artefact or template
                <kbd className="ml-auto rounded border border-border px-1.5 text-[0.625rem]">/</kbd>
              </button>
            </div>
          </div>
        </section>

        {/* Recommended journey */}
        <section className="mx-auto max-w-6xl px-6 pt-10">
          <p className="label-eyebrow">Recommended journey for new users</p>
          <ol className="mt-3 flex flex-wrap items-center gap-2">
            {journey.map((step, i) => (
              <li key={step.label} className="flex items-center gap-2">
                <Link
                  to={step.to as never}
                  search={(step as { search?: unknown }).search as never}
                  hash={(step as { hash?: string }).hash as never}
                  className="inline-flex items-center gap-2 rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground transition-colors hover:border-maroon/45 hover:text-maroon"
                >
                  <span className="text-xs font-semibold text-red">{i + 1}</span>
                  {step.label}
                </Link>
                {i < journey.length - 1 ? <ArrowRight className="h-4 w-4 text-maroon/40" /> : null}
              </li>
            ))}
          </ol>
        </section>

        <FunctionQuickNav />

        {/* Content directory */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <p className="label-eyebrow">Browse all Hub content</p>
          <div className="mt-6">
            <ContentDirectory aId={aId} />
          </div>
        </section>

        {/* Outcome statement */}
        <section className="border-y border-border bg-blush">
          <div className="mx-auto max-w-6xl px-6 py-10 text-center">
            <Quote className="mx-auto h-5 w-5 text-red" />
            <p className="mx-auto mt-4 max-w-3xl font-display text-lg font-semibold leading-relaxed text-maroon lg:text-xl">
              A repeatable execution model, with clear functional ownership and scalable partner
              capacity, so Absa can deliver more deals at greater pace and complexity
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
