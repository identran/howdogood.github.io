/*
filename: get-listed.tsx
date: August 8, 2026
programmer: James Tran
title: Get Listed Page
purpose: Listing options for the classifieds (ported from v1
         advertise.html) — free community listings and low-cost
         one-time business listings
*/

import { Kicker, Reveal } from "@/components/editorial";
import { ParticleAction } from "@/components/kokonutui/particle-button";

const ORDER_EMAIL = "identran@gmail.com";

const COMMUNITY_MAILTO = `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(
  "Free Community Listing - How Do Good?",
)}&body=${encodeURIComponent(
  "Hi, I'd like to submit a free community listing.\n\nOrganization/project:\nWebsite (optional):\nListing title:\nListing description:\nContact to display:\nTags:",
)}`;

const BUSINESS_MAILTO = `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(
  "Business Listing Order - How Do Good?",
)}&body=${encodeURIComponent(
  "Hi, I'd like to order a business listing ($10 for 30 days).\n\nBusiness name:\nWebsite:\nListing title:\nListing description:\nContact to display:\nTags:",
)}`;

/* ┌──────────────────────────────────────┐
    PAGE
└──────────────────────────────────────┘ */

export function GetListedPage() {
  return (
    <article className="mx-auto max-w-6xl px-6 pt-12">
      <Kicker no="№ 06">Advertisements</Kicker>
      <div className="mt-5 max-w-2xl">
        <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-5xl">
          Get Listed
        </h1>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          How Do Good? is building a home for people who want to do good in
          their community — and for the projects and businesses that help them
          do it. Community listings are free. Business listings cost less than
          lunch. No subscriptions, no lock-in.
        </p>
      </div>

      <div className="max-w-3xl">
        <Reveal>
          <section className="mt-12" aria-label="Why list here">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
              Why list here?
            </h2>
            <ul className="mt-4 space-y-2.5">
              {[
                ["A values-aligned audience.", "Visitors come here to find acts of kindness, volunteering, and ethical products and services."],
                ["Curated, not crowded.", "Every listing is manually reviewed. Your listing sits alongside a small number of quality listings — not buried in noise."],
                ["Honest pricing while we grow.", "We're an early-stage community site. Listings are priced to be a no-brainer, and paying for one directly supports the project."],
              ].map(([lead, rest]) => (
                <li
                  key={lead}
                  className="rounded-md border border-border bg-card px-4 py-3 text-sm leading-relaxed text-muted-foreground shadow-[0_1px_2px_rgba(46,38,28,0.06)]"
                >
                  <strong className="font-display text-foreground">{lead}</strong>{" "}
                  {rest}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal>
          <section className="mt-12" aria-label="Listing options">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
              Listing options
            </h2>
            <div className="mt-5 grid items-stretch gap-4 md:grid-cols-2">
              <div className="flex flex-col rounded-md border border-border bg-card p-6 shadow-[0_1px_2px_rgba(46,38,28,0.06)]">
                <span className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Community Listing
                </span>
                <div className="mt-2 font-display text-4xl font-semibold text-foreground">
                  Free
                </div>
                <ul className="mt-4 flex-grow space-y-2 text-sm leading-relaxed text-muted-foreground">
                  <li>For nonprofits, volunteer calls, swaps, free events and community projects</li>
                  <li>Title, description, contact and tags</li>
                  <li>Manual review &amp; ethical curation</li>
                  <li>Runs for 60 days, renewable on request</li>
                </ul>
                <ParticleAction href={COMMUNITY_MAILTO} className="mt-5 w-full">
                  Submit a free listing
                </ParticleAction>
              </div>

              <div className="relative flex flex-col rounded-md border-2 border-accent bg-card p-6 shadow-[0_6px_18px_rgba(182,66,24,0.12)]">
                <span className="absolute -top-2.5 right-4 rounded-sm bg-accent px-2 py-0.5 font-mono text-[0.625rem] font-medium uppercase tracking-[0.12em] text-accent-foreground">
                  For Businesses
                </span>
                <span className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.14em] text-accent">
                  Business Listing
                </span>
                <div className="mt-2 font-display text-4xl font-semibold text-foreground">
                  $10
                  <span className="font-sans text-sm font-normal text-muted-foreground">
                    {" "}for 30 days
                  </span>
                </div>
                <ul className="mt-4 flex-grow space-y-2 text-sm leading-relaxed text-muted-foreground">
                  <li>For ethical businesses, makers and paid services</li>
                  <li>Title, description, website link, contact and tags</li>
                  <li>Manual review &amp; ethical curation</li>
                  <li>One-time payment — renew only if it's working for you</li>
                </ul>
                <ParticleAction href={BUSINESS_MAILTO} className="mt-5 w-full">
                  Order a listing — $10
                </ParticleAction>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="mt-12" aria-label="How it works">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
              How it works
            </h2>
            <ol className="mt-4 space-y-3">
              {[
                "Click a button above and send us the pre-filled email with your listing details.",
                "We review your listing to make sure it aligns with our values (usually within 2 business days).",
                "Community listings go live once approved. Business listings go live as soon as your PayPal invoice is paid.",
                "Near the end of your listing period we'll email you once — renew if you'd like, or your listing simply comes down. No auto-billing, ever.",
              ].map((step, i) => (
                <li key={step} className="flex gap-3 leading-relaxed text-muted-foreground">
                  <span className="shrink-0 font-mono text-xs leading-6 text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8 border-t border-border pt-5 font-mono text-[0.6875rem] leading-relaxed text-muted-foreground">
              We reserve the right to decline any listing that doesn't align
              with our ethical values — that curation is exactly what makes
              this page valuable to readers and listers alike. Payment is
              handled securely through PayPal; no payment details are ever
              stored on this site. As the site's audience grows, prices for
              new listings may rise — listings purchased today keep their
              price for their full run.
            </p>
          </section>
        </Reveal>
      </div>
    </article>
  );
}
