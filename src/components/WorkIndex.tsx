"use client";

import Link from "next/link";
import { COVERS } from "@/data/covers";
import { projects } from "@/data/projects";
import { Reveal } from "./Reveal";

/**
 * Rich project showcase — large cover cards with a hover lift, index numbers,
 * tags, and a one-line summary. Cards link to the full case study pages.
 */
export function WorkIndex() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6">
      <Reveal>
        <div className="mb-10 flex items-end justify-between gap-6 border-b border-line pb-5 md:mb-14">
          <h2 className="text-hero font-semibold tracking-tight">
            Selected work
          </h2>
          <span className="label whitespace-nowrap pb-1 uppercase">
            {projects.length} case studies
          </span>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 md:gap-y-20">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 0.06}>
            <article>
              <Link href={`/work/${p.slug}`} className="group block">
                {/* Cover */}
                <div className="card-lift relative overflow-hidden rounded-xl border border-line bg-paper-raised">
                  <span
                    className="absolute inset-x-0 top-0 z-10 h-1 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
                    style={{ backgroundColor: p.accent }}
                    aria-hidden
                  />
                  <div className="relative aspect-[16/10] w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={COVERS[p.slug]}
                      alt={p.client}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.05]"
                    />
                    {/* hover veil + CTA */}
                    <div className="pointer-events-none absolute inset-0 flex items-end justify-start bg-gradient-to-t from-black/45 via-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="m-4 inline-flex items-center gap-1.5 rounded-full bg-paper px-3.5 py-1.5 text-xs font-medium text-ink shadow-sm">
                        View case
                        <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                  {p.locked && (
                    <span className="absolute right-3 top-3 rounded-full bg-paper/90 px-2.5 py-1 text-[11px] font-medium text-ink-soft backdrop-blur-sm">
                      Protected
                    </span>
                  )}
                </div>

                {/* Meta */}
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <span className="label uppercase">{p.index}</span>
                  <span className="label uppercase">{p.year}</span>
                </div>
                <h3 className="mt-2 text-title font-semibold leading-tight">
                  <span className="link-underline">{p.client}</span>
                </h3>
                <p className="mt-2 max-w-reading leading-relaxed text-ink-soft">
                  {p.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line px-2.5 py-0.5 text-xs text-ink-soft"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
