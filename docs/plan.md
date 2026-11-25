# Plan: Kamon Crests

Written before the build (board ticket MODULES-1815) and kept as the record of what was planned. The code and the data are the truth;
where the build differs from this plan, the last section says how.

## What it is

`@johnmorrisdotca/kamon-crests`: Japanese family crests (家紋, kamon) as correct SVG vectors, each drawn from its traditional
compass-and-ruler construction (割付), never traced from a bitmap, with no raster and clean paths at any size. Each crest is described by
named **parts** that are data, so a site can search them, and each crest can **draw itself** step by step like a kanji's stroke order. A site
adds it as it adds Hata: one module per crest, a lookup by id, a custom element, a manifest with names in English and Japanese, the houses that
used each crest, who uses it today, and its parts.

## The parts vocabulary

A crest is a **frame**, one or more **motifs**, and for each motif a **count**, an **arrangement** and, where it is part of the design, a **turn**.
Every term has English, Japanese, the Japanese's reading in hiragana, romaji, and a line saying what it is (both languages), in `src/parts.ts`.

### Frames

| Id | English | 日本語 | Reading | Romaji |
| --- | --- | --- | --- | --- |
| `none` | No frame | 枠なし | わくなし | waku nashi |
| `ring-thin` | Thin ring | 細輪 | ほそわ | hosowa |
| `ring-medium` | Medium ring | 中太輪 | ちゅうぶとわ | chūbutowa |
| `hexagon` | Hexagon | 亀甲 | きっこう | kikkō |
| `mokko` | Lobed frame | 木瓜 | もっこう | mokkō |

### Motifs

**plant**

| Id | English | 日本語 | Reading | Romaji |
| --- | --- | --- | --- | --- |
| `paulownia` | Paulownia | 桐 | きり | kiri |
| `chrysanthemum` | Chrysanthemum | 菊 | きく | kiku |
| `plum` | Plum blossom | 梅 | うめ | ume |
| `cherry` | Cherry blossom | 桜 | さくら | sakura |
| `wisteria` | Wisteria | 藤 | ふじ | fuji |
| `wood-sorrel` | Wood sorrel | 片喰 | かたばみ | katabami |
| `hollyhock` | Hollyhock | 葵 | あおい | aoi |
| `gentian` | Gentian | 竜胆 | りんどう | rindō |
| `bellflower` | Bellflower | 桔梗 | ききょう | kikyō |
| `sword-leaf` | Water plantain | 沢瀉 | おもだか | omodaka |
| `oak` | Oak | 柏 | かしわ | kashiwa |
| `bamboo-grass` | Bamboo grass | 笹 | ささ | sasa |
| `tachibana` | Tachibana orange | 橘 | たちばな | tachibana |
| `ginkgo` | Ginkgo leaf | 銀杏 | いちょう | ichō |
| `maple` | Maple leaf | 紅葉 | もみじ | momiji |
| `ivy` | Ivy leaf | 蔦 | つた | tsuta |
| `ginger` | Myoga ginger | 茗荷 | みょうが | myōga |
| `tortoise-shell` | Tortoise shell | 亀甲 | きっこう | kikkō |

**animal**

| Id | English | 日本語 | Reading | Romaji |
| --- | --- | --- | --- | --- |
| `butterfly` | Swallowtail butterfly | 蝶 | ちょう | chō |
| `dragonfly` | Dragonfly | 蜻蛉 | とんぼ | tonbo |
| `rabbit` | Rabbit | 兎 | うさぎ | usagi |

**object**

| Id | English | 日本語 | Reading | Romaji |
| --- | --- | --- | --- | --- |
| `tomoe` | Tomoe | 巴 | ともえ | tomoe |
| `hawk-feather` | Hawk feather | 鷹の羽 | たかのは | taka no ha |
| `fan` | Folding fan | 扇 | おうぎ | ōgi |
| `wheel` | Cart wheel | 車 | くるま | kuruma |
| `ship` | Ship | 船 | ふね | fune |
| `coin` | Coin | 銭 | せん | sen |
| `torii` | Torii gate | 鳥居 | とりい | torii |
| `well-frame` | Well frame | 井桁 | いげた | igeta |
| `bar` | Bar | 一文字 | いちもんじ | ichimonji |
| `line` | Pulled lines | 引両 | ひきりょう | hikiryō |
| `linked-rings` | Linked rings | 輪違い | わちがい | wachigai |
| `seven-treasures` | Seven treasures | 七宝 | しっぽう | shippō |

**shape**

| Id | English | 日本語 | Reading | Romaji |
| --- | --- | --- | --- | --- |
| `snake-eye` | Snake's eye | 蛇の目 | じゃのめ | janome |
| `cross` | Cross | 十字 | じゅうじ | jūji |
| `star` | Star | 星 | ほし | hoshi |
| `diamond` | Diamond | 菱 | ひし | hishi |
| `scale` | Scale | 鱗 | うろこ | uroko |
| `hexagram` | Hexagram | 籠目 | かごめ | kagome |
| `hemp-leaf` | Hemp leaf | 麻の葉 | あさのは | asa no ha |
| `four-eyes` | Four eyes | 四つ目 | よつめ | yotsume |

**sky**

| Id | English | 日本語 | Reading | Romaji |
| --- | --- | --- | --- | --- |
| `crescent` | Crescent moon | 三日月 | みかづき | mikazuki |
| `sun-disc` | Sun disc | 日の丸 | ひのまる | hinomaru |
| `snow-ring` | Snow ring | 雪輪 | ゆきわ | yukiwa |

### Arrangements and turns

