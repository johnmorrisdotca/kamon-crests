import { bowedArc, carve, thickArc, thickSeg } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { fillPart, layerParts } from "./layers.ts";
import { PAPER, definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

type Mark = readonly [x: number, y: number, bow?: number];
const p = (x: number, y: number): V => [(x - 166) * .61, (169 - y) * .61];

function loop(points: readonly Mark[]): Region {
  return points.map(([x, y, bow], i) => {
    const [u, v] = points[(i + 1) % points.length];
    return bowedArc(p(x, y), p(u, v), (bow ?? 0) * .61);
  });
}

function cut(start: Mark, end: Mark, paper: number): Region {
  const a = p(start[0], start[1]);
  const b = p(end[0], end[1]);
  const arc = bowedArc(a, b,(start[2] ?? 0) * .61);
  return arc.t === "A" ? thickArc(arc.c, arc.r, paper, Math.min(arc.a0, arc.a1), Math.max(arc.a0, arc.a1)) : thickSeg(a, b, paper);
}

function outline(paper: number): Region[] {
  const seam = (a: Mark, b: Mark) => cut(a, b, paper);
  return carve([loop([
    [167, 218, 1], [179, 199, -1], [203, 178, 3], [215, 157, 1],
    [220, 135, 4], [235, 121, 6], [249, 124, 4], [247, 138, -4], [238, 151, -5], [253, 149, 5],
    [257, 159, 2], [251, 171, -4], [258, 180, 6], [254, 193, 4], [241, 200, 3],
    [229, 211, 2], [221, 213, -4], [215, 219, 3], [196, 218, -2], [192, 226, 2], [176, 229, 1],
  ])], [
    seam([237, 166, -5], [179, 215]), seam([240, 174, -4], [187, 217]), seam([242, 183, -2], [195, 216]),
    seam([239, 191, -3], [204, 213]),
  ]);
}
const tail = loop([
  [198, 167, 0], [198, 150, 3], [203, 131, 4], [201, 111, 4], [209, 92, 6], [221, 94, 4],
  [222, 105, -4], [218, 114, -3], [230, 113, 4], [230, 125, 3], [223, 138, 3], [221, 160, 0], [211, 169, -1],
]);

const height = (229 - 92) * .61;

/** Size is from the top lobe to the bottom of the hindwing. Place the body axis. */
export const swallowtailHindwing = definePart<PartOptions>({
  id: "swallowtail-hindwing",
  name: { en: "Swallowtail hindwing", ja: "揚羽蝶の後ろの羽" },
  description: {
    en: "A scalloped outer fan of ribs under a curved two-lobed tail.",
    ja: "弧の筋を扇形に広げた羽の上に、丸い形が二つ並ぶ尾を置きます。",
  },
  families: ["cho"],
  sources: [{ frame: 28, page: "R", row: 4, col: 3, label: "うりニあげは蝶" }],
  stock: true,
  sampleSize: height,
  sampleOptions: { motif: "butterfly" },
  build(c, centre, turn, size, { motif, paper = PAPER, keyline = paper }) {
    const k = size / height;
    const placing = { k, at: centre, turn };
    layerParts(c, () => {
      fillPart(c, motif, [tail], placing);
      fillPart(c, motif, outline(paper / k), placing, keyline);
    });
  },
});
export default swallowtailHindwing;
