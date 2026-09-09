export interface SkillCategory {
  name: string;
  focus: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Mobile Systems (Core Focus)",
    focus: "Native Android systems, offline-first design, edge ASR, and Clean Architecture",
    skills: [
      "Kotlin",
      "Android SDK",
      "Jetpack Compose",
      "Material 3",
      "MVVM",
      "Clean Architecture",
      "Room (SQLite)",
      "Coroutines & StateFlow",
      "Navigation Compose",
      "Vosk (Edge ASR)",
      "Hilt (DI)",
      "Offline-First Architecture",
    ],
  },
  {
    name: "Backend Engineering & APIs",
    focus: "Stateless security, modular REST services, and background scheduling",
    skills: [
      "Java 17",
      "Spring Boot 3",
      "Spring Security (JWT)",
      "REST APIs",
      "Python",
      "FastAPI",
      "APScheduler",
      "MySQL",
      "Controller-Service-Repository Pattern",
    ],
  },
  {
    name: "Web & Full-Stack",
    focus: "Component isolation, responsive systems, and server/client boundary balance",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "HTML5 / CSS3",
      "Modern Web Architecture",
    ],
  },
  {
    name: "Applied AI & Data",
    focus: "Practical application-level AI integration grounded in domain knowledge bases",
    skills: [
      "Google Gemini API",
      "Retrieval-Augmented Generation (RAG)",
      "ChromaDB",
      "Langfuse (Observability)",
      "Vector Search",
      "Streamlit",
    ],
  },
  {
    name: "DevOps, Tools & Verification",
    focus: "Reproducible container environments, version control, and formal specs",
    skills: [
      "Docker",
      "Docker Compose",
      "Nginx",
      "Git / GitHub",
      "Android Studio",
      "Postman",
      "Linux / Bash",
      "Software Requirements Specs (SRS / RTM)",
    ],
  },
];
