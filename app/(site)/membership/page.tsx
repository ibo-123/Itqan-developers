import type { Metadata } from "next";
import { SPECIALIZATIONS, SITE } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Membership",
  description: `Benefits, eligibility, and specializations for joining ${SITE.name}.`,
};

const BENEFITS = [
  "Work on real-world projects.",
  "Improve technical skills.",
  "Collaborate with other developers.",
  "Learn software engineering practices.",
  "Build a professional portfolio.",
  "Participate in innovation and research.",
  "Share knowledge and experience.",
];

const ELIGIBILITY = [
  "Interest in software development or technology.",
  "Willingness to learn.",
  "Commitment and responsibility.",
  "Ability to collaborate.",
  "Willingness to participate in project activities.",
];

export default function MembershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Membership"
        title="Grow with a community that values excellence."
        description="Membership is open and growing. There is no fixed maximum number of members — founding specializations are focus areas, not exclusive vacancies."
      />

      <section className="bg-white py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">
              Benefits of joining
            </h2>
            <ul className="mt-6 space-y-3">
              {BENEFITS.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-ink/75 before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-gold before:content-['']"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">
              Eligibility
            </h2>
            <ul className="mt-6 space-y-3">
              {ELIGIBILITY.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-ink/75 before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-emerald before:content-['']"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-ink/60">
              Previous programming experience is an advantage but is{" "}
              <strong className="font-medium text-ink">not mandatory</strong>.
              Beginners are welcome.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-soft py-16 sm:py-20">
        <Container>
          <h2 className="font-display text-2xl font-semibold text-ink">
            Specialization opportunities
          </h2>
          <p className="mt-3 max-w-2xl text-ink/65">
            Multiple people can join the same specialization. Categories can be
            created, edited, or disabled by administrators over time.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {SPECIALIZATIONS.map((item) => (
              <li
                key={item.id}
                className="border-l-2 border-gold/80 bg-white px-5 py-4"
              >
                <h3 className="font-medium text-ink">{item.title}</h3>
                <p className="mt-1 text-sm text-ink/60">{item.description}</p>
              </li>
            ))}
          </ul>
          <Button href="/apply" className="mt-10" size="lg" variant="secondary">
            Start your application
          </Button>
        </Container>
      </section>
    </>
  );
}
