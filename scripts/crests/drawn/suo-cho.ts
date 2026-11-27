import type { Builder } from "../../construct/builder.ts";
import { bowedArc, carve, disc, thickArc, thickSeg, type Region, type V } from "../../construct/compass.ts";
import { cordBand } from "../library/cord-band.ts";
import { fillPart, layerParts } from "../library/layers.ts";
import { butterflyFoot } from "../library/butterfly-foot.ts";
import { PAPER } from "../library/part.ts";

type Mark = readonly [x: number, y: number, bow?: number];
const unit = .615;
// Frame 34 R2 C1: the outer ring measures 312 pixels. The 192-unit layout circle fixes the scale.
const p = (x: number, y: number): V => [(x - 163) * unit, (157 - y) * unit];
const motif = "butterfly";

function outline(marks: readonly Mark[]): Region {
  return marks.map(([x, y, bow], i) => {
    const [u, v] = marks[(i+1)%marks.length];
    return bowedArc(p(x, y), p(u, v), (bow ?? 0) * unit);
  });
}

function stroke(a: Mark, b: Mark, width = PAPER): Region {
  const start = p(a[0], a[1]), end = p(b[0], b[1]);
  const arc = bowedArc(start, end, (a[2]??0)*unit);
  return arc.t === "A"
    ? thickArc(arc.c, arc.r, width, Math.min(arc.a0, arc.a1), Math.max(arc.a0, arc.a1))
    : thickSeg(start, end, width);
}

const foldedTip = outline([
 [177, 27, 5], [199, 37, 3], [214, 41, 7], [213, 61, 4], [197, 76, -4],
 [211, 101, 3], [217, 109, 1], [197, 118, 4], [180, 90, -4], [169, 71, -4],
]);

const lowWing = outline([
 [39, 211, 1], [58, 186, 2], [74, 181, -6], [78, 165, 4], [101, 155, 8], [115, 162, 2],
 [133, 181, 0], [136, 212, 1], [116, 235, 2], [95, 236, 0], [74, 223, 1], [53, 215, 0],
]);
const lowMarks = [
  stroke([83, 221, -7], [119, 187]), stroke([96, 221, -3], [125, 205]),
] as const;

const lowEyes = [[76, 193, 3.7], [96, 173, 4.4]] as const;

const nearOuter = outline([
 [70, 63, 5], [104, 53, 4], [133, 59, 3], [148, 72, 4], [176, 73, 5], [186, 93, 4],
 [212, 105, 6], [226, 131, 2], [230, 147, 1], [215, 173, -4], [208, 196, -5],
 [207, 225, 2], [198, 240, 0], [173, 252, 2], [148, 260, 2], [122, 225, -5],
 [111, 193, 1], [103, 152, -4], [98, 122, -2], [87, 89, -4],
]);
const nearSeams = [
  stroke([106, 144, 4], [146, 151]), stroke([146, 151, 4], [168, 162]), stroke([168, 162, 4], [222, 165]),
  stroke([110, 154, 4], [149, 162]), stroke([149, 162, 3], [173, 174]), stroke([173, 174, 3], [216, 176]),
  stroke([123, 164, 2], [137, 209]), stroke([138, 168, 2], [145, 209]),
  stroke([153, 172, 2], [154, 209]), stroke([168, 173, 2], [166, 210]), stroke([183, 178, 2], [179, 210]),
  stroke([130, 211, -13], [199, 223]), stroke([121, 232, 3], [154, 256]),
  stroke([118, 238, 3], [155, 262]), stroke([115, 243, 3], [155, 267]),
];
const nearEyes = [[120, 85, 5.4], [154, 105, 4.8], [201, 125, 5.5]] as const;

