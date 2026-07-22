export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-xl font-normal sm:flex-row sm:items-center sm:justify-between md:py-7">
        <div className="flex flex-wrap gap-x-7 gap-y-1.5 text-ink">
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
        <span className="italic text-ink-soft">Built with vibes and love.</span>
      </div>
    </footer>
  );
}
