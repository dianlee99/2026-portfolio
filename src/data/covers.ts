/** Cover art per project — points at a real asset in /public/work. */
export const COVERS: Record<string, string> = {
  intuit: "/work/intuit/hero.png",
  "capital-one-data": "/work/capital-one-data/hero.png",
  "capital-one-auto-refinance": "/work/capital-one-auto-refinance/hero.gif",
  "eureka-surveys": "/work/eureka-surveys/hero.png",
  archive: "/work/archive/warnermedia-1.png",
};

export function getCover(slug: string): string | undefined {
  return COVERS[slug];
}
