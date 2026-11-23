// Drives the real UI in headless Chrome over the DevTools protocol (no extra packages) and saves
// screenshots to docs/screens/. Needs the production server on :3000 and the API on :8000.
//   node scripts/ui-check.mjs [http://localhost:3000] [full|reduced]
import { spawn, spawnSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const base = process.argv[2] ?? "http://localhost:3000";
const mode = process.argv[3] ?? "full"; // full: also runs a goal end to end · reduced: screenshots and checks only · assistant: the chat only · embed: the <faiss-copilot> demo page
const full = mode === "full";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const shots = join(root, "docs", "screens");
const profile = join(root, "node_modules", ".cache", "ui-check-profile");
const chromePath = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const port = 9377;
mkdirSync(shots, { recursive: true });

const results = [];
const note = (status, name, detail = "") => {
  results.push({ status, name, detail });
  console.log(`${status}  ${name}${detail ? `  (${detail})` : ""}`);
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Reuse a Chrome already listening on the debugging port (it can take a while to start), else start one.
const running = await fetch(`http://127.0.0.1:${port}/json/version`).then((r) => r.ok).catch(() => false);
const chrome = running ? null : spawn(chromePath, [
  "--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "--no-first-run", "--no-default-browser-check",
  "--disable-extensions", "--disable-background-networking", "--disable-sync", "--hide-scrollbars", "--window-size=1440,900", "about:blank",
], { stdio: "ignore" });

let ws;
let seq = 0;
const pending = new Map();
const problems = [];
async function connect() {
  let target;
  for (let i = 0; i < 120 && !target; i++) {
    await sleep(500);
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      target = list.find((t) => t.type === "page");
    } catch { /* not up yet */ }
  }
  if (!target) throw new Error("Chrome did not start");
  ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      message.error ? reject(new Error(message.error.message)) : resolve(message.result);
    } else if (message.method === "Runtime.exceptionThrown") {
      problems.push(`exception: ${message.params.exceptionDetails.exception?.description ?? message.params.exceptionDetails.text}`.slice(0, 300));
    } else if (message.method === "Log.entryAdded" && message.params.entry.level === "error") {
      problems.push(`console: ${message.params.entry.text} ${message.params.entry.url ?? ""}`.slice(0, 300));
    }
  };
}
const cdp = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++seq;
  pending.set(id, { resolve, reject });
  ws.send(JSON.stringify({ id, method, params }));
});
async function evaluate(expression) {
  const result = await cdp("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description ?? result.exceptionDetails.text);
  return result.result.value;
}
const viewport = (width, height, mobile = false, scale = 1) => cdp("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: scale, mobile });
async function goto(path) {
  await cdp("Page.navigate", { url: base + path });
  await sleep(900);
}
async function waitFor(description, expression, timeout = 15000) {
  const started = Date.now();
  for (;;) {
    const value = await evaluate(expression).catch(() => null);
    if (value) return value;
    if (Date.now() - started > timeout) throw new Error(`timed out waiting for ${description}`);
    await sleep(250);
  }
}
const hasText = (text) => `document.body.innerText.toLowerCase().includes(${JSON.stringify(text.toLowerCase())})`;
// Finds the first visible element matching the selector whose text contains `text`; returns its centre.
const locate = (selector, text) => `(() => {
  const want = ${JSON.stringify(text ?? "")};
  for (const el of document.querySelectorAll(${JSON.stringify(selector)})) {
    const label = (el.innerText || el.getAttribute("aria-label") || "").trim();
    if (want && !label.includes(want)) continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    el.scrollIntoView({ block: "center" });
    const b = el.getBoundingClientRect();
    return { x: b.left + b.width / 2, y: b.top + b.height / 2 };
  }
  return null;
})()`;
async function click(selector, text, timeout = 10000) {
  const point = await waitFor(`${selector} "${text ?? ""}"`, locate(selector, text), timeout);
  await sleep(120);
  const fresh = (await evaluate(locate(selector, text))) ?? point;
  for (const type of ["mouseMoved", "mousePressed", "mouseReleased"]) {
    await cdp("Input.dispatchMouseEvent", { type, x: fresh.x, y: fresh.y, button: type === "mouseMoved" ? "none" : "left", clickCount: type === "mouseMoved" ? 0 : 1 });
  }
  await sleep(350);
}
async function type(selector, text) {
  await click(selector);
  await cdp("Input.insertText", { text });
  await sleep(150);
}
async function shot(name) {
  await sleep(450);
  const { data } = await cdp("Page.captureScreenshot", { format: "png" });
  writeFileSync(join(shots, `${name}.png`), Buffer.from(data, "base64"));
  console.log(`      saved docs/screens/${name}.png`);
}
const layout = () => evaluate(`(() => {
  const d = document.documentElement;
  const small = [...document.querySelectorAll("a,button,[role=tab],input,textarea,[role=switch]")].filter((el) => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && r.top < innerHeight && r.bottom > 0 && (r.height < 43.5) && !el.closest(".sr-only") && getComputedStyle(el).position !== "absolute";
  }).map((el) => (el.innerText || el.getAttribute("aria-label") || el.tagName).trim().slice(0, 30) + ":" + Math.round(el.getBoundingClientRect().height));
  return { overflow: d.scrollWidth > d.clientWidth, scrollWidth: d.scrollWidth, clientWidth: d.clientWidth, small };
})()`);
async function step(name, run) {
  try {
    const detail = await run();
    note("PASS", name, detail ?? "");
    return true;
  } catch (error) {
    note("FAIL", name, error.message.slice(0, 240));
    return false;
  }
}
const api = (path, init = {}) => fetch(`http://localhost:8000${path}`, { ...init, headers: { "X-Faiss-User": "naledi.director", "content-type": "application/json", ...(init.headers ?? {}) } });
async function persona(name) {
  await click("button[aria-label='Switch persona']");
  await click("[role=menuitem]", name);
  await sleep(900);
}

const QUESTION = "Who chairs the internal steering committee, and how often does it meet?";
async function assistantStep() {
  await step("assistant: ask a question, the answer streams in with citations", async () => {
    await goto("/assistant");
    await waitFor("assistant", hasText("Ask about the M&A methodology"));
    // The suggestion in the empty state (not an earlier conversation with the same title in the side list).
    await click("main ul.grid li button", QUESTION);
    await waitFor("sources", `[...document.querySelectorAll("main ol > li button")].some((b) => /\\d+ sources/.test(b.innerText))`, 30000);
    await sleep(800);
    const info = await evaluate(`(() => {
      const items = [...document.querySelectorAll("main ol > li")].filter((el) => el.parentElement.closest("li") === null);
      const answer = items[items.length - 1];
      answer.scrollIntoView({ block: "start" });
      return { asked: items[0].innerText.trim(), chars: answer.innerText.length, buttons: answer.querySelectorAll("button").length, header: answer.querySelector("p").innerText.replace(/\\n/g, " · "), streamRequests: performance.getEntriesByType("resource").filter((r) => r.name.endsWith("/api/chat/stream")).length };
    })()`);
    await shot("assistant-answer-desktop");
    if (info.asked !== QUESTION) throw new Error(`the conversation does not start with the question asked: ${info.asked}`);
    if (info.streamRequests !== 1) throw new Error(`expected one POST /api/chat/stream, saw ${info.streamRequests}`);
    await click("main ol > li button", "sources");
    await waitFor("source panel", `!!document.querySelector("aside[aria-label=Sources] article")`);
    await shot("assistant-desktop");
    return `${info.chars} characters of answer via 1 request to /api/chat/stream, ${info.buttons} source buttons, header: "${info.header}"`;
  });
}

try {
  await connect();
  await cdp("Page.enable");
  await cdp("Runtime.enable");
  await cdp("Log.enable");
  if (mode === "embed") {
    await viewport(1100, 900);
    const inShadow = (body) => `(() => { const root = document.querySelector("faiss-copilot")?.shadowRoot; if (!root) return null; ${body} })()`;
    await step("embed: <faiss-copilot> renders inside a shadow root", async () => {
      await goto("/embed-demo.html?api=same-origin");
      await waitFor("the element", inShadow(`return root.querySelectorAll("button").length > 2;`));
      return await evaluate(inShadow(`return root.querySelector("p")?.innerText;`));
    });
    await step("embed: styles are isolated in both directions", async () => {
      const styles = await evaluate(inShadow(`
        const box = root.querySelector("form > div");
        const host = document.querySelector("main > button");
        return { composerBorder: getComputedStyle(box).borderTopStyle + " " + getComputedStyle(box).borderTopWidth, shadowTextareaColor: getComputedStyle(root.querySelector("textarea")).color, hostButtonBorder: getComputedStyle(host).borderTopStyle, hostParagraph: getComputedStyle(document.querySelector("main > p")).fontFamily.split(",")[0], shadowFont: getComputedStyle(root.querySelector("p")).fontFamily.split(",")[0] };`));
      if (!styles.composerBorder.startsWith("solid")) throw new Error(`borders did not apply in the shadow root: ${JSON.stringify(styles)}`);
      if (styles.hostButtonBorder !== "dashed" || styles.hostParagraph !== "Georgia") throw new Error(`host styles changed: ${JSON.stringify(styles)}`);
      return JSON.stringify(styles);
    });
    await step("embed: ask a question, streamed answer with citations", async () => {
      await evaluate(inShadow(`[...root.querySelectorAll("button")].find((b) => b.innerText.includes("Who chairs")).click(); return true;`));
      await waitFor("sources", inShadow(`return [...root.querySelectorAll("button")].some((b) => /\\d+ sources/.test(b.innerText));`), 30000);
      await sleep(600);
      const info = await evaluate(inShadow(`const li = [...root.querySelectorAll("ol > li")].pop(); return "header: " + JSON.stringify(li.querySelector("p").innerText.slice(0, 80)) + "; " + li.innerText.length + " characters, " + li.querySelectorAll("button").length + " source buttons; event: " + document.getElementById("log").textContent;`));
      await evaluate(inShadow(`[...root.querySelectorAll("ol > li button")].find((b) => /sources/.test(b.innerText)).click(); return true;`));
      await waitFor("source panel", inShadow(`return !!root.querySelector("aside article");`));
      await shot("embed-demo-desktop");
      return info;
    });
    note(problems.length ? "WARN" : "PASS", "browser console", problems.length ? [...new Set(problems)].slice(0, 6).join(" || ") : "no errors or exceptions");
    throw new Error("done");
  }
  if (mode === "assistant") {
    await viewport(1440, 900);
    await assistantStep();
    note(problems.length ? "WARN" : "PASS", "browser console", problems.length ? [...new Set(problems)].slice(0, 6).join(" || ") : "no errors or exceptions");
    throw new Error("done");
  }
  const deals = await (await api("/api/deals")).json();
  const baobab = deals.find((d) => d.code_name === "Project Baobab");

  // ---------------------------------------------------------------- desktop
  await viewport(1440, 900);
  await step("desktop: deals list renders with the seeded deals", async () => {
    await goto("/");
    await waitFor("Project Baobab", hasText("Project Baobab"));
    const names = await evaluate(`[...document.querySelectorAll("main li h2")].map((h) => h.innerText)`);
    await shot("deals-desktop");
    return `director sees: ${names.join(", ")}`;
  });
  await step("development mode never loads the OIDC chunk", async () => {
    const loaded = await evaluate(`performance.getEntriesByType("resource").map((r) => r.name).filter((n) => /oidc/i.test(n))`);
    if (loaded.length) throw new Error(`loaded ${loaded.join(", ")}`);
    return "no oidc-*.js request";
  });

  const latest = (await (await api(`/api/deals/${baobab.id}/goals`)).json())[0];
  let goalUrl = `/deals/${baobab.id}?tab=goals${latest ? `&goal=${latest.id}` : ""}`;
  if (full) {
    // The diligence goal asks for the valuation assumptions only when the deal has none.
    await api(`/api/deals/${baobab.id}/financials`, { method: "PUT", body: JSON.stringify({ assumptions: { cost_of_equity: null, long_term_growth: null, offer_price: null } }) });
    await step("open Project Baobab and hand over the diligence goal", async () => {
      await click("main li a", "Project Baobab");
      await waitFor("deal workspace", hasText("Necessary at this stage"));
      await shot("deal-overview-desktop");
      await click("[role=tab]", "Goals");
      await click("button", "Run due diligence on the target");
      await click("button", "Hand over");
      await waitFor("goal detail", hasText("Requirements"));
      return "goal created from the suggested objective";
    });
    await step("the goal works by itself and stops at the question", async () => {
      await waitFor("the question", hasText("Waiting for your answer"), 40000);
      await shot("goal-question-desktop");
      return await evaluate(`document.querySelector("article p.font-medium")?.innerText.slice(0, 90)`);
    });
    await step("answer it: cost of equity 20, growth 6", async () => {
      await type("input[name=cost_of_equity]", "20");
      await type("input[name=long_term_growth]", "6");
      await click("button", "Send answer");
      await waitFor("the approval request", `[...document.querySelectorAll("button")].some((b) => b.innerText.trim() === "Approve")`, 40000);
      await shot("goal-approval-desktop");
      return await evaluate(`[...document.querySelectorAll("article p.font-medium")].map((p) => p.innerText).join(" | ").slice(0, 120)`);
    });
    await step("approve the submission and see the goal finish verified", async () => {
      await type("article input", "Reviewed in the UI check");
      await click("button", "Approve");
      await waitFor("verified", hasText("Verified: every requirement met"), 40000);
      await sleep(1200);
      await shot("goal-done-desktop");
      goalUrl = await evaluate("location.pathname + location.search");
      return await evaluate(`[...document.querySelectorAll("section")].find((s) => s.innerText.startsWith("Requirements"))?.innerText.match(/\\bMet\\b/g)?.length + " requirements shown as met"`);
    });
  }
  {
    await step("open a finding's evidence", async () => {
      await goto(`/deals/${baobab.id}?tab=findings`);
      await waitFor("findings", hasText("Evidence traceability"));
      await click("main li > button[aria-expanded=false]");
      await waitFor("evidence", `document.querySelectorAll("main li article").length > 0`);
      await shot("findings-evidence-desktop");
      return await evaluate(`document.querySelectorAll("main li article").length + " source card(s); first: " + document.querySelector("main li article p.font-medium")?.innerText.slice(0, 70)`);
    });
  }
  await step("desktop: deal Goals tab", async () => {
    await goto(goalUrl);
    await waitFor("goals", hasText("Activity"));
    await sleep(800);
    await shot("deal-goals-desktop");
  });
  await assistantStep();

  // ---------------------------------------------------------------- personas
  await step("Technology Lead: the Financials tab shows the restriction message", async () => {
    await goto(`/deals/${baobab.id}?tab=financials`);
    await waitFor("financials", hasText("Figures"));
    await persona("Thabo Nkosi");
    await waitFor("restricted", hasText("Restricted"));
    const message = await evaluate(`[...document.querySelectorAll("section")].find((s) => s.innerText.startsWith("Restricted"))?.innerText.replace(/\\n/g, " ")`);
    await shot("persona-technology-financials-desktop");
    return message;
  });
  await step("Kenya Regional Lead: only Project Baobab is listed", async () => {
    await goto("/");
    await waitFor("deals", hasText("Project Baobab"));
    await persona("Wanjiru Kamau");
    await sleep(1200);
    const names = await evaluate(`[...document.querySelectorAll("main li h2")].map((h) => h.innerText)`);
    await shot("persona-kenya-deals-desktop");
    if (names.length !== 1 || names[0] !== "Project Baobab") throw new Error(`listed: ${names.join(", ")}`);
    return `listed: ${names.join(", ")}`;
  });
  await step("a deal the Kenya lead may not see answers 'not found', not a crash", async () => {
    const acacia = deals.find((d) => d.code_name === "Project Acacia");
    await goto(`/deals/${acacia.id}`);
    await waitFor("not found", hasText("not found"));
    return await evaluate(`document.querySelector("main")?.innerText.replace(/\\n/g, " ").slice(0, 150)`);
  });

  // ---------------------------------------------------------------- phone, 390px
  await viewport(390, 844, true, 2);
  await goto("/");
  await waitFor("deals", hasText("Project Baobab"));
  await click("button[aria-label='Switch persona']");
  await shot("persona-switcher-mobile");
  await click("[role=menuitem]", "Naledi Mokoena");
  await sleep(1200);
  for (const [name, path, ready] of [
    ["deals-mobile", "/", "Project Marula"],
    ["deal-goals-mobile", goalUrl, "Activity"],
    ["assistant-mobile", "/assistant", "Ask about the M&A methodology"],
    ...(true ? [["deal-overview-mobile", `/deals/${baobab.id}`, "Necessary at this stage"], ["deal-financials-mobile", `/deals/${baobab.id}?tab=financials`, "Figures"], ["deal-findings-mobile", `/deals/${baobab.id}?tab=findings`, "Evidence traceability"]] : []),
  ]) {
    await step(`390px: ${name}`, async () => {
      await goto(path);
      await waitFor(ready, hasText(ready));
      await sleep(700);
      await shot(name);
      const l = await layout();
      if (l.overflow) throw new Error(`horizontal overflow: scrollWidth ${l.scrollWidth} > ${l.clientWidth}`);
      return `no horizontal scroll (${l.scrollWidth}px); controls under 44px tall in view: ${l.small.length ? l.small.join(", ") : "none"}`;
    });
  }
  note(problems.length ? "WARN" : "PASS", "browser console", problems.length ? [...new Set(problems)].slice(0, 6).join(" || ") : "no errors or exceptions");
} catch (error) {
  if (error?.message !== "done") note("FAIL", "ui-check aborted", String(error?.message ?? error).slice(0, 300));
} finally {
  try { ws?.close(); } catch { /* already closed */ }
  chrome?.kill("SIGTERM");
  spawnSync("pkill", ["-f", `remote-debugging-port=${port}`]);
  await sleep(800);
  rmSync(profile, { recursive: true, force: true });
}
process.exit(results.some((r) => r.status === "FAIL") ? 1 : 0);
