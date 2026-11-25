---
title: Architecture
section: concept
order: 8
description: How a crest is written, built and loaded.
---

A crest is a definition in `scripts/crests/`: its names, its parts, its houses, and a `build` function that strikes guides and draws shapes with the helpers in `scripts/construct/`. `pnpm data` runs every definition and writes, for each crest, `src/crests/<id>.ts` (its SVG), `src/steps/<id>.ts` (its construction, and its line of text about how it is set out, which is kept off the records so that the manifest stays small), and the tables `src/data/*.data.ts` (ids, names, loaders, records), plus `docs/catalogue.md`, `docs/sizes.md` and `docs/strings-ja.md`. tsup builds each as an entry of its own, so a crest's file carries only its picture.

The runtime is small: `index` (ids and helpers), `load` (a crest by its id, dynamic imports), `manifest`, `parts`, `search`, `animate` (the construction animation, from `render.ts`, which also writes the static SVG so that the two cannot differ), `names`, and the element. Every function is pure and works on strings.
