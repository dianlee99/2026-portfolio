/**
 * Per-project accent colors, matched to each dock logo and tuned to pass WCAG
 * large-text AA contrast against the white paper. Drives the headline accent
 * word, the hero gradient, and accent metrics on each case page. Keyed by slug.
 *
 * Homepage + shared chrome do NOT use these — they stay neutral ink.
 */
export const CASE_ACCENTS: Record<string, string> = {
  "capital-one-auto-refinance": "#C1272D", // Capital One red (logo swoosh)
  "capital-one-data": "#1D6FC7", // Capital One blue (data mark)
  "eureka-surveys": "#6D28D9", // dark purple
  intuit: "#227814", // Intuit / QuickBooks green (darkened for contrast)
  archive: "#8A6D0F", // dark gold/yellow
};
