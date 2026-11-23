import { createFileRoute } from "@tanstack/react-router";
import { Target } from "lucide-react";

import { GoalRow, LIVE_STATES, WAITING_STATES } from "@/components/goals";
import { Page } from "@/components/shell";
import { EmptyState, ErrorState, LoadingCards, PageHeader, SectionTitle } from "@/components/ui";
import type { GoalSummary } from "@/lib/api";
import { api, useApiQuery } from "@/lib/queries";

export const Route = createFileRoute("/goals")({ component: GoalsPage });

function GoalsPage() {
  const goals = useApiQuery(["goals", "all"], () => api.goals(), {
    refetchInterval: (query) => (query.state.data?.some((g) => LIVE_STATES.includes(g.state)) ? 3000 : 15_000),
  });
  const list = goals.data ?? [];
  const groups: { title: string; hint: string; items: GoalSummary[] }[] = [
    { title: "Needs you", hint: "Stopped until a person answers, approves or resumes.", items: list.filter((g) => WAITING_STATES.includes(g.state)) },
    { title: "Running", hint: "Agents are working. You do not need to watch.", items: list.filter((g) => LIVE_STATES.includes(g.state)) },
    { title: "Done", hint: "Finished, stopped or cancelled.", items: list.filter((g) => ["done", "failed", "cancelled"].includes(g.state)) },
  ];
  return (
    <Page>
      <PageHeader title="Goals" lead="The control room: every goal on the deals you can see. Agents come back to you only when something changed." />
      {goals.isPending ? (
        <LoadingCards count={3} />
      ) : goals.isError ? (
        <ErrorState error={goals.error} onRetry={() => void goals.refetch()} what="Goals" />
      ) : list.length === 0 ? (
        <EmptyState title="No goals yet" icon={<Target className="size-5" />}>Open a deal and hand over a goal from its Goals tab.</EmptyState>
      ) : (
        <div className="space-y-8">
          {groups.map((group) => (
            <section key={group.title}>
              <SectionTitle hint={group.hint}>
                {group.title} <span className="tnum font-normal text-ink-mute">({group.items.length})</span>
              </SectionTitle>
              {group.items.length === 0 ? (
                <p className="rounded-card border border-dashed border-line px-4 py-5 text-sm text-ink-mute">Nothing here.</p>
              ) : (
                <div className="space-y-3">{group.items.map((goal) => <GoalRow key={goal.id} goal={goal} showDeal />)}</div>
              )}
            </section>
          ))}
        </div>
      )}
    </Page>
  );
}