| Id | English | 日本語 | Reading | Romaji |
| --- | --- | --- | --- | --- |
| `single` | Single | 単独 | たんどく | tandoku |
| `radial` | Turned about the centre | 巡り | めぐり | meguri |
| `triangle` | In a triangle | 品の字 | しなのじ | shina no ji |
| `rows` | In rows | 並び | ならび | narabi |
| `quartered` | Quartered | 割り | わり | wari |
| `crossed` | Crossed | 違い | ちがい | chigai |
| `upright` | Upright | 立ち | たち | tachi |
| `hanging` | Hanging | 下がり | さがり | sagari |
| `ring` | In a ring | 輪 | わ | wa |
| `left` | Left | 左 | ひだり | hidari |
| `right` | Right | 右 | みぎ | migi |

### Counts

One to sixteen: 一 いち, 二 に, 三 さん, 四 し, 五 ご, 六 ろく, 七 しち, 八 はち, 九 きゅう, 十 じゅう, to 十六 じゅうろく (the sixteen-petal chrysanthemum).

## The catalogue

The first catalogue aims at the well-known crests across the motif families, and the major clan crests: the Tokugawa hollyhock, the
government and Hideyoshi's paulownia, the imperial chrysanthemum, and the crests of the Oda, Takeda, Sanada, Uesugi, Shimazu, Date, Mori,
Hojo, Ashikaga, Hosokawa, Maeda, Akechi, Toki, Minamoto, Taira and others. The aim was 60 to 100 crests; the build holds 61.
See [catalogue.md](catalogue.md) for what is in, and "What the build changed" for what is not yet.

## How each is constructed

A crest is a function that first strikes its **guides** (the compass circles and the ruler lines of its layout) and then draws its **shapes**,
each shape belonging to one part. Everything is on one page, 200 by 200 units, the centre at 100, 100, the layout circle at a radius of 96.
Lines use one scale of weights (a thin ring 6.4, a medium ring 9.6), so crests sit together. Rings are strokes; leaves, petals and feathers
are closed paths of lines, arcs and cubic curves; veins and slits are holes in the same path (even-odd), so there are no masks, clips or colours.
Repeats (three leaves, sixteen petals) are copies of one shape turned about the centre by exact rotation. Each crest's one-line rule, in both
languages, is in its record (`construction`) and listed in [provenance.md](provenance.md).

## The construction animation

Added by John's request. Every crest has an ordered list of steps, part of its data and following the parts vocabulary: first the guides of its
layout, drawn as thin strokes; then each shape traced as an outline and filled in, in order; then the guides fade, leaving the finished crest.
Pure SVG with CSS keyframes (stroke-dasharray, then fill), no library. The static crest stays the default. The element plays it with
`animate`, replays on a click, and takes `speed` and `loop`; `crestSteps(id)`, `animatedCrest(id, options)` and `animatedSvg(construction, options)`
are for a site that draws it itself. A reader who asks for less motion gets the finished crest at once. Tests hold that every crest has steps, the
steps cover every part, and the last frame equals the static drawing.

## Present-day users

Also by John's request: each record has a `usedBy` list, in both languages: the name, the kind (company, government, shrine or temple, town, team,
other), the relation (logo derived from the crest, uses it, is its emblem, takes its name from it), a note, and the public pages that state it with the
day each was read. Searchable like the parts, shown on the crest's panel in the demo. The historical crest only is drawn, never a logo; anything
that cannot be sourced is left out.

## The data model

```ts
interface CrestRecord {
  id: string; name: { en; ja; reading; romaji };
  frame: string; motifs: { motif; count; arrangement; turn? }[];
  families: { en; ja; reading? }[]; aliases: string[];
  construction: { en; ja }; usedBy: UsedBy[];
  bytes; guides; shapes; steps;
}
interface Construction { guides: Guide[]; shapes: Shape[]; steps: Step[] }
```

## The API

- `.` (ids, `crestId`, `crestUrl`, `paint`, `toDataUri`); `/crests/<id>`; `/steps/<id>`; `/load` (`crest`, `crestDataUri`, `crestSteps`, `animatedCrest`);
  `/manifest`; `/parts`; `/search` (`findCrests`, `facets`, `partsOf`); `/animate`; `/names`; `/element`, `/element/define`; `/svg/<id>.svg`; `/manifest.json`.

## The element

`<kamon-crest crest="mitsuba-aoi" size="96" animate loop speed="1.5" color="#8a1c1c">`. In the page's own document, drawn in the text colour, with
events `kamon-load`, `kamon-end`, `kamon-error`. The attribute is `crest`, not `id`: an HTML id may be used once on a page, and a crest may be shown twice.

## The demo

Two tabs, never a long page of fold-open sections. **Catalogue**: a search box and rows of choices (frame, kind, motif, count, arrangement, used today) with the
number each would find, beside a grid of every crest; opening a crest plays its construction, with a Draw it button, speed, loop and guides, its parts as
buttons that show a part alone and say what it is, its houses, who uses it today, and the code to use it. **Parts**: the vocabulary by kind, each part with
its Japanese, reading and a line, and a button to see every crest that has it. English and Japanese.

## The documents

README (to the family's standard), NOTICE.md (sources), CHANGELOG.md, CONTRIBUTING.md, AGENTS.md, CITATION.cff, an API reference built from the source,
guides in English and Japanese (getting started, how crests are constructed, parts and search, loading, the element, used today, using these crests,
architecture, troubleshooting), `docs/catalogue.md`, `docs/sizes.md`, `docs/provenance.md`, `docs/strings-ja.md`.

## What the build changed

- 61 crests rather than 60 to 100 at the top of the range. Left for a later version: the Uesugi bamboo and sparrows, the Date bamboo,
  the Ōuchi lozenge, the crane, and more forms of each motif.
- The animals are kept to four, drawn in the simplest honest construction.
- No documentation site of its own: the guides are Markdown, the API reference is a page of the demo's site.
