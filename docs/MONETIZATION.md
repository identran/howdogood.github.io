# How Do Good? — Monetization Playbook

Goal: **~$1,000/month**. Revised 2026-08-08 (v2 — traffic-first).

## Strategy in one paragraph

Nobody pays meaningful recurring money to advertise on a site without a proven
audience — so we don't ask them to. Instead: **make listings nearly free to fill
the classifieds page with real content, grow traffic relentlessly, then monetize
the attention.** A full classifieds page is itself content: every listed
nonprofit, maker and community project has a reason to share their listing,
which brings their audience to us. Revenue at scale comes from display ads and
volume, not from squeezing a handful of early advertisers.

## The three phases

### Phase 1 — Seed (now): fill the page, build the audience

- **Community listings: free** (nonprofits, volunteer calls, swaps, free events).
  Every free listing is content + an inbound link + a partner who shares the page.
- **Business listings: $10 one-time for 30 days.** Impulse pricing, no
  subscription, framed as supporting the project. Revenue here is a bonus, not
  the goal ($20–100/mo realistic).
- Replace the 20 fake sample listings with real ones as fast as possible —
  outreach to local nonprofits first ("free listing, takes 2 minutes") since a
  free offer converts far better than any pitch.
- Marketing engine: daily kindness-act posts on Instagram/Pinterest/TikTok,
  Google Search Console + sitemap for organic search on kindness-ideas.html.

### Phase 2 — Monetize attention (~5–10k pageviews/mo)

- **Apply for Google AdSense** (or an ethical alternative — see below). Display
  ads pay per impression, which is exactly the "more visitors see more ads"
  model. Prerequisites AdSense checks: original content (✓ ideas page),
  a **privacy policy page** (todo before applying), site age, and traffic.
- Ethical-aligned alternatives if AdSense feels off-brand: EthicalAds,
  Carbon Ads (needs niche approval), or direct flat-rate banner deals.
- Consider affiliate links where natural (e.g. books about kindness →
  Bookshop.org affiliate program, ~10% commission, ethically aligned).
- Raise business-listing price gradually ($10 → $19 → $29) as traffic data
  justifies it; existing listings keep their price for their paid run.

### Phase 3 — Scale (~50k+ pageviews/mo)

- Display ads at $8–15 RPM ≈ $400–750/mo at 50k pageviews.
- Business listings at higher volume/price ≈ $200–400/mo.
- Donations + affiliate ≈ $50–150/mo.
- That combination is the realistic $1,000/mo picture. Timeline: 12–18 months
  of consistent content and outreach.

## What's live on the site

- **/advertise.html ("Get Listed")** — free community listings + $10/30-day
  business listings. Order flow: email → review → (business) PayPal invoice →
  live. No payment integration needed yet.
- **/kindness-ideas.html** — static, indexable page with all 60 acts; the SEO
  engine targeting "acts of kindness ideas" searches.
- **/classifieds.html** — opens with a "Your Listing Here" card. The 20 current
  listings are **fake samples** — replace with real ones ASAP.
- **sitemap.xml / robots.txt / structured data** — SEO plumbing.

## Owner setup tasks (one-time)

### 1. PayPal Business account

1. paypal.com/business → Sign up → **Business account**.
2. Business type "Individual/Sole proprietorship" is fine to start (check local
   requirements — e.g. in Germany a Gewerbe registration may be needed before
   charging; income is taxable either way).
3. Use free **Invoicing** for the $10 business listings (one-time invoices, no
   recurring billing needed in this model).
4. Later: add a PayPal.me/donate link to the footer next to Buy Me a Coffee.

### 2. Domain email (before outreach)

Squarespace → Domains → howdogood.com → **Email Forwarding** → create
`hello@howdogood.com` → forward to identran@gmail.com, then update the mailto
links in advertise.html (currently identran@gmail.com).

### 3. Social accounts (the traffic engine — the most important task)

Handle **@howdogood** (or nearest available):

- **Instagram** — primary. One act of kindness per day as a dark quote card
  matching the site aesthetic. Link in bio → site.
- **Pinterest** — strong for "kindness ideas" searches; every pin links to
  kindness-ideas.html.
- **TikTok/Reels** — short "today's act of kindness" clips when time allows.
- **X + Facebook page** — cross-post, low effort.

Sustainable rhythm: batch 30 quote cards once a month (Canva or ask Claude),
schedule free via Meta Business Suite.

### 4. Search & analytics

- **Google Search Console**: verify via DNS on Squarespace, submit sitemap.xml.
- Privacy-friendly analytics (GoatCounter is free) or Google Analytics — you
  need traffic numbers both to steer content and to sell anything later.

### 5. Before applying for AdSense (Phase 2)

- Add a privacy policy page (required) and a cookie-consent notice for EU
  visitors if using AdSense/Analytics.
- 20+ indexed pages of original content helps approval — consider expanding
  kindness content (e.g. one short page per theme: "kindness at work",
  "kindness for kids", seasonal lists). Each is a search-traffic door.

## Outreach plan (first 30 listings)

1. List 30 local nonprofits/community projects → offer the **free** listing.
   Ask them to share it once live (most will — it's their content too).
2. List 20 ethical shops/makers (Etsy sellers, fair-trade shops, repair cafés)
   → $10 pitch with a screenshot of the page already full of real listings.
3. Every listing gets a "listed on howdogood.com" badge/link offer — inbound
   links compound the SEO.

## Milestones

- **Month 1:** social accounts live, 30 posts scheduled, sitemap indexed,
  10 free listings replacing samples.
- **Month 3:** 20+ real listings, 1–2k visitors/mo, first paid listings.
- **Month 6:** 5–10k visitors/mo → apply for AdSense; ~$100–200/mo total.
- **Month 12–18:** 30–50k+ visitors/mo → ~$1,000/mo from ads + listings +
  donations.
