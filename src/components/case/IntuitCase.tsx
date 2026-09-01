import type { Project } from "@/data/projects";
import { CaseTheme } from "@/components/case/CaseTheme";
import {
  CaseHero,
  CaseImpact,
  Row,
  Accent,
  Heading,
  Figure,
} from "@/components/case/CaseKit";
import { ExternalLink } from "@/components/LinkedText";
import { splitStrategic } from "@/components/case/strategic";
import { CASE_ACCENTS } from "@/components/case/accents";

const S = "/work/intuit";

const VOCS = [
  {
    quote:
      "Worst screen orientation ever. You have to scroll down just to see any details of the invoice. The entire top section is wasted space.",
    tag: "Edit · layout",
  },
  {
    quote:
      "I create it in QuickBooks but I always add some colors to it in Canva before I send it from my own email.",
    tag: "Design · off-platform",
  },
] as const;

const SIDE_QUESTS = [
  {
    tag: "Insight → prototype",
    title: "Claude to cluster, Cursor to prototype",
    desc: "Clustered Edit-tab VOC into layout principles with Claude, then built the clickable Edit · Settings · Design prototype in Cursor, so leadership reacted to real flows, not static frames.",
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

const TRADEOFF_IMAGES = [
  `${S}/tradeoff1.png`,
  `${S}/tradeoff2.png`,
  `${S}/tradeoff3.png`,
];

export function IntuitCase({ project }: { project: Project }) {
  const tradeoffs = splitStrategic(project.strategic);

  return (
    <CaseTheme accent={CASE_ACCENTS[project.slug]}>
      <CaseHero
        client={project.client}
        headline={
          <>
            Unconstrained <Accent>invoicing</Accent>
          </>
        }
        subtitle={project.subtitle ?? ""}
        meta={[
          { label: "Role", value: project.role },
          { label: "Year", value: project.year },
          { label: "Platform", value: "Desktop · Tablet · Web" },
          { label: "AI tools", value: "Claude · Cursor" },
        ]}
        heroSrc={`${S}/hero.png`}
        heroAlt="QuickBooks invoicing across desktop, tablet, and mobile"
      />

      <CaseImpact statement={project.impact} metrics={project.metrics} />

      {/* Problem */}
      <Row label="Problem">
        <Heading lead="The editor wasn't just hard to use. It quietly broke create-to-send.">
          Three jobs, one crowded screen
        </Heading>
        <div className="mt-10 grid gap-10 md:grid-cols-2 md:items-start lg:gap-12">
          <Figure
            src={`${S}/current-invoice.png`}
            alt="Original QuickBooks invoice editor with payments settings expanded"
          />
          <div>
            <p className="leading-relaxed text-ink-soft">
              QuickBooks tried to do three jobs on one surface:{" "}
              <span className="text-ink">Edit</span> buried line items under
              customer chrome, <span className="text-ink">Settings</span> mashed
              payments and customization together, and{" "}
              <span className="text-ink">Design</span> hid templates and color
              pickers inside an accordion.
            </p>
            <ul className="mt-8 flex flex-col gap-5">
              {VOCS.map((v) => (
                <li
                  key={v.tag}
                  className="border-l-2 border-line pl-4"
                  style={{ borderColor: "var(--case-accent)" }}
                >
                  <p className="text-lg italic leading-relaxed text-ink-soft">
                    &ldquo;{v.quote}&rdquo;
                  </p>
                  <span className="mt-2 block text-[0.7rem] font-medium uppercase tracking-[0.16em] text-ink-faint">
                    {v.tag}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Row>

      {/* Trade-offs */}
      {tradeoffs.length > 0 && (
        <Row label="Trade-offs">
          <Heading lead="The calls we made when every option had a real downside.">
            What we optimized for
          </Heading>
          <ul className="mt-10 flex flex-col gap-8">
            {tradeoffs.map((t, i) => (
              <li key={t.tension} className="flex items-start gap-5">
                {TRADEOFF_IMAGES[i] && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={TRADEOFF_IMAGES[i]}
                    alt=""
                    className="mt-0.5 h-16 w-16 shrink-0 object-contain"
                  />
                )}
                <div>
                  <p className="font-semibold leading-snug">{t.tension}</p>
                  {t.body && (
                    <p className="mt-1.5 leading-relaxed text-ink-soft">
                      {t.body}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Row>
      )}

      {/* Process */}
      <Row label="Process">
        <Heading lead="The call: split Edit, Settings, and Design into distinct modes, then use AI to run that call end to end, solo, in days instead of quarters.">
          One AI toolchain, from insight to shipped code
        </Heading>
        <p className="mt-5 max-w-xl leading-relaxed text-ink-soft">
          I clustered Edit-tab VOC into layout principles with{" "}
          <span className="text-ink">Claude</span>, audited every field in Figma
          (essential / conditional / hidden), and built a clickable{" "}
          <span className="text-ink">Edit · Settings · Design</span> prototype in{" "}
          <span className="text-ink">Cursor</span>, so leadership reacted to
          real flows, not static frames. That same toolchain carried into
          production: when polish sat in the eng backlog, I opened PRs in the
          codebase and traced defects with Claude. Three examples:
        </p>
        <ul className="mt-10 grid list-none gap-5 p-0 md:grid-cols-3">
          {SIDE_QUESTS.map((q) => (
            <li
              key={q.tag}
              className="flex h-full flex-col rounded-xl border border-line p-6"
            >
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-ink-faint">
                {q.tag}
              </p>
              <h3 className="mt-2 font-semibold leading-snug">{q.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                {q.desc}
              </p>
            </li>
          ))}
        </ul>
      </Row>

      {/* Prototype */}
      <Row label="Prototype">
        <div className="flex items-end justify-between gap-6">
          <Heading>Take it for a spin: Edit, Settings, Design</Heading>
        </div>
        <div className="mt-6 flex justify-end">
          <ExternalLink href="/work/intuit/prototype/index.html">
            Open full screen ↗
          </ExternalLink>
        </div>
        <div className="mt-4 overflow-hidden rounded-xl border border-line">
          <iframe
            title="QuickBooks invoicing prototype"
            src="/work/intuit/prototype/index.html"
            className="aspect-[16/10] w-full border-0"
          />
        </div>
      </Row>

      {/* Impact */}
      <Row label="Impact">
        <Heading>From north-star to shipping product</Heading>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
          The team now shares one direction: Edit, Settings, and Design as
          separate modes. Payments settings shipped cleaner; Edit and Design roll
          out next (Design targeting August 2026). Throughout, I shipped
          production PRs and fixes rather than waiting for a handoff.
        </p>
      </Row>
      <div className="h-16" />
    </CaseTheme>
  );
}
