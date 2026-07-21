"use client";

import type { CSSProperties } from "react";
import type { Internship, Project } from "@/data/projects";
import { Reveal } from "@/components/Reveal";
import { LinkedText } from "@/components/LinkedText";
import { CaseMeta } from "@/components/case/CaseMeta";
import {
  caseHeaderClass,
  caseInnerClass,
  caseMetaWrapClass,
  caseSectionRuleClass,
  caseSectionRuleYClass,
} from "@/components/case/caseLayout";

function ArchiveImage({
  src,
  alt,
  cover = false,
}: {
  src: string;
  alt: string;
  cover?: boolean;
}) {
  if (cover) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-paper-raised">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </div>
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={alt}
      className="block w-full rounded-lg border border-line bg-paper-raised"
    />
  );
}

/** Three-up row: center image sets height; sides crop to match on desktop. */
function TriptychRow({
  images,
}: {
  images: { src: string; caption?: string }[];
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-stretch">
      {images.map((img, i) => {
        const isCenter = i === 1;

        return (
          <figure
            key={img.src}
            className={
              isCenter
                ? undefined
                : "sm:min-h-0 sm:overflow-hidden sm:rounded-lg sm:border sm:border-line"
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.caption ?? ""}
              className={
                isCenter
                  ? "block w-full rounded-lg border border-line bg-paper-raised"
                  : "block w-full rounded-lg border border-line bg-paper-raised sm:h-full sm:rounded-none sm:border-0 sm:object-cover sm:object-center"
              }
            />
            {img.caption && (
              <figcaption className="mt-2 text-sm text-ink-faint">
                {img.caption}
              </figcaption>
            )}
          </figure>
        );
      })}
    </div>
  );
}

function Entry({ item }: { item: Internship }) {
  const imageGridClass =
    item.images.length >= 4
      ? "grid-cols-2"
      : item.images.length === 3
        ? "grid-cols-1 sm:grid-cols-3"
        : "grid-cols-1 sm:grid-cols-2";

  return (
    <Reveal>
      <article>
        <div className="grid gap-8 md:grid-cols-12">
          {/* Left: name + copy */}
          <div className="md:col-span-7">
            <h2 className="text-title font-semibold">{item.company}</h2>
            <p className="label mt-1 uppercase">{item.kind}</p>
            <p className="mt-5 max-w-reading leading-relaxed text-ink-soft">
              <LinkedText text={item.body} links={item.links} />
            </p>
          </div>

          {/* Right: meta */}
          <dl className="space-y-5 text-sm md:col-span-4 md:col-start-9">
            <div>
              <dt className="font-semibold">Role</dt>
              <dd className="mt-1 text-ink-soft">{item.role}</dd>
            </div>
            <div>
              <dt className="font-semibold">Duration</dt>
              <dd className="mt-1 text-ink-soft">{item.duration}</dd>
            </div>
            {item.tools && (
              <div>
                <dt className="font-semibold">Tools</dt>
                <dd className="mt-1 text-ink-soft">{item.tools}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Images */}
        <div className="mt-8">
          {item.wide ? (
            <div className="overflow-hidden rounded-lg border border-line bg-paper-raised">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.images[0].src}
                alt=""
                className="block w-full"
              />
            </div>
          ) : item.images.length === 3 ? (
            <TriptychRow images={item.images} />
          ) : (
            <div className={`grid gap-4 ${imageGridClass}`}>
              {item.images.map((img, i) => (
                <figure key={i}>
                  <ArchiveImage
                    src={img.src}
                    alt={img.caption ?? ""}
                    cover={img.cover}
                  />
                  {img.caption && (
                    <figcaption className="mt-2 text-sm text-ink-faint">
                      {img.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          )}
        </div>
      </article>
    </Reveal>
  );
}

export function ArchiveCase({ project }: { project: Project }) {
  const count = project.internships?.length ?? 0;
  return (
    <div style={{ "--proj-accent": project.accent } as CSSProperties}>
      {/* Header — matches the shared case study template */}
      <header className={caseHeaderClass}>
        <p className="label mb-6 uppercase">{project.client}</p>
        <h1 className="max-w-3xl text-hero font-semibold">{project.title}</h1>
        <p className="mt-5 max-w-reading text-lg text-ink-soft">
          {project.subtitle}
        </p>
      </header>

      <div className={`${caseMetaWrapClass} ${caseSectionRuleYClass} mt-12`}>
        <Reveal delay={0.05}>
          <dl className={`${caseInnerClass} grid grid-cols-2 gap-x-6 gap-y-5 py-8 text-sm md:grid-cols-3`}>
            {[
              { label: "Role", value: "Design Intern" },
              { label: "Placements", value: String(count) },
              { label: "Focus", value: "UX · Research" },
            ].map((m) => (
              <div
                key={m.label}
                className={
                  m.label === "Focus" ? "col-span-2 md:col-span-1" : undefined
                }
              >
                <dt className="label mb-1 uppercase">{m.label}</dt>
                <dd className="leading-snug text-ink-soft">{m.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      {/* Internships */}
      <div className="pb-20 md:pb-24">
        {project.internships?.map((item, i) => (
          <section
            key={item.company}
            className={i === 0 ? undefined : caseSectionRuleClass}
          >
            <div
              className={`${caseInnerClass} ${
                i === 0
                  ? "pt-16 pb-20 md:pt-20 md:pb-24"
                  : "py-14 md:py-16"
              }`}
            >
              <Entry item={item} />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
