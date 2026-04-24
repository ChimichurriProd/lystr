# Foundation build plan — lystr.se

**Scope anchor:** Launch tier in the proposal = Foundation bundle in Lyster requirements v0.4 (Section 11.8). Budget ~555–860k SEK. Duration ~3 months from kickoff.

**Status:** Planning document. No code, no account creation, no commitments yet. Everything below is subject to sign-off from Alex and confirmed answers to the open pre-flight questions in Section 6.

---

## 1. What we're building

**In scope:**
- Brand refinement system (logo stays; palette, typography, graphic language, guidelines PDF, asset kit)
- 45-second explainer animation (motion graphics in After Effects; VO in Swedish; Mux-hosted)
- Replacement website on Next.js, retiring the current Framer site
- Sales / investor deck in PowerPoint, derived from brand + animation frames
- Phase 0 baseline measurement on the current Framer site (runs *before* the new site goes live)
- Lightweight platform: Vercel hosting, Plausible analytics, on-page form → email (Resend), Mux video hosting

**Explicitly out of scope at this tier** (available as Scale add-ons later):
- CMS (copy edits go via PR; no Sanity)
- HubSpot CRM integration (form sends to `info@lystr.se`; no lead pipeline)
- PostHog / session replay / funnels
- Marketing automation (no Mailchimp, no welcome email flows)
- Testimonial or live-action video
- Full Cleansun brand system work
- Any mobile app

## 2. Tech stack (recommended defaults)

Everything here is indicative — happy to swap for Lyster's preferences, but these are the defaults we'd scaffold with.

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 16** (App Router) | Server components + Cache Components give best-in-class performance for a content-heavy marketing site. Latest stable. |
| Language | **TypeScript** | Non-negotiable for production sites in 2026. |
| Styling | **Tailwind CSS v4** | Fast, the de facto choice with Next.js. No preprocessor overhead. |
| Components | **shadcn/ui** (selective) | Used only where it helps (form inputs, dialogs). Most components stay custom-brand. |
| Fonts | **Schibsted Grotesk** (already on lystr.se) | Keeps continuity with existing brand decision. Free / OFL. Swedish origin adds a small story beat. |
| Form handling | **React Hook Form** + Next.js Server Action → **Resend** API | Simplest server-side-validated form that ships to email. No third-party form service needed. |
| Analytics | **Plausible** | Cookieless, no consent banner required in Sweden. Installed on the current Framer site during Phase 0, carries over to the new site at launch. |
| Video | **Mux** (`mux-player` + Video API) | Adaptive HLS streaming for the explainer animation. Dashboard shows plays, quality metrics — useful for Phase 0 follow-through. |
| Hosting | **Vercel** (Hobby during build, Pro at launch) | Zero-config for Next.js, preview deploys per PR, good DX. Hobby is fine for preview; Pro (~220 SEK/mo) at launch for team access and production guarantees. |
| DNS | **Lyster's existing registrar** (likely Loopia, Binero, or similar for .se) | No changes to registrar. DNS records updated to point at Vercel at launch. |
| Email (transactional + inbound) | **Resend** (outgoing); inbound stays at current host | Resend needs SPF/DKIM DNS records on lystr.se. Inbound `info@lystr.se` unchanged. |
| CI/CD | **Vercel's built-in pipeline** | No GitHub Actions needed for this scope. PR → preview deploy → merge → production deploy. |
| Code quality | **Biome** or **ESLint + Prettier** + **TypeScript strict** | Standard guardrails. |

## 3. Repository & infrastructure

### Repository

Two options:

**Option A (recommended): Create the web-app repo under Lystr's GitHub org from day one.**
- New repo `lystr/lystr.se` or similar on Lystr's GitHub org.
- Sriracha invited as collaborators (Mattias, Emil, Ruy).
- All commits owned by Lystr from commit zero. No ownership transfer drama later.
- Requires Alex to set up a Lystr GitHub org first (5 minutes).

