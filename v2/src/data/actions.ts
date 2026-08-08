/*
filename: actions.ts
date: August 8, 2026
programmer: James Tran
title: Actions Dataset Types & Accessors
purpose: Typed access to the curated evidence-ranked actions dataset
         (actions.json). See docs/METHODOLOGY.md for field semantics.
*/

import rawData from "./actions.json";

/* ┌──────────────────────────────────────┐
    TYPES
└──────────────────────────────────────┘ */

export type ActionKind = "donation" | "time" | "courage" | "habit";

export type Confidence = "high" | "medium" | "low";

export interface ActionSource {
  name: string;
  url: string;
  /** ISO date the source was last checked */
  accessed: string;
}

export interface ActionImpact {
  /** Human-readable unit for `value` (e.g. "children supplemented") */
  metric: string;
  value: number;
  explanation: string;
  confidence: Confidence;
}

export interface Action {
  id: string;
  title: string;
  kind: ActionKind;
  categories: string[];
  cost_usd: number;
  time_minutes: number;
  /** 1 (comfortable) to 5 (genuinely hard) — see methodology */
  courage_level: number;
  impact: ActionImpact;
  /** Editorial impact-per-resource score, 0-100 — see methodology */
  score: number;
  sources: ActionSource[];
  act_now_url: string;
}

export interface ActionsDataset {
  version: string;
  updated: string;
  actions: Action[];
}

/* ┌──────────────────────────────────────┐
    ACCESSORS
└──────────────────────────────────────┘ */

const dataset = rawData as unknown as ActionsDataset;

export const actions: Action[] = dataset.actions;
export const datasetVersion = dataset.version;
export const datasetUpdated = dataset.updated;

/** Actions of one kind, ranked by editorial score (highest first) */
export function actionsByKind(kind: ActionKind): Action[] {
  return actions
    .filter((a) => a.kind === kind)
    .sort((a, b) => b.score - a.score);
}

/** Actions affordable within the given money and time budgets */
export function actionsWithinBudget(
  maxUsd: number,
  maxMinutes: number,
): Action[] {
  return actions
    .filter((a) => a.cost_usd <= maxUsd && a.time_minutes <= maxMinutes)
    .sort((a, b) => b.score - a.score);
}

/** All distinct category tags in the dataset */
export function allCategories(): string[] {
  return [...new Set(actions.flatMap((a) => a.categories))].sort();
}
