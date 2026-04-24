import { VideoPlaceholder } from "./video-placeholder";

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
          <VideoPlaceholder />
        </div>
      </div>
    </section>
  );
}
