import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownDoc } from "@/components/markdown-doc";
import { StrategyToc } from "@/components/strategy-toc";
import { getAllDocsMeta, getDoc, getDocSlugs } from "@/lib/docs";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function generateStaticParams() {
  return getDocSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDoc(slug);
  return { title: doc ? `${doc.meta.title} — MarketPulse` : "Strategy — MarketPulse" };
}

export default async function StrategyDocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();

  const all = getAllDocsMeta();
  const idx = all.findIndex((d) => d.slug === slug);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:self-start lg:overflow-y-auto">
          <p className="mb-2 px-2.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Strategy chapters
          </p>
          <StrategyToc docs={all} />
        </aside>

        <div className="min-w-0">
          <Link href="/strategy" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            <ChevronLeft className="size-4" /> All chapters
          </Link>
          <MarkdownDoc content={doc.content} />

          <div className="mt-12 grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
            {prev ? (
              <Link href={`/strategy/${prev.slug}`} className="group flex items-center gap-2 rounded-lg border border-border p-3 text-sm hover:border-primary/30">
                <ChevronLeft className="size-4 shrink-0 text-muted-foreground" />
                <span>
                  <span className="block text-[11px] text-muted-foreground">Previous</span>
                  <span className="font-medium group-hover:text-primary">{prev.title.replace(/^\d+\s*[—-]\s*/, "")}</span>
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={`/strategy/${next.slug}`} className="group flex items-center justify-end gap-2 rounded-lg border border-border p-3 text-right text-sm hover:border-primary/30 sm:col-start-2">
                <span>
                  <span className="block text-[11px] text-muted-foreground">Next</span>
                  <span className="font-medium group-hover:text-primary">{next.title.replace(/^\d+\s*[—-]\s*/, "")}</span>
                </span>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
