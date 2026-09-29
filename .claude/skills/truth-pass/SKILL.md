---
name: truth-pass
description: Audit every claim in data/*.ts against the real project repos. Use before any merge into main and whenever project content changes.
disable-model-invocation: true
---

A portfolio claim is only as strong as Cowboy's ability to defend it in an interview.

1. List every number, metric, named library or tool, and outcome claim in
   `data/projects.ts`, `data/experience.ts`, and `data/skills.ts`.
2. For each project with a `githubUrl`: `git clone --depth 1 <url> /tmp/truth/<name>`.
   Check each claim against build files, source, assets, and tests.
   - Library claim → is it a dependency? (`build.gradle.kts`, `libs.versions.toml`, `package.json`, `requirements.txt`)
   - Size claim → `du -sh` the asset.
   - Speed or accuracy claim → is there measurement code, a benchmark, or a test that produced it?
3. Classify each claim:
   - **VERIFIED** — cite the file.
   - **CONTRADICTED** — cite the evidence.
   - **UNVERIFIABLE** — no source found.
4. Output a table: claim · location (file:line) · status · evidence.
5. Propose edits as a diff and wait for "go":
   - CONTRADICTED → correct it to what the code shows.
   - UNVERIFIABLE → remove the number or rewrite as a plain fact ("runs fully offline"),
     or ask Cowboy to measure it. Never replace one guess with another.

## Leads from the 2026-09-29 review (check these first)
- PlayIT "Model size ~42MB": `app/src/main/assets/vosk-model` in playIT-v2 is about 68 MB.
- PlayIT "iText7 PDF engine": no iText dependency found in playIT-v2 (main or refactor/hear-say-it).
- PlayIT "Filipino Marungko syllable grammar": the bundled Vosk model is US English;
  Marungko appears as the lesson grouping in the UI.
- PlayIT timings and accuracy (< 40 ms, ~110 ms per phoneme, ~350 ms PDF, accuracy 92%):
  no measurement code found.
- ReadHub and DaloyAqua specs (> 500 req/s, < 5 ms, < 2 ms, ~15 ms per parcel):
  look for load tests in those repos before keeping them.
