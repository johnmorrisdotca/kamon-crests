import type { Builder } from "../../construct/builder.ts";
import { carve, circleThrough, disc, mirrored, shortArc, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const bow = (from: V, to: V, radius: number, hint: V): Piece => shortArc(circleThrough(from, to, radius, hint), from, to);

/** The paired needle sweeps turn round the three scaled pine cones. */
export function mitsuMatsubaMatsukasaBuild(c: Builder): void {
  c.precision(3);
  const part = "pine";
  const tip: V = [0, 66];
  const root: V = [0, 20];
  const flank = bow(root, tip, 26, [-18, 43]);
  const cone = [flank, mirrored(bow(tip, root, 26, [-18, 43]))];
  const scales: Region[] = [];
  for (const y of [24, 34, 44, 54, 64]) {
    scales.push(thickSeg([-13, y - 5], [13, y + 8], 1.65));
    scales.push(thickSeg([-13, y + 8], [13, y - 5], 1.65));
  }
  const body = carve([cone], scales);
  const stem = thickSeg([0, 6], [0, 23], 4);
  const tips = [
    thickArc([-11, 65], 11, 3.5, -0.34, 0.78),
    thickArc([11, 65], 11, 3.5, 2.36, 3.48),
  ];
  const sweep = bow([0, 94], [35, 20], 47, [-7, 56]) as Extract<Piece, { t: "A" }>;
  const rails = [
    thickArc(sweep.c, sweep.r, 3.3, sweep.a0, sweep.a1),
    thickArc(sweep.c, sweep.r - 5.2, 2.5, sweep.a0, sweep.a1),
  ];
  const scroll = bow([35, 20], [11, 2], 21, [14, 31]) as Extract<Piece, { t: "A" }>;
  const hook = thickArc(scroll.c, scroll.r, 3.2, scroll.a0, scroll.a1);

  c.guideCircle(C0, R);
  c.guideSpokes(3, 0, R);
  c.fill(part, toPath([disc([0, 0], R), disc([0, 0], R - 3.4)], { k: 1 }), "evenodd");
  for (const turn of [0, 120, 240]) {
    c.group(() => {
      c.fill(part, toPath([stem, ...rails, hook, ...tips], { k: 1, turn }));
      c.fill(part, toPath(body, { k: 1, turn }), "evenodd");
    });
  }
  c.fill(part, toPath([disc([0, 0], 7.4)], { k: 1 }));
}
