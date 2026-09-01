import type { Project } from "@/data/projects";
import { CaseTheme } from "@/components/case/CaseTheme";
import { CASE_ACCENTS } from "@/components/case/accents";
import {
  CaseHero,
  CaseImpact,
  Row,
  Accent,
  Heading,
  BeforeAfter,
  Outcomes,
  Decisions,
} from "@/components/case/CaseKit";

const S = "/work/capital-one-auto-refinance";

const CHAPTERS = [
  {
    step: "01",
    name: "Pre-qualify",
    title: "More screens, less thinking.",
    problem:
      "One long, unpersonalized page with a confusing order for co-borrowers, overwhelming on mobile, where most people now started.",
    before: `${S}/prequal-before-breakdown.png`,
    after: `${S}/prequal-after-mobile.gif`,
    outcomes: [
      "+7.2% lift in sign-in → submit rate (top of funnel)",
      "+4.7% lift in sign-in → signed contract, end to end",
      "Became the new control for both mobile and desktop",
    ],
  },
  {
    step: "02",
    name: "Apply",
    title: "Honesty beat the hard sell.",
    problem:
      "At the moment of committing to a hard credit pull, users hesitated, unsure what they'd actually save, and wary of a 'salesy' pitch.",
    before: `${S}/apply-before-offers.gif`,
    after: `${S}/apply-after-offers.gif`,
    outcomes: [
      "+4% lift in application → contract rate at this step (statistically significant)",
      "≈ $200MM incremental annual originations and $3.5MM marginal NPV annually",
    ],
  },
  {
    step: "03",
    name: "Finalize",
    title: "The last step is where people quietly give up.",
    problem:
      "Income verification (via Finicity) was confusing and easy to abandon, especially for joint borrowers, so adoption sat low at 26%.",
    before: `${S}/finalize-before-finicity.gif`,
    after: `${S}/finalize-after-finicity.gif`,
    outcomes: [
      "Finicity adoption rate increased from 26% to 37%",
      "Exit surveys pointed to more bank options as the biggest next opportunity",
    ],
  },
] as const;

const PAIN = [
  { n: "01", t: "Emotional uncertainty", d: "A big financial decision with too little reassurance." },
  { n: "02", t: "Poor information hierarchy", d: "Hard to understand the process or compare an offer." },
  { n: "03", t: "No personalization", d: "The flow didn't adapt to co-borrowers, self-employment, or multiple incomes." },
] as const;

const DECISIONS = [
  { tension: "Physical vs. mental cost", body: "Broke one long form into a guided stepper: more taps, less thinking. Completion rose despite more screens." },
  { tension: "Honest vs. persuasive", body: "Tested five ways to frame savings; the least salesy framing won. A plain comparison beat every persuasion pattern." },
  { tension: "One flow vs. cohort forks", body: "Kept single and joint borrowers in one journey with conditional steps instead of forking the application." },
] as const;

export function AutoRefinanceCase({ project }: { project: Project }) {
  return (
    <CaseTheme accent={CASE_ACCENTS[project.slug]}>
      <CaseHero
        client={project.client}
        headline={
          <>
            Redesigning the auto <Accent>refinance</Accent> journey
          </>
        }
        subtitle={project.subtitle ?? ""}
        meta={[
          { label: "Role", value: project.role },
          { label: "Year", value: project.year },
          { label: "Platforms", value: "Desktop · Mobile" },
          { label: "Industry", value: "Consumer fintech" },
        ]}
        heroSrc={`${S}/hero.gif`}
        heroAlt="Auto refinance journey across desktop and mobile"
      />

      <CaseImpact statement={project.impact} metrics={project.metrics} />

      {/* Problem */}
      <Row label="Problem">
        <h2 className="max-w-2xl text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
          Mobile was winning the traffic and losing the customer.
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
          Exit surveys with 1,000 drop-out customers and call-center interviews
          surfaced three pain points that set my design goals.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {PAIN.map((p) => (
            <div key={p.n}>
              <Accent className="text-xl">{p.n}</Accent>
              <div className="mt-2 text-lg font-semibold">{p.t}</div>
              <div className="mt-2 text-sm leading-relaxed text-ink-soft">{p.d}</div>
            </div>
          ))}
        </div>
      </Row>

      {/* Chapters */}
      {CHAPTERS.map((c) => (
        <Row key={c.step} label={`Step ${c.step} · ${c.name}`}>
          <h2 className="max-w-2xl text-[clamp(1.7rem,3.4vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            {c.title}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">{c.problem}</p>
          <BeforeAfter
            before={c.before}
            after={c.after}
            beforeAlt={`${c.name} before`}
            afterAlt={`${c.name} after`}
          />
          <Outcomes items={c.outcomes} />
        </Row>
      ))}

      <Decisions items={DECISIONS} />

      {/* Reflection */}
      <Row label="Reflection">
        <Heading>Every screen asked for more trust than the last.</Heading>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
          The wins compounded: +7.2% submit, +4% to contract, Finicity adoption
          up 11 points. The through-line was never a flashier pitch, just telling
          people where they were, what they&apos;d save, and what came next. That
          work earned Capital One&apos;s &ldquo;I am Giant&rdquo; award.
        </p>
      </Row>
      <div className="h-16" />
    </CaseTheme>
  );
}
