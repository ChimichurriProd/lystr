/**
 * Explainer video section.
 *
 * TEMPORARY: embeds a third-party video as a placeholder for visual
 * pacing. Swap for <mux-player> + Lystr's own animation once the
 * After Effects master is delivered and uploaded to Mux.
 */
const PLACEHOLDER_YOUTUBE_ID = "IJJBPuCwxN4";

export function ExplainerSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-(--container-narrow) px-6 py-20 md:px-10 md:py-28">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.12em] text-lystr-muted">
            På 45 sekunder
          </p>
          <h2 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-lystr-black md:text-4xl">
            Hela avtalet, förklarat.
          </h2>
          <p className="mt-3 text-base text-lystr-slate md:text-lg">
            Se hur din elkostnad förvandlas till en avbetalning på din egen
            solanläggning.
          </p>
        </div>

        <div className="mt-10">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-lystr-line bg-lystr-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.2)]">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${PLACEHOLDER_YOUTUBE_ID}?rel=0&modestbranding=1`}
              title="Förklaring av Lystrs energiavtal (temporär placeholder)"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
          <p className="mt-3 text-xs text-lystr-muted">
            Tillfällig placeholder. Lystrs egen animerade förklaring ersätter
            denna när den är klar.
          </p>
        </div>
      </div>
    </section>
  );
}
