"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent, InputHTMLAttributes } from "react";
import { useRevealOnView } from "@/lib/useRevealOnView";
import { WHATSAPP_HREF, whatsappHref } from "@/lib/constants";
import { getTodayInKolkata, toISODate } from "@/lib/date-utils";
import EventProgramme from "./EventProgramme";

export type Occasion = "team-outing" | "birthday" | "private-group" | "";

const OCCASIONS: { value: Occasion; label: string }[] = [
  { value: "team-outing", label: "Team Day" },
  { value: "birthday", label: "Birthday" },
  { value: "private-group", label: "Private Group" },
];

const OCCASION_MESSAGE_LABEL: Record<Occasion, string> = {
  "team-outing": "Team Day",
  birthday: "Birthday",
  "private-group": "Private Group",
  "": "an event",
};

type Errors = Partial<Record<"occasion" | "name" | "phone" | "headcount", string>>;

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

/**
 * The working WhatsApp handoff from the previous version is unchanged
 * — no backend exists in the project, so submitting composes a message
 * and opens it in WhatsApp, exactly as every other enquiry on the site
 * does. What changed is the field set (simplified back to the six the
 * brief actually lists) and the visual design.
 */
export default function EventPlanner() {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.15);
  const today = getTodayInKolkata();

  const [occasion, setOccasion] = useState<Occasion>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [headcount, setHeadcount] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  // See prior implementation notes: an effect, not a lazy useState
  // initializer — reading window.location can only happen client-
  // side, and doing it in the initializer would render different
  // output on the server than the client, a real hydration mismatch.
  useEffect(() => {
    const plan = new URLSearchParams(window.location.search).get("plan");
    if (plan === "team-outing" || plan === "birthday" || plan === "private-group") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- window.location is only available client-side, after mount.
      setOccasion(plan);
    }
  }, []);

  function validate(): Errors {
    const next: Errors = {};
    if (!occasion) next.occasion = "Choose what you're planning.";
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
      `Hi Club 7, I'd like to plan a ${OCCASION_MESSAGE_LABEL[occasion]}.`,
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
    <section id="plan" ref={ref} className="events-planner relative mx-auto w-full max-w-[1600px] scroll-mt-[calc(var(--header-height,90px)+24px)] bg-c7-bg-1 px-edge pb-20 pt-16 md:pb-24 md:pt-20">
      <div className="border-t border-c7-line/15" />

      <div
        className="mt-12 max-w-xl transition-[opacity,transform] duration-700 ease-out md:mt-14"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)" }}
      >
        <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-red">Let’s make it happen</p>
        <h2 className="-ml-1 mt-3 font-display uppercase leading-[0.94] text-c7-ink text-[clamp(2.5rem,4vw,4.25rem)]">
          Your event starts here.
        </h2>
        <p className="mt-4 font-body text-body-lg text-c7-ink-dim">Share a few details. We’ll help you put the day together.</p>
      </div>

      <div
        className="mt-12 transition-[opacity,transform] duration-700 ease-out md:mt-14"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transitionDelay: visible ? "140ms" : "0ms" }}
      >
        {submitted ? (
          <div aria-live="polite" className="max-w-md">
            <p className="font-display uppercase leading-[0.98] text-c7-ink text-[clamp(2rem,3.2vw,2.75rem)]">
              Plan Ready ↗
            </p>
            <p className="mt-4 font-body text-body-lg text-c7-ink/85">
              We&apos;ve opened WhatsApp with your plan, ready for you to send — nothing has been sent until you do.
            </p>
          </div>
        ) : (
          <div className="grid gap-12 md:grid-cols-12 md:gap-10">
            <form onSubmit={handleSubmit} noValidate className="events-plan-form flex flex-col gap-y-9 md:col-span-7">
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

              <fieldset>
                <legend className="font-body text-tag tracking-[0.2em] uppercase text-c7-ink-dim">What Are You Planning?</legend>
                <div className="mt-4 flex flex-wrap gap-x-8 gap-y-4">
                  {OCCASIONS.map((opt) => {
                    const active = occasion === opt.value;
                    return (
                      <label key={opt.value} className="flex cursor-pointer items-center gap-2.5">
                        <input
                          type="radio"
                          name="occasion"
                          value={opt.value}
                          checked={active}
                          onChange={() => setOccasion(opt.value)}
                          className="peer sr-only"
                        />
                        <span
                          aria-hidden="true"
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-c7-red ${
                            active ? "border-c7-red" : "border-c7-line/40"
                          }`}
                        >
                          <span className={`h-2 w-2 rounded-full bg-c7-red transition-transform duration-150 ${active ? "scale-100" : "scale-0"}`} />
                        </span>
                        <span className={`font-body text-body font-medium uppercase tracking-[0.03em] ${active ? "text-c7-ink" : "text-c7-ink-dim"}`}>
                          {opt.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
                {errors.occasion ? (
                  <p role="alert" className="mt-2 font-body text-body-sm text-c7-red">
                    {errors.occasion}
                  </p>
                ) : null}
              </fieldset>

              <div className="grid grid-cols-1 gap-x-8 gap-y-9 sm:grid-cols-2">
                <FormRow
                  id="plan-headcount"
                  label="How Many People?"
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g. 20"
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

            <div className="md:col-span-5 md:sticky md:top-28 md:self-start">
              <EventProgramme occasion={occasion} headcount={headcount} date={date} notes={notes} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
