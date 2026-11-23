import { TemplateChip } from "@/components/TemplatePlaceholders";
import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  Files,
  FileText,
  Info,
  Users,
} from "lucide-react";
import { BrandHeader } from "@/components/BrandHeader";
import { PageToolbar } from "@/components/PageToolbar";
import { AiAgentSignpost, RelatedGuidance } from "@/components/Wayfinding";
import { RequirementPill } from "@/components/RequirementPill";
import { writeDealContext } from "@/lib/deal-context";
import { cn } from "@/lib/utils";
import { ARCHETYPES, getArchetype, REQUIREMENT_LABEL, type Side } from "@/lib/archetypes";
import {
  getLifecycleVariants,
  type LifecycleItem,
  type LifecycleStageDetail,
} from "@/lib/lifecycles";
import { LENSES } from "@/lib/vision-content";

const DEFAULT_ARCHETYPE = "balance-sheet-acquisition";
type Search = { archetype?: string | undefined; stage?: string | undefined };

export const Route = createFileRoute("/deal-lifecycle")({
  validateSearch: (search: Record<string, unknown>): Search => {
    const out: Search = {};
    if (typeof search["archetype"] === "string" && getArchetype(search["archetype"] as string)) out.archetype = search["archetype"] as string;
    if (typeof search["stage"] === "string") out.stage = search["stage"] as string;
    return out;
  },
  head: () => ({
    meta: [
      { title: "Deal Lifecycle | Absa M&A Capability Hub" },
      {
        name: "description",
        content:
          "The six Absa deal archetypes, the common ten-stage lifecycle every deal follows, and how the detail in each stage changes by archetype.",
      },
      { property: "og:title", content: "Deal Lifecycle | Absa M&A Capability Hub" },
      {
        property: "og:description",
        content: "Archetypes first, the common lifecycle second, and archetype-specific stage detail third.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DealLifecyclePage,
});

type Filter = "all" | "necessary" | "conditional" | "optional";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All activities" },
  { id: "necessary", label: "Necessary" },
  { id: "conditional", label: "Conditional" },
  { id: "optional", label: "Optional" },
];

const GROUPS: { side: Side; title: string; body: string; label: string }[] = [
  { side: "acquisition", title: "Acquisition", label: "Buy-side perimeter", body: "Absa acquires a portfolio, a part of a business or a complete business." },
  { side: "divestment", title: "Divestment", label: "Sell-side perimeter", body: "Absa disposes of a portfolio, a part of a business or a complete business." },
];

const COMMON_STAGES = LENSES.find((l) => l.id === "lifecycles")!.visual!.items;

function DealLifecyclePage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const archetype = getArchetype(search.archetype ?? DEFAULT_ARCHETYPE)!;
  const variants = useMemo(() => getLifecycleVariants(archetype.id), [archetype.id]);
  const [variantIndex, setVariantIndex] = useState(0);
  const [openDetail, setOpenDetail] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

  const variant = variants[Math.min(variantIndex, Math.max(variants.length - 1, 0))];
  const stages = variant?.stages ?? [];
  const activeIndex = Math.max(stages.findIndex((s) => s.id === search.stage), 0);
  const selected = stages[activeIndex];

  const setStageId = (id: string | null) =>
    void navigate({ search: (prev) => ({ ...prev, stage: id ?? undefined }), replace: true, resetScroll: false });

  /** Switch archetype, keeping the same stage position where practical. */
  const selectArchetype = (id: string, scroll = false) => {
    const nextStages = getLifecycleVariants(id)[0]?.stages ?? [];
    const keep = nextStages[activeIndex]?.id;
    setVariantIndex(0);
    void navigate({ search: { archetype: id, stage: keep }, replace: true, resetScroll: false });
    if (scroll) document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    writeDealContext({ archetypeId: archetype.id, stageId: selected?.id ?? null });
  }, [archetype.id, selected?.id]);

  return (
    <div className="min-h-screen bg-background">
      <BrandHeader />
      <PageToolbar crumbs={[{ label: "Deal Lifecycle" }]} />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <p className="label-eyebrow mt-6">Deal Lifecycle</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-maroon">
          Deal archetypes and the lifecycle every deal follows
        </h1>
        <p className="mt-4 max-w-4xl text-sm leading-relaxed text-muted-foreground">
          Start with the type of deal, see the common journey, then select an archetype to explore how the detail in each
          stage changes.
        </p>
        <ol className="mt-6 flex flex-wrap gap-x-8 gap-y-2 border-t border-border pt-4 text-sm">
          {[
            ["archetypes", "Deal archetypes"],
            ["common-lifecycle", "The common lifecycle"],
            ["apply", "Apply the archetype"],
          ].map(([id, label], i) => (
            <li key={id}>
              <a href={`#${id}`} className="flex items-baseline gap-2 text-muted-foreground hover:text-maroon">
                <span className="font-display text-xs font-semibold text-red">0{i + 1}</span>
                {label}
              </a>
            </li>
          ))}
        </ol>

        {/* A. Archetypes */}
        <section id="archetypes" className="mt-12 scroll-mt-24">
          <p className="label-eyebrow">01 · Deal archetypes</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-maroon">Six deal archetypes</h2>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-muted-foreground">
            Every transaction is classified by what transfers: the deal perimeter. The archetype describes the nature of the
            deal and changes the activities, emphasis, roles and considerations within the lifecycle, the workstreams that
            mobilise and the artefacts the team should use. Select an archetype to set the context for the detail below.
          </p>

          <div className="mt-8 space-y-8">
            {GROUPS.map((group) => (
              <div key={group.side}>
                <div className="flex flex-col gap-1 border-b border-border pb-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-maroon/70">{group.label}</span>
                    <h3 className="font-display text-xl font-semibold text-maroon">{group.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{group.body}</p>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  {ARCHETYPES.filter((a) => a.side === group.side).map((a) => {
                    const active = a.id === archetype.id;
                    const detailOpen = openDetail === a.id;
                    return (
                      <article
                        key={a.id}
                        id={`archetype-${a.id}`}
                        className={cn(
                          "flex flex-col rounded-lg border bg-card px-5 py-5 transition-colors",
                          active ? "border-maroon ring-2 ring-maroon/15" : "border-border",
                        )}
                      >
                        <span className="text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-maroon/65">{a.perimeter}</span>
                        <h4 className="mt-2 font-display text-lg font-semibold leading-snug text-maroon">{a.name}</h4>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.description}</p>
                        <p className="mt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-maroon">Example</p>
                        <p className="mt-1 text-sm leading-relaxed text-foreground">{a.examples[0]}</p>
                        <button
                          type="button"
                          aria-expanded={detailOpen}
                          onClick={() => setOpenDetail(detailOpen ? null : a.id)}
                          className="mt-3 inline-flex items-center gap-1 self-start text-xs font-semibold text-maroon hover:underline"
                        >
                          {detailOpen ? "Hide detail" : "Characteristics, examples and workstreams"}
                          <ChevronRight className={cn("h-3.5 w-3.5 transition-transform", detailOpen && "rotate-90")} />
                        </button>
                        {detailOpen ? (
                          <div className="mt-3 space-y-4 border-t border-border pt-3">
                            {a.detailedDefinition ? <p className="text-sm leading-relaxed text-muted-foreground">{a.detailedDefinition}</p> : null}
                            <div>
                              <p className="text-xs font-semibold text-maroon">Inclusion criteria</p>
                              <ul className="mt-2 space-y-2">
                                {a.characteristics.map((c) => (
                                  <li key={c} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red" />
                                    {c}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-maroon">Examples</p>
                              <ul className="mt-2 space-y-2">
                                {a.examples.map((e) => (
                                  <li key={e} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-maroon/50" />
                                    {e}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-maroon">Workstreams that mobilise</p>
                              <ul className="mt-2 space-y-2">
                                {a.workstreams.map((w) => (
                                  <li key={w.workstream} className="flex items-start justify-between gap-3 text-sm">
                                    <span className="text-foreground">{w.workstream}</span>
                                    <RequirementPill requirement={w.requirement} />
                                  </li>
                                ))}
                              </ul>
                              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                                {REQUIREMENT_LABEL.conditional} workstreams depend on the deal; see the operating model for the reasoning.
                              </p>
                            </div>
                          </div>
                        ) : null}
                        <button
                          type="button"
                          aria-pressed={active}
                          onClick={() => selectArchetype(a.id, true)}
                          className={cn(
                            "mt-auto rounded-md border px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            "mt-5",
                            active ? "border-maroon bg-maroon text-maroon-foreground" : "border-input text-maroon hover:border-maroon/45",
                          )}
                        >
                          {active ? "Selected archetype" : "Apply this archetype"}
                        </button>
                      </article>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* B. Common lifecycle */}
        <section id="common-lifecycle" className="mt-14 scroll-mt-24 rounded-xl border border-border bg-surface p-5 lg:p-6">
          <p className="label-eyebrow">02 · The common lifecycle</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-maroon">Ten stages, common to every deal</h2>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-muted-foreground">
            All deals move through the same high-level lifecycle stages, and the lifecycle is the common organising
            structure for execution. The detailed work within those stages changes according to the archetype.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            {[
              { label: "PRE-SIGNATURE (LED BY LEGAL & CORPDEV)", dot: "bg-amber" },
              { label: "Post-signature", dot: "bg-maroon" },
            ].map((l) => (
              <span key={l.label} className="inline-flex items-center gap-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                <span className={`h-2 w-2 rounded-full ${l.dot}`} />
                {l.label}
              </span>
            ))}
          </div>
          <ol className="mt-4 grid gap-2 sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-10">
            {COMMON_STAGES.map((item, i) => {
              const pre = i < 2;
              const current = i === activeIndex;
              return (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => {
                      const id = stages[i]?.id;
                      if (id) setStageId(id);
                      document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className={cn(
                      "flex h-full w-full flex-col gap-2 rounded-lg border px-3 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      pre ? "border-amber/40 bg-amber/10" : "border-maroon/25 bg-blush",
                      current && "ring-2 ring-maroon",
                    )}
                  >
                    <span className={cn("inline-flex h-5 w-5 items-center justify-center rounded-full text-[0.5625rem] font-bold", pre ? "bg-amber/25 text-foreground/80" : "bg-maroon text-maroon-foreground")}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.75rem] font-semibold leading-[1.3] text-foreground">{item}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </section>

        {/* C. Apply the archetype */}
        <section id="apply" className="mt-14 scroll-mt-24">
          <p className="label-eyebrow">03 · Apply the archetype</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-maroon">{archetype.name} lifecycle</h2>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-muted-foreground">
            Select an archetype, then a stage, to see its purpose, indicative timeline and the activities that apply.
            Activities are grouped into necessary, conditional and optional. The link in your address bar opens this exact
            archetype and stage.
          </p>

          <div className="mt-6 rounded-lg border border-border bg-surface/60 p-5">
            <div className="grid gap-6 md:grid-cols-2">
              {GROUPS.map((group) => (
                <div key={group.side}>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-0.5 rounded-full bg-red" />
                    <p className="label-eyebrow">{group.title}</p>
                  </div>
                  <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {ARCHETYPES.filter((a) => a.side === group.side).map((a) => (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => selectArchetype(a.id)}
                        aria-pressed={a.id === archetype.id}
                        className={cn(
                          "flex min-h-[3.25rem] items-center rounded-md border border-input bg-card px-3.5 py-2.5 text-left text-[0.8125rem] font-medium leading-snug text-foreground transition-colors hover:border-maroon/40 hover:bg-surface",
                          a.id === archetype.id && "border-maroon bg-maroon text-maroon-foreground hover:bg-maroon hover:text-maroon-foreground",
                        )}
                      >
                        {a.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {!variant ? (
            <div className="mt-10 rounded-lg border border-dashed border-border px-8 py-14 text-center">
              <p className="font-display text-lg font-semibold text-maroon">In development</p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                Lifecycle stages for the {archetype.name.toLowerCase()} have not been codified yet.
              </p>
            </div>
          ) : (
            <>
              {variants.length > 1 ? (
                <div className="mt-8 rounded-lg border border-border bg-surface px-5 py-4">
                  <p className="label-eyebrow">Delivery variant</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {variants.map((v, i) => (
                      <button
                        key={v.sourceTitle}
                        type="button"
                        onClick={() => setVariantIndex(i)}
                        aria-pressed={i === variantIndex}
                        className={cn(
                          "rounded-md border px-3.5 py-2 text-xs font-medium transition-colors",
                          i === variantIndex
                            ? "border-maroon bg-maroon text-maroon-foreground"
                            : "border-input text-muted-foreground hover:border-maroon/40 hover:bg-card",
                        )}
                      >
                        {v.variantLabel}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              <Stepper
                stages={stages}
                activeIndex={activeIndex}
                onSelect={(id) => setStageId(id)}
                startLabel={archetype.startLabel}
                endLabel={archetype.endLabel}
              />

              {selected ? (
                <>
                  <StageDetail stage={selected} filter={filter} setFilter={setFilter} />
                  <StagePager stages={stages} activeIndex={activeIndex} onSelect={(id) => setStageId(id)} />
                </>
              ) : null}
            </>
          )}
        </section>

        <RelatedGuidance
          links={[
            { label: "Operating model for this archetype", to: "/operating-model", search: { archetype: archetype.id } },
            { label: "Transaction roles and governance", to: "/operating-model/governance" },
            { label: "Mobilisation Roadmap", to: "/mobilisation" },
            { label: "Back to Vision", to: "/vision", hash: "explore" },
          ]}
        />
        <AiAgentSignpost />
        <section className="mt-12 border-t border-border pt-6">
          <Link
            to="/operating-model"
            search={{ archetype: archetype.id }}
            className="inline-flex items-center gap-2 rounded-md border border-maroon px-5 py-3 text-sm font-medium text-maroon transition-colors hover:bg-maroon hover:text-maroon-foreground"
          >
            Next: operating model
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>
    </div>
  );
}

/* ------------------------------- Stepper ------------------------------- */

function Stepper({
  stages,
  activeIndex,
  onSelect,
  startLabel,
  endLabel,
}: {
  stages: LifecycleStageDetail[];
  activeIndex: number;
  onSelect: (id: string) => void;
  startLabel: string;
  endLabel: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState({ left: false, right: false });

  const measure = () => {
    const el = trackRef.current;
    if (!el) return;
    setOverflow({
      left: el.scrollLeft > 4,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
    });
  };

  useEffect(() => {
    measure();
    const el = trackRef.current;
    if (!el) return;
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stages.length]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const active = el.querySelector<HTMLElement>("[data-active='true']");
    if (active) {
      const target = active.offsetLeft - el.clientWidth / 2 + active.clientWidth / 2;
      el.scrollTo({ left: Math.max(target, 0), behavior: "smooth" });
    }
  }, [activeIndex]);

  const nudge = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.7, 240), behavior: "smooth" });
  };

  const progress = stages.length > 1 ? (activeIndex / (stages.length - 1)) * 100 : 100;

  return (
    <div id="stages" className="sticky top-0 z-20 -mx-6 mt-8 scroll-mt-0 border-b border-border bg-background/95 px-6 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      {/* Mobile selector */}
      <div className="md:hidden">
        <div className="flex items-center justify-between gap-3">
          <p className="label-eyebrow">
            Stage {activeIndex + 1} of {stages.length}
          </p>
          <div className="flex gap-1.5">
            <PagerButton
              label="Previous stage"
              disabled={activeIndex === 0}
              onClick={() => onSelect(stages[activeIndex - 1]!.id)}
            >
              <ChevronLeft className="h-4 w-4" />
            </PagerButton>
            <PagerButton
              label="Next stage"
              disabled={activeIndex === stages.length - 1}
              onClick={() => onSelect(stages[activeIndex + 1]!.id)}
            >
              <ChevronRight className="h-4 w-4" />
            </PagerButton>
          </div>
        </div>
        <div className="mt-3 rounded-md border border-maroon bg-accent px-4 py-3">
          <span className="text-[0.7rem] font-semibold tabular-nums text-red">
            {stages[activeIndex]?.index}
          </span>
          <p className="mt-0.5 text-sm font-medium text-maroon">{stages[activeIndex]?.title}</p>
        </div>
        <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-border">
          <div className="h-full rounded-full bg-maroon" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Desktop stepper */}
      <div className="hidden md:block">
        <div className="flex items-center gap-3">
          <span className="flex shrink-0 items-center gap-2 rounded-full border border-maroon/25 bg-surface px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-maroon">
            <span className="h-1.5 w-1.5 rounded-full bg-maroon" />
            {startLabel}
          </span>

          <div className="relative min-w-0 flex-1">
            {overflow.left ? (
              <>
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-background to-transparent"
                />
                <button
                  type="button"
                  aria-label="Scroll stages left"
                  onClick={() => nudge(-1)}
                  className="absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-full border border-border bg-card p-1.5 text-maroon shadow-panel transition-colors hover:bg-surface"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
              </>
            ) : null}

            <div
              ref={trackRef}
              onScroll={measure}
              className="no-scrollbar overflow-x-auto scroll-smooth"
            >
              <ol className="relative flex min-w-max items-start gap-0 pt-3">
                {/* continuous progress line */}
                <span aria-hidden className="absolute left-4 right-4 top-[1.1rem] h-px bg-border" />
                <span
                  aria-hidden
                  className="absolute left-4 top-[1.1rem] h-px bg-maroon transition-all duration-300"
                  style={{ width: `calc((100% - 2rem) * ${progress / 100})` }}
                />
                {stages.map((stage, i) => {
                  const state = i < activeIndex ? "done" : i === activeIndex ? "active" : "future";
                  return (
                    <li key={stage.id} className="relative">
                      <button
                        type="button"
                        data-active={i === activeIndex}
                        onClick={() => onSelect(stage.id)}
                        aria-current={i === activeIndex ? "step" : undefined}
                        className="group flex w-[9.5rem] flex-col items-center px-1.5 pb-1 text-center"
                      >
                        <span
                          className={cn(
                            "relative z-10 flex h-6 w-6 items-center justify-center rounded-full border text-[0.65rem] font-semibold tabular-nums transition-colors",
                            state === "active" &&
                              "border-maroon bg-maroon text-maroon-foreground ring-4 ring-maroon/10",
                            state === "done" && "border-maroon bg-card text-maroon",
                            state === "future" &&
                              "border-border bg-card text-muted-foreground group-hover:border-maroon/40 group-hover:text-maroon",
                          )}
                        >
                          {stage.index}
                        </span>
                        <span
                          className={cn(
                            "mt-2 w-full rounded-md border px-2 py-2 text-xs leading-snug transition-colors",
                            state === "active"
                              ? "border-maroon bg-accent font-semibold text-maroon"
                              : state === "done"
                                ? "border-transparent font-medium text-foreground group-hover:border-border group-hover:bg-surface"
                                : "border-transparent text-muted-foreground group-hover:border-border group-hover:bg-surface",
                          )}
                        >
                          {stage.title}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>

            {overflow.right ? (
              <>
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-background to-transparent"
                />
                <button
                  type="button"
                  aria-label="Scroll stages right"
                  onClick={() => nudge(1)}
                  className="absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-full border border-border bg-card p-1.5 text-maroon shadow-panel transition-colors hover:bg-surface"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            ) : null}
          </div>

          <span className="flex shrink-0 items-center gap-2 rounded-full border border-maroon/25 bg-surface px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-maroon">
            {endLabel}
            <span className="h-1.5 w-1.5 rounded-full bg-maroon" />
          </span>
        </div>
      </div>
    </div>
  );
}

function PagerButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="rounded-full border border-border bg-card p-1.5 text-maroon transition-colors hover:bg-surface disabled:opacity-35"
    >
      {children}
    </button>
  );
}

function StagePager({
  stages,
  activeIndex,
  onSelect,
}: {
  stages: LifecycleStageDetail[];
  activeIndex: number;
  onSelect: (id: string) => void;
}) {
  const prev = stages[activeIndex - 1];
  const next = stages[activeIndex + 1];
  if (!prev && !next) return null;

  return (
    <nav className="mt-6 grid gap-3 sm:grid-cols-2">
      {prev ? (
        <button
          type="button"
          onClick={() => onSelect(prev.id)}
          className="group flex items-center gap-3 rounded-lg border border-border bg-card px-5 py-4 text-left transition-colors hover:border-maroon/40 hover:bg-surface"
        >
          <ArrowLeft className="h-4 w-4 shrink-0 text-maroon transition-transform group-hover:-translate-x-0.5" />
          <span className="min-w-0">
            <span className="label-eyebrow block">Previous stage</span>
            <span className="mt-1 block truncate text-sm font-medium text-maroon">
              {prev.index} · {prev.title}
            </span>
          </span>
        </button>
      ) : (
        <span className="hidden sm:block" />
      )}
      {next ? (
        <button
          type="button"
          onClick={() => onSelect(next.id)}
          className="group flex items-center justify-end gap-3 rounded-lg border border-border bg-card px-5 py-4 text-right transition-colors hover:border-maroon/40 hover:bg-surface sm:col-start-2"
        >
          <span className="min-w-0">
            <span className="label-eyebrow block">Next stage</span>
            <span className="mt-1 block truncate text-sm font-medium text-maroon">
              {next.index} · {next.title}
            </span>
          </span>
          <ArrowRight className="h-4 w-4 shrink-0 text-maroon transition-transform group-hover:translate-x-0.5" />
        </button>
      ) : null}
    </nav>
  );
}

/* ----------------------------- Stage detail ---------------------------- */

function StageDetail({
  stage,
  filter,
  setFilter,
}: {
  stage: LifecycleStageDetail;
  filter: Filter;
  setFilter: (f: Filter) => void;
}) {
  const groups = (
    [
      { key: "necessary", label: "Necessary", accent: "bg-maroon", items: stage.necessary },
      { key: "conditional", label: "Conditional", accent: "bg-red", items: stage.conditional },
      { key: "optional", label: "Optional", accent: "bg-muted-foreground", items: stage.optional },
    ] as const
  ).filter((g) => (filter === "all" || filter === g.key) && g.items.length > 0);

  return (
    <section className="mt-8">
      {/* header connected to the stepper */}
      <header className="border-t-2 border-maroon bg-card px-1 pt-6">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-maroon text-[0.7rem] font-semibold tabular-nums text-maroon-foreground">
            {stage.index}
          </span>
          <p className="label-eyebrow">Lifecycle stage</p>
        </div>
        <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-maroon">
          {stage.title}
        </h2>
        <p className="mt-3 max-w-[65ch] text-sm leading-7 text-muted-foreground">{stage.purpose}</p>
      </header>

      <QuestionHeading n={1} id="what-happens">What happens at this stage?</QuestionHeading>
      <div className="mt-4 grid gap-5 lg:grid-cols-2">
        {stage.timeline ? (
          <Card icon={<CalendarClock className="h-4 w-4" />} title="Indicative timeline">
            <p className="mt-1 font-display text-xl font-semibold text-maroon">{stage.timeline}</p>
            {stage.timelineDrivers.length > 0 ? (
              <>
                <p className="mt-4 text-[0.7rem] font-semibold uppercase tracking-wider text-muted-foreground">
                  Driven by
                </p>
                <ItemList items={stage.timelineDrivers} accent="bg-red" />
              </>
            ) : null}
          </Card>
        ) : null}
        <Card icon={<Info className="h-4 w-4" />} title="Specific nuances for this deal type">
          <PanelBody items={stage.nuances} />
        </Card>
      </div>

      <QuestionHeading n={2} id="what-to-do">What must we do?</QuestionHeading>
      <div className="mt-4 rounded-lg border border-border bg-card px-6 py-6">
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                filter === f.id
                  ? "border-maroon bg-maroon text-maroon-foreground"
                  : "border-input text-muted-foreground hover:border-maroon/40 hover:bg-surface",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-7">
          {groups.map((g) => (
            <div key={g.key}>
              <div className="flex items-baseline gap-3 border-b border-border pb-2">
                <h3 className="font-display text-sm font-semibold text-maroon">{g.label}</h3>
                <span className="text-xs text-muted-foreground">{g.items.length} activities</span>
              </div>
              <ItemList items={g.items} accent={g.accent} />
            </div>
          ))}
        </div>
      </div>

      <QuestionHeading n={3} id="who-owns">Who owns or supports it?</QuestionHeading>
      <div className="mt-4 grid gap-5 lg:grid-cols-2">
        {stage.role.length > 0 ? (
          <Card icon={<Users className="h-4 w-4" />} title="Inorganic Change Team role">
            <ItemList items={stage.role} accent="bg-maroon" />
          </Card>
        ) : null}
        <div className="rounded-lg border border-dashed border-border px-5 py-5 text-sm text-muted-foreground">
          Functional ownership sits with the relevant spokes and transaction roles.
          <div className="mt-3 flex flex-wrap gap-3 font-medium">
            <Link to="/operating-model/spokes" className="text-maroon hover:underline">Functional Spokes</Link>
            <Link to="/operating-model/governance" className="text-maroon hover:underline">Transaction roles</Link>
            <Link to="/operating-model/raci" className="text-maroon hover:underline">RACI</Link>
          </div>
        </div>
      </div>

      <QuestionHeading n={4} id="evidence">What evidence, artefacts and templates are needed?</QuestionHeading>
      <div className="mt-4 grid gap-5 md:grid-cols-2">
        <Card icon={<Files className="h-4 w-4" />} title="Associated artefacts">
          <PanelBody items={stage.artefacts} />
        </Card>
        <Card icon={<FileText className="h-4 w-4" />} title="Associated templates">
          <PanelBody items={stage.templates} templates />
        </Card>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Each template will be available to open or download here once the approved version is
        supplied.
      </p>
      {stage.id === "due-diligence" ? (
        <div className="mt-8 rounded-lg border border-maroon/30 bg-blush px-5 py-4">
          <p className="font-display text-sm font-semibold text-maroon">
            Want to know more about the full Due Diligence process?
          </p>
          <p className="mt-1 text-sm text-foreground">
            Key point of contact: Jason janse van Vuuren (Group M&amp;A Legal Head)
          </p>
        </div>
      ) : null}
    </section>
  );
}

function QuestionHeading({ n, id, children }: { n: number; id: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="mt-10 flex scroll-mt-40 items-center gap-2 font-display text-base font-semibold text-maroon">
      <span className="flex h-5 w-5 items-center justify-center rounded bg-blush text-[0.6875rem] text-maroon">{n}</span>
      {children}
    </h3>
  );
}

function Card({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="h-fit rounded-lg border border-border bg-surface/70 px-5 py-5">
      <div className="flex items-center gap-2 text-maroon">
        <span className="shrink-0">{icon}</span>
        <p className="label-eyebrow !text-maroon">{title}</p>
      </div>
      {children}
    </div>
  );
}

function PanelBody({ items, templates }: { items: LifecycleItem[]; templates?: boolean }) {
  return items.length > 0 ? (
    <ItemList items={items} accent="bg-maroon/50" templates={templates ?? false} />
  ) : (
    <p className="mt-3 text-sm text-muted-foreground">In development</p>
  );
}

function ItemList({ items, accent, templates }: { items: LifecycleItem[]; accent: string; templates?: boolean }) {
  return (
    <ul className="mt-3 space-y-3">
      {items.map((item) => (
        <li key={item.text} className="max-w-[70ch] text-sm leading-6 text-foreground">
          <div className="flex gap-3">
            <span aria-hidden className={cn("mt-2 h-1.5 w-1.5 shrink-0 rounded-full", accent)} />
            <span>
              {item.text}
              {templates ? <TemplateChip name={item.text} /> : null}
            </span>
          </div>
          {item.subs?.length ? (
            <ul className="ml-6 mt-2 space-y-1.5 border-l border-border pl-4">
              {item.subs.map((sub) => (
                <li key={sub} className="flex gap-2.5 text-sm leading-6 text-muted-foreground">
                  <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-border" />
                  <span>{sub}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
