"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

const LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/arr-model", label: "ARR Model" },
  { href: "/decision-science", label: "Decision Science" },
  { href: "/strategy", label: "Strategy" },
  { href: "/deliverables", label: "Deliverables" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2 font-semibold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent" />
          MarketPulse
        </Link>
        <nav className="flex flex-1 items-center gap-1 overflow-x-auto text-sm">
          {LINKS.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "shrink-0 rounded-md px-3 py-1.5 font-medium text-foreground/65 transition-colors hover:bg-muted hover:text-foreground",
                  active && "bg-secondary text-primary"
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <a
          href="https://github.com/nightraven4545/MarketPulse"
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm font-medium text-foreground/70 transition-colors hover:border-primary/40 hover:text-primary"
        >
          <span className="hidden sm:inline">GitHub</span>
          <ExternalLink className="size-3.5" />
        </a>
      </div>
    </header>
  );
}
