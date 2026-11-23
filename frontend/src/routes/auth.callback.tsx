import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Wordmark } from "@/components/shell";
import { Notice } from "@/components/ui";
import { authMode, loadOidc } from "@/lib/auth/session";

/** Where the identity provider sends the person back to (OIDC mode only). */
export const Route = createFileRoute("/auth/callback")({ component: Callback });

function Callback() {
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (authMode() !== "oidc") {
      window.location.replace("/");
      return;
    }
    loadOidc()
      .then((oidc) => oidc.completeSignIn())
      .then((returnTo) => window.location.replace(returnTo))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "Sign-in could not be completed."));
  }, []);
  return (
    <div className="flex min-h-dvh items-center justify-center px-6">
      <div className="max-w-sm text-center">
        <Wordmark className="justify-center" />
        {error ? (
          <>
            <Notice tone="error" className="mt-6 text-left">{error}</Notice>
            <a href="/" className="mt-4 inline-flex min-h-11 items-center text-sm font-medium text-rose hover:underline">Try signing in again</a>
          </>
        ) : (
          <p role="status" className="mt-6 text-sm text-ink-mute">Completing sign-in…</p>
        )}
      </div>
    </div>
  );
}
