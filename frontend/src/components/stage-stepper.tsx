import { Check } from "lucide-react";

import type { StageRef } from "@/lib/api";

import { cx } from "./ui";

/**
 * The deal's real lifecycle, in order. Wide layouts show every stage with its name; narrow ones
 * show the current stage name, "n of m" and a compact track.
 */
export function StageStepper({ stages, position, className }: { stages: StageRef[]; position: number | null; className?: string }) {
  if (!stages.length) return null;
  const current = position ?? -1;
  const stage = current >= 0 ? stages[current] : undefined;
  return (
    <div className={className}>
      {/* compact */}
      <div className="lg:hidden">
        <div className="flex items-baseline justify-between gap-3">
          <p className="min-w-0 truncate text-sm font-medium text-ink">{stage ? stage.title : "Stage not set"}</p>
          <p className="tnum shrink-0 text-xs text-ink-mute">{stage ? `Stage ${current + 1} of ${stages.length}` : `${stages.length} stages`}</p>
        </div>
        <ol aria-label="Lifecycle stages" className="mt-2 flex gap-1">
          {stages.map((s, index) => (
            <li
              key={s.id}
              title={s.title}
              aria-current={index === current ? "step" : undefined}
              className={cx("h-1.5 flex-1 rounded-full", index < current ? "bg-amber-deep/70" : index === current ? "bg-amber" : "bg-line")}
            >
              <span className="sr-only">{s.title}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* full */}
      <ol aria-label="Lifecycle stages" className="hidden lg:flex">
        {stages.map((s, index) => {
          const done = index < current;
          const active = index === current;
          return (
            <li key={s.id} aria-current={active ? "step" : undefined} className="relative min-w-0 flex-1 px-0.5">
              {index > 0 ? <span aria-hidden className={cx("absolute right-1/2 top-[0.6875rem] h-px w-full", done || active ? "bg-amber-deep/70" : "bg-line")} /> : null}
              <span
                className={cx(
                  "tnum relative z-[1] mx-auto flex size-[1.375rem] items-center justify-center rounded-full border text-[0.65rem] font-semibold",
                  done && "border-amber-deep/70 bg-[oklch(0.3_0.06_68)] text-amber",
                  active && "border-amber bg-amber text-[oklch(0.2_0.03_70)] ring-4 ring-amber/15",
                  !done && !active && "border-line-strong bg-panel text-ink-mute",
                )}
              >
                {done ? <Check className="size-3" strokeWidth={3} /> : index + 1}
              </span>
              <span
                title={s.title}
                className={cx(
                  "mt-1.5 line-clamp-2 block text-center text-[0.7rem] leading-tight",
                  active ? "font-semibold text-ink" : done ? "text-ink-soft" : "text-ink-mute",
                )}
              >
                {s.title}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
