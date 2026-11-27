import type { Builder } from "../../construct/builder.ts";
import { bowedArc, carve, carveWhere, disc, inside, thickArc, thickSeg, type Region, type V } from "../../construct/compass.ts";
import { cordBand } from "../library/cord-band.ts";
import { fillPart } from "../library/layers.ts";

type Mark = readonly [x: number, y: number, bow?: number];
const unit = .615;
// Frame 34 R2 C1: the outer ring measures 312 pixels. The 192-unit layout circle fixes the scale.
const p = (x: number, y: number): V => [(x - 163) * unit, (157 - y) * unit];
const motif = "butterfly";
const weight = 2.0;

function outline(marks: readonly Mark[]): Region {
  return marks.map(([x, y, bow], i) => {
    const [u, v] = marks[(i+1)%marks.length];
    return bowedArc(p(x, y), p(u, v), (bow ?? 0) * unit);
  });
}

function stroke(a: Mark, b: Mark, width = weight): Region {
  const start = p(a[0], a[1]), end = p(b[0], b[1]);
  const arc = bowedArc(start, end, (a[2]??0)*unit);
  return arc.t === "A"
    ? thickArc(arc.c, arc.r, width, Math.min(arc.a0, arc.a1), Math.max(arc.a0, arc.a1))
    : thickSeg(start, end, width);
}

const foldedTip = carve([outline([
 [177, 27, 5], [199, 37, 3], [214, 41, 7], [213, 61, 4], [197, 76, -4],
 [211, 101, 3], [217, 109, 1], [197, 118, 4], [180, 90, -4], [169, 71, -4],
])], [outline([
 [179, 32, 4], [197, 41, 1], [211, 45, 4], [209, 59, 3], [192, 76, -5],
 [205, 101, 2], [212, 108, 1], [199, 113, 3], [184, 90, -3], [174, 69, -3],
])]);

const lowWing = carve([outline([
 [39, 211, 1], [58, 186, 2], [74, 181, -6], [78, 165, 4], [101, 155, 8], [115, 162, 2],
 [133, 181, 0], [136, 212, 1], [116, 235, 2], [95, 236, 0], [74, 223, 1], [53, 215, 0],
])], [outline([
 [45, 208, 1], [62, 190, 2], [78, 185, -6], [82, 169, 3], [101, 160, 6], [111, 166, 1],
 [129, 185, 0], [131, 211, 1], [114, 230, 1], [97, 231, 0], [76, 219, 1], [54, 211, 0],
])]);
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
const nearWing = carve([nearOuter], [outline([
 [76, 64, 5], [104, 57, 3], [131, 63, 3], [147, 76, 4], [174, 77, 5], [183, 96, 3],
 [209, 109, 5], [222, 133, 2], [225, 146, 1], [211, 171, -4], [203, 196, -5],
 [202, 222, 1], [196, 237, 1], [171, 248, 2], [150, 255, 2], [127, 223, -4],
 [116, 192, 1], [108, 151, -4], [102, 120, -2], [91, 87, -3],
])]);
const nearSeams = [
  stroke([106, 144, 4], [146, 151]), stroke([146, 151, 4], [168, 162]), stroke([168, 162, 4], [222, 165]),
  stroke([110, 154, 4], [149, 162]), stroke([149, 162, 3], [173, 174]), stroke([173, 174, 3], [216, 176]),
  stroke([123, 164, 2], [137, 209]), stroke([138, 168, 2], [145, 209]),
  stroke([153, 172, 2], [154, 209]), stroke([168, 173, 2], [166, 210]), stroke([183, 178, 2], [179, 210]),
  stroke([130, 211, -13], [199, 223]), stroke([121, 232, 3], [154, 256]),
  stroke([118, 238, 3], [155, 262]), stroke([115, 243, 3], [155, 267]),
];
const nearEyes = [[120, 85, 5.4], [154, 105, 4.8], [201, 125, 5.5]] as const;

