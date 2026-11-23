import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Ban, Check, ChevronRight, CircleCheck, CircleDashed, CircleDot, Hand, Pause, Play, ShieldCheck, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";

import type { Approval, Ask, GoalDetail as GoalDetailData, GoalEvent, GoalState, GoalSummary } from "@/lib/api";
import { errorMessage } from "@/lib/api";
import { actorName, describeEvent } from "@/lib/events";
import { formatTime, formatUsd, timeAgo } from "@/lib/format";
import { api, useApiQuery, useIdentity, useLookups, useMeta } from "@/lib/queries";

import { Badge, Button, Card, ErrorState, Field, Input, LoadingCards, Notice, SectionTitle, Textarea, cx, type Tone } from "./ui";

const STATE: Record<GoalState, { label: string; tone: Tone }> = {
  planning: { label: "Planning", tone: "low" },
  running: { label: "Running", tone: "low" },
  awaiting_input: { label: "Needs an answer", tone: "amber" },
  awaiting_approval: { label: "Needs approval", tone: "amber" },
  paused: { label: "Paused", tone: "info" },
  done: { label: "Done", tone: "ok" },
  failed: { label: "Stopped", tone: "critical" },
  cancelled: { label: "Cancelled", tone: "info" },
};
const COMPLETION: Record<string, { label: string; tone: Tone }> = {
  verified: { label: "Verified: every requirement met", tone: "ok" },
  partially_met: { label: "Partially met", tone: "medium" },
  unmet: { label: "Requirements not met", tone: "critical" },
};
export const LIVE_STATES: GoalState[] = ["planning", "running"];
export const WAITING_STATES: GoalState[] = ["awaiting_input", "awaiting_approval", "paused"];

export function GoalStateBadge({ state }: { state: GoalState }) {
  const { label, tone } = STATE[state] ?? { label: state, tone: "info" as Tone };
  const live = LIVE_STATES.includes(state);
  return (
    <Badge tone={tone}>
      {live ? <span aria-hidden className="size-1.5 rounded-full bg-current [animation:faiss-pulse_1.2s_ease-in-out_infinite]" /> : null}
      {label}
    </Badge>
  );
}

export function GoalRow({ goal, showDeal }: { goal: GoalSummary; showDeal?: boolean }) {
  const { tasks_done, tasks_total } = goal.progress;
  const pct = tasks_total ? Math.round((100 * tasks_done) / tasks_total) : 0;
  return (
    <Link
      to="/deals/$dealId"
      params={{ dealId: goal.deal_id }}
      search={{ tab: "goals", goal: goal.id }}
      className="group flex items-center gap-3 rounded-card border border-line bg-panel p-4 transition-colors hover:border-line-strong"
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <GoalStateBadge state={goal.state} />
          {goal.completion ? <Badge tone={COMPLETION[goal.completion.status]?.tone ?? "info"}>{COMPLETION[goal.completion.status]?.label ?? goal.completion.status}</Badge> : null}
          {showDeal && goal.deal_code_name ? <span className="text-xs font-medium text-ink-soft">{goal.deal_code_name}</span> : null}
        </div>
        <p className="mt-2 font-medium text-ink [overflow-wrap:anywhere]">{goal.objective}</p>
        {goal.state_reason ? <p className="mt-0.5 text-sm text-ink-mute">{goal.state_reason}</p> : null}
        <div className="mt-3 flex items-center gap-3">
          <div className="h-1.5 max-w-xs flex-1 overflow-hidden rounded-full bg-line" role="progressbar" aria-valuemin={0} aria-valuemax={tasks_total} aria-valuenow={tasks_done} aria-label="Tasks done">
            <div className="h-full rounded-full bg-amber" style={{ width: `${pct}%` }} />
          </div>
          <p className="tnum shrink-0 text-xs text-ink-mute">
            {tasks_total ? `${tasks_done} of ${tasks_total} tasks` : "Planning"} · {timeAgo(goal.updated_at)}
          </p>
        </div>
      </div>
      <ChevronRight className="size-5 shrink-0 text-ink-mute transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
    </Link>
  );
}

// ---------------------------------------------------------------- approvals

