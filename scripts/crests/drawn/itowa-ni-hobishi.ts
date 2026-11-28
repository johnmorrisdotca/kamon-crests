// 糸輪に帆菱, as the 1892 crest book draws 糸ワニ帆ひし (frame 10, left page, third row, first column from the right): two sails
// filling a round inside a thread ring, their yards level across the middle, one sail swelling over the top from the right yard to
// the left one and the other under the bottom from the left yard to the right one, each with three seams; a post and crossbar
// stand on each yard in the hollow between the sails. The book draws the two sails unlike, and so are they here: every line is an
// arc struck through three of the cell's points. The numbers are its pixels from the round's centre, y up.
import type { Builder } from "../../construct/builder.ts";
import { C0, R, circle } from "../../construct/geo.ts";
import { arcTo, carve, lineLine, seg, thickArc, toPath } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";

/** The arc from `a` through `m` to `b`, its circle struck through the three. */
const arcVia = (a: V, m: V, b: V): Piece => {
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
const box = (x0: number, x1: number, y0: number, y1: number): Region => [seg([x0, y0], [x1, y0]), seg([x1, y0], [x1, y1]), seg([x1, y1], [x0, y1]), seg([x0, y1], [x0, y0])];

/** The thread ring from 150 to 155 out; the sails fill the round inside it to 139. */
const RING = { outer: 155, inner: 150 };
const ROUND = 139;
/** The left yard from 3.4 to 12 up, out to 10 left of the centre; the right one from 7.7 to 16.3 up, out to 8.6 right. */
const LEFT_YARD = { low: 3.4, high: 12, end: -10 };
const RIGHT_YARD = { low: 7.7, high: 16.3, end: 8.6 };
const PARTING = 2.5;
const SEAM = 2.5;
const onRound = (y: number, side: 1 | -1): V => [side * Math.sqrt(ROUND ** 2 - y ** 2), y];

/** The upper sail's inner edge, from the left yard over to the right one; its seams, each from yard to yard over the top. */
const UPPER_EDGE: V[] = [[-84, LEFT_YARD.high + PARTING], [-75, 47], [-35, 57], [0, 38], [RIGHT_YARD.end, RIGHT_YARD.high + PARTING]];
const UPPER_SEAMS: [V, V, V][] = [
  [[-127, LEFT_YARD.high], [0, 113.5], [111.4, RIGHT_YARD.high]],
  [[-105.7, LEFT_YARD.high], [0, 90.6], [85.7, RIGHT_YARD.high]],
  [[-91.4, LEFT_YARD.high], [0, 70.6], [50, RIGHT_YARD.high]],
];
/** The lower sail's inner edge, from the right yard under to the left one; its seams, each from yard to yard under the bottom. */
const LOWER_EDGE: V[] = [[85.7, RIGHT_YARD.low - PARTING], [73, -24], [31.4, -30.9], [-6, -16], [LEFT_YARD.end, LEFT_YARD.low - PARTING]];
const LOWER_SEAMS: [V, V, V][] = [
  [[-100, LEFT_YARD.low], [0, -98], [131, RIGHT_YARD.low]],
  [[-80, LEFT_YARD.low], [0, -72.3], [120, RIGHT_YARD.low]],
  [[-40, LEFT_YARD.low], [17, -49.4], [108.6, RIGHT_YARD.low]],
];
/** Over the left yard a post from 62.9 to 52.9 left and a crossbar from 32 to 42 up, 78.6 to 34.3 left; under the right yard the same turned down. */
const RIG_BOXES: [number, number, number, number][] = [
  [-62.9, -52.9, LEFT_YARD.high - 1, 33], [-78.6, -34.3, 32, 42],
  [40, 50, -9, RIGHT_YARD.low + 1], [22.9, 77, -18, -8],
];

export const itowaNiHobishiBuild = (c: Builder): void => {
  const k = R / RING.outer;
  c.guideCircle(C0, R);
  c.guideCircle(C0, RING.inner * k);
  c.fill("frame", circle(C0, R).join(circle(C0, RING.inner * k)), "evenodd");
  const round = { c: [0, 0] as V, r: ROUND };
  const upper: Region = [
    arcTo(round, onRound(RIGHT_YARD.high + PARTING, 1), onRound(LEFT_YARD.high + PARTING, -1), true),
    seg(onRound(LEFT_YARD.high + PARTING, -1), UPPER_EDGE[0]),
    arcVia(UPPER_EDGE[0], UPPER_EDGE[1], UPPER_EDGE[2]),
    arcVia(UPPER_EDGE[2], UPPER_EDGE[3], UPPER_EDGE[4]),
    seg(UPPER_EDGE[4], onRound(RIGHT_YARD.high + PARTING, 1)),
  ];
  const lower: Region = [
    arcTo(round, onRound(LEFT_YARD.low - PARTING, -1), onRound(RIGHT_YARD.low - PARTING, 1), true),
    seg(onRound(RIGHT_YARD.low - PARTING, 1), LOWER_EDGE[0]),
    arcVia(LOWER_EDGE[0], LOWER_EDGE[1], LOWER_EDGE[2]),
    arcVia(LOWER_EDGE[2], LOWER_EDGE[3], LOWER_EDGE[4]),
    seg(LOWER_EDGE[4], onRound(LEFT_YARD.low - PARTING, -1)),
  ];
  const ends = { left: [onRound(LEFT_YARD.low, -1), onRound(LEFT_YARD.high, -1)], right: [onRound(RIGHT_YARD.low, 1), onRound(RIGHT_YARD.high, 1)] };
  const yards: Region[] = [
    [seg(ends.left[0], [LEFT_YARD.end, LEFT_YARD.low]), seg([LEFT_YARD.end, LEFT_YARD.low], [LEFT_YARD.end, LEFT_YARD.high]), seg([LEFT_YARD.end, LEFT_YARD.high], ends.left[1]), arcTo(round, ends.left[1], ends.left[0], true)],
    [seg([RIGHT_YARD.end, RIGHT_YARD.low], ends.right[0]), arcTo(round, ends.right[0], ends.right[1], true), seg(ends.right[1], [RIGHT_YARD.end, RIGHT_YARD.high]), seg([RIGHT_YARD.end, RIGHT_YARD.high], [RIGHT_YARD.end, RIGHT_YARD.low])],
  ];
  const grown = (x0: number, x1: number, y0: number, y1: number): Region => box(x0 - PARTING, x1 + PARTING, y0 - PARTING, y1 + PARTING);
  const clear = RIG_BOXES.map((b) => grown(...b));
  const seams = [...UPPER_SEAMS, ...LOWER_SEAMS].map(([a, m, b]) => lineVia(a, m, b, SEAM));
  c.group(() => {
    c.fill("sail", toPath(carve([upper, lower], [...clear, ...seams]), { k }));
    for (const yard of yards) c.fill("sail", toPath([yard], { k }));
    for (const rig of RIG_BOXES) c.fill("sail", toPath([box(...rig)], { k }));
  });
};
