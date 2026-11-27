import { carve, disc, shortArc, thickSeg } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { PAPER, definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

interface LeafOptions extends PartOptions {
  /** Full width divided by tip-to-tip length. Defaults to .34. */
  width?: number;
  /** True stops short of the tips, "full" reaches both tips, and false leaves the blade solid. */
  midrib?: boolean | "full";
}

function lens(width: number): Region {
  const half = width / 2;
  const radius = (.25 + half * half) / (2 * half);
  const bottom: V = [0, -.5];
  const top: V = [0, .5];

  return [
    shortArc({ c: [half - radius, 0], r: radius }, bottom, top),
    shortArc({ c: [radius - half, 0], r: radius }, top, bottom),
  ];
}

const lower: V = [0, -.36];
const upper: V = [0, .40];

/** Size is the full length, from the lower tip to the upper tip. */
export const leafLens = definePart<LeafOptions>({
  id: "leaf-lens",
  name: { en: "Lens leaf", ja: "レンズ形の葉" },
  description: { en: "Two arcs meet at the tips of the leaf, with a white midrib between them.", ja: "二本の弧が葉の先で合い、中央に白い葉脈を残します。" },
  families: ["nanten"],
  sources: [{ frame: 23, page: "L", row: 4, col: 4, label: "枝なんてん" }],
  stock: true,
  sampleSize: 156,
  sampleOptions: { motif: "nanten" },
  build(c, centre, turn, size, { motif, keyline, width = .34, midrib = true, paper = PAPER }) {
    if (!Number.isFinite(width) || width <= 0 || width >= 1) throw new Error("leaf-lens: width must be between zero and one");
    const edge = lens(width);
    const line = paper / size;
    if (midrib && line >= width) throw new Error("leaf-lens: the midrib is too wide to fit inside the leaf");
    const cut = midrib === "full"
      ? [thickSeg([0, -.5], [0, .5], line)]
      : [thickSeg(lower, upper, line), disc(lower, line / 2), disc(upper, line / 2)];
    const ink = midrib ? carve([edge], cut) : [edge];

    fillPart(c, motif, ink, { k: size, at: centre, turn }, keyline);
  },
});

export default leafLens;
