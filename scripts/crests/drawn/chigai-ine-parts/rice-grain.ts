import { DEG, arcA, moved, rotated } from "../../../construct/compass.ts";
import type { Region, V } from "../../../construct/compass.ts";
import { pointedPetal } from "../kiku.ts";
import { fillPart } from "./layers.ts";
import { definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

const length = 11.75;
const grain = pointedPetal(0, length, 2.82);

/** Put the same grain into a panicle's compound outline. */
export function grainOutline(centre: V, turn: number, size: number): Region {
  const k = size / length;
  const angle = -turn * DEG;
  return grain.map((edge) => {
    if (edge.t !== "A") throw new Error("A rice grain is made only of two arcs");
    return moved(rotated(arcA([edge.c[0] * k, edge.c[1] * k], edge.r * k, edge.a0, edge.a1), angle), centre);
  });
}

export const riceGrain = definePart<PartOptions>({
  id: "rice-grain",
  name: { en: "Rice grain", ja: "稲の粒" },
  description: {
    en: "Two equal compass arcs meet at the stem and the point.",
    ja: "同じ半径の二つの弧を、付け根と先で合わせます。",
  },
  families: ["ine"],
  sources: [{ frame: 5, page: "L", row: 1, col: 1, label: "違い稲" }],
  sampleSize: 135,
  sampleOptions: { motif: "rice" },
  build(c, centre, turn, size, { motif, keyline }) {
    fillPart(c, motif, [grainOutline(centre, turn, size)], { k: 1 }, keyline);
  },
});
