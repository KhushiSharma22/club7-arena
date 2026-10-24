/** Explicitly opt the client presentation deployment out of SQLite-backed operations. */
export function isClientPreview() {
  return process.env.CLUB7_PREVIEW_MODE === "1";
}
