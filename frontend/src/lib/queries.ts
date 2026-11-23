import { useQuery, type UseQueryOptions, type UseQueryResult } from "@tanstack/react-query";
import { useMemo } from "react";

import { createApi, type Meta } from "./api";
import { authHeaders, authMode, onUnauthorized, useDevUser } from "./auth/session";

/** The app's client: same origin, identified by the current session. */
export const api = createApi({ baseUrl: "", authHeaders, onUnauthorized });

/** Part of every query key, so switching persona never shows another person's data. */
export function useIdentity(): string {
  const devUser = useDevUser();
  return authMode() === "oidc" ? "oidc" : (devUser ?? "default");
}

export function useApiQuery<T>(
  key: readonly unknown[],
  queryFn: () => Promise<T>,
  options: Omit<UseQueryOptions<T, Error, T, readonly unknown[]>, "queryKey" | "queryFn"> = {},
): UseQueryResult<T, Error> {
  const identity = useIdentity();
  return useQuery({ queryKey: [identity, ...key], queryFn, ...options });
}

export const useMeta = () => useApiQuery(["meta"], api.meta, { staleTime: 5 * 60_000 });
export const useMe = () => useApiQuery(["me"], api.me, { staleTime: 5 * 60_000 });
export const useDirectory = () => useApiQuery(["directory"], api.directory, { staleTime: 5 * 60_000 });

export interface Lookups {
  workstream: (id: string | null | undefined) => string;
  person: (sub: string | null | undefined) => string;
  lineItem: (key: string) => string;
}

/** Names for the ids the API returns: workstream ids (from meta), people (from the directory). */
export function useLookups(): Lookups {
  const meta = useMeta().data;
  const directory = useDirectory().data;
  return useMemo(() => {
    const workstreams = new Map((meta?.workstreams ?? []).map((w) => [w.id, w.name]));
    const people = new Map((directory ?? []).map((p) => [p.sub, p.name]));
    return {
      workstream: (id) => (!id ? "—" : id === "*" ? "All workstreams" : id === "general" ? "General" : (workstreams.get(id) ?? id)),
      person: (sub) => (!sub ? "—" : (people.get(sub) ?? sub)),
      lineItem: (key) => lineItemLabel(meta, key),
    };
  }, [meta, directory]);
}

function lineItemLabel(meta: Meta | undefined, key: string): string {
  return meta?.financial_line_items[key] ?? meta?.valuation_assumptions[key] ?? key.replace(/_/g, " ");
}
