import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown } from "lucide-react";

type HubLink = { label: string; to: string; hash?: string; search?: Record<string, string> };
type HubNode = {
  id: string;
  label: string;
  body: string;
  built?: HubLink[];
  content: HubLink[];
  area: string;
  tone?: "centre" | "default" | "band";
};

const OM_SEARCH = { archetype: "balance-sheet-acquisition" };

/** Every major part of the capability, with its design material and its practical content. */
const NODES: HubNode[] = [
  {
    id: "lifecycle",
    label: "Deal archetypes & lifecycle",
    body: "Six acquisition and divestment shapes that set the perimeter and the delivery approach, and the stages, activities and decision points that apply to each archetype.",
    area: "lg:col-start-1 lg:row-start-1",
    built: [
    ],
    content: [
      { label: "Deal Lifecycle", to: "/deal-lifecycle" },
    ],
  },
  {
    id: "centre",
    label: "M&A Capability Hub",
    body: "Three components deliver every transaction, supported by the archetypes and lifecycles that shape how they mobilise.",
    area: "lg:col-start-2 lg:row-span-2 lg:row-start-1",
    tone: "centre",
    built: [
      { label: "Overarching design principles", to: "/design-principles" },
    ],
    content: [{ label: "Browse all Hub content", to: "/browse" }],
  },
  {
    id: "operating-model",
    label: "Operating Model",
    body: "The primary execution authority in the Central Hub, with named owners in the functional and in-country spokes, mobilised by archetype. Includes governance and transaction roles: how progress, risks, dependencies and decisions move from workstream delivery through to executive oversight, and who holds each role.",
    area: "lg:col-start-3 lg:row-span-2 lg:row-start-1",
    built: [
      { label: "Design Principles", to: "/operating-model/design-principles" },
      { label: "Deal Governance", to: "/deal-governance" },
    ],
    content: [
      { label: "Central Hub", to: "/operating-model/central-hub" },
      { label: "Functional Spokes", to: "/operating-model", search: OM_SEARCH },
      { label: "Regional Spokes", to: "/operating-model", search: OM_SEARCH },
      { label: "Governance & Roles", to: "/operating-model/governance" },
      { label: "Partner Accelerator", to: "/partner-acceleration" },
    ],
  },
  {
    id: "mobilisation",
    label: "Mobilisation",
    body: "",
    area: "lg:col-start-1 lg:row-start-2",
    content: [
      { label: "Mobilisation Roadmap", to: "/mobilisation" },
    ],
  },
  {
    id: "training",
    label: "Training & learning pathways",
    body: "Self-guided modules for each transaction role, starting with M&A Foundations for everyone.",
    area: "lg:col-span-3 lg:row-start-3",
    tone: "band",
    content: [{ label: "Training & Learning Pathways", to: "/learning" }],
  },
];

function PanelLinks({ title, links }: { title: string; links: HubLink[] }) {
  return (
    <div>
      <p className="text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{title}</p>
      <ul className="mt-1.5 space-y-0.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              to={l.to as never}
              hash={l.hash as never}
              search={l.search as never}
              className="flex items-center justify-between gap-2 rounded px-2 py-1.5 text-sm text-foreground transition-colors hover:bg-surface hover:text-maroon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {l.label}
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-maroon/60" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The single interactive visual used as the main navigation across the capability. */
export function CapabilityHubMap() {
  const [open, setOpen] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <div className="grid gap-3 lg:grid-cols-3 lg:grid-rows-[auto_auto_auto]">
        {NODES.map((n) => {
          const isOpen = open === n.id;
          const centre = n.tone === "centre";
          return (
            <div
              key={n.id}
              className={`relative ${n.area} ${isOpen ? "z-30" : "z-0"}`}
              onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(n.id)}
              onPointerLeave={(e) => e.pointerType === "mouse" && setOpen((v) => (v === n.id ? null : v))}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`hub-panel-${n.id}`}
                onClick={() => setOpen(isOpen ? null : n.id)}
                className={`flex h-full w-full flex-col rounded-lg border px-5 py-5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  centre
                    ? "justify-center border-maroon bg-maroon text-maroon-foreground lg:min-h-[15rem] lg:items-center lg:text-center"
                    : isOpen
                      ? "border-maroon bg-blush shadow-panel"
                      : "border-border bg-card hover:border-maroon/50"
                } ${centre && isOpen ? "ring-4 ring-red/40" : ""}`}
              >
                {centre ? (
                  <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-maroon-foreground/70">
                    At the centre
                  </span>
                ) : null}
                <span className={`flex w-full items-center justify-between gap-2 font-display text-base font-semibold ${centre ? "mt-2 text-lg lg:justify-center" : "text-maroon"}`}>
                  {n.label}
                  <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden />
                </span>
                {n.body ? (
                  <span className={`mt-2 text-xs leading-relaxed ${centre ? "text-maroon-foreground/80" : "text-muted-foreground"}`}>
                    {n.body}
                  </span>
                ) : null}
              </button>
              {isOpen ? (
                <div
                  id={`hub-panel-${n.id}`}
                  className="mt-1 grid gap-3 rounded-lg border border-maroon/30 bg-card p-3 text-foreground shadow-panel lg:absolute lg:left-0 lg:right-0 lg:top-full lg:mt-0 lg:min-w-[18rem]"
                >
                  {n.built?.length ? <PanelLinks title="How we built this" links={n.built} /> : null}
                  <PanelLinks title="Content" links={n.content} />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-xs italic text-muted-foreground">
        Hover over, tab to or tap any part of the capability to see how it was built and where to find its content.
      </p>
    </div>
  );
}
