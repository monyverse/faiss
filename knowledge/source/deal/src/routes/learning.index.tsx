import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { BrandHeader } from "@/components/BrandHeader";

export const Route = createFileRoute("/learning/")({
  head: () => ({
    meta: [
      { title: "Training & learning pathways | Absa M&A Capability Hub" },
      { name: "description", content: "Self-guided learning modules for each M&A transaction role." },
      { property: "og:title", content: "Training & learning pathways | Absa M&A Capability Hub" },
      { property: "og:description", content: "Self-guided learning modules for each M&A transaction role." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: RolePathways,
});

function RolePathways() {
  return (
    <div className="min-h-screen bg-background">
      <BrandHeader />
      <main className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="font-display text-2xl font-semibold text-maroon">Training &amp; learning pathways</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Self-guided modules for each transaction role.
        </p>
        <Link
          to="/learning/foundations"
          className="mt-6 flex items-center justify-between gap-4 rounded-md border border-maroon/40 bg-blush/50 px-4 py-4 hover:border-maroon"
        >
          <span>
            <span className="block text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-red">Start here · for all roles</span>
            <span className="mt-0.5 block font-semibold text-maroon">M&amp;A Foundations: Intro to M&amp;A</span>
            <span className="block text-sm text-muted-foreground">
              What M&amp;A is, why banks do it and where deals go wrong · 7 modules · about 31 minutes
            </span>
          </span>
          <ChevronRight className="h-4 w-4 shrink-0 text-maroon" aria-hidden />
        </Link>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Role pathways</p>
        <ul className="mt-2 divide-y divide-border border-y border-border">
          <li>
            <Link
              to="/learning/executive-sponsor"
              className="flex items-center justify-between gap-4 py-4 hover:text-maroon"
            >
              <span>
                <span className="flex items-center gap-2 font-semibold">
                  Accountable Executive (Executive Sponsor)
                </span>
                <span className="block text-sm text-muted-foreground">
                  Own the outcome and create the conditions for successful execution · about 12 to 15 minutes
                </span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
            </Link>
          </li>
          <li>
            <Link
              to="/learning/workstream-lead"
              className="flex items-center justify-between gap-4 py-4 hover:text-maroon"
            >
              <span>
                <span className="flex items-center gap-2 font-semibold">
                  Workstream Lead
                </span>
                <span className="block text-sm text-muted-foreground">
                  Eight short modules, from a starting scenario to a final capstone · about 30 minutes
                </span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
            </Link>
          </li>
          <li>
            <Link
              to="/learning/central-hub"
              className="flex items-center justify-between gap-4 py-4 hover:text-maroon"
            >
              <span>
                <span className="flex items-center gap-2 font-semibold">
                  Central Hub Programme Management
                </span>
                <span className="block text-sm text-muted-foreground">
                  Turn transaction intent into controlled execution · about 20 to 25 minutes
                </span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
            </Link>
          </li>
          <li>
            <Link
              to="/learning/in-country-pmo"
              className="flex items-center justify-between gap-4 py-4 hover:text-maroon"
            >
              <span>
                <span className="flex items-center gap-2 font-semibold">
                  In-country PMO
                </span>
                <span className="block text-sm text-muted-foreground">
                  Turn central direction into local delivery · about 16 to 20 minutes
                </span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
            </Link>
          </li>
          <li>
            <Link
              to="/learning/workstream-project-manager"
              className="flex items-center justify-between gap-4 py-4 hover:text-maroon"
            >
              <span>
                <span className="flex items-center gap-2 font-semibold">
                  Workstream Project Manager
                </span>
                <span className="block text-sm text-muted-foreground">
                  Keep the workstream plan accurate and usable · about 15 to 18 minutes
                </span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
            </Link>
          </li>
          <li>
            <Link
              to="/learning/workstream-team-member"
              className="flex items-center justify-between gap-4 py-4 hover:text-maroon"
            >
              <span>
                <span className="flex items-center gap-2 font-semibold">
                  Workstream Team Member
                </span>
                <span className="block text-sm text-muted-foreground">
                  Complete the work and make the facts visible · about 12 to 15 minutes
                </span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
            </Link>
          </li>
        </ul>
        <section className="mt-8 rounded-md border border-border bg-surface p-4">
          <p className="text-sm font-semibold text-maroon">Looking for a role description?</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Operating-model role descriptions (mandate, responsibilities and boundaries) are held in
            the operating model.
          </p>
          <div className="mt-3 flex flex-wrap gap-3 text-sm font-medium">
            <Link to="/operating-model/governance" className="text-maroon hover:underline">Governance and transaction roles</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
