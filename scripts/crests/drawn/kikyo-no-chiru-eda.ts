import type { Builder } from "../../construct/builder.ts";
import { DEG, bowedArc, carve, disc, thickArc, thickSeg, type Region, type V } from "../../construct/compass.ts";
import { branchTaper } from "../library/branch-taper.ts";
import { fillPart, layerParts } from "../library/layers.ts";
import { PAPER } from "../library/part.ts";

type Point = readonly [x: number, y: number];
type Mark = readonly [x: number, y: number, bow?: number];
// The 1892 cell sets the common scale of the three cups and five buds.
const unit = .58;
const fit = unit / .655;
const p = (x: number, y: number): V => [(x - 173) * unit, (154 - y) * unit];
const motif = "bellflower";

function outline(marks: readonly Mark[], convert: (x:number, y:number)=>V, scale: number): Region {
  return marks.map(([x, y, bow], i) => {
    const [u, v] = marks[(i + 1) % marks.length];
    return bowedArc(convert(x, y), convert(u, v), (bow ?? 0) * scale);
  });
}

const bloomOrigin: Point = [166, 180];
const here = (x: number, y: number): V => [x - bloomOrigin[0], bloomOrigin[1] - y];
const cup = outline([
  [105, 164, 1.4], [124, 157, 1.0], [146, 155, 0], [153, 144, 1.4], [168, 132, 1.3],
  [181, 139, 1.5], [192, 156, -.6], [215, 155, 1.6], [234, 163, 1.0],
  [222, 176, 1.5], [201, 184, 0], [209, 200, 1.2], [213, 215, 1.0],
  [191, 212, 1.6], [169, 202, -.9], [145, 212, 1.4], [121, 218, 1.2],
  [126, 203, 1.2], [137, 190, 0], [119, 178, 1.8],
], here, 1);
const rayTips: Point[] = [
  [137, 198], [134, 182], [137, 174], [145, 168], [151, 159],
  [162, 155], [172, 157], [181, 165], [190, 175], [189, 188],
];
function bloom(c: Builder, at: V, turn: number, k: number): void {
  const centre: V = [0, 0];
  const width = PAPER / k;
  const rays=rayTips.flatMap(([x, y]) => {
    const end = here(x, y);
    const base: V = [end[0] * .29, end[1] * .29];
    return [thickSeg(base, end, width), disc(end, width * .54)];
  });
  fillPart(c, motif, carve([cup], [...rays, disc(centre, 2.85)]), { at, turn, k }, PAPER);
}

const budEdge=outline([
  [0, 0, 1.25], [-8, 12, 1], [-14, 24, 1.3], [-10, 24, -.6], [-7, 22, -.4],
  [-4, 30, 1], [0, 35, 1.4], [4, 29, 0], [7, 23, -.5], [12, 26, 1.5],
  [13, 17, 1.4], [9, 9, 1.6],
], (x, y)=>[x, y], 1);
function bud(c: Builder, root: V, turn: number, k: number): void {
  const line = bowedArc([0, 9], [4, 21], 2.2);
  if (line.t !== "A") throw Error("The fold in the bud needs an arc");
  const paper = thickArc(line.c, line.r, PAPER / k, Math.min(line.a0, line.a1), Math.max(line.a0, line.a1));
  fillPart(c, motif, carve([budEdge], [paper]), { at: root, k, turn });
}

function stem(c: Builder, base: Point, tip: Point, width: number, bend: number): void {
  const a = p(...base), b = p(...tip);
  const centre: V = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const dx = b[0] - a[0], dy = b[1] - a[1];
  branchTaper.build(c, centre, Math.atan2(dx, dy) / DEG, Math.hypot(dx, dy), { motif, width, bend });
}
const handle=outline([
  [169, 199, 1], [184, 208, 1], [158, 225, 1], [135, 244, -1], [107, 252, -1],
  [80, 254, 1], [57, 259, 0], [76, 247, 1], [92, 237, 1], [110, 243, 1],
  [139, 226, 1], [159, 207, 0],
], p, unit);

function stemLine(a: Mark, b: Point): Region {
  const start = p(a[0], a[1]), end = p(...b);
  const arc = bowedArc(start, end, (a[2] ?? 0) * unit);
  return arc.t === "A"
    ? thickArc(arc.c, arc.r, PAPER, Math.min(arc.a0, arc.a1), Math.max(arc.a0, arc.a1))
    : thickSeg(start, end, PAPER);
}
const handleVein = [
  stemLine([88, 246, 2], [114, 246]), stemLine([114, 246, -2], [146, 219]),
];

export function kikyoNoChiruEdaBuild(c: Builder): void {
  c.precision(3);
  c.guideCircle([100, 100], 96);
  layerParts(c, () => {
    fillPart(c, motif, carve([handle], handleVein), { k: 1 });
    stem(c, [174, 167], [234, 78], .094, .034);
    stem(c, [180, 167], [279, 75], .095, .042);
    stem(c, [154, 155], [140, 125], .145, .055);
    stem(c, [174, 155], [180, 116], .14, .009);
    stem(c, [187, 167], [205, 138], .15, .043);
    for (const [x, y, turn, k] of [
      [225, 91, 29, .82], [265, 91, 35, .835], [150, 145, -17, .52],
      [178, 133, 0, .77], [200, 150, 17, .57],
    ]) bud(c, p(x, y), turn, k * fit);
    bloom(c, p(87, 169), -14, .455 * fit);
    bloom(c, p(258, 167), 9, .485 * fit);
    bloom(c, p(166, 180), 0, unit);
  });
}
