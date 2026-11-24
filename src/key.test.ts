// The widths key, the pen's ink and the places built in full: three switches of the animation, each one that changes how the
// construction is shown and never what it draws. Every crest's finished drawing is the same with each of them on and off.
import { describe, expect, it } from "vitest";

import { tagsOf } from "../scripts/test-helpers";
import { CREST_IDS } from "./data/ids.data";
import { STEP_LOADERS } from "./data/loaders.data";
import { stepCaption } from "./animate";
import { animatedSvg as drawnSvg, durationOf, fullBuilt, staticSvg, stepSvg as shownSvg, stepTimes } from "./render";
import type { Construction } from "./render";

// The widths key and the pen's ink are off unless asked for (the first test of each says so); these have them on, as the demo does, unless a test says otherwise.
const ON = { widthsKey: true, inkDraw: true } as const;
const animatedSvg = (construction: Parameters<typeof drawnSvg>[0], options: Parameters<typeof drawnSvg>[1] = {}): string => drawnSvg(construction, { ...ON, ...options });
const stepSvg = (construction: Parameters<typeof shownSvg>[0], step: number, options: Parameters<typeof shownSvg>[2] = {}): string => shownSvg(construction, step, { ...ON, ...options });
/** The seconds with the pen's ink drawn. */
const inked = (construction: Construction): number => durationOf({ ...construction, inkDraw: true });

const every = await Promise.all(CREST_IDS.map(async (id) => [id, (await STEP_LOADERS[id]()).default] as const));
const constructions = every.filter(([, construction]) => construction.redrawing !== true);
const by = Object.fromEntries(constructions);
const radius = (d: string): number => Number(/a([\d.]+)/.exec(d)![1]);
const KEY = '<g fill="currentColor" stroke="currentColor" font-size="5" font-family="sans-serif" stroke-width=".8" font-weight="bold">';
/** The key of a still step: its one row's number and line length, or none. */
const keyOf = (svg: string): { width: number; length: number }[] => {
  const key = svg.includes(KEY) ? svg.slice(svg.indexOf(KEY)) : "";

  return [...key.matchAll(/<path fill="none" d="M-?[\d.]+ -?[\d.]+h([\d.]+)m0-1\.6v3\.2"\/><circle[^>]*\/><text[^>]*>(\d+)<\/text>/g)].map((row) => ({ width: Number(row[2]), length: Number(row[1]) }));
};
const withoutKey = (svg: string): string => (svg.includes(KEY) ? `${svg.slice(0, svg.indexOf(KEY))}</svg>` : svg).replace(/viewBox="[^"]*"/, 'viewBox="0 0 200 200"');
const widthsOf = (construction: Construction): [number, number][] => {
  const found = new Map<number, number>();
  for (const guide of construction.guides) if (guide.type === "circle") found.set(guide.width!, radius(guide.d));

  return [...found].sort((a, b) => a[0] - b[0]);
};

