import { carve, mirrored, thickSeg } from "../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { leafLensOutline } from "./leaf-lens.ts";
import { PAPER, definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

interface PinnateLeafOptions extends PartOptions {
  /** Full width divided by tip-to-tip length. */
  width?: number;
}

const sourceWidth = .452;
const ribs = [[.21, .167], [.40, .167], [.60, .128]] as const;

/** Size is the full length between the tips. */
export const leafPinnate = definePart<PinnateLeafOptions>({
  id: "leaf-pinnate",
  name: { en: "Pinnately veined leaf", ja: "羽状脈の葉" },
  description: {
    en: "Two arcs form a pointed blade with a midrib and three pairs of side veins.",
    ja: "二本の弧でとがった葉を作り、主脈と左右三組の葉脈を通します。",
  },
  families: ["fuji", "kiku"],
  sources: [{ frame: 40, page: "R", row: 1, col: 2, label: "きくの枝" }],
  stock: true,
  sampleSize: 140,
  sampleOptions: { motif: "chrysanthemum" },
  build(c, centre, turn, size, { motif, keyline, width = sourceWidth, paper = PAPER }) {
    if (!Number.isFinite(width) || width <= 0 || width >= 1) throw new Error("leaf-pinnate: width must be between zero and one");
    const line = paper / size;
    if (line >= width) throw new Error("leaf-pinnate: the veins are too wide to fit inside the leaf");
    const midrib = thickSeg([0, -.43], [0, .43], line);
    const right = ribs.map(([station, reach]) => thickSeg(
      [0, station - .5], [reach * width / sourceWidth, station + .19 - .5], line,
    ));
    const ink = carve([leafLensOutline(width)], [midrib, ...right, ...right.map((rib) => rib.map(mirrored))]);
    fillPart(c, motif, ink, { k: size, at: centre, turn }, keyline);
  },
});

export default leafPinnate;
