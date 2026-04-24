# Lyster — Requirements & Estimate

**Customer:** Lyster (energy company — solar + battery + 8-year electricity contract; part of Cleansun Sverige AB)
**Agency:** Sriracha
**Document status:** Draft for customer approval
**Version:** 0.2
**Date:** 2026-04-24

**Changes since v0.1:**
- Added **Section 2** — current `lystr.se` technical baseline (what exists today)
- Added **Section 5** — platform & digital operations, presented as pickable tiers with clear cost and value increase
- Added **Section 6** — ongoing management options (managed service vs. hand-off)
- Moved resolved items into a new **Section 9 — Confirmed decisions**
- Reduced the open-question list to items genuinely still open

---

## 1. Background

Lyster is a new-generation energy company. The offer to the end customer is simple on the surface — *byt elavtal till oss* — and complex underneath: the customer signs an 8-year contract at roughly their current energy cost, and in exchange gets a solar installation, battery, service, insurance, and financing bundled in. The customer owns the installation after the contract ends and cuts their energy cost by ~65% for the remaining 35–50+ years of the system's life.

The offer works. Lyster has scaled from 18 MSEK/year as a solar company to 18 MSEK/month as an energy company, mostly via a piggyback partnership with ETC. The constraint now is that Lyster's own brand is underdeveloped — ~95% of leads come through ETC, ~5% through Lyster's own site. Lyster needs to make its own brand load-bearing so that (a) growth continues when the ETC channel saturates, (b) Lyster is credible when raising external capital, and (c) the offer can be understood by a customer in under a minute without a salesperson on the phone.

## 2. Current state — lystr.se technical baseline

Before designing the new site and stack, we audited what's live today. This matters because several of the decisions below ("do we need a CMS?", "do we need analytics?") change depending on what already exists.

### 2.1 What's there

| Layer | Current state |
|---|---|
| **Platform** | Framer (full-stack visual builder — editor, hosting, CDN bundled) |
| **DNS** | `lystr.se` → 308 → `www.lystr.se` → CNAME `sites.framer.app` |
| **Pages** | 1 — just the homepage. `sitemap.xml` literally lists only `/` |
| **Language** | Swedish only |
| **Typography** | Schibsted Grotesk (served via Google Fonts) |
| **Assets** | Hosted on `framerusercontent.com` |
| **Last updated** | 2025-08-25 (~8 months stale) |
| **Parent brand** | "En del av Clean Sun" — Cleansun Sverige AB linked in footer |
| **Primary CTA** | Calendly booking → `calendly.com/mathias-soderstrom-lystr` |
| **Contact** | `info@lystr.se`, `info@lystr.com` |

### 2.2 What's conspicuously missing

- **No analytics at all.** No Google Analytics, Tag Manager, Meta Pixel, Plausible, Hotjar, or anything equivalent. The "5% of leads come through lystr.se" figure is a guess — there is no measurement in place.
- **No on-page form / lead capture.** If a visitor doesn't want to book a Calendly call, there's no alternative action — no email signup, no callback request, no contact form.
- **No CRM integration visible** anywhere on the public site. Lead flow is manual from Calendly onward.
- **No content / blog / knowledge base.**
- **No chat widget, A/B testing, conversion tracking, or marketing automation.**
- **No legal pages** in the sitemap (integritetspolicy, cookiepolicy, villkor).

### 2.3 Implications for this engagement

1. **Clean slate.** There is no backend, API, CMS schema, or data to migrate. Replacing the site is low-risk.
2. **The current Framer page is a prototype, not infrastructure.** Alex described it as "fruktansvärt" in the meeting and confirmed he built it himself. We are not upgrading an existing system; we are replacing a placeholder.
3. **Lead-capture is the single biggest conversion gap.** Adding a real on-page form plus analytics will likely produce measurable gains *independent* of the design work, and should be in scope from day one.
4. **The stack decision is wide open.** Since there's no existing CMS, database, or custom code, we can recommend the stack that best fits the interactive walkthrough we're building — not the one that matches a legacy system.

