---
title: Getting started
section: tutorial
order: 1
description: Import one crest, load another by its id, and put one in a page.
---

## Install

```sh
npm install @johnmorrisdotca/kamon-crests
```

Use the scoped name. It needs Node 24 or later on a server, and any current browser. The package has no runtime dependencies, uses no hosted service and makes no network request of its own.

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

Use the root for the ids and helpers, `/load` for an id chosen at run time, `/manifest` for names and facts, `/search` to find crests by their parts, `/animate` for the construction animation, and the optional `/element/define` entry for the `<kamon-crest>` tag. The README lists [every entry](../../README.md#the-entries).

## In a page with one tag

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@johnmorrisdotca/kamon-crests@0/dist/element-define.js"></script>
<kamon-crest crest="kikyo" size="96" animate></kamon-crest>
```

## Which guide do I need?

| I want to | Read |
| --- | --- |
| Show one crest on a page | [Import one crest](#import-one-crest) above, then [loading crests](loading-crests.md) for colour, a background, or an `<img>` |
| Load a crest by its id | [Load one by its id](#load-one-by-its-id) above, and [loading crests](loading-crests.md) |
| Search crests by their parts, names or houses | [Parts and search](parts-and-search.md) |
| Play the construction animation | [The animation](how-crests-are-constructed.md#the-animation), and the `animate` attribute in [the element](element-and-events.md) |
| Use the `<kamon-crest>` element | [In a page with one tag](#in-a-page-with-one-tag) above, then [the element](element-and-events.md) |
| Sort crests from simple to hard | [Complexity](complexity.md) |
| Know where a drawing comes from, and whether I may use it | [Using these crests](using-these-crests.md) and [Used today](used-today.md) |
| Fix a crest that is black, missing or not moving | [Troubleshooting](troubleshooting.md) |
| Draw a crest and send it | [Draw a crest](draw-a-crest.md), then [CONTRIBUTING.md](../../CONTRIBUTING.md) |
| See how the package is built | [Architecture](architecture.md) |
