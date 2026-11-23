import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { AlertTriangle, ArrowLeft, ArrowRight, Check, Clock, Lightbulb, PartyPopper, Plus, Printer, RotateCcw, Sparkles, Target, Trophy, X } from "lucide-react";
import { BrandHeader } from "@/components/BrandHeader";
import { Term } from "@/components/learning/Term";
import { cn } from "@/lib/utils";
import { AttentionTimeline } from "@/components/AttentionTimeline";
import {
  BOUNDARY,
  CHANGE_ITEMS,
  CORE_RESOURCES,
  ECONOMICS,
  INTENSITY,
  MANDATE,
  MEETING_BEFORE,
  PLAN_QUALITY,
  RAID_ITEMS,
  RELEVANT_RESOURCES,
  RESOURCE_NOTICE,
  ROLES,
  AUTHORITY_TEST,
  PRINCIPLES,
} from "@/lib/learning/workstream-project-manager";
import {
  CAPABILITIES,
  CAPSTONE,
  CAPSTONE_DECISIONS,
  CONTROL_OPTIONS,
  CONTROL_TYPES,
  CONTROL_UPDATE,
  CYCLE,
  DECISION_PARTS,
  DIAGNOSTIC,
  DIAGNOSTIC_DECISIONS,
  ESCALATION_STRONG,
  ESCALATION_WEAK,
  MODULES,
  PAPER,
  PAPER_MISSING,
  PLAN_LINE,
  PLAN_MISSING,
  PLAN_PARTS,
  PLAN_STEPS,
  PLAN_WEAK,
  PLAYBOOK_PROMPTS,
  READINESS_AREAS,
  READINESS_OPTIONS,
  SORT_ITEMS,
  STATUS_COMPARE,
  STATUS_EVIDENCE,
  STATUS_OPTIONS,
  TEACHING_IDS,
  type CapabilityId,
  type Confidence,
  type Decision,
  type ModuleId,
  type Opt,
  type SortKey,
} from "@/lib/learning/workstream-project-manager-modules";
import { addUnique, useWPMProgress, type Attempt } from "@/lib/learning/workstream-project-manager-progress";


