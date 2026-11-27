import type { Builder } from "../../construct/builder.ts";
import { carve, circleThrough, disc, mirrored, reversedRun, seg, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";

const short = (from: V, to: V, radius: number, hint: V) => shortArc(circleThrough(from, to, radius, hint), from, to);

export function mamezoKiriBuild(c: Builder): void {
  c.precision(2);
  c.ring("ring-thin");
  const edge = [
    seg([0, 0], [32.1, 0]),
    short([32.1, 0], [28.7, -20.6], 46, [-13, 0]),
    short([28.7, -20.6], [15.2, -28.8], 16, [15, -15]),
    short([15.2, -28.8], [13, -44.7], 23, [-9, -32]),
    short([13, -44.7], [0, -48.8], 15.9, [0, -33]),
  ];
  const half = short([15.1, -34.5], [14.6, -20.1], 17, [2, -29]) as Extract<Piece, { t: "A" }>;
  const fold = thickArc(half.c, half.r, 1.9, Math.min(half.a0, half.a1), Math.max(half.a0, half.a1));
  const cloak = carve([[...edge, ...reversedRun(edge.map(mirrored))]], [fold, fold.map(mirrored)]);
  const cap = [[seg([0, 17], [12.5, 4.2]), seg([12.5, 4.2], [-12.5, 4.2]), seg([-12.5, 4.2], [0, 17])]];
  for (const x of [-50.5, 50.5]) {
    const at: V = [x, 26];
    c.group(() => {
      c.fill("paulownia", toPath(cloak, { k: 1, at }), "evenodd");
      c.fill("paulownia", toPath([...cap, thickSeg([0, 0], [0, 42], 2.3), disc([0, 42], 5.1)], { k: 0.93, at }));
    });
  }
  const at: V = [0, -4];
  c.group(() => {
    c.fill("paulownia", toPath(cloak, { k: 1, at }), "evenodd");
    c.fill("paulownia", toPath([...cap, thickSeg([0, 0], [0, 82], 2.7), disc([0, 82], 5.2)], { k: 1, at }));
  });
  for (const direction of [false, true]) {
    c.fill("paulownia", toPath([thickSeg([0, 46], [17.4, 60.7], 2.45), disc([17.4, 60.7], 5.3)], { k: 1, at, mirror: direction }));
  }
}

const paired = (half: Piece[]): Region => [...half, ...reversedRun(half.map(mirrored))];

const arcBand = (from: V, to: V, radius: number, centre: V, weight: number): Region => {
  const arc = short(from, to, radius, centre) as Extract<Piece, { t: "A" }>;
  return thickArc(arc.c, arc.r, weight, Math.min(arc.a0, arc.a1), Math.max(arc.a0, arc.a1));
};

function kiriWings(c: Builder, scalloped: boolean): void {
  const lower = scalloped
    ? [
        short([94, -15], [89, -34], 13, [80, -17]),
        short([89, -34], [74, -45], 22, [71, -25]),
        short([74, -45], [58, -43], 16, [67, -28]),
        short([58, -43], [47, -51], 14, [54, -37]),
        short([47, -51], [37, -64], 13, [34, -51]),
        short([37, -64], [28, -73], 12, [28, -61]),
        short([28, -73], [14, -84], 13, [17, -71]),
        short([14, -84], [0, -90], 18, [1, -72]),
      ]
    : [
        short([94, -15], [82, -43], 34, [60, -21]),
        short([82, -43], [45, -55], 63, [41, 8]),
        short([45, -55], [36, -52], 21, [45, -34]),
        short([36, -52], [23, -73], 29, [9, -49]),
        short([23, -73], [0, -81], 40, [0, -41]),
      ];
  const outer = paired([
    short([0, 5], [38, 16], 66, [33, -50]),
    short([38, 16], [73, 11], 66, [46, -49]),
    short([73, 11], [94, -15], 32, [63, -20]),
    ...lower,
  ]);
  const side = [
    short([11, -2], [42, 6], 60, [44, -58]),
    short([42, 6], [69, 2], 43, [50, -33]),
    short([69, 2], [81, -18], 23, [58, -17]),
    short([81, -18], [67, -37], 22, [60, -15]),
    short([67, -37], [47, -39], 36, [56, -5]),
    short([47, -39], [28, -18], 38, [8, -52]),
    short([28, -18], [11, -2], 39, [-7, -38]),
  ];
  const low = paired([
    short([0, -13], [17, -38], 41, [-21, -43]),
    short([17, -38], [18, -53], 21, [1, -47]),
    short([18, -53], [0, scalloped ? -69 : -65], 20, [0, -46]),
  ]);
  const rib = arcBand([7, -5], [43, -13], 34, [31, -30], 2.2);
  const core = disc([0, 0], 11.3);
  c.fill("paulownia", toPath(carve([outer], [side, side.map(mirrored), low, rib, rib.map(mirrored), core]), { k: 1 }), "evenodd");
  c.fill("paulownia", toPath([disc([0, 0], 9.35)], { k: 1 }));
}


export function korinKiriBuild(c: Builder): void {
  c.precision(2);
  c.guideCircle(C0, R);
  kiriWings(c, false);
  c.fill("paulownia", toPath([thickSeg([0, 11], [0, 76], 3.05), disc([0, 76], 10.2)], { k: 1 }));
  for (const mirror of [false, true]) {
    const placing = { k: 1, mirror };
    c.group(() => {
      c.fill("paulownia", toPath([thickSeg([63.5, 14], [63.5, 54], 2.9), disc([63.5, 54], 9.8)], placing));
      const sprays: Region[] = [
        arcBand([0, 27], [19, 41], 33, [0, 63], 2.65), disc([19, 41], 8.35),
        arcBand([0, 48], [20, 60], 33, [0, 77], 2.65), disc([20, 60], 8.35),
        arcBand([63.5, 21], [82, 35], 31, [64, 49], 2.5), disc([82, 35], 8.55),
        arcBand([63.5, 21], [43.5, 35], 31, [59, 49], 2.5), disc([43.5, 35], 8.55),
      ];
      c.fill("paulownia", toPath(sprays, placing));
    });
  }
}
