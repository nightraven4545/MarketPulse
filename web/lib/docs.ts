// Server-side loader for the strategy docs (web/content/docs/*.md, copied from the repo's docs/01-11).
import fs from "node:fs";
import path from "node:path";

// Resolve the docs dir relative to whatever cwd Next runs under. Normally cwd is the project
// root (web/), but when the dev server is launched with `next dev web` from the repo root, cwd is
// the repo root — so try the web/ subpath as a fallback. Vercel (Root Directory = web) hits the
// first candidate.
function resolveDocsDir(): string {
  const candidates = [
    path.join(process.cwd(), "content", "docs"),
    path.join(process.cwd(), "web", "content", "docs"),
  ];
  return candidates.find((p) => fs.existsSync(p)) ?? candidates[0];
}

const DOCS_DIR = resolveDocsDir();

export type DocMeta = { slug: string; order: number; num: string; title: string };

function deriveTitle(raw: string, slug: string): string {
  const h1 = raw.split("\n").find((l) => l.startsWith("# "));
  if (h1) return h1.replace(/^#\s+/, "").trim();
  return slug;
}

export function getDocSlugs(): string[] {
  return fs
    .readdirSync(DOCS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllDocsMeta(): DocMeta[] {
  return getDocSlugs()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(DOCS_DIR, `${slug}.md`), "utf8");
      const m = slug.match(/^(\d+)/);
      return {
        slug,
        order: m ? parseInt(m[1], 10) : 999,
        num: m ? m[1] : "",
        title: deriveTitle(raw, slug),
      };
    })
    .sort((a, b) => a.order - b.order);
}

export function getDoc(slug: string): { meta: DocMeta; content: string } | null {
  const file = path.join(DOCS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const m = slug.match(/^(\d+)/);
  return {
    meta: { slug, order: m ? parseInt(m[1], 10) : 999, num: m ? m[1] : "", title: deriveTitle(raw, slug) },
    content: raw,
  };
}
