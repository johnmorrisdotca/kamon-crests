// The Build page's logic (demo/compose.js): a crest composed from the package's own drawings is still a compass-and-ruler construction.
// A composed crest is held to what every crest is held to: arcs of circles struck first and ruled lines, nothing outside the page,
// guides before ink, each shape drawn once. One copy with no frame is the catalogue's crest itself, and one in a ring is the catalogue's
// ringed crest where that is drawn the same way. The names, and the crests of the catalogue that have the same parts, are the grammar's.
import { describe, expect, it } from "vitest";

import { RING_GAP as BUILDER_GAP, RING_WEIGHT as BUILDER_WEIGHT } from "../scripts/construct/builder.ts";
import { offGuides, unstruck } from "../scripts/test-helpers";
import { WORDS } from "../demo/words.js";
import { ARRANGEMENT_COUNTS, COUNTS, FRAME_IDS, RING_GAP, RING_WEIGHT, canBuild, compose, layOut, nameOf, parsePath, placePath, placings, reachOf, ringOf, roomOf, sameDrawing, sameParts, unitFor, unitsOf, writePath } from "../demo/compose.js";
import { STEP_LOADERS } from "./data/loaders.data";
import { MANIFEST } from "./manifest";
import { MOTIFS, TURNS, countName } from "./parts";
import { animatedSvg, fullBuilt, staticSvg, stepsOf } from "./render";

const TOOLS = { fullBuilt, stepsOf };
const record = (id) => MANIFEST.find((one) => one.id === id);
const construction = async (id) => (await STEP_LOADERS[id]()).default;
const units = unitsOf(MANIFEST);
const unitConstructions = new Map(await Promise.all([...units.values()].map(async (one) => [one.id, await construction(one.id)])));
const say = (key, values, lang) => WORDS[lang][key].replace(/\{(\w+)\}/g, (whole, name) => String(values?.[name] ?? ""));
const nameIn = (spec, lang) => nameOf(spec, { motifs: MOTIFS, turns: TURNS }, say, countName, lang);
const specOf = (id, rest) => ({ unit: record(id), frame: "none", arrangement: "single", count: 1, mirror: false, ...rest });

describe("path data", () => {
  it("is read and written as the package writes it: every shape and guide written to two decimals comes back the same", () => {
    let held = 0;
    for (const one of unitConstructions.values()) {
      for (const { d } of [...one.shapes, ...one.guides]) {
        if (/\.\d{3}/.test(d)) continue;
        expect(writePath(parsePath(d), 2)).toBe(d);
        held += 1;
      }
    }
    expect(held).toBeGreaterThan(2000);
  });

  it("places by mirroring, scaling, moving and turning, and a mirror turns every arc the other way round", () => {
    const [move, arc] = parsePath(placePath("M100 0a50 50 0 0 1 50 50", { k: 0.5, flip: true }));
    expect(move.p).toEqual([100, 50]);
    expect(arc).toMatchObject({ c: "A", r: 25, large: 0, sweep: 0, p: [75, 75] });
    // A quarter turn clockwise takes the point above the centre to the right of it.
    expect(parsePath(placePath("M100 20", { k: 1, turn: 90 }))[0].p.map(Math.round)).toEqual([180, 100]);
    expect(parsePath(placePath("M100 20", { k: 0.5, dx: 10, dy: -5 }))[0].p).toEqual([110, 55]);
  });

  it("finds exactly how far a drawing reaches from the centre", () => {
    expect(reachOf((unitConstructions.get("janome") ?? { shapes: [] }).shapes)).toBeCloseTo(96, 6);
    expect(reachOf(unitConstructions.get("ume-bachi").shapes)).toBeCloseTo(90, 2);
  });
});

describe("the frames", () => {
  it("are the weights and the white gap the builder's rings are made with", () => {
    expect(RING_WEIGHT["ring-thin"]).toBe(BUILDER_WEIGHT["ring-thin"]);
    expect(RING_WEIGHT["ring-medium"]).toBe(BUILDER_WEIGHT["ring-medium"]);
    expect(RING_GAP).toBe(BUILDER_GAP);
    expect(FRAME_IDS).toEqual(["none", "ring-thin", "ring-medium"]);
  });

  it("are drawn as the catalogue draws them: the same shape, the same two circles, for each ring", async () => {
    for (const [frame, id] of [["ring-thin", "eiraku-sen"], ["ring-medium", "maru-ni-ume-bachi"]]) {
      const made = ringOf(frame);
      const real = await construction(id);
      expect(made.shape.d).toBe(real.shapes[0].d);
      expect(made.shape.rule).toBe("evenodd");
      expect(made.guides.map((g) => g.d)).toEqual(real.guides.filter((g) => g.part === "frame").map((g) => g.d));
    }
  });

  it("leave the room inside the ring less the white gap, and the whole layout circle with none", () => {
    expect(roomOf("none")).toBe(96);
    expect(roomOf("ring-medium")).toBeCloseTo(96 - 16.8 - 3.5, 9);
    expect(roomOf("ring-thin")).toBeCloseTo(96 - 6.4 - 3.5, 9);
  });
});

