"use client";

import { usePathname } from "next/navigation";
import { AboutName } from "./AboutName";

export function Nav() {
  const pathname = usePathname();
  // No nav bar on the homepages — the name is the header there.
  if (pathname === "/" || pathname === "/b") return null;
  // Case pages use their own CaseTopBar (close/Esc) chrome instead.
  if (pathname.startsWith("/work")) return null;

  return (
    <header className="sticky top-0 z-50 bg-paper">
      <nav className="mx-auto flex max-w-[900px] items-center justify-between px-6 py-6">
        <AboutName label="Dian Lee" href="/" className="text-sm font-normal" />
        <a
          href="mailto:dianlee99@gmail.com"
          className="link-underline text-sm font-light text-ink-soft"
        >
          Get in touch
        </a>
      </nav>
    </header>
  );
}
