// The construction animation: every crest has steps, the steps cover every part, and the last frame is the static drawing.
import { describe, expect, it } from "vitest";

import { piecesOf, tagsOf } from "../scripts/test-helpers";
import type { Tag } from "../scripts/test-helpers";
import { CREST_IDS } from "./data/ids.data";
import { LOADERS, STEP_LOADERS } from "./data/loaders.data";
import { MANIFEST } from "./manifest";
import { stepCaption } from "./animate";
import { CREST_ELEMENT_ATTRIBUTES } from "./element";
import { animatedSvg as drawnSvg, durationOf, staticSvg, stepSvg as shownSvg, stepsOf, stepTimes } from "./render";
import { animatedSvg as playedSvg, stepSvg as heldSvg } from "./render";

// The widths key, the pen's ink and the places built in full have their own tests (key.test.ts): these hold the rest of the drawing as it was, with them off.
const QUIET = { widthsKey: false, inkDraw: false } as const;
const animatedSvg = (construction: Parameters<typeof drawnSvg>[0], options: Parameters<typeof drawnSvg>[1] = {}): string => drawnSvg(construction, { ...QUIET, ...options });
const stepSvg = (construction: Parameters<typeof shownSvg>[0], step: number, options: Parameters<typeof shownSvg>[2] = {}): string => shownSvg(construction, step, { ...QUIET, ...options });

/** Whether a guide is a circle about the crest's centre (a circle is written from its top). */
const aboutCentre = (d: string): boolean => {
  const top = /^M100 ([\d.]+)a([\d.]+) /.exec(d);

  return top !== null && Math.abs(Number(top[1]) + Number(top[2]) - 100) < 0.01;
};

