# Agents: Kamon Crests

- **Ports.** Only 8850 to 8874 (this project's block): 8850 demo and dev server, 8851 browser tests, 8852 pictures, 8853 and up for anything else and for worktrees. Every dev server and every Playwright run names its port explicitly: `node scripts/serve.mjs 8850` accepts no other. A `next dev`-style default is a bug.
- **Checks.** `pnpm check` is the gate: lint, types, build, every export's documentation, the tests (sizes included) and the packed package. Commit and push only when it passes, chained with `&&`.
- **Crests are generated.** Everything under `src/crests/`, `src/steps/` and `src/data/`, and `docs/catalogue.md`, `docs/sizes.md` and `docs/strings-ja.md`, is written by `pnpm data` from `scripts/crests/`. Never edit one by hand; change the crest's definition and run `pnpm data`.
- **Drawn from the construction.** A crest is drawn from circles, arcs, lines and curves placed by its traditional construction, never traced from a picture and never copied from a crest book or an image set. See `docs/guides/how-crests-are-constructed.md`.
- **Words in both languages.** Anything a person reads in the data is in English and in Japanese; `docs/strings-ja.md` lists every Japanese string beside its English for review.
- **The family's own files are the family's:** `demo/family.css`, `scripts/family-template.mjs` (this copy adds Kamon Crests to the list), `scripts/family-readme.mjs`, `scripts/readme-lint.mjs`, `scripts/readme-pictures-lib.mjs`, `scripts/release-notes.mjs`, `scripts/community/`.
- **No commits that name a tool.** Commits are authored John Morris <john@johnmorris.ca>, with no trailer and no attribution line.
