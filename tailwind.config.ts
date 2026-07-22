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
      },
      maxWidth: {
        "reading": "62ch",
      },
    },
  },
  plugins: [],
};

export default config;
