import { DEG, carve, disc, onCircle, thickArc } from "../../construct/compass.ts";
import type { V } from "../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

interface BerryOptions extends PartOptions {
  /** Show the short white arc inside the berry. Defaults to true. */
  highlight?: boolean;
}

const outline = disc([0, 0], 1);
const centre: V = [-.05, -.02];
const radius = .58;
const width = .16;
const from = 66 * DEG;
const to = 138 * DEG;
const shine = [
  thickArc(centre, radius, width, from, to),
  disc(onCircle(centre, radius, from), width / 2),
  disc(onCircle(centre, radius, to), width / 2),
];
const highlighted = carve([outline], shine);

/** Size is the radius, in crest units. */
export const berry = definePart<BerryOptions>({
  id: "berry",
  name: { en: "Berry", ja: "実" },
  description: { en: "A round berry with one short white highlight arc.", ja: "丸い実の中に、短い白い弧を一本入れます。" },
  families: ["nanten"],
  sources: [{ frame: 23, page: "L", row: 4, col: 4, label: "枝なんてん" }],
  stock: true,
  sampleSize: 61,
  sampleOptions: { motif: "nanten" },
  build(c, centre, turn, size, { motif, keyline, highlight = true }) {
    fillPart(c, motif, highlight ? highlighted : [outline], { k: size, at: centre, turn }, keyline);
  },
});

export default berry;
