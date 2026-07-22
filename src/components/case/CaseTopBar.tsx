"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

/**
 * Window-style chrome for a case page — mirrors the genie overlay's top bar.
 * Traffic-light dots plus a "Close (Esc)" affordance that returns Home.
 */
export function CaseTopBar({ client }: { client: string }) {
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.push("/");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return (
    <div className="sticky top-0 z-50 flex items-center gap-2 border-b border-line bg-paper/90 px-5 py-3 backdrop-blur-md">
      <Link
        href="/"
        aria-label="Close"
        className="group flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#ff5f57]"
      >
        <span className="text-[8px] leading-none text-black/50 opacity-0 group-hover:opacity-100">
          ✕
        </span>
      </Link>
      <span className="h-3.5 w-3.5 rounded-full bg-[#febc2e]" />
      <span className="h-3.5 w-3.5 rounded-full bg-[#28c840]" />
      <span className="ml-3 text-xs text-ink-faint">{client}</span>
      <Link href="/" className="ml-auto text-xs text-ink-soft link-underline">
        Close (Esc)
      </Link>
    </div>
  );
}
