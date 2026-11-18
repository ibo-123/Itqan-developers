import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { StatusTracker } from "@/components/forms/StatusTracker";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Track Application",
  description: `Secure application status tracking for ${SITE.name}.`,
};

export default function StatusPage() {
  return (
    <>
      <PageHero
        eyebrow="Applicant portal"
        title="Track your application"
        description="Enter the email and tracking code from your submission confirmation. Status details are private and never exposed through public links."
      />
      <section className="bg-soft py-16 sm:py-20">
        <Container className="max-w-xl">
          <StatusTracker />
        </Container>
      </section>
    </>
  );
}
