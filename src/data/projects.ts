/**
 * Single source of truth for every case study.
 *
 * HOW TO EDIT:
 *  - Replace the placeholder copy (marked [PLACEHOLDER]) with your real story.
 *  - Metrics: only publish numbers you've confirmed are shareable (no NDA data).
 *  - Set `locked: true` on any case study that should sit behind the password gate.
 *  - Drop real images into /public/work/<slug>/ and reference them from the
 *    project's bespoke layout component in `src/components/case/`.
 */

export type Metric = { value: string; label: string };

export type Internship = {
  company: string;
  kind: string; // e.g. "MASS MEDIA COMPANY"
  body: string;
  role: string;
  duration: string;
  tools?: string;
  links?: { text: string; href: string }[];
  images: { src: string; caption?: string; cover?: boolean }[];
  wide?: boolean; // render images as a single wide banner instead of a strip
};

export const QUICKBOOKS_URL =
  "https://quickbooks.intuit.com/oa/get-quickbooks/?cid=ppc_G_e_US_.QBO_US_GGL_Brand_NonTop_Search_Desktop_WP._intuit%20quickbooks%20invoicing_txt&agid=142317896376&infinity=ict2~net~gaw~ar~723155834851~kw~intuit%20quickbooks%20invoicing~mt~e~cmp~QBO_US_GGL_Brand_NonTop_Search_Desktop_WP~ag~Invoice&gclsrc=aw.ds&gad_source=1&gad_campaignid=18476079041&gbraid=0AAAAAD1w8J9k1JsayVk1Qt5i9BAIYEZCl&gclid=CjwKCAjwu53SBhAhEiwAJzSLNgluhezV4pLAEbdGe80FWZM_9P6OkL2MM9cdvuUUkKZghgsScUvBlxoClsEQAvD_BwE";

export type Project = {
  slug: string;
  index: string; // "01"
  client: string;
  title: string;
  summary: string; // one-liner for the index
  year: string;
  role: string;
  tags: string[];
  accent: string; // kept for API compatibility — all projects use the neutral ink token
  locked?: boolean; // gate behind password
  // Optional rich meta (used by custom layouts, e.g. Eureka):
  subtitle?: string;
  team?: string[];
  duration?: string;
  tools?: string;
  links?: { text: string; href: string }[];
  // Used by the Archive custom layout:
  internships?: Internship[];
  // Case study body:
  impact: string; // one-line headline outcome — the 3-second scan hook ("what I made possible")
  overview: string;
  contribution: string[];
  metrics: Metric[];
  strategic: string[]; // the business tensions / constraints / trade-offs you navigated
};

