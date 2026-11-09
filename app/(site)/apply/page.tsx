import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { ApplicationForm } from "@/components/forms/ApplicationForm";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Apply",
  description: `Membership application for ${SITE.name}.`,
};

export default function ApplyPage() {
  return (
    <>
      <PageHero
        eyebrow="Apply"
        title="Membership application"
        description="Beginners are welcome. Previous experience helps but is not required. Applicant information is private and never shown on public pages."
      />

      <section className="bg-soft py-16 sm:py-20">
        <Container className="max-w-3xl">
          <ApplicationForm />
        </Container>
      </section>
    </>
  );
}
