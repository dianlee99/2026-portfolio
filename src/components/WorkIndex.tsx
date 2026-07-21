"use client";

import Link from "next/link";
import { COVERS } from "@/data/covers";
import { projects } from "@/data/projects";
import { Reveal } from "./Reveal";

/**
 * Calm vertical stack of work — a year label, title, one-line summary, and a
 * cover image per project. No hover theatrics; the content carries it.
 */
export function WorkIndex() {
  return (
    <section id="work" className="mx-auto max-w-[900px] px-6">
      <h2 className="label mb-10 uppercase">Selected Work</h2>

      <div className="flex flex-col gap-20 md:gap-28">
        {projects.map((p) => (
          <Reveal key={p.slug}>
            <article>
              <Link href={`/work/${p.slug}`} className="group block">
                <div className="mb-4 flex items-baseline justify-between">
                  <span className="text-sm text-ink-faint">{p.year}</span>
                  {p.locked && (
                    <span className="text-xs text-ink-faint">Protected</span>
                  )}
                </div>

                <h3 className="text-title font-semibold">
                  <span className="link-underline">{p.client}</span>
                </h3>
                <p className="mt-2 max-w-reading text-ink-soft">{p.summary}</p>

                {/* Cover image */}
                <div className="mt-6 overflow-hidden rounded-lg border border-line bg-paper-raised">
                  <div className="relative aspect-[16/9] w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={COVERS[p.slug]}
                      alt={p.client}
                      className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-95"
                    />
                  </div>
                </div>
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
