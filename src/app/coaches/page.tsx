import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CoachCard, CoachSlot } from "@/components/CoachCard";
import { SectionHeading } from "@/components/SectionHeading";
import { coaches, juniorCoachSlots } from "@/data/site";

export const metadata: Metadata = {
  title: "Coaches",
  description:
    "Meet the senior and junior coaching team at BBC Bouncers Fitness Gym in Akkarampalli, Tirupati — Dileep, Sekhar and Syed.",
  alternates: { canonical: "/coaches" },
};

export default function CoachesPage() {
  const seniors = coaches.filter((c) => c.tier === "senior");
  const juniors = coaches.filter((c) => c.tier === "junior");

  return (
    <>
      <PageHeader
        eyebrow="Coaches"
        title={<>The people<br />on the floor.</>}
        lead="Senior coaches set your programme and correct your form. Junior coaches keep the floor running and are there for every rep in between."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <SectionHeading eyebrow="Senior coaches" title="Programme and technique." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {seniors.map((c) => (
            <CoachCard key={c.name} coach={c} />
          ))}
        </div>
      </section>

      <section className="border-t border-ink-line bg-ink-raised">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <SectionHeading eyebrow="Junior coaches" title="On the floor with you." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {juniors.length > 0
              ? juniors.map((c) => <CoachCard key={c.name} coach={c} />)
              : Array.from({ length: juniorCoachSlots }, (_, i) => <CoachSlot key={i} />)}
          </div>
        </div>
      </section>
    </>
  );
}
