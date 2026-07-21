"use client";

import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import {
  caseMetaSpacedClass,
  caseMetaWrapClass,
  caseSectionRuleYClass,
} from "@/components/case/caseLayout";

export function CaseMeta({
  children,
  className,
  delay = 0.05,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={`${caseMetaWrapClass} ${caseSectionRuleYClass}${className ? ` ${className}` : ""}`}
    >
      <Reveal delay={delay}>
        <dl className={caseMetaSpacedClass}>{children}</dl>
      </Reveal>
    </div>
  );
}
