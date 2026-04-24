# Lyster — Requirements & Estimate

**Customer:** Lyster (energy company — solar + battery + 8-year electricity contract; part of Cleansun Sverige AB)
**Agency:** Sriracha
**Document status:** Draft for customer approval
**Version:** 0.4
**Date:** 2026-04-24

**Changes since v0.3:**
- Renamed Section 4.2 **Explainer video** → **Explainer animation (web motion graphics)** to remove ambiguity with filmed commercials
- Explicitly coupled the explainer animation with the website walkthrough (Section 4.3) — shared style, shared assets, one creative pass
- Added **video hosting** to Section 5.2 (Mux / Cloudflare Stream / Vercel Blob)
- Added duration-as-cost-lever note to Section 11.2, plus a "Lean" alternative at shorter runtime
- Reduced recommended-bundle total by ~20k to reflect the website + animation creative efficiency (same designer, same pass)

**Changes since v0.2:**
- Reframed **Section 1** — added a closing paragraph naming the underlying business goal as *more leads, higher conversion, more sales*
- Updated **Section 2.2** — explicitly flagged that the "~95% of leads via ETC" figure is operational intuition, not measured data
- Added **Section 5.1 — Phase 0 Baseline & attribution**, renumbered 5.1–5.8 to 5.2–5.9
- Added **Section 10.7** — open question on current attribution process and what "success" looks like
- Updated totals to include Phase 0

**Changes since v0.1:**
- Added **Section 2** — current `lystr.se` technical baseline (what exists today)
- Added **Section 5** — platform & digital operations, presented as pickable tiers with clear cost and value increase
- Added **Section 6** — ongoing management options (managed service vs. hand-off)
- Moved resolved items into a new **Section 9 — Confirmed decisions**
- Reduced the open-question list to items genuinely still open

---

## 1. Background

Lyster is a new-generation energy company. The offer to the end customer is simple on the surface — *byt elavtal till oss* — and complex underneath: the customer signs an 8-year contract at roughly their current energy cost, and in exchange gets a solar installation, battery, service, insurance, and financing bundled in. The customer owns the installation after the contract ends and cuts their energy cost by ~65% for the remaining 35–50+ years of the system's life.

The offer works. Lyster has scaled from 18 MSEK/year as a solar company to 18 MSEK/month as an energy company, mostly via a piggyback partnership with ETC. The constraint now is that Lyster's own brand is underdeveloped — the vast majority of leads come through ETC, with very few coming through Lyster's own site. Lyster needs to make its own brand load-bearing so that (a) growth continues when the ETC channel saturates, (b) Lyster is credible when raising external capital, and (c) the offer can be understood by a customer in under a minute without a salesperson on the phone.

**Underlying business goal.** When Lyster comes to an agency asking for "brand + website + video", the real commercial ask is **more leads, higher conversion, more sales** — especially direct leads that don't depend on the ETC channel. This engagement is scoped and measured with that in mind. The creative work (brand, video, copy) is how Lyster earns attention; the website and platform are where that attention turns into bookings; the measurement layer (Phase 0 in Section 5.1) is how we prove the work moves the needle. Every deliverable in Sections 4 and 5 serves this outcome.

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

- **No analytics at all.** No Google Analytics, Tag Manager, Meta Pixel, Plausible, Hotjar, or anything equivalent. The often-cited split ("~95% of leads via ETC, ~5% via lystr.se") is **operational intuition, not measured data** — there is no analytics or attribution pipeline on either side that can reliably source inbound leads. Phase 0 (Section 5.1) is scoped specifically to fix this.
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

### 4.2 Explainer animation (web motion graphics)

**This is animated web content, not a filmed commercial.** No crew, no actors, no studio, no location — the entire deliverable is produced in After Effects and lives natively on the new lystr.se site (see 4.3). The frame of reference is a good Duolingo / Mux / Vercel product explainer, not a TV ad.

The animation makes the offer understandable in one sitting. It visualises the "pelar" — the three-part structure of the current energy cost (skatt + överföring + el), how solar and battery stabilise it during the 8-year contract, and how the cost drops ~65% after the contract ends and the installation is paid off.

The reference the customer liked (from competitor LV) is the tone and structure of the explanation — clear, calm, trovärdig. What they did *not* like was the dishonesty of LV's offer; the visual style is a neutral reference, not a copy target.

**Deliverables:**
- Script (developed collaboratively with Lyster — we bring a first draft, they edit)
- Storyboard
- Design frames
- Animation (motion graphics, ~60–90 seconds, target length to be confirmed)
- Sound design + voiceover (Swedish voiceover assumed; see open questions)
- Final animation in web-ready formats (MP4 H.264 + WebM; poster image; subtitle SRT)
- Master After Effects project handed over (Section 9 — full buyout, all source files)
- Social cutdowns **not included** in this scope — can be added

