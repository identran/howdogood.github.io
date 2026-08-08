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
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
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

function formatTime(minutes: number): string {
  if (minutes === 0) return "no extra time";
  if (minutes < 60) return `${minutes} minutes`;
  const h = minutes / 60;
  return `${Number.isInteger(h) ? h : h.toFixed(1)} hours`;
}

function relatedActions(action: Action): Action[] {
  return actions
    .filter((a) => a.kind === action.kind && a.id !== action.id)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
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
      className="rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-accent"
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
      <div className="mx-auto max-w-2xl px-6 pt-20 text-center">
        <h1 className="text-2xl font-semibold text-foreground">
          Action not found
        </h1>
        <p className="mt-3 text-muted-foreground">
          It may have been renamed or removed as the dataset evolves.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Back to the explorer
        </Link>
      </div>
    );
  }

  const related = relatedActions(action);

  return (
    <article className="mx-auto max-w-2xl px-6 pt-10">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span
          className="inline-block size-2.5 rounded-full"
          style={{ backgroundColor: KIND_COLORS[action.kind] }}
        />
        {KIND_TITLES[action.kind]}
      </div>

      <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
        {action.title}
      </h1>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge variant="outline" className="border-border text-muted-foreground">
          {action.cost_usd > 0 ? `costs $${action.cost_usd}` : "costs nothing"}
        </Badge>
        <Badge variant="outline" className="border-border text-muted-foreground">
          {formatTime(action.time_minutes)}
        </Badge>
        <Badge variant="outline" className="border-border text-muted-foreground">
          courage: {COURAGE_WORDS[action.courage_level]}
        </Badge>
      </div>

      <section className="mt-8 rounded-lg border border-border bg-card p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            The impact
          </h2>
          <span className="text-sm text-muted-foreground">
            score{" "}
            <span className="text-xl font-bold text-primary">{action.score}</span>
            /100
          </span>
        </div>
        <p className="mt-3 text-lg leading-relaxed text-foreground">
          {action.impact.explanation}
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Measured as:{" "}
          <span className="text-foreground">
            {action.impact.metric} ≈ {action.impact.value}
          </span>{" "}
          ·{" "}
          <span
            className={
              action.impact.confidence === "high"
                ? "text-primary"
                : action.impact.confidence === "medium"
                  ? "text-[color:var(--chart-3)]"
                  : "text-muted-foreground"
            }
          >
            {action.impact.confidence} confidence
          </span>
        </p>
      </section>

      <div className="mt-6 flex items-center gap-3">
        <a
          href={action.act_now_url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-primary px-5 py-2.5 font-medium text-primary-foreground transition-colors hover:opacity-90"
        >
          Do it now →
        </a>
        <ShareButton action={action} />
      </div>

      <section className="mt-10">
        <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Sources
        </h2>
        <ul className="mt-3 space-y-2">
          {action.sources.map((s) => (
            <li key={s.url} className="text-sm">
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline-offset-2 hover:underline"
              >
                {s.name}
              </a>
              <span className="text-muted-foreground"> · checked {s.accessed}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">
          The 0-100 score is our editorial synthesis of impact per resource —
          it never stands alone. How we grade evidence:{" "}
          <Link to="/data" className="underline underline-offset-2 hover:text-accent">
            The Data
          </Link>
          .
        </p>
      </section>

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            More like this
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.id}
                to={`/action/${r.id}`}
                className="rounded-lg border border-border bg-card p-4 text-sm font-medium text-foreground transition-colors hover:border-primary"
              >
                {r.title}
                <span className="mt-1 block text-xs font-normal text-muted-foreground">
                  score {r.score}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
