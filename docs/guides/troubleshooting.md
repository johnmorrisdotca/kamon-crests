---
title: Troubleshooting
section: how-to
order: 9
description: A crest that is black, missing, or not moving.
---

- **The crest is black in an `<img>`.** An image cannot see the page's text colour. Pass `color`: `crestDataUri(id, { color })`.
- **`crest()` returns `null`.** The id is not one. A clan or a name is a search: `findCrests({ text: "Tokugawa" })[0]?.id`.
- **`<kamon-crest>` draws nothing.** The tag is `crest="…"`, not `id`. Check the console for `no crest for the id`.
- **`animate` does nothing.** The reader may have asked for less motion: then the finished crest is shown at once.
- **Two animated crests on a page change each other.** Give each its own `id` option in `animatedSvg(construction, { id })`; the element does this by itself.
