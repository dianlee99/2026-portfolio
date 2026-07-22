"use client";

import type { CSSProperties, ReactNode } from "react";
import type { Project } from "@/data/projects";
import { Reveal } from "@/components/Reveal";
import { CaseMeta } from "@/components/case/CaseMeta";
import { CaseHeroImage } from "@/components/case/CaseHeroImage";
import { display } from "@/lib/displayFont";
import {
  caseContentSectionClass,
  caseHeaderClass,
  caseImpactSectionClass,
  caseImpactDividerClass,
  caseInnerClass,
  caseMetricsBorderClass,
  caseMetricsInnerClass,
  caseSectionDividedClass,
  caseSectionDividedInnerClass,
} from "@/components/case/caseLayout";
import { ExternalLink } from "@/components/LinkedText";

/** Mobile screenshot — natural aspect, no crop. */
function PhoneShot({
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
        className="mx-auto block w-full max-w-[220px] rounded-lg"
      />
    </figure>
  );
}

/** Section header for edge-case blocks — matches shared case study template. */
function EdgeBlock({
  eyebrow,
  question,
  children,
}: {
  eyebrow: string;
  question: string;
  children: ReactNode;
}) {
  return (
    <section className={caseSectionDividedClass}>
      <div className={caseSectionDividedInnerClass}>
      <Reveal>
        <p className="label uppercase">{eyebrow}</p>
        <h2 className="mt-2 max-w-2xl text-title font-semibold leading-snug">
          {question}
        </h2>
      </Reveal>
      {children}
      </div>
    </section>
  );
}

const S = "eureka-surveys";

function PlatformLinks({ links }: { links: Project["links"] }) {
  const ios = links?.find((l) => l.text === "iOS");
  const web = links?.find((l) => l.text === "Web");
  if (!ios || !web) return <>iOS / Web</>;

  return (
    <>
      <ExternalLink href={ios.href}>iOS</ExternalLink>
      {" / "}
      <ExternalLink href={web.href}>Web</ExternalLink>
    </>
  );
}

const HOW_IT_WORKS = [
  {
    step: "01 · Sign up",
    title: "Web-first, for security",
    body: "Because this was a cash app, sign-up ran through the web with sensitive edge cases handled up front before users reached the app.",
    src: `/work/${S}/howitworks1.gif`,
    alt: "Eureka sign-up flow on web",
  },
  {
    step: "02 · Earn",
    title: "Three survey types",
    body: "Quick surveys onboard and profile users; sweepstake surveys generate revenue; daily polls keep people coming back, all with micro-interactions and light gamification.",
    src: `/work/${S}/howitworks2.gif`,
    alt: "Survey types and earning flow in the app",
  },
  {
    step: "03 · Cash out",
    title: "PayPal or gift cards",
    body: "Once a balance passes $5, users cash out to PayPal or a catalog of gift cards: the payoff that makes the loop worth finishing.",
    src: `/work/${S}/howitworks3.gif`,
    alt: "Cash-out options — PayPal and gift cards",
  },
] as const;

