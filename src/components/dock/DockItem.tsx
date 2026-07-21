"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useSpring,
  useTransform,
  useAnimationControls,
  AnimatePresence,
  type MotionValue,
} from "framer-motion";
import type { Project } from "@/data/projects";
import { getCover } from "@/data/covers";
import { ProjectGlyph } from "./ProjectGlyph";

const BASE = 56; // resting icon size (px)
const MAX = 96; // magnified size at cursor center

export function DockItem({
  project,
  mouseX,
  onOpen,
  index = 0,
  intro = false,
  hoveredSlug,
  onHoverChange,
  inkFaint,
}: {
  project: Project;
  mouseX: MotionValue<number>;
  onOpen: (slug: string, rect: DOMRect) => void;
  index?: number; // position in the dock, for the staggered intro wave
  intro?: boolean; // play the one-time intro pop
  hoveredSlug: string | null;
  onHoverChange: (slug: string | null) => void;
  inkFaint: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);
  const [coverFailed, setCoverFailed] = useState(false);
  const coverSrc = getCover(project.slug);
  const showCover = Boolean(coverSrc) && !coverFailed;
  const isHovered = hoveredSlug === project.slug;

  const setHover = (active: boolean) => {
    setHovered(active);
    if (active) onHoverChange(project.slug);
  };

  // distance from cursor to this icon's center
  const distance = useTransform(mouseX, (x) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return Infinity;
    return x - (rect.left + rect.width / 2);
  });

  // map distance (-150..0..150) to size (BASE..MAX..BASE)
  const sizeSync = useTransform(distance, [-150, 0, 150], [BASE, MAX, BASE]);
  const size = useSpring(sizeSync, { stiffness: 350, damping: 24, mass: 0.3 });

  // One-time intro pop, driven imperatively on mount so nothing can pre-empt
  // it. Lives on a wrapper's `scale` — fully separate from the width magnify.
  const introControls = useAnimationControls();
  useEffect(() => {
    if (!intro) return;
    let cancelled = false;
    const t = setTimeout(async () => {
      if (cancelled) return;
      // Quick punch up...
      await introControls.start({
        scale: 1.35,
        transition: { duration: 0.13, ease: "easeOut" },
      });
      if (cancelled) return;
      // ...then a springy settle with a touch of overshoot.
      introControls.start({
        scale: 1,
        transition: { type: "spring", stiffness: 600, damping: 14, mass: 0.5 },
      });
    }, 150 + index * 60);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [intro, index, introControls]);

  return (
    <div data-dock-item className="relative flex flex-col items-center">
      {/* tooltip bubble */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={`pointer-events-none absolute bottom-full mb-4 -translate-x-0 overflow-hidden rounded-xl border border-line bg-paper text-left shadow-xl ${
              showCover ? "w-64" : "w-56 px-4 py-3"
            }`}
          >
            {showCover && (
              <>
                <span
                  className="block h-0.5 w-full"
                  style={{ backgroundColor: project.accent }}
                  aria-hidden
                />
                <div className="h-24 overflow-hidden border-b border-line bg-paper-raised">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={coverSrc}
                    alt=""
                    className="h-full w-full object-cover"
                    onError={() => setCoverFailed(true)}
                  />
                </div>
              </>
            )}
            <div className={showCover ? "px-4 py-3" : undefined}>
              <p className="text-[11px] uppercase tracking-wide text-ink-faint">
                {project.year}
                {project.locked ? " · Protected" : ""}
              </p>
              <p className="mt-0.5 text-sm font-semibold leading-tight">
                {project.client}
              </p>
              <p className="mt-1 text-xs leading-snug text-ink-soft">
                {project.summary}
              </p>
            </div>
            {/* little pointer */}
            <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 border-b border-r border-line bg-paper" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Intro-pop wrapper — `scale` here, independent of the width magnify. */}
      <motion.div
        animate={introControls}
        style={{ transformOrigin: "bottom center" }}
      >
        <motion.button
          ref={ref}
          style={{ width: size, height: size }}
          animate={{
            boxShadow: isHovered
              ? `0 0 0 1px color-mix(in srgb, ${project.accent} 22%, transparent), 0 4px 14px color-mix(in srgb, ${project.accent} 10%, transparent)`
              : "0 1px 2px color-mix(in srgb, var(--ink) 6%, transparent)",
          }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHover(true)}
          onBlur={() => {
            setHovered(false);
            if (hoveredSlug === project.slug) onHoverChange(null);
          }}
          onClick={() => {
            const rect = ref.current?.getBoundingClientRect();
            if (!rect) return;
            // Quick squash-and-pop, macOS-style.
            introControls.start({
              scale: [1, 0.82, 1.15, 1],
              transition: {
                duration: 0.34,
                times: [0, 0.28, 0.62, 1],
                ease: "easeOut",
              },
            });
            // Fire immediately — DockHome bursts now and opens the window
            // slightly later, so particles visibly erupt from the dock icon.
            onOpen(project.slug, rect);
          }}
          aria-label={`Open ${project.client}`}
          className="relative flex items-center justify-center overflow-hidden rounded-2xl border border-line bg-paper text-ink outline-none focus-visible:ring-2 focus-visible:ring-ink"
        >
          {/* Logo fills the tile; conceptual glyph is centered if no logo. */}
          <ProjectGlyph slug={project.slug} />
        </motion.button>
      </motion.div>

      {/* running-app dot — picks up the hovered project's accent */}
      <motion.span
        className="mt-1 h-1 w-1 rounded-full"
        animate={{
          backgroundColor: isHovered ? project.accent : inkFaint,
        }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden
      />
    </div>
  );
}
