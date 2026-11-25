// Before the guides are rubbed out they flash: they brighten for a moment, at their own width, so the eye sees what is about
// to go, and only then fade. The widths key goes with them, after the flash.
import { describe, expect, it } from "vitest";

import { CREST_IDS } from "./data/ids.data";
import { STEP_LOADERS } from "./data/loaders.data";
import { animatedSvg, durationOf } from "./render";

const every = await Promise.all(CREST_IDS.map(async (id) => [id, (await STEP_LOADERS[id]()).default] as const));
const constructions = every.filter(([, construction]) => construction.redrawing !== true && construction.guides.length > 0);
/** A keyframes block's stops as [percent, declarations]. */
const stopsOf = (svg: string, name: RegExp): [number, string][][] =>
  [...svg.matchAll(new RegExp(`@keyframes [\\w-]+-${name.source}\\{(.*?\\})\\}`, "g"))].map((block) => [...block[1].matchAll(/([\d.]+)%(?:,[\d.]+%)*\{([^}]*)\}/g)].map((stop) => [Number(stop[1]), stop[2]] as [number, string]));

describe("the guides flash before they fade", () => {
  it.each(constructions)("%s: the guides brighten at their own width, then fade", (_, construction) => {
    const svg = animatedSvg(construction, { widthsKey: true });
    const guides = stopsOf(svg, /g\d+/);
    expect(guides.length).toBeGreaterThan(0);
    for (const stops of guides) {
      // Never wider: no guide's width changes.
      expect(stops.some(([, style]) => style.includes("stroke-width"))).toBe(false);
      expect(stops[stops.length - 1][1]).toContain("opacity:0");
    }
    // The group of guides, faint while they are struck, is brighter for the flash, short of full strength.
    const [group] = stopsOf(svg, /gs/);
    expect(group[0][1]).toContain("opacity:.55");
    expect(group.some(([, style]) => style === "opacity:.85")).toBe(true);
    expect(svg).toMatch(/<g class="[\w-]+-gs" opacity=".55">/);
  });

  it("rubbing out, the flash and its gap included, takes about a second", () => {
    const [, construction] = constructions.find(([id]) => id === "janome")!;
    const withoutGuides = { ...construction, steps: construction.steps.filter((step) => step.op !== "fade") };
    const added = durationOf(construction) - durationOf(withoutGuides);
    expect(added).toBeGreaterThan(0.9);
    expect(added).toBeLessThan(1.3);
  });

  it("with the guides off there is nothing to flash", () => {
    const [, construction] = constructions.find(([id]) => id === "janome")!;
    expect(animatedSvg(construction, { guides: false })).not.toMatch(/-gs\{/);
  });
});
