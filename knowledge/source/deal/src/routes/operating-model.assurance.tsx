import { createFileRoute, Link } from "@tanstack/react-router";
import { SpokeWorkstreamPage } from "@/components/SpokeWorkstreamPage";
import { CONTENT as RISK } from "@/lib/risk-spoke";
import { CONTENT as INTERNAL_AUDIT } from "@/lib/internal-audit-spoke";
import { CONTENT as INDEPENDENT_ASSURANCE } from "@/lib/independent-assurance-spoke";

const TABS = [
  { id: "risk", label: "Risk", content: RISK },
  { id: "internal-audit", label: "Internal Audit", content: INTERNAL_AUDIT },
  {
    id: "independent-assurance",
    label: "Independent Assurance",
    content: INDEPENDENT_ASSURANCE,
  },
] as const;

type TabId = (typeof TABS)[number]["id"];
type Search = { tab: TabId };

const TITLE = "Assurance: Risk, Internal Audit, Independent Assurance | Absa M&A Capability Hub";
const DESCRIPTION =
  "Assurance workstreams for Absa transactions: Risk, Internal Audit and Independent Assurance, with responsibilities, mandate, milestones and partner acceleration.";

export const Route = createFileRoute("/operating-model/assurance")({
  validateSearch: (search: Record<string, unknown>): Search => {
    const raw = search["tab"];
    return { tab: TABS.some((t) => t.id === raw) ? (raw as TabId) : "risk" };
  },
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
  component: AssurancePage,
});

function AssurancePage() {
  const { tab } = Route.useSearch();
  const active = TABS.find((t) => t.id === tab) ?? TABS[0];

  const tabs = (
    <div className="mb-8">
      <p className="label-eyebrow">Assurance (Risk, Internal Audit, Independent Assurance)</p>
      <div role="tablist" className="mt-3 flex flex-wrap gap-2 border-b border-border pb-3">
        {TABS.map((t) => {
          const selected = t.id === active.id;
          return (
            <Link
              key={t.id}
              to="/operating-model/assurance"
              search={{ tab: t.id }}
              role="tab"
              aria-selected={selected}
              className={`rounded-md border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                selected
                  ? "border-maroon bg-maroon text-maroon-foreground"
                  : "border-maroon/25 bg-blush text-maroon hover:border-maroon/45"
              }`}
            >
              {t.label}
            </Link>
          );
        })}
      </div>
    </div>
  );

  return <SpokeWorkstreamPage key={active.id} content={active.content} topSlot={tabs} />;
}
