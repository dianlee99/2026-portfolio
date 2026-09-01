import type { CSSProperties, ReactNode } from "react";
import { Hanken_Grotesk } from "next/font/google";

/**
 * Root wrapper for every case study. Loads the case-page sans (Hanken Grotesk).
 * The editorial serif (Fraunces) is loaded once in the root layout and exposed
 * site-wide via `var(--font-case-serif)` / the `.case-serif` class, so the
 * homepage hero and case pages share the same accent face.
 *   sans  → Hanken Grotesk (structure, labels)
 *   serif → Fraunces (editorial accent moments — from the root layout)
 *
 * `accent` sets the per-project accent (headline word, hero gradient, metrics)
 * via the --case-accent-page custom property; globals.css resolves --case-accent
 * from it. Omit to fall back to the default burnt-orange.
 */
const sans = Hanken_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export function CaseTheme({
  children,
  accent,
}: {
  children: ReactNode;
  accent?: string;
}) {
  const style = accent
    ? ({ "--case-accent-page": accent } as CSSProperties)
    : undefined;

  return (
    <div className={`${sans.className} bg-paper text-ink`} style={style}>
      {children}
    </div>
  );
}
