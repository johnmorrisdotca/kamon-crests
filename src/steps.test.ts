// The construction animation: every crest has steps, the steps cover every part, and the last frame is the static drawing.
import { describe, expect, it } from "vitest";

import { tagsOf } from "../scripts/test-helpers";
import { CREST_IDS } from "./data/ids.data";
import { LOADERS, STEP_LOADERS } from "./data/loaders.data";
import { MANIFEST } from "./manifest";
import { stepCaption } from "./animate";
import { CREST_ELEMENT_ATTRIBUTES } from "./element";
import { animatedSvg, durationOf, staticSvg, stepSvg, stepsOf, stepTimes } from "./render";

/** Whether a guide is a circle about the crest's centre (a circle is written from its top). */
const aboutCentre = (d: string): boolean => {
  const top = /^M100 ([\d.]+)a([\d.]+) /.exec(d);

  return top !== null && Math.abs(Number(top[1]) + Number(top[2]) - 100) < 0.01;
};

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
      // A crest of ruled lines only has no circle to strike first.
      expect(["centres", "trace"]).toContain(ops[0]);
      expect(ops[ops.length - 1]).toBe("fade");
      expect(ops.indexOf("draw")).toBeGreaterThan(ops.lastIndexOf("guide"));
      expect(ops.filter((op) => op === "fade")).toHaveLength(1);
    });

    it(`${id} goes by the six phases: the underdrawing by compass width, the trace, the thickening, the ruled lines, the fill, the finish`, () => {
      const phase = construction.steps.map((step) =>
        step.op === "centres" ? 1 : step.op === "guide" ? (construction.guides[step.guide].type === "circle" ? 1 : 4) : step.op === "trace" ? 2 : step.op === "thicken" ? 3 : step.op === "fade" ? 6 : 5,
      );
      expect(phase).toEqual([...phase].sort((a, b) => a - b));
      // Every circle says its centre and its width's number; the widths are numbered from 1, the smallest first, with none left out.
      const circles = construction.guides.filter((guide) => guide.type === "circle");
      const radius = (d: string): number => Number(/a([\d.]+) /.exec(d)![1]);
      const widths = [...new Set(circles.map((guide) => radius(guide.d)))].sort((a, b) => a - b);
      for (const guide of circles) {
        expect(guide.width).toBe(widths.indexOf(radius(guide.d)) + 1);
        const top = /^M(-?[\d.]+) ?(-?[\d.]+)a/.exec(guide.d)!;
        expect(guide.at![0]).toBeCloseTo(Number(top[1]), 1);
        expect(guide.at![1]).toBeCloseTo(Number(top[2]) + radius(guide.d), 1);
      }
      // The centres of a circle are marked, once, in a step before it is struck, with the others of its part and width.
      const marked = construction.steps.flatMap((step) => (step.op === "centres" ? step.guides : []));
      expect([...marked].sort((a, b) => a - b)).toEqual(construction.guides.flatMap((guide, i) => (guide.type === "circle" ? [i] : [])));
      construction.steps.forEach((step, i) => {
        if (step.op !== "centres") return;
        expect(new Set(step.guides.map((k) => `${construction.guides[k].part} ${construction.guides[k].width}`)).size).toBe(1);
        expect(construction.steps.slice(i + 1, i + 1 + step.guides.length)).toEqual(step.guides.map((guide) => ({ op: "guide", guide })));
      });
      // Each shape of the unit is traced once and thickened once before it is filled; a shape built at another place is not.
      const unit = construction.shapes.flatMap((shape, i) => (shape.turn === undefined ? [i] : []));
      expect(construction.steps.flatMap((step) => (step.op === "trace" ? step.shapes : []))).toEqual(unit);
      expect(construction.steps.flatMap((step) => (step.op === "thicken" ? step.shapes : []))).toEqual(unit);
      // The captions name the phase, in both languages.
      const said = (lang: "en" | "ja"): string[] => construction.steps.map((step) => stepCaption(step, construction, lang));
      phase.forEach((n, i) => {
        expect(said("en")[i]).toMatch([/^Underdrawing: /, /^Trace only what is needed: /, /^Thicken the outline$/, /^Rule the straight lines with the ruler$/, /^(Fill the |Build )/, /^Finished: /][n - 1]);
        expect(said("ja")[i]).toMatch([/^下書き：/, /^必要な部分だけなぞる：/, /^線を太くする$/, /^定規で直線を引く$/, /^(色を塗る：|反対側にも|ほかの位置にも)/, /^仕上げ：/][n - 1]);
      });
      for (const guide of circles) expect(said("en")).toContain(guide.gap === true ? `Underdrawing: strike the gap circles, where one piece passes under another (compass at width ${guide.width}, its point on ${guide.width})` : `Underdrawing: set the compass to width ${guide.width}, put its point on ${guide.width}, strike the circle`);
    });

    it(`${id} turns only a unit already drawn`, () => {
      construction.steps.forEach((step, i) => {
        if (step.op === "draw") for (const index of step.shapes) expect(construction.shapes[index].turn).toBeUndefined();
        if (step.op !== "turn") return;
        expect(construction.steps[i - 1].op).toBe("draw");
        for (const index of step.shapes) expect(construction.shapes[index].turn).toBeTypeOf("number");
      });
    });

    it(`${id}'s turns go round clockwise from the unit, one place at a time: its guides struck, then its shapes inked`, () => {
      const svg = animatedSvg(construction, { id: "t" });
      // Nothing moves: no style turns, flips or slides anything, and the only transform is the one that stands a place's guides there.
      expect(/<style>(.*?)<\/style>/.exec(svg)![1]).not.toMatch(/transform|rotate|translate|scale|offset-path/);
      for (const tag of tagsOf(svg)) if (tag.name !== "g") expect(tag.attributes.transform).toBeUndefined();
      // The percentages of a set of keyframes, in order: for a shape, 0, the start of its outline, its end, the fill done, 100.
      const frames = (name: string): number[] => [...(new RegExp(`@keyframes t-${name}\\{(.*?)\\}\\}`).exec(svg)?.[1] ?? "").matchAll(/(?:^|\})([\d.]+)%\{/g)].map((match) => Number(match[1]));
      const groups = tagsOf(svg).flatMap((tag, i, tags) => (tag.name === "g" && tag.attributes.transform !== undefined ? [{ transform: tag.attributes.transform, name: /^t-(p\d+) /.exec(tags[i + 1].attributes.class)![1] }] : []));
      let group = 0;
      for (const step of construction.steps) {
        if (step.op !== "turn") continue;
        const places = new Map<string, { turn: number; transform: string; start: number; end: number }>();
        for (const index of step.shapes) {
          const shape = construction.shapes[index];
          const all = frames(`s${index}`);
          const [start, end] = [all[1], all[all.length - 2]];
          const key = `${shape.part} ${shape.turn} ${shape.flip}`;
          const place = places.get(key) ?? { turn: ((shape.turn! % 360) + 360) % 360, transform: `rotate(${shape.turn} 100 100)${shape.flip === true ? " matrix(-1 0 0 1 200 0)" : ""}`, start, end };
          // The shapes of one place are inked together.
          expect([start, end]).toEqual([place.start, place.end]);
          places.set(key, place);
        }
        const round = [...places.values()].sort((a, b) => a.start - b.start);
        round.forEach((place, k) => {
          expect(place.end).toBeGreaterThan(place.start);
          if (k === 0) return;
          // The next place is further round, and nothing of it begins before the place before is done.
          expect(place.turn).toBeGreaterThanOrEqual(round[k - 1].turn);
          expect(place.start).toBeGreaterThan(round[k - 1].end - 0.002);
        });
        // A place's own guides, where it has any, are struck there after the place before is done and before its shapes are inked.
        const own = construction.guides.some((guide) => guide.part === construction.shapes[step.shapes[0]].part && !aboutCentre(guide.d));
        round.forEach((place, k) => {
          if (!own) return;
          const struck = groups[group++];
          expect(struck.transform).toBe(place.transform);
          const [, from, to] = frames(struck.name);
          expect(to).toBeLessThanOrEqual(place.start + 0.002);
          if (k > 0) expect(from).toBeGreaterThan(round[k - 1].end - 0.002);
        });
      }
      expect(group).toBe(groups.length);
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
  // The ginkgo's own guides, but for the circles about the centre, which a turn leaves where they are.
  const own = icho.guides.filter((guide) => !aboutCentre(guide.d)).map((guide) => guide.d);

  it("is the empty page before the first step, and the finished crest after the last", () => {
    for (const [, construction] of constructions) {
      expect(paths(stepSvg(construction, -1))).toEqual([]);
      expect(stepSvg(construction, construction.steps.length - 1)).toBe(staticSvg(construction));
      expect(stepSvg(construction, 999)).toBe(staticSvg(construction));
    }
  });

  it("shows every guide struck so far, each shape as far as it has come (traced, thickened, filled), and nothing else", () => {
    icho.steps.forEach((step, n) => {
      const svg = stepSvg(icho, n);
      const done = icho.steps.slice(0, n + 1);
      const guides = step.op === "fade" ? [] : done.flatMap((one) => (one.op === "guide" ? [icho.guides[one.guide].d] : []));
      const touched = new Set(done.flatMap((one) => (one.op === "trace" || one.op === "thicken" || one.op === "draw" || one.op === "turn" ? one.shapes : [])));
      const shapes = icho.shapes.flatMap((shape, i) => (touched.has(i) ? [shape.d] : []));
      // After the turn, every other leaf's circles and lines are struck at its place too.
      const placed = step.op === "turn" ? [...own, ...own] : [];
      expect(paths(svg)).toEqual([...guides, ...placed, ...shapes]);
      expect(svg).not.toMatch(/<style|animation/);
    });
    const at = (op: string): number => icho.steps.findIndex((step) => step.op === op);
    const leaf = (n: number): string => tagsOf(stepSvg(icho, n)).filter((tag) => tag.attributes.d === icho.shapes[0].d).map((tag) => `${tag.attributes.fill} ${tag.attributes["stroke-width"]}`).join();
    expect(leaf(at("trace") - 1)).toBe("");
    expect(leaf(at("trace"))).toBe("none .5");
    expect(leaf(at("thicken"))).toBe("none 1.3");
    expect(leaf(at("draw"))).toBe("undefined undefined");
    const turn = at("turn");
    expect(paths(stepSvg(icho, turn)).length - paths(stepSvg(icho, turn - 1)).length).toBe(2 + 2 * own.length);
    expect(stepSvg(icho, turn)).toContain('<g transform="rotate(-120 100 100)">');
    expect(stepSvg(icho, turn)).toContain('<g transform="rotate(120 100 100)">');
  });

  it("marks the centres with a dot and the compass width's number, each on its own switch, and draws line art with the fill off", () => {
    const first = icho.steps.findIndex((step) => step.op === "centres");
    const marks = (svg: string): string[] => tagsOf(svg).filter((tag) => tag.name === "circle" || tag.name === "text").map((tag) => tag.name);
    const n = (icho.steps[first] as { guides: number[] }).guides.length;
    expect(marks(stepSvg(icho, first))).toEqual(Array.from({ length: n }, () => ["circle", "text"]).flat());
    expect(stepSvg(icho, first)).toContain(`font-family="sans-serif">${icho.guides[0].width}</text>`);
    expect(marks(stepSvg(icho, first, { centres: false }))).toEqual(Array.from({ length: n }, () => "text"));
    expect(marks(stepSvg(icho, first, { widths: false }))).toEqual(Array.from({ length: n }, () => "circle"));
    expect(marks(stepSvg(icho, first, { guides: false }))).toEqual([]);
    expect(marks(stepSvg(icho, 999))).toEqual([]);
    // Line art: the same paths, the shapes' own arcs and lines, unfilled; and the finished crest the same way.
    const art = stepSvg(icho, 999, { fill: false });
    expect(paths(art)).toEqual(icho.shapes.map((shape) => shape.d));
    expect(tagsOf(art).filter((tag) => tag.name === "path").every((tag) => tag.attributes.fill === "none" && tag.attributes["stroke-width"] === ".6")).toBe(true);
    expect(staticSvg(icho, { fill: false })).toBe(art);
    // The animation carries the same marks, and the three switches as rules an attribute on the element turns on.
    const svg = animatedSvg(icho, { id: "t" });
    expect(tagsOf(svg).filter((tag) => tag.name === "circle")).toHaveLength(icho.guides.filter((guide) => guide.type === "circle").length);
    expect(svg).toContain("[centres=off] .t-c{display:none}[widths=off] .t-w{display:none}[fill=off] .t-f{fill:none!important;stroke-opacity:1!important;stroke-width:.6!important}");
    expect(animatedSvg(icho, { id: "t", centres: false, widths: false, fill: false })).toContain("}.t-c{display:none}.t-w{display:none}.t-f{fill:none!important;");
  });

  it("strikes the unit's guides at each other place in the animation, clockwise, before the unit is inked there", () => {
    const svg = animatedSvg(icho, { id: "t" });
    const placed = tagsOf(svg).filter((tag) => /^t-p\d+ t-g$/.test(tag.attributes.class ?? ""));
    expect(placed.map((tag) => tag.attributes.d)).toEqual([...own, ...own]);
    // A third of a turn clockwise first, then two thirds (written -120).
    expect(svg.indexOf('<g transform="rotate(120 100 100)"><path class="t-p0 ')).toBeGreaterThan(0);
    expect(svg.indexOf('<g transform="rotate(-120 100 100)"><path class="t-p1 ')).toBeGreaterThan(0);
    expect(svg).not.toContain("transform:");
    // A mirrored unit's guides are flipped over with it.
    const aoi = constructions.find(([id]) => id === "mitsuba-aoi")![1];
    expect(animatedSvg(aoi, { id: "t" })).toContain("matrix(-1 0 0 1 200 0)");
    // With the guides off there are none.
    expect(animatedSvg(icho, { id: "t", guides: false })).not.toContain("t-p0");
  });

  it("leaves the guides out when asked", () => {
    const last = icho.steps.findIndex((step) => step.op === "trace") - 1;
    expect(paths(stepSvg(icho, last)).length).toBe(icho.guides.filter((guide) => guide.type === "circle").length);
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
    expect(stepCaption(step, icho, "en")).toBe("Build it at each other place, clockwise: the same circles and lines, then the ink");
    expect(stepCaption(step, icho, "ja")).toBe("ほかの位置にも時計回りに一つずつ、同じ円と線を描いて作る");
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
