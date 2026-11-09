import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { SPECIALIZATIONS } from "../lib/constants";
import { Admin } from "../models/Admin";
import { Project } from "../models/Project";
import { RecruitmentSettings } from "../models/RecruitmentSettings";
import { Specialization } from "../models/Specialization";

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is required");
  }

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

  for (const [index, item] of SPECIALIZATIONS.entries()) {
    await Specialization.findOneAndUpdate(
      { slug: item.id },
      {
        slug: item.id,
        title: item.title,
        description: item.description,
        isActive: true,
        sortOrder: index,
      },
      { upsert: true, new: true },
    );
  }
  console.log(`Seeded ${SPECIALIZATIONS.length} specializations`);

  await RecruitmentSettings.findOneAndUpdate(
    { key: "default" },
    {
      key: "default",
      isOpen: true,
      announcement:
        "Applications are open. Beginners are welcome — there is no fixed membership cap.",
    },
    { upsert: true, new: true },
  );
  console.log("Seeded recruitment settings");

  await Project.findOneAndUpdate(
    { slug: "astu-msj" },
    {
      name: "ASTU_MSJ",
      slug: "astu-msj",
      description:
        "A web platform project — the first community initiative of ITQAN DEVELOPERS, with more solutions to follow.",
      status: "in_progress",
      tags: ["Web Platform", "Full-Stack"],
      isFeatured: true,
      isPublic: true,
    },
    { upsert: true, new: true },
  );
  console.log("Seeded ASTU_MSJ project");

  await mongoose.disconnect();
  console.log("Seed complete");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
