# How Do Good? — Monetization Playbook

Goal: **~$1,000/month**. Written 2026-08-08.

## Revenue model

| Stream | Price | Path to $1,000/mo |
|---|---|---|
| Featured classified listings | $39/mo | 10 listings ≈ $390 |
| Basic classified listings | $15/mo | 20 listings ≈ $300 |
| Site sponsors (max 2) | $99/mo | 2 sponsors ≈ $198 |
| Donations (Buy Me a Coffee / PayPal) | variable | ~$100 |

Realistic expectation: this takes **6–12 months** of consistent marketing, not weeks.
The bottleneck is traffic — advertisers pay for an audience, so everything below
serves the loop: *content → traffic → advertisers → revenue*.

## What's live on the site

- **/advertise.html** — pricing page (Basic $15, Featured $39, Sponsor $99).
  Order flow: advertiser emails their listing → you review → you send a PayPal
  invoice → listing goes live once paid.
- **/kindness-ideas.html** — static, Google-indexable page with all 60 acts
  (the generator itself renders via JavaScript, which search engines index poorly).
- **/classifieds.html** — now opens with a "Your Listing Here" card linking to the
  advertise page. Current 20 listings are **samples** (fake contacts); replace them
  with real paying listings as they come in.
- **sitemap.xml / robots.txt / structured data** — SEO plumbing.

## Owner setup tasks (one-time)

### 1. PayPal Business account

1. Go to paypal.com/business → "Sign up" → **Business account**.
2. Use an email you'll keep long-term (a domain email like hello@howdogood.com is
   more professional — see step 3).
3. Business type: "Individual/Sole proprietorship" is fine to start (check local
   requirements — in Germany you may need to register a Gewerbe before charging
   for listings; income is taxable either way).
4. Once verified, use **Invoicing** (free) to bill advertisers monthly, or set up
   **recurring invoices/subscriptions** so renewals are automatic.
5. Optional later: create PayPal payment buttons and replace the mailto links on
   advertise.html with direct "Pay now" buttons.
6. Also add a **PayPal.me/donate link** to the site footer alongside Buy Me a Coffee.

### 2. Domain email (recommended before outreach)

The advertise page currently uses identran@gmail.com. Squarespace domains include
free email forwarding: Squarespace → Domains → howdogood.com → Email Forwarding →
create `hello@howdogood.com` → forward to identran@gmail.com. Then update the
mailto links in advertise.html.

### 3. Social media accounts (marketing engine)

Create accounts with the handle **@howdogood** (or closest available:
@howdogoodcom, @how.do.good):

- **Instagram** — primary. Daily/every-other-day post: one act of kindness as a
  simple dark-background quote card (matches site aesthetic). Link in bio → site.
- **Pinterest** — surprisingly strong for "kindness ideas" searches; pin the same
  quote cards, link each pin to kindness-ideas.html.
- **TikTok / Reels** — short "today's act of kindness" clips when you have time.
- **X/Twitter + Facebook page** — repost the same content; low effort.

Posting rhythm that's sustainable: batch-create 30 quote cards once a month
(Canva or ask Claude to generate them), schedule via Meta Business Suite (free).

### 4. Analytics & search

- Add the site to **Google Search Console** (verify via DNS on Squarespace) and
  submit sitemap.xml — this gets the ideas page indexed.
- Add privacy-friendly analytics (e.g. GoatCounter, free) or Google Analytics to
  measure traffic before selling ads on real numbers.

## Advertiser outreach (first 10 customers)

The classifieds concept targets: ethical/eco local businesses, nonprofits,
community projects, Etsy-style makers, fair-trade shops.

1. List 30 local/online businesses that fit the values.
2. Email pitch: audience description + screenshot of the classifieds page +
   "first month free for founding advertisers" offer.
3. A founding-advertiser discount converts far better than cold pricing —
   e.g. "lock in $10/mo for life" for the first 10.

## Milestones

- **Month 1:** accounts set up, 30 posts published, sitemap indexed, 10 outreach emails sent.
- **Month 3:** first 3 paying listings (~$50–100/mo), 500+ monthly visitors.
- **Month 6:** 10+ listings + 1 sponsor (~$300–500/mo).
- **Month 12:** ~$1,000/mo via listings + sponsors + donations; consider adding a
  paid "30-Day Kindness Challenge" PDF or corporate team-kindness kit as a second
  product line.
