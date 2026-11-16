"use client";
import WhatsAppDraft from "@/components/site/WhatsAppDraft";
import { useState } from "react";
import { whatsappHref } from "@/lib/constants";

export default function AcademyTrial() {
  const [draft, setDraft] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [experience, setExperience] = useState("Just starting out");
  const message = `Hi Club 7, I'd like to enquire about cricket coaching for my child.\nParent / contact: ${name.trim()}\nPhone: ${phone.trim()}\nAge: ${age.trim() || "I'd like to discuss"}\nExperience: ${experience}\nPlease share current coaching timings, batch options and joining details.`;
  return (
    <section id="academy-enquiry" className="academy-enquiry events-container">
      <div><p className="events-eyebrow">For the next little cricketer</p><h2>The next innings<br />starts with a hello.</h2><p className="events-muted">Tell us a little about your child. Speak with the Club 7 team about current coaching timings, available batches and how to get started.</p><p className="academy-contact-note">Cricket coaching · Club 7 · Sector 89, Faridabad</p></div>
      {draft ? <WhatsAppDraft href={draft} onEdit={() => setDraft("")} /> : <form onSubmit={e => { e.preventDefault(); const href = whatsappHref(message); window.open(href, "_blank", "noopener,noreferrer"); setDraft(href); }}>
        <label htmlFor="academy-name">Parent / contact name</label><input id="academy-name" autoComplete="name" required maxLength={100} pattern={String.raw`.*\S.*`} value={name} onChange={e => setName(e.target.value)} />
        <label htmlFor="academy-phone">Phone number</label><input id="academy-phone" type="tel" autoComplete="tel" inputMode="tel" required pattern="[+]?[0-9 ]{8,20}" value={phone} onChange={e => setPhone(e.target.value)} />
        <label htmlFor="academy-age">Child’s age <span>(optional)</span></label><input id="academy-age" type="number" min="1" max="21" inputMode="numeric" placeholder="e.g. 10" value={age} onChange={e => setAge(e.target.value)} />
        <label htmlFor="academy-experience">Cricket experience</label><select id="academy-experience" value={experience} onChange={e => setExperience(e.target.value)}><option>Just starting out</option><option>Plays for fun</option><option>Has had coaching before</option><option>Would like to discuss</option></select>
        <button type="submit" className="events-button">Chat about coaching <span aria-hidden="true">↗</span></button><p className="events-muted">Opens a draft in WhatsApp. Review it, then send it to our team.</p>
      </form>}
    </section>
  );
}
