// Source: dashboard/index.html — 3-wave roadmap, commercial-architecture map, engine flow, funnel, KPIs.

export const TAM_SAM_SOM = [
  { name: "TAM", labelLong: "TAM ($16B)", value: 16000 },
  { name: "SAM", labelLong: "SAM ($5.5B)", value: 5500 },
  { name: "SOM", labelLong: "SOM ($45M)", value: 45 },
];

export const KPIS = [
  { value: "~$16B", label: "TAM · AI in Food & Beverage (2025)" },
  { value: "~$5–6B", label: "SAM · CPG / trend-intelligence software" },
  { value: "~$30–60M", label: "SOM · 3-yr obtainable (illustrative)" },
  { value: "≥110%", label: "Target blended NRR" },
];

export type RoadmapWave = {
  wave: "Wave 1" | "Wave 2" | "Wave 3";
  label: string;
  start: number; // months from launch
  end: number;
};

export const ROADMAP: RoadmapWave[] = [
  { wave: "Wave 1", label: "Wave 1 · SEA + India", start: 0, end: 9 },
  { wave: "Wave 2", label: "Wave 2 · US", start: 6, end: 18 },
  { wave: "Wave 3", label: "Wave 3 · EU + JP/KR", start: 18, end: 30 },
];

export type CommercialArchRow = {
  market: string;
  wave: "1" | "2" | "3" | "Later";
  leadTier: string;
  localizationDepth: string;
  priceIdx: number;
  leadAcv: string;
  motion: string;
};

export const COMMERCIAL_ARCHITECTURE: CommercialArchRow[] = [
  { market: "SEA", wave: "1", leadTier: "Growth", localizationDepth: "Standard pack + taxonomy", priceIdx: 0.55, leadAcv: "~$19K", motion: "Hybrid" },
  { market: "India", wave: "1", leadTier: "Essentials/Growth", localizationDepth: "Standard · volume", priceIdx: 0.45, leadAcv: "~$16K", motion: "PLG-assisted" },
  { market: "US", wave: "2", leadTier: "Enterprise", localizationDepth: "Full + residency + integrations", priceIdx: 1.00, leadAcv: "~$120K", motion: "Sales-led" },
  { market: "W. Europe", wave: "3", leadTier: "Enterprise", localizationDepth: "Full + GDPR (reuse US)", priceIdx: 0.90, leadAcv: "~$108K", motion: "Sales-led" },
  { market: "Japan/Korea", wave: "3", leadTier: "Enterprise", localizationDepth: "Full via partner", priceIdx: 0.82, leadAcv: "~$98K", motion: "Partner-led" },
  { market: "Middle East", wave: "Later", leadTier: "Growth", localizationDepth: "Standard · inbound/partner", priceIdx: 0.70, leadAcv: "~$25K", motion: "Partner/inbound" },
  { market: "LATAM", wave: "Later", leadTier: "Essentials/Growth", localizationDepth: "Minimal → standard", priceIdx: 0.50, leadAcv: "~$18K", motion: "PLG-assisted" },
];

export const ENGINE_STEPS = [
  { n: 1, label: "Intake", detail: "market signals" },
  { n: 2, label: "Score", detail: "weighted rubric" },
  { n: 3, label: "Decide", detail: "tier · price · motion" },
  { n: 4, label: "Provision", detail: "Market Pack + GTM" },
  { n: 5, label: "Monitor", detail: "expand or exit" },
];

export const HEADLINE_RECOMMENDATIONS = [
  {
    title: "Localize the thin edge, standardize the engine",
    body: "Keep the AI/ML core, data pipeline, and concept-generation global; localize only data sources, language/NLP, taxonomy, compliance, and GTM workflow. ~80% of code stays shared.",
  },
  {
    title: "Three tiers, mapped to maturity",
    body: "Essentials (self-serve trend discovery), Growth (insights + concepts), Enterprise (end-to-end + localization + workflow integration).",
  },
  {
    title: "Hybrid pricing",
    body: "Platform subscription as the anchor, usage/credits (Concept Genie runs, markets, categories) as the engine, seats as an expansion lever.",
  },
  {
    title: "Motion follows ACV",
    body: "PLG-assisted for Essentials (<$10K), sales-led for Enterprise (>$25K, committee buying), hybrid in between.",
  },
  {
    title: "Sequence by score, not gut feel",
    body: "Wave 1 deepen SEA + India (home advantage). Wave 2 attack the US (highest willingness-to-pay). Wave 3 EU + Middle East.",
  },
];
