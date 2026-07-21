"use client";

import Link from "next/link";
import { projects, type Project } from "@/data/projects";

export function NextProject({ current }: { current: Project }) {
  const idx = projects.findIndex((p) => p.slug === current.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <div className="mx-auto max-w-[900px] px-6 pt-16">
      <Link
        href={`/work/${next.slug}`}
        className="group block border-t border-line pt-8"
      >
        <p className="label mb-2 uppercase">Next</p>
        <h2 className="text-title font-semibold">
          <span className="link-underline">{next.client}</span>
          <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </h2>
        <p className="mt-2 max-w-reading text-ink-soft">{next.summary}</p>
      </Link>
    </div>
  );
}