**Why this matters:** because it's animation, not film, iteration is cheap. Copy changes don't require reshoots — we rework the timeline. This is useful because Lyster's on-site copy still has open inconsistencies (5–8 år vs 8 år, 65–80 % vs ~65 %) that will likely settle during the engagement.

### 4.3 Interactive website (replacing current lystr.se)

**Confirmed:** the current Framer site is replaced entirely.

The customer asked for "halvt interaktivt" — a page where the visitor can explore the offer and reach the same understanding the animation gives them, but at their own pace. The narrative is the same as the animation; the format is different.

**Coupling with the explainer animation (Section 4.2).** The animation and the on-site walkthrough share the same story, style, voice, and supporting illustrations — they are deliberately designed together, not in isolation. In practice this means:
- Illustrations and motion from the After Effects master are repurposed as the scrollytelling frames in the walkthrough.
- The animation can live as the hero on the homepage, embedded on a dedicated "Så funkar det" section, or both.
- One design pass, one source of truth. If the story shifts, both update together.

This coupling reduces combined creative cost versus doing the two workstreams independently — reflected in the pricing in Section 11.

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

### 5.1 Phase 0 — Baseline & attribution (recommended before Phase 1)

Before any redesign work begins, spend ~2 weeks putting basic measurement in place so we have a *before-number* to compare against. Without this, neither Lyster nor Sriracha can honestly answer "did the redesign work?" after launch.

**Today:**
- lystr.se has **zero analytics** (see Section 2.2).
- **No attribution between channels.** There is no way for Lyster to confirm whether a given inbound lead came from ETC, from the lystr.se Calendly, from word-of-mouth, or anywhere else. Alex's estimate that "~95% of leads come via ETC" is operational intuition, not measured data.
- `etcel.se/elfrihet` (the actual high-converting landing page today) runs Plausible on ETC's side — but there are no UTM tags on any links from ETC to Lystr, so even cross-referencing is blocked.

**What Phase 0 sets up:**
- **Plausible installed on the current Framer site** — same day, no redesign dependency. Captures a 4–6 week baseline of visitors, sources, bounce, and Calendly click-through.
- **UTM tagging on ETC → Lystr links** — coordinated with ETC. Lets us see, for every lystr.se visit, whether ETC was the referrer and which campaign.
- **Source tagging in the sales workflow.** Every inbound lead (phone call, Calendly booking, future form submission) gets a one-field "source" tag — ETC / lystr.se / direct / other. Simple spreadsheet or CRM field; enforced by the sales team for 4–6 weeks.
- **Lightweight "leads by source" dashboard** — a single Google Sheet or Plausible shared link showing the split week-by-week.

**After Phase 0 we have:**
- Real baseline traffic and conversion numbers for the current site.
- Source attribution for current leads — the "95% from ETC" claim replaced by actual data.
- A measurement framework that keeps running after the redesign launches, so the impact is provable.

**Setup:** 17–25h → ~20 000 SEK (one-time).
**Runs:** 4–6 weeks in parallel with Phase 1 design work (no extra cost, just time).

⭐ **Strongly recommended.** Without this, the redesign ships without proof — and Lyster cannot defend the investment to future capital raises or internal stakeholders.

### 5.2 Website platform & hosting

| Tier | Stack | Why | Setup | Recurring |
|---|---|---|---|---|
| **Foundation** | Next.js on **Vercel Hobby** + GitHub | Fastest to build, best performance, zero vendor-lock, free hosting suitable for a small commercial site | included in 4.3 | 0 SEK/mo |
| **Growth** ⭐ | Next.js on **Vercel Pro** | Team access, production support, proper analytics integration, preview deploys for stakeholder review | +3 000 SEK | ~220 SEK/mo |
| **Scale** | Multi-region edge + Vercel Enterprise | Only relevant at very high traffic (>1M visits/mo). Not recommended today. | — | — |

⭐ **Our recommendation: Growth.** The small recurring cost is worth it for team access and preview URLs alone.

**Note on Framer:** we could keep the site on Framer, but we do not recommend it. Framer's component model fights against the custom interactive walkthrough described in Section 4.3, and it locks you into Framer's pricing and export limits forever. Replacing with Next.js is a one-time cost that pays back in flexibility.

**Video hosting for the explainer animation.** A 60–90 s motion graphics file is 20–50 MB as a direct MP4 — fine to serve once, heavy on bandwidth at scale. Three pickable options:

