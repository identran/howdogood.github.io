/*
filename: action-detail.tsx
date: August 8, 2026
programmer: James Tran
title: Action Detail Page
purpose: One indexable page per action — the claim, the math, the
         confidence grade, the sources, and a single Do-it button.
         These 41 pages are the site's SEO doors.
*/

import { Link, useParams } from "react-router-dom";
import { useLayoutEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { Chip, Kicker, Reveal } from "@/components/editorial";
import { ParticleAction } from "@/components/kokonutui/particle-button";
import { actions, type Action } from "@/data/actions";
import { KIND_COLORS } from "@/components/impact-explorer";

/* ┌──────────────────────────────────────┐
    HELPERS
└──────────────────────────────────────┘ */

const KIND_TITLES: Record<string, string> = {
  donation: "Donation",
  time: "Give your time",
  courage: "Moral courage",
  habit: "Habit",
};

const COURAGE_WORDS = ["", "easy", "mild", "real effort", "hard", "brave"];

const CONFIDENCE_TEXT: Record<string, string> = {
  high: "text-[color:var(--chart-1)]",
  medium: "text-[color:var(--chart-4)]",
  low: "text-muted-foreground",
};

function formatTime(minutes: number): string {
  if (minutes === 0) return "no extra time";
  if (minutes < 60) return `${minutes} minutes`;
  const h = minutes / 60;
  return `${Number.isInteger(h) ? h : h.toFixed(1)} ${h === 1 ? "hour" : "hours"}`;
}

function relatedActions(action: Action): Action[] {
  return actions
    .filter((a) => a.kind === action.kind && a.id !== action.id)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

/* ┌──────────────────────────────────────┐
    SCORE (counts up like a ledger total)
└──────────────────────────────────────┘ */

function Score({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const counter = { v: 0 };
    const anim = animate(counter, {
      v: value,
      duration: 1100,
      delay: 200,
      ease: "outExpo",
      onUpdate: () => {
        el.textContent = String(Math.round(counter.v));
      },
    });
    return () => {
      anim.revert();
    };
  }, [value]);

  return (
    <span className="font-mono text-4xl font-semibold text-foreground">
      <span ref={ref}>{value}</span>
      <span className="text-base font-normal text-muted-foreground">/100</span>
    </span>
  );
}

/* ┌──────────────────────────────────────┐
    SHARE BUTTON
└──────────────────────────────────────┘ */

function ShareButton({ action }: { action: Action }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = `https://www.howdogood.com/action/${action.id}/`;
    const shareData = {
      title: "How Do Good?",
      text: `${action.title} — ${action.impact.explanation}`,
      url,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* user cancelled — nothing to do */
    }
  }

  return (
    <button
      onClick={share}
      className="rounded-md border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {copied ? "✓ Link copied" : "Share"}
    </button>
  );
}

/* ┌──────────────────────────────────────┐
    PAGE
└──────────────────────────────────────┘ */

export function ActionDetailPage() {
  const { id } = useParams();
  const action = actions.find((a) => a.id === id);

  if (!action) {
    return (
      <div className="mx-auto max-w-2xl px-6 pt-20">
        <h1 className="font-display text-3xl font-semibold text-foreground">
          Action not found
        </h1>
        <p className="mt-3 text-muted-foreground">
          It may have been renamed or removed as the dataset evolves.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-foreground"
        >
          Back to the explorer
        </Link>
      </div>
    );
  }

  const related = relatedActions(action);

  return (
    <article className="mx-auto max-w-6xl px-6 pt-12">
      <div className="max-w-2xl">
        <div className="flex items-center gap-2">
          <span
            className="inline-block size-2.5 rounded-full"
            style={{ backgroundColor: KIND_COLORS[action.kind] }}
          />
          <span
            className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em]"
            style={{ color: KIND_COLORS[action.kind] }}
          >
            {KIND_TITLES[action.kind]}
          </span>
        </div>

        <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-5xl">
          {action.title}
        </h1>

        <div className="mt-5 flex flex-wrap gap-1.5">
          <Chip>
            {action.cost_usd > 0 ? `costs $${action.cost_usd}` : "costs nothing"}
          </Chip>
          <Chip>{formatTime(action.time_minutes)}</Chip>
          <Chip>courage: {COURAGE_WORDS[action.courage_level]}</Chip>
        </div>

        <section
          className="mt-8 rounded-md border border-border bg-card p-6 shadow-[0_1px_2px_rgba(46,38,28,0.06)]"
          style={{ borderLeftWidth: 3, borderLeftColor: KIND_COLORS[action.kind] }}
        >
          <div className="flex items-start justify-between gap-4">
            <h2 className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              The impact
            </h2>
            <Score value={action.score} />
          </div>
          <p className="mt-2 font-display text-xl leading-relaxed text-foreground">
            {action.impact.explanation}
          </p>
          <p className="mt-4 font-mono text-xs leading-relaxed text-muted-foreground">
            measured as:{" "}
            <span className="text-foreground">
              {action.impact.metric} ≈ {action.impact.value}
            </span>{" "}
            ·{" "}
            <span className={CONFIDENCE_TEXT[action.impact.confidence]}>
              {action.impact.confidence} confidence
            </span>
          </p>
        </section>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <ParticleAction
            href={action.act_now_url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-base"
          >
            Do it now →
          </ParticleAction>
          <ShareButton action={action} />
        </div>

        <Reveal>
          <section className="mt-12">
            <Kicker no="※">Sources</Kicker>
            <ol className="mt-4 space-y-2.5">
              {action.sources.map((s, i) => (
                <li key={s.url} className="flex gap-3 text-sm">
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">
                    [{i + 1}]
                  </span>
                  <span>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent underline-offset-2 hover:underline"
                    >
                      {s.name}
                    </a>{" "}
                    <span className="font-mono text-xs text-muted-foreground">
                      · checked {s.accessed}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-4 font-mono text-[0.6875rem] leading-relaxed text-muted-foreground">
              The 0-100 score is our editorial synthesis of impact per
              resource — it never stands alone. How we grade evidence:{" "}
              <Link
                to="/data"
                className="underline underline-offset-2 hover:text-accent"
              >
                The Data
              </Link>
              .
            </p>
          </section>
        </Reveal>

        {related.length > 0 && (
          <Reveal>
            <section className="mt-12">
              <Kicker no="＋">More like this</Kicker>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    to={`/action/${r.id}`}
                    className="group rounded-md border border-border bg-card p-4 shadow-[0_1px_2px_rgba(46,38,28,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-[0_6px_18px_rgba(46,38,28,0.10)]"
                  >
                    <span className="font-display text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
                      {r.title}
                    </span>
                    <span className="mt-1 block font-mono text-xs text-muted-foreground">
                      score {r.score}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          </Reveal>
        )}
      </div>
    </article>
  );
}
