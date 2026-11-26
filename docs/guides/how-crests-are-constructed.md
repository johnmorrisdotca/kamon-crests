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
- **Steps**: the order they are played in: every guide, then each group of shapes, then the guides rubbed out. Each step has an `op`: `centres` marks the centres of the circles of one width, `guide` strikes a circle or rules a line, `mark` steps the compass round a circle, `trace` and `thicken` ink outlines, `draw` fills a group of shapes, `turn` builds the unit again at its other places, and `fade` rubs the guides out.

The shapes are the crest. The static SVG and the last frame of the animation are made from the same paths, and a test holds them equal. A crest that is still being redrawn (`redrawing: true`) has no guides and no steps, and is shown finished.

Each crest also has a line about how it is set out, in English and in Japanese. It is not on the manifest's records; `crestConstruction(id)` loads it, from the same file as the steps:

```ts
import { crestConstruction } from "@johnmorrisdotca/kamon-crests/load";

const text = await crestConstruction("maru-ni-mitsu-uroko");
console.log(text?.en, text?.ja);
```

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

The widths key stands beside the crest while the underdrawing is on the page. For each compass width the crest uses, in the order the numbers are given, it draws the compass opened to that width: a line as long as the circle's radius at the crest's own scale, with the centre dot and the number at its left end. The width the compass is set to, the last circle struck, is bold. It stands in a margin outside the crest's 200 by 200 square, so the crest never moves or shrinks: the view box is wider (`widthsKey: true` or `"right"`) or taller (`widthsKey: "below"`) while the key is on, and a crest of many widths has its rows in columns. It is rubbed out with the guides, a crest with no circle has none, and a still step (`stepSvg`) shows the same key with the width of the last circle struck in bold. It is off unless asked for (`widthsKey: true`, or `widths-key="on"`), so that a page's box does not change.

Two more switches change how the ink and the repeated places are shown, and neither changes what is drawn. `inkDraw` (the attribute is `ink-draw`) is off by default, and with `inkDraw: true` (`ink-draw="on"`) each trace and each thickening takes two and a half to four seconds, the pen going along each outline in turn, clockwise, the thick line drawn over the thin one and the compass arm following the pen on arcs; left out, they fade in quickly, under a second a step. `fullBuild` (`full-build="on"`) is off by default: with it on, `fullBuilt(construction)` replaces each `turn` step by the steps of each place it builds, clockwise from the unit and one after another: the unit's circles struck there (centres marked first), its lines ruled, then its outline traced, thickened and filled. Each place's circles and lines are written where they stand, and nothing is copied or flipped across. The steps carry `place` (which place, and how many the part has) for their captions. The finished crest is the same either way.

A guide is a whole circle or a ruled line, never a bare arc: every circle is struck in full before an arc is taken from it, and every straight edge lies on a line ruled first. A crest that repeats a unit (three leaves, sixteen petals) lays out and draws one unit completely, with all its circles, and then one `turn` step goes round its other places clockwise, one at a time and quickly: the unit's circles and lines are struck there, then the unit is inked there, before the next place; the data holds the circles once. Every circle is struck clockwise from its top, a part's circles by compass width with the smallest first, and its ruled lines after them, each parallel set together and from the top down. A turned shape says how in the data: `turn` (degrees clockwise about the centre) and `flip`. A test holds every rebuilt crest to this. It is plain SVG with CSS keyframes: no script, no library.

```ts
import { animatedCrest } from "@johnmorrisdotca/kamon-crests/load";

const svg = await animatedCrest("kikyo", { speed: 1.5, loop: true });
```

Or with the element: `<kamon-crest crest="kikyo" size="200" animate loop speed="1.5">`. A click replays it. A reader whose system asks for less motion is shown the finished crest at once. `stepCaption(step, construction, "ja")` gives a line that says what each step does, for a caption under the drawing.

## Holes and the even-odd rule

A vein or a slit inside a leaf is a hole in the same path, wholly inside the shape, cut with the even-odd rule. Crests use no masks, clips, gradients or colours, so a crest cannot depend on an id that clashes with another on the page.
