/**
 * Response shapes of the FAISS API, written by hand from
 * backend/faiss_platform/api/{reference,deals,work}.py (the OpenAPI response schemas are untyped).
 */

export type Severity = "critical" | "high" | "medium" | "low" | "info";

// ---------------------------------------------------------------- reference

export interface Person {
  sub: string;
  name: string;
  email: string;
  title: string;
  roles: string[];
  countries: string[];
}

export interface StageRef {
  id: string;
  index: string;
  title: string;
}

export interface MetaStage extends StageRef {
  purpose: string;
}

export interface Archetype {
  id: string;
  name: string;
  side: string;
  description: string;
  perimeter: string;
  variants: string[];
  stages: MetaStage[];
}

export interface CentralisationTest {
  status?: string;
  source?: string;
  questions: string[];
  outcomeIfAnyNo: string;
  outcomeIfAllYes: string;
}

export interface Meta {
  platform: string;
  env: string;
  auth_mode: "dev" | "oidc";
  reasoning: "offline" | "gateway";
  retriever: string;
  scheduler: string;
  corpus: {
    corpusVersion: string;
    chunkCount: number;
    characters: number;
    byOrigin: Record<string, number>;
    byArea: Record<string, number>;
    snapshotHash: string;
  };
  archetypes: Archetype[];
  workstreams: { id: string; name: string }[];
  forums: { id: string; name: string; kind: string; chair: string; cadence: string }[];
  centralisation_test: CentralisationTest;
  agents: { key: string; name: string; mandate: string; tools: string[] }[];
  countries: { iso: string; name: string }[];
  financial_line_items: Record<string, string>;
  valuation_assumptions: Record<string, string>;
  expected_documents: Record<string, string>;
}

export interface KnowledgeSource {
  path: string;
  export?: string;
  pointer?: string;
}

export interface KnowledgePassage {
  id: string;
  area: string;
  origin: string;
  title: string;
  breadcrumb: string[];
  text: string;
  source: KnowledgeSource;
  site_routes: string[];
  tags: Record<string, unknown>;
  status: string;
  score?: number;
}

export interface KnowledgeSearch {
  query: string;
  results: KnowledgePassage[];
}

export interface KnowledgeArea {
  area: string;
  chunks: number;
}

export interface CountryPack {
  iso: string;
  name: string;
  currency: string;
  absa_presence: string;
  authorities: {
    banking_supervisor: string;
    competition: string;
    securities_and_markets: string;
    other: string[];
  };
  regional_blocs: string[];
  regional_competition_bodies: string[];
  questions_to_resolve: string[];
  verified: boolean;
  caveat: string;
}

export interface AfricaCountries {
  caveat: string;
  continental_notes: string[];
  countries: CountryPack[];
}

export interface AuditEvent {
  id: number;
  ts: string;
  actor: string;
  actor_type: string;
  action: string;
  deal_id?: string | null;
  resource: string;
  outcome: string;
  detail?: Record<string, unknown>;
  hash?: string;
}

export interface AuditVerify {
  intact: boolean;
  events: number;
  broken_at_id: number | null;
}

// ---------------------------------------------------------------- deals

export interface DealCounts {
  documents: number;
  findings: number;
  risks: number;
  gaps: number;
  open_goals: number;
  waiting_goals: number;
  top_severity: Severity | null;
}

export interface DealAccess {
  can_write: boolean;
  can_manage: boolean;
  workstreams: string[];
}

export interface Deal {
  id: string;
  code_name: string;
  target_name: string;
  sector: string;
  description: string;
  status: "active" | "on_hold" | "closed";
  archetype_id: string;
  archetype_name: string;
  side: string;
  stage_id: string;
  stage_title: string;
  stage_position: number | null;
  stage_count: number;
  stages: StageRef[];
  countries: { iso: string; name: string; has_pack: boolean }[];
  created_by: string;
  created_at: string;
  updated_at: string;
  counts: Partial<DealCounts>;
  access?: DealAccess;
}

export interface StageItem {
  text: string;
  subs: string[];
}

