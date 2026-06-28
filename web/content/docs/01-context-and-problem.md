# 01 — Business Context & The Expansion Blind Spot

## Who Ai Palette is
Ai Palette is an AI-powered consumer-insights and product-innovation platform used by
enterprise CPG, food & beverage, and beauty brands to spot emerging trends, generate
product concepts, and validate ideas before launch. Public footprint:

- **Founded:** 2018, headquartered in Singapore.
- **Funding:** ~$13.46M total raised (investors incl. pi Ventures, Exfinity, ORZON Ventures, InnoVen, GlobalData).
- **Product surface:** Foresight Engine (predictive trend analysis across e-commerce, menus, recipes, social, search — 18 languages, 24 countries), Concept Genie (generative-AI concept creation), Screen Winner (concept screening), FoodGPT, Brand SAY.
- **Customers (named publicly):** Nestlé, Danone, Kellogg's, Cargill, Olam, and other global CPG manufacturers.

> Source detail and links are in [`02-assumptions-and-data-sources.md`](02-assumptions-and-data-sources.md).

## The blind spot
Ai Palette's product capability is strong. The unsolved problem is **commercial and operational scale across markets**:

- **Consumer behavior is local.** Trends in Indonesia, India, the US and Germany differ in category, language, and channel. The *value* of the product depends on local data depth.
- **Enterprise expectations vary by region.** Pricing tolerance, required product depth, integration demands, data-residency/compliance, and support intensity differ market to market.
- **Naïve expansion punishes you twice.** Localize everything → engineering bloat, slow releases, fragile codebase. Localize nothing → weak local insights, lost enterprise deals. Either way operational complexity rises faster than revenue.

## What this taskforce was asked to do
Architect **MarketPulse**: a structured framework that determines the *precise* level of
product localization required, and how the platform should be packaged and priced for
sustainable scale. Two phases:

**Phase 1 — Product Localization & Feature Tiering (design the scale).**
Decide what stays standardized vs. localized to prevent engineering bloat, and create
feature-tiering logic that maps to different enterprise-maturity levels in new regions.

**Phase 2 — Monetization & Go-To-Market (design the business).**
Choose the pricing model that best supports adoption, retention and revenue across
markets, and map it to a product-led or sales-led onboarding motion that controls
service-delivery overhead.

## Three constraints we explicitly design against
1. **The Localization Matrix** — which features remain global vs. localized (language, market categories, regional enterprise workflows, compliance).
2. **The Commercial Reality** — balancing per-seat, per-use-case, and enterprise-subscription pricing against regional willingness-to-pay.
3. **The Operational Overhead** — friction of onboarding, support, and service delivery across customer types and regions.

## How to read the rest of this repo
Phase 1 = docs 03–04. Phase 2 = docs 05–06. The market sequencing that ties them
together = doc 07. The repeatable engine that operationalizes all of it =
[`workflow/market-entry-automation.md`](../workflow/market-entry-automation.md). The two
graded outputs live in [`deliverables/`](../deliverables/).
