"use client";

import Image from "next/image";
import { useState } from "react";

const address = "Club 7, Plot 7, Kheri Kala, near Power House, Sector 89, Faridabad, Haryana";
const query = encodeURIComponent(address);
const maps = `https://www.google.com/maps/search/?api=1&query=${query}`;

export default function LocationView() {
  const [view, setView] = useState("map");
  const [copyState, setCopyState] = useState("");
  async function copyAddress() {
    try { await navigator.clipboard.writeText(address); setCopyState("Address copied"); }
    catch { setCopyState("Select and copy the address above."); }
  }
  return (
    <main className="destination-page">
      <div className="destination-heading"><p className="discover-eyebrow">The way to a good time / Faridabad</p><div><h1>Your next stop.<br /><span>Club 7.</span></h1><p>Leave the everyday behind.<br />We&apos;ll see you under the lights.</p></div></div>
      <section className="destination-desk" aria-label="Find Club 7">
        <div className="destination-visual">
          <div className="destination-toolbar"><span>SECTOR 89 / FBD</span><div role="group" aria-label="Location view"><button aria-pressed={view === "map"} onClick={() => setView("map")}>Map</button><button aria-pressed={view === "venue"} onClick={() => setView("venue")}>The ground</button></div></div>
          <div className="destination-frame">
            {view === "map" ? <iframe title="Google Maps — Club 7, Sector 89, Faridabad" src={`https://www.google.com/maps?q=${query}&output=embed`} allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /> : <Image src="/venue/night-aerial.jpg" alt="Club 7's illuminated grounds from above" fill sizes="(min-width: 900px) 65vw, 100vw" className="object-cover" />}
          </div>
          <div className="destination-map-footer"><span>{view === "map" ? "Explore the area. Find your way here." : "The destination, after dark."}</span><a href={maps} target="_blank" rel="noopener noreferrer">Open Google Maps ↗</a></div>
        </div>
        <aside className="destination-pass"><p className="discover-eyebrow">Your destination</p><h2>Club<span>7</span><small>ARENA / FARIDABAD</small></h2><div className="destination-address"><span>Find us at</span><address>Plot 7, Kheri Kala<br />Near Power House, Sector 89<br />Faridabad, Haryana</address><button onClick={copyAddress}>Copy address <span aria-hidden="true">⧉</span></button><p role="status">{copyState}</p></div><div className="destination-hours"><span>Turf & courts</span><strong>Open 24 hours</strong><p>Choose your game and confirm a slot before you set off.</p></div><a className="discover-primary" href={`https://www.google.com/maps/dir/?api=1&destination=${query}`} target="_blank" rel="noopener noreferrer">Take me there <span aria-hidden="true">↗</span></a><a className="destination-book" href="/play">Find a playing slot →</a></aside>
      </section>
      <section className="arrival-strip"><div><p className="discover-eyebrow">The last little stretch</p><h2>Look for the lights.<br />And the Club 7 sign.</h2><p>Kheri Kala, Sector 89. Keep the map handy for your final turn, and look for our entrance signage when you arrive.</p><a href={maps} target="_blank" rel="noopener noreferrer">Check your route ↗</a></div></section>
      <footer className="discover-footer"><span>CLUB 7 / SEE YOU HERE</span><a href="/socials">A glimpse before you go ↗</a></footer>
    </main>
  );
}
