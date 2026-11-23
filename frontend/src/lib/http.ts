/**
 * The transport under the typed client. It knows nothing about how the caller is identified:
 * the app and the embeddable copilot each hand it a function that supplies the auth headers.
 */

export class ApiError extends Error {
  readonly status: number;
  /** The API's own explanation (`detail`), safe to show to the person as-is. */
  readonly detail: string;

  constructor(status: number, detail: string) {
    super(detail);
    this.name = "ApiError";
    this.status = status;
    this.detail = detail;
  }

  /** The deal (or item) does not exist for this person: deal-level isolation answers 404. */
  get notFound(): boolean {
    return this.status === 404;
  }

  /** The person can see the deal but not this area: workstream restriction answers 403. */
  get restricted(): boolean {
    return this.status === 403;
  }
}

export interface Transport {
  baseUrl: string;
  /** Headers that identify the caller. Resolved on every request so a renewed token is picked up. */
  authHeaders: () => Promise<Record<string, string>> | Record<string, string>;
  /** Called on 401 so the host can send the person back through sign-in. */
  onUnauthorized?: () => void;
}

export interface RequestOptions {
  method?: string;
  body?: unknown;
  query?: Record<string, string | number | boolean | null | undefined>;
  signal?: AbortSignal;
  headers?: Record<string, string>;
}

const FALLBACK: Record<number, string> = {
  401: "You are not signed in, or your session has ended.",
  403: "You do not have access to this.",
  404: "Not found.",
  413: "The file is too large.",
  502: "The FAISS API could not be reached.",
  503: "The FAISS API is not available right now.",
  504: "The FAISS API took too long to answer.",
};

function describe(status: number, payload: unknown): string {
  if (payload && typeof payload === "object" && "detail" in payload) {
    const detail = (payload as { detail: unknown }).detail;
    if (typeof detail === "string" && detail) return detail;
    if (Array.isArray(detail)) {
      // FastAPI validation errors: [{loc: [...], msg: "..."}]
      const parts = detail.map((d) => {
        if (d && typeof d === "object" && "msg" in d) {
          const loc = Array.isArray((d as { loc?: unknown }).loc)
            ? ((d as { loc: unknown[] }).loc.filter((x) => x !== "body").join(".") as string)
            : "";
          return loc ? `${loc}: ${String((d as { msg: unknown }).msg)}` : String((d as { msg: unknown }).msg);
        }
        return String(d);
      });
      if (parts.length) return parts.join("; ");
    }
  }
  return FALLBACK[status] ?? `The request failed (${status}).`;
}

export function buildUrl(baseUrl: string, path: string, query?: RequestOptions["query"]): string {
  const url = `${baseUrl.replace(/\/+$/, "")}${path}`;
  if (!query) return url;
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null || value === "") continue;
    params.set(key, String(value));
  }
  const qs = params.toString();
  return qs ? `${url}?${qs}` : url;
}

export async function send(transport: Transport, path: string, options: RequestOptions = {}): Promise<Response> {
  const headers: Record<string, string> = { Accept: "application/json", ...(await transport.authHeaders()) };
  let body: BodyInit | undefined;
  if (options.body instanceof FormData) {
    body = options.body;
  } else if (options.body !== undefined) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(options.body);
  }
  Object.assign(headers, options.headers);

  let response: Response;
  try {
    const init: RequestInit = { method: options.method ?? "GET", headers };
    if (body !== undefined) init.body = body;
    if (options.signal) init.signal = options.signal;
    response = await fetch(buildUrl(transport.baseUrl, path, options.query), init);
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    throw new ApiError(0, "The FAISS API could not be reached. Check your connection and try again.");
  }
  if (!response.ok) {
    let payload: unknown = null;
    try {
      payload = await response.json();
    } catch {
      /* not JSON: fall back to the status text below */
    }
    if (response.status === 401) transport.onUnauthorized?.();
    throw new ApiError(response.status, describe(response.status, payload));
  }
  return response;
}

export async function json<T>(transport: Transport, path: string, options?: RequestOptions): Promise<T> {
  const response = await send(transport, path, options);
  return (await response.json()) as T;
}

export function errorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.detail;
  if (error instanceof Error && error.message) return error.message;
  return "Something went wrong.";
}
