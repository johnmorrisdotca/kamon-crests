import { DEG, onCircle, seg } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

/** Inscribe one flat-topped shell plate in its compass circle. */
export function turtlePlateOutline(centre: V, radius: number): Region {
  const vertices = Array.from({ length: 6 }, (_, i) => onCircle(centre, radius, i * 60 * DEG));
  return vertices.map((point, i) => seg(point, vertices[(i + 1) % vertices.length]));
}

/** Size is the distance from the plate's centre to a corner. */
export const turtleShellPlate = definePart<PartOptions>({
  id: "turtle-shell-plate",
  name: { en: "Hexagonal turtle shell plate", ja: "六角形の亀の甲板" },
  description: {
    en: "Six ruled edges join equally spaced points on one compass circle.",
    ja: "コンパスで描いた円を六等分し、定規で六つの点を結びます。",
  },
  families: ["kame"],
  sources: [{ frame: 19, page: "L", row: 1, col: 1, label: "變りかめの丸" }],
  stock: true,
  sampleSize: 85,
  sampleOptions: { motif: "turtle" },
  build(c, centre, turn, size, { motif, keyline }) {
    c.guideCircle([100 + centre[0], 100 - centre[1]], size);
    fillPart(c, motif, [turtlePlateOutline([0, 0], size)], { k: 1, at: centre, turn }, keyline);
  },
});

export default turtleShellPlate;
