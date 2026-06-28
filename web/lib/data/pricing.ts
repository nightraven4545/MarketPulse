// Source: frameworks/pricing-model.csv + frameworks/pricing-regional-multipliers.csv
// + dashboard/index.html "Motion follows ACV" table.

export type Tier = {
  tier: "Essentials" | "Growth" | "Enterprise";
  subscriptionRange: string;
  benchmarkAcv: number; // single number used for charts — matches arr-model/app.py defaults
  includedUsage: string;
  expansionLevers: string;
  targetAcv: string;
  motion: string;
  costToServe: "Very low (scales)" | "Medium" | "High (justified by ACV)";
  buying: string;
};

export const TIERS: Tier[] = [
  {
    tier: "Essentials",
    subscriptionRange: "$6,000–10,000",
    benchmarkAcv: 8000,
    includedUsage: "1 market / ~3 categories / low credits",
    expansionLevers: "markets + credits",
    targetAcv: "<$10K",
    motion: "PLG-assisted",
    costToServe: "Very low (scales)",
    buying: "1–2 people",
  },
  {
    tier: "Growth",
    subscriptionRange: "$25,000–45,000",
    benchmarkAcv: 35000,
    includedUsage: "several markets/categories / metered Concept Genie",
    expansionLevers: "markets + categories + credits + seats",
    targetAcv: "$25–60K",
    motion: "Hybrid (PLG → AE)",
    costToServe: "Medium",
    buying: "Small team",
  },
  {
    tier: "Enterprise",
    subscriptionRange: "$80,000–150,000+",
    benchmarkAcv: 120000,
    includedUsage: "all markets/categories / high usage / integrations / residency",
    expansionLevers: "custom data + services + volume",
    targetAcv: "$80K+",
    motion: "Sales-led (AE + SE + CSM)",
    costToServe: "High (justified by ACV)",
    buying: "Committee",
  },
];

export type RegionalWtp = {
  region: string;
  rangeLabel: string;
  priceIndex: number; // midpoint, used for the chart — matches dashboard cWtp values
  leadTier: string;
  motion: string;
};

export const REGIONAL_WTP: RegionalWtp[] = [
  { region: "US", rangeLabel: "1.00", priceIndex: 1.0, leadTier: "Enterprise", motion: "Sales-led + PLG funnel" },
  { region: "W. Europe", rangeLabel: "0.85–0.95", priceIndex: 0.9, leadTier: "Enterprise + Growth", motion: "Sales-led (compliance-forward)" },
  { region: "Japan/Korea", rangeLabel: "0.75–0.90", priceIndex: 0.82, leadTier: "Enterprise via partner", motion: "Partner/channel-led" },
  { region: "SEA", rangeLabel: "0.45–0.65", priceIndex: 0.55, leadTier: "Growth + Essentials", motion: "Hybrid" },
  { region: "India", rangeLabel: "0.35–0.55", priceIndex: 0.45, leadTier: "Essentials/Growth", motion: "PLG-assisted" },
];
