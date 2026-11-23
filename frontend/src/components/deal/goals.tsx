import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Send, Target } from "lucide-react";
import { useState, type FormEvent } from "react";

import type { DealDetail } from "@/lib/api";
import { errorMessage } from "@/lib/api";
import { api, useApiQuery, useIdentity } from "@/lib/queries";

import { GoalDetail, GoalRow, LIVE_STATES } from "../goals";
import { Button, Card, EmptyState, ErrorState, LoadingCards, Notice, SectionTitle, Textarea } from "../ui";

export const SUGGESTED_OBJECTIVES = [
  "Run due diligence on the target and prepare the investment committee briefing",
  "Set out how we mobilise this deal in the first ten days",
  "Research which regulatory approvals this transaction needs and in what order",
];

export function GoalsTab({ deal, goalId }: { deal: DealDetail; goalId: string | undefined }) {
  const client = useQueryClient();
  const identity = useIdentity();
  const navigate = useNavigate();
  const [objective, setObjective] = useState("");
  const goals = useApiQuery(["goals", "deal", deal.id], () => api.dealGoals(deal.id), {
    refetchInterval: (query) => (query.state.data?.some((g) => LIVE_STATES.includes(g.state)) ? 3000 : false),
  });
  const create = useMutation({
    mutationFn: (text: string) => api.createGoal(deal.id, { objective: text }),
    onSuccess: (goal) => {
      setObjective("");
      void client.invalidateQueries({ queryKey: [identity, "goals"] });
      void client.invalidateQueries({ queryKey: [identity, "deals"] });
      void navigate({ to: "/deals/$dealId", params: { dealId: deal.id }, search: { tab: "goals", goal: goal.id } });
    },
  });
  const canWrite = deal.access?.can_write ?? false;
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (objective.trim().length >= 8) create.mutate(objective.trim());
  };

  if (goalId) {
    return (
      <div>
        <Link to="/deals/$dealId" params={{ dealId: deal.id }} search={{ tab: "goals" }} className="mb-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink">
          <ArrowLeft className="size-4" /> All goals on this deal
        </Link>
        <GoalDetail key={goalId} goalId={goalId} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card as="section" className="p-4 md:p-5">
        <h2 className="flex items-center gap-2 text-base font-semibold text-ink">
          <span className="inline-flex size-8 items-center justify-center rounded-full border border-amber/40 bg-amber/15 text-amber"><Target className="size-4" /></span>
          Hand over a goal
        </h2>
        <p className="mt-1.5 max-w-3xl text-sm text-ink-mute">
          Say what you want done. The agents plan it, keep working without you, and come back only when something changed: they need an answer, need an approval, or have finished. Every requirement is checked before a goal closes.
        </p>
        {canWrite ? (
          <form onSubmit={submit} className="mt-4">
            <Textarea
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              maxLength={2000}
              aria-label="Goal"
              placeholder="For example: run due diligence on the target and prepare the investment committee briefing"
              className="min-h-20"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {SUGGESTED_OBJECTIVES.map((suggestion) => (
                <button key={suggestion} type="button" onClick={() => setObjective(suggestion)} className="min-h-11 rounded-xl border border-line bg-raised px-3 py-2 text-left text-sm text-ink-soft hover:border-line-strong hover:text-ink md:min-h-9">
                  {suggestion}
                </button>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button type="submit" variant="primary" busy={create.isPending} disabled={objective.trim().length < 8} icon={<Send className="size-4" />}>
                Hand over
              </Button>
              <p className="text-xs text-ink-mute">Sensitive actions always wait for a person's approval.</p>
            </div>
            {create.isError ? <Notice tone="error" className="mt-3">{errorMessage(create.error)}</Notice> : null}
          </form>
        ) : (
          <Notice className="mt-4">You have read-only access to this deal, so you cannot hand over goals.</Notice>
        )}
      </Card>

      <section>
        <SectionTitle>Goals on this deal</SectionTitle>
        {goals.isPending ? (
          <LoadingCards count={2} />
        ) : goals.isError ? (
          <ErrorState error={goals.error} onRetry={() => void goals.refetch()} what="Goals" />
        ) : goals.data.length === 0 ? (
          <EmptyState title="No goals yet" icon={<Target className="size-5" />}>Hand one over above and the agents start straight away.</EmptyState>
        ) : (
          <div className="space-y-3">{goals.data.map((goal) => <GoalRow key={goal.id} goal={goal} />)}</div>
        )}
      </section>
    </div>
  );
}
