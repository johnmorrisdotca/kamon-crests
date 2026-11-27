import { bowedArc } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

interface FootOptions extends PartOptions {
  mirror?: boolean;
}

type Mark = readonly [x: number, y: number, bow: number];
const marks: readonly Mark[] = [
  [179, 253, 3], [192, 250, -2], [194, 257, -2], [190, 267, 1],
  [195, 283, 1], [187, 280, 1], [181, 268, 0],
];
const local = (x: number, y: number): V => [(x - 179) * .61, (253 - y) * .61];
const length = (283 - 250) * .61;
const outline: Region = marks.map(([x, y, bow], i) => {
  const [u, v] = marks[(i + 1) % marks.length];
  return bowedArc(local(x, y), local(u, v), bow * .61);
});

/** Place the foot at its upper root. Size is its height from upper curve to tip. */
export const butterflyFoot = definePart<FootOptions>({
  id: "butterfly-foot",
  name: { en: "Curved butterfly foot", ja: "蝶の曲がった脚" },
  description: {
    en: "A broad root narrows through an inward bend to one downward hook.",
    ja: "広い付け根から細く曲がり、下向きの先で終わります。",
  },
  families: ["cho"],
  sources: [{ frame: 34, page: "R", row: 3, col: 2, label: "真むきてふ" }],
  stock: true,
  sampleSize: 76,
  sampleOptions: { motif: "butterfly" },
  build(c, centre, turn, size, { motif, mirror, keyline }) {
    fillPart(c, motif, [outline], { k: size / length, at: centre, turn, mirror }, keyline);
  },
});

export default butterflyFoot;
