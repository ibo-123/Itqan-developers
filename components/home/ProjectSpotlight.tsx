import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { GeometricPattern } from "@/components/ui/GeometricPattern";
import { Ornament } from "@/components/ui/Ornament";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProjectSpotlight() {
  return (
    <section className="bg-soft py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Projects & initiatives"
          title="Work shaped by the community — across multiple initiatives."
          description="ITQAN DEVELOPERS undertakes websites, applications, platforms, and learning activities. ASTU_MSJ is one example project, not the organization's identity."
          className="mb-4"
        />
        <Ornament className="mb-10 justify-start" tone="emerald" />

        <article className="relative overflow-hidden bg-emerald-deep px-6 py-10 text-white sm:px-10">
          <GeometricPattern className="text-gold" opacity={0.08} />
          <div className="relative max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Example initiative
            </p>
            <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight">
              ASTU_MSJ Web Platform
            </h3>
            <p className="mt-4 text-base leading-relaxed text-white/75">
              A community project under ITQAN DEVELOPERS. Members may contribute
              across analysis, design, engineering, and quality as part of broader
              team activities — alongside future initiatives.
            </p>
            <Link
              href="/projects"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:text-gold-light"
            >
              View projects
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </article>
      </Container>
    </section>
  );
}
