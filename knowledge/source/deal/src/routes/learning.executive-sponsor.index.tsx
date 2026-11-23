import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Circle, CircleDot, Clock, RotateCcw } from "lucide-react";
import { BrandHeader } from "@/components/BrandHeader";
import { FoundationsLink } from "@/components/learning/FoundationsLink";
import { CAPABILITIES, MODULES, TEACHING_IDS } from "@/lib/learning/executive-sponsor-modules";
import { moduleStatus, useESProgress } from "@/lib/learning/executive-sponsor-progress";

export const Route = createFileRoute("/learning/executive-sponsor/")({
  head: () => ({
    meta: [
      { title: "Accountable Executive (Executive Sponsor) pathway | Absa M&A Capability Hub" },
      { name: "description", content: "Seven short modules on directing, delegating and deciding as the Executive Sponsor of an M&A transaction." },
      { property: "og:title", content: "Accountable Executive (Executive Sponsor) pathway | Absa M&A Capability Hub" },
      { property: "og:description", content: "Own direction, protect delegation, secure resources and sponsor clear readiness decisions, in seven short modules." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PathwayHome,
});

function PathwayHome() {
  const { progress, ready, reset } = useESProgress();
  const done = progress.completed.length;
  const teachingVisited = TEACHING_IDS.every((id) => progress.started.includes(id) || progress.completed.includes(id));
  const nextId = MODULES.find((m) => !progress.completed.includes(m.id))?.id;
  const focus = progress.diagnostic
    ? CAPABILITIES.filter((c) => !progress.diagnostic!.correct[c.id])
    : [];

  return (
    <div className="min-h-screen bg-background">
      <BrandHeader />
        <FoundationsLink />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Link to="/learning" className="text-xs text-muted-foreground hover:text-maroon">
          ← Training &amp; learning pathways
        </Link>
        <h1 className="mt-3 font-display text-3xl font-semibold text-maroon">Accountable Executive (Executive Sponsor)</h1>
        <p className="mt-2 text-sm text-foreground">
          Own the transaction outcome and material decisions, while the Transaction Director leads execution.
        </p>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" aria-hidden /> About 32&nbsp;minutes · 7 modules of 3 to 5 minutes
        </p>


        <div className="mt-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Overall progress</span>
            <span key={ready ? "r" : "l"}>{ready ? `${done} of ${MODULES.length} complete` : "…"}</span>
          </div>
          <div
            className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={MODULES.length}
            aria-valuenow={done}
            aria-label="Modules complete"
          >
            <div className="h-full bg-maroon transition-all" style={{ width: `${(done / MODULES.length) * 100}%` }} />
          </div>
          {progress.pathwayComplete ? (
            <p className="mt-2 text-xs font-medium text-maroon">Pathway marked complete.</p>
          ) : null}
        </div>

        {progress.diagnostic ? (
          <section className="mt-6 border-l-2 border-maroon bg-blush/60 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-maroon">Your focus areas</p>
            {focus.length === 0 ? (
              <p className="mt-1 text-sm">Strong signals across all four capabilities. Work through the modules to confirm them.</p>
            ) : (
              <ul className="mt-1 space-y-1 text-sm">
                {focus.map((c) => (
                  <li key={c.id}>
                    {c.label}:{" "}
                    <Link to="/learning/executive-sponsor/$moduleId" params={{ moduleId: c.module }} className="font-medium text-maroon hover:underline">
                      {MODULES.find((m) => m.id === c.module)!.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ) : null}

        <ol className="mt-6 divide-y divide-border border-y border-border">
          {MODULES.map((m) => {
            const status = moduleStatus(progress, m.id);
            const locked = m.id === "capstone" && !teachingVisited;
            const action = status === "Complete" ? "Review" : status === "In progress" ? "Continue" : "Start";
            const current = m.id === nextId;
            return (
              <li key={m.id} className="flex items-center gap-3 py-3.5">
                <span className="shrink-0" aria-hidden>
                  {status === "Complete" ? (
                    <span key="done"><CheckCircle2 className="h-5 w-5 text-maroon" /></span>
                  ) : current ? (
                    <span key="current"><CircleDot className="h-5 w-5 text-maroon" /></span>
                  ) : (
                    <span key="todo"><Circle className="h-5 w-5 text-muted-foreground/50" /></span>
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">
                    <span className="text-muted-foreground">{m.no}.</span> <span>{m.title}</span>
                  </p>
                  <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" aria-hidden /><span>{m.minutes} min</span></span>
                    <span key={ready ? status : "loading"}>{ready ? status : "\u00a0"}</span>
                    {locked ? <span>Available once Modules 2 to 6 are visited</span> : null}
                  </p>
                </div>
                {locked ? (
                  <span className="shrink-0 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground">Start</span>
                ) : (
                  <Link
                    to="/learning/executive-sponsor/$moduleId"
                    params={{ moduleId: m.id }}
                    aria-label={`${action} ${m.title}`}
                    className={
                      current
                        ? "shrink-0 rounded-md bg-maroon px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90"
                        : "shrink-0 rounded-md border border-input px-3 py-1.5 text-xs font-medium hover:border-maroon/45 hover:text-maroon"
                    }
                  >
                    <span key={action}>{action}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>

        <button
          type="button"
          onClick={() => {
            if (window.confirm("Clear all Accountable Executive progress, including your diagnostic and capstone results?")) reset();
          }}
          className="mt-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-maroon"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Reset progress
        </button>
      </main>
    </div>
  );
}
