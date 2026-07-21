import type { ReactNode } from "react";

export function ImpactNote({
  label = "Impact",
  children,
  items,
}: {
  label?: string;
  children?: ReactNode;
  items?: string[];
}) {
  return (
    <div className="rounded-lg border border-line bg-paper-raised p-6">
      <p className="label mb-3 uppercase">{label}</p>
      {children && (
        <div className="leading-relaxed text-ink-soft [&_p]:text-ink-soft">
          {children}
        </div>
      )}
      {items && (
        <ul className="space-y-2 text-ink-soft [&_strong]:text-ink">
          {items.map((it, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-ink-faint">↗</span>
              <span dangerouslySetInnerHTML={{ __html: it }} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
