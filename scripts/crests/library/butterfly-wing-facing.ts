import { bowedArc, carve, disc, thickArc, thickSeg } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { fillPart, layerParts } from "./layers.ts";
import { PAPER, definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

type Mark = readonly [x: number, y: number, bow?: number];
const p = (x: number, y: number): V => [(x - 158) * .61, (155 - y) * .61];


interface FrontWingOptions extends PartOptions {
  mirror?: boolean;
}

const wingSpan = (306 - 158) * .61;

function path(marks: readonly Mark[]): Region {
  return marks.map(([x, y, bow], i) => {
    const [u, v] = marks[(i + 1) % marks.length];
    return bowedArc(p(x, y), p(u, v), (bow ?? 0) * .61);
  });
}

function cut(start: Mark, end: Mark, paper = PAPER): Region {
  const a = p(start[0], start[1]);
  const b = p(end[0], end[1]);
  const arc = bowedArc(a, b, (start[2] ?? 0) * .61);
  return arc.t === "A"
    ? thickArc(arc.c, arc.r, paper, Math.min(arc.a0, arc.a1), Math.max(arc.a0, arc.a1))
    : thickSeg(a, b, paper);
}

const wing = path([
  [160, 6, 2.6], [194, 16, 5], [222, 36, 4], [241, 60, 4], [257, 86, 4],
  [266, 117, 5], [275, 148, 2], [267, 169, 3], [247, 187, -1],
  [219, 216, -2], [187, 240, -2], [175, 226, -2], [180, 195, -2],
  [185, 149, -2], [185, 107, -4], [181, 58, -3], [171, 29, -1],
]);
const skirt = path([
  [180,240,1],[210,214,-2],[244,196,-6],[270,175,-2],[289,150,5],
  [305,156,-3],[299,168,-3],[306,180,4],[298,197,1],[279,202,-2],
  [291,217,-3],[284,225,1],[269,229,-2],[276,241,-2],[267,254,4],
  [249,255,4],[239,268,-2],[223,266,3],[210,280,-2],[193,267,1],[178,248,1],
]);

const eyes: readonly (readonly [number, number, number])[] = [[209,63,6.1],[235,105,6.4],[249,148,6.2]];
function wingsAt(paper: number) {
  const line = (a: Mark, b: Mark) => cut(a, b, paper);
  const badges = eyes.flatMap(([x, y, r]) => [
    disc(p(x, y), .61 * r),
    line([x-8,y+10,-2],[x+8,y+12]),
    line([x-8,y+18,-2],[x+7,y+20]),
  ]);
  const fore = carve([wing], [
    ...badges,
    line([185,124,-9],[247,188]),
    line([186,215,3],[200,179]),line([192,223,3],[213,178]),
    line([200,230,3],[226,182]),line([209,232,3],[239,185]),
  ]);
  const hind = carve([skirt], [
    line([285,183,4],[222,245]),line([278,202,4],[217,252]),
    line([267,216,4],[214,260]),line([255,230,4],[226,266]),
    line([249,246,2],[230,270]),
  ]);
  return { fore, hind };
}

/** Place the body's axis. Size is the distance from the axis to the lateral tip. */
export const frontButterflyWing = definePart<FrontWingOptions>({
  id: "butterfly-wing-facing",
  name: { en: "Front-view butterfly wing", ja: "真向き蝶の羽" },
  description: {
    en: "A high scalloped forewing carries three eye marks above the fanned ribs of the flared lower wing.",
    ja: "弧をつないだ上の羽に三つの目を置き、下の羽に弧の筋を扇形に広げます。",
  },
  families: ["cho"],
  sources: [{ frame: 34, page: "R", row: 3, col: 2, label: "真むきてふ" }],
  stock: true,
  sampleSize: wingSpan,
  sampleOptions: { motif: "butterfly" },
  build(c, centre, turn, size, { motif, mirror, paper = PAPER, keyline = paper }) {
    const k = size / wingSpan;
    const { fore, hind } = wingsAt(paper / k);
    const placing = { k, at: centre, turn, mirror };
    layerParts(c, () => {
      fillPart(c, motif, fore, placing);
      fillPart(c, motif, hind, placing, keyline);
    });
  },
});
export default frontButterflyWing;
