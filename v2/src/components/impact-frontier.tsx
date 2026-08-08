/*
filename: impact-frontier.tsx
date: August 8, 2026
programmer: James Tran
title: Impact Frontier Chart
purpose: Custom SVG scatter of effort (x, log scale) vs editorial impact
         score (y) for every action in the dataset. Custom because the
         bklit scatter is date-axis only; this stays on the shared theme
         tokens so it can be swapped later without visual drift. The
         chart draws itself in with an Anime.js timeline on first view
         (grid draws, labels fade, points pop) — skipped entirely under
         prefers-reduced-motion.
*/

import { useLayoutEffect, useRef, useState } from "react";
import { createTimeline, stagger, svg } from "animejs";
import { useReducedMotion } from "motion/react";
import { Kicker } from "@/components/editorial";
import { actions, type Action, type ActionKind } from "@/data/actions";
import { KIND_COLORS } from "@/components/impact-explorer";

/* ┌──────────────────────────────────────┐
    EFFORT MODEL
└──────────────────────────────────────┘ */

// Effort proxy in "minutes-equivalent": actual minutes, plus $1 ≈ 1 min,
// plus 15 min of "discomfort" per courage level above 1. A transparent
// editorial simplification — stated in the chart caption.
function effortMinutes(a: Action): number {
  return Math.max(
    2,
    a.time_minutes + a.cost_usd + (a.courage_level - 1) * 15,
  );
}

/* ┌──────────────────────────────────────┐
    SCALES & LAYOUT
└──────────────────────────────────────┘ */

const W = 720;
const H = 380;
const M = { top: 24, right: 24, bottom: 52, left: 44 };
const X_MIN = 2;
const X_MAX = 600;
const POINT_R = 6;
const POINT_R_ACTIVE = 8;

function xPos(minutes: number): number {
  const t =
    (Math.log(minutes) - Math.log(X_MIN)) /
    (Math.log(X_MAX) - Math.log(X_MIN));
  return M.left + t * (W - M.left - M.right);
}

function yPos(score: number): number {
  return M.top + (1 - score / 100) * (H - M.top - M.bottom);
}

const X_TICKS = [5, 15, 60, 240, 480];
const Y_TICKS = [0, 25, 50, 75, 100];

const KIND_LEGEND: { kind: ActionKind; label: string }[] = [
  { kind: "donation", label: "Donations" },
  { kind: "time", label: "Time" },
  { kind: "courage", label: "Courage" },
  { kind: "habit", label: "Habits" },
];

function tickLabel(minutes: number): string {
  return minutes >= 60 ? `${minutes / 60} h` : `${minutes} min`;
}

/* ┌──────────────────────────────────────┐
    ENTRANCE CHOREOGRAPHY (Anime.js)
└──────────────────────────────────────┘ */

function useFrontierEntrance(
  svgRef: React.RefObject<SVGSVGElement | null>,
  reduced: boolean | null,
) {
  useLayoutEffect(() => {
    if (reduced) return;
    const root = svgRef.current;
    if (!root) return;

    // Hide before first paint; the timeline brings everything back.
    // Static HTML (no JS / crawlers) keeps the fully drawn chart.
    const animated = root.querySelectorAll<SVGElement>("[data-anim]");
    animated.forEach((el) => {
      el.style.opacity = "0";
    });

    let tl: { revert: () => void } | null = null;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();

        const gridLines = root.querySelectorAll<SVGElement>("[data-anim='grid']");
        gridLines.forEach((el) => {
          el.style.opacity = "1";
        });

        tl = createTimeline({ defaults: { ease: "outExpo" } })
          .add(svg.createDrawable(gridLines as NodeListOf<SVGLineElement>), {
            draw: ["0 0", "0 1"],
            duration: 700,
            delay: stagger(45),
          })
          .add(
            root.querySelectorAll("[data-anim='label']"),
            { opacity: [0, 1], duration: 450, delay: stagger(30) },
            "-=450",
          )
          .add(
            root.querySelectorAll("[data-anim='point']"),
            {
              opacity: [0, 1],
              r: [0, POINT_R],
              duration: 550,
              delay: stagger(12),
            },
            "-=250",
          );
      },
      { threshold: 0.25 },
    );
    io.observe(root);

    return () => {
      io.disconnect();
      tl?.revert();
      animated.forEach((el) => {
        el.style.opacity = "";
      });
    };
  }, [svgRef, reduced]);
}

/* ┌──────────────────────────────────────┐
    COMPONENT
└──────────────────────────────────────┘ */

