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
        "hero": ["clamp(2rem, 4.5vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "title": ["clamp(1.4rem, 2.6vw, 2rem)", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
      },
      maxWidth: {
        "reading": "62ch",
      },
    },
  },
  plugins: [],
};

export default config;
