import type { Builder } from "../../construct/builder.ts";
import { DEG, carve, circleThrough, disc, mirrored, reversedRun, seg, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
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

export function kiriChoBuild(c: Builder): void {
  c.precision(2);
  c.guideCircle(C0, R);
  kiriWings(c, true);
  for (const mirror of [false, true]) {
    const stem = arcBand([7.7, 9.4], [58.5, 44], 72, [67, -19], 3.05);
    const curl = thickArc([55.5, 52], 9.2, 3.05, -70 * DEG, 186 * DEG);
    c.fill("paulownia", toPath([stem, curl], { k: 1, mirror }));
  }
  const top: Region[] = [
    thickSeg([0, 9.5], [0, 42], 5.4),
    disc([0, 48], 12.6),
    disc([0, 55], 8.1),
    disc([7.4, 46], 8.4),
    disc([-7.4, 46], 8.4),
  ];
  c.fill("paulownia", toPath(top, { k: 1 }));
}

export function agemakiKiriBuild(c: Builder): void {
  c.precision(2);
  c.guideCircle(C0, R);
  const sideLoop = [
    arcBand([8, 1], [39, 10], 86, [43, -74], 5.7),
    arcBand([39, 10], [87, -10], 44, [58, -35], 5.7),
    arcBand([87, -10], [62, -51], 29, [59, -23], 5.7),
    arcBand([62, -51], [10, -15], 61, [60, 11], 5.7),
    thickSeg([10, -15], [8, 1], 5.6),
  ];
  const topLoop = [
    arcBand([2, -8], [-9, 25], 41, [-45, -6], 5.4),
    arcBand([-9, 25], [10.692, 60.552], 36, [25, 29], 5.4),
    thickArc([0, 66], 12, 5.3, -27 * DEG, 205 * DEG),
    arcBand([-10.876, 60.929], [-4, 43], 22, [9, 60], 5.4),
    arcBand([-4, 43], [13, 15], 42, [-28, 5], 5.4),
    thickSeg([13, 15], [11, -9], 5.3),
    thickSeg([11, -9], [2, -8], 5.25),
    disc([10.692, 60.552], 2.75),
    disc([-10.876, 60.929], 2.75),
    disc([-4, 43], 2.75),
    disc([13, 15], 2.75),
  ];
  const downLeft = [
    short([0, -7], [-17, -19], 20, [-1, -24]),
    short([-17, -19], [-32, -58], 65, [-77, -18]),
    short([-32, -58], [0, -86], 33, [0, -53]),
  ];
  const downEye = [
    short([0, -16], [-12, -24], 15, [0, -31]),
    short([-12, -24], [-26, -58], 60, [-73, -20]),
    short([-26, -58], [0, -80], 28, [0, -51]),
  ];
  c.fill("paulownia", toPath(carve([paired(downLeft)], [paired(downEye)]), { k: 1 }), "evenodd");
  c.fill("paulownia", toPath(carve(topLoop, []), { k: 1 }), "evenodd");
  for (const mirror of [false, true]) {
    const placement = { k: 1, mirror };
    const flower: Region[] = [
      arcBand([27, 7], [46, 58], 80, [100, 9], 3.65),
      disc([47, 61], 3.8),
      disc([50, 66], 5.2),
      disc([46.5, 71.3], 4.6),
      disc([54, 70], 3.9),
    ];
    c.group(() => {
      c.fill("paulownia", toPath(carve(sideLoop, []), placement), "evenodd");
      c.fill("paulownia", toPath(flower, placement));
    });
  }
  c.fill("paulownia", toPath([thickSeg([-14, -10], [14, -10], 5.4)], { k: 1 }));
}
