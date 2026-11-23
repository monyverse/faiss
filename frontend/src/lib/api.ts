/**
 * Typed client for the FAISS API (contract: backend/openapi.json; shapes: ./types.ts).
 * `createApi` takes a transport so the same client serves the app (same-origin `/api`, persona or
 * bearer token) and the embeddable copilot (host-supplied base URL and token).
 */

import { json, send, type Transport } from "./http";
import { readSse } from "./sse";
import type {
  AfricaCountries,
  AnswerIn,
  Approval,
  AuditEvent,
  AuditVerify,
  Briefing,
  Centralisation,
  CentralisationAssessment,
  ChatAnswer,
  ChatIn,
  ChatStreamEvent,
  Conversation,
  ConversationSummary,
  CountryPack,
  Deal,
  DealDetail,
  DealDocument,
  DealIn,
  Financials,
  FinancialsIn,
  Finding,
  Findings,
  GoalDetail,
  GoalEvents,
  GoalSummary,
  KnowledgeArea,
  KnowledgePassage,
  KnowledgeSearch,
  Member,
  MemberRole,
  Meta,
  Notifications,
  Person,
  UploadResult,
} from "./types";

/** Every value placed in a URL path is encoded, so an id can never add or change path segments. */
const seg = (value: string): string => encodeURIComponent(value);

export * from "./types";
export { ApiError, errorMessage } from "./http";
export type { Transport } from "./http";

export interface KnowledgeQuery {
  q: string;
  area?: string;
  archetype?: string;
  stage?: string;
  workstream?: string;
  include_history?: boolean;
  limit?: number;
}

