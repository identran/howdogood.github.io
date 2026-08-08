/*
filename: impact-explorer.tsx
date: August 8, 2026
programmer: James Tran
title: Impact Explorer
purpose: Interactive controls (money, time, courage) that rank the
         actions dataset by editorial score within the user's budget.
         The result grid re-flows with Motion layout springs.
*/

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Slider } from "@/components/ui/slider";
import { Chip, ConfidenceChip, Kicker } from "@/components/editorial";
import { ParticleAction } from "@/components/kokonutui/particle-button";
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

function formatTime(minutes: number): string {
  if (minutes === 0) return "no extra time";
  if (minutes < 60) return `${minutes} min`;
  const h = minutes / 60;
  return `${Number.isInteger(h) ? h : h.toFixed(1)} h`;
}

const COURAGE_WORDS = ["", "easy", "mild", "real effort", "hard", "brave"];

/* ┌──────────────────────────────────────┐
    ACTION CARD (a clipping from the ledger)
└──────────────────────────────────────┘ */

function ActionCard({ action }: { action: Action }) {
  return (
    <div
      className="flex h-full flex-col rounded-md border border-border bg-card p-5 shadow-[0_1px_2px_rgba(46,38,28,0.06)] transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-[0_6px_18px_rgba(46,38,28,0.10)]"
      style={{ borderLeftWidth: 3, borderLeftColor: KIND_COLORS[action.kind] }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span
            className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.14em]"
            style={{ color: KIND_COLORS[action.kind] }}
          >
            {KIND_LABELS[action.kind]}
          </span>
          <h3 className="mt-1 font-display text-lg font-semibold leading-snug text-foreground">
            <Link
              to={`/action/${action.id}`}
              className="transition-colors hover:text-accent"
            >
              {action.title}
            </Link>
          </h3>
        </div>
        <span className="shrink-0 text-right">
          <span className="font-mono text-xl font-semibold text-foreground">
            {action.score}
          </span>
          <span className="block font-mono text-[0.625rem] text-muted-foreground">
            /100
          </span>
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <Chip>{action.cost_usd > 0 ? `$${action.cost_usd}` : "free"}</Chip>
        <Chip>{formatTime(action.time_minutes)}</Chip>
        <Chip>courage: {COURAGE_WORDS[action.courage_level]}</Chip>
        <ConfidenceChip level={action.impact.confidence} />
      </div>

      <p className="mt-3 flex-grow text-sm leading-relaxed text-muted-foreground">
        {action.impact.explanation}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <ParticleAction
          href={action.act_now_url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 text-xs"
        >
          Do it →
        </ParticleAction>
        <a
          href={action.sources[0].url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[0.6875rem] text-muted-foreground underline-offset-2 transition-colors hover:text-accent hover:underline"
          title={action.sources[0].name}
        >
          source ↗
        </a>
      </div>
    </div>
  );
}

/* ┌──────────────────────────────────────┐
    BUDGET SLIDER
└──────────────────────────────────────┘ */

function BudgetSlider({
  id,
  label,
  display,
  value,
  onChange,
  min = 0,
  max,
  step,
  ariaLabel,
}: {
  id: string;
  label: string;
  display: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max: number;
  step: number;
  ariaLabel: string;
}) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <label
          className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted-foreground"
          htmlFor={id}
        >
          {label}
        </label>
        <span className="font-mono text-sm font-semibold text-accent">
          {display}
        </span>
      </div>
      <Slider
        id={id}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        min={min}
        max={max}
        step={step}
        aria-label={ariaLabel}
      />
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
  const reduced = useReducedMotion();

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
    <section id="explorer" className="mx-auto mt-20 max-w-6xl scroll-mt-24 px-6">
      <Kicker no="№ 01">The Explorer</Kicker>
      <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        What do you have to give today?
      </h2>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Set your budget of money, time and nerve — the ledger reorders itself
        around what you can give.
      </p>

      <div className="mt-8 grid gap-8 rounded-md border border-border bg-card p-6 shadow-[0_1px_2px_rgba(46,38,28,0.06)] md:grid-cols-3">
        <BudgetSlider
          id="money-slider"
          label="Money"
          display={maxUsd >= 100 ? "$100+" : `$${maxUsd}`}
          value={maxUsd}
          onChange={setMaxUsd}
          max={100}
          step={5}
          ariaLabel="Maximum money to spend"
        />
        <BudgetSlider
          id="time-slider"
          label="Time"
          display={maxMinutes >= 480 ? "8+ h" : formatTime(maxMinutes)}
          value={maxMinutes}
          onChange={setMaxMinutes}
          max={480}
          step={15}
          ariaLabel="Maximum time to spend"
        />
        <BudgetSlider
          id="courage-slider"
          label="Courage"
          display={COURAGE_WORDS[maxCourage]}
          value={maxCourage}
          onChange={setMaxCourage}
          min={1}
          max={5}
          step={1}
          ariaLabel="How much courage you have today"
        />
      </div>

      <p
        className="mt-4 font-mono text-xs text-muted-foreground"
        aria-live="polite"
      >
        {matches.length} of {actions.length} actions fit your budget
        {matches.length > shown.length
          ? ` — showing the top ${shown.length}`
          : ""}
      </p>

      {reduced ? (
        <div className="mt-6 grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((a) => (
            <ActionCard key={a.id} action={a} />
          ))}
        </div>
      ) : (
        <motion.div
          layout
          className="mt-6 grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((a) => (
              <motion.div
                key={a.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 300, damping: 32 }}
              >
                <ActionCard action={a} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {matches.length === 0 && (
        <p className="mt-6 text-muted-foreground">
          Nothing fits that budget — try nudging a slider. Kindness starts
          small.
        </p>
      )}
    </section>
  );
}
