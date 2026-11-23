import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  RACI_ROWS,
  ROLE_SUMMARIES,
  type MandateTone,
} from "@/lib/central-hub";

const TONE_STYLES: Record<MandateTone, string> = {
  owns: "border-maroon bg-maroon text-maroon-foreground",
  coordinates: "border-maroon/25 bg-blush text-maroon",
  approval: "border-amber/40 bg-amber/15 text-foreground",
  executive: "border-foreground/20 bg-foreground text-background",
};

const TONE_LABELS: Record<MandateTone, string> = {
  owns: "Central Hub owns",
  coordinates: "Central Hub coordinates",
  approval: "Functional or local approval required",
  executive: "Executive governance",
};

function ToneBadge({ tone }: { tone: MandateTone }) {
  return (
    <span
      className={`inline-block shrink-0 rounded-md border px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.12em] ${TONE_STYLES[tone]}`}
    >
      {TONE_LABELS[tone]}
    </span>
  );
}


function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-1 space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex gap-1.5 text-xs leading-relaxed text-muted-foreground">
          <span className="mt-[0.4rem] h-1 w-1 shrink-0 rounded-full bg-maroon/60" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function RoleSummaryAccordion() {
  const [openRole, setOpenRole] = useState<string | null>(null);

  return (
    <ul className="divide-y divide-border">
      {ROLE_SUMMARIES.map((r) => {
        const open = openRole === r.title;
        return (
          <li key={r.title}>
            <button
              type="button"
              onClick={() => setOpenRole(open ? null : r.title)}
              aria-expanded={open}
              className="flex w-full items-start justify-between gap-3 px-5 py-3.5 text-left transition-colors hover:bg-surface"
            >
              <span>
                <span className="block text-sm font-semibold text-maroon">{r.title}</span>
                <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                  {r.role}
                </span>
              </span>
              {open ? (
                <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-maroon" />
              ) : (
                <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
              )}
            </button>

            {open ? (
              <div className="grid gap-4 border-t border-border bg-surface/50 px-5 py-4 lg:grid-cols-2">
                <div>
                  <p className="label-eyebrow">Responsibilities</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {r.responsibilities}
                  </p>
                  <p className="label-eyebrow mt-3">Mandate</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{r.mandate}</p>
                </div>
                <div>
                  <p className="label-eyebrow">Pre-requisites</p>
                  <BulletList items={r.prerequisites} />
                  <p className="label-eyebrow mt-3">Boundaries</p>
                  {r.boundaries.length ? (
                    <BulletList items={r.boundaries} />
                  ) : (
                    <p className="mt-1 text-xs text-muted-foreground/70">&mdash;</p>
                  )}
                </div>
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

export function HubRolesAccountability() {
  const [raciOpen, setRaciOpen] = useState(false);
  const [raciFilter, setRaciFilter] = useState<MandateTone | "all">("all");

  const raciRows = RACI_ROWS.filter((r) => raciFilter === "all" || r.tone === raciFilter);

  return (
    <div>
            {/* Role summary table */}
            <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
              <RoleSummaryAccordion />
            </div>

            {/* RACI */}
            <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
              <button
                type="button"
                onClick={() => setRaciOpen((v) => !v)}
                aria-expanded={raciOpen}
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-surface"
              >
                <span className="text-sm font-semibold text-maroon">View activity-level RACI</span>
                {raciOpen ? (
                  <ChevronDown className="h-4 w-4 text-maroon" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </button>

              {raciOpen ? (
                <div className="border-t border-border">
                  <div className="flex flex-wrap gap-2 bg-surface px-5 py-3">
                    {(
                      [
                        { id: "all", label: "All activities" },
                        { id: "owns", label: "Central Hub owns" },
                        { id: "coordinates", label: "Central Hub coordinates" },
                        { id: "approval", label: "Functional or local approval required" },
                      ] as const
                    )
                      .filter(
                        (f) =>
                          f.id === "all" || RACI_ROWS.some((r) => r.tone === f.id),
                      )
                      .map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setRaciFilter(f.id as MandateTone | "all")}
                        aria-pressed={raciFilter === f.id}
                        className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                          raciFilter === f.id
                            ? "border-maroon bg-maroon text-maroon-foreground"
                            : "border-input bg-card text-foreground hover:border-maroon/45"
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>

                  {/* Desktop table */}
                  <div className="hidden max-h-[26rem] overflow-y-auto sm:block">
                    <table className="w-full text-left text-sm">
                      <thead className="sticky top-0 z-10 bg-surface text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground shadow-panel">
                        <tr>
                          <th className="px-5 py-3 font-semibold">Transaction activity</th>
                          <th className="px-5 py-3 font-semibold">Central Hub position</th>
                          <th className="px-5 py-3 font-semibold">Ownership</th>
                        </tr>
                      </thead>
                      <tbody>
                        {raciRows.map((row) => (
                          <tr key={row.activity} className="border-t border-border">
                            <td className="px-5 py-3 text-foreground">{row.activity}</td>
                            <td className="px-5 py-3 text-muted-foreground">{row.position}</td>
                            <td className="px-5 py-3">
                              <ToneBadge tone={row.tone} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile stacked records */}
                  <ul className="divide-y divide-border sm:hidden">
                    {raciRows.map((row) => (
                      <li key={row.activity} className="px-5 py-4">
                        <p className="text-sm font-medium text-foreground">{row.activity}</p>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {row.position}
                        </p>
                        <div className="mt-2">
                          <ToneBadge tone={row.tone} />
                        </div>
                      </li>
                    ))}
                  </ul>

                  {raciRows.length === 0 ? (
                    <p className="px-5 py-6 text-sm text-muted-foreground">
                      No activities in this category.
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>

    </div>
  );
}
