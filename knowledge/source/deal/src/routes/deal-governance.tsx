import { useState } from "react";
import { RelatedGuidance } from "@/components/Wayfinding";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ChevronDown } from "lucide-react";
import { BrandHeader } from "@/components/BrandHeader";
import { PageToolbar } from "@/components/PageToolbar";

export const Route = createFileRoute("/deal-governance")({
  head: () => ({
    meta: [
      { title: "What changes as part of Deal Governance? | Absa M&A Capability Hub" },
      {
        name: "description",
        content:
          "The BAU processes that change for a transaction, what changes and why it must change.",
      },
      { property: "og:title", content: "What changes as part of Deal Governance?" },
      {
        property: "og:description",
        content: "How BAU processes adapt for a transaction, and why they must change.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DealGovernancePage,
});

type Item = { process: string; change: string; why: string };
type Group = { theme: string; items: Item[] };

const GROUPS: Group[] = [
  {
    theme: "Money and people",
    items: [
      { process: "Budget approval", change: "Approve an initial transaction budget and contingency centrally. Delegate spend decisions within defined thresholds to the Accountable Executive or Transaction Director instead of returning to normal budgeting forums. Retain Finance reporting and retrospective governance.", why: "Deals require rapid mobilisation before requirements and costs are fully known. Waiting for standard budget cycles can delay diligence, signing, regulatory commitments or LD1 readiness." },
      { process: "Resource prioritisation", change: "Give the transaction authority to secure named functional resources and resolve conflicts with BAU priorities. Escalate unresolved constraints directly to accountable functional executives.", why: "Workstreams need scarce SMEs at the same time. Normal resource allocation often optimises within functions rather than for the transaction's critical path." },
      { process: "Headcount approval", change: "Establish expedited approval for temporary hires, secondments and fixed-term resources within the transaction budget.", why: "Programme capacity must often be added faster than permanent workforce-planning cycles allow." },
      { process: "Employee onboarding", change: "Introduce a priority onboarding route for programme employees and contractors, with parallel rather than sequential checks where permitted. Mandatory screening remains unchanged.", why: "Delays in onboarding directly reduce the time available for design, testing, migration and readiness." },
      { process: "Performance objectives", change: "Reflect transaction responsibilities in individual objectives and give programme commitments explicit priority against BAU deliverables.", why: "Resources will continue to prioritise BAU obligations unless transaction accountability is formally recognised." },
    ],
  },
  {
    theme: "Suppliers, access and data",
    items: [
      { process: "Contractor and adviser mobilisation", change: "Use pre-approved panels, standard transaction terms and accelerated statements of work. Allow mobilisation at risk only under explicitly approved, limited conditions.", why: "Legal, tax, technology, separation and integration expertise is often needed immediately and for a finite period." },
      { process: "Supplier onboarding", change: "Prioritise vendor due diligence, system registration, banking validation and purchase-order creation. Run checks concurrently where possible.", why: "Even after selection, BAU supplier onboarding can prevent critical vendors from beginning work or being paid." },
      { process: "Access provisioning", change: "Establish a priority route for systems, premises, data-room and collaboration-tool access. Bundle access requests by role and pre-approve standard profiles.", why: "New teams cannot contribute effectively while waiting through normal individual access-request queues." },
      { process: "Data sharing", change: "Introduce an expedited approval route for sharing data between seller, buyer, advisers and countries, using approved transfer mechanisms and minimum-necessary datasets.", why: "Diligence, planning, testing and migration depend on information moving across organisational and jurisdictional boundaries." },
    ],
  },
  {
    theme: "Decisions, risk and escalation",
    items: [
      { process: "Policy exceptions", change: "Create a single, controlled exception process with a named owner, risk assessment, compensating controls, approval level and expiry date.", why: "Multiple BAU exception routes are too slow and can produce inconsistent decisions across workstreams." },
      { process: "Functional decisions", change: "Delegate operational decisions to Regional Spokes where they have the maturity, capability and capacity. Central functions decide or support where those conditions are not met.", why: "Decisions need to be made close to execution without allowing capability gaps to create uncontrolled risk or delay." },
      { process: "Risk acceptance", change: "Establish transaction-specific risk thresholds and delegated acceptance levels. Escalate material residual risks directly through programme governance.", why: "Some risks cannot be eliminated before LD1; they must be explicitly assessed, owned and accepted within the transaction timetable." },
      { process: "Legal escalation", change: "Route material legal interpretations, contractual constraints and unresolved liabilities directly to the Legal and CorpDev authority and transaction governance.", why: "Standard escalation chains can be too slow where a legal issue affects signing, completion, perimeter or execution strategy." },
      { process: "Issue and dependency escalation", change: "Introduce shorter escalation thresholds based on impact to signing, completion, LD1, customers, regulation, cost or reputation.", why: "An issue that would be tolerable in BAU can become material when only days remain before a contractual milestone." },
    ],
  },
  {
    theme: "Technology, testing and change",
    items: [
      { process: "Technology architecture approval", change: "Introduce dedicated architecture forums with shortened turnaround times, predefined principles and authority to approve temporary transition states.", why: "A transaction may require interim architecture, duplicated services or TSAs that would not be accepted as a normal long-term design." },
      { process: "Technology change and release", change: "Reserve transaction release windows and create an expedited release path while retaining testing, rollback, segregation-of-duties and cyber controls.", why: "BAU release calendars may not align with legally fixed completion, migration and LD1 dates." },
      { process: "Testing governance", change: "Prioritise transaction environments and test data. Permit risk-based test scope only where explicitly approved, with defects and residual risk recorded.", why: "Fixed deadlines compress test cycles, but reducing testing without formal risk decisions can undermine operational readiness." },
      { process: "Operational change approval", change: "Establish a cross-functional transaction change authority that can approve coordinated process changes across products, operations, technology and controls.", why: "BAU change forums tend to consider changes function by function, while transaction outcomes depend on end-to-end readiness." },
      { process: "Business continuity and incident response", change: "Create transaction-specific playbooks, command structures and escalation contacts covering cutover, migration and early-life support.", why: "BAU incident procedures may not address split accountability, TSAs, seller dependencies or newly transferred operations." },
    ],
  },
  {
    theme: "Communications, reporting and assurance",
    items: [
      { process: "Customer and colleague communications", change: "Use accelerated drafting, approval and release processes with pre-agreed approvers, templates and regulatory review points.", why: "Communications may be triggered by signing, regulatory approval, completion or leaks and may require immediate coordinated release." },
      { process: "Management reporting", change: "Replace normal reporting cycles with a single programme cadence, standard status definitions, integrated milestones and exception-based reporting.", why: "Weekly or monthly BAU reporting does not provide enough visibility to manage critical-path dependencies and rapidly emerging risks." },
      { process: "Document approval", change: "Set shortened review windows, concurrent review, version control and deemed escalation where reviewers miss deadlines. Silence should not constitute approval for material matters.", why: "Programme documents often need input from several functions; unmanaged review cycles create critical-path delay." },
      { process: "Assurance and audit", change: "Move from periodic assurance to risk-based, concurrent assurance focused on governance, controls, testing, migration, cutover and evidence.", why: "Identifying control failures after completion is too late; assurance must influence readiness decisions while remediation remains possible." },
    ],
  },
];

const TOTAL = GROUPS.reduce((n, g) => n + g.items.length, 0);

function DealGovernancePage() {
  const [open, setOpen] = useState<string | null>(GROUPS[0]!.items[0]!.process);
  return (
    <div className="min-h-screen bg-background">
      <BrandHeader />
      <PageToolbar
        crumbs={[
          { label: "Vision", to: "/vision" },
          { label: "Deal Governance" },
        ]}
        back={{ label: "Back to Vision", to: "/vision" }}
      />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="label-eyebrow mt-6">Decisions should have a bias for speed</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-maroon">
          What typically changes as part of Deal Governance?
        </h1>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-maroon p-5 text-maroon-foreground shadow-panel">
            <p className="font-display text-4xl font-semibold">{TOTAL}</p>
            <p className="mt-1 text-sm opacity-80">Processes that typically change</p>
          </div>
          <div className="rounded-xl border border-maroon/25 bg-blush p-5">
            <p className="font-display text-4xl font-semibold text-maroon">{GROUPS.length}</p>
            <p className="mt-1 text-sm text-muted-foreground">Themes of change</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="flex items-center gap-2 font-display text-lg font-semibold text-maroon">
              BAU <ArrowRight className="h-4 w-4" /> Transaction
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Faster routes, without weakening the control fabric
            </p>
          </div>
        </div>

        <div className="mt-12 space-y-12">
          {GROUPS.map((group, gi) => (
            <section key={group.theme}>
              <div className="flex items-baseline gap-3 border-b border-maroon/20 pb-2">
                <span className="font-display text-sm font-semibold text-maroon/50">
                  {String(gi + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display text-xl font-semibold text-maroon">{group.theme}</h2>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {group.items.map((item) => {
                  const isOpen = open === item.process;
                  return (
                    <div
                      key={item.process}
                      className={`overflow-hidden rounded-xl border bg-card transition-colors ${
                        isOpen ? "border-maroon/60 shadow-panel md:col-span-2" : "border-border hover:border-maroon/40"
                      }`}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpen(isOpen ? null : item.process)}
                        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                      >
                        <span className="font-display text-base font-semibold text-maroon">
                          {item.process}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 text-maroon transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isOpen && (
                        <div className="grid gap-px bg-border md:grid-cols-2">
                          <div className="bg-blush p-5">
                            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-maroon">
                              What changes for a transaction
                            </p>
                            <p className="mt-2 text-sm leading-relaxed text-foreground">{item.change}</p>
                          </div>
                          <div className="bg-surface p-5">
                            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                              Why it must change
                            </p>
                            <p className="mt-2 text-sm leading-relaxed text-foreground">{item.why}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
        <RelatedGuidance links={[{ label: "Operating Model", to: "/operating-model", search: { archetype: "balance-sheet-acquisition" } }, { label: "Central Hub", to: "/operating-model/central-hub" }, { label: "Governance and transaction roles", to: "/operating-model/governance" }, { label: "Mobilisation Roadmap", to: "/mobilisation" }]} />
      </main>
    </div>
  );
}