**Option B: Start on Chimichurri, transfer later.**
- Use `ChimichurriProd/lystr-web` temporarily, transfer ownership to Lystr's org at launch.
- Avoids needing a Lystr GitHub org until after work starts.
- Risk: transferring a repo changes URLs, breaks links, and may require re-linking Vercel.

**Our recommendation: Option A.** Takes one short email to Alex to arrange.

### Accounts to provision (Lyster owns, we get access)

| Service | Purpose | Who pays | Who needs admin |
|---|---|---|---|
| GitHub (Lystr org) | Code hosting | Free plan | Alex = org owner; us = member/admin of repo |
| Vercel | Hosting | Free during build; ~220 SEK/mo at launch (Pro) | Lystr as team owner; us as team members |
| Resend | Email delivery for the form | Free up to 3k emails/mo | Lystr as account owner; us API key as env var |
| Plausible | Analytics | ~105 SEK/mo (Starter, 10k pageviews) | Lystr as account owner; us as viewer |
| Mux | Video hosting | Free up to first 1000 plays/mo, then pay-as-you-go (~110–330 SEK/mo) | Lystr as account owner; us API key as env var |
| Figma | Design files | Professional seat (~165 SEK/mo) per editor | We hold seats during build; transfer files to Lystr at delivery |

Zero subscriptions held by Sriracha on Lystr's behalf. At handover we remove our access and hand the keys over cleanly.

### Environments

- **Local dev** — `pnpm dev` on each team member's laptop
- **Preview** — every PR auto-deploys to `lystr-se-<branch>.vercel.app` via Vercel Git integration; stakeholder review happens here
- **Staging** — `staging.lystr.se` subdomain pointing at the `main` branch on Vercel, for final pre-launch review
- **Production** — `www.lystr.se` + apex `lystr.se`, cutover from Framer at launch

## 4. Information architecture

### Sitemap (initial proposal)

```
/                        — homepage
/sa-funkar-det           — dedicated "how it works" page
/integritetspolicy       — privacy policy (NEW, legally required)
/cookies                 — cookie policy (lightweight, Plausible only)
/kontakt                 — contact + Calendly embed
/tack                    — thank-you page after form submit (noindex)
```

Six pages total. The existing Framer site has one page; we're growing the surface deliberately for SEO and legal compliance, not for the sake of it.

### Homepage section outline (draft, subject to brand discovery)

1. **Hero** — explainer animation (autoplay muted, poster frame for print) + single primary CTA (lead form scroll-to or modal)
2. **3 pillars** — reworked from "Oberoende / Miljövänligt / Framtidssäkrat" into outcome statements
3. **How it works** — the pelar visualisation (scrollytelling or linear — to be designed)
4. **Proof / numbers** — 200k+ SEK home value lift, 30 year warranty, 45–50 year lifespan, current customer count
5. **Benefits block** — the 5 "Varför välja Lystr" items from current copy, redesigned
6. **FAQ** — current "kan man vara utan elnätet" + additions
7. **Service + guarantee** — 30 år garanti, what's included
8. **Final CTA** — lead form (name, email, postnummer, elförbrukning) + secondary Calendly link
9. **Footer** — contact, address, Cleansun affiliation (hierarchy TBD)

### Content model (no CMS approach)

Copy lives in TypeScript files under `/content/`:

```
content/
  homepage.ts       — exported as typed object, imported into page components
  faq.ts            — array of Q&A
  pillars.ts        — the 3 pillars with icons + copy
  benefits.ts       — the 5 benefits
  legal/
    integritetspolicy.mdx
    cookies.mdx
```

Copy changes require a PR. Non-technical staff can't edit without a developer. Documented trade-off: saved ~20–35k SEK up front. Can add Sanity later (Scale upgrade) without rewriting anything — just swap the import source.

## 5. Phased work breakdown (12-week plan)

Weeks count from kickoff. Assumes single full-time senior developer + part-time designer + part-time animator; adjust if team shape differs.

