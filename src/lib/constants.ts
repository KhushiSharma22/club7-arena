/**
 * Real Club 7 WhatsApp number (E.164, no "+"). UI copy never prints
 * the raw number itself — every CTA routes through whatsappHref below.
 */
export const WHATSAPP_NUMBER_DEMO: string = "919911046717";
const IS_PLACEHOLDER_NUMBER = WHATSAPP_NUMBER_DEMO === "910000000000";
let warnedOnce = false;

/**
 * Every booking/enquiry CTA on the site routes here with a contextual
 * prefilled message rather than a bare, unexplained chat open — the
 * routing is the same everywhere, only the message changes.
 *
 * Every enquiry link on the live site currently points at a
 * placeholder number, meaning the site's entire conversion path is
 * non-functional in production. This warns loudly (once) in the
 * browser console — the real number must be supplied and swapped
 * into WHATSAPP_NUMBER_DEMO above before this can be considered
 * shipped, not just deployed.
 */
export function whatsappHref(message: string): string {
  if (IS_PLACEHOLDER_NUMBER && !warnedOnce && typeof window !== "undefined") {
    warnedOnce = true;
    console.error(
      "[Club 7] Every WhatsApp link on this site uses a placeholder number (src/lib/constants.ts:WHATSAPP_NUMBER_DEMO). Replace it with the real WhatsApp Business number before this goes live — bookings currently go nowhere."
    );
  }
  return `https://wa.me/${WHATSAPP_NUMBER_DEMO}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_HREF = whatsappHref("Hi Club 7, I'd like to book a slot.");

export const WHATSAPP_MESSAGES = {
  booking: "Hi Club 7, I'd like to book a slot.",
  availability: "Hi Club 7, can you tell me tonight's availability?",
  cricket: "Hi Club 7, I want to check box cricket slots.",
  football: "Hi Club 7, I want to check football availability.",
  pickleball: "Hi Club 7, I want to check pickleball slots.",
  academy: "Hi Club 7, I'd like to enquire about a cricket academy trial.",
  support: "Hi Club 7, I have a question about equipment, arrival, weather or changing a booking.",
  teamDay: "Hi Club 7, I'm planning a team outing.",
  birthday: "Hi Club 7, I'd like to plan a birthday.",
  events: "Hi Club 7, I'd like to plan an event.",
  tournament: "Hi Club 7, I'd like to enquire about tournaments.",
} as const;

/**
 * No verified Google Maps / place URL exists anywhere in the project
 * — this is a plain text search built from the location string
 * already displayed sitewide, not an invented pin or coordinate.
 * Swap for a real verified place link the moment one exists.
 */
export const DIRECTIONS_HREF = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "Club 7, Sector 89, Faridabad"
)}`;
