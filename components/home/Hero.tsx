import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GeometricPattern } from "@/components/ui/GeometricPattern";
import { Ornament } from "@/components/ui/Ornament";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-emerald-deep text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,rgba(213,182,106,0.2),transparent_42%),radial-gradient(ellipse_at_85%_15%,rgba(255,255,255,0.07),transparent_38%),linear-gradient(165deg,#071814_0%,#0c2a23_38%,#123c32_72%,#1a4f42_100%)]" />
      <GeometricPattern className="text-gold" opacity={0.11} variant="star" />

      {/* Large Islamic star frame — right visual plane */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-1/2 hidden h-[34rem] w-[34rem] -translate-y-1/2 lg:block"
      >
        <div className="absolute inset-0 rotate-45 border border-gold/25 animate-float-slow" />
        <div className="absolute inset-10 rotate-45 border border-gold/15 animate-float" />
        <div className="absolute inset-[5.5rem] rotate-45 border border-gold/30" />
        <div className="absolute inset-[9rem] rotate-45 bg-gradient-to-br from-gold/10 to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/70" />
      </div>

      {/* Corner geometry */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-20 left-[6%] hidden h-28 w-28 border border-gold/20 rotate-45 md:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-28 left-[9%] hidden h-14 w-14 border border-gold/45 rotate-45 md:block"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent animate-shimmer-line"
      />

      <Container className="relative flex min-h-[100svh] flex-col justify-end pb-16 pt-28 sm:pb-20 sm:pt-32 lg:justify-center lg:pb-24">
        <div className="max-w-3xl animate-fade-up">
          <div className="mb-6 flex items-center gap-3">
            <span className="inline-flex items-center gap-2 border border-gold/30 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold backdrop-blur-sm">
              {SITE.university} Community
            </span>
            <span className="font-arabic text-xl text-gold/90" dir="rtl">
              {SITE.arabicName}
            </span>
          </div>

          <p className="mb-4 font-display text-2xl font-semibold tracking-[0.1em] text-gold sm:text-3xl md:text-4xl">
            {SITE.name}
          </p>

          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            BUILD BEYOND
            <span className="mt-1 block bg-gradient-to-r from-gold-light via-gold to-gold-deep bg-clip-text text-transparent">
              BOUNDARIES.
            </span>
          </h1>

          <Ornament className="mt-7 justify-start" />

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            An innovative community of developers, designers, and technology
            enthusiasts working together to create meaningful digital solutions
            — with excellence, integrity, and purpose.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/apply" size="lg" variant="primary">
              Join Our Community
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/projects" size="lg" variant="ghost">
              Explore Our Work
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <p className="mt-14 max-w-md text-xs uppercase tracking-[0.22em] text-white/40 animate-fade-up-delayed">
          {SITE.tagline}
        </p>
      </Container>
    </section>
  );
}
