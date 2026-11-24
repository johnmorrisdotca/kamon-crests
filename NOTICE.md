# Notice: where the crests, names and facts come from

The code of this package is under the MIT licence (see [LICENSE](LICENSE)). So is every drawing in it.

| What | Made from | Terms |
| --- | --- | --- |
| The crests' drawings | Each crest's traditional construction (割付), struck with circles, arcs and lines, written as code in `scripts/crests/` | MIT, this package's own |
| The parts vocabulary (frames, motifs, arrangements, turns), in English and Japanese | Written for this package | MIT |
| The crests' names, readings and the houses that bore them | Public historical facts, recorded in this package's own words | MIT |
| The present-day users | The public pages named below and in the records, each with the day it was read | Facts, cited |
| The pipeline, the animation, the lookups and the demo | Written for this package | MIT |

## The designs belong to no one; the drawings are this package's own

A family crest is a design centuries old. No one owns the design, and a design is not a drawing: each maker draws it afresh from
its rules, and each drawing is its maker's. Every drawing in this package is made for it from the crest's construction. None is
traced from a bitmap, and none is taken from a crest book, a piece of software, a font or a clip-art set (whose drawings are their own).
Nothing is imported from another set of crests, no share-alike source is used, and no raster is embedded. The shapes of the
crests are described in `docs/provenance.md`.

## Names, readings and houses

The Japanese names, their readings and the houses recorded as bearing each crest are historical facts, written here in the package's
own words. They are not copied from a crest book or from any database's text, and no share-alike source is used. They come from the
author's own knowledge of the history, and have not yet been checked against a printed reference by a second person; a house is
listed only where it is generally recorded as bearing the crest, and the list for a crest is short on purpose. A correction, with
its source, is welcome as an issue. Every Japanese string is listed beside its English in [docs/strings-ja.md](docs/strings-ja.md),
and has not yet been read by a native reader.

## Present-day users

A record's `usedBy` states a fact about a present-day user of a crest, with the public page that says so and the day the page was
read. The package draws the historical crest only, never anyone's logo or trademark, and states each relation as the source states
it. What a source does not state is left out. Each entry below was read on 2026-11-24.

| Crest | User | What the source states | Source |
| --- | --- | --- | --- |
| `mitsu-gashiwa` | Mitsubishi (三菱) | The company's three-diamond mark is described as suggestive of the three-leaf crest of the Tosa Clan, and of the three stacked rhombuses of the Iwasaki family crest | [More about the Logo, Mitsubishi Electric](https://www.mitsubishielectric.com/en/about/history/logo/logo_more.html) |
| `igeta` | Sumitomo Group (住友グループ) | The Sumitomo trademark is an igeta, a diamond-shaped grid like a well's frame, first used in 1590 and redrawn with its own proportions in 1913 | [Close History of Igeta, the Sumitomo Trademark, Sumitomo Group](https://www.sumitomo.gr.jp/english/history/chronology/08) |
| `kikko` | Kikkoman (キッコーマン) | The name is written with 亀甲, the tortoise-shell pattern; the hexagon mark is said to have been first used around 1820 | [しょうゆのはてな](https://www.kikkoman.co.jp/homecook/kids/hatena.html) and [「キッコーマン六角形マーク」について](https://www.kikkoman.com/jp/quality/ip/topics3.html), Kikkoman |

Looked for and left out, because no public page that could be read states the relation: the Government of Japan's use of the paulownia
(the Ministry of Foreign Affairs' page on the passport design refused an automated request, and no workaround was tried), the
hollyhock at Nikko Toshogu, and the Mitsui and Yamasa marks. Wikipedia and other share-alike pages were not used as sources.

## Not copyright: two notes on the crests themselves

These are stated as facts, not as legal advice, and the licence of this package cannot grant a right that a law withholds.

- **The imperial chrysanthemum crest.** Japan's Trademark Act, Article 4(1)(i), does not allow the imperial chrysanthemum crest (菊花紋章), or a
  mark like it, to be registered as a trademark. `juroku-yae-giku` is in the package for reference, not for use as anyone's brand.
- **The paulownia.** The paulownia (`gosan-no-kiri`, `goshichi-no-kiri`) is the emblem of the Government of Japan, and was borne by the
  Toyotomi. The crests are here for reference, not for use as anyone's brand.

## Third-party development tools

The package has no runtime dependency. The tools it is built and tested with (TypeScript, tsup, esbuild, ESLint, Vitest and Playwright) are
development dependencies under their own licences (MIT and Apache-2.0), and none of their code is in the package.
