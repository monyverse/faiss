import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Circle, CircleDot, Clock, RotateCcw } from "lucide-react";
import { BrandHeader } from "@/components/BrandHeader";
import { FoundationsLink } from "@/components/learning/FoundationsLink";
import { LENSES } from "@/lib/learning/central-hub";
import { CAPABILITIES, MODULES, TEACHING_IDS } from "@/lib/learning/central-hub-modules";
import { moduleStatus, useCHProgress } from "@/lib/learning/central-hub-progress";

export const Route = createFileRoute("/learning/central-hub/")({
  head: () => ({
    meta: [
      { title: "Central Hub Programme Management pathway | Absa M&A Capability Hub" },
      { name: "description", content: "Eight short modules to mobilise, integrate, control and prove readiness for an M&A programme." },
      { property: "og:title", content: "Central Hub Programme Management pathway | Absa M&A Capability Hub" },
      { property: "og:description", content: "Run one reliable programme view and route decisions to the right authority, in eight short modules." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PathwayHome,
});

function PathwayHome() {
  const { progress, ready, reset, update } = useCHProgress();
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
        <h1 className="mt-3 font-display text-3xl font-semibold text-maroon">Central Hub Programme Management</h1>
        <p className="mt-2 text-sm text-foreground">
          Create one reliable programme view, challenge information and route decisions to the right authority, for Programme Managers, PMO Support and Transaction Directors.
        </p>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" aria-hidden /> About 36&nbsp;minutes · 8 modules of 3 to 5 minutes
        </p>

        <fieldset className="mt-6 rounded-lg border border-border p-4">
          <legend className="px-1 text-sm font-semibold">Your role lens</legend>
          <p className="text-xs text-muted-foreground">Programme Manager is the default. Your choice tailors scenarios, callouts, feedback and playbook prompts.</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {(["pm", "pmo", "td"] as const).map((id) => LENSES.find((l) => l.id === id)!).map((c) => {
              const on = ready && (progress.lens ?? "pm") === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => update((p) => ({ ...p, lens: c.id }))}
                  className={
                    on
                      ? "rounded-md border border-maroon bg-blush px-3 py-2 text-left text-sm font-semibold text-maroon"
                      : "rounded-md border border-input px-3 py-2 text-left text-sm hover:border-maroon/45"
                  }
                >
                  {c.name}
                </button>
              );
            })}
          </div>
          {ready ? (
            <p className="mt-3 text-xs">{LENSES.find((c) => c.id === (progress.lens ?? "pm"))!.text}</p>
          ) : null}
        </fieldset>

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
                    <Link to="/learning/central-hub/$moduleId" params={{ moduleId: c.module }} className="font-medium text-maroon hover:underline">
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
                    {locked ? <span>Available once Modules 2 to 7 are visited</span> : null}
                  </p>
                </div>
                {locked ? (
                  <span className="shrink-0 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground">Start</span>
                ) : (
                  <Link
                    to="/learning/central-hub/$moduleId"
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
            if (window.confirm("Clear all Central Hub Programme Management progress, including your diagnostic and capstone results?")) reset();
          }}
          className="mt-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-maroon"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Reset progress
        </button>
      </main>
    </div>
  );
}
