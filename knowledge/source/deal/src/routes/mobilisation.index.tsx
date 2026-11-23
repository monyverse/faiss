import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  FileInput,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { BrandHeader } from "@/components/BrandHeader";
import { PageToolbar } from "@/components/PageToolbar";
import { AiAgentSignpost, RelatedGuidance } from "@/components/Wayfinding";
import { useDealContext } from "@/lib/deal-context";
import { BucketIcon, MobilisationBlock } from "@/components/MobilisationBlocks";
import { AREAS, DAY_LANES, getBucket, getDayDetail, type DayDetail } from "@/lib/mobilisation";

const TITLE = "05) Mobilisation Roadmap | Absa M&A Capability Hub";
const DESCRIPTION =
  "A guided workflow for preparing, initiating and structuring an M&A transaction for delivery: the mobilisation journey, the team to stand up, the controls to approve and the first ten days.";

export const Route = createFileRoute("/mobilisation/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MobilisationHome,
});

/* ------------------------------- page ------------------------------- */

function MobilisationHome() {
  const [areaId, setAreaId] = useState("first-10-days");
  const [tabIds, setTabIds] = useState<Record<string, string>>({});

  const areaIndex = AREAS.findIndex((a) => a.id === areaId);
  const area = AREAS[areaIndex]!;
  const tabId = tabIds[area.id] ?? area.tabs[0]!.id;
  const tab = area.tabs.find((t) => t.id === tabId) ?? area.tabs[0]!;
  const previous = AREAS[areaIndex - 1];
  const next = AREAS[areaIndex + 1];

  function goto(id: string) {
    setAreaId(id);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-background">
      <BrandHeader />
      <PageToolbar
        crumbs={[
          { label: "05) Mobilisation Roadmap" },
          { label: area.label },
          ...(area.tabs.length > 1 ? [{ label: tab.label }] : []),
        ]}
        offsetClass="top-0"
        helpText="Pick a stage on the journey to see its detail, then use the bar below the header to move between the five mobilisation areas."
      />

      <DayQuickLinks />
      {/* Sticky area navigation */}
      {AREAS.length > 1 ? (
        <div className="sticky top-[2.75rem] z-20 border-b border-border bg-background/95 backdrop-blur print:hidden">
          <div className="no-scrollbar mx-auto flex max-w-[1300px] gap-1 overflow-x-auto px-4 sm:px-6">
            {AREAS.map((item) => {
              const active = item.id === area.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goto(item.id)}
                  className={`shrink-0 border-b-2 px-3 py-3 text-sm transition-colors ${
                    active
                      ? "border-red font-semibold text-maroon"
                      : "border-transparent text-muted-foreground hover:text-maroon"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <main id="first-10-days" className="mx-auto max-w-[1300px] scroll-mt-4 px-4 pb-24 sm:px-6">
        <Intro />

        {/* Pre-Day 1 */}
        <section id="pre-signature" className="mt-10 scroll-mt-28 rounded-md border border-border bg-card px-5 py-5 sm:px-6">
          <p className="label-eyebrow">Pre-Day 1</p>
          <h2 className="mt-2 font-display text-xl font-semibold text-maroon">
            Pre-Signature (Before the 10-Day Mobilisation Period)
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            <span className="font-semibold text-maroon">Required outcome:</span> Complete the
            groundwork to enable mobilisation to begin on Day 1, and pre-empt blockers
          </p>
          <p className="mt-4 text-sm font-semibold text-maroon">Key Activities:</p>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground">
            <li>
              Identify key stakeholders such as Accountable Exec, In-country CEOs, impacted Group
              Execs, and required Central Hub team
            </li>
            <li>
              Identify key information and stakeholders required to begin regulatory approval
              preparations, including:
              <ul className="mt-1.5 list-[circle] space-y-1 pl-5 text-muted-foreground">
                <li>Required Legal, CorpDev, and Compliance support</li>
                <li>
                  Key inputs into regulatory approval submissions, and stakeholders responsible for
                  each
                </li>
                <li>
                  Pre-requisites to submission – e.g., submission requires a detailed plan attached,
                  or analysis on customer impact
                </li>
              </ul>
            </li>
            <li>
              Sit with impacted in-country CEOs to:
              <ul className="mt-1.5 list-[circle] space-y-1 pl-5 text-muted-foreground">
                <li>Provide an introduction to the deal and its scope</li>
                <li>
                  Discuss prioritisation, including which BAU activities are in-flight, and what must
                  be wound down to support this deal
                </li>
              </ul>
            </li>
          </ul>
        </section>

        {/* Area header */}
        <section className="mt-14">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-blush text-maroon">
              <BucketIcon name={area.icon} className="h-4.5 w-4.5" />
            </span>
            <p className="label-eyebrow">{area.label}</p>
          </div>
          <h2 className="mt-4 font-display text-2xl font-semibold text-maroon lg:text-3xl">
            {area.label}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {area.blurb}
          </p>

          {/* Secondary tabs */}
          {area.tabs.length > 1 ? (
            <div className="no-scrollbar mt-7 flex gap-2 overflow-x-auto pb-1">
              {area.tabs.map((item) => {
                const active = item.id === tab.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTabIds((prev) => ({ ...prev, [area.id]: item.id }))}
                    className={`shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors ${
                      active
                        ? "bg-maroon font-medium text-maroon-foreground"
                        : "bg-surface text-muted-foreground hover:text-maroon"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          ) : null}
        </section>

        {/* Area content */}
        <section className="mt-8">
          <AreaContent areaId={area.id} tabId={tab.id} />
        </section>

        {/* Next-step navigation */}
        <nav className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          {previous ? (
            <button
              type="button"
              onClick={() => goto(previous.id)}
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-maroon"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Previous: {previous.label}
            </button>
          ) : (
            <span />
          )}
          {next ? (
            <button
              type="button"
              onClick={() => goto(next.id)}
              className="group inline-flex items-center gap-2 text-sm font-medium text-maroon transition-colors hover:text-red"
            >
              Next: {next.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          ) : null}
        </nav>
        <MobilisationRelated />
        <AiAgentSignpost />
      </main>
    </div>
  );
}

/* ------------------------------- intro ------------------------------ */

function Intro() {
  return (
    <section className="pt-10">
      <p className="label-eyebrow">Mobilisation</p>
      <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-maroon lg:text-4xl">
        Mobilisation Roadmap
      </h1>
      <div className="mt-4 h-0.5 w-16 bg-red" />
      <p className="mt-5 text-base leading-relaxed text-foreground">
        A guided workflow for preparing, initiating and structuring an M&amp;A transaction for
        delivery. Start with the first 10 business days below.
      </p>
    </section>
  );
}

/* ---------------------------- area content --------------------------- */

function AreaContent({ areaId, tabId }: { areaId: string; tabId: string }) {
  if (areaId === "first-10-days" && tabId === "overview") return <FirstDaysOverview />;
  if (areaId === "agent") return <AgentWorkflow />;

  const area = AREAS.find((a) => a.id === areaId)!;
  const tab = area.tabs.find((t) => t.id === tabId)!;
  return (
    <div className="space-y-8">
      {tab.bucketIds.map((id) => {
        const bucket = getBucket(id);
        if (!bucket) return null;
        return (
          <div key={id} className="space-y-6">
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {bucket.purpose}
            </p>
            {bucket.blocks.map((block, i) => (
              <MobilisationBlock key={i} block={block} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------ journey ------------------------------ */

const Triangle = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 10 9" className={`h-2.5 w-2.5 ${className}`} aria-hidden="true">
    <polygon points="5,0 10,9 0,9" fill="currentColor" />
  </svg>
);

const Circle = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 10 10" className={`h-2.5 w-2.5 ${className}`} aria-hidden="true">
    <circle cx="5" cy="5" r="4.5" fill="currentColor" />
  </svg>
);

const Diamond = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 10 10" className={`h-2.5 w-2.5 ${className}`} aria-hidden="true">
    <polygon points="5,0 10,5 5,10 0,5" fill="currentColor" />
  </svg>
);

function CadencePanel() {
  const items = [
    {
      icon: <Triangle className="text-maroon" />,
      title: "Morning standup",
      lines: ["Daily during Days 1–10", "08:00–08:30", "Purpose: activity assignment"],
    },
    {
      icon: <Circle className="text-red" />,
      title: "End-of-day status update",
      lines: ["Daily during Days 1–10", "17:00–17:30", "Purpose: status update"],
    },
    {
      icon: <Diamond className="text-maroon/70" />,
      title: "Executive Sponsor touchpoint",
      lines: ["Every other day during the first 10 business days"],
    },
  ];

  return (
    <aside className="flex flex-col gap-4">
      <div className="rounded-md border border-border bg-card px-5 py-5">
        <h4 className="font-display text-base font-semibold text-maroon">Daily meeting cadence</h4>
        <p className="mt-1 text-[0.75rem] leading-relaxed text-muted-foreground">
          Recurring across Days 1–10, with a Day 11 close-out after the first 10 business days.
        </p>
        <ul className="mt-4 grid gap-4 sm:grid-cols-3">
          {items.map((item) => (
            <li key={item.title} className="flex gap-3">
              <span className="mt-1.5 shrink-0">{item.icon}</span>
              <div>
                <p className="text-sm font-semibold leading-snug text-foreground">{item.title}</p>
                <div className="mt-1 space-y-0.5">
                  {item.lines.map((line) => (
                    <p key={line} className="text-[0.8125rem] leading-relaxed text-muted-foreground">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>


      </div>

      <div className="rounded-md border-l-2 border-maroon bg-blush px-4 py-3">
        <p className="label-eyebrow">Additional requirements</p>
        <ul className="mt-2 space-y-1 text-[0.8125rem] leading-relaxed text-foreground">
          <li>Everyone should be in person in their relevant countries.</li>
          <li>A war room should be established.</li>
          <li>War room attendees: Transaction Director, Programme Director and other Hub support.</li>
        </ul>
      </div>
    </aside>
  );
}

function DayRoadmap() {
  const days = Array.from({ length: 10 }, (_, i) => i + 1);
  const tone = (i: number) =>
    i % 2 === 0 ? "bg-maroon text-maroon-foreground" : "bg-red text-white";

  return (
    <div className="space-y-5">
      <div className="rounded-md bg-surface px-5 py-5">
        <div className="flex flex-wrap items-center gap-3">
          <p className="label-eyebrow">Visual roadmap</p>
        </div>
        <h3 className="mt-2 font-display text-lg font-semibold text-maroon">
          Buckets of work across the first 10 business days
        </h3>

        <div className="no-scrollbar mt-6 overflow-x-auto">
          <div className="min-w-[46rem]">
            <div className="grid grid-cols-[14rem_repeat(10,minmax(0,1fr))] items-end gap-x-1">
              <span className="label-eyebrow">Bucket of work</span>
              {days.map((d) => (
                <span key={d} className="text-center text-[0.6875rem] font-semibold text-maroon/70">
                  Day {d}
                </span>
              ))}
            </div>

            <div className="mt-2 space-y-2">
              {DAY_LANES.map((lane, i) => (
                <div
                  key={lane.workstream}
                  className="grid grid-cols-[14rem_repeat(10,minmax(0,1fr))] items-center gap-x-1"
                >
                  <span className="pr-3 text-sm font-medium leading-snug text-maroon">
                    {lane.workstream}
                  </span>
                  <div className="col-span-10 grid grid-cols-10 gap-x-1">
                    {days.map((d) => (
                      <div key={d} className="h-9 rounded-sm bg-card" />
                    ))}
                  </div>
                  <div className="col-span-10 col-start-2 -mt-9 grid grid-cols-10">
                    <div
                      className={`flex h-9 items-center justify-center gap-2 overflow-hidden rounded-sm ${tone(i)}`}
                      style={{
                        gridColumnStart: lane.start,
                        gridColumnEnd: lane.end + 1,
                      }}
                    >
                      <span className="truncate text-[0.6875rem] font-semibold">
                        {lane.start === lane.end
                          ? `Day ${lane.start}`
                          : `Days ${lane.start}–${lane.end}`}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-5 text-sm text-muted-foreground">
          The timing above is an indicative spine. Activities can overlap, but the exit gates should
          remain explicit.
        </p>
      </div>

      <CadencePanel />
    </div>
  );
}

/* --------------------------- first 10 days --------------------------- */

function FirstDaysOverview() {
  const bucket = getBucket("first-10-days");
  const entries = useMemo(() => {
    const block = bucket?.blocks.find((b) => b.kind === "entries");
    return block && block.kind === "entries" ? block.items : [];
  }, [bucket]);
  const [day, setDay] = useState(1);
  const detail = getDayDetail(day);
  useEffect(() => {
    const fromHash = () => {
      const m = /^#day-(\d+)$/.exec(window.location.hash);
      if (m && getDayDetail(Number(m[1]))) {
        setDay(Number(m[1]));
        document.getElementById("day-selector")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  return (
    <div className="space-y-8">
      <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">{bucket?.purpose}</p>

      {detail?.ownership ? <DayOwnership ownership={detail.ownership} /> : null}

      <DayRoadmap />

      {/* Day selector */}
      <div id="day-selector" className="scroll-mt-28">
        <p className="label-eyebrow">Select a day</p>
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((d) => {
            const active = d === day;
            const hasDetail = Boolean(getDayDetail(d));
            return (
              <button
                key={d}
                type="button"
                onClick={() => setDay(d)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors ${
                  active
                    ? "bg-maroon font-medium text-maroon-foreground"
                    : "bg-surface text-muted-foreground hover:text-maroon"
                }`}
              >
                Day {d}
                {hasDetail ? null : (
                  <span className="ml-1.5 text-[0.625rem] uppercase tracking-wider">·</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {detail ? <DayDetailView detail={detail} /> : <DayPending day={day} />}


      <Day11Calendar />
      <Day12Plus />
    </div>
  );
}

function Day12Plus() {
  return (
    <div id="day-12" className="mt-6 scroll-mt-28 rounded-md border border-border bg-card px-5 py-5">
      <p className="label-eyebrow">Day 12+</p>
      <p className="mt-1 text-sm font-semibold text-maroon">Day 12+</p>
      <p className="mt-3 text-sm leading-relaxed text-foreground">
        <span className="font-semibold text-maroon">Required outcome:</span> Reach an agreed upon
        joint migration plan, supported by logical assumptions and proper analysis
      </p>
      <p className="mt-4 text-sm font-semibold text-maroon">Key activities:</p>
      <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground">
        <li>
          Complete key planning artefacts briefed on Day 11 including:
          <ol className="mt-1.5 list-decimal space-y-1 pl-5 text-muted-foreground">
            <li>Workstream Charters</li>
            <li>Workstream Bricks</li>
            <li>Workstream Blueprints</li>
          </ol>
        </li>
        <li>
          Conduct regular joint alignment sessions between buyer and seller workstreams to enable
          discussions of gaps and milestone creation
        </li>
        <li>Hold regular working group meetings to assess planning progress and answer questions</li>
        <li>Plan required logistics for a joint buyer/seller planning workshop in-person</li>
        <li>
          Hold joint planning workshop at the end of the planning period where each workstream
          jointly presents L1 milestones and dependencies, and other workstreams can pose questions /
          sequencing issues or recommendations
        </li>
      </ul>
    </div>
  );
}

function Day11Calendar() {
  return (
        <div id="day-11" className="scroll-mt-28 rounded-md border border-border bg-card px-5 py-5">
          <p className="label-eyebrow">Day 11</p>
          <p className="mt-1 text-sm font-semibold text-maroon">Day 11: Mobilisation close-out &amp; planning kick-off</p>

          <div className="mt-3 rounded-md border border-border bg-background px-2 py-1">
            {[
              {
                time: "09:00–10:00 — Executive Sponsor all hands",
                intro:
                  "The Executive Sponsor / Accountable Exec holds an all hands meeting for every programme member onboarded thus far, it includes:",
                items: [
                  "A welcome message, thanking everyone for being part of the transaction and raising morale",
                  "A recap of the transaction, with a focus on its objectives and outcomes for Absa",
                  "A reminder of the governance structures, and roles and responsibilities",
                  "A reminder of the rules of engagement",
                ],
                highlight: true,
              },
              {
                time: "10:00–12:00 — Planning introduction",
                intro:
                  "The Transaction Director and Programme Manager lead a session to kick off the planning phase which includes:",
                items: [
                  "The date for a joint planning workshop to come, and its objectives",
                  "The activity required to get to this planning workshop, including introducing and defining deadlines for workstream charters, workstream bricks and workstream blueprints",
                  "Milestone creation guidelines, and how the above deliverables support these",
                  "How the joint planning workshop will run",
                  "Key points of contact for planning",
                ],
              },
              { time: "12:00–13:00 — Lunch", items: [] },
              {
                time: "13:00–15:00 — Joint workstream planning",
                intro:
                  "Each workstream and their counterparty counterpart jointly discuss planning activities including:",
                items: [
                  "Scheduling regular joint connect sessions",
                  "Beginning to define workstream bricks",
                  "Setting joint deadlines for bricks and blueprints completion",
                  "Discuss key nuances, and surface any major dependencies and differences between buyer and seller",
                ],
              },
              {
                time: "15:00–16:00 — Playback and wrap up",
                intro:
                  "Central Hub leads a wrap up of the day's activities, and plays back the key activities and deadlines for the workstreams.",
                items: [],
              },
            ].map((session) => {
              const [range = "", title = ""] = session.time.split(" — ");
              const [start = "", end = ""] = range.split("–");
              const hours = parseInt(end) - parseInt(start);
              return (
                <div
                  key={session.time}
                  className="grid grid-cols-[4.5rem_1fr] border-t border-border"
                  style={{ minHeight: `${hours * 5}rem` }}
                >
                  <div className="pr-3 pt-2 text-right">
                    <p className="font-mono text-[0.75rem] font-semibold text-foreground">{start}</p>
                    <p className="font-mono text-[0.6875rem] text-muted-foreground">{end}</p>
                  </div>
                  <div
                    className={
                      (session.highlight
                        ? "border-l-4 border-maroon bg-blush"
                        : session.items.length || session.intro
                          ? "border-l-4 border-red bg-surface"
                          : "border-l-4 border-border bg-muted/60") +
                      " my-1 rounded-r-md px-3 py-2.5"
                    }
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-[0.8125rem] font-semibold leading-snug text-foreground">{title}</p>
                      <span className="text-[0.6875rem] text-muted-foreground">
                        {hours} {hours === 1 ? "hour" : "hours"}
                      </span>
                    </div>
                    {session.intro ? (
                      <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted-foreground">
                        {session.intro}
                      </p>
                    ) : null}
                    {session.items.length ? (
                      <ul className="mt-2 space-y-1">
                        {session.items.map((item) => (
                          <li
                            key={item}
                            className="flex gap-2 text-[0.8125rem] leading-relaxed text-muted-foreground"
                          >
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-red" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              );
            })}
            <div className="grid grid-cols-[4.5rem_1fr] border-t border-border" />
          </div>
        </div>
  );
}

function DayOwnership({
  ownership,
}: {
  ownership: NonNullable<DayDetail["ownership"]>;
}) {
  return (
    <div className="rounded-md bg-surface px-5 py-5">
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-maroon" />
        <p className="label-eyebrow">Ownership</p>
      </div>
      <div className="mt-3 rounded-sm bg-maroon px-4 py-3">
        <p className="text-[0.625rem] font-semibold uppercase tracking-wider text-maroon-foreground/80">
          Lead owner
        </p>
        <p className="mt-1 font-display text-base font-semibold text-maroon-foreground">
          {ownership.lead}
        </p>
      </div>
      <p className="mt-4 text-[0.6875rem] font-semibold uppercase tracking-wider text-muted-foreground">
        Support
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {ownership.support.map((s) => (
          <span key={s} className="rounded-full bg-card px-3 py-1 text-sm text-foreground">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function DayPending({ day }: { day: number }) {
  return (
    <div className="rounded-md border border-dashed border-border bg-surface px-5 py-6">
      <p className="label-eyebrow">Day {day}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Detail to be added.</p>
    </div>
  );
}

function DayDetailView({ detail }: { detail: DayDetail }) {
  const [openInfo, setOpenInfo] = useState(false);
  const [activityState, setActivityState] = useState<
    Record<number, { owner: string; done: boolean }>
  >({});
  const setActivityOwner = (i: number, owner: string) =>
    setActivityState((s) => ({ ...s, [i]: { done: s[i]?.done ?? false, owner } }));
  const setActivityDone = (i: number, done: boolean) =>
    setActivityState((s) => ({ ...s, [i]: { owner: s[i]?.owner ?? "", done } }));

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <p className="label-eyebrow text-red">Day {detail.day}</p>
          {detail.placeholder ? (
            <span className="rounded-full bg-maroon px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider text-maroon-foreground">
              Placeholder
            </span>
          ) : null}
        </div>
        <h3 className="mt-2 font-display text-2xl font-semibold leading-tight text-maroon">
          {detail.title}
        </h3>
        <div className="mt-3 h-0.5 w-12 bg-red" />
        {detail.placeholder ? (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            The structure for this day is in place; all content below is a placeholder awaiting
            source material.
          </p>
        ) : null}
      </div>


      {/* Required outcome */}
      <div className="border-l-2 border-maroon bg-blush px-5 py-5">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-maroon" />
          <p className="label-eyebrow">Required outcome</p>
        </div>
        {detail.outcomeLede ? (
          <p className="mt-3 text-sm leading-relaxed text-maroon">{detail.outcomeLede}</p>
        ) : null}
        <ul className="mt-3 grid gap-2 sm:grid-cols-3">
          {detail.outcomes.map((item) => (
            <li
              key={item}
              className="flex gap-2 rounded-sm bg-card px-3 py-2.5 text-sm font-medium leading-snug text-maroon"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-red" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Key activities */}
      <div>
        <p className="label-eyebrow">Key activities</p>
        <ol className="mt-3 divide-y divide-border overflow-hidden rounded-md bg-surface">
          {detail.activities.map((item, i) => (
            <li key={item} className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center">
              <div className="flex flex-1 items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-maroon text-[0.625rem] font-semibold text-maroon-foreground">
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed text-foreground">{item}</span>
              </div>
              <div className="flex shrink-0 items-center gap-3 sm:ml-4">
                <label className="flex items-center gap-2">
                  <span className="sr-only">Owner</span>
                  <input
                    type="text"
                    value={activityState[i]?.owner ?? ""}
                    onChange={(e) => setActivityOwner(i, e.target.value)}
                    placeholder="Owner"
                    className="w-36 rounded-sm border border-border bg-card px-2.5 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-maroon focus:outline-none"
                  />
                </label>
                <label className="flex cursor-pointer items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-wider text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={activityState[i]?.done ?? false}
                    onChange={(e) => setActivityDone(i, e.target.checked)}
                    className="h-4 w-4 cursor-pointer accent-maroon"
                  />
                  Complete
                </label>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Touchpoint */}
      <div className="grid gap-5">
        {detail.touchpoint ? (
          <div className="rounded-md border border-red/50 bg-card px-5 py-5">
            <div className="flex flex-wrap items-center gap-2">
              <CalendarClock className="h-4 w-4 text-red" />
              <span className="rounded-full bg-red px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider text-white">
                Required touchpoint
              </span>
            </div>
            <h4 className="mt-3 font-display text-base font-semibold text-maroon">
              {detail.touchpoint.title}
            </h4>
            <p className="mt-3 text-[0.6875rem] font-semibold uppercase tracking-wider text-muted-foreground">
              Participants
            </p>
            <ul className="mt-2 space-y-1.5">
              {detail.touchpoint.participants.map((p) => (
                <li key={p} className="flex gap-2 text-sm leading-relaxed text-foreground">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-red" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

      </div>


      {/* Information required */}
      <div className="overflow-hidden rounded-md bg-surface">
        <button
          type="button"
          onClick={() => setOpenInfo(!openInfo)}
          aria-expanded={openInfo}
          className="flex w-full items-center gap-3 px-5 py-4 text-left"
        >
          <FileInput className="h-4 w-4 shrink-0 text-maroon" />
          <span className="flex-1 text-sm font-medium text-maroon">
            Information required to complete Day {detail.day}
          </span>
          {openInfo ? (
            <ChevronDown className="h-4 w-4 text-maroon" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
        {openInfo ? (
          <div className="step-fade bg-card px-5 py-5">
            <ul className="grid gap-2 sm:grid-cols-2">
              {detail.informationRequired.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-relaxed text-foreground">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-red" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ------------------------------- agent ------------------------------- */

function AgentWorkflow() {
  const [open, setOpen] = useState(false);
  const bucket = getBucket("agent");
  const block = bucket?.blocks.find((b) => b.kind === "agent");
  const agent = block && block.kind === "agent" ? block : null;

  const steps = [
    {
      number: "Step 1",
      title: "Provide deal information",
      body: "Collect the required transaction inputs.",
      items: agent?.inputs ?? [],
    },
    {
      number: "Step 2",
      title: "Review mobilisation recommendation",
      body: "Recommended workstreams, roles, governance, activities, stage gates and the first 10-day plan.",
      items: [
        "Recommended workstreams",
        "Required roles",
        "Governance structure",
        "Mobilisation activities",
        "Stage gates",
        "First 10-day plan",
      ],
    },
    {
      number: "Step 3",
      title: "Generate mobilisation pack",
      body: "Review the outputs produced for the transaction.",
      items: agent?.outputs ?? [],
    },
  ];

  return (
    <div className="space-y-10">
      <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">{bucket?.purpose}</p>

      <div className="flex flex-wrap items-center gap-3 rounded-md bg-surface px-5 py-4 text-sm font-medium text-maroon">
        <span className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-red" />
          Deal inputs
        </span>
        <ArrowRight className="h-4 w-4 text-maroon/40" />
        <span>Mobilisation logic</span>
        <ArrowRight className="h-4 w-4 text-maroon/40" />
        <span>Mobilisation outputs</span>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {steps.map((step, i) => (
          <div
            key={step.title}
            className={`flex h-full flex-col rounded-md px-6 py-6 ${
              i === 2 ? "bg-blush" : "bg-surface"
            }`}
          >
            <p className="label-eyebrow text-red">{step.number}</p>
            <h3 className="mt-2 font-display text-base font-semibold text-maroon">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            <ul className="mt-4 space-y-1.5">
              {step.items.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-relaxed text-foreground">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-red" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-md bg-surface">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="flex w-full items-center gap-3 px-5 py-4 text-left"
        >
          <span className="flex-1 text-sm font-medium text-maroon">
            How this recommendation is generated
          </span>
          {open ? (
            <ChevronDown className="h-4 w-4 text-maroon" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
        {open ? (
          <div className="step-fade bg-card px-5 py-5">
            <p className="label-eyebrow">Agent logic and guardrails</p>
            <ul className="mt-3 space-y-1.5">
              {(agent?.logic ?? []).map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-relaxed text-foreground">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-red" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/** Sticky quick links to each day of the First 10 Days. */
function DayQuickLinks() {
  return (
    <nav
      aria-label="Jump to a day"
      className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur print:hidden"
    >
      <div className="no-scrollbar mx-auto flex max-w-[1300px] items-center gap-1.5 overflow-x-auto px-4 py-2 sm:px-6">
        <a
          href="#pre-signature"
          className="shrink-0 rounded-md border border-input bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:border-maroon/45 hover:text-maroon"
        >
          Pre-Signature
        </a>
        <div className="flex shrink-0 items-center gap-1 rounded-md border border-maroon/30 bg-blush/50 px-1.5 py-1">
          <span className="px-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-maroon">
            Mobilisation Phase
          </span>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((d) => (
            <a
              key={d}
              href={`#day-${d}`}
              className="shrink-0 rounded-md border border-input bg-card px-2.5 py-1 text-xs font-medium text-foreground hover:border-maroon/45 hover:text-maroon"
            >
              Day {d}
            </a>
          ))}
          <a
            href="#day-11"
            className="shrink-0 rounded-md border border-input bg-card px-2.5 py-1 text-xs font-medium text-foreground hover:border-maroon/45 hover:text-maroon"
          >
            Day 11 - Kickoff
          </a>
        </div>
        <a
          href="#day-12"
          className="shrink-0 rounded-md border border-input bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:border-maroon/45 hover:text-maroon"
        >
          Day 12+ - Planning
        </a>
      </div>
    </nav>
  );
}

function MobilisationRelated() {
  const { archetypeId, stageId } = useDealContext();
  const aId = archetypeId ?? "balance-sheet-acquisition";
  return (
    <RelatedGuidance
      links={[
        {
          label: "Back to your lifecycle stage",
          to: "/deal-lifecycle",
          search: stageId ? { archetype: aId, stage: stageId } : { archetype: aId },
        },
        { label: "Transaction roles", to: "/operating-model/governance", hash: "roles" },
        { label: "Central Hub", to: "/operating-model/central-hub" },
        { label: "Governance and transaction roles", to: "/operating-model/governance" },
      ]}
    />
  );
}
