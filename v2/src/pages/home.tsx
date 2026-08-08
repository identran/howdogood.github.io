/*
filename: home.tsx
date: August 8, 2026
programmer: James Tran
title: Home Page
purpose: Hero, impact explorer, frontier chart and top-actions chart
*/

import { Link } from "react-router-dom";
import { BarChart } from "@/components/charts/bar-chart";
import { Bar } from "@/components/charts/bar";
import { BarYAxis } from "@/components/charts/bar-y-axis";
import { ImpactExplorer } from "@/components/impact-explorer";
import { ImpactFrontier } from "@/components/impact-frontier";
import { actions, datasetUpdated } from "@/data/actions";
import { RANKINGS } from "@/lib/rankings";

/* ┌──────────────────────────────────────┐
    CHART DATA
└──────────────────────────────────────┘ */

const topActions = [...actions]
  .sort((a, b) => b.score - a.score)
  .slice(0, 8)
  .map((a) => ({ name: a.title, score: a.score }));

/* ┌──────────────────────────────────────┐
    SECTIONS
└──────────────────────────────────────┘ */

function Hero() {
  return (
    <header className="mx-auto max-w-3xl px-6 pt-14 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        How much good can you do today?
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Acts of kindness and moral courage, ranked by evidence — so the
        resources you have go where they matter most.
      </p>
    </header>
  );
}

function TopActionsChart() {
  return (
    <section className="mx-auto mt-16 max-w-3xl px-6">
      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-xl font-semibold text-primary">
          Not all good deeds are equal
        </h2>
        <p className="mt-1 mb-6 text-sm text-muted-foreground">
          Top actions by impact-per-resource score (0-100, editorial
          synthesis) from our dataset of {actions.length} evidence-rated
          actions.
        </p>
        <BarChart
          data={topActions}
          xDataKey="name"
          orientation="horizontal"
          aspectRatio="2 / 1"
        >
          <Bar dataKey="score" fill="var(--chart-1)" />
          <BarYAxis />
        </BarChart>
        <p className="mt-4 text-xs text-muted-foreground">
          Every figure cites GiveWell, Our World in Data, or peer-reviewed
          research, with confidence grades — the score never stands alone.
          Dataset last reviewed {datasetUpdated}. Full methodology on{" "}
          <Link className="underline underline-offset-2 hover:text-accent" to="/data">
            The Data
          </Link>{" "}
          page.
        </p>
      </div>
    </section>
  );
}

function RankingLinks() {
  return (
    <section className="mx-auto mt-10 grid max-w-3xl gap-4 px-6 md:grid-cols-2">
      {RANKINGS.map((r) => (
        <Link
          key={r.slug}
          to={`/rankings/${r.slug}`}
          className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary"
        >
          <h3 className="font-semibold text-primary">{r.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{r.tagline}</p>
        </Link>
      ))}
    </section>
  );
}

/* ┌──────────────────────────────────────┐
    PAGE
└──────────────────────────────────────┘ */

export function HomePage() {
  return (
    <>
      <Hero />
      <ImpactExplorer />
      <ImpactFrontier />
      <TopActionsChart />
      <RankingLinks />
    </>
  );
}
