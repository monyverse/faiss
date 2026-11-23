import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Download, FileQuestion, HelpCircle, Share2 } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";

const SECTIONS = [
  { id: "necessity", eyebrow: "A", label: "Necessity by Deal Archetype" },
  { id: "key-role", eyebrow: "B", label: "Key Role" },
  { id: "responsibilities", eyebrow: "C", label: "Overall Responsibilities" },
  { id: "decision-mandate", eyebrow: "D", label: "Decision Mandate" },
  { id: "capabilities", eyebrow: "E", label: "Key Capabilities Required" },
  { id: "milestones", eyebrow: "F", label: "Key Milestones and Activities" },
  { id: "sizing", eyebrow: "G", label: "Factors Impacting Workstream Size" },
  { id: "partner", eyebrow: "H", label: "Partner Acceleration" },
] as const;

function Placeholder({ label }: { label: string }) {
  return (
    <div className="mt-4 rounded-xl border border-dashed border-maroon/30 bg-surface p-6">
      <p className="flex items-center gap-2 text-sm font-semibold text-maroon">
        <FileQuestion className="h-4 w-4" />
        Content placeholder
      </p>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
        {label} content for this workstream has not been supplied yet. Approved source content will
        be shown here, in the same structure used on the completed spoke pages.
      </p>
    </div>
  );
}

export function SpokePlaceholderPage({
  name,
  conditional,
}: {
  name: string;
  conditional?: boolean;
}) {
  const [activeSection, setActiveSection] = useState<string>("necessity");
  const [notice, setNotice] = useState<string | null>(null);
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-140px 0px -60% 0px", threshold: 0 },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [name]);

  useEffect(
    () => () => {
      if (noticeTimer.current) clearTimeout(noticeTimer.current);
    },
    [],
  );

  function flash(message: string) {
    setNotice(message);
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(null), 3200);
  }

  function goToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  }

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      flash("Page link copied to your clipboard.");
    } catch {
      flash("Copy the address bar link to share this page.");
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader active="operating-model" />

      <div className="sticky top-16 z-30 border-b border-border bg-surface/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1300px] flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 sm:px-6">
          <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 text-xs">
            <Link
              to="/operating-model"
              search={{ archetype: "balance-sheet-acquisition" }}
              className="text-muted-foreground transition-colors hover:text-maroon"
            >
              Operating Model
            </Link>
            <span className="text-muted-foreground/60">/</span>
            <span className="text-muted-foreground">SA Functional Spokes</span>
            <span className="text-muted-foreground/60">/</span>
            <span className="truncate font-medium text-maroon">{name}</span>
          </nav>

          <Link
            to="/operating-model"
            search={{ archetype: "balance-sheet-acquisition" }}
            className="inline-flex items-center gap-1.5 rounded-md border border-input bg-card px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-maroon/45 hover:text-maroon"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to operating model
          </Link>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-md border border-input bg-card px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-maroon/45 hover:text-maroon"
            >
              <Share2 className="h-3.5 w-3.5" />
              Share
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-md border border-input bg-card px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-maroon/45 hover:text-maroon"
            >
              <Download className="h-3.5 w-3.5" />
              Export
            </button>
            <button
              type="button"
              onClick={() =>
                flash(
                  "This workstream page is structured and ready. Each section will be filled once its approved source content is supplied.",
                )
              }
              className="inline-flex items-center gap-1.5 rounded-md border border-input bg-card px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-maroon/45 hover:text-maroon"
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

      <div className="mx-auto flex max-w-[1300px] gap-10 px-4 sm:px-6">
        <nav aria-label="Page sections" className="hidden w-[240px] shrink-0 lg:block">
          <div className="sticky top-32 py-10">
            <p className="label-eyebrow">On this page</p>
            <ul className="mt-3 space-y-0.5 border-l border-border">
              {SECTIONS.map((s) => {
                const active = activeSection === s.id;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => goToSection(s.id)}
                      aria-current={active ? "true" : undefined}
                      className={`-ml-px block w-full border-l-2 py-2 pl-4 text-left text-sm transition-colors ${
                        active
                          ? "border-maroon font-medium text-maroon"
                          : "border-transparent text-muted-foreground hover:border-maroon/40 hover:text-maroon"
                      }`}
                    >
                      {s.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        <main className="min-w-0 flex-1 pb-20 pt-8 lg:pt-10">
          <div className="mb-6 lg:hidden">
            <label htmlFor="jump-to-section" className="label-eyebrow block">
              Jump to section
            </label>
            <select
              id="jump-to-section"
              value={activeSection}
              onChange={(e) => goToSection(e.target.value)}
              className="mt-2 w-full rounded-md border border-input bg-card px-3 py-2.5 text-sm text-foreground"
            >
              {SECTIONS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="label-eyebrow">
              {conditional ? "SA Functional Spoke — conditionally required" : "SA Functional Spoke"}
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-maroon">
              {name}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              The page structure for this workstream is in place. Section content is awaiting
              approved source material.
            </p>
            <span className="mt-4 inline-block rounded-md border border-dashed border-maroon/35 bg-surface px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-maroon">
              Awaiting source content
            </span>
          </div>

          {SECTIONS.map((s) => (
            <section key={s.id} id={s.id} className="mt-14 scroll-mt-36">
              <div className="max-w-2xl">
                <h2 className="font-display text-xl font-semibold text-maroon sm:text-2xl">
                  {s.label}
                </h2>
              </div>
              <Placeholder label={s.label} />
            </section>
          ))}

          <section className="mt-14 border-t border-border pt-8">
            <p className="label-eyebrow">Completed workstream pages</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                to="/operating-model/spokes/procurement"
                className="rounded-md border border-input bg-card px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-maroon/45 hover:text-maroon"
              >
                Procurement
              </Link>
              <Link
                to="/operating-model/spokes/compliance"
                className="rounded-md border border-input bg-card px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-maroon/45 hover:text-maroon"
              >
                Compliance &amp; Regulatory Approvals
              </Link>
              <Link
                to="/operating-model/spokes/change-management"
                className="rounded-md border border-input bg-card px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-maroon/45 hover:text-maroon"
              >
                Change Management
              </Link>
              <Link
                to="/operating-model/spokes/finance-tax"
                className="rounded-md border border-input bg-card px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-maroon/45 hover:text-maroon"
              >
                Finance &amp; Tax
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
