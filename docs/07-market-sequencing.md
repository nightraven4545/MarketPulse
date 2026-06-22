# 07 — Market Entry Sequencing (the scored model)

**Goal:** decide *which markets, in what order* — using a transparent weighted score, not gut
feel. This is also the input to the [automated decision engine](../workflow/market-entry-automation.md).

## Scoring rubric
Six criteria, weighted by how much they drive sustainable, efficient revenue. Each market is
scored **1–5** (5 = most attractive). "Inverse" criteria are scored so that *less* load = a
*higher* score.

| Criterion | Weight | What it captures |
|---|---|---|
| Revenue potential (WTP × account density) | 30% | How much money is realistically here |
| Data & localization readiness | 20% | Do we already have language/data coverage? (18 langs / 24 countries today) |
| Strategic / home-region advantage & speed-to-land | 15% | Existing presence, references, speed |
| Competitive intensity *(inverse)* | 15% | Less entrenched competition = better |
| Regulatory / compliance load *(inverse)* | 10% | GDPR/residency burden to sell |
| Cost-to-serve / operational feasibility *(inverse)* | 10% | Field-sales cost, support hours, partners needed |

## Scores (illustrative, benchmark-anchored — see doc 02)
| Market | Rev (30%) | Data-ready (20%) | Home adv (15%) | Comp⁻¹ (15%) | Reg⁻¹ (10%) | Cost⁻¹ (10%) | **Weighted** | Rank |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| **SEA** | 3 | 5 | 5 | 4 | 4 | 4 | **4.05** | 1 |
| **India** | 3 | 5 | 5 | 4 | 3 | 4 | **3.95** | 2 |
| **US** | 5 | 4 | 2 | 2 | 4 | 3 | **3.60** | 3 |
| **W. Europe** | 4 | 4 | 2 | 3 | 2 | 3 | **3.25** | 4 |
| **Japan/Korea** | 4 | 3 | 3 | 3 | 3 | 2 | **3.20** | 5 |
| **Middle East** | 3 | 2 | 3 | 4 | 3 | 3 | **2.95** | 6 |
| **LATAM** | 2 | 2 | 2 | 4 | 3 | 3 | **2.50** | 7 |

*(Weighted = Σ score×weight. Live, recomputable version in
[`frameworks/market-scoring.csv`](../frameworks/market-scoring.csv) and Deliverable B.)*

## The 3-wave entry plan
The score says "home first," but absolute revenue says "don't ignore the US." We reconcile
both: **defend and deepen the home region first (fast, cheap, high data-readiness), then attack
the highest-value market, then broaden.**

### Wave 1 (0–9 months) — **Deepen SEA + India** *(home advantage)*
- Highest data-readiness and lowest cost-to-serve; we already cover these languages/markets.
- Motion: Growth-led with Essentials to widen the funnel; PLG-assisted; partners optional.
- Goal: reference logos, dense category/taxonomy packs, prove land-and-expand mechanics.

### Wave 2 (6–18 months) — **Attack the US** *(highest revenue per logo)*
- Lower blended score (tough competition, no home advantage) **but** highest WTP and where
  global CPG HQs sit — landing a US HQ pulls through other markets via the same account.
- Motion: sales-led Enterprise + PLG funnel. Invest in field sales here specifically.
- Goal: anchor ACV, validate Enterprise tier + integrations + compliance selling.

### Wave 3 (18–30 months) — **Broaden: W. Europe + Japan/Korea**
- W. Europe: compliance/residency already built for US enterprise → turn GDPR into a selling
  point. Japan/Korea: **partner/channel-led** to control the high service overhead.
- Goal: geographic diversification of revenue; partner playbook proven.

### Later / opportunistic — Middle East, LATAM
- Enter via inbound or partner only; revisit when score improves (data-readiness, account density).

## Why this sequence is defensible
- **Speed & efficiency first:** Wave 1 markets are cheapest to win and already supported → fast references, low CAC.
- **Value next:** Wave 2 puts the expensive sales motion only where ACV justifies it.
- **Leverage compounding:** compliance built for the US is reused in Europe; partner model built for Japan is reused in MEA. Each wave makes the next cheaper — exactly what the [market pack](03-phase1-localization-matrix.md) + [automation](../workflow/market-entry-automation.md) enable.
