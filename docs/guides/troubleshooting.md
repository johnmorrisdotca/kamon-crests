---
title: Troubleshooting
section: how-to
order: 9
description: A crest that is black, missing, or not moving.
---

- **The crest is black in an `<img>`.** An image cannot see the page's text colour. Pass `color`: `crestDataUri(id, { color })`.
- **`crest()` returns `null`.** The id is not one. A clan or a name is a search: `findCrests({ text: "Tokugawa" })[0]?.id`.
- **`<kamon-crest>` draws nothing, and the console is quiet.** The tag is not registered. Import `@johnmorrisdotca/kamon-crests/element/define`, or add the script tag. The `/element` entry alone does not register it.
- **`<kamon-crest>` draws nothing, and the console has a warning.** The tag is `crest="…"`, not `id`. Check the console for `no crest for the id`.
- **`<kamon-crest>` is very small.** Left without `size`, it is `1em`, the size of the text round it. Give it `size="96"`, or set a size in CSS.
- **`animate` does nothing.** The reader may have asked for less motion: then the finished crest is shown at once. A crest that is still being redrawn (`redrawing` in its record) has no steps, and is always shown finished.
- **A call throws a `TypeError`.** The id or an option was not a string, or a colour was not a plain CSS colour: letters, digits, `#`, `.`, `%`, `,`, `(`, `)`, `-` and spaces only.
- **Two animated crests on a page change each other.** Give each its own `id` option in `animatedSvg(construction, { id })`; the element does this by itself.
