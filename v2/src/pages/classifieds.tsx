/*
filename: classifieds.tsx
date: August 8, 2026
programmer: James Tran
title: Classifieds Page
purpose: Curated classifieds (ported from v1) with the Get Listed CTA
         card first — the revenue surface of the site, styled like the
         classified column of a broadsheet
*/

import { Link } from "react-router-dom";
import { Chip, Kicker, Reveal } from "@/components/editorial";
import { classifieds, type Classified } from "@/data/classifieds";

/* ┌──────────────────────────────────────┐
    CARDS
└──────────────────────────────────────┘ */

function CtaCard() {
  return (
    <div className="flex h-full flex-col rounded-md border-2 border-dashed border-accent bg-card p-5">
      <span className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.14em] text-accent">
        This space for good
      </span>
      <h3 className="mt-1 font-display text-lg font-semibold text-foreground">
        Your Listing Here
      </h3>
      <p className="mt-3 flex-grow text-sm leading-relaxed text-muted-foreground">
        Community projects and nonprofits list free. Ethical businesses: $10
        for 30 days, one-time — no subscription.
      </p>
      <Link
        to="/get-listed"
        className="mt-4 rounded-md bg-primary px-3 py-2 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        Get listed →
      </Link>
    </div>
  );
}

function ListingCard({ item }: { item: Classified }) {
  return (
    <div className="flex h-full flex-col rounded-md border border-border bg-card p-5 shadow-[0_1px_2px_rgba(46,38,28,0.06)] transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-[0_6px_18px_rgba(46,38,28,0.10)]">
      <span className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {item.category}
      </span>
      <h3 className="mt-1 font-display text-lg font-semibold text-foreground">
        {item.title}
      </h3>
      <p className="mt-3 flex-grow text-sm leading-relaxed text-muted-foreground">
        {item.description}
      </p>
      <p className="mt-3 font-mono text-xs text-muted-foreground">
        contact: {item.contact}
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {item.tags.map((tag) => (
          <Chip key={tag}>{tag}</Chip>
        ))}
      </div>
    </div>
  );
}

/* ┌──────────────────────────────────────┐
    PAGE
└──────────────────────────────────────┘ */

export function ClassifiedsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-12">
      <Kicker no="№ 05">The Classifieds</Kicker>
      <div className="mt-5 max-w-2xl">
        <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-5xl">
          Curated Classifieds
        </h1>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          A curated list of services, products and community projects that
          align with our ethical values. Every listing is manually reviewed.
        </p>
      </div>

      <Reveal>
        <div className="mt-8 grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CtaCard />
          {classifieds.map((item) => (
            <ListingCard key={item.id} item={item} />
          ))}
        </div>
      </Reveal>
    </div>
  );
}