export function createApi(transport: Transport) {
  const get = <T>(path: string, query?: Record<string, string | number | boolean | null | undefined>, signal?: AbortSignal) =>
    json<T>(transport, path, { ...(query ? { query } : {}), ...(signal ? { signal } : {}) });
  const call = <T>(method: string, path: string, body?: unknown) =>
    json<T>(transport, path, body === undefined ? { method } : { method, body });

  return {
    // -- reference
    me: () => get<Person>("/api/me"),
    directory: () => get<Person[]>("/api/directory"),
    meta: () => get<Meta>("/api/meta"),
    knowledgeSearch: (query: KnowledgeQuery, signal?: AbortSignal) =>
      get<KnowledgeSearch>("/api/knowledge/search", { ...query }, signal),
    knowledgeChunk: (id: string) => get<KnowledgePassage>(`/api/knowledge/chunks/${seg(id)}`),
    knowledgeAreas: () => get<KnowledgeArea[]>("/api/knowledge/areas"),
    africaCountries: () => get<AfricaCountries>("/api/africa/countries"),
    africaCountry: (iso: string) => get<CountryPack>(`/api/africa/countries/${seg(iso)}`),
    audit: (query: { deal_id?: string; limit?: number } = {}) => get<AuditEvent[]>("/api/audit", query),
    auditVerify: () => get<AuditVerify>("/api/audit/verify"),

    // -- deals
    deals: () => get<Deal[]>("/api/deals"),
    createDeal: (body: DealIn) => call<Deal>("POST", "/api/deals", body),
    deal: (id: string) => get<DealDetail>(`/api/deals/${seg(id)}`),
    updateDeal: (id: string, body: Partial<Pick<Deal, "code_name" | "target_name" | "stage_id" | "description" | "status">> & { countries?: string[] }) =>
      call<Deal>("PATCH", `/api/deals/${seg(id)}`, body),
    members: (dealId: string) => get<Member[]>(`/api/deals/${seg(dealId)}/members`),
    setMember: (dealId: string, body: { user_id: string; role: MemberRole; workstreams: string[] }) =>
      call<Member[]>("PUT", `/api/deals/${seg(dealId)}/members`, body),
    removeMember: (dealId: string, userId: string) =>
      call<Member[]>("DELETE", `/api/deals/${seg(dealId)}/members/${seg(userId)}`),
    documents: (dealId: string) => get<DealDocument[]>(`/api/deals/${seg(dealId)}/documents`),
    uploadDocument: (dealId: string, file: File) => {
      const form = new FormData();
      form.append("file", file, file.name);
      return call<UploadResult>("POST", `/api/deals/${seg(dealId)}/documents`, form);
    },
    findings: (dealId: string, query: { kind?: string; goal_id?: string } = {}) =>
      get<Findings>(`/api/deals/${seg(dealId)}/findings`, query),
    reviewFinding: (findingId: string, body: { decision: "validated" | "rejected"; note?: string }) =>
      call<Finding>("POST", `/api/findings/${seg(findingId)}/review`, body),
    financials: (dealId: string) => get<Financials>(`/api/deals/${seg(dealId)}/financials`),
    setFinancials: (dealId: string, body: FinancialsIn) => call<Financials>("PUT", `/api/deals/${seg(dealId)}/financials`, body),
    /** The workbook needs the auth header, so it is fetched and handed back as a blob to save. */
    valuationWorkbook: async (dealId: string): Promise<{ blob: Blob; filename: string }> => {
      const response = await send(transport, `/api/deals/${seg(dealId)}/valuation.xlsx`, { headers: { Accept: "*/*" } });
      const disposition = response.headers.get("content-disposition") ?? "";
      const match = /filename="?([^";]+)"?/.exec(disposition);
      return { blob: await response.blob(), filename: match?.[1] ?? `valuation-${dealId.slice(0, 8)}.xlsx` };
    },
    briefing: (dealId: string) => get<Briefing>(`/api/deals/${seg(dealId)}/briefing`),
    centralisation: (dealId: string) => get<Centralisation>(`/api/deals/${seg(dealId)}/centralisation`),
    recordCentralisation: (dealId: string, body: { workstream: string; answers: ("yes" | "no")[]; rationale: string }) =>
      call<CentralisationAssessment>("POST", `/api/deals/${seg(dealId)}/centralisation`, body),
    dealAudit: (dealId: string, limit = 50) => get<AuditEvent[]>(`/api/deals/${seg(dealId)}/audit`, { limit }),

    // -- goals
    createGoal: (dealId: string, body: { objective: string; budget_usd?: number; max_cycles?: number }) =>
      call<GoalDetail>("POST", `/api/deals/${seg(dealId)}/goals`, body),
    dealGoals: (dealId: string) => get<GoalSummary[]>(`/api/deals/${seg(dealId)}/goals`),
    goals: (state?: string) => get<GoalSummary[]>("/api/goals", { state }),
    goal: (goalId: string) => get<GoalDetail>(`/api/goals/${seg(goalId)}`),
    goalEvents: (goalId: string, after = 0) => get<GoalEvents>(`/api/goals/${seg(goalId)}/events`, { after }),
    answerGoal: (goalId: string, body: AnswerIn) => call<GoalDetail>("POST", `/api/goals/${seg(goalId)}/answers`, body),
    controlGoal: (goalId: string, action: "pause" | "resume" | "cancel") =>
      call<GoalDetail>("POST", `/api/goals/${seg(goalId)}/${seg(action)}`),

    // -- approvals and notifications
    approvals: (state: "pending" | "approved" | "rejected" | "all" = "pending") => get<Approval[]>("/api/approvals", { state }),
    decideApproval: (approvalId: string, body: { approve: boolean; note?: string }) =>
      call<Approval>("POST", `/api/approvals/${seg(approvalId)}/decision`, body),
    notifications: () => get<Notifications>("/api/notifications"),
    markNotificationsRead: () => call<{ unread: number }>("POST", "/api/notifications/read"),

    // -- assistant
    chat: (body: ChatIn) => call<ChatAnswer>("POST", "/api/chat", body),
    /**
     * Streams an answer. Yields `meta` first (conversation id, sources, mode), then `delta`
     * chunks of text, then `done`.
     */
    chatStream: async function* (body: ChatIn, signal?: AbortSignal): AsyncGenerator<ChatStreamEvent> {
      const response = await send(transport, "/api/chat/stream", {
        method: "POST",
        body,
        headers: { Accept: "text/event-stream" },
        ...(signal ? { signal } : {}),
      });
      for await (const message of readSse(response, signal)) {
        if (message.event !== "meta" && message.event !== "delta" && message.event !== "done") continue;
        let data: unknown;
        try {
          data = JSON.parse(message.data);
        } catch {
          continue;
        }
        yield { event: message.event, data } as ChatStreamEvent;
      }
    },
    conversations: (dealId?: string | null) => get<ConversationSummary[]>("/api/conversations", { deal_id: dealId }),
    conversation: (id: string) => get<Conversation>(`/api/conversations/${seg(id)}`),
  };
}

export type Api = ReturnType<typeof createApi>;
