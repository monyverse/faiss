import { Link } from "@tanstack/react-router";
import { ArrowRight, GitBranch, GraduationCap, Handshake, Network, Rocket } from "lucide-react";

const GROUPS = ["Deal journey", "Roles & operating model", "Mobilise", "Support"];

const CARDS = [
  { group: "Deal journey", icon: GitBranch, title: "Deal Lifecycle", body: "The six deal archetypes, the common ten-stage lifecycle every deal follows, and how the detail in each stage changes by archetype.", cta: "Open the Deal Lifecycle", to: "/deal-lifecycle" as const },
  { group: "Roles & operating model", icon: Network, title: "The Hub & Spoke Operating Model", body: "How the central Hub, regional Spokes and workstream leads organise around a transaction.", cta: "View operating model", to: "/operating-model" as const },
  { group: "Support", icon: Handshake, title: "Partner Accelerator", body: "Targeted specialist contracting capacity that can be called on to enable scale (number & complexity of deals) as and when required.", cta: "View partner model", to: "/partner-acceleration" as const },
  { group: "Mobilise", icon: Rocket, title: "Mobilisation Roadmap", body: "Preparing, initiating and structuring a transaction for delivery: roles, governance, workstreams, planning disciplines and decision gates.", cta: "Open the roadmap", to: "/mobilisation" as const },
  { group: "Support", icon: GraduationCap, title: "Training & Learning Pathways", body: "Self-guided learning modules for transaction roles.", cta: "Open training & learning pathways", to: "/learning" as const },
];

export function ContentDirectory({ aId }: { aId: string }) {
  return (
    <div className="space-y-8">
      {GROUPS.map((group) => (
        <div key={group} className="grid gap-4 lg:grid-cols-[12rem_1fr]">
          <h2 className="border-t-2 border-red pt-2 font-display text-sm font-semibold uppercase tracking-[0.12em] text-maroon">
            {group}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {CARDS.filter((c) => c.group === group).map(({ icon: Icon, ...card }) => (
              <Link
                key={card.title}
                to={card.to}
                search={(card.to === "/operating-model" ? { archetype: aId } : card.to === "/deal-lifecycle" ? { archetype: aId } : undefined) as never}
                className="group flex flex-col rounded-md border border-border bg-card px-6 py-6 transition-colors hover:border-maroon"
              >
                <span className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold text-maroon">{card.title}</h3>
                  <Icon className="h-5 w-5 text-maroon/50 transition-colors group-hover:text-red" />
                </span>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-red">
                  {card.cta}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
