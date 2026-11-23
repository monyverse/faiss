/**
 * OpenID Connect sign-in: authorization code + PKCE with oidc-client-ts.
 * Everything that touches the identity provider lives in this module, and it is only imported
 * (dynamically, from ./session.ts) when the server says FAISS_AUTH_MODE=oidc.
 * Tokens stay in sessionStorage: they end with the tab and are never written to disk storage.
 */
import { UserManager, WebStorageStateStore, type User } from "oidc-client-ts";

export interface OidcSettings {
  authority: string;
  clientId: string;
  scope: string;
}

export const CALLBACK_PATH = "/auth/callback";
let manager: UserManager | null = null;
let signingIn: Promise<void> | null = null;

export function configure(settings: OidcSettings): void {
  if (manager || typeof window === "undefined") return;
  if (!settings.authority || !settings.clientId) {
    throw new Error("Sign-in is not configured: FAISS_OIDC_AUTHORITY and FAISS_OIDC_CLIENT_ID are required.");
  }
  manager = new UserManager({
    authority: settings.authority,
    client_id: settings.clientId,
    scope: settings.scope,
    redirect_uri: `${window.location.origin}${CALLBACK_PATH}`,
    post_logout_redirect_uri: window.location.origin,
    response_type: "code", // PKCE is always used with the code flow in oidc-client-ts
    userStore: new WebStorageStateStore({ store: window.sessionStorage }),
    automaticSilentRenew: true,
    monitorSession: false,
  });
}

function requireManager(): UserManager {
  if (!manager) throw new Error("Sign-in has not been configured.");
  return manager;
}

export async function currentUser(): Promise<User | null> {
  const user = await requireManager().getUser();
  return user && !user.expired ? user : null;
}

export async function accessToken(): Promise<string | null> {
  return (await currentUser())?.access_token ?? null;
}

/** Sends the person to the identity provider, remembering where they were going. */
export function signIn(returnTo: string): Promise<void> {
  signingIn ??= requireManager().signinRedirect({ state: { returnTo } });
  return signingIn;
}

/** Completes the redirect back from the identity provider; resolves to where to go next. */
export async function completeSignIn(): Promise<string> {
  const user = await requireManager().signinCallback();
  const state = user?.state as { returnTo?: unknown } | undefined;
  const returnTo = typeof state?.returnTo === "string" ? state.returnTo : "/";
  // Only ever return to a path on this site.
  return returnTo.startsWith("/") && !returnTo.startsWith("//") ? returnTo : "/";
}

export function signOut(): Promise<void> {
  return requireManager().signoutRedirect();
}
