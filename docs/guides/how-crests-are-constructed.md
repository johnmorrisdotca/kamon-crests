---
title: How crests are constructed
section: concept
order: 2
description: The compass and ruler a crest is set out with, and how every crest draws itself step by step.
---

## A crest is set out, or drawn from a period book

A kamon is built from a few circles and lines. The old crest painters set a crest out with a compass and a ruler: a circle for the ring, lines through the centre, a second circle for where the petals meet. That layout is the crest's 割付 (*wari-tsuke*). Every geometric crest in this package is written as exactly that: a small function that strikes its guides, then draws its shapes from them. The leaf and flower crests whose layout cannot be struck from a few circles are vectorised from a public-domain Meiji crest book at the National Diet Library: the outline drawing on the page is filled, traced to curves, cleaned, and one half (or one leaf) is kept and mirrored or turned exactly, so that the symmetry is the construction's and not the woodblock's. Each of those crests cites the book, the frame and the place on the page ([provenance](../provenance.md)). No raster is embedded, and the paths stay clean at any size.

Every crest lives on one page, 200 by 200 units, with its centre at 100, 100 and the layout circle at a radius of 96. Line weights come from one scale, so crests sit together: a thin ring is 6.4 units, a medium ring 16.8 (measured from real ringed crests: see the provenance), with 3.5 of white between a ring and its motif.

## What a construction holds

```ts
import { crestSteps } from "@johnmorrisdotca/kamon-crests/load";

const construction = await crestSteps("maru-ni-mitsu-uroko");
console.log(construction?.guides.length, construction?.shapes.length, construction?.steps.length);
```

- **Guides**: the compass circles and ruler lines of the layout, each a path.
- **Shapes**: the paths of the finished crest, in the order they are drawn. Each belongs to one part (`"frame"`, or a motif's id) and is solid (`fill`) or a line of one weight (`stroke`).
- **Steps**: the order they are played in: every guide, then each group of shapes, then the guides rubbed out.

The shapes are the crest. The static SVG and the last frame of the animation are made from the same paths, and a test holds them equal.

## The animation

Every crest can draw itself, like a kanji's stroke order: first the guides, drawn thin; then each shape traced as an outline, in order, and filled in; then the guides fade, leaving the finished crest. It is plain SVG with CSS keyframes: no script, no library.

```ts
import { animatedCrest } from "@johnmorrisdotca/kamon-crests/load";

const svg = await animatedCrest("kikyo", { speed: 1.5, loop: true });
```

Or with the element: `<kamon-crest crest="kikyo" size="200" animate loop speed="1.5">`. A click replays it. A reader whose system asks for less motion is shown the finished crest at once. `stepCaption(step, construction, "ja")` gives a line that says what each step does, for a caption under the drawing.

## Holes and the even-odd rule

A vein or a slit inside a leaf is a hole in the same path, wholly inside the shape, cut with the even-odd rule. Crests use no masks, clips, gradients or colours, so a crest cannot depend on an id that clashes with another on the page.
