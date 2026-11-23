/**
 * Builds the FAISS knowledge corpus from the pinned Capability Hub snapshot.
 *
 * Three passes, so that everything a reader of the site can see is captured:
 *   1. data    — every content module under src/lib is imported and each exported value is
 *                serialised verbatim (wording is never summarised or corrected).
 *   2. copy    — routes and components are parsed statically for inline page copy.
 *   3. history — the design-history markdown under .lovable/plan and the roadmap.
 *
 * Output (knowledge/corpus):
 *   chunks.jsonl   one retrieval chunk per line, each with source path + JSON pointer
 *   ontology.json  the typed domain model the agents and the Deal Twin consume
 *   manifest.json  counts, hashes and the list of deliberately skipped files
 */
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { basename, join, relative, resolve } from "node:path";
import ts from "typescript";

const root = resolve(import.meta.dir, "..");
const snapshotDir = join(root, "source", "deal");
const srcDir = join(snapshotDir, "src");
const outDir = join(root, "corpus");
const MAX_CHARS = 1600;

if (!existsSync(srcDir)) {
  console.error("No snapshot found. Run `bun run sync` first.");
  process.exit(1);
}

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type Chunk = {
  id: string;
  /** Domain area in the knowledge model, e.g. "lifecycle" or "operating-model/functional-spokes". */
  area: string;
  /** How the text was obtained: data | copy | history. */
  origin: "data" | "copy" | "history";
  title: string;
  /** Breadcrumb from the source title down to this chunk. */
  breadcrumb: string[];
  /** Verbatim text. */
  text: string;
  source: { path: string; export?: string; pointer?: string };
  /** Routes on the Capability Hub where this content is shown. */
  siteRoutes: string[];
  tags: Record<string, string>;
  /** "approved" for live site content; "design-history" for .lovable plans; "retired" where the site removed it. */
  status: "approved" | "design-history" | "retired";
};

type ModuleSpec = { area: string; title: string; tags?: Record<string, string> };

/* ------------------------------------------------------------------ */
/* Module catalogue                                                    */
/* ------------------------------------------------------------------ */

const SKIPPED: Record<string, string> = {
  "lib/utils.ts": "class-name helper, no content",
  "lib/error-capture.ts": "runtime error plumbing, no content",
  "lib/error-page.ts": "runtime error page markup, no methodology content",
  "lib/lovable-error-reporting.ts": "runtime error plumbing, no content",
  "lib/deal-context.ts": "browser state hook, no content",
  "lib/search-index.ts": "derives a search index from other modules that are ingested directly",
  "lib/spoke-registry.ts": "re-exports the per-workstream modules that are ingested directly",
  "lib/spoke-content.ts": "type definitions only",
  "lib/ai-agent.ts": "placeholder for the agent URL (this platform is that agent)",
  "server.ts": "server-side rendering error wrapper, no content",
};

/** Global chrome reaches every content module (search, header); it must not count as "this page shows it". */
const CHROME = ["lib/search-index.ts", "components/SiteHeader.tsx", "components/GlobalSearch.tsx", "components/Wayfinding.tsx"];

const PATHWAYS: Record<string, string> = {
  foundations: "M&A Foundations pathway",
  "central-hub": "Central Hub Programme Management pathway",
  "executive-sponsor": "Accountable Executive (Executive Sponsor) pathway",
  "in-country-pmo": "In-country PMO pathway",
  "workstream-lead": "Workstream Lead pathway",
  "workstream-project-manager": "Workstream Project Manager pathway",
  "workstream-team-member": "Workstream Team Member pathway",
};

function humanise(key: string): string {
  if (/^[A-Z0-9_]+$/.test(key)) return key.toLowerCase().replace(/_/g, " ").replace(/^./, (c) => c.toUpperCase());
  return key
    .replace(/[-_]/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());
}

