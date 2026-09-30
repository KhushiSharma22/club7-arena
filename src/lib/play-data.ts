export type PlaySportId = "football" | "cricket" | "pickleball";

export type PlaySport = {
  id: PlaySportId;
  number: string;
  /** short form used in nav-style contexts (selector, CTA) */
  shortName: string;
  /** the sport stage's benefit line — one sentence, not a heading pair */
  line: string;
  /** 2-3 verified facts only — nothing invented */
  info: { label: string; value: string }[];
  image: {
    src: string;
    position: string;
    alt: string;
    stock?: boolean;
    /** Subtle crop tightening for sources where the useful subject
     * doesn't fill the frame (e.g. football's net rope). 1 = no zoom. */
    zoom?: number;
  };
};

/**
 * Every fact in `info` below already exists elsewhere on the site
 * (Hero, GroundSection). Pickleball genuinely only has one confirmed
 * detail beyond location; it stays at two info points rather than
 * padding to three.
 *
 * PHOTOGRAPHY — verified status of each image, and what's still missing:
 * - Football: representative stock (`stock: true`), not Club 7's own
 *   footage — disclosed honestly in the alt text rather than
 *   attributed to the venue. Cropped tighter and shifted toward the
 *   player/referee cluster to reduce how much of the frame the goal
 *   net's foreground rope dominates; the rope crosses most of the
 *   photo at some density, so no crop removes it entirely.
 * - Cricket: real Club 7 photography, but an empty top-down shot of
 *   the turf — no player action exists in the library. Kept because
 *   it's genuine and unambiguous (the red pitch marking identifies the
 *   sport clearly), not because it satisfies "recognisable action."
 *   Real cricket action photography is a real gap.
 * - Pickleball: real Club 7 photography, shot in daylight. Previously
 *   graded with a heavy "day-for-night" filter + dark overlay to fake
 *   a night mood — dropped that entirely here in favour of a light,
 *   natural grade, since the photo is honestly daytime and forcing it
 *   into a false night register was exactly the "synthetic-looking"
 *   treatment to avoid. No players are in this photo either; real
 *   pickleball action photography is also a gap.
 */
export const PLAY_SPORTS: PlaySport[] = [
  {
    id: "cricket",
    number: "01",
    shortName: "Box Cricket",
    line: "Settle it on the pitch.",
    info: [
      { label: "Format", value: "Box Cricket" },
      { label: "Turfs", value: "2 Turfs" },
      { label: "Location", value: "Sector 89" },
    ],
    image: {
      src: "/venue/turf-top-down-night.jpg",
      position: "62% 48%",
      zoom: 1.05,
      alt: "Top-down view of Club 7's floodlit cricket pitch at night",
    },
  },
  {
    id: "football",
    number: "02",
    shortName: "Football",
    line: "Make time for a proper game.",
    info: [
      { label: "Format", value: "7-a-side" },
      { label: "Setting", value: "Under the Lights" },
      { label: "Location", value: "Sector 89" },
    ],
    image: {
      src: "/stock/last-goal-night.jpg",
      position: "22% 60%",
      zoom: 1.12,
      alt: "Floodlit 7-a-side football match at night — representative photo",
      stock: true,
    },
  },
  {
    id: "pickleball",
    number: "03",
    shortName: "Pickleball",
    line: "Meet you across the net.",
    info: [
      { label: "Level", value: "Beginner Friendly" },
      { label: "Location", value: "Sector 89" },
    ],
    image: {
      src: "/venue/pickleball.jpg",
      position: "50% 60%",
      alt: "Club 7's pickleball court in daylight",
    },
  },
];
