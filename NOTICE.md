# Notice: where the crests, names and facts come from

The code of this package is under the MIT licence (see [LICENSE](LICENSE)). So is every drawing in it.

| What | Made from | Terms |
| --- | --- | --- |
| The crests' drawings | Each geometric crest's traditional construction (割付), struck with circles, arcs and lines, written as code in `scripts/crests/` | MIT, this package's own |
| The leaf and flower crests listed below | Vectorised from a public-domain Meiji crest book at the National Diet Library, cleaned and made symmetric, stored as paths in `scripts/crests/traced/` | The book is public domain; the cleaned paths are MIT, this package's own |
| The parts vocabulary (frames, motifs, arrangements, turns), in English and Japanese | Written for this package | MIT |
| The crests' names, readings and the houses that bore them | Public historical facts, recorded in this package's own words | MIT |
| The present-day users | The public pages named below and in the records, each with the day it was read | Facts, cited |
| The pipeline, the animation, the lookups and the demo | Written for this package | MIT |

## The designs belong to no one; the drawings are this package's own

A family crest is a design centuries old. No one owns the design, and a design is not a drawing: each maker draws it afresh from
its rules, and each drawing is its maker's. The geometric crests in this package are drawn from their construction. The leaf and
flower crests in the table below are vectorised from one crest book whose protection has expired: its outline drawings were filled,
traced to curves, cleaned of print noise and ink spread, and one half (or one leaf) was kept and mirrored or turned exactly. No scan,
crop or picture of the book is in the package or the repository: only the paths drawn from it, and this citation. Nothing is taken
from a modern crest book, a piece of software, a font or a clip-art set (whose drawings are their own), no share-alike source is used,
and no raster is embedded. The shapes of the crests are described in `docs/provenance.md`.

### The period book

伊呂波分新撰紋帳 (*Iroha-wake shinsen monchō*), edited by 井上勝五郎 (Inoue Katsugorō), published by 薫志堂 (Kunshidō), Tokyo, 1892
(明治25年). National Diet Library Digital Collections, [info:ndljp/pid/780550](https://dl.ndl.go.jp/pid/780550), call number 特59-56,
marked 保護期間満了 (protection expired; the IIIF manifest's access is PDM, the Public Domain Mark). Printed in 1892, it is in the public
domain in Japan and in the United States. Read on 2026-11-24, page by page through the library's own IIIF image service, one request
at a time, and through the same scan's public-domain copy on Wikimedia Commons ("NDL780550 伊呂波分新撰紋帳.pdf").

| Crest | Frame | Place on the frame, and the book's name for it |
| --- | --- | --- |
| `sagari-fuji`, `maru-ni-sagari-fuji` | 32 | right page, fourth row, third column: 下り藤 |
| `tachibana`, `maru-ni-tachibana` | 20 | left page, third row, second column: たちばな |
| `sasa-rindo` | 13 | right page, third row, fourth column: 笹りんどう |

The chrysanthemum (`juroku-yae-giku`, `maru-ni-kiku`) and the tomoe (`hidari-mitsu-tomoe`, `migi-mitsu-tomoe`, `maru-ni-hidari-mitsu-tomoe`)
are struck from their compass construction, the chrysanthemum by the book's own sixteen-division (十六割, frame 46, 紋割方之法) and checked
against its 十六八重菊 (frame 40, right page, second row, third column). The maple (`momiji`) is no longer vectorised: it is struck
from arcs, its proportions measured from frame 44 (left page, third row, first column: 紅葉). The paulownia (`gosan-no-kiri`,
`maru-ni-gosan-no-kiri`, `goshichi-no-kiri`) is no longer vectorised either: it is struck with compass and ruler, its proportions
measured from frame 38 (left page, third row, first column: 丸に五三きり, its ring left out; right page, first row, first column:
五七きり). Its spikes of florets were also measured (how high a spike stands, how wide it is at its foot, where its florets sit):
proportions measured, as numbers only, from 日本家紋大図鑑; no drawing or outline from it is included.

Every other crest is a compass-and-ruler construction too, checked against the same book where it prints the crest (frames 6, 10, 13 to
19, 22, 23, 25, 27, 28, 30, 35, 37, 40 to 43 and 45) and against pictures of the crests. The hollyhock (`mitsuba-aoi`, `maru-ni-mitsuba-aoi`), the tomoe, the crossed hawk feathers (`chigai-takanoha`, `maru-ni-chigai-takanoha`),
the rabbit (`usagi`) and the three ginkgo leaves (`mitsu-icho`, `maru-ni-mitsu-icho`) are compass-and-ruler constructions written for
this package: every edge is an arc of a circle of the layout or a ruled line (`scripts/construct/compass.ts`, `scripts/crests/drawn/`).
Their proportions (how large a head, a lobe or a bar is, and where it stands) were measured from pictures of the crests; no outline or
pixel of any picture was traced or copied. The feathers, the rabbit and the ginkgo were checked against the 1892 book as well (frame 21,
right page, 違鷹 and 丸に違鷹; frame 25, left page, 真向うさぎ; frame 5, left page, 三ついてふ), and the ginkgo's proportions were measured
from that page. The water plantain (`omodaka`, `maru-ni-omodaka`) was measured from frame 14 (right page, third column: 立ちおもだか and
丸に沢瀉). The one-comma tomoe (`hidari-hitotsu-tomoe`, `migi-hitotsu-tomoe`) was measured from frame 11 (right page, second
row, fourth column: 左り一ツ巴), and the Oda quince (`oda-mokko`) from frame 28 (right page, second row, second column, and fourth
row, third column). The ivy leaf (`tsuta`) was measured from frame 22 (right page, fourth row, fourth column: つた), the embracing ginger (`daki-myoga`) from frame 42 (right page, fourth row, third column: だきめうが), and the snow ring (`yukiwa`) from frame 15 (left page, fourth row, first column: ゆきわ). The wood sorrel (`katabami`, `maru-ni-katabami`, `kikko-ni-katabami`) was measured from frame 15 (left
page, fourth row, second column: 片ばミ), and the round fan (`uchiwa`, `maru-ni-uchiwa`) from frame 26 (right page, fourth row,
third column: 丸にうちは). The swallowtail (`agehacho`, `maru-ni-agehacho`) was checked against frame 34 (right page,
second row, second column: 上羽てふ; left page, first row, fourth column: 丸に上羽てふ). The nine bamboo-grass leaves (`kumai-zasa`) were measured from frame 37 (left page, fourth row, first column: 丸に九枚笹, without its ring), and the single pine (`hitotsu-matsu`) from frame 30 (left page, second row, third column: 一ツまつ). The weights of the rings are measured from fifteen ringed crests, as `docs/provenance.md` says under "Rings".

Proportions of some crests were measured, as numbers only, from public pictures; no picture, drawing or outline from any of them is included, and no share-alike material is in the package. Each construction is struck afresh from its circles and lines.

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
