"use client";

import type { ReactNode } from "react";
import type { Project } from "@/data/projects";
import { Reveal } from "@/components/Reveal";
import { ZoomReveal } from "@/components/case/ZoomReveal";
import { CaseHeroImage } from "@/components/case/CaseHeroImage";
import { CaseMeta } from "@/components/case/CaseMeta";
import { ExternalLink } from "@/components/LinkedText";
import { display } from "@/lib/displayFont";

const S = "intuit";

const VOCS = [
  "Worst screen orientation ever. You have to scroll down just to see any details of the invoice. The entire top section is wasted space.",
  "I create it in QuickBooks but I always add some colors to it in Canva before I send it from my own email.",
];

const SIDE_QUESTS = [
  {
    tag: "Insight → prototype",
    title: "Claude to cluster, Cursor to prototype",
    desc: "Clustered Edit-tab VOC into layout principles with Claude, then built the clickable Edit · Settings · Design prototype in Cursor — leadership reacted to real flows, not static frames.",
  },
  {
    tag: "Pull requests",
    title: "UI polish merged to production",
    desc: "Navigated the QBO codebase in Cursor, opened PRs for spacing, copy, and component fixes, and shipped them through normal review.",
  },
  {
    tag: "Bug fixes",
    title: "LLM-assisted debugging",
    desc: "Traced invoicing defects with Claude, patched regressions, and merged the fixes the same week.",
  },
] as const;

function SideQuestItem({
  tag,
  title,
  desc,
  delay = 0,
}: {
  tag: string;
  title: string;
  desc: string;
  delay?: number;
}) {
  return (
    <li className="h-full">
      <Reveal className="h-full" delay={delay}>
        <div className="flex h-full flex-col rounded-xl border border-line bg-paper-raised p-6">
          <p className="label uppercase">{tag}</p>
          <h3 className="mt-2 font-semibold leading-snug text-ink">{title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
            {desc}
          </p>
        </div>
      </Reveal>
    </li>
  );
}

const TRADEOFF_IMAGES = [
  `/work/${S}/tradeoff1.png`,
  `/work/${S}/tradeoff2.png`,
  `/work/${S}/tradeoff3.png`,
];

function TradeOffItem({ text, img }: { text: string; img?: string }) {
  const split = text.indexOf(" — ");
  const tension = split >= 0 ? text.slice(0, split) : text;
  const choice = split >= 0 ? text.slice(split + 3) : "";

  return (
    <li className="flex items-start gap-4">
      {img && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={img}
          alt=""
          className="mt-0.5 h-16 w-16 shrink-0 object-contain"
        />
      )}
      <div className="border-l-2 border-line pl-4">
        <p className="font-medium leading-snug text-ink">{tension}</p>
        {choice && (
          <p className="mt-1.5 leading-relaxed text-ink-soft">{choice}</p>
        )}
      </div>
    </li>
  );
}

/** Airy section — generous whitespace, an optional grey wash on select bands. */
function Section({
  label,
  title,
  lead,
  bg = false,
  children,
}: {
  label: string;
  title: string;
  lead?: string;
  bg?: boolean;
  children: ReactNode;
}) {
  return (
    <section className={`border-t border-line${bg ? " accent-bg" : ""}`}>
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <p className="label uppercase">{label}</p>
          <h2 className="mt-3 text-title font-bold tracking-tight text-ink">
            {title}
          </h2>
          {lead && (
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-soft">
              {lead}
            </p>
          )}
        </Reveal>
        <div className="mt-10 md:mt-12">{children}</div>
      </div>
    </section>
  );
}

