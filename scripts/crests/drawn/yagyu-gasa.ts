// 柳生笠, as the 1892 crest book draws 柳生笠 (frame 16, right page, second row, fourth column from the right): two broad hats, the
// right one in front of the left. Each is a crescent of brim under a small crown, the hollow of its underside showing below the
// brim's front edge, and two ties hanging from it. Every curve is a compass arc struck through three of the cell's points; the
// numbers are its pixels from the foot of the front hat's crown, y up.
import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { arcTo, carve, lineLine, seg, thickArc, thickSeg, toPath, vadd } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";

/** The arc from `a` through `m` to `b`, its circle struck through the three. */
const arcVia = (a: V, m: V, b: V) => {
  const mid = (p: V, q: V): V => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const turn = (p: V, q: V): V => [p[0] - (q[1] - p[1]), p[1] + (q[0] - p[0])];
  const centre = lineLine(mid(a, m), turn(mid(a, m), m), mid(m, b), turn(mid(m, b), b));
  const cross = (m[0] - a[0]) * (b[1] - a[1]) - (m[1] - a[1]) * (b[0] - a[0]);
  return arcTo({ c: centre, r: Math.hypot(a[0] - centre[0], a[1] - centre[1]) }, a, b, cross > 0);
};
const lineVia = (a: V, m: V, b: V, w: number): Region => {
  const arc = arcVia(a, m, b);
  if (arc.t !== "A") return [];
  return thickArc(arc.c, arc.r, w, arc.a0, arc.a1);
};
const mirror = ([x, y]: V): V => [-x, y];

/** The brim's tips 99 to either side and 73 down; its top through 57.5 out and 21.5 down to the crown's foot 24 out. */
const TIP: V = [99, -73];
const SHOULDER: V = [57.5, -21.5];
const FOOT: V = [24, 0];
/** The crown's top corners 22.5 out and 18.5 up, its top bowing to 30. */
const TOP: V = [22.5, 18.5];

/** One hat, its crown's foot at `at`: the brim and crown in one, and the underside below the brim's front edge. */
const hat = (at: V, leftTip: V = mirror(TIP), ties: [V, V][] = [[[-16, -50], [-1, -119]], [[6.5, -50], [29, -114]]]): { top: Region; under: Region; ties: Region[]; front: Region; edge: Region } => {
  const p = (q: V): V => vadd(q, at);
  const top: Region = [
    arcVia(p(leftTip), p(mirror(SHOULDER)), p(mirror(FOOT))),
    seg(p(mirror(FOOT)), p(mirror(TOP))),
    arcVia(p(mirror(TOP)), p([0, 30]), p(TOP)),
    seg(p(TOP), p(FOOT)),
    arcVia(p(FOOT), p(SHOULDER), p(TIP)),
    arcVia(p(TIP), p([0, -45]), p(leftTip)),
  ];
  const under: Region = [arcVia(p([-76, -60]), p([0, -45]), p([76, -60])), arcVia(p([76, -60]), p([0, -84]), p([-76, -60]))];
  const bands = ties.map(([a, b]) => thickSeg(p(a), p(b), 7));
  const front = lineVia(p(TIP), p([0, -45]), p(leftTip), 3);
  const edge = lineVia(p(leftTip), p(mirror(SHOULDER)), p(mirror(FOOT)), 3);
  return { top, under, ties: bands, front, edge };
};

export const yagyuGasaBuild = (c: Builder): void => {
  // The back hat's brim reaches farther to the left, and its one tie hangs down to the left.
  const back = hat([-106.5, 7], [-116, -68.5], [[[9, -48.5], [-41, -93.5]]]);
  const front = hat([0, 0]);
  const centre: V = [-62, -41];
  const k = R / 164;
  const placing = { k, at: [-centre[0] * k, -centre[1] * k] as V };
  const cover = [front.top, front.under, ...front.ties, front.edge];
  c.guideCircle(C0, R);
  c.group(() => {
    c.fill("conical-hat", toPath(carve([back.top], [back.front, ...cover]), placing));
    c.fill("conical-hat", toPath(carve([back.under, ...back.ties], [back.front, ...cover]), placing));
  });
  c.group(() => {
    c.fill("conical-hat", toPath(carve([front.top], [front.front]), placing));
    c.fill("conical-hat", toPath(carve([front.under, ...front.ties], [front.front, front.top]), placing));
  });
};
