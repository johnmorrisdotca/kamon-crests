// The people who helped, and the samurai page's list: the README says what scripts/contributors.mjs says, every crest a contributor
// or a samurai names is a crest of the package, and every samurai has a source.
import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { CONTRIBUTORS, README_END, README_START, readmeSection } from "../scripts/contributors.mjs";
import { SAMURAI } from "../scripts/samurai.mjs";
import { MANIFEST } from "./manifest";

const ids = new Set(MANIFEST.map((record) => record.id));

describe("the people who helped", () => {
  it("are listed in the README as scripts/contributors.mjs has them (run `pnpm contributors`)", () => {
    const readme = readFileSync("README.md", "utf8");
    expect(readme.slice(readme.indexOf(README_START), readme.indexOf(README_END) + README_END.length)).toBe(readmeSection());
  });

  it("name crests the package has, each crest once, with a GitHub name", () => {
    const seen = CONTRIBUTORS.flatMap((one) => one.crests);
    for (const id of seen) expect(ids.has(id), id).toBe(true);
    expect(new Set(seen).size).toBe(seen.length);
    for (const one of CONTRIBUTORS) expect(one.github).toMatch(/^[A-Za-z0-9-]{1,39}$/);
  });
});

describe("the samurai", () => {
  it("each name crests the package has, or crests still to draw, in both languages, with a source", () => {
    expect(SAMURAI.length).toBeGreaterThanOrEqual(12);
    expect(new Set(SAMURAI.map((one) => one.id)).size).toBe(SAMURAI.length);
    for (const one of SAMURAI) {
      for (const id of one.crests) expect(ids.has(id), `${one.id}: ${id}`).toBe(true);
      expect(one.crests.length + (one.wanted?.length ?? 0), one.id).toBeGreaterThan(0);
      expect(one.ja).toMatch(/[぀-ヿ㐀-鿿]/);
      expect(one.line.ja).toMatch(/[぀-ヿ㐀-鿿]/);
      expect(one.line.en.length).toBeGreaterThan(10);
      expect(one.source).toMatch(/^https:\/\/en\.wikipedia\.org\/wiki\//);
    }
  });
});
