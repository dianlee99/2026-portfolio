"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

/** Per-project confetti glyphs — themed to each app. */
const GLYPHS: Record<string, string[]> = {
  intuit: ["💵", "🪙", "💰"],
  "capital-one-auto-refinance": ["🚗", "🔑", "💵"],
  "capital-one-data": ["📊", "📈", "🗂️"],
  "eureka-surveys": ["✅", "⭐", "💵"],
  archive: ["📦", "✏️", "🗂️"],
};

const COUNT = 16;

/**
 * A one-shot particle burst that blasts out of an opened dock icon. Rendered in
 * a body portal so it sits above the un-minimizing project window.
 */
export function IconBurst({
  originRect,
  slug,
  onDone,
}: {
  originRect: DOMRect;
  slug: string;
  onDone: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const t = window.setTimeout(onDone, 1100);
    return () => window.clearTimeout(t);
  }, [onDone]);

  if (!mounted) return null;

  const cx = originRect.left + originRect.width / 2;
  const cy = originRect.top + originRect.height / 2;
  const glyphs = GLYPHS[slug] ?? ["✨"];

  const particles = Array.from({ length: COUNT }, (_, i) => {
    // Fan upward and outward, with a little randomness per particle.
    const spread = -150 + (i / (COUNT - 1)) * 120; // -150deg .. -30deg
    const jitter = (Math.random() - 0.5) * 24;
    const angle = ((spread + jitter) * Math.PI) / 180;
    const dist = 90 + Math.random() * 120;
    return {
      key: i,
      glyph: glyphs[i % glyphs.length],
      dx: Math.cos(angle) * dist,
      dy: Math.sin(angle) * dist,
      rot: (Math.random() - 0.5) * 220,
      size: 16 + Math.round(Math.random() * 12),
      delay: Math.random() * 0.06,
    };
  });

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {particles.map((p) => (
        <motion.span
          key={p.key}
          className="absolute select-none"
          style={{ left: cx, top: cy, fontSize: p.size }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
          animate={{
            x: [0, p.dx, p.dx * 1.05],
            y: [0, p.dy, p.dy + 140],
            opacity: [1, 1, 0],
            scale: [0.5, 1, 0.85],
            rotate: [0, p.rot],
          }}
          transition={{
            duration: 1,
            delay: p.delay,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {p.glyph}
        </motion.span>
      ))}
    </div>,
    document.body
  );
}
