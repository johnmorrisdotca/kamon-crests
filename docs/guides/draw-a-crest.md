---
title: Draw a crest
section: how-to
order: 11
description: How to draw a missing crest from the public-domain 1892 book and send it as a pull request: the rules, the sheet, the prompts and what to expect.
---

The crest books list about 2,600 crests, and Kamon Crests has drawn only a small part of them (the [coverage page](https://johnmorrisdotca.github.io/kamon-crests/coverage/) has the count). The rest are waiting. If you would like to draw some, this page tells you how, what we expect, and what happens after you send it.

You do not need to read Japanese or be a programmer to start: most people work with an AI coding agent, and this page gives you the prompts. What you do need is patience with detail. A crest is checked line by line against a book printed in 1892, and only a crest that a stranger would take for the book's is merged.

## The short version

1. Take an issue. The [open issues labelled **draw a crest**](https://github.com/johnmorrisdotca/kamon-crests/issues?q=is%3Aopen+label%3A%22draw+a+crest%22) are crests waiting for someone, and the ones also labelled **good first issue** are the easy ones. Comment "I'll take this" and a maintainer assigns it to you. For a crest with no issue yet, open one with the **Draw a crest** form (see [Where to start](#where-to-start-easy-crests-first)).
2. If you stop, say so on the issue, so someone else can take it. An issue with no word for two weeks goes back to the list.
3. Find it in the 1892 crest book, which is public domain (see [The book](#the-book-the-only-source-of-shapes)).
4. Build it as a compass-and-ruler construction in `scripts/crests/`, following [the construction rules](../construction-rules.md).
5. Make a side-by-side sheet (yours, the book's, yours over the book's) and look at every line of it.
6. Run `pnpm check`. It must pass.
7. Open a pull request with the sheet attached.

## The rules we are strict about

These are not suggestions. A pull request that breaks one is closed or sent back, however good the drawing.

### Shapes come from the public-domain book, nowhere else

The package is MIT-licensed. Everything in it must be free to ship under that licence.

- **The one source of shapes is the 1892 crest book**, 伊呂波分新撰紋帳 (*Iroha-wake shinsen monchō*, Kunshidō, 1892). The National Diet Library publishes it as [NDL 780550](https://dl.ndl.go.jp/pid/780550) and marks it 保護期間満了 (its copyright has run out). Measure the crest's cell and build it from your own circles and lines.
- **Wikipedia and Wikimedia Commons are for checking, never for copying.** Most crest drawings there are CC BY-SA ("share-alike"), which cannot go into an MIT package. You may look at one to see whether yours reads the same, and you may take a few overall numbers from it (how many petals, the overall width to height, a main angle). You may **not** place features from it, adjust your drawing until its outline lines up with theirs, run fitting or search scripts against it, or trace it.
- **Never use a modern crest book, website, font, clip-art set or piece of software** as a source. Their drawings belong to their makers. That includes kamon websites, however complete they look.
- **No book cell, no crest.** If the 1892 book does not have it, choose another crest.
- **Say where every number came from** in the crest's `source` and construction note: the book's frame, page, row and column, and any overall number you took from a Commons picture.

Why so strict: one traced crest can force every user of the package to change licence. We would rather have a few hundred clean crests than thousands of doubtful ones.

### Your name on your work, and no AI attribution

- **Commit under your own name and email.** You are the author and you are responsible for every line, however you produced it.
- **No AI attribution anywhere.** No co-author trailer naming a model or a tool, no line saying a tool made the change, and no tool or model name in commit messages, code, comments, docs or the pull request. Most AI coding tools add these lines by default: turn that off, or delete the lines before you push. The prompts below tell your agent this too.
- **You are expected to use whatever tools help you, AI included.** We judge the drawing and the code, not how you made them.

### The construction rules

[docs/construction-rules.md](../construction-rules.md) is every rule a crest is drawn by, each with the test that holds it or a note that it is checked on the sheet. Read it in full before you start, and have your agent read it too. The main ones:

- A crest is circles of whole-number widths on grid points (or placed touching circles already struck) and ruled lines, cut and joined with `scripts/construct/compass.ts`. No Bézier curves, no strokes.
- A white line is a gap between two fills, never something drawn on top.
- The guides are struck first, then the shapes in the order they would be inked, because the animation is made from that order.
- Everything stays inside the 200 by 200 page, and the line weights are the package's (`scripts/construct/builder.ts`).
- Every name and note is in English and Japanese, with the reading in hiragana. If you cannot write the Japanese, say so in the pull request and we will.

## Where to start: easy crests first

Your first crest should be a simple one. Geometric crests and new frames for motifs we already have are the best way in: they teach you the tools, and the book's cell is easy to measure.

**Good first crests**

- **A motif already drawn, in a ring or another frame.** For example 丸に一つ巴 (one tomoe in a circle) or 丸に三つ菱 (three lozenges in a circle). The motif's build already exists, so you place it in the package's ring. See how `maru-ni-kaji-no-ha` was done.
- **Lozenges (菱)**: 三つ菱, 二階菱, 五階菱, 違い菱.
- **Squares with the corners cut (隅切り角)**: none of its 20 crests is drawn yet.
- **Four eyes and three eyes (目結)**: 隅立て四つ目 (the Rokkaku house's crest), 三つ目.
- **Tortoise shell (亀甲)**: 一重亀甲, then the hexagon with a motif inside.
- **Diagonal crosses (筋違)** and **single bars (一文字)**.

**Leave for later**

- Plants and animals with many veins, feathers or petals (chrysanthemums, cranes, butterflies, wisteria). They need many careful measurements and a lot of checking.
- Character crests (文字紋). Letterforms must not come from a font, so they need a calligraphic source in the book, and they are hard to build from circles and lines.

The [coverage page](https://johnmorrisdotca.github.io/kamon-crests/coverage/) and [docs/coverage.md](../coverage.md) list every crest, drawn or not, by chapter and family. Tier 1 is a family's base form and the famous crests, tier 2 the common variants, tier 3 the rarer ones.

**Check nobody else is on it.** Take a crest through its issue, so it is assigned to you. For a crest with no issue, search the open issues and pull requests for its name first, then open one. Maintainers draw whole families too: the pinned issue **Families being drawn now** lists them, so leave those families alone.

## The book: the only source of shapes

1. Open [NDL 780550](https://dl.ndl.go.jp/pid/780550). A frame is one photographed spread of two pages; the viewer's address ends in the frame number (`https://dl.ndl.go.jp/pid/780550/1/36` is frame 36).
2. The book is in *iroha* order, the old syllable order. To find a crest, look at how crests of the same family cite the book: search `docs/provenance.md` for the family (for example 巴 or 菱) and you get frames near it. Neighbouring frames hold the variants.
3. Write down the cell: frame, left or right page, row, column. Every crest in `docs/provenance.md` names its cell this way.
4. Download the frame from the viewer and crop the cell **for your own use only**. No scan or crop goes in the repository.
5. Measure: the crest's width, the centres and radii of its circles, the angles of its straight edges. Turn them into simple numbers on the package's 200-unit page, and build from those.

The book is drawn by hand, in outline, and sometimes a few degrees off square. Make yours exact and symmetric where the design clearly means it to be, and say in the construction note where yours differs from the book and why.

## Setting up

You need Node 24 or later, pnpm and git.

```sh
# Fork johnmorrisdotca/kamon-crests on GitHub, then:
git clone https://github.com/<you>/kamon-crests.git
cd kamon-crests
pnpm install
git checkout -b draw/<crest-id>        # one branch per crest or small batch
pnpm check                              # make sure it passes before you change anything
```

The commands you will use (all in [CONTRIBUTING.md](../../CONTRIBUTING.md)):

```sh
pnpm data       # rebuild the generated files from scripts/crests (run after every change to a crest)
pnpm pictures   # retake the README's pictures (run after every drawing change, commit the result)
pnpm dev        # the demo on http://127.0.0.1:8850, to watch your crest draw itself
node scripts/preview.ts out.png 8852 <crest-id> --size 300 --guides   # a picture of your crest and its guides
pnpm check      # the gate: lint, types, build, docs, tests, sizes, the packed package
```

Never edit anything under `src/crests/`, `src/steps/`, `src/data/`, or `docs/catalogue.md`, `docs/sizes.md` or `docs/strings-ja.md` by hand: `pnpm data` writes them.

## The side-by-side sheet

Every crest needs one, and every pull request includes it. It is how you, your agent and the reviewer know the crest is right.

One row per crest, every picture the same size and colour, in this order:

1. **Yours**, finished, black on white.
2. **The book's cell**, cropped and scaled to the same size.
3. **Yours in red over the book's cell**, half transparent.
4. **The Commons picture**, if there is one, for checking only.
5. **Yours with its guides**, from `node scripts/preview.ts … --guides`.

Under each row write one line: what differs from the book and why.

Then look at every row yourself, not only your agent. A crest passes only if someone who knows crests would take it for the book's at a glance, and, where Commons has the crest, it reads as theirs does. "The tests pass" is not the bar; the picture is.

## Using an AI agent

Most contributors use a coding agent, and that is welcome. Use a strong one, with its reasoning turned up: a crest is many small geometric decisions, and a weak or hurried agent produces crests that pass the tests and look wrong.

- **Use the strongest model your agent offers**, with its reasoning effort set to **high** or **very high**. A mid-tier model can manage the simplest geometric crests; plants, animals and anything with many white lines need the strongest.
- **Look at the sheet yourself.** Agents are often confident about crests that are visibly wrong.
- The pinned issue **[Using an AI agent](https://github.com/johnmorrisdotca/kamon-crests/issues?q=is%3Aissue+in%3Atitle+%22Using+an+AI+agent%22)** names the models and settings that have worked for us, and how to switch off each tool's own attribution lines.

### The repository already tells your agent the rules

You do not have to paste the rules in.

- **`AGENTS.md`**, at the top of the repository, is read by most coding agents before they start. It holds the source rule, the sheet rule and the attribution rule, and points at this page.
- The repository also carries, for the agents that support them: a project setting that switches off one tool's co-author and "made with" lines, a **draw a crest** skill and a **review a crest** skill that follow the steps of this page, and a strict **crest reviewer** that runs in a fresh context. The pinned issue says where each is and how to use it.

The prompts below are for any agent, and for when you want to run the steps by hand.

### Prompt 1: build the crest

Fill in the parts in angle brackets.

```text
You are drawing one crest for the open-source package kamon-crests (MIT), in this repository.

The crest: <Japanese name> (<romaji>), from the 1892 crest book 伊呂波分新撰紋帳, NDL 780550,
frame <n>, <left/right> page, row <r>, column <c>. My crop of that cell is at <path>.

Before you write anything, read in full: AGENTS.md, CONTRIBUTING.md (the "Adding a crest" section),
docs/construction-rules.md and docs/guides/draw-a-crest.md. Then read the build of the closest crest
already drawn, <closest-crest-id>, and follow its pattern.

Rules you must keep:
- The geometry comes ONLY from the book cell: measure it and build it from your own circles of
  whole-number widths on grid points and ruled lines, with scripts/construct/compass.ts. Every rule in
  docs/construction-rules.md applies.
- Never take shapes from Wikimedia Commons, Wikipedia or any modern drawing, website, font or software.
  You may not place features from them, iterate toward their outlines, or run fitting scripts against them.
  If I give you a Commons picture, it is only to check that the result reads the same.
- Strike the guides first, then the fills in the order they would be inked.
- Names, the reading and the construction note in English and Japanese. Cite the book cell in `source`.
- Run `pnpm data`, then `pnpm pictures`, then `pnpm check`. Fix everything until check passes.
- Commits are authored by me, <your name> <your email>. Never add a co-author trailer naming a model
  or tool, a line saying a tool made the change, or any tool or model name to a commit, code, comment or doc.

When it builds, make the side-by-side sheet described in docs/guides/draw-a-crest.md and show it to me.
Do not call the crest done until I have looked at the sheet.
```

### Prompt 2: check it, hard

Run this in a fresh session, so the checker is not the same conversation that built the crest.

```text
Review the crest <crest-id> in this repository as a strict reviewer who wants to find what is wrong.
Read docs/construction-rules.md and docs/guides/draw-a-crest.md first.

1. Open the side-by-side sheet at <path>. Compare ours with the 1892 book cell, row by row: every
   circle, every edge, every white line, the overall size and placement, the line weights. List every
   difference, however small, and say for each whether the construction note explains it.
2. Would a person who knows Japanese crests take ours for the book's crest at a glance? If not, why not?
3. Check every rule in docs/construction-rules.md against the crest's build, one by one, and name any
   rule it breaks.
4. Licence: does any shape, position or number come from anywhere other than the book cell (apart from a
   few overall numbers from Commons that the note names)? Look at the build for signs of fitting: many
   decimal places, numbers nudged a little at a time, scripts that compare against a picture.
5. The words: is the Japanese name right, is the reading right, does the construction note match what
   the build does?
6. Run `pnpm check` and `pnpm test:demo` and report the results.
7. Commits: is every one authored by a person, with no co-author trailer naming a model or tool, no
   line saying a tool made the change, and no tool or model name anywhere?

Give a verdict (pass, or fix these) and a numbered list of fixes. Do not fix anything yourself.
```

### Prompt 3: the sheet

```text
Make a side-by-side comparison sheet for <crest-id>, as docs/guides/draw-a-crest.md describes:
one row, five pictures of the same size and colour: ours; the book cell from <path>; ours in red,
half transparent, over the book cell; the Commons picture <path or "none">; ours with its guides
(node scripts/preview.ts <file> 8852 <crest-id> --size 600 --guides). Under the row, one line on what
differs from the book and why. Save it as <path>.png. Do not commit the sheet or the crops.
```

## Opening the pull request

- **One crest per pull request**, or a small batch of the same family (up to about five).
- Rebase on the latest `main` first. Others add crests too, so run `pnpm data` again after rebasing (it numbers crests in order) and commit what it changes.
- Each new crest's commit is `feat: <Japanese> (<id>), <what it is in a few words>`. Look at `git log` for the style.
- Add a line for each crest to `CHANGELOG.md` under **Unreleased**, in the style of the entries there, ending with *Contributed by [@you](https://github.com/you).* The release notes carry that line, so each release thanks the people whose crests are in it.
- **Add yourself to [scripts/contributors.mjs](../../scripts/contributors.mjs)** with your name, your GitHub name and the crest's id (or add the id to your line if you are already there), then run `pnpm contributors`. That writes you into the README's **People who helped**, and the crest's card on the demo site says *Contributed by* you.
- Fill in the pull request template, and **attach the sheet** (drag the PNG into the description).

## What to expect

- **A maintainer looks at your sheet first, then the build.** Most first crests come back once or twice with a short list of fixes: a circle a little off, a white line too thin, a weight that is not the package's, a missing Japanese reading. That is normal; it is how the crests stay consistent.
- **The crest number may change** when we merge, if others' crests landed first. That is expected; `pnpm data` takes care of it.
- **Once merged, your crest ships in the next npm release** of `@johnmorrisdotca/kamon-crests` and appears on the [demo site](https://johnmorrisdotca.github.io/kamon-crests/), where it draws itself step by step. Your name is on the commit, on the crest's card (*Contributed by*), in the README's **People who helped** and in the release notes.
- **Your contribution is under the MIT licence**, like the rest of the package.
- **We may close a pull request** that takes shapes from a source other than the book, or that we cannot check against a book cell. Please do not take it personally; the licence has to stay clean for everyone who uses the package.

## Questions

Open an issue, or ask in your pull request. If you get stuck on a shape, push what you have, open the pull request as a draft and say where you are stuck: an unfinished crest with a clear question is easier to help with than a finished one built the wrong way.
