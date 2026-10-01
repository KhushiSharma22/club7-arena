/**
 * PHOTOGRAPHY STATUS — read before adding new sections.
 *
 * The project's whole image library is 8 files, none of them a real
 * Club 7 birthday, tournament or corporate day — that photography
 * doesn't exist yet. The birthday gallery below reuses the venue's
 * own photos as honest placeholders (each alt text says so) purely so
 * the section isn't an empty box; swap each `src` for a real photo as
 * they come in, the grid itself needs no changes.
 */
export type GalleryImage = { src: string; alt: string; position: string };

export const BIRTHDAY_GALLERY: GalleryImage[] = [
  { src: "/venue/pickleball.jpg", alt: "Club 7's pickleball court — placeholder, real birthday photos coming soon", position: "50% 55%" },
  { src: "/stock/last-goal-night.jpg", alt: "A floodlit match at night — placeholder, real birthday photos coming soon", position: "30% 55%" },
  { src: "/stock/cafe-porch.jpg", alt: "The café seating area — placeholder, real birthday photos coming soon", position: "50% 45%" },
  { src: "/venue/turf-top-down-night.jpg", alt: "Club 7's floodlit turf from above — placeholder, real birthday photos coming soon", position: "60% 48%" },
  { src: "/stock/warmup-turf.jpg", alt: "A group warming up together — placeholder, real birthday photos coming soon", position: "50% 55%" },
  { src: "/venue/night-aerial.jpg", alt: "Club 7's grounds lit up at night — placeholder, real birthday photos coming soon", position: "center 44%" },
];

export type TournamentSport = "Box Cricket" | "Football" | "Pickleball" | "Not sure yet";
export const TOURNAMENT_SPORTS: TournamentSport[] = ["Box Cricket", "Football", "Pickleball", "Not sure yet"];

export const TOURNAMENT_TIMING = [
  "Within the next month",
  "1–3 months out",
  "Just registering interest",
] as const;
