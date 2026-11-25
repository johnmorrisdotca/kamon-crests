// What a page pays for each entry, measured on the built files (pnpm check builds before it tests): the main entry carries no
// crest, each crest is its own small file, and the crests over the budget are the ones docs/sizes.md lists.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { BUDGET_BYTES, CEILING_BYTES } from "../scripts/data-config";
import { MANIFEST } from "./manifest";

const KB = 1024;
const size = (path: string): number => {
  if (!existsSync(path)) throw new Error(`${path} is not built: run pnpm build first (pnpm check does)`);

  return statSync(path).size;
};

describe("the built entries", () => {
  it("keep the main entry under 6 KB, /load under 3.5 KB and 140 bytes a crest, the element under 14 KB and the controls it loads when wanted under 6 KB, /animate (with a part shown alone, the six phases, the centre marks, the compass arm, the stepped marks, the switches, the widths key, the pen's ink, every place built in full, the flash before the fade and the widths key as a ruler) under 38 KB, and /names under 0.5 KB and 72 bytes a crest, with no crest in any of the first four", () => {
    expect(size("dist/index.js")).toBeLessThan(6 * KB);
    // /load is the table of every crest's two loaders: it may grow with the crests, and by no more than a crest's two lines.
    expect(size("dist/load.js")).toBeLessThan(3.5 * KB + 140 * MANIFEST.length);
    expect(size("dist/element.js")).toBeLessThan(14 * KB);
    expect(size("dist/element-controls.js")).toBeLessThan(6 * KB);
    expect(size("dist/animate.js")).toBeLessThan(38 * KB);
    // /names is the table of every crest's two names: it too grows with the crests, and by no more than a crest's id and names.
    expect(size("dist/names.js")).toBeLessThan(0.5 * KB + 72 * MANIFEST.length);
    for (const file of ["dist/index.js", "dist/load.js", "dist/element.js", "dist/element-controls.js"]) expect(readFileSync(file, "utf8"), file).not.toContain("<path");
  });

  it("make each crest's module its SVG and a line, no larger than the ceiling", () => {
    const files = readdirSync("dist/crests").filter((file) => file.endsWith(".js"));
    expect(files).toHaveLength(MANIFEST.length);
    for (const record of MANIFEST) {
      const bytes = size(`dist/crests/${record.id}.js`);
      expect(bytes, record.id).toBeLessThan(record.bytes + 200);
      expect(record.bytes, record.id).toBeLessThan(CEILING_BYTES);
    }
  });

  it("give each crest's SVG file the same bytes as its record says", () => {
    for (const record of MANIFEST) expect(size(`dist/svg/${record.id}.svg`), record.id).toBe(record.bytes + 1);
  });

  it("list in docs/sizes.md exactly the crests over the budget", () => {
    const doc = readFileSync("docs/sizes.md", "utf8");
    const listed = [...doc.matchAll(/^\| `([a-z0-9-]+)` \|/gm)].map((match) => match[1]).sort();
    const over = MANIFEST.filter((record) => record.bytes > BUDGET_BYTES).map((record) => record.id).sort();
    expect(listed).toEqual(over);
  });

  it("keep the whole manifest under 4 KB and 800 bytes a crest, and a crest's steps module (its construction and its text) under 50 KB", () => {
    // The records carry no construction text: it loads with the steps. Measured at about 775 bytes a crest.
    expect(size("dist/manifest.js")).toBeLessThan(4 * KB + 800 * MANIFEST.length);
    for (const record of MANIFEST) expect(size(`dist/steps/${record.id}.js`), record.id).toBeLessThan(50 * KB);
  });
});