## 3. Target audience & tone

**Audience:** Swedish households, typically outside major cities, with thin margins. The reference customer is a family in Grimslöv outside Växjö. They cannot front 150 000 SEK, they are price-sensitive, and they are motivated primarily by lower and more predictable energy costs — climate and independence are secondary.

**Tone:** trygg, robust, trovärdig, lätt tillgänglig. Explicitly **not** "ung och hungrig / svart bakgrund / stora versaler". The brand should feel solid and serious — Lyster is asking the customer to commit for 8 years.

## 4. Creative deliverables (scope of this engagement)

Four deliverables, treated as a coordinated system so the customer experiences one story across video, web, and sales material.

### 4.1 Brand identity / graphic profile

Lyster has a logo (used on clothing and ETC co-branding) and no other brand assets — no color palette, no typography, no usage rules. The existing logo stays. This engagement defines everything around it: palette, typography, logo usage, graphic elements, tone of visual language, and a lightweight brand guidelines document.

**Collaboration model (confirmed):** Sriracha leads the creative work end-to-end. Johan is an important stakeholder and feedback-giver — we proactively include him through 2–3 review points and adapt based on his input. Final creative sign-off rests with Alex. No full workshops with Johan; the agency brings proposals, Johan reacts, we iterate.

**Deliverables:**
- Logo usage rules (existing logo)
- Color palette (primary + secondary + functional)
- Typography system (headings, body, UI)
- Graphic elements / visual language
- Brand guidelines document ("lathund" — PDF, 10–20 pages)
- Digital asset kit (logos in SVG/PNG, fonts specified, color tokens)

### 4.2 Explainer video

A motion-graphics video that makes the offer understandable in one sitting. It visualises the "pelar" — the three-part structure of the current energy cost (skatt + överföring + el), how solar and battery stabilise it during the 8-year contract, and how the cost drops ~65% after the contract ends and the installation is paid off.

The reference the customer liked (from competitor LV) is the tone and structure of the explanation — clear, calm, trovärdig. What they did *not* like was the dishonesty of LV's offer; the visual style is a neutral reference, not a copy target.

**Deliverables:**
- Script (developed collaboratively with Lyster — we bring a first draft, they edit)
- Storyboard
- Design frames
- Animation (motion graphics, ~60–90 seconds, target length to be confirmed)
- Sound design + voiceover (Swedish voiceover assumed; see open questions)
- Final video in web-ready formats (MP4 H.264, web-optimized; subtitles SRT)
- Social cutdowns **not included** in this scope — can be added

### 4.3 Interactive website (replacing current lystr.se)

**Confirmed:** the current Framer site is replaced entirely.

The customer asked for "halvt interaktivt" — a page where the visitor can explore the offer and reach the same understanding the video gives them, but at their own pace. The narrative is the same as the video; the format is different.

**Design-side deliverables:**
- Strategy & sitemap (landing-focused, secondary legal/contact pages)
- Interaction design (the exploratory walkthrough)
- Visual design
- Copy (first draft by Sriracha, Lyster reviews/approves)
- Responsive (mobile + desktop)
- Launch + handover

**Platform-side** — see Section 5. The stack choice drives cost, so we present it as a separate pickable set of tiers.

**Out of scope unless separately requested:** customer portal, admin dashboards, anything behind login.

### 4.4 PowerPoint sales deck

A reusable deck that tells the same story as the video, for sales use — account management, investor conversations, partner meetings. Master template + one populated example deck (~15–25 slides). Single light variant.

## 5. Platform & digital operations — tiered options

This is the new part of the document. Lyster needs to decide, for each of the areas below, how far to go. We present three tiers per area: **Foundation** (minimum viable, usually low- or zero-cost), **Growth** (adds measurement and conversion — our recommendation for most categories), **Scale** (enterprise-grade, only worth it if volumes justify it).