const backWing = outline([
 [205, 219, 3], [209, 188, -4], [218, 160, 0], [229, 133, -3], [239, 101, 5],
 [260, 86, 9], [279, 95, 4], [268, 122, -4], [264, 137, -3], [284, 129, 7], [300, 139, 4],
 [300, 159, 2], [294, 175, 3], [296, 186, 3], [284, 201, 3], [277, 211, 4],
 [263, 222, 3], [244, 228, 4], [225, 237, 1], [207, 235, 2],
]);
const backSeams = [
  stroke([253, 111, -6], [211, 217]), stroke([271, 144, -5], [222, 222]),
  stroke([283, 151, -5], [234, 221]), stroke([287, 163, -4], [242, 221]),
  stroke([289, 174, -3], [251, 218]), stroke([291, 185, -2], [259, 216]),
];
const faceOuter = outline([
 [153, 259, -4], [155, 239, 5], [171, 223, 7], [192, 228, 4], [200, 237, 1],
 [207, 229, 2], [221, 212, 2], [219, 231, 0], [213, 244, 0], [210, 259, 0],
 [228, 260, 2], [238, 274, 1], [213, 273, -2], [198, 279, 1], [189, 290, 0],
 [186, 295, 1], [174, 295, 2], [164, 288, 2], [165, 278, -2], [160, 274, 0],
]);
const faceMarks = [
  stroke([165, 257, 12], [193, 244]),
  stroke([182, 275, 3], [190, 286]),
  stroke([190, 286, 3], [183, 292]),
];
const feet = [
  { root: p(106, 234), turn: -7, size: 24, mirror: true },
  { root: p(120, 242), turn: -6, size: 22.5, mirror: true },
  { root: p(134, 250), turn: -9, size: 22, mirror: true },
  { root: p(223, 206), turn: -8, size: 24, mirror: false },
  { root: p(237, 206), turn: -4, size: 21, mirror: false },
  { root: p(251, 208), turn: -6, size: 17.5, mirror: false },
] as const;

interface Eyelet {
  centre: V;
  radius: number;
}

function panel(c: Builder, outside: Region, lines: readonly Region[], eyes: readonly Eyelet[], keyline = PAPER): void {
  const openings = eyes.map(({ centre, radius }) => disc(centre, radius));
  const dots = eyes.map(({ centre, radius }) => disc(centre, radius - PAPER));
  fillPart(c, motif, [...carve([outside], [...lines, ...openings]), ...dots], { k: 1 }, keyline);
}

export function suoChoBuild(c: Builder): void {
  c.precision(3);
  c.ring("ring-thread", 96);
  c.ring("ring-thread", 86);
  c.group(() => layerParts(c, () => {
    panel(c, foldedTip, [], [], 0);
    panel(c, lowWing, lowMarks, lowEyes.map(([x, y, radius]) => ({ centre: p(x, y), radius })));
    panel(c, backWing, backSeams, []);
    const eyeTicks = nearEyes.flatMap(([x, y]) => [
      stroke([x - 6, y + 11, 2], [x + 9, y + 11]),
      stroke([x - 7, y + 17, 2], [x + 10, y + 17]),
    ]);
    panel(c, nearOuter, [...nearSeams, ...eyeTicks], nearEyes.map(([x, y, radius]) => ({
      centre: p(x, y), radius: radius * unit,
    })));
    for (const { root, turn, size, mirror } of feet) {
      butterflyFoot.build(c, root, turn, size, { motif, mirror, paper: PAPER, keyline: PAPER });
    }
    panel(c, faceOuter, faceMarks, [
      { centre: p(189, 263), radius: 5.8 },
      { centre: p(163, 270), radius: 3.55 },
    ]);
    cordBand.build(c, p(103, 153), 5.47, 136.67, {
      motif,
      width: 2.55,
      runs: [
        { length: 67.85, bend: -86.1 }, { length: 94.77, bend: -213.71 },
        { length: 32.7, bend: -160.52 }, { length: 26.91, bend: -241.04 },
      ],
    });
    cordBand.build(c, p(124, 243), -58.42, 71.84, {
      motif,
      width: 2.17,
      runs: [
        { length: 45.12, bend: -13.67 }, { length: 46.65, bend: -136.96 }, { length: 25.04, bend: -196.55 },
      ],
    });
  }));
}
