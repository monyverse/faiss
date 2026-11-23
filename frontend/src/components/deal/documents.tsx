import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FileText, UploadCloud } from "lucide-react";
import { useRef, useState, type DragEvent } from "react";

import type { DealDetail, UploadResult } from "@/lib/api";
import { errorMessage } from "@/lib/api";
import { formatBytes, formatDateTime } from "@/lib/format";
import { api, useApiQuery, useIdentity, useLookups } from "@/lib/queries";

import { Badge, Card, Chip, EmptyState, ErrorState, LoadingCards, Notice, SectionTitle, Spinner, cx } from "../ui";

export function DocumentsTab({ deal }: { deal: DealDetail }) {
  const client = useQueryClient();
  const identity = useIdentity();
  const { workstream, person, lineItem } = useLookups();
  const input = useRef<HTMLInputElement | null>(null);
  const [over, setOver] = useState(false);
  const [results, setResults] = useState<UploadResult[]>([]);
  const documents = useApiQuery(["deal", deal.id, "documents"], () => api.documents(deal.id));
  const upload = useMutation({
    mutationFn: async (files: File[]) => {
      const done: UploadResult[] = [];
      for (const file of files) done.push(await api.uploadDocument(deal.id, file));
      return done;
    },
    onSuccess: (done) => setResults(done),
    onSettled: () => {
      void client.invalidateQueries({ queryKey: [identity, "deal", deal.id] });
      void client.invalidateQueries({ queryKey: [identity, "deals"] });
      void client.invalidateQueries({ queryKey: [identity, "goals"] });
    },
  });
  const canWrite = deal.access?.can_write ?? false;
  const send = (list: FileList | null) => {
    if (list?.length) upload.mutate([...list]);
  };
  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    setOver(false);
    if (canWrite) send(event.dataTransfer.files);
  };
  const resumed = results.reduce((n, r) => n + r.goals_resumed, 0);

  return (
    <div className="space-y-6">
      {canWrite ? (
        <section>
          <div
            onDragOver={(e) => { e.preventDefault(); setOver(true); }}
            onDragLeave={() => setOver(false)}
            onDrop={onDrop}
            className={cx("flex flex-col items-center rounded-card border border-dashed px-4 py-8 text-center transition-colors", over ? "border-amber bg-amber/[0.06]" : "border-line-strong bg-panel")}
          >
            <span className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-raised text-ink-soft">
              {upload.isPending ? <Spinner /> : <UploadCloud className="size-5" />}
            </span>
            <p className="mt-3 font-medium text-ink">{upload.isPending ? "Uploading and reading…" : "Drop documents here"}</p>
            <p className="mt-1 max-w-md text-sm text-ink-mute">Each document is classified, routed to its workstream and read for facts. Goals that were waiting on documents resume by themselves.</p>
            <button type="button" disabled={upload.isPending} onClick={() => input.current?.click()} className="mt-4 inline-flex min-h-11 items-center rounded-lg border border-line-strong/60 bg-raised px-4 text-sm font-medium text-ink hover:bg-line disabled:opacity-50">
              Choose files
            </button>
            <input ref={input} type="file" multiple className="sr-only" aria-label="Choose documents to upload" onChange={(e) => { send(e.target.files); e.target.value = ""; }} />
          </div>
          {upload.isError ? <Notice tone="error" className="mt-3">{errorMessage(upload.error)}</Notice> : null}
          {results.length ? (
            <Notice tone="ok" className="mt-3">
              {results.length === 1 ? `“${results[0]?.filename}” was added as ${results[0]?.doc_type_label.toLowerCase()}.` : `${results.length} documents were added.`}{" "}
              {results.reduce((n, r) => n + r.facts_extracted.length, 0)} fact(s) found.{" "}
              <strong className="font-semibold">{resumed === 0 ? "No goals were waiting on documents." : `${resumed} goal${resumed === 1 ? "" : "s"} resumed.`}</strong>
            </Notice>
          ) : null}
        </section>
      ) : (
        <Notice>You have read-only access to this deal, so you cannot upload documents.</Notice>
      )}

      <section>
        <SectionTitle hint="You see the documents of the workstreams you have access to.">Data room</SectionTitle>
        {documents.isPending ? (
          <LoadingCards count={2} />
        ) : documents.isError ? (
          <ErrorState error={documents.error} onRetry={() => void documents.refetch()} what="Documents" />
        ) : documents.data.length === 0 ? (
          <EmptyState title="No documents yet" icon={<FileText className="size-5" />}>Upload the target's financial statements, legal schedules and regulatory correspondence to start diligence.</EmptyState>
        ) : (
          <ul className="space-y-2.5">
            {documents.data.map((doc) => (
              <Card as="li" key={doc.id} className="p-3.5 md:p-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-line bg-raised text-ink-soft"><FileText className="size-4" /></span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-ink [overflow-wrap:anywhere]">{doc.filename}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                      <Chip className="whitespace-normal">{doc.doc_type_label}</Chip>
                      <Chip>{workstream(doc.workstream)}</Chip>
                      <Badge tone={doc.status === "processed" ? "ok" : doc.status === "failed" ? "critical" : "info"}>{doc.status === "processed" ? "Read" : doc.status}</Badge>
                    </div>
                    {doc.note ? <p className="mt-2 text-sm text-ink-soft">{doc.note}</p> : null}
                    <p className="mt-2 text-sm text-ink-mute">
                      {doc.facts_found.length ? <>Facts found: <span className="text-ink-soft">{doc.facts_found.map(lineItem).join(", ")}</span></> : "No facts were extracted from this document."}
                    </p>
                    <p className="tnum mt-1.5 text-xs text-ink-mute">{formatBytes(doc.size)} · uploaded by {person(doc.uploaded_by)} · {formatDateTime(doc.created_at)}</p>
                  </div>
                </div>
              </Card>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
