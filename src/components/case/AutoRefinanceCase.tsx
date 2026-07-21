"use client";

import type { CSSProperties } from "react";
import type { Project } from "@/data/projects";
import { Reveal } from "@/components/Reveal";
import {
  caseContentSectionClass,
  caseHeaderClass,
  caseImpactSpacedClass,
  caseInnerClass,
  caseMetricsBorderClass,
  caseMetricsInnerClass,
  caseSectionDividedClass,
  caseSectionRuleClass,
} from "@/components/case/caseLayout";
import { ImpactNote } from "@/components/case/ImpactNote";
import { CaseMeta } from "@/components/case/CaseMeta";
import { LinkedText } from "@/components/LinkedText";

const S = "capital-one-auto-refinance";

const GIF_H = 400;

type GifCorners = "phone" | "light" | "none";

function cornerClass(corners: GifCorners) {
  if (corners === "phone") return "rounded-[2.25rem]";
  if (corners === "light") return "rounded-lg";
  return "";
}

/** GIF display — optional fixed height for matched rows. */
function GifFrame({
  src,
  alt,
  className = "",
  device = "mobile",
  corners,
  fixedHeight = true,
}: {
  src: string;
  alt: string;
  className?: string;
  device?: "mobile" | "desktop";
  corners?: GifCorners;
  fixedHeight?: boolean;
}) {
  const resolvedCorners =
    corners ?? (device === "mobile" ? "phone" : "none");
  const radius = cornerClass(resolvedCorners);

  if (!fixedHeight) {
    return (
      <div className={className}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className={`mx-auto block h-auto max-w-full ${radius}`}
        />
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden bg-paper ${radius} ${className}`}
      style={{ height: GIF_H }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-contain object-center"
        style={
          resolvedCorners === "phone"
            ? { borderRadius: "2.25rem", clipPath: "inset(0 round 2.25rem)" }
            : undefined
        }
      />
    </div>
  );
}

function Chapter({
  step,
  n,
  title,
  image,
  imageAlt,
  problem,
  children,
}: {
  step: string;
  n: string;
  title: string;
  image?: string;
  imageAlt?: string;
  problem: string;
  children: React.ReactNode;
}) {
  return (
    <section className={caseSectionRuleClass}>
      <div className={`${caseInnerClass} py-14 md:py-16`}>
      <div className="mb-8">
        <h2 className="max-w-reading text-title font-semibold leading-snug text-ink">
          {Number(step)}. {n}: {title}
        </h2>
        {image && (
          <figure className="my-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={imageAlt ?? ""}
              className="block w-full rounded-lg border border-line"
            />
          </figure>
        )}
        <p className="label mt-4 uppercase">The problem</p>
        <p className="mt-2 max-w-reading leading-relaxed text-ink-soft">
          {problem}
        </p>
      </div>
      <div className="space-y-8">{children}</div>
      </div>
    </section>
  );
}

function ChapterImpact({ items }: { items: string[] }) {
  return <ImpactNote items={items} />;
}

const JOURNEY_STEPS = [
  {
    title: "Marketing",
    desc: "Direct mailers, EASE (app/website), Creditwise",
  },
  {
    title: "Pre-qualification",
    desc: "Based on personal, vehicle, and loan info, we extend offers — no credit impact.",
  },
  {
    title: "Offers",
    desc: "Options with new term, monthly payment, and APR.",
  },
  {
    title: "Credit application",
    desc: "Hard pull to confirm the offer.",
  },
  {
    title: "Customer portal",
    desc: "Title transfer and income verification when needed.",
  },
] as const;

function JourneyProcess() {
  return (
    <div>
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/work/${S}/process.png`}
          alt="Auto refinance journey: Pre-qualify, Apply, and Finalize"
          className="block w-full"
        />
      </figure>

      <div className="mt-8 hidden grid-cols-5 gap-3 md:grid">
        {JOURNEY_STEPS.map((step) => (
          <div key={step.title}>
            <p className="text-sm font-medium leading-snug">{step.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">
              {step.desc}
            </p>
          </div>
        ))}
      </div>

      <ol className="mt-8 space-y-3 md:hidden">
        {JOURNEY_STEPS.map((step) => (
          <li key={step.title}>
            <p className="text-sm font-medium leading-snug">{step.title}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-ink-soft">
              {step.desc}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function GifPair({
  items,
}: {
  items: { label: string; src: string; caption: string }[];
}) {
  return (
    <div className="mx-auto flex max-w-[min(100%,520px)] items-start justify-center gap-4 sm:gap-5">
      {items.map((item) => (
        <figure
          key={item.src}
          className="flex min-w-0 flex-1 flex-col items-center text-center"
        >
          <p className="label mb-3 uppercase">{item.label}</p>
          <GifFrame
            src={item.src}
            alt={item.caption}
            corners="light"
            fixedHeight={false}
            className="w-full max-w-[220px]"
          />
          <figcaption className="mt-3 max-w-[24ch] text-sm leading-snug text-ink-faint">
            {item.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function PrequalAfterRow() {
  const items = [
    {
      label: "After · Mobile",
      src: `/work/${S}/prequal-after-mobile.gif`,
      caption: "Guided stepper with conversational copy",
      col: "md:col-span-1",
      frameClass: "w-full",
      device: "mobile" as const,
    },
    {
      label: "After · Desktop",
      src: `/work/${S}/prequal-after-desktop.gif`,
      caption: "Same journey, adapted for desktop",
      col: "md:col-span-3",
      frameClass: "w-full",
      device: "desktop" as const,
    },
  ] as const;

  return (
    <div className="grid gap-8 md:grid-cols-4">
      {items.map((item) => (
        <figure
          key={item.src}
          className={`flex flex-col items-center text-center ${item.col}`}
        >
          <p className="label mb-3 uppercase">{item.label}</p>
          <GifFrame
            src={item.src}
            alt={item.caption}
            device={item.device}
            className={item.frameClass}
          />
          <figcaption className="mt-3 max-w-[32ch] text-sm leading-snug text-ink-faint">
            {item.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

const APPLY_EXPLORATIONS = [
  { label: "Before", src: "explore-before.png", emphasize: true },
  { label: "A", src: "explore-a.png", emphasize: false },
  { label: "B", src: "explore-b.png", emphasize: false },
  { label: "C", src: "explore-c.png", emphasize: false },
  { label: "D", src: "explore-d.png", emphasize: true },
] as const;

function ApplyExplorations() {
  return (
    <figure>
      <p className="label mb-4 uppercase">Explorations</p>
      <div className="grid grid-cols-5 gap-x-1.5 sm:gap-x-2">
        {APPLY_EXPLORATIONS.map((item) => (
          <div key={item.label} className="flex min-w-0 flex-col items-center">
            <p
              className="label mb-2 whitespace-nowrap uppercase text-ink"
              style={{ fontSize: "clamp(0.55rem, 2.4vw, 0.72rem)" }}
            >
              {item.label}
            </p>
            <div className="overflow-hidden bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/work/${S}/${item.src}`}
                alt={`Offer exploration ${item.label}`}
                className="block w-full scale-[1.06] object-contain object-top"
              />
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-sm text-ink-faint">
        Five savings framings — D won for honest tone, not a hard sell
      </figcaption>
    </figure>
  );
}

const PAIN_POINTS = [
  {
    n: "01",
    t: "Emotional uncertainty",
    d: "A big financial decision with too little reassurance.",
    img: `/work/${S}/pain-emotional-uncertainty.png`,
  },
  {
    n: "02",
    t: "Poor information hierarchy",
    d: "Hard to understand the process or compare an offer.",
    img: `/work/${S}/pain-information-hierarchy.png`,
  },
  {
    n: "03",
    t: "No personalization",
    d: "The flow didn't adapt to co-borrowers, self-employment, or multiple incomes.",
    img: `/work/${S}/pain-personalization.png`,
  },
] as const;

export function AutoRefinanceCase({ project }: { project: Project }) {
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
            src={`/work/${S}/hero.gif`}
            alt="Auto refinance journey across desktop and mobile"
            className="block w-full"
          />
        </figure>
      </header>

      <CaseMeta>
        {[
          { label: "Role", value: project.role },
          { label: "Timeline", value: project.duration ?? project.year },
          { label: "Platforms", value: "Desktop · Mobile" },
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

      <section className="accent-bg">
        <div className="mx-auto max-w-[900px] px-6 py-10 md:py-12">
        <Reveal>
          <div className="space-y-2.5 leading-relaxed text-ink-soft">
            <p className="label uppercase">Context</p>
            <h2 className="text-title font-semibold text-ink">
              A high-stakes journey
            </h2>
            <p className="max-w-reading text-[0.975rem] leading-relaxed md:text-base">
              <LinkedText text={project.overview} links={project.links} />
            </p>
            <div className="pt-8">
              <JourneyProcess />
            </div>
          </div>
        </Reveal>
        </div>
      </section>

      <section className={caseSectionRuleClass}>
        <div className="mx-auto max-w-[900px] px-6 py-10 md:py-14">
        <Reveal>
          <h2 className="text-title font-semibold text-ink">Approach</h2>
          <p className="mt-3 max-w-reading text-[0.975rem] leading-relaxed text-ink-soft md:text-base">
            Exit surveys with 1,000 drop-out customers and call-center
            interviews surfaced three pain points that set my design goals.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-10 md:grid-cols-3">
          {PAIN_POINTS.map((p) => (
            <Reveal key={p.n} delay={Number(p.n) * 0.05}>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.img}
                  alt=""
                  className="mb-4 h-28 w-full object-contain object-left"
                />
                <p className="label uppercase">Pain point {p.n}</p>
                <h3 className="mt-2 font-semibold text-ink">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        </div>
      </section>

      <Chapter
        step="01"
        n="Pre-qualify"
        title="From an endless scroll to a guided path"
        problem="Mobile traffic nearly doubled desktop, but completion lagged on one long, unpersonalized page that overwhelmed users."
      >
        <Reveal>
          <figure>
            <p className="label mb-2 uppercase">Before</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/work/${S}/prequal-before-breakdown.png`}
              alt="One long form broken into its component sections"
              className="block w-full object-contain"
            />
          </figure>
        </Reveal>
        <Reveal>
          <div className="max-w-reading">
            <p className="label mb-2 uppercase">The solution</p>
            <p className="leading-relaxed text-ink-soft">
              I broke it into a seven-step guided journey.
            </p>
          </div>
        </Reveal>
        <Reveal>
          <PrequalAfterRow />
        </Reveal>
        <Reveal>
          <ChapterImpact
            items={[
              "<strong>+7.2%</strong> lift in sign-in to submit application rate",
              "<strong>+4.7%</strong> lift in sign-in to contract rate",
              "Became the new control for both mobile and desktop",
            ]}
          />
        </Reveal>
      </Chapter>

      <Chapter
        step="02"
        n="Apply"
        title="Honesty converted better than a hard sell"
        problem="People hesitated when committing to a hard credit pull."
      >
        <Reveal>
          <div className="max-w-reading">
            <p className="label mb-2 uppercase">The solution</p>
            <p className="leading-relaxed text-ink-soft">
              Interviews showed people mostly wanted one thing: how much
              they&apos;d save. I explored several ways to{" "}
              <span className="whitespace-nowrap">show it.</span>
            </p>
          </div>
        </Reveal>
        <Reveal>
          <ApplyExplorations />
        </Reveal>
        <Reveal>
          <p className="max-w-reading leading-relaxed text-ink-soft">
            The unexpected winner was{" "}
            <span className="font-medium text-ink">D</span> — by{" "}
            <em>not</em> overselling the benefit, it read as honest, not
            &ldquo;sales-y,&rdquo; which raised confidence. I also made the
            hierarchy transparent that{" "}
            <span className="text-ink">
              99% of users pass the hard credit pull
            </span>
            , helping people commit to submit.
          </p>
        </Reveal>
        <Reveal>
          <GifPair
            items={[
              {
                label: "Before",
                src: `/work/${S}/apply-before-offers.gif`,
                caption: "Dense cards — savings hard to compare",
              },
              {
                label: "After",
                src: `/work/${S}/apply-after-offers.gif`,
                caption: "Loan anchor + clearer offer hierarchy",
              },
            ]}
          />
        </Reveal>
        <Reveal>
          <ChapterImpact
            items={[
              "<strong>+4%</strong> relative increase in application-to-contract rate (statistically significant)",
              "≈ <strong>$200MM</strong> incremental annual originations and <strong>$3.5MM</strong> marginal NPV annually",
            ]}
          />
        </Reveal>
      </Chapter>

      <Chapter
        step="03"
        n="Finalize"
        title="Verifying income without losing people"
        image={`/work/${S}/finicitywireflow.png`}
        imageAlt="Wireframe flow for the redesigned Finicity income-verification steps"
        problem="Borrowers had to manually upload income documents, and joint borrowers had no way to verify income at all."
      >
        <Reveal>
          <div className="max-w-reading">
            <p className="label mb-2 uppercase">The solution</p>
            <p className="leading-relaxed text-ink-soft">
              We partnered with Finicity to replace manual uploads. I designed
              the verification flow, plus a new joint-borrower path that
              hadn&apos;t existed before, inside Capital One&apos;s web
              experience.
            </p>
          </div>
        </Reveal>
        <Reveal>
          <GifPair
            items={[
              {
                label: "Before",
                src: `/work/${S}/finalize-before-finicity.gif`,
                caption: "Manual document upload — no joint-borrower path",
              },
              {
                label: "After",
                src: `/work/${S}/finalize-after-finicity.gif`,
                caption: "Finicity flow with joint-borrower verification",
              },
            ]}
          />
        </Reveal>
        <Reveal>
          <ChapterImpact
            items={[
              "Finicity adoption rate increased from <strong>26% to 37%</strong>",
              "Exit surveys pointed to more bank options as the biggest next opportunity",
            ]}
          />
        </Reveal>
      </Chapter>

      <section className={caseSectionDividedClass}>
        <div className={caseContentSectionClass}>
        <Reveal>
          <div className="max-w-reading space-y-4">
            <h2 className="text-title font-semibold">What stuck with me</h2>
            <p className="text-lg leading-relaxed text-ink-soft">
              Every screen asked for more trust than the last, and the wins
              compounded —{" "}
              <span className="text-ink">
                +7.2% submit, +4% to contract, Finicity adoption up 11 points
              </span>
              . The through-line was never a flashier pitch, just telling people
              where they were, what they&apos;d save, and what came next — work
              that earned Capital One&apos;s &ldquo;I am Giant&rdquo; award.
            </p>
          </div>
        </Reveal>
        </div>
      </section>
    </div>
  );
}
