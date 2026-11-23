import { useEffect, useRef, useState } from "react";
import { RelatedGuidance } from "@/components/Wayfinding";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Download,
  GitBranch,
  HelpCircle,
  Rocket,
  Share2,
  ShieldCheck,
  Target,
} from "lucide-react";
import { AppHeader } from "@/components/AppHeader";

import {
  DECISION_CATEGORIES,
  HUB_ARCHETYPES,
  HUB_KEY_ACTIVITIES,
  HUB_LAYERS,
  HUB_RESPONSIBILITIES,
  LAYER_DETAILS,
  type MandateTone,
} from "@/lib/central-hub";
import { HUB_MANDATE_ROWS, HUB_RESPONSIBILITY_ROWS } from "@/lib/central-hub-mandate";

const DESCRIPTION =
  "How the Absa Inorganic Change team centrally orchestrates a transaction: mobilisation, programme control, governance, decision rights, readiness integration and cutover.";

export const Route = createFileRoute("/operating-model/central-hub")({
  head: () => ({
    meta: [
      { title: "Central Hub Operating Model | Absa M&A Capability Hub" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Central Hub Operating Model | Absa M&A Capability Hub" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CentralHubPage,
});

/* ------------------------------------------------------------------ */
/* Shared tokens                                                       */
/* ------------------------------------------------------------------ */

const TONE_STYLES: Record<MandateTone, string> = {
  owns: "border-maroon bg-maroon text-maroon-foreground",
  coordinates: "border-maroon/25 bg-blush text-maroon",
  approval: "border-amber/40 bg-amber/15 text-foreground",
  executive: "border-foreground/20 bg-foreground text-background",
};

const TONE_LABELS: Record<MandateTone, string> = {
  owns: "Central Hub owns",
  coordinates: "Central Hub coordinates",
  approval: "Functional or local approval required",
  executive: "Executive governance",
};

function ToneBadge({ tone, label }: { tone: MandateTone; label?: string }) {
  return (
    <span
      className={`inline-block shrink-0 rounded-md border px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.12em] ${TONE_STYLES[tone]}`}
    >
      {label ?? TONE_LABELS[tone]}
    </span>
  );
}

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "responsibilities", label: "Responsibilities" },
  { id: "decision-rights", label: "Decision rights" },
  { id: "activities", label: "Key Activities" },
] as const;

const RESPONSIBILITY_ICONS: Record<string, typeof Rocket> = {
  education: Target,
  "programme-management": GitBranch,
  support: Rocket,
  "quality-assurance": ShieldCheck,
};


function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="label-eyebrow">{eyebrow}</p>
      <h2 className="mt-2 font-display text-xl font-semibold text-maroon sm:text-2xl">{title}</h2>
      {intro ? <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{intro}</p> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function CentralHubPage() {
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [layerId, setLayerId] = useState<string>("hub");
  const [openResponsibility, setOpenResponsibility] = useState<string | null>("education");
  const [openDecision, setOpenDecision] = useState<string | null>("independent");
  const [activityArchetypeId, setActivityArchetypeId] = useState(HUB_ARCHETYPES[0]!.id);

  const [notice, setNotice] = useState<string | null>(null);
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const layer = HUB_LAYERS.find((l) => l.id === layerId)!;
  const layerDetail = LAYER_DETAILS[layerId]!;
  const activityArchetype = HUB_ARCHETYPES.find((a) => a.id === activityArchetypeId)!;
  const activitySet = HUB_KEY_ACTIVITIES[activityArchetypeId]!;

  /* Scroll spy for the section rail. */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-140px 0px -60% 0px", threshold: 0 },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(
    () => () => {
      if (noticeTimer.current) clearTimeout(noticeTimer.current);
    },
    [],
  );

  function flash(message: string) {
    setNotice(message);
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(null), 3200);
  }

  function goToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  }

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      flash("Page link copied to your clipboard.");
    } catch {
      flash("Copy the address bar link to share this page.");
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader active="operating-model" />

      {/* Breadcrumbs and page actions */}
      <div className="sticky top-16 z-30 border-b border-border bg-surface/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1300px] flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 sm:px-6">
          <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 text-xs">
            <Link
              to="/operating-model"
              search={{ archetype: "balance-sheet-acquisition" }}
              className="text-muted-foreground transition-colors hover:text-maroon"
            >
              Operating Model
            </Link>
            <span className="text-muted-foreground/60">/</span>
            <span className="truncate font-medium text-maroon">Central Hub</span>
          </nav>

          <Link
            to="/operating-model"
            search={{ archetype: "balance-sheet-acquisition" }}
            className="inline-flex items-center gap-1.5 rounded-md border border-input bg-card px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-maroon/45 hover:text-maroon"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to operating model
          </Link>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-md border border-input bg-card px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-maroon/45 hover:text-maroon"
            >
              <Share2 className="h-3.5 w-3.5" />
              Share
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-md border border-input bg-card px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-maroon/45 hover:text-maroon"
            >
              <Download className="h-3.5 w-3.5" />
              Export
            </button>
            <button
              type="button"
              onClick={() =>
                flash(
                  "Use the section rail to move through the model. Cards and rows expand for detail.",
                )
              }
              className="inline-flex items-center gap-1.5 rounded-md border border-input bg-card px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-maroon/45 hover:text-maroon"
            >
              <HelpCircle className="h-3.5 w-3.5" />
              Help
            </button>
          </div>
        </div>
        {notice ? (
          <div className="mx-auto max-w-[1300px] px-4 pb-2 sm:px-6">
            <p className="rounded-md border border-maroon/20 bg-blush px-3 py-2 text-xs text-maroon">
              {notice}
            </p>
          </div>
        ) : null}
      </div>

      <div className="mx-auto flex max-w-[1300px] gap-10 px-4 sm:px-6">
        {/* Section rail */}
        <nav aria-label="Page sections" className="hidden w-[240px] shrink-0 lg:block">
          <div className="sticky top-32 py-10">
            <p className="label-eyebrow">On this page</p>
            <ul className="mt-3 space-y-0.5 border-l border-border">
              {SECTIONS.map((s) => {
                const active = activeSection === s.id;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => goToSection(s.id)}
                      aria-current={active ? "true" : undefined}
                      className={`-ml-px block w-full border-l-2 py-2 pl-4 text-left text-sm transition-colors ${
                        active
                          ? "border-maroon font-medium text-maroon"
                          : "border-transparent text-muted-foreground hover:border-maroon/40 hover:text-maroon"
                      }`}
                    >
                      {s.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        <main className="min-w-0 flex-1 pb-20 pt-8 lg:pt-10">
          {/* Mobile jump-to */}
          <div className="mb-6 lg:hidden">
            <label htmlFor="jump-to-section" className="label-eyebrow block">
              Jump to section
            </label>
            <select
              id="jump-to-section"
              value={activeSection}
              onChange={(e) => goToSection(e.target.value)}
              className="mt-2 w-full rounded-md border border-input bg-card px-3 py-2.5 text-sm text-foreground"
            >
              {SECTIONS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* ---------------- Overview ---------------- */}
          <section id="overview" className="scroll-mt-36">
            <p className="label-eyebrow">Central Hub</p>
            <h1 className="mt-2 max-w-3xl font-display text-3xl font-semibold tracking-tight text-maroon">
              Central Hub Operating Model
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground">
              The programme steering layer for mobilising, governing and coordinating M&amp;A
              transactions, while countries own local execution as a minimum, with ownership scaling
              based on maturity.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-4">
              {[
                {
                  label: "Education",
                  note: "Embedding best practice based on past experience",
                },
                {
                  label: "Programme Management",
                  note: "Programme plan, budget and reporting",
                },
                { label: "Support", note: "Leads mobilisation across the Absa community" },
                {
                  label: "Quality Assurance",
                  note: "Checks and challenges workstream outputs",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-maroon/20 bg-blush px-4 py-3"
                >
                  <p className="text-sm font-semibold text-maroon">{item.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-maroon/75">{item.note}</p>
                </div>
              ))}
            </div>

            <p className="mt-5 max-w-2xl text-xs leading-relaxed text-muted-foreground">
              The Central Hub is the Absa Inorganic Change team. It steers the programme through
              programme management, education, support and Quality Assurance, rather than owning
              every functional decision. In-country teams own local execution as a minimum, with
              ownership scaling based on maturity, supported by SA Functional Spokes where regions
              cannot own elements of execution.
            </p>


            {/* Layer diagram */}
            <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
              <div>
                <p className="label-eyebrow">Operating-model layers</p>
                <ul className="mt-3 space-y-0">
                  {HUB_LAYERS.map((l, i) => {
                    const selected = l.id === layerId;
                    return (
                      <li key={l.id}>
                        <button
                          type="button"
                          onClick={() => setLayerId(l.id)}
                          aria-pressed={selected}
                          className={`w-full rounded-xl border p-4 text-left transition-colors ${
                            selected
                              ? "border-maroon bg-maroon text-maroon-foreground"
                              : "border-input bg-card hover:border-maroon/45 hover:bg-surface"
                          }`}
                        >
                          <span className="flex items-center justify-between gap-3">
                            <span
                              className={`font-display text-base font-semibold ${
                                selected ? "" : "text-maroon"
                              }`}
                            >
                              {l.name}
                            </span>
                            <span
                              className={`shrink-0 rounded-md border px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.12em] ${
                                selected
                                  ? "border-maroon-foreground/40 text-maroon-foreground/90"
                                  : "border-input text-muted-foreground"
                              }`}
                            >
                              {LAYER_DETAILS[l.id]!.ownership}
                            </span>
                          </span>
                          <span
                            className={`mt-2 block text-xs leading-relaxed ${
                              selected ? "text-maroon-foreground/80" : "text-muted-foreground"
                            }`}
                          >
                            {l.description}
                          </span>
                        </button>
                        {i < HUB_LAYERS.length - 1 ? (
                          <div className="flex h-7 flex-col items-center justify-center">
                            <ArrowDown className="h-4 w-4 text-maroon/50" />
                          </div>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <aside className="rounded-xl border border-border bg-surface p-5">
                <p className="label-eyebrow">Selected layer</p>
                <p className="mt-2 font-display text-base font-semibold text-maroon">
                  {layer.name}
                </p>
                <ul className="mt-3 space-y-2">
                  {layerDetail.owns.map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-relaxed text-foreground">
                      <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-maroon/60" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-border pt-3 text-xs leading-relaxed text-muted-foreground">
                  {layerDetail.doesNotOwn}
                </p>
              </aside>
            </div>
          </section>

          {/* ---------------- Responsibilities ---------------- */}
          <section id="responsibilities" className="mt-16 scroll-mt-36">
            <SectionHeading
              eyebrow="What the Hub does"
              title="The four areas of Central Hub focus"
              intro="Education, Programme Management, Support and Quality Assurance. Select one for the underlying activities."
            />

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {HUB_RESPONSIBILITIES.map((item) => {
                const open = openResponsibility === item.id;
                const Icon = RESPONSIBILITY_ICONS[item.id] ?? Target;
                return (
                  <div key={item.id} className="contents">
                    <button
                      type="button"
                      onClick={() => setOpenResponsibility(open ? null : item.id)}
                      aria-expanded={open}
                      className={`flex flex-col rounded-xl border p-5 text-left transition-colors ${
                        open
                          ? "border-maroon bg-blush"
                          : "border-input bg-card hover:border-maroon/45 hover:bg-surface"
                      }`}
                    >
                      <Icon className="h-5 w-5 text-maroon" strokeWidth={1.5} />
                      <span className="mt-3 font-display text-base font-semibold text-maroon">
                        {item.title}
                      </span>
                      <span className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.summary}
                      </span>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-maroon">
                        {open ? "Hide activities" : "View activities"}
                        {open ? (
                          <ChevronDown className="h-3.5 w-3.5" />
                        ) : (
                          <ChevronRight className="h-3.5 w-3.5" />
                        )}
                      </span>
                    </button>
                    {open ? (
                      <div className="rounded-xl border border-maroon/25 bg-surface p-5 sm:col-span-2 xl:col-span-4">
                        <p className="label-eyebrow">{item.title}: activities</p>
                        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                          {item.detail.map((d) => (
                            <li
                              key={d}
                              className="flex gap-2 text-sm leading-relaxed text-foreground"
                            >
                              <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-maroon/60" />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
            {/* 1.2 High-Level Responsibilities table */}
            <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
              <p className="label-eyebrow border-b border-border bg-surface px-5 py-3">
                High-level responsibilities and boundaries
              </p>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[46rem] text-left text-sm">
                  <thead className="bg-surface text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Category</th>
                      <th className="px-5 py-3 font-semibold">Central Hub responsibility</th>
                      <th className="px-5 py-3 font-semibold">Boundary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {HUB_RESPONSIBILITY_ROWS.map((row) => (
                      <tr key={row.responsibility} className="border-t border-border align-top">
                        <td className="px-5 py-3 font-medium text-maroon">{row.category}</td>
                        <td className="px-5 py-3 leading-relaxed text-foreground">
                          {row.responsibility}
                        </td>
                        <td className="px-5 py-3 leading-relaxed text-muted-foreground">
                          {row.boundary}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ---------------- Decision rights ---------------- */}
          <section id="decision-rights" className="mt-16 scroll-mt-36">
            <SectionHeading
              eyebrow="Mandate"
              title="Decision rights"
              intro="Where a decision sits, from Central Hub authority through to executive governance."
            />
            <div className="mt-6 space-y-2">
              {DECISION_CATEGORIES.map((cat) => {
                const open = openDecision === cat.id;
                return (
                  <div
                    key={cat.id}
                    className={`overflow-hidden rounded-xl border ${
                      open ? "border-maroon" : "border-border"
                    } bg-card`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenDecision(open ? null : cat.id)}
                      aria-expanded={open}
                      className="flex w-full items-start gap-4 px-5 py-4 text-left transition-colors hover:bg-surface"
                    >
                      <span
                        className={`mt-1 h-8 w-1.5 shrink-0 rounded-full ${
                          cat.tone === "owns"
                            ? "bg-maroon"
                            : cat.tone === "coordinates"
                              ? "bg-maroon/30"
                              : cat.tone === "approval"
                                ? "bg-amber/60"
                                : "bg-foreground/70"
                        }`}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span className="font-display text-base font-semibold text-maroon">
                            {cat.title}
                          </span>
                          <ToneBadge tone={cat.tone} label={cat.owner} />
                        </span>
                        <span className="mt-1.5 block text-sm leading-relaxed text-muted-foreground">
                          {cat.explanation}
                        </span>
                      </span>
                      {open ? (
                        <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-maroon" />
                      ) : (
                        <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
                      )}
                    </button>
                    {open ? (
                      <div className="border-t border-border bg-surface px-5 py-4">
                        <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                          {cat.lead}
                        </p>
                        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                          {cat.items.map((item) => (
                            <li
                              key={item}
                              className="flex gap-2 text-sm leading-relaxed text-foreground"
                            >
                              <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-maroon/60" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>

            {/* 1.3 Decision Mandate table */}
            <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
              <p className="label-eyebrow border-b border-border bg-surface px-5 py-3">
                Decision mandate
              </p>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[52rem] text-left text-sm">
                  <thead className="bg-surface text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Decision type</th>
                      <th className="px-5 py-3 font-semibold">Central Hub mandate</th>
                      <th className="px-5 py-3 font-semibold">Examples</th>
                      <th className="px-5 py-3 font-semibold">Required approval</th>
                    </tr>
                  </thead>
                  <tbody>
                    {HUB_MANDATE_ROWS.map((row) => (
                      <tr key={row.decisionType} className="border-t border-border align-top">
                        <td className="px-5 py-3 font-medium text-maroon">{row.decisionType}</td>
                        <td className="px-5 py-3 leading-relaxed text-foreground">{row.mandate}</td>
                        <td className="px-5 py-3 leading-relaxed text-muted-foreground">
                          {row.examples}
                        </td>
                        <td className="px-5 py-3 leading-relaxed text-muted-foreground">
                          {row.approval}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ---------------- Key activities ---------------- */}
          <section id="activities" className="mt-16 scroll-mt-36">
            <SectionHeading
              eyebrow="Key Activities"
              title="Key Activities"
              intro="The Central Hub activity set for each deal archetype. Balance-sheet archetypes form the baseline; partial and full-business archetypes add further activities."
            />

            <div className="sticky top-[7.5rem] z-20 mt-6 rounded-xl border border-border bg-surface/95 p-5 backdrop-blur">
              <label htmlFor="activity-archetype" className="label-eyebrow block lg:hidden">
                Deal archetype
              </label>
              <select
                id="activity-archetype"
                value={activityArchetypeId}
                onChange={(e) => setActivityArchetypeId(e.target.value)}
                className="mt-2 w-full rounded-md border border-input bg-card px-3 py-2.5 text-sm text-foreground lg:hidden"
              >
                {HUB_ARCHETYPES.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>

              <div className="hidden flex-wrap gap-2 lg:flex">
                {HUB_ARCHETYPES.map((a) => {
                  const on = a.id === activityArchetypeId;
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => setActivityArchetypeId(a.id)}
                      aria-pressed={on}
                      className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                        on
                          ? "border-maroon bg-maroon text-maroon-foreground"
                          : "border-input bg-card text-muted-foreground hover:border-maroon/40 hover:text-maroon"
                      }`}
                    >
                      {a.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-maroon/25 bg-card p-5">
              <p className="label-eyebrow">{activityArchetype.name}</p>
              <h3 className="mt-2 font-display text-base font-semibold text-maroon">
                {activitySet.heading}
              </h3>
              {activitySet.basis ? (
                <p className="mt-2 border-l-2 border-maroon/40 pl-3 text-xs leading-relaxed text-muted-foreground">
                  {activitySet.basis}
                </p>
              ) : null}
              <ul className="mt-4 grid gap-2.5 lg:grid-cols-2">
                {activitySet.activities.map((item, i) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-lg border border-border bg-surface px-4 py-3 text-sm leading-relaxed text-foreground"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blush text-[0.625rem] font-semibold text-maroon">
                      {i + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <RelatedGuidance links={[{ label: "Operating Model", to: "/operating-model", search: { archetype: "balance-sheet-acquisition" } }, { label: "Central Hub", to: "/operating-model/central-hub" }, { label: "Governance and transaction roles", to: "/operating-model/governance" }, { label: "Mobilisation Roadmap", to: "/mobilisation" }]} />
      </main>
      </div>
    </div>
  );
}
