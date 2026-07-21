"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { projects } from "@/data/projects";
import { DockItem } from "./DockItem";

const INK_FAINT = "var(--ink-faint)";

/**
 * A macOS-style dock. Icons magnify based on the cursor's horizontal distance,
 * show a tooltip bubble on hover, and open the case study with a genie-scale
 * transition on click. Pointer-fine only — mobile uses the list fallback.
 *
 * On first mount each icon plays a one-time staggered "wave" pop (handled in
 * DockItem via `intro` + `index`). It's a self-contained scale animation that
 * ends at rest, so it composes cleanly with the hover magnify.
 */
export function Dock({
  onOpen,
}: {
  onOpen: (slug: string, rect: DOMRect) => void;
}) {
  const mouseX = useMotionValue(Infinity);
  const ref = useRef<HTMLDivElement>(null);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <motion.div
      ref={ref}
      onPointerMove={(e) => mouseX.set(e.clientX)}
      onPointerLeave={() => {
        mouseX.set(Infinity);
        setHoveredSlug(null);
      }}
      className="mx-auto flex h-24 items-end gap-4 rounded-3xl border border-line bg-paper-raised/70 px-5 pb-3 backdrop-blur-md"
      style={{ width: "fit-content" }}
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
          hoveredSlug={hoveredSlug}
          onHoverChange={setHoveredSlug}
          inkFaint={INK_FAINT}
        />
      ))}
    </motion.div>
  );
}