**Pricing convention throughout:**
- **Setup (SEK)** = one-time agency hours billed at 1 000 SEK/h blended
- **Recurring (SEK/mo)** = SaaS subscription paid **directly by Lyster**, not invoiced through us

All Foundation-tier options are real, working choices — we are not proposing "free = bad". For a company of Lyster's current size and sales motion, Foundation is sufficient in several categories.

### 5.1 Website platform & hosting

| Tier | Stack | Why | Setup | Recurring |
|---|---|---|---|---|
| **Foundation** | Next.js on **Vercel Hobby** + GitHub | Fastest to build, best performance, zero vendor-lock, free hosting suitable for a small commercial site | included in 4.3 | 0 SEK/mo |
| **Growth** ⭐ | Next.js on **Vercel Pro** | Team access, production support, proper analytics integration, preview deploys for stakeholder review | +3 000 SEK | ~220 SEK/mo |
| **Scale** | Multi-region edge + Vercel Enterprise | Only relevant at very high traffic (>1M visits/mo). Not recommended today. | — | — |

⭐ **Our recommendation: Growth.** The small recurring cost is worth it for team access and preview URLs alone.

**Note on Framer:** we could keep the site on Framer, but we do not recommend it. Framer's component model fights against the custom interactive walkthrough described in Section 4.3, and it locks you into Framer's pricing and export limits forever. Replacing with Next.js is a one-time cost that pays back in flexibility.

### 5.2 Content editing (CMS)

The question is: when Lyster wants to change a headline or swap a photo six months from now, how does that happen?

| Tier | What you get | Who can edit | Setup | Recurring |
|---|---|---|---|---|
| **Foundation** | Hard-coded copy in code; changes go through us or a developer via PR | Developers only | 0 (no CMS) | 0 SEK/mo |
| **Growth** ⭐ | **Sanity.io** (free tier) wired to the site — non-technical staff can edit copy, images, and sections via a web UI | Anyone at Lyster with a login | 20–35h → 20 000 – 35 000 SEK | 0 SEK/mo (free up to 3 users / 2 datasets) |
| **Scale** | Sanity Growth plan or Contentful — unlimited editors, roles, approval workflows | Enterprise content teams | +10–15h config → +12 000 SEK | ~1 100 SEK/mo (Sanity) or more |

⭐ **Our recommendation: Growth.** Given Lyster's size, the free Sanity tier covers needs indefinitely. Avoids the "every tiny copy change goes through the agency" trap.

### 5.3 Analytics

| Tier | What you get | Setup | Recurring |
|---|---|---|---|
| **Foundation** | **Plausible** (privacy-friendly, cookieless, no consent banner needed in Sweden) — visitors, sources, top pages, conversion goal per CTA | 3–6h → 3 000 – 6 000 SEK | ~105 SEK/mo (Plausible Starter, 10k pageviews) |
| **Growth** ⭐ | Plausible **+ PostHog free tier** — adds session replay, funnels, A/B test flags, feature flags | 10–15h → 10 000 – 15 000 SEK | ~105 SEK/mo (PostHog free up to 1M events) |
| **Scale** | GA4 + PostHog paid + custom BigQuery dashboards | 25–40h → 25 000 – 40 000 SEK | 1 000+ SEK/mo + data pipeline |

⭐ **Our recommendation: Growth.** Plausible gives you clean top-level numbers with zero GDPR work, PostHog free lets you watch how people actually move through the walkthrough. This combination is how modern product teams operate.

**Why not GA4 by default?** It's free but requires a cookie consent banner in Sweden, adds friction, and its dashboard UX is notoriously hostile. Plausible covers the same questions without the baggage.

### 5.4 Lead capture & CRM

