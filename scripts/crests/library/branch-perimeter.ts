import { DEG, arcA, carve, disc, moved, onCircle, rotated, seg, thickArc, vmul } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { branchTaperOutline } from "./branch-taper.ts";
import { fillPart } from "./layers.ts";
import { definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

interface Shoot {
  /** Position along the main branch, from zero at its right-hand start to one at its end. */
  station: number;
  /** Length and initial width in crest units. */
  length: number;
  width?: number;
  /** Clockwise from upright in the unturned part. */
  turn: number;
  /** Sideways bow divided by the shoot length. */
  bend?: number;
}

interface PerimeterBranchOptions extends PartOptions {
  /** Signed angle of the main branch from its right-hand start, in degrees. */
  sweep?: number;
  /** Width of the main branch in crest units. */
  width?: number;
  shoots?: readonly Shoot[];
}

const origin: V = [0, 0];

function rootedShoot({ station, length, width = .10 * length, turn, bend = .12 }: Shoot, radius: number, end: number): Region {
  if (!Number.isFinite(station) || station < 0 || station > 1 || !Number.isFinite(length) || length <= 0 || !Number.isFinite(turn)) {
    throw new Error("branch-perimeter: a shoot needs a station on the branch, positive length and finite turn");
  }
  const at = onCircle(origin, 1, end * station);
  const k = length / radius;
  return branchTaperOutline(width / length, bend).map((edge) => {
    const fromRoot = moved(edge, [0, .5]);
    const scaled: Piece = fromRoot.t === "L"
      ? seg(vmul(fromRoot.a, k), vmul(fromRoot.b, k))
      : arcA(vmul(fromRoot.c, k), fromRoot.r * k, fromRoot.a0, fromRoot.a1);
    return moved(rotated(scaled, -turn * DEG), at);
  });
}

/** Size is the radius of the main branch. Its unturned first attachment is on the right. */
export const branchPerimeter = definePart<PerimeterBranchOptions>({
  id: "branch-perimeter",
  name: { en: "Perimeter branch with rooted shoots", ja: "円周に沿う枝と小枝" },
  description: {
    en: "A single circular branch carries tapering shoots rooted on the same compass arc.",
    ja: "一本の枝の軸を円弧で描き、その弧から先の細い小枝を伸ばします。",
  },
  families: ["ume", "kikyo", "kiku"],
  sources: [{ frame: 39, page: "R", row: 4, col: 4, label: "きく枝丸" }],
  stock: true,
  sampleSize: 73,
  sampleOptions: { motif: "chrysanthemum", shoots: [
    { station: .19, length: 37, turn: 254 },
    { station: .45, length: 44, turn: 218, bend: -.13 },
    { station: .76, length: 39, turn: 171, bend: -.08 },
  ] },
  build(c, centre, turn, size, { motif, keyline, sweep = 128, width = 4.5, shoots = [] }) {
    if (!Number.isFinite(sweep) || sweep === 0 || Math.abs(sweep) >= 360 || !Number.isFinite(width) || width <= 0 || width >= size) {
      throw new Error("branch-perimeter: use a nonzero sweep under 360 degrees and a width smaller than the radius");
    }
    const end = sweep * DEG;
    const localWidth = width / size;
    const trunk = thickArc(origin, 1, localWidth, Math.min(0, end), Math.max(0, end));
    const caps = [disc([1, 0], localWidth / 2), disc(onCircle(origin, 1, end), localWidth / 2)];
    const forks = shoots.map((shoot) => rootedShoot(shoot, size, end));
    fillPart(c, motif, carve([trunk, ...caps, ...forks], []), { k: size, at: centre, turn }, keyline);
  },
});

export default branchPerimeter;
