# 10 — ARR Model Methodology (bottoms-up)

Puts a defensible number on the SOM. Delivered two ways with identical logic and defaults:
the **Streamlit app** ([`arr-model/`](../arr-model/)) for live what-ifs, and the **Excel model**
(`deliverables/DeliverableC_ARR_Model.xlsx`) with cross-sheet formulas.

> Ai Palette is private — these are illustrative, benchmark-anchored assumptions, not reported
> figures. The model's job is to make the growth logic explicit and adjustable.

## The math (per market, per year)
```
new logos        = addressable accounts × annual capture rate        (entry year × ramp factor)
blended ACV      = regional price index × Σ(tier-mix% × tier ACV)
new ARR          = new logos × blended ACV
End ARR (year n) = End ARR(n-1) × NRR + new ARR(n)
expansion ARR    = End ARR(n-1) × (NRR − 1)
Total ARR        = Σ End ARR across all markets
```
Markets switch on by **entry year** (Wave 1: SEA, India · Wave 2: US · Wave 3: W. Europe,
Japan/Korea), matching the sequencing in [`07`](07-market-sequencing.md).

## Default assumptions (editable)
| Lever | Default | Source / rationale |
|---|---|---|
| Tier ACVs (US) | $8K / $35K / $120K | Pricing doc [`05`](05-phase2-pricing-packaging.md) |
| Price index | 0.45–1.00 | Regional WTP [`05`](05-phase2-pricing-packaging.md) |
| Tier mix per market | lead-tier weighted | Tiering [`04`](04-phase1-feature-tiering.md) + sequencing [`07`](07-market-sequencing.md) |
| Addressable accounts | 400–1,200 / market | Bottoms-up estimate of mid-to-large CPG/F&B/beauty accounts |
| Annual capture rate | 4% of addressable | Conservative enterprise land rate |
| Entry-year ramp | 0.5 | Half-year effective in the launch year |
| NRR | 112% | Target ≥110% via 4 upsell levers (markets/categories/usage/seats) |

## Blended ACV by market (computed)
| Market | Price idx | Blended ACV |
|---|---|---|
| SEA | 0.55 | ~$20.3K |
| India | 0.45 | ~$12.9K |
| US | 1.00 | ~$79.1K |
| W. Europe | 0.90 | ~$62.3K |
| Japan/Korea | 0.82 | ~$56.7K |

## Base-case output (default assumptions)
| Year | Total ARR |
|---|---|
| Y1 | ~$0.3M |
| Y2 | ~$2.8M |
| Y3 | **~$9.2M** |
| Y4 | ~$18.1M |
| Y5 | **~$28.0M** |

3-yr cumulative **new** ARR ≈ **$8.8M**.

## How it ties to the SOM
The SOM in [`02`](02-assumptions-and-data-sources.md)/[`08`](08-competitive-benchmark.md) is an
*outer bound* (~$30–60M, 3-yr). This base case is deliberately **conservative** (4% capture,
112% NRR) and lands below it — a realistic ramp, not a ceiling. Raising capture rate and NRR in
either tool walks ARR up toward the SOM band, which is exactly the sensitivity a reviewer wants
to see.

## Sensitivity (try these in the app)
- **Capture 4% → 7%** roughly doubles Y5 ARR — go-to-market efficiency is the biggest lever.
- **NRR 112% → 120%** compounds hardest in later years — retention/expansion beats acquisition over time.
- **US entry pulled to Y1** front-loads ARR (highest blended ACV) but raises CAC risk — the tension the sequencing manages.