describe("the widths key", () => {
  it("is off unless asked for: the box is the crest's square, and the library's output is what it was", () => {
    for (const [, construction] of constructions) {
      expect(drawnSvg(construction, { id: "t" })).toBe(drawnSvg(construction, { id: "t", widthsKey: false }));
      expect(drawnSvg(construction, { id: "t" })).toContain('viewBox="0 0 200 200"');
      expect(shownSvg(construction, 3)).toBe(shownSvg(construction, 3, { widthsKey: false }));
      expect(shownSvg(construction, 3)).not.toContain('stroke="none"');
      expect(shownSvg(construction, 3, { widthsKey: true })).toBe(shownSvg(construction, 3, { widthsKey: "right" }));
    }
  });

  for (const [id, construction] of constructions) {
    it(`${id} shows one row, the width the compass is set to, as long as its radius, in a box that never changes size`, () => {
      const widths = new Map(widthsOf(construction));
      expect(widths.size).toBeGreaterThan(0);
      const boxes = new Set<string>();
      construction.steps.forEach((step, n) => {
        const svg = stepSvg(construction, n);
        const rows = keyOf(svg);
        boxes.add(/viewBox="([^"]*)"/.exec(svg)![1]);
        // The finished crest, once the guides are rubbed out, has no key and is the static drawing, in the same box.
        if (step.op === "fade") return expect(withoutKey(svg)).toBe(staticSvg(construction));
        // The crest's own drawing is the same with the key off: only the view box and the key are added.
        expect(withoutKey(svg)).toBe(stepSvg(construction, n, { widthsKey: false }));
        // The row: the last circle struck so far, or whose centres were just marked; none before the first.
        const set = construction.steps
          .slice(0, n + 1)
          .flatMap((one) => (one.op === "centres" ? [construction.guides[one.guides[one.guides.length - 1]]] : one.op === "guide" || one.op === "mark" ? [construction.guides[one.guide]] : []))
          .filter((guide) => guide.type === "circle")
          .pop()?.width;
        expect(rows).toEqual(set === undefined ? [] : [{ width: set, length: widths.get(set) }]);
        if (step.op === "guide" && construction.guides[step.guide].type === "circle") expect(rows.map((row) => row.width)).toEqual([construction.guides[step.guide].width]);
      });
      expect(boxes.size).toBe(1);
    });
  }

  it("stands in a margin outside the crest's square, to the right or below it, and the lengths are the crest's own scale", () => {
    const izutsu = by.izutsu;
    const right = stepSvg(izutsu, 2);
    const longest = Math.max(...widthsOf(izutsu).map(([, r]) => r));
    expect(/viewBox="0 0 (\d+) 200"/.exec(right)![1]).toBe(String(Math.ceil(longest) + 228));
    // Every row lies beyond x = 200; the crest's own paths are where they were.
    const rows = (svg: string): [number, number, number][] => [...svg.matchAll(/<path fill="none" d="M(-?[\d.]+) (-?[\d.]+)h([\d.]+)m0-1\.6v3\.2"\/>/g)].map((row) => [Number(row[1]), Number(row[2]), Number(row[3])]);
    for (const [x] of rows(right)) expect(x).toBeGreaterThanOrEqual(200);
    const below = stepSvg(izutsu, 2, { widthsKey: "below" });
    expect(/viewBox="0 0 200 (\d+)"/.test(below)).toBe(true);
    for (const [x, y, length] of rows(below)) {
      expect(y).toBeGreaterThanOrEqual(200);
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x + length).toBeLessThanOrEqual(200);
    }
    expect(withoutKey(below).replace(/<svg[^>]*>/, "")).toBe(withoutKey(right).replace(/<svg[^>]*>/, ""));
    expect(keyOf(below)).toEqual(keyOf(right));
  });

  it("stays one row for a crest of many widths: the box is as wide as the longest width needs and no taller than the square below", () => {
    const agehacho = by.agehacho;
    const widths = widthsOf(agehacho);
    expect(widths.length).toBeGreaterThan(50);
    const longest = Math.max(...widths.map(([, r]) => r));
    expect(/viewBox="0 0 (\d+) 200"/.exec(stepSvg(agehacho, 2))![1]).toBe(String(Math.ceil(longest) + 228));
    expect(stepSvg(agehacho, 2, { widthsKey: "below" })).toContain('viewBox="0 0 200 218"');
    const on = animatedSvg(agehacho, { id: "t", widthsKey: "below" });
    expect(on).toContain('viewBox="0 0 200 218"');
    expect(on.match(/class="t-kl"/g)).toHaveLength(1);
    expect(on.match(/class="t-kn\d+"/g)).toHaveLength(widths.length);
  });

  it("is left out with the switch, with the guides, and for a construction that strikes no circle", () => {
    const janome = by.janome;
    expect(stepSvg(janome, 0, { widthsKey: false })).not.toContain('stroke="none"');
    expect(stepSvg(janome, 0)).toContain('stroke="none"');
    expect(stepSvg(janome, 0, { guides: false })).not.toContain('stroke="none"');
    const ruled: Construction = { guides: [{ type: "line", d: "M0 100h200", part: "frame" }], shapes: [{ part: "frame", kind: "fill", d: "M0 0h10v10z", group: 1 }], steps: [{ op: "guide", guide: 0 }, { op: "fade" }] };
    expect(stepSvg(ruled, 0)).toBe(stepSvg(ruled, 0, { widthsKey: false }));
    expect(animatedSvg(ruled, { id: "t" })).not.toContain("t-k");
  });

  for (const [id, construction] of constructions.filter(([id]) => ["izutsu", "maru-ni-kikyo", "momiji", "wachigai"].includes(id))) {
    it(`${id}'s animation shows the key in a wider view box, its line growing to each width as it is set and its number shown for as long, gone with the guides, and the crest is the same without it`, () => {
      const on = animatedSvg(construction, { id: "t" });
      const off = animatedSvg(construction, { id: "t", widthsKey: false });
      expect(on).toMatch(/viewBox="0 0 (\d+) 200"/);
      expect(off).toContain('viewBox="0 0 200 200"');
      expect(off).not.toMatch(/t-k/);
      // One number for each width, each shown while the compass is set to it; one line, scaled to each width in turn from nothing.
      const numbers = [...on.matchAll(/class="t-kn(\d+)"/g)].map((match) => Number(match[1]));
      expect([...numbers].sort((a, b) => a - b)).toEqual(widthsOf(construction).map(([width]) => width));
      for (const width of numbers) expect(on).toMatch(new RegExp(`@keyframes t-kn${width}\\{0%\\{opacity:0\\}.*opacity:1\\}`));
      const longest = Math.max(...widthsOf(construction).map(([, r]) => r));
      const scales = [...(/@keyframes t-kl\{(.*?)\}\}/.exec(on)![1].matchAll(/scaleX\(([\d.]+)\)/g))].map((match) => Number(match[1]));
      expect(scales[0]).toBe(0);
      expect(scales.at(-1)).toBeGreaterThan(0);
      for (const scale of scales.filter((one) => one > 0)) expect(widthsOf(construction).some(([, r]) => Math.abs(r / longest - scale) < 0.001)).toBe(true);
      expect(on).toMatch(/@keyframes t-k\{0%,[\d.]+%\{opacity:0\}[\d.]+%,[\d.]+%\{opacity:1\}[\d.]+%,100%\{opacity:0\}\}/);
            // The crest itself: the same paths, whether or not the key is there.
      const paths = (svg: string): string[] => tagsOf(svg).filter((tag) => tag.name === "path" && /^t-[sg]\d+/.test(tag.attributes.class ?? "")).map((tag) => tag.attributes.d);
      expect(paths(on)).toEqual(paths(off));
      // Its base state is the finished crest: the key hidden.
      expect(on).toContain(".t-k{opacity:0}");
    });
  }
});

