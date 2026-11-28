// 槌車, as the 1892 crest book draws つち車 (frame 22, left page, third row, fourth column from the right): a wheel of eight
// spokes, and round it eight mallets, each head lying across its handle with the handle's end showing beyond it, the round face of
// each head on its anticlockwise end. The book's eight differ by up to 20 in their distance out; here they are regular. The numbers
// are the book's pixels from the hub's centre.
import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { arcTo, carve, disc, rotated, seg, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Circle, Region, V } from "../../construct/compass.ts";

const HUB = 24;
const RIM = { outer: 82.5, inner: 70 };
const SPOKE = 6;
/** A head: its middle 123 out, 68 long across the radius between its ends' chords and 52 deep, its ends arcs of 60. */
const HEAD = { out: 123, half: 34, deep: 26, end: 60 };
const HANDLE = 6;
const TAB = { from: 149, to: 160, half: 6 };
const FACE = 18;
const LINE = 2.5;

/** The arc of radius `r` from `a` to `b`, bowing away from `away`. */
const bowed = (a: V, b: V, r: number, away: V): Circle => {
  const mid: V = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const half = Math.hypot(b[0] - a[0], b[1] - a[1]) / 2;
  const n: V = [-(b[1] - a[1]) / (2 * half), (b[0] - a[0]) / (2 * half)];
  const d = Math.sqrt(r ** 2 - half ** 2);
  const side = (away[0] - mid[0]) * n[0] + (away[1] - mid[1]) * n[1] > 0 ? 1 : -1;
  return { c: [mid[0] + side * d * n[0], mid[1] + side * d * n[1]], r };
};

/** The upright mallet: its head across the top, its handle from the rim through the head to the tab. */
const head = (): Region => {
  const [x, y0, y1] = [HEAD.half, HEAD.out - HEAD.deep, HEAD.out + HEAD.deep];
  const right = bowed([x, y1], [x, y0], HEAD.end, [0, HEAD.out]);
  const left = bowed([-x, y0], [-x, y1], HEAD.end, [0, HEAD.out]);
  return [seg([-x, y1], [x, y1]), arcTo(right, [x, y1], [x, y0], false), seg([x, y0], [-x, y0]), arcTo(left, [-x, y0], [-x, y1], false)];
};
/** The round face at the anticlockwise end: a white arc parallel to that end, FACE in from it. */
const face = (): Region => {
  const [x, y0, y1] = [HEAD.half - FACE, HEAD.out - HEAD.deep, HEAD.out + HEAD.deep];
  const left = bowed([-x, y0], [-x, y1], HEAD.end, [0, HEAD.out]);
  const angle = (p: V): number => Math.atan2(p[1] - left.c[1], p[0] - left.c[0]);
  // The short way round, through the leftmost point of the circle.
  const a0 = angle([-x, y1]);
  const a1 = angle([-x, y0]) + 2 * Math.PI;
  return thickArc(left.c, left.r, LINE, a0, a1);
};

export const tsuchiGurumaBuild = (c: Builder): void => {
  const turns = Array.from({ length: 8 }, (_, i) => (i * 45 * Math.PI) / 180);
  const turn = (region: Region, a: number): Region => region.map((p) => rotated(p, -a));
  const placing = { k: R / Math.hypot(HEAD.half, HEAD.out + HEAD.deep + 10) };
  const ring = (r0: number, r1: number): Region[] => [thickArc([0, 0], (r0 + r1) / 2, r1 - r0, 0, Math.PI), thickArc([0, 0], (r0 + r1) / 2, r1 - r0, Math.PI, 2 * Math.PI)];
  c.guideCircle(C0, R);
  c.fill("mallet", toPath(carve([...ring(RIM.inner, RIM.outer), disc([0, 0], HUB), ...turns.slice(0, 4).map((a) => turn(thickSeg([0, -RIM.inner], [0, RIM.inner], SPOKE), a))], []), placing));
  for (const a of turns) {
    const handle = thickSeg([0, RIM.outer], [0, HEAD.out - HEAD.deep], HANDLE * 2);
    const tab = thickSeg([0, TAB.from], [0, TAB.to], TAB.half * 2);
    c.group(() => {
      c.fill("mallet", toPath(carve([turn(handle, a), turn(tab, a)], []), placing));
      c.fill("mallet", toPath(carve([turn(head(), a)], [turn(face(), a)]), placing));
    });
  }
};
