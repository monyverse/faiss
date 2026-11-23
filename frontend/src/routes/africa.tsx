import { createFileRoute } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

import { Page } from "@/components/shell";
import { Badge, Card, Chip, ErrorState, LoadingCards, PageHeader, Tile } from "@/components/ui";
import type { CountryPack } from "@/lib/api";
import { titleCase } from "@/lib/format";
import { api, useApiQuery } from "@/lib/queries";

export const Route = createFileRoute("/africa")({ component: AfricaPage });

function AfricaPage() {
  const query = useApiQuery(["africa"], api.africaCountries, { staleTime: 5 * 60_000 });
  return (
    <Page>
      <PageHeader title="Africa" lead="Country packs: who supervises banks, who reviews mergers, and the questions to settle before relying on any of it." />
      {query.isPending ? (
        <LoadingCards count={3} />
      ) : query.isError ? (
        <ErrorState error={query.error} onRetry={() => void query.refetch()} what="Country packs" />
      ) : (
        <>
          <Card as="section" className="flex gap-3 border-sev-high/50 bg-sev-high/[0.08] p-4 md:p-5">
            <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-sev-high/50 text-sev-high"><TriangleAlert className="size-5" /></span>
            <div>
              <p className="text-base font-semibold text-ink">Unverified seed data</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{query.data.caveat}</p>
              {query.data.continental_notes.length ? (
                <ul className="mt-2.5 list-disc space-y-1 pl-5 text-sm text-ink-soft marker:text-ink-mute">
                  {query.data.continental_notes.map((note, i) => <li key={i}>{note}</li>)}
                </ul>
              ) : null}
            </div>
          </Card>
          <ul className="mt-5 grid gap-3.5 lg:grid-cols-2">
            {query.data.countries.map((country) => <Country key={country.iso} country={country} />)}
          </ul>
        </>
      )}
    </Page>
  );
}

function Country({ country }: { country: CountryPack }) {
  const rows: [string, string][] = [
    ["Banking supervisor", country.authorities.banking_supervisor],
    ["Competition", country.authorities.competition],
    ["Securities and markets", country.authorities.securities_and_markets],
    ...country.authorities.other.map((o): [string, string] => ["Other", o]),
  ];
  return (
    <Card as="li" className="p-4">
      <div className="flex items-start gap-3">
        <Tile text={country.iso} tone="amber" size="lg" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold tracking-tight text-ink">{country.name}</h2>
            <Badge tone={country.verified ? "ok" : "high"}>{country.verified ? "Verified" : "Unverified"}</Badge>
          </div>
          <p className="mt-0.5 text-sm text-ink-mute">Currency {country.currency} · Absa presence: {titleCase(country.absa_presence)}</p>
        </div>
      </div>
      <dl className="mt-3.5 space-y-2 text-sm">
        {rows.map(([label, value], i) => (
          <div key={i} className="grid gap-x-3 sm:grid-cols-[10.5rem_1fr]">
            <dt className="text-ink-mute">{label}</dt>
            <dd className="text-ink-soft [overflow-wrap:anywhere]">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {country.regional_blocs.map((bloc) => <Chip key={bloc}>{bloc}</Chip>)}
        {country.regional_competition_bodies.map((body) => <Chip key={body} className="whitespace-normal">{body}</Chip>)}
      </div>
      <details className="mt-3 rounded-lg border border-line bg-canvas/40">
        <summary className="flex min-h-11 cursor-pointer items-center px-3 text-sm font-medium text-ink-soft">Questions to resolve ({country.questions_to_resolve.length})</summary>
        <ul className="list-disc space-y-1.5 border-t border-line py-3 pl-8 pr-3 text-sm text-ink-soft marker:text-ink-mute">
          {country.questions_to_resolve.map((q, i) => <li key={i}>{q}</li>)}
        </ul>
      </details>
    </Card>
  );
}
