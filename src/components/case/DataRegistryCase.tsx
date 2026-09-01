import type { Project } from "@/data/projects";
import { CaseTheme } from "@/components/case/CaseTheme";
import {
  CaseHero,
  CaseImpact,
  Row,
  Accent,
  Heading,
  Figure,
  Decisions,
} from "@/components/case/CaseKit";
import { splitStrategic } from "@/components/case/strategic";
import { CASE_ACCENTS } from "@/components/case/accents";

const S = "/work/capital-one-data";

const FLOWS = [
  {
    n: "Registration",
    title: "From emailed spreadsheets to a guided flow",
    intro: (
      <>
        The old tool made users hand-enter up to{" "}
        <span className="text-ink">3,800 elements</span> into spreadsheets and
        email them to admins.
      </>
    ),
    src: `${S}/Registration_Assets.gif`,
    alt: "Guided data usage registration flow",
    caption: "A guided registration flow, step-by-step through input assets",
    outro: "Drawer to drill into a dataset without losing the full list.",
  },
  {
    n: "Approve & Manage",
    title: "A color-coded system for governance",
    intro:
      "Color-coded status, priority, risk, and assessment badges made dense governance easy to scan.",
    src: `${S}/Approve.gif`,
    alt: "Approve and manage data usages with color-coded badges",
    caption: "Owner dashboard: published, awaiting approval, and draft usages",
    outro:
      "Owners got a dashboard to review, filter, and act on every usage. I aligned it with senior leadership repeatedly, since executives would approve inside the tool themselves.",
  },
  {
    n: "Search & View",
    title: "Prioritizing what people actually needed",
    intro: "A card sort showed status and mapped datasets mattered most.",
    src: `${S}/Search_3_output.gif`,
    alt: "Search and view data usage details with status bar and mapped datasets",
    caption: "Details page: status bar + mapped datasets",
    outro: "Mapped datasets lead, with a color-coded status bar on top.",
  },
] as const;

export function DataRegistryCase({ project }: { project: Project }) {
  return (
    <CaseTheme accent={CASE_ACCENTS[project.slug]}>
      <CaseHero
        client={project.client}
        headline={
          <>
            A system of record for <Accent>data usages</Accent>
          </>
        }
        subtitle={project.subtitle ?? ""}
        meta={[
          { label: "Role", value: project.role },
          { label: "Timeline", value: project.duration ?? project.year },
          { label: "Platform", value: "Desktop · Internal" },
          { label: "Team", value: "PM + 5 engineers" },
        ]}
        heroSrc={`${S}/hero.png`}
        heroAlt="Data usage registry dashboard with search, status badges, and mapped datasets"
      />

      <CaseImpact statement={project.impact} metrics={project.metrics} />

      {/* Context */}
      <Row label="Context">
        <Heading lead={project.overview}>
          Nobody could say what the data was actually used for.
        </Heading>
        <Figure
          className="mx-auto mt-10 w-full max-w-[82%]"
          src={`${S}/data-usage-diagram.png`}
          alt="Diagram showing datasets feeding elements consumed into a data usage and data outputs"
          imgClassName="mx-auto block w-full"
        />
        <p className="mt-10 max-w-xl leading-relaxed text-ink-soft">
          A <span className="text-ink">data usage</span> consumes elements from
          one or more datasets to produce an output. Here&apos;s an example.
        </p>
        <Figure
          className="mx-auto mt-6 w-full max-w-[82%]"
          src={`${S}/data-usage-example.png`}
          alt="Example flow from customer income dataset through Ability to Pay assessment to a new credit line"
          imgClassName="mx-auto block w-full"
        />
      </Row>

      {/* Problem */}
      <Row label="Problem">
        <Heading>We were paying a vendor for workflows nobody wanted to use.</Heading>
        <p className="mt-5 max-w-xl leading-relaxed text-ink-soft">
          Capital One used a third-party tool to manage{" "}
          <span className="text-ink">~4,000 data usages</span>, including
          hundreds of high-priority usages and tens of thousands of high-priority
          data elements. Workflows were disconnected from the internal data
          platform, the UI was slow and manual, and the vendor was migrating to a
          costly SaaS model.
        </p>
        <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">
          We chose to build a new system of record, integrated into Capital
          One&apos;s internal data platform, for cost, control, and the
          customization a bought tool couldn&apos;t offer.
        </p>
        <Figure
          className="mt-8"
          src={`${S}/legacy-platform.png`}
          alt="The third-party Enterprise Data Management tool for data usages"
          caption="The third-party tool we replaced: dense tables, manual filters, no platform integration"
        />
      </Row>

      {/* Timeline + Role */}
      <Row label="Team & timeline">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-semibold">Timeline</h3>
            <p className="mt-4 leading-relaxed text-ink-soft">
              Onboarding to production launch and full decommission of the
              third-party tool in ~9 months (mid-2024 to mid-2025).
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">My role</h3>
            <p className="mt-4 leading-relaxed text-ink-soft">
              <span className="text-ink">Sole designer across 70+ screens.</span>{" "}
              I led end-to-end desktop design in tight &ldquo;parallel-path&rdquo;
              lockstep with product and 5+ engineers.
            </p>
          </div>
        </div>
      </Row>

      {/* Research */}
      <Row label="Research">
        <Heading>So I took the old tool apart to see what it was hiding.</Heading>
        <p className="mt-5 max-w-xl leading-relaxed text-ink-soft">
          I reverse-engineered the old tool, mapping every flow, pain point, and
          requirement, then studied our internal patterns so new ones would
          align. The audience was broad: first-line consumers, producers, and
          leadership, plus second-line stewards, risk officers, and validators.
        </p>
        <div className="mt-8 grid items-start gap-6 md:grid-cols-[1.8fr_1fr]">
          <Figure
            src={`${S}/research-user-flow.png`}
            alt="Brain dump mapping create, approve, search, and edit user flows"
            imgClassName="block h-56 w-full object-contain object-left md:h-72"
            caption="User flow brain dump"
          />
          <Figure
            src={`${S}/research-notes.jpg`}
            alt="Handwritten research notes and early UI sketches in a notebook"
            imgClassName="block h-56 w-full object-contain object-left md:h-72"
            caption="Research notes"
          />
        </div>
      </Row>

      <Decisions items={splitStrategic(project.strategic)} />

      {/* Flows */}
      {FLOWS.map((f) => (
        <Row key={f.n} label={`Flow · ${f.n}`}>
          <Heading>{f.title}</Heading>
          <p className="mt-5 max-w-xl leading-relaxed text-ink-soft">{f.intro}</p>
          <Figure
            className="mt-8"
            src={f.src}
            alt={f.alt}
            caption={f.caption}
          />
          <p className="mt-6 max-w-xl leading-relaxed text-ink-soft">{f.outro}</p>
        </Row>
      ))}

      {/* Impact */}
      <Row label="Impact">
        <Heading>We turned the vendor tool off.</Heading>
        <p className="mt-5 max-w-xl leading-relaxed text-ink-soft">
          I shipped a new internal data-usage inventory built in-house and
          contributed new patterns and component hierarchy back to the platform.
          Positive early feedback on visibility and governance was enough to
          fully decommission the third-party SaaS tool.
        </p>
      </Row>
      <div className="h-16" />
    </CaseTheme>
  );
}
