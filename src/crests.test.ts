// Every crest renders: its module is a valid SVG, with paths and nothing else, no raster, and inside its page.
import { describe, expect, it } from "vitest";

import { boundsOf, tagsOf } from "../scripts/test-helpers";
import { CREST_IDS } from "./data/ids.data";
import { LOADERS } from "./data/loaders.data";

const modules = await Promise.all(CREST_IDS.map(async (id) => [id, (await LOADERS[id]()).default] as const));

describe("every crest's SVG", () => {
  it("has a module for each id, and no more", () => {
    expect(modules).toHaveLength(CREST_IDS.length);
    expect(new Set(CREST_IDS).size).toBe(CREST_IDS.length);
    expect(Object.keys(LOADERS).sort()).toEqual([...CREST_IDS].sort());
  });

  for (const [id, svg] of modules) {
    it(`${id} is a valid SVG of paths on a 200 by 200 page`, () => {
      const tags = tagsOf(svg);
      expect(tags[0].name).toBe("svg");
      expect(tags[0].attributes.xmlns).toBe("http://www.w3.org/2000/svg");
      expect(tags[0].attributes.viewBox).toBe("0 0 200 200");
      expect(tags[0].attributes.fill).toBe("currentColor");
      const inside = tags.slice(1);
      expect(inside.length).toBeGreaterThan(0);
      for (const tag of inside) {
        expect(tag.name, `${id} has a ${tag.name}`).toBe("path");
        expect(Object.keys(tag.attributes).sort().every((name) => ["d", "fill", "fill-rule", "stroke", "stroke-width", "stroke-linecap"].includes(name))).toBe(true);
        expect(tag.attributes.d).toMatch(/^M[-\d.]/);
        const box = boundsOf(tag.attributes.d);
        const reach = tag.attributes.stroke === undefined ? 0 : Number(tag.attributes["stroke-width"]) / 2;
        expect(box.points).toBeGreaterThanOrEqual(2);
        expect(box.x0 - reach, `${id} leaves its page on the left`).toBeGreaterThanOrEqual(-1);
        expect(box.y0 - reach, `${id} leaves its page at the top`).toBeGreaterThanOrEqual(-1);
        expect(box.x1 + reach, `${id} leaves its page on the right`).toBeLessThanOrEqual(201);
        expect(box.y1 + reach, `${id} leaves its page at the bottom`).toBeLessThanOrEqual(201);
      }
    });

    it(`${id} has no raster, no script, no link and no foreign content`, () => {
      expect(svg).not.toMatch(/<image|<script|<foreignObject|<use\b|href=|data:|base64|<style|<mask|<clipPath|<filter|<linearGradient|<radialGradient|onload|javascript:/i);
      expect(svg.startsWith("<svg ")).toBe(true);
      expect(svg.endsWith("</svg>")).toBe(true);
    });
  }

  it("draws a crest in the text colour only, so a page can paint any of them", () => {
    for (const [id, svg] of modules) expect(svg.match(/#[0-9a-f]{3,6}\b|rgb\(/gi), id).toBeNull();
  });
});
