import { useState } from "react";
import { RelatedGuidance } from "@/components/Wayfinding";
import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, ChevronDown, UserRound } from "lucide-react";
import { BrandHeader } from "@/components/BrandHeader";
import { PageToolbar } from "@/components/PageToolbar";
import { SUCCESS_FACTORS } from "@/lib/success-factors";

const TITLE = "Key Success Factors for the Operating Model | Absa M&A Capability Hub";
const DESCRIPTION =
  "The seven conditions that need to be in place for the Absa M&A operating model to work effectively in practice, with what must be true, the impact if absent and the key decision maker.";

export const Route = createFileRoute("/operating-model/success-factors")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SuccessFactorsPage,
});

function SuccessFactorsPage() {
  const [openId, setOpenId] = useState<string | null>(SUCCESS_FACTORS[0]?.id ?? null);

  return (
    <div className="min-h-screen bg-background">
      <BrandHeader />
      <PageToolbar
        crumbs={[
          {
            label: "Operating Model",
            to: "/operating-model",
            search: { archetype: "balance-sheet-acquisition" },
          },
          { label: "Key Success Factors" },
        ]}
        back={{
          label: "Back to operating model",
          to: "/operating-model",
          search: { archetype: "balance-sheet-acquisition" },
        }}
      />
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <p className="label-eyebrow mt-6">Operating model</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-maroon">
          Key Success Factors for the Operating Model
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
          The conditions that need to be in place for the proposed M&amp;A operating model to work
          effectively in practice. Select any factor to see what must be true, the impact if it is
          absent and who decides.
        </p>

        <div className="mt-10 space-y-3">
          {SUCCESS_FACTORS.map((factor) => {
            const open = openId === factor.id;
            return (
              <div
                key={factor.id}
                className={`overflow-hidden rounded-xl border bg-card shadow-panel transition-colors ${
                  open ? "border-maroon/45" : "border-border"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : factor.id)}
                  className="flex w-full items-start gap-4 px-4 py-4 text-left transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-6"
                >
                  <span
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border text-sm font-semibold ${
                      open
                        ? "border-maroon bg-maroon text-maroon-foreground"
                        : "border-maroon/25 bg-blush text-maroon"
                    }`}
                  >
                    {factor.number}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-base font-semibold leading-snug text-maroon">
                      {factor.title}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                      {factor.summary}
                    </span>
                    <span className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2 py-1 text-[0.6875rem] font-medium text-foreground/80">
                      <UserRound className="h-3 w-3 text-maroon/70" />
                      Key decision maker: {factor.decisionMaker}
                    </span>
                  </span>

                  <ChevronDown
                    className={`mt-1 h-4 w-4 shrink-0 text-maroon/60 transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {open && (
                  <div className="step-fade grid gap-4 border-t border-border px-4 py-5 sm:px-6 lg:grid-cols-2">
                    <section className="rounded-lg border border-maroon/20 bg-blush/60 p-4">
                      <p className="flex items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-maroon">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        What needs to be true
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {factor.description.map((item) => (
                          <li
                            key={item}
                            className="flex gap-2 text-sm leading-relaxed text-foreground/90"
                          >
                            <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-maroon/50" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section className="rounded-lg border border-l-[3px] border-destructive/25 border-l-destructive bg-surface p-4">
                      <p className="flex items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-destructive">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        Impact if absent
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {factor.impact.map((item) => (
                          <li
                            key={item}
                            className="flex gap-2 text-sm leading-relaxed text-foreground/90"
                          >
                            <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-destructive/60" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <RelatedGuidance links={[{ label: "Operating Model", to: "/operating-model", search: { archetype: "balance-sheet-acquisition" } }, { label: "Central Hub", to: "/operating-model/central-hub" }, { label: "Governance and transaction roles", to: "/operating-model/governance" }, { label: "Mobilisation Roadmap", to: "/mobilisation" }]} />
      </main>
    </div>
  );
}
