// 三つ横槌, as the 1892 crest book draws 三ッよこつち (frame 23, right page, third row, first column from the right): three
// rounded mallet heads meeting at their feet, one standing up and two pointing down to either side, each with the round face of its
// end and a stub of its handle. The book's crest is the same left and right but not turned: the upright head's foot runs nearly
// straight across, and the lower two meet below it on the upright. Every curve is a compass arc through three of the cell's
// points; the numbers are its pixels from the point where the three meet, y up.
import type { Builder } from "../../construct/builder.ts";
import { C0, R } from "../../construct/geo.ts";
import { arcTo, carve, lineLine, mirrored, reversedRun, seg, thickArc, thickSeg, toPath, vadd } from "../../construct/compass.ts";
import type { Circle, Piece, Region, V } from "../../construct/compass.ts";

/** The circle through three points: the crossing of two ruled perpendicular bisectors. */
const through = (a: V, b: V, c: V): Circle => {
  const mid = (p: V, q: V): V => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const normal = (p: V, q: V): V => [-(q[1] - p[1]), q[0] - p[0]];
  const centre = lineLine(mid(a, b), vadd(mid(a, b), normal(a, b)), mid(b, c), vadd(mid(b, c), normal(b, c)));
  return { c: centre, r: Math.hypot(a[0] - centre[0], a[1] - centre[1]) };
};
const ccw = (a: V, b: V, c: V): boolean => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]) > 0;
const arc3 = (a: V, b: V, c: V): Piece => arcTo(through(a, b, c), a, c, ccw(a, b, c));
/** A white line along the arc from `a` through `b` to `c`. */
const line3 = (a: V, b: V, c: V, w: number): Region => {
  const circle = through(a, b, c);
  const angle = (p: V): number => Math.atan2(p[1] - circle.c[1], p[0] - circle.c[0]);
  const a0 = angle(a);
  let a1 = angle(c);
  if (ccw(a, b, c)) while (a1 < a0) a1 += 2 * Math.PI;
  else while (a1 > a0) a1 -= 2 * Math.PI;
  return thickArc(circle.c, circle.r, w, Math.min(a0, a1), Math.max(a0, a1));
};
const flip = (region: Region): Region => reversedRun(region.map(mirrored));

const O: V = [0, 0];
/** The upright head's feet, and the point below where the lower two meet. */
const A: V = [-62.5, 7.5];
const C: V = [0, -105];
/** The upright head: its sides through 57.5 out at 62.5 up to its end's corners 37.5 out at 92.5 up; its end bowing to 101; its face through 77.5 up; its stub 32 wide to 130 up. */
const TOP = { side: [-57.5, 62.5] as V, corner: [-37.5, 92.5] as V, end: 101, face: 77.5, stub: [16, 130] as const };
/** The lower left head: its upper side through (-102.5, -15) to its end's corner (-125, -52.5); its end through (-140, -85) to (-85, -115); its lower side through (-52.5, -120) to C; its face through (-87.5, -62.5). */
const LOW = { side: [-102.5, -15] as V, c1: [-125, -52.5] as V, end: [-140, -85] as V, c2: [-85, -115] as V, foot: [-52.5, -120] as V, face: [-87.5, -62.5] as V };
const LINE = 2.5;

export const mitsuYokoTsuchiBuild = (c: Builder): void => {
  const B: V = [-A[0], A[1]];
  const tr: V = [-TOP.corner[0], TOP.corner[1]];
  const base = through(A, O, B);
  const top: Region = [arc3(A, TOP.side, TOP.corner), arc3(TOP.corner, [0, TOP.end], tr), arc3(tr, [-TOP.side[0], TOP.side[1]], B), arcTo(base, B, A, false)];
  const lowLeft: Region = [arc3(A, LOW.side, LOW.c1), arc3(LOW.c1, LOW.end, LOW.c2), arc3(LOW.c2, LOW.foot, C), seg(C, O), arcTo(base, O, A, false)];
  const lowRight = flip(lowLeft);
  const faces = [line3(TOP.corner, [0, TOP.face], tr, LINE), line3(LOW.c1, LOW.face, LOW.c2, LINE)];
  faces.push(flip(faces[1]));
  // The white between the heads: along the upright head's foot, and up the upright between the lower two.
  const parting = [line3(A, O, B, LINE), thickSeg(C, O, LINE)];
  const stubTop: Region = [seg([-TOP.stub[0], TOP.end - 4], [TOP.stub[0], TOP.end - 4]), seg([TOP.stub[0], TOP.end - 4], [TOP.stub[0], TOP.stub[1]]), seg([TOP.stub[0], TOP.stub[1]], [-TOP.stub[0], TOP.stub[1]]), seg([-TOP.stub[0], TOP.stub[1]], [-TOP.stub[0], TOP.end - 4])];
  // The lower left stub, as printed: a slanting oblong on the end of its head.
  const lowerStub: Region = [[-140, -87.5], [-115, -80], [-107.5, -105], [-135, -112.5]].map((p, i, all) => seg(p as V, all[(i + 1) % all.length] as V));
  // The crest's box stands 5 above the meeting point; its farthest corners, the lower stubs', 183 from the box's middle.
  const k = R / 184;
  const placing = { k, at: [0, -5 * k] as V };
  c.guideCircle(C0, R);
  for (const [region, stub, face] of [[top, stubTop, faces[0]], [lowLeft, lowerStub, faces[1]], [lowRight, flip(lowerStub), faces[2]]] as [Region, Region, Region][]) {
    c.group(() => c.fill("mallet", toPath(carve([region, stub], [face, ...parting]), placing)));
  }
};
