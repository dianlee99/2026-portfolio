"use client";

import type { CSSProperties, ReactNode } from "react";
import type { Project } from "@/data/projects";
import { Reveal } from "@/components/Reveal";
import { CaseMeta } from "@/components/case/CaseMeta";
import {
  caseContentSectionClass,
  caseDividerInnerClass,
  caseDividerSectionClass,
  caseHeaderClass,
  caseImpactSpacedClass,
  caseMetricsBorderClass,
  caseMetricsInnerClass,
  caseSectionDividedClass,
  caseSectionDividedInnerClass,
} from "@/components/case/caseLayout";

const S = "capital-one-data";

function Figure({
  src,
  alt,
  caption,
  className = "",
  frameClassName = "",
  imgClassName = "block w-full",
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  frameClassName?: string;
  imgClassName?: string;
}) {
  const img = (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src={src} alt={alt} className={imgClassName} />
  );

  return (
    <figure className={className}>
      {frameClassName ? <div className={frameClassName}>{img}</div> : img}
      {caption && (
        <figcaption className="mt-2 text-sm leading-snug text-ink-faint">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function Flow({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className={caseDividerSectionClass}>
      <div className={caseDividerInnerClass}>
        <div className="mb-8">
          <p className="label uppercase">Flow · {n}</p>
          <h2 className="mt-2 text-title font-semibold">{title}</h2>
        </div>
        <div className="space-y-8">{children}</div>
      </div>
    </section>
  );
}

export function DataRegistryCase({ project }: { project: Project }) {
  return (
    <div style={{ "--proj-accent": project.accent } as CSSProperties}>
      <header className={caseHeaderClass}>
        <p className="label mb-6 uppercase">{project.client}</p>
        <h1 className="max-w-3xl text-hero font-semibold">{project.title}</h1>
        <p className="mt-5 text-lg text-ink-soft md:whitespace-nowrap">
          {project.subtitle}
        </p>
        <figure className="mt-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/work/${S}/hero.png`}
            alt="Data usage registry dashboard with search, status badges, and mapped datasets"
            className="block w-full"
          />
        </figure>
      </header>

      <CaseMeta>
        {[
          { label: "Role", value: project.role },
          { label: "Timeline", value: project.duration ?? project.year },
          { label: "Platform", value: "Desktop · Internal" },
          { label: "Team", value: "PM + 5 engineers" },
        ].map((m) => (
          <div key={m.label}>
            <dt className="label mb-1">{m.label}</dt>
            <dd className="text-ink-soft">{m.value}</dd>
          </div>
        ))}
      </CaseMeta>

      <section className="accent-bg">
        <div className={caseImpactSpacedClass}>
          <Reveal>
            <p className="max-w-reading text-title font-medium leading-snug">
              {project.impact}
            </p>
          </Reveal>
        </div>
      </section>

      <section className={caseMetricsBorderClass}>
        <div className={caseMetricsInnerClass}>
          <div className="grid gap-8 sm:grid-cols-3">
            {project.metrics.map((m, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div>
                  <p className="text-hero font-semibold leading-none">
                    {m.value}
                  </p>
                  <p className="mt-2 text-sm text-ink-soft">{m.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Context */}
      <section className="accent-bg">
        <div className={caseContentSectionClass}>
        <Reveal>
          <div className="max-w-reading">
            <p className="label uppercase">Context</p>
            <h2 className="mt-2 text-title font-semibold">
              A system of record for data usages
            </h2>
            <p className="mt-4 leading-relaxed text-ink-soft">
              {project.overview}
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.04}>
          <Figure
            className="mx-auto mt-8 w-full max-w-[88%] md:max-w-[82%]"
            src={`/work/${S}/data-usage-diagram.png`}
            alt="Diagram showing datasets feeding elements consumed into a data usage and data outputs"
            imgClassName="mx-auto block w-full"
          />
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-10 max-w-reading leading-relaxed text-ink-soft md:mt-12">
            A <span className="text-ink">data usage</span> consumes elements
            from one or more datasets to produce an output. Here&apos;s an
            example.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <Figure
            className="mx-auto mt-6 w-full max-w-[88%] md:max-w-[82%]"
            src={`/work/${S}/data-usage-example.png`}
            alt="Example flow from customer income dataset through Ability to Pay assessment to a new credit line"
            imgClassName="mx-auto block w-full"
          />
        </Reveal>
        </div>
      </section>

      {/* Problem */}
      <section className={caseDividerSectionClass}>
        <div className={caseDividerInnerClass}>
        <Reveal>
          <p className="label uppercase">Problem</p>
          <h2 className="mt-2 text-title font-semibold">
            A costly, disconnected legacy platform
          </h2>
          <p className="mt-4 max-w-reading leading-relaxed text-ink-soft">
            Capital One used a third-party tool to manage{" "}
            <span className="text-ink">~4,000 data usages</span> — including
            hundreds of high-priority usages and tens of thousands of
            high-priority data elements. Workflows were disconnected from the
            internal data platform, the UI was slow and manual, and the vendor
            was migrating to a costly SaaS model.
          </p>
          <p className="mt-4 max-w-reading leading-relaxed text-ink-soft">
            We chose to build a new system of record, integrated into
            Capital One&apos;s internal data platform — for cost, control, and
            the customization a bought tool couldn&apos;t offer.
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <Figure
            className="mt-8"
            src={`/work/${S}/legacy-platform.png`}
            alt="The third-party Enterprise Data Management tool for data usages"
            caption="The third-party tool we replaced: dense tables, manual filters, no platform integration"
          />
        </Reveal>
        </div>
      </section>

      {/* Timeline + Role */}
      <section className={caseDividerSectionClass}>
        <div className={caseDividerInnerClass}>
        <div className="grid gap-12 md:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="text-title font-semibold">Timeline</h2>
              <p className="mt-4 leading-relaxed text-ink-soft">
                Onboarding to production launch and full decommission of the
                third-party tool in ~9 months (mid-2024 to mid-2025).
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div>
              <h2 className="text-title font-semibold">My role</h2>
              <p className="mt-4 leading-relaxed text-ink-soft">
                <span className="text-ink">
                  Sole designer across 70+ screens.
                </span>{" "}
                I led end-to-end desktop design in tight “parallel-path”
                lockstep with product and 5+ engineers.
              </p>
            </div>
          </Reveal>
        </div>
        </div>
      </section>

      {/* Research */}
      <section className={caseDividerSectionClass}>
        <div className={caseDividerInnerClass}>
        <Reveal>
          <div className="max-w-reading">
            <p className="label uppercase">Research</p>
            <h2 className="mt-2 text-title font-semibold">
              Reverse-engineering the old tool
            </h2>
            <p className="mt-4 leading-relaxed text-ink-soft">
              I reverse-engineered the old tool — mapping every flow, pain
              point, and requirement — and studied our internal patterns so new
              ones would align. The audience was broad: first-line consumers,
              producers, and leadership, plus second-line stewards, risk
              officers, and validators.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.04}>
          <div className="mt-6 flex items-start gap-5 md:gap-6">
            <figure className="min-w-0 flex-[1.8]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/work/${S}/research-user-flow.png`}
                alt="Brain dump mapping create, approve, search, and edit user flows"
                className="block h-56 w-full object-contain object-left md:h-72 lg:h-80"
              />
              <figcaption className="mt-2 text-sm leading-snug text-ink-faint">
                User flow brain dump
              </figcaption>
            </figure>
            <figure className="min-w-0 flex-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/work/${S}/research-notes.png`}
                alt="Handwritten research notes and early UI sketches in a notebook"
                className="block h-56 w-full object-contain object-left md:h-72 lg:h-80"
              />
              <figcaption className="mt-2 text-sm leading-snug text-ink-faint">
                Research notes
              </figcaption>
            </figure>
          </div>
        </Reveal>
        </div>
      </section>

      {/* Flow 1 — Registration */}
      <Flow n="Registration" title="From emailed spreadsheets to a guided flow">
        <Reveal>
          <p className="max-w-reading leading-relaxed text-ink-soft">
            The old tool made users hand-enter up to{" "}
            <span className="text-ink">3,800 elements</span> into spreadsheets
            and email them to admins.
          </p>
        </Reveal>
        <Reveal>
          <Figure
            src={`/work/${S}/Registration_Assets.gif`}
            alt="Guided data usage registration flow"
            caption="A guided registration flow — step-by-step through input assets"
          />
        </Reveal>
        <Reveal>
          <p className="max-w-reading leading-relaxed text-ink-soft">
            Drawer to drill into a dataset without losing the full list.
          </p>
        </Reveal>
      </Flow>

      {/* Flow 2 — Approve and Manage */}
      <Flow n="Approve & Manage" title="A color-coded system for governance">
        <Reveal>
          <p className="max-w-reading leading-relaxed text-ink-soft">
            Color-coded status, priority, risk, and assessment badges made dense
            governance easy to scan.
          </p>
        </Reveal>
        <Reveal>
          <Figure
            src={`/work/${S}/Approve.gif`}
            alt="Approve and manage data usages with color-coded badges"
            caption="Owner dashboard: published, awaiting approval, and draft usages"
          />
        </Reveal>
        <Reveal>
          <p className="max-w-reading leading-relaxed text-ink-soft">
            Owners got a dashboard to review, filter, and act on every usage. I
            aligned it with senior leadership repeatedly, since executives would
            approve inside the tool themselves.
          </p>
        </Reveal>
      </Flow>

      {/* Flow 3 — Search and View */}
      <Flow n="Search & View" title="Prioritizing what people actually needed">
        <Reveal>
          <p className="max-w-reading leading-relaxed text-ink-soft">
            A card sort showed status and mapped datasets mattered most.
          </p>
        </Reveal>
        <Reveal>
          <Figure
            src={`/work/${S}/Search_3_output.gif`}
            alt="Search and view data usage details with status bar and mapped datasets"
            caption="Details page: status bar + mapped datasets"
          />
        </Reveal>
        <Reveal>
          <p className="max-w-reading leading-relaxed text-ink-soft">
            Mapped datasets lead, with a color-coded status bar on top.
          </p>
        </Reveal>
      </Flow>

      {/* Impact */}
      <section className={caseSectionDividedClass}>
        <div className={caseSectionDividedInnerClass}>
        <Reveal>
          <p className="label uppercase">Impact</p>
          <h2 className="mt-2 text-title font-semibold">
            From third-party tool to internal system of record
          </h2>
          <p className="mt-4 max-w-reading leading-relaxed text-ink-soft">
            We shipped a new internal data-usage inventory built in-house,
            contributed new patterns and component hierarchy back to the
            platform, and got positive early feedback on visibility and
            governance — enough to fully decommission the third-party SaaS tool.
          </p>
        </Reveal>
        </div>
      </section>
    </div>
  );
}
