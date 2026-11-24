# Contributing

Thank you for helping. Bug reports, ideas, corrections to the Japanese and pull
requests are all welcome.

This first part is the same in every package of the family. It is the master
text kept in
[johnmorrisdotca/.github](https://github.com/johnmorrisdotca/.github/blob/main/CONTRIBUTING.md),
copied unchanged into `scripts/community/CONTRIBUTING.md`, and a test holds
this file to that copy. What is particular to the package follows it, under
the heading "Particular to" and the package's name.

## Before you start

Open an issue first for anything bigger than a typo, so that we can agree on the
shape before you spend time on it. Taking part follows the
[Code of Conduct](CODE_OF_CONDUCT.md); report a security concern privately, as
[SECURITY.md](SECURITY.md) says.

## Making a change

```sh
pnpm install
pnpm check          # lint, types and tests: the same as CI
pnpm test:package   # pack it as npm does, install it in an empty project, import every entry
pnpm site           # build the demo into ./site, as GitHub Pages publishes it
```

The package's own further commands (its browser tests, its command line, its
data scripts) are listed under its own heading below.

## House rules, shared by every package of the family

- **No runtime dependencies.** Development dependencies are for tests, builds and
  documentation only.
- **The core is pure.** Every function in it returns new values and never
  changes what it was given.
- **Test what you change.** Tests sit beside the code they test. A rule you
  change has a test that would have caught it.
- **Words a person reads come in English and Japanese.** If you cannot write the
  Japanese, say so in the pull request and someone will.
- **Option values and names are kebab case.**
- **Art and sound are CC0 or public domain only**, checked at the source and
  credited. Data and word lists may be under another licence that lets them be
  shipped, with its notice kept in `NOTICE.md`. No GPL or LGPL code.
- **Needs Node 24 or later.**
- **A README table, example or count that a test holds to the code** changes
  together with the code.
- **The family's own files are the same in every package**: `demo/family.css`,
  `scripts/family-template.mjs`, `scripts/family-readme.mjs`,
  `scripts/release-notes.mjs`, the files in `scripts/community/` and
  `family.test.js` (in `src/`, or in `test/`). Do not edit one here. To change
  one, change it in every repository at once, bump `FAMILY_TEMPLATE_VERSION` for
  the template, and record the new hash in `family.test.js`. What is the
  package's own goes in its own stylesheet, `demo/<name>.css`, and its page
  builder, `scripts/site.mjs`.
- **The list of the family in the README is made, not written.**
  `pnpm family:readme` writes it between its markers from
  `scripts/family-template.mjs`.
- **The workflows are the family's too.** `ci.yml` runs `pnpm check`, the demo's
  browser tests and the packed package on Linux, macOS and Windows; `pages.yml`
  is the same text in every package. A package adds jobs of its own after those.

## Pull requests

One change per pull request. Say what changed and how you checked it, and add a
line to `CHANGELOG.md` under **Unreleased**: for a change a user would notice,
and for one to the repository alone.

## Releasing

Maintainers bump the version in `package.json` (and in `src/version.ts`, where
the package has one), move *Unreleased* to the new version in `CHANGELOG.md`,
dated, push, wait for CI and tag `vX.Y.Z`, the same as `package.json`'s version.
The Release workflow (`.github/workflows/release.yml`) checks and builds the
package, attaches the tarball to a GitHub release and publishes it to npm by
trusted publishing, with provenance and no token. A version already on npm is
not published again.

## Particular to Kamon Crests

Bug reports and ideas go in the [issues](https://github.com/johnmorrisdotca/kamon-crests/issues). Kamon Crests needs Node 24 or
later to build, because its data scripts are TypeScript that Node runs as it is.

### Commands

```sh
pnpm check            # lint, types, build, every export's documentation, tests (sizes included), the packed package
pnpm test:demo        # build the demo and play it in a real browser (port 8851)
pnpm data             # rebuild src/crests, src/steps, src/data and the lists in docs/ from scripts/crests (no network)
pnpm dev              # build the demo and serve it on port 8850
pnpm pictures         # take the README's pictures from the built demo
node scripts/preview.ts out.png 8852 <ids...> --size 300 --cols 6 [--guides]   # draw crests from their definitions to look at
```

### Adding a crest

**Required reading first: [the construction rules](docs/construction-rules.md).** Every rule a crest is drawn by, each with the test that holds it or the note that it is checked on the side-by-side sheet.

A crest is a definition in `scripts/crests/`: its id, its names (English, Japanese, the reading in hiragana, romaji), its frame, its
motifs with their counts and arrangements, the houses that bore it, a line on its construction in both languages, and a `build`
function that draws it. Everything under `src/crests/`, `src/steps/` and `src/data/`, and `docs/catalogue.md`, `docs/sizes.md` and
`docs/strings-ja.md`, is written by `scripts/build-data.ts`; never edit one by hand. `pnpm data` run twice leaves the tree as it was,
and CI checks that it does.

- **Draw it from its construction.** Strike the guides first (`c.guideCircle`, `c.guideLine`: the compass circles and ruler lines of its
  layout), then draw each shape (`c.fill`) in the order it should be traced. A shape is a fill outlined in arcs and ruled lines: no
  Bézier curve and no stroke, and a white line is the gap between two fills (`src/compass.test.ts` holds this). Each shape belongs to one part: `"frame"`, or one of the
  crest's motif ids. The animation is made from this order. See [how crests are constructed](docs/guides/how-crests-are-constructed.md).
- **Ink it from arcs and lines.** A new crest is a compass-and-ruler construction: circles of whole-number widths on grid points, or placed by
  touching circles already struck, and ruled lines where the crest is straight. Write the circles in the crest's own frame, cut and join
  them with `scripts/construct/compass.ts` (`carve`, `toPath`), and strike the same circles as its guides; see `scripts/crests/drawn/`.
  Measuring a crest's proportions from a picture is fine; copying a picture's outline is not.
- **Never copy a modern drawing.** A crest is not traced from a picture of unknown licence, and not taken from a modern crest book, a piece of software or a clip-art set,
  whose drawings are their own. Draw it afresh from the design's rules and write the rule in its construction note, or vectorise it from
  a public-domain period crest book (printed before 1930 and marked 保護期間満了 by the National Diet Library): clean it, keep one half or
  one part, store it in `scripts/crests/traced/`, draw it with `mirrored` or `turned` (`scripts/construct/traced.ts`), and cite the book,
  its NDL permalink, the frame, the place and the day read in the crest's `source`. No scan or crop goes in the repository.
- **Keep the weights.** Lines are the weights in `scripts/construct/builder.ts` (`WEIGHT`, and the rings' weights measured from real
  ringed crests): a thin ring is a thirtieth of the diameter, a medium ring about a tenth (16.8 of the 192), and a ringed motif fills the
  ring to within `RING_GAP` (3.5). Everything sits inside the page's 200 by 200 units, and a test holds it there.
- **Cut holes with the even-odd rule.** A vein or a slit inside a leaf is a hole in the same path (`c.fill(part, path, "evenodd")`), wholly
  inside the shape; there are no masks, clips or colours in a crest.
- **Words in both languages.** A new name, house or note has its Japanese, and its reading; say in the pull request if you cannot write it.
- **Facts need a source.** A present-day user goes in `scripts/crests/used-by.ts` only with a public page that says so, and the day it was read.
  Leave out what you cannot source. Never draw a company's logo.
- **Sizes**: a crest over the budget is listed in `docs/sizes.md`, and the size test holds the list; a crest over the ceiling stops the build.
