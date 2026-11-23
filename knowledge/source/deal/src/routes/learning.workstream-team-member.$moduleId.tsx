import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { AlertTriangle, ArrowLeft, ArrowRight, Check, Clock, Lightbulb, PartyPopper, Plus, Printer, RotateCcw, Sparkles, Target, Trophy, X } from "lucide-react";
import { BrandHeader } from "@/components/BrandHeader";
import { Term } from "@/components/learning/Term";
import { cn } from "@/lib/utils";
import { AttentionTimeline } from "@/components/AttentionTimeline";
import {
  BOUNDARY,
  CONFIDENTIAL_ITEMS,
  CORE_RESOURCES,
  CUTOVER_ITEMS,
  DECISION_TEST,
  ECONOMICS,
  EVIDENCE_CHECKS,
  INTENSITY,
  MANDATE,
  PRINCIPLES,
  RAID_ITEMS,
  RELEVANT_RESOURCES,
  RESOURCE_NOTICE,
  ROLES,
  START_STEPS,
  TASK_CYCLE,
  TESTING_ITEMS,
} from "@/lib/learning/workstream-team-member";
import {
  CAPABILITIES,
  CAPSTONE,
  CAPSTONE_DECISIONS,
  COMPLETION_COMPARE,
  CUTOVER_OPTIONS,
  CUTOVER_SITUATION,
  DIAGNOSTIC,
  DIAGNOSTIC_DECISIONS,
  EVIDENCE_OPTIONS,
  MODULES,
  MOMENTS,
  PLAYBOOK_PROMPTS,
  RAISE_OPTIONS,
  RAISE_PARTS,
  RAISE_SITUATION,
  RAISE_TYPES,
  SORT_ITEMS,
  START_BRIEF,
  START_GAPS,
  TASK_PARTS,
  TEACHING_IDS,
  type CapabilityId,
  type Confidence,
  type Decision,
  type ModuleId,
  type Opt,
  type SortKey,
} from "@/lib/learning/workstream-team-member-modules";
import { addUnique, useWTMProgress, type Attempt } from "@/lib/learning/workstream-team-member-progress";


