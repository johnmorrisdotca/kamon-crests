import { arcA, onCircle, seg } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

interface FanRibOptions extends PartOptions {
  /** Physical width at the hinge, in crest units. */
  rootWidth?: number;
  /** Physical width at the far end, in crest units. */
  tipWidth?: number;
  /** Use tangent circular ends for a rounded guard. */
  cap?: "square" | "round";
}

/** Size is the distance from hinge to tip; for round caps it is measured centre to centre. */
export const fanRib = definePart<FanRibOptions>({
  id: "fan-rib",
  name: { en: "Ruled fan rib", ja: "扇の骨" },
  description: {
    en: "Two ruled sides widen from the hinge to the tip, finished with straight ends or tangent round caps.",
    ja: "要から先へ広がる二本の直線を引き、両端を直線か接する弧で閉じます。",
  },
  families: ["ogi"],
  sources: [
    { frame: 36, page: "R", row: 2, col: 1, label: "ぬさあふぎ" },
    { frame: 35, page: "L", row: 3, col: 2, label: "丹羽扇" },
  ],
  stock: true,
  sampleSize: 86,
  sampleOptions: { motif: "fan", rootWidth: 5, tipWidth: 13, cap: "round" },
  build(c, centre, turn, size, { motif, keyline, rootWidth = size * .035, tipWidth = size * .068, cap = "square" }) {
    if (!Number.isFinite(rootWidth) || !Number.isFinite(tipWidth) || rootWidth <= 0 || tipWidth <= 0) {
      throw new Error("fan-rib: give both ends a positive width");
    }
    const root = rootWidth / 2;
    const tip = tipWidth / 2;
    let ink: Region;
    if (cap === "round") {
      if (Math.abs(root - tip) >= size) throw new Error("fan-rib: one cap contains the other");
      const hinge: V = [0, 0];
      const end: V = [0, size];
      const right = Math.asin((root - tip) / size);
      const left = Math.PI - right;
      ink = [
        seg(onCircle(hinge, root, right), onCircle(end, tip, right)),
        arcA(end, tip, right, left),
        seg(onCircle(end, tip, left), onCircle(hinge, root, left)),
        arcA(hinge, root, left, right + 2 * Math.PI),
      ];
    } else {
      ink = [seg([root, 0], [tip, size]), seg([tip, size], [-tip, size]),
        seg([-tip, size], [-root, 0]), seg([-root, 0], [root, 0])];
    }
    fillPart(c, motif, [ink], { k: 1, at: centre, turn }, keyline);
  },
});

export default fanRib;
