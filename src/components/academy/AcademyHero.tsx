"use client";

import Image from "next/image";
import { entrance } from "@/lib/entrance";
import { FILM_GRAIN_URL } from "@/lib/grain";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/constants";

const GRADE = "saturate(0.88) contrast(1.06) brightness(0.9) hue-rotate(3deg)";

export default function AcademyHero() {
  return (
    <section
      className="relative mx-auto flex min-h-[70dvh] w-full max-w-[1600px] flex-col justify-end px-edge pb-12 md:min-h-[78dvh] md:pb-14"
      style={{ paddingTop: "calc(var(--header-height, 90px) + 22px)" }}
    >
      <div className="absolute inset-0 -z-10 overflow-hidden bg-c7-bg-3">
        <Image
          src="/venue/turf-top-down-night.jpg"
          alt="Top-down view of Club 7's floodlit cricket turf at night, where academy sessions are held"
          fill
          sizes="100vw"
          quality={90}
          priority
          className="object-cover"
          style={{ objectPosition: "60% 45%", filter: GRADE }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
          style={{ backgroundImage: `url("${FILM_GRAIN_URL}")`, backgroundSize: "120px 120px" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-c7-bg-1/92 via-c7-bg-1/25 to-transparent" />
      </div>

      <div className="max-w-2xl">
        <p className={`c7-anim-reveal flex items-baseline gap-2 font-body text-tag uppercase tracking-[0.24em] text-c7-red ${entrance(0)}`}>
          <span className="mt-[3px] h-1.5 w-1.5 shrink-0 self-center bg-c7-red c7-anim-pulse-dot" aria-hidden="true" />
          01 / Academy
        </p>
        <h1
          className={`c7-anim-headline -ml-1 mt-3 font-display uppercase leading-[0.92] text-c7-ink text-[clamp(3rem,5.5vw,6.5rem)] ${entrance(
            150
          )}`}
        >
          Nets. Reps.
          <br />
          <span className="text-c7-red">Real Coaching.</span>
        </h1>
        <p className={`c7-anim-reveal mt-5 max-w-md font-body text-body-lg text-c7-ink-dim ${entrance(380)}`}>
          Cricket coaching on the same turf you already know — for the ones still working on their game.
        </p>

        <div className={`c7-anim-reveal mt-6 flex flex-col gap-3 sm:flex-row ${entrance(500)}`}>
          <a
            href={whatsappHref(WHATSAPP_MESSAGES.academy)}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 bg-c7-red px-6 py-3.5 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:bg-c7-red-dim focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
          >
            Enquire About a Trial
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-y-[2px]">
              ↘
            </span>
          </a>
          <a
            href="/play?sport=cricket"
            className="inline-flex items-center justify-center gap-2 border border-c7-line/35 px-6 py-3.5 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:border-c7-line/60 hover:bg-c7-bg-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
          >
            See the Cricket Turf <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
