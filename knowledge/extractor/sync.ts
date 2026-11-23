/**
 * Copies the content-bearing parts of the Absa M&A Capability Hub repository into
 * knowledge/source/deal and records a sha256 manifest, so the corpus is always built
 * from a pinned, reviewable snapshot rather than from a moving working copy.
 *
 * Usage: DEAL_REPO=/path/to/deal bun run extractor/sync.ts
 */
import { createHash } from "node:crypto";
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const here = resolve(import.meta.dir, "..");
const dealRepo = resolve(process.env.DEAL_REPO ?? join(here, "..", "..", "deal"));
const target = join(here, "source", "deal");

/** Everything a reader of the site can see comes from these paths. */
const INCLUDE = ["src", ".lovable/plan", "roadmap.md", "README.md", "AGENTS.md"];
const SKIP_DIRS = new Set(["node_modules", ".git", "dist", ".output"]);
const SKIP_FILES = new Set([".DS_Store"]);

if (!existsSync(join(dealRepo, "src", "lib"))) {
  console.error(`Deal repository not found at ${dealRepo}. Set DEAL_REPO.`);
  process.exit(1);
}

rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });
for (const entry of INCLUDE) {
  const from = join(dealRepo, entry);
  if (!existsSync(from)) continue;
  cpSync(from, join(target, entry), {
    recursive: true,
    filter: (src) => {
      const name = src.split("/").pop() ?? "";
      return !SKIP_DIRS.has(name) && !SKIP_FILES.has(name);
    },
  });
}

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir).sort()) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

const files = walk(target).map((p) => {
  const bytes = readFileSync(p);
  return { path: relative(target, p), bytes: bytes.length, sha256: createHash("sha256").update(bytes).digest("hex") };
});
const snapshotHash = createHash("sha256")
  .update(files.map((f) => `${f.path}:${f.sha256}`).join("\n"))
  .digest("hex");

writeFileSync(
  join(here, "source", "snapshot.json"),
  JSON.stringify({ origin: "monyverse/deal (Absa M&A Capability Hub)", snapshotHash, fileCount: files.length, files }, null, 2) + "\n",
);
console.log(`Synced ${files.length} files from ${dealRepo}\nsnapshot ${snapshotHash}`);
