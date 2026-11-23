import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, Download, Pencil } from "lucide-react";
import { useState, type FormEvent } from "react";

import type { DealDetail, Financials, FinancialsIn } from "@/lib/api";
import { errorMessage } from "@/lib/api";
import { formatNumber } from "@/lib/format";
import { api, useApiQuery, useIdentity, useLookups, useMeta } from "@/lib/queries";

import { Badge, Button, Card, ErrorState, Field, Input, LoadingCards, Notice, SectionTitle, Stat, cx } from "../ui";

export function FinancialsTab({ deal }: { deal: DealDetail }) {
  const client = useQueryClient();
  const identity = useIdentity();
  const key = [identity, "deal", deal.id, "financials"];
  const query = useApiQuery(["deal", deal.id, "financials"], () => api.financials(deal.id));
  const save = useMutation({
    mutationFn: (body: FinancialsIn) => api.setFinancials(deal.id, body),
    onSuccess: (data) => client.setQueryData(key, data),
  });
  const download = useMutation({
    mutationFn: async () => {
      const { blob, filename } = await api.valuationWorkbook(deal.id);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    },
  });

  if (query.isPending) return <LoadingCards count={3} />;
  if (query.isError) return <ErrorState error={query.error} onRetry={() => void query.refetch()} what="Financials" />;
  const data = query.data;
  const canWrite = deal.access?.can_write ?? false;
  const unit = [data.currency, data.unit].filter(Boolean).join(" ");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-2xl text-sm text-ink-mute">
          Every number here is computed by a deterministic engine from the figures below, never by a language model.
          {unit ? <> Figures are in <span className="text-ink-soft">{unit}</span>{data.period ? `, ${data.period}` : ""}.</> : null}
        </p>
        <Button busy={download.isPending} onClick={() => download.mutate()} icon={<Download className="size-4" />}>Download workbook</Button>
      </div>
      {download.isError ? <Notice tone="error">{errorMessage(download.error)}</Notice> : null}
      {save.isError ? <Notice tone="error">{errorMessage(save.error)}</Notice> : null}

      <Figures data={data} canWrite={canWrite} saving={save.isPending} onSave={(figures) => save.mutate({ figures })} />
      <Assumptions data={data} canWrite={canWrite} saving={save.isPending} onSave={(assumptions) => save.mutate({ assumptions })} />
      <Ratios data={data} />
      <ValuationView data={data} unit={unit} />
    </div>
  );
}

function Figures({ data, canWrite, saving, onSave }: { data: Financials; canWrite: boolean; saving: boolean; onSave: (figures: Record<string, number | null>) => void }) {
  const meta = useMeta().data;
  const { person } = useLookups();
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const keys = Object.keys(meta?.financial_line_items ?? data.inputs);
  const unverified = data.unverified_inputs.length;
  return (
    <section>
      <SectionTitle hint={unverified ? `${unverified} figure${unverified === 1 ? " was" : "s were"} read from documents and not yet confirmed by a person.` : "Every figure has been confirmed by a person."}>
        Figures
      </SectionTitle>
      <Card className="divide-y divide-line">
        {keys.map((k) => {
          const figure = data.inputs[k];
          const label = meta?.financial_line_items[k] ?? k;
          const isEditing = editing === k;
          const commit = (event: FormEvent) => {
            event.preventDefault();
            const value = draft.trim() === "" ? null : Number(draft);
            if (value !== null && Number.isNaN(value)) return;
            onSave({ [k]: value });
            setEditing(null);
          };
          return (
            <div key={k} className="p-3.5 md:px-4">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <p className="min-w-0 flex-1 basis-40 text-sm font-medium text-ink">{label}</p>
                {isEditing ? (
                  <form onSubmit={commit} className="flex basis-full items-center gap-2 sm:basis-auto">
                    <Input autoFocus type="number" inputMode="decimal" step="any" value={draft} onChange={(e) => setDraft(e.target.value)} aria-label={label} className="tnum w-40" />
                    <Button type="submit" variant="primary" busy={saving}>Save</Button>
                    <Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
                  </form>
                ) : (
                  <>
                    <p className={cx("tnum text-right text-[0.9375rem] font-semibold", figure ? "text-amber" : "text-ink-mute")}>{figure ? formatNumber(figure.value) : "Missing"}</p>
                    {figure ? (
                      <Badge tone={figure.status === "verified" ? "ok" : "medium"}>{figure.status === "verified" ? "Verified" : "Unverified"}</Badge>
                    ) : (
                      <Badge tone="critical">Not provided</Badge>
                    )}
                    {canWrite ? (
                      <span className="flex gap-1.5">
                        {figure && figure.status !== "verified" ? (
                          <Button disabled={saving} onClick={() => onSave({ [k]: figure.value })} icon={<Check className="size-4" />} aria-label={`Confirm ${label}`}>Confirm</Button>
                        ) : null}
                        <Button variant="ghost" disabled={saving} onClick={() => { setEditing(k); setDraft(figure ? String(figure.value) : ""); }} icon={<Pencil className="size-4" />} aria-label={`Edit ${label}`}>
                          {figure ? "Edit" : "Enter"}
                        </Button>
                      </span>
                    ) : null}
                  </>
                )}
              </div>
              {figure?.source?.quote ? (
                <p className="mt-2 text-xs text-ink-mute">
                  From <span className="text-ink-soft [overflow-wrap:anywhere]">{figure.source.document}</span>{figure.source.page != null ? `, page ${figure.source.page}` : ""}:
                  <span className="mt-1 block overflow-x-auto whitespace-pre rounded border border-line bg-canvas/60 px-2 py-1 font-mono text-[0.72rem] text-ink-soft">{figure.source.quote.replace(/\s{2,}/g, "  ")}</span>
                </p>
              ) : null}
              {figure?.source?.confirmed_by ? <p className="mt-1 text-xs text-ink-mute">Confirmed by {person(figure.source.confirmed_by)}</p> : null}
            </div>
          );
        })}
      </Card>
    </section>
  );
}

