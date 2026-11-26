import type { Builder } from "../../construct/builder.ts";
import {
  carve, circleThrough, mirrored, seg, shortArc, thickArc, toPath, vdist,
} from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { C0, R } from "../../construct/geo.ts";

type Arc = Extract<Piece, { t: "A" }>;
type SourcePoint = (point: V) => V;
type Lobe = readonly [points: V[], middle: V];
const around = ([cx, cy]: V): SourcePoint => ([x, y]) => [x - cx, cy - y];

function roundLobe(points: V[], middle: V, ease = 1.15): Region {
  return points.map((point, i) => {
    const next = points[(i + 1) % points.length];
    return shortArc(circleThrough(point, next, Math.max(10, vdist(point, next) * ease), middle), point, next);
  });
}

function narrowArc(from: V, to: V, radius: number, centreSide: V, width: number): Region {
  const circle = circleThrough(from, to, radius, centreSide);
  const arc = shortArc(circle, from, to) as Arc;
  return thickArc(circle.c, circle.r, width, Math.min(arc.a0, arc.a1), Math.max(arc.a0, arc.a1));
}

function ruled(points: V[]): Region {
  return points.map((point, i) => seg(point, points[(i + 1) % points.length]));
}

function grow(region: Region, [cx, cy]: V, scale: number): Region {
  const point = ([x, y]: V): V => [cx + scale * (x - cx), cy + scale * (y - cy)];
  return region.map((edge) => edge.t === "A" ? { ...edge, c: point(edge.c), r: edge.r * scale } : seg(point(edge.a), point(edge.b)));
}

function lobePair([points, middle]: Lobe, axis: number): Lobe[] {
  const reflect = ([x, y]: V): V => [2 * axis - x, y];
  return [[points, middle], [points.map(reflect), reflect(middle)]];
}

function paintPetals(c: Builder, lobes: Lobe[], point: SourcePoint, scale: number): void {
  const drawn = lobes.map(([points, middle]) => {
    const centre = point(middle);
    const ink = roundLobe(points.map(point), centre);
    return { ink, overlap: grow(ink, centre, 1.055) };
  });

  for (const [i, { ink }] of drawn.entries()) {
    const visible = carve([ink], drawn.slice(i + 1).map((lobe) => lobe.overlap));
    if (visible.length > 0) c.fill("peony", toPath(visible, { k: scale }), "evenodd");
  }
}

const ICHIYO_PETALS: Lobe[] = [
  ...lobePair([[[77, 177], [90, 160], [117, 151], [146, 163], [141, 189], [126, 207], [89, 211]], [111, 180]], 166),
  ...lobePair([[[97, 152], [115, 143], [143, 142], [164, 151], [152, 180], [117, 185], [93, 175]], [128, 161]], 166),
  ...lobePair([[[77, 206], [95, 195], [121, 201], [152, 221], [139, 238], [107, 243], [87, 232]], [114, 219]], 166),
  [[[127, 167], [143, 154], [166, 151], [185, 162], [197, 179], [190, 195], [168, 204], [139, 198], [128, 187]], [164, 179]],
  ...lobePair([[[88, 219], [105, 202], [135, 201], [155, 212], [152, 231], [133, 246], [106, 244], [93, 238]], [126, 223]], 166),
  [[[127, 221], [149, 203], [173, 204], [195, 212], [201, 230], [191, 245], [169, 253], [145, 249], [128, 238]], [164, 228]],
];
const UPPER_LEAF: V[] = [[147, 158], [116, 157], [89, 145], [77, 124], [63, 96], [88, 98], [87, 52], [111, 75], [119, 99], [130, 72], [146, 100], [151, 126]];
const OUTER_LEAF: V[] = [[105, 236], [66, 241], [48, 232], [27, 213], [47, 202], [28, 185], [39, 182], [12, 148], [58, 157], [78, 172], [54, 138], [94, 158], [115, 182]];

export function ichiyoBotanBuild(c: Builder): void {
  const point = around([166, 155]);
  const placing = { k: .56 };
  const upper = ruled(UPPER_LEAF.map(point));
  const outer = ruled(OUTER_LEAF.map(point));
  const veins = [
    narrowArc(point([132, 153]), point([102, 79]), 131, point([29, 151]), 3.4),
    narrowArc(point([131, 141]), point([133, 99]), 90, point([96, 119]), 2.8),
    narrowArc(point([84, 214]), point([39, 168]), 91, point([125, 143]), 3.2),
    narrowArc(point([85, 219]), point([47, 219]), 69, point([60, 279]), 3.0),
  ];
  const clear = roundLobe([[72, 182], [102, 152], [155, 137], [199, 145], [230, 166], [256, 201], [247, 226], [214, 246], [154, 251], [103, 244], [78, 224]].map(point), point([162, 195]));
  const leaves = [upper, outer];

  c.guideCircle(C0, R);
  c.fill("peony", toPath(carve(leaves, [clear, ...veins]), placing), "evenodd");
  c.fill("peony", toPath(carve(leaves.map((loop) => loop.map(mirrored)), [clear, ...veins.map((loop) => loop.map(mirrored))]), placing), "evenodd");
  paintPetals(c, ICHIYO_PETALS, point, placing.k);
}
