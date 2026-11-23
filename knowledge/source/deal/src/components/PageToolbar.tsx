import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowLeft, Compass, Download, HelpCircle, Share2 } from "lucide-react";

export type Crumb = {
  label: string;
  to?: string;
  search?: Record<string, unknown>;
  params?: Record<string, unknown>;
};

const BUTTON =
  "inline-flex items-center gap-1.5 rounded-md border border-input bg-card px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-maroon/45 hover:text-maroon";

/**
 * Shared sticky page toolbar: breadcrumb trail, a single back button and the
 * Share / Export / Help actions. Used on every page so the bar under the
 * header is consistent across the Hub.
 */
export function PageToolbar({
  crumbs,
  back,
  helpText,
  offsetClass = "top-0",
}: {
  /** Trail excluding the Hub root; the last item renders as the current page. */
  crumbs: Crumb[];
  /** Optional back target; defaults to the Hub homepage. */
  back?: Crumb;
  helpText?: string;
  offsetClass?: string;
}) {
  const [notice, setNotice] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  function flash(message: string) {
    setNotice(message);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setNotice(null), 3200);
  }

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      flash("Page link copied to your clipboard.");
    } catch {
      flash("Copy the address bar link to share this page.");
    }
  }

  const pathname = useRouterState({ select: (st) => st.location.pathname });
  const showVision = pathname !== "/" && pathname !== "/vision";
  const backTarget: Crumb = back ?? { label: "Back to the M&A Capability Hub", to: "/" };
  const trail: Crumb[] = crumbs;

  return (
    <div
      className={`sticky ${offsetClass} z-30 border-b border-border bg-surface/95 backdrop-blur print:hidden`}
    >
      <div className="mx-auto flex max-w-[1300px] flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 sm:px-6">
        <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 text-xs">
          {trail.map((crumb, index) => {
            const last = index === trail.length - 1;
            return (
              <span key={`${crumb.label}-${index}`} className="flex min-w-0 items-center gap-1.5">
                {index > 0 ? <span className="text-muted-foreground/60">/</span> : null}
                {crumb.to && !last ? (
                  <Link
                    to={crumb.to as never}
                    search={crumb.search as never}
                    params={crumb.params as never}
                    className="truncate text-muted-foreground transition-colors hover:text-maroon"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    className={
                      last ? "truncate font-medium text-maroon" : "truncate text-muted-foreground"
                    }
                  >
                    {crumb.label}
                  </span>
                )}
              </span>
            );
          })}
        </nav>

        <Link
          to={(backTarget.to ?? "/") as never}
          search={backTarget.search as never}
          params={backTarget.params as never}
          className={BUTTON}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {backTarget.label}
        </Link>
        {showVision && backTarget.to !== "/vision" ? (
          <Link to="/vision" hash="explore" className={BUTTON}>
            <Compass className="h-3.5 w-3.5" />
            Back to Vision
          </Link>
        ) : null}

        <div className="ml-auto flex items-center gap-2">
          <button type="button" onClick={handleShare} className={BUTTON}>
            <Share2 className="h-3.5 w-3.5" />
            Share
          </button>
          <button type="button" onClick={() => window.print()} className={BUTTON}>
            <Download className="h-3.5 w-3.5" />
            Export
          </button>
          <button
            type="button"
            onClick={() =>
              flash(
                helpText ??
                  "Use the breadcrumb to move back up the Hub. Share copies this page link and Export prints the page.",
              )
            }
            className={BUTTON}
          >
            <HelpCircle className="h-3.5 w-3.5" />
            Help
          </button>
        </div>
      </div>
      {notice ? (
        <div className="mx-auto max-w-[1300px] px-4 pb-2 sm:px-6">
          <p className="rounded-md border border-maroon/20 bg-blush px-3 py-2 text-xs text-maroon">
            {notice}
          </p>
        </div>
      ) : null}
    </div>
  );
}
