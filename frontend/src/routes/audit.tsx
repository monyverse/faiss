import { createFileRoute } from "@tanstack/react-router";
import { Bot, Link2, ShieldAlert, ShieldCheck, User } from "lucide-react";

import { Page } from "@/components/shell";
import { Badge, Button, Card, EmptyState, ErrorState, LoadingCards, PageHeader, cx } from "@/components/ui";
import { formatDateTime } from "@/lib/format";
import { api, useApiQuery, useLookups } from "@/lib/queries";

export const Route = createFileRoute("/audit")({ component: AuditPage });

function AuditPage() {
  const trail = useApiQuery(["audit", "trail"], () => api.audit({ limit: 200 }));
  const verify = useApiQuery(["audit", "verify"], api.auditVerify);
  const deals = useApiQuery(["deals"], api.deals);
  const { person } = useLookups();
  const dealName = (id: string | null | undefined) => (id ? (deals.data?.find((d) => d.id === id)?.code_name ?? `Deal ${id.slice(0, 8)}`) : "");

  return (
    <Page>
      <PageHeader title="Audit" lead="Every action by a person or an agent, in order. Each entry is chained to the one before it, so a change or deletion is detectable." />
      {trail.isPending ? (
        <LoadingCards count={3} />
      ) : trail.isError ? (
        <ErrorState error={trail.error} onRetry={() => void trail.refetch()} what="The audit trail" />
      ) : (
        <>
          <Card as="section" className={cx("flex flex-wrap items-center gap-3 p-4", verify.data && (verify.data.intact ? "border-ok/40" : "border-sev-critical/50"))}>
            <span className={cx("inline-flex size-10 shrink-0 items-center justify-center rounded-full border", verify.data?.intact === false ? "tint-sev-critical" : "tint-ok")}>
              {verify.data?.intact === false ? <ShieldAlert className="size-5" /> : <ShieldCheck className="size-5" />}
            </span>
            <div className="min-w-0 flex-1 basis-56">
              {verify.isPending ? (
                <p className="text-sm text-ink-mute" role="status">Verifying the chain…</p>
              ) : verify.isError ? (
                <p className="text-sm text-sev-critical">The chain could not be verified: {verify.error.message}</p>
              ) : verify.data.intact ? (
                <>
                  <p className="font-medium text-ink">Chain intact</p>
                  <p className="tnum text-sm text-ink-mute">{verify.data.events} entries verified; no entry has been altered or removed.</p>
                </>
              ) : (
                <>
                  <p className="font-medium text-sev-critical">Chain broken at entry {verify.data.broken_at_id}</p>
                  <p className="tnum text-sm text-ink-mute">{verify.data.events} entries checked. Treat the trail as unreliable from that entry on and escalate.</p>
                </>
              )}
            </div>
            <Button busy={verify.isFetching} onClick={() => void verify.refetch()} icon={<Link2 className="size-4" />}>Verify again</Button>
          </Card>

          {trail.data.length === 0 ? (
            <div className="mt-5"><EmptyState title="No audit entries yet" /></div>
          ) : (
            <ol className="mt-5 space-y-2">
              {trail.data.map((event) => (
                <Card as="li" key={event.id} className="p-3.5">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span className="tnum font-mono text-xs text-ink-mute">#{event.id}</span>
                    <span className="font-mono text-[0.8rem] font-medium text-ink">{event.action}</span>
                    <Badge tone={event.outcome === "ok" || event.outcome === "approved" || event.outcome === "validated" ? "ok" : event.outcome === "denied" || event.outcome === "rejected" ? "critical" : "info"}>{event.outcome}</Badge>
                    {event.deal_id ? <span className="text-xs text-ink-soft">{dealName(event.deal_id)}</span> : null}
                    <span className="tnum ml-auto text-xs text-ink-mute">{formatDateTime(event.ts)}</span>
                  </div>
                  <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-soft">
                    {event.actor_type === "agent" ? <Bot className="size-4 text-ink-mute" aria-label="Agent" /> : <User className="size-4 text-ink-mute" aria-label="Person" />}
                    {event.actor_type === "agent" ? `${event.actor} agent` : person(event.actor)}
                    {event.resource ? <span className="font-mono text-xs text-ink-mute [overflow-wrap:anywhere]">{event.resource}</span> : null}
                  </p>
                  {event.detail && Object.keys(event.detail).length ? (
                    <p className="mt-1.5 overflow-x-auto whitespace-pre rounded border border-line bg-canvas/50 px-2 py-1 font-mono text-[0.7rem] text-ink-mute">{JSON.stringify(event.detail)}</p>
                  ) : null}
                  {event.hash ? <p className="mt-1.5 font-mono text-[0.7rem] text-ink-mute">hash {event.hash}…</p> : null}
                </Card>
              ))}
            </ol>
          )}
        </>
      )}
    </Page>
  );
}
