---
title: Loading crests
section: how-to
order: 4
description: Modules, a lookup by id, data URIs, colour and background.
---

## The boundaries

- `@johnmorrisdotca/kamon-crests/crests/<id>`: one crest, a fixed import.
- `@johnmorrisdotca/kamon-crests/load`: `crest(id)`, for an id known at run time. Each crest is a dynamic import, so a bundler makes a small chunk of each.
- `@johnmorrisdotca/kamon-crests/svg/<id>.svg`: the same SVG as a file, for an `<img>` or a CDN address (`crestUrl(id)`).
- `@johnmorrisdotca/kamon-crests`: `crestId`, `isCrestId`, `crestUrl`, `paint` and `toDataUri`, and no crest. They work on ids and strings.

## Colour, background and title

```ts
import { crest } from "@johnmorrisdotca/kamon-crests/load";

const svg = await crest("kikyo", { color: "#2b5f9e", background: "#f4efe4", title: "Bellflower" });
```

A crest is drawn in `currentColor`. An `<img>` cannot see the page's text colour, so a crest used as an image is black unless a `color` is given: `toDataUri(svg, { color })` and `crestDataUri(id, { color })` paint first. Colours are plain CSS colours only; anything else throws a `TypeError`.

## In an image

```ts
import { crestUrl } from "@johnmorrisdotca/kamon-crests";
import { crestDataUri } from "@johnmorrisdotca/kamon-crests/load";

image.src = crestUrl("janome") ?? "";                                   // the file on the CDN, in black
image.src = (await crestDataUri("janome", { color: "#8a1c1c" })) ?? ""; // painted red, as a data: URI
```

`crestUrl(id, { base })` points at a folder of your own instead of the CDN: copy `node_modules/@johnmorrisdotca/kamon-crests/dist/svg` into your files and name it, such as `{ base: "/crests" }`.

## Loose ids

An id may be written loosely: `"Mitsuba Aoi"`, `" maru_ni_juji "`. A name, a clan or an alias is a search, not an id: use `findCrests({ text })` and take the record's `id`. `crestId(" Mitsuba Aoi ")` gives the id as the package writes it (`"mitsuba-aoi"`), or `null`; `isCrestId(value)` is true only for an id written exactly. A value that is not a string throws a `TypeError`.
