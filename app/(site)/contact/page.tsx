import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { getContactEmail, getTelegramUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${SITE.name} for recruitment and community inquiries.`,
};

export default function ContactPage() {
  const telegramUrl = getTelegramUrl();
  const email = getContactEmail();

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Reach the ITQAN DEVELOPERS team."
        description="Questions about registration, eligibility, recruitment, or general community inquiries are welcome."
      />
      <section className="bg-soft py-16 sm:py-20">
        <Container className="grid gap-8 md:grid-cols-2">
          <div className="border border-emerald/10 bg-white px-6 py-8">
            <h2 className="font-display text-xl font-semibold text-ink">
              Email
            </h2>
            <p className="mt-3 text-ink/70">
              Write to the community for formal inquiries.
            </p>
            <a
              href={`mailto:${email}`}
              className="mt-4 inline-block font-medium text-emerald hover:underline"
            >
              {email}
            </a>
          </div>

          <div className="border border-emerald/10 bg-white px-6 py-8">
            <h2 className="font-display text-xl font-semibold text-ink">
              Telegram support
            </h2>
            <p className="mt-3 text-ink/70">
              Contact the team for registration help, eligibility questions,
              recruitment updates, and general support.
            </p>
            {telegramUrl ? (
              <Button
                href={telegramUrl}
                className="mt-6"
                variant="secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Telegram
              </Button>
            ) : (
              <p className="mt-6 text-sm text-ink/50">
                Telegram contact will appear here once{" "}
                <code className="text-xs">NEXT_PUBLIC_TELEGRAM_URL</code> is
                configured.
              </p>
            )}
          </div>

          <div className="border border-emerald/10 bg-white px-6 py-8 md:col-span-2">
            <h2 className="font-display text-xl font-semibold text-ink">
              Ready to join?
            </h2>
            <p className="mt-3 text-ink/70">
              Start your membership application to become part of ITQAN
              DEVELOPERS.
            </p>
            <Button href="/apply" className="mt-6" variant="secondary">
              Apply now
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
