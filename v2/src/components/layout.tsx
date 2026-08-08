/*
filename: layout.tsx
date: August 8, 2026
programmer: James Tran
title: Site Layout
purpose: Shared masthead, footer colophon and page transition wrapped
         around every routed page — "The Ledger of Good Deeds" shell
         (docs/DESIGN-LANGUAGE.md)
*/

import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { DoubleRule, EASE_OUT } from "@/components/editorial";
import { actions, datasetUpdated, datasetVersion } from "@/data/actions";

/* ┌──────────────────────────────────────┐
    NAVIGATION
└──────────────────────────────────────┘ */

const NAV_ITEMS: { to: string; prefix: string; label: string }[] = [
  { to: "/", prefix: "/", label: "Explorer" },
  { to: "/rankings/most-good-per-dollar", prefix: "/rankings", label: "Rankings" },
  { to: "/data", prefix: "/data", label: "The Data" },
  { to: "/classifieds", prefix: "/classifieds", label: "Classifieds" },
  { to: "/get-listed", prefix: "/get-listed", label: "Get Listed" },
];

function isActive(prefix: string, pathname: string): boolean {
  if (prefix === "/") return pathname === "/" || pathname.startsWith("/action");
  return pathname.startsWith(prefix);
}

function Wordmark({ className }: { className?: string }) {
  return (
    <span className={className}>
      How Do Good<span className="text-accent">?</span>
    </span>
  );
}

function Nav() {
  const { pathname } = useLocation();
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 pt-4 pb-3">
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
            <Link
              to="/"
              className="font-display text-xl font-semibold tracking-tight text-foreground"
            >
              <Wordmark />
            </Link>
            <span className="hidden font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground lg:inline">
              {today}
            </span>
          </div>
          <nav aria-label="Main">
            <ul className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    aria-current={isActive(item.prefix, pathname) ? "page" : undefined}
                    className={`font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
                      isActive(item.prefix, pathname)
                        ? "text-foreground underline decoration-accent decoration-2 underline-offset-[6px]"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <DoubleRule />
      </div>
    </header>
  );
}

/* ┌──────────────────────────────────────┐
    FOOTER (colophon)
└──────────────────────────────────────┘ */

function Footer() {
  return (
    <footer className="mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <DoubleRule />
        <div className="grid gap-10 py-10 md:grid-cols-3">
          <div>
            <Wordmark className="font-display text-lg font-semibold text-foreground" />
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Acts of kindness and moral courage, ranked by evidence — so the
              resources you have go where they matter most.
            </p>
            <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground">
              Dataset v{datasetVersion} · {actions.length} actions · reviewed{" "}
              {datasetUpdated}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Sections
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-foreground underline-offset-4 hover:text-accent hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Keep it running
            </h2>
            <a
              href="https://buymeacoffee.com/yotm"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-foreground"
            >
              <span aria-hidden="true">☕</span> Support this project
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Independent, ad-light, open data. A coffee keeps the sources
              checked and the servers humming.
            </p>
          </div>
        </div>
        <div className="border-t border-border py-4">
          <p className="font-mono text-[0.6875rem] leading-relaxed tracking-[0.02em] text-muted-foreground">
            Set in Fraunces, Instrument Sans &amp; JetBrains Mono. Every score
            cites its source — the score never stands alone.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ┌──────────────────────────────────────┐
    LAYOUT
└──────────────────────────────────────┘ */

export function Layout() {
  const { pathname } = useLocation();
  const reduced = useReducedMotion();

  // Scroll to top on route change (SPA navigation keeps scroll otherwise)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      {reduced ? (
        <main>
          <Outlet />
        </main>
      ) : (
        // Keyed by pathname: each page enters with the house fade-and-rise
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
        >
          <Outlet />
        </motion.main>
      )}
      <Footer />
    </div>
  );
}
