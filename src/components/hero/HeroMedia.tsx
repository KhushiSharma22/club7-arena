"use client";

import { useEffect, useRef } from "react";

/** Real drone footage, framed in landscape and softly blended into the hero. */
type HeroMediaProps = {
  videoSrc?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export default function HeroMedia({
  videoSrc = "/venue/drone-hero-landscape.mp4",
  imageSrc = "/venue/drone-hero-poster.jpg",
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
        preload="none"
        className="absolute inset-0 h-full w-full object-cover object-[65%_center] md:object-center c7-anim-photo-expose"
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(180deg, var(--color-c7-bg-1) 0%, transparent 22%, transparent 70%, var(--color-c7-bg-1) 100%)" }}
      />
      <div
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{ background: "linear-gradient(90deg, var(--color-c7-bg-1) 0%, rgba(6,17,11,.92) 22%, rgba(6,17,11,.45) 48%, rgba(6,17,11,.12) 76%, var(--color-c7-bg-1) 100%)" }}
      />
      <div
        className="pointer-events-none absolute inset-0 md:hidden"
        style={{ background: "linear-gradient(180deg, rgba(6,17,11,.18) 0%, rgba(6,17,11,.12) 28%, rgba(6,17,11,.8) 57%, var(--color-c7-bg-1) 88%)" }}
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
