/**
 * The assistant conversation. Used by the /assistant page, the deal workspace and the embeddable
 * <faiss-copilot> element, so it depends on nothing but an API client: no router, no query cache,
 * no portals (it must work inside a shadow root).
 */
import clsx from "clsx";
import { ArrowUp, BookOpen, Square, WifiOff } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";

import type { Api, Citation, ConversationMessage } from "@/lib/api";
import { ApiError, errorMessage } from "@/lib/http";

import { CitationPanel, citationRef } from "./citations";
import { Markdown } from "./markdown";

interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
  citations: Citation[];
  mode?: string;
  streaming?: boolean;
  error?: string;
  restricted?: boolean;
}

export interface ChatProps {
  api: Pick<Api, "chatStream">;
  /** Scope the conversation to one deal: its documents and stage are used as context. */
  dealId?: string | null;
  conversationId?: string | null;
  initialMessages?: ConversationMessage[];
  onConversation?: (conversationId: string) => void;
  onAnswered?: () => void;
  suggestions?: string[];
  heading?: string;
  intro?: string;
  /** The platform's reasoning mode, if already known, so the empty state can say so. */
  mode?: string | undefined;
  className?: string;
}

export const OFFLINE_NOTE = "Offline mode: answers are the most relevant approved passages, quoted as they are. No text is generated.";

let nextId = 1;

