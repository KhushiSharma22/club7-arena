import { entrance } from "@/lib/entrance";
import HeroMedia from "./HeroMedia";

export default function Hero() {
  return (
    <section className="relative isolate min-h-[80dvh] overflow-hidden md:min-h-[74dvh]">
      <HeroMedia />

      {/* A bounded content grid, shared with the header, so wide
          viewports read as composed rather than the text sitting
          flush against the left edge with dead space to the right.
          The text block sits inside flex-1: bottom-weighted on mobile
          (matches the safely-darkened lower zone of the photo, same
          as before) and centred on desktop, where the scroll cue's
          own height below eats into flex-1's share of the viewport —
          which is what pulls the composition slightly above true
          centre there, no magic-number offsets needed. */}
      <div className="relative z-10 mx-auto flex min-h-[80dvh] w-full max-w-[1600px] flex-col px-edge pb-12 pt-28 md:min-h-[74dvh] md:pb-14">
        <div className="flex flex-1 flex-col justify-end md:justify-center">
          <div className="max-w-xl md:max-w-2xl">
            {/* Headline — a slightly gentler ceiling than the shared
                display-1 token so it stays "large and confident"
                without ballooning into comic-huge on very wide
                monitors; still the same tight leading/tracking. */}
            <h1 className="mt-3 -ml-1 md:-ml-2">
              <span
                className={`c7-anim-headline block font-display text-[clamp(3.5rem,3.2vw+2.85rem,9.5rem)] uppercase leading-[0.92] tracking-[-0.01em] text-c7-ink ${entrance(
                  850
                )}`}
              >
                Play Late.
              </span>
              <span
                className={`c7-anim-headline block font-display text-[clamp(3.5rem,3.2vw+2.85rem,9.5rem)] uppercase leading-[0.92] tracking-[-0.01em] text-c7-red ${entrance(
                  1000
                )}`}
              >
                Stay Later.
              </span>
            </h1>

            {/* Supporting line + actions */}
            <div className={`c7-anim-reveal mt-6 ${entrance(1150)}`}>
              <p className="font-body text-body text-c7-ink-dim md:text-body-lg">
                Cricket, football, pickleball and a café in Sector 89, Faridabad.
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#the-ground"
                  className="group inline-flex items-center justify-center gap-2 bg-c7-red px-6 py-3.5 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:bg-c7-red-dim focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
                >
                  Explore the Ground
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-y-[2px]"
                  >
                    ↘
                  </span>
                </a>
                <a
                  href="/play#book-enquiry"
                  className="inline-flex items-center justify-center gap-2 border border-c7-line/35 px-6 py-3.5 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:border-c7-line/60 hover:bg-c7-bg-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
                >
                  Find a Slot <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
