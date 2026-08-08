/*
filename: particle-button.tsx
date: August 8, 2026
programmer: James Tran (adapted from KokonutUI "particle-button" by
            @dorianbaffier, MIT — https://kokonutui.com)
title: Ink Burst Action
purpose: The site's primary CTA (an ink-block link or button) that
         celebrates a click with a small burst of print-ink particles —
         a quiet cheer for committing to a good deed. Skipped entirely
         under prefers-reduced-motion.
*/

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/* ┌──────────────────────────────────────┐
    INK PARTICLES
└──────────────────────────────────────┘ */

const INK_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

function InkParticles({ origin }: { origin: { x: number; y: number } }) {
  return (
    <AnimatePresence>
      {Array.from({ length: 10 }, (_, i) => (
        <motion.span
          key={i}
          className="pointer-events-none fixed z-50 size-1.5 rounded-full"
          style={{
            left: origin.x,
            top: origin.y,
            backgroundColor: INK_COLORS[i % INK_COLORS.length],
          }}
          initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
          animate={{
            scale: [0, 1, 0.7, 0],
            x: (i % 2 ? 1 : -1) * (16 + Math.random() * 44),
            y: -(12 + Math.random() * 48),
            opacity: [1, 1, 1, 0],
          }}
          transition={{
            duration: 0.65,
            delay: i * 0.03,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
    </AnimatePresence>
  );
}

/* ┌──────────────────────────────────────┐
    INK ACTION (link or button)
└──────────────────────────────────────┘ */

const INK_ACTION_CLASS =
  "relative inline-flex items-center justify-center gap-1.5 rounded-md " +
  "bg-primary px-4 py-2 text-sm font-medium text-primary-foreground " +
  "transition-[transform,background-color] duration-150 hover:bg-foreground " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

type ParticleActionProps = {
  href?: string;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick">;

export function ParticleAction({
  href,
  onClick,
  className,
  children,
  ...props
}: ParticleActionProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const timerRef = useRef(0);
  const [burst, setBurst] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const handleClick = () => {
    if (!reduced && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setBurst({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setBurst(null), 750);
    }
    onClick?.();
  };

  const classes = cn(INK_ACTION_CLASS, burst && "scale-[0.97]", className);

  return (
    <>
      {burst && <InkParticles origin={burst} />}
      {href ? (
        <a
          ref={ref as React.RefObject<HTMLAnchorElement>}
          href={href}
          onClick={handleClick}
          className={classes}
          {...props}
        >
          {children}
        </a>
      ) : (
        <button
          ref={ref as React.RefObject<HTMLButtonElement>}
          type="button"
          onClick={handleClick}
          className={classes}
        >
          {children}
        </button>
      )}
    </>
  );
}