Today the only way to become a lead is to book a Calendly call. That's a high-commitment ask for a visitor who just landed. A form ("get a no-obligation cost analysis") captures the 80% who aren't ready to talk yet.

| Tier | What you get | Setup | Recurring |
|---|---|---|---|
| **Foundation** | On-page form (name, email, postnummer, elförbrukning) → emails `info@lystr.se` via Resend (3k emails/mo free) | 6–10h → 6 000 – 10 000 SEK | 0 SEK/mo |
| **Growth** ⭐ | Form → **HubSpot Free CRM** — leads land in a real pipeline, ownership + status tracking, email templates, deal stages | 15–25h → 15 000 – 25 000 SEK | 0 SEK/mo (HubSpot free tier covers up to 1M contacts) |
| **Scale** | HubSpot Marketing Starter — full workflows, lead scoring, sequences, Calendly round-robin assignment | 30–50h → 30 000 – 50 000 SEK | ~220 SEK/mo (starter, rises with contacts) |

⭐ **Our recommendation: Growth.** HubSpot Free CRM is genuinely free, genuinely good, and scales with Lyster. Upgrading to paid tiers is one-click when volumes justify it.

**Confirmed open item:** Lyster to confirm whether HubSpot Free is acceptable, or if there's an existing CRM preference (Pipedrive, Upsales, Lime, etc.) — see open questions.

### 5.5 Booking (Calendly)

| Tier | What you get | Setup | Recurring |
|---|---|---|---|
| **Foundation** | Existing Calendly link embedded on the new site as secondary CTA | 1–2h → 1 000 – 2 000 SEK | existing Calendly plan (likely free/$10) |
| **Growth** ⭐ | Calendly Standard — multi-user round-robin for the sales team, booking integrated with HubSpot | 4–8h → 4 000 – 8 000 SEK | ~110 SEK/mo per sales seat |
| **Scale** | Cal.com self-hosted, white-labeled under lystr.se/boka | 20–30h → 20 000 – 30 000 SEK | ~55 SEK/mo (Cal.com Pro) per seat |

⭐ **Our recommendation: Growth** *if* more than one person fields calls, otherwise **Foundation**.

### 5.6 Marketing automation (email)

Today: none. Visitors who aren't ready to book a call leave and never hear from Lyster again.

| Tier | What you get | Setup | Recurring |
|---|---|---|---|
| **Foundation** | No marketing automation — just manual follow-up from the CRM | 0 | 0 SEK/mo |
| **Growth** ⭐ | **Mailchimp Free** (up to 500 contacts) or **HubSpot Marketing Free** — welcome email on signup, one monthly newsletter template | 10–20h setup + first-email design → 10 000 – 20 000 SEK | 0 SEK/mo until >500 contacts |
| **Scale** | Klaviyo / ActiveCampaign / HubSpot Marketing Pro — segmented nurture flows, behavior-triggered emails, SMS, lead scoring | 30–60h → 30 000 – 60 000 SEK | 500+ SEK/mo |

⭐ **Our recommendation: Growth** as a starter. Even a simple "thanks for your interest — here's what happens in the next 24h" email will materially lift conversion.

### 5.7 SEO

| Tier | What you get | Setup | Recurring |
|---|---|---|---|
| **Foundation** ⭐ | Clean technical SEO baked into the build — semantic HTML, meta tags, sitemap, OG/Twitter cards, Core Web Vitals green, Google Search Console verified | included in 4.3 + 5.1 | 0 SEK/mo |
| **Growth** | Foundation + schema.org markup (LocalBusiness, Product, FAQ), keyword research, 5–8 pages of SEO-targeted content | 25–40h → 25 000 – 40 000 SEK | 0 SEK/mo |
| **Scale** | Monthly SEO retainer — new content, link building, competitive monitoring | 20–30h/month → ongoing | ~20 000 – 30 000 SEK/mo |

⭐ **Our recommendation: Foundation now, Growth after 3 months** once we have analytics to target. Don't pay for SEO content until we know what visitors are searching for.

