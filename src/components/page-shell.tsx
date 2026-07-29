import type { ReactNode } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: "var(--gradient-cream)" }} />
        <div className="pointer-events-none absolute -top-32 -right-32 -z-10 h-[420px] w-[420px] rounded-full opacity-25 blur-3xl" style={{ background: "var(--gradient-brand)" }} />
        <div className="mx-auto max-w-7xl px-6 pt-14 pb-10 md:pt-20">
          {eyebrow && (
            <span className="text-xs font-semibold uppercase tracking-widest text-berry">{eyebrow}</span>
          )}
          <h1 className="mt-2 max-w-3xl font-display text-4xl leading-[1.02] tracking-tight md:text-6xl">{title}</h1>
          {intro && <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{intro}</p>}
        </div>
      </section>
      <main className="mx-auto max-w-7xl px-6 pb-24">{children}</main>
      <SiteFooter />
    </div>
  );
}
