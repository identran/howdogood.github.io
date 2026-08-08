/*
filename: generate-static-pages.mjs
date: August 8, 2026
programmer: James Tran
title: Static Page Generator
purpose: Post-build step — emits one dist/<route>/index.html per app
         route with unique title/description/canonical (so crawlers see
         real pages on GitHub Pages), a dist/sitemap.xml, and a 404.html
         SPA fallback. Run automatically by `npm run build`.
*/

import { mkdirSync, readFileSync, writeFileSync, copyFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

/* ┌──────────────────────────────────────┐
    LOAD DATA & TEMPLATE
└──────────────────────────────────────┘ */

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const dist = join(root, "dist");
const template = readFileSync(join(dist, "index.html"), "utf8");
const { actions } = JSON.parse(
  readFileSync(join(root, "src", "data", "actions.json"), "utf8"),
);

const ORIGIN = "https://www.howdogood.com";

/* ┌──────────────────────────────────────┐
    ROUTE TABLE
└──────────────────────────────────────┘ */

// Keep in sync with src/App.tsx routes and src/lib/rankings.ts
const RANKINGS = [
  { slug: "most-good-per-dollar", title: "Most Good Per Dollar", description: "Donations ranked by how much good each dollar does — every estimate cited." },
  { slug: "most-good-per-hour", title: "Most Good Per Hour", description: "Ways to give your time, ranked by evidence — from blood donation to tutoring." },
  { slug: "courage-that-counts", title: "Courage That Counts", description: "Moral courage, ranked: the hardest good deeds are free and nobody else ranks them." },
  { slug: "habits-that-add-up", title: "Habits That Add Up", description: "Set-once habits ranked by the impact they compound over a year." },
];

const routes = [
  {
    path: "data",
    title: "The Data - How Do Good?",
    description:
      "How our impact estimates work: confidence grades, sources policy, and the limits of the 0-100 score.",
  },
  ...RANKINGS.map((r) => ({
    path: `rankings/${r.slug}`,
    title: `${r.title} - How Do Good?`,
    description: r.description,
  })),
  ...actions.map((a) => ({
    path: `action/${a.id}`,
    title: `${a.title} - How Do Good?`,
    description: a.impact.explanation.slice(0, 155),
  })),
];

/* ┌──────────────────────────────────────┐
    EMIT PAGES
└──────────────────────────────────────┘ */

function esc(s) {
  return s.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
}

function pageHtml(route) {
  const url = `${ORIGIN}/${route.path}/`;
  return template
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(route.title)}</title>`)
    .replace(
      /<meta name="description" content="[^"]*" \/>/,
      `<meta name="description" content="${esc(route.description)}" />`,
    )
    .replace("</head>", `  <link rel="canonical" href="${url}" />\n  </head>`);
}

for (const route of routes) {
  const dir = join(dist, ...route.path.split("/"));
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), pageHtml(route));
}

// Home canonical + SPA fallback for unknown paths on GitHub Pages
writeFileSync(
  join(dist, "index.html"),
  template.replace("</head>", `  <link rel="canonical" href="${ORIGIN}/" />\n  </head>`),
);
copyFileSync(join(dist, "index.html"), join(dist, "404.html"));

/* ┌──────────────────────────────────────┐
    SITEMAP
└──────────────────────────────────────┘ */

const today = new Date().toISOString().slice(0, 10);
const urls = ["", ...routes.map((r) => `${r.path}/`)]
  .map(
    (p) =>
      `    <url><loc>${ORIGIN}/${p}</loc><lastmod>${today}</lastmod></url>`,
  )
  .join("\n");

writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);

console.log(`generated ${routes.length + 1} pages + sitemap + 404 fallback`);
