"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent, InputHTMLAttributes } from "react";
import { useRevealOnView } from "@/lib/useRevealOnView";
import { WHATSAPP_HREF, whatsappHref } from "@/lib/constants";
import { getTodayInKolkata, toISODate } from "@/lib/date-utils";

type Errors = Partial<Record<"name" | "phone" | "headcount", string>>;

function FormRow({
  id,
  label,
  error,
  className = "",
  ...rest
}: { id: string; label: string; error?: string; className?: string } & InputHTMLAttributes<HTMLInputElement>) {
  const errorId = `${id}-error`;
  return (
    <div className={className}>
      <label htmlFor={id} className="font-body text-tag tracking-[0.2em] uppercase text-c7-ink-dim">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className="mt-3 w-full border-b border-c7-line/25 bg-transparent pb-2.5 font-body text-body text-c7-ink outline-none transition-colors placeholder:text-c7-ink-dim/50 focus:border-c7-red"
        {...rest}
      />
      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 font-body text-body-sm text-c7-red">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type EnquiryFormProps = {
  /** What this page is for — used in the opened message and heading. */
  occasion: string;
  eyebrow?: string;
  heading?: string;
  sub?: string;
  headcountLabel?: string;
  headcountPlaceholder?: string;
};

/**
 * The single-purpose sibling of the old multi-occasion planner: the
 * page itself already says what's being planned, so there's no
 * occasion picker here — one occasion, one compact form. Same
 * WhatsApp hand-off as everywhere else on the site (no backend for
 * events exists), just a shorter path to it.
 */
export default function EnquiryForm({
  occasion,
  eyebrow = "Let's make it happen",
  heading = "Your event starts here.",
  sub = "Share a few details. We'll help you put the day together.",
  headcountLabel = "How Many People?",
  headcountPlaceholder = "e.g. 20",
}: EnquiryFormProps) {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.15);
  const today = getTodayInKolkata();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [headcount, setHeadcount] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): Errors {
    const next: Errors = {};
    if (!name.trim()) next.name = "Enter your name.";
    if (!phone.replace(/[^0-9]/g, "") || phone.replace(/[^0-9]/g, "").length < 8) {
      next.phone = "Add a valid phone number.";
    }
    if (!headcount.trim()) next.headcount = "Let us know how many people.";
    return next;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const lines = [
      `Hi Club 7, I'd like to plan a ${occasion}.`,
      `Group size: around ${headcount.trim()} people`,
      `Preferred date: ${date ? date : "Still deciding"}`,
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      notes.trim() ? `Notes: ${notes.trim()}` : null,
    ].filter(Boolean);

    window.open(whatsappHref(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  return (
    <section
      id="plan"
      ref={ref}
      className="events-planner relative mx-auto w-full max-w-[1600px] scroll-mt-[calc(var(--header-height,90px)+24px)] bg-c7-bg-1 px-edge pb-20 pt-16 md:pb-24 md:pt-20"
    >
      <div className="border-t border-c7-line/15" />

      <div
        className="mt-12 max-w-xl transition-[opacity,transform] duration-700 ease-out md:mt-14"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)" }}
      >
        <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-red">{eyebrow}</p>
        <h2 className="-ml-1 mt-3 font-display uppercase leading-[0.94] text-c7-ink text-[clamp(2.5rem,4vw,4.25rem)]">
          {heading}
        </h2>
        <p className="mt-4 font-body text-body-lg text-c7-ink-dim">{sub}</p>
      </div>

      <div
        className="mt-12 max-w-xl transition-[opacity,transform] duration-700 ease-out md:mt-14"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transitionDelay: visible ? "140ms" : "0ms" }}
      >
        {submitted ? (
          <div aria-live="polite">
            <p className="font-display uppercase leading-[0.98] text-c7-ink text-[clamp(2rem,3.2vw,2.75rem)]">
              Plan Ready ↗
            </p>
            <p className="mt-4 font-body text-body-lg text-c7-ink/85">
              We&apos;ve opened WhatsApp with your plan, ready for you to send — nothing has been sent until you do.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="events-plan-form flex flex-col gap-y-9">
            <div className="grid grid-cols-1 gap-x-8 gap-y-9 sm:grid-cols-2">
              <FormRow id="plan-name" label="Name" type="text" value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} error={errors.name} />
              <FormRow
                id="plan-phone"
                label="Phone / WhatsApp"
                type="tel"
                inputMode="tel"
                placeholder="+91 ..."
                value={phone}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                error={errors.phone}
              />
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-9 sm:grid-cols-2">
              <FormRow
                id="plan-headcount"
                label={headcountLabel}
                type="text"
                inputMode="numeric"
                placeholder={headcountPlaceholder}
                value={headcount}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setHeadcount(e.target.value)}
                error={errors.headcount}
              />
              <FormRow
                id="plan-date"
                label="Preferred Date"
                type="date"
                min={toISODate(today)}
                value={date}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
                className="[color-scheme:dark]"
              />
            </div>

            <div>
              <label htmlFor="plan-notes" className="font-body text-tag tracking-[0.2em] uppercase text-c7-ink-dim">
                Anything We Should Know? (Optional)
              </label>
              <textarea
                id="plan-notes"
                rows={3}
                placeholder="Food, timing, anything else to mention."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-3 max-h-32 w-full resize-none border-b border-c7-line/25 bg-transparent pb-2.5 font-body text-body text-c7-ink outline-none transition-colors placeholder:text-c7-ink-dim/50 focus:border-c7-red"
              />
            </div>

            <div className="mt-2 flex flex-col items-start gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-c7-red px-7 py-4 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:bg-c7-red-dim focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
              >
                Continue on WhatsApp
                <span aria-hidden="true">↗</span>
              </button>
              <p className="font-body text-body-sm text-c7-ink-dim">Review your enquiry in WhatsApp, then send it to our team.</p>
            </div>

            <div className="border-t border-c7-line/15 pt-6">
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-body text-body-sm font-medium uppercase tracking-[0.08em] text-c7-ink-dim transition-colors hover:text-c7-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
              >
                Prefer WhatsApp? Message Club 7
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-[3px]">
                  ↗
                </span>
              </a>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