export function EurekaCase({ project }: { project: Project }) {
  return (
    <div style={{ "--proj-accent": project.accent } as CSSProperties}>
      {/* ── Header (matches shared case study template) ────── */}
      <header className={caseHeaderClass}>
        <p className="label mb-6 uppercase">{project.client}</p>
        <h1 className="max-w-3xl text-hero font-semibold">
          Designing the #1 survey app on iOS
        </h1>
        <p className="mt-5 max-w-4xl text-lg text-ink-soft">
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

      <CaseHeroImage
        src={`/work/${S}/hero.png`}
        alt="Eureka Surveys app on iOS — survey dashboard, completion, and in-progress screens"
        priority
      />

      <CaseMeta>
        {[
          { label: "Role", value: project.role },
          { label: "Timeline", value: project.duration ?? project.year },
          { label: "Platforms", value: "iOS · Web" },
          { label: "Team", value: "5-person startup" },
        ].map((m) => (
          <div key={m.label}>
            <dt className="label mb-1">{m.label}</dt>
            <dd className="text-ink-soft">{m.value}</dd>
          </div>
        ))}
      </CaseMeta>

      {/* ── Impact lead ────────────────────────────────────── */}
      <section className={`${caseImpactDividerClass} accent-bg border-t border-line`}>
        <div className={caseImpactSectionClass}>
        <Reveal>
          <p className="label uppercase">TL;DR</p>
          <p className="mt-4 max-w-4xl text-title font-semibold leading-snug text-ink">
            {project.impact}
          </p>
        </Reveal>
        </div>
      </section>

      {/* ── Metrics ────────────────────────────────────────── */}
      <section className={caseMetricsBorderClass}>
        <div className={caseMetricsInnerClass}>
          <div className="grid gap-10 sm:grid-cols-3">
          {project.metrics.map((m, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div>
                <p
                  className={`${display.className} text-[clamp(2.5rem,7vw,4rem)] font-bold leading-none tracking-tight`}
                  style={{ color: project.accent }}
                >
                  {m.value === "iOS / Web" ? (
                    <PlatformLinks links={project.links} />
                  ) : (
                    m.value
                  )}
                </p>
                <p className="mt-3 text-sm text-ink-soft">{m.label}</p>
              </div>
            </Reveal>
          ))}
          </div>
        </div>
      </section>

      {/* ── Context + what I did ───────────────────────────── */}
      <section>
        <div className={caseContentSectionClass}>
        <Reveal>
          <p className="label uppercase">Context</p>
          <p className="mt-2 max-w-reading text-lg leading-relaxed text-ink-soft">
            {project.overview}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-10">
            <h2 className="label mb-4 uppercase">What I did</h2>
            <ul className="grid list-disc grid-cols-1 gap-x-12 gap-y-2 pl-5 md:grid-cols-2 md:max-w-3xl">
              {project.contribution.map((c, i) => (
                <li key={i} className="text-ink-soft">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        </div>
      </section>

      {/* ── How it works (condensed) ───────────────────────── */}
      <section className="mx-auto max-w-[900px] px-6 py-16 md:py-20">
        <h2 className="text-title font-semibold">How Eureka works</h2>
        <p className="mt-3 max-w-reading text-ink-soft">
          Onboard fast, then steer users to revenue-driving sweepstakes.
        </p>

        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {HOW_IT_WORKS.map((item, i) => (
            <Reveal key={item.step} delay={i * 0.05}>
              <div>
                <figure className="mb-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="mx-auto block w-full max-w-[220px] rounded-lg"
                  />
                </figure>
                <p className="label uppercase">{item.step}</p>
                <h3 className="mt-2 font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Framing the craft ──────────────────────────────── */}
      <section className="mx-auto max-w-[900px] px-6 pb-12 md:pb-16">
        <Reveal>
          <div className="max-w-reading">
            <h2 className="text-title font-semibold">
              The interesting problems were at the edges
            </h2>
            <p className="mt-4 leading-relaxed text-ink-soft">
              As the lead designer at a five-person startup, my work spanned
              research, iOS and responsive web, client-facing tools, and SEO
              pages. But the decisions I&apos;m proudest of came from the messy
              edge cases: the moments where a cash app can quietly lose a
              user&apos;s trust. Here are four.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── Unexpected survey interruptions ────────────────── */}
      <EdgeBlock
        eyebrow="Edge cases"
        question="Unexpected survey interruptions"
      >
        <div className="mt-10 space-y-24 md:space-y-28">
        {/* Interruption 1 */}
        <Reveal>
          <div className="grid items-start gap-10 md:grid-cols-2">
            <div className="grid grid-cols-2 gap-4">
              <PhoneShot
                src={`/work/${S}/edge2-terminated.png`}
                alt="Partial reward when a survey ends early"
              />
              <PhoneShot
                src={`/work/${S}/edge2-closed.png`}
                alt="Survey no longer available"
              />
            </div>
            <div>
              <p className="label uppercase">Interruption 1</p>
              <h3 className="mt-2 text-title font-semibold">Survey terminated</h3>
              <p className="mt-4 leading-relaxed text-ink-soft">
                Third-party surveys could cut users off mid-way — completion as
                low as <span className="font-semibold text-ink">5%</span>. I
                introduced a{" "}
                <span className="font-semibold text-ink">
                  &ldquo;rewards for terminated&rdquo;
                </span>{" "}
                pattern: a partial payout when a survey ended short, so effort
                never felt wasted.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Interruption 2 */}
        <Reveal>
          <div className="grid items-start gap-10 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <p className="label uppercase">Interruption 2</p>
              <h3 className="mt-2 text-title font-semibold">
                Low survey supply
              </h3>
              <p className="mt-4 leading-relaxed text-ink-soft">
                Supply is seasonal, so an empty home screen can read as a broken
                app. I used{" "}
                <span className="font-semibold text-ink">honest banners</span>{" "}
                telling users when to check back or when payouts were high, and
                added a{" "}
                <span className="font-semibold text-ink">Daily Poll</span> — one
                lightweight question — to hold engagement when supply was low.
              </p>
            </div>
            <div className="order-1 grid grid-cols-2 gap-4 md:order-2">
              <PhoneShot
                src={`/work/${S}/edge2-banner-empty.png`}
                alt="Banner when survey supply is low"
              />
              <PhoneShot
                src={`/work/${S}/edge2-daily-poll.png`}
                alt="Daily Poll survey on mobile"
              />
            </div>
          </div>
        </Reveal>

        {/* Interruption 3 */}
        <Reveal>
          <div className="grid items-start gap-10 md:grid-cols-2">
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/work/${S}/edge2-loading.png`}
                alt="Sign-up form with disabled CTA and spinner on the button"
                className="block w-full rounded-lg"
              />
            </figure>
            <div>
              <p className="label uppercase">Interruption 3</p>
              <h3 className="mt-2 text-title font-semibold">
                Delayed loading &amp; rage-clicks
              </h3>
              <p className="mt-4 leading-relaxed text-ink-soft">
                Users were rage-clicking the Sign-Up button through a loading
                modal. I grayed out the CTA and moved the spinner on top of it:
                a clear signal that the button wasn&apos;t clickable yet, which
                stopped the frustrated repeat taps.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Interruption 4 */}
        <Reveal>
          <div className="grid items-start gap-10 md:grid-cols-2">
            <div>
              <p className="label uppercase">Interruption 4</p>
              <h3 className="mt-2 text-title font-semibold">
                Unexpected device sizes
              </h3>
              <p className="mt-4 leading-relaxed text-ink-soft">
                Monitoring behavior in{" "}
                <span className="font-semibold text-ink">LogRocket</span>, we
                found most web users were on{" "}
                <span className="font-semibold text-ink">
                  small, vertical Android tablets
                </span>
                , not desktops. I re-examined the breakpoints and reworked the
                offer wall into a sliding layout whenever the device ratio dropped
                below 1:2.
              </p>
            </div>
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/work/${S}/edge1-responsive.gif`}
                alt="Responsive offer wall adapting across breakpoints"
                className="block w-full rounded-lg"
              />
            </figure>
          </div>
        </Reveal>
        </div>
      </EdgeBlock>

      {/* ── What I learned ─────────────────────────────────── */}
      <section className={caseSectionDividedClass}>
        <div className={caseContentSectionClass}>
        <h2 className="text-title font-semibold">What I learned</h2>
        <p className="mt-4 max-w-reading leading-relaxed text-ink-soft">
          The early stage of a remote startup taught me more than fast
          prototyping and clean UI — how a business actually runs, how design
          decisions ripple into revenue, and how much good product work happens
          at the edges no one sees.
        </p>
        <figure className="mt-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/work/${S}/eurekazoom.png`}
            alt="Remote team standup over video call, reviewing Google Analytics data"
            className="block w-full rounded-lg"
          />
        </figure>
        </div>
      </section>
    </div>
  );
}
