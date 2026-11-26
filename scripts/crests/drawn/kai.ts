// Shells measured from frame 7 of the 1892 crest book, with the local y axis pointing up.
import type { Builder } from "../../construct/builder.ts";
import { arcTo, carve, circleThrough, DEG, disc, onPage, rotated, seg, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Placing, Region, V } from "../../construct/compass.ts";

const curve = (from: V, to: V, radius: number, hint: V) => shortArc(circleThrough(from, to, radius, hint), from, to);

const rib = (from: V, to: V, radius: number, hint: V, width: number): Region => {
  const piece = curve(from, to, radius, hint);
  return piece.t === "A" ? thickArc(piece.c, radius, width, piece.a0, piece.a1) : thickSeg(from, to, width);
};

/** The two valves meet in a low lens; the solid cap carries the marks of growth. */
const clam = (opening: "oblique" | "low", markings: "growth" | "mesh" | "few" | "stipple"): Region[] => {
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
  const dots = markings === "stipple" ? Array.from({ length: 18 }, (_, i) => {
    const row = Math.floor(i / 6);
    const x = (i % 6 - 2.5) * 9 + row * 3;
    return disc([x, 57 - row * 12 + 0.1 * x], 1.1 + (i % 3) * 0.2);
  }) : [];
  return carve([ground, mouth], [...(markings === "stipple" ? [] : stripes), ...mesh, ...dots, hinge]);
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
  const high: Placing = { k: 0.94, at: [-19, -4], turn: -12 };
  const low: Placing = { k: 1.04, at: [16, -68], turn: 8 };
  const stippled = clam("low", "stipple");
  const patterned = clam("low", "mesh");
  for (const shell of [high, low]) c.guideCircle(onPage([0, 40], shell), 36 * shell.k);
  c.fill("shell", toPath(stippled, high));
  c.fill("shell", toPath(patterned, low));
};


/** The smaller opening is to the left of each rounded valve. */
export const maruNiMitsuHamaguriBuild = (c: Builder): void => {
  c.precision(3);
  const left: V = [-43, 51];
  const high: V = [-24, 73];
  const shoulder: V = [27, 67];
  const right: V = [38, 44];
  const low: V = [5, 19];
  const body = [curve(left, high, 35, [-9, 45]), curve(high, shoulder, 53, [3, 27]), curve(shoulder, right, 45, [-3, 35]), curve(right, low, 63, [-9, 75]), curve(low, left, 58, [-13, 64])];
  const opening = rib([-42, 47], [-20, 74], 32, [-1, 39], 3.6);
  const grain = [rib([-31, 46], [-18, 65], 30, [1, 34], 2.2), rib([-22, 42], [-8, 62], 37, [16, 34], 2.2), rib([-14, 46], [1, 63], 42, [27, 32], 2.1)];
  const shell = carve([body], [opening, ...grain]);
  c.ring("ring-thin");
  c.guideSpokes(3, 0, 88);
  for (const turn of [0, 120, 240]) {
    const place: V = [-7.5 * Math.sin(turn * DEG), -7.5 * Math.cos(turn * DEG)];
    c.fill("shell", toPath(shell, { at: place, k: 1.15, turn }));
  }
};


const polar = (r: number, turn: number): V => [r * Math.sin(turn * DEG), r * Math.cos(turn * DEG)];
const reflected = ([x, y]: V): V => [-x, y];

/** A rib widens from the hinge to a rounded tip struck between the radial sides. */
const scallopRib = (reach: number, sector: number): Region => {
  const half = sector * DEG / 2;
  const mid = (reach + 0.9) / (1 + Math.sin(half));
  const cap = { c: [0, mid] as V, r: mid * Math.sin(half) - 0.9 };
  const top: V = [cap.r * Math.cos(half), mid - cap.r * Math.sin(half)];
  const root = polar(13, sector / 2 - Math.asin(0.9 / 13) / DEG);
  return [seg(root, top), arcTo(cap, top, reflected(top), true), seg(reflected(top), reflected(root)), shortArc({ c: [0, 0], r: 13 }, reflected(root), root)];
};

/** Each rib is distinct. The alternating ribs carry round pits or short, transverse growth seams. */
const scallop = (reaches: number[], sector: number): Region[] => {
  return reaches.flatMap((reach, i) => {
    const turn = (i - (reaches.length - 1) / 2) * sector;
    const rib = scallopRib(reach, sector);
    const marks = [0.38, 0.57, 0.76].map((fraction) => reach * fraction);
    const openings = i % 2 === 0
      ? marks.map((y, j) => disc([0, y], 1.8 + j * 0.5))
      : [0.37, 0.42, 0.54, 0.59, 0.72, 0.77].map((fraction) => {
        const r = reach * fraction;
        const halfAngle = (sector / 2 - 2) * DEG;
        return thickArc([0, 0], r, 1.8, Math.PI / 2 - halfAngle, Math.PI / 2 + halfAngle);
      });
    return carve([rib], openings).map((loop) => loop.map((piece) => rotated(piece, -turn * DEG)));
  });
};

const shellHinge = (): Region => {
  const left: V = [-13, 7];
  const right: V = [13, 7];
  return [curve(left, right, 18, [0, -8]), curve(right, left, 19, [0, 22])];
};

export const mukaiItayagaiBuild = (c: Builder): void => {
  c.precision(3);
  const turnover = scallop([94, 96, 97, 98, 97, 96, 94], 20);
  const hinge = shellHinge();
  const start: V = [13, 0];
  const end: V = [96, 0];
  const sidePanel = [curve(start, end, 55, [56, -45]), curve(end, start, 63, [56, 47])];
  const ridges = [rib([35, -9], [37, 10], 18, [22, -1], 1.8), rib([43, -10], [45, 11], 23, [24, 0], 1.8), rib([51, -11], [53, 11], 26, [29, -1], 1.8)];
  const panels = carve([sidePanel], ridges);
  c.guideCircle([100, 100], 96);
  for (const turn of [0, 180]) {
    const placing = { k: 0.94, turn };
    c.fill("shell", toPath(turnover, placing));
    c.fill("shell", toPath(panels, placing));
    c.fill("shell", toPath([hinge], { ...placing, at: [0, turn === 0 ? 3 : -3] }));
  }
};


export const mitsuKumiawaseItayagaiBuild = (c: Builder): void => {
  c.precision(3);
  const fan = scallop([108, 100, 91, 86, 91, 100, 108], 20);
  const hinge = shellHinge();
  c.guideCircle([100, 100], 96);
  c.guideSpokes(3, 0, 82);
  for (const turn of [0, 120, 240]) {
    const placing = { at: polar(82, turn), k: 0.77, turn: turn + 180 };
    c.fill("shell", toPath(fan, placing));
    c.fill("shell", toPath([hinge], { ...placing, at: polar(86, turn) }));
  }
};


export const yotsuItayagaiBuild = (c: Builder): void => {
  c.precision(3);
  const fan = scallop([95, 96, 98, 96, 95], 17);
  const hinge = shellHinge();
  c.guideCircle([100, 100], 96);
  c.guideSpokes(4, 0, 96);
  for (const turn of [0, 90, 180, 270]) {
    c.fill("shell", toPath(fan, { k: 0.96, turn }));
    c.fill("shell", toPath([hinge], { at: polar(5, turn), k: 0.85, turn }));
  }
};
