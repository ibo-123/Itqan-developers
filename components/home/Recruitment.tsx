import { RECRUITMENT_STAGES } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Ornament } from "@/components/ui/Ornament";
import { SectionHeading } from "@/components/ui/SectionHeading";

type RecruitmentProps = {
  stages?: string[];
};

export function Recruitment({ stages }: RecruitmentProps) {
  const items = stages?.length ? stages : [...RECRUITMENT_STAGES];

  return (
    <section id="recruitment" className="scroll-mt-24 bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Process"
          title="A clear recruitment timeline."
          description="Every applicant moves through a transparent process managed by the ITQAN DEVELOPERS recruitment committee. Joining means becoming part of the organization and its broader activities."
          className="mb-4"
        />
        <Ornament className="mb-10 justify-start" tone="emerald" />

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((stage, index) => (
            <li
              key={stage}
              className="flex gap-4 border-l-2 border-gold/70 bg-soft px-5 py-5"
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
