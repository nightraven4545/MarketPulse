"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { DocMeta } from "@/lib/docs";

export function StrategyToc({ docs }: { docs: DocMeta[] }) {
  const pathname = usePathname();
  return (
    <nav className="space-y-0.5">
      {docs.map((d) => {
        const href = `/strategy/${d.slug}`;
        const active = pathname === href;
        return (
          <Link
            key={d.slug}
            href={href}
            className={cn(
              "flex gap-2 rounded-md px-2.5 py-1.5 text-[13px] leading-snug transition-colors",
              active ? "bg-secondary font-medium text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <span className="shrink-0 font-mono text-xs opacity-60">{d.num}</span>
            <span className="line-clamp-2">{d.title.replace(/^\d+\s*[—-]\s*/, "")}</span>
          </Link>
        );
      })}
    </nav>
  );
}
