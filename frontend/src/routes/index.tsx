import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { BriefcaseBusiness, ChevronRight, FileText, Hand, ListChecks, Plus, ShieldAlert, Target } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";

import { CountryPicker } from "@/components/deal/misc";
import { Page } from "@/components/shell";
import { StageStepper } from "@/components/stage-stepper";
import { Button, Card, Chip, Dialog, EmptyState, ErrorState, Field, Input, LoadingCards, Notice, PageHeader, Select, SeverityBadge, Skeleton, Tile, cx } from "@/components/ui";
import type { Deal } from "@/lib/api";
import { errorMessage } from "@/lib/api";
import { api, useApiQuery, useIdentity, useMe, useMeta } from "@/lib/queries";

export const Route = createFileRoute("/")({ component: DealsPage });

function DealsPage() {
  const me = useMe().data;
  const deals = useApiQuery(["deals"], api.deals, { refetchInterval: 20_000 });
  const waiting = useApiQuery(["goals", "waiting"], () => api.goals("awaiting_input,awaiting_approval"), { refetchInterval: 20_000 });
  const approvals = useApiQuery(["approvals", "pending"], () => api.approvals("pending"), { refetchInterval: 15_000 });
  const [creating, setCreating] = useState(false);
  const readOnly = !!me && me.roles.includes("internal_audit") && !me.roles.includes("ma_director");

  const list = deals.data ?? [];
  const questions = (waiting.data ?? []).reduce((n, g) => n + g.asks.length, 0);
  const decisions = (approvals.data ?? []).length;
  const sum = (pick: (deal: Deal) => number | undefined) => list.reduce((n, d) => n + (pick(d) ?? 0), 0);

  return (
    <Page>
      <PageHeader
        title="My deals"
        lead={me ? `The transactions ${me.name.split(" ")[0]} can see. Each has its own Deal Twin: documents, findings, goals and the methodology for its stage.` : "The transactions you can see."}
        action={readOnly ? null : <Button variant="primary" onClick={() => setCreating(true)} icon={<Plus className="size-4" />}>New deal</Button>}
      />

      <section aria-label="Summary" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile icon={<BriefcaseBusiness className="size-5" />} label="Active deals" value={deals.data ? list.filter((d) => d.status === "active").length : undefined} />
        <StatTile icon={<Target className="size-5" />} label="Goals running" value={deals.data ? sum((d) => d.counts.open_goals) : undefined} note="Agents working now" />
        <StatTile icon={<Hand className="size-5" />} label="Waiting on you" value={waiting.data && approvals.data ? questions + decisions : undefined} note={`${questions} question${questions === 1 ? "" : "s"} · ${decisions} approval${decisions === 1 ? "" : "s"}`} accent={questions + decisions > 0} to="/goals" />
        <StatTile icon={<ShieldAlert className="size-5" />} label="Open risks" value={deals.data ? sum((d) => d.counts.risks) : undefined} note="Across your deals" />
      </section>

      <section className="mt-7" aria-label="Deals">
        {deals.isPending ? (
          <LoadingCards count={3} />
        ) : deals.isError ? (
          <ErrorState error={deals.error} onRetry={() => void deals.refetch()} what="Your deals" />
        ) : list.length === 0 ? (
          <EmptyState title="No deals yet" icon={<BriefcaseBusiness className="size-5" />} action={readOnly ? undefined : <Button variant="primary" onClick={() => setCreating(true)} icon={<Plus className="size-4" />}>New deal</Button>}>
            You only see deals you are a member of. If you expected one here, ask its deal lead to add you.
          </EmptyState>
        ) : (
          <ul className="space-y-3.5">
            {list.map((deal) => <DealCard key={deal.id} deal={deal} />)}
          </ul>
        )}
      </section>

      {creating ? <NewDealDialog onClose={() => setCreating(false)} /> : null}
    </Page>
  );
}

function StatTile({ icon, label, value, note, accent, to }: { icon: ReactNode; label: string; value: number | undefined; note?: string; accent?: boolean; to?: "/goals" }) {
  const body = (
    <Card className={cx("flex h-full items-center gap-3 p-3.5 md:gap-4 md:p-4", to && "transition-colors hover:border-line-strong", accent && "border-amber/45")}>
      <span className={cx("inline-flex size-10 shrink-0 items-center justify-center rounded-full border md:size-12", accent ? "border-amber/50 bg-amber/15 text-amber" : "border-line-strong/70 bg-raised text-ink-soft")}>{icon}</span>
      <div className="min-w-0">
        <p className="truncate text-xs font-medium text-ink-mute md:text-sm">{label}</p>
        {value === undefined ? <Skeleton className="mt-1.5 h-7 w-10" /> : <p className={cx("tnum text-2xl font-semibold leading-tight md:text-[1.75rem]", accent ? "text-amber" : "text-ink")}>{value}</p>}
        {note ? <p className="mt-0.5 text-[0.7rem] leading-snug text-ink-mute md:text-xs">{note}</p> : null}
      </div>
    </Card>
  );
  return to ? <Link to={to} className="block">{body}</Link> : body;
}

function codeInitials(name: string): string {
  const words = name.replace(/^project\s+/i, "").trim().split(/\s+/);
  return ((words[0]?.[0] ?? "") + (words[1]?.[0] ?? words[0]?.[1] ?? "")).toUpperCase();
}

