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
import { Reveal } from "@/components/editorial";
import { actions, datasetUpdated, datasetVersion } from "@/data/actions";

/* ┌──────────────────────────────────────┐
    CONTENT BLOCKS
└──────────────────────────────────────┘ */

function Section({
  no,
  title,
  children,
}: {
  no: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <section className="mt-12">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-accent">§ {no}</span>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
            {title}
          </h2>
        </div>
        <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground">
          {children}
        </div>
      </section>
    </Reveal>
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
    <article className="mx-auto max-w-6xl px-6 pt-12">
      <div className="max-w-2xl">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
          Methodology
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-5xl">
          The Data
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Every recommendation on this site must survive you clicking the
          source link. Here's how the numbers work — including their limits.
        </p>

        <div className="mt-6 rounded-md border border-border bg-card p-4 font-mono text-xs leading-relaxed text-muted-foreground shadow-[0_1px_2px_rgba(46,38,28,0.06)]">
          Dataset v{datasetVersion} · {actions.length} actions · last full
          review {datasetUpdated} ·{" "}
          <span className="text-[color:var(--chart-1)]">
            {confidenceCounts.high ?? 0} high
          </span>{" "}
          /{" "}
          <span className="text-[color:var(--chart-4)]">
            {confidenceCounts.medium ?? 0} medium
          </span>{" "}
          / {confidenceCounts.low ?? 0} low confidence
        </div>

        <Section no="01" title="What we're estimating">
          <p>
            Each action answers one question: how much good does it do, per
            unit of what it costs you? Costs come in three currencies — money,
            time, and courage (graded 1-5). Impact is recorded in the most
            honest natural unit available: lives saved, children treated,
            tonnes of CO₂e, standard deviations of learning.
          </p>
        </Section>

        <Section no="02" title="Why there's no single universal unit">
          <p>
            Serious evaluators use lives saved, DALYs, WELLBYs, tonnes CO₂e,
            or learning gains — and converting between them requires value
            judgments we'd rather expose than hide. So each action keeps its
            native metric, the conversion reasoning is written in plain
            language, and comparability comes from the editorial score below.
          </p>
        </Section>

        <Section no="03" title="Confidence grades">
          <p>
            <strong className="text-[color:var(--chart-1)]">High</strong> —
            meta-analyses, RCTs, or estimates from evaluators that publish
            their full models (GiveWell, Our World in Data, peer-reviewed
            studies).
          </p>
          <p>
            <strong className="text-[color:var(--chart-4)]">Medium</strong> —
            credible single organizations' claims, contested research areas,
            or well-evidenced mechanisms with less-quantified magnitudes.
          </p>
          <p>
            <strong className="text-foreground">Low</strong> — plausible and
            directionally supported, but the honest answer is "we can't
            quantify this well." Low-confidence actions stay listed only when
            their cost is near zero.
          </p>
          <p>
            Where evidence is contested (deworming's long-run effects, for
            example), the action's own page says so instead of picking a side
            silently.
          </p>
        </Section>

        <Section no="04" title="The score (0-100)">
          <p>
            The score is an{" "}
            <strong className="text-foreground">
              editorial synthesis, not a measurement
            </strong>
            : our judgment of impact per unit of resource, considering
            magnitude, confidence, and neglectedness. Two rules keep it
            honest: it is never displayed without its underlying metric and
            confidence grade, and every change to a score is versioned in git
            with the reasoning in the commit.
          </p>
          <p>
            Rough calibration: 90+ means exceptional impact per resource with
            strong evidence. 60-80 is strongly positive with real evidence.
            40-60 is worthwhile but weakly quantified. Below 40 we generally
            don't list.
          </p>
        </Section>

        <Section no="05" title="Courage levels">
          <p>
            1 = comfortable for nearly everyone · 2 = mild awkwardness (a
            first blood donation) · 3 = real social or emotional effort · 4 =
            genuinely hard conversations or public intervention · 5 = personal
            risk to livelihood or relationships (whistleblowing).
          </p>
          <p>
            Moral courage is this site's differentiator: the money cost is
            usually zero, the impact often exceptional, and nobody else ranks
            it.
          </p>
        </Section>

        <Section no="06" title="Sources policy">
          <p>
            Every action cites at least one source with a URL and access date
            — enforced by a validator that fails our build otherwise. Primary
            sources beat press coverage. Numbers are re-checked at least
            annually; the dataset header records the last full review.
          </p>
        </Section>

        <Section no="07" title="Known limitations">
          <p>
            Several statistics are U.S.-centric (traffic deaths, the volunteer
            hour value, 988). Expected-value framing can mislead for
            low-probability actions like organ donor registration — the pages
            state both the headline number and the probability caveat. And the
            editorial score is a judgment; that's the honest label for what
            every ranking site does. Ours is at least versioned and explained.
          </p>
        </Section>

        <p className="mt-12 border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground">
          Explore the full dataset through the{" "}
          <Link
            to="/"
            className="text-accent underline-offset-2 hover:underline"
          >
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
      </div>
    </article>
  );
}
