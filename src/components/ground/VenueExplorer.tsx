"use client";

import { useState } from "react";
import Image from "next/image";
import { HOTSPOTS, type HotspotId } from "@/lib/venue-map-data";

const AERIAL = {
  src: "/venue/night-aerial-clean.webp",
  alt: "Aerial view of Club 7's floodlit venue at night, Sector 89, Faridabad",
  position: "center 44%",
};

/** Illustrative boundary trace — same "eyeballed, not surveyed" overlay
 * language already used for the pitch/field markings elsewhere on this
 * page. Four growing lines rather than a filled rectangle, so it reads
 * as a diagram annotation over the photo, not a highlight box. */
function BoundaryTrace({ box }: { box: { left: number; top: number; width: number; height: number } }) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <span
        key={`t-${box.left}`}
        className="c7-anim-grow-x absolute bg-c7-red"
        style={{ left: `${box.left}%`, top: `${box.top}%`, width: `${box.width}%`, height: 2, transformOrigin: "left" }}
      />
      <span
        key={`r-${box.left}`}
        className="c7-anim-grow-y absolute bg-c7-red"
        style={{ left: `${box.left + box.width}%`, top: `${box.top}%`, width: 2, height: `${box.height}%`, transformOrigin: "top", animationDelay: "120ms" }}
      />
      <span
        key={`b-${box.left}`}
        className="c7-anim-grow-x absolute bg-c7-red"
        style={{ left: `${box.left}%`, top: `${box.top + box.height}%`, width: `${box.width}%`, height: 2, transformOrigin: "right", animationDelay: "240ms" }}
      />
      <span
        key={`l-${box.left}`}
        className="c7-anim-grow-y absolute bg-c7-red"
        style={{ left: `${box.left}%`, top: `${box.top}%`, width: 2, height: `${box.height}%`, transformOrigin: "bottom", animationDelay: "360ms" }}
      />
    </div>
  );
}

export default function VenueExplorer() {
  const [activeId, setActiveId] = useState<HotspotId>("cricket");
  const active = HOTSPOTS.find((h) => h.id === activeId)!;

  return (
    <div className="mx-auto w-full max-w-[1600px] px-edge">
      <div className="md:grid md:grid-cols-[1fr_340px] md:items-start md:gap-10">
        {/* Aerial photo + hotspots */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-c7-bg-3 sm:aspect-[16/10] md:aspect-[16/10]">
          <Image
            src={AERIAL.src}
            alt={AERIAL.alt}
            fill
            sizes="(min-width: 768px) 62vw, 100vw"
            quality={90}
            className="object-cover"
            style={{ objectPosition: AERIAL.position, filter: "saturate(0.85) contrast(1.05) brightness(0.85) hue-rotate(3deg)" }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(4,14,14,0.4) 0%, rgba(4,14,14,0.12) 30%, rgba(4,14,14,0.38) 100%)" }}
          />

          <BoundaryTrace key={activeId} box={active.box} />

          {/* Hotspot markers — desktop/tablet only; mobile uses the plain
              list below instead of relying on small tap targets on a photo. */}
          <div className="absolute inset-0 hidden sm:block">
            {HOTSPOTS.map((h) => {
              const isActive = h.id === activeId;
              return (
                <button
                  key={h.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveId(h.id)}
                  onFocus={() => setActiveId(h.id)}
                  className="group absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-c7-red"
                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                >
                  {/* Unmistakable active state: a soft pulsing ring behind
                      the dot, not just a colour/scale change on the dot
                      alone. */}
                  {isActive && (
                    <span
                      className="c7-anim-pulse-dot pointer-events-none absolute h-6 w-6 rounded-full border border-c7-red/70"
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={`relative block h-3 w-3 rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? "scale-110 border-c7-ink bg-c7-red"
                        : "border-c7-ink/80 bg-c7-bg-1 group-hover:border-c7-red group-hover:bg-c7-red/80"
                    }`}
                  />
                  {/* Label sits on its own scrim so it stays readable
                      regardless of what's underneath it in the photo. */}
                  <span
                    className={`absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-[2px] bg-c7-bg-1/80 px-1.5 py-0.5 font-body text-[0.6875rem] tracking-[0.1em] uppercase backdrop-blur-[1px] transition-opacity duration-300 ${
                      isActive ? "text-c7-ink opacity-100" : "text-c7-ink-dim opacity-70 group-hover:opacity-100 group-hover:text-c7-ink"
                    }`}
                  >
                    {h.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Keep details in normal flow so images and links reserve their full
            height before the facility controls, including on narrow screens. */}
        <div className="venue-detail relative mt-6 min-h-[280px] md:mt-0 md:min-h-[360px]">
          <div key={activeId} className="venue-detail-content c7-anim-reveal relative [animation-duration:250ms]">
            <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-red">{active.label}</p>
            <p className="mt-2 font-body text-body-lg text-c7-ink/90">{active.fact}</p>

            {active.image ? (
              <div className="relative mt-5 aspect-[4/3] w-full max-w-[280px] overflow-hidden bg-c7-bg-3">
                <Image
                  src={active.image.src}
                  alt={active.image.alt}
                  fill
                  sizes="280px"
                  quality={90}
                  className="object-cover"
                  style={{ objectPosition: active.image.position, filter: "saturate(0.85) contrast(1.06) brightness(0.92)" }}
                />
              </div>
            ) : null}

            {active.playHref ? (
              <a
                href={active.playHref}
                className="group mt-5 inline-flex items-center gap-2 border-b border-c7-line/40 pb-1 font-body text-body-sm font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:border-c7-red hover:text-c7-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
              >
                Explore on Play
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-[3px]">
                  ↗
                </span>
              </a>
            ) : null}
            {active.sectionHref ? (
              <a
                href={active.sectionHref}
                className="group mt-5 inline-flex items-center gap-2 border-b border-c7-line/40 pb-1 font-body text-body-sm font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:border-c7-red hover:text-c7-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
              >
                Explore the Café
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-[3px]">
                  ↓
                </span>
              </a>
            ) : null}
          </div>
        </div>
      </div>

      {/* Mobile — a normal list of facility controls, not tiny hotspots */}
      <div className="mt-6 flex flex-col divide-y divide-c7-line/15 border-t border-c7-line/15 sm:hidden">
        {HOTSPOTS.map((h) => {
          const isActive = h.id === activeId;
          return (
            <button
              key={h.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveId(h.id)}
              className="flex min-h-12 items-center justify-between py-3.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-c7-red"
            >
              <span className={`font-body text-body font-medium uppercase tracking-[0.02em] ${isActive ? "text-c7-red" : "text-c7-ink"}`}>
                {h.label}
              </span>
              <span className="font-body text-body-sm text-c7-ink-dim">{isActive ? "Selected" : "View"}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
