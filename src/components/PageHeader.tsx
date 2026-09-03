export function PageHeader({ eyebrow, title, lead }: { eyebrow: string; title: React.ReactNode; lead: string }) {
  return (
    <section className="relative overflow-hidden border-b border-ink-line">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/4 h-80 w-[600px] opacity-[0.13] blur-[80px]"
        style={{ background: "radial-gradient(closest-side, #F58220, #E1251B 60%, transparent)" }}
      />
      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-flame-orange">{eyebrow}</p>
        <h1 className="display mt-4 text-5xl text-steel sm:text-7xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-smoke">{lead}</p>
      </div>
    </section>
  );
}
