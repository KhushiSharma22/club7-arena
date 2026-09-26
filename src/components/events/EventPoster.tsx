"use client";

import Image from "next/image";
import { useState } from "react";

const crews = [
  { id: "team-days", plan: "team-outing", title: "The office escape", type: "Team days", note: "Set your status to: on the turf.", description: "Less small talk. More friendly rivalry. Get your colleagues out for a game and let the post-match stories take over.", image: "/stock/last-goal-night.jpg", alt: "A football match at night — representative photo", caption: "Team bonding, minus the trust falls.", cta: "Take the team out" },
  { id: "birthdays", plan: "birthday", title: "The birthday plot", type: "Birthdays", note: "Another year. A better plan.", description: "Your favourite people, a little competition, then cake. Give the group something better than another dinner reservation.", image: "/venue/pickleball.jpg", alt: "The pickleball courts at Club 7 Arena", caption: "Cake can wait. Match point first.", cta: "Make it a birthday" },
  { id: "private-groups", plan: "private-group", title: "The group chat IRL", type: "Private groups", note: "“We should meet soon.” Make it real.", description: "For the reunion, the weekend crew and the plan that finally leaves the chat. No big occasion needed. Just show up together.", image: "/stock/warmup-turf.jpg", alt: "Players together on a floodlit pitch — representative photo", caption: "Less typing. More showing up.", cta: "Get the gang together" },
];

export default function EventPosters() {
  const [selected, setSelected] = useState(0);
  const crew = crews[selected];

  return (
    <section id="event-posters" className="crew-section" aria-labelledby="crew-heading">
      <div className="events-container">
        <div className="crew-topline"><span>Club 7 / The social side</span><span>Good plans start here ↙</span></div>
        <div className="crew-layout">
          <div className="crew-picker">
            <p className="crew-kicker">Same ground. Different stories.</p>
            <h2 id="crew-heading">Who&apos;s in<br />the <span>group chat?</span></h2>
            <div className="crew-options" role="group" aria-label="Choose your event">
              {crews.map((item, index) => (
                <button key={item.id} id={item.id} type="button" aria-pressed={selected === index} aria-controls="crew-detail" onClick={() => setSelected(index)}>
                  <span className="crew-option-number">0{index + 1}</span>
                  <span>{item.title}<small>{item.type}</small></span>
                  <span className="crew-option-arrow" aria-hidden="true">↗</span>
                </button>
              ))}
            </div>
            <p className="crew-footnote">Pick your people. We&apos;ll help with the plan.</p>
          </div>
          <div id="crew-detail" className="crew-detail" aria-live="polite" aria-atomic="true">
            <figure className="crew-photo">
              <Image key={crew.image} src={crew.image} alt={crew.alt} fill sizes="(min-width: 760px) 45vw, 100vw" className="object-cover" />
              <span className="crew-photo-index" aria-hidden="true">C7 — 0{selected + 1}</span>
              <figcaption>{crew.caption}</figcaption>
            </figure>
            <div key={crew.id} className="crew-description"><h3>{crew.note}</h3><p>{crew.description}</p><a href={`/events?plan=${crew.plan}#plan`}>{crew.cta}<span aria-hidden="true">↗</span></a></div>
          </div>
        </div>
      </div>
    </section>
  );
}
