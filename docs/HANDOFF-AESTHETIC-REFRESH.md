# Hand-off: Total Aesthetic Refresh of www.howdogood.com

Written 2026-08-08 for a fresh session. Read this whole file before touching
code.

## The objective

**Vastly improve the aesthetics of the site. A total refresh.** None of the
existing visual design rules carry over — they are explicitly revoked, not
defaults to iterate on:

- The dark Obsidian-inspired palette (#1e1e1e / sage #7c9885 / lavender
  #b4a7d6) — revoked.
- The "calm centered-poem" layout inherited from v1 — revoked.
- The current typography (Geist everywhere, one weight axis) — revoked.
- The flat card-grid-with-thin-borders look — revoked.

You own the new direction entirely: light or dark or both, any palette, any
type system, any layout language, motion everywhere it earns its place. The
bar is "someone screenshots this because it looks that good," not "tasteful
default shadcn." Commit to a strong, coherent point of view rather than a
safe average of trends.

## What must NOT change (hard constraints)

1. **Functionality and information.** All pages, routes, the explorer's
   slider logic, the frontier chart's data, every action's impact
   numbers/sources/confidence grades. This is a reskin at the soul level,
   not a rewrite of content or data.
2. **URLs.** `/`, `/action/:id` (41), `/rankings/:slug` (4), `/data`,
   `/classifieds`, `/get-listed`, plus the legacy .html redirect stubs.
   The route table in `v2/scripts/generate-static-pages.mjs` must stay in
   sync with `v2/src/App.tsx` and `v2/src/lib/rankings.ts`.
3. **SEO plumbing.** generate-static-pages.mjs (per-route HTML, sitemap,
   robots, CNAME, 404 fallback) keeps running in the build.
4. **Revenue surfaces.** Classifieds CTA card, Get Listed pricing/order
   flow (free community / $10 business, mailto buttons), and the
   Buy Me a Coffee link (https://buymeacoffee.com/yotm) must remain present
   and prominent — restyle them freely.
5. **Honesty affordances.** Confidence grades, "score never stands alone,"
   source links with access dates — these must stay visible in the new
   design, not decoratively buried.
6. **Accessibility.** Keyboard navigable, visible focus states, WCAG AA
   contrast in the new palette, and `prefers-reduced-motion` respected for
   every animation you add (Motion's `useReducedMotion`, or media-query
   guards for Anime.js timelines).

## The mandated resources (use all three)

1. **Motion — https://motion.dev/** (React animation library, successor to
   Framer Motion). **Already installed** — `motion@13` is a dependency of
   the bklit charts; import from `"motion/react"`. Use it for component/
   layout animation: page transitions between routes, staggered card
   entrances in the explorer, layout animations when slider filters change
   the result set, scroll-linked reveals, springy hover states.
2. **Anime.js — https://animejs.com/** (imperative animation engine, v4
   API). `npm install animejs`. Use it where Motion is awkward: SVG-level
   work (the impact-frontier chart's points/axes drawing themselves in),
   number/counter effects, timeline choreography on the hero, playful
   micro-interactions. Guard all of it behind reduced-motion checks.
3. **KokonutUI — https://kokonutui.com/** (100+ open-source animated
   components built on Tailwind + shadcn/ui + Motion). Installs through the
   registry system this project already uses:
   `npx shadcn@latest add @kokonutui/<component>` (use `-o` to skip
   overwrite prompts in non-interactive shells). Browse the catalog and
   pull components for hero sections, animated cards, buttons, text
   effects — then restyle their tokens to your new system rather than
   shipping their demo look verbatim.

## Codebase orientation

- Everything lives in **`v2/`** (Vite + React 19 + TypeScript + Tailwind v4
  + shadcn, radix/nova preset). The repo-root HTML/CSS/JS files are the
  dead v1 site — kept for history, no longer served. **Do not restyle v1.**
- Theming: `v2/src/index.css` — shadcn preset tokens, then a
  "HOW DO GOOD? THEME OVERRIDES" block at the bottom that currently pins
  the old palette. Replace that block with your new token system. The
  charts (bklit's in `src/components/charts/` and the custom SVG frontier
  in `src/components/impact-frontier.tsx`) read CSS variables
  (`--chart-1..5`, `--chart-grid`, `--chart-label`, etc.) — redefine those
  to your palette and the charts follow. `<html class="dark">` is set in
  `index.html`; change if your direction isn't dark-only.
- Pages: `v2/src/pages/` (home, action-detail, rankings, data-page,
  classifieds, get-listed). Shared shell: `v2/src/components/layout.tsx`.
  Explorer/frontier: `v2/src/components/impact-explorer.tsx`,
  `impact-frontier.tsx`.
- Fonts: currently `@fontsource-variable/geist` imported via
  `shadcn/tailwind.css` preset. Add new fonts via Fontsource packages
  (self-hosted — the site should not depend on runtime Google Fonts).

## Working agreement

- **Commands**: dev server via the registered preview `howdogood-v2`
  (port 8299). Build: `npm run build` in `v2/` (runs dataset validation →
  tsc → vite → static page generation; all must pass).
- **Verify like the last session did**: check pages in the browser pane at
  multiple widths (`resize_window`: mobile 375 / tablet 768 / desktop),
  screenshot each page type (home, one action page, one ranking, data,
  classifieds, get-listed), and check the console on the **production
  build** (`npx -y http-server dist -p 8399`) — the dev-server console
  accumulates stale HMR errors that look scarier than they are.
- **Deploys are automatic**: any push to `master` ships to
  www.howdogood.com within ~a minute via `.github/workflows/deploy-v2.yml`.
  Work in ordinary commits; push when a coherent, verified state is
  reached — the live site should never sit half-restyled between two
  visual languages.
- Follow the repo's code-standards conventions (header comment blocks,
  box-drawing section dividers) — match existing file style.
- Chunk-size note: the bundle already warns at ~500 kB. Anime.js is small,
  but if the refresh adds weight, consider route-level code splitting
  (React.lazy) as part of the work.

## Suggested shape of the session

1. Pick the design direction first — write it down in a short
   `docs/DESIGN-LANGUAGE.md` (palette tokens, type scale, spacing, radius,
   motion principles: durations/easings/what animates and what never does).
   Three strong candidate directions to consider (pick one, or your own):
   "editorial data-journal" (light, serif display, ink-on-paper charts),
   "luminous dark" (deep neutrals, one electric accent, glassy surfaces,
   glow-on-data), or "warm humanist" (cream/terracotta, rounded, tactile).
2. Rebuild the token layer in index.css + chart variables.
3. Restyle the shell (nav/footer) and home/explorer with Motion layout
   animations; bring in KokonutUI pieces where they fit.
4. Frontier chart: Anime.js entrance choreography + restyled axes/points.
5. Sweep the remaining pages (action detail, rankings, data, classifieds,
   get-listed) so nothing is left in the old skin.
6. Full verification pass (all page types × 3 widths × reduced-motion on),
   then push and verify live.

## Context you'd otherwise have to rediscover

- Session memory exists at the project memory path — read `MEMORY.md` and
  `howdogood-v2-redesign.md` there for the full build history.
- bklit's ScatterChart only supports date x-axes — that's why the frontier
  is a custom SVG. Don't try to migrate it back.
- Root `.gitignore` ignores `package-lock.json` globally with a
  `!v2/package-lock.json` exception — keep the exception; CI's `npm ci`
  needs it.
- The strategy docs are `docs/REDESIGN.md` (product) and
  `docs/MONETIZATION.md` (revenue); `docs/METHODOLOGY.md` mirrors the
  /data page — if you rewrite that page's copy, keep the doc in sync.
