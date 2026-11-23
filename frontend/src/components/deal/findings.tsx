import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, ChevronDown, X } from "lucide-react";
import { useMemo, useState } from "react";

import type { DealDetail, Finding, FindingKind, Severity } from "@/lib/api";
import { errorMessage } from "@/lib/api";
import { api, useApiQuery, useIdentity, useLookups, useMeta } from "@/lib/queries";

import { CitationCard } from "../citations";
import { Badge, Button, Card, Chip, EmptyState, ErrorState, Input, LoadingCards, Notice, Select, SeverityBadge, Stat, cx, type Tone } from "../ui";

const KIND: Record<FindingKind, { label: string; tone: Tone }> = {
  finding: { label: "Finding", tone: "info" },
  risk: { label: "Risk", tone: "rose" },
  gap: { label: "Gap", tone: "medium" },
  request: { label: "Request", tone: "low" },
};
const STATUS: Record<Finding["status"], { label: string; tone: Tone }> = {
  draft: { label: "Draft: not reviewed", tone: "info" },
  validated: { label: "Validated", tone: "ok" },
  rejected: { label: "Rejected", tone: "critical" },
};
const SEVERITIES: Severity[] = ["critical", "high", "medium", "low", "info"];

export function FindingsTab({ deal }: { deal: DealDetail }) {
  const [kind, setKind] = useState("");
  const [severity, setSeverity] = useState("");
  const [workstream, setWorkstream] = useState("");
  const query = useApiQuery(["deal", deal.id, "findings"], () => api.findings(deal.id));
  const { workstream: workstreamName } = useLookups();

  const workstreams = useMemo(() => [...new Set((query.data?.items ?? []).map((f) => f.workstream))], [query.data]);
  const items = useMemo(
    () => (query.data?.items ?? []).filter((f) => (!kind || f.kind === kind) && (!severity || f.severity === severity) && (!workstream || f.workstream === workstream)),
    [query.data, kind, severity, workstream],
  );

  if (query.isPending) return <LoadingCards count={4} />;
  if (query.isError) return <ErrorState error={query.error} onRetry={() => void query.refetch()} what="Findings" />;
  const { summary } = query.data;

  return (
    <div className="space-y-5">
      <Card as="section" className="grid grid-cols-2 gap-x-4 gap-y-4 p-4 md:grid-cols-5 md:p-5">
        <Stat label="Evidence traceability" value={summary.evidence_traceability_pct == null ? "—" : <span className="text-amber">{summary.evidence_traceability_pct}%</span>} sub="Findings and risks linked to a source" />
        <Stat label="Findings" value={summary.by_kind.finding} />
        <Stat label="Risks" value={summary.by_kind.risk} />
        <Stat label="Gaps and requests" value={summary.by_kind.gap + summary.by_kind.request} />
        <Stat label="Awaiting review" value={summary.awaiting_review} sub="Medium severity and above" />
      </Card>

      <div className="grid gap-2 sm:grid-cols-3">
        <Select label="Kind" value={kind} onChange={setKind} placeholder="All kinds" options={(Object.keys(KIND) as FindingKind[]).map((k) => ({ value: k, label: `${KIND[k].label}s (${summary.by_kind[k]})` }))} />
        <Select label="Severity" value={severity} onChange={setSeverity} placeholder="All severities" options={SEVERITIES.map((s) => ({ value: s, label: s[0]?.toUpperCase() + s.slice(1) }))} />
        <Select label="Workstream" value={workstream} onChange={setWorkstream} placeholder="All workstreams" options={workstreams.map((w) => ({ value: w, label: workstreamName(w) }))} />
      </div>

      {summary.total === 0 ? (
        <EmptyState title="Nothing recorded yet">Findings, risks, gaps and requests appear here as agents work on this deal's goals.</EmptyState>
      ) : items.length === 0 ? (
        <EmptyState title="Nothing matches these filters" action={<Button onClick={() => { setKind(""); setSeverity(""); setWorkstream(""); }}>Clear filters</Button>} />
      ) : (
        <>
          <p className="tnum text-sm text-ink-mute">Showing {items.length} of {summary.total}</p>
          <ul className="space-y-2.5">
            {items.map((finding) => <FindingItem key={finding.id} finding={finding} dealId={deal.id} canReview={deal.access?.can_write ?? false} />)}
          </ul>
        </>
      )}
    </div>
  );
}