export interface DealDetail extends Deal {
  stage?: {
    id: string;
    title: string;
    purpose: string;
    timeline: string;
    necessary: StageItem[];
    conditional: StageItem[];
    artefacts: StageItem[];
  };
  workstream_requirements: { workstream: string; requirement: string; spoke: string | null }[];
  missing_documents: { type: string; label: string }[];
}

export interface DealIn {
  code_name: string;
  target_name?: string;
  archetype_id: string;
  stage_id?: string;
  countries?: string[];
  sector?: string;
  description?: string;
}

export type MemberRole = "deal_lead" | "member" | "viewer";

export interface Member {
  user_id: string;
  role: MemberRole;
  workstreams: string[];
}

export interface DealDocument {
  id: string;
  filename: string;
  content_type: string;
  size: number;
  sha256: string;
  doc_type: string;
  doc_type_label: string;
  workstream: string;
  status: string;
  note: string;
  facts_found: string[];
  uploaded_by: string;
  created_at: string;
}

export interface UploadResult extends DealDocument {
  facts_extracted: string[];
  goals_resumed: number;
}

/** One piece of evidence behind a finding, or one source behind an assistant answer. */
export interface Citation {
  kind?: "knowledge" | "document" | "country-pack" | string;
  id?: string;
  title: string;
  quote?: string;
  /** Present on findings ("E1"); assistant answers number their sources with `n`. */
  ref?: string;
  n?: number;
  source?: KnowledgeSource;
  site_routes?: string[];
  status?: string;
  page?: number | null;
  filename?: string;
}

export type FindingKind = "finding" | "risk" | "gap" | "request";

export interface Finding {
  id: string;
  goal_id: string | null;
  task_id: string | null;
  kind: FindingKind;
  workstream: string;
  title: string;
  detail: string;
  severity: Severity;
  status: "draft" | "validated" | "rejected";
  evidence: Citation[];
  produced_by: string;
  reviewed_by: string | null;
  review_note: string;
  created_at: string;
}

export interface Findings {
  items: Finding[];
  summary: {
    total: number;
    by_kind: Record<FindingKind, number>;
    awaiting_review: number;
    evidence_traceability_pct: number | null;
  };
}

export interface FigureInput {
  value: number;
  status: "verified" | "unverified";
  source?: {
    document?: string;
    page?: number | null;
    quote?: string;
    confirmed_by?: string;
  } | null;
}

export interface Ratio {
  key: string;
  label: string;
  value: number | null;
  unit: string;
  formula: string;
  missing: string[];
  note: string;
}

export interface Valuation {
  available: boolean;
  /** Present when `available` is false. */
  missing_inputs?: string[];
  missing_assumptions?: string[];
  error?: string;
  method?: string;
  return_on_equity_pct?: number;
  cost_of_equity_pct?: number;
  long_term_growth_pct?: number;
  justified_price_to_book?: number;
  implied_equity_value?: number;
  implied_price_to_earnings?: number | null;
  offer?: {
    price: number;
    price_to_book: number;
    price_to_earnings: number | null;
    premium_to_implied_value_pct: number;
  };
  sensitivity?: {
    cost_of_equity: number;
    values: { long_term_growth: number; price_to_book: number | null; equity_value: number | null }[];
  }[];
  limits?: string[];
}

export interface Financials {
  currency: string;
  unit: string;
  period: string;
  inputs: Record<string, FigureInput>;
  missing_inputs: string[];
  unverified_inputs: string[];
  ratios: Ratio[];
  valuation: Valuation;
  assumptions: Record<string, { value: number; set_by?: string }>;
}

export interface FinancialsIn {
  figures?: Record<string, number | null>;
  assumptions?: Record<string, number | null>;
  currency?: string;
  unit?: string;
  period?: string;
}

export interface Briefing {
  status: "none" | "draft" | "submitted" | string;
  title?: string;
  markdown?: string;
  goal_id?: string;
  updated_at?: string;
  submitted_to?: string;
  approved_by?: string;
  submitted_at?: string;
}

export interface CentralisationAssessment {
  id: number | string;
  workstream: string;
  answers: ("yes" | "no")[];
  outcome: string;
  rationale: string;
  decided_by: string;
  created_at?: string;
}

