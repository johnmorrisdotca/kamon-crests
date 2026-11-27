import type { Builder } from "../../construct/builder.ts";
import { arcA, carve, disc, mirrored, onCircle, seg, shortArc, thickSeg } from "../../construct/compass.ts";
import type { Piece, Region, V } from "../../construct/compass.ts";
import { pointedPetal } from "./kiku.ts";
import { branchTaper } from "./kiku-no-eda-parts/branch-taper.ts";
import { fillPart, layerParts } from "./kiku-no-eda-parts/layers.ts";
import { petalFanBlade } from "./kiku-no-eda-parts/petal-fan-blade.ts";

type Arc = Extract<Piece, { t: "A" }>;

const motif='chrysanthemum',paper=1.15;
const point=([x,y]: V): V =>[(x-69)*1.34+6.5,(67-y)*1.34-6.5];
function capsule(w: number, r: number): Region {
 return [arcA([-w,0],r,Math.PI/2,3*Math.PI/2),seg([-w,-r],[w,-r]),arcA([w,0],r,3*Math.PI/2,5*Math.PI/2),seg([w,r],[-w,r])];
}
const centre=point([67,35]);
const target=([x,y]: V): V =>[centre[0]+x,centre[1]+y];
const eye=carve([capsule(6.8,12.8)],[capsule(6.8,12.8-paper)]);
const seeds=[0,1,2].flatMap((rank)=>{
 const n=rank===0?1:[1,8,16][rank];
 const rx=rank*7,ry=rank*4.75;
 return Array.from({length:n},(_,i)=>disc([rx*Math.cos(i*2*Math.PI/n),ry*Math.sin(i*2*Math.PI/n)],.88));
});
function putLeaf(c: Builder, from: V, to: V, keyline = 0): void {
 const a=from,b=point(to),dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy);
 const outline=pointedPetal(0,l,l*.226);
 const right=[.21,.40,.60].map((s)=>thickSeg([0,l*s],[l*(s>.5?.128:.167),l*(s+.19)],paper));
 const ink=carve([outline],[thickSeg([0,l*.07],[0,l*.93],paper),...right,...right.map(loop=>loop.map(mirrored))]);
 fillPart(c,motif,ink,{k:1,at:a,turn:Math.atan2(dx,dy)*180/Math.PI},keyline);
}
function shoot(a: V, b: V, near: V, width: number) {
 const dx=b[0]-a[0], dy=b[1]-a[1], span=Math.hypot(dx,dy);
 const centre: V = [(a[0]+b[0])/2,(a[1]+b[1])/2];
 const across=[dy/span,-dx/span];
 const rise=(near[0]-centre[0])*across[0]+(near[1]-centre[1])*across[1];
 const signed=span*span/(8*rise)+rise/2;
 const center: V = [centre[0]+(rise-signed)*across[0],centre[1]+(rise-signed)*across[1]];
 const axis = shortArc({ c: center, r: Math.abs(signed) }, a, b) as Arc;
 return {
  draw(c: Builder): void { branchTaper.build(c,centre,Math.atan2(dx,dy)*180/Math.PI,span,{motif,width:width/span,bend:rise/span}); },
  at(t: number): V { return onCircle(center,axis.r,axis.a0+t*(axis.a1-axis.a0)); },
 };
}
const stem=shoot(point([37,124]),centre,point([69,83]),4.2);
const rightShoot=shoot(stem.at(.87),point([122,24]),point([97,43]),2.8);
const low=stem.at(.54);
const upperLeaf=point([48,49]);
const leftLeaf=point([58,69]);
const petioles=[
 shoot(stem.at(.80),upperLeaf,point([57,52]),2.2),
 shoot(stem.at(.61),leftLeaf,point([63,70]),2),
];
const leaves: readonly (readonly [V, V])[] = [
 [upperLeaf,[11,9]], [leftLeaf,[6,59]],
 [low,[132,60]], [low,[129,97]], [low,[103,123]], [low,[33,113]],
];
export function kikuNoEdaBuild(c: Builder): void {
 c.precision(3);
 c.group(()=>layerParts(c,()=>{
  stem.draw(c);
  rightShoot.draw(c);
  for(const petiole of petioles)petiole.draw(c);
  for(const [i,[a,b]] of leaves.entries())putLeaf(c,a,b,i===3||i===4?paper:0);
  for(let i=0;i<14;i++){
   const phi=i*2*Math.PI/14;
   const dx=45*Math.sin(phi),dy=30*Math.cos(phi);
   const outer=Math.hypot(dx,dy);
   const inner=Math.hypot(17*Math.sin(phi),10.5*Math.cos(phi));
   const mid=(inner+outer)/(2*outer);
   petalFanBlade.build(c,target([dx*mid,dy*mid]),Math.atan2(dx,dy)*180/Math.PI,outer-inner+2,{motif,width:.49,keyline:paper});
  }
  fillPart(c,motif,[...eye,...seeds],{k:1,at:centre},paper);
 }));
}