function DealCard({ deal }: { deal: Deal }) {
  const counts = deal.counts;
  return (
    <li>
      <Link to="/deals/$dealId" params={{ dealId: deal.id }} className="group block rounded-card border border-line bg-panel p-4 transition-colors hover:border-line-strong md:p-5">
        <div className="flex items-start gap-3.5">
          <Tile text={codeInitials(deal.code_name)} size="lg" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h2 className="text-lg font-semibold tracking-tight text-ink">{deal.code_name}</h2>
              {counts.top_severity ? <SeverityBadge severity={counts.top_severity} prefix="Top risk:" /> : <Chip>No risks recorded</Chip>}
              {deal.status !== "active" ? <Chip>{deal.status === "on_hold" ? "On hold" : "Closed"}</Chip> : null}
            </div>
            <p className="mt-0.5 text-sm text-ink-mute">{deal.target_name || "Target not named"} · {deal.sector}</p>
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
              <Chip className="border-maroon bg-maroon/40 text-ink">{deal.archetype_name}</Chip>
              {deal.countries.map((country) => (
                <Chip key={country.iso} className="gap-1.5 pl-1">
                  <span className="tnum rounded bg-line px-1 text-[0.65rem] font-semibold tracking-wide text-ink">{country.iso}</span>
                  {country.name}
                </Chip>
              ))}
              {deal.countries.length === 0 ? <Chip>No countries set</Chip> : null}
            </div>
          </div>
          <ChevronRight className="mt-1 size-5 shrink-0 text-ink-mute transition-transform group-hover:translate-x-0.5 group-hover:text-ink" aria-hidden />
        </div>

        <StageStepper stages={deal.stages} position={deal.stage_position} className="mt-5" />

        <dl className="tnum mt-4 flex flex-wrap gap-x-5 gap-y-1.5 border-t border-line pt-3.5 text-sm text-ink-mute">
          <Count icon={<FileText className="size-4" />} label="documents" value={counts.documents} />
          <Count icon={<ListChecks className="size-4" />} label="findings" value={counts.findings} />
          <Count icon={<Target className="size-4" />} label="goals running" value={counts.open_goals} />
          {counts.waiting_goals ? <Count icon={<Hand className="size-4" />} label="waiting on a person" value={counts.waiting_goals} accent /> : null}
        </dl>
      </Link>
    </li>
  );
}

function Count({ icon, label, value, accent }: { icon: ReactNode; label: string; value: number | undefined; accent?: boolean }) {
  return (
    <div className={cx("flex items-center gap-1.5", accent && "text-amber")}>
      {icon}
      <dd className={cx("font-semibold", accent ? "text-amber" : "text-ink")}>{value ?? 0}</dd>
      <dt>{label}</dt>
    </div>
  );
}

function NewDealDialog({ onClose }: { onClose: () => void }) {
  const meta = useMeta();
  const client = useQueryClient();
  const identity = useIdentity();
  const navigate = useNavigate();
  const [codeName, setCodeName] = useState("");
  const [target, setTarget] = useState("");
  const [archetypeId, setArchetypeId] = useState("");
  const [stageId, setStageId] = useState("");
  const [countries, setCountries] = useState<string[]>([]);
  const archetype = meta.data?.archetypes.find((a) => a.id === archetypeId);
  const create = useMutation({
    mutationFn: () => api.createDeal({ code_name: codeName.trim(), target_name: target.trim(), archetype_id: archetypeId, stage_id: stageId, countries }),
    onSuccess: (deal) => {
      void client.invalidateQueries({ queryKey: [identity, "deals"] });
      onClose();
      void navigate({ to: "/deals/$dealId", params: { dealId: deal.id } });
    },
  });
  const ready = codeName.trim().length >= 2 && !!archetypeId;
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (ready) create.mutate();
  };
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()} title="New deal" description="Sets up the Deal Twin. You become its deal lead and decide who else can see it.">
      {meta.isPending ? (
        <LoadingCards count={1} />
      ) : meta.isError ? (
        <ErrorState error={meta.error} onRetry={() => void meta.refetch()} what="The methodology" />
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <Field label="Code name" hint="How the deal is referred to, for example “Project Baobab”.">
            <Input value={codeName} onChange={(e) => setCodeName(e.target.value)} maxLength={120} required autoFocus />
          </Field>
          <Field label="Target">
            <Input value={target} onChange={(e) => setTarget(e.target.value)} maxLength={200} placeholder="The business or portfolio being bought or sold" />
          </Field>
          <Field label="Archetype">
            <Select label="Archetype" value={archetypeId} onChange={(next) => { setArchetypeId(next); setStageId(""); }} placeholder="Choose an archetype" options={meta.data.archetypes.map((a) => ({ value: a.id, label: a.name }))} />
          </Field>
          {archetype ? (
            <div className="rounded-lg border border-line bg-canvas/50 p-3 text-sm">
              <p className="text-ink-soft">{archetype.description}</p>
              <p className="mt-1.5 text-xs text-ink-mute">Perimeter: {archetype.perimeter}</p>
            </div>
          ) : null}
          <Field label="Starting stage" hint={archetype ? "Defaults to the first stage of this archetype's lifecycle." : "Choose an archetype first."}>
            <Select label="Starting stage" value={stageId} onChange={setStageId} placeholder={archetype ? `First stage (${archetype.stages[0]?.title ?? "none"})` : "Choose an archetype first"} options={(archetype?.stages ?? []).map((s) => ({ value: s.id, label: `${s.index} · ${s.title}` }))} />
          </Field>
          <div>
            <p className="mb-1.5 text-sm font-medium text-ink-soft">Countries in scope</p>
            <CountryPicker options={meta.data.countries} value={countries} onChange={setCountries} />
          </div>
          {create.isError ? <Notice tone="error">{errorMessage(create.error)}</Notice> : null}
          <div className="flex justify-end gap-2 pt-1">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary" busy={create.isPending} disabled={!ready}>Create deal</Button>
          </div>
        </form>
      )}
    </Dialog>
  );
}
