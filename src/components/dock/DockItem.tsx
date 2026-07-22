"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useSpring,
  useTransform,
  useAnimationControls,
  type MotionValue,
} from "framer-motion";
import type { Project } from "@/data/projects";
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
  onHoverChange: (slug: string | null, centerX?: number | null) => void;
  inkFaint: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const isHovered = hoveredSlug === project.slug;

  const enter = () => {
    const rect = ref.current?.getBoundingClientRect();
    onHoverChange(project.slug, rect ? rect.left + rect.width / 2 : null);
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
              ? "0 0 0 1px var(--line), 0 8px 20px color-mix(in srgb, var(--ink) 14%, transparent)"
              : "0 1px 2px color-mix(in srgb, var(--ink) 6%, transparent)",
          }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={enter}
          onFocus={enter}
          onBlur={() => {
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
            onOpen(project.slug, rect);
          }}
          aria-label={`Open ${project.client}`}
          className="relative flex items-center justify-center overflow-hidden rounded-2xl border border-line bg-paper text-ink outline-none focus-visible:ring-2 focus-visible:ring-ink"
        >
          {/* Logo fills the tile; conceptual glyph is centered if no logo. */}
          <ProjectGlyph slug={project.slug} />
        </motion.button>
      </motion.div>

      {/* running-app dot — a consistent neutral cue across every project */}
      <motion.span
        className="mt-1 h-1 w-1 rounded-full"
        animate={{
          backgroundColor: isHovered ? "var(--ink-soft)" : inkFaint,
        }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden
      />
    </div>
  );
}
