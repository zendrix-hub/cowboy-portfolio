/**
 * Japan bearing — single source of truth for the "Kuroshio" block.
 *
 * Rules (same as the rest of data/): state only what is true today.
 * `status` drives how a waypoint is drawn:
 *   - "now"     → filled marker (happening or achieved)
 *   - "pending" → half marker (done, outcome not known yet)
 *   - "planned" → open marker (intended, not started / not sat)
 */

export type BearingStatus = "now" | "pending" | "planned";

export interface BearingWaypoint {
  id: string;
  status: BearingStatus;
  statusLabel: string;
  title: string;
  titleJa: string;
  detail: string;
}

export const bearingWaypoints: BearingWaypoint[] = [
  {
    id: "nec",
    status: "now",
    statusLabel: "Now",
    title: "Interning inside a Japanese engineering organisation",
    titleJa: "インターンシップ",
    detail:
      "Software Engineering Intern at NEC Telecom Software Philippines (Global Delivery Center, Cebu IT Park), part of Japan's NEC Group. 500-hour placement, Sept 2026 to present.",
  },
  {
    id: "nihongo",
    status: "now",
    statusLabel: "Ongoing",
    title: "Japanese, every day for 1,200+ days",
    titleJa: "日本語学習",
    detail:
      "Self-directed daily study on Duolingo, unbroken for more than 1,200 days. Not yet certified.",
  },
  {
    id: "fe",
    status: "pending",
    statusLabel: "Result pending",
    title: "PhilNITS Fundamental IT Engineer (FE) exam",
    titleJa: "基本情報技術者試験",
    detail:
      "The Philippine sitting of the ITPEC common exam, mutually recognised with Japan's IPA Fundamental Information Technology Engineer Examination. No result yet.",
  },
  {
    id: "jlpt",
    status: "planned",
    statusLabel: "Planned",
    title: "Japanese-Language Proficiency Test (JLPT)",
    titleJa: "日本語能力試験",
    detail: "Planning to sit the JLPT. No level held yet.",
  },
  {
    id: "graduation",
    status: "planned",
    statusLabel: "Jan 2027 (expected)",
    title: "BSIT graduation, CIT – University",
    titleJa: "卒業予定",
    detail:
      "Final-year BSIT student at Cebu Institute of Technology – University.",
  },
];

/**
 * Short self-introduction (自己紹介), polite form.
 * DRAFT — to be checked by a Japanese speaker before this branch is merged
 * to main. Each sentence is paired with its English meaning.
 */
export const selfIntroduction: { ja: string; en: string }[] = [
  {
    ja: "はじめまして。ゼンドリックス・リバと申します。",
    en: "Nice to meet you. My name is Zendrix Riva.",
  },
  {
    ja: "フィリピンのセブ在住で、セブ工科大学（CIT-U）情報技術学科の4年生です。",
    en: "I live in Cebu, Philippines, and I am a fourth-year Information Technology student at Cebu Institute of Technology – University.",
  },
  {
    ja: "現在、NEC Telecom Software Philippines でソフトウェアエンジニアのインターンをしています。",
    en: "I am currently a software engineering intern at NEC Telecom Software Philippines.",
  },
  {
    ja: "Android、Spring Boot、AI を使ったアプリケーションの開発に取り組んでいます。",
    en: "I work on applications built with Android, Spring Boot and AI.",
  },
  {
    ja: "日本語は毎日勉強を続けています。どうぞよろしくお願いいたします。",
    en: "I keep studying Japanese every day. Thank you for your consideration.",
  },
];

/** Japanese sub-labels shown beside the English section headings. */
export const sectionLabelsJa = {
  about: "私について",
  projects: "プロジェクト",
  skills: "スキル",
  experience: "経歴",
  japan: "進路",
  contact: "連絡先",
} as const;
