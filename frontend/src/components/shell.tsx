import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Popover from "@radix-ui/react-popover";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell, BookOpenText, BriefcaseBusiness, Check, ChevronsUpDown, Cpu, Globe2, LogOut, MessagesSquare, MoreHorizontal,
  ScrollText, ShieldCheck, Target, WifiOff,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import type { NotificationItem } from "@/lib/api";
import { authMode, loadOidc, setDevUser, useDevUser } from "@/lib/auth/session";
import { initials, timeAgo } from "@/lib/format";
import { api, useApiQuery, useDirectory, useIdentity, useMe, useMeta } from "@/lib/queries";

import { Dialog, Notice, Skeleton, Tile, cx } from "./ui";

const NAV = [
  { to: "/", label: "Deals", icon: BriefcaseBusiness, exact: true },
  { to: "/goals", label: "Goals", icon: Target, exact: false },
  { to: "/approvals", label: "Approvals", icon: ShieldCheck, exact: false },
  { to: "/assistant", label: "Assistant", icon: MessagesSquare, exact: false },
  { to: "/knowledge", label: "Knowledge", icon: BookOpenText, exact: false },
  { to: "/africa", label: "Africa", icon: Globe2, exact: false },
  { to: "/audit", label: "Audit", icon: ScrollText, exact: false },
] as const;

function usePendingApprovals(): number {
  const query = useApiQuery(["approvals", "pending"], () => api.approvals("pending"), { refetchInterval: 15_000 });
  return query.data?.filter((a) => a.can_decide).length ?? 0;
}

function useIsActive() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return (to: string, exact: boolean) => (exact ? pathname === to || pathname.startsWith("/deals") : pathname.startsWith(to));
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link to="/" className={cx("flex min-h-11 items-center gap-2.5", className)} aria-label="FAISS, M&A Intelligence: home">
      <span aria-hidden className="inline-flex size-8 items-center justify-center rounded-lg bg-maroon text-sm font-bold text-amber">F</span>
      <span className="leading-none">
        <span className="block text-[1.05rem] font-semibold tracking-[0.14em] text-ink">FAISS</span>
        <span className="mt-1 block text-[0.68rem] font-medium uppercase tracking-[0.16em] text-ink-mute">M&amp;A Intelligence</span>
      </span>
    </Link>
  );
}