| Week | Track A — Brand & Content | Track B — Animation | Track C — Website | Track D — Phase 0 |
|---|---|---|---|---|
| 1 | Kickoff, discovery session w/ Alex + Johan; copy audit | — | Repo + Vercel scaffold; Resend + Mux accounts set up | **Plausible on current Framer site; ETC UTM coordination starts** |
| 2 | Brand direction v1 (2 concepts); script draft | Script aligned to brand | Sitemap + wireframes low-fi | Source-tagging spreadsheet live with sales team |
| 3 | Brand direction lock (Alex + Johan); copy v1 | Storyboard | Hi-fi design homepage | First week of Phase 0 data |
| 4 | Guidelines doc draft | Design frames | Hi-fi design remaining pages | Weekly data review begins |
| 5 | Guidelines final; asset kit | Animation build begins | Development begins (design → code) | — |
| 6 | Copy final | Animation first cut | Components library, layouts | — |
| 7 | — | VO recording | Homepage + /sa-funkar-det dev | — |
| 8 | Sales deck template | Animation revisions | Form + Mux embed + Plausible | — |
| 9 | Sales deck populated | Animation final cut | QA across devices; a11y pass | — |
| 10 | Sales deck revisions | Final exports → Mux | Lighthouse / CWV optimisation | — |
| 11 | Deck final | — | Staging review w/ Alex | — |
| 12 | — | — | **DNS cutover, launch, handover** | 4-week post-launch data compared to Phase 0 baseline |

### Dependencies that matter

- Brand direction must be 70% locked before Track B animation design starts (week 3).
- Brand direction must be 70% locked before Track C hi-fi design starts (week 3).
- Copy must be final before Track C dev hits the section components (week 6).
- Animation design frames (from After Effects) get extracted as static illustrations for Track C scrollytelling — one asset pipeline, two destinations (web + animation).
- Phase 0 runs in parallel from week 1. Minimum 4 weeks of data before launch so the before/after comparison is meaningful.

## 6. Pre-flight decisions needed (before kickoff)

Answers to these determine the first 2 weeks of work. Deferring them delays launch. In rough priority order:

1. **Accept proposal + tier (Launch).** Signed scope document.
2. **GitHub org + primary contact for Lystr's dev owner.** Either Alex proxies, or we're given a contact.
3. **Domain ownership + DNS access.** Where is `lystr.se` registered? Who has the login? Can we get temporary admin to configure Vercel records, or does Alex want to do it himself?
4. **Email sender setup.** Will the form send as `no-reply@lystr.se`? If so, we need DNS access for SPF/DKIM TXT records.
5. **ETC cooperation on UTM tagging.** Required for Phase 0 cross-channel attribution. Blocker on measurement quality if they decline.
6. **Cleansun hierarchy in footer.** One-line decision: co-branded, footer-only, or absent.
7. **Copy inconsistencies.** Is the contract 5–8 years or 8 years? Are post-contract savings "65–80 %" or "~65 %"? Alex signs off on one number before we write new copy.
8. **Who at Lystr handles review loops.** Alex for final sign-off, but who does day-to-day (design reviews, copy approvals, asset handoffs)?
9. **Primary CTA.** Today the only path is Calendly. For the new site: is the form the primary CTA, with Calendly secondary? Or parallel? Or form only?
10. **Launch date target.** Do we have a fixed investor meeting / press moment that the site must be live for, or is "week 12 from kickoff" the only constraint?

