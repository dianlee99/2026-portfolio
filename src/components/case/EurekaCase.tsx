import type { ReactNode } from "react";
import type { Project } from "@/data/projects";
import { CaseTheme } from "@/components/case/CaseTheme";
import {
  CaseHero,
  CaseImpact,
  Row,
  Accent,
  Heading,
  Media,
} from "@/components/case/CaseKit";
import { ExternalLink } from "@/components/LinkedText";
import { CASE_ACCENTS } from "@/components/case/accents";

const S = "/work/eureka-surveys";

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

/** Mobile screenshot — natural aspect, capped narrow. */
function PhoneShot({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-xl">
      <Media src={src} alt={alt} className="mx-auto block w-full max-w-[220px]" />
    </div>
  );
}

const HOW_IT_WORKS = [
  {
    step: "01 · Sign up",
    title: "Web-first, for security",
    body: "Because this was a cash app, sign-up ran through the web with sensitive edge cases handled up front before users reached the app.",
    src: `${S}/howitworks1.gif`,
    alt: "Eureka sign-up flow on web",
  },
  {
    step: "02 · Earn",
    title: "Three survey types",
    body: "Quick surveys onboard and profile users; sweepstake surveys generate revenue; daily polls keep people coming back, all with micro-interactions and light gamification.",
    src: `${S}/howitworks2.gif`,
    alt: "Survey types and earning flow in the app",
  },
  {
    step: "03 · Cash out",
    title: "PayPal or gift cards",
    body: "Once a balance passes $5, users cash out to PayPal or a catalog of gift cards: the payoff that makes the loop worth finishing.",
    src: `${S}/howitworks3.gif`,
    alt: "Cash-out options, PayPal and gift cards",
  },
] as const;

/** One edge case: media + copy, side flippable. */
function EdgeCase({
  n,
  title,
  body,
  media,
  flip = false,
}: {
  n: string;
  title: string;
  body: ReactNode;
  media: ReactNode;
  flip?: boolean;
}) {
  return (
    <div className="grid items-start gap-10 md:grid-cols-2">
      <div className={flip ? "md:order-2" : ""}>{media}</div>
      <div className={flip ? "md:order-1" : ""}>
        <p className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-ink-faint">
          {n}
        </p>
        <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em]">{title}</h3>
        <p className="mt-4 leading-relaxed text-ink-soft">{body}</p>
      </div>
    </div>
  );
}

