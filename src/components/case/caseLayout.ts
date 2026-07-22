/** Inner content column — wide, bold measure shared across every case. */
export const caseInnerClass = "mx-auto max-w-6xl px-6";

/** Wider content column for the bold redesign system. */
export const caseWideClass = "mx-auto max-w-6xl px-6";

/** Extra-wide wrapper for the big hero image. */
export const caseHeroWideClass = "mx-auto max-w-[96rem] px-6";

/** Full-width band with a top rule; `raised` gives the alternating grey wash. */
export const caseBandClass = "border-t border-line";
export const caseBandRaisedClass = "border-t border-line bg-paper-raised";

/** Generous vertical rhythm inside a bold-system band. */
export const caseBandInnerClass = `${caseWideClass} py-16 md:py-24`;

/** Full-width horizontal rules */
export const caseSectionRuleClass = "border-t border-line";
export const caseSectionRuleYClass = "border-y border-line";

/** Shared spacing for case study headers and intro blocks. */
export const caseHeaderClass = `${caseInnerClass} pt-16 md:pt-20`;

/** Taller hero band — Intuit animated header. */
export const caseHeroHeaderClass =
  `${caseInnerClass} pt-16 pb-14 md:pt-20 md:pb-20`;

/** Full-width meta band — sits below header hero, outside max-width column */
export const caseMetaWrapClass = "mt-16 md:mt-20";

export const caseMetaBorderClass = caseMetaWrapClass;

export const caseMetaClass = `${caseInnerClass} grid grid-cols-2 gap-x-6 gap-y-5 py-8 text-sm md:grid-cols-4`;

export const caseMetaSpacedClass = caseMetaClass;

/** @deprecated Use caseMetaSpacedClass — kept as alias for bordered meta row. */
export const caseMetaSpacedNoBorderClass = caseMetaSpacedClass;

/** Full-width rule below the impact lead — pair with caseImpactSpacedClass / caseImpactSectionClass inside. */
export const caseImpactDividerClass = "border-b border-line";

export const caseImpactSectionClass =
  `${caseInnerClass} pt-16 pb-12 md:pt-20 md:pb-16`;

/** Extra space before metrics divider — Intuit, Capital One projects. */
export const caseImpactSpacedClass =
  `${caseInnerClass} pt-16 pb-16 md:pt-20 md:pb-20`;

export const caseMetricsBorderClass = caseSectionRuleYClass;

export const caseMetricsInnerClass = `${caseInnerClass} py-10`;

/** @deprecated Prefer caseMetricsBorderClass + caseMetricsInnerClass */
export const caseMetricsSectionClass = caseMetricsBorderClass;

/** @deprecated Prefer caseMetricsInnerClass */
export const caseMetricsWrapClass = caseMetricsInnerClass;

export const caseContentSectionClass =
  `${caseInnerClass} py-16 md:py-20`;

/** Full-width section divider + inner padding */
export const caseDividerSectionClass = caseSectionRuleClass;

export const caseDividerInnerClass =
  `${caseInnerClass} pt-12 pb-16 md:pt-14 md:pb-20`;

/** Padded section without a top rule */
export const caseSectionClass = `${caseInnerClass} py-12 md:py-14`;

/** Padded section with a full-width top rule */
export const caseSectionDividedClass = caseSectionRuleClass;

export const caseSectionDividedInnerClass = caseSectionClass;
