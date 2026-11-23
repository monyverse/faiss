import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import absaLogo from "@/assets/absa-logo.png.asset.json";
import { GlobalSearch } from "@/components/GlobalSearch";
import { openHubSearch } from "@/lib/search-index";
import { useDealContext } from "@/lib/deal-context";

type NavLink = { label: string; to: string; params?: Record<string, string>; search?: Record<string, string>; hash?: string; note?: string };
type NavGroup = { label: string; match: RegExp; links: NavLink[] };

function groups(archetypeId: string): NavGroup[] {
  return [
    {
      label: "Start here",
      match: /^\/($|vision)/,
      links: [
        { label: "Landing Page", to: "/" },
        { label: "Vision for the Capability Hub", to: "/vision" },
      ],
    },
    {
      label: "Deal Lifecycle",
      match: /^\/deal-lifecycle/,
      links: [{ label: "Deal Lifecycle", to: "/deal-lifecycle", search: { archetype: archetypeId } }],
    },
    {
      label: "Roles & Responsibilities",
      match: /^\/(operating-model|deal-governance)/,
      links: [
        { label: "Operating Model Overview", to: "/operating-model", search: { archetype: archetypeId } },
        { label: "Governance and Transaction Roles", to: "/operating-model/governance" },
      ],
    },
    {
      label: "Mobilise",
      match: /^\/mobilisation/,
      links: [
        { label: "Mobilisation Roadmap", to: "/mobilisation" },
      ],
    },
    {
      label: "Support",
      match: /^\/(partner-acceleration|learning|hall-of-fame)/,
      links: [
        { label: "Partner Accelerator", to: "/partner-acceleration" },
        { label: "Training & Learning Pathways", to: "/learning" },
        { label: "Hall of Fame", to: "/hall-of-fame" },
      ],
    },
  ];
}

function NavItemLink({ link, onClick }: { link: NavLink; onClick?: () => void }) {
  return (
    <Link
      to={link.to as never}
      params={link.params as never}
      search={link.search as never}
      hash={link.hash as never}
      onClick={onClick}
      className="block rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-surface hover:text-maroon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {link.label}
      {link.note ? <span className="block text-xs text-muted-foreground">{link.note}</span> : null}
    </Link>
  );
}

/** Global Hub header: grouped drop-down navigation, search and a compact mobile menu. */
export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { archetypeId } = useDealContext();
  const nav = groups(archetypeId ?? "balance-sheet-acquisition");
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpenGroup(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpenGroup(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenGroup(null);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className="relative z-40 bg-maroon text-maroon-foreground print:hidden" ref={ref}>
      <div className="mx-auto flex max-w-[1300px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-3">
          <img src={absaLogo.url} alt="Absa: Your story matters" className="h-9 w-auto" />
          <span className="hidden text-sm text-maroon-foreground/80 sm:inline">M&amp;A Capability Hub</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((g) => {
            const active = g.match.test(pathname);
            const open = openGroup === g.label;
            if (g.links.length === 1) {
              const l = g.links[0]!;
              return (
                <Link
                  key={g.label}
                  to={l.to as never}
                  search={l.search as never}
                  className={`inline-flex items-center rounded-md border-b-2 px-3 py-2 text-sm transition-colors ${
                    active
                      ? "border-red font-medium text-maroon-foreground"
                      : "border-transparent text-maroon-foreground/75 hover:text-maroon-foreground"
                  }`}
                >
                  {g.label}
                </Link>
              );
            }
            return (
              <div key={g.label} className="relative">
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenGroup(open ? null : g.label)}
                  className={`inline-flex items-center gap-1 rounded-md border-b-2 px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-foreground/60 ${
                    active
                      ? "border-red font-medium text-maroon-foreground"
                      : "border-transparent text-maroon-foreground/75 hover:text-maroon-foreground"
                  }`}
                >
                  {g.label}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
                </button>
                {open ? (
                  <div className="absolute right-0 top-full mt-1 w-72 rounded-md border border-border bg-card p-1.5 text-foreground shadow-panel">
                    {g.links.map((l) => (
                      <NavItemLink key={l.label} link={l} />
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
          <button
            type="button"
            onClick={openHubSearch}
            className="ml-2 inline-flex items-center gap-2 rounded-md border border-maroon-foreground/30 px-3 py-1.5 text-sm text-maroon-foreground/85 transition-colors hover:border-maroon-foreground/60 hover:text-maroon-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-foreground/60"
          >
            <Search className="h-4 w-4" />
            Search
            <kbd className="rounded border border-maroon-foreground/30 px-1 text-[0.625rem]">/</kbd>
          </button>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={openHubSearch}
            aria-label="Search the Hub"
            className="rounded-md p-2 text-maroon-foreground hover:bg-maroon-foreground/10"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="rounded-md p-2 text-maroon-foreground hover:bg-maroon-foreground/10"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <nav aria-label="Main" className="border-t border-maroon-foreground/20 bg-card text-foreground lg:hidden">
          <div className="mx-auto max-h-[75vh] max-w-[1300px] overflow-y-auto px-4 py-3">
            {nav.map((g) =>
              g.links.length === 1 ? (
                <Link
                  key={g.label}
                  to={g.links[0]!.to as never}
                  search={g.links[0]!.search as never}
                  onClick={() => setMobileOpen(false)}
                  className="block border-b border-border py-3 text-sm font-semibold text-maroon"
                >
                  {g.label}
                </Link>
              ) : (
              <details key={g.label} open={g.match.test(pathname)} className="border-b border-border py-1 last:border-0">
                <summary className="cursor-pointer list-none py-2 text-sm font-semibold text-maroon">{g.label}</summary>
                <div className="pb-2">
                  {g.links.map((l) => (
                    <NavItemLink key={l.label} link={l} onClick={() => setMobileOpen(false)} />
                  ))}
                </div>
              </details>
              ),
            )}
          </div>
        </nav>
      ) : null}

      <GlobalSearch />
    </header>
  );
}
