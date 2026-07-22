import { ZoomReveal } from "@/components/case/ZoomReveal";
import { caseHeroWideClass } from "@/components/case/caseLayout";

/** Big, wide hero image shared across every case study. */
export function CaseHeroImage({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className={`${caseHeroWideClass} mt-10 md:mt-12`}>
      <ZoomReveal className="rounded-2xl border border-line bg-paper-raised">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : undefined}
          className="block w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </ZoomReveal>
    </div>
  );
}
