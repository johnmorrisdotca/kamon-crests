import type { Region, V } from "../../construct/compass.ts";
import { measuredBoundary } from "../../construct/measured-boundary.ts";
import { fillPart } from "./layers.ts";
import { definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

interface FanPetalOptions extends PartOptions {
  /** Width relative to tip-to-root length. */
  width?: number;
}

/** One petal of the rounded chrysanthemum fan in 菊鶴. */
export function roundedFanPetalOutline(width: number): Region {
  if (!Number.isFinite(width) || width <= 0 || width >= .7) throw new Error("petal width must be between zero and .7");
  const d = 50 * width;
  const base: V = [0, -50];
  return measuredBoundary(base, [
    [[-d, 2], [-d * .55, 42]], [[-d * .35, 48], [0, 50]],
    [[d * .35, 48], [d * .55, 42]],
    [[d, 2], base],
  ]);
}

/** Size is the petal's tip-to-root length. */
export const petalFanBlade = definePart<FanPetalOptions>({
  id: "petal-fan-blade",
  name: { en: "Rounded fan petal", ja: "先の丸い扇の花びら" },
  description: {
    en: "A narrow root opens into one long rounded petal, with a bowed edge on either side.",
    ja: "細い付け根から両側をふくらませ、先を丸くした長い花びらを作ります。",
  },
  families: ["kiku"],
  sources: [{ frame: 40, page: "R", row: 4, col: 2, label: "きく鶴" }],
  stock: true,
  sampleSize: 135,
  sampleOptions: { motif: "chrysanthemum" },
  build(c, centre, turn, size, { motif, width = .29, keyline }) {
    fillPart(c, motif, [roundedFanPetalOutline(width)], { k: size / 100, at: centre, turn }, keyline);
  },
});

export default petalFanBlade;