function specFor(rel: string): ModuleSpec | null {
  if (SKIPPED[rel] || /-progress\.ts$/.test(rel)) return null;
  const name = basename(rel).replace(/\.tsx?$/, "");
  if (rel.startsWith("lib/learning/")) {
    const pathway = name.replace(/-modules$/, "");
    const label = PATHWAYS[pathway] ?? humanise(pathway);
    return {
      area: `institutional-learning/pathways/${pathway}`,
      title: name.endsWith("-modules") ? `${label} — modules and exercises` : label,
      tags: { pathway },
    };
  }
  if (name === "regional-spoke") return { area: "operating-model/regional-spokes", title: "Regional Spokes" };
  if (name.endsWith("-spoke")) {
    return { area: "operating-model/functional-spokes", title: `Functional Spoke — ${humanise(name.replace(/-spoke$/, ""))}` };
  }
  const table: Record<string, ModuleSpec> = {
    archetypes: { area: "deal-archetypes", title: "Deal Archetypes" },
    lifecycles: { area: "lifecycle", title: "Deal Lifecycles" },
    "central-hub": { area: "operating-model/central-hub", title: "Central Hub" },
    "central-hub-mandate": { area: "operating-model/central-hub", title: "Central Hub mandate and RACI" },
    "operating-model": { area: "operating-model", title: "Operating Model" },
    "governance-forums": { area: "governance", title: "Governance forums — Terms of Reference" },
    "role-profiles": { area: "governance/roles", title: "Role profiles" },
    "role-attention": { area: "governance/roles", title: "Role attention across the deal" },
    "experienced-coach": { area: "institutional-learning/experienced-coach", title: "Experienced Coach" },
    mobilisation: { area: "mobilisation", title: "Mobilisation Roadmap" },
    "partner-acceleration": { area: "partner-acceleration", title: "Partner Accelerator" },
    "success-factors": { area: "operating-model/success-factors", title: "Key Success Factors" },
    "vision-content": { area: "vision", title: "Vision" },
  };
  return table[name] ?? { area: "other", title: humanise(name) };
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function listFiles(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir).sort()) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...listFiles(p));
    else out.push(p);
  }
  return out;
}

const chunks: Chunk[] = [];
const seenIds = new Set<string>();

function addChunk(c: Omit<Chunk, "id">) {
  const text = c.text.trim();
  if (!text) return;
  const base = createHash("sha1")
    .update([c.source.path, c.source.export ?? "", c.source.pointer ?? "", text].join("\u0000"))
    .digest("hex")
    .slice(0, 16);
  let id = base;
  for (let n = 2; seenIds.has(id); n++) id = `${base}-${n}`;
  seenIds.add(id);
  chunks.push({ ...c, text, id });
}

/** file route name → URL path, following TanStack Router's flat file convention. */
function routePath(file: string): string | null {
  const name = basename(file).replace(/\.tsx$/, "");
  if (name === "__root" || !file.includes("/routes/")) return null;
  const parts = name.split(".").filter((p) => p !== "index");
  return "/" + parts.join("/");
}

/* ------------------------------------------------------------------ */
/* Import graph: which site routes show which content module           */
/* ------------------------------------------------------------------ */

const allSrc = listFiles(srcDir).filter((f) => /\.tsx?$/.test(f) && !f.includes("/components/ui/"));
const importsOf = new Map<string, string[]>();
for (const file of allSrc) {
  const text = readFileSync(file, "utf8");
  const deps: string[] = [];
  for (const m of text.matchAll(/from\s+"(@\/[^"]+|\.{1,2}\/[^"]+)"/g)) {
    const spec = m[1]!;
    const basePath = spec.startsWith("@/") ? join(srcDir, spec.slice(2)) : resolve(join(file, ".."), spec);
    const hit = [basePath + ".ts", basePath + ".tsx", join(basePath, "index.ts")].find((p) => existsSync(p));
    if (hit) deps.push(hit);
  }
  importsOf.set(file, deps);
}

function reach(file: string, seen = new Set<string>()): Set<string> {
  for (const dep of importsOf.get(file) ?? []) {
    if (CHROME.some((c) => dep.endsWith(`/src/${c}`))) continue;
    if (!seen.has(dep)) {
      seen.add(dep);
      reach(dep, seen);
    }
  }
  return seen;
}

const routesFor = new Map<string, string[]>();
for (const file of allSrc.filter((f) => f.includes("/routes/"))) {
  const path = routePath(file);
  if (!path) continue;
  for (const dep of reach(file)) {
    const list = routesFor.get(dep) ?? [];
    if (!list.includes(path)) list.push(path);
    routesFor.set(dep, list);
  }
}

/* ------------------------------------------------------------------ */
/* Pass 1: exported data, verbatim                                      */
/* ------------------------------------------------------------------ */

const REACT_ELEMENT = new Set([Symbol.for("react.element"), Symbol.for("react.transitional.element")]);
const BLOCK_TAGS = new Set(["p", "div", "li", "ul", "ol", "h1", "h2", "h3", "h4", "h5", "h6", "section", "tr", "br", "blockquote", "table"]);

