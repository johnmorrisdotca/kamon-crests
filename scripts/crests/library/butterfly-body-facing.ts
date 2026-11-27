import { bowedArc, carve, disc, mirrored, reversedRun, thickArc, thickSeg } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { fillPart, layerParts } from "./layers.ts";
import { PAPER, definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

type Mark = readonly [x: number, y: number, bow?: number];
const p = (x: number, y: number): V => [(x - 158) * .61, (155 - y) * .61];

const mirror = (region: Region): Region => reversedRun(region.map(mirrored));
function path(marks: readonly Mark[], closed = true): Region {
  return marks.slice(0, closed ? marks.length : -1).map(([x, y, bow], i) => {
    const [u, v] = marks[(i + 1) % marks.length];
    return bowedArc(p(x, y), p(u, v), (bow ?? 0) * .61);
  });
}

function symmetric(marks: readonly Mark[]): Region {
  const right = path(marks, false);
  return [...right, ...mirror(right)];
}

function cut(start: Mark, end: Mark, paper = PAPER): Region {
  const a = p(start[0], start[1]);
  const b = p(end[0], end[1]);
  const arc = bowedArc(a, b, (start[2] ?? 0) * .61);
  return arc.t === "A"
    ? thickArc(arc.c, arc.r, paper, Math.min(arc.a0, arc.a1), Math.max(arc.a0, arc.a1))
    : thickSeg(a, b, paper);
}

const lance = symmetric([[158,5,2],[177,43,3],[186,103,3],[184,153,1],[172,212,1],[158,233]]);
const head = symmetric([[158,222,6],[180,238,5],[177,261,4],[164,277,2],[162,305,2],[158,309]]);
const headHole = symmetric([[158,232,3],[171,243,3],[167,259,2],[160,271,1],[158,274]]);
const face = carve([head],[headHole]);


const bodyLength = (309 - 5) * .61;
const eyes = [p(149, 280), p(167, 280)];

/** Size is from the pointed crown to the lower tip. Place the body axis. */
export const frontButterflyBody = definePart<PartOptions>({
  id: "butterfly-body-facing",
  name: { en: "Front-view butterfly body", ja: "真向き蝶の胴" },
  description: {
    en: "Three pairs of curved ribs divide a pointed ridge above a ringed head and two eyes.",
    ja: "先のとがった胴に三組の弧の筋を入れ、その下に丸い頭と二つの目を置きます。",
  },
  families: ["cho"],
  sources: [{ frame: 34, page: "R", row: 3, col: 2, label: "真むきてふ" }],
  stock: true,
  sampleSize: bodyLength,
  sampleOptions: { motif: "butterfly" },
  build(c, centre, turn, size, { motif, paper = PAPER, keyline = paper }) {
    const k = size / bodyLength;
    const line = (a: Mark, b: Mark) => cut(a, b, paper / k);
    const bodyCuts = [
      line([158,90],[158,220]),
      line([158,104,1],[184,128]),line([158,124,1],[183,145]),line([158,148,2],[181,167]),
      line([178,65,-3],[166,76]),line([166,76,2],[158,98]),
    ];
    const body = carve([lance],[...bodyCuts,...bodyCuts.slice(1).map(mirror)]);
    const placing = { k, at: centre, turn };
    layerParts(c, () => {
      fillPart(c, motif, body, placing, keyline);
      fillPart(c, motif, face, placing, keyline);
      for (const eye of eyes) fillPart(c, motif, [disc(eye, 4), disc(eye, 1.7)], placing, keyline);
    });
  },
});
export default frontButterflyBody;
