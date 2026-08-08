# Design Language — "The Ledger of Good Deeds"

Written 2026-08-08. This is the visual constitution for the aesthetic
refresh of www.howdogood.com. Every styling decision on the site should
be derivable from this file; when in doubt, re-read the point of view.

## The point of view

**A warm editorial data-journal.** The site reads like a beautifully
typeset broadsheet about doing good: ink on warm paper, a characterful
serif for headlines, print-ink colors for data, hairline rules, and
numbers set in mono like a ledger. Evidence is the brand — so the design
language is the language of print journalism and field notebooks, where
citations, footnotes and figures are the aesthetic, not an afterthought.

This is a full inversion of the old dark Obsidian look. Light, warm,
typographic, tactile. Motion is confident but quiet — things settle onto
the page like type being set, they never bounce for attention.

## Palette (all tokens in `v2/src/index.css`)

Light-only. `<html>` no longer carries the `dark` class.

| Token | Value | Role |
|---|---|---|
| `--background` | `oklch(0.9761 0.0107 90)` | warm paper |
| `--foreground` | `oklch(0.2453 0.0136 60)` | warm ink |
| `--card` | `oklch(0.9911 0.0062 90)` | lighter paper (clippings) |
| `--muted` | `oklch(0.9436 0.0136 85)` | recessed paper |
| `--muted-foreground` | `oklch(0.4587 0.0179 60)` | soft ink (AA on paper) |
| `--border` | `oklch(0.8759 0.0136 80)` | hairline |
| `--primary` | `oklch(0.2764 0.0136 55)` | ink — buttons are ink-black |
| `--accent` | `oklch(0.5265 0.1701 35)` | vermilion — links, emphasis |
| `--rule` | `oklch(0.3162 0.0136 60)` | strong rules (masthead lines) |

**Print inks (kind colors / charts).** Courage shares the vermilion
accent deliberately — moral courage is the site's differentiator, so the
brand accent *is* the courage color.

| Token | Value | Meaning |
|---|---|---|
| `--chart-1` / donation | `oklch(0.5215 0.1077 155)` | emerald ink |
| `--chart-2` / time | `oklch(0.4995 0.1580 255)` | cobalt ink |
| `--chart-3` / courage | `oklch(0.5265 0.1701 35)` | vermilion ink |
| `--chart-4` / habit | `oklch(0.5541 0.1077 75)` | ochre ink |
| `--chart-5` | `oklch(0.4995 0.1382 320)` | plum ink |

All ink-on-paper text combinations hold WCAG AA at small sizes; the
inks are dark enough to be used as text colors directly.

## Typography

Self-hosted via Fontsource variable packages. No runtime Google Fonts.

- **Display — Fraunces Variable** (`--font-display`). Headlines, page
  titles, scores, the wordmark. Weight 550–680, optical size auto,
  tracking −0.015em, leading 1.02–1.1. Italic for flavor words.
- **Text/UI — Instrument Sans Variable** (`--font-sans`). Body copy,
  controls, captions. Weight 400–600.
- **Data — JetBrains Mono Variable** (`--font-mono`). Every number that
  means something: scores, prices, tick labels, dataset meta, badges,
  kickers. If a number is data, it is mono. Weight 400–560.

Scale: hero `clamp(2.6rem, 6vw, 4.25rem)`; page titles ~2.25–3rem;
section heads ~1.35–1.6rem; body 1rem/1.65; captions 0.8125rem;
kickers 0.6875rem mono uppercase tracked +0.14em.

## Layout language

- **Left-aligned editorial**, not centered-poem. Text columns max out
  around 65ch; data surfaces (explorer grid, charts) run wider.
- **Rules structure the page**: a double rule (2px + 1px) under the
  masthead; 1px hairlines between sections; kickers sit on the rule
  like newspaper section slugs ("№ 01 — THE EXPLORER").
- **Cards are clippings**: `--card` paper, 1px hairline border, radius
  `0.375rem`, tiny ink shadow that deepens on hover with a 2px lift.
- **Footnote culture**: sources, confidence grades and caveats are set
  as proper footnote-style typography — small, mono-numbered, always
  visible. Honesty affordances are decoration here, never buried.

## Motion principles

Libraries: **Motion** (`motion/react`) for component/layout/page
transitions; **Anime.js v4** for SVG choreography (frontier chart) and
number counters.

- **Durations**: micro-interactions 150–200ms; entrances 500–700ms;
  chart choreography ≤ 1200ms total. Nothing loops forever.
- **Easings**: entrances `cubic-bezier(0.22, 1, 0.36, 1)` (outQuint) /
  Anime `outExpo`; layout changes use Motion springs (`stiffness ~300,
  damping ~32`) — settle, don't bounce.
- **What animates**: first-view entrances (once, staggered ≤ 60ms/item);
  explorer grid re-layout when sliders change; hover lift on clippings;
  score counters counting up; the frontier chart drawing itself in;
  page transitions (fade + 10px rise).
- **What never animates**: body text, focus outlines, confidence grades
  and source links (honesty affordances do not perform), anything after
  the page has settled.
- **Reduced motion is law**: every Motion component checks
  `useReducedMotion()`; every Anime.js timeline is gated behind
  `matchMedia("(prefers-reduced-motion: reduce)")`. Reduced-motion users
  get the finished layout instantly — same information, zero movement.

## Component notes

- **Buttons**: primary = ink block with paper text, radius 0.375rem,
  mono uppercase micro-label style for small CTAs; hover darkens +
  underlines never disappear on links.
- **Badges/chips**: mono lowercase, hairline border, square-ish; the
  confidence chip is color-coded (high = emerald, medium = ochre,
  low = soft ink) and never omitted.
- **Sliders**: ink track on muted paper rail, vermilion value readout in
  mono; thumb is an ink dot with a visible focus ring.
- **Charts**: paper background, hairline warm grid, ink axis labels in
  mono, print-ink series colors from `--chart-*`.
- **Focus**: 2px vermilion outline offset 2px, everywhere, visible.

## What was revoked (do not resurrect)

Dark Obsidian palette (#1e1e1e / sage / lavender), centered-poem layout,
Geist-everywhere typography, flat thin-border card grid, dark-only
shipping. The v1 root-level site is dead code — never restyle it.
