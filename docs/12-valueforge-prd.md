# Deliverable B — ValueForge Product Requirements (PRD) + Wireframe

**Product:** ValueForge — a product-strategy copilot for CPG brand managers, built on Ai Palette's
trend-intelligence and generative-concepting engine.
**Companion artifact:** interactive wireframe → [`wireframe/index.html`](../wireframe/index.html) (open in a browser).
*Naming: ValueForge is the brand-manager-facing product within the broader MarketPulse strategy.*

---

## 1. Problem
Brand managers are **data-rich but decision-poor**. Trend tools surface endless signals but stop
at charts; turning a signal into a *defensible, launch-ready* concept takes weeks of analyst and
agency work, and most CPG launches still underperform. They need a recommendation they can sign
off — not another dashboard.

## 2. Target user & JTBD
- **Primary:** CPG Brand / Innovation Manager — owns the NPD pipeline and launch P&L, not the data stack.
- **Secondary:** Insights/Strategy Lead — validates rigor and data provenance.
- **Buyer:** Head of Innovation / CMO — cares about hit-rate and speed-to-market.
- **Job to be done:** *"When a new trend emerges, help me decide what to launch, for whom, and why it will resonate — with evidence I can defend to leadership."*

## 3. The user flow (what the wireframe shows)
```
①  BRIEF      → scope the decision (brand · market · category · objective · constraints)
②  SENSE      → live local trend signals (e-com, menus, recipes, social, search)
③  SYNTHESIZE → cluster into consumer needs; map need-intensity × white-space (launch zone)
④  CREATE     → generate on-brand concepts (Concept Genie) for launch-zone needs
⑤  SCREEN     → rank concepts by predicted resonance with EXPLAINABLE drivers
⑥  BRIEF OUT  → decision-ready strategy brief (recommendation + evidence + next step) → export
```
This is the "logical framework → consumer-resonance mapping → decision-ready output" arc, made
clickable. Each step narrows with evidence; only **white-space** concepts advance.

## 4. Functional requirements
| # | Requirement | Priority |
|---|---|---|
| F1 | Create a scoped **brief** (brand, market/Market-Pack, category, objective, constraints, audience) | P0 |
| F2 | **Sense:** pull live signals for the scope; show momentum, source mix, freshness, data-point count | P0 |
| F3 | **Synthesize:** cluster signals into named consumer needs; plot need-intensity × competitive white-space | P0 |
| F4 | **Create:** generate on-brand concepts per launch-zone need, respecting constraints (e.g., halal, ambient) | P0 |
| F5 | **Screen:** resonance score per concept **with driver decomposition** (SHAP-style) + target segment | P0 |
| F6 | **Brief:** assemble a decision-ready brief (recommendation, KPIs, why-it-resonates, evidence, risks) | P0 |
| F7 | **Export / share / push** to PDF/deck, sign-off, or NPD stage-gate | P1 |
| F8 | **Explainability everywhere** — every score traceable to signals & drivers (provenance) | P0 |
| F9 | **Market-Pack aware** — language/data/taxonomy/compliance scoped per market | P1 |
| F10 | **Tiered access** — Essentials (self-serve) → Enterprise (governance, integrations) | P1 |

## 5. Non-functional requirements
Trust/auditability (every number sourced), speed (brief → recommendation in minutes), data
residency/compliance per region (gates Enterprise), and role-based governance for multi-team CPGs.

## 6. Screens (in the wireframe)
1. **Brief intake** — form scoping the decision; shows the active Market Pack.
2. **Sense** — trend cards with momentum + a signal-quality panel.
3. **Synthesize** — the need-intensity × white-space 2×2 with plotted needs; launch zone highlighted.
4. **Create** — generated concept cards tagged by zone.
5. **Screen** — ranked resonance table with SHAP-style driver bars + segment.
6. **Decision brief** — the recommendation, KPIs, evidence/assumptions, and export/share/push actions.

## 7. Success metrics
- **Time-to-decision:** weeks → < 1 day (north-star).
- **Adoption:** briefs created / brand manager / quarter.
- **Trust:** % recommendations exported & taken to stage-gate.
- **Outcome (lagging):** launch hit-rate uplift vs. baseline.

## 8. How this connects to the strategy
ValueForge is the *product surface*; the MarketPulse strategy is *how it scales commercially* —
the three tiers (doc 04), hybrid pricing (doc 05), GTM motion (doc 06), market sequencing
(doc 07), and the explainable/optimal decision engine (doc 11) all wrap this product. The
wireframe's "explainable resonance" mirrors the SHAP work; the Market-Pack concept mirrors the
localization matrix (doc 03).
