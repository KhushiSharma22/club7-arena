import type { Metadata } from "next";
import "../events.css";
import EventsHero from "@/components/events/EventsHero";
import HowItWorks from "@/components/events/HowItWorks";
import TournamentForm from "@/components/events/TournamentForm";
import EventsClosing from "@/components/events/EventsClosing";

export const metadata: Metadata = {
  title: "Tournaments",
  description: "Register your team for the next tournament at Club 7 — box cricket, football or pickleball, Sector 89, Faridabad.",
};

const STEPS = [
  { number: "01", title: "Register your team", text: "Tell us your team name, captain and squad size for the sport you want to play." },
  { number: "02", title: "Club 7 confirms your spot", text: "Our team follows up on WhatsApp with dates, format and entry details for the next tournament." },
  { number: "03", title: "Show up and play", text: "Bring your squad down to Sector 89 and settle it on the pitch." },
];

export default function TournamentPage() {
  return (
    <main className="events-page">
      <EventsHero
        eyebrow="Tournaments at Club 7"
        lines={["Bring your", "squad."]}
        intro="Box cricket, football or pickleball — get your team on our list for the next tournament at Club 7."
        primary={{ label: "Register your team", href: "#register" }}
        secondary={{ label: "How it works", href: "#how-it-works" }}
        image={{ src: "/venue/turf-top-down-night.jpg", alt: "Top-down view of Club 7's floodlit cricket turf at night" }}
        photoLabel="One ground. Every team."
        captionEyebrow="CLUB 7 / TOURNAMENTS"
        captionTitle="Get your team on the list."
      />
      <div id="how-it-works">
        <HowItWorks eyebrow="How it works" heading="Three steps to the pitch." steps={STEPS} />
      </div>
      <TournamentForm />
      <EventsClosing
        heading="Get On The List."
        sub="We'll take it from there."
        planHref="#register"
        planLabel="Register Your Team"
        tagLine="Box Cricket / Football / Pickleball"
      />
    </main>
  );
}
