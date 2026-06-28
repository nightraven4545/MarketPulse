"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AMBER, BLUE, GREEN, NAVY, TEAL, TOOLTIP_STYLE } from "@/lib/colors";
import { ARR_MARKET_KEYS, ARR_YEARS, type ArrRow, type MarketKey, type TornadoDriver } from "@/lib/calc/arr";

const MARKET_COLORS: Record<MarketKey, string> = {
  SEA: GREEN,
  India: TEAL,
  US: BLUE,
  "W. Europe": AMBER,
  "Japan/Korea": NAVY,
};

export function ArrByMarketChart({ rows }: { rows: ArrRow[] }) {
  const data = Array.from({ length: ARR_YEARS }, (_, i) => {
    const year = i + 1;
    const row: Record<string, number | string> = { year: `Y${year}` };
    for (const m of ARR_MARKET_KEYS) {
      const r = rows.find((x) => x.market === m && x.year === year);
      row[m] = r ? r.endArr / 1e6 : 0;
    }
    return row;
  });
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ left: 4, right: 8 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8ecf2" />
        <XAxis dataKey="year" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 11 }} label={{ value: "ARR ($M)", angle: -90, position: "insideLeft", fontSize: 11 }} />
        <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v) => `$${Number(v).toFixed(2)}M`} />
        <Legend wrapperStyle={{ fontSize: 11.5 }} />
        {ARR_MARKET_KEYS.map((m) => (
          <Bar key={m} dataKey={m} name={m} stackId="arr" fill={MARKET_COLORS[m]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

export function NewVsExpansionChart({ rows }: { rows: ArrRow[] }) {
  const data = Array.from({ length: ARR_YEARS }, (_, i) => {
    const year = i + 1;
    const yearRows = rows.filter((r) => r.year === year);
    return {
      year: `Y${year}`,
      "New ARR": yearRows.reduce((s, r) => s + r.newArr, 0) / 1e6,
      "Expansion ARR": yearRows.reduce((s, r) => s + r.expansionArr, 0) / 1e6,
    };
  });
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ left: 4, right: 8 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8ecf2" />
        <XAxis dataKey="year" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 11 }} label={{ value: "$M", position: "insideLeft", fontSize: 11 }} />
        <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v) => `$${Number(v).toFixed(2)}M`} />
        <Legend wrapperStyle={{ fontSize: 11.5 }} />
        <Bar dataKey="New ARR" stackId="ne" fill={BLUE} />
        <Bar dataKey="Expansion ARR" stackId="ne" fill={TEAL} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function Y5MixDonut({ rows }: { rows: ArrRow[] }) {
  const data = ARR_MARKET_KEYS.map((m) => ({
    name: m,
    value: rows.filter((r) => r.market === m && r.year === ARR_YEARS).reduce((s, r) => s + r.endArr, 0) / 1e6,
  }));
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v) => `$${Number(v).toFixed(2)}M`} />
        <Pie data={data} dataKey="value" nameKey="name" innerRadius="50%" outerRadius="85%" paddingAngle={2}>
          {data.map((d) => (
            <Cell key={d.name} fill={MARKET_COLORS[d.name as MarketKey]} />
          ))}
        </Pie>
        <Legend wrapperStyle={{ fontSize: 11.5 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function BlendedAcvChart({ rows }: { rows: ArrRow[] }) {
  const data = ARR_MARKET_KEYS.map((m) => ({
    name: m,
    value: rows.find((r) => r.market === m)?.blendedAcv ?? 0,
  }));
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ left: 4, right: 8 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8ecf2" />
        <XAxis dataKey="name" tick={{ fontSize: 11 }} />
        <YAxis tickFormatter={(v) => `$${Math.round(v / 1000)}K`} tick={{ fontSize: 11 }} />
        <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v) => `$${Math.round(Number(v)).toLocaleString("en-US")}`} />
        <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={50}>
          {data.map((d) => (
            <Cell key={d.name} fill={MARKET_COLORS[d.name as MarketKey]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function TornadoChart({ drivers, base }: { drivers: TornadoDriver[]; base: number }) {
  const data = drivers.map((d) => ({ ...d, range: d.hi - d.lo }));
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ left: 16, right: 24 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e8ecf2" />
        <XAxis type="number" tick={{ fontSize: 11 }} label={{ value: "Year-5 ARR ($M)", position: "insideBottom", offset: -5, fontSize: 11 }} />
        <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 11.5 }} />
        <Tooltip
          contentStyle={TOOLTIP_STYLE}
          formatter={(v, n, p) =>
            n === "range" ? [`$${p.payload.lo.toFixed(1)}M – $${p.payload.hi.toFixed(1)}M`, "Range"] : [v, n]
          }
        />
        <Bar dataKey="lo" stackId="t" fill="transparent" />
        <Bar dataKey="range" stackId="t" fill={BLUE} radius={[4, 4, 4, 4]} maxBarSize={20} />
        <ReferenceLine
          x={base}
          stroke={NAVY}
          strokeDasharray="4 3"
          label={{ value: `base $${base.toFixed(1)}M`, position: "top", fontSize: 11, fill: NAVY }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
