"use client";

import { useRevealOnView } from "@/lib/useRevealOnView";
import { WHATSAPP_MESSAGES, whatsappHref } from "@/lib/constants";

export default function AcademyTrial() {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.2);

  return (
    <section className="relative bg-c7-bg-1">
      <div ref={ref} className="mx-auto w-full max-w-[1600px] px-edge py-14 md:py-16">
        <div
          className="flex flex-col gap-10 border-t border-c7-line/15 pt-10 transition-[opacity,transform] duration-700 ease-out md:flex-row md:items-end md:justify-between"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(14px)" }}
        >
          <div>
            <p className="font-body text-tag uppercase tracking-[0.24em] text-c7-red">03 / Join In</p>
            <h2 className="-ml-1 mt-3 font-display uppercase leading-[0.94] text-c7-ink text-[clamp(2.25rem,3.6vw,3.5rem)]">
              Ready To Start?
            </h2>
            <p className="mt-2 font-body text-body text-c7-ink-dim">One message. We&apos;ll set up your trial.</p>
            <a
              href={whatsappHref(WHATSAPP_MESSAGES.academy)}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 inline-flex items-center gap-2 border-b border-c7-line/40 pb-1 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:border-c7-red hover:text-c7-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
            >
              Enquire About a Trial
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-[3px]">
                ↗
              </span>
            </a>
          </div>

          <div className="font-body text-body-sm uppercase tracking-[0.1em] text-c7-ink-dim md:text-right">
            <p>Cricket Academy / Trial First</p>
            <p className="mt-1 text-c7-ink-dim/60">Sector 89, Faridabad</p>
          </div>
        </div>
      </div>

      <div className="border-t border-c7-line/[0.07] px-edge py-3.5 md:py-2.5">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-10 sm:gap-y-1">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-body text-[0.6875rem] uppercase tracking-[0.18em] text-c7-ink-dim/70">
            <span>Club 7</span>
            <span className="text-c7-ink-dim/30">/</span>
            <span>Sector 89 / Faridabad</span>
          </div>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-fit font-body text-[0.6875rem] uppercase tracking-[0.18em] text-c7-ink-dim/70 transition-colors hover:text-c7-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-c7-red"
          >
            Back to top <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </section>
  );
}