describe("what can be built", () => {
  it("is the counts each arrangement can really be set out at, and no others", () => {
    expect(Object.keys(ARRANGEMENT_COUNTS)).toEqual(["single", "radial", "ring", "rows", "facing"]);
    for (const [arrangement, counts] of Object.entries(ARRANGEMENT_COUNTS)) for (const n of COUNTS) expect(canBuild(arrangement, n)).toBe(counts.includes(n));
    expect(() => compose({ unit: unitConstructions.get("janome"), arrangement: "facing", count: 3 }, TOOLS)).toThrow(RangeError);
    expect(() => compose({ unit: unitConstructions.get("janome"), frame: "hexagon" }, TOOLS)).toThrow(RangeError);
  });

  it("sets copies out in circles that touch one another and the room, and a row across its diameter", () => {
    for (const arrangement of ["radial", "ring"]) {
      for (const n of ARRANGEMENT_COUNTS[arrangement]) {
        for (const room of [96, 75.7]) {
          const places = placings(arrangement, n, room, 90, true);
          const r = places[0].k * 96;
          expect(places).toHaveLength(n);
          // Each copy's circle touches the room's, and the next copy's.
          expect(places[0].pitch + r).toBeCloseTo(room, 9);
          const [a, b] = [places[0], places[1]];
          expect(Math.hypot(a.dx - b.dx, a.dy - b.dy)).toBeCloseTo(2 * r, 9);
        }
      }
    }
    for (const n of ARRANGEMENT_COUNTS.rows) {
      const places = placings("rows", n, 96, 90, false);
      const r = places[0].k * 96;
      expect(places[0].dx - r).toBeCloseTo(-96, 9);
      expect(places[n - 1].dx + r).toBeCloseTo(96, 9);
    }
  });
});

