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
  accent: string; // per-project accent color
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
      "Unconstrained rethink of QuickBooks invoicing—AI-built north-star prototype and production PRs shipped along the way.",
    year: "Q1 2026",
    role: "Senior Product Designer",
    tags: ["Fintech", "0→1", "Design systems", "AI"],
    accent: "#2ca01c",
    links: [{ text: "QuickBooks", href: QUICKBOOKS_URL }],
    impact:
      "Customers get lost on invoices and rarely send them. I led a north-star QuickBooks rethink to lift create-to-send.",
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
      "Create-to-send vs. showing every field — Prioritized line items and totals on the edit canvas; moved advanced and cohort-specific controls into Settings.",
      "One editor vs. cohort-specific flows — Kept AE, MAIP, and merchant in a single invoice experience, with conditional payment sections instead of forking the product.",
      "North-star vision vs. incremental rollout — Defined the full Edit · Settings · Design split upfront; shipped payments settings first while the Design tab targets a later release.",
    ],
  },
  {
    slug: "capital-one-data",
    index: "02",
    client: "Capital One · Data Platform",
    title: "A system of record for data usages",
    subtitle: "An internal system of record that replaced a costly third-party tool",
    summary:
      "Building an internal system of record for how the enterprise uses its data.",
    year: "2024–25",
    role: "Senior Product Designer",
    duration: "Q4 2024 – Q1 2025",
    tags: ["Enterprise", "0→1", "Data governance", "Design systems"],
    accent: "#004977",
    impact:
      "Sole designer on 70+ screens—built a system of record for ~4,000 data usages and decommissioned a third-party SaaS tool.",
    overview:
      "We designed for the analysts and engineers who need enterprise data that's easy to govern, find, and trust. The project built a new system of record for “data usages” — the reports, models, and systems that consume data to serve a business purpose.",
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
    strategic: [],
  },
  {
    slug: "capital-one-auto-refinance",
    index: "03",
    client: "Capital One · Auto Refinance",
    title: "Redesigning the auto refinance journey",
    subtitle: "Rebuilding a high-stakes application to win back mobile users",
    summary:
      "Guiding people through a high-stakes financial decision with clarity.",
    year: "Q2 2022",
    role: "Product Designer",
    duration: "Q2 2022",
    tags: ["Fintech", "Conversion", "Consumer", "Mobile"],
    accent: "#0f766e",
    links: [
      {
        text: "Auto refinance",
        href: "https://www.capitalone.com/auto-financing/refinance/",
      },
    ],
    impact:
      "Redesigned Capital One's auto refinance journey to earn trust at every step, lifting sign-in-to-submit by 7.2% and application-to-contract by a statistically significant 4%.",
    overview:
      "Auto refinance lets customers swap their car loan for a better rate and monthly payment. I led the end-to-end redesign across desktop and mobile, earning trust at each step through clarity and transparency.",
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
    strategic: [],
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
    accent: "#6b4eff",
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
      "Led design for the #1 iOS survey app—100K+ reviews, 4.8 stars.",
    overview:
      "Eureka Surveys is the #1 survey app on the iOS App Store (100K+ reviews, 4.8 stars) — a native app and web product where people earn cash and sweepstake entries for daily surveys. As lead product designer, I ran the end-to-end process from user research to shipping features.",
    contribution: [
      "Designing screens for iOS + responsive web",
      "Conducting interviews and user testing",
      "Analyzing research (i.e. competitor studies)",
      "Ideating new functionalities",
      "Designing the user flow and screens for client users (survey providers)",
      "Designing miscellaneous pages (FAQ, landing page, terms & policy, blog) for SEO",
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
    accent: "#8a857b",
    impact:
      "WarnerMedia, PNC, and Prudential shaped my early design work.",
    overview:
      "Internships across media, finance, and design consulting: WarnerMedia, PNC, and Rightbrain × Prudential.",
    contribution: [],
    metrics: [],
    strategic: [],
    internships: [
      {
        company: "WarnerMedia",
        kind: "Mass Media Company",
        body: "Selected to be their first and only UX intern, I worked at the Warner Innovation Lab, a growing hub of technology development in the lab, designed to create products that would promote fandom for shows on HBO or Warner Bros. (e.g. Euphoria). The lab has a heavy focus on using AI & Machine Learning tech to power a variety of products and prototypes.",
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
        body: "Summer 2020, everyone had to go virtual. Despite the chaos from the pandemic, new WFH policies, and the uncertain future, I was lucky enough to have the opportunity to work with PNC. I worked with their Mobile App team to redesign their mobile banking app, specifically the menu and rewards page, that would reach their 4 million online banking customers.",
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
        body: "During the summer of 2019, I had the opportunity to work with Prudential Life Insurance of Korea (POK) as part of the UX Consultant team at Rightbrain. With my team, I spent the summer conducting user research, running iterative workshops with the Prudential team, and working closely with UI designers & front-end engineers to design a new app. The app is aimed to increase the efficiency and quality of working lives of the Life Planners (LP), employees at Prudential.",
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
