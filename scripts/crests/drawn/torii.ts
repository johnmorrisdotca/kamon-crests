// The torii gate, 鳥居, struck and ruled in its own frame: the centre at (0, 0), x to the right, y up, the layout circle at 100.
// Its proportions were measured from a public picture of the crest (Wikimedia Commons, Japanese crest Torii).
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { carve, circleCircle, lineCircle, mirrored, nearest, seg, shortArc, toPath } from "../../construct/compass.ts";
import type { Circle, Placing, Region, V } from "../../construct/compass.ts";

/** The white between two pieces. */
const GAP = 1;
/** The hollow sweep of the lintel's top, right end: it rises from the level top line to the tip. */
const SWEEP: Circle = { c: [49, 124], r: 62 };
/** The round underside of the lintel's right end, whose far point is the tip. */
const BELLY: Circle = { c: [50, 67], r: 24 };
/** The right post's outer edge and inner edge: arcs of very wide circles, so that the post leans out and widens towards the foot. */
const OUTER: Circle = { c: [478, 39], r: 425 };
const INNER: Circle = { c: [932, 62], r: 892 };
/** The inner edge's circle one white line out: where the crossbar stops short of the post. */
const STOP: Circle = { c: [932, 62], r: 892 + GAP };
const TOP = 62;
const UNDER = 46;
const BAR: [number, number] = [40, 45];
const POST_TOP = 39;
const FOOT = -73;
const STRUT: [number, number] = [27, 39];
const BEAM: [number, number] = [14, 26];
/** The notch in the post's outer side, where the end of the crossbar stands out: one white line round the end. */
const NOTCH = { x: 50, from: 13, to: 27 };
const PEG = { in: 51, out: 65 };

const flip = (circ: Circle): Circle => ({ c: [-circ.c[0], circ.c[1]], r: circ.r });
const at = (circ: Circle, y: number, hint: V): V => nearest(lineCircle([0, y], [1, y], circ.c, circ.r), hint);
const rect = (x0: number, y0: number, x1: number, y1: number): Region => [seg([x0, y1], [x1, y1]), seg([x1, y1], [x1, y0]), seg([x1, y0], [x0, y0]), seg([x0, y0], [x0, y1])];
const across = (r: Region): Region => r.map(mirrored);

/**
 * The torii, 鳥居: a lintel hollowed along its top and curved up at its ends, over a plain bar; two posts that lean out and
 * widen towards the foot; a strut up the middle; and a crossbar through the posts, its ends standing out past them, each in
 * a notch with a white line round it. The right post and the right end of the crossbar are built in full, and the left ones
 * where they stand.
 */
export const toriiBuild = (c: Builder, part: string, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const tip = nearest(circleCircle(SWEEP.c, SWEEP.r, BELLY.c, BELLY.r), [74, 67]);
  const tipL: V = [-tip[0], tip[1]];
  const sweep: V = [SWEEP.c[0], TOP];
  const sweepL: V = [-sweep[0], TOP];
  const corner = at(BELLY, UNDER, [62, UNDER]);
  const cornerL: V = [-corner[0], UNDER];
  const lintel: Region = [
    shortArc(SWEEP, tip, sweep),
    seg(sweep, sweepL),
    shortArc(flip(SWEEP), sweepL, tipL),
    shortArc(flip(BELLY), tipL, cornerL),
    seg(cornerL, corner),
    shortArc(BELLY, corner, tip),
  ];
  const topO = at(OUTER, POST_TOP, [53, POST_TOP]);
  const topI = at(INNER, POST_TOP, [40, POST_TOP]);
  const footI = at(INNER, FOOT, [50, FOOT]);
  const footO = at(OUTER, FOOT, [68, FOOT]);
  const post: Region = [seg(topO, topI), shortArc(INNER, topI, footI), seg(footI, footO), shortArc(OUTER, footO, topO)];
  const upper = at(STOP, BEAM[1], [40, BEAM[1]]);
  const lower = at(STOP, BEAM[0], [40, BEAM[0]]);
  const beam: Region = [
    seg([-upper[0], BEAM[1]], upper),
    shortArc(STOP, upper, lower),
    seg(lower, [-lower[0], BEAM[0]]),
    shortArc(flip(STOP), [-lower[0], BEAM[0]], [-upper[0], BEAM[1]]),
  ];
  const posts = carve([post], [rect(NOTCH.x, NOTCH.from, 90, NOTCH.to)]);
  const peg = rect(PEG.in, BEAM[0], PEG.out, BEAM[1]);

  c.guideCircle(C0, reach);
  // The posts' circles are so wide that an arc's centre can be read back only from coordinates written to four places.
  c.precision(4);
  c.fill(part, toPath([lintel], placing));
  c.fill(part, toPath([rect(-62, BAR[0], 62, BAR[1])], placing));
  c.fill(part, toPath([rect(-7, STRUT[0], 7, STRUT[1])], placing));
  c.fill(part, toPath(posts, placing));
  c.fill(part, toPath([peg], placing));
  c.fill(part, toPath([beam], placing));
  c.fill(part, toPath(posts.map(across), placing));
  c.fill(part, toPath([across(peg)], placing));
};
