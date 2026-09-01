"use client";

import type { ReactNode } from "react";
import { AutoVideo } from "@/components/case/AutoVideo";

/**
 * Shared case-study design system (the "refi-e" language, promoted to prod).
 *
 * A's readable structure, left-aligned like C, wired to the site theme
 * (night = dark, day = light) via CSS variables, with a clean grotesk for
 * structure and an editorial serif for accent moments. Fonts are injected once
 * at the page root through CaseTheme so every piece inherits them.
 *
 * Accent color: var(--case-accent), theme-aware (burnt orange / amber).
 */

const LABEL =
  "text-[0.7rem] font-medium uppercase tracking-[0.16em] text-ink-faint";

/** Media: .gif → looping video, else image. Chrome-less. */
export function Media({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return src.endsWith(".gif") ? (
    <AutoVideo src={src} alt={alt} className={className} />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} />
  );
}

/** Small uppercase label in the page's sans (not mono). */
export function Label({
  children,
  className = "",
  accent = false,
}: {
  children: ReactNode;
  className?: string;
  accent?: boolean;
}) {
  return (
    <p
      className={`${LABEL} ${className}`}
      style={accent ? { color: "var(--case-accent)" } : undefined}
    >
      {children}
    </p>
  );
}

/** Editorial serif accent span (headline word, emphasis). */
export function Accent({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`case-serif italic ${className}`}
      style={{ color: "var(--case-accent)" }}
    >
      {children}
    </span>
  );
}

/** Left-label rail + wide left-aligned content — the C move, every section. */
export function Row({
  label,
  children,
  divide = true,
}: {
  label?: string;
  children: ReactNode;
  divide?: boolean;
}) {
  return (
    <section
      className={`mx-auto max-w-6xl px-6 py-20 md:py-28 ${divide ? "border-t border-line" : ""}`}
    >
      <div className="grid gap-6 md:grid-cols-[160px_1fr] md:gap-12">
        <div className={LABEL}>{label}</div>
        <div>{children}</div>
      </div>
    </section>
  );
}

/** Case hero: eyebrow, big headline (accent word), subtitle, meta grid, image. */
export function CaseHero({
  client,
  headline,
  subtitle,
  meta,
  heroSrc,
  heroAlt,
}: {
  client: string;
  headline: ReactNode;
  subtitle: string;
  meta: { label: string; value: string }[];
  heroSrc: string;
  heroAlt: string;
}) {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-36 md:pt-48">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[60vh]"
        style={{
          background:
            "radial-gradient(ellipse 45% 55% at 28% 0%, color-mix(in srgb, var(--case-accent) 12%, transparent), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl">
        <Label>{client}</Label>
        <h1 className="mt-8 max-w-4xl text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.035em]">
          {headline}
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">
          {subtitle}
        </p>
        <div className="mt-10 grid max-w-2xl grid-cols-2 gap-6 md:grid-cols-4">
          {meta.map((m) => (
            <div key={m.label}>
              <div className={LABEL}>{m.label}</div>
              <div className="mt-1.5 font-medium">{m.value}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative mx-auto mt-14 max-w-6xl overflow-hidden rounded-2xl border border-line">
        <Media src={heroSrc} alt={heroAlt} className="block w-full" />
      </div>
    </section>
  );
}

/** Impact statement + metric numbers (serif, accent, no top rule). */
export function CaseImpact({
  statement,
  metrics,
}: {
  statement: string;
  metrics: { value: ReactNode; label: string }[];
}) {
  return (
    <Row label="Impact">
      <p className="max-w-3xl text-[clamp(1.5rem,3vw,2.3rem)] font-medium leading-[1.18] tracking-[-0.02em]">
        {statement}
      </p>
      <div className="mt-12 grid gap-8 sm:grid-cols-3">
        {metrics.map((m) => (
          <div key={m.label}>
            <div
              className="case-serif text-[clamp(2.2rem,4.4vw,3.4rem)] leading-none"
              style={{ color: "var(--case-accent)" }}
            >
              {m.value}
            </div>
            <div className="mt-3 text-sm text-ink-soft">{m.label}</div>
          </div>
        ))}
      </div>
    </Row>
  );
}

/** Compact before/after — media capped so a chapter fits above the fold. */
export function BeforeAfter({
  before,
  after,
  beforeAlt,
  afterAlt,
}: {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
}) {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      <figure className="flex flex-col items-center">
        <div className="overflow-hidden rounded-xl">
          <Media src={before} alt={beforeAlt} className="mx-auto block max-h-[340px] w-auto" />
        </div>
        <Label className="mt-3">Before</Label>
      </figure>
      <figure className="flex flex-col items-center">
        <div className="overflow-hidden rounded-xl">
          <Media src={after} alt={afterAlt} className="mx-auto block max-h-[340px] w-auto" />
        </div>
        <Label className="mt-3" accent>After</Label>
      </figure>
    </div>
  );
}

/** Impact bullets under a chapter. */
export function Outcomes({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-8 flex flex-col gap-2">
      {items.map((it) => (
        <li key={it} className="flex gap-3 text-sm text-ink-soft">
          <span style={{ color: "var(--case-accent)" }}>→</span>
          {it}
        </li>
      ))}
    </ul>
  );
}

/** Decisions / trade-offs: tension | outcome rows. */
export function Decisions({
  items,
  label = "The calls I made",
  heading = "The decisions, and what each one cost.",
}: {
  items: readonly { tension: string; body: string }[];
  label?: string;
  heading?: string;
}) {
  return (
    <Row label={label}>
      <h2 className="text-[clamp(1.7rem,3.4vw,2.6rem)] font-semibold tracking-[-0.03em]">
        {heading}
      </h2>
      <div className="mt-10 border-t border-line">
        {items.map((d) =>
          d.body ? (
            <div
              key={d.tension}
              className="grid gap-2 border-b border-line py-6 md:grid-cols-[1fr_2fr] md:gap-10"
            >
              <div className="text-lg font-semibold">{d.tension}</div>
              <div className="leading-relaxed text-ink-soft">{d.body}</div>
            </div>
          ) : (
            <div key={d.tension} className="border-b border-line py-6">
              <div className="max-w-2xl text-lg leading-relaxed">{d.tension}</div>
            </div>
          ),
        )}
      </div>
    </Row>
  );
}

/** Section heading used inside a Row — big grotesk title + optional lead. */
export function Heading({
  children,
  lead,
  size = "md",
}: {
  children: ReactNode;
  lead?: ReactNode;
  size?: "md" | "lg";
}) {
  const cls =
    size === "lg"
      ? "text-[clamp(1.9rem,4vw,3rem)]"
      : "text-[clamp(1.7rem,3.4vw,2.6rem)]";
  return (
    <>
      <h2 className={`max-w-3xl ${cls} font-semibold leading-[1.05] tracking-[-0.03em]`}>
        {children}
      </h2>
      {lead && (
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
          {lead}
        </p>
      )}
    </>
  );
}

/** Chrome-less figure with optional caption; media auto-routes gif → video. */
export function Figure({
  src,
  alt,
  caption,
  className = "",
  imgClassName = "block w-full",
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-xl">
        <Media src={src} alt={alt} className={imgClassName} />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm leading-snug text-ink-faint">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
