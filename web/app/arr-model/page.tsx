"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartCard } from "@/components/chart-card";
import { LabeledSlider } from "@/components/labeled-slider";
import { ArrByMarketChart, BlendedAcvChart, NewVsExpansionChart, TornadoChart, Y5MixDonut } from "@/components/charts/arr-charts";
import {
  ARR_MARKET_KEYS,
  ARR_YEARS,
  computeArr,
  computeTornado,
  DEFAULT_ASSUMPTIONS,
  totalAtYear,
  type ArrAssumptions,
  type MarketKey,
} from "@/lib/calc/arr";
import { RotateCcw, Download } from "lucide-react";

const fmtUsd = (v: number) => `$${Math.round(v).toLocaleString("en-US")}`;
const fmtPct = (v: number) => `${v.toFixed(1)}%`;

function downloadCsv(rows: ReturnType<typeof computeArr>) {
  const header = ["Market", "Wave", "Year", "New logos", "New ARR", "Expansion ARR", "End ARR", "Blended ACV"];
  const lines = rows.map((r) =>
    [r.market, r.wave, `Y${r.year}`, Math.round(r.newLogos), Math.round(r.newArr), Math.round(r.expansionArr), Math.round(r.endArr), Math.round(r.blendedAcv)].join(",")
  );
  const csv = [header.join(","), ...lines].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "marketpulse_arr_output.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export default function ArrModelPage() {
  const [a, setA] = useState<ArrAssumptions>(DEFAULT_ASSUMPTIONS);

  const rows = useMemo(() => computeArr(a), [a]);
  const tornado = useMemo(() => computeTornado(a), [a]);
  const y5 = totalAtYear(rows, ARR_YEARS);
  const y3 = totalAtYear(rows, 3);
  const new3 = rows.filter((r) => r.year <= 3).reduce((s, r) => s + r.newArr, 0);
  const logos5 = rows.reduce((s, r) => s + r.newLogos, 0);

  const setAcv = (key: "E" | "G" | "En", v: number) => setA((p) => ({ ...p, acv: { ...p.acv, [key]: v } }));
  const setAccts = (key: MarketKey, v: number) => setA((p) => ({ ...p, accts: { ...p.accts, [key]: v } }));

  return (
    <div>
      <header className="bg-gradient-to-br from-[#162a4d] to-[#1f3864] text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <Badge className="border-white/20 bg-white/10 text-[#9ec7e8]">Interactive Model</Badge>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Bottoms-up ARR Model</h1>
          <p className="mt-2 max-w-2xl text-sm text-[#cdd9e8]">
            Ai Palette multi-market expansion — illustrative, benchmark-anchored. Change any
            assumption below and every chart recomputes live.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          {/* Assumptions panel */}
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Global assumptions
                  <Button variant="ghost" size="icon-sm" onClick={() => setA(DEFAULT_ASSUMPTIONS)} title="Reset to defaults">
                    <RotateCcw className="size-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <LabeledSlider label="Essentials ACV (US)" value={a.acv.E} onChange={(v) => setAcv("E", v)} min={2000} max={30000} step={500} format={fmtUsd} />
                <LabeledSlider label="Growth ACV (US)" value={a.acv.G} onChange={(v) => setAcv("G", v)} min={10000} max={100000} step={1000} format={fmtUsd} />
                <LabeledSlider label="Enterprise ACV (US)" value={a.acv.En} onChange={(v) => setAcv("En", v)} min={40000} max={300000} step={5000} format={fmtUsd} />
                <div className="h-px bg-border" />
                <LabeledSlider
                  label="Annual capture rate"
                  value={a.capture * 100}
                  onChange={(v) => setA((p) => ({ ...p, capture: v / 100 }))}
                  min={1}
                  max={12}
                  step={0.5}
                  format={fmtPct}
                />
                <LabeledSlider
                  label="Entry-year ramp"
                  value={a.ramp * 100}
                  onChange={(v) => setA((p) => ({ ...p, ramp: v / 100 }))}
                  min={10}
                  max={100}
                  step={10}
                  format={fmtPct}
                />
                <LabeledSlider
                  label="Net revenue retention"
                  value={a.nrr * 100}
                  onChange={(v) => setA((p) => ({ ...p, nrr: v / 100 }))}
                  min={90}
                  max={130}
                  step={1}
                  format={fmtPct}
                />
                <div className="h-px bg-border" />
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Per-market addressable accounts
                </p>
                {ARR_MARKET_KEYS.map((m) => (
                  <LabeledSlider
                    key={m}
                    label={m}
                    value={a.accts[m]}
                    onChange={(v) => setAccts(m, v)}
                    min={50}
                    max={2000}
                    step={50}
                    format={(v) => v.toLocaleString("en-US")}
                  />
                ))}
              </CardContent>
            </Card>
          </aside>

          {/* Main content */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Card>
                <CardContent className="pt-4">
                  <div className="text-xl font-bold text-primary">${(y5 / 1e6).toFixed(1)}M</div>
                  <div className="mt-1 text-[11px] text-muted-foreground">Year-5 total ARR</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="text-xl font-bold text-primary">${(y3 / 1e6).toFixed(1)}M</div>
                  <div className="mt-1 text-[11px] text-muted-foreground">Year-3 total ARR</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="text-xl font-bold text-primary">${(new3 / 1e6).toFixed(1)}M</div>
                  <div className="mt-1 text-[11px] text-muted-foreground">3-yr cumulative new ARR</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="text-xl font-bold text-primary">{Math.round(logos5).toLocaleString("en-US")}</div>
                  <div className="mt-1 text-[11px] text-muted-foreground">Cumulative new logos (5y)</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 lg:grid-cols-[3fr_2fr]">
              <ChartCard title="ARR build by market" height={340}>
                <ArrByMarketChart rows={rows} />
              </ChartCard>
              <ChartCard title="New vs. expansion ARR" height={340}>
                <NewVsExpansionChart rows={rows} />
              </ChartCard>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ChartCard title="Year-5 ARR mix by market">
                <Y5MixDonut rows={rows} />
              </ChartCard>
              <ChartCard title="Blended ACV by market">
                <BlendedAcvChart rows={rows} />
              </ChartCard>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Detail table
                  <Button variant="outline" size="sm" onClick={() => downloadCsv(rows)}>
                    <Download className="size-4" /> Download CSV
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Market</TableHead>
                      <TableHead>Wave</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>New logos</TableHead>
                      <TableHead>New ARR</TableHead>
                      <TableHead>Expansion ARR</TableHead>
                      <TableHead>End ARR</TableHead>
                      <TableHead>Blended ACV</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((r) => (
                      <TableRow key={`${r.market}-${r.year}`}>
                        <TableCell className="font-medium">{r.market}</TableCell>
                        <TableCell className="text-muted-foreground">{r.wave}</TableCell>
                        <TableCell className="text-muted-foreground">Y{r.year}</TableCell>
                        <TableCell className="text-muted-foreground">{Math.round(r.newLogos).toLocaleString("en-US")}</TableCell>
                        <TableCell className="text-muted-foreground">{fmtUsd(r.newArr)}</TableCell>
                        <TableCell className="text-muted-foreground">{fmtUsd(r.expansionArr)}</TableCell>
                        <TableCell className="font-medium">{fmtUsd(r.endArr)}</TableCell>
                        <TableCell className="text-muted-foreground">{fmtUsd(r.blendedAcv)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sensitivity — what moves Year-5 ARR most</CardTitle>
                <CardDescription>±25% swing on each driver from its current value. Longest bar = biggest lever.</CardDescription>
              </CardHeader>
              <CardContent>
                <div style={{ height: 320 }}>
                  <TornadoChart drivers={tornado} base={y5 / 1e6} />
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  Capture rate (GTM efficiency) and NRR (retention) typically dominate — which is
                  why the strategy front-loads cheap reference logos and expansion levers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
