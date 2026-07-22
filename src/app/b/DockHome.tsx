"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Dock } from "@/components/dock/Dock";
import { ProjectWindow } from "@/components/dock/ProjectWindow";
import { WorkIndex } from "@/components/WorkIndex";
import { InlineThemeToggle } from "@/components/InlineThemeToggle";
import { Greeting } from "@/components/Greeting";
import { ExternalLink } from "@/components/LinkedText";
import { QUICKBOOKS_URL } from "@/data/projects";

export function DockHome() {
  const [open, setOpen] = useState<{ slug: string; rect: DOMRect } | null>(
    null
  );

  return (
    <>
      {/* Intro — bold statement + a tight supporting paragraph */}
      <section className="mx-auto max-w-6xl px-6 pt-12 md:pt-16">
        <Greeting className="text-[clamp(2.4rem,6vw,4rem)] font-semibold tracking-tight" />
        <p className="mt-6 max-w-[54rem] text-base font-normal leading-relaxed text-ink-soft [text-wrap:balance] md:text-lg">
          A senior product designer at{" "}
          <ExternalLink href={QUICKBOOKS_URL}>Intuit QuickBooks</ExternalLink>.
          Working across fintech, data, and AI, turning high-stakes, ambiguous
          problems into products people trust.
          <br />
          Best viewed by <InlineThemeToggle />.
        </p>

      </section>

      {/* Dock — desktop / pointer-fine only. Sits high so the preview card
          (which opens below) and the footer stay above the fold. */}
      <div className="hidden justify-center px-6 pt-16 md:flex md:pt-20">
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
    </>
  );
}