export const Route = createFileRoute("/learning/workstream-project-manager/$moduleId")({
  loader: ({ params }) => {
    const mod = MODULES.find((m) => m.id === params.moduleId);
    if (!mod) throw notFound();
    return { moduleId: mod.id as ModuleId };
  },
  head: ({ loaderData }) => {
    const mod = MODULES.find((m) => m.id === loaderData?.moduleId);
    const title = mod ? `${mod.no}. ${mod.title} | Workstream Project Manager pathway` : "Module unavailable | Workstream Project Manager pathway";
    const desc = mod ? `${mod.purpose}. A ${mod.minutes}-minute Workstream Project Manager module.` : "This module could not be found.";
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
        <Link to="/learning/workstream-project-manager" className="mt-3 inline-block text-sm font-medium text-maroon hover:underline">
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
      <Link to="/learning/workstream-project-manager" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-maroon">
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Back to pathway
      </Link>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        Workstream Project Manager · Module {mod.no} of {MODULES.length}
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
  const { update } = useWPMProgress();
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
            <Link to="/learning/workstream-project-manager" className="rounded-md border border-input px-3 py-1.5 text-xs font-medium hover:text-maroon">
              Back to pathway
            </Link>
            {next ? (
              <Link
                to="/learning/workstream-project-manager/$moduleId"
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
  const { progress, update } = useWPMProgress();
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
                      <Link to="/learning/workstream-project-manager/$moduleId" params={{ moduleId: c.module }} className="text-maroon hover:underline">
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
            <Link to="/learning/workstream-project-manager" className="rounded-md border border-input px-3 py-1.5 text-xs font-medium hover:text-maroon">
              Back to pathway
            </Link>
            <Link
              to="/learning/workstream-project-manager/$moduleId"
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
              <Link to="/learning/workstream-project-manager" className="font-medium text-maroon hover:underline">Back to pathway</Link>
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
/* Module 2                                                            */
/* ------------------------------------------------------------------ */

function SortTask() {
  const items = useShuffled(SORT_ITEMS);
  const [placed, setPlaced] = useState<Record<string, SortKey>>({});
  const cols = [
    ["control", "Control"],
    ["challenge", "Challenge"],
    ["escalate", "Escalate"],
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

function MandateModule() {
  return (
    <TeachingModule
      id="mandate"
      outcome="Know what you control, what you challenge and what you escalate."
      trigger="An owner asks you to move their date in the plan. Is that your call?"
      steps={[
        {
          title: "Control",
          body: (
            <>
              <p className="text-sm">
                You control the detailed plan, the control logs, the reporting cycle, meeting preparation, records and the agreed change process.
              </p>
              <More label="See more: everything you control">
                <Bullets items={MANDATE.control.items} />
              </More>
            </>
          ),
        },
        {
          title: "Challenge and escalate",
          body: (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Challenge</Label>
                <Bullets items={["Unsupported progress", "Unclear ownership", "Weak evidence", "Missing dependencies", "Unrealistic forecasts"]} />
              </div>
              <div>
                <Label>Escalate</Label>
                <Bullets items={["Functional decisions", "Trade-offs", "Changes outside your authority"]} />
              </div>
              <div className="sm:col-span-2">
                <More label="See more: full challenge and escalation lists">
                  <Bullets items={[...MANDATE.challenge.items, ...MANDATE.escalate.items]} />
                  <p className="mt-2">{MANDATE.challenge.note}</p>
                  <p className="mt-2">{MANDATE.escalate.note}</p>
                </More>
              </div>
            </div>
          ),
        },
        {
          title: "Your boundary",
          body: (
            <>
              <p className="text-sm">
                The Workstream Lead owns the functional outcome and recommendation. The Central Hub owns the integrated programme view. You
                make the information they rely on accurate.
              </p>
              <More label="See more: who does what">
                <ul className="space-y-2">
                  {ROLES.map((r) => (
                    <li key={r.id}><span className="font-semibold text-foreground">{r.name}: </span>{r.text}</li>
                  ))}
                </ul>
                <p className="mt-2">You do not {BOUNDARY}</p>
              </More>
              <More label="Example: is this update within your authority?">
                <Bullets items={AUTHORITY_TEST} />
              </More>
            </>
          ),
        },
        {
          title: "Where you are needed most",
          body: (
            <>
              <p className="mb-3 text-sm">Your effort is highest during mobilisation, planning and execution.</p>
              <AttentionTimeline rows={INTENSITY} />
            </>
          ),
        },
      ]}
      apply={{ title: "Apply it: control, challenge or escalate", body: <SortTask /> }}
      takeaway="Make delivery information reliable without taking over decisions that belong to the Workstream Lead."
      action="Agree with your Workstream Lead which three decisions they want raised to them first, and how quickly."
    />
  );
}

/* ------------------------------------------------------------------ */
/* Module 3                                                            */
/* ------------------------------------------------------------------ */

function PlanStrip() {
  const [sel, setSel] = useState(0);
  return (
    <div>
      <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Plan quality">
        {PLAN_PARTS.map((p, i) => (
          <button
            key={p.title}
            type="button"
            role="tab"
            aria-selected={sel === i}
            onClick={() => setSel(i)}
            className={cn(
              "rounded-md border px-2.5 py-1 text-xs font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-maroon/40",
              sel === i ? "border-maroon bg-blush text-maroon" : "border-input hover:border-maroon/45",
            )}
          >
            {i + 1}. {p.title}
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm" role="tabpanel">{PLAN_PARTS[sel]!.text}</p>
    </div>
  );
}

function ImproveLine() {
  const [n, setN] = useState(0);
  return (
    <div className="space-y-3 text-sm">
      <div>
        <Label>Weak</Label>
        <p className="mt-1 rounded-md bg-surface px-3 py-2">{PLAN_WEAK}</p>
      </div>
      {PLAN_STEPS.slice(0, n).map((s, i) => (
        <div key={s.label}>
          <Label>{i === PLAN_STEPS.length - 1 ? "Executable" : s.label}</Label>
          <p className="mt-1 rounded-md border border-maroon/30 bg-blush/50 px-3 py-2">{s.text}</p>
        </div>
      ))}
      {n < PLAN_STEPS.length ? (
        <button type="button" onClick={() => setN((x) => x + 1)} className="rounded-md border border-maroon/40 px-3 py-1.5 text-xs font-medium text-maroon">
          {PLAN_STEPS[n]!.label}
        </button>
      ) : null}
    </div>
  );
}

function PickTwo({
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

function PlanModule() {
  return (
    <TeachingModule
      id="plan"
      outcome="Build a plan that shows how the work will be delivered and accepted."
      trigger="Every activity has a date. Could someone else tell when each one is truly done?"
      steps={[
        {
          title: "Seven parts of an executable plan",
          body: (
            <>
              <PlanStrip />
              <More label="Why this matters">
                <Term def="The conditions that must be met before an output is accepted as complete.">Acceptance criteria</Term> turn
                “finished” into something others can check. A{" "}
                <Term def="An input, decision or activity that another task relies on.">dependency</Term> shows what the work cannot start
                or finish without.
              </More>
              <More label="See more: plan quality questions">
                <Bullets items={PLAN_QUALITY} />
              </More>
            </>
          ),
        },
        { title: "Improve a weak line", body: <ImproveLine /> },
        {
          title: "Connect to the programme plan",
          body: (
            <>
              <p className="text-sm">
                The detailed workstream plan (L2 plan) must support the integrated programme plan. Check programme milestones, the critical
                path and hand-offs, and give every interface an owner. Once agreed, the plan becomes your{" "}
                <Term def="The approved scope, plan or budget used to measure progress.">baseline</Term>.
              </p>
              <More label="Why this matters">
                The critical path is the work that directly determines the overall delivery date. A slip there moves the programme, not just
                your workstream.
              </More>
            </>
          ),
        },
      ]}
      apply={{
        title: "Apply it: what most threatens execution?",
        body: (
          <>
            <p className="rounded-md bg-surface px-3 py-2 text-sm">{PLAN_LINE}</p>
            <PickTwo items={PLAN_MISSING} prompt="Select the two gaps that most threaten whether this line can be executed." />
          </>
        ),
      }}
      takeaway="A plan is credible when owners can execute it and the programme can test its effect."
      action="Check your next three milestones each have an owner, a dependency view and acceptance criteria."
    />
  );
}

/* ------------------------------------------------------------------ */
/* Module 4                                                            */
/* ------------------------------------------------------------------ */

function ControlModule() {
  return (
    <TeachingModule
      id="control"
      outcome="Maintain one reliable record of what could change delivery."
      trigger="Something changed on a call yesterday. Does your record show it?"
      steps={[
        {
          title: "Six things you keep controlled",
          body: (
            <>
              <dl className="grid gap-2 text-sm sm:grid-cols-2">
                {CONTROL_TYPES.map((c) => (
                  <div key={c.title} className="rounded-md bg-surface px-3 py-2">
                    <dt className="font-semibold text-maroon">{c.title}</dt>
                    <dd className="mt-0.5">{c.text}</dd>
                  </div>
                ))}
              </dl>
              <More label="Why this matters">
                <Term def="Risks, assumptions, issues and dependencies.">RAID</Term> is the usual name for this record. When a risk happens it
                becomes an issue; when an assumption proves false it becomes an issue or a change.
              </More>
            </>
          ),
        },
        {
          title: "Owners, dates and closure",
          body: (
            <>
              <p className="text-sm">
                Every item needs a clear statement, an owner, a target date, a response and the proof required before it closes. Items that age
                without action are a signal to challenge or escalate.
              </p>
              <More label="See more: what each item should record">
                <Bullets items={RAID_ITEMS} />
              </More>
              <More label="Example: when does a dependency go to the Central PMO?">
                When it affects, or may affect, another workstream or a programme milestone and cannot be resolved within the workstream.
                Raise it while the programme can still coordinate recovery.
              </More>
            </>
          ),
        },
        {
          title: "Change control",
          body: (
            <>
              <p className="text-sm">
                A proposed change to scope, timing, cost or required evidence enters{" "}
                <Term def="The agreed process for assessing and approving a change to the baseline.">change control</Term>. Record it, assess
                its effects and keep the existing baseline until the right owner approves it.
              </p>
              <More label="See more: the change steps">
                <Bullets items={CHANGE_ITEMS} />
              </More>
            </>
          ),
        },
      ]}
      apply={{
        title: "Apply it: what do you record first?",
        body: (
          <>
            <Label>Update</Label>
            <Bullets items={CONTROL_UPDATE} />
            <Formative options={CONTROL_OPTIONS} correct="b" />
          </>
        ),
      }}
      takeaway="Control records should expose the next action or decision, not store stale descriptions."
      action="Find the three oldest open items in your logs and confirm each has a current owner, date and next action."
    />
  );
}

/* ------------------------------------------------------------------ */
/* Module 5                                                            */
/* ------------------------------------------------------------------ */

function ReportModule() {
  return (
    <TeachingModule
      id="report"
      outcome="Use the weekly rhythm to expose the real forecast and drive action."
      trigger="Every task this week was done. Is the workstream on track?"
      steps={[
        {
          title: "The weekly cycle",
          body: (
            <>
              <ol className="space-y-2 text-sm">
                {CYCLE.map((r, i) => (
                  <li key={r.title} className="flex gap-3">
                    <span className="w-5 shrink-0 font-semibold text-maroon">{i + 1}</span>
                    <span><span className="font-medium">{r.title}. </span>{r.text}</span>
                  </li>
                ))}
              </ol>
              <More label="See more: before the workstream meeting">
                <Bullets items={MEETING_BEFORE} />
              </More>
            </>
          ),
        },
        {
          title: "Activity update or decision-useful status?",
          body: (
            <>
              <div className="grid gap-3 text-sm sm:grid-cols-2">
                <div className="rounded-md bg-surface px-3 py-2">
                  <Label>Activity update</Label>
                  <p className="mt-1">{STATUS_COMPARE.activity}</p>
                </div>
                <div className="rounded-md border border-maroon/30 bg-blush/50 px-3 py-2">
                  <Label>Decision-useful status</Label>
                  <p className="mt-1">{STATUS_COMPARE.useful}</p>
                </div>
              </div>
              <p className="mt-3 text-sm">
                Red, amber or green status reflects forecast outcome, evidence, recovery and dependencies, not percentage complete. The
                Workstream Lead confirms the status; you make sure it matches the evidence.
              </p>
            </>
          ),
        },
      ]}
      apply={{
        title: "Apply it: choose the strongest status",
        body: (
          <>
            <Label>Evidence</Label>
            <Bullets items={STATUS_EVIDENCE} />
            <Formative options={STATUS_OPTIONS} correct="b" />
          </>
        ),
      }}
      takeaway="Report the outcome now forecast and the action required, not how busy the team has been."
      action="Rewrite your latest status headline so it states the forecast, the trigger and the action needed."
    />
  );
}

/* ------------------------------------------------------------------ */
/* Module 6                                                            */
/* ------------------------------------------------------------------ */

function DecideModule() {
  return (
    <TeachingModule
      id="decide"
      outcome="Give the right owner enough information to make a timely decision."
      trigger="A hand-off is slipping. Are you reporting a problem or preparing a decision?"
      steps={[
        {
          title: "What a decision needs",
          body: (
            <>
              <ol className="space-y-1.5 text-sm">
                {DECISION_PARTS.map((s, i) => (
                  <li key={s} className="flex gap-3">
                    <span className="w-5 shrink-0 font-semibold text-maroon">{i + 1}</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
              <More label="Why this matters">
                You prepare and control the decision. The owner makes it. Do not make functional decisions that have not been approved.
              </More>
            </>
          ),
        },
        {
          title: "Reporting a problem or preparing a decision",
          body: (
            <div className="space-y-3 text-sm">
              <div className="rounded-md bg-surface px-3 py-2">
                <Label>Reporting a problem</Label>
                <p className="mt-1">{ESCALATION_WEAK}</p>
              </div>
              <div className="rounded-md border border-maroon/30 bg-blush/50 px-3 py-2">
                <Label>Preparing a decision</Label>
                <p className="mt-1">{ESCALATION_STRONG}</p>
              </div>
            </div>
          ),
        },
        {
          title: "Make the economics visible",
          body: (
            <>
              <p className="text-sm">You do not own the business case, but a decision paper should show the cost and value effects.</p>
              <More label="See more: effects to show">
                <Bullets items={ECONOMICS} />
              </More>
            </>
          ),
        },
      ]}
      apply={{
        title: "Apply it: complete the decision paper",
        body: (
          <>
            <dl className="space-y-2 text-sm">
              {PAPER.map((p) => (
                <div key={p.label} className="rounded-md bg-surface px-3 py-2">
                  <dt className="font-semibold text-maroon">{p.label}</dt>
                  <dd className="mt-0.5">{p.text}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-sm">What material element is missing?</p>
            <Formative options={PAPER_MISSING} correct="a" />
          </>
        ),
      }}
      takeaway="A good escalation reduces the work required from the decision-maker without hiding the trade-off."
      action="Take your most uncertain dependency and write its decision owner and final useful decision date."
    />
  );
}

/* ------------------------------------------------------------------ */
/* Module 7                                                            */
/* ------------------------------------------------------------------ */

function PlaybookPrint() {
  return (
    <div className="hidden print:block">
      <h1 className="text-2xl font-semibold">Workstream Project Manager playbook</h1>
      <h2 className="mt-4 font-semibold">Six prompts for your workstream</h2>
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
      <p className="mt-1 text-sm">
        The Workstream Lead owns the functional outcome and recommendation. The Central Hub owns the integrated programme view. You do not {BOUNDARY}
      </p>
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
      <Printer className="h-3.5 w-3.5" aria-hidden /> Print Project Manager playbook
    </button>
  );
}

function ReadinessModule() {
  return (
    <>
      <TeachingModule
        id="readiness"
        outcome="Organise the proof and controls needed for a credible readiness recommendation."
        trigger="The team says it is ready. What proof would the Workstream Lead need?"
        steps={[
          {
            title: "What readiness evidence covers",
            body: (
              <>
                <dl className="grid gap-2 text-sm sm:grid-cols-2">
                  {READINESS_AREAS.map((a) => (
                    <div key={a.title} className="rounded-md bg-surface px-3 py-2">
                      <dt className="font-semibold text-maroon">{a.title}</dt>
                      <dd className="mt-0.5">{a.text}</dd>
                    </div>
                  ))}
                </dl>
                <More label="Why this matters">
                  <Term def="The controlled move from the current state to the new operating state.">Cutover</Term> depends on a timed
                  runbook and rehearsed fallbacks.{" "}
                  <Term def="Risk that remains after the agreed actions or controls have been applied.">Residual risk</Term> must be visible
                  and accepted by the right authority. You maintain the evidence and control view; the Workstream Lead owns the recommendation.
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
          title: "Apply it: select the readiness evidence",
          body: <PickTwo items={READINESS_OPTIONS} prompt="Select the three items that count as readiness evidence." />,
        }}
        takeaway="Readiness is shown by accepted proof and controlled gaps, not by confidence that the team will recover later."
        action="Answer the six playbook prompts for your workstream."
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
  const { progress, update } = useWPMProgress();
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
          <Link to="/learning/workstream-project-manager" className="font-medium text-maroon hover:underline">Back to pathway</Link>
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
                  <Link to="/learning/workstream-project-manager/$moduleId" params={{ moduleId: cap.module }} className="text-xs text-muted-foreground hover:text-maroon hover:underline">
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
            <Link to="/learning/workstream-project-manager" className="rounded-md border border-input px-3 py-1.5 text-xs font-medium hover:text-maroon">
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
      case "control": return <ControlModule />;
      case "plan": return <PlanModule />;
      case "report": return <ReportModule />;
      case "decide": return <DecideModule />;
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
