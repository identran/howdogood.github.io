# How Do Good? — Data Methodology

Drafted 2026-08-08. This document defines the fields in
`v2/src/data/actions.json` and becomes the copy for the site's "The Data"
page (Phase D). The dataset is the site's core asset: every recommendation
must survive the reader clicking the source link.

## What we're estimating

Each action answers: **how much good does this do, per unit of what it costs
you?** Costs come in three currencies — money (`cost_usd`), time
(`time_minutes`), and courage (`courage_level`, 1-5). Impact is recorded in
the most honest natural unit available (`impact.metric` + `impact.value`),
never force-converted into a single universal number.

## Why we don't publish one universal unit

Serious evaluators use lives saved, DALYs (disability-adjusted life years),
WELLBYs (wellbeing-adjusted life years), tonnes CO2e, or standard deviations
of learning — and converting between them requires value judgments we'd rather
expose than hide. So each action keeps its native metric, the conversion
reasoning lives in `impact.explanation` in plain language, and comparability
comes from the editorial score (below).

## The confidence grades

- **high** — meta-analyses, RCTs, or estimates from evaluators that publish
  their full models (GiveWell, Our World in Data, peer-reviewed studies).
- **medium** — credible single organizations' claims, contested research
  areas, or well-evidenced mechanisms with less-quantified magnitudes.
- **low** — plausible and directionally supported, but the honest answer is
  "we can't quantify this well." Low-confidence actions stay on the site only
  when the cost is near zero.

When evidence is contested (e.g. deworming's long-run effects), we say so in
the explanation rather than picking a side silently.

## The score (0-100)

`score` is an **editorial synthesis, not a measurement**: our judgment of
impact per unit of resource, on a common 0-100 scale, considering magnitude,
confidence, and neglectedness. Two rules keep it honest:

1. The underlying metric, explanation, and confidence grade are always shown
   next to it — the score never appears alone.
2. Changes to scores are versioned in git with reasons in the commit message.

Rough calibration: 90+ = exceptional impact per resource with strong evidence
(GiveWell-tier donations; 2-minute organ donor registration); 60-80 = strongly
positive with real evidence; 40-60 = worthwhile, weaker quantification; below
40 we generally don't list.

## Courage levels

1. Comfortable for nearly everyone.
2. Mild awkwardness or unfamiliarity (first blood donation).
3. Real social or emotional effort (crisis line, apologizing).
4. Genuinely hard conversations or public intervention (asking about suicide,
   confronting harassment, taking someone's keys).
5. Personal risk to livelihood or relationships (whistleblowing).

Moral courage actions are the site's differentiator: their money cost is
usually zero, their impact often exceptional, and nobody else ranks them.

## Sources policy

- Every action cites ≥1 source with URL and access date (validated by
  `v2/scripts/validate-actions.mjs`, which fails the build on violations).
- Primary sources (the study, the evaluator's model) beat press coverage.
- Numbers get re-checked at least annually; `updated` in the dataset header
  records the last full review. Phase F automates refresh reminders.

## Known limitations

- U.S.-centric statistics in several actions (traffic deaths, volunteer-hour
  value, 988); international generalization varies.
- Expected-value framing can mislead for low-probability actions (organ
  registration); explanations state both the headline number and the
  probability caveat.
- "Editorial score" is a judgment. That's the honest label for what every
  ranking site does; ours is at least versioned and explained.
