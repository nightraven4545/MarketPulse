# Automated Market-Entry Decision Engine

**What this is:** the repeatable "strategy as a workflow" the brief asks for. Instead of
re-deciding everything for each new market, MarketPulse turns market entry into a **scored
intake → automated decisions → provisioning** pipeline. Same logic every time; only the
inputs change.

## The pipeline (end to end)
```
 ┌─────────────┐   ┌──────────────┐   ┌───────────────┐   ┌────────────────┐   ┌─────────────┐
 │ 1. INTAKE   │ → │ 2. SCORE     │ → │ 3. DECIDE     │ → │ 4. PROVISION   │ → │ 5. MONITOR  │
 │ market data │   │ weighted     │   │ tier mix,     │   │ ship Market    │   │ KPIs, expand│
 │ signals     │   │ rubric (doc7)│   │ price, motion │   │ Pack + GTM     │   │ or exit     │
 └─────────────┘   └──────────────┘   └───────────────┘   └────────────────┘   └─────────────┘
```

## Step 1 — Intake (gather the signals)
For any candidate market, collect: WTP proxy (GDP/IT-spend density), target-account count,
existing language/data coverage, competitive presence, regulatory regime (GDPR/PDPA/DPDP/none),
and partner availability. *(Automatable via enrichment sources; today done as a checklist.)*

## Step 2 — Score (the rubric from doc 07)
Run the weighted scoring rubric. Output = a 0–5 score and component breakdown.

## Step 3 — Decide (deterministic rules, not opinions)
The engine maps the scored inputs to commercial decisions via explicit rules:

**Localization depth (which Market Pack components to ship):**
| Condition | Action |
|---|---|
| Language not yet covered | Build language/NLP pack (else reuse) |
| Regulated data regime (GDPR/PDPA/DPDP) | Activate compliance + residency profile (gates Enterprise) |
| High account density | Build deep category taxonomy + brand reference set |
| Low density / exploratory | Ship minimal pack; lead with Essentials only |

**Tier emphasis & price (from docs 04–05):**
| Condition | Lead tier | Price multiplier |
|---|---|---|
| High WTP (US/W.Eur) | Enterprise | 0.85–1.00 |
| Mid WTP (JP/KR) | Enterprise via partner | 0.75–0.90 |
| Low WTP (SEA/India) | Growth + Essentials | 0.35–0.65 |

**GTM motion (from doc 06 — motion follows ACV):**
| Condition | Motion |
|---|---|
| Target ACV < $10K / price-sensitive | PLG-assisted (self-serve + sample report funnel) |
| Target ACV $25–60K | Hybrid (PLG → AE) |
| Target ACV > $80K / committee buying | Sales-led (AE+SE+CSM) |
| High-service, relationship market | Add channel partner |

## Step 4 — Provision (turn the decision into setup)
Output a **Market Entry Bundle**: the Market Pack to ship (language/data/taxonomy/compliance),
the tier menu + localized price list, the assigned GTM motion + onboarding playbook, and the
support config. This is a *configuration*, not an engineering project (the config-not-code
firewall, doc 03).

## Step 5 — Monitor (expand or exit)
Track per market: activation rate, ACV, CAC payback (≤12–18mo), NRR (≥110%), support
cost-to-serve. Feed results back into the score. Markets that beat thresholds get more
investment; laggards drop to partner/inbound-only. **The loop is the strategy.**

## Decision table (the engine in one place)
| Market signal | → Localization | → Tier/price | → Motion |
|---|---|---|---|
| New language, low density, low WTP | Minimal pack | Essentials, 0.4–0.6× | PLG-assisted |
| Covered language, mid density, mid WTP | Standard pack + taxonomy | Growth-led, 0.6–0.9× | Hybrid |
| Regulated, high density, high WTP | Full pack + residency + integrations | Enterprise, 0.85–1.0× | Sales-led |
| High-service relationship market | Standard pack | Enterprise via partner, 0.75–0.9× | Partner/channel |

## How to actually automate this (build options)
1. **Spreadsheet engine (today):** the scoring + decision tables live in Deliverable B
   (`DeliverableB_Commercial_Architecture.xlsx`) — change a market's inputs, the recommended
   tier/price/motion update via formulas. Zero engineering.
2. **No-code workflow (next):** Airtable/Notion intake form → scoring formula → auto-generated
   Market Entry Bundle; or a Zapier/Make flow that enriches inputs and posts the bundle to Slack.
3. **Productized (later):** an internal "Market Launchpad" microservice that provisions a Market
   Pack from the decision output — entitlements, price book, and onboarding playbook created
   automatically.

A visual of the same flow is in [`assets/`](../assets/) and on the Workflow slide of Deliverable A.
