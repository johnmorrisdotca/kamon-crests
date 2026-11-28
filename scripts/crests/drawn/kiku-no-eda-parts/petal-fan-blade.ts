import { roundedFanPetalOutline } from "../../library/petal-fan-blade.ts";
import { fillPart } from "./layers.ts";
import { definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

interface PetalOptions extends PartOptions {
  /** Width relative to tip-to-root length. */
  width?: number;
}

/** Size is the petal's tip-to-root length. */
export const petalFanBlade = definePart<PetalOptions>({
  id: "petal-fan-blade",
  name: { en: "Rounded fan petal", ja: "先の丸い扇の花びら" },
  description: {
    en: "A narrow root opens into one long rounded petal, with a bowed edge on either side.",
    ja: "細い付け根から両側をふくらませ、先を丸くした長い花びらを作ります。",
  },
  families: ["kiku"],
  sources: [{ frame: 40, page: "R", row: 4, col: 2, label: "きく鶴" }],
  sampleSize: 135,
  sampleOptions: { motif: "chrysanthemum" },
  build(c, centre, turn, size, { motif, width = .29, keyline }) {
    fillPart(c, motif, [roundedFanPetalOutline(width)], { k: size / 100, at: centre, turn }, keyline);
  },
});

export default petalFanBlade;
