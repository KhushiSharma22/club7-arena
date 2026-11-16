"use client";

import { useEffect, useState, type FormEvent, type InputHTMLAttributes } from "react";
import { PLAY_SPORTS, type PlaySportId } from "@/lib/play-data";
import { addDays, fromISODate, fullDateLabel, getTodayInKolkata, shortDateLabel, shortDayLabel, toISODate } from "@/lib/date-utils";
import { manualBookingMessage, validateManualBooking, type ManualBooking, type ManualBookingErrors } from "@/lib/manual-booking";
import { whatsappHref } from "@/lib/constants";
import WhatsAppDraft from "@/components/site/WhatsAppDraft";

function Field({ label, error, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return <label>{label}<input {...props} aria-invalid={!!error} aria-describedby={error ? `${props.id}-error` : undefined} />{error && <span className="booking-field-error" id={`${props.id}-error`}>{error}</span>}</label>;
}
export default function WhatsAppBookingFlow({ activeId, onSelect }: { activeId: PlaySportId; onSelect: (id: PlaySportId) => void }) {
  const [today, setToday] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("60");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [people, setPeople] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<ManualBookingErrors>({});
  const [draft, setDraft] = useState("");
  const selectedDate = date || today;
  const sport = PLAY_SPORTS.find(s => s.id === activeId)!;
  useEffect(() => {
    const update = () => setToday(toISODate(getTodayInKolkata()));
    update(); const timer = setInterval(update, 30000); return () => clearInterval(timer);
  }, []);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data: ManualBooking = { sport: activeId, date: selectedDate, time, duration, name, phone, email, people, notes };
    const next = validateManualBooking(data);
    setErrors(next);
    if (Object.keys(next).length) {
      const form = e.currentTarget;
      requestAnimationFrame(() => form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    const href = whatsappHref(manualBookingMessage(data));
    window.open(href, "_blank", "noopener,noreferrer");
    setDraft(href);
  }
  return <main id="book-enquiry" className="booking-page">
    <header className="booking-heading"><p>CLUB 7 / BOOK A SLOT</p><h1>Make time for your game.</h1><span>Choose your preferred time and share your details on WhatsApp. Club 7 will confirm your slot directly.</span></header>
    <div className="booking-preview-note"><strong>Bookings confirmed by Club 7</strong><span>Times are preferences, not live availability. The team confirms the slot, price and payment on WhatsApp.</span></div>
    {draft ? <WhatsAppDraft href={draft} onEdit={() => setDraft("")} /> : <form className="booking-layout" onSubmit={submit} noValidate>
      <div className="booking-fields">
        <section className="booking-step" aria-labelledby="slot-title"><div className="booking-step-title"><span>01</span><div><h2 id="slot-title">Choose your preferred slot</h2><p>All times in IST · Subject to confirmation</p></div></div>
          <label className="booking-label" htmlFor="booking-sport">Sport</label><select id="booking-sport" value={activeId} onChange={e => onSelect(e.target.value as PlaySportId)}>{PLAY_SPORTS.map(s => <option key={s.id} value={s.id}>{s.shortName}</option>)}</select>
          <div className="booking-date-heading"><label className="booking-label" htmlFor="booking-date">Preferred date</label><input id="booking-date" type="date" min={today} value={selectedDate} onChange={e => setDate(e.target.value)} aria-invalid={!!errors.date} aria-describedby={errors.date ? "date-error" : undefined} /></div>
          {errors.date && <p id="date-error" className="booking-field-error">{errors.date}</p>}
          <div className="booking-days" role="group" aria-label="Choose date">{today && Array.from({length:5},(_,i)=>addDays(fromISODate(today),i)).map(day=><button type="button" key={toISODate(day)} aria-pressed={selectedDate===toISODate(day)} onClick={()=>setDate(toISODate(day))}><span>{shortDayLabel(day,fromISODate(today))}</span><strong>{shortDateLabel(day)}</strong></button>)}</div>
          <div className="booking-contact-grid booking-preferences"><Field id="booking-time" label="Preferred start time (IST)" type="time" required value={time} onChange={e=>setTime(e.target.value)} error={errors.time} /><label>Duration<select id="booking-duration" value={duration} onChange={e=>setDuration(e.target.value)}>{[60,90,120,180].map(n=><option key={n} value={n}>{n} minutes</option>)}</select></label></div>
        </section>
        <section className="booking-step" aria-labelledby="details-title"><div className="booking-step-title"><span>02</span><div><h2 id="details-title">Who’s playing?</h2><p>These details will be included in your WhatsApp message.</p></div></div>
          <div className="booking-contact-grid"><Field id="request-name" label="Full name" autoComplete="name" required maxLength={100} value={name} onChange={e=>setName(e.target.value)} error={errors.name} /><Field id="request-phone" label="Phone number" type="tel" inputMode="tel" autoComplete="tel" required maxLength={25} value={phone} onChange={e=>setPhone(e.target.value)} error={errors.phone} /><Field id="request-email" label="Email (optional)" type="email" autoComplete="email" maxLength={254} value={email} onChange={e=>setEmail(e.target.value)} error={errors.email} /><Field id="request-people" label="Number of people" type="number" min="1" max="100" inputMode="numeric" required value={people} onChange={e=>setPeople(e.target.value)} error={errors.people} /></div>
          <label className="booking-notes">Anything we should know? <span>(optional)</span><textarea id="request-notes" rows={3} maxLength={500} placeholder="Equipment questions, preferred turf or anything about your group." value={notes} onChange={e=>setNotes(e.target.value)} /></label>
        </section>
      </div>
      <aside className="booking-summary"><div className="booking-summary-heading"><span>YOUR REQUEST</span><span>CLUB<span className="booking-brand-seven">7</span></span></div><h2>{sport.shortName}</h2><p className="booking-venue">Sector 89, Faridabad</p><dl className="booking-slot-details"><div><dt>Preferred date</dt><dd>{selectedDate ? fullDateLabel(fromISODate(selectedDate)) : "Choose a date"}</dd></div><div><dt>Start time</dt><dd>{time ? `${time} IST` : "Choose a time"}</dd></div><div><dt>Duration</dt><dd>{duration} minutes</dd></div><div><dt>Group size</dt><dd>{people || "—"}</dd></div></dl><div className="booking-manual-price"><strong>Price confirmed by Club 7</strong><p>The team will check availability and share the total and payment details with you.</p></div><button className="booking-pay" type="submit">Request slot on WhatsApp <span aria-hidden="true">↗</span></button><p className="booking-payment-note">Review the prefilled message and tap Send.<br />No online payment is collected.</p><div className="booking-summary-foot">This enquiry does not hold a slot. Your booking is confirmed only by the Club 7 team.</div><a className="booking-call" href="tel:+919911046717">Need help? Call 9911046717</a></aside>
    </form>}
  </main>;
}
