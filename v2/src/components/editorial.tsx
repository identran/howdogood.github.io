/*
filename: editorial.tsx
date: August 8, 2026
programmer: James Tran
title: Editorial Primitives
purpose: Shared visual grammar for "The Ledger of Good Deeds" design
         language (docs/DESIGN-LANGUAGE.md) — newspaper section slugs
         (kickers), masthead rules, and reduced-motion-aware reveals.
*/

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/* ┌──────────────────────────────────────┐
    MOTION CONSTANTS
└──────────────────────────────────────┘ */

// House entrance easing (outQuint) — see DESIGN-LANGUAGE.md
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/* ┌──────────────────────────────────────┐
    RULES
└──────────────────────────────────────┘ */

// Classic broadsheet double rule: 2px over 1px
export function DoubleRule({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("space-y-[3px]", className)}>
      <div className="h-[2px] bg-[color:var(--rule)]" />
      <div className="h-px bg-[color:var(--rule)]" />
    </div>
  );
}

/* ┌──────────────────────────────────────┐
    KICKER (section slug)
└──────────────────────────────────────┘ */

const KICKER_TEXT_CLASS =
  "font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em]";

export function Kicker({
  no,
  children,
  className,
}: {
  no: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className={cn(KICKER_TEXT_CLASS, "shrink-0 text-accent")}>{no}</span>
      <span className={cn(KICKER_TEXT_CLASS, "shrink-0 text-muted-foreground")}>
        {children}
      </span>
      <span aria-hidden="true" className="h-px min-w-8 flex-1 bg-border" />
    </div>
  );
}

/* ┌──────────────────────────────────────┐
    CHIPS (ledger metadata)
└──────────────────────────────────────┘ */

export function Chip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-border px-1.5 py-0.5 font-mono text-[0.6875rem] leading-relaxed text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

// Confidence is an honesty affordance — always visible, color-coded to
// the print inks (high = emerald, medium = ochre, low = soft ink)
const CONFIDENCE_CHIP: Record<string, string> = {
  high: "border-[color:var(--chart-1)]/50 text-[color:var(--chart-1)]",
  medium: "border-[color:var(--chart-4)]/50 text-[color:var(--chart-4)]",
  low: "border-border text-muted-foreground",
};

export function ConfidenceChip({
  level,
  className,
}: {
  level: string;
  className?: string;
}) {
  return (
    <Chip className={cn(CONFIDENCE_CHIP[level] ?? "", className)}>
      {level} confidence
    </Chip>
  );
}

/* ┌──────────────────────────────────────┐
    REVEAL (scroll-linked entrance)
└──────────────────────────────────────┘ */

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
