---
title: Parts and search
section: concept
order: 3
description: A crest's frame, motif, count and arrangement are data, so a page can search them.
---

## The parts

Every crest is described by:

- its **frame**: nothing, a thin ring, a medium ring, a hexagon, a hut frame, a lobed frame;
- its **motifs**: what it is a picture of (paulownia, tomoe, hollyhock, a fan, a crescent), each with a **count** (how many) and an **arrangement** (alone, turned about the centre, crossed, hanging, in a triangle), and a **turn** (left or right) where that is part of the design.

Each part has an id, its English, its Japanese, the Japanese's reading in hiragana, its romaji and a line saying what it is: see `/parts`.

```ts
import { term } from "@johnmorrisdotca/kamon-crests/parts";

console.log(term("tomoe")); // { id: "tomoe", en: "Tomoe", ja: "巴", reading: "ともえ", … }
```

## Searching

```ts
import { findCrests } from "@johnmorrisdotca/kamon-crests/search";

findCrests({ motif: "paulownia" });               // every crest with paulownia
findCrests({ ring: true });                       // every ringed crest
findCrests({ frame: "hexagon" });                 // a frame by its id
findCrests({ count: 3 });                         // every crest with three of something
findCrests({ arrangement: "crossed" });           // an arrangement by its id
findCrests({ turn: "left" });                     // a motif that turns left, such as the tomoe
findCrests({ ring: true, motifKind: "plant" });   // ringed crests of a plant
findCrests({ motif: ["paulownia", "chrysanthemum"] }); // a list matches any of them
findCrests({ text: "Tokugawa" });                 // a name, a house, a reading or a part
findCrests({ family: "Tokugawa" });               // the houses that bore it, and nothing else
```

The ids are in `/parts`: `FRAME_IDS`, `MOTIF_IDS` and `ARRANGEMENT_IDS` list them, and `term(id)` looks one up. `motifKind` is `plant`, `animal`, `object`, `shape` or `sky`. Every field that is given must match; a field with several values matches any of them. Text is folded: case, accents and macrons, katakana as hiragana, spaces and hyphens, so `kikko` finds `Kikkō` and `ともえ` finds `トモエ`. `facets()` counts how many crests have each part, and counts again for a narrowed search, `facets(findCrests({ ring: true }))`: the numbers on a page's chips. `partsOf(record)` lists one crest's parts in reading order.

## Families and the books' order

The crest books do not list crests by id. They set them in chapters (plants, animals, nature and sky, objects, buildings, patterns and shapes, characters), the families in a chapter by the reading of their name (桔梗, then 菊, then 桐), and in a family the plain crest first and its variants after it. The package keeps that order, and every record says where it stands:

| Field | What it is |
| --- | --- |
| `family` | The id of the motif family (`MotifFamily`): `fuji` for every wisteria. It is not `families`, which are the houses that bore the crest. |
| `familyReading` | The family's reading in hiragana: the order families stand in within a chapter. |
| `base` | The crest this is a variant of. For a frame variant it is the same crest with no frame; for every other crest it is the family's plain form; for that form, its own id. |
| `variantKind` | `base`, `form` (裏, 鬼, a turn to the right), `tone` (陰), `count` (二つ, 三つ), `frame` (丸に, 亀甲に), `arrangement` (並び, 違い, 向かい), `combination` (another motif added) or `house` (a variant a house is named for), in the order the books give them. |
| `variantRank` | Its place among the crests of its family of its kind, from 1. |
| `no` | The catalogue number, like the numbers the books print: given once, in the books' order, and never changed. A crest added later takes the next number, wherever it stands. |

`MANIFEST` is in this order, so is every search that is not ranked by a count, `MOTIF_FAMILIES` and `CHAPTERS` give the families and the chapters, and `variantsOf(id)` gives a crest's family in order, the plain form first. A frame variant always comes after its plain twin: 下がり藤 before 丸に下がり藤, 橘 before 丸に橘.

```ts
import { MOTIF_FAMILIES, manifest, variantsOf } from "@johnmorrisdotca/kamon-crests/manifest";
import { findCrests } from "@johnmorrisdotca/kamon-crests/search";

variantsOf("maru-ni-sagari-fuji").map((record) => record.id); // ["sagari-fuji", "maru-ni-sagari-fuji", "fuji-no-maru"]
manifest("fuji-no-maru")?.variantKind;                        // "arrangement"
MOTIF_FAMILIES.find((family) => family.id === "fuji")?.ja;    // "藤"
findCrests({ text: "wisteria" });                             // the wisteria family first, its plain form leading
findCrests({ motifFamily: "fuji" });                          // only the family
```

A frame variant differs from its plain crest by its frame alone (a test holds it to that: the same motifs, and as many shapes outside the frame). A crest that is set out differently, or has more of the motif, or another motif added, is never a frame variant, and the demo's Group by motif option, which counts the frame variants on the plain crest's tile, leaves it on a tile of its own.

