import { Link } from "@tanstack/react-router";
import { ArrowRight, Bot, Compass, ExternalLink } from "lucide-react";
import { AI_AGENT_LABEL, AI_AGENT_URL } from "@/lib/ai-agent";
import { getArchetype } from "@/lib/archetypes";
import { getLifecycleVariants } from "@/lib/lifecycles";
import { useDealContext } from "@/lib/deal-context";

/** Compact bar showing the user's current archetype and stage. */
export function DealContextBar({ archetypeId, stageId }: { archetypeId?: string | null; stageId?: string | null }) {
  const ctx = useDealContext();
  const aId = archetypeId ?? ctx.archetypeId;
  const sId = stageId ?? ctx.stageId;
  const archetype = aId ? getArchetype(aId) : undefined;
  const stage = archetype
    ? getLifecycleVariants(archetype.id)
        .flatMap((v) => v.stages)
        .find((s) => s.id === sId)
    : undefined;

  return (
    <div className="border-b border-border bg-blush print:hidden">
      <div className="mx-auto flex max-w-[1300px] flex-wrap items-center gap-x-4 gap-y-1.5 px-4 py-2 text-xs sm:px-6">
        <span className="inline-flex min-w-0 items-center gap-1.5 font-medium text-maroon">
          <Compass className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">
            {archetype ? archetype.name : "No archetype selected"}
            {stage ? ` · ${stage.title}` : ""}
          </span>
        </span>
        <span className="ml-auto flex flex-wrap items-center gap-x-3 gap-y-1">
          <Link to="/deal-lifecycle" hash="archetypes" className="text-maroon underline-offset-2 hover:underline">
            Change archetype
          </Link>
          {archetype ? (
            <Link
              to="/deal-lifecycle"
              search={stage ? { archetype: archetype.id, stage: stage.id } : { archetype: archetype.id }}
              hash="apply"
              className="text-maroon underline-offset-2 hover:underline"
            >
              Change stage
            </Link>
          ) : null}
          <Link to="/deal-lifecycle" className="hidden text-maroon underline-offset-2 hover:underline sm:inline">
            Return to deal journey
          </Link>
        </span>
      </div>
    </div>
  );
}

/** Small, secondary signpost to the separate supporting AI agent. */
export function AiAgentSignpost() {
  return (
    <aside className="mt-10 flex flex-wrap items-center gap-3 rounded-md border border-dashed border-border px-4 py-3 text-xs text-muted-foreground print:hidden">
      <Bot className="h-4 w-4 text-maroon/70" />
      <span>
        <span className="font-medium text-foreground">{AI_AGENT_LABEL}.</span> Can help apply this
        guidance to a specific deal, role or context.
      </span>
      {AI_AGENT_URL ? (
        <a href={AI_AGENT_URL} target="_blank" rel="noreferrer" className="ml-auto inline-flex items-center gap-1 text-maroon hover:underline">
          Open the supporting AI agent <ExternalLink className="h-3 w-3" />
        </a>
      ) : (
        <span className="ml-auto">Access provided separately</span>
      )}
    </aside>
  );
}

export type RelatedLink = { label: string; to: string; params?: Record<string, string>; search?: Record<string, string>; hash?: string };

/** "Related guidance" footer so pages never dead-end. */
export function RelatedGuidance({ links }: { links: RelatedLink[] }) {
  return (
    <nav aria-label="Related guidance" className="mt-10 border-t border-border pt-6 print:hidden">
      <p className="label-eyebrow">Related guidance</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              to={l.to as never}
              params={l.params as never}
              search={l.search as never}
              hash={l.hash as never}
              className="inline-flex items-center gap-1.5 rounded-md border border-input bg-card px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-maroon/45 hover:text-maroon"
            >
              {l.label}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
