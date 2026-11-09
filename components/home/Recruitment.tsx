import { RECRUITMENT_STAGES } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Recruitment() {
  return (
    <section className="bg-soft py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Recruitment"
          title="A transparent path into the community."
          description="Applications are open to motivated students. Beginners are welcome — prior experience helps, but commitment and curiosity matter most. There is no fixed membership cap."
          className="mb-12 sm:mb-14"
        />

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RECRUITMENT_STAGES.map((stage, index) => (
            <li
              key={stage}
              className="flex gap-4 border-l-2 border-gold/70 bg-white px-5 py-5"
            >
              <span className="font-display text-sm font-semibold text-emerald">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-sm font-medium leading-snug text-ink sm:text-base">
                {stage}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
