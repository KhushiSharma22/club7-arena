"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent, InputHTMLAttributes } from "react";
import { useRevealOnView } from "@/lib/useRevealOnView";
import { WHATSAPP_HREF, whatsappHref } from "@/lib/constants";
import { TOURNAMENT_SPORTS, TOURNAMENT_TIMING, type TournamentSport } from "@/lib/events-data";

type Errors = Partial<Record<"team" | "captain" | "phone" | "sport" | "squad", string>>;

function Field({
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
 * A team-registration form, not a generic enquiry — the field set
 * (team name, captain, squad size, sport, timing) is what a team
 * actually needs to supply before Club 7 can slot them into a
 * tournament, informed by how other Faridabad venues structure their
 * own tournament sign-ups. Same WhatsApp hand-off as the rest of the
 * site: no live tournament calendar or entry fee exists to quote here
 * honestly, so this registers interest and Club 7 follows up with
 * dates and pricing once a fixture is set.
 */
export default function TournamentForm() {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.15);

  const [team, setTeam] = useState("");
  const [captain, setCaptain] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [sport, setSport] = useState<TournamentSport | "">("");
  const [squad, setSquad] = useState("");
  const [timing, setTiming] = useState<(typeof TOURNAMENT_TIMING)[number] | "">("");
  const [players, setPlayers] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): Errors {
    const next: Errors = {};
    if (!team.trim()) next.team = "Give your team a name.";
    if (!captain.trim()) next.captain = "Who's the captain / contact?";
    if (!phone.replace(/[^0-9]/g, "") || phone.replace(/[^0-9]/g, "").length < 8) {
      next.phone = "Add a valid phone number.";
    }
    if (!sport) next.sport = "Choose a sport.";
    if (!squad.trim()) next.squad = "How many players in your squad?";
    return next;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const lines = [
      `Hi Club 7, I'd like to register a team for your next tournament.`,
      `Team name: ${team.trim()}`,
      `Captain / contact: ${captain.trim()}`,
      `Phone: ${phone.trim()}`,
      email.trim() ? `Email: ${email.trim()}` : null,
      `Sport: ${sport}`,
      `Squad size: ${squad.trim()} players`,
      timing ? `Timing: ${timing}` : null,
      players.trim() ? `Player names: ${players.trim()}` : null,
    ].filter(Boolean);

    window.open(whatsappHref(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  return (
    <section
      id="register"
      ref={ref}
      className="events-planner relative mx-auto w-full max-w-[1600px] scroll-mt-[calc(var(--header-height,90px)+24px)] bg-c7-bg-1 px-edge pb-20 pt-16 md:pb-24 md:pt-20"
    >
      <div className="border-t border-c7-line/15" />

      <div
        className="mt-12 max-w-xl transition-[opacity,transform] duration-700 ease-out md:mt-14"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)" }}
      >
        <p className="font-body text-tag tracking-[0.24em] uppercase text-c7-red">Register your team</p>
        <h2 className="-ml-1 mt-3 font-display uppercase leading-[0.94] text-c7-ink text-[clamp(2.5rem,4vw,4.25rem)]">
          Get on the list.
        </h2>
        <p className="mt-4 font-body text-body-lg text-c7-ink-dim">
          No live fixture is running right now — this registers your team&apos;s interest. Club 7 confirms the sport, dates and entry details with your captain directly once the next tournament is set.
        </p>
      </div>

      <div
        className="mt-12 max-w-xl transition-[opacity,transform] duration-700 ease-out md:mt-14"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transitionDelay: visible ? "140ms" : "0ms" }}
      >
        {submitted ? (
          <div aria-live="polite">
            <p className="font-display uppercase leading-[0.98] text-c7-ink text-[clamp(2rem,3.2vw,2.75rem)]">
              Team Listed ↗
            </p>
            <p className="mt-4 font-body text-body-lg text-c7-ink/85">
              We&apos;ve opened WhatsApp with your team&apos;s details, ready for you to send — nothing has been sent until you do.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="events-plan-form flex flex-col gap-y-9">
            <div className="grid grid-cols-1 gap-x-8 gap-y-9 sm:grid-cols-2">
              <Field id="team-name" label="Team Name" type="text" value={team} onChange={(e: ChangeEvent<HTMLInputElement>) => setTeam(e.target.value)} error={errors.team} />
              <Field id="team-captain" label="Captain / Contact Name" type="text" value={captain} onChange={(e: ChangeEvent<HTMLInputElement>) => setCaptain(e.target.value)} error={errors.captain} />
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-9 sm:grid-cols-2">
              <Field
                id="team-phone"
                label="Phone / WhatsApp"
                type="tel"
                inputMode="tel"
                placeholder="+91 ..."
                value={phone}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                error={errors.phone}
              />
              <Field
                id="team-email"
                label="Email (Optional)"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              />
            </div>

            <fieldset>
              <legend className="font-body text-tag tracking-[0.2em] uppercase text-c7-ink-dim">Sport</legend>
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-4">
                {TOURNAMENT_SPORTS.map((opt) => {
                  const active = sport === opt;
                  return (
                    <label key={opt} className="flex cursor-pointer items-center gap-2.5">
                      <input type="radio" name="sport" value={opt} checked={active} onChange={() => setSport(opt)} className="peer sr-only" />
                      <span
                        aria-hidden="true"
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-c7-red ${
                          active ? "border-c7-red" : "border-c7-line/40"
                        }`}
                      >
                        <span className={`h-2 w-2 rounded-full bg-c7-red transition-transform duration-150 ${active ? "scale-100" : "scale-0"}`} />
                      </span>
                      <span className={`font-body text-body font-medium uppercase tracking-[0.03em] ${active ? "text-c7-ink" : "text-c7-ink-dim"}`}>{opt}</span>
                    </label>
                  );
                })}
              </div>
              {errors.sport ? (
                <p role="alert" className="mt-2 font-body text-body-sm text-c7-red">
                  {errors.sport}
                </p>
              ) : null}
            </fieldset>

            <div className="grid grid-cols-1 gap-x-8 gap-y-9 sm:grid-cols-2">
              <Field
                id="team-squad"
                label="Squad Size"
                type="text"
                inputMode="numeric"
                placeholder="e.g. 8 players"
                value={squad}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSquad(e.target.value)}
                error={errors.squad}
              />
              <div>
                <label htmlFor="team-timing" className="font-body text-tag tracking-[0.2em] uppercase text-c7-ink-dim">
                  When Works For You?
                </label>
                <select
                  id="team-timing"
                  value={timing}
                  onChange={(e) => setTiming(e.target.value as (typeof TOURNAMENT_TIMING)[number])}
                  className="mt-3 w-full border-b border-c7-line/25 bg-transparent pb-2.5 font-body text-body text-c7-ink outline-none transition-colors focus:border-c7-red [color-scheme:dark]"
                >
                  <option value="" disabled>
                    Choose one
                  </option>
                  {TOURNAMENT_TIMING.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="team-players" className="font-body text-tag tracking-[0.2em] uppercase text-c7-ink-dim">
                Player Names (Optional)
              </label>
              <textarea
                id="team-players"
                rows={3}
                placeholder="List your squad, one per line — or add these later."
                value={players}
                onChange={(e) => setPlayers(e.target.value)}
                className="mt-3 max-h-32 w-full resize-none border-b border-c7-line/25 bg-transparent pb-2.5 font-body text-body text-c7-ink outline-none transition-colors placeholder:text-c7-ink-dim/50 focus:border-c7-red"
              />
            </div>

            <div className="mt-2 flex flex-col items-start gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-c7-red px-7 py-4 font-body text-body font-medium uppercase tracking-[0.08em] text-c7-ink transition-colors hover:bg-c7-red-dim focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-c7-red"
              >
                Register on WhatsApp
                <span aria-hidden="true">↗</span>
              </button>
              <p className="font-body text-body-sm text-c7-ink-dim">Review your team&apos;s details in WhatsApp, then send it to our team.</p>
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
