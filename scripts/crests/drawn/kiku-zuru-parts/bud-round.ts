import { carve, circleThrough, disc, mirrored, pieceEnd, pieceStart, shortArc, thickArc, thickSeg } from "../../../construct/compass.ts";
import type { Piece, V } from "../../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

interface BudOptions extends PartOptions {
  /** Two curved outer seams, with a third narrow central seam when requested. */
  seams?: 2 | 3;
  /** White seam width in crest units. It stays fixed when the radius changes. */
  paper?: number;
  /** Exposed length of the stalk below the bud, in crest units. Defaults to the radius. */
  stalkLength?: number;
}

type Arc = Extract<Piece, { t: "A" }>;

const arc = (a: V, b: V, radius: number, hint: V): Arc =>
  shortArc(circleThrough(a, b, radius, hint), a, b) as Arc;
const tip: V = [0, .73];
const line = arc([-.54, -.52], tip, 1.17, [-1.1, .38]);
const centralSeam = arc([0, -.61], tip, 1.42, [1.4, 0]);

const seam = (edge: Piece, width: number) => {
  if (edge.t !== "A") return [];
  return [
    thickArc(edge.c, edge.r, width, edge.a0, edge.a1),
    disc(pieceStart(edge), width / 2),
    disc(pieceEnd(edge), width / 2),
  ];
};
const outerSeams = [line, mirrored(line)];
const head = disc([0, 0], 1);

/** Size is the radius of the head. Its stalk extends downwards before the turn. */
export const budRound = definePart<BudOptions>({
  id: "bud-round",
  name: { en: "Round bud", ja: "丸いつぼみ" },
  description: { en: "A round bud on a thin stalk, with curved white seams between its closed sepals.", ja: "細い茎の先に丸いつぼみを置き、閉じた萼の間に弧を描いて白いすき間を作ります。" },
  families: ["kiku"],
  sources: [{ frame: 40, page: "R", row: 4, col: 2, label: "きく鶴" }],
  stock: true,
  sampleSize: 39,
  sampleOptions: { motif: "chrysanthemum", stalkLength: 34 },
  build(c, centre, turn, size, { motif, keyline, seams = 2, stalkLength = size, paper = 1.25 }) {
    if (!Number.isFinite(stalkLength) || stalkLength < 0) throw new Error("bud-round: stalk length must be non-negative and finite");
    if (!Number.isFinite(paper) || paper <= 0) throw new Error("bud-round: paper must be positive and finite");
    const stem = stalkLength === 0 ? [] : [thickSeg([0, -.83], [0, -1 - stalkLength / size], .27)];
    const edges = seams === 3 ? [...outerSeams, centralSeam] : outerSeams;
    const ink = carve([head, ...stem], edges.flatMap((edge) => seam(edge, paper / size)));

    fillPart(c, motif, ink, { k: size, at: centre, turn }, keyline);
  },
});
export default budRound;
