/*
filename: rankings.tsx
date: August 8, 2026
programmer: James Tran
title: Rankings Page
purpose: Chart-headed, shareable ranking lists — one per action kind
*/

import { Link, NavLink, useParams } from "react-router-dom";
import { BarChart } from "@/components/charts/bar-chart";
import { Bar } from "@/components/charts/bar";
import { BarYAxis } from "@/components/charts/bar-y-axis";
import { Badge } from "@/components/ui/badge";
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
    <div className="mx-auto max-w-3xl px-6 pt-10">
      <nav className="flex flex-wrap gap-2" aria-label="Rankings">
        {RANKINGS.map((r) => (
          <NavLink
            key={r.slug}
            to={`/rankings/${r.slug}`}
            className={({ isActive }) =>
              `rounded-full border px-3 py-1 text-sm transition-colors ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`
            }
          >
            {r.title}
          </NavLink>
        ))}
      </nav>

      <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
        {ranking.title}
      </h1>
      <p className="mt-3 text-muted-foreground">{ranking.description}</p>

      <div className="mt-8 rounded-lg border border-border bg-card p-6">
        <BarChart
          data={chartData}
          xDataKey="name"
          orientation="horizontal"
          aspectRatio="2 / 1"
        >
          <Bar dataKey="score" fill={KIND_COLORS[ranking.kind]} />
          <BarYAxis />
        </BarChart>
        <p className="mt-3 text-xs text-muted-foreground">
          Impact-per-resource score, 0-100 (editorial synthesis — every
          underlying number is cited on the action's page).
        </p>
      </div>

      <ol className="mt-8 space-y-3">
        {ranked.map((a, i) => (
          <li key={a.id}>
            <Link
              to={`/action/${a.id}`}
              className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary"
            >
              <span className="w-8 text-center text-xl font-bold text-muted-foreground">
                {i + 1}
              </span>
              <span className="flex-grow">
                <span className="block font-medium text-foreground">
                  {a.title}
                </span>
                <span className="mt-0.5 block text-sm text-muted-foreground">
                  {a.cost_usd > 0 ? `$${a.cost_usd} · ` : ""}
                  {a.time_minutes > 0 ? `${a.time_minutes} min · ` : ""}
                  {a.impact.confidence} confidence
                </span>
              </span>
              <Badge variant="outline" className="shrink-0 border-border text-primary">
                {a.score}
              </Badge>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
