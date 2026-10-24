export default function EventGallery() {
  return (
    <section id="gallery" className="birthday-story events-container" aria-labelledby="birthday-story-title">
      <div className="birthday-story-copy">
        <p className="events-eyebrow">A birthday at Club 7</p>
        <h2 id="birthday-story-title">Their day.<br />Their kind of fun.</h2>
        <p className="events-muted">From the first game to the cake-cutting, a glimpse of a birthday celebrated on the ground.</p>
        <figure className="birthday-testimonial">
          <p className="events-eyebrow">From a birthday guest / Google review</p>
          <blockquote>“The place was awesome everyone in the party enjoyed a lot, food was delicious, The staff and owner was very cooperative Thanku so much club 7 for making my kid&apos;s birthday special.”</blockquote>
          <figcaption><span className="birthday-review-avatar" aria-hidden="true">K</span><div><strong>Kamini Kakar</strong><a href="https://www.google.com/maps/contrib/114710669197666767563/reviews?hl=en-GB" target="_blank" rel="noopener noreferrer">View reviewer on Google ↗</a></div></figcaption>
        </figure>
      </div>
      <figure className="birthday-film">
        <video controls playsInline preload="none" poster="/birthday/birthday-poster.jpg" aria-label="Birthday celebration and games at Club 7">
          <source src="/birthday/birthday-at-club7.mp4" type="video/mp4" />
          Your browser does not support video playback.
        </video>
        <figcaption>A little play. A lot to celebrate.</figcaption>
      </figure>
    </section>
  );
}