## Counts

Every crest's record carries `stats`: what a compass and a ruler do to draw it. They are what the animation does, like a character's stroke count: a part built again at each place it is turned or mirrored to is counted at each place. `pnpm data` counts them from the crest's construction, and a test counts them again from the animation it plays; none is typed by hand.

| Count | 日本語 | What it counts |
| --- | --- | --- |
| `circles` | 円 | The compass circles struck, each in full: the unit's, and the unit's again at each other place a turn or a mirror builds. A circle that lands on one already struck, as one about the crest's centre does at every place, counts once. |
| `lines` | 直線 | The straight lines ruled, counted the same way: at every place, and once where one lands on a line already ruled. A guide of several edges, such as a square, counts each edge. |
| `arcs` | 弧 | The arcs inked, at every place. Arcs that follow one another along one struck circle are one arc, so a whole circle is one. A curve of a crest still traced from a book counts as one, so those crests have several hundred. |
| `steps` | 手順 | The steps of the construction: each guide, each shape or unit drawn, each turn, and the rubbing out. |
| `widths` | コンパス幅 | The distinct compass widths: the radii of the circles. A width used at five places is one width. |
| `fills` | 塗り | The solid shapes. |
| `score` | 点数 | Three for each arc, two for each circle, one for each line, five for each compass width after the first: see Complexity below. |
| `meter` | 複雑さ | The score on a fixed scale of 0 to 100. |
| `grade` | 級 | The score in five grades, 1 (Simple) to 5 (Master). |
| `symmetry` | 対称 | `turns`: how many places the finished crest can be turned to and look the same (1 is none, 0 is any: a circle). `mirror`: whether it has a mirror line. |

The demo's card says them in a line, `Circles 12 · Ruled lines 6 · Steps 23 · Compass widths 3`, and in Japanese `円 12・直線 6・手順 23・コンパス幅 3種`.

```ts
import { manifest } from "@johnmorrisdotca/kamon-crests/manifest";
import { findCrests } from "@johnmorrisdotca/kamon-crests/search";

manifest("janome")?.stats;                          // { score: 15, meter: 29, grade: 1, circles: 2, lines: 0, arcs: 2, steps: 8, widths: 2, fills: 1, symmetry: { turns: 0, mirror: true } }
findCrests({ circles: 5 });                         // every crest of exactly five circles
findCrests({ circles: { min: 10 } });               // of ten circles or more; `max` is the other end
findCrests({ sort: "strokes" });                    // fewest strokes first, as a dictionary orders kanji by 画数
findCrests({ ring: true, sort: "arcs", order: "desc" });
```

`sort` takes any count, or `strokes`: circles, lines and arcs together, as a dictionary orders kanji. Crests that tie keep the catalogue's order.

## Complexity

A crest's **score** is `3 × arcs + 2 × circles + lines + 5 × (compass widths − 1)`: an arc is the most careful work, and resetting the compass is the slowest move. Its **meter** puts the score on a fixed scale of 0 to 100 (25 for each tenfold), and its **grade** is the score in five bands at round numbers (25, 100, 300, 1000), 1 (Simple) to 5 (Master). They are `stats.score`, `stats.meter` and `stats.grade` in the record; [Complexity](complexity.md) gives the reasons. Crests of one score are ordered by their `steps`, fewest first, and then as the catalogue has them. The snake's eye scores 15 (meter 29); the hollyhock in a ring scores 1249 (meter 77).

```ts
import { findCrests, rankCrests, topCrests } from "@johnmorrisdotca/kamon-crests/search";

rankCrests();                                       // every crest, the simplest first
rankCrests({ by: "circles", order: "desc" });       // by any count, the most first
rankCrests({}, findCrests({ ring: true }));         // the ringed crests, simplest first
rankCrests({ redrawing: true });                    // with the crests still being redrawn ranked among the rest
findCrests({ score: { max: 20 } });                 // the score is a count like the others
findCrests({ grade: 4 });                           // so are the meter and the grade
topCrests(5);                                       // the five most complex
```

Seven crests are still traced from a period crest book and are being redrawn with compass and ruler (`redrawing: true` in their records). A traced outline is many short curves, so their arc counts say far more than there is to draw. Until each is rebuilt, `rankCrests()` ranks them among themselves and puts them last, in either order; `redrawing: true` ranks them among the rest.

The demo's Complexity tab (複雑さ) is this list as a grid, each crest with its counts under it. It ranks by any count, narrows by the parts, and opens a crest's card to draw it.

## Present-day users

`findCrests({ usedBy: true })` finds the crests that a public page says someone uses today, and `{ usedBy: "company" }` those a company uses. See [used today](used-today.md).
