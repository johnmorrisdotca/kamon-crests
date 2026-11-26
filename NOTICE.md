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
五七きり). Its spikes of florets and the veins of its leaves were measured from the same two cells (how high a spike stands, how many
florets it has and where they sit, how the veins sweep from the joint toward a leaf's tip).

Every other crest is a compass-and-ruler construction too, checked against the same book where it prints the crest (frames 6, 10, 13 to
19, 22, 23, 25, 27, 28, 30, 35, 37, 40 to 43 and 45) and against pictures of the crests. The hollyhock (`mitsuba-aoi`, `maru-ni-mitsuba-aoi`), the tomoe, the crossed hawk feathers (`chigai-takanoha`, `maru-ni-chigai-takanoha`),
the rabbit (`usagi`) and the three ginkgo leaves (`mitsu-icho`, `maru-ni-mitsu-icho`) are compass-and-ruler constructions written for
this package: every edge is an arc of a circle of the layout or a ruled line (`scripts/construct/compass.ts`, `scripts/crests/drawn/`).
Their proportions (how large a head, a lobe or a bar is, and where it stands) were measured from pictures of the crests; no outline or
pixel of any picture was traced or copied. The feathers, the rabbit and the ginkgo were checked against the 1892 book as well (frame 21,
right page, 違鷹 and 丸に違鷹; frame 25, left page, 真向うさぎ; frame 5, left page, 三ついてふ), and the ginkgo's proportions were measured
from that page. The hollyhock leaf's veins were measured from frame 37 (right page, first row, first column from the right: 三ツあふひ, which the book draws
with its leaves' tips outwards) and checked against the single leaf of frame 36 (left page, second row, third column from the right: 一ツつるあふひ). The water plantain (`omodaka`, `maru-ni-omodaka`) was measured from frame 14 (right page, third column: 立ちおもだか and
丸に沢瀉). The one-comma tomoe (`hidari-hitotsu-tomoe`, `migi-hitotsu-tomoe`) was measured from frame 11 (right page, second
row, fourth column: 左り一ツ巴), and the Oda quince (`oda-mokko`) from frame 28 (right page, second row, second column, and fourth
row, third column). The ivy leaf (`tsuta`) was measured from frame 22 (right page, fourth row, fourth column: つた), the embracing ginger (`daki-myoga`) from frame 42 (right page, fourth row, third column: だきめうが), and the snow ring (`yukiwa`) from frame 15 (left page, fourth row, first column: ゆきわ). The crane in a circle (`tsuru-no-maru`) was measured from frame 21 (left page, third row, fourth column: 鶴の丸). The flower lozenge (`hanabishi`) was measured from frame 8 (left page, first row, first column: 花びし). The standing hollyhock (`tachi-aoi`, `maru-ni-tachi-aoi`) was measured from frame 36 (left page, third row, third column: 立あふひ; right page, fourth row, fourth column: 丸に左りはなれ葵). The Gion amulet (`gion-mamori`) was measured from frame 31 (left page, third row, third column: ぎおんまもり). The wood sorrel (`katabami`, `maru-ni-katabami`, `kikko-ni-katabami`) was measured from frame 15 (left
page, fourth row, second column: 片ばミ), and the round fan (`uchiwa`, `maru-ni-uchiwa`) from frame 26 (right page, fourth row,
third column: 丸にうちは). The swallowtail (`agehacho`, `maru-ni-agehacho`) was checked against frame 34 (right page,
second row, second column: 上羽てふ; left page, first row, fourth column: 丸に上羽てふ). The nine bamboo-grass leaves (`kumai-zasa`) were measured from frame 37 (left page, fourth row, first column: 丸に九枚笹, without its ring), and the single pine (`hitotsu-matsu`) from frame 30 (left page, second row, third column: 一ツまつ). The scale weight (`fundo`) was measured from frame 32 (left page, fourth row, fourth column: ふんどう), the split lozenge (`wari-bishi`) from frame 43 (right page, fourth row, second column: 九こ武田ひし, without its ring), the crossed nail pullers (`chigai-kuginuki`) from frame 26 (left page, third row, fourth column: 違ひ釘ぬき), the sandbar tray (`suhama`, `maru-ni-suhama`) from frame 45 (left page, first row, third column: 丸にすはま, without its ring), and the Hojo scales (`hojo-uroko`) from frame 25 (left page, first row, second column: 北条鱗). The tortoise-shell crests with the flower lozenge (`kikko-ni-hanabishi`, `mitsumori-kikko-ni-hanabishi`, `maru-ni-mitsumori-kikko-ni-hanabishi`) were measured from frame 41 (right page, second row, second column counted from the right: 亀甲; first row, second column counted from the right: 三ッきっこう). Their thick bands and the ring were also read, as numbers only, from the Wikimedia Commons pictures Japanese Crest mitumori Kikkou ni Hanabishi (CC BY-SA 3.0) and Japanese Crest Maru ni mitumori Kikkou ni Hanabishi (CC BY-SA 4.0); nothing of them is in the package. The ringed variants were measured from the cells that name them: 丸に九枚笹 (`maru-ni-kumai-zasa`) from frame 37 (left page, fourth row, fourth column counted from the right, the leftmost), 丸に蔦 (`maru-ni-tsuta`) from frame 22 (left page, fourth row, first column counted from the right), the ringed 抱き茗荷 (`maru-ni-daki-myoga`) from frame 42 (right page, fourth row, third column counted from the right: だきめうが), 丸に麻の葉 (`maru-ni-asa-no-ha`) from frame 35 (right page, third row, first column counted from the right), 丸に二ツともゑ (`maru-ni-hidari-futatsu-tomoe`) from frame 11 (right page, fourth row, first column counted from the right), and 丸に一本鷹 and 丸に二本鷹 (`maru-ni-hitotsu-takanoha`, `maru-ni-narabi-takanoha`) from frame 21 (right page, second row, second and first columns counted from the right). Their sizes in the ring were also read, as numbers only, from the Wikimedia Commons pictures Maru ni Kumai Zasa inverted (public domain), Japanese crest Maru ni Tuta, Maru ni Daki Myouga and Japanese crest Maru ni Narabi Takanoha (CC BY-SA); nothing of them is in the package. The weights of the rings are measured from fifteen ringed crests, as `docs/provenance.md` says under "Rings". The single clove (`hitotsu-choji`) was measured from frame 12 (right page, first row, first column: 丸に一ッ丁子, without its ring). The paper-mulberry leaf (`kaji-no-ha`) was measured from frame 17 (left page, second row, second column: 梶の葉). The puffed sparrow (`fukura-suzume`) was measured from frame 45 (left page, first row, second column: ふくらすゞめ) The treasure knot (`takara-musubi`) was measured from frame 21 (left page, third row, first column: 宝むすび). The crossed battle axes (`chigai-masakari`) were measured from frame 30 (right page, third row, fourth column counted from the right: ちがひまさかり). The Yongle coin (`eiraku-sen`) was measured, and its four characters outlined, from frame 45 (right page, second row, second column counted from the right: 永楽銭). The cube of lightning spirals (`mitsu-inazuma`) was measured from frame 6 (left page, third row, third column counted from the right: 三ッいなづま). The four lightning spirals (`yotsu-inazuma`) were measured from frame 6 (left page, first row, fourth column counted from the right, the leftmost: 四ッいなづま). The crossed battle axes in a ring (`maru-ni-chigai-masakari`) were measured from frame 30 (right page, fourth row, the cell at the page's left edge: 丸にちがひまさかり). The embracing waves in a circle (`maru-ni-daki-nami`) were vectorised from frame 23 (left page, third row, second column counted from the right: 丸に抱き波). The rain clouds (`ama-gumo`) were vectorised from frame 27 (right page, second row, the leftmost column: 雨くも). The three crossed helmet horns (`mitsu-chigai-kuwagata`) were measured from frame 28 (right page, second row, the rightmost column: 三ッ違ひくはがた). The eight-arrow wheel (`yatsu-yaguruma`) was measured from frame 29 (left page, fourth row, second column counted from the right: 八ッ矢車). The embracing hawk feathers (`daki-takanoha`) were measured from frame 21 (right page, fourth row, third column counted from the right: だき鷹).

The plain quince blossom (`mokko`) was measured from frame 44 (left page, second row, first column from the right: 木瓜). The quince blossom in a circle (`maru-ni-mokko`) was measured from the cell below it (third row, first column from the right: 丸に木瓜). The quince blossom in a hut (`iori-mokko`) was measured from the third column of the same row (いほりに木瓜). The Chinese quince (`kara-mokko`) was measured from the second row, second column from the right (唐木瓜). The Hotta quince (`hotta-mokko`) was measured from the first row, first column from the right (堀田木瓜). The five-lobed melon (`uri`) was measured from frame 28 (right page, fourth row, second column from the right: くわ). The ringed upright quince (`maru-ni-tachi-mokko`) was measured from frame 44 (left page, fourth row, second column from the right: 丸に立木瓜). The sword quince (`ken-mokko`) was measured from the third row, second column from the right (剣木瓜). The three-lobed melon (`mitsu-uri`) was measured from frame 28 (right page, second row, fourth column from the right: 三ッ瓜).

The Toki balloon flower (`toki-kikyo`) was measured from frame 40 (right page, first row, fourth column from the right: 土岐ききやう). The slender balloon flower (`yase-kikyo`) was measured from the left page of the same frame (first row, second column from the right: やせききやう). The double balloon flower (`yae-kikyo`) was measured from frame 40 (right page, second row, fourth column from the right: 八重ききやう).

The plain quince blossom (`mokko`) was measured from frame 44 (left page, second row, first column from the right: 木瓜). The quince blossom in a circle (`maru-ni-mokko`) was measured from the cell below it (third row, first column from the right: 丸に木瓜). The quince blossom in a hut (`iori-mokko`) was measured from the third column of the same row (いほりに木瓜). The Chinese quince (`kara-mokko`) was measured from the second row, second column from the right (唐木瓜). The Hotta quince (`hotta-mokko`) was measured from the first row, first column from the right (堀田木瓜). The five-lobed melon (`uri`) was measured from frame 28 (right page, fourth row, second column from the right: くわ).
The sword wood sorrel (`ken-katabami`) was measured from frame 15 (left page, first row, fourth column from the right: 剣片ばミ). The ringed sword wood sorrel (`maru-ni-ken-katabami`) was measured from the cell directly below it (丸に剣片ばミ).

The sword balloon flower (`ken-kikyo`) was measured from frame 40 (right page, fourth row, fourth column from the right: 剣ききやう).

The arabesque flower in a medium ring (`chuwa-ni-karahana`) was measured from frame 18 (right page, fourth row, fourth column from the right: 中わニから花).

The double plum blossom (`yae-ume`) was measured from frame 24 (left page, second row, fourth column from the right: 八重むめ).

うてな梅鉢 (`utena-umebachi`) was measured from frame 24 (left page, fourth row, second column from the right: うてなむめばち).

覗き梅鉢 (`nozoki-umebachi`) was measured from frame 24 (left page, second row, third column from the right: のぞきむめばち).

向こう捻じ梅 (`muko-neji-ume`) was measured from frame 25 (right page, fourth row, third column from the right: むかふねぢ梅).

八重向こう梅 (`yae-muko-ume`) was measured from frame 24 of the 1892 crest book (left page, first row, fourth column from the right).

三つ盛り梅 (`mitsumori-ume`) was measured from frame 24 of the 1892 crest book (left page, fourth row, fourth column from the right).

三つ寄せ裏梅 (`mitsu-yose-ura-ume`) was measured from frame 25 of the 1892 crest book (right page, fourth row, second column from the right).

菊一 (`kiku-ichi`) was measured from frame 39 of the 1892 crest book (left page, second row, third from the right).

三つ割り菊 (`mitsu-wari-giku`) was measured from frame 39 of the 1892 crest book (right page, fourth row, second from the right).

菊車 (`kiku-guruma`) was measured from frame 39 of the 1892 crest book (right page, third row, third from the right).

三つ蛤 (`mitsu-hamaguri`) was measured from frame 7 of the 1892 crest book (left page, third row, third column from the right).

丸に二つ蛤 (`maru-ni-futatsu-hamaguri`) was measured from frame 7 of the 1892 crest book (left page, second row, third column from the right).

丸に三つ蛤 (`maru-ni-mitsu-hamaguri`) was measured from frame 7 of the 1892 crest book (left page, fourth row, third column from the right).

三つ組合せ板屋貝 (`mitsu-kumiawase-itayagai`) was measured from frame 7 of the 1892 crest book (right page, third row, first column from the right).

四つ板屋貝 (`yotsu-itayagai`) was measured from frame 7 of the 1892 crest book (right page, fourth row, first column from the right).

向かい板屋貝 (`mukai-itayagai`) was measured from frame 7 of the 1892 crest book (right page, second row, first column from the right).

園部額 (`sonobe-gaku`) was measured from frame 19 of the 1892 crest book (right page, second row, second column from the right).

額に二八 (`gaku-ni-nihachi`) was measured from frame 19 of the 1892 crest book (right page, first row, second column from the right).

上がり藤 (`agari-fuji`) was measured from frame 32 of the 1892 crest book (right page, third row, third column from the right).

内藤藤 (`naito-fuji`) was measured from frame 32 of the 1892 crest book (right page, fourth row, first column from the right).

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
