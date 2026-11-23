/**
 * Who the browser is acting as. Two modes, chosen by the server at runtime:
 *   dev   a persona from the built-in directory, sent as `X-Faiss-User`
 *   oidc  a bearer token from the bank's identity provider (see ./oidc.ts, loaded only in this mode)
 */
import { useSyncExternalStore } from "react";

import type { RuntimeConfig } from "../../server/runtime-config";

const STORAGE_KEY = "faiss.dev-user";
let config: RuntimeConfig = { authMode: "dev", oidc: { authority: "", clientId: "", scope: "" } };
const listeners = new Set<() => void>();

export function configureSession(next: RuntimeConfig): void {
  config = next;
}

export function authMode(): RuntimeConfig["authMode"] {
  return config.authMode;
}

/** The OIDC module is a separate chunk; development mode never requests it. */
export function loadOidc() {
  return import("./oidc").then((oidc) => {
    oidc.configure(config.oidc);
    return oidc;
  });
}

export function getDevUser(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setDevUser(sub: string): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, sub);
  } catch {
    /* private mode: the choice lasts for this page only */
  }
  listeners.forEach((notify) => notify());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

/** The chosen persona, or null before one is chosen (the API then applies its default). */
export function useDevUser(): string | null {
  return useSyncExternalStore(subscribe, getDevUser, () => null);
}

export async function authHeaders(): Promise<Record<string, string>> {
  if (config.authMode === "oidc") {
    const token = await (await loadOidc()).accessToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
  const user = getDevUser();
  return user ? { "X-Faiss-User": user } : {};
}

export function onUnauthorized(): void {
  if (config.authMode !== "oidc" || typeof window === "undefined") return;
  void loadOidc().then((oidc) => oidc.signIn(window.location.pathname + window.location.search));
}
