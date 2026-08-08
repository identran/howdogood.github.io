# How Do Good? — v2 Redesign Plan: Data-Driven Good

Drafted 2026-08-08. Status: **approved direction, not yet implemented.**

## 1. Vision

Shift from "random acts of kindness" to **evidence-ranked acts of kindness and
moral courage**. The site answers one question better than anyone else:

> "What is the most good I can do with the resources I actually have —
> $10, one hour, one uncomfortable conversation?"

Every recommended action carries a **data story**: what it costs (money, time,
courage), what it achieves (lives saved, DALYs averted, CO₂ avoided, dollars of
social value), how strong the evidence is, and where the numbers come from.
Interactive charts make the data explorable rather than preachy.

This is the effective-altruism insight ("interventions differ in impact by
100x+") applied to everyday actions, presented for normal people rather than
EA insiders — nobody currently occupies that niche well.

## 2. Why this also serves the revenue goal

- **Data content is link-bait.** "We ranked 50 good deeds by impact per dollar"
  earns shares, backlinks and press in a way generic kindness lists never will.
  This directly feeds the traffic-first monetization model (docs/MONETIZATION.md).
- Charts and rankings are endlessly repostable on social (each chart = a post).
- A data-credible site can eventually attract sponsorships from aligned orgs
  (effective charities, B-corps) at real prices — because we'll have traffic
  data AND a brand advertisers want to be next to.

## 3. Content & data model

### 3.1 The action dataset (core asset)

Hand-curated JSON (later possibly a headless CMS), one record per action:

```json
{
  "id": "malaria-net-donation",
  "title": "Donate $10 to a top-rated malaria charity",
  "kind": "donation",                    // donation | time | courage | habit
  "categories": ["health", "global"],
  "cost_usd": 10,
  "time_minutes": 5,
  "courage_level": 1,                    // 1-5: how uncomfortable/brave
  "impact": {
    "metric": "fraction of a life saved",
    "value": 0.002,                      // 10 / ~5000 per life saved
    "usd_equivalent": null,
    "explanation": "GiveWell estimates $3,000-$5,500 per life saved for its top charities; $10 buys roughly 2 insecticide-treated nets.",
    "confidence": "high"                 // high | medium | low
  },
  "sources": [
    {"name": "GiveWell cost-effectiveness", "url": "https://www.givewell.org/how-much-does-it-cost-to-save-a-life", "accessed": "2026-08-08"}
  ],
  "act_now_url": "https://www.againstmalaria.com/"
}
```

### 3.2 Seed content (Phase B target: ~40 actions, all cited)

- **Donations**: malaria nets (~$3k-5.5k/life, GiveWell), vitamin A
  supplementation, deworming, GiveDirectly cash transfers (benchmark 1x),
  Founders Pledge climate picks ($/tCO₂ averted).
- **Time**: blood donation (1 donation → up to 3 patients helped, ~1 hr),
  registering as organ donor (1 donor → up to 8 lives, 2 min), platelet
  donation, volunteering benchmarks (Independent Sector values a volunteer
  hour ≈ $33), tutoring/mentoring (effect sizes from education research),
  learning CPR (bystander CPR roughly doubles cardiac-arrest survival).
- **Moral courage** (the differentiator — almost nobody ranks these):
  bystander intervention (evidence on interruption of harassment),
  speaking up about mistakes at work (patient-safety data from healthcare),
  reporting fraud, donating blood during shortages, having the "are you OK?"
  conversation (suicide-prevention evidence on asking directly), voting and
  civic participation.
- **Habits**: reduced beef consumption (kg CO₂e/yr), cold-water washing,
  recurring micro-donations.

Every number carries source + access date + confidence grade. Where evidence is
weak we SAY so — the honesty is the brand.

### 3.3 Data pipeline

GitHub Pages is static, so data refresh happens at **build time**:

- `data/actions.json` — curated, versioned in git (the source of truth).
- `scripts/fetch-data.mjs` — Node script pulling refreshable series
  (e.g. Our World in Data CSV endpoints for context charts like global malaria
  deaths over time) into `data/generated/`.
- A monthly GitHub Actions cron runs the fetch script and opens a PR when
  numbers change — data updates stay reviewable, never silent.

## 4. Technology migration (required for bklit)

[bklit-ui](https://bklit.com/) is an open-source React chart library built on
shadcn/ui (17+ chart types — bar, scatter, sankey, gauge, heatmap, choropleth —
plus a studio for tuning charts and exporting recordings). Adopting it means
the site must become a React app:

- **Framework**: Vite + React (static export). Simple, fast, GitHub
  Pages-friendly. (Next.js static export is the alternative if we later want
  more pages/routing conventions; Vite is enough for now.)
- **Styling**: Tailwind CSS + shadcn/ui — bklit's native habitat. The current
  hand-written CSS gets retired; the palette carries over as Tailwind theme
  tokens.
- **Charts**: bklit-ui components; use the bklit Studio to prototype each
  chart's look, then copy the generated React code.
- **Deploy**: GitHub Actions workflow `build → actions/deploy-pages`
  (NOTE: Pages currently serves the master branch root directly; the migration
  switches Pages source to "GitHub Actions". The old broken gh-pages workflow
  was already removed — do not resurrect it.)
- **Migration safety**: build the v2 app in a `v2/` directory (or `redesign`
  branch) until feature parity, then cut over in one deploy. The current site
  stays live throughout.

## 5. Information architecture (v2)

1. **Home — "The Impact Explorer"**: headline question ("How much good can you
   do today?") + two controls (money slider $0–100, time slider 0–120 min,
   courage toggle) → ranked action cards with impact numbers. One bklit
   scatter chart: **effort (x) vs impact (y)** — the "impact frontier" — each
   dot an action, click to open it.
2. **Action detail pages** (one URL per action — the SEO doors): the claim,
   the chart(s), the math written in plain language, confidence grade, sources,
   and a single "Do it now" button. Share card per action.
3. **Rankings** ("Most good per $10", "Most good per hour", "Courage that
   counts") — listicle-shaped, chart-headed, highly linkable.
4. **The Data** — methodology page: where numbers come from, what DALY/WELLBY
   mean (explained with a bklit gauge/ring), our confidence grading, all
   sources. Credibility lives here.
5. **Classifieds / Get Listed** — carried over as-is (revenue continuity).
6. **Kindness generator** — kept as a playful widget ("Surprise me"), now
   drawing from the rated dataset and showing each act's impact line.

## 6. Aesthetics

- **Keep**: the calm, dark, Obsidian-like identity (it photographs well on
  social and matches bklit's design-engineered look). Palette maps to Tailwind
  tokens: bg #1e1e1e / surface #262626 / sage accent #7c9885 / lavender
  highlight #b4a7d6.
- **Change**: from centered-poem layout to a data-editorial layout — big
  numbers, generous whitespace, Inter for UI + a serif display face for
  headlines (an FT/OWID-style "numbers journalism" feel).
- **Charts as the hero**: every major page leads with one honest, beautiful
  chart. Motion: bklit's animation controls, subtle; respect
  prefers-reduced-motion (already a site value).
- **Tone**: warm, plain-spoken, non-judgmental. "Here's what the data says;
  do what fits your life."

## 7. Phased roadmap

| Phase | Deliverable | Effort |
|---|---|---|
| **A — Scaffold** | Vite+React+Tailwind+shadcn+bklit app in `v2/`, dark theme tokens, nav, deploys to a preview | 1 session |
| **B — Dataset v1** | ~40 cited actions in `data/actions.json` + methodology page copy | 1–2 sessions (research-heavy) |
| **C — Explorer UI** | Home sliders + ranked cards + impact-frontier scatter | 1–2 sessions |
| **D — Detail & rankings pages** | Per-action pages w/ charts, 3 ranking pages, share cards | 1–2 sessions |
| **E — Cutover** | Port classifieds/get-listed, 301-safe URLs, switch Pages to Actions deploy, submit new sitemap | 1 session |
| **F — Data ops** | OWID fetch script + monthly refresh cron PR | 1 session |

Sessions ≈ working sessions with Claude. A → F is realistically 2–4 weeks of
part-time work.

## 8. Risks & honesty notes

- **Impact numbers are contested.** Mitigation: confidence grades, show ranges
  not false precision, methodology page, link every claim to its source.
- **React migration breaks the "edit one HTML file" simplicity.** Accepted —
  the data explorer can't be built credibly without componentized charts.
- **Scope creep.** The dataset is the moat; ship Phase B before making charts
  prettier.
- **bklit is young OSS.** If it stalls, the charts sit behind our own thin
  wrappers so swapping to Recharts/visx is contained.
