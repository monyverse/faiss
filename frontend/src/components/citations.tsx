import { BookOpen, FileText, Globe2, X } from "lucide-react";

import type { Citation } from "@/lib/api";

import clsx from "clsx";

const cx = clsx;

const KIND: Record<string, { label: string; icon: typeof BookOpen }> = {
  knowledge: { label: "Approved methodology", icon: BookOpen },
  document: { label: "Deal document", icon: FileText },
  "country-pack": { label: "Country pack", icon: Globe2 },
};

/** The label a citation is known by: [3] in an answer, E3 on a finding. */
export const citationRef = (citation: Citation, index: number) => citation.ref ?? String(citation.n ?? index + 1);

/** One source, in full: what kind it is, where it comes from, and the quoted passage. */
export function CitationCard({ citation, index, className }: { citation: Citation; index: number; className?: string }) {
  const kind = KIND[citation.kind ?? ""] ?? { label: "Source", icon: BookOpen };
  const Icon = kind.icon;
  const unverified = citation.kind === "country-pack";
  return (
    <article className={cx("rounded-xl border border-line bg-canvas/50 p-3.5", className)}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="tnum inline-flex h-6 min-w-6 items-center justify-center rounded-full border border-amber/45 bg-amber/15 px-1.5 text-xs font-semibold text-amber">
          {citationRef(citation, index)}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-ink-mute">
          <Icon className="size-3.5" /> {kind.label}
        </span>
        {unverified ? (
          <span className="tint-sev-high rounded-full border px-2 py-0.5 text-xs font-medium">Unverified seed data</span>
        ) : citation.status ? (
          <span className={cx("rounded-full border px-2 py-0.5 text-xs font-medium", citation.status === "approved" ? "tint-ok" : "tint-sev-medium")}>
            {citation.status === "approved" ? "Approved" : citation.status}
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-sm font-medium text-ink [overflow-wrap:anywhere]">{citation.title}</p>
      {citation.quote ? (
        <blockquote className="mt-2 whitespace-pre-line border-l-2 border-line-strong pl-3 text-sm leading-relaxed text-ink-soft [overflow-wrap:anywhere]">
          {citation.quote}
        </blockquote>
      ) : null}
      <dl className="mt-3 space-y-1 text-xs text-ink-mute">
        {citation.kind === "document" ? (
          <div className="flex gap-2">
            <dt className="shrink-0">File</dt>
            <dd className="text-ink-soft [overflow-wrap:anywhere]">
              {citation.filename ?? citation.title}
              {citation.page != null ? `, page ${citation.page}` : ""}
            </dd>
          </div>
        ) : null}
        {citation.source?.path ? (
          <div className="flex gap-2">
            <dt className="shrink-0">Source</dt>
            <dd className="font-mono text-[0.72rem] text-ink-soft [overflow-wrap:anywhere]">
              {citation.source.path}
              {citation.source.pointer ? ` ${citation.source.pointer}` : ""}
            </dd>
          </div>
        ) : null}
        {citation.site_routes?.length ? (
          <div className="flex gap-2">
            <dt className="shrink-0">Hub pages</dt>
            <dd className="flex flex-wrap gap-1">
              {citation.site_routes.slice(0, 6).map((route) => (
                <span key={route} className="rounded border border-line bg-raised px-1.5 py-0.5 font-mono text-[0.7rem] text-ink-soft">
                  {route}
                </span>
              ))}
            </dd>
          </div>
        ) : null}
      </dl>
    </article>
  );
}

/** The list of sources next to (or over) a conversation. */
export function CitationPanel({ citations, active, onClose, className }: {
  citations: Citation[];
  active: number | null;
  onClose: () => void;
  className?: string;
}) {
  return (
    <aside aria-label="Sources" className={cx("flex min-h-0 flex-col bg-panel", className)}>
      <div className="flex items-center justify-between gap-2 border-b border-line py-1.5 pl-4 pr-1.5">
        <p className="text-sm font-semibold text-ink">
          Sources <span className="tnum font-normal text-ink-mute">({citations.length})</span>
        </p>
        <button type="button" onClick={onClose} aria-label="Close sources" className="inline-flex size-11 items-center justify-center rounded-lg text-ink-soft hover:bg-raised hover:text-ink">
          <X className="size-5" />
        </button>
      </div>
      <div className="min-h-0 flex-1 space-y-2.5 overflow-y-auto overscroll-contain p-3">
        {citations.map((citation, index) => (
          <div
            key={`${citationRef(citation, index)}-${index}`}
            ref={(node) => {
              if (node && active === index) node.scrollIntoView({ block: "nearest" });
            }}
          >
            <CitationCard citation={citation} index={index} className={active === index ? "border-amber/60" : undefined} />
          </div>
        ))}
      </div>
    </aside>
  );
}
