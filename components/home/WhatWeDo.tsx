import { ACTIVITIES } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Ornament } from "@/components/ui/Ornament";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="scroll-mt-24 bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="What we do"
          title="Learning, collaboration, and meaningful building."
          description="ITQAN DEVELOPERS grows through practice — from shared learning to collaborative software initiatives."
          className="mb-4"
        />
        <Ornament className="mb-10 justify-start" tone="emerald" />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ACTIVITIES.map((item) => (
            <li
              key={item.title}
              className="border-l-2 border-gold/60 bg-soft/70 px-5 py-5"
            >
              <h3 className="font-display text-lg font-medium text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
