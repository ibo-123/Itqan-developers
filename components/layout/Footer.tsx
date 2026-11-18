import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { BrandMark } from "@/components/ui/BrandMark";
import { Container } from "@/components/ui/Container";
import { GeometricPattern } from "@/components/ui/GeometricPattern";
import { Ornament } from "@/components/ui/Ornament";
import { getContactEmail, getTelegramUrl } from "@/lib/site";

export function Footer() {
  const telegramUrl = getTelegramUrl();
  const email = getContactEmail();

  return (
    <footer className="relative overflow-hidden bg-emerald-deep text-white">
      <GeometricPattern className="text-gold" opacity={0.07} variant="star" />
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
            A technology community at {SITE.universityShort} where students learn,
            collaborate, solve problems, and build meaningful digital solutions.
          </p>
          <p className="mt-5 text-sm tracking-wide text-gold/90">{SITE.tagline}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Explore
          </p>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.filter((link) => !link.href.includes("#")).map((link) => (
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
            Contact
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/75">
            <li>
              <a href={`mailto:${email}`} className="hover:text-gold">
                {email}
              </a>
            </li>
            {telegramUrl ? (
              <li>
                <a
                  href={telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold"
                >
                  Telegram support
                </a>
              </li>
            ) : null}
            <li>
              <Link href="/apply" className="hover:text-gold">
                Apply to join
              </Link>
            </li>
            <li>
              <Link href="/admin/login" className="hover:text-gold">
                Admin portal
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
