import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { AlertTriangle, ArrowLeft, ArrowRight, Check, Clock, Lightbulb, PartyPopper, Plus, Printer, RotateCcw, Sparkles, Target, Trophy, X } from "lucide-react";
import { BrandHeader } from "@/components/BrandHeader";
import { cn } from "@/lib/utils";
import { AttentionTimeline } from "@/components/AttentionTimeline";
import { AVOID_UNDERMINING, BOUNDARIES, CHALLENGE_QUESTIONS, CHAIN, CONTRIBUTIONS, CORE_RESOURCES, EXEC_VIEW, GO_FLOW, INTENSITY, LOOP, MANDATE, PLAYBOOK, PRINCIPLES, RESOURCE_NOTICE, START_STEPS, SUCCESS_MEASURES, SUPPORT_DELEGATION, VALUE_VISIBILITY, AUTHORITY_TEST, AUTHORITY_GUIDANCE } from "@/lib/learning/executive-sponsor";
import { BRIEF_GAPS, BRIEF_SNAPSHOT, CAPABILITIES, CAPSTONE, CAPSTONE_DECISIONS, DIAGNOSTIC, DIAGNOSTIC_DECISIONS, MODULES, PAPER_OPTIONS, PAPER_SITUATION, PLAYBOOK_PROMPTS, READINESS_OPTIONS, READINESS_SITUATION, RESOURCE_OPTIONS, RESOURCE_SITUATION, SORT_COLUMNS, SORT_ITEMS, TEACHING_IDS, type CapabilityId, type Confidence, type Decision, type ModuleId, type Opt, type SortKey } from "@/lib/learning/executive-sponsor-modules";
import { addUnique, useESProgress, type Attempt } from "@/lib/learning/executive-sponsor-progress";

