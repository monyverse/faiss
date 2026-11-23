/**
 * Coverage check: every piece of wording exported by a content module must be present,
 * verbatim, in the corpus. Fails the build when anything is missing, so a change to the
 * extractor (or to the hub) can never silently drop approved methodology.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const root = resolve(import.meta.dir, "..");
const srcDir = join(root, "source", "deal", "src");
const corpusDir = join(root, "corpus");

type Chunk = { text: string; origin: string; source: { path: string } };
const chunks = readFileSync(join(corpusDir, "chunks.jsonl"), "utf8")
  .split("\n")
  .filter(Boolean)
  .map((l) => JSON.parse(l) as Chunk);
const manifest = JSON.parse(readFileSync(join(corpusDir, "manifest.json"), "utf8")) as {
  dataModules: { rel: string; exports: string[] }[];
  copyFiles: string[];
  skipped: Record<string, string>;
};

const norm = (s: string) => s.replace(/\s+/g, " ").trim();
const REACT_ELEMENT = new Set([Symbol.for("react.element"), Symbol.for("react.transitional.element")]);

function strings(v: unknown, out: string[] = []): string[] {
  if (typeof v === "string") out.push(v);
  else if (Array.isArray(v)) v.forEach((x) => strings(x, out));
  else if (typeof v === "object" && v !== null) {
    if (REACT_ELEMENT.has((v as { $$typeof?: symbol }).$$typeof as symbol)) return out; // checked via rendered text
    if (typeof (v as { $$typeof?: unknown }).$$typeof === "symbol") return out;
    Object.values(v).forEach((x) => strings(x, out));
  }
  return out;
}

let checked = 0;
const missing: string[] = [];
for (const { rel } of manifest.dataModules) {
  const haystack = norm(
    chunks
      .filter((c) => c.source.path === `src/${rel}`)
      .map((c) => c.text)
      .join(" "),
  );
  const mod = (await import(join(srcDir, rel))) as Record<string, unknown>;
  for (const [name, value] of Object.entries(mod)) {
    if (typeof value === "function") continue;
    for (const s of strings(value)) {
      const needle = norm(s);
      if (!needle) continue;
      checked++;
      // Long strings are split on sentence boundaries; check each sentence.
      const parts = needle.length > 1500 ? needle.split(/(?<=[.!?])\s+/) : [needle];
      if (!parts.every((p) => haystack.includes(p))) missing.push(`${rel} ${name}: ${needle.slice(0, 90)}`);
    }
  }
}

// Every content-bearing source file must be either ingested or explicitly skipped with a reason.
function list(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? list(p) : [p];
  });
}
const accounted = new Set([
  ...manifest.dataModules.map((m) => `src/${m.rel}`),
  ...manifest.copyFiles.map((f) => `src/${f}`),
]);
const skipPatterns = Object.keys(manifest.skipped).map(
  (k) => new RegExp("^" + k.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*") + "$"),
);
const unaccounted = list(srcDir)
  .filter((f) => /\.tsx?$/.test(f))
  .map((f) => `src/${relative(srcDir, f)}`)
  .filter((f) => !accounted.has(f) && !skipPatterns.some((re) => re.test(f)));

// Files with no natural-language copy at all (pure layout wrappers, redirects) are reported, not failed.
const wordless = unaccounted.filter((f) => {
  const text = readFileSync(join(root, "source", "deal", f), "utf8");
  return !/>[^<>{}]*[A-Za-z]{4,}[^<>{}]*</.test(text);
});
const unexplained = unaccounted.filter((f) => !wordless.includes(f));

console.log(`Checked ${checked.toLocaleString()} strings across ${manifest.dataModules.length} content modules.`);
if (wordless.length) console.log(`No visible copy (layout/redirect only): ${wordless.join(", ")}`);
if (missing.length || unexplained.length) {
  if (missing.length) console.error(`MISSING from corpus (${missing.length}):\n  ${missing.slice(0, 25).join("\n  ")}`);
  if (unexplained.length) console.error(`Source files neither ingested nor skipped:\n  ${unexplained.join("\n  ")}`);
  process.exit(1);
}
if (!existsSync(join(corpusDir, "ontology.json"))) {
  console.error("ontology.json missing");
  process.exit(1);
}
console.log("Coverage OK: all exported wording is present in the corpus; every source file is accounted for.");
