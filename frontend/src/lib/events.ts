import type { GoalEvent, Meta } from "./types";

export interface EventLine {
  title: string;
  detail?: string;
  items?: string[];
  tone: "plain" | "attention" | "good" | "bad";
}

const str = (value: unknown): string => (typeof value === "string" ? value : value == null ? "" : String(value));
const list = (value: unknown): unknown[] => (Array.isArray(value) ? value : []);
const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;
const toolName = (tool: string) => tool.split(".").pop()?.replace(/_/g, " ") ?? tool;
const STATUS: Record<string, string> = { verified: "every requirement met", partially_met: "partially met", unmet: "requirements not met" };

/** Who did it, as a person would say it: an agent's name, or the person's name. */
export function actorName(actor: string, meta: Meta | undefined, person: (sub: string) => string): string {
  if (!actor) return "The platform";
  const agent = meta?.agents.find((a) => a.key === actor);
  if (agent) return agent.name;
  return person(actor);
}

/** Each entry of a goal's log, in plain language. Unknown types fall back to a readable title. */
export function describeEvent(event: GoalEvent, who: string): EventLine {
  const p = event.payload ?? {};
  switch (event.type) {
    case "goal_created":
      return { title: `${who} handed over the goal`, detail: str(p.objective), tone: "plain" };
    case "plan_created":
      return {
        title: `${who} drew up the plan: ${plural(list(p.tasks).length, "task")} against ${plural(list(p.requirements).length, "requirement")}`,
        items: list(p.tasks).map((t) => `${str((t as { title?: unknown }).title)} (${str((t as { agent?: unknown }).agent)})`),
        tone: "plain",
      };
    case "task_started":
      return { title: `${who} started work`, detail: str(p.title), tone: "plain" };
    case "task_worked": {
      const recorded = list(p.recorded) as { kind?: unknown; severity?: unknown; title?: unknown }[];
      const tools = list(p.tools).map((t) => toolName(str(t)));
      return {
        title: `${who} ${tools.length ? `used ${tools.join(", ")} and ` : ""}recorded ${plural(recorded.length, "item")}`,
        items: [...recorded.slice(0, 4).map((r) => `${str(r.kind)}: ${str(r.title)}`), ...(recorded.length > 4 ? [`and ${recorded.length - 4} more`] : []), ...list(p.notes).map(str)],
        tone: "plain",
      };
    }
    case "task_completed":
      return { title: `${who} finished`, detail: str(p.summary), tone: "good" };
    case "question_asked":
      return { title: `${who} needs an answer and has stopped to wait for it`, detail: str(p.question), tone: "attention" };
    case "answer_received": {
      const fields = list(p.fields).map((f) => str(f).replace(/_/g, " "));
      return {
        title: p.skipped ? `${who} skipped the question` : `${who} answered${fields.length ? `: ${fields.join(", ")}` : ""}`,
        detail: str(p.note),
        tone: "plain",
      };
    }
    case "action_denied":
      return { title: `${who} was not allowed to ${toolName(str(p.tool))}`, detail: str(p.reason), tone: "bad" };
    case "approval_requested":
      return { title: `${who} is waiting for a person's approval`, detail: str(p.summary), tone: "attention" };
    case "approval_decided":
      return { title: `${who} ${str(p.decision) === "approved" ? "approved" : "rejected"} the request`, detail: str(p.note), tone: str(p.decision) === "approved" ? "good" : "bad" };
    case "deliverable_drafted":
      return { title: `${who} drafted a deliverable`, detail: str(p.title), tone: "plain" };
    case "progress_report":
      return {
        title: `Progress: ${str(p.tasks_done)} of ${str(p.tasks_total)} tasks done`,
        detail: [Number(p.open_questions) ? plural(Number(p.open_questions), "open question") : "", Number(p.open_approvals) ? plural(Number(p.open_approvals), "approval") + " pending" : ""].filter(Boolean).join(", "),
        tone: "plain",
      };
    case "completion_checked": {
      const checks = list(p.checks) as { met?: unknown }[];
      return {
        title: `Every requirement was checked before closing: ${checks.filter((c) => c.met).length} of ${checks.length} met`,
        detail: STATUS[str(p.status)] ?? str(p.status),
        tone: str(p.status) === "verified" ? "good" : "attention",
      };
    }
    case "goal_done":
      return { title: `Goal finished (${STATUS[str(p.status)] ?? str(p.status)})`, tone: str(p.status) === "verified" ? "good" : "attention" };
    case "goal_failed":
      return { title: "The goal stopped", detail: str(p.reason), tone: "bad" };
    case "goal_paused":
      return { title: `${who} paused the goal`, detail: str(p.reason), tone: "attention" };
    case "goal_resumed":
      return { title: `${who} resumed the goal`, tone: "plain" };
    case "goal_cancelled":
      return { title: `${who} cancelled the goal`, tone: "bad" };
    case "goal_edited":
      return { title: `${who} changed the goal`, detail: Object.keys(p).join(", "), tone: "plain" };
    case "documents_added":
      return { title: "New documents arrived, so work resumed", items: list(p.files).map(str), tone: "plain" };
    default:
      return { title: event.type.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase()), tone: "plain" };
  }
}
