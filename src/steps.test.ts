// The construction animation: every crest has steps, the steps cover every part, and the last frame is the static drawing.
import { describe, expect, it } from "vitest";

import { tagsOf } from "../scripts/test-helpers";
import { CREST_IDS } from "./data/ids.data";
import { LOADERS, STEP_LOADERS } from "./data/loaders.data";
import { MANIFEST } from "./manifest";
import { stepCaption } from "./animate";
import { CREST_ELEMENT_ATTRIBUTES } from "./element";
import { animatedSvg, durationOf, staticSvg, stepSvg, stepsOf, stepTimes } from "./render";

const constructions = await Promise.all(CREST_IDS.map(async (id) => [id, (await STEP_LOADERS[id]()).default, (await LOADERS[id]()).default] as const));

describe("every crest's construction", () => {
  for (const [id, construction, svg] of constructions) {
    const record = MANIFEST.find((one) => one.id === id)!;

    it(`${id} has guides, shapes and ordered steps that draw each exactly once`, () => {
      expect(construction.guides.length, "guides").toBeGreaterThan(0);
      expect(construction.shapes.length, "shapes").toBeGreaterThan(0);
      expect(construction.steps.length, "steps").toBeGreaterThan(construction.guides.length);
      expect(construction.steps).toEqual(stepsOf(construction.guides, construction.shapes));
      const guides = construction.steps.flatMap((step) => (step.op === "guide" ? [step.guide] : []));
      expect(guides).toEqual(construction.guides.map((_, i) => i));
      const drawn = construction.steps.flatMap((step) => (step.op === "draw" || step.op === "turn" ? step.shapes : []));
      expect(drawn).toEqual(construction.shapes.map((_, i) => i));
      // First the guides, then the shapes, and the guides rubbed out last.
      const ops = construction.steps.map((step) => step.op);
      expect(ops[0]).toBe("guide");
      expect(ops[ops.length - 1]).toBe("fade");
      expect(ops.indexOf("draw")).toBeGreaterThan(ops.lastIndexOf("guide"));
      expect(ops.filter((op) => op === "fade")).toHaveLength(1);
    });

    it(`${id} turns only a unit already drawn`, () => {
      construction.steps.forEach((step, i) => {
        if (step.op === "draw") for (const index of step.shapes) expect(construction.shapes[index].turn).toBeUndefined();
        if (step.op !== "turn") return;
        expect(construction.steps[i - 1].op).toBe("draw");
        for (const index of step.shapes) expect(construction.shapes[index].turn).toBeTypeOf("number");
      });
    });

    it(`${id}'s steps cover every part of the crest, and no other`, () => {
      const parts = new Set(construction.steps.flatMap((step) => (step.op === "draw" ? [step.part] : [])));
      const wanted = new Set([...record.motifs.map((use) => use.motif), ...(record.frame === "none" ? [] : ["frame"])]);
      expect([...parts].sort()).toEqual([...wanted].sort());
      for (const step of construction.steps) if (step.op === "draw") for (const i of step.shapes) expect(construction.shapes[i].part).toBe(step.part);
    });

    it(`${id}'s last frame is its static drawing`, () => {
      // The finished crest is made of the construction's own shapes, in order, and is the module's SVG.
      expect(staticSvg(construction)).toBe(svg);
      const animated = animatedSvg(construction, { id: "t" });
      const paths = tagsOf(animated).filter((tag) => tag.name === "path");
      const shapes = paths.filter((tag) => tag.attributes.class?.match(/^t-s\d+/));
      expect(shapes.map((tag) => tag.attributes.d)).toEqual(construction.shapes.map((shape) => shape.d));
      expect(tagsOf(svg).filter((tag) => tag.name === "path").map((tag) => tag.attributes.d)).toEqual(shapes.map((tag) => tag.attributes.d));
      // Every shape's last keyframe is its finished look; every guide's is gone.
      construction.shapes.forEach((shape, i) => {
        const frames = animated.match(new RegExp(`@keyframes t-s${i}\\{(.*?)\\}\\}`))?.[1] ?? "";
        const last = frames.slice(frames.lastIndexOf("100%{"));
        if (shape.turn !== undefined) expect(frames).toContain(`transform:${shape.flip === true ? "scaleX(-1) " : ""}rotate(${Math.round(-shape.turn * 1000) / 1000}deg)`);
        if (shape.kind === "fill") expect(last).toBe("100%{fill-opacity:1;stroke-opacity:0;stroke-dashoffset:0");
        else expect(last).toBe("100%{stroke-opacity:1;stroke-dashoffset:0");
      });
      construction.guides.forEach((_, i) => {
        const frames = animated.match(new RegExp(`@keyframes t-g${i}\\{(.*?)\\}\\}`))?.[1] ?? "";
        expect(frames.slice(frames.lastIndexOf("100%{"))).toBe("100%{opacity:0;stroke-dashoffset:0");
      });
    });
  }
});

