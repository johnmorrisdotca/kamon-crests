// The one oak leaf, 一枚柏, set out with the compass and the ruler in its own frame: the centre at (0, 0), x to the right, y up, the
// layout circle at 100. Its proportions were measured from the crest book of 1892 (伊呂波分新撰紋帳, frame 16, 丸ニ一枚かしは).
import type { Builder } from "../../construct/builder.ts";
import { carve, circleCircle, mirrored, nearest, reversedRun, seg, shortArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Circle, Piece, Placing, Region, V } from "../../construct/compass.ts";
import { LINE, flipped, vein } from "./oak.ts";

/** The right edge from the tip down: each arc of its circle, and where it meets the next, which is named roughly. */
const SINGLE_EDGE: [Circle, V][] = [
  [{ c: [-28, 53], r: 54 }, [24, 72]],
  [{ c: [2, 42], r: 37 }, [39, 39]],
  [{ c: [26, 12], r: 29 }, [49, -8]],
  [{ c: [-16, -19], r: 65 }, [49, -27]],
  [{ c: [25, -26], r: 24 }, [33, -50]],
  [{ c: [-15, -43], r: 49 }, [22, -75]],
  [{ c: [12, -71], r: 11 }, [12, -82]],
];
/** The veins of the right side, from where each leaves the midrib to where it ends, and the radius of its arc. */
const SINGLE_VEINS: [V, V, number][] = [[[2, 19], [13, 68], 60], [[12, 2], [24, 46], 137], [[2, -31], [34, 32], 146], [[2, -57], [39, 4], 116]];
/** The midrib runs from here to there, and the stalk is a bar of this width from the foot down to the level given. */
const SINGLE_RIB: [number, number] = [-76, 90];
const SINGLE_STALK = { width: 12, from: -72, to: -98 };

/** The leaf's outline: the right edge's arcs from the tip to the foot, a level line across the foot, and the left edge mirrored. */
const singleOutline = (): Region => {
  const right = SINGLE_EDGE.map(([circ], i): Piece => {
    const next = SINGLE_EDGE[i + 1];
    const from = i === 0 ? ([0, circ.c[1] + Math.sqrt(circ.r * circ.r - circ.c[0] * circ.c[0])] as V) : nearest(circleCircle(SINGLE_EDGE[i - 1][0].c, SINGLE_EDGE[i - 1][0].r, circ.c, circ.r), SINGLE_EDGE[i - 1][1]);
    const to = next === undefined ? ([circ.c[0], circ.c[1] - circ.r] as V) : nearest(circleCircle(circ.c, circ.r, next[0].c, next[0].r), SINGLE_EDGE[i][1]);

    return shortArc(circ, from, to);
  });
  const foot = right[right.length - 1];
  const end = foot.t === "A" ? ([foot.c[0], foot.c[1] - foot.r] as V) : ([0, 0] as V);

  return [...right, seg(end, [-end[0], end[1]]), ...reversedRun(right.map(mirrored))];
};

/** The one leaf with its midrib and veins cut out, and its stalk as the bar under it. */
export const singleLeaf = (): { leaf: Region[]; stalk: Region[] } => {
  const veins = SINGLE_VEINS.map(([from, to, r]) => vein(from, to, r, [-400, from[1]]));
  const white: Region[] = [thickSeg([0, SINGLE_RIB[0]], [0, SINGLE_RIB[1]], LINE), ...veins, ...flipped(veins)];
  const half = SINGLE_STALK.width / 2;

  return { leaf: carve([singleOutline()], white), stalk: [[seg([-half, SINGLE_STALK.from], [half, SINGLE_STALK.from]), seg([half, SINGLE_STALK.from], [half, SINGLE_STALK.to]), seg([half, SINGLE_STALK.to], [-half, SINGLE_STALK.to]), seg([-half, SINGLE_STALK.to], [-half, SINGLE_STALK.from])]] };
};

/** The single oak leaf in its frame, drawn to `reach` from the centre. */
export const singleBuild = (c: Builder, part: string, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const { leaf, stalk } = singleLeaf();
  c.fill(part, toPath(leaf, placing));
  c.fill(part, toPath(stalk, placing));
};