### 5.8 Recommended "Growth" bundle (all ⭐ choices)

| Category | Choice | Setup (SEK) | Recurring (SEK/mo) |
|---|---|---|---|
| Platform | Next.js + Vercel Pro | 3 000 | 220 |
| CMS | Sanity free tier | 20 000 – 35 000 | 0 |
| Analytics | Plausible + PostHog free | 10 000 – 15 000 | 105 |
| Lead capture / CRM | HubSpot Free | 15 000 – 25 000 | 0 |
| Booking | Calendly Standard | 4 000 – 8 000 | 110 per seat |
| Marketing automation | Mailchimp Free starter | 10 000 – 20 000 | 0 |
| SEO | Technical foundation | 0 | 0 |
| **Bundle total** | | **~62 000 – 106 000 SEK** | **~435 SEK/mo + seats** |

This is on top of the creative work (brand, video, website build, deck) priced in Section 11.

## 6. Ongoing management (after launch)

Two options, pickable independently per category:

### Option A — Self-serve (default, 0 SEK/mo)

Lyster owns everything. Copy edits via Sanity by in-house staff. Hosting bills paid directly. We are available on hourly rate (1 000 SEK/h) for ad-hoc work.

### Option B — Managed retainer

We act as Lyster's external digital team for a fixed monthly fee. What's included depends on the retainer tier:

| Retainer tier | Hours/mo | Covers | Price (SEK/mo) |
|---|---|---|---|
| **Maintenance** | 4h | Bug fixes, minor copy edits, monthly analytics snapshot, uptime monitoring | 4 000 |
| **Growth** ⭐ | 12h | Above + monthly landing-page A/B test, quarterly content update, conversion review | 12 000 |
| **Full-service** | 30h | Above + monthly creative iteration, email campaign design, SEO content, paid-media creative support | 30 000 |

⭐ Most common for a company at Lyster's stage is **Growth retainer** once the site is live. Month-to-month; cancel anytime with 30 days notice.

## 7. Out of scope (flagged for future phases)

- Testimonial videos (live-action customer interviews)
- Internal AI / automation work (projektering-tool, Fortnox/CRM/Scrive integration, banklån workflow)
- Second-phase brand expansion covering the full "customer choir" (up-sales, aggregering, own vindkraftverk/solparker)
- Dedicated investor pitch deck (separate from the sales deck)
- Paid media production (ad creative for campaigns)
- Social media cutdowns from the explainer
- Customer portal / authenticated dashboard
- Native mobile apps

## 8. Timeline

**Deadline:** To be confirmed. The meeting indicated "after Nordisk Film next week" as when work should begin in earnest, but no hard launch date was committed.

**Indicative duration once started:**
- Brand identity: 3–5 weeks
- Explainer video: 6–8 weeks from approved script to final
- Website + platform setup: 6–10 weeks depending on stack tier
- PowerPoint deck: 2–3 weeks after brand is locked

These run partly in parallel. Total calendar time from kickoff to all deliverables live: **~10–14 weeks**.

## 9. Confirmed decisions (from v0.1 open questions)

These items were resolved between v0.1 and v0.2 and are now locked:

- **Johan collaboration model** — Sriracha leads, Johan is a stakeholder/feedback-giver across 2–3 review points, Alex has final sign-off. All creative originates from us.
- **Accounts ownership** — Lyster owns every account (domain, hosting, analytics, CRM, fonts, email). Where an account doesn't exist, we set it up in Lyster's name. We act on Lyster's behalf during the project; a shared `@lystr.se` email may be provisioned for agency access.
- **Subscriptions** — Lyster pays SaaS subscriptions directly. We choose free or low-cost tools by default.
- **Management model** — Tiered options above (Section 6). Customer picks self-serve or a retainer.
- **Website scope** — We replace the current Framer site in full.
- **Tech stack** — Sriracha recommends, Lyster approves. Recommendation is Section 5.8 ("Growth bundle").
- **CRM integration** — Must be stated explicitly in proposal (see open questions for the choice itself).
- **No bespoke/custom backend features** in this engagement.
- **Rights & usage** — Full buyout. All source files (design, video, code) delivered to Lyster at end of engagement. Sriracha retains portfolio rights only.

