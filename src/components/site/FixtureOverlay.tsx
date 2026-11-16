"use client";

import { useEffect, useRef, useState } from "react";
import { WHATSAPP_HREF } from "@/lib/constants";

// Matches the desktop nav's journeys — the menu previously listed
// each sport plus academy plus events as five equal items, which
// described a booking sub-menu, not a site map. Group Events has no
// hub page of its own (every occasion is its own page), so it expands
// in place to its three pages rather than linking anywhere.
const ITEMS = [
  { label: "HOME", href: "/" },
  { label: "GAME ON", href: "/play" },
  {
    label: "SQUAD PLANS",
    children: [
      { label: "Birthday Scenes", href: "/events/birthday" },
      { label: "Team Days", href: "/events/corporate" },
      { label: "Tournaments", href: "/events/tournament" },
    ],
  },
  { label: "COACHING", href: "/academy" },
  { label: "FIND US", href: "/location" },
  { label: "INSTA VIBES", href: "/socials" },
];

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

type FixtureOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export default function FixtureOverlay({ open, onClose }: FixtureOverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [eventsOpen, setEventsOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const trigger = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.documentElement.classList.add("site-menu-open");
    const background = Array.from(document.querySelectorAll<HTMLElement>("body > header, body > main, body > footer"));
    const previousInert = background.map(el => el.inert);
    background.forEach(el => { el.inert = true; });
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      // Full-screen modal — keep Tab cycling inside it rather than
      // leaking focus into the (visually hidden) page behind it.
      if (e.key === "Tab" && panelRef.current) {
        const focusable = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => {
      document.documentElement.style.overflow = previousOverflow;
      document.documentElement.classList.remove("site-menu-open");
      background.forEach((el, i) => { el.inert = previousInert[i]; });
      trigger?.focus();
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  return (
    <div
      id="fixture-overlay"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className={`site-menu-panel c7-overlay-panel fixed inset-0 z-[80] bg-c7-bg-1 transition-[clip-path] duration-300 ease-out ${
        open
          ? "[clip-path:inset(0_0_0%_0)]"
          : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
      }`}
      aria-hidden={!open}
      inert={!open}
    >
      <div className="site-menu-shell">
        <div className="site-menu-top">
          <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-ink-dim">
            Match Programme
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            tabIndex={open ? 0 : -1}
            className="font-body text-tag tracking-[0.24em] uppercase text-c7-ink transition-colors hover:text-c7-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-c7-red"
          >
            Close ✕
          </button>
        </div>

        <nav aria-label="Mobile navigation" className="site-menu-links">
          {ITEMS.map((item, i) =>
            item.children ? (
              <div key={item.label}>
                <button
                  type="button"
                  tabIndex={open ? 0 : -1}
                  onClick={() => setEventsOpen((v) => !v)}
                  aria-expanded={eventsOpen}
                  className="group flex w-full items-baseline gap-4 py-2 text-left md:py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
                >
                  <span className="font-body text-body-sm text-c7-ink-dim w-8 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-[clamp(1.65rem,5dvh,3.5rem)] uppercase text-c7-ink transition-transform duration-200 group-hover:translate-x-3 group-hover:text-c7-red">
                    {item.label}
                  </span>
                  <span aria-hidden="true" className={`ml-auto text-lg text-c7-ink-dim transition-transform duration-200 ${eventsOpen ? "-rotate-180" : ""}`}>
                    ▾
                  </span>
                </button>
                {eventsOpen && (
                  <div className="flex flex-col gap-1 pb-5 pl-12">
                    {item.children.map((child) => (
                      <a
                        key={child.href}
                        href={child.href}
                        tabIndex={open ? 0 : -1}
                        onClick={onClose}
                        className="group flex items-center gap-2 py-2 font-body text-body font-medium uppercase tracking-[0.02em] text-c7-ink-dim transition-colors hover:text-c7-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-c7-red"
                      >
                        {child.label}
                        <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">↗</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={item.label}
                href={item.href}
                tabIndex={open ? 0 : -1}
                onClick={onClose}
                className="group flex items-baseline gap-4 py-2 md:py-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
              >
                <span className="font-body text-body-sm text-c7-ink-dim w-8 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-[clamp(1.65rem,5dvh,3.5rem)] uppercase text-c7-ink transition-transform duration-200 group-hover:translate-x-3 group-hover:text-c7-red">
                  {item.label}
                </span>
              </a>
            )
          )}
        </nav>

        <div className="site-menu-actions">
          <a
            href="/play#book-enquiry"
            tabIndex={open ? 0 : -1}
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 bg-c7-red px-6 py-3.5 font-body text-body-sm font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:bg-c7-red-dim focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-c7-ink"
          >
            Find a Slot <span aria-hidden="true">↗</span>
          </a>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={open ? 0 : -1}
            className="inline-flex items-center justify-center gap-2 border border-c7-line/40 px-6 py-3.5 font-body text-body-sm font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:bg-c7-bg-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-c7-red"
          >
            WhatsApp Club 7
          </a>
        </div>
      </div>
    </div>
  );
}
