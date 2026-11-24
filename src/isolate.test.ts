// A part shown alone: every shape and guide says which part and which unit it is, and every part on a crest's card has something to show.
import { describe, expect, it } from "vitest";

import { tagsOf } from "../scripts/test-helpers";
import { isolated } from "./animate";
import { CREST_IDS } from "./data/ids.data";
import { STEP_LOADERS } from "./data/loaders.data";
import { manifest } from "./manifest";
import { term } from "./parts";
import { animatedSvg, stepSvg, stepsOf } from "./render";
import type { Construction } from "./render";
import { partsOf } from "./search";

/** Whether a guide is a circle about the crest's centre (a circle is written from its top). */
const aboutCentre = (d: string): boolean => {
  const top = /^M100 ([\d.]+)a([\d.]+) /.exec(d);

  return top !== null && Math.abs(Number(top[1]) + Number(top[2]) - 100) < 0.01;
};

const constructions = await Promise.all(CREST_IDS.map(async (id) => [id, (await STEP_LOADERS[id]()).default] as const));
const by = Object.fromEntries(constructions) as Record<string, Construction>;
// `placed` is a guide struck again where a turn takes the unit: it sits in a group that turns it there.
const paths = (svg: string): { d: string; faint: boolean; guide: boolean; placed: boolean }[] => {
  let turned = false;

  return tagsOf(svg).flatMap((tag) => {
    if (tag.name === "g") turned = tag.attributes.transform !== undefined;
    const guide = tag.attributes.fill === "none" || /-g\b/.test(tag.attributes.class ?? "");

    return tag.name === "path" ? [{ d: tag.attributes.d, faint: tag.attributes.opacity === ".12", guide, placed: guide && turned }] : [];
  });
};

describe("every crest's parts", () => {
  for (const [id, construction] of constructions) {
    const record = manifest(id)!;
    const listed = [...record.motifs.map((use) => use.motif), ...(record.frame === "none" ? [] : ["frame"])];

    it(`${id} tags every shape and every guide with its part and its unit`, () => {
      for (const shape of construction.shapes) {
        expect(listed, shape.d.slice(0, 20)).toContain(shape.part);
        expect(Number.isInteger(shape.unit) && shape.unit! >= 0, "unit").toBe(true);
        // The unit that is drawn is 0, and only a shape turned to another place is another unit.
        expect(shape.unit === 0, "unit 0").toBe(shape.turn === undefined);
      }
      for (const guide of construction.guides) {
        expect(listed, guide.d.slice(0, 20)).toContain(guide.part);
        expect(guide.unit).toBe(0);
      }
      for (const part of listed) {
        const units = construction.shapes.filter((shape) => shape.part === part).map((shape) => shape.unit!);
        expect(units).toContain(0);
        // Units are numbered with none left out, and the shapes of one place are one unit.
        expect([...new Set(units)].sort((a, b) => a - b)).toEqual(Array.from({ length: Math.max(...units) + 1 }, (_, i) => i));
        const places = construction.shapes.filter((shape) => shape.part === part && shape.turn !== undefined);
        for (const shape of places) for (const other of places) expect(shape.unit === other.unit).toBe(shape.turn === other.turn && shape.flip === other.flip);
      }
    });

    it(`${id} has, for every part on its card, a shape to show alone or a stated reason`, () => {
      for (const part of partsOf(record)) {
        const shown = part.kind === "frame" ? isolated(construction, "frame") : isolated(construction, part.kind === "motif" ? part.id : part.of!, part.kind === "count" || part.kind === "arrangement" ? part.kind : undefined);
        const full = paths(stepSvg(shown, shown.rest!)).filter((path) => !path.guide && !path.faint);
        if (part.kind === "frame" && record.frame === "none") {
          // The stated reason: the frame's own name and line say there is none.
          expect(full).toEqual([]);
          expect(shown.steps).toEqual([]);
          expect(term("none")).toMatchObject({ en: "No frame", about: { en: expect.stringContaining("nothing round it") } });
          continue;
        }
        expect(full.length, `${part.kind} ${part.id}`).toBeGreaterThan(0);
      }
    });
  }
});