export function ImpactFrontier() {
  const [active, setActive] = useState<Action | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion();

  useFrontierEntrance(svgRef, reduced);

  return (
    <section className="mx-auto mt-20 max-w-6xl px-6">
      <Kicker no="№ 02">The Frontier</Kicker>
      <div className="mt-6 rounded-md border border-border bg-card p-6 shadow-[0_1px_2px_rgba(46,38,28,0.06)]">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
          The impact frontier
        </h2>
        <p className="mt-1 mb-4 max-w-2xl text-sm text-muted-foreground">
          Every action in the dataset: effort in, impact out. The best deals
          live in the top-left. Hover a point for details.
        </p>

        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          {KIND_LEGEND.map(({ kind, label }) => (
            <span
              key={kind}
              className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] text-muted-foreground"
            >
              <span
                className="inline-block size-2.5 rounded-full"
                style={{ backgroundColor: KIND_COLORS[kind] }}
              />
              {label}
            </span>
          ))}
        </div>

        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="mt-2 w-full"
          role="img"
          aria-label="Scatter chart of effort versus impact score for all actions"
        >
          {/* Grid + axes */}
          {Y_TICKS.map((s) => (
            <g key={`y-${s}`}>
              <line
                data-anim="grid"
                x1={M.left}
                x2={W - M.right}
                y1={yPos(s)}
                y2={yPos(s)}
                stroke="var(--chart-grid)"
                strokeWidth={1}
              />
              <text
                data-anim="label"
                x={M.left - 8}
                y={yPos(s) + 4}
                textAnchor="end"
                fontSize={11}
                fontFamily="var(--font-mono)"
                fill="var(--chart-label)"
              >
                {s}
              </text>
            </g>
          ))}
          {X_TICKS.map((m) => (
            <g key={`x-${m}`}>
              <line
                data-anim="grid"
                x1={xPos(m)}
                x2={xPos(m)}
                y1={H - M.bottom}
                y2={M.top}
                stroke="var(--chart-grid)"
                strokeWidth={1}
              />
              <text
                data-anim="label"
                x={xPos(m)}
                y={H - M.bottom + 18}
                textAnchor="middle"
                fontSize={11}
                fontFamily="var(--font-mono)"
                fill="var(--chart-label)"
              >
                {tickLabel(m)}
              </text>
            </g>
          ))}
          <text
            data-anim="label"
            x={(M.left + W - M.right) / 2}
            y={H - 8}
            textAnchor="middle"
            fontSize={11}
            fontFamily="var(--font-mono)"
            fill="var(--chart-label)"
          >
            effort (minutes-equivalent, log scale)
          </text>
          <text
            data-anim="label"
            x={14}
            y={(M.top + H - M.bottom) / 2}
            textAnchor="middle"
            fontSize={11}
            fontFamily="var(--font-mono)"
            fill="var(--chart-label)"
            transform={`rotate(-90 14 ${(M.top + H - M.bottom) / 2})`}
          >
            impact score
          </text>

          {/* Editorial margin note — where the good deals are */}
          <text
            data-anim="label"
            x={M.left + 14}
            y={M.top + 18}
            fontSize={13}
            fontFamily="var(--font-display)"
            fontStyle="italic"
            fill="var(--accent)"
          >
            ↖ the sweet spot
          </text>

          {/* Points */}
          {actions.map((a) => (
            <circle
              data-anim="point"
              key={a.id}
              cx={xPos(effortMinutes(a))}
              cy={yPos(a.score)}
              r={active?.id === a.id ? POINT_R_ACTIVE : POINT_R}
              fill={KIND_COLORS[a.kind]}
              fillOpacity={active && active.id !== a.id ? 0.3 : 0.9}
              stroke="var(--card)"
              strokeWidth={1.5}
              onMouseEnter={() => setActive(a)}
              onMouseLeave={() => setActive(null)}
              style={{
                cursor: "pointer",
                transition: "fill-opacity 0.15s",
              }}
            >
              <title>{`${a.title} — score ${a.score}`}</title>
            </circle>
          ))}
        </svg>

        <div
          className="mt-2 min-h-12 rounded-md border border-border bg-muted/60 px-4 py-2 text-sm"
          aria-live="polite"
        >
          {active ? (
            <span>
              <span className="font-display font-semibold text-foreground">
                {active.title}
              </span>{" "}
              <span className="font-mono text-xs text-muted-foreground">
                — score {active.score} ·{" "}
                {active.cost_usd > 0 ? `$${active.cost_usd} · ` : ""}
                {active.time_minutes > 0 ? `${active.time_minutes} min · ` : ""}
                {active.impact.confidence} confidence
              </span>
            </span>
          ) : (
            <span className="font-mono text-xs text-muted-foreground">
              Hover a point to see the action behind it.
            </span>
          )}
        </div>

        <p className="mt-3 font-mono text-[0.6875rem] leading-relaxed text-muted-foreground">
          Effort is a transparent simplification: minutes of time, plus $1 ≈ 1
          minute, plus 15 “discomfort minutes” per courage level above easy.
          Impact score is our editorial synthesis (0-100) — every underlying
          number and source is in the dataset.
        </p>
      </div>
    </section>
  );
}
