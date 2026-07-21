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
      {/* Intro — one bold line + a tight supporting paragraph */}
      <section className="mx-auto max-w-[900px] px-6 pt-24 md:pt-32">
        <Greeting className="text-[clamp(2rem,5vw,3rem)] font-semibold tracking-tight" />
        <p className="mt-5 max-w-reading text-base font-normal leading-relaxed text-ink-soft md:text-lg">
          A senior product designer at{" "}
          <ExternalLink href={QUICKBOOKS_URL}>Intuit QuickBooks</ExternalLink>.
          Working across fintech, data, and AI, turning high-stakes, ambiguous
          problems into products people trust.
          <br />
          Best viewed by <InlineThemeToggle />.
        </p>

        <p className="label mt-6 uppercase">Pick a project from the dock below.</p>
      </section>

      {/* Dock — desktop / pointer-fine only */}
      <div className="hidden justify-center px-6 pb-16 pt-32 md:flex md:pb-24 md:pt-40">
        <Dock onOpen={(slug, rect) => setOpen({ slug, rect })} />
      </div>

      {/* Mobile fallback — the calm list from Version A */}
      <div className="pb-24 pt-12 md:hidden">
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
