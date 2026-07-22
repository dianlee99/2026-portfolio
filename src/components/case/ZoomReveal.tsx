"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Figure wrapper for case-study imagery: a scroll scale-in reveal, plus a
 * hover zoom on the child image (add `zoom-target` via the `group-hover`
 * utility on the <img>). Clips to its rounded frame.
 */
export function ZoomReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.figure
      className={`group overflow-hidden ${className ?? ""}`}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.figure>
  );
}
