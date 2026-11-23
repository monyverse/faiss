import { Download } from "lucide-react";

/**
 * Small inline access/download placeholder shown wherever a template is mentioned.
 * Pass `href` once an approved file or link exists; until then it stays disabled.
 */
export function TemplateChip({ name, href }: { name: string; href?: string }) {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={`Download ${name}`}
        className="ml-2 inline-flex items-center gap-1 rounded border border-maroon/40 px-1.5 py-0.5 align-middle text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-maroon hover:bg-blush"
      >
        <Download className="h-3 w-3" aria-hidden /> Download
      </a>
    );
  }
  return (
    <span
      role="note"
      aria-label={`${name}: template to be added`}
      title="Template to be added"
      className="ml-2 inline-flex cursor-not-allowed items-center gap-1 rounded border border-dashed border-border px-1.5 py-0.5 align-middle text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground"
    >
      <Download className="h-3 w-3" aria-hidden /> Template to be added
    </span>
  );
}

const FORUM_TEMPLATES: Record<string, string[]> = {
  "workstream-sessions": ["Workstream L2 Plan", "Workstream level RAID log", "Workstream Status Report"],
  "transaction-working-group": ["Workstream Status Report"],
  "internal-steerco": ["Joint SteerCo Pack"],
  "joint-steerco": ["Joint SteerCo Pack"],
};

/** Compact list of template placeholders for a governance forum. */
export function TemplatePlaceholders({ forumId }: { forumId: string }) {
  const items = FORUM_TEMPLATES[forumId];
  if (!items?.length) return null;
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-2">
      {items.map((name) => (
        <li key={name} className="text-sm text-foreground">
          {name}
          <TemplateChip name={name} />
        </li>
      ))}
    </ul>
  );
}
