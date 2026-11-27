import { DEG, arcA, pieceEnd, pieceStart, reversedRun, seg } from "../../construct/compass.ts";
import type { Piece, V } from "../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

interface BranchSpineOptions extends PartOptions {
  /** Points along the axis, in units of the placed branch's base-to-tip length. */
  stations?: readonly V[];
  /** Leftward rotation from the positive x axis at the first point, in degrees. */
  heading?: number;
  /** Stem thickness relative to its base-to-tip length. */
  width?: number;
}

// The five stations of 枝南天, expressed relative to the cut base.
const nantenStations: readonly V[] = [[0, 0], [.212, .108], [.394, .333], [.433, .644], [.265, .964]];

function offset(piece: Piece, distance: number): Piece {
  if (piece.t === "A") {
    const radius = piece.r - Math.sign(piece.a1 - piece.a0) * distance;
    if (radius <= 0) throw new Error("branch-spine: the stem is too thick for one of its bends");
    return arcA(piece.c, radius, piece.a0, piece.a1);
  }
  const dx = piece.b[0] - piece.a[0];
  const dy = piece.b[1] - piece.a[1];
  const normal = distance / Math.hypot(dx, dy);
  return seg([piece.a[0] - dy * normal, piece.a[1] + dx * normal], [piece.b[0] - dy * normal, piece.b[1] + dx * normal]);
}

/** Join each measured station with a circle tangent to the preceding piece. */
export function branchSpineGeometry(stations: readonly V[], width: number, heading: number) {
  if (stations.length < 2 || !Number.isFinite(width) || width <= 0 || !Number.isFinite(heading)) {
    throw new Error("branch-spine: at least two stations, a positive width and a finite heading are required");
  }
  const axis: Piece[] = [];
  let tangent = heading * DEG;
  for (let i = 1; i < stations.length; i += 1) {
    const [x, y] = stations[i - 1];
    const [u, v] = stations[i];
    const dx = u - x;
    const dy = v - y;
    const length = Math.hypot(dx, dy);
    const normal: V = [-Math.sin(tangent), Math.cos(tangent)];
    const lift = dx * normal[0] + dy * normal[1];
    const change = Math.atan2(dy, dx) - tangent;
    const sweep = 2 * Math.atan2(Math.sin(change), Math.cos(change));
    if (!Number.isFinite(length) || length <= 0 || Math.abs(sweep) >= Math.PI) {
      throw new Error("branch-spine: each station must advance along the axis");
    }
    if (Math.abs(lift) < 1e-10 * length) {
      axis.push(seg(stations[i - 1], stations[i]));
    } else {
      const r = (dx * dx + dy * dy) / (2 * lift);
      const centre: V = [x + r * normal[0], y + r * normal[1]];
      const start = tangent - Math.sign(r) * Math.PI / 2;
      axis.push(arcA(centre, Math.abs(r), start, start + sweep));
    }
    tangent += sweep;
  }

  const upper = axis.map((piece) => offset(piece, width / 2));
  const lower = reversedRun(axis.map((piece) => offset(piece, -width / 2)));
  const close = (from: Piece[], to: Piece[]) => seg(pieceEnd(from.at(-1)!), pieceStart(to[0]));

  return { axis, ink: [...upper, close(upper, lower), ...lower, close(lower, upper)] };
}

/** Place the cut base. Size is the distance from the base to the tip. */
export const branchSpine = definePart<BranchSpineOptions>({
  id: "branch-spine",
  name: { en: "Bent branch stem", ja: "曲がった枝の軸" },
  description: {
    en: "Tangent compass arcs carry a stem of even width through the placement points.",
    ja: "なめらかにつないだ弧で、幅のそろった軸を描きます。",
  },
  families: ["nanten"],
  sources: [{ frame: 23, page: "L", row: 4, col: 4, label: "枝なんてん" }],
  stock: true,
  sampleSize: 150,
  sampleOptions: { motif: "nanten", stations: nantenStations.map(([x, y]): V => [x - .20, y - .48]) },
  build(c, centre, turn, size, { motif, keyline, stations = nantenStations, width = .017, heading = -5 }) {
    const { ink } = branchSpineGeometry(stations, width, heading);
    fillPart(c, motif, [ink], { k: size, at: centre, turn }, keyline);
  },
});

export default branchSpine;