describe("the pen's ink", () => {
  const wachigai = by.wachigai;

  it("is off unless asked for: the ink fades in quickly, as it did", () => {
    for (const [, construction] of constructions) {
      expect(drawnSvg(construction, { id: "t" })).toBe(drawnSvg(construction, { id: "t", inkDraw: false }));
      expect(drawnSvg(construction, { id: "t" })).not.toMatch(/t-h\d/);
      expect(durationOf(construction)).toBe(durationOf({ ...construction, inkDraw: false }));
      expect(durationOf(construction)).toBeLessThan(25);
    }
  });

  it("takes each trace and thickening 2.5 to 4 seconds, and the quick fade with the switch off", () => {
    const times = stepTimes({ ...wachigai, inkDraw: true });
    wachigai.steps.forEach((step, n) => {
      if (step.op !== "trace" && step.op !== "thicken") return;
      // The step lasts until the next begins (0.2 more where the next is another kind).
      const lasts = times[n + 1] - times[n] - (wachigai.steps[n + 1].op === step.op ? 0 : 0.2);
      expect(lasts).toBeGreaterThanOrEqual(2.5 - 1e-9);
      expect(lasts).toBeLessThanOrEqual(4 + 1e-9);
    });
    expect(durationOf({ ...wachigai, inkDraw: false })).toBeLessThan(inked(wachigai) - 5);
    expect(animatedSvg(wachigai, { id: "t", widthsKey: false, inkDraw: false })).not.toMatch(/t-h\d/);
  });

  it("draws each outline along its length, shape by shape in order, then the heavy outline over it, and the quick fade is what it was", () => {
    const [, many] = constructions.find(([, one]) => one.steps.some((step) => step.op === "trace" && step.shapes.length >= 3))!;
    const at = many.steps.findIndex((step) => step.op === "trace" && step.shapes.length >= 3);
    const shapes = (many.steps[at] as { shapes: number[] }).shapes;
    const on = animatedSvg(many, { id: "t", widthsKey: false });
    const off = animatedSvg(many, { id: "t", widthsKey: false, inkDraw: false });
    const frames = (svg: string, name: string): number[] => [...(new RegExp(`@keyframes t-${name}\\{(.*?)\\}\\}`).exec(svg)?.[1] ?? "").matchAll(/(?:^|\})([\d.]+)%\{/g)].map((match) => Number(match[1]));
    // Each shape's stretch begins where the one before ended, and the stretches fill the step.
    let end = -1;
    for (const index of shapes) {
      const [, from, to] = frames(on, `s${index}`);
      expect(to).toBeGreaterThan(from);
      if (end >= 0) expect(from).toBeCloseTo(end, 1);
      end = to;
    }
    expect(frames(on, `s${shapes[0]}`)[1]).toBeLessThan(frames(off, `s${shapes[0]}`)[1] + 50);
    // Off, the shapes of a step are traced together, as they were.
    expect(new Set(shapes.map((index) => frames(off, `s${index}`)[1])).size).toBe(1);
    // Thickened by the pen: a second, heavy outline of each filled shape, drawn along its length in its turn, and gone as the fill is in.
    expect(on).toContain(".t-h{fill:none;stroke:currentColor;stroke-width:1.3;");
    const heavy = tagsOf(on).filter((tag) => /^t-h\d+ t-h$/.test(tag.attributes.class ?? ""));
    expect(heavy.length).toBeGreaterThan(0);
    expect(heavy.map((tag) => tag.attributes.d)).toEqual(many.shapes.filter((shape, i) => shape.kind === "fill" && many.steps.some((step) => step.op === "thicken" && step.shapes.includes(i))).map((shape) => shape.d));
    expect(off).not.toMatch(/t-h\d/);
  });

  for (const [id, construction] of constructions.filter(([id]) => ["izutsu", "maru-ni-kikyo", "mitsu-icho", "wachigai", "mitsuba-aoi"].includes(id))) {
    it(`${id}'s finished drawing is the same with the ink drawn and with it faded, and a still step shows the finished ink either way`, () => {
      const shapes = (svg: string): string[] => tagsOf(svg).filter((tag) => /^t-s\d+ /.test(tag.attributes.class ?? "")).map((tag) => tag.attributes.d);
      expect(shapes(animatedSvg(construction, { id: "t" }))).toEqual(shapes(animatedSvg(construction, { id: "t", inkDraw: false })));
      expect(shapes(animatedSvg(construction, { id: "t" }))).toEqual(construction.shapes.map((shape) => shape.d));
      for (let n = -1; n < construction.steps.length; n += 1) expect(stepSvg(construction, n, { inkDraw: false })).toBe(stepSvg(construction, n));
      expect(inked(construction)).toBeGreaterThan(durationOf(construction));
      expect(inked(construction)).toBeLessThan(45);
    });
  }
});

