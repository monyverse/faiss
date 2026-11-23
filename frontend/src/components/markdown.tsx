import { Fragment, type ReactNode } from "react";

/**
 * A small, safe markdown renderer for what the platform produces: briefings and assistant answers.
 * It builds React elements (never raw HTML), and turns [n] markers into citation buttons when
 * `onCite` is given. Covers headings, lists, block quotes, tables, rules, code, bold/italic, links.
 */
export function Markdown({ text, onCite, citeCount = 0 }: { text: string; onCite?: (n: number) => void; citeCount?: number }) {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  const inline = (value: string, key: string) => renderInline(value, key, onCite, citeCount);
  let i = 0;
  while (i < lines.length) {
    const line = lines[i] ?? "";
    const key = `b${i}`;
    if (!line.trim()) {
      i++;
      continue;
    }
    if (/^```/.test(line)) {
      const body: string[] = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i] ?? "")) body.push(lines[i++] ?? "");
      i++;
      blocks.push(
        <pre key={key} className="my-3 overflow-x-auto rounded-lg border border-line bg-canvas/70 p-3 font-mono text-[0.8rem] leading-relaxed text-ink-soft">
          {body.join("\n")}
        </pre>,
      );
      continue;
    }
    const heading = /^(#{1,4})\s+(.*)$/.exec(line);
    if (heading) {
      const level = heading[1]?.length ?? 1;
      const content = inline(heading[2] ?? "", key);
      blocks.push(
        level === 1 ? (
          <h2 key={key} className="mb-2 mt-1 text-xl font-semibold tracking-tight text-ink">{content}</h2>
        ) : level === 2 ? (
          <h3 key={key} className="mb-1.5 mt-5 border-b border-line pb-1.5 text-base font-semibold text-ink first:mt-0">{content}</h3>
        ) : (
          <h4 key={key} className="mb-1 mt-4 text-sm font-semibold uppercase tracking-wider text-ink-soft">{content}</h4>
        ),
      );
      i++;
      continue;
    }
    if (/^\s*([-*_])\s*\1\s*\1[\s\-*_]*$/.test(line)) {
      blocks.push(<hr key={key} className="my-4 border-line" />);
      i++;
      continue;
    }
    if (/^\s*>/.test(line)) {
      const body: string[] = [];
      while (i < lines.length && /^\s*>/.test(lines[i] ?? "")) body.push((lines[i++] ?? "").replace(/^\s*>\s?/, ""));
      blocks.push(
        <blockquote key={key} className="my-3 border-l-2 border-amber/60 bg-amber/[0.05] py-2 pl-3 pr-2 text-sm text-ink-soft">
          {inline(body.join(" "), key)}
        </blockquote>,
      );
      continue;
    }
    if (/^\s*\|.*\|\s*$/.test(line) && /^\s*\|?[\s:|-]+\|?\s*$/.test(lines[i + 1] ?? "")) {
      const cells = (row: string) => row.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      const head = cells(line);
      const rows: string[][] = [];
      i += 2;
      while (i < lines.length && /^\s*\|.*\|\s*$/.test(lines[i] ?? "")) rows.push(cells(lines[i++] ?? ""));
      blocks.push(
        <div key={key} className="my-3 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-max border-collapse text-sm">
            <thead>
              <tr className="bg-raised text-left text-xs uppercase tracking-wider text-ink-mute">
                {head.map((h, c) => <th key={c} className="px-3 py-2 font-medium">{inline(h, `${key}h${c}`)}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, r) => (
                <tr key={r} className="border-t border-line">
                  {row.map((cell, c) => <td key={c} className="tnum px-3 py-2 text-ink-soft">{inline(cell, `${key}r${r}c${c}`)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }
    const bullet = /^(\s*)([-*+]|\d+[.)])\s+(.*)$/.exec(line);
    if (bullet) {
      const ordered = /\d/.test(bullet[2] ?? "");
      const items: { depth: number; text: string }[] = [];
      while (i < lines.length) {
        const match = /^(\s*)([-*+]|\d+[.)])\s+(.*)$/.exec(lines[i] ?? "");
        if (match) {
          items.push({ depth: Math.min(2, Math.floor((match[1]?.length ?? 0) / 2)), text: match[3] ?? "" });
        } else if (items.length && /^\s{2,}\S/.test(lines[i] ?? "")) {
          const last = items[items.length - 1];
          if (last) last.text += ` ${(lines[i] ?? "").trim()}`;
        } else break;
        i++;
      }
      const List = ordered ? "ol" : "ul";
      blocks.push(
        <List key={key} className={`my-2 space-y-1 pl-5 text-ink-soft ${ordered ? "list-decimal" : "list-disc"} marker:text-ink-mute`}>
          {items.map((item, n) => (
            <li key={n} style={item.depth ? { marginLeft: `${item.depth * 1.1}rem` } : undefined}>{inline(item.text, `${key}i${n}`)}</li>
          ))}
        </List>,
      );
      continue;
    }
    const paragraph: string[] = [];
    while (i < lines.length && (lines[i] ?? "").trim() && !/^(#{1,4}\s|```|\s*>|\s*([-*+]|\d+[.)])\s)/.test(lines[i] ?? "")) {
      paragraph.push(lines[i++] ?? "");
    }
    if (!paragraph.length) paragraph.push(lines[i++] ?? "");
    blocks.push(
      <p key={key} className="my-2 whitespace-pre-line text-ink-soft first:mt-0 last:mb-0">
        {inline(paragraph.join("\n"), key)}
      </p>,
    );
  }
  return <div className="min-w-0 break-words leading-relaxed [overflow-wrap:anywhere]">{blocks}</div>;
}

