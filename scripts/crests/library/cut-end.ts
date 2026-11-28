import { bowedArc, carve, onCircle, seg, thickArc, thickSeg, vadd, vdist, vmul, vsub, vunit } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { PAPER, definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

export interface CutEndOptions extends PartOptions {
  /** Long grooves that start at the rim. Defaults to 3. */
  grooves?: number;
  /** The stub's length divided by its width. Defaults to 1.6. */
  length?: number;
}

/**
 * The marks of a stem or horn cut across and seen at a slant, between the two ends of the cut: the oval face, which is ink beyond
 * the cut, and the paper lines inside the stem, which are the rim of the face and the grooves that run on from it. `inside` is any
 * point of the stem, to say which side it lies on.
 */
export function cutEndMarks(left: V, right: V, inside: V, paper: number, grooves = 3): { face: Region; cuts: Region[] } {
  const width = vdist(left, right);
  const rise = width / 4;
  const along = vunit(vsub(right, left));
  const normal: V = [-along[1], along[0]];
  const inward = (inside[0] - left[0]) * normal[0] + (inside[1] - left[1]) * normal[1] > 0 ? normal : vmul(normal, -1);
  // bowedArc bows to the left of its chord, which is `normal` for the chord from left to right.
  const sign = inward === normal ? 1 : -1;
  const rim = bowedArc(left, right, sign * rise);
  if (rim.t !== "A") throw new Error("cut-end: the rim must be an arc");
  const cuts: Region[] = [thickArc(rim.c, rim.r, paper, Math.min(rim.a0, rim.a1), Math.max(rim.a0, rim.a1))];
  const middle = vmul(vadd(left, right), .5);
  for (let i = 0; i < grooves; i += 1) {
    const across = width * .62 * ((i + 1) / (grooves + 1) - .5);
    const from = vadd(vadd(middle, vmul(along, across)), vmul(inward, rise + 2.5 * paper - Math.abs(across) * .5));
    cuts.push(thickSeg(from, vadd(from, vmul(inward, width * .6)), paper));
  }

  return { face: [bowedArc(left, right, rise), bowedArc(right, left, rise)], cuts };
}

/** Short paper ticks from points of one edge, each `tick` long from its foot, which stands a little outside the edge so that the tick opens the outline. */
export function hatchTicks(edge: Piece, places: readonly number[], tick: V, paper: number): Region[] {
  const back = vmul(vunit(tick), -paper);

  return places.map((t) => {
    const foot = edge.t === "A" ? onCircle(edge.c, edge.r, edge.a0 + (edge.a1 - edge.a0) * t) : vadd(edge.a, vmul(vsub(edge.b, edge.a), t));

    return thickSeg(vadd(foot, back), vadd(foot, tick), paper);
  });
}

/** Paper arcs about one centre, one compass step apart, between two angles in radians. */
export function hatchArcs(centre: V, radii: readonly number[], a0: number, a1: number, paper: number): Region[] {
  return radii.map((r) => thickArc(centre, r, paper, a0, a1));
}

/** Size is the width of the stub across its cut. */
export const cutEnd = definePart<CutEndOptions>({
  id: "cut-end",
  name: { en: "Cut end", ja: "切り口" },
  description: {
    en: "A stem cut across and seen at a slant. The face is an oval of two equal arcs, with a white rim inside the stem and white grooves running on from it.",
    ja: "横に切った茎や角を斜めから見た切り口です。同じ二本の弧で楕円形の面を作り、内側に白い縁を一本、そこから伸びる白い筋を残します。",
  },
  families: ["tsuno"],
  sources: [
    { frame: 23, page: "R", row: 2, col: 2, label: "ちがひ角" },
    { frame: 23, page: "R", row: 1, col: 2, label: "折合つの" },
  ],
  stock: true,
  sampleSize: 70,
  sampleOptions: { motif: "horn" },
  build(c, centre, turn, size, { motif, keyline, grooves = 3, length = 1.6, paper = PAPER }) {
    const left: V = [-.5, -length / 2];
    const right: V = [.5, -length / 2];
    const stub: Region = [seg(left, right), seg(right, [.5, length / 2]), seg([.5, length / 2], [-.5, length / 2]), seg([-.5, length / 2], left)];
    const { face, cuts } = cutEndMarks(left, right, [0, 0], paper / size, grooves);
    fillPart(c, motif, carve([stub, face], cuts), { k: size, at: centre, turn }, keyline);
  },
});

export default cutEnd;
