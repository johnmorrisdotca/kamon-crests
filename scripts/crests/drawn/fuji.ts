// Wisteria from the labelled 1892 crest book, with y up in the drawing frame.
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, carve, circleThrough, disc, mirrored, onPage, rotated, seg, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Placing, Region, V } from "../../construct/compass.ts";

const PART = "wisteria";
const at = (r: number, angle: number): V => [r * Math.sin(angle * DEG), r * Math.cos(angle * DEG)];

/** Strike a bow through two marks with a given rise to the left of the chord. */
const bow = (a: V, b: V, rise: number) => {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const chord = Math.hypot(dx, dy);
  const r = chord ** 2 / (8 * Math.abs(rise)) + Math.abs(rise) / 2;
  const side = Math.sign(rise);
  const centre: V = [(a[0] + b[0]) / 2 + (side * dy * r) / chord, (a[1] + b[1]) / 2 - (side * dx * r) / chord];
  return shortArc(circleThrough(a, b, r, centre), a, b);
};

const leaf = (foot: V, tip: V, left: number, right: number, vein: number): Region[] => {
  const blade = [bow(foot, tip, left), bow(tip, foot, right)];
  const along = (n: number): V => [foot[0] + n * (tip[0] - foot[0]), foot[1] + n * (tip[1] - foot[1])];
  const ray = bow(along(0.12), along(0.87), vein);
  const slit = ray.t === "A" ? thickArc(ray.c, ray.r, 2.1, ray.a0, ray.a1) : thickSeg(along(0.12), along(0.87), 2.1);
  return carve([blade], [slit]);
};

/** Two plump rows follow the same stem, with short bowed divisions across the florets. */
const hangingCluster = (outerCount = 10, innerCount = 8, outerStart = 30, innerStart = 58): Region[] => {
  const point = (r: number, angle: number): V => {
    const [x, y] = at(r, angle);
    return [x, y + 4];
  };
  const spine = (angle: number): number => 60 + ((angle - 30) * 21) / 142;
  const outerRim = (t: number): number => 87 + 4 * Math.sin(t * Math.PI) + 2.3 * t;
  const innerRim = (t: number): number => 42.5 + 29 * t;

  const row = (first: number, last: number, count: number, inside: boolean): Region[] => {
    const pitch = (last - first) / count;
    const side = inside ? -1 : 1;
    const skew = inside ? 5.4 : 3.8;
    const rim = inside ? innerRim : outerRim;

    return Array.from({ length: count }, (_, i): Region => {
      const a = first + i * pitch + 0.64;
      const b = first + (i + 1) * pitch - 0.64;
      const foot = point(spine(a) + side * 0.95, a);
      const heel = point(spine(b) + side * 0.95, b);
      const tip = point(rim(i / count), a + skew);
      const next = point(rim((i + 1) / count), b + skew);
      return [bow(foot, tip, -1.65), bow(tip, next, side * 3.0), bow(next, heel, 1.65), bow(heel, foot, -side * 0.72)];
    });
  };

  return [...row(outerStart, 170.1, outerCount, false), ...row(innerStart, 171.2, innerCount, true)];
};

/** Three leaves and the knot, above the two racemes of 下り藤. */
const hangingCrown = (): Region[] => {
  const side = leaf([8, 21], [59, 17], 15.3, 10.5, 3.2);
  const knot: V[] = [[-5.5, 19], [5.5, 19], [5, 8], [7.7, 0], [-7.7, 0], [-5, 8]];
  const upperEdge: V[] = [[5, 89], [21, 86], [37, 78], [48, 66], [53, 52]];
  const shoulder: Region = upperEdge.slice(0, -1).map((point, i) => bow(point, upperEdge[i + 1], 2.5));
  shoulder.push(bow([53, 52], [28, 38], 2.9), bow([28, 38], [10, 32], 2.1), bow([10, 32], [5, 89], -14.7));
  return [
    ...leaf([0, 29], [0, 94], 14.3, 14.3, 0.5),
    shoulder,
    shoulder.map(mirrored),
    ...side,
    ...side.map((loop) => loop.map(mirrored)),
    knot.map((p, i) => seg(p, knot[(i + 1) % knot.length])),
  ];
};

export const sagariFujiBuild = (c: Builder): void => {
  c.precision(3);
  const placing: Placing = { k: 0.97 };
  const clearance = [bow([6.4, 21.4], [61.6, 16.9], 17), bow([61.6, 16.9], [6.4, 21.4], 12)];
  const cluster = hangingCluster().flatMap((floret) => carve([floret], [clearance]));
  c.guideCircle(C0, 96);
  c.guideLine([100, 4], [100, 196]);
  for (const mirror of [false, true]) {
    const side = { ...placing, mirror };
    c.guideCircle(onPage([0, 4], side), 70 * placing.k);
    c.fill(PART, toPath(cluster, side));
  }
  c.fill(PART, toPath(hangingCrown(), placing));
};

