const LEAKAGE = [
  "Customer attrition or lower customer activity",
  "Disruption to sales and service",
  "Delayed or missed revenue benefits",
  "Delayed cost savings",
  "Higher integration and remediation costs",
  "Technology or data problems",
  "Control, regulatory or operational failures",
  "Slow decisions and unresolved dependencies",
  "Loss of critical employees or capability",
  "Extended transitional arrangements and stranded costs",
  "Poor handover into business-as-usual ownership",
];

const SHAKEOUT = { src: "McKinsey & Company, Bank mergers in the US: A shakeout ahead?", url: "https://www.mckinsey.com.br/industries/financial-services/our-insights/us-midcap-banking-the-shakeout-ahead" };

const FINDINGS = [
  { stat: "17 of 58", text: "In a McKinsey analysis of 58 US mid-cap bank mergers with a full two-year performance history, only 17 merged institutions, or fewer than one in three, outperformed their peers.", ...SHAKEOUT },
  { stat: "7% below", text: "Across those two-year integration periods, the merged institutions' share performance was, on average, 7% below that of their peers.", ...SHAKEOUT },
  { stat: "Almost 70%", text: "In a separate McKinsey database of 160 mergers across sectors, almost 70% failed to achieve the expected revenue synergies.", src: "McKinsey & Company, Where mergers go wrong", url: "https://www.mckinsey.com/capabilities/strategy-and-corporate-finance/our-insights/where-mergers-go-wrong" },
];

const NEXT_PATHWAY = [
  "which parts of execution you influence;",
  "what you are accountable for;",
  "where your role is most important;",
  "what evidence and decisions you must provide;",
  "what warning signs you should identify; and",
  "how you should escalate issues before value is lost.",
];

/** Final Foundations screen: the execution gap and why every role matters. */
export function ExecutionGap() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-lg font-semibold text-maroon">Execution determines how much value is realised</h2>
        <blockquote className="mt-3 border-l-2 border-maroon bg-blush/60 px-4 py-3 text-sm font-medium">
          A deal model contains expected value. That value is only realised when people across the transaction execute their responsibilities well.
        </blockquote>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">Research findings</p>
        <div className="mt-2 grid gap-3 sm:grid-cols-3">
          {FINDINGS.map((f) => (
            <div key={f.stat} className="rounded-md border border-border p-3">
              <p className="font-display text-2xl font-semibold text-maroon">{f.stat}</p>
              <p className="mt-1 text-xs leading-snug">{f.text}</p>
              <a href={f.url} target="_blank" rel="noreferrer" className="mt-2 block text-[0.6875rem] text-muted-foreground hover:text-maroon hover:underline">Source: {f.src}</a>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          These findings do not mean a fixed share of all M&amp;A deals fail. Studies define success in different ways, and market performance can be affected by factors beyond integration. They do show that the execution challenge is frequent and financially material.
        </p>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">Where value is lost</p>
        <div className="mt-2 grid items-stretch gap-2 sm:grid-cols-[1fr_auto_2fr_auto_1fr]">
          <div className="flex items-center justify-center rounded-md bg-maroon p-3 text-center text-sm font-semibold text-primary-foreground">Expected deal value</div>
          <span className="self-center text-center text-maroon" aria-hidden>→</span>
          <div className="rounded-md border border-red/40 bg-background p-3">
            <p className="text-xs font-semibold text-red">Execution risks and value leakage</p>
            <ul className="mt-1.5 list-disc space-y-0.5 pl-4 text-xs">
              {LEAKAGE.map((l) => <li key={l}>{l}</li>)}
            </ul>
          </div>
          <span className="self-center text-center text-maroon" aria-hidden>→</span>
          <div className="flex items-center justify-center rounded-md border-2 border-maroon p-3 text-center text-sm font-semibold text-maroon">Realised value</div>
        </div>
      </div>

      <div>
        <h3 className="font-display text-base font-semibold text-maroon">Why your role matters</h3>
        <blockquote className="mt-2 border-l-2 border-maroon bg-blush/60 px-4 py-3 text-sm">
          M&amp;A value is not protected by the deal team alone. It is protected through thousands of decisions, deliverables, controls, escalations and customer interactions across the programme. Every role can either prevent value leakage or allow it to grow.
        </blockquote>
        <p className="mt-3 text-sm">Your role pathway comes next. It will show you:</p>
        <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm">
          {NEXT_PATHWAY.map((n) => <li key={n}>{n}</li>)}
        </ul>
      </div>
    </div>
  );
}
