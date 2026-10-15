"use client";

import { useEffect, useRef } from "react";

/**
 * The hero environment is real Club 7 footage — no constructed/
 * illustrated scenery. A looping video of the ground stands in for
 * the still night-aerial photo used before; the photo stays on as the
 * `<video>`'s poster, so it's still what's shown (and all that's ever
 * downloaded) for anyone on `prefers-reduced-motion`. Two things are
 * layered on top either way:
 *
 * 1. A static compositional gradient that lets that darkness bleed
 *    into the site background, so copy has a legible zone without a
 *    hard rectangle/card edge. Direction flips per breakpoint — side-on
 *    (desktop, text sits left) vs top-down (mobile, text sits below).
 * 2. A one-shot exposure ramp (CSS `filter: brightness/contrast`) on
 *    the footage itself for the entrance — "very dark → lights visible
 *    → full exposure" — instead of a black scrim or fake lamp dots.
 *
 * No grain, no added vignette, no desaturation: the brief is explicit
 * that these are real venue photographs/footage and should read as
 * such.
 */
type HeroMediaProps = {
  videoSrc?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export default function HeroMedia({
  videoSrc = "/venue/hero-loop.mp4",
  imageSrc = "/venue/night-aerial.jpg",
  imageAlt = "Club 7's floodlit turf complex at night, Sector 89, Faridabad",
}: HeroMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Autoplay is driven from here rather than the `autoPlay` attribute
  // so a `prefers-reduced-motion` visitor gets the still poster frame
  // only — the video never starts, so it's also never fetched beyond
  // its poster image.
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;
    videoRef.current?.play().catch(() => {});
  }, []);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    const container = containerRef.current;
    const spot = spotlightRef.current;
    if (!container || !spot) return;

    function handleMove(e: MouseEvent) {
      const rect = container!.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      spot!.style.setProperty("--spot-x", `${x}%`);
      spot!.style.setProperty("--spot-y", `${y}%`);
      spot!.style.opacity = "1";
    }
    function handleLeave() {
      spot!.style.opacity = "0";
    }

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseleave", handleLeave);
    return () => {
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden bg-c7-bg-1">
      <video
        ref={videoRef}
        src={videoSrc}
        poster={imageSrc}
        aria-label={imageAlt}
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover object-[center_44%] c7-anim-photo-expose"
      />

      {/* Slight lift on the lower portion of the photo only — the ground
          itself, not the sky/tree band above it. ~16%, not a global
          brighten — just enough that the floodlights and turf read as
          the natural focal point on the right. */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, transparent 44%, rgba(255,255,255,0.16) 100%)",
        }}
      />

      {/* Compositional reveal — mobile only: top-down, since copy sits
          below the photo there and needs a legible zone beneath it.
          Desktop drops this entirely in favour of the side-on gradient
          below — copy sits left, so only the left needs protecting;
          darkening the bottom too (as this used to, on both
          breakpoints) muddied the ground/floodlights on the right for
          no reason. */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, transparent 18%, var(--color-c7-bg-1) 58%)",
        }}
      />
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(100deg, var(--color-c7-bg-1) 2%, var(--color-c7-bg-1) 30%, transparent 56%)",
        }}
      />

      {/* Cursor spotlight — desktop, fine-pointer only; see effect above */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(320px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in srgb, var(--color-c7-ink) 10%, transparent), transparent 60%)",
        }}
      />
    </div>
  );
}
