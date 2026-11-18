import type { Metadata } from "next";
import { connection } from "next/server";
import { SITE } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { connectToDatabase } from "@/lib/mongodb";
import { Project } from "@/models/Project";

export const metadata: Metadata = {
  title: "Projects",
  description: `Projects and initiatives by ${SITE.name}.`,
};

async function getProjects() {
  try {
    await connectToDatabase();
    return await Project.find({ isPublic: true })
      .sort({ isFeatured: -1, createdAt: -1 })
      .lean();
  } catch {
    return [];
  }
}

export default async function ProjectsPage() {
  await connection();
  const projects = await getProjects();

  return (
    <>
      <PageHero
        eyebrow="Projects & initiatives"
        title="Work shaped by the community."
        description="ITQAN DEVELOPERS undertakes multiple initiatives over time. ASTU_MSJ may appear here as one example — not the limit of what we build."
      />

      <section className="bg-soft py-16 sm:py-20">
        <Container className="space-y-8">
          {projects.length === 0 ? (
            <div className="border border-dashed border-emerald/20 bg-white/60 px-6 py-10 text-center">
              <p className="font-display text-xl text-ink">
                Projects will appear here
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-ink/60">
                Administrators can publish community projects from the dashboard.
              </p>
              <Button href="/apply" className="mt-6" variant="secondary">
                Join and help build them
              </Button>
            </div>
          ) : (
            projects.map((project) => (
              <article
                id={project.slug}
                key={String(project._id)}
                className="scroll-mt-28 border border-emerald/10 bg-white px-6 py-8 sm:px-8"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                    {project.name}
                  </h2>
                  <span className="text-xs uppercase tracking-[0.16em] text-gold-deep">
                    {String(project.status).replaceAll("_", " ")}
                  </span>
                </div>
                <p className="mt-4 max-w-3xl leading-relaxed text-ink/70">
                  {project.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {(project.tags || []).map((tag) => (
                    <span
                      key={tag}
                      className="border border-emerald/15 px-3 py-1 text-xs text-ink/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))
          )}
        </Container>
      </section>
    </>
  );
}
