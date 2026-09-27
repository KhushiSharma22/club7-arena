import { Suspense } from "react";
import type { Metadata } from "next";
import PlayPageClient from "@/components/play/PlayPageClient";

export const metadata: Metadata = {
  title: "Book a Slot",
  description: "Choose your sport, date and time, add your group details and review your booking at Club 7.",
};

export default function PlayPage() {
  return (
    <Suspense fallback={null}>
      <PlayPageClient />
    </Suspense>
  );
}
