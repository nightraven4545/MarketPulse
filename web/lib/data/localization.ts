// Source: frameworks/localization-matrix.csv + frameworks/feature-tiering.csv
// + dashboard/index.html "solution architecture" pipeline.

export type LocalizationRow = {
  capability: string;
  layer: "Engine" | "Edge" | "Commercial" | "Service";
  localize: string;
  valueDriver: string;
  localizationCost: string;
  verdict: string;
};

export const LOCALIZATION_MATRIX: LocalizationRow[] = [
  { capability: "ML/forecasting core", layer: "Engine", localize: "Global", valueDriver: "Low", localizationCost: "n/a", verdict: "Standardize 100%" },
  { capability: "Concept Genie generative model", layer: "Engine", localize: "Global", valueDriver: "Low", localizationCost: "Low", verdict: "Standardize; localize inputs" },
  { capability: "Data ingestion framework", layer: "Engine", localize: "Global", valueDriver: "Low", localizationCost: "n/a", verdict: "Standardize" },
  { capability: "Local data sources (e-com/menus/retail/social)", layer: "Edge", localize: "Localize", valueDriver: "High", localizationCost: "High-ongoing", verdict: "Localize as config (do first)" },
  { capability: "Language / NLP packs", layer: "Edge", localize: "Localize", valueDriver: "High", localizationCost: "Medium-ongoing", verdict: "Localize via packs" },
  { capability: "Category taxonomy", layer: "Edge", localize: "Localize", valueDriver: "High", localizationCost: "Medium", verdict: "Localize as data" },
  { capability: "Brand/competitor reference sets", layer: "Edge", localize: "Localize", valueDriver: "Medium", localizationCost: "Medium", verdict: "Localize as data" },
  { capability: "Compliance / data residency", layer: "Edge", localize: "Localize", valueDriver: "Required", localizationCost: "Medium-ongoing", verdict: "Localize by region" },
  { capability: "Enterprise workflow integrations", layer: "Edge", localize: "Localize-tiered", valueDriver: "Medium", localizationCost: "High", verdict: "Enterprise tier only" },
  { capability: "Reporting/export templates/currency/units", layer: "Edge", localize: "Localize", valueDriver: "Low", localizationCost: "Low", verdict: "Localize (i18n)" },
  { capability: "UI translation", layer: "Edge", localize: "Localize-light", valueDriver: "Low", localizationCost: "Low", verdict: "Defer; English-first ok" },
  { capability: "Pricing/contracting/invoicing", layer: "Commercial", localize: "Localize", valueDriver: "Medium", localizationCost: "Low-Med", verdict: "Localize commercially" },
  { capability: "Onboarding & support content/hours", layer: "Service", localize: "Localize-tiered", valueDriver: "Medium", localizationCost: "Medium", verdict: "Localize by tier+region" },
];

export type FeatureTierRow = {
  feature: string;
  essentials: string;
  growth: string;
  enterprise: string;
};

export const FEATURE_TIERING: FeatureTierRow[] = [
  { feature: "Foresight Engine trend discovery", essentials: "Limited", growth: "Included", enterprise: "Included" },
  { feature: "Markets included", essentials: "1", growth: "Few", enterprise: "All" },
  { feature: "Categories included", essentials: "~3", growth: "Expanded", enterprise: "All" },
  { feature: "Concept Genie (gen-AI concepts)", essentials: "No", growth: "Metered credits", enterprise: "Higher limits" },
  { feature: "Screen Winner (screening)", essentials: "No", growth: "Included", enterprise: "Included" },
  { feature: "Brand SAY / FoodGPT", essentials: "No", growth: "Included", enterprise: "Included" },
  { feature: "Seats", essentials: "1–3", growth: "Team", enterprise: "Org-wide" },
  { feature: "Localized language/data pack", essentials: "1 market", growth: "Selected", enterprise: "All" },
  { feature: "Localized taxonomy & brand sets", essentials: "No", growth: "Included", enterprise: "Included" },
  { feature: "Integrations / API / SSO", essentials: "No", growth: "No", enterprise: "Included" },
  { feature: "Compliance & data residency", essentials: "Standard", growth: "Standard", enterprise: "Region-specific" },
  { feature: "Support", essentials: "Self-serve/email", growth: "Priority", enterprise: "CSM + SLA" },
  { feature: "Onboarding", essentials: "Self-serve", growth: "Guided", enterprise: "White-glove + services" },
  { feature: "GTM motion", essentials: "PLG-assisted", growth: "Hybrid", enterprise: "Sales-led" },
  { feature: "Target ACV (USD)", essentials: "<10K", growth: "25–60K", enterprise: "80K+" },
];

export const LOCALIZE_VS_STANDARDIZE = [
  { name: "Global engine (build once)", value: 80 },
  { name: "Localized edge (Market Pack)", value: 20 },
];

export const PIPELINE_STAGES = [
  { label: "Local data sources", detail: "e-com · menus · recipes · social · search", kind: "local" as const },
  { label: "ML / NLP core", detail: "forecasting · ranking", kind: "global" as const },
  { label: "Concept & screen engine", detail: "Concept Genie · Screen Winner", kind: "global" as const },
  { label: "Local workflow", detail: "integrations · compliance · GTM", kind: "local" as const },
];
