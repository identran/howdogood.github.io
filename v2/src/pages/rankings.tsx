/*
filename: rankings.tsx
date: August 8, 2026
programmer: James Tran
title: Rankings Page
purpose: Chart-headed, shareable ranking lists — one per action kind,
         set as a ledger table with mono rank numbers
*/

import { Link, NavLink, useParams } from "react-router-dom";
import { BarChart } from "@/components/charts/bar-chart";
import { Bar } from "@/components/charts/bar";
import { BarYAxis } from "@/components/charts/bar-y-axis";
import { Kicker, Reveal } from "@/components/editorial";
import { KIND_COLORS } from "@/components/impact-explorer";
import { RANKINGS, rankingBySlug, rankedActions } from "@/lib/rankings";

/* ┌──────────────────────────────────────┐
    PAGE
└──────────────────────────────────────┘ */

export function RankingsPage() {
  const { slug } = useParams();
  const ranking = rankingBySlug(slug ?? "") ?? RANKINGS[0];
  const ranked = rankedActions(ranking);

  const chartData = ranked
    .slice(0, 8)
    .map((a) => ({ name: a.title, score: a.score }));

  return (
    <div className="mx-auto max-w-6xl px-6 pt-12">
      <Kicker no="№ 04">The Indexes</Kicker>

      <nav className="mt-5 flex flex-wrap gap-2" aria-label="Rankings">
        {RANKINGS.map((r) => (
          <NavLink
            key={r.slug}
            to={`/rankings/${r.slug}`}
            className={({ isActive }) =>
              `rounded-md border px-3 py-1.5 font-mono text-xs uppercase tracking-[0.08em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
              }`
            }
          >
            {r.title}
          </NavLink>
        ))}
      </nav>

      <div className="mt-8 max-w-3xl">
        <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-5xl">
          {ranking.title}
        </h1>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          {ranking.description}
        </p>
      </div>

      <div className="mt-8 max-w-3xl rounded-md border border-border bg-card p-6 shadow-[0_1px_2px_rgba(46,38,28,0.06)]">
        <BarChart
          data={chartData}
          xDataKey="name"
          orientation="horizontal"
          aspectRatio="2 / 1"
        >
          <Bar dataKey="score" fill={KIND_COLORS[ranking.kind]} />
          <BarYAxis />
        </BarChart>
        <p className="mt-3 font-mono text-[0.6875rem] leading-relaxed text-muted-foreground">
          Impact-per-resource score, 0-100 (editorial synthesis — every
          underlying number is cited on the action's page).
        </p>
      </div>

      {/* The ledger: hairline rows, mono rank, serif entries */}
      <Reveal>
        <ol className="mt-10 max-w-3xl border-t border-border">
          {ranked.map((a, i) => (
            <li key={a.id} className="border-b border-border">
              <Link
                to={`/action/${a.id}`}
                className="group flex items-baseline gap-4 py-4 transition-colors hover:bg-card sm:gap-6 sm:px-3 sm:-mx-3"
              >
                <span className="w-9 shrink-0 text-right font-mono text-lg text-muted-foreground tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-grow">
                  <span className="block font-display text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-accent">
                    {a.title}
                  </span>
                  <span className="mt-0.5 block font-mono text-xs text-muted-foreground">
                    {a.cost_usd > 0 ? `$${a.cost_usd} · ` : ""}
                    {a.time_minutes > 0 ? `${a.time_minutes} min · ` : ""}
                    {a.impact.confidence} confidence
                  </span>
                </span>
                <span className="shrink-0 text-right">
                  <span className="font-mono text-xl font-semibold text-foreground tabular-nums">
                    {a.score}
                  </span>
                  <span className="block font-mono text-[0.625rem] text-muted-foreground">
                    /100
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </Reveal>
    </div>
  );
}
