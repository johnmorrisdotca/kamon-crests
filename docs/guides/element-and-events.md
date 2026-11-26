---
title: The element
section: reference
order: 5
description: <kamon-crest>, its attributes, its animation, and its events.
---

## The tag

```html
<kamon-crest crest="mitsuba-aoi" size="120"></kamon-crest>
```

Register it with `import "@johnmorrisdotca/kamon-crests/element/define"` or one script tag from the CDN. The crest is drawn in the page's own document, with no shadow root, in the text colour: `color: #8a1c1c` on the element or a parent paints it. It is `crest`, not `id`, because an HTML `id` may be used once only on a page and a crest may be shown twice.

## Attributes

| Attribute | Does |
| --- | --- |
| `crest` | The crest's id, loosely written. |
| `size` | `small`, `medium`, `large` (32, 96 and 192 pixels), or a number of pixels. Left out, `1em`, the size of the text round it. |
| `animate` | Draw it step by step. |
| `speed` | 1 is the usual pace. |
| `loop` | Play again until the page closes. |
| `exit` | With `loop`: how the finished crest leaves before it is drawn again. `on` picks one of `fade`, `scatter`, `spin`, `twirl`, `fall` and `close` at random each time round; name one to have only that one. Left out or `off`, the finished crest is held a moment and drawn again. |
| `invert` | `on` swaps the colours, as a crest is often dyed on cloth: the crest in the page's colour (the `--kamon-paper` custom property, else the page's background) cut out of a solid disc in the crest's colour. |
| `guides` | `off` leaves the layout guides out of the animation. |
| `centres`, `widths`, `fill`, `compass-arm` | `off` leaves out the dots that mark the circles' centres, the compass-width numbers beside them, the fill (the crest is then line art, each shape's own outline), or the compass arm (the thin line from a circle's centre to the pen while it is struck or one of its arcs is inked). The drawing itself reads these four, on the element or on anything it is inside: a drawing that is playing or has played takes one at once, and a still one (`step()`) takes it the next time it is drawn. They have no property on the element. |
| `widths-key` | `on` adds the widths key: the compass opened to each width the crest uses, in a margin beside the crest (the drawing's box is wider to hold it, and the crest keeps its size). `below` puts it under the crest, longer instead of wider. Left out, there is none and the box is the crest's square. Read when the drawing is made, on the element or on anything it is inside; set on the element, a change draws it again from where it is. |
| `ink-draw` | `on` has the pen draw each outline along its length, one after another, over a few seconds, thin and then heavy. Left out, the outlines fade in quickly. Set on the element, a change draws it again from where it is. |
| `full-build` | `on` builds every place a unit is turned or mirrored to as the first was, one after another, clockwise: its circles, its lines, then its outline traced, thickened and filled. The steps grow with the places, so the scrubber and the captions count them. Left out, a place is one quick step. A change draws it again from the start. |
| `replay` | `off` stops a click or Enter replaying. |
| `controls` | Shows play and pause, step back, step forward, a scrubber across the steps, and the step's caption. |
| `color`, `background` | Plain CSS colours. |
| `label`, `lang` | What a screen reader says, and its language. |
| `loading` | `lazy` (the default) or `eager`. |

Every attribute is also a property, and `play()` draws the construction again and resolves when it ends. `ready` settles when the crest is drawn, or `false` when there is no such crest, and `finished` settles when the animation ends.

## Pause, play and step

```ts
const crest = document.querySelector("kamon-crest");
crest.pause();          // hold the animation where it is
await crest.play();     // go on from there (or, when it is not held, draw it again from the start)
await crest.step(3);    // hold the drawing with steps 0 to 3 done; -1 is the empty page
console.log(crest.at, crest.paused); // 3 true
```

`step(n)` shows a still drawing: every guide struck so far and every shape drawn so far, with nothing half done. It resolves to the step it landed on. `play()` after it goes on with the next step, and from the last step it starts again. `at` is the index of the step the drawing is at, and `paused` says whether it is held.

With `controls`, the same things are under the crest: a play and pause button, step back and step forward, a scrubber with one stop for each step (the first is the empty page), and the step's caption while the drawing is held. The words are English or Japanese by `lang`.

Keys, when the element has focus: Space holds the drawing or lets it go on, the left and right arrows step back and forward, and Enter draws it again from the start.

## One part alone

```ts
await crest.isolate("frame");                    // the ring at full strength, the rest faint, its two circles shown
await crest.isolate("hollyhock");                // a motif by its id, with every guide struck for it
await crest.isolate("hollyhock", "count");       // one leaf of the three; the next step turns it to its other places
await crest.isolate("hollyhock", "arrangement"); // the lines it is turned about and mirrored in
await crest.play();                              // draws only that part's steps
await crest.clear();                             // the whole crest again
```

`isolate(part, show?)` holds the drawing still on one part: its shapes at full strength, the rest of the crest faint, and only its own guides. `part` is `"frame"` or a motif's id, as the crest's record names them. Until `clear()`, `step()`, `play()` and the controls go through that part's steps and no others, so `step(-1)` and then `play()` draws the part alone. A part with no shape, the frame of a crest that has none, leaves the whole crest faint. A new `crest` lets the part go.

Every shape and every guide in a crest's construction says which part it belongs to (`part`) and which unit it is (`unit`: 0 for the one that is laid out and drawn, 1 and up for that one turned to each other place). `isolated(construction, part, show?)` from `/animate` is the same view as data, for a page that draws the steps itself.

## Events

`kamon-load` when drawn, `kamon-end` when the animation ends, `kamon-error` with a `reason` when nothing could be drawn. `kamon-play` when it starts or goes on, `kamon-pause` when it is held, and `kamon-step` when `step()`, the controls or an arrow key lands on a step; the last two also carry `step` (the index it is held at) and `steps` (how many there are). Each carries `{ crest }` in `detail`, bubbles and is composed.

## Less motion

When the reader asks for less motion, `animate` shows the finished crest at once, with no animation. Stepping still works: each step is a still drawing.
