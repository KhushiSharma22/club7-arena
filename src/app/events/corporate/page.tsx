import type { Metadata } from "next";
import "../events.css";
import EventsHero from "@/components/events/EventsHero";
import NightSequence from "@/components/events/NightSequence";
import PeopleMoment from "@/components/events/PeopleMoment";
import EnquiryForm from "@/components/events/EnquiryForm";
import EventsClosing from "@/components/events/EventsClosing";

export const metadata: Metadata = {
  title: "Corporate & Team Days",
  description: "Get the team off their screens. Corporate outings and team days at Club 7 — box cricket, football, pickleball and the café, Sector 89, Faridabad.",
};

export default function CorporatePage() {
  return (
    <main className="events-page">
      <EventsHero
        eyebrow="Corporate & Team Days"
        lines={["The office", "escape."]}
        intro="Less small talk, more friendly rivalry. Get the team out from behind their desks for a proper game — and a proper catch-up after."
        primary={{ label: "Plan the team day", href: "#plan" }}
        secondary={{ label: "How it works", href: "#how-it-works" }}
        image={{ src: "/stock/last-goal-night.jpg", alt: "A floodlit football match at night — representative photo" }}
        photoLabel="Set your status to: on the turf."
        captionEyebrow="CLUB 7 / TEAM DAYS"
        captionTitle="Team bonding, minus the trust falls."
      />
      <div id="how-it-works">
        <NightSequence />
      </div>
      <PeopleMoment />
      <EnquiryForm
        occasion="Team Day"
        eyebrow="Let's make it happen"
        heading="Plan the team day."
        sub="Share a few details. We'll help you put the day together."
        headcountLabel="How Many People?"
        headcountPlaceholder="e.g. 25"
      />
      <EventsClosing
        heading="Get the Team Out."
        sub="We'll take it from there."
        planHref="#plan"
        planLabel="Plan the Team Day"
        tagLine="Box Cricket / Football / Pickleball / Café"
      />
    </main>
  );
}
