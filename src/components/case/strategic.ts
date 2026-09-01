/**
 * Project `strategic` items are stored as strings. Most follow a
 * "Tension: the choice we made" shape (colon separated); a few are a single
 * sentence. Normalize both into the { tension, body } pairs the Decisions
 * component renders (the delimiter itself is never shown — tension and body
 * render in separate columns).
 */
export function splitStrategic(
  items: readonly string[],
): { tension: string; body: string }[] {
  return items.map((text) => {
    const i = text.indexOf(": ");
    if (i < 0) return { tension: text, body: "" };
    return { tension: text.slice(0, i), body: text.slice(i + 2) };
  });
}
