// Shells measured from frame 7 of the 1892 crest book, with the local y axis pointing up.
import type { Builder } from "../../construct/builder.ts";
import { carve, circleThrough, DEG, disc, onPage, seg, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Placing, Region, V } from "../../construct/compass.ts";

const curve = (from: V, to: V, radius: number, hint: V) => shortArc(circleThrough(from, to, radius, hint), from, to);

const rib = (from: V, to: V, radius: number, hint: V, width: number): Region => {
  const piece = curve(from, to, radius, hint);
  return piece.t === "A" ? thickArc(piece.c, radius, width, piece.a0, piece.a1) : thickSeg(from, to, width);
};

/** The two valves meet in a low lens; the solid cap carries the marks of growth. */
const clam = (opening: "oblique" | "low", markings: "growth" | "mesh" | "few"): Region[] => {
  const shoulder: V = [-47, 56];
  const side: V = [46, 62];
  const root: V = [-7, 5];
  const other: V = [13, 6];
  const upper = curve(shoulder, side, 68, [2, 0]);
  const right = curve(side, other, 104, [-79, 18]);
  const heel = curve(other, root, 16, [3, 18]);
  const left = curve(root, shoulder, 72, [29, 57]);
  const ground: Region = [upper, right, heel, left];
  const ends: [V, V] = opening === "oblique" ? [[-5, -2], [49, 63]] : [[-40, 48], [17, 7]];
  const [from, to] = ends;
  const mouth = [curve(from, to, opening === "oblique" ? 50 : 36, [-29, 79]), curve(to, from, opening === "oblique" ? 88 : 58, [66, -18])];
  const hinge = rib(from, to, opening === "oblique" ? 80 : 43, [-26, 81], 2.4);
  const stripes = markings === "few"
    ? [rib([-30, 46], [-15, 62], 27, [7, 30], 2.2), rib([-24, 38], [-8, 56], 33, [16, 29], 2.2), rib([-15, 32], [0, 48], 27, [17, 26], 2.2)]
    : [rib([-39, 53], [27, 63], 69, [-5, -16], 2.4), rib([-33, 45], [21, 54], 53, [-2, 0], 2.0), rib([-28, 36], [15, 45], 47, [-5, -7], 2.1), rib([-23, 26], [9, 34], 39, [-7, 1], 2.1), rib([-15, 18], [2, 23], 30, [-3, -6], 1.8)];
  const mesh = markings === "mesh" ? [-26, -12, 2, 16].map((x) => rib([x - 10, 64], [x + 7, 19], 47, [x + 38, 48], 1.8)) : [];
  return carve([ground, mouth], [...stripes, ...mesh, hinge]);
};

export const mitsuHamaguriBuild = (c: Builder): void => {
  c.precision(3);
  const shell = clam("oblique", "growth");
  c.guideCircle([100, 100], 96);
  c.guideSpokes(3, 0, 96);
  for (const turn of [0, 120, 240]) {
    const place: V = [3.5 * Math.sin(turn * DEG), 3.5 * Math.cos(turn * DEG)];
    c.fill("shell", toPath(shell, { at: place, k: 1.06, turn }));
  }
};


export const maruNiFutatsuHamaguriBuild = (c: Builder): void => {
  c.precision(3);
  c.ring("ring-thin");
  const high: Placing = { k: 0.73, at: [-33, 6], turn: 32 };
  const low: Placing = { k: 0.87, at: [27, -67], turn: -13 };
  const stippled = clam("low", "few");
  const patterned = clam("low", "mesh");
  for (const shell of [high, low]) c.guideCircle(onPage([0, 40], shell), 36 * shell.k);
  c.fill("shell", toPath(stippled, high));
  c.fill("shell", toPath(patterned, low));
};


export const maruNiMitsuHamaguriBuild = (c: Builder): void => {
  c.precision(3);
  const form = clam("low", "few");
  c.ring("ring-thin");
  c.guideSpokes(3, 0, 88);
  for (const turn of [0, 120, 240]) c.fill("shell", toPath(form, { k: 0.88, turn: turn - 17 }));
};
