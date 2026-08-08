/*
filename: type-writer.tsx
date: August 8, 2026
programmer: James Tran (adapted from KokonutUI "type-writer" by
            @dorianbaffier, MIT — https://kokonutui.com)
title: Type Writer
purpose: Types a list of phrases once — typing, holding, deleting —
         and settles on the last phrase (no infinite loop, per the
         motion principles in docs/DESIGN-LANGUAGE.md). Reduced-motion
         users get the final phrase rendered instantly, no cursor.
*/

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/* ┌──────────────────────────────────────┐
    TYPING RHYTHM
└──────────────────────────────────────┘ */

// Human-ish variance: mostly ±40%, occasional hesitation or burst
function vary(base: number): number {
  const r = Math.random();
  if (r < 0.1) return base * 2;
  if (r > 0.9) return base * 0.5;
  return base * (0.6 + Math.random() * 0.8);
}

/* ┌──────────────────────────────────────┐
    COMPONENT
└──────────────────────────────────────┘ */

type TypeWriterProps = {
  phrases: string[];
  className?: string;
  typingSpeed?: number;
  deleteSpeed?: number;
  holdBetween?: number;
  startDelay?: number;
};

export function TypeWriter({
  phrases,
  className,
  typingSpeed = 55,
  deleteSpeed = 26,
  holdBetween = 1100,
  startDelay = 500,
}: TypeWriterProps) {
  const reduced = useReducedMotion();
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);
  const finalPhrase = phrases[phrases.length - 1] ?? "";

  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    let timer = 0;
    let phrase = 0;
    let chars = 0;
    let deleting = false;

    const step = () => {
      if (cancelled) return;
      const current = phrases[phrase] ?? "";
      if (deleting) {
        if (chars > 0) {
          chars -= 1;
          setText(current.slice(0, chars));
          timer = window.setTimeout(step, deleteSpeed);
        } else {
          deleting = false;
          phrase += 1;
          timer = window.setTimeout(step, 140);
        }
      } else if (chars < current.length) {
        chars += 1;
        setText(current.slice(0, chars));
        timer = window.setTimeout(step, vary(typingSpeed));
      } else if (phrase < phrases.length - 1) {
        deleting = true;
        timer = window.setTimeout(step, holdBetween);
      } else {
        setDone(true);
      }
    };

    timer = window.setTimeout(step, startDelay);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [phrases, reduced, typingSpeed, deleteSpeed, holdBetween, startDelay]);

  return (
    <span className={cn("inline-flex items-baseline", className)}>
      {/* Screen readers get the settled phrase, not keystrokes */}
      <span className="sr-only">{finalPhrase}</span>
      <span aria-hidden="true">{reduced ? finalPhrase : text}</span>
      {!reduced && (
        <motion.span
          aria-hidden="true"
          className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.12em] bg-accent"
          animate={done ? { opacity: 0 } : { opacity: [1, 1, 0, 0] }}
          transition={
            done
              ? { duration: 0.7, delay: 0.8 }
              : { duration: 0.9, repeat: Infinity, ease: "linear" }
          }
        />
      )}
    </span>
  );
}
