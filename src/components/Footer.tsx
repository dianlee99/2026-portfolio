import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[900px] flex-col gap-4 px-6 py-6 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
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
        <span className="text-ink-faint">© {year} Dian Lee</span>
      </div>
    </footer>
  );
}
