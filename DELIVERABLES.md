# Deliverables Index

Everything in one place, mapped to what graders ask for. *(Ai Palette is private — all financials
are illustrative, benchmark-anchored estimates. Naming: **ValueForge** = the brand-manager-facing
product; **MarketPulse** = the expansion & monetization strategy around it.)*

## ⭐ Headline deliverables
| # | Deliverable | File | What it is |
|---|---|---|---|
| A | **ValueForge Product Strategy Deck** (9 slides) | **[`.pptx`](deliverables/DeliverableA_ValueForge_Product_Strategy_Deck.pptx)** (editable, native charts) · [`.pdf`](deliverables/DeliverableA_ValueForge_Product_Strategy_Deck.pdf) | Consultant-style: problem, target user, differentiation logic & consumer-resonance mapping — with quantified charts |
| B | **ValueForge PRD + Wireframe** | [`docs/12-valueforge-prd.md`](docs/12-valueforge-prd.md) + [`wireframe/index.html`](wireframe/index.html) | Requirements + clickable brand-manager flow → decision-ready strategy |
| — | **Judge's Cheat Sheet** (1 page) | [`deliverables/MarketPulse_Judges_CheatSheet.pdf`](deliverables/MarketPulse_Judges_CheatSheet.pdf) | The whole story on one page |

## ⭐ Core graded deliverables (the case as actually briefed)
| # | Deliverable | File | What it is |
|---|---|---|---|
| **A** | **Executive Presentation** | **[`.pptx`](deliverables/DeliverableA_Executive_Presentation.pptx)** (17 slides, rich data-viz) · [`.pdf`](deliverables/DeliverableA_Executive_Presentation.pdf) (14-slide) | Market-entry sequencing · pricing & packaging · standardization↔localization trade-offs — with embedded charts, quantification & decision science |
| **B** | **Commercial Architecture** | [`.xlsx`](deliverables/DeliverableB_Commercial_Architecture.xlsx) (8 tabs, live formulas) | The framework mapping product tiers × localized features × monetization across prioritized markets |
| Consulting Strategy Memo | [`deliverables/MarketPulse_Strategy_Memo.docx`](deliverables/MarketPulse_Strategy_Memo.docx) | SCQA + Pyramid Principle + frameworks |
| ARR Model | [`deliverables/DeliverableC_ARR_Model.xlsx`](deliverables/DeliverableC_ARR_Model.xlsx) + [`arr-model/`](arr-model/) | Excel + Streamlit; base case ~$9.2M Y3 / ~$28M Y5 |

## Interactive & analytical
| Artifact | File | Run |
|---|---|---|
| Solution dashboard | [`dashboard/index.html`](dashboard/index.html) | open in browser |
| ARR model (interactive) | [`arr-model/app.py`](arr-model/app.py) | `streamlit run app.py` |
| MDP sequencing + SHAP explainer | [`decision-science/`](decision-science/) | `python mdp_sequencing.py` / `explain_scores.py` |

## Supporting docs (the reasoning)
`docs/01`–`12`: context · assumptions/data audit · localization matrix · feature tiering ·
pricing · GTM · market sequencing · competitive benchmark · strategy memo · ARR methodology ·
decision science (MDP+SHAP) · ValueForge PRD. Machine-readable data in [`frameworks/`](frameworks/).

## Deliverable → requirement crosswalk
- *"Product Strategy Deck (max 9 slides): core problem, target user, logical framework for differentiation & consumer resonance"* → **Deliverable A (ValueForge deck)**.
- *"PRD / Wireframe: visual prototype / user flow of a brand manager generating a decision-ready strategy"* → **Deliverable B (PRD + interactive wireframe)**.
- *"Market entry sequencing, pricing & packaging, standardization↔localization trade-offs"* → Executive Presentation + Commercial Architecture + Strategy Memo.
- *"Automated workflow"* → decision engine (`workflow/`) made rigorous by the MDP + SHAP (`decision-science/`) and operationalized in the dashboard + Streamlit.
