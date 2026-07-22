import Link from "next/link";
import { Compass, Twitter, Linkedin, Github } from "lucide-react";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Career library", href: "/careers" },
      { label: "Career quiz", href: "/quiz" },
      { label: "Simulations", href: "/careers" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers at CareerVerse", href: "/jobs" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-16">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500">
                <Compass className="h-4.5 w-4.5 text-white" strokeWidth={2.25} />
              </span>
              <span className="font-display text-lg font-semibold tracking-tight">
                CareerVerse<span className="text-primary-400">AI</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted">
              Experience your dream career before choosing it.
            </p>
            <div className="mt-6 flex items-center gap-2 text-muted">
              <a
                href="#"
                aria-label="Twitter"
                className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-medium">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted sm:flex-row">
          <span>© {new Date().getFullYear()} CareerVerse AI. All rights reserved.</span>
          <span>Built for people who want to know before they commit.</span>
        </div>
      </div>
    </footer>
  );
}
