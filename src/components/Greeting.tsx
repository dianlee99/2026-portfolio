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

  const speakName = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    // "Diane" reads as /daɪˈæn/ — the dy-AN sound — more reliably than "Dian".
    const utterance = new SpeechSynthesisUtterance("Diane");
    utterance.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return (
    <h1 className={`${display.className} ${className ?? ""} leading-[1.05]`}>
      {greeting ? `${greeting}, ` : ""}I&apos;m Dian{" "}
      <button
        type="button"
        onClick={speakName}
        aria-label="Hear how to pronounce Dian"
        className="cursor-pointer font-normal italic tracking-normal text-ink-soft underline decoration-dotted underline-offset-4 transition-colors hover:text-ink"
      >
        (dy-AN)
      </button>
    </h1>
  );
}
