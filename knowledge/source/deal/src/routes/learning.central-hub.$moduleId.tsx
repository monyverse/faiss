import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { AlertTriangle, ArrowLeft, ArrowRight, Check, Clock, Lightbulb, PartyPopper, Plus, Printer, RotateCcw, Sparkles, Target, Trophy, UserRound, X } from "lucide-react";
import { BrandHeader } from "@/components/BrandHeader";
import { cn } from "@/lib/utils";
import { AttentionTimeline } from "@/components/AttentionTimeline";
import { BASELINE_STEPS, BOUNDARY, BOUNDARY_OWNS, CONTROL_LOOP, CORE_RESOURCES, DECIDE_LENS_NOTE, DECISION_FLOW, DECISION_FLOW_WARNING, ECONOMICS, GOVERNANCE_FLOW, HUB_FUNCTIONS, INTENSITY, LENSES, LENS_WARNING, MANDATE, MOBILISATION_FOCUS, PRINCIPLES, RELATIONSHIPS, RELEVANT_RESOURCES, REPORTING_RULES, RESOURCE_EMPHASIS, ROLE_PROMPTS, ROLE_TABLE, START_STEPS, TEMPLATE_NOTICE } from "@/lib/learning/central-hub";
import { CAPABILITIES, CAPSTONE, CAPSTONE_DECISIONS, CUTOFF_OPTIONS, CUTOFF_SITUATION, DIAGNOSTIC, DIAGNOSTIC_DECISIONS, LENS_NOTES, MOBILISE_GAPS, MOBILISE_SNAPSHOT, MODULES, PAPER_OPTIONS, PAPER_PARTS, PAPER_SITUATION, PLAYBOOK_PROMPTS, READINESS_OPTIONS, SORT_COLUMNS, SORT_ITEMS, TEACHING_IDS, VIEW_LINES, VIEW_OPTIONS, type CapabilityId, type Confidence, type Decision, type Lens, type ModuleId, type Opt, type SortKey } from "@/lib/learning/central-hub-modules";
import { addUnique, useCHProgress, type Attempt } from "@/lib/learning/central-hub-progress";

