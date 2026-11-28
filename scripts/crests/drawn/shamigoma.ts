// Shamisen bridges measured from frame 33 left of the 1892 crest book.
import type { Builder } from "../../construct/builder.ts";
import { carve, circleThrough, disc, mirrored, reversedRun, seg, shortArc, thickSeg, toPath, type Region, type V } from "../../construct/compass.ts";

const bridge = (hole: number): Region[] => {
  const top: V = [51, 28];
  const waist: V = [34, 5];
  const foot: V = [96, -29];
  const rightSide = [
    shortArc(circleThrough(top, waist, 24.5, [56, 4]), top, waist),
    shortArc(circleThrough(waist, foot, 91, [88, 42]), waist, foot),
  ];
  const leftTop: V = [-top[0], top[1]];
  const leftFoot: V = [-foot[0], foot[1]];
  const shell = [
    seg(leftTop, top),
    ...rightSide,
    seg(foot, leftFoot),
    ...reversedRun(rightSide.map(mirrored)),
  ];
  const slots = [-23, 0, 23].map((x) => thickSeg([x, 21], [x, 32], 1.3));
  return carve([shell], [disc([0, -5], hole), ...slots]);
};

/** Two lower bridges support a broader bridge centred above them. */
export const mitsuShamigomaBuild = (c: Builder): void => {
  c.precision(3);
  c.guideLine([100, 4], [100, 196]);
  c.fill("shamisen-bridge", toPath(bridge(13), { k: .77, at: [0, 22.33] }));
  const lower = bridge(19);
  for (const x of [-44.5, 44.5]) {
    c.fill("shamisen-bridge", toPath(lower, { k: .46, at: [x, -13.5] }));
  }
};

/**
 * One bridge alone (frame 33, left r1c4), the same bridge as the stack's: the book's is 300 across the foot, 163 across the top,
 * 108 at the waist and 89 high, the hole 54 across, its middle 36 above the foot. It stands on the page's middle, its foot's corners
 * on the layout circle.
 */
export const hitotsuShamigomaBuild = (c: Builder): void => {
  const k = 96 / Math.hypot(96, 28.5);
  c.guideLine([100, 4], [100, 196]);
  c.guideCircle([100, 100], 96);
  c.fill("shamisen-bridge", toPath(bridge(17.3), { k, at: [0, 0.5 * k] }));
};