describe("composing", () => {
  const unframed = MANIFEST.filter((one) => one.frame === "none" && one.motifs.length === 1 && one.redrawing !== true);

  it("has unframed crests and units across the catalogue", () => {
    expect(unframed.length).toBeGreaterThan(90);
    expect(units.size).toBeGreaterThan(60);
  });

  it.each(unframed.map((one) => one.id))("keeps %s exact with one copy and no frame", async (id) => {
    const unit = await construction(id);
    const made = compose({ unit, frame: "none", arrangement: "single", count: 1 }, TOOLS);
    expect(made.shapes.map((s) => [s.d, s.group, s.unit, s.turn, s.flip, s.part]), id).toEqual(unit.shapes.map((s) => [s.d, s.group, s.unit, s.turn, s.flip, s.part]));
    expect(made.guides.filter((g) => g.type === "circle").map((g) => [g.d, g.width, g.part]), id).toEqual(unit.guides.filter((g) => g.type === "circle").map((g) => [g.d, g.width, g.part]));
    expect(made.guides.filter((g) => g.type === "line").map((g) => g.d).sort(), id).toEqual(unit.guides.filter((g) => g.type === "line").map((g) => g.d).sort());
    expect(made.steps, id).toEqual(unit.steps);
  });

  it("is the catalogue's ringed crest, to a few hundredths, where that crest is its twin drawn the same way", async () => {
    const same = [];
    for (const ringed of MANIFEST) {
      if (!ringed.frame.startsWith("ring-") || ringed.variantKind !== "frame") continue;
      const base = record(ringed.base);
      if (!units.has(base.motifs[0]?.motif) || base.frame !== "none" || base.motifs.length !== 1 || base.redrawing === true) continue;
      const made = compose({ unit: await construction(base.id), frame: ringed.frame, arrangement: "single", count: 1 }, TOOLS);
      if (sameDrawing(made.shapes, (await construction(ringed.id)).shapes, 0.05)) same.push(ringed.id);
    }
    expect(same.length).toBeGreaterThanOrEqual(20);
    for (const id of ["maru-ni-ume-bachi", "maru-ni-katabami", "maru-ni-kikyo", "maru-ni-mitsu-icho", "maru-ni-omodaka", "maru-ni-hidari-mitsu-tomoe", "maru-ni-hidari-manji", "maru-ni-agehacho"]) expect(same).toContain(id);
  });

  const COMBOS = [
    { frame: "ring-medium", arrangement: "ring", count: 3 },
    { frame: "none", arrangement: "radial", count: 4, mirror: true },
    { frame: "ring-thin", arrangement: "rows", count: 3 },
    { frame: "none", arrangement: "facing", count: 2 },
    { frame: "ring-medium", arrangement: "single", count: 1 },
    { frame: "ring-thin", arrangement: "radial", count: 7 },
  ];

  it.each([...units])("draws %s in the page with struck guides in six arrangements", (motif, one) => {
    const unit = unitConstructions.get(one.id);
    for (const combo of COMBOS) {
      const made = compose({ unit, ...combo }, TOOLS);
      const label = `${motif} ${JSON.stringify(combo)}`;
      const bad = unstruck(made);
      expect(bad.arcs + bad.lines + bad.bare, label).toBe(0);
      const off = offGuides(made);
      expect(off.arcs + off.edges + off.curves, label).toBe(0);
      for (const { d } of [...made.shapes, ...made.guides]) expect(d, label).not.toMatch(/[^MmLlHhVvAaZz\d\s.,-]/);
      expect(reachOf(made.shapes), label).toBeLessThan(99);
      // The compass widths are numbered from 1, the smallest first, and each circle says where it stands.
      const circles = made.guides.filter((g) => g.type === "circle");
      const widths = [...new Set(circles.map((g) => g.width))].sort((a, b) => a - b);
      expect(widths, label).toEqual(widths.map((_, i) => i + 1));
      for (const g of circles) expect(g.at, label).toHaveLength(2);
    }
  });

  it("has guides before ink and each shape drawn exactly once, so the animation plays", () => {
    for (const id of ["ume-bachi", "mitsuba-aoi", "hidari-hitotsu-tomoe", "kikyo", "agehacho", "mitsu-uroko"]) {
      const unit = unitConstructions.get(id);
      for (const combo of COMBOS) {
        const made = compose({ unit, ...combo }, TOOLS);
        const lastGuide = Math.max(...made.steps.flatMap((step, i) => (step.op === "guide" || step.op === "mark" || step.op === "centres" ? [i] : [])));
        const firstInk = made.steps.findIndex((step) => step.op === "trace");
        expect(lastGuide, `${id} ${JSON.stringify(combo)}`).toBeLessThan(firstInk);
        const drawn = made.steps.flatMap((step) => (step.op === "draw" || step.op === "turn" ? step.shapes : [])).sort((a, b) => a - b);
        expect(drawn).toEqual(made.shapes.map((_, i) => i));
        const svg = animatedSvg(made, { id: "kc-test", speed: 4 });
        expect(svg).toContain("@keyframes");
        expect(svg).not.toMatch(/NaN|undefined/);
        expect(staticSvg(made)).not.toMatch(/NaN|undefined/);
      }
    }
  });

  it("builds the first copy in full and the others as it turned, or mirrored, never as copies that move", () => {
    const turned = compose({ unit: unitConstructions.get("hidari-hitotsu-tomoe"), frame: "ring-medium", arrangement: "radial", count: 3 }, TOOLS);
    const [frame, first, second, third] = turned.shapes;
    expect([frame.part, first.unit, second.unit, third.unit]).toEqual(["frame", 0, 1, 2]);
    expect([first.turn, second.turn, third.turn]).toEqual([undefined, 120, -120]);
    expect(second.d).toBe(placePath(first.d, { k: 1, turn: 120 }, 3));
    expect(turned.steps.filter((step) => step.op === "turn")).toHaveLength(1);
    // Only the first copy's circles are struck: the others are shown by the turn, not struck again where the first was turned to.
    const own = turned.guides.filter((g) => g.part !== "frame" && g.type === "circle" && Math.hypot(g.at[0] - 100, g.at[1] - 100) > 1);
    expect(own.length).toBeGreaterThan(0);
    for (const g of own) for (const angle of [120, -120]) {
      const [dx, dy, a] = [g.at[0] - 100, g.at[1] - 100, (angle * Math.PI) / 180];
      const there = [100 + dx * Math.cos(a) - dy * Math.sin(a), 100 + dx * Math.sin(a) + dy * Math.cos(a)];
      expect(turned.guides.some((other) => other.type === "circle" && other.width === g.width && Math.hypot(other.at[0] - there[0], other.at[1] - there[1]) < 0.1)).toBe(false);
    }
    const pair = compose({ unit: unitConstructions.get("hidari-hitotsu-tomoe"), arrangement: "facing", count: 2 }, TOOLS);
    expect(pair.shapes.map((s) => [s.unit, s.turn, s.flip])).toEqual([[0, undefined, undefined], [1, 0, true]]);
    expect(unstruck(pair).arcs).toBe(0);
  });

  it("turns a left tomoe into a right one when it is mirrored", async () => {
    const mirrored = compose({ unit: unitConstructions.get("hidari-hitotsu-tomoe"), mirror: true }, TOOLS);
    expect(sameDrawing(mirrored.shapes, (await construction("migi-hitotsu-tomoe")).shapes, 0.1)).toBe(true);
  });

  it("gives the animation its order: the circles by compass width, and the lines after", () => {
    const made = compose({ unit: unitConstructions.get("kikyo"), frame: "ring-medium", arrangement: "ring", count: 5 }, TOOLS);
    const kinds = made.guides.map((g) => g.type);
    expect(kinds.indexOf("line")).toBeGreaterThan(kinds.lastIndexOf("circle"));
    expect(made.guides[0].d).toBe(ringOf("ring-medium").guides[0].d);
  });

  it("keeps the builder's order for the underdrawing: every crest's guides laid out again come out the same circles in the same order, and the same lines", async () => {
    for (const one of MANIFEST) {
      if (one.redrawing === true) continue;
      const real = await construction(one.id);
      const again = layOut(real.guides.map((g) => ({ ...g })));
      expect(again.filter((g) => g.type === "circle").map((g) => [g.d, g.width, g.part]), one.id).toEqual(real.guides.filter((g) => g.type === "circle").map((g) => [g.d, g.width, g.part]));
      expect(again.filter((g) => g.type === "line").map((g) => g.d).sort(), one.id).toEqual(real.guides.filter((g) => g.type === "line").map((g) => g.d).sort());
    }
  });
});

