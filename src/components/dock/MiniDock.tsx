"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  type MotionValue,
} from "framer-motion";
import { projects, type Project } from "@/data/projects";
import { ProjectGlyph } from "./ProjectGlyph";

const BASE = 40; // resting size (px) — smaller than the homepage dock
const MAX = 60; // magnified size

function MiniItem({
  href,
  label,
  glyph,
  tooltip,
  active,
  current,
  mouseX,
  onSelect,
}: {
  href: string;
  label: string;
  glyph: React.ReactNode;
  tooltip: string;
  active?: boolean;
  current?: boolean;
  mouseX: MotionValue<number>;
  onSelect?: () => void; // when set, renders a button that calls this instead of navigating
}) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (x) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return Infinity;
    return x - (rect.left + rect.width / 2);
  });
  const sizeSync = useTransform(distance, [-100, 0, 100], [BASE, MAX, BASE]);
  const size = useSpring(sizeSync, { stiffness: 350, damping: 24, mass: 0.3 });

  const shared = {
    ref,
    "aria-label": label,
    "aria-current": current ? ("page" as const) : undefined,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocus: () => setHovered(true),
    onBlur: () => setHovered(false),
    className: `relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl border bg-paper text-ink shadow-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ink ${
      current ? "border-ink" : "border-line"
    }`,
  };

  return (
    <div className="relative flex flex-col items-center">
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute bottom-full mb-3 whitespace-nowrap rounded-lg border border-line bg-paper px-3 py-1.5 text-xs shadow-lg"
          >
            {tooltip}
            <span className="absolute left-1/2 top-full h-1.5 w-1.5 -translate-x-1/2 -translate-y-1 rotate-45 border-b border-r border-line bg-paper" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div style={{ width: size, height: size }}>
        {onSelect ? (
          <button type="button" onClick={onSelect} {...shared}>
            {glyph}
          </button>
        ) : (
          <Link href={href} {...shared}>
            {glyph}
          </Link>
        )}
      </motion.div>

      {/* running-app dot — filled for the current project */}
      <span
        className={`mt-1 h-1 w-1 rounded-full ${
          current ? "bg-ink" : active ? "bg-ink-faint" : "bg-transparent"
        }`}
      />
    </div>
  );
}

/**
 * Compact, fixed dock at the bottom of project pages. Lets the user jump home
 * or to any other project. The current project is highlighted.
 *
 * Two modes:
 *  - Default (on /work/[slug]) — tiles are links that navigate.
 *  - Window mode (inside the /b genie window) — pass `onSelectProject` + `onHome`
 *    so tiles swap the window content in place and Home closes it, keeping the
 *    dock-app metaphor intact.
 */
export function MiniDock({
  currentSlug,
  onSelectProject,
  onHome,
}: {
  currentSlug?: string;
  onSelectProject?: (slug: string) => void;
  onHome?: () => void;
}) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[90] hidden justify-center md:flex">
      <motion.div
        onPointerMove={(e) => mouseX.set(e.clientX)}
        onPointerLeave={() => mouseX.set(Infinity)}
        className="pointer-events-auto flex items-end gap-3 rounded-2xl border border-line bg-paper-raised/80 px-3 pb-2 pt-2 shadow-lg backdrop-blur-md"
      >
        {/* Home */}
        <MiniItem
          href="/b"
          label="Home"
          tooltip="Home"
          glyph={<span className="text-lg leading-none">⌂</span>}
          mouseX={mouseX}
          onSelect={onHome}
        />

        <span className="mb-3 h-8 w-px self-center bg-line" />

        {/* Projects */}
        {projects.map((p: Project) => (
          <MiniItem
            key={p.slug}
            href={`/work/${p.slug}`}
            label={`Open ${p.client}`}
            tooltip={`${p.client}${p.locked ? " · Protected" : ""}`}
            current={p.slug === currentSlug}
            active
            mouseX={mouseX}
            onSelect={
              onSelectProject ? () => onSelectProject(p.slug) : undefined
            }
            glyph={<ProjectGlyph slug={p.slug} size={18} />}
          />
        ))}
      </motion.div>
    </div>
  );
}
