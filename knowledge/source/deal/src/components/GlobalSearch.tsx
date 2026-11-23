import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { OPEN_SEARCH_EVENT, searchHub, type SearchEntry } from "@/lib/search-index";

/** Client-side search across the Hub's existing content. Opened from anywhere via openHubSearch() or "/". */
export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const groups = useMemo(() => searchHub(q), [q]);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      const typing = el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
      if (e.key === "/" && !typing) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener(OPEN_SEARCH_EVENT, onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(OPEN_SEARCH_EVENT, onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  function go(e: SearchEntry) {
    setOpen(false);
    void navigate({
      to: e.to as never,
      params: e.params as never,
      search: e.search as never,
      hash: e.hash as never,
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl gap-0 p-0">
        <DialogTitle className="sr-only">Search the Hub</DialogTitle>
        <DialogDescription className="sr-only">
          Search stages, activities, roles, spokes, artefacts and template references.
        </DialogDescription>
        <div className="flex items-center gap-2 border-b border-border px-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search a stage, activity, role, artefact or template"
            aria-label="Search the Hub"
            className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {q.trim() === "" ? (
            <p className="px-3 py-6 text-sm text-muted-foreground">
              Type to search across pages, archetypes, lifecycle stages, activities, roles, spokes,
              artefacts, template references, mobilisation days and partner support.
            </p>
          ) : groups.length === 0 ? (
            <p className="px-3 py-6 text-sm text-muted-foreground">No matches for “{q}”.</p>
          ) : (
            groups.map((g) => (
              <div key={g.kind} className="mb-2">
                <p className="px-3 pb-1 pt-2 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-maroon">
                  {g.kind}
                </p>
                <ul>
                  {g.items.map((item, i) => (
                    <li key={`${item.title}-${i}`}>
                      <button
                        type="button"
                        onClick={() => go(item)}
                        className="w-full rounded-md px-3 py-2 text-left transition-colors hover:bg-surface focus-visible:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <span className="line-clamp-2 block text-sm text-foreground">{item.title}</span>
                        <span className="mt-0.5 block text-xs text-muted-foreground">{item.crumb}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
        <p className="border-t border-border px-4 py-2 text-[0.6875rem] text-muted-foreground">
          Template references identify what to source from the programme team, Central Hub or
          controlled repository. They are not downloads from this microsite.
        </p>
      </DialogContent>
    </Dialog>
  );
}
