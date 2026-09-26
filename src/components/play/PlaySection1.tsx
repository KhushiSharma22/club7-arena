"use client";

import Image from "next/image";
import { PLAY_SPORTS, type PlaySportId } from "@/lib/play-data";
import { FILM_GRAIN_URL } from "@/lib/grain";
import { entrance } from "@/lib/entrance";
import { SportDiagram } from "./SportDiagram";

/** One consistent grade for all three sport photos — no per-sport
 * strength tiers, no dark overlay. Real venue photos stay close to
 * source; the stock football frame gets the same treatment as the
 * others so it doesn't read as a different photoshoot. */
const GRADE = "saturate(0.9) contrast(1.06) brightness(0.97) hue-rotate(2deg)";

/** All three photos stay mounted and cross-fade via opacity/transform
 * within one stable frame — switching sports never changes the frame's
 * size, so nothing else on the page reflows. */
function SportPhoto({ activeId, className }: { activeId: PlaySportId; className: string }) {
  return (
    <div className={`relative overflow-hidden bg-c7-bg-3 ${className}`}>
      {PLAY_SPORTS.map((sport) => (
        <div
          key={sport.id}
          className="absolute inset-0 transition-opacity duration-500 ease-out motion-reduce:transition-none"
          style={{ opacity: sport.id === activeId ? 1 : 0 }}
        >
          <Image
            src={sport.image.src}
            alt={sport.image.alt}
            fill
            sizes="(min-width: 768px) 66vw, 100vw"
            quality={90}
            priority={sport.id === activeId}
            className="object-cover transition-transform duration-500 ease-out motion-reduce:transition-none"
            style={{
              objectPosition: sport.image.position,
              filter: GRADE,
              transform: `scale(${sport.image.zoom ?? 1})`,
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
            style={{ backgroundImage: `url("${FILM_GRAIN_URL}")`, backgroundSize: "120px 120px" }}
          />
        </div>
      ))}
    </div>
  );
}

function SportSelector({
  activeId,
  onSelect,
}: {
  activeId: PlaySportId;
  onSelect: (id: PlaySportId) => void;
}) {
  const activeIndex = PLAY_SPORTS.findIndex((s) => s.id === activeId);

  return (
    <div className="sport-selector relative grid grid-cols-3 border-y border-c7-line/15">
      {PLAY_SPORTS.map((sport, i) => {
        const isActive = sport.id === activeId;
        return (
          <button
            key={sport.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(sport.id)}
            className={`group flex min-h-[84px] flex-col items-center justify-center gap-1.5 py-5 text-center transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-c7-red md:min-h-[112px] md:items-start md:py-7 md:text-left ${
              i > 0 ? "border-l border-c7-line/15" : ""
            }`}
          >
            <span
              className={`font-body text-body-sm tabular-nums transition-colors duration-300 ${
                isActive ? "text-c7-red" : "text-c7-ink-dim/60 group-hover:text-c7-ink-dim"
              }`}
            >
              {sport.number}
            </span>
            <span
              className={`font-display uppercase leading-[0.95] transition-colors duration-300 text-[clamp(1.375rem,3.4vw,2.5rem)] ${
                isActive ? "text-c7-ink" : "text-c7-ink-dim/70 group-hover:text-c7-ink-dim"
              }`}
            >
              {sport.shortName}
            </span>
          </button>
        );
      })}
      <span
        aria-hidden="true"
        className="absolute -bottom-px left-0 h-[3px] w-1/3 bg-c7-red transition-transform duration-[420ms] ease-out motion-reduce:transition-none"
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
      />
    </div>
  );
}

function InfoRow({ info }: { info: { label: string; value: string }[] }) {
  return (
    <div className="flex flex-wrap gap-x-8 gap-y-4 border-t border-c7-line/10 pt-5">
      {info.map((item) => (
        <div key={item.label}>
          <p className="font-body text-[0.6875rem] tracking-[0.22em] uppercase text-c7-ink-dim/70">{item.label}</p>
          <p className="mt-1.5 font-body text-body-sm font-medium uppercase tracking-[0.03em] text-c7-ink">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}

type PlaySection1Props = {
  activeId: PlaySportId;
  onSelect: (id: PlaySportId) => void;
};

export default function PlaySection1({ activeId, onSelect }: PlaySection1Props) {
  const sport = PLAY_SPORTS.find((s) => s.id === activeId)!;

  return (
    <section
      className="relative mx-auto w-full max-w-[1600px] bg-c7-bg-1 px-edge pb-16 md:pb-20"
      style={{ paddingTop: "calc(var(--header-height, 90px) + 28px)" }}
    >
      {/* Opening — compact, brings the selector into the first
          viewport. Headline left, supporting line pulled to the lower
          right so the two read as one composed line, not a stacked
          hero. */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between md:gap-10">
        <div>
          <p className={`c7-anim-reveal font-body text-tag tracking-[0.24em] uppercase text-c7-red ${entrance(0)}`}>
            Club 7 / Play
          </p>
          <h1
            className={`c7-anim-headline -ml-1 mt-2 font-display uppercase leading-[0.9] text-c7-ink text-[clamp(3rem,5vw+2rem,7rem)] ${entrance(
              120
            )}`}
          >
            Pick Your Game.
          </h1>
        </div>
        <p
          className={`c7-anim-reveal mt-4 max-w-[26ch] font-body text-body text-c7-ink-dim md:mt-0 md:text-right ${entrance(
            280
          )}`}
        >
          Choose your sport. We&apos;ll help sort the slot.
        </p>
      </div>
      <div className={`c7-anim-reveal mt-6 border-t border-c7-line/15 md:mt-8 ${entrance(360)}`} />

      {/* Selector — a major control, not a tab strip */}
      <div className={`c7-anim-reveal ${entrance(420)}`}>
        <SportSelector activeId={activeId} onSelect={onSelect} />
      </div>

      {/* Photographic stage — desktop: photo ~67%, info column ~33% */}
      <div className="mt-10 hidden md:mt-12 md:grid md:grid-cols-[2fr_1fr] md:items-start md:gap-12">
        <SportPhoto
          activeId={activeId}
          className={`c7-anim-photo-settle h-[520px] w-full ${entrance(520)}`}
        />

        <div className="pt-1">
          <h2
            key={sport.id}
            className="-ml-1 font-display uppercase leading-[0.92] text-c7-ink text-[clamp(2.5rem,3.6vw,4rem)] [animation:c7-play-title_450ms_cubic-bezier(0.2,0.7,0.2,1)_both] motion-reduce:[animation:none]"
          >
            {sport.shortName}
          </h2>
          <p
            key={`${sport.id}-line`}
            className="mt-3 max-w-[32ch] font-body text-body-lg text-c7-ink/85 [animation:c7-reveal_450ms_cubic-bezier(0.2,0.7,0.2,1)_both] motion-reduce:[animation:none]"
            style={{ animationDelay: "60ms" }}
          >
            {sport.line}
          </p>

          <div
            key={`${sport.id}-info`}
            className="mt-6 [animation:c7-reveal_450ms_cubic-bezier(0.2,0.7,0.2,1)_both] motion-reduce:[animation:none]"
            style={{ animationDelay: "100ms" }}
          >
            <InfoRow info={sport.info} />
          </div>

          <div key={`${sport.id}-diagram`} className="mt-6 h-[64px] w-[96px] text-c7-ink/70">
            <SportDiagram sportId={sport.id} />
          </div>

          <a
            href="#book-enquiry"
            className="group relative mt-7 inline-flex w-fit items-center gap-2 pb-1.5 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:text-c7-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
          >
            Choose a Time
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-y-[2px]">
              ↘
            </span>
            <span
              aria-hidden="true"
              className="absolute -inset-x-1.5 bottom-0 h-px bg-c7-line/40 transition-colors duration-200 group-hover:bg-c7-red"
            />
          </a>
        </div>
      </div>

      {/* Mobile — photo, then title/line/facts/diagram/CTA below it */}
      <div className="relative mt-8 md:hidden">
        <SportPhoto activeId={activeId} className={`c7-anim-photo-settle h-[280px] w-full ${entrance(480)}`} />

        <div key={`${sport.id}-mobile`} className="mt-6 [animation:c7-reveal_450ms_cubic-bezier(0.2,0.7,0.2,1)_both] motion-reduce:[animation:none]">
          <h2 className="-ml-1 font-display uppercase leading-[0.92] text-c7-ink text-[clamp(2.5rem,10vw,3.25rem)]">
            {sport.shortName}
          </h2>
          <p className="mt-3 max-w-[32ch] font-body text-body-lg text-c7-ink/85">{sport.line}</p>
          <div className="mt-6">
            <InfoRow info={sport.info} />
          </div>
          <div className="mt-6 h-[56px] w-[84px] text-c7-ink/70">
            <SportDiagram sportId={sport.id} />
          </div>
          <a
            href="#book-enquiry"
            className="group relative mt-7 inline-flex w-fit items-center gap-2 pb-1.5 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:text-c7-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
          >
            Choose a Time
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-y-[2px]">
              ↘
            </span>
            <span
              aria-hidden="true"
              className="absolute -inset-x-1.5 bottom-0 h-px bg-c7-line/40 transition-colors duration-200 group-hover:bg-c7-red"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
