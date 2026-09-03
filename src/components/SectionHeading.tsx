export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-flame-orange">{eyebrow}</p>
      )}
      <h2 className="display text-4xl text-steel sm:text-5xl">{title}</h2>
      {lead && <p className="mt-4 text-base leading-relaxed text-smoke sm:text-lg">{lead}</p>}
      {align === "left" && <div className="rule-fade mt-7 w-full" />}
    </div>
  );
}