export interface Centralisation {
  test: CentralisationTest;
  assessments: CentralisationAssessment[];
}

// ---------------------------------------------------------------- goals

export type GoalState =
  | "planning"
  | "running"
  | "awaiting_input"
  | "awaiting_approval"
  | "paused"
  | "done"
  | "failed"
  | "cancelled";

export interface AskField {
  key: string;
  label: string;
  type: "number" | "percent" | "text" | string;
  optional?: boolean;
}

export interface Ask {
  id: string;
  task_id: string;
  kind: string;
  text: string;
  fields: AskField[];
}

export interface RequirementCheck {
  id: string;
  text: string;
  met: boolean;
  note: string;
}

export interface GoalCompletion {
  status: "verified" | "partially_met" | "unmet";
  checks: RequirementCheck[];
}

export interface GoalProgress {
  tasks_total: number;
  tasks_done: number;
  tasks_waiting: number;
  open_questions: number;
  open_approvals: number;
}

export interface GoalSummary {
  id: string;
  deal_id: string;
  objective: string;
  state: GoalState;
  state_reason: string;
  progress: GoalProgress;
  cycle: number;
  max_cycles: number;
  steps: number;
  budget_usd: number;
  spent_usd: number;
  created_by: string;
  completion: GoalCompletion | null;
  created_at: string;
  updated_at: string;
  asks: Ask[];
  approval_ids: string[];
  /** Set when the caller only sees their own workstreams' part of the goal. */
  restricted_view?: boolean;
  /** Only on the cross-deal list (`GET /api/goals`). */
  deal_code_name?: string;
}

export interface GoalRequirement {
  id: string;
  text: string;
  /** Absent until the completion check has run. */
  status?: "met" | "unmet" | string;
  note?: string;
}

export interface GoalTask {
  id: string;
  title: string;
  agent: string;
  agent_name: string;
  status: "pending" | "running" | "blocked" | "awaiting_approval" | "done" | "failed" | string;
  summary: string;
  after: string[];
  requirement_ids: string[];
  blocked_on: string;
}

export interface GoalDetail extends GoalSummary {
  requirements: GoalRequirement[];
  tasks: GoalTask[];
  can_control?: boolean;
}

export interface GoalEvent {
  seq: number;
  ts: string;
  type: string;
  actor: string;
  payload: Record<string, unknown>;
}

export interface GoalEvents {
  state: GoalState;
  events: GoalEvent[];
}

export interface AnswerIn {
  ask_id: string;
  text?: string;
  values?: Record<string, number | string | null>;
  skip?: boolean;
}

export interface Approval {
  id: string;
  deal_id: string;
  deal_code_name: string;
  goal_id: string | null;
  action: string;
  summary: string;
  payload: Record<string, unknown>;
  state: "pending" | "approved" | "rejected" | string;
  requested_by: string;
  decided_by: string | null;
  decision_note: string | null;
  created_at: string;
  decided_at: string | null;
  can_decide: boolean;
}

export interface NotificationItem {
  id: number;
  kind: string;
  title: string;
  body: string;
  deal_id: string | null;
  goal_id: string | null;
  read: boolean;
  created_at: string;
}

export interface Notifications {
  unread: number;
  items: NotificationItem[];
}

// ---------------------------------------------------------------- assistant

export interface ChatIn {
  question: string;
  deal_id?: string | null;
  conversation_id?: string | null;
}

export type ReasoningMode = "offline" | "gateway" | string;

export interface ChatAnswer {
  conversation_id: string;
  answer: string;
  citations: Citation[];
  mode: ReasoningMode;
}

export interface ConversationSummary {
  id: string;
  title: string;
  deal_id: string | null;
  updated_at: string;
}

export interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
  citations: Citation[] | null;
}

export interface Conversation {
  id: string;
  title: string;
  deal_id: string | null;
  messages: ConversationMessage[];
}

export type ChatStreamEvent =
  | { event: "meta"; data: { conversation_id: string; citations: Citation[]; mode: ReasoningMode } }
  | { event: "delta"; data: { text: string } }
  | { event: "done"; data: Record<string, never> };