function Assumptions({ data, canWrite, saving, onSave }: { data: Financials; canWrite: boolean; saving: boolean; onSave: (assumptions: Record<string, number | null>) => void }) {
  const meta = useMeta().data;
  const { person } = useLookups();
  const labels = meta?.valuation_assumptions ?? {};
  const [draft, setDraft] = useState<Record<string, string>>({});
  const value = (k: string) => draft[k] ?? (data.assumptions[k] ? String(data.assumptions[k]?.value) : "");
  const dirty = Object.keys(draft).length > 0;
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const out: Record<string, number | null> = {};
    for (const [k, raw] of Object.entries(draft)) out[k] = raw.trim() === "" ? null : Number(raw);
    onSave(out);
    setDraft({});
  };
  return (
    <section>
      <SectionTitle hint="These are the deal team's judgements. The engine has no defaults: without them there is no valuation.">Assumptions</SectionTitle>
      <Card className="p-4">
        <form onSubmit={submit}>
          <div className="grid gap-3 sm:grid-cols-3">
            {Object.entries(labels).map(([k, label]) => (
              <Field key={k} label={label} hint={data.assumptions[k]?.set_by ? `Set by ${person(data.assumptions[k]?.set_by)}` : "Not set"}>
                <Input type="number" inputMode="decimal" step="any" disabled={!canWrite} value={value(k)} onChange={(e) => setDraft((d) => ({ ...d, [k]: e.target.value }))} className="tnum" />
              </Field>
            ))}
          </div>
          {canWrite ? (
            <div className="mt-4 flex gap-2">
              <Button type="submit" variant="primary" busy={saving} disabled={!dirty}>Save assumptions</Button>
              {dirty ? <Button variant="ghost" onClick={() => setDraft({})}>Discard</Button> : null}
            </div>
          ) : null}
        </form>
      </Card>
    </section>
  );
}

function Ratios({ data }: { data: Financials }) {
  const { lineItem } = useLookups();
  return (
    <section>
      <SectionTitle hint="Each ratio shows the formula it was computed with.">Ratios</SectionTitle>
      <Card className="grid divide-y divide-line sm:grid-cols-2 sm:divide-y-0">
        {data.ratios.map((ratio, index) => (
          <div key={ratio.key} className={cx("p-3.5 md:px-4", "sm:border-line", index % 2 === 0 && "sm:border-r", index >= 2 && "sm:border-t")}>
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-sm font-medium text-ink">{ratio.label}</p>
              <p className={cx("tnum text-lg font-semibold", ratio.value == null ? "text-ink-mute" : "text-amber")}>{ratio.value == null ? "—" : `${formatNumber(ratio.value)}${ratio.unit}`}</p>
            </div>
            <p className="mt-1 font-mono text-[0.72rem] text-ink-mute">{ratio.formula}</p>
            {ratio.missing.length ? <p className="mt-1 text-xs text-sev-medium">Needs: {ratio.missing.map(lineItem).join(", ")}</p> : null}
            {ratio.note ? <p className="mt-1 text-xs text-ink-mute">{ratio.note}</p> : null}
          </div>
        ))}
      </Card>
    </section>
  );
}

