# 05 — Phase 2A: Pricing & Packaging

**Goal:** choose the pricing model that best supports adoption, retention, and revenue across
markets with different willingness-to-pay — and package it onto the three tiers from doc 04.

## The verdict: a **hybrid** model (subscription anchor + usage + seats)
2025 benchmarks are decisive: pure per-seat is in decline (57% and falling; ~$45/seat/mo
median), usage-based is now mainstream (61% of B2B SaaS), and **hybrid pricing posts the
highest median growth (~21%)**. For a data/insights platform whose cost and value both scale
with *consumption* (markets analyzed, concepts generated), hybrid is the natural fit.

### The three components and what each is for
| Component | What it meters | Role | Why |
|---|---|---|---|
| **Platform subscription** (per tier) | Access to a tier | **Revenue anchor & predictability** | Enterprises want budgetable, committed spend |
| **Usage / credits** | Concept Genie runs, # markets, # categories, refresh frequency | **Value-metric & expansion** | Aligns price to value; powers NRR; lets small buyers start cheap |
| **Seats** | Named users | **Secondary expansion lever** | Land small, grow with adoption — not the primary meter |

> **Value metric = markets × categories × concept-generation usage.** This is the single most
> important pricing decision: we charge for *breadth of intelligence consumed*, which is what
> actually drives Ai Palette's cost-to-serve and the customer's value.

## Why not the alternatives (the trade-offs)
- **Pure per-seat:** caps revenue (insights are consumed by few, valued by many), penalizes adoption, and is structurally declining. ✗ as primary.
- **Pure usage:** unpredictable for enterprise budgeting and for our revenue; creates bill-shock and discourages exploration. ✗ as primary, ✓ as a layer.
- **Pure flat enterprise subscription:** simple but leaves expansion money on the table and can't flex to low-WTP markets. ✓ only at the very top, wrapped with usage upside.

Hybrid captures the best of each: predictable base + value-aligned expansion + adoption-friendly entry.

## Packaging onto tiers (illustrative list prices — see disclaimer)
> *Illustrative, benchmark-anchored [AB], not Ai Palette's actual prices.* Purpose: show the
> **structure and ratios**, which is what matters. Anchored to enterprise insights-SaaS ACVs
> ($30K–$120K, Assumption #1) and PLG/SLG ACV thresholds (doc 06).

| Tier | Subscription (annual, US benchmark) | Included usage | Overage / expansion | Target ACV |
|---|---|---|---|---|
| **Essentials** | ~$6–10K | 1 market, ~3 categories, low Concept Genie credits | buy more markets/credits | < $10K |
| **Growth** | ~$25–45K | several markets/categories, metered Concept Genie | markets, categories, credits, seats | $25–60K |
| **Enterprise** | ~$80–150K+ | all markets/categories, high usage, integrations, residency | custom data, services, volume | $80K+ |

Ratios matter more than absolutes: **~1 : 4 : 12** across tiers, with usage providing 15–30%
incremental within each tier.

## Regional willingness-to-pay (the same product, repriced — not rebuilt)
WTP ordering (Assumption #3): **US > W. Europe > Japan/Korea > SEA > India.** We do **not**
change the product or tier structure by region — we apply **regional price multipliers** and
shift the *tier mix* we lead with.

| Region | Price index (US=1.00) | Lead motion / tier emphasis |
|---|---|---|
| US | 1.00 | Enterprise-led; highest ACV |
| W. Europe | 0.85–0.95 | Enterprise + Growth; compliance is a selling point |
| Japan/Korea | 0.75–0.90 | Enterprise via partners; high service expectation |
| SEA | 0.45–0.65 | Growth-led; Essentials to widen funnel |
| India | 0.35–0.55 | Essentials/Growth-led; volume play, PLG-assisted |

This is **price localization, not product localization** — it protects margins in high-WTP
markets and protects adoption in price-sensitive ones, using one codebase.

## Retention & expansion design
- **Target blended NRR 110%+** (Assumption #6) via four upsell levers: markets, categories, usage, seats.
- **Annual contracts** at Growth/Enterprise for predictability; monthly option at Essentials to lower entry friction.
- **Guardrail:** keep CAC payback ≤ 12–18 months (median is ~20mo; we beat it via PLG-assisted Essentials and land-and-expand). See doc 06.

Machine-readable version: [`frameworks/pricing-model.csv`](../frameworks/pricing-model.csv).