export const Route = createFileRoute("/learning/executive-sponsor/$moduleId")({
  loader: ({ params }) => {
    const mod = MODULES.find((m) => m.id === params.moduleId);
    if (!mod) throw notFound();
    return { moduleId: mod.id as ModuleId };
  },
  head: ({ loaderData }) => {
    const mod = MODULES.find((m) => m.id === loaderData?.moduleId);
    const title = mod ? `${mod.no}. ${mod.title} | Accountable Executive pathway` : "Module unavailable | Accountable Executive pathway";
    const desc = mod ? `${mod.purpose}. A ${mod.minutes}-minute Accountable Executive module.` : "This module could not be found.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
        ...(mod ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  notFoundComponent: ModuleNotFound,
  component: ModulePage,
});

function ModuleNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <BrandHeader />
      <main className="mx-auto max-w-3xl px-6 py-10">
        <p className="text-sm">That module does not exist.</p>
        <Link to="/learning/executive-sponsor" className="mt-3 inline-block text-sm font-medium text-maroon hover:underline">
          Back to pathway
        </Link>
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shared UI                                                           */
/* ------------------------------------------------------------------ */

const LETTERS = ["A", "B", "C", "D", "E", "F"];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

function useShuffled<T>(items: T[], seed = 0): T[] {
  const [list, setList] = useState(items);
  useEffect(() => setList(shuffle(items)), [items, seed]);
  return list;
}

function More({ label, children }: { label: string; children: ReactNode }) {
  return (
    <details className="group mt-3 rounded-lg border border-border bg-surface text-sm transition-colors open:border-maroon/30 open:bg-blush/30">
      <summary className="flex cursor-pointer select-none list-none items-center justify-between gap-2 px-3 py-2.5 font-medium text-maroon focus:outline-none focus-visible:ring-2 focus-visible:ring-maroon/40 [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-2">
          <Plus className="h-4 w-4 transition-transform duration-200 group-open:rotate-45" aria-hidden />
          {label}
        </span>
      </summary>
      <div className="animate-fade-in px-3 pb-3 text-muted-foreground">{children}</div>
    </details>
  );
}

function FeedbackCard({ good, children }: { good: boolean; children: ReactNode }) {
  return (
    <div
      className={cn(
        "mt-4 animate-scale-in rounded-lg border p-4 text-sm",
        good ? "border-maroon/30 bg-blush/60" : "border-amber-600/40 bg-amber-50",
      )}
      aria-live="polite"
    >
      <p className={cn("mb-1.5 flex items-center gap-1.5 font-semibold", good ? "text-maroon" : "text-amber-800")}>
        {good ? <PartyPopper className="h-4 w-4" aria-hidden /> : <Lightbulb className="h-4 w-4" aria-hidden />}
        {good ? "Good call" : "Not quite"}
      </p>
      {children}
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.12em] text-maroon">{children}</p>;
}

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-2 space-y-1.5 text-sm">
      {items.map((t) => (
        <li key={t} className="flex gap-2">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-maroon" aria-hidden />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function OptionButton({
  letter,
  text,
  state,
  disabled,
  onClick,
}: {
  letter: string;
  text: string;
  state?: "selected" | "correct" | "wrong" | undefined;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-pressed={state === "selected" || state === "correct" || state === "wrong"}
      className={cn(
        "group/opt flex w-full items-start gap-3 rounded-lg border px-3 py-3 text-left text-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-maroon/40 disabled:cursor-default",
        state === "correct" && "animate-scale-in border-maroon bg-blush shadow-sm",
        state === "wrong" && "animate-scale-in border-amber-600/60 bg-amber-50",
        state === "selected" && "border-maroon bg-blush shadow-sm",
        !state && "border-input bg-card enabled:hover:-translate-y-0.5 enabled:hover:border-maroon/45 enabled:hover:shadow-md",
        !state && disabled && "opacity-60",
      )}
    >
      <span
        className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors",
          state === "correct" || state === "selected"
            ? "border-maroon bg-maroon text-primary-foreground"
            : state === "wrong"
              ? "border-amber-600 bg-amber-600 text-primary-foreground"
              : "border-maroon/40 text-maroon group-hover/opt:bg-blush",
        )}
      >
        {letter}
      </span>
      <span className="mt-0.5 flex-1">{text}</span>
      {state === "correct" ? <Check className="mt-0.5 h-4 w-4 shrink-0 text-maroon" aria-label="Recommended" /> : null}
      {state === "wrong" ? <X className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-label="Not recommended" /> : null}
    </button>
  );
}

/** Formative single choice with option feedback. `correct` is the recommended id. */
function Formative({ options, correct }: { options: Opt[]; correct: string }) {
  const list = useShuffled(options);
  const [picked, setPicked] = useState<string | null>(null);
  const chosen = options.find((o) => o.id === picked);
  return (
    <div>
      <div className="mt-3 space-y-2">
        {list.map((o, i) => (
          <OptionButton
            key={o.id}
            letter={LETTERS[i]!}
            text={o.text}
            disabled={!!picked}
            state={picked ? (o.id === correct ? "correct" : o.id === picked ? "wrong" : undefined) : undefined}
            onClick={() => setPicked(o.id)}
          />
        ))}
      </div>
      {chosen ? (
        <FeedbackCard good={picked === correct}>
          {chosen.feedback}
          {picked !== correct ? ` Recommended: ${options.find((o) => o.id === correct)?.feedback}` : ""}
        </FeedbackCard>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Module shell                                                        */
/* ------------------------------------------------------------------ */

type Step = { title: string; body: ReactNode };

function ModuleHeader({ id, outcome }: { id: ModuleId; outcome: string }) {
  const mod = MODULES.find((m) => m.id === id)!;
  return (
    <header className="print:hidden">
      <Link to="/learning/executive-sponsor" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-maroon">
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Back to pathway
      </Link>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        Accountable Executive · Module {mod.no} of {MODULES.length}
      </p>
      <h1 className="mt-1 font-display text-2xl font-semibold text-maroon sm:text-3xl">{mod.title}</h1>
      <p className="mt-2 text-sm font-medium">{outcome}</p>
      <p className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
        <Clock className="h-3.5 w-3.5" aria-hidden /> {mod.minutes} min
      </p>
    </header>
  );
}

function nextModule(id: ModuleId) {
  const i = MODULES.findIndex((m) => m.id === id);
  return MODULES[i + 1];
}

function TeachingModule({
  id,
  outcome,
  trigger,
  steps,
  apply,
  takeaway,
  action,
  extra,
}: {
  id: ModuleId;
  outcome: string;
  trigger: string;
  steps: Step[];
  apply: Step;
  takeaway: string;
  action: string;
  extra?: ReactNode | undefined;
}) {
  const { update } = useESProgress();
  const all: Step[] = [
    ...steps,
    apply,
    {
      title: "Takeaway",
      body: (
        <div>
          <div className="animate-scale-in rounded-xl bg-maroon p-5 text-primary-foreground">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] opacity-80">
              <Trophy className="h-4 w-4" aria-hidden /> Module complete
            </p>
            <p className="mt-2 font-display text-lg">{takeaway}</p>
          </div>
          <div className="mt-4 flex gap-3 rounded-lg border border-border bg-surface p-4 text-sm">
            <Target className="mt-0.5 h-4 w-4 shrink-0 text-maroon" aria-hidden />
            <p><span className="font-semibold">Your action: </span>{action}</p>
          </div>
          {extra}
        </div>
      ),
    },
  ];
  const [step, setStep] = useState(0);
  const last = step === all.length - 1;
  const next = nextModule(id);

  useEffect(() => {
    update((p) => ({ ...p, started: addUnique(p.started, id) }));
  }, [id, update]);
  useEffect(() => {
    if (last) update((p) => ({ ...p, completed: addUnique(p.completed, id) }));
  }, [last, id, update]);

  const pct = Math.round(((step + 1) / all.length) * 100);
  return (
    <>
      <ModuleHeader id={id} outcome={outcome} />
      <div className="mt-5 flex gap-3 rounded-xl border border-maroon/20 bg-blush/50 px-4 py-3 text-sm print:hidden">
        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-maroon" aria-hidden />
        <p className="italic">{trigger}</p>
      </div>
      <section className="mt-6 print:hidden" aria-live="polite">
        <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>Step {step + 1} of {all.length}</span>
          <span className="font-semibold text-maroon">{pct}%</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted" aria-hidden>
          <div className="h-full rounded-full bg-maroon transition-all duration-500 ease-out" style={{ width: `${pct}%` }} />
        </div>
        <ol className="mt-3 flex flex-wrap gap-1.5">
          {all.map((s, i) => (
            <li key={s.title + i}>
              <button
                type="button"
                onClick={() => setStep(i)}
                aria-current={i === step ? "step" : undefined}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-all",
                  i === step && "border-maroon bg-maroon text-primary-foreground shadow-sm",
                  i < step && "border-maroon/40 bg-blush text-maroon hover:border-maroon",
                  i > step && "border-input bg-card text-muted-foreground hover:border-maroon/45 hover:text-maroon",
                )}
              >
                {i < step ? <Check className="h-3 w-3" aria-hidden /> : <span className="font-semibold">{i + 1}</span>}
                <span className="max-w-[10rem] truncate">{s.title}</span>
              </button>
            </li>
          ))}
        </ol>
        <div key={step} className="mt-5 animate-fade-in rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="font-display text-xl font-semibold text-maroon">{all[step]!.title}</h2>
          <div className="mt-3">{all[step]!.body}</div>
        </div>
      </section>
      <nav className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 print:hidden">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="inline-flex items-center gap-1 rounded-md border border-input px-3 py-1.5 text-xs font-medium disabled:opacity-40"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Previous
        </button>
        {last ? (
          <div className="flex flex-wrap gap-2">
            <Link to="/learning/executive-sponsor" className="rounded-md border border-input px-3 py-1.5 text-xs font-medium hover:text-maroon">
              Back to pathway
            </Link>
            {next ? (
              <Link
                to="/learning/executive-sponsor/$moduleId"
                params={{ moduleId: next.id }}
                className="inline-flex items-center gap-1 rounded-md bg-maroon px-3 py-1.5 text-xs font-semibold text-primary-foreground"
              >
                Next module <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            ) : null}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            className="inline-flex items-center gap-1 rounded-md bg-maroon px-3 py-1.5 text-xs font-semibold text-primary-foreground"
          >
            Next <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </button>
        )}
      </nav>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Scenario runner (diagnostic + capstone)                             */
/* ------------------------------------------------------------------ */

function ScenarioBrief({ s }: { s: { title: string; intro: string; facts: string[]; close: string } }) {
  return (
    <section className="mt-6 animate-fade-in overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="bg-maroon px-5 py-4 text-primary-foreground">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] opacity-80">Scenario</p>
        <h2 className="mt-1 font-display text-xl font-semibold">{s.title}</h2>
      </div>
      <div className="p-5">
        <p className="text-sm">{s.intro}</p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {s.facts.map((f, i) => (
            <li
              key={f}
              className="flex gap-3 rounded-lg border border-border bg-surface p-3 text-sm animate-fade-in"
              style={{ animationDelay: `${i * 70}ms`, animationFillMode: "both" }}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blush text-xs font-semibold text-maroon">
                {i + 1}
              </span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm font-medium">{s.close}</p>
      </div>
    </section>
  );
}

function ConfidencePicker({ value, onChange }: { value?: Confidence | undefined; onChange: (c: Confidence) => void }) {
  const levels = ["Low", "Medium", "High"] as Confidence[];
  return (
    <fieldset className="mt-5 animate-fade-in rounded-lg border border-border bg-surface p-4">
      <legend className="px-1 text-sm font-medium">How confident are you in that choice?</legend>
      <div className="mt-1 grid grid-cols-3 gap-2">
        {levels.map((c, i) => (
          <button
            key={c}
            type="button"
            aria-pressed={value === c}
            onClick={() => onChange(c)}
            className={cn(
              "flex flex-col items-center gap-1.5 rounded-lg border px-3 py-2.5 text-xs font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-maroon/40",
              value === c ? "scale-[1.03] border-maroon bg-blush text-maroon shadow-sm" : "border-input bg-card hover:-translate-y-0.5 hover:border-maroon/45",
            )}
          >
            <span className="flex items-end gap-0.5" aria-hidden>
              {levels.map((_, b) => (
                <span
                  key={b}
                  className={cn("w-1.5 rounded-sm", b <= i ? "bg-maroon" : "bg-muted")}
                  style={{ height: `${6 + b * 4}px` }}
                />
              ))}
            </span>
            {c}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function DecisionStep({
  d,
  index,
  total,
  mode,
  onDone,
}: {
  d: Decision;
  index: number;
  total: number;
  mode: "diagnostic" | "capstone";
  onDone: (firstTryCorrect: boolean, confidence: Confidence) => void;
}) {
  const [seed, setSeed] = useState(0);
  const list = useShuffled(d.options, seed);
  const [picked, setPicked] = useState<string | null>(null);
  const [tries, setTries] = useState(0);
  const [firstCorrect, setFirstCorrect] = useState<boolean | null>(null);
  const [conf, setConf] = useState<Confidence>();
  const correct = picked === d.answer;
  const revealed = mode === "capstone" && picked && (correct || tries >= 2);

  function choose(id: string) {
    setPicked(id);
    setTries((t) => t + 1);
    if (firstCorrect === null) setFirstCorrect(id === d.answer);
  }

  const canContinue = mode === "diagnostic" ? picked && conf : revealed && conf;

  return (
    <section key={index} className="mt-6 animate-fade-in rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-maroon">Decision {index + 1} of {total}</p>
        <div className="flex gap-1.5" aria-hidden>
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i < index ? "w-2 bg-maroon" : i === index ? "w-6 bg-maroon" : "w-2 bg-muted",
              )}
            />
          ))}
        </div>
      </div>
      <h2 className="mt-2 font-display text-lg font-semibold">{d.question}</h2>
      <div className="mt-4 space-y-2">
        {list.map((o, i) => {
          let state: "selected" | "correct" | "wrong" | undefined;
          if (mode === "diagnostic") state = picked === o.id ? "selected" : undefined;
          else if (picked === o.id) state = o.id === d.answer ? "correct" : "wrong";
          else if (revealed && o.id === d.answer) state = "correct";
          return (
            <OptionButton
              key={o.id}
              letter={LETTERS[i]!}
              text={o.text}
              state={state}
              disabled={mode === "capstone" ? !!picked : false}
              onClick={() => (mode === "diagnostic" ? setPicked(o.id) : choose(o.id))}
            />
          );
        })}
      </div>

      {mode === "capstone" && picked ? (
        <FeedbackCard good={correct}>
          <p>{d.options.find((o) => o.id === picked)?.feedback}</p>
          {revealed ? <p className="mt-2"><span className="font-semibold">Why: </span>{d.reasoning}</p> : null}
          {!correct && tries < 2 ? (
            <button
              type="button"
              onClick={() => {
                setPicked(null);
                setSeed((s) => s + 1);
              }}
              className="mt-3 inline-flex items-center gap-1 rounded-full border border-maroon/40 bg-card px-3 py-1 text-xs font-medium text-maroon transition-colors hover:bg-maroon hover:text-primary-foreground"
            >
              <RotateCcw className="h-3 w-3" aria-hidden /> Try again
            </button>
          ) : null}
        </FeedbackCard>
      ) : null}

      {(mode === "diagnostic" && picked) || revealed ? <ConfidencePicker value={conf} onChange={setConf} /> : null}

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          disabled={!canContinue}
          onClick={() => onDone(mode === "diagnostic" ? picked === d.answer : !!firstCorrect, conf!)}
          className="inline-flex items-center gap-1 rounded-md bg-maroon px-3 py-1.5 text-xs font-semibold text-primary-foreground disabled:opacity-40"
        >
          {index + 1 === total ? "See results" : "Next decision"} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </button>
      </div>
    </section>
  );
}

function useScenarioRun(decisions: Decision[]) {
  const [i, setI] = useState(0);
  const [correct, setCorrect] = useState<Partial<Record<CapabilityId, boolean>>>({});
  const [confidence, setConfidence] = useState<Partial<Record<CapabilityId, Confidence>>>({});
  const record = (d: Decision, ok: boolean, c: Confidence) => {
    setCorrect((x) => ({ ...x, [d.capability]: ok }));
    setConfidence((x) => ({ ...x, [d.capability]: c }));
    setI((n) => n + 1);
  };
  const restart = () => {
    setI(0);
    setCorrect({});
    setConfidence({});
  };
  return { i, done: i >= decisions.length, correct, confidence, record, restart };
}

const score = (a?: Attempt) => (a ? Object.values(a.correct).filter(Boolean).length : 0);
const CONF_VAL: Record<Confidence, number> = { Low: 1, Medium: 2, High: 3 };
const avgConf = (a?: Attempt) => {
  const v = Object.values(a?.confidence ?? {}) as Confidence[];
  return v.length ? v.reduce((n, c) => n + CONF_VAL[c], 0) / v.length : 0;
};
const confLabel = (n: number) => (n === 0 ? "Not recorded" : n < 1.67 ? "Low" : n < 2.34 ? "Medium" : "High");

/* ------------------------------------------------------------------ */
/* Module 1                                                            */
/* ------------------------------------------------------------------ */

function StartingPoint() {
  const { progress, update } = useESProgress();
  const run = useScenarioRun(DIAGNOSTIC_DECISIONS);
  const [retake, setRetake] = useState(false);

  useEffect(() => {
    update((p) => ({ ...p, started: addUnique(p.started, "starting-point") }));
  }, [update]);

  useEffect(() => {
    if (run.done && !retake) {
      update((p) =>
        p.diagnostic
          ? { ...p, completed: addUnique(p.completed, "starting-point") }
          : {
              ...p,
              diagnostic: { correct: run.correct as Attempt["correct"], confidence: run.confidence },
              completed: addUnique(p.completed, "starting-point"),
            },
      );
    }
  }, [run.done, retake, run.correct, run.confidence, update]);

  const result = progress.diagnostic;
  const showResult = result && (run.done || !retake) && (run.done || run.i === 0);

  return (
    <>
      <ModuleHeader id="starting-point" outcome="See where your judgement is already strong and where to look more closely." />
      {showResult && result ? (
        <section className="mt-6">
          <h2 className="text-lg font-semibold">Your starting point</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-[0.1em] text-muted-foreground">
                  <th className="py-2 pr-3 font-semibold">Capability</th>
                  <th className="py-2 pr-3 font-semibold">Starting signal</th>
                  <th className="py-2 pr-3 font-semibold">Confidence</th>
                  <th className="py-2 font-semibold">Suggested module</th>
                </tr>
              </thead>
              <tbody>
                {CAPABILITIES.map((c) => (
                  <tr key={c.id} className="border-b border-border">
                    <td className="py-2 pr-3 font-medium">{c.label}</td>
                    <td className="py-2 pr-3">{result.correct[c.id] ? "Strong signal" : "Worth a closer look"}</td>
                    <td className="py-2 pr-3">{result.confidence[c.id] ?? "Not recorded"}</td>
                    <td className="py-2">
                      <Link to="/learning/executive-sponsor/$moduleId" params={{ moduleId: c.module }} className="text-maroon hover:underline">
                        {MODULES.find((m) => m.id === c.module)!.title}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 border-l-2 border-maroon bg-blush/60 px-3 py-2 text-sm">{DIAGNOSTIC.message}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link to="/learning/executive-sponsor" className="rounded-md border border-input px-3 py-1.5 text-xs font-medium hover:text-maroon">
              Back to pathway
            </Link>
            <Link
              to="/learning/executive-sponsor/$moduleId"
              params={{ moduleId: "mandate" }}
              className="inline-flex items-center gap-1 rounded-md bg-maroon px-3 py-1.5 text-xs font-semibold text-primary-foreground"
            >
              Next module <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
          {run.done ? null : (
            <button
              type="button"
              onClick={() => {
                setRetake(true);
                run.restart();
              }}
              className="mt-4 text-xs text-muted-foreground underline hover:text-maroon"
            >
              Go through the scenario again (your first result is kept)
            </button>
          )}
        </section>
      ) : (
        <>
          <ScenarioBrief s={DIAGNOSTIC} />
          {run.done ? (
            <p className="mt-6 text-sm">
              Scenario complete. Your first result is kept for comparison.{" "}
              <Link to="/learning/executive-sponsor" className="font-medium text-maroon hover:underline">Back to pathway</Link>
            </p>
          ) : (
            <DecisionStep
              key={run.i}
              d={DIAGNOSTIC_DECISIONS[run.i]!}
              index={run.i}
              total={DIAGNOSTIC_DECISIONS.length}
              mode="diagnostic"
              onDone={(ok, c) => run.record(DIAGNOSTIC_DECISIONS[run.i]!, ok, c)}
            />
          )}
        </>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Shared interactions                                                 */
/* ------------------------------------------------------------------ */

function SortTask() {
  const items = useShuffled(SORT_ITEMS);
  const [placed, setPlaced] = useState<Record<string, SortKey>>({});
  const cols = SORT_COLUMNS;
  return (
    <div className="mt-3 space-y-3">
      <p className="text-sm">Choose where each item belongs.</p>
      {items.map((it) => {
        const p = placed[it.text];
        return (
          <div key={it.text} className="rounded-md border border-border p-3">
            <p className="text-sm font-medium">{it.text}</p>
            <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label={`Sort: ${it.text}`}>
              {cols.map(([k, l]) => (
                <button
                  key={k}
                  type="button"
                  aria-pressed={p === k}
                  onClick={() => setPlaced((x) => ({ ...x, [it.text]: k }))}
                  className={cn(
                    "rounded-md border px-2.5 py-1 text-xs font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-maroon/40",
                    p === k
                      ? k === it.answer
                        ? "border-maroon bg-blush text-maroon"
                        : "border-amber-600/60 bg-amber-50 text-amber-800"
                      : "border-input hover:border-maroon/45",
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
            {p ? (
              <p className="mt-2 text-xs text-muted-foreground" aria-live="polite">
                {p === it.answer ? "Yes. " : `Better as ${cols.find((c) => c[0] === it.answer)![1]}. `}
                {it.why}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function PickN({
  items,
  prompt,
}: {
  items: { id: string; text: string; correct: boolean; feedback: string }[];
  prompt: string;
}) {
  const list = useShuffled(items);
  const [sel, setSel] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const need = items.filter((g) => g.correct).length;
  return (
    <div className="mt-2">
      <p className="text-sm">{prompt}</p>
      <div className="mt-3 space-y-2">
        {list.map((g, i) => {
          const on = sel.includes(g.id);
          return (
            <div key={g.id}>
              <OptionButton
                letter={LETTERS[i]!}
                text={g.text}
                disabled={checked}
                state={checked ? (g.correct ? "correct" : on ? "wrong" : undefined) : on ? "selected" : undefined}
                onClick={() => setSel((s) => (on ? s.filter((x) => x !== g.id) : s.length < need ? [...s, g.id] : s))}
              />
              {checked ? <p className="mt-1 pl-7 text-xs text-muted-foreground">{g.feedback}</p> : null}
            </div>
          );
        })}
      </div>
      {!checked ? (
        <button
          type="button"
          disabled={sel.length !== need}
          onClick={() => setChecked(true)}
          className="mt-3 rounded-md bg-maroon px-3 py-1.5 text-xs font-semibold text-primary-foreground disabled:opacity-40"
        >
          Check my choice
        </button>
      ) : null}
    </div>
  );
}


/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function Terms({ items }: { items: [string, string][] }) {
  return (
    <dl className="mt-3 space-y-1.5 rounded-md bg-surface px-3 py-2 text-sm">
      {items.map(([t, d]) => (
        <div key={t}>
          <dt className="inline font-semibold text-maroon">{t}: </dt>
          <dd className="inline">{d}</dd>
        </div>
      ))}
    </dl>
  );
}

function Notice() {
  return (
    <p className="mt-3 flex gap-2 rounded-md border border-amber-600/40 bg-amber-50 px-3 py-2 text-sm text-amber-900">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      {RESOURCE_NOTICE}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Module 2                                                            */
/* ------------------------------------------------------------------ */

function MandateModule() {
  return (
    <TeachingModule
      id="mandate"
      outcome="Know what to direct, delegate, decide and sponsor."
      trigger="A senior colleague asks you to 'just decide it'. Is it yours to decide?"
      steps={[
        {
          title: "Accountable for the outcome",
          body: (
            <>
              <p className="text-sm">
                You own the transaction outcome, strategic alignment, organisational commitment and material decisions. The Transaction
                Director owns successful execution and integrated programme leadership within delegated authority.
              </p>
              <More label="See more: the accountability chain">
                <ul className="space-y-2">
                  {CHAIN.map((c) => (
                    <li key={c.id}><span className="font-semibold text-foreground">{c.name}: </span>{c.text}</li>
                  ))}
                </ul>
              </More>
              <More label="See more: what the Sponsor contributes">
                <ul className="space-y-2">
                  {CONTRIBUTIONS.map((c) => (
                    <li key={c.title}><span className="font-semibold text-foreground">{c.title}: </span>{c.text}</li>
                  ))}
                </ul>
              </More>
            </>
          ),
        },
        {
          title: "Direct, delegate, decide, sponsor",
          body: (
            <>
              <dl className="grid gap-2 text-sm sm:grid-cols-2">
                <div className="rounded-md bg-surface px-3 py-2"><dt className="font-semibold text-maroon">Direct</dt><dd className="mt-0.5">Strategic purpose, success criteria, priorities and risk appetite.</dd></div>
                <div className="rounded-md bg-surface px-3 py-2"><dt className="font-semibold text-maroon">Delegate</dt><dd className="mt-0.5">Integrated execution and day-to-day programme leadership to the Transaction Director.</dd></div>
                <div className="rounded-md bg-surface px-3 py-2"><dt className="font-semibold text-maroon">Decide</dt><dd className="mt-0.5">Material matters within Sponsor authority involving scope, budget, timing, value or risk.</dd></div>
                <div className="rounded-md bg-surface px-3 py-2"><dt className="font-semibold text-maroon">Sponsor or escalate</dt><dd className="mt-0.5">Decisions reserved for a board, committee or specialist authority.</dd></div>
              </dl>
              <Terms
                items={[
                  ["Delegated authority", "a decision the Sponsor has formally allowed another role to make within stated limits"],
                  ["Reserved decision", "a decision that must remain with a named senior person or formal forum because of its material impact"],
                ]}
              />
              <More label="See more: the full lists">
                {(["direct", "delegate", "decide", "escalate"] as const).map((k) => (
                  <div key={k} className="mt-2">
                    <p className="font-semibold text-foreground">{MANDATE[k].label}. {MANDATE[k].lead}</p>
                    <Bullets items={MANDATE[k].items} />
                    {MANDATE[k].note ? <p className="mt-1 italic">{MANDATE[k].note}</p> : null}
                  </div>
                ))}
              </More>
            </>
          ),
        },
        {
          title: "Where the boundary sits",
          body: (
            <>
              <p className="text-sm">Before intervening, test whether the matter needs you at all.</p>
              <Bullets items={AUTHORITY_TEST} />
              <More label="Why this matters">
                <p>If any of the first four answers is yes: {AUTHORITY_GUIDANCE.sponsor} Where a specialist authority owns it: {AUTHORITY_GUIDANCE.specialist} If the Transaction Director can decide it: {AUTHORITY_GUIDANCE.delegate}</p>
              </More>
              <More label="See more: Sponsor owns / Sponsor does not own">
                <ul className="space-y-1.5">
                  {BOUNDARIES.map(([a, b]) => (
                    <li key={a}><span className="font-medium text-foreground">{a}</span> — not {b.charAt(0).toLowerCase() + b.slice(1)}</li>
                  ))}
                </ul>
              </More>
            </>
          ),
        },
      ]}
      apply={{ title: "Apply it: direct, delegate, decide or sponsor?", body: <SortTask /> }}
      takeaway="Stay accountable for direction and material choices without taking day-to-day execution back from the Transaction Director."
      action="Look at the last decision that reached you: did it need your authority, or should it have stayed with the Transaction Director?"
    />
  );
}

/* ------------------------------------------------------------------ */
/* Module 3                                                            */
/* ------------------------------------------------------------------ */

function DirectionModule() {
  return (
    <TeachingModule
      id="direction"
      outcome="Give programme leadership clear outcomes, authority and decision routes."
      trigger="The Transaction Director is appointed. Can they act without coming back to you?"
      steps={[
        {
          title: "Mandate and direction",
          body: (
            <>
              <p className="text-sm">
                Confirm your sponsorship mandate, then turn the deal rationale into a short set of success criteria and decision principles.
                Resolve contradictions before detailed planning begins.
              </p>
              <Terms items={[["Baseline", "the approved version of the business case, budget, scope and plan that progress is measured against"]]} />
              <More label="See more: how success is judged">
                <ul className="space-y-1.5">
                  {SUCCESS_MEASURES.map((m) => (
                    <li key={m.title}><span className="font-semibold text-foreground">{m.title}: </span>{m.text}</li>
                  ))}
                </ul>
              </More>
            </>
          ),
        },
        {
          title: "Make delegation real",
          body: (
            <>
              <p className="text-sm">Delegation is real when the Transaction Director has:</p>
              <Bullets items={["named authority, in writing;", "timely access to senior leaders;", "clear tolerances for budget, scope, timing and risk; and", "a route for reserved decisions."]} />
              <Terms items={[["Tolerance", "the agreed limit within which a role may act without seeking further approval"]]} />
              <More label="See more: supporting delegation, and what undermines it">
                <p className="font-semibold text-foreground">Support it:</p>
                <Bullets items={SUPPORT_DELEGATION} />
                <p className="mt-2 font-semibold text-foreground">Avoid undermining it:</p>
                <Bullets items={AVOID_UNDERMINING} />
              </More>
            </>
          ),
        },
        {
          title: "Leadership and the mobilisation gate",
          body: (
            <>
              <p className="text-sm">
                Appoint capable Workstream Executives, set decision and governance routes, then challenge whether the programme is genuinely
                ready to deepen planning. Decide or sponsor a decision to proceed, proceed with conditions or hold.
              </p>
              <More label="See more: the eight start-up moves">
                <ul className="space-y-2">
                  {START_STEPS.map((s) => (
                    <li key={s.title}>
                      <p className="font-semibold text-foreground">{s.title}</p>
                      <p>{s.action}</p>
                      <p><span className="font-medium text-foreground">Evidence: </span>{s.evidence}</p>
                    </li>
                  ))}
                </ul>
              </More>
              <More label="When Sponsor attention is highest">
                <AttentionTimeline rows={INTENSITY} />
              </More>
            </>
          ),
        },
      ]}
      apply={{
        title: "Apply it: a mobilisation brief",
        body: (
          <>
            <div className="rounded-md bg-surface px-3 py-2 text-sm">
              <Label>Mobilisation brief</Label>
              <Bullets items={BRIEF_SNAPSHOT} />
            </div>
            <PickN items={BRIEF_GAPS} prompt="Which two gaps must you close before delegation works?" />
          </>
        ),
      }}
      takeaway="Delegation works when outcomes and limits are clear and the leader can act inside them."
      action="Check the Transaction Director's authority statement: are decision limits and escalation triggers written down?"
    />
  );
}

/* ------------------------------------------------------------------ */
/* Module 4                                                            */
/* ------------------------------------------------------------------ */

function AlignmentModule() {
  return (
    <TeachingModule
      id="alignment"
      outcome="Resolve senior conflicts that delivery teams cannot solve themselves."
      trigger="A business area will not release a committed specialist. Whose problem is it?"
      steps={[
        {
          title: "Make it an organisational priority",
          body: (
            <>
              <p className="text-sm">
                Transaction commitments are organisational commitments, not optional project requests. Secure protected capacity, funding and
                support from control functions, and make material constraints explicit rather than hidden in optimistic assumptions.
              </p>
              <More label="See more: resources and funding">
                <p>{START_STEPS[5]!.good}</p>
                <p className="mt-1">{START_STEPS[5]!.action}</p>
              </More>
            </>
          ),
        },
        {
          title: "Align senior owners",
          body: (
            <>
              <p className="text-sm">
                Lead the senior narrative, align stakeholders before formal meetings where possible, and prevent conflicting executive
                messages from reaching the programme.
              </p>
              <More label="See more: stakeholder alignment">
                <p>{START_STEPS[6]!.good}</p>
                <p className="mt-1">{LOOP[4]!.text}</p>
              </More>
            </>
          ),
        },
        {
          title: "When to step in",
          body: (
            <>
              <p className="text-sm">Step in when accountable leaders cannot resolve the constraint and it threatens a material outcome.</p>
              <Bullets
                items={[
                  "Do: require an integrated view of both obligations, then secure a priority, capacity or timing decision.",
                  "Do not: bypass the Transaction Director or treat every constraint as an executive decision.",
                ]}
              />
            </>
          ),
        },
      ]}
      apply={{
        title: "Apply it: a contested resource",
        body: (
          <>
            <p className="rounded-md bg-surface px-3 py-2 text-sm">{RESOURCE_SITUATION}</p>
            <p className="mt-3 text-sm">What is your strongest response?</p>
            <Formative options={RESOURCE_OPTIONS} correct="b" />
          </>
        ),
      }}
      takeaway="Sponsor intervention should remove a material constraint or align senior owners, not replace normal delivery management."
      action="Name one committed capacity gap on your transaction and the senior owner who can close it."
    />
  );
}

/* ------------------------------------------------------------------ */
/* Module 5                                                            */
/* ------------------------------------------------------------------ */

function DecideModule() {
  return (
    <TeachingModule
      id="decide"
      outcome="Ask for the minimum evidence needed to make a timely, accountable choice."
      trigger="A decision paper lands the night before the forum. What do you actually need?"
      steps={[
        {
          title: "The Sponsor operating loop",
          body: (
            <>
              <ol className="grid gap-2 text-sm sm:grid-cols-2">
                {LOOP.map((l, i) => (
                  <li key={l.title} className="rounded-md bg-surface px-3 py-2">
                    <span className="font-semibold text-maroon">{i + 1}. {l.title}</span>
                  </li>
                ))}
              </ol>
              <More label="See more: each step">
                <ul className="space-y-2">
                  {LOOP.map((l) => (
                    <li key={l.title}><span className="font-semibold text-foreground">{l.title}: </span>{l.text}</li>
                  ))}
                </ul>
              </More>
            </>
          ),
        },
        {
          title: "Challenge the outcome, not the activity",
          body: (
            <>
              <Bullets items={CHALLENGE_QUESTIONS.slice(0, 6)} />
              <More label="See more: questions for each part of the executive view">
                <ul className="space-y-1.5">
                  {EXEC_VIEW.map((v) => (
                    <li key={v.tab}><span className="font-semibold text-foreground">{v.tab}: </span>{v.q}</li>
                  ))}
                </ul>
              </More>
              <More label="Why this matters">
                Asking for more volume pulls you into task-level detail. Testing evidence, consequences and assumptions keeps you on the choice
                only you can make.
              </More>
            </>
          ),
        },
      ]}
      apply={{
        title: "Apply it: an incomplete decision paper",
        body: (
          <>
            <p className="rounded-md bg-surface px-3 py-2 text-sm">{PAPER_SITUATION}</p>
            <PickN items={PAPER_OPTIONS} prompt="Choose the three things you still need before deciding." />
          </>
        ),
      }}
      takeaway="Good executive challenge tests the outcome and trade-off, then enables a clear decision."
      action="Before your next executive review, pick the two challenge questions that would most change the decision."
    />
  );
}

/* ------------------------------------------------------------------ */
/* Module 6                                                            */
/* ------------------------------------------------------------------ */

function ValueReadinessModule() {
  return (
    <>
      <TeachingModule
        id="value-readiness"
        outcome="Keep execution aligned to value while making a clear readiness decision."
        trigger="Everyone recommends proceeding. Is the remaining risk one you can sponsor?"
        steps={[
          {
            title: "Protect value",
            body: (
              <>
                <p className="text-sm">
                  Keep the business case, benefits, cost, and customer and employee outcomes visible next to every material choice. Staying
                  within total budget is not enough if value, timing or future flexibility is lost.
                </p>
                <More label="See more: what must stay visible">
                  <Bullets items={VALUE_VISIBILITY} />
                </More>
              </>
            ),
          },
          {
            title: "Readiness and go or no-go",
            body: (
              <>
                <Terms
                  items={[
                    ["Residual risk", "the risk that remains after planned controls or mitigations are applied"],
                    ["Go or no-go", "the formal decision to proceed with, conditionally proceed with, or stop a major transaction event"],
                    ["Stabilisation", "the controlled period after launch or cutover when issues are resolved and operations are proven stable"],
                  ]}
                />
                <p className="mt-3 text-sm">Test the evidence, conditions, remaining risk and fallback. Sponsor a clear view; the authorised forum decides.</p>
                <More label="See more: who does what before go or no-go">
                  <ol className="list-decimal space-y-1 pl-5">
                    {GO_FLOW.map((g) => <li key={g}>{g}</li>)}
                  </ol>
                </More>
                <More label="See more: cutover, stabilisation and handover">
                  <Bullets items={PLAYBOOK[5]!.items} />
                </More>
              </>
            ),
          },
          {
            title: "Resources you will use",
            body: (
              <>
                <More label="See more: Sponsor resources">
                  <ul className="space-y-2">
                    {CORE_RESOURCES.map((r) => (
                      <li key={r.name}><span className="font-semibold text-foreground">{r.name}: </span>{r.purpose} <em>Ask: {r.ask}</em></li>
                    ))}
                  </ul>
                </More>
                <Notice />
              </>
            ),
          },
        ]}
        apply={{
          title: "Apply it: a conditional readiness recommendation",
          body: (
            <>
              <p className="rounded-md bg-surface px-3 py-2 text-sm">{READINESS_SITUATION}</p>
              <p className="mt-3 text-sm">What should you take to the forum?</p>
              <Formative options={READINESS_OPTIONS} correct="c" />
            </>
          ),
        }}
        takeaway="Sponsor a clear readiness view with executable, owned conditions, and leave the final decision with the authorised forum."
        action="Answer the six playbook prompts for your transaction."
        extra={
          <div className="mt-5">
            <Label>Your playbook</Label>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
              {PLAYBOOK_PROMPTS.map((p) => <li key={p}>{p}</li>)}
            </ol>
            <div className="mt-3"><PrintButton /></div>
          </div>
        }
      />
      <PlaybookPrint />
    </>
  );
}

function PlaybookPrint() {
  return (
    <div className="hidden print:block">
      <h1 className="text-2xl font-semibold">Accountable Executive playbook</h1>
      <h2 className="mt-4 font-semibold">Six prompts for your transaction</h2>
      <ol className="mt-2 list-decimal space-y-3 pl-5">
        {PLAYBOOK_PROMPTS.map((p) => (
          <li key={p}>
            {p}
            <div className="mt-6 border-b border-foreground/30" />
          </li>
        ))}
      </ol>
      <h2 className="mt-6 font-semibold">Principles</h2>
      <ul className="mt-1 list-disc pl-5 text-sm">
        {PRINCIPLES.map((p) => <li key={p}>{p}</li>)}
      </ul>
      <h2 className="mt-6 font-semibold">Resources</h2>
      <p className="mt-1 text-sm">{CORE_RESOURCES.map((r) => r.name).join("; ")}.</p>
      <p className="mt-2 text-sm italic">{RESOURCE_NOTICE}</p>
    </div>
  );
}

function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-1.5 rounded-md border border-input px-3 py-1.5 text-xs font-medium hover:border-maroon/45 hover:text-maroon"
    >
      <Printer className="h-3.5 w-3.5" aria-hidden /> Print Accountable Executive playbook
    </button>
  );
}
/* ------------------------------------------------------------------ */
/* Module 8                                                            */
/* ------------------------------------------------------------------ */

function Capstone() {
  const { progress, update } = useESProgress();
  const run = useScenarioRun(CAPSTONE_DECISIONS);
  const [again, setAgain] = useState(false);
  const teachingVisited = TEACHING_IDS.every((id) => progress.started.includes(id) || progress.completed.includes(id));

  useEffect(() => {
    update((p) => ({ ...p, started: addUnique(p.started, "capstone") }));
  }, [update]);

  useEffect(() => {
    if (!run.done) return;
    const attempt: Attempt = { correct: run.correct as Attempt["correct"], confidence: run.confidence };
    update((p) => ({
      ...p,
      capstoneFirst: p.capstoneFirst ?? attempt,
      capstoneLatest: attempt,
      completed: addUnique(p.completed, "capstone"),
    }));
    setAgain(false);
  }, [run.done, run.correct, run.confidence, update]);

  const hasResult = !!progress.capstoneFirst;
  const showResults = hasResult && !again;

  if (!teachingVisited && !hasResult) {
    return (
      <>
        <ModuleHeader id="capstone" outcome="Apply the whole role to a new situation and see what has changed." />
        <p className="mt-6 text-sm">
          The capstone opens once you have visited Modules 2 to 6.{" "}
          <Link to="/learning/executive-sponsor" className="font-medium text-maroon hover:underline">Back to pathway</Link>
        </p>
      </>
    );
  }

  const d = progress.diagnostic;
  const c = progress.capstoneFirst;
  const rows = CAPABILITIES.map((cap) => {
    const before = d?.correct[cap.id];
    const after = c?.correct[cap.id];
    const verdict = after ? (before ? "Confirmed" : "Improved") : "Review recommended";
    return { cap, verdict };
  });
  const needsReview = rows.some((r) => r.verdict === "Review recommended");

  return (
    <>
      <ModuleHeader id="capstone" outcome="Apply the whole role to a new situation and see what has changed." />
      {showResults ? (
        <section className="mt-6 print:hidden">
          <h2 className="text-lg font-semibold">Your opening and closing scenarios</h2>
          <dl className="mt-3 grid grid-cols-3 gap-3 border-y border-border py-3 text-sm">
            <div>
              <dt className="text-xs text-muted-foreground">Opening scenario</dt>
              <dd className="font-semibold">{d ? `${score(d)} of 4` : "Not taken"}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Capstone (first attempt)</dt>
              <dd className="font-semibold">{score(c)} of 4</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Confidence</dt>
              <dd className="font-semibold">{confLabel(avgConf(d))} → {confLabel(avgConf(c))}</dd>
            </div>
          </dl>
          <ul className="mt-3 divide-y divide-border">
            {rows.map(({ cap, verdict }) => (
              <li key={cap.id} className="flex flex-wrap items-center justify-between gap-2 py-2 text-sm">
                <span className="font-medium">{cap.label}</span>
                <span className="flex items-center gap-3">
                  <span className={cn(verdict === "Review recommended" ? "text-amber-800" : "text-maroon")}>
                    {verdict === "Review recommended" ? "⚠ " : "✓ "}
                    {verdict}
                  </span>
                  <Link to="/learning/executive-sponsor/$moduleId" params={{ moduleId: cap.module }} className="text-xs text-muted-foreground hover:text-maroon hover:underline">
                    {MODULES.find((m) => m.id === cap.module)!.title}
                  </Link>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 border-l-2 border-maroon bg-blush/60 px-3 py-2 text-sm">
            {needsReview ? CAPSTONE.review : CAPSTONE.improved}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => update((p) => ({ ...p, pathwayComplete: true }))}
              disabled={progress.pathwayComplete}
              className="inline-flex items-center gap-1 rounded-md bg-maroon px-3 py-1.5 text-xs font-semibold text-primary-foreground disabled:opacity-60"
            >
              <Check className="h-3.5 w-3.5" aria-hidden />
              {progress.pathwayComplete ? "Pathway complete" : "Mark pathway complete"}
            </button>
            <Link to="/learning/executive-sponsor" className="rounded-md border border-input px-3 py-1.5 text-xs font-medium hover:text-maroon">
              Review a module
            </Link>
            <PrintButton />
          </div>
          <button
            type="button"
            onClick={() => {
              run.restart();
              setAgain(true);
            }}
            className="mt-4 text-xs text-muted-foreground underline hover:text-maroon"
          >
            Repeat the capstone (your first attempt is kept for the comparison)
          </button>
        </section>
      ) : (
        <div className="print:hidden">
          <ScenarioBrief s={CAPSTONE} />
          {!run.done ? (
            <DecisionStep
              key={run.i}
              d={CAPSTONE_DECISIONS[run.i]!}
              index={run.i}
              total={CAPSTONE_DECISIONS.length}
              mode="capstone"
              onDone={(ok, conf) => run.record(CAPSTONE_DECISIONS[run.i]!, ok, conf)}
            />
          ) : null}
        </div>
      )}
      <PlaybookPrint />
    </>
  );
}

/* ------------------------------------------------------------------ */

function ModulePage() {
  const { moduleId } = Route.useLoaderData();
  const body = (() => {
    switch (moduleId) {
      case "starting-point": return <StartingPoint />;
      case "mandate": return <MandateModule />;
      case "direction": return <DirectionModule />;
      case "alignment": return <AlignmentModule />;
      case "decide": return <DecideModule />;
      case "value-readiness": return <ValueReadinessModule />;
      case "capstone": return <Capstone />;
    }
  })();
  return (
    <div className="min-h-screen bg-background">
      <div className="print:hidden"><BrandHeader /></div>
      <main key={moduleId} className="mx-auto max-w-3xl px-4 py-8 sm:px-6">{body}</main>
    </div>
  );
}