export function Chat({ api, dealId = null, conversationId = null, initialMessages, onConversation, onAnswered, suggestions = [], heading, intro, mode, className }: ChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    (initialMessages ?? []).map((m) => ({ id: nextId++, role: m.role, content: m.content, citations: m.citations ?? [] })),
  );
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [sources, setSources] = useState<{ messageId: number; active: number | null } | null>(null);
  const conversation = useRef<string | null>(conversationId);
  const abort = useRef<AbortController | null>(null);
  const scroller = useRef<HTMLDivElement | null>(null);
  const pinned = useRef(true);
  const input = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => () => abort.current?.abort(), []);

  useEffect(() => {
    const node = scroller.current;
    if (node && pinned.current) node.scrollTop = node.scrollHeight;
  }, [messages, sources]);

  const patch = useCallback((id: number, change: (message: ChatMessage) => ChatMessage) => {
    setMessages((current) => current.map((message) => (message.id === id ? change(message) : message)));
  }, []);

  const ask = useCallback(
    async (question: string) => {
      const text = question.trim();
      if (text.length < 2 || busy) return;
      const answerId = nextId++;
      setMessages((current) => [
        ...current,
        { id: nextId++, role: "user", content: text, citations: [] },
        { id: answerId, role: "assistant", content: "", citations: [], streaming: true },
      ]);
      setDraft("");
      setBusy(true);
      pinned.current = true;
      const controller = new AbortController();
      abort.current = controller;
      try {
        const stream = api.chatStream({ question: text, deal_id: dealId, conversation_id: conversation.current }, controller.signal);
        for await (const event of stream) {
          if (event.event === "meta") {
            if (!conversation.current) onConversation?.(event.data.conversation_id);
            conversation.current = event.data.conversation_id;
            patch(answerId, (m) => ({ ...m, citations: event.data.citations, mode: event.data.mode }));
          } else if (event.event === "delta") {
            patch(answerId, (m) => ({ ...m, content: m.content + event.data.text }));
          }
        }
        patch(answerId, (m) => ({ ...m, streaming: false }));
        onAnswered?.();
      } catch (error) {
        const stopped = controller.signal.aborted;
        patch(answerId, (m) => ({
          ...m,
          streaming: false,
          ...(stopped ? {} : { error: errorMessage(error), restricted: error instanceof ApiError && (error.status === 403 || error.status === 404) }),
        }));
      } finally {
        setBusy(false);
        abort.current = null;
      }
    },
    [api, busy, dealId, onAnswered, onConversation, patch],
  );

  const submit = (event: FormEvent) => {
    event.preventDefault();
    void ask(draft);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      void ask(draft);
    }
  };

  const shown = sources ? messages.find((m) => m.id === sources.messageId) : undefined;

  return (
    <div className={clsx("@container relative flex min-h-0 overflow-hidden", className)}>
      <div className="flex min-w-0 flex-1 flex-col">
        <div
          ref={scroller}
          onScroll={(event) => {
            const node = event.currentTarget;
            pinned.current = node.scrollHeight - node.scrollTop - node.clientHeight < 80;
          }}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
        >
          {messages.length === 0 ? (
            <div className="mx-auto flex min-h-full w-full max-w-2xl flex-col justify-center px-4 py-8">
              <p className="text-xl font-semibold tracking-tight text-ink">{heading ?? "Ask about the M&A methodology"}</p>
              <p className="mt-1.5 text-sm text-ink-mute">
                {intro ?? "Answers come from Absa's approved methodology, each with its sources so you can check them."}
              </p>
              {mode === "offline" ? <OfflineNote className="mt-4" /> : null}
              {suggestions.length ? (
                <ul className="mt-5 grid gap-2 @xl:grid-cols-2">
                  {suggestions.map((suggestion) => (
                    <li key={suggestion}>
                      <button
                        type="button"
                        onClick={() => void ask(suggestion)}
                        className="flex min-h-11 w-full items-center rounded-xl border border-line bg-panel px-3.5 py-2.5 text-left text-sm text-ink-soft transition-colors hover:border-line-strong hover:bg-raised hover:text-ink"
                      >
                        {suggestion}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : (
            <ol className="mx-auto w-full max-w-3xl space-y-5 px-4 py-5">
              {messages.map((message) =>
                message.role === "user" ? (
                  <li key={message.id} className="flex justify-end">
                    <p className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-maroon px-3.5 py-2.5 text-[0.9375rem] text-white [overflow-wrap:anywhere]">
                      {message.content}
                    </p>
                  </li>
                ) : (
                  <li key={message.id} className="min-w-0">
                    <p className="mb-1.5 flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wider text-ink-mute">
                      FAISS
                      {message.mode === "offline" ? (
                        <span className="tint-amber inline-flex items-center gap-1 rounded-full border px-2 py-0.5 normal-case tracking-normal">
                          <WifiOff className="size-3" /> Offline: approved passages, not generated prose
                        </span>
                      ) : null}
                    </p>
                    {message.error ? (
                      <p role="alert" className={clsx("rounded-lg border px-3 py-2 text-sm", message.restricted ? "tint-amber" : "tint-sev-critical")}>
                        {message.error}
                      </p>
                    ) : message.content ? (
                      <div className="text-[0.9375rem]">
                        <Markdown
                          text={message.content}
                          citeCount={message.citations.length}
                          onCite={(n) => setSources({ messageId: message.id, active: n - 1 })}
                        />
                      </div>
                    ) : (
                      <p role="status" className="flex items-center gap-2 text-sm text-ink-mute">
                        <span className="inline-block size-2 rounded-full bg-amber [animation:faiss-pulse_1s_ease-in-out_infinite]" />
                        Finding the relevant passages…
                      </p>
                    )}
                    {message.streaming && message.content ? <span aria-hidden className="ml-0.5 inline-block h-4 w-1.5 translate-y-0.5 bg-amber [animation:faiss-pulse_1s_ease-in-out_infinite]" /> : null}
                    {message.citations.length && !message.error ? (
                      <div className="mt-3 flex flex-wrap items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSources({ messageId: message.id, active: null })}
                          className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line-strong/70 bg-raised px-3 text-xs font-medium text-ink-soft hover:text-ink @3xl:min-h-9"
                        >
                          <BookOpen className="size-3.5" /> {message.citations.length} sources
                        </button>
                        {message.citations.map((citation, index) => (
                          <button
                            key={index}
                            type="button"
                            title={citation.title}
                            onClick={() => setSources({ messageId: message.id, active: index })}
                            className="inline-flex min-h-11 max-w-[13rem] items-center gap-1.5 rounded-full border border-line bg-panel pl-1.5 pr-2.5 text-xs text-ink-soft hover:border-line-strong hover:text-ink @3xl:min-h-9"
                          >
                            <span className="tnum inline-flex h-5 min-w-5 items-center justify-center rounded-full border border-amber/45 bg-amber/15 px-1 text-[0.7rem] font-semibold text-amber">
                              {citationRef(citation, index)}
                            </span>
                            <span className="truncate">{citation.title}</span>
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </li>
                ),
              )}
            </ol>
          )}
        </div>

        <form onSubmit={submit} className="border-t border-line bg-canvas/40 px-3 pb-3 pt-2.5">
          <div className="mx-auto flex w-full max-w-3xl items-end gap-2 rounded-2xl border border-line-strong/70 bg-panel p-1.5 focus-within:border-amber">
            <textarea
              ref={input}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={onKeyDown}
              rows={1}
              maxLength={4000}
              placeholder={dealId ? "Ask about this deal or the methodology" : "Ask about the methodology"}
              aria-label="Your question"
              className="max-h-40 min-h-11 flex-1 resize-none bg-transparent px-2.5 py-2.5 text-ink [field-sizing:content] placeholder:text-ink-mute focus:outline-none"
            />
            {busy ? (
              <button type="button" onClick={() => abort.current?.abort()} aria-label="Stop" className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-raised text-ink hover:bg-line">
                <Square className="size-4 fill-current" />
              </button>
            ) : (
              <button type="submit" disabled={draft.trim().length < 2} aria-label="Send" className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-red text-white transition-colors hover:bg-[oklch(0.57_0.2_21)] disabled:opacity-40">
                <ArrowUp className="size-5" />
              </button>
            )}
          </div>
        </form>
      </div>

      {shown && sources ? (
        <CitationPanel
          citations={shown.citations}
          active={sources.active}
          onClose={() => setSources(null)}
          className="absolute inset-0 z-10 @4xl:static @4xl:w-[24rem] @4xl:shrink-0 @4xl:border-l @4xl:border-line"
        />
      ) : null}
    </div>
  );
}

export function OfflineNote({ className }: { className?: string }) {
  return (
    <p className={clsx("tint-amber flex items-start gap-2 rounded-lg border px-3 py-2 text-sm", className)}>
      <WifiOff className="mt-0.5 size-4 shrink-0" />
      <span>{OFFLINE_NOTE}</span>
    </p>
  );
}
