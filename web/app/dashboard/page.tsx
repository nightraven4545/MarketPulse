"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartCard } from "@/components/chart-card";
import { PipelineFlow } from "@/components/pipeline-flow";
import { EngineFlow } from "@/components/engine-flow";
import {
  FunnelChartView,
  MarketRadarChart,
  MarketScoreChart,
  PositioningChart,
  RoadmapChart,
  SplitDonutChart,
  TierPricingChart,
  WtpChart,
} from "@/components/charts/dashboard-charts";
import { KPIS, COMMERCIAL_ARCHITECTURE } from "@/lib/data/roadmap";
import { COMPETITORS } from "@/lib/data/competitors";
import { FEATURE_TIERING, LOCALIZATION_MATRIX } from "@/lib/data/localization";
import { TIERS } from "@/lib/data/pricing";

export default function DashboardPage() {
  return (
    <div>
      <header className="bg-gradient-to-br from-[#162a4d] to-[#1f3864] text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <Badge className="border-white/20 bg-white/10 text-[#9ec7e8]">MarketPulse · Solution Visualization</Badge>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Ai Palette — Expansion &amp; Monetization Dashboard
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-[#cdd9e8]">
            Market sequencing, the localize-vs-standardize split, tiering, hybrid pricing,
            go-to-market, and the repeatable market-entry engine.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {KPIS.map((k) => (
            <div key={k.label} className="rounded-xl border border-border bg-card px-4 py-3">
              <div className="text-xl font-bold text-primary">{k.value}</div>
              <div className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{k.label}</div>
            </div>
          ))}
        </div>

        <Tabs defaultValue="overview" className="mt-8">
          <TabsList className="flex-wrap">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="market">Market &amp; Competition</TabsTrigger>
            <TabsTrigger value="product">Localization &amp; Tiers</TabsTrigger>
            <TabsTrigger value="money">Pricing &amp; GTM</TabsTrigger>
            <TabsTrigger value="engine">Sequencing &amp; Engine</TabsTrigger>
          </TabsList>

          {/* OVERVIEW */}
          <TabsContent value="overview" className="mt-6 space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <ChartCard title="Market attractiveness (weighted score)" caption="Weighted rubric, 0–5. Color = entry wave.">
                <MarketScoreChart />
              </ChartCard>
              <ChartCard title="TAM → SAM → SOM" caption="Order-of-magnitude funnel ($).">
                <FunnelChartView />
              </ChartCard>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <ChartCard title="Localize vs. standardize" caption="~80% shared engine, ~20% localizable edge.">
                <SplitDonutChart />
              </ChartCard>
              <ChartCard title="Tier subscription (US benchmark, $)" caption="Anchored on subscription; usage &amp; seats expand.">
                <TierPricingChart />
              </ChartCard>
            </div>
            <ChartCard title="3-wave entry roadmap" caption="Each wave reuses the prior wave's assets — marginal cost of entry falls." height={260}>
              <RoadmapChart />
            </ChartCard>
          </TabsContent>

          {/* MARKET & COMPETITION */}
          <TabsContent value="market" className="mt-6 space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <ChartCard title="Market attractiveness (weighted score)" caption="Weighted rubric, 0–5. Color = entry wave.">
                <MarketScoreChart />
              </ChartCard>
              <ChartCard title="Top-3 markets — criteria profile" caption="Where each market wins vs. loses (1–5 per criterion).">
                <MarketRadarChart />
              </ChartCard>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <ChartCard title="TAM → SAM → SOM" caption="Order-of-magnitude funnel ($).">
                <FunnelChartView />
              </ChartCard>
              <ChartCard title="Competitive positioning — the white space" caption="Workflow breadth × geo/localization depth. Bubble = relative breadth." height={340}>
                <PositioningChart />
              </ChartCard>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Why now — the category is consolidating</CardTitle>
                <CardDescription>
                  Mintel acquired Black Swan Data (Jun 2025), absorbing the strongest pure-play
                  predictor into a legacy incumbent — vacating the nimble, end-to-end, multi-market
                  NPD position.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Player</TableHead>
                      <TableHead>Core focus</TableHead>
                      <TableHead>Geo strength</TableHead>
                      <TableHead>Position vs. Ai Palette</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {COMPETITORS.map((c) => (
                      <TableRow key={c.name}>
                        <TableCell className="font-medium">{c.name}</TableCell>
                        <TableCell className="text-muted-foreground">{c.coreFocus}</TableCell>
                        <TableCell className="text-muted-foreground">{c.geoStrength}</TableCell>
                        <TableCell className="text-muted-foreground">{c.positioning}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* LOCALIZATION & TIERS */}
          <TabsContent value="product" className="mt-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Solution architecture — the pipeline</CardTitle>
                <CardDescription>
                  The intelligence is universal; only the two ends are local. Localization ships
                  as configurable Market Packs, never code forks.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PipelineFlow />
              </CardContent>
            </Card>
            <ChartCard title="Localize vs. standardize (effort split)" caption="~80% shared engine, ~20% localizable edge.">
              <SplitDonutChart />
            </ChartCard>
            <Card>
              <CardHeader>
                <CardTitle>Feature tiering by enterprise maturity</CardTitle>
                <CardDescription>One product, gated by entitlements.</CardDescription>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Capability</TableHead>
                      <TableHead>Essentials</TableHead>
                      <TableHead>Growth</TableHead>
                      <TableHead>Enterprise</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {FEATURE_TIERING.map((f) => (
                      <TableRow key={f.feature}>
                        <TableCell className="font-medium">{f.feature}</TableCell>
                        <TableCell className="text-muted-foreground">{f.essentials}</TableCell>
                        <TableCell className="text-muted-foreground">{f.growth}</TableCell>
                        <TableCell className="text-muted-foreground">{f.enterprise}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Localize vs. standardize — full matrix</CardTitle>
                <CardDescription>Every capability, scored by value driver and localization cost.</CardDescription>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Capability</TableHead>
                      <TableHead>Layer</TableHead>
                      <TableHead>Verdict</TableHead>
                      <TableHead>Localization cost</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {LOCALIZATION_MATRIX.map((r) => (
                      <TableRow key={r.capability}>
                        <TableCell className="font-medium">{r.capability}</TableCell>
                        <TableCell className="text-muted-foreground">{r.layer}</TableCell>
                        <TableCell className="text-muted-foreground">{r.verdict}</TableCell>
                        <TableCell className="text-muted-foreground">{r.localizationCost}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* PRICING & GTM */}
          <TabsContent value="money" className="mt-6 space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <ChartCard title="Tier subscription (US benchmark, $)" caption="Anchored on subscription; usage &amp; seats expand. Ratio ~1 : 4 : 12.">
                <TierPricingChart />
              </ChartCard>
              <ChartCard title="Regional willingness-to-pay (price index)" caption="Same product, repriced — price localization, not product localization.">
                <WtpChart />
              </ChartCard>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Motion follows ACV</CardTitle>
                <CardDescription>Spend human service only where ACV pays for it; automate below.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tier</TableHead>
                      <TableHead>ACV</TableHead>
                      <TableHead>Buying</TableHead>
                      <TableHead>Motion</TableHead>
                      <TableHead>Cost-to-serve</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {TIERS.map((t) => (
                      <TableRow key={t.tier}>
                        <TableCell className="font-medium">{t.tier}</TableCell>
                        <TableCell className="text-muted-foreground">{t.targetAcv}</TableCell>
                        <TableCell className="text-muted-foreground">{t.buying}</TableCell>
                        <TableCell className="text-muted-foreground">{t.motion}</TableCell>
                        <TableCell className="text-muted-foreground">{t.costToServe}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEQUENCING & ENGINE */}
          <TabsContent value="engine" className="mt-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Strategy as a workflow</CardTitle>
                <CardDescription>Same logic every time; only the inputs change. Step 3 is deterministic rules, not opinions.</CardDescription>
              </CardHeader>
              <CardContent>
                <EngineFlow />
                <p className="mt-3 text-xs italic text-muted-foreground">
                  Decision rule example: regulated · high-density · high-WTP → full pack + residency
                  + integrations → Enterprise · 0.85–1.0× → sales-led.
                </p>
              </CardContent>
            </Card>
            <ChartCard title="3-wave entry roadmap" caption="Each wave reuses the prior wave's assets, so marginal cost of entry falls." height={280}>
              <RoadmapChart />
            </ChartCard>
            <Card>
              <CardHeader>
                <CardTitle>Commercial architecture — one-look map</CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Market</TableHead>
                      <TableHead>Wave</TableHead>
                      <TableHead>Lead tier</TableHead>
                      <TableHead>Localization depth</TableHead>
                      <TableHead>Price idx</TableHead>
                      <TableHead>Lead ACV*</TableHead>
                      <TableHead>Motion</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {COMMERCIAL_ARCHITECTURE.map((r) => (
                      <TableRow key={r.market}>
                        <TableCell className="font-medium">{r.market}</TableCell>
                        <TableCell>
                          <Badge variant={r.wave === "Later" ? "outline" : "secondary"}>{r.wave}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{r.leadTier}</TableCell>
                        <TableCell className="text-muted-foreground">{r.localizationDepth}</TableCell>
                        <TableCell className="text-muted-foreground">{r.priceIdx.toFixed(2)}</TableCell>
                        <TableCell className="text-muted-foreground">{r.leadAcv}</TableCell>
                        <TableCell className="text-muted-foreground">{r.motion}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <p className="mt-3 text-xs italic text-muted-foreground">
                  *Lead ACV = US tier benchmark × regional price index. Compliance built once (US)
                  is reused (EU); the partner model built for Japan is reused (MEA).
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
