import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[900px] px-6 pt-24 md:pt-32">
      <h1 className="text-hero font-semibold">404</h1>
      <p className="mt-4 max-w-reading text-ink-soft">
        This page wandered off. Let&apos;s get you back to the work.
      </p>
      <Link href="/" className="link-underline mt-6 inline-block">
        Back to work
      </Link>
    </div>
  );
}
