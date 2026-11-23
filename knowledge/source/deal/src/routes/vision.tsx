import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, ChevronRight, Network } from "lucide-react";
import { BrandHeader } from "@/components/BrandHeader";
import { PageToolbar } from "@/components/PageToolbar";
import { CapabilityHubMap } from "@/components/CapabilityHubMap";
import { Disclosure, LensPrinciples, PointList } from "@/components/LensPrinciples";
import {
  BUILD_STEPS,
  CONNECTED,
  FRAGMENTED,
  LENSES,
  OUTCOMES,
  OVERARCHING_PRINCIPLES,
  VISION,
  splitPoint,
  type Lens,
} from "@/lib/vision-content";

export const Route = createFileRoute("/vision")({
  head: () => ({
    meta: [
      { title: "The Vision | Absa M&A Capability Hub" },
      {
        name: "description",
        content:
          "Why Absa needs a sustainable, scalable and repeatable M&A execution capability, what it changes, what it enables and how to explore it.",
      },
      { property: "og:title", content: "The Vision | Absa M&A Capability Hub" },
      {
        property: "og:description",
        content:
          "Absa's repeatable response to executing acquisitions and disposals: the ambition, the challenge, the capability and how to explore it.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: VisionPage,
});

const FLOW = [
  { id: "ambition", label: "Absa's ambition" },
  { id: "challenge", label: "The current challenge" },
  { id: "response", label: "The capability response" },
  { id: "explore", label: "Explore the capability" },
];


function SectionHead({ n, eyebrow, title, children }: { n: string; eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <header className="w-full">
      <p className="label-eyebrow">
        {n} · {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-2xl font-semibold leading-snug text-maroon">{title}</h2>
      {children ? <div className="mt-4 max-w-4xl text-sm leading-relaxed text-muted-foreground">{children}</div> : null}
    </header>
  );
}


function VisionPage() {
  return (
    <div className="min-h-screen bg-background">
      <BrandHeader />
      <PageToolbar crumbs={[{ label: "Vision" }]} />

      <main>
        {/* Intro */}
        <section className="mx-auto max-w-6xl px-6 pb-4 pt-10">
          <p className="label-eyebrow">The vision</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-foreground">
            A sustainable, scalable and repeatable way of delivering deals
          </h1>
          <p className="mt-5 max-w-4xl text-base leading-relaxed text-muted-foreground">
            Why Absa needs this capability, what it changes, what it enables, and how to explore it.
          </p>
          <ol className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-5 text-sm">
            {FLOW.map((item, i) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="flex items-baseline gap-2 text-muted-foreground hover:text-maroon">
                  <span className="font-display text-xs font-semibold text-red">0{i + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </section>

        {/* 1. Ambition and context */}
        <section id="ambition" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-12">
          <SectionHead n="01" eyebrow="Broader Absa context" title="Inorganic growth is a major focus of Absa's strategy">
            <p className="text-foreground">
              Absa's strategy is increasingly focused on growth across Africa, with inorganic activity expected to form an
              important part of that ambition. Acquisitions and divestments are a key lever for entering new markets,
              building scale and reshaping the portfolio. This M&A Capability Hub is being built to respond to this
              demand, and enable Absa to execute on this strategy.
            </p>
          </SectionHead>
          <div className="mt-5 flex gap-3 rounded-lg border border-border border-l-4 border-l-maroon bg-surface px-4 py-4">
            <Network className="mt-0.5 h-4 w-4 shrink-0 text-red" aria-hidden="true" />
            <div>
              <h3 className="font-display text-sm font-semibold text-maroon">A growing pipeline of transactions</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                As inorganic growth becomes more central to the strategy, Absa expects a greater volume of transactions,
                of increasing size and complexity, across more markets.
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm italic leading-relaxed text-muted-foreground">
            Delivering this ambition requires a sustainable, scalable and repeatable way of executing M&amp;A — which the
            Capability Hub is designed to provide.
          </p>
        </section>

        {/* 2. The current challenge */}
        <section id="challenge" className="scroll-mt-24 border-y border-border bg-surface">
          <div className="mx-auto max-w-6xl px-6 py-12">
            <SectionHead n="02" eyebrow="The current challenge" title="From experience-led delivery to an institutional execution capability">
              <p>
                Absa can no longer rely on a small, contractor-heavy and experience-led execution team to deliver
                increasingly complex and concurrent transactions across different countries, regulators, businesses and
                technology environments. The current model cannot scale much beyond one or two simple deals at a time.
              </p>
            </SectionHead>

            <div className="mt-8 grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr]">
              <div className="h-full border border-border bg-card px-7 py-6">
                <p className="label-eyebrow">Today</p>
                <ul className="mt-4 space-y-3">
                  {FRAGMENTED.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-muted-foreground/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-center gap-3 lg:flex-col" aria-hidden>
                <span className="h-px w-10 bg-red lg:h-16 lg:w-px" />
                <span className="font-display text-xl text-red">&rarr;</span>
                <span className="h-px w-10 bg-red lg:h-16 lg:w-px" />
              </div>
              <div className="h-full border-l-2 border-red bg-card px-7 py-6 shadow-panel">
                <p className="label-eyebrow">With the Hub</p>
                <ul className="mt-4 space-y-3">
                  {CONNECTED.map((item) => (
                    <li key={item} className="flex gap-3 text-sm font-medium leading-relaxed text-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-red" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 3. The capability response */}
        <section id="response" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-12">
          <SectionHead n="03" eyebrow="The capability response" title={VISION.title}>
            <p className="text-foreground">{VISION.body}</p>
          </SectionHead>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VISION.items.slice(0, -1).map(({ icon: Icon, ...item }) => (
              <div key={item.title} className="rounded-lg border border-border bg-card px-5 py-5 last:sm:col-span-2 last:lg:col-span-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-blush text-maroon">
                  <Icon className="h-4 w-4" />
                </span>
                <h3 className="mt-4 font-display text-sm font-semibold text-maroon">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
          {VISION.items.slice(-1).map(({ icon: Icon, ...item }) => (
            <div key={item.title} className="mt-4 rounded-lg border border-maroon/30 bg-blush px-5 py-5 sm:flex sm:items-start sm:gap-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-maroon text-maroon-foreground">
                <Icon className="h-4 w-4" />
              </span>
              <div className="mt-4 sm:mt-0">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-maroon/70">The outcome</p>
                <h3 className="mt-1 font-display text-base font-semibold text-maroon">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground">{item.body}</p>
              </div>
            </div>
          ))}

        </section>

        {/* 4. Explore the capability */}
        <section id="explore" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-12">
          <SectionHead n="04" eyebrow="Explore the capability" title="The Hub supports you through the end-to-end journey of a deal">
            <p>
              Archetypes drive lifecycles, and lifecycles drive how the operating model is stood up. Select any part of the
              capability to find how it was built and the content you need.
            </p>
          </SectionHead>
          <div className="mt-8 pb-40 lg:pb-48">
            <CapabilityHubMap />
          </div>
        </section>

        {/* Design principles (reached from "How we built this") */}
        <section id="design-principles" className="scroll-mt-24 border-t border-border bg-surface">
          <div className="mx-auto max-w-6xl space-y-6 px-6 py-12">


            <div>
              <p className="label-eyebrow mb-3">Two ways to use the capability</p>
            <div className="grid gap-px sm:grid-cols-2">
              <div className="bg-maroon px-6 py-5 text-maroon-foreground">
                <h4 className="font-display text-base font-semibold">The interactive portal</h4>
                <p className="mt-2 text-sm leading-relaxed text-maroon-foreground/80">
                  The executive-friendly view of the capability: archetypes, lifecycles, operating model and artefacts in
                  one place.
                </p>
              </div>
              <div className="bg-card px-6 py-5 outline outline-1 outline-border">
                <h4 className="font-display text-base font-semibold text-maroon">The AI agent</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Guided support for the teams executing deals, answering operational questions and drafting deal-specific
                  outputs from the same execution model and artefacts.
                </p>
              </div>
            </div>
            </div>

            <a href="#explore" className="inline-flex items-center gap-2 text-sm font-medium text-maroon hover:underline">
              &uarr; Back to the capability visual
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
