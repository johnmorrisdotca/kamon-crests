// Three ginkgo leaves, 三つ銀杏, struck and ruled after the crest book of 1892 (伊呂波分新撰紋帳, frame 5, 三ついてふ): its
// proportions were measured from that page, and from a picture of the ringed crest; the drawing is this construction.
//
// The frame: the crest's centre at (0, 0), x to the right, y up, the outer circle at 100. The three leaves are fans a third of a
// turn apart, parted by three white lenses that run from the hub to the edge.
import type { Builder } from "../../construct/builder.ts";
import { C0 } from "../../construct/geo.ts";
import { DEG, angleOf, arcTo, carve, circleCircle, disc, nearest, onPage, seg, thickArc, thickSeg, toPath } from "../../construct/compass.ts";
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
/** The curl in a leaf's edge: a circle of 3.5. */
const CURL_R = 3.5;
/** The leaves stand at these angles, and the lenses between them. */
const LEAVES = [90, 210, 330];

const through = (p: V, q: V, r: number, hint: V): Circle => ({ c: nearest(circleCircle(p, r, q, r), hint), r });

const black: Region[] = [disc([0, 0], SCALLOP_AT)];
for (let i = 0; i < 30; i += 1) black.push(disc(polar(SCALLOP_AT, 6 + 12 * i), SCALLOP_R));

const white: Region[] = [thickArc([0, 0], HUB + HUB_LINE / 2, HUB_LINE, 0, TAU / 2), thickArc([0, 0], HUB + HUB_LINE / 2, HUB_LINE, TAU / 2, TAU)];
for (const leaf of LEAVES) {
  // The lens on this leaf's clockwise side.
  const along = leaf - 60;
  const inner = polar(HUB + HUB_LINE / 2, along);
  const outer = polar(DIP + 2, along);
  const left = through(inner, outer, LENS_R, polar(60, along + 90));
  const right = through(inner, outer, LENS_R, polar(60, along - 90));
  white.push([arcTo(left, inner, outer, shortWay(left, inner, outer)), arcTo(right, outer, inner, shortWay(right, outer, inner))]);
  // The middle vein, ruled; a vein each side of it, an arc of the lens's own width.
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
    // The curl in the edge: the edge turns in along a short ruled line and rolls round a small circle of width 7, both drawn as a white line.
    const curl = polar(DIP - 5, leaf + side * 24);
    const out = polar(1, leaf + side * 24);
    const foot: V = [curl[0] + CURL_R * side * out[1], curl[1] - CURL_R * side * out[0]];
    white.push(thickArc(curl, CURL_R, W_VEIN, 0, TAU / 2), thickArc(curl, CURL_R, W_VEIN, TAU / 2, TAU), thickSeg(foot, [foot[0] + out[0] * 9, foot[1] + out[1] * 9], W_VEIN));
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
  for (let i = 2; i < 12; i += 1) c.guideCircle(onPage(polar(SCALLOP_AT, 6 + 12 * i), placing), SCALLOP_R * k);
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
const ginkgoPolygon = (points: V[]): Region => points.map((point, index) => seg(point, points[(index + 1) % points.length]));

const ginkgoArc = (from: V, to: V, radius: number, centre: V): Region[number] => {
  const circle = through(from, to, radius, centre);
  return arcTo(circle, from, to, shortWay(circle, from, to));
};

const ginkgoLine = (piece: Region[number], width: number): Region => piece.t === "A"
  ? thickArc(piece.c, piece.r, width, piece.a0, piece.a1)
  : thickSeg(piece.a, piece.b, width);


/** Five curved white lenses divide a compact scalloped circle into broad fans. */
export const itsutsuIchoBuild = (c: Builder): void => {
  c.precision(3);
  const sectors = [90, 162, 234, 306, 378];
  const outline = [disc([0, 0], 80), ...Array.from({ length: 30 }, (_, index) => disc(polar(84.5, 6 + 12 * index), 13))];
  const hub = 14.9;
  const paper: Region[] = [disc([0, 0], hub + 1.5)];
  for (const axis of sectors) {
    const inner = polar(hub + 1.1, axis + 36);
    const outer = polar(100.5, axis + 36);
    paper.push([
      ginkgoArc(inner, outer, 88, polar(83, axis + 100)),
      ginkgoArc(outer, inner, 75, polar(75, axis - 27)),
    ]);
    paper.push(thickSeg(polar(28, axis), polar(70, axis), 2.05));
    for (const side of [-1, 1]) {
      const foot = polar(29, axis + side * 12);
      const tip = polar(72, axis + side * 16);
      paper.push(ginkgoLine(ginkgoArc(foot, tip, 111, polar(105, axis + side * 80)), 2.05));
      paper.push(disc(polar(95.5, axis + side * 19), 3.9));
    }
    paper.push(ginkgoPolygon([polar(hub, axis - 19), polar(hub, axis + 19), polar(42, axis + 15), polar(42, axis - 15)]));
  }
  c.guideCircle(C0, 96);
  c.guideCircle(C0, hub);
  c.guideSpokes(10, 0, 96);
  c.fill("ginkgo", toPath(carve(outline, paper), { k: 0.98 }));
  c.fill("ginkgo", toPath([disc([0, 0], hub)], { k: 0.98 }));
};

/** The three leaves share a hub, with shallow rounded dips on the six sides. */
export const rokkakuIchoBuild = (c: Builder): void => {
  c.precision(3);
  const reach = 96.8;
  const corners = [90, 150, 210, 270, 330, 390].map((turn) => polar(88, turn));
  const outline: Region[] = [ginkgoPolygon(corners)];
  const hub = 15.7;
  const paper: Region[] = [disc([0, 0], hub + 2.25)];
  for (let side = 0; side < corners.length; side += 1) {
    const from = corners[side];
    const to = corners[(side + 1) % corners.length];
    for (let lobe = 0; lobe <= 5; lobe += 1) {
      const t = lobe / 5;
      outline.push(disc([from[0] * (1 - t) + to[0] * t, from[1] * (1 - t) + to[1] * t], 8.4));
    }
    paper.push(disc(polar(79, 105 + 60 * side), 4.1));
  }
  for (const turn of [90, 210, 330]) {
    paper.push(thickSeg(polar(29, turn), polar(78, turn), 2.35));
    for (const side of [-1, 1]) {
      paper.push(ginkgoLine(ginkgoArc(polar(22, turn + side * 23), polar(65, turn + side * 34), 80, polar(78, turn + side * 85)), 2.2));
    }
    const root = polar(hub + 0.35, turn + 60);
    const edge = polar(reach + 2, turn + 60);
    paper.push([ginkgoArc(root, edge, 104, polar(100, turn + 120)), ginkgoArc(edge, root, 96, polar(98, turn))]);
  }
  c.guideCircle(C0, 96);
  c.guideCircle(C0, hub);
  c.guideSpokes(6, 0, 96);
  c.fill("ginkgo", toPath(carve(outline, paper), { k: 0.985 }));
  c.fill("ginkgo", toPath([disc([0, 0], hub)], { k: 0.985 }));
};
