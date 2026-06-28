# 03 — Phase 1A: The Localization Matrix

**Goal:** decide what stays *global* (build once, serve everywhere) vs. *localized* (adapt per
market) so we maximize insight quality while minimizing engineering bloat.

## The governing principle: localize the edge, standardize the engine
A trend-intelligence platform is a pipeline: **collect data → process with ML → surface
insights → generate & screen concepts → deliver in a workflow.** The *intelligence* (ML
models, ranking, generative concepting) is universal. What's local is **the data going in,
the language it's in, the categories it maps to, the laws around it, and the workflow it
plugs into.** So we standardize the middle and localize the two ends.

```
        GLOBAL (build once)                          LOCALIZED (adapt per market)
  ┌──────────────────────────────┐        ┌────────────────────────────────────────┐
  IN →  Data ingestion framework   →  ML/NLP core  →  Insight & concept engine  → OUT
        ▲ localized data SOURCES                                    localized WORKFLOW ▼
        localized LANGUAGE/NLP packs                                localized COMPLIANCE
        localized TAXONOMY/categories                               localized GTM/support
```

## The matrix
Each capability is scored on two axes — **does localizing it materially increase customer
value?** and **how expensive/ongoing is it to localize?** That yields a verdict.

| Capability | Localize? | Why | Localization cost | Verdict |
|---|---|---|---|---|
| ML/forecasting core, ranking algorithms | **Global** | Math is market-agnostic | n/a | Standardize 100% |
| Concept Genie generative engine (model) | **Global** | Same model; only prompts/data differ | Low | Standardize; localize *inputs* |
| Data ingestion *framework* | **Global** | One pipeline, many connectors | n/a | Standardize |
| Data **sources** (local e-com, menus, retailers, social) | **Localize** | Insight quality = local data depth; **this is the #1 value driver** | High, ongoing | Localize (config, not code) |
| Language / NLP packs (already 18 langs) | **Localize** | Trends are expressed in local language | Medium, ongoing | Localize via language packs |
| Category **taxonomy** (e.g., "snacking", "ayurvedic", "halal", "wellness") | **Localize** | Categories are culturally specific | Medium | Localize as config/data |
| Brand/competitor reference sets | **Localize** | Local brands differ | Medium | Localize as data |
| Compliance / data residency / privacy (GDPR, PDPA, DPDP) | **Localize** | Legal requirement to sell enterprise | Medium, ongoing | Localize by region (infra + policy) |
| Enterprise workflow integrations (their PLM/innovation stack, SSO) | **Localize (tiered)** | Big-enterprise buyers demand it; SMBs don't | High per integration | Localize only at Enterprise tier |
| Reporting / export templates, currency, units | **Localize** | Low effort, high polish | Low | Localize (i18n) |
| UI translation | **Localize (light)** | Expected but not the value driver | Low | Localize last; English-first acceptable in many B2B markets |
| Pricing, contracting, invoicing currency | **Localize** | WTP & finance norms differ | Low-Med | Localize commercially (doc 05) |
| Onboarding & support content/hours | **Localize (tiered)** | Service overhead driver | Medium | Localize by tier + region (doc 06) |

## Config-not-code: the bloat firewall
The single most important engineering rule for avoiding bloat: **localization must be
data/configuration, never a code fork.** Build a **market pack** abstraction:

> A *Market Pack* = { language model(s), data-source connectors, category taxonomy, brand
> reference set, compliance profile, currency/format, support config }. Adding a market =
> shipping a new pack, **not** branching the product.

This keeps ~80% of the codebase shared (Assumption #2), turns "enter a market" from an
engineering project into a configurable, repeatable operation, and is exactly what the
[automated workflow](../workflow/market-entry-automation.md) provisions.

## The trade-off, made visual (cost-to-serve vs. revenue-uplift)
```
  high │  Compliance/        │  Local data sources
 rev   │  residency          │  Language/NLP packs
 uplift│  (do it — required) │  Taxonomy  (DO FIRST — high ROI)
 ──────┼─────────────────────┼──────────────────────────────
  low  │  UI full translation│  Deep per-customer workflow
 rev   │  (defer)            │  integrations (Enterprise-only,
 uplift│                     │   charge for it)
       └─────────────────────┴──────────────────────────────
            low loc. cost            high loc. cost
```
**Do-first quadrant** (high uplift, manageable cost): local data sources, language, taxonomy.
**Charge-for-it quadrant** (high uplift, high cost): deep integrations → gate behind Enterprise
tier and price as services. **Defer quadrant**: full UI translation. **Required regardless**:
compliance/residency — it's table stakes to even sell.

Machine-readable version: [`frameworks/localization-matrix.csv`](../frameworks/localization-matrix.csv).
