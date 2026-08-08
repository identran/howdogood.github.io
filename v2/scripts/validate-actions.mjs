/*
filename: validate-actions.mjs
date: August 8, 2026
programmer: James Tran
title: Actions Dataset Validator
purpose: Sanity-checks src/data/actions.json — required fields, enum
         values, ranges, unique ids, and that every action cites at
         least one source. Run: node scripts/validate-actions.mjs
*/

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

/* ┌──────────────────────────────────────┐
    LOAD
└──────────────────────────────────────┘ */

const here = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(
  readFileSync(join(here, "..", "src", "data", "actions.json"), "utf8"),
);

/* ┌──────────────────────────────────────┐
    VALIDATE
└──────────────────────────────────────┘ */

const KINDS = ["donation", "time", "courage", "habit"];
const CONFIDENCE = ["high", "medium", "low"];
const errors = [];
const ids = new Set();

for (const a of data.actions) {
  const where = a.id ?? "(missing id)";

  if (!a.id) errors.push(`${where}: missing id`);
  if (ids.has(a.id)) errors.push(`${where}: duplicate id`);
  ids.add(a.id);

  if (!a.title) errors.push(`${where}: missing title`);
  if (!KINDS.includes(a.kind)) errors.push(`${where}: bad kind "${a.kind}"`);
  if (!Array.isArray(a.categories) || a.categories.length === 0)
    errors.push(`${where}: needs at least one category`);
  if (typeof a.cost_usd !== "number" || a.cost_usd < 0)
    errors.push(`${where}: bad cost_usd`);
  if (typeof a.time_minutes !== "number" || a.time_minutes < 0)
    errors.push(`${where}: bad time_minutes`);
  if (!Number.isInteger(a.courage_level) || a.courage_level < 1 || a.courage_level > 5)
    errors.push(`${where}: courage_level must be integer 1-5`);
  if (typeof a.score !== "number" || a.score < 0 || a.score > 100)
    errors.push(`${where}: score must be 0-100`);

  if (!a.impact) {
    errors.push(`${where}: missing impact`);
  } else {
    if (!a.impact.metric) errors.push(`${where}: impact.metric missing`);
    if (typeof a.impact.value !== "number")
      errors.push(`${where}: impact.value must be a number`);
    if (!a.impact.explanation || a.impact.explanation.length < 40)
      errors.push(`${where}: impact.explanation missing or too short`);
    if (!CONFIDENCE.includes(a.impact.confidence))
      errors.push(`${where}: bad confidence "${a.impact?.confidence}"`);
  }

  if (!Array.isArray(a.sources) || a.sources.length === 0) {
    errors.push(`${where}: every action must cite at least one source`);
  } else {
    for (const s of a.sources) {
      if (!s.name || !s.url || !s.accessed)
        errors.push(`${where}: source needs name, url, accessed`);
      if (s.url && !s.url.startsWith("https://"))
        errors.push(`${where}: source url must be https`);
    }
  }

  if (!a.act_now_url || !a.act_now_url.startsWith("https://"))
    errors.push(`${where}: act_now_url missing or not https`);
}

/* ┌──────────────────────────────────────┐
    REPORT
└──────────────────────────────────────┘ */

const byKind = {};
for (const a of data.actions) byKind[a.kind] = (byKind[a.kind] ?? 0) + 1;

console.log(`actions: ${data.actions.length}`);
console.log(`by kind: ${JSON.stringify(byKind)}`);
console.log(`dataset version: ${data.version} (updated ${data.updated})`);

if (errors.length > 0) {
  console.error(`\n${errors.length} error(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log("OK — dataset valid");
