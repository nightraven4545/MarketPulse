// Source: frameworks/market-scoring.csv — weighted market-attractiveness rubric.
// The same six raw criteria also feed the SHAP-style decomposition in lib/calc/shap.ts
// (see decision-science/explain_scores.py) and the dashboard's top-3 radar chart.

export type MarketScore = {
  market: string;
  revenue: number;
  dataReady: number;
  homeAdv: number;
  compInv: number;
  regInv: number;
  costInv: number;
  weighted: number;
  rank: number;
  wave: "Wave 1" | "Wave 2" | "Wave 3" | "Later";
};

export const SCORE_FEATURES = [
  "Revenue",
  "Data-ready",
  "Home adv",
  "Comp (inv)",
  "Reg (inv)",
  "Cost (inv)",
] as const;

export const SCORE_FEATURE_KEYS = [
  "revenue",
  "dataReady",
  "homeAdv",
  "compInv",
  "regInv",
  "costInv",
] as const satisfies readonly (keyof MarketScore)[];

// weights: Revenue 30%, Data-ready 20%, Home adv 15%, Comp(inv) 15%, Reg(inv) 10%, Cost(inv) 10%
export const SCORE_WEIGHTS = [0.3, 0.2, 0.15, 0.15, 0.1, 0.1];

export const MARKET_SCORES: MarketScore[] = [
  { market: "SEA", revenue: 3, dataReady: 5, homeAdv: 5, compInv: 4, regInv: 4, costInv: 4, weighted: 4.05, rank: 1, wave: "Wave 1" },
  { market: "India", revenue: 3, dataReady: 5, homeAdv: 5, compInv: 4, regInv: 3, costInv: 4, weighted: 3.95, rank: 2, wave: "Wave 1" },
  { market: "US", revenue: 5, dataReady: 4, homeAdv: 2, compInv: 2, regInv: 4, costInv: 3, weighted: 3.60, rank: 3, wave: "Wave 2" },
  { market: "W. Europe", revenue: 4, dataReady: 4, homeAdv: 2, compInv: 3, regInv: 2, costInv: 3, weighted: 3.25, rank: 4, wave: "Wave 3" },
  { market: "Japan/Korea", revenue: 4, dataReady: 3, homeAdv: 3, compInv: 3, regInv: 3, costInv: 2, weighted: 3.20, rank: 5, wave: "Wave 3" },
  { market: "Middle East", revenue: 3, dataReady: 2, homeAdv: 3, compInv: 4, regInv: 3, costInv: 3, weighted: 2.95, rank: 6, wave: "Later" },
  { market: "LATAM", revenue: 2, dataReady: 2, homeAdv: 2, compInv: 4, regInv: 3, costInv: 3, weighted: 2.50, rank: 7, wave: "Later" },
];

// Top-3 markets' raw criteria profile, for the radar chart.
export const RADAR_MARKETS = ["SEA", "India", "US"];