function FindingItem({ finding, dealId, canReview }: { finding: Finding; dealId: string; canReview: boolean }) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const client = useQueryClient();
  const identity = useIdentity();
  const meta = useMeta().data;
  const { workstream, person } = useLookups();
  const review = useMutation({
    mutationFn: (decision: "validated" | "rejected") => api.reviewFinding(finding.id, { decision, note }),
    onSuccess: () => {
      setNote("");
      void client.invalidateQueries({ queryKey: [identity, "deal", dealId] });
      void client.invalidateQueries({ queryKey: [identity, "deals"] });
    },
  });
  const agentKey = finding.produced_by.split(":")[0] ?? "";
  const agent = meta?.agents.find((a) => a.key === agentKey)?.name ?? finding.produced_by;
  const status = STATUS[finding.status] ?? { label: finding.status, tone: "info" as Tone };
  return (
    <li className="rounded-card border border-line bg-panel">
      <button type="button" aria-expanded={open} onClick={() => setOpen((v) => !v)} className="flex w-full items-start gap-3 p-3.5 text-left md:p-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge tone={KIND[finding.kind]?.tone ?? "info"}>{KIND[finding.kind]?.label ?? finding.kind}</Badge>
            <SeverityBadge severity={finding.severity} />
            <Chip>{workstream(finding.workstream)}</Chip>
            <Badge tone={status.tone}>{status.label}</Badge>
          </div>
          <p className="mt-2 font-medium text-ink [overflow-wrap:anywhere]">{finding.title}</p>
          <p className="tnum mt-1 text-xs text-ink-mute">{finding.evidence.length ? `${finding.evidence.length} source${finding.evidence.length === 1 ? "" : "s"}` : "No evidence linked"} · {agent}</p>
        </div>
        <ChevronDown className={cx("mt-1 size-5 shrink-0 text-ink-mute transition-transform", open && "rotate-180")} />
      </button>
      {open ? (
        <div className="space-y-4 border-t border-line p-3.5 md:p-4">
          <p className="whitespace-pre-line text-sm leading-relaxed text-ink-soft [overflow-wrap:anywhere]">{finding.detail}</p>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-mute">Evidence</p>
            {finding.evidence.length === 0 ? (
              <Notice tone="warn">No source is linked to this item. Treat it as unsupported until one is.</Notice>
            ) : (
              <div className="grid gap-2.5 lg:grid-cols-2">
                {finding.evidence.map((citation, index) => <CitationCard key={index} citation={citation} index={index} />)}
              </div>
            )}
          </div>
          {finding.reviewed_by ? (
            <p className="text-sm text-ink-mute">
              {finding.status === "validated" ? "Validated" : "Rejected"} by {person(finding.reviewed_by)}
              {finding.review_note ? `: “${finding.review_note}”` : ""}
            </p>
          ) : null}
          {canReview ? (
            <div className="border-t border-line pt-3.5">
              <Input value={note} onChange={(e) => setNote(e.target.value)} maxLength={2000} aria-label="Review note" placeholder="Review note (optional, kept with the item)" />
              <div className="mt-2.5 flex flex-wrap gap-2">
                <Button busy={review.isPending && review.variables === "validated"} disabled={review.isPending} onClick={() => review.mutate("validated")} icon={<Check className="size-4" />}>Validate</Button>
                <Button variant="danger" busy={review.isPending && review.variables === "rejected"} disabled={review.isPending} onClick={() => review.mutate("rejected")} icon={<X className="size-4" />}>Reject</Button>
              </div>
              {review.isError ? <Notice tone="error" className="mt-2.5">{errorMessage(review.error)}</Notice> : null}
            </div>
          ) : null}
        </div>
      ) : null}
    </li>
  );
}
