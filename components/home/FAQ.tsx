import { FAQ_ITEMS } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Ornament } from "@/components/ui/Ornament";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FAQ() {
  return (
    <section className="bg-soft py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="FAQ"
          title="Common questions about recruitment."
          className="mb-4"
        />
        <Ornament className="mb-10 justify-start" tone="emerald" />
        <div className="divide-y divide-emerald/10 border-y border-emerald/10 bg-white">
          {FAQ_ITEMS.map((item) => (
            <details key={item.question} className="group px-5 py-4">
              <summary className="cursor-pointer list-none font-medium text-ink marker:content-none">
                <span className="flex items-center justify-between gap-4">
                  {item.question}
                  <span className="text-gold transition group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink/65">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
