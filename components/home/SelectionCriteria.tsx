import { SELECTION_CRITERIA } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Ornament } from "@/components/ui/Ornament";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SelectionCriteria() {
  return (
    <section className="bg-soft py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Selection criteria"
          title="A transparent 100-point evaluation framework."
          description="Scores inform committee decisions. They do not automatically accept or reject applicants."
          className="mb-4"
        />
        <Ornament className="mb-10 justify-start" tone="emerald" />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SELECTION_CRITERIA.map((item) => (
            <li
              key={item.key}
              className="border border-emerald/10 bg-white px-5 py-5"
            >
              <p className="font-display text-3xl font-semibold text-gold-deep">
                {item.weight}%
              </p>
              <p className="mt-2 text-sm font-medium text-ink">{item.label}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