function isElement(v: unknown): v is { type: unknown; props: Record<string, unknown> } {
  return typeof v === "object" && v !== null && REACT_ELEMENT.has((v as { $$typeof?: symbol }).$$typeof as symbol);
}

function isComponentLike(v: unknown): boolean {
  if (typeof v === "function") return true;
  return typeof v === "object" && v !== null && typeof (v as { $$typeof?: unknown }).$$typeof === "symbol" && !isElement(v);
}

/** Flattens a React node to its visible wording without rendering to the DOM. */
function elementText(node: unknown): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(elementText).join("");
  if (!isElement(node)) return "";
  const { type, props } = node;
  if (typeof type === "function") {
    try {
      return elementText((type as (p: unknown) => unknown)(props));
    } catch {
      return elementText(props.children);
    }
  }
  const inner = elementText(props.children);
  if (typeof type === "string" && BLOCK_TAGS.has(type)) return `\n${type === "li" ? "- " : ""}${inner}\n`;
  return inner;
}

function tidy(text: string): string {
  return text
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function isScalar(v: unknown): boolean {
  return v === null || ["string", "number", "boolean"].includes(typeof v) || isElement(v);
}

function scalarText(v: unknown): string {
  if (isElement(v)) return tidy(elementText(v));
  return v === null ? "" : String(v);
}

const LABEL_KEYS = ["title", "name", "heading", "label", "term", "role", "area", "category", "accountability", "question", "prompt", "short", "id"];

function labelOf(v: unknown): string | null {
  if (typeof v !== "object" || v === null || Array.isArray(v)) return null;
  const rec = v as Record<string, unknown>;
  if (typeof rec.archetypeName === "string") {
    return typeof rec.variantLabel === "string" && rec.variantLabel ? `${rec.archetypeName} (${rec.variantLabel})` : rec.archetypeName;
  }
  for (const k of LABEL_KEYS) {
    const val = rec[k];
    if (typeof val === "string" && val.trim() && val.length <= 140) return val.trim();
    if (isElement(val)) {
      const t = tidy(elementText(val));
      if (t && t.length <= 140) return t;
    }
  }
  return null;
}

function entries(v: object): [string, unknown][] {
  return Object.entries(v).filter(([, val]) => val !== undefined && !isComponentLike(val));
}

/** `{ text, subs? }` items and single-field objects read better as plain bullets. */
function inlineItem(item: unknown, depth: number): string | null {
  if (typeof item !== "object" || item === null || Array.isArray(item) || isElement(item)) return null;
  const pad = "  ".repeat(depth);
  const fields = entries(item);
  const first = fields[0];
  if (fields.length === 1 && first && isScalar(first[1])) return `${pad}- ${scalarText(first[1])}`;
  const rec = item as { text?: unknown; subs?: unknown };
  if (fields.length === 2 && typeof rec.text === "string" && Array.isArray(rec.subs) && rec.subs.every((x) => typeof x === "string")) {
    return [`${pad}- ${rec.text}`, ...(rec.subs as string[]).map((sub) => `${pad}  - ${sub}`)].join("\n");
  }
  return null;
}

/** Readable, verbatim rendering of any exported value. */
function render(v: unknown, depth = 0): string {
  const pad = "  ".repeat(depth);
  if (isScalar(v)) return scalarText(v);
  if (isComponentLike(v)) return "";
  if (Array.isArray(v)) {
    return v
      .filter((item) => !isComponentLike(item))
      .map((item) => {
        if (isScalar(item)) return `${pad}- ${scalarText(item)}`;
        const inline = inlineItem(item, depth);
        if (inline !== null) return inline;
        const body = render(item, depth + 1);
        return `${pad}-\n${body}`;
      })
      .join("\n");
  }
  return entries(v as object)
    .map(([k, val]) => {
      if (isScalar(val)) {
        const s = scalarText(val);
        return s ? `${pad}${humanise(k)}: ${s}` : "";
      }
      const body = render(val, depth + 1);
      return body ? `${pad}${humanise(k)}:\n${body}` : "";
    })
    .filter(Boolean)
    .join("\n");
}

function splitLong(text: string): string[] {
  if (text.length <= MAX_CHARS) return [text];
  const sentences = text.split(/(?<=[.!?])\s+(?=[A-Z"“(])/);
  const out: string[] = [];
  let current = "";
  for (const s of sentences) {
    if (current && current.length + s.length + 1 > MAX_CHARS) {
      out.push(current);
      current = s;
    } else current = current ? `${current} ${s}` : s;
  }
  if (current) out.push(current);
  return out;
}

type Ctx = {
  spec: ModuleSpec;
  rel: string;
  exportName: string;
  routes: string[];
};

function inheritTags(node: unknown, tags: Record<string, string>, rel: string, pointer: string): Record<string, string> {
  if (typeof node !== "object" || node === null || Array.isArray(node)) return tags;
  const rec = node as Record<string, unknown>;
  const next = { ...tags };
  if (typeof rec.archetypeId === "string") next.archetype = rec.archetypeId;
  if (rel === "lib/archetypes.ts" && /^\/ARCHETYPES\/\d+$/.test(pointer) && typeof rec.id === "string") next.archetype = rec.id;
  if (/\/stages\/\d+$/.test(pointer) && typeof rec.id === "string") next.stage = rec.id;
  if (/-spoke\.ts$/.test(rel) && rel !== "lib/regional-spoke.ts" && pointer === "/CONTENT" && typeof rec.id === "string") next.workstream = rec.id;
  if (rel === "lib/governance-forums.ts" && /^\/GOVERNANCE_FORUMS\/\d+$/.test(pointer) && typeof rec.id === "string") next.forum = rec.id;
  if (rel === "lib/operating-model.ts" && /^\/SPOKES\/\d+$/.test(pointer) && typeof rec.id === "string") next.workstream = rec.id;
  if (rel === "lib/operating-model.ts" && /^\/GOVERNANCE_ROLES\/\d+$/.test(pointer) && typeof rec.id === "string") next.role = rec.id;
  return next;
}

function emit(node: unknown, pointer: string, crumbs: string[], tags: Record<string, string>, ctx: Ctx) {
  tags = inheritTags(node, tags, ctx.rel, pointer);
  const push = (text: string, ptr: string, trail: string[]) =>
    addChunk({
      area: ctx.spec.area,
      origin: "data",
      title: trail[trail.length - 1] ?? ctx.spec.title,
      breadcrumb: trail,
      text,
      source: { path: `src/${ctx.rel}`, export: ctx.exportName, pointer: ptr },
      siteRoutes: ctx.routes,
      tags,
      status: "approved",
    });

  const whole = tidy(render(node));
  if (!whole) return;
  if (whole.length <= MAX_CHARS) return push(whole, pointer, crumbs);

  if (isScalar(node)) {
    splitLong(whole).forEach((part, i) => push(part, `${pointer}#${i}`, crumbs));
    return;
  }

  if (Array.isArray(node)) {
    // Pack neighbouring small items together; recurse into items that are too large on their own.
    let buffer: string[] = [];
    let start = 0;
    const flush = (end: number) => {
      if (buffer.length) push(buffer.join("\n"), start === end ? `${pointer}/${start}` : `${pointer}/${start}-${end}`, crumbs);
      buffer = [];
    };
    node.forEach((item, i) => {
      if (isComponentLike(item)) return;
      const body = isScalar(item) ? `- ${scalarText(item)}` : (inlineItem(item, 0) ?? `-\n${render(item, 1)}`);
      if (body.length > MAX_CHARS) {
        flush(i - 1);
        const label = labelOf(item) ?? `Item ${i + 1}`;
        emit(item, `${pointer}/${i}`, [...crumbs, label], tags, ctx);
        start = i + 1;
        return;
      }
      if (buffer.length && buffer.join("\n").length + body.length + 1 > MAX_CHARS) {
        flush(i - 1);
        start = i;
      }
      if (!buffer.length) start = i;
      buffer.push(body);
    });
    flush(node.length - 1);
    return;
  }

  // Object: pack fields in order so related short fields stay together; recurse into fields
  // that are too large on their own.
  let fieldBuffer: string[] = [];
  let part = 0;
  const flushFields = () => {
    if (fieldBuffer.length) push(fieldBuffer.join("\n"), part++ ? `${pointer}#${part - 1}` : pointer, crumbs);
    fieldBuffer = [];
  };
  for (const [k, val] of entries(node as object)) {
    const body = isScalar(val) ? scalarText(val) : render(val, 1);
    if (!body) continue;
    const line = isScalar(val) ? `${humanise(k)}: ${body}` : `${humanise(k)}:\n${body}`;
    if (line.length > MAX_CHARS) {
      flushFields();
      emit(val, `${pointer}/${k}`, [...crumbs, humanise(k)], tags, ctx);
      continue;
    }
    if (fieldBuffer.length && fieldBuffer.join("\n").length + line.length + 1 > MAX_CHARS) flushFields();
    fieldBuffer.push(line);
  }
  flushFields();
}

const dataModules: { rel: string; exports: string[] }[] = [];
const libFiles = listFiles(join(srcDir, "lib")).filter((f) => /\.tsx?$/.test(f));
const loaded = new Map<string, Record<string, unknown>>();

for (const file of libFiles) {
  const rel = relative(srcDir, file);
  const spec = specFor(rel);
  if (!spec) continue;
  const mod = (await import(file)) as Record<string, unknown>;
  loaded.set(rel, mod);
  const routes = (routesFor.get(file) ?? []).slice(0, 8);
  const names: string[] = [];
  for (const [exportName, value] of Object.entries(mod)) {
    if (isComponentLike(value) || value === undefined) continue;
    names.push(exportName);
    const label = labelOf(value);
    const crumbs = [spec.title, humanise(exportName), ...(label ? [label] : [])];
    const ctx = { spec, rel, exportName, routes };
    if (isScalar(value) && scalarText(value).length < 200) {
      // A bare number or short phrase means nothing on its own: keep its name with it.
      addChunk({
        area: spec.area, origin: "data", title: humanise(exportName), breadcrumb: crumbs,
        text: `${humanise(exportName)}: ${scalarText(value)}`,
        source: { path: `src/${rel}`, export: exportName, pointer: `/${exportName}` },
        siteRoutes: routes, tags: { ...(spec.tags ?? {}) }, status: "approved",
      });
      continue;
    }
    emit(value, `/${exportName}`, crumbs, { ...(spec.tags ?? {}) }, ctx);
  }
  dataModules.push({ rel, exports: names });
}

/* ------------------------------------------------------------------ */
/* Pass 2: inline page copy from routes and components                  */
/* ------------------------------------------------------------------ */

const CLASS_CALLS = new Set(["cn", "cva", "clsx", "twMerge"]);
const NON_COPY_ATTRS = new Set(["className", "class", "to", "href", "src", "id", "key", "type", "variant", "size", "side", "align", "name", "htmlFor", "role", "rel", "target", "d", "viewBox", "fill", "stroke", "value", "defaultValue", "property", "charSet"]);
const UTILITY_WORDS = /^(flex|grid|block|inline|hidden|relative|absolute|fixed|sticky|border|italic|uppercase|lowercase|capitalize|underline|truncate|container|group|peer|rounded|shadow|transition|sr-only|static|contents|table|isolate)$/;

function looksLikeClasses(s: string): boolean {
  const tokens = s.trim().split(/\s+/);
  if (/[.?!,;]\s|[.?!]$/.test(s)) return false;
  const utility = tokens.filter((t) => /[-:\[\]\/]/.test(t) || UTILITY_WORDS.test(t)).length;
  return utility / tokens.length >= 0.6 && !tokens.some((t) => /^[A-Z][a-z]/.test(t));
}

function isCopy(s: string): boolean {
  const t = s.trim();
  if (t.length < 3 || !/[A-Za-z]{3}/.test(t)) return false;
  if (/^(https?:|\/|#|@\/|\.\.?\/)/.test(t) && !/\s/.test(t)) return false;
  if (!/\s/.test(t)) return /^[A-Z][a-z]+/.test(t) && t.length >= 4; // single capitalised words (labels)
  return !looksLikeClasses(t);
}

const ENTITIES: Record<string, string> = { amp: "&", nbsp: " ", lt: "<", gt: ">", quot: '"', apos: "'", rarr: "→", larr: "←", middot: "·", ndash: "–", mdash: "—", hellip: "…", rsquo: "’", lsquo: "‘", ldquo: "“", rdquo: "”" };
function decodeEntities(s: string): string {
  return s
    .replace(/&#(\d+);/g, (_m, n: string) => String.fromCodePoint(Number(n)))
    .replace(/&([a-z]+);/gi, (m, name: string) => ENTITIES[name.toLowerCase()] ?? m);
}

function copyFromFile(file: string): { section: string; lines: string[] }[] {
  const sf = ts.createSourceFile(file, readFileSync(file, "utf8"), ts.ScriptTarget.ES2022, true, ts.ScriptKind.TSX);
  const sections: { section: string; lines: string[] }[] = [];

  const collect = (node: ts.Node, lines: string[]) => {
    if (ts.isImportDeclaration(node) || ts.isTypeNode(node) || ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)) return;
    if (ts.isJsxAttribute(node) && NON_COPY_ATTRS.has(node.name.getText())) return;
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && CLASS_CALLS.has(node.expression.text)) return;
    if (ts.isCallExpression(node) && /createFileRoute|redirect|navigate|addEventListener|getItem|setItem/.test(node.expression.getText())) {
      // keep head() metadata (titles/descriptions) but drop route ids
      node.arguments.forEach((a) => !ts.isStringLiteralLike(a) && collect(a, lines));
      if (ts.isCallExpression(node.parent)) node.parent.arguments.forEach((a) => collect(a, lines));
      return;
    }
    if (ts.isPropertyAssignment(node) && /^(to|href|id|key|className|icon|tone|kind|variant|property|name|rel|type)$/.test(node.name.getText().replace(/["']/g, ""))) {
      if (ts.isStringLiteralLike(node.initializer)) {
        // `name: "description"` style meta keys are not copy; `id`/`to` are identifiers.
        return;
      }
    }
    if (ts.isBinaryExpression(node) && /===|!==|==|!=/.test(node.operatorToken.getText())) return;
    if (ts.isCaseClause(node)) {
      node.statements.forEach((s) => collect(s, lines));
      return;
    }
    if (ts.isElementAccessExpression(node)) return collect(node.expression, lines);
    if (ts.isJsxText(node)) {
      const t = decodeEntities(node.text).replace(/\s+/g, " ").trim();
      if (t && /[A-Za-z]{2}/.test(t)) lines.push(t);
      return;
    }
    if (ts.isStringLiteralLike(node)) {
      if (isCopy(node.text)) lines.push(node.text.replace(/\s+/g, " ").trim());
      return;
    }
    if (ts.isTemplateExpression(node)) {
      const text = [node.head.text, ...node.templateSpans.map((s) => s.literal.text)].join(" … ").replace(/\s+/g, " ").trim();
      if (isCopy(text.replace(/…/g, ""))) lines.push(text);
      node.templateSpans.forEach((s) => collect(s.expression, lines));
      return;
    }
    ts.forEachChild(node, (child) => collect(child, lines));
  };

  for (const stmt of sf.statements) {
    let section = "Page";
    if (ts.isFunctionDeclaration(stmt) && stmt.name) section = stmt.name.text;
    else if (ts.isVariableStatement(stmt)) section = stmt.declarationList.declarations.map((d) => d.name.getText()).join(", ");
    else if (ts.isImportDeclaration(stmt) || ts.isTypeAliasDeclaration(stmt) || ts.isInterfaceDeclaration(stmt)) continue;
    const lines: string[] = [];
    collect(stmt, lines);
    const unique = lines.filter((l, i) => lines.indexOf(l) === i);
    if (unique.length) sections.push({ section, lines: unique });
  }
  return sections;
}

const copyFiles: string[] = [];
for (const file of allSrc.filter((f) => /\.tsx$/.test(f) && (f.includes("/routes/") || f.includes("/components/")))) {
  const rel = relative(srcDir, file);
  const sections = copyFromFile(file);
  if (!sections.length) continue;
  copyFiles.push(rel);
  const route = routePath(file);
  const routes = route ? [route] : (routesFor.get(file) ?? []).slice(0, 8);
  const pageTitle = route ? `Page copy — ${route}` : `Component copy — ${basename(file).replace(/\.tsx$/, "")}`;
  // Pack the file's sections in order, each under its own heading, so short label groups
  // stay with the copy around them instead of becoming one-line chunks.
  let buffer: string[] = [];
  let names: string[] = [];
  let part = 0;
  const flush = () => {
    if (!buffer.length) return;
    addChunk({
      area: "site-copy",
      origin: "copy",
      title: pageTitle,
      breadcrumb: [pageTitle, ...(names.length === 1 ? names : [])],
      text: buffer.join("\n"),
      source: { path: `src/${rel}`, export: names.join(", "), pointer: `#${part++}` },
      siteRoutes: routes,
      tags: {},
      status: "approved",
    });
    buffer = [];
    names = [];
  };
  for (const { section, lines } of sections) {
    let headed = false;
    for (const line of lines) {
      if (buffer.length && buffer.join("\n").length + line.length + section.length + 4 > MAX_CHARS) {
        flush();
        headed = false;
      }
      if (!headed) {
        buffer.push(`[${section}]`);
        names.push(section);
        headed = true;
      }
      buffer.push(line);
    }
  }
  flush();
}

/* ------------------------------------------------------------------ */
/* Pass 3: design history                                               */
/* ------------------------------------------------------------------ */

const historyFiles: string[] = [];
const RETIRED_HISTORY = new Set(["workstream-centralisation-logic-page-2026-09-22.md"]);

function addMarkdown(file: string, relPath: string) {
  const text = readFileSync(file, "utf8");
  const heading = text.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? basename(file);
  const status = RETIRED_HISTORY.has(basename(file)) ? "retired" : "design-history";
  historyFiles.push(relPath);
  // Split on second-level headings, keeping each section intact where it fits.
  const sections = text.split(/\n(?=##\s)/);
  sections.forEach((section, i) => {
    const sub = section.match(/^##\s+(.+)$/m)?.[1]?.trim();
    const parts = section.length <= MAX_CHARS ? [section] : section.split(/\n(?=###\s)|\n\n(?=\S)/).reduce<string[]>((acc, p) => {
      const last = acc[acc.length - 1];
      if (last !== undefined && last.length + p.length + 2 <= MAX_CHARS) acc[acc.length - 1] = `${last}\n\n${p}`;
      else acc.push(p);
      return acc;
    }, []);
    parts.forEach((part, j) =>
      addChunk({
        area: "design-history",
        origin: "history",
        title: sub ? `${heading} › ${sub}` : heading,
        breadcrumb: sub ? ["Design history", heading, sub] : ["Design history", heading],
        text: part,
        source: { path: relPath, pointer: `#${i}.${j}` },
        siteRoutes: [],
        tags: {},
        status,
      }),
    );
  });
}

const planDir = join(snapshotDir, ".lovable", "plan");
if (existsSync(planDir)) for (const f of readdirSync(planDir).sort()) if (f.endsWith(".md")) addMarkdown(join(planDir, f), `.lovable/plan/${f}`);
if (existsSync(join(snapshotDir, "roadmap.md"))) addMarkdown(join(snapshotDir, "roadmap.md"), "roadmap.md");

/* ------------------------------------------------------------------ */
/* Ontology                                                             */
/* ------------------------------------------------------------------ */

const pick = (rel: string, name: string): unknown => {
  const value = loaded.get(rel)?.[name];
  if (value === undefined) throw new Error(`Ontology source missing: ${rel} ${name}`);
  return JSON.parse(JSON.stringify(value, (_k, v) => (isComponentLike(v) ? undefined : isElement(v) ? tidy(elementText(v)) : v)));
};

const spokeContent: Record<string, unknown> = {};
for (const [rel, mod] of loaded) {
  if (/-spoke\.ts$/.test(rel) && rel !== "lib/regional-spoke.ts" && mod.CONTENT) {
    const content = pick(rel, "CONTENT") as { id: string };
    spokeContent[content.id] = { ...content, source: `src/${rel}` };
  }
}

const ontology = {
  schemaVersion: 1,
  source: "Absa M&A Capability Hub (monyverse/deal)",
  archetypes: pick("lib/archetypes.ts", "ARCHETYPES"),
  workstreams: pick("lib/archetypes.ts", "ALL_WORKSTREAMS"),
  requirementLabels: pick("lib/archetypes.ts", "REQUIREMENT_LABEL"),
  artefacts: pick("lib/archetypes.ts", "ARTEFACTS"),
  lifecycles: pick("lib/lifecycles.ts", "LIFECYCLES"),
  operatingModel: {
    components: pick("lib/operating-model.ts", "COMPONENTS"),
    spokes: pick("lib/operating-model.ts", "SPOKES"),
    accountabilityMatrix: pick("lib/operating-model.ts", "ACCOUNTABILITY_MATRIX"),
    resourcing: pick("lib/operating-model.ts", "RESOURCING"),
    dealJourney: pick("lib/operating-model.ts", "DEAL_JOURNEY"),
  },
  centralHub: {
    responsibilities: pick("lib/central-hub-mandate.ts", "HUB_RESPONSIBILITY_ROWS"),
    mandate: pick("lib/central-hub-mandate.ts", "HUB_MANDATE_ROWS"),
    raciColumns: pick("lib/central-hub-mandate.ts", "HUB_RACI_COLUMNS"),
    raci: pick("lib/central-hub-mandate.ts", "HUB_RACI_FULL_ROWS"),
    decisionCategories: pick("lib/central-hub.ts", "DECISION_CATEGORIES"),
    guardrails: pick("lib/central-hub.ts", "CENTRAL_GUARDRAILS"),
  },
  functionalSpokes: spokeContent,
  regionalSpokes: {
    responsibilities: pick("lib/regional-spoke.ts", "REGIONAL_RESPONSIBILITIES"),
    mandate: pick("lib/regional-spoke.ts", "REGIONAL_MANDATE"),
    centralisationPrinciples: pick("lib/regional-spoke.ts", "CENTRALISATION_PRINCIPLES"),
    crossCuttingMinimum: pick("lib/regional-spoke.ts", "CROSS_CUTTING_MINIMUM"),
    workstreamMinimums: pick("lib/regional-spoke.ts", "WORKSTREAM_MINIMUMS"),
    maturityDimensions: pick("lib/regional-spoke.ts", "MATURITY_DIMENSIONS"),
  },
  governance: {
    forums: pick("lib/governance-forums.ts", "GOVERNANCE_FORUMS"),
    roles: pick("lib/operating-model.ts", "GOVERNANCE_ROLES"),
  },
  mobilisation: {
    roadmapStages: pick("lib/mobilisation.ts", "ROADMAP_STAGES"),
    buckets: pick("lib/mobilisation.ts", "BUCKETS"),
    dayDetails: pick("lib/mobilisation.ts", "DAY_DETAILS"),
  },
  experiencedCoach: {
    summary: pick("lib/experienced-coach.ts", "COACH_SUMMARY"),
    whenToInvolve: pick("lib/experienced-coach.ts", "COACH_WHEN_TO_INVOLVE"),
    notByDefault: pick("lib/experienced-coach.ts", "COACH_NOT_BY_DEFAULT"),
  },
  /**
   * The three-question test from the hub's design history. The page that showed it has been
   * retired from the live site, so the questions are carried here as a decision aid whose
   * answers must come from accountable people, never from the agent.
   */
  centralisationTest: {
    status: "retired-from-site",
    source: ".lovable/plan/workstream-centralisation-logic-page-2026-09-22.md",
    questions: [
      "Is centralisation of this workstream likely to be legally allowed?",
      "Is centralisation of this workstream within the spirit of the rules?",
      "Is there material execution benefit to centralising this workstream?",
    ],
    outcomeIfAnyNo: "Kept separate",
    outcomeIfAllYes: "Centralised",
  },
};

/* ------------------------------------------------------------------ */
/* Write                                                                */
/* ------------------------------------------------------------------ */

mkdirSync(outDir, { recursive: true });
const jsonl = chunks.map((c) => JSON.stringify(c)).join("\n") + "\n";
writeFileSync(join(outDir, "chunks.jsonl"), jsonl);
const ontologyJson = JSON.stringify(ontology, null, 2) + "\n";
writeFileSync(join(outDir, "ontology.json"), ontologyJson);

const snapshot = JSON.parse(readFileSync(join(root, "source", "snapshot.json"), "utf8")) as { snapshotHash: string; fileCount: number };
const byArea: Record<string, number> = {};
const byOrigin: Record<string, number> = {};
for (const c of chunks) {
  byArea[c.area] = (byArea[c.area] ?? 0) + 1;
  byOrigin[c.origin] = (byOrigin[c.origin] ?? 0) + 1;
}
const sha = (s: string) => createHash("sha256").update(s).digest("hex");
const manifest = {
  corpusVersion: sha(jsonl).slice(0, 12),
  snapshotHash: snapshot.snapshotHash,
  snapshotFiles: snapshot.fileCount,
  chunkCount: chunks.length,
  characters: chunks.reduce((n, c) => n + c.text.length, 0),
  byOrigin,
  byArea: Object.fromEntries(Object.entries(byArea).sort()),
  hashes: { "chunks.jsonl": sha(jsonl), "ontology.json": sha(ontologyJson) },
  dataModules,
  copyFiles,
  historyFiles,
  skipped: {
    ...Object.fromEntries(Object.entries(SKIPPED).map(([k, v]) => [`src/${k}`, v])),
    "src/lib/learning/*-progress.ts": "browser progress-tracking hooks, no content",
    "src/components/ui/*": "generic UI primitives, no content",
    "src/routeTree.gen.ts": "generated router tree",
  },
};
writeFileSync(join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");

console.log(
  `Corpus ${manifest.corpusVersion}: ${chunks.length} chunks, ${manifest.characters.toLocaleString()} characters\n` +
    `  data ${byOrigin.data ?? 0} (${dataModules.length} modules) · copy ${byOrigin.copy ?? 0} (${copyFiles.length} files) · history ${byOrigin.history ?? 0} (${historyFiles.length} files)`,
);
