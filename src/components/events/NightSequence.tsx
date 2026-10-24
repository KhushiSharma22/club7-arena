
const moments = [
  { number: "01", title: "Bring everyone together", text: "Meet at Club 7. Leave the everyday behind." },
  { number: "02", title: "Let the games begin", text: "Football, box cricket or pickleball. Find your group's game." },
  { number: "03", title: "Stay a little longer", text: "Head to the café for food, conversation and the post-match stories." },
];

export default function NightSequence() {
  return (
    <section className="events-experience events-container">
      <figure className="events-experience-image corporate-video">
        <video controls playsInline preload="none" poster="/corporate/team-cricket-poster.jpg" aria-label="A night cricket game at Club 7">
          <source src="/corporate/team-cricket.mp4" type="video/mp4" />
          Your browser does not support video playback.
        </video>
        <figcaption>Under the lights. In good company.</figcaption>
      </figure>
      <div className="events-experience-copy"><p className="events-eyebrow">A little play. A little unwinding.</p><h2>Make a day of it.</h2><p className="events-muted">No fixed script. Just a good setting for time well spent.</p><ol>{moments.map((moment) => <li key={moment.number}><span>{moment.number}</span><div><h3>{moment.title}</h3><p>{moment.text}</p></div></li>)}</ol><a href="#plan" className="events-text-link">Let&apos;s put your plan together <span aria-hidden="true">↗</span></a></div>
    </section>
  );
}
