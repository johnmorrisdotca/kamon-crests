import { bowedArc, carve, circleThrough, disc, shortArc, thickArc, thickSeg } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { fillPart, layerParts } from "./layers.ts";
import { PAPER, definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

type Mark = readonly [x: number, y: number, bow?: number];
const p = (x: number, y: number): V => [(x - 160) * .615, (174 - y) * .615];

function outline(marks: readonly Mark[]): Region {
  return marks.map(([x, y, bow], i) => {
    const [u, v] = marks[(i + 1) % marks.length];
    return bowedArc(p(x, y), p(u, v), (bow ?? 0) * .615);
  });
}
function line(a: Mark, b: Mark, paper: number): Region {
  const start = p(a[0], a[1]);
  const end = p(b[0], b[1]);
  const arc = bowedArc(start, end, (a[2] ?? 0) * .615);
  return arc.t === "A"
    ? thickArc(arc.c, arc.r, paper, Math.min(arc.a0, arc.a1), Math.max(arc.a0, arc.a1))
    : thickSeg(start, end, paper);
}
const wing = outline([
  [172, 25, 5], [195, 21, 3], [229, 38, 3], [251, 52, 4], [270, 67, 3],
  [270, 80, -3], [263, 83, -3], [267, 96, 2], [276, 86, 4], [293, 109, 3],
  [300, 131, 3], [310, 156, 4], [298, 166, -3], [294, 176, -3], [302, 188, 4],
  [312, 199, 3], [304, 225, 3], [294, 236, 2], [231, 244, -1], [193, 245, 0],
  [188, 208, 1], [191, 170, -2], [209, 147, -4], [224, 115, -4], [222, 80, -4],
  [204, 55, -4], [176, 43, -3], [166, 52, 3], [165, 36, 2],
]);
const bottom = outline([
  [185, 251, 1], [228, 251, 2], [265, 247, 3], [299, 238, 2], [293, 262, 4],
  [275, 281, 4], [253, 293, 0], [239, 282, -3], [231, 294, -3], [239, 300, 1],
  [215, 319, 3], [172, 323, -2], [175, 289, 2],
]);
const dots = [[237, 63, 4.3], [254, 120, 4.8], [273, 154, 4.7], [274, 213, 5.6]] as const;
const innerA = p(174, 31);
const innerB = p(197, 164);
const rim = shortArc(circleThrough(innerA, innerB, 45, p(143, 98)), innerA, innerB);
function wings(paper: number) {
  if (rim.t !== "A") throw new Error("The inner opening must be curved");
  const seam = (a: Mark, b: Mark) => line(a, b, paper);
  const high = carve([wing], [
    thickArc(rim.c, rim.r, paper, Math.min(rim.a0, rim.a1), Math.max(rim.a0, rim.a1)),
    ...dots.map(([x, y, r]) => disc(p(x, y), r * .615)),
    seam([198, 183, -3], [239, 149]), seam([200, 199, -3], [245, 175]),
    seam([202, 219, -3], [249, 199]), seam([203, 233, -2], [250, 219]),
  ]);
  const low = carve([bottom], [
    disc(p(260, 270), 3.9), disc(p(208, 312), 3.5),
    seam([191, 266, -2], [225, 260]), seam([192, 285, -3], [213, 276]),
  ]);
  return { high, low };
}

interface BizenWingOptions extends PartOptions {
  mirror?: boolean;
}
const span = (312 - 160) * .615;

/** Size is the span from the body axis to the outer edge of the wing. */
export const bizenButterflyWing = definePart<BizenWingOptions>({
  id: "butterfly-wing-bizen",
  name: { en: "Bizen butterfly wing", ja: "備前蝶の羽" },
  description: {
    en: "A broad upper wing curls around the open centre, above a short wing with a scalloped lower edge.",
    ja: "幅広い上の羽が中央の空きをまわり、下に丸い切れ込みのある短い羽を置きます。",
  },
  families: ["cho"],
  sources: [{ frame: 33, page: "L", row: 3, col: 4, label: "備前てふ" }],
  stock: true,
  sampleSize: span,
  sampleOptions: { motif: "butterfly" },
  build(c, centre, turn, size, { motif, paper = PAPER, keyline = paper, mirror }) {
    const k = size / span;
    const { high, low } = wings(paper / k);
    const placing = { k, at: centre, turn, mirror };
    layerParts(c, () => {
      fillPart(c, motif, low, placing);
      fillPart(c, motif, high, placing, keyline);
    });
  },
});
export default bizenButterflyWing;
