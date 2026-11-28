import { bowedArc, carve, lineCircle, reversed, thickArc, thickSeg } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { branchTaperOutline } from "./branch-taper.ts";
import { fillPart } from "./layers.ts";
import { PAPER, definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

/** A run of hatch ticks: how far along the horn from its cut end (0 to 1), how many, and the edge they start from. */
export type HornTicks = readonly [along: number, count: number, edge: "left" | "right"];

export interface HornCutOptions extends PartOptions {
  /** Full width at the cut end divided by length. Defaults to .20. */
  width?: number;
  /** The sideways bow divided by length, positive to the right. Defaults to .125. */
  bend?: number;
  /** Long grooves that start at the rim of the cut end. Defaults to 3. */
  grooves?: number;
  /** Runs of short ticks on the edges. */
  ticks?: readonly HornTicks[];
}

const DEFAULT_TICKS: readonly HornTicks[] = [[.25, 4, "right"], [.5, 2, "left"], [.7, 3, "right"], [.82, 2, "right"]];

/** Where an edge of the horn stands at one height. */
function edgeAt(edge: Piece, y: number, near: number): V {
  if (edge.t !== "A") throw new Error("horn-cut: its edges must be arcs");
  const found = lineCircle([-1, y], [1, y], edge.c, edge.r);

  return found.slice().sort((a, b) => Math.abs(a[0] - near) - Math.abs(b[0] - near))[0];
}

/** The horn before placement: the middle of its cut end at y = −.5 and its point at y = .5. `paper` is the width of its white lines. */
export function hornCutInk(width: number, bend: number, grooves: number, ticks: readonly HornTicks[], paper: number): Region[] {
  const body = branchTaperOutline(width, bend);
  const [rightEdge, leftEdge] = [body[0], reversed(body[1])];
  const left: V = [-width / 2, -.5];
  const right: V = [width / 2, -.5];
  // The cut end is seen at a slant: two equal arcs on the same chord, the far one the rim inside the horn.
  const rise = width / 4;
  const face: Region = [bowedArc(left, right, rise), bowedArc(right, left, rise)];
  const rim = bowedArc(right, left, -rise);
  if (rim.t !== "A") throw new Error("horn-cut: the rim must be an arc");
  const cuts: Region[] = [thickArc(rim.c, rim.r, paper, rim.a0, rim.a1)];
  const from = -.5 + rise + 2.5 * paper;
  for (let i = 0; i < grooves; i += 1) {
    const x = width * .5 * ((i + 1) / (grooves + 1) - .5) * 1.25;
    cuts.push(thickSeg([x, from + Math.abs(x) * -.6], [x + bend * .22, from + width * .62], paper));
  }
  for (const [along, count, edge] of ticks) {
    const side = edge === "right" ? 1 : -1;
    for (let i = 0; i < count; i += 1) {
      const y = along - .5 + (i - (count - 1) / 2) * 3.2 * paper;
      const foot = edgeAt(edge === "right" ? rightEdge : leftEdge, y, side * width / 2);
      const across = Math.abs(edgeAt(rightEdge, y, width / 2)[0] - edgeAt(leftEdge, y, -width / 2)[0]);
      // Each tick starts outside the edge, so that it opens the outline, and climbs a little towards the point.
      cuts.push(thickSeg([foot[0] + side * paper, foot[1] - paper * .5], [foot[0] - side * across * .42, foot[1] + across * .21], paper));
    }
  }

  return carve([body, face], cuts);
}

/** Size is the length from the middle of the cut end to the point. */
export const hornCut = definePart<HornCutOptions>({
  id: "horn-cut",
  name: { en: "Cut horn", ja: "切り口のある角" },
  description: {
    en: "A tapering horn between two bowed arcs. Its cut end is an oval of two arcs with a white rim, and grooves and short hatch ticks are left white.",
    ja: "二本の弧で先細りの角を描きます。切り口は二本の弧で作る楕円形で、白い縁を一本残し、長い筋と短い刻みを白く抜きます。",
  },
  families: ["tsuno"],
  sources: [{ frame: 23, page: "R", row: 1, col: 2, label: "折合つの" }],
  sampleSize: 170,
  sampleOptions: { motif: "horn" },
  build(c, centre, turn, size, { motif, keyline, width = .20, bend = .125, grooves = 3, ticks = DEFAULT_TICKS, paper = PAPER }) {
    fillPart(c, motif, hornCutInk(width, bend, grooves, ticks, paper / size), { k: size, at: centre, turn }, keyline);
  },
});

export default hornCut;
