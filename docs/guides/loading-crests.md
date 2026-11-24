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

## Colour, background and title

```ts
import { crest } from "@johnmorrisdotca/kamon-crests/load";

const svg = await crest("kikyo", { color: "#2b5f9e", background: "#f4efe4", title: "Bellflower" });
```

A crest is drawn in `currentColor`. An `<img>` cannot see the page's text colour, so a crest used as an image is black unless a `color` is given: `toDataUri(svg, { color })` and `crestDataUri(id, { color })` paint first. Colours are plain CSS colours only; anything else throws a `TypeError`.

## Loose ids

An id may be written loosely: `"Mitsuba Aoi"`, `" maru_ni_juji "`. A name, a clan or an alias is a search, not an id: use `findCrests({ text })` and take the record's `id`.
