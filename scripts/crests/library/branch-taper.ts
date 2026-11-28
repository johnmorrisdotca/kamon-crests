import { circleThrough, reversed, seg, shortArc } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

interface BranchOptions extends PartOptions {
  /** Full width at the base divided by length. Defaults to .10. */
  width?: number;
  /** The sideways bow divided by length, positive to the right. Defaults to .12. */
  bend?: number;
}

// An arc of a known chord and sagitta, with the circle's centre opposite the bow.
function edge(base: V, tip: V, sagitta: number): Piece {
  const chord = Math.hypot(tip[0] - base[0], tip[1] - base[1]);
  const bow = Math.max(Math.abs(sagitta), .004);
  const radius = chord * chord / (8 * bow) + bow / 2;
  const hint: V = [-Math.sign(sagitta || 1) * radius, 0];

  return shortArc(circleThrough(base, tip, radius, hint), base, tip);
}

/** The compass line between the branch edges, before scaling and turning. */
export function branchTaperAxis(bend: number) {
  const axis = edge([0, -.5], [0, .5], bend);
  if (axis.t !== "A") throw new Error("branch-taper: its centre line must be an arc");

  return axis;
}

/** The taper before placement, with the base at y = −.5 and the point at y = .5. */
export function branchTaperOutline(width: number, bend: number): Region {
  if (!Number.isFinite(width) || width <= 0 || width >= .5 || !Number.isFinite(bend) || Math.abs(bend) >= .4) {
    throw new Error("branch-taper: width must be between zero and .5 and bend must be between -.4 and .4");
  }
  const right: V = [width / 2, -.5];
  const left: V = [-width / 2, -.5];
  const tip: V = [0, .5];
  return [edge(right, tip, bend + width / 8), reversed(edge(left, tip, bend - width / 8)), seg(left, right)];
}

/** Size is the chord length from the centre of the base to the tip. */
export const branchTaper = definePart<BranchOptions>({
  id: "branch-taper",
  name: { en: "Tapering branch", ja: "先細りの枝" },
  description: { en: "Two bowed arcs taper from a broad base to one pointed tip.", ja: "二本の弧で枝を描き、広い根元から先へ向けて細くします。" },
  families: ["nanten"],
  sources: [{ frame: 23, page: "L", row: 4, col: 4, label: "枝なんてん" }],
  stock: true,
  sampleSize: 153,
  sampleOptions: { motif: "nanten" },
  build(c, centre, turn, size, { motif, keyline, width = .10, bend = .12 }) {
    fillPart(c, motif, [branchTaperOutline(width, bend)], { k: size, at: centre, turn }, keyline);
  },
});

export default branchTaper;