export const projects: Project[] = [
  {
    slug: "intuit",
    index: "01",
    client: "Intuit · QuickBooks",
    title: "Unconstrained invoicing",
    subtitle: "A from-scratch rethink of QuickBooks invoicing",
    summary:
      "~64% of invoices never get sent. A from-scratch rethink of QuickBooks invoicing, from AI-built prototype through shipped production PRs.",
    year: "Q1 2026",
    role: "Senior Product Designer",
    tags: ["Fintech", "0→1", "Design systems", "AI"],
    accent: "var(--ink)",
    links: [{ text: "QuickBooks", href: QUICKBOOKS_URL }],
    impact:
      "~64% of researched invoices never get sent, with $13B+ stuck in drafts. I led the from-scratch rethink of QuickBooks invoicing to fix create-to-send.",
    overview:
      "At Intuit, I led an unconstrained rethink of the QuickBooks invoice editor.",
    contribution: [
      "Clustered Edit-tab VOC into layout principles with Claude",
      "Mapped settings IA across AE, MAIP, and merchant cohorts",
      "Defined Design tab strategy tied to create-to-send",
      "Built clickable Edit · Settings · Design prototype with Claude and Cursor in days",
      "Opened and merged PRs for invoicing UI polish using Cursor in the QBO codebase",
      "Fixed production bugs with LLM-assisted debugging and submitted patches through review",
    ],
    metrics: [
      {
        value: "~64%",
        label: "Of researched invoices created but never sent through QuickBooks",
      },
      {
        value: "$13B+",
        label: "Unsent invoice value across millions of invoices",
      },
    ],
    strategic: [
      "Create-to-send vs. showing every field: Prioritized line items and totals on the edit canvas; moved advanced and cohort-specific controls into Settings.",
      "One editor vs. cohort-specific flows: Kept AE, MAIP, and merchant in a single invoice experience, with conditional payment sections instead of forking the product.",
      "North-star vision vs. incremental rollout: Defined the full Edit · Settings · Design split upfront; shipped payments settings first while the Design tab targets a later release.",
    ],
  },
  {
    slug: "capital-one-data",
    index: "02",
    client: "Capital One · Data Platform",
    title: "A system of record for data usages",
    subtitle: "An internal system of record that replaced a costly third-party tool",
    summary:
      "Sole designer replacing a costly third-party tool: a 70-screen system of record for ~4,000 enterprise data usages.",
    year: "2024–25",
    role: "Senior Product Designer",
    duration: "Q4 2024 – Q1 2025",
    tags: ["Enterprise", "0→1", "Data governance", "Design systems"],
    accent: "var(--ink)",
    impact:
      "Sole designer on 70+ screens, building the system of record for ~4,000 data usages that let Capital One decommission a costly third-party SaaS tool.",
    overview:
      "I designed for the analysts and engineers who need enterprise data that's easy to govern, find, and trust: a new system of record for “data usages,” the reports, models, and systems that consume data to serve a business purpose.",
    contribution: [
      "Sole designer across 70+ desktop screens, end to end",
      "Reverse-engineered the legacy tool into flows, pain points, and requirements",
      "Designed the registration, approval, and search & governance flows",
      "Built a color-coded status / priority / risk system for dense content",
      "Ran a stakeholder card sort and aligned designs with senior leadership",
    ],
    metrics: [
      { value: "~4,000", label: "Data usages managed in the new system" },
      { value: "70+", label: "Screens designed as the sole designer" },
      { value: "1", label: "Third-party tool fully decommissioned" },
    ],
    strategic: [
      "Build vs. buy: Backed building in-house over renewing the vendor, since platform integration and customization won, at the cost of a fixed decommission deadline with one designer.",
      "Density vs. approachability: Kept tables dense for the stewards who live in them; clarity came from color-coded status, priority, and risk badges, not from whitespace.",
      "Speed vs. governance: Registration had to feel fast without skipping second-line risk review, so approval states became first-class UI instead of email threads.",
    ],
  },
  {
    slug: "capital-one-auto-refinance",
    index: "03",
    client: "Capital One · Auto Refinance",
    title: "Redesigning the auto refinance journey",
    subtitle: "Rebuilding a high-stakes application to win back mobile users",
    summary:
      "A trust-first rebuild of a high-stakes application: +7.2% submit rate, worth ~$200MM in annual originations.",
    year: "Q2 2022",
    role: "Product Designer",
    duration: "Q2 2022",
    tags: ["Fintech", "Conversion", "Consumer", "Mobile"],
    accent: "var(--ink)",
    links: [
      {
        text: "Auto refinance",
        href: "https://www.capitalone.com/auto-financing/refinance/",
      },
    ],
    impact:
      "Mobile brought 2× desktop's traffic but converted far worse. I rebuilt the journey around trust: +7.2% sign-in-to-submit, +4% application-to-contract, worth ~$200MM in annual originations.",
    overview:
      "Auto refinance lets customers swap their car loan for a better rate and monthly payment, but mobile, with twice desktop's traffic, converted far worse. I led the end-to-end redesign of pre-qualification, offers, and income verification across mobile and desktop.",
    contribution: [
      "Led the end-to-end redesign across desktop and mobile",
      "Turned exit surveys and call-center interviews into three design goals",
      "Rebuilt pre-qualification into a guided, personalized stepper",
      "Ran offer-presentation explorations to find the most trusted framing",
      "Redesigned the Finicity income-verification flow for joint borrowers",
    ],
    metrics: [
      { value: "+7.2%", label: "Sign-in to submit application rate" },
      { value: "+4%", label: "Application-to-contract (~$200MM originations)" },
      { value: "26→37%", label: "Finicity income-verification adoption" },
    ],
    strategic: [
      "Physical vs. mental cost: Broke one long form into a guided stepper, so more taps meant less thinking. Completion rose despite more screens.",
      "Honest vs. persuasive: Tested five ways to frame savings; the least salesy framing won. A plain comparison beat every persuasion pattern.",
      "One flow vs. cohort forks: Kept single and joint borrowers in one journey with conditional steps instead of forking the application.",
    ],
  },
  {
    slug: "eureka-surveys",
    index: "04",
    client: "Eureka Surveys",
    title: "Eureka Surveys",
    subtitle: "Working at a startup · Surveys that pay cash",
    summary:
      "Leading design for the #1 survey-taking app on iOS: surveys that pay cash.",
    year: "Fall 2020",
    role: "Lead Product Designer",
    duration: "Fall 2020",
    tags: ["Consumer", "Mobile", "Web", "0→1"],
    accent: "var(--ink)",
    team: [
      "Binxin Xie (Product Designer, Columbia)",
      "Troy Feng (Software Engineer, Yale)",
      "Albert Zhong (Finance, Princeton)",
      "Tommy Fang (CEO, Stanford)",
      "Kirby Gee (CEO, Stanford)",
    ],
    tools: "Figma, Adobe Creative Suite, Notion, Miro, Mixpanel, LogRocket",
    links: [
      {
        text: "iOS",
        href: "https://apps.apple.com/us/app/eureka-earn-money-for-surveys/id1466346433",
      },
      { text: "Web", href: "https://eurekasurveys.com/" },
    ],
    impact:
      "Drove +200% user growth as lead designer of the #1 iOS survey app (100K+ reviews, 4.8 stars).",
    overview:
      "Eureka is a native app and web product where people earn cash and sweepstake entries for daily surveys. As lead product designer at a five-person startup, I ran the end-to-end process from user research to shipping features across iOS and responsive web.",
    contribution: [
      "Shipped iOS + responsive web screens end to end",
      "Ran interviews and usability tests with survey takers",
      "Analyzed competitors to sharpen the earning loop",
      "Designed the client-side flows for survey providers",
      "Built the SEO surface: landing, FAQ, blog, and policy pages",
    ],
    metrics: [
      { value: "#1", label: "Survey app on the iOS App Store" },
      { value: "4.8★", label: "Rating across 100K+ reviews" },
      { value: "iOS / Web", label: "Platforms shipped" },
    ],
    strategic: [
      "Balancing cash-app security (web-only sign-up) against onboarding friction.",
      "Guiding users from quick surveys toward the sweepstake surveys that generate revenue.",
      "Staying transparent about survey supply and technical interruptions to protect trust.",
    ],
  },
  {
    slug: "archive",
    index: "05",
    client: "Early work",
    title: "Early work",
    subtitle:
      "Media, finance, and consulting internships in design",
    summary:
      "Internships across media, finance, and design consulting: WarnerMedia, PNC, and Rightbrain × Prudential.",
    year: "2019–20",
    role: "Design Intern",
    tags: ["Internships", "UX", "Research"],
    accent: "var(--ink)",
    impact:
      "Three internships across media, banking, and insurance, where I learned to design inside real constraints.",
    overview:
      "Internships across media, finance, and design consulting: WarnerMedia, PNC, and Rightbrain × Prudential.",
    contribution: [],
    // Factual scope, not business impact — internships shouldn't claim outcomes.
    metrics: [
      { value: "3", label: "Internships across media, banking, and insurance" },
    ],
    strategic: [],
    internships: [
      {
        company: "WarnerMedia",
        kind: "Mass Media Company",
        body: "Their first and only UX intern, embedded in the Warner Innovation Lab, a team prototyping AI and machine-learning products to deepen fandom for HBO and Warner Bros. titles like Euphoria.",
        role: "UX/Interaction Design Intern",
        duration: "3 months (Oct – Dec 2020)",
        links: [
          {
            text: "Warner Innovation Lab",
            href: "https://www.virtualrealitymarketing.com/case-studies/warnermedia-innovation-lab-preview/",
          },
        ],
        images: [
          { src: "/work/archive/warnermedia-1.png" },
          { src: "/work/archive/warnermedia-2.png" },
          { src: "/work/archive/warnermedia-3.png" },
        ],
      },
      {
        company: "PNC",
        kind: "A Financial Institution",
        body: "Summer 2020, fully remote. On PNC's Mobile App team, I redesigned the menu and rewards experiences in the banking app used by 4 million online banking customers.",
        role: "Digital Experience Design Intern",
        duration: "3 months (Jun – Aug 2020)",
        tools: "Sketch, InVision",
        links: [
          {
            text: "mobile banking app",
            href: "https://apps.apple.com/us/app/pnc-mobile-banking/id303113127",
          },
        ],
        images: [{ src: "/work/archive/pnc-1.png" }],
        wide: true,
      },
      {
        company: "Rightbrain × Prudential",
        kind: "Design Agency",
        body: "A summer consulting for Prudential Life Insurance of Korea on Rightbrain's UX team, where I ran research and iterative client workshops, then worked alongside UI designers and front-end engineers on a new app for Prudential's Life Planners.",
        role: "UX Consultant Intern",
        duration: "3 months (Jun – Aug 2019)",
        tools: "Figma, ProtoPie",
        links: [{ text: "Rightbrain", href: "https://rightbrain.co.kr/" }],
        images: [
          { src: "/work/archive/rightbrain-1.png" },
          { src: "/work/archive/rightbrain-2.png" },
          { src: "/work/archive/rightbrain-3.png", cover: true },
          { src: "/work/archive/rightbrain-4.png" },
        ],
      },
    ],
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
