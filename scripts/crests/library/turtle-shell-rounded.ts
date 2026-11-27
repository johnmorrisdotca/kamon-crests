import { DEG, bowedArc, carve, disc, onCircle, thickArc, thickSeg } from "../../construct/compass.ts";
import type { Region, V } from "../../construct/compass.ts";
import { fillPart } from "./layers.ts";
import { PAPER, definePart } from "./part.ts";
import type { PartOptions } from "./part.ts";

type Mark = readonly [x: number, y: number, bow?: number];
const unit = .596;
const p = (x: number, y: number): V => [(x - 172) * unit, (201 - y) * unit];
const length = (282 - 119) * unit;

function outline(marks: readonly Mark[]): Region {
  return marks.map(([x, y, bow], i) => {
    const [u, v] = marks[(i + 1) % marks.length];
    return bowedArc(p(x, y), p(u, v), (bow ?? 0) * unit);
  });
}

function line(a: V, b: V, bow: number, paper: number): Region {
  const arc = bowedArc(a, b, bow);
  return arc.t === "A"
    ? thickArc(arc.c, arc.r, paper, Math.min(arc.a0, arc.a1), Math.max(arc.a0, arc.a1))
    : thickSeg(a, b, paper);
}

function cuts(marks: readonly Mark[], paper: number): Region[] {
  return [
    ...marks.slice(0, -1).map(([x, y, bow], i) =>
      line(p(x, y), p(marks[i + 1][0], marks[i + 1][1]), (bow ?? 0) * unit, paper)),
    ...marks.slice(1, -1).map(([x, y]) => disc(p(x, y), paper * .54)),
  ];
}

const shell=outline([
 [104, 142, 2], [117, 128, 3], [143, 120, 2], [174, 121, 2], [207, 119, 2], [231, 125, 2],
 [244, 143, 2], [244, 171, 2], [240, 196, 2], [229, 217, 2], [212, 243, 2], [193, 264, 2], [172, 282, 2],
 [150, 267, 2], [127, 246, 2], [111, 222, 2], [101, 198, 2], [98, 176, 2],
]);
const grid:Mark[][]=[
 [[113, 145, 2], [134, 136, 1], [148, 137, 1], [169, 131, 1], [189, 135, 2], [208, 129, 1], [226, 139, 1], [230, 155, 1], [230, 177, 1], [224, 196, 1], [215, 216, 1], [194, 242, 1], [171, 261, 1], [148, 248, 1], [127, 228, 1], [114, 206, 1], [109, 183, 1], [109, 159, 1], [113, 145]],
 [[113, 156, 1], [135, 152, 0], [145, 163, 0], [163, 156, 0], [179, 157, 0], [195, 167, 0], [211, 162, 0], [230, 164]],
 [[110, 181, 0], [137, 180, 0], [147, 187, 0], [162, 192, 0], [181, 192, 0], [194, 181, 0], [214, 184, 0], [226, 189]],
 [[114, 211, 0], [137, 210, 0], [152, 215, 0], [167, 222, 0], [183, 220, 0], [199, 208, 0], [217, 213]],
 [[140, 242, 0], [157, 236, 0], [170, 241, 0], [185, 235, 0], [194, 242]],
 [[145, 163, 0], [147, 187, 0], [137, 210, 0], [138, 230]],
 [[195, 167, 0], [194, 181, 0], [199, 208, 0], [194, 223]],
 [[163, 156, 1], [164, 147, 0], [185, 135]], [[167, 222, 0], [170, 241]], [[183, 220, 0], [185, 235]],
];
const edgeSlots: readonly [x:number, y:number, turn:number][]=[
 [105, 165, 82], [105, 188, 80], [118, 217, 53], [137, 240, 41],
 [237, 151, -17], [236, 178, -30], [225, 207, -27], [209, 231, -43],
];
function plateCuts(paper: number): Region[] {
  return edgeSlots.map(([x, y, turn]) => {
    const angle = turn * DEG;
    return line(onCircle(p(x, y), 3.8, angle), onCircle(p(x, y), 3.8, angle + Math.PI), 0, paper);
  });
}

interface ShellOptions extends PartOptions {
  mirror?: boolean;
}

/** The size is the shell height from the rounded shoulders to the pointed end. */
export const roundTurtleShell = definePart<ShellOptions>({
  id: "turtle-shell-rounded",
  name: { en: "Rounded turtle shell", ja: "丸みのある亀の甲" },
  description: {
    en: "A rounded shoulder and pointed end frame linked plates and short dashes around the rim.",
    ja: "丸い肩からとがった端へ向かう甲に、つながった板と縁の短い筋を入れます。",
  },
  families: ["kame"],
  sources: [{ frame: 19, page: "L", row: 1, col: 1, label: "變りかめの丸" }],
  stock: true,
  sampleSize: length,
  sampleOptions: { motif: "turtle" },
  build(c, centre, turn, size, { motif, mirror, paper = PAPER, keyline }) {
    const k = size / length;
    const gap = paper / k;
    const ink = carve([shell], [...grid.flatMap((row) => cuts(row, gap)), ...plateCuts(gap)]);
    fillPart(c, motif, ink, { k, at: centre, turn, mirror }, keyline);
  },
});

export default roundTurtleShell;
