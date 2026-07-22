import Link from "next/link";
import { Compass, Sparkles } from "lucide-react";

const highlights = [
  "42+ realistic career simulations",
  "AI-generated compatibility scores",
  "A learning roadmap tailored to you",
];

export function AuthShell({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16">
      <div className="mesh-aurora pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 grid-overlay" />

      <div className="relative grid w-full max-w-4xl gap-10 lg:grid-cols-2 lg:items-center">
        <div className="hidden lg:block">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500">
              <Compass className="h-5 w-5 text-white" strokeWidth={2.25} />
            </span>
            <span className="font-display text-xl font-semibold tracking-tight">
              CareerVerse<span className="text-primary-400">AI</span>
            </span>
          </Link>

          <h1 className="mt-10 max-w-sm font-display text-3xl font-semibold leading-tight tracking-tight">
            {title}
          </h1>
          <p className="mt-4 max-w-sm text-sm text-muted">{subtitle}</p>

          <ul className="mt-10 space-y-3">
            {highlights.map((h) => (
              <li key={h} className="flex items-center gap-2.5 text-sm text-muted">
                <Sparkles className="h-4 w-4 shrink-0 text-secondary-400" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500">
                <Compass className="h-4.5 w-4.5 text-white" strokeWidth={2.25} />
              </span>
              <span className="font-display text-lg font-semibold tracking-tight">
                CareerVerse<span className="text-primary-400">AI</span>
              </span>
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
