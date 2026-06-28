# 02 — Assumptions & Data Sources (the audit trail)

> **Read this first if you are evaluating the numbers.** Ai Palette is a *private* company.
> There are **no SEC filings, no 10-Ks, no audited financials, no published revenue.**
> Every financial figure in this strategy is a **labeled estimate** built with one of three
> methods and anchored to a public benchmark. The judging criterion is *defensibility of
> logic*, not access to non-existent internal data.

## The three estimation methods we use
| Method | When we use it | Example |
|--------|----------------|---------|
| **Top-down (TAM→SAM→SOM)** | Sizing market opportunity | AI-in-F&B market → CPG insights slice → reachable enterprise accounts |
| **Bottoms-up** | Sizing revenue / ARR | # target accounts × win-rate × ACV per tier |
| **Analog benchmarking** | Pricing, NRR, CAC, motion thresholds | "comparable B2B SaaS median per-seat is ~$45/mo, enterprise insights ACV $25K–$120K" |

Every estimate below is tagged with its method **[TD] / [BU] / [AB]** and a confidence level.

---

## A. Facts about Ai Palette (sourced, not estimated)
| Item | Value | Source |
|------|-------|--------|
| HQ / founded | Singapore, 2018 | Tracxn, CB Insights |
| Total funding | ~$13.46M | Tracxn |
| Languages / countries covered | 18 languages / 24 countries | AgFunderNews; aipalette.com |
| Core products | Foresight Engine, Concept Genie, Screen Winner, FoodGPT, Brand SAY | aipalette.com |
| Named customers | Nestlé, Danone, Kellogg's, Cargill, Olam | AgFunderNews |
| Main competitors | Tastewise, Black Swan Data, Spate, Mintel, Datassential, Native AI, Technomic | Tastewise blog, CB Insights |

## B. Market sizing inputs (public reports → our TAM/SAM/SOM)
| Input | Value | Source |
|-------|-------|--------|
| AI in Food & Beverages market (2025) | ~$16.36B, ~39% CAGR | Precedence/GlobeNewswire |
| Generative AI in CPG | ~9.5% CAGR segment, F&B ~36% share | market.us |
| North America share of AI-in-F&B | ~32% (2023) | grandviewresearch |
| Value at stake for a $10B CPG from AI digital transformation | $810M–$1.6B | McKinsey, State of Food & Beverage |

**Our derived sizing [TD], medium confidence** — *illustrative*: We treat consumer-insights
+ NPD software as a thin slice (~1–2%) of the broad "AI in F&B" number, because most of that
market is manufacturing/quality/supply-chain AI, not insights SaaS. Resulting serviceable
software market for trend-intelligence/NPD tooling is estimated at **~$1.5–3B today**, growing
double-digit. SOM is bounded by reachable mid-to-large CPG accounts per region (see doc 07).

## C. SaaS commercial benchmarks (anchors for pricing & GTM) [AB]
| Benchmark | 2025 value | Use in this strategy | Source |
|-----------|-----------|----------------------|--------|
| Per-seat as primary model | 57% (down from 64% in '24); median ~$45/seat/mo | Why we don't lead with pure per-seat | Monetizely / SaaS CFO |
| Usage-based adoption | 61% of B2B SaaS use some consumption pricing | Justifies credits/usage layer | Maxio |
| Hybrid pricing growth | Highest median growth (~21%) | Why we recommend hybrid | Monetizely |
| NRR | median ~101%; top performers ≥111% | Retention targets per tier | Benchmarkit / Growth Unhinged |
| CAC payback | median ~20 mo; "good" ≤12 mo | Motion choice & efficiency guardrail | First Page Sage |
| PLG vs SLG threshold | PLG works <$10K ACV; SLG for >$25K ACV + committee buying | Motion-by-tier mapping | Thoughtlytics / ProductLed |

## D. Assumptions we are making explicitly (challenge these!)
| # | Assumption | Method | Confidence | Rationale |
|---|-----------|--------|-----------|-----------|
| 1 | Ai Palette ACV today sits ~$30K–$120K (enterprise, multi-market deals) | AB | Med | Enterprise insights SaaS with named global CPGs; multi-seat, multi-market |
| 2 | ~80% of the codebase can stay global; ~20% is the localizable edge | AB/expert | Med | Typical for data-platform SaaS where the ML core is shared and only data sources/NLP/taxonomy/compliance differ |
| 3 | Willingness-to-pay: US > W.Europe > Japan/Korea > SEA > India | AB | Med-High | Standard enterprise-software WTP ordering by GDP/IT-budget density |
| 4 | A new "Essentials" self-serve tier can reach <$10K ACV and be PLG-assisted | AB | Med | Aligns to PLG ACV threshold; widens funnel in price-sensitive markets |
| 5 | Localization cost is dominated by *data acquisition + taxonomy*, not UI translation | expert | Med | Trend data depth is the product's value driver |
| 6 | Target blended NRR 110%+ via usage expansion + multi-market land-and-expand | AB | Med | Achievable for enterprise data SaaS with consumption upsell |

## E. What we deliberately did NOT do
- We did **not** fabricate Ai Palette revenue, headcount-by-region, or churn. Where those would normally come from internal data, we used ranges + benchmarks and flagged them.
- We did **not** rely on any single market report as ground truth; sizing is order-of-magnitude.

## Sources
- [Ai Palette — Tracxn profile](https://tracxn.com/d/companies/ai-palette/__bshx6s_LmylnLUTJNcrPypAAKW-_knzj0rUoriF3ILk)
- [Ai Palette raises $5.7m / FoodGPT — AgFunderNews](https://agfundernews.com/ai-palette-raises-5-7m-to-expand-ai-powered-insights-platform-adds-foodgpt-chatbot)
- [Concept Genie launch — AgFunderNews](https://agfundernews.com/ai-palette-unveils-concept-genie-generative-ai-tool-for-rapid-npd)
- [Foresight Engine — aipalette.com](https://www.aipalette.com/platform/foresight-engine/)
- [Concept Genie — aipalette.com](https://www.aipalette.com/platform/concept-genie/)
- [Top Food & CPG market-research tools — Tastewise](https://tastewise.io/blog/cpg-market-research-companies)
- [SaaS Pricing Benchmark Study 2025 — Monetizely](https://www.getmonetizely.com/articles/saas-pricing-benchmark-study-2025-key-insights-from-100-companies-analyzed)
- [2025 SaaS Pricing Trends — Maxio](https://www.maxio.com/resources/2025-saas-pricing-trends-report)
- [SaaS CAC Payback Benchmarks 2025 — First Page Sage](https://firstpagesage.com/reports/saas-cac-payback-benchmarks/)
- [PLG vs Sales-Led decision matrix — Thoughtlytics](https://www.thoughtlytics.com/blog/plg-vs-sales-led-growth-framework)
- [AI in Food & Beverages market size — GrandView](https://www.grandviewresearch.com/industry-analysis/ai-food-beverages-market-report)
- [Generative AI in CPG market — market.us](https://market.us/report/generative-ai-in-cpg-market/)
- [State of Food & Beverage — McKinsey](https://www.mckinsey.com/industries/consumer-packaged-goods/our-insights/state-of-food-and-beverage)
