import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Circle, CircleDot, Clock, RotateCcw } from "lucide-react";
import { BrandHeader } from "@/components/BrandHeader";
import { DIAGNOSTIC, DIAGNOSTIC_PASS, MODULES, SKIPPABLE, SOURCES, TOTAL_MINUTES } from "@/lib/learning/foundations";
import { useFoundationsProgress } from "@/lib/learning/foundations-progress";

export const Route = createFileRoute("/learning/foundations/")({
  head: () => ({
    meta: [
      { title: "M&A Foundations: Intro to M&A | Absa M&A Capability Hub" },
      { name: "description", content: "Shared introduction to banking M&A for every role: what M&A is, why banks do it, outcomes, good execution and common pitfalls." },
      { property: "og:title", content: "M&A Foundations: Intro to M&A | Absa M&A Capability Hub" },
      { property: "og:description", content: "Seven short modules introducing banking M&A for every transaction role." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: FoundationsHome,
});

function FoundationsHome() {
  const { progress, ready, update, reset } = useFoundationsProgress();
  const done = progress.completed.length;
  const nextId = MODULES.find((m) => !progress.completed.includes(m.id))?.id;
  const [diagOpen, setDiagOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <BrandHeader />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Link to="/learning" className="text-xs text-muted-foreground hover:text-maroon">
          ← Training &amp; learning pathways
        </Link>
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-red">Shared by all roles · Start here</p>
        <h1 className="mt-1 font-display text-3xl font-semibold text-maroon">M&amp;A Foundations</h1>
        <p className="mt-1 text-sm font-medium text-foreground">Intro to M&amp;A</p>
        <p className="mt-2 text-sm text-foreground">
          What M&amp;A is, why banks do it, the outcomes they seek, what good execution looks like and where deals go wrong.
        </p>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" aria-hidden /> About {TOTAL_MINUTES}&nbsp;minutes · 7 modules of 3 to 5 minutes · no role choice needed
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground" aria-label="Recommended sequence">
          <span className="rounded border border-maroon bg-blush px-2 py-1 font-semibold text-maroon">1. M&amp;A Foundations</span>
          <span aria-hidden>→</span>
          <Link to="/deal-lifecycle" className="rounded border border-border px-2 py-1 hover:text-maroon">2. Lifecycle and Capability Hub</Link>
          <span aria-hidden>→</span>
          <Link to="/learning" className="rounded border border-border px-2 py-1 hover:text-maroon">3. Your role pathway</Link>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Overall progress</span>
            <span key={ready ? "r" : "l"}>{ready ? `${done} of ${MODULES.length} complete` : "…"}</span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuemin={0} aria-valuemax={MODULES.length} aria-valuenow={done} aria-label="Modules complete">
            <div className="h-full bg-maroon transition-all" style={{ width: `${(done / MODULES.length) * 100}%` }} />
          </div>
          {progress.pathwayComplete ? <p className="mt-2 text-xs font-medium text-maroon">Pathway complete.</p> : null}
          {progress.diagnosticPassed ? <p className="mt-1 text-xs text-muted-foreground">Modules 2 to 6 marked complete from the diagnostic.</p> : null}
        </div>

        {!progress.diagnosticPassed && ready ? (
          <section className="mt-6 border-l-2 border-maroon bg-blush/60 px-4 py-3">
            <p className="text-sm font-semibold text-maroon">Already experienced in M&amp;A?</p>
            <p className="mt-1 text-sm">Take an optional five-question check. Get {DIAGNOSTIC_PASS} right to skip Modules 2 to 6. You still complete the opening and closing scenarios.</p>
            {diagOpen ? (
              <Diagnostic
                onPass={() => update((p) => ({ ...p, diagnosticPassed: true, completed: Array.from(new Set([...p.completed, ...SKIPPABLE])) }))}
              />
            ) : (
              <button type="button" onClick={() => setDiagOpen(true)} className="mt-2 rounded-md border border-maroon px-3 py-1.5 text-xs font-semibold text-maroon hover:bg-maroon hover:text-primary-foreground">
                Take the check
              </button>
            )}
          </section>
        ) : null}

        <ol className="mt-6 divide-y divide-border border-y border-border">
          {MODULES.map((m) => {
            const status = progress.completed.includes(m.id) ? "Complete" : progress.started.includes(m.id) ? "In progress" : "Not started";
            const locked = m.id === "closing" && !progress.opening;
            const action = status === "Complete" ? "Review" : status === "In progress" ? "Continue" : "Start";
            const current = m.id === nextId;
            return (
              <li key={m.id} className="flex items-center gap-3 py-3.5">
                <span className="shrink-0" aria-hidden>
                  {status === "Complete" ? (
                    <span key="d"><CheckCircle2 className="h-5 w-5 text-maroon" /></span>
                  ) : current ? (
                    <span key="c"><CircleDot className="h-5 w-5 text-maroon" /></span>
                  ) : (
                    <span key="t"><Circle className="h-5 w-5 text-muted-foreground/50" /></span>
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold"><span className="text-muted-foreground">{m.no}.</span> <span>{m.title}</span></p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{m.summary}</p>
                  <p className="mt-0.5 flex flex-wrap items-center gap-x-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" aria-hidden /><span>{m.minutes} min</span></span>
                    <span key={ready ? status : "l"}>{ready ? status : "\u00a0"}</span>
                    {locked ? <span>Available after Module 1</span> : null}
                  </p>
                </div>
                {locked ? (
                  <span className="shrink-0 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground">Start</span>
                ) : (
                  <Link
                    to="/learning/foundations/$moduleId"
                    params={{ moduleId: m.id }}
                    aria-label={`${action} ${m.title}`}
                    className={current ? "shrink-0 rounded-md bg-maroon px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90" : "shrink-0 rounded-md border border-input px-3 py-1.5 text-xs font-medium hover:border-maroon/45 hover:text-maroon"}
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
          onClick={() => { if (window.confirm("Clear all M&A Foundations progress, including your scenario answers?")) reset(); }}
          className="mt-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-maroon"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Reset progress
        </button>
      </main>
    </div>
  );
}

function Diagnostic({ onPass }: { onPass: () => void }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const score = DIAGNOSTIC.filter((q, i) => answers[i] === q.correct).length;
  const allAnswered = Object.keys(answers).length === DIAGNOSTIC.length;
  return (
    <div className="mt-3 space-y-4">
      {DIAGNOSTIC.map((q, i) => (
        <fieldset key={i}>
          <legend className="text-sm font-medium">{i + 1}. {q.prompt}</legend>
          <div className="mt-1.5 space-y-1.5">
            {q.options.map((o, j) => {
              const sel = answers[i] === j;
              const tone = submitted ? (j === q.correct ? "border-maroon bg-background" : sel ? "border-red/60 bg-background" : "border-border bg-background") : sel ? "border-maroon bg-background" : "border-border bg-background";
              return (
                <button key={j} type="button" disabled={submitted} aria-pressed={sel} onClick={() => setAnswers((a) => ({ ...a, [i]: j }))} className={`flex w-full items-start gap-2 rounded-md border px-3 py-2 text-left text-sm ${tone} hover:border-maroon/50`}>
                  <span className="font-semibold text-maroon">{String.fromCharCode(65 + j)}</span><span>{o}</span>
                </button>
              );
            })}
          </div>
          {submitted ? <p className="mt-1 text-xs text-muted-foreground">{q.feedback[answers[i] ?? 0]}</p> : null}
        </fieldset>
      ))}
      {!submitted ? (
        <button type="button" disabled={!allAnswered} onClick={() => { setSubmitted(true); if (score >= DIAGNOSTIC_PASS) onPass(); }} className="rounded-md bg-maroon px-3 py-1.5 text-xs font-semibold text-primary-foreground disabled:opacity-40">
          Submit
        </button>
      ) : (
        <p className="text-sm font-medium" key={score}>
          {score} of {DIAGNOSTIC.length} correct. {score >= DIAGNOSTIC_PASS ? "Modules 2 to 6 are marked complete. Start with Module 1." : "Work through the modules. You can review this later."}
        </p>
      )}
    </div>
  );
}