export function Sidebar() {
  const isActive = useIsActive();
  const pending = usePendingApprovals();
  return (
    <nav aria-label="Main" className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-line bg-[oklch(0.175_0.02_355)] lg:flex">
      <div className="flex h-14 items-center px-5">
        <Wordmark />
      </div>
      <ul className="mt-3 flex-1 space-y-0.5 px-3">
        {NAV.map((item) => {
          const active = isActive(item.to, item.exact);
          return (
            <li key={item.to}>
              <Link
                to={item.to}
                aria-current={active ? "page" : undefined}
                className={cx(
                  "relative flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors",
                  active ? "bg-maroon/55 text-ink" : "text-ink-mute hover:bg-raised hover:text-ink",
                )}
              >
                {active ? <span aria-hidden className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-amber" /> : null}
                <item.icon className="size-[1.125rem]" />
                {item.label}
                {item.to === "/approvals" && pending > 0 ? (
                  <span className="tnum ml-auto rounded-full bg-amber px-1.5 text-xs font-semibold text-[oklch(0.2_0.03_70)]" aria-label={`${pending} waiting for your decision`}>
                    {pending}
                  </span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="p-3">
        <Link to="/assistant" className="block rounded-xl border border-line bg-panel p-3.5 transition-colors hover:border-line-strong">
          <span className="flex items-center gap-2 text-sm font-semibold text-ink">
            <span className="inline-flex size-7 items-center justify-center rounded-full border border-amber/40 bg-amber/15 text-amber">
              <MessagesSquare className="size-3.5" />
            </span>
            Ask the assistant
          </span>
          <span className="mt-1.5 block text-xs leading-relaxed text-ink-mute">Answers from the approved methodology, with the sources shown.</span>
        </Link>
      </div>
    </nav>
  );
}

export function BottomNav() {
  const isActive = useIsActive();
  const pending = usePendingApprovals();
  const [more, setMore] = useState(false);
  const primary = NAV.slice(0, 4);
  const rest = NAV.slice(4);
  const restActive = rest.some((item) => isActive(item.to, item.exact));
  const tab = "relative flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-[0.68rem] font-medium";
  return (
    <nav aria-label="Main" className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-[oklch(0.175_0.02_355)] pb-[env(safe-area-inset-bottom)] lg:hidden">
      <ul className="flex">
        {primary.map((item) => {
          const active = isActive(item.to, item.exact);
          return (
            <li key={item.to} className="flex flex-1">
              <Link to={item.to} aria-current={active ? "page" : undefined} className={cx(tab, active ? "text-amber" : "text-ink-mute")}>
                <item.icon className="size-5" />
                {item.label}
                {item.to === "/approvals" && pending > 0 ? (
                  <span className="tnum absolute right-[calc(50%-1.4rem)] top-1.5 rounded-full bg-amber px-1 text-[0.62rem] font-bold text-[oklch(0.2_0.03_70)]">{pending}</span>
                ) : null}
              </Link>
            </li>
          );
        })}
        <li className="flex flex-1">
          <button type="button" onClick={() => setMore(true)} aria-haspopup="dialog" className={cx(tab, restActive ? "text-amber" : "text-ink-mute")}>
            <MoreHorizontal className="size-5" />
            More
          </button>
        </li>
      </ul>
      <Dialog open={more} onOpenChange={setMore} title="More">
        <ul className="space-y-1">
          {rest.map((item) => (
            <li key={item.to}>
              <Link to={item.to} onClick={() => setMore(false)} className="flex min-h-12 items-center gap-3 rounded-lg px-3 text-[0.9375rem] font-medium text-ink-soft hover:bg-raised hover:text-ink">
                <item.icon className="size-5 text-ink-mute" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </Dialog>
    </nav>
  );
}

export function TopBar() {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-1 border-b border-line bg-canvas/90 px-3 backdrop-blur-sm md:px-6">
      <Wordmark className="lg:hidden" />
      <div className="ml-auto flex items-center gap-1 md:gap-2">
        <ModeBadge />
        <NotificationBell />
        <PersonaSwitcher />
      </div>
    </header>
  );
}

/** Says honestly how answers are produced: a model gateway, or offline retrieval of approved passages. */
export function ModeBadge() {
  const meta = useMeta().data;
  if (!meta) return null;
  const offline = meta.reasoning === "offline";
  return (
    <span
      title={offline ? "No model gateway is configured. Answers are the most relevant approved passages, not generated prose." : "Reasoning runs through the bank's model gateway."}
      className={cx("inline-flex h-7 items-center gap-1.5 rounded-full border px-2.5 text-xs font-medium", offline ? "tint-amber" : "tint-ok")}
    >
      {offline ? <WifiOff className="size-3.5" /> : <Cpu className="size-3.5" />}
      {offline ? "Offline" : "Gateway"}
    </span>
  );
}

function NotificationBell() {
  const client = useQueryClient();
  const identity = useIdentity();
  const [open, setOpen] = useState(false);
  const query = useApiQuery(["notifications"], api.notifications, { refetchInterval: 15_000 });
  const markRead = useMutation({
    mutationFn: api.markNotificationsRead,
    onSuccess: () => client.invalidateQueries({ queryKey: [identity, "notifications"] }),
  });
  const unread = query.data?.unread ?? 0;
  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        aria-label={unread ? `Notifications, ${unread} unread` : "Notifications"}
        className="relative inline-flex size-11 items-center justify-center rounded-lg text-ink-soft hover:bg-raised hover:text-ink"
      >
        <Bell className="size-5" />
        {unread > 0 ? (
          <span className="tnum absolute right-1.5 top-1.5 min-w-[1.1rem] rounded-full bg-red px-1 text-center text-[0.65rem] font-bold leading-[1.1rem] text-white">
            {unread > 9 ? "9+" : unread}
          </span>
        ) : null}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content align="end" sideOffset={8} collisionPadding={12} className="z-50 flex max-h-[min(32rem,var(--radix-popover-content-available-height))] w-[min(24rem,calc(100vw-1.5rem))] flex-col rounded-xl border border-line-strong bg-panel shadow-pop">
          <div className="flex items-center justify-between gap-3 border-b border-line py-1.5 pl-4 pr-2">
            <p className="text-sm font-semibold text-ink">Notifications</p>
            <button
              type="button"
              disabled={!unread || markRead.isPending}
              onClick={() => markRead.mutate()}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium text-ink-soft hover:bg-raised hover:text-ink disabled:opacity-40"
            >
              <Check className="size-3.5" /> Mark all read
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-1.5">
            {query.isPending ? (
              <div className="space-y-2 p-2.5"><Skeleton className="h-4 w-2/3" /><Skeleton className="h-3 w-full" /></div>
            ) : query.isError ? (
              <Notice tone="error" className="m-2">Notifications could not be loaded.</Notice>
            ) : query.data.items.length === 0 ? (
              <p className="px-3 py-6 text-center text-sm text-ink-mute">Nothing yet. You are told when a goal needs an answer, needs an approval, or finishes.</p>
            ) : (
              <ul>{query.data.items.map((item) => <NotificationRow key={item.id} item={item} onNavigate={() => setOpen(false)} />)}</ul>
            )}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function NotificationRow({ item, onNavigate }: { item: NotificationItem; onNavigate: () => void }) {
  const body = (
    <>
      <span className="flex items-start gap-2">
        <span aria-hidden className={cx("mt-1.5 size-2 shrink-0 rounded-full", item.read ? "bg-line-strong" : "bg-amber")} />
        <span className="min-w-0 flex-1">
          <span className={cx("block text-sm", item.read ? "text-ink-soft" : "font-semibold text-ink")}>
            {item.title}
            {item.read ? null : <span className="sr-only"> (unread)</span>}
          </span>
          <span className="mt-0.5 line-clamp-2 block text-xs text-ink-mute">{item.body}</span>
          <span className="mt-1 block text-[0.7rem] text-ink-mute">{timeAgo(item.created_at)}</span>
        </span>
      </span>
    </>
  );
  const className = "block w-full rounded-lg px-2.5 py-2.5 text-left hover:bg-raised";
  return (
    <li>
      {item.deal_id ? (
        <Link
          to="/deals/$dealId"
          params={{ dealId: item.deal_id }}
          search={item.goal_id ? { tab: "goals", goal: item.goal_id } : {}}
          onClick={onNavigate}
          className={className}
        >
          {body}
        </Link>
      ) : (
        <div className={className}>{body}</div>
      )}
    </li>
  );
}

const PERSONA_NOTE: Record<string, string> = {
  ma_director: "Sees every deal",
  internal_audit: "Read-only assurance across deals",
};

function PersonaSwitcher() {
  const me = useMe();
  const directory = useDirectory();
  const devUser = useDevUser();
  const oidc = authMode() === "oidc";
  const name = me.data?.name ?? "";
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        aria-label={oidc ? "Account" : "Switch persona"}
        className="flex h-11 items-center gap-2 rounded-lg pl-1 pr-1.5 text-left hover:bg-raised md:pr-2.5"
      >
        {me.data ? <Tile text={initials(name)} tone="maroon" /> : <Skeleton className="size-9" />}
        <span className="hidden min-w-0 leading-tight md:block">
          <span className="block max-w-[11rem] truncate text-sm font-medium text-ink">{name || "…"}</span>
          <span className="block max-w-[11rem] truncate text-xs text-ink-mute">{me.data?.title ?? ""}</span>
        </span>
        <ChevronsUpDown className="hidden size-4 text-ink-mute md:block" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align="end" sideOffset={8} collisionPadding={12} className="z-50 w-[min(21rem,calc(100vw-1.5rem))] rounded-xl border border-line-strong bg-panel p-1.5 shadow-pop">
          {oidc ? (
            <>
              <div className="px-2.5 py-2">
                <p className="text-sm font-medium text-ink">{name}</p>
                <p className="text-xs text-ink-mute">{me.data?.email}</p>
              </div>
              <DropdownMenu.Item
                onSelect={() => void loadOidc().then((m) => m.signOut())}
                className="flex min-h-11 cursor-default items-center gap-2 rounded-lg px-2.5 text-sm text-ink-soft outline-none data-[highlighted]:bg-raised data-[highlighted]:text-ink"
              >
                <LogOut className="size-4" /> Sign out
              </DropdownMenu.Item>
            </>
          ) : (
            <>
              <DropdownMenu.Label className="px-2.5 pb-1.5 pt-2 text-xs text-ink-mute">
                <span className="font-semibold uppercase tracking-wider">Development personas</span>
                <span className="mt-1 block leading-relaxed">Switch to see the platform as someone else. Each person only sees their own deals and workstreams.</span>
              </DropdownMenu.Label>
              {(directory.data ?? []).map((person) => {
                const current = (devUser ?? me.data?.sub) === person.sub;
                const note = person.roles.map((r) => PERSONA_NOTE[r]).find(Boolean) ?? (person.countries.length ? `Deals in ${person.countries.join(", ")}` : "Deals they are a member of");
                return (
                  <DropdownMenu.Item
                    key={person.sub}
                    onSelect={() => setDevUser(person.sub)}
                    className="flex min-h-12 cursor-default items-center gap-3 rounded-lg px-2.5 py-2 outline-none data-[highlighted]:bg-raised"
                  >
                    <Tile text={initials(person.name)} tone={current ? "maroon" : "plain"} />
                    <span className="min-w-0 flex-1 leading-tight">
                      <span className="block truncate text-sm font-medium text-ink">{person.name}</span>
                      <span className="block truncate text-xs text-ink-soft">{person.title}</span>
                      <span className="block truncate text-[0.7rem] text-ink-mute">{note}</span>
                    </span>
                    {current ? <Check className="size-4 text-amber" aria-label="Current persona" /> : null}
                  </DropdownMenu.Item>
                );
              })}
              {directory.isError ? <Notice tone="error" className="m-1.5">The directory could not be loaded.</Notice> : null}
            </>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

/**
 * In OIDC mode nothing is shown (and no API call is made) until the person is signed in.
 * In development mode this renders its children straight away and never loads the OIDC module.
 */
export function AuthGate({ children }: { children: ReactNode }) {
  const oidc = authMode() === "oidc";
  const [state, setState] = useState<"checking" | "ready" | { error: string }>(oidc ? "checking" : "ready");
  useEffect(() => {
    if (!oidc) return;
    let cancelled = false;
    loadOidc()
      .then(async (module) => {
        if (await module.currentUser()) {
          if (!cancelled) setState("ready");
        } else {
          await module.signIn(window.location.pathname + window.location.search);
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) setState({ error: error instanceof Error ? error.message : "Sign-in could not be started." });
      });
    return () => {
      cancelled = true;
    };
  }, [oidc]);
  if (state === "ready") return <>{children}</>;
  return (
    <div className="flex min-h-dvh items-center justify-center px-6">
      <div className="max-w-sm text-center">
        <Wordmark className="justify-center" />
        {state === "checking" ? (
          <p role="status" className="mt-6 text-sm text-ink-mute">Signing you in…</p>
        ) : (
          <Notice tone="error" className="mt-6 text-left">{state.error}</Notice>
        )}
      </div>
    </div>
  );
}

export function Page({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("mx-auto w-full max-w-[1180px] px-4 pb-10 pt-5 md:px-7 md:pt-7", className)}>{children}</div>;
}
