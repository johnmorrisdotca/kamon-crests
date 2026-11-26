// The crossed oak, 違い柏, set out with the compass and the ruler in its own frame: the centre at (0, 0), x to the right, y up, the
// layout circle at 100. Its proportions were measured from the crest book of 1892 (伊呂波分新撰紋帳, frame 17, ちがひかしは).
import type { Builder } from "../../construct/builder.ts";
import { angleOf, arcTo, carve, carveWhere, disc, inside, onCircle, thickSeg, toPath, vdist } from "../../construct/compass.ts";
import type { Circle, Piece, Placing, Region, V } from "../../construct/compass.ts";
import { LINE, bar, vein } from "./oak.ts";

/** The front leaf's edge: the points it turns at, from the stalk round by the upper edge to the tip, and back by the lower edge; each arc goes through the point named after the corner. */
const CORNERS: V[] = [[-57, -57], [-4, 53], [86, 41], [52, -14], [5, -40]];
const THROUGH: V[] = [[-40, 4], [40, 51], [72, 14], [32, -28], [-27, -52]];
/** The midrib's two ends, and the veins: five each side, from the midrib to where it ends. */
const RIB: [V, V] = [[-46, -44], [78, 40]];
const VEINS: [V, V][] = [
  [[-23, -28], [-10, 32]], [[-6, -17], [8, 41]], [[10, -6], [29, 45]], [[27, 5], [53, 46]], [[44, 16], [61, 45]],
  [[-23, -28], [25, -21]], [[-6, -17], [41, -9]], [[10, -6], [55, 6]], [[27, 5], [68, 23]], [[44, 16], [71, 29]],
];
const STALK = { to: [-69, -67] as V, length: 14, width: 8 };

/** Where a point of the front leaf stands on the leaf it is placed as: the same, or the mirror image, drawn a little smaller about its stalk. */
type Move = (p: V) => V;
const same: Move = (p) => p;
const BACK_SIZE = 0.95;
const behind: Move = (p) => [-CORNERS[0][0] + BACK_SIZE * (-p[0] - -CORNERS[0][0]), CORNERS[0][1] + BACK_SIZE * (p[1] - CORNERS[0][1])];

/** The circle through three points. */
const through = (p: V, q: V, r: V): Circle => {
  const d = 2 * (p[0] * (q[1] - r[1]) + q[0] * (r[1] - p[1]) + r[0] * (p[1] - q[1]));
  const sq = (v: V): number => v[0] * v[0] + v[1] * v[1];
  const c: V = [(sq(p) * (q[1] - r[1]) + sq(q) * (r[1] - p[1]) + sq(r) * (p[1] - q[1])) / d, (sq(p) * (r[0] - q[0]) + sq(q) * (p[0] - r[0]) + sq(r) * (q[0] - p[0])) / d];

  return { c, r: vdist(c, p) };
};

/** How long a scallop of the edge is, how far it bulges, and how much of that bulge is inside the line the corners are joined by. */
const SCALLOP = { length: 26, sag: 3.2, inside: 1.5 };

/** One scallop: the arc from one notch to the next through the point of its bulge. */
interface Scallop {
  from: V;
  mid: V;
  to: V;
}

/**
 * The front leaf's edge as a run of small scallops: each side of the leaf between two corners is cut into equal parts about a
 * 26 long, the notches stand a little inside the side's own arc and the middle of each part a little outside it.
 */
