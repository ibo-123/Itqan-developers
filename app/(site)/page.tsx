import { CTA } from "@/components/home/CTA";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Hero } from "@/components/home/Hero";
import { HowWeWork } from "@/components/home/HowWeWork";
import { Introduction } from "@/components/home/Introduction";
import { MissionVision } from "@/components/home/MissionVision";
import { Recruitment } from "@/components/home/Recruitment";
import { Specializations } from "@/components/home/Specializations";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Introduction />
      <MissionVision />
      <Specializations />
      <FeaturedProjects />
      <HowWeWork />
      <Recruitment />
      <CTA />
    </>
  );
}
