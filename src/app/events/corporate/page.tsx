import type { Metadata } from "next";
import "../events.css";
import OccasionGuide from "@/components/events/OccasionGuide";
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
    <main className="events-page corporate-page">
      <EventsHero
        eyebrow="Corporate & Team Days"
        lines={["Out of office.", "Into the game."]}
        intro="Trade the meeting room for a match. Bring your colleagues together for cricket, football or pickleball—and keep the conversation going at the café."
        primary={{ label: "Plan the team day", href: "#plan" }}
        secondary={{ label: "How it works", href: "#how-it-works" }}
        image={{ src: "/corporate/team-day-original.jpg", alt: "Colleagues celebrating their corporate cricket day together at Club 7", sizes: "90vw" }}
        photoLabel="A team day, the Club 7 way."
        captionEyebrow="ON THE TURF / AT CLUB 7"
        captionTitle="Team bonding, minus the trust falls."
      />
      <div id="how-it-works">
        <NightSequence />
      </div>
      <PeopleMoment />
      <OccasionGuide kind="corporate" />
      <EnquiryForm
        occasion="Team Day"
        eyebrow="Let's make it happen"
        heading="Plan the team day."
        sub="Share your date and headcount. We’ll discuss games, food and the details that make it your team’s day."
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
