import { definePart } from "./part.ts";
import { buildPetal } from "./petal.ts";
import type { PetalOptions } from "./petal.ts";

/** Size is the length from the petal's root to its tip. */
export const notchedCherryPetal = definePart<Omit<PetalOptions, "tip">>({
  id: "petal-cherry-notched",
  name: { en: "Notched cherry petal", ja: "切れ込みのある桜の花びら" },
  description: {
    en: "Two equal arcs meet in the notch and touch the ruled sides. The optional stamen ends in a round paper cut.",
    ja: "同じ大きさの二つの円弧が先の切れ込みで出会い、定規で引いた両側に接します。しべの白い線の先は丸くします。",
  },
  families: ["sakura"],
  sources: [{ frame: 37, page: "L", row: 4, col: 1, label: "たばねさくら" }],
  stock: true,
  sampleSize: 150,
  sampleOptions: { motif: "cherry", stamen: true },
  build(c, centre, turn, size, options) {
    buildPetal(c, centre, turn, size, { ...options, tip: "notched" });
  },
});

export default notchedCherryPetal;
