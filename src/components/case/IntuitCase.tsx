"use client";

import type { CSSProperties, ReactNode } from "react";
import type { Project } from "@/data/projects";
import { Reveal } from "@/components/Reveal";
import { ExternalLink } from "@/components/LinkedText";
import {
  caseContentSectionClass,
  caseHeaderClass,
  caseImpactSpacedClass,
  caseImpactDividerClass,
  caseSectionDividedClass,
  caseSectionDividedInnerClass,
  caseSectionClass,
} from "@/components/case/caseLayout";
import { CaseMeta } from "@/components/case/CaseMeta";

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
        <div className="flex h-full flex-col rounded-lg border border-line bg-paper-raised p-5">
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

function ProblemScreenshot({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="block w-full rounded-lg border border-line bg-paper-raised"
      />
    </figure>
  );
}

function Block({
  label,
  title,
  lead,
  children,
  border = false,
}: {
  label: string;
  title: string;
  lead?: string;
  children: ReactNode;
  border?: boolean;
}) {
  return (
    <section className={border ? caseSectionDividedClass : undefined}>
      <div className={border ? caseSectionDividedInnerClass : caseSectionClass}>
      <Reveal>
        <p className="label uppercase">{label}</p>
        <h2 className="mt-2 text-title font-semibold">{title}</h2>
        {lead && (
          <p className="mt-4 max-w-reading leading-relaxed text-ink-soft">
            {lead}
          </p>
        )}
      </Reveal>
      {children}
      </div>
    </section>
  );
}

