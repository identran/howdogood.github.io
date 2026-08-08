/*
filename: App.tsx
date: August 8, 2026
programmer: James Tran
title: How Do Good? v2 - Application Shell
purpose: Top-level layout (nav, home placeholder with demo chart, footer)
         for the data-driven v2 redesign — see docs/REDESIGN.md
*/

import { BarChart } from "@/components/charts/bar-chart";
import { Bar } from "@/components/charts/bar";
import { BarYAxis } from "@/components/charts/bar-y-axis";

/* ┌──────────────────────────────────────┐
    DEMO DATA (Phase A placeholder)
└──────────────────────────────────────┘ */

// Illustrative only — Phase B replaces this with the curated, cited
// dataset in data/actions.json. Do not present these numbers as real.
const demoImpactData = [
  { name: "Malaria net donation", impact: 100 },
  { name: "Vitamin A supplement", impact: 85 },
  { name: "Deworming program", impact: 60 },
  { name: "Direct cash transfer", impact: 11 },
  { name: "Typical local charity", impact: 3 },
];

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

function DemoChart() {
  return (
    <section id="explorer" className="mx-auto mt-14 max-w-3xl px-6">
      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-xl font-semibold text-primary">
          Not all good deeds are equal
        </h2>
        <p className="mt-1 mb-6 text-sm text-muted-foreground">
          Relative impact per $100 donated — illustrative preview. Real,
          fully-cited data ships with the Impact Explorer.
        </p>
        <BarChart
          data={demoImpactData}
          xDataKey="name"
          orientation="horizontal"
          aspectRatio="2 / 1"
        >
          <Bar dataKey="impact" fill="var(--chart-1)" />
          <BarYAxis />
        </BarChart>
        <p className="mt-4 text-xs text-muted-foreground">
          Preview numbers are illustrative. The live version will cite
          GiveWell, Our World in Data and peer-reviewed research for every
          figure — with confidence grades.
        </p>
      </div>
    </section>
  );
}

function ComingSoon() {
  const items = [
    {
      id: "rankings",
      title: "Rankings",
      text: "Most good per $10, per hour, and the courage that counts.",
    },
    {
      id: "data",
      title: "The Data",
      text: "Every number sourced, every estimate graded for confidence.",
    },
    {
      id: "generator",
      title: "Surprise Me",
      text: "The classic kindness generator, now with impact context.",
    },
  ];

  return (
    <section className="mx-auto mt-10 grid max-w-3xl gap-4 px-6 md:grid-cols-3">
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
        <DemoChart />
        <ComingSoon />
      </main>
      <Footer />
    </div>
  );
}

export default App;
