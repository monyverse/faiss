import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, ChevronRight } from "lucide-react";
import { splitPoint, type Lens } from "@/lib/vision-content";

export function PointList({ points }: { points: string[] }) {
  return (
    <ul className="mt-3 space-y-3">
      {points.map((point) => {
        const { title, body } = splitPoint(point);
        return (
          <li key={point} className="flex gap-2 text-sm leading-relaxed text-foreground">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-maroon" />
            <span>
              {title ? <span className="block font-display text-sm font-semibold text-maroon">{title}</span> : null}
              {body}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export function Disclosure({ label, children, defaultOpen = false }: { label: string; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-border bg-card">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="text-sm font-semibold text-maroon">{label}</span>
        {open ? <ChevronDown className="h-4 w-4 text-maroon" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
      </button>
      {open ? <div className="border-t border-border px-4 py-4">{children}</div> : null}
    </div>
  );
}

function LensVisual({ visual }: { visual: NonNullable<Lens["visual"]> }) {
  return (
    <div className="mt-6 rounded-xl border border-border bg-surface/60 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-maroon">{visual.label}</p>
      {visual.numbered ? (
        <ol className="mt-4 flex flex-wrap items-stretch gap-x-1 gap-y-3">
          {visual.items.map((item, i) => (
            <li key={item} className="flex items-stretch">
              <div className={`flex w-[7.5rem] flex-col gap-2 rounded-lg border px-3 py-3 ${i < 2 ? "border-amber/40 bg-amber/10" : "border-maroon/25 bg-blush"}`}>
                <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[0.5625rem] font-bold ${i < 2 ? "bg-amber/25 text-foreground/80" : "bg-maroon text-maroon-foreground"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.6875rem] font-semibold leading-[1.3] text-foreground">{item}</span>
              </div>
              {i < visual.items.length - 1 ? <ChevronRight className="my-auto h-3.5 w-3.5 shrink-0 text-maroon/35" /> : null}
            </li>
          ))}
        </ol>
      ) : (
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {visual.items.map((item, i) => (
            <div key={item} className={`flex items-center gap-3 rounded-lg border px-4 py-3 ${i > 2 ? "border-amber/40 bg-amber/10" : "border-maroon/25 bg-blush"}`}>
              <span className={`h-6 w-1 shrink-0 rounded-full ${i > 2 ? "bg-amber" : "bg-maroon"}`} />
              <span className="text-xs font-semibold leading-snug text-foreground">{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function LensPrinciples({ lens }: { lens: Lens }) {
  return (
    <article id={`principles-${lens.id}`} className="scroll-mt-24 rounded-xl border border-border bg-card p-5 lg:p-6">
      <p className="label-eyebrow">{lens.label}</p>
      <h3 className="mt-2 font-display text-xl font-semibold text-maroon">{lens.heading}</h3>
      <p className="mt-2 text-sm italic leading-relaxed text-muted-foreground">{lens.question}</p>
      <div className="mt-4 border-l-2 border-maroon/30 pl-4">
        {lens.subHeading.title ? <h4 className="font-display text-base font-semibold text-maroon">{lens.subHeading.title}</h4> : null}
        <p className="mt-1 text-sm leading-relaxed text-foreground">{lens.subHeading.text}</p>
      </div>
      <ul className="mt-4 space-y-3">
        {lens.points.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground">
            <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-maroon/60" />
            {item}
          </li>
        ))}
      </ul>

      {lens.principle ? (
        <div className="mt-6 rounded-lg border border-maroon/25 bg-blush p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-maroon">{lens.principle.label}</p>
          <p className="mt-2 font-display text-lg font-semibold text-maroon">{lens.principle.title}</p>
          <PointList points={lens.principle.points} />
          <Link
            to="/deal-governance"
            className="group mt-5 flex items-center justify-between gap-4 rounded-lg border border-maroon bg-maroon px-4 py-3 text-maroon-foreground transition-colors hover:bg-maroon/90"
          >
            <span className="font-display text-sm font-semibold">What typically changes as part of Deal Governance?</span>
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      ) : null}

      {lens.principle ? (
        <Disclosure label="How are these principles applied?">
          <p className="text-sm leading-relaxed text-foreground">By applying these principles to the operating model, it means that:</p>
          <PointList
            points={[
              "The Central Hub holds repeatable M&A capabilities\nThe Central Hub acts as the Centre of Excellence for capabilities common to all transactions, providing education, oversight, steer, and support",
              "The Spokes are specialists\nThe Regional and Functional Spokes are a different kind of CoE: they hold specific functional skills which must be applied in a different way to each transaction, with the support of the Central Hub",
            ]}
          />
        </Disclosure>
      ) : null}

      <Disclosure label="What is included?">
        <ul className="space-y-2">
          {lens.included.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-maroon/60" />
              {item}
            </li>
          ))}
        </ul>
      </Disclosure>

      {lens.visual ? <LensVisual visual={lens.visual} /> : null}

      <Link
        to={lens.link.to as never}
        search={(lens.link.to === "/operating-model" ? { archetype: "balance-sheet-acquisition" } : undefined) as never}
        className="mt-6 inline-flex items-center gap-1.5 rounded-lg border border-maroon/30 px-4 py-2 text-sm font-semibold text-maroon transition hover:bg-blush"
      >
        {lens.link.label}
        <ChevronRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
