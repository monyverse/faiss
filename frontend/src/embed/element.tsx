/**
 * <faiss-copilot>: the FAISS assistant as a custom element other portals can drop in.
 *
 *   <script src="https://faiss.example/faiss-copilot.js"></script>
 *   <faiss-copilot api-base="https://faiss.example" deal-id="…"></faiss-copilot>
 *   <script>document.querySelector("faiss-copilot").getToken = async () => portal.accessToken();</script>
 *
 * Attributes   api-base   origin (and optional path prefix) that serves the FAISS API under /api
 *              deal-id    optional: scope the conversation to one deal
 *              dev-user   development only: a directory persona, sent as X-Faiss-User
 *              heading    optional: the title shown before the first question
 * Properties   getToken   async () => string: the bearer token, asked for on every request
 * Events       faiss-conversation   detail: { conversationId }, when a conversation starts
 *
 * Everything renders inside a shadow root, with its own stylesheet.
 */
import { createRoot, type Root } from "react-dom/client";

import { Chat } from "@/components/chat";
import { createApi } from "@/lib/api";

import css from "./embed.css?inline";

const SUGGESTIONS = [
  "Who chairs the internal steering committee?",
  "What has to be in place before Go/No-Go?",
  "What does the Central Hub do during mobilisation?",
];

/**
 * Tailwind registers its internal variables with @property, which browsers ignore inside a shadow
 * root. Give those variables their initial values on every element in the shadow tree instead.
 */
function shadowSafe(sheet: string): string {
  const initial: string[] = [];
  for (const match of sheet.matchAll(/@property\s+(--[\w-]+)\s*\{([^}]*)\}/g)) {
    const value = /initial-value:\s*([^;}]+)/.exec(match[2] ?? "");
    if (match[1] && value?.[1]) initial.push(`${match[1]}:${value[1].trim()}`);
  }
  return initial.length ? `${sheet}\n:host,*,::before,::after{${initial.join(";")}}` : sheet;
}

type TokenSource = () => Promise<string | null | undefined> | string | null | undefined;

class FaissCopilot extends HTMLElement {
  static observedAttributes = ["api-base", "deal-id", "dev-user", "heading"];

  /** Set by the host page. Called before every request, so return a current token each time. */
  getToken: TokenSource | null = null;

  #root: Root | null = null;
  #mount: HTMLDivElement | null = null;

  connectedCallback(): void {
    const shadow = this.shadowRoot ?? this.attachShadow({ mode: "open" });
    if (!this.#mount) {
      const style = document.createElement("style");
      style.textContent = shadowSafe(css);
      this.#mount = document.createElement("div");
      this.#mount.className = "faiss-copilot-root";
      shadow.append(style, this.#mount);
    }
    this.#root ??= createRoot(this.#mount);
    this.#render();
  }

  disconnectedCallback(): void {
    this.#root?.unmount();
    this.#root = null;
  }

  attributeChangedCallback(): void {
    if (this.#root) this.#render();
  }

  #render(): void {
    const apiBase = (this.getAttribute("api-base") ?? "").replace(/\/+$/, "");
    const dealId = this.getAttribute("deal-id") || null;
    const devUser = this.getAttribute("dev-user");
    const api = createApi({
      baseUrl: apiBase,
      authHeaders: async (): Promise<Record<string, string>> => {
        const token = this.getToken ? await this.getToken() : null;
        if (token) return { Authorization: `Bearer ${token}` };
        return devUser ? { "X-Faiss-User": devUser } : {};
      },
    });
    this.#root?.render(
      <Chat
        // A different API, deal or person is a different conversation.
        key={`${apiBase}|${dealId ?? ""}|${devUser ?? ""}`}
        api={api}
        dealId={dealId}
        className="h-full"
        heading={this.getAttribute("heading") ?? "Ask FAISS about the M&A methodology"}
        suggestions={SUGGESTIONS}
        onConversation={(conversationId) =>
          this.dispatchEvent(new CustomEvent("faiss-conversation", { detail: { conversationId }, bubbles: true, composed: true }))
        }
      />,
    );
  }
}

if (!customElements.get("faiss-copilot")) customElements.define("faiss-copilot", FaissCopilot);

declare global {
  interface HTMLElementTagNameMap {
    "faiss-copilot": FaissCopilot;
  }
}

export type { FaissCopilot };
