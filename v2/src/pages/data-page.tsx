/*
filename: data-page.tsx
date: August 8, 2026
programmer: James Tran
title: The Data (Methodology) Page
purpose: Public methodology — what we estimate, confidence grades, the
         score's rules and limits. Web adaptation of docs/METHODOLOGY.md;
         keep the two in sync when either changes.
*/

import { Link } from "react-router-dom";
import { actions, datasetUpdated, datasetVersion } from "@/data/actions";

/* ┌──────────────────────────────────────┐
    CONTENT BLOCKS
└──────────────────────────────────────┘ */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-primary">{title}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

/* ┌──────────────────────────────────────┐
    PAGE
└──────────────────────────────────────┘ */

export function DataPage() {
  const confidenceCounts = actions.reduce<Record<string, number>>((acc, a) => {
    acc[a.impact.confidence] = (acc[a.impact.confidence] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <article className="mx-auto max-w-2xl px-6 pt-10">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        The Data
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">
        Every recommendation on this site must survive you clicking the source
        link. Here's how the numbers work — including their limits.
      </p>

      <div className="mt-6 rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
        Dataset v{datasetVersion} · {actions.length} actions · last full review{" "}
        {datasetUpdated} ·{" "}
        {confidenceCounts.high ?? 0} high / {confidenceCounts.medium ?? 0} medium /{" "}
        {confidenceCounts.low ?? 0} low confidence
      </div>

      <Section title="What we're estimating">
        <p>
          Each action answers one question: how much good does it do, per unit
          of what it costs you? Costs come in three currencies — money, time,
          and courage (graded 1-5). Impact is recorded in the most honest
          natural unit available: lives saved, children treated, tonnes of
          CO₂e, standard deviations of learning.
        </p>
      </Section>

      <Section title="Why there's no single universal unit">
        <p>
          Serious evaluators use lives saved, DALYs, WELLBYs, tonnes CO₂e, or
          learning gains — and converting between them requires value judgments
          we'd rather expose than hide. So each action keeps its native metric,
          the conversion reasoning is written in plain language, and
          comparability comes from the editorial score below.
        </p>
      </Section>

      <Section title="Confidence grades">
        <p>
          <strong className="text-primary">High</strong> — meta-analyses, RCTs,
          or estimates from evaluators that publish their full models
          (GiveWell, Our World in Data, peer-reviewed studies).
        </p>
        <p>
          <strong className="text-[color:var(--chart-3)]">Medium</strong> —
          credible single organizations' claims, contested research areas, or
          well-evidenced mechanisms with less-quantified magnitudes.
        </p>
        <p>
          <strong className="text-foreground">Low</strong> — plausible and
          directionally supported, but the honest answer is "we can't quantify
          this well." Low-confidence actions stay listed only when their cost
          is near zero.
        </p>
        <p>
          Where evidence is contested (deworming's long-run effects, for
          example), the action's own page says so instead of picking a side
          silently.
        </p>
      </Section>

      <Section title="The score (0-100)">
        <p>
          The score is an <strong className="text-foreground">editorial
          synthesis, not a measurement</strong>: our judgment of impact per
          unit of resource, considering magnitude, confidence, and
          neglectedness. Two rules keep it honest: it is never displayed
          without its underlying metric and confidence grade, and every change
          to a score is versioned in git with the reasoning in the commit.
        </p>
        <p>
          Rough calibration: 90+ means exceptional impact per resource with
          strong evidence. 60-80 is strongly positive with real evidence.
          40-60 is worthwhile but weakly quantified. Below 40 we generally
          don't list.
        </p>
      </Section>

      <Section title="Courage levels">
        <p>
          1 = comfortable for nearly everyone · 2 = mild awkwardness (a first
          blood donation) · 3 = real social or emotional effort · 4 = genuinely
          hard conversations or public intervention · 5 = personal risk to
          livelihood or relationships (whistleblowing).
        </p>
        <p>
          Moral courage is this site's differentiator: the money cost is
          usually zero, the impact often exceptional, and nobody else ranks it.
        </p>
      </Section>

      <Section title="Sources policy">
        <p>
          Every action cites at least one source with a URL and access date —
          enforced by a validator that fails our build otherwise. Primary
          sources beat press coverage. Numbers are re-checked at least
          annually; the dataset header records the last full review.
        </p>
      </Section>

      <Section title="Known limitations">
        <p>
          Several statistics are U.S.-centric (traffic deaths, the volunteer
          hour value, 988). Expected-value framing can mislead for
          low-probability actions like organ donor registration — the pages
          state both the headline number and the probability caveat. And the
          editorial score is a judgment; that's the honest label for what every
          ranking site does. Ours is at least versioned and explained.
        </p>
      </Section>

      <p className="mt-10 text-sm text-muted-foreground">
        Explore the full dataset through the{" "}
        <Link to="/" className="text-accent underline-offset-2 hover:underline">
          Impact Explorer
        </Link>{" "}
        or the{" "}
        <Link
          to="/rankings/most-good-per-dollar"
          className="text-accent underline-offset-2 hover:underline"
        >
          rankings
        </Link>
        . Spot an error? The dataset is open source —{" "}
        <a
          href="https://github.com/identran/howdogood.github.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline-offset-2 hover:underline"
        >
          corrections welcome
        </a>
        .
      </p>
    </article>
  );
}
