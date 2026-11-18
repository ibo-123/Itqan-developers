import { connection } from "next/server";
import { CTA } from "@/components/home/CTA";
import { Eligibility } from "@/components/home/Eligibility";
import { FAQ } from "@/components/home/FAQ";
import { Hero } from "@/components/home/Hero";
import { Introduction } from "@/components/home/Introduction";
import { MissionVision } from "@/components/home/MissionVision";
import { Positions } from "@/components/home/Positions";
import { ProjectSpotlight } from "@/components/home/ProjectSpotlight";
import { Recruitment } from "@/components/home/Recruitment";
import { SelectionCriteria } from "@/components/home/SelectionCriteria";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { WhyJoin } from "@/components/home/WhyJoin";
import { assertRecruitmentOpen } from "@/lib/recruitment";
import { connectToDatabase } from "@/lib/mongodb";
import { getTelegramUrl } from "@/lib/site";

export default async function HomePage() {
  await connection();

  let announcement =
    "Join ITQAN DEVELOPERS, a community of passionate students committed to programming, software engineering, innovation, and building meaningful digital solutions.";
  let deadlineLabel: string | null = null;
  let isOpen = true;
  let stages: string[] | undefined;
  const telegramUrl = getTelegramUrl();

  try {
    await connectToDatabase();
    const gate = await assertRecruitmentOpen();
    announcement = gate.settings.announcement || announcement;
    isOpen = gate.allowed;
    stages = gate.settings.stages;
    if (gate.settings.deadline) {
      deadlineLabel = new Date(gate.settings.deadline).toLocaleDateString(
        "en-US",
        { year: "numeric", month: "long", day: "numeric" },
      );
    }
  } catch {
    // Render defaults if DB is temporarily unavailable.
  }

  return (
    <>
      <Hero
        announcement={announcement}
        deadlineLabel={deadlineLabel}
        isOpen={isOpen}
      />
      <Introduction />
      <WhatWeDo />
      <MissionVision />
      <ProjectSpotlight />
      <WhyJoin />
      <Positions />
      <Recruitment stages={stages} />
      <SelectionCriteria />
      <Eligibility />
      <FAQ />
      <CTA isOpen={isOpen} telegramUrl={telegramUrl} />
    </>
  );
}
