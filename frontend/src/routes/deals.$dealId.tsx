import * as Tabs from "@radix-ui/react-tabs";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Lock } from "lucide-react";

import { DocumentsTab } from "@/components/deal/documents";
import { FinancialsTab } from "@/components/deal/financials";
import { FindingsTab } from "@/components/deal/findings";
import { GoalsTab } from "@/components/deal/goals";
import { BriefingTab, CentralisationTab, DealAssistantTab, TeamTab } from "@/components/deal/misc";
import { OverviewTab } from "@/components/deal/overview";
import { Page } from "@/components/shell";
import { Badge, Chip, ErrorState, LoadingCards, SeverityBadge, Skeleton, Tile } from "@/components/ui";
import { api, useApiQuery, useLookups } from "@/lib/queries";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "goals", label: "Goals" },
  { id: "findings", label: "Findings" },
  { id: "documents", label: "Documents" },
  { id: "financials", label: "Financials" },
  { id: "briefing", label: "Briefing" },
  { id: "team", label: "Team" },
  { id: "centralisation", label: "Centralisation" },
  { id: "assistant", label: "Assistant" },
] as const;
type TabId = (typeof TABS)[number]["id"];
const isTab = (value: unknown): value is TabId => TABS.some((tab) => tab.id === value);

export const Route = createFileRoute("/deals/$dealId")({
  validateSearch: (search: Record<string, unknown>): { tab?: TabId; goal?: string } => ({
    ...(isTab(search.tab) ? { tab: search.tab } : {}),
    ...(typeof search.goal === "string" && search.goal ? { goal: search.goal } : {}),
  }),
  component: DealPage,
});

function DealPage() {
  const { dealId } = Route.useParams();
  const { tab = "overview", goal } = Route.useSearch();
  const navigate = useNavigate();
  const { workstream } = useLookups();
  const query = useApiQuery(["deal", dealId], () => api.deal(dealId), { refetchInterval: 20_000 });

  const back = (
    <Link to="/" className="mb-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink">
      <ArrowLeft className="size-4" /> My deals
    </Link>
  );

  if (query.isPending) {
    return (
      <Page>
        {back}
        <Skeleton className="h-9 w-64" />
        <Skeleton className="mt-3 h-4 w-80 max-w-full" />
        <LoadingCards className="mt-8" count={3} />
      </Page>
    );
  }
  if (query.isError) {
    return (
      <Page>
        {back}
        <ErrorState error={query.error} onRetry={() => void query.refetch()} what="This deal" />
      </Page>
    );
  }
  const deal = query.data;
  const access = deal.access;
  const limited = access && !access.workstreams.includes("*");

  return (
    <Page>
      {back}
      <header className="flex items-start gap-3.5">
        <Tile text={deal.code_name.replace(/^project\s+/i, "").slice(0, 2).toUpperCase()} size="lg" />
        <div className="min-w-0 flex-1">
          <h1 className="text-[1.6rem] font-semibold leading-tight tracking-tight text-ink md:text-[1.85rem]">{deal.code_name}</h1>
          <p className="mt-0.5 text-sm text-ink-mute">{deal.target_name || "Target not named"} · {deal.sector}</p>
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            <Chip className="border-maroon bg-maroon/40 text-ink">{deal.archetype_name}</Chip>
            <Badge tone="amber">{deal.stage_title || "No stage"}{deal.stage_position != null ? ` · ${deal.stage_position + 1} of ${deal.stage_count}` : ""}</Badge>
            {deal.countries.map((c) => <Chip key={c.iso}>{c.name}</Chip>)}
            {deal.counts.top_severity ? <SeverityBadge severity={deal.counts.top_severity} prefix="Top risk:" /> : null}
            {access && !access.can_write ? <Badge tone="info"><Lock className="size-3" /> Read-only</Badge> : null}
            {limited ? <Badge tone="info"><Lock className="size-3" /> Your access: {access.workstreams.map(workstream).join(", ")}</Badge> : null}
          </div>
        </div>
      </header>

      <Tabs.Root
        value={tab}
        onValueChange={(next) => void navigate({ to: "/deals/$dealId", params: { dealId }, search: isTab(next) && next !== "overview" ? { tab: next } : {}, replace: true })}
        className="mt-5"
      >
        <div className="-mx-4 border-b border-line md:mx-0">
          <Tabs.List aria-label="Deal workspace" className="no-scrollbar flex gap-1 overflow-x-auto px-4 md:px-0">
            {TABS.map((item) => (
              <Tabs.Trigger
                key={item.id}
                value={item.id}
                className="relative inline-flex min-h-11 shrink-0 items-center whitespace-nowrap px-3 text-sm font-medium text-ink-mute transition-colors hover:text-ink data-[state=active]:text-ink data-[state=active]:after:absolute data-[state=active]:after:inset-x-2 data-[state=active]:after:bottom-0 data-[state=active]:after:h-0.5 data-[state=active]:after:rounded-full data-[state=active]:after:bg-amber"
              >
                {item.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </div>
        <div className="pt-5">
          <Tabs.Content value="overview"><OverviewTab deal={deal} /></Tabs.Content>
          <Tabs.Content value="goals"><GoalsTab deal={deal} goalId={goal} /></Tabs.Content>
          <Tabs.Content value="findings"><FindingsTab deal={deal} /></Tabs.Content>
          <Tabs.Content value="documents"><DocumentsTab deal={deal} /></Tabs.Content>
          <Tabs.Content value="financials"><FinancialsTab deal={deal} /></Tabs.Content>
          <Tabs.Content value="briefing"><BriefingTab deal={deal} /></Tabs.Content>
          <Tabs.Content value="team"><TeamTab deal={deal} /></Tabs.Content>
          <Tabs.Content value="centralisation"><CentralisationTab deal={deal} /></Tabs.Content>
          <Tabs.Content value="assistant"><DealAssistantTab deal={deal} /></Tabs.Content>
        </div>
      </Tabs.Root>
    </Page>
  );
}
