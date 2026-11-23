import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { History, Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { Chat } from "@/components/chat";
import { Button, Dialog, ErrorState, Skeleton, cx } from "@/components/ui";
import { timeAgo } from "@/lib/format";
import { api, useApiQuery, useIdentity, useMeta } from "@/lib/queries";

export const Route = createFileRoute("/assistant")({ component: AssistantPage });

const SUGGESTIONS = [
  "Who chairs the internal steering committee, and how often does it meet?",
  "What has to be in place before a deal passes Go/No-Go?",
  "How does a partial-business acquisition differ from a full-business acquisition?",
  "What does the Central Hub do during mobilisation?",
];

function AssistantPage() {
  const meta = useMeta().data;
  const identity = useIdentity();
  const client = useQueryClient();
  // `session` changes only when the person starts or opens a conversation, so a stream is never remounted mid-answer.
  const [session, setSession] = useState(0);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const conversations = useApiQuery(["conversations"], () => api.conversations());
  const opened = useApiQuery(["conversation", conversationId, session], () => api.conversation(conversationId ?? ""), { enabled: !!conversationId && session > 0, staleTime: Infinity, gcTime: 0 });
  const loadingOpened = !!conversationId && session > 0 && opened.isPending;

  // Another persona has other conversations: start clean when the identity changes.
  useEffect(() => {
    setConversationId(null);
    setSession(0);
  }, [identity]);

  const open = (id: string | null) => {
    setConversationId(id);
    setSession((n) => (id ? Math.abs(n) + 1 : -(Math.abs(n) + 1)));
    setHistoryOpen(false);
  };

  const list = (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="p-3">
        <Button className="w-full" onClick={() => open(null)} icon={<Plus className="size-4" />}>New conversation</Button>
      </div>
      <p className="px-4 pb-1.5 text-xs font-semibold uppercase tracking-wider text-ink-mute">Recent</p>
      <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-3">
        {conversations.isPending ? (
          <div className="space-y-2 p-2"><Skeleton className="h-4 w-4/5" /><Skeleton className="h-4 w-3/5" /></div>
        ) : conversations.isError ? (
          <p className="px-2 text-sm text-sev-critical">Conversations could not be loaded.</p>
        ) : conversations.data.length === 0 ? (
          <p className="px-2 text-sm text-ink-mute">Your conversations appear here.</p>
        ) : (
          <ul className="space-y-0.5">
            {conversations.data.map((c) => (
              <li key={c.id}>
                <button type="button" onClick={() => open(c.id)} aria-current={c.id === conversationId ? "true" : undefined} className={cx("block min-h-11 w-full rounded-lg px-2.5 py-2 text-left", c.id === conversationId ? "bg-raised" : "hover:bg-raised")}>
                  <span className="line-clamp-2 text-sm text-ink-soft">{c.title}</span>
                  <span className="mt-0.5 block text-[0.7rem] text-ink-mute">{timeAgo(c.updated_at)}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-[calc(100dvh-3.5rem-3.5rem-env(safe-area-inset-bottom))] lg:h-[calc(100dvh-3.5rem)]">
      <aside aria-label="Conversations" className="hidden w-64 shrink-0 flex-col border-r border-line md:flex">{list}</aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-2 border-b border-line px-3 py-1 md:hidden">
          <Button variant="ghost" onClick={() => setHistoryOpen(true)} icon={<History className="size-4" />}>Conversations</Button>
          <Button variant="ghost" onClick={() => open(null)} icon={<Plus className="size-4" />}>New</Button>
        </div>
        {loadingOpened ? (
          <div className="mx-auto w-full max-w-3xl space-y-3 p-5" role="status" aria-label="Loading conversation"><Skeleton className="h-4 w-1/2" /><Skeleton className="h-4 w-4/5" /><Skeleton className="h-4 w-2/3" /></div>
        ) : conversationId && session > 0 && opened.isError ? (
          <div className="p-5"><ErrorState error={opened.error} onRetry={() => void opened.refetch()} what="This conversation" /></div>
        ) : (
          <Chat
            key={`${identity}:${session}`}
            api={api}
            mode={meta?.reasoning}
            className="min-h-0 flex-1"
            conversationId={session > 0 ? conversationId : null}
            {...(session > 0 && opened.data ? { initialMessages: opened.data.messages } : {})}
            onConversation={setConversationId}
            onAnswered={() => void client.invalidateQueries({ queryKey: [identity, "conversations"] })}
            suggestions={SUGGESTIONS}
            heading="Ask about the M&A methodology"
            intro={`Answers come from the ${meta ? meta.corpus.chunkCount.toLocaleString("en-GB") : ""} approved passages of the Capability Hub, each shown with its source. To ask about one deal's documents, use the Assistant tab inside that deal.`}
          />
        )}
      </div>
      <Dialog open={historyOpen} onOpenChange={setHistoryOpen} title="Conversations">
        <div className="-mx-5 -my-4 flex max-h-[70dvh] flex-col">{list}</div>
      </Dialog>
    </div>
  );
}
