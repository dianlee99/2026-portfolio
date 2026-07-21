import type { ReactNode } from "react";

export function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="link-underline text-ink"
    >
      {children}
    </a>
  );
}

/** Weaves external links into plain copy at matching phrases. */
export function LinkedText({
  text,
  links,
}: {
  text: string;
  links?: { text: string; href: string }[];
}) {
  if (!links?.length) return <>{text}</>;

  const nodes: ReactNode[] = [];
  let remaining = text;

  for (const link of links) {
    const idx = remaining.indexOf(link.text);
    if (idx === -1) continue;
    if (idx > 0) nodes.push(remaining.slice(0, idx));
    nodes.push(
      <ExternalLink key={`${link.href}-${link.text}`} href={link.href}>
        {link.text}
      </ExternalLink>
    );
    remaining = remaining.slice(idx + link.text.length);
  }

  if (remaining) nodes.push(remaining);

  return <>{nodes}</>;
}
