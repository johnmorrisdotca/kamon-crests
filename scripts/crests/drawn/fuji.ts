// Wisteria from the labelled 1892 crest book, with y up in the drawing frame.
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, carve, circleThrough, disc, mirrored, onPage, seg, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
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

/** Rounded shoulders frame the wide central leaf, with a low bridge between the two hanging sprays. */
export const shibataFujiBuild = (c: Builder): void => {
  c.precision(3);
  const k = 0.97;
  const leafGap = [bow([5, 24], [63, 17], 18), bow([63, 17], [5, 24], 12)];
  const sprays = hangingCluster(8, 8, 36, 58).flatMap((floret) => carve([floret], [leafGap]));
  const upright = leaf([0, 30], [0, 94], 15.8, 15.8, 0.5);
  const side = leaf([7, 23], [60, 18], 15.8, 10, 3.4);
  const shoulder = [
    bow([7, 91], [33, 87], 3.4),
    bow([33, 87], [56, 65], 7.6),
    bow([56, 65], [46, 44], 2.8),
    bow([46, 44], [12, 32], 3.3),
    bow([12, 32], [7, 91], -12.9),
  ];
  const bar = bow([-21, -20], [21, -20], 3.5);
  const band = bar.t === "A" ? thickArc(bar.c, bar.r, 6.1, bar.a0, bar.a1) : thickSeg([-21, -20], [21, -20], 6.1);
  const bridge = carve([band, disc([-21, -20], 4.6), disc([21, -20], 4.6)], []);
  const knot = carve([thickSeg([0, 4], [0, 22], 10.4), thickSeg([-7, 18], [7, 18], 4.5)], []);
  c.guideCircle(C0, 96);
  c.guideLine([100, 4], [100, 196]);
  for (const mirror of [false, true]) c.fill(PART, toPath([...sprays, ...side, shoulder], { k, mirror }));
  c.fill(PART, toPath([...upright, ...knot, ...bridge], { k }));
};