export const Route = createFileRoute("/learning/workstream-team-member/$moduleId")({
  loader: ({ params }) => {
    const mod = MODULES.find((m) => m.id === params.moduleId);
    if (!mod) throw notFound();
    return { moduleId: mod.id as ModuleId };
  },
  head: ({ loaderData }) => {
    const mod = MODULES.find((m) => m.id === loaderData?.moduleId);
    const title = mod ? `${mod.no}. ${mod.title} | Workstream Team Member pathway` : "Module unavailable | Workstream Team Member pathway";
    const desc = mod ? `${mod.purpose}. A ${mod.minutes}-minute Workstream Team Member module.` : "This module could not be found.";
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
        <Link to="/learning/workstream-team-member" className="mt-3 inline-block text-sm font-medium text-maroon hover:underline">
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
      <Link to="/learning/workstream-team-member" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-maroon">
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Back to pathway
      </Link>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        Workstream Team Member · Module {mod.no} of {MODULES.length}
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
  const { update } = useWTMProgress();
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
            <Link to="/learning/workstream-team-member" className="rounded-md border border-input px-3 py-1.5 text-xs font-medium hover:text-maroon">
              Back to pathway
            </Link>
            {next ? (
              <Link
                to="/learning/workstream-team-member/$moduleId"
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
  const { progress, update } = useWTMProgress();
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
                      <Link to="/learning/workstream-team-member/$moduleId" params={{ moduleId: c.module }} className="text-maroon hover:underline">
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
            <Link to="/learning/workstream-team-member" className="rounded-md border border-input px-3 py-1.5 text-xs font-medium hover:text-maroon">
              Back to pathway
            </Link>
            <Link
              to="/learning/workstream-team-member/$moduleId"
              params={{ moduleId: "task" }}
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
              <Link to="/learning/workstream-team-member" className="font-medium text-maroon hover:underline">Back to pathway</Link>
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
  const cols = [
    ["do", "Do"],
    ["check", "Check"],
    ["raise", "Raise"],
  ] as const;
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
/* Module 2                                                            */
/* ------------------------------------------------------------------ */

function TaskModule() {
  return (
    <TeachingModule
      id="task"
      outcome="Confirm what you must deliver and which decisions are yours."
      trigger="You have been handed a task. Could you explain what 'done' looks like and who decides?"
      steps={[
        {
          title: "Six things to confirm",
          body: (
            <dl className="grid gap-2 text-sm sm:grid-cols-2">
              {TASK_PARTS.map((c) => (
                <div key={c.title} className="rounded-md bg-surface px-3 py-2">
                  <dt className="font-semibold text-maroon">{c.title}</dt>
                  <dd className="mt-0.5">{c.text}</dd>
                </div>
              ))}
            </dl>
          ),
        },
        {
          title: "Do, Check, Raise",
          body: (
            <>
              <div className="grid gap-3 text-sm sm:grid-cols-3">
                <div><Label>Do</Label><p className="mt-1">Complete your assigned work to the agreed standard and record what you did.</p></div>
                <div><Label>Check</Label><p className="mt-1">Ask before changing the result, a date others rely on, a control or an agreed step.</p></div>
                <div><Label>Raise</Label><p className="mt-1">Speak up early when something could stop the result or affect others.</p></div>
              </div>
              <More label="See more: the full Do, Check and Raise lists">
                {(["do", "check", "raise"] as const).map((k) => (
                  <div key={k} className="mt-2">
                    <p className="font-semibold text-foreground">{MANDATE[k].label}. {MANDATE[k].lead}</p>
                    <Bullets items={MANDATE[k].items} />
                  </div>
                ))}
              </More>
              <More label="A quick test for your own decisions">
                <Bullets items={DECISION_TEST} />
              </More>
            </>
          ),
        },
        {
          title: "Your boundary",
          body: (
            <>
              <p className="text-sm">
                You own the quality and honesty of your work. You do not change scope, approve material risk or declare the workstream
                ready. Those decisions sit with the Workstream Lead, Executive or governance.
              </p>
              <More label="See more: who does what">
                <ul className="space-y-2">
                  {ROLES.map((r) => (
                    <li key={r.id}><span className="font-semibold text-foreground">{r.name}: </span>{r.text}</li>
                  ))}
                </ul>
                <p className="mt-2">You do not {BOUNDARY}</p>
              </More>
              <More label="When you are needed most">
                <AttentionTimeline rows={INTENSITY} />
              </More>
            </>
          ),
        },
      ]}
      apply={{ title: "Apply it: Do, Check or Raise", body: <SortTask /> }}
      takeaway="Start with a clear result and decision boundary, not an assumed task."
      action="Restate your current task's result, acceptance conditions and due date to the person who assigned it."
    />
  );
}

/* ------------------------------------------------------------------ */
/* Module 3                                                            */
/* ------------------------------------------------------------------ */

function StartModule() {
  return (
    <TeachingModule
      id="start"
      outcome="Confirm that the task can be carried out safely and on time."
      trigger="You want to start straight away. What could make a fast start unsafe?"
      steps={[
        {
          title: "Context, result and inputs",
          body: (
            <>
              <p className="text-sm">
                Know why your task matters, what result is needed and which inputs it relies on. A{" "}
                <Term def="An input, decision or activity that your task relies on.">dependency</Term> needs an owner, a date and a route for
                raising a delay.
              </p>
              <More label="See more: what to confirm before starting">
                <ul className="space-y-2">
                  {START_STEPS.map((s) => (
                    <li key={s.title}><span className="font-semibold text-foreground">{s.title}: </span>{s.confirm}</li>
                  ))}
                </ul>
              </More>
            </>
          ),
        },
        {
          title: "Confidentiality and access",
          body: (
            <>
              <p className="text-sm">
                Transaction information is confidential. Use only the access you have been approved for, in approved systems, with authorised
                people. If access is missing, raise it. Do not create a workaround.
              </p>
              <More label="See more: confidentiality rules">
                <Bullets items={CONFIDENTIAL_ITEMS} />
              </More>
            </>
          ),
        },
        {
          title: "Time, skills and reporting",
          body: (
            <p className="text-sm">
              Check you have the time, knowledge and tools alongside your normal work, and know how to report progress and raise problems. If
              information is incomplete, say what is missing and ask. Do not fill the gap with a guess.
            </p>
          ),
        },
      ]}
      apply={{
        title: "Apply it: what must be resolved first?",
        body: (
          <>
            <p className="rounded-md bg-surface px-3 py-2 text-sm">{START_BRIEF}</p>
            <PickN items={START_GAPS} prompt="This brief has four gaps. Select the two that must be resolved before work starts." />
          </>
        ),
      }}
      takeaway="A fast start is only useful when the task, inputs and access are clear."
      action="Before your next task, confirm your access, inputs and the person who will accept the work."
    />
  );
}

/* ------------------------------------------------------------------ */
/* Module 4                                                            */
/* ------------------------------------------------------------------ */

function DeliverModule() {
  return (
    <TeachingModule
      id="deliver"
      outcome="Produce an output that can be checked, accepted and relied upon."
      trigger="You have finished the work. Could someone else prove it met the result?"
      steps={[
        {
          title: "From task to accepted output",
          body: (
            <>
              <ol className="space-y-2 text-sm">
                {TASK_CYCLE.map((r, i) => (
                  <li key={r.title} className="flex gap-3">
                    <span className="w-5 shrink-0 font-semibold text-maroon">{i + 1}</span>
                    <span><span className="font-medium">{r.title}. </span>{r.text}</span>
                  </li>
                ))}
              </ol>
            </>
          ),
        },
        {
          title: "Good evidence",
          body: (
            <>
              <dl className="grid gap-2 text-sm sm:grid-cols-2">
                {EVIDENCE_CHECKS.map(([t, d]) => (
                  <div key={t} className="rounded-md bg-surface px-3 py-2">
                    <dt className="font-semibold text-maroon">{t}</dt>
                    <dd className="mt-0.5">{d}</dd>
                  </div>
                ))}
              </dl>
              <More label="Why this matters">
                Keep one controlled version. Say which version was checked, and retain the record where others can find it.
              </More>
            </>
          ),
        },
        {
          title: "A useful completion statement",
          body: (
            <div className="grid gap-3 text-sm sm:grid-cols-2">
              <div className="rounded-md bg-surface px-3 py-2">
                <Label>Weak</Label>
                <p className="mt-1">{COMPLETION_COMPARE.weak}</p>
              </div>
              <div className="rounded-md border border-maroon/30 bg-blush/50 px-3 py-2">
                <Label>Useful</Label>
                <p className="mt-1">{COMPLETION_COMPARE.strong}</p>
              </div>
            </div>
          ),
        },
      ]}
      apply={{
        title: "Apply it: select the evidence",
        body: <PickN items={EVIDENCE_OPTIONS} prompt="Select the three items that prove a test task is complete." />,
      }}
      takeaway="Work is complete when the agreed result is accepted and the proof can be found."
      action="Write your next completion update so it names the version, check, result and evidence location."
    />
  );
}

/* ------------------------------------------------------------------ */
/* Module 5                                                            */
/* ------------------------------------------------------------------ */

function RaiseModule() {
  return (
    <TeachingModule
      id="raise"
      outcome="Raise a delivery problem with enough information for someone to act."
      trigger="Something might go wrong. Is it too early to say?"
      steps={[
        {
          title: "Risk, issue or dependency",
          body: (
            <>
              <dl className="grid gap-2 text-sm sm:grid-cols-3">
                {RAISE_TYPES.map((c) => (
                  <div key={c.title} className="rounded-md bg-surface px-3 py-2">
                    <dt className="font-semibold text-maroon">{c.title}</dt>
                    <dd className="mt-0.5">{c.text}</dd>
                  </div>
                ))}
              </dl>
              <More label="Why this matters">
                Raising a problem early keeps recovery choices open. You do not need to know the cause or own the fix to raise it.
              </More>
            </>
          ),
        },
        {
          title: "What to report",
          body: (
            <>
              <ol className="space-y-1.5 text-sm">
                {RAISE_PARTS.map((s, i) => (
                  <li key={s} className="flex gap-3">
                    <span className="w-5 shrink-0 font-semibold text-maroon">{i + 1}</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
              <More label="See more: what a good update covers">
                <Bullets items={RAID_ITEMS} />
              </More>
            </>
          ),
        },
        {
          title: "Show the wider effect",
          body: (
            <>
              <p className="text-sm">
                Say when a problem could affect customers, employees, cost, value or timing, even if the amount is not yet confirmed. The
                right owners can then assess it.
              </p>
              <More label="See more: effects to look out for">
                <Bullets items={ECONOMICS} />
              </More>
            </>
          ),
        },
      ]}
      apply={{
        title: "Apply it: choose the strongest escalation",
        body: (
          <>
            <Label>Situation</Label>
            <Bullets items={RAISE_SITUATION} />
            <Formative options={RAISE_OPTIONS} correct="b" />
          </>
        ),
      }}
      takeaway="Raise the fact and its effect while there is still time to respond."
      action="Think of one open concern in your work and raise it today using the six points."
    />
  );
}

/* ------------------------------------------------------------------ */
/* Module 6                                                            */
/* ------------------------------------------------------------------ */

function PlaybookPrint() {
  return (
    <div className="hidden print:block">
      <h1 className="text-2xl font-semibold">Workstream Team Member playbook</h1>
      <h2 className="mt-4 font-semibold">Five prompts for your task</h2>
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
      <h2 className="mt-6 font-semibold">Role boundary</h2>
      <p className="mt-1 text-sm">You do not {BOUNDARY}</p>
      <h2 className="mt-6 font-semibold">Resources</h2>
      <p className="mt-1 text-sm">{[...CORE_RESOURCES, ...RELEVANT_RESOURCES].map((r) => r.name).join("; ")}.</p>
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
      <Printer className="h-3.5 w-3.5" aria-hidden /> Print Team Member playbook
    </button>
  );
}

function KeyMomentsModule() {
  return (
    <>
      <TeachingModule
        id="key-moments"
        outcome="Follow controlled instructions during testing, rehearsals, cutover and hypercare."
        trigger="The plan is moving fast tonight. Whose instruction do you follow?"
        steps={[
          {
            title: "Four key moments",
            body: (
              <>
                <dl className="grid gap-2 text-sm sm:grid-cols-2">
                  {MOMENTS.map((a) => (
                    <div key={a.title} className="rounded-md bg-surface px-3 py-2">
                      <dt className="font-semibold text-maroon">{a.title}</dt>
                      <dd className="mt-0.5">{a.text}</dd>
                    </div>
                  ))}
                </dl>
                <More label="Why this matters">
                  <Term def="The controlled move from the current state to the new operating state.">Cutover</Term> follows a timed{" "}
                  <Term def="The approved list of cutover tasks, with timing, order, owners, checkpoints and fallback actions.">runbook</Term>.{" "}
                  <Term def="The period of increased support immediately after cutover.">Hypercare</Term> catches early issues before normal
                  teams take over.
                </More>
                <More label="See more: testing and cutover steps">
                  <Label>Testing</Label>
                  <Bullets items={TESTING_ITEMS} />
                  <div className="mt-2"><Label>Cutover</Label></div>
                  <Bullets items={CUTOVER_ITEMS} />
                </More>
              </>
            ),
          },
          {
            title: "Resources you will use",
            body: (
              <>
                <Bullets items={CORE_RESOURCES.map((r) => r.name)} />
                <More label="See more: what each resource is for">
                  <ul className="space-y-2">
                    {[...CORE_RESOURCES.map((r) => ({ name: r.name, text: `${r.purpose} ${r.when}` })), ...RELEVANT_RESOURCES].map((r) => (
                      <li key={r.name}><span className="font-semibold text-foreground">{r.name}: </span>{r.text}</li>
                    ))}
                  </ul>
                </More>
                <p className="mt-3 flex gap-2 rounded-md border border-amber-600/40 bg-amber-50 px-3 py-2 text-sm text-amber-900">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  {RESOURCE_NOTICE}
                </p>
              </>
            ),
          },
        ]}
        apply={{
          title: "Apply it: an informal cutover change",
          body: (
            <>
              <p className="rounded-md bg-surface px-3 py-2 text-sm">{CUTOVER_SITUATION}</p>
              <Formative options={CUTOVER_OPTIONS} correct="b" />
            </>
          ),
        }}
        takeaway="At key moments, follow the approved instruction and stop when a condition is not met."
        action="Answer the five playbook prompts for your next task."
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
/* ------------------------------------------------------------------ */
/* Module 8                                                            */
/* ------------------------------------------------------------------ */

function Capstone() {
  const { progress, update } = useWTMProgress();
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
          <Link to="/learning/workstream-team-member" className="font-medium text-maroon hover:underline">Back to pathway</Link>
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
                  <Link to="/learning/workstream-team-member/$moduleId" params={{ moduleId: cap.module }} className="text-xs text-muted-foreground hover:text-maroon hover:underline">
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
            <Link to="/learning/workstream-team-member" className="rounded-md border border-input px-3 py-1.5 text-xs font-medium hover:text-maroon">
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
      case "task": return <TaskModule />;
      case "start": return <StartModule />;
      case "deliver": return <DeliverModule />;
      case "raise": return <RaiseModule />;
      case "key-moments": return <KeyMomentsModule />;
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
