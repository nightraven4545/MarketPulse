// Source: frameworks/competitor-benchmark.csv + dashboard/index.html's positioning bubble chart.

export type Competitor = {
  name: string;
  coreFocus: string;
  geoStrength: string;
  dataSources: string;
  buyer: string;
  pricingModel: string;
  localizationDepth: string;
  positioning: string;
};

export const COMPETITORS: Competitor[] = [
  {
    name: "Ai Palette",
    coreFocus: "End-to-end trend discovery + gen-AI concepting + screening",
    geoStrength: "APAC-rooted (18 langs / 24 countries)",
    dataSources: "E-com, menus, recipes, social, search",
    buyer: "CPG/F&B/beauty innovation & insights teams",
    pricingModel: "Enterprise subscription (opaque)",
    localizationDepth: "Multi-language, multi-market by design",
    positioning: "Reference point",
  },
  {
    name: "Tastewise",
    coreFocus: "Food & beverage consumer-data platform",
    geoStrength: "US/global",
    dataSources: "Social, recipes, menus",
    buyer: "F&B marketing/innovation",
    pricingModel: "Subscription tiers",
    localizationDepth: "F&B-centric; less multi-region depth",
    positioning: "Strong F&B brand; narrower category",
  },
  {
    name: "Black Swan Data (now Mintel)",
    coreFocus: "Social predictive analytics / trend forecasting",
    geoStrength: "UK/global",
    dataSources: "Large-scale online conversations",
    buyer: "CPG marketing & NPD",
    pricingModel: "Enterprise (now bundled w/ Mintel)",
    localizationDepth: "Global social; English-led",
    positioning: "Acquired by Mintel Jun-2025 — absorbed into incumbent",
  },
  {
    name: "Mintel",
    coreFocus: "Structured research + GNPD launch tracking + reports",
    geoStrength: "Global incumbent",
    dataSources: "Proprietary research + GNPD + (now) Black Swan",
    buyer: "Strategy/insights/benchmarking",
    pricingModel: "High-priced research subscriptions",
    localizationDepth: "Broad country research libraries",
    positioning: "Incumbent depth; slow/expensive; not real-time NPD engine",
  },
  {
    name: "Spate",
    coreFocus: "Beauty & wellness trend prediction",
    geoStrength: "US",
    dataSources: "Search + social",
    buyer: "Beauty/wellness brands",
    pricingModel: "Subscription",
    localizationDepth: "Vertical (beauty) focus",
    positioning: "Narrow vertical; weak in F&B/NPD workflow",
  },
  {
    name: "Datassential",
    coreFocus: "Restaurant menus & foodservice trends",
    geoStrength: "US",
    dataSources: "Menus, operator behavior",
    buyer: "Foodservice/restaurant brands",
    pricingModel: "Subscription/reports",
    localizationDepth: "US foodservice-centric",
    positioning: "Adjacent (foodservice), not packaged-goods NPD",
  },
];

// x: Western-centric -> multi-market/APAC depth (0-10)
// y: single insight -> end-to-end workflow (0-10)
// r: relative breadth (bubble size)
export const POSITIONING_BUBBLES = [
  { name: "Ai Palette", x: 9, y: 9, r: 18 },
  { name: "Tastewise", x: 4, y: 7, r: 11 },
  { name: "Mintel (+Black Swan)", x: 7, y: 4, r: 15 },
  { name: "Spate", x: 3, y: 4, r: 9 },
  { name: "Datassential", x: 3, y: 3, r: 9 },
];
