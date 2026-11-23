# FAISS web

The web frontend of FAISS, the M&A Intelligence Platform. Two deliverables from one codebase:

- **The app**: Vite, React 19, TanStack Start (SSR, file-based routes), TypeScript (strict), Tailwind CSS v4, Radix UI primitives, TanStack Query. Built by Nitro into a self-contained Node server.
- **The embeddable copilot**: a single file that registers `<faiss-copilot>`, the assistant chat as a custom element for other portals.

## Run

Needs the API on `http://localhost:8000` (see `../backend`). Package manager: `bun`.

```bash
bun install
bun run dev            # http://localhost:3000, /api proxied to the API by Vite
```

In development mode the persona switcher (top right) chooses who you are; it is how deal-level and workstream-level isolation is shown.

## Build and check

```bash
bun run typecheck      # tsc --noEmit (run after a build or dev start: they generate src/routeTree.gen.ts)
bun run build          # the app            -> .output/  (run: node .output/server/index.mjs)
bun run build:embed    # the custom element -> dist-embed/faiss-copilot.js
bun run build:image    # what the Dockerfile does: the app, also serving /faiss-copilot.js

PORT=3000 FAISS_API_INTERNAL_URL=http://localhost:8000 FAISS_AUTH_MODE=dev node .output/server/index.mjs
bun run verify:server  # /healthz, SSR shell, /runtime-config.json, /api proxy, SSE through the proxy
bun run verify:streaming   # starts its own slow fake upstream: events arrive one by one; env is read at runtime
bun run check:ui [base-url] [full|reduced|assistant|embed]   # drives the UI in headless Chrome, saves docs/screens/*.png
```

`check:ui full` hands over a real goal on Project Baobab (it first clears the deal's valuation assumptions so the agent asks for them). It writes to the API's database.

Image (build context is the repository root): `docker build -f frontend/Dockerfile .`

## Runtime configuration

One image for every environment: nothing below is baked in at build time, and there are no `VITE_*` settings.

| Variable | Meaning |
| --- | --- |
| `PORT`, `HOST` | Where the server listens (default 3000). |
| `FAISS_API_INTERNAL_URL` | The API as the web server reaches it, for example `http://faiss-api:8000`. Read on every request. |
| `FAISS_AUTH_MODE` | `dev` (personas, `X-Faiss-User`) or `oidc`. Anything else is treated as `dev`. |
| `FAISS_OIDC_AUTHORITY`, `FAISS_OIDC_CLIENT_ID`, `FAISS_OIDC_SCOPE` | The identity provider, for `oidc` mode. Scope defaults to `openid profile email`. |

The server answers three paths itself, before the router (`src/server.ts`):

- `GET /healthz`: 200, does not depend on the API.
- `GET /runtime-config.json`: the configuration above as the browser sees it. The same values are also delivered inside the first HTML by the root route.
- `/api/*`: relayed to `FAISS_API_INTERNAL_URL`, response streamed through untouched (the assistant uses server-sent events). In the cluster the ingress sends `/api` straight to the API and this relay is not used.

### Sign-in

- `dev`: the chosen persona is kept in `localStorage` and sent as `X-Faiss-User`.
- `oidc`: authorization code + PKCE with `oidc-client-ts`, all of it in `src/lib/auth/oidc.ts`, loaded as a separate chunk only in this mode. Redirect URI: `<origin>/auth/callback`. Tokens are kept in `sessionStorage` and sent as `Authorization: Bearer`. Nothing is rendered and no API call is made until the person is signed in. **This mode has not been exercised against a real identity provider.**

## Embedding the copilot

```html
<script src="https://<faiss-web>/faiss-copilot.js"></script>
<faiss-copilot api-base="https://<faiss-host>" deal-id="…"></faiss-copilot>
<script>
  document.querySelector("faiss-copilot").getToken = async () => portal.getAccessToken();
</script>
```

| | |
| --- | --- |
| `api-base` (attribute) | Origin, plus an optional path prefix, that serves the FAISS API under `/api`. Empty means the page's own origin. |
| `deal-id` (attribute) | Optional. Scopes the conversation to one deal (its documents and stage). |
| `dev-user` (attribute) | Development only: a directory persona, sent as `X-Faiss-User`. Ignored once `getToken` returns a token. |
| `heading` (attribute) | Optional title shown before the first question. |
| `getToken` (property) | `async () => string`. Called before every request, so return a current token each time. Sent as `Authorization: Bearer`. |
| `faiss-conversation` (event) | Bubbles; `detail: { conversationId }` when a conversation starts. |

- Everything renders in a shadow root with its own stylesheet: the host's CSS does not reach in, and the element's does not leak out. Give the element a height (default 560px).
- If the host page is on another origin than `api-base`, the API must allow that origin (`FAISS_CORS_ORIGINS`) with the headers `Authorization`, `Content-Type` and, in development, `X-Faiss-User`.
- The element calls `POST /api/chat/stream` only. A deal the token's owner may not see answers 404, and the message is shown in the conversation.
- Try it: `bun run build:embed && bun run demo:embed`, then open `http://localhost:3000/embed-demo.html` (add `?api=same-origin` to go through the demo server's own `/api` relay instead of CORS).

## Layout

```
src/server.ts            server entry: /healthz, /runtime-config.json, /api relay, then the router
src/server/              runtime configuration and the API relay (server only)
src/routes/              file-based routes: / (deals), /deals/$dealId, /goals, /approvals, /assistant, /knowledge, /africa, /audit, /auth/callback
src/components/          the shell, shared UI, the chat, goal and approval views, one file per deal tab
src/lib/api.ts           the typed client (types in src/lib/types.ts, written from the backend's api/*.py)
src/lib/auth/            session (dev persona or bearer token) and the isolated OIDC module
src/embed/               the <faiss-copilot> element and its stylesheet
src/styles/tokens.css    design tokens shared by the app and the element
```
