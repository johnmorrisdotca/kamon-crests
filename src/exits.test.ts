import { describe, expect, it } from "vitest";
import { EXIT_NAMES } from "./element";
import { animatedSvg, durationOf, EXITS, loopSeconds } from "./render";
import ringed from "./steps/maru-ni-mitsu-gashiwa";

describe("the exits a looping crest can take", () => {
  it("are the same six in /animate and in the element", () => {
    expect([...EXIT_NAMES]).toEqual([...EXITS]);
  });

  it("hold the finished crest two seconds, go in about a second, and leave the page empty a moment before it is drawn again", () => {
    expect(loopSeconds(ringed, true) - durationOf(ringed)).toBeCloseTo(3.5, 5);
    expect(loopSeconds(ringed, false) - durationOf(ringed)).toBeCloseTo(1.4, 5);
  });

  it("put each part in a group of its own, all of them in the shutter's group, with the chosen exit on the drawing", () => {
    const svg = animatedSvg(ringed, { id: "t", loop: true, exit: "scatter" });
    expect(svg).toContain('data-exit="scatter"');
    expect(svg).toContain('<g class="t-xc">');
    // The ring and the three leaves: four parts, each moved as one.
    expect(svg.match(/<g class="t-x t-x\d+">/g)?.length).toBe(4);
    for (const name of EXITS) expect(svg).toContain(`[data-exit=${name}]`);
  });

  it("leave a crest that does not loop, or loops with no exit, as it was", () => {
    for (const options of [{ exit: "fade" as const }, { loop: true }, { loop: true, exit: false }]) {
      const svg = animatedSvg(ringed, { id: "t", ...options });
      expect(svg).not.toContain("data-exit");
      expect(svg).not.toContain("t-xc");
    }
  });

  it("always shows the finished crest to a reader who asks for less motion", () => {
    const svg = animatedSvg(ringed, { id: "t", loop: true, exit: true });
    expect(svg).toMatch(/@media \(prefers-reduced-motion:reduce\)\{\[class\^="t-"\]\{animation:none!important\}\}/);
  });
});
