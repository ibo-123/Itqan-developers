import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SPECIALIZATIONS } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Ornament } from "@/components/ui/Ornament";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Specializations() {
  return (
    <section className="relative bg-white py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />
      <Container>
        <div className="mb-8 flex flex-col gap-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Specializations"
            title="Many paths. One community."
            description="Founding focus areas — not exclusive seats. Multiple members can join each specialization, and new categories can grow with the community."
          />
          <Link
            href="/membership"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald transition-colors hover:text-emerald-deep"
          >
            View membership
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <Ornament className="mb-10 justify-start" tone="emerald" />

        <ul className="divide-y divide-emerald/10 border-y border-emerald/10">
          {SPECIALIZATIONS.map((item, index) => (
            <li
              key={item.id}
              className="group grid gap-2 py-5 transition-colors hover:bg-soft/80 sm:grid-cols-[4rem_1fr_1.2fr] sm:items-baseline sm:gap-6 sm:px-2"
            >
              <span className="font-display text-sm text-gold-deep">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-lg font-medium text-ink transition-colors group-hover:text-emerald">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink/65 sm:text-base">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
