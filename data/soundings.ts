/**
 * Soundings — the headline facts shown under the hero.
 *
 * Every entry must point at something a reader can check: a public badge,
 * a repository, or the section of this page that carries the detail.
 * No figure belongs here without a source.
 */

export interface Sounding {
  figure: string;
  label: string;
  detail: string;
  sourceLabel: string;
  sourceHref: string;
  external?: boolean;
}

export const soundings: Sounding[] = [
  {
    figure: "500 hrs",
    label: "Software engineering internship",
    detail: "NEC Telecom Software Philippines (GDC)",
    sourceLabel: "Experience",
    sourceHref: "#experience",
  },
  {
    figure: "691 / 697",
    label: "Unit tests passing, 0 failed",
    detail: "PlayIT, offline Android phonics app",
    sourceLabel: "Repository",
    sourceHref: "https://github.com/zendrix-hub/playIt",
    external: true,
  },
  {
    figure: "15 of 16",
    label: "Grade 1 learners gave it a happy face",
    detail: "PlayIT field evaluation, 30 participants",
    sourceLabel: "Field results",
    sourceHref: "#playit-evaluation",
  },
  {
    figure: "2 badges",
    label: "AWS Academy and IBM SkillsBuild",
    detail: "Cloud Foundations and AI Fundamentals",
    sourceLabel: "Credly",
    sourceHref: "https://www.credly.com/go/e84CaxMW",
    external: true,
  },
  {
    figure: "1,200+ days",
    label: "Daily Japanese study, unbroken",
    detail: "Self-directed, on Duolingo",
    sourceLabel: "Japan bearing",
    sourceHref: "#japan",
  },
];