describe("the motifs", () => {
  it("each stand for a crest of one motif with no frame, the plain one of one when there is one", () => {
    for (const [motif, one] of units) {
      expect(one.frame).toBe("none");
      expect(one.motifs).toHaveLength(1);
      expect(one.motifs[0].motif).toBe(motif);
      expect(one.redrawing).not.toBe(true);
    }
    expect(unitFor(MANIFEST, "tomoe").id).toBe("hidari-hitotsu-tomoe");
    expect(unitFor(MANIFEST, "plum").id).toBe("ume-bachi");
    expect(unitFor(MANIFEST, "karahana").id).toBe("karahana");
    expect(unitFor(MANIFEST, "wisteria").id).toBe("sagari-fuji");
    // A motif only drawn traced from a crest book, or only inside another, has no unit to compose from.
    for (const motif of ["tachibana", "gentian", "ship", "sword", "wave", "sun-disc"]) expect(units.has(motif), motif).toBe(false);
  });
});

describe("what the catalogue says of it", () => {
  const found = (id, rest) => sameParts(MANIFEST, specOf(id, rest)).map((one) => one.id);

  it("finds the crest with the same frame, motif, count and arrangement", () => {
    expect(found("ume-bachi", { frame: "ring-medium" })).toEqual(["maru-ni-ume-bachi"]);
    expect(found("karahana", { arrangement: "ring", count: 3 })).toEqual(["mitsumori-karahana"]);
    expect(found("hidari-hitotsu-tomoe", { frame: "ring-medium", arrangement: "radial", count: 3 })).toEqual(["maru-ni-hidari-mitsu-tomoe"]);
    expect(found("hidari-hitotsu-tomoe", { frame: "ring-medium", arrangement: "radial", count: 3, mirror: true })).toEqual(["maru-ni-migi-mitsu-tomoe"]);
  });

  it("finds nothing where the parts are not a crest's: a count that is not the motif's, an upright cluster of a turned motif, a mirror the catalogue does not name", () => {
    expect(found("ume-bachi", { arrangement: "ring", count: 3 })).toEqual([]);
    expect(found("hidari-hitotsu-tomoe", { arrangement: "ring", count: 3 })).toEqual([]);
    expect(found("hidari-manji", { mirror: true })).toEqual([]);
    expect(found("janome", { arrangement: "rows", count: 4 })).toEqual([]);
  });

  it("knows a drawing from another: a ring's twin is the same, a cluster set out its own way is not", async () => {
    const one = compose({ unit: unitConstructions.get("ume-bachi"), frame: "ring-medium" }, TOOLS);
    expect(sameDrawing(one.shapes, (await construction("maru-ni-ume-bachi")).shapes)).toBe(true);
    const three = compose({ unit: unitConstructions.get("karahana"), arrangement: "ring", count: 3 }, TOOLS);
    expect(sameDrawing(three.shapes, (await construction("mitsumori-karahana")).shapes)).toBe(false);
  });
});

