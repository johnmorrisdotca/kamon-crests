import type { Builder } from "../../construct/builder.ts";
import { DEG, bowedArc, carve, disc, onCircle, thickArc, thickSeg, type Region, type V } from "../../construct/compass.ts";
import { branchTaper } from "../library/branch-taper.ts";
import { cordBand } from "../library/cord-band.ts";
import { fillPart, layerParts } from "../library/layers.ts";
import { PAPER } from "../library/part.ts";
import { petal } from "../library/petal.ts";

type Mark = readonly [x: number, y: number, bow?: number];
const unit = .52;
// Frame 37 L4 C1 records the unequal left and right sprays around the tied stalks.
const p = (x: number, y: number): V => [(x - 174) * unit, (171 - y) * unit];
const motif = "cherry";
const inkWidth = 2.25;

function outline(marks: readonly Mark[]): Region {
  return marks.map(([x, y, bow], i) => {
    const [u, v] = marks[(i + 1) % marks.length];
    return bowedArc(p(x, y), p(u, v), (bow ?? 0) * unit);
  });
}

function run(marks: readonly Mark[], weight = inkWidth): Region[] {
  const spans = marks.slice(0, -1).map(([x, y, bow], i) => {
    const [u, v] = marks[i + 1];
    const a = p(x, y), b = p(u, v);
    const arc = bowedArc(a, b, (bow ?? 0) * unit);
    return arc.t === "A"
      ? thickArc(arc.c, arc.r, weight, Math.min(arc.a0, arc.a1), Math.max(arc.a0, arc.a1))
      : thickSeg(a, b, weight);
  });
  return carve([...spans, ...marks.slice(1, -1).map(([x, y]) => disc(p(x, y), weight * .54))], []);
}

const stalks: Mark[][] = [
  [[100, 5, 1], [99, 30, 2], [91, 51, 1], [89, 80, 1], [95, 113, 2], [98, 132]],
  [[99, 29, 0], [112, 22]], [[90, 60, 0], [85, 50]], [[92, 48, 0], [87, 34]],
  [[96, 86, -3], [104, 69, 1], [109, 55, 1], [117, 44, -2], [115, 60, -2], [107, 77, -2], [126, 65, -4], [131, 66, -2], [119, 78, 1], [100, 86]],
  [[103, 126, -3], [114, 107, -1], [147, 86, -2], [140, 102, -2], [126, 110, -1], [113, 110]],
  [[82, 94, -10], [57, 131, -10], [70, 175, -8], [103, 201, 2], [127, 207, -3], [155, 230, -3], [187, 257]],
  [[59, 152, -4], [72, 139, -1], [83, 130, -2], [84, 140, 1], [69, 152, 1], [62, 155]],
  [[60, 149, -1], [47, 143]],
  [[55, 183, 0], [72, 182, 1], [87, 188]],
  [[147, 245, -1], [168, 249, -1], [192, 261]],
  [[112, 204, 0], [93, 210, -1], [77, 213]],
  [[159, 145, 0], [157, 109, 0], [166, 123, 4], [175, 138, 1], [173, 151]],
  [[211, 153, -1], [218, 124, 4], [229, 101, 0]],
  [[207, 144, -2], [204, 112, -2], [203, 93, 3], [208, 77, -1], [209, 95, 2], [217, 75, -3], [217, 93, -3], [209, 110, 0]],
  [[226, 104, -7], [228, 83, 6], [243, 64, -1], [243, 79, -2], [259, 73, -3], [261, 81, -3], [250, 92, -3], [226, 104]],
  [[210, 142, 1], [228, 141, 2], [245, 126, -3], [245, 133, -3], [239, 140, -3], [224, 145, -2], [216, 144]],
  [[211, 239, -8], [207, 209, -7], [221, 185, 0], [231, 171]],
  [[148, 189, -2], [159, 211, -2], [176, 239, 0], [192, 255]],
  [[167, 199, -2], [179, 224, -1], [193, 247]],
  [[179, 195, -6], [185, 221, -2], [205, 245]],
  [[204, 267, -2], [236, 299, -4], [265, 320]],
  [[213, 263, -3], [241, 285, -3], [280, 313]],
  [[219, 253, -4], [255, 283, -5], [305, 294]],
  [[226, 247, -4], [266, 270, -6], [321, 275]],
  [[223, 239, 0], [245, 249, 0], [266, 258, 0]],
];
const leaves = [
  {
    body: [
      [27, 251, 0], [48, 246, -1], [78, 226, 1], [105, 219, 1], [132, 228, 1], [157, 248, -1],
      [128, 241, 1], [105, 242, 1], [74, 247, 0], [46, 251, 0],
    ],
    midrib: [[47, 248, -3], [105, 236, 1], [145, 243]],
    ribs: [[[67, 241, 2], [83, 243]], [[83, 228, 2], [100, 240]], [[102, 224, 1], [119, 241]], [[120, 230, 1], [135, 243]]],
  },
  {
    body: [
      [219, 185, 1], [227, 166, -1], [247, 152, -1], [269, 139, 0], [292, 125, 0],
      [282, 148, 1], [261, 164, -1], [236, 174, 0],
    ],
    midrib: [[226, 175, -4], [254, 159, -1], [281, 137]],
    ribs: [[[237, 160, 2], [230, 178]], [[249, 153, 2], [242, 172]], [[261, 146, 2], [256, 167]], [[274, 137, 2], [267, 158]], [[282, 137, 1], [277, 148]]],
  },
] as const;

