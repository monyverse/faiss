import { createFileRoute } from "@tanstack/react-router";
import { RelatedGuidance } from "@/components/Wayfinding";
import { BrandHeader } from "@/components/BrandHeader";
import { PageToolbar } from "@/components/PageToolbar";
import { HUB_RACI_COLUMNS, HUB_RACI_FULL_ROWS } from "@/lib/central-hub-mandate";

const DESCRIPTION =
  "Activity-level RACI across the Central Hub, SA Functional Spoke, in-country Regional Spoke, executive governance and the seller or buyer counterparty for every transaction activity.";

export const Route = createFileRoute("/operating-model/raci")({
  head: () => ({
    meta: [
      { title: "Transaction RACI | Absa M&A Operating Model" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Transaction RACI | Absa M&A Operating Model" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RaciPage,
});

function RaciPage() {
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
          { label: "RACI" },
        ]}
        back={{
          label: "Back to operating model",
          to: "/operating-model",
          search: { archetype: "balance-sheet-acquisition" },
        }}
      />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <p className="label-eyebrow mt-6">RACI</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-maroon">
          Activity-level RACI
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
          {DESCRIPTION}
        </p>

        {/* Desktop table */}
        <div className="mt-8 hidden overflow-hidden rounded-xl border border-border bg-card lg:block">
          <div className="max-h-[44rem] overflow-auto">
            <table className="w-full min-w-[68rem] text-left text-sm">
              <thead className="sticky top-0 z-10 bg-surface text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground shadow-panel">
                <tr>
                  {HUB_RACI_COLUMNS.map((col) => (
                    <th key={col} className="px-4 py-3 font-semibold">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {HUB_RACI_FULL_ROWS.map((row) => (
                  <tr key={row.activity} className="border-t border-border align-top">
                    <td className="px-4 py-3 font-medium text-foreground">{row.activity}</td>
                    <td className="px-4 py-3 leading-relaxed text-maroon">{row.centralHub}</td>
                    <td className="px-4 py-3 leading-relaxed text-muted-foreground">
                      {row.functionAuthority}
                    </td>
                    <td className="px-4 py-3 leading-relaxed text-muted-foreground">
                      {row.regionalSpoke}
                    </td>
                    <td className="px-4 py-3 leading-relaxed text-muted-foreground">
                      {row.executiveGovernance}
                    </td>
                    <td className="px-4 py-3 leading-relaxed text-muted-foreground">
                      {row.counterparty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile stacked records */}
        <ul className="mt-8 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card lg:hidden">
          {HUB_RACI_FULL_ROWS.map((row) => (
            <li key={row.activity} className="px-5 py-4">
              <p className="font-display text-sm font-semibold text-maroon">{row.activity}</p>
              <dl className="mt-2 space-y-2">
                {(
                  [
                    ["Central Hub", row.centralHub],
                    ["SA Functional Spoke", row.functionAuthority],
                    ["In-country Regional Spoke", row.regionalSpoke],
                    ["Executive governance", row.executiveGovernance],
                    ["Seller / buyer counterparty", row.counterparty],
                  ] as const
                ).map(([label, value]) => (
                  <div key={label}>
                    <dt className="label-eyebrow">{label}</dt>
                    <dd className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
        <RelatedGuidance links={[{ label: "Operating Model", to: "/operating-model", search: { archetype: "balance-sheet-acquisition" } }, { label: "Central Hub", to: "/operating-model/central-hub" }, { label: "Governance and transaction roles", to: "/operating-model/governance" }, { label: "Mobilisation Roadmap", to: "/mobilisation" }]} />
      </main>
    </div>
  );
}
