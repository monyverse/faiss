import { createFileRoute } from "@tanstack/react-router";
import { UserRound } from "lucide-react";
import { BrandHeader } from "@/components/BrandHeader";
import { ALL_WORKSTREAMS } from "@/lib/archetypes";

export const Route = createFileRoute("/hall-of-fame")({
  head: () => ({
    meta: [
      { title: "Hall of Fame | Absa M&A Capability Hub" },
      { name: "description", content: "People from each workstream who have worked on previous Absa transactions." },
      { property: "og:title", content: "Hall of Fame | Absa M&A Capability Hub" },
      { property: "og:description", content: "People from each workstream who have worked on previous Absa transactions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HallOfFame,
});

function HallOfFame() {
  return (
    <div className="min-h-screen bg-background">
      <BrandHeader />
      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="font-display text-2xl font-semibold text-maroon">Hall of Fame</h1>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ALL_WORKSTREAMS.map((ws) => (
            <li key={ws} className="flex flex-col rounded-md border border-border bg-surface p-4">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-dashed border-muted-foreground/50 bg-muted"
                  aria-label="Photo to be added"
                  role="img"
                >
                  <UserRound className="h-6 w-6 text-muted-foreground" aria-hidden />
                </div>
                <div>
                  <p className="text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-maroon">{ws}</p>
                  <p className="font-semibold text-muted-foreground">[Name to be added]</p>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Deal worked on</p>
                <p className="mt-0.5 text-sm text-muted-foreground">[Deal to be added]</p>
              </div>
              <blockquote className="mt-3 border-l-2 border-maroon/30 pl-3 text-sm italic text-muted-foreground">
                “[Quote to be added]”
              </blockquote>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