/** Three long leaves rise from a short stalk below the upward racemes. */
const risingCrown = (height: number, breadth: number): Region[] => {
  const root: V = [0, -86];
  const side = leaf([7, -88], [81, -35], 11.5, 13.8, 2.9);
  const knot: V[] = [[-7, -94], [7, -94], [6, -82], [-6, -82]];
  return [
    ...leaf([0, -81], [0, height], breadth, breadth, 0.8),
    ...side,
    ...side.map((loop) => loop.map(mirrored)),
    knot.map((point, i) => seg(point, knot[(i + 1) % knot.length])),
    disc(root, 5.5),
  ];
};

const risingFuji = (c: Builder, height: number, breadth: number, outerCount: number, innerCount: number): void => {
  c.precision(3);
  const k = 0.97;
  const clearance = [bow([6, -90], [82.6, -33], 13.1), bow([82.6, -33], [6, -90], 15.4)]
    .map((piece) => rotated(mirrored(piece), Math.PI));
  const cluster = hangingCluster(outerCount, innerCount, 39, 64).flatMap((floret) => carve([floret], [clearance]));
  c.guideCircle(C0, 96);
  c.guideLine([100, 4], [100, 196]);
  for (const mirror of [false, true]) c.fill(PART, toPath(cluster, { k, mirror, turn: 180 }));
  c.fill(PART, toPath(risingCrown(height, breadth), { k }));
};

export const agariFujiBuild = (c: Builder): void => risingFuji(c, 7, 21.2, 10, 8);

/** The compact head and flared legs of 大 sit above the three leaves in the Okubo crest. */
export const naitoFujiBuild = (c: Builder): void => {
  c.precision(3);
  const k = 0.97;
  const clearSide = [bow([6.2, 19.5], [61.3, 14.7], 16.6), bow([61.3, 14.7], [6.2, 19.5], 12.4)];
  const right = hangingCluster(12, 10, 34, 59).flatMap((floret) => carve([floret], [clearSide]));
  const lamina = [bow([4.5, 91], [4.5, 35], 8.2), bow([4.5, 35], [-4.5, 35], 3.1), bow([-4.5, 35], [-4.5, 91], 8.2), bow([-4.5, 91], [4.5, 91], 3.4)];
  const upright = carve([lamina], [thickSeg([0, 37], [0, 90], 2.1)]);
  const side = leaf([8, 19], [59, 15], 14.9, 10.2, 2.9);
  const rim: V[] = [[7, 90], [23, 90], [39, 85], [51, 76], [57, 63], [50, 50], [24, 39], [9, 34]];
  const shoulder = rim.slice(0, -1).map((point, i) => bow(point, rim[i + 1], 2.4));
  shoulder.push(bow(rim[rim.length - 1], rim[0], -9.8));
  const crown = [shoulder, ...side];
  const knot = carve([thickSeg([0, 6], [0, 22], 10.6), thickSeg([-8, 19], [8, 19], 4.3), thickSeg([-5, 5], [5, 5], 4.4)], []);
  c.guideCircle(C0, 96);
  c.guideLine([100, 4], [100, 196]);
  for (const mirror of [false, true]) c.fill(PART, toPath([...right, ...crown], { k, mirror }));
  c.fill(PART, toPath([...upright, ...knot], { k }));
};

/** The broad legs of 大 flare below its small raised arms. Lines rule the leg bodies, and arcs round their ends. */
export const okuboFujiBuild = (c: Builder): void => {
  risingFuji(c, 1, 18.8, 12, 10);
  const arm = bow([0, 45.5], [19.5, 54.5], -5.6);
  const branch = arm.t === "A" ? thickArc(arm.c, arm.r, 9.5, arm.a0, arm.a1) : thickSeg(arm.a, arm.b, 9.5);
  const leg = [
    bow([0, 34], [15, 36], 3.5),
    bow([15, 36], [26, 25], 3.5),
    seg([26, 25], [37, -3.5]),
    bow([37, -3.5], [24, -6.6], 3.1),
    seg([24, -6.6], [15, 17]),
    bow([15, 17], [0, 22], -3.1),
    seg([0, 22], [0, 34]),
  ];
  const upright = thickSeg([0, 32], [0, 63], 10.4);
  const mark = carve([branch, branch.map(mirrored), leg, leg.map(mirrored), upright], []);
  c.fill(PART, toPath(mark, { k: 0.97 }));
};
