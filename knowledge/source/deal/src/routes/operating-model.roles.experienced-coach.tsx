import { createFileRoute } from "@tanstack/react-router";
import { BrandHeader } from "@/components/BrandHeader";
import { PageToolbar } from "@/components/PageToolbar";
import { RelatedGuidance } from "@/components/Wayfinding";
import {
  COACH_BOUNDARY,
  COACH_EXPERIENCE,
  COACH_EXPERIENCE_NOTE,
  COACH_INVOLVEMENT,
  COACH_INVOLVEMENT_INTRO,
  COACH_LEVELS,
  COACH_MANDATE,
  COACH_NOT_BY_DEFAULT,
  COACH_PURPOSE,
  COACH_RESPONSIBILITIES,
  COACH_SUCCESS,
  COACH_SUMMARY,
  COACH_WHEN_TO_INVOLVE,
} from "@/lib/experienced-coach";

const TITLE = "Experienced Coach | Absa M&A Operating Model";
const DESC =
  "An advisory role outside the governance structure that transfers practical M&A experience to people across the transaction without taking over their accountability.";

export const Route = createFileRoute("/operating-model/roles/experienced-coach")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CoachPage,
});

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm leading-relaxed text-foreground">
          <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-maroon/60" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Card({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-panel">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
      {children}
    </div>
  );
}

const TONE = {
  may: "border-maroon/25 bg-blush",
  must: "border-border bg-card shadow-panel",
  not: "border-dashed border-maroon/40 bg-surface",
} as const;

function CoachPage() {
  return (
    <div className="min-h-screen bg-background">
      <BrandHeader />
      <PageToolbar
        crumbs={[
          { label: "Operating Model", to: "/operating-model", search: { archetype: "balance-sheet-acquisition" } },
          { label: "Governance", to: "/operating-model/governance" },
          { label: "Experienced Coach" },
        ]}
        back={{ label: "Back to governance", to: "/operating-model/governance" }}
      />
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <p className="label-eyebrow mt-6">Advisory role · outside the governance structure</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-maroon">
          Experienced Coach
        </h1>

        <blockquote className="mt-8 rounded-xl border-l-4 border-maroon bg-blush p-5 text-sm leading-relaxed text-foreground">
          {COACH_BOUNDARY}
        </blockquote>

        <section className="mt-10">
          <h2 className="font-display text-xl font-semibold text-maroon">Role summary</h2>
          <div className="mt-4 overflow-hidden rounded-xl border border-border bg-card">
            <dl>
              {COACH_SUMMARY.slice(1).map((row) => (
                <div key={row.field} className="grid gap-1 border-t border-border px-4 py-3 first:border-t-0 sm:grid-cols-[12rem_1fr] sm:gap-4">
                  <dt className="text-sm font-semibold text-maroon">{row.field}</dt>
                  <dd className="text-sm leading-relaxed text-foreground">{row.content}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="mt-10 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <Card label="Purpose">
            {COACH_PURPOSE.map((p) => (
              <p key={p} className="mt-3 text-sm leading-relaxed text-foreground">{p}</p>
            ))}
          </Card>
          <Card label="Who the Coach may support">
            <p className="mt-3 text-sm leading-relaxed text-foreground">
              The role may support individuals or small cohorts at several levels, including:
            </p>
            <ol className="mt-3 space-y-2">
              {COACH_LEVELS.map((l, i) => (
                <li key={l} className="flex items-center gap-3 text-sm text-foreground">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-maroon text-[0.6875rem] font-semibold text-maroon-foreground">
                    {i + 1}
                  </span>
                  <span>{l}</span>
                </li>
              ))}
            </ol>
          </Card>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-xl font-semibold text-maroon">Core responsibilities</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {COACH_RESPONSIBILITIES.map((r) => (
              <Card key={r.title} label={r.title}>
                <Bullets items={r.items} />
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-xl font-semibold text-maroon">Coaching mandate</h2>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {COACH_MANDATE.map((m) => (
              <div key={m.title} className={`rounded-xl border p-5 ${TONE[m.tone]}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-maroon">{m.title}</p>
                <Bullets items={m.items} />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-xl font-semibold text-maroon">Involvement across delivery</h2>
          {COACH_INVOLVEMENT_INTRO.map((p) => (
            <p key={p} className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{p}</p>
          ))}
          <div className="mt-5 space-y-3">
            {COACH_INVOLVEMENT.map((row) => (
              <div key={row.period} className="rounded-xl border border-border bg-card p-4 shadow-panel">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-display text-base font-semibold text-maroon">{row.period}</p>
                  <span className="flex items-center gap-2">
                    <span className="flex gap-1" aria-hidden>
                      {[1, 2, 3].map((n) => (
                        <span key={n} className={`h-2 w-6 rounded-full ${n <= row.level ? "bg-maroon" : "bg-maroon/15"}`} />
                      ))}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                      {row.involvement}
                    </span>
                  </span>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <p className="text-sm leading-relaxed text-foreground">
                    <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Appropriate Coach contribution</span>
                    {row.contribution}
                  </p>
                  <p className="text-sm leading-relaxed text-foreground">
                    <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Why</span>
                    {row.why}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Card label="When to involve the Coach">
              <p className="mt-3 text-sm text-foreground">Bring the Coach in when the coachee can point to a specific item, for example:</p>
              <Bullets items={COACH_WHEN_TO_INVOLVE} />
            </Card>
            <div className="rounded-xl border border-dashed border-maroon/40 bg-surface p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-maroon">Not by default</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground">{COACH_NOT_BY_DEFAULT}</p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-xl font-semibold text-maroon">Success measures</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {COACH_SUCCESS.map((s) => (
              <div key={s.title} className="rounded-xl border border-border bg-card p-4 shadow-panel">
                <p className="text-sm font-semibold text-maroon">{s.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <Card label="Experience profile">
            <p className="mt-3 text-sm text-foreground">An Experienced Coach should demonstrate:</p>
            <Bullets items={COACH_EXPERIENCE} />
            <p className="mt-4 text-sm font-medium leading-relaxed text-maroon">{COACH_EXPERIENCE_NOTE}</p>
          </Card>
        </section>

        <RelatedGuidance links={[{ label: "Governance and transaction roles", to: "/operating-model/governance" }, { label: "Training & learning pathways", to: "/learning" }, { label: "Central Hub", to: "/operating-model/central-hub" }]} />
      </main>
    </div>
  );
}
