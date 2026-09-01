export function Footer() {
  return (
    <footer className="border-t border-line">
      {/* One quiet line — the dock is the page; the footer shouldn't compete. */}
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-7 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-ink-soft">
          <a href="mailto:dianlee99@gmail.com" className="link-underline">
            dianlee99@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/dian-lee/"
            target="_blank"
            rel="noreferrer"
            className="link-underline"
          >
            LinkedIn
          </a>
          <a
            href="/Dian-Lee-Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="link-underline"
          >
            Résumé
          </a>
        </div>
        <span className="italic text-ink-faint">
          Designed by hand, built by vibes.
        </span>
      </div>
    </footer>
  );
}
