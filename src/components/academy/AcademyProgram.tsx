import Image from "next/image";

const skills = [
  { n: "01", title: "Learn the basics", text: "Build familiarity with the bat, the stance and the game—with a coach there to guide the next step." },
  { n: "02", title: "Put it into practice", text: "Take what you learn onto the turf. Practice gives each small adjustment a chance to feel natural." },
  { n: "03", title: "Enjoy getting better", text: "A good shot. A better attempt. Make space for the little moments that keep a young player coming back." },
];
export default function AcademyProgram() {
  return (
    <>
      <section className="academy-learning events-container">
        <div className="occasion-heading"><div><p className="events-eyebrow">More than time on the turf</p><h2>A place to learn.<br />A game to love.</h2></div><p className="events-muted">For parents looking for cricket coaching for their child, start with a conversation about their age and experience.</p></div>
        <div className="occasion-steps">{skills.map(s => <article key={s.n}><span>{s.n}</span><h3>{s.title}</h3><p>{s.text}</p></article>)}</div>
      </section>
      <section id="academy-session" className="academy-session events-container">
        <figure className="academy-session-film"><video controls playsInline muted preload="none" poster="/academy/coach-guidance.jpg" aria-label="Coach guidance followed by a young cricketer practising at Club 7"><source src="/academy/coaching-session.mp4" type="video/mp4" />Your browser does not support video playback.</video><figcaption>A glimpse of coaching at Club 7.</figcaption></figure>
        <div className="academy-session-copy"><p className="events-eyebrow">From guidance to practice</p><h2>Watch it.<br />Try it.<br /><span>Try again.</span></h2><p className="events-muted">A coach helps with the stance. A young player practises the next delivery. Here is what learning on the ground looks like.</p><figure className="academy-practice-photo"><Image src="/academy/batting-practice.jpg" alt="A young cricketer practising bowling on the Club 7 turf" width={1080} height={1920} quality={90} sizes="(min-width: 900px) 26vw, 80vw" /><figcaption>Small adjustments. Another go.</figcaption></figure></div>
      </section>
    </>
  );
}