export function ApprovalCard({ approval, showDeal, onDecided }: { approval: Approval; showDeal?: boolean; onDecided?: () => void }) {
  const client = useQueryClient();
  const identity = useIdentity();
  const [note, setNote] = useState("");
  const decide = useMutation({
    mutationFn: (approve: boolean) => api.decideApproval(approval.id, { approve, note }),
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: [identity] });
      onDecided?.();
    },
  });
  const payload = Object.entries(approval.payload ?? {}).filter(([, value]) => typeof value === "string" || typeof value === "number");
  return (
    <Card as="article" className="border-amber/35 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={approval.state === "pending" ? "amber" : approval.state === "approved" ? "ok" : "critical"}>
          <ShieldCheck className="size-3" />
          {approval.state === "pending" ? "Waiting for a person" : approval.state === "approved" ? "Approved" : "Rejected"}
        </Badge>
        {showDeal ? (
          <Link to="/deals/$dealId" params={{ dealId: approval.deal_id }} search={approval.goal_id ? { tab: "goals", goal: approval.goal_id } : {}} className="text-sm font-medium text-rose underline-offset-2 hover:underline">
            {approval.deal_code_name}
          </Link>
        ) : null}
        <span className="text-xs text-ink-mute">{timeAgo(approval.created_at)}</span>
      </div>
      <p className="mt-2.5 font-medium text-ink [overflow-wrap:anywhere]">{approval.summary}</p>
      <dl className="mt-2 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
        <div className="flex gap-2"><dt className="shrink-0 text-ink-mute">Asked by</dt><dd className="text-ink-soft">{approval.requested_by}</dd></div>
        <div className="flex min-w-0 gap-2"><dt className="shrink-0 text-ink-mute">Action</dt><dd className="font-mono text-[0.78rem] text-ink-soft [overflow-wrap:anywhere]">{approval.action}</dd></div>
        {payload.map(([key, value]) => (
          <div key={key} className="flex min-w-0 gap-2"><dt className="shrink-0 capitalize text-ink-mute">{key.replace(/_/g, " ")}</dt><dd className="text-ink-soft [overflow-wrap:anywhere]">{String(value)}</dd></div>
        ))}
      </dl>
      {approval.state !== "pending" ? (
        <p className="mt-3 text-sm text-ink-mute">
          Decided by {approval.decided_by ?? "—"}
          {approval.decision_note ? `: “${approval.decision_note}”` : ""}
        </p>
      ) : approval.can_decide ? (
        <div className="mt-3.5 border-t border-line pt-3.5">
          <Field label="Note (kept in the audit trail)">
            <Input value={note} onChange={(e) => setNote(e.target.value)} maxLength={1000} placeholder="Why you are approving or rejecting" />
          </Field>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button variant="primary" busy={decide.isPending && decide.variables === true} disabled={decide.isPending} onClick={() => decide.mutate(true)} icon={<Check className="size-4" />}>
              Approve
            </Button>
            <Button variant="danger" busy={decide.isPending && decide.variables === false} disabled={decide.isPending} onClick={() => decide.mutate(false)} icon={<X className="size-4" />}>
              Reject
            </Button>
          </div>
          {decide.isError ? <Notice tone="error" className="mt-3">{errorMessage(decide.error)}</Notice> : null}
        </div>
      ) : (
        <Notice className="mt-3">Only a deal lead or a Group M&amp;A Director can decide this. Agents never can.</Notice>
      )}
    </Card>
  );
}

// ---------------------------------------------------------------- questions

