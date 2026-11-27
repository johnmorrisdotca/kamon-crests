import { bowedArc, carve, disc, mirrored, reversedRun, thickSeg } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { fillPart, layerParts } from "./layers.ts";
import { PAPER, definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

type Mark = readonly [x: number, y: number, bow?: number];
const p = (x: number, y: number): V => [(x - 174) * .59, (157 - y) * .59];
const bodyLength = (313 - 143) * .59;

function symmetric(marks: readonly Mark[]): Region {
  const half = marks.slice(0, -1).map(([x, y, bow], i) => {
    const [u, v] = marks[i + 1];
    return bowedArc(p(x, y), p(u, v), (bow ?? 0) * .59);
  });
  return [...half, ...reversedRun(half.map(mirrored))];
}

const thorax = symmetric([[174, 172, 0], [192, 172, 3], [191, 216, 2], [174, 250]]);
const abdomen = symmetric([[174, 271, 0], [192, 249, 3], [193, 279, 3], [174, 313]]);
const head = symmetric([[174, 143, 5], [197, 155, 4], [191, 170, 4], [174, 177]]);
const eyes = [p(194, 160), p(154, 160)];

/** The placement is level with the eyes, and size is the body from crown to tail. */
export const butterflyBody = definePart<PartOptions>({
  id: "butterfly-body",
  name: { en: "Butterfly body", ja: "蝶の胴" },
  description: {
    en: "A rounded head with two ringed eyes and two pointed body sections.",
    ja: "丸い頭に輪の目を二つ置き、胴を先のとがった二つの形で描きます。",
  },
  families: ["cho"],
  sources: [{ frame: 34, page: "L", row: 4, col: 2, label: "ふせんてふ" }],
  stock: true,
  sampleSize: bodyLength,
  sampleOptions: { motif: "butterfly" },
  build(c, centre, turn, size, { motif, paper = PAPER, keyline = paper }) {
    const k = size / bodyLength;
    const line = paper / k;
    const placing = { k, at: centre, turn };
    const face = [
      ...carve([thorax], [thickSeg(p(174, 179), p(174, 238), line)]),
      ...carve([abdomen], [thickSeg(p(174, 277), p(174, 305), line)]),
      head,
    ];
    layerParts(c, () => {
      fillPart(c, motif, face, placing, keyline);
      for (const eye of eyes) fillPart(c, motif, [disc(eye, 5.2), disc(eye, 3.2)], placing, keyline);
    });
  },
});

export default butterflyBody;
