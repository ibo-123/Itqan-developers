import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GeometricPattern } from "@/components/ui/GeometricPattern";
import { Ornament } from "@/components/ui/Ornament";

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-emerald-deep py-20 text-white sm:py-24">
      <GeometricPattern className="text-gold" opacity={0.09} variant="star" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(213,182,106,0.16),transparent_45%)]" />

      <Container className="relative text-center">
        <p className="font-arabic text-3xl text-gold/90" dir="rtl">
          انضم إلينا
        </p>
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
          Ready to contribute?
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
          Join {SITE.name} and build with excellence.
        </h2>
        <Ornament className="mt-6" />
        <p className="mx-auto mt-5 max-w-xl text-base text-white/70">
          Work on real projects, grow your skills, and collaborate with peers
          who care about quality — whether you are just starting or already
          experienced.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/apply" size="lg" variant="primary">
            Submit Application
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href="/about" size="lg" variant="ghost">
            Learn About Us
          </Button>
        </div>
      </Container>
    </section>
  );
}
