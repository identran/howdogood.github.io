/*
filename: App.tsx
date: August 8, 2026
programmer: James Tran
title: How Do Good? v2 - Application Shell
purpose: Top-level layout (nav, hero, impact explorer, frontier chart,
         top-actions chart, footer) — see docs/REDESIGN.md
*/

import { BarChart } from "@/components/charts/bar-chart";
import { Bar } from "@/components/charts/bar";
import { BarYAxis } from "@/components/charts/bar-y-axis";
import { ImpactExplorer } from "@/components/impact-explorer";
import { ImpactFrontier } from "@/components/impact-frontier";
import { actions, datasetUpdated } from "@/data/actions";

/* ┌──────────────────────────────────────┐
    CHART DATA (from curated dataset)
└──────────────────────────────────────┘ */

// Top actions by editorial impact-per-resource score — see
// docs/METHODOLOGY.md for how the score is derived and its limits.
const topActions = [...actions]
  .sort((a, b) => b.score - a.score)
  .slice(0, 8)
  .map((a) => ({ name: a.title, score: a.score }));

/* ┌──────────────────────────────────────┐
    LAYOUT COMPONENTS
└──────────────────────────────────────┘ */

function Nav() {
  return (
    <nav className="fixed top-0 z-50 flex w-full items-center justify-between bg-card px-6 py-3">
      <div className="text-lg font-semibold text-foreground">How Do Good?</div>
      <ul className="flex items-center gap-6 text-sm text-muted-foreground">
        <li><a className="transition-colors hover:text-primary" href="#explorer">Impact Explorer</a></li>
        <li><a className="transition-colors hover:text-primary" href="#rankings">Rankings</a></li>
        <li><a className="transition-colors hover:text-primary" href="#data">The Data</a></li>
        <li><a className="transition-colors hover:text-primary" href="https://www.howdogood.com/classifieds.html">Classifieds</a></li>
        <li><a className="transition-colors hover:text-primary" href="https://www.howdogood.com/advertise.html">Get Listed</a></li>
      </ul>
    </nav>
  );
}

function Hero() {
  return (
    <header className="mx-auto max-w-3xl px-6 pt-28 text-center">
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
    <section id="rankings" className="mx-auto mt-16 max-w-3xl px-6">
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
          Dataset last reviewed {datasetUpdated}.
        </p>
      </div>
    </section>
  );
}

function ComingSoon() {
  const items = [
    {
      id: "data",
      title: "The Data",
      text: "Full methodology page: every number sourced, every estimate graded for confidence.",
    },
    {
      id: "generator",
      title: "Surprise Me",
      text: "The classic kindness generator, now with impact context.",
    },
  ];

  return (
    <section className="mx-auto mt-10 grid max-w-3xl gap-4 px-6 md:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.id}
          id={item.id}
          className="rounded-lg border border-dashed border-border bg-card p-5"
        >
          <h3 className="font-semibold text-primary">{item.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
          <p className="mt-3 text-xs uppercase tracking-wide text-accent">
            Coming soon
          </p>
        </div>
      ))}
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-card py-6 text-center">
      <a
        href="https://buymeacoffee.com/yotm"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-accent"
      >
        <span>☕</span> Support this project
      </a>
    </footer>
  );
}

/* ┌──────────────────────────────────────┐
    APP
└──────────────────────────────────────┘ */

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <ImpactExplorer />
        <ImpactFrontier />
        <TopActionsChart />
        <ComingSoon />
      </main>
      <Footer />
    </div>
  );
}

export default App;