const backWing = carve([outline([
 [205, 219, 3], [209, 188, -4], [218, 160, 0], [229, 133, -3], [239, 101, 5],
 [260, 86, 9], [279, 95, 4], [268, 122, -4], [264, 137, -3], [284, 129, 7], [300, 139, 4],
 [300, 159, 2], [294, 175, 3], [296, 186, 3], [284, 201, 3], [277, 211, 4],
 [263, 222, 3], [244, 228, 4], [225, 237, 1], [207, 235, 2],
])], [outline([
 [210, 221, 3], [214, 189, -4], [223, 162, 0], [234, 135, -3], [244, 104, 5],
 [260, 91, 6], [274, 97, 3], [263, 121, -4], [260, 141, -2], [283, 134, 5], [296, 141, 3],
 [296, 158, 2], [289, 175, 3], [291, 186, 2], [280, 199, 3], [274, 207, 4],
 [261, 217, 3], [242, 223, 4], [223, 232, 1], [211, 230, 2],
])]);
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
const face = carve([faceOuter], [outline([
 [157, 258, -4], [159, 241, 4], [172, 227, 5], [190, 232, 3], [200, 241, 1],
 [210, 232, 2], [217, 221, 1], [215, 230, 0], [209, 243, 0], [205, 263, 0],
 [226, 264, 1], [232, 270, 1], [212, 269, -1], [195, 276, 1], [185, 288, 0],
 [183, 291, 1], [175, 291, 2], [168, 286, 2], [169, 277, -2], [164, 271, 0],
])]);
const faceMarks = [
  stroke([165, 257, 12], [193, 244]),
  stroke([182, 275, 3], [190, 286]),
  stroke([190, 286, 3], [183, 292]),
];
const feet = [
  [[222, 207, 2], [231, 220, -3], [227, 247, 2], [239, 256, 1], [213, 255, 0], [212, 240, 2]],
  [[237, 207, 2], [243, 218, -2], [240, 241, 2], [253, 248, 2], [229, 247, 0], [227, 237, 2]],
  [[252, 210, 2], [259, 220, -2], [254, 236, 2], [263, 241, 0], [244, 241, 0], [243, 231, 1]],
  [[107, 240, 2], [118, 249, -2], [115, 270, 2], [124, 277, 0], [102, 278, 0], [103, 262, 0]],
  [[123, 249, 2], [134, 253, -2], [133, 274, 2], [142, 283, 0], [118, 283, 0], [119, 270, 0]],
  [[137, 256, 2], [146, 260, -2], [143, 279, 2], [152, 289, 1], [132, 290, 0], [133, 275, 0]],
] as const;

function footInk(marks: readonly Mark[]): Region[] {
  const outer = outline(marks);
  const root = p(marks[0][0], marks[0][1]);
  const pad = p(marks[3][0], marks[3][1]);
  const rib = thickSeg([root[0] + 3.4, root[1] - 4.1], [pad[0] - 4.9, pad[1] + 3.5], 1.32);
  return carve([outer], [rib, faceOuter]);
}

/** Cover the ink of a rear panel with the full outline of the panel in front. */
function clip(ink: Region[], paper: Region): Region[] {
  return carveWhere([...ink.flat(), ...paper], (point) =>
    ink.filter((loop) => inside(loop, point)).length % 2 === 1 && !inside(paper, point)
  );
}

export function suoChoBuild(c: Builder): void {
  c.precision(3);
  c.ring("ring-thread", 96);
  c.ring("ring-thread", 86);
  c.group(() => {
    for (const section of [
      clip(foldedTip, nearOuter), clip(lowWing, nearOuter),
      clip(nearWing, faceOuter), clip(backWing, faceOuter), face,
    ]) fillPart(c, motif, section, { k: 1 });
    for (const [x, y, r] of lowEyes) {
      fillPart(c, motif, [disc(p(x, y), r), disc(p(x, y), r - 1.68)], { k: 1 });
    }
    for (const rib of [...nearSeams, ...backSeams, ...lowMarks]) {
      fillPart(c, motif, carve([rib], [faceOuter]), { k: 1 });
    }
    for (const rib of faceMarks) fillPart(c, motif, [rib], { k: 1 });
    for (const [x, y, r] of nearEyes) {
      fillPart(c, motif, [disc(p(x, y), r * unit), disc(p(x, y), r * unit - 1.6)], { k: 1 });
      fillPart(c, motif, [stroke([x - 6, y + 11, 2], [x + 9, y + 11], 1.8), stroke([x - 7, y + 17, 2], [x + 10, y + 17], 1.8)], { k: 1 });
    }
    for (const foot of feet) fillPart(c, motif, footInk(foot), { k: 1 });
    fillPart(c, motif, [disc(p(189, 263), 6.2), disc(p(189, 263), 4), disc(p(189, 263), 1.72)], { k: 1 });
    fillPart(c, motif, [disc(p(163, 270), 3.8), disc(p(163, 270), 2.25)], { k: 1 });
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
  });
}
