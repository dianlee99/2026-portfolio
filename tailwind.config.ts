import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "var(--ink)",
          soft: "var(--ink-soft)",
          faint: "var(--ink-faint)",
        },
        paper: {
          DEFAULT: "var(--paper)",
          raised: "var(--paper-raised)",
        },
        line: "var(--line)",
        accent: "var(--accent)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Restrained grotesque scale — legibility over spectacle
        "hero": ["clamp(2.25rem, 5vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "title": ["clamp(1.6rem, 3.2vw, 2.6rem)", { lineHeight: "1.12", letterSpacing: "-0.02em" }],
        // h3 / sub-heading. Previously rendered at 4 different sizes across
        // case files — one of which was `title`, flattening the hierarchy.
        "section": ["clamp(1.15rem, 1.6vw, 1.375rem)", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        // Standard body measure. Replaces the text-lg / unsized / text-[0.975rem] drift.
        "body": ["1.0625rem", { lineHeight: "1.65" }],
      },
      maxWidth: {
        "reading": "62ch",
      },
    },
  },
  plugins: [],
};

export default config;
