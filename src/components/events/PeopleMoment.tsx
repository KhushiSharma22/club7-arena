import Image from "next/image";

const photos = [
  { src: "/corporate/trophy-presentation.jpg", alt: "Colleagues presenting a cricket trophy during a corporate outing at Club 7", caption: "A little friendly rivalry.", detail: "The match ends. The stories stay." },
  { src: "/corporate/cricket-team.jpg", alt: "A corporate cricket team posing together with bats on the Club 7 turf", caption: "One team. Beyond the office.", detail: "Time together, away from the everyday." },
];

export default function PeopleMoment() {
  return (
    <section className="corporate-moments events-container" aria-labelledby="team-moments-title">
      <div className="corporate-moments-heading">
        <div><p className="events-eyebrow">Team days / In the frame</p><h2 id="team-moments-title">Good games.<br />Better company.</h2></div>
        <p className="events-muted">Real teams. Shared wins. A few moments from a day on the Club 7 turf.</p>
      </div>
      <div className="corporate-photo-grid">
        {photos.map((photo) => <figure key={photo.src}>
          <div className="corporate-photo"><Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 900px) 45vw, 100vw" quality={90} className="object-cover" /></div>
          <figcaption><h3>{photo.caption}</h3><p>{photo.detail}</p></figcaption>
        </figure>)}
      </div>
    </section>
  );
}
