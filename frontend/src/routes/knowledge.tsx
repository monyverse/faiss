import { createFileRoute } from "@tanstack/react-router";
import { BookOpenText, Search } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Page } from "@/components/shell";
import { Badge, Button, Card, Chip, EmptyState, ErrorState, Input, LoadingCards, PageHeader, Select, cx } from "@/components/ui";
import type { KnowledgePassage } from "@/lib/api";
import { api, useApiQuery, useMeta } from "@/lib/queries";

export const Route = createFileRoute("/knowledge")({ component: KnowledgePage });

interface Filters {
  q: string;
  area: string;
  archetype: string;
  stage: string;
  workstream: string;
  history: boolean;
}

function KnowledgePage() {
  const meta = useMeta().data;
  const areas = useApiQuery(["knowledge", "areas"], api.knowledgeAreas, { staleTime: 5 * 60_000 });
  const [draft, setDraft] = useState("");
  const [filters, setFilters] = useState<Filters>({ q: "", area: "", archetype: "", stage: "", workstream: "", history: false });
  const set = (change: Partial<Filters>) => setFilters((f) => ({ ...f, ...change }));
  const results = useApiQuery(
    ["knowledge", "search", filters],
    () => api.knowledgeSearch({ q: filters.q, area: filters.area, archetype: filters.archetype, stage: filters.stage, workstream: filters.workstream, include_history: filters.history, limit: 20 }),
    { enabled: filters.q.length >= 2, placeholderData: (previous) => previous },
  );
  const archetype = meta?.archetypes.find((a) => a.id === filters.archetype);
  const stages = archetype?.stages ?? meta?.archetypes[0]?.stages ?? [];
  const submit = (event: FormEvent) => {
    event.preventDefault();
    set({ q: draft.trim() });
  };

  return (
    <Page>
      <PageHeader
        title="Knowledge"
        lead={`Search the approved M&A methodology${meta ? `: ${meta.corpus.chunkCount.toLocaleString("en-GB")} passages ingested from the Capability Hub (version ${meta.corpus.corpusVersion})` : ""}. This is the only source agents and the assistant are allowed to quote.`}
      />
      <form onSubmit={submit} role="search" className="flex gap-2">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-mute" />
          <Input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="For example: steering committee, cutover, client readiness" aria-label="Search the methodology" maxLength={400} className="pl-9" />
        </div>
        <Button type="submit" variant="primary" disabled={draft.trim().length < 2}>Search</Button>
      </form>
      <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
        <Select label="Area" value={filters.area} onChange={(area) => set({ area })} placeholder="All areas" options={(areas.data ?? []).map((a) => ({ value: a.area, label: `${a.area} (${a.chunks})` }))} />
        <Select label="Archetype" value={filters.archetype} onChange={(next) => set({ archetype: next, stage: "" })} placeholder="Any archetype" options={(meta?.archetypes ?? []).map((a) => ({ value: a.id, label: a.name }))} />
        <Select label="Stage" value={filters.stage} onChange={(stage) => set({ stage })} placeholder="Any stage" options={stages.map((s) => ({ value: s.id, label: `${s.index} · ${s.title}` }))} />
        <Select label="Workstream" value={filters.workstream} onChange={(workstream) => set({ workstream })} placeholder="Any workstream" options={(meta?.workstreams ?? []).map((w) => ({ value: w.id, label: w.name }))} />
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-3 text-sm text-ink-soft">
        <button
          type="button"
          role="switch"
          aria-checked={filters.history}
          onClick={() => set({ history: !filters.history })}
          className={cx("relative h-6 w-11 shrink-0 rounded-full border transition-colors", filters.history ? "border-amber bg-amber/30" : "border-line-strong bg-raised")}
        >
          <span className={cx("absolute top-0.5 size-[1.125rem] rounded-full transition-all", filters.history ? "left-[1.375rem] bg-amber" : "left-0.5 bg-ink-mute")} />
        </button>
        Include design history <span className="text-ink-mute">(earlier drafts and retired material, not approved methodology)</span>
      </label>

      <div className={cx("mt-6", results.isPlaceholderData && "opacity-60")}>
        {filters.q.length < 2 ? (
          <EmptyState title="Search the methodology" icon={<BookOpenText className="size-5" />}>Enter a topic to find the approved passages about it. Narrow by area, archetype, stage or workstream.</EmptyState>
        ) : results.isPending ? (
          <LoadingCards count={3} />
        ) : results.isError ? (
          <ErrorState error={results.error} onRetry={() => void results.refetch()} what="Search results" />
        ) : results.data.results.length === 0 ? (
          <EmptyState title="No passages match">Try fewer filters or a broader term. If the methodology does not cover it, the assistant will say so rather than guess.</EmptyState>
        ) : (
          <>
            <p className="tnum mb-3 text-sm text-ink-mute">{results.data.results.length} passages for “{results.data.query}”</p>
            <ul className="space-y-3">{results.data.results.map((passage) => <Passage key={passage.id} passage={passage} />)}</ul>
          </>
        )}
      </div>
    </Page>
  );
}

function Passage({ passage }: { passage: KnowledgePassage }) {
  const [open, setOpen] = useState(false);
  const long = passage.text.length > 520;
  const approved = passage.status === "approved";
  return (
    <Card as="li" className="p-4">
      <div className="flex flex-wrap items-center gap-1.5">
        <Badge tone={approved ? "ok" : "medium"}>{approved ? "Approved" : passage.status}</Badge>
        <Chip>{passage.area}</Chip>
        {passage.origin === "history" ? <Badge tone="high">Design history</Badge> : null}
      </div>
      <p className="mt-2 text-xs text-ink-mute [overflow-wrap:anywhere]">{passage.breadcrumb.join(" › ")}</p>
      <h2 className="mt-0.5 font-medium text-ink [overflow-wrap:anywhere]">{passage.title}</h2>
      <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-ink-soft [overflow-wrap:anywhere]">{long && !open ? `${passage.text.slice(0, 520).trimEnd()}…` : passage.text}</p>
      {long ? (
        <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="mt-1 inline-flex min-h-11 items-center text-sm font-medium text-rose hover:underline">
          {open ? "Show less" : "Show the whole passage"}
        </button>
      ) : null}
      <dl className="mt-3 space-y-1.5 border-t border-line pt-3 text-xs text-ink-mute">
        <div className="flex gap-2">
          <dt className="w-16 shrink-0">Source</dt>
          <dd className="font-mono text-[0.72rem] text-ink-soft [overflow-wrap:anywhere]">{passage.source.path}{passage.source.pointer ? ` ${passage.source.pointer}` : ""}</dd>
        </div>
        {passage.site_routes.length ? (
          <div className="flex gap-2">
            <dt className="w-16 shrink-0">Hub pages</dt>
            <dd className="flex flex-wrap gap-1">
              {passage.site_routes.map((route) => <span key={route} className="rounded border border-line bg-raised px-1.5 py-0.5 font-mono text-[0.7rem] text-ink-soft">{route}</span>)}
            </dd>
          </div>
        ) : null}
      </dl>
    </Card>
  );
}
