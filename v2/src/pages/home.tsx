/*
filename: home.tsx
date: August 8, 2026
programmer: James Tran
title: Home Page
purpose: Front page of the ledger — Anime.js hero choreography, impact
         explorer, frontier chart, top-actions chart and ranking indexes
*/

import { Fragment, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { animate, createTimeline, stagger } from "animejs";
import { BarChart } from "@/components/charts/bar-chart";
import { Bar } from "@/components/charts/bar";
import { BarYAxis } from "@/components/charts/bar-y-axis";
import { ImpactExplorer } from "@/components/impact-explorer";
import { ImpactFrontier } from "@/components/impact-frontier";
import { TypeWriter } from "@/components/kokonutui/type-writer";
import { Kicker, Reveal } from "@/components/editorial";
import { actions, datasetUpdated } from "@/data/actions";
import { RANKINGS } from "@/lib/rankings";

/* ┌──────────────────────────────────────┐
    CHART & STAT DATA
└──────────────────────────────────────┘ */

const topActions = [...actions]
  .sort((a, b) => b.score - a.score)
  .slice(0, 8)
  .map((a) => ({ name: a.title, score: a.score }));

const totalSources = actions.reduce((n, a) => n + a.sources.length, 0);
const highConfidence = actions.filter(
  (a) => a.impact.confidence === "high",
).length;

/* ┌──────────────────────────────────────┐
    HERO
└──────────────────────────────────────┘ */

const HERO_WORDS = ["How", "much", "good", "can", "you", "do", "today?"];

function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  // Anime.js entrance: headline words rise like set type, then the
  // supporting lines; the stat counters count up from zero. The markup
  // ships fully visible (SEO / no-JS) — we only hide-and-animate here,
  // before first paint, and never under prefers-reduced-motion.
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const scope = heroRef.current;
    if (!scope) return;

    const reverts: { revert: () => void }[] = [];
    const words = scope.querySelectorAll<HTMLElement>("[data-hero-word]");
    const rest = scope.querySelectorAll<HTMLElement>("[data-hero-rest]");

    reverts.push(
      createTimeline({ defaults: { ease: "outExpo" } })
        .add(words, {
          opacity: [0, 1],
          translateY: [26, 0],
          duration: 750,
          delay: stagger(65),
        })
        .add(
          rest,
          {
            opacity: [0, 1],
            translateY: [12, 0],
            duration: 600,
            delay: stagger(110),
          },
          "-=480",
        ),
    );

    for (const el of scope.querySelectorAll<HTMLElement>("[data-counter]")) {
      const target = Number(el.dataset.counter ?? "0");
      const counter = { v: 0 };
      reverts.push(
        animate(counter, {
          v: target,
          duration: 1400,
          delay: 500,
          ease: "outExpo",
          onUpdate: () => {
            el.textContent = String(Math.round(counter.v));
          },
        }),
      );
    }

    return () => reverts.forEach((a) => a.revert());
  }, []);

  const scrollToExplorer = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    document
      .getElementById("explorer")
      ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <header ref={heroRef} className="mx-auto max-w-6xl px-6 pt-16 md:pt-24">
      <div className="max-w-3xl">
        <p
          data-hero-rest
          className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground"
        >
          The evidence-ranked field guide to doing good
        </p>

        <h1 className="mt-5 font-display text-[clamp(2.6rem,6.5vw,4.5rem)] font-semibold leading-[1.04] tracking-[-0.015em] text-foreground">
          {HERO_WORDS.map((w, i) => (
            <Fragment key={i}>
              <span
                data-hero-word
                className={`inline-block ${w === "good" ? "italic text-accent" : ""}`}
              >
                {w}
              </span>{" "}
            </Fragment>
          ))}
        </h1>

        <p
          data-hero-rest
          className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground"
        >
          Acts of kindness and moral courage, ranked by evidence — so the
          resources you have go where they matter most.
        </p>

        <p
          data-hero-rest
          className="mt-6 font-display text-xl italic text-accent md:text-2xl"
        >
          Start with{" "}
          <TypeWriter
            phrases={["your money.", "your time.", "your courage."]}
            startDelay={1300}
          />
        </p>

        <p
          data-hero-rest
          className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground"
        >
          <span>
            <span
              data-counter={actions.length}
              className="font-semibold text-foreground"
            >
              {actions.length}
            </span>{" "}
            actions
          </span>
          <span>
            <span
              data-counter={totalSources}
              className="font-semibold text-foreground"
            >
              {totalSources}
            </span>{" "}
            sources cited
          </span>
          <span>
            <span
              data-counter={highConfidence}
              className="font-semibold text-foreground"
            >
              {highConfidence}
            </span>{" "}
            high-confidence
          </span>
        </p>

        <div data-hero-rest className="mt-8 flex flex-wrap items-center gap-5">
          <a
            href="#explorer"
            onClick={scrollToExplorer}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Open the explorer ↓
          </a>
          <Link
            to="/rankings/most-good-per-dollar"
            className="text-sm text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
          >
            See the rankings
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ┌──────────────────────────────────────┐
    SECTIONS
└──────────────────────────────────────┘ */

function TopActionsChart() {
  return (
    <Reveal>
      <section className="mx-auto mt-20 max-w-6xl px-6">
        <Kicker no="№ 03">The Standings</Kicker>
        <div className="mt-6 rounded-md border border-border bg-card p-6 shadow-[0_1px_2px_rgba(46,38,28,0.06)]">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
            Not all good deeds are equal
          </h2>
          <p className="mt-1 mb-6 max-w-2xl text-sm text-muted-foreground">
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
          <p className="mt-4 font-mono text-[0.6875rem] leading-relaxed text-muted-foreground">
            Every figure cites GiveWell, Our World in Data, or peer-reviewed
            research, with confidence grades — the score never stands alone.
            Dataset last reviewed {datasetUpdated}. Full methodology on{" "}
            <Link
              className="underline underline-offset-2 hover:text-accent"
              to="/data"
            >
              The Data
            </Link>{" "}
            page.
          </p>
        </div>
      </section>
    </Reveal>
  );
}

function RankingLinks() {
  return (
    <Reveal>
      <section className="mx-auto mt-20 max-w-6xl px-6">
        <Kicker no="№ 04">The Indexes</Kicker>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {RANKINGS.map((r) => (
            <Link
              key={r.slug}
              to={`/rankings/${r.slug}`}
              className="group flex items-start justify-between gap-4 rounded-md border border-border bg-card p-5 shadow-[0_1px_2px_rgba(46,38,28,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-[0_6px_18px_rgba(46,38,28,0.10)]"
            >
              <span>
                <h3 className="font-display text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
                  {r.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{r.tagline}</p>
              </span>
              <span
                aria-hidden="true"
                className="mt-1 font-mono text-accent transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </Reveal>
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