export function IntuitCase({ project }: { project: Project }) {
  return (
    <div style={{ "--proj-accent": project.accent } as CSSProperties}>
      <header className={caseHeaderClass}>
        <p className="label mb-6 uppercase">{project.client}</p>
        <h1 className="max-w-3xl text-balance text-hero font-semibold">
          {project.title}
        </h1>
        <p className="mt-5 text-lg text-ink-soft md:whitespace-nowrap">
          {project.subtitle}
        </p>
        <figure className="mt-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/work/${S}/hero.png`}
            alt="QuickBooks invoicing across desktop, tablet, and mobile"
            className="block w-full"
          />
        </figure>
      </header>

      <CaseMeta>
        {[
          { label: "Role", value: project.role },
          { label: "Year", value: project.year },
          { label: "Platform", value: "Desktop · Web" },
          { label: "AI tools", value: "Claude · Cursor" },
        ].map((m) => (
          <div key={m.label}>
            <dt className="label mb-1 uppercase">{m.label}</dt>
            <dd className="leading-snug text-ink-soft">{m.value}</dd>
          </div>
        ))}
      </CaseMeta>

      <section className={`${caseImpactDividerClass} accent-bg`}>
        <div className={caseImpactSpacedClass}>
        <Reveal>
          <p className="max-w-reading text-title font-medium leading-snug">
            {project.impact}
          </p>
        </Reveal>
        </div>
      </section>

      <section className={caseContentSectionClass}>
        <Reveal>
          <p className="label uppercase">Problem</p>
          <h2 className="mt-2 text-title font-semibold">
            Three jobs, one crowded screen
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-8 md:grid-cols-[minmax(260px,40%)_minmax(0,1fr)] md:items-start lg:gap-10">
          <Reveal delay={0.05}>
            <ProblemScreenshot
              src={`/work/${S}/problem-editor.png`}
              alt="Original QuickBooks invoice editor with payments settings expanded"
              className="md:sticky md:top-8"
            />
          </Reveal>
          <div>
            <Reveal>
              <p className="max-w-reading leading-relaxed text-ink-soft">
                Among mid-market customers who complained about the Edit tab,{" "}
                <span className="text-ink">~64%</span> created an invoice in
                QuickBooks but never sent it —{" "}
                <span className="text-ink">over $13B</span> in unsent value
                across millions of invoices. The editor wasn&apos;t just hard to
                use; it was breaking create-to-send.
              </p>
            </Reveal>
            <Reveal delay={0.03}>
              <p className="mt-4 max-w-reading leading-relaxed text-ink-soft">
                QuickBooks tried to do three jobs on one surface:{" "}
                <span className="text-ink">Edit</span> buried line items under
                customer chrome, <span className="text-ink">Settings</span>{" "}
                mashed payments and customization together, and{" "}
                <span className="text-ink">Design</span> hid templates and color
                pickers inside an accordion.
              </p>
            </Reveal>
            <ul className="mt-6 flex flex-col gap-4">
              {VOCS.map((quote, i) => (
                <Reveal key={i} delay={i * 0.04}>
                  <li className="border-l-2 border-line pl-4">
                    <p className="text-[0.95rem] italic leading-relaxed text-ink-soft">
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
      </section>

      {project.strategic.length > 0 && (
        <section className={caseSectionDividedClass}>
          <div className={caseSectionDividedInnerClass}>
          <Reveal>
            <p className="label uppercase">Trade-offs</p>
            <h2 className="mt-2 text-title font-semibold">
              What we optimized for
            </h2>
            <p className="mt-3 max-w-reading leading-relaxed text-ink-soft">
              The calls we made when every option had a real downside.
            </p>
          </Reveal>
          <ul className="mt-6 max-w-reading space-y-5">
            {project.strategic.map((s, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <TradeOffItem text={s} img={TRADEOFF_IMAGES[i]} />
              </Reveal>
            ))}
          </ul>
          </div>
        </section>
      )}

      <Block
        label="Process"
        title="An AI-accelerated toolchain, from insight to shipped code"
        lead="The core decision: distinct Edit, Settings, and Design modes. AI is what let me run that decision end to end — research, prototyping, and production — solo and in days, not quarters."
        border
      >
        <Reveal>
          <div className="mt-4 max-w-reading space-y-4 leading-relaxed text-ink-soft">
            <p>
              I clustered Edit-tab VOC into layout principles with{" "}
              <span className="text-ink">Claude</span>, audited every field in
              Figma (essential / conditional / hidden), and built a clickable{" "}
              <span className="text-ink">Edit · Settings · Design</span>{" "}
              prototype in <span className="text-ink">Cursor</span> — so
              leadership reacted to real flows, not static frames. That same
              toolchain carried into production: when polish sat in the eng
              backlog, I opened PRs in the codebase and traced defects with
              Claude. Three examples:
            </p>
          </div>
        </Reveal>
        <ul className="mt-8 grid list-none items-stretch gap-5 p-0 md:grid-cols-3">
          {SIDE_QUESTS.map((quest, i) => (
            <SideQuestItem key={quest.tag} {...quest} delay={i * 0.04} />
          ))}
        </ul>
      </Block>

      <section className={caseSectionDividedClass}>
        <div className={caseSectionDividedInnerClass}>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label uppercase">Prototype</p>
              <h2 className="mt-2 text-title font-semibold">
                Take it for a spin — Edit, Settings, Design
              </h2>
            </div>
            <ExternalLink href="/work/intuit/prototype/index.html">
              Open full screen ↗
            </ExternalLink>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-5 overflow-hidden rounded-lg border border-line bg-paper-raised">
            <iframe
              title="QuickBooks invoicing prototype"
              src="/work/intuit/prototype/index.html"
              className="aspect-[16/10] w-full border-0"
            />
          </div>
        </Reveal>
        </div>
      </section>

      <section className={caseSectionDividedClass}>
        <div className={caseSectionDividedInnerClass}>
        <Reveal>
          <p className="label uppercase">Impact</p>
          <h2 className="mt-2 text-title font-semibold">
            From north-star to shipping product
          </h2>
          <p className="mt-4 max-w-reading leading-relaxed text-ink-soft">
            The team now shares one direction — Edit, Settings, and Design as
            separate modes. Payments settings shipped cleaner; Edit and Design
            roll out next (Design targeting August 2026). Throughout, I shipped
            production PRs and fixes rather than waiting for a handoff.
          </p>
        </Reveal>
        </div>
      </section>
    </div>
  );
}