function AskForm({ goalId, ask, canAnswer, onAnswered }: { goalId: string; ask: Ask; canAnswer: boolean; onAnswered: () => void }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [text, setText] = useState("");
  const answer = useMutation({
    mutationFn: (skip: boolean) => {
      if (skip) return api.answerGoal(goalId, { ask_id: ask.id, skip: true });
      const out: Record<string, number | string> = {};
      for (const field of ask.fields) {
        const raw = (values[field.key] ?? "").trim();
        if (!raw) continue;
        out[field.key] = field.type === "text" ? raw : Number(raw);
      }
      return api.answerGoal(goalId, { ask_id: ask.id, values: out, text });
    },
    onSuccess: onAnswered,
  });
  const missing = ask.fields.some((f) => f.optional !== true && !(values[f.key] ?? "").trim());
  const submit = (event: FormEvent) => {
    event.preventDefault();
    answer.mutate(false);
  };
  return (
    <Card as="article" className="border-amber/35 p-4">
      <Badge tone="amber"><Hand className="size-3" /> Waiting for your answer</Badge>
      <p className="mt-2.5 font-medium text-ink">{ask.text}</p>
      {canAnswer ? (
        <form onSubmit={submit} className="mt-3.5">
          <div className="grid gap-3 sm:grid-cols-2">
            {ask.fields.map((field) => (
              <Field key={field.key} label={field.label} {...(field.optional === true ? { hint: "Optional" } : {})}>
                <Input
                  name={field.key}
                  type={field.type === "text" ? "text" : "number"}
                  inputMode={field.type === "text" ? "text" : "decimal"}
                  step="any"
                  value={values[field.key] ?? ""}
                  onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                  className="tnum"
                />
              </Field>
            ))}
          </div>
          <Field label={ask.fields.length ? "Note (optional)" : "Your answer"} className="mt-3">
            <Textarea value={text} onChange={(e) => setText(e.target.value)} maxLength={4000} className="min-h-16" />
          </Field>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button type="submit" variant="primary" busy={answer.isPending && answer.variables === false} disabled={answer.isPending || (ask.fields.length ? missing : text.trim().length === 0)}>
              Send answer
            </Button>
            <Button busy={answer.isPending && answer.variables === true} disabled={answer.isPending} onClick={() => answer.mutate(true)}>
              Skip this question
            </Button>
          </div>
          <p className="mt-2 text-xs text-ink-mute">If you skip, the agent carries on without it and records the gap against the requirement.</p>
          {answer.isError ? <Notice tone="error" className="mt-3">{errorMessage(answer.error)}</Notice> : null}
        </form>
      ) : (
        <Notice className="mt-3">Only the person who set this goal, or a deal lead, can answer.</Notice>
      )}
    </Card>
  );
}

// ---------------------------------------------------------------- the activity log

/** Follows the goal's append-only log with `?after=<seq>`: every 2s while it works, slowly while it waits. */
function useGoalEvents(goalId: string, state: GoalState | undefined, onNews: () => void) {
  const identity = useIdentity();
  const [events, setEvents] = useState<GoalEvent[]>([]);
  const [error, setError] = useState<unknown>(null);
  const [loaded, setLoaded] = useState(false);
  const seq = useRef(0);
  const news = useRef(onNews);
  news.current = onNews;
  const interval = !state ? 2000 : LIVE_STATES.includes(state) ? 2000 : WAITING_STATES.includes(state) ? 6000 : 0;

  useEffect(() => {
    seq.current = 0;
    setEvents([]);
    setLoaded(false);
    setError(null);
  }, [goalId, identity]);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const tick = async () => {
      try {
        const result = await api.goalEvents(goalId, seq.current);
        if (cancelled) return;
        const fresh = result.events.filter((e) => e.seq > seq.current);
        if (fresh.length) {
          seq.current = fresh[fresh.length - 1]?.seq ?? seq.current;
          setEvents((current) => [...current, ...fresh]);
        }
        if (fresh.length || result.state !== state) news.current();
        setLoaded(true);
        setError(null);
      } catch (e) {
        if (!cancelled) setError(e);
      }
      if (!cancelled && interval) timer = setTimeout(() => void tick(), interval);
    };
    void tick();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [goalId, identity, interval, state]);

  return { events, error, loaded, following: interval === 2000 };
}

const DOT: Record<string, string> = { plain: "bg-line-strong", attention: "bg-amber", good: "bg-ok", bad: "bg-sev-critical" };

