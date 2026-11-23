import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import { HeadContent, Link, Outlet, Scripts, createRootRouteWithContext, useRouterState, type ErrorComponentProps } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { AuthGate, BottomNav, Sidebar, TopBar } from "@/components/shell";
import { Button } from "@/components/ui";
import { configureSession } from "@/lib/auth/session";
import { getRuntimeConfig } from "@/lib/runtime-config";
import appCss from "@/styles/app.css?url";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  // Runtime configuration comes from the server's environment with the first HTML: one image, any environment.
  loader: () => getRuntimeConfig(),
  staleTime: Infinity,
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#1a1016" },
      { name: "color-scheme", content: "dark" },
      { title: "FAISS · M&A Intelligence" },
      { name: "description", content: "FAISS turns the approved M&A methodology into a working platform: a Deal Twin per transaction, agents that work on goals, and answers with citations." },
      { name: "robots", content: "noindex" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  shellComponent: RootDocument,
  component: RootComponent,
  notFoundComponent: NotFound,
  errorComponent: RootError,
});

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  configureSession(Route.useLoaderData());
  const isCallback = useRouterState({ select: (state) => state.location.pathname.startsWith("/auth/") });
  return (
    <QueryClientProvider client={queryClient}>
      {isCallback ? (
        <Outlet />
      ) : (
        <AuthGate>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-panel focus:px-3 focus:py-2">
            Skip to content
          </a>
          <Sidebar />
          <div className="flex min-h-dvh flex-col lg:pl-60">
            <TopBar />
            <main id="main" className="min-w-0 flex-1 pb-[calc(3.5rem+env(safe-area-inset-bottom))] lg:pb-0">
              <Outlet />
            </main>
          </div>
          <BottomNav />
        </AuthGate>
      )}
    </QueryClientProvider>
  );
}

function Centered({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[70dvh] items-center justify-center px-6">
      <div className="max-w-md text-center">{children}</div>
    </div>
  );
}

function NotFound() {
  return (
    <Centered>
      <p className="tnum text-sm font-semibold uppercase tracking-widest text-amber">404</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">This page does not exist</h1>
      <p className="mt-2 text-sm text-ink-mute">The address may be wrong, or the page may have moved.</p>
      <Link to="/" className="mt-5 inline-flex min-h-11 items-center rounded-lg bg-red px-4 text-sm font-medium text-white">
        Back to deals
      </Link>
    </Centered>
  );
}

function RootError({ error, reset }: ErrorComponentProps) {
  return (
    <Centered>
      <h1 className="text-2xl font-semibold tracking-tight">Something went wrong</h1>
      <p className="mt-2 text-sm text-ink-mute">{error instanceof Error && error.message ? error.message : "The page could not be shown."}</p>
      <Button variant="primary" className="mt-5" onClick={reset}>
        Try again
      </Button>
    </Centered>
  );
}
