import type { Builder } from "../../construct/builder.ts";
import {
  DEG, carve, circleThrough, mirrored, rotated, seg, shortArc, thickArc, toPath, vdist,
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

const OWARI_PETALS: Lobe[] = [
  [[[94, 34], [127, 19], [169, 17], [206, 21], [235, 38], [237, 66], [197, 86], [121, 80]], [165, 49]],
  ...lobePair([[[50, 82], [68, 54], [94, 38], [128, 40], [155, 49], [170, 68], [145, 98], [87, 103]], [114, 70]], 166),
  ...lobePair([[[24, 132], [37, 104], [61, 88], [85, 83], [111, 90], [136, 99], [162, 120], [148, 154], [54, 156]], [88, 119]], 166),
  [[[126, 88], [146, 76], [165, 69], [187, 72], [209, 80], [226, 92], [204, 104], [188, 123], [140, 122], [137, 104]], [174, 97]],
  ...lobePair([[[24, 146], [52, 133], [80, 138], [107, 145], [137, 164], [140, 195], [107, 214], [54, 207], [32, 185]], [85, 170]], 166),
  ...lobePair([[[46, 213], [68, 200], [98, 199], [126, 211], [145, 249], [125, 277], [99, 271], [69, 246]], [101, 235]], 166),
  [[[111, 151], [127, 132], [151, 123], [175, 121], [199, 131], [224, 148], [230, 170], [193, 195], [153, 191], [120, 180]], [174, 157]],
  ...lobePair([[[99, 192], [108, 173], [129, 161], [155, 165], [177, 180], [168, 217], [137, 238], [114, 221]], [139, 193]], 166),
  [[[117, 253], [137, 229], [168, 222], [204, 231], [225, 254], [224, 275], [203, 289], [160, 292], [133, 282]], [174, 257]],
  [[[128, 205], [140, 182], [165, 174], [195, 172], [219, 187], [228, 210], [218, 230], [195, 241], [157, 242], [137, 228]], [180, 209]],
];

export function owariBotanBuild(c: Builder): void {
  c.guideCircle(C0, R);
  paintPetals(c, OWARI_PETALS, around([166, 155]), .586);
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
  const clear = roundLobe(([[72, 182], [102, 152], [155, 137], [199, 145], [230, 166], [256, 201], [247, 226], [214, 246], [154, 251], [103, 244], [78, 224]] satisfies V[]).map(point), point([162, 195]));
  const leaves = [upper, outer];

  c.guideCircle(C0, R);
  c.fill("peony", toPath(carve(leaves, [clear, ...veins]), placing), "evenodd");
  c.fill("peony", toPath(carve(leaves.map((loop) => loop.map(mirrored)), [clear, ...veins.map((loop) => loop.map(mirrored))]), placing), "evenodd");
  paintPetals(c, ICHIYO_PETALS, point, placing.k);
}

const PETAL: V[] = [[-4, 22], [-26, 23], [-44, 44], [-43, 67], [-37, 82], [-26, 90], [-14, 92], [0, 95], [14, 92], [26, 90], [37, 82], [43, 67], [44, 44], [26, 23], [4, 22], [0, 15]];
const BACK_PETAL: V[] = [[-6, 29], [-27, 51], [-44, 65], [-59, 65], [-70, 60], [-78, 62], [-80, 55], [-85, 50], [-85, 40], [-92, 33], [-92, 22], [-95, 14], [-92, 8], [-81, 9], [-51, 14], [-39, 20], [-22, 18]];
const CALYX: V[] = [[0, 34], [9, 22], [24, 18], [18, 11], [28, 2], [14, -3], [19, -16], [11, -17], [7, -29], [1, -22], [-4, -13], [-19, -18], [-22, -8], [-16, 0], [-27, 9], [-14, 13], [-8, 24]];

export function uraBotanBuild(c: Builder): void {
  const face = roundLobe(PETAL, [0, 56], 1.7);
  const back = roundLobe(BACK_PETAL, [-52, 40], 1.8);
  const calyx = ruled(CALYX);
  const reach = [-30, -23, -16, -9, -3, 3, 9, 16, 23, 30];
  const veins = reach.map((width) => narrowArc([width*.31, 24], [width, 72 - Math.abs(width)*.11], 98, [width > 0 ? 85 : -85, 38], 1.65));
  const seam = narrowArc([-2, -3], [5, -24], 38, [31, -2], 2.4);
  const space = grow(calyx, [0, 0], 1.18);
  const clear = grow(face, [0, 57], 1.06);
  const behind = carve([back], [clear, clear.map((edge) => rotated(edge, 90 * DEG))]);
  const front = carve([face], [space, ...veins]);

  c.guideCircle(C0, R);
  for (let i = 0; i < 4; i++) c.fill("peony", toPath(behind, { k: 1, turn: i * 90 }), "evenodd");
  for (let i = 0; i < 4; i++) c.fill("peony", toPath(front, { k: 1, turn: i * 90 }), "evenodd");
  c.fill("peony", toPath(carve([calyx], [seam]), { k: 1 }), "evenodd");
}
