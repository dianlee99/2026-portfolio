import type { Internship, Project } from "@/data/projects";
import { CaseTheme } from "@/components/case/CaseTheme";
import { Row, Accent, Label } from "@/components/case/CaseKit";
import { LinkedText } from "@/components/LinkedText";
import { CASE_ACCENTS } from "@/components/case/accents";

/** Chrome-less archive image. */
function Shot({
  src,
  alt,
  cover = false,
}: {
  src: string;
  alt: string;
  cover?: boolean;
}) {
  if (cover) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-xl">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="block w-full" />
    </div>
  );
}

/** Three-up row where every cell is the SAME height. Each image fills an
 *  equal aspect-ratio box with object-cover, so wider images crop their sides
 *  instead of rendering shorter than their neighbors. */
function Triptych({ images }: { images: { src: string; caption?: string }[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {images.map((img, i) => (
        <figure key={i}>
          {/* Square cells: the near-square middle image stays ~uncropped while
              the two wider outer images grow to the same height, cropping
              their sides. All three end up equal height. */}
          <div className="relative aspect-square overflow-hidden rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.caption ?? ""}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>
          {img.caption && (
            <figcaption className="mt-2 text-sm text-ink-faint">
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

function Images({ item }: { item: Internship }) {
  if (item.wide) {
    return <Shot src={item.images[0].src} alt="" />;
  }
  if (item.images.length === 3) {
    return <Triptych images={item.images} />;
  }
  const cols = item.images.length >= 4 ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2";
  return (
    <div className={`grid gap-4 ${cols}`}>
      {item.images.map((img, i) => (
        <figure key={i}>
          <Shot src={img.src} alt={img.caption ?? ""} cover={img.cover} />
          {img.caption && (
            <figcaption className="mt-2 text-sm text-ink-faint">
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

export function ArchiveCase({ project }: { project: Project }) {
  const internships = project.internships ?? [];

  return (
    <CaseTheme accent={CASE_ACCENTS[project.slug]}>
      {/* Hero — no hero image; this is an archive, not a single story. */}
      <section className="relative overflow-hidden px-6 pb-10 pt-36 md:pt-48">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[60vh]"
          style={{
            background:
              "radial-gradient(ellipse 45% 55% at 28% 0%, color-mix(in srgb, var(--case-accent) 12%, transparent), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl">
          <Label>{project.client}</Label>
          <h1 className="mt-8 max-w-4xl text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.035em]">
            <Accent>Early</Accent> work
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">
            {project.subtitle}
          </p>
          <div className="mt-10 grid max-w-2xl grid-cols-2 gap-6 md:grid-cols-3">
            {[
              { label: "Role", value: "Design Intern" },
              { label: "Placements", value: String(internships.length) },
              { label: "Focus", value: "UX · Research" },
            ].map((m) => (
              <div key={m.label}>
                <Label>{m.label}</Label>
                <div className="mt-1.5 font-medium">{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* One Row per internship — company in the label rail. */}
      {internships.map((item) => (
        <Row key={item.company} label={item.company}>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h2 className="text-[clamp(1.7rem,3.4vw,2.4rem)] font-semibold tracking-[-0.03em]">
              {item.company}
            </h2>
            <Label>{item.kind}</Label>
          </div>
          <p className="mt-5 max-w-2xl leading-relaxed text-ink-soft">
            <LinkedText text={item.body} links={item.links} />
          </p>
          <dl className="mt-6 flex flex-wrap gap-x-12 gap-y-4 text-sm">
            <div>
              <dt className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-ink-faint">
                Role
              </dt>
              <dd className="mt-1 text-ink-soft">{item.role}</dd>
            </div>
            <div>
              <dt className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-ink-faint">
                Duration
              </dt>
              <dd className="mt-1 text-ink-soft">{item.duration}</dd>
            </div>
            {item.tools && (
              <div>
                <dt className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-ink-faint">
                  Tools
                </dt>
                <dd className="mt-1 text-ink-soft">{item.tools}</dd>
              </div>
            )}
          </dl>
          <div className="mt-8">
            <Images item={item} />
          </div>
        </Row>
      ))}
      <div className="h-16" />
    </CaseTheme>
  );
}
