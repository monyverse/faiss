import { useState } from "react";
import { PlayCircle } from "lucide-react";

/** Add a `url` (and optional `poster`) once a video exists; the layout does not change. */
export type HubVideo = { id: string; title: string; description: string; url?: string; poster?: string };

export const HUB_VIDEOS: HubVideo[] = [
  { id: "inorganic-growth", title: "Absa Inorganic Growth Strategy", description: "Watch our CEO explain our Inorganic Growth strategy, and why it's so important" },
  { id: "overview", title: "Capability Hub overview", description: "What the hub is, why it is being built and what it is intended to do." },
  { id: "lifecycle", title: "Deal Lifecycle", description: "A deeper introduction to the common deal journey." },
  { id: "archetypes", title: "Deal Archetypes", description: "How the type of deal changes the activities and emphasis within the journey." },
  { id: "operating-model", title: "Operating Model", description: "How the hub-and-spoke model works and how users find their part in it." },
];

export function VideoPlaceholders() {
  const [active, setActive] = useState(HUB_VIDEOS[0]!.id);
  const video = HUB_VIDEOS.find((v) => v.id === active)!;
  return (
    <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
      <div className="aspect-video overflow-hidden rounded-lg border border-border bg-surface">
        {video.url ? (
          <video key={video.id} controls poster={video.poster} className="h-full w-full" src={video.url}>
            <track kind="captions" />
          </video>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
            <PlayCircle className="h-10 w-10 text-maroon/40" aria-hidden />
            <p className="font-display text-base font-semibold text-maroon">{video.title}</p>
            <p className="rounded bg-card px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Video coming soon
            </p>
          </div>
        )}
      </div>
      <ul className="grid gap-2" aria-label="Videos">
        {HUB_VIDEOS.map((v, i) => (
          <li key={v.id}>
            <button
              type="button"
              aria-pressed={v.id === active}
              onClick={() => setActive(v.id)}
              className={`flex w-full gap-3 rounded-md border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                v.id === active ? "border-maroon bg-blush" : "border-border bg-card hover:border-maroon/45"
              }`}
            >
              <span className="font-display text-xs font-semibold text-red">{i + 1}</span>
              <span>
                <span className="block text-sm font-semibold text-maroon">{v.title}</span>
                <span className="block text-xs leading-relaxed text-muted-foreground">{v.description}</span>
                {!v.url ? <span className="mt-1 block text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground/80">Video coming soon</span> : null}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
