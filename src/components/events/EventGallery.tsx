"use client";

import Image from "next/image";
import { useRevealOnView } from "@/lib/useRevealOnView";
import { BIRTHDAY_GALLERY } from "@/lib/events-data";

/**
 * A mosaic gallery, not a uniform grid of equal tiles — one feature
 * image plus five supporting ones. Every photo here is a placeholder
 * from the venue's existing library (see events-data.ts) until real
 * birthday photography exists; swapping a `src` there is the only
 * change needed once it does.
 */
export default function EventGallery() {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.1);

  return (
    <section id="gallery" className="relative bg-c7-bg-1">
      <div ref={ref} className="mx-auto w-full max-w-[1600px] px-edge py-14 md:py-16">
        <div
          className="flex flex-wrap items-end justify-between gap-6 border-t border-c7-line/15 pt-10 transition-[opacity,transform] duration-700 ease-out"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(14px)" }}
        >
          <div>
            <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-red">The Gallery</p>
            <h2 className="-ml-1 mt-3 font-display uppercase leading-[0.94] text-c7-ink text-[clamp(2.25rem,3.6vw,3.5rem)]">
              From Past Birthdays.
            </h2>
          </div>
          <p className="max-w-xs font-body text-body-sm text-c7-ink-dim">
            Representative photos of the ground for now — real birthday moments from Club 7 are coming soon.
          </p>
        </div>

        <div className="birthday-gallery mt-10 md:mt-12">
          {BIRTHDAY_GALLERY.map((img, i) => (
            <div key={img.src} className={`birthday-gallery-tile relative overflow-hidden bg-c7-bg-3 ${i === 0 ? "birthday-gallery-feature" : ""}`}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes={i === 0 ? "(min-width: 768px) 44vw, 100vw" : "(min-width: 768px) 22vw, 50vw"}
                quality={88}
                className="object-cover transition-transform duration-500 ease-out hover:scale-[1.04]"
                style={{ objectPosition: img.position, filter: "saturate(0.88) contrast(1.05) brightness(0.92)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
