import type { Metadata } from "next";
import AcademyHero from "@/components/academy/AcademyHero";
import AcademyProgram from "@/components/academy/AcademyProgram";
import AcademyTrial from "@/components/academy/AcademyTrial";

export const metadata: Metadata = {
  title: "Academy",
  description: "Cricket academy nets and coaching at Club 7 — Sector 89, Faridabad. Grouped by age and skill, trial first, on the same turf you already know.",
};

export default function AcademyPage() {
  return (
    <>
      <AcademyHero />
      <AcademyProgram />
      <AcademyTrial />
    </>
  );
}
