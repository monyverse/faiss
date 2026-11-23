// Proves two parts of the deployment contract that the seeded offline API cannot show by itself:
//   1. /api/* is relayed as a stream: events from a deliberately slow upstream arrive one by one.
//   2. configuration is read at runtime: the same build, started with other environment values,
//      relays to another upstream and reports another auth mode.
// It starts a fake upstream and a second copy of the built server, then stops both.
//   node scripts/verify-streaming.mjs
import { spawn } from "node:child_process";
import { createServer } from "node:http";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const upstream = createServer(async (request, response) => {
  if (request.url === "/api/chat/stream") {
    response.writeHead(200, { "content-type": "text/event-stream", "cache-control": "no-store" });
    for (const n of [1, 2, 3, 4]) {
      response.write(`event: delta\ndata: {"text":"part ${n} "}\n\n`);
      await sleep(300);
    }
    response.end("event: done\ndata: {}\n\n");
    return;
  }
  response.writeHead(200, { "content-type": "application/json" }).end(JSON.stringify({ upstream: "fake", seen: { path: request.url, user: request.headers["x-faiss-user"] ?? null, auth: request.headers.authorization ?? null } }));
});
await new Promise((resolve) => upstream.listen(8099, "127.0.0.1", resolve));

const web = spawn(process.execPath, [".output/server/index.mjs"], {
  env: { ...process.env, PORT: "3102", HOST: "127.0.0.1", FAISS_API_INTERNAL_URL: "http://127.0.0.1:8099", FAISS_AUTH_MODE: "oidc", FAISS_OIDC_AUTHORITY: "https://idp.example.test/realms/bank", FAISS_OIDC_CLIENT_ID: "faiss-web", FAISS_OIDC_SCOPE: "openid profile faiss.api" },
  stdio: "ignore",
});
let failed = 0;
const check = (name, ok, detail) => {
  if (!ok) failed++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}  (${detail})`);
};
try {
  for (let i = 0; i < 40; i++) {
    if (await fetch("http://127.0.0.1:3102/healthz").then((r) => r.ok).catch(() => false)) break;
    await sleep(250);
  }
  const config = await (await fetch("http://127.0.0.1:3102/runtime-config.json")).json();
  check("runtime config follows the environment of this start", config.authMode === "oidc" && config.oidc.clientId === "faiss-web", JSON.stringify(config));

  const html = await (await fetch("http://127.0.0.1:3102/")).text();
  check("OIDC mode: the server-rendered page shows the sign-in gate, not the workspace", html.includes("Signing you in") && !html.includes("My deals"), `${html.length} bytes`);

  const echo = await (await fetch("http://127.0.0.1:3102/api/meta?x=1", { headers: { Authorization: "Bearer test-token" } })).json();
  check("the upstream address is read at request time and the bearer token is passed on", echo.upstream === "fake" && echo.seen.path === "/api/meta?x=1" && echo.seen.auth === "Bearer test-token", JSON.stringify(echo.seen));

  const started = Date.now();
  const response = await fetch("http://127.0.0.1:3102/api/chat/stream", { method: "POST", headers: { "content-type": "application/json" }, body: "{}" });
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  const arrivals = [];
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    arrivals.push(`${Date.now() - started}ms:${[...decoder.decode(value).matchAll(/event: (\w+)/g)].map((m) => m[1]).join("+")}`);
  }
  const spread = Number(arrivals.at(-1).split("ms")[0]) - Number(arrivals[0].split("ms")[0]);
  check("events from a slow upstream arrive one by one, not buffered to the end", arrivals.length >= 4 && spread > 800, arrivals.join("  "));
} finally {
  web.kill("SIGTERM");
  upstream.close();
}
process.exit(failed ? 1 : 0);