| Option | What you get | Setup | Recurring |
|---|---|---|---|
| **Vercel Blob + HLS** | Simple, same vendor as hosting, no extra accounts. Adaptive bitrate via a small transcode step. | 4–6 h → 4 000 – 6 000 SEK | ~50 SEK/mo at current traffic |
| **Mux** ⭐ | Best-in-class video delivery, adaptive streaming, Data dashboard, API-first. Widely used by Vercel-hosted sites. | 3–5 h → 3 000 – 5 000 SEK | ~110–330 SEK/mo depending on plays |
| **Cloudflare Stream** | $5 / 1000 min delivered, fixed price. Lower ceiling than Mux but predictable. | 3–5 h → 3 000 – 5 000 SEK | ~55 SEK/mo at low volume |

⭐ **Recommendation: Mux.** Tiny recurring cost, clean API, and the analytics dashboard answers the question "is anyone actually watching this?" — directly useful for Phase 0 / ongoing measurement.

### 5.3 Content editing (CMS)

The question is: when Lyster wants to change a headline or swap a photo six months from now, how does that happen?

| Tier | What you get | Who can edit | Setup | Recurring |
|---|---|---|---|---|
| **Foundation** | Hard-coded copy in code; changes go through us or a developer via PR | Developers only | 0 (no CMS) | 0 SEK/mo |
| **Growth** ⭐ | **Sanity.io** (free tier) wired to the site — non-technical staff can edit copy, images, and sections via a web UI | Anyone at Lyster with a login | 20–35h → 20 000 – 35 000 SEK | 0 SEK/mo (free up to 3 users / 2 datasets) |
| **Scale** | Sanity Growth plan or Contentful — unlimited editors, roles, approval workflows | Enterprise content teams | +10–15h config → +12 000 SEK | ~1 100 SEK/mo (Sanity) or more |

⭐ **Our recommendation: Growth.** Given Lyster's size, the free Sanity tier covers needs indefinitely. Avoids the "every tiny copy change goes through the agency" trap.

### 5.4 Analytics

| Tier | What you get | Setup | Recurring |
|---|---|---|---|
| **Foundation** | **Plausible** (privacy-friendly, cookieless, no consent banner needed in Sweden) — visitors, sources, top pages, conversion goal per CTA | 3–6h → 3 000 – 6 000 SEK | ~105 SEK/mo (Plausible Starter, 10k pageviews) |
| **Growth** ⭐ | Plausible **+ PostHog free tier** — adds session replay, funnels, A/B test flags, feature flags | 10–15h → 10 000 – 15 000 SEK | ~105 SEK/mo (PostHog free up to 1M events) |
| **Scale** | GA4 + PostHog paid + custom BigQuery dashboards | 25–40h → 25 000 – 40 000 SEK | 1 000+ SEK/mo + data pipeline |

⭐ **Our recommendation: Growth.** Plausible gives you clean top-level numbers with zero GDPR work, PostHog free lets you watch how people actually move through the walkthrough. This combination is how modern product teams operate.

**Why not GA4 by default?** It's free but requires a cookie consent banner in Sweden, adds friction, and its dashboard UX is notoriously hostile. Plausible covers the same questions without the baggage.

### 5.5 Lead capture & CRM

Today the only way to become a lead is to book a Calendly call. That's a high-commitment ask for a visitor who just landed. A form ("get a no-obligation cost analysis") captures the 80% who aren't ready to talk yet.

| Tier | What you get | Setup | Recurring |
|---|---|---|---|
| **Foundation** | On-page form (name, email, postnummer, elförbrukning) → emails `info@lystr.se` via Resend (3k emails/mo free) | 6–10h → 6 000 – 10 000 SEK | 0 SEK/mo |
| **Growth** ⭐ | Form → **HubSpot Free CRM** — leads land in a real pipeline, ownership + status tracking, email templates, deal stages | 15–25h → 15 000 – 25 000 SEK | 0 SEK/mo (HubSpot free tier covers up to 1M contacts) |
| **Scale** | HubSpot Marketing Starter — full workflows, lead scoring, sequences, Calendly round-robin assignment | 30–50h → 30 000 – 50 000 SEK | ~220 SEK/mo (starter, rises with contacts) |

⭐ **Our recommendation: Growth.** HubSpot Free CRM is genuinely free, genuinely good, and scales with Lyster. Upgrading to paid tiers is one-click when volumes justify it.

**Confirmed open item:** Lyster to confirm whether HubSpot Free is acceptable, or if there's an existing CRM preference (Pipedrive, Upsales, Lime, etc.) — see open questions.