export function EurekaCase({ project }: { project: Project }) {
  // The "Platforms shipped" metric renders as clickable iOS/Web links. Key off
  // the label's intent (not the exact value string) so rewording the value
  // doesn't silently drop the links.
  const metrics = project.metrics.map((m) =>
    m.label.toLowerCase().includes("platform")
      ? { value: <PlatformLinks links={project.links} />, label: m.label }
      : { value: m.value, label: m.label },
  );

  return (
    <CaseTheme accent={CASE_ACCENTS[project.slug]}>
      <CaseHero
        client={project.client}
        headline={
          <>
            Designing the #1 <Accent>survey app</Accent> on iOS
          </>
        }
        subtitle={project.subtitle ?? ""}
        meta={[
          { label: "Role", value: project.role },
          { label: "Timeline", value: project.duration ?? project.year },
          { label: "Platforms", value: "iOS · Web" },
          { label: "Team", value: "5-person startup" },
        ]}
        heroSrc={`${S}/hero.png`}
        heroAlt="Eureka Surveys app on iOS, showing survey dashboard, completion, and in-progress screens"
      />

      <CaseImpact statement={project.impact} metrics={metrics} />

      {/* Context + what I did */}
      <Row label="Context">
        <p className="max-w-2xl text-lg leading-relaxed text-ink-soft">
          {project.overview}
        </p>
        <div className="mt-10">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-ink-faint">
            What I did
          </p>
          <ul className="mt-4 grid list-disc grid-cols-1 gap-x-12 gap-y-2 pl-5 md:max-w-3xl md:grid-cols-2">
            {project.contribution.map((c, i) => (
              <li key={i} className="text-ink-soft">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Row>

      {/* How it works */}
      <Row label="How it works">
        <Heading lead="Onboard fast, then steer users to revenue-driving sweepstakes.">
          How Eureka works
        </Heading>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {HOW_IT_WORKS.map((item) => (
            <div key={item.step}>
              <figure className="mb-5">
                <PhoneShot src={item.src} alt={item.alt} />
              </figure>
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-ink-faint">
                {item.step}
              </p>
              <h3 className="mt-2 font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Row>

      {/* Edge cases */}
      <Row label="Edge cases">
        <Heading lead="As the lead designer at a five-person startup, my work spanned research, iOS and responsive web, client-facing tools, and SEO pages. But the decisions I'm proudest of came from the messy edge cases, the moments where a cash app can quietly lose a user's trust. Here are four.">
          The happy path was easy. The edges were the product.
        </Heading>

        <div className="mt-14 space-y-20 md:space-y-24">
          <EdgeCase
            n="Interruption 1"
            title="Survey terminated"
            media={
              <div className="grid grid-cols-2 gap-4">
                <PhoneShot
                  src={`${S}/edge2-terminated.png`}
                  alt="Partial reward when a survey ends early"
                />
                <PhoneShot
                  src={`${S}/edge2-closed.png`}
                  alt="Survey no longer available"
                />
              </div>
            }
            body={
              <>
                Third-party surveys could cut users off mid-way, with completion
                as low as <span className="font-semibold text-ink">5%</span>. I
                introduced a{" "}
                <span className="font-semibold text-ink">
                  &ldquo;rewards for terminated&rdquo;
                </span>{" "}
                pattern: a partial payout when a survey ended short, so effort
                never felt wasted.
              </>
            }
          />

          <EdgeCase
            flip
            n="Interruption 2"
            title="Low survey supply"
            media={
              <div className="grid grid-cols-2 gap-4">
                <PhoneShot
                  src={`${S}/edge2-banner-empty.png`}
                  alt="Banner when survey supply is low"
                />
                <PhoneShot
                  src={`${S}/edge2-daily-poll.png`}
                  alt="Daily Poll survey on mobile"
                />
              </div>
            }
            body={
              <>
                Supply is seasonal, so an empty home screen can read as a broken
                app. I used{" "}
                <span className="font-semibold text-ink">honest banners</span>{" "}
                telling users when to check back or when payouts were high, and
                added a <span className="font-semibold text-ink">Daily Poll</span>{" "}
                (one lightweight question) to hold engagement when supply was
                low.
              </>
            }
          />

          <EdgeCase
            n="Interruption 3"
            title="Delayed loading & rage-clicks"
            media={
              <div className="overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${S}/edge2-loading.png`}
                  alt="Sign-up form with disabled CTA and spinner on the button"
                  className="block w-full"
                />
              </div>
            }
            body={
              <>
                Users were rage-clicking the Sign-Up button through a loading
                modal. I grayed out the CTA and moved the spinner on top of it: a
                clear signal that the button wasn&apos;t clickable yet, which
                stopped the frustrated repeat taps.
              </>
            }
          />

          <EdgeCase
            flip
            n="Interruption 4"
            title="Unexpected device sizes"
            media={
              <div className="overflow-hidden rounded-xl">
                <Media
                  src={`${S}/edge1-responsive.gif`}
                  alt="Responsive offer wall adapting across breakpoints"
                  className="block w-full"
                />
              </div>
            }
            body={
              <>
                Monitoring behavior in{" "}
                <span className="font-semibold text-ink">LogRocket</span>, we
                found most web users were on{" "}
                <span className="font-semibold text-ink">
                  small, vertical Android tablets
                </span>
                , not desktops. I re-examined the breakpoints and reworked the
                offer wall into a sliding layout whenever the device ratio dropped
                below 1:2.
              </>
            }
          />
        </div>
      </Row>

      {/* What I learned */}
      <Row label="What I learned">
        <p className="max-w-2xl text-lg leading-relaxed text-ink-soft">
          The early stage of a remote startup taught me more than fast
          prototyping and clean UI. It taught me how a business actually runs,
          how design decisions ripple into revenue, and how much good product
          work happens at the edges no one sees.
        </p>
        <div className="mt-8 overflow-hidden rounded-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${S}/eurekazoom.jpg`}
            alt="Remote team standup over video call, reviewing Google Analytics data"
            className="block w-full"
          />
        </div>
      </Row>
      <div className="h-16" />
    </CaseTheme>
  );
}
