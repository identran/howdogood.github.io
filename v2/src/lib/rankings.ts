/*
filename: rankings.ts
date: August 8, 2026
programmer: James Tran
title: Ranking Definitions
purpose: The site's ranking pages — one per action kind, each a
         shareable, indexable list with its own URL and framing
*/

import { actions, type Action, type ActionKind } from "@/data/actions";

/* ┌──────────────────────────────────────┐
    TYPES & DEFINITIONS
└──────────────────────────────────────┘ */

export interface Ranking {
  slug: string;
  kind: ActionKind;
  title: string;
  tagline: string;
  description: string;
}

export const RANKINGS: Ranking[] = [
  {
    slug: "most-good-per-dollar",
    kind: "donation",
    title: "Most Good Per Dollar",
    tagline: "Where $10 goes furthest",
    description:
      "The best charities are not 10% better than average — evaluators find they can be 100x more cost-effective. These donations are ranked by how much good each dollar does, with every estimate cited.",
  },
  {
    slug: "most-good-per-hour",
    kind: "time",
    title: "Most Good Per Hour",
    tagline: "When you have time, not money",
    description:
      "An hour of your time, pointed well, can matter enormously — a blood donation helps up to three patients, and a 2-minute organ donor registration can save eight lives. Ranked by impact per hour given.",
  },
  {
    slug: "courage-that-counts",
    kind: "courage",
    title: "Courage That Counts",
    tagline: "The hardest good deeds are free",
    description:
      "Nobody ranks moral courage — so we did. Asking a friend directly about suicide, taking the keys from an impaired driver, standing up to harassment: zero dollars, real evidence, outsized impact.",
  },
  {
    slug: "habits-that-add-up",
    kind: "habit",
    title: "Habits That Add Up",
    tagline: "Set once, good forever",
    description:
      "One decision that repeats beats a hundred good intentions. These habits — from a recurring $5 donation to washing cold — are ranked by the impact they compound over a year.",
  },
];

/* ┌──────────────────────────────────────┐
    ACCESSORS
└──────────────────────────────────────┘ */

export function rankingBySlug(slug: string): Ranking | undefined {
  return RANKINGS.find((r) => r.slug === slug);
}

export function rankedActions(ranking: Ranking): Action[] {
  return actions
    .filter((a) => a.kind === ranking.kind)
    .sort((a, b) => b.score - a.score);
}
