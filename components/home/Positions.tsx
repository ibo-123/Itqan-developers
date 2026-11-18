import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { INTERESTS } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Ornament } from "@/components/ui/Ornament";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Areas of interest for membership — not fixed exclusive vacancies. */
export function Positions() {
  return (
    <section id="interests" className="scroll-mt-24 bg-white py-20 sm:py-24">
      <Container>
        <div className="mb-8 flex flex-col gap-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Areas of interest"
            title="Many paths into the community."
            description="Select the domains you want to grow in. These are interests and contribution areas — not guaranteed job assignments."
          />
          <Link
            href="/apply"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald hover:text-emerald-deep"
          >
            Start application
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <Ornament className="mb-10 justify-start" tone="emerald" />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INTERESTS.map((item) => (
            <li
              key={item.id}
              className="border border-emerald/10 bg-soft/50 px-5 py-5"
            >
              <h3 className="font-display text-base font-medium text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-ink/65">{item.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
