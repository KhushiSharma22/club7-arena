"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { PLAY_SPORTS, type PlaySportId } from "@/lib/play-data";
import { addDays, fromISODate, fullDateLabel, getTodayInKolkata, shortDateLabel, shortDayLabel, toISODate } from "@/lib/date-utils";
import { rupees, slotDate, slotTime, type Slot } from "@/lib/booking-types";

type Receipt = { id: string; totalPaise: number; status: string; slot: Slot };
export default function BookingFlow({ activeId, onSelect }: { activeId: PlaySportId; onSelect: (id: PlaySportId) => void }) {
  const [today, setToday] = useState("");
  const [date, setDate] = useState("");
  const [selection, setSelection] = useState<Slot | null>(null);
  const [inventory, setInventory] = useState<{ key: string; slots: Slot[] }>({key: "", slots: []});
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [refresh, setRefresh] = useState(0);
  const [retry, setRetry] = useState<{ payload: Record<string, unknown>; slot: Slot } | null>(null);
  const posting = useRef(false);
  const selectedDate = date || today;
  const key = `${activeId}:${selectedDate}`;
  const loading = inventory.key !== key;
  const slots = loading ? [] : inventory.slots;
  const selected = slots.find(s => s.id === selection?.id && s.version === selection.version) || null;
  const sport = PLAY_SPORTS.find(s => s.id === activeId)!;

  useEffect(() => {
    const tick = () => setToday(toISODate(getTodayInKolkata()));
    tick(); const timer = setInterval(tick, 30000); return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    if (!selectedDate) return;
    const controller = new AbortController();
    let fetching = false;
    async function load() {
      if (fetching) return;
      fetching = true;
      try {
        const response = await fetch(`/api/slots?sport=${activeId}&date=${selectedDate}`, {cache:"no-store", signal: controller.signal});
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Could not load slots.");
        if (!controller.signal.aborted) { setInventory({key, slots:data.slots}); setError(""); }
      } catch (e) { if (!controller.signal.aborted) setError(e instanceof Error ? e.message : "Could not load slots."); }
      finally { fetching = false; }
    }
    void load(); const timer = setInterval(load, 15000);
    const focus = () => { void load(); }; window.addEventListener("focus", focus);
    return () => { controller.abort(); clearInterval(timer); window.removeEventListener("focus", focus); };
  }, [activeId, selectedDate, key, refresh]);

  async function sendRequest(payload: Record<string, unknown>, slot: Slot) {
    if (posting.current) return;
    posting.current = true; setBusy(true); setNotice("");
    try {
      const response = await fetch("/api/bookings", {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(payload)});
      const data = await response.json();
      if (!response.ok) { setRetry(null); setRefresh(v => v + 1); throw new Error(data.error || "Could not send your request."); }
      setRetry(null); setReceipt({...data, slot}); setSelection(null); setRefresh(v => v + 1);
    } catch (e) { setNotice(e instanceof Error ? e.message : "Connection interrupted. Retry to check whether your request was saved."); }
    finally { posting.current = false; setBusy(false); }
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected || error) return;
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const payload = {...values, people:Number(values.people), slotId:selected.id, expectedVersion:selected.version, expectedPricePaise:selected.pricePaise, requestKey:crypto.randomUUID()};
    setRetry({payload, slot:selected});
    await sendRequest(payload, selected);
  }
  function chooseDate(next: string) { setDate(next); setSelection(null); setNotice(""); }
  return (
    <main className="booking-page" id="book-enquiry">
      <header className="booking-heading"><p>CLUB 7 / BOOK A SLOT</p><h1>Make time for your game.</h1><span>Choose a slot. Send your details. Our team will review your request.</span></header>
      <div className="booking-preview-note"><strong>Venue-managed slots</strong><span>Prices are set by Club 7. Requests require staff approval. No online payment is collected.</span></div>
      {receipt ? <section className="booking-receipt" role="status"><p className="booking-receipt-label">REQUEST RECEIVED / AWAITING APPROVAL</p><h2>You&apos;re on the team&apos;s list.</h2><p>Your slot is held while Club 7 reviews your request. This is not yet a confirmed booking.</p><dl><div><dt>Reference</dt><dd>{receipt.id}</dd></div><div><dt>Game</dt><dd>{PLAY_SPORTS.find(s => s.id === receipt.slot.sport)?.shortName} · {receipt.slot.resource}</dd></div><div><dt>When</dt><dd>{slotDate(receipt.slot.startsAt)}<br />{slotTime(receipt.slot.startsAt)} – {slotTime(receipt.slot.endsAt)}</dd></div><div><dt>Amount due after approval</dt><dd>{rupees(receipt.totalPaise)}</dd></div></dl><p>Keep this reference. Payment remains pending; no money has been charged. The team has your contact details for follow-up.</p><button type="button" onClick={() => {setReceipt(null); setNotice("");}}>Choose another slot ↗</button></section> :
      <form className="booking-layout" onSubmit={submit}>
        <div className="booking-fields">
          <section className="booking-step" aria-labelledby="slot-title">
            <div className="booking-step-title"><span>01</span><div><h2 id="slot-title">Choose your slot</h2><p>Live inventory · All times in IST</p></div></div>
            <label className="booking-label" htmlFor="booking-sport">Sport</label><select id="booking-sport" disabled={busy} value={activeId} onChange={e => {setSelection(null); onSelect(e.target.value as PlaySportId);}}>{PLAY_SPORTS.map(s => <option key={s.id} value={s.id}>{s.shortName}</option>)}</select>
            <div className="booking-date-heading"><label className="booking-label" htmlFor="booking-date">Date</label><input id="booking-date" type="date" required disabled={busy} min={today} value={selectedDate} onChange={e => chooseDate(e.target.value)} /></div>
            <div className="booking-days" role="group" aria-label="Choose date">{today && Array.from({length:5}, (_, i) => addDays(fromISODate(today), i)).map(day => <button type="button" disabled={busy} key={toISODate(day)} aria-pressed={selectedDate === toISODate(day)} onClick={() => chooseDate(toISODate(day))}><span>{shortDayLabel(day, fromISODate(today))}</span><strong>{shortDateLabel(day)}</strong></button>)}</div>
            <div className="booking-time-heading"><h3 id="time-label">Available slots</h3><span>Full slot price · INR</span></div>
            {error ? <div className="booking-empty" role="alert"><p>{error}</p><button type="button" onClick={() => setRefresh(v => v + 1)}>Retry loading slots ↗</button></div> : loading ? <p className="booking-empty" role="status">Checking the schedule…</p> : slots.length === 0 ? <div className="booking-empty"><h3>No open slots for this day.</h3><p>Try another date or sport. New times appear here as the team publishes them.</p></div> : <div className="booking-times booking-live-times" role="group" aria-labelledby="time-label">{slots.map(slot => <button type="button" disabled={busy} key={slot.id} aria-pressed={selected?.id === slot.id} onClick={() => {setSelection(slot); setNotice("");}}><strong>{slotTime(slot.startsAt)}</strong><span>to {slotTime(slot.endsAt)} · {(slot.endsAt-slot.startsAt)/60000} min</span><span>{slot.resource}</span><b>{rupees(slot.pricePaise)}</b></button>)}</div>}
            {selection && !selected && !loading && !error && <p className="booking-slot-warning" role="alert">Your selected slot changed or is no longer available. Please select an available slot.</p>}
          </section>
          <section className="booking-step" aria-labelledby="details-title"><div className="booking-step-title"><span>02</span><div><h2 id="details-title">Who&apos;s playing?</h2><p>We&apos;ll use these details to follow up on your request.</p></div></div><div className="booking-contact-grid"><label>Full name<input name="name" autoComplete="name" required maxLength={100} pattern=".*\S.*" placeholder="Your full name" /></label><label>Phone number<input name="phone" type="tel" autoComplete="tel" required pattern="[+]?[0-9 ]{8,20}" placeholder="+91 98765 43210" /></label><label>Email address<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" /></label><label>Number of people<input name="people" type="number" min="1" max={selected?.maxPeople || 100} step="1" required placeholder={selected ? `Up to ${selected.maxPeople}` : "Group size"} /></label></div><label className="booking-notes">Anything we should know? <span>(optional)</span><textarea name="notes" rows={2} maxLength={500} placeholder="Equipment questions or anything about your group." /></label></section>
        </div>
        <aside className="booking-summary"><div className="booking-summary-heading"><span>YOUR REQUEST</span><span>CLUB<span className="booking-brand-seven">7</span></span></div><h2>{sport.shortName}</h2><p className="booking-venue">Sector 89, Faridabad</p><dl className="booking-slot-details"><div><dt>Date</dt><dd>{selectedDate ? fullDateLabel(fromISODate(selectedDate)) : "Choose a date"}</dd></div><div><dt>Time</dt><dd>{selected ? `${slotTime(selected.startsAt)} – ${slotTime(selected.endsAt)}` : "Choose a slot"}</dd></div><div><dt>Court / turf</dt><dd>{selected?.resource || "—"}</dd></div><div><dt>Duration</dt><dd>{selected ? `${(selected.endsAt-selected.startsAt)/60000} minutes` : "—"}</dd></div></dl><div className="booking-price-heading"><h3>Price breakdown</h3><span>Venue rate</span></div><dl className="booking-prices"><div><dt>Full slot price</dt><dd>{selected ? rupees(selected.pricePaise) : "—"}</dd></div><div><dt>Added online fees</dt><dd>₹0</dd></div></dl><div className="booking-total" aria-live="polite"><div><span>Total</span><small>Payment after staff approval</small></div><strong>{selected ? rupees(selected.pricePaise) : "—"}</strong></div><button className="booking-pay" type="submit" disabled={!selected || busy || !!error || !!retry}>{busy ? "Sending request…" : "Request this slot"}<span aria-hidden="true">↗</span></button><p className="booking-payment-note">No payment is collected now.<br />Your booking requires Club 7&apos;s approval.</p>{notice && <p className="booking-payment-message" role="alert">{notice}</p>}{retry && !busy && <button className="booking-pay" type="button" onClick={() => {if(retry) void sendRequest(retry.payload, retry.slot);}}>Retry this request</button>}<div className="booking-summary-foot">The slot is held while your request is reviewed. Prices and availability are checked again when you submit.</div></aside>
      </form>}
    </main>
  );
}
