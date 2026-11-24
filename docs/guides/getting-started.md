---
title: Getting started
section: tutorial
order: 1
description: Import one crest, load another by its id, and put one in a page.
---

## Import one crest

```ts
import aoi from "@johnmorrisdotca/kamon-crests/crests/mitsuba-aoi";

document.querySelector("#crest")!.innerHTML = aoi;
```

A crest's module is its SVG string and nothing else. It is drawn in the colour of the text around it (`currentColor`) on a 200 by 200 page with no background, so a page sizes it with CSS and paints it with `color`. Each crest is its own module, so a page carries only the crests it imports.

## Load one by its id

```ts
import { crest } from "@johnmorrisdotca/kamon-crests/load";

const svg = await crest("maru-ni-juji", { color: "#8a1c1c" });
```

Use the root for the ids and helpers, `/load` for an id chosen at run time, `/manifest` for names and facts, `/search` to find crests by their parts, `/animate` for the construction animation, and the optional `/element/define` entry for the `<kamon-crest>` tag. See [loading](loading-crests.md), [parts and search](parts-and-search.md), [the element](element-and-events.md) and [how crests are constructed](how-crests-are-constructed.md).

## In a page with one tag

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@johnmorrisdotca/kamon-crests@0/dist/element-define.js"></script>
<kamon-crest crest="sasa-rindo" size="96" animate></kamon-crest>
```

Installing adds no runtime dependency and no hosted service.
