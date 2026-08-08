/*
filename: get-listed.tsx
date: August 8, 2026
programmer: James Tran
title: Get Listed Page
purpose: Listing options for the classifieds (ported from v1
         advertise.html) — free community listings and low-cost
         one-time business listings
*/

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
    <article className="mx-auto max-w-3xl px-6 pt-10">
      <h1 className="text-center text-3xl font-bold tracking-tight text-foreground">
        Get Listed
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
        How Do Good? is building a home for people who want to do good in
        their community — and for the projects and businesses that help them
        do it. Community listings are free. Business listings cost less than
        lunch. No subscriptions, no lock-in.
      </p>

      <section className="mt-10" aria-label="Why list here">
        <h2 className="text-xl font-semibold text-primary">Why list here?</h2>
        <ul className="mt-3 space-y-2">
          {[
            ["A values-aligned audience.", "Visitors come here to find acts of kindness, volunteering, and ethical products and services."],
            ["Curated, not crowded.", "Every listing is manually reviewed. Your listing sits alongside a small number of quality listings — not buried in noise."],
            ["Honest pricing while we grow.", "We're an early-stage community site. Listings are priced to be a no-brainer, and paying for one directly supports the project."],
          ].map(([lead, rest]) => (
            <li
              key={lead}
              className="rounded-lg border border-border bg-card px-4 py-3 text-sm text-muted-foreground"
            >
              <strong className="text-foreground">{lead}</strong> {rest}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10" aria-label="Listing options">
        <h2 className="text-xl font-semibold text-primary">Listing options</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="flex flex-col rounded-lg border border-border bg-card p-6">
            <h3 className="font-semibold text-primary">Community Listing</h3>
            <div className="mt-2 text-3xl font-bold text-foreground">Free</div>
            <ul className="mt-4 flex-grow space-y-2 text-sm text-muted-foreground">
              <li>For nonprofits, volunteer calls, swaps, free events and community projects</li>
              <li>Title, description, contact and tags</li>
              <li>Manual review &amp; ethical curation</li>
              <li>Runs for 60 days, renewable on request</li>
            </ul>
            <a
              href={COMMUNITY_MAILTO}
              className="mt-5 rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
            >
              Submit a free listing
            </a>
          </div>

          <div className="flex flex-col rounded-lg border border-primary bg-card p-6 shadow-[0_6px_16px_rgba(124,152,133,0.2)]">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-primary">Business Listing</h3>
              <span className="rounded bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                For Businesses
              </span>
            </div>
            <div className="mt-2 text-3xl font-bold text-foreground">
              $10
              <span className="text-sm font-normal text-muted-foreground">
                {" "}for 30 days
              </span>
            </div>
            <ul className="mt-4 flex-grow space-y-2 text-sm text-muted-foreground">
              <li>For ethical businesses, makers and paid services</li>
              <li>Title, description, website link, contact and tags</li>
              <li>Manual review &amp; ethical curation</li>
              <li>One-time payment — renew only if it's working for you</li>
            </ul>
            <a
              href={BUSINESS_MAILTO}
              className="mt-5 rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
            >
              Order a listing — $10
            </a>
          </div>
        </div>
      </section>

      <section className="mt-10" aria-label="How it works">
        <h2 className="text-xl font-semibold text-primary">How it works</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-muted-foreground">
          <li>Click a button above and send us the pre-filled email with your listing details.</li>
          <li>We review your listing to make sure it aligns with our values (usually within 2 business days).</li>
          <li>Community listings go live once approved. Business listings go live as soon as your PayPal invoice is paid.</li>
          <li>Near the end of your listing period we'll email you once — renew if you'd like, or your listing simply comes down. No auto-billing, ever.</li>
        </ol>
        <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
          We reserve the right to decline any listing that doesn't align with
          our ethical values — that curation is exactly what makes this page
          valuable to readers and listers alike. Payment is handled securely
          through PayPal; no payment details are ever stored on this site. As
          the site's audience grows, prices for new listings may rise —
          listings purchased today keep their price for their full run.
        </p>
      </section>
    </article>
  );
}
