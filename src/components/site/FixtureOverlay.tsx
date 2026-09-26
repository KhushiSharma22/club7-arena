"use client";

import { useEffect, useRef } from "react";
import { WHATSAPP_HREF } from "@/lib/constants";

// Matches the desktop nav's three journeys — the menu previously
// listed each sport plus academy plus events as five equal items,
// which described a booking sub-menu, not a site map.
const ITEMS = [
  { label: "PLAY", href: "/play" },
  { label: "GROUP EVENTS", href: "/events" },
  { label: "LOCATION", href: "/location" },
  { label: "SOCIALS", href: "/socials" },
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

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
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
      className={`c7-overlay-panel fixed inset-0 z-[60] bg-c7-bg-1 transition-[clip-path] duration-300 ease-out ${
        open
          ? "[clip-path:inset(0_0_0%_0)]"
          : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
      }`}
      aria-hidden={!open}
    >
      <div className="flex h-full flex-col px-edge py-6">
        <div className="flex items-center justify-between border-b border-c7-line/15 pb-6">
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

        <nav className="flex-1 flex flex-col justify-center divide-y divide-c7-line/15">
          {ITEMS.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              tabIndex={open ? 0 : -1}
              onClick={onClose}
              className="group flex items-baseline gap-4 py-4 md:py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
            >
              <span className="font-body text-body-sm text-c7-ink-dim w-8 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-display-2 uppercase text-c7-ink transition-transform duration-200 group-hover:translate-x-3 group-hover:text-c7-red">
                {item.label}
              </span>
            </a>
          ))}
        </nav>

        <div className="flex flex-col sm:flex-row gap-3 border-t border-c7-line/15 pt-6">
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
