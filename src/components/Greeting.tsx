"use client";

import { useEffect, useState } from "react";
import { Bricolage_Grotesque } from "next/font/google";

// Display face for the homepage greeting only — the rest of the site is Manrope.
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

/**
 * Time-aware headline. Renders "I'm Dian" on the server, then swaps to a
 * greeting based on the visitor's local hour once mounted (avoids hydration
 * mismatch). Morning / afternoon / evening / night.
 */
function greetingForHour(hour: number) {
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 17) return "Good afternoon";
  if (hour >= 17 && hour < 21) return "Good evening";
  return "Good night";
}

export function Greeting({ className }: { className?: string }) {
  const [greeting, setGreeting] = useState<string | null>(null);

  useEffect(() => {
    setGreeting(greetingForHour(new Date().getHours()));
  }, []);

  return (
    <h1 className={`${display.className} ${className ?? ""} leading-[1.05]`}>
      {greeting ? `${greeting}, ` : ""}I&apos;m Dian{" "}
      <span className="font-normal italic tracking-normal text-ink-soft">
        (dy-AN)
      </span>
    </h1>
  );
}
