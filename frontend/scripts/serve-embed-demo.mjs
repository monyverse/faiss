// Serves embed-demo.html and the built element so <faiss-copilot> can be tried locally:
//   bun run build:embed && node scripts/serve-embed-demo.mjs      → http://localhost:3000/embed-demo.html
// The page talks to the API cross-origin (api-base="http://localhost:8000"), which the local API
// allows from http://localhost:3000 (FAISS_CORS_ORIGINS). On another port, or to avoid CORS, open
// /embed-demo.html?api=same-origin: this server then relays /api/* to FAISS_API_INTERNAL_URL.
import { createReadStream, existsSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, join } from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const files = { "/": "embed-demo.html", "/embed-demo.html": "embed-demo.html", "/faiss-copilot.js": "dist-embed/faiss-copilot.js" };
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8" };
const port = Number(process.env.PORT ?? 3000);
const api = (process.env.FAISS_API_INTERNAL_URL ?? "http://localhost:8000").replace(/\/+$/, "");

createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", "http://x");
  if (url.pathname.startsWith("/api/")) {
    const headers = Object.fromEntries(Object.entries(request.headers).filter(([k]) => !["host", "connection", "content-length", "accept-encoding"].includes(k)));
    const body = request.method === "GET" || request.method === "HEAD" ? undefined : await new Response(Readable.toWeb(request)).arrayBuffer();
    try {
      const upstream = await fetch(api + url.pathname + url.search, { method: request.method, headers, body });
      response.writeHead(upstream.status, { "content-type": upstream.headers.get("content-type") ?? "application/json", "cache-control": "no-store" });
      if (upstream.body) Readable.fromWeb(upstream.body).pipe(response);
      else response.end();
    } catch {
      response.writeHead(502, { "content-type": "application/json" }).end('{"detail":"The FAISS API could not be reached."}');
    }
    return;
  }
  const file = files[url.pathname] ? join(root, files[url.pathname]) : null;
  if (!file || !existsSync(file)) {
    response.writeHead(404, { "content-type": "text/plain" }).end("Not found");
    return;
  }
  response.writeHead(200, { "content-type": types[file.slice(file.lastIndexOf("."))] ?? "application/octet-stream", "cache-control": "no-store" });
  createReadStream(file).pipe(response);
}).listen(port, () => console.log(`Embed demo: http://localhost:${port}/embed-demo.html`));
