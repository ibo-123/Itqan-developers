import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { INTERESTS } from "../lib/constants";
import { Admin } from "../models/Admin";
import { Project } from "../models/Project";
import { RecruitmentSettings } from "../models/RecruitmentSettings";
import { Specialization } from "../models/Specialization";

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is required");

  await mongoose.connect(uri);

  const adminEmail = process.env.SEED_ADMIN_EMAIL || "admin@itqan.local";
  const adminPassword =
    process.env.SEED_ADMIN_PASSWORD || "ItqanAdmin2026!";
  const adminName = process.env.SEED_ADMIN_NAME || "ITQAN Super Admin";

  const existingAdmin = await Admin.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await Admin.create({
      name: adminName,
      email: adminEmail,
      passwordHash: await bcrypt.hash(adminPassword, 12),
      role: "super_admin",
      isActive: true,
    });
    console.log(`Created admin: ${adminEmail}`);
  } else {
    console.log(`Admin already exists: ${adminEmail}`);
  }

  // Clear old fixed-seat position slugs that no longer apply
  await Specialization.deleteMany({
    slug: {
      $in: [
        "project-manager",
        "frontend-1",
        "frontend-2",
        "backend-1",
        "backend-2",
        "project-management",
        "other",
      ],
    },
  });

  for (const [index, item] of INTERESTS.entries()) {
    await Specialization.findOneAndUpdate(
      { slug: item.id },
      {
        slug: item.id,
        title: item.title,
        description: item.description,
        isActive: true,
        sortOrder: index,
        seats: 99,
        isPosition: false,
      },
      { upsert: true, returnDocument: "after" },
    );
  }
  console.log(`Seeded ${INTERESTS.length} interest areas`);

  const deadline = new Date();
  deadline.setDate(deadline.getDate() + 45);

  await RecruitmentSettings.findOneAndUpdate(
    { key: "default" },
    {
      key: "default",
      title: "ITQAN DEVELOPERS Community Recruitment",
      description:
        "ITQAN DEVELOPERS is recruiting motivated ASTU students to join a technology community focused on learning, collaboration, and building meaningful digital solutions.",
      isOpen: true,
      opensAt: new Date(),
      deadline,
      maxSelectedApplicants: 50,
      announcement:
        "Applications are open to join ITQAN DEVELOPERS. Beginners are welcome.",
      stages: [
        "Application and Registration",
        "Application Review",
        "Practical Assessment (if applicable)",
        "Interview",
        "Final Selection",
        "Orientation and Team Onboarding",
      ],
    },
    { upsert: true, returnDocument: "after" },
  );
  console.log("Seeded recruitment settings");

  await Project.findOneAndUpdate(
    { slug: "astu-msj" },
    {
      name: "ASTU_MSJ",
      slug: "astu-msj",
      description:
        "A web platform initiative developed by ITQAN DEVELOPERS at ASTU — one of several projects the community may undertake.",
      status: "in_progress",
      tags: ["Web Platform", "Community Project"],
      isFeatured: true,
      isPublic: true,
    },
    { upsert: true, returnDocument: "after" },
  );
  console.log("Seeded ASTU_MSJ as example project");

  await mongoose.disconnect();
  console.log("Seed complete");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