const buds: readonly Mark[][] = [
  [[98, 87, 1], [105, 68, 2], [117, 44, 1], [115, 64, 1], [107, 79, 1]],
  [[115, 109, 2], [127, 99, 1], [147, 86, 2], [141, 101, 2], [127, 110, 1]],
  [[61, 155, 0], [72, 141, 1], [83, 131, 2], [81, 142, 1], [69, 151, 1]],
  [[22, 134, 3], [33, 134, 1], [48, 145, 1], [38, 146, 2], [26, 142, 1]],
  [[30, 184, 2], [43, 179, 2], [56, 181, 1], [69, 183, 1], [52, 187, 1], [37, 187, 1]],
  [[158, 145, 0], [157, 109, 1], [170, 129, 4], [176, 145, 2]],
  [[204, 111, 2], [203, 92, 2], [208, 77, 1], [208, 94, 0], [217, 77, 2], [217, 94, 2]],
  [[227, 104, 2], [229, 84, 1], [243, 65, 2], [243, 79, 0], [260, 74, 2], [258, 84, 2], [249, 93, 1]],
  [[211, 144, 1], [228, 136, 1], [245, 126, 2], [241, 139, 2], [227, 145, 1]],
];

const knot: Mark[][] = [
  [[217, 237, 1], [211, 212, 3], [218, 201, 4], [227, 207, 3], [230, 223, 1], [223, 236]],
  [[219, 230, 0], [217, 216, 2], [219, 211, 3], [223, 219, 0], [223, 228]],
  [[226, 235, -1], [250, 230, -3], [273, 235, 0], [284, 234, 2], [280, 244, 1], [270, 247, 1], [254, 243]],
  [[230, 242, -2], [246, 246, 0], [273, 252]],
];

const turns = [0, 72, 144, 216, 288];

function cherry(c: Builder, centre: V, turn: number, radius: number): void {
  const heart = radius * .115;
  const root = heart + PAPER * .55;
  const size = radius - root;
  for (const placement of turns) {
    const angle = turn + placement;
    const petalCentre = onCircle(centre, root + size / 2, (90 - angle) * DEG);
    petal.build(c, petalCentre, angle, size, {
      motif, tip: "notched", width: .91, stamen: true, paper: PAPER, keyline: PAPER,
    });
  }
  fillPart(c, motif, [disc(centre, heart)], { k: 1 });
}

function drawLeaf(c: Builder, { body, midrib, ribs }: (typeof leaves)[number]): void {
  const veins = [midrib, ...ribs].flatMap((rib) => run(rib, PAPER));
  fillPart(c, motif, carve([outline(body)], veins), { k: 1 });
}

export function tabaneZakuraBuild(c: Builder): void {
  c.guideCircle([100, 100], 96);
  // The long shallow arcs of the lower leaf need thousandths to stay on their guides.
  c.precision(3);
  drawLeaf(c, leaves[0]);
  c.precision(2);
  c.group(() => layerParts(c, () => {
    for (const stalk of stalks) fillPart(c, motif, run(stalk), { k: 1 });
    branchTaper.build(c, p(98, 19), 4, 15.5, { motif, width: .105, bend: .01 });
    for (const bud of buds) fillPart(c, motif, [outline(bud)], { k: 1 });
    drawLeaf(c, leaves[1]);
    cherry(c, p(77, 91), 20, 12.2);
    cherry(c, p(117, 155), -11, 17.9);
    cherry(c, p(174, 166), 9, 20.0);
    cherry(c, p(151, 181), -10, 17.9);
    // These short visible runs connect the bud and leaf roots across the flower shoulders.
    for (const root of [
      [[91, 67, 1], [89, 79]],
      [[90, 88, 1], [99, 85]],
      [[95, 114, 1], [111, 112]],
      [[157, 142, 1], [158, 153]],
      [[210, 151, 1], [205, 164]],
    ] as const) {
      fillPart(c, motif, run(root), { k: 1 });
    }
    for (const line of knot) fillPart(c, motif, run(line, 1.95), { k: 1 });
    for (const [x, y] of [[186, 254], [190, 258], [195, 262]]) {
      cordBand.build(c, p(x, y), 61, 25, { motif, width: 2.5, keyline: PAPER });
    }
  }));
}
