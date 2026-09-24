import Image from "next/image";

const moments = [
  { number: "01", title: "Bring everyone together", text: "Meet at Club 7. Leave the everyday behind." },
  { number: "02", title: "Let the games begin", text: "Football, box cricket or pickleball. Find your group's game." },
  { number: "03", title: "Stay a little longer", text: "Head to the café for food, conversation and the post-match stories." },
];

export default function NightSequence() {
  return (
    <section className="events-experience events-container">
      <div className="events-experience-image"><Image src="/venue/turf-top-down-night.jpg" alt="An overhead view of the illuminated Club 7 turf" fill sizes="(min-width: 900px) 45vw, 100vw" className="object-cover" /><span>More than a match.</span></div>
      <div className="events-experience-copy"><p className="events-eyebrow">A little play. A little unwinding.</p><h2>Make a day of it.</h2><p className="events-muted">No fixed script. Just a good setting for time well spent.</p><ol>{moments.map((moment) => <li key={moment.number}><span>{moment.number}</span><div><h3>{moment.title}</h3><p>{moment.text}</p></div></li>)}</ol><a href="#plan" className="events-text-link">Let&apos;s put your plan together <span aria-hidden="true">↗</span></a></div>
    </section>
  );
}
