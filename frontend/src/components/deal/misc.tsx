/** The smaller deal tabs: briefing, team, centralisation and the deal-scoped assistant. */
import * as Checkbox from "@radix-ui/react-checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, FileText, Scale, Trash2, UserPlus } from "lucide-react";
import { useState, type FormEvent } from "react";

import type { DealDetail, MemberRole } from "@/lib/api";
import { errorMessage } from "@/lib/api";
import { formatDateTime, initials } from "@/lib/format";
import { api, useApiQuery, useDirectory, useIdentity, useLookups, useMeta } from "@/lib/queries";

import { Chat } from "../chat";
import { Markdown } from "../markdown";
import { Badge, Button, Card, Chip, EmptyState, ErrorState, Field, LoadingCards, Notice, SectionTitle, Select, Textarea, Tile, cx } from "../ui";

// ---------------------------------------------------------------- briefing

export function BriefingTab({ deal }: { deal: DealDetail }) {
  const { person } = useLookups();
  const query = useApiQuery(["deal", deal.id, "briefing"], () => api.briefing(deal.id));
  if (query.isPending) return <LoadingCards count={2} />;
  if (query.isError) return <ErrorState error={query.error} onRetry={() => void query.refetch()} what="The briefing" />;
  const briefing = query.data;
  if (briefing.status === "none" || !briefing.markdown) {
    return (
      <EmptyState title="No committee briefing yet" icon={<FileText className="size-5" />}>
        Hand over a diligence goal and the Deal Supervisor agent drafts one from the evidence in this workspace. Submitting it always waits for a person's approval.
      </EmptyState>
    );
  }
  const submitted = briefing.status === "submitted";
  return (
    <div className="space-y-4">
      <Card className="flex flex-wrap items-center gap-x-4 gap-y-2 p-4">
        <Badge tone={submitted ? "ok" : "medium"}>{submitted ? "Submitted" : "Draft"}</Badge>
        <p className="text-sm text-ink-soft">
          {submitted
            ? `Submitted to ${briefing.submitted_to ?? "the forum"}${briefing.approved_by ? `, approved by ${person(briefing.approved_by)}` : ""}${briefing.submitted_at ? ` on ${formatDateTime(briefing.submitted_at)}` : ""}.`
            : "Drafted by agents. It has not been submitted: that needs a person's approval."}
        </p>
      </Card>
      <Card as="article" className="p-4 md:p-6">
        <Markdown text={briefing.markdown} />
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------- team

const ROLES: { value: MemberRole; label: string }[] = [
  { value: "deal_lead", label: "Deal lead" },
  { value: "member", label: "Member" },
  { value: "viewer", label: "Viewer (read-only)" },
];

export function TeamTab({ deal }: { deal: DealDetail }) {
  const client = useQueryClient();
  const identity = useIdentity();
  const meta = useMeta().data;
  const directory = useDirectory().data ?? [];
  const { workstream, person } = useLookups();
  const key = [identity, "deal", deal.id, "members"];
  const members = useApiQuery(["deal", deal.id, "members"], () => api.members(deal.id));
  const canManage = deal.access?.can_manage ?? false;
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState<MemberRole>("member");
  const [scope, setScope] = useState("*");
  const set = useMutation({
    mutationFn: (body: { user_id: string; role: MemberRole; workstreams: string[] }) => api.setMember(deal.id, body),
    onSuccess: (data) => {
      client.setQueryData(key, data);
      setUserId("");
    },
  });
  const remove = useMutation({
    mutationFn: (id: string) => api.removeMember(deal.id, id),
    onSuccess: (data) => client.setQueryData(key, data),
  });

  if (members.isPending) return <LoadingCards count={2} />;
  if (members.isError) return <ErrorState error={members.error} onRetry={() => void members.refetch()} what="The team" />;
  const onDeal = new Set(members.data.map((m) => m.user_id));
  const candidates = directory.filter((p) => !onDeal.has(p.sub));
  const scopeOptions = [{ value: "*", label: "All workstreams" }, ...(meta?.workstreams ?? []).map((w) => ({ value: w.id, label: w.name }))];
  const add = (event: FormEvent) => {
    event.preventDefault();
    if (userId) set.mutate({ user_id: userId, role, workstreams: [scope] });
  };

  return (
    <div className="space-y-6">
      <section>
        <SectionTitle hint="Only these people can open this deal. A member limited to a workstream sees only that workstream's documents, findings and tasks.">Team</SectionTitle>
        <ul className="space-y-2.5">
          {members.data.map((member) => {
            const title = directory.find((p) => p.sub === member.user_id)?.title;
            return (
              <Card as="li" key={member.user_id} className="p-3.5 md:p-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Tile text={initials(person(member.user_id))} tone={member.role === "deal_lead" ? "maroon" : "plain"} />
                  <div className="min-w-0 flex-1 basis-40">
                    <p className="font-medium text-ink">{person(member.user_id)}</p>
                    <p className="text-xs text-ink-mute">{title ?? member.user_id}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {canManage ? (
                      <Select label={`Role of ${person(member.user_id)}`} value={member.role} onChange={(next) => set.mutate({ user_id: member.user_id, role: next as MemberRole, workstreams: member.workstreams })} options={ROLES} className="w-44" />
                    ) : (
                      <Badge tone={member.role === "deal_lead" ? "amber" : "info"}>{ROLES.find((r) => r.value === member.role)?.label ?? member.role}</Badge>
                    )}
                    {canManage ? (
                      <Button variant="danger" disabled={remove.isPending} onClick={() => remove.mutate(member.user_id)} icon={<Trash2 className="size-4" />} aria-label={`Remove ${person(member.user_id)}`}>Remove</Button>
                    ) : null}
                  </div>
                </div>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {member.workstreams.map((w) => <Chip key={w} className={cx(w === "*" && "tint-ok border")}>{workstream(w)}</Chip>)}
                </div>
              </Card>
            );
          })}
        </ul>
        {set.isError ? <Notice tone="error" className="mt-3">{errorMessage(set.error)}</Notice> : null}
        {remove.isError ? <Notice tone="error" className="mt-3">{errorMessage(remove.error)}</Notice> : null}
      </section>

      {canManage ? (
        <section>
          <SectionTitle>Add someone</SectionTitle>
          <Card className="p-4">
            {candidates.length === 0 ? (
              <p className="text-sm text-ink-mute">{directory.length ? "Everyone in the directory is already on this deal." : "People are added from the bank's directory, which is not available in this view."}</p>
            ) : (
              <form onSubmit={add} className="grid gap-3 md:grid-cols-[2fr_1fr_2fr_auto] md:items-end">
                <Field label="Person"><Select label="Person" value={userId} onChange={setUserId} placeholder="Choose a person" options={candidates.map((p) => ({ value: p.sub, label: `${p.name} · ${p.title}` }))} /></Field>
                <Field label="Role"><Select label="Role" value={role} onChange={(v) => setRole(v as MemberRole)} options={ROLES} /></Field>
                <Field label="Access"><Select label="Access" value={scope} onChange={setScope} options={scopeOptions} /></Field>
                <Button type="submit" variant="primary" busy={set.isPending} disabled={!userId} icon={<UserPlus className="size-4" />}>Add</Button>
              </form>
            )}
          </Card>
        </section>
      ) : (
        <Notice>Only a deal lead or a Group M&amp;A Director can change who is on this deal.</Notice>
      )}
    </div>
  );
}

// ---------------------------------------------------------------- centralisation

export function CentralisationTab({ deal }: { deal: DealDetail }) {
  const client = useQueryClient();
  const identity = useIdentity();
  const meta = useMeta().data;
  const { workstream: workstreamName, person } = useLookups();
  const query = useApiQuery(["deal", deal.id, "centralisation"], () => api.centralisation(deal.id));
  const [workstream, setWorkstream] = useState("");
  const [answers, setAnswers] = useState<("yes" | "no" | null)[]>([null, null, null]);
  const [rationale, setRationale] = useState("");
  const record = useMutation({
    mutationFn: () => api.recordCentralisation(deal.id, { workstream, answers: answers as ("yes" | "no")[], rationale: rationale.trim() }),
    onSuccess: () => {
      setAnswers([null, null, null]);
      setRationale("");
      void client.invalidateQueries({ queryKey: [identity, "deal", deal.id, "centralisation"] });
    },
  });
  if (query.isPending) return <LoadingCards count={2} />;
  if (query.isError) return <ErrorState error={query.error} onRetry={() => void query.refetch()} what="Centralisation" />;
  const test = query.data.test ?? meta?.centralisation_test;
  const canDecide = deal.access?.can_manage ?? false;
  const ready = workstream && answers.every(Boolean) && rationale.trim().length >= 10;
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (ready) record.mutate();
  };

  return (
    <div className="space-y-6">
      <Card as="section" className="flex gap-3 border-amber/35 bg-amber/[0.05] p-4">
        <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-amber/40 text-amber"><Scale className="size-4" /></span>
        <div>
          <p className="font-medium text-ink">A person decides this. Agents never do.</p>
          <p className="mt-0.5 text-sm text-ink-soft">
            Whether a workstream is centralised is a judgement the methodology reserves for people. You answer the three questions and give your reasons; the outcome follows from your answers
            ({test.outcomeIfAllYes.toLowerCase()} only if all three are yes, otherwise {test.outcomeIfAnyNo.toLowerCase()}) and is recorded in the audit trail under your name.
          </p>
        </div>
      </Card>

      {canDecide ? (
        <section>
          <SectionTitle>The three-question test</SectionTitle>
          <Card className="p-4 md:p-5">
            <form onSubmit={submit} className="space-y-5">
              <Field label="Workstream" className="max-w-md">
                <Select label="Workstream" value={workstream} onChange={setWorkstream} placeholder="Choose a workstream" options={(meta?.workstreams ?? []).map((w) => ({ value: w.id, label: w.name }))} />
              </Field>
              {test.questions.map((question, index) => (
                <fieldset key={index}>
                  <legend className="text-sm font-medium text-ink"><span className="tnum mr-2 text-ink-mute">{index + 1}.</span>{question}</legend>
                  <div className="mt-2 flex gap-2" role="radiogroup" aria-label={question}>
                    {(["yes", "no"] as const).map((option) => {
                      const selected = answers[index] === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          onClick={() => setAnswers((a) => a.map((v, i) => (i === index ? option : v)))}
                          className={cx("inline-flex min-h-11 min-w-24 items-center justify-center gap-1.5 rounded-lg border px-4 text-sm font-medium capitalize", selected ? "border-amber bg-amber/15 text-amber" : "border-line-strong/70 bg-raised text-ink-soft hover:text-ink")}
                        >
                          {selected ? <Check className="size-4" /> : null}
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              ))}
              <Field label="Rationale" hint="At least a sentence: why you answered this way. It is kept with the decision.">
                <Textarea value={rationale} onChange={(e) => setRationale(e.target.value)} maxLength={4000} />
              </Field>
              <Button type="submit" variant="primary" busy={record.isPending} disabled={!ready}>Record my decision</Button>
              {record.isError ? <Notice tone="error">{errorMessage(record.error)}</Notice> : null}
              {record.isSuccess ? <Notice tone="ok">Recorded. Outcome for {workstreamName(record.data.workstream)}: <strong className="font-semibold">{record.data.outcome}</strong>.</Notice> : null}
            </form>
          </Card>
        </section>
      ) : (
        <Notice>Only a deal lead or a Group M&amp;A Director can record a centralisation decision on this deal.</Notice>
      )}

      <section>
        <SectionTitle>Decisions recorded</SectionTitle>
        {query.data.assessments.length === 0 ? (
          <Notice>No centralisation decision has been recorded on this deal.</Notice>
        ) : (
          <ul className="space-y-2.5">
            {query.data.assessments.map((row) => (
              <Card as="li" key={row.id} className="p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium text-ink">{workstreamName(row.workstream)}</p>
                  <Badge tone={row.outcome === test.outcomeIfAllYes ? "ok" : "info"}>{row.outcome}</Badge>
                  <span className="text-xs text-ink-mute">Answers: {row.answers.join(" · ")}</span>
                </div>
                <p className="mt-2 text-sm text-ink-soft [overflow-wrap:anywhere]">{row.rationale}</p>
                <p className="mt-1.5 text-xs text-ink-mute">Decided by {person(row.decided_by)}{row.created_at ? ` · ${formatDateTime(row.created_at)}` : ""}</p>
              </Card>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

// ---------------------------------------------------------------- assistant

export function DealAssistantTab({ deal }: { deal: DealDetail }) {
  const meta = useMeta().data;
  const identity = useIdentity();
  return (
    <Card className="h-[calc(100dvh-17rem)] min-h-[26rem] overflow-hidden lg:h-[calc(100dvh-15rem)]">
      <Chat
        key={`${identity}-${deal.id}`}
        api={api}
        dealId={deal.id}
        mode={meta?.reasoning}
        className="h-full"
        heading={`Ask about ${deal.code_name}`}
        intro="Answers use this deal's documents and stage as well as the approved methodology, and show their sources."
        suggestions={[
          `What does the methodology require at the ${deal.stage_title || "current"} stage?`,
          "What do the uploaded financial statements say about asset quality?",
          "Which governance forum approves an investment committee briefing?",
          "Which regulators do we need to engage for this deal?",
        ]}
      />
    </Card>
  );
}

/** A country picker built on Radix Checkbox, used by the new-deal dialog. */
export function CountryPicker({ options, value, onChange }: { options: { iso: string; name: string }[]; value: string[]; onChange: (next: string[]) => void }) {
  return (
    <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
      {options.map((country) => {
        const checked = value.includes(country.iso);
        return (
          <label key={country.iso} className={cx("flex min-h-11 cursor-pointer items-center gap-2.5 rounded-lg border px-2.5 text-sm", checked ? "border-amber/60 bg-amber/10 text-ink" : "border-line bg-canvas/40 text-ink-soft hover:border-line-strong")}>
            <Checkbox.Root
              checked={checked}
              onCheckedChange={(next) => onChange(next === true ? [...value, country.iso] : value.filter((iso) => iso !== country.iso))}
              className={cx("inline-flex size-5 shrink-0 items-center justify-center rounded border", checked ? "border-amber bg-amber text-[oklch(0.2_0.03_70)]" : "border-line-strong")}
            >
              <Checkbox.Indicator><Check className="size-3.5" strokeWidth={3} /></Checkbox.Indicator>
            </Checkbox.Root>
            <span className="min-w-0 truncate">{country.name}</span>
          </label>
        );
      })}
    </div>
  );
}
