import { bowedArc, carve, disc, mirrored, reversedRun, thickArc, thickSeg } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { fillPart, layerParts } from "./layers.ts";
import { PAPER, definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

type Mark = readonly [x: number, y: number, bow?: number];
const p = (x: number, y: number): V => [(x - 160) * .615, (174 - y) * .615];

function outline(marks: readonly Mark[], close = true): Region {
  return marks.slice(0, close ? marks.length : -1).map(([x, y, bow], i) => {
    const [u, v] = marks[(i + 1) % marks.length];
    return bowedArc(p(x, y), p(u, v), (bow ?? 0) * .615);
  });
}
function bilateral(marks: readonly Mark[]): Region {
  const half = outline(marks, false);
  return [...half, ...reversedRun(half.map(mirrored))];
}
function line(a: Mark, b: Mark, paper: number): Region {
  const start = p(a[0], a[1]);
  const end = p(b[0], b[1]);
  const arc = bowedArc(start, end, (a[2] ?? 0) * .615);
  return arc.t === "A"
    ? thickArc(arc.c, arc.r, paper, Math.min(arc.a0, arc.a1), Math.max(arc.a0, arc.a1))
    : thickSeg(start, end, paper);
}
const mid = bilateral([[160, 173], [181, 173, 4], [188, 196, 3], [182, 237, 4], [168, 248, 3], [160, 251]]);
const tail = bilateral([[160, 253], [182, 253, 3], [179, 288, 3], [169, 312, 1], [160, 326]]);
const crown = bilateral([[160, 84], [169, 101, 3], [187, 98, 2], [178, 111, 2], [170, 130, -3], [177, 153, 3], [170, 165, 2], [160, 169]]);

const height = (326 - 84) * .615;
const eyes = [p(128, 120), p(192, 120)];

function outlineAt(paper: number) {
  const seam = (a: Mark, b: Mark) => line(a, b, paper);
  return [
    ...carve([mid], [
      seam([145, 188, -4], [175, 188]), seam([143, 207, -4], [177, 207]), seam([146, 227, -4], [174, 227]),
    ]),
    ...carve([tail], [seam([147, 281, 5], [173, 281]), seam([149, 296, 4], [171, 296])]),
    crown,
  ];
}

/** Size is the full height of the three body sections. Place the body axis. */
export const bizenButterflyBody = definePart<PartOptions>({
  id: "butterfly-body-bizen",
  name: { en: "Bizen butterfly body", ja: "備前蝶の胴" },
  description: {
    en: "Two ringed eyes sit beside a pointed crown above two ribbed sections.",
    ja: "先のとがった頭の左右に輪の目を置き、その下の二つの形に細い筋を入れます。",
  },
  families: ["cho"],
  sources: [{ frame: 33, page: "L", row: 3, col: 4, label: "備前てふ" }],
  stock: true,
  sampleSize: height,
  sampleOptions: { motif: "butterfly" },
  build(c, centre, turn, size, { motif, paper = PAPER, keyline }) {
    const k = size / height;
    const lineWidth = paper / k;
    if (lineWidth >= 5.5) throw new Error("butterfly-body-bizen: the paper is too wide for the eyes");
    const placing = { k, at: centre, turn };
    layerParts(c, () => {
      fillPart(c, motif, outlineAt(lineWidth), placing, keyline);
      for (const eye of eyes) fillPart(c, motif, [disc(eye, 5.5), disc(eye, 5.5 - lineWidth)], placing);
    });
  },
});
export default bizenButterflyBody;
