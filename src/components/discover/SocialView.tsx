"use client";

import { useState } from "react";
import { INSTAGRAM_PROFILE, SOCIAL_MOMENTS } from "@/lib/social-data";

export default function SocialView() {
  const [index, setIndex] = useState(0);
  const moment = SOCIAL_MOMENTS[index];
  return (
    <main className="social-page social-reels-page">
      <header className="social-heading"><p className="discover-eyebrow">The Club 7 channel</p><h1>Less scrolling.<br /><span>More living.</span></h1><p>The games. The ground. The moments in between.<br />Straight from <a href={INSTAGRAM_PROFILE} target="_blank" rel="noopener noreferrer">@club7arena ↗</a></p></header>
      <section className="social-studio" aria-label="Club 7 Instagram reels">
        <div className="social-editorial"><span className="social-edition">FROM OUR INSTAGRAM</span><div className="social-story"><h2>This is what<br />showing up looks like.</h2><p>A little glimpse of Club 7, told by the club itself. Pick a reel, press play, and find your next reason to come down.</p></div><div className="social-profile"><a href={INSTAGRAM_PROFILE} target="_blank" rel="noopener noreferrer"><span className="social-profile-monogram" aria-hidden="true">C7</span><span>@club7arena<small>Follow the moments ↗</small></span></a></div><div className="social-controls"><button aria-label="Previous reel" onClick={() => setIndex((index + SOCIAL_MOMENTS.length - 1) % SOCIAL_MOMENTS.length)}>←</button><span aria-live="polite">0{index + 1} / 0{SOCIAL_MOMENTS.length}</span><button aria-label="Next reel" onClick={() => setIndex((index + 1) % SOCIAL_MOMENTS.length)}>→</button></div></div>
        <div className="social-phone-wrap"><div className="social-phone"><div className="social-phone-bar"><span>CLUB 7</span><span>THE REEL EDIT</span></div><div className="social-phone-screen"><iframe key={moment.id} title={`Club 7 Instagram ${moment.title}`} src={moment.embedUrl} allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowFullScreen /></div><div className="social-phone-bottom"><span>@CLUB7ARENA</span><span>0{index + 1} / 06</span></div></div><p className="social-media-note"><a href={moment.reelUrl} target="_blank" rel="noopener noreferrer">Open this reel on Instagram ↗</a></p><p className="social-embed-help">If Instagram asks you to sign in, use the link above.</p></div>
        <nav className="social-tracklist" aria-label="Choose a reel"><p className="discover-eyebrow">Choose your next watch</p>{SOCIAL_MOMENTS.map((item, i) => <button key={item.id} aria-pressed={i === index} onClick={() => setIndex(i)}><span>0{i + 1}</span><span>{item.title}<small>@club7arena</small></span><span aria-hidden="true">{i === index ? "▷" : "↗"}</span></button>)}</nav>
      </section>
      <section className="social-outro"><div><p className="discover-eyebrow">Off the feed. Onto the field.</p><h2>Be in the next good moment.</h2></div><a className="discover-primary" href="/play">Find your game ↗</a></section>
      <footer className="discover-footer"><a href={INSTAGRAM_PROFILE} target="_blank" rel="noopener noreferrer">INSTAGRAM / @CLUB7ARENA ↗</a><a href="/location">Find us in real life ↗</a></footer>
    </main>
  );
}
