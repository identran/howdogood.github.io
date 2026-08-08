/*
filename: impact-explorer.tsx
date: August 8, 2026
programmer: James Tran
title: Impact Explorer
purpose: Interactive controls (money, time, courage) that rank the
         actions dataset by editorial score within the user's budget
*/

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { actions, type Action, type ActionKind } from "@/data/actions";

/* ┌──────────────────────────────────────┐
    DISPLAY HELPERS
└──────────────────────────────────────┘ */

export const KIND_COLORS: Record<ActionKind, string> = {
  donation: "var(--chart-1)",
  time: "var(--chart-2)",
  courage: "var(--chart-3)",
  habit: "var(--chart-4)",
};

const KIND_LABELS: Record<ActionKind, string> = {
  donation: "Donation",
  time: "Time",
  courage: "Courage",
  habit: "Habit",
};

const CONFIDENCE_STYLES: Record<string, string> = {
  high: "border-primary/60 text-primary",
  medium: "border-[color:var(--chart-3)]/60 text-[color:var(--chart-3)]",
  low: "border-border text-muted-foreground",
};

function formatTime(minutes: number): string {
  if (minutes === 0) return "no extra time";
  if (minutes < 60) return `${minutes} min`;
  const h = minutes / 60;
  return `${Number.isInteger(h) ? h : h.toFixed(1)} h`;
}

const COURAGE_WORDS = ["", "easy", "mild", "real effort", "hard", "brave"];

/* ┌──────────────────────────────────────┐
    ACTION CARD
└──────────────────────────────────────┘ */

function ActionCard({ action }: { action: Action }) {
  return (
    <div className="flex flex-col rounded-lg border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold leading-snug text-foreground">
          <Link
            to={`/action/${action.id}`}
            className="transition-colors hover:text-primary"
          >
            {action.title}
          </Link>
        </h3>
        <span
          className="mt-1 inline-block size-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: KIND_COLORS[action.kind] }}
          title={KIND_LABELS[action.kind]}
        />
      </div>

      <div className="mt-2 flex flex-wrap gap-1.5 text-xs text-muted-foreground">
        <Badge variant="outline" className="border-border">
          {action.cost_usd > 0 ? `$${action.cost_usd}` : "free"}
        </Badge>
        <Badge variant="outline" className="border-border">
          {formatTime(action.time_minutes)}
        </Badge>
        <Badge variant="outline" className="border-border">
          courage: {COURAGE_WORDS[action.courage_level]}
        </Badge>
        <Badge
          variant="outline"
          className={CONFIDENCE_STYLES[action.impact.confidence]}
        >
          {action.impact.confidence} confidence
        </Badge>
      </div>

      <p className="mt-3 flex-grow text-sm leading-relaxed text-muted-foreground">
        {action.impact.explanation}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <a
          href={action.act_now_url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-[color:var(--accent-hover,#9fb5a8)]"
        >
          Do it →
        </a>
        <a
          href={action.sources[0].url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground underline-offset-2 transition-colors hover:text-accent hover:underline"
          title={action.sources[0].name}
        >
          source
        </a>
      </div>
    </div>
  );
}

/* ┌──────────────────────────────────────┐
    EXPLORER
└──────────────────────────────────────┘ */

export function ImpactExplorer() {
  const [maxUsd, setMaxUsd] = useState(25);
  const [maxMinutes, setMaxMinutes] = useState(60);
  const [maxCourage, setMaxCourage] = useState(3);

  const matches = useMemo(
    () =>
      actions
        .filter(
          (a) =>
            a.cost_usd <= maxUsd &&
            a.time_minutes <= maxMinutes &&
            a.courage_level <= maxCourage,
        )
        .sort((a, b) => b.score - a.score),
    [maxUsd, maxMinutes, maxCourage],
  );

  const shown = matches.slice(0, 9);

  return (
    <section id="explorer" className="mx-auto mt-14 max-w-5xl px-6">
      <h2 className="text-center text-2xl font-semibold text-foreground">
        What do you have to give today?
      </h2>

      <div className="mx-auto mt-6 grid max-w-3xl gap-6 rounded-lg border border-border bg-card p-6 md:grid-cols-3">
        <div>
          <div className="mb-3 flex items-baseline justify-between">
            <label className="text-sm text-muted-foreground" htmlFor="money-slider">Money</label>
            <span className="font-semibold text-primary">
              {maxUsd >= 100 ? "$100+" : `$${maxUsd}`}
            </span>
          </div>
          <Slider
            id="money-slider"
            value={[maxUsd]}
            onValueChange={([v]) => setMaxUsd(v)}
            max={100}
            step={5}
            aria-label="Maximum money to spend"
          />
        </div>
        <div>
          <div className="mb-3 flex items-baseline justify-between">
            <label className="text-sm text-muted-foreground" htmlFor="time-slider">Time</label>
            <span className="font-semibold text-primary">
              {maxMinutes >= 480 ? "8+ h" : formatTime(maxMinutes)}
            </span>
          </div>
          <Slider
            id="time-slider"
            value={[maxMinutes]}
            onValueChange={([v]) => setMaxMinutes(v)}
            max={480}
            step={15}
            aria-label="Maximum time to spend"
          />
        </div>
        <div>
          <div className="mb-3 flex items-baseline justify-between">
            <label className="text-sm text-muted-foreground" htmlFor="courage-slider">Courage</label>
            <span className="font-semibold text-primary">
              {COURAGE_WORDS[maxCourage]}
            </span>
          </div>
          <Slider
            id="courage-slider"
            value={[maxCourage]}
            onValueChange={([v]) => setMaxCourage(v)}
            min={1}
            max={5}
            step={1}
            aria-label="How much courage you have today"
          />
        </div>
      </div>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        {matches.length} of {actions.length} actions fit your budget
        {matches.length > shown.length ? ` — showing the top ${shown.length}` : ""}
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((a) => (
          <ActionCard key={a.id} action={a} />
        ))}
      </div>

      {matches.length === 0 && (
        <p className="mt-6 text-center text-muted-foreground">
          Nothing fits that budget — try nudging a slider. Kindness starts
          small.
        </p>
      )}
    </section>
  );
}
