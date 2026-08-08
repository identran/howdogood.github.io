/*
filename: classifieds.tsx
date: August 8, 2026
programmer: James Tran
title: Classifieds Page
purpose: Curated classifieds (ported from v1) with the Get Listed CTA
         card first — the revenue surface of the site
*/

import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { classifieds, type Classified } from "@/data/classifieds";

/* ┌──────────────────────────────────────┐
    CARDS
└──────────────────────────────────────┘ */

function CtaCard() {
  return (
    <div className="flex flex-col rounded-lg border border-dashed border-primary bg-card p-5">
      <h3 className="font-semibold text-primary">Your Listing Here</h3>
      <Badge className="mt-2 w-fit bg-primary text-primary-foreground">
        Get Listed
      </Badge>
      <p className="mt-3 flex-grow text-sm leading-relaxed text-muted-foreground">
        Community projects and nonprofits list free. Ethical businesses: $10
        for 30 days, one-time — no subscription.
      </p>
      <Link
        to="/get-listed"
        className="mt-4 rounded-md bg-primary px-3 py-2 text-center text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
      >
        Get listed →
      </Link>
    </div>
  );
}

function ListingCard({ item }: { item: Classified }) {
  return (
    <div className="flex flex-col rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary">
      <h3 className="font-semibold text-primary">{item.title}</h3>
      <Badge className="mt-2 w-fit bg-primary/90 text-primary-foreground">
        {item.category}
      </Badge>
      <p className="mt-3 flex-grow text-sm leading-relaxed text-muted-foreground">
        {item.description}
      </p>
      <p className="mt-3 text-xs text-muted-foreground">
        Contact: {item.contact}
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded bg-background px-2 py-0.5 text-xs text-muted-foreground"
          >
            {tag}
          </span>
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
    <div className="mx-auto max-w-5xl px-6 pt-10">
      <h1 className="text-center text-3xl font-bold tracking-tight text-foreground">
        Curated Classifieds
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
        A curated list of services, products and community projects that align
        with our ethical values. Every listing is manually reviewed.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CtaCard />
        {classifieds.map((item) => (
          <ListingCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
