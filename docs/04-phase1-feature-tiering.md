# 04 — Phase 1B: Feature Tiering Logic

**Goal:** package the platform into tiers that map to **enterprise maturity** in a region, so
a price-sensitive first-mover in a new market and a sophisticated global CPG can both buy the
*right* amount of product — without us building bespoke offers each time.

## The tiering axis: enterprise maturity, not company size
A market/account's "insights maturity" determines what they'll actually use and pay for:

| Maturity stage | Behavior | What they need |
|---|---|---|
| **Exploratory** | Ad-hoc trend curiosity, no dedicated insights team | Fast trend discovery, low commitment, self-serve |
| **Operationalizing** | Running NPD cycles, building an insights habit | Insights + concept generation + screening |
| **Industrialized** | Insights embedded in stage-gate NPD across categories/markets | End-to-end, multi-market, localized data, integrations, governance |

These three stages map cleanly onto three tiers.

## The three tiers

### Tier 1 — **Essentials** (land / PLG-assisted)
*For:* exploratory teams, smaller brands, new price-sensitive markets.
- Foresight Engine trend discovery, **limited markets/categories** (e.g., 1 market, 3 categories)
- Core dashboards, search, saved trends, basic exports
- English-first UI; local **data + language pack for the 1 chosen market**
- Self-serve onboarding, community/email support
- *Excludes:* Concept Genie volume, integrations, multi-market, advanced governance

### Tier 2 — **Growth** (the workhorse)
*For:* operationalizing teams running real NPD.
- Everything in Essentials, **multiple markets/categories**
- **Concept Genie** (capped runs/credits) + **Screen Winner** screening
- Brand SAY / FoodGPT access
- More seats, scheduled reports, priority support
- Localized taxonomy + brand reference sets for chosen markets

### Tier 3 — **Enterprise** (expand / sales-led)
*For:* industrialized global CPGs (the Nestlé/Danone profile).
- Everything in Growth, **all markets & categories**, higher/again-usage limits
- **Localized enterprise workflows**: integrations (PLM/innovation stack, SSO/SAML), API access
- **Compliance & data residency** profile (GDPR/PDPA/DPDP), security review, DPA
- Governance: roles/permissions, audit, multi-team, CSM + onboarding services, SLAs
- Custom data sources / bespoke categories as paid add-ons

## Feature × Tier map (summary)
| Feature | Essentials | Growth | Enterprise |
|---|:---:|:---:|:---:|
| Foresight Engine (trend discovery) | ◑ limited | ● | ● |
| Markets included | 1 | few | all |
| Categories included | ~3 | expanded | all |
| Concept Genie (gen-AI concepts) | — | ◑ credits | ● higher |
| Screen Winner (screening) | — | ● | ● |
| Brand SAY / FoodGPT | — | ● | ● |
| Seats | 1–3 | team | org-wide |
| Localized language/data pack | 1 market | selected | all |
| Localized taxonomy & brand sets | — | ● | ● |
| Integrations / API / SSO | — | — | ● |
| Compliance & data residency | standard | standard | ● region-specific |
| Support | self-serve/email | priority | CSM + SLA |
| Onboarding | self-serve | guided | white-glove + services |
| Motion | PLG-assisted | hybrid | sales-led |

● included ◑ limited/metered — none

## Why this prevents engineering bloat
- **One product, gated by entitlements** — tiers are *configuration of access*, not separate codebases.
- **Localization is bought, not bespoke** — depth of localization (markets, taxonomy, integrations, residency) increases *with tier*, so we only do expensive localization where revenue justifies it.
- **Maturity-based, not region-based** — a "new market" doesn't need a new product; it needs the right tier + market pack. An exploratory buyer in the US and in Vietnam both start in Essentials.

## Expansion path (land-and-expand)
Essentials → add markets/categories & Concept Genie credits → Growth → add integrations,
residency, governance → Enterprise. This is the engine of net revenue retention (target
110%+, Assumption #6): customers expand by **markets, categories, usage, and seats** — four
independent upsell levers.

Machine-readable version: [`frameworks/feature-tiering.csv`](../frameworks/feature-tiering.csv).
