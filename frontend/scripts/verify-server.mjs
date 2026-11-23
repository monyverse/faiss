// Checks the deployment contract against a running production server.
//   PORT=3000 FAISS_API_INTERNAL_URL=http://localhost:8000 FAISS_AUTH_MODE=dev node .output/server/index.mjs
//   node scripts/verify-server.mjs [http://localhost:3000] [dev-user]
const base = process.argv[2] ?? "http://localhost:3000";
const user = process.argv[3] ?? "naledi.director";
const headers = { "X-Faiss-User": user };
let failed = 0;
const check = (name, ok, detail = "") => {
  if (!ok) failed++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  (${detail})` : ""}`);
};

const health = await fetch(`${base}/healthz`);
check("GET /healthz is 200", health.status === 200, `${health.status} ${await health.text()}`);

const page = await fetch(`${base}/`);
const html = await page.text();
check("GET / is server-rendered HTML", page.status === 200 && (page.headers.get("content-type") ?? "").includes("text/html"), `${page.status}, ${html.length} bytes`);
check("  shell: wordmark, navigation and page heading are in the HTML", html.includes("FAISS") && html.includes("M&amp;A Intelligence") && html.includes("My deals") && html.includes("Approvals") && html.includes("Knowledge"));
check("  runtime config is in the HTML", html.includes("authMode"));

const config = await fetch(`${base}/runtime-config.json`);
const configBody = await config.json();
check("GET /runtime-config.json reflects the environment", config.status === 200 && ["dev", "oidc"].includes(configBody.authMode), JSON.stringify(configBody));

const meta = await fetch(`${base}/api/meta`, { headers });
const metaBody = await meta.json();
check("GET /api/meta is proxied to the API", meta.status === 200 && metaBody.platform === "FAISS", `reasoning=${metaBody.reasoning}, ${metaBody.corpus?.chunkCount} passages`);

const hidden = await fetch(`${base}/api/deals/00000000000000000000000000000000`, { headers });
check("  API errors pass through unchanged", hidden.status === 404, `${hidden.status} ${await hidden.text()}`);

const started = Date.now();
const stream = await fetch(`${base}/api/chat/stream`, {
  method: "POST",
  headers: { ...headers, "content-type": "application/json", accept: "text/event-stream" },
  body: JSON.stringify({ question: "Who chairs the internal steering committee?" }),
});
const reader = stream.body.getReader();
const decoder = new TextDecoder();
let chunks = 0, firstAt = null, firstEvent = "", text = "";
for (;;) {
  const { done, value } = await reader.read();
  if (done) break;
  chunks++;
  const part = decoder.decode(value, { stream: true });
  if (firstAt === null) {
    firstAt = Date.now() - started;
    firstEvent = /event: (\w+)/.exec(part)?.[1] ?? "?";
  }
  text += part;
}
const total = Date.now() - started;
const events = [...text.matchAll(/^event: (\w+)/gm)].map((m) => m[1]);
check("POST /api/chat/stream is proxied as text/event-stream", stream.status === 200 && (stream.headers.get("content-type") ?? "").includes("text/event-stream"), stream.headers.get("content-type") ?? "");
check("  the stream arrives in pieces, first event before the end", chunks > 1 && firstAt < total && events.at(-1) === "done", `${chunks} chunks; first ("${firstEvent}") at ${firstAt} ms, end at ${total} ms; ${events.filter((e) => e === "delta").length} delta events`);

process.exit(failed ? 1 : 0);
