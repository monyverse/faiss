import { Link } from "@tanstack/react-router";
import { CalendarClock, FileWarning } from "lucide-react";

import type { DealDetail, StageItem } from "@/lib/api";

import { StageStepper } from "../stage-stepper";
import { Badge, Card, Chip, Notice, SectionTitle } from "../ui";

const REQUIREMENT: Record<string, { label: string; hint: string }> = {
  necessary: { label: "Necessary", hint: "Always stood up for this archetype." },
  conditional: { label: "Conditional", hint: "Stood up when the deal's perimeter calls for it." },
};

function Items({ items }: { items: StageItem[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, index) => (
        <li key={index} className="flex gap-3 text-sm text-ink-soft">
          <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-deep" />
          <div className="min-w-0">
            <p className="[overflow-wrap:anywhere]">{item.text}</p>
            {item.subs.length ? (
              <ul className="mt-1 list-disc space-y-0.5 pl-4 text-ink-mute marker:text-line-strong">
                {item.subs.map((sub, i) => <li key={i}>{sub}</li>)}
              </ul>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

export function OverviewTab({ deal }: { deal: DealDetail }) {
  const groups = new Map<string, DealDetail["workstream_requirements"]>();
  for (const row of deal.workstream_requirements) groups.set(row.requirement, [...(groups.get(row.requirement) ?? []), row]);
  return (
    <div className="space-y-6">
      <Card as="section" className="p-4 md:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="amber">Current stage</Badge>
          {deal.stage?.timeline ? <Chip><CalendarClock className="size-3.5" /> Typically {deal.stage.timeline}</Chip> : null}
        </div>
        <h2 className="mt-2.5 text-lg font-semibold tracking-tight text-ink">{deal.stage?.title ?? (deal.stage_title || "No stage set")}</h2>
        {deal.stage?.purpose ? <p className="mt-1 max-w-3xl text-sm leading-relaxed text-ink-soft">{deal.stage.purpose}</p> : null}
        <StageStepper stages={deal.stages} position={deal.stage_position} className="mt-5" />
      </Card>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <section>
          <SectionTitle hint="From the approved methodology for this archetype and stage.">Necessary at this stage</SectionTitle>
          {deal.stage?.necessary.length ? (
            <Card className="p-4"><Items items={deal.stage.necessary} /></Card>
          ) : (
            <Notice>The methodology lists no necessary activities for this stage.</Notice>
          )}
          {deal.stage?.conditional.length ? (
            <details className="mt-3 rounded-card border border-line bg-panel">
              <summary className="flex min-h-11 cursor-pointer items-center px-4 text-sm font-medium text-ink-soft">Conditional activities ({deal.stage.conditional.length})</summary>
              <div className="border-t border-line p-4"><Items items={deal.stage.conditional} /></div>
            </details>
          ) : null}
          {deal.stage?.artefacts.length ? (
            <details className="mt-3 rounded-card border border-line bg-panel">
              <summary className="flex min-h-11 cursor-pointer items-center px-4 text-sm font-medium text-ink-soft">Artefacts expected ({deal.stage.artefacts.length})</summary>
              <div className="border-t border-line p-4"><Items items={deal.stage.artefacts} /></div>
            </details>
          ) : null}
        </section>

        <div className="space-y-6">
          <section>
            <SectionTitle hint="Expected in the data room for diligence, not uploaded yet.">Missing documents</SectionTitle>
            {deal.missing_documents.length === 0 ? (
              <Notice tone="ok">Every expected document type is in the data room.</Notice>
            ) : (
              <Card className="divide-y divide-line">
                {deal.missing_documents.map((doc) => (
                  <div key={doc.type} className="flex items-start gap-3 p-3.5 text-sm text-ink-soft">
                    <FileWarning className="mt-0.5 size-4 shrink-0 text-sev-medium" />
                    {doc.label}
                  </div>
                ))}
                <Link to="/deals/$dealId" params={{ dealId: deal.id }} search={{ tab: "documents" }} className="flex min-h-11 items-center px-3.5 text-sm font-medium text-rose hover:underline">
                  Upload documents
                </Link>
              </Card>
            )}
          </section>

          <section>
            <SectionTitle hint={`What a ${deal.archetype_name.toLowerCase()} activates.`}>Workstreams</SectionTitle>
            {groups.size === 0 ? (
              <Notice>No workstream requirements are recorded for this archetype.</Notice>
            ) : (
              <Card className="space-y-4 p-4">
                {[...groups.entries()].map(([requirement, rows]) => (
                  <div key={requirement}>
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink-mute">
                      {REQUIREMENT[requirement]?.label ?? requirement.replace(/[-_]/g, " ")} <span className="tnum font-normal">({rows.length})</span>
                    </p>
                    {REQUIREMENT[requirement] ? <p className="mt-0.5 text-xs text-ink-mute">{REQUIREMENT[requirement].hint}</p> : null}
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {rows.map((row) => <Chip key={row.workstream} className="whitespace-normal">{row.workstream}</Chip>)}
                    </div>
                  </div>
                ))}
              </Card>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
