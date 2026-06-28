"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartCard } from "@/components/chart-card";
import { LabeledSlider } from "@/components/labeled-slider";
import { DecisionPlotChart, MdpSequenceChart, ShapWaterfallChart } from "@/components/charts/decision-charts";
import { solveMdp } from "@/lib/calc/mdp";
import { computeShap } from "@/lib/calc/shap";
import { MARKET_SCORES, SCORE_FEATURES, SCORE_WEIGHTS } from "@/lib/data/markets";

export default function DecisionSciencePage() {
  const [coldPenalty, setColdPenalty] = useState(0.4);
  const [weights, setWeights] = useState<number[]>([...SCORE_WEIGHTS]);
  const [selectedMarket, setSelectedMarket] = useState("SEA");

  const mdp = useMemo(() => solveMdp(coldPenalty), [coldPenalty]);
  const naiveMdp = useMemo(() => solveMdp(1.0), []);
  const shapResults = useMemo(() => computeShap(weights), [weights]);
  const ranked = useMemo(() => [...shapResults].sort((a, b) => b.score - a.score), [shapResults]);
  const selectedResult = shapResults.find((r) => r.market === selectedMarket) ?? shapResults[0];

  return (
    <div>
      <header className="bg-gradient-to-br from-[#162a4d] to-[#1f3864] text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <Badge className="border-white/20 bg-white/10 text-[#9ec7e8]">Decision Science</Badge>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">MDP Sequencing &amp; SHAP Explainability</h1>
          <p className="mt-2 max-w-2xl text-sm text-[#cdd9e8]">
            Market entry as a Markov Decision Process, and a closed-form Shapley decomposition of
            the market-attractiveness score — both fully interactive.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6">
        {/* MDP */}
        <section>
          <h2 className="text-lg font-semibold tracking-tight text-primary">Optimal entry sequence (MDP)</h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Slide the cold-start penalty and watch the optimal policy flip between US-first
            (value-greedy) and home-first (risk-adjusted).
          </p>
          <div className="mt-5 grid gap-4 lg:grid-cols-[280px_1fr]">
            <Card>
              <CardContent className="space-y-5 pt-5">
                <LabeledSlider
                  label="Cold-start penalty"
                  value={coldPenalty}
                  onChange={setColdPenalty}
                  min={0.2}
                  max={1}
                  step={0.05}
                  format={(v) => v.toFixed(2)}
                />
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  1.00 = no penalty (naïve). Lower = entering US/EU/Japan cold (with zero reference
                  logos) is much less likely to succeed.
                </p>
                <div className="h-px bg-border" />
                <div>
                  <div className="text-2xl font-bold text-primary">${mdp.value.toFixed(1)}M</div>
                  <div className="text-[11px] text-muted-foreground">Optimal-policy expected value</div>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Optimal entry order</p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {mdp.sequence.map((s) => s.market).join(" → ")}
                  </p>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Naïve (no penalty) policy value: <span className="font-medium text-foreground">${naiveMdp.value.toFixed(1)}M</span>, order{" "}
                  {naiveMdp.sequence.map((s) => s.market).join(" → ")}
                </p>
              </CardContent>
            </Card>
            <ChartCard title="Entry sequence — expected net value per step" height={340}>
              <MdpSequenceChart steps={mdp.sequence} />
            </ChartCard>
          </div>
        </section>

        {/* SHAP */}
        <section>
          <h2 className="text-lg font-semibold tracking-tight text-primary">Score explainability (SHAP-style)</h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            The market score is an additive weighted model — adjust the rubric weights and watch
            the ranking and decomposition respond in real time.
          </p>

          <Card className="mt-5">
            <CardHeader>
              <CardTitle className="text-sm">Rubric weights</CardTitle>
              <CardDescription>Defaults: Revenue 30% · Data-ready 20% · the rest 10–15% each.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-3">
              {SCORE_FEATURES.map((f, i) => (
                <LabeledSlider
                  key={f}
                  label={f}
                  value={weights[i]}
                  onChange={(v) => setWeights((w) => w.map((x, j) => (j === i ? v : x)))}
                  min={0}
                  max={0.5}
                  step={0.01}
                  format={(v) => `${Math.round(v * 100)}%`}
                />
              ))}
            </CardContent>
          </Card>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            <ChartCard title="Decision plot — what drives each market's score" caption="Cumulative contribution of each criterion, left to right." height={360}>
              <DecisionPlotChart results={shapResults} features={SCORE_FEATURES} />
            </ChartCard>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Ranking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1.5">
                {ranked.map((r, i) => (
                  <button
                    key={r.market}
                    onClick={() => setSelectedMarket(r.market)}
                    className={`flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                      r.market === selectedMarket ? "bg-secondary text-primary" : "hover:bg-muted"
                    }`}
                  >
                    <span className="font-medium">
                      {i + 1}. {r.market}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">{r.score.toFixed(2)}</span>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="flex flex-wrap items-center justify-between gap-2 text-sm">
                <span>Why {selectedMarket} scores {selectedResult.score.toFixed(2)}</span>
                <Select value={selectedMarket} onValueChange={(v) => v && setSelectedMarket(v)}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MARKET_SCORES.map((m) => (
                      <SelectItem key={m.market} value={m.market}>
                        {m.market}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardTitle>
              <CardDescription>Green/teal pushes the score up, red pulls it down.</CardDescription>
            </CardHeader>
            <CardContent>
              <div style={{ height: 320 }}>
                <ShapWaterfallChart result={selectedResult} features={SCORE_FEATURES} />
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
