import { Container } from "@/components/ui/Container";
import { GeometricPattern } from "@/components/ui/GeometricPattern";
import { Ornament } from "@/components/ui/Ornament";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function MissionVision() {
  return (
    <section className="relative overflow-hidden bg-emerald py-20 text-white sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(213,182,106,0.14),transparent_45%)]" />
      <GeometricPattern className="text-gold" opacity={0.08} variant="star" />
      <Container className="relative">
        <SectionHeading
          eyebrow="Purpose"
          title="Mission & vision that guide every build."
          tone="light"
          className="mb-4"
        />
        <Ornament className="mb-12 justify-start" />

        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
          <article className="relative overflow-hidden border border-gold/20 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
            <div
              aria-hidden="true"
              className="absolute -right-6 -top-6 h-20 w-20 rotate-45 border border-gold/20"
            />
            <h3 className="font-display text-xl font-semibold text-gold">
              Vision
            </h3>
            <p className="mt-4 text-base leading-relaxed text-white/75">
              To establish a collaborative community of skilled and responsible
              technology innovators who use their knowledge to develop
              meaningful digital solutions.
            </p>
          </article>

          <article className="relative overflow-hidden border border-gold/20 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
            <div
              aria-hidden="true"
              className="absolute -right-6 -top-6 h-20 w-20 rotate-45 border border-gold/20"
            />
            <h3 className="font-display text-xl font-semibold text-gold">
              Mission
            </h3>
            <p className="mt-4 text-base leading-relaxed text-white/75">
              To empower students through practical software development,
              teamwork, knowledge sharing, continuous learning, and innovation.
            </p>
          </article>
        </div>
      </Container>
    </section>
  );
}
