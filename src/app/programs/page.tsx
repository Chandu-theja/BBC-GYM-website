import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ProgramCard } from "@/components/ProgramCard";
import { programs } from "@/data/site";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Strength training, CrossFit, Zumba, aerobics, cardio and personal training at BBC Bouncers Fitness Gym, Akkarampalli, Tirupati.",
  alternates: { canonical: "/programs" },
};

export default function ProgramsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Programs"
        title={<>Seven ways<br />to train.</>}
        lead="Every program runs with a coach on the floor. Try any of them on a free trial session before committing to a plan."
      />
      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="grid gap-5 lg:grid-cols-2">
          {programs.map((p) => (
            <ProgramCard key={p.slug} program={p} detailed />
          ))}
        </div>
      </section>
    </>
  );
}
