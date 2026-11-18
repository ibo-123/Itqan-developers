import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GeometricPattern } from "@/components/ui/GeometricPattern";
import { Ornament } from "@/components/ui/Ornament";

type HeroProps = {
  announcement?: string;
  deadlineLabel?: string | null;
  isOpen?: boolean;
};

export function Hero({
  announcement,
  deadlineLabel,
  isOpen = true,
}: HeroProps) {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-emerald-deep text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,rgba(213,182,106,0.18),transparent_42%),linear-gradient(165deg,#071814_0%,#0c2a23_45%,#123c32_100%)]" />
      <GeometricPattern className="text-gold" opacity={0.1} variant="star" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-1/2 hidden h-[32rem] w-[32rem] -translate-y-1/2 lg:block"
      >
        <div className="absolute inset-0 rotate-45 border border-gold/20 animate-float-slow" />
        <div className="absolute inset-12 rotate-45 border border-gold/15" />
      </div>

      <Container className="relative flex min-h-[100svh] flex-col justify-end pb-16 pt-28 sm:pb-20 sm:pt-32 lg:justify-center lg:pb-24">
        <div className="max-w-3xl animate-fade-up">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="border border-gold/30 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              Community Recruitment
            </span>
            <span
              className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${
                isOpen ? "text-gold" : "text-white/50"
              }`}
            >
              {isOpen ? "Applications Open" : "Applications Closed"}
            </span>
          </div>

          <p className="mb-2 font-display text-xl font-semibold tracking-[0.08em] text-gold sm:text-2xl">
            {SITE.name}
          </p>
          <p className="font-arabic text-2xl text-gold/85" dir="rtl">
            {SITE.arabicName}
          </p>

          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
            Build Skills. Solve Problems.
            <span className="mt-1 block text-gold">Create Impact.</span>
          </h1>

          <Ornament className="mt-7 justify-start" />

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            {announcement ||
              "Join ITQAN DEVELOPERS, a community of passionate students committed to programming, software engineering, innovation, and building meaningful digital solutions."}
          </p>

          {deadlineLabel ? (
            <p className="mt-4 text-sm text-white/55">
              Application deadline: {deadlineLabel}
            </p>
          ) : null}

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href={isOpen ? "/apply" : "/#recruitment"} size="lg" variant="primary">
              Join Our Team
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/about" size="lg" variant="ghost">
              Discover ITQAN DEVELOPERS
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <p className="mt-14 text-xs uppercase tracking-[0.22em] text-white/40 animate-fade-up-delayed">
          {SITE.tagline}
        </p>
      </Container>
    </section>
  );
}
