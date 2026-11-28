import type { Builder } from "../../construct/builder.ts";
import { RING_GAP } from "../../construct/builder.ts";
import { DEG, carve, circleThrough, mirrored, moved, reversedRun, rotated, seg, shortArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { R } from "../../construct/geo.ts";

const paddle = (margin = 0): Region[] => {
  const tip: V = [0, 98 + margin];
  const neck: V = [4 + margin, -13 - margin];
  const edge = shortArc(circleThrough(tip, neck, 92 - margin * 1.5, [-77, 42]), tip, neck);
  const blade = [edge, seg(neck, [-neck[0], neck[1]]), ...reversedRun([mirrored(edge)])];
  const shaft = thickSeg([0, -10], [0, -89 - margin], 7 + margin * 2);
  const grip = thickSeg([-22 - margin, -88], [22 + margin, -88], 7 + margin * 2);
  return carve([blade, shaft, grip], []);
};

const turn = (regions: Region[], degrees: number): Region[] => regions.map((region) => region.map((p) => rotated(p, degrees * DEG)));

export const itowaNiChigaiKaiBuild = (c: Builder): void => {
  const inner = c.ring("ring-thread") - RING_GAP;
  const lower = turn(paddle(), 46);
  const upper = turn(paddle(), -46);
  const separation = turn(paddle(2.2), -46);
  c.fill("paddle", toPath(carve(lower, separation), { k: inner / R }), "evenodd");
  c.fill("paddle", toPath(upper, { k: inner / R }), "evenodd");
};

/**
 * 三本櫂 (frame 16, right r2c3): three of the same paddles, the upright one in front, blade up; the other two cross behind it, each
 * from a grip at the upper side to a blade at the lower other side, 31.1 degrees below level. In the book's pixels, 294 from grip to
 * tip, so the paddle's units are 1.58 of them: the upright grip 116 below the point where the paddles gather, the slanting grips
 * 119.5 to either side and 97.5 above it.
 */
export const sanbonKaiBuild = (c: Builder): void => {
  const unit = 294 / 186;
  const grip: V = [0, -88];
  const place = (regions: Region[], at: V, deg: number): Region[] => {
    const turned = turn(regions, deg);
    const a = deg * DEG;
    const g: V = [grip[0] * Math.cos(a) - grip[1] * Math.sin(a), grip[0] * Math.sin(a) + grip[1] * Math.cos(a)];
    return turned.map((region) => region.map((p) => moved(p, [at[0] - g[0], at[1] - g[1]])));
  };
  const lift = 28 / unit;
  const upright = (margin = 0): Region[] => place(paddle(margin), [0, -116 / unit - lift], 0);
  const slant = (side: 1 | -1, margin = 0): Region[] => place(paddle(margin), [(side * -119.5) / unit, 97.5 / unit - lift], side * -121.1);
  const placing = { k: R / 112 };
  c.guideCircle([100, 100], R);
  c.fill("paddle", toPath(carve(slant(-1), [...upright(2.2), ...slant(1, 2.2)]), placing), "evenodd");
  c.fill("paddle", toPath(carve(slant(1), upright(2.2)), placing), "evenodd");
  c.fill("paddle", toPath(upright(), placing), "evenodd");
};
