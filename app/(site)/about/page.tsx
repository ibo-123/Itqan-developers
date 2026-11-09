import type { Metadata } from "next";
import { CORE_VALUES, SITE } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "About",
  description: `Vision, mission, and values of ${SITE.name}.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Excellence as a practice, not a slogan."
        description={`${SITE.name} (${SITE.arabicName}) means excellence, precision, dedication, and doing work with quality. We are building a lasting technology community at ${SITE.university}.`}
      />

      <section className="bg-soft py-16 sm:py-20">
        <Container className="grid gap-10 md:grid-cols-2">
          <article className="border-t-2 border-gold pt-6">
            <h2 className="font-display text-2xl font-semibold text-ink">
              Vision
            </h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              To establish a collaborative community of skilled and responsible
              technology innovators who use their knowledge to develop
              meaningful digital solutions.
            </p>
          </article>
          <article className="border-t-2 border-gold pt-6">
            <h2 className="font-display text-2xl font-semibold text-ink">
              Mission
            </h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              To empower students through practical software development,
              teamwork, knowledge sharing, continuous learning, and innovation.
            </p>
          </article>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <h2 className="font-display text-3xl font-semibold text-ink">
            Core values
          </h2>
          <p className="mt-3 max-w-2xl text-ink/65">
            These principles shape how we collaborate, ship projects, and grow
            as a community.
          </p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_VALUES.map((value) => (
              <li key={value.title} className="border-l-2 border-emerald/20 pl-4">
                <h3 className="font-display text-lg font-medium text-ink">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-ink/65">{value.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