const scallops = (): Scallop[] => {
  const loop: Region = CORNERS.map((from, i) => {
    const to = CORNERS[(i + 1) % CORNERS.length];
    const mid = THROUGH[i];
    const circ = through(from, mid, to);

    return arcTo(circ, from, to, (mid[0] - from[0]) * (to[1] - mid[1]) - (mid[1] - from[1]) * (to[0] - mid[0]) > 0);
  });
  const out: Scallop[] = [];
  loop.forEach((piece, i) => {
    if (piece.t !== "A") return;
    const centre: V = piece.c;
    const length = Math.abs(piece.a1 - piece.a0) * piece.r;
    const n = Math.max(1, Math.round(length / SCALLOP.length));
    const at = (k: number, r: number): V => onCircle(centre, r, piece.a0 + ((piece.a1 - piece.a0) * k) / n);
    // Outward is away from the centre when the centre lies inside the leaf, towards it when it lies outside.
    const probe = at(0.5, piece.r + 0.5);
    const out1 = inside(loop, probe) ? -1 : 1;
    const notch = (k: number): V => (k === 0 ? CORNERS[i] : k === n ? CORNERS[(i + 1) % CORNERS.length] : at(k, piece.r - out1 * SCALLOP.inside));
    for (let k = 0; k < n; k += 1) out.push({ from: notch(k), mid: at(k + 0.5, piece.r + out1 * (SCALLOP.sag - SCALLOP.inside)), to: notch(k + 1) });
  });

  return out;
};
const SCALLOPS = scallops();

/** The arcs of the front leaf's edge, each from one notch to the next through its own bulge. */
const arcs = (at: Move = same): { circ: Circle; piece: Piece }[] =>
  SCALLOPS.map((one) => {
    const [from, mid, to] = [at(one.from), at(one.mid), at(one.to)];
    const circ = through(from, mid, to);
    const side = (mid[0] - from[0]) * (to[1] - mid[1]) - (mid[1] - from[1]) * (to[0] - mid[0]);

    return { circ, piece: arcTo(circ, from, to, side > 0) };
  });

/** How far a point stands from an arc of the edge (from its ends where it lies off the arc's span). */
const nearArc = ({ circ, piece }: { circ: Circle; piece: Piece }, p: V): number => {
  if (piece.t !== "A") return Infinity;
  const turn = (a: number): number => (piece.a1 > piece.a0 ? (a - piece.a0 + 8 * Math.PI) % (2 * Math.PI) : (piece.a0 - a + 8 * Math.PI) % (2 * Math.PI));
  const span = Math.abs(piece.a1 - piece.a0);
  const ends = [onCircle(circ.c, circ.r, piece.a0), onCircle(circ.c, circ.r, piece.a1)];

  return turn(angleOf(circ.c, p)) <= span ? Math.abs(vdist(circ.c, p) - circ.r) : Math.min(vdist(ends[0], p), vdist(ends[1], p));
};

const outline = (at: Move = same): Region => arcs(at).map((one) => one.piece);

/** The front leaf's outline taken out by `grow`: every arc on its circle made wider, and a round cap of that radius at each corner. */
const grown = (grow: number): Region[] => {
  const edge = arcs();
  const loop = outline();

  return carveWhere([...edge.flatMap((one) => disc(one.circ.c, one.circ.r + grow)), ...[CORNERS[0], CORNERS[2]].flatMap((p) => disc(p, grow))], (p) => inside(loop, p) || edge.some((one) => nearArc(one, p) < grow));
};

/** The white lines of the front leaf: its midrib and its veins. */
const white = (at: Move = same, k = 1): Region[] => [thickSeg(at(RIB[0]), at(RIB[1]), LINE), ...VEINS.map(([from, to], i) => vein(at(from), at(to), 120 * k, at([i < 5 ? -300 : 300, i < 5 ? 300 : -300])))];

/**
 * The crossed oak, 違い柏: one broad leaf lies across from the lower left to the upper right, and behind it, its mirror image, only
 * the pointed end at the upper left and a little at the lower right show, a narrow white line round the front leaf where it passes
 * over. A leaf's edge is five arcs that meet at its stalk, the corners of its upper edge, its tip and the notch below; a white midrib
 * is ruled up it and five arc veins leave it each side. The back leaf is built first, then the front, then a bar for each stalk.
 */
export const crossBuild = (c: Builder, part: string, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const front = carve([outline()], white());
  const back = carve([outline(behind)], [...white(behind, BACK_SIZE), ...grown(LINE)]);
  const stalk = [bar(CORNERS[0], STALK.to, STALK.length, STALK.width)];
  const backStalk = [bar(behind(CORNERS[0]), behind(STALK.to), STALK.length, STALK.width)];
  c.fill(part, toPath(back, placing));
  c.fill(part, toPath(front, placing));
  for (const loops of [stalk, backStalk]) c.fill(part, toPath(loops, placing));
};
