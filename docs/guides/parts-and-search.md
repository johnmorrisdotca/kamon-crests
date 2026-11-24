---
title: Parts and search
section: concept
order: 3
description: A crest's frame, motif, count and arrangement are data, so a page can search them.
---

## The parts

Every crest is described by:

- its **frame**: nothing, a thin ring, a medium ring, a hexagon, a lobed frame;
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
findCrests({ count: 3 });                         // every crest with three of something
findCrests({ ring: true, motifKind: "plant" });   // ringed crests of a plant
findCrests({ text: "Tokugawa" });                 // a name, a house, a reading or a part
```

Every field that is given must match; a field with several values matches any of them. Text is folded: case, accents and macrons, katakana as hiragana, spaces and hyphens, so `kikko` finds `Kikkō` and `ともえ` finds `トモエ`. `facets()` counts how many crests have each part, and counts again for a narrowed search: the numbers on a page's chips. `partsOf(record)` lists one crest's parts in reading order.

## Counts

Every crest's record carries `stats`: what a compass and a ruler do to draw it. `pnpm data` counts them from the crest's construction, and a test counts them again from its steps; none is typed by hand.

| Count | 日本語 | What it counts |
| --- | --- | --- |
| `circles` | 円 | The compass circles the steps strike, each in full. |
| `lines` | 直線 | The straight lines the steps rule. A guide of several edges, such as a square, counts each edge. |
| `arcs` | 弧 | The arcs inked: the curved edges of the finished shapes. Arcs that follow one another on one circle are one arc, so a whole circle is one. A curve of a crest still traced from a book counts as one, so those crests have several hundred. |
| `steps` | 手順 | The steps of the construction: each guide, each shape or unit drawn, each turn, and the rubbing out. |
| `widths` | コンパス幅 | The distinct compass widths: the radii of the circles. |
| `fills` | 塗り | The solid shapes. |
| `symmetry` | 対称 | `turns`: how many places the finished crest can be turned to and look the same (1 is none, 0 is any: a circle). `mirror`: whether it has a mirror line. |

The demo's card says them in a line, `Circles 12 · Ruled lines 6 · Steps 23 · Compass widths 3`, and in Japanese `円 12・直線 6・手順 23・コンパス幅 3種`.

```ts
import { manifest } from "@johnmorrisdotca/kamon-crests/manifest";
import { findCrests } from "@johnmorrisdotca/kamon-crests/search";

manifest("janome")?.stats;                          // { circles: 2, lines: 0, arcs: 2, steps: 4, widths: 2, fills: 1, symmetry: { turns: 0, mirror: true } }
findCrests({ circles: 5 });                         // every crest of exactly five circles
findCrests({ circles: { min: 10 } });               // of ten circles or more; `max` is the other end
findCrests({ sort: "strokes" });                    // fewest strokes first, as a dictionary orders kanji by 画数
findCrests({ ring: true, sort: "arcs", order: "desc" });
```

`sort` takes any count, or `strokes`: circles, lines and arcs together. Crests that tie keep the catalogue's order.

## Present-day users

`findCrests({ usedBy: true })` finds the crests that a public page says someone uses today, and `{ usedBy: "company" }` those a company uses. See [used today](used-today.md).
