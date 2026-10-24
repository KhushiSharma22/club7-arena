import type { Metadata } from "next";
import "../events.css";
import OccasionGuide from "@/components/events/OccasionGuide";
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
    <main className="events-page birthday-page">
      <EventsHero
        eyebrow="Birthdays at Club 7"
        lines={["Big cheers.", "Bigger memories."]}
        intro="Their favourite people. A game they love. And that big cake-cutting moment. Celebrate a birthday with room to play, cheer and be together."
        primary={{ label: "Plan the birthday", href: "#plan" }}
        secondary={{ label: "See the gallery", href: "#gallery" }}
        image={{ src: "/birthday/cake-celebration.jpg", alt: "Friends gathered around a sports-themed birthday cake at Club 7" }}
        photoLabel="Cake can wait. Match point first."
        captionEyebrow="CLUB 7 / BIRTHDAYS"
        captionTitle="Play first. Cake after."
      />
      <FullVenueHire />
      <EventGallery />
      <OccasionGuide kind="birthday" />
      <EnquiryForm
        occasion="Birthday"
        eyebrow="Let's make it happen"
        heading="Plan the birthday."
        sub="Share your date and guest count. Add the birthday child’s age and any food or cake plans in the notes."
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
