import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FEATURED_PROJECTS } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { GeometricPattern } from "@/components/ui/GeometricPattern";
import { Ornament } from "@/components/ui/Ornament";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FeaturedProjects() {
  return (
    <section className="bg-soft py-20 sm:py-24">
      <Container>
        <div className="mb-8 flex flex-col gap-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Projects"
            title="Work that matters — starting with ASTU_MSJ."
            description="ASTU_MSJ is our first community project. ITQAN DEVELOPERS will continue building websites, apps, platforms, and more."
          />
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald transition-colors hover:text-emerald-deep"
          >
            All projects
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <Ornament className="mb-10 justify-start" tone="emerald" />

        <div className="space-y-6">
          {FEATURED_PROJECTS.map((project) => (
            <article
              key={project.slug}
              className="relative overflow-hidden bg-emerald-deep px-6 py-8 text-white sm:px-10 sm:py-12"
            >
              <GeometricPattern className="text-gold" opacity={0.08} />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_20%,rgba(213,182,106,0.22),transparent_40%)]" />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 top-8 hidden h-36 w-36 rotate-45 border border-gold/25 sm:block"
              />
              <div className="relative max-w-2xl">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                    Featured
                  </span>
                  <span className="text-xs text-white/50">{project.status}</span>
                </div>
                <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  {project.name}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-white/75">
                  {project.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-gold/25 px-3 py-1 text-xs text-gold/90"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/projects#${project.slug}`}
                  className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-gold transition-colors hover:text-gold-light"
                >
                  Learn more
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
