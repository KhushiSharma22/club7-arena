const SPACES = ["Box Cricket", "Football", "Pickleball", "Café"];

/**
 * One small, high-signal section — not a features grid. The single
 * fact worth surfacing early on the birthday page: the whole ground
 * (every sport plus the café) can be booked out for one group, not
 * just a single court. No pricing or capacity claims — those aren't
 * verified anywhere in the project, so Club 7 confirms them directly.
 */
export default function FullVenueHire() {
  return (
    <section className="relative bg-c7-bg-1">
      <div className="mx-auto w-full max-w-[1600px] px-edge py-12 md:py-14">
        <div className="flex flex-col gap-6 border-t border-c7-line/15 pt-8 md:flex-row md:items-center md:justify-between md:gap-10 md:pt-10">
          <div className="max-w-xl">
            <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-red">Book It All</p>
            <h2 className="-ml-1 mt-3 font-display uppercase leading-[0.96] text-c7-ink text-[clamp(1.9rem,2.6vw,2.75rem)]">
              Rent the Whole Ground.
            </h2>
            <p className="mt-3 font-body text-body text-c7-ink-dim">
              Turf, courts and café — all yours for the day. No sharing the ground with anyone outside your group.
            </p>
          </div>

          <div className="shrink-0">
            <div className="flex flex-wrap gap-x-2 gap-y-1.5 font-body text-body-sm font-medium text-c7-ink md:justify-end">
              {SPACES.map((space, i) => (
                <span key={space}>
                  {space}
                  {i < SPACES.length - 1 && <span className="ml-2 text-c7-ink-dim/40">/</span>}
                </span>
              ))}
            </div>
            <a
              href="#plan"
              className="group mt-4 inline-flex items-center gap-2 border-b border-c7-line/40 pb-1 font-body text-body-sm font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:border-c7-red hover:text-c7-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
            >
              Ask about full venue hire
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-[3px]">
                ↓
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
