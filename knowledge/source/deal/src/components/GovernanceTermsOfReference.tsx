import { useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  ChevronDown,
  ClipboardList,
  FileInput,
  FileOutput,
  Gavel,
  Scale,
  Sparkles,
  Target,
  UserCog,
  Users,
  Wrench,
} from "lucide-react";
import { GOVERNANCE_FORUMS, type GovernanceForum } from "@/lib/governance-forums";

function KindTag({ kind }: { kind: GovernanceForum["kind"] }) {
  return (
    <span
      className={`inline-block rounded-md border px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.12em] ${
        kind === "joint"
          ? "border-amber/50 bg-amber/15 text-foreground"
          : "border-maroon/25 bg-blush text-maroon"
      }`}
    >
      {kind === "joint" ? "Joint forum" : "Internal Absa"}
    </span>
  );
}


function DetailBlock({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        <span className="text-maroon">{icon}</span>
        {title}
      </p>
      <div className="mt-3 text-sm leading-relaxed text-foreground">{children}</div>
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-maroon/60" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function Disclosure({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-border bg-card">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-surface"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-maroon">
          <span className="text-maroon">{icon}</span>
          {title}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-maroon transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="border-t border-border px-5 py-4 text-sm leading-relaxed text-foreground">
          <Bullets items={items} />
        </div>
      )}
    </div>
  );
}

