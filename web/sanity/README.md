# Sanity CMS setup — one-time

Follow these steps to connect the app to a Sanity project. Everything else
on the site keeps working while Sanity is unconfigured (empty states for
content, fallback defaults for the calculator).

## 1. Create the project

1. Sign in at https://www.sanity.io/manage using the **Chimichurri** account
   (per the decision to own the project under Chimichurri initially; migrate
   to Lystr's org when they accept the CMS upsell).
2. Create a new project named "Lystr".
3. Pick the default dataset name `production`.
4. Copy the **Project ID** shown in the dashboard (the short hash like
   `abc123xy`).

## 2. Fill in `.env.local`

Create `web/.env.local` (gitignored) by copying `web/.env.example`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xy        # <- from step 1.4
NEXT_PUBLIC_SANITY_DATASET=production
```

Restart `pnpm dev`.

## 3. Authorise the CORS origin

In https://www.sanity.io/manage under your project → API → CORS Origins:

- Add `http://localhost:3000` with "Allow credentials" **off**.
- When deployed, add `https://<your-domain>` too.

## 4. Open the Studio

Visit http://localhost:3000/studio. Log in with your Sanity account.

You should see the sidebar with:

- Site-inställningar (singleton)
- Kalkylator (singleton)
- Artiklar
- Pressmeddelanden
- Skribenter
- Vanliga frågor
- Samarbeten
- Kampanjer

## 5. Seed with starter content

The initial content (singletons, two press releases, two articles, Mathias
as author, Cleansun + ETC El as partners, the existing FAQ entry) lives in
`sanity/seed/seed.ndjson`.

Run from `web/`:

```sh
# Install the Sanity CLI locally if you haven't already
pnpm add -D @sanity/cli

# Authenticate once (opens a browser)
pnpm sanity login

# Point the CLI at your project
pnpm sanity init --reconfigure --project-id <PROJECT_ID> --dataset production \
  --create-project false --coupon "" --yes

# Import the seed
pnpm sanity dataset import sanity/seed/seed.ndjson production --replace
```

After import, refresh /studio and you'll see all content populated.

## 6. Verify on the site

- `/` — homepage uses calculator settings from Sanity (same values as the
  code fallback, so nothing changes visually)
- `/press` — the two press releases appear
- `/artiklar` — the two articles appear
- `/press/rss.xml` and `/artiklar/rss.xml` — feeds serve from Sanity

Edit any document in /studio, publish, and refresh the page. First time
around you may need to reload twice because of cache tags (revalidation on
publish needs a webhook to be wired — see below).

## 7. (Later) Webhook for instant revalidation

Set up a GROQ webhook in sanity.io/manage → API → Webhooks:

- URL: `https://<deployed-domain>/api/revalidate`
- Dataset: `production`
- Trigger on: create, update, delete
- Filter: `_type in ["article","pressRelease","partner","faq","calculatorSettings","campaign","siteSettings","author"]`
- HTTP method: POST
- Secret: something random; store as `SANITY_REVALIDATE_SECRET` in env

Then create `web/src/app/api/revalidate/route.ts` that verifies the secret
and calls `revalidateTag('sanity:articles')` etc. based on the document
type. (Not included in this initial setup — add when traffic grows.)

## Migration to Lystr's account (later)

When Lystr accepts the CMS upsell:

1. Export the current dataset: `pnpm sanity dataset export production`
2. Create a new Lystr-owned Sanity org/project
3. Update `.env.local` and deploy env vars to the new project ID
4. Import into Lystr's dataset: `pnpm sanity dataset import <export>.tar.gz production`
5. Transfer admin rights. Remove Chimichurri user from the old project.
