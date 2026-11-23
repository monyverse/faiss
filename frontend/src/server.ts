import handler, { createServerEntry } from "@tanstack/react-start/server-entry";

import { proxyApi } from "./server/api-proxy";
import { readRuntimeConfig } from "./server/runtime-config";

const noStore = { "cache-control": "no-store" };

// The server entry. Infrastructure paths are answered here, before the router:
//   /healthz              liveness/readiness for the platform (does not depend on the API)
//   /runtime-config.json  what the browser needs to know about this environment
//   /api/*                relayed to the API (see server/api-proxy.ts)
export default createServerEntry({
  async fetch(request, ...rest) {
    const { pathname } = new URL(request.url);
    if (pathname === "/healthz") return Response.json({ status: "ok" }, { headers: noStore });
    if (pathname === "/runtime-config.json") return Response.json(readRuntimeConfig(), { headers: noStore });
    if (pathname === "/api" || pathname.startsWith("/api/")) return proxyApi(request);
    return handler.fetch(request, ...rest);
  },
});
