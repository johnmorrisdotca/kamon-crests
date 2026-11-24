// Three ginkgo leaves, 三つ銀杏, struck and ruled after the crest book of 1892 (伊呂波分新撰紋帳, frame 5, 三ついてふ): its
// proportions were measured from that page, and from a picture of the ringed crest; the drawing is this construction.
//
// The frame: the crest's centre at (0, 0), x to the right, y up, the outer circle at 100. The three leaves are fans a third of a
// turn apart, parted by three white lenses that run from the hub to the edge.
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, angleOf, arcTo, carve, circleCircle, disc, nearest, onPage, openPath, seg, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
import type { Circle, Placing, Region, V } from "../../construct/compass.ts";

const TAU = Math.PI * 2;
const polar = (r: number, deg: number): V => [r * Math.cos(deg * DEG), r * Math.sin(deg * DEG)];

/** The wavy edge: thirty circles of 16 on the circle of 84, twelve degrees apart, so the edge reaches 100 and dips to 96.9 between them. */
const SCALLOP_AT = 84;
const SCALLOP_R = 16;
const DIP = SCALLOP_AT * Math.cos(6 * DEG) + Math.sqrt(SCALLOP_R * SCALLOP_R - (SCALLOP_AT * Math.sin(6 * DEG)) ** 2);
/** The hub: a disc of 16, a white line of 1.6 round it. */
const HUB = 16;
const HUB_LINE = 1.6;
/** The lens between two leaves: two arcs of 70 from the hub's line to just past the dip in the edge, so that the leaves stand apart. */
const LENS_R = 70;
const W_VEIN = 1.4;
/** The leaves stand at these angles, and the lenses between them. */
const LEAVES = [90, 210, 330];

const through = (p: V, q: V, r: number, hint: V): Circle => ({ c: nearest(circleCircle(p, r, q, r), hint), r });

const black: Region[] = [disc([0, 0], SCALLOP_AT)];
for (let i = 0; i < 30; i += 1) black.push(disc(polar(SCALLOP_AT, 6 + 12 * i), SCALLOP_R));

const white: Region[] = [thickArc([0, 0], HUB + HUB_LINE / 2, HUB_LINE, 0, TAU / 2), thickArc([0, 0], HUB + HUB_LINE / 2, HUB_LINE, TAU / 2, TAU)];
/** The two circles of a lens, for the guides. */
const lensCircles: Circle[] = [];
for (const leaf of LEAVES) {
  // The lens on this leaf's clockwise side.
  const along = leaf - 60;
  const inner = polar(HUB + HUB_LINE / 2, along);
  const outer = polar(DIP + 2, along);
  const left = through(inner, outer, LENS_R, polar(60, along + 90));
  const right = through(inner, outer, LENS_R, polar(60, along - 90));
  lensCircles.push(left, right);
  white.push([arcTo(left, inner, outer, shortWay(left, inner, outer)), arcTo(right, outer, inner, shortWay(right, outer, inner))]);
  // The middle vein, ruled; a vein each side of it, an arc of the lens's own width; and a nick with a round end in the edge each side.
  white.push(thickSeg(polar(24, leaf), polar(78, leaf), W_VEIN));
  for (const side of [-1, 1]) {
    const from = polar(22, leaf + side * 19);
    const to = polar(68, leaf + side * 37);
    const vein = through(from, to, LENS_R, polar(80, leaf + side * 70));
    const a0 = angleOf(vein.c, from);
    let d = angleOf(vein.c, to) - a0;
    while (d > Math.PI) d -= TAU;
    while (d < -Math.PI) d += TAU;
    white.push(thickArc(vein.c, vein.r, W_VEIN, a0, a0 + d));
    white.push(thickSeg(polar(101, leaf + side * 24), polar(90, leaf + side * 24), W_VEIN), disc(polar(89, leaf + side * 24), 2.4));
  }
}

/** A third of the page about a leaf's angle: cut away, it leaves the other two leaves. */
const third = (leaf: number): Region => {
  const corners = [[0, 0] as V, polar(400, leaf - 60), polar(400, leaf), polar(400, leaf + 60)];

  return corners.map((p, i) => seg(p, corners[(i + 1) % corners.length]));
};
/** One leaf: the wavy disc with the white cut out, and the other two thirds cut away along the middles of the lenses. */
const leafLoops = (leaf: number): Region[] => carve(black, [...white, ...LEAVES.filter((other) => other !== leaf).map(third)]);
const hub: Region[] = [disc([0, 0], HUB)];

/** Draws the three ginkgo leaves in the circle of radius `reach` on the page. */
export const ichoBuild = (c: Builder, reach: number): void => {
  const placing: Placing = { k: reach / 100 };
  const k = placing.k;
  c.guideCircle(C0, reach);
  c.guideCircle(C0, SCALLOP_AT * k);
  c.guideSpokes(6, 0, reach);
  c.guideCircle(C0, HUB * k);
  for (const circ of lensCircles) {
    const cuts = circleCircle(circ.c, circ.r, [0, 0], 100);
    const inside = nearest(circleCircle(circ.c, circ.r, [0, 0], HUB), [0, 0]);
    const far = nearest(cuts, vsubFar(circ.c));
    c.guidePath(openPath([arcTo(circ, inside, far, shortWay(circ, inside, far))], placing));
  }
  for (const i of [0, 1, 2]) c.guideCircle(onPage(polar(SCALLOP_AT, 90 + 6 + 12 * i), placing), SCALLOP_R * k);
  c.fill("ginkgo", toPath(hub, placing));
  for (const leaf of LEAVES) c.group(() => c.fill("ginkgo", toPath(leafLoops(leaf), placing)));
};

/** Whether the short way round a circle from one of its points to another is counter-clockwise. */
function shortWay(circ: Circle, from: V, to: V): boolean {
  let d = angleOf(circ.c, to) - angleOf(circ.c, from);
  while (d > Math.PI) d -= TAU;
  while (d < -Math.PI) d += TAU;

  return d > 0;
}

/** A point far out on the side of the centre away from a circle's own centre: the hint for where its arc leaves the layout. */
function vsubFar(centre: V): V {
  return [-centre[0] * 3, -centre[1] * 3];
}
