"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { getProject, projects } from "@/data/projects";
import { getCover } from "@/data/covers";
import { DockItem } from "./DockItem";

const INK_FAINT = "var(--ink-faint)";
const CARD_REM = 34; // preview width in rem

/**
 * A macOS-style dock. Icons magnify based on the cursor's horizontal distance
 * and open the case study with a genie-scale transition on click. A wide,
 * short preview card opens directly below the hovered icon — centered on it,
 * then clamped so it never runs off the viewport. Pointer-fine only — mobile
 * uses the list fallback.
 */
export function Dock({
  onOpen,
}: {
  onOpen: (slug: string, rect: DOMRect) => void;
}) {
  const mouseX = useMotionValue(Infinity);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<{ slug: string; left: number } | null>(
    null
  );

  // Center the card under the icon, then clamp it to the viewport.
  const handleHover = (slug: string | null, centerX?: number | null) => {
    if (!slug || centerX == null) {
      setPreview(null);
      return;
    }
    const wrap = wrapRef.current?.getBoundingClientRect();
    if (!wrap) return;
    const cardW = Math.min(CARD_REM * 16, window.innerWidth - 32);
    const half = cardW / 2;
    const pad = 16;
    const minCenter = pad + half;
    const maxCenter = window.innerWidth - pad - half;
    const clamped = Math.min(Math.max(centerX, minCenter), maxCenter);
    // Left edge relative to the wrapper. We position the edge directly (rather
    // than via a translate class) because Framer's transform would clobber it.
    setPreview({ slug, left: clamped - half - wrap.left });
  };

  const project = preview ? getProject(preview.slug) : undefined;
  const cover = preview ? getCover(preview.slug) : undefined;

  return (
    <div ref={wrapRef} className="relative w-full">
      <motion.div
        onPointerMove={(e) => mouseX.set(e.clientX)}
        onPointerLeave={() => {
          mouseX.set(Infinity);
          setPreview(null);
        }}
        className="shadow-token-md mx-auto flex h-28 w-fit items-end gap-5 rounded-3xl border border-line bg-paper-raised/70 px-6 pb-4 backdrop-blur-md"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {projects.map((p, i) => (
          <DockItem
            key={p.slug}
            project={p}
            mouseX={mouseX}
            onOpen={onOpen}
            index={i}
            intro
            hoveredSlug={preview?.slug ?? null}
            onHoverChange={handleHover}
            inkFaint={INK_FAINT}
          />
        ))}
      </motion.div>

      <AnimatePresence>
        {project && preview && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ left: preview.left, width: `min(${CARD_REM}rem, calc(100vw - 2rem))` }}
            className="pointer-events-none absolute top-full z-30 mt-4 overflow-hidden rounded-2xl border border-line bg-paper text-left shadow-2xl"
          >
            <div className="flex items-stretch">
              {cover && (
                <div className="relative w-48 shrink-0 overflow-hidden border-r border-line bg-paper-raised sm:w-60">
                  <span
                    className="absolute inset-y-0 left-0 z-10 w-1"
                    style={{ backgroundColor: project.accent }}
                    aria-hidden
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cover}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1 p-5">
                <p className="label uppercase">
                  {project.year}
                  {project.locked ? " · Protected" : ""}
                </p>
                <p className="mt-1 text-lg font-semibold leading-tight text-ink">
                  {project.client}
                </p>
                <p className="mt-1.5 text-sm leading-snug text-ink-soft">
                  {project.summary}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line px-2 py-0.5 text-[11px] text-ink-soft"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
