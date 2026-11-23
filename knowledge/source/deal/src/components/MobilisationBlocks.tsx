import { useState } from "react";
import {
  AlertTriangle,
  Calendar,
  ChevronDown,
  ChevronRight,
  Compass,
  Files,
  Gavel,
  List,
  Network,
  Route as RouteIcon,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Users,
} from "lucide-react";
import type { Block, Entry } from "@/lib/mobilisation";

const ICONS: Record<string, typeof Compass> = {
  route: RouteIcon,
  compass: Compass,
  list: List,
  network: Network,
  users: Users,
  gavel: Gavel,
  files: Files,
  shield: ShieldCheck,
  sliders: SlidersHorizontal,
  alert: AlertTriangle,
  calendar: Calendar,
  sparkles: Sparkles,
};

/** Line icon for a mobilisation bucket. */
export function BucketIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? Compass;
  return <Icon className={className} />;
}

function FieldList({ fields }: { fields: Entry["fields"] }) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2">
      {fields.map((field) => (
        <div key={field.label} className="rounded-md border border-border bg-card px-4 py-3">
          <dt className="label-eyebrow">{field.label}</dt>
          <dd className="mt-1.5 text-sm leading-relaxed text-foreground">{field.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Accordion list: one entry open at a time. */
function EntryAccordion({ items }: { items: Entry[] }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="divide-y divide-border overflow-hidden rounded-md border border-border bg-card">
      {items.map((entry) => {
        const active = open === entry.title;
        return (
          <div key={entry.title}>
            <button
              type="button"
              onClick={() => setOpen(active ? null : entry.title)}
              className="flex w-full items-center gap-3 px-5 py-3.5 text-left transition-colors hover:bg-surface"
              aria-expanded={active}
            >
              <span
                className={`flex-1 text-sm font-medium ${active ? "text-maroon" : "text-foreground"}`}
              >
                {entry.title}
              </span>
              {active ? (
                <ChevronDown className="h-4 w-4 shrink-0 text-maroon" />
              ) : (
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
              )}
            </button>
            {active ? (
              <div className="step-fade border-t border-border bg-surface px-5 py-4">
                <FieldList fields={entry.fields} />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

/** Renders one content block of a mobilisation bucket. */
export function MobilisationBlock({ block }: { block: Block }) {
  switch (block.kind) {
    case "stages":
      return (
        <div className="space-y-4">
          <div className="no-scrollbar flex items-stretch gap-2 overflow-x-auto pb-2">
            {block.items.map((stage, i) => (
              <div key={stage.title} className="flex items-stretch gap-2">
                <div className="min-w-[9.5rem] rounded-md border border-border bg-card px-3 py-3">
                  <span className="font-display text-[0.6875rem] font-semibold text-red">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-2 block text-sm font-medium leading-snug text-maroon">
                    {stage.title}
                  </span>
                </div>
                {i < block.items.length - 1 ? (
                  <ChevronRight className="my-auto h-4 w-4 shrink-0 text-maroon/40" />
                ) : null}
              </div>
            ))}
          </div>
          <EntryAccordion items={block.items} />
        </div>
      );

    case "principles":
      return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {block.items.map((item) => (
            <div
              key={item.title}
              className="rounded-md border border-border bg-card px-5 py-5 transition-all hover:-translate-y-0.5 hover:border-maroon hover:shadow-md"
            >
              <h3 className="font-display text-sm font-semibold text-maroon">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      );

    case "groups":
      return (
        <div className="space-y-6">
          {block.items.map((group) => (
            <div key={group.title}>
              <h3 className="font-display text-sm font-semibold text-maroon">{group.title}</h3>
              <div className="mt-3">
                <EntryAccordion items={group.entries} />
              </div>
            </div>
          ))}
        </div>
      );

    case "entries":
      return <EntryAccordion items={block.items} />;

    case "list":
      return (
        <div className="rounded-md border border-border bg-card px-5 py-5">
          {block.heading ? <p className="label-eyebrow">{block.heading}</p> : null}
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {block.items.map((item) => (
              <li key={item} className="flex gap-2 text-sm leading-relaxed text-foreground">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-red" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      );

    case "compare":
      return (
        <div className="overflow-hidden rounded-md border border-border">
          <div className="grid grid-cols-3 gap-px bg-border text-xs">
            <div className="bg-surface px-4 py-2.5 label-eyebrow">Consideration</div>
            <div className="bg-surface px-4 py-2.5 label-eyebrow">Lower intensity response</div>
            <div className="bg-blush px-4 py-2.5 label-eyebrow text-maroon">
              Higher intensity response
            </div>
            {block.rows.map((row) => (
              <div key={row} className="col-span-3 grid grid-cols-3 gap-px bg-border">
                <div className="bg-card px-4 py-3 text-sm font-medium text-foreground">{row}</div>
                <div className="bg-card px-4 py-3 text-sm text-muted-foreground">
                  Detail to be added.
                </div>
                <div className="bg-card px-4 py-3 text-sm text-maroon">Detail to be added.</div>
              </div>
            ))}
          </div>
        </div>
      );

    case "gate":
      return (
        <div className="rounded-md border border-red/50 bg-card px-5 py-5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-red" />
            <p className="label-eyebrow text-red">{block.heading ?? "Control"}</p>
          </div>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {block.items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-foreground"
              >
                <span className="h-3.5 w-3.5 shrink-0 rounded-sm border border-red/60" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      );

    case "agent":
      return (
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            { label: "Inputs", items: block.inputs, tone: "border-border bg-card" },
            { label: "Agent logic", items: block.logic, tone: "border-maroon/40 bg-blush" },
            { label: "Outputs", items: block.outputs, tone: "border-border bg-card" },
          ].map((column) => (
            <div key={column.label} className={`rounded-md border px-5 py-5 ${column.tone}`}>
              <p className="label-eyebrow">{column.label}</p>
              <ul className="mt-3 space-y-1.5">
                {column.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-relaxed text-foreground">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-red" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );

    case "note":
      return (
        <div className="border-l-2 border-maroon bg-blush px-4 py-3">
          <p className="text-sm leading-relaxed text-maroon">
            <span className="mr-2 inline-flex rounded-full bg-maroon px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider text-maroon-foreground">
              N.B.
            </span>
            <span className="font-medium">{block.title}. </span>
            {block.body}
          </p>
        </div>
      );

    default:
      return null;
  }
}
