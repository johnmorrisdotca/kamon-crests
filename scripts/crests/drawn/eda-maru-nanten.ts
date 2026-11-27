import type { Builder } from "../../construct/builder.ts";
import { DEG, circleThrough, onCircle, shortArc, thickArc } from "../../construct/compass.ts";
import type { Piece, V } from "../../construct/compass.ts";
import { berry } from "../library/berry.ts";
import { branchTaper } from "../library/branch-taper.ts";
import { fillPart, layerParts } from "../library/layers.ts";
import { leafLens } from "../library/leaf-lens.ts";
import { PAPER } from "../library/part.ts";

type Arc = Extract<Piece, { t: "A" }>;
const motif="nanten";
const point=([x,y]: V): V=>[(x-100)*.86,(100-y)*.91];
function axis(a: V,b: V){
 const x=b[0]-a[0],y=b[1]-a[1],length=Math.hypot(x,y);
 return {centre:[(a[0]+b[0])/2,(a[1]+b[1])/2] as V,length,turn:Math.atan2(x,y)/DEG,unit:[x/length,y/length] as V};
}
function closest(p: V, {c,r,a0,a1}: Arc): V {
 const off=Math.atan2(p[1]-c[1],p[0]-c[0])-a0;
 const angle=Math.atan2(Math.sin(off),Math.cos(off));
 const t=Math.max(0,Math.min(1,angle/(a1-a0)));
 return onCircle(c,r,a0+t*(a1-a0));
}
function branch(c: Builder, a: V, b: V, width: number, bend: number): Arc {
 const {centre,length,turn,unit}=axis(a,b);
 branchTaper.build(c,centre,turn,length,{motif,paper:PAPER,width:Math.min(.43,width/length),bend});
 const sag=Math.abs(bend)*length;
 const radius=length*length/(8*sag)+sag/2;
 const hint: V=[centre[0]-Math.sign(bend)*unit[1]*radius,centre[1]+Math.sign(bend)*unit[0]*radius];
 return shortArc(circleThrough(a,b,radius,hint),a,b) as Arc;
}
const branches: readonly (readonly [number,V,V,number,number])[]=[
 [-1,[107,201],[104,165],4.5,.045], [0,[105,181],[53,144],2.9,-.05], [1,[59,150],[19,115],2.55,-.06],
 [2,[43,135],[40,99],2.25,-.15], [3,[41,102],[56,47],2.5,-.11], [4,[55,51],[75,19],2.4,.07],
 [5,[65,31],[71,13],1.8,.055], [5,[74,21],[165,27],4.5,-.053], [4,[47,89],[64,75],2.0,.045],
 [8,[63,75],[96,56],2.0,-.06], [9,[92,59],[164,34],4.2,.065],
 [0,[101,180],[125,149],2.5,.035], [11,[122,153],[132,118],2.2,.07], [0,[110,177],[175,148],2.2,-.065],
 [13,[162,153],[188,112],2.45,.12], [14,[188,114],[185,87],1.9,.035],
 [13,[155,151],[182,116],2.2,.08], [2,[43,139],[23,153],1.9,-.05],
];
const leaves: readonly (readonly [number,V,V])[]=[
 [0,[103,181],[98,101]],[1,[96,180],[49,135]],[3,[54,127],[14,96]],[4,[56,112],[30,53]],
 [9,[86,67],[145,37]],[15,[188,115],[179,34]],[11,[124,173],[158,129]],[13,[138,165],[185,140]],
];
const berries: V[]=[
 [72,8],[84,20],[74,27],[90,28],[101,29],[94,39],[80,44],[67,44],[86,53],[73,55],[72,65],
 [64,76],[76,78],[66,88],[79,89],[68,99],[80,100],[73,109],
 [128,72],[137,77],[125,84],[136,89],[127,97],[139,100],[153,104],[126,110],[137,113],[149,115],[134,124],
 [18,130],[23,141],[18,151],[30,151],[25,163],[35,168],
];

const ringRadius = 93.4;
const ring = thickArc([0, 0], ringRadius, 5.2, 0, 2 * Math.PI);
const rimJoins = new Set([7, 10, 14]);
const foregroundLeaves = new Set([2, 3, 4, 7]);
function atRim(p: V): V {
  const k = ringRadius / Math.hypot(...p);
  return [p[0] * k, p[1] * k];
}

export function edaMaruNantenBuild(c: Builder): void {
  c.precision(2);
  fillPart(c, "frame", [ring], { k: 1 });
  const leafStems: [V, V][] = [];
  const bunchStems: [V, V][] = [];
  c.group(() => layerParts(c, () => {
    const axes: Arc[] = [];
    for (const [index, [parent, a, b, width, bend]] of branches.entries()) {
      const root = parent < 0 ? atRim(point(a)) : closest(point(a), axes[parent]);
      const target = rimJoins.has(index) ? atRim(point(b)) : point(b);
      axes.push(branch(c, root, target, width, bend));
    }
    for (const [index, [parent, foot, tip]] of leaves.entries()) {
      const a = point(foot);
      const b = point(tip);
      const { centre, turn, length, unit } = axis(a, b);
      const from = closest(a, axes[parent]);
      const to: V = [a[0] + 5 * unit[0], a[1] + 5 * unit[1]];
      const keyline = foregroundLeaves.has(index) ? PAPER : 0;
      if (axis(from, to).length > .8) {
        if (keyline > 0) leafStems.push([from, to]);
        else branch(c, from, to, 1.8, .04);
      }
      leafLens.build(c, centre, turn, length, { motif, width: .285, paper: PAPER, keyline });
    }

    const fruitBunches: readonly (readonly [number, V, V])[] = [
      [4, [56, 62], [72, 65]], [3, [60, 108], [73, 109]],
      [12, [126, 136], [134, 124]], [17, [30, 165], [35, 168]],
    ];
    for (const [parent, foot, lowest] of fruitBunches) {
      const root = closest(point(foot), axes[parent]);
      const berryCentre = point(lowest);
      const { unit, length } = axis(root, berryCentre);
      const run = length - 4.1;
      if (run > .8) bunchStems.push([root, [root[0] + run * unit[0], root[1] + run * unit[1]]]);
    }
    for (const at of berries) berry.build(c, point(at), 0, 6.05, { motif, paper: PAPER, keyline: PAPER });
  }));
  c.group(() => {
    c.precision(3);
    for (const [from, to] of leafStems) branch(c, from, to, 1.8, .04);
    for (const [from, to] of bunchStems) branch(c, from, to, 2.1, .047);
    c.precision(2);
  });
}
