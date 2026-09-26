"use client";

import { useRevealOnView } from "@/lib/useRevealOnView";

const occasions = [
  { title: "Team outings", description: "A change of scene. A little friendly competition.", plan: "team-outing" },
  { title: "Birthdays", description: "Good games, great company, your kind of celebration.", plan: "birthday" },
  { title: "Private gatherings", description: "For the catch-ups that deserve more than a group chat.", plan: "private-group" },
];

export default function WallSection() {
  const { ref, visible } = useRevealOnView<HTMLDivElement>(0.1);
  return (
    <section id="off-the-pitch" className="relative bg-c7-bg-1" aria-labelledby="gather-title">
      <div ref={ref} className={`gather-section ${visible ? "is-visible" : ""}`}>
        <div className="gather-intro">
          <p className="gather-eyebrow">Together at Club 7</p>
          <h2 id="gather-title">Good company.<br /><span>A better occasion.</span></h2>
          <p className="gather-description">Bring your people together for a day that feels a little different. A game, a celebration, and time well spent.</p>
          <a className="gather-all" href="/events">Explore group events <span aria-hidden="true">↗</span></a>
        </div>
        <nav className="gather-occasions" aria-label="Group occasions">
          {occasions.map((occasion) => (
            <a key={occasion.plan} href={`/events?plan=${occasion.plan}#plan`}>
              <div><h3>{occasion.title}</h3><p>{occasion.description}</p></div>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
