// 五つ槌, as the 1892 crest book draws 五ッつち (frame 23, right page, first row, first column from the right): five mallets turned a
// fifth of a turn apart, each head lying across the radius with the round face on its anticlockwise end, the handle running in
// and out through it and showing as a flat tab on either side. The book sets the five 16.7 degrees anticlockwise of upright; the
// numbers are its pixels from their middle.
import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { arcTo, carve, rotated, seg, thickArc, toPath } from "../../construct/compass.ts";
import type { Circle, Region, V } from "../../construct/compass.ts";

/** A head: its middle 97.5 out, 115 long across the radius and 70 deep, its ends arcs of 40. */
const HEAD = { out: 97.5, half: 57.5, deep: 35, end: 40 };
/** The tabs: the outer one 60 wide and 17 high, the inner 47 wide and 20 high. */
const TABS = { outer: [30, 17], inner: [23.5, 20] } as const;
const FACE = 25;
const LINE = 2.5;
const START = -16.7;

/** The circle of radius `r` through `a` and `b` whose centre lies on the side of `toward`. */
const through = (a: V, b: V, r: number, toward: V): Circle => {
  const mid: V = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const half = Math.hypot(b[0] - a[0], b[1] - a[1]) / 2;
  const n: V = [-(b[1] - a[1]) / (2 * half), (b[0] - a[0]) / (2 * half)];
  const d = Math.sqrt(r ** 2 - half ** 2);
  const side = (toward[0] - mid[0]) * n[0] + (toward[1] - mid[1]) * n[1] > 0 ? 1 : -1;
  return { c: [mid[0] + side * d * n[0], mid[1] + side * d * n[1]], r };
};
const box = (x0: number, y0: number, x1: number, y1: number): Region => [seg([x0, y0], [x1, y0]), seg([x1, y0], [x1, y1]), seg([x1, y1], [x0, y1]), seg([x0, y1], [x0, y0])];

/** The upright mallet's head: its ends' chords stand far enough in that the arcs of 40 reach 57.5 out. */
const head = (): Region => {
  const sag = HEAD.end - Math.sqrt(HEAD.end ** 2 - HEAD.deep ** 2);
  const [x, y0, y1] = [HEAD.half - sag, HEAD.out - HEAD.deep, HEAD.out + HEAD.deep];
  const centre: V = [0, HEAD.out];
  return [seg([-x, y1], [x, y1]), arcTo(through([x, y1], [x, y0], HEAD.end, centre), [x, y1], [x, y0], false), seg([x, y0], [-x, y0]), arcTo(through([-x, y0], [-x, y1], HEAD.end, centre), [-x, y0], [-x, y1], false)];
};
/** The round face: a white arc FACE in from the anticlockwise end, parallel to it. */
const face = (): Region => {
  const sag = HEAD.end - Math.sqrt(HEAD.end ** 2 - HEAD.deep ** 2);
  const [x, y0, y1] = [HEAD.half - sag - FACE, HEAD.out - HEAD.deep, HEAD.out + HEAD.deep];
  const circle = through([-x, y0], [-x, y1], HEAD.end, [0, HEAD.out]);
  const angle = (p: V): number => Math.atan2(p[1] - circle.c[1], p[0] - circle.c[0]);
  return thickArc(circle.c, circle.r, LINE, angle([-x, y1]), angle([-x, y0]) + 2 * Math.PI);
};

export const itsutsuTsuchiBuild = (c: Builder): void => {
  const [outer, inner] = [TABS.outer, TABS.inner];
  const tabs = [box(-outer[0], HEAD.out + HEAD.deep, outer[0], HEAD.out + HEAD.deep + outer[1]), box(-inner[0], HEAD.out - HEAD.deep - inner[1], inner[0], HEAD.out - HEAD.deep)];
  const reach = Math.hypot(outer[0], HEAD.out + HEAD.deep + outer[1]);
  const placing = { k: R / reach };
  c.guideCircle(C0, R);
  for (let i = 0; i < 5; i += 1) {
    const a = ((START + 72 * i) * Math.PI) / 180;
    const turn = (region: Region): Region => region.map((p) => rotated(p, -a));
    c.group(() => {
      c.fill("mallet", toPath(tabs.map(turn), placing));
      c.fill("mallet", toPath(carve([turn(head())], [turn(face())]), placing));
    });
  }
};
