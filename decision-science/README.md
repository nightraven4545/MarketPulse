# Decision Science — MDP sequencing + SHAP-style explainability

Quantitative backbone for the MarketPulse market-entry engine. Responds to the brief's hint
resources (Markov Decision Process; SHAP decision plots). Full write-up: [`docs/11`](../docs/11-decision-science.md).

## Contents
| File | What it does |
|---|---|
| `explain_scores.py` | Exact Shapley decomposition of the additive market-attractiveness score → SHAP-style decision plot, per-market waterfalls, CSV |
| `mdp_sequencing.py` | Market entry as an MDP; value iteration → optimal entry policy (naïve vs. capability-aware) + chart |
| `outputs/` | Generated PNGs + `shap_contributions.csv` |

## Run
```bash
pip install -r requirements.txt
python explain_scores.py
python mdp_sequencing.py
```

## Key results
- **SHAP:** US's strong revenue contribution is offset by weak home-advantage & high competition → why SEA/India out-rank it on blended score.
- **MDP:** naïve policy = US-first; capability-aware policy (cold-start risk priced in) = **SEA → US → W. Europe → Japan/Korea → India**, validating the Wave-1-then-US strategy.

All inputs are illustrative, benchmark-anchored assumptions (Ai Palette is private).
