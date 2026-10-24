"use client";
import { useState } from "react";
import { whatsappHref } from "@/lib/constants";

export default function AcademyTrial() {
  const [age, setAge] = useState("");
  const [experience, setExperience] = useState("Just starting out");
  const message = `Hi Club 7, I'd like to enquire about cricket coaching for my child.\nAge: ${age.trim() || "I'd like to discuss"}\nExperience: ${experience}\nPlease share current coaching timings, batch options and joining details.`;
  return (
    <section id="academy-enquiry" className="academy-enquiry events-container">
      <div><p className="events-eyebrow">For the next little cricketer</p><h2>The next innings<br />starts with a hello.</h2><p className="events-muted">Tell us a little about your child. Speak with the Club 7 team about current coaching timings, available batches and how to get started.</p><p className="academy-contact-note">Cricket coaching · Club 7 · Sector 89, Faridabad</p></div>
      <form onSubmit={e => { e.preventDefault(); window.open(whatsappHref(message), "_blank", "noopener,noreferrer"); }}>
        <label htmlFor="academy-age">Child’s age <span>(optional)</span></label><input id="academy-age" type="number" min="1" max="21" inputMode="numeric" placeholder="e.g. 10" value={age} onChange={e => setAge(e.target.value)} />
        <label htmlFor="academy-experience">Cricket experience</label><select id="academy-experience" value={experience} onChange={e => setExperience(e.target.value)}><option>Just starting out</option><option>Plays for fun</option><option>Has had coaching before</option><option>Would like to discuss</option></select>
        <button type="submit" className="events-button">Chat about coaching <span aria-hidden="true">↗</span></button><p className="events-muted">Opens a draft in WhatsApp. Review it, then send it to our team.</p>
      </form>
    </section>
  );
}
