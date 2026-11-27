import type { V } from "../../../construct/compass.ts";
import { measuredBoundary } from "./measured-boundary.ts";
import { fillPart } from "./layers.ts";
import { definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

const base: V = [0, -36];
const cup = measuredBoundary(base, [
  [[-23, -24], [-46, 25]], [[-30, 25], [-18, 10]],
  [[-10, 27], [0, 39]], [[11, 26], [17, 10]],
  [[30, 25], [46, 25]], [[29, -20], base],
]);

/** Size is the cup's width between the two outside tips. */
export const calyxCup = definePart<PartOptions>({
  id: "calyx-cup",
  name: { en: "Three-point calyx cup", ja: "三つの先を持つがく" },
  description: {
    en: "Three pointed lobes meet in the shallow cup at the foot of a flower fan.",
    ja: "先のとがった三つのふくらみを、花の扇の根元で浅いがくにまとめます。",
  },
  families: ["kiku"],
  sources: [{ frame: 40, page: "R", row: 4, col: 2, label: "きく鶴" }],
  sampleSize: 92,
  sampleOptions: { motif: "chrysanthemum" },
  build(c, centre, turn, size, { motif, keyline }) {
    fillPart(c, motif, [cup], { k: size / 92, at: centre, turn }, keyline);
  },
});

export default calyxCup;