const INLINE = /(\*\*[^*\n]+\*\*|__[^_\n]+__|`[^`\n]+`|\[[^\]\n]+\]\([^)\s]+\)|\[\d{1,3}\]|\*[^*\s][^*\n]*\*)/g;

function renderInline(value: string, key: string, onCite: ((n: number) => void) | undefined, citeCount: number): ReactNode {
  const parts = value.split(INLINE);
  return parts.map((part, index) => {
    const k = `${key}-${index}`;
    if (index % 2 === 0) return <Fragment key={k}>{part}</Fragment>;
    if (part.startsWith("**") || part.startsWith("__")) return <strong key={k} className="font-semibold text-ink">{part.slice(2, -2)}</strong>;
    if (part.startsWith("`")) return <code key={k} className="rounded bg-raised px-1 py-0.5 font-mono text-[0.85em] text-ink">{part.slice(1, -1)}</code>;
    const cite = /^\[(\d{1,3})\]$/.exec(part);
    if (cite) {
      const n = Number(cite[1]);
      if (!onCite || n < 1 || n > citeCount) return <Fragment key={k}>{part}</Fragment>;
      return (
        <button
          key={k}
          type="button"
          onClick={() => onCite(n)}
          aria-label={`Open source ${n}`}
          className="tnum mx-0.5 inline-flex h-5 min-w-5 -translate-y-px items-center justify-center rounded-full border border-amber/45 bg-amber/15 px-1.5 align-middle text-[0.7rem] font-semibold text-amber hover:bg-amber/25"
        >
          {n}
        </button>
      );
    }
    const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part);
    if (link) {
      const href = link[2] ?? "";
      // Only plain web links are followed; anything else is shown as text.
      if (!/^https?:\/\//i.test(href)) return <Fragment key={k}>{link[1]}</Fragment>;
      return <a key={k} href={href} target="_blank" rel="noreferrer noopener" className="text-rose underline underline-offset-2 hover:text-ink">{link[1]}</a>;
    }
    return <em key={k}>{part.slice(1, -1)}</em>;
  });
}
