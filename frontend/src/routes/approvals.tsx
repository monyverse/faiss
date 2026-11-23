import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { useState } from "react";

import { ApprovalCard } from "@/components/goals";
import { Page } from "@/components/shell";
import { Button, EmptyState, ErrorState, LoadingCards, PageHeader } from "@/components/ui";
import { api, useApiQuery } from "@/lib/queries";

export const Route = createFileRoute("/approvals")({ component: ApprovalsPage });

function ApprovalsPage() {
  const [history, setHistory] = useState(false);
  const approvals = useApiQuery(["approvals", history ? "all" : "pending"], () => api.approvals(history ? "all" : "pending"), { refetchInterval: 10_000 });
  return (
    <Page>
      <PageHeader
        title="Approvals"
        lead="Sensitive actions an agent wants to take. Each waits here until a person decides; the model is never the decision-maker."
        action={<Button onClick={() => setHistory((v) => !v)} aria-pressed={history}>{history ? "Show pending only" : "Show decided too"}</Button>}
      />
      {approvals.isPending ? (
        <LoadingCards count={2} />
      ) : approvals.isError ? (
        <ErrorState error={approvals.error} onRetry={() => void approvals.refetch()} what="Approvals" />
      ) : approvals.data.length === 0 ? (
        <EmptyState title={history ? "No approvals have been requested" : "Nothing is waiting for approval"} icon={<ShieldCheck className="size-5" />}>
          When an agent needs to do something sensitive, such as submitting a deliverable to a governance forum, the request appears here.
        </EmptyState>
      ) : (
        <div className="space-y-3">{approvals.data.map((approval) => <ApprovalCard key={approval.id} approval={approval} showDeal />)}</div>
      )}
    </Page>
  );
}
