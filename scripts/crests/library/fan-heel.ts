import { DEG, carve, disc, onCircle, rotated, thickSeg } from "../../construct/compass.ts";
import { fanRibOutline } from "./fan-rib.ts";
import { fillPart } from "./layers.ts";
import { PAPER, definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

interface FanHeelOptions extends PartOptions {
  /** Number of identical bones that share the root. */
  count?: number;
  /** Included angle, in degrees, between the two outer bones. */
  spread?: number;
  /** Square ends or rounded heads. */
  cap?: "square" | "round";
}

/** Size is the distance from the common root to each bone's tip or round-cap centre. */
export const fanHeel = definePart<FanHeelOptions>({
  id: "fan-heel",
  name: { en: "Fan heel", ja: "骨尻" },
  description: {
    en: "Equal bones open from one root at even angles. Paper grooves separate their tapered ends.",
    ja: "同じ骨を一つの要から等角度に広げ、先の間に一定の幅の白い溝を残します。",
  },
  families: ["ogi"],
  sources: [
    { frame: 35, page: "L", row: 2, col: 2, label: "ひらき末扇" },
    { frame: 35, page: "L", row: 2, col: 4, label: "あふぎてふ" },
  ],
  stock: true,
  sampleSize: 78,
  sampleOptions: { motif: "fan", count: 5, spread: 66, cap: "round" },
  build(c, centre, turn, size, { motif, keyline, paper = PAPER, count = 5, spread = 66, cap = "round" }) {
    if (!Number.isInteger(count) || count < 2) throw new Error("fan-heel: use at least two bones");
    if (!Number.isFinite(spread) || spread <= 0 || spread >= 180) throw new Error("fan-heel: the spread must be between zero and 180 degrees");
    const step = spread * DEG / (count - 1);
    const tipWidth = 2 * size * Math.sin(step / 2);
    if (paper >= tipWidth) throw new Error("fan-heel: the paper groove leaves no room for the bones");
    const rootWidth = .42 * tipWidth;
    const bone = fanRibOutline(size, rootWidth, tipWidth, cap);
    const ribs = Array.from({ length: count }, (_, i) => {
      const angle = i * step - spread * DEG / 2;
      return bone.map((edge) => rotated(edge, angle));
    });
    const grooves = Array.from({ length: count - 1 }, (_, i) => {
      const angle = Math.PI / 2 + (i + .5) * step - spread * DEG / 2;
      return thickSeg(onCircle([0, 0], size * .27, angle), onCircle([0, 0], size + tipWidth, angle), paper);
    });
    // The round bones already share a cap; the square bones share the same round root.
    if (cap === "square") ribs.push(disc([0, 0], rootWidth / 2));
    fillPart(c, motif, carve(ribs, grooves), { k: 1, at: centre, turn }, keyline);
  },
});

export default fanHeel;
