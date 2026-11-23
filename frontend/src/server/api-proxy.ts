/**
 * Forwards /api/* to the FAISS API. In the cluster the ingress does this and the web server never
 * sees these requests; locally and in a plain container this keeps the browser on one origin.
 * The upstream address is read per request, and the response body is passed through as a stream
 * so server-sent events (the assistant) arrive as they are produced.
 */
const DROP_REQUEST = new Set([
  "connection", "keep-alive", "proxy-authenticate", "proxy-authorization", "te", "trailer",
  "transfer-encoding", "upgrade", "host", "content-length", "accept-encoding",
]);
const DROP_RESPONSE = new Set([
  "connection", "keep-alive", "proxy-authenticate", "te", "trailer", "transfer-encoding", "upgrade",
  "content-encoding", "content-length",
]);

export function apiBaseUrl(): string {
  return (process.env.FAISS_API_INTERNAL_URL || "http://localhost:8000").replace(/\/+$/, "");
}

export async function proxyApi(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const headers = new Headers();
  request.headers.forEach((value, key) => {
    if (!DROP_REQUEST.has(key.toLowerCase())) headers.set(key, value);
  });
  // Ask for an uncompressed body so chunks can be relayed exactly as they arrive.
  headers.set("accept-encoding", "identity");

  const init: RequestInit = { method: request.method, headers, redirect: "manual", signal: request.signal };
  if (request.method !== "GET" && request.method !== "HEAD") init.body = await request.arrayBuffer();

  let upstream: Response;
  try {
    upstream = await fetch(`${apiBaseUrl()}${url.pathname}${url.search}`, init);
  } catch {
    return Response.json({ detail: "The FAISS API could not be reached." }, { status: 502 });
  }
  const out = new Headers();
  upstream.headers.forEach((value, key) => {
    if (!DROP_RESPONSE.has(key.toLowerCase())) out.set(key, value);
  });
  return new Response(upstream.body, { status: upstream.status, statusText: upstream.statusText, headers: out });
}
