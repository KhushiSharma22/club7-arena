import Image from "next/image";

export default function EventsHero() {
  return (
    <section className="events-hero events-container">
      <div className="events-hero-copy">
        <p className="events-eyebrow"><span /> Gather. Play. Celebrate.</p>
        <h1>Good people.<br />Great games.<br /><span>One memorable day.</span></h1>
        <p className="events-intro">A team day with a little friendly rivalry. A birthday beyond the usual. Bring your people together at Club 7.</p>
        <div className="events-actions">
          <a href="#plan" className="events-button">Plan your event <span aria-hidden="true">↗</span></a>
          <a href="#event-posters" className="events-text-link">Explore occasions <span aria-hidden="true">↓</span></a>
        </div>
        <div className="events-location"><span aria-hidden="true">◎</span> Sector 89, Faridabad <span className="events-location-divider" /> Open 24 hours</div>
      </div>
      <figure className="events-hero-image">
        <Image src="/venue/night-aerial.jpg" alt="Club 7 Arena's floodlit sports grounds at night" fill preload sizes="(min-width: 900px) 55vw, 100vw" className="object-cover" />
        <div className="events-image-shade" />
        <span className="events-photo-label">The setting for your next get-together</span>
        <figcaption><span>YOUR PEOPLE. OUR GROUND.</span><strong>A little competition.<br />A lot to remember.</strong></figcaption>
      </figure>
    </section>
  );
}
