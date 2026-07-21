"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { getProject } from "@/data/projects";
import { PasswordGate } from "@/components/PasswordGate";
import { MiniDock } from "@/components/dock/MiniDock";
import { EurekaCase } from "@/components/case/EurekaCase";
import { ArchiveCase } from "@/components/case/ArchiveCase";
import { AutoRefinanceCase } from "@/components/case/AutoRefinanceCase";
import { DataRegistryCase } from "@/components/case/DataRegistryCase";
import { IntuitCase } from "@/components/case/IntuitCase";

/**
 * Full-screen "window" that scales up from the clicked dock icon — the
 * un-minimize / genie feel.
 */
export function ProjectWindow({
  slug,
  originRect,
  onClose,
  onSelectProject,
}: {
  slug: string;
  originRect: DOMRect;
  onClose: () => void;
  onSelectProject?: (slug: string) => void;
}) {
  const project = getProject(slug);

  // lock scroll + close on Escape while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) return null;

  // origin for the scale animation, relative to viewport center
  const originX = originRect.left + originRect.width / 2;
  const originY = originRect.top + originRect.height / 2;

  const body = (
    <div className="pb-24">
      {project.slug === "eureka-surveys" && <EurekaCase project={project} />}
      {project.slug === "archive" && <ArchiveCase project={project} />}
      {project.slug === "capital-one-auto-refinance" && (
        <AutoRefinanceCase project={project} />
      )}
      {project.slug === "capital-one-data" && (
        <DataRegistryCase project={project} />
      )}
      {project.slug === "intuit" && <IntuitCase project={project} />}
    </div>
  );

  return (
    <motion.div
      className="fixed inset-0 z-[80] overflow-y-auto bg-paper"
      initial={{
        opacity: 0,
        scale: 0.08,
        transformOrigin: `${originX}px ${originY}px`,
      }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{
        opacity: 0,
        scale: 0.08,
        transformOrigin: `${originX}px ${originY}px`,
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* window chrome — traffic lights + close */}
      <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-line bg-paper/90 px-5 py-3 backdrop-blur-md">
        <button
          onClick={onClose}
          aria-label="Close"
          className="group flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#ff5f57]"
        >
          <span className="text-[8px] leading-none text-black/50 opacity-0 group-hover:opacity-100">
            ✕
          </span>
        </button>
        <span className="h-3.5 w-3.5 rounded-full bg-[#febc2e]" />
        <span className="h-3.5 w-3.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs text-ink-faint">{project.client}</span>
        <button
          onClick={onClose}
          className="ml-auto text-xs text-ink-soft link-underline"
        >
          Close (Esc)
        </button>
      </div>

      {project.locked ? (
        <PasswordGate
          title={`${project.client} · protected`}
          layout="overlay"
        >
          {body}
        </PasswordGate>
      ) : (
        body
      )}

      {/* persistent mini-dock — swaps projects in place, Home closes the window */}
      <MiniDock
        currentSlug={slug}
        onSelectProject={(next) => onSelectProject?.(next)}
        onHome={onClose}
      />
    </motion.div>
  );
}
