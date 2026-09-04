export function PageHeader({ eyebrow, title, lead }: { eyebrow: string; title: React.ReactNode; lead: string }) {
  return (
    <section className="relative overflow-hidden border-b border-ink-line">
      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">{eyebrow}</p>
        <h1 className="display mt-4 text-5xl text-bone sm:text-7xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{lead}</p>
      </div>
    </section>
  );
}
