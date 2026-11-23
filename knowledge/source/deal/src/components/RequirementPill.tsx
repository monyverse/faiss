import { cn } from "@/lib/utils";
import { REQUIREMENT_LABEL, type Requirement } from "@/lib/archetypes";

const STYLES: Record<Requirement, string> = {
  necessary: "border-maroon/30 bg-maroon/10 text-maroon",
  conditional: "border-red/30 bg-red/10 text-red",
  optional: "border-border bg-surface text-muted-foreground",
  "not-required": "border-dashed border-border bg-background text-muted-foreground",
};

/** Consistent necessary / conditional / optional label used across all views. */
export function RequirementPill({
  requirement,
  className,
}: {
  requirement: Requirement;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-full border px-2.5 py-0.5 text-[0.7rem] font-medium",
        STYLES[requirement],
        className,
      )}
    >
      {REQUIREMENT_LABEL[requirement]}
    </span>
  );
}
