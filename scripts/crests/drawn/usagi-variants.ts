// The three rabbit profiles of frame 25 in the 1892 crest book, with the local y axis pointing up.
import type { Builder } from "../../construct/builder.ts";
import { arcA, carve, circleThrough, seg, shortArc, toPath, vadd } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

const curve = (from: V, to: V, radius: number, centreSide: V) => shortArc(circleThrough(from, to, radius, centreSide), from, to);

const move = (regions: Region[], by: V): Region[] =>
  regions.map((region) => region.map((edge) => edge.t === "L"
    ? seg(vadd(edge.a, by), vadd(edge.b, by))
    : arcA(vadd(edge.c, by), edge.r, edge.a0, edge.a1)));

export const mitsuUsagiBuild = (c: Builder): void => {
  c.precision(3);
  const brow: V = [-46, -1];
  const nose: V = [-51, -23];
  const cheek: V = [-30, -48];
  const foot: V = [-9, -63];
  const base: V = [46, -76];
  const rump: V = [47, -40];
  const back: V = [25, 1];
  const body = [
    curve(brow, nose, 28, [-27, -16]),
    curve(nose, cheek, 48, [-58, -51]),
    curve(cheek, foot, 38, [8, -37]),
    curve(foot, base, 171, [49, 91]),
    curve(base, rump, 83, [-36, -55]),
    curve(rump, back, 53, [0, -38]),
    curve(back, brow, 54, [-13, -38]),
  ];
  const nearEar = [
    curve([-47, -5], [-41, 38], 68, [18, 8]),
    curve([-41, 38], [-6, 72], 104, [38, -12]),
    curve([-6, 72], [-29, 32], 111, [77, -2]),
    curve([-29, 32], [-30, 1], 62, [30, 17]),
    seg([-30, 1], [-47, -5]),
  ];
  const farEar = [
    curve([-35, 3], [-22, 39], 71, [36, -5]),
    curve([-22, 39], [5, 68], 108, [56, -15]),
    curve([5, 68], [-10, 40], 142, [116, -3]),
    curve([-10, 40], [-16, 6], 87, [69, 3]),
    seg([-16, 6], [-35, 3]),
  ];

  const rabbit = carve([body, nearEar, farEar], []);
  const front: V = [-37, -3];
  const middle: V = [4, 2];
  const rear: V = [45, 7];
  const gap: V = [2.7, 0.8];
  const frontRabbit = move(rabbit, front);
  const frontEdge = [...frontRabbit, ...move(rabbit, vadd(front, gap))];
  const middleRabbit = move(rabbit, middle);
  const middleEdge = [...middleRabbit, ...move(rabbit, vadd(middle, gap))];

  c.fill("rabbit", toPath(carve(move(rabbit, rear), middleEdge), { k: 1 }));
  c.fill("rabbit", toPath(carve(middleRabbit, frontEdge), { k: 1 }));
  c.fill("rabbit", toPath(frontRabbit, { k: 1 }));
};
