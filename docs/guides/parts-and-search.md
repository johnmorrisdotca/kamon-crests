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

## Present-day users

`findCrests({ usedBy: true })` finds the crests that a public page says someone uses today, and `{ usedBy: "company" }` those a company uses. See [used today](used-today.md).
