import { HOW_WE_WORK } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function HowWeWork() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="How we work"
          title="A clear rhythm from idea to impact."
          description="Collaboration, craftsmanship, and shared growth shape every phase of our work."
          className="mb-12 sm:mb-14"
        />

        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {HOW_WE_WORK.map((item) => (
            <li key={item.step} className="relative">
              <span className="font-display text-4xl font-semibold text-gold/80">
                {item.step}
              </span>
              <h3 className="mt-3 font-display text-lg font-medium text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
