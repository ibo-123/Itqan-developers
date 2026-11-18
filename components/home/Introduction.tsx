import { SITE } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Ornament } from "@/components/ui/Ornament";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Introduction() {
  return (
    <section id="community" className="scroll-mt-24 bg-soft py-20 sm:py-24">
      <Container className="grid items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="About ITQAN"
            title="A community built to learn, collaborate, and create."
          />
          <Ornament className="mt-6 justify-start" tone="emerald" />
          <p className="mt-6 font-arabic text-3xl text-emerald/80" dir="rtl">
            {SITE.arabicName}
          </p>
          <p className="mt-2 text-sm tracking-wide text-ink/50">
            Mastery · Precision · Dedication
          </p>
        </div>
        <div className="space-y-5 border-l-2 border-gold/50 pl-6 text-base leading-relaxed text-ink/75 sm:pl-8 sm:text-lg">
          <p>
            <strong className="font-medium text-ink">{SITE.name}</strong> is an
            Islamic-inspired coding and technology community at{" "}
            {SITE.universityShort}. We bring together students passionate about
            programming, software engineering, design, research, and collaborative
            problem-solving.
          </p>
          <p>
            {SITE.arabicName} ({SITE.meaning.toLowerCase()}) guides how we work:
            with care, responsibility, and continuous improvement.
          </p>
          <p>
            Members join the organization — not a single project. Community
            initiatives such as ASTU_MSJ are activities under ITQAN DEVELOPERS,
            and future work may include websites, apps, platforms, and more.
          </p>
        </div>
      </Container>
    </section>
  );
}
