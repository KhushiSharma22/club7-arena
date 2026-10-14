"use client";

import Image from "next/image";
import { useRevealOnView } from "@/lib/useRevealOnView";

const FACTS = [
  { label: "Where", value: "Same ground, same turf — Club 7, Sector 89" },
  { label: "Who", value: "Kids, teens and adults, grouped by age and skill" },
  { label: "Format", value: "Nets practice, coached sessions, a trial first" },
];

const POINTS = [
  {
    title: "Nets, not just open play",
    body: "Sessions are run as proper nets practice on the turf — bowling, batting, fielding drills — not a casual box-cricket game.",
  },
  {
    title: "Grouped by age and skill",
    body: "Beginners and more experienced players aren't thrown into the same session. Batches are kept small enough for the coach to actually watch everyone.",
  },
  {
    title: "Trial before you commit",
    body: "Come watch or join a session first. Batches, timings and fees are confirmed directly over WhatsApp — the team will sort the right slot for you.",
  },
];

export default function AcademyProgram() {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.15);

  return (
    <section ref={ref} className="relative mx-auto w-full max-w-[1600px] bg-c7-bg-1 px-edge py-16 md:py-20">
      <div
        className="border-t border-c7-line/15 pt-10 transition-[opacity,transform] duration-700 ease-out"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)" }}
      >
        <p className="font-body text-tag uppercase tracking-[0.24em] text-c7-red">02 / The Programme</p>
        <h2 className="-ml-1 mt-3 max-w-2xl font-display uppercase leading-[0.94] text-c7-ink text-[clamp(2.25rem,3.8vw,4rem)]">
          Space For The Ones Still Learning The Game.
        </h2>
        <p className="mt-4 max-w-xl font-body text-body-lg text-c7-ink-dim">
          Club 7 isn&apos;t only booked slots and box cricket — there&apos;s room here for academy players too.
        </p>
      </div>

      <div
        className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-c7-line/10 pt-8 transition-opacity duration-700 ease-out"
        style={{ opacity: visible ? 1 : 0, transitionDelay: visible ? "100ms" : "0ms" }}
      >
        {FACTS.map((fact) => (
          <div key={fact.label}>
            <p className="font-body text-[0.6875rem] uppercase tracking-[0.22em] text-c7-ink-dim/70">{fact.label}</p>
            <p className="mt-1.5 font-body text-body font-medium text-c7-ink">{fact.value}</p>
          </div>
        ))}
      </div>

      <div
        className="mt-12 grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-start md:gap-14"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(18px)", transition: "opacity 700ms ease-out, transform 700ms ease-out", transitionDelay: visible ? "160ms" : "0ms" }}
      >
        <div className="flex flex-col divide-y divide-c7-line/10 border-t border-c7-line/10">
          {POINTS.map((point) => (
            <div key={point.title} className="py-6 first:pt-0">
              <h3 className="font-display uppercase leading-[0.98] text-c7-ink text-[clamp(1.375rem,2vw,1.75rem)]">
                {point.title}
              </h3>
              <p className="mt-2 max-w-md font-body text-body text-c7-ink-dim">{point.body}</p>
            </div>
          ))}
        </div>

        <div className="relative h-[280px] overflow-hidden bg-c7-bg-3 md:h-[420px]">
          <Image
            src="/venue/day-aerial.jpg"
            alt="Daylight aerial view of Club 7's netted ground, Sector 89"
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            quality={90}
            className="object-cover"
            style={{ objectPosition: "50% 45%", filter: "saturate(0.95) contrast(1.02)" }}
          />
        </div>
      </div>
    </section>
  );
}
