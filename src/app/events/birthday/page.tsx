import type { Metadata } from "next";
import "../events.css";
import EventsHero from "@/components/events/EventsHero";
import FullVenueHire from "@/components/events/FullVenueHire";
import EventGallery from "@/components/events/EventGallery";
import EnquiryForm from "@/components/events/EnquiryForm";
import EventsClosing from "@/components/events/EventsClosing";

export const metadata: Metadata = {
  title: "Birthday Parties",
  description: "Cake can wait, match point first. Plan a birthday at Club 7 — box cricket, football, pickleball and the café, Sector 89, Faridabad.",
};

export default function BirthdayPage() {
  return (
    <main className="events-page">
      <EventsHero
        eyebrow="Birthdays at Club 7"
        lines={["Another year.", "A better plan."]}
        intro="Your favourite people, a little competition, then cake. Give the group something better than another dinner reservation."
        primary={{ label: "Plan the birthday", href: "#plan" }}
        secondary={{ label: "See the gallery", href: "#gallery" }}
        image={{ src: "/venue/pickleball.jpg", alt: "Club 7's pickleball court, Sector 89, Faridabad" }}
        photoLabel="Cake can wait. Match point first."
        captionEyebrow="CLUB 7 / BIRTHDAYS"
        captionTitle="Play first. Cake after."
      />
      <FullVenueHire />
      <EventGallery />
      <EnquiryForm
        occasion="Birthday"
        eyebrow="Let's make it happen"
        heading="Plan the birthday."
        sub="Share a few details. We'll help you put the day together."
        headcountLabel="How Many People?"
        headcountPlaceholder="e.g. 15"
      />
      <EventsClosing
        heading="Another Year. On the Turf."
        sub="We'll take it from there."
        planHref="#plan"
        planLabel="Plan the Birthday"
        tagLine="Box Cricket / Football / Pickleball / Café"
      />
    </main>
  );
}
