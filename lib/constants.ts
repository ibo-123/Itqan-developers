export const SITE = {
  name: "ITQAN DEVELOPERS",
  arabicName: "إتقان",
  tagline: "Code with Purpose. Build with Excellence.",
  meaning:
    "Excellence, precision, dedication, and doing work with quality.",
  university: "ASTU",
  email: "contact@itqandevelopers.org",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/activities", label: "What We Do" },
  { href: "/projects", label: "Projects" },
  { href: "/membership", label: "Membership" },
  { href: "/apply", label: "Apply" },
  { href: "/contact", label: "Contact" },
] as const;

export const SPECIALIZATIONS = [
  {
    id: "project-management",
    title: "Project Management & System Analysis",
    description:
      "Plan initiatives, analyze systems, and coordinate delivery across teams.",
  },
  {
    id: "uiux",
    title: "Requirements Engineering & UI/UX Design",
    description:
      "Translate needs into clear requirements and thoughtful user experiences.",
  },
  {
    id: "frontend",
    title: "Frontend Development",
    description:
      "Build accessible, responsive interfaces with modern web technologies.",
  },
  {
    id: "backend",
    title: "Backend Development",
    description:
      "Design APIs, services, and server-side systems that scale with care.",
  },
  {
    id: "database",
    title: "Database Engineering",
    description:
      "Model data, optimize queries, and keep information reliable and secure.",
  },
  {
    id: "qa",
    title: "Quality Assurance & Testing",
    description:
      "Validate quality through systematic testing and continuous improvement.",
  },
  {
    id: "research",
    title: "Research & Innovation",
    description:
      "Explore emerging ideas and apply research to practical solutions.",
  },
  {
    id: "other",
    title: "Other Technology Interests",
    description:
      "Bring complementary skills — from DevOps to AI — into the community.",
  },
] as const;

export const ACTIVITIES = [
  "Web Development",
  "Mobile Application Development",
  "Backend Engineering",
  "UI/UX Design",
  "Database Engineering",
  "Software Testing and Quality Assurance",
  "Research and Innovation",
  "Technical Knowledge Sharing",
] as const;

export const CORE_VALUES = [
  { title: "Excellence (Itqan)", description: "Pursue quality in every detail." },
  { title: "Collaboration", description: "Build better together than alone." },
  { title: "Integrity", description: "Act with honesty and accountability." },
  { title: "Innovation", description: "Seek creative, purposeful solutions." },
  {
    title: "Continuous Learning",
    description: "Grow through practice and shared knowledge.",
  },
  {
    title: "Responsibility",
    description: "Own outcomes and support the community.",
  },
  {
    title: "Knowledge Sharing",
    description: "Lift others as you develop your craft.",
  },
] as const;

export const RECRUITMENT_STAGES = [
  "Application Submission",
  "Application Review",
  "Practical Assessment (when applicable)",
  "Interview",
  "Final Selection",
  "Orientation and Community Onboarding",
] as const;

export const FEATURED_PROJECTS = [
  {
    slug: "astu-msj",
    name: "ASTU_MSJ",
    status: "In Progress",
    description:
      "A web platform project — the first community initiative of ITQAN DEVELOPERS, with more solutions to follow.",
    tags: ["Web Platform", "Full-Stack"],
  },
] as const;

export const HOW_WE_WORK = [
  {
    step: "01",
    title: "Identify needs",
    description:
      "We start from real problems and community goals, clarifying scope with care.",
  },
  {
    step: "02",
    title: "Collaborate across roles",
    description:
      "Designers, engineers, analysts, and researchers work as one team.",
  },
  {
    step: "03",
    title: "Build with excellence",
    description:
      "We ship thoughtfully — clean code, usable design, and continuous learning.",
  },
  {
    step: "04",
    title: "Share and grow",
    description:
      "Knowledge is shared openly so every member advances with the community.",
  },
] as const;
