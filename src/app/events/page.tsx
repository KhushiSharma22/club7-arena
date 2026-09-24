import type { Metadata } from "next";
import "./events.css";
import EventsHero from "@/components/events/EventsHero";
import NightSequence from "@/components/events/NightSequence";
import EventPosters from "@/components/events/EventPoster";
import EventPlanner from "@/components/events/EventPlanner";
import EventsClosing from "@/components/events/EventsClosing";

export const metadata: Metadata = {
  title: "Group Events",
  description: "Your people, one ground, a proper night. Team days, birthdays and private groups at Club 7 — tell us the plan, we'll take it from there.",
};

export default function EventsPage() {
  return (
    <main className="events-page">
      <EventsHero />
      <EventPosters />
      <NightSequence />
      <EventPlanner />
      <EventsClosing />
    </main>
  );
}