describe("isolated", () => {
  const cross = by["maru-ni-juji"];
  const aoi = by["mitsuba-aoi"];

  it("keeps one part's steps, in order, with a rest before the guides are rubbed out, and changes nothing it is given", () => {
    const before = JSON.stringify(cross);
    const shown = isolated(cross, "cross");
    expect(JSON.stringify(cross)).toBe(before);
    expect(shown.shapes).toBe(cross.shapes);
    for (const step of shown.steps) {
      if (step.op === "guide") expect(cross.guides[step.guide].part).toBe("cross");
      if (step.op === "draw" || step.op === "turn") for (const i of step.shapes) expect(cross.shapes[i].part).toBe("cross");
    }
    expect(shown.steps.map((step) => step.op).filter((op) => op === "guide").length).toBe(cross.guides.filter((guide) => guide.part === "cross").length);
    expect(shown.steps[shown.steps.length - 1]).toEqual({ op: "fade" });
    expect(shown.rest).toBe(shown.steps.length - 2);
    const frame = isolated(cross, "frame");
    expect(frame.steps.length + shown.steps.length).toBe(cross.steps.length + 1);
  });

  it("draws the part at full strength with its own guides, and the rest of the crest faint, on a still frame", () => {
    const shown = isolated(cross, "cross");
    const still = paths(stepSvg(shown, shown.rest!));
    expect(still.filter((path) => path.faint).map((path) => path.d)).toEqual(cross.shapes.filter((shape) => shape.part === "frame").map((shape) => shape.d));
    expect(still.filter((path) => !path.faint && !path.guide).map((path) => path.d)).toEqual(cross.shapes.filter((shape) => shape.part === "cross").map((shape) => shape.d));
    expect(still.filter((path) => path.guide && !path.placed).map((path) => path.d)).toEqual(cross.guides.filter((guide) => guide.part === "cross").map((guide) => guide.d));
    // Stepped back to the empty page, the rest of the crest is still there, faint, and nothing else.
    expect(paths(stepSvg(shown, -1)).every((path) => path.faint)).toBe(true);
    expect(paths(stepSvg(shown, -1))).toHaveLength(cross.shapes.filter((shape) => shape.part === "frame").length);
    // The whole construction has no faint shape at any step.
    for (let i = -1; i < cross.steps.length; i += 1) expect(stepSvg(cross, i)).not.toContain('opacity=".12"');
  });

  it("animates only the part's steps, the rest of the crest faint and still", () => {
    const shown = isolated(cross, "cross");
    const moving = tagsOf(animatedSvg(shown, { id: "t" })).filter((tag) => tag.name === "path");
    expect(moving.filter((tag) => tag.attributes.opacity === ".12").map((tag) => tag.attributes.d)).toEqual(cross.shapes.filter((shape) => shape.part === "frame").map((shape) => shape.d));
    expect(moving.filter((tag) => tag.attributes.opacity === ".12").every((tag) => tag.attributes.class === undefined)).toBe(true);
    expect(moving.filter((tag) => /^t-g\d+/.test(tag.attributes.class ?? "")).map((tag) => tag.attributes.d)).toEqual(cross.guides.filter((guide) => guide.part === "cross").map((guide) => guide.d));
    expect(animatedSvg(cross, { id: "t" })).not.toContain('opacity=".12"');
  });

  it("rests a count on one of the motif, with the turn to its other places as the next step", () => {
    const shown = isolated(aoi, "hollyhock", "count");
    const next = shown.steps[shown.rest! + 1];
    expect(next.op).toBe("turn");
    const still = paths(stepSvg(shown, shown.rest!)).filter((path) => !path.guide);
    // One leaf: the half that is drawn and its flip, and none of the leaves turned to the other two places.
    const leaf = aoi.shapes.filter((shape) => shape.turn === undefined || shape.turn === 0).map((shape) => shape.d);
    expect(still.map((path) => path.d)).toEqual(leaf);
    expect(leaf.length).toBeLessThan(aoi.shapes.length);
    expect(paths(stepSvg(shown, shown.rest! + 1)).filter((path) => !path.guide)).toHaveLength(aoi.shapes.length);
    // The half leaf's own guides are struck again for its flip, and then at each of the two other places for both halves.
    const own = aoi.guides.filter((guide) => guide.part === "hollyhock" && !aboutCentre(guide.d)).map((guide) => guide.d);
    expect(paths(stepSvg(shown, shown.rest! - 1)).some((path) => path.placed)).toBe(false);
    expect(paths(stepSvg(shown, shown.rest!)).filter((path) => path.placed).map((path) => path.d)).toEqual(own);
    expect(paths(stepSvg(shown, shown.rest! + 1)).filter((path) => path.placed)).toHaveLength(own.length * 5);
    // A motif that is not repeated rests with all of it drawn.
    const one = isolated(by.janome, "snake-eye", "count");
    expect(paths(stepSvg(one, one.rest!)).filter((path) => !path.guide && !path.faint)).toHaveLength(by.janome.shapes.length);
  });

  it("shows an arrangement by its lines: a spoke for each place, and the mirror line of each flip", () => {
    const shown = isolated(aoi, "hollyhock", "arrangement");
    const axes = shown.guides.slice(aoi.guides.length);
    expect(axes.map((guide) => guide.d)).toEqual(expect.arrayContaining(["M100 4L100 196", "M100 100L100 4", "M100 100L183.14 148", "M100 100L16.86 148"]));
    expect(axes.every((guide) => guide.type === "line" && guide.part === "hollyhock")).toBe(true);
    expect(shown.steps.filter((step) => step.op === "guide").map((step) => (step as { guide: number }).guide)).toEqual(axes.map((_, i) => aoi.guides.length + i));
    expect(paths(stepSvg(shown, shown.rest!)).filter((path) => !path.guide && !path.faint)).toHaveLength(aoi.shapes.length);
    // The axes are no unit's guides: the turn strikes nothing again.
    expect(paths(stepSvg(shown, shown.rest!)).some((path) => path.placed)).toBe(false);
    // Five petals turned and never flipped: five spokes and no more.
    const five = isolated(by.kikyo, "bellflower", "arrangement");
    expect(five.guides.slice(by.kikyo.guides.length)).toHaveLength(5);
    // Nothing turned: no line, and the motif is still shown.
    const none = isolated(by.janome, "snake-eye", "arrangement");
    expect(none.guides).toHaveLength(by.janome.guides.length);
    expect(none.steps.map((step) => step.op)).toEqual(["draw"]);
  });

  it("has no steps for a part with no shape, and the whole crest is faint", () => {
    const shown = isolated(aoi, "frame");
    expect(shown.steps).toEqual([]);
    expect(shown.rest).toBe(-1);
    expect(paths(stepSvg(shown, shown.rest!)).every((path) => path.faint)).toBe(true);
    expect(stepsOf(aoi.guides, aoi.shapes)).toEqual(aoi.steps);
  });
});
