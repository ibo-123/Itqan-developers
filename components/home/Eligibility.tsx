import { ELIGIBILITY } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Ornament } from "@/components/ui/Ornament";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Eligibility() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Eligibility"
            title="Who should apply."
          />
          <Ornament className="mt-6 justify-start" tone="emerald" />
        </div>
        <ul className="space-y-4">
          {ELIGIBILITY.map((item) => (
            <li
              key={item}
              className="flex gap-3 border-l-2 border-gold/70 bg-soft/70 px-4 py-3 text-ink/75"
            >
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
