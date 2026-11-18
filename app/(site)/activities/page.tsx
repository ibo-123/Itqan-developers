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
        title="Learning, collaboration, and meaningful building."
        description="From software development to workshops and knowledge sharing — our activities expand as the community grows."
      />

      <section className="bg-soft py-16 sm:py-20">
        <Container>
          <ul className="divide-y divide-emerald/10 border-y border-emerald/10">
            {ACTIVITIES.map((activity, index) => (
              <li key={activity.title} className="py-5 sm:px-2">
                <div className="flex items-baseline gap-4 sm:gap-6">
                  <span className="font-display text-sm text-gold-deep">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="font-display text-lg text-ink sm:text-xl">
                      {activity.title}
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm text-ink/65">
                      {activity.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
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