describe("every place in full", () => {
  const turned = constructions.filter(([, construction]) => construction.steps.some((step) => step.op === "turn"));

  it("is left alone with the option off, and for a crest with no place to turn to", () => {
    for (const [, construction] of constructions) {
      expect(animatedSvg(construction, { id: "t", fullBuild: false })).toBe(animatedSvg(construction, { id: "t" }));
      expect(stepSvg(construction, 5, { fullBuild: false })).toBe(stepSvg(construction, 5));
    }
    for (const [, construction] of constructions.filter(([, one]) => !one.steps.some((step) => step.op === "turn"))) expect(fullBuilt(construction)).toBe(construction);
    expect(turned.length).toBeGreaterThan(10);
  });

  for (const [id, construction] of turned) {
    it(`${id} builds each place as the first unit was, clockwise, one after another, in its own position, and is the same crest`, () => {
      const full = fullBuilt(construction);
      // The finished drawing is the same: the same shapes, the same last frame.
      expect(full.shapes).toBe(construction.shapes);
      expect(withoutKey(stepSvg(full, full.steps.length - 1))).toBe(staticSvg(construction));
      expect(staticSvg(full)).toBe(staticSvg(construction));
      // The steps before the first turn, and the steps after the last, are as they were.
      const first = construction.steps.findIndex((step) => step.op === "turn");
      expect(full.steps.slice(0, first)).toEqual(construction.steps.slice(0, first));
      expect(full.steps.filter((step) => step.op === "turn")).toEqual([]);
      expect(full.steps[full.steps.length - 1]).toEqual({ op: "fade" });
      // The step count is the unit's steps plus, for each place, its guides' steps, its traces, its thickening and its fills.
      const placed = full.steps.filter((step) => step.place !== undefined);
      let pairs = 0;
      let expected = construction.steps.length - construction.steps.filter((step) => step.op === "turn").length;
      const places = new Set<string>();
      for (const step of construction.steps) {
        if (step.op !== "turn") continue;
        const keys = new Map<string, number[]>();
        for (const i of step.shapes) keys.set(`${construction.shapes[i].part} ${construction.shapes[i].turn} ${construction.shapes[i].flip === true}`, [...(keys.get(`${construction.shapes[i].part} ${construction.shapes[i].turn} ${construction.shapes[i].flip === true}`) ?? []), i]);
        for (const [key, shapes] of keys) {
          pairs += 1;
          const again = places.has(key);
          places.add(key);
          const part = construction.shapes[shapes[0]].part;
          const own = construction.guides.flatMap((guide, i) => (guide.unit === 0 && guide.part === part && !(/^M100 ([\d.]+)a([\d.]+) /.test(guide.d) && Math.abs(Number(/^M100 ([\d.]+)a/.exec(guide.d)![1]) + radius(guide.d) - 100) < 0.01) ? [i] : []));
          const unit = construction.steps.filter((one) => (one.op === "centres" && one.guides.some((k) => own.includes(k))) || ((one.op === "guide" || one.op === "mark") && own.includes(one.guide))).length;
          const groups = shapes.filter((i, k) => k === 0 || construction.shapes[shapes[k - 1]].group !== construction.shapes[i].group).length;
          expected += (again ? 0 : unit) + 2 * groups + 1;
        }
      }
      expect(places.size).toBeGreaterThan(0);
      expect(full.steps.length).toBe(expected);
      // Every place has the unit's own guide steps, in the same order and kinds, then trace, thicken and draw; the places go clockwise and each is done before the next.
      const key = (step: (typeof full.steps)[number]): string => (step.place ?? []).join("/");
      const runs: (typeof full.steps)[] = [];
      full.steps.forEach((step, n) => {
        if (step.place === undefined) return;
        if (runs.length > 0 && full.steps[n - 1]?.place !== undefined && key(runs[runs.length - 1][0]) === key(step)) runs[runs.length - 1].push(step);
        else runs.push([step]);
      });
      expect(runs.length).toBe(pairs);
      for (const mine of runs) {
        const kinds = mine.map((step) => step.op);
        expect(kinds.indexOf("trace")).toBeGreaterThan(kinds.lastIndexOf("guide"));
        expect(kinds.filter((op) => op === "thicken")).toHaveLength(1);
        expect(kinds.filter((op) => op === "trace").length).toBe(kinds.filter((op) => op === "draw").length);
        expect(kinds.slice(0, kinds.indexOf("trace")).every((op) => op === "centres" || op === "guide" || op === "mark")).toBe(true);
        // Built in its own position: the circles are struck at their own centres, drawn from their own tops.
        for (const step of mine) {
          if (step.op !== "guide" || full.guides[step.guide].type !== "circle") continue;
          const [x, y] = full.guides[step.guide].at!;
          expect(full.guides[step.guide].d.startsWith(`M${x} ${Math.round((y - radius(full.guides[step.guide].d)) * 1000) / 1000}a`)).toBe(true);
        }
      }
      // Counting from 1 at the unit, a part's places are numbered one after another.
      const numbers = placed.map((step) => step.place!).filter((place, k, all) => k === 0 || place.join() !== all[k - 1].join());
      for (const [n, total] of numbers) {
        expect(n).toBeGreaterThanOrEqual(2);
        expect(n).toBeLessThanOrEqual(total);
      }
      // Nothing is moved or copied across: no transform in the animation, and each place's circles are guides of their own.
      const svg = animatedSvg(construction, { id: "t", fullBuild: true });
      expect(svg).not.toContain("transform=");
      expect(svg).not.toMatch(/rotate\(|matrix\(/);
      expect(svg).toBe(animatedSvg(full, { id: "t" }));
      expect(durationOf(full)).toBeGreaterThan(durationOf(construction));
      expect(fullBuilt(construction)).toEqual(full);
    });
  }

  it("goes clockwise from the unit: kikyo's places are in order round the circle, each five-part place being done before the next", () => {
    const kikyo = by["maru-ni-kikyo"];
    const full = fullBuilt(kikyo);
    const placed = full.steps.filter((step) => step.op === "draw" && step.place !== undefined);
    const turns = placed.map((step) => ((kikyo.shapes[(step as { shapes: number[] }).shapes[0]].turn! % 360) + 360) % 360);
    expect(turns).toEqual([...turns].sort((a, b) => a - b));
    expect(placed.map((step) => step.place![0])).toEqual([2, 3, 4, 5]);
    expect(placed.every((step) => step.place![1] === 5)).toBe(true);
  });

  it("is captioned with the place, in English and in Japanese, and the step count of the scrubber follows", () => {
    const kikyo = by["maru-ni-kikyo"];
    const full = fullBuilt(kikyo);
    const at = full.steps.findIndex((step) => step.place?.[0] === 3);
    expect(stepCaption(full.steps[at], full, "en")).toMatch(/^Place 3 of 5, clockwise: Underdrawing: /);
    expect(stepCaption(full.steps[at], full, "ja")).toMatch(/^5か所の3か所目、時計回り：下書き：/);
    expect(stepCaption(kikyo.steps[0], kikyo, "en")).not.toMatch(/^Place/);
    expect(full.steps.length).toBeGreaterThan(kikyo.steps.length);
  });
});
