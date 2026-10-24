"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PLAY_SPORTS, type PlaySportId } from "@/lib/play-data";
import { whatsappHref } from "@/lib/constants";
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
export default function PlayPageClient({ preview = false }: { preview?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeId: PlaySportId = PLAY_SPORTS.find((s) => s.id === searchParams.get("sport"))?.id ?? PLAY_SPORTS[0].id;

  function handleSelect(id: PlaySportId) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sport", id);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  if (preview) {
    const sport = PLAY_SPORTS.find(s => s.id === activeId)!;
    return <main id="book-enquiry" className="booking-page">
      <header className="booking-heading"><p>CLUB 7 / GET YOUR GAME ON</p><h1>Make time for {sport.shortName}.</h1><span>Choose your game, then message us with your preferred date, time and group size. We’ll confirm availability directly.</span></header>
      <div className="booking-days" role="group" aria-label="Choose your sport">{PLAY_SPORTS.map(s => <button key={s.id} type="button" aria-pressed={s.id === activeId} onClick={() => handleSelect(s.id)}>{s.shortName}</button>)}</div>
      <section className="booking-step" style={{ marginTop: 32, maxWidth: 700 }}><h2>Let’s find your slot.</h2><p style={{ marginBlock: 20 }}>Box cricket, football and pickleball at Club 7, Sector 89, Faridabad. Speak with the team about available times and your group.</p><a className="booking-pay" href={whatsappHref(`Hi Club 7, I'd like to check ${sport.shortName} availability. Please help me plan a slot.`)} target="_blank" rel="noopener noreferrer">Check availability on WhatsApp ↗</a><p className="booking-payment-note">Your slot is confirmed directly with the Club 7 team.</p></section>
    </main>;
  }
  return <BookingFlow activeId={activeId} onSelect={handleSelect} />;
}
