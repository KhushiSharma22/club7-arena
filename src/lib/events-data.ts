/**
 * PHOTOGRAPHY STATUS — read before adding new sections.
 *
 * The project's whole image library is 8 files. Only three show
 * people at all (last-goal-night.jpg, warmup-turf.jpg — both stock,
 * not Club 7's own footage — and cafe-porch.jpg, which is a
 * residential-porch photo, not Club 7's venue). None show a group
 * arriving together, celebrating a birthday, or organising an event —
 * the exact moments this page most wants to show. Every slot below
 * reuses one of these honestly, with a different crop per use, rather
 * than inventing a "Club 7" photo that doesn't exist. A short, real
 * event-specific shoot (people arriving as a group, a birthday
 * celebration, a private group together) is the single highest-
 * leverage asset this page is missing — flagged wherever it's used,
 * not hidden.
 */

export type HeroMomentId = "arrive" | "play" | "stay";

export type HeroMoment = {
  id: HeroMomentId;
  number: string;
  label: string;
  image: { src: string; alt: string; position: string; stock?: boolean };
};

export const HERO_MOMENTS: HeroMoment[] = [
  {
    id: "arrive",
    number: "01",
    label: "Arrive",
    image: {
      src: "/venue/entrance-signage.jpg",
      alt: "Club 7's entrance at night, Sector 89, Faridabad",
      position: "50% 32%",
    },
  },
  {
    id: "play",
    number: "02",
    label: "Play",
    image: {
      src: "/stock/last-goal-night.jpg",
      alt: "Floodlit football match at night — representative photo",
      position: "26% 58%",
      stock: true,
    },
  },
  {
    id: "stay",
    number: "03",
    label: "Stay",
    image: {
      src: "/stock/cafe-porch.jpg",
      alt: "Friends gathered together at night — representative photo",
      position: "48% 40%",
      stock: true,
    },
  },
];

export type NightStateId = "arrive" | "game-on" | "cafe" | "still-here";

export type NightState = {
  id: NightStateId;
  time: string;
  label: string;
  lines: string[];
  image: { src: string; alt: string; position: string; stock?: boolean };
  /** Warms as the evening progresses — used for the background tint
   * and the field-line motif's fade. */
  tone: "cool" | "warm";
};

export const NIGHT_STATES: NightState[] = [
  {
    id: "arrive",
    time: "7:30 PM",
    label: "Arrive",
    lines: ["Sector 89.", "Everybody actually made it."],
    image: {
      src: "/venue/entrance-signage.jpg",
      alt: "Club 7's entrance at night, Sector 89, Faridabad",
      position: "50% 30%",
    },
    tone: "cool",
  },
  {
    id: "game-on",
    time: "7:45 PM",
    label: "Game On",
    lines: ["Box Cricket. Football. Pickleball.", "Whole crew in."],
    image: {
      src: "/stock/warmup-turf.jpg",
      alt: "Players warming up together under a single floodlight — representative photo",
      position: "50% 58%",
      stock: true,
    },
    tone: "cool",
  },
  {
    id: "cafe",
    time: "9:00 PM",
    label: "Cafe",
    lines: ["Game done.", "Drinks. Food. Arguments about the score."],
    image: {
      src: "/stock/cafe-porch.jpg",
      alt: "Friends gathered together at night — representative photo",
      position: "50% 36%",
      stock: true,
    },
    tone: "warm",
  },
  {
    id: "still-here",
    time: "9:30 PM",
    label: "Still Here",
    lines: ["Food. Cake. Another conversation.", "Nobody's checking the clock."],
    image: {
      src: "/stock/cafe-porch.jpg",
      alt: "Friends gathered together at night — representative photo",
      position: "68% 62%",
      stock: true,
    },
    tone: "warm",
  },
];