function ForumDetail({ forum }: { forum: GovernanceForum }) {
  return (
    <article className="step-fade mt-6">
      {/* Prominent chair and cadence */}
      <div className="rounded-xl border border-maroon/20 bg-blush p-5 lg:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <KindTag kind={forum.kind} />
          <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-maroon/70">
            Forum {forum.index} of {GOVERNANCE_FORUMS.length}
          </span>
        </div>
        <h3 className="mt-2 font-display text-2xl font-semibold text-maroon">{forum.name}</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-maroon/70">
              <Gavel className="h-3.5 w-3.5" />
              Chair
            </p>
            <p className="mt-1 text-sm text-foreground">{forum.chair}</p>
          </div>
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-maroon/70">
              <UserCog className="h-3.5 w-3.5" />
              Facilitator
            </p>
            <p className="mt-1 text-sm text-foreground">{forum.facilitator}</p>
          </div>
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-maroon/70">
              <CalendarClock className="h-3.5 w-3.5" />
              Cadence
            </p>
            <p className="mt-1 text-sm text-foreground">{forum.cadence}</p>
          </div>
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-maroon/70">
              <Scale className="h-3.5 w-3.5" />
              Decision making or information
            </p>
            <p className="mt-1 text-sm text-foreground">{forum.decisionType}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <DetailBlock icon={<Target className="h-3.5 w-3.5" />} title="Objective">
          <p>{forum.objective}</p>
        </DetailBlock>
        <DetailBlock icon={<Users className="h-3.5 w-3.5" />} title="Attendees">
          <p>{forum.attendees}</p>
        </DetailBlock>
      </div>

      {/* Inputs -> agenda -> outputs, visually connected */}
      <div className="mt-4 rounded-xl border border-border bg-card p-5 lg:p-6">
        <div className="grid items-stretch gap-3 lg:grid-cols-[1fr_auto_1fr]">
          <div className="rounded-lg border border-maroon/20 bg-surface p-4">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-maroon/70">
              <FileInput className="h-3.5 w-3.5" />
              Inputs
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground">{forum.inputs}</p>
          </div>
          <div className="flex items-center justify-center text-maroon/50">
            <ArrowDown className="h-4 w-4 lg:hidden" />
            <ArrowRight className="hidden h-4 w-4 lg:block" />
          </div>
          <div className="rounded-lg border border-maroon/20 bg-surface p-4">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-maroon/70">
              <FileOutput className="h-3.5 w-3.5" />
              Outputs
            </p>
            <div className="mt-2 text-sm leading-relaxed text-foreground">
              <Bullets items={forum.outputs} />
            </div>
          </div>
        </div>

        <div className="mt-5 border-t border-border pt-5">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            <ClipboardList className="h-3.5 w-3.5 text-maroon" />
            Standard agenda
          </p>
          <ol className="mt-3 space-y-2">
            {forum.agenda.map((item, i) => (
              <li key={item} className="flex gap-3 text-sm text-foreground">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-maroon text-[0.625rem] font-semibold text-maroon-foreground">
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <Disclosure
        icon={<Sparkles className="h-4 w-4" />}
        title="How do I know this meeting is functioning well?"
        items={forum.success}
      />

      <Disclosure
        icon={<Wrench className="h-4 w-4" />}
        title="What should I do if this meeting is not functioning?"
        items={forum.remedial}
      />
    </article>
  );
}

const COMPARE_ROWS = [
  { label: "Chair", get: (f: GovernanceForum) => f.chair },
  { label: "Facilitator", get: (f: GovernanceForum) => f.facilitator },
  { label: "Cadence", get: (f: GovernanceForum) => f.cadence },
  { label: "Decision making or information", get: (f: GovernanceForum) => f.decisionType },
  { label: "Inputs", get: (f: GovernanceForum) => f.inputs },
  { label: "Outputs", get: (f: GovernanceForum) => f.outputs },
  { label: "Objective", get: (f: GovernanceForum) => f.objective },
  { label: "Attendees", get: (f: GovernanceForum) => f.attendees },
  { label: "Standard agenda", get: (f: GovernanceForum) => f.agenda },
  { label: "Signs of success", get: (f: GovernanceForum) => f.success },
  { label: "Remedial Actions", get: (f: GovernanceForum) => f.remedial },
] as const;

function CellValue({ value }: { value: string | readonly string[] }) {
  if (Array.isArray(value)) {
    return (
      <ul className="space-y-1">
        {value.map((v) => (
          <li key={v} className="flex gap-1.5">
            <span className="mt-[0.4rem] h-1 w-1 shrink-0 rounded-full bg-maroon/60" />
            {v}
          </li>
        ))}
      </ul>
    );
  }
  return <span>{value as string}</span>;
}

function CompareAll() {
  const [open, setOpen] = useState<string | null>(GOVERNANCE_FORUMS[0].id);

  return (
    <>
      {/* Desktop table */}
      <div className="mt-5 hidden overflow-x-auto rounded-xl border border-border bg-card xl:block">
        <table className="w-full text-left align-top text-xs">
          <thead className="bg-surface text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
            <tr>
              <th className="w-[120px] px-3 py-3 font-semibold">Terms</th>
              {GOVERNANCE_FORUMS.map((f) => (
                <th key={f.id} className="px-3 py-3 font-semibold text-maroon">
                  {f.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARE_ROWS.map((row) => (
              <tr key={row.label} className="border-t border-border align-top">
                <th className="px-3 py-3 text-left font-semibold text-foreground">{row.label}</th>
                {GOVERNANCE_FORUMS.map((f) => (
                  <td key={f.id} className="px-3 py-3 leading-relaxed text-muted-foreground">
                    <CellValue value={row.get(f)} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Smaller screens: stacked accordions */}
      <div className="mt-5 space-y-3 xl:hidden">
        {GOVERNANCE_FORUMS.map((f) => {
          const expanded = open === f.id;
          return (
            <div key={f.id} className="overflow-hidden rounded-xl border border-border bg-card">
              <button
                type="button"
                onClick={() => setOpen(expanded ? null : f.id)}
                aria-expanded={expanded}
                className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-surface"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-maroon">{f.name}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">{f.cadence}</span>
                </span>
                <KindTag kind={f.kind} />
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-maroon transition-transform ${
                    expanded ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expanded ? (
                <dl className="border-t border-border px-4 py-4 text-sm">
                  {COMPARE_ROWS.map((row) => (
                    <div key={row.label} className="mt-3 first:mt-0">
                      <dt className="text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        {row.label}
                      </dt>
                      <dd className="mt-1 leading-relaxed text-foreground">
                        <CellValue value={row.get(f)} />
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </div>
          );
        })}
      </div>
    </>
  );
}

export function GovernanceTermsOfReference({
  activeId: controlledId,
  onActiveIdChange,
  hideSelector = false,
}: {
  activeId?: string | undefined;
  onActiveIdChange?: ((id: string) => void) | undefined;
  hideSelector?: boolean;
} = {}) {
  const [internalId, setInternalId] = useState(GOVERNANCE_FORUMS[0].id);
  const activeId = controlledId ?? internalId;
  const setActiveId = (id: string) => {
    setInternalId(id);
    onActiveIdChange?.(id);
  };
  const forum = GOVERNANCE_FORUMS.find((f) => f.id === activeId) ?? GOVERNANCE_FORUMS[0];

  return (
    <div>
      {hideSelector ? null : (
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          The governance structure establishes how transaction progress, risks, dependencies and
          decisions move from workstream delivery through to executive oversight.
        </p>
      )}


      {/* Forum selector */}
      <div className={hideSelector ? "" : "mt-10"}>
        {hideSelector ? null : (
          <h3 className="font-display text-lg font-semibold text-maroon">
            Terms of Reference by forum
          </h3>
        )}
        <div
          hidden={hideSelector}
          role="tablist"
          aria-label="Governance forums"
          className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5"
        >
          {GOVERNANCE_FORUMS.map((f) => {
            const active = f.id === activeId;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveId(f.id)}
                className={`rounded-lg border p-3 text-left transition-colors ${
                  active
                    ? "border-maroon bg-maroon text-maroon-foreground"
                    : "border-input bg-card text-foreground hover:border-maroon/45"
                }`}
              >
                <span
                  className={`block text-[0.625rem] font-semibold uppercase tracking-[0.12em] ${
                    active ? "text-maroon-foreground/70" : "text-muted-foreground"
                  }`}
                >
                  {f.kind === "joint" ? "Joint" : "Internal Absa"} · {f.index}
                </span>
                <span className="mt-1 block text-sm font-semibold">{f.name}</span>
                <span
                  className={`mt-0.5 block text-xs ${
                    active ? "text-maroon-foreground/75" : "text-muted-foreground"
                  }`}
                >
                  {f.cadence}
                </span>
              </button>
            );
          })}
        </div>

        <ForumDetail forum={forum} />

        <nav
          aria-label="Forum pagination"
          className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5"
        >
          {GOVERNANCE_FORUMS.map((f, i) => {
            if (f.id !== activeId) return null;
            const prev = GOVERNANCE_FORUMS[i - 1];
            const next = GOVERNANCE_FORUMS[i + 1];
            return (
              <div key={f.id} className="flex w-full flex-wrap justify-between gap-3">
                {prev ? (
                  <button
                    type="button"
                    onClick={() => setActiveId(prev.id)}
                    className="inline-flex items-center gap-2 rounded-md border border-input bg-card px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-maroon/45 hover:text-maroon"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    {prev.name}
                  </button>
                ) : (
                  <span />
                )}
                {next ? (
                  <button
                    type="button"
                    onClick={() => setActiveId(next.id)}
                    className="inline-flex items-center gap-2 rounded-md border border-input bg-card px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-maroon/45 hover:text-maroon"
                  >
                    {next.name}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <span />
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Compare all */}
      <div className="mt-12" hidden={hideSelector}>
        <h3 className="font-display text-lg font-semibold text-maroon">Compare all forums</h3>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          The same Terms of Reference set out side by side, so cadence, chair and escalation route
          can be read across the five forums.
        </p>
        <CompareAll />
      </div>
    </div>
  );
}
