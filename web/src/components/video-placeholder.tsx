/**
 * Placeholder for the explainer animation. Motion graphics file lands
 * later (Mux-hosted). The shape (16:9, play icon, caption) stays the same
 * — swapping in <mux-player> will be a one-line change.
 */
export function VideoPlaceholder() {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-lystr-line bg-gradient-to-br from-lystr-cream to-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)]">
      {/* Subtle diagonal pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #1c1c1c 0 1px, transparent 1px 14px)",
        }}
      />
      <div className="relative flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-lystr-black text-white shadow-lg">
          <svg
            width="22"
            height="24"
            viewBox="0 0 22 24"
            aria-hidden="true"
            fill="currentColor"
          >
            <path d="M2 2.1c0-1.5 1.6-2.4 3-1.7l16.2 9.9c1.3 0.8 1.3 2.6 0 3.4L5 23.6c-1.4 0.7-3-0.2-3-1.7V2.1Z" />
          </svg>
        </div>
        <p className="text-sm font-medium tracking-wide text-lystr-muted uppercase">
          Förklarande animation
        </p>
        <p className="max-w-md text-base text-lystr-slate">
          En 45-sekunders animation som förklarar hela avtalet kommer här.
        </p>
      </div>
    </div>
  );
}
