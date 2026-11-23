import { useEffect, useRef, useState } from "react";
import { RelatedGuidance } from "@/components/Wayfinding";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronDown, Download, HelpCircle, Share2 } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { PartnerSupportTable } from "@/components/PartnerSupportTable";
import { PENDING, type SpokeContent } from "@/lib/spoke-content";

const SECTIONS = [
  { id: "necessity", label: "Necessity by Deal Archetype" },
  { id: "key-role", label: "Key Role" },
  { id: "responsibilities", label: "Overall Responsibilities" },
  { id: "decision-mandate", label: "Decision Mandate" },
  { id: "capabilities", label: "Key Capabilities Required" },
  { id: "milestones", label: "Key Milestones and Activities" },
  { id: "sizing", label: "Factors Impacting Workstream Size" },
  { id: "partner", label: "Partner Acceleration" },
] as const;

function classificationStyle(classification: string) {
  const value = classification.toLowerCase();
  if (value.startsWith("core")) return "border-maroon bg-maroon text-maroon-foreground";
  if (value.startsWith("conditional")) return "border-amber/40 bg-amber/15 text-foreground";
  if (value.startsWith("required")) return "border-maroon/40 bg-blush text-maroon";
  return "border-border bg-surface text-muted-foreground";
}

function SectionHeading({ title, intro }: { title: string; intro?: string }) {
  return (
    <div className="max-w-2xl">
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
          <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-maroon/60" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function SpokeWorkstreamPage({
  content,
  topSlot,
}: {
  content: SpokeContent;
  topSlot?: React.ReactNode;
}) {
  const classifications = Array.from(
    new Set(content.necessityRows.map((r) => r.classification)),
  );

  const [activeSection, setActiveSection] = useState<string>("necessity");
  const [necessityFilter, setNecessityFilter] = useState<string>("all");
  const [openMandate, setOpenMandate] = useState<string | null>(
    content.mandateRows[0]?.id ?? null,
  );
  const [notice, setNotice] = useState<string | null>(null);
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const acquisitionSets = content.activitySets.filter((s) =>
    /acquisition|acquire|purchase/i.test(`${s.tab} ${s.heading}`),
  );
  const divestmentSets = content.activitySets.filter(
    (s) => !/acquisition|acquire|purchase/i.test(`${s.tab} ${s.heading}`),
  );
  const activityGroups = [
    { id: "acquisitions", label: "Acquisitions", sets: acquisitionSets },
    { id: "divestments", label: "Divestments", sets: divestmentSets },
  ].filter((g) => g.sets.length > 0);

  const [groupId, setGroupId] = useState<string>(activityGroups[0]?.id ?? "acquisitions");
  const activeGroup = activityGroups.find((g) => g.id === groupId) ?? activityGroups[0];

  const necessityRows = content.necessityRows.filter(
    (r) => necessityFilter === "all" || r.classification === necessityFilter,
  );

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
            <span className="text-muted-foreground">SA Functional Spokes</span>
            <span className="text-muted-foreground/60">/</span>
            <span className="truncate font-medium text-maroon">{content.name}</span>
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
                  "Use the section rail to move through the workstream. Rows expand and the archetype selector switches activity sets.",
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
          {topSlot}
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

          {/* Hero */}
          <div>
            <p className="label-eyebrow">SA Functional Spoke</p>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-maroon">
              {content.name}
            </h1>
            {content.keyRole.split(/\s*\n\s*\n\s*/).map((para, i) => (
              <p
                key={i}
                className={`mt-3 max-w-2xl text-base leading-relaxed text-foreground${i > 0 ? " font-semibold" : ""}`}
              >
                {para.replace(/\s{2,}/g, " ").trim()}
              </p>
            ))}
            {content.reference ? (
              <p className="mt-4 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                {content.reference}
              </p>
            ) : null}
          </div>

          {/* ---------------- A. Necessity ---------------- */}
          <section id="necessity" className="mt-12 scroll-mt-36">
            <SectionHeading
              title="Necessity by Deal Archetype"
              intro="Filter the matrix by classification."
            />

            <div className="mt-5 flex flex-wrap items-center gap-2">
              {["all", ...classifications].map((f) => {
                const on = necessityFilter === f;
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setNecessityFilter(f)}
                    aria-pressed={on}
                    className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                      on
                        ? "border-maroon bg-maroon text-maroon-foreground"
                        : "border-input bg-card text-muted-foreground hover:border-maroon/40 hover:text-maroon"
                    }`}
                  >
                    {f === "all" ? "All archetypes" : f}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-border bg-card">
              <div className="hidden grid-cols-[1.2fr_0.7fr_1.8fr] gap-4 border-b border-border bg-surface px-5 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground md:grid">
                <span>Deal archetype</span>
                <span>Classification</span>
                <span>Rationale</span>
              </div>
              {necessityRows.map((row) => (
                <div
                  key={row.archetype}
                  className="grid gap-2 border-b border-border px-5 py-4 last:border-b-0 md:grid-cols-[1.2fr_0.7fr_1.8fr] md:gap-4"
                >
                  <p className="text-sm font-semibold text-maroon">{row.archetype}</p>
                  <div>
                    <span
                      className={`inline-block rounded-md border px-2 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.12em] ${classificationStyle(row.classification)}`}
                    >
                      {row.classification}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{row.rationale}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ---------------- B. Key Role ---------------- */}
          <section id="key-role" className="mt-14 scroll-mt-36">
            <SectionHeading title="Key Role" />
            <div className="mt-4 rounded-xl border border-maroon/20 bg-blush p-5">
              <p className="text-sm leading-relaxed text-maroon">{content.keyRole}</p>
            </div>
          </section>

          {/* ---------------- C. Responsibilities ---------------- */}
          <section id="responsibilities" className="mt-14 scroll-mt-36">
            <SectionHeading title="Overall Responsibilities" />

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              {content.responsibilities.map((item, i) => (
                <div key={item} className="rounded-xl border border-border bg-card p-5">
                  <p className="font-display text-sm font-semibold text-maroon/60">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">{item}</p>
                </div>
              ))}
            </div>

            {content.boundaryItems.length ? (
              <div className="mt-6 rounded-xl border border-border bg-card p-5">
                <p className="text-sm font-semibold text-maroon">
                  Boundary with adjacent workstreams:
                </p>
                <Bullets items={content.boundaryItems} />
              </div>
            ) : null}

            {content.centralHubRelationship ? (
              <div className="mt-4 rounded-xl border border-border bg-surface p-5">
                <p className="text-sm leading-relaxed text-foreground">
                  {content.centralHubRelationship}
                </p>
              </div>
            ) : null}

            {content.regionalRelationship.length ? (
              <div className="mt-4 rounded-xl border border-border bg-card p-5">
                <p className="text-sm font-semibold text-maroon">
                  Relationship with Regional Spokes:
                </p>
                <Bullets items={content.regionalRelationship} />
              </div>
            ) : null}

            {content.externalDependencies ? (
              <div className="mt-4 rounded-xl border border-border bg-surface p-5">
                <p className="text-sm leading-relaxed text-foreground">
                  {content.externalDependencies}
                </p>
              </div>
            ) : null}
          </section>

          {/* ---------------- D. Decision Mandate ---------------- */}
          <section id="decision-mandate" className="mt-14 scroll-mt-36">
            <SectionHeading
              title="Decision Mandate"
              intro="Select a decision area for the authority, governance and escalation detail."
            />

            <div className="mt-5 overflow-hidden rounded-xl border border-border bg-card">
              {content.mandateRows.map((row) => {
                const open = openMandate === row.id;
                const cells = [
                  { label: "Central Hub role", value: row.hubRole },
                  { label: "Regional Spoke role", value: row.regionalRole },
                  { label: "Required governance / approval", value: row.governance },
                  { label: "Escalation trigger", value: row.escalation },
                ].filter((cell) => Boolean(cell.value));
                return (
                  <div key={row.id} className="border-b border-border last:border-b-0">
                    <button
                      type="button"
                      onClick={() => setOpenMandate(open ? null : row.id)}
                      aria-expanded={open}
                      className={`grid w-full gap-3 px-5 py-4 text-left transition-colors md:grid-cols-[1fr_1.6fr_auto] md:items-start ${
                        open ? "bg-blush/60" : "hover:bg-surface"
                      }`}
                    >
                      <p className="text-sm font-semibold text-maroon">{row.area}</p>
                      <div className="space-y-1">
                        <p className="text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                          Spoke Authority
                        </p>
                        {row.spokeAuthority.map((line) => (
                          <p key={line} className="text-sm leading-relaxed text-foreground">
                            {line}
                          </p>
                        ))}
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
                      />
                    </button>

                    {open ? (
                      <div className="border-t border-border bg-surface/60 px-5 py-5">
                        <div className="grid gap-4 lg:grid-cols-2">
                          {cells.map((cell) => (
                            <div
                              key={cell.label}
                              className="rounded-lg border border-border bg-card p-4"
                            >
                              <p className="label-eyebrow">{cell.label}</p>
                              <p className="mt-2 text-sm leading-relaxed text-foreground">
                                {cell.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </section>

          {/* ---------------- E. Capabilities ---------------- */}
          <section id="capabilities" className="mt-14 scroll-mt-36">
            <SectionHeading title="Key Capabilities Required" />

            <div className="mt-5 overflow-hidden rounded-xl border border-border bg-card">
              <div className="hidden grid-cols-[0.8fr_2fr] gap-4 border-b border-border bg-surface px-5 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground md:grid">
                <span>Capability category</span>
                <span>Capabilities required across the team</span>
              </div>
              {content.capabilityRows.map((row) => (
                <div
                  key={row.category}
                  className="grid gap-2 border-b border-border px-5 py-4 last:border-b-0 md:grid-cols-[0.8fr_2fr] md:gap-4"
                >
                  <p className="text-sm font-semibold text-maroon">{row.category}</p>
                  <p className="text-sm leading-relaxed text-foreground">{row.content}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ---------------- F. Milestones ---------------- */}
          <section id="milestones" className="mt-14 scroll-mt-36">
            <SectionHeading title="Key Milestones and Activities" />
            <div className="mt-3 max-w-3xl space-y-2">
              {content.milestoneIntro.map((line) => (
                <p key={line} className="text-sm leading-relaxed text-muted-foreground">
                  {line}
                </p>
              ))}
            </div>

            {content.serviceCatalogue?.length ? (
              <div className="mt-6 rounded-xl border border-maroon/20 bg-blush p-5">
                <p className="text-sm font-semibold text-maroon">Catalogue of Services</p>
                <ol className="mt-3 grid gap-2 sm:grid-cols-2">
                  {content.serviceCatalogue.map((service, i) => (
                    <li key={service} className="flex gap-2.5 text-sm leading-relaxed text-foreground">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-maroon text-[0.625rem] font-semibold text-maroon-foreground">
                        {i + 1}
                      </span>
                      <span>{service}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}

            {/* Acquisition vs divestment selector */}
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {activityGroups.map((group) => {
                  const on = group.id === groupId;
                  return (
                    <button
                      key={group.id}
                      type="button"
                      onClick={() => setGroupId(group.id)}
                      aria-pressed={on}
                      className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                        on
                          ? "border-maroon bg-maroon text-maroon-foreground"
                          : "border-input bg-card text-muted-foreground hover:border-maroon/40 hover:text-maroon"
                      }`}
                    >
                      {group.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 space-y-6">
              {activeGroup?.sets.map((activitySet) => (
                <div
                  key={activitySet.id}
                  className="rounded-xl border border-border bg-card p-5 sm:p-6"
                >
                  <p className="label-eyebrow">{activitySet.tab}</p>
                  <h3 className="mt-1 font-display text-lg font-semibold text-maroon">
                    {activitySet.heading}
                  </h3>
                  {activitySet.lead ? (
                    <p className="mt-2 rounded-md border border-amber/40 bg-amber/12 px-3 py-2 text-sm text-foreground">
                      {activitySet.lead}
                    </p>
                  ) : null}

                  {activitySet.milestones.length ? (
                    <div className="mt-5 space-y-3">
                      {activitySet.milestones.map((m, i) => (
                        <details
                          key={m.name}
                          className="group rounded-lg border border-border bg-surface/50 px-4 py-3"
                        >
                          <summary className="flex cursor-pointer list-none items-start gap-3">
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-maroon text-[0.625rem] font-semibold text-maroon-foreground">
                              {i + 1}
                            </span>
                            <span className="flex-1 text-sm font-semibold text-maroon">
                              {m.name}
                            </span>
                            <ChevronDown className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                          </summary>
                          <Bullets items={m.activities} />
                        </details>
                      ))}
                    </div>
                  ) : activitySet.lead ? null : (
                    <p className="mt-4 text-sm text-muted-foreground">{PENDING}</p>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs italic text-muted-foreground">
              Note: activity duration timings are based on a Partial Business Acquisition of
              Medium - High Complexity.
            </p>
          </section>

          {/* ---------------- G. Sizing ---------------- */}
          <section id="sizing" className="mt-14 scroll-mt-36">
            <SectionHeading title="Factors Impacting Workstream Size" />
            <div className="mt-4 rounded-xl border border-border bg-card p-5">
              {content.sizingDrivers?.length ? (
                <>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Factors to test for the 'Why this size' rationale
                  </p>
                  <ul className="mt-3 space-y-2">
                    {content.sizingDrivers.map((d) => (
                      <li key={d} className="flex gap-2 text-sm leading-relaxed text-foreground">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-maroon" />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs text-muted-foreground">State present / absent; note any exceptional impact</p>
                </>
              ) : null}
              {content.sizingFactors ? (
                <p className={`text-sm leading-relaxed text-foreground ${content.sizingDrivers?.length ? "mt-4" : ""}`}>
                  {content.sizingFactors}
                </p>
              ) : null}
              {!content.sizingDrivers?.length ? (
                <Link
                  to="/deal-lifecycle" hash="archetypes"
                  className="mt-3 inline-block text-xs font-medium text-maroon hover:underline"
                >
                  Deal Archetype documentation
                </Link>
              ) : null}
            </div>
          </section>

          {/* ---------------- H. Partner Acceleration ---------------- */}
          <section id="partner" className="mt-14 scroll-mt-36">
            <SectionHeading title="Partner Acceleration" />
            {content.partnerServices?.length ? (
              <div className="mt-5 overflow-hidden rounded-xl border border-border bg-card">
                <div className="hidden grid-cols-[1.6fr_0.9fr_0.9fr] gap-4 border-b border-border bg-surface px-5 py-3 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground md:grid">
                  <span>Key Service</span>
                  <span>Absa owned?</span>
                  <span>Preferred vendors</span>
                </div>
                {content.partnerServices.map((row) => (
                  <div
                    key={row.keyService}
                    className="grid gap-2 border-b border-border px-5 py-4 last:border-b-0 md:grid-cols-[1.6fr_0.9fr_0.9fr] md:gap-4"
                  >
                    <p className="text-sm font-semibold text-maroon">{row.keyService}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{row.absaOwned}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {row.preferredVendor}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <PartnerSupportTable />
            )}
            <Link
              to="/partner-acceleration"
              className="mt-4 inline-block text-xs font-medium text-maroon hover:underline"
            >
              Partner Acceleration model
            </Link>
          </section>
          <RelatedGuidance links={[{ label: "Operating Model", to: "/operating-model", search: { archetype: "balance-sheet-acquisition" } }, { label: "Central Hub", to: "/operating-model/central-hub" }, { label: "Governance and transaction roles", to: "/operating-model/governance" }, { label: "Mobilisation Roadmap", to: "/mobilisation" }]} />
      </main>
      </div>
    </div>
  );
}
