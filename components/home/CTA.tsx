import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GeometricPattern } from "@/components/ui/GeometricPattern";
import { Ornament } from "@/components/ui/Ornament";

type CTAProps = {
  isOpen?: boolean;
  telegramUrl?: string | null;
};

export function CTA({ isOpen = true, telegramUrl }: CTAProps) {
  return (
    <section className="relative overflow-hidden bg-emerald-deep py-20 text-white sm:py-24">
      <GeometricPattern className="text-gold" opacity={0.09} variant="star" />
      <Container className="relative text-center">
        <p className="font-arabic text-3xl text-gold/90" dir="rtl">
          انضم إلى مجتمع إتقان
        </p>
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
          {isOpen ? "Recruitment open" : "Recruitment update"}
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {isOpen
            ? `Join ${SITE.name} and grow with purpose.`
            : "Follow announcements for the next intake."}
        </h2>
        <Ornament className="mt-6" />
        <p className="mx-auto mt-5 max-w-xl text-base text-white/70">
          Become part of a community where passionate students learn, collaborate,
          solve problems, and build meaningful technology together.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={isOpen ? "/apply" : "/status"} size="lg" variant="primary">
            {isOpen ? "Apply Now" : "Track Application"}
            <ArrowRight className="h-4 w-4" />
          </Button>
          {telegramUrl ? (
            <Button href={telegramUrl} size="lg" variant="ghost" target="_blank" rel="noopener noreferrer">
              Contact on Telegram
            </Button>
          ) : (
            <Button href="/contact" size="lg" variant="ghost">
              Contact the team
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