## 10. Remaining open questions

### 10.1 Explainer video specifics
- Target length — 60s, 90s, 120s? (We recommend 75–90s.)
- Voiceover — professional Swedish VO talent, or internal voice (Alex)? Budget for VO is separate.
- Music — licensed library track, or custom composition?
- Language — Swedish only, or also English version for investor use?

### 10.2 CRM choice (Section 5.4)
- Default recommendation: **HubSpot Free**. Acceptable to Lyster?
- Existing CRM in use anywhere (sales, installation ops, customer service)? If yes, we integrate the new form to it.

### 10.3 Calendly / booking
- Is the existing `mathias-soderstrom-lystr` Calendly a single-user setup or a team? Who fields the calls?
- Should Calendly stay as primary CTA, or move to secondary (with the form being primary)?

### 10.4 Cleansun / brand hierarchy
- What's the intended relationship between Lyster and Cleansun Sverige AB in the new site — co-branded (as now), footer-only, or removed entirely?
- Does Cleansun have brand guidelines that Lyster should respect?

### 10.5 Timeline
- What is the actual deadline or target launch date?
- Are there any fixed events (investor meeting, press moment, capital-raise close) the deliverables must be ready for?
- Phased launch acceptable (e.g., brand + deck first, website + video second), or all-at-once?

### 10.6 Shared agency email
- Will Lyster provision a `@lystr.se` email address for Sriracha to use as the agency-on-record account for third-party services (Google Search Console, HubSpot admin, etc.)? Or do we use a Sriracha email and share credentials?

## 11. Effort & price estimate

Rates are indicative at **1 000 SEK/h** blended (indie-boutique Stockholm level), excluding VAT. Ranges reflect remaining uncertainty — once open questions are resolved, we issue a fixed quote.

### 11.1 Brand identity / graphic profile

| Work item                      | Hours       |
|--------------------------------|-------------|
| Discovery + Johan review loops | 25–35 h     |
| Brand direction / concept      | 40–60 h     |
| Palette + typography system    | (in concept)|
| Guidelines document            | 20–30 h     |
| Asset kit delivery             | 10–15 h     |
| **Total hours**                | **95–140 h** |
| **Price (SEK, ex. VAT)**       | **95 000 – 140 000** |

### 11.2 Explainer video (motion graphics, 60–90s)

| Work item                   | Hours       |
|-----------------------------|-------------|
| Script + concept            | 20–30 h     |
| Storyboard                  | 20–30 h     |
| Design frames               | 30–45 h     |
| Animation                   | 70–110 h    |
| Voiceover direction + edit  | 10–15 h     |
| Sound design + music        | 15–25 h     |
| Revisions (2 rounds)        | 20–35 h     |
| **Total hours**             | **185–290 h** |
| **Agency fee (SEK)**        | **185 000 – 290 000** |
| + VO talent (external)      | ~5 000 – 15 000 |
| + Music license             | ~2 000 – 8 000  |
| **All-in price**            | **~195 000 – 310 000** |

### 11.3 Interactive website — design & build

This is the website build only (design + dev). Platform/operations add-ons are in Section 5 and itemised again below.

| Work item                              | Hours       |
|----------------------------------------|-------------|
| Strategy, sitemap, content outline     | 15–25 h     |
| Interaction & visual design            | 50–80 h     |
| Copywriting (first draft)              | 20–30 h     |
| Development (Next.js, responsive)      | 80–130 h    |
| Launch & QA                            | 15–25 h     |
| Revisions (2 rounds)                   | 20–30 h     |
| **Total hours**                        | **200–320 h** |
| **Price (SEK)**                        | **200 000 – 320 000** |