function ValuationView({ data, unit }: { data: Financials; unit: string }) {
  const { lineItem } = useLookups();
  const v = data.valuation;
  if (!v.available) {
    const needs = [...(v.missing_inputs ?? []), ...(v.missing_assumptions ?? [])];
    return (
      <section>
        <SectionTitle>Valuation</SectionTitle>
        <Notice tone="warn">
          {v.error ?? "No valuation yet."} {needs.length ? `Still needed: ${needs.map(lineItem).join(", ")}.` : ""} The engine does not assume values it has not been given.
        </Notice>
      </section>
    );
  }
  const growth = v.sensitivity?.[0]?.values.map((cell) => cell.long_term_growth) ?? [];
  return (
    <section>
      <SectionTitle hint={v.method}>Valuation</SectionTitle>
      <Card className="grid grid-cols-2 gap-4 p-4 md:grid-cols-4 md:p-5">
        <Stat label="Implied equity value" value={<span className="text-amber">{formatNumber(v.implied_equity_value)}</span>} sub={unit} />
        <Stat label="Justified price-to-book" value={`${formatNumber(v.justified_price_to_book)}×`} />
        <Stat label="Implied price-to-earnings" value={v.implied_price_to_earnings == null ? "—" : `${formatNumber(v.implied_price_to_earnings)}×`} />
        <Stat label="Return on equity" value={`${formatNumber(v.return_on_equity_pct)}%`} sub={`CoE ${formatNumber(v.cost_of_equity_pct)}% · growth ${formatNumber(v.long_term_growth_pct)}%`} />
        {v.offer ? (
          <>
            <Stat label="Offer price" value={formatNumber(v.offer.price)} sub={unit} />
            <Stat label="Offer price-to-book" value={`${formatNumber(v.offer.price_to_book)}×`} />
            <Stat label="Offer price-to-earnings" value={v.offer.price_to_earnings == null ? "—" : `${formatNumber(v.offer.price_to_earnings)}×`} />
            <Stat label="Offer vs implied value" value={`${v.offer.premium_to_implied_value_pct > 0 ? "+" : ""}${formatNumber(v.offer.premium_to_implied_value_pct)}%`} sub={v.offer.premium_to_implied_value_pct > 0 ? "Premium" : "Discount"} />
          </>
        ) : null}
      </Card>

      {v.sensitivity?.length ? (
        <Card className="mt-3 overflow-hidden">
          <p className="border-b border-line px-4 py-2.5 text-sm font-medium text-ink">Sensitivity: implied equity value{unit ? ` (${unit})` : ""}</p>
          <div className="overflow-x-auto">
            <table className="tnum w-full min-w-[26rem] border-collapse text-sm">
              <thead>
                <tr className="text-xs text-ink-mute">
                  <th scope="col" className="px-4 py-2 text-left font-medium">Cost of equity ↓ · Growth →</th>
                  {growth.map((g) => <th key={g} scope="col" className="px-4 py-2 text-right font-medium">{formatNumber(g)}%</th>)}
                </tr>
              </thead>
              <tbody>
                {v.sensitivity.map((row) => (
                  <tr key={row.cost_of_equity} className="border-t border-line">
                    <th scope="row" className="px-4 py-2 text-left font-medium text-ink-soft">{formatNumber(row.cost_of_equity)}%</th>
                    {row.values.map((cell) => {
                      const base = row.cost_of_equity === v.cost_of_equity_pct && cell.long_term_growth === v.long_term_growth_pct;
                      return (
                        <td key={cell.long_term_growth} className={cx("px-4 py-2 text-right", base ? "bg-amber/15 font-semibold text-amber" : "text-ink-soft")}>
                          {formatNumber(cell.equity_value)}
                          <span className="block text-[0.7rem] font-normal text-ink-mute">{cell.price_to_book == null ? "—" : `${formatNumber(cell.price_to_book)}× book`}{base ? " · base" : ""}</span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : null}

      {v.limits?.length ? (
        <Card className="mt-3 p-4">
          <p className="text-sm font-medium text-ink">What this valuation does not do</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-soft marker:text-ink-mute">
            {v.limits.map((limit, i) => <li key={i}>{limit}</li>)}
          </ul>
        </Card>
      ) : null}
    </section>
  );
}