export const Route = createFileRoute("/learning/central-hub/$moduleId")({
  loader: ({ params }) => {
    const mod = MODULES.find((m) => m.id === params.moduleId);
    if (!mod) throw notFound();
    return { moduleId: mod.id as ModuleId };
  },
  head: ({ loaderData }) => {
    const mod = MODULES.find((m) => m.id === loaderData?.moduleId);
    const title = mod ? `${mod.no}. ${mod.title} | Central Hub pathway` : "Module unavailable | Central Hub pathway";
    const desc = mod ? `${mod.purpose}. A ${mod.minutes}-minute Central Hub module.` : "This module could not be found.";
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
        <Link to="/learning/central-hub" className="mt-3 inline-block text-sm font-medium text-maroon hover:underline">
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
      <Link to="/learning/central-hub" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-maroon">
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Back to pathway
      </Link>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        Central Hub · Module {mod.no} of {MODULES.length}
      </p>
      <h1 className="mt-1 font-display text-2xl font-semibold text-maroon sm:text-3xl">{mod.title}</h1>
      <LensTag />
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
  const { update } = useCHProgress();
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
            <Link to="/learning/central-hub" className="rounded-md border border-input px-3 py-1.5 text-xs font-medium hover:text-maroon">
              Back to pathway
            </Link>
            {next ? (
              <Link
                to="/learning/central-hub/$moduleId"
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
  const { progress, update } = useCHProgress();
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
                      <Link to="/learning/central-hub/$moduleId" params={{ moduleId: c.module }} className="text-maroon hover:underline">
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
            <Link to="/learning/central-hub" className="rounded-md border border-input px-3 py-1.5 text-xs font-medium hover:text-maroon">
              Back to pathway
            </Link>
            <Link
              to="/learning/central-hub/$moduleId"
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
              <Link to="/learning/central-hub" className="font-medium text-maroon hover:underline">Back to pathway</Link>
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
/* Role lens                                                           */
/* ------------------------------------------------------------------ */

function useLens(): Lens {
  const { progress } = useCHProgress();
  return progress.lens ?? "pm";
}

function LensTag() {
  const { ready } = useCHProgress();
  const lens = useLens();
  if (!ready) return null;
  return (
    <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-maroon/30 bg-blush/50 px-2.5 py-0.5 text-xs text-maroon">
      <UserRound className="h-3 w-3" aria-hidden />
      {LENSES.find((l) => l.id === lens)!.name}
      <Link to="/learning/central-hub" className="underline hover:no-underline">Change</Link>
    </p>
  );
}

function LensNote({ kind }: { kind: "role" | "scenario" | "playbook" }) {
  const lens = useLens();
  return <p className="mt-4 border-l-2 border-maroon bg-blush/60 px-3 py-2 text-sm">{LENS_NOTES[lens][kind]}</p>;
}

function ByRole({ activities }: { activities: string[] }) {
  const rows = ROLE_TABLE.filter((r) => activities.includes(r.activity));
  return (
    <More label="How this differs by role">
      <ul className="space-y-3">
        {rows.map((r) => (
          <li key={r.activity}>
            <p className="font-semibold text-foreground">{r.activity}</p>
            <p><span className="font-medium text-foreground">Programme Manager: </span>{r.pm}</p>
            <p><span className="font-medium text-foreground">PMO Support: </span>{r.pmo}</p>
            <p><span className="font-medium text-foreground">Transaction Director: </span>{r.td}</p>
          </li>
        ))}
      </ul>
    </More>
  );
}

function LensFormative({ set }: { set: Record<Lens, { options: Opt[]; answer: string }> }) {
  const lens = useLens();
  return <Formative key={lens} options={set[lens].options} correct={set[lens].answer} />;
}

/* ------------------------------------------------------------------ */
/* Module 2                                                            */
/* ------------------------------------------------------------------ */

function MandateModule() {
  return (
    <TeachingModule
      id="mandate"
      outcome="Know what the Hub decides, coordinates, challenges and escalates."
      trigger="A workstream asks the Hub to 'just decide'. Is it yours to decide?"
      steps={[
        {
          title: "Four Hub functions",
          body: (
            <dl className="grid gap-2 text-sm sm:grid-cols-2">
              {HUB_FUNCTIONS.map((f) => (
                <div key={f.name} className="rounded-md bg-surface px-3 py-2">
                  <dt className="font-semibold text-maroon">{f.name}</dt>
                  <dd className="mt-0.5">{f.text}</dd>
                </div>
              ))}
            </dl>
          ),
        },
        {
          title: "Three roles, three levels of authority",
          body: (
            <>
              <Bullets
                items={[
                  "The Transaction Director sets execution direction and decides transaction-level matters within formal authority.",
                  "The Programme Manager turns direction into an integrated programme view and recommendations.",
                  "PMO Support maintains reliable plans, logs, packs and records.",
                ]}
              />
              <LensNote kind="role" />
              <More label="How this differs by role">
                <p>{DECIDE_LENS_NOTE.pm}</p>
                <p className="mt-2">{DECIDE_LENS_NOTE.pmo}</p>
                <p className="mt-2">{DECIDE_LENS_NOTE.td}</p>
              </More>
            </>
          ),
        },
        {
          title: "Decide, coordinate, challenge, escalate",
          body: (
            <>
              <p className="text-sm">
                The Hub coordinates, challenges and integrates. It does not take over {BOUNDARY}
              </p>
              <p className="mt-2 text-sm italic">{MANDATE.challenge.note}</p>
              <More label="See more: the full lists">
                {(["decide", "coordinate", "challenge", "escalate"] as const).map((k) => (
                  <div key={k} className="mt-2">
                    <p className="font-semibold text-foreground">{MANDATE[k].label}. {MANDATE[k].lead}</p>
                    <Bullets items={MANDATE[k].items} />
                  </div>
                ))}
              </More>
              <More label="Who the Hub works with">
                <ul className="space-y-2">
                  {RELATIONSHIPS.map((r) => (
                    <li key={r.name}><span className="font-semibold text-foreground">{r.name}: </span>{r.text}</li>
                  ))}
                </ul>
                <p className="mt-2">{BOUNDARY_OWNS}</p>
              </More>
            </>
          ),
        },
      ]}
      apply={{ title: "Apply it: who owns this?", body: <SortTask /> }}
      takeaway="Create one reliable programme view while leaving functional and specialist decisions with their owners."
      action="Check one open item on your RAID log: is it with the role that has the authority to resolve it?"
    />
  );
}

/* ------------------------------------------------------------------ */
/* Module 3                                                            */
/* ------------------------------------------------------------------ */

function MobiliseModule() {
  const lens = useLens();
  return (
    <TeachingModule
      id="mobilise"
      outcome="Establish the people, authority, controls and interfaces needed to start delivery."
      trigger="Everyone is keen to start. Can the programme plan, decide and evidence its work yet?"
      steps={[
        {
          title: "Eight mobilisation moves",
          body: (
            <>
              <ol className="grid gap-2 text-sm sm:grid-cols-2">
                {START_STEPS.map((s, i) => (
                  <li key={s.title} className="rounded-md bg-surface px-3 py-2">
                    <span className="font-semibold text-maroon">{i + 1}. {s.title}</span>
                  </li>
                ))}
              </ol>
              <More label="See more: what good looks like and evidence to retain">
                <ul className="space-y-2">
                  {START_STEPS.map((s) => (
                    <li key={s.title}>
                      <p className="font-semibold text-foreground">{s.title}</p>
                      <p><span className="font-medium text-foreground">What good looks like: </span>{s.good}</p>
                      <p><span className="font-medium text-foreground">Evidence to retain: </span>{s.evidence}</p>
                    </li>
                  ))}
                </ul>
              </More>
            </>
          ),
        },
        {
          title: "Your mobilisation focus",
          body: (
            <>
              <p className="text-sm">{MOBILISATION_FOCUS[lens]}</p>
              <More label="How this differs by role">
                {(["pm", "pmo", "td"] as const).map((l) => (
                  <p key={l} className="mt-2"><span className="font-medium text-foreground">{LENSES.find((x) => x.id === l)!.name}: </span>{MOBILISATION_FOCUS[l]}</p>
                ))}
              </More>
              <More label="When the Hub is needed most">
                <AttentionTimeline rows={INTENSITY} />
              </More>
            </>
          ),
        },
      ]}
      apply={{
        title: "Apply it: a mobilisation snapshot",
        body: (
          <>
            <div className="rounded-md bg-surface px-3 py-2 text-sm">
              <Label>Day 8 of mobilisation</Label>
              <Bullets items={MOBILISE_SNAPSHOT} />
            </div>
            <PickN items={MOBILISE_GAPS} prompt="Which two gaps most threaten a controlled start?" />
          </>
        ),
      }}
      takeaway="Mobilisation is complete when the programme can plan, decide and evidence its work."
      action="List any open appointments or forum-authority gaps and give each an owner and date."
    />
  );
}

/* ------------------------------------------------------------------ */
/* Module 4                                                            */
/* ------------------------------------------------------------------ */

function ProgrammeViewModule() {
  return (
    <TeachingModule
      id="programme-view"
      outcome="Combine workstream information into a view that exposes the real delivery path."
      trigger="Every workstream plan is in one file. Does that make it one plan?"
      steps={[
        {
          title: "Key terms",
          body: (
            <dl className="space-y-2 text-sm">
              <div><dt className="inline font-semibold text-maroon">Baseline: </dt><dd className="inline">the approved version of the plan, budget and scope that progress is measured against.</dd></div>
              <div><dt className="inline font-semibold text-maroon">Integrated programme plan: </dt><dd className="inline">the single plan that combines all workstreams and key dates.</dd></div>
              <div><dt className="inline font-semibold text-maroon">Critical path: </dt><dd className="inline">the activities that directly determine the delivery date.</dd></div>
              <div><dt className="inline font-semibold text-maroon">Contingency: </dt><dd className="inline">time or money held back to absorb problems.</dd></div>
            </dl>
          ),
        },
        {
          title: "Integration is a test",
          body: (
            <>
              <p className="text-sm">
                Integration means testing whether plans fit together, not collecting them in one file. Check that dependencies match on
                content and acceptance as well as dates, that capacity is realistic, and that milestones, budget and benefits still hold.
              </p>
              <More label="See more: from frame to approved baseline">
                <ul className="space-y-2">
                  {BASELINE_STEPS.map((s) => (
                    <li key={s.step}><span className="font-semibold text-foreground">{s.step}: </span>{s.focus} <em>{s.outcome}</em></li>
                  ))}
                </ul>
              </More>
              <ByRole activities={["Integrated execution plan", "RAID and dependencies"]} />
            </>
          ),
        },
        {
          title: "Keep the economics visible",
          body: (
            <>
              <p className="text-sm">Delivery choices change costs and value. Keep the budget, contingency and benefit timing next to the plan.</p>
              <More label="See more: economic effects to track">
                <Bullets items={ECONOMICS} />
              </More>
            </>
          ),
        },
      ]}
      apply={{
        title: "Apply it: two aligned plan lines",
        body: (
          <>
            <div className="space-y-2 rounded-md bg-surface px-3 py-2 text-sm">
              <p>{VIEW_LINES.a}</p>
              <p>{VIEW_LINES.b}</p>
            </div>
            <p className="mt-3 text-sm">What is the material mismatch?</p>
            <Formative options={VIEW_OPTIONS} correct="b" />
          </>
        ),
      }}
      takeaway="The programme view is useful when it reveals where one team's assumption changes another team's outcome."
      action="Pick one critical-path dependency and confirm both sides agree its content and acceptance."
    />
  );
}

/* ------------------------------------------------------------------ */
/* Module 5                                                            */
/* ------------------------------------------------------------------ */

function ControlModule() {
  return (
    <TeachingModule
      id="control"
      outcome="Maintain facts, records and forums that support timely action."
      trigger="It is reporting cut-off and two updates disagree. What do you do next?"
      steps={[
        {
          title: "The control loop",
          body: (
            <dl className="grid gap-2 text-sm sm:grid-cols-2">
              {CONTROL_LOOP.map((c) => (
                <div key={c.title} className="rounded-md bg-surface px-3 py-2">
                  <dt className="font-semibold text-maroon">{c.title}</dt>
                  <dd className="mt-0.5">{c.text}</dd>
                </div>
              ))}
            </dl>
          ),
        },
        {
          title: "Forums in plain language",
          body: (
            <>
              <p className="text-sm">
                Governance is the set of forums and rules that decide who makes which decision and when. Senior forums decide reserved
                matters; working forums resolve delivery issues and flag what needs escalation.
              </p>
              <More label="See more: the governance flow">
                <ul className="space-y-2">
                  {GOVERNANCE_FLOW.map((g) => (
                    <li key={g.name}><span className="font-semibold text-foreground">{g.name}: </span>{g.text}</li>
                  ))}
                </ul>
              </More>
              <ByRole activities={["Governance", "Reporting"]} />
            </>
          ),
        },
        {
          title: "Reporting rules",
          body: (
            <>
              <Bullets items={REPORTING_RULES.slice(0, 4)} />
              <More label="See more: all reporting rules">
                <Bullets items={REPORTING_RULES} />
              </More>
            </>
          ),
        },
      ]}
      apply={{
        title: "Apply it: conflicting updates at cut-off",
        body: (
          <>
            <p className="rounded-md bg-surface px-3 py-2 text-sm">{CUTOFF_SITUATION}</p>
            <p className="mt-3 text-sm">As your selected role, what should you do next?</p>
            <LensFormative set={CUTOFF_OPTIONS} />
          </>
        ),
      }}
      takeaway="Reliable reporting shows the supported forecast and unresolved choice, not a negotiated colour."
      action="Check your last report for any green that conflicts with an open critical-path dependency."
    />
  );
}

/* ------------------------------------------------------------------ */
/* Module 6                                                            */
/* ------------------------------------------------------------------ */

function DecisionsModule() {
  return (
    <TeachingModule
      id="decisions"
      outcome="Improve weak information and route decisions without taking over ownership."
      trigger="A paper reaches you with options but no consequences. Fix it, return it or decide?"
      steps={[
        {
          title: "Evidence-based challenge",
          body: (
            <>
              <p className="text-sm">
                Challenge tests whether plans, status and papers are complete and credible. It improves the owning team's work; it does not
                move ownership to the Hub.
              </p>
              <More label="See more: what the Hub should challenge">
                <Bullets items={MANDATE.challenge.items} />
              </More>
              <ByRole activities={["Workstream challenge", "Escalation"]} />
            </>
          ),
        },
        {
          title: "A decision-ready paper",
          body: (
            <>
              <ol className="flex flex-wrap gap-1.5">
                {PAPER_PARTS.map((p, i) => (
                  <li key={p} className="rounded-full border border-maroon/30 bg-blush/50 px-2.5 py-1 text-xs text-maroon">{i + 1}. {p}</li>
                ))}
              </ol>
              <p className="mt-3 text-sm">Show scope, schedule, cost, value, customer and control effects for each option.</p>
            </>
          ),
        },
        {
          title: "How a decision flows",
          body: (
            <>
              <ol className="space-y-2 text-sm">
                {DECISION_FLOW.map((d, i) => (
                  <li key={d.title}><span className="font-semibold text-maroon">{i + 1}. {d.title}: </span>{d.text}</li>
                ))}
              </ol>
              <p className="mt-3 text-sm italic">{DECISION_FLOW_WARNING}</p>
            </>
          ),
        },
      ]}
      apply={{
        title: "Apply it: an incomplete decision paper",
        body: (
          <>
            <p className="rounded-md bg-surface px-3 py-2 text-sm">{PAPER_SITUATION}</p>
            <p className="mt-3 text-sm">Every option is useful. Which is the best action for your selected role?</p>
            <LensFormative set={PAPER_OPTIONS} />
          </>
        ),
      }}
      takeaway="Challenge should make the decision clearer while keeping accountability with the right owner."
      action="Check the next paper due at a forum against the seven parts of a decision-ready paper."
    />
  );
}

/* ------------------------------------------------------------------ */
/* Module 7                                                            */
/* ------------------------------------------------------------------ */

function ReadinessModule() {
  const lens = useLens();
  return (
    <>
      <TeachingModule
        id="readiness"
        outcome="Support a programme recommendation based on accepted evidence, executable plans and clear remaining risk."
        trigger="Every workstream says it is ready. What would convince the forum?"
        steps={[
          {
            title: "Integrated readiness",
            body: (
              <>
                <p className="text-sm">
                  Readiness brings together accepted outputs, rehearsed cutover plans, fallbacks and decision points. Residual risk is the
                  risk left after agreed controls are applied; it must be accepted by the right authority, not assumed.
                </p>
                <More label="See more: after cutover">
                  Stabilisation and hypercare keep one view of incidents and remaining actions until business as usual accepts ownership.
                  Closure records lessons and updates standards.
                </More>
              </>
            ),
          },
          {
            title: "Resources you will use",
            body: (
              <>
                <p className="text-sm">{RESOURCE_EMPHASIS[lens]}</p>
                <More label="See more: what each resource is for">
                  <ul className="space-y-2">
                    {[...CORE_RESOURCES.map((r) => ({ name: r.name, text: `${r.purpose} ${r.when}` })), ...RELEVANT_RESOURCES].map((r) => (
                      <li key={r.name}><span className="font-semibold text-foreground">{r.name}: </span>{r.text}</li>
                    ))}
                  </ul>
                </More>
                <p className="mt-3 flex gap-2 rounded-md border border-amber-600/40 bg-amber-50 px-3 py-2 text-sm text-amber-900">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  {TEMPLATE_NOTICE}
                </p>
              </>
            ),
          },
        ]}
        apply={{
          title: "Apply it: choose the evidence",
          body: <PickN items={READINESS_OPTIONS} prompt="Choose the three items that best support a programme readiness recommendation." />,
        }}
        takeaway="Recommend readiness from accepted evidence, executable plans and clearly accepted remaining risk."
        action="Answer the six playbook prompts for your programme."
        extra={
          <div className="mt-5">
            <Label>Your playbook</Label>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
              {PLAYBOOK_PROMPTS.map((p) => <li key={p}>{p}</li>)}
            </ol>
            <LensNote kind="playbook" />
            <div className="mt-3"><PrintButton /></div>
          </div>
        }
      />
      <PlaybookPrint />
    </>
  );
}

function PlaybookPrint() {
  const lens = useLens();
  return (
    <div className="hidden print:block">
      <h1 className="text-2xl font-semibold">Central Hub playbook</h1>
      <h2 className="mt-4 font-semibold">Six prompts for your programme</h2>
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
      <h2 className="mt-6 font-semibold">{ROLE_PROMPTS[lens].title}</h2>
      <ul className="mt-1 list-disc pl-5 text-sm">{ROLE_PROMPTS[lens].items.map((p) => <li key={p}>{p}</li>)}</ul>
      <h2 className="mt-6 font-semibold">Authority</h2>
      <p className="mt-1 text-sm">{LENS_WARNING}</p>
      <h2 className="mt-6 font-semibold">Resources</h2>
      <p className="mt-1 text-sm">{[...CORE_RESOURCES, ...RELEVANT_RESOURCES].map((r) => r.name).join("; ")}.</p>
      <p className="mt-2 text-sm italic">{TEMPLATE_NOTICE}</p>
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
      <Printer className="h-3.5 w-3.5" aria-hidden /> Print Central Hub playbook
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Module 8                                                            */
/* ------------------------------------------------------------------ */

function Capstone() {
  const { progress, update } = useCHProgress();
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
          The capstone opens once you have visited Modules 2 to 7.{" "}
          <Link to="/learning/central-hub" className="font-medium text-maroon hover:underline">Back to pathway</Link>
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
                  <Link to="/learning/central-hub/$moduleId" params={{ moduleId: cap.module }} className="text-xs text-muted-foreground hover:text-maroon hover:underline">
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
            <Link to="/learning/central-hub" className="rounded-md border border-input px-3 py-1.5 text-xs font-medium hover:text-maroon">
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
          <LensNote kind="scenario" />
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
      case "mobilise": return <MobiliseModule />;
      case "programme-view": return <ProgrammeViewModule />;
      case "control": return <ControlModule />;
      case "decisions": return <DecisionsModule />;
      case "readiness": return <ReadinessModule />;
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