## 7. Risks & mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Johan review loops slow brand work | Medium | High | Bake 3 explicit review checkpoints into the timeline; no open-ended reviews. If Johan slips, Alex's sign-off is sufficient to unblock. |
| ETC refuses UTM tagging | Low | Medium | Phase 0 still runs on Plausible; attribution becomes referrer-based (less clean but usable). |
| Copy not locked by week 6 | Medium | Medium | Development uses lorem ipsum scaffolding from week 5; copy drops in as a final content pass. |
| Animation script changes late | Low-medium | High | After Effects iteration is ~2 days per major change; fold one final revision round into week 10 budget. |
| Domain registrar access blocked | Medium | High | Must be resolved in Pre-flight #3 before week 1 starts. We will not start the engagement without DNS access path confirmed. |
| Lyster's liquidity slows milestone payments | Medium | Medium | Staged payment terms (20/30/50 monthly) available; we'll hold preview deploy live but not hand source code until each milestone clears. |
| Scope creep toward Scale tier mid-build | High | Medium | Any scope change becomes a change request at hourly rate; no "while you're in there" additions. |

## 8. Definition of done — what "launched" means

The engagement is complete when all of the following are true:

- [ ] `www.lystr.se` serves the new Next.js site over HTTPS; Framer is decommissioned
- [ ] All six sitemap pages live, SEO-indexable (`robots.txt` + `sitemap.xml` auto-generated)
- [ ] Lead form submits to `info@lystr.se` via Resend with validated payload
- [ ] Plausible shows traffic from day one of production
- [ ] Mux-hosted explainer animation embedded on homepage and `/sa-funkar-det`
- [ ] Phase 0 baseline dashboard shows at minimum 4 weeks of pre-launch data alongside first post-launch data
- [ ] Lighthouse production scores: Performance ≥90, Accessibility ≥95, SEO = 100, Best Practices = 100
- [ ] Core Web Vitals: LCP <2.5s, CLS <0.1, INP <200ms (measured on production)
- [ ] Accessibility: keyboard-navigable, screen-reader tested, WCAG 2.1 AA compliant
- [ ] Sales deck delivered as native .pptx, light variant, 18–22 slides, fully editable by Lyster staff
- [ ] Brand guidelines PDF delivered
- [ ] After Effects master project handed over to Lystr (full buyout)
- [ ] All credentials + account ownership confirmed in Lystr's name
- [ ] Handover documentation in repo: `README.md`, `DEPLOYMENT.md`, `CONTENT.md`

Anything not ticked is explicitly a post-launch punch-list item or out-of-scope.

## 9. First week after kickoff — concrete next steps

When the engagement starts, week 1 in order:

**Day 1 (Monday)**
- 90-min kickoff call with Alex + Johan + Sriracha
- Lock discovery session date with Alex for Day 3
- Create `lystr/lystr.se` GitHub repo (Lyster org)
- Invite Sriracha team as repo collaborators

**Day 2**
- Create Vercel project linked to GitHub repo
- Push empty Next.js + Tailwind + TypeScript scaffold
- Confirm preview deploy pipeline works
- Request DNS access from Alex (or registrar details to proceed)
- Install Plausible tracking script on the current Framer site
- Start ETC UTM coordination conversation (email to ETC contact)

**Day 3**
- Discovery session with Alex (2-3 hours): audience, tone, brand values, competitive positioning, brand hierarchy decisions (Cleansun), copy inconsistencies resolved
- Start copy audit in parallel

**Day 4-5**
- Brand direction v1 starts (designer)
- Script draft v1 starts (script writer)
- Sitemap + content model proposal drafted
- Source-tagging spreadsheet set up for sales team; first training with whoever takes inbound calls

By end of week 1 we have: live repo, live preview deploy, Plausible shipping data, source tags flowing, kickoff decisions documented, brand direction in flight.

---

## Open to feedback on

- **Tech stack choices** — happy to adjust (e.g., if you prefer Astro over Next.js for a content site, or Payload over Sanity if we add a CMS later).
- **Team shape / velocity** — 12 weeks assumes a specific rhythm. Compress or expand depending on Sriracha's actual capacity.
- **Phased vs big-bang launch** — we could soft-launch on a subdomain first instead of cutting over at week 12.
- **Animation length** — planned at 45s (Foundation default); 75–90s is a +~65k SEK delta if you want to push up to Launch tier's original spec.
