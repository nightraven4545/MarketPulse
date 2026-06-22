<div align="center">

# 🌐 MarketPulse

### Ai Palette — Multi-Market Expansion & Monetization Strategy

*Moving a monolithic AI-insights platform to a **tiered, localizable, repeatably-priced** product — built to scale across global markets without exploding operational complexity.*

![Focus](https://img.shields.io/badge/focus-Product%20%26%20Commercial%20Strategy-1F3864)
![Phase 1](https://img.shields.io/badge/Phase%201-Localization%20%26%20Tiering-2E5496)
![Phase 2](https://img.shields.io/badge/Phase%202-Monetization%20%26%20GTM-2F9E8F)
![Decision Science](https://img.shields.io/badge/decision%20science-MDP%20%2B%20SHAP-385723)
![Figures](https://img.shields.io/badge/figures-illustrative%20%C2%B7%20benchmark--anchored-C8860D)

**[📊 Deliverables](DELIVERABLES.md) · [🎞 Executive Deck](deliverables/DeliverableA_Executive_Presentation.pptx) · [🧮 Commercial Architecture](deliverables/DeliverableB_Commercial_Architecture.xlsx) · [📈 ARR Model](arr-model/) · [🧠 Decision Science](decision-science/) · [🖥 Dashboard](dashboard/index.html)**

</div>

---

**Prepared by:** Product Strategy Taskforce  ·  **Subject:** [Ai Palette](https://www.aipalette.com/) — AI-powered consumer-insights & product-innovation platform (Singapore, ~$13.5M raised; customers incl. Nestlé, Danone, Kellogg's, Cargill, Olam).

> **Status / disclaimer:** Conceptual strategy from secondary research + clearly-labeled assumptions. Ai Palette is **private** — no audited financials or SEC filings exist, so every figure here is an *estimate anchored to public benchmarks* ([audit trail →](docs/02-assumptions-and-data-sources.md)).

---

## The problem in one line
Entering new markets with one undifferentiated product over-localizes everything (engineering bloat) or under-localizes (lost deals). MarketPulse defines **exactly what to standardize vs. localize, how to package it into tiers, how to price it per market, and which sales motion delivers it** — then wraps that in a repeatable decision engine.

## What's in this repo

| Path | What it is |
|------|-----------|
| [`docs/01-context-and-problem.md`](docs/01-context-and-problem.md) | Business context, the expansion blind spot, scope |
| [`docs/02-assumptions-and-data-sources.md`](docs/02-assumptions-and-data-sources.md) | **Every estimate is traceable here** — sources + estimation method |
| [`docs/03-phase1-localization-matrix.md`](docs/03-phase1-localization-matrix.md) | Phase 1 — what stays global vs. what gets localized |
| [`docs/04-phase1-feature-tiering.md`](docs/04-phase1-feature-tiering.md) | Phase 1 — Essentials / Growth / Enterprise tier logic |
| [`docs/05-phase2-pricing-packaging.md`](docs/05-phase2-pricing-packaging.md) | Phase 2 — pricing model, packaging, willingness-to-pay |
| [`docs/06-phase2-gtm-onboarding.md`](docs/06-phase2-gtm-onboarding.md) | Phase 2 — PLG vs. sales-led motion & onboarding |
| [`docs/07-market-sequencing.md`](docs/07-market-sequencing.md) | Scored market prioritization & 3-wave entry plan |
| [`docs/08-competitive-benchmark.md`](docs/08-competitive-benchmark.md) | Competitor benchmark, positioning 2×2, market structure, consolidation signal |
| [`docs/09-strategy-memo.md`](docs/09-strategy-memo.md) | **Consulting strategy memo** (SCQA + Pyramid Principle + frameworks) — markdown source |
| [`docs/10-arr-model-methodology.md`](docs/10-arr-model-methodology.md) | **Bottoms-up ARR model** methodology, defaults, base case & sensitivity |
| [`docs/11-decision-science.md`](docs/11-decision-science.md) | **MDP** entry-sequencing + **SHAP-style** score explainability (the rigorous core) |
| [`workflow/market-entry-automation.md`](workflow/market-entry-automation.md) | The **automated market-entry decision engine** (rubric + flow) |
| [`docs/12-valueforge-prd.md`](docs/12-valueforge-prd.md) | **ValueForge PRD** (Deliverable B) — product requirements + user flow |
| [`dashboard/index.html`](dashboard/index.html) | **Interactive solution dashboard** — open in a browser (Chart.js visualizations) |
| [`wireframe/index.html`](wireframe/index.html) | **ValueForge interactive wireframe** (Deliverable B) — clickable brand-manager flow |
| [`arr-model/`](arr-model/) | **Interactive ARR model** — Streamlit app (`streamlit run app.py`) with tornado + live MDP |
| [`decision-science/`](decision-science/) | **MDP solver + SHAP-style explainer** (Python; generates the decision plot & policy chart) |
| [`DELIVERABLES.md`](DELIVERABLES.md) | **Master index** of every deliverable mapped to the brief |
| [`frameworks/`](frameworks/) | Machine-readable CSVs: localization, tiering, pricing, market scoring, competitor benchmark |
| [`deliverables/`](deliverables/) | The four graded outputs (see below) |

## The deliverables
- **Deliverable A — Executive Presentation** — rich editable **PowerPoint** (`deliverables/DeliverableA_Executive_Presentation.pptx`, 17 slides, embedded data-viz) + PDF: market sequencing, pricing & packaging, standardization↔localization trade-offs, with quantified charts (TAM funnel, competitor 2×2, localization split, market scores, pricing, regional WTP, ARR build, tornado, SHAP, MDP).
- **Deliverable B — Commercial Architecture** (`deliverables/DeliverableB_Commercial_Architecture.xlsx`): 8-tab workbook with **live formulas** mapping tiers × markets × localized features × monetization, plus the decision engine.
- **Consulting Strategy Memo** (`deliverables/MarketPulse_Strategy_Memo.docx`): McKinsey/BCG-style narrative — SCQA, Pyramid Principle, 3C, Porter, Ansoff, value chain, GE-McKinsey, risk register, 90-day plan.
- **Interactive Solution Dashboard** (`dashboard/index.html`): structured, filterable visualizations — market scores, TAM/SAM/SOM, positioning 2×2, localization split, pricing, GTM, and the 3-wave roadmap.
- **ARR Model** — interactive **Streamlit app** (`arr-model/app.py`, now with a tornado sensitivity chart + a live MDP cold-start slider) + matching **Excel model** (`deliverables/DeliverableC_ARR_Model.xlsx`, live formulas). Base case ≈ **$9.2M Y3 / $28M Y5 ARR**.
- **ValueForge Product Strategy Deck** — editable **PowerPoint** (`deliverables/DeliverableA_ValueForge_Product_Strategy_Deck.pptx`, native charts) + PDF: 9-slide consultant-style deck — problem, target user, differentiation logic & consumer-resonance mapping, with quantified visuals.
- **ValueForge PRD + Wireframe** (`docs/12-valueforge-prd.md` + `wireframe/index.html`): requirements and a clickable brand-manager flow ending in a decision-ready strategy brief.
- **Judge's Cheat Sheet** (`deliverables/MarketPulse_Judges_CheatSheet.pdf`): the entire story on one page.

See **[`DELIVERABLES.md`](DELIVERABLES.md)** for the full index mapped to the brief.

## Headline recommendations (TL;DR)
1. **Localize the thin edge, standardize the engine.** Keep the AI/ML core, data pipeline, and concept-generation global; localize only the data *sources*, language/NLP, taxonomy, compliance, and GTM workflow. ~80% of code stays shared.
2. **Three tiers** — *Essentials* (self-serve trend discovery), *Growth* (insights + concepts), *Enterprise* (end-to-end + localization + workflow integration) — mapped to enterprise maturity.
3. **Hybrid pricing**: platform subscription (anchor) + usage/credits (Concept Genie runs, markets, categories) + seats as an expansion lever. Pure per-seat is fading; hybrid posts the highest growth in 2025 benchmarks.
4. **Motion follows ACV**: PLG-assisted for Essentials (ACV <$10K), sales-led for Enterprise (ACV >$25K, committee buying). Hybrid in between.
5. **Sequence**: Wave 1 deepen SEA + India (home advantage), Wave 2 attack US (highest willingness-to-pay), Wave 3 EU + Middle East. Driven by the scoring rubric, not gut feel.

## How to use / push this repo
```bash
cd marketpulse-strategy
git init
git add .
git commit -m "MarketPulse: Ai Palette expansion & monetization strategy"
git branch -M main
git remote add origin https://github.com/<you>/marketpulse-strategy.git
git push -u origin main
```
See [`docs/02`](docs/02-assumptions-and-data-sources.md) for the disclaimer to keep visible to evaluators: *numbers are illustrative, defensible estimates — not company-reported figures.*
