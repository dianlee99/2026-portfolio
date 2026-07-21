import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, projects } from "@/data/projects";
import { NextProject } from "@/components/NextProject";
import { PasswordGate } from "@/components/PasswordGate";
import { ReadingProgress } from "@/components/ReadingProgress";
import { MiniDock } from "@/components/dock/MiniDock";
import { EurekaCase } from "@/components/case/EurekaCase";
import { ArchiveCase } from "@/components/case/ArchiveCase";
import { AutoRefinanceCase } from "@/components/case/AutoRefinanceCase";
import { DataRegistryCase } from "@/components/case/DataRegistryCase";
import { IntuitCase } from "@/components/case/IntuitCase";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: `${project.client} · Dian Lee`,
    description: project.summary,
  };
}

function CaseStudy({ slug }: { slug: string }) {
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="pb-28 md:pb-32">
      <ReadingProgress />
      {project.slug === "eureka-surveys" && <EurekaCase project={project} />}
      {project.slug === "archive" && <ArchiveCase project={project} />}
      {project.slug === "capital-one-auto-refinance" && (
        <AutoRefinanceCase project={project} />
      )}
      {project.slug === "capital-one-data" && (
        <DataRegistryCase project={project} />
      )}
      {project.slug === "intuit" && <IntuitCase project={project} />}
      <NextProject current={project} />
      <MiniDock currentSlug={project.slug} />
    </article>
  );
}

export default function WorkPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  if (project.locked) {
    return (
      <PasswordGate title={`${project.client} · protected`}>
        <CaseStudy slug={params.slug} />
      </PasswordGate>
    );
  }

  return <CaseStudy slug={params.slug} />;
}
