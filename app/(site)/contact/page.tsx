import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${SITE.name}.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Connect with the community."
        description="Questions about membership, projects, or collaboration are welcome. A full contact form and inbox workflow will follow with the backend phase."
      />

      <section className="bg-soft py-16 sm:py-20">
        <Container className="grid gap-8 md:grid-cols-2">
          <div className="border border-emerald/10 bg-white px-6 py-8">
            <h2 className="font-display text-xl font-semibold text-ink">
              Community
            </h2>
            <p className="mt-3 text-ink/70">
              {SITE.name} · {SITE.university}
            </p>
            <p className="mt-1 text-sm text-ink/55" dir="rtl">
              {SITE.arabicName}
            </p>
            <p className="mt-6 text-sm text-ink/60">
              Email placeholder for development setup:
            </p>
            <p className="mt-1 font-medium text-emerald">{SITE.email}</p>
          </div>
          <div className="border border-emerald/10 bg-white px-6 py-8">
            <h2 className="font-display text-xl font-semibold text-ink">
              Want to join?
            </h2>
            <p className="mt-3 text-ink/70">
              The fastest path into the community is the membership application.
            </p>
            <Button href="/apply" className="mt-6" variant="secondary">
              Go to application
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
