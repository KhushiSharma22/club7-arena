/** Public reel links observed on @club7arena's official profile. */
export const INSTAGRAM_PROFILE = "https://www.instagram.com/club7arena/";
export const SOCIAL_MOMENTS = [
  "DdqztqmP-pt", "DdRD8-vzY_w", "DdGsjS9vpaD",
  "DciSPugvpDG", "DcGzNwBPcRb", "Db5XPVGPXst",
].map((id, index) => ({
  id,
  title: `Reel ${String(index + 1).padStart(2, "0")}`,
  reelUrl: `https://www.instagram.com/club7arena/reel/${id}/`,
  embedUrl: `https://www.instagram.com/reel/${id}/embed/`,
}));