export function IntuitCase({ project }: { project: Project }) {
  const accent = project.accent;

  return (
    <div>
      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="mx-auto max-w-6xl px-6 pt-16 md:pt-20">
        <p className="label mb-6 uppercase">{project.client}</p>
        <h1 className="max-w-4xl text-balance text-hero font-semibold">
          {project.title}
        </h1>
        <p className="mt-5 max-w-4xl text-lg leading-relaxed text-ink-soft">
          {project.subtitle}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-line px-2.5 py-0.5 text-xs text-ink-soft"
            >
              {t}
            </span>
          ))}
        </div>
      </header>

      {/* Big hero image */}
      <CaseHeroImage
        src={`/work/${S}/hero.png`}
        alt="QuickBooks invoicing across desktop, tablet, and mobile"
        priority
      />

      <CaseMeta>
        {[
          { label: "Role", value: project.role },
          { label: "Year", value: project.year },
          { label: "Platform", value: "Desktop · Tablet · Web" },
          { label: "AI tools", value: "Claude · Cursor" },
        ].map((m) => (
          <div key={m.label}>
            <dt className="label mb-1">{m.label}</dt>
            <dd className="text-ink-soft">{m.value}</dd>
          </div>
        ))}
      </CaseMeta>

      {/* ── TL;DR ──────────────────────────────────────────────── */}
      <section className="accent-bg border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <Reveal>
            <p className="label uppercase">TL;DR</p>
            <p className="mt-4 max-w-4xl text-title font-medium leading-snug text-ink">
              {project.impact}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Problem ────────────────────────────────────────────── */}
      <Section
        label="Problem"
        title="Three jobs, one crowded screen"
        lead="The editor wasn't just hard to use — it quietly broke create-to-send."
      >
        <div className="grid gap-8 md:grid-cols-2 md:items-start lg:gap-12">
          <ZoomReveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/work/${S}/current-invoice.png`}
              alt="Original QuickBooks invoice editor with payments settings expanded"
              className="block w-full"
            />
          </ZoomReveal>
          <div>
            {/* The scale of the problem, in two numbers */}
            <div className="grid grid-cols-2 gap-6">
              {project.metrics.map((m, i) => (
                <Reveal key={m.label} delay={i * 0.06}>
                  <div>
                    <p
                      className={`${display.className} text-[clamp(2rem,5vw,3.25rem)] font-bold leading-none tracking-tight`}
                      style={{ color: accent }}
                    >
                      {m.value}
                    </p>
                    <p className="mt-2 leading-snug text-ink-soft">{m.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="mt-8 border-t border-line" />
            <Reveal>
              <p className="mt-8 leading-relaxed text-ink-soft">
                QuickBooks tried to do three jobs on one surface:{" "}
                <span className="text-ink">Edit</span> buried line items under
                customer chrome, <span className="text-ink">Settings</span>{" "}
                mashed payments and customization together, and{" "}
                <span className="text-ink">Design</span> hid templates and color
                pickers inside an accordion.
              </p>
            </Reveal>
            <ul className="mt-8 flex flex-col gap-5">
              {VOCS.map((quote, i) => (
                <Reveal key={i} delay={i * 0.04}>
                  <li className="border-l-2 border-line pl-4">
                    <p className="text-[1.05rem] italic leading-relaxed text-ink-soft">
                      &ldquo;{quote}&rdquo;
                    </p>
                    <span className="label mt-2 block uppercase">
                      {i === 0 ? "Edit · layout" : "Design · off-platform"}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── Trade-offs ─────────────────────────────────────────── */}
      {project.strategic.length > 0 && (
        <Section
          label="Trade-offs"
          title="What we optimized for"
          lead="The calls we made when every option had a real downside."
        >
          <ul className="max-w-reading space-y-6">
            {project.strategic.map((s, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <TradeOffItem text={s} img={TRADEOFF_IMAGES[i]} />
              </Reveal>
            ))}
          </ul>
        </Section>
      )}

      {/* ── Process ────────────────────────────────────────────── */}
      <Section
        label="Process"
        title="One AI toolchain, from insight to shipped code"
        lead="The call: split Edit, Settings, and Design into distinct modes — then use AI to run that call end to end, solo, in days instead of quarters."
      >
        <Reveal>
          <p className="max-w-reading leading-relaxed text-ink-soft">
            I clustered Edit-tab VOC into layout principles with{" "}
            <span className="text-ink">Claude</span>, audited every field in
            Figma (essential / conditional / hidden), and built a clickable{" "}
            <span className="text-ink">Edit · Settings · Design</span> prototype
            in <span className="text-ink">Cursor</span> — so leadership reacted
            to real flows, not static frames. That same toolchain carried into
            production: when polish sat in the eng backlog, I opened PRs in the
            codebase and traced defects with Claude. Three examples:
          </p>
        </Reveal>
        <ul className="mt-8 grid list-none items-stretch gap-5 p-0 md:grid-cols-3">
          {SIDE_QUESTS.map((quest, i) => (
            <SideQuestItem key={quest.tag} {...quest} delay={i * 0.04} />
          ))}
        </ul>
      </Section>

      {/* ── Prototype ──────────────────────────────────────────── */}
      <Section
        label="Prototype"
        title="Take it for a spin — Edit, Settings, Design"
      >
        <Reveal>
          <div className="mb-6 flex justify-end">
            <ExternalLink href="/work/intuit/prototype/index.html">
              Open full screen ↗
            </ExternalLink>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="overflow-hidden rounded-xl border border-line bg-paper-raised">
            <iframe
              title="QuickBooks invoicing prototype"
              src="/work/intuit/prototype/index.html"
              className="aspect-[16/10] w-full border-0"
            />
          </div>
        </Reveal>
      </Section>

      {/* ── Impact ─────────────────────────────────────────────── */}
      <Section label="Impact" title="From north-star to shipping product">
        <Reveal>
          <p className="max-w-reading text-lg leading-relaxed text-ink-soft">
            The team now shares one direction — Edit, Settings, and Design as
            separate modes. Payments settings shipped cleaner; Edit and Design
            roll out next (Design targeting August 2026). Throughout, I shipped
            production PRs and fixes rather than waiting for a handoff.
          </p>
        </Reveal>
      </Section>
    </div>
  );
}
