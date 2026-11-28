import { DEG, arcA, carve, onCircle, seg, shortArc, thickArc } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { PAPER, definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

interface MantleOptions extends PartOptions {
  /** Depth at the shell root, divided by the outside radius. */
  depth?: number;
  /** Angle from the broad shell root to the tangent tip, in degrees. */
  sweep?: number;
  /** Number of white fibres between the outside edge and the inner arc. */
  fibres?: number;
  mirror?: boolean;
}

const origin: V = [0, 0];
const tip: V = [1, 0];

/** Size is the outside radius. The tip points right before turning or mirroring. */
export const turtleMantle = definePart<MantleOptions>({
  id: "turtle-mantle",
  name: { en: "Swept turtle mantle", ja: "亀の蓑毛" },
  description: {
    en: "Thin concentric fibres follow a sweeping mantle. Two circular edges meet at the same tangent at its tip.",
    ja: "同心の細い筋を蓑毛の流れに沿わせ、外側と内側の弧を先端で接します。",
  },
  families: ["kame"],
  sources: [{ frame: 19, page: "L", row: 1, col: 1, label: "變りかめの丸" }],
  stock: true,
  sampleSize: 90,
  sampleOptions: { motif: "turtle", depth: .36, sweep: 133, fibres: 11 },
  build(c, centre, turn, size, { motif, keyline, paper = PAPER, depth = .36, sweep = 133, fibres = 11, mirror }) {
    if (!Number.isFinite(depth) || depth <= 0 || depth >= .8) throw new Error("turtle-mantle: depth must be between zero and .8 of the radius");
    if (!Number.isFinite(sweep) || sweep < 45 || sweep > 180) throw new Error("turtle-mantle: sweep must be between 45 and 180 degrees");
    if (!Number.isInteger(fibres) || fibres < 0) throw new Error("turtle-mantle: give the mantle a whole number of fibres");
    const gap = paper / size;
    const pitch = depth / (fibres + 1);
    if (fibres > 0 && pitch <= gap) throw new Error("turtle-mantle: the fibres need room between their paper lines");

    const start = -sweep * DEG;
    const innerReach = 1 - depth;
    const outerRoot = onCircle(origin, 1, start);
    const innerRoot = onCircle(origin, innerReach, start);
    // This inner circle passes through its measured root and touches the outside at the tip.
    const shift = (1 - innerReach ** 2) / (2 * (1 - innerRoot[0]));
    const inner = { c: [shift, 0] as V, r: 1 - shift };
    const outline: Region = [arcA(origin, 1, start, 0), shortArc(inner, tip, innerRoot), seg(innerRoot, outerRoot)];
    // The opening clips the inner ends naturally. The fibres keep their spacing all around the bend.
    const cuts = Array.from({ length: fibres }, (_, i) => thickArc(origin, 1 - (i + 1) * pitch, gap, start - DEG, DEG));
    fillPart(c, motif, carve([outline], cuts), { k: size, at: centre, turn, mirror }, keyline);
  },
});

export default turtleMantle;
