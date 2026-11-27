import { bowedArc, carve, circleThrough, disc, shortArc, thickArc } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { fillPart, layerParts } from "./layers.ts";
import { PAPER, definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

interface FusenWingOptions extends PartOptions {
  /** Reflect the wing to the other side of the body. */
  mirror?: boolean;
}

type Mark = readonly [x: number, y: number, bow?: number];
const p = (x: number, y: number): V => [(x - 174) * .59, (157 - y) * .59];
const wingSpan = (329 - 174) * .59;

function loop(marks: readonly Mark[]): Region {
  return marks.map(([x, y, bow], i) => {
    const [nextX, nextY] = marks[(i + 1) % marks.length];
    return bowedArc(p(x, y), p(nextX, nextY), (bow ?? 0) * .59);
  });
}

function cut(a: Mark, b: Mark, paper: number): Region {
  const arc = bowedArc(p(a[0], a[1]), p(b[0], b[1]), (a[2] ?? 1) * .59);
  if (arc.t !== "A") throw new Error("The wing vein must be an arc");
  return thickArc(arc.c, arc.r, paper, Math.min(arc.a0, arc.a1), Math.max(arc.a0, arc.a1));
}

const high = loop([
  [176, 3, 6], [236, 11, 5], [276, 41, 5], [302, 81, 4],
  [323, 115, 4], [319, 151, 5], [329, 184, 3], [320, 207, -2],
  [265, 211, -2], [224, 225, 1], [195, 244, 3],
  [184, 247, 3], [182, 188, 2], [186, 168, -1], [207, 151, -5],
  [227, 119, -7], [233, 77, -6], [215, 40, -7], [188, 26, -3],
  [181, 36, 3], [176, 38, .45], [176, 25, -2], [188, 17, -2],
]);
const low = loop([
  [321, 207, 2], [310, 226, 2], [288, 238, 7], [270, 267, 3], [235, 289, 1],
  [212, 302, 2], [179, 313, -2], [175, 295, 0], [180, 259, -4], [204, 237, -3],
  [243, 218, -2], [280, 209, -1],
]);
const eyes: readonly (readonly [number, number, number])[] = [[265, 64, 6.7], [295, 112, 7.5], [306, 166, 8.4]];
function wings(paper: number) {
  const line = (a: Mark, b: Mark) => cut(a, b, paper);
  const eyeMarks = eyes.flatMap(([x, y, r]) => [
    disc(p(x, y), .59 * r),
    line([x - r - 2, y + 10, -3], [x + r + 2, y + 8]),
    line([x - r - 3, y + 17, -4], [x + r + 4, y + 14]),
  ]);
  const ribs = [
    line([190, 185, -4], [230, 160]), line([191, 196, -6], [242, 165]),
    line([193, 207, -6], [251, 175]), line([193, 220, -5], [258, 185]),
    line([191, 234, -5], [269, 197]),
  ];
  const rimStart = p(197, 24);
  const rimEnd = p(206, 156);
  const rim = shortArc(circleThrough(rimStart, rimEnd, 43, p(170, 83)), rimStart, rimEnd);
  if (rim.t !== "A") throw new Error("The open wing rim must be an arc");
  const trail = [
    thickArc(rim.c, rim.r, paper, Math.min(rim.a0, rim.a1), Math.max(rim.a0, rim.a1)),
    line([231, 126, 8], [274, 202]),
  ];
  const shortRibs = [
    line([279, 230, -2.5], [236, 228]), line([281, 247, -2.5], [219, 244]),
    line([267, 266, -3], [211, 258]), line([255, 282, -3.5], [201, 269]),
    line([228, 300, -3], [191, 286]), line([207, 308, -1], [186, 298]),
  ];
  return { fore: carve([high], [...eyeMarks, ...ribs, ...trail]), hind: carve([low], shortRibs) };
}

/** Place the body axis at the head. Size runs from that axis to the outer wing station. */
export const fusenWing = definePart<FusenWingOptions>({
  id: "fusen-wing",
  name: { en: "Floating-line butterfly wing", ja: "浮線蝶の羽" },
  description: {
    en: "A wing with a high scalloped edge, three eyes and a lower fan of arced ribs.",
    ja: "弧をつないだ上の羽に三つの目を置き、下の羽に弧の筋を扇形に広げます。",
  },
  families: ["cho"],
  sources: [{ frame: 34, page: "L", row: 4, col: 2, label: "ふせんてふ" }],
  stock: true,
  sampleSize: wingSpan,
  sampleOptions: { motif: "butterfly" },
  build(c, centre, turn, size, { motif, mirror, paper = PAPER, keyline = paper }) {
    const k = size / wingSpan;
    const { fore, hind } = wings(paper / k);
    const placing = { k, at: centre, turn, mirror };
    layerParts(c, () => {
      fillPart(c, motif, hind, placing);
      fillPart(c, motif, fore, placing, keyline);
    });
  },
});

export default fusenWing;
