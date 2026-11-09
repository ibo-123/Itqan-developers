import { SITE } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Ornament } from "@/components/ui/Ornament";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Introduction() {
  return (
    <section className="relative overflow-hidden bg-soft py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-emerald/[0.04]"
      />
      <Container className="relative grid items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Who we are"
            title="A community built around purpose and craft."
          />
          <Ornament className="mt-6 justify-start" tone="emerald" />
          <p className="mt-6 font-arabic text-3xl text-emerald/80" dir="rtl">
            {SITE.arabicName}
          </p>
          <p className="mt-2 text-sm tracking-wide text-ink/50">
            Excellence · Precision · Dedication
          </p>
        </div>
        <div className="space-y-5 border-l-2 border-gold/50 pl-6 text-base leading-relaxed text-ink/75 sm:pl-8 sm:text-lg">
          <p>
            <strong className="font-medium text-ink">{SITE.name}</strong> (
            <span className="font-arabic" dir="rtl">
              {SITE.arabicName}
            </span>
            ) is a growing community of students interested in programming,
            software engineering, technology, innovation, and collaborative
            problem-solving.
          </p>
          <p>
            We bring together motivated developers, designers, researchers, and
            technology enthusiasts to build practical software solutions — from
            websites and mobile apps to platforms and research-driven tools.
          </p>
          <p>
            Our first project is <strong className="text-ink">ASTU_MSJ</strong>,
            but ITQAN DEVELOPERS is not limited to a single initiative. The
            community continues to expand across roles, projects, and ideas —
            with room for every committed member who wants to grow.
          </p>
        </div>
      </Container>
    </section>
  );
}
