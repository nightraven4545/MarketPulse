"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AMBER, BLUE, GREEN, RED, TEAL, TOOLTIP_STYLE, WAVE_COLOR } from "@/lib/colors";
import type { MdpStep } from "@/lib/calc/mdp";
import type { ShapResult } from "@/lib/calc/shap";
import { MARKET_SCORES } from "@/lib/data/markets";

export function MdpSequenceChart({ steps }: { steps: MdpStep[] }) {
  const data = steps.map((s) => ({
    label: `P${s.period} · ${s.market}`,
    value: -s.cost + s.p * s.recurringValue,
    market: s.market,
  }));
  const colorFor = (m: string) => (m === "SEA" || m === "India" ? GREEN : m === "US" ? BLUE : AMBER);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ left: 4, right: 8 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8ecf2" />
        <XAxis dataKey="label" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 11 }} label={{ value: "Expected net value ($M)", angle: -90, position: "insideLeft", fontSize: 11 }} />
        <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v) => `$${Number(v).toFixed(2)}M`} />
        <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={50}>
          {data.map((d) => (
            <Cell key={d.label} fill={colorFor(d.market)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function DecisionPlotChart({ results, features }: { results: ShapResult[]; features: readonly string[] }) {
  const stages = ["Base", ...features];
  const data = stages.map((stage, i) => {
    const row: Record<string, number | string> = { stage };
    for (const r of results) {
      row[r.market] = i === 0 ? r.base : r.base + r.phi.slice(0, i).reduce((s, v) => s + v, 0);
    }
    return row;
  });
  const waveOf = (m: string) => MARKET_SCORES.find((x) => x.market === m)?.wave ?? "Later";
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ left: 4, right: 16 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e8ecf2" />
        <XAxis dataKey="stage" tick={{ fontSize: 10.5 }} />
        <YAxis tick={{ fontSize: 11 }} label={{ value: "Score →", angle: -90, position: "insideLeft", fontSize: 11 }} />
        <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v) => Number(v).toFixed(2)} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        {results.map((r) => (
          <Line key={r.market} type="linear" dataKey={r.market} stroke={WAVE_COLOR[waveOf(r.market)]} strokeWidth={2} dot={{ r: 2.5 }} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

export function ShapWaterfallChart({ result, features }: { result: ShapResult; features: readonly string[] }) {
  type Row = { label: string; start: number; size: number; raw: number; isBase: boolean };
  const rows: Row[] = [{ label: "base value", start: 0, size: result.base, raw: result.base, isBase: true }];
  let run = result.base;
  features.forEach((f, i) => {
    const v = result.phi[i];
    const start = v >= 0 ? run : run + v;
    rows.push({ label: f, start, size: Math.abs(v), raw: v, isBase: false });
    run += v;
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={rows} layout="vertical" margin={{ left: 8, right: 40 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e8ecf2" />
        <XAxis type="number" tick={{ fontSize: 11 }} />
        <YAxis type="category" dataKey="label" width={90} tick={{ fontSize: 11.5 }} />
        <Tooltip
          contentStyle={TOOLTIP_STYLE}
          formatter={(_v, _n, p) => [p.payload.isBase ? p.payload.raw.toFixed(2) : `${p.payload.raw >= 0 ? "+" : ""}${p.payload.raw.toFixed(2)}`, "contribution"]}
        />
        <Bar dataKey="start" stackId="w" fill="transparent" />
        <Bar dataKey="size" stackId="w" radius={[4, 4, 4, 4]} maxBarSize={18}>
          {rows.map((r) => (
            <Cell key={r.label} fill={r.isBase ? "#8a93a3" : r.raw >= 0 ? TEAL : RED} />
          ))}
        </Bar>
        <ReferenceLine
          x={result.score}
          stroke="#1f3864"
          strokeDasharray="4 3"
          label={{ value: `score ${result.score.toFixed(2)}`, position: "top", fontSize: 11, fill: "#1f3864" }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
