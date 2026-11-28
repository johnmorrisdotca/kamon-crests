// Jewel figures measured from frame 21 left of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { C0, circle } from "../../construct/geo.ts";
import { DEG, carve, circleThrough, disc, mirrored, onCircle, reversedRun, seg, shortArc, thickArc, toPath, type Region, type V } from "../../construct/compass.ts";

/** Five broad jewel faces turn around the same point. */
export const itsutsuTamaBuild = (c: Builder): void => {
  c.precision(3);
  const next = onCircle([0, 0], 44, 18 * DEG);
  const face = [disc([0, 44], 52)];
  const bands = [
    disc(next, 52.7),
    thickArc([0, 39], 34.5, 2.45, 74 * DEG, 214 * DEG),
    thickArc([0, 29], 23.25, 2.45, 78 * DEG, 225 * DEG),
    thickArc([0, 17], 13.5, 2.3, 88 * DEG, 236 * DEG),
  ];
  const bead = carve(face, bands);
  c.guideCircle(C0, 96);
  for (const turn of [0, 72, 144, 216, 288]) c.fill("sacred-jewel", toPath(bead, { k: .983, turn }));
};

const jewelBow = (start: V, end: V, r: number, hint: V): Region[number] =>
  shortArc(circleThrough(start, end, r, hint), start, end);

const layeredJewel = (): Region[] => {
  const tip: V = [0, 94];
  const upper: V = [28, 62];
  const shoulder: V = [58, 32];
  const waist: V = [66, -3];
  const foot: V = [0, -78];
  const half = [
    jewelBow(tip, upper, 80, [-48, 94]),
    jewelBow(upper, shoulder, 88, [-27, 20]),
    jewelBow(shoulder, waist, 75, [-3, 1]),
    jewelBow(waist, foot, 71, [-1, -6]),
  ];
  const shell = [...half, ...reversedRun(half.map(mirrored))];
  return carve([shell], [
    thickArc([0, 69], 18, 2.6, 182 * DEG, 358 * DEG),
    thickArc([0, 51], 34, 2.7, 182 * DEG, 358 * DEG),
    thickArc([0, 30], 54, 2.75, 195 * DEG, 345 * DEG),
  ]);
};

/** Three jewels turn their pointed ends toward the enclosing circle. */
export const chuwaNiMitsuTamaBuild = (c: Builder, reach: number): void => {
  c.precision(3);
  const bead = layeredJewel();
  c.guideSpokes(6, 0, reach);
  for (const turn of [0, 120, 240]) {
    const at = onCircle([0, 0], reach * .46, (90 - turn) * DEG);
    c.fill("sacred-jewel", toPath(bead, { k: reach * .0049, at, turn }));
  }
};

/**
 * 中輪に玉 (frame 21, left r3c2): one jewel filling a ring drawn at the cell's width. In the book's pixels from the ring's centre:
 * the ring from 142.5 to 152.75; the jewel a circle of 121.5 with a small point at 134.5 up; inside it three loops, circles that
 * rise to the point (radii 84.6, 54.1 and 33.75, their centres 56.1, 82.1 and 100.75 up), drawn as white lines.
 */
export const chuwaNiTamaBuild = (c: Builder): void => {
  const [outer, inner] = [152.75, 142.5];
  const k = 96 / outer;
  c.guideCircle(C0, 96);
  c.guideCircle(C0, inner * k);
  c.fill("frame", circle(C0, 96).join(circle(C0, inner * k)), "evenodd");
  const body = 121.5;
  const tip: V = [0, 134.5];
  // The point: ruled from the tip to where the lines touch the body's circle.
  const touch = (side: 1 | -1): V => {
    const d = Math.hypot(...tip);
    const angle = Math.PI / 2 - side * Math.acos(body / d);
    return onCircle([0, 0], body, angle);
  };
  const point: Region = [seg(tip, touch(-1)), seg(touch(-1), touch(1)), seg(touch(1), tip)];
  const ring = (y: number, r: number): Region[] => [thickArc([0, y], r, 4, 0, Math.PI), thickArc([0, y], r, 4, Math.PI, 2 * Math.PI)];
  const loops = [ring(56.1, 84.6), ring(82.1, 54.1), ring(100.75, 33.75)].flat();
  c.fill("sacred-jewel", toPath(carve([disc([0, 0], body), point], loops), { k }));
};
