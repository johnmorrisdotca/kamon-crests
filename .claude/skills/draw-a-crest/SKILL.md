---
name: draw-a-crest
description: Draw one new crest for kamon-crests from its cell in the public-domain 1892 crest book (NDL 780550), as a compass-and-ruler construction, with its side-by-side sheet. Use when asked to draw, add or build a crest, or to take a "draw a crest" issue.
---

# Draw a crest

Follow [docs/guides/draw-a-crest.md](../../../docs/guides/draw-a-crest.md); this is the same work as a checklist. Read these in full before writing anything: `AGENTS.md`, `CONTRIBUTING.md` ("Adding a crest"), `docs/construction-rules.md` and the guide.

## 1. Know what you are drawing

- The crest's Japanese name, romaji and tier, from `docs/coverage.md`.
- Its cell in the 1892 book: frame, left or right page, row, column. If the person has not given it, help them find it: search `docs/provenance.md` for crests of the same family to find nearby frames. **If there is no book cell, stop and say so. It is not drawn.**
- The closest crest already drawn (search `docs/catalogue.md` and `scripts/crests/`). Read its build and follow its pattern; reuse its motif's build where the crest is that motif in a frame or another count.

## 2. The source rule (a licence rule)

- Geometry comes **only** from the book cell: measure it, turn the measurements into simple numbers on the 200-unit page, and build from your own circles of whole-number widths on grid points and ruled lines (`scripts/construct/compass.ts`).
- A Wikimedia Commons or Wikipedia picture is for checking only. From it, take at most a few overall numbers (a count, an aspect ratio, a main angle), and name them in the note. Never place features from it, never adjust toward its outline, never run fitting or search scripts against it, never trace it.
- Never use a modern crest book, a website, a font, clip art or software as a source.

## 3. Build

- Strike the guides first (`c.guideCircle`, `c.guideLine`), then the fills in the order they would be inked. A white line is a gap between two fills. No Bézier curves, no strokes. Holes use the even-odd rule.
- Names, reading (hiragana), houses and construction note in English and Japanese; cite the book cell in `source`.
- `pnpm data` (never hand-edit generated files), then `pnpm pictures`, then `pnpm check`. Fix until `pnpm check` passes.

## 4. The sheet

Make the side-by-side sheet: one row per crest, the same size and colour throughout, with these pictures in order: ours; the book cell; ours in red, half transparent, over the book cell; the Commons picture (if any, check only); ours with guides (`node scripts/preview.ts <out.png> 8852 <id> --size 600 --guides`). Under each row, one line on what differs from the book and why. Do not commit the sheet or any crop of the book.

Look at every row. Show the sheet to the person and wait for them to look at it before calling the crest done. Then suggest running the `crest-reviewer` agent in a fresh context.

## 5. Commit

- One commit per crest: `feat: <Japanese> (<id>), <what it is in a few words>`, in the style of `git log`. Add a line under **Unreleased** in `CHANGELOG.md`.
- The commit is the person's, under their own name and email. **Never** add a co-author trailer naming a model or tool, a line saying a tool made the change, or any tool or model name to a commit, pull request, code, comment or doc.
- Before opening the pull request: rebase on the latest `main`, run `pnpm data` again (it renumbers crests that others added first), and `pnpm check`.
