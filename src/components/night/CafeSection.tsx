"use client";

import { useRevealOnView } from "@/lib/useRevealOnView";

export default function CafeSection() {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.1);
  return (
    <section id="the-cafe" className="cafe-interlude">
      <div ref={ref} className={`cafe-inner ${visible ? "is-visible" : ""}`}>
        <div className="cafe-copy">
          <p className="cafe-eyebrow">The café / After the final whistle</p>
          <h2>Good game.<br /><span>Better company.</span></h2>
          <p>The game&apos;s done. Your catch-up doesn&apos;t have to be. Take a seat, grab a drink and stay for one more conversation.</p>
          <a href="#visit">Meet you here <span aria-hidden="true">↗</span></a>
        </div>
        <div className="cafe-art" aria-hidden="true">
          <span className="cafe-art-note">No rush. You&apos;re off the clock.</span>
          <svg viewBox="0 0 320 210" fill="none">
            <ellipse cx="157" cy="174" rx="112" ry="12" stroke="currentColor" strokeWidth="1" />
            <path d="M90 81h122v39c0 31-25 48-61 48s-61-17-61-48V81Z" stroke="currentColor" strokeWidth="2" />
            <path d="M213 89h12c35 0 34 49-12 49" stroke="currentColor" strokeWidth="2" />
            <ellipse cx="151" cy="81" rx="61" ry="9" stroke="currentColor" strokeWidth="2" />
            <g className="cafe-steam" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M128 59c-17-18 17-23 0-42" /><path d="M153 52c-17-18 17-23 0-42" /><path d="M179 59c-17-18 17-23 0-42" /></g>
          </svg>
          <span className="cafe-art-caption">THE UNOFFICIAL POST-MATCH HANGOUT</span>
        </div>
      </div>
    </section>
  );
}