### 11.4 Platform & operations — "Growth" bundle

From Section 5.8. Pickable à la carte if Lyster wants a different tier in any category.

| Category | Price (SEK) |
|---|---|
| Vercel Pro setup | 3 000 |
| Sanity CMS | 20 000 – 35 000 |
| Analytics (Plausible + PostHog) | 10 000 – 15 000 |
| Lead capture + HubSpot Free | 15 000 – 25 000 |
| Calendly integration | 4 000 – 8 000 |
| Mailchimp starter + welcome email | 10 000 – 20 000 |
| SEO technical foundation | included in 11.3 |
| **Bundle total** | **62 000 – 106 000** |

### 11.5 PowerPoint sales deck

| Work item                   | Hours       |
|-----------------------------|-------------|
| Master template (from brand)| 20–30 h     |
| Populated deck (~20 slides) | 25–40 h     |
| Revisions                   | 8–12 h      |
| **Total hours**             | **53–82 h** |
| **Price (SEK)**             | **53 000 – 82 000** |

### 11.6 Project management & account handling

Applied as a 12% surcharge on the sum of deliverables above (industry standard 10–15%). Covers weekly check-ins, coordination with Johan, Lyster, and third-party tools, file handover, invoicing, and post-launch questions within 30 days.

### 11.7 Total — recommended bundle

All ⭐ choices: brand + explainer video + website + Growth platform bundle + deck.

| Package                       | Low (SEK)    | High (SEK)   |
|-------------------------------|--------------|--------------|
| Brand                         | 95 000       | 140 000      |
| Explainer video (all-in)      | 195 000      | 310 000      |
| Website (design & build)      | 200 000      | 320 000      |
| Platform & ops — Growth bundle| 62 000       | 106 000      |
| PowerPoint deck               | 53 000       | 82 000       |
| **Subtotal**                  | **605 000**  | **958 000**  |
| Project management (12%)      | 72 600       | 114 960      |
| **Grand total (ex. VAT)**     | **~680 000** | **~1 075 000** |
| **Recurring SaaS (paid by Lyster direct)** | **~435 SEK/mo + per-seat** | |

### 11.8 Lean alternative — "Foundation" bundle

If budget is tight:

| Package | Price (SEK) |
|---|---|
| Brand (unchanged) | 95 000 – 140 000 |
| Explainer video (unchanged) | 195 000 – 310 000 |
| Website (unchanged) | 200 000 – 320 000 |
| Platform & ops — Foundation (form → email, Plausible only, no CMS) | 12 000 – 18 000 |
| PowerPoint deck (unchanged) | 53 000 – 82 000 |
| **Subtotal** | **555 000 – 870 000** |
| PM (12%) | 66 600 – 104 400 |
| **Grand total (ex. VAT)** | **~620 000 – 975 000** |
| **Recurring SaaS** | **~105 SEK/mo (Plausible only)** |

## 12. Assumptions

- Two rounds of revisions per deliverable are included. A third round or more is billed hourly at 1 000 SEK/h.
- Lyster is available for weekly 30–60 min check-ins and turns around feedback within 3 business days.
- All copy, data, and reference material Lyster provides (customer stories, technical specs, pricing models) is delivered in Swedish and does not need translation work from us.
- Final deliverables are in Swedish. English versions are a separate scope.
- Payment terms: 30% on kickoff, 40% on mid-project milestone, 30% on final delivery. To be confirmed in contract.
- Lyster pays all SaaS subscriptions directly; we do not front those costs.

---

## 13. Sign-off

This document becomes the agreed scope when Lyster approves it in writing. Changes to scope after sign-off are handled as change requests at the same hourly rate.

**Customer sign-off:** _______________________  Date: __________
**Agency sign-off:** _______________________  Date: __________
