import { DEG, arcA, disc, onCircle } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { PAPER, definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

interface BerryOptions extends PartOptions {
  /** Show the short white arc inside the berry. Defaults to true. */
  highlight?: boolean;
}

const outline = disc([0, 0], 1);
const shineCentre: V = [-.05, .04];
const shineRadius = .5;
const from = 90 * DEG;
const to = 174 * DEG;

function shine(width: number): Region {
  const half = width / 2;
  if (half >= shineRadius || Math.hypot(...shineCentre) + shineRadius + half >= 1) {
    throw new Error("berry: the highlight is too wide to fit inside the berry");
  }

  return [
    arcA(shineCentre, shineRadius + half, from, to),
    arcA(onCircle(shineCentre, shineRadius, to), half, to, to + Math.PI),
    arcA(shineCentre, shineRadius - half, to, from),
    arcA(onCircle(shineCentre, shineRadius, from), half, from + Math.PI, from + 2 * Math.PI),
  ];
}

/** Size is the radius, in crest units. */
export const berry = definePart<BerryOptions>({
  id: "berry",
  name: { en: "Berry", ja: "実" },
  description: { en: "A round berry with a short white arc near its upper left.", ja: "丸い実の左上に、細く短い白い弧を一本入れます。" },
  families: ["nanten"],
  sources: [{ frame: 23, page: "L", row: 4, col: 4, label: "枝なんてん" }],
  stock: true,
  sampleSize: 61,
  sampleOptions: { motif: "nanten" },
  build(c, centre, turn, size, { motif, keyline, highlight = true, paper = PAPER }) {
    fillPart(c, motif, highlight ? [outline, shine(paper / size)] : [outline], { k: size, at: centre, turn }, keyline);
  },
});

export default berry;
