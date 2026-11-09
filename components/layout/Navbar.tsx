"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { BrandMark } from "@/components/ui/BrandMark";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const onHome = pathname === "/";
  const light = onHome && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-emerald/10 bg-soft/95 shadow-[0_8px_30px_rgba(18,60,50,0.06)] backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between sm:h-[4.75rem]">
        <Link href="/" className="group flex items-center gap-3">
          <BrandMark
            size="sm"
            className="transition-transform duration-300 group-hover:scale-105"
          />
          <span className="flex flex-col leading-tight">
            <span
              className={cn(
                "font-display text-sm font-semibold tracking-[0.04em] sm:text-base",
                light ? "text-white" : "text-ink",
              )}
            >
              {SITE.name}
            </span>
            <span
              className={cn(
                "hidden text-[11px] tracking-[0.14em] sm:block",
                light ? "text-gold/80" : "text-ink/45",
              )}
            >
              <span className="font-arabic" dir="rtl">
                {SITE.arabicName}
              </span>
              <span className="mx-1.5 opacity-50">·</span>
              {SITE.university}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition-colors duration-200",
                  light
                    ? active
                      ? "text-gold"
                      : "text-white/75 hover:text-gold"
                    : active
                      ? "font-medium text-emerald"
                      : "text-ink/65 hover:text-emerald",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            href="/apply"
            size="sm"
            variant={light ? "primary" : "secondary"}
          >
            Join Us
          </Button>
        </div>

        <button
          type="button"
          className={cn(
            "inline-flex items-center justify-center rounded-md p-2 lg:hidden",
            light ? "text-white" : "text-ink",
          )}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      <div
        className={cn(
          "overflow-hidden border-t border-emerald/10 bg-soft transition-all duration-300 lg:hidden",
          open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <Container className="flex flex-col gap-1 py-4">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2.5 text-sm",
                  active
                    ? "bg-emerald/5 font-medium text-emerald"
                    : "text-ink/80",
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <Button href="/apply" className="mt-2 w-full" variant="secondary">
            Join Our Community
          </Button>
        </Container>
      </div>
    </header>
  );
}
