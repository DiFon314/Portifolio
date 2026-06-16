import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <header className="mx-auto max-w-7xl px-6 pt-16 pb-12">
      <div className="font-mono-tech text-xs uppercase tracking-[0.3em] text-brand">{eyebrow}</div>
      <h1 className="mt-4 max-w-3xl text-4xl font-light tracking-tight text-foreground md:text-6xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">{description}</p>
      ) : null}
      {children}
      <div className="mt-10 h-px w-full bg-border" />
    </header>
  );
}
