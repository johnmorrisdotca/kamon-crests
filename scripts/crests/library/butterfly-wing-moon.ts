import { bowedArc, carve, circleThrough, disc, shortArc, thickArc, thickSeg } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { fillPart, layerParts } from "./layers.ts";
import { PAPER, definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

type Mark = readonly [x: number, y: number, bow?: number];
const p = (x: number, y: number): V => [(x - 178) * .61, (163 - y) * .61];

function outline(marks: readonly Mark[]): Region {
  return marks.map(([x, y, bow], i) => {
    const [u, v] = marks[(i + 1) % marks.length];
    return bowedArc(p(x, y), p(u, v), (bow ?? 0) * .61);
  });
}

function line(a: Mark, b: Mark, paper: number): Region {
  const start = p(a[0], a[1]);
  const end = p(b[0], b[1]);
  const arc = bowedArc(start, end, (a[2] ?? 0) * .61);
  return arc.t === "A"
    ? thickArc(arc.c, arc.r, paper, Math.min(arc.a0, arc.a1), Math.max(arc.a0, arc.a1))
    : thickSeg(start, end, paper);
}

const high = outline([
  [179.5, 12, 2], [221, 18, 2], [258, 33, 4], [293, 59, 5], [316, 88, 3],
  [328, 121, 3], [333, 154, 3], [331, 182, 3], [334, 206, 3], [319, 240, 4],
  [300, 270, 2], [270, 281, 2], [222, 268, 0], [182, 256, 1],
  [184, 225, -1], [211, 217, -3], [246, 196, -5], [268, 166, -5],
  [277, 125, -6], [272, 82, -6], [247, 43, -4], [215, 25, -4], [179.5, 19, 0],
]);
const low = outline([
  [184, 266, 0], [226, 269, -2], [267, 271, 3], [292, 273, 4],
  [283, 287, 4], [260, 302, 3], [225, 310, 4], [179, 313, -2],
]);
function wings(paper: number) {
  const seam = (a: Mark, b: Mark) => line(a, b, paper);
  const start = p(195, 21);
  const end = p(208, 222);
  const rim = shortArc(circleThrough(start, end, 62.45, p(155, 120)), start, end);
  if (rim.t !== "A") throw new Error("The inner rim must be an arc");
  const spots = [[310, 139, 7.2], [305, 194, 7.5], [289, 239, 7]];
  const eyeCuts = spots.flatMap(([x, y, r]) => [
    disc(p(x, y), .61 * r),
    seam([x - 7, y + 9, 1.9], [x + 9, y + 10]),
    seam([x - 8, y + 16, 2], [x + 7, y + 17]),
  ]);
  const fore = carve([high], [
    thickArc(rim.c, rim.r, paper, Math.min(rim.a0, rim.a1), Math.max(rim.a0, rim.a1)),
    ...eyeCuts,
    disc(p(258, 48), 3.1),
    seam([197, 242, -3], [244, 221]), seam([197, 250, -4], [248, 230]),
    seam([198, 260, -4], [249, 239]), seam([201, 270, -4], [252, 251]),
    seam([206, 279, -4], [260, 262]),
    seam([254, 198, 6], [265, 270]),
  ]);
  const hind = carve([low], [
    seam([206, 279, -2], [256, 276]), seam([209, 287, -3], [262, 283]),
    seam([212, 295, -3], [252, 295]), seam([213, 302, -2], [235, 301]),
  ]);
  return { fore, hind };
}

interface MoonWingOptions extends PartOptions {
  mirror?: boolean;
}
const reach = (334 - 178) * .61;

/** Size is the span from the body axis to the outer wing. */
export const moonButterflyWing = definePart<MoonWingOptions>({
  id: "butterfly-wing-moon",
  name: { en: "Moon-and-star butterfly wing", ja: "月星蝶の羽" },
  description: {
    en: "A long curved wing surrounds half an open centre. Three eyes and a small lower fan divide the outer wing.",
    ja: "長い弧の羽で中央の空きを囲み、外に三つの目を、下に弧の筋を置きます。",
  },
  families: ["cho"],
  sources: [{ frame: 34, page: "R", row: 1, col: 4, label: "月星てふ" }],
  stock: true,
  sampleSize: reach,
  sampleOptions: { motif: "butterfly" },
  build(c, centre, turn, size, { motif, paper = PAPER, keyline = paper, mirror }) {
    const k = size / reach;
    const { fore, hind } = wings(paper / k);
    const placing = { at: centre, k, turn, mirror };
    layerParts(c, () => {
      fillPart(c, motif, fore, placing);
      fillPart(c, motif, hind, placing, keyline);
    });
  },
});
export default moonButterflyWing;
