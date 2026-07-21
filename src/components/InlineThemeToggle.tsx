"use client";

import { useTheme } from "./ThemeProvider";

/**
 * A playful inline theme switch — reads as part of a sentence:
 * "Currently designing by [☀ daylight]." Click to flip the whole page.
 */
export function InlineThemeToggle() {
  const { theme, toggle } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      className="group inline-flex items-baseline gap-1.5 rounded-md px-1 font-medium text-ink underline decoration-line decoration-1 underline-offset-4 transition-colors hover:decoration-ink"
    >
      <span
        aria-hidden
        className="inline-block transition-transform duration-500 ease-out group-hover:rotate-45"
      >
        {isLight ? "☀" : "☾"}
      </span>
      {isLight ? "daylight" : "moonlight"}
    </button>
  );
}
