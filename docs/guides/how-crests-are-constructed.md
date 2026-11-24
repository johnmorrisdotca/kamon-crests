---
title: How crests are constructed
section: concept
order: 2
description: The compass and ruler a crest is set out with, and how every crest draws itself step by step.
---

## A crest is set out, or drawn from a period book

A kamon is built from a few circles and lines. The old crest painters set a crest out with a compass and a ruler: a circle for the ring, lines through the centre, a second circle for where the petals meet. That layout is the crest's 割付 (*wari-tsuke*). Every geometric crest in this package is written as exactly that: a small function that strikes its guides, then draws its shapes from them. The leaf and flower crests whose layout cannot be struck from a few circles are vectorised from a public-domain Meiji crest book at the National Diet Library: the outline drawing on the page is filled, traced to curves, cleaned, and one half (or one leaf) is kept and mirrored or turned exactly, so that the symmetry is the construction's and not the woodblock's. Each of those crests cites the book, the frame and the place on the page ([provenance](../provenance.md)). No raster is embedded, and the paths stay clean at any size.

The crests drawn most strictly (the hollyhock, the tomoe, the crossed hawk feathers, the rabbit, the three ginkgo leaves) are inked only from arcs of their compass circles and from ruled lines. Their circles stand on grid points with whole-number widths, or are placed by touching circles already struck, and the guides the animation strikes are those same circles.

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

Every crest can draw itself, like a kanji's stroke order, in the six phases a crest painter works by, each named in the step's caption (`stepCaption`, in English and Japanese):

1. **The underdrawing**, compass width by compass width. The crest's widths are numbered from 1, the smallest first. Before the circles of one width are struck, their centres are marked: a dot, and beside it the width's number. Then each circle: "set the compass to width 2, put its point on 2, strike the circle". Where one piece passes over another, the circles that bound the gap in the piece beneath are captioned "strike the gap circles".
   A hexagon's or a triangle's corners are marked here too: the compass is kept at the circle's width and stepped round it from the top, clockwise (a `mark` step).
2. **The ruled underdrawing**: every straight line, ruled full length from edge to edge of the layout circle, each parallel set together. A bar or a square is the space between long lines that cross; nothing is ruled only along the edge it bounds.
3. **Trace only what is needed**: each group of shapes' outlines, thin, along circles and lines already on the page.
4. **Thicken the outline.**
5. **Fill**: each group of shapes, and after a unit its other places.
6. **Finished**: the underdrawing is rubbed out, leaving the finished crest.

While a circle is struck, and while an arc is inked, the compass arm shows: a thin line from that circle's centre to the pen, following it round, and the centre's dot bold for as long. It is gone when the curve ends. It shows that the arc came from a compass standing on that centre; an arm with no dot under it would be an arc no struck circle gave.

Four switches go with the guides, each an option of `animatedSvg` and `stepSvg` and an attribute on `<kamon-crest>` (or on anything the drawing is in): `centres` (the dots), `widths` (the numbers), `fill`, and `compass-arm` (the option is `compassArm`), each `off` or `false` to leave it out. With the fill off the crest is line art: each shape's own outline, the arcs and ruled lines it is constructed from, never filled, so that a white line shows as its two edges. `staticSvg(construction, { fill: false })` is the finished crest drawn that way. Each circle of a construction says its centre (`at`) and its width's number (`width`).

A guide is a whole circle or a ruled line, never a bare arc: every circle is struck in full before an arc is taken from it, and every straight edge lies on a line ruled first. A crest that repeats a unit (three leaves, sixteen petals) lays out and draws one unit completely, with all its circles, and then one `turn` step goes round its other places clockwise, one at a time and quickly: the unit's circles and lines are struck there, then the unit is inked there, before the next place; the data holds the circles once. Every circle is struck clockwise from its top, a part's circles by compass width with the smallest first, and its ruled lines after them, each parallel set together and from the top down. A turned shape says how in the data: `turn` (degrees clockwise about the centre) and `flip`. A test holds every rebuilt crest to this. It is plain SVG with CSS keyframes: no script, no library.

```ts
import { animatedCrest } from "@johnmorrisdotca/kamon-crests/load";

const svg = await animatedCrest("kikyo", { speed: 1.5, loop: true });
```

Or with the element: `<kamon-crest crest="kikyo" size="200" animate loop speed="1.5">`. A click replays it. A reader whose system asks for less motion is shown the finished crest at once. `stepCaption(step, construction, "ja")` gives a line that says what each step does, for a caption under the drawing.

## Holes and the even-odd rule

A vein or a slit inside a leaf is a hole in the same path, wholly inside the shape, cut with the even-odd rule. Crests use no masks, clips, gradients or colours, so a crest cannot depend on an id that clashes with another on the page.
