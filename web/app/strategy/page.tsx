import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getAllDocsMeta } from "@/lib/docs";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Strategy — MarketPulse",
  description: "The full written case: context, assumptions, localization, tiering, pricing, GTM, sequencing, and methodology.",
};

export default function StrategyIndexPage() {
  const docs = getAllDocsMeta();
  return (
    <div>
      <header className="bg-gradient-to-br from-[#162a4d] to-[#1f3864] text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <Badge className="border-white/20 bg-white/10 text-[#9ec7e8]">Strategy</Badge>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">The written case</h1>
          <p className="mt-2 max-w-2xl text-sm text-[#cdd9e8]">
            Eleven chapters — from business context and the source-traceable assumptions to
            localization, tiering, pricing, GTM, market sequencing, and the decision-science core.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-3 sm:grid-cols-2">
          {docs.map((d) => (
            <Link
              key={d.slug}
              href={`/strategy/${d.slug}`}
              className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-sm"
            >
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary font-mono text-sm font-bold text-primary">
                {d.num}
              </span>
              <span className="flex-1">
                <span className="font-medium text-foreground group-hover:text-primary">
                  {d.title.replace(/^\d+\s*[—-]\s*/, "")}
                </span>
              </span>
              <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