function ActivityLog({ events, loaded, error, following }: { events: GoalEvent[]; loaded: boolean; error: unknown; following: boolean }) {
  const meta = useMeta().data;
  const { person } = useLookups();
  return (
    <section>
      <SectionTitle hint="Everything the agents did, in order. The log is append-only." action={following ? <Badge tone="low"><span aria-hidden className="size-1.5 rounded-full bg-current [animation:faiss-pulse_1.2s_ease-in-out_infinite]" />Live</Badge> : null}>
        Activity
      </SectionTitle>
      {error && !events.length ? (
        <ErrorState error={error} what="The activity log" />
      ) : !loaded ? (
        <LoadingCards count={2} />
      ) : events.length === 0 ? (
        <Notice>Nothing has happened yet.</Notice>
      ) : (
        <Card className="p-4">
          <ol className="relative space-y-4 before:absolute before:bottom-1 before:left-[0.3rem] before:top-1.5 before:w-px before:bg-line" aria-live="polite">
            {events.map((event) => {
              const line = describeEvent(event, actorName(event.actor, meta, person));
              return (
                <li key={event.seq} className="relative pl-6">
                  <span aria-hidden className={cx("absolute left-0 top-1.5 size-[0.7rem] rounded-full ring-4 ring-panel", DOT[line.tone])} />
                  <p className="text-sm text-ink [overflow-wrap:anywhere]">
                    {line.title}
                    <span className="tnum ml-2 whitespace-nowrap text-xs text-ink-mute">{formatTime(event.ts)}</span>
                  </p>
                  {line.detail ? <p className="mt-0.5 text-sm text-ink-mute [overflow-wrap:anywhere]">{line.detail}</p> : null}
                  {line.items?.length ? (
                    <ul className="mt-1 list-disc space-y-0.5 pl-4 text-sm text-ink-mute marker:text-line-strong">
                      {line.items.map((item, i) => <li key={i} className="[overflow-wrap:anywhere]">{item}</li>)}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </Card>
      )}
    </section>
  );
}

// ---------------------------------------------------------------- goal detail

const TASK: Record<string, { label: string; tone: Tone; icon: typeof Check }> = {
  pending: { label: "Not started", tone: "info", icon: CircleDashed },
  running: { label: "Working", tone: "low", icon: CircleDot },
  blocked: { label: "Waiting for an answer", tone: "amber", icon: Hand },
  awaiting_approval: { label: "Waiting for approval", tone: "amber", icon: ShieldCheck },
  done: { label: "Done", tone: "ok", icon: CircleCheck },
  failed: { label: "Failed", tone: "critical", icon: Ban },
};

export function GoalDetail({ goalId }: { goalId: string }) {
  const client = useQueryClient();
  const identity = useIdentity();
  const query = useApiQuery(["goal", goalId], () => api.goal(goalId));
  const goal = query.data;
  const refresh = () => {
    void client.invalidateQueries({ queryKey: [identity, "goal", goalId] });
    void client.invalidateQueries({ queryKey: [identity, "approvals"] });
    void client.invalidateQueries({ queryKey: [identity, "goals"] });
    if (goal) void client.invalidateQueries({ queryKey: [identity, "deal", goal.deal_id] });
  };
  const log = useGoalEvents(goalId, goal?.state, refresh);
  const approvals = useApiQuery(["approvals", "pending"], () => api.approvals("pending"), { enabled: !!goal && goal.state === "awaiting_approval" });
  const control = useMutation({
    mutationFn: (action: "pause" | "resume" | "cancel") => api.controlGoal(goalId, action),
    onSuccess: refresh,
  });

  if (query.isPending) return <LoadingCards count={3} />;
  if (query.isError) return <ErrorState error={query.error} onRetry={() => void query.refetch()} what="This goal" />;
  const g: GoalDetailData = query.data;
  const terminal = ["done", "failed", "cancelled"].includes(g.state);
  const pending = (approvals.data ?? []).filter((a) => a.goal_id === g.id);
  const completion = g.completion ? COMPLETION[g.completion.status] : undefined;

  return (
    <div className="space-y-6">
      <Card as="section" className="p-4 md:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <GoalStateBadge state={g.state} />
          {completion ? <Badge tone={completion.tone}>{completion.label}</Badge> : null}
          {g.restricted_view ? <Badge tone="info">Your workstreams only</Badge> : null}
        </div>
        <h2 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-ink [overflow-wrap:anywhere]">{g.objective}</h2>
        {g.state_reason ? <p className="mt-1 text-sm text-ink-soft">{g.state_reason}</p> : null}
        <dl className="tnum mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-4">
          <div><dt className="text-xs uppercase tracking-wider text-ink-mute">Spend</dt><dd className="mt-0.5 font-medium text-amber">{formatUsd(g.spent_usd)} <span className="font-normal text-ink-mute">of {formatUsd(g.budget_usd)}</span></dd></div>
          <div><dt className="text-xs uppercase tracking-wider text-ink-mute">Tasks</dt><dd className="mt-0.5 font-medium text-ink">{g.progress.tasks_done} <span className="font-normal text-ink-mute">of {g.progress.tasks_total}</span></dd></div>
          <div><dt className="text-xs uppercase tracking-wider text-ink-mute">Work cycles</dt><dd className="mt-0.5 font-medium text-ink">{g.cycle} <span className="font-normal text-ink-mute">of {g.max_cycles} allowed</span></dd></div>
          <div><dt className="text-xs uppercase tracking-wider text-ink-mute">Set by</dt><dd className="mt-0.5 font-medium text-ink"><PersonName sub={g.created_by} /></dd></div>
        </dl>
        {g.can_control && !terminal ? (
          <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
            {g.state === "paused" ? (
              <Button busy={control.isPending && control.variables === "resume"} disabled={control.isPending} onClick={() => control.mutate("resume")} icon={<Play className="size-4" />}>Resume</Button>
            ) : (
              <Button busy={control.isPending && control.variables === "pause"} disabled={control.isPending} onClick={() => control.mutate("pause")} icon={<Pause className="size-4" />}>Pause</Button>
            )}
            <Button variant="danger" busy={control.isPending && control.variables === "cancel"} disabled={control.isPending} onClick={() => { if (window.confirm("Cancel this goal? Work recorded so far is kept.")) control.mutate("cancel"); }} icon={<Ban className="size-4" />}>
              Cancel goal
            </Button>
          </div>
        ) : null}
        {control.isError ? <Notice tone="error" className="mt-3">{errorMessage(control.error)}</Notice> : null}
      </Card>

      {g.asks.length || pending.length ? (
        <section className="space-y-3">
          <SectionTitle hint="The agents stopped here and will carry on as soon as you respond.">Needs you</SectionTitle>
          {g.asks.map((ask) => <AskForm key={ask.id} goalId={g.id} ask={ask} canAnswer={!!g.can_control} onAnswered={refresh} />)}
          {pending.map((approval) => <ApprovalCard key={approval.id} approval={approval} onDecided={refresh} />)}
        </section>
      ) : g.state === "awaiting_approval" && approvals.isPending ? (
        <LoadingCards count={1} />
      ) : g.state === "awaiting_approval" && !pending.length ? (
        <Notice tone="warn">This goal is waiting for an approval that only a deal lead or a Group M&amp;A Director can see and decide.</Notice>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <SectionTitle hint="Checked one by one before the goal can close.">Requirements</SectionTitle>
          {g.requirements.length === 0 ? (
            <Notice>{terminal ? "No requirements were recorded." : "The plan is being drawn up."}</Notice>
          ) : (
            <Card className="divide-y divide-line">
              {g.requirements.map((req) => {
                const checked = req.status === "met" || req.status === "unmet";
                const met = req.status === "met";
                return (
                  <div key={req.id} className="flex gap-3 p-3.5">
                    <span className={cx("mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border", met ? "tint-ok" : checked ? "tint-sev-critical" : "border-line-strong text-ink-mute")}>
                      {met ? <Check className="size-3.5" strokeWidth={3} /> : checked ? <X className="size-3.5" strokeWidth={3} /> : <CircleDashed className="size-3.5" />}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm text-ink"><span className="tnum mr-1.5 font-mono text-xs text-ink-mute">{req.id}</span>{req.text}</p>
                      <p className={cx("mt-0.5 text-xs", met ? "text-ok" : checked ? "text-sev-critical" : "text-ink-mute")}>
                        {met ? "Met" : checked ? "Not met" : "Not checked yet"}
                        {req.note ? <span className="text-ink-mute"> · {req.note}</span> : null}
                      </p>
                    </div>
                  </div>
                );
              })}
            </Card>
          )}
        </section>

        <section>
          <SectionTitle hint="Each task belongs to one specialist agent.">Tasks</SectionTitle>
          {g.tasks.length === 0 ? (
            <Notice>{g.restricted_view ? "None of this goal's tasks are in your workstreams." : "No tasks yet."}</Notice>
          ) : (
            <Card className="divide-y divide-line">
              {g.tasks.map((task) => {
                const status = TASK[task.status] ?? { label: task.status, tone: "info" as Tone, icon: CircleDashed };
                return (
                  <div key={task.id} className="p-3.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-xs font-medium text-ink-mute">{task.agent_name}</p>
                      <Badge tone={status.tone}><status.icon className="size-3" />{status.label}</Badge>
                    </div>
                    <p className="mt-1 text-sm font-medium text-ink">{task.title}</p>
                    {task.summary ? <p className="mt-0.5 text-sm text-ink-mute [overflow-wrap:anywhere]">{task.summary}</p> : null}
                  </div>
                );
              })}
            </Card>
          )}
        </section>
      </div>

      <ActivityLog {...log} />
    </div>
  );
}

function PersonName({ sub }: { sub: string }) {
  return <>{useLookups().person(sub)}</>;
}
