import { Container } from "@/components/ui/Container";
import { GeometricPattern } from "@/components/ui/GeometricPattern";
import { Ornament } from "@/components/ui/Ornament";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-emerald-deep pt-28 pb-16 text-white sm:pt-32 sm:pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(213,182,106,0.2),transparent_42%),linear-gradient(160deg,#071814,#0c2a23_55%,#123c32)]" />
      <GeometricPattern className="text-gold" opacity={0.09} variant="star" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-16 h-48 w-48 rotate-45 border border-gold/20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 top-24 h-28 w-28 rotate-45 border border-gold/35"
      />

      <Container className="relative">
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <Ornament className="mt-6 justify-start" />
        {description ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            {description}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
