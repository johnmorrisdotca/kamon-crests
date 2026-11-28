// The bodies of hand drums, 鼓胴, as the 1892 crest book draws them (frame 22, right page, fourth column from the right): a cup at
// each end, the ends ruled flat, joined at a sharp neck to a waisted barrel. Every curve is a compass arc struck through three
// measured points; the numbers are the book's pixels.
import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { arcTo, carve, lineLine, moved, rotated, seg, toPath, vadd } from "../../construct/compass.ts";
import type { Circle, Piece, Region, V } from "../../construct/compass.ts";

/** The circle through three points: the crossing of two ruled perpendicular bisectors. */
const through = (a: V, b: V, c: V): Circle => {
  const mid = (p: V, q: V): V => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const normal = (p: V, q: V): V => [-(q[1] - p[1]), q[0] - p[0]];
  const centre = lineLine(mid(a, b), vadd(mid(a, b), normal(a, b)), mid(b, c), vadd(mid(b, c), normal(b, c)));
  return { c: centre, r: Math.hypot(a[0] - centre[0], a[1] - centre[1]) };
};
/** The arc from `a` through `b` to `c`. */
const arc3 = (a: V, b: V, c: V): Piece => {
  const cross = (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
  return arcTo(through(a, b, c), a, c, cross > 0);
};

/**
 * A drum body standing upright about the origin: its flat ends `half` either side and `high` above and below; each cup curving in
 * through a point 40.8 in from the end and 50 out, to a sharp neck `neck` out and 69.5 in from the end; the barrel between the
 * necks bowed out to `barrel` at the middle. The left half is the right half turned half a turn.
 */
export const drumBody = (half: number, high: number, neck: number, barrel: number): Region => {
  const n = high - 69.5;
  const right = [
    arc3([half, high], [50, high - 40.8], [neck, n]),
    arc3([neck, n], [barrel, 0], [neck, -n]),
    arc3([neck, -n], [50, -(high - 40.8)], [half, -high]),
  ];
  return [seg([-half, high], [half, high]), ...right, seg([half, -high], [-half, -high]), ...right.map((p) => rotated(p, Math.PI))];
};

/** 並び鼓胴 (frame 22, right r2c4): two bodies upright side by side, the corners of their ends meeting on the upright. */
export const narabiKodoBuild = (c: Builder): void => {
  const [half, high, neck, barrel] = [63.5, 121, 21, 33.8];
  const placing = { k: R / Math.hypot(2 * half, high) };
  c.guideCircle(C0, R);
  for (const x of [-half, half]) c.fill("hand-drum", toPath([drumBody(half, high, neck, barrel).map((p) => moved(p, [x, 0]))], placing));
};

/**
 * 違い鼓胴 (frame 22, right r1c4): two longer bodies crossed, each 42.5 degrees from level, the one rising to the right in front with
 * a white of 2.5 parting them.
 */
export const chigaiKodoBuild = (c: Builder): void => {
  const [half, high, neck, barrel, tilt, parting] = [61.7, 145.5, 22, 25.5, 42.5, 2.5];
  const body = drumBody(half, high, neck, barrel);
  const lie = (region: Region, deg: number): Region => region.map((p) => rotated(p, (deg * Math.PI) / 180));
  const front = lie(body, tilt - 90);
  const back = lie(body, 90 - tilt);
  const screen = [0, 45, 90, 135, 180, 225, 270, 315].map((deg) => front.map((p) => moved(p, [parting * Math.cos((deg * Math.PI) / 180), parting * Math.sin((deg * Math.PI) / 180)])));
  const placing = { k: R / Math.hypot(half, high) };
  c.guideCircle(C0, R);
  c.group(() => c.fill("hand-drum", toPath(carve([back], [front, ...screen]), placing)));
  c.group(() => c.fill("hand-drum", toPath([front], placing)));
};
