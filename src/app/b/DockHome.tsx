"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Dock } from "@/components/dock/Dock";
import { ProjectWindow } from "@/components/dock/ProjectWindow";
import { WorkIndex } from "@/components/WorkIndex";
import { Greeting } from "@/components/Greeting";
import { ExternalLink } from "@/components/LinkedText";
import { QUICKBOOKS_URL } from "@/data/projects";

export function DockHome() {
  const [open, setOpen] = useState<{ slug: string; rect: DOMRect } | null>(
    null
  );

  return (
    <div className="relative">
      {/* Ambient wash from the top — quiet depth behind the hero. */}
      <div aria-hidden className="hero-glow" />

      {/* Intro — bold statement + a tight supporting paragraph */}
      <section className="relative mx-auto max-w-6xl px-6 pt-24 text-center md:pt-32">
        <Greeting className="text-[clamp(2.4rem,6vw,4rem)] font-semibold tracking-tight" />
        {/* Wide measure so this sets as two lines at desktop, not four. */}
        <p className="mx-auto mt-6 max-w-[54rem] text-base font-normal leading-relaxed text-ink-soft [text-wrap:balance] md:text-lg">
          A senior product designer at{" "}
          <ExternalLink href={QUICKBOOKS_URL}>Intuit QuickBooks</ExternalLink>.
          I design trustworthy experiences and ship the fix myself, from
          AI-built prototypes to production PRs.
        </p>

        {/* Desktop-only: describes the pointer dock below, which is hidden on
            touch. Mobile gets the tappable WorkIndex list instead. */}
        <p className="label mt-6 hidden uppercase md:block">
          Hover a project to preview, click to dive in.
        </p>
      </section>

      {/* Dock — desktop / pointer-fine only. Centered to match the centered
          heading and intro above it. */}
      <div className="mx-auto hidden max-w-6xl px-6 pt-10 md:block md:pt-12">
        <Dock onOpen={(slug, rect) => setOpen({ slug, rect })} />
      </div>

      {/* Mobile fallback — the dock is pointer-only, so small screens get the
          project list instead. */}
      <div className="pb-24 pt-14 md:hidden">
        <WorkIndex />
      </div>

      <AnimatePresence>
        {open && (
          <ProjectWindow
            key={open.slug}
            slug={open.slug}
            originRect={open.rect}
            onClose={() => setOpen(null)}
            onSelectProject={(slug) =>
              setOpen((prev) => (prev ? { ...prev, slug } : prev))
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
}
