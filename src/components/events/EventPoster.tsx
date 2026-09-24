import Image from "next/image";

const occasions = [
  { id: "team-days", plan: "team-outing", number: "01", title: "Team days", subtitle: "Out of office. Into the game.", description: "Trade the meeting room for a match. Get the whole team together for sport, food and time to connect.", image: "/stock/last-goal-night.jpg", alt: "Football players mid-match at night — representative photo", tags: "Colleagues · Team outings", cta: "Plan a team day" },
  { id: "birthdays", plan: "birthday", number: "02", title: "Birthdays", subtitle: "Play first. Cake later.", description: "Make your next birthday a shared experience. Bring friends and family for a celebration with room to play.", image: "/venue/pickleball.jpg", alt: "Pickleball courts at Club 7 Arena", tags: "Friends · Family · Celebrations", cta: "Plan a birthday" },
  { id: "private-groups", plan: "private-group", number: "03", title: "Private groups", subtitle: "Your favourite people. Your kind of day.", description: "A reunion, a weekend catch-up or just a good excuse. Bring your group and make the ground part of your plan.", image: "/stock/warmup-turf.jpg", alt: "Players gathering on a floodlit pitch — representative photo", tags: "Reunions · Weekend plans", cta: "Plan a get-together" },
];

export default function EventPosters() {
  return (
    <section id="event-posters" className="events-occasions">
      <div className="events-container">
        <div className="events-section-heading"><div><p className="events-eyebrow">Made for getting together</p><h2>Every group has a reason.</h2></div><p>Big occasion or simply overdue.<br />There&apos;s a plan for your people.</p></div>
        <div className="events-card-grid">
          {occasions.map((event) => (
            <article key={event.id} id={event.id} className="events-card">
              <div className="events-card-image"><Image src={event.image} alt={event.alt} fill sizes="(min-width: 900px) 30vw, (min-width: 600px) 50vw, 100vw" className="object-cover" /><span>{event.number} / {event.title}</span></div>
              <div className="events-card-copy"><p className="events-card-tag">{event.tags}</p><h3>{event.title}</h3><p className="events-card-subtitle">{event.subtitle}</p><p className="events-card-description">{event.description}</p><a href={`/events?plan=${event.plan}#plan`}>{event.cta}<span aria-hidden="true">↗</span></a></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
