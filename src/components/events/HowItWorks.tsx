type Step = { number: string; title: string; text: string };

type HowItWorksProps = {
  eyebrow: string;
  heading: string;
  steps: Step[];
};

/** A compact numbered strip — no photo, no cards — for pages that
 * need to explain a short process without adding real weight to the
 * page. Reuses the same numbered-list language as the ground/events
 * sections elsewhere on the site. */
export default function HowItWorks({ eyebrow, heading, steps }: HowItWorksProps) {
  return (
    <section className="relative bg-c7-bg-1">
      <div className="mx-auto w-full max-w-[1600px] px-edge py-14 md:py-16">
        <div className="border-t border-c7-line/15 pt-10">
          <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-red">{eyebrow}</p>
          <h2 className="-ml-1 mt-3 font-display uppercase leading-[0.94] text-c7-ink text-[clamp(2rem,3.2vw,3rem)]">{heading}</h2>

          <ol className="mt-8 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-3">
            {steps.map((step) => (
              <li key={step.number} className="flex gap-4 border-t border-c7-line/15 pt-5">
                <span className="font-body text-body-sm text-c7-red">{step.number}</span>
                <div>
                  <h3 className="font-body text-body font-medium text-c7-ink">{step.title}</h3>
                  <p className="mt-1.5 font-body text-body-sm leading-relaxed text-c7-ink-dim">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