describe("the names", () => {
  it("are said in the crest grammar, in English and in Japanese", () => {
    const plum = specOf("ume-bachi", { frame: "ring-medium", arrangement: "ring", count: 3 });
    expect(nameIn(plum, "ja")).toBe("丸に三つ盛り梅鉢");
    expect(nameIn(plum, "en")).toBe("Plum bowl, three clustered in a medium ring");
    expect(nameIn(specOf("ume-bachi", { frame: "ring-thin" }), "ja")).toBe("丸に梅鉢");
    expect(nameIn(specOf("karahana", { arrangement: "ring", count: 3 }), "ja")).toBe("三つ盛り唐花");
    expect(nameIn(specOf("karahana", { arrangement: "ring", count: 5 }), "ja")).toBe("五つ盛り唐花");
    expect(nameIn(specOf("karahana", { arrangement: "rows", count: 2 }), "ja")).toBe("二つ並び唐花");
    expect(nameIn(specOf("karahana", { arrangement: "facing", count: 2 }), "ja")).toBe("向かい唐花");
    expect(nameIn(specOf("karahana", { arrangement: "facing", count: 2 }), "en")).toBe("Arabesque flower, a facing pair");
  });

  it("name copies turned about the centre by the count alone, as the crest books do (六つ唐花), and say how in English", () => {
    expect(nameIn(specOf("karahana", { arrangement: "radial", count: 5 }), "ja")).toBe("五つ唐花");
    expect(nameIn(specOf("karahana", { arrangement: "radial", count: 5 }), "en")).toBe("Arabesque flower, five turned about the centre");
    expect(nameIn(specOf("karahana", { frame: "ring-thin", arrangement: "radial", count: 6 }), "ja")).toBe("丸に六つ唐花");
    for (const name of Object.values(WORDS.ja)) expect(name).not.toContain("巡り");
  });

  it("name a motif with a turn by turn, count and motif, exactly as the catalogue names its tomoe", () => {
    expect(nameIn(specOf("hidari-hitotsu-tomoe", { frame: "ring-medium", arrangement: "radial", count: 3 }), "ja")).toBe("丸に左三つ巴");
    expect(nameIn(specOf("hidari-hitotsu-tomoe", { frame: "ring-medium", arrangement: "radial", count: 3, mirror: true }), "ja")).toBe("丸に右三つ巴");
    expect(nameIn(specOf("hidari-hitotsu-tomoe", { mirror: true }), "en")).toBe("Right tomoe");
    expect(nameIn(specOf("hidari-hitotsu-tomoe", { arrangement: "radial", count: 3 }), "en")).toBe("Left tomoe, three turned about the centre");
    // Every tomoe of the catalogue that the same parts compose is named as the catalogue names it, in both languages' Japanese.
    let held = 0;
    for (const one of MANIFEST) {
      const use = one.motifs[0];
      if (use.motif !== "tomoe" || one.motifs.length !== 1 || use.turn === undefined) continue;
      const spec = specOf("hidari-hitotsu-tomoe", { frame: one.frame, arrangement: use.count === 1 ? "single" : "radial", count: use.count, mirror: use.turn === "right" });
      expect(sameParts(MANIFEST, spec).map((found) => found.id), one.id).toContain(one.id);
      expect(nameIn(spec, "ja"), one.id).toBe(one.name.ja);
      held += 1;
    }
    expect(held).toBeGreaterThanOrEqual(9);
  });

  it("swap 左 and 右 in a unit's own name when it is mirrored, and say 左右反転 only where there is none", () => {
    expect(nameIn(specOf("hidari-manji", { mirror: true }), "ja")).toBe("右万字");
    expect(nameIn(specOf("hidari-manji", { mirror: true }), "en")).toBe("Right manji");
    expect(nameIn(specOf("hidari-manji", { frame: "ring-medium" }), "ja")).toBe("丸に左万字");
    expect(nameIn(specOf("karigane", { mirror: true }), "ja")).toBe("雁金（左右反転）");
    expect(nameIn(specOf("karigane", { mirror: true }), "en")).toBe("Wild goose (mirrored)");
  });
});
