import type { Metadata } from "next";
import "../events/events.css";
import OccasionGuide from "@/components/events/OccasionGuide";
import AcademyHero from "@/components/academy/AcademyHero";
import AcademyProgram from "@/components/academy/AcademyProgram";
import AcademyTrial from "@/components/academy/AcademyTrial";

export const metadata: Metadata = {
  title: "Academy",
  description: "Coach-led cricket learning for kids at Club 7, Sector 89, Faridabad. See coaching in action and contact the team about timings and joining.",
};

export default function AcademyPage() {
  return (
    <main className="events-page academy-page">
      <AcademyHero />
      <AcademyProgram />
      <OccasionGuide kind="academy" />
      <AcademyTrial />
    </main>
  );
}
