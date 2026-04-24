import { fetchActiveCampaign } from "../../sanity/lib/fetch";

/**
 * Renders a sitewide banner if an active Campaign document with a
 * `banner` sub-object exists in Sanity. Silent otherwise.
 */
export async function SiteBanner() {
  const campaign = await fetchActiveCampaign();
  const b = campaign?.banner;
  if (!b?.text) return null;

  return (
    <div className="bg-lystr-red text-white">
      <div className="mx-auto flex max-w-(--container-narrow) flex-wrap items-center justify-between gap-3 px-6 py-3 text-sm md:px-10">
        <p className="font-medium">{b.text}</p>
        {b.ctaLabel && b.ctaHref && (
          <a
            href={b.ctaHref}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-1.5 font-medium text-white transition-colors hover:bg-white/25"
          >
            {b.ctaLabel}
            <span aria-hidden>→</span>
          </a>
        )}
      </div>
    </div>
  );
}
