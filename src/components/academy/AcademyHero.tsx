import Image from "next/image";

export default function AcademyHero() {
  return (
    <section className="academy-hero events-container">
      <div>
        <p className="events-eyebrow"><span /> Cricket coaching for kids / Club 7</p>
        <h1>Little steps.<br /><span>Big innings.</span></h1>
        <p className="events-intro">A love for the game starts with someone showing you how. Give your child time on the turf, a coach to learn from, and a reason to look forward to practice.</p>
        <div className="events-actions"><a href="#academy-enquiry" className="events-button">Ask about coaching <span aria-hidden="true">↗</span></a><a href="#academy-session" className="events-text-link">See a session <span aria-hidden="true">↓</span></a></div>
        <p className="events-location">Coach-led cricket · Sector 89, Faridabad</p>
      </div>
      <figure className="academy-entrance entrance-photo">
        <Image src="/venue/entrance-video-still.jpg" alt="The illuminated Club 7 entrance and Play Train Devour sign at night" fill preload quality={90} sizes="(min-width: 900px) 40vw, 100vw" />
      </figure>
    </section>
  );
}
