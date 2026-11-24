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
| `size` | `small`, `medium`, `large`, or pixels. Left out, `1em`. |
| `animate` | Draw it step by step. |
| `speed` | 1 is the usual pace. |
| `loop` | Play again until the page closes. |
| `guides` | `off` leaves the layout guides out of the animation. |
| `replay` | `off` stops a click or Enter replaying. |
| `color`, `background` | Plain CSS colours. |
| `label`, `lang` | What a screen reader says, and its language. |
| `loading` | `lazy` (the default) or `eager`. |

Every attribute is also a property, and `play()` draws the construction again and resolves when it ends. `ready` settles when the crest is drawn, or `false` when there is no such crest.

## Events

`kamon-load` when drawn, `kamon-end` when the animation ends, `kamon-error` with a `reason` when nothing could be drawn. Each carries `{ crest }` in `detail`, bubbles and is composed.

## Less motion

When the reader asks for less motion, `animate` shows the finished crest at once, with no animation.
