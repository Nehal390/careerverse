interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="relative mesh-aurora overflow-hidden pb-16 pt-36 md:pt-44">
      <div className="pointer-events-none absolute inset-0 grid-overlay" />
      <div className="container relative text-center">
        <span className="text-xs font-medium uppercase tracking-widest text-secondary-400">
          {eyebrow}
        </span>
        <h1 className="mx-auto mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">{description}</p>
        )}
      </div>
    </section>
  );
}