describe("a construction held at a step", () => {
  const icho = constructions.find(([id]) => id === "mitsu-icho")![1];
  const paths = (svg: string): string[] => tagsOf(svg).filter((tag) => tag.name === "path").map((tag) => tag.attributes.d);

  it("is the empty page before the first step, and the finished crest after the last", () => {
    for (const [, construction] of constructions) {
      expect(paths(stepSvg(construction, -1))).toEqual([]);
      expect(stepSvg(construction, construction.steps.length - 1)).toBe(staticSvg(construction));
      expect(stepSvg(construction, 999)).toBe(staticSvg(construction));
    }
  });

  it("shows every guide struck so far and every shape drawn or turned so far, and nothing else", () => {
    icho.steps.forEach((step, n) => {
      const svg = stepSvg(icho, n);
      const done = icho.steps.slice(0, n + 1);
      const guides = step.op === "fade" ? [] : done.flatMap((one) => (one.op === "guide" ? [icho.guides[one.guide].d] : []));
      const shapes = done.flatMap((one) => (one.op === "draw" || one.op === "turn" ? one.shapes.map((i) => icho.shapes[i].d) : []));
      expect(paths(svg)).toEqual([...guides, ...shapes]);
      expect(svg).not.toMatch(/<style|animation/);
    });
    const turn = icho.steps.findIndex((step) => step.op === "turn");
    expect(turn).toBeGreaterThan(0);
    expect(paths(stepSvg(icho, turn)).length - paths(stepSvg(icho, turn - 1)).length).toBe(2);
  });

  it("leaves the guides out when asked", () => {
    const last = icho.steps.findIndex((step) => step.op === "draw") - 1;
    expect(paths(stepSvg(icho, last)).length).toBe(icho.guides.length);
    expect(paths(stepSvg(icho, last, { guides: false }))).toEqual([]);
  });

  it("has a time for every step, in order, for the scrubber to go on from", () => {
    for (const [, construction] of constructions) {
      const times = stepTimes(construction);
      expect(times).toHaveLength(construction.steps.length);
      for (let i = 1; i < times.length; i += 1) expect(times[i]).toBeGreaterThan(times[i - 1]);
      expect(times[times.length - 1]).toBeLessThan(durationOf(construction));
    }
  });

  it("is held and sought by two custom properties that the animation leaves at play, from the start", () => {
    const svg = animatedSvg(icho, { id: "x" });
    const rule = '[class^="x-"]{animation-play-state:var(--kamon-play,running);animation-delay:var(--kamon-at,0s)}';
    expect(svg).toContain(rule);
    // After every shorthand, which would otherwise reset them.
    expect(svg.indexOf(rule)).toBeGreaterThan(svg.lastIndexOf("linear 1 both}"));
  });

  it("captions a turn in both languages, and the element takes controls", () => {
    const step = icho.steps.find((one) => one.op === "turn")!;
    expect(stepCaption(step, icho, "en")).toBe("Turn it to its other places");
    expect(stepCaption(step, icho, "ja")).toBe("できた形を回して、ほかの位置に写す");
    expect(CREST_ELEMENT_ATTRIBUTES).toContain("controls");
  });
});

describe("the animated SVG", () => {
  const [, aoi] = constructions[0];

  it("is pure SVG and CSS: one style element, no script, no link, no raster", () => {
    const svg = animatedSvg(aoi, { id: "x" });
    expect(svg.match(/<style>/g)).toHaveLength(1);
    expect(svg).not.toMatch(/<script|<image|href=|data:|<animate|<set\b|onload/i);
    expect(svg.startsWith('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"')).toBe(true);
  });

  it("shows the finished crest at once for a reader who asks for less motion, and by default before any animation", () => {
    const svg = animatedSvg(aoi, { id: "x" });
    expect(svg).toContain("@media (prefers-reduced-motion:reduce)");
    expect(svg).toContain("animation:none!important");
    // The base styles are the finished state: guides hidden, outlines hidden.
    expect(svg).toMatch(/\.x-g\{fill:none;stroke:currentColor;stroke-width:\.8;stroke-dasharray:1 1;opacity:0\}/);
    expect(svg).toMatch(/\.x-f\{stroke:currentColor;stroke-width:1\.1;stroke-opacity:0;stroke-dasharray:1 1\}/);
  });

  it("goes slower or faster with speed, and loops with loop", () => {
    const base = animatedSvg(aoi, { id: "x" });
    const quick = animatedSvg(aoi, { id: "x", speed: 2 });
    const seconds = (svg: string): number => Number(/animation:x-g0 ([\d.]+)s/.exec(svg)?.[1]);
    expect(seconds(quick)).toBeCloseTo(seconds(base) / 2, 1);
    expect(base).toContain("linear 1 both");
    const looping = animatedSvg(aoi, { id: "x", loop: true });
    expect(looping).toContain("linear infinite both");
    expect(seconds(looping)).toBeGreaterThan(seconds(base));
    expect(animatedSvg(aoi, { id: "x", speed: -3 })).toBe(base);
  });

  it("leaves the guides out when asked, and still ends on the finished crest", () => {
    const svg = animatedSvg(aoi, { id: "x", guides: false });
    expect(svg).not.toContain("x-g0");
    expect(svg).toContain("x-s0");
  });

  it("keeps the styles of two drawings apart by their id, and cleans the id", () => {
    const a = animatedSvg(aoi, { id: "a" });
    const b = animatedSvg(aoi, { id: "b" });
    expect(a).toContain(".a-s0");
    expect(b).not.toContain(".a-s0");
    const dirty = animatedSvg(aoi, { id: 'x"><script>' });
    expect(dirty).not.toContain("<script");
    expect(dirty).toContain(".xscript-s0");
  });

  it("takes a few seconds at the usual pace, longer for a crest with more to draw", () => {
    for (const [, construction] of constructions) {
      const seconds = durationOf(construction);
      expect(seconds).toBeGreaterThan(2);
      expect(seconds).toBeLessThan(25);
    }
    const small = constructions.find(([id]) => id === "janome")![1];
    const large = constructions.find(([id]) => id === "mitsuba-aoi")![1];
    expect(durationOf(large)).toBeGreaterThan(durationOf(small));
  });
});
