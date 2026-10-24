"use client";

import Image from "next/image";
import { useRevealOnView } from "@/lib/useRevealOnView";
import { DIRECTIONS_HREF } from "@/lib/constants";

/** Only what's actually verified sitewide — "Open 24 Hours" is scoped
 * explicitly to the playing facilities here, not the café, since the
 * two haven't been confirmed to share a schedule. No street address,
 * entrance instructions or parking info exist anywhere in the project
 * — omitted rather than invented; add them the moment Club 7 confirms. */
const DETAILS = [
  { label: "Location", value: "Sector 89, Faridabad" },
  { label: "Turf & Courts", value: "Open 24 Hours" },
];

export default function YourMoveSection() {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.2);

  return (
    <section id="visit" className="relative bg-c7-bg-1">
      <div ref={ref} className="mx-auto w-full max-w-[1600px] px-edge pb-16 pt-10 md:pb-20 md:pt-12">
        <div className="md:grid md:grid-cols-[1.4fr_1fr] md:items-center md:gap-14">
          <div
            className="transition-[opacity,transform] duration-700 ease-out"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(14px)" }}
          >
            <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-red">04 / Visit</p>
            <h2 className="-ml-1 mt-3 font-display uppercase leading-[0.94] text-c7-ink text-[clamp(2.75rem,4.2vw,4.5rem)]">
              See You at Club 7.
            </h2>

            <div className="mt-7 flex flex-col divide-y divide-c7-line/15 border-t border-c7-line/15 max-w-sm">
              {DETAILS.map((d) => (
                <div key={d.label} className="flex items-center justify-between py-3">
                  <span className="font-body text-tag tracking-[0.2em] uppercase text-c7-ink-dim">{d.label}</span>
                  <span className="font-body text-body-sm font-medium text-c7-ink">{d.value}</span>
                </div>
              ))}
            </div>

            <a
              href={DIRECTIONS_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-7 inline-flex items-center gap-2 bg-c7-red px-6 py-3.5 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:bg-c7-red-dim focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
            >
              Get Directions
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-[3px]">
                ↗
              </span>
            </a>
          </div>

          <div
            className="entrance-photo relative mt-10 aspect-[3/4] w-full max-w-[480px] transition-[opacity,transform] duration-700 ease-out md:mt-0 md:max-w-[520px] md:justify-self-end"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(18px)",
              transitionDelay: visible ? "140ms" : "0ms",
            }}
          >
            <Image
              src="/venue/entrance-video-still.jpg"
              alt="Club 7's entrance at night, Sector 89, Faridabad"
              fill
              sizes="(min-width: 900px) 40vw, 100vw"
              quality={90}
              className="object-contain"
            />

          </div>
        </div>
      </div>

      <div className="border-t border-c7-line/[0.07] px-edge py-3.5 md:py-2.5">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-10 sm:gap-y-1">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-body text-[0.6875rem] tracking-[0.18em] uppercase text-c7-ink-dim/70">
            <span>Club 7</span>
            <span className="text-c7-ink-dim/30">/</span>
            <span>Sector 89 / Faridabad</span>
          </div>
          <p className="font-body text-[0.6875rem] tracking-[0.18em] uppercase text-c7-ink-dim/70">
            Cricket / Football / Pickleball / Café
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-body text-[0.6875rem] tracking-[0.18em] uppercase text-c7-ink-dim/70 transition-colors hover:text-c7-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-c7-red"
          >
            Back to top <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </section>
  );
}
