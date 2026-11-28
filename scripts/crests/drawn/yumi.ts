import type { Builder } from "../../construct/builder.ts";
import { carve, circleCircle, seg, shortArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Circle, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

const polygon = (points: V[]): Region => points.map((point, i) => seg(point, points[(i + 1) % points.length]));

export const itsutsuYumiBuild = (c: Builder): void => {
  c.guideCircle(C0, R);
  c.guideSpokes(5, 0, R);
  const bow = polygon([[0, 0], [-11, 17], [-17, 43], [-16, 63], [-10, 76], [0, 91],
    [-4, 73], [-9, 61], [-10, 44], [-7, 20]]);
  const upperMark = polygon([[-13.4, 59], [-10.2, 59], [-10.3, 62], [-13.3, 62]]);
  const lowerMark = polygon([[-13.3, 46], [-11, 46], [-11, 49], [-13.5, 49]]);
  const thread = thickSeg([0, 0], [0, 88], 2.2);
  for (const turn of [0, 72, 144, 216, 288]) {
    c.fill("bow", toPath([bow, upperMark, lowerMark], { k: 1, turn }), "evenodd");
    c.fill("bow", toPath([thread], { k: 1, turn }));
  }
};

/**
 * 違い弓 (frame 42, right r1c1): two bows crossed, mirror images, the one from the upper left in front. Each is a stave between two
 * arcs through its tips, 46 and 33 out from its string at the middle, so that it tapers to a point at each end; a straight string
 * 3 wide. In the book's pixels from the middle of the crossing.
 */
const BOW_TIPS: [V, V] = [[-128.75, 111.25], [107.5, -111.25]];
const BOW_PARTING = 2.5;
/** The circle through two tips that stands `sag` from their chord at its middle, on the side of `side`. */
const bowCircle = ([a, b]: [V, V], sag: number): Circle => {
  const chord = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const r = (chord ** 2 / 4 + sag ** 2) / (2 * sag);
  const mid: V = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const n: V = [-(b[1] - a[1]) / chord, (b[0] - a[0]) / chord];
  return { c: [mid[0] - n[0] * (r - sag), mid[1] - n[1] * (r - sag)], r };
};
const stave = (tips: [V, V], grow = 0): Region => {
  const [outer, inner] = [bowCircle(tips, 46), bowCircle(tips, 33)];
  const o: Circle = { c: outer.c, r: outer.r + grow };
  const i: Circle = { c: inner.c, r: inner.r - grow };
  const ends = circleCircle(o.c, o.r, i.c, i.r);
  const [a, b] = Math.hypot(ends[0][0] - tips[0][0], ends[0][1] - tips[0][1]) < Math.hypot(ends[1][0] - tips[0][0], ends[1][1] - tips[0][1]) ? ends : [ends[1], ends[0]];
  return [shortArc(o, a, b), shortArc(i, b, a)];
};
export const chigaiYumiBuild = (c: Builder): void => {
  const front = BOW_TIPS;
  const back: [V, V] = [[-front[1][0], front[1][1]], [-front[0][0], front[0][1]]];
  const string = (tips: [V, V], w: number): Region => thickSeg(tips[0], tips[1], w);
  const over = [stave(front, BOW_PARTING), string(front, 3 + 2 * BOW_PARTING)];
  const placing = { k: R / (Math.max(...[...front, ...back].map(([x, y]) => Math.hypot(x, y))) + 4) };
  c.guideCircle(C0, R);
  c.group(() => {
    c.fill("bow", toPath(carve([stave(back)], over), placing));
    c.fill("bow", toPath(carve([string(back, 3)], over), placing));
  });
  c.group(() => {
    c.fill("bow", toPath([stave(front)], placing));
    c.fill("bow", toPath([string(front, 3)], placing));
  });
};
