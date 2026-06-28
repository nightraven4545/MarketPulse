export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
          <strong className="font-semibold">Disclaimer —</strong> Ai Palette is a private
          company with no public financials. Every figure on this site is an illustrative,
          benchmark-anchored estimate built for decision logic, not a company-reported number.
          See the{" "}
          <a href="/strategy/02-assumptions-and-data-sources" className="underline underline-offset-2">
            assumptions &amp; data-sources audit trail
          </a>
          .
        </div>
        <div className="mt-6 flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>MarketPulse · Ai Palette multi-market expansion &amp; monetization strategy.</p>
          <a
            href="https://github.com/nightraven4545/MarketPulse"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground/70 hover:text-primary"
          >
            View source on GitHub ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
