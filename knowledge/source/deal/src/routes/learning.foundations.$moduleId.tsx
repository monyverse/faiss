import { useEffect, useState, type ReactNode } from "react";
import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ArrowDown, ArrowUp, Check, X } from "lucide-react";
import { BrandHeader } from "@/components/BrandHeader";
import { ExecutionGap } from "@/components/learning/ExecutionGap";
import {
  CASE_PRINCIPLES, CASES, CAUTIONARY, CLASSIFY, CLOSING, CLOSING_LINKS, CONVERT, HEATMAP, MATCHES, MODULES,
  NEW_FACTS, OPENING_QUESTIONS, PHASES, RANK_LIMIT, SCENARIO, T, type ChoiceQ, type FModule,
} from "@/lib/learning/foundations";
import { addOnce, useFoundationsProgress } from "@/lib/learning/foundations-progress";

export const Route = createFileRoute("/learning/foundations/$moduleId")({
  loader: ({ params }) => {
    const m = MODULES.find((x) => x.id === params.moduleId);
    if (!m) throw notFound();
    return { id: m.id };
  },
  head: ({ loaderData }) => {
    const m = MODULES.find((x) => x.id === loaderData?.id);
    const title = m ? `${m.no}. ${m.title} | M&A Foundations` : "Module not found | M&A Foundations";
    const desc = m?.summary ?? "M&A Foundations module.";
    return {
      meta: [
        { title }, { name: "description", content: desc },
        { property: "og:title", content: title }, { property: "og:description", content: desc },
        { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background"><BrandHeader /><main className="mx-auto max-w-3xl px-6 py-10"><p>Module not found.</p><Link to="/learning/foundations" className="text-maroon hover:underline">Back to M&amp;A Foundations</Link></main></div>
  ),
  component: ModulePage,
});

type Step = { label: string; node: ReactNode; canContinue?: boolean };

function ModulePage() {
  const { id } = Route.useLoaderData();
  const m = MODULES.find((x) => x.id === id)!;
  const { progress, update } = useFoundationsProgress();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  useEffect(() => { setStep(0); update((p) => ({ ...p, started: addOnce(p.started, m.id) })); }, [m.id, update]);

  const steps = buildSteps(m);
  const s = steps[Math.min(step, steps.length - 1)]!;
  const last = step >= steps.length - 1;
  const next = MODULES[m.no];

  const finish = () => {
    update((p) => ({
      ...p,
      completed: addOnce(p.completed, m.id),
      pathwayComplete: m.id === "closing" ? true : p.pathwayComplete,
    }));
    if (m.id === "closing") navigate({ to: "/learning" });
    else if (next) navigate({ to: "/learning/foundations/$moduleId", params: { moduleId: next.id } });
    else navigate({ to: "/learning/foundations" });
  };

  const closingLocked = m.id === "closing" && !progress.opening;

  return (
    <div className="min-h-screen bg-background">
      <BrandHeader />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Link to="/learning/foundations" className="text-xs text-muted-foreground hover:text-maroon">← M&amp;A Foundations</Link>
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-red">Module {m.no} of {MODULES.length} · {m.minutes} min</p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-maroon">{m.title}</h1>

        {closingLocked ? (
          <p className="mt-6 text-sm">Complete the <Link to="/learning/foundations/$moduleId" params={{ moduleId: "opening" }} className="font-medium text-maroon hover:underline">opening scenario</Link> first, so you can compare your judgement.</p>
        ) : (
          <>
            <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-muted" aria-hidden>
              <div className="h-full bg-maroon transition-all" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
            </div>
            <nav className="mt-3 flex flex-wrap gap-1.5" aria-label="Steps">
              {steps.map((st, i) => (
                <button key={i} type="button" onClick={() => setStep(i)} aria-current={i === step ? "step" : undefined}
                  className={`rounded-full border px-2.5 py-0.5 text-xs ${i === step ? "border-maroon bg-maroon text-primary-foreground" : "border-border text-muted-foreground hover:border-maroon/50 hover:text-maroon"}`}>
                  {st.label}
                </button>
              ))}
            </nav>
            <section key={`${m.id}-${step}`} className="mt-5 animate-in fade-in duration-200">{s.node}</section>
            <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
              <button type="button" disabled={step === 0} onClick={() => setStep(step - 1)} className="rounded-md border border-input px-3 py-1.5 text-xs font-medium disabled:opacity-40">Back</button>
              {last ? (
                <button type="button" disabled={s.canContinue === false || (m.id === "closing" && Object.keys(progress.closing ?? {}).length < CLOSING.length)} onClick={finish} className="rounded-md bg-maroon px-3 py-1.5 text-xs font-semibold text-primary-foreground disabled:opacity-40">
                  {m.id === "closing" ? "Continue to my role pathway" : next ? `Complete and go to Module ${next.no}` : "Complete module"}
                </button>
              ) : (
                <button type="button" disabled={s.canContinue === false} onClick={() => setStep(step + 1)} className="rounded-md bg-maroon px-3 py-1.5 text-xs font-semibold text-primary-foreground disabled:opacity-40">Next</button>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function Prose({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-lg font-semibold text-maroon">{title}</h2>
      <div className="mt-2 space-y-3 text-sm leading-relaxed [&_li]:ml-5 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ul]:list-disc [&_ul]:space-y-1">{children}</div>
    </div>
  );
}

function Takeaway({ text }: { text: string }) {
  return (
    <div className="border-l-2 border-maroon bg-blush/60 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-maroon">Key takeaway</p>
      <p className="mt-1 text-sm">{text}</p>
    </div>
  );
}

function buildSteps(m: FModule): Step[] {
  const content: Step[] = m.screens.map((sc) => ({ label: sc.title, node: <Prose title={sc.title}>{sc.body}</Prose> }));
  const end: Step = { label: "Takeaway", node: <Takeaway text={m.takeaway} /> };
  switch (m.id) {
    case "opening":
      return [{ label: "The deal", node: <ScenarioBrief /> }, { label: "Your priorities", node: <OpeningRank /> }, end];
    case "what-is-ma":
      return [{ label: "Overview", node: <ValueChain /> }, ...content, { label: "Practice", node: <QuizList title="Classify each transaction" intro="What is actually transferring?" qs={CLASSIFY} /> }, end];
    case "why-banks":
      return [...content, { label: "Practice", node: <MatchExercise /> }, end];
    case "outcomes":
      return [...content, { label: "Practice", node: <ConvertExercise /> }, end];
    case "good":
      return [...content, { label: "Practice", node: <CaseExercise /> }, end];
    case "pitfalls":
      return [
        { label: "Pitfalls table", node: <PitfallTable /> },
        { label: "Cautionary examples", node: <Cautionary /> },
        { label: "Heatmap", node: <Heatmap /> },
        end,
      ];
    case "closing":
      return [{ label: "New facts", node: <ClosingFacts /> }, { label: "Decisions", node: <ClosingDecisions /> }, { label: "Compare", node: <Compare /> }, end, { label: "Execution gap", node: <ExecutionGap /> }];
  }
}

/* ---------- Shared choice question ---------- */

function ChoiceBlock({ q, name }: { q: ChoiceQ; name?: string }) {
  const [sel, setSel] = useState<number | null>(null);
  return (
    <div>
      {name ? <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">{name}</p> : null}
      <p className="text-sm font-medium">{q.prompt}</p>
      <div className="mt-2 space-y-1.5">
        {q.options.map((o, j) => {
          const chosen = sel === j;
          const right = j === q.correct;
          const tone = sel === null ? "border-border hover:border-maroon/50" : chosen ? (right ? "border-maroon bg-blush/50" : "border-red/60 bg-muted/40") : right && sel !== null ? "border-maroon/40" : "border-border";
          return (
            <button key={j} type="button" aria-pressed={chosen} onClick={() => setSel(j)} className={`flex w-full items-start gap-2 rounded-md border px-3 py-2 text-left text-sm transition-colors ${tone}`}>
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-maroon/40 text-[0.625rem] font-semibold text-maroon">{String.fromCharCode(65 + j)}</span>
              <span className="flex-1">{o}</span>
              {chosen ? <span key={right ? "y" : "n"} aria-hidden>{right ? <Check className="h-4 w-4 text-maroon" /> : <X className="h-4 w-4 text-red" />}</span> : null}
            </button>
          );
        })}
      </div>
      {sel !== null ? (
        <p key={sel} className="mt-2 border-l-2 border-maroon/60 pl-3 text-sm text-foreground">
          <span className="font-semibold">{sel === q.correct ? "Good call. " : "Worth another look. "}</span>{q.feedback[sel]}
        </p>
      ) : null}
    </div>
  );
}

function QuizList({ title, intro, qs }: { title: string; intro: string; qs: ChoiceQ[] }) {
  return (
    <div>
      <h2 className="font-display text-lg font-semibold text-maroon">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{intro}</p>
      <div className="mt-4 space-y-6">{qs.map((q, i) => <ChoiceBlock key={i} q={q} />)}</div>
    </div>
  );
}

/* ---------- Module 1 ---------- */

function ScenarioBrief() {
  return (
    <div>
      <div className="rounded-t-md bg-maroon px-4 py-3 text-primary-foreground">
        <p className="text-xs uppercase tracking-[0.12em] opacity-80">Fictional scenario</p>
        <p className="font-display text-lg font-semibold">{SCENARIO.title}</p>
      </div>
      <ol className="divide-y divide-border rounded-b-md border border-t-0 border-border">
        {SCENARIO.facts.map((f, i) => (
          <li key={i} className="flex gap-3 px-4 py-3 text-sm"><span className="font-semibold text-maroon">{i + 1}</span><span>{f}</span></li>
        ))}
      </ol>
      <p className="mt-3 text-sm">Before you support the deal, you need to decide what to investigate first. There is no score yet.</p>
    </div>
  );
}

function OpeningRank() {
  const { progress, update } = useFoundationsProgress();
  const [ranked, setRanked] = useState<string[]>([]);
  useEffect(() => { if (progress.opening) setRanked(progress.opening); }, [progress.opening]);
  const save = (next: string[]) => { setRanked(next); update((p) => ({ ...p, opening: next })); };
  const toggle = (id: string) => save(ranked.includes(id) ? ranked.filter((x) => x !== id) : ranked.length < RANK_LIMIT ? [...ranked, id] : ranked);
  const move = (i: number, d: -1 | 1) => { const n = [...ranked]; const t = n[i]!; n[i] = n[i + d]!; n[i + d] = t; save(n); };
  const label = (id: string) => OPENING_QUESTIONS.find((q) => q.id === id)!.label;
  return (
    <div>
      <h2 className="font-display text-lg font-semibold text-maroon">Choose and rank your top {RANK_LIMIT}</h2>
      <p className="mt-1 text-sm text-muted-foreground">All nine are credible. Pick the five you would investigate first, then order them.</p>
      <div className="mt-3 grid gap-1.5">
        {OPENING_QUESTIONS.map((q) => {
          const on = ranked.includes(q.id);
          return (
            <button key={q.id} type="button" aria-pressed={on} onClick={() => toggle(q.id)} disabled={!on && ranked.length >= RANK_LIMIT}
              className={`rounded-md border px-3 py-2 text-left text-sm disabled:opacity-40 ${on ? "border-maroon bg-blush/50" : "border-border hover:border-maroon/50"}`}>
              {q.label}
            </button>
          );
        })}
      </div>
      {ranked.length ? (
        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-maroon">Your ranking ({ranked.length} of {RANK_LIMIT})</p>
          <ol className="mt-2 space-y-1.5">
            {ranked.map((id, i) => (
              <li key={id} className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm">
                <span className="font-semibold text-maroon">{i + 1}</span>
                <span className="flex-1">{label(id)}</span>
                <button type="button" aria-label="Move up" disabled={i === 0} onClick={() => move(i, -1)} className="rounded p-1 disabled:opacity-30 hover:text-maroon"><ArrowUp className="h-4 w-4" /></button>
                <button type="button" aria-label="Move down" disabled={i === ranked.length - 1} onClick={() => move(i, 1)} className="rounded p-1 disabled:opacity-30 hover:text-maroon"><ArrowDown className="h-4 w-4" /></button>
              </li>
            ))}
          </ol>
          <p className="mt-2 text-xs text-muted-foreground">Saved automatically. You will compare this in Module 7.</p>
        </div>
      ) : null}
    </div>
  );
}

/* ---------- Module 2 ---------- */

function ValueChain() {
  const items = ["Rationale", "Transaction", "Execution", "Outcomes"];
  const sub = ["Why do the deal", "What transfers, and on what terms", "Plan, test, transition", "Value realised and sustained"];
  return (
    <div>
      <h2 className="font-display text-lg font-semibold text-maroon">From rationale to outcomes</h2>
      <ol className="mt-4 grid gap-2 sm:grid-cols-4">
        {items.map((it, i) => (
          <li key={it} className="relative rounded-md border border-maroon/40 px-3 py-3 text-center">
            <p className="text-sm font-semibold text-maroon">{it}</p>
            <p className="mt-1 text-xs text-muted-foreground">{sub[i]}</p>
            {i < items.length - 1 ? <span aria-hidden className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-maroon sm:block">›</span> : null}
          </li>
        ))}
      </ol>
      <p className="mt-4 text-sm">A deal only creates value if every link holds. This pathway follows that chain.</p>
    </div>
  );
}

/* ---------- Module 3 ---------- */

function MatchExercise() {
  return (
    <div>
      <h2 className="font-display text-lg font-semibold text-maroon">Match value and risk</h2>
      <p className="mt-1 text-sm text-muted-foreground">For each fictional rationale, choose the value sought and the principal risk.</p>
      <div className="mt-4 space-y-6">
        {MATCHES.map((x, i) => (
          <div key={i} className="border-t border-border pt-4">
            <p className="text-sm font-semibold">{x.rationale}</p>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <ChoiceBlock q={x.value} />
              <ChoiceBlock q={x.risk} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Module 4 ---------- */

function ConvertExercise() {
  return (
    <div>
      <h2 className="font-display text-lg font-semibold text-maroon">Turn activities into outcomes</h2>
      <p className="mt-1 text-sm text-muted-foreground">Choose the best outcome, then the evidence that would prove it.</p>
      <div className="mt-4 space-y-6">
        {CONVERT.map((x, i) => (
          <div key={i} className="space-y-4 border-t border-border pt-4">
            <p className="text-sm"><span className="font-semibold">Activity:</span> {x.activity}</p>
            <ChoiceBlock q={x.outcome} />
            <ChoiceBlock q={x.evidence} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Module 5 ---------- */

function CaseExercise() {
  const [picked, setPicked] = useState<Record<number, number[]>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  return (
    <div>
      <h2 className="font-display text-lg font-semibold text-maroon">Spot the principles</h2>
      <p className="mt-1 text-sm text-muted-foreground">Select the execution principles visible in each example, then check.</p>
      <div className="mt-4 space-y-6">
        {CASES.map((c, i) => {
          const sel = picked[i] ?? [];
          const done = checked[i];
          return (
            <div key={i} className="border-t border-border pt-4">
              <p className="text-sm font-semibold">{c.name}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {CASE_PRINCIPLES.map((p, j) => {
                  const on = sel.includes(j);
                  const vis = c.visible.includes(j);
                  const tone = done ? (vis ? "border-maroon bg-blush/60" : on ? "border-red/60 line-through" : "border-border opacity-60") : on ? "border-maroon bg-blush/60" : "border-border hover:border-maroon/50";
                  return (
                    <button key={j} type="button" aria-pressed={on} disabled={done}
                      onClick={() => setPicked((s) => ({ ...s, [i]: on ? sel.filter((x) => x !== j) : [...sel, j] }))}
                      className={`rounded-full border px-3 py-1 text-xs ${tone}`}>{p}</button>
                  );
                })}
              </div>
              {done ? (
                <p className="mt-2 border-l-2 border-maroon/60 pl-3 text-sm">{c.note}</p>
              ) : (
                <button type="button" disabled={!sel.length} onClick={() => setChecked((s) => ({ ...s, [i]: true }))} className="mt-2 rounded-md border border-maroon px-3 py-1 text-xs font-semibold text-maroon disabled:opacity-40">Check</button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Module 6 ---------- */

function PitfallTable() {
  const [open, setOpen] = useState(0);
  return (
    <div>
      <h2 className="font-display text-lg font-semibold text-maroon">Where deals go wrong</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Select a lifecycle phase. This complements the <Link to="/deal-lifecycle" className="text-maroon hover:underline">lifecycle</Link> rather than reteaching it. <T k="LD1" />, <T k="cutover" /> and <T k="hypercare" /> are explained on tap.
      </p>
      <div className="mt-3 flex flex-wrap gap-1" role="tablist">
        {PHASES.map((p, i) => (
          <button key={p.phase} role="tab" aria-selected={open === i} type="button" onClick={() => setOpen(i)}
            className={`rounded border px-2 py-1 text-xs ${open === i ? "border-maroon bg-maroon text-primary-foreground" : "border-border hover:border-maroon/50"}`}>
            {i + 1}. {p.phase}
          </button>
        ))}
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-maroon text-xs uppercase tracking-[0.08em] text-maroon">
              <th className="py-2 pr-3">Lifecycle phase</th><th className="py-2 pr-3">Common pitfall</th><th className="py-2 pr-3">Early warning sign</th><th className="py-2">Preventative action</th>
            </tr>
          </thead>
          <tbody>
            <tr key={open} className="align-top">
              <td className="py-2 pr-3 font-semibold">{PHASES[open]!.phase}</td>
              <td className="py-2 pr-3">{PHASES[open]!.pitfall}</td>
              <td className="py-2 pr-3">{PHASES[open]!.warning}</td>
              <td className="py-2">{PHASES[open]!.action}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Cautionary() {
  return (
    <div>
      <h2 className="font-display text-lg font-semibold text-maroon">Cautionary examples</h2>
      <div className="mt-3 space-y-4">
        {CAUTIONARY.map((c) => (
          <div key={c.name} className="border-l-2 border-red pl-3">
            <p className="text-sm font-semibold">{c.name}</p>
            <p className="mt-1 text-sm">{c.body}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm">See also <T k="operational resilience" /> and <T k="regulatory approval" />.</p>
    </div>
  );
}

function Heatmap() {
  const [ans, setAns] = useState<Record<number, number>>({});
  const hits = PHASES.map((_, i) => HEATMAP.filter((h, k) => ans[k] === i).length);
  return (
    <div>
      <h2 className="font-display text-lg font-semibold text-maroon">Lifecycle heatmap</h2>
      <p className="mt-1 text-sm text-muted-foreground">For each warning sign, pick the phase where it should first be addressed. The strip shows where your answers land.</p>
      <div className="mt-3 grid grid-cols-5 gap-1 sm:grid-cols-10" aria-hidden>
        {PHASES.map((p, i) => (
          <div key={p.phase} title={p.phase} className={`h-8 rounded text-center text-[0.625rem] leading-8 ${hits[i] ? "bg-maroon text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{i + 1}</div>
        ))}
      </div>
      <div className="mt-4 space-y-5">
        {HEATMAP.map((h, k) => {
          const a = ans[k];
          return (
            <div key={k}>
              <p className="text-sm font-medium">{h.sign}</p>
              <select aria-label="Lifecycle phase" value={a ?? ""} onChange={(e) => setAns((s) => ({ ...s, [k]: Number(e.target.value) }))}
                className="mt-1.5 w-full rounded-md border border-input bg-background px-2 py-1.5 text-sm">
                <option value="" disabled>Choose a phase</option>
                {PHASES.map((p, i) => <option key={p.phase} value={i}>{i + 1}. {p.phase}</option>)}
              </select>
              {a !== undefined ? (
                <p key={a} className="mt-1.5 border-l-2 border-maroon/60 pl-3 text-sm">
                  <span className="font-semibold">{a === h.correct ? "Good call. " : `Earlier is better: ${PHASES[h.correct]!.phase}. `}</span>{h.why}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Module 7 ---------- */

function ClosingFacts() {
  return (
    <div>
      <ScenarioBrief />
      <h2 className="mt-5 font-display text-lg font-semibold text-maroon">New information, weeks before LD1</h2>
      <ul className="mt-2 space-y-1.5 text-sm">
        {NEW_FACTS.map((f) => <li key={f} className="border-l-2 border-red pl-3">{f}</li>)}
      </ul>
    </div>
  );
}

function ClosingDecisions() {
  const { progress, update } = useFoundationsProgress();
  const ans = progress.closing ?? {};
  return (
    <div>
      <h2 className="font-display text-lg font-semibold text-maroon">Make three decisions</h2>
      <p className="mt-1 text-sm text-muted-foreground">Every option is plausible. Each involves a trade-off.</p>
      <div className="mt-4 space-y-6">
        {CLOSING.map((q, i) => (
          <div key={i}>
            <p className="text-sm font-medium">{i + 1}. {q.prompt}</p>
            <div className="mt-2 space-y-1.5">
              {q.options.map((o, j) => {
                const sel = ans[i] === j;
                return (
                  <button key={j} type="button" aria-pressed={sel} onClick={() => update((p) => ({ ...p, closing: { ...(p.closing ?? {}), [i]: j } }))}
                    className={`flex w-full items-start gap-2 rounded-md border px-3 py-2 text-left text-sm ${sel ? "border-maroon bg-blush/50" : "border-border hover:border-maroon/50"}`}>
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-maroon/40 text-[0.625rem] font-semibold text-maroon">{String.fromCharCode(65 + j)}</span>
                    <span>{o}</span>
                  </button>
                );
              })}
            </div>
            {ans[i] !== undefined ? <p key={ans[i]} className="mt-2 border-l-2 border-maroon/60 pl-3 text-sm">{q.feedback[ans[i]]}</p> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function Compare() {
  const { progress } = useFoundationsProgress();
  const opening = progress.opening ?? [];
  const answered = Object.keys(progress.closing ?? {}).length === CLOSING.length;
  if (!answered) return <p className="text-sm">Answer all three decisions first.</p>;
  const label = (id: string) => OPENING_QUESTIONS.find((q) => q.id === id)?.label.split(":")[0] ?? id;
  const strong = CLOSING.filter((q, i) => progress.closing![i] === q.correct).length;
  const missed = Object.keys(CLOSING_LINKS).filter((id) => !opening.includes(id));
  return (
    <div>
      <h2 className="font-display text-lg font-semibold text-maroon">How your judgement developed</h2>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">Your opening priorities</p>
          <ol className="mt-1.5 list-decimal space-y-1 pl-5 text-sm">
            {opening.map((id) => (
              <li key={id}>{label(id)}{CLOSING_LINKS[id] ? <span className="block text-xs text-maroon">Now tested: {CLOSING_LINKS[id]}</span> : null}</li>
            ))}
          </ol>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">Your closing decisions</p>
          <p className="mt-1.5 text-sm">{strong} of 3 matched the strongest trade-off.</p>
          {missed.length ? (
            <p className="mt-2 text-sm">Issues that surfaced but were not in your opening top {RANK_LIMIT}: {missed.map(label).join(", ")}.</p>
          ) : (
            <p className="mt-2 text-sm">Your opening priorities anticipated every issue that surfaced.</p>
          )}
        </div>
      </div>
      <p className="mt-5 text-sm">
        The savings case still matters. But value depends on customers staying, controls working and services running. Protecting them is how value is achieved, not a cost set against it.
      </p>
    </div>
  );
}
