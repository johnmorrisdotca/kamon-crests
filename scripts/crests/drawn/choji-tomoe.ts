import type { Builder } from "../../construct/builder.ts";
import { DEG, angleOf, arcA, carve, carveWhere, circleThrough, disc, inside, onCircle, seg, shortArc, thickArc, thickSeg, rotated, toPath, vlen } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const origin: V = [0, 0];
const at = (turn: number, distance: number): V => [distance * Math.sin(turn * DEG), distance * Math.cos(turn * DEG)];
const bow = (from: V, to: V, r: number, hint: V): Piece => shortArc(circleThrough(from, to, r, hint), from, to);

function surround(loop: Region, width: number): Region[] {
  return loop.map((edge) => edge.t === "A"
    ? thickArc(edge.c, edge.r, width, edge.a0, edge.a1)
    : thickSeg(edge.a, edge.b, width));
}

/** The three clove petals sit in the wide end of a white horn that narrows into the tail. */
export function hidariHitotsuChojiTomoeBuild(c: Builder): void {
  c.precision(3);
  c.guideCircle(C0, R);
  const reach = at(151, R);
  const shoulder: V = [-14, 43];
  const head: V = [36, -5];
  const left: V = [-57, -7];
  const low: V = [-51, -49];
  const centre: V = [-18, 7];
  const inner: V = [-46, -33];
  const innerLow: V = [-38, -60];
  const horn: Region = [
    bow(reach, low, 86, [-8, 7]),
    bow(low, left, 70, [15, -15]),
    bow(left, shoulder, 47, [-13, -3]),
    bow(shoulder, head, 46, [-12, -2]),
    bow(head, centre, 65, [3, -51]),
    bow(centre, inner, 56, [10, -35]),
    bow(inner, innerLow, 51, [4, -49]),
    bow(innerLow, reach, 95, [17, 27]),
  ];
  c.fill("tomoe", toPath([disc(origin, R), horn], { k: 1 }), "evenodd");

  const petals: { centre: V; width: number; stem: V; tip: V }[] = [
    { centre: [-14, 23], width: 16, stem: [-13, 4], tip: [-13, 25] },
    { centre: [-40, 5], width: 14, stem: [-29, -9], tip: [-42, 9] },
    { centre: [13, 16], width: 15, stem: [9, 1], tip: [15, 16] },
  ];
  const seam = surround(horn, 3.4);
  const middle = disc(petals[0].centre, petals[0].width + 1.8);
  for (const [i, petal] of petals.entries()) {
    const lobe = disc(petal.centre, petal.width);
    const window = carveWhere([...lobe, ...horn], (point) => inside(lobe, point) && inside(horn, point));
    const vein = thickSeg(petal.stem, petal.tip, 2.5);
    const gaps = [...seam, vein, ...(i === 0 ? [] : [middle])];
    c.fill("clove", toPath(carve(window, gaps), { k: 1 }), "evenodd");
  }
}

/** A petal with three bumps on a head of radius `rim` about `hub`: a core, a top lobe and two side lobes, `height` tall. */
function cloudPetal(hub: V, rim: number, turn: number, height: number, grow = 0): Region[] {
  const from = (angle: number, distance: number): V => [hub[0] + distance * Math.sin(angle * DEG), hub[1] + distance * Math.cos(angle * DEG)];
  const flank = rim + 0.5 * height;
  const spread = Math.asin((0.4 * height) / flank) / DEG;

  return [
    disc(from(turn, rim + 0.38 * height), 0.36 * height + grow),
    disc(from(turn, rim + 0.7 * height), 0.3 * height + grow),
    disc(from(turn - spread, flank), 0.27 * height + grow),
    disc(from(turn + spread, flank), 0.27 * height + grow),
  ];
}

/** Two commas lock together and fill the circle. The three petals of each head lie over the other comma's tail. */
export function kumiawaseFutatsuChojiBuild(c: Builder): void {
  c.precision(3);
  c.guideCircle(C0, R);
  const hub: V = [42, 27];
  const low: V = [-hub[0], -hub[1]];
  const rim = vlen(hub);
  const half = 1.5;
  const leave: V = [hub[0] + (rim * 36) / Math.hypot(36, 33), hub[1] - (rim * 33) / Math.hypot(36, 33)];
  const leaveLow: V = [-leave[0], -leave[1]];
  const toLow = angleOf(hub, low);
  const toHub = angleOf(low, hub);
  const bowlEnd = angleOf(hub, leave) + 2 * DEG;
  const headEnd = angleOf(low, leaveLow) + 2 * DEG;
  const seam: Region = [
    arcA(low, rim + half, headEnd, toHub),
    arcA(hub, rim - half, toLow, bowlEnd),
    seg(onCircle(hub, rim - half, bowlEnd), onCircle(hub, rim + half, bowlEnd)),
    arcA(hub, rim + half, bowlEnd, toLow),
    arcA(low, rim - half, toHub, headEnd),
    seg(onCircle(low, rim - half, headEnd), onCircle(low, rim + half, headEnd)),
  ];
  const tail = bow(leave, at(27, R), 74, [6, 20]);
  if (tail.t !== "A") throw new Error("the tail edge is an arc");
  const out = tail.a1 > tail.a0 ? 4 * DEG : -4 * DEG;
  const tailSeam = thickArc(tail.c, tail.r, 2 * half, tail.a0, tail.a1 + out);
  const tailSeamLow = thickArc([-tail.c[0], -tail.c[1]], tail.r, 2 * half, tail.a0 + Math.PI, tail.a1 + out + Math.PI);

  const gap = 2.6;
  const page = disc(origin, R);
  const fan: [number, number][] = [[-4, 37], [-40, 27], [31, 27]];
  const within = (lobes: Region[], point: V): boolean => lobes.some((lobe) => inside(lobe, point));
  const front = cloudPetal(low, rim, fan[0][0], fan[0][1], gap);
  const inked: Region[][] = [];
  const cuts: Region[] = [];
  for (const [i, [turn, height]] of fan.entries()) {
    const lobes = cloudPetal(low, rim, turn, height);
    const grown = cloudPetal(low, rim, turn, height, gap);
    const foot = disc(low, rim + half);
    const behind = i === 0 ? [] : front;
    const petal = carveWhere([...lobes.flat(), ...foot, ...page, ...behind.flat()], (point) => within(lobes, point) && !inside(foot, point) && inside(page, point) && !within(behind, point));
    const stem: V = [low[0] + (rim + half) * Math.sin(turn * DEG), low[1] + (rim + half) * Math.cos(turn * DEG)];
    const end: V = [low[0] + (rim + 0.6 * height) * Math.sin(turn * DEG), low[1] + (rim + 0.6 * height) * Math.cos(turn * DEG)];
    inked.push(carve(petal, [thickSeg(stem, end, 2.5)]));
    const under = disc(low, rim - half);
    cuts.push(...carveWhere([...grown.flat(), ...under], (point) => within(grown, point) && !inside(under, point)));
  }
  const turnedCuts = cuts.map((loop) => loop.map((piece) => rotated(piece, Math.PI)));
  c.fill("tomoe", toPath(carve([page], [seam, tailSeam, tailSeamLow, ...cuts, ...turnedCuts]), { k: 1 }), "evenodd");
  for (const turn of [0, 180]) {
    c.group(() => {
      for (const petal of inked) c.fill("clove", toPath(petal, { k: 1, turn }), "evenodd");
    });
  }
}
