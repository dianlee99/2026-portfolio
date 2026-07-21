# Dian Lee — Portfolio

A clean, custom-built portfolio for a senior product designer.
Next.js (App Router) + React + Tailwind + Framer Motion. No page builder — it's
real code, which itself signals you can partner with engineers (a plus in the
AI era).

## Homepage

The homepage (`/`) is a macOS-style **dock**: bold name + intro, then each
project is an app tile. Icons magnify near the cursor, hover shows a tooltip
bubble, and clicking genie-scales the case study open in a window with
traffic-light chrome (Esc or the red dot closes it). On mobile, the dock falls
back to a calm vertical work list.
- Dock code lives in `src/components/dock/` and `src/app/b/DockHome.tsx`
  (rendered at `/` via `src/app/page.tsx`).
- Mobile fallback list: `src/components/WorkIndex.tsx`.

### Persistent mini-dock

A compact fixed dock sits at the bottom of every project view for quick
switching (`src/components/dock/MiniDock.tsx`): a Home tile + all projects, with
the current one highlighted. It has two modes:
- On standalone `/work/[slug]` pages — tiles are links that navigate.
- Inside the homepage's genie window — tiles swap the window content in place
  and Home closes the window (stays in the dock-app metaphor).
Hidden on mobile (`md:` only).

## Run it

```bash
cd portfolio
npm install
npm run dev        # http://localhost:3000 (or the port in .claude/launch.json: 3200)
```

## Where everything lives

| What | File |
| --- | --- |
| **All case-study content** | `src/data/projects.ts` ← edit this first |
| Homepage (dock + intro) | `src/app/page.tsx`, `src/app/b/DockHome.tsx`, `WorkIndex.tsx` (mobile) |
| Case study routing | `src/app/work/[slug]/page.tsx` |
| Design tokens (color, type, dark mode) | `src/app/globals.css` + `tailwind.config.ts` |
| Password gate | `src/components/PasswordGate.tsx` |
| Motion (the only animation — gentle fade-in) | `Reveal.tsx`, `ReadingProgress.tsx` |
| Footer (email + links) | `Footer.tsx` |

## Case study layouts

Every case study has its own bespoke layout component in
`src/components/case/`, rendered both at `/work/[slug]` and inside the
homepage's genie window (`ProjectWindow.tsx`). **Eureka Surveys** is a good
example:
- Layout: `src/components/case/EurekaCase.tsx` (header + meta, device banner,
  3 numbered steps, Edge Cases intro, two dark edge-case sections, What I Learned).
- Rich meta (subtitle, team, duration, tools, links) lives on the Eureka entry
  in `projects.ts`.
- Image slots expect files under `public/work/eureka-surveys/` (hero.png,
  devices.png, step-*.png, edge1-*.png, edge2-*.png, process-*.png). Until added,
  each slot shows its expected filename.

**Capital One — Auto Refinance** (`AutoRefinanceCase.tsx`) and **Capital One — Data**
(`DataRegistryCase.tsx`) are custom layouts built from Dian's portfolio deck:
- Auto Refinance: context (3 stages) → problem → role → research → 3 pain points →
  goals → 3 design chapters (Pre-qualify / Apply / Finalize, each with before/after
  + impact note) → overall impact → reflection. Image slots under
  `public/work/capital-one-auto-refinance/`.
- Data: context → problem → build-vs-buy → timeline → role → research → 3 flows
  (Registration / Approve & Manage / Search & View) → impact. Locked (password gate).
  Image slots under `public/work/capital-one-data/`.

**Archive → Internships** (`ArchiveCase.tsx`) is another custom layout:
- A clean vertical list of internships (WarnerMedia, PNC, Rightbrain × Prudential),
  each with body copy, a Role/Duration/Tools meta block, and image slots.
- Internship content lives in the `internships` array on the Archive entry in
  `projects.ts`.
- Image slots expect files under `public/work/archive/` — `warnermedia-1..4.png`,
  `pnc-1.png` (wide banner), `rightbrain-1..3.png`.

## Editing your content

1. Open `src/data/projects.ts`. Every `[PLACEHOLDER]` is yours to replace.
2. Only publish metrics you've confirmed are shareable (no NDA data).
3. Add images to `public/work/<slug>/` and reference them from that project's
   layout component in `src/components/case/`.

## Password protection

- Locked case studies (currently **Intuit** and **Capital One — Data**) sit
  behind `PasswordGate`. Toggle with `locked: true` in `projects.ts`.
- Change the password in `src/components/PasswordGate.tsx` (`PASSWORD`).
- ⚠️ This is *deterrence*, not security — the content still ships to the
  browser. For truly sensitive work, keep it out of the repo entirely and gate
  at the edge (Next.js middleware / Vercel password protection) instead.

## Deploy

Push to GitHub, import into [Vercel](https://vercel.com) — zero config, free.
Add a custom domain (e.g. `dianlee.design`) in Vercel's dashboard.

## Design direction

Calm, legible, content-first — in the spirit of jennywen.ca. A single neutral
grotesque (Inter) for everything, black-on-white (with a dark mode), generous
whitespace, and a narrow ~900px reading column. No color used decoratively.
It's one page: a short intro, a vertical stack of work with cover images, and
an email in the footer. The only motion is a gentle fade-in on scroll plus a
thin reading-progress bar on case studies — both disabled under
`prefers-reduced-motion`.
