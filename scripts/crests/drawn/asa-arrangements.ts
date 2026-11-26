// The thin-ring hemp leaf from frame 35 right of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { carve, circleThrough, mirrored, seg, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

/** A fine circle surrounds a single hemp leaf with sawtooth edges and fine veins. */
export const hosowaNiAsaNoHaBuild = (c: Builder, reach: number): void => {
  c.precision(3);
  const half: V[] = [
    [0, 61], [13, 73], [28, 76], [24, 67], [43, 75], [38, 64], [55, 69], [60, 62], [50, 56], [70, 61],
    [76, 52], [69, 44], [84, 45], [79, 34], [90, 30], [81, 23], [91, 16], [84, 12], [92, 4],
    [81, 2], [84, -10], [71, -4], [75, -24], [63, -18], [65, -38], [55, -31], [55, -53],
    [43, -43], [39, -62], [31, -49], [25, -71], [19, -66], [11, -80], [8, -72], [0, -91],
  ];
  const full = [...half, ...half.slice(1, -1).reverse().map(([x, y]): V => [-x, y])];
  const body = full.map((point, i) => seg(point, full[(i + 1) % full.length]));
  const joint: V = [0, 31];
  const rightVeins: Region[] = [];
  for (const [x, y, r, cx, cy] of [
    [60, 54, 92, 18, 112], [81, 19, 98, 43, 115], [71, -17, 114, 57, 105], [48, -45, 103, 102, 42],
    [20, -69, 91, 93, 8],
  ]) {
    const last: V = [x, y];
    const arc = shortArc(circleThrough(joint, last, r, [cx, cy]), joint, last);
    if (arc.t !== "A") throw new Error("The hemp vein must follow a compass circle.");
    rightVeins.push(thickArc(arc.c, arc.r, 2.1, arc.a0, arc.a1));
  }
  const veins = [thickSeg([0, 54], [0, -82], 2.35), ...rightVeins, ...rightVeins.map((vein) => vein.map(mirrored))];
  const k = reach / 96;
  c.guideLine([100, 100 - reach], [100, 100 + reach]);
  c.fill("hemp-foliage", toPath(carve([body], veins), { k }));
};
