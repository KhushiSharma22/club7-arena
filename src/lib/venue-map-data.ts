export type HotspotId = "cricket" | "football" | "pickleball" | "cafe";

export type Hotspot = {
  id: HotspotId;
  label: string;
  /** Percentage position of the marker over the aerial photo — eyeballed
   * against the source image, the same "tuned visually, not computed"
   * approach already used for the pitch/field overlays elsewhere on
   * this page. Explicitly illustrative, not a surveyed site plan. */
  x: number;
  y: number;
  /** Approximate boundary rectangle traced when this hotspot is active —
   * same illustrative-overlay language as the marker position. */
  box: { left: number; top: number; width: number; height: number };
  fact: string;
  /** Every hotspot but café shows a small supporting crop. Café
   * deliberately has none — showing the same café photo a second time
   * here would repeat it; a description + link to the café section is
   * enough. */
  image?: { src: string; alt: string; position: string };
  /** Sport pages don't have a dedicated café route */
  playHref?: string;
  /** Café's only action — jumps to the on-page café section rather
   * than a sport booking flow. */
  sectionHref?: string;
};

export const HOTSPOTS: Hotspot[] = [
  {
    id: "cricket",
    label: "Cricket Turf",
    x: 46,
    y: 52,
    box: { left: 30, top: 38, width: 34, height: 30 },
    fact: "Two turfs, shared with football on the same ground.",
    image: { src: "/venue/turf-top-down-night-clean.webp", alt: "Top-down view of Club 7's floodlit cricket turf at night", position: "65% 50%" },
    playHref: "/play?sport=cricket",
  },
  {
    id: "football",
    label: "Football Area",
    x: 52,
    y: 46,
    box: { left: 30, top: 38, width: 34, height: 30 },
    fact: "Marked out on the same turf as box cricket, not a separate pitch.",
    image: { src: "/stock/last-goal-night.jpg", alt: "Floodlit football match at night, Club 7", position: "40% 55%" },
    playHref: "/play?sport=football",
  },
  {
    id: "pickleball",
    label: "Pickleball Court",
    x: 74,
    y: 64,
    box: { left: 66, top: 56, width: 20, height: 16 },
    fact: "A dedicated court, separate from the main turf.",
    image: { src: "/venue/pickleball-clean.webp", alt: "Club 7's floodlit pickleball court at night", position: "50% 55%" },
    playHref: "/play?sport=pickleball",
  },
  {
    id: "cafe",
    label: "Café",
    x: 22,
    y: 34,
    box: { left: 14, top: 24, width: 18, height: 16 },
    fact: "On-site, for after the game.",
    sectionHref: "#the-cafe",
  },
];
