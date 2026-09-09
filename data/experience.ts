export interface ExperienceItem {
  period: string;
  title: string;
  organization: string;
  category: "Internship" | "Education" | "Certification" | "Continuous Study";
  description: string;
  highlights: string[];
}

export const experiences: ExperienceItem[] = [
  {
    period: "Sept 2026 – Present",
    title: "Software Engineering Intern",
    organization: "NEC Telecom Software Philippines, Inc. (Global Delivery Center)",
    category: "Internship",
    description:
      "Selected for a 500-hour enterprise software engineering internship within the Global Delivery Center (GDC) at Cebu IT Park. Training and contributing across enterprise delivery workflows, software quality assurance, and architecture.",
    highlights: [
      "Engaged in enterprise curriculum covering Object-Oriented Analysis & Design (OOAD), Software Design Patterns, and Configuration Management.",
      "Practical training in Software Testing methodologies, quality verification standards, and hands-on Linux system administration.",
      "Collaborating on enterprise project workflows within an established global software delivery center framework.",
    ],
  },
  {
    period: "2023 – Jan 2027 (Expected)",
    title: "Bachelor of Science in Information Technology (BSIT)",
    organization: "Cebu Institute of Technology – University (CIT-U)",
    category: "Education",
    description:
      "4th-year undergraduate specializing in mobile systems, backend engineering, and applied AI. Maintaining consistent academic focus alongside active software project builds.",
    highlights: [
      "Relevant Coursework: Data Structures & Algorithms, Software Engineering, Systems Analysis & Design, AI & Machine Learning Fundamentals.",
      "Project Leadership: Project Manager & Core Developer on multi-member capstone and backend teams.",
    ],
  },
  {
    period: "Verified",
    title: "Industry Cloud & AI Certifications",
    organization: "AWS Academy & IBM SkillsBuild",
    category: "Certification",
    description:
      "Formally completed and verified cloud infrastructure and artificial intelligence foundations via Credly.",
    highlights: [
      "AWS Academy Graduate — Cloud Foundations (20 hrs) & Cloud Architecting (Trained)",
      "IBM SkillsBuild — Artificial Intelligence Fundamentals",
      "CIT-U / OpenLearning — OJT Etiquette & Professional Standards Training",
    ],
  },
  {
    period: "Multi-Year Habit",
    title: "Disciplined Self-Directed Study",
    organization: "Independent Technical Growth",
    category: "Continuous Study",
    description:
      "Sustained daily study habit applied to systems engineering and language acquisition.",
    highlights: [
      "1,200+ consecutive days of self-directed daily language study (Japanese, uncertified proficiency).",
      "Candidate preparation for the PhilNITS Fundamental Information Technology Engineer (FE) examination.",
    ],
  },
];
