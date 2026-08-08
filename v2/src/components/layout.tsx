/*
filename: layout.tsx
date: August 8, 2026
programmer: James Tran
title: Site Layout
purpose: Shared navigation and footer wrapped around every routed page
*/

import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

/* ┌──────────────────────────────────────┐
    NAVIGATION
└──────────────────────────────────────┘ */

const NAV_LINK_CLASS = "transition-colors hover:text-primary";

function Nav() {
  return (
    <nav className="fixed top-0 z-50 flex w-full items-center justify-between bg-card px-6 py-3">
      <Link to="/" className="text-lg font-semibold text-foreground">
        How Do Good?
      </Link>
      <ul className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-muted-foreground">
        <li><NavLink className={NAV_LINK_CLASS} to="/">Explorer</NavLink></li>
        <li><NavLink className={NAV_LINK_CLASS} to="/rankings/most-good-per-dollar">Rankings</NavLink></li>
        <li><NavLink className={NAV_LINK_CLASS} to="/data">The Data</NavLink></li>
        <li><NavLink className={NAV_LINK_CLASS} to="/classifieds">Classifieds</NavLink></li>
        <li><NavLink className={NAV_LINK_CLASS} to="/get-listed">Get Listed</NavLink></li>
      </ul>
    </nav>
  );
}

/* ┌──────────────────────────────────────┐
    FOOTER
└──────────────────────────────────────┘ */

function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-card py-6 text-center">
      <a
        href="https://buymeacoffee.com/yotm"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-accent"
      >
        <span>☕</span> Support this project
      </a>
    </footer>
  );
}

/* ┌──────────────────────────────────────┐
    LAYOUT
└──────────────────────────────────────┘ */

export function Layout() {
  const { pathname } = useLocation();

  // Scroll to top on route change (SPA navigation keeps scroll otherwise)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="pt-14">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
