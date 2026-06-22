# MarketPulse — Bottoms-up ARR Model (Streamlit)

Interactive revenue model for Ai Palette's multi-market expansion. Move the sliders, watch the
5-year ARR build respond. Mirrors the Excel model in `deliverables/` — same logic, same defaults.

> **Disclaimer:** Ai Palette is private; there are no public financials. Every input is an
> illustrative, benchmark-anchored assumption you control. The value is the *decision logic*.

## Run locally
```bash
cd arr-model
python -m venv .venv && source .venv/bin/activate   # (Windows: .venv\Scripts\activate)
pip install -r requirements.txt
streamlit run app.py
```
Opens at http://localhost:8501.

## Deploy free (Streamlit Community Cloud)
1. Push this repo to GitHub.
2. Go to share.streamlit.io → "New app" → pick your repo → set **main file path** to
   `marketpulse-strategy/arr-model/app.py`.
3. Deploy. (It auto-installs `requirements.txt`.)

## The model in one paragraph
For each market: **new logos = addressable accounts × annual capture rate** (the entry year is
scaled by a ramp factor). **New ARR = new logos × blended ACV**, where **blended ACV = regional
price index × Σ(tier-mix × tier ACV)**. ARR compounds via **End ARR = prior ARR × NRR + new ARR**.
Markets switch on by entry year (Wave 1: SEA, India · Wave 2: US · Wave 3: W. Europe, Japan/Korea).

## What you can tune
Tier ACVs, annual capture rate, entry-year ramp, NRR, and per-market addressable accounts. Push
capture rate and NRR up to see Ai Palette approach the upper SOM band (~$30–60M, 3-yr).

## Levers → which strategy doc they come from
- Tier ACVs & price index → `docs/05-phase2-pricing-packaging.md`
- Tier mix by market → `docs/04-phase1-feature-tiering.md` + `docs/07-market-sequencing.md`
- Entry waves → `docs/07-market-sequencing.md`
- NRR target (110%+) → the four upsell levers in `docs/04` / `docs/05`
