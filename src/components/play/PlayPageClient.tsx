"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PLAY_SPORTS, type PlaySportId } from "@/lib/play-data";
import BookingFlow from "./BookingFlow";
import "@/styles/booking.css";

/**
 * Sport selection is derived directly from the `?sport=` URL param on
 * every render rather than mirrored into local state — the earlier
 * version seeded a `useState` from the URL once on mount, which meant
 * browser back/forward (which Next.js surfaces as new `searchParams`
 * without remounting this component) never updated the visible sport,
 * even though the URL itself was changing correctly. Deriving directly
 * makes the URL the single source of truth, so there's nothing to fall
 * out of sync. `router.push` (not `replace`) so each sport switch is
 * its own history entry — otherwise there'd be nothing for back/
 * forward to actually navigate through.
 */
export default function PlayPageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeId: PlaySportId = PLAY_SPORTS.find((s) => s.id === searchParams.get("sport"))?.id ?? PLAY_SPORTS[0].id;

  function handleSelect(id: PlaySportId) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sport", id);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return <BookingFlow activeId={activeId} onSelect={handleSelect} />;
}
