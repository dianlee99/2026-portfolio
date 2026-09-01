"use client";

import { useEffect, useState } from "react";

/** Per-slug logo probe cache — avoids re-fetching missing files on every mount. */
const logoCache = new Map<string, string | null>();
const logoPending = new Map<string, Promise<string | null>>();

function logoCandidates(slug: string) {
  return [`/logos/${slug}.svg`, `/logos/${slug}.png`, `/logos/${slug}.jpg`];
}

async function resolveLogo(slug: string): Promise<string | null> {
  if (logoCache.has(slug)) return logoCache.get(slug)!;

  const pending = logoPending.get(slug);
  if (pending) return pending;

  const probe = (async () => {
    for (const src of logoCandidates(slug)) {
      const ok = await new Promise<boolean>((res) => {
        const img = new window.Image();
        img.onload = () => res(img.naturalWidth > 0);
        img.onerror = () => res(false);
        img.src = src;
      });
      if (ok) {
        logoCache.set(slug, src);
        logoPending.delete(slug);
        return src;
      }
    }
    logoCache.set(slug, null);
    logoPending.delete(slug);
    return null;
  })();

  logoPending.set(slug, probe);
  return probe;
}

/**
 * The face of a dock tile.
 *
 * Render priority:
 *   1. A real logo file at /logos/<slug>.svg (or .png) if present
 *   2. A conceptual monochrome glyph (theme-aware, via currentColor)
 *
 * To use real company logos: drop files into `public/logos/` named by slug —
 * e.g. `intuit.svg`, `capital-one-data.svg`, `capital-one-auto-refinance.svg`,
 * `eureka-surveys.svg`, `archive.svg`. Prefer monochrome/black SVGs so they sit
 * cleanly on the neutral tiles. Until a file exists, the glyph below shows.
 */
export function ProjectGlyph({
  slug,
  size = 26,
}: {
  slug: string;
  size?: number;
}) {
  const cached = logoCache.get(slug);
  const [logoSrc, setLogoSrc] = useState<string | null>(
    cached === undefined ? null : cached
  );

  useEffect(() => {
    let cancelled = false;
    resolveLogo(slug).then((src) => {
      if (cancelled) return;
      setLogoSrc(src);
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  // A real logo fills the entire tile (covers the rounded square, no letterbox).
  if (logoSrc) {
    return (
      // Decorative: the parent button carries aria-label="Open {project}",
      // so the logo itself is hidden from screen readers.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logoSrc}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }

  // While probing (resolved === false) OR when no logo exists, render the glyph.
  return (
    <span className="relative text-ink">
      <Glyph slug={slug} size={size} />
    </span>
  );
}

/** Conceptual fallback icons — used until a real logo file is added. */
function Glyph({ slug, size }: { slug: string; size: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (slug) {
    // Intuit — QuickBooks → payments / money movement
    case "intuit":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5v9M14.2 9.3c-.6-.7-1.5-1-2.4-1-1.2 0-2.3.7-2.3 1.9 0 2.6 4.8 1.4 4.8 4 0 1.3-1.2 2-2.5 2-1 0-1.9-.4-2.5-1.1" />
        </svg>
      );

    // Capital One — Data Platform → stacked data layers
    case "capital-one-data":
      return (
        <svg {...common}>
          <ellipse cx="12" cy="6" rx="7" ry="2.6" />
          <path d="M5 6v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6" />
          <path d="M5 12v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6v-6" />
        </svg>
      );

    // Capital One — Auto Refinance → car
    case "capital-one-auto-refinance":
      return (
        <svg {...common}>
          <path d="M3 13l1.6-4.2A2 2 0 0 1 6.5 7.5h11a2 2 0 0 1 1.9 1.3L21 13v4a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-1H6.5v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
          <path d="M3 13h18" />
          <circle cx="7.5" cy="15.5" r="0.4" />
          <circle cx="16.5" cy="15.5" r="0.4" />
        </svg>
      );

    // Eureka Surveys → checklist / survey
    case "eureka-surveys":
      return (
        <svg {...common}>
          <rect x="5" y="3.5" width="14" height="17" rx="2" />
          <path d="M8.5 8l1.2 1.2L12 7" />
          <path d="M8.5 14l1.2 1.2L12 13" />
          <path d="M14 8.2h2.5M14 14.2h2.5" />
        </svg>
      );

    // Archive → box / folder of earlier work
    case "archive":
      return (
        <svg {...common}>
          <path d="M4 7.5h16v3H4z" />
          <path d="M5 10.5v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8" />
          <path d="M9.5 14h5" />
        </svg>
      );

    default:
      return null;
  }
}
