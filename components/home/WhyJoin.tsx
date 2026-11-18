import { JOIN_BENEFITS } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Ornament } from "@/components/ui/Ornament";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WhyJoin() {
  return (
    <section className="bg-soft py-20 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHeading
            eyebrow="Why join us"
            title="Grow with a community that values craft and collaboration."
          />
          <Ornament className="mt-6 justify-start" tone="emerald" />
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {JOIN_BENEFITS.map((item) => (
            <li
              key={item}
              className="border border-emerald/10 bg-white px-4 py-4 text-sm text-ink/75"
            >
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
