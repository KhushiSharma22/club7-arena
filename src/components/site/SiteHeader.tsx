"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FixtureOverlay from "./FixtureOverlay";

/**
 * The three journeys the site actually offers, visible directly rather
 * than hidden inside one "Play" dropdown that used to bundle sports,
 * academy and events together under a label that didn't describe half
 * of what was in it.
 */
const NAV_LINKS = [
  { label: "Play", href: "/play" },
  { label: "Group Events", href: "/events" },
  { label: "Location", href: "/location" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  /* The header's height is purely content-driven (no fixed h-*) — it
     changes with breakpoint, font-metric swaps, and copy edits. Any
     page that needs to clear it should never hardcode a guessed
     padding value; it should read this measured number instead. Kept
     on :root (not component state) so plain CSS elsewhere — including
     `scroll-padding-top` in globals.css — can consume it too. */
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    function applyHeight() {
      document.documentElement.style.setProperty("--header-height", `${header!.offsetHeight}px`);
    }

    applyHeight();
    const observer = new ResizeObserver(applyHeight);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Environmental scrim, not a navbar container — keeps nav text
          readable over whichever photo happens to be scrolled beneath
          it, without ever reading as a boxed bar. A touch of backdrop
          blur (not just a colour tint) is what keeps the nav legible
          once light-background sections like "Off the Pitch" scroll
          underneath it — blur softens the content behind it either
          way, tint alone only works reliably over dark photography. */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-40 backdrop-blur-sm"
        style={{
          height: "var(--header-height, 90px)",
          background: "color-mix(in srgb, var(--color-c7-bg-1) 88%, transparent)",
        }}
        aria-hidden="true"
      />
      {/* Same bounded content grid as the hero (max-w-[1600px] + the
          shared px-edge gutter) so the two share one consistent frame
          instead of the header running edge-to-edge against a hero
          that's deliberately composed within a margin. */}
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-50 mx-auto flex w-full max-w-[1600px] items-center justify-between px-edge py-5 md:py-7"
      >
        <div className="flex items-baseline gap-3">
          <Link href="/" className="font-display text-3xl md:text-4xl uppercase tracking-tight text-c7-ink leading-none">
            Club<span className="text-c7-red">7</span>
          </Link>
          <span className="hidden xl:inline font-body text-tag tracking-[0.24em] uppercase text-c7-ink-dim">
            Sector 89 / FBD
          </span>
        </div>

        <nav className="hidden items-center gap-5 md:flex lg:gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className="site-nav-link font-body text-body-sm font-medium uppercase tracking-[0.08em] text-c7-ink-dim transition-colors hover:text-c7-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/socials"
            aria-label="Socials"
            aria-current={pathname === "/socials" ? "page" : undefined}
            className="site-nav-link text-c7-ink-dim transition-colors hover:text-c7-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="12" cy="12" r="4.6" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" />
            </svg>
          </a>
        </nav>

        <div className="flex items-center gap-3 md:gap-6">
          <a
            href="/play#book-enquiry"
            className="hidden items-center gap-1.5 border border-c7-line/40 px-4 py-2 font-body text-body-sm font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:border-c7-red hover:text-c7-red md:inline-flex focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
          >
            Find a Slot <span aria-hidden="true">↗</span>
          </a>
          <a
            href="/play#book-enquiry"
            className="md:hidden inline-flex items-center font-body text-body-sm font-medium uppercase tracking-[0.06em] text-c7-ink-dim"
          >
            Find a Slot
          </a>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="fixture-overlay"
            aria-label="Open menu"
            className="md:hidden flex h-9 w-9 flex-col items-center justify-center gap-1.5 border border-c7-line/30"
          >
            <span className="block h-px w-4 bg-c7-ink" />
            <span className="block h-px w-2.5 self-start ml-[11px] bg-c7-ink" />
          </button>
        </div>
      </header>

      <FixtureOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}
