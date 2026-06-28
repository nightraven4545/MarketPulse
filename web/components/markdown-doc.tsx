"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const REPO_BLOB = "https://github.com/nightraven4545/MarketPulse/blob/main/";
const REPO_RAW = "https://raw.githubusercontent.com/nightraven4545/MarketPulse/main/";

function rewriteHref(href: string): { href: string; external: boolean } {
  if (!href) return { href: "#", external: false };
  if (/^(https?:|mailto:|#)/.test(href)) return { href, external: href.startsWith("http") };

  // sibling strategy doc, e.g. "02-assumptions-and-data-sources.md"
  if (href.endsWith(".md")) {
    const base = href.split("/").pop()!.replace(/\.md$/, "");
    return { href: `/strategy/${base}`, external: false };
  }
  // interactive sections that exist on the site
  if (/^\.\.\/arr-model\/?$/.test(href)) return { href: "/arr-model", external: false };
  if (/^\.\.\/decision-science\/?$/.test(href)) return { href: "/decision-science", external: false };
  if (href.startsWith("../assets/")) return { href: "/" + href.replace("../", ""), external: false };
  // everything else in the repo (frameworks/, workflow/, deliverables/, etc.) → GitHub source
  const clean = href.replace(/^\.\//, "").replace(/^\.\.\//, "");
  return { href: REPO_BLOB + clean, external: true };
}

function rewriteSrc(src: string): string {
  if (/^https?:/.test(src)) return src;
  if (src.startsWith("../assets/")) return "/" + src.replace("../", "");
  return REPO_RAW + src.replace(/^\.\//, "").replace(/^\.\.\//, "");
}

export function MarkdownDoc({ content }: { content: string }) {
  return (
    <article className="prose prose-sm max-w-none prose-headings:scroll-mt-20 prose-headings:font-semibold prose-headings:text-primary prose-h1:text-2xl prose-h1:tracking-tight prose-a:text-[#2e5496] prose-a:no-underline hover:prose-a:underline prose-th:bg-secondary prose-img:rounded-lg prose-img:border prose-img:border-border">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a({ href, children, ...props }) {
            const r = rewriteHref(href ?? "");
            if (r.external) {
              return (
                <a href={r.href} target="_blank" rel="noopener noreferrer" {...props}>
                  {children}
                </a>
              );
            }
            return (
              <Link href={r.href} {...props}>
                {children}
              </Link>
            );
          },
          // eslint-disable-next-line @next/next/no-img-element
          img({ src, alt }) {
            const s = typeof src === "string" ? rewriteSrc(src) : "";
            // eslint-disable-next-line @next/next/no-img-element
            return <img src={s} alt={alt ?? ""} loading="lazy" />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