### 5.6 Booking (Calendly)

| Tier | What you get | Setup | Recurring |
|---|---|---|---|
| **Foundation** | Existing Calendly link embedded on the new site as secondary CTA | 1–2h → 1 000 – 2 000 SEK | existing Calendly plan (likely free/$10) |
| **Growth** ⭐ | Calendly Standard — multi-user round-robin for the sales team, booking integrated with HubSpot | 4–8h → 4 000 – 8 000 SEK | ~110 SEK/mo per sales seat |
| **Scale** | Cal.com self-hosted, white-labeled under lystr.se/boka | 20–30h → 20 000 – 30 000 SEK | ~55 SEK/mo (Cal.com Pro) per seat |

⭐ **Our recommendation: Growth** *if* more than one person fields calls, otherwise **Foundation**.

### 5.7 Marketing automation (email)

Today: none. Visitors who aren't ready to book a call leave and never hear from Lyster again.

| Tier | What you get | Setup | Recurring |
|---|---|---|---|
| **Foundation** | No marketing automation — just manual follow-up from the CRM | 0 | 0 SEK/mo |
| **Growth** ⭐ | **Mailchimp Free** (up to 500 contacts) or **HubSpot Marketing Free** — welcome email on signup, one monthly newsletter template | 10–20h setup + first-email design → 10 000 – 20 000 SEK | 0 SEK/mo until >500 contacts |
| **Scale** | Klaviyo / ActiveCampaign / HubSpot Marketing Pro — segmented nurture flows, behavior-triggered emails, SMS, lead scoring | 30–60h → 30 000 – 60 000 SEK | 500+ SEK/mo |

⭐ **Our recommendation: Growth** as a starter. Even a simple "thanks for your interest — here's what happens in the next 24h" email will materially lift conversion.

### 5.8 SEO

| Tier | What you get | Setup | Recurring |
|---|---|---|---|
| **Foundation** ⭐ | Clean technical SEO baked into the build — semantic HTML, meta tags, sitemap, OG/Twitter cards, Core Web Vitals green, Google Search Console verified | included in 4.3 + 5.1 | 0 SEK/mo |
| **Growth** | Foundation + schema.org markup (LocalBusiness, Product, FAQ), keyword research, 5–8 pages of SEO-targeted content | 25–40h → 25 000 – 40 000 SEK | 0 SEK/mo |
| **Scale** | Monthly SEO retainer — new content, link building, competitive monitoring | 20–30h/month → ongoing | ~20 000 – 30 000 SEK/mo |

⭐ **Our recommendation: Foundation now, Growth after 3 months** once we have analytics to target. Don't pay for SEO content until we know what visitors are searching for.

### 5.9 Recommended "Growth" bundle (all ⭐ choices)

| Category | Choice | Setup (SEK) | Recurring (SEK/mo) |
|---|---|---|---|
| Phase 0 | Baseline & attribution | 20 000 | 0 |
| Platform | Next.js + Vercel Pro | 3 000 | 220 |
| CMS | Sanity free tier | 20 000 – 35 000 | 0 |
| Analytics | Plausible + PostHog free | 10 000 – 15 000 | 105 |
| Lead capture / CRM | HubSpot Free | 15 000 – 25 000 | 0 |
| Booking | Calendly Standard | 4 000 – 8 000 | 110 per seat |
| Marketing automation | Mailchimp Free starter | 10 000 – 20 000 | 0 |
| SEO | Technical foundation | 0 | 0 |
| **Bundle total** | | **~82 000 – 126 000 SEK** | **~435 SEK/mo + seats** |

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
- Explainer animation: 6–8 weeks from approved script to final
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
- **Tech stack** — Sriracha recommends, Lyster approves. Recommendation is Section 5.9 ("Growth bundle").
- **CRM integration** — Must be stated explicitly in proposal (see open questions for the choice itself).
- **No bespoke/custom backend features** in this engagement.
- **Rights & usage** — Full buyout. All source files (design, video, code) delivered to Lyster at end of engagement. Sriracha retains portfolio rights only.

## 10. Remaining open questions

### 10.1 Explainer animation specifics
- Target length — 60s, 90s, 120s? (We recommend 75–90s.)
- Voiceover — professional Swedish VO talent, or internal voice (Alex)? Budget for VO is separate.
- Music — licensed library track, or custom composition?
- Language — Swedish only, or also English version for investor use?

### 10.2 CRM choice (Section 5.5)
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

### 10.7 Current attribution & the "95%" figure
The engagement's core promise is *more leads, higher conversion, more sales*. To scope Phase 0 accurately (Section 5.1), we need to understand what's currently tracked, by whom, and how:

- How does Lyster's sales team currently know where each inbound lead came from — is it tagged in a CRM, recorded in a spreadsheet, or reconstructed from call memory?
- Are there any historical records (call logs, CRM exports, ETC lead lists) we can mine to sharpen the ~95% estimate before Phase 0 runs?
- Who at Lyster owns the attribution process going forward — sales ops, marketing, or Alex directly?
- **What does Lyster consider "success" from this engagement?** A specific lift in lead volume, a specific improvement in conversion rate, a qualitative shift (more direct leads, less ETC dependency), or something else? Without a defined success metric we cannot prove the redesign worked.
- Is there a willingness to coordinate with ETC to add UTM tagging on links from `etcel.se/elfrihet` to lystr.se, or will Phase 0 need to operate without ETC cooperation?

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

### 11.2 Explainer animation (web motion graphics, 60–90s)

Motion graphics only — no filming, no crew, no studio. Produced in After Effects, delivered as a web asset that lives inside the new lystr.se site. Not comparable to live-action commercial pricing.

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

**Duration is the main cost lever.** A 45-second version lands at roughly **130 000 – 200 000 SEK** all-in (animation scales close to linearly with runtime). A 120-second version climbs to roughly **260 000 – 400 000 SEK**. We recommend **75–90 seconds** as the sweet spot — long enough to land all three "pelar" plus the post-contract payoff, short enough that attention holds.

**Creative-coupling discount (Section 4.3).** When the animation and the on-site walkthrough are designed by the same team in the same pass (our default), we save ~20 000 SEK on duplicated design work. This discount is baked into the recommended bundle in 11.7.

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

From Section 5.9. Pickable à la carte if Lyster wants a different tier in any category.

| Category | Price (SEK) |
|---|---|
| Phase 0 — Baseline & attribution | 20 000 |
| Vercel Pro setup | 3 000 |
| Video hosting — Mux integration (for the explainer animation) | 3 000 – 5 000 |
| Sanity CMS | 20 000 – 35 000 |
| Analytics (Plausible + PostHog) | 10 000 – 15 000 |
| Lead capture + HubSpot Free | 15 000 – 25 000 |
| Calendly integration | 4 000 – 8 000 |
| Mailchimp starter + welcome email | 10 000 – 20 000 |
| SEO technical foundation | included in 11.3 |
| **Bundle total** | **85 000 – 131 000** |

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

All ⭐ choices: brand + explainer animation + website + Growth platform bundle + deck.

| Package                       | Low (SEK)    | High (SEK)   |
|-------------------------------|--------------|--------------|
| Brand                         | 95 000       | 140 000      |
| Explainer animation (all-in, 75–90s) | 195 000 | 310 000 |
| Website (design & build)      | 200 000      | 320 000      |
| Platform & ops — Growth bundle *(incl. Phase 0 + video hosting)* | 85 000 | 131 000 |
| PowerPoint deck               | 53 000       | 82 000       |
| Creative-coupling discount (same team designs animation + walkthrough) | -20 000 | -20 000 |
| **Subtotal**                  | **608 000**  | **963 000**  |
| Project management (12%)      | 73 000       | 115 560      |
| **Grand total (ex. VAT)**     | **~680 000** | **~1 080 000** |
| **Recurring SaaS (paid by Lyster direct)** | **~545 SEK/mo + per-seat** | |

### 11.8 Lean alternative — "Foundation" bundle

If budget is tight:

| Package | Price (SEK) |
|---|---|
| Brand (unchanged) | 95 000 – 140 000 |
| Explainer animation — 45s lean variant | 130 000 – 200 000 |
| Website (unchanged) | 200 000 – 320 000 |
| Phase 0 — Baseline & attribution | 20 000 |
| Platform & ops — Foundation (form → email, Plausible only, no CMS) | 12 000 – 18 000 |
| Video hosting — Vercel Blob + HLS | 4 000 – 6 000 |
| PowerPoint deck (unchanged) | 53 000 – 82 000 |
| Creative-coupling discount | -20 000 |
| **Subtotal** | **494 000 – 766 000** |
| PM (12%) | 59 000 – 92 000 |
| **Grand total (ex. VAT)** | **~555 000 – 860 000** |
| **Recurring SaaS** | **~155 SEK/mo (Plausible + Vercel Blob)** |

The Foundation bundle now reflects two levers for cutting cost: the 45-second explainer (vs 75–90s) and the lighter ops stack. Phase 0 remains included — it's the only way to prove the redesign shifts the lead / conversion numbers, and dropping it contradicts the business goal stated in Section 1.

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
