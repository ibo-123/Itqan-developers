import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { ApplicationWizard } from "@/components/forms/ApplicationWizard";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Apply",
  description: `Join ${SITE.name} — community membership application.`,
};

export default function ApplyPage() {
  return (
    <>
      <PageHero
        eyebrow="Join the community"
        title="Membership application"
        description="Apply to join ITQAN DEVELOPERS. Share your background, interests, and motivation. Beginners are welcome. Your information remains confidential."
      />
      <section className="bg-soft py-16 sm:py-20">
        <Container className="max-w-3xl">
          <ApplicationWizard />
        </Container>
      </section>
    </>
  );
}
