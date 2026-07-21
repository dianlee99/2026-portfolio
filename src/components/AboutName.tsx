"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

/**
 * An interactive name. Hover (or tap/focus) reveals a small "about" card with a
 * one-line bio and contact links — doubles as a lightweight About section.
 *
 * Built entirely from phrasing elements (span / a / img) so it can live inside
 * an <h1> (the homepage greeting) as well as the nav.
 */
export function AboutName({
  label = "Dian",
  href,
  className = "",
}: {
  label?: string;
  href?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <span
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {href ? (
        <Link
          href={href}
          onClick={(e) => {
            // On touch, first tap reveals the card instead of navigating.
            if (!open && window.matchMedia("(hover: none)").matches) {
              e.preventDefault();
              setOpen(true);
            }
          }}
          className="underline decoration-dotted decoration-1 underline-offset-[5px] decoration-ink-faint transition-colors hover:decoration-ink"
        >
          {label}
        </Link>
      ) : (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="underline decoration-dotted decoration-1 underline-offset-[6px] decoration-ink-faint transition-colors hover:decoration-ink"
        >
          {label}
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.span
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-full z-50 mt-3 block w-[300px] max-w-[calc(100vw-3rem)] cursor-auto rounded-2xl border border-line bg-paper p-4 text-left shadow-xl [font-family:var(--font-sans)]"
          >
            <span className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/dian.jpg"
                alt=""
                className="h-11 w-11 shrink-0 rounded-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <span className="block">
                <span className="block text-sm font-semibold leading-tight text-ink">
                  Dian Lee
                </span>
                <span className="block text-xs text-ink-faint">
                  Senior Product Designer · pronounced &ldquo;Diane&rdquo;
                </span>
              </span>
            </span>

            <span className="mt-3 block text-xs font-normal leading-relaxed text-ink-soft">
              I design across fintech, data, and AI at Intuit QuickBooks —
              turning ambiguous, high-stakes problems into products people trust.
            </span>

            <span className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
              <a
                href="https://www.linkedin.com/in/dian-lee/"
                target="_blank"
                rel="noreferrer"
                className="link-underline"
              >
                LinkedIn
              </a>
              <a href="mailto:dianlee99@gmail.com" className="link-underline">
                Email
              </a>
              <a
                href="/Dian-Lee-Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="link-underline"
              >
                Résumé ↗
              </a>
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