const every = await Promise.all(CREST_IDS.map(async (id) => [id, (await STEP_LOADERS[id]()).default, (await LOADERS[id]()).default] as const));
// A crest still being redrawn has no steps to hold to these; what it gives instead is held at the end.
const constructions = every.filter(([, construction]) => construction.redrawing !== true);

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
      // The layout circle is struck first, even for a crest of ruled lines only: its lines run from edge to edge of it.
      expect(ops[0]).toBe("centres");
      expect(ops[ops.length - 1]).toBe("fade");
      // Every guide, the circles and then the ruled lines, before anything is traced.
      expect(ops.indexOf("trace")).toBeGreaterThan(ops.lastIndexOf("guide"));
      expect(ops.filter((op) => op === "fade")).toHaveLength(1);
    });

    it(`${id} goes by the six phases: the underdrawing by compass width, its ruled lines, the trace, the thickening, the fill, the finish`, () => {
      const phase = construction.steps.map((step) =>
        step.op === "centres" || step.op === "mark" ? 1 : step.op === "guide" ? (construction.guides[step.guide].type === "circle" ? 1 : 2) : step.op === "trace" ? 3 : step.op === "thicken" ? 4 : step.op === "fade" ? 6 : 5,
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
        expect(said("en")[i]).toMatch([/^Underdrawing: /, /^Underdrawing: rule the (lines through the centre, edge to edge, clockwise|parallel lines, edge to edge, from the top down)$/, /^Trace only what is needed: /, /^Thicken the outline$/, /^(Fill the |Build )/, /^Finished: /][n - 1]);
        expect(said("ja")[i]).toMatch([/^下書き：/, /^下書き：定規で、(中心を通る直線を端から端まで、時計回りに|平行な直線を端から端まで、上から順に)引く$/, /^必要な部分だけなぞる：/, /^線を太くする$/, /^(色を塗る：|反対側にも|ほかの位置にも)/, /^仕上げ：/][n - 1]);
      });
      // A line through the centre says so, and no other does.
      construction.steps.forEach((step, i) => {
        if (step.op !== "guide" || construction.guides[step.guide].type !== "line") return;
        const [{ a, b }] = piecesOf(construction.guides[step.guide].d);
        const off = Math.abs((b[0] - a[0]) * (100 - a[1]) - (b[1] - a[1]) * (100 - a[0])) / Math.hypot(b[0] - a[0], b[1] - a[1]);
        expect(/centre/.test(said("en")[i]), construction.guides[step.guide].d).toBe(off < 0.05);
      });
      for (const guide of circles) expect(said("en")).toContain(guide.gap === true ? `Underdrawing: strike the gap circles, where one piece passes under another (compass at width ${guide.width}, its point on ${guide.width})` : `Underdrawing: set the compass to width ${guide.width}, put its point on ${guide.width}, strike the circle`);
    });

    it(`${id} marks a hexagon's corners by stepping the compass round a circle, and rules no polygon as a guide`, () => {
      // A guide line is one line, never a polygon's outline.
      for (const guide of construction.guides) if (guide.type === "line") expect(piecesOf(guide.d), guide.d).toHaveLength(1);
      const stepped = construction.guides.flatMap((guide, i) => (guide.marks === undefined ? [] : [i]));
      expect(construction.steps.flatMap((step) => (step.op === "mark" ? [step.guide] : []))).toEqual(stepped);
      expect(stepped.length > 0, "stepped").toBe(["kikko", "kikko-ni-katabami", "kikko-ni-hanabishi", "maru-ni-asa-no-ha", "kagome", "maru-ni-kagome", "mitsu-uroko", "maru-ni-mitsu-uroko", "asa-no-ha", "mitsu-boshi", "maru-ni-mitsu-boshi", "shichiyo", "maru-ni-shichiyo", "mitsu-inazuma", "yotsu-inazuma", "maru-ni-mitsu-inazuma", "rokkaku-inazuma", "tsurara-yukiwa"].includes(id));
      for (const i of stepped) {
        const guide = construction.guides[i];
        const r = Number(/a([\d.]+) /.exec(guide.d)![1]);
        const at = construction.steps.findIndex((step) => step.op === "mark" && step.guide === i);
        // After the circle is struck, and before any line is ruled through the marks.
        expect(at).toBeGreaterThan(construction.steps.findIndex((step) => step.op === "guide" && step.guide === i));
        expect(at).toBeLessThan(construction.steps.findIndex((step) => step.op === "guide" && construction.guides[step.guide].type === "line"));
        // Six marks: the first at the top, each one compass width on from the last, clockwise, and the sixth one width from the first.
        expect(guide.marks).toHaveLength(6);
        expect(guide.marks![0]).toEqual([guide.at![0], Math.round((guide.at![1] - r) * 100) / 100]);
        guide.marks!.forEach((mark, k) => {
          const next = guide.marks![(k + 1) % 6];
          expect(Math.hypot(next[0] - mark[0], next[1] - mark[1])).toBeCloseTo(r, 1);
          expect(Math.hypot(mark[0] - guide.at![0], mark[1] - guide.at![1])).toBeCloseTo(r, 1);
          if (k > 0) expect(Math.atan2(mark[0] - 100, 100 - mark[1]) + (k > 3 ? 2 * Math.PI : 0)).toBeGreaterThan(Math.atan2(guide.marks![k - 1][0] - 100, 100 - guide.marks![k - 1][1]) + (k - 1 > 3 ? 2 * Math.PI : 0));
        });
        expect(stepCaption(construction.steps[at], construction, "en")).toBe(`Underdrawing: keep the compass at width ${guide.width} and step it round the circle from the top, clockwise, to mark the six corners`);
        expect(stepCaption(construction.steps[at], construction, "ja")).toBe(`下書き：コンパスを幅${guide.width}のまま、円の上をいちばん上から時計回りに進めて、六つの角に印をつける`);
        // The marks are on the page from that step on, and in the animation.
        const dots = (svg: string): number => tagsOf(svg).filter((tag) => tag.name === "circle" && tag.attributes.r === ".9").length;
        expect(dots(stepSvg(construction, at)) - dots(stepSvg(construction, at - 1))).toBe(6);
        expect(dots(animatedSvg(construction, { id: "t" }))).toBe(construction.guides.filter((one) => one.type === "circle").length + 6 * stepped.length);
      }
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
      // Nothing of the crest moves: no style turns, flips or slides a shape or a guide, and the only transform is the one that stands
      // a place's guides there. The compass arm is the tool, not the crest: it alone turns, about its circle's centre, to follow the pen.
      const style = /<style>(.*?)<\/style>/.exec(svg)![1];
      expect(style.replace(/\.t-a\d+\{[^}]*\}|@keyframes t-a\d+\{.*?\}\}/g, "")).not.toMatch(/transform|rotate|translate|scale|offset-path/);
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

    it(`${id} has one compass arm for each circle struck and each arc inked, from that curve's centre, gone when the curve ends, and none with the switch off`, () => {
      const near = (a: number[], b: number[]): boolean => Math.hypot(a[0] - b[0], a[1] - b[1]) < 0.02;
      const centreOf = (arc: { a: number[]; b: number[]; mid: number[]; r: number }): number[] => {
        const m = [(arc.a[0] + arc.b[0]) / 2, (arc.a[1] + arc.b[1]) / 2];
        const rise = Math.hypot(arc.mid[0] - m[0], arc.mid[1] - m[1]);

        return [arc.mid[0] + ((m[0] - arc.mid[0]) / rise) * arc.r, arc.mid[1] + ((m[1] - arc.mid[1]) / rise) * arc.r];
      };
      const arcsOf = (d: string): { a: number[]; b: number[]; mid: number[]; r: number }[] => piecesOf(d).flatMap((piece) => (piece.t === "A" ? [piece] : []));
      // Whether the underdrawing marked a centre there: for a unit built at another place, its own centre stood at that place. An arc
      // too short, or too near a half circle, to give its centre exactly is held by its start standing on a circle of its radius struck nearby.
      const marked = (centre: number[], shape: { turn?: number; flip?: boolean } = {}, arc?: { a: number[]; b: number[]; r: number }): boolean => {
        const back = (-(shape.turn ?? 0) * Math.PI) / 180;
        const home = (p: number[]): number[] => {
          const x = (p[0] - 100) * Math.cos(back) - (p[1] - 100) * Math.sin(back);

          return [100 + (shape.flip === true ? -x : x), 100 + (p[0] - 100) * Math.sin(back) + (p[1] - 100) * Math.cos(back)];
        };
        const chord = arc === undefined ? Infinity : Math.hypot(arc.a[0] - arc.b[0], arc.a[1] - arc.b[1]);

        return construction.guides.some((guide) => {
          if (guide.at === undefined) return false;
          const off = Math.hypot(guide.at[0] - home(centre)[0], guide.at[1] - home(centre)[1]);
          const width = Number(/a([\d.]+)/.exec(guide.d)![1]);

          return off < 0.1 || (arc !== undefined && (chord < 3.9 || chord > 1.99 * arc.r) && off < 1.5 && Math.abs(width - arc.r) < 0.15 && Math.abs(Math.hypot(guide.at[0] - home(arc.a)[0], guide.at[1] - home(arc.a)[1]) - width) < 0.05);
        });
      };
      // An arm is a group: a line from the centre to the pen, and the centre's dot, bold, where a centre was marked.
      const armsOf = (svg: string, is: (tag: Tag) => boolean): { name: string; from: number[]; to: number[]; dot: boolean }[] =>
        tagsOf(svg).flatMap((tag, i, tags) => {
          if (tag.name !== "g" || !is(tag)) return [];
          const [x, y, tx, ty] = /^M(-?[\d.]+) (-?[\d.]+)L(-?[\d.]+) (-?[\d.]+)$/.exec(tags[i + 1].attributes.d)!.slice(1).map(Number);
          const dot = tags[i + 2]?.name === "circle" && tags[i + 2].attributes.r === "1.8" && near([Number(tags[i + 2].attributes.cx), Number(tags[i + 2].attributes.cy)], [x, y]);

          return [{ name: tag.attributes.class ?? "", from: [x, y], to: [tx, ty], dot }];
        });
      // The animation: the circles in the order they are struck, then each shape's arcs in the order they are inked.
      const svg = animatedSvg(construction, { id: "t" });
      const arms = armsOf(svg, (tag) => /^t-a t-a\d+$/.test(tag.attributes.class ?? ""));
      const struck = construction.steps.flatMap((step) => (step.op === "guide" && construction.guides[step.guide].type === "circle" ? [construction.guides[step.guide]] : []));
      const inked = construction.steps.flatMap((step) => (step.op === "draw" || step.op === "turn" ? step.shapes : [])).flatMap((i) => arcsOf(construction.shapes[i].d).map((arc) => ({ ...arc, shape: construction.shapes[i] })));
      expect(arms).toHaveLength(struck.length + inked.length);
      struck.forEach((guide, k) => {
        expect(arms[k].from, guide.d).toEqual(guide.at);
        expect(arms[k].dot).toBe(true);
        expect(near(arms[k].to, piecesOf(guide.d)[0].a)).toBe(true);
      });
      inked.forEach((arc, k) => {
        const arm = arms[struck.length + k];
        expect(near(arm.from, centreOf(arc)), `${arm.from} is not the centre ${centreOf(arc)}`).toBe(true);
        expect(near(arm.to, arc.a)).toBe(true);
        // Where the two ways of holding a short arc could disagree (an arc just at the limit), the arm's own word is taken.
        const edge = Math.abs(Math.hypot(arc.a[0] - arc.b[0], arc.a[1] - arc.b[1]) - 4) < 0.3 || Math.hypot(arc.a[0] - arc.b[0], arc.a[1] - arc.b[1]) > 1.9 * arc.r;
        if (!edge) expect(arm.dot, `${arm.from}`).toBe(marked(arm.from, arc.shape, arc));
      });
      // Each arm shows only while its curve is drawn: hidden until then, turning about its centre for the span, hidden after, and hidden by default.
      const style = /<style>(.*?)<\/style>/.exec(svg)![1];
      expect(style).toContain(".t-c,.t-w,.t-a{opacity:0;");
      expect(style).toContain("[compass-arm=off] .t-a{display:none}");
      arms.forEach((arm, k) => {
        expect(style).toContain(`.t-a${k}{transform-origin:${arm.from[0]}px ${arm.from[1]}px;animation:t-a${k} `);
        const frames = new RegExp(`@keyframes t-a${k}\\{0%,([\\d.]+)%\\{opacity:0;rotate:0deg\\}([\\d.]+)%\\{opacity:1;rotate:0deg;?[^}]*\\}([\\d.]+)%\\{opacity:1;rotate:(-?[\\d.]+)deg\\}([\\d.]+)%,100%\\{opacity:0;rotate:\\4deg\\}\\}`).exec(style);
        expect(frames, `t-a${k}`).not.toBeNull();
        const [before, from, to, turn, after] = frames!.slice(1).map(Number);
        // A circle's arm goes once round, clockwise.
        if (k < struck.length) expect(turn).toBe(360);
        expect(before).toBeLessThanOrEqual(from);
        expect(to).toBeGreaterThanOrEqual(from);
        expect(after).toBeGreaterThanOrEqual(to);
        expect(after - to).toBeLessThan(0.05);
      });
      expect(animatedSvg(construction, { id: "t", compassArm: false })).not.toMatch(/t-a\d|rotate:/);
      // Held at a step: one arm after a circle is struck or an arc traced, where the curve ended; none after any other step, and none with the switch off.
      const still = (tag: Tag): boolean => tag.attributes["stroke-width"] === ".5" && tag.attributes.transform === undefined;
      construction.steps.forEach((step, n) => {
        const held = armsOf(stepSvg(construction, n), still);
        const guide = step.op === "guide" ? construction.guides[step.guide] : undefined;
        const arcs = step.op === "trace" ? step.shapes.flatMap((i) => arcsOf(construction.shapes[i].d)) : [];
        expect(armsOf(stepSvg(construction, n, { compassArm: false }), still)).toEqual([]);
        if (guide?.type === "circle") {
          expect(held).toHaveLength(1);
          expect(held[0]).toMatchObject({ from: guide.at, dot: true });
          expect(near(held[0].to, piecesOf(guide.d)[0].a)).toBe(true);
        } else if (arcs.length > 0) {
          const last = arcs[arcs.length - 1];
          expect(held).toHaveLength(1);
          expect(near(held[0].from, centreOf(last))).toBe(true);
          expect(near(held[0].to, last.b), `${held[0].to} is not the arc's end ${last.b}`).toBe(true);
          expect(held[0].dot).toBe(marked(held[0].from));
        } else expect(held).toEqual([]);
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
  // The compass arm has its own test: these hold the rest of a still frame, and of the animation.
  const stepSvg = (construction: Parameters<typeof heldSvg>[0], step: number, options: Parameters<typeof heldSvg>[2] = {}): string => heldSvg(construction, step, { ...QUIET, compassArm: false, ...options });
  const animatedSvg = (construction: Parameters<typeof playedSvg>[0], options: Parameters<typeof playedSvg>[1] = {}): string => playedSvg(construction, { ...QUIET, compassArm: false, ...options });
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
      // With the ink faded in quickly, as it is unless asked otherwise; the pen's ink takes longer (key.test.ts).
      const seconds = durationOf(construction);
      expect(seconds).toBeGreaterThan(2);
      expect(seconds).toBeLessThan(25);
      expect(durationOf({ ...construction, inkDraw: true })).toBeLessThan(40);
    }
    const small = constructions.find(([id]) => id === "janome")![1];
    const large = constructions.find(([id]) => id === "mitsuba-aoi")![1];
    expect(durationOf(large)).toBeGreaterThan(durationOf(small));
    expect(durationOf({ ...large, inkDraw: true })).toBeGreaterThan(durationOf({ ...small, inkDraw: true }));
  });
});

describe("a crest still being redrawn", () => {
  const redrawn = every.filter(([, construction]) => construction.redrawing === true);

  it("is every crest the records mark, and no other", () => {
    expect(redrawn.map(([id]) => id).sort()).toEqual(MANIFEST.filter((record) => record.redrawing === true).map((record) => record.id).sort());
  });

  for (const [id, construction, svg] of redrawn) {
    it(`${id} exposes no steps and no guides, and is given finished wherever it would be drawn step by step`, () => {
      expect(construction.steps).toEqual([]);
      expect(construction.guides).toEqual([]);
      expect(MANIFEST.find((record) => record.id === id)).toMatchObject({ steps: 0, guides: 0 });
      expect(animatedSvg(construction)).toBe(svg);
      expect(animatedSvg(construction, { loop: true, speed: 2 })).not.toContain("animation");
      for (const step of [-1, 0, 5, Infinity]) expect(stepSvg(construction, step)).toBe(svg);
    });
  }
});
