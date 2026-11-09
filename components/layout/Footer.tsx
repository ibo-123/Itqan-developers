import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { BrandMark } from "@/components/ui/BrandMark";
import { Container } from "@/components/ui/Container";
import { GeometricPattern } from "@/components/ui/GeometricPattern";
import { Ornament } from "@/components/ui/Ornament";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-emerald-deep text-white">
      <GeometricPattern className="text-gold" opacity={0.07} variant="star" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(213,182,106,0.12),transparent_40%)]" />

      <Container className="relative pt-14">
        <Ornament className="mb-10" />
      </Container>

      <Container className="relative grid gap-10 pb-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <BrandMark size="md" />
            <div>
              <p className="font-display text-xl font-semibold tracking-tight">
                {SITE.name}
              </p>
              <p className="font-arabic text-lg text-gold" dir="rtl">
                {SITE.arabicName}
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
            A growing software development and technology community at{" "}
            {SITE.university} — building meaningful digital solutions with
            purpose, precision, and excellence.
          </p>
          <p className="mt-5 text-sm tracking-wide text-gold/90">
            {SITE.tagline}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Explore
          </p>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/75 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Community
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/75">
            <li>
              <Link href="/apply" className="transition-colors hover:text-gold">
                Membership Application
              </Link>
            </li>
            <li>
              <Link
                href="/membership"
                className="transition-colors hover:text-gold"
              >
                Why Join
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="transition-colors hover:text-gold"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/admin/login"
                className="transition-colors hover:text-gold"
              >
                Admin Portal
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className="relative border-t border-white/10">
        <Container className="flex flex-col gap-2 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {SITE.name}. All rights reserved.</p>
          <p className="font-arabic text-sm text-gold/50" dir="rtl">
            إتقان في العلم والعمل
          </p>
        </Container>
      </div>
    </footer>
  );
}
