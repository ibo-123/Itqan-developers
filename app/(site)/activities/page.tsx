import type { Metadata } from "next";
import { ACTIVITIES, SITE } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "What We Do",
  description: `Activities and focus areas of ${SITE.name}.`,
};

export default function ActivitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="Practical building across the software lifecycle."
        description="From design and engineering to research and knowledge sharing — our activities expand as the community grows."
      />

      <section className="bg-soft py-16 sm:py-20">
        <Container>
          <ul className="divide-y divide-emerald/10 border-y border-emerald/10">
            {ACTIVITIES.map((activity, index) => (
              <li
                key={activity}
                className="flex items-baseline gap-4 py-5 sm:gap-6"
              >
                <span className="font-display text-sm text-gold-deep">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-lg text-ink sm:text-xl">
                  {activity}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-2xl text-sm text-ink/60">
            New specializations and activities can be added by administrators as
            the community evolves — this list is a living foundation, not a
            fixed boundary.
          </p>
          <div className="mt-8">
            <Button href="/apply" variant="secondary">
              Apply to contribute
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
