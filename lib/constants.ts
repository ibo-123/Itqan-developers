export const SITE = {
  name: "ITQAN DEVELOPERS",
  arabicName: "إتقان",
  tagline: "Code with Purpose. Build with Mastery.",
  meaning:
    "Mastery, precision, dedication, and doing work with quality.",
  university: "Adama Science and Technology University (ASTU)",
  universityShort: "ASTU",
  email: "astumsjbootcamp2026@gmail.com",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/#what-we-do", label: "What We Do" },
  { href: "/#community", label: "Our Community" },
  { href: "/projects", label: "Projects" },
  { href: "/#recruitment", label: "Recruitment" },
  { href: "/contact", label: "Contact" },
  { href: "/apply", label: "Apply" },
  { href: "/status", label: "Track Application" },
] as const;

/** Areas of interest — not guaranteed seat assignments. */
export const INTERESTS = [
  {
    id: "frontend",
    title: "Frontend Development",
    description: "Interfaces, accessibility, and modern web UI.",
  },
  {
    id: "backend",
    title: "Backend Development",
    description: "APIs, services, and server-side systems.",
  },
  {
    id: "fullstack",
    title: "Full-Stack Development",
    description: "End-to-end product delivery across the stack.",
  },
  {
    id: "mobile",
    title: "Mobile Development",
    description: "Mobile applications and cross-platform experiences.",
  },
  {
    id: "uiux",
    title: "UI/UX Design",
    description: "User research, flows, and interface design.",
  },
  {
    id: "database",
    title: "Database Engineering",
    description: "Data modeling, storage, and query reliability.",
  },
  {
    id: "devops",
    title: "DevOps and Cloud",
    description: "Deployment, infrastructure, and operations.",
  },
  {
    id: "qa",
    title: "Quality Assurance and Testing",
    description: "Validation, quality, and continuous improvement.",
  },
  {
    id: "software-engineering",
    title: "Software Engineering",
    description: "Architecture, practices, and collaborative delivery.",
  },
  {
    id: "problem-solving",
    title: "Problem Solving and Competitive Programming",
    description: "Algorithms, reasoning, and technical challenges.",
  },
  {
    id: "research",
    title: "Technical Research and Innovation",
    description: "Exploration of emerging ideas and experimentation.",
  },
] as const;

/** @deprecated transitional alias */
export const SPECIALIZATIONS = INTERESTS;
export const POSITIONS = INTERESTS;

export const ACTIVITIES = [
  {
    title: "Software development",
    description: "Build practical websites, apps, and digital platforms together.",
  },
  {
    title: "Technical learning and knowledge sharing",
    description: "Grow through peer learning, mentorship, and shared practice.",
  },
  {
    title: "Collaborative projects",
    description: "Contribute to team initiatives across roles and skill levels.",
  },
  {
    title: "Programming and problem-solving",
    description: "Strengthen analytical thinking through real technical challenges.",
  },
  {
    title: "Innovation and experimentation",
    description: "Explore new tools, ideas, and approaches with curiosity.",
  },
  {
    title: "Workshops and community activities",
    description: "Participate in sessions that strengthen skills and teamwork.",
  },
] as const;

export const JOIN_BENEFITS = [
  "Gain practical development experience.",
  "Work on real-world projects and initiatives.",
  "Collaborate with motivated students.",
  "Improve technical and problem-solving skills.",
  "Learn from other developers.",
  "Develop teamwork and communication skills.",
  "Build a professional portfolio.",
  "Contribute to meaningful digital solutions.",
] as const;

export const ELIGIBILITY = [
  "Current ASTU student with interest in technology or software development.",
  "Willingness to learn, collaborate, and contribute responsibly.",
  "Commitment to participate in community learning and project activities.",
  "Beginners are welcome — prior experience helps but is not mandatory.",
  "Professional communication and respect for team values.",
] as const;

export const SELECTION_CRITERIA = [
  { key: "technicalKnowledge", label: "Technical knowledge", weight: 25 },
  { key: "commitment", label: "Commitment and availability", weight: 20 },
  { key: "analyticalSkills", label: "Problem-solving ability", weight: 15 },
  { key: "teamwork", label: "Teamwork", weight: 15 },
  { key: "communication", label: "Communication", weight: 10 },
  { key: "learningAbility", label: "Learning ability", weight: 10 },
  { key: "creativity", label: "Creativity", weight: 5 },
] as const;

export const RECRUITMENT_STAGES = [
  "Application and Registration",
  "Application Review",
  "Practical Assessment (if applicable)",
  "Interview",
  "Final Selection",
  "Orientation and Team Onboarding",
] as const;

export const FAQ_ITEMS = [
  {
    question: "What is ITQAN DEVELOPERS?",
    answer:
      "ITQAN DEVELOPERS is an Islamic-inspired coding and technology community at ASTU. Members learn, collaborate, share knowledge, and build meaningful digital solutions together.",
  },
  {
    question: "Who can apply?",
    answer:
      "ASTU students interested in programming, software engineering, design, research, or related technology areas can apply to join the community.",
  },
  {
    question: "Do I need previous programming experience?",
    answer:
      "No. Experience is helpful, but beginners with commitment and curiosity are welcome.",
  },
  {
    question: "Can beginners apply?",
    answer:
      "Yes. ITQAN DEVELOPERS values learning ability, collaboration, and dedication alongside technical skill.",
  },
  {
    question: "What skills are required?",
    answer:
      "Interest in technology, willingness to learn, responsibility, and readiness to collaborate. Specific interests can range from frontend and backend to design, QA, and research.",
  },
  {
    question: "What happens after submitting an application?",
    answer:
      "You receive a private tracking code. The recruitment committee reviews applications, and you can check status through the Track Application page.",
  },
  {
    question: "How are applicants selected?",
    answer:
      "Selection is committee-led and may include review, practical assessment, and interviews. Evaluation scores support decisions but do not auto-accept applicants.",
  },
  {
    question: "What commitment is expected from members?",
    answer:
      "Members are expected to participate in learning, collaboration, and community activities with reliability and respect.",
  },
  {
    question: "What types of projects does the team work on?",
    answer:
      "ITQAN DEVELOPERS works on websites, applications, platforms, and other initiatives. ASTU_MSJ is one example project — not the only focus of the community.",
  },
] as const;

export const CORE_VALUES = [
  { title: "Mastery (Itqan)", description: "Pursue quality in every detail." },
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

export const FEATURED_PROJECTS = [
  {
    slug: "astu-msj",
    name: "ASTU_MSJ",
    status: "In Progress",
    description:
      "A web platform initiative developed by ITQAN DEVELOPERS at ASTU — one of several projects the community may undertake.",
    tags: ["Web Platform", "Community Project"],
  },
] as const;

export const HOW_WE_WORK = [
  {
    step: "01",
    title: "Learn together",
    description: "We grow through shared practice, feedback, and curiosity.",
  },
  {
    step: "02",
    title: "Collaborate by interest",
    description: "Members contribute across design, engineering, QA, and research.",
  },
  {
    step: "03",
    title: "Build with mastery",
    description: "We ship thoughtfully — clean work, usable design, and quality.",
  },
  {
    step: "04",
    title: "Share and improve",
    description: "Knowledge is shared so every member advances with the team.",
  },
] as const;

export const STATUS_LABELS: Record<string, string> = {
  pending: "Submitted",
  submitted: "Submitted",
  under_review: "Under Review",
  practical_assessment: "Practical Assessment",
  assessment: "Practical Assessment",
  interview: "Interview",
  shortlisted: "Shortlisted",
  accepted: "Accepted",
  rejected: "Rejected",
};
