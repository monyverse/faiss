import { cn } from "@/lib/utils";
import type { AttentionRow } from "@/lib/role-attention";

export function AttentionTimeline({ rows }: { rows: readonly AttentionRow[] }) {
  return (
    <div
      className={cn(
        "grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-3",
        rows.length >= 6 ? "lg:grid-cols-6" : "lg:grid-cols-5",
      )}
    >
      {rows.map((r) => (
        <div key={r.period} className="flex flex-col bg-background p-3 text-xs">
          <div className="mb-2 flex gap-0.5" aria-hidden>
            {[1, 2, 3, 4].map((n) => (
              <span key={n} className={cn("h-1.5 flex-1 rounded-sm", n <= r.level ? "bg-maroon" : "bg-muted")} />
            ))}
          </div>
          <p className="font-semibold leading-snug">{r.period}</p>
          <p className="mt-0.5 font-medium text-maroon">{r.intensity}</p>
          <p className="mt-1.5 leading-snug text-muted-foreground">{r.text}</p>
        </div>
      ))}
    </div>
  );
}
