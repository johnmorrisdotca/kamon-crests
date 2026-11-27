import type { Builder } from "../../construct/builder.ts";
import { DEG, bowedArc, carve, disc, onCircle, thickArc, thickSeg, type Region, type V } from "../../construct/compass.ts";
import { leafLens } from "../library/leaf-lens.ts";
import { fillPart, layerParts } from "../library/layers.ts";
import { PAPER } from "../library/part.ts";
import { roundTurtleShell } from "../library/turtle-shell-rounded.ts";

type Mark = readonly [x:number, y:number, bow?:number];
const unit = .596;
const p=(x:number, y:number):V=>[(x-162)*unit, (171-y)*unit];
const motif="turtle";

function outline(marks:readonly Mark[]):Region {
 return marks.map(([x, y, bow], i) => {
  const [u, v]=marks[(i + 1) % marks.length];
  return bowedArc(p(x, y), p(u, v), (bow ?? 0) * unit);
 });
}
function line(a:V, b:V, bow:number, width=PAPER):Region {
 const arc=bowedArc(a, b, bow);
 return arc.t === "A"
  ? thickArc(arc.c, arc.r, width, Math.min(arc.a0, arc.a1), Math.max(arc.a0, arc.a1))
  : thickSeg(a, b, width);
}
function cuts(marks:readonly Mark[]):Region[] {
 return [
  ...marks.slice(0, -1).map(([x, y, bow], i) => line(p(x, y), p(marks[i+1][0], marks[i+1][1]), (bow ?? 0) * unit)),
  ...marks.slice(1, -1).map(([x, y]) => disc(p(x, y), PAPER*.54)),
 ];
}

const opening=outline([
 [58, 119, 4], [57, 96, -2], [72, 63, -2], [95, 47, -2], [118, 30, -3], [159, 21, -3], [182, 24, -3],
 [215, 53, -4], [238, 83, -3], [248, 114, -2], [245, 136, -3], [224, 154, 2], [201, 163, 2],
 [156, 153, 2], [120, 158, 1], [88, 153, 1], [70, 139, 2],
]);
const rim=92.3;
const leftLines:Region[]=[];
for (let i = 0; i < 22; i += 1) {
 const a=onCircle([0, 0], rim+1, (136+i*3.68)*DEG);
 const b=p(140+i*1.48, 209+i*5.04);
 leftLines.push(line(a, b, -12-i*.6));
}
const rightLines:Region[]=[];
for (let i = 0; i < 24; i += 1) {
 const a=onCircle([0, 0], rim+1, (74-i*4.8)*DEG);
 const b=p(218-i*1.45, 151+i*6.5);
 rightLines.push(line(a, b, 9+i*.6));
}
const mantle=carve([disc([0, 0], rim)], [
 opening,
 ...cuts([[153, 315, 1], [173, 291, 2], [188, 266, 1], [208, 239, 1], [238, 218]]),
 ...leftLines, ...rightLines,
]);

const tongue=outline([
  [61, 135, 2], [66, 110, 2], [79, 88, 2], [101, 72, 2], [123, 59, 0], [110, 74, -1],
  [101, 93, -2], [95, 111, -2], [96, 143, 1], [87, 152, 1], [72, 148, 2],
]);
const tongueInk=carve([tongue], [
  ...cuts([[69, 139, 1], [78, 111, 3], [92, 89, 2], [108, 74]]),
  ...cuts([[79, 145, 1], [87, 116, 3], [98, 94, 2], [114, 70]]),
]);

const head=outline([
 [189, 124, 1], [197, 108, 1], [194, 89, 0], [192, 73, 0], [194, 54, 0], [185, 57, 1], [171, 54, 2],
 [153, 59, 1], [140, 72, 2], [125, 74, 1], [116, 79, 2], [119, 83, 1], [141, 84, 1],
 [160, 84, 2], [157, 91, 1], [146, 93, 1], [129, 94, 1], [139, 101, 2], [154, 103, 1], [168, 107, 1],
 [169, 117, 1], [158, 127, 0],
]);
const headInk=carve([head], [
 outline([[161, 74, 2], [173, 66, 2]]), ...cuts([[169, 99, -2], [179, 103, 2], [176, 110]]),
 ...cuts([[179, 111, 1], [167, 116]]), ...cuts([[182, 117, 2], [170, 123]]),
]);

const clawMarks: readonly Mark[] = [
  [0, 0, 0], [-8, 3, 1], [-15, 8, 1], [-16, 14, 2], [-10, 14, 0], [-13, 19, 2],
  [-6, 22, 1], [-3, 15, 0], [2, 22, 2], [7, 20, 1], [5, 13, 0], [10, 15, 2], [13, 10, 2], [9, 6, 1], [6, 1, 0],
];
const localClaw:Region=clawMarks.map(([x, y, bow], i) => {
  const [u, v]=clawMarks[(i+1)%clawMarks.length];
  return bowedArc([x, y], [u, v], bow ?? 0);
});
const frontFeet:readonly [x:number, y:number, turn:number, mirror?:boolean][]=[
 [107, 144, -29], [238, 142, 27, true],
];

export function kawariKameNoMaruBuild(c: Builder): void {
 c.precision(3);
 c.guideCircle([100, 100], 96);
 c.group(() => layerParts(c, () => {
  fillPart(c, motif, mantle, { k: 1 });
  fillPart(c, motif, tongueInk, { k: 1 });
  fillPart(c, motif, headInk, { k: 1 }, PAPER);
  roundTurtleShell.build(c, p(172, 201), 0, (282 - 119) * unit, { motif, paper: PAPER, keyline: PAPER });
  const clawCut = thickSeg([-4, 8], [-8, 16], PAPER / .64);
  for (const [x, y, turn, mirror] of frontFeet) {
   fillPart(c, motif, carve([localClaw], [clawCut]), { k: .64, at: p(x, y), turn, mirror });
  }
  leafLens.build(c, p(171, 54), 71, 4.8, {motif, width:.55, midrib:false});
 }));
}
