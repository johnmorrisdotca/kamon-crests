import { readFileSync, readdirSync } from "node:fs";
import { beforeAll, describe, expect, it } from "vitest";

import { Builder } from "../scripts/construct/builder.ts";
import { make } from "../scripts/construct/make.ts";
import { ALL } from "../scripts/crests/index.ts";
import { berry } from "../scripts/crests/library/berry.ts";
import { branchTaper } from "../scripts/crests/library/branch-taper.ts";
import { layerParts } from "../scripts/crests/library/layers.ts";
import { leafLens } from "../scripts/crests/library/leaf-lens.ts";
import { describePartsLibrary, loadPartsLibrary } from "../scripts/parts-library.ts";
import type { CrestPartUsage } from "../scripts/parts-library.ts";

describe("the geometric parts library", () => {
  const usage: CrestPartUsage[] = [];
  let parts: Awaited<ReturnType<typeof loadPartsLibrary>>;

  beforeAll(async () => {
    parts = await loadPartsLibrary();
    for (const crest of ALL) {
      make(crest, (ids) => {
        if (ids.size > 0) usage.push({ id: crest.id, name: crest.name, parts: ids });
      });
    }
  });

  it("gives every part a crest or a stock designation", () => {
    const known = new Set(parts.map(({ id }) => id));
    const used = new Set(usage.flatMap(({ parts: ids }) => [...ids]));

    expect(parts.length).toBeGreaterThan(0);
    for (const id of used) expect(known.has(id), id).toBe(true);
    for (const part of parts) expect(Boolean(part.stock) || used.has(part.id), part.id).toBe(true);
  });

  it("records a reused part once for each crest", () => {
    const captured: string[] = [];
    const drawing = make({
      ...ALL[0],
      build(c) {
        berry.build(c, [-8, 0], 0, 4, { motif: "nanten" });
        berry.build(c, [8, 0], 0, 4, { motif: "nanten" });
      },
    }, (ids) => captured.push(...ids));

    expect(drawing.shapes).toHaveLength(2);
    expect(captured).toEqual(["berry"]);
  });

  it("clears paper through the lower part and keeps the upper part whole", () => {
    const whole = new Builder();
    const layered = new Builder();
    whole.precision(3);
    layered.precision(3);
    leafLens.build(whole, [0, 0], 90, 65, { motif: "nanten" });
    layerParts(layered, () => {
      branchTaper.build(layered, [0, 0], 0, 130, { motif: "nanten", bend: 0 });
      leafLens.build(layered, [0, 0], 90, 65, { motif: "nanten", keyline: 1.15 });
    });

    expect(layered.shapes).toHaveLength(2);
    expect(layered.shapes[0].d.match(/[mM]/g)).toHaveLength(2);
    expect(layered.shapes[1].d).toBe(whole.shapes[0].d);
    expect(layered.guides.every(({ d }) => !/NaN|Infinity/.test(d))).toBe(true);
  });

  it("holds the paper width when a leaf or berry changes size", () => {
    for (const part of [leafLens, berry]) {
      for (const size of [32, 64]) {
        const c = new Builder();
        c.precision(3);
        part.build(c, [0, 0], 0, size, { motif: "nanten" });
        part.build(c, [0, 0], 0, size, { motif: "nanten", paper: 2.4 });

        expect(c.shapes[0].d).toMatch(/[aA ]0\.575 0\.575 /);
        expect(c.shapes[1].d).toMatch(/[aA ]1\.2 1\.2 /);
      }
    }
  });

  it("builds two blade halves when the midrib runs to both tips", () => {
    const c = new Builder();
    c.precision(3);
    leafLens.build(c, [0, 0], 0, 60, { motif: "nanten", midrib: "full", paper: 2 });

    expect(c.shapes[0].d.match(/[mM]/g)).toHaveLength(2);
    expect(c.shapes[0].d).not.toMatch(/[aA ]1 1 /);
    expect(c.shapes[0].d).toMatch(/[vV]/);
  });

  it("keeps the page and its drawings in sync with the library and its crests", () => {
    const { markdown, pictures } = describePartsLibrary(parts, usage);
    expect(readFileSync("docs/parts-library.md", "utf8")).toBe(markdown);
    expect(readdirSync("docs/parts-library").sort()).toEqual([...pictures.keys()].sort());
    for (const [file, svg] of pictures) {
      expect(svg, file).toMatch(/<path\b/);
      expect(svg, file).not.toMatch(/NaN|Infinity/);
      expect(readFileSync(`docs/parts-library/${file}`, "utf8"), file).toBe(svg);
    }
  });
});
