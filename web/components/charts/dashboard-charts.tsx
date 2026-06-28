"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Funnel,
  FunnelChart,
  LabelList,
  Legend,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { AMBER, BLUE, GREEN, NAVY, TEAL, TOOLTIP_STYLE, WAVE_COLOR } from "@/lib/colors";
import { MARKET_SCORES, RADAR_MARKETS, SCORE_FEATURES, SCORE_FEATURE_KEYS } from "@/lib/data/markets";
import { POSITIONING_BUBBLES } from "@/lib/data/competitors";
import { TAM_SAM_SOM } from "@/lib/data/roadmap";
import { LOCALIZE_VS_STANDARDIZE } from "@/lib/data/localization";
import { TIERS, REGIONAL_WTP } from "@/lib/data/pricing";
import { ROADMAP } from "@/lib/data/roadmap";

export function MarketScoreChart() {
  const data = [...MARKET_SCORES].sort((a, b) => a.rank - b.rank);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ left: 12, right: 16 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e8ecf2" />
        <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 11 }} label={{ value: "Weighted score (0–5)", position: "insideBottom", offset: -5, fontSize: 11 }} />
        <YAxis type="category" dataKey="market" width={88} tick={{ fontSize: 12 }} />
        <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v) => Number(v).toFixed(2)} />
        <Bar dataKey="weighted" radius={[0, 4, 4, 0]} maxBarSize={22}>
          {data.map((d) => (
            <Cell key={d.market} fill={WAVE_COLOR[d.wave]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function MarketRadarChart() {
  const data = SCORE_FEATURES.map((feature, j) => {
    const row: Record<string, string | number> = { feature };
    for (const m of RADAR_MARKETS) {
      const mkt = MARKET_SCORES.find((x) => x.market === m)!;
      row[m] = mkt[SCORE_FEATURE_KEYS[j]];
    }
    return row;
  });
  const colors = [GREEN, TEAL, BLUE];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={data}>
        <PolarGrid stroke="#e8ecf2" />
        <PolarAngleAxis dataKey="feature" tick={{ fontSize: 10.5 }} />
        <PolarRadiusAxis domain={[0, 5]} tick={false} axisLine={false} />
        {RADAR_MARKETS.map((m, i) => (
          <Radar key={m} name={m} dataKey={m} stroke={colors[i]} fill={colors[i]} fillOpacity={0.12} strokeWidth={2} />
        ))}
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Tooltip contentStyle={TOOLTIP_STYLE} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export function FunnelChartView() {
  const colors = [NAVY, BLUE, TEAL];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <FunnelChart>
        <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v) => `$${Number(v).toLocaleString("en-US")}M`} />
        <Funnel dataKey="value" data={TAM_SAM_SOM} isAnimationActive>
          <LabelList dataKey="labelLong" position="right" fill="#1c2433" fontSize={12} />
          {TAM_SAM_SOM.map((d, i) => (
            <Cell key={d.name} fill={colors[i]} />
          ))}
        </Funnel>
      </FunnelChart>
    </ResponsiveContainer>
  );
}

export function PositioningChart() {
  const colors: Record<string, string> = {
    "Ai Palette": TEAL,
    Tastewise: BLUE,
    "Mintel (+Black Swan)": NAVY,
    Spate: "#8a93a3",
    Datassential: "#8a93a3",
  };
  return (
    <div className="flex h-full flex-col">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
          <CartesianGrid stroke="#e8ecf2" />
          <XAxis
            type="number"
            dataKey="x"
            domain={[0, 10]}
            tick={{ fontSize: 10.5 }}
            label={{ value: "Western-centric → multi-market / APAC depth", position: "insideBottom", offset: -5, fontSize: 10.5 }}
          />
          <YAxis
            type="number"
            dataKey="y"
            domain={[0, 10]}
            tick={{ fontSize: 10.5 }}
            label={{ value: "single insight → end-to-end", angle: -90, position: "insideLeft", fontSize: 10.5 }}
          />
          <ZAxis type="number" dataKey="r" range={[120, 700]} />
          <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ strokeDasharray: "3 3" }} />
          <Scatter data={POSITIONING_BUBBLES}>
            {POSITIONING_BUBBLES.map((d) => (
              <Cell key={d.name} fill={colors[d.name]} fillOpacity={0.75} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
      <div className="mt-1 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
        {POSITIONING_BUBBLES.map((d) => (
          <span key={d.name} className="inline-flex items-center gap-1.5">
            <span className="inline-block size-2.5 rounded-full" style={{ background: colors[d.name] }} />
            {d.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function SplitDonutChart() {
  const colors = [BLUE, TEAL];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v) => `${v}%`} />
        <Pie data={LOCALIZE_VS_STANDARDIZE} dataKey="value" nameKey="name" innerRadius="60%" outerRadius="85%" paddingAngle={2}>
          {LOCALIZE_VS_STANDARDIZE.map((d, i) => (
            <Cell key={d.name} fill={colors[i]} />
          ))}
        </Pie>
        <Legend wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function TierPricingChart() {
  const colors = [TEAL, BLUE, NAVY];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={TIERS} margin={{ left: 8, right: 8 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8ecf2" />
        <XAxis dataKey="tier" tick={{ fontSize: 12 }} />
        <YAxis tickFormatter={(v) => `$${v / 1000}K`} tick={{ fontSize: 11 }} />
        <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v) => `$${Number(v).toLocaleString("en-US")}`} />
        <Bar dataKey="benchmarkAcv" radius={[6, 6, 0, 0]} maxBarSize={70}>
          {TIERS.map((d, i) => (
            <Cell key={d.tier} fill={colors[i]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function WtpChart() {
  const colors: Record<string, string> = {
    US: NAVY,
    "W. Europe": BLUE,
    "Japan/Korea": BLUE,
    SEA: TEAL,
    India: TEAL,
  };
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={REGIONAL_WTP} margin={{ left: 8, right: 8 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8ecf2" />
        <XAxis dataKey="region" tick={{ fontSize: 11.5 }} />
        <YAxis domain={[0, 1.1]} tick={{ fontSize: 11 }} />
        <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v) => Number(v).toFixed(2)} />
        <Bar dataKey="priceIndex" radius={[6, 6, 0, 0]} maxBarSize={55}>
          {REGIONAL_WTP.map((d) => (
            <Cell key={d.region} fill={colors[d.region]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function RoadmapChart() {
  const data = ROADMAP.map((w) => ({ ...w, duration: w.end - w.start }));
  const colors: Record<string, string> = { "Wave 1": GREEN, "Wave 2": BLUE, "Wave 3": AMBER };
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ left: 16, right: 16 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e8ecf2" />
        <XAxis type="number" domain={[0, 30]} tickCount={6} tick={{ fontSize: 11 }} label={{ value: "Months from launch", position: "insideBottom", offset: -5, fontSize: 11 }} />
        <YAxis type="category" dataKey="label" width={140} tick={{ fontSize: 11.5 }} />
        <Tooltip
          contentStyle={TOOLTIP_STYLE}
          formatter={(v, n, p) =>
            n === "duration" ? [`Months ${p.payload.start}–${p.payload.end}`, "Window"] : [v, n]
          }
        />
        <Bar dataKey="start" stackId="a" fill="transparent" />
        <Bar dataKey="duration" stackId="a" radius={[5, 5, 5, 5]} maxBarSize={26}>
          {data.map((d) => (
            <Cell key={d.label} fill={colors[d.wave]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
